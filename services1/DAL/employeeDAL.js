var app = require('./../app');
var multiline = require('multiline');
var employeeModel = require('../Model/employee');
var mySqlConnection = require('./MySqlHelper');
var errorDAL = require('./../DAL/errorDAL');

module.exports.createemployee = function (employee) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            var query = {
                employeeno: employee.employeeno,
                firstname: employee.firstname,
                lastname: employee.lastname,
                regionid : employee.regionid,
                desigid : employee.desigid,
                email: employee.email,
                mobile: employee.mobile,
                phone: employee.phone,
                doj: employee.doj,
                address: employee.address,
                password : employee.password,
                roleid : employee.roleid,
                changedby: employee.changedby
            };
            con.query('INSERT INTO employee SET ?', query).then(function (rows, fields) {
                resolve({
                    "employeeid": rows.insertId
                })
            }).catch(function (err) {
                errorDAL.errorlog('Error',"employeeDAL::createemployee",err.stack,JSON.stringify(query),"employeeDAL");
			    reject(err);
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"employeeDAL::createemployee",err.stack,JSON.stringify('MYSQL Error'),"employeeDAL");
            reject(err);
        });
    });
}

module.exports.updateemployee = function (employee) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            if (employee.employeeid > 0) {
                var query = {
                    employeeno: employee.employeeno,
                    firstname: employee.firstname,
                    lastname: employee.lastname,
                    regionid : employee.regionid,
                    desigid : employee.desigid,
                    email: employee.email,
                    mobile: employee.mobile,
                    phone: employee.phone,
                    doj: employee.doj,
                    address: employee.address,
                    password: employee.password,
                    roleid : employee.roleid,
                    active : employee.active,
                    changedby: employee.changedby
                };
                con.query('UPDATE employee SET ?  WHERE employeeid= ?', [query, employee.employeeid]).then(function (rows, fields) {
                    resolve({
                        "employeeid": employee.employeeid
                    })
                }).catch(function (err) {
                    errorDAL.errorlog('Error',"employeeDAL::updateemployee",err.stack,JSON.stringify(query),"employeeDAL");
                    reject(err);
                });
            } else {
                errorDAL.errorlog('Error',"employeeDAL::updateemployee",err.stack,JSON.stringify(query),"employeeDAL");
			    reject("Unable to update employee")
            }
        }).catch(function (err) {
            errorDAL.errorlog('Error',"employeeDAL::updateemployee",err.stack,JSON.stringify('mysql error'),"employeeDAL");
            reject(err);
        });
    });
}

module.exports.authenticate = function (userid, passwordHash) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            var query = multiline.stripIndent(function () {
                /*
                    SELECT
                        emp.employeeid,
                        emp.employeeno,
                        emp.firstname,
                        emp.lastname,
                        emp.email,
                        emp.mobile,
                        emp.phone,
                        emp.doj,
                        emp.address,
                        emp.desigid,
                        emp.regionid,
                        emp.roleid,
                        role.description AS 'role',
                        lv1.description AS 'design',
                        lv2.description AS 'region'

                FROM employee emp

                 INNER JOIN role role ON
                       role.roleid = emp.roleid AND role.active = 1

                 INNER JOIN lookupvalue lv1 ON
                       lv1.lkvalid = emp.desigid AND lv1.active = 1

                 INNER JOIN lookupvalue lv2 ON
                       lv2.lkvalid = emp.regionid AND lv2.active = 1

                WHERE role.description != 'Manager' AND lv1.description != 'AM' AND (emp.mobile = ? OR emp.email = ? ) AND emp.password  = ?
                */
            });
            
            con.query(query, [userid, userid, passwordHash]).then(function (rows, fields) {
                if (rows.length > 0) {
                    var employeeInfo = new employeeModel.employee(rows[0].employeeid, rows[0].employeeno, rows[0].firstname, rows[0].lastname, rows[0].regionid, rows[0].region, rows[0].desigid, rows[0].design, rows[0].email, rows[0].mobile, rows[0].phone, rows[0].doj, rows[0].address, rows[0].roleid, rows[0].role);
                    resolve(employeeInfo);
                } else {
                    reject("error");
                }
            }).catch(function (err) {
                errorDAL.errorlog('Error',"employeeDAL::authenticate",err.stack,JSON.stringify(userid,password),"employeeDAL");
                reject(err);
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"employeeDAL::authenticate",err.stack,JSON.stringify('mysql error'),"employeeDAL");
            reject(err);
        });
    });
}

