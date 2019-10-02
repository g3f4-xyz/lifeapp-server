import { FIELD_ID, FIELD_TYPE_VALUE_MAP } from '../../../constants';
import { Field, FieldValue } from '../../interfaces';

interface DefaultFieldValue {
  (): FieldValue;
}

type DefaultFieldValueById = Partial<Record<FIELD_ID, DefaultFieldValue>>;

const DEFAULT_FILED_VALUE_BY_ID: DefaultFieldValueById = ({
  [FIELD_ID.DATE_TIME]: () => ({ text: new Date(Date.now()).toISOString() }),
});

const DEFAULT_FIELD_VALUE_BY_TYPES: FIELD_TYPE_VALUE_MAP<DefaultFieldValue> = {
  CHOICE: () => ({ id: '' }),
  NESTED: () => ({ ownValue: null, childrenValue: null }),
  SLIDER: () => ({ progress: 0 }),
  SWITCH: () => ({ enabled: false }),
  TEXT: () => ({ text: '' }),
};

export default (field: Field): Field => {
  const { fieldType, fieldId } = field;

  if (DEFAULT_FILED_VALUE_BY_ID[fieldId]) {
    return {
      ...field,
      value: DEFAULT_FILED_VALUE_BY_ID[fieldId](),
    };
  }

  return {
    ...field,
    value: DEFAULT_FIELD_VALUE_BY_TYPES[fieldType](),
  };
};
