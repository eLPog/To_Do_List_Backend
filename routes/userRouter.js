import {Router} from "express";
import {UserController} from "../controllers/userController.js";
const userRouter = Router()
userRouter.get('/',UserController.getUser )
userRouter.post('/logout',UserController.logout)
export {userRouter}