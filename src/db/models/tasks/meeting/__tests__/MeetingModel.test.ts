import { FIELD_ID, TASK_TYPE } from '../../../../../constants';
import setupMongo from '../../../../../utils/tests/setupMongo';
import { ChoiceFieldModel } from '../../../fields/choice/ChoiceFieldModel';
import { NestedFieldModel } from '../../../fields/nested/NestedFieldModel';
import { SwitchFieldModel } from '../../../fields/switch/SwitchFieldModel';
import { TextFieldModel } from '../../../fields/text/TextFieldModel';
import { TASK_FIELDS } from '../../taskFields';
import { TaskModel } from '../../TaskModel';
import { MeetingModel } from '../MeetingModel';

describe('MeetingModel', () => {
  setupMongo();

  it('should be defined', () => {
    expect(MeetingModel).toBeDefined();
  });

  it('should be discriminate model based on task type and nested fields based on field type', async () => {
    const ownerId = '1234567890';
    const doc = await TaskModel.create({
      ownerId,
      taskType: TASK_TYPE.MEETING,
      fields: TASK_FIELDS.MEETING,
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
    expect(model.fields[5].fieldId).toEqual(FIELD_ID.DATE_TIME);
    expect(model.fields[5].value.text).toEqual('');

    expect(model.fields[6]).toBeInstanceOf(TextFieldModel);
    expect(model.fields[6].fieldId).toEqual(FIELD_ID.DURATION);
    expect(model.fields[6].value.text).toEqual('');

    expect(model.fields[7]).toBeInstanceOf(TextFieldModel);
    expect(model.fields[7].fieldId).toEqual(FIELD_ID.PERSON);
    expect(model.fields[7].value.text).toEqual('');

    expect(model.fields[8]).toBeInstanceOf(NestedFieldModel);
    expect(model.fields[8].fieldId).toEqual(FIELD_ID.NOTIFICATIONS);
    expect(model.fields[8].value.ownValue).toEqual(null);
    expect(model.fields[8].value.childrenValue).toEqual(null);
  });
});
