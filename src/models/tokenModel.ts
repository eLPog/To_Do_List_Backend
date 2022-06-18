import db from "../db/dbConnection";
import {FieldPacket} from "mysql2";
interface Token {
    token:string
}
 class TokenModel{
    async addToken(token:string):Promise<boolean>{
        try{
            await db.execute('INSERT INTO tokens (token) VALUES (:token)',{
                token
            })
            return true
        }catch(err){
            console.log(err)
            return false
        }
    }
    async getTokens():Promise<Token[]>{
        try{
           const [tokens] = await db.execute('SELECT * FROM tokens') as [Token[], FieldPacket[]]
            return tokens
        }catch(err){
            console.log(err)
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
            return false
        }
    }
}
export default TokenModel