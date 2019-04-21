import { FIELD_ID } from '../../../../constants';
import { ChoiceFieldModel } from '../../fields/ChoiceFieldModel';
import { NestedFieldModel } from '../../fields/NestedFieldModel';
import { SwitchFieldModel } from '../../fields/SwitchFieldModel';
import { TextFieldModel } from '../../fields/TextFieldModel';
import { EventModel } from '../EventModel';

describe('EventModel', () => {
  it('should be defined', () => {
    expect(EventModel).toBeDefined();
  });

  it('should be able to addOne document with fields of all types with default values', async (done) => {
    // @ts-ignore
    const doc = EventModel.addOne();

    expect(doc).toBeDefined();

    expect(doc.fields[0]).toBeInstanceOf(TextFieldModel);
    expect(doc.fields[0].fieldId).toEqual(FIELD_ID.TITLE);
    expect(doc.fields[0].value.text).toEqual('');

    expect(doc.fields[1]).toBeInstanceOf(SwitchFieldModel);
    expect(doc.fields[1].fieldId).toEqual(FIELD_ID.PRIORITY);
    expect(doc.fields[1].value.enabled).toEqual(false);

    expect(doc.fields[2]).toBeInstanceOf(ChoiceFieldModel);
    expect(doc.fields[2].fieldId).toEqual(FIELD_ID.STATUS);
    expect(doc.fields[2].value.id).toEqual('');

    expect(doc.fields[3]).toBeInstanceOf(TextFieldModel);
    expect(doc.fields[3].fieldId).toEqual(FIELD_ID.NOTE);
    expect(doc.fields[3].value.text).toEqual('');

    expect(doc.fields[4]).toBeInstanceOf(TextFieldModel);
    expect(doc.fields[4].fieldId).toEqual(FIELD_ID.LOCATION);
    expect(doc.fields[4].value.text).toEqual('');

    expect(doc.fields[5]).toBeInstanceOf(TextFieldModel);
    expect(doc.fields[5].fieldId).toEqual(FIELD_ID.DATE);
    expect(doc.fields[5].value.text).toEqual('');

    expect(doc.fields[6]).toBeInstanceOf(TextFieldModel);
    expect(doc.fields[6].fieldId).toEqual(FIELD_ID.DURATION);
    expect(doc.fields[6].value.text).toEqual('');

    expect(doc.fields[7]).toBeInstanceOf(NestedFieldModel);
    expect(doc.fields[7].fieldId).toEqual(FIELD_ID.NOTIFICATIONS);
    expect(doc.fields[7].value.ownValue).toEqual(null);
    expect(doc.fields[7].value.childrenValue).toEqual(null);

    done();
  });
});
