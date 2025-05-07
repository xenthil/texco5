var app = require("./../app");
var memberDal = require("../DAL/memberDAL");
var jobDal = require("./../DAL/jobDAL");
var cryptoUtil = require("./../Utils/cryptoutil");
var moment = require("moment");
const otpGenerator = require("otp-generator");
const http = require("https");

module.exports.createmember = function (member) {
	return new app.promise(function (resolve, reject) {
		validateSignup(member)
			.then(function (response) {
				member.dob = new Date(member.dob);
				member.doj = new Date(member.doj);
				memberDal
					.createmember(member)
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
			})
			.catch(function (err) {
				reject(err);
			});
	});
};

module.exports.createDependent = function (member) {
	return new app.promise(function (resolve, reject) {
		//validateSignup(member).then(function (response) {
		member.dateOfBirth = new Date(member.dateOfBirth);
		//	member.doj = new Date(member.doj);
		memberDal
			.createDependent(member)
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
module.exports.updatemember = function (member, memberid) {
	console.log("member.member", member);
	return new app.promise(function (resolve, reject) {
		memberDal
			.validatemember(member.mobile, member.serviceno, memberid)
			.then(function (result) {
				if (result.response == 1) {
					reject("Mobile number/ Serviceno is already registered.");
				} else {
					member.dob = new Date(member.dob);
					member.doj = new Date(member.doj);
					member.lastaccess = new Date(member.lastaccess);
					memberDal
						.updatemember(member, memberid)
						.then(function (result) {
							resolve(result);
							memberDal
								.logs("PUT", member)
								.then(function (result1) {})
								.catch(function (err) {
									resolve(result);
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
};

module.exports.updatememberstatus = function (memberid) {
	return new app.promise(function (resolve, reject) {
		memberDal
			.updatememberstatus(memberid)
			.then(function (result) {
				resolve(result);
			})
			.catch(function (err) {
				reject(err);
			});
	});
};

module.exports.getmember = function (memberid) {
	return new app.promise(function (resolve, reject) {
		memberDal
			.getmember(memberid)
			.then(function (result) {
				resolve(result);
			})
			.catch(function (err) {
				reject(err);
			});
	});
};

module.exports.getmemberbyabove58 = function (memberid) {
	return new app.promise(function (resolve, reject) {
		memberDal
			.getmemberbyabove58(memberid)
			.then(function (result) {
				resolve(result);
			})
			.catch(function (err) {
				reject(err);
			});
	});
};

module.exports.getmembersaboveworking58 = function (memberid) {
	return new app.promise(function (resolve, reject) {
		memberDal
			.getmembersaboveworking58(memberid)
			.then(function (result) {
				resolve(result);
			})
			.catch(function (err) {
				reject(err);
			});
	});
};

module.exports.getmemberinfo = function (texserno) {
	return new app.promise(function (resolve, reject) {
		if (texserno != "") {
			memberDal
				.validatememberinfo(texserno)
				.then(function (result) {
					if (result.length > 0) {
						memberDal
							.getmemberinfo(texserno, result[0].memberid)
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

module.exports.getmemberinfologin = function (texserno) {
	return new app.promise(function (resolve, reject) {
		if (texserno != "") {
			memberDal
				.validatememberinfo(texserno)
				.then(function (result) {
					if (result.length > 0) {
						memberDal
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

module.exports.getmemberinfologinlatest = function (texserno) {
	return new app.promise(function (resolve, reject) {
		if (texserno != "") {
			memberDal
				.validatememberinfo(texserno)
				.then(function (result) {
					if (result.length > 0) {
						memberDal
							.getmemberinfologinlatest(texserno, result[0].memberid)
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

module.exports.sendOTP = function (texserno) {
	return new app.promise(function (resolve, reject) {
		if (texserno != "") {
			memberDal
				.getMobileInfo(texserno)
				.then(function (result) {
					if (result.length > 0) {
						var otp = Math.floor(1000 + Math.random() * 9000);
						console.log(otp);

						//console.log(otp);
						var mobile = "+91"+result[0].mobile;

						memberDal
							.insertOTP(texserno, result[0].memberid, otp, mobile)
							.then(function (result) {
							//	console.log("result", otp);

								// var smscont =
								// 	"Welcome to TEXCO. Your OTP " +
								// 	otp +
								// 	" login to register your details. - TEXCO";

								var smscont = "Welcome to TEXCO! Your OTP  to login is " + otp +" -Tamil Nadu Ex-servicemen Corporation Limited";

								// var urlss =
								// 	"https://tmegov.onex-aura.com/api/sms?key=C5SF2zLt&to=" +
								// 	mobile +
								// 	"&from=TEXCNN&body=" +
								// 	smscont +
								// 	"&entityid=1001498188366425489&templateid=1007645372144559557";

								var urlss =
									"https://tmegov.onex-aura.com/api/sms?key=C5SF2zLt&to=" +
									mobile +
									"&from=TEXCNN&body=" +
									smscont +
									"&entityid=1001498188366425489&templateid=1007917462669089614";
									// console.log(urlss);
								//resolve(result);

								try {
									http.get(urlss, (resp) => {
										resolve(result);
									});
								} catch (err) {
									console.log("err", err);
									reject(err);
								}

							
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


module.exports.verifyOTP = function (memberid, otp) {
	return new app.promise(function (resolve, reject) {
		memberDal
			.verifyOTP(memberid, otp)
			.then(function (result) {
				resolve(result);
			})
			.catch(function (err) {
				reject(err);
			});
	});
};


function validateSignup(member) {
	return new app.promise(function (resolve, reject) {
		var validationResponse = "";
		if (member.mobile == null || member.mobile == "") {
			validationResponse = "Mobile number cannot be empty";
			reject("Mobile number cannot be empty");
		} else if (member.serviceno == null || member.serviceno == "") {
			validationResponse = "service number cannot be empty";
			reject("service number cannot be empty");
		}

		//Validate IN DB
		if (validationResponse == null || validationResponse == "") {
			memberDal
				.validatemember(member.mobile, member.serviceno, 0)
				.then(function (result) {
					if (result.response == 1) {
						reject("Mobile number/ Serviceno is already registered.");
					} else {
						resolve(result);
					}
				})
				.catch(function (err) {
					reject("Error validating member information");
				});
		}
	});
}

module.exports.getnumberofmembers = function () {
	return new app.promise(function (resolve, reject) {
		memberDal
			.getnumberofmembers()
			.then(function (result) {
				resolve(result);
			})
			.catch(function (err) {
				reject(err);
			});
	});
};

module.exports.getmembersexport = function (regionid, districtid, statusid) {
	return new app.promise(function (resolve, reject) {
		memberDal
			.getmembersexport(regionid, districtid, statusid)
			.then(function (result) {
				resolve(result);
			})
			.catch(function (err) {
				reject(err);
			});
	});
};

module.exports.getallmember = function () {
	return new app.promise(function (resolve, reject) {
		memberDal
			.getallmember()
			.then(function (result) {
				resolve(result);
			})
			.catch(function (err) {
				reject(err);
			});
	});
};

module.exports.importlastaccess = function (memberdetail) {
	return new app.promise(function (resolve, reject) {
		var member = memberdetail[0];
		var values = [];
		var rowsReturned = member.length;
		if (rowsReturned > 0) {
			member.sort(function (a, b) {
				return new Date(a.lastaccess) - new Date(b.lastaccess);
			});
			var texconos = [];
			for (var i = 0; i < rowsReturned; i++) {
				texconos.push(member[i].texcono);
				if (
					i + 1 == rowsReturned ||
					member[i].lastaccess != member[i + 1].lastaccess
				) {
					values.push(
						memberDal.importlastaccess(new Date(member[i].lastaccess), texconos)
					);
					texconos = [];
				}
			}
			app.promise.all(values).then(function () {
				resolve("success");
			});
		}
	});
};

module.exports.updaterank = function (memberid, rankid) {
	return new app.promise(function (resolve, reject) {
		memberDal
			.updaterank(memberid, rankid)
			.then(function (result) {
				resolve(result);
			})
			.catch(function (err) {
				reject(err);
			});
	});
};

module.exports.creatememberblock = function (memberblock) {
	console.log("memberblock.memberblocks", memberblock.memberblocks);
	return new app.promise(function (resolve, reject) {
		if (memberblock.memberblocks == 1) {
			var dates = new Date();
			var enddate = moment(dates)
				.add(1200, "months")
				.startOf("month")
				.format("YYYY-MM-DD");
			memberblock.enddate = enddate;
		}
		memberDal
			.creatememberblock(memberblock)
			.then(function (result) {
				resolve(result);
			})
			.catch(function (err) {
				reject(err);
			});
	});
};

module.exports.updatememberblock = function (memberblock, memberblockid) {
	return new app.promise(function (resolve, reject) {
		if (memberblock.memberblocks == 1) {
			var dates = new Date();
			var enddate = moment(dates)
				.add(1200, "months")
				.startOf("month")
				.format("YYYY-MM-DD");
			memberblock.enddate = enddate;
		}
		memberDal
			.updatememberblock(memberblock, memberblockid)
			.then(function (result) {
				resolve(result);
			})
			.catch(function (err) {
				reject(err);
			});
	});
};

module.exports.updatememberblockstatus = function (memberblockid) {
	return new app.promise(function (resolve, reject) {
		memberDal
			.updatememberblockstatus(memberblockid)
			.then(function (result) {
				resolve(result);
			})
			.catch(function (err) {
				reject(err);
			});
	});
};

module.exports.getmemberblocks = function (memberblockid) {
	return new app.promise(function (resolve, reject) {
		memberDal
			.getmemberblocks(memberblockid)
			.then(function (result) {
				resolve(result);
			})
			.catch(function (err) {
				reject(err);
			});
	});
};

module.exports.getmemberhistory = function (memberid) {
	return new app.promise(function (resolve, reject) {
		memberDal
			.getmemberhistory(memberid)
			.then(function (result) {
				resolve(result);
			})
			.catch(function (err) {
				reject(err);
			});
	});
};

module.exports.getmemberSearchHistory = function (serviceno) {
	var membersid = [];
	var resultdata = [];
	return new app.promise(function (resolve, reject) {
		memberDal
			.getmemberSearchHistory(serviceno)
			.then(function (result) {
				resultdata.push(result);
				console.log("result", result);
				for (var i = 0; i < result.length; i++) {
					membersid.push(result[i].memberid);
				}
				console.log("membersid", membersid);
				if (membersid.length) {
					memberDal
						.getmemberHistoryDetails(membersid)
						.then(function (result1) {
							resultdata.push(result1);
							memberDal
								.getmemberJobActivityDetails(membersid)
								.then(function (result2) {
									resultdata.push(result2);
									resolve(resultdata);
								})
								.catch(function (err) {
									reject(err);
								});
						})
						.catch(function (err) {
							reject(err);
						});
				} else {
					reject("Texco No not found");
				}
			})
			.catch(function (err) {
				reject(err);
			});
	});
};

module.exports.getmemberSearchHistory = function (serviceno) {
	var membersid = [];
	var resultdata = [];
	return new app.promise(function (resolve, reject) {
		memberDal
			.getmemberSearchHistory(serviceno)
			.then(function (result) {
				resultdata.push(result);
				console.log("result", result);
				for (var i = 0; i < result.length; i++) {
					membersid.push(result[i].memberid);
				}
				console.log("membersid", membersid);
				if (membersid.length) {
					memberDal
						.getmemberHistoryDetails(membersid)
						.then(function (result1) {
							resultdata.push(result1);
							memberDal
								.getmemberJobActivityDetails(membersid)
								.then(function (result2) {
									resultdata.push(result2);
									resolve(resultdata);
								})
								.catch(function (err) {
									reject(err);
								});
						})
						.catch(function (err) {
							reject(err);
						});
				} else {
					memberDal
						.getmemberHistoryDetailsadmin(serviceno)
						.then(function (result1) {
							resultdata.push(result1);
							memberDal
								.getmemberJobActivityDetails(result1[0].memberid)
								.then(function (result2) {
									resultdata.push(result2);
									memberDal
										.getmemberSearchHistory(result1[0].serviceno)
										.then(function (result) {
											resultdata.push(result);
											resolve(resultdata);
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
};

module.exports.updatememberchange = function (changememberid, memberid) {
	return new app.promise(function (resolve, reject) {
		var changeMember = [];
		for (var i = 0; i < changememberid.length; i++) {
			if (memberid != changememberid[i].memberid) {
				console.log("...", Number(changememberid[i].memberid));
				changeMember.push(Number(changememberid[i].memberid));
			}
		}
		// var memid = changememberid.split(',', changememberid);
		console.log("changeMember", changeMember);
		memberDal
			.updatememberchange(changeMember, memberid)
			.then(function (result) {
				resolve(result);
			})
			.catch(function (err) {
				reject(err);
			});
	});
};

// member search - 21-08-2019
module.exports.getmemberSearchDetails = function (serviceno) {
	return new app.promise(function (resolve, reject) {
		memberDal
			.getmemberSearchDetails(serviceno)
			.then(function (result) {
				resolve(result);
			})
			.catch(function (err) {
				reject(err);
			});
	});
};

module.exports.getmembersSearchDetails = function (serviceno) {
	return new app.promise(function (resolve, reject) {
		memberDal
			.getmembersSearchDetails(serviceno)
			.then(function (result) {
				resolve(result);
			})
			.catch(function (err) {
				reject(err);
			});
	});
};
module.exports.getClosedmemberSearchHistory = function (serviceno) {
	return new app.promise(function (resolve, reject) {
		memberDal
			.getClosedmemberSearchHistory(serviceno)
			.then(function (result) {
				resolve(result);
			})
			.catch(function (err) {
				reject(err);
			});
	});
};

module.exports.ClosedMembersProject = function (
	texcono,
	memberid,
	serviceno,
	firstname
) {
	return new app.promise(function (resolve, reject) {
		memberDal
			.ValidateMembersProject(memberid)
			.then(function (result) {
				console.log("result.count", result.count);
				if (result.count == 0) {
					memberDal
						.ClosedMembersProject(texcono, memberid, serviceno, firstname)
						.then(function (result) {
							resolve({
								msg: "Member Added Successfully",
								message: "Success",
							});
						})
						.catch(function (err) {
							reject(err);
						});
				} else {
					resolve({
						msg: "This Member Already Added",
						message: "Failure",
					});
				}
			})
			.catch(function (err) {
				reject(err);
			});
	});
};

module.exports.getrejectedMemberDetails = function () {
	return new app.promise(function (resolve, reject) {
		memberDal
			.getrejectedMemberDetails()
			.then(function (result) {
				resolve(result);
			})
			.catch(function (err) {
				reject(err);
			});
	});
};

module.exports.getclosedmemberslistDetails = function () {
	return new app.promise(function (resolve, reject) {
		memberDal
			.getclosedmemberslistDetails()
			.then(function (result) {
				var values = [];
				var rowsReturned = result.length;
				if (result) {
					for (var i = 0; i < rowsReturned; i++) {
						if (
							i + 1 == rowsReturned ||
							result[i].memberid != result[i + 1].memberid
						) {
							values.push(result[i]);
						}
					}
				}
				resolve(values);
				// var values = [];
				// var promises = [];
				// if (result) {
				// 	for (var i = 0; i < result.length; i++) {
				// 		promises.push(new Promise((resolve, reject) => {
				// 			memberDal.getclosedmembersWorkingProjectDetails(result[i]).then(function (results) {
				// 				console.log('results', results);
				// 				values.push(results);
				// 				resolve(results);
				// 			})
				// 		}))
				// 	};
				// 	app.promise.all(promises).then(function () {
				// 		resolve(values);
				// 	});
				// } else {
				// 	reject(err);
				// }
				resolve(result);
			})
			.catch(function (err) {
				reject(err);
			});
	});
};

module.exports.getmemberClosedDelete = function (closedid) {
	console.log("membercloseddelete", closedid);
	return new app.promise(function (resolve, reject) {
		memberDal
			.getmemberClosedDelete(closedid)
			.then(function (result) {
				resolve({
					msg: "Member Deleted Successfully",
					message: "Success",
				});
			})
			.catch(function (err) {
				reject(err);
			});
	});
};

module.exports.addMoveToCarryforward = function (
	projectid,
	category,
	serviceno,
	firstname,
	texcono
) {
	// console.log('result....result',texcono);
	return new app.promise(function (resolve, reject) {
		memberDal
			.CheckProjectToCarryforward(projectid, category, serviceno)
			.then(function (result) {
				if (result.length > 0) {
					if (result[0].inplaceof) {
						var inplaceof = result[0].inplaceof + " " + firstname;
					} else {
						var inplaceof = "INPLACE OF " + firstname;
					}
					var novac = Number(result[0].numberofvacancies) + 1;
					console.log("npooff", result[0].numberofvacancies);
					memberDal
						.UpdateCarryforward(projectid, novac, inplaceof)
						.then(function (result1) {
							memberDal
								.UpdateMemberHistory(projectid, texcono)
								.then(function (result2) {
									resolve({
										msg: "Carryforward Updated Succesfully",
										message: "Success",
										status: 200,
									});
								})
								.catch(function (err) {
									reject(err);
								});
						})
						.catch(function (err) {
							reject(err);
						});
				} else {
					// console.log('result....result',result);
					memberDal
						.getVacancyDetailsByID(projectid, category, serviceno)
						.then(function (result2) {
							// console.log('result....result2',result2[0].clientid,result2[1].lkvalid);
							if (result2) {
								var inplaceof = "INPLACE OF " + firstname;
								memberDal
									.addToCarryforward(
										projectid,
										result2[0][0].clientid,
										result2[1][0].jobmasterid,
										inplaceof
									)
									.then(function (result3) {
										memberDal
											.UpdateMemberHistory(projectid, texcono)
											.then(function (result1) {
												resolve({
													msg: "Carryforward Added Succesfully",
													message: "Success",
													status: 200,
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
				}
			})
			.catch(function (err) {
				reject(err);
			});
	});
};

module.exports.DeleteToCarryforward = function (
	projectid,
	category,
	serviceno,
	firstname,
	texcono
) {
	return new app.promise(function (resolve, reject) {
		memberDal
			.UpdateMemberHistory(projectid, texcono)
			.then(function (result2) {
				resolve({
					msg: "Carryforward Deleted Succesfully",
					message: "Success",
					status: 200,
				});
			})
			.catch(function (err) {
				reject(err);
			});
	});
};

module.exports.getregion = function () {
	return new app.promise(function (resolve, reject) {
		memberDal
			.getregion()
			.then(function (result) {
				var resultdata = [];
				var promises = [];
				var promises1 = [];
				if (result) {
					for (var i = 0; i < result.length; i++) {
						// console.log('result....', result[i]);
						var resultdata = [];
						promises.push(
							new Promise((resolve, reject) => {
								var a = i;
								memberDal
									.getdistrict(result[i], result, i)
									.then(function (result1) {
										if (result1) {
											//console.log('result2...resr', result1[a]);
											resultdata.push(result1);
											resolve(result1);
											// for (var j = 0; j < result1[a].district.length; j++) {
											// 	promises1.push(new Promise((resolve, reject) => {
											// 		memberDal.gettaluk(result1[i].district[j], result1, i, j).then(function (result2) {
											// 			if (result2) {
											// 				resultdata.push(result2);
											// 				resolve(result2);
											// 			} else {
											// 				reject("Error in truckdetailsTuckEditList BAL");
											// 			}
											// 			//console.log("REsult=========", result2);
											// 		}).catch(function (err) {
											// 			reject(err);
											// 		});
											// 	}))
											// }
											// app.promise.all(promises1).then(function () {
											// 	resolve({
											// 		"data": resultdata
											// 	})
											// });
										} else {
											reject("Error in truckdetailsTuckEditList BAL");
										}
									})
									.catch(function (err) {
										reject(err);
									});
							})
						);
					}
					app.promise.all(promises).then(function () {
						resolve({
							resultdata,
						});
					});
				} else {
					reject("Error in truckdetailsTuckEditList BAL");
				}
			})
			.catch(function (err) {
				reject(err);
			});
	});
};

module.exports.gettaluk = function () {
	return new app.promise(function (resolve, reject) {
		memberDal
			.gettaluk()
			.then(function (result2) {
				if (result2) {
					resolve(result2);
				} else {
					reject("Error in truckdetailsTuckEditList BAL");
				}
			})
			.catch(function (err) {
				reject(err);
			});
	});
};

module.exports.updataccountno = function (memberid, accountno) {
	console.log("member.member", memberid, accountno);
	return new app.promise(function (resolve, reject) {
		memberDal
			.updateaccountno(memberid, accountno)
			.then(function (result) {
				resolve(result);
			})
			.catch(function (err) {
				reject(err);
			});
	});
};

module.exports.updatememberrepcostatus = function (
	memberid,
	repcostatus,
	pfstatus,
	reason
) {
	return new app.promise(function (resolve, reject) {
		memberDal
			.updatememberrepcostatus(memberid, repcostatus, pfstatus, reason)
			.then(function (result) {
				resolve(result);
			})
			.catch(function (err) {
				reject(err);
			});
	});
};

module.exports.validatememberblock = function (memberid, blocktype) {
	return new app.promise(function (resolve, reject) {
		memberDal
			.validatememberblock(memberid, blocktype)
			.then(function (result) {
				resolve(result);
			})
			.catch(function (err) {
				reject(err);
			});
	});
};

module.exports.validatememberblockothers = function (memberid, blocktype) {
	return new app.promise(function (resolve, reject) {
		memberDal
			.validatememberblockothers(memberid, blocktype)
			.then(function (result) {
				resolve(result);
			})
			.catch(function (err) {
				reject(err);
			});
	});
};

module.exports.getmemberSearchOldDetails = function (serviceno) {
	return new app.promise(function (resolve, reject) {
		memberDal
			.getmemberSearchDetails(serviceno)
			.then(function (result) {
				console.log("result", result);
				console.log("result", result.length);
				if (result.length > 0) {
					resolve(result);
				} else if (serviceno.length == 6 || serviceno.length == 7) {
					console.log("serviceno.length", serviceno.length);
					memberDal
						.getmemberSearchOldDetails(serviceno)
						.then(function (result1) {
							console.log("result1", result1);
							if (result1.length) {
								memberDal
									.getoldMemberSearchDetails(result1[0].memberid)
									.then(function (result) {
										resolve(result);
									})
									.catch(function (err) {
										reject(err);
									});
							} else {
								resolve(result);
							}
						})
						.catch(function (err) {
							reject(err);
						});
				} else {
					resolve(result);
				}
			})
			.catch(function (err) {
				reject(err);
			});
	});
};

module.exports.getmemberhistoryDetails = function () {
	return new app.promise(function (resolve, reject) {
		memberDal
			.getmemberhistoryDetails()
			.then(function (result) {
				resolve(result);
			})
			.catch(function (err) {
				reject(err);
			});
	});
};

module.exports.creatememberhistory = function (member) {
	return new app.promise(function (resolve, reject) {
		member.startdate = new Date(member.startdate);
		member.enddate = new Date(member.enddate);
		memberDal
			.creatememberhistory(member)
			.then(function (result) {
				resolve(result);
			})
			.catch(function (err) {
				reject(err);
			});
	});
};

module.exports.updatememberhistorydetails = function (member, memhistoryid) {
	//console.log('member.member', member);
	return new app.promise(function (resolve, reject) {
		member.startdate = new Date(member.startdate);
		member.enddate = new Date(member.enddate);
		memberDal
			.updatememberhistorydetails(member, memhistoryid)
			.then(function (result) {
				resolve(result);
			})
			.catch(function (err) {
				reject(err);
			});
	});
};

module.exports.updatememberhistorystatus = function (memhistoryid) {
	return new app.promise(function (resolve, reject) {
		memberDal
			.updatememberhistorystatus(memhistoryid)
			.then(function (result) {
				resolve(result);
			})
			.catch(function (err) {
				reject(err);
			});
	});
};

module.exports.memberbulkPostingOrder = function (podata) {
	var rejectedDetails = [];
	var selectedDetails = [];
	var rejjs = "";
	var promises = [];
	var rejects = [];
	return new app.promise(function (resolve, reject) {
		for (var i = 0; i < podata.length; i++) {
			promises.push(
				new Promise((resolve, reject) => {
					var res = i;
					if (
						podata[res].texcono &&
						podata[res].serviceno &&
						podata[res].projectno &&
						podata[res].category &&
						podata[res].startdate
					) {
						memberDal
							.checkMembersDetails(
								podata[res].texcono,
								podata[res].serviceno,
								podata[res].projectno,
								podata[res].category
							)
							.then(function (output1) {
								console.log("voutput1[2]", output1[2]);
								if (
									output1[0].length > 0 &&
									output1[1].length > 0 &&
									output1[2].length > 0
								) {
									podata[res].memberid = output1[0][0].memberid;
									podata[res].projectid = output1[1][0].projectid;
									podata[res].jobmasterid = output1[2][0].jobmasterid;
									selectedDetails.push(podata[res]);
								} else {
									if (output1[0].length == 0) {
										var rejj =
											"Row " +
											podata[res].sno +
											" - ServiceNo is Mismatch ( " +
											podata[res].serviceno +
											" )";
										if (rejectedDetails.length == 0) {
											rejjs +=
												"Row " +
												podata[res].sno +
												" - ServiceNo is Mismatch ( " +
												podata[res].serviceno +
												" )";
										} else {
											rejjs +=
												", Row " +
												podata[res].sno +
												" - ServiceNo is Mismatch ( " +
												podata[res].serviceno +
												" )";
										}
										rejectedDetails.push(rejj);
									}
									if (output1[1].length == 0) {
										var rejj =
											"Row " +
											podata[res].sno +
											" - ProjectNo is Mismatch ( " +
											podata[res].projectno +
											" )";
										if (rejectedDetails.length == 0) {
											rejjs +=
												"Row " +
												podata[res].sno +
												" - ProjectNo is Mismatch ( " +
												podata[res].projectno +
												" )";
										} else {
											rejjs +=
												", Row " +
												podata[res].sno +
												" - ProjectNo is Mismatch ( " +
												podata[res].projectno +
												" )";
										}
										rejectedDetails.push(rejj);
									}
									if (output1[2].length == 0) {
										var rejj =
											"Row " +
											podata[res].sno +
											" - job category is Mismatch ( " +
											podata[res].category +
											" )";
										if (rejectedDetails.length == 0) {
											rejjs +=
												"Row " +
												podata[res].sno +
												" - job category is Mismatch ( " +
												podata[res].category +
												" )";
										} else {
											rejjs +=
												", Row " +
												podata[res].sno +
												" - job category is Mismatch ( " +
												podata[res].category +
												" )";
										}
										rejectedDetails.push(rejj);
									}
								}
								resolve(podata[res]);
							})
							.catch(function (err) {
								reject(err);
							});
					} else {
						//console.log(podata[res])
						var rejj =
							"Row " +
							podata[res].sno +
							" - Some Data Missing.Please fill All Columns";
						rejectedDetails.push(rejj);
						rejects.push(1);
						resolve(rejects);
					}
				})
			);
		}
		app.promise.all(promises).then(function () {
			if (rejectedDetails.length == 0 && rejects.length == 0) {
				memberDal
					.addMemberHistoryPostingOrder(selectedDetails)
					.then(function (output1) {
						var errs = [];
						errs.push(rejectedDetails);
						rejjs = "success";
						errs.push(rejjs);
						resolve(errs);
					})
					.catch(function (err) {
						reject(err);
					});
			} else {
				var errs = [];
				errs.push(rejectedDetails);
				errs.push(rejjs);
				resolve(errs);
			}
		});
	});
};
