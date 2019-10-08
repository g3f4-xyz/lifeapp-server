import { connect, connection, set } from 'mongoose';
import { DB_HOST } from '../config';
import { CONSOLE_COLORS } from '../constants';

const connectDB = async (host: string = DB_HOST) => {
  set('debug', true);

  connection.on('error', console.error.bind(console, 'connection error:'));
  connection.once('open', () => {
    console.info(CONSOLE_COLORS.CYAN, `connected to database | HOST: ${host}`);
  });
  connection.on('close', () => {
    console.info(CONSOLE_COLORS.CYAN, 'connection to database closed');
  });

  return await connect(
    host,
    { useNewUrlParser: true, useUnifiedTopology: true },
  );
};

export default connectDB;
