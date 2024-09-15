// eslint-disable-next-line @typescript-eslint/no-require-imports
require('dotenv').config();
import app from './app';
import { PORT } from './config';

(async () => {
  app().listen(PORT, () => {
    console.info(`express app running on port: ${PORT}`);
  });
})();
