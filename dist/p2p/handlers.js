'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.onError = exports.onMessage = exports.broadcast = exports.write = undefined;

var _chain = require('../chain');

var _chain2 = _interopRequireDefault(_chain);

var _sockets = require('./sockets');

var _sockets2 = _interopRequireDefault(_sockets);

var _types = require('./types');

var _actions = require('./actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const write = exports.write = (ws, message) => {
    console.log('Write message data to p2p socket: ', message);
    ws.send(JSON.stringify(message));
};

const broadcast = exports.broadcast = message => {
    console.log('Broadcast message data to p2p socket: ', message);
    _sockets2.default.get().map(socket => write(socket, message));
};

const handleChainResponse = message => {
    const receivedBlocks = JSON.parse(message.data).sort((b1, b2) => b1.index - b2.index);
    const latestBlockReceived = receivedBlocks[receivedBlocks.length - 1];
    const latestBlockHeld = _chain2.default.last();

    if (latestBlockReceived.index === latestBlockHeld.index) {
        console.log('Received chain is no longer than hold chain. Do nothing');
        return;
    }

    console.log(`Chain is possibly behind. We got: ${latestBlockHeld.index} Peer got: ${latestBlockReceived.index}`);

    if (latestBlockHeld.hash === latestBlockReceived.prevHash) {
        console.log('We can append the received block to our chain');
        _chain2.default.update(latestBlockReceived);
        broadcast((0, _actions.responseLatestMsg)());
    } else if (receivedBlocks.length === 1) {
        console.log('We have to query the chain from our peer');
        broadcast((0, _actions.queryAllMsg)());
    } else {
        console.log('Received chain is longer than current chain. Replace chain');
        _chain2.default.replace(receivedBlocks);
    }
};

const onMessage = exports.onMessage = ws => {
    ws.on('message', data => {
        const message = JSON.parse(data);
        console.log(`Received message: ${JSON.stringify(message)}`);

        switch (message.type) {
            case _types.MessageType.QUERY_LATEST:
                write(ws, (0, _actions.responseLatestMsg)());
                break;
            case _types.MessageType.QUERY_ALL:
                console.log("%^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
                write(ws, (0, _actions.responseChainMsg)());
                break;
            case _types.MessageType.RESPONSE_BLOCKCHAIN:
                handleChainResponse(message);
                break;
            default:
                console.log('Received message type is out of scope');
                break;
        }
    });
};

const onError = exports.onError = ws => {
    const closeConnection = peer => {
        console.log(`Close connection to peer: ${peer.url}`);
        _sockets2.default.remove(peer);
    };
    ws.on('close', () => closeConnection(ws));
    ws.on('error', () => closeConnection(ws));
};
//# sourceMappingURL=handlers.js.map