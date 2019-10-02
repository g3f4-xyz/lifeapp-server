import { FIELD_ID, FIELD_TYPE } from '../../../../constants';
import getFieldDefaultValue from '../getFieldDefaultValue';
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
    const choiceDefaultValue = getFieldDefaultValue(FIELD_TYPE.CHOICE);
    const nestedDefaultValue = getFieldDefaultValue(FIELD_TYPE.NESTED);
    const sliderDefaultValue = getFieldDefaultValue(FIELD_TYPE.SLIDER);
    const switchDefaultValue = getFieldDefaultValue(FIELD_TYPE.SWITCH);
    const textDefaultValue = getFieldDefaultValue(FIELD_TYPE.TEXT);

    expect(choiceDefaultValue).toEqual({ id: '' });
    expect(nestedDefaultValue).toEqual({
      ownValue: null,
      childrenValue: null,
    });
    expect(sliderDefaultValue).toEqual({ progress: 0 });
    expect(switchDefaultValue).toEqual({ enabled: false });
    expect(textDefaultValue).toEqual({ text: '' });
  });

  it('should return default values for fields by field id', async () => {
    const dateTimeDefaultValue = getFieldDefaultValue(
      FIELD_TYPE.TEXT,
      FIELD_ID.DATE_TIME,
    );

    expect(dateTimeDefaultValue).toEqual({ text: '2019-10-02T16:07:28.857Z' });
  });
});
