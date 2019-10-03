import { connect, connection, set } from 'mongoose';
import { DB_HOST } from '../config';
import { CONSOLE_COLORS } from '../constants';

const connectDB = async (host: string = DB_HOST) => {
  console.info(CONSOLE_COLORS.CYAN, `connected to database | HOST: ${host}`);

  await connect(
    host,
    { useNewUrlParser: true, useUnifiedTopology: true },
  );

  set('debug', process.env.DEBUG === 'jest-mongodb:*');

  connection.on('error', console.error.bind(console, 'connection error:'));
  connection.once('open', () =>
    console.info(`MongoDB connected to host: ${host}`),
  );
};

export default connectDB;
