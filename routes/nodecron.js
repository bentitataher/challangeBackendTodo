const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
const cron = require('node-cron');

router.post('/send-mail', (req, res) => {

    // email message options
    const mailOptions = {
        from: 'bentitataher@gmail.com',
        to: 'bentitataher@gmail.com',
        subject: 'Sent from node cron API',
        text: 'node cron ok',
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

        cron.schedule('*/2 * * * * *', ()=>{

            transport.sendMail(mailOptions, (error, info) => {
                if (error) {
                    res.send('error')
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.reponse);
                    res.json({message: "email send sucessfully"});
                }
            });
        }); /* end cron */    

});

module.exports = router;