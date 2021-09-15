import * as graphqlHTTP from 'express-graphql';
import { Middleware } from 'express-graphql';
import settingsApi from '../db/api/settings/settingsApi';
import taskApi from '../db/api/task/taskApi';
import { Context } from '../db/interfaces';
import { Schema } from '../graphql/schema/Schema';
import NotificationsService from '../services/NotificationsService';
import SettingsService from '../services/SettingsService';
import TaskService from '../services/TaskService';
import TaskTypeService from '../services/TaskTypeService';
import { userFromAuth0Request, AuthORequest } from './checkJwt';

export const graphqlMiddleware: Middleware = graphqlHTTP(
  (req: AuthORequest) => {
    const settingsService = new SettingsService(settingsApi);

    return {
      schema: Schema,
      pretty: true,
      graphiql: true,
      context: {
        user: userFromAuth0Request(req),
        taskService: new TaskService(taskApi, settingsService),
        taskTypeService: new TaskTypeService(),
        settingsService,
        notificationsService: new NotificationsService(settingsApi),
      } as Context,
    };
  },
);
