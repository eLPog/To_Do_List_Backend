import {jwtAccessKey} from "../app/config.js";
import {checkPassword} from "../utils/checkPassword.js";
import {saveUsersLogs} from "../utils/saveLogs.js";
import {saveErrors} from "../utils/saveErrors.js";
import {getActuallyDate} from "../utils/getActuallyDate.js";
import {registrationValidation} from "../utils/registrationValidation.js";
import {validationEmail} from "../utils/validationEmail.js";
import {AuthModel} from "../models/authModel.js";
import {UserModel} from "../models/userModel.js";
import {TokenModel} from "../models/tokenModel.js";
import jwt from 'jsonwebtoken'

export class AuthController {
    static async registerNewUser(req, res) {
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

    static async login(req, res) {
        const {email, password} = req.body
        if ((email.trim().length<1 || password.trim().length<1) || !validationEmail(email)) {
            res.status(400).json('Validation error')
            return;
        }
        try {
            const userModel = new UserModel()
            let user = await userModel.getUser(email)
            if (!user || !checkPassword(password, user.password)) {
                res.status(400).json('password or email invalid')
                return
            }
            user = {
                name: user.name,
                email: user.email,
                userID: user.userID
            }
            const token = jwt.sign(user, jwtAccessKey, {expiresIn: "45m"})
            await userModel.updateLogin(email)
            await new TokenModel().addToken(token)
            await saveUsersLogs(user.email, getActuallyDate(), 'sign in')
            res.status(200).json(token)
        } catch (err) {
            console.log(err)
            await saveErrors(err.message, 'login')
            res.status(400).json(err.message)
        }


    }
}