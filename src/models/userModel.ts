import { db } from '../db/dbConnection';
import { saveErrors } from '../utils/saveErrors';
import { getActuallyDate } from '../utils/getActuallyDate';
import {UserInterface} from "../types/UserInterface";
import {FieldPacket} from "mysql2";

export class UserModel {
  async getUser(email:string):Promise< UserInterface> {
    try {
      const [[user]] = await db.execute('SELECT * FROM users WHERE email=:email', {
        email,
      }) as [UserInterface[],FieldPacket[]];
      return user;
    } catch (err) {
      console.log(err);
      await saveErrors(err.message, 'get one user DB');
    }
  }

  async setLastLoginDate(email:string):Promise<boolean> {
    try {
      await db.execute('UPDATE users SET lastLogin=:lastLogin WHERE email=:email', {
        lastLogin: getActuallyDate(),
        email,
      });
      return true;
    } catch (err) {
      console.log(err);
      await saveErrors(err.message, 'add user DB');
      return false;
    }
  }

  async deleteUser(email:string):Promise<boolean> {
    try {
      await db.execute('DELETE FROM users WHERE email=:email', {
        email,
      });
      return true;
    } catch (err) {
      console.log(err);
      await saveErrors(err.message, 'add user DB');
      return false;
    }
  }

  async editUser(currentEmail:string, newUserObj:Omit<UserInterface,"userID" | "lastLogin" | "registerAt">):Promise<boolean> {
    try {
      const oldUser = await this.getUser(currentEmail) as UserInterface;
      const newUser:UserInterface = {
        ...oldUser,
        ...newUserObj,
      };

      await db.execute('UPDATE users SET email=:email, name=:name, password=:password WHERE email=:currentEmail', {
        email: newUser.email,
        name: newUser.name,
        password: newUser.password,
        currentEmail,
      });
      return true;
    } catch (err) {
      console.log(err);
      await saveErrors(err.message, 'edit user DB');
      return false;
    }
  }

  // async setNewPassword(email:string):Promise<void> {
  //   await db.execute('UPDATE users SET password=:password WHERE email=:email', {
  //     email,
  //   });
  // }
}
