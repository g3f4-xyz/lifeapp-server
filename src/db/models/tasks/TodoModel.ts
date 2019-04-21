import { Schema } from 'mongoose';
import { TASK_TYPE } from '../../../constants';
import { FIELDS_CONFIG, ITaskDocument, ITaskModel, TaskModel } from './TaskModel';

const TodoSchema: Schema<ITaskDocument> = new Schema({});
// TODO jak wymusić tsc żeby tylko na poziomie TaskModel typować addOne
TodoSchema.statics.addOne = (ownerId: string) => {
  return new TodoModel({
    ownerId,
    fields: [
      FIELDS_CONFIG.TITLE,
      FIELDS_CONFIG.PRIORITY,
      FIELDS_CONFIG.STATUS,
      FIELDS_CONFIG.NOTE,
      FIELDS_CONFIG.NOTIFICATIONS,
    ],
  });
};

// @ts-ignore
export const TodoModel: ITaskModel = TaskModel.discriminator(
  TASK_TYPE.TODO,
  TodoSchema,
);
