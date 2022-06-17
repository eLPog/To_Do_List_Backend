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
const registrationValidation_1 = require("../src/utils/registrationValidation");
const dbConnection_1 = __importDefault(require("../src/db/dbConnection"));
let cont;
let model;
let email = 'tester@test.test';
let name = 'testUser';
let password = 'password';
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    cont = yield (0, containerSetup_1.awilixSetup)();
    model = cont.resolve('AuthenticationModel');
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield dbConnection_1.default.end();
}));
test('Add new user with correct values return user object', () => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = yield model.addUser(email, name, password);
    expect(newUser).toBeDefined();
    expect(newUser.name).toEqual('testUser');
    expect(newUser.userID).toHaveLength(36);
    expect(newUser.password).toBeDefined();
    yield dbConnection_1.default.execute('DELETE FROM users WHERE email LIKE :testString', {
        testString: "tester@test%"
    });
}));
test('Add new user with incorrect email return false', () => {
    const isValueCorrect = (0, registrationValidation_1.registrationValidation)("", password, password, name);
    expect(isValueCorrect).toBeFalsy();
});
test('Add new user without name return false', () => {
    const isValueCorrect = (0, registrationValidation_1.registrationValidation)(email, password, password, "     ");
    expect(isValueCorrect).toBeFalsy();
});
test('Add new user with two different passwords return false', () => {
    const isValueCorrect = (0, registrationValidation_1.registrationValidation)(email, password, "anotherPassword", name);
    expect(isValueCorrect).toBeFalsy();
});
test('Add new user with to short password return false', () => {
    const isValueCorrect = (0, registrationValidation_1.registrationValidation)(email, "test", "test", name);
    expect(isValueCorrect).toBeFalsy();
});
//# sourceMappingURL=auth.test.js.map