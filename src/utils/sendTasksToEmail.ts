import * as nodemailer from 'nodemailer'

export  async function sendTasksToEmail(email: string, tasks: string) {
    // const tasksToSend = tasks.join(',')
    const transporter =  await nodemailer.createTransport({
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
    await transporter.sendMail({
        from: `To Do List`,
        to: email,
        subject: `You tasks from To Do List`,
        text: tasks,
        html: `<b>Your tasks:</b><br>${tasks}`
    })

}