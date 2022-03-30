import {Router} from 'express'
import {AuthController} from "../controllers/authController.ts";

const authRouter = Router()
authRouter.post('/register', AuthController.registerNewUser)
authRouter.post('/', AuthController.login)
export {authRouter}