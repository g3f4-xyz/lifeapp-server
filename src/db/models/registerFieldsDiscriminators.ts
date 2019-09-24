import { FIELD_TYPE_VALUE_MAP, TASK_TYPE_VALUE_MAP } from '../../constants';

const TASK_DISCRIMINATORS: TASK_TYPE_VALUE_MAP<() => void> = {
  EVENT: () => { require('./tasks/event/EventModel'); },
  GOAL: () => { require('./tasks/goal/GoalModel'); },
  MEETING: () => { require('./tasks/meeting/MeetingModel'); },
  TODO: () => { require('./tasks/todo/TodoModel'); },
  ROUTINE: () => { require('./tasks/routine/RoutineModel'); },
};

const TASK_FIELD_DISCRIMINATORS: FIELD_TYPE_VALUE_MAP<() => void> = {
  CHOICE: () => { require('./fields/choice/ChoiceFieldModel'); },
  NESTED: () => { require('./fields/nested/NestedFieldModel'); },
  SLIDER: () => { require('./fields/slider/SliderFieldModel'); },
  SWITCH: () => { require('./fields/switch/SwitchFieldModel'); },
  TEXT: () => { require('./fields/text/TextFieldModel'); },
};

export const registerTasksDiscriminators = () => {
  Object.values(TASK_DISCRIMINATORS).forEach(module => module());
};

export const registerFieldsDiscriminators = () => {
  Object.values(TASK_FIELD_DISCRIMINATORS).forEach(module => module());
};
