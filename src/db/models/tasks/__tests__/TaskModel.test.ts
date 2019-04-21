import { FIELD_TYPE } from '../../../../constants';
import { ChoiceFieldModel } from '../../fields/ChoiceFieldModel';
import { NestedFieldModel } from '../../fields/NestedFieldModel';
import { SliderFieldModel } from '../../fields/SliderFieldModel';
import { SwitchFieldModel } from '../../fields/SwitchFieldModel';
import { TaskModel } from '../TaskModel';
import { TextFieldModel } from '../../fields/TextFieldModel';

describe('TaskModel', () => {
  it('should be defined', () => {
    expect(TaskModel).toBeDefined();
  });

  it('should be able to addOne document with fields of all types with default values', async (done) => {
    const taskData = {
      fields: [
        { fieldType: FIELD_TYPE.TEXT },
        { fieldType: FIELD_TYPE.CHOICE },
        { fieldType: FIELD_TYPE.SLIDER },
        { fieldType: FIELD_TYPE.SWITCH },
        { fieldType: FIELD_TYPE.NESTED },
      ],
    };
    const doc = new TaskModel(taskData);

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

    done();
  });

  it('should addOne document for ownerId', () => {
    const ownerId = '1234567890';
    const doc = TaskModel.addOne(ownerId);

    expect(doc.ownerId).toBeDefined();
    expect(doc.ownerId).toEqual(ownerId);
  });
});
