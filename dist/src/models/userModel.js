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
const saveErrors_1 = require("../utils/saveErrors");
const getActuallyDate_1 = require("../utils/getActuallyDate");
class UserModel {
    constructor({ db }) {
        this.getUser = (email) => __awaiter(this, void 0, void 0, function* () {
            try {
                const [[user]] = yield this.db.execute('SELECT * FROM users WHERE email=:email', {
                    email,
                });
                return user;
            }
            catch (err) {
                console.log(err);
                yield (0, saveErrors_1.saveErrors)(err.message, 'get one user DB');
            }
        });
        this.setLastLoginDate = (email) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.db.execute('UPDATE users SET lastLogin=:lastLogin WHERE email=:email', {
                    lastLogin: (0, getActuallyDate_1.getActuallyDate)(),
                    email,
                });
                return true;
            }
            catch (err) {
                console.log(err);
                yield (0, saveErrors_1.saveErrors)(err.message, 'add user DB');
                return false;
            }
        });
        this.deleteUser = (email) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.db.execute('DELETE FROM users WHERE email=:email', {
                    email,
                });
                return true;
            }
            catch (err) {
                console.log(err);
                yield (0, saveErrors_1.saveErrors)(err.message, 'add user DB');
                return false;
            }
        });
        this.editUser = (currentEmail, newUserObj) => __awaiter(this, void 0, void 0, function* () {
            try {
                const oldUser = yield this.getUser(currentEmail);
                const newUser = Object.assign(Object.assign({}, oldUser), newUserObj);
                yield this.db.execute('UPDATE users SET email=:email, name=:name, password=:password WHERE email=:currentEmail', {
                    email: newUser.email,
                    name: newUser.name,
                    password: newUser.password,
                    currentEmail,
                });
                return true;
            }
            catch (err) {
                console.log(err);
                yield (0, saveErrors_1.saveErrors)(err.message, 'edit user DB');
                return false;
            }
        });
        this.db = db;
    }
}
exports.default = UserModel;
//# sourceMappingURL=userModel.js.map