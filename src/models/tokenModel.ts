import {db} from "../db/dbConnection";
import {saveErrors} from "../utils/saveErrors";
import {FieldPacket} from "mysql2";
interface Token {
    token:string
}
export class TokenModel{
    async addToken(token:string):Promise<boolean>{
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
    async getTokens():Promise<Token[]>{
        try{
           const [tokens] = await db.execute('SELECT * FROM tokens') as [Token[], FieldPacket[]]
            return tokens
        }catch(err){
            console.log(err)
            await saveErrors(err.message, 'get tokens DB')
        }
    }
    async deleteToken(token:string):Promise<boolean>{
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