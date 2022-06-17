"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const containerSetup_1 = require("../di-setup/containerSetup");
const container = (0, containerSetup_1.awilixSetup)();
const UserController = container.resolve('UserController');
const userRouter = (0, express_1.Router)();
exports.userRouter = userRouter;
userRouter.get('/', UserController.getUser);
userRouter.post('/logout', UserController.logout);
userRouter.delete('/', UserController.delete);
userRouter.patch('/', UserController.updateUserData);
//# sourceMappingURL=userRouter.js.map