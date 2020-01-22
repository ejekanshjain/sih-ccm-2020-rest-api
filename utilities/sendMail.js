require('dotenv').config()
const nodemailer = require('nodemailer')
module.exports = (email, subject, body) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.SM_EMAIL,
            pass: process.env.SM_PASSWORD
        }
    })
    const mailOptions = {
        from: `CCM <${process.env.SM_EMAIL}>`,
        to: email,
        subject: subject,
        text: body
    }
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) console.log(err)
    })
}