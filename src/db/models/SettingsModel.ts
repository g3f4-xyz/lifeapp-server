import { Document, model, Model, Schema } from 'mongoose';

import { ISettings } from '../interfaces';
import { ISubscriptionDocument } from '../schemas/SubscriptionSchema';

export interface ISettingsDocument extends ISettings<ISubscriptionDocument>, Document {}

export const SettingsSchema: Schema<ISettings> = new Schema({
  ownerId: String,
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
    // TODO dlaczego nie działa ta schema?
    // subscriptions: [SubscriptionSchema],
    subscriptions: [{
      subscriptionData: Object,
      userAgent: String,
      userDeviceType: String,
    }],
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
