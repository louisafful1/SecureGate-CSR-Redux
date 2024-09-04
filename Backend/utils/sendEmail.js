import nodemailer from "nodemailer"
import asyncHandler from "express-async-handler"

const sendEmail = asyncHandler( async(subject, message, send_to, send_from) => {
     const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
        tls: {
            rejectUnauthorized: false
        }
     })

     const options = {
        from: send_from,
        to: send_to,
        subject,
        html: message

     }

    await transporter.sendMail(options, (err, info) => {
        if (err) {            
            console.error(err);
            throw new Error("Email was not sent");
        } else {
            console.log(info)
 
        }

     })
})

export default sendEmail

