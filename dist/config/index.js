'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config({
    path: _path2.default.join(__dirname, '../../.env')
});

const config = {
    env: process.env.NODE_ENV,
    http: {
        port: process.env.HTTP_PORT
    },
    p2p: {
        port: process.env.P2P_PORT,
        peers: process.env.P2P_PEERS ? process.env.P2P_PEERS.split(',') : []
    }
};

exports.default = config;
//# sourceMappingURL=index.js.map