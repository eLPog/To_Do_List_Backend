import {TaskModel} from "../models/taskModel.js";
import {saveErrors} from "../utils/saveErrors.js";

export class TaskController {

    static async addTask(req, res) {
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
    static async getAll(req, res){
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
    static async getTask(req, res){
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
    static async deleteTask(req, res){
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
}