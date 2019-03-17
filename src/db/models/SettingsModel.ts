import { Document, model, Model, Schema } from 'mongoose';

import { ISettings } from '../interfaces';
import { SubscriptionSchema } from '../schemas/SubscriptionSchema';

export interface ISettingsDocument extends ISettings, Document {}

export const SettingsSchema: Schema<ISettings> = new Schema({
  ownerId: { type: String, index: { unique: true, dropDups: true }, required: true },
  notifications: {
    general: {
      show: Boolean,
      vibrate: Boolean,
    },
    types: {
      events: Boolean,
      meetings: Boolean,
      todos: Boolean,
      routines: Boolean,
    },
    subscriptions: [SubscriptionSchema],
  },
  taskList: {
    filters: {
      title: String,
      taskType: [String],
      status: String,
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
