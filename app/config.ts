import dotenv from 'dotenv'
interface DataBaseSettings {
    database:string,
    host:string,
    user:string
}
dotenv.config()

const port = Number(process.env.PORT)
const dbSettings:DataBaseSettings = {
    database:process.env.DBNAME,
    host:process.env.DBHOST,
    user:process.env.DBUSER
}
const jwtAccessKey:string = process.env.JWTACCESS
const usersLogsDirectory:string = process.env.USERSLOGSDIRECTORY
const errorsLogsDirectory:string = process.env.ERRORSLOGSDIRECTORY
export {
    port,
    dbSettings,
    jwtAccessKey,
    usersLogsDirectory,
    errorsLogsDirectory
}