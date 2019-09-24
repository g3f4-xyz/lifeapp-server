import { FIELD_ID, FIELD_TYPE } from '../../../../constants';
import connectDB from '../../../connect';
import { FIELDS_CONFIG } from '../../tasks/TaskModel';
import { ChoiceFieldModel } from '../ChoiceFieldModel';

describe('ChoiceFieldModel', () => {
  beforeAll(async () => {
    // @ts-ignore
    await connectDB(global.__MONGO_URI__);
  });

  it('should be defined', () => {
    expect(ChoiceFieldModel).toBeDefined();
  });

  it('should create model', async () => {
    const doc = new ChoiceFieldModel(FIELDS_CONFIG.STATUS);

    expect(doc).toBeDefined();
    expect(doc).toBeInstanceOf(ChoiceFieldModel);
    expect(doc.value.id).toBe('');
    expect(doc.order).toBe(0);
    expect(doc.fieldId).toBe(FIELD_ID.STATUS);
    expect(doc.fieldType).toBe(FIELD_TYPE.CHOICE);
    expect(doc.meta.required).toBe(true);
    expect(doc.meta.disabled).toBe(false);
    expect(doc.meta.helperText).toBe('Informacje o testowym polu Status');
    expect(doc.meta.label).toBe('Status');
  });

  it('should validate empty value', async () => {
    const doc = new ChoiceFieldModel(FIELDS_CONFIG.STATUS);

    expect(doc.value.id).toBe('');
    expect(doc.validateField()).toBe('wartość wymagana.');
  });

  it('should validate selected value', async () => {
    const doc = new ChoiceFieldModel({
      ...FIELDS_CONFIG.STATUS,
      value: {
        id: 'test',
      },
    });

    expect(doc.value.id).toBe('test');
    expect(doc.validateField()).toBe(null);
  });
});
