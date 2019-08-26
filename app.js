const EventEmitter = require('events');
const LoggerClass = require('./logger');
const logger = new LoggerClass();

logger.on('someMessage', data => {
    console.log('Data:','try',data);  
})

logger.log();

// emitter.emit('someMessage',{arg:'just msg'});