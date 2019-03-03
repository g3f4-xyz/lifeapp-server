type KEYOF_TYPE_VALUE_MAP<T, V> = {
  [K in keyof T]: V
};

export enum TASK_TYPE {
  TODO = 'TODO',
  MEETING = 'MEETING',
  EVENT = 'EVENT',
  ROUTINE = 'ROUTINE',
}

export type TASK_TYPE_VALUE_MAP<V> = KEYOF_TYPE_VALUE_MAP<typeof TASK_TYPE, V>;

export enum FIELD_TYPE {
  SWITCH = 'SWITCH',
  CHOICE = 'CHOICE',
  TEXT = 'TEXT',
  NESTED = 'NESTED',
}

export type FIELD_TYPE_VALUE_MAP<V> = KEYOF_TYPE_VALUE_MAP<typeof FIELD_TYPE, V>;

export const FIELD_VALUE_KEYS_MAP: FIELD_TYPE_VALUE_MAP<string[]> = {
  CHOICE: ['id'],
  NESTED: ['ownValue', 'childrenValue'],
  SWITCH: ['enabled'],
  TEXT: ['text'],
};
