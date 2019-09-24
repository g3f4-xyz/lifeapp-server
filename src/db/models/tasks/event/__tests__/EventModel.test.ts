import { FIELD_ID, TASK_TYPE } from '../../../../../constants';
import connectDB from '../../../../connect';
import { ChoiceFieldModel } from '../../../fields/choice/ChoiceFieldModel';
import { NestedFieldModel } from '../../../fields/nested/NestedFieldModel';
import { SwitchFieldModel } from '../../../fields/switch/SwitchFieldModel';
import { TextFieldModel } from '../../../fields/text/TextFieldModel';
import { TASK_FIELDS, TaskModel } from '../../TaskModel';
import { EventModel } from '../EventModel';

describe('EventModel', () => {
  beforeAll(async () => {
    // @ts-ignore
    await connectDB(global.__MONGO_URI__);
  });

  it('should be defined', () => {
    expect(EventModel).toBeDefined();
  });

  it('should be discriminate model based on task type and nested fields based on field type', async () => {
    const ownerId = '1234567890';
    const doc = await TaskModel.create({
      ownerId,
      taskType: TASK_TYPE.EVENT,
      fields: TASK_FIELDS.EVENT,
    });

    const model = await doc.save();

    model.validateFields();

    expect(model).toBeDefined();
    expect(model.ownerId).toEqual(ownerId);

    expect(model.fields[0]).toBeInstanceOf(TextFieldModel);
    expect(model.fields[0].fieldId).toEqual(FIELD_ID.TITLE);
    expect(model.fields[0].value.text).toEqual('');

    expect(model.fields[1]).toBeInstanceOf(SwitchFieldModel);
    expect(model.fields[1].fieldId).toEqual(FIELD_ID.PRIORITY);
    expect(model.fields[1].value.enabled).toEqual(false);

    expect(model.fields[2]).toBeInstanceOf(ChoiceFieldModel);
    expect(model.fields[2].fieldId).toEqual(FIELD_ID.STATUS);
    expect(model.fields[2].value.id).toEqual('');

    expect(model.fields[3]).toBeInstanceOf(TextFieldModel);
    expect(model.fields[3].fieldId).toEqual(FIELD_ID.NOTE);
    expect(model.fields[3].value.text).toEqual('');

    expect(model.fields[4]).toBeInstanceOf(TextFieldModel);
    expect(model.fields[4].fieldId).toEqual(FIELD_ID.LOCATION);
    expect(model.fields[4].value.text).toEqual('');

    expect(model.fields[5]).toBeInstanceOf(TextFieldModel);
    expect(model.fields[5].fieldId).toEqual(FIELD_ID.DATE);
    expect(model.fields[5].value.text).toEqual('');

    expect(model.fields[6]).toBeInstanceOf(TextFieldModel);
    expect(model.fields[6].fieldId).toEqual(FIELD_ID.DURATION);
    expect(model.fields[6].value.text).toEqual('');

    expect(model.fields[7]).toBeInstanceOf(NestedFieldModel);
    expect(model.fields[7].fieldId).toEqual(FIELD_ID.NOTIFICATIONS);
    expect(model.fields[7].value.ownValue).toEqual(null);
    expect(model.fields[7].value.childrenValue).toEqual(null);
  });
});
