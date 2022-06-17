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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbConnection_1 = __importDefault(require("../db/dbConnection"));
const saveErrors_1 = require("../utils/saveErrors");
class TokenModel {
    addToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield dbConnection_1.default.execute('INSERT INTO tokens (token) VALUES (:token)', {
                    token
                });
                return true;
            }
            catch (err) {
                console.log(err);
                yield (0, saveErrors_1.saveErrors)(err.message, 'add token DB');
                return false;
            }
        });
    }
    getTokens() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [tokens] = yield dbConnection_1.default.execute('SELECT * FROM tokens');
                return tokens;
            }
            catch (err) {
                console.log(err);
                yield (0, saveErrors_1.saveErrors)(err.message, 'get tokens DB');
            }
        });
    }
    deleteToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield dbConnection_1.default.execute('DELETE FROM tokens WHERE token=:token', {
                    token
                });
                return true;
            }
            catch (err) {
                console.log(err);
                yield (0, saveErrors_1.saveErrors)(err.message, 'delete token DB');
                return false;
            }
        });
    }
}
exports.default = TokenModel;
//# sourceMappingURL=tokenModel.js.map