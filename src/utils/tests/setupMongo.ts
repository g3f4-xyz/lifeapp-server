import { Mongoose } from 'mongoose';
import connectDB from '../../db/connect';
import SpyInstance = jest.SpyInstance;

export default ({
  beforeAllExtend,
  afterAllExtend,
}: {
  beforeAllExtend?: () => void;
  afterAllExtend?: () => void;
} = {}) => {
  let dateNowSpy: SpyInstance;
  let mongoConnection: Mongoose;

  beforeAll(async () => {
    // @ts-ignore
    mongoConnection = await connectDB(global.__MONGO_URI__);

    dateNowSpy = jest
      .spyOn(Date, 'now')
      .mockImplementation(() => 1570032448857);

    if (beforeAllExtend) {
      await beforeAllExtend();
    }
  }, 10000);

  afterAll(async () => {
    dateNowSpy.mockRestore();

    if (afterAllExtend) {
      await afterAllExtend();
    }

    await Promise.all(
      mongoConnection.connections.map(collection => collection.dropDatabase()),
    );

    await mongoConnection.disconnect();
  }, 10000);
};
