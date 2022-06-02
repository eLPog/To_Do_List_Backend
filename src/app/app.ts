import  express from 'express';
import  cors from 'cors';
import {awilixSetup} from "../di-setup/containerSetup";
awilixSetup()
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
        this.app.use(cors({
            "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
            "preflightContinue": false,
            "optionsSuccessStatus": 204

        }))
        this.app.use(express.json())
        this.app.use(express.urlencoded({
            extended: true
        }))

    }

    private routes() {
        this.app.post('/v1/api', (req, res)=>{
            console.log(req.body)
res.json({zwrotka:'dupcia fajna jest'})
        })
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
