import { PushSubscription } from 'web-push';
import { FIELD_ID, FIELD_TYPE, TASK_TYPE } from '../constants';

export interface IConfigMap<T = string | boolean> {
  [key: string]: T;
}

export interface IFieldMetaOptions {
  text: string;
  value: string;
}

export interface IFieldMeta {
  disabled: boolean;
  required: boolean;
  minLength: number;
  maxLength: number;
  min: number;
  max: number;
  options: [IFieldMetaOptions];
  label: string;
  helperText: string;
  defaultValue: string;
  inputType: string;
  parentValue: IFieldValue;
  fieldType: string;
  ownMeta: IFieldMeta;
  childrenMeta: [IFieldMeta];
}

export interface IFieldValue {
  enabled?: boolean;
  id?: string;
  text?: string;
  ownValue?: this;
  childrenValue?: this;
}

export interface IField {
  fieldId: FIELD_ID;
  fieldType: FIELD_TYPE;
  order: number;
  meta: IFieldMeta;
  value: IFieldValue;
}

export interface ITask {
  _id: any;
  ownerId: string;
  updatedAt: Date;
  notificationAt: Date;
  lastNotificationAt: Date;
  lastChangedFieldId: FIELD_ID;
  taskType: TASK_TYPE;
  fields: IField[];
}

export interface ITaskType {
  typeId: string;
  label: string;
  description: string;
  order: number;
  parentTypeIds: string[];
  fieldsIds: string[];
}

export interface ISubscriptionData extends PushSubscription {
  expirationTime: string;
}

export interface ISubscription {
  subscriptionData: ISubscriptionData;
  userAgent: string;
  userDeviceType: string;
}

export interface ISettingsNotificationsGeneral {
  show: boolean;
  vibrate: boolean;
}

export interface ISettingsNotificationsTypes {
  events: boolean;
  meetings: boolean;
  routines: boolean;
  todos: boolean;
}

export interface INotifications<S> {
  general: ISettingsNotificationsGeneral;
  types: ISettingsNotificationsTypes;
  subscriptions: S;
}

export interface ITaskListSettings {
  filters: {
    title: string;
    taskType: string[];
    status: string;
  };
}

export interface ISettings<S = ISubscription[]> {
  ownerId: string;
  notifications: INotifications<S>;
  taskList: ITaskListSettings;
}

export interface IUser {
  id: string;
}

export interface IContext {
  user: IUser;
}
