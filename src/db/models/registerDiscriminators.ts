import { FIELD_TYPE_VALUE_MAP } from '../../constants';

const TASK_FIELD_DISCRIMINATORS: FIELD_TYPE_VALUE_MAP<() => void> = {
  CHOICE: () => { require('./fields/ChoiceFieldModel'); },
  NESTED: () => { require('./fields/NestedFieldModel'); },
  SLIDER: () => { require('./fields/SliderFieldModel'); },
  SWITCH: () => { require('./fields/SwitchFieldModel'); },
  TEXT: () => { require('./fields/TextFieldModel'); },
};

export const registerDiscriminators = () => {
  Object.keys(TASK_FIELD_DISCRIMINATORS).forEach(fieldType => TASK_FIELD_DISCRIMINATORS[fieldType]());
};
