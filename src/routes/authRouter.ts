import {Router} from 'express'
import {awilixSetup} from "../di-setup/containerSetup";
const container = awilixSetup();
const AuthController = container.resolve('AuthenticationController')
const authRouter = Router()
authRouter.post('/register', AuthController.registerNewUser)
authRouter.post('/', AuthController.login)
authRouter.put('/', AuthController.resetPassword)
export {authRouter}