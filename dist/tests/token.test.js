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
const containerSetup_1 = require("../src/di-setup/containerSetup");
const dbConnection_1 = __importDefault(require("../src/db/dbConnection"));
let token;
let cont;
let model;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    token = 'testToken123456789';
    cont = yield (0, containerSetup_1.awilixSetup)();
    model = cont.resolve('TokenModel');
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield dbConnection_1.default.execute('DELETE FROM tokens WHERE token LIKE :tokenString', {
        tokenString: 'testToken%'
    });
    dbConnection_1.default.end();
}));
test('Create new token return true', () => __awaiter(void 0, void 0, void 0, function* () {
    const newToken = yield model.addToken(token);
    expect(newToken).toBeDefined();
    expect(newToken).toBeTruthy();
}));
test('Create new token return true', () => __awaiter(void 0, void 0, void 0, function* () {
    const newToken = yield model.addToken(token);
    expect(newToken).toBeDefined();
    expect(newToken).toBeTruthy();
}));
test('Get all tokens return array with tokens', () => __awaiter(void 0, void 0, void 0, function* () {
    yield model.addToken(token);
    yield model.addToken(token + '11');
    yield model.addToken(token + '12');
    yield model.addToken(token + '13');
    const tokens = yield model.getTokens();
    expect(typeof tokens).toBe('object');
    expect(tokens.length).toBeGreaterThan(3);
}));
test('Delete existing token return true', () => __awaiter(void 0, void 0, void 0, function* () {
    yield model.addToken(token);
    const res = yield model.deleteToken(token);
    expect(res).toBe(true);
}));
//# sourceMappingURL=token.test.js.map