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
}