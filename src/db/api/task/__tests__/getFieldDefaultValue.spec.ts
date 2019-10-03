import { FIELD_ID, FIELD_TYPE } from '../../../../constants';
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
      fieldType: FIELD_TYPE.CHOICE,
      fieldId: '',
    } as unknown) as Field);
    const nestedField = mapFieldDefaultValue(({
      fieldType: FIELD_TYPE.NESTED,
      fieldId: '',
    } as unknown) as Field);
    const sliderField = mapFieldDefaultValue(({
      fieldType: FIELD_TYPE.SLIDER,
      fieldId: '',
    } as unknown) as Field);
    const switchField = mapFieldDefaultValue(({
      fieldType: FIELD_TYPE.SWITCH,
      fieldId: '',
    } as unknown) as Field);
    const textField = mapFieldDefaultValue(({
      fieldType: FIELD_TYPE.TEXT,
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
      fieldType: FIELD_TYPE.TEXT,
      fieldId: FIELD_ID.DATE_TIME,
    } as unknown) as Field);
    const statusField = mapFieldDefaultValue(({
      fieldType: FIELD_TYPE.CHOICE,
      fieldId: FIELD_ID.STATUS,
      meta: {
        defaultOption: 'TEST',
      },
    } as unknown) as Field);

    expect(dateTimeField.value).toEqual({ text: '2019-10-02T18:07' });
    expect(statusField.value).toEqual({ id: 'TEST' });
  });
});
