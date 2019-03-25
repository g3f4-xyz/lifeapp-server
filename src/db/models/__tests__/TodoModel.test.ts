import { FIELD_ID } from '../../../constants';
import { ChoiceFieldModel } from '../ChoiceFieldModel';
import { NestedFieldModel } from '../NestedFieldModel';
import { SwitchFieldModel } from '../SwitchFieldModel';
import { TextFieldModel } from '../TextFieldModel';
import { TodoModel } from '../TodoModel';

describe('TodoModel', () => {
  it('should be defined', () => {
    expect(TodoModel).toBeDefined();
  });

  it('should be able to create document with fields of all types with default values', async (done) => {
    // @ts-ignore
    const doc = TodoModel.addTodo();

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

    expect(doc.fields[4]).toBeInstanceOf(NestedFieldModel);
    expect(doc.fields[4].fieldId).toEqual(FIELD_ID.NOTIFICATIONS);
    expect(doc.fields[4].value.ownValue).toEqual(null);
    expect(doc.fields[4].value.childrenValue).toEqual(null);

    done();
  });
});
