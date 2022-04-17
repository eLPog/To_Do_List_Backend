// import {TaskModel} from "../models/taskModel";
import {Request, Response} from "express";
import {UserFromRequest} from "../types/UserFromRequest";
import {UnexpectedError, ValidationError} from "../errorHandlers/errorsHandler";
import {sendTasksToEmail} from "../utils/sendTasksToEmail";
import {InterfaceTaskModel} from "../types/InterfaceTaskModel";

 class TaskController {
     private TaskModel:InterfaceTaskModel
     // @ts-ignore
     constructor({TaskModel}) {
         this.TaskModel = TaskModel
     }

      addTask = async (req: UserFromRequest, res: Response): Promise<void> =>{
        const {content} = req.body
        const {userID} = req.user
        if (!content || content.trim().length < 1) {
            throw new ValidationError('The content of the task must contain at least 1 character')
        }
        const newTask = await this.TaskModel.add(content, userID)
        if (!newTask) {
            throw new UnexpectedError()
        }
        res.status(200).json(newTask)

    }

      getAll = async (req: UserFromRequest, res: Response): Promise<void> => {
        const {userID} = req.user
            const tasks = await this.TaskModel.getAll(userID)
            if (!tasks) {
               throw new UnexpectedError()
            }
            res.status(200).json(tasks)

    }

      getTask = async (req: Request, res: Response): Promise<void> => {
        const {taskID} = req.params
            const task = await this.TaskModel.getOne(taskID)
            if (!task) {
               throw new UnexpectedError('Check task id number')
            }
            res.status(200).json(task)
    }

      deleteTask = async (req: Request, res: Response): Promise<void> => {
        const {taskID} = req.params
            if (!await this.TaskModel.deleteOne(taskID)) {
               throw new UnexpectedError('Check task id number');
            }
            res.status(200).json('success')
    }
      deleteAll = async (req: UserFromRequest, res: Response): Promise<void> =>{
        const {userID} = req.user
            if (!await this.TaskModel.deleteAll(userID)) {
              throw new UnexpectedError()
            }
            res.status(200).json('Success')
    }

      update = async (req: Request, res: Response): Promise<void> =>{
        const {taskID} = req.params
        const {content} = req.body
            if (content.trim().length < 1) {
               throw new ValidationError('The content of the task must contain at least 1 character')
            }
            const task = await this.TaskModel.updateTask(taskID, content)
            if (!task) {
              throw new UnexpectedError();
            }
            res.status(200).json(task)

    }
      sendTasksToEmail = async (req:UserFromRequest, res:Response):Promise<void> => {
        const {userID, email} = req.user
        const tasksToSend:string[] = []
        const tasks = await this.TaskModel.getAll(userID)
        if(!tasks){
            throw new UnexpectedError()
        }
        tasks.map(el=>tasksToSend.push(el.content))
        sendTasksToEmail(email,tasksToSend)
        res.status(200).json('Success')
    }
}
export default TaskController