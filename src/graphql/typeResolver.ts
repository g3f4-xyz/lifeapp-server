import { GraphQLObjectType } from 'graphql';
import { Model } from 'mongoose';
import { TaskModel } from '../db/models/TaskModel';
import { TaskTypeModel } from '../db/models/TaskTypeModel';

export const typeResolver = (obj: Model<any>): GraphQLObjectType => {
  if (obj instanceof TaskModel) {
    return require('./types/TaskType');
  } else if (obj instanceof TaskTypeModel) {
    return require('./types/TaskTypeType');
  }
};
