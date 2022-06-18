import * as jwt from 'jsonwebtoken';
import {jwtAccessKey} from '../app/config';
import {validationEmail} from '../utils/validationEmail';
import {saveUsersLogs} from '../utils/saveLogs';
import {checkPassword} from '../utils/checkPassword';
import {setNewPassword} from '../utils/setNewPassword';
import {Response} from "express";
import {UserFromRequest} from "../types/UserFromRequest";
import {UnexpectedError, ValidationError} from "../errorHandlers/errorsHandler";
import {UserInterface} from "../types/UserInterface";
import {InterfaceUserModel} from "../types/InterfaceUserModel";
import TokenModel from "../models/tokenModel";

interface NewUser {
    name: string,
    email: string,
    password: string
}

class UserController {
    private UserModel: InterfaceUserModel;
    private TokenModel: TokenModel

    constructor({UserModel, TokenModel}:{UserModel:InterfaceUserModel,TokenModel:TokenModel}) {
        this.UserModel = UserModel
        this.TokenModel = TokenModel
    }

    getUser = async (req: UserFromRequest, res: Response):Promise<void> => {
        const {email} = req.user;
        if (!email || !validationEmail(email)) {
            throw new ValidationError('Email format invalid')
        }
        const user = await this.UserModel.getUser(email);
        if (!user) {
            throw new UnexpectedError()
        }
        res.status(200).json(user);

    }

     logout = async(req: UserFromRequest, res: Response):Promise<void> =>{
        const token = req.headers.authorization.split(' ')[1];
        if (!await this.TokenModel.deleteToken(token)) {
            throw new UnexpectedError()
        }
        await saveUsersLogs(req.user.email, 'sign out');
        res.status(200).json('success');

    }

    delete = async (req: UserFromRequest, res: Response):Promise<void> => {
        const {email} = req.user;
        const {password} = req.body;
        if (!password) {
            throw new ValidationError('Enter the password.')
        }
        const user = await this.UserModel.getUser(email);
        if (!checkPassword(password, user.password)) {
            throw new ValidationError('Password incorrect')
        }
        if (!user || !await this.UserModel.deleteUser(email)) {
            throw new UnexpectedError();
        }
        res.status(200).json('Success');

    }

    updateUserData = async (req: UserFromRequest, res: Response):Promise<void> => {
        const {email} = req.user;
        const token = req.headers.authorization.split(' ')[1];
        let newPassword;
        let newToken;
        const user = await this.UserModel.getUser(email);
        if (!user) {
            throw new UnexpectedError();
        }
        if (req.body.password) {
            newPassword = setNewPassword(req.body.password, user.password);
        }

        const newUser: NewUser = {
            name: req.body.name.trim().length>1? req.body.name : user.name,
            email: !validationEmail(req.body.email) ? email : req.body.email,
            password: newPassword ?? user.password,
        };

        const userDataToFront: Omit<UserInterface, "password" | "registerAt" | "lastLogin"> = {
            email: newUser.email,
            name: newUser.name,
            userID: user.userID
        }
//create new token and delete old token when password was changed
        if (newPassword) {
            newToken = jwt.sign(userDataToFront, jwtAccessKey, {expiresIn: '45m'});
            if (!await this.TokenModel.deleteToken(token) || !await this.TokenModel.addToken(newToken)) {
                throw new UnexpectedError();
            }
        }
        await this.UserModel.editUser(email, newUser)
        res.status(200).json({userDataToFront, newToken});

    }
}

export default UserController