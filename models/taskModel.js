import {db} from "../db/dbConnection.js";
import {v4} from 'uuid'
import {getActuallyDate} from "../utils/getActuallyDate.js";
import {saveErrors} from "../utils/saveErrors.js";

export class TaskModel{


    async add(content, userID){
        try{
            const newTask = {
                taskID:v4(),
                content,
                userID,
                createdAt:getActuallyDate()
            }
            await db.execute('INSERT INTO tasks (taskID,content,userID,createdAt) VALUES (:taskID,:content,:userID,:createdAt)', {
                taskID:newTask.taskID,
                content:newTask.content,
                userID:newTask.userID,
                createdAt:newTask.createdAt
            })
            return newTask
        }catch(err){
            console.log(err)
           await saveErrors(err.message,'add task DB')
            return false
        }
    }
    async getAll(userID){
        try{
            const [tasks] = await db.execute('SELECT * FROM tasks WHERE userID=:userID', {
                userID
            })
            return tasks
        }catch(err){
            console.log(err)
            await saveErrors(err.message,'get all tasks DB')
            return false
        }
    }
    async getOne(taskID){
        try{
            const [[task]] = await db.execute('SELECT * FROM tasks WHERE taskID=:taskID', {
                taskID
            })
            return task
        }catch(err){
            console.log(err)
            await saveErrors(err.message,'get all tasks DB')
            return false
        }
    }
    async deleteOne(taskID){
        try{
            if(!await this.getOne(taskID)){
                return false
            }
            await db.execute('DELETE FROM tasks WHERE taskID=:taskID', {
                taskID
            })
            return true
        }catch(err){
            console.log(err)
            await saveErrors(err.message,'delete one task DB')
            return false
        }
    }
}