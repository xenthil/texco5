var agreementBal = require('./../BAL/agreementBAL');
var agreementModel = require('./../Model/agreement');
var settingBal = require('./../BAL/settingBAL');


module.exports = function (app) {
	/*
       Get Method Joposting Report
	*/
	app.express.get('/api/agreement/export', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				agreementBal.getjobpostingexport(request.query.closedate).then(function (result) {
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

	app.express.get('/api/agreementams/export', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				agreementBal.getagreementamsexport(request.query.regionid,request.query.fromdate,request.query.todate).then(function (result) {
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
       Get Method Agreement Report
  	*/
	app.express.get('/api/agreement/exportdetails', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				agreementBal.getagreementexport(request.query.agreementtypeid, request.query.agtypeid, request.query.agreementstatusid, request.query.wagetypeid, request.query.wageyearid, request.query.wageareaid).then(function (result) {
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
       Get Method Agreement
  */
	app.express.get('/api/agreement/expirylist', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				agreementBal.getagreementexpirylist().then(function (result) {
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
       Get Method Agreement
  */
	app.express.get('/api/agreement/', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				agreementBal.getagreement(0, request.query.regionid).then(function (result) {
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
       Get Method Agreement
  */
	app.express.get('/api/agreement/:agreementid', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				agreementBal.getagreement(request.query.agreementid, request.query.regionid).then(function (result) {
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

	app.express.get('/api/job/getagreement', function (request, response) {
		// console.log('request.query.agreementid',request.query.agreementid);
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				agreementBal.getagreement(request.query.agreementid, request.query.regionid).then(function (result) {
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

	
	app.express.get('/api/agreementprint/', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				agreementBal.agreementprint(request.query.agreementid, request.query.regionid).then(function (result) {
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
       Post Method to create Agreement
  */
	app.express.post('/api/agreement', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				var agreement = new agreementModel.agreement((request.body.clientid ? parseInt(request.body.clientid) : 0), request.body.fromdate, request.body.todate, request.body.servicecharge,(request.body.wagetypeid ? parseInt(request.body.wagetypeid) : 0), (request.body.wageyearid ? parseInt(request.body.wageyearid) : 0) , (request.body.wageareaid ? parseInt(request.body.wageareaid) : 0), (request.body.agreementstatusid ? parseInt(request.body.agreementstatusid) : 0), (request.body.agreementtypeid ? parseInt(request.body.agreementtypeid) : 0),(request.body.agtypeid ? parseInt(request.body.agtypeid) : 0), request.body.optionaltype,  request.body.tax, request.body.projects, request.body.changedby, (request.body.taxtype ? parseInt(request.body.taxtype) : 0),(request.body.wagecategoryid ? parseInt(request.body.wagecategoryid) : 0)); 
				agreementBal.createagreement(agreement).then(function (result) {
					if (result) {
						response.set('Content-Type', 'application/json');
						response.status(200);
						response.json(result);
					}
				}).catch(function (err) { 
					console.log('servicess-',err);
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
       put Method to update Agreement
  */
	app.express.put('/api/agreement', function (request, response) {

		console.log(request.body.edseperate);
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				if (request.body.roleid == 2) { 
					var agreement = new agreementModel.updateAMSagreement((request.body.agreementid ? parseInt(request.body.agreementid) : 0), request.body.fromdate, request.body.todate, (request.body.wagetypeid ? parseInt(request.body.wagetypeid) : 0), (request.body.wageyearid ? parseInt(request.body.wageyearid) : 0) , (request.body.wageareaid ? parseInt(request.body.wageareaid) : 0), (request.body.particularid ? parseInt(request.body.particularid) : 0), (request.body.agreementstatusid ? parseInt(request.body.agreementstatusid) : 0), (request.body.agtypeid ? parseInt(request.body.agtypeid) : 0), request.body.optionaltype, request.body.servicecharge, request.body.tax, (request.body.taxtype ? parseInt(request.body.taxtype) : 0), (request.body.amstatus ? parseInt(request.body.amstatus) : 0),(request.body.wagecategoryid ? parseInt(request.body.wagecategoryid) : 0),(request.body.agreementtypeid ? parseInt(request.body.agreementtypeid) : 0));
				} else {
					var agreement = new agreementModel.updateagreement((request.body.agreementid ? parseInt(request.body.agreementid) : 0), request.body.fromdate, request.body.todate, (request.body.wagetypeid ? parseInt(request.body.wagetypeid) : 0), (request.body.wageyearid ? parseInt(request.body.wageyearid) : 0) , (request.body.wageareaid ? parseInt(request.body.wageareaid) : 0), (request.body.particularid ? parseInt(request.body.particularid) : 0), (request.body.agreementstatusid ? parseInt(request.body.agreementstatusid) : 0), (request.body.agtypeid ? parseInt(request.body.agtypeid) : 0), request.body.optionaltype, request.body.servicecharge, request.body.tax, (request.body.taxtype ? parseInt(request.body.taxtype) : 0),(request.body.wagecategoryid ? parseInt(request.body.wagecategoryid) : 0),(request.body.agreementtypeid ? parseInt(request.body.agreementtypeid) : 0), (request.body.amstatus ? parseInt(request.body.amstatus) : 0),(request.body.edseperate ? parseInt(request.body.edseperate) : 0),(request.body.allowancetype1),(request.body.allowancevalue1 ? parseInt(request.body.allowancevalue1) : 0),(request.body.allowancetype2),(request.body.allowancevalue2 ? parseInt(request.body.allowancevalue2) : 0),(request.body.allowancetype3),(request.body.allowancevalue3 ? parseInt(request.body.allowancevalue3) : 0));
				} 


				// console.log('agreement', agreement); 
				
				agreementBal.updateagreement(agreement, (request.body.regionid ? parseInt(request.body.regionid) : 0),(request.body.projectid ? parseInt(request.body.projectid) : 0),(request.body.clientid ? parseInt(request.body.clientid) : 0),(request.body.agreementid ? parseInt(request.body.agreementid) : 0),(request.body.roleid ? parseInt(request.body.roleid) : 0)).then(function (result) {
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
       delete Method to update Agreement
  */
	app.express.delete('/api/agreement/:agreementid', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				agreementBal.updategreementstatus(request.params.agreementid).then(function (result) {
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
       Get Method Agreement by projectid
  */
	app.express.get('/api/agreement/project/:projectid', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				agreementBal.getagreementbyprojectid(request.params.projectid).then(function (result) {
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
       Post Method to create Agreement addendum
  */
	app.express.post('/api/agreement/addendum', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) { 
				var agreement = new agreementModel.amendagreement((request.body.agreementid ? parseInt(request.body.agreementid) : 0),(request.body.agreementinfoid ? parseInt(request.body.agreementinfoid) : 0), request.body.jobs,request.body.type);
				agreementBal.amendagreement(agreement).then(function (result) {
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

	app.express.post('/api/agreementams/addendum', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) { 
				var agreement = new agreementModel.amendagreement((request.body.agreementid ? parseInt(request.body.agreementid) : 0),(request.body.agreementinfoid ? parseInt(request.body.agreementinfoid) : 0), request.body.jobs,request.body.type);
				agreementBal.amendagreementams(agreement).then(function (result) {
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
	
	app.express.post('/api/agreement/updateaddendum', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				var agreement = new agreementModel.amendagreement((request.body.agreementid ? parseInt(request.body.agreementid) : 0),(request.body.agreementinfoid ? parseInt(request.body.agreementinfoid) : 0), request.body.jobs,request.body.type);
				agreementBal.updateaddendumagreement(agreement).then(function (result) {
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

	app.express.post('/api/agreement/approveaddendum', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				var agreement = new agreementModel.amendagreement((request.body.agreementid ? parseInt(request.body.agreementid) : 0),(request.body.agreementinfoid ? parseInt(request.body.agreementinfoid) : 0), request.body.jobs,request.body.type);
				agreementBal.updateaddendumagreements(agreement).then(function (result) {
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

	app.express.post('/api/agreement/approveaddendums', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				var agreement = new agreementModel.amendagreement((request.body.agreementid ? parseInt(request.body.agreementid) : 0),(request.body.agreementinfoid ? parseInt(request.body.agreementinfoid) : 0), request.body.jobs,request.body.type);
				agreementBal.approveaddendums(agreement).then(function (result) {
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
	
	app.express.post('/api/agreement/rejectaddendum', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				var agreement = new agreementModel.amendagreement((request.body.agreementid ? parseInt(request.body.agreementid) : 0),(request.body.agreementinfoid ? parseInt(request.body.agreementinfoid) : 0), request.body.jobs,request.body.type);
				agreementBal.rejectaddendumagreement(agreement).then(function (result) {
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
	
	app.express.post('/api/agreement/amsupdateaddendum', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				var agreement = new agreementModel.amendagreement((request.body.agreementid ? parseInt(request.body.agreementid) : 0),(request.body.agreementinfoid ? parseInt(request.body.agreementinfoid) : 0), request.body.jobs,request.body.type);
				agreementBal.updateaddendumamsagreement(agreement).then(function (result) {
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
       Get Method Agreement by projectid
  */
	app.express.get('/api/project/validate', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				agreementBal.checkagreement(request.query.projectid).then(function (result) {
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
       Remove Project from Agreement by projectid
  */
	app.express.delete('/api/agreement/agreementinfo/:agreementinfoid', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				agreementBal.updateprojectstatus(request.params.agreementinfoid).then(function (result) {
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
       Get Method Agreement
  */
	app.express.get('/api/agreement/expirylist/future', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				agreementBal.getagreementfutureexpirylist().then(function (result) {
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

	app.express.get('/api/agreement/expirylist/thirtydays', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				agreementBal.getagreementfutureexpirythirtylist().then(function (result) {
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

	app.express.get('/api/agreement/attendance/attendancelist', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				agreementBal.getattendancependinglist().then(function (result) {
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
       Get Method Agreement
  */
	app.express.get('/api/agreement/expirylist/future/region', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				agreementBal.getagreementfutureexpirylistbyregion(request.query.regionid).then(function (result) {
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
       Get Method Agreement
  */
	app.express.get('/api/agreement/expirylist/region', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				agreementBal.getagreementexpirylistbyregion(request.query.regionid).then(function (result) {
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

	app.express.post('/api/agreement/renew', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				var fromdate = new Date(request.body.fromdate);
				var todate = new Date(request.body.todate);
				agreementBal.agreementrenew(fromdate, todate, request.body.agreementid).then(function (result) {
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

	app.express.get('/api/job/amsagreement', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				agreementBal.getamsagreement(request.query.agreementid, request.query.regionid).then(function (result) {
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

	app.express.get('/api/job/amsjobsagreement', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				agreementBal.getamsagreementjobs(request.query.agreementid, request.query.regionid, request.query.agreementinfoid).then(function (result) {
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

	app.express.get('/api/job/amsaddendumsagreement', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				agreementBal.getamsagreementaddendum(request.query.agreementid, request.query.regionid, request.query.agreementinfoid).then(function (result) {
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

	app.express.post('/api/agreement/saveagreementprint', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				agreementBal.saveagreementprint(request.body.agreement, request.body.agreementid, request.body.agtype,request.body.agreementval).then(function (result) {
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

	app.express.post('/api/agreement/emailsend', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				agreementBal.sendAgreementDraft(request.body.clientemail).then(function (result) {
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

	app.express.get('/api/AgreementAMRejectOptions', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				agreementBal.getAMSAgreementReject(request.query.agreementid).then(function (result) {
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
