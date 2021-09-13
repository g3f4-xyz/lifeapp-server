import { FieldId, FieldType } from '../../../../../constants';
import setupMongo from '../../../../../utils/tests/setupMongo';
import { FIELDS_CONFIG } from '../../../tasks/fieldsConfig';
import { SwitchFieldModel } from '../SwitchFieldModel';

describe('SwitchFieldModel', () => {
  setupMongo();

  it('should be defined', () => {
    expect(SwitchFieldModel).toBeDefined();
  });

  it('should create model', async () => {
    const doc = new SwitchFieldModel(FIELDS_CONFIG.ACTIVE);

    expect(doc).toBeDefined();
    expect(doc).toBeInstanceOf(SwitchFieldModel);
    expect(doc.value.enabled).toBe(false);
    expect(doc.order).toBe(0);
    expect(doc.fieldId).toBe(FieldId.ACTION);
    expect(doc.fieldType).toBe(FieldType.SWITCH);
    expect(doc.meta.disabled).toBe(false);
    expect(doc.meta.helperText).toBe('Informacje o testowym polu Active');
    expect(doc.meta.label).toBe('Active');
  });

  it('should always validate', async () => {
    const doc = new SwitchFieldModel(FIELDS_CONFIG.ACTIVE);

    expect(doc.value.enabled).toBe(false);
    expect(doc.validateField().toString()).toBe([].toString());
  });
});
