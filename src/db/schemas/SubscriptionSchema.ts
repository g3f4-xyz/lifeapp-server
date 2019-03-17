import { Document, Schema } from 'mongoose';

import { ISubscription } from '../interfaces';
import { SubscriptionDataSchema } from './SubscriptionDataSchema';

export interface ISubscriptionDocument extends ISubscription, Document {}

export const SubscriptionSchema: Schema<ISubscriptionDocument> = new Schema({
  subscriptionData: SubscriptionDataSchema,
  userAgent: String,
  userDeviceType: String,
});
