import { FIELD_TYPE_VALUE_MAP, TASK_TYPE_VALUE_MAP } from '../../constants';

const TASK_DISCRIMINATORS: TASK_TYPE_VALUE_MAP<() => void> = {
  EVENT: () => { require('./tasks/EventModel'); },
  GOAL: () => { require('./tasks/GoalModel'); },
  MEETING: () => { require('./tasks/MeetingModel'); },
  TODO: () => { require('./tasks/TodoModel'); },
  ROUTINE: () => { require('./tasks/RoutineModel'); },
};

const TASK_FIELD_DISCRIMINATORS: FIELD_TYPE_VALUE_MAP<() => void> = {
  CHOICE: () => { require('./fields/ChoiceFieldModel'); },
  NESTED: () => { require('./fields/NestedFieldModel'); },
  SLIDER: () => { require('./fields/SliderFieldModel'); },
  SWITCH: () => { require('./fields/SwitchFieldModel'); },
  TEXT: () => { require('./fields/TextFieldModel'); },
};

export const registerTasksDiscriminators = () => {
  Object.values(TASK_DISCRIMINATORS).forEach(module => module());
};

export const registerFieldsDiscriminators = () => {
  Object.values(TASK_FIELD_DISCRIMINATORS).forEach(module => module());
};
