// tslint:disable-next-line:no-var-requires
require('dotenv').config();
// import agenda from './agenda';
import app from './app';
import { PORT } from './config';
import connectDB from './db/connect';
import initWebPush from './webPush/initWebPush';

(async () => {
  await connectDB();
  initWebPush();
  app().listen(PORT, () => {
    console.info(`express app running on port: ${PORT}`);
  });
  // agenda();
})();
