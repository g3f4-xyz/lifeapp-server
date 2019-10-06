import { PushSubscription } from 'web-push';
import { FIELD_ID, FIELD_TYPE, TASK_TYPE } from '../constants';

export interface ConfigMap<T = string | boolean> {
  [key: string]: T;
}

export interface FieldMetaOptions {
  text: string;
  value: string;
}

export interface FieldMeta {
  disabled?: boolean;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  step?: number;
  defaultOption?: string;
  options?: FieldMetaOptions[];
  label?: string;
  helperText?: string;
  defaultValue?: string;
  inputType?: string;
  parentValue?: FieldValue;
  fieldType?: string;
  ownMeta?: FieldMeta;
  childrenMeta?: FieldMeta[];
}

export interface FieldValue {
  enabled?: boolean;
  progress?: number;
  id?: string;
  text?: string;
  ownValue?: FieldValue | null;
  childrenValue?: FieldValue | null;
}

export interface Field {
  _id: any;
  fieldId: FIELD_ID;
  fieldType: FIELD_TYPE;
  order: number;
  meta: Partial<FieldMeta>;
  value: Partial<FieldValue>;
  validationErrors: string[];

  validateField(): string[];
}

export interface Task {
  _id: any;
  ownerId: string;
  updatedAt?: Date | string;
  notificationAt?: Date;
  lastNotificationAt?: Date;
  lastChangedFieldId?: FIELD_ID;
  taskType: TASK_TYPE;
  fields: Field[];
}

export interface TaskType {
  typeId: string;
  label: string;
  description: string;
  order: number;
  parentTypeIds: string[];
  fieldsIds: string[];
}

export interface SubscriptionData extends PushSubscription {
  expirationTime: string;
}

export interface Subscription {
  subscriptionData: PushSubscription;
  userAgent: string;
  userDeviceType: string;
}

export interface SettingsNotificationsGeneral {
  show: boolean;
  vibrate: boolean;
}

export interface SettingsNotificationsTypes {
  events: boolean;
  goal: boolean;
  meetings: boolean;
  routines: boolean;
  todos: boolean;
}

export interface Notifications {
  general: SettingsNotificationsGeneral;
  types: SettingsNotificationsTypes;
  subscriptions: Subscription[];
}

export interface TaskListSettings {
  filters: {
    title: string;
    taskType: string[];
    status: string;
  };
}

export interface Settings {
  ownerId: string;
  notifications: Notifications;
  taskList: TaskListSettings;
}

export interface User {
  id: string;
}

export interface Context {
  user: User;
}
