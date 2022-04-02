import * as nodemailer from 'nodemailer'

export const nodemailerConfig = async ()=>{
   const transporter = await nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port:587,
        secure:false,
        auth:{
            user:"lukastodolist@gmail.com",
            pass:"taktak59"
        },
        tls:{
            rejectUnauthorized:false
        }
    })
    return transporter
}