import { graphqlHTTP } from 'express-graphql';
import SettingsApi from '../db/api/settings/SettingsApi';
import TaskApi from '../db/api/task/TaskApi';
import { Context } from '../db/interfaces';
import { Schema } from '../graphql/schema/Schema';
import SettingsService from '../services/SettingsService';
import TaskService from '../services/TaskService';
import TaskTypeService from '../services/TaskTypeService';
import { AuthORequest } from './checkJwt';

export const graphqlMiddleware = graphqlHTTP((req: AuthORequest) => {
  const settingsApi = new SettingsApi({
    token: req.get('Authorization'),
  });
  const settingsService = new SettingsService(settingsApi);
  const taskService = new TaskService(
    new TaskApi({
      token: req.get('Authorization'),
    }),
    settingsService,
  );

  return {
    schema: Schema,
    pretty: true,
    graphiql: true,
    context: {
      taskService,
      taskTypeService: new TaskTypeService(),
      settingsService,
    } as Context,
  };
});
