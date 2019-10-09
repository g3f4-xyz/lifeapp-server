import settingsApi from '../../db/api/settings/settingsApi';
import taskApi from '../../db/api/task/taskApi';
import AppError from '../../utils/AppError';
import UserService from '../UserService';

describe('UserService', () => {
  it('should create new service', async () => {
    const appService = new UserService(taskApi, settingsApi);

    expect(appService).toBeDefined();
  });

  describe('cleanApplication method', () => {
    it('should clean user data', async () => {
      const ownerId = '1234';
      const deleteTasksSpy = jest
        .spyOn(taskApi, 'deleteTasks')
        .mockResolvedValue(ownerId);
      const deleteSettingsSpy = jest
        .spyOn(settingsApi, 'deleteSettings')
        .mockResolvedValue(ownerId);
      const appService = new UserService(taskApi, settingsApi);

      expect(await appService.cleanApplication(ownerId)).toBe(ownerId);
      expect(deleteTasksSpy).toHaveBeenCalledWith(ownerId);
      expect(deleteSettingsSpy).toHaveBeenCalledWith(ownerId);
    });

    it('should handle clean application error on delete tasks failure', async () => {
      const ownerId = '1234';
      const deleteTasksSpy = jest
        .spyOn(taskApi, 'deleteTasks')
        .mockRejectedValue(ownerId);
      const deleteSettingsSpy = jest
        .spyOn(settingsApi, 'deleteSettings')
        .mockResolvedValue(ownerId);
      const appService = new UserService(taskApi, settingsApi);

      try {
        await appService.cleanApplication(ownerId);
      } catch (e) {
        expect(e).toBeInstanceOf(AppError);
        expect(e.code).toBe('CLEAN_APPLICATION_ERROR');
        expect(e.level).toBe('service');
      }

      expect(deleteTasksSpy).toHaveBeenCalledWith(ownerId);
      expect(deleteSettingsSpy).toHaveBeenCalledWith(ownerId);
    });

    it('should handle clean application error on delete settings failure', async () => {
      const ownerId = '1234';
      const deleteTasksSpy = jest
        .spyOn(taskApi, 'deleteTasks')
        .mockResolvedValue(ownerId);
      const deleteSettingsSpy = jest
        .spyOn(settingsApi, 'deleteSettings')
        .mockRejectedValue(ownerId);
      const appService = new UserService(taskApi, settingsApi);

      try {
        expect(await appService.cleanApplication(ownerId)).toBe(ownerId);
      } catch (e) {
        expect(e).toBeInstanceOf(AppError);
        expect(e.code).toBe('CLEAN_APPLICATION_ERROR');
        expect(e.level).toBe('service');
      }

      expect(deleteSettingsSpy).toHaveBeenCalledWith(ownerId);
      expect(deleteTasksSpy).toHaveBeenCalledWith(ownerId);
    });

    it('should handle clean application error on delete tasks and delete settings failure', async () => {
      const ownerId = '1234';
      const deleteTasksSpy = jest
        .spyOn(taskApi, 'deleteTasks')
        .mockRejectedValue(ownerId);
      const deleteSettingsSpy = jest
        .spyOn(settingsApi, 'deleteSettings')
        .mockRejectedValue(ownerId);
      const appService = new UserService(taskApi, settingsApi);

      try {
        await appService.cleanApplication(ownerId);
      } catch (e) {
        expect(e).toBeInstanceOf(AppError);
        expect(e.code).toBe('CLEAN_APPLICATION_ERROR');
        expect(e.level).toBe('service');
      }

      expect(deleteTasksSpy).toHaveBeenCalledWith(ownerId);
      expect(deleteSettingsSpy).toHaveBeenCalledWith(ownerId);
    });
  });
});
