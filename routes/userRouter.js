import {Router} from "express";
import {UserController} from "../controllers/userController.js";
const userRouter = Router()
userRouter.get('/',UserController.getUser )
userRouter.post('/logout',UserController.logout)
userRouter.delete('/', UserController.delete)
userRouter.patch('/', UserController.updateUserData)
//post reset hasła
//get wyślij notki na maila??
export {userRouter}