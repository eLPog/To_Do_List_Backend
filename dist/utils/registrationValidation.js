"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registrationValidation = void 0;
const validationEmail_1 = require("./validationEmail");
function registrationValidation(email, password, password2, name) {
    if (!email || !(0, validationEmail_1.validationEmail)(email) || email.trim().length < 1) {
        return false;
    }
    if (!name || name.trim().length < 1) {
        return false;
    }
    if (!password || password.trim().length < 5) {
        return false;
    }
    return password === password2;
}
exports.registrationValidation = registrationValidation;
//# sourceMappingURL=registrationValidation.js.map