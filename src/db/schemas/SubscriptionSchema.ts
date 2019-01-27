import { Document } from 'mongoose';

import { ISubscription } from '../interfaces';

export interface ISubscriptionDocument extends ISubscription, Document {}

// TODO dlaczego nie działa ta schema
// export const SubscriptionSchema: Schema<SubscriptionDocument> = new Schema({
//   subscriptionData: {
//     endpoint : String,
//     expirationTime : String,
//     keys : {
//       p256dh : String,
//       auth : Boolean,
//     },
//   },
//   userAgent: String,
//   userDeviceType: String,
// });
