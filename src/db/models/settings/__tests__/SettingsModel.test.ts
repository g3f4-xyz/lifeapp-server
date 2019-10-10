import { TASK_TYPE } from '../../../../constants';
import setupMongo from '../../../../utils/tests/setupMongo';
import { SettingsModel } from '../SettingsModel';

describe('SettingsModel', () => {
  setupMongo();

  it('should be defined', () => {
    expect(SettingsModel).toBeDefined();
  });

  it('should be able to create document with default values', async () => {
    const ownerId = '1234';

    const doc = (await SettingsModel.create({ ownerId })).toJSON();

    expect(doc.ownerId).toBe(ownerId);
    expect(doc.notifications).toEqual({
      general: {
        show: true,
        vibrate: true,
      },
      types: {
        events: true,
        meetings: true,
        todos: true,
        routines: true,
        goals: true,
      },
      subscriptions: [],
    });
    expect(doc.taskList).toEqual({
      filters: {
        title: '',
        taskType: Object.values(TASK_TYPE),
        status: null,
      },
    });
  });
});
