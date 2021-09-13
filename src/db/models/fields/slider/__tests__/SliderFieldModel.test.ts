import { FieldId, FieldType } from '../../../../../constants';
import setupMongo from '../../../../../utils/tests/setupMongo';
import { FIELDS_CONFIG } from '../../../tasks/fieldsConfig';
import { SliderFieldModel } from '../SliderFieldModel';

describe('SliderFieldModel', () => {
  setupMongo();

  it('should be defined', () => {
    expect(SliderFieldModel).toBeDefined();
  });

  it('should create model', async () => {
    const doc = new SliderFieldModel(FIELDS_CONFIG.PROGRESS);

    expect(doc).toBeDefined();
    expect(doc).toBeInstanceOf(SliderFieldModel);
    expect(doc.value.progress).toBe(0);
    expect(doc.order).toBe(5);
    expect(doc.fieldId).toBe(FieldId.PROGRESS);
    expect(doc.fieldType).toBe(FieldType.SLIDER);
    expect(doc.meta.required).toBe(false);
    expect(doc.meta.disabled).toBe(false);
    expect(doc.meta.min).toBe(0);
    expect(doc.meta.max).toBe(100);
    expect(doc.meta.helperText).toBe('Informacje o testowym polu progress');
    expect(doc.meta.label).toBe('Progress');
  });

  it('should validate zero progress', async () => {
    const doc = new SliderFieldModel(FIELDS_CONFIG.PROGRESS);

    expect(doc.value.progress).toBe(0);
    expect(doc.validateField().toString()).toBe([].toString());
  });

  it('should validate minus progress', async () => {
    const doc = new SliderFieldModel({
      ...FIELDS_CONFIG.PROGRESS,
      value: {
        progress: -10,
      },
    });

    expect(doc.value.progress).toBe(-10);
    expect(doc.validateField().toString()).toBe(
      ['wartość w przedziale od 0 do 100.'].toString(),
    );
  });

  it('should validate progress over max value', async () => {
    const doc = new SliderFieldModel({
      ...FIELDS_CONFIG.PROGRESS,
      value: {
        progress: 110,
      },
    });

    expect(doc.value.progress).toBe(110);
    expect(doc.validateField().toString()).toBe(
      ['wartość w przedziale od 0 do 100.'].toString(),
    );
  });
});
