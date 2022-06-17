"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getActuallyDate = void 0;
function getActuallyDate() {
    return new Date().toISOString().slice(0, 19).replace('T', ' ');
}
exports.getActuallyDate = getActuallyDate;
//# sourceMappingURL=getActuallyDate.js.map