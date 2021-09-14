import { Document, model, Model, Schema } from 'mongoose';
import { TASK_STATUS, TaskTypeId } from '../../../constants';
import { Settings } from '../../interfaces';
import { SubscriptionSchema } from '../../schemas/SubscriptionSchema';

export const SettingsSchema: Schema<Settings> = new Schema({
  ownerId: { type: String, index: { unique: true }, required: true },
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
      goals: {
        type: Boolean,
        default: true,
      },
    },
    subscriptions: {
      type: [SubscriptionSchema],
      default: [],
      required: true,
    },
  },
  taskList: {
    filters: {
      title: {
        type: String,
        default: '',
      },
      taskType: {
        type: [
          {
            type: String,
            enum: Object.values(TaskTypeId),
          },
        ],
        default: Object.values(TaskTypeId),
      },
      status: {
        type: String,
        enum: Object.values(TASK_STATUS).concat([null]),
        default: null,
      },
    },
  },
});

SettingsSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

SettingsSchema.set('toJSON', {
  virtuals: true,
});

export const SettingsModel: Model<Settings & Document> = model(
  'Settings',
  SettingsSchema,
);

// TODO dlaczego to jest potrzebne
(async () => {
  try {
    await SettingsModel.createIndexes();
  } catch (e) {
    throw new Error(`error creating SettingsModel indexes | ${e}`);
  }
})();
