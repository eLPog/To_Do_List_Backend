"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const userRouter = (0, express_1.Router)();
exports.userRouter = userRouter;
userRouter.get('/', userController_1.UserController.getUser);
userRouter.post('/logout', userController_1.UserController.logout);
userRouter.delete('/', userController_1.UserController.delete);
userRouter.patch('/', userController_1.UserController.updateUserData);
//# sourceMappingURL=userRouter.js.map