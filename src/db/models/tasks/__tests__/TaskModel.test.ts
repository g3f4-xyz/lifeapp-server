import { FIELD_TYPE, TASK_TYPE } from '../../../../constants';
import connectDB from '../../../connect';
import { ChoiceFieldModel } from '../../fields/ChoiceFieldModel';
import { NestedFieldModel } from '../../fields/NestedFieldModel';
import { SliderFieldModel } from '../../fields/SliderFieldModel';
import { SwitchFieldModel } from '../../fields/SwitchFieldModel';
import { TextFieldModel } from '../../fields/TextFieldModel';
import { TaskModel } from '../TaskModel';

describe('TaskModel', () => {
  beforeAll(async () => {
    // @ts-ignore
    await connectDB(global.__MONGO_URI__);
  });

  it('should be defined', () => {
    expect(TaskModel).toBeDefined();
  });

  it('should be able to create document with fields of all types with default values', async () => {
    const ownerId = '1234567890';
    const taskData = {
      ownerId,
      taskType: TASK_TYPE.EVENT,
      fields: [
        { fieldType: FIELD_TYPE.TEXT, meta: { label: `${FIELD_TYPE.TEXT}-label` } },
        { fieldType: FIELD_TYPE.CHOICE, meta: { label: `${FIELD_TYPE.CHOICE}-label` } },
        { fieldType: FIELD_TYPE.SLIDER, meta: { label: `${FIELD_TYPE.SLIDER}-label` } },
        { fieldType: FIELD_TYPE.SWITCH, meta: { label: `${FIELD_TYPE.SWITCH}-label` } },
        { fieldType: FIELD_TYPE.NESTED, meta: { label: `${FIELD_TYPE.NESTED}-label` } },
      ],
    };
    const doc = await TaskModel.create(taskData);

    expect(doc.ownerId).toEqual(ownerId);
    expect(doc.fields.length).toEqual(5);

    expect(doc.fields[0]).toBeInstanceOf(TextFieldModel);
    expect(doc.fields[0].value.text).toEqual('');

    expect(doc.fields[1]).toBeInstanceOf(ChoiceFieldModel);
    expect(doc.fields[1].value.id).toEqual('');

    expect(doc.fields[2]).toBeInstanceOf(SliderFieldModel);
    expect(doc.fields[2].value.progress).toEqual(0);

    expect(doc.fields[3]).toBeInstanceOf(SwitchFieldModel);
    expect(doc.fields[3].value.enabled).toEqual(false);

    expect(doc.fields[4]).toBeInstanceOf(NestedFieldModel);
    expect(doc.fields[4].value.ownValue).toEqual(null);
    expect(doc.fields[4].value.childrenValue).toEqual(null);
  });
});
