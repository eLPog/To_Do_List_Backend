import {container} from "../di-setup/containerSetup";
import {Router} from 'express'
const AuthController = container.resolve('AuthenticationController')
const authRouter = Router()
authRouter.post('/register', AuthController.registerNewUser)
authRouter.post('/', AuthController.login)
authRouter.put('/', AuthController.resetPassword)
export {authRouter}