var app = require('./../app');
var uuid = require('node-uuid');
var emailModel = require('../Model/email');
var emailBal = require('../BAL/emailBAL');
var employeeDal = require('../DAL/employeeDAL');
var memberDal = require('../DAL/memberDAL');
var utils = require('./../Utils/Utils');
var cryptoUtil = require('./../Utils/cryptoutil');

module.exports.createemployee = function (employee) {
    return new app.promise(function (resolve, reject) {
        validateSignup(employee).then(function (response) {
            employee.password = cryptoUtil.hashSha256(employee.password);
            employee.doj = new Date(employee.doj);
            employeeDal.createemployee(employee).then(function (result) {
                resolve(result)
            }).catch(function (err) {
                reject(err);
            });
        }).catch(function (err) {
            reject(err);
        });
    });
};


module.exports.getwageout = function () {
    return new app.promise(function (resolve, reject) {
       // console.log('test');
        employeeDal.getwageout().then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.updateemployee = function (employee) {
    return new app.promise(function (resolve, reject) {
        employeeDal.validateemployee(employee.email, employee.mobile, employee.employeeid, employee.employeeno).then(function (result) {
            if (result.response == 1) {
                reject("mobile number or email or employeeno already exists");
            } else {
                employee.doj = new Date(employee.doj);
                employeeDal.validateemployeepassword(employee.employeeid).then(function (result) {
                    if (result.oldpassword == employee.password) {
                        employee.password = result.oldpassword;
                    }
                    else {
                        employee.password = cryptoUtil.hashSha256(employee.password);
                    }
                    employeeDal.updateemployee(employee).then(function (result) {
                        resolve(result);
                    }).catch(function (err) {
                        reject(err);
                    });
                }).catch(function (err) {
                    reject(err);
                });
            }
        }).catch(function (err) {
            reject("Error updating employee information");
        });
    });
};

module.exports.authenticate = function (userId, password) {
    return new app.promise(function (resolve, reject) {
        validateAuthenticate(userId, password).then(function (response) {
            var passwordhash = cryptoUtil.hashSha256(password);
            employeeDal.authenticate(userId, passwordhash).then(function (result) {
                if (result)
                    resolve(result);
                else {
                    reject("Error in authenticationBal");
                }
            }).catch(function (err) {
                reject(err);
            });
        }).catch(function (error) {
            reject(error);
        });
    })
};

function validateAuthenticate(userId, password) {
    return new app.promise(function (resolve, reject) {
        if (userId == null || userId == "") {
            //console.log("User Id cannot be empty");
            reject("Username cannot be empty");
        } else if (password == null || password == "") {
            // console.log("Password cannot be empty");
            reject("Password cannot be empty");
        } else {
            resolve("Success");
        }
    })
};

function validateSignup(employee) {
    return new app.promise(function (resolve, reject) {
        var validationResponse = "";
        if (employee.email == null || employee.email == "") {
            validationResponse = "Email cannot be empty";
            reject("Email cannot be empty");
        }
        else if (employee.mobile == null || employee.mobile == "") {
            validationResponse = "Mobile number cannot be empty";
            reject("Mobile number cannot be empty");

        } else if (employee.password == null || employee.password == "") {
            validationResponse = "Password cannot be empty";
            reject("Password cannot be empty");
        }
        else if (employee.employeeno == null || employee.employeeno == "") {
            validationResponse = "employeeno cannot be empty";
            reject("Employeeno cannot be empty");
        }
        //Validate IN DB
        if (validationResponse == null || validationResponse == "") {
            employeeDal.validateemployee(employee.email, employee.mobile, 0, employee.employeeno).then(function (result) {
                if (result.response == 1) {
                    reject("mobile number or email or employee no already exists");
                } else {
                    resolve(result);
                }
            }).catch(function (err) {
                reject("Error validating employee information");
            });
        }
    })
};

module.exports.updateemployeestatus = function (employeeid) {
    return new app.promise(function (resolve, reject) {
        employeeDal.updateemployeestatus(employeeid).then(function (result) {
            resolve(result);
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.getemployee = function (employeeid) {
    return new app.promise(function (resolve, reject) {
        employeeDal.getemployee(employeeid).then(function (result) {
            resolve(result);
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.forgotpassword = function (userid, changedby) {
    return new app.promise(function (resolve, reject) {
        employeeDal.getemployeeid(userid).then(function (output) {
            if (output) {
                var employeeid = output.employeeid;
                var email = output.email;
                var name = output.name;
                var token = uuid.v1();
                var verificationcode = utils.GenerateVerifCode();
                employeeDal.forgotpassword(employeeid, verificationcode, token, changedby).then(function (result) {
                    if (result.id > 0) {
                        var sendemail = new emailModel.email(output.email, "", "Reset password texco", "Hi " + output.name + ", Please find reset password verification Code: " + verificationcode, "");
                        emailBal.sendEmail(sendemail).then(function (result) {
                            resolve({
                                "token": token,
                                "email": email,
                                "name": name
                            });
                        }).catch(function (err) {
                            reject("Error resetpassword email");
                        });

                    } else {
                        reject("Error resetpassword employeeid");
                    }
                }).catch(function (err) {
                    reject(err);
                });
            } else {
                reject("Error resetpassword employeeid");
            }
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.resetpassword = function (token, verificationcode, password, changedby) {
    return new app.promise(function (resolve, reject) {
        employeeDal.getemployeeidbyresetpwd(token, verificationcode).then(function (result) {
            if (result) {
                password = cryptoUtil.hashSha256(password);
                employeeDal.changepassword(password, changedby, result.employeeid).then(function (result) {
                    if (result) {
                        employeeDal.resetpassword(token).then(function (result) {
                            resolve(result);
                        }).catch(function (err) {
                            reject(err);
                        });
                    } else {
                        reject("verification code is expired");
                    }
                }).catch(function (err) {
                    reject(err);
                });
            } else {
                reject("Error Updating employee");
            }
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.getmanagers = function () {
    return new app.promise(function (resolve, reject) {
        employeeDal.getmanagers().then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.changepassword = function (password, newpassword, changedby, employeeid) {
    return new app.promise(function (resolve, reject) {
        password = cryptoUtil.hashSha256(password);
        employeeDal.getvalidpassword(employeeid).then(function (result) {
            if (password == result.passwordhash) {
                newpassword = cryptoUtil.hashSha256(newpassword);
                employeeDal.changepassword(newpassword, changedby, employeeid).then(function (result) {
                    if (result)
                        resolve(result);
                    else {
                        reject("Error  in change password");
                    }
                }).catch(function (err) {
                    reject(err);
                });
            } else {
                reject("Invalid Password");
            }
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.authenticateam = function (userId, password) {
    return new app.promise(function (resolve, reject) {
        validateAuthenticate(userId, password).then(function (response) {
            var passwordhash = cryptoUtil.hashSha256(password);
            employeeDal.authenticateam(userId, passwordhash).then(function (result) {
                if (result)
                    resolve(result);
                else {
                    reject("Error in authenticationBal");
                }
            }).catch(function (err) {
                reject(err);
            });
        }).catch(function (error) {
            reject(error);
        });
    })
};

module.exports.addsessionvalue = function (tokenvalue) {
    return new app.promise(function (resolve, reject) {
        employeeDal.addsessionvalue(tokenvalue).then(function (result) {
            if (result)
                resolve(result);
            else {
                reject("Error in adding session");
            }
        }).catch(function (err) {
            reject(err);
        });
    })
};

module.exports.removesessionvalue = function (tokenvalue) {
    return new app.promise(function (resolve, reject) {
        employeeDal.removesessionvalue(tokenvalue).then(function (result) {
            if (result)
                resolve(result);
            else {
                reject("Error in adding session");
            }
        }).catch(function (err) {
            reject(err);
        });
    })
};

module.exports.logout = function (memberid) {
    return new app.promise(function (resolve, reject) {
        employeeDal.logout(memberid).then(function (result) {
            if (result)
                resolve(result);
            else {
                reject("Error in adding session");
            }
        }).catch(function (err) {
            reject(err);
        });
    })
};

module.exports.logoutmember = function (texserno) {
    console.log(texserno)
    return new app.promise(function (resolve, reject) {
        memberDal.validatememberinfo(texserno).then(function (result) { 
			console.log(result);
			if(result[0].memberlength > 0) {
				employeeDal.logoutmember(texserno,result[0].memberid).then(function (result) {
					console.log('result', result);
					resolve(result);
				}).catch(function (err) {
					reject(err);
				});  
			}  else {
				reject("Please Enter Valid Service No or Texco No");
			}
		}).catch(function (err) {
			reject(err);
		});
    })
};

module.exports.logoutallmembers = function () {
   // console.log(texserno)
    return new app.promise(function (resolve, reject) {
        employeeDal.logoutallmembers().then(function (result) {
            if (result)
                resolve(result);
            else {
                reject("Error in adding session");
            }
        }).catch(function (err) {
            reject(err);
        });
    })
};