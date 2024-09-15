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

export type TaskTypeId = string;

export const PredefinedTaskTypes: string[] = [
  'GOAL',
  'TODO',
  'MEETING',
  'EVENT',
  'ROUTINE',
];

export enum TaskStatus {
  TODO = 'TODO',
  DONE = 'DONE',
  IN_PROGRESS = 'IN_PROGRESS',
}

export const FieldTypes: FieldType[] = [
  'SLIDER',
  'SWITCH',
  'CHOICE',
  'TEXT',
  'NESTED',
];

export type FieldType = 'SLIDER' | 'SWITCH' | 'CHOICE' | 'TEXT' | 'NESTED';

export const fieldValueKeyMap: Record<FieldType, string> = {
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
