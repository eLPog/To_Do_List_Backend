import * as dotenv from 'dotenv'
interface DataBaseSettings {
    database:string,
    host:string,
    user:string,
    password:string
}

dotenv.config()

const port = parseInt(process.env.PORT || '3000') as number
const corsOrigin = 'https://tickitoff.networkmanager.pl';
const dbSettings:DataBaseSettings = {
    database:process.env.DBNAME,
    host:process.env.DBHOST,
    user:process.env.DBUSER,
    password:process.env.DBPASSWORD
}
const emailSettings = {
    emailHost:process.env.EMAILHOST,
    emailPort:process.env.EMAILPORT,
    emailUser:process.env.EMAILUSER,
    emailPass:process.env.EMAILPASS
}
const jwtAccessKey:string = process.env.JWTACCESS
export {
    port,
    dbSettings,
    jwtAccessKey,
    emailSettings,
    corsOrigin
}