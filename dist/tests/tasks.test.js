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
let email = 'test@tester.com';
let name = 'testUser';
let password = 'password';
let userID;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    cont = yield (0, containerSetup_1.awilixSetup)();
    model = cont.resolve('TaskModel');
    register = cont.resolve('AuthenticationModel');
    const newUser = yield register.addUser(email, name, password);
    userID = newUser.userID;
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield dbConnection_1.default.execute('DELETE FROM tasks WHERE content LIKE :testString', { testString: "test%" });
    yield dbConnection_1.default.execute('DELETE FROM users WHERE userID=:userID', {
        userID
    });
    yield dbConnection_1.default.end();
}));
test('getOne task return data from database', () => __awaiter(void 0, void 0, void 0, function* () {
    const newTask = yield model.add('testTitle', 'test', userID);
    const task = yield model.getOne(newTask.taskID);
    expect(task).toBeDefined();
    expect(task.title).toEqual('testTitle');
    expect(task).not.toBeNull();
}));
test('getOne task return false from database when id doesnt exist ', () => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield model.getOne('xxxxxxxxxxxxxxxx');
    expect(task).not.toBeDefined();
    expect(task).toBeFalsy();
}));
test('getOne task return false from database when id is not passed ', () => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield model.getOne('');
    expect(task).not.toBeDefined();
    expect(task).toBeFalsy();
}));
test('get all tasks from db from one user returns array', () => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield model.getAll(userID);
    expect(task).toBeDefined();
    expect(task).not.toBeNull();
    expect(task).not.toEqual([]);
}));
test('get all users tasks if user do not exist returns empty array ', () => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield model.getAll('xxxxx');
    expect(task).toEqual([]);
}));
test('add new task to db return this task', () => __awaiter(void 0, void 0, void 0, function* () {
    const newTask = {
        title: "testTitle",
        content: "test",
        userID: userID
    };
    const task = yield model.add(newTask.title, newTask.content, newTask.userID);
    expect(task).toBeDefined();
    expect(task.content).toBe("test");
    expect(task.taskID).not.toEqual([]);
    expect(task.taskID).not.toEqual({});
}));
test('add new task if userID does not exist return false', () => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield model.add('titleTest', 'test', 'xxx');
    expect(task).toBeFalsy();
}));
test('delete task if taskID does not exit return false', () => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield model.deleteOne('xxx');
    expect(task).toBeFalsy();
}));
test('delete task return true', () => __awaiter(void 0, void 0, void 0, function* () {
    const newTask = yield model.add('testTitle', 'test123', userID);
    const task = yield model.deleteOne(newTask.taskID);
    expect(task).toBeTruthy();
}));
test('delete all tasks return true', () => __awaiter(void 0, void 0, void 0, function* () {
    yield model.add('testTitle', 'test1', userID);
    yield model.add('testTitle', 'test2', userID);
    const task = yield model.deleteAll(userID);
    expect(task).toBeTruthy();
}));
test('update task return updated task', () => __awaiter(void 0, void 0, void 0, function* () {
    const newTask = yield model.add('testTitle', 'test1', userID);
    const updatedTask = yield model.updateTask(newTask.taskID, { title: 'newTestTitle', content: 'test2' });
    expect(updatedTask).toBeDefined();
    expect(updatedTask.title).toEqual('newTestTitle');
    expect(updatedTask.content).toEqual('test2');
    expect(updatedTask.taskID).toEqual(newTask.taskID);
}));
//# sourceMappingURL=tasks.test.js.map