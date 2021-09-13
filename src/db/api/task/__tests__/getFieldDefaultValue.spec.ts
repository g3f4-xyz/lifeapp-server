import { FieldId, FieldType } from '../../../../constants';
import { Field } from '../../../interfaces';
import mapFieldDefaultValue from '../getFieldDefaultValue';
import SpyInstance = jest.SpyInstance;

describe('getFieldDefaultValue', () => {
  let dateNowSpy: SpyInstance;

  beforeAll(() => {
    dateNowSpy = jest
      .spyOn(Date, 'now')
      .mockImplementation(() => 1570032448857);
  });

  afterAll(() => {
    dateNowSpy.mockRestore();
  });

  it('should return default values for fields by field type', async () => {
    const choiceField = mapFieldDefaultValue(({
      fieldType: FieldType.CHOICE,
      fieldId: '',
    } as unknown) as Field);
    const nestedField = mapFieldDefaultValue(({
      fieldType: FieldType.NESTED,
      fieldId: '',
    } as unknown) as Field);
    const sliderField = mapFieldDefaultValue(({
      fieldType: FieldType.SLIDER,
      fieldId: '',
    } as unknown) as Field);
    const switchField = mapFieldDefaultValue(({
      fieldType: FieldType.SWITCH,
      fieldId: '',
    } as unknown) as Field);
    const textField = mapFieldDefaultValue(({
      fieldType: FieldType.TEXT,
      fieldId: '',
    } as unknown) as Field);

    expect(choiceField.value).toEqual({ id: '' });
    expect(nestedField.value).toEqual({
      ownValue: null,
      childrenValue: null,
    });
    expect(sliderField.value).toEqual({ progress: 0 });
    expect(switchField.value).toEqual({ enabled: false });
    expect(textField.value).toEqual({ text: '' });
  });

  it('should return default values for fields by field id', async () => {
    const dateTimeField = mapFieldDefaultValue(({
      fieldType: FieldType.TEXT,
      fieldId: FieldId.DATE_TIME,
    } as unknown) as Field);
    const statusField = mapFieldDefaultValue(({
      fieldType: FieldType.CHOICE,
      fieldId: FieldId.STATUS,
      meta: {
        defaultOption: 'TEST',
      },
    } as unknown) as Field);

    expect(dateTimeField.value).toEqual({ text: '2019-10-02T16:07:28.857Z' });
    expect(statusField.value).toEqual({ id: 'TEST' });
  });
});
