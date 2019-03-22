import { Document, model, Model, Schema } from 'mongoose';
import { TASK_STATUS, TASK_TYPE } from '../../constants';

import { ISettings } from '../interfaces';
import { SubscriptionSchema } from '../schemas/SubscriptionSchema';

export interface ISettingsDocument extends ISettings, Document {}

export const SettingsSchema: Schema<ISettings> = new Schema({
  ownerId: { type: String, index: { unique: true, dropDups: true }, required: true },
  notifications: {
    general: {
      show: {
        type: Boolean,
        default: true,
      },
      vibrate: {
        type: Boolean,
        default: true,
      },
    },
    types: {
      events: {
        type: Boolean,
        default: true,
      },
      meetings: {
        type: Boolean,
        default: true,
      },
      todos: {
        type: Boolean,
        default: true,
      },
      routines: {
        type: Boolean,
        default: true,
      },
    },
    subscriptions: [{
      type: SubscriptionSchema,
      default: [],
    }],
  },
  taskList: {
    filters: {
      title: {
        type: String,
        default: '',
      },
      taskType: [{
        type: String,
        enum: Object.values(TASK_TYPE),
      }],
      status: {
        type: String,
        enum: Object.values(TASK_STATUS),
      },
    },
  },
});

export const SettingsModel: Model<ISettingsDocument> = model('Settings', SettingsSchema);

(async () => {
  try {
    await SettingsModel.ensureIndexes();
  } catch (e) {
    throw new Error(`error creating SettingsModel indexes | ${e}`);
  }
})();
