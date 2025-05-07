var app = require('./../app');
var memberDal = require('../DAL/memberDAL');
//var memberBal = require('./../BAL/memberBAL');
var dependentDal = require('../DAL/dependentDAL');

var jobDal = require('./../DAL/jobDAL');
var cryptoUtil = require('./../Utils/cryptoutil');
var moment = require('moment');



module.exports.createDependent = function (member) {
	return new app.promise(function (resolve, reject) {
		//validateSignup(member).then(function (response) {
			member.dateOfBirth = new Date(member.dateOfBirth);
		//	member.doj = new Date(member.doj);
		dependentDal.createDependent(member).then(function (result) {
				resolve(result);
				memberDal.logs('POST', member).then(function (result1) {}).catch(function (err) {
					resolve(result);
				});
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	//});
};



module.exports.creatememberdep = function (member) {
	return new app.promise(function (resolve, reject) {
		validateSignup(member).then(function (response) {
			member.dob = new Date(member.dob);
			//member.doj = new Date(member.doj);
			dependentDal.creatememberdep(member).then(function (result) {
				resolve(result);
				memberDal.logs('POST', member).then(function (result1) {}).catch(function (err) {
					resolve(result);
				});
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
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
			memberDal.validatemember(member.mobile, member.serviceno, 0).then(function (result) {
				if (result.response == 1) {
					reject("Mobile number/ Serviceno is already registered.");
				} else {
					resolve(result);
				}
			}).catch(function (err) {
				reject("Error validating member information");
			});
		}
	})
};

module.exports.skillmemberadd = function (skill) {
	return new app.promise(function (resolve, reject) {
		//validateSignup(member).then(function (response) {
			//member.dateOfBirth = new Date(member.dateOfBirth);
		//	member.doj = new Date(member.doj);
		dependentDal.skillmemberadd(skill).then(function (result) {
				resolve(result);
				memberDal.logs('POST', member).then(function (result1) {}).catch(function (err) {
					resolve(result);
				});
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	//});
};

module.exports.updateDependent = function (member,depid) {
	return new app.promise(function (resolve, reject) {
		//validateSignup(member).then(function (response) {
			member.dateOfBirth = new Date(member.dateOfBirth);
		//	member.doj = new Date(member.doj);
		dependentDal.updateDependent(member,depid).then(function (result) {
				resolve(result);
				memberDal.logs('POST', member).then(function (result1) {}).catch(function (err) {
					resolve(result);
				});
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	//});
};

module.exports.updateDependentstatus = function (dept) {
	return new app.promise(function (resolve, reject) {
		//validateSignup(member).then(function (response) {
			//member.dateOfBirth = new Date(member.dateOfBirth);
		//	member.doj = new Date(member.doj);
		dependentDal.updateDependentstatus(dept).then(function (result) {
				resolve(result);
				memberDal.logs('POST', member).then(function (result1) {}).catch(function (err) {
					resolve(result);
				});
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	//});
};

module.exports.updateSkillsMembers = function (skill,skillid) {
	return new app.promise(function (resolve, reject) {
		//validateSignup(member).then(function (response) {
			//member.dateOfBirth = new Date(member.dateOfBirth);
		//	member.doj = new Date(member.doj);
		dependentDal.updateSkillsMembers(skill,skillid).then(function (result) {
				resolve(result);
				memberDal.logs('POST', member).then(function (result1) {}).catch(function (err) {
					resolve(result);
				});
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	//});
};


module.exports.getmemberDependent = function (memberid) {
    return new app.promise(function (resolve, reject) {
		dependentDal.getmemberDependent(memberid).then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.getmemberskill = function (memberid) {
    return new app.promise(function (resolve, reject) {
		dependentDal.getmemberskill(memberid).then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
};