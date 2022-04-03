"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const authRouter = (0, express_1.Router)();
exports.authRouter = authRouter;
authRouter.post('/register', authController_1.AuthController.registerNewUser);
authRouter.post('/', authController_1.AuthController.login);
authRouter.put('/', authController_1.AuthController.resetPassword);
//# sourceMappingURL=authRouter.js.map