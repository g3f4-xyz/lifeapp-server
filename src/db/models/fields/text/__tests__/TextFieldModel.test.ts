import { FIELD_ID, FIELD_TYPE } from '../../../../../constants';
import setupMongo from '../../../../../utils/tests/setupMongo';
import { FIELDS_CONFIG } from '../../../tasks/fieldsConfig';
import { TextFieldModel } from '../TextFieldModel';

describe('TextFieldModel', () => {
  setupMongo();

  it('should be defined', () => {
    expect(TextFieldModel).toBeDefined();
  });

  it('should create model', async () => {
    const doc = new TextFieldModel(FIELDS_CONFIG.NOTE);

    expect(doc).toBeDefined();
    expect(doc).toBeInstanceOf(TextFieldModel);
    expect(doc.value.text).toBe('');
    expect(doc.order).toBe(2);
    expect(doc.fieldId).toBe(FIELD_ID.NOTE);
    expect(doc.fieldType).toBe(FIELD_TYPE.TEXT);
    expect(doc.meta.required).toBe(false);
    expect(doc.meta.disabled).toBe(false);
    expect(doc.meta.minLength).toBe(3);
    expect(doc.meta.maxLength).toBe(100);
    expect(doc.meta.inputType).toBe('text');
    expect(doc.meta.inputType).toBe('text');
    expect(doc.meta.helperText).toBe('Informacje o testowym polu Description');
    expect(doc.meta.label).toBe('Note');
  });

  it('should validate empty value', async () => {
    const doc = new TextFieldModel(FIELDS_CONFIG.NOTE);

    expect(doc.value.text).toBe('');
    expect(doc.validateField().toString()).toBe(
      ['wartość wymagana.', 'od 3 do 100 znaków.'].toString(),
    );
  });

  it('should validate too short value', async () => {
    const doc = new TextFieldModel({
      ...FIELDS_CONFIG.NOTE,
      value: {
        text: '1',
      },
    });

    expect(doc.value.text).toBe('1');
    expect(doc.validateField().toString()).toBe(
      ['od 3 do 100 znaków.'].toString(),
    );
  });

  it('should validate too long value', async () => {
    const text = `
      1234567890123456789012345678901234567890
      1234567890123456789012345678901234567890
      1234567890123456789012345678901234567890
    `;
    const doc = new TextFieldModel({
      ...FIELDS_CONFIG.NOTE,
      value: { text },
    });

    expect(doc.value.text).toBe(text);
    expect(doc.validateField().toString()).toBe(
      ['od 3 do 100 znaków.'].toString(),
    );
  });
});
