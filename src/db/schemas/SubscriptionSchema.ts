import { Document, Schema } from 'mongoose';
import { Subscription } from '../interfaces';

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

SubscriptionSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

SubscriptionSchema.set('toJSON', {
  virtuals: true,
});
