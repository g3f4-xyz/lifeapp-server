import { TASK_TYPE } from '../../../constants';
import connectDB from '../../connect';
import { getEmptyTask } from '../taskApi';

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
      expect(task.taskType).toBe(TASK_TYPE.TODO);
      expect(task.fields[0].value.text).toBe('');
      expect(task.fields[1].value.enabled).toBe(false);
      expect(task.fields[2].value.id).toBe('');
      expect(task.fields[3].value.text).toBe('');
      expect(task.fields[4].value.ownValue).toBe(null);
      expect(task.fields[4].value.childrenValue).toBe(null);
    });
  });
});
