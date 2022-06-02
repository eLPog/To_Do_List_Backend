import * as awilix from 'awilix'
import {InjectionMode} from 'awilix'
import AuthController from "../controllers/authController";
import AuthModel from "../models/authModel";
import UserModel from "../models/userModel";
import UserController from "../controllers/userController";
import TokenModel from "../models/tokenModel";
import TaskController from "../controllers/taskController";
import TaskModel from "../models/taskModel";
import db from "../db/dbConnection"


function awilixSetup(){
    const container = awilix.createContainer({
        injectionMode:InjectionMode.PROXY
    })
    return container.register({
        AuthenticationController:awilix.asClass(AuthController),
        UserController:awilix.asClass(UserController),
        TaskController:awilix.asClass(TaskController),
        AuthenticationModel:awilix.asClass(AuthModel),
        UserModel:awilix.asClass(UserModel),
        TokenModel:awilix.asClass(TokenModel),
        TaskModel:awilix.asClass(TaskModel),
        db:awilix.asValue(db)
    })
}

export {awilixSetup}