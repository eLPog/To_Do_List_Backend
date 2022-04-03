import {jwtAccessKey} from "../app/config";
import {checkPassword} from "../utils/checkPassword";
import {saveUsersLogs} from "../utils/saveLogs";
import {registrationValidation} from "../utils/registrationValidation";
import {validationEmail} from "../utils/validationEmail";
import {AuthModel} from "../models/authModel";
import {UserModel} from "../models/userModel";
import {TokenModel} from "../models/tokenModel";
import * as jwt from 'jsonwebtoken'
import {Request, Response} from "express";
import {UserInterface} from "../types/UserInterface";
import {UnexpectedError, ValidationError} from "../errorHandlers/errorsHandler";
import randomatic from 'randomatic'
import {createHash} from "../utils/createHash";
import {sendNewPassword} from "../utils/sendNewPassword";
import {sendTasksToEmail} from "../utils/sendTasksToEmail";

export class AuthController {
    static async registerNewUser(req: Request, res: Response): Promise<void> {
        const {email, name, password, password2} = req.body
        if (!registrationValidation(email, password, password2, name)) {
            throw new ValidationError('Validation error')
        }
        const emailAlreadyExist = await new AuthModel().addUser(email, name, password) // return error message if email already exist
        if (emailAlreadyExist instanceof Error) {
            throw new ValidationError('Email already exist')
        }
        res.status(200).json('success')
    }

    static async login(req: Request, res: Response): Promise<void> {
        const {email, password} = req.body
        if (!password || password.trim().length < 5 || !validationEmail(email)) {
            throw new ValidationError('Password or email form is valid')
        }
        const userModel: UserModel = new UserModel()
        const user: UserInterface | boolean = await userModel.getUser(email)
        if (!user || !checkPassword(password, user.password)) {
            throw new ValidationError('Password or email incorrect')
        }
        const userDataSendToFront: Omit<UserInterface, "password" | "registerAt" | "lastLogin"> = {
            name: user.name,
            email: user.email,
            userID: user.userID
        }
        const token = jwt.sign(userDataSendToFront, jwtAccessKey, {expiresIn: "45m"})
        await userModel.setLastLoginDate(email)
        await new TokenModel().addToken(token)
        await saveUsersLogs(user.email, 'sign in')
        res.status(200).json(token)
    }

    static async resetPassword(req: Request, res: Response) {
        const {email} = req.body
        const userModel: UserModel = new UserModel()
        const user: UserInterface = await userModel.getUser(email)
        if (!user) {
            throw new UnexpectedError()
        }
        const newPassword: string = randomatic('Aa0!', 10)
        user.password = createHash(newPassword)
        await userModel.editUser(email, user)
        sendNewPassword(email,newPassword)
        res.status(200).json('Success')

    }
}
