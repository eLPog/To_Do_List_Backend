import {jwtAccessKey} from "../app/config.js";
import {validationEmail} from "../utils/validationEmail.js";
import {saveErrors} from "../utils/saveErrors.js";
import {saveUsersLogs} from "../utils/saveLogs.js";
import {getActuallyDate} from "../utils/getActuallyDate.js";
import {checkPassword} from "../utils/checkPassword.js";
import {UserModel} from "../models/userModel.js";
import {TokenModel} from "../models/tokenModel.js";
import jwt from "jsonwebtoken";
import randomatic from 'randomatic'
import {createHash} from "../utils/createHash.js";
import {setNewPassword} from "../utils/setNewPassword.js";

export class UserController {

    static async getUser(req, res) {
        const {email} = req.user
        if (!email || !validationEmail(email)) {
            res.status(400).json('validation error')
        }
        try {
            const user = await new UserModel().getUser(email)
            if (!user) {
                res.status(400).json('DB error')
                return;
            }
            res.status(200).json(user)
        } catch (err) {
            console.log(err)
            await saveErrors(err.message, 'get one user')
            res.status(400).json(err.message)
        }
    }

    static async logout(req, res) {
        try {
            const token = req.headers.authorization.split(" ")[1]
            if (!await new TokenModel().deleteToken(token)) {
                res.status(400).json('DB error')
                return;
            }
            await saveUsersLogs(req.user.email, getActuallyDate(), 'sign out')
            res.status(200).json('success')
        } catch (err) {
            console.log(err)
            await saveErrors(err.message, 'user sign out')
            res.status(400).json(err.message)
        }

    }

    static async delete(req, res) {
        const {email} = req.user
        const {password} = req.body
        try {
            if (!password) {
                res.status(400).json('validation error')
                return
            }
            const user = await new UserModel().getUser(email)
            if (!user || !checkPassword(password, user.password) || !await new UserModel().deleteUser(email)) {
                res.status(400).json('DB error or password invalid')
                return;
            }
            res.status(200).json('success')
        } catch (err) {
            console.log(err)
            await saveErrors(err.message, 'user sign out')
            res.status(400).json(err.message)
        }
    }

    static async updateUserData(req, res) {
        const {email} = req.user
        const token = req.headers.authorization.split(" ")[1]
        let newPassword;
        try {
            const tokenModel = new TokenModel()
            const userModel = new UserModel()
            const user = await userModel.getUser(email)
            if (req.body.password) {
                newPassword = setNewPassword(req.body.password, user.password)
            }
            const newUser = {
                name: req.body.name ?? user.name,
                email: !validationEmail(req.body.email) ? email : req.body.email,
                password: newPassword ?? user.password
            }
            if (user.name !== newUser.name || user.email !== newUser.email || newPassword) {
                if (!user || !await userModel.editUser(email, newUser)) {
                    res.status(400).json('DB error')
                    return;
                }
                const newToken = jwt.sign(newUser, jwtAccessKey, {expiresIn: "45m"})
                if (!await tokenModel.deleteToken(token) || !await tokenModel.addToken(newToken)) {
                    res.status(400).json('DB error')
                    return;
                }
                res.status(200).json({newToken, updatedData: newUser})
                return
            }
            res.status(200).json(user)
        } catch (err) {
            console.log(err)
            await saveErrors(err.message, 'user data update')
            res.status(400).json(err.message)
        }
    }

}