import {Router} from "express";
import {UserController} from "../controllers/userController.js";
const userRouter = Router()
userRouter.get('/',UserController.getUser )
userRouter.post('/logout',UserController.logout)
userRouter.delete('/', UserController.delete)
//patch edytuj
//post reset hasła
//delete usuń usera
//get wyślij notki na maila??
export {userRouter}