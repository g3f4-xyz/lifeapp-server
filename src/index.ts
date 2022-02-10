// tslint:disable-next-line:no-var-requires
require('dotenv').config();
// import agenda from './agenda';
import app from './app';
import { PORT } from './config';
import initWebPush from './webPush/initWebPush';

(async () => {
  initWebPush();
  app().listen(PORT, () => {
    console.info(`express app running on port: ${PORT}`);
  });
  // agenda();
})();
