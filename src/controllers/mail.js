const nodemailer = require('nodemailer');
const createError = require('http-errors');
const dotenv = require('dotenv').config();


function sendMail(title, message, url){
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
        }
    });
    var mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: title,
        html: `
            <h2>${message}</h2>
            <p>${url.href}</p>`
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            return error;
        } else {
            return info;
        }
    }); 
};

module.export = sendMail;