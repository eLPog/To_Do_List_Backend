"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskRouter = void 0;
const express_1 = require("express");
const taskController_1 = require("../controllers/taskController");
const taskRouter = (0, express_1.Router)();
exports.taskRouter = taskRouter;
taskRouter.get('/', taskController_1.TaskController.getAll);
taskRouter.get('/:taskID', taskController_1.TaskController.getTask);
taskRouter.post('/send', taskController_1.TaskController.sendTasksToEmail);
taskRouter.post('/', taskController_1.TaskController.addTask);
taskRouter.patch('/:taskID', taskController_1.TaskController.update);
taskRouter.delete('/:taskID', taskController_1.TaskController.deleteTask);
taskRouter.delete('/', taskController_1.TaskController.deleteAll);
//# sourceMappingURL=taskRouter.js.map