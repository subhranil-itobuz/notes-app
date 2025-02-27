import nodemailer from 'nodemailer'
import hbs from 'nodemailer-express-handlebars';
import dotenv from 'dotenv'

dotenv.config({})

export const mailSender = async (token, email) => {
    const FRONTEND_PORT = process.env.FRONTEND_PORT
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MY_MAIL,
            pass: process.env.MY_MAIL_PASSWORD
        }
    })

    transporter.use('compile', hbs({
        viewEngine: {
            extname: '.hbs',
            layoutsDir: './template',
            defaultLayout: false,
            partialsDir: './template',
        },
        viewPath: './src/template',
        extName: '.hbs'
    }));

    const mailConfiguration = {
        from: 'Subhranil Das <subhranil@itobuz.com>',
        to: email,
        subject: 'Email Verification',
        template: 'email',
        context: {
            token: `${token}`,
            port: `${FRONTEND_PORT}`
        }
    }

    transporter.sendMail(mailConfiguration, (error, res) => {
        if (error) {
            throw new Error(error.message);
        }
        else {
            console.log('Email sent successfully')
            console.log(res.response)
        }
    })
}