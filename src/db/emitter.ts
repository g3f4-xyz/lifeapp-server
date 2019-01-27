import { EventEmitter } from 'events';

class ApiEventsEmitter extends EventEmitter {
  constructor() {
    super();
  }
}

export const emitter = new ApiEventsEmitter();
