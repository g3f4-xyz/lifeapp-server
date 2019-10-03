import { TASK_TYPE } from '../../../../constants';
import connectDB from '../../../connect';
import { getEmptyTask } from '../taskApi';
import SpyInstance = jest.SpyInstance;

describe('taskApi', () => {
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

  describe('getEmptyTask', () => {
    it('should get empty todo task', async () => {
      const ownerId = '1234567890';
      const task = await getEmptyTask(TASK_TYPE.TODO, ownerId);

      expect(task).toBeDefined();
      expect(task.ownerId).toBe(ownerId);
      expect(task.taskType).toBe(TASK_TYPE.TODO);
      expect(task.fields[0].value.text).toBe('');
      expect(task.fields[1].value.enabled).toBe(false);
      expect(task.fields[2].value.id).toBe('TODO');
      expect(task.fields[3].value.text).toBe('');
      expect(task.fields[4].value.ownValue).toBe(null);
      expect(task.fields[4].value.childrenValue).toBe(null);
    });

    it('should get empty event task', async () => {
      const ownerId = '1234567890';
      const task = await getEmptyTask(TASK_TYPE.EVENT, ownerId);

      expect(task).toBeDefined();
      expect(task.ownerId).toBe(ownerId);
      expect(task.taskType).toBe(TASK_TYPE.EVENT);
      expect(task.fields[0].value.text).toBe('');
      expect(task.fields[1].value.enabled).toBe(false);
      expect(task.fields[2].value.id).toBe('TODO');
      expect(task.fields[3].value.text).toBe('');
      expect(task.fields[4].value.text).toBe('');
      expect(task.fields[5].value.text).toBe('');
      expect(task.fields[6].value.text).toBe('');
      expect(task.fields[7].value.ownValue).toBe(null);
      expect(task.fields[7].value.childrenValue).toBe(null);
    });

    it('should get empty goal task', async () => {
      const ownerId = '1234567890';
      const task = await getEmptyTask(TASK_TYPE.GOAL, ownerId);

      expect(task).toBeDefined();
      expect(task.ownerId).toBe(ownerId);
      expect(task.taskType).toBe(TASK_TYPE.GOAL);
      expect(task.fields[0].value.text).toBe('');
      expect(task.fields[1].value.enabled).toBe(false);
      expect(task.fields[2].value.id).toBe('TODO');
      expect(task.fields[3].value.progress).toBe(0);
      expect(task.fields[4].value.ownValue).toBe(null);
      expect(task.fields[4].value.childrenValue).toBe(null);
    });

    it('should get empty meeting task', async () => {
      const ownerId = '1234567890';
      const task = await getEmptyTask(TASK_TYPE.MEETING, ownerId);

      expect(task).toBeDefined();
      expect(task.ownerId).toBe(ownerId);
      expect(task.taskType).toBe(TASK_TYPE.MEETING);
      expect(task.fields[0].value.text).toBe('');
      expect(task.fields[1].value.enabled).toBe(false);
      expect(task.fields[2].value.id).toBe('TODO');
      expect(task.fields[3].value.text).toBe('');
      expect(task.fields[4].value.text).toBe('');
      expect(task.fields[5].value.text).toBe('2019-10-02T18:07');
      expect(task.fields[6].value.text).toBe('');
      expect(task.fields[7].value.text).toBe('');
      expect(task.fields[8].value.ownValue).toBe(null);
      expect(task.fields[8].value.childrenValue).toBe(null);
    });

    it('should get empty routine task', async () => {
      const ownerId = '1234567890';
      const task = await getEmptyTask(TASK_TYPE.ROUTINE, ownerId);

      expect(task).toBeDefined();
      expect(task.ownerId).toBe(ownerId);
      expect(task.taskType).toBe(TASK_TYPE.ROUTINE);
      expect(task.fields[0].value.text).toBe('');
      expect(task.fields[1].value.enabled).toBe(false);
      expect(task.fields[2].value.id).toBe('TODO');
      expect(task.fields[3].value.ownValue).toBe(null);
      expect(task.fields[3].value.childrenValue).toBe(null);
      expect(task.fields[4].value.text).toBe('');
      expect(task.fields[5].value.ownValue).toBe(null);
      expect(task.fields[5].value.childrenValue).toBe(null);
    });
  });
});
