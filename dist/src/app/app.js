"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const containerSetup_1 = require("../di-setup/containerSetup");
(0, containerSetup_1.awilixSetup)();
require('express-async-errors');
const config_1 = require("./config");
const authRouter_1 = require("../routes/authRouter");
const isAuth_1 = require("../utils/isAuth");
const userRouter_1 = require("../routes/userRouter");
const taskRouter_1 = require("../routes/taskRouter");
const notFoundHandler_1 = require("../errorHandlers/notFoundHandler");
const errorsHandler_1 = require("../errorHandlers/errorsHandler");
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
class App {
    constructor() {
        this.createApp();
        this.settings();
        this.routes();
        this.errorHandlers();
        this.runServer();
    }
    createApp() {
        this.app = (0, express_1.default)();
    }
    settings() {
        this.app.use((0, cors_1.default)({
            "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
            "preflightContinue": false,
            "optionsSuccessStatus": 204
        }));
        this.app.use((0, express_rate_limit_1.default)({
            windowMs: 5 * 60 * 100,
            max: 100
        }));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({
            extended: true
        }));
    }
    routes() {
        this.app.use('/v1/api/auth', authRouter_1.authRouter);
        this.app.use('/v1/api/user', isAuth_1.isAuth, userRouter_1.userRouter);
        this.app.use('/v1/api/tasks', isAuth_1.isAuth, taskRouter_1.taskRouter);
    }
    errorHandlers() {
        this.app.use('/', notFoundHandler_1.notFoundHandler);
        this.app.use('/', errorsHandler_1.httpFormater);
    }
    runServer() {
        this.app.listen(config_1.port, 'localhost', () => console.log(`Server is running on port ${config_1.port}`));
    }
}
new App();
//# sourceMappingURL=app.js.map