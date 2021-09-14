import { TaskTypeId } from '../../../../constants';
import setupMongo from '../../../../utils/tests/setupMongo';
import taskApi from '../taskApi';

describe('taskApi', () => {
  setupMongo();

  describe('deleteTask', () => {
    it('should delete task', () => {
      // TODO
    });

    it('should handle error', () => {
      // TODO
    });
  });

  describe('deleteTasks', () => {
    it('should delete all user tasks', () => {
      // TODO
    });

    it('should handle error', () => {
      // TODO
    });
  });

  describe('getEmptyTask', () => {
    it('should get empty todo task', async () => {
      const ownerId = '1234567890';
      const task = await taskApi.getEmptyTask(ownerId, TaskTypeId.TODO);

      expect(task).toBeDefined();
      expect(task.ownerId).toBe(ownerId);
      expect(task.typeId).toBe(TaskTypeId.TODO);
      expect(task.fields[0].value.text).toBe('');
      expect(task.fields[1].value.enabled).toBe(false);
      expect(task.fields[2].value.id).toBe('TODO');
      expect(task.fields[3].value.text).toBe('');
      expect(task.fields[4].value.ownValue).toBe(null);
      expect(task.fields[4].value.childrenValue).toBe(null);
    });

    it('should get empty event task', async () => {
      const ownerId = '1234567890';
      const task = await taskApi.getEmptyTask(ownerId, TaskTypeId.EVENT);

      expect(task).toBeDefined();
      expect(task.ownerId).toBe(ownerId);
      expect(task.typeId).toBe(TaskTypeId.EVENT);
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
      const task = await taskApi.getEmptyTask(ownerId, TaskTypeId.GOAL);

      expect(task).toBeDefined();
      expect(task.ownerId).toBe(ownerId);
      expect(task.typeId).toBe(TaskTypeId.GOAL);
      expect(task.fields[0].value.text).toBe('');
      expect(task.fields[1].value.enabled).toBe(false);
      expect(task.fields[2].value.id).toBe('TODO');
      expect(task.fields[3].value.progress).toBe(0);
      expect(task.fields[4].value.ownValue).toBe(null);
      expect(task.fields[4].value.childrenValue).toBe(null);
    });

    it('should get empty meeting task', async () => {
      const ownerId = '1234567890';
      const task = await taskApi.getEmptyTask(ownerId, TaskTypeId.MEETING);

      expect(task).toBeDefined();
      expect(task.ownerId).toBe(ownerId);
      expect(task.typeId).toBe(TaskTypeId.MEETING);
      expect(task.fields[0].value.text).toBe('');
      expect(task.fields[1].value.enabled).toBe(false);
      expect(task.fields[2].value.id).toBe('TODO');
      expect(task.fields[3].value.text).toBe('');
      expect(task.fields[4].value.text).toBe('');
      expect(task.fields[5].value.text).toBe('2019-10-02T16:07:28.857Z');
      expect(task.fields[6].value.text).toBe('');
      expect(task.fields[7].value.text).toBe('');
      expect(task.fields[8].value.ownValue).toBe(null);
      expect(task.fields[8].value.childrenValue).toBe(null);
    });

    it('should get empty routine task', async () => {
      const ownerId = '1234567890';
      const task = await taskApi.getEmptyTask(ownerId, TaskTypeId.ROUTINE);

      expect(task).toBeDefined();
      expect(task.ownerId).toBe(ownerId);
      expect(task.typeId).toBe(TaskTypeId.ROUTINE);
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

  describe('getTask', () => {
    it('should get task', () => {
      // TODO
    });

    it('should handle error', () => {
      // TODO
    });
  });

  describe('getTaskList', () => {
    it('should get task list', () => {
      // TODO
    });

    it('should handle error', () => {
      // TODO
    });
  });

  describe('saveTask', () => {
    it('should save task', () => {
      // TODO
    });

    it('should handle error', () => {
      // TODO
    });
  });
});
