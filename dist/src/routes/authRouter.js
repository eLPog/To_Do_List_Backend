"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const containerSetup_1 = require("../di-setup/containerSetup");
const container = (0, containerSetup_1.awilixSetup)();
const AuthController = container.resolve('AuthenticationController');
const authRouter = (0, express_1.Router)();
exports.authRouter = authRouter;
authRouter.post('/register', AuthController.registerNewUser);
authRouter.post('/', AuthController.login);
authRouter.put('/', AuthController.resetPassword);
//# sourceMappingURL=authRouter.js.map