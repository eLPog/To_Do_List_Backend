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
exports.TaskModel = void 0;
const dbConnection_1 = require("../db/dbConnection");
const uuid_1 = require("uuid");
const getActuallyDate_1 = require("../utils/getActuallyDate");
const saveErrors_1 = require("../utils/saveErrors");
class TaskModel {
    add(content, userID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newTask = {
                    taskID: (0, uuid_1.v4)(),
                    content,
                    userID,
                    createdAt: (0, getActuallyDate_1.getActuallyDate)()
                };
                yield dbConnection_1.db.execute('INSERT INTO tasks (taskID,content,userID,createdAt) VALUES (:taskID,:content,:userID,:createdAt)', {
                    taskID: newTask.taskID,
                    content: newTask.content,
                    userID: newTask.userID,
                    createdAt: newTask.createdAt
                });
                return newTask;
            }
            catch (err) {
                console.log(err);
                yield (0, saveErrors_1.saveErrors)(err.message, 'add task DB');
                return false;
            }
        });
    }
    getAll(userID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [tasks] = yield dbConnection_1.db.execute('SELECT * FROM tasks WHERE userID=:userID', {
                    userID
                });
                return tasks;
            }
            catch (err) {
                console.log(err);
                yield (0, saveErrors_1.saveErrors)(err.message, 'get all tasks DB');
            }
        });
    }
    getOne(taskID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [[task]] = yield dbConnection_1.db.execute('SELECT * FROM tasks WHERE taskID=:taskID', {
                    taskID
                });
                return task;
            }
            catch (err) {
                console.log(err);
                yield (0, saveErrors_1.saveErrors)(err.message, 'get all tasks DB');
                return false;
            }
        });
    }
    deleteOne(taskID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!(yield this.getOne(taskID))) {
                    return false;
                }
                yield dbConnection_1.db.execute('DELETE FROM tasks WHERE taskID=:taskID', {
                    taskID
                });
                return true;
            }
            catch (err) {
                console.log(err);
                yield (0, saveErrors_1.saveErrors)(err.message, 'delete one task DB');
                return false;
            }
        });
    }
    deleteAll(userID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield dbConnection_1.db.execute('DELETE FROM tasks WHERE userID=:userID', {
                    userID
                });
                return true;
            }
            catch (err) {
                console.log(err);
                yield (0, saveErrors_1.saveErrors)(err.message, 'delete all tasks DB');
                return false;
            }
        });
    }
    updateTask(taskID, newContent) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!(yield this.getOne(taskID))) {
                    return false;
                }
                yield dbConnection_1.db.execute('UPDATE tasks SET content=:content WHERE taskID=:taskID', {
                    taskID,
                    content: newContent
                });
                return yield this.getOne(taskID);
            }
            catch (err) {
                console.log(err);
                yield (0, saveErrors_1.saveErrors)(err.message, 'update task DB');
                return false;
            }
        });
    }
}
exports.TaskModel = TaskModel;
//# sourceMappingURL=taskModel.js.map