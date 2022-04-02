import * as express from 'express';
import * as cors from 'cors';
require('express-async-errors');
import {port} from './config';
import {authRouter} from "../routes/authRouter";
import {isAuth} from "../utils/isAuth";
import {userRouter} from "../routes/userRouter";
import {taskRouter} from "../routes/taskRouter";
import {notFoundHandler} from "../errorHandlers/notFoundHandler";
import {httpFormater} from "../errorHandlers/errorsHandler";

class App {
    private app:express.Application
    constructor() {
        this.createApp()
        this.settings()
        this.routes()
        this.errorHandlers()
        this.runServer()
    }

   private createApp() {
        this.app = express()
    }

    private settings() {
        this.app.use(express.json())
        this.app.use(express.urlencoded({
            extended: true
        }))
        this.app.use(cors())
    }

    private routes() {
        this.app.use('/v1/api/auth', authRouter)
        this.app.use('/v1/api/user', isAuth, userRouter)
        this.app.use('/v1/api/tasks', isAuth, taskRouter)
    }
    private errorHandlers(){
        this.app.use('/', notFoundHandler)
        this.app.use('/', httpFormater)
    }


    private runServer() {
        this.app.listen(port, 'localhost', () => console.log(`Server is running on port ${port}`))
    }
}

new App()
