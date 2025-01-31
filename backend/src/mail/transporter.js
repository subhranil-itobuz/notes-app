import nodemailer from 'nodemailer'
import hbs from 'nodemailer-express-handlebars';

export const mailSender = (token, email) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'subhranil@itobuz.com',
            pass: 'cpbx iwoe wgby fwbu'
        }
    })

    const authToken = token;

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
        from: 'Subhranil Das',
        to: email,
        subject: 'Email Verification',
        template: 'email',
        context: {
            token: `${token}`
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