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
const jwt = __importStar(require("jsonwebtoken"));
const config_1 = require("../app/config");
const validationEmail_1 = require("../utils/validationEmail");
const saveLogs_1 = require("../utils/saveLogs");
const checkPassword_1 = require("../utils/checkPassword");
const setNewPassword_1 = require("../utils/setNewPassword");
const errorsHandler_1 = require("../errorHandlers/errorsHandler");
class UserController {
    constructor({ UserModel, TokenModel }) {
        this.getUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { email } = req.user;
            if (!email || !(0, validationEmail_1.validationEmail)(email)) {
                throw new errorsHandler_1.ValidationError('Email format invalid');
            }
            const user = yield this.UserModel.getUser(email);
            if (!user) {
                throw new errorsHandler_1.UnexpectedError();
            }
            res.status(200).json(user);
        });
        this.logout = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const token = req.headers.authorization.split(' ')[1];
            if (!(yield this.TokenModel.deleteToken(token))) {
                throw new errorsHandler_1.UnexpectedError();
            }
            yield (0, saveLogs_1.saveUsersLogs)(req.user.email, 'sign out');
            res.status(200).json('success');
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { email } = req.user;
            const { password } = req.body;
            if (!password) {
                throw new errorsHandler_1.ValidationError('Enter the password.');
            }
            const user = yield this.UserModel.getUser(email);
            if (!(0, checkPassword_1.checkPassword)(password, user.password)) {
                throw new errorsHandler_1.ValidationError('Password incorrect');
            }
            if (!user || !(yield this.UserModel.deleteUser(email))) {
                throw new errorsHandler_1.UnexpectedError();
            }
            res.status(200).json('Success');
        });
        this.updateUserData = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { email } = req.user;
            const token = req.headers.authorization.split(' ')[1];
            let newPassword;
            let newToken;
            const user = yield this.UserModel.getUser(email);
            if (!user) {
                throw new errorsHandler_1.UnexpectedError();
            }
            if (req.body.password) {
                newPassword = (0, setNewPassword_1.setNewPassword)(req.body.password, user.password);
            }
            const newUser = {
                name: req.body.name.trim().length > 1 ? req.body.name : user.name,
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
                if (!(yield this.TokenModel.deleteToken(token)) || !(yield this.TokenModel.addToken(newToken))) {
                    throw new errorsHandler_1.UnexpectedError();
                }
            }
            yield this.UserModel.editUser(email, newUser);
            res.status(200).json({ userDataToFront, newToken });
        });
        this.UserModel = UserModel;
        this.TokenModel = TokenModel;
    }
}
exports.default = UserController;
//# sourceMappingURL=userController.js.map