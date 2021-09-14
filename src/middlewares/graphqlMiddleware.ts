import * as graphqlHTTP from 'express-graphql';
import { Middleware } from 'express-graphql';
import { DEMO_USER } from '../config';
import settingsApi from '../db/api/settings/settingsApi';
import taskApi from '../db/api/task/taskApi';
import userApi from '../db/api/user/userApi';
import { Context } from '../db/interfaces';
import { Schema } from '../graphql/schema/Schema';
import NotificationsService from '../services/NotificationsService';
import SettingsService from '../services/SettingsService';
import TaskService from '../services/TaskService';
import TaskTypeService from '../services/TaskTypeService';
import UserService from '../services/UserService';

const userService = new UserService(taskApi, settingsApi, userApi);

export const graphqlMiddleware: Middleware = graphqlHTTP(async req => ({
  schema: Schema,
  pretty: true,
  graphiql: true,
  context: {
    // @ts-ignore
    user: await ((req.session.passport &&
      // @ts-ignore
      userService.getUser(req.session.passport.user)) ||
      DEMO_USER),
    userService: new UserService(taskApi, settingsApi, userApi),
    taskService: new TaskService(taskApi, settingsApi),
    taskTypeService: new TaskTypeService(),
    settingsService: new SettingsService(settingsApi),
    notificationsService: new NotificationsService(settingsApi),
  } as Context,
}));
