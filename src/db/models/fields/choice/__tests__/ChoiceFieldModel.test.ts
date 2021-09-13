import { FieldId, FieldType } from '../../../../../constants';
import setupMongo from '../../../../../utils/tests/setupMongo';
import { FIELDS_CONFIG } from '../../../tasks/fieldsConfig';
import { ChoiceFieldModel } from '../ChoiceFieldModel';

describe('ChoiceFieldModel', () => {
  setupMongo();

  it('should be defined', () => {
    expect(ChoiceFieldModel).toBeDefined();
  });

  it('should create model', async () => {
    const doc = new ChoiceFieldModel(FIELDS_CONFIG.STATUS);

    expect(doc).toBeDefined();
    expect(doc).toBeInstanceOf(ChoiceFieldModel);
    expect(doc.value.id).toBe('');
    expect(doc.order).toBe(0);
    expect(doc.fieldId).toBe(FieldId.STATUS);
    expect(doc.fieldType).toBe(FieldType.CHOICE);
    expect(doc.validationErrors.toString()).toBe([].toString());
    expect(doc.meta.required).toBe(true);
    expect(doc.meta.disabled).toBe(false);
    expect(doc.meta.helperText).toBe('Informacje o testowym polu Status');
    expect(doc.meta.label).toBe('Status');
  });

  it('should validate empty value', async () => {
    const doc = new ChoiceFieldModel(FIELDS_CONFIG.STATUS);

    expect(doc.value.id).toBe('');
    expect(doc.validateField().toString()).toBe(
      ['wartość wymagana.'].toString(),
    );
  });

  it('should validate selected value', async () => {
    const doc = new ChoiceFieldModel({
      ...FIELDS_CONFIG.STATUS,
      value: {
        id: 'test',
      },
    });

    expect(doc.value.id).toBe('test');
    expect(doc.validateField().toString()).toBe([].toString());
  });
});
