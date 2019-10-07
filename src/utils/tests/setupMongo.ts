import connectDB from '../../db/connect';
import SpyInstance = jest.SpyInstance;

export default () => {
  let dateNowSpy: SpyInstance;

  beforeAll(async () => {
    // @ts-ignore
    await connectDB(global.__MONGO_URI__);

    dateNowSpy = jest
      .spyOn(Date, 'now')
      .mockImplementation(() => 1570032448857);
  });

  afterAll(() => {
    dateNowSpy.mockRestore();
  });
};
