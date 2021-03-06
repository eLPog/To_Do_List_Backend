import {createHash} from "../utils/createHash";
import {getActuallyDate} from "../utils/getActuallyDate";
import {v4} from 'uuid'
import {UserInterface} from "../types/UserInterface";

 class AuthModel {
     private db:any
     constructor({db}:any) {
         this.db = db
     }
     addUser = async (email:string, name:string, password:string):Promise<Omit<UserInterface, "lastLogin"> | Error> => {
        try {
            const newUser = {
                userID: v4(),
                email,
                name,
                password: createHash(password),
                registerAt: getActuallyDate()
            }
            await this.db.execute('INSERT INTO users (userID,email,name,password,registerAt) VALUES (:userID,:email,:name,:password,:registerAt)', {
                userID: newUser.userID,
                email: newUser.email,
                name: newUser.name,
                password: newUser.password,
                registerAt: newUser.registerAt
            })
            return newUser;
        } catch (err) {
            console.log(err)
            return err
        }
    }

}
export default AuthModel