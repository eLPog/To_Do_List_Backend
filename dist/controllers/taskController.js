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
exports.TaskController = void 0;
const taskModel_1 = require("../models/taskModel");
const errorsHandler_1 = require("../errorHandlers/errorsHandler");
const sendTasksToEmail_1 = require("../utils/sendTasksToEmail");
class TaskController {
    static addTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { content } = req.body;
            const { userID } = req.user;
            if (!content || content.trim().length < 1) {
                throw new errorsHandler_1.ValidationError('The content of the task must contain at least 1 character');
            }
            const newTask = yield new taskModel_1.TaskModel().add(content, userID);
            if (!newTask) {
                throw new errorsHandler_1.UnexpectedError();
            }
            res.status(200).json(newTask);
        });
    }
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userID } = req.user;
            const tasks = yield new taskModel_1.TaskModel().getAll(userID);
            if (!tasks) {
                throw new errorsHandler_1.UnexpectedError();
            }
            res.status(200).json(tasks);
        });
    }
    static getTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { taskID } = req.params;
            const task = yield new taskModel_1.TaskModel().getOne(taskID);
            if (!task) {
                throw new errorsHandler_1.UnexpectedError('Check task id number');
            }
            res.status(200).json(task);
        });
    }
    static deleteTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { taskID } = req.params;
            if (!(yield new taskModel_1.TaskModel().deleteOne(taskID))) {
                throw new errorsHandler_1.UnexpectedError('Check task id number');
            }
            res.status(200).json('success');
        });
    }
    static deleteAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userID } = req.user;
            if (!(yield new taskModel_1.TaskModel().deleteAll(userID))) {
                throw new errorsHandler_1.UnexpectedError();
            }
            res.status(200).json('Success');
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { taskID } = req.params;
            const { content } = req.body;
            if (content.trim().length < 1) {
                throw new errorsHandler_1.ValidationError('The content of the task must contain at least 1 character');
            }
            const task = yield new taskModel_1.TaskModel().updateTask(taskID, content);
            if (!task) {
                throw new errorsHandler_1.UnexpectedError();
            }
            res.status(200).json(task);
        });
    }
    static sendTasksToEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userID, email } = req.user;
            const tasksToSend = [];
            const tasks = yield new taskModel_1.TaskModel().getAll(userID);
            if (!tasks) {
                throw new errorsHandler_1.UnexpectedError();
            }
            tasks.map(el => tasksToSend.push(el.content));
            (0, sendTasksToEmail_1.sendTasksToEmail)(email, tasksToSend);
            res.status(200).json('Success');
        });
    }
}
exports.TaskController = TaskController;
//# sourceMappingURL=taskController.js.map