var jobBal = require('./../BAL/jobBAL');
var jobModel = require('./../Model/job');
var path = require('path');
var mime = require('mime');
var fs = require('fs');
const XmlReader = require('xml-reader');
var XMLWriter = require('xml-writer');
var js2xmlparser = require("js2xmlparser");
var nconf = require('./../Utils/EnvironmentUtil')
var moment = require('moment');
var settingBal = require('./../BAL/settingBAL');
var lookupvalueDal = require('../DAL/lookupvalueDAL');
var filepaths = nconf.get('VACANCYERRORURL');
var stream = fs.createWriteStream(filepaths, {'flags': 'a'});
var filepathh = nconf.get('NODEERRORURL');
var logger = require('../DAL/logger').createLogger(filepathh);
var cryptoUtil = require('./../Utils/cryptoutil');

logger.setLevel('debug');

module.exports = function (app) {

	/*
	     GET Method to get closedate
	*/ 
	app.express.get('/api/job/jobposting/updateinactivedate', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				jobBal.updateinactivedate(request.query.inactivedate).then(function (result) {
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
	     Get Method to Close vacancy list
	*/
	app.express.get('/api/job/jobposting/close', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				jobBal.closejobpostingdetail().then(function (result) {
					if (result) {
						response.set('Content-Type', 'application/json');
						response.status(200);
						response.json("Vacancy Closed Succesfully");
					} else {
						response.set('Content-Type', 'application/json');
						response.status(200);
						response.json("Vacancy Already Closed");
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
	     GET Method to get closedate
	*/
	app.express.get('/api/job/jobposting/closedate', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				jobBal.getclosedate().then(function (result) {
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
	     Get Method to export vacancy list
	*/
	app.express.get('/api/job/export/jobposting', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				jobBal.exportvacancy().then(function (result) {
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
	     Post Method to Import Data
	*/
	app.express.post('/api/job/import/jobposting/', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				jobBal.importvacancy(request.body.vacancy).then(function (result) {
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
	     Get Method jobactivity
	*/
	app.express.get('/api/job/jobactivity/applied', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				jobBal.getjobapplied(request.query.closedate).then(function (result) {
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
	    Returns job activities for the given member id
	*/
	app.express.get('/api/job/jobactivity/member', function (req, res) {
		const { memberid: memberId } = req.query;
    
		if (!memberId) {
			return handleErrorResponse(res, 400, "Member ID is required");
		}
		
		settingBal.getAuthorizationToken(req.headers['authorization']).then(function (results) {
			if(results) {
				jobBal.getjobappliedformember(memberId).then(function (result) {
					if (result) {
						handleSuccessResponse(res, result);
					}
				}).catch(function (err) {
					handleErrorResponse(res, 400, "Error processing request");
				});
			} else {
				handleErrorResponse(res, 401, "Authentication failed");
			}
		}).catch(function (err) {
			handleErrorResponse(res, 500, "Error processing request");
		});
	});

	/*
	     Get Method jobactivity by clientid
	*/
	app.express.get('/api/job/jobactivity/client', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				jobBal.getjobappliedforclient(request.query.clientid).then(function (result) {
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
	     Get Method jobposting
	*/
	app.express.get('/api/job/jobposting/detail', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {

				// AES Decryption added
				// var jobpostingdetailid = request.query.jobpostingdetailid.toString();
				// console.log('jobpostingdetailid: ' + jobpostingdetailid);

				// var decryptedJobpostingdetailid = cryptoUtil.dercyptAes(jobpostingdetailid);
				// console.log('jobpostingdetailid: ' + jobpostingdetailid, ', decryptedJobpostingdetailid: ' + decryptedJobpostingdetailid);

				jobBal.getjobpostingdetail(request.query.jobpostingdetailid).then(function (result) {
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
	     Post Method to create jobmaster
	*/
	app.express.post('/api/job/jobmaster', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				var jobmaster = new jobModel.jobmaster(request.body.code, request.body.name, request.body.workinghours, request.body.monthlywages, request.body.servicecharge, request.body.servicetax, request.body.comments, request.body.changedby);
				jobBal.createjobmaster(jobmaster).then(function (result) {
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
	     Put Method to update jobmaster
	*/
	app.express.put('/api/job/jobmaster', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				var jobmaster = new jobModel.jobmaster(request.body.code, request.body.name, request.body.workinghours, request.body.monthlywages, request.body.servicecharge, request.body.servicetax, request.body.comments, request.body.changedby);
				jobBal.updatejobmaster(jobmaster, request.body.jobmasterid).then(function (result) {
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
	     get jobmaster
	*/
	app.express.get('/api/job/jobmaster/', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				jobBal.getjobmaster(0).then(function (result) {
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
	     get jobmaster
	*/
	app.express.get('/api/job/jobmaster/:id', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				jobBal.getjobmaster(request.params.id).then(function (result) {
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
	app.express.delete('/api/job/jobmaster', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				jobBal.updatejobmasterstatus(request.body.jobmasterid).then(function (result) {
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
	    Post Method to invoice list
	*/
	app.express.get('/api/job/invoiceList', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				jobBal.getprojectInvoiceList().then(function (result) {
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

	app.express.get('/api/finance/invoiceListXML', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				jobBal.getprojectInvoiceListXML(request.query.monthandyear).then(function (result) {
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
        Post Method to invoice list
    */
	app.express.get('/api/job/ApprovedInvoices', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				jobBal.getApprovedInvoicesCount().then(function (result) {
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

	app.express.get('/api/job/TotalInvoices', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				jobBal.getTotalInvoicesCount().then(function (result) {
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

	app.express.get('/api/job/PendingInvoiceAmount', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				jobBal.getPendingInvoiceAmount().then(function (result) {
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

	app.express.get('/api/job/TotalInvoiceAmount', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				jobBal.getTotalInvoiceAmount().then(function (result) {
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
	     Post Method to create jobposting
	*/
	app.express.post('/api/job/jobposting', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) { 
				var jobposting = new jobModel.jobposting((request.body.clientid ? parseInt(request.body.clientid) : 0),(request.body.projectid ? parseInt(request.body.projectid) : 0), request.body.jobs, request.body.changedby, request.body.startdate);
				jobBal.createjobposting(jobposting).then(function (result) {
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
	     put Method to update jobposting
	*/
	app.express.put('/api/job/jobposting', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				jobBal.updatejobposting(request.body.jobs, request.body.changedby, request.body.jobpostingid).then(function (result) {
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
	     Post Method to update jobposting
	*/
	app.express.delete('/api/job/jobposting', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				jobBal.updatejobpostingstatus(request.body.jobpostingid).then(function (result) {
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
	     Get Method jobposting
	*/
	app.express.get('/api/job/jobposting/', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				jobBal.getjobposting(0).then(function (result) {
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
	     Get Method jobposting
	*/
	app.express.get('/api/job/jobposting/:jobpostingid', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				jobBal.getjobposting(request.params.jobpostingid).then(function (result) {
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
	     Post Method to create jobschedule
	*/
	app.express.post('/api/job/jobschedule', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				jobBal.createjobschedule(request.body.jobschedule, request.body.changedby).then(function (result) {
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
	     Post Method to create jobactivity
	*/
	app.express.post('/api/job/jobactivity', function (request, response) { 
		request.setTimeout(0);
		logger.debug(" Date - "+ new Date() + "  - Before Applying Job Service Call - Before Success - JobService.JS - IP - "+request.body.ipaddress+" Token Value - " +request.headers['authorization']+" - texcono - "+request.body.texcono);
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				var jobactivity = new jobModel.jobactivity(request.body.jobpostingdetailid, request.body.memberid, request.body.clientid, request.body.projectid, "", "", "", "", request.body.changedby); 
				jobBal.createjobactivity(jobactivity, request.body.code, request.body.inplace, request.body.othercat, request.body.ipaddress).then(function (result) {  
					logger.debug(" Date - "+ new Date() + "  - After Applying Job Service Call - After Success - JobService.JS - IP - "+request.body.ipaddress+" Token Value - " +request.headers['authorization']+" - texcono - "+request.body.texcono);
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
	     Post Method to create jobactivity change
	*/
	app.express.post('/api/job/jobactivityapply', function (request, response) { 
		request.setTimeout(0);
		//console.log(request.body.sessiondate);

		var sdate=request.body.ocxetd;
		
	 result ='';
	if(sdate != '' )
	{

	var startDate = moment(sdate, "YYYY/MM/DD HH:mm:ss");
	var currenDate = moment().format('YYYY/MM/DD HH:mm:ss');
	var endDate = moment(currenDate, "YYYY/MM/DD HH:mm:ss");
     result = endDate.diff(startDate, 'milliseconds');
	if(result ==0)
	{
		result =1;
	}

	var datas = "Date - "+ new Date() + "  - Applying more than one time  - JobService.JS - timediff - "+result+" Token Value - " +request.headers['authorization']+" - memberid - "+request.body.memberid;
		logger.debug(datas);

	console.log(result);
	}
     if(result == ''  || result > 30000  )
	 {
		
		var datas = "Date - "+ new Date() + "  - Before Applying Job Service Call - Before Success - JobService.JS - IP - "+request.body.ipaddress+" Token Value - " +request.headers['authorization']+" - memebrid - "+request.body.memberid;
		logger.debug(datas);
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				var jobactivity = new jobModel.jobactivity(request.body.jobpostingdetailid, request.body.memberid, request.body.clientid, request.body.projectid, request.body.currentvacancies,"", request.body.texcono, "", "", request.body.changedby); 
				jobBal.createjobactivitycode(jobactivity, request.body.code, request.body.inplace, request.body.othercat, request.body.ipaddress).then(function (result) {  
					var datas = " Date - "+ new Date() + "  - After Applying Job Service Call - After Success - JobService.JS - IP - "+request.body.ipaddress+" Token Value - " +request.headers['authorization']+" - texcono - "+request.body.texcono
					logger.debug(datas);
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
	}
	else
	{
		response.set('Content-Type', 'application/json');
		response.status(400);
		response.json("Error   -- " + 'Already applied vacancy in progress. Please try again after 1 minute.');
	}
	});

	/*
	     Post Method to update jobactivity
	*/
	app.express.post('/api/job/jobactivity/update', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				jobBal.updatejobactivity(request.body.jobactivityid, request.body.jobstatusid, request.body.comments).then(function (result) {
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
         Get Method for Vacancy list
    */
	app.express.get('/api/job/toplist', function (request, response) {   
		request.setTimeout(0);
		logger.debug(" Date - "+ new Date() + "  -  Home Screen Vacancy List \r\n");
		settingBal.getAuthorizationTokenAdd(request.headers['authorization']).then(function (results) {
			if(results) {

				jobBal.getVacancyViewStatus().then(function (vstatus) {
					//	console.log(vstatus);
						if(vstatus==1) {

				jobBal.getjoblist().then(function (result) {  
					logger.debug(" Date - "+ new Date() + "  -  Home Screen Vacancy List Backend After Success\r\n");
					// result = lookupvalueDal.encryptStringWithRsaPublicKey(result); 
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
				response.status(200);
				response.json([]);
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
         Get Method to get all Vacancy list
    */ 
	app.express.get('/api/job/list', function (request, response) { 
		request.setTimeout(0);
		logger.debug(" Date - "+ new Date() + "  - Before Vacancy Service Call - JobService.JS  \r\n Token Value - " +request.headers['authorization']);
		settingBal.getAuthorizationTokenAdd(request.headers['authorization']).then(function (results) {
			if(results) {

				jobBal.getVacancyViewStatus().then(function (vstatus) {
				//	console.log(vstatus);
					if(vstatus==1) {
				jobBal.getalljoblist().then(function (result) {
					logger.debug(" Date - "+ new Date() + "  - After Vacancy Success Service Call - JobService.JS  \r\n");
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
				response.status(200);
				response.json([]);
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
	     Get Method postedlist
	*/
	app.express.get('/api/job/postedlist', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				jobBal.getpostedlist().then(function (result) {
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
	     Post Method to update jobactivity
	*/
	app.express.post('/api/job/jobactivity/status', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) { 
				jobBal.updatejobactivitystatus((request.body.jobactivityid ? parseInt(request.body.jobactivityid) : 0), request.body.memberid, request.body.jobcode, request.body.confirmdate, request.body.isrejected).then(function (result) {
					if (result) {
						console.log(result);
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
         Get Method for print
    */
	app.express.get('/api/job/apply/print', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) { 
				console.log('request.headers',request.headers['authorization']);
				jobBal.getjobapplyprint(request.query.jobactivityid, request.query.memberid).then(function (result) {
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
	     Get Method for job posting print
	*/
	app.express.get('/api/job/posting/print', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				jobBal.getjobpostingprint(request.query.jobactivityid, request.query.memberid).then(function (result) {
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

	app.express.get('/api/job/apply/printpost', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				jobBal.getjobpostingprintpost(request.query.memberhistoryid).then(function (result) {
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
	     Get Method for closedate
	*/
	app.express.get('/api/job/jobpostingdate/close', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				jobBal.getjobpostingdate().then(function (result) {
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
	     Get Method for jobdetails  weekly update for graph
	*/
	app.express.get('/api/job/recruitment', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				jobBal.getrecruitment().then(function (result) {
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

	app.express.get('/api/job/ClientsCount', function (request, response) { console.log('request.headers',request.headers);
		jobBal.getClientCount().then(function (result) {
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

	app.express.get('/api/job/TotalInvoiceAmountss', function (request, response) {
		jobBal.TotalInvoiceAmountss().then(function (result) {
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

	/*
	     Get Method for client vacancydetails for graph
	*/
	app.express.get('/api/job/client/recruitment', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				jobBal.getclientrecruitment().then(function (result) {
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
	     Post Method for Approval attendance
	*/
	app.express.post('/api/attendance/approve', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				jobBal.approveattendance(request.body.attendance).then(function (result) {
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
	     Get Method for Invoice group by jobcode
	*/
	app.express.get('/api/attendance/duties', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				jobBal.getduties(request.query.monthandyear).then(function (result) {
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
	     Post Method for Invoice generation
	*/ 
	app.express.post('/api/attendance/invoice', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				jobBal.generateinvoice(request.body.projectid, request.body.monthandyear, request.body.clientid,request.body.status,request.body.billstatus).then(function (result) {
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
	     Get Method for Invoice generation
	*/ 
	app.express.get('/api/attendance/invoice', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				jobBal.getinvoice(request.query.invoiceno).then(function (result) {
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
	     Get Method for Invoice group by jobcode
	*/
	app.express.get('/api/attendance/invoice/report', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				jobBal.invoicereport(request.query.cientid, request.query.projectid, request.query.monthandyear).then(function (result) {
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
	     Post Method to update jobactivity
	*/
	app.express.post('/api/job/jobactivity/reject', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				jobBal.rejectemployer(request.body.jobactivityid).then(function (result) {
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
	     Get Method jobactivity
	*/ 
	app.express.get('/api/job/jobactivity/applied/report', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				jobBal.getjobappliedreport(request.query.closedate).then(function (result) {
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
	     Get Method jobactivity
	*/
	app.express.get('/api/job/jobactivity/employees', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				jobBal.getemployeesinjob().then(function (result) {
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
	     Post Method to update jobactivity
	*/
	app.express.post('/api/job/jobactivity/employee/resign', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				jobBal.employeeresign(request.body.jobactivityid, request.body.reason, request.body.resigndate, request.body.memberid).then(function (result) {
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
	     Get Method postedlist Report
	*/
	app.express.get('/api/job/postedlist/report', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				jobBal.getpostedlistreport(request.query.closedate).then(function (result) {
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
	     Post Method to update/edit jobposting
	*/
	app.express.post('/api/job/jobpostingdetail', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				jobBal.updatejobpostingdetail(request.body.jobs, request.body.changedby, request.body.jobpostingid, request.body.startdate).then(function (result) {
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
	     Post Method to update/edit jobposting
	*/
	app.express.post('/api/job/update/inplacecategory', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				var confirmdate = new Date(request.body.confirmdate); 
				jobBal.updateinplacecategory((request.body.jobactivityid ? parseInt(request.body.jobactivityid) : 0), request.body.inplace, request.body.category, request.body.changedby, confirmdate, request.body.jobpostingdetailid, request.body.jobinplace, request.body.isrejected).then(function (result) {
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
	     Post Method to cancel jobactivity
	*/
	app.express.post('/api/job/jobactivity/cancel', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				jobBal.canceljobactivity(request.body.jobactivityid, request.body.memberid, request.body.inplace, request.body.jobpostingdetailid,request.body.effectivedate,request.body.texcono).then(function (result) {
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
	     Post Method to cancel jobactivity
	*/
	app.express.post('/api/job/jobactivity/changeproject', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				jobBal.jobchangeproject(request.body.jobactivityid, request.body.memberid, request.body.canceljobactivityid).then(function (result) {
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
	     Post Method to cancel jobactivity
	*/
	app.express.get('/api/job/jobactivity/carryforward', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				jobBal.carryforward().then(function (result) {
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
	     Post Method to update jobactivity
	*/
	app.express.post('/api/job/openingdate', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				jobBal.updateopeningdate(request.body.openingdate).then(function (result) {
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
	     Get Method to opening date
	*/
	app.express.get('/api/job/openingdate', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				jobBal.getopeningdate().then(function (result) {
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
	     Get Method jobposting
	*/
	app.express.get('/api/job/carryforward/', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				jobBal.getcarryforward(0).then(function (result) {
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
	     Get Method carryforward export
	*/
	app.express.get('/api/job/carryforwardexport/', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				jobBal.getcarryforwardexport(0).then(function (result) {
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
	     Get Method jobposting
	*/
	app.express.post('/api/job/carryforward/add', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				var jobposting = new jobModel.jobposting(request.body.clientid, request.body.projectid, request.body.jobs, request.body.changedby, request.body.startdate);
				jobBal.createcarryforward(jobposting).then(function (result) {
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
	     Get Method jobposting
	*/
	app.express.get('/api/job/carryforward/delete', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) { 
				console.log('request.query.projectid',request.query.projectid);
				logger.debug(" Date - "+ new Date() + " - Carryforward  Service file Entry ProjectID - "+request.query.projectid);
				jobBal.deletecarryforward(request.query.projectid).then(function (result) {
					logger.debug(" Date - "+ new Date() + " - Carryforward  Service file Success - "+result);
					if (result) {
						response.set('Content-Type', 'application/json');
						response.status(200);
						response.json(result);
					}
				}).catch(function (err) {
					logger.debug(" Date - "+ new Date() + " - Carryforward  Service file Error - "+err);
					response.set('Content-Type', 'application/json');
					response.status(400);
					response.json("Error   -- " + err);
				});
			} else {
				logger.debug(" Date - "+ new Date() + " - Carryforward  Service file Token Error - "+err);
				response.set('Content-Type', 'application/json');
				response.status(400);
				response.json("Error   -- Wrong Token");
			}
		}).catch(function (err) {
			logger.debug(" Date - "+ new Date() + " - Carryforward  Service file Token Error - "+err);
			response.set('Content-Type', 'application/json');
			response.status(400);
			response.json("Error   -- " + err);
		});
	});

	/* Delete All Jobs */
	app.express.get('/api/job/carryforward/deleteall', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				jobBal.deletecarryforwardall(request.query.projectid).then(function (result) {
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
	     Get Method jobposting
	*/
	app.express.get('/api/job/carryforward/vacancy', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				jobBal.getforwardvacancy().then(function (result) {
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
	     Get Method jobposting
	*/
	app.express.get('/api/job/carryforward/move', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				jobBal.movevacancy().then(function (result) {
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
	     Get Method jobposting
	*/
	app.express.get('/api/job/salary/generation', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				jobBal.salarygeneration(request.query.projectid, request.query.monthandyear).then(function (result) {
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
	     Get Method jobposting
	*/
	app.express.post('/api/job/salary/generate', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				jobBal.generatesalary(request.body.projectid, request.body.monthandyear).then(function (result) {
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

	app.express.get('/api/job/get/payslip', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				jobBal.getpayslip(request.query.projectid, request.query.monthandyear, request.query.payslipno).then(function (result) {
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
	     Get Method for Invoice group by jobcode
	*/
	app.express.get('/api/attendance/duties/invoice', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				jobBal.getdutiesforinvoice(request.query.monthandyear).then(function (result) {
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
	     Get Method for Invoice group by jobcode
	*/
	app.express.get('/api/attendance/duties/authorize', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				jobBal.getdutiesforauthorize(request.query.monthandyear).then(function (result) {
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
	     Get Method jobposting
	*/
	app.express.post('/api/job/invoice/authorize', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				jobBal.authorizeinvoice(request.body.projectid, request.body.monthandyear).then(function (result) {
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

	app.express.get('/api/job/get/expayslip', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				jobBal.getexpayslip(request.query.salaryslipid).then(function (result) {
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

	app.express.get('/api/job/get/payslip/preview', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				jobBal.getpayslippreview(request.query.projectid, request.query.monthandyear).then(function (result) {
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

	app.express.get('/api/job/get/invoice/preview', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				jobBal.getinvoicepreview(request.query.projectid, request.query.monthandyear).then(function (result) {
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

	app.express.post('/api/job/invoice/reject', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				jobBal.rejectinvoice(request.body.projectid, request.body.monthandyear).then(function (result) {
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
	     Get Method for Invoice group by jobcode
	*/
	app.express.get('/api/attendance/duties/bankslip', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				jobBal.getdutiesforbankslip(request.query.monthandyear).then(function (result) {
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
	     Get Method jobposting
	*/
	app.express.post('/api/attendance/generate/bankslip', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				jobBal.generatebankslip(request.body.projectid, request.body.monthandyear).then(function (result) {
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
	     Get Method jobposting
	*/
	app.express.post('/api/finance/export/bankslip', function (request, response) {
		console.log(__dirname);
		
		// settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
		// 	if(results) {
		// jobBal.exportbankslip(request.body.monthandyear, request.body.projectid).then(function (result) {
		//     if (result) {
		//         var file = result.filepath;
		//         var filename = path.basename(file);
		//         var mimetype = mime.lookup(file);
		//         response.setHeader('Content-disposition', 'attachment; filename=' + filename);
		//         response.setHeader('Content-type', mimetype);
		//         var filestream = fs.createReadStream(file);
		//         filestream.pipe(response);
		//         // console.log(" result ", result.filename);
		//         // response.set('Content-Type', 'application/json')
		//         response.status(200);
		//         response.json(result.filename);
		//     }
		// }).catch(function (err) {
		//     response.set('Content-Type', 'application/json');
		//     response.status(400);
		//     response.json("Error   -- " + err);
		// });
		// 	} else {
		// 		response.set('Content-Type', 'application/json');
		// 		response.status(400);
		// 		response.json("Error   -- Wrong Token");
		// 	}
		// }).catch(function (err) {
		// 	response.set('Content-Type', 'application/json');
		// 	response.status(400);
		// 	response.json("Error   -- " + err);
		// });
	});

	app.express.post('/api/autherizedueamount', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				jobBal.autherizedueamount(request.body.projectid, request.body.monthandyear).then(function (result) {
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

	app.express.post('/api/getdueamount', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				jobBal.getdueamount(request.body.clientid, request.body.projectid, request.body.monthandyear, request.body.invoiceno).then(function (result) {
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

	app.express.post('/api/paydueamount', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				jobBal.paydueamount(request.body.clientid, request.body.projectid, request.body.monthandyear, request.body.invoiceno, request.body.amount, request.body.changedby).then(function (result) {
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

	app.express.post('/api/updatedueamount', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				jobBal.updatedueamount(request.body.dueid, request.body.changedby).then(function (result) {
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

	app.express.post('/api/exportxmltally', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				jobBal.exportxmltally(request.body.clientid, request.body.projectid, request.body.monthandyear, request.body.invoiceno).then(function (result) {
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

	app.express.post('/api/xmlreader', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				const reader = XmlReader.create();
				const xml = `<?xml version="1.0" encoding="UTF-8"?>
				<message>
					<to>Alice</to>
					<from>Bob</from>
					<heading color="blue">Hello</heading>
					<body color="red">This is a demo!</body>
				</message>`;

				reader.on('done', data => console.log(data));
				reader.parse(xml);
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

	app.express.post('/api/xmlwriter', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				var texcokeyword = 'TALLY HEADING';
				jobBal.exportxmltally(request.body.invoiceid, request.body.invoiceno, request.body.monthandyear, request.body.clientid, request.body.projectid).then(function (result) {
					jobBal.getCompanyName(texcokeyword).then(function (companyname) {
						var strSVCURRENTCOMPANY = companyname[0].value;
						console.log('result',result[0]);
						if (result) {
							var jobcode='';
							var servicetaxamount = result[0].servicetax / 2;
							if(result[0].jobmasterid == 1 || result[0].jobmasterid == 2 || result[j].jobmasterid == 4 || result[0].jobmasterid == 5)
								{
									 jobcode='s'
								}
								else
								{
									 jobcode='m'
								}

								
								var dt = new Date(result[0].monthandyear);
								var StartDate = moment(dt).startOf('month').format('MM');

							if (servicetaxamount) {
								var obj = {
									"HEADER": {
										"TALLYREQUEST": "Import Data"
									},
									"BODY": {
										"IMPORTDATA": {
											"REQUESTDESC": {
												"REPORTNAME": "Vouchers",
												"STATICVARIABLES": {
													"SVCURRENTCOMPANY": strSVCURRENTCOMPANY
												} //STATICVARIABLES END
											}, //REQUESTDESC END
											"REQUESTDATA": {
												"TALLYMESSAGE": [{
														"@": {
															"xmlns:UDF": "TallyUDF"
														},
														"VOUCHER": {
															"@": {
																"REMOTEID": "fdbc4460-756c-11d6-bd67-008048b5445e-000c618d",
																"VCHKEY": "fdbc4460-756c-11d6-bd67-008048b5445e-0000a930:00000078",
																"VCHTYPE": "INVOICE",
																"ACTION": "Create",
																"OBJVIEW": "Accounting Voucher View"
															},
															"OLDAUDITENTRYIDS.LIST": {
																"@": {
																	"TYPE": "Number"
																},
																"OLDAUDITENTRYIDS": "-1"
															},
															"DATE": result[0].createddate,
															"GUID": "fdbc4460-756c-11d6-bd67-008048b5445e-000c618d",
															"NARRATION": "Security claim for the month " + result[0].monthandyear,
															"VOUCHERTYPENAME": "INVOICE",
															"VOUCHERNUMBER": result[0].invoiceno,
															"PARTYLEDGERNAME": result[0].name,
															"CSTFORMISSUETYPE": "",
															"CSTFORMRECVTYPE": "",
															"FBTPAYMENTTYPE": "Default",
															"PERSISTEDVIEW": "Accounting Voucher View",
															"VCHGSTCLASS": "",
															"ENTEREDBY": "duraian",
															"DIFFACTUALQTY": "No",
															"ISMSTFROMSYNC": "No",
															"ASORIGINAL": "No",
															"AUDITED": "No",
															"FORJOBCOSTING": "No",
															"ISOPTIONAL": "No",
															"EFFECTIVEDATE": result[0].createddate,
															"USEFOREXCISE": "No",
															"ISFORJOBWORKIN": "No",
															"ALLOWCONSUMPTION": "No",
															"USEFORINTEREST": "No",
															"USEFORGAINLOSS": "No",
															"USEFORGODOWNTRANSFER": "No",
															"USEFORCOMPOUND": "No",
															"USEFORSERVICETAX": "No",
															"ISEXCISEVOUCHER": "No",
															"EXCISETAXOVERRIDE": "No",
															"USEFORTAXUNITTRANSFER": "No",
															"EXCISEOPENING": "No",
															"USEFORFINALPRODUCTION": "No",
															"ISTDSOVERRIDDEN": "No",
															"ISTCSOVERRIDDEN": "No",
															"ISTDSTCSCASHVCH": "No",
															"INCLUDEADVPYMTVCH": "No",
															"ISSUBWORKSCONTRACT": "No",
															"ISVATOVERRIDDEN": "No",
															"IGNOREORIGVCHDATE": "No",
															"ISSERVICETAXOVERRIDDEN": "No",
															"ISISDVOUCHER": "No",
															"ISEXCISEOVERRIDDEN": "No",
															"ISEXCISESUPPLYVCH": "No",
															"ISGSTOVERRIDDEN": "No",
															"GSTNOTEXPORTED": "No",
															"ISVATPRINCIPALACCOUNT": "No",
															"ISSHIPPINGWITHINSTATE": "No",
															"ISCANCELLED": "No",
															"HASCASHFLOW": "No",
															"ISPOSTDATED": "No",
															"USETRACKINGNUMBER": "No",
															"ISINVOICE": "No",
															"MFGJOURNAL": "No",
															"HASDISCOUNTS": "No",
															"ASPAYSLIP": "No",
															"ISCOSTCENTRE": "No",
															"ISSTXNONREALIZEDVCH": "No",
															"ISEXCISEMANUFACTURERON": "No",
															"ISBLANKCHEQUE": "No",
															"ISVOID": "No",
															"ISONHOLD": "No",
															"ORDERLINESTATUS": "No",
															"VATISAGNSTCANCSALES": "No",
															"VATISPURCEXEMPTED": "No",
															"ISVATRESTAXINVOICE": "No",
															"VATISASSESABLECALCVCH": "No",
															"ISVATDUTYPAID": "Yes",
															"ISDELIVERYSAMEASCONSIGNEE": "No",
															"ISDISPATCHSAMEASCONSIGNOR": "No",
															"ISDELETED": "No",
															"CHANGEVCHMODE": "No",
															"ALTERID": " 1530883",
															"MASTERID": " 811405",
															"VOUCHERKEY": "186023623524472",
															"EXCLUDEDTAXATIONS.LIST": "      ",
															"OLDAUDITENTRIES.LIST": "      ",
															"ACCOUNTAUDITENTRIES.LIST": "      ",
															"AUDITENTRIES.LIST": "      ",
															"DUTYHEADDETAILS.LIST": "      ",
															"SUPPLEMENTARYDUTYHEADDETAILS.LIST": "      ",
															"INVOICEDELNOTES.LIST": "      ",
															"INVOICEORDERLIST.LIST": "      ",
															"INVOICEINDENTLIST.LIST": "      ",
															"ATTENDANCEENTRIES.LIST": "      ",
															"ORIGINVOICEDETAILS.LIST": "      ",
															"INVOICEEXPORTLIST.LIST": "      ",
															///// for loop
															"ALLLEDGERENTRIES.LIST": [{
																	"OLDAUDITENTRYIDS.LIST": {
																		"@": {
																			"TYPE": "Number"
																		},
																		"OLDAUDITENTRYIDS": "-1"
																	},
																	"LEDGERNAME": result[0].name,
																	"GSTCLASS": "",
																	"ISDEEMEDPOSITIVE": "Yes",
																	"LEDGERFROMITEM": "No",
																	"REMOVEZEROENTRIES": "No",
																	"ISPARTYLEDGER": "Yes",
																	"ISLASTDEEMEDPOSITIVE": "Yes",
																	"AMOUNT": "-" + result[0].totalamount,
																	"VATEXPAMOUNT": "-" + result[0].totalamount,
																	"SERVICETAXDETAILS.LIST": "       ",
																	"BANKALLOCATIONS.LIST": "       ",
																	"BILLALLOCATIONS.LIST": {
																		"NAME":StartDate+'/'+  result[0].invoiceno + jobcode,
																		"BILLTYPE": "New Ref",
																		"TDSDEDUCTEEISSPECIALRATE": "No",
																		"AMOUNT": "-" + result[0].totalamount,
																		"INTERESTCOLLECTION.LIST": "      ",
																		"STBILLCATEGORIES.LIST": "      "
																	},
																	"INTERESTCOLLECTION.LIST": "       ",
																	"OLDAUDITENTRIES.LIST": "       ",
																	"ACCOUNTAUDITENTRIES.LIST": "       ",
																	"AUDITENTRIES.LIST": "       ",
																	"INPUTCRALLOCS.LIST": "       ",
																	"DUTYHEADDETAILS.LIST": "       ",
																	"EXCISEDUTYHEADDETAILS.LIST": "       ",
																	"RATEDETAILS.LIST": "       ",
																	"SUMMARYALLOCS.LIST": "       ",
																	"STPYMTDETAILS.LIST": "       ",
																	"EXCISEPAYMENTALLOCATIONS.LIST": "       ",
																	"TAXBILLALLOCATIONS.LIST": "       ",
																	"TAXOBJECTALLOCATIONS.LIST": "       ",
																	"TDSEXPENSEALLOCATIONS.LIST": "       ",
																	"VATSTATUTORYDETAILS.LIST": "       ",
																	"OSTTRACKALLOCATIONS.LIST": "       ",
																	"REFVOUCHERDETAILS.LIST": "       ",
																	"INVOICEWISEDETAILS.LIST": "       ",
																	"VATITCDETAILS.LIST": "       ",
																	"ADVANCETAXDETAILS.LIST": "       "
																},
																{
																	"OLDAUDITENTRYIDS.LIST": {
																		"@": {
																			"TYPE": "Number"
																		},
																		"OLDAUDITENTRYIDS": "-1"
																	},
																	"LEDGERNAME": "Revenue From Security Projects", //2nd
																	"GSTCLASS": "",
																	"ISDEEMEDPOSITIVE": "NO",
																	"LEDGERFROMITEM": "No",
																	"REMOVEZEROENTRIES": "No",
																	"ISPARTYLEDGER": "Yes",
																	"ISLASTDEEMEDPOSITIVE": "Yes",
																	"AMOUNT": result[0].subtotal,
																	"VATEXPAMOUNT": result[0].subtotal,
																	"SERVICETAXDETAILS.LIST": "       ",
																	"BANKALLOCATIONS.LIST": "       ",
																	"BILLALLOCATIONS.LIST": "       ",
																	"INTERESTCOLLECTION.LIST": "       ",
																	"OLDAUDITENTRIES.LIST": "       ",
																	"ACCOUNTAUDITENTRIES.LIST": "       ",
																	"AUDITENTRIES.LIST": "       ",
																	"INPUTCRALLOCS.LIST": "       ",
																	"DUTYHEADDETAILS.LIST": "       ",
																	"EXCISEDUTYHEADDETAILS.LIST": "       ",
																	"RATEDETAILS.LIST": "       ",
																	"SUMMARYALLOCS.LIST": "       ",
																	"STPYMTDETAILS.LIST": "       ",
																	"EXCISEPAYMENTALLOCATIONS.LIST": "       ",
																	"TAXBILLALLOCATIONS.LIST": "       ",
																	"TAXOBJECTALLOCATIONS.LIST": "       ",
																	"TDSEXPENSEALLOCATIONS.LIST": "       ",
																	"VATSTATUTORYDETAILS.LIST": "       ",
																	"OSTTRACKALLOCATIONS.LIST": "       ",
																	"REFVOUCHERDETAILS.LIST": "       ",
																	"INVOICEWISEDETAILS.LIST": "       ",
																	"VATITCDETAILS.LIST": "       ",
																	"ADVANCETAXDETAILS.LIST": "       "
																},
																{
																	"OLDAUDITENTRYIDS.LIST": {
																		"@": {
																			"TYPE": "Number"
																		},
																		"OLDAUDITENTRYIDS": "-1"
																	},
																	"LEDGERNAME": "State GST Payable", //3rd
																	"GSTCLASS": "",
																	"ISDEEMEDPOSITIVE": "NO",
																	"LEDGERFROMITEM": "No",
																	"REMOVEZEROENTRIES": "No",
																	"ISPARTYLEDGER": "Yes",
																	"ISLASTDEEMEDPOSITIVE": "Yes",
																	"AMOUNT": servicetaxamount,
																	"VATEXPAMOUNT": servicetaxamount,
																	"SERVICETAXDETAILS.LIST": "       ",
																	"BANKALLOCATIONS.LIST": "       ",
																	"BILLALLOCATIONS.LIST": "       ",
																	"INTERESTCOLLECTION.LIST": "       ",
																	"OLDAUDITENTRIES.LIST": "       ",
																	"ACCOUNTAUDITENTRIES.LIST": "       ",
																	"AUDITENTRIES.LIST": "       ",
																	"INPUTCRALLOCS.LIST": "       ",
																	"DUTYHEADDETAILS.LIST": "       ",
																	"EXCISEDUTYHEADDETAILS.LIST": "       ",
																	"RATEDETAILS.LIST": "       ",
																	"SUMMARYALLOCS.LIST": "       ",
																	"STPYMTDETAILS.LIST": "       ",
																	"EXCISEPAYMENTALLOCATIONS.LIST": "       ",
																	"TAXBILLALLOCATIONS.LIST": "       ",
																	"TAXOBJECTALLOCATIONS.LIST": "       ",
																	"TDSEXPENSEALLOCATIONS.LIST": "       ",
																	"VATSTATUTORYDETAILS.LIST": "       ",
																	"OSTTRACKALLOCATIONS.LIST": "       ",
																	"REFVOUCHERDETAILS.LIST": "       ",
																	"INVOICEWISEDETAILS.LIST": "       ",
																	"VATITCDETAILS.LIST": "       ",
																	"ADVANCETAXDETAILS.LIST": "       "
																},
																{
																	"OLDAUDITENTRYIDS.LIST": {
																		"@": {
																			"TYPE": "Number"
																		},
																		"OLDAUDITENTRYIDS": "-1"
																	},
																	"LEDGERNAME": "Central GST Payable", //3rd
																	"GSTCLASS": "",
																	"ISDEEMEDPOSITIVE": "NO",
																	"LEDGERFROMITEM": "No",
																	"REMOVEZEROENTRIES": "No",
																	"ISPARTYLEDGER": "Yes",
																	"ISLASTDEEMEDPOSITIVE": "Yes",
																	"AMOUNT": servicetaxamount,
																	"VATEXPAMOUNT": servicetaxamount,
																	"SERVICETAXDETAILS.LIST": "       ",
																	"BANKALLOCATIONS.LIST": "       ",
																	"BILLALLOCATIONS.LIST": "       ",
																	"INTERESTCOLLECTION.LIST": "       ",
																	"OLDAUDITENTRIES.LIST": "       ",
																	"ACCOUNTAUDITENTRIES.LIST": "       ",
																	"AUDITENTRIES.LIST": "       ",
																	"INPUTCRALLOCS.LIST": "       ",
																	"DUTYHEADDETAILS.LIST": "       ",
																	"EXCISEDUTYHEADDETAILS.LIST": "       ",
																	"RATEDETAILS.LIST": "       ",
																	"SUMMARYALLOCS.LIST": "       ",
																	"STPYMTDETAILS.LIST": "       ",
																	"EXCISEPAYMENTALLOCATIONS.LIST": "       ",
																	"TAXBILLALLOCATIONS.LIST": "       ",
																	"TAXOBJECTALLOCATIONS.LIST": "       ",
																	"TDSEXPENSEALLOCATIONS.LIST": "       ",
																	"VATSTATUTORYDETAILS.LIST": "       ",
																	"OSTTRACKALLOCATIONS.LIST": "       ",
																	"REFVOUCHERDETAILS.LIST": "       ",
																	"INVOICEWISEDETAILS.LIST": "       ",
																	"VATITCDETAILS.LIST": "       ",
																	"ADVANCETAXDETAILS.LIST": "       "
																},
																{
																	"OLDAUDITENTRYIDS.LIST": {
																		"@": {
																			"TYPE": "Number"
																		},
																		"OLDAUDITENTRYIDS": "-1"
																	},
																	"LEDGERNAME": "Revenue From Service Charges", //3rd
																	"GSTCLASS": "",
																	"ISDEEMEDPOSITIVE": "NO",
																	"LEDGERFROMITEM": "No",
																	"REMOVEZEROENTRIES": "No",
																	"ISPARTYLEDGER": "Yes",
																	"ISLASTDEEMEDPOSITIVE": "Yes",
																	"AMOUNT": result[0].servicecharges,
																	"VATEXPAMOUNT": result[0].servicecharges,
																	"SERVICETAXDETAILS.LIST": "       ",
																	"BANKALLOCATIONS.LIST": "       ",
																	"BILLALLOCATIONS.LIST": "       ",
																	"INTERESTCOLLECTION.LIST": "       ",
																	"OLDAUDITENTRIES.LIST": "       ",
																	"ACCOUNTAUDITENTRIES.LIST": "       ",
																	"AUDITENTRIES.LIST": "       ",
																	"INPUTCRALLOCS.LIST": "       ",
																	"DUTYHEADDETAILS.LIST": "       ",
																	"EXCISEDUTYHEADDETAILS.LIST": "       ",
																	"RATEDETAILS.LIST": "       ",
																	"SUMMARYALLOCS.LIST": "       ",
																	"STPYMTDETAILS.LIST": "       ",
																	"EXCISEPAYMENTALLOCATIONS.LIST": "       ",
																	"TAXBILLALLOCATIONS.LIST": "       ",
																	"TAXOBJECTALLOCATIONS.LIST": "       ",
																	"TDSEXPENSEALLOCATIONS.LIST": "       ",
																	"VATSTATUTORYDETAILS.LIST": "       ",
																	"OSTTRACKALLOCATIONS.LIST": "       ",
																	"REFVOUCHERDETAILS.LIST": "       ",
																	"INVOICEWISEDETAILS.LIST": "       ",
																	"VATITCDETAILS.LIST": "       ",
																	"ADVANCETAXDETAILS.LIST": "       "
																}
															],
															"PAYROLLMODEOFPAYMENT.LIST": "     ",
															"ATTDRECORDS.LIST": "      ",
															"TEMPGSTRATEDETAILS.LIST": "        "
														} //VOUCHER END
													}, //TALLYMESSAGE END 
													{
														"@": {
															"xmlns:UDF": "TallyUDF"
														},
														"COMPANY": {
															"REMOTECMPINFO.LIST": {
																"@": {
																	"MERGE": "Yes"
																},
																"NAME": "fdbc4460-756c-11d6-bd67-008048b5445e",
																"REMOTECMPNAME": strSVCURRENTCOMPANY,
																"REMOTECMPSTATE": "TamilNadu"
															}
														}
													},
													{
														"@": {
															"xmlns:UDF": "TallyUDF"
														},
														"COMPANY": {
															"REMOTECMPINFO.LIST": {
																"@": {
																	"MERGE": "Yes"
																},
																"NAME": "fdbc4460-756c-11d6-bd67-008048b5445e",
																"REMOTECMPNAME": strSVCURRENTCOMPANY,
																"REMOTECMPSTATE": "TamilNadu"
															}
														}
													}
												]
											} //REQUEST DATA END
										} //IMPORT DATA END
									} // BODY END                 
								};
							} else if (result[0].taxtype == 2) {
								var obj = {
									"HEADER": {
										"TALLYREQUEST": "Import Data"
									},
									"BODY": {
										"IMPORTDATA": {
											"REQUESTDESC": {
												"REPORTNAME": "Vouchers",
												"STATICVARIABLES": {
													"SVCURRENTCOMPANY": strSVCURRENTCOMPANY
												} //STATICVARIABLES END
											}, //REQUESTDESC END
											"REQUESTDATA": {
												"TALLYMESSAGE": [{
														"@": {
															"xmlns:UDF": "TallyUDF"
														},
														"VOUCHER": {
															"@": {
																"REMOTEID": "fdbc4460-756c-11d6-bd67-008048b5445e-000c618d",
																"VCHKEY": "fdbc4460-756c-11d6-bd67-008048b5445e-0000a930:00000078",
																"VCHTYPE": "INVOICE",
																"ACTION": "Create",
																"OBJVIEW": "Accounting Voucher View"
															},
															"OLDAUDITENTRYIDS.LIST": {
																"@": {
																	"TYPE": "Number"
																},
																"OLDAUDITENTRYIDS": "-1"
															},
															"DATE": result[0].createddate,
															"GUID": "fdbc4460-756c-11d6-bd67-008048b5445e-000c618d",
															"NARRATION": "Security claim for the month " + result[0].monthandyear,
															// "CLASSNAME" : "DefaultVoucherClass",
															"VOUCHERTYPENAME": "INVOICE",
															"VOUCHERNUMBER": result[0].invoiceno,
															"PARTYLEDGERNAME":result[0].name,
															"CSTFORMISSUETYPE": "",
															"CSTFORMRECVTYPE": "",
															"FBTPAYMENTTYPE": "Default",
															"PERSISTEDVIEW": "Accounting Voucher View",
															"VCHGSTCLASS": "",
															"ENTEREDBY": "duraian",
															"DIFFACTUALQTY": "No",
															"ISMSTFROMSYNC": "No",
															"ASORIGINAL": "No",
															"AUDITED": "No",
															"FORJOBCOSTING": "No",
															"ISOPTIONAL": "No",
															"EFFECTIVEDATE": result[0].createddate,
															"USEFOREXCISE": "No",
															"ISFORJOBWORKIN": "No",
															"ALLOWCONSUMPTION": "No",
															"USEFORINTEREST": "No",
															"USEFORGAINLOSS": "No",
															"USEFORGODOWNTRANSFER": "No",
															"USEFORCOMPOUND": "No",
															"USEFORSERVICETAX": "No",
															"ISEXCISEVOUCHER": "No",
															"EXCISETAXOVERRIDE": "No",
															"USEFORTAXUNITTRANSFER": "No",
															"EXCISEOPENING": "No",
															"USEFORFINALPRODUCTION": "No",
															"ISTDSOVERRIDDEN": "No",
															"ISTCSOVERRIDDEN": "No",
															"ISTDSTCSCASHVCH": "No",
															"INCLUDEADVPYMTVCH": "No",
															"ISSUBWORKSCONTRACT": "No",
															"ISVATOVERRIDDEN": "No",
															"IGNOREORIGVCHDATE": "No",
															"ISSERVICETAXOVERRIDDEN": "No",
															"ISISDVOUCHER": "No",
															"ISEXCISEOVERRIDDEN": "No",
															"ISEXCISESUPPLYVCH": "No",
															"ISGSTOVERRIDDEN": "No",
															"GSTNOTEXPORTED": "No",
															"ISVATPRINCIPALACCOUNT": "No",
															"ISSHIPPINGWITHINSTATE": "No",
															"ISCANCELLED": "No",
															"HASCASHFLOW": "No",
															"ISPOSTDATED": "No",
															"USETRACKINGNUMBER": "No",
															"ISINVOICE": "No",
															"MFGJOURNAL": "No",
															"HASDISCOUNTS": "No",
															"ASPAYSLIP": "No",
															"ISCOSTCENTRE": "No",
															"ISSTXNONREALIZEDVCH": "No",
															"ISEXCISEMANUFACTURERON": "No",
															"ISBLANKCHEQUE": "No",
															"ISVOID": "No",
															"ISONHOLD": "No",
															"ORDERLINESTATUS": "No",
															"VATISAGNSTCANCSALES": "No",
															"VATISPURCEXEMPTED": "No",
															"ISVATRESTAXINVOICE": "No",
															"VATISASSESABLECALCVCH": "No",
															"ISVATDUTYPAID": "Yes",
															"ISDELIVERYSAMEASCONSIGNEE": "No",
															"ISDISPATCHSAMEASCONSIGNOR": "No",
															"ISDELETED": "No",
															"CHANGEVCHMODE": "No",
															"ALTERID": " 1530883",
															"MASTERID": " 811405",
															"VOUCHERKEY": "186023623524472",
															"EXCLUDEDTAXATIONS.LIST": "      ",
															"OLDAUDITENTRIES.LIST": "      ",
															"ACCOUNTAUDITENTRIES.LIST": "      ",
															"AUDITENTRIES.LIST": "      ",
															"DUTYHEADDETAILS.LIST": "      ",
															"SUPPLEMENTARYDUTYHEADDETAILS.LIST": "      ",
															"INVOICEDELNOTES.LIST": "      ",
															"INVOICEORDERLIST.LIST": "      ",
															"INVOICEINDENTLIST.LIST": "      ",
															"ATTENDANCEENTRIES.LIST": "      ",
															"ORIGINVOICEDETAILS.LIST": "      ",
															"INVOICEEXPORTLIST.LIST": "      ",
															///// for loop
															"ALLLEDGERENTRIES.LIST": [{
																	"OLDAUDITENTRYIDS.LIST": {
																		"@": {
																			"TYPE": "Number"
																		},
																		"OLDAUDITENTRYIDS": "-1"
																	},
																	"LEDGERNAME":result[0].name,
																	"GSTCLASS": "",
																	"ISDEEMEDPOSITIVE": "Yes",
																	"LEDGERFROMITEM": "No",
																	"REMOVEZEROENTRIES": "No",
																	"ISPARTYLEDGER": "Yes",
																	"ISLASTDEEMEDPOSITIVE": "Yes",
																	"AMOUNT": "-" + result[0].totalamount,
																	"VATEXPAMOUNT": "-" + result[0].totalamount,
																	"SERVICETAXDETAILS.LIST": "       ",
																	"BANKALLOCATIONS.LIST": "       ",
																	"BILLALLOCATIONS.LIST": {
																		"NAME":StartDate+'/'+  result[0].invoiceno + jobcode,
																		"BILLTYPE": "New Ref",
																		"TDSDEDUCTEEISSPECIALRATE": "No",
																		"AMOUNT": "-" + result[0].totalamount,
																		"INTERESTCOLLECTION.LIST": "      ",
																		"STBILLCATEGORIES.LIST": "      "
																	},
																	"INTERESTCOLLECTION.LIST": "       ",
																	"OLDAUDITENTRIES.LIST": "       ",
																	"ACCOUNTAUDITENTRIES.LIST": "       ",
																	"AUDITENTRIES.LIST": "       ",
																	"INPUTCRALLOCS.LIST": "       ",
																	"DUTYHEADDETAILS.LIST": "       ",
																	"EXCISEDUTYHEADDETAILS.LIST": "       ",
																	"RATEDETAILS.LIST": "       ",
																	"SUMMARYALLOCS.LIST": "       ",
																	"STPYMTDETAILS.LIST": "       ",
																	"EXCISEPAYMENTALLOCATIONS.LIST": "       ",
																	"TAXBILLALLOCATIONS.LIST": "       ",
																	"TAXOBJECTALLOCATIONS.LIST": "       ",
																	"TDSEXPENSEALLOCATIONS.LIST": "       ",
																	"VATSTATUTORYDETAILS.LIST": "       ",
																	"OSTTRACKALLOCATIONS.LIST": "       ",
																	"REFVOUCHERDETAILS.LIST": "       ",
																	"INVOICEWISEDETAILS.LIST": "       ",
																	"VATITCDETAILS.LIST": "       ",
																	"ADVANCETAXDETAILS.LIST": "       "

																},
																{
																	"OLDAUDITENTRYIDS.LIST": {
																		"@": {
																			"TYPE": "Number"
																		},
																		"OLDAUDITENTRYIDS": "-1"
																	},
																	"LEDGERNAME": "Revenue From Security Projects", //2nd
																	"GSTCLASS": "",
																	"ISDEEMEDPOSITIVE": "NO",
																	"LEDGERFROMITEM": "No",
																	"REMOVEZEROENTRIES": "No",
																	"ISPARTYLEDGER": "Yes",
																	"ISLASTDEEMEDPOSITIVE": "Yes",
																	"AMOUNT": result[0].subtotal,
																	"VATEXPAMOUNT": result[0].subtotal,
																	"SERVICETAXDETAILS.LIST": "       ",
																	"BANKALLOCATIONS.LIST": "       ",
																	"BILLALLOCATIONS.LIST": "       ",
																	"INTERESTCOLLECTION.LIST": "       ",
																	"OLDAUDITENTRIES.LIST": "       ",
																	"ACCOUNTAUDITENTRIES.LIST": "       ",
																	"AUDITENTRIES.LIST": "       ",
																	"INPUTCRALLOCS.LIST": "       ",
																	"DUTYHEADDETAILS.LIST": "       ",
																	"EXCISEDUTYHEADDETAILS.LIST": "       ",
																	"RATEDETAILS.LIST": "       ",
																	"SUMMARYALLOCS.LIST": "       ",
																	"STPYMTDETAILS.LIST": "       ",
																	"EXCISEPAYMENTALLOCATIONS.LIST": "       ",
																	"TAXBILLALLOCATIONS.LIST": "       ",
																	"TAXOBJECTALLOCATIONS.LIST": "       ",
																	"TDSEXPENSEALLOCATIONS.LIST": "       ",
																	"VATSTATUTORYDETAILS.LIST": "       ",
																	"OSTTRACKALLOCATIONS.LIST": "       ",
																	"REFVOUCHERDETAILS.LIST": "       ",
																	"INVOICEWISEDETAILS.LIST": "       ",
																	"VATITCDETAILS.LIST": "       ",
																	"ADVANCETAXDETAILS.LIST": "       "
																},

																{
																	"OLDAUDITENTRYIDS.LIST": {
																		"@": {
																			"TYPE": "Number"
																		},
																		"OLDAUDITENTRYIDS": "-1"
																	},
																	"LEDGERNAME": "State GST Payable", //3rd
																	"GSTCLASS": "",
																	"ISDEEMEDPOSITIVE": "NO",
																	"LEDGERFROMITEM": "No",
																	"REMOVEZEROENTRIES": "No",
																	"ISPARTYLEDGER": "Yes",
																	"ISLASTDEEMEDPOSITIVE": "Yes",
																	"AMOUNT": servicetaxamount,
																	"VATEXPAMOUNT": servicetaxamount,
																	"SERVICETAXDETAILS.LIST": "       ",
																	"BANKALLOCATIONS.LIST": "       ",
																	"BILLALLOCATIONS.LIST": "       ",
																	"INTERESTCOLLECTION.LIST": "       ",
																	"OLDAUDITENTRIES.LIST": "       ",
																	"ACCOUNTAUDITENTRIES.LIST": "       ",
																	"AUDITENTRIES.LIST": "       ",
																	"INPUTCRALLOCS.LIST": "       ",
																	"DUTYHEADDETAILS.LIST": "       ",
																	"EXCISEDUTYHEADDETAILS.LIST": "       ",
																	"RATEDETAILS.LIST": "       ",
																	"SUMMARYALLOCS.LIST": "       ",
																	"STPYMTDETAILS.LIST": "       ",
																	"EXCISEPAYMENTALLOCATIONS.LIST": "       ",
																	"TAXBILLALLOCATIONS.LIST": "       ",
																	"TAXOBJECTALLOCATIONS.LIST": "       ",
																	"TDSEXPENSEALLOCATIONS.LIST": "       ",
																	"VATSTATUTORYDETAILS.LIST": "       ",
																	"OSTTRACKALLOCATIONS.LIST": "       ",
																	"REFVOUCHERDETAILS.LIST": "       ",
																	"INVOICEWISEDETAILS.LIST": "       ",
																	"VATITCDETAILS.LIST": "       ",
																	"ADVANCETAXDETAILS.LIST": "       "
																},
																{
																	"OLDAUDITENTRYIDS.LIST": {
																		"@": {
																			"TYPE": "Number"
																		},
																		"OLDAUDITENTRYIDS": "-1"
																	},
																	"LEDGERNAME": "Central GST Payable", //3rd
																	"GSTCLASS": "",
																	"ISDEEMEDPOSITIVE": "NO",
																	"LEDGERFROMITEM": "No",
																	"REMOVEZEROENTRIES": "No",
																	"ISPARTYLEDGER": "Yes",
																	"ISLASTDEEMEDPOSITIVE": "Yes",
																	"AMOUNT": servicetaxamount,
																	"VATEXPAMOUNT": servicetaxamount,
																	"SERVICETAXDETAILS.LIST": "       ",
																	"BANKALLOCATIONS.LIST": "       ",
																	"BILLALLOCATIONS.LIST": "       ",
																	"INTERESTCOLLECTION.LIST": "       ",
																	"OLDAUDITENTRIES.LIST": "       ",
																	"ACCOUNTAUDITENTRIES.LIST": "       ",
																	"AUDITENTRIES.LIST": "       ",
																	"INPUTCRALLOCS.LIST": "       ",
																	"DUTYHEADDETAILS.LIST": "       ",
																	"EXCISEDUTYHEADDETAILS.LIST": "       ",
																	"RATEDETAILS.LIST": "       ",
																	"SUMMARYALLOCS.LIST": "       ",
																	"STPYMTDETAILS.LIST": "       ",
																	"EXCISEPAYMENTALLOCATIONS.LIST": "       ",
																	"TAXBILLALLOCATIONS.LIST": "       ",
																	"TAXOBJECTALLOCATIONS.LIST": "       ",
																	"TDSEXPENSEALLOCATIONS.LIST": "       ",
																	"VATSTATUTORYDETAILS.LIST": "       ",
																	"OSTTRACKALLOCATIONS.LIST": "       ",
																	"REFVOUCHERDETAILS.LIST": "       ",
																	"INVOICEWISEDETAILS.LIST": "       ",
																	"VATITCDETAILS.LIST": "       ",
																	"ADVANCETAXDETAILS.LIST": "       "
																},
																{
																	"OLDAUDITENTRYIDS.LIST": {
																		"@": {
																			"TYPE": "Number"
																		},
																		"OLDAUDITENTRYIDS": "-1"
																	},
																	"LEDGERNAME": "Revenue From Service Charges", //3rd
																	"GSTCLASS": "",
																	"ISDEEMEDPOSITIVE": "NO",
																	"LEDGERFROMITEM": "No",
																	"REMOVEZEROENTRIES": "No",
																	"ISPARTYLEDGER": "Yes",
																	"ISLASTDEEMEDPOSITIVE": "Yes",
																	"AMOUNT": result[0].servicecharges,
																	"VATEXPAMOUNT": result[0].servicecharges,
																	"SERVICETAXDETAILS.LIST": "       ",
																	"BANKALLOCATIONS.LIST": "       ",
																	"BILLALLOCATIONS.LIST": "       ",
																	"INTERESTCOLLECTION.LIST": "       ",
																	"OLDAUDITENTRIES.LIST": "       ",
																	"ACCOUNTAUDITENTRIES.LIST": "       ",
																	"AUDITENTRIES.LIST": "       ",
																	"INPUTCRALLOCS.LIST": "       ",
																	"DUTYHEADDETAILS.LIST": "       ",
																	"EXCISEDUTYHEADDETAILS.LIST": "       ",
																	"RATEDETAILS.LIST": "       ",
																	"SUMMARYALLOCS.LIST": "       ",
																	"STPYMTDETAILS.LIST": "       ",
																	"EXCISEPAYMENTALLOCATIONS.LIST": "       ",
																	"TAXBILLALLOCATIONS.LIST": "       ",
																	"TAXOBJECTALLOCATIONS.LIST": "       ",
																	"TDSEXPENSEALLOCATIONS.LIST": "       ",
																	"VATSTATUTORYDETAILS.LIST": "       ",
																	"OSTTRACKALLOCATIONS.LIST": "       ",
																	"REFVOUCHERDETAILS.LIST": "       ",
																	"INVOICEWISEDETAILS.LIST": "       ",
																	"VATITCDETAILS.LIST": "       ",
																	"ADVANCETAXDETAILS.LIST": "       "
																}



															],
															"PAYROLLMODEOFPAYMENT.LIST": "     ",
															"ATTDRECORDS.LIST": "      ",
															"TEMPGSTRATEDETAILS.LIST": "        "

														} //VOUCHER END

													}, //TALLYMESSAGE END 
													{
														"@": {
															"xmlns:UDF": "TallyUDF"
														},
														"COMPANY": {
															"REMOTECMPINFO.LIST": {
																"@": {
																	"MERGE": "Yes"
																},
																"NAME": "fdbc4460-756c-11d6-bd67-008048b5445e",
																"REMOTECMPNAME": strSVCURRENTCOMPANY,
																"REMOTECMPSTATE": "TamilNadu"
															}

														}
													},
													{
														"@": {
															"xmlns:UDF": "TallyUDF"
														},
														"COMPANY": {
															"REMOTECMPINFO.LIST": {
																"@": {
																	"MERGE": "Yes"
																},
																"NAME": "fdbc4460-756c-11d6-bd67-008048b5445e",
																"REMOTECMPNAME": strSVCURRENTCOMPANY,
																"REMOTECMPSTATE": "TamilNadu"
															}

														}
													}

												]

											} //REQUEST DATA END
										} //IMPORT DATA END
									} // BODY END                 
								};
							} else {
								var obj = {
									"HEADER": {
										"TALLYREQUEST": "Import Data"
									},
									"BODY": {
										"IMPORTDATA": {
											"REQUESTDESC": {
												"REPORTNAME": "Vouchers",
												"STATICVARIABLES": {
													"SVCURRENTCOMPANY": strSVCURRENTCOMPANY
												} //STATICVARIABLES END

											}, //REQUESTDESC END
											"REQUESTDATA": {
												"TALLYMESSAGE": [{
														"@": {
															"xmlns:UDF": "TallyUDF"
														},
														"VOUCHER": {
															"@": {
																"REMOTEID": "fdbc4460-756c-11d6-bd67-008048b5445e-000c618d",
																"VCHKEY": "fdbc4460-756c-11d6-bd67-008048b5445e-0000a930:00000078",
																"VCHTYPE": "INVOICE",
																"ACTION": "Create",
																"OBJVIEW": "Accounting Voucher View"
															},
															"OLDAUDITENTRYIDS.LIST": {
																"@": {
																	"TYPE": "Number"
																},
																"OLDAUDITENTRYIDS": "-1"

															},
															"DATE": result[0].createddate,
															"GUID": "fdbc4460-756c-11d6-bd67-008048b5445e-000c618d",
															"NARRATION": "Security claim for the month " + result[0].monthandyear,
															// "CLASSNAME" : "DefaultVoucherClass",
															"PARTYLEDGERNAME":result[0].name,
															"VOUCHERTYPENAME": "INVOICE",
															"VOUCHERNUMBER": result[0].invoiceno,
															"CSTFORMISSUETYPE": "",
															"CSTFORMRECVTYPE": "",
															"FBTPAYMENTTYPE": "Default",
															"PERSISTEDVIEW": "Accounting Voucher View",
															"VCHGSTCLASS": "",
															"ENTEREDBY": "CAO",
															"DIFFACTUALQTY": "No",
															"ISMSTFROMSYNC": "No",
															"ASORIGINAL": "No",
															"AUDITED": "No",
															"FORJOBCOSTING": "No",
															"ISOPTIONAL": "No",
															"EFFECTIVEDATE": result[0].createddate,
															"USEFOREXCISE": "No",
															"ISFORJOBWORKIN": "No",
															"ALLOWCONSUMPTION": "No",
															"USEFORINTEREST": "No",
															"USEFORGAINLOSS": "No",
															"USEFORGODOWNTRANSFER": "No",
															"USEFORCOMPOUND": "No",
															"USEFORSERVICETAX": "No",
															"ISONHOLD" : "No",
															"ISBOENOTAPPLICABLE" :"No",
															"ISEXCISEVOUCHER": "No",
															"EXCISETAXOVERRIDE": "No",
															"USEFORTAXUNITTRANSFER": "No","IGNOREPOSVALIDATION" : "No",
															"EXCISEOPENING": "No",
															"USEFORFINALPRODUCTION": "No",
															"ISTDSOVERRIDDEN": "No",
															"ISTCSOVERRIDDEN": "No",
															"ISTDSTCSCASHVCH": "No",  
															"INCLUDEADVPYMTVCH":"No",
															"ISVATPAIDATCUSTOMS":"No",
															"ISDECLAREDTOCUSTOMS":"No",
															"ISSUBWORKSCONTRACT": "No",
															"ISVATOVERRIDDEN": "No",
															"IGNOREORIGVCHDATE": "No",
															"ISSERVICETAXOVERRIDDEN": "No",
															"ISISDVOUCHER": "No",
															"ISEXCISEOVERRIDDEN": "No",
															"ISEXCISESUPPLYVCH": "No",
															"ISGSTOVERRIDDEN": "No",
															"GSTNOTEXPORTED": "No",
															"ISVATPRINCIPALACCOUNT": "No",
															"ISSHIPPINGWITHINSTATE": "No",
															"ISCANCELLED": "No",
															"HASCASHFLOW": "No",
															"ISPOSTDATED": "No",
															"USETRACKINGNUMBER": "No",
															"ISINVOICE": "No",
															"MFGJOURNAL": "No",
															"HASDISCOUNTS": "No",
															"ASPAYSLIP": "No",
															"ISCOSTCENTRE": "No",
															"ISSTXNONREALIZEDVCH": "No",
															"ISEXCISEMANUFACTURERON": "No",
															"ISBLANKCHEQUE": "No",
															"ISVOID": "No",
															"ISONHOLD": "No",
															"ORDERLINESTATUS": "No",
															"VATISAGNSTCANCSALES": "No",
															"VATISPURCEXEMPTED": "No",
															"ISVATRESTAXINVOICE": "No",
															"VATISASSESABLECALCVCH": "No",
															"ISVATDUTYPAID": "Yes",
															"ISDELIVERYSAMEASCONSIGNEE": "No",
															"ISDISPATCHSAMEASCONSIGNOR": "No",
															"ISDELETED": "No",
															"CHANGEVCHMODE": "No",
															"ALTERID": " 1530883",
															"MASTERID": " 811405",
															"VOUCHERKEY": "186023623524472",
															"EXCLUDEDTAXATIONS.LIST": "      ",
															"OLDAUDITENTRIES.LIST": "      ",
															"ACCOUNTAUDITENTRIES.LIST": "      ",
															"AUDITENTRIES.LIST": "      ",
															"DUTYHEADDETAILS.LIST": "      ",
															"SUPPLEMENTARYDUTYHEADDETAILS.LIST": "      ",
															"INVOICEDELNOTES.LIST": "      ",
															"INVOICEORDERLIST.LIST": "      ",
															"INVOICEINDENTLIST.LIST": "      ",
															"ATTENDANCEENTRIES.LIST": "      ",
															"ORIGINVOICEDETAILS.LIST": "      ",
															"INVOICEEXPORTLIST.LIST": "      ",
															///// for loop
															"ALLLEDGERENTRIES.LIST": [{
																	"OLDAUDITENTRYIDS.LIST": {
																		"@": {
																			"TYPE": "Number"
																		},
																		"OLDAUDITENTRYIDS": "-1"
																	},
																	"LEDGERNAME":  result[0].name,
																	"GSTCLASS": "",
																	"ISDEEMEDPOSITIVE": "Yes",
																	"LEDGERFROMITEM": "No",
																	"REMOVEZEROENTRIES": "No",
																	"ISPARTYLEDGER": "Yes",
																	"ISLASTDEEMEDPOSITIVE": "Yes",
																	"AMOUNT": "-" + result[0].totalamount,
																	"VATEXPAMOUNT": "-" + result[0].totalamount,
																	"SERVICETAXDETAILS.LIST": "       ",
																	"BANKALLOCATIONS.LIST": "       ",
																	"BILLALLOCATIONS.LIST": {
																		"NAME":StartDate+'/'+  result[0].invoiceno + jobcode,
																		"BILLTYPE": "New Ref",
																		"TDSDEDUCTEEISSPECIALRATE": "No",
																		"AMOUNT": "-" + result[0].totalamount,
																		"INTERESTCOLLECTION.LIST": "      ",
																		"STBILLCATEGORIES.LIST": "      "
																	},
																	"INTERESTCOLLECTION.LIST": "       ",
																	"OLDAUDITENTRIES.LIST": "       ",
																	"ACCOUNTAUDITENTRIES.LIST": "       ",
																	"AUDITENTRIES.LIST": "       ",
																	"INPUTCRALLOCS.LIST": "       ",
																	"DUTYHEADDETAILS.LIST": "       ",
																	"EXCISEDUTYHEADDETAILS.LIST": "       ",
																	"RATEDETAILS.LIST": "       ",
																	"SUMMARYALLOCS.LIST": "       ",
																	"STPYMTDETAILS.LIST": "       ",
																	"EXCISEPAYMENTALLOCATIONS.LIST": "       ",
																	"TAXBILLALLOCATIONS.LIST": "       ",
																	"TAXOBJECTALLOCATIONS.LIST": "       ",
																	"TDSEXPENSEALLOCATIONS.LIST": "       ",
																	"VATSTATUTORYDETAILS.LIST": "       ",
																	"OSTTRACKALLOCATIONS.LIST": "       ",
																	"REFVOUCHERDETAILS.LIST": "       ",
																	"INVOICEWISEDETAILS.LIST": "       ",
																	"VATITCDETAILS.LIST": "       ",
																	"ADVANCETAXDETAILS.LIST": "       "
																},
																{
																	"OLDAUDITENTRYIDS.LIST": {
																		"@": {
																			"TYPE": "Number"
																		},
																		"OLDAUDITENTRYIDS": "-1"
																	},
																	"LEDGERNAME": "Revenue From Security Projects", //2nd
																	"GSTCLASS": "",
																	"ISDEEMEDPOSITIVE": "No",
																	"LEDGERFROMITEM": "No",
																	"REMOVEZEROENTRIES": "No",
																	"ISPARTYLEDGER": "No",
																	"ISLASTDEEMEDPOSITIVE": "No",
																	"ISCAPVATTAXALTERED": "No",
																	"ISCAPVATNOTCLAIMED": "No",
																	"AMOUNT": result[0].subtotal,
																	"VATEXPAMOUNT": result[0].subtotal,
																	"SERVICETAXDETAILS.LIST": "       ",
																	"BANKALLOCATIONS.LIST": "       ",
																	"BILLALLOCATIONS.LIST": "       ",
																	"INTERESTCOLLECTION.LIST": "       ",
																	"OLDAUDITENTRIES.LIST": "       ",
																	"ACCOUNTAUDITENTRIES.LIST": "       ",
																	"AUDITENTRIES.LIST": "       ",
																	"INPUTCRALLOCS.LIST": "       ",
																	"DUTYHEADDETAILS.LIST": "       ",
																	"EXCISEDUTYHEADDETAILS.LIST": "       ",
																	"RATEDETAILS.LIST": "       ",
																	"SUMMARYALLOCS.LIST": "       ",
																	"STPYMTDETAILS.LIST": "       ",
																	"EXCISEPAYMENTALLOCATIONS.LIST": "       ",
																	"TAXBILLALLOCATIONS.LIST": "       ",
																	"TAXOBJECTALLOCATIONS.LIST": "       ",
																	"TDSEXPENSEALLOCATIONS.LIST": "       ",
																	"VATSTATUTORYDETAILS.LIST": "       ",
																	"OSTTRACKALLOCATIONS.LIST": "       ",
																	"REFVOUCHERDETAILS.LIST": "       ",
																	"INVOICEWISEDETAILS.LIST": "       ",
																	"VATITCDETAILS.LIST": "       ",
																	"ADVANCETAXDETAILS.LIST": "       "
																},
																{
																	"OLDAUDITENTRYIDS.LIST": {
																		"@": {
																			"TYPE": "Number"
																		},
																		"OLDAUDITENTRYIDS": "-1"
																	},
																	"LEDGERNAME": "Revenue From Service Charges", //3rd
																	"GSTCLASS": "",
																	"ISDEEMEDPOSITIVE": "No",
																	"LEDGERFROMITEM": "No",
																	"REMOVEZEROENTRIES": "No",
																	"ISPARTYLEDGER": "No",
																	"ISLASTDEEMEDPOSITIVE": "No", "ISCAPVATTAXALTERED": "No",
																	"ISCAPVATNOTCLAIMED": "No",
																	"AMOUNT": result[0].servicecharges,
																	"VATEXPAMOUNT": result[0].servicecharges,
																	"SERVICETAXDETAILS.LIST": "       ",
																	"BANKALLOCATIONS.LIST": "       ",
																	"BILLALLOCATIONS.LIST": "       ",
																	"INTERESTCOLLECTION.LIST": "       ",
																	"OLDAUDITENTRIES.LIST": "       ",
																	"ACCOUNTAUDITENTRIES.LIST": "       ",
																	"AUDITENTRIES.LIST": "       ",
																	"INPUTCRALLOCS.LIST": "       ",
																	"DUTYHEADDETAILS.LIST": "       ",
																	"EXCISEDUTYHEADDETAILS.LIST": "       ",
																	"RATEDETAILS.LIST": "       ",
																	"SUMMARYALLOCS.LIST": "       ",
																	"STPYMTDETAILS.LIST": "       ",
																	"EXCISEPAYMENTALLOCATIONS.LIST": "       ",
																	"TAXBILLALLOCATIONS.LIST": "       ",
																	"TAXOBJECTALLOCATIONS.LIST": "       ",
																	"TDSEXPENSEALLOCATIONS.LIST": "       ",
																	"VATSTATUTORYDETAILS.LIST": "       ",
																	"OSTTRACKALLOCATIONS.LIST": "       ",
																	"REFVOUCHERDETAILS.LIST": "       ",
																	"INVOICEWISEDETAILS.LIST": "       ",
																	"VATITCDETAILS.LIST": "       ",
																	"ADVANCETAXDETAILS.LIST": "       "
																}
															],
															"PAYROLLMODEOFPAYMENT.LIST": "     ",
															"ATTDRECORDS.LIST": "      ",
															"TEMPGSTRATEDETAILS.LIST": "        "

														} //VOUCHER END

													}, //TALLYMESSAGE END 
													{
														"@": {
															"xmlns:UDF": "TallyUDF"
														},
														"COMPANY": {
															"REMOTECMPINFO.LIST": {
																"@": {
																	"MERGE": "Yes"
																},
																"NAME": "fdbc4460-756c-11d6-bd67-008048b5445e",
																"REMOTECMPNAME": strSVCURRENTCOMPANY,
																"REMOTECMPSTATE": "TamilNadu"
															}

														}
													},
													{
														"@": {
															"xmlns:UDF": "TallyUDF"
														},
														"COMPANY": {
															"REMOTECMPINFO.LIST": {
																"@": {
																	"MERGE": "Yes"
																},
																"NAME": "fdbc4460-756c-11d6-bd67-008048b5445e",
																"REMOTECMPNAME": strSVCURRENTCOMPANY,
																"REMOTECMPSTATE": "TamilNadu"
															}
														}
													}
												]
											} //REQUEST DATA END
										} //IMPORT DATA END
									} // BODY END                 
								};
							}  
							//console.log('obj', obj);
							var filepath = nconf.get('DOWNLOADURLXML');
							fs.writeFile(filepath + "AccountingVoucher-" + request.body.invoiceno + ".xml", js2xmlparser.parse("ENVELOPE", obj), function (err, data) {
								if (err) console.log('errr', err);
								response.set('Content-Type', 'application/json');
								response.status(200);
								response.json(obj);
								response.status(200);
							});
						}
					}).catch(function (err) {
						response.set('Content-Type', 'application/json');
						response.status(400);
						response.json("Error   -- " + err);
					});
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
	
	app.express.post('/api/finance/xmlwriterAll', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				
				var texcokeyword = 'TALLY HEADING';
				var invoicedatas = [];
				jobBal.exportxmltallyAll(request.body.monthandyear).then(function (result) {
					jobBal.getCompanyName(texcokeyword).then(function (companyname) {
						var strSVCURRENTCOMPANY = companyname[0].value;
						//console.log('result', result);
						if (result) {
							var width = 8;
							var z = '0';
							for (var j = 0; j < result.length; j++) {
								var jobcode='';
								var servicetaxamount = result[j].servicetax / 2;
								var n = result[j].invoiceid + '';
								var vkey = n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
								var dt = new Date(result[j].monthandyear);
								var StartDate = moment(dt).startOf('month').format('MM');
								//console.log(vkey);
								if(result[j].jobmasterid == 1 || result[j].jobmasterid == 2 || result[j].jobmasterid == 4 || result[j].jobmasterid == 5)
								{
									 jobcode='s'
								}
								else
								{
									 jobcode='m'
								}
								var invoicedatass = {
									"TALLYMESSAGE": [{
											"@": {
												"xmlns:UDF": "TallyUDF"
											},
											"VOUCHER": {
												"@": {
													"REMOTEID": "fdbc4460-756c-11d6-bd67-008048b5445e-000c618d"+vkey+j,
													"VCHKEY": "fdbc4460-756c-11d6-bd67-008048b5445e-0000a930:"+vkey,
													"VCHTYPE": "INVOICE",
													"ACTION": "Create",
													"OBJVIEW": "Accounting Voucher View"
												},
												"OLDAUDITENTRYIDS.LIST": {
													"@": {
														"TYPE": "Number"
													},
													"OLDAUDITENTRYIDS": "-1"

												},
												"DATE": result[j].createddate,
												"GUID": "fdbc4460-756c-11d6-bd67-008048b5445e-000c618d"+vkey+j,
												"NARRATION": "Security claim for the month " + result[j].monthandyear,
												// "CLASSNAME" : "DefaultVoucherClass",
												"VOUCHERTYPENAME": "INVOICE",
												"VOUCHERNUMBER": result[j].invoiceno,
												"PARTYLEDGERNAME":result[j].name,
												"CSTFORMISSUETYPE": "",
												"CSTFORMRECVTYPE": "",
												"FBTPAYMENTTYPE": "Default",
												"PERSISTEDVIEW": "Accounting Voucher View",
												"VCHGSTCLASS": "",
												"ENTEREDBY": "duraian",
												"DIFFACTUALQTY": "No",
												"ISMSTFROMSYNC": "No",
												"ASORIGINAL": "No",
												"AUDITED": "No",
												"FORJOBCOSTING": "No",
												"ISOPTIONAL": "No",
												"EFFECTIVEDATE": result[j].createddate,
												"USEFOREXCISE": "No",
												"ISFORJOBWORKIN": "No",
												"ALLOWCONSUMPTION": "No",
												"USEFORINTEREST": "No",
												"USEFORGAINLOSS": "No",
												"USEFORGODOWNTRANSFER": "No",
												"USEFORCOMPOUND": "No",
												"USEFORSERVICETAX": "No",
												"ISEXCISEVOUCHER": "No",
												"EXCISETAXOVERRIDE": "No",
												"USEFORTAXUNITTRANSFER": "No",
												"EXCISEOPENING": "No",
												"USEFORFINALPRODUCTION": "No",
												"ISTDSOVERRIDDEN": "No",
												"ISTCSOVERRIDDEN": "No",
												"ISTDSTCSCASHVCH": "No",
												"INCLUDEADVPYMTVCH": "No",
												"ISSUBWORKSCONTRACT": "No",
												"ISVATOVERRIDDEN": "No",
												"IGNOREORIGVCHDATE": "No",
												"ISSERVICETAXOVERRIDDEN": "No",
												"ISISDVOUCHER": "No",
												"ISEXCISEOVERRIDDEN": "No",
												"ISEXCISESUPPLYVCH": "No",
												"ISGSTOVERRIDDEN": "No",
												"GSTNOTEXPORTED": "No",
												"ISVATPRINCIPALACCOUNT": "No",
												"ISSHIPPINGWITHINSTATE": "No",
												"ISCANCELLED": "No",
												"HASCASHFLOW": "No",
												"ISPOSTDATED": "No",
												"USETRACKINGNUMBER": "No",
												"ISINVOICE": "No",
												"MFGJOURNAL": "No",
												"HASDISCOUNTS": "No",
												"ASPAYSLIP": "No",
												"ISCOSTCENTRE": "No",
												"ISSTXNONREALIZEDVCH": "No",
												"ISEXCISEMANUFACTURERON": "No",
												"ISBLANKCHEQUE": "No",
												"ISVOID": "No",
												"ISONHOLD": "No",
												"ORDERLINESTATUS": "No",
												"VATISAGNSTCANCSALES": "No",
												"VATISPURCEXEMPTED": "No",
												"ISVATRESTAXINVOICE": "No",
												"VATISASSESABLECALCVCH": "No",
												"ISVATDUTYPAID": "Yes",
												"ISDELIVERYSAMEASCONSIGNEE": "No",
												"ISDISPATCHSAMEASCONSIGNOR": "No",
												"ISDELETED": "No",
												"CHANGEVCHMODE": "No",
												"EXCLUDEDTAXATIONS.LIST": "      ",
												"OLDAUDITENTRIES.LIST": "      ",
												"ACCOUNTAUDITENTRIES.LIST": "      ",
												"AUDITENTRIES.LIST": "      ",
												"DUTYHEADDETAILS.LIST": "      ",
												"SUPPLEMENTARYDUTYHEADDETAILS.LIST": "      ",
												"INVOICEDELNOTES.LIST": "      ",
												"INVOICEORDERLIST.LIST": "      ",
												"INVOICEINDENTLIST.LIST": "      ",
												"ATTENDANCEENTRIES.LIST": "      ",
												"ORIGINVOICEDETAILS.LIST": "      ",
												"INVOICEEXPORTLIST.LIST": "      ",
												///// for loop
												"ALLLEDGERENTRIES.LIST": [{
														"OLDAUDITENTRYIDS.LIST": {
															"@": {
																"TYPE": "Number"
															},
															"OLDAUDITENTRYIDS": "-1"
														},
														"LEDGERNAME": result[j].name,
														"GSTCLASS": "",
														"ISDEEMEDPOSITIVE": "Yes",
														"LEDGERFROMITEM": "No",
														"REMOVEZEROENTRIES": "No",
														"ISPARTYLEDGER": "Yes",
														"ISLASTDEEMEDPOSITIVE": "Yes",
														"AMOUNT":"-" +  result[j].totalamount,
														"VATEXPAMOUNT":"-" + result[j].totalamount,
														"SERVICETAXDETAILS.LIST": "       ",
														"BANKALLOCATIONS.LIST": "       ",
														"BILLALLOCATIONS.LIST": {
															"NAME":StartDate+'/'+ result[j].invoiceno + jobcode,
															"BILLTYPE": "New Ref",
															"TDSDEDUCTEEISSPECIALRATE": "No",
															"AMOUNT":"-" + result[j].totalamount,
															"INTERESTCOLLECTION.LIST": "      ",
															"STBILLCATEGORIES.LIST": "      "
														},
														"INTERESTCOLLECTION.LIST": "       ",
														"OLDAUDITENTRIES.LIST": "       ",
														"ACCOUNTAUDITENTRIES.LIST": "       ",
														"AUDITENTRIES.LIST": "       ",
														"INPUTCRALLOCS.LIST": "       ",
														"DUTYHEADDETAILS.LIST": "       ",
														"EXCISEDUTYHEADDETAILS.LIST": "       ",
														"RATEDETAILS.LIST": "       ",
														"SUMMARYALLOCS.LIST": "       ",
														"STPYMTDETAILS.LIST": "       ",
														"EXCISEPAYMENTALLOCATIONS.LIST": "       ",
														"TAXBILLALLOCATIONS.LIST": "       ",
														"TAXOBJECTALLOCATIONS.LIST": "       ",
														"TDSEXPENSEALLOCATIONS.LIST": "       ",
														"VATSTATUTORYDETAILS.LIST": "       ",
														"OSTTRACKALLOCATIONS.LIST": "       ",
														"REFVOUCHERDETAILS.LIST": "       ",
														"INVOICEWISEDETAILS.LIST": "       ",
														"VATITCDETAILS.LIST": "       ",
														"ADVANCETAXDETAILS.LIST": "       "

													},
													{
														"OLDAUDITENTRYIDS.LIST": {
															"@": {
																"TYPE": "Number"
															},
															"OLDAUDITENTRYIDS": "-1"
														},
														"LEDGERNAME": "Revenue From Security Projects", //2nd
														"GSTCLASS": "",
														"ISDEEMEDPOSITIVE": "NO",
														"LEDGERFROMITEM": "No",
														"REMOVEZEROENTRIES": "No",
														"ISPARTYLEDGER": "Yes",
														"ISLASTDEEMEDPOSITIVE": "Yes",
														"AMOUNT": result[j].subtotal,
														"VATEXPAMOUNT": result[j].subtotal,
														"SERVICETAXDETAILS.LIST": "       ",
														"BANKALLOCATIONS.LIST": "       ",
														"BILLALLOCATIONS.LIST": "       ",
														"INTERESTCOLLECTION.LIST": "       ",
														"OLDAUDITENTRIES.LIST": "       ",
														"ACCOUNTAUDITENTRIES.LIST": "       ",
														"AUDITENTRIES.LIST": "       ",
														"INPUTCRALLOCS.LIST": "       ",
														"DUTYHEADDETAILS.LIST": "       ",
														"EXCISEDUTYHEADDETAILS.LIST": "       ",
														"RATEDETAILS.LIST": "       ",
														"SUMMARYALLOCS.LIST": "       ",
														"STPYMTDETAILS.LIST": "       ",
														"EXCISEPAYMENTALLOCATIONS.LIST": "       ",
														"TAXBILLALLOCATIONS.LIST": "       ",
														"TAXOBJECTALLOCATIONS.LIST": "       ",
														"TDSEXPENSEALLOCATIONS.LIST": "       ",
														"VATSTATUTORYDETAILS.LIST": "       ",
														"OSTTRACKALLOCATIONS.LIST": "       ",
														"REFVOUCHERDETAILS.LIST": "       ",
														"INVOICEWISEDETAILS.LIST": "       ",
														"VATITCDETAILS.LIST": "       ",
														"ADVANCETAXDETAILS.LIST": "       "
													},

													{
														"OLDAUDITENTRYIDS.LIST": {
															"@": {
																"TYPE": "Number"
															},
															"OLDAUDITENTRYIDS": "-1"
														},
														"LEDGERNAME": "State GST Payable", //3rd
														"GSTCLASS": "",
														"ISDEEMEDPOSITIVE": "NO",
														"LEDGERFROMITEM": "No",
														"REMOVEZEROENTRIES": "No",
														"ISPARTYLEDGER": "Yes",
														"ISLASTDEEMEDPOSITIVE": "Yes",
														"AMOUNT": servicetaxamount,
														"VATEXPAMOUNT": servicetaxamount,
														"SERVICETAXDETAILS.LIST": "       ",
														"BANKALLOCATIONS.LIST": "       ",
														"BILLALLOCATIONS.LIST": "       ",
														"INTERESTCOLLECTION.LIST": "       ",
														"OLDAUDITENTRIES.LIST": "       ",
														"ACCOUNTAUDITENTRIES.LIST": "       ",
														"AUDITENTRIES.LIST": "       ",
														"INPUTCRALLOCS.LIST": "       ",
														"DUTYHEADDETAILS.LIST": "       ",
														"EXCISEDUTYHEADDETAILS.LIST": "       ",
														"RATEDETAILS.LIST": "       ",
														"SUMMARYALLOCS.LIST": "       ",
														"STPYMTDETAILS.LIST": "       ",
														"EXCISEPAYMENTALLOCATIONS.LIST": "       ",
														"TAXBILLALLOCATIONS.LIST": "       ",
														"TAXOBJECTALLOCATIONS.LIST": "       ",
														"TDSEXPENSEALLOCATIONS.LIST": "       ",
														"VATSTATUTORYDETAILS.LIST": "       ",
														"OSTTRACKALLOCATIONS.LIST": "       ",
														"REFVOUCHERDETAILS.LIST": "       ",
														"INVOICEWISEDETAILS.LIST": "       ",
														"VATITCDETAILS.LIST": "       ",
														"ADVANCETAXDETAILS.LIST": "       "
													},
													{
														"OLDAUDITENTRYIDS.LIST": {
															"@": {
																"TYPE": "Number"
															},
															"OLDAUDITENTRYIDS": "-1"
														},
														"LEDGERNAME": "Central GST Payable", //3rd
														"GSTCLASS": "",
														"ISDEEMEDPOSITIVE": "NO",
														"LEDGERFROMITEM": "No",
														"REMOVEZEROENTRIES": "No",
														"ISPARTYLEDGER": "Yes",
														"ISLASTDEEMEDPOSITIVE": "Yes",
														"AMOUNT": servicetaxamount,
														"VATEXPAMOUNT": servicetaxamount,
														"SERVICETAXDETAILS.LIST": "       ",
														"BANKALLOCATIONS.LIST": "       ",
														"BILLALLOCATIONS.LIST": "       ",
														"INTERESTCOLLECTION.LIST": "       ",
														"OLDAUDITENTRIES.LIST": "       ",
														"ACCOUNTAUDITENTRIES.LIST": "       ",
														"AUDITENTRIES.LIST": "       ",
														"INPUTCRALLOCS.LIST": "       ",
														"DUTYHEADDETAILS.LIST": "       ",
														"EXCISEDUTYHEADDETAILS.LIST": "       ",
														"RATEDETAILS.LIST": "       ",
														"SUMMARYALLOCS.LIST": "       ",
														"STPYMTDETAILS.LIST": "       ",
														"EXCISEPAYMENTALLOCATIONS.LIST": "       ",
														"TAXBILLALLOCATIONS.LIST": "       ",
														"TAXOBJECTALLOCATIONS.LIST": "       ",
														"TDSEXPENSEALLOCATIONS.LIST": "       ",
														"VATSTATUTORYDETAILS.LIST": "       ",
														"OSTTRACKALLOCATIONS.LIST": "       ",
														"REFVOUCHERDETAILS.LIST": "       ",
														"INVOICEWISEDETAILS.LIST": "       ",
														"VATITCDETAILS.LIST": "       ",
														"ADVANCETAXDETAILS.LIST": "       "
													},
													{
														"OLDAUDITENTRYIDS.LIST": {
															"@": {
																"TYPE": "Number"
															},
															"OLDAUDITENTRYIDS": "-1"
														},
														"LEDGERNAME": "Revenue From Service Charges", //3rd
														"GSTCLASS": "",
														"ISDEEMEDPOSITIVE": "NO",
														"LEDGERFROMITEM": "No",
														"REMOVEZEROENTRIES": "No",
														"ISPARTYLEDGER": "Yes",
														"ISLASTDEEMEDPOSITIVE": "Yes",
														"AMOUNT": result[j].servicecharges,
														"VATEXPAMOUNT": result[j].servicecharges,
														"SERVICETAXDETAILS.LIST": "       ",
														"BANKALLOCATIONS.LIST": "       ",
														"BILLALLOCATIONS.LIST": "       ",
														"INTERESTCOLLECTION.LIST": "       ",
														"OLDAUDITENTRIES.LIST": "       ",
														"ACCOUNTAUDITENTRIES.LIST": "       ",
														"AUDITENTRIES.LIST": "       ",
														"INPUTCRALLOCS.LIST": "       ",
														"DUTYHEADDETAILS.LIST": "       ",
														"EXCISEDUTYHEADDETAILS.LIST": "       ",
														"RATEDETAILS.LIST": "       ",
														"SUMMARYALLOCS.LIST": "       ",
														"STPYMTDETAILS.LIST": "       ",
														"EXCISEPAYMENTALLOCATIONS.LIST": "       ",
														"TAXBILLALLOCATIONS.LIST": "       ",
														"TAXOBJECTALLOCATIONS.LIST": "       ",
														"TDSEXPENSEALLOCATIONS.LIST": "       ",
														"VATSTATUTORYDETAILS.LIST": "       ",
														"OSTTRACKALLOCATIONS.LIST": "       ",
														"REFVOUCHERDETAILS.LIST": "       ",
														"INVOICEWISEDETAILS.LIST": "       ",
														"VATITCDETAILS.LIST": "       ",
														"ADVANCETAXDETAILS.LIST": "       "
													}



												],
												"PAYROLLMODEOFPAYMENT.LIST": "     ",
												"ATTDRECORDS.LIST": "      ",
												"TEMPGSTRATEDETAILS.LIST": "        "

											} //VOUCHER END

										}, //TALLYMESSAGE END 
										{
											"@": {
												"xmlns:UDF": "TallyUDF"
											},
											"COMPANY": {
												"REMOTECMPINFO.LIST": {
													"@": {
														"MERGE": "Yes"
													},
													"NAME": "fdbc4460-756c-11d6-bd67-008048b5445e",
													"REMOTECMPNAME": strSVCURRENTCOMPANY,
													"REMOTECMPSTATE": "TamilNadu"
												}

											}
										},
										{
											"@": {
												"xmlns:UDF": "TallyUDF"
											},
											"COMPANY": {
												"REMOTECMPINFO.LIST": {
													"@": {
														"MERGE": "Yes"
													},
													"NAME": "fdbc4460-756c-11d6-bd67-008048b5445e",
													"REMOTECMPNAME": strSVCURRENTCOMPANY,
													"REMOTECMPSTATE": "TamilNadu"
												}

											}
										}

									]

								}
								invoicedatas.push(invoicedatass);
							}
							var obj = {
								"HEADER": {
									"TALLYREQUEST": "Import Data"
								},
								"BODY": {
									"IMPORTDATA": {
										"REQUESTDESC": {
											"REPORTNAME": "Vouchers",
											"STATICVARIABLES": {
												"SVCURRENTCOMPANY": strSVCURRENTCOMPANY
											}
										},
										"REQUESTDATA": {
											invoicedatas
										}
									}
								}
							}
							var filepath = nconf.get('DOWNLOADURLXML');
							fs.writeFile(filepath + "AccountingVoucher-all.xml", js2xmlparser.parse("ENVELOPE", obj), function (err, data) {
								if (err) console.log(err);
								response.set('Content-Type', 'application/json');
								response.status(200);
								response.json(obj);
								response.status(200);
							}); 
						}
					}).catch(function (err) {
						response.set('Content-Type', 'application/json');
						response.status(400);
						response.json("Error   -- " + err);
					});
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
	app.express.post('/api/job/dues/importdues/', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				jobBal.importdueamount(request.body.dues).then(function (result) {
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

	app.express.post('/api/job/AttendanceAuthorize', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				jobBal.AttendanceAuthorizeSupervisor(request.body.projectid, request.body.clientid, request.body.monthandyear, request.body.status, request.body.billstatus, request.body.approvaltype,request.body.payslipno,request.body.reason).then(function (result) {
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

	app.express.post('/api/job/AttendanceReviewList', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				jobBal.getAuthorizeList(request.body.data.fromdate, request.body.data.todate, request.body.data.regionid).then(function (result) {
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

	app.express.post('/api/job/AuthorizePayslipList', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				jobBal.getAuthorizedPaySlipList(request.body.data.fromdate, request.body.data.todate, request.body.data.regionid).then(function (result) {
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

	app.express.post('/api/job/CashierAuthorize', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				jobBal.CashierAuthorizeApproval(request.body.data[0].projects, request.body.data[0].passordernumber, request.body.data[0].status, request.body.data[0].rejectreason).then(function (result) {
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


	app.express.post('/api/job/SupervoiserReject', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				jobBal.SupervoiserReject(request.body.data[0].projects, request.body.data[0].status, request.body.data[0].rejectreason).then(function (result) {
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

	app.express.get('/api/job/PassOrderNumber', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				jobBal.getPassOrderNumber().then(function (result) {
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

	app.express.get('/api/job/PassOrderNumberList', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				jobBal.getPassOrderNumberForList().then(function (result) {
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

	app.express.get('/api/job/PassOrderNumberListByDate', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				jobBal.getPassOrderNumberForListByDate(request.query.fromdate,request.query.todate).then(function (result) {
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

	app.express.get('/api/job/PassOrderNoProjectDetailsByID', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				jobBal.getPassOrderNoProjectDetailsByID(request.query.passordernumber).then(function (result) {
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
	
	app.express.get('/api/job/DownloadPayslipByID', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				jobBal.getDownloadPayslipByID(request.query.passordernumber).then(function (result) {
					console.log('result', result);
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

	app.express.post('/api/job/CAOApproval', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				jobBal.CAOApproval(request.body.data[0].projects, request.body.data[0].status,request.body.data[0].rejectreason).then(function (result) {
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

	app.express.post('/api/job/getSalarySlipNo', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				jobBal.getSalarySlipNoDetails(request.body.data.fromdate, request.body.data.todate, request.body.data.regionid,request.body.data.projectid).then(function (result) {
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

	app.express.post('/api/job/getInvoiceNo', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				jobBal.getInvoiceNoDetails(request.body.data.fromdate, request.body.data.todate, request.body.data.regionid,request.body.data.projectid).then(function (result) {
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

	app.express.get('/api/job/getWageCategory', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				jobBal.getWageCategoryDetails().then(function (result) {
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

	app.express.get('/api/job/getWageCategoryByProject', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				jobBal.getWageCategoryDetailsByID(request.query.projectid).then(function (result) {
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

	app.express.post('/api/job/createArrearSalarySlip', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				jobBal.createArrearSalarySlip(request.body.data.payslipnos, request.body.data.category, request.body.data.wageyearid).then(function (result) {
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

	app.express.post('/api/job/createArrearClaimBill', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				jobBal.createArrearClaimBill(request.body.data.payslipnos, request.body.data.category, request.body.data.wageyearid).then(function (result) {
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

	app.express.get('/api/job/Payslipprint', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				jobBal.getpayslipprint(request.query.monthandyear,request.query.regionid,request.query.type).then(function (result) {
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

	app.express.post('/api/job/UpdatePrintCount', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				if (request.body.type == 3) {
					// console.log('request.body.type', request.body.type);
					jobBal.UpdatePrintCounts(request.body.invoiceid, request.body.type).then(function (result) {
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
					jobBal.UpdatePrintCount(request.body.payslipno, request.body.type).then(function (result) {
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
				}
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

	app.express.get('/api/job/Invoiceprint', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				jobBal.getinvoiceprint(request.query.monthandyear,request.query.regionid,request.query.type).then(function (result) {
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

	app.express.post('/api/job/getCombinedClaimsProjects', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				jobBal.getCombinedClaimsProjects(request.body.data.fromdate, request.body.data.todate, request.body.data.regionid).then(function (result) {
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

	app.express.post('/api/job/createCombinedClaims', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				//console.log('request.body.data[0].projects',request.body.data[0].projects);
				jobBal.createCombinedClaims(request.body.data[0].projects).then(function (result) {
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

	app.express.get('/api/job/ArrearPayslipprint', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				jobBal.getArrearPayslipprintAdmin(request.query.projectid, request.query.monthandyear,request.query.payslipno).then(function (result) {
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

	app.express.get('/api/job/ArrearClaimprint', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				jobBal.getArrearClaimprint(request.query.invoiceno).then(function (result) {
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

	app.express.get('/api/job/BulkPrint', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				console.log(request);
				jobBal.Bulkprint(request.query.fromdate, request.query.todate, request.query.regionid, request.query.type).then(function (result) {
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

	app.express.post('/api/job/ECRPrint', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				jobBal.DownloadECRPrint(request.body.fromdate, request.body.todate, request.body.regionid, request.body.type).then(function (result) {
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

	app.express.get('/api/job/getProjectDetails', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				jobBal.getProjectDetails(request.query.invoiceno).then(function (result) {
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

	app.express.get('/api/job/getjobpostingdetails', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				jobBal.getjobpostingdetails(request.query.fromdate,request.query.todate).then(function (result) {
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


	
	app.express.get('/api/job/getMemberHistory', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				jobBal.getMemberHistory(request.query.texconumber).then(function (result) {
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


	app.express.post('/api/job/updatejob', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				var podata = request.body.data;
				jobBal.updatePostingOrder(podata.projectid, podata.projectno, podata.texcono, podata.category, podata.memberhistoryid, podata.startdate, podata.memberid).then(function (result) {
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



	app.express.post('/api/job/updateMemberhistory', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				var podata = request.body.data;
				jobBal.updateMemberhistory(podata.projectid, podata.projectno, podata.texcono, podata.category, podata.memberhistoryid, podata.startdate, podata.enddate).then(function (result) {
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


	app.express.post('/api/job/transferposting', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				var query1 = {
					memberid: request.body.data.memberid,
					projectid: request.body.data.projectid,
					projectno: request.body.data.projectno,
					texcono: request.body.data.texcono,
					category: request.body.data.category,
					startdate: request.body.data.startdate,
					approvalstatus : 1,
					working_status  : 1,
					active: 1
				}; 
				jobBal.transferPostingOrder(query1,request.body.data.endate,request.body.data.memberhistoryid).then(function (result) {
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

	app.express.get('/api/job/authorizeattendance', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				jobBal.getattendancereview(request.query.clientid, request.query.projectid, request.query.monthandyear, request.query.types).then(function (result) {
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
	
	app.express.post('/api/job/addHistory', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				var podata = request.body.data;
				jobBal.addPostingOrder(podata.projectid, podata.projectno, podata.texcono, podata.category, podata.startdate, podata.enddate, podata.serviceno).then(function (result) {
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

	app.express.post('/api/job/import/memberhistory', function (request, response) {  
		request.setTimeout(0);
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				var podata = request.body.memberdata;
				jobBal.addbulkPostingOrder(podata[0]).then(function (result) {
					if (result) {
						response.set('Content-Type', 'application/json');
						response.status(200);
						response.json(result);
					}
				}).catch(function (err) { 
					console.log('err',err);
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
		get jobmaster
	*/
	app.express.get('/api/job/jobmasterByVacancy/', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				jobBal.getjobmasterVACStatus().then(function (result) {
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
		cancel psoting order
	*/
	app.express.post('/api/job/cancelpostingorder', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				jobBal.cancelPostingOrder(request.body.memberhistoryid, request.body.memberid).then(function (result) {
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
	     Get Vacancy status
	*/
	app.express.get('/api/vacancypublishstatus', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				jobBal.getVacancyViewStatus().then(function (result) {

					//console.log(result);
					if(result==0)
					{
						result=2;
					}
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


	app.express.get('/api/vacancypublishstatuss', function (request, response) {
		
				jobBal.getVacancyViewStatus().then(function (result) {

					//console.log(result);
					if(result==0)
					{
						result=2;
					}
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

	const contentType = 'Content-Type';
	const applicationJson = 'application/json';

	const handleSuccessResponse = (response, responseObject) => {		
		response.set(contentType, applicationJson);
		response.status(200);
		response.json(responseObject);
	}

	const handleErrorResponse = (response, httpStatusCode, errorMessage) => {
		response.set(contentType, applicationJson);
		response.status(httpStatusCode);
		response.json(errorMessage);
	}
}




//DELETE FROM `texco_new_live`.`jobposting` WHERE  `jobpostingid`=2647;
//UPDATE `texco_new_live`.`agreement` SET `active`='0' WHERE  `agreementid`=1820;