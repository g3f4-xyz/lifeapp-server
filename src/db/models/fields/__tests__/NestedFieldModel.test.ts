import { FIELD_ID, FIELD_TYPE } from '../../../../constants';
import connectDB from '../../../connect';
import { FIELDS_CONFIG } from '../../tasks/TaskModel';
import { NestedFieldModel } from '../NestedFieldModel';

describe('NestedFieldModel', () => {
  beforeAll(async () => {
    // @ts-ignore
    await connectDB(global.__MONGO_URI__);
  });

  it('should be defined', () => {
    expect(NestedFieldModel).toBeDefined();
  });

  it('should create model', async () => {
    const doc = new NestedFieldModel(FIELDS_CONFIG.CYCLE);

    expect(doc).toBeDefined();
    expect(doc).toBeInstanceOf(NestedFieldModel);
    expect(doc.value.childrenValue).toBe(null);
    expect(doc.value.ownValue).toBe(null);
    expect(doc.order).toBe(5);
    expect(doc.fieldId).toBe(FIELD_ID.CYCLE);
    expect(doc.fieldType).toBe(FIELD_TYPE.NESTED);
  });

  it('should always validate', async () => {
    const doc = new NestedFieldModel(FIELDS_CONFIG.CYCLE);

    expect(doc.value.childrenValue).toBe(null);
    expect(doc.value.ownValue).toBe(null);
    expect(doc.validateField()).toBe(null);
  });
});
