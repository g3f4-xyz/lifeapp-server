import settingsApi from '../../db/api/settings/settingsApi';
import taskApi from '../../db/api/task/taskApi';
import TaskService from '../TaskService';

describe('TaskService', () => {
  it('should create new service', async () => {
    const settingsService = new TaskService(taskApi, settingsApi);

    expect(settingsService).toBeDefined();
  });

  describe('deleteTask', () => {
    it('should delete task', () => {
      // TODO
    });

    it('should handle error', () => {
      // TODO
    });
  });

  describe('getEmptyTask', () => {
    it('should get empty task', () => {
      // TODO
    });

    it('should handle error', () => {
      // TODO
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

  describe('updateTaskField', () => {
    it('should update task field', () => {
      // TODO
    });

    it('should handle error', () => {
      // TODO
    });
  });
});
