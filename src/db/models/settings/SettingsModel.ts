import { Document, model, Model, Schema } from 'mongoose';
import { TASK_STATUS, TASK_TYPE } from '../../../constants';
import { Settings } from '../../interfaces';

export interface SettingsDocument extends Settings, Document {}

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
      type: [
        {
          subscriptionData: {
            type: {
              endpoint: {
                type: String,
                required: true,
              },
              expirationTime: {
                type: String,
                required: true,
              },
              keys: {
                p256dh: {
                  type: String,
                  required: true,
                },
                auth: {
                  type: String,
                  required: true,
                },
              },
            },
            required: true,
          },
          userAgent: String,
          userDeviceType: String,
        },
      ],
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
            enum: Object.values(TASK_TYPE),
          },
        ],
        default: Object.values(TASK_TYPE),
      },
      status: {
        type: String,
        enum: Object.values(TASK_STATUS).concat([null]),
        default: null,
      },
    },
  },
});

export const SettingsModel: Model<SettingsDocument> = model(
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
