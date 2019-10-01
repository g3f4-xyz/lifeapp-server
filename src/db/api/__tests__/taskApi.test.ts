import { TASK_TYPE } from '../../../constants';
import { getEmptyTask } from '../index';

describe('taskApi', () => {
  beforeAll(async () => {
    // @ts-ignore
    await connectDB(global.__MONGO_URI__);
  });

  describe('getEmptyTask', () => {
    it('should get empty todo task', async () => {
      const ownerId = '1234567890';
      const task = await getEmptyTask(TASK_TYPE.TODO, ownerId);

      expect(task).toBeDefined();
      expect(task.ownerId).toBe(ownerId);
    });
  });
});
