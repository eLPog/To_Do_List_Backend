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
        }

    }
}