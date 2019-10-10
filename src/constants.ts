type KEYOF_TYPE_VALUE_MAP<T, V> = {
  [K in keyof T]: V;
};

export type STATUS = '201' | '408' | '410' | '404';

export const STATUSES: { [key: string]: STATUS } = {
  OK: '201',
  REQUEST_TIMEOUT: '408',
  NOT_REGISTERED: '410',
  NOT_FOUND: '404',
};

export enum FIELD_ID {
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

export type FIELD_ID_VALUE_MAP<V> = KEYOF_TYPE_VALUE_MAP<typeof FIELD_ID, V>;

export enum TASK_TYPE {
  GOAL = 'GOAL',
  TODO = 'TODO',
  MEETING = 'MEETING',
  EVENT = 'EVENT',
  ROUTINE = 'ROUTINE',
}

export enum TASK_STATUS {
  TODO = 'TODO',
  DONE = 'DONE',
  IN_PROGRESS = 'IN_PROGRESS',
}

export type TASK_TYPE_VALUE_MAP<V> = KEYOF_TYPE_VALUE_MAP<typeof TASK_TYPE, V>;

export enum FIELD_TYPE {
  SLIDER = 'SLIDER',
  SWITCH = 'SWITCH',
  CHOICE = 'CHOICE',
  TEXT = 'TEXT',
  NESTED = 'NESTED',
}

export type FIELD_TYPE_VALUE_MAP<V> = KEYOF_TYPE_VALUE_MAP<
  typeof FIELD_TYPE,
  V
>;

export const FIELD_VALUE_KEYS_MAP: FIELD_TYPE_VALUE_MAP<string> = {
  CHOICE: 'id',
  NESTED: 'ownValue',
  SLIDER: 'progress',
  SWITCH: 'enabled',
  TEXT: 'text',
};

export const TIME_FORMAT = 'hh:mm';

export enum CONSOLE_COLORS {
  YELLOW = '\x1b[33m%s\x1b[0m',
  BLUE = '\x1b[34m%s\x1b[0m',
  CYAN = '\x1b[36m%s\x1b[0m',
}

export enum CYCLE {
  TIME = 'TIME_CYCLE',
  DAY = 'DAY_CYCLE',
  WEEK = 'WEEK_CYCLE',
  MONTH = 'MONTH_CYCLE',
}

export enum TIME_CYCLE {
  HOUR = 'HOUR',
  HOURS_3 = 'HOURS_3',
  HOURS_12 = 'HOURS_12',
  MINUTES = 'MINUTES',
}

export enum DAY_CYCLE {
  MORNING = 'MORNING',
  NOON = 'NOON',
  EVENING = 'EVENING',
}

export enum WEEK_CYCLE {
  WEEK_DAYS = 'WEEK_DAYS',
  WEEKEND = 'WEEKEND',
  FIRST_DAY = 'FIRST_DAY',
  LAST_DAY = 'LAST_DAY',
}

export enum MONTH_CYCLE {
  END = 'MONTH_END',
  MIDDLE = 'MONTH_MIDDLE',
  START = 'MONTH_START',
}

export enum MONGO_ERROR {
  DUPLICATE_KEY = 11000,
}