module.exports.validateemployee = function (email, mobile, employeeid, employeeno) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            con.query('SELECT employeeid FROM employee WHERE ( email = ? OR mobile = ? OR employeeno = ?) AND employeeid <> ? ', [email, mobile, employeeno, employeeid]).then(function (rows, fields) {
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
                errorDAL.errorlog('Error',"employeeDAL::validateemployee",err.stack,JSON.stringify(email,mobile,employeeid, employeeno),"employeeDAL");
                reject(err);
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"employeeDAL::validateemployee",err.stack,JSON.stringify('mysql error'),"employeeDAL");
            reject(err);
        });
    });
}

module.exports.validateemployeepassword = function (employeeid) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            con.query('SELECT password FROM employee WHERE  employeeid = ? ', [employeeid]).then(function (rows, fields) {
                if (rows.length > 0) {
                    resolve({
                        "oldpassword": rows[0].password
                    });
                } 
            }).catch(function (err) {
                errorDAL.errorlog('Error',"employeeDAL::validatemployeepassowrd",err.stack,JSON.stringify(employeeid),"employeeDAL");
                reject(err);
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"employeeDAL::validatemployeepassword",err.stack,JSON.stringify('mysql error'),"employeeDAL");
            reject(err);
        });
    });
}

module.exports.getwageout = function ( ) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            console.log('test');
            con.query('UPDATE wage_login_details SET login_status = 0;').then(function (rows, fields) {
                resolve("Success")
            }).catch(function (err) {
                errorDAL.errorlog('Error',"employeeDAL::getwageout",err.stack,JSON.stringify('update query error'),"employeeDAL");
                reject(err);
            }); 
        }).catch(function (err) {
            errorDAL.errorlog('Error',"employeeDAL::getwageout",err.stack,JSON.stringify('mysql error'),"employeeDAL");
            reject(err);
        });
    });
}

module.exports.updateemployeestatus = function ( employeeid) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            if (employeeid > 0) {
                con.query('UPDATE employee SET active= 0  WHERE employeeid= ?', [employeeid]).then(function (rows, fields) {
                    resolve({
                        "employeeid": employeeid
                    })
                }).catch(function (err) {
                    errorDAL.errorlog('Error',"employeeDAL::updateemployeeStatus",err.stack,JSON.stringify('mysql error'),"employeeDAL");
                    reject(err);
                });
            } else {
                errorDAL.errorlog('Error',"employeeDAL::updateemployeestatus",err.stack,JSON.stringify('mysql error'),"employeeDAL");
                reject("Unable to delete employee")
            }
        }).catch(function (err) {
            reject(err);
        });
    });
}

module.exports.getemployee = function (employeeid) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            var query = multiline.stripIndent(function () {
                /*
              SELECT
              	e.employeeid,
              	e.employeeno,
              	e.firstname,
              	e.lastname,
              	e.regionid,
                region.description region,
              	e.desigid,
                desig.description desig,
              	e.email,
              	e.mobile,
                e.phone,
                DATE_FORMAT(e.doj,'%d %b %Y') AS doj,
              	e.address,
              	e.roleid,
                role.description role,
                e.password,
              	e.active,
                e.changedby
              FROM employee e

              INNER JOIN lookupvalue region ON
                  region.lkvalid = e.regionid
              AND region.active = 1

              INNER JOIN lookupvalue desig ON
                  desig.lkvalid = e.desigid
              AND desig.active = 1

              INNER JOIN role role ON
                  role.roleid = e.roleid
              AND role.active = 1

              WHERE e.active = 1
              AND case ? when 0 then 1 = 1 else e.employeeid = ? end

              ORDER BY e.firstname;
            */
            });
            con.query(query, [employeeid, employeeid]).then(function (rows, fields) {
                var result = [];
                for (var i = 0; i < rows.length; i++) {
                  var employee = new employeeModel.employee(rows[i].employeeid, rows[i].employeeno, rows[i].firstname, rows[i].lastname,
                    rows[i].regionid, rows[i].region, rows[i].desigid, rows[i].desig, rows[i].email, rows[i].mobile, rows[i].phone, rows[i].doj,
                    rows[i].address, rows[i].roleid, rows[i].role, rows[i].password, rows[i].active, rows[i].changedby);
                  result.push(employee);
                }
                resolve(result);

            }).catch(function (err) {
                errorDAL.errorlog('Error',"employeeDAL::getemployee",err.stack,JSON.stringify(employeeid),"employeeDAL");
                reject(err);
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"employeeDAL::getemployee",err.stack,JSON.stringify('mysql error'),"employeeDAL");
            reject(err);
        });
    });
}

