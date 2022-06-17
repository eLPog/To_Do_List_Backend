"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setNewPassword = void 0;
const checkPassword_1 = require("./checkPassword");
const createHash_1 = require("./createHash");
function setNewPassword(newPassword, hash) {
    if (!(0, checkPassword_1.checkPassword)(newPassword, hash)) {
        return (0, createHash_1.createHash)(newPassword);
    }
}
exports.setNewPassword = setNewPassword;
//# sourceMappingURL=setNewPassword.js.map