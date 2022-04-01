import {Router} from "express";
import {UserController} from "../controllers/userController";
const userRouter = Router()
userRouter.get('/',UserController.getUser )
userRouter.post('/logout',UserController.logout)
userRouter.delete('/', UserController.delete)
userRouter.patch('/', UserController.updateUserData)
//post reset hasła - na maila, user nie jest zalogowany
//get wyślij notki na maila??
export {userRouter}