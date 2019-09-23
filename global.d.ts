declare global {
  namespace NodeJS {
    interface Global {
      __MONGO_URI__: string;
    }
  }
}
