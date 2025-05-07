var app = require('./../app');
var jobDal = require('./../DAL/jobDAL');
var agreementDal = require('../DAL/agreementDAL');
var wageDal = require('../DAL/wageDAL');
var pdf = require('html-pdf');
var nconf = require('./../Utils/EnvironmentUtil');
var fs = require('fs');
var emailModel = require('../Model/email');
var emailBal = require('../BAL/emailBAL'); 
var moment = require('moment');

module.exports.createagreement = function (agreement) {
	console.log('agreement', agreement);
	return new app.promise(function (resolve, reject) {
		var count = agreement.projects.length;
		var projectids = [];
		if (count > 0) {
			for (var i = 0; i < count; i++) {
				projectids.push(agreement.projects[i].projectid);
			}
		}
		agreementDal.validateagreement(projectids).then(function (result1) {
			console.log('result1',result1);
			if (result1 == "success") {
				agreementDal.createagreement(agreement).then(function (result) {
					if (result.agreementid > 0) {
						agreementDal.createagreementdetail(result.agreementid, agreement, agreement.changedby).then(function (output) {
							resolve(output);
						}).catch(function (err) {
							reject(err);
						});
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

module.exports.updateagreement = function (agreement, regionid, projectid, clientid, agreementid, roleid) {
	return new app.promise(function (resolve, reject) {
		agreement.fromdate = new Date(agreement.fromdate);
		agreement.todate = new Date(agreement.todate);
		agreement.clientid = clientid;
		if (roleid == 2) {
			agreementDal.checkAgreementDetails(agreementid).then(function (result) {
				// console.log('result.clientcount', result.agreement);
				var changedfields = []; 
				if (result.agcount == 0) {
					changedfields.push('clientid');
					changedfields.push('fromdate');
					changedfields.push('todate');
					changedfields.push('servicecharge');
					changedfields.push('wagetypeid');
					changedfields.push('wageyearid');
					changedfields.push('wagecategoryid');
					changedfields.push('wageareaid');
					changedfields.push('agreementstatusid');
					changedfields.push('agreementtypeid');
					changedfields.push('agtypeid');
					changedfields.push('optionaltype');
					changedfields.push('tax');
					//changedfields.push('addendum');
					var updatedfields = JSON.stringify(changedfields);
					agreement.updatedfields = updatedfields;
					agreementDal.addAMSAgreement(agreement, agreementid).then(function (result) {
						agreementDal.UpdateAgreementStatus(1, agreementid).then(function (result) {
							resolve(result)
						}).catch(function (err) {
							reject(err);
						});
					}).catch(function (err) {
						reject(err);
					});
				} else {
					// changedfields = [];
				
					if(result.updatedfields) {
                        var changedfields = JSON.parse(result.updatedfields);
                    } else {
                        changedfields = [];
                    } 

					if(result.clientid != parseInt(agreement.clientid)) changedfields.push('clientid');
					if(result.fromdate.setHours(0, 0, 0, 0) != agreement.fromdate.setHours(0, 0, 0, 0)) changedfields.push('fromdate');
					if(result.todate.setHours(0, 0, 0, 0) != agreement.todate.setHours(0, 0, 0, 0)) changedfields.push('todate');
					if(result.servicecharge != parseInt(agreement.servicecharge)) changedfields.push('servicecharge');
					if(result.wagetypeid != parseInt(agreement.wagetypeid)) changedfields.push('wagetypeid');
					if(result.wageyearid != parseInt(agreement.wageyearid)) changedfields.push('wageyearid');
					if(result.wagecategoryid != parseInt(agreement.wagecategoryid)) changedfields.push('wagecategoryid');
					if(result.wageareaid != parseInt(agreement.wageareaid)) changedfields.push('wageareaid');
					if(result.agreementstatusid != parseInt(agreement.agreementstatusid)) changedfields.push('agreementstatusid');
					if(result.agreementtypeid != parseInt(agreement.agreementtypeid)) changedfields.push('agreementtypeid');
					if(result.agtypeid != parseInt(agreement.agtypeid)) changedfields.push('agtypeid');
					if(result.optionaltype != agreement.typeofagreementoth) changedfields.push('optionaltype');
					if(result.tax != agreement.tax) changedfields.push('tax');
					//if(result.addendum != agreement.addendum) changedfields.push('addendum');
					// var upfields = JSON.parse(result.updatedfields);
					// changedfields.push(upfields);
					var updatedfields = JSON.stringify(changedfields);
					//console.log('changedfields',changedfields);
					agreement.updatedfields = updatedfields;
					agreementDal.updateAMSAgreement(agreement, agreementid).then(function (result) {
						agreementDal.UpdateAgreementAMStatus(1, agreementid).then(function (result) {
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
			agreementDal.updateagreement(agreement).then(function (result) {
				resolve(result)
			}).catch(function (err) {
				reject(err);
			});
		}
	});
};

module.exports.getagreement = function (agreementid, regionid) {
	return new app.promise(function (resolve, reject) {
		agreementDal.getagreement(agreementid, regionid).then(function (result) { 
			resolve(result)
		}).catch(function (err) {     console.log('err',err);
			reject(err);
		});
	});
};

module.exports.getcombinedagreementproj = function (agreementid) {
	return new app.promise(function (resolve, reject) {
		agreementDal.getcombinedagreementproj(agreementid).then(function (result) { 
			resolve(result)
		}).catch(function (err) {     console.log('err',err);
			reject(err);
		});
	});
};





module.exports.agreementprint = function (agreementid, regionid) {
	return new app.promise(function (resolve, reject) {
		agreementDal.agreementprint(agreementid, regionid).then(function (result) {
			resolve(result)
		}).catch(function (err) {
			reject(err);
		});
	});
};

module.exports.getamsagreement = function (agreementid, regionid) {
	return new app.promise(function (resolve, reject) {
		agreementDal.getamsagreement(agreementid, regionid).then(function (result) {
			console.log('result...result...result', result);
			resolve(result)
		}).catch(function (err) {
			reject(err);
		});
	});
};


module.exports.getamsagreementjobs = function (agreementid, regionid, agreementinfoid) {
	return new app.promise(function (resolve, reject) {
		agreementDal.getamsagreementjobs(agreementid, regionid, agreementinfoid).then(function (result) {
			resolve(result)
		}).catch(function (err) {
			reject(err);
		});
	});
};

module.exports.getamsagreementaddendum = function (agreementid, regionid, agreementinfoid) {
	return new app.promise(function (resolve, reject) {
		agreementDal.getamsagreementaddendum(agreementid, regionid, agreementinfoid).then(function (result) {
			resolve(result)
		}).catch(function (err) {
			reject(err);
		});
	});
};



module.exports.updategreementstatus = function (agreementid) {
	return new app.promise(function (resolve, reject) {
		agreementDal.updategreementstatus(agreementid).then(function (result) {
			resolve(result)
		}).catch(function (err) {
			reject(err);
		});
	});
};


module.exports.getagreementbyprojectid = function (projectid) {
	console.log('projectid.. jobs... projectid', projectid);
	return new app.promise(function (resolve, reject) {
		agreementDal.getClientDetailsbyProjectid(projectid).then(function (projectresult) {
			agreementDal.getagreementbyprojectid(projectid).then(function (result) {
				/*console.log('result.. jobs... result',result[0].code);
				if (Number(result[0].code) == 1) {
					var promises = [];
					if (result.length > 0) {
						console.log('result.. jobs... combined',result[0].code);
						agreementDal.getjobpostingbyprojectid(projectid).then(function (result1) {
							console.log('result.. jobs... result1result1',result1.length);
							if (result1.length > 0) {
								for (var i = 0; i < result.length; i++) {
									for (var j = 0; j < result1.length; j++) {
										if (result[i].projectid == result1[j].projectid && result[i].jobmasterid == result1[j].jobmasterid) {
											result[i].numberofvacancies = result[i].numberofvacancies - result1[j].numberofvacancies;
											break;
										}
									}
								}
							}

							agreementDal.getMembersWorkingCount(projectid).then(function (result2) {
								if (result2.length > 0) {
									for (var i = 0; i < result.length; i++) {
										for (var j = 0; j < result2.length; j++) {
											if (result[i].projectid == result2[j].projectid && result[i].jobmasterid == result2[j].jobmasterid) {
												result[i].numberofvacancies = result[i].numberofvacancies - result2[j].numberofvacancies;
												//break;
											}
										}
									}
									console.log('result2.. final... result...2',result);
								}
								// resolve(result)
							}).catch(function (err) {
								reject(err);
							});
	
							agreementDal.getMembersCurrentMonthWorkingCount(projectid).then(function (result2) {
								if (result2.length > 0) {
									for (var i = 0; i < result.length; i++) {
										for (var j = 0; j < result2.length; j++) {
											if (result[i].projectid == result2[j].projectid && result[i].jobmasterid == result2[j].jobmasterid) {
												result[i].numberofvacancies = result[i].numberofvacancies - result2[j].numberofvacancies;
												break;
											}
										}
									}
								}
								// resolve(result)
							}).catch(function (err) {
								reject(err);
							});
							resolve(result);

							// resolve(result)
						}).catch(function (err) {
							reject(err);
						});
						
						 agreementDal.getpostedjobsbyprojectid(projectid).then(function (jobs) {
							if (jobs.length > 0) {
								for (var index = 0; index < result.length; index++) {
									for (var jobsindex = 0; jobsindex < jobs.length; jobsindex++) {
										if (result[index].projectid == jobs[jobsindex].projectid && result[index].jobmasterid == jobs[jobsindex].jobmasterid) {
											result[index].numberofvacancies = result[index].numberofvacancies - jobs[jobsindex].numberofvacancies;
											break;
										}
									}
								}
							}

						}).catch(function (err) {
							reject(err);
						}); 
					}
				} else {
					// console.log('jobs jobs', jobs);
					agreementDal.getClientidandProjectID(projectid).then(function (res) {
						//console.log('res', res.clientid);
						agreementDal.getProjectIDByClientID(res.clientid).then(function (projectids) {
							agreementDal.getPostedJobsbyCombinedProjectid(projectids).then(function (jobs) {
								console.log('projectids', projectids);

								for (var index = 0; index < projectresult.length; index++) {
									// projectids.push(projectresult[index].projectid);
									for (var jobsindex = 0; jobsindex < jobs.length; jobsindex++) {
										if (projectresult[index].jobmasterid == jobs[jobsindex].jobmasterid) {
											projectresult[index].numberofvacancies = projectresult[index].numberofvacancies - jobs[jobsindex].numberofvacancies;
											break;
										}
									}
								}
								agreementDal.getjobpostingbyprojectid(projectids).then(function (result1) {
									if (result1.length > 0) {
										for (var i = 0; i < projectresult.length; i++) {
											for (var j = 0; j < result1.length; j++) {
												if (projectresult[i].projectid == result1[j].projectid && projectresult[i].jobmasterid == result1[j].jobmasterid) {
													projectresult[i].numberofvacancies = projectresult[i].numberofvacancies - result1[j].numberofvacancies;
													break;
												}
											}
										}
									}
									resolve(projectresult)
								}).catch(function (err) {
									reject(err);
								});
								agreementDal.getMembersWorkingCount(projectids).then(function (result2) {
									if (result2.length > 0) {
										for (var i = 0; i < projectresult.length; i++) {
											for (var j = 0; j < result2.length; j++) {
												if (projectresult[i].projectid == projectresult[j].projectid && projectresult[i].jobmasterid == result2[j].jobmasterid) {
													projectresult[i].numberofvacancies = projectresult[i].numberofvacancies - result2[j].numberofvacancies;
													break;
												}
											}
										}
									}
									resolve(projectresult)
								}).catch(function (err) {
									reject(err);
								});
								resolve(projectresult);
							}).catch(function (err) {
								reject(err);
							});
						}).catch(function (err) {
							reject(err);
						});
					}).catch(function (err) {
						reject(err);
					});
				}*/
				agreementDal.getjobpostingbyprojectid(projectid).then(function (result1) {
					console.log('result.. jobs... result1result1', result1.length);
					if (result1.length > 0) {
						for (var i = 0; i < result.length; i++) {
							for (var j = 0; j < result1.length; j++) {
								if (result[i].projectid == result1[j].projectid && result[i].jobmasterid == result1[j].jobmasterid) {
									result[i].numberofvacancies = result[i].numberofvacancies - result1[j].numberofvacancies;
									break;
								}
							}
						}
					}
					resolve(result);
				}).catch(function (err) {
					reject(err);
				});
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
};


module.exports.getagreementexpirylist = function () {
	return new app.promise(function (resolve, reject) {
		agreementDal.getagreementexpirylist().then(function (result) {
			resolve(result)
		}).catch(function (err) {
			reject(err);
		});
	});
};

module.exports.amendagreement = function (agreement) {
	return new app.promise(function (resolve, reject) {
		agreementDal.getagreementamend(agreement.agreementid).then(function (result) {
			var addendum = result.addendum + 1;
			if(agreement.type == 1) {
				agreementDal.updateagreementamend(agreement.agreementid, addendum).then(function (result) {
					agreementDal.amendagreement(agreement, addendum).then(function (result) {
						resolve(result)
					}).catch(function (err) {
						reject(err);
					});
				}).catch(function (err) {
					reject(err);
				});
			} else {
				agreementDal.updateagreementjobs(agreement).then(function (result) {
					resolve(result)
				}).catch(function (err) {
					reject(err);
				});
			}
		}).catch(function (err) {
			reject(err);
		});
	});
};

module.exports.amendagreementams = function (agreement) {
	return new app.promise(function (resolve, reject) {
		agreementDal.getagreementamend(agreement.agreementid).then(function (result) {
			var addendum = result.addendum + 1;
			if(agreement.type == 1) {
				agreementDal.updateagreementamsamend(agreement.agreementid, addendum).then(function (result) {
					agreementDal.amendagreementams(agreement, addendum).then(function (result) {
						resolve(result)
					}).catch(function (err) {
						reject(err);
					});
				}).catch(function (err) {
					reject(err);
				});
			} else {
				agreementDal.updateagreementamsjobs(agreement).then(function (result) {
					resolve(result)
				}).catch(function (err) {
					reject(err);
				});
			}
		}).catch(function (err) {
			reject(err);
		});
	});
};

module.exports.updateaddendumagreements = function (agreement) {
	return new app.promise(function (resolve, reject) {
		var addendums = agreement.jobs;
		agreementDal.updateaddendumjobs(addendums,agreement.agreementid).then(function (result) {
			resolve(result)
		}).catch(function (err) {
			reject(err);
		});
	}); 
} 

module.exports.updateaddendumagreement = function (agreement) {
	return new app.promise(function (resolve, reject) {
		var addendums = agreement.jobs;
		addendums.forEach(function (item) {
			agreementDal.updateaddendumjobs(item).then(function (result) {
				resolve(result)
			}).catch(function (err) {
				reject(err);
			});
		});
	});
}

module.exports.approveaddendums = function (agreement) {
	return new app.promise(function (resolve, reject) {
		agreementDal.getagreementamend(agreement.agreementid).then(function (result) {
			var addendum = result.addendum + 1;
			var addendums = agreement.jobs;
			agreementDal.addaddendumjobs(addendums,agreement,addendum).then(function (result) {
				resolve(result)
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	}); 
} 


module.exports.rejectaddendumagreement = function (agreement) {
	return new app.promise(function (resolve, reject) {
		var addendums = agreement.jobs;
		agreementDal.rejectaddendumjobs(addendums,agreement.agreementid).then(function (result) {
			resolve(result)
		}).catch(function (err) {
			reject(err);
		});
	}); 
}

module.exports.updateaddendumamsagreement = function (agreement) {
	return new app.promise(function (resolve, reject) {
		var addendums = agreement.jobs;
		addendums.forEach(function (item) {
			agreementDal.updateaddendumamsjobs(item).then(function (result) {
				resolve(result)
			}).catch(function (err) {
				reject(err);
			});
		});
	});
}


module.exports.getjobpostingexport = function (closedate) {
	return new app.promise(function (resolve, reject) {
		agreementDal.getjobpostingexport(closedate).then(function (result) {
			resolve(result)
		}).catch(function (err) {
			reject(err);
		});
	});
};

module.exports.getagreementexport = function (agreementtypeid, agtypeid, agreementstatusid, wagetypeid, wageyearid, wageareaid) {
	return new app.promise(function (resolve, reject) {
		agreementDal.getagreementexport(agreementtypeid, agtypeid, agreementstatusid, wagetypeid, wageyearid, wageareaid).then(function (result) {
			resolve(result)
		}).catch(function (err) {
			reject(err);
		});
	});
};   

module.exports.getagreementamsexport = function (regionid,fromdate,todate) {
	return new app.promise(function (resolve, reject) {
		agreementDal.getagreementamsexport(regionid,fromdate,todate).then(function (result) {
			resolve(result)
		}).catch(function (err) {
			reject(err);
		});
	});
}; 


module.exports.checkagreement = function (projectid) {
	return new app.promise(function (resolve, reject) {
		agreementDal.checkagreement(projectid).then(function (result) {
			resolve(result)
		}).catch(function (err) {
			reject(err);
		});
	});
};

module.exports.updateprojectstatus = function (agreementinfoid) {
	return new app.promise(function (resolve, reject) {
		agreementDal.updateprojectstatus(agreementinfoid).then(function (result) {
			resolve(result)
		}).catch(function (err) {
			reject(err);
		});
	});
};

module.exports.getagreementfutureexpirylist = function () {
	return new app.promise(function (resolve, reject) {
		agreementDal.getagreementfutureexpirylist().then(function (result) {
			resolve(result)
		}).catch(function (err) {
			reject(err);
		});
	});
};

module.exports.getagreementfutureexpirythirtylist = function () {
	return new app.promise(function (resolve, reject) {
		agreementDal.getagreementfutureexpirythirtylist().then(function (result) {
			resolve(result)
		}).catch(function (err) {
			reject(err);
		});
	});
};

module.exports.getattendancependinglist = function () {
	return new app.promise(function (resolve, reject) {
		agreementDal.getattendancependinglist().then(function (result) {
			resolve(result)
		}).catch(function (err) {
			reject(err);
		});
	});
};

module.exports.getagreementfutureexpirylistbyregion = function (regionid) {
	return new app.promise(function (resolve, reject) {
		agreementDal.getagreementfutureexpirylistbyregion(regionid).then(function (result) {
			resolve(result)
		}).catch(function (err) {
			reject(err);
		});
	});
};

module.exports.getagreementexpirylistbyregion = function (regionid) {
	return new app.promise(function (resolve, reject) {
		agreementDal.getagreementexpirylistbyregion(regionid).then(function (result) {
			resolve(result)
		}).catch(function (err) {
			reject(err);
		});
	});
};

module.exports.agreementrenew = function (fromdate, todate, agreementid) {
	return new app.promise(function (resolve, reject) {
		agreementDal.agreementrenew(fromdate, todate, agreementid).then(function (result) {
			resolve(result)
		}).catch(function (err) {
			reject(err);
		});
	});
};

module.exports.saveagreementprint = function (agreement, agreementid, agtype, agreementval) {
	return new app.promise(function (resolve, reject) {
		agreementDal.saveagreementprint(agreement, agreementid, agtype).then(function (result) {
			agreementDal.getClientDetailsByClientID(result.clientid).then(function (result) {
				var filepath = nconf.get('PDFDOWNLOADURL');
				pdf.create(agreementval).toStream(function(err, stream){
					stream.pipe(fs.createWriteStream(filepath +'TexcoDraftAgreement.pdf'));
					resolve(result);
				});
				// pdf.create(html).toStream(function(err, stream){
				// 	if (err) return console.log(err);
				// 	console.log(res); // { filename: '/app/businesscard.pdf' }
				// 	resolve(result);
				// });
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
};

module.exports.sendAgreementDraft = function (clientemail) {
	return new app.promise(function (resolve, reject) {
		var nconf = require('./../Utils/EnvironmentUtil');
		var filepath = nconf.get('PDFDOWNLOADURL');
		var attachments = [{
				filename: 'TexcoDraftAgreement.pdf',
				path: filepath
			}
		];
		var sendemail = new emailModel.emailattach(clientemail, "deeparaja@raagaatechnologies.com", "Texco Draft Agreement", "Hi Texco Draft Agreement", "",attachments);
		emailBal.sendEmailAttachment(sendemail).then(function (result) {
			resolve("success");
		}).catch(function (err) {
			reject(err);
		});
	});
};

module.exports.getAMSAgreementReject = function (agreementid) {
    console.log('agreementid',agreementid);
    return new app.promise(function (resolve, reject) {
        agreementDal.getAMSAgreementReject(agreementid).then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
}; 