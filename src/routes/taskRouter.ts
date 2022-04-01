import {Router} from "express";
import {TaskController} from "../controllers/taskController";

const taskRouter = Router()
taskRouter.get('/', TaskController.getAll)
taskRouter.get('/:taskID', TaskController.getTask)
taskRouter.post('/', TaskController.addTask)
taskRouter.patch('/:taskID', TaskController.update)
taskRouter.delete('/:taskID', TaskController.deleteTask)
taskRouter.delete('/', TaskController.deleteAll)
export {taskRouter}