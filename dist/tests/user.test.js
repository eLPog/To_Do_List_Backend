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
let cont;
let model;
let register;
let userID;
let email = 'test@test.test';
let name = 'testUser';
let password = 'password';
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    cont = yield (0, containerSetup_1.awilixSetup)();
    model = cont.resolve('UserModel');
    register = cont.resolve('AuthenticationModel');
    const newUser = yield register.addUser(email, name, password);
    userID = newUser.userID;
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield dbConnection_1.default.execute('DELETE FROM users WHERE userID=:userID', {
        userID
    });
    yield dbConnection_1.default.end();
}));
test('Get user by email return this user', () => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield model.getUser(email);
    expect(user).toBeDefined();
    expect(user.email).toEqual(email);
    expect(typeof user.name).toBe('string');
}));
test('Get user by email that does not exist return false', () => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield model.getUser("xxx");
    expect(user).not.toBeDefined();
}));
test('Edit user return user with edited values', () => __awaiter(void 0, void 0, void 0, function* () {
    const isUserEdited = yield model.editUser(email, { name: 'NewTesterName', password, email });
    const editedUser = yield model.getUser(email);
    expect(isUserEdited).toEqual(true);
    expect(editedUser.name).toEqual('NewTesterName');
    expect(editedUser.password).toEqual(password);
    expect(editedUser.email).toEqual(email);
}));
test('Delete user by email return true', () => __awaiter(void 0, void 0, void 0, function* () {
    const isUserDeleted = yield model.deleteUser(email);
    expect(isUserDeleted).toBeDefined();
    expect(isUserDeleted).toEqual(true);
}));
//# sourceMappingURL=user.test.js.map