var app = require('./../app');
var request = require('request');
var nconf = require('./../Utils/EnvironmentUtil');
var smsBal = require('./../BAL/smsBAL');
var nconf = require('./../Utils/EnvironmentUtil')

module.exports.sendsms = function (mobileno, message) {
    return new app.promise(function (resolve, reject) {
        var URL = nconf.get('SMS_URL');
        var uname = "username=" + nconf.get('SMS_USER');
        var pass = "&password=" + nconf.get('SMS_PASSWORD');
        var send = "&sender_id=" + nconf.get('SMS_SENDERID');
        var route = "&route=T"
        var mobile = "&phonenumber=" + mobileno;
        var adminmobile = "&phonenumber=" + nconf.get('SMS_ADMIN');
        var msg = "&message=" + message
        
        var smsURL = URL + uname + pass + send + route + mobile + msg;
        var adminsmsURL = URL + uname + pass + send + route + adminmobile + msg;
        request.post({
            url: smsURL
        }, function (error, response) {
            request.post({
                url: adminsmsURL
            }, function (error, response) {
                resolve("success");
            });
        });
    });
}
