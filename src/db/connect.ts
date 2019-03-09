import { connect, connection, set } from 'mongoose';
import { DB_HOST } from '../config';
import { CONSOLE_COLORS } from '../constants';

(async () => {
  console.log(CONSOLE_COLORS.CYAN, `connected to database | HOST: ${DB_HOST}`);
  await connect(DB_HOST, { useNewUrlParser: true });
  set('debug', true);
  connection.on('error', console.error.bind(console, 'connection error:')); // tslint:disable-line no-console
  connection.once('open', () => console.log(`MongoDB connected to host: ${DB_HOST}`)); // tslint:disable-line no-console
})();
