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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const config_1 = require("../app/config");
const validationEmail_1 = require("../utils/validationEmail");
const saveLogs_1 = require("../utils/saveLogs");
const checkPassword_1 = require("../utils/checkPassword");
const userModel_1 = require("../models/userModel");
const tokenModel_1 = require("../models/tokenModel");
const setNewPassword_1 = require("../utils/setNewPassword");
const errorsHandler_1 = require("../errorHandlers/errorsHandler");
class UserController {
    static getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.user;
            if (!email || !(0, validationEmail_1.validationEmail)(email)) {
                res.status(400).json('validation error');
            }
            const user = yield new userModel_1.UserModel().getUser(email);
            if (!user) {
                throw new errorsHandler_1.UnexpectedError();
            }
            res.status(200).json(user);
        });
    }
    static logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = req.headers.authorization.split(' ')[1];
            if (!(yield new tokenModel_1.TokenModel().deleteToken(token))) {
                throw new errorsHandler_1.UnexpectedError();
            }
            yield (0, saveLogs_1.saveUsersLogs)(req.user.email, 'sign out');
            res.status(200).json('success');
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.user;
            const { password } = req.body;
            if (!password) {
                throw new errorsHandler_1.ValidationError('Enter the password.');
            }
            const user = yield new userModel_1.UserModel().getUser(email);
            if (!(0, checkPassword_1.checkPassword)(password, user.password)) {
                throw new errorsHandler_1.ValidationError('Password incorrect');
            }
            if (!user || !(yield new userModel_1.UserModel().deleteUser(email))) {
                throw new errorsHandler_1.UnexpectedError();
            }
            res.status(200).json('Success');
        });
    }
    static updateUserData(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.user;
            const token = req.headers.authorization.split(' ')[1];
            let newPassword;
            let newToken;
            const tokenModel = new tokenModel_1.TokenModel();
            const userModel = new userModel_1.UserModel();
            const user = yield userModel.getUser(email);
            if (!user) {
                throw new errorsHandler_1.UnexpectedError();
            }
            if (req.body.password) {
                newPassword = (0, setNewPassword_1.setNewPassword)(req.body.password, user.password);
            }
            const newUser = {
                name: (_a = req.body.name) !== null && _a !== void 0 ? _a : user.name,
                email: !(0, validationEmail_1.validationEmail)(req.body.email) ? email : req.body.email,
                password: newPassword !== null && newPassword !== void 0 ? newPassword : user.password,
            };
            const userDataToFront = {
                email: newUser.email,
                name: newUser.name,
                userID: user.userID
            };
            //create new token and delete old token when password was changed
            if (newPassword) {
                newToken = jwt.sign(userDataToFront, config_1.jwtAccessKey, { expiresIn: '45m' });
                if (!(yield tokenModel.deleteToken(token)) || !(yield tokenModel.addToken(newToken))) {
                    throw new errorsHandler_1.UnexpectedError();
                }
            }
            yield userModel.editUser(email, newUser);
            res.status(200).json({ userDataToFront, newToken });
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=userController.js.map