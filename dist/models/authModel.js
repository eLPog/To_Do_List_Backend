"use strict";
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
exports.AuthModel = void 0;
const dbConnection_1 = require("../db/dbConnection");
const createHash_1 = require("../utils/createHash");
const getActuallyDate_1 = require("../utils/getActuallyDate");
const saveErrors_1 = require("../utils/saveErrors");
const uuid_1 = require("uuid");
class AuthModel {
    addUser(email, name, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = {
                    userID: (0, uuid_1.v4)(),
                    email,
                    name,
                    password: (0, createHash_1.createHash)(password),
                    registerAt: (0, getActuallyDate_1.getActuallyDate)()
                };
                yield dbConnection_1.db.execute('INSERT INTO users (userID,email,name,password,registerAt) VALUES (:userID,:email,:name,:password,:registerAt)', {
                    userID: newUser.userID,
                    email: newUser.email,
                    name: newUser.name,
                    password: newUser.password,
                    registerAt: newUser.registerAt
                });
                return newUser;
            }
            catch (err) {
                console.log(err);
                yield (0, saveErrors_1.saveErrors)(err.message, 'add user DB');
                return err;
            }
        });
    }
}
exports.AuthModel = AuthModel;
//# sourceMappingURL=authModel.js.map