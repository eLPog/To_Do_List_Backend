import {TaskModel} from "../models/taskModel";
import {saveErrors} from "../utils/saveErrors";
import {Request, Response} from "express";
import {UserFromRequest} from "../types/UserFromRequest";
import {UnexpectedError, ValidationError} from "../errorHandlers/errorsHandler";

export class TaskController {

    static async addTask(req: UserFromRequest, res: Response): Promise<void> {
        const {content} = req.body
        const {userID} = req.user
        if (!content || content.trim().length < 1) {
            throw new ValidationError('The content of the task must contain at least 1 character')
        }
        const newTask = await new TaskModel().add(content, userID)
        if (!newTask) {
            throw new UnexpectedError()
        }
        res.status(200).json(newTask)

    }

    static async getAll(req: UserFromRequest, res: Response): Promise<void> {
        const {userID} = req.user
            const tasks = await new TaskModel().getAll(userID)
            if (!tasks) {
               throw new UnexpectedError()
            }
            res.status(200).json(tasks)

    }

    static async getTask(req: Request, res: Response): Promise<void> {
        const {taskID} = req.params
            const task = await new TaskModel().getOne(taskID)
            if (!task) {
               throw new UnexpectedError('Check task id number')
            }
            res.status(200).json(task)
    }

    static async deleteTask(req: Request, res: Response): Promise<void> {
        const {taskID} = req.params
            if (!await new TaskModel().deleteOne(taskID)) {
               throw new UnexpectedError('Check task id number');
            }
            res.status(200).json('success')
    }
    static async deleteAll(req: UserFromRequest, res: Response): Promise<void> {
        const {userID} = req.user
            if (!await new TaskModel().deleteAll(userID)) {
              throw new UnexpectedError()
            }
            res.status(200).json('Success')
    }

    static async update(req: Request, res: Response): Promise<void> {
        const {taskID} = req.params
        const {content} = req.body
            if (content.trim().length < 1) {
               throw new ValidationError('The content of the task must contain at least 1 character')
            }
            const task = await new TaskModel().updateTask(taskID, content)
            if (!task) {
              throw new UnexpectedError();
            }
            res.status(200).json(task)

    }
}