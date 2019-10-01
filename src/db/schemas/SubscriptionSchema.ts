import { Document, Schema } from 'mongoose';

import { Subscription } from '../interfaces';
import { SubscriptionDataSchema } from './SubscriptionDataSchema';

export interface SubscriptionDocument extends Subscription, Document {}

export const SubscriptionSchema: Schema<SubscriptionDocument> = new Schema({
  subscriptionData: SubscriptionDataSchema,
  userAgent: String,
  userDeviceType: String,
});
