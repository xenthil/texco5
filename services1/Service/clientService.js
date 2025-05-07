var clientBal = require('./../BAL/clientBAL');
var clientModel = require('./../Model/client');
var settingBal = require('./../BAL/settingBAL');
var crypto = require('crypto');
var CryptoJS = require("crypto-js");
 
module.exports = function (app) {

    
    /* 
        get Invoice List
    */
    app.express.get('/api/client/invoiceList', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
                clientBal.getprojectInvoiceList(request.query.clientid,request.query.types).then(function (result) {
                    if (result) {
                        response.set('Content-Type', 'application/json');
                        response.status(200);
                        response.json(result);
                    }
                }).catch(function (err) {
                    response.set('Content-Type', 'application/json');
                    response.status(400);
                    response.json("Error   -- " + err);
                });
            } else {
                response.set('Content-Type', 'application/json');
                response.status(400);
                response.json("Error   -- Wrong Token");
            }
        }).catch(function (err) {
            response.set('Content-Type', 'application/json');
            response.status(400);
            response.json("Error   -- " + err);
        });
    });

    app.express.get('/api/job/get/printemployees', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
                clientBal.getEmployeesCountList(request.query.clientid,request.query.types).then(function (result) {
                    if (result) {
                        response.set('Content-Type', 'application/json');
                        response.status(200);
                        response.json(result);
                    }
                }).catch(function (err) {
                    response.set('Content-Type', 'application/json');
                    response.status(400);
                    response.json("Error   -- " + err);
                });
            } else {
                response.set('Content-Type', 'application/json');
                response.status(400);
                response.json("Error   -- Wrong Token");
            }
        }).catch(function (err) {
            response.set('Content-Type', 'application/json');
            response.status(400);
            response.json("Error   -- " + err);
        });
    });

    app.express.get('/api/clients/TotalInvoiceCount', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
                clientBal.getInvoicesCount(request.query.clientid).then(function (result) {
                    if (result) {
                        response.set('Content-Type', 'application/json');
                        response.status(200);
                        response.json(result);
                    }
                }).catch(function (err) {
                    response.set('Content-Type', 'application/json');
                    response.status(400);
                    response.json("Error   -- " + err);
                });
            } else {
                response.set('Content-Type', 'application/json');
                response.status(400);
                response.json("Error   -- Wrong Token");
            }
        }).catch(function (err) {
            response.set('Content-Type', 'application/json');
            response.status(400);
            response.json("Error   -- " + err);
        });
    });

    app.express.get('/api/client/bulkdownload', function (request, response) { 
        // console.log('test');
        settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
            if(results) {
                // console.log('test');
                clientBal.downloadbulkproject().then(function (result) {
                    if (result) {
                        response.set('Content-Type', 'application/json');
                        response.status(200);
                        response.json(result);
                    }
                }).catch(function (err) {
                    response.set('Content-Type', 'application/json');
                    response.status(400);
                    response.json("Error   -- " + err);
                });
            } else {
                response.set('Content-Type', 'application/json');
                response.status(400);
                response.json("Error   -- Wrong Token");
            }
        }).catch(function (err) {
            response.set('Content-Type', 'application/json');
            response.status(400);
            response.json("Error   -- " + err);
        });
    });
    
    app.express.get('/api/client/getclientDetails', function (request, response) { 
        // console.log('request.query.clientid',request.query.clientid);
        settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
            if(results) {
                clientBal.getclientdetailsbyid(request.query.clientid).then(function (result) {
                    if (result) {
                        response.set('Content-Type', 'application/json');
                        response.status(200);
                        response.json(result);
                    }
                }).catch(function (err) {
                    response.set('Content-Type', 'application/json');
                    response.status(400);
                    response.json("Error   -- " + err);
                });
            } else {
                response.set('Content-Type', 'application/json');
                response.status(400);
                response.json("Error   -- Wrong Token");
            }
        }).catch(function (err) {
            response.set('Content-Type', 'application/json');
            response.status(400);
            response.json("Error   -- " + err);
        });
    });

    /*
         get Client details export
    */ 
    app.express.get('/api/client/project/export', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
                clientBal.getprojectexport(request.query.regionid, request.query.statusid, request.query.districtid).then(function (result) {
                    if (result) {
                        response.set('Content-Type', 'application/json');
                        response.status(200);
                        response.json(result);
                    }
                }).catch(function (err) {
                    response.set('Content-Type', 'application/json');
                    response.status(400);
                    response.json("Error   -- " + err);
                });
            } else {
                response.set('Content-Type', 'application/json');
                response.status(400);
                response.json("Error   -- Wrong Token");
            }
        }).catch(function (err) {
            response.set('Content-Type', 'application/json');
            response.status(400);
            response.json("Error   -- " + err);
        });
    });
    
    app.express.get('/api/client/project_ams/export', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
                clientBal.getprojectamsexport(request.query.regionid,request.query.fromdate,request.query.todate).then(function (result) {
                    if (result) {
                        response.set('Content-Type', 'application/json');
                        response.status(200);
                        response.json(result);
                    }
                }).catch(function (err) {
                    response.set('Content-Type', 'application/json');
                    response.status(400);
                    response.json("Error   -- " + err);
                });
            } else {
                response.set('Content-Type', 'application/json');
                response.status(400);
                response.json("Error   -- Wrong Token");
            }
        }).catch(function (err) {
            response.set('Content-Type', 'application/json');
            response.status(400);
            response.json("Error   -- " + err);
        });
    }); 

    app.express.get('/api/client/export', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
                clientBal.getclientexport(request.query.regionid,request.query.fromdate,request.query.todate).then(function (result) {
                    if (result) {
                        response.set('Content-Type', 'application/json');
                        response.status(200);
                        response.json(result);
                    }
                }).catch(function (err) {
                    response.set('Content-Type', 'application/json');
                    response.status(400);
                    response.json("Error   -- " + err);
                });
            } else {
                response.set('Content-Type', 'application/json');
                response.status(400);
                response.json("Error   -- Wrong Token");
            }
        }).catch(function (err) {
            response.set('Content-Type', 'application/json');
            response.status(400);
            response.json("Error   -- " + err);
        });
    });
    
    /*
         Post Method to create clientproject
    */ 
    app.express.post('/api/client/project', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) { 
                var project = new clientModel.project((request.body.clientid ? parseInt(request.body.clientid) : 0), request.body.projectno, request.body.name, (request.body.districtid ? parseInt(request.body.districtid) : 0), (request.body.regionid ? parseInt(request.body.regionid) : 0), (request.body.statusid ? parseInt(request.body.statusid) : 0), request.body.designation, request.body.addressline1, request.body.addressline2, request.body.addressline3, request.body.pincode, request.body.changedby,0,(request.body.talukid ? parseInt(request.body.talukid) : 0),(request.body.categoryid ? parseInt(request.body.categoryid) : 0),(request.body.subcategoryid ? parseInt(request.body.subcategoryid) : 0), (request.body.addresstatus ? parseInt(request.body.addresstatus) : 0),request.body.claimaddressline1,request.body.claimaddressline2,request.body.claimaddressline3,request.body.claimpincode,request.body.tallyname,request.body.ismainproject,request.body.claimprojectnumber,request.body.claimprojectname); 
                var agtype = 0;
                if(request.body.roleid != 2) { 
                    var agtype = request.body.copyprojects;
                } 
                clientBal.createproject(project,agtype).then(function (result) {
                    if (result) {
                        response.set('Content-Type', 'application/json');
                        response.status(200);
                        response.json(result);
                    }
                }).catch(function (err) {
                    response.set('Content-Type', 'application/json');
                    response.status(400);
                    response.json("Error   -- " + err);
                });
            } else {
                response.set('Content-Type', 'application/json');
                response.status(400);
                response.json("Error   -- Wrong Token");
            }
        }).catch(function (err) {
            response.set('Content-Type', 'application/json');
            response.status(400);
            response.json("Error   -- " + err);
        });
    });
    
    /*
          Put Method to upadte clientproject
    */
    app.express.put('/api/client/project', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {  
                if(request.body.roleid == 2) {  
                    var project = new clientModel.projectams((request.body.projectid ? parseInt(request.body.projectid) : 0),(request.body.clientid ? parseInt(request.body.clientid) : 0), request.body.projectno, request.body.name, (request.body.districtid ? parseInt(request.body.districtid) : 0), (request.body.regionid ? parseInt(request.body.regionid) : 0), (request.body.statusid ? parseInt(request.body.statusid) : 0), request.body.designation, request.body.addressline1, request.body.addressline2, request.body.addressline3, request.body.pincode, request.body.changedby,(request.body.talukid ? parseInt(request.body.talukid) : 0),(request.body.categoryid ? parseInt(request.body.categoryid) : 0),(request.body.subcategoryid ? parseInt(request.body.subcategoryid) : 0));
                    console.log('project',project);
                } else { 
                    var project = new clientModel.project((request.body.clientid ? parseInt(request.body.clientid) : 0), request.body.projectno, request.body.name, (request.body.districtid ? parseInt(request.body.districtid) : 0), (request.body.regionid ? parseInt(request.body.regionid) : 0), (request.body.statusid ? parseInt(request.body.statusid) : 0), request.body.designation, request.body.addressline1, request.body.addressline2, request.body.addressline3, request.body.pincode, request.body.changedby, (request.body.amstatus ? parseInt(request.body.amstatus) : 0),(request.body.talukid ? parseInt(request.body.talukid) : 0),(request.body.categoryid ? parseInt(request.body.categoryid) : 0),(request.body.subcategoryid ? parseInt(request.body.subcategoryid) : 0), (request.body.addresstatus ? parseInt(request.body.addresstatus) : 0),request.body.claimaddressline1,request.body.claimaddressline2,request.body.claimaddressline3,request.body.claimpincode,request.body.tallyname,request.body.ismainproject,request.body.claimprojectnumber,request.body.claimprojectname);
                } 
                // console.log('request.body.projectid',request.body.projectid);
                clientBal.updateproject(project, (request.body.projectid ? parseInt(request.body.projectid) : 0),(request.body.roleid ? parseInt(request.body.roleid) : 0)).then(function (result) {
                    if (result) {
                        response.set('Content-Type', 'application/json');
                        response.status(200);
                        response.json(result);
                    }
                }).catch(function (err) {
                    response.set('Content-Type', 'application/json');
                    response.status(400);
                    response.json("Error   -- " + err);
                });
            } else {
                response.set('Content-Type', 'application/json');
                response.status(400);
                response.json("Error   -- Wrong Token");
            }
        }).catch(function (err) {
            response.set('Content-Type', 'application/json');
            response.status(400);
            response.json("Error   -- " + err);
        });
    });  

    app.express.put('/api/client/projectApproveSave', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {  
                var project = new clientModel.projectApprove((request.body.clientid ? parseInt(request.body.clientid) : 0), request.body.projectno, request.body.name, (request.body.districtid ? parseInt(request.body.districtid) : 0), (request.body.regionid ? parseInt(request.body.regionid) : 0), (request.body.statusid ? parseInt(request.body.statusid) : 0), request.body.designation, request.body.addressline1, request.body.addressline2, request.body.addressline3, request.body.pincode, request.body.changedby,(request.body.amstatus ? parseInt(request.body.amstatus) : 0),(request.body.talukid ? parseInt(request.body.talukid) : 0),(request.body.categoryid ? parseInt(request.body.categoryid) : 0),(request.body.subcategoryid ? parseInt(request.body.subcategoryid) : 0));
                clientBal.updateproject(project, (request.body.projectid ? parseInt(request.body.projectid) : 0),(request.body.roleid ? parseInt(request.body.roleid) : 0)).then(function (result) {
                    if (result) {
                        response.set('Content-Type', 'application/json');
                        response.status(200);
                        response.json(result);
                    }
                }).catch(function (err) {
                    response.set('Content-Type', 'application/json');
                    response.status(400);
                    response.json("Error   -- " + err);
                });
            } else {
                response.set('Content-Type', 'application/json');
                response.status(400);
                response.json("Error   -- Wrong Token");
            }
        }).catch(function (err) {
            response.set('Content-Type', 'application/json');
            response.status(400);
            response.json("Error   -- " + err);
        });
    });  
    
    /*
         get top 10 projects
    */
    app.express.get('/api/client/project/totalprojects', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
                clientBal.gettotalprojects().then(function (result) {
                    if (result) {
                        response.set('Content-Type', 'application/json');
                        response.status(200);
                        response.json(result);
                    }
                }).catch(function (err) {
                    response.set('Content-Type', 'application/json');
                    response.status(400);
                    response.json("Error   -- " + err);
                });
            } else {
                response.set('Content-Type', 'application/json');
                response.status(400);
                response.json("Error   -- Wrong Token");
            }
        }).catch(function (err) {
            response.set('Content-Type', 'application/json');
            response.status(400);
            response.json("Error   -- " + err);
        });
    });
    
    /*
          Delete Method to delete clientproject
    */
    app.express.delete('/api/client/project', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
                clientBal.updateprojectstatus(request.body.projectid).then(function (result) {
                    if (result) {
                        response.set('Content-Type', 'application/json');
                        response.status(200);
                        response.json(result);
                    }
                }).catch(function (err) {
                    response.set('Content-Type', 'application/json');
                    response.status(400);
                    response.json("Error   -- " + err);
                });
            } else {
                response.set('Content-Type', 'application/json');
                response.status(400);
                response.json("Error   -- Wrong Token");
            }
        }).catch(function (err) {
            response.set('Content-Type', 'application/json');
            response.status(400);
            response.json("Error   -- " + err);
        });
    });

    /*
         get project
    */
    app.express.get('/api/client/project', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {

                var encrypted = request.query.regionid; 
                var base64Key = CryptoJS.enc.Base64.parse("2b7e151738aed2a6abf7158809cf4f3c");
                var iv = CryptoJS.enc.Base64.parse("3ad77bb90d7a3770a89ecaf32466ef97");
                try {
                    var cipherParams = CryptoJS.lib.CipherParams.create({
                        ciphertext: CryptoJS.enc.Base64.parse(encrypted)
                    });
                    var decrypted = CryptoJS.AES.decrypt(cipherParams,base64Key,{ iv: iv });
                    descrString = decrypted.toString(CryptoJS.enc.Utf8);
                    console.log('decrypted='+ descrString);

                } catch(err) {
                    console.log('err = ' + err);
                }
                
                clientBal.getproject(0,request.query.regionid).then(function (result) {
                    if (result) {
                        response.set('Content-Type', 'application/json');
                        response.status(200);
                        response.json(result);
                    }
                }).catch(function (err) {
                    response.set('Content-Type', 'application/json');
                    response.status(400);
                    response.json("Error   -- " + err);
                });
            } else {
                response.set('Content-Type', 'application/json');
                response.status(400);
                response.json("Error   -- Wrong Token");
            }
        }).catch(function (err) {
            response.set('Content-Type', 'application/json');
            response.status(400);
            response.json("Error   -- " + err);
        });
    });

    app.express.get('/api/client/amsproject', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
                clientBal.getAMSproject(request.query.regionid,request.query.projectid).then(function (result) {
                    if (result) {
                        response.set('Content-Type', 'application/json');
                        response.status(200);
                        response.json(result);
                    }
                }).catch(function (err) {
                    response.set('Content-Type', 'application/json');
                    response.status(400);
                    response.json("Error   -- " + err);
                });
            } else {
                response.set('Content-Type', 'application/json');
                response.status(400);
                response.json("Error   -- Wrong Token");
            }
        }).catch(function (err) {
            response.set('Content-Type', 'application/json');
            response.status(400);
            response.json("Error   -- " + err);
        });
    });
    
    /*
         get project by projectid
    */
    app.express.get('/api/client/project/:projectid', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
                clientBal.getproject(request.params.projectid,0).then(function (result) {
                    if (result) {
                        response.set('Content-Type', 'application/json');
                        response.status(200);
                        response.json(result);
                    }
                }).catch(function (err) {
                    response.set('Content-Type', 'application/json');
                    response.status(400);
                    response.json("Error   -- " + err);
                });
            } else {
                response.set('Content-Type', 'application/json');
                response.status(400);
                response.json("Error   -- Wrong Token");
            }
        }).catch(function (err) {
            response.set('Content-Type', 'application/json');
            response.status(400);
            response.json("Error   -- " + err);
        });
    });
    
    /*
         get Client and member details for attendance
    */
    app.express.get('/api/client/attendance/export', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
                clientBal.getattendanceexport(request.query.clientid, request.query.projectid, request.query.monthandyear).then(function (result) {
                    if (result) {
                        response.set('Content-Type', 'application/json');
                        response.status(200);
                        response.json(result);
                    }
                }).catch(function (err) {
                    response.set('Content-Type', 'application/json');
                    response.status(400);
                    response.json("Error   -- " + err);
                });
            } else {
                response.set('Content-Type', 'application/json');
                response.status(400);
                response.json("Error   -- Wrong Token");
            }
        }).catch(function (err) {
            response.set('Content-Type', 'application/json');
            response.status(400);
            response.json("Error   -- " + err);
        });
    });
    
    /*
         Post Method to Import attendance
    */
    app.express.post('/api/client/attendance/import', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
                clientBal.importattendance(request.body.attendance).then(function (result) {
                    if (result) {
                        response.set('Content-Type', 'application/json');
                        response.status(200);
                        response.json(result);
                    }
                }).catch(function (err) {
                    response.set('Content-Type', 'application/json');
                    response.status(400);
                    response.json("Error   -- " + err);
                });
            } else {
                response.set('Content-Type', 'application/json');
                response.status(400);
                response.json("Error   -- Wrong Token");
            }
        }).catch(function (err) {
            response.set('Content-Type', 'application/json');
            response.status(400);
            response.json("Error   -- " + err);
        });
    });
    
    /*
         Post Method to create attendance  
    */  
    app.express.post('/api/client/attendance', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {  
                var attendance = new clientModel.attendance((request.body.clientid ? parseInt(request.body.clientid) : 0), (request.body.projectid ? parseInt(request.body.projectid) : 0), request.body.monthandyear, request.body.changedby, request.body.members,request.body.attendancetype);
                clientBal.createattendance(attendance, request.body.membersid, request.body.historyid,request.body.texcono,request.body.noofdays).then(function (result) {
                    if (result) {
                        response.set('Content-Type', 'application/json');
                        response.status(200);
                        response.json(result);
                    }
                }).catch(function (err) {
                    response.set('Content-Type', 'application/json');
                    response.status(400);
                    response.json("Error   -- " + err);
                });
            } else {
                response.set('Content-Type', 'application/json');
                response.status(400);
                response.json("Error   -- Wrong Token");
            }
        }).catch(function (err) {
            response.set('Content-Type', 'application/json');
            response.status(400);
            response.json("Error   -- " + err);
        });
    });
    
    ///*
    //      Put Method to upadte attendance
    //*/
    //app.express.put('/api/client/attendance', function (request, response) {
    //    var attendance = new clientModel.attendance(request.body.clientid, request.body.projectid, request.body.monthandyear,  request.body.changedby, request.body.members);
    //    clientBal.updateattendance(attendance).then(function (result) {
    //        if (result) {
    //            response.set('Content-Type', 'application/json');
    //            response.status(200);
    //            response.json(result);
    //        }
    //    }).catch(function (err) {
    //        response.set('Content-Type', 'application/json');
    //        response.status(400);
    //        response.json("Error   -- " + err);
    //    });
    //});
    
    /*
         get Client and member details for attendance
    */
    app.express.get('/api/client/attendance/:clientid', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
                clientBal.getclientdetails(request.params.clientid).then(function (result) {
                    if (result) {
                        response.set('Content-Type', 'application/json');
                        response.status(200);
                        response.json(result);
                    }
                }).catch(function (err) {
                    response.set('Content-Type', 'application/json');
                    response.status(400);
                    response.json("Error   -- " + err);
                });
            } else {
                response.set('Content-Type', 'application/json');
                response.status(400);
                response.json("Error   -- Wrong Token");
            }
        }).catch(function (err) {
            response.set('Content-Type', 'application/json');
            response.status(400);
            response.json("Error   -- " + err);
        });
    });  
    
    app.express.get('/api/client/attendancelist', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) { 
                clientBal.getclientdetailsList((request.query.clientid ? parseInt(request.query.clientid) : 0),(request.query.projectid ? parseInt(request.query.projectid) : 0), request.query.monthandyear).then(function (result) {
                    if (result) {
                        response.set('Content-Type', 'application/json');
                        response.status(200);
                        response.json(result);
                    }
                }).catch(function (err) {
                    response.set('Content-Type', 'application/json');
                    response.status(400);
                    response.json("Error   -- " + err);
                });
            } else {
                response.set('Content-Type', 'application/json');
                response.status(400);
                response.json("Error   -- Wrong Token");
            }
        }).catch(function (err) {
            response.set('Content-Type', 'application/json');
            response.status(400);
            response.json("Error   -- " + err);
        });
    });

    app.express.get('/api/client/attendancelistskip', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
                clientBal.getclientdetailsListSkip(request.query.clientid,request.query.projectid, request.query.monthandyear,request.query.skipmembersid).then(function (result) {
                    if (result) {
                        response.set('Content-Type', 'application/json');
                        response.status(200);
                        response.json(result);
                    }
                }).catch(function (err) {
                    response.set('Content-Type', 'application/json');
                    response.status(400);
                    response.json("Error   -- " + err);
                });
            } else {
                response.set('Content-Type', 'application/json');
                response.status(400);
                response.json("Error   -- Wrong Token");
            }
        }).catch(function (err) {
            response.set('Content-Type', 'application/json');
            response.status(400);
            response.json("Error   -- " + err);
        });
    });

    app.express.get('/api/client/attendancelistview', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
                clientBal.getclientdetailsListView(request.query.clientid,request.query.projectid, request.query.monthandyear, request.query.memberid).then(function (result) {
                    if (result) {
                        response.set('Content-Type', 'application/json');
                        response.status(200);
                        response.json(result);
                    }
                }).catch(function (err) {
                    response.set('Content-Type', 'application/json');
                    response.status(400);
                    response.json("Error   -- " + err);
                });
            } else {
                response.set('Content-Type', 'application/json');
                response.status(400);
                response.json("Error   -- Wrong Token");
            }
        }).catch(function (err) {
            response.set('Content-Type', 'application/json');
            response.status(400);
            response.json("Error   -- " + err);
        });
    });

    
    ///*
    //     Delete Method to delete
    //*/
    //app.express.delete('/api/client/attendance', function (request, response) {
    //    clientBal.updateattendancestatus(request.body.attendanceid).then(function (result) {
    //        if (result) {
    //            response.set('Content-Type', 'application/json');
    //            response.status(200);
    //            response.json(result);
    //        }
    //    }).catch(function (err) {
    //        response.set('Content-Type', 'application/json');
    //        response.status(400);
    //        response.json("Error   -- " + err);
    //    });
    //});
    
    /*
         get  details for attendancedetails
    */ 
    app.express.get('/api/client/attendancedetails', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
                clientBal.getattendance(request.query.clientid,request.query.projectid, request.query.monthandyear).then(function (result) {
                
                    if (result) {
                        response.set('Content-Type', 'application/json');
                        response.status(200);
                        response.json(result);
                    }
                }).catch(function (err) {
                    response.set('Content-Type', 'application/json');
                    response.status(400);
                    response.json("Error   -- " + err);
                });
            } else {
                response.set('Content-Type', 'application/json');
                response.status(400);
                response.json("Error   -- Wrong Token");
            }
        }).catch(function (err) {
            response.set('Content-Type', 'application/json');
            response.status(400);
            response.json("Error   -- " + err);
        });
    });
    

    /*
         get   attendancedetails using clintid
    */
    app.express.get('/api/client/attendanceinfo', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
                clientBal.getclientattendance(request.query.clientid, request.query.projectid, request.query.monthandyear).then(function (result) {
                    if (result) {
                        response.set('Content-Type', 'application/json');
                        response.status(200);
                        response.json(result);
                    }
                }).catch(function (err) {
                    response.set('Content-Type', 'application/json');
                    response.status(400);
                    response.json("Error   -- " + err);
                });
            } else {
                response.set('Content-Type', 'application/json');
                response.status(400);
                response.json("Error   -- Wrong Token");
            }
        }).catch(function (err) {
            response.set('Content-Type', 'application/json');
            response.status(400);
            response.json("Error   -- " + err);
        });
    });
    
    /*
         get Client and member details for attendance
    */
    app.express.get('/api/client/attendancedetails/:clientid', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
                clientBal.getattendance(request.params.clientid).then(function (result) {
                    if (result) {
                        response.set('Content-Type', 'application/json');
                        response.status(200);
                        response.json(result);
                    }
                }).catch(function (err) {
                    response.set('Content-Type', 'application/json');
                    response.status(400);
                    response.json("Error   -- " + err);
                });
            } else {
                response.set('Content-Type', 'application/json');
                response.status(400);
                response.json("Error   -- Wrong Token");
            }
        }).catch(function (err) {
            response.set('Content-Type', 'application/json');
            response.status(400);
            response.json("Error   -- " + err);
        });
    });
    
    /*
         Post Method to create client
    */
    app.express.post('/api/client', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {  
                var client = new clientModel.client(0, request.body.organization, request.body.contactname, request.body.image, request.body.email, request.body.mobile, request.body.phone, request.body.gstno, request.body.tanno, request.body.panno, request.body.password, request.body.addressline1, request.body.addressline2, request.body.addressline3, (request.body.districtid ? parseInt(request.body.districtid) : 0),  (request.body.talukid ? parseInt(request.body.talukid) : 0),(request.body.stateid ? parseInt(request.body.stateid) : 0),(request.body.countryid ? parseInt(request.body.countryid) : 0),(request.body.departmenttypeid ? parseInt(request.body.departmenttypeid) : 0),request.body.department,(request.body.deptid ? parseInt(request.body.deptid) : 0),(request.body.approvalid ? parseInt(request.body.approvalid) : 0),request.body.pincode, request.body.changedby,0,(request.body.regionid ? parseInt(request.body.regionid) : 0),request.body.gsttanno); 

                clientBal.createclient(client).then(function (result) {
                    if (result) {
                        response.set('Content-Type', 'application/json');
                        response.status(200);
                        response.json(result);
                    }
                }).catch(function (err) {
                    response.set('Content-Type', 'application/json');
                    response.status(400);
                    response.json("Error   -- " + err);
                });
            } else {
                response.set('Content-Type', 'application/json');
                response.status(400);
                response.json("Error   -- Wrong Token");
            }
        }).catch(function (err) {
            response.set('Content-Type', 'application/json');
            response.status(400);
            response.json("Error   -- " + err);
        });
    });

    /*
         Post Method to get invoice
    */
    app.express.post('/api/client/ApproveInvoice', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
                clientBal.ApproveInvoice(request.body.status, request.body.invoiceid).then(function (result) {
                    if (result=='success') {
                        response.set('Content-Type', 'application/json');
                        response.status(200);
                        response.json(result);
                    }
                }).catch(function (err) {
                    response.set('Content-Type', 'application/json');
                    response.status(400);
                    response.json("Error   -- " + err);
                });
            } else {
                response.set('Content-Type', 'application/json');
                response.status(400);
                response.json("Error   -- Wrong Token");
            }
        }).catch(function (err) {
            response.set('Content-Type', 'application/json');
            response.status(400);
            response.json("Error   -- " + err);
        });
    });
    
    app.express.post('/api/client/AddInvoiceUTRNo', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
                clientBal.AddInvoiceUTRNo(request.body.utrno,request.body.paidamount,request.body.invoiceid,request.body.paidamounts,request.body.paymentutrnos).then(function (result) {
                    if (result=='success') {
                        response.set('Content-Type', 'application/json');
                        response.status(200);
                        response.json(result);
                    }
                }).catch(function (err) {
                    response.set('Content-Type', 'application/json');
                    response.status(400);
                    response.json("Error   -- " + err);
                });
            } else {
                response.set('Content-Type', 'application/json');
                response.status(400);
                response.json("Error   -- Wrong Token");
            }
        }).catch(function (err) {
            response.set('Content-Type', 'application/json');
            response.status(400);
            response.json("Error   -- " + err);
        });
    });
    

    /*
         Put Method to Update Client
    */
    app.express.put('/api/client', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
                if(request.body.roleid == 2) {
                    var client = new clientModel.clientAMS((request.body.clientid ? parseInt(request.body.clientid) : 0) , request.body.organization, request.body.contactname, request.body.image, request.body.email, request.body.mobile, request.body.phone, request.body.gstno, request.body.tanno, request.body.panno, request.body.password, request.body.addressline1, request.body.addressline2, request.body.addressline3, (request.body.districtid ? parseInt(request.body.districtid) : 0),  (request.body.talukid ? parseInt(request.body.talukid) : 0),(request.body.stateid ? parseInt(request.body.stateid) : 0),(request.body.countryid ? parseInt(request.body.countryid) : 0),(request.body.departmenttypeid ? parseInt(request.body.departmenttypeid) : 0), request.body.department,(request.body.deptid ? parseInt(request.body.deptid) : 0),(request.body.approvalid ? parseInt(request.body.approvalid) : 0),request.body.pincode, request.body.changedby,(request.body.regionid ? parseInt(request.body.regionid) : 0),request.body.gsttanno,1);
                    console.log('clientams',client);
                } else {
                    var client = new clientModel.client((request.body.clientid ? parseInt(request.body.clientid) : 0), request.body.organization, request.body.contactname, request.body.image, request.body.email, request.body.mobile, request.body.phone, request.body.gstno, request.body.tanno, request.body.panno, request.body.password, request.body.addressline1, request.body.addressline2, request.body.addressline3, request.body.districtid, (request.body.talukid ? parseInt(request.body.talukid) : 0),(request.body.stateid ? parseInt(request.body.stateid) : 0),(request.body.countryid ? parseInt(request.body.countryid) : 0),(request.body.departmenttypeid ? parseInt(request.body.departmenttypeid) : 0), request.body.department, (request.body.deptid ? parseInt(request.body.deptid) : 0),(request.body.approvalid ? parseInt(request.body.approvalid) : 0),request.body.pincode, request.body.changedby,(request.body.amstatus ? parseInt(request.body.amstatus) : 0),(request.body.regionid ? parseInt(request.body.regionid) : 0),request.body.gsttanno);
                }  
                clientBal.updateclient(client,request.body.roleid,request.body.clientid).then(function (result) {
                    if (result) {
                        response.set('Content-Type', 'application/json');
                        response.status(200);
                        response.json(result);
                    }
                }).catch(function (err) {
                    response.set('Content-Type', 'application/json');
                    response.status(400);
                    response.json("Error   -- " + err);
                });
            } else {
                response.set('Content-Type', 'application/json');
                response.status(400);
                response.json("Error   -- Wrong Token");
            }
        }).catch(function (err) {
            response.set('Content-Type', 'application/json');
            response.status(400);
            response.json("Error   -- " + err);
        });
    });
    
    app.express.post('/api/client/authenticate/', function (request, response) {
     
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
                clientBal.authenticate(request.body.userid, request.body.password).then(function (result) {
                    if (result) {
                        response.set('Content-Type', 'application/json');
                        response.status(200);
                        response.json(result);
                    }
                }).catch(function (err) {
                    response.set('Content-Type', 'application/json');
                    response.status(400);
                    response.json("Error   -- " + err);
                });
            } else {
                response.set('Content-Type', 'application/json');
                response.status(400);
                response.json("Error   -- Wrong Token");
            }
        }).catch(function (err) {
            response.set('Content-Type', 'application/json');
            response.status(400);
            response.json("Error   -- " + err);
        });
    });
    
    app.express.post('/api/client/forgotpassword', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
                clientBal.forgotpassword(request.body.userid, request.body.changedby).then(function (result) {
                    if (result) {
                        response.set('Content-Type', 'application/json');
                        response.status(200);
                        response.json(result);
                    }
                }).catch(function (err) {
                    response.set('Content-Type', 'application/json');
                    response.status(400);
                    response.json("Error   -- " + err);
                });
            } else {
                response.set('Content-Type', 'application/json');
                response.status(400);
                response.json("Error   -- Wrong Token");
            }
        }).catch(function (err) {
            response.set('Content-Type', 'application/json');
            response.status(400);
            response.json("Error   -- " + err);
        });
    });
    
    app.express.post('/api/client/resetpassword', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
                clientBal.resetpassword(request.body.token, request.body.verificationcode, request.body.password, request.body.changedby).then(function (result) {
                    if (result) {
                        response.set('Content-Type', 'application/json');
                        response.status(200);
                        response.json(result);
                    }
                }).catch(function (err) {
                    response.set('Content-Type', 'application/json');
                    response.status(400);
                    response.json("Error   -- " + err);
                });
            } else {
                response.set('Content-Type', 'application/json');
                response.status(400);
                response.json("Error   -- Wrong Token");
            }
        }).catch(function (err) {
            response.set('Content-Type', 'application/json');
            response.status(400);
            response.json("Error   -- " + err);
        });
    });
    
    app.express.post('/api/client/changepassword', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
                clientBal.changepassword(request.body.password, request.body.newpassword, request.body.changedby, request.body.clientid).then(function (result) {
                    if (result) {
                        response.set('Content-Type', 'application/json');
                        response.status(200);
                        response.json(result);
                        response.send();
                    }
                }).catch(function (err) {
                    response.set('Content-Type', 'application/json');
                    response.status(400);
                    response.json("Error   -- " + err);
                    response.send();
                });
            } else {
                response.set('Content-Type', 'application/json');
                response.status(400);
                response.json("Error   -- Wrong Token");
            }
        }).catch(function (err) {
            response.set('Content-Type', 'application/json');
            response.status(400);
            response.json("Error   -- " + err);
        });
    });
    
    /*
         get number of clients
    */
    app.express.get('/api/client/totalclients', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
                clientBal.getnumberofclients().then(function (result) {
                    if (result) {
                        response.set('Content-Type', 'application/json');
                        response.status(200);
                        response.json(result);
                    }
                }).catch(function (err) {
                    response.set('Content-Type', 'application/json');
                    response.status(400);
                    response.json("Error   -- " + err);
                });
            } else {
                response.set('Content-Type', 'application/json');
                response.status(400);
                response.json("Error   -- Wrong Token");
            }
        }).catch(function (err) {
            response.set('Content-Type', 'application/json');
            response.status(400);
            response.json("Error   -- " + err);
        });
    });
    
    /*
         get Client Approval 
    */
    app.express.get('/api/client/approval', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
                clientBal.approval(request.query.clientid, request.query.approvalid).then(function (result) {
                    if (result) {
                        response.set('Content-Type', 'application/json');
                        response.status(200);
                        response.json(result);
                    }
                }).catch(function (err) {
                    response.set('Content-Type', 'application/json');
                    response.status(400);
                    response.json("Error   -- " + err);
                });
            } else {
                response.set('Content-Type', 'application/json');
                response.status(400);
                response.json("Error   -- Wrong Token");
            }
        }).catch(function (err) {
            response.set('Content-Type', 'application/json');
            response.status(400);
            response.json("Error   -- " + err);
        });
    });
    
    /*
         Get Client by Approval pending
    */
    app.express.get('/api/client/approvals', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
                clientBal.getclientapprovals(request.query.lkvalid).then(function (result) {
                    if (result) {
                        response.set('Content-Type', 'application/json');
                        response.status(200);
                        response.json(result);
                    }
                }).catch(function (err) {
                    response.set('Content-Type', 'application/json');
                    response.status(400);
                    response.json("Error   -- " + err);
                });
            } else {
                response.set('Content-Type', 'application/json');
                response.status(400);
                response.json("Error   -- Wrong Token");
            }
        }).catch(function (err) {
            response.set('Content-Type', 'application/json');
            response.status(400);
            response.json("Error   -- " + err);
        });
    });
    
    /*
         get Client creation with Approval from admin  
    */
    app.express.get('/api/client/adminapproval', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
                clientBal.adminapproval(request.query.clientid).then(function (result) {
                    if (result) {
                        response.set('Content-Type', 'application/json');
                        response.status(200);
                        response.json(result);
                    }
                }).catch(function (err) {
                    response.set('Content-Type', 'application/json');
                    response.status(400);
                    response.json("Error   -- " + err);
                });
            } else {
                response.set('Content-Type', 'application/json');
                response.status(400);
                response.json("Error   -- Wrong Token");
            }
        }).catch(function (err) {
            response.set('Content-Type', 'application/json');
            response.status(400);
            response.json("Error   -- " + err);
        });
    });
    
    /*
         Delete Method to delete
    */
    app.express.delete('/api/client', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
                clientBal.updateclientstatus(request.body.clientid).then(function (result) {
                    if (result) {
                        response.set('Content-Type', 'application/json');
                        response.status(200);
                        response.json(result);
                    }
                }).catch(function (err) {
                    response.set('Content-Type', 'application/json');
                    response.status(400);
                    response.json("Error   -- " + err);
                });
            } else {
                response.set('Content-Type', 'application/json');
                response.status(400);
                response.json("Error   -- Wrong Token");
            }
        }).catch(function (err) {
            response.set('Content-Type', 'application/json');
            response.status(400);
            response.json("Error   -- " + err);
        });
    });
    
    /*
         get Client
    */
    app.express.get('/api/client/', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
                clientBal.getclient(0,request.query.regionid).then(function (result) {
                    if (result) {
                        response.set('Content-Type', 'application/json');
                        response.status(200);
                        response.json(result);
                    }
                }).catch(function (err) {
                    response.set('Content-Type', 'application/json');
                    response.status(400);
                    response.json("Error   -- " + err);
                });
            } else {
                response.set('Content-Type', 'application/json');
                response.status(400);
                response.json("Error   -- Wrong Token");
            }
        }).catch(function (err) {
            response.set('Content-Type', 'application/json');
            response.status(400);
            response.json("Error   -- " + err);
        });
    });

    app.express.get('/api/amsclient/', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
                clientBal.getamsclient(0,request.query.regionid).then(function (result) {
                    if (result) {
                        response.set('Content-Type', 'application/json');
                        response.status(200);
                        response.json(result);
                    }
                }).catch(function (err) {
                    response.set('Content-Type', 'application/json');
                    response.status(400);
                    response.json("Error   -- " + err);
                });
            } else {
                response.set('Content-Type', 'application/json');
                response.status(400);
                response.json("Error   -- Wrong Token");
            }
        }).catch(function (err) {
            response.set('Content-Type', 'application/json');
            response.status(400);
            response.json("Error   -- " + err);
        });
    });
    
    /*
         get Client by id
    */
    app.express.get('/api/client/:clientid', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
                clientBal.getclient(request.params.clientid,0).then(function (result) {
                    if (result) {
                        response.set('Content-Type', 'application/json');
                        response.status(200);
                        response.json(result);
                    }
                }).catch(function (err) {
                    response.set('Content-Type', 'application/json');
                    response.status(400);
                    response.json("Error   -- " + err);
                });
            } else {
                response.set('Content-Type', 'application/json');
                response.status(400);
                response.json("Error   -- Wrong Token");
            }
        }).catch(function (err) {
            response.set('Content-Type', 'application/json');
            response.status(400);
            response.json("Error   -- " + err);
        });
    });

    app.express.get('/api/amsclient/:clientid', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
                clientBal.getamsclient(request.params.clientid,0).then(function (result) {
                    if (result) {
                        response.set('Content-Type', 'application/json');
                        response.status(200);
                        response.json(result);
                    }
                }).catch(function (err) {
                    response.set('Content-Type', 'application/json');
                    response.status(400);
                    response.json("Error   -- " + err);
                });
            } else {
                response.set('Content-Type', 'application/json');
                response.status(400);
                response.json("Error   -- Wrong Token");
            }
        }).catch(function (err) {
            response.set('Content-Type', 'application/json');
            response.status(400);
            response.json("Error   -- " + err);
        });
    });
    
    /*
         get top 10 projects
    */
    app.express.get('/api/prjectnos', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
                clientBal.getprojectsno().then(function (result) {
                    if (result) {
                        response.set('Content-Type', 'application/json');
                        response.status(200);
                        response.json(result);
                    }
                }).catch(function (err) {
                    response.set('Content-Type', 'application/json');
                    response.status(400);
                    response.json("Error   -- " + err);
                });
            } else {
                response.set('Content-Type', 'application/json');
                response.status(400);
                response.json("Error   -- Wrong Token");
            }
        }).catch(function (err) {
            response.set('Content-Type', 'application/json');
            response.status(400);
            response.json("Error   -- " + err);
        });
    });

    app.express.get('/api/prjectnumbers', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
                clientBal.getprojectnumber(request.query.regionid).then(function (result) {
                    if (result) {
                        response.set('Content-Type', 'application/json');
                        response.status(200);
                        response.json(result);
                    }
                }).catch(function (err) {
                    response.set('Content-Type', 'application/json');
                    response.status(400);
                    response.json("Error   -- " + err);
                });
            } else {
                response.set('Content-Type', 'application/json');
                response.status(400);
                response.json("Error   -- Wrong Token");
            }
        }).catch(function (err) {
            response.set('Content-Type', 'application/json');
            response.status(400);
            response.json("Error   -- " + err);
        });
    });

    app.express.get('/api/clientDetailsforList', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
                clientBal.getclientDetailsforList(request.query.regionid).then(function (result) {
                    if (result) {
                        response.set('Content-Type', 'application/json');
                        response.status(200);
                        response.json(result);
                    }
                }).catch(function (err) {
                    response.set('Content-Type', 'application/json');
                    response.status(400);
                    response.json("Error   -- " + err);
                });  
            } else {
                response.set('Content-Type', 'application/json');
                response.status(400);
                response.json("Error   -- Wrong Token");
            }
        }).catch(function (err) {
            response.set('Content-Type', 'application/json');
            response.status(400);
            response.json("Error   -- " + err);
        });   
    });
    
    app.express.get('/api/prjectnos/byclientid', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
                clientBal.getprojectsnobyclient(request.query.clientid).then(function (result) {
                    if (result) {
                        response.set('Content-Type', 'application/json');
                        response.status(200);
                        response.json(result);
                    }
                }).catch(function (err) {
                    response.set('Content-Type', 'application/json');
                    response.status(400);
                    response.json("Error   -- " + err);
                });
            } else {
                response.set('Content-Type', 'application/json');
                response.status(400);
                response.json("Error   -- Wrong Token");
            }
        }).catch(function (err) {
            response.set('Content-Type', 'application/json');
            response.status(400);
            response.json("Error   -- " + err);
        });
    });
    
    /*
         get top 10 projects
    */
    app.express.get('/api/jobposting/prjectnos', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
                clientBal.getprojectsnoforjobposting().then(function (result) {
                    if (result) {
                        response.set('Content-Type', 'application/json');
                        response.status(200);
                        response.json(result);
                    }
                }).catch(function (err) {
                    response.set('Content-Type', 'application/json');
                    response.status(400);
                    response.json("Error   -- " + err);
                });
            } else {
                response.set('Content-Type', 'application/json');
                response.status(400);
                response.json("Error   -- Wrong Token");
            }
        }).catch(function (err) {
            response.set('Content-Type', 'application/json');
            response.status(400);
            response.json("Error   -- " + err);
        });
    });
    
    app.express.get('/api/clientimages', function (request, response) {
		settingBal.getAuthorizationTokenAdd(request.headers['authorization']).then(function (results) {
			if(results) {
                clientBal.clientimages().then(function (result) {
                    if (result) {
                        response.set('Content-Type', 'application/json');
                        response.status(200);
                        response.json(result);
                    }
                }).catch(function (err) {
                    response.set('Content-Type', 'application/json');
                    response.status(400);
                    response.json("Error   -- " + err);
                });
            } else {
                response.set('Content-Type', 'application/json');
                response.status(400);
                response.json("Error   -- Wrong Token");
            }
        }).catch(function (err) {
            response.set('Content-Type', 'application/json');
            response.status(400);
            response.json("Error   -- " + err);
        });
    });
    
    /*
         get   attendancedetails using clintid
    */
    app.express.get('/api/client/review/attendance', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
                clientBal.getattendancereview(request.query.clientid, request.query.projectid, request.query.monthandyear).then(function (result) {
                    if (result) {
                        response.set('Content-Type', 'application/json');
                        response.status(200);
                        response.json(result);
                    } 
                }).catch(function (err) {
                    response.set('Content-Type', 'application/json');
                    response.status(400);
                    response.json("Error   -- " + err);
                });
            } else {
                response.set('Content-Type', 'application/json');
                response.status(400);
                response.json("Error   -- Wrong Token");
            }
        }).catch(function (err) {
            response.set('Content-Type', 'application/json');
            response.status(400);
            response.json("Error   -- " + err);
        });
    });

    app.express.get('/api/client/review/attendanceview', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
                clientBal.getattendancereviewlist(request.query.clientid, request.query.projectid, request.query.monthandyear).then(function (result) {
                    if (result) {
                        response.set('Content-Type', 'application/json');
                        response.status(200);
                        response.json(result);
                    }
                }).catch(function (err) {
                    response.set('Content-Type', 'application/json');
                    response.status(400);
                    response.json("Error   -- " + err);
                });
            } else {
                response.set('Content-Type', 'application/json');
                response.status(400);
                response.json("Error   -- Wrong Token");
            }
        }).catch(function (err) {
            response.set('Content-Type', 'application/json');
            response.status(400);
            response.json("Error   -- " + err);
        });
    });
    
    /*
         get   attendancedetails using clintid
    */ 
    app.express.post('/api/client/review/attendance/status', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
                clientBal.updateattendnacestatus(request.body.clientid, request.body.projectid, request.body.monthandyear, request.body.status, request.body.expense, request.body.changedby, request.body.unedholdids,request.body.unholdids,request.body.unholdidstatus,request.body.unedholdidstatus).then(function (result) {
                    if (result) {
                        response.set('Content-Type', 'application/json');
                        response.status(200);
                        response.json(result);
                    }
                }).catch(function (err) {
                    response.set('Content-Type', 'application/json');
                    response.status(400);
                    response.json("Error   -- " + err);
                });
            } else {
                response.set('Content-Type', 'application/json');
                response.status(400);
                response.json("Error   -- Wrong Token");
            }
        }).catch(function (err) {
            response.set('Content-Type', 'application/json');
            response.status(400);
            response.json("Error   -- " + err);
        });
    });

    app.express.get('/api/client/edit/attendancedetails', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
                clientBal.getattendanceedit(request.query.projectid, request.query.monthandyear,request.query.edittype).then(function (result) {
                    if (result) {
                        response.set('Content-Type', 'application/json');
                        response.status(200);
                        response.json(result);
                    }
                }).catch(function (err) {
                    response.set('Content-Type', 'application/json');
                    response.status(400);
                    response.json("Error   -- " + err);
                });
            } else {
                response.set('Content-Type', 'application/json');
                response.status(400);
                response.json("Error   -- Wrong Token");
            }
        }).catch(function (err) {
            response.set('Content-Type', 'application/json');
            response.status(400);
            response.json("Error   -- " + err);
        });
    });
    
    app.express.get('/api/client/edit/editattendancedetails', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
                clientBal.geteditattendancedetails(request.query.projectid, request.query.monthandyear,request.query.clientid).then(function (result) {
                    if (result) {
                        response.set('Content-Type', 'application/json');
                        response.status(200);
                        response.json(result);
                    }
                }).catch(function (err) {
                    response.set('Content-Type', 'application/json');
                    response.status(400);
                    response.json("Error   -- " + err);
                });
            } else {
                response.set('Content-Type', 'application/json');
                response.status(400);
                response.json("Error   -- Wrong Token");
            }
        }).catch(function (err) {
            response.set('Content-Type', 'application/json');
            response.status(400);
            response.json("Error   -- " + err);
        });
    });

    app.express.get('/api/clients/dashboard', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
                clientBal.getclientdashboard(request.query.clientid).then(function (result) {
                    if (result) {
                        response.set('Content-Type', 'application/json');
                        response.status(200);
                        response.json(result);
                    }
                }).catch(function (err) {
                    response.set('Content-Type', 'application/json');
                    response.status(400);
                    response.json("Error   -- " + err);
                });
            } else {
                response.set('Content-Type', 'application/json');
                response.status(400);
                response.json("Error   -- Wrong Token");
            }
        }).catch(function (err) {
            response.set('Content-Type', 'application/json');
            response.status(400);
            response.json("Error   -- " + err);
        });
    });

    /*
         get   attendancedetails using clintid
    */
    app.express.get('/api/client/hold/attendance', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
                clientBal.getattendancehold(request.query.clientid).then(function (result) {
                    if (result) {
                        response.set('Content-Type', 'application/json');
                        response.status(200);
                        response.json(result);
                    }
                }).catch(function (err) {
                    response.set('Content-Type', 'application/json');
                    response.status(400);
                    response.json("Error   -- " + err);
                });
            } else {
                response.set('Content-Type', 'application/json');
                response.status(400);
                response.json("Error   -- Wrong Token");
            }
        }).catch(function (err) {
            response.set('Content-Type', 'application/json');
            response.status(400);
            response.json("Error   -- " + err);
        });
    });

    app.express.post('/api/client/hold/attendance', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
                clientBal.updateattendnacehold(request.body.clientid, request.body.projectid, request.body.monthandyear, request.body.status, request.body.holdids, request.body.unholdids, request.body.reason).then(function (result) {
                    if (result) {
                        response.set('Content-Type', 'application/json');
                        response.status(200);
                        response.json(result);
                    }
                }).catch(function (err) {
                    response.set('Content-Type', 'application/json');
                    response.status(400);
                    response.json("Error   -- " + err);
                });
            } else {
                response.set('Content-Type', 'application/json');
                response.status(400);
                response.json("Error   -- Wrong Token");
            }
        }).catch(function (err) {
            response.set('Content-Type', 'application/json');
            response.status(400);
            response.json("Error   -- " + err);
        });
    });

    app.express.post('/api/client/hold/attendance/eddays', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
                clientBal.updateattendnaceedhold(request.body.attendanceids, request.body.edhold, request.body.unedholdids).then(function (result) {
                    if (result) {
                        response.set('Content-Type', 'application/json');
                        response.status(200);
                        response.json(result);
                    }
                }).catch(function (err) {
                    response.set('Content-Type', 'application/json');
                    response.status(400);
                    response.json("Error   -- " + err);
                });
            } else {
                response.set('Content-Type', 'application/json');
                response.status(400);
                response.json("Error   -- Wrong Token");
            }
        }).catch(function (err) {
            response.set('Content-Type', 'application/json');
            response.status(400);
            response.json("Error   -- " + err);
        });
    });

    /*
         get  details for attendancedetails
    */
    app.express.get('/api/client/print/attendancedetails', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
                clientBal.getattendanceprint(request.query.projectid, request.query.monthandyear).then(function (result) {
                    if (result) {
                        response.set('Content-Type', 'application/json');
                        response.status(200);
                        response.json(result);
                    }
                }).catch(function (err) {
                    response.set('Content-Type', 'application/json');
                    response.status(400);
                    response.json("Error   -- " + err);
                });
            } else {
                response.set('Content-Type', 'application/json');
                response.status(400);
                response.json("Error   -- Wrong Token");
            }
        }).catch(function (err) {
            response.set('Content-Type', 'application/json');
            response.status(400);
            response.json("Error   -- " + err);
        });
    });

    app.express.post('/api/client/reserve/attendance', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
                clientBal.updateattendnaceedreserve(request.body.attendanceids, request.body.lreserve).then(function (result) {
                    if (result) {
                        response.set('Content-Type', 'application/json');
                        response.status(200);
                        response.json(result);
                    }
                }).catch(function (err) {
                    response.set('Content-Type', 'application/json');
                    response.status(400);
                    response.json("Error   -- " + err);
                });
            } else {
                response.set('Content-Type', 'application/json');
                response.status(400);
                response.json("Error   -- Wrong Token");
            }
        }).catch(function (err) {
            response.set('Content-Type', 'application/json');
            response.status(400);
            response.json("Error   -- " + err);
        });
    });

    app.express.post('/api/client/attendance/importfrombiometric', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
                clientBal.importattendancefrombiometric(request.body.employee,request.body.update).then(function (result) {
                    if (result) {
                        response.set('Content-Type', 'application/json');
                        response.status(200);
                        response.json(result);
                    }
                }).catch(function (err) {
                    response.set('Content-Type', 'application/json');
                    response.status(400);
                    response.json("Error   -- " + err);
                });
            } else {
                response.set('Content-Type', 'application/json');
                response.status(400);
                response.json("Error   -- Wrong Token");
            }
        }).catch(function (err) {
            response.set('Content-Type', 'application/json');
            response.status(400);
            response.json("Error   -- " + err);
        });
    });

    app.express.get('/api/jobposting/prjectnossearch/:projectid', function (request, response) {
        settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
            if(results) {
                clientBal.getprojectsnosearchforjobposting(request.params.projectid).then(function (result) {
                    if (result) {
                        response.set('Content-Type', 'application/json');
                        response.status(200);
                        response.json(result);
                    }
                }).catch(function (err) {
                    response.set('Content-Type', 'application/json');
                    response.status(400);
                    response.json("Error   -- " + err);
                });
            } else {
                response.set('Content-Type', 'application/json');
                response.status(400);
                response.json("Error   -- Wrong Token");
            }
        }).catch(function (err) {
            response.set('Content-Type', 'application/json');
            response.status(400);
            response.json("Error   -- " + err);
        });
    });

    app.express.get('/api/job/PostedMembers/', function (request, response) {
        settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
            if(results) {
                clientBal.getPostedMembersList(request.query.clientid).then(function (result) {
                    if (result) {
                        response.set('Content-Type', 'application/json');
                        response.status(200);
                        response.json(result);
                    }
                }).catch(function (err) {
                    response.set('Content-Type', 'application/json');
                    response.status(400);
                    response.json("Error   -- " + err);
                });
            } else {
                response.set('Content-Type', 'application/json');
                response.status(400);
                response.json("Error   -- Wrong Token");
            }
        }).catch(function (err) {
            response.set('Content-Type', 'application/json');
            response.status(400);
            response.json("Error   -- " + err);
        });
    });

    app.express.get('/api/job/ApprovedPostedMembers/', function (request, response) {
        settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
            if(results) {
                clientBal.getApprovedPostedMembersList(request.query.clientid).then(function (result) {
                    if (result) {
                        response.set('Content-Type', 'application/json');
                        response.status(200);
                        response.json(result);
                    }
                }).catch(function (err) {
                    response.set('Content-Type', 'application/json');
                    response.status(400);
                    response.json("Error   -- " + err);
                });
            } else {
                response.set('Content-Type', 'application/json');
                response.status(400);
                response.json("Error   -- Wrong Token");
            }
        }).catch(function (err) {
            response.set('Content-Type', 'application/json');
            response.status(400);
            response.json("Error   -- " + err);
        });
    });

    app.express.get('/api/job/AMPostedMembers/', function (request, response) {
        settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
            if(results) {
                clientBal.getAMPostedMembersList(request.query.regionid).then(function (result) {
                    if (result) {
                        response.set('Content-Type', 'application/json');
                        response.status(200);
                        response.json(result);
                    }
                }).catch(function (err) {
                    response.set('Content-Type', 'application/json');
                    response.status(400);
                    response.json("Error   -- " + err);
                });
            } else {
                response.set('Content-Type', 'application/json');
                response.status(400);
                response.json("Error   -- Wrong Token");
            }
        }).catch(function (err) {
            response.set('Content-Type', 'application/json');
            response.status(400);
            response.json("Error   -- " + err);
        });
    });


    app.express.get('/api/job/absentmembers/', function (request, response) {
        settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
            if(results) {
                clientBal.getAMPostedMembersList(request.query.regionid).then(function (result) {
                    if (result) {
                        response.set('Content-Type', 'application/json');
                        response.status(200);
                        response.json(result);
                    }
                }).catch(function (err) {
                    response.set('Content-Type', 'application/json');
                    response.status(400);
                    response.json("Error   -- " + err);
                });
            } else {
                response.set('Content-Type', 'application/json');
                response.status(400);
                response.json("Error   -- Wrong Token");
            }
        }).catch(function (err) {
            response.set('Content-Type', 'application/json');
            response.status(400);
            response.json("Error   -- " + err);
        });
    });

    app.express.get('/api/job/AMApprovedPostedMembers/', function (request, response) {
        settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
            if(results) {
                clientBal.getAMApprovedPostedMembersList(request.query.regionid).then(function (result) {
                    if (result) {
                        response.set('Content-Type', 'application/json');
                        response.status(200);
                        response.json(result);
                    }
                }).catch(function (err) {
                    response.set('Content-Type', 'application/json');
                    response.status(400);
                    response.json("Error   -- " + err);
                });
            } else {
                response.set('Content-Type', 'application/json');
                response.status(400);
                response.json("Error   -- Wrong Token");
            }
        }).catch(function (err) {
            response.set('Content-Type', 'application/json');
            response.status(400);
            response.json("Error   -- " + err);
        });
    });

    app.express.post('/api/job/ApproveJobs/', function (request, response) {
        settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
            if(results) {
                clientBal.ApprovePostedMembers(request.body.clientid,request.body.memberhistoryid,request.body.memberid,request.body.status).then(function (result) {
                    if (result) {
                        response.set('Content-Type', 'application/json');
                        response.status(200);
                        response.json(result);
                    }
                }).catch(function (err) {
                    response.set('Content-Type', 'application/json');
                    response.status(400);
                    response.json("Error   -- " + err);
                });
            } else {
                response.set('Content-Type', 'application/json');
                response.status(400);
                response.json("Error   -- Wrong Token");
            }
        }).catch(function (err) {
            response.set('Content-Type', 'application/json');
            response.status(400);
            response.json("Error   -- " + err);
        });
    });

    app.express.get('/api/job/amsclient/', function (request, response) {
        settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
            if(results) {
                clientBal.getAMSClient(request.query.clientid).then(function (result) {
                    console.log('result',result);
                    if (result) {
                        response.set('Content-Type', 'application/json');
                        response.status(200);
                        response.json(result);
                    }
                }).catch(function (err) {
                    response.set('Content-Type', 'application/json');
                    response.status(400);
                    response.json("Error   -- " + err);
                });
            } else {
                response.set('Content-Type', 'application/json');
                response.status(400);
                response.json("Error   -- Wrong Token");
            }
        }).catch(function (err) {
            response.set('Content-Type', 'application/json');
            response.status(400);
            response.json("Error   -- " + err);
        });
    });

    app.express.get('/api/projectDropDown/', function (request, response) {
        settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
            if(results) {
                clientBal.getprojectDropDownList().then(function (result) {
                    if (result) {
                        response.set('Content-Type', 'application/json');
                        response.status(200);
                        response.json(result);
                    }
                }).catch(function (err) {
                    response.set('Content-Type', 'application/json');
                    response.status(400);
                    response.json("Error   -- " + err);
                });
            } else {
                response.set('Content-Type', 'application/json');
                response.status(400);
                response.json("Error   -- Wrong Token");
            }
        }).catch(function (err) {
            response.set('Content-Type', 'application/json');
            response.status(400);
            response.json("Error   -- " + err);
        });
    });
    app.express.get('/api/clientDropDown/', function (request, response) {
        settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
            if(results) {
                clientBal.getclientDropDownList().then(function (result) {
                    if (result) {
                        response.set('Content-Type', 'application/json');
                        response.status(200);
                        response.json(result);
                    }
                }).catch(function (err) {
                    response.set('Content-Type', 'application/json');
                    response.status(400);
                    response.json("Error   -- " + err);
                }); 
            } else {
                response.set('Content-Type', 'application/json');
                response.status(400);
                response.json("Error   -- Wrong Token");
            }
        }).catch(function (err) {
            response.set('Content-Type', 'application/json');
            response.status(400);
            response.json("Error   -- " + err);
        });
    });

    app.express.get('/api/ProjectAgreementDetailsByID', function (request, response) {
        settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
            if(results) {
                clientBal.getClientAgreementDetails(request.query.projectid,request.query.clientid,request.query.monthandyear).then(function (result) {
                    if (result) {
                        response.set('Content-Type', 'application/json');
                        response.status(200);
                        response.json(result);
                    }
                }).catch(function (err) {
                    response.set('Content-Type', 'application/json');
                    response.status(400);
                    response.json("Error   -- " + err);
                });
            } else {
                response.set('Content-Type', 'application/json');
                response.status(400);
                response.json("Error   -- Wrong Token");
            }
        }).catch(function (err) {
            response.set('Content-Type', 'application/json');
            response.status(400);
            response.json("Error   -- " + err);
        });
    });

    app.express.get('/api/ProjectAMRejectOptions', function (request, response) {
        settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
            if(results) {
                clientBal.getAMSprojectReject(request.query.projectid).then(function (result) {
                    if (result) {
                        response.set('Content-Type', 'application/json');
                        response.status(200);
                        response.json(result);
                    }
                }).catch(function (err) {
                    response.set('Content-Type', 'application/json');
                    response.status(400);
                    response.json("Error   -- " + err);
                });
            } else {
                response.set('Content-Type', 'application/json');
                response.status(400);
                response.json("Error   -- Wrong Token");
            }
        }).catch(function (err) {
            response.set('Content-Type', 'application/json');
            response.status(400);
            response.json("Error   -- " + err);
        });
    });

    app.express.get('/api/ClientAMRejectOptions', function (request, response) {
        settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
            if(results) {
                clientBal.getAMSClientReject(request.query.clientid).then(function (result) {
                    if (result) {
                        response.set('Content-Type', 'application/json');
                        response.status(200);
                        response.json(result);
                    }
                }).catch(function (err) {
                    response.set('Content-Type', 'application/json');
                    response.status(400);
                    response.json("Error   -- " + err);
                });
            } else {
                response.set('Content-Type', 'application/json');
                response.status(400);
                response.json("Error   -- Wrong Token");
            }
        }).catch(function (err) {
            response.set('Content-Type', 'application/json');
            response.status(400);
            response.json("Error   -- " + err);
        });
    });

    /// category
    app.express.post('/api/client/addcategory/', function (request, response) {
        settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
            if(results) {
                var category = {
                    "maincategoryid": request.body.maincategoryid,
                    "categoryname": request.body.categoryname,
                    "changedby": Number(request.body.changedby)
                }
                clientBal.addcategory(category).then(function (result) {
                    console.log(result);
                    if (result) {
                        response.set('Content-Type', 'application/json');
                        response.status(200);
                        response.json(result);
                    }
                }).catch(function (err) {
                    console.log(err);
                    response.set('Content-Type', 'application/json');
                    response.status(400);
                    response.json("Error   -- " + err);
                });
            } else {
                response.set('Content-Type', 'application/json');
                response.status(400);
                response.json("Error   -- Wrong Token");
            }
        }).catch(function (err) {
            response.set('Content-Type', 'application/json');
            response.status(400);
            response.json("Error   -- " + err);
        });
    });

    app.express.post('/api/client/addsubcategory/', function (request, response) {
        settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
            if(results) {
                var subcategory = {
                    "categoryid": request.body.categoryid,
                    "subcategoryname": request.body.subcategoryname,
                    "changedby": Number(request.body.changedby)
                }
                clientBal.addsubcategory(subcategory).then(function (result) {
                    if (result) {
                        response.set('Content-Type', 'application/json');
                        response.status(200);
                        response.json(result);
                    }
                }).catch(function (err) {
                    response.set('Content-Type', 'application/json');
                    response.status(400);
                    response.json("Error   -- " + err);
                });
            } else {
                response.set('Content-Type', 'application/json');
                response.status(400);
                response.json("Error   -- Wrong Token");
            }
        }).catch(function (err) {
            response.set('Content-Type', 'application/json');
            response.status(400);
            response.json("Error   -- " + err);
        });
    });


    app.express.post('/api/client/getcategory/', function (request, response) {
        settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
            if(results) {
                clientBal.getcate().then(function (result) {
                    if (result) {
                        response.set('Content-Type', 'application/json');
                        response.status(200);
                        response.json(result);
                    }
                }).catch(function (err) {
                    response.set('Content-Type', 'application/json');
                    response.status(400);
                    response.json("Error   -- " + err);
                });
            } else {
                response.set('Content-Type', 'application/json');
                response.status(400);
                response.json("Error   -- Wrong Token");
            }
        }).catch(function (err) {
            response.set('Content-Type', 'application/json');
            response.status(400);
            response.json("Error   -- " + err);
        });
    });

    app.express.post('/api/client/getsubcategory/', function (request, response) {
        settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
            if(results) {
                clientBal.getsubcate(request.body.categoryid).then(function (result) {
                    if (result) {
                        response.set('Content-Type', 'application/json');
                        response.status(200);
                        response.json(result);
                    }
                }).catch(function (err) {
                    response.set('Content-Type', 'application/json');
                    response.status(400);
                    response.json("Error   -- " + err);
                });
            } else {
                response.set('Content-Type', 'application/json');
                response.status(400);
                response.json("Error   -- Wrong Token");
            }
        }).catch(function (err) {
            response.set('Content-Type', 'application/json');
            response.status(400);
            response.json("Error   -- " + err);
        });
    });

    app.express.get('/api/client/review/attendanceview', function (request, response) {
        settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
            if(results) {
                clientBal.getattendancereviewdetails(request.query.clientid, request.query.projectid, request.query.monthandyear).then(function (result) {
                    if (result) {
                        response.set('Content-Type', 'application/json');
                        response.status(200);
                        response.json(result);
                    }
                }).catch(function (err) {
                    response.set('Content-Type', 'application/json');
                    response.status(400);
                    response.json("Error   -- " + err);
                });
            } else {
                response.set('Content-Type', 'application/json');
                response.status(400);
                response.json("Error   -- Wrong Token");
            }
        }).catch(function (err) {
            response.set('Content-Type', 'application/json');
            response.status(400);
            response.json("Error   -- " + err);
        });
    });

    app.express.get('/api/attendance/duties/authorizestatus', function (request, response) {
        settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
            if(results) {
                clientBal.getattendanceauthorizestatus(request.query.fromdate, request.query.todate, request.query.regionid).then(function (result) {
                    if (result) {
                        response.set('Content-Type', 'application/json');
                        response.status(200);
                        response.json(result);
                    }
                }).catch(function (err) {
                    response.set('Content-Type', 'application/json');
                    response.status(400);
                    response.json("Error   -- " + err);
                });
            } else {
                response.set('Content-Type', 'application/json');
                response.status(400);
                response.json("Error   -- Wrong Token");
            }
        }).catch(function (err) {
            response.set('Content-Type', 'application/json');
            response.status(400);
            response.json("Error   -- " + err);
        });
    });

    app.express.get('/api/attendance/attendancependinglist', function (request, response) {
        settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
            if(results) {
                clientBal.getattendancependinglist(request.query.monthandyear,request.query.regionid).then(function (result) {
                    if (result) {
                        response.set('Content-Type', 'application/json');
                        response.status(200);
                        response.json(result);
                    }
                }).catch(function (err) {
                    response.set('Content-Type', 'application/json');
                    response.status(400);
                    response.json("Error   -- " + err);
                });
            } else {
                response.set('Content-Type', 'application/json');
                response.status(400);
                response.json("Error   -- Wrong Token");
            }
        }).catch(function (err) {
            response.set('Content-Type', 'application/json');
            response.status(400);
            response.json("Error   -- " + err);
        });
    });

    app.express.get('/api/attendance/salarycreatedstatus', function (request, response) {
        settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
            if(results) {
                clientBal.getsalarycreatedstatus(request.query.fromdate, request.query.todate, request.query.regionid).then(function (result) {
                    if (result) {
                        response.set('Content-Type', 'application/json');
                        response.status(200);
                        response.json(result);
                    }
                }).catch(function (err) {
                    response.set('Content-Type', 'application/json');
                    response.status(400);
                    response.json("Error   -- " + err);
                });
            } else {
                response.set('Content-Type', 'application/json');
                response.status(400);
                response.json("Error   -- Wrong Token");
            }
        }).catch(function (err) {
            response.set('Content-Type', 'application/json');
            response.status(400);
            response.json("Error   -- " + err);
        });
    }); 

    app.express.get('/api/attendance/salarynotcreatedstatus', function (request, response) {
        settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
            if(results) {
                clientBal.getsalarynotcreatedstatus(request.query.fromdate, request.query.todate, request.query.regionid).then(function (result) {
                    if (result) {
                        response.set('Content-Type', 'application/json');
                        response.status(200);
                        response.json(result);
                    }
                }).catch(function (err) {
                    response.set('Content-Type', 'application/json');
                    response.status(400);
                    response.json("Error   -- " + err);
                });
            } else {
                response.set('Content-Type', 'application/json');
                response.status(400);
                response.json("Error   -- Wrong Token");
            }
        }).catch(function (err) {
            response.set('Content-Type', 'application/json');
            response.status(400);
            response.json("Error   -- " + err);
        });
    });

    app.express.get('/api/attendance/attendancesubmittedstatus', function (request, response) {
        settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
            if(results) {
                clientBal.getattendancesubmittedstatus(request.query.fromdate, request.query.todate, request.query.regionid).then(function (result) {
                    if (result) {
                        response.set('Content-Type', 'application/json');
                        response.status(200);
                        response.json(result);
                    }
                }).catch(function (err) {
                    response.set('Content-Type', 'application/json');
                    response.status(400);
                    response.json("Error   -- " + err);
                });
            } else {
                response.set('Content-Type', 'application/json');
                response.status(400);
                response.json("Error   -- Wrong Token");
            }
        }).catch(function (err) {
            response.set('Content-Type', 'application/json');
            response.status(400);
            response.json("Error   -- " + err);
        });
    });  

    app.express.get('/api/attendance/salaryrejectedstatus', function (request, response) {
        settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
            if(results) {
                clientBal.getsalaryrejectedstatus(request.query.fromdate, request.query.todate, request.query.regionid).then(function (result) {
                    if (result) {
                        response.set('Content-Type', 'application/json');
                        response.status(200);
                        response.json(result);
                    }
                }).catch(function (err) {
                    response.set('Content-Type', 'application/json');
                    response.status(400);
                    response.json("Error   -- " + err);
                });
            } else {
                response.set('Content-Type', 'application/json');
                response.status(400);
                response.json("Error   -- Wrong Token");
            }
        }).catch(function (err) {
            response.set('Content-Type', 'application/json');
            response.status(400);
            response.json("Error   -- " + err);
        });
    });

    // Upload Project 
    app.express.post('/api/project/upload', function (request, response) { 
        request.setTimeout(0);
        settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
            if(results) {
                var projectdata = request.body.projectdata;
                clientBal.uploadProjectDetails(projectdata[0]).then(function (result) {
                    if (result) {
                        response.set('Content-Type', 'application/json');
                        response.status(200);
                        response.json(result);
                    }
                }).catch(function (err) {
                    response.set('Content-Type', 'application/json');
                    response.status(400);
                    response.json("Error   -- " + err);
                });
            } else {
                response.set('Content-Type', 'application/json');
                response.status(400);
                response.json("Error   -- Wrong Token");
            }
        }).catch(function (err) {
            response.set('Content-Type', 'application/json');
            response.status(400);
            response.json("Error   -- " + err);
        });
    });  

   

}