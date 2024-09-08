type KEYOF_TYPE_VALUE_MAP<T, V> = {
  [K in keyof T]: V;
};

export enum FieldId {
  TITLE = 'TITLE',
  PRIORITY = 'PRIORITY',
  PROGRESS = 'PROGRESS',
  ACTIVE = 'ACTIVE',
  STATUS = 'STATUS',
  DATE = 'DATE',
  DATE_TIME = 'DATE_TIME',
  DURATION = 'DURATION',
  LOCATION = 'LOCATION',
  PERSON = 'PERSON',
  NOTE = 'NOTE',
  ACTION = 'ACTION',
  CYCLE = 'CYCLE',
  NOTIFICATIONS = 'NOTIFICATIONS',
}

export type FieldIdType =
  | 'TITLE'
  | 'PRIORITY'
  | 'PROGRESS'
  | 'ACTIVE'
  | 'STATUS'
  | 'DATE'
  | 'DATE_TIME'
  | 'DURATION'
  | 'LOCATION'
  | 'PERSON'
  | 'NOTE'
  | 'ACTION'
  | 'CYCLE'
  | 'NOTIFICATIONS';

export enum TaskTypeId {
  GOAL = 'GOAL',
  TODO = 'TODO',
  MEETING = 'MEETING',
  EVENT = 'EVENT',
  ROUTINE = 'ROUTINE',
}

export type TypeOfTask = 'GOAL' | 'TODO' | 'MEETING' | 'EVENT' | 'ROUTINE';

export enum TaskStatus {
  TODO = 'TODO',
  DONE = 'DONE',
  IN_PROGRESS = 'IN_PROGRESS',
}

export enum FieldType {
  SLIDER = 'SLIDER',
  SWITCH = 'SWITCH',
  CHOICE = 'CHOICE',
  TEXT = 'TEXT',
  NESTED = 'NESTED',
}

export type FieldTypeType = 'SLIDER' | 'SWITCH' | 'CHOICE' | 'TEXT' | 'NESTED';

export type FIELD_TYPE_VALUE_MAP<V> = KEYOF_TYPE_VALUE_MAP<typeof FieldType, V>;

export const FIELD_VALUE_KEYS_MAP: FIELD_TYPE_VALUE_MAP<string> = {
  CHOICE: 'id',
  NESTED: 'ownValue',
  SLIDER: 'progress',
  SWITCH: 'enabled',
  TEXT: 'text',
};

export enum CYCLE {
  TIME = 'TIME_CYCLE',
  DAY = 'DAY_CYCLE',
  WEEK = 'WEEK_CYCLE',
  MONTH = 'MONTH_CYCLE',
}
