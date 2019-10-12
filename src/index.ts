// tslint:disable-next-line:no-var-requires
require('dotenv').config();
// import agenda from './agenda';
import app from './app';
import authentication from './authentication';
import { CONSOLE_COLORS } from './constants';
import connectDB from './db/connect';
import initWebPush from './webPush/initWebPush';

(async () => {
  await connectDB();
  app.listen(app.get('port'), () => {
    console.info(
      CONSOLE_COLORS.BLUE,
      `express app running on port: ${app.get('port')}`,
    );
  });
  authentication();
  initWebPush();
  // agenda();
})();
