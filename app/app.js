import express, {urlencoded} from 'express'
import cors from 'cors'
import {port} from './config.js'
import {authRouter} from "../routes/authRouter.js";
import {isAuth} from "../utils/isAuth.js";
import {userRouter} from "../routes/userRouter.js";
import {taskRouter} from "../routes/taskRouter.js";

class App {
    constructor() {
        this.createApp()
        this.settings()
        this.routes()
        this.runServer()
    }

    createApp() {
        this.app = express()
    }

    settings() {
        this.app.use(express.json())
        this.app.use(urlencoded({
            extended: true
        }))
        this.app.use(cors())
    }

    routes() {
        this.app.use('/v1/api/auth', authRouter)
        this.app.use('/v1/api/user', isAuth, userRouter)
        this.app.use('/v1/api/tasks', isAuth, taskRouter)
    }


    runServer() {
        this.app.listen(port, 'localhost', () => console.log(`Server is running on port ${port}`))
    }
}

new App()
