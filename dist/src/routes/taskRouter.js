"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskRouter = void 0;
const express_1 = require("express");
const containerSetup_1 = require("../di-setup/containerSetup");
const container = (0, containerSetup_1.awilixSetup)();
const TaskController = container.resolve('TaskController');
const taskRouter = (0, express_1.Router)();
exports.taskRouter = taskRouter;
taskRouter.get('/', TaskController.getAll);
taskRouter.get('/:taskID', TaskController.getTask);
taskRouter.post('/send', TaskController.sendTasksToEmail);
taskRouter.post('/', TaskController.addTask);
taskRouter.patch('/:taskID', TaskController.update);
taskRouter.delete('/:taskID', TaskController.deleteTask);
taskRouter.delete('/', TaskController.deleteAll);
//# sourceMappingURL=taskRouter.js.map