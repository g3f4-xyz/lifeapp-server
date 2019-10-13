import { Document, Schema } from 'mongoose';

import { SubscriptionData } from '../interfaces';

export interface SubscriptionDataDocument
  extends SubscriptionData,
    Pick<Document, 'id'> {}

export const SubscriptionDataSchema: Schema<
  SubscriptionDataDocument
> = new Schema({
  endpoint: String,
  expirationTime: String,
  keys: {
    p256dh: String,
    auth: String,
  },
});
