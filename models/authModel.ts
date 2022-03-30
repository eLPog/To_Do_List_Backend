import {db} from "../db/dbConnection";
import {createHash} from "../utils/createHash";
import {getActuallyDate} from "../utils/getActuallyDate";
import {saveErrors} from "../utils/saveErrors";
import {v4} from 'uuid'
import {UserInterface} from "../types/UserInterface";

export class AuthModel {
    async addUser(email:string, name:string, password:string):Promise<Omit<UserInterface, "lastLogin"> | string> {
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
            return err.sqlMessage
        }
    }

}