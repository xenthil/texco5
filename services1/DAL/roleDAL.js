var app = require('./../app');
var multiline = require('multiline');
var roleModel = require('./../Model/role');
var mySqlConnection = require('./MySqlHelper');
var errorDAL = require('./../DAL/errorDAL');


module.exports.getroles = function () {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            var query = multiline.stripIndent(function () {
                /*
                SELECT
                      r.roleid,
                      r.name AS 'role',
                      r.description,
                      rp.rolepermissionid,
                      rp.code,
                      rp.name,
                      rp.selected

                FROM role r

                INNER JOIN rolepermission rp ON
	                rp.roleid = r.roleid
                    AND rp.active = 1

                WHERE r.active = 1
                ORDER BY r.roleid,
                      rp.sortorder;
               */
            });
            con.query(query).then(function (rows, fields) {
                var rowsReturned = rows.length;
                var result = [];
                var rolepermissions = [];
                var role;
                if (rowsReturned > 0) {
                    for (var i = 0; i < rowsReturned; i++) {
                        var rolepermission = new roleModel.permissions(rows[i].rolepermissionid, rows[i].code, rows[i].name, rows[i].selected);
                        rolepermissions.push(rolepermission);
                        
                        if ((i + 1 == rowsReturned) || (rows[i].roleid != rows[i + 1].roleid)) {
                            role = new roleModel.roles(rows[i].roleid, rows[i].role, rows[i].description, rolepermissions);
                            result.push(role);
                            rolepermissions = [];
                        }
                    }
                }
                resolve(result);
            }).catch(function (err) {
                errorDAL.errorlog('Error',"roleDAL::createsetting",err.stack,JSON.stringify(query),"roleDAL");
			    reject(err);
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"roleDAL::createsetting",err.stack,JSON.stringify('mysql error'),"roleDAL");
			reject(err);
        });
    });
}

module.exports.getrolesbyroleid = function (roleid) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            var query = multiline.stripIndent(function () {
                /*
                    SELECT
                        r.roleid,
                        r.name AS 'role',
                        r.description,
                        rp.rolepermissionid,
                        rp.code,
                        rp.name,
                        rp.selected
                    FROM role r
                    INNER JOIN rolepermission rp ON
                        rp.roleid = r.roleid
                        AND rp.active = 1
                    WHERE r.active = 1 AND r.roleid = ?
                    ORDER BY r.roleid,rp.sortorder;
               */
            });
            con.query(query, [roleid]).then(function (rows, fields) {
                var rowsReturned = rows.length;
                var result = [];
                var role;
                var permissions = {};
                if (rowsReturned > 0) {
                    for (var i = 0; i < rowsReturned; i++) {
                        permissions[rows[i].code] = rows[i].selected;
                        if ((i + 1 == rowsReturned) || (rows[i].roleid != rows[i + 1].roleid)) {
                            role = new roleModel.roles(rows[i].roleid, rows[i].role, rows[i].description, permissions);
                            permissions = [];
                        }
                    }
                }
                resolve(role);
            }).catch(function (err) {
                errorDAL.errorlog('Error',"roleDAL::getrolesbyroleid",err.stack,JSON.stringify(roleid,query),"roleDAL");
                reject(err);
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"roleDAL::getrolesbyroleid",err.stack,JSON.stringify('Mysql Error'),"roleDAL");
            reject(err);
        });
    });
}


module.exports.updateroles = function (rolepermissionid, selected) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            con.query('UPDATE `rolepermission` SET `selected`= ? WHERE `rolepermissionid`=?', [selected, rolepermissionid]).then(function (rows, fields) {
                resolve({
                    "rolepermissionid": rolepermissionid
                })
            }).catch(function (err) {
                errorDAL.errorlog('Error',"roleDAL::updateroles",err.stack,JSON.stringify(rolepermissionid,selected),"roleDAL");
                reject(err);
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"roleDAL::updateroles",err.stack,JSON.stringify('mysql error'),"roleDAL");
            reject(err);
        });
    });
}


module.exports.getrolepermission = function (roleid, code) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            con.query('SELECT rolepermissionid, selected FROM rolepermission WHERE active = 1 AND roleid = ? AND code = ?;', [roleid, code]).then(function (rows, fields) {
                var selected = false;
                if (rows.length > 0) {
                    if (rows[0].selected == 1) {
                        selected = true
                    } 
                    resolve({
                        "rolepermissionid": rows[0].rolepermissionid,
                        "selected": selected
                    })
                }
                else {
                    resolve({
                        "rolepermissionid": 0,
                        "selected": selected
                    })
                }
            }).catch(function (err) {
                errorDAL.errorlog('Error',"roleDAL::getrolepermission",err.stack,JSON.stringify(roleid,code),"roleDAL");
                reject(err);
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"roleDAL::getrolepermission",err.stack,JSON.stringify('mysql error'),"roleDAL");
            reject(err);
        });
    });
}
