var vacancyBal = require('../BAL/newvacancyBAL');
var vacancyModel = require('../Model/newvacancy');
var nodeExcel = require('excel-export');
var ifsc = require('ifsc');
var settingBal = require('../BAL/settingBAL');
var crypto = require('crypto');
var CryptoJS = require("crypto-js");
var errorDAL = require('../DAL/errorDAL');
var nconf = require('../Utils/EnvironmentUtil');
var base64Key = nconf.get('BASE64KEY');
var iv = nconf.get('IV');
var fs = require("fs");
var filepaths = nconf.get('VACANCYERRORURL');
var stream = fs.createWriteStream(filepaths, {'flags': 'a'});
var filepathh = nconf.get('NODEERRORURL');
var logger = require('../DAL/logger').createLogger(filepathh);
logger.setLevel('debug');

module.exports = function (app) {
	
	

	app.express.post('/api/uploadapplydoc', function (request, response) {
		
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				var vacancy = new vacancyModel.newvacancy(request.body);
				// console.log('member', member);  
				console.log('retet',request.body);
				
							
				vacancyBal.uploadapplydoc(vacancy).then(function (result) {
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


	app.express.post('/api/newmemberapply', function (request, response) {
		
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				var vacancy = new vacancyModel.newvacancyform(request.body);
				var vacancymember = new vacancyModel.newvacancymember(request.body);
				// console.log('member', member);  

				console.log('retet',vacancy);
				
							
				vacancyBal.newmemberapply(vacancy,vacancymember).then(function (result) {
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


	
	app.express.get('/api/appliedvacancypdf', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
                vacancyBal.appliedvacancypdf(request.query.fromdate,request.query.todate,request.query.regionid).then(function (result) {
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


	app.express.get('/api/getseneriorityno', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
                vacancyBal.getseneriorityno(request.query.memberid).then(function (result) {
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

	app.express.get('/api/appliedvacancypdfdownload', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
                vacancyBal.appliedvacancypdfdownload(request.query.fromdate,request.query.todate,request.query.regionid).then(function (result) {
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



	app.express.get('/api/getvacancypdf', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
                vacancyBal.newvacancypdf().then(function (result) {
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

	
	app.express.get('/api/viewvacancypdf', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
                vacancyBal.viewvacancypdf().then(function (result) {
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



	app.express.post('/api/uploadnewvacancy', function (request, response) {
		
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				var vacancy = new vacancyModel.uploadnewvacancy(request.body);
				// console.log('member', member);  
				console.log('retet',request.body);
				
							
				vacancyBal.uploadnewvacancy(vacancy,request.body.vacancyid).then(function (result) {
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


    app.express.post('/api/job/vacancy/confirm', function (request, response) {
		
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				var vacancy = new vacancyModel.uploadnewvacancy(request.body);
				// console.log('member', member);  
				console.log('retet',request.body);
			//	return;
			
				vacancyBal.conirmvacancy(request.body.memberid,request.body.projectno,request.body.projectid,request.body.category,request.body.effectivedate,request.body.docid).then(function (result) {
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


	app.express.post('/api/job/addjobactivity', function (request, response) {
		
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				var job = new vacancyModel.addjobactivity(request.body);
				// console.log('member', member);  
				//console.log('retet',request.body);
			//	return;
			
				vacancyBal.addjobactivity(job,request.body.jobmasterid,request.body.docid).then(function (result) {
					console.log('result',result)
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

	app.express.post('/api/job/vacancy/amsconfirmwilling', function (request, response) {
		
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
			//	var vacancy = new vacancyModel.uploadnewvacancy(request.body);
			var job = new vacancyModel.addjobactivity(request.body);
			
			
				vacancyBal.amsconfirmwilling(job,request.body.docid).then(function (result) {
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
	})


	app.express.post('/api/job/vacancy/amsunmwilling', function (request, response) {
		
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				var vacancy = new vacancyModel.uploadnewvacancy(request.body);
				// console.log('member', member);  
				console.log('retet',request.body.data);
			//	return;
			
				vacancyBal.amsunmwilling(request.body.data).then(function (result) {
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
	})
	app.express.post('/api/job/vacancy/amsreject', function (request, response) {
		
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				var vacancy = new vacancyModel.uploadnewvacancy(request.body);
				// console.log('member', member);  
				console.log('retet',request.body.data);
			//	return;
			
				vacancyBal.amsreject(request.body.data).then(function (result) {
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
	})

    app.express.get('/api/memberinfovacancy', function (request, response) {  
		request.setTimeout(0);
		stream.once('open', function(fd) {
			stream.write(" Date - "+ new Date() + "  - Getting Person Details Service Call - Before Success - JobService.JS - TexcoNo - "+request.query.texserno+" Token Value - " +request.headers['authorization']);
		}); 
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				vacancyBal.getmemberinfologin(request.query.texserno).then(function (result) {  
					stream.once('open', function(fd) {
						stream.write(" Date - "+ new Date() + "  -  Getting Person Details Service Call - After Success - JobService.JS - TexcoNo - "+request.query.texserno+" Token Value - " +request.headers['authorization']);
					}); 
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



    app.express.get('/api/vacancy/projectlist', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {

               
                
                vacancyBal.getvacancyproject().then(function (result) {
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
