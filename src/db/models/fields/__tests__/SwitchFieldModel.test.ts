import { FIELD_ID, FIELD_TYPE } from '../../../../constants';
import connectDB from '../../../connect';
import { FIELDS_CONFIG } from '../../tasks/TaskModel';
import { SwitchFieldModel } from '../SwitchFieldModel';

describe('SwitchFieldModel', () => {
  beforeAll(async () => {
    // @ts-ignore
    await connectDB(global.__MONGO_URI__);
  });

  it('should be defined', () => {
    expect(SwitchFieldModel).toBeDefined();
  });

  it('should create model', async () => {
    const doc = new SwitchFieldModel(FIELDS_CONFIG.ACTIVE);

    expect(doc).toBeDefined();
    expect(doc).toBeInstanceOf(SwitchFieldModel);
    expect(doc.value.enabled).toBe(false);
    expect(doc.order).toBe(0);
    expect(doc.fieldId).toBe(FIELD_ID.ACTION);
    expect(doc.fieldType).toBe(FIELD_TYPE.SWITCH);
    expect(doc.meta.disabled).toBe(false);
    expect(doc.meta.helperText).toBe('Informacje o testowym polu Active');
    expect(doc.meta.label).toBe('Active');
  });

  it('should always validate', async () => {
    const doc = new SwitchFieldModel(FIELDS_CONFIG.ACTIVE);

    expect(doc.value.enabled).toBe(false);
    expect(doc.validateField()).toBe(null);
  });
});
