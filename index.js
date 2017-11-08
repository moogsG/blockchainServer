'use strict';
var port = (process.env.PORT || 8080)
var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _http = require('./http');

var _http2 = _interopRequireDefault(_http);

var _index = require('./p2p/index');

var _index2 = _interopRequireDefault(_index);
var express = require('express');
var WebSocketServer = require('ws').Server
var path = require('path');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var server =  _http2.default.listen(port, () => console.log(`Listening on ${ port }`));
var p2p = new WebSocketServer({server})
_http2.default.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
//_index2.default.on('connection', ws => (0, _index.initConnection)(ws));
console.info(`P2P server has been started on port: ${_config2.default.p2p.port} (${_config2.default.env})`);

(0, _index.connectToPeers)(_config2.default.p2p.peers);
//# sourceMappingURL=index.js.map
