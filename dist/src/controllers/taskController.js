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
const errorsHandler_1 = require("../errorHandlers/errorsHandler");
const sendTasksToEmail_1 = require("../utils/sendTasksToEmail");
class TaskController {
    constructor({ TaskModel }) {
        this.addTask = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { content, title } = req.body;
            const { userID } = req.user;
            if (!content || content.trim().length < 1 || !title || title.trim().length < 1) {
                throw new errorsHandler_1.ValidationError('The title and the content of the task must contain at least 1 character');
            }
            const newTask = yield this.TaskModel.add(title, content, userID);
            if (!newTask) {
                throw new errorsHandler_1.UnexpectedError();
            }
            res.status(200).json(newTask);
        });
        this.getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { userID } = req.user;
            const tasks = yield this.TaskModel.getAll(userID);
            if (!tasks) {
                throw new errorsHandler_1.UnexpectedError();
            }
            res.status(200).json(tasks);
        });
        this.getTask = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { taskID } = req.params;
            const task = yield this.TaskModel.getOne(taskID);
            if (!task) {
                throw new errorsHandler_1.UnexpectedError('Check task id number');
            }
            res.status(200).json(task);
        });
        this.deleteTask = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { taskID } = req.params;
            if (!(yield this.TaskModel.deleteOne(taskID))) {
                throw new errorsHandler_1.UnexpectedError('Check task id number');
            }
            res.status(200).json('success');
        });
        this.deleteAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { userID } = req.user;
            if (!(yield this.TaskModel.deleteAll(userID))) {
                throw new errorsHandler_1.UnexpectedError();
            }
            res.status(200).json('Success');
        });
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { taskID } = req.params;
            const { content, title } = req.body;
            if ((typeof content === 'string' && content.trim().length < 1) || (typeof title === 'string' && title.trim().length < 1)) {
                throw new errorsHandler_1.ValidationError('The value you want to edit (title or content) must be at least 1 character');
            }
            const task = yield this.TaskModel.updateTask(taskID, { title, content });
            if (!task) {
                throw new errorsHandler_1.UnexpectedError();
            }
            res.status(200).json(task);
        });
        this.sendTasksToEmail = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { userID, email } = req.user;
            const tasksToSend = [];
            const tasks = yield this.TaskModel.getAll(userID);
            if (!tasks) {
                throw new errorsHandler_1.UnexpectedError();
            }
            tasks.map(el => tasksToSend.push(el.content));
            yield (0, sendTasksToEmail_1.sendTasksToEmail)(email, tasksToSend);
            res.status(200).json('Success');
        });
        this.TaskModel = TaskModel;
    }
}
exports.default = TaskController;
//# sourceMappingURL=taskController.js.map