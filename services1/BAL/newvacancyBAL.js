var app = require("./../app");
var memberDal = require("../DAL/memberDAL");
//var memberBal = require('./../BAL/memberBAL');
var newvacancyDal = require("../DAL/newvacancyDAL");
var clientDal = require("./../DAL/clientDAL");
var jobBal = require("./../BAL/jobBAL");

var jobDal = require("./../DAL/jobDAL");
var cryptoUtil = require("./../Utils/cryptoutil");
var moment = require("moment");

module.exports.uploadapplydoc = function (vacancy) {
	return new app.promise(function (resolve, reject) {
		//validateSignup(member).then(function (response) {
		//	member.dateOfBirth = new Date(member.dateOfBirth);
		//	member.doj = new Date(member.doj);
		newvacancyDal
			.uploadapplydoc(vacancy)
			.then(function (result) {
				resolve(result);
				memberDal
					.logs("POST", member)
					.then(function (result1) {})
					.catch(function (err) {
						resolve(result);
					});
			})
			.catch(function (err) {
				reject(err);
			});
	}).catch(function (err) {
		reject(err);
	});
	//});
};

module.exports.addjobactivity = function (job, jobmasterid, docid) {
	return new app.promise(function (resolve, reject) {
		//validateSignup(member).then(function (response) {
		//	member.dateOfBirth = new Date(member.dateOfBirth);
		//	member.doj = new Date(member.doj);

		if (job.effectivedate != "") {
			job.effectivedate = new Date(job.effectivedate);
			job.effectivedate = moment(job.effectivedate).format("YYYY-MM-DD");
		} else {
			job.effectivedate = new Date();
			job.effectivedate = moment(job.effectivedate).format("YYYY-MM-DD");
		}
		newvacancyDal
			.addjobactivity(job)
			.then(function (result) {
				activityid = result.activityid;
				console.log("act", activityid);
				let p1 = new Promise(
					// The executor function is called with the ability to resolve or
					// reject the promise
					(resolve, reject) => {
						jobBal
							.updatejobactivitystatus(
								result.activityid,
								job.memberid,
								jobmasterid,
								job.effectivedate,
								0
							)
							.then(function (result1) {
								console.log(result1);
							//	resolve(result);
								newvacancyDal
									.updatejobactivitynew(activityid, docid)
									.then(function (result) {
										resolve(result);
									})
									.catch(function (err) {
										reject(err);
									});
								//resolve(result);
								// memberDal.logs('POST', member).then(function (result1) {}).catch(function (err) {
								// 	resolve(result);
								// });
								//	resolve(result);
								
										resolve(result);
								
							})
							.catch(function (err) {
								reject(err);
							});
					}
				);
				p1.then(resolve(result));
				memberDal
					.logs("POST", member)
					.then(function (result1) {})
					.catch(function (err) {
						resolve(result);
					});
			})
			.catch(function (err) {
				reject(err);
			});
	}).catch(function (err) {
		reject(err);
	});
	//});
};
module.exports.newmemberapply = function (vacancy, vacancymember) {
	return new app.promise(function (resolve, reject) {
		//validateSignup(member).then(function (response) {
		//dobdate = new Date(vacancymember.dob);

		//vacancymember.dob = moment(dobdate).format('YYYY-MM-DD');
		vacancymember.dateofdischarge = moment(
			new Date(vacancymember.dateofdischarge)
		).format("YYYY-MM-DD");
		//console.log(vacancymember);

		newvacancyDal
			.getregion(vacancy.jobdistid)
			.then(function (result) {
				vacancy.regionid = result.data[0].rg_id;
				//result.regionid = result.data[0].rg_id;
				newvacancyDal
					.getapplicationno()
					.then(function (results) {
						vacancy.applicationnumber = results.data[0].appno + 1;
						//result.masters = results;
						newvacancyDal
							.newmemberapply(vacancy, vacancymember)
							.then(function (output) {
								//result=[];
								result.memberid = output.memberid;
								resolve(result);
							})
							.catch(function (err) {
								reject(err);
							});
					})
					.catch(function (err) {
						reject(err);
					});
			})
			.catch(function (err) {
				reject(err);
			});
	}).catch(function (err) {
		reject(err);
	});

	//});
};

module.exports.appliedvacancypdf = function (fromdate,todate, regionid) {
	return new app.promise(function (resolve, reject) {
		var d = new Date(fromdate);
		var d1 = new Date(todate);
		var fdate = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
		var tdate = d1.getFullYear() + "-" + (d1.getMonth() + 1) + "-" + d1.getDate();
		newvacancyDal
			.appliedvacancypdf(fdate,tdate, regionid)
			.then(function (result) {
				resolve(result);
			})
			.catch(function (err) {
				reject(err);
			});
	});
};


