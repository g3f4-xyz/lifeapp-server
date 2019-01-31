import { PushSubscription } from 'web-push';

export interface IConfigMap<T = string | boolean> {
  [key: string]: T;
}

export interface IFieldMetaOptions {
  text: string;
  value: string;
}

export interface IFieldMetaOptionsSet {
  customValueOptionMask: string;
  parentValue: string;
  options: [IFieldMetaOptions];
}

export interface IFieldMeta {
  required: boolean;
  minLen: number;
  maxLen: number;
  options: [IFieldMetaOptions];
  defaultValue: string;
  parentID: string;
  optionsSet: [IFieldMetaOptionsSet];
}

export interface IFieldValue {
  bool: boolean;
  id: string;
  text: string;
  number: number;
  ids: [string];
  parentValue: string;
  customValueOptionValue: string;
}

export interface ITaskField {
  fieldId: string;
  fieldIds: string;
  format: string;
  type: string;
  order: number;
  label: string;
  helperText: string;
  meta: IFieldMeta;
  value: IFieldValue;
}

export interface ITask {
  ownerId: string;
  taskType: string;
  fields: ITaskField[];
}

export interface ITaskType {
  name: string;
  typeId: string;
  description: string;
  order: number;
  isCustom: boolean;
  parentID: string;
  fields: ITaskField[];
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

export interface ISettings<S = ISubscription[]> {
  ownerId: string;
  notifications: INotifications<S>;
}

export interface IUser {
  id: string;
  displayName: string;
}

export interface IContext {
  user: IUser;
}
