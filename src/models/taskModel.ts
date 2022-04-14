import db from "../db/dbConnection";
import {v4} from 'uuid'
import {getActuallyDate} from "../utils/getActuallyDate";
import {saveErrors} from "../utils/saveErrors";
import {TaskInterface} from "../types/TaskInterface";
import {FieldPacket} from "mysql2";

 class TaskModel {


    async add(content:string, userID:string):Promise<TaskInterface | boolean> {
        try {
            const newTask = {
                taskID: v4(),
                content,
                userID,
                createdAt: getActuallyDate()
            }
            await db.execute('INSERT INTO tasks (taskID,content,userID,createdAt) VALUES (:taskID,:content,:userID,:createdAt)', {
                taskID: newTask.taskID,
                content: newTask.content,
                userID: newTask.userID,
                createdAt: newTask.createdAt
            })
            return newTask
        } catch (err) {
            console.log(err)
            await saveErrors(err.message, 'add task DB')
            return false
        }
    }

    async getAll(userID:string):Promise<TaskInterface[]> {
        try {
            const [tasks] = await db.execute('SELECT * FROM tasks WHERE userID=:userID', {
                userID
            }) as [TaskInterface[], FieldPacket[]]
            return tasks
        } catch (err) {
            console.log(err)
            await saveErrors(err.message, 'get all tasks DB')
        }
    }

    async getOne(taskID:string):Promise<TaskInterface | boolean> {
        try {
            const [[task]] = await db.execute('SELECT * FROM tasks WHERE taskID=:taskID', {
                taskID
            }) as [TaskInterface[], FieldPacket[]]
            return task
        } catch (err) {
            console.log(err)
            await saveErrors(err.message, 'get all tasks DB')
            return false
        }
    }

    async deleteOne(taskID:string):Promise<boolean> {
        try {
            if (!await this.getOne(taskID)) {
                return false
            }
            await db.execute('DELETE FROM tasks WHERE taskID=:taskID', {
                taskID
            })
            return true
        } catch (err) {
            console.log(err)
            await saveErrors(err.message, 'delete one task DB')
            return false
        }
    }

    async deleteAll(userID:string):Promise<boolean> {
        try {
            await db.execute('DELETE FROM tasks WHERE userID=:userID', {
                userID
            })
            return true
        } catch (err) {
            console.log(err)
            await saveErrors(err.message, 'delete all tasks DB')
            return false
        }
    }

    async updateTask(taskID:string,newContent:string):Promise<string|boolean | TaskInterface> {
        try {
            if (!await this.getOne(taskID)) {
                return false
            }
            await db.execute('UPDATE tasks SET content=:content WHERE taskID=:taskID',{
                taskID,
                content:newContent
            })
            return await this.getOne(taskID)
        } catch (err) {
            console.log(err)
            await saveErrors(err.message, 'update task DB')
            return false
        }
    }
}

export default TaskModel