import { PushSubscription } from 'web-push';
import {
  FieldIdType,
  FieldType,
  TaskStatus,
  TaskTypeId,
  TypeOfTask,
} from '../constants';
import SettingsService from '../services/SettingsService';
import TaskService from '../services/TaskService';
import TaskTypeService from '../services/TaskTypeService';

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
  fieldType?: FieldType;
  ownMeta?: FieldMeta;
  childrenMeta?: FieldMeta[];
}

// TODO it should have type field so subtypes can be discriminated
export interface FieldValue {
  enabled?: boolean;
  progress?: number;
  id?: string;
  text?: string;
  ownValue?: FieldValue | null;
  childrenValue?: FieldValue | null;
}

export interface Field {
  _id?: any;
  id?: string;
  fieldId: FieldIdType;
  fieldType: FieldType;
  order: number;
  meta: Partial<FieldMeta>;
  value: Partial<FieldValue>;
  validationErrors?: string[];

  validateField?(): string[];
}

export interface FieldUpdate {
  taskId: string;
  fieldId: FieldIdType;
  value: Partial<FieldValue>;
}

export interface Task {
  _id?: any;
  id?: string;
  ownerId: string;
  updatedAt?: Date | string;
  notificationAt?: Date;
  lastNotificationAt?: Date;
  lastChangedFieldId?: FieldIdType;
  typeId: TypeOfTask;
  fields: Field[];
}

export interface TaskType {
  typeId: string;
  label: string;
  description: string;
  parentTypeIds: string[];
  fieldsIds: string[];
}

export interface SubscriptionData extends PushSubscription {
  expirationTime: string;
}

export interface Subscription {
  _id?: any;
  id?: string;
  subscriptionData: SubscriptionData;
  userAgent: string;
  userDeviceType: string;
}

export interface SettingsNotificationsGeneral {
  show: boolean;
  vibrate: boolean;
}

export interface SettingsNotificationsTypes {
  events: boolean;
  goals: boolean;
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
  filters: TaskListSettingsFilters;
}

export interface TaskListSettingsFilters {
  title: string;
  taskType: TaskTypeId[];
  taskStatus: TaskStatus[];
}

export interface Settings {
  _id?: any;
  id?: string;
  ownerId: string;
  notifications: Notifications;
  taskList: TaskListSettings;
}

export interface User {
  id: string;
}

export interface Context {
  user: User;
  taskService: TaskService;
  taskTypeService: TaskTypeService;
  settingsService: SettingsService;
}
