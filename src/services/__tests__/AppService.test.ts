import settingsApi from '../../db/api/settings/settingsApi';
import taskApi from '../../db/api/task/taskApi';
import AppService from '../AppService';

describe('AppService', () => {
  it('should create new service', async () => {
    const appService = new AppService(taskApi, settingsApi);

    expect(appService).toBeDefined();
  });

  it('should clean user data', async () => {
    const ownerId = '1234';
    const deleteTasksSpy = jest.spyOn(taskApi, 'deleteTasks').mockResolvedValue(ownerId);
    const deleteSettingsSpy = jest.spyOn(settingsApi, 'deleteSettings').mockResolvedValue(ownerId);
    const appService = new AppService(taskApi, settingsApi);

    expect(await appService.cleanApplication(ownerId)).toBe(ownerId);
    expect(deleteTasksSpy).toHaveBeenCalledWith(ownerId);
    expect(deleteSettingsSpy).toHaveBeenCalledWith(ownerId);
  });

  it('should handle clean application error', async () => {
    const ownerId = '1234';
    const deleteTasksSpy = jest.spyOn(taskApi, 'deleteTasks').mockResolvedValue(ownerId);
    const deleteSettingsSpy = jest.spyOn(settingsApi, 'deleteSettings').mockResolvedValue(ownerId);
    const appService = new AppService(taskApi, settingsApi);

    expect(await appService.cleanApplication(ownerId)).toBe(ownerId);
    expect(deleteTasksSpy).toHaveBeenCalledWith(ownerId);
    expect(deleteSettingsSpy).toHaveBeenCalledWith(ownerId);
  });
});
