var dependentBal = require('./../BAL/dependentBAL');
var dependentModel = require('./../Model/dependent');
var nodeExcel = require('excel-export');
var ifsc = require('ifsc');
var settingBal = require('./../BAL/settingBAL');
var crypto = require('crypto');
var CryptoJS = require("crypto-js");
var errorDAL = require('./../DAL/errorDAL');
var nconf = require('./../Utils/EnvironmentUtil');
var base64Key = nconf.get('BASE64KEY');
var iv = nconf.get('IV');
var fs = require("fs");
var filepaths = nconf.get('VACANCYERRORURL');
var stream = fs.createWriteStream(filepaths, {'flags': 'a'});
var filepathh = nconf.get('NODEERRORURL');
var logger = require('../DAL/logger').createLogger(filepathh);
logger.setLevel('debug');

module.exports = function (app) {
	
	

	app.express.post('/api/adddependent', function (request, response) {
		
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				var dependent = new dependentModel.dependent(request.body);
				// console.log('member', member);  
				console.log('retet',dependent);
				
							
				dependentBal.createDependent(dependent).then(function (result) {
					if (result) {
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


	app.express.post('/api/addSkillsMembers', function (request, response) {
		
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				var skillmember = new dependentModel.skillmember(request.body);
				// console.log('member', member);  
				console.log('retet',skillmember);
				
							
				dependentBal.skillmemberadd(skillmember).then(function (result) {
					if (result) {
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

	app.express.post('/api/updateSkillsMembers', function (request, response) {
		
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				var skills = new dependentModel.skillmember(request.body);
				// console.log('member', member);  
				console.log('retet',request.body);
				
							
				dependentBal.updateSkillsMembers(skills,request.body.memberskillid).then(function (result) {
					if (result) {
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

	app.express.post('/api/editdependent', function (request, response) {
		
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				var dependent = new dependentModel.dependent(request.body);
				// console.log('member', member);  
				console.log('retet',request.body);
				
							
				dependentBal.updateDependent(dependent,request.body.dependentId).then(function (result) {
					if (result) {
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



	app.express.post('/api/dependent/adddepmembers', function (request, response) {
		console.log(request.body);
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				var member = new dependentModel.memberdep(request.body);
				
			
				dependentBal.creatememberdep(member).then(function (result) {
					if (result) {
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


	app.express.post('/api/updatedepstatus', function (request, response) {
		
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				var dependent = request.body;
				// console.log('member', member);  
				console.log('retet',request.body);
				
							
				dependentBal.updateDependentstatus(dependent).then(function (result) {
					if (result) {
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

	app.express.get('/api/dependent/getdependent/member', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				dependentBal.getmemberDependent(request.query.memberid).then(function (result) {
					if (result) {
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


	app.express.get('/api/getskill/member', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				dependentBal.getmemberskill(request.query.memberid).then(function (result) {
					if (result) {
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
