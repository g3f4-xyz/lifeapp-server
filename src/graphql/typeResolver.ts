import { GraphQLObjectType } from 'graphql';
import { Model } from 'mongoose';
import { TaskModel } from '../db/models/TaskModel';
import { TaskTypeModel } from '../db/models/TaskTypeModel';

export const typeResolver = (obj: Model<any>): GraphQLObjectType => {
  if (obj instanceof TaskModel) {
    return require('./schema/query/app/task/TaskType');
  } else if (obj instanceof TaskTypeModel) {
    return require('./schema/query/app/task-type-list/TaskTypeType');
  }
};
