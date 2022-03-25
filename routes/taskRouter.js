import {Router} from "express";
import {TaskController} from "../controllers/taskController.js";

const taskRouter = Router()

taskRouter.post('/',TaskController.addTask)
taskRouter.get('/', TaskController.getAll)
taskRouter.get('/:taskID', TaskController.getTask)
taskRouter.delete('/:taskID', TaskController.deleteTask)
taskRouter.delete('/', TaskController.deleteAll)
taskRouter.patch('/:taskID', TaskController.update)
export {taskRouter}