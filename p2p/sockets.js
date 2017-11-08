"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
const Sockets = function () {
    // eslint-disable-line func-names
    let instance;
    const sockets = [];

    function get() {
        return sockets;
    }

    function update(ws) {
        return sockets.push(ws);
    }

    function remove(ws) {
        return sockets.splice(sockets.indexOf(ws), 1);
    }

    function create() {
        return {
            get,
            update,
            remove
        };
    }

    return {
        init() {
            if (!instance) {
                instance = create();
            }
            return instance;
        }
    };
}();

exports.default = Sockets.init();
//# sourceMappingURL=sockets.js.map