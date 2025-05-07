var app = require("./../app");
var multiline = require("multiline");
var memberModel = require("./../Model/member");
var dependentModel = require("./../Model/dependent");

var mySqlConnection = require("./MySqlHelper");
var nconf = require("./../Utils/EnvironmentUtil");
var fs = require("fs");
var filepaths = nconf.get("VACANCYERRORURL");
var stream = fs.createWriteStream(filepaths, { flags: "a" });
var moment = require("moment");

module.exports.createDependent = function (member) {
	console.log("asd", member);
	return new app.promise(function (resolve, reject) {
		mySqlConnection
			.connection()
			.then(function (con) {
				con
					.query("INSERT INTO member_dependent SET ?", member)
					.then(function (rows, fields) {
						resolve({
							memberid: rows.insertId,
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

module.exports.skillmemberadd = function (skill) {
	console.log("sdsfs", skill);
	return new app.promise(function (resolve, reject) {
		mySqlConnection
			.connection()
			.then(function (con) {
				con
					.query("INSERT INTO member_skills SET ?", skill)
					.then(function (rows, fields) {
						resolve({
							memberid: rows.insertId,
						});
					})
					.catch(function (err) {
						reject(err);
					});
			})
			.catch(function (err) {
				reject(err);
			});
	}).catch((err) => {
		reject(err);
		comsole.log(e.message); //This happened, however "reject is not defined"
	});
};

module.exports.getmemberDependent = function (memberid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection
			.connection()
			.then(function (con) {
				var query = multiline.stripIndent(function () {
					/*
(SELECT m.serviceno,d.dependentId,d.memberid,d.dependentName,d.dateOfBirth,d.gender,d.mobileNumber,d.aadharNumber,d.educationalQualification,d.technicalQualification,d.specialSkills,d.trainingRequired,d.documentPath ,d.approvalStatus ,"dependent" as type from member_dependent d inner join member m on m.memberid=d.memberid where  case ? when 0 then 1 = 1 else d.memberid = ? end) 

UNION 

(SELECT m.serviceno,s.memberskillid as dependentId,s.memberid,m.firstname,m.dob as dateOfBirth,m.genderid as gender,m.mobile as mobileNumber,m.aadhaarno as aadharNumber,"-" as educationalQualification,"-" as technicalQualification,lkv.code as specialSkills ,s.trainingfor as trainingRequired,"-" as documentPath,s.approvalStatus,"member" as type from member_skills s inner join member m on m.memberid=s.memberid  LEFT JOIN lookupvalue lkv ON lkv.lkvalid = s.skillid where  case ? when 0 then 1 = 1 else s.memberid = ? end );

                                 */
				});

				con
					.query(query, [memberid, memberid, memberid, memberid])
					.then(function (rows, fields) {
						var rowsReturned = rows.length;
						var result = [];
						var jobs = [];
						if (rowsReturned > 0) {
							for (var i = 0; i < rowsReturned; i++) {
								var dependent = new dependentModel.getdependent(rows[i]);
								result.push(dependent);
							}
						}
						console.log(result);
						resolve(result);
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

module.exports.getmemberskill = function (memberid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection
			.connection()
			.then(function (con) {
				var query = multiline.stripIndent(function () {
					/*
(SELECT * from member_skills  where  memberid = ?) 

                                 */
				});

				con
					.query(query, [memberid])
					.then(function (rows, fields) {
						var rowsReturned = rows.length;
						var result = [];
						var jobs = [];
						if (rowsReturned > 0) {
							for (var i = 0; i < rowsReturned; i++) {
								var dependent = new dependentModel.getmemberskill(rows[i]);
								result.push(dependent);
							}
						}
						console.log(result);
						resolve(result);
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

module.exports.updateDependent = function (member, depid) {
	//console.log('UPDATE member SET',member,'WHERE memberid=',memberid);
	return new app.promise(function (resolve, reject) {
		mySqlConnection
			.connection()
			.then(function (con) {
				con
					.query("UPDATE member_dependent SET ? WHERE dependentId= ?", [
						member,
						depid,
					])
					.then(function (rows, fields) {
						resolve({
							depid: depid,
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

module.exports.updateDependentstatus = function (dept) {
	//console.log('UPDATE member_dependent SET approvalStatus', dept.depid, dept.status);
	return new app.promise(function (resolve, reject) {
		var query;
		
		//console.log(query);
		mySqlConnection
			.connection()
			.then(function (con) {

				if (dept.type == "dependent") {
			
					query = con.format(
						"UPDATE member_dependent SET approvalStatus =? WHERE dependentId= ?",
						[dept.status, dept.depid]
					);
				} else {
					query = con.format(
						"UPDATE member_skills SET approvalStatus =? WHERE memberskillid= ?",
						[dept.status, dept.depid]
					);
				}

				con
					.query(query)
					.then(function (rows, fields) {
						resolve({
							depid: dept.depid,
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



module.exports.creatememberdep = function (member) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            con.query('INSERT INTO member SET ?', member).then(function (rows, fields) {
                resolve({
                    "memberid": rows.insertId
                })
            }).catch(function (err) {
                reject(err);
            });
        }).catch(function (err) {
            reject(err);
        });
    });
}
module.exports.updateSkillsMembers = function (member, depid) {
	//console.log('UPDATE member SET',member,'WHERE memberid=',memberid);
	return new app.promise(function (resolve, reject) {
		mySqlConnection
			.connection()
			.then(function (con) {
				con
					.query("UPDATE member_skills SET ? WHERE memberskillid= ?", [
						member,
						depid,
					])
					.then(function (rows, fields) {
						resolve({
							depid: depid,
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
