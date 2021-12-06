import * as graphqlHTTP from 'express-graphql';
import { Middleware } from 'express-graphql';
import SettingsApi from '../db/api/settings/settingsApi';
import settingsApi from '../db/api/settings/settingsApi';
import TaskApi from '../db/api/task/taskApi';
import { Context } from '../db/interfaces';
import { Schema } from '../graphql/schema/Schema';
import NotificationsService from '../services/NotificationsService';
import SettingsService from '../services/SettingsService';
import TaskService from '../services/TaskService';
import TaskTypeService from '../services/TaskTypeService';
import { userFromAuth0Request, AuthORequest } from './checkJwt';

export const graphqlMiddleware: Middleware = graphqlHTTP(
  (req: AuthORequest) => {
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
        notificationsService: new NotificationsService(settingsApi),
      } as Context,
    };
  },
);
