var app = require('./../app');
var mySqlConnection = require('./MySqlHelper');

module.exports.errorlog = function (Error_Type,Source,Error_Detail,Contextual_Data,Created_By) { 
     return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            con.query('call saveerrorlog(?,?,?,?,?)',[Error_Type,Source,Error_Detail,Contextual_Data,Created_By]).then(function (rows, fields) {
                resolve({
                    "message": "Success"
                })
            }).catch(function (err) {
                reject(err);
            });
        }).catch(function (err) {
            reject(err);
        });
    });
}
