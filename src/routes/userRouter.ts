import {Router} from "express";
import {container} from "../di-setup/containerSetup";
const UserController = container.resolve('UserController')
const userRouter = Router()
userRouter.get('/',UserController.getUser )
userRouter.post('/logout',UserController.logout)
userRouter.delete('/', UserController.delete)
userRouter.patch('/', UserController.updateUserData)
export {userRouter}