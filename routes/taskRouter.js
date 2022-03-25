import {Router} from "express";
import {TaskController} from "../controllers/taskController.js";

const taskRouter = Router()

taskRouter.post('/',TaskController.addTask)

export {taskRouter}