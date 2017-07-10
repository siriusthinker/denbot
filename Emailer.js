const nodemailer = require('nodemailer');

class Emailer {

    static send(data) {

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: false, // secure:true for port 465, secure:false for port 587
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        // setup email data with unicode symbols
        let mailOptions = {
            from: '"Kent Space ChatBot" <' + process.env.EMAIL_USER + '>', // sender address
            to: data.to, // list of receivers
            subject: data.subject, // Subject line
            text:  data.text,// plain text body
            html: '<b>' + data.text + '</b>' // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }

            console.log('Message %s sent: %s', info.messageId, info.response);
        });
    }
}

module.exports = Emailer;