module.exports.getseneriorityno = function (memid) {
	return new app.promise(function (resolve, reject) {
	
		newvacancyDal
			.getseneriorityno( memid)
			.then(function (result) {
				resolve(result);
			})
			.catch(function (err) {
				reject(err);
			});
	});
};


module.exports.appliedvacancypdfdownload = function (fromdate,todate, regionid) {
	return new app.promise(function (resolve, reject) {
		//var d = new Date(appdate);
		console.log(fromdate,todate);
		var d = new Date(fromdate);
		var d1 = new Date(todate);
		var fdate = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
		var tdate = d1.getFullYear() + "-" + (d1.getMonth() + 1) + "-" + d1.getDate();
		newvacancyDal
			.appliedvacancypdfdownload(fdate,tdate, regionid)
			.then(function (result) {
				resolve(result);
			})
			.catch(function (err) {
				reject(err);
			});
	});
};

module.exports.newvacancypdf = function () {
	return new app.promise(function (resolve, reject) {
		newvacancyDal
			.newvacancypdf()
			.then(function (result) {
				resolve(result);
			})
			.catch(function (err) {
				reject(err);
			});
	});
};
module.exports.viewvacancypdf = function () {
	return new app.promise(function (resolve, reject) {
		newvacancyDal
			.viewvacancypdf()
			.then(function (result) {
				resolve(result);
			})
			.catch(function (err) {
				reject(err);
			});
	});
};

module.exports.uploadnewvacancy = function (vacancy, vacancyid) {
	return new app.promise(function (resolve, reject) {
		//validateSignup(member).then(function (response) {
		//member.dateOfBirth = new Date(member.dateOfBirth);
		//	member.doj = new Date(member.doj);
		newvacancyDal
			.uploadnewvacancy(vacancy, vacancyid)
			.then(function (result) {
				resolve(result);
				memberDal
					.logs("POST", member)
					.then(function (result1) {})
					.catch(function (err) {
						resolve(result);
					});
			})
			.catch(function (err) {
				reject(err);
			});
	}).catch(function (err) {
		reject(err);
	});
	//});
};

module.exports.amsconfirmwilling = function (job,docid) {
	return new app.promise(function (resolve, reject) {
		//validateSignup(member).then(function (response) {
		//member.dateOfBirth = new Date(member.dateOfBirth);
		//	member.doj = new Date(member.doj);

		//console.log('sdf',docid)

		
			effectivedate = new Date();
			job.effectivedate = moment(effectivedate).format("YYYY-MM-DD");
		
		newvacancyDal
			.amsconfirmwilling(job,docid)
			.then(function (result) {
				resolve("success");
				memberDal
					.logs("POST", member)
					.then(function (result1) {})
					.catch(function (err) {
						resolve(result);
					});
			})
			.catch(function (err) {
				reject(err);
			});
	}).catch(function (err) {
		reject(err);
	});
	//});
};

module.exports.amsunmwilling = function (docid) {
	return new app.promise(function (resolve, reject) {
		//validateSignup(member).then(function (response) {
		//member.dateOfBirth = new Date(member.dateOfBirth);
		//	member.doj = new Date(member.doj);

		//console.log('sdf',docid)
		newvacancyDal
			.amsunmwilling(docid)
			.then(function (result) {
				resolve("success");
				memberDal
					.logs("POST", member)
					.then(function (result1) {})
					.catch(function (err) {
						resolve(result);
					});
			})
			.catch(function (err) {
				reject(err);
			});
	}).catch(function (err) {
		reject(err);
	});
	//});
};


module.exports.amsreject = function (docid) {
	return new app.promise(function (resolve, reject) {
		//validateSignup(member).then(function (response) {
		//member.dateOfBirth = new Date(member.dateOfBirth);
		//	member.doj = new Date(member.doj);

		//console.log('sdf',docid)
		newvacancyDal
			.amsreject(docid)
			.then(function (result) {
				resolve("success");
				memberDal
					.logs("POST", member)
					.then(function (result1) {})
					.catch(function (err) {
						resolve(result);
					});
			})
			.catch(function (err) {
				reject(err);
			});
	}).catch(function (err) {
		reject(err);
	});
	//});
};


