import { FIELD_TYPE, TASK_TYPE } from '../../../../constants';
import setupMongo from '../../../../utils/tests/setupMongo';
import { ChoiceFieldModel } from '../../fields/choice/ChoiceFieldModel';
import { NestedFieldModel } from '../../fields/nested/NestedFieldModel';
import { SliderFieldModel } from '../../fields/slider/SliderFieldModel';
import { SwitchFieldModel } from '../../fields/switch/SwitchFieldModel';
import { TextFieldModel } from '../../fields/text/TextFieldModel';
import { TaskModel } from '../TaskModel';

describe('TaskModel', () => {
  setupMongo();

  it('should be defined', () => {
    expect(TaskModel).toBeDefined();
  });

  it('should be able to create document with fields of all types with default values', async () => {
    const ownerId = '1234567890';
    const taskData = {
      ownerId,
      taskType: TASK_TYPE.EVENT,
      fields: [
        {
          fieldType: FIELD_TYPE.TEXT,
          meta: { label: `${FIELD_TYPE.TEXT}-label` },
        },
        {
          fieldType: FIELD_TYPE.CHOICE,
          meta: { label: `${FIELD_TYPE.CHOICE}-label` },
        },
        {
          fieldType: FIELD_TYPE.SLIDER,
          meta: { label: `${FIELD_TYPE.SLIDER}-label` },
        },
        {
          fieldType: FIELD_TYPE.SWITCH,
          meta: { label: `${FIELD_TYPE.SWITCH}-label` },
        },
        {
          fieldType: FIELD_TYPE.NESTED,
          meta: { label: `${FIELD_TYPE.NESTED}-label` },
        },
      ],
    };
    const doc = await TaskModel.create(taskData);

    expect(doc.id).toBeDefined();
    expect(doc._id).toBeDefined();
    expect(doc._id.toString()).toBe(doc.id);
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
