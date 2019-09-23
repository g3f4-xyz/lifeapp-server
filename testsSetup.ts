import * as mongoose from 'mongoose';
import connectDB from './src/db/connect';
import {
  registerFieldsDiscriminators,
  registerTasksDiscriminators
} from './src/db/models/registerFieldsDiscriminators';

async function removeAllCollections() {
//  const collections = Object.keys(mongoose.connection.collections);
//
//  for (const collectionName of collections) {
//    const collection = mongoose.connection.collections[collectionName];
//
//    await collection.deleteMany(() => true);
//  }
}

async function dropAllCollections() {
  const collections = Object.keys(mongoose.connection.collections);

  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];

    try {
      await collection.drop();
    } catch (error) {
      if (error.message === 'ns not found') { return; }
      if (error.message.includes('a background operation is currently running')) { return; }

      console.log(error.message);
    }
  }
}

export function setupDB(databaseName: string) {
  beforeAll(async () => {
    registerTasksDiscriminators();
    registerFieldsDiscriminators();
    await connectDB(databaseName);
  });

  afterEach(async () => {
    await removeAllCollections();
  });

  afterAll(async () => {
    await dropAllCollections();
    await mongoose.connection.close();
  });
}
