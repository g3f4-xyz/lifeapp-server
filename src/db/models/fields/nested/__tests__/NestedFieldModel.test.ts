import { FIELD_ID, FIELD_TYPE } from '../../../../../constants';
import setupMongo from '../../../../../utils/tests/setupMongo';
import { FIELDS_CONFIG } from '../../../tasks/fieldsConfig';
import { NestedFieldModel } from '../NestedFieldModel';

describe('NestedFieldModel', () => {
  setupMongo();

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
    expect(doc.validateField().toString()).toBe([].toString());
  });
});
