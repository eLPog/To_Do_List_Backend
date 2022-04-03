"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationEmail = void 0;
function validationEmail(email) {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
}
exports.validationEmail = validationEmail;
//# sourceMappingURL=validationEmail.js.map