'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _chain = require('../chain');

var _chain2 = _interopRequireDefault(_chain);

var _block = require('../block');

var _sockets = require('../p2p/sockets');

var _sockets2 = _interopRequireDefault(_sockets);

var _index = require('../p2p/index');

var _handlers = require('../p2p/handlers');

var _actions = require('../p2p/actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mine(data) {
  const block = (0, _block.create)(data);
  console.log(req.body);
  _chain2.default.update(block);
  (0, _handlers.broadcast)((0, _actions.responseLatestMsg)());
  console.log('New block in chain has been added: ', block);
  res.send(block);
  data = [];
}
const router = _express2.default.Router();

var data = [];
router.get('/health-check', (req, res) => res.send('OK'));

router.get('/chain', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(_chain2.default.get()));
});

router.post('/mine', (req, res) => {
    data = data.concat(req.body.data);
    setInterval(mine, 30*1000);
});

router.get('/peers', (req, res) => {
    res.send(_sockets2.default.get().map(s => `${s._socket.remoteAddress}:${s._socket.remotePort}`)); // eslint-disable-line no-underscore-dangle
});

router.post('/connect', (req, res) => {
    const { peer } = req.body;
    (0, _index.connectToPeers)([peer]);
    console.log('New peer in p2p websocket has been added: ', peer);
    res.send(peer);
});

exports.default = router;
//# sourceMappingURL=routes.js.map
