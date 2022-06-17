"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundHandler = void 0;
function notFoundHandler(req, res) {
    res.status(404).json('Page doesnt exist');
    return;
}
exports.notFoundHandler = notFoundHandler;
//# sourceMappingURL=notFoundHandler.js.map