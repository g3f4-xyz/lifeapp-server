import connectDB from '../../../connect';
import { FIELDS_CONFIG } from '../../tasks/TaskModel';
import { TextFieldModel } from '../TextFieldModel';

describe('TextFieldModel', () => {
  beforeAll(async () => {
    // @ts-ignore
    await connectDB(global.__MONGO_URI__);
  });

  it('should be defined', () => {
    expect(TextFieldModel).toBeDefined();
  });

  it('should create model', async () => {
    const doc = new TextFieldModel(FIELDS_CONFIG.NOTE);

    expect(doc).toBeDefined();
    expect(doc.validateField()).toBe('od 3 do 100 znaków.');

    expect(doc).toBeInstanceOf(TextFieldModel);
  });

  it('should create model2', async () => {
    const doc = new TextFieldModel({
      ...FIELDS_CONFIG.NOTE,
      value: {
        text: '1234567890',
      },
    });

    expect(doc).toBeDefined();
    expect(doc.validateField()).toBe(null);

    expect(doc).toBeInstanceOf(TextFieldModel);
  });
});
