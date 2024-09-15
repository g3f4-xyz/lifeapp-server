// tslint:disable-next-line:no-var-requires
require('dotenv').config();
import app from './app';
import { PORT } from './config';

(async () => {
  app().listen(PORT, () => {
    console.info(`express app running on port: ${PORT}`);
  });
})();
