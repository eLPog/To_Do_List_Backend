import {db} from "../db/dbConnection.js";
import {saveErrors} from "../utils/saveErrors.js";

export class TokenModel{
    async addToken(token){
        try{
            await db.execute('INSERT INTO tokens (token) VALUES (:token)',{
                token
            })
            return true
        }catch(err){
            console.log(err)
            await saveErrors(err.message, 'add token DB')
            return false
        }
    }
    async getTokens(){
        try{
            const [tokens] = await db.execute('SELECT * FROM tokens')
            return tokens
        }catch(err){
            console.log(err)
            await saveErrors(err.message, 'get tokens DB')
            return false
        }
    }
    async deleteToken(token){
        try{
            await db.execute('DELETE FROM tokens WHERE token=:token',{
                token
            })
            return true
        }catch(err){
            console.log(err)
            await saveErrors(err.message, 'delete token DB')
            return false
        }
    }
}