var app = require('./../app');
var uuid = require('node-uuid');
var emailModel = require('../Model/email');
var emailBal = require('../BAL/emailBAL');
var clientDal = require('../DAL/clientDAL');
var employeeDal = require('../DAL/employeeDAL');
var utils = require('./../Utils/Utils');
var cryptoUtil = require('./../Utils/cryptoutil');
var nconf = require('./../Utils/EnvironmentUtil');
var lookupvalueDal = require('../DAL/lookupvalueDAL');
var clientModel = require('./../Model/client');
var agreementModel = require('./../Model/agreement');
var _ = require('underscore');
var moment = require('moment');
const http = require('http');


module.exports.createclient = function (client) {
    return new app.promise(function (resolve, reject) {
        //validateSignup(client).then(function (response) {
        client.password = cryptoUtil.hashSha256(client.password);
        clientDal.createclient(client).then(function (result) {
            lookupvalueDal.lookupvalueid('APROVE', 'CONFIRM').then(function (result1) {
                if (result1.lkvalid == client.approvalid) {
                    adminapproval(result.clientid).then(function (result2) {
                        resolve(result2)
                    }).catch(function (err) {
                        reject(err);
                    });
                }
                else {
                    resolve(result)
                }
            }).catch(function (err) {
                reject(err);
            });
        }).catch(function (err) {
            reject(err);
        });
        //}).catch(function (err) {
        //    reject(err);
        //});
    });

};

module.exports.updateclient = function (client, roleid, clientid) {

    return new app.promise(function (resolve, reject) {
        if (roleid == 2) {
            clientDal.CheckClient(client, clientid).then(function (result) {
                // console.log('result.clientcount',result);
                var changedfields = [];
                if (result.clientcount == 0) {
                    changedfields.push('organization');
                    changedfields.push('contactname');
                    changedfields.push('image');
                    changedfields.push('email');
                    changedfields.push('mobile');
                    changedfields.push('phone');
                    changedfields.push('addressline1');
                    changedfields.push('addressline2');
                    changedfields.push('addressline3');
                    changedfields.push('pincode');
                    changedfields.push('regionid');
                    changedfields.push('districtid');
                    changedfields.push('talukid');
                    changedfields.push('stateid');
                    changedfields.push('countryid');
                    changedfields.push('gstno');
                    changedfields.push('panno');
                    changedfields.push('tanno');
                    changedfields.push('gsttanno');
                    changedfields.push('departmenttypeid');
                    changedfields.push('department');
                    changedfields.push('deptid');
                    changedfields.push('approvalid');
                    var updatedfields = JSON.stringify(changedfields);
                    // console.log('changedfields',changedfields);
                    client.updatedfields = updatedfields;
                    clientDal.addAMSClient(client, clientid).then(function (result) {
                        clientDal.UpdateClientStatus(1, clientid).then(function (result) {
                            resolve(result)
                        }).catch(function (err) {
                            reject(err);
                        });
                    }).catch(function (err) {
                        reject(err);
                    });
                } else {
                    // var changedfields = JSON.parse(result.updatedfields); 
                    if (result.updatedfields) {
                        var changedfields = JSON.parse(result.updatedfields);
                    } else {
                        changedfields = [];
                    }
                    if (result.organization != client.organization) changedfields.push('organization');
                    if (result.contactname != client.contactname) changedfields.push('contactname');
                    if (result.image != client.image) changedfields.push('image');
                    if (result.email != client.email) changedfields.push('email');
                    if (result.mobile != client.mobile) changedfields.push('mobile');
                    if (result.phone != client.phone) changedfields.push('phone');
                    if (result.addressline1 != client.addressline1) changedfields.push('addressline1');
                    if (result.addressline2 != client.addressline2) changedfields.push('addressline2');
                    if (result.addressline3 != client.addressline3) changedfields.push('addressline3');
                    if (result.pincode != client.pincode) changedfields.push('pincode');
                    //if(result.regionid != client.regionid) changedfields.push('regionid');
                    if (result.districtid != client.districtid) changedfields.push('districtid');
                    if (result.talukid != client.talukid) changedfields.push('talukid');
                    if (result.regionid != client.regionid) changedfields.push('regionid');
                    if (result.stateid != client.stateid) changedfields.push('stateid');
                    if (result.countryid != client.countryid) changedfields.push('countryid');
                    if (result.gstno != client.gstno) changedfields.push('gstno');
                    if (result.panno != client.panno) changedfields.push('panno');
                    if (result.tanno != client.tanno) changedfields.push('tanno');
                    if (result.gsttanno != client.gsttanno) changedfields.push('gsttanno');
                    if (result.departmenttypeid != client.departmenttypeid) changedfields.push('departmenttypeid');
                    if (result.department != client.department) changedfields.push('department');
                    if (result.deptid != client.deptid) changedfields.push('deptid');
                    if (result.approvalid != client.approvalid) changedfields.push('approvalid');
                    var updatedfields = JSON.stringify(changedfields);

                    client.updatedfields = updatedfields;
                    clientDal.updateAMSClient(client, clientid).then(function (result) {
                        console.log('result', result);
                        clientDal.UpdateClientAMStatus(1, clientid).then(function (result1) {
                            resolve(result)
                        }).catch(function (err) {
                            reject(err);
                        });
                    }).catch(function (err) {
                        reject(err);
                    });
                }
            }).catch(function (err) {
                reject(err);
            });
        } else {
            // console.log('client', client);
            clientDal.updateclient(client).then(function (result) {
                resolve(result)
            }).catch(function (err) {
                reject(err);
            });
        }
    });
};

