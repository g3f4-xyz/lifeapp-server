import connectDB from '../../connect';

describe('api', () => {
  beforeAll(async () => {
    // @ts-ignore
    await connectDB(global.__MONGO_URI__);
  });

  it('should run test', async () => {
    expect(true).toBe(true);
  });
});
