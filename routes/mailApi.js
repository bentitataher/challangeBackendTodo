const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

router.post('/send-mail', (req, res) => {

    // email message options
    const mailOptions = {
        from: 'bentitataher@gmail.com',
        to: 'bentitataher@gmail.com',
        subject: 'test subject',
        text: 'test text',
    };
    // email transport configuration

    var transport = nodemailer.createTransport({
        service: "gmail",
        secure: false,
        auth: {
            user: "bentitataher@gmail.com",
            pass: "@Taher1988"
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    // send email
    transport.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.send('error')
            console.log(error);
        } else {
            console.log('Email sent: ' + info.reponse);
            res.json({message: "email send sucessfully"});
        }
    });
});

module.exports = router;