module.exports.getmemberinfologin = function (texserno) {
	return new app.promise(function (resolve, reject) {
		if (texserno != "") {
			memberDal
				.validatememberinfo(texserno)
				.then(function (result) {
					if (result.length > 0) {
						newvacancyDal
							.getmemberinfologin(texserno, result[0].memberid)
							.then(function (result) {
								console.log("result", result);
								resolve(result);
							})
							.catch(function (err) {
								reject(err);
							});
					} else {
						reject("Please Enter Valid Service No or Texco No");
					}
				})
				.catch(function (err) {
					reject(err);
				});
		} else {
			reject("Please Enter Valid Service No or Texco No");
		}
	});
};

module.exports.getvacancyproject = function () {
	return new app.promise(function (resolve, reject) {
		newvacancyDal
			.getvacancyproject()
			.then(function (result) {
				resolve(result);
			})
			.catch(function (err) {
				reject(err);
			});
	});
};

module.exports.conirmvacancy = function (
	memberid,
	projectno,
	projectid,
	category,
	effectivedate,
	docid
) {
	return new app.promise(function (resolve, reject) {
		if (effectivedate != "") {
			effectivedate = new Date(effectivedate);
			effectivedate = moment(effectivedate).format("YYYY-MM-DD");
		} else {
			effectivedate = new Date();
			effectivedate = moment(effectivedate).format("YYYY-MM-DD");
		}

		clientDal
			.getmemberlastaccess(memberid)
			.then(function (result) {
				if (result.texcono == "") {
					console.log("doc", docid);
					jobactivitystatus(
						memberid,
						projectno,
						projectid,
						category,
						effectivedate,
						docid
					)
						.then(function (result) {
							resolve(result);
						})
						.catch(function (err) {
							reject(err);
						});
				} else {
					var diffDays = 0;
					if (result.lastaccdiff) {
						diffDays = result.lastaccdiff;
					} else if (result.dojdiff) {
						diffDays = result.dojdiff;
					}
					if (diffDays > 90) {
						jobactivitystatus(
							memberid,
							projectno,
							projectid,
							category,
							effectivedate,
							docid
						)
							.then(function (result) {
								resolve(result);
							})
							.catch(function (err) {
								reject(err);
							});
					} else {
						newvacancyDal
							.createconfirmhistoryvac(
								memberid,
								effectivedate,
								result.texcono,
								projectno,
								category,
								projectid,
								docid
							)
							.then(function (output2) {
								resolve(result);
							})
							.catch(function (err) {
								reject(err);
							});
					}
				}
			})
			.catch(function (err) {
				reject(err);
			});
	});
};

function jobactivitystatus(
	memberid,
	projectno,
	projectid,
	category,
	effectivedate,
	docid
) {
	return new app.promise(function (resolve, reject) {
		jobDal
			.gettexconos()
			.then(function (gettexno) {
				var logtexcono = gettexno.texcono;
				var texconologid = gettexno.texconologid;
				if (texconologid == 0) {
					jobDal
						.getTexcoNo()
						.then(function (texcono) {
							// new function added for procedure
							// console.log('texcono',texcono)
							var texcono = parseInt(texcono) + 1;

							newvacancyDal
								.createconfirmhistoryvac(
									memberid,
									effectivedate,
									texcono,
									projectno,
									category,
									projectid,
									docid
								)
								.then(function (output2) {
									resolve(result);
								})
								.catch(function (err) {
									reject(err);
								});
						})
						.catch(function (err) {
							reject(err);
						});

					/* settingDal.getsettingbycode("TXSNO").then(function (gennum) {
                    var lasttexcono = gennum.texcono;
                    var texcono = parseInt(lasttexcono) + 1;
                    settingDal.updatesettingvaluebycode(texcono, "TXSNO").then(function (result2) {
                    }).catch(function (err) {
                        reject(err);
                    });
                }).catch(function (err) {
                    reject(err);
                }); */
				} else {
					jobDal
						.updatetexconolog(texconologid)
						.then(function (result) {
							jobDal
								.updatejobactivitystatus(jobactivityid, logtexcono, ondate)
								.then(function (result) {
									jobDal
										.getprojectno(projectid)
										.then(function (output1) {
											jobDal
												.createconfirmhistory(
													memberid,
													ondate,
													logtexcono,
													output1.projectno,
													jobcode,
													projectid,
													isrejected
												)
												.then(function (output2) {
													resolve(result);
												})
												.catch(function (err) {
													reject(err);
												});
										})
										.catch(function (err) {
											reject(err);
										});
								})
								.catch(function (err) {
									reject(err);
								});
						})
						.catch(function (err) {
							reject(err);
						});
				}
			})
			.catch(function (err) {
				reject(err);
			});
	});
}
