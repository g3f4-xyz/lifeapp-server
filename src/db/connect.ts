import { connect, connection, set } from 'mongoose';
import { DB_HOST } from '../config';

const connectDB = async (host: string = DB_HOST) => {
  set('debug', process.env.DEBUG === 'jest-mongodb:*');

  connection.on('error', console.error.bind(console, 'connection error:'));

  return await connect(
    host,
    { useNewUrlParser: true, useUnifiedTopology: true },
  );
};

export default connectDB;
