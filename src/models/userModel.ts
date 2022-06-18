import { getActuallyDate } from '../utils/getActuallyDate';
import {UserInterface} from "../types/UserInterface";
import {FieldPacket} from "mysql2";

class UserModel {
   private db
  constructor({db}:any) {
     this.db = db
   }
   getUser = async (email:string):Promise< UserInterface> => {
    try {
      const [[user]] = await this.db.execute('SELECT * FROM users WHERE email=:email', {
        email,
      }) as [UserInterface[],FieldPacket[]];
      return user;
    } catch (err) {
      console.log(err);
    }
  }

   setLastLoginDate = async (email:string):Promise<boolean> =>{
    try {
      await this.db.execute('UPDATE users SET lastLogin=:lastLogin WHERE email=:email', {
        lastLogin: getActuallyDate(),
        email,
      });
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

   deleteUser = async (email:string):Promise<boolean> => {
    try {
      await this.db.execute('DELETE FROM users WHERE email=:email', {
        email,
      });
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

   editUser = async (currentEmail:string, newUserObj:Omit<UserInterface,"userID" | "lastLogin" | "registerAt">):Promise<boolean> => {
    try {
      const oldUser = await this.getUser(currentEmail) as UserInterface;
      const newUser:UserInterface = {
        ...oldUser,
        ...newUserObj,
      };

      await this.db.execute('UPDATE users SET email=:email, name=:name, password=:password WHERE email=:currentEmail', {
        email: newUser.email,
        name: newUser.name,
        password: newUser.password,
        currentEmail,
      });
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

}
export default UserModel
