#!/usr/bin/env node
var debug = require('debug')('calendar-service');
var app = require('../app/server');
var pckge = require('../package');

app.set('port', process.env.PORT || pckge.config.port);

var server = app.listen(app.get('port'), function() {
  debug('calendar Service listening on port %s.', server.address().port);
});
