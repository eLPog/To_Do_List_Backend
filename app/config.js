import dotenv from 'dotenv'

dotenv.config()

const port = process.env.PORT
const dbSettings = {
    database:process.env.DBNAME,
    host:process.env.DBHOST,
    user:process.env.DBUSER
}
const jwtAccessKey = process.env.JWTACCESS
const usersLogsDirectory = process.env.USERSLOGSDIRECTORY
const errorsLogsDirectory = process.env.ERRORSLOGSDIRECTORY
export {
    port,
    dbSettings,
    jwtAccessKey,
    usersLogsDirectory,
    errorsLogsDirectory
}