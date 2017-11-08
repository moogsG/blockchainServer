'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.responseLatestMsg = exports.responseChainMsg = exports.queryAllMsg = exports.queryChainLengthMsg = undefined;

var _chain = require('../chain');

var _chain2 = _interopRequireDefault(_chain);

var _types = require('./types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const queryChainLengthMsg = exports.queryChainLengthMsg = () => ({
    type: _types.MessageType.QUERY_LATEST
});

const queryAllMsg = exports.queryAllMsg = () => ({
    type: _types.MessageType.QUERY_ALL
});

const responseChainMsg = exports.responseChainMsg = () => ({
    type: _types.MessageType.RESPONSE_BLOCKCHAIN,
    data: JSON.stringify(_chain2.default.get())
});

const responseLatestMsg = exports.responseLatestMsg = () => ({
    type: _types.MessageType.RESPONSE_BLOCKCHAIN,
    data: JSON.stringify([_chain2.default.last()])
});
//# sourceMappingURL=actions.js.map