var app = require('./../app');
var multiline = require('multiline');
var settingModel = require('./../Model/setting');
var mySqlConnection = require('./MySqlHelper');
var errorDAL = require('./../DAL/errorDAL');



module.exports.getAuthorizationToken = function (atoken) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            con.query("SELECT * FROM session_token  WHERE session_status = 1 AND session_token = ?;", [atoken]).then(function (rows, fields) {
                var reslength = rows.length;
				if (reslength) {
					resolve(1);
				} else {
					resolve(0);
				}
            }).catch(function (err) {
                errorDAL.errorlog('Error',"settingDAL:getAuthorizationToken",err.stack,JSON.stringify(atoken),"settingDAL");
			    reject(err);
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"settingDAL:getAuthorizationToken",err.stack,JSON.stringify('mysql Error'),"settingDAL");
			reject(err);
        });
    });
}

module.exports.createsetting = function (setting) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            con.query('INSERT INTO setting SET ?', setting).then(function (rows, fields) {
                resolve({
                    "settingid": rows.insertId
                })
            }).catch(function (err) {
                errorDAL.errorlog('Error',"settingDAL::createsetting",err.stack,JSON.stringify(setting),"settingDAL");
			    reject(err);
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"settingDAL::createsetting",err.stack,JSON.stringify('query error'),"settingDAL");
			reject(err);
        });
    });
}

module.exports.updatesetting = function (setting, settingid) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            con.query('UPDATE setting SET ? WHERE settingid= ?', [setting, settingid]).then(function (rows, fields) {
                resolve({
                    "settingid": settingid
                })
            }).catch(function (err) {
                errorDAL.errorlog('Error',"settingDAL::updatesetting",err.stack,JSON.stringify(setting),"settingDAL");
			    reject(err);
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"settingDAL::updatesetting",err.stack,JSON.stringify('setting'),"settingDAL");
            reject(err);
        });
    });
}

module.exports.updatesettingstatus = function (settingid) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            con.query('UPDATE setting SET active=? WHERE settingid= ?', [0, settingid]).then(function (rows, fields) {
                resolve({
                    "settingid": settingid
                })
            }).catch(function (err) {
                errorDAL.errorlog('Error',"settingDAL::updatesettingstatus",err.stack,JSON.stringify(settingid),"settingDAL");
			    reject(err);
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"settingDAL::updatesettingstatus",err.stack,'Query Error',"settingDAL");
            reject(err);
        });
    });
}

module.exports.getsetting = function (settingid) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            var query = multiline.stripIndent(function () {
              /*
              SELECT
            	s.settingid,
                s.code,
                s.description,
                s.value,
                s.active

            FROM
            setting s

            WHERE s.active = 1
            AND case ? when 0 then 1 = 1 else s.settingid = ? end

            ORDER BY s.settingid
            */
            });            
            con.query(query, [settingid, settingid]).then(function (rows, fields) {
                var result = [];
                for (var i = 0; i < rows.length; i++) {
                    var setting = new settingModel.getsetting(rows[i].settingid, rows[i].code, rows[i].description, rows[i].value, rows[i].active);
                    result.push(setting);
                }
                resolve(result);
            }).catch(function (err) {
                errorDAL.errorlog('Error',"settingDAL:getsetting",err.stack,JSON.stringify(settingid),"settingDAL");
			    reject(err);
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"settingDAL::getsetting",err.stack,JSON.stringify('mysql error'),"settingDAL");
            reject(err);
        });
    });
}

module.exports.getsettingbycode = function (code) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            con.query("SELECT value FROM setting  WHERE active = 1 AND code = ?;", [code]).then(function (rows, fields) {
                resolve({ "texcono": rows[0].value });
            }).catch(function (err) {
                errorDAL.errorlog('Error',"settingDAL:getsettingbycode",err.stack,JSON.stringify(code),"settingDAL");
			    reject(err);
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"settingDAL:getsettingbycode",err.stack,JSON.stringify('mysql Error'),"settingDAL");
			reject(err);
        });
    });
}

module.exports.updatesettingvaluebycode = function (texcono, code) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            con.query('UPDATE setting SET value = ? WHERE code= ?', [texcono, code]).then(function (rows, fields) {
                resolve("success")
            }).catch(function (err) {
                errorDAL.errorlog('Error',"settingDAL:updatesettingvaluebycode",err.stack,JSON.stringify(texcono),"settingDAL");
			    reject(err);
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"settingDAL:updatesettingvaluebycode",err.stack,JSON.stringify('mysql Error'),"settingDAL");
			reject(err);
        });
    });
}

module.exports.getsettingvalue = function (code) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            con.query("SELECT value FROM setting  WHERE active = 1 AND code = ?;", [code]).then(function (rows, fields) {
                resolve({ "value": rows[0].value });
            }).catch(function (err) {
                errorDAL.errorlog('Error',"settingDAL:getsettingvalue",err.stack,JSON.stringify('select query error'),"settingDAL");
			    reject(err);
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"settingDAL:getsettingvalue",err.stack,JSON.stringify('mysql Error'),"settingDAL");
			reject(err);
        });
    });
}

module.exports.getProjectDetails = function (code) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            con.query("SELECT * FROM project WHERE active = 1;").then(function (rows, fields) {
                resolve(rows);
            }).catch(function (err) {
                errorDAL.errorlog('Error',"settingDAL:getProjectDetails",err.stack,JSON.stringify('select query Error'),"settingDAL");
			    reject(err);
           });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"settingDAL:getProjectDetails",err.stack,JSON.stringify('mysql Error'),"settingDAL");
			reject(err);
        });
    });
}