module.exports.authenticate = function (userId, password) {
   
    return new app.promise(function (resolve, reject) {
        validateAuthenticate(userId, password).then(function (response) {
            var passwordhash = cryptoUtil.hashSha256(password);
            clientDal.validateagreement(userId).then(function (result) {
                console.log(result)
                clientDal.authenticate(userId, passwordhash).then(function (result) {
                    if (result)
                        resolve(result);
                    else {
                        reject("Error in authenticationBal");
                    }
                }).catch(function (err) {
                    reject(err);
                });
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
            reject("Username cannot be empty");
        } else if (password == null || password == "") {
            console.log("Password cannot be empty");
            reject("Password cannot be empty");
        } else {
            resolve("Success");
        }
    })
};

function validateSignup(client) {
    return new app.promise(function (resolve, reject) {
        var validationResponse = "";
        if (client.email == null || client.email == "") {
            validationResponse = "Email cannot be empty";
            reject("Email cannot be empty");
        }
        else if (client.mobile == null || client.mobile == "") {
            validationResponse = "Mobile number cannot be empty";
            reject("Mobile number cannot be empty");

        } else if (client.password == null || client.password == "") {
            validationResponse = "Password cannot be empty";
            reject("Password cannot be empty");
        }
        //Validate IN DB
        if (validationResponse == null || validationResponse == "") {
            clientDal.validateclient(client.email, client.mobile, client.phone, client.organization, 0).then(function (result) {
                if (result.response == 1) {
                    reject("mobile number or email or phone or organization already exists");
                } else {
                    resolve(result);
                }
            }).catch(function (err) {
                reject("Error validating employee information");
            });
        }
    })
};

module.exports.forgotpassword = function (userid, changedby) {
    return new app.promise(function (resolve, reject) {
        clientDal.getclientid(userid).then(function (output) {
            if (output) {
                var clientid = output.clientid;
                var email = output.email;
                var organization = output.organization;
                var token = uuid.v1();
                var verificationcode = utils.GenerateVerifCode();
                clientDal.forgotpassword(clientid, verificationcode, token, changedby).then(function (result) {
                    if (result.id > 0) {
                        var sendemail = new emailModel.email(output.email, "", "Reset password texco", "Hi " + output.organization + ", Please find reset password verification Code: " + verificationcode, "");
                        emailBal.sendEmail(sendemail).then(function (result) {
                            resolve({
                                "token": token,
                                "email": email,
                                "organization": organization
                            });
                        }).catch(function (err) {
                            reject("Error resetpassword email");
                        });

                    } else {
                        reject("Error resetpassword clientid");
                    }
                }).catch(function (err) {
                    reject(err);
                });
            } else {
                reject("Error resetpassword clientid");
            }
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.resetpassword = function (token, verificationcode, password, changedby) {
    return new app.promise(function (resolve, reject) {
        clientDal.getclientidbyresetpwd(token, verificationcode).then(function (result) {
            if (result) {
                password = cryptoUtil.hashSha256(password);
                clientDal.changepassword(password, changedby, result.clientid).then(function (result) {
                    if (result) {
                        clientDal.resetpassword(token).then(function (result) {
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

module.exports.changepassword = function (password, newpassword, changedby, clientid) {
    return new app.promise(function (resolve, reject) {
        password = cryptoUtil.hashSha256(password);
        clientDal.getvalidpassword(clientid).then(function (result) {
            if (password == result.passwordhash) {
                newpassword = cryptoUtil.hashSha256(newpassword);
                clientDal.changepassword(newpassword, changedby, clientid).then(function (result) {
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

module.exports.updateclientstatus = function (clientid) {
    return new app.promise(function (resolve, reject) {
        clientDal.updateclientstatus(clientid).then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.getclient = function (clientid, regionid) {
    return new app.promise(function (resolve, reject) {
        clientDal.getclient(clientid, regionid).then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.getamsclient = function (clientid, regionid) {
    return new app.promise(function (resolve, reject) {
        clientDal.getamsclient(clientid, regionid).then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.createproject = function (project, agtype) {
    return new app.promise(function (resolve, reject) {
        clientDal.validateproject(project.projectno, 0).then(function (result) {
            if (result.response == 1) {
                reject("Projectno already exists");
            } else {
                clientDal.createproject(project).then(function (result) {

                    if (agtype == 1) {
                        // console.log('agtype',agtype);
                        // console.log('result.projectid,project.clientid',result.projectid,project.clientid);
                        clientDal.createagreementinfo(result.projectid, project.clientid).then(function (result1) {
                            resolve(result)
                        }).catch(function (err) {
                            reject(err);
                        })
                    } else {
                        resolve(result)
                    }
                }).catch(function (err) {
                    reject(err);
                });
            }
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.updateproject = function (project, projectid, roleid) {
    // console.log('projectid.projectid.projectid',projectid);
    return new app.promise(function (resolve, reject) {
        clientDal.validateproject(project.projectno, projectid).then(function (result) {
            if (result.response == 1) {
                reject("Projectno already exists");
            } else {
                if (roleid == 2) {
                    clientDal.CheckProject(project, projectid).then(function (result) {
                        var changedfields = [];
                        changedfields.push('clientid');
                        changedfields.push('projectno');
                        changedfields.push('name');
                        changedfields.push('districtid');
                        changedfields.push('regionid');
                        changedfields.push('statusid');
                        changedfields.push('designation');
                        changedfields.push('addressline1');
                        changedfields.push('addressline2');
                        changedfields.push('addressline3');
                        changedfields.push('pincode');
                        changedfields.push('talukid');
                        changedfields.push('categoryid');
                        changedfields.push('subcategoryid');
                        var updatedfields = JSON.stringify(changedfields);
                        project.updatedfields = updatedfields;
                        if (result.procount == 0) {
                            clientDal.addAMSproject(project, projectid).then(function (result) {
                                clientDal.UpdateprojectStatus(projectid).then(function (result) {
                                    resolve(result)
                                }).catch(function (err) {
                                    reject(err);
                                });
                            }).catch(function (err) {
                                reject(err);
                            });
                        } else {
                            if (result.updatedfields) {
                                var changedfields = JSON.parse(result.updatedfields);
                            } else {
                                changedfields = [];
                            }
                            //console.log('changedfields',changedfields);
                            project.updatedfields = '';
                            project.amstatus = 1;
                            if (result.clientid != project.clientid) changedfields.push('clientid');
                            if (result.projectno != project.projectno) changedfields.push('projectno');
                            if (result.name != project.name) changedfields.push('name');
                            if (result.districtid != project.districtid) changedfields.push('districtid');
                            if (result.regionid != project.regionid) changedfields.push('regionid');
                            if (result.statusid != project.statusid) changedfields.push('statusid');
                            if (result.talukid != project.talukid) changedfields.push('talukid');
                            if (result.categoryid != project.pincode) changedfields.push('categoryid');
                            if (result.subcategoryid != project.talukid) changedfields.push('subcategoryid');
                            if (result.designation != project.designation) changedfields.push('designation');
                            if (result.addressline1 != project.addressline1) changedfields.push('addressline1');
                            if (result.addressline2 != project.addressline2) changedfields.push('addressline2');
                            if (result.addressline3 != project.addressline3) changedfields.push('addressline3');
                            if (result.pincode != project.pincode) changedfields.push('pincode');
                            // if(result.talukid != project.talukid) changedfields.push('talukid');
                            //  if(result.categoryid != project.pincode) changedfields.push('categoryid');
                            //  if(result.subcategoryid != project.talukid) changedfields.push('subcategoryid');
                            var updatedfields = JSON.stringify(changedfields);
                            project.updatedfields = updatedfields;
                            clientDal.updateAMSproject(project, projectid).then(function (result) {
                                clientDal.UpdateProjectAMStatus(projectid).then(function (result) {
                                    resolve(result)
                                }).catch(function (err) {
                                    reject(err);
                                });
                            }).catch(function (err) {
                                reject(err);
                            });
                        }
                    }).catch(function (err) {
                        reject(err);
                    });
                } else {
                    console.log('projectid.projectid.projectid', project);
                    clientDal.updateproject(project, projectid).then(function (result) {
                        resolve(result)
                    }).catch(function (err) {
                        reject(err);
                    });
                }
            }
        }).catch(function (err) {
            reject(err);
        });

    });
};

module.exports.updateprojectstatus = function (projectid) {
    return new app.promise(function (resolve, reject) {
        clientDal.updateprojectstatus(projectid).then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.gettotalprojects = function () {
    return new app.promise(function (resolve, reject) {
        clientDal.gettotalprojects().then(function (result) {
            console.log('result', result);
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.getproject = function (projectid, regionid) {
    return new app.promise(function (resolve, reject) {
        clientDal.getproject(projectid, regionid).then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.getclientdetailsbyid = function (clientid) {
    return new app.promise(function (resolve, reject) {
        clientDal.getclientdetailsbyid(clientid).then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
};



module.exports.getAMSproject = function (regionid, projectid) {
    return new app.promise(function (resolve, reject) {
        clientDal.getAMSproject(regionid, projectid).then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.getclientdetails = function (clientid) {
    return new app.promise(function (resolve, reject) {
        clientDal.getclientdetails(clientid).then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.getclientdetailsList = function (clientid, projectid, monthandyear) {
    return new app.promise(function (resolve, reject) {
        clientDal.getclientdetailsList(clientid, projectid, monthandyear).then(function (result) {
            // console.log('result',result);
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.getclientdetailsListSkip = function (clientid, projectid, monthandyear, skippedmembersid) {
    return new app.promise(function (resolve, reject) {
        clientDal.getclientdetailsListSkip(clientid, projectid, monthandyear, skippedmembersid).then(function (result) {
            //console.log('result',result);
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.getclientdetailsListView = function (clientid, projectid, monthandyear, memberid) {
    return new app.promise(function (resolve, reject) {
        clientDal.getclientdetailsListView(clientid, projectid, monthandyear, memberid).then(function (result) {
            // console.log('result',result);
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
};




module.exports.ApproveInvoice = function (utrno, invoiceid) {
    return new app.promise(function (resolve, reject) {
        clientDal.ApproveInvoice(utrno, invoiceid).then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.AddInvoiceUTRNo = function (utrno, invoiceid) {
    return new app.promise(function (resolve, reject) {
        clientDal.AddInvoiceUTRNo(utrno, invoiceid).then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.createattendance = function (attendance, membersid, historyid, texcono, noofdays) {
    return new app.promise(function (resolve, reject) {
        clientDal.createattendance(attendance).then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
        // let findDuplicates = attendance => attendance.filter((item, index) => attendance.indexOf(item) != index)
        // var memberscount = findDuplicates(membersid)
        // var texconocount = [];
        // var totaldays = 0;
        // if(memberscount.length) {
        //     var atmembers = attendance.members;
        //     var texcono = 0;
        //     for(var j = 0; j < memberscount.length;j++) {
        //         console.log('memberscount[j]',memberscount[j]);
        //         var filteredapprsup = _.filter(atmembers, function(item) {
        //             if(memberscount[j] == item.memberid) {
        //                 totaldays += parseInt(item.presentdays);
        //                 console.log('totaldays',totaldays);
        //             }
        //             texcono = item.texcono;
        //         });
        //         if(parseInt(noofdays) < parseInt(totaldays)) {
        //             texconocount.push(texcono);
        //         }
        //         totaldays = 0;
        //         texcono =  0;
        //     }
        //     if(texconocount.length) {
        //         var txno = texconocount.toString();
        //         var errs = txno + " These Texco No Days Count Exceeded than Total No of Days"
        //         reject(errs);
        //     } else {
        //         clientDal.createattendance(attendance).then(function (result) {
        //             resolve(result)
        //         }).catch(function (err) {
        //             reject(err);
        //         });
        //     }
        // } else {
        //     clientDal.createattendance(attendance).then(function (result) {
        //         resolve(result)
        //     }).catch(function (err) {
        //         reject(err);
        //     });
        // }
    });
};

module.exports.getattendance = function (clientid, projectid, monthandyear) {
    return new app.promise(function (resolve, reject) {
        clientDal.getattendance(projectid, monthandyear).then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
};



module.exports.updateattendance = function (attendance) {
    return new app.promise(function (resolve, reject) {
        clientDal.updateattendance(attendance).then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.updateattendancestatus = function (attendanceid) {
    return new app.promise(function (resolve, reject) {
        clientDal.updateattendancestatus(attendanceid).then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.getnumberofclients = function () {
    return new app.promise(function (resolve, reject) {
        clientDal.getnumberofclients().then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });

    });
};

module.exports.approval = function (clientid, approvalid) {
    return new app.promise(function (resolve, reject) {
        clientDal.updateclientapproval(clientid, approvalid).then(function (output) {
            clientDal.getclientapproval(clientid).then(function (output) {
                if (output[0].approval == "Confirm") {
                    var sendemail = new emailModel.email(output[0].email, "", "Texco Approval", "Hi " + output[0].organization + "Texco Approved your organization.", "");
                    emailBal.sendEmail(sendemail).then(function (result) {
                        resolve("success");
                    }).catch(function (err) {
                        reject("Error Approval email");
                    });
                }
                else {
                    var sendemail = new emailModel.email(output[0].email, "", "Texco Approval", "Hi " + output[0].organization + "Texco Rejected your organization.", "");
                    emailBal.sendEmail(sendemail).then(function (result) {
                        resolve("success");
                    }).catch(function (err) {
                        reject("Error Approval email");
                    });
                }
            }).catch(function (err) {
                reject(err);
            });
        }).catch(function (err) {
            reject(err);
        });
    });
};

function adminapproval(clientid) {
    return new app.promise(function (resolve, reject) {
        var token = uuid.v1();
        var verificationcode = utils.GenerateVerifCode();
        var url = nconf.get('BASEURL');
        clientDal.getclient(clientid).then(function (output) {
            if (output.email != "" && output.email != null && output.email != undefined) {
                clientDal.forgotpassword(output[0].clientid, verificationcode, token, output[0].changedby).then(function (result) {
                    var body = "Hi <b>" + output[0].organization + "</b>,";
                    body += "<br/>Please find the below URL for reset your Password. <br/>";
                    body += "<br/>" + url + "/" + token + "/Client";
                    body += "<br/> <br/>Your verificationcode is:" + verificationcode;
                    var sendemail = new emailModel.email(output[0].email, "", "Set Password for texco", "", body);
                    emailBal.sendEmail(sendemail).then(function (result) {
                        resolve({ "clientid": clientid });
                    }).catch(function (err) {
                        reject(err);
                    });
                }).catch(function (err) {
                    reject(err);
                });
            }
            else {
                resolve({ "clientid": clientid });
            }
        }).catch(function (err) {
            reject("Error Get Client");
        });
    });
};

module.exports.getclientapprovals = function (lkvalid) {
    return new app.promise(function (resolve, reject) {
        clientDal.getclientapprovals(lkvalid).then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.getclientattendance = function (clientid, projectid, monthandyear) {
    return new app.promise(function (resolve, reject) {
        clientDal.getclientattendance(clientid, projectid, monthandyear).then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.getclientattendanceinfo = function (clientid, projectid, monthandyear) {
    return new app.promise(function (resolve, reject) {
        clientDal.getclientattendanceinfo(clientid, projectid, monthandyear).then(function (result) {
            console.log("REsult", result);
            if (result.length > 0) {
                console.log(" Alrady Exist")

            } else {
                clientDal.getattendance(result.projectid, result.monthandyear, result).then(function (result) {
                    resolve(result)
                }).catch(function (err) {
                    reject(err);
                });
            }
            // resolve(result)        
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.importattendance = function (attendance) {
    return new app.promise(function (resolve, reject) {
        var attend = attendance[0];
        if (attend.length > 0) {
            for (var i = 0; i < attend.length; i++) {
                clientDal.getimportdetails(attend[i]["PROJECTNO"], attend[i]["SERVICE NO"], attend[i]).then(function (result) {
                    clientDal.getattendanceexist(result.clientid, result.projectid, result.attend.MONTHANDYEAR, result.memberid, result).then(function (result) {
                        clientDal.importattendance(result, result.attend).then(function (result) {
                            resolve(result)
                        }).catch(function (err) {
                            reject(err);
                        });
                    }).catch(function (err) {
                        reject(err);
                    });
                }).catch(function (err) {
                    reject(err);
                });
            }
        }
    });
};

module.exports.getprojectexport = function (regionid, statusid, districtid) {
    return new app.promise(function (resolve, reject) {
        clientDal.getprojectexport(regionid, statusid, districtid).then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
};
module.exports.getprojectamsexport = function (regionid, fromdate, todate) {
    return new app.promise(function (resolve, reject) {
        clientDal.getprojectamsexport(regionid, fromdate, todate).then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.getclientexport = function (regionid, fromdate, todate) {
    return new app.promise(function (resolve, reject) {
        clientDal.getclientexport(regionid, fromdate, todate).then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
};


module.exports.getattendanceexport = function (clientid, projectid, monthandyear) {
    return new app.promise(function (resolve, reject) {
        clientDal.getattendanceexport(clientid, projectid, monthandyear).then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.getprojectsno = function () {
    return new app.promise(function (resolve, reject) {
        clientDal.getprojectsno().then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.getprojectnumber = function (regionid) {
    return new app.promise(function (resolve, reject) {
        clientDal.getprojectnumber(regionid).then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.getclientDetailsforList = function (regionid) {
    return new app.promise(function (resolve, reject) {
        clientDal.getclientDetailsforList(regionid).then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
};





module.exports.getprojectsnobyclient = function (clientid) {
    return new app.promise(function (resolve, reject) {
        clientDal.getprojectsnobyclient(clientid).then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.getprojectsnoforjobposting = function () {
    return new app.promise(function (resolve, reject) {
        clientDal.getprojectsnoforjobposting().then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.getprojectsnosearchforjobposting = function (projectid) {
    return new app.promise(function (resolve, reject) {
        clientDal.getprojectsnosearchforjobposting(projectid).then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.clientimages = function () {
    return new app.promise(function (resolve, reject) {
        clientDal.getclientimages().then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
};


module.exports.getattendancereviewdetails = function (clientid, projectid, monthandyear) {
    return new app.promise(function (resolve, reject) {
        clientDal.getattendancereviewdetails(clientid, projectid, monthandyear).then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.getattendancereviewlist = function (clientid, projectid, monthandyear) {
    return new app.promise(function (resolve, reject) {
        clientDal.getattendancereviewlist(clientid, projectid, monthandyear).then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.getattendancereview = function (clientid, projectid, monthandyear) {
    return new app.promise(function (resolve, reject) {
        clientDal.getattendancereview(clientid, projectid, monthandyear).then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.updateattendnacestatus = function (clientid, projectid, monthandyear, status, expense, changedby, unedholdids, unholdids, unholdidstatus, unedholdidstatus) {
    return new app.promise(function (resolve, reject) {
        clientDal.updateattendnacestatus(clientid, projectid, monthandyear, status, unedholdids, unholdids, unholdidstatus, unedholdidstatus).then(function (result) {
            if (expense == 0) {
                resolve(result);
            } else {
                clientDal.addExpenseAmounts(expense).then(function (result1) {
                    resolve(result1)
                }).catch(function (err) {
                    reject(err);
                });
            }
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.geteditattendance = function (projectid, monthandyear) {
    return new app.promise(function (resolve, reject) {
        clientDal.geteditattendance(projectid, monthandyear).then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.getclientdashboard = function (clientid) {
    return new app.promise(function (resolve, reject) {
        clientDal.getclientdashboard(clientid).then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.getprojectInvoiceList = function (clientid, types) {
    return new app.promise(function (resolve, reject) {
        clientDal.getprojectInvoiceList(clientid, types).then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.getEmployeesCountList = function (clientid, types) {
    if (types == 1) {
        return new app.promise(function (resolve, reject) {
            clientDal.getEmployeesCountList(clientid).then(function (result) {
                resolve(result)
            }).catch(function (err) {
                reject(err);
            });
        });
    } else {
        return new app.promise(function (resolve, reject) {
            clientDal.getCurrentEmployeesCountList(clientid).then(function (result) {
                resolve(result)
            }).catch(function (err) {
                reject(err);
            });
        });
    }
};


module.exports.getInvoicesCount = function (clientid) {
    return new app.promise(function (resolve, reject) {
        clientDal.getInvoicesCount(clientid).then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
};



module.exports.getattendancehold = function (clientid) {
    return new app.promise(function (resolve, reject) {
        clientDal.getattendancehold(clientid).then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.updateattendnacehold = function (clientid, projectid, monthandyear, status, holdids, unholdids, reason) {
    return new app.promise(function (resolve, reject) {
        clientDal.updateattendnacehold(clientid, projectid, monthandyear, status, holdids, unholdids, reason).then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.updateattendnaceedhold = function (attendanceids, edhold, unedholdids) {
    return new app.promise(function (resolve, reject) {
        clientDal.updateattendnaceedhold(attendanceids, edhold, unedholdids).then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.getattendanceedit = function (projectid, monthandyear, edittype) {
    return new app.promise(function (resolve, reject) {
        clientDal.getattendanceedit(projectid, monthandyear, edittype).then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.geteditattendancedetails = function (projectid, monthandyear, clientid) {
    return new app.promise(function (resolve, reject) {
        clientDal.geteditattendancedetails(projectid, monthandyear, clientid).then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.getattendanceprint = function (projectid, monthandyear) {
    return new app.promise(function (resolve, reject) {
        clientDal.getattendanceprint(projectid, monthandyear).then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.updateattendnaceedreserve = function (attendanceid, lreserve) {
    return new app.promise(function (resolve, reject) {
        clientDal.updateattendnaceedreserve(attendanceid, lreserve).then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.importattendancefrombiometric = function (attendance,updateval) {

    var projectno = attendance[0]["projectno"];
    var monthandyear = attendance[0]["monthandyear"];
    var projectid = attendance[0]["projectid"];
    var clientid = attendance[0]["clientid"];
    var texcono = 0;
    var attendancelength = (attendance.length) - 2;
    var numberoftimes = attendancelength / 8;

    var timearr = [];
    var presentdays = 0;
    var eddays = 0;
    var valueattendancearr = [];
    var next = 8;
    var nextemp;
    var nextval;
    var k = 0;
    for (var i = 0; i < attendance.length; i++) {
        var valueattendance = {};
        if (i == 2) {
            nextemp = i + next;
            texcono = attendance[i]["empId"];
            valueattendance["texcono"] = texcono;
            valueattendance["projectno"] = projectno;
            valueattendance["monthandyear"] = monthandyear;
            valueattendance["projectid"] = projectid;
            valueattendance["clientid"] = clientid;
            // console.log(" =====", projectno+"  "+monthandyear+" "+texcono)
            var k = 0; presentdays = 0; eddays = 0;
            nextval = i + 3;
            for (key in attendance[nextval]) {
                if (attendance[nextval][key] === "A" || attendance[nextval][key] == "XX") {
                    valueattendance[key] = '0';
                    k++;
                }
                if (attendance[nextval][key] === "P" || attendance[nextval][key] === "E") {
                    timearr = attendance[nextval + 1][key].split(":");
                    if (timearr[0] < '08') {
                        valueattendance[key] = '1';
                        presentdays++;
                        k++;
                    }
                    else if (timearr[0] >= '08' && timearr[0] < '16') {
                        valueattendance[key] = '1';
                        presentdays++;
                        k++;
                    } else if (timearr[0] >= '16' && timearr[0] < '24') {
                        valueattendance[key] = '2';
                        presentdays++;
                        eddays++;
                        k++;
                    } else if (timearr[0] >= 24) {
                        valueattendance[key] = '3';
                        presentdays++;
                        eddays = eddays + 2;
                        k++;
                    }
                }
                else if (attendance[nextval][key] === "HD" ||  attendance[nextval][key] === 'LH') {
                    timearr = attendance[nextval + 1][key].split(":");
                    if (timearr[0] < '08') {
                        valueattendance[key] = '1';
                        presentdays++;
                        k++;
                    }
                    else if (timearr[0] >= '08' && timearr[0] < '16') {
                        valueattendance[key] = '1';
                        presentdays++;
                        k++;
                    } else if (timearr[0] >= '16' && timearr[0] < '24') {
                        valueattendance[key] = '2';
                        presentdays++;
                        eddays++;
                        k++;
                    } else if (timearr[0] >= 24) {
                        valueattendance[key] = '3';
                        presentdays++;
                        eddays = eddays + 2;
                        k++;
                    }
                }
                else {

                }
            }
            // console.log("K===========", k);
            if (k == 28) {
                valueattendance["29"] = "0";
                valueattendance["30"] = "0";
                valueattendance["31"] = "0";
            } else if (k == 29) {
                valueattendance["30"] = "0";
                valueattendance["31"] = "0";
            } else if (k = 30) {
                valueattendance["31"] = "0";
            }
            valueattendance["presentdays"] = presentdays;
            valueattendance["eddays"] = eddays
           // console.log("-----1-----", valueattendance);
            valueattendancearr.push(valueattendance);

        } else if (i == nextemp) {
            //console.log("    ", i + "   " + nextemp);
            nextemp = (i + next)
            texcono = attendance[i]["empId"];
            valueattendance["texcono"] = texcono;
            valueattendance["projectno"] = projectno;
            valueattendance["monthandyear"] = monthandyear;
            valueattendance["projectid"] = projectid;
            valueattendance["clientid"] = clientid;
            // console.log(" =====", projectno + "  " + monthandyear + " " + texcono)

            var k = 0; presentdays = 0; eddays = 0;
            nextval = i + 3;
            for (key in attendance[nextval]) {
                if (attendance[nextval][key] === "A" || attendance[nextval][key] == "XX") {
                    valueattendance[key] = '0';
                    k++;
                }
                if (attendance[nextval][key] === "P" || attendance[nextval][key] === "E" || attendance[nextval][key] === 'HD' || attendance[nextval][key] === 'LH') {
                    timearr = attendance[nextval + 1][key].split(":");
                    if (timearr[0] < '08') {
                        valueattendance[key] = '1';
                        presentdays++;
                        k++;
                    }
                    else if (timearr[0] >= '08' && timearr[0] < '16') {
                        valueattendance[key] = '1';
                        presentdays++;
                        k++;
                    } else if (timearr[0] >= '16' && timearr[0] < '24') {
                        valueattendance[key] = '2';
                        presentdays++;
                        eddays++;
                        k++;
                    } else if (timearr[0] >= 24) {
                        valueattendance[key] = '3';
                        presentdays++;
                        eddays = eddays + 2;
                        k++;
                    }
                } else {

                }

            }
            console.log("K===========", k);
            if (k == 28) {
                valueattendance["29"] = "0";
                valueattendance["30"] = "0";
                valueattendance["31"] = "0";
            } else if (k == 29) {
                valueattendance["30"] = "0";
                valueattendance["31"] = "0";
            } else if (k = 30) {
                valueattendance["31"] = "0";
            }
            valueattendance["presentdays"] = presentdays;
            valueattendance["eddays"] = eddays
            console.log("=====22222=======", valueattendance);
            valueattendancearr.push(valueattendance);
        }
    } 

    return new app.promise(function (resolve, reject) {
        for (var y = 0; y < valueattendancearr.length; y++) {
            clientDal.getimportmemberdetails(valueattendancearr[y].projectno, valueattendancearr[y].texcono, valueattendancearr[y]).then(function (result) {
                clientDal.getattendanceexist(result.attend.clientid, result.attend.projectid, result.attend.monthandyear, result.memberid, result).then(function (results) {
                    clientDal.importattendancefrombiometric(results, results.attend,updateval).then(function (result) {
                        resolve(result)
                    }).catch(function (err) {
                        reject(err);
                    });
                }).catch(function (err) {
                    reject(err);
                });
            }).catch(function (err) {
                reject(err);
            });
        }
    });
};

module.exports.getPostedMembersList = function (clientid) {
    return new app.promise(function (resolve, reject) {
        clientDal.getPostedMembersList(clientid).then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.getApprovedPostedMembersList = function (clientid) {
    return new app.promise(function (resolve, reject) {
        clientDal.getApprovedPostedMembersList(clientid).then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.getAMPostedMembersList = function (regionid) {
    return new app.promise(function (resolve, reject) {
        clientDal.getAMPostedMembersList(regionid).then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.getAMApprovedPostedMembersList = function (regionid) {
    return new app.promise(function (resolve, reject) {
        clientDal.getAMApprovedPostedMembersList(regionid).then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
};



module.exports.ApprovePostedMembers = function (clientid, memberhistoryid, memberid, status) {
    return new app.promise(function (resolve, reject) {
        clientDal.ApprovePostedMembers(clientid, memberhistoryid, memberid, status).then(function (result) {
            if (result.msg == "Success") {
                clientDal.CloseOtherWorkingProjects(clientid, memberhistoryid, memberid, status).then(function (result1) {
                    resolve(result1);
                }).catch(function (err) {
                    reject(err);
                });
            }
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.getAMSClient = function (clientid) {
    return new app.promise(function (resolve, reject) {
        clientDal.getAMSClient(clientid).then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.getclientDropDownList = function () {
    return new app.promise(function (resolve, reject) {
        clientDal.getclientDropDownList().then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
};
module.exports.getprojectDropDownList = function () {
    return new app.promise(function (resolve, reject) {
        clientDal.getprojectDropDownList().then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
};


module.exports.getClientAgreementDetails = function (projectid, clientid, monthandyear) {
    console.log('projectid', projectid);
    return new app.promise(function (resolve, reject) {
        clientDal.checkCombinedagreement(clientid,projectid).then(function (result) {
            //resolve(result)
           console.log(result.agid,result.agtype);
           // prids=prid['prids'];
       
        clientDal.getClientAgreementDetails(projectid, clientid,result.agid,result.agtype).then(function (rows) {
            var result = [];
            var promises = [];
            var rowsReturned = rows.length;
            var authcount = [];
            var salaryamount = [];
            var manpower = [];
            for (var i = 0; i < rowsReturned; i++) {
                promises.push(new Promise((resolve, reject) => {
                    authcount.push({ 'category': rows[i].category, 'vacancy': rows[i].numberofvacancies });
                    salaryamount.push({ 'category': rows[i].category, 'amount': rows[i].particularamount });
                    clientDal.getattendancecount(rows[i].jobmasterid, clientid, rows[i].projectid, monthandyear, rows[i].category, rows[i].numberofvacancies).then(function (results) {
                        manpower.push(results);
                        resolve(results);
                    })
                    if ((i + 1 == rowsReturned) || (rows[i].projectid != rows[i + 1].projectid) || (rows[i].agreementid != rows[i + 1].agreementid)) {

                        if(rows[i].wagetype == "DGR VALUE")
                        {
                            rows[i].wagetype="DGR WAGES" ;
                        }
                        else if (rows[i].wagetype == "TN MINIMUM VALUE")
                        {
                            rows[i].wagetype="TN MINIMUM WAGES";
                        }
                        var objs = new clientModel.AgreementDetails(rows[i].projectno, rows[i].name, rows[i].projectaddress1, rows[i].projectaddress2, rows[i].projectaddress3, rows[i].organization, rows[i].contactname, rows[i].email, rows[i].clientaddress1, rows[i].clientaddress2, rows[i].clientaddress3, rows[i].gstno, rows[i].fromdate, rows[i].todate, rows[i].tax, rows[i].servicecharge, rows[i].jobmasterid, rows[i].particularamount, rows[i].category, rows[i].numberofvacancies, rows[i].next_renewal_date, rows[i].wageyear, rows[i].wagetype, rows[i].wagearea, rows[i].ratecategory, authcount, salaryamount, manpower, rows[i].phone, rows[i].mobile, rows[i].categorycode,rows[i].allowancetype1,rows[i].allowancevalue1,rows[i].allowancetype2,rows[i].allowancevalue2,rows[i].allowancetype3,rows[i].allowancevalue3);
                        result.push(objs);
                        authcount = [];
                        salaryamount = [];
                    }
                }))
            }
            app.promise.all(promises).then(function () {
                result['manpower'] = manpower;
                resolve(result);
            });
        }).catch(function (err) {
            reject(err);
        });
    }).catch(function (err) {
        reject(err);
    });
    });
};

//category

module.exports.addcategory = function (category) {
    return new app.promise(function (resolve, reject) {
        clientDal.addcategory(category).then(function (result) {
            if (result) {
                resolve(result);
            }
            else {
                reject("Error in add category BAL");
            }
        }).catch(function (err) {
            reject(err);
        });
    })
};

module.exports.addsubcategory = function (subcategory) {
    return new app.promise(function (resolve, reject) {
        clientDal.addsubcategory(subcategory).then(function (result) {
            if (result) {
                resolve(result);
            }
            else {
                reject("Error in add subcategory BAL");
            }
        }).catch(function (err) {
            reject(err);
        });
    })
};



module.exports.getcate = function () {
    return new app.promise(function (resolve, reject) {
        clientDal.getcate().then(function (result) {
            if (result) {
                resolve(result);
            }
            else {
                reject("Error in add category BAL");
            }
        }).catch(function (err) {
            reject(err);
        });
    })
};

module.exports.getsubcate = function (categoryid) {
    return new app.promise(function (resolve, reject) {
        clientDal.getsubcate(categoryid).then(function (result) {
            if (result) {
                resolve(result);
            }
            else {
                reject("Error in add subcategory BAL");
            }
        }).catch(function (err) {
            reject(err);
        });
    })
};

module.exports.getAMSClientReject = function (clientid) {
    console.log('clientid', clientid);
    return new app.promise(function (resolve, reject) {
        clientDal.getAMSClientReject(clientid).then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.getAMSprojectReject = function (projectid) {
    console.log('projectid', projectid);
    return new app.promise(function (resolve, reject) {
        clientDal.getAMSprojectReject(projectid).then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.getattendanceauthorizestatus = function (fromdate, todate, regionid) {
    return new app.promise(function (resolve, reject) {
        clientDal.getAttendanceAuthorizeStatus(fromdate, todate, regionid).then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
}
module.exports.getattendancependinglist = function (monthandyear, regionid) {
    return new app.promise(function (resolve, reject) {
        clientDal.getattendancependinglist(monthandyear, regionid).then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.getsalarycreatedstatus = function (fromdate, todate, regionid) {
    return new app.promise(function (resolve, reject) {
        clientDal.getsalarycreatedstatus(fromdate, todate, regionid).then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
}
module.exports.getsalarynotcreatedstatus = function (fromdate, todate, regionid) {
    return new app.promise(function (resolve, reject) {
        clientDal.getsalarynotcreatedstatus(fromdate, todate, regionid).then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
}

module.exports.getattendancesubmittedstatus = function (fromdate, todate, regionid) {
    return new app.promise(function (resolve, reject) {
        clientDal.getattendancesubmittedstatus(fromdate, todate, regionid).then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
}

module.exports.getsalaryrejectedstatus = function (fromdate, todate, regionid) {
    return new app.promise(function (resolve, reject) {
        clientDal.getsalaryrejectedstatus(fromdate, todate, regionid).then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
}

module.exports.uploadProjectDetails = function (projectdata) {
    return new app.promise(function (resolve, reject) {
        clientDal.getValuesforCheckProjectUpload().then(function (result) { 
            try { 
                var category = result.category;
                var subcategory = result.subcategory;
                var jobmaster = result.jobmaster;
                var wagecategory = result.wagecategory;
                var lookup = result.lookup;
                var taluk = result.taluk;
                var projectss = result.project;

                var rejectedDetails = [];
                var selectedDetails = [];
                var rejjs = '';
                var promises = [];
                var results = [];

                for (var i = 0; i < projectdata.length; i++) {
                    promises.push(new Promise((resolve, reject) => {
                        try {
                            var res = i;
                            var clientregion = 0;
                            var clientdistrict = 0;
                            var clienttaluk = 0;
                            var projectregion = 0;
                            var projectdistrict = 0;
                            var projecttaluk = 0;
                            var dept = 0;
                            var depttype = 0;
                            var projectstatus = 0;
                            var wgtype = 0;
                            var wgyear = 0;
                            var wgarea = 0;
                            var agree = 0;
                            var agtype = 0;
                            var agsts = 0;
                            var projectcategory = 0;
                            var projectsubcategory = 0;
                            var wagecategoryid = 0;
                            var projectcount = 0;
                            var vacancyDetails = [];  

                            var clregion = (projectdata[i].CLIENTREGION ? projectdata[i].CLIENTREGION : "");
                            var cldistrict = (projectdata[i].CLIENTDISTRICT ? projectdata[i].CLIENTDISTRICT : "");
                            var prregion = (projectdata[i].PROJECTREGION ? projectdata[i].PROJECTREGION : "");
                            var prdistrict = (projectdata[i].PROJECTDISTRICT ? projectdata[i].PROJECTDISTRICT : "");
                            var cldept = (projectdata[i].DEPARTMENT ? projectdata[i].DEPARTMENT : "");
                            var cldepttype = (projectdata[i].DEPARTMENTTYPE ? projectdata[i].DEPARTMENTTYPE : "");
                            var prstatus = (projectdata[i].PROJECTSTATUS ? projectdata[i].PROJECTSTATUS : "");
                            var wagetype = (projectdata[i].WAGETYPE ? projectdata[i].WAGETYPE : "");
                            var wageyr = (projectdata[i].WAGEYEAR ? projectdata[i].WAGEYEAR : "");
                            var wagear = (projectdata[i].WAGEAREA ? projectdata[i].WAGEAREA : "");
                            var agtypee = (projectdata[i].AGREEMENTTYPE ? projectdata[i].AGREEMENTTYPE : "");
                            var typeagree = (projectdata[i].TYPEOFAGREEMENT ? projectdata[i].TYPEOFAGREEMENT : "");
                            var agstatus = (projectdata[i].AGREEMENTSTATUS ? projectdata[i].AGREEMENTSTATUS : "");
                            var cltaluk = (projectdata[i].CLIENTTALUK ? projectdata[i].CLIENTTALUK : "");
                            var prtaluk = (projectdata[i].PROJECTTALUK ? projectdata[i].PROJECTTALUK : "");
                            var prcat = (projectdata[i].PROJECTCATEGORY ? projectdata[i].PROJECTCATEGORY : "");
                            var prsubcat = (projectdata[i].PROJECTSUBCATEGORY ? projectdata[i].PROJECTSUBCATEGORY : "");
                            var wgcate = (projectdata[i].WAGECATEGORY ? projectdata[i].WAGECATEGORY : "");
                            
                            if ((projectdata[res].PROJECTNO) && (projectdata[res].CLIENTNAME)) { 
                                var filteredapprproject = _.filter(projectss, function (item) {
                                    if (projectdata[res].PROJECTNO == item.projectno) {
                                        projectcount++;
                                    }
                                });
                                if (projectcount == 0) {
                                    var filteredapprsup = _.filter(lookup, function (item) {  
                                        // console.log('clregion',clregion);
                                        if (clregion == item.description && item.lkdmncode == 'REGION') {
                                            clientregion = item.lkvalid;
                                        }
                                        if (cldistrict == item.description && item.lkdmncode == 'DISTRC') {
                                            clientdistrict = item.lkvalid;
                                        }
                                        if (prregion == item.description && item.lkdmncode == 'REGION') {
                                            projectregion = item.lkvalid;
                                        }
                                        if (prdistrict == item.description && item.lkdmncode == 'DISTRC') {
                                            projectdistrict = item.lkvalid;
                                        } 
                                        if (cldept == item.description && item.lkdmncode == 'DEPT') {
                                            dept = item.lkvalid;
                                        }
                                        if (cldepttype == item.description && item.lkdmncode == 'DEPTTYPE') {
                                            depttype = item.lkvalid;
                                        }
                                        if (prstatus == item.description && item.lkdmncode == 'PRJST') {
                                            projectstatus = item.lkvalid;
                                        }
                                        if (wagetype == item.description && item.lkdmncode == 'WGTYPE') {
                                            wgtype = item.lkvalid;
                                        }
                                        if (wageyr == item.description && item.lkdmncode == 'WGYEAR') {
                                            wgyear = item.lkvalid;
                                        }
                                        if (wagear == item.description && item.lkdmncode == 'WGAREA') {
                                            wgarea = item.lkvalid;
                                        }
                                        if (agtypee == item.description && item.lkdmncode == 'AGREE') {
                                            agree = item.lkvalid;
                                        }
                                        if (typeagree == item.description && item.lkdmncode == 'AGTYPE') {
                                            agtype = item.lkvalid;
                                        }
                                        if (agstatus == item.description && item.lkdmncode == 'AGSTS') {
                                            agsts = item.lkvalid;
                                        }
                                    });
                                    var filteredapprsups = _.filter(taluk, function (item) {
                                        if (cltaluk == item.description && item.lkdmncode == 'TALUK') {
                                            clienttaluk = item.lkvalid;
                                        }
                                        if (prtaluk == item.description && item.lkdmncode == 'TALUK') {
                                            projecttaluk = item.lkvalid;
                                        }
                                    });
                                    var filteredapprsupp = _.filter(category, function (item) {
                                        if (prcat == item.categoryname) {
                                            projectcategory = item.categoryid;
                                        }
                                    });
                                    var filteredapprsupps = _.filter(subcategory, function (item) {
                                        if (prsubcat == item.subcategoryname) {
                                            projectsubcategory = item.subcategoryid;
                                        }
                                    });
                                    var filteredapprsuppss = _.filter(wagecategory, function (item) { 
                                        // console.log('wgcate',wgcate);
                                        if (wgcate == item.category_code) {
                                            wagecategoryid = item.category_id;
                                        }
                                    });
                                    var filteredapprsuppss = _.filter(jobmaster, function (item) { 
                                        var sgcnt = (projectdata[i].SG ? parseInt(projectdata[i].SG) : 0);
                                        var hsgcnt = (projectdata[i].HSG ? parseInt(projectdata[i].HSG) : 0);
                                        var dvrcnt = (projectdata[i].DVR ? parseInt(projectdata[i].DVR) : 0);
                                        var asocnt = (projectdata[i].ASO ? parseInt(projectdata[i].ASO) : 0);
                                        var pocnt = (projectdata[i].PO ? parseInt(projectdata[i].PO) : 0);
                                        var jacnt = (projectdata[i].JA ? parseInt(projectdata[i].JA) : 0);
                                        var othercnt = (projectdata[i].OTHER ? parseInt(projectdata[i].OTHER) : 0);
                                        var oacnt = (projectdata[i].OA ? parseInt(projectdata[i].OA) : 0);
                                        var guncnt = (projectdata[i].GUN ? parseInt(projectdata[i].GUN) : 0);
                                        var iacnt = (projectdata[i].IA ? parseInt(projectdata[i].IA) : 0);
                                        var iocnt = (projectdata[i].IO ? parseInt(projectdata[i].IO) : 0);
                                        var wsgcnt = (projectdata[i].WSG ? parseInt(projectdata[i].WSG) : 0);
                                        if (item.code == 'SG' && (sgcnt && sgcnt > 0)) {
                                            vacancyDetails.push({ 'jobmasterid': item.jobmasterid, 'numberofvacancies': sgcnt });
                                        }
                                        if (item.code == 'HSG' && (hsgcnt && hsgcnt > 0)) {
                                            vacancyDetails.push({ 'jobmasterid': item.jobmasterid, 'numberofvacancies': hsgcnt });
                                        }
                                        if (item.code == 'DVR' && (dvrcnt && dvrcnt > 0)) {
                                            vacancyDetails.push({ 'jobmasterid': item.jobmasterid, 'numberofvacancies': dvrcnt });
                                        }
                                        if (item.code == 'ASO' && (asocnt && asocnt > 0)) {
                                            vacancyDetails.push({ 'jobmasterid': item.jobmasterid, 'numberofvacancies': asocnt });
                                        }
                                        if (item.code == 'PO' && (pocnt && pocnt > 0)) {
                                            vacancyDetails.push({ 'jobmasterid': item.jobmasterid, 'numberofvacancies': pocnt });
                                        }
                                        if (item.code == 'JA' && (jacnt && jacnt > 0)) {
                                            vacancyDetails.push({ 'jobmasterid': item.jobmasterid, 'numberofvacancies': jacnt });
                                        }
                                        if (item.code == 'OTHER' && (othercnt && othercnt > 0)) {
                                            vacancyDetails.push({ 'jobmasterid': item.jobmasterid, 'numberofvacancies': othercnt });
                                        }
                                        if (item.code == 'OA' && (oacnt && oacnt > 0)) {
                                            vacancyDetails.push({ 'jobmasterid': item.jobmasterid, 'numberofvacancies': oacnt });
                                        }
                                        if (item.code == 'GUN' && (guncnt && guncnt > 0)) {
                                            vacancyDetails.push({ 'jobmasterid': item.jobmasterid, 'numberofvacancies': guncnt });
                                        } 
                                        if (item.code == 'IA' && (iacnt && iacnt)) {
                                            vacancyDetails.push({ 'jobmasterid': item.jobmasterid, 'numberofvacancies': iacnt });
                                        }
                                        if (item.code == 'IO' && (iocnt && iocnt > 0)) {
                                            vacancyDetails.push({ 'jobmasterid': item.jobmasterid, 'numberofvacancies': iocnt });
                                        }
                                        if (item.code == 'WSG' && (wsgcnt && wsgcnt > 0)) {
                                            vacancyDetails.push({ 'jobmasterid': item.jobmasterid, 'numberofvacancies': wsgcnt });
                                        }
                                    });
                                    
                                    var password = cryptoUtil.hashSha256('password');
                                    var client = new clientModel.client(0,(projectdata[res].CLIENTNAME ? projectdata[res].CLIENTNAME : ""),(projectdata[res].CLIENTCONTACT ? projectdata[res].CLIENTCONTACT : ""),'defaultlogo.jpg',(projectdata[res].CLIENTEMAIL ? projectdata[res].CLIENTEMAIL : ""),(projectdata[res].CLIENTMOBILE ? projectdata[res].CLIENTMOBILE : ""),(projectdata[res].CLIENTPHONEWITHCODE ? projectdata[res].CLIENTPHONEWITHCODE : ""),(projectdata[res].GSTNO ? projectdata[res].GSTNO : ""),(projectdata[res].TANNO ? projectdata[res].TANNO : ""),(projectdata[res].PANNO ? projectdata[res].PANNO : ""),password,(projectdata[res].CLIENTADDRESSLINE1 ? projectdata[res].CLIENTADDRESSLINE1 : ""),(projectdata[res].CLIENTADDRESSLINE2 ? projectdata[res].CLIENTADDRESSLINE2 : ""),(projectdata[res].CLIENTADDRESSLINE3 ? projectdata[res].CLIENTADDRESSLINE3 : ""),clientdistrict, clienttaluk, 318, 320, depttype,(projectdata[res].DEPARTMENTNAME ? projectdata[res].DEPARTMENTNAME : ""),dept, 324,(projectdata[res].CLIENTPINCODE ? projectdata[res].CLIENTPINCODE : "") ,0, 0,clientregion,(projectdata[res].GSTTANNO ? projectdata[res].GSTTANNO : "")); 
                                    console.log("client",client); 
                                    var project = new clientModel.project(0,(projectdata[res].PROJECTNO ? projectdata[res].PROJECTNO : ""),(projectdata[res].PROJECTNAME ? projectdata[res].PROJECTNAME : ""),projectdistrict, projectregion, projectstatus,(projectdata[res].PROJECTDESIGNATION ? projectdata[res].PROJECTDESIGNATION : ""),(projectdata[res].PROJECTADDRESSLINE1 ? projectdata[res].PROJECTADDRESSLINE1 : ""),(projectdata[res].PROJECTADDRESSLINE2 ? projectdata[res].PROJECTADDRESSLINE2 : ""),(projectdata[res].PROJECTADDRESSLINE3 ? projectdata[res].PROJECTADDRESSLINE3 : ""),(projectdata[res].PROJECTPINCODE ? projectdata[res].PROJECTPINCODE : ""),0, 0, projecttaluk, projectcategory, projectsubcategory, 1, (projectdata[res].CLAIMADDRESSLINE1 ? projectdata[res].CLAIMADDRESSLINE1 : ""),(projectdata[res].CLAIMADDRESSLINE2 ? projectdata[res].CLAIMADDRESSLINE2 : ""),(projectdata[res].CLAIMADDRESSLINE3 ? projectdata[res].CLAIMADDRESSLINE3 : ""),(projectdata[res].CLAIMPINCODE ? projectdata[res].CLAIMPINCODE : ""),(projectdata[res].TALLYNAME ? projectdata[res].TALLYNAME : ""),0,'','');
                                    
                                    var dts = new Date(projectdata[res].AGFROMDATE); 
                                    dts.setDate(dts.getDate() + 1);
                                    var startdates = moment(dts).format('YYYY-MM-DD');  

                                    var dtss = new Date(projectdata[res].AGTODATE);
                                    dtss.setDate(dtss.getDate() + 1);
                                    var enddates = moment(dtss).format('YYYY-MM-DD'); 

                                    var agreement = {
                                        clientid: 0,
                                        fromdate: startdates,
                                        todate: enddates,
                                        servicecharge: (projectdata[res].SERVICECHARGE ? projectdata[res].SERVICECHARGE : 0),
                                        wagetypeid: wgtype,
                                        wageyearid: wgyear,
                                        wageareaid: wgarea,
                                        agreementtypeid: agree,
                                        agreementstatusid: agsts,
                                        agtypeid: agtype,
                                        optionaltype: 0,
                                        tax: (projectdata[res].TOTALTAX ? projectdata[res].TOTALTAX : 0),
                                        changedby: 0,
                                        wagecategoryid: wagecategoryid,
                                        taxtype: 0
                                    };
        
                                    results.push({ 'client': client, 'project': project, 'agreement': agreement, 'vacancy': vacancyDetails });
                                } else {
                                    var rejj = 'Row ' + (projectdata[res].SNO) + ' - This ProjectNo is ' + (projectdata[res].PROJECTNO) + ' is already exists';
                                    if (rejectedDetails.length == 0) {
                                        rejjs += 'Row ' + (projectdata[res].SNO) + ' - This ProjectNo is ' + (projectdata[res].PROJECTNO) + ' is already exists';
                                    } else {
                                        rejjs += ', Row ' + (projectdata[res].SNO) + ' - This ProjectNo is ' + (projectdata[res].PROJECTNO) + ' is already exists';
                                    }
                                    // console.log('rejectedDetails',rejectedDetails);
                                    rejectedDetails.push(rejj);
                                }
                            } else {
                                var rejj = 'Row ' + (projectdata[res].SNO) + ' - ProjectNo / ClientName is Missing';
                                if (rejectedDetails.length == 0) {
                                    rejjs += 'Row ' + (projectdata[res].SNO) + ' - ProjectNo / ClientName is Missing';
                                } else {
                                    rejjs += ', Row ' + (projectdata[res].SNO) + ' - ProjectNo / ClientName is Missing';
                                }
                                rejectedDetails.push(rejj);
                            }
                            selectedDetails = [];
                            projectcount = 0;
                            resolve(selectedDetails);
                        } catch (error) {
                            reject(error);
                        }
                    }))
                } 

                app.promise.all(promises).then(function () { 
                    if (rejectedDetails.length == 0) {
                        clientDal.addBulkProjectDetails(results).then(function (output1) { 
                            try {
                                var errs = [];
                                errs.push(rejectedDetails);
                                rejjs = 'success';
                                errs.push(rejjs);
                                resolve(errs);
                            } catch(error) {
                                reject(error);
                            }
                        }).catch(function (err) {
                            reject(err);
                        });
                    } else {
                        var errs = [];
                        errs.push(rejectedDetails);
                        errs.push(rejjs);
                        resolve(errs);
                    }
                });
            } catch (error) {
                reject(error);
            }
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.downloadbulkproject = function () {
    return new app.promise(function (resolve, reject) {
        clientDal.downloadbulkproject().then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
} 
