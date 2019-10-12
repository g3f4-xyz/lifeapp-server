import { Model } from 'mongoose';

export default async function mockMongoCollection<T = any>(
  model: Model<any>,
  data: Array<Partial<T>>,
) {
  await model.insertMany(data);
}
