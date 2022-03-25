import {UserModel} from "../models/userModel.js";
import {validationEmail} from "../utils/validationEmail.js";
import {saveErrors} from "../utils/saveErrors.js";
import {TokenModel} from "../models/tokenModel.js";
import {saveUsersLogs} from "../utils/saveLogs.js";
import {getActuallyDate} from "../utils/getActuallyDate.js";

export class UserController{

    static async getUser(req, res){
        const {email} = req.user
        if(!email || !validationEmail(email)){
            res.status(400).json('validation error')
        }
        try{
            const user = await new UserModel().getUser(email)
            if(!user){
                res.status(400).json('DB error')
                return;
            }
            res.status(200).json(user)
        }catch(err){
            console.log(err)
           await saveErrors(err.message,'get one user')
            res.status(400).json(err.message)
        }
    }
    static async logout(req,res){
        try{
            const token = req.headers.authorization.split(" ")[1]
            if(!await new TokenModel().deleteToken(token)){
                res.status(400).json('DB error')
                return;
            }
            await saveUsersLogs(req.user.email,getActuallyDate(),'sign out')
            res.status(200).json('success')
        }catch(err){
            console.log(err)
            await saveErrors(err.message,'user sign out')
            res.status(400).json(err.message)
        }

    }
}