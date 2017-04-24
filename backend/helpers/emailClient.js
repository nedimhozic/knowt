var nodemailer = require('nodemailer');
var config = require('../config');

function sendEmail(email, subject, body, callback) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: config.email.username,
            pass: config.email.password
        }
    });

    var mailOptions = {
        from: '"Knowt " <noreply@knowt.work>',
        to: email,
        subject: subject,
        html: body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (callback) {
            callback(error, info);
        }
    });
}

module.exports.forgotPassword = function (email, lastName, firstName, token, callback) {
    let subject = "Forgot Password";
    let body = 'Hi ' + lastName + ' ' + firstName + ',<br/><br/>Someone, probably you, requested the Knowt password change.' +
        ' To do it follow this link:<br/> http://localhost:4200/newPassword?token=' + token + '. <br/>This link will be active during 1 hour.';
    sendEmail(email, subject, body, callback);
}

module.exports.verifyAccount = function (email, lastName, firstName, token, callback) {
    let subject = 'Verify Account';
    let body = 'Hi ' + lastName + ' ' + firstName + ',<br/><br/>Thank you for using Knowt! Once you verified your email address' +
        ' you can use your account on our platform.<br/>Click here to login: http://localhost:4200/login?token=' + token;
    sendEmail(email, subject, body, callback);
}