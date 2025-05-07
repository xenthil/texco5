var app = require('./../app');
var nodemailer = require('nodemailer');
var smtpTransport = require("nodemailer-smtp-transport")
var nconf = require('./../Utils/EnvironmentUtil');
var fs = require('fs');

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport(smtpTransport({
    host: nconf.get('EMAIL_HOST'),
    port: nconf.get('EMAIL_PORT'),
    secureConnection: nconf.get('EMAIL_SEC_CONNECTION'),
    auth: {
        user: nconf.get('EMAIL_USER'),
        pass: nconf.get('EMAIL_PASSWORD')
    }
})); 

module.exports.sendEmail = function(email) {
    return new app.promise(function(resolve, reject) {
        transporter.sendMail(email, function(error, info) {
            if (error) {
                reject(error);
            } else {
                resolve(info);
            }
        });
    });
}
module.exports.sendEmailAttachment = function(emails) {
    console.log('emails.to',emails.text);
    var filepath = emails.attachments[0].path + emails.attachments[0].filename;
    var filename = emails.attachments[0].filename;
    return new app.promise(function(resolve, reject) {
        fs.readFile(filepath, function (err, data) {
            var email = {
                sender: nconf.get('ADMIN_EMAIL'),
                to: emails.to,
                subject: emails.subject,
                text: emails.text,
                attachments: [{'filename': filename, 'content': data}]
            };
            transporter.sendMail(email, function(error, info) {
                if (error) {
                    reject(error);
                } else {
                    resolve(info);
                }
            });
        });
    });
}
