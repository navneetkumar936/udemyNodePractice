const EventEmitter = require('events');

class LoggerClass extends EventEmitter{
    log(){
        this.emit('someMessage',{arg:'dgfdg'});
    }
}

module.exports = LoggerClass;