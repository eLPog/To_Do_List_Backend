import {nodemailerConfig} from "./mailerConfig";

export async function sendNewPassword(email:string,newPassword:string){

    const transporter = await nodemailerConfig();
    await transporter.sendMail({
        from: `To Do List`,
        to: email,
        subject: `Your new password`,
        text: newPassword,
        html: `<b>Your new password:</b><br>${newPassword}<br>`
    })
}