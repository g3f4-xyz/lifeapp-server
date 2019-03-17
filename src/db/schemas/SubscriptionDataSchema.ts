import { Document, Schema } from 'mongoose';

import { ISubscriptionData } from '../interfaces';

export interface ISubscriptionDataDocument extends ISubscriptionData, Document {}

export const SubscriptionDataSchema: Schema<ISubscriptionDataDocument> = new Schema({
  endpoint : String,
  expirationTime : String,
  keys : {
    p256dh : String,
    auth : String,
  },
});
