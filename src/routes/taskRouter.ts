import {Router} from "express";
import {awilixSetup} from "../di-setup/containerSetup";
const container = awilixSetup();
const TaskController = container.resolve('TaskController')

const taskRouter = Router()
taskRouter.get('/', TaskController.getAll)
taskRouter.get('/:taskID', TaskController.getTask)
taskRouter.post('/send',TaskController.sendTasksToEmail)
taskRouter.post('/', TaskController.addTask)
taskRouter.patch('/:taskID', TaskController.update)
taskRouter.delete('/:taskID', TaskController.deleteTask)
taskRouter.delete('/', TaskController.deleteAll)
export {taskRouter}