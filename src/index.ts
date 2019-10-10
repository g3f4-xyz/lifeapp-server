// tslint:disable-next-line:no-var-requires
require('dotenv').config();
// import agenda from './agenda';
import app from './app';
import authentication from './authentication';
import connectDB from './db/connect';
import initWebPush from './webPush/initWebPush';

(async () => {
  await connectDB();
  app();
  authentication();
  initWebPush();
  // agenda();
})();
