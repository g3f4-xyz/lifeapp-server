import { connect, connection, set } from 'mongoose';
import { DB_HOST } from '../config';
import { CONSOLE_COLORS } from '../constants';

const connectDB = async (host: string = DB_HOST) => {
  console.log(CONSOLE_COLORS.CYAN, `connected to database | HOST: ${host}`);
  await connect(host, { useNewUrlParser: true });
  set('debug', true);
  connection.on('error', console.error.bind(console, 'connection error:')); // tslint:disable-line no-console
  connection.once('open', () => console.log(`MongoDB connected to host: ${host}`)); // tslint:disable-line no-console
};

export default connectDB;
