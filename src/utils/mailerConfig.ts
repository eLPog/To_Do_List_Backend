import * as nodemailer from 'nodemailer'
import {emailSettings} from "../app/config";

export const nodemailerConfig = async ()=>{
   const transporter = await nodemailer.createTransport({
        host: emailSettings.emailHost,
        port:587,
        secure:false,
        auth:{
            user:emailSettings.emailUser,
            pass:emailSettings.emailPass
        },
        tls:{
            rejectUnauthorized:false
        }
    })
    return transporter
}