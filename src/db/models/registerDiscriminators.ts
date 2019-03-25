import { FIELD_TYPE_VALUE_MAP } from '../../constants';

const TASK_FIELD_DISCRIMINATORS: FIELD_TYPE_VALUE_MAP<() => void> = {
  CHOICE: () => { require('./ChoiceFieldModel'); },
  NESTED: () => { require('./NestedFieldModel'); },
  SLIDER: () => { require('./SliderFieldModel'); },
  SWITCH: () => { require('./SwitchFieldModel'); },
  TEXT: () => { require('./TextFieldModel'); },
};

export const registerDiscriminators = () => {
  Object.keys(TASK_FIELD_DISCRIMINATORS).forEach(fieldType => TASK_FIELD_DISCRIMINATORS[fieldType]());
};
