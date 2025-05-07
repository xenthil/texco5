var app = require('./../app');
var mySqlConnection = require('./MySqlHelper');
var multiline = require('multiline');
var directorModel = require('./../Model/director');
var errorDAL = require('./../DAL/errorDAL'); 

module.exports.createdirector = function (director) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            con.query('INSERT INTO director SET ?', director).then(function (rows, fields) {
                resolve({
                    "directorid": rows.insertId
                })
            }).catch(function (err) {
                errorDAL.errorlog('Error',"directorDAL::createdirector",err.stack,JSON.stringify('mysql error'),"directorDAL");
			    reject(err);
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"directorDAL::createdirector",err.stack,JSON.stringify('mysql error'),"directorDAL");
			reject(err);
        });
    });
}


module.exports.getdirector = function (directorid) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            var query = multiline.stripIndent(function () {
              /*
              SELECT
            	a.directorid,
                a.name,
                IFNULL(a.designation, '') AS designation,
                a.dtitleid,
                a.email,
                a.phone,
                a.mobile,
                a.address,
                a.changedby,
                lv.description AS dtitle

            FROM
            director a

            LEFT JOIN lookupvalue lv ON
            	lv.lkvalid = a.dtitleid
                AND lv.active = 1

            WHERE a.active = 1
            AND case ? when 0 then 1 = 1 else a.directorid = ? end

            ORDER BY a.sortorder
            */
            });

            con.query(query, [ directorid, directorid]).then(function (rows, fields) {
                var result = [];
                for (var i = 0; i < rows.length; i++) {
                    var str = rows[i].designation;
                    var regex = new RegExp(',', 'g')
                    str = str.replace(regex, ' \n ');
                    var director = new directorModel.director(rows[i].directorid, rows[i].name, str, rows[i].dtitleid, rows[i].email, rows[i].mobile, rows[i].phone, rows[i].address, 1, rows[i].changedby, rows[i].dtitle);
                    result.push(director);
                    str = '';
                }
                resolve(result);

            }).catch(function (err) {
                reject(err);
            });
        }).catch(function (err) {
            reject(err);
        });
    });
}

module.exports.updatedirector = function (director, directorid) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            con.query('UPDATE director SET ? WHERE directorid= ?', [director, directorid]).then(function (rows, fields) {
                resolve({
                    "directorid": directorid
                })
            }).catch(function (err) {
                reject(err);
            });
        }).catch(function (err) {
            reject(err);
        });
    });
}

module.exports.updatedirectorstatus = function (directorid) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            con.query('UPDATE director SET active = ? WHERE directorid= ?', [0, directorid]).then(function (rows, fields) {
                resolve({
                    "directorid": directorid
                })
            }).catch(function (err) {
                reject(err);
            });
        }).catch(function (err) {
            reject(err);
        });
    });
}

module.exports.validatedirector = function (email, mobile, directorid) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            con.query('SELECT directorid FROM director WHERE ( email = ? OR mobile = ? ) AND directorid<>? ', [email, mobile, directorid]).then(function (rows, fields) {
                if (rows.length > 0) {
                    var response = 1;
                    resolve({
                        "response": response
                    });
                } else {
                    var response = 2;
                    resolve({
                        "response": response
                    });
                }
            }).catch(function (err) {
                reject(err);
            });
        }).catch(function (err) {
            reject(err);
        });
    });
}
