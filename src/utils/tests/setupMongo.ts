import { Mongoose } from 'mongoose';
import connectDB from '../../db/connect';
import SpyInstance = jest.SpyInstance;

export default ({
  beforeAllExtend,
  afterAllExtend,
  afterEachExtend,
  beforeEachExtend,
}: {
  beforeAllExtend?: () => Promise<void> | void;
  afterAllExtend?: () => Promise<void> | void;
  afterEachExtend?: () => Promise<void> | void;
  beforeEachExtend?: () => Promise<void> | void;
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

  beforeEach(async () => {
    if (beforeEachExtend) {
      await beforeEachExtend();
    }
  }, 10000);

  afterEach(async () => {
    if (afterEachExtend) {
      await afterEachExtend();
    }

    await Promise.all(
      mongoConnection.connections.map(collection => collection.dropDatabase()),
    );
  }, 10000);

  afterAll(async () => {
    dateNowSpy.mockRestore();

    if (afterAllExtend) {
      await afterAllExtend();
    }

    await mongoConnection.disconnect();
  }, 10000);
};
