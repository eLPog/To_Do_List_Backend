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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../app/config");
const checkPassword_1 = require("../utils/checkPassword");
const saveLogs_1 = require("../utils/saveLogs");
const registrationValidation_1 = require("../utils/registrationValidation");
const validationEmail_1 = require("../utils/validationEmail");
const jwt = __importStar(require("jsonwebtoken"));
const errorsHandler_1 = require("../errorHandlers/errorsHandler");
const randomatic_1 = __importDefault(require("randomatic"));
const createHash_1 = require("../utils/createHash");
const sendNewPassword_1 = require("../utils/sendNewPassword");
class AuthController {
    constructor({ AuthenticationModel, UserModel, TokenModel }) {
        this.registerNewUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { email, name, password, password2 } = req.body;
            if (!(0, registrationValidation_1.registrationValidation)(email, password, password2, name)) {
                throw new errorsHandler_1.ValidationError('Check if email is correct and if password have min. 5 characters');
            }
            const emailAlreadyExist = yield this.AuthenticationModel.addUser(email, name, password); // return error message if email already exist
            if (emailAlreadyExist instanceof Error) {
                throw new errorsHandler_1.ConflictError('Email already exist');
            }
            res.status(200).json('success');
        });
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            if (!password || password.trim().length < 5 || !(0, validationEmail_1.validationEmail)(email)) {
                throw new errorsHandler_1.ValidationError('Password or email form is valid');
            }
            const user = yield this.UserModel.getUser(email);
            if (!user || !(0, checkPassword_1.checkPassword)(password, user.password)) {
                throw new errorsHandler_1.ValidationError('Password or email incorrect');
            }
            const userDataSendToFront = {
                name: user.name,
                email: user.email,
                userID: user.userID
            };
            const token = jwt.sign(userDataSendToFront, config_1.jwtAccessKey, { expiresIn: "45m" });
            yield this.UserModel.setLastLoginDate(email);
            yield this.TokenModel.addToken(token);
            yield (0, saveLogs_1.saveUsersLogs)(user.email, 'sign in');
            res.status(200).json(token);
        });
        this.resetPassword = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { email } = req.body;
            const user = yield this.UserModel.getUser(email);
            if (!user) {
                res.status(404).json('User with this email do not exist');
                return;
            }
            const newPassword = (0, randomatic_1.default)('Aa0!', 10);
            user.password = (0, createHash_1.createHash)(newPassword);
            yield this.UserModel.editUser(email, user);
            yield (0, sendNewPassword_1.sendNewPassword)(email, newPassword);
            res.status(200).json('Success');
        });
        this.AuthenticationModel = AuthenticationModel;
        this.UserModel = UserModel;
        this.TokenModel = TokenModel;
    }
}
exports.default = AuthController;
//# sourceMappingURL=authController.js.map