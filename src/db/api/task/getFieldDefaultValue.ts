import { FieldId, FIELD_TYPE_VALUE_MAP } from '../../../constants';
import { Field, FieldValue } from '../../interfaces';

interface DefaultFieldValue {
  (fieldConfig: Field): FieldValue;
}

type DefaultFieldValueById = Partial<Record<FieldId, DefaultFieldValue>>;

const defaultFieldValueById: DefaultFieldValueById = {
  [FieldId.DATE_TIME]: () => ({
    text: new Date(Date.now()).toISOString(),
  }),
  [FieldId.STATUS]: fieldConfig => ({
    id: fieldConfig.meta.defaultOption || '',
  }),
};

const defaultFieldValueByType: FIELD_TYPE_VALUE_MAP<DefaultFieldValue> = {
  CHOICE: () => ({ id: '' }),
  NESTED: () => ({ ownValue: null, childrenValue: null }),
  SLIDER: () => ({ progress: 0 }),
  SWITCH: () => ({ enabled: false }),
  TEXT: () => ({ text: '' }),
};

export default (field: Field): Field => {
  const { fieldType, fieldId } = field;

  if (defaultFieldValueById[fieldId]) {
    return {
      ...field,
      value: defaultFieldValueById[fieldId](field),
    };
  }

  return {
    ...field,
    value: defaultFieldValueByType[fieldType](field),
  };
};
