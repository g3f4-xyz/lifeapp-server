// @ts-ignore
declare global {
  namespace NodeJS {
    // tslint:disable-next-line:interface-name
    interface Global {
      __MONGO_URI__: string;
    }
  }
}
