import { Document, model, Model, Schema } from 'mongoose';
import { User } from '../../interfaces';

export const UserSchema: Schema<User> = new Schema({
  userId: { type: String, index: { unique: true }, required: true },
  info: {
    type: {
      name: String,
      photo: String,
    },
    default: {},
  },
});

UserSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

UserSchema.set('toJSON', {
  virtuals: true,
});

export const UserModel: Model<User & Document> = model('User', UserSchema);
