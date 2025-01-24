import nodemailer from 'nodemailer'

export const mailSender = (token, email) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'subhranil@itobuz.com',
            pass: 'cete efrb xqbb zuhr'
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
            throw new Error("Something went wrong");
        }
        else {
            console.log('Email sent successfully')
            console.log(res.response)
        }
    })
}