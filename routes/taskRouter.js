import {Router} from "express";
import {TaskController} from "../controllers/taskController.js";

const taskRouter = Router()

taskRouter.post('/',TaskController.addTask)
taskRouter.get('/', TaskController.getAll)
taskRouter.get('/:taskID', TaskController.getTask)
taskRouter.delete('/:taskID', TaskController.deleteTask)

export {taskRouter}