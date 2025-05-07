var memberBal = require('./../BAL/memberBAL');
var memberModel = require('./../Model/member');
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
	/*
	     get member details export
	*/
	app.express.get('/api/members/export', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				memberBal.getmembersexport(request.query.regionid, request.query.districtid, request.query.statusid).then(function (result) {
					if (result) {
						response.set('Content-Type', 'application/json');
						response.status(200);
						response.json(result);
					}
				}).catch(function (err) {
					response.set('Content-Type', 'application/json');
					response.status(400);
					response.json("Error   -- " + err);
				});	
			} else {
				response.set('Content-Type', 'application/json');
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
	     Post Method to create member
	*/
	app.express.post('/api/members', function (request, response) {
		console.log(request.body);
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				var member = new memberModel.member(request.body.firstname.toUpperCase(), request.body.lastname.toUpperCase(), request.body.fathername.toUpperCase(), request.body.dob, request.body.email, request.body.mobile, request.body.address.toUpperCase(), request.body.village.toUpperCase(),  (request.body.talukid ? parseInt(request.body.talukid) : 0),(request.body.stateid ? parseInt(request.body.stateid) : 0),(request.body.countryid ? parseInt(request.body.countryid) : 0), request.body.pincode, request.body.addressstatus, request.body.communicationaddress.toUpperCase(), request.body.aadhaarno, (request.body.genderid ? parseInt(request.body.genderid) : 0), (request.body.districtid ? parseInt(request.body.districtid) : 0), (request.body.regionid ? parseInt(request.body.regionid) : 0), request.body.doj, request.body.accountno, request.body.nominee.toUpperCase(), (request.body.nomineerelationid ? parseInt(request.body.nomineerelationid) : 0), (request.body.rankid ? parseInt(request.body.rankid) : 0), (request.body.corpsid ? parseInt(request.body.corpsid) : 0),(request.body.tradeid ? parseInt(request.body.tradeid) : 0), request.body.esmidno, (request.body.characterid ? parseInt(request.body.characterid) : 0), (request.body.religionid ? parseInt(request.body.religionid) : 0), (request.body.casteid ? parseInt(request.body.casteid) : 0), request.body.civilqual, request.body.armyqual, request.body.dependentstatus, request.body.dependentname.toUpperCase(), request.body.nationality, request.body.changedby.toUpperCase(), request.body.registrationno.toUpperCase(), request.body.serviceno.toUpperCase(), (request.body.lastaccess ? request.body.lastaccess : null) , request.body.texcono.toUpperCase(), request.body.panno.toUpperCase(), request.body.uanno.toUpperCase(), request.body.branchcode, request.body.branchname, request.body.ifsccode);
				// console.log('member', member);  

				
							
				memberBal.createmember(member).then(function (result) {
					if (result) {
						response.set('Content-Type', 'application/json');
						response.status(200);
						response.json(result);
					}
				}).catch(function (err) {
					response.set('Content-Type', 'application/json');
					response.status(400);
					response.json("Error   -- " + err);
				});
			} else {
				response.set('Content-Type', 'application/json');
				response.status(400);
				response.json("Error   -- Wrong Token");
			}
		}).catch(function (err) {
			response.set('Content-Type', 'application/json');
			response.status(400);
			response.json("Error   -- " + err);
		});
	});

	app.express.post('/api/adddependent', function (request, response) {
		
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				var dependent = new memberModel.dependent(request.body);
				// console.log('member', member);  
				console.log('retet',dependent);
				
							
				memberBal.createDependent(dependent).then(function (result) {
					if (result) {
						response.set('Content-Type', 'application/json');
						response.status(200);
						response.json(result);
					}
				}).catch(function (err) {
					response.set('Content-Type', 'application/json');
					response.status(400);
					response.json("Error   -- " + err);
				});
			} else {
				response.set('Content-Type', 'application/json');
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
       Post Method to update member
   */
	app.express.put('/api/members', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				var member = new memberModel.member(request.body.firstname, request.body.lastname, request.body.fathername, request.body.dob, request.body.email, request.body.mobile, request.body.address.toUpperCase(), request.body.village, (request.body.talukid ? parseInt(request.body.talukid) : 0),(request.body.stateid ? parseInt(request.body.stateid) : 0),(request.body.countryid ? parseInt(request.body.countryid) : 0), request.body.pincode,  (request.body.addressstatus ? parseInt(request.body.addressstatus) : 0), request.body.communicationaddress.toUpperCase(), request.body.aadhaarno,  (request.body.genderid ? parseInt(request.body.genderid) : 0), (request.body.districtid ? parseInt(request.body.districtid) : 0), (request.body.regionid ? parseInt(request.body.regionid) : 0), request.body.doj, request.body.accountno, request.body.nominee.toUpperCase(), (request.body.nomineerelationid ? parseInt(request.body.nomineerelationid) : 0), (request.body.rankid ? parseInt(request.body.rankid) : 0), (request.body.corpsid ? parseInt(request.body.corpsid) : 0),(request.body.tradeid ? parseInt(request.body.tradeid) : 0), request.body.esmidno,  (request.body.characterid ? parseInt(request.body.characterid) : 0), (request.body.religionid ? parseInt(request.body.religionid) : 0), (request.body.casteid ? parseInt(request.body.casteid) : 0), request.body.civilqual, request.body.armyqual, request.body.dependentstatus, request.body.dependentname.toUpperCase(), request.body.nationality, request.body.changedby.toUpperCase(), request.body.registrationno, request.body.serviceno.toUpperCase(), (request.body.lastaccess ? request.body.lastaccess : null), request.body.texcono.toUpperCase(), request.body.panno.toUpperCase(), request.body.uanno.toUpperCase(), request.body.ifsccode.toUpperCase(), request.body.branchcode, request.body.branchname); 
				memberBal.updatemember(member, (request.body.memberid ? parseInt(request.body.memberid) : 0)).then(function (result) {
					if (result) {
						response.set('Content-Type', 'application/json');
						response.status(200);
						response.json(result);
					}
				}).catch(function (err) {
					response.set('Content-Type', 'application/json');
					response.status(400);
					response.json("Error   -- " + err);
				});
			} else {
				response.set('Content-Type', 'application/json');
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
      Post Method to Edit member
   */
	app.express.delete('/api/members', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				memberBal.updatememberstatus(request.body.memberid).then(function (result) {
					if (result) {
						response.set('Content-Type', 'application/json');
						response.status(200);
						response.json(result);
					}
				}).catch(function (err) {
					response.set('Content-Type', 'application/json');
					response.status(400);
					response.json("Error   -- " + err);
				});
			} else {
				response.set('Content-Type', 'application/json');
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
	     get number of members
	*/

	app.express.get('/api/members/totalmembers', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				memberBal.getnumberofmembers().then(function (result) {
					if (result) {
						response.set('Content-Type', 'application/json');
						response.status(200);
						response.json(result);
					}
				}).catch(function (err) {
					response.set('Content-Type', 'application/json');
					response.status(400);
					response.json("Error   -- " + err);
				});
			} else {
				response.set('Content-Type', 'application/json');
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
	     get all member
	*/
	app.express.get('/api/members/all', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				memberBal.getallmember().then(function (result) {
					if (result) {
						response.set('Content-Type', 'application/json');
						response.status(200);
						response.json(result);
					}
				}).catch(function (err) {
					response.set('Content-Type', 'application/json');
					response.status(400);
					response.json("Error   -- " + err);
				});
			} else {
				response.set('Content-Type', 'application/json');
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
	     get all member
	*/
	app.express.get('/api/members', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				memberBal.getmember(0).then(function (result) {
					if (result) {
						response.set('Content-Type', 'application/json');
						response.status(200);
						response.json(result);
					}
				}).catch(function (err) {
					response.set('Content-Type', 'application/json');
					response.status(400);
					response.json("Error   -- " + err);
				});
			} else {
				response.set('Content-Type', 'application/json');
				response.status(400);
				response.json("Error   -- Wrong Token");
			}
		}).catch(function (err) {
			response.set('Content-Type', 'application/json');
			response.status(400);
			response.json("Error   -- " + err);
		});
	});

	// get members above 58

	app.express.get('/api/membersabove58', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				memberBal.getmemberbyabove58(0).then(function (result) {
					if (result) {
						response.set('Content-Type', 'application/json');
						response.status(200);
						response.json(result);
					}
				}).catch(function (err) {
					response.set('Content-Type', 'application/json');
					response.status(400);
					response.json("Error   -- " + err);
				});
			} else {
				response.set('Content-Type', 'application/json');
				response.status(400);
				response.json("Error   -- Wrong Token");
			}
		}).catch(function (err) {
			response.set('Content-Type', 'application/json');
			response.status(400);
			response.json("Error   -- " + err);
		});
	});

	app.express.get('/api/membersaboveworking58', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				memberBal.getmembersaboveworking58(0).then(function (result) {
					if (result) {
						response.set('Content-Type', 'application/json');
						response.status(200);
						response.json(result);
					}
				}).catch(function (err) {
					response.set('Content-Type', 'application/json');
					response.status(400);
					response.json("Error   -- " + err);
				});
			} else {
				response.set('Content-Type', 'application/json');
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
	     get all member
	*/
	app.express.get('/api/members/:id', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {

				memberBal.getmember(request.params.id).then(function (result) {
					if (result) {
						response.set('Content-Type', 'application/json');
						response.status(200);
						response.json(result);
					}
				}).catch(function (err) {
					response.set('Content-Type', 'application/json');
					response.status(400);
					response.json("Error   -- " + err);
				});
			} else {
				response.set('Content-Type', 'application/json');
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
	     get member details by serviceno
	*/
	
	app.express.get('/api/memberinfo', function (request, response) {  
		request.setTimeout(0);
		var datas =" Date - "+ new Date() + "  - Login member - Before Success - JobService.JS - TexcoNo - "+request.query.texserno+" Token Value - " +request.headers['authorization'] 
		logger.debug(datas);

		// stream.once('open', function(fd) {
		// 	stream.write(" Date - "+ new Date() + "  - Login member - Before Success - JobService.JS - TexcoNo - "+request.query.texserno+" Token Value - " +request.headers['authorization']);
		// }); 
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				memberBal.getmemberinfo(request.query.texserno,request.query.ipaddress).then(function (result) {  
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


	app.express.get('/api/memberinfologin', function (request, response) {  
		request.setTimeout(0);
		stream.once('open', function(fd) {
			stream.write(" Date - "+ new Date() + "  - Getting Person Details Service Call - Before Success - JobService.JS - TexcoNo - "+request.query.texserno+" Token Value - " +request.headers['authorization']);
		}); 
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				memberBal.getmemberinfologin(request.query.texserno).then(function (result) {  
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


	app.express.get('/api/memberinfologinlatest', function (request, response) {  
		request.setTimeout(0);
		stream.once('open', function(fd) {
			stream.write(" Date - "+ new Date() + "  - Getting Person Details Service Call - Before Success - JobService.JS - TexcoNo - "+request.query.texserno+" Token Value - " +request.headers['authorization']);
		}); 
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				memberBal.getmemberinfologinlatest(request.query.texserno).then(function (result) {  
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

	app.express.get('/api/sendOTP', function (request, response) {  
		request.setTimeout(0);
		stream.once('open', function(fd) {
			stream.write(" Date - "+ new Date() + "  - Getting Person Details Service Call - Before Success - JobService.JS - TexcoNo - "+request.query.texserno+" Token Value - " +request.headers['authorization']);
		}); 
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				memberBal.sendOTP(request.query.texserno).then(function (result) {  
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



	
	// app.express.post('/api/verifyOTP', function (request, response) {  
	// 	request.setTimeout(0);
	// 	stream.once('open', function(fd) {
	// 		stream.write(" Date - "+ new Date() + "  - Getting Person Details Service Call - Before Success - JobService.JS - TexcoNo - "+request.query.texserno+" Token Value - " +request.headers['authorization']);
	// 	}); 
	// 	settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
	// 		if(results) {
	// 			memberBal.verifyOTP(request.body.memberid,request.body.otp).then(function (result) {  
	// 				stream.once('open', function(fd) {
	// 					stream.write(" Date - "+ new Date() + "  -  Getting Person Details Service Call - After Success - JobService.JS - TexcoNo - "+request.query.texserno+" Token Value - " +request.headers['authorization']);
	// 				}); 
	// 				if (!result.success === false) {
	// 					response.set('Content-Type', 'application/json');
	// 					response.status(200);
	// 					response.json(result);
	// 				}
	// 			}).catch(function (err) {
	// 				response.set('Content-Type', 'application/json');
	// 				response.status(400);
	// 				response.json("Error   -- " + err);
	// 			});
	// 		} else {
	// 			response.set('Content-Type', 'application/json');
	// 			response.status(400);
	// 			response.json("Error   -- Wrong Token");
	// 		}
	// 	}).catch(function (err) {
	// 		response.set('Content-Type', 'application/json');
	// 		response.status(400);
	// 		response.json("Error   -- " + err);
	// 	});
	// });

	app.express.post('/api/verifyOTP', async function (request, response) {  
		try {
			request.setTimeout(0);
			// Log request (Ensure stream is opened properly before writing)
			if (stream.writable) {
				stream.write(`\n[${new Date()}] Verifying OTP - TexcoNo: ${request.query.texserno} | Token: ${request.headers['authorization']}`);
			}
	
			// Validate Authorization Token
			const results = await settingBal.getAuthorizationToken(request.headers['authorization']);
	
			if (!results) {
				return response.status(400).json({ error: "Error -- Wrong Token" });
			}
	
			// Verify OTP
			const result = await memberBal.verifyOTP(request.body.memberid, request.body.otp);
	
			// Prevent login if OTP verification fails
			if (!result || result.success === false) {
				return response.status(400).json({ error: "Error -- Invalid OTP" });
			}
	
			// Log success response
			if (stream.writable) {
				stream.write(`\n[${new Date()}] OTP Verified Successfully - TexcoNo: ${request.query.texserno}`);
			}
				return response.status(200).json(result);
	
		} catch (err) {
			return response.status(500).json({ error: "Error -- " + err.message });
		}
	});
	

	app.express.get('/api/memberinfoblock', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				memberBal.getmemberinfo(request.query.texserno).then(function (result) {
					if (result) {
						response.set('Content-Type', 'application/json');
						response.status(200);
						response.json(result);
					}
				}).catch(function (err) {
					response.set('Content-Type', 'application/json');
					response.status(400);
					response.json("Error   -- " + err);
				});
			} else {
				response.set('Content-Type', 'application/json');
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
	     Post Method to Import Employee Lastaccess
	*/
	app.express.post('/api/members/lastaccess/import', function (request, response) {  console.log('request.body.memberdetail',request.body.memberdetail);
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				memberBal.importlastaccess(request.body.memberdetail).then(function (result) {
					if (result) {
						response.set('Content-Type', 'application/json');
						response.status(200);
						response.json(result);
					}
				}).catch(function (err) {
					response.set('Content-Type', 'application/json');
					response.status(400);
					response.json("Error   -- " + err);
				});
			} else {
				response.set('Content-Type', 'application/json');
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
	     Post Method to Import Employee Lastaccess
	*/
	app.express.post('/api/members/update/rank', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				memberBal.updaterank(request.body.memberid, request.body.rankid).then(function (result) {
					if (result) {
						response.set('Content-Type', 'application/json');
						response.status(200);
						response.json(result);
					}
				}).catch(function (err) {
					response.set('Content-Type', 'application/json');
					response.status(400);
					response.json("Error   -- " + err);
				});
			} else {
				response.set('Content-Type', 'application/json');
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
	     Post Method to create memberblock
	*/
	app.express.post('/api/members/block', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				var memberblock = new memberModel.memberblock(request.body.memberid, request.body.reason, request.body.comment, new Date(request.body.enddate), request.body.ispfblock,request.body.blocktype,request.body.memberblock,request.body.changedby, request.body.isrepcoblock);
				console.log('request.body.isrepcoblock',request.body.isrepcoblock);
				if(request.body.blocktype == 1) {
					// console.log('test');
					memberBal.validatememberblock(request.body.memberid,0).then(function (result) {
						// console.log('result',result.count);
						if (result.count == 0) {
							memberBal.creatememberblock(memberblock).then(function (result) {
								if (result) {
									response.set('Content-Type', 'application/json');
									response.status(200);
									response.json(result);
								}
							}).catch(function (err) {
								response.set('Content-Type', 'application/json');
								response.status(400);
								response.json("Error   -- " + err);
							});
						} else {
							response.set('Content-Type', 'application/json');
							response.status(400);
							response.json("This member already added in blocklist");
						}
					}).catch(function (err) {
						response.set('Content-Type', 'application/json');
						response.status(400);
						response.json("Error   -- " + err);
					});
				} else {
					memberBal.validatememberblockothers(request.body.memberid,1).then(function (result) {
						if (result.count == 0) {
							memberBal.creatememberblock(memberblock).then(function (result) {
								if(result) {
									var pfstatus = 1;
									if(request.body.ispfblock == 1) {
										pfstatus = 2;
									}
									var repcostatus = 1;
									if(request.body.isrepcoblock == 1) {
										repcostatus = 2;
									}
									memberBal.updatememberrepcostatus(request.body.memberid,repcostatus,pfstatus,request.body.reason).then(function (result) {
										if (result) {
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
							}).catch(function (err) {
								response.set('Content-Type', 'application/json');
								response.status(400);
								response.json("Error   -- " + err);
							});
						} else {
							response.set('Content-Type', 'application/json');
							response.status(400);
							response.json("This member already added in blocklist.");
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
	
	/*
       Put Method to update memberblock
   */

	app.express.put('/api/members/block', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				var memberblock = new memberModel.memberblock(request.body.memberid, request.body.reason, request.body.comment, new Date(request.body.enddate), request.body.ispfblock,request.body.blocktype,request.body.memberblock,request.body.changedby, request.body.isrepcoblock);
				if(request.body.blocktype == 1) {
					memberBal.updatememberblock(memberblock, request.body.memberblockid).then(function (result) {
						if (result) {
							response.set('Content-Type', 'application/json');
							response.status(200);
							response.json(result);
						}
					}).catch(function (err) {
						response.set('Content-Type', 'application/json');
						response.status(400);
						response.json("Error   -- " + err);
					});
				} else {
					memberBal.updatememberblock(memberblock, request.body.memberblockid).then(function (result) {
						if(result) {
							var pfstatus = 1;
							if(request.body.ispfblock == 1) {
								pfstatus = 2;
							}
							var repcostatus = 1;
							if(request.body.isrepcoblock == 1) {
								repcostatus = 2;
							}
							memberBal.updatememberrepcostatus(request.body.memberid,repcostatus,pfstatus,request.body.reason).then(function (result) {
								if (result) {
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

	/*
      Post Method to Edit memberblock
   */
	app.express.delete('/api/members/block/updatestatus', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				memberBal.updatememberblockstatus(request.body.memberblockid).then(function (result) {
					if (result) {
						response.set('Content-Type', 'application/json');
						response.status(200);
						response.json(result);
					}
				}).catch(function (err) {
					response.set('Content-Type', 'application/json');
					response.status(400);
					response.json("Error   -- " + err);
				});
			} else {
				response.set('Content-Type', 'application/json');
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
	     get number of memberblock
	*/
	app.express.get('/api/memberblock', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				memberBal.getmemberblocks(request.query.memberblockid).then(function (result) {
					if (result) {
						response.set('Content-Type', 'application/json');
						response.status(200);
						response.json(result);
					}
				}).catch(function (err) {
					response.set('Content-Type', 'application/json');
					response.status(400);
					response.json("Error   -- " + err);
				});
			} else {
				response.set('Content-Type', 'application/json');
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
	     get all member
	*/
	app.express.get('/api/member/history', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				memberBal.getmemberhistory(request.query.memberid).then(function (result) {
					if (result) {
						response.set('Content-Type', 'application/json');
						response.status(200);
						response.json(result);
					}
				}).catch(function (err) {
					response.set('Content-Type', 'application/json');
					response.status(400);
					response.json("Error   -- " + err);
				});
			} else {
				response.set('Content-Type', 'application/json');
				response.status(400);
				response.json("Error   -- Wrong Token");
			}
		}).catch(function (err) {
			response.set('Content-Type', 'application/json');
			response.status(400);
			response.json("Error   -- " + err);
		});
	});

	// search members
	app.express.get('/api/membersearch', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				memberBal.getmemberSearchHistory(request.query.membersearchval).then(function (result) {
					if (result) {
						response.set('Content-Type', 'application/json');
						response.status(200);
						response.json(result);
					}
				}).catch(function (err) {
					response.set('Content-Type', 'application/json');
					response.status(400);
					response.json("Error   -- " + err);
				});
			} else {
				response.set('Content-Type', 'application/json');
				response.status(400);
				response.json("Error   -- Wrong Token");
			}
		}).catch(function (err) {
			response.set('Content-Type', 'application/json');
			response.status(400);
			response.json("Error   -- " + err);
		});
	});

	app.express.post('/api/member/memberchange', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				memberBal.updatememberchange(request.body.changememberid, request.body.memberid).then(function (result) {

					if (result) {
						response.set('Content-Type', 'application/json');
						response.status(200);
						response.json(result);
					}
				}).catch(function (err) {
					response.set('Content-Type', 'application/json');
					response.status(400);
					response.json("Error   -- " + err);
				});
			} else {
				response.set('Content-Type', 'application/json');
				response.status(400);
				response.json("Error   -- Wrong Token");
			}
		}).catch(function (err) {
			response.set('Content-Type', 'application/json');
			response.status(400);
			response.json("Error   -- " + err);
		});
	});

	//changes - 21-08-2019
	app.express.get('/api/getmembersearch', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) { 

				var encrypted = request.query.membersearchval;  
				
 				var decrypted = CryptoJS.AES.decrypt(encrypted,base64Key,{ iv: iv });
				var descrString = decrypted.toString(CryptoJS.enc.Utf8);
				console.log('descrString',descrString);

				memberBal.getmemberSearchDetails(descrString).then(function (result) {
					if (result) {
						
						const encryptedWord = CryptoJS.enc.Utf8.parse(result); 
						const parseString = CryptoJS.enc.Base64.stringify(encryptedWord);

						var encrypted = CryptoJS.AES.encrypt(parseString,base64Key,{ iv: iv });
						var cypherString = encrypted.ciphertext.toString(CryptoJS.enc.Base64);

						response.set('Content-Type', 'application/json');
						response.status(200);
						response.json(cypherString);
					}
				}).catch(function (err) {
					response.set('Content-Type', 'application/json');
					response.status(400);
					response.json("Error   -- " + err);
				});
			} else {
				response.set('Content-Type', 'application/json');
				response.status(400);
				response.json("Error   -- Wrong Token");
			}
		}).catch(function (err) {
			response.set('Content-Type', 'application/json');
			response.status(400);
			response.json("Error   -- " + err);
		});
	});
	
	app.express.get('/api/getmemberssearch', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) { 

				var encrypted = request.query.membersearchval;  
				
 			//	var decrypted = CryptoJS.AES.decrypt(encrypted,base64Key,{ iv: iv });
			//	var descrString = decrypted.toString(CryptoJS.enc.Utf8);
				console.log('descrString',encrypted);

				memberBal.getmembersSearchDetails(encrypted).then(function (result) {
					if (result) {
						
						//const encryptedWord = CryptoJS.enc.Utf8.parse(result); 
					//	const parseString = CryptoJS.enc.Base64.stringify(encryptedWord);

						//var encrypted = CryptoJS.AES.encrypt(parseString,base64Key,{ iv: iv });
					//	var cypherString = encrypted.ciphertext.toString(CryptoJS.enc.Base64);

						response.set('Content-Type', 'application/json');
						response.status(200);
						response.json(result);
					}
				}).catch(function (err) {
					response.set('Content-Type', 'application/json');
					response.status(400);
					response.json("Error   -- " + err);
				});
			} else {
				response.set('Content-Type', 'application/json');
				response.status(400);
				response.json("Error   -- Wrong Token");
			}
		}).catch(function (err) {
			response.set('Content-Type', 'application/json');
			response.status(400);
			response.json("Error   -- " + err);
		});
	});
	//changes - 31-08-2019
	app.express.get('/api/closedmembersearch', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				memberBal.getClosedmemberSearchHistory(request.query.membersearchval).then(function (result) {
					if (result) {
						response.set('Content-Type', 'application/json');
						response.status(200);
						response.json(result);
					}
				}).catch(function (err) {
					response.set('Content-Type', 'application/json');
					response.status(400);
					response.json("Error   -- " + err);
				});
			} else {
				response.set('Content-Type', 'application/json');
				response.status(400);
				response.json("Error   -- Wrong Token");
			}
		}).catch(function (err) {
			response.set('Content-Type', 'application/json');
			response.status(400);
			response.json("Error   -- " + err);
		});
	});

	app.express.post('/api/member/memberclosed', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				memberBal.ClosedMembersProject(request.body.texcono, (request.body.memberid ? parseInt(request.body.memberid) : 0), request.body.serviceno, request.body.firstname).then(function (result) {
					if (result.message == "Success") {
						response.set('Content-Type', 'application/json');
						response.status(200);
						response.json(result);
					} else if (result.message == "Failure") {
						response.set('Content-Type', 'application/json');
						response.status(200);
						response.json(result);
					}
				}).catch(function (err) {
					response.set('Content-Type', 'application/json');
					response.status(400);
					response.json("Error   -- " + err);
				});
			} else {
				response.set('Content-Type', 'application/json');
				response.status(400);
				response.json("Error   -- Wrong Token");
			}
		}).catch(function (err) {
			response.set('Content-Type', 'application/json');
			response.status(400);
			response.json("Error   -- " + err);
		});
	});

	app.express.get('/api/rejectedMemberDetails', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				memberBal.getrejectedMemberDetails().then(function (result) {
					if (result) {
						response.set('Content-Type', 'application/json');
						response.status(200);
						response.json(result);
					}
				}).catch(function (err) {
					response.set('Content-Type', 'application/json');
					response.status(400);
					response.json("Error   -- " + err);
				});
			} else {
				response.set('Content-Type', 'application/json');
				response.status(400);
				response.json("Error   -- Wrong Token");
			}
		}).catch(function (err) {
			response.set('Content-Type', 'application/json');
			response.status(400);
			response.json("Error   -- " + err);
		});
	});

	app.express.get('/api/closedmemberslist', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				memberBal.getclosedmemberslistDetails().then(function (result) {
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

	app.express.post('/api/member/membercloseddelete', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				memberBal.getmemberClosedDelete(request.body.closedid).then(function (result) {
					if (result) {
						response.set('Content-Type', 'application/json');
						response.status(200);
						response.json(result);
					}
				}).catch(function (err) {
					response.set('Content-Type', 'application/json');
					response.status(400);
					response.json("Error   -- " + err);
				});
			} else {
				response.set('Content-Type', 'application/json');
				response.status(400);
				response.json("Error   -- Wrong Token");
			}
		}).catch(function (err) {
			response.set('Content-Type', 'application/json');
			response.status(400);
			response.json("Error   -- " + err);
		});
	});

	app.express.post('/api/MoveToCarryforwardByID', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				memberBal.addMoveToCarryforward(request.body.projectid, request.body.category, request.body.serviceno, request.body.firstname, request.body.texcono).then(function (result) {
					if (result) {
						response.set('Content-Type', 'application/json');
						response.status(200);
						response.json(result);
					}
				}).catch(function (err) {
					response.set('Content-Type', 'application/json');
					response.status(400);
					response.json("Error   -- " + err);
				});
			} else {
				response.set('Content-Type', 'application/json');
				response.status(400);
				response.json("Error   -- Wrong Token");
			}
		}).catch(function (err) {
			response.set('Content-Type', 'application/json');
			response.status(400);
			response.json("Error   -- " + err);
		});
	});

	app.express.get('/api/ExcelExport', function (req, res) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				var conf = {};
				// conf.stylesXmlFile = "styles.xml";
				conf.name = "mysheet";
				conf.cols = [{
					caption: 'string',
					type: 'string',
					beforeCellWrite: function (row, cellData) {
						return cellData.toUpperCase();
					},
					width: 28.7109375
				}, {
					caption: 'date',
					type: 'date',
					beforeCellWrite: function () {
						var originDate = new Date(Date.UTC(1899, 11, 30));
						return function (row, cellData, eOpt) {
							if (eOpt.rowNum % 2) {
								eOpt.styleIndex = 1;
							} else {
								eOpt.styleIndex = 2;
							}
							if (cellData === null) {
								eOpt.cellType = 'string';
								return 'N/A';
							} else
								return (cellData - originDate) / (24 * 60 * 60 * 1000);
						}
					}()
				}, {
					caption: 'bool',
					type: 'bool'
				}, {
					caption: 'number',
					type: 'number'
				}];
				conf.rows = [
					['pi', new Date(Date.UTC(2013, 4, 1)), true, 3.14],
					["e", new Date(2012, 4, 1), false, 2.7182],
					["M&M<>'", new Date(Date.UTC(2013, 6, 9)), false, 1.61803],
					["null date", null, true, 1.414]
				];
				var result = nodeExcel.execute(conf);
				res.setHeader('Content-Type', 'application/vnd.openxmlformats');
				res.setHeader("Content-Disposition", "attachment; filename=" + "Report.xlsx");
				res.end(result, 'binary');
			} else {
				response.set('Content-Type', 'application/json');
				response.status(400);
				response.json("Error   -- Wrong Token");
			}
		}).catch(function (err) {
			response.set('Content-Type', 'application/json');
			response.status(400);
			response.json("Error   -- " + err);
		});
	});

	app.express.get('/api/member/RegionDetails', function (request, response) {
		settingBal.getAuthorizationTokenAdd(request.headers['authorization']).then(function (results) {
			if(results) {
				memberBal.getregion().then(function (result) {
					if (result) {
						response.set('Content-Type', 'application/json');
						response.status(200);
						response.json(result);
					}
				}).catch(function (err) {
					response.set('Content-Type', 'application/json');
					response.status(400);
					response.json("Error   -- " + err);
				});
			} else {
				response.set('Content-Type', 'application/json');
				response.status(400);
				response.json("Error   -- Wrong Token");
			}
		}).catch(function (err) {
			response.set('Content-Type', 'application/json');
			response.status(400);
			response.json("Error   -- " + err);
		});
	});

	app.express.get('/api/member/TalukDetails', function (request, response) {
		settingBal.getAuthorizationTokenAdd(request.headers['authorization']).then(function (results) {
			if(results) {
				memberBal.gettaluk().then(function (result) {
					if (result) {
						response.set('Content-Type', 'application/json');
						response.status(200);
						response.json(result);
					}
				}).catch(function (err) {
					response.set('Content-Type', 'application/json');
					response.status(400);
					response.json("Error   -- " + err);
				});
			} else {
				response.set('Content-Type', 'application/json');
				response.status(400);
				response.json("Error   -- Wrong Token");
			}
		}).catch(function (err) {
			response.set('Content-Type', 'application/json');
			response.status(400);
			response.json("Error   -- " + err);
		});
	});

	app.express.get('/api/member/getIFSCCode', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				ifsc.fetchDetails(request.query.ifsccode).then(function (res) {
					console.log('res', res);
					if (res) {
						response.set('Content-Type', 'application/json');
						response.status(200);
						response.json(res);
					}
				})
			} else {
				response.set('Content-Type', 'application/json');
				response.status(400);
				response.json("Error   -- Wrong Token");
			}
		}).catch(function (err) {
			response.set('Content-Type', 'application/json');
			response.status(400);
			response.json("Error   -- " + err);
		});
	});

	// Update Account Number
	app.express.put('/api/accountno', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				memberBal.updataccountno(request.body.memberid, request.body.accountno).then(function (result) {
					if (result) {
						response.set('Content-Type', 'application/json');
						response.status(200);
						response.json(result);
					}
				}).catch(function (err) {
					response.set('Content-Type', 'application/json');
					response.status(400);
					response.json("Error   -- " + err);
				});
			} else {
				response.set('Content-Type', 'application/json');
				response.status(400);
				response.json("Error   -- Wrong Token");
			}
		}).catch(function (err) {
			response.set('Content-Type', 'application/json');
			response.status(400);
			response.json("Error   -- " + err);
		});
	}); 


	app.express.get('/api/getmembersearchold', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				memberBal.getmemberSearchOldDetails(request.query.membersearchval).then(function (result) {
					if (result) {
						response.set('Content-Type', 'application/json');
						response.status(200);
						response.json(result);
					}
				}).catch(function (err) {
					response.set('Content-Type', 'application/json');
					response.status(400);
					response.json("Error   -- " + err);
				});
			} else {
				response.set('Content-Type', 'application/json');
				response.status(400);
				response.json("Error   -- Wrong Token");
			}
		}).catch(function (err) {
			response.set('Content-Type', 'application/json');
			response.status(400);
			response.json("Error   -- " + err);
		});
	});

	app.express.post('/api/DeleteCarryforwardByID', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				memberBal.DeleteToCarryforward(request.body.projectid, request.body.category, request.body.serviceno, request.body.firstname, request.body.texcono).then(function (result) {
					if (result) {
						response.set('Content-Type', 'application/json');
						response.status(200);
						response.json(result);
					}
				}).catch(function (err) {
					response.set('Content-Type', 'application/json');
					response.status(400);
					response.json("Error   -- " + err);
				});
			} else {
				response.set('Content-Type', 'application/json');
				response.status(400);
				response.json("Error   -- Wrong Token");
			}
		}).catch(function (err) {
			response.set('Content-Type', 'application/json');
			response.status(400);
			response.json("Error   -- " + err);
		});
	});

	app.express.get('/api/member/memberhistoryDetails', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				memberBal.getmemberhistoryDetails().then(function (result) {
					if (result) {
						response.set('Content-Type', 'application/json');
						response.status(200);
						response.json(result);
					}
				}).catch(function (err) {
					response.set('Content-Type', 'application/json');
					response.status(400);
					response.json("Error   -- " + err);
				});
			} else {
				response.set('Content-Type', 'application/json');
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
	     Post Method to create member
	*/
	app.express.post('/api/members/memberhistory', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				var member =  {
					"memberid" :request.body.data.memberid,
					"texcono" :request.body.data.texcono,
					"serviceno" :request.body.data.serviceno,
					"projectid" :request.body.data.projectid,
					"projectno" :request.body.data.projectno,
					"jobmasterid" :request.body.data.jobmasterid,
					"category" :request.body.data.category,
					"startdate" :request.body.data.startdate,
					"enddate" :request.body.data.enddate,
				};
				memberBal.creatememberhistory(member).then(function (result) {
					if (result) {
						response.set('Content-Type', 'application/json');
						response.status(200);
						response.json(result);
					}
				}).catch(function (err) {
					response.set('Content-Type', 'application/json');
					response.status(400);
					response.json("Error   -- " + err);
				});
			} else {
				response.set('Content-Type', 'application/json');
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
       Post Method to update member
   */
	app.express.put('/api/members/memberhistory', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				var member =  {
					"memberid" :request.body.data.memberid,
					"texcono" :request.body.data.texcono,
					"serviceno" :request.body.data.serviceno,
					"projectid" :request.body.data.projectid,
					"projectno" :request.body.data.projectno,
					"jobmasterid" :request.body.data.jobmasterid,
					"category" :request.body.data.category,
					"startdate" :request.body.data.startdate,
					"enddate" :request.body.data.enddate,
				};
				memberBal.updatememberhistorydetails(member, request.body.data.memhistoryid).then(function (result) {
					if (result) {
						response.set('Content-Type', 'application/json');
						response.status(200);
						response.json(result);
					}
				}).catch(function (err) {
					response.set('Content-Type', 'application/json');
					response.status(400);
					response.json("Error   -- " + err);
				});
			} else {
				response.set('Content-Type', 'application/json');
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
		Upload Memberhistory AM Login
	*/
	app.express.post('/api/members/import/memberhistory', function (request, response) {  
		request.setTimeout(0);
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				var memberdata = request.body.memberdata;
				memberBal.memberbulkPostingOrder(memberdata[0]).then(function (result) {
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


	app.express.delete('/api/members/history/updatestatus', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
				memberBal.updatememberhistorystatus(request.body.memhistoryid).then(function (result) {
					if (result) {
						response.set('Content-Type', 'application/json');
						response.status(200);
						response.json(result);
					}
				}).catch(function (err) {
					response.set('Content-Type', 'application/json');
					response.status(400);
					response.json("Error   -- " + err);
				});
			} else {
				response.set('Content-Type', 'application/json');
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
