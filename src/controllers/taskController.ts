import {Request, Response} from "express";
import {UserFromRequest} from "../types/UserFromRequest";
import {UnexpectedError, ValidationError} from "../errorHandlers/errorsHandler";
import {sendTasksToEmail} from "../utils/sendTasksToEmail";
import {InterfaceTaskModel} from "../types/InterfaceTaskModel";
import TaskModel from "../models/taskModel";
import {getActuallyDate} from "../utils/getActuallyDate";

 class TaskController {
     private TaskModel:InterfaceTaskModel
     constructor({TaskModel}:{TaskModel:TaskModel}) {
         this.TaskModel = TaskModel
     }

      addTask = async (req: UserFromRequest, res: Response): Promise<void> =>{
        const {content, title} = req.body
        const {userID} = req.user
        if (!content || content.trim().length < 1 || !title || title.trim().length<1) {
            throw new ValidationError('The title and the content of the task must contain at least 1 character')
        }
        const newTask = await this.TaskModel.add(title, content, userID)
        if (!newTask) {
            throw new UnexpectedError()
        }
        res.status(200).json(newTask)

    }
        isTaskDoneToggle = async (req:UserFromRequest, res:Response) => {
        const {taskID} = req.params
        await this.TaskModel.isTaskDone(taskID)
        res.status(200).json(taskID)


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
        const {content, title} = req.body
            if ((typeof content==='string' && content.trim().length < 1) || (typeof title==='string' && title.trim().length < 1)) {
               throw new ValidationError('The value you want to edit (title or content) must be at least 1 character')
            }
            const task = await this.TaskModel.updateTask(taskID, {title,content})
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
       await sendTasksToEmail(email,tasksToSend)
        res.status(200).json('Success')
    }
}
export default TaskController