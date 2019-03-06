import { PushSubscription } from 'web-push';

export interface IConfigMap<T = string | boolean> {
  [key: string]: T;
}

export interface IFieldMetaOptions {
  text: string;
  value: string;
}

export interface IFieldMeta {
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
  fieldId: string;
  fieldType: string;
  order: number;
  meta: IFieldMeta;
  value: IFieldValue;
}

export interface ITask {
  _id: any;
  ownerId: string;
  taskType: string;
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

export interface ISettings<S = ISubscription[]> {
  ownerId: string;
  notifications: INotifications<S>;
}

export interface IUser {
  id: string;
}

export interface IContext {
  user: IUser;
}
