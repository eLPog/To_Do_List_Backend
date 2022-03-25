import {db} from "../db/dbConnection.js";
import {saveErrors} from "../utils/saveErrors.js";
import {getActuallyDate} from "../utils/getActuallyDate.js";

export class UserModel{

    async getUser(email){
        try{
            const [[user]] = await db.execute('SELECT * FROM users WHERE email=:email', {
                email
            })
            return user
        }catch(err){
            console.log(err)
            await saveErrors(err.message, 'get one user DB')
            return false
        }
    }
    async updateLogin(email) {
        try {
            await db.execute('UPDATE users SET lastLogin=:lastLogin WHERE email=:email', {
                lastLogin: getActuallyDate(),
                email
            })
            return true
        } catch (err) {
            console.log(err)
            await saveErrors(err.message, 'add user DB')
            return false
        }
    }
    async deleteUser(email){
        try {
            await db.execute('DELETE FROM users WHERE email=:email', {
                email
            })
            return true
        } catch (err) {
            console.log(err)
            await saveErrors(err.message, 'add user DB')
            return false
        }
    }
}