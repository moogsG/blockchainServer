'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isNewBlockValid = exports.create = exports.calcHash = exports.calcNonce = undefined;

var _cryptoJs = require('crypto-js');

var _cryptoJs2 = _interopRequireDefault(_cryptoJs);

var _chain = require('./chain');

var _chain2 = _interopRequireDefault(_chain);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const calcNonce = exports.calcNonce = ({ index, prevHash, timestamp, data }) => {
    for (var x = 0; x <= 500000; x++) {
        var nonce = 0;
        let hash = _cryptoJs2.default.SHA256(index + prevHash + timestamp + data + x).toString();
        if (hash.substring(0, 4) === '0000') {
            console.log(x);
            return x.toString();
            break;
        }
    }
};

const calcHash = exports.calcHash = ({ index, prevHash, timestamp, data }) => {
    for (var x = 0; x <= 500000; x++) {
        var nonce = 0;
        let hash = _cryptoJs2.default.SHA256(index + prevHash + timestamp + data + x).toString();
        if (hash.substring(0, 4) === '0000') {
            return hash;
            break;
        }
    }
};

const create = exports.create = data => {
    const prev = _chain2.default.last();
    const index = prev.index + 1;
    const timestamp = new Date().getTime();
    const prevHash = prev.hash;
    const nonce = calcNonce({
        index,
        prevHash,
        timestamp,
        data
    });
    const hash = calcHash({
        index,
        prevHash,
        timestamp,
        data
    });

    return {
        index,
        timestamp,
        data,
        prevHash,
        hash,
        nonce
    };
};

const isNewBlockValid = exports.isNewBlockValid = (newBlock, prevBlock = _chain2.default.last()) => {
    let isValid = true;

    if (prevBlock.index + 1 !== newBlock.index) {
        console.log('New block has invalid index');
        isValid = false;
    } else if (prevBlock.hash !== newBlock.prevHash) {
        console.log('New block has invalid prevHash');
        isValid = false;
    } else if (calcHash(newBlock) !== newBlock.hash) {
        console.log('New block has invalid hash');
        isValid = false;
    }

    return isValid;
};
//# sourceMappingURL=block.js.map
