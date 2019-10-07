import { FIELD_ID, TASK_TYPE } from '../../../../../constants';
import setupMongo from '../../../../../utils/tests/setupMongo';
import { ChoiceFieldModel } from '../../../fields/choice/ChoiceFieldModel';
import { NestedFieldModel } from '../../../fields/nested/NestedFieldModel';
import { SwitchFieldModel } from '../../../fields/switch/SwitchFieldModel';
import { TextFieldModel } from '../../../fields/text/TextFieldModel';
import { TASK_FIELDS } from '../../taskFields';
import { TaskModel } from '../../TaskModel';
import { RoutineModel } from '../RoutineModel';

describe('RoutineModel', () => {
  setupMongo();

  it('should be defined', () => {
    expect(RoutineModel).toBeDefined();
  });

  it('should be discriminate model based on task type and nested fields based on field type', async () => {
    const ownerId = '1234567890';
    const doc = await TaskModel.create({
      ownerId,
      taskType: TASK_TYPE.ROUTINE,
      fields: TASK_FIELDS.ROUTINE,
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

    expect(model.fields[3]).toBeInstanceOf(NestedFieldModel);
    expect(model.fields[3].fieldId).toEqual(FIELD_ID.CYCLE);
    expect(model.fields[3].value.ownValue).toEqual(null);
    expect(model.fields[3].value.childrenValue).toEqual(null);

    expect(model.fields[4]).toBeInstanceOf(TextFieldModel);
    expect(model.fields[4].fieldId).toEqual(FIELD_ID.ACTION);
    expect(model.fields[4].value.text).toEqual('');

    expect(model.fields[5]).toBeInstanceOf(NestedFieldModel);
    expect(model.fields[5].fieldId).toEqual(FIELD_ID.NOTIFICATIONS);
    expect(model.fields[5].value.ownValue).toEqual(null);
    expect(model.fields[5].value.childrenValue).toEqual(null);
  });
});
