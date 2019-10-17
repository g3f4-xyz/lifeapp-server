import { PushSubscription } from 'web-push';
import {
  FieldId,
  FieldType,
  TASK_STATUS,
  TASK_TYPE,
  TypeOfTask,
} from '../constants';
import NotificationsService from '../services/NotificationsService';
import SettingsService from '../services/SettingsService';
import TaskService from '../services/TaskService';
import TaskTypeService from '../services/TaskTypeService';
import UserService from '../services/UserService';

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
  _id?: any;
  id?: string;
  fieldId: FieldId;
  fieldType: FieldType;
  order: number;
  meta: Partial<FieldMeta>;
  value: Partial<FieldValue>;
  validationErrors?: string[];

  validateField?(): string[];
}

export interface Task {
  _id?: any;
  id?: string;
  ownerId: string;
  updatedAt?: Date | string;
  notificationAt?: Date;
  lastNotificationAt?: Date;
  lastChangedFieldId?: FieldId;
  taskType: TypeOfTask;
  fields: Field[];
}

export interface TaskType {
  _id?: any;
  id?: string;
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
  taskType: TASK_TYPE[];
  status: TASK_STATUS;
}

export interface Settings {
  _id?: any;
  id?: string;
  ownerId: string;
  notifications: Notifications;
  taskList: TaskListSettings;
}

export interface UserInfo {
  name?: string;
  photo?: string;
  provider?: string;
}

export interface User {
  id?: string;
  userId: string;
  info: UserInfo;
}

export interface Context {
  user: User;
  userService: UserService;
  taskService: TaskService;
  taskTypeService: TaskTypeService;
  settingsService: SettingsService;
  notificationsService: NotificationsService;
}
