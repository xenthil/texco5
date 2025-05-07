var app = require("./../app");
var multiline = require("multiline");
var memberModel = require("./../Model/member");
var vacancyModel = require("./../Model/newvacancy");
var errorDAL = require("./../DAL/errorDAL");
var jobModel = require("./../Model/job");

var mySqlConnection = require("./MySqlHelper");
var nconf = require("./../Utils/EnvironmentUtil");
var fs = require("fs");
var filepaths = nconf.get("VACANCYERRORURL");
var stream = fs.createWriteStream(filepaths, { flags: "a" });
var moment = require("moment");

module.exports.uploadapplydoc = function (member) {
	console.log("asd", member);
	return new app.promise(function (resolve, reject) {
		mySqlConnection
			.connection()
			.then(function (con) {
				con
					.query("INSERT INTO member_applydoc SET ?", member)
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




module.exports.addjobactivity = function (job,docid) {
	//console.log("asd", job);
    job.isrejected=0;
	return new app.promise(function (resolve, reject) {
		mySqlConnection
			.connection()
			.then(function (con) {
				con
					.query("INSERT INTO jobactivity SET ?", job)
					.then(function (rows, fields) {
                       // activityid=rows.insertId;
                       
						resolve({
							activityid: rows.insertId,
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


module.exports.updatejobactivitynew = function (activityid,docid) {
	console.log("sdfsfdsff", activityid,docid);
   // job.isrejected=0;
	return new app.promise(function (resolve, reject) {
		mySqlConnection
			.connection()
			.then(function (con) {


			

                con.query("UPDATE `member_applydoc` SET `jobactivityid`=? , jobstatus='2' WHERE  `documentId`=?;UPDATE `member_applydoc` SET `applicationnumber`=applicationnumber-1 WHERE  `documentId`>? and jobstatus ='1';UPDATE `member_applydoc` SET `applicationnumber`=0   WHERE  `documentId`=?", [activityid,docid,docid,docid]).then(function (rows, fields) {
                    resolve({
                        "activityid": activityid,
                        
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

module.exports.newmemberapply = function (vacancy, vacancymember) {
	console.log("asd", vacancy);
    console.log("d", vacancymember);
    
	return new app.promise(function (resolve, reject) {
		mySqlConnection
			.connection()
			.then(function (con) {
				con
					.query(
						"UPDATE member SET ? WHERE memberid= ?;INSERT INTO member_applydoc SET ?;",
						[vacancymember, vacancy.memberid, vacancy]
					)
					.then(function (rows, fields) {

                        console.log(rows);
						resolve({
							memberid: vacancy.applicationnumber,
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

module.exports.getregion = function (dtid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection
			.connection()
			.then(function (con) {
				con
					.query("SELECT rg_id FROM region_details WHERE dt_id=? LIMIT 1", [
						dtid,
					])
					.then(function (validrows, fields) {
						resolve({
							data: validrows,
						});
					});
			})
			.catch(function (err) {
				//logger.debug("checkoneyearstatus - Date "+new Date()+" "+err);
				reject(err);
			});
	});
};


module.exports.getapplicationno = function () {
	return new app.promise(function (resolve, reject) {
		mySqlConnection
			.connection()
			.then(function (con) {
				con
					.query("SELECT max(applicationnumber) as appno FROM member_applydoc")
					.then(function (validrows, fields) {
						resolve({
							data: validrows,
						});
					});
			})
			.catch(function (err) {
				//logger.debug("checkoneyearstatus - Date "+new Date()+" "+err);
				reject(err);
			});
	});
};

module.exports.appliedvacancypdf = function (fromdate,todate, regionid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection
			.connection()
			.then(function (con) {
				var query = multiline.stripIndent(function () {
					/*
                    SELECT 
	                    d.documentid, 
                        d.memberid,
	                    d.documentpath,
                        d.uploadedtime,
                        m.firstname,
	                    m.serviceno,
                        m.dob,
                        m.mobile,
                        m.communicationaddress,
                        m.aadhaarno,
                        m.dateofdischarge,
                        m.civilqual,
                        m.additionalqualification,
                        d.preference,
                        d.anywhere,
                         d.applicationnumber,
                          d.jobactivityid,
                         d.jobstatus,
                        lk.description,
                        lk2.description as region,
						  (SELECT
     COUNT(a.documentid)
   FROM member_applydoc a
   WHERE a.memberid = m.memberid AND a.jobstatus=3) AS totunwill 

                    FROM member_applydoc d
					inner join member m on d.memberid=m.memberid
                    left join lookupvalue lk on d.jobdistid=lk.lkvalid
                    left join lookupvalue lk2 on d.regionid=lk2.lkvalid
                    
                   where  DATE(d.uploadedtime) BETWEEN (?) AND (?)
				 and d.jobstatus !=3
                   AND case ? when 0 then 1 = 1 else  d.regionid = ? end 
                   ORDER BY  d.uploadedtime 

            */
				});
				con
					.query(query, [fromdate,todate, regionid, regionid])
					.then(function (rows, fields) {
						var rowsReturned = rows.length;
						var result = [];
						if (rowsReturned > 0) {
							for (var i = 0; i < rowsReturned; i++) {
								var document = new vacancyModel.getappliedvacancypdf(rows[i]);
								result.push(document);
							}
						}
						resolve(result);
					})
					.catch(function (err) {
						//errorDAL.errorlog('Error',"documentDAL::getpfdocument",err.stack,JSON.stringify('query error'),"documentDAL");
						reject(err);
					});
			})
			.catch(function (err) {
				//  errorDAL.errorlog('Error',"documentDAL::getpfdocument",err.stack,JSON.stringify('mysql error'),"documentDAL");
				reject(err);
			});
	});
};


module.exports.getseneriorityno = function ( memid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection
			.connection()
			.then(function (con) {
				var query = multiline.stripIndent(function () {
					/*
                    SELECT 
	                    d.documentid, 
                        d.memberid,
	                
                        d.uploadedtime,
                        m.firstname,
	                    m.serviceno,
                        m.dob,
                        m.mobile,
                       
                         d.applicationnumber,
                          d.jobactivityid,
                         d.jobstatus,
                        lk.description as district,
                        lk2.description as region

                    FROM member_applydoc d
					inner join member m on d.memberid=m.memberid
                    left join lookupvalue lk on d.jobdistid=lk.lkvalid
                    left join lookupvalue lk2 on d.regionid=lk2.lkvalid
                    
                   where  d.jobstatus = 1
                   AND case ? when 0 then 1 = 1 else  d.memberid = ? end 
                   ORDER BY  d.uploadedtime 

            */
				});
				con
					.query(query, [memid, memid])
					.then(function (rows, fields) {
						var rowsReturned = rows.length;
						var result = [];
						if (rowsReturned > 0) {
							for (var i = 0; i < rowsReturned; i++) {
								var document = new vacancyModel.getseneriorityno(rows[i]);
								result.push(document);
							}
						}
						resolve(result);
					})
					.catch(function (err) {
						//errorDAL.errorlog('Error',"documentDAL::getpfdocument",err.stack,JSON.stringify('query error'),"documentDAL");
						reject(err);
					});
			})
			.catch(function (err) {
				//  errorDAL.errorlog('Error',"documentDAL::getpfdocument",err.stack,JSON.stringify('mysql error'),"documentDAL");
				reject(err);
			});
	});
};


module.exports.appliedvacancypdfdownload = function (fromdate,todate, regionid) {

	console.log(fromdate,todate, regionid);
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            var query = multiline.stripIndent(function () {
                /*
                    SELECT 
	                    d.documentid as sno, 
						d.applicationnumber as applicationno, 
                        d.memberid,
						 d.applyfor,
	                    d.documentpath,
                        DATE_FORMAT( d.uploadedtime, '%d-%m-%Y %H:%i') as uploadedtime, 
                        m.firstname,
	                    m.serviceno,
                        DATE_FORMAT( m.dob, '%d-%m-%Y') as dob, 
                        m.mobile,
						 m.esmidno,
						 m.communicationaddress,
                        m.address,
						m.village as address2,
						lk3.description as taluk ,
						m.pincode,
                        m.aadhaarno,
                        DATE_FORMAT( m.dateofdischarge, '%d-%m-%Y') as dateofdischarge,
                        m.civilqual,
                        m.additionalqualification,
                        d.preference,
                        d.anywhere,
                         d.jobstatus,
                        lk.description,
                        lk2.description as region
                    FROM member_applydoc d
					inner join member m on d.memberid=m.memberid
                    left join lookupvalue lk on d.jobdistid=lk.lkvalid
                    left join lookupvalue lk2 on d.regionid=lk2.lkvalid
					left join lookupvalue lk3 on m.talukid=lk3.lkvalid
                    where  DATE(d.uploadedtime) BETWEEN (?) AND (?)
				 and d.jobstatus !=3
                   AND case ? when 0 then 1 = 1 else  d.regionid = ? end 
                   ORDER BY  d.uploadedtime 
            */
            });
            con.query(query, [fromdate,todate, regionid, regionid]).then(function (rows, fields) {
                var rowsReturned = rows.length;
                var result = [];
                if (rowsReturned > 0) {
                    for (var i = 0; i < rowsReturned; i++) {
                        var document = new vacancyModel.getappliedvacancypdfdownload(rows[i]);
                        result.push(document);
                    }
                }
                resolve(result);
            }).catch(function (err) {
                //errorDAL.errorlog('Error',"documentDAL::getpfdocument",err.stack,JSON.stringify('query error'),"documentDAL");
			    reject(err);
            });
        }).catch(function (err) {
          //  errorDAL.errorlog('Error',"documentDAL::getpfdocument",err.stack,JSON.stringify('mysql error'),"documentDAL");
			reject(err);
        });
    });
}


module.exports.newvacancypdf = function () {
	return new app.promise(function (resolve, reject) {
		mySqlConnection
			.connection()
			.then(function (con) {
				var query = multiline.stripIndent(function () {
					/*
                    SELECT * from vacancypdf
	                    
            */
				});
				con
					.query(query, [])
					.then(function (rows, fields) {
						var rowsReturned = rows.length;
						var result = [];
						if (rowsReturned > 0) {
							for (var i = 0; i < rowsReturned; i++) {
								var document = new vacancyModel.getnewvacancypdf(rows[i]);
								result.push(document);
							}
						}
						resolve(result);
					})
					.catch(function (err) {
						//errorDAL.errorlog('Error',"documentDAL::getpfdocument",err.stack,JSON.stringify('query error'),"documentDAL");
						reject(err);
					});
			})
			.catch(function (err) {
				//  errorDAL.errorlog('Error',"documentDAL::getpfdocument",err.stack,JSON.stringify('mysql error'),"documentDAL");
				reject(err);
			});
	});
};
module.exports.viewvacancypdf = function () {
	return new app.promise(function (resolve, reject) {
		mySqlConnection
			.connection()
			.then(function (con) {
				var query = multiline.stripIndent(function () {
					/*
                    SELECT * FROM vacancypdf 
            */
				});
				con
					.query(query)
					.then(function (rows, fields) {
						var rowsReturned = rows.length;
						var result = [];
						if (rowsReturned > 0) {
							for (var i = 0; i < rowsReturned; i++) {
								var document = new vacancyModel.viewvacancypdf(rows[i]);
								result.push(document);
							}
						}
						resolve(result);
					})
					.catch(function (err) {
						//errorDAL.errorlog('Error',"documentDAL::getpfdocument",err.stack,JSON.stringify('query error'),"documentDAL");
						reject(err);
					});
			})
			.catch(function (err) {
				//  errorDAL.errorlog('Error',"documentDAL::getpfdocument",err.stack,JSON.stringify('mysql error'),"documentDAL");
				reject(err);
			});
	});
};

module.exports.uploadnewvacancy = function (vacancy, vacancyid) {
	//console.log('UPDATE member SET',member,'WHERE memberid=',memberid);
	return new app.promise(function (resolve, reject) {
		mySqlConnection
			.connection()
			.then(function (con) {
				con
					.query("UPDATE vacancypdf SET ? WHERE vacancyid= ?", [
						vacancy,
						vacancyid,
					])
					.then(function (rows, fields) {
						resolve({
							depid: vacancyid,
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

module.exports.amsconfirmwilling = function (job,docid) {
	//console.log('UPDATE member SET',member,'WHERE memberid=',memberid);
    job.jobstatuscode=1;
	return new app.promise(function (resolve, reject) {
		mySqlConnection
			.connection()
			.then(function (con) {
				con
					.query("INSERT INTO jobactivity SET ?",
						[job]
					)
					.then(function (rows, fields) {
                        activityid=rows.insertId;
                        con.query("UPDATE `member_applydoc` SET `jobstatus`='2',jobactivityid=? WHERE  `documentId`=?;UPDATE `member_applydoc` SET `applicationnumber`=applicationnumber-1 WHERE  `documentId`>? and jobstatus ='1';UPDATE `member_applydoc` SET `applicationnumber`=0   WHERE  `documentId`=?;", [activityid,docid,docid,docid]).then(function (rows, fields) {
                            resolve({
                                "clientid": activityid
                            })
                        }).catch(function (err) {
                            errorDAL.errorlog('Error',"clientDAL::createclient",err.stack,JSON.stringify(client),"createclient");
                            reject(err);
                        });
						// resolve({
						// 	depid: docid,
						// });
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


module.exports.amsunmwilling = function (docid) {
	//console.log('UPDATE member SET',member,'WHERE memberid=',memberid);
	return new app.promise(function (resolve, reject) {
		mySqlConnection
			.connection()
			.then(function (con) {
				con
					.query(
						"INSERT INTO member_applydoc (memberid, preference, jobdistid,regionid,anywhere,applicationnumber) SELECT memberid,preference, jobdistid, regionid,anywhere,(select max(applicationnumber)+1 from member_applydoc)FROM   member_applydoc WHERE   `documentId`=?;UPDATE `member_applydoc` SET `applicationnumber`=applicationnumber-1 WHERE `documentId`>? and jobstatus ='1';UPDATE `member_applydoc` SET `jobstatus`='3' ,`applicationnumber`=0  WHERE  `documentId`=?;", [docid,docid,docid])
					.then(function (rows, fields) {
						resolve({
							depid: docid,
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


module.exports.amsreject = function (docid) {
	//console.log('UPDATE member SET',member,'WHERE memberid=',memberid);
	return new app.promise(function (resolve, reject) {
		mySqlConnection
			.connection()
			.then(function (con) {
				con
					.query(
						"UPDATE `member_applydoc` SET `applicationnumber`=applicationnumber-1 WHERE `documentId`>? and jobstatus ='1';UPDATE `member_applydoc` SET `jobstatus`='3' ,`applicationnumber`=0  WHERE  `documentId`=?;", [docid,docid,docid])
					.then(function (rows, fields) {
						resolve({
							depid: docid,
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
module.exports.getmemberinfologin = function (texserno, memberid) {
	stream.once("open", function (fd) {
		stream.write(
			" Date - " +
				new Date() +
				" - Getting Persons Details Service Call - After Query Execute - TexcoNo " +
				texserno
		);
	});
	return new app.promise(function (resolve, reject) {
		mySqlConnection
			.connection()
			.then(function (con) {
				var query = multiline.stripIndent(function () {
					/*
                    SELECT
                        m.memberid,
                        m.firstname,
                        m.lastname,
                        m.fathername,
                        DATE_FORMAT(m.dob,'%d %b %Y') AS dob,
                        m.mobile,
                        m.communicationaddress,
                        m.address,
                        lv5.description AS 'rank',
                        lv6.description AS 'corps',
                        lv7.description AS 'trade',
                        m.characterid,
                        m.pincode,
                        m.esmidno,
                        m.civilqual,
                        m.armyqual,
                        m.registrationno,
                        m.serviceno,
                        m.texcono,
                        m.loginstatus,
                        m.active
                       
                    FROM member m
                    LEFT JOIN lookupvalue lv5 ON
                        lv5.lkvalid = m.rankid
                    AND lv5.active = 1
                    LEFT JOIN lookupvalue lv6 ON
                        lv6.lkvalid = m.corpsid
                    AND lv6.active = 1
                    LEFT JOIN lookupvalue lv7 ON
                        lv7.lkvalid = m.tradeid
                    AND lv7.active = 1   AND m.loginstatus=1                                    
                    WHERE m.active = 1 AND m.memberid = ? and  (m.lastaccess <= now() - interval 31 DAY OR m.lastaccess IS NULL ) ;

                */
				});
				// (m.serviceno = ? OR m.texcono = ? ) AND (length(m.serviceno) > 0 OR length(m.texcono) > 0)
				con
					.query(query, [memberid])
					.then(function (rows, fields) {
						var rowsReturned = rows.length;
						var member = {};
						if (rowsReturned > 0) {
							// var member = new memberModel.memberinfo(rows[0].memberid, rows[0].firstname, rows[0].lastname, rows[0].fathername, rows[0].dob, rows[0].email, rows[0].mobile, rows[0].address, rows[0].village, rows[0].talukid, rows[0].stateid, rows[0].countryid, rows[0].pincode, rows[0].addressstatus, rows[0].communicationaddress, rows[0].aadhaarno, rows[0].genderid, rows[0].districtid, rows[0].regionid, rows[0].doj, rows[0].accountno, rows[0].nominee, rows[0].nomineerelationid, rows[0].rankid, rows[0].corpsid, rows[0].tradeid, rows[0].esmidno, rows[0].characterid, rows[0].religionid, rows[0].casteid, rows[0].civilqual, rows[0].armyqual, rows[0].dependentstatus, rows[0].dependentname, rows[0].nationality, rows[0].changedby, rows[0].registrationno, rows[0].lastaccess, rows[0].serviceno, rows[0].texcono, rows[0].taluk, rows[0].state, rows[0].country, rows[0].nomineerelation, rows[0].rank, rows[0].corps, rows[0].trade, rows[0].district, rows[0].region, rows[0].character, rows[0].religion, rows[0].caste, rows[0].active, rows[0].branchcode,rows[0].branchname,rows[0].ifsccode);

							// if(rows[0].loginstatus==0)
							// {
							//     con.query("UPDATE member SET loginstatus = 1 WHERE memberid = ?;", [rows[0].memberid]).then(function (rows1, fields) {
							//         resolve(rows[0]);
							//     }).catch(function (err) {  console.log('err',err);
							//         reject("");
							//     });
							// }
							//    else
							//    {
							//     reject("User Alredy Logged in");
							//    }
							resolve(rows[0]);
						} else {
							reject("You are not allowed to apply");
						}
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

module.exports.getvacancyproject = function () {
	return new app.promise(function (resolve, reject) {
		mySqlConnection
			.connection()
			.then(function (con) {
				var query = multiline.stripIndent(function () {
					/*
                     SELECT jp.jobpostingid, jpd.jobpostingdetailid, jm.jobmasterid, jm.code,jpd.numberofvacancies, 
        jm.name, p.projectid,p.clientid, p.projectno, p.name AS 'projectname',jpd.numberofvacancies-count(ja.jobactivityid)  AS available
		   FROM jobposting jp
	           INNER JOIN jobpostingdetail jpd ON jpd.jobpostingid = jp.jobpostingid AND jpd.active =1 AND 
		  jpd.close = 1 AND CURDATE() >= IFNULL(DATE(jpd.startdate) ,CURDATE()) 
		  LEFT JOIN jobactivity ja ON ja.jobpostingdetailid=jpd.jobpostingdetailid AND ja.jobstatuscode=2
        INNER JOIN project p ON p.projectid = jp.projectid AND p.active =1 
        INNER JOIN jobmaster jm ON jm.jobmasterid = jpd.jobmasterid AND jm.active=1 
        WHERE jp.active = 1 GROUP BY jpd.jobpostingid,jpd.jobmasterid 
        ORDER BY p.projectno, jp.jobpostingid, jm.jobmasterid;
            	*/
				});
				con
					.query(query)
					.then(function (rows, fields) {
						var rowsReturned = rows.length;
						console.log(rowsReturned);
						var result = [];
						// if (rowsReturned > 0) {
						// 	for (var i = 0; i < rowsReturned; i++) {
						// 		var project = new vacancyModel.getvacancyproject(rows[i]);
						// 		result.push(project);
						// 	}
						// }
						if (rowsReturned > 0) {
							var jobs = [];
							var results = [];
							var total = 0;

							// jobmaster.forEach(function (value) {
							//     var job = new jobModel.vacancyjob(0, value.jobmasterid, value.code, value.name, 0,0, 0, "","", "", value.vacancystatus,value.carryforwardstatus);
							//     jobs.push(job);
							// });
							for (var i = 0; i < rowsReturned; i++) {
								total += parseInt(rows[i].numberofvacancies);
								// jobs.forEach(function (value) {
								//     if (rows[i].jobmasterid === value.jobmasterid) {

								//         // AES Encryption added
								//         var encryptedId = cryptoUtil.encryptAes(''+rows[i].jobpostingdetailid);
								//         value.jobpostingdetailid = encryptedId;
								//         value.numberofvacancies = rows[i].numberofvacancies;
								//         value.filledvacancies = rows[i].filledvacancies;
								//         value.waitingvacancies = rows[i].waitingvacancies;
								//         value.comments = rows[i].comments;
								//         value.posteddate = rows[i].posteddate;
								//         value.inplace = rows[i].inplace;
								//     }
								// })

								var job = new vacancyModel.vacancynewjob(
									rows[i].jobpostingdetailid,
									rows[i].jobmasterid,
									rows[i].code,
									rows[i].name,
									rows[i].numberofvacancies,
                                    rows[i].available
								);
								jobs.push(job);

								if (
									i + 1 == rowsReturned ||
									rows[i].jobpostingid != rows[i + 1].jobpostingid
								) {
									var project = new vacancyModel.projectsnew(
										rows[i].jobpostingid,
										rows[i].projectid,
										rows[i].projectno,
										rows[i].projectname,
										rows[i].clientid,
										jobs
									);
									results.push(project);

									jobs = [];
									// jobmaster.forEach(function (value) {
									// var job = new jobModel.vacancyjob(0, value.jobmasterid, value.code, value.name, 0,0, 0, "","", "", value.vacancystatus,value.carryforwardstatus);

									// });
									total = 0;
								}
								// resolve(results) ;
								//  console.log(results)
								resolve(results);
							}
						} else {
							// logger.debug("Date - " + new Date() + " - Vacancy Get job query after success no data found");
							reject("results");
						}
						// resolve(results)
					})
					.catch(function (err) {
						errorDAL.errorlog(
							"Error",
							"clientDAL::getproject",
							err.stack,
							JSON.stringify(),
							"getproject"
						);
						reject(err);
					});
			})
			.catch(function (err) {
				errorDAL.errorlog(
					"Error",
					"clientDAL::getproject",
					err.stack,
					JSON.stringify(projectid),
					"getproject"
				);
				reject(err);
			});
	});
};

module.exports.createconfirmhistoryvac = function (
	memberid,
	effectivedate,
	texcono,
	projectno,
	category,
	projectid,
	docid
) {
	console.log(memberid, effectivedate, texcono, projectno, category, projectid);
	return new app.promise(function (resolve, reject) {
		mySqlConnection
			.connection()
			.then(function (con) {
				var query = multiline.stripIndent(function () {
					/*
					INSERT INTO `memberhistory`( `memberid`, `texcono`, `projectno`,`projectid`, `category`,`startdate` ) VALUES (?,?,?,?,?,?);
					UPDATE `member` SET `lastattendance`='0000-00-00 00:00:00', `atmonthandyear`='' WHERE  `memberid`=?;
                    UPDATE `member_applydoc` SET `jobstatus`='2' WHERE  `documentId`=?;
                */
				});

				console.log(
					memberid,
					texcono,
					projectno,
					projectid,
					category,
					effectivedate,
					memberid,
					docid
				);
				con
					.query(query, [
						memberid,
						texcono,
						projectno,
						projectid,
						category,
						effectivedate,
						memberid,
						docid,
					])
					.then(function (rows, fields) {
						resolve({
							memberhistoryid: rows.insertId,
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
