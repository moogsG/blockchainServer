'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.connectToPeers = exports.initConnection = undefined;

var _ws = require('ws');

var _ws2 = _interopRequireDefault(_ws);

var _index = require('../config/index');

var _index2 = _interopRequireDefault(_index);

var _sockets = require('./sockets');

var _sockets2 = _interopRequireDefault(_sockets);

var _handlers = require('./handlers');

var _actions = require('./actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');
var WebSocketServer = require('ws').Server
var path = require('path');

var PORT = process.env.P2P_PORT || 6001;

var app = express();
var server =  app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
var p2p = new WebSocketServer({server})



const initConnection = exports.initConnection = ws => {
    _sockets2.default.update(ws);
    (0, _handlers.onMessage)(ws);
    (0, _handlers.onError)(ws);
    (0, _handlers.write)(ws, (0, _actions.queryChainLengthMsg)());
};

const connectToPeers = exports.connectToPeers = newPeers => {
    newPeers.forEach(peer => {
        const ws = new _ws2.default(peer);
        ws.on('open', () => {
            console.log('Connection received to peer: ', peer);
            initConnection(ws);
        });
        ws.on('error', () => {
            console.log('Connection failed to peer: ', peer);
        });
    });
};

exports.default = p2p;
//# sourceMappingURL=index.js.map
