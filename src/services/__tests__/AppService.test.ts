import AppService from '../AppService';
import settingsApiStub from '../../stubs/settingsApiStub';
import taskApiStub from '../../stubs/taskApiStub';

describe('AppService', () => {
  it('should create new service', async () => {
    const appService = new AppService(taskApiStub, settingsApiStub);

    expect(appService).toBeDefined();
  });

  it('should create new service', async () => {
    const ownerId = '1234';
    const deleteTasksSpy = jest.spyOn(taskApiStub, 'deleteTasks');
    const deleteSettingsSpy = jest.spyOn(settingsApiStub, 'deleteSettings');
    const appService = new AppService(taskApiStub, settingsApiStub);

    expect(await appService.cleanApplication(ownerId)).toBe(ownerId);
    expect(deleteTasksSpy).toHaveBeenCalledWith(ownerId);
    expect(deleteSettingsSpy).toHaveBeenCalledWith(ownerId);
  });
});
