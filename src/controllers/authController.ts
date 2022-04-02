import {jwtAccessKey} from "../app/config";
import {checkPassword} from "../utils/checkPassword";
import {saveUsersLogs} from "../utils/saveLogs";
import {saveErrors} from "../utils/saveErrors";
import {registrationValidation} from "../utils/registrationValidation";
import {validationEmail} from "../utils/validationEmail";
import {AuthModel} from "../models/authModel";
import {UserModel} from "../models/userModel";
import {TokenModel} from "../models/tokenModel";
import * as jwt from 'jsonwebtoken'
import {Request, Response} from "express";
import {UserInterface} from "../types/UserInterface";

export class AuthController {
    static async registerNewUser(req:Request, res:Response):Promise<void> {
        const {email, name, password, password2} = req.body
        try {
            if(!registrationValidation(email,password,password2,name)){
                res.status(400).json('validation error')
                return
            }
            const emailAlreadyExist = await new AuthModel().addUser(email, name, password) // return error message if email already exist
            if(emailAlreadyExist){
                res.status(400).json(emailAlreadyExist)
                return
            }
            res.status(200).json('success')
        } catch (err) {
            console.log(err)
            await saveErrors(err.message, 'add new user')
            res.status(400).json(err.message)
        }
    }

    static async login(req:Request, res:Response):Promise<void> {
        const {email, password} = req.body
        if (  !password || password.trim().length<1 || !validationEmail(email)) {
            res.status(400).json('Validation error')
            return;
        }
        try {
            const userModel: UserModel = new UserModel()
            const user:UserInterface | boolean = await userModel.getUser(email)
            if (!user || !checkPassword(password, user.password)) {
                res.status(400).json('password or email invalid')
                return
            }
            const userDataSendToFront:Omit<UserInterface,"password"|"registerAt" | "lastLogin"> = {
                name: user.name,
                email: user.email,
                userID: user.userID
            }
            const token= jwt.sign(userDataSendToFront, jwtAccessKey, {expiresIn: "45m"})
            await userModel.setLastLoginDate(email)
            await new TokenModel().addToken(token)
            await saveUsersLogs(user.email,'sign in')
            res.status(200).json(token)
        } catch (err) {
            console.log(err)
            await saveErrors(err.message, 'login')
            res.status(400).json(err.message)
        }


    }
}
