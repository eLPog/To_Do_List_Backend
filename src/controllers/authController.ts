import {jwtAccessKey} from "../app/config";
import {checkPassword} from "../utils/checkPassword";
import {saveUsersLogs} from "../utils/saveLogs";
import {registrationValidation} from "../utils/registrationValidation";
import {validationEmail} from "../utils/validationEmail";
import * as jwt from 'jsonwebtoken'
import {Request, Response} from "express";
import {UserInterface} from "../types/UserInterface";
import {UnexpectedError, ValidationError} from "../errorHandlers/errorsHandler";
import randomatic from 'randomatic'
import {createHash} from "../utils/createHash";
import {sendNewPassword} from "../utils/sendNewPassword";
import {InterfaceUserModel} from "../types/InterfaceUserModel";
import AuthModel from "../models/authModel";
import TokenModel from "../models/tokenModel";
class AuthController {
    private AuthenticationModel:AuthModel;
    private UserModel:InterfaceUserModel;
    private TokenModel:TokenModel
    constructor({AuthenticationModel, UserModel, TokenModel}:{AuthenticationModel:AuthModel,UserModel:InterfaceUserModel,TokenModel:TokenModel}){
        this.AuthenticationModel = AuthenticationModel
        this.UserModel = UserModel
        this.TokenModel = TokenModel

    }
    registerNewUser = async (req: Request, res: Response): Promise<void> => {
        const {email, name, password, password2} = req.body
        if (!registrationValidation(email, password, password2, name)) {
            throw new ValidationError('Check if email is correct and if password have min. 5 characters')
        }
        const emailAlreadyExist = await this.AuthenticationModel.addUser(email, name, password) // return error message if email already exist
        if (emailAlreadyExist instanceof Error) {
            throw new ValidationError('Email already exist')
        }
        res.status(200).json('success')
    }

      login = async (req: Request, res: Response): Promise<void>=> {
        const {email, password} = req.body
        if (!password || password.trim().length < 5 || !validationEmail(email)) {
            throw new ValidationError('Password or email form is valid')
        }
        const user: UserInterface | boolean = await this.UserModel.getUser(email)
        if (!user || !checkPassword(password, user.password)) {
            throw new ValidationError('Password or email incorrect')
        }
        const userDataSendToFront: Omit<UserInterface, "password" | "registerAt" | "lastLogin"> = {
            name: user.name,
            email: user.email,
            userID: user.userID
        }
        const token = jwt.sign(userDataSendToFront, jwtAccessKey, {expiresIn: "45m"})
        await this.UserModel.setLastLoginDate(email)
        await this.TokenModel.addToken(token)
        await saveUsersLogs(user.email, 'sign in')
        res.status(200).json(token)
    }

      resetPassword = async (req: Request, res: Response)=> {
        const {email} = req.body
        const user: UserInterface = await this.UserModel.getUser(email)
        if (!user) {
            throw new UnexpectedError()
        }
        const newPassword: string = randomatic('Aa0!', 10)
        user.password = createHash(newPassword)
        await this.UserModel.editUser(email, user)
        sendNewPassword(email,newPassword)
        res.status(200).json('Success')

    }
}
export default AuthController