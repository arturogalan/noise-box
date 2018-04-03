const express = require('express');
const bunyan = require('bunyan');

// Logging everything
const logfilePath = __dirname + "/noise-box.log";
const loggerOpts = {
  name: 'PWS example app',
  serializers: {
    req: bunyan.stdSerializers.req,
    res: bunyan.stdSerializers.res,
    err: bunyan.stdSerializers.err
  },
  streams: [{
    stream: process.stdout,
    level: 'info'
  }, {
    type: 'rotating-file',
    path: logfilePath,
    period: '1d',
    count: 3,
    level: 'info'
  }]
};
const logger = require('bunyan')(loggerOpts);

process.on('SIGHUP', function () {
  logger.reopenFileStreams();
});


const app = express();
app.use(express.static('dist'));

module.exports = app;

let server = null;

server = app.listen(process.env.PORT || 8080, function(){
    logger.info('NOISE-BOX is listening at ' + server.address().port + '/');
})