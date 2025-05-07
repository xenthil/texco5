var fs = require('fs');
var app = require('./../app');
var nconf = require('./../Utils/EnvironmentUtil');
var employeeBal = require('./../BAL/employeeBAL');
var employeeModel = require('./../Model/employee');
var settingBal = require('./../BAL/settingBAL');
var filepathh = nconf.get('NODEERRORURL');
var logger = require('../DAL/logger').createLogger(filepathh);
logger.setLevel('debug');

module.exports = function (app) {
    /*
         Post Method to create employee
    */ 
    app.express.post('/api/employees', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
                var employee = new employeeModel.employee('null', request.body.employeeno, request.body.firstname, request.body.lastname, request.body.regionid, '', request.body.desigid, '', request.body.email, request.body.mobile, request.body.phone, request.body.doj, request.body.address, request.body.roleid, '', request.body.password, 1, request.body.changedby);
                console.log("employee", employee);
                employeeBal.createemployee(employee).then(function (result) {
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

    app.express.put('/api/employees', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
                var employee = new employeeModel.employee(request.body.employeeid, request.body.employeeno, request.body.firstname, request.body.lastname, request.body.regionid, '', request.body.desigid, '', request.body.email, request.body.mobile, request.body.phone, request.body.doj, request.body.address, request.body.roleid, '', request.body.password, 1, request.body.changedby);
                employeeBal.updateemployee(employee).then(function (result) {
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

    app.express.post('/api/employees/authenticate/', function (request, response) {     
	 	settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {  
                employeeBal.authenticate(request.body.userid, request.body.password).then(function (result) {
                    if (result) {
                        response.set('Content-Type', 'application/json');
                        response.status(200);
                        response.json(result);
                    }
                }).catch(function (err) {
                    response.set('Content-Type', 'application/json');
                    response.status(400);
                    response.json( "Error   -- " +err);
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

    app.express.delete('/api/employees', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
                employeeBal.updateemployeestatus(request.body.employeeid).then(function (result) {
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

    app.express.get('/api/employees', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
                employeeBal.getemployee(0).then(function (result) {
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

    app.express.get('/api/employees/:id', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
                employeeBal.getemployee(request.params.id).then(function (result) {
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

    app.express.post('/api/employees/forgotpassword', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
                employeeBal.forgotpassword(request.body.userid, request.body.changedby).then(function (result) {
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

    app.express.post('/api/employees/resetpassword', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
                employeeBal.resetpassword(request.body.token, request.body.verificationcode, request.body.password, request.body.changedby).then(function (result) {
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
         get Assistant managers from employee
    */
    app.express.get('/api/managers/', function (request, response) {
		settingBal.getAuthorizationTokenAdd(request.headers['authorization']).then(function (results) {
			if(results) {
                employeeBal.getmanagers().then(function (result) {
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

    app.express.post('/api/employees/wageout/', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
                employeeBal.getwageout().then(function (result) {
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

    app.express.post('/api/employees/changepassword', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
                employeeBal.changepassword(request.body.password, request.body.newpassword, request.body.changedby, request.body.employeeid).then(function (result) {
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

    app.express.post('/api/employees/authenticate/am/', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
                employeeBal.authenticateam(request.body.userid, request.body.password).then(function (result) {
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
     
    app.express.get('/api/loginsession/addvalue', function (request, response) {   
        // console.log('request.headers',request.query.atoken); 
		// settingBal.getAuthorizationToken(request.query.atoken).then(function (results) {
		// 	if(results) {
        //     } else {
        //         response.set('Content-Type', 'application/json');
        //         response.status(400);
        //         response.json("Error   -- Wrong Token");
        //     }
        // }).catch(function (err) {
        //     response.set('Content-Type', 'application/json');
        //     response.status(400);
        //     response.json("Error   -- " + err);
        // }); 
        employeeBal.addsessionvalue(request.query.atoken).then(function (result) {
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
    }); 

    app.express.get('/api/loginsession/removevalue', function (request, response) {
		// settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
		// 	if(results) {
        //     } else {
        //         response.set('Content-Type', 'application/json');
        //         response.status(400);
        //         response.json("Error   -- Wrong Token");
        //     }
        // }).catch(function (err) {
        //     response.set('Content-Type', 'application/json');
        //     response.status(400);
        //     response.json("Error   -- " + err);
        // }); 
        employeeBal.removesessionvalue(request.query.atoken).then(function (result) {
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
    }); 

    
    app.express.get('/api/member/logout', function (request, response) {

        var datas =" Date - "+ new Date() + "  - Logout member - Before Success - JobService.JS - Memberid - "+request.query.memberid+" Token Value - " +request.headers['authorization'] 
		logger.debug(datas);

		// settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
		// 	if(results) {
        //     } else {
        //         response.set('Content-Type', 'application/json');
        //         response.status(400);
        //         response.json("Error   -- Wrong Token");
        //     }
        // }).catch(function (err) {
        //     response.set('Content-Type', 'application/json');
        //     response.status(400);
        //     response.json("Error   -- " + err);
        // }); 
       // console.log(request.query.memberid);
        employeeBal.logout(request.query.memberid).then(function (result) {
            
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
    }); 
    

    
    app.express.get('/api/logoutmember', function (request, response) {
		
        employeeBal.logoutmember(request.query.texserno).then(function (result) {
            
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
    }); 


    app.express.get('/api/logoutallmembers', function (request, response) {
		
        employeeBal.logoutallmembers().then(function (result) {
            
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
    }); 

    
    app.express.get('/api/servicetest/addvalue', function (request, response) {   
        var fs = require("fs");
        var filepath = nconf.get('ERRORURL');
        var datas = " Date - "+ new Date() + "  -  " + request.query.value +" - "+ request.headers['authorization'] + "\r\n";
        var stream = fs.createWriteStream(filepath, {'flags': 'a'});
            stream.once('open', function(fd) {
            stream.write(datas);
        }); 
        response.set('Content-Type', 'application/json');
        response.status(200);
        response.json('success');
    }); 
}
