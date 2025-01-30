import nodemailer from 'nodemailer'

export const mailSender = (token, email) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'subhranil@itobuz.com',
            pass: 'cpbx iwoe wgby fwbu'
        }
    })

    const authToken = token;

    const mailConfiguration = {
        from: 'Subhranil Das',
        to: email,
        subject: 'Email Verification',
        text: `Please click on the given link to verify your email address => http://localhost:3000/api/user/verify/${authToken}`
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