module.exports.getemployeeid = function (userid) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            con.query("SELECT employeeid, CONCAT(firstname, ' ', lastname) AS name, email, mobile FROM employee WHERE (email = ? OR mobile = ?) AND active = 1 LIMIT 1", [userid, userid]).then(function (rows, fields) {
                if (rows.length > 0) {
                    resolve({
                        "employeeid": rows[0].employeeid,
                        "name": rows[0].name,
                        "email": rows[0].email,
                        "mobile": rows[0].mobile
                    });
                } else {
                    reject("Invalid Email or mobile.");
                }
            }).catch(function (err) {
                errorDAL.errorlog('Error',"employeeDAL::getemployeeid",err.stack,JSON.stringify(userid),"employeeDAL");
                reject(err);
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"employeeDAL::getemployeeid",err.stack,JSON.stringify('mysql error'),"employeeDAL");
            reject(err);
        });
    });
}

module.exports.forgotpassword = function (employeeid, verificationcode, token, changedby) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            con.query("INSERT INTO resetpassword(employeeid, verificationcode, token, changedby) VALUES (?,?,?,?)", [employeeid, verificationcode, token, changedby]).then(function (rows, fields) {
                if (rows.insertId > 0) {
                    resolve({
                        "id": rows.insertId
                    });
                } else {
                    reject("error in resetpassword");
                }
            }).catch(function (err) {
                errorDAL.errorlog('Error',"employeeDAL::forgotpassword",err.stack,JSON.stringify(employeeid, verificationcode, token, changedby),"employeeDAL");
                reject(err);
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"employeeDAL::forgotpassword",err.stack,JSON.stringify('mysql error'),"employeeDAL");
            reject(err);
        });
    });
}

module.exports.getemployeeidbyresetpwd = function (token, verificationcode) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            con.query('SELECT employeeid FROM resetpassword WHERE token = ? AND verificationcode = ?  AND active = 1 LIMIT 1', [token, verificationcode]).then(function (rows, fields) {
                if (rows.length > 0) {
                    resolve({
                        "employeeid": rows[0].employeeid
                    });
                } else {
                    reject("verificationcode is expired or invalid")
                }
            }).catch(function (err) {
                errorDAL.errorlog('Error',"employeeDAL::getemployeeidbyresetpwd",err.stack,JSON.stringify(token, verificationcode),"employeeDAL");
                reject(err);
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"employeeDAL::getemployeeidbyresetpwd",err.stack,JSON.stringify('mysql error'),"employeeDAL");
            reject(err);
        });
    });
}

module.exports.changepassword = function (password, changedby, employeeid) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            if (employeeid > 0) {
                var query = {
                    password: password,
                    changedby: changedby
                };
                con.query('UPDATE employee SET ?  WHERE employeeid= ?', [query, employeeid]).then(function (rows, fields) {
                    resolve("success");
                }).catch(function (err) {
                    errorDAL.errorlog('Error',"employeeDAL::changepassword",err.stack,JSON.stringify(password, changedby, employeeid),"employeeDAL");
                    reject(err);
                });
            } else {
                errorDAL.errorlog('Error',"employeeDAL::changepassword",err.stack,JSON.stringify(password, changedby, employeeid),"employeeDAL");
                reject("Unable to update password")
            }
        }).catch(function (err) {
            errorDAL.errorlog('Error',"employeeDAL::changepassword",err.stack,JSON.stringify('mysql error'),"employeeDAL");
            reject(err);
        });
    });
}

