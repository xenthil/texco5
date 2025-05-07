var app = require('./../app');
var mySqlConnection = require('./MySqlHelper');
var multiline = require('multiline');
var officerModel = require('./../Model/officer');
var errorDAL = require('./../DAL/errorDAL');

module.exports.createofficer = function (officer) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            con.query('INSERT INTO officer SET ?', officer).then(function (rows, fields) {
                resolve({
                    "officerid": rows.insertId
                })
            }).catch(function (err) {
                errorDAL.errorlog('Error',"officerDAL::createofficer",err.stack,JSON.stringify('query error'),"officerDAL");
			    reject(err);
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"officerDAL::createofficer",err.stack,JSON.stringify('mysql error'),"officerDAL");
			reject(err);
        });
    });
}


module.exports.getofficer = function (officerid) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            var query = multiline.stripIndent(function () {
                /*
                    SELECT * FROM `officer`

                    WHERE active = 1
                    AND case ? when 0 then 1 = 1 else officerid = ? end

                    ORDER BY sortorder
                */
            });
            
            con.query(query, [officerid, officerid]).then(function (rows, fields) {
                var result = [];
                for (var i = 0; i < rows.length; i++) {
                    var str = rows[i].designation;
                    var regex = new RegExp(',', 'g')
                    str = str.replace(regex, ' \n ');
                    var officer = new officerModel.officer(rows[i].officerid, rows[i].name, str, rows[i].email, rows[i].mobile, rows[i].phone, rows[i].address, rows[i].other, rows[i].changedby);
                    result.push(officer);
                    str = '';
                }
                resolve(result);

            }).catch(function (err) {
                errorDAL.errorlog('Error',"officerDAL::getofficer",err.stack,JSON.stringify('query error'),"officerDAL");
			    reject(err);
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"officerDAL::getofficer",err.stack,JSON.stringify('mysql error'),"officerDAL");
			reject(err);
        });
    });
}

module.exports.updateofficer = function (officer, officerid) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            con.query('UPDATE officer SET ? WHERE officerid= ?', [officer, officerid]).then(function (rows, fields) {
                resolve({
                    "officerid": officerid
                })
            }).catch(function (err) {
                errorDAL.errorlog('Error',"officerDAL::updateofficer",err.stack,JSON.stringify('query error'),"officerDAL");
			    reject(err);
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"officerDAL::updateofficer",err.stack,JSON.stringify('mysql error'),"officerDAL");
            reject(err);
        });
    });
}

module.exports.updateofficerstatus = function (officerid) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            con.query('UPDATE officer SET active = ? WHERE officerid= ?', [0, officerid]).then(function (rows, fields) {
                resolve({
                    "officerid": officerid
                })
            }).catch(function (err) {
                errorDAL.errorlog('Error',"officerDAL::updateofficerstatus",err.stack,JSON.stringify('query error'),"officerDAL");
			    reject(err);
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"officerDAL::updateofficerstatus",err.stack,JSON.stringify('mysql error'),"officerDAL");
			reject(err);
        });
    });
}

module.exports.getofficerdirectors = function () {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            var query = multiline.stripIndent(function () {
                /*
                    SELECT * FROM `officer`

                    WHERE active = 1 AND other = 1

                    ORDER BY sortorder
                */
            });
            
            con.query(query).then(function (rows, fields) {
                var result = [];
                for (var i = 0; i < rows.length; i++) {
                    var str = rows[i].designation;
                    var regex = new RegExp(',', 'g')
                    str = str.replace(regex, ' \n ');
                    var officer = new officerModel.officer(rows[i].officerid, rows[i].name, str, rows[i].email, rows[i].mobile, rows[i].phone, rows[i].address, 1, rows[i].changedby);
                    result.push(officer);
                    str = '';
                }
                resolve(result);

            }).catch(function (err) {
                errorDAL.errorlog('Error',"officerDAL::getofficedirectors",err.stack,JSON.stringify('query error'),"officerDAL");
                reject(err);
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"officerDAL::getofficedirectors",err.stack,JSON.stringify('mysql error'),"officerDAL");
			reject(err);
        });
    });
}

module.exports.getofficerothers = function () {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            var query = multiline.stripIndent(function () {
              /*
            SELECT * FROM `officer`

            WHERE active = 1 AND other = 0

            ORDER BY sortorder
            */
            });
            
            con.query(query).then(function (rows, fields) {
                var result = [];
                for (var i = 0; i < rows.length; i++) {
                    var str = rows[i].designation;
                    var officer = new officerModel.officer(rows[i].officerid, rows[i].name, str, rows[i].email, rows[i].mobile, rows[i].phone, rows[i].address, 1, rows[i].changedby);
                    result.push(officer);
                    str = '';
                }
                resolve(result);

            }).catch(function (err) {
                errorDAL.errorlog('Error',"officerDAL::getofficerothers",err.stack,JSON.stringify('query error'),"officerDAL");
			    reject(err);
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"officerDAL::getofficerothers",err.stack,JSON.stringify('query error'),"officerDAL");
			reject(err);
        });
    });
}