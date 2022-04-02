import {nodemailerConfig} from "./mailerConfig";

export async function sendTasksToEmail(email: string, tasks: string[]) {
    const tasksToSend = tasks.join(`, `)
    const transporter = await nodemailerConfig();
    await transporter.sendMail({
        from: `To Do List`,
        to: email,
        subject: `You tasks from To Do List`,
        text: tasksToSend,
        html: `<b>Your tasks from To Do List:</b><p>${tasksToSend}</p>`
    })

}