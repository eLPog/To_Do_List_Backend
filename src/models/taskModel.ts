import db from "../db/dbConnection";
import {v4} from 'uuid'
import {getActuallyDate} from "../utils/getActuallyDate";
import {TaskInterface} from "../types/TaskInterface";
import {FieldPacket} from "mysql2";

 class TaskModel {


     async add(title:string, content:string, userID:string):Promise<TaskInterface | boolean> {
         try {
             const newTask = {
                 taskID: v4(),
                 title,
                 content,
                 userID,
                 createdAt: getActuallyDate(),
                 isDone:0
             }
             await db.execute('INSERT INTO tasks (taskID,title,content,userID,createdAt,isDone) VALUES (:taskID,:title,:content,:userID,:createdAt,:isDone)', {
                 taskID: newTask.taskID,
                 title: newTask.title,
                 content: newTask.content,
                 userID: newTask.userID,
                 createdAt: newTask.createdAt,
                 isDone:0
             })
             return newTask
         } catch (err) {
             console.log(err)
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
            return false
        }
    }

    async updateTask(taskID:string,newTask:{title?:string,content?:string}):Promise<string|boolean | TaskInterface> {
        try {
            if (!await this.getOne(taskID)) {
                return false
            }
            if(newTask.content){
                await db.execute('UPDATE tasks SET content=:content WHERE taskID=:taskID',{
                    taskID,
                    content:newTask.content
                })
            }
            if(newTask.title){
                await db.execute('UPDATE tasks SET title=:title WHERE taskID=:taskID',{
                    taskID,
                    title:newTask.title
                })
            }
            return await this.getOne(taskID)
            }
            catch (err) {
            console.log(err)
            return false
        }
    }
    async isTaskDone(taskID:string){
         try{
             const task = await this.getOne(taskID);
             await db.execute('UPDATE tasks SET isDone=:isDone WHERE taskID=:taskID', {
                 taskID,
                 // @ts-ignore
                 isDone:task.isDone === 0 ? 1 : 0
             })
         }catch(err){
             console.log(err)
         }
    }
}

export default TaskModel