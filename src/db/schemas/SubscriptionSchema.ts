import { Document, Schema } from 'mongoose';

import { Subscription } from '../interfaces';
import { SubscriptionDataSchema } from './SubscriptionDataSchema';

export interface SubscriptionDocument extends Subscription, Document {}

export const SubscriptionSchema: Schema<SubscriptionDocument> = new Schema({
  subscriptionData: {
    endpoint: String,
    expirationTime: String,
    keys: {
      p256dh: String,
      auth: String,
    },
  },
  userAgent: String,
  userDeviceType: String,
});
