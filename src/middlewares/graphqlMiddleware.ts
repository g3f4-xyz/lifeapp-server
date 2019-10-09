import { Middleware } from 'express-graphql';
import * as graphqlHTTP from 'express-graphql';
import { IncomingMessage } from 'http';
import { DEMO_USER } from '../config';
import settingsApi from '../db/api/settings/settingsApi';
import taskTypeApi from '../db/api/task-type/taskTypeApi';
import taskApi from '../db/api/task/taskApi';
import { User } from '../db/interfaces';
import { Schema } from '../graphql/schema/Schema';
import UserService from '../services/UserService';
import SettingsService from '../services/SettingsService';
import TaskService from '../services/TaskService';
import TaskTypeService from '../services/TaskTypeService';

export const graphqlMiddleware: Middleware = graphqlHTTP(
  (req: IncomingMessage & { user: User }) => ({
    schema: Schema,
    pretty: true,
    graphiql: true,
    context: {
      user: req.user || DEMO_USER,
      userService: new UserService(taskApi, settingsApi),
      taskService: new TaskService(taskApi, settingsApi),
      taskTypeService: new TaskTypeService(taskTypeApi),
      settingsService: new SettingsService(settingsApi),
    },
  }),
);
