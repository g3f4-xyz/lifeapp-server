const EventEmitter = require('events');

class ApiEventsEmitter extends EventEmitter {
  constructor() {
    super();
    console.log('API emitter created');
  }
}

const emitter = new ApiEventsEmitter();

module.exports = emitter;
