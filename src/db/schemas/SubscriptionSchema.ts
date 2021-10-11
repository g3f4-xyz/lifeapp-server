import { Document, Schema } from 'mongoose';
import { Subscription } from '../interfaces';
import parseId from '../models/parseId';

export const SubscriptionSchema: Schema<Subscription & Document> = new Schema({
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
});

SubscriptionSchema.virtual('id').get(parseId);

SubscriptionSchema.set('toJSON', {
  virtuals: true,
});