module.exports.resetpassword = function (token) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            con.query('UPDATE resetpassword SET active = 0 WHERE token = ?', [token]).then(function (rows, fields) {
                resolve("success");
            }).catch(function (err) {
                errorDAL.errorlog('Error',"employeeDAL::resetpassword",err.stack,JSON.stringify(token),"employeeDAL");
                reject(err);    
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"employeeDAL::resetpassword",err.stack,JSON.stringify('mysql error'),"employeeDAL");
            reject(err);
        });
    });
}

module.exports.getmanagers = function () {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            var query = multiline.stripIndent(function () {
              /*
             SELECT
              	e.employeeid,
              	e.employeeno,
              	e.firstname,
              	e.lastname,
              	e.regionid,
                region.description region,
              	e.desigid,
                desig.description desig,
              	e.email,
              	e.mobile,
                e.phone,
              	e.address,
              	e.roleid,
                roles.description role

              FROM employee e

              INNER JOIN lookupvalue region ON
                  region.lkvalid = e.regionid
                  AND region.active = 1

              INNER JOIN lookupvalue desig ON
                  desig.lkvalid = e.desigid
                  AND desig.code ='AM'
                  AND desig.active = 1

              INNER JOIN role roles ON
                  roles.roleid = e.roleid
                    AND roles.active = 1

              WHERE e.active = 1;

            */
            });

            con.query(query).then(function (rows, fields) {
                var result = [];
                for (var i = 0; i < rows.length; i++) {
                    var director = new employeeModel.managers(rows[i].employeeid, rows[i].employeeno, rows[i].firstname, rows[i].lastname, rows[i].regionid, rows[i].region, rows[i].desigid, rows[i].desig, rows[i].email, rows[i].mobile, rows[i].phone, rows[i].address, rows[i].roleid, rows[i].role);
                    result.push(director);
                }
                resolve(result);

            }).catch(function (err) {
                errorDAL.errorlog('Error',"employeeDAL::getmanagers",err.stack,JSON.stringify(query),"employeeDAL");
                reject(err);
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"employeeDAL::getmanagers",err.stack,JSON.stringify('mysql error'),"employeeDAL");
            reject(err);
        });
    });
}

module.exports.getvalidpassword = function (employeeid) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            con.query("SELECT password FROM employee WHERE employeeid=? AND active = 1 LIMIT 1", [employeeid]).then(function (rows, fields) {
                if (rows.length > 0) {
                    resolve({
                        "passwordhash": rows[0].password
                    });
                } else {
                    reject("Invalid employeeid, Please Check employeeid");
                }
            }).catch(function (err) {
                errorDAL.errorlog('Error',"employeeDAL::getvalidpassword",err.stack,JSON.stringify(employeeid),"employeeDAL");
                reject(err);
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"employeeDAL::getvalidpassword",err.stack,JSON.stringify('mysql error'),"employeeDAL");
            reject(err);
        });
    });
}

module.exports.authenticateam = function (userid, passwordHash) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            var query = multiline.stripIndent(function () {
                /*
                 SELECT
                        emp.employeeid,
                        emp.employeeno,
                        emp.firstname,
                        emp.lastname,
                        emp.email,
                        emp.mobile,
                        emp.phone,
                        emp.doj,
                        emp.address,
                        emp.desigid,
                        emp.regionid,
                        emp.roleid,
                        role.description AS 'role',
                        lv1.description AS 'design',
                        lv2.description AS 'region'

                FROM employee emp

                 INNER JOIN role role ON
                       role.roleid = emp.roleid AND role.active = 1

                 INNER JOIN lookupvalue lv1 ON
                       lv1.lkvalid = emp.desigid AND lv1.active = 1

                 INNER JOIN lookupvalue lv2 ON
                       lv2.lkvalid = emp.regionid AND lv2.active = 1

                WHERE role.description = 'Manager' AND lv1.description = 'AM' AND (emp.mobile = ? OR emp.email = ? ) AND emp.password  = ?
                */
            });
            
            con.query(query, [userid, userid, passwordHash]).then(function (rows, fields) {
                if (rows.length > 0) {
                    var employeeInfo = new employeeModel.employee(rows[0].employeeid, rows[0].employeeno, rows[0].firstname, rows[0].lastname, rows[0].regionid, rows[0].region, rows[0].desigid, rows[0].design, rows[0].email, rows[0].mobile, rows[0].phone, rows[0].doj, rows[0].address, rows[0].roleid, rows[0].role);
                    resolve(employeeInfo);
                } else {
                    reject("error");
                }
            }).catch(function (err) {
                errorDAL.errorlog('Error',"employeeDAL::authenticateam",err.stack,JSON.stringify(query),"employeeDAL");
                reject(err);
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"employeeDAL::authenticateam",err.stack,JSON.stringify('mysql error'),"employeeDAL");
            reject(err);
        });
    });
}

