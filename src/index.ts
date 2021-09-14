// tslint:disable-next-line:no-var-requires
require('dotenv').config();
// import agenda from './agenda';
import app from './app';
import authentication from './authentication';
import { PORT } from './config';
import settingsApi from './db/api/settings/settingsApi';
import taskApi from './db/api/task/taskApi';
import userApi from './db/api/user/userApi';
import connectDB from './db/connect';
import UserService from './services/UserService';
import initWebPush from './webPush/initWebPush';

console.log(['process.env.CLIENT_ORIGIN'], process.env.CLIENT_ORIGIN);

(async () => {
  const userService = new UserService(taskApi, settingsApi, userApi);

  await connectDB();
  authentication(userService);
  initWebPush();
  app(userService).listen(PORT, () => {
    console.info(`express app running on port: ${PORT}`);
  });
  // agenda();
})();
