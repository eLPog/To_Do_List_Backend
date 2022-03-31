import {TaskModel} from "../models/taskModel";
import {saveErrors} from "../utils/saveErrors";
import {Request, Response} from "express";
import {UserFromRequest} from "../types/UserFromRequest";

export class TaskController {

    static async addTask(req:UserFromRequest, res:Response):Promise<boolean> {
        const {content} = req.body
        const {userID} = req.user
        if (!content || content.trim().length<1) {
            res.status(400).json('validation error')
            return;
        }
        try {
            const newTask = await new TaskModel().add(content, userID)
            if (!newTask) {
                res.status(400).json('DB error')
                return
            }
            res.status(200).json(newTask)
        } catch (err) {
            console.log(err)
            await saveErrors(err.message, 'add task')
            res.status(400).json(err.message)
        }
    }
    static async getAll(req:UserFromRequest, res:Response):Promise<boolean>{
        const {userID} = req.user
        try{
            const tasks = await new TaskModel().getAll(userID)
            if(!tasks){
                res.status(400).json('DB error')
                return
            }
            res.status(200).json(tasks)
        }catch(err){
            console.log(err)
            await saveErrors(err.message, 'get all tasks')
            res.status(400).json(err.message)

        }
    }
    static async getTask(req:Request, res:Response):Promise<void>{
        const {taskID} = req.params
        try{
            const task = await new TaskModel().getOne(taskID)
            if(!task){
                res.status(400).json('DB error or taskID doesnt exist')
                return
            }
            res.status(200).json(task)
        }catch(err){
            console.log(err)
            await saveErrors(err.message, 'get one task')
            res.status(400).json(err.message)

        }
    }
    static async deleteTask(req:Request, res:Response):Promise<void>{
        const {taskID} = req.params
        try{
           if(! await new TaskModel().deleteOne(taskID)){
               res.status(400).json('DB error or taskID doesnt exist')
               return
           }
            res.status(200).json('success')
        }catch(err){
            console.log(err)
            await saveErrors(err.message, 'delete one task')
            res.status(400).json(err.message)

        }
    }
    static async deleteAll(req:UserFromRequest,res:Response):Promise<void>{
        const {userID} = req.user
        try{
            if(!await new TaskModel().deleteAll(userID)){
                res.status(400).json('DB error')
                return
            }
            res.status(200).json('success')
        }catch(err){
            console.log(err)
            await saveErrors(err.message, 'delete all tasks')
            res.status(400).json(err.message)
        }

    }
    static async update(req:Request, res:Response):Promise<void>{
        const {taskID} = req.params
        const {content} = req.body
        try{
            if(content.trim().length<1){
                res.status(400).json('validation error')
                return
            }
            const task = await new TaskModel().updateTask(taskID,content)
            if(!task){
                res.status(400).json('DB error or taskID doesnt exist')
                return
            }
            res.status(200).json(task)
        }catch(err){
            console.log(err)
            await saveErrors(err.message, 'update task')
            res.status(400).json(err.message)
        }
    }
}