module.exports.addsessionvalue = function (tokenvalue) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            con.query('INSERT INTO session_token (session_token) VALUES (?);', [tokenvalue]).then(function (rows, fields) {
                resolve('success');
            }).catch(function (err) {
                errorDAL.errorlog('Error',"employeeDAL::addsessionvalue",err.stack,JSON.stringify(err),"employeeDAL");
                reject(err);
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"employeeDAL::addsessionvalue",err.stack,JSON.stringify('mysql error'),"employeeDAL");
            reject(err);
        });
    });
}

module.exports.removesessionvalue = function (tokenvalue) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            con.query('UPDATE session_token SET session_status = 0 WHERE session_token = ?;', [tokenvalue]).then(function (rows, fields) {
                resolve('success');
            }).catch(function (err) {
                errorDAL.errorlog('Error',"employeeDAL::removesessionvalue",err.stack,JSON.stringify(err),"employeeDAL");
                reject(err);
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"employeeDAL::removesessionvalue",err.stack,JSON.stringify('mysql error'),"employeeDAL");
            reject(err);
        });
    });
}

module.exports.logout = function (memberid) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            var currentdate = new Date();
            con.query("UPDATE member SET loginstatus = 0 WHERE memberid = ?;UPDATE login_member SET logout_time = ?,changedby='user' WHERE memberid = ? AND logout_time='0000-00-00 00:00:00';", [memberid,currentdate,memberid]).then(function (rows, fields) {
                resolve('success');
            }).catch(function (err) {
                errorDAL.errorlog('Error',"employeeDAL::removesessionvalue",err.stack,JSON.stringify(err),"employeeDAL");
                reject(err);
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"employeeDAL::removesessionvalue",err.stack,JSON.stringify('mysql error'),"employeeDAL");
            reject(err);
        });
    });
}

module.exports.logoutmember = function (texserno,memberid) {

    console.log(texserno);
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
          
            var currentdate = new Date();
         
            con.query("UPDATE member SET loginstatus = 0 WHERE memberid = ?;UPDATE login_member SET logout_time = ? ,changedby='admin' WHERE memberid = ? AND logout_time='0000-00-00 00:00:00';", [memberid,currentdate,memberid]).then(function (rows, fields) {
                resolve('success');
            }).catch(function (err) {
                // errorDAL.errorlog('Error',"employeeDAL::removesessionvalue",err.stack,JSON.stringify(query),"employeeDAL");
                reject(err);
            });
        }).catch(function (err) {
            // errorDAL.errorlog('Error',"employeeDAL::removesessionvalue",err.stack,JSON.stringify('mysql error'),"employeeDAL");
            reject(err);
        });
    });
}

module.exports.logoutallmembers = function (texserno) {

    //console.log(texserno);
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            //console.log(memberid);
           var currentdate = new Date();
           console.log(currentdate);
            con.query("UPDATE member SET loginstatus = 0 WHERE loginstatus = 1;UPDATE login_member SET logout_time = ? ,changedby='schedular' WHERE logout_time='0000-00-00 00:00:00';", [currentdate]).then(function (rows, fields) {
                resolve('success');
            }).catch(function (err) {
                errorDAL.errorlog('Error',"employeeDAL::removesessionvalue",err.stack,JSON.stringify(err),"employeeDAL");
                reject(err);
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"employeeDAL::removesessionvalue",err.stack,JSON.stringify('mysql error'),"employeeDAL");
            reject(err);
        });
    });
}