import * as jwt from 'jsonwebtoken';
import {jwtAccessKey} from '../app/config';
import {validationEmail} from '../utils/validationEmail';
import {saveErrors} from '../utils/saveErrors';
import {saveUsersLogs} from '../utils/saveLogs';
import {checkPassword} from '../utils/checkPassword';
import {UserModel} from '../models/userModel';
import {TokenModel} from '../models/tokenModel';
import {setNewPassword} from '../utils/setNewPassword';
import {Response} from "express";
import {UserFromRequest} from "../types/UserFromRequest";
import {UnexpectedError, ValidationError} from "../errorHandlers/errorsHandler";
import {UserInterface} from "../types/UserInterface";

interface NewUser {
    name: string,
    email: string,
    password: string
}

export class UserController {
    static async getUser(req: UserFromRequest, res: Response) {
        const {email} = req.user;
        if (!email || !validationEmail(email)) {
            res.status(400).json('validation error');
        }
        const user = await new UserModel().getUser(email);
        if (!user) {
            throw new UnexpectedError()
        }
        res.status(200).json(user);

    }

    static async logout(req: UserFromRequest, res: Response) {
        const token = req.headers.authorization.split(' ')[1];
        if (!await new TokenModel().deleteToken(token)) {
           throw new UnexpectedError()
        }
        await saveUsersLogs(req.user.email, 'sign out');
        res.status(200).json('success');

    }

    static async delete(req: UserFromRequest, res: Response) {
        const {email} = req.user;
        const {password} = req.body;
            if (!password) {
               throw new ValidationError('Enter the password.')
            }
            const user = await new UserModel().getUser(email);
            if(!checkPassword(password, user.password)){
                throw new ValidationError('Password incorrect')
            }
            if (!user || !await new UserModel().deleteUser(email)) {
              throw new UnexpectedError();
            }
            res.status(200).json('Success');

    }

    static async updateUserData(req: UserFromRequest, res: Response) {
        const {email} = req.user;
        const token = req.headers.authorization.split(' ')[1];
        let newPassword;
        let newToken;
            const tokenModel = new TokenModel();
            const userModel = new UserModel();
            const user = await userModel.getUser(email);
            if(!user){
                throw new UnexpectedError();
            }
            if (req.body.password) {
                newPassword = setNewPassword(req.body.password, user.password);
            }

            const newUser: NewUser = {
                name: req.body.name ?? user.name,
                email: !validationEmail(req.body.email) ? email : req.body.email,
                password: newPassword ?? user.password,
            };

            const userDataToFront:Omit<UserInterface,"password"|"registerAt" | "lastLogin"> = {
                email:newUser.email,
                name:newUser.name,
                userID:user.userID
            }
//create new token and delete old token when password was changed
            if (newPassword) {
                    newToken = jwt.sign(userDataToFront, jwtAccessKey, {expiresIn: '45m'});
                    if (!await tokenModel.deleteToken(token) || !await tokenModel.addToken(newToken)) {
                        throw new UnexpectedError();
                    }
                }
            await userModel.editUser(email,newUser)
            res.status(200).json({userDataToFront,newToken});

    }
}
