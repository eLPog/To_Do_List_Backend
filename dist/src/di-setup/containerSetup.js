"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.awilixSetup = void 0;
const awilix = __importStar(require("awilix"));
const awilix_1 = require("awilix");
const authController_1 = __importDefault(require("../controllers/authController"));
const authModel_1 = __importDefault(require("../models/authModel"));
const userModel_1 = __importDefault(require("../models/userModel"));
const userController_1 = __importDefault(require("../controllers/userController"));
const tokenModel_1 = __importDefault(require("../models/tokenModel"));
const taskController_1 = __importDefault(require("../controllers/taskController"));
const taskModel_1 = __importDefault(require("../models/taskModel"));
const dbConnection_1 = __importDefault(require("../db/dbConnection"));
function awilixSetup() {
    const container = awilix.createContainer({
        injectionMode: awilix_1.InjectionMode.PROXY
    });
    return container.register({
        AuthenticationController: awilix.asClass(authController_1.default),
        UserController: awilix.asClass(userController_1.default),
        TaskController: awilix.asClass(taskController_1.default),
        AuthenticationModel: awilix.asClass(authModel_1.default),
        UserModel: awilix.asClass(userModel_1.default),
        TokenModel: awilix.asClass(tokenModel_1.default),
        TaskModel: awilix.asClass(taskModel_1.default),
        db: awilix.asValue(dbConnection_1.default)
    });
}
exports.awilixSetup = awilixSetup;
//# sourceMappingURL=containerSetup.js.map