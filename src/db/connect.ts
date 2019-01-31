import { connect, connection, set } from 'mongoose';
import { DB_HOST } from '../config';

(async () => {
  await connect(DB_HOST);
  set('debug', true);
  connection.on('error', console.error.bind(console, 'connection error:')); // tslint:disable-line no-console
  connection.once('open', () => console.log(`MongoDB connected to host: ${DB_HOST}`)); // tslint:disable-line no-console
})();
