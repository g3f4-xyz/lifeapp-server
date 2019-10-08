import { Model } from 'mongoose';

export default async (model: Model<any>, data: any[]) => {
  await model.insertMany(data);
};
