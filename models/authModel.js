import {db} from "../db/dbConnection.js";
import {createHash} from "../utils/createHash.js";
import {getActuallyDate} from "../utils/getActuallyDate.js";
import {v4} from 'uuid'
import {saveErrors} from "../utils/saveErrors.js";

export class AuthModel {
    async addUser(email, name, password) {
        try {
            const newUser = {
                userID: v4(),
                email,
                name,
                password: createHash(password),
                registerAt: getActuallyDate()
            }
            await db.execute('INSERT INTO users (userID,email,name,password,registerAt) VALUES (:userID,:email,:name,:password,:registerAt)', {
                userID: newUser.userID,
                email: newUser.email,
                name: newUser.name,
                password: newUser.password,
                registerAt: newUser.registerAt
            })
            return newUser;
        } catch (err) {
            console.log(err)
            await saveErrors(err.message, 'add user DB')
            return false
        }
    }

}