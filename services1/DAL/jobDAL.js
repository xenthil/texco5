var app = require('./../app');
var multiline = require('multiline');
var jobModel = require('./../Model/job');
var mySqlConnection = require('./MySqlHelper');
var jobDal = require('./../DAL/jobDAL');
var _this = this;
var moment = require('moment');
var _ = require('underscore');
var nconf = require('./../Utils/EnvironmentUtil');
const { kStringMaxLength } = require('buffer');
var pool  = require('./MySqlHelperAsync');
var fs = require("fs");

var basedir = nconf.get('BASEDIR');  // Get BASEDIR from environment
var filepaths = nconf.get('VACANCYERRORURL');
var stream = fs.createWriteStream(filepaths, {'flags': 'a'});

var filepathh = nconf.get('NODEERRORURL');
var logger = require('./logger').createLogger(filepathh);
var cryptoUtil = require('./../Utils/cryptoutil');
logger.setLevel('debug');

module.exports.createjobmaster = function (jobmaster) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			con.query('INSERT INTO jobmaster SET ?', jobmaster).then(function (rows, fields) {
				resolve({
					"jobmasterid": rows.insertId
				})
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.updatejobmaster = function (jobmaster, jobmasterid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			con.query('UPDATE jobmaster SET ? WHERE jobmasterid= ?', [jobmaster, jobmasterid]).then(function (rows, fields) {
				resolve({
					"jobmasterid": jobmasterid
				})
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.updatejobmasterstatus = function (jobmasterid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			if (jobmasterid > 0) {
				con.query('UPDATE jobmaster SET active=? WHERE jobmasterid= ?', [0, jobmasterid]).then(function (rows, fields) {
					resolve({
						"jobmasterid": jobmasterid
					})
				}).catch(function (err) {
					reject(err);
				});
			} else {
				reject("Unable to delete jobmaster")
			}
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.getjobmaster = function (jobmasterid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
				SELECT
					jm.jobmasterid,
					jm.code,
					jm.name,
					jm.workinghours,
					jm.monthlywages,
					jm.servicecharge,
					jm.servicetax,
					jm.comments,
					jm.active,
					jm.vacancystatus,
					jm.carryforwardstatus
				FROM jobmaster jm WHERE jm.active = 1
				AND case ? when 0 then 1 = 1 else  jm.jobmasterid = ? end
				ORDER BY jm.jobmasterid
				   */

			});
			con.query(query, [jobmasterid, jobmasterid]).then(function (rows, fields) {
				var rowsReturned = rows.length;
				var result = [];
				if (rowsReturned > 0) {
					for (var i = 0; i < rowsReturned; i++) {
						var jobmaster = new jobModel.getjobmaster(rows[i].jobmasterid, rows[i].code, rows[i].name, rows[i].workinghours, rows[i].monthlywages, rows[i].servicecharge, rows[i].servicetax, rows[i].comments, rows[i].active, rows[i].vacancystatus, rows[i].carryforwardstatus);
						result.push(jobmaster);
					}
				}
				resolve(result);
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.checkjobeligibility = async function (job, rank) {
	// return new app.promise(function (resolve, reject) {
	// 	mySqlConnection.connection().then(function (con) {
	// 		var query = multiline.stripIndent(function () {
	// 			/*
					// SELECT
					// 	jobegid
					// FROM jobmaster jm
	
					// INNER JOIN jobeligibility je ON
					// 	jm.jobmasterid = je.jobmasterid
					// AND je.active = 1

					// where jm.code = ?
					// AND je.rank = ?
					// AND je.active = 1
    //             */
	// 		});
	// 		con.query(query, [job, rank]).then(function (rows, fields) {
	// 			resolve(rows.length);
	// 		}).catch(function (err) {
	// 			reject(err);
	// 		});
	// 	}).catch(function (err) {
	// 		reject(err);
	// 	});
	// });

	try { 
        const rows = await pool.query("SELECT jobegid FROM jobmaster jm INNER JOIN jobeligibility je ON jm.jobmasterid = je.jobmasterid AND je.active = 1 where jm.code = ? AND je.rank = ? AND je.active = 1", [job, rank]);  
            return rows.length;
    } catch(err) {
        throw new Error(err)
    }
}

module.exports.createjobposting = function (jobposting) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = {
				projectid: jobposting.projectid,
				clientid: jobposting.clientid,
				changedby: jobposting.changedby
			};
			con.query('INSERT INTO jobposting SET ?', query).then(function (rows, fields) {
				resolve({
					"jobpostingid": rows.insertId
				})
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.validatejobposting = function (projectid, clientid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
				SELECT
				jp.jobpostingid
				FROM
				jobposting jp
				INNER JOIN jobpostingdetail jpd ON
				jpd.jobpostingid = jp.jobpostingid AND close=1
				WHERE jp.projectid = ? AND jp.clientid = ? AND jp.active=1
				   */
			});
			con.query(query, [projectid, clientid]).then(function (rows, fields) {
				if (rows.length > 0) {
					var response = 1;
					resolve({
						"response": response
					});
				} else {
					var response = 2;
					resolve({
						"response": response
					});
				}
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.updatejobpostingdetail = function (jobpostingid, jobs, changedby, startdate) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			if (jobs.length > 0) {
				var queries = '';
				var jobmasterids = [];
				jobs.forEach(function (item) { 
					if ((item.numberofvacancies ? parseInt(item.numberofvacancies) : 0) > 0 ) 
						if (jobmasterids.includes(item.jobmasterid) === false) jobmasterids.push(item.jobmasterid);

					if (item.jobpostingdetailid > 0) {
						queries += con.format("UPDATE jobpostingdetail SET numberofvacancies = ?, comments = ?, changedby = ?, startdate=?, inplace=? WHERE jobpostingdetailid = ?;", [(item.numberofvacancies ? parseInt(item.numberofvacancies) : 0), item.comments, changedby, startdate, item.inplace, item.jobpostingdetailid])
					} else if ((item.numberofvacancies ? parseInt(item.numberofvacancies) : 0) > 0) {
						queries += con.format("INSERT INTO jobpostingdetail(jobpostingid, jobmasterid, numberofvacancies, filledvacancies, waitingvacancies, comments, changedby, startdate, inplace) VALUES (?,?,?,?,?,?,?,?,?);", [jobpostingid, item.jobmasterid, (item.numberofvacancies ? parseInt(item.numberofvacancies) : 0), 0, 0, item.comments, changedby, startdate, item.inplace])
					}
				}); 
				queries += con.format("UPDATE jobmaster SET vacancystatus = 1 WHERE jobmasterid IN (?);", [jobmasterids]);
				console.log("queries",queries);
				con.query(queries).then(function (rows, fields) {
					resolve({
						"jobpostingid": jobpostingid
					});
				}).catch(function (err) {
					reject(err);
				});
			}
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.MoveToVacancy = function (job) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {  
			con.query('SELECT ja.projectid,ja.clientid,ja.jobpostingid FROM `jobposting` ja WHERE ja.`projectid` = ? AND  ja.clientid = ?', [job.projectid, job.clientid]).then(function (rows, fields) { 
				if (rows.length == 0) {
					var query = {
						projectid: job.projectid,
						clientid: job.clientid
					};
					con.query("INSERT INTO jobposting SET ?", query).then(function (rowss, fields) {
						var jobpostingid = rowss.insertId;
						if (job.jobs.length > 0) {
							var queries = '';
							job.jobs.forEach(function (item) {
								if (item.numberofvacancies > 0) {
									queries += con.format("INSERT INTO jobpostingdetail(jobpostingid, jobmasterid, numberofvacancies, filledvacancies, waitingvacancies, comments, startdate,inplace) VALUES (?,?,?,?,?,?,?,?);", [jobpostingid, item.jobmasterid, item.numberofvacancies, 0, 0, item.comments, new Date(), item.inplace])
								}
							});
							if (queries != "") { 
								con.query(queries).then(function (rows, fields) {
									resolve({
										"jobpostingid": jobpostingid,
										"type": "1"
									});
								}).catch(function (err) { 
									console.log("err1116err",err);
									reject(err);
								});
							}
						} else {
							reject("No jobs found");
						}
					});
				} else {
					if (job.jobs.length > 0) {
						var jobpostingid = rows[0].jobpostingid;
						var query = con.format("SELECT numberofvacancies,jobpostingid,inplace,comments,jobpostingdetailid,jobmasterid FROM jobpostingdetail WHERE jobpostingid=? and close = 1;", [jobpostingid]);
						con.query(query).then(function (rows, fields) { 
							if (rows.length > 0) { 
								var noofvacancies = 0;
								var inplace = "";
								var comments = "";
								var cnts = 0;
								var postings = [];
								job.jobs.forEach(function (items) {  
									var filteredapprsup = _.filter(rows, function(item) { 
										if (item.jobmasterid == items.jobmasterid)  { 
											cnts++;
										 	noofvacancies = parseInt(items.numberofvacancies) + parseInt(item.numberofvacancies);
											if (items.comments)
												comments = items.comments;
											if (items.inplace)
												inplace = items.inplace;
											postings.push(new jobModel.jobs(items.jobpostingdetailid, items.jobmasterid, items.code, items.name, (noofvacancies != undefined? noofvacancies: 0), 0, 0, comments, new Date(), inplace));
										} 
									}); 		
									if(cnts == 0) {
										postings.push(new jobModel.jobs(items.jobpostingdetailid, items.jobmasterid, items.code, items.name, (parseInt(items.numberofvacancies) != undefined? parseInt(items.numberofvacancies): 0), 0, 0, comments, new Date(), inplace));
									}
								});
								var queries = '';
								postings.forEach(function (item) { 
									if(item.jobpostingdetailid > 0) 
										queries += con.format("UPDATE jobpostingdetail SET numberofvacancies=?,inplace=?,comments=? WHERE jobpostingdetailid=?;", [item.numberofvacancies, item.inplace, item.comments, item.jobpostingdetailid]); 
									else
										queries += con.format("INSERT INTO jobpostingdetail(jobpostingid, jobmasterid, numberofvacancies, filledvacancies, waitingvacancies, comments, startdate,inplace) VALUES (?,?,?,?,?,?,?,?);", [jobpostingid, item.jobmasterid, item.numberofvacancies, 0, 0, item.comments, item.posteddate, item.inplace]);
								});
								if (queries != "") {
									con.query(queries).then(function (rows, fields) {
										resolve({
											"jobpostingid": jobpostingid,
											"type": "2"
										});
									}).catch(function (err) { 
										reject(err);
									});
								}
							} else {
								var queries = '';
								job.jobs.forEach(function (item) {
									if (item.numberofvacancies > 0) {
										queries += con.format("INSERT INTO jobpostingdetail(jobpostingid, jobmasterid, numberofvacancies, filledvacancies, waitingvacancies, comments, startdate,inplace) VALUES (?,?,?,?,?,?,?,?);", [jobpostingid, item.jobmasterid, item.numberofvacancies, 0, 0, item.comments, new Date(), item.inplace])
									}
								});
								if (queries != "") {
									con.query(queries).then(function (rows, fields) {
										resolve({
											"jobpostingid": jobpostingid,
											"type": "1"
										});
									}).catch(function (err) { 
										reject(err);
									});
								}
							}
						}).catch(function (err) { 
							reject(err);
						});
					} else {
						reject("No jobs found");
					}
				}
			}).catch(function (err) { 
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}


module.exports.importvacancy = function (result, postings) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var d = new Date(result.job.STARTDATE);
			var startdate = new Date();
			// console.log('jobpostingid',result.jobpostingid);
			if (result.jobpostingid == null) {
				var query = {
					projectid: result.projectid,
					clientid: result.clientid
				};
				con.query("INSERT INTO jobposting SET ?", query).then(function (rows, fields) {
					result.jobpostingid = rows.insertId;
					if (postings.length > 0) {
						var queries = '';
						postings.forEach(function (item) {
							if (item.numberofvacancies > 0) {
								queries += con.format("INSERT INTO jobpostingdetail(jobpostingid, jobmasterid, numberofvacancies, filledvacancies, waitingvacancies, comments, startdate,inplace) VALUES (?,?,?,?,?,?,?,?);", [result.jobpostingid, item.jobmasterid, item.numberofvacancies, 0, 0, item.comments, startdate, item.inplace])
							}
						});
						if (queries != "") {
							con.query(queries).then(function (rows, fields) {
								resolve({
									"jobpostingid": result.jobpostingid,
									"type": "1"
								});
							}).catch(function (err) {
								reject(err);
							});
						}
					}
				});
			} else {
				if (postings.length > 0) {
					if (result.jobpostingid) {
						var jobpostingid = result.jobpostingid;
						var query = con.format("SELECT numberofvacancies,jobpostingid,inplace,comments,jobpostingdetailid,jobmasterid FROM jobpostingdetail WHERE jobpostingid=? and close = 1;", [result.jobpostingid]);
						con.query(query).then(function (rows, fields) {
							if (rows.length > 0) {
								var sgcount = 0;
								var hsgcount = 0;
								var dvrcount = 0;
								var asocount = 0;
								var pocount = 0;
								var jacount = 0;
								var othercount = 0;
								var oacount = 0;
								var guncount = 0;
								var sginplace = '';
								var hsginplace = '';
								var dvrinplace = '';
								var asoinplace = '';
								var poinplace = '';
								var jainplace = '';
								var otherinplace = '';
								var oainplace = '';
								var guninplace = '';
								var sgcomments = "";
								var hsgcomments = "";
								var dvrcomments = "";
								var asocomments = "";
								var pocomments = "";
								var jacomments = "";
								var oacomments = "";
								var guncomments = "";
								var othercomments = "";
								var sgpostid = 0;
								var hsgpostid = 0;
								var dvrpostid = 0;
								var asopostid = 0;
								var popostid = 0;
								var japostid = 0;
								var otherpostid = 0;
								var oapostid = 0;
								var gunpostid = 0;

								rows.forEach(function (items) {
									if (parseInt(items.jobmasterid) == 1) {
										sgcount += parseInt(items.numberofvacancies);
										if (items.comments)
											sgcomments = items.comments;
										if (items.inplace)
											sginplace = items.inplace;
										sgpostid = items.jobpostingdetailid;
									}
									if (parseInt(items.jobmasterid) == 2) {
										hsgcount += parseInt(items.numberofvacancies);
										if (items.inplace)
											hsginplace = items.inplace;
										if (items.comments)
											hsgcomments = items.comments;
										hsgpostid = items.jobpostingdetailid;
									}
									if (parseInt(items.jobmasterid) == 3) {
										dvrcount += parseInt(items.numberofvacancies);
										if (items.inplace)
											dvrinplace = items.inplace;
										if (items.comments)
											dvrcomments = items.comments;
										dvrpostid = items.jobpostingdetailid;
									}
									if (parseInt(items.jobmasterid) == 4) {
										asocount += parseInt(items.numberofvacancies);
										if (items.inplace)
											asoinplace = items.inplace;
										if (items.comments)
											asocomments = items.comments;
										asopostid = items.jobpostingdetailid;
									}
									if (parseInt(items.jobmasterid) == 5) {
										pocount += parseInt(items.numberofvacancies);
										if (items.inplace)
											poinplace = items.inplace;
										if (items.comments)
											pocomments = items.comments;
										popostid = items.jobpostingdetailid;
									}
									if (parseInt(items.jobmasterid) == 6) {
										jacount += parseInt(items.numberofvacancies);
										if (items.inplace)
											jainplace = items.inplace;
										if (items.comments)
											jacomments = items.comments;
										japostid = items.jobpostingdetailid;
									}
									if (parseInt(items.jobmasterid) == 7) {
										othercount += parseInt(items.numberofvacancies);
										if (items.inplace)
											otherinplace = items.inplace;
										if (items.comments)
											othercomments = items.comments;
										otherpostid = items.jobpostingdetailid;
									}
									if (parseInt(items.jobmasterid) == 8) {
										oacount += parseInt(items.numberofvacancies);
										if (items.inplace)
											oainplace = items.inplace;
										if (items.comments)
											oacomments = items.comments;
										oapostid = items.jobpostingdetailid;
									}
									if (parseInt(items.jobmasterid) == 9) {
										guncount += parseInt(items.numberofvacancies);
										if (items.inplace)
											guninplace = items.inplace;
										if (items.comments)
											guncomments = items.comments;
										gunpostid = items.jobpostingdetailid;
									}
								});

								postings.forEach(function (item) {
									if (item.numberofvacancies > 0) {
										if (item.code == 'SG') {
											sgcount += parseInt(item.numberofvacancies);
											if (item.inplace)
												sginplace = (sginplace) ? sginplace + ', ' + item.inplace : item.inplace;
											if (item.comments)
												sgcomments = (sgcomments) ? sgcomments + ', ' + item.comments : item.comments;
										}
										if (item.code == 'HSG') {
											hsgcount += parseInt(item.numberofvacancies);
											if (item.inplace)
												hsginplace = (hsginplace) ? hsginplace + ', ' + item.inplace : item.inplace;
											if (item.comments)
												hsgcomments = (hsgcomments) ? hsgcomments + ', ' + item.comments : item.comments;
										}
										if (item.code == 'DVR') {
											dvrcount += parseInt(item.numberofvacancies);
											if (item.inplace)
												dvrinplace = (dvrinplace) ? dvrinplace + ', ' + item.inplace : item.inplace;
											if (item.comments)
												dvrcomments = (dvrcomments) ? dvrcomments + ', ' + item.comments : item.comments;
										}
										if (item.code == 'ASO') {
											asocount += parseInt(item.numberofvacancies);
											if (item.inplace)
												asoinplace = (asoinplace) ? asoinplace + ', ' + item.inplace : item.inplace;
											if (item.comments)
												asocomments = (asocomments) ? asocomments + ', ' + item.comments : item.comments;
										}
										if (item.code == 'PO') {
											pocount += parseInt(item.numberofvacancies);
											if (item.inplace)
												poinplace = (poinplace) ? poinplace + ', ' + item.inplace : item.inplace;
											if (item.comments)
												pocomments = (pocomments) ? pocomments + ', ' + item.comments : item.comments;
										}
										if (item.code == 'JA') {
											jacount += parseInt(item.numberofvacancies);
											if (item.inplace)
												jainplace = (jainplace) ? jainplace + ', ' + item.inplace : item.inplace;
											if (item.comments)
												jacomments = (jacomments) ? jacomments + ', ' + item.comments : item.comments;
										}
										if (item.code == 'OTHER') {
											othercount += parseInt(item.numberofvacancies);
											if (item.inplace)
												otherinplace = (otherinplace) ? otherinplace + ', ' + item.inplace : item.inplace;
											if (item.comments)
												othercomments = (othercomments) ? othercomments + ', ' + item.comments : item.comments;
										}
										if (item.code == 'OA') {
											oacount += parseInt(item.numberofvacancies);
											if (item.inplace)
												oainplace = (oainplace) ? oainplace + ', ' + item.inplace : item.inplace;
											if (item.comments)
												oacomments = (oacomments) ? oacomments + ', ' + item.comments : item.comments;
										}
										if (item.code == 'GUN') {
											guncount += parseInt(item.numberofvacancies);
											if (item.inplace)
												guninplace = (guninplace) ? guninplace + ', ' + item.inplace : item.inplace;
											if (item.comments)
												guncomments = (guncomments) ? guncomments + ', ' + item.comments : item.comments;
										}
									}
								});
								var queries = '';
								if (sgpostid) {
									queries += con.format("UPDATE jobpostingdetail SET numberofvacancies=?,inplace=?,comments=? WHERE jobpostingdetailid=?;", [sgcount, sginplace, sgcomments, sgpostid]);
								} else {
									queries += con.format("INSERT INTO jobpostingdetail(jobpostingid, jobmasterid, numberofvacancies, filledvacancies, waitingvacancies, comments, startdate,inplace) VALUES (?,?,?,?,?,?,?,?);", [jobpostingid, 1, sgcount, 0, 0, sgcomments, startdate, sginplace]);
								}
								if (hsgpostid) {
									queries += con.format("UPDATE jobpostingdetail SET numberofvacancies=?,inplace=?,comments=? WHERE jobpostingdetailid=?;", [hsgcount, hsginplace, hsgcomments, hsgpostid]);
								} else {
									queries += con.format("INSERT INTO jobpostingdetail(jobpostingid, jobmasterid, numberofvacancies, filledvacancies, waitingvacancies, comments, startdate,inplace) VALUES (?,?,?,?,?,?,?,?);", [jobpostingid, 2, hsgcount, 0, 0, hsgcomments, startdate, hsginplace])
								}
								if (dvrpostid) {
									queries += con.format("UPDATE jobpostingdetail SET numberofvacancies=?,inplace=?,comments=? WHERE jobpostingdetailid=?;", [dvrcount, dvrinplace, dvrcomments, dvrpostid]);
								} else {
									queries += con.format("INSERT INTO jobpostingdetail(jobpostingid, jobmasterid, numberofvacancies, filledvacancies, waitingvacancies, comments, startdate,inplace) VALUES (?,?,?,?,?,?,?,?);", [jobpostingid, 3, dvrcount, 0, 0, dvrcomments, startdate, dvrinplace]);
								}
								if (asopostid) {
									queries += con.format("UPDATE jobpostingdetail SET numberofvacancies=?,inplace=?,comments=? WHERE jobpostingdetailid=?;", [asocount, asoinplace, asocomments, asopostid]);
								} else {
									queries += con.format("INSERT INTO jobpostingdetail(jobpostingid, jobmasterid, numberofvacancies, filledvacancies, waitingvacancies, comments, startdate,inplace) VALUES (?,?,?,?,?,?,?,?);", [jobpostingid, 4, asocount, 0, 0, asocomments, startdate, asoinplace]);
								}
								if (popostid) {
									queries += con.format("UPDATE jobpostingdetail SET numberofvacancies=?,inplace=?,comments=? WHERE jobpostingdetailid=?;", [pocount, poinplace, pocomments, popostid]);
								} else {
									queries += con.format("INSERT INTO jobpostingdetail(jobpostingid, jobmasterid, numberofvacancies, filledvacancies, waitingvacancies, comments, startdate,inplace) VALUES (?,?,?,?,?,?,?,?);", [jobpostingid, 5, pocount, 0, 0, pocomments, startdate, poinplace])
								}
								if (japostid) {
									queries += con.format("UPDATE jobpostingdetail SET numberofvacancies=?,inplace=?,comments=? WHERE jobpostingdetailid=?;", [jacount, jainplace, jacomments, japostid]);
								} else {
									queries += con.format("INSERT INTO jobpostingdetail(jobpostingid, jobmasterid, numberofvacancies, filledvacancies, waitingvacancies, comments, startdate,inplace) VALUES (?,?,?,?,?,?,?,?);", [jobpostingid, 6, jacount, 0, 0, jacomments, startdate, jainplace]);
								}
								if (otherpostid) {
									queries += con.format("UPDATE jobpostingdetail SET numberofvacancies=?,inplace=?,comments=? WHERE jobpostingdetailid=?;", [othercount, otherinplace, othercomments, otherpostid]);
								} else {
									queries += con.format("INSERT INTO jobpostingdetail(jobpostingid, jobmasterid, numberofvacancies, filledvacancies, waitingvacancies, comments, startdate,inplace) VALUES (?,?,?,?,?,?,?,?);", [jobpostingid, 7, othercount, 0, 0, othercomments, startdate, otherinplace]);
								}
								if (oapostid) {
									queries += con.format("UPDATE jobpostingdetail SET numberofvacancies=?,inplace=?,comments=? WHERE jobpostingdetailid=?;", [oacount, oainplace, oacomments, oapostid]);
								} else {
									queries += con.format("INSERT INTO jobpostingdetail(jobpostingid, jobmasterid, numberofvacancies, filledvacancies, waitingvacancies, comments, startdate,inplace) VALUES (?,?,?,?,?,?,?,?);", [jobpostingid, 8, oacount, 0, 0, oacomments, startdate, oainplace]);
								}
								if (gunpostid) {
									queries += con.format("UPDATE jobpostingdetail SET numberofvacancies=?,inplace=?,comments=? WHERE jobpostingdetailid=?;", [guncount, guninplace, guncomments, gunpostid]);
								} else {
									queries += con.format("INSERT INTO jobpostingdetail(jobpostingid, jobmasterid, numberofvacancies, filledvacancies, waitingvacancies, comments, startdate,inplace) VALUES (?,?,?,?,?,?,?,?);", [jobpostingid, 9, guncount, 0, 0, guncomments, startdate, guninplace]);
								}
								console.log('queries', queries);
								if (queries != "") {
									con.query(queries).then(function (rows, fields) {
										resolve({
											"jobpostingid": result.jobpostingid,
											"type": "2"
										});
									}).catch(function (err) {
										reject(err);
									});
								}
							} else {
								var queries = '';
								postings.forEach(function (item) {
									if (item.numberofvacancies > 0) {
										queries += con.format("INSERT INTO jobpostingdetail(jobpostingid, jobmasterid, numberofvacancies, filledvacancies, waitingvacancies, comments, startdate,inplace) VALUES (?,?,?,?,?,?,?,?);", [result.jobpostingid, item.jobmasterid, item.numberofvacancies, 0, 0, item.comments, startdate, item.inplace])
									}
								});
								if (queries != "") {
									con.query(queries).then(function (rows, fields) {
										resolve({
											"jobpostingid": result.jobpostingid,
											"type": "1"
										});
									}).catch(function (err) {
										reject(err);
									});
								}
							}
						}).catch(function (err) {
							reject(err);
						});
					}
				}
			}
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.checkjobposting = function (jobpostingid, result) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			con.query('UPDATE `jobpostingdetail` SET `close`=0 WHERE `jobpostingid`=? AND  close= 1', [jobpostingid]).then(function (rows, fields) {
				resolve("success");
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.updatejobpostingstatus = function (jobpostingid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			con.query('UPDATE jobposting SET active=? WHERE jobpostingid= ?', [0, jobpostingid]).then(function (rows, fields) {
				resolve({
					"jobpostingid": jobpostingid
				})
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.checkjobstatus = function (memberid, jobpostingdetailid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			con.query('SELECT jobactivityid, jobpostingdetailid, memberid, clientid, projectid, currentvacancies, jobstatuscode, texcono, effectivedate FROM jobactivity WHERE active = 1 AND  memberid = ? AND jobpostingdetailid = ?;', [memberid, jobpostingdetailid]).then(function (rows, fields) {
				var rowsReturned = rows.length;
				if (rowsReturned > 0) {
					reject("Already you applied for the job");
				} else {
					resolve("success");
				}
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.getjobposting = function (jobpostingid) {
	return new app.promise(function (resolve, reject) {
		var jobmaster = [];
		// get all the jobs
		_this.getjobmaster(0).then(function (jm) {
			jobmaster = jm;

			mySqlConnection.connection().then(function (con) {
				var query = multiline.stripIndent(function () {
					/*
                 	 SELECT
                      jp.jobpostingid,
                      jp.clientid,
                      jp.projectid,
                      jpd.jobpostingdetailid,
                      jpd.numberofvacancies,
                      jpd.filledvacancies,
                      jpd.waitingvacancies,
                      jpd.comments,
                      jpd.inplace,
                      c.organization,
                      p.projectno,
                      p.name AS projectname,
                      p.districtid,
                      district.description As district,
                      p.regionid,
                      region.description AS region,
                      jm.jobmasterid,
                      jm.code AS jobmastercode,
                      jm.name AS jobmastername,
                      c.image

                  FROM
                    jobposting jp

                  INNER JOIN jobpostingdetail jpd ON
                    jpd.jobpostingid = jp.jobpostingid
                  AND jpd.active = 1 AND jpd.close = 1

                  INNER JOIN client c ON
                    c.clientid = jp.clientid
                  AND c.active = 1

                  INNER JOIN project p ON
                    p.projectid = jp.projectid
                  AND p.active = 1

                  INNER JOIN jobmaster jm ON
                    jm.jobmasterid = jpd.jobmasterid
                  AND jm.active = 1

                  INNER JOIN lookupvalue district ON
                    district.lkvalid = p.districtid
                  AND district.active = 1

                  INNER JOIN lookupvalue region ON
                    region.lkvalid = p.regionid
                  AND region.active = 1

                  WHERE jp.active = 1

                  AND case ? when 0 then 1 = 1 else  jp.jobpostingid = ? end
                  ORDER BY jp.jobpostingid, jm.jobmasterid;

                                     */
				});

				con.query(query, [jobpostingid, jobpostingid]).then(function (rows, fields) {
					var rowsReturned = rows.length;
					var result = [];
					var jobs = []

					jobmaster.forEach(function (value) {
						var job = new jobModel.jobs(0, value.jobmasterid, value.code, value.name, 0, 0, 0, "", '', "");
						jobs.push(job);
					});

					if (rowsReturned > 0) {
						for (var i = 0; i < rowsReturned; i++) {

							jobs.forEach(function (value) {
								if (rows[i].jobmasterid === value.jobmasterid) {
									value.jobpostingdetailid = rows[i].jobpostingdetailid;
									value.numberofvacancies = parseInt(rows[i].numberofvacancies);
									value.filledvacancies = rows[i].filledvacancies;
									value.waitingvacancies = rows[i].waitingvacancies;
									value.comments = rows[i].comments;
									value.inplace = rows[i].inplace;
								}
							})

							if ((i + 1 == rowsReturned) || (rows[i].jobpostingid != rows[i + 1].jobpostingid)) {
								var jobposting = new jobModel.getjobposting(rows[i].jobpostingid, rows[i].clientid, rows[i].organization, rows[i].projectid, rows[i].projectno, rows[i].projectname, rows[i].districtid, rows[i].district, rows[i].regionid, rows[i].region, jobs, rows[i].image,'');
								result.push(jobposting);
								jobs = [];
								jobmaster.forEach(function (value) {
									var job = new jobModel.jobs(0, value.jobmasterid, value.code, value.name, 0, 0, 0, "");
									jobs.push(job);
								});
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
		});

	});
}

module.exports.getjobpostingdetail = async function (jobpostingdetailid) { 
		return new Promise((resolve, reject) => {
			mySqlConnection.connection()
				.then(con => {
					const query = `SELECT 
							jpd.jobpostingid, jpd.jobpostingdetailid, 
							IFNULL(jpd.numberofvacancies, 0) AS numberofvacancies, 
							IFNULL(jpd.filledvacancies, 0) AS filledvacancies, 
							IFNULL(jpd.waitingvacancies, 0) AS waitingvacancies, 
							jpd.comments, jpd.inplace, 
							DATE_FORMAT(jpd.posteddate,'%d %b %Y') AS posteddate, 
							client.clientid, client.organization, 
							client.addressline1, client.addressline2, client.addressline3, 
							project.projectno, project.projectid, project.name AS projectname, 
							jpd.jobmasterid, jobmaster.code AS jobmastercode, 
							jobmaster.name AS jobmastername, 
							district.lkvalid AS districtid, region.lkvalid AS regionid, 
							district.description AS district, region.description AS region 
						FROM jobpostingdetail jpd 
						INNER JOIN jobposting jp ON jpd.jobpostingid = jp.jobpostingid AND jp.active = 1 
						INNER JOIN client client ON client.clientid = jp.clientid AND client.active = 1 
						INNER JOIN project project ON project.projectid = jp.projectid AND project.active = 1 
						INNER JOIN lookupvalue district ON district.lkvalid = project.districtid AND district.active = 1 
						INNER JOIN jobmaster jobmaster ON jobmaster.jobmasterid = jpd.jobmasterid AND jobmaster.active = 1 
						INNER JOIN lookupvalue region ON region.lkvalid = project.regionid AND region.active = 1 
						WHERE jpd.jobpostingdetailid = ?`;
	
					return con.query(query, [jobpostingdetailid]); // Execute parameterized query
				})
			.then((rows) => { // Destructure query result properly
					if (rows.length > 0) {
						const result = new jobModel.jobpostingdetail(
							rows[0].jobpostingid, rows[0].jobpostingdetailid, 
							rows[0].numberofvacancies, rows[0].filledvacancies, 
							rows[0].waitingvacancies, rows[0].comments, 
							rows[0].posteddate, rows[0].clientid, 
							rows[0].organization, rows[0].addressline1, 
							rows[0].addressline2, rows[0].addressline3, 
							rows[0].projectid, rows[0].projectno, 
							rows[0].projectname, rows[0].jobmasterid, 
							rows[0].jobmastercode, rows[0].jobmastername, 
							rows[0].regionid, rows[0].region, 
							rows[0].districtid, rows[0].district, 
							rows[0].inplace
						);
						resolve(result); // Resolve the promise with result
					} else {
						resolve({}); // Return empty object if no data
					}
				})
				.catch(err => {
					reject(err); // Reject with error
				});
		});
	};
	
	// try {
    //     var query="SELECT jpd.jobpostingid, jpd.jobpostingdetailid, IFNULL(jpd.numberofvacancies, 0) AS numberofvacancies, IFNULL(jpd.filledvacancies, 0) AS filledvacancies, IFNULL(jpd.waitingvacancies, 0) AS waitingvacancies, jpd.comments, jpd.inplace, DATE_FORMAT(jpd.posteddate,'%d %b %Y') AS posteddate, client.clientid, client.organization, client.addressline1, client.addressline2, client.addressline3, project.projectno, project.projectid, project.name AS projectname, jpd.jobmasterid, jobmaster.code AS jobmastercode, jobmaster.name AS jobmastername, district.lkvalid As districtid, region.lkvalid AS regionid, district.description As district, region.description AS region FROM jobpostingdetail jpd INNER JOIN jobposting jp ON jpd.jobpostingid = jp.jobpostingid AND jp.active =1 INNER JOIN client client ON client.clientid = jp.clientid AND client.active =1 INNER JOIN project project ON project.projectid = jp.projectid AND project.active =1 INNER JOIN lookupvalue district ON district.lkvalid = project.districtid AND district.active = 1 INNER JOIN jobmaster jobmaster ON jobmaster.jobmasterid = jpd.jobmasterid AND jobmaster.active = 1 INNER JOIN lookupvalue region ON region.lkvalid = project.regionid AND region.active = 1 WHERE jpd.jobpostingdetailid ="+jobpostingdetailid;
    //     const rows = await pool.query(query);  
	// 	var rowsReturned = rows.length;
	// 	var result = {};
	// 	if (rowsReturned > 0) {
	// 		var result = new jobModel.jobpostingdetail(rows[0].jobpostingid, rows[0].jobpostingdetailid, rows[0].numberofvacancies, rows[0].filledvacancies, rows[0].waitingvacancies, rows[0].comments, rows[0].posteddate, rows[0].clientid, rows[0].organization, rows[0].addressline1, rows[0].addressline2, rows[0].addressline3, rows[0].projectid, rows[0].projectno, rows[0].projectname, rows[0].jobmasterid, rows[0].jobmastercode, rows[0].jobmastername, rows[0].regionid, rows[0].region, rows[0].districtid, rows[0].district, rows[0].inplace);
	// 	}
	// 	return result;
    // } catch(err) {
    //     throw new Error(err)
    // }
	// return new app.promise(function (resolve, reject) {
	// 	mySqlConnection.connection().then(function (con) {
	// 		var query = multiline.stripIndent(function () {
	// 			/*
	// 				SELECT
	// 					jpd.jobpostingid,
	// 					jpd.jobpostingdetailid,
	// 					IFNULL(jpd.numberofvacancies, 0) AS numberofvacancies,
	// 					IFNULL(jpd.filledvacancies, 0) AS filledvacancies,
	// 					IFNULL(jpd.waitingvacancies, 0) AS waitingvacancies,
	// 					jpd.comments,
	// 					jpd.inplace,
	// 					DATE_FORMAT(jpd.posteddate,'%d %b %Y') AS posteddate,
	// 					client.clientid,
	// 					client.organization,
	// 					client.addressline1,
	// 					client.addressline2,
	// 					client.addressline3,
	// 					project.projectno,
	// 					project.projectid,
	// 					project.name AS projectname,
	// 					jpd.jobmasterid,
	// 					jobmaster.code AS jobmastercode,
	// 					jobmaster.name AS jobmastername,
	// 					district.lkvalid As districtid,
	// 					region.lkvalid AS regionid,
	// 					district.description As district,
	// 					region.description AS region

	// 				FROM
	// 					jobpostingdetail jpd

	// 				INNER JOIN jobposting jp ON
	// 					jpd.jobpostingid = jp.jobpostingid
	// 				AND jp.active =1

	// 				INNER JOIN client client ON
	// 					client.clientid = jp.clientid
	// 				AND client.active =1

	// 				INNER JOIN project project ON
	// 					project.projectid = jp.projectid
	// 				AND project.active =1

	// 				INNER JOIN lookupvalue district ON
	// 					district.lkvalid = project.districtid
	// 				AND district.active = 1

	// 				INNER JOIN jobmaster jobmaster ON
	// 					jobmaster.jobmasterid = jpd.jobmasterid
	// 				AND jobmaster.active = 1

	// 				INNER JOIN lookupvalue region ON
	// 					region.lkvalid = project.regionid
	// 				AND region.active = 1

	// 				WHERE jpd.jobpostingdetailid = ?
    //             */
	// 		});
	// 		con.query(query, [jobpostingdetailid]).then(function (rows, fields) {
				// var rowsReturned = rows.length;
				// var result = {};
				// if (rowsReturned > 0) {
				// 	var result = new jobModel.jobpostingdetail(rows[0].jobpostingid, rows[0].jobpostingdetailid, rows[0].numberofvacancies, rows[0].filledvacancies, rows[0].waitingvacancies, rows[0].comments, rows[0].posteddate, rows[0].clientid, rows[0].organization, rows[0].addressline1, rows[0].addressline2, rows[0].addressline3, rows[0].projectid, rows[0].projectno, rows[0].projectname, rows[0].jobmasterid, rows[0].jobmastercode, rows[0].jobmastername, rows[0].regionid, rows[0].region, rows[0].districtid, rows[0].district, rows[0].inplace);
				// }
				// resolve(result);
	// 		}).catch(function (err) {
	// 			reject(err);
	// 		});
	// 	}).catch(function (err) {
	// 		reject(err);
	// 	});
	// });
// }

module.exports.createjobactivity = function (jobactivity, appliedcount) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var effectivedate = new Date();
			con.query("INSERT INTO jobactivity SET ?", jobactivity).then(function (rows, fields) {
				jobactivityid = rows.insertId;
				var query1 = {
					jobactivityid: jobactivityid,
					ondate: effectivedate,
					comments: "",
					jobstatuscode: jobactivity.jobstatuscode,
					changedby: jobactivity.changedby
				};
				con.query("INSERT INTO jobactivityhistory SET ?", query1).then(function (rows, fields) {
					resolve({
						"jobactivityid": jobactivityid,
						"appliedcount": appliedcount
					});
				})
			});
		}).catch(function (err) {
			reject(err);
		});
	}).catch(function (err) {
		reject(err);
	});
}

module.exports.updatejobactivity = function (jobactivityid, jobstatuscode, comments) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var ondate = new Date();
			con.query("UPDATE jobactivity SET jobstatuscode = ? WHERE jobactivityid = ?", [jobstatuscode, jobactivityid]).then(function (rows, fields) {
				var query1 = {
					jobactivityid: jobactivityid,
					ondate: ondate,
					comments: comments,
					jobstatuscode: jobstatuscode
				};
				con.query("INSERT INTO jobactivityhistory SET ?", query1).then(function (rows, fields) {
					resolve("success");
				})
			});
		}).catch(function (err) {
			reject(err);
		});
	}).catch(function (err) {
		reject(err);
	});
}

module.exports.getjobpostingbyid = function (jobpostingid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
					SELECT
						jp.jobpostingid,
						jp.jobmasterid,
						jp.numberofvacancies,
						jp.filledvacancies,
						jp.waitingvacancies,
						jp.comments,
						jp.posteddate,
						jp.startdate,
						jp.enddate,
						jp.active
					FROM jobposting jp

					INNER JOIN jobmaster jm ON
						jm.jobmasterid = jp.jobmasterid
					AND jm.active = 1

					WHERE jp.jobpostingid = ?;
            	*/
			});
			con.query(query, [jobpostingid]).then(function (rows, fields) {
				var rowsReturned = rows.length;
				if (rowsReturned > 0) {
					var jobposting = new jobModel.getjobposting(rows[i].jobpostingid, 0, '', rows[i].projectid, rows[i].jobmasterid, rows[i].numberofvacancies, rows[i].filledvacancies, rows[i].waitingvacancies, rows[i].comments, rows[i].posteddate, rows[i].startdate, rows[i].enddate,rows[i].active);
					resolve(jobposting);
				}
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.getjobmasterbyid = function (jobmasterid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			con.query('SELECT jobmasterid, code, name, workinghours, monthlywages, servicecharge, servicetax, comments, active FROM jobmaster WHERE jobmasterid =?', [jobmasterid]).then(function (rows, fields) {
				var rowsReturned = rows.length;
				if (rowsReturned > 0) {
					var jobmaster = new jobModel.getjobmaster(rows[0].jobmasterid, rows[0].code, rows[0].name, rows[0].workinghours, rows[0].monthlywages, rows[0].servicecharge, rows[0].servicetax, rows[0].comments, rows[0].active);
					resolve(jobmaster);
				}
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.memberjobdetails = function (memberid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			con.query('SELECT  jobpostingdetailid, memberid, clientid, projectid, currentvacancies, jobstatuscode, texcono, registrationno, effectivedate FROM jobactivity WHERE active = 1 AND  memberid = ? AND jobstatuscode = 2 ORDER BY effectivedate;', [memberid]).then(function (rows, fields) {
				var rowsReturned = rows.length;
				if (rowsReturned > 0) {
					var result = new jobModel.jobactivity(rows[0].jobpostingdetailid, rows[0].memberid, rows[0].clientid, rows[0].projectid, rows[0].currentvacancies, rows[0].jobstatuscode, rows[0].texcono, rows[0].registrationno, rows[0].effectivedate);
					resolve(result);
				} else {
					resolve("success");
				}
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.checkemember6month = function (memberid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			con.query('Select * from memberhistory where active = 1 AND startdate >= DATE_SUB(now(), INTERVAL 12 MONTH) and memberid = ?', [memberid]).then(function (rows, fields) {
				resolve({
					"confirmed": rows.length
				});
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.getjoblist = async function () {  
	try {
		// logger.debug(" Date - "+ new Date() + " - Dashboard Get job query before call");
		var query = "SELECT jp.jobpostingid, jpd.jobpostingdetailid, jpd.numberofvacancies, jpd.filledvacancies, jpd.waitingvacancies, jpd.comments, jpd.inplace, DATE_FORMAT(jpd.posteddate,'%b %d %Y %h:%i %p')AS posteddate, jm.jobmasterid, jm.code, jm.name, cl.clientid, cl.image, cl.organization, cl.addressline1, cl.addressline2, cl.addressline3, cl.talukid, taluk.description AS 'taluk', cl.email, p.projectid, p.projectno, p.name AS 'projectname', p.regionid, region.description AS 'region', p.districtid, district.description AS 'district', ag.wagetypeid, lv1.description AS 'wagetype',jm.vacancystatus FROM jobposting jp INNER JOIN jobpostingdetail jpd ON jpd.jobpostingid = jp.jobpostingid AND jpd.active =1 AND jpd.close = 1 INNER JOIN client cl ON cl.clientid = jp.clientid AND cl.active =1 INNER JOIN project p ON p.projectid = jp.projectid AND p.active =1 INNER JOIN jobmaster jm ON jm.jobmasterid = jpd.jobmasterid AND jm.active=1 AND jm.vacancystatus =1 INNER JOIN lookupvalue region ON region.lkvalid = p.regionid AND region.active = 1 INNER JOIN lookupvalue district ON district.lkvalid = p.districtid AND district.active = 1 INNER JOIN lookupvalue taluk ON taluk.lkvalid = cl.talukid AND taluk.active = 1 INNER JOIN agreementinfo ai ON ai.projectid = jp.projectid AND ai.active = 1 INNER JOIN agreement ag ON ag.agreementid = ai.agreementid AND ag.active = 1 INNER JOIN lookupvalue lv1 ON lv1.lkvalid = ag.wagetypeid AND lv1.lkdmncode ='WGTYPE' AND lv1.active = 1 WHERE jp.active = 1 GROUP BY jpd.jobpostingid,jpd.jobmasterid ORDER BY jpd.posteddate DESC LIMIT 3";
		const rows = await pool.query(query);   
		var result = [];
		var rowsReturned = rows.length; 
		logger.debug(" Date - "+ new Date() + " - Dashboard Get job after query success");
		if (rowsReturned > 0) {
			result = [];
			var projects = [];
			var jobs = []
			for (var i = 0; i < rowsReturned; i++) {
	
				var job = new jobModel.jobs(rows[i].jobpostingdetailid, rows[i].jobmasterid, rows[i].code, rows[i].name, rows[i].numberofvacancies, rows[i].filledvacancies, rows[i].waitingvacancies, rows[i].comments, rows[i].posteddate, rows[i].inplace);
				jobs.push(job);
	
				if ((i + 1 == rowsReturned) || (rows[i].jobpostingid != rows[i + 1].jobpostingid)) {
					var project = new jobModel.projects(rows[i].jobpostingid, rows[i].projectid, rows[i].wagetype, rows[i].projectno, rows[i].projectname, rows[i].districtid, rows[i].district, rows[i].regionid, rows[i].region, jobs, 0);
					projects.push(project);
					jobs = [];
	
	
					if ((i + 1 == rowsReturned) || (rows[i].clientid != rows[i + 1].clientid)) {
						var project = new jobModel.alljoblist(rows[i].clientid, rows[i].image, rows[i].organization, rows[i].addressline1, rows[i].addressline2, rows[i].addressline3, projects);
						result.push(project);
						projects = [];
						jobs = [];
					}
				}
			}
		} 
		return result;
	} catch(err) {  
		console.log("err",err);
		stream.once('open', function(fd) { 
			stream.write(" Date - "+ new Date() + " - " + err);
		});  
		throw new Error(err)
	}
}

module.exports.getalljoblist = async function () {
	jobmaster = await _this.getjobmasterVACStatus(); 
	try { 
		logger.debug(" Date - "+ new Date() + " - Vacancy Get job query before call");
		var query = "SELECT jp.jobpostingid, jpd.jobpostingdetailid, jpd.numberofvacancies, jpd.filledvacancies, jpd.waitingvacancies, jpd.comments, jpd.inplace, DATE_FORMAT(jpd.posteddate,'%b %d %Y %h:%i %p') AS posteddate, jm.jobmasterid, jm.code, jm.name, p.projectid, p.projectno, p.name AS 'projectname', p.regionid, region.description AS 'region', p.districtid, district.description AS 'district', ag.wagetypeid, lv1.description AS 'wagetype', p.designation AS designation, p.addressline1 AS proadd1, p.addressline2 AS proadd2, p.addressline3 AS proadd3, p.pincode,jm.vacancystatus FROM jobposting jp INNER JOIN jobpostingdetail jpd ON jpd.jobpostingid = jp.jobpostingid AND jpd.active =1 AND jpd.close = 1 AND CURDATE() >= IFNULL(DATE(jpd.startdate) ,CURDATE()) INNER JOIN project p ON p.projectid = jp.projectid AND p.active =1 INNER JOIN jobmaster jm ON jm.jobmasterid = jpd.jobmasterid AND jm.active=1 INNER JOIN lookupvalue region ON region.lkvalid = p.regionid AND region.active = 1 INNER JOIN lookupvalue district ON district.lkvalid = p.districtid AND district.active = 1 INNER JOIN agreementinfo ai ON ai.projectid = jp.projectid AND ai.active = 1 INNER JOIN agreement ag ON ag.agreementid = ai.agreementid AND ag.active = 1 INNER JOIN lookupvalue lv1 ON lv1.lkvalid = ag.wagetypeid AND lv1.lkdmncode ='WGTYPE' AND lv1.active = 1  WHERE jp.active = 1 GROUP BY jpd.jobpostingid,jpd.jobmasterid ORDER BY p.projectno, jp.jobpostingid, jm.jobmasterid";  
		const rows = await pool.query(query);   
		var rowsReturned = rows.length;      
		var results = [];
		logger.debug(" Date - "+ new Date() + " - Vacancy Get job query after success call");
		if (rowsReturned > 0) { 
			var jobs = [];
			var jobstem = [];
			var total = 0; 
			jobmaster.forEach(function (value) {  
				var job = new jobModel.vacancyjob(0, value.jobmasterid, value.code, value.name, 0,0, 0, "","", "", value.vacancystatus,value.carryforwardstatus);  
				jobs.push(job); 
			}); 
			for (var i = 0; i < rowsReturned; i++) { 
				total += parseInt(rows[i].numberofvacancies);
				jobs.forEach(function (value) { 
					if (rows[i].jobmasterid === value.jobmasterid) { 

						// AES Encryption added
//var encryptedId = cryptoUtil.encryptAes(''+rows[i].jobpostingdetailid);
						value.jobpostingdetailid = rows[i].jobpostingdetailid;
						value.numberofvacancies = rows[i].numberofvacancies; 
						value.filledvacancies = rows[i].filledvacancies;
						value.waitingvacancies = rows[i].waitingvacancies;
						value.comments = rows[i].comments;
						value.posteddate = rows[i].posteddate;
						value.inplace = rows[i].inplace;
					}
				}) 
				if ((i + 1 == rowsReturned) || (rows[i].jobpostingid != rows[i + 1].jobpostingid)) {
					
					var project = new jobModel.projects(rows[i].jobpostingid, rows[i].projectid, rows[i].wagetype, rows[i].projectno, rows[i].projectname, rows[i].districtid, rows[i].district, rows[i].regionid, rows[i].region, jobs, total, rows[i].designation, rows[i].proadd1, rows[i].proadd2, rows[i].proadd3, rows[i].pincode); 
					results.push(project); 
					jobs = [];
					jobmaster.forEach(function (value) {  
						var job = new jobModel.vacancyjob(0, value.jobmasterid, value.code, value.name, 0,0, 0, "","", "", value.vacancystatus,value.carryforwardstatus);  
						jobs.push(job); 
					}); 
					total = 0;
				}
			} 
			return results;
		} else  { 
			logger.debug("Date - " + new Date() + " - Vacancy Get job query after success no data found");
			return results;
		}
	} catch(err) {  
		logger.debug("Date - " + new Date() + " jobDAL.js alljoblist error- " +err);
		throw new Error(err)
	} 
}

module.exports.exportvacancy = function () {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) { 
			_this.getjobmaster(0).then(function (jm) {
				jobmaster = jm;
				var query = multiline.stripIndent(function () {
					/*
						SELECT
							a.projectid,
							a.projectno,
							a.projectname,
							a.organization AS client,
							a.district,
							a.region,
							a.agjobcode AS jobcode,
							a.agjobname,
							a.agreementvacancies,
							b.filledvacancies,
							c.postedvacancies,
							(Ifnull(c.postedvacancies, 0) - Ifnull(b.filledvacancies, 0) ) AS numberofvacancies,
							c.comments,
							b.inplace,
							c.startdate
						FROM
							(SELECT
								ai.projectid,
								ae.clientid,
								ae.optionaltype,
								cl.organization,
								p.projectno,
								p.regionid,
								region.description AS 'region',
								p.districtid,
								district.description AS 'district',
								p.name AS projectname,
								jm.jobmasterid,
								jm.code AS agjobcode,
								jm.name AS agjobname,
								Sum(aed.numberofvacancies) agreementvacancies 
							FROM `agreement` ae 		
							INNER JOIN
								agreementinfo ai 
								ON ai.agreementid = ae.agreementid 
								AND ai.active = 1 
							LEFT JOIN
								agreementdetail aed 
								ON aed.agreementinfoid = ai.agreementinfoid 
								AND aed.active = 1 
							INNER JOIN
								client cl 
								ON cl.clientid = ae.clientid 
								AND cl.active = 1 
							INNER JOIN
								project p 
								ON p.projectid = ai.projectid 
								AND p.active = 1 
							LEFT JOIN lookupvalue region ON
								region.lkvalid = p.regionid
								AND region.active = 1

							LEFT JOIN lookupvalue district ON
								district.lkvalid = p.districtid
								AND district.active = 1
							INNER JOIN
								jobmaster jm 
								ON jm.jobmasterid = aed.jobmasterid 
								AND jm.active = 1 
							WHERE ae.active = 1 
							GROUP BY
								projectid,
								jobmasterid,
								agjobcode 
							ORDER BY
								projectid,
								jm.jobmasterid
							) AS a 		
							LEFT JOIN
							(
								SELECT
									ja.jobactivityid,
									ja.clientid,
									ja.projectid,
									ja.jobstatuscode,
									ja.texcono,
									jm.code AS jobcode,
									jm.name,
									p.projectno,
									jpd.jobmasterid,
									IFNULL(jpd.comments, "") AS comments,
									IFNULL(jpd.inplace, "") AS inplace,            
									Count(ja.jobstatuscode) AS filledvacancies 
								FROM
									`jobactivity` ja 
									INNER JOIN
									jobpostingdetail jpd 
									ON jpd.jobpostingdetailid = ja.jobpostingdetailid 
									AND jpd.active = 1 
									INNER JOIN
									jobposting jp 
									ON jp.jobpostingid = jpd.jobpostingid 
									AND jp.active = 1 
									INNER JOIN
									jobmaster jm 
									ON jm.jobmasterid = jpd.jobmasterid 
									AND jm.active = 1 
									INNER JOIN
									project p 
									ON p.projectid = jp.projectid 
									AND p.active = 1 
								WHERE
									ja.jobstatuscode = 2  AND  date_format(jpd.closedate, '%d-%m-%Y') =(SELECT date_format(MAX(closedate), '%d-%m-%Y')  from jobpostingdetail)
								GROUP BY
									p.projectid,
									jpd.jobmasterid 
								ORDER BY
									p.projectid,
									jm.jobmasterid )
							AS b 
								ON a.projectid = b.projectid 
								AND a.agjobcode = b.jobcode
									
							LEFT JOIN
									(SELECT 
											jp.projectid,
											jpd.jobpostingdetailid, 
											jpd.jobmasterid,
											jm.code AS jobmastercode,
											IFNULL(jpd.comments, "") AS comments,
											jpd.numberofvacancies AS postedvacancies,
											DATE_FORMAT(jpd.startdate, '%Y-%m-%d') AS startdate
									FROM `jobposting` jp
									
									INNER JOIN jobpostingdetail jpd ON
											jpd.jobpostingid = jp.jobpostingid
									AND jpd.active = 1 
													
									INNER JOIN jobmaster jm ON
										jm.jobmasterid = jpd.jobmasterid
									AND jm.active = 1
														
									WHERE jp.active=1
										AND   date_format(jpd.closedate, '%d-%m-%Y') =(SELECT date_format(MAX(closedate), '%d-%m-%Y')  from jobpostingdetail)        
							GROUP BY jpd.jobpostingdetailid
							ORDER BY jp.projectid, jm.jobmasterid) AS c
									ON a.projectid = c.projectid 
						AND a.agjobcode = c.jobmastercode
						ORDER BY a.projectid;
					*/
				});
				con.query(query).then(function (rows, fields) {
					var rowsReturned = rows.length;
					var result = [];
					var jobs = [];  
					jobmaster.forEach(function (value) {
						var job = new jobModel.carryforwardjob(0, value.jobmasterid, value.code, value.name, 0, "","", value.vacancystatus,value.carryforwardstatus);
						jobs.push(job);
					});
					if (rowsReturned > 0) { 
						for (var i = 0; i < rowsReturned; i++) { 

							if (rows[i].comments == null) {
								rows[i].comments = "";
							}
							if (rows[i].startdate == null) {
								rows[i].startdate = "";
							} 
							jobs.forEach(function (value) {
								if (rows[i].jobcode === value.code) {
									value.carryforwardid = 0;
									value.numberofvacancies = rows[i].numberofvacancies;
									value.comments = rows[i].comments;
									value.inplace = rows[i].inplace;
								}
							})
		
							if ((i + 1 == rowsReturned) || (rows[i].projectno != rows[i + 1].projectno)) {
								var exportvacancy = new jobModel.forwardvacancy(rows[i].client, rows[i].projectno, rows[i].projectname, rows[i].region, rows[i].district, jobs, rows[i].startdate,0,rows[i].projectid);
								result.push(exportvacancy); 
								jobs = [];  
								jobmaster.forEach(function (value) {
									var job = new jobModel.carryforwardjob(0, value.jobmasterid, value.code, value.name, 0, "", value.inplace,value.vacancystatus,value.carryforwardstatus);
									jobs.push(job);
								});
							}
						}
					}
					resolve(result)
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
}

module.exports.updatejobpostingdetails = function (numberofvacancies, filledvacancies, waitingvacancies, jobpostingdetailid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			con.query('UPDATE jobpostingdetail SET filledvacancies = ?, waitingvacancies = ? WHERE jobpostingdetailid= ?', [numberofvacancies, filledvacancies, waitingvacancies, jobpostingdetailid]).then(function (rows, fields) {
				resolve({
					"jobpostingdetailid": jobpostingdetailid
				})
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.getjobapplied = function (closedate) {
	console.log("closedate", closedate)
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
					SELECT
						ja.jobactivityid,
						jpd.jobpostingid,
						ja.jobpostingdetailid,
						ja.registrationno,
						ja.memberid,
						ja.ipaddress,
						DATE_FORMAT(ja.effectivedate,'%d-%m-%Y %T') AS effectivedate,
						m.firstname,
						m.lastname,
						trade.description AS trade,
						m.texcono,
						DATE_FORMAT(m.dob,'%d %b %Y') AS dob,
						m.serviceno,
						ja.clientid,
						cl.organization AS client,
						cl.addressline1 As addrees1,
						cl.addressline2 As addrees2,
						cl.addressline3 As addrees3,
						ja.projectid,
						pr.projectno,
						pr.name AS projectname,
						pr.districtid,
						district.description As district,
						pr.regionid,
						region.description AS region,
						ja.currentvacancies,
						jobstatus.description AS jobstatus,
						ja.jobstatuscode,
						ja.texcono AS newtexcono,
						jpd.jobmasterid,
						jm.code,
						jm.name,
						jm.monthlywages,
						jm.workinghours,
						jm.servicecharge,
						jm.servicetax,
						jpd.comments,
						jpd.inplace,
						ja.inplace AS postinginplace ,
						ja.isrejected
						
					FROM jobactivity ja

					INNER JOIN jobpostingdetail jpd ON
						jpd.jobpostingdetailid =  ja.jobpostingdetailid
						AND jpd.active =1

					INNER JOIN client cl ON
						cl.clientid =  ja.clientid
						AND cl.active =1

					INNER JOIN project pr ON
						pr.projectid = ja.projectid
						AND cl.active =1

					INNER JOIN member m ON
						m.memberid = ja.memberid
						AND m.active =1

					INNER JOIN jobmaster jm ON
						jm.jobmasterid =  jpd.jobmasterid
						AND jpd.active =1

					INNER JOIN lookupvalue district ON
						district.lkvalid = pr.districtid
						AND district.active = 1

					INNER JOIN lookupvalue region ON
						region.lkvalid = pr.regionid
						AND region.active = 1
						
					LEFT JOIN lookupvalue trade ON
						trade.lkvalid = m.tradeid
						AND trade.active = 1

					INNER JOIN lookupvalue jobstatus ON
						jobstatus.code = ja.jobstatuscode
						AND jobstatus.lkdmncode = 'JOBST' AND jobstatus.code != 4 AND ja.jobstatuscode != 5
						AND jobstatus.active = 1

					WHERE ja.active = 1 
                */
			});
			// console.log('confirm list function call');
			if (closedate == "") {
				query += " AND jpd.close = 1 ORDER BY ja.registrationno;";
				con.query(query).then(function (rows, fields) {
					var rowsReturned = rows.length;
					var result = [];
					var jobs = []
					if (rowsReturned > 0) {
						for (var i = 0; i < rowsReturned; i++) {

							var str = rows[i].comments;
							//  console.log("str==============",str);
							var jobposting = new jobModel.jobapplied(rows[i].jobactivityid, rows[i].jobpostingid, rows[i].jobpostingdetailid, rows[i].memberid, rows[i].firstname, rows[i].lastname, rows[i].texcono, rows[i].dob, rows[i].serviceno, rows[i].clientid, rows[i].client, rows[i].addrees1, rows[i].addrees2, rows[i].addrees3, rows[i].projectid, rows[i].projectno, rows[i].projectname, rows[i].districtid, rows[i].regionid, rows[i].projectno, rows[i].districtid, rows[i].district, rows[i].regionid, rows[i].region, rows[i].currentvacancies, rows[i].jobstatuscode, rows[i].jobstatus, rows[i].newtexcono, rows[i].jobmasterid, rows[i].code, rows[i].name, rows[i].monthlywages, rows[i].workinghours, rows[i].servicecharge, rows[i].servicetax, rows[i].effectivedate, rows[i].trade, rows[i].registrationno, rows[i].inplace, rows[i].comments, rows[i].postinginplace, rows[i].isrejected);
							result.push(jobposting);
						}
					}
					resolve(result);
				}).catch(function (err) {
					reject(err);
				});
			} else {
				query += " AND  DATE_FORMAT(jpd.closedate,'%Y-%m-%d') = ?  ORDER BY ja.registrationno;";
				con.query(query, [closedate]).then(function (rows, fields) {
					var rowsReturned = rows.length;
					var result = [];
					var jobs = []
					if (rowsReturned > 0) {
						for (var i = 0; i < rowsReturned; i++) {
							var jobposting = new jobModel.jobapplied(rows[i].jobactivityid, rows[i].jobpostingid, rows[i].jobpostingdetailid, rows[i].memberid, rows[i].firstname, rows[i].lastname, rows[i].texcono, rows[i].dob, rows[i].serviceno, rows[i].clientid, rows[i].client, rows[i].addrees1, rows[i].addrees2, rows[i].addrees3, rows[i].projectid, rows[i].projectno, rows[i].projectname, rows[i].districtid, rows[i].regionid, rows[i].projectno, rows[i].districtid, rows[i].district, rows[i].regionid, rows[i].region, rows[i].currentvacancies, rows[i].jobstatuscode, rows[i].jobstatus, rows[i].newtexcono, rows[i].jobmasterid, rows[i].code, rows[i].name, rows[i].monthlywages, rows[i].workinghours, rows[i].servicecharge, rows[i].servicetax, rows[i].effectivedate, rows[i].trade, rows[i].registrationno, rows[i].inplace, rows[i].comments, rows[i].postinginplace, rows[i].isrejected);
							result.push(jobposting);
						}
					}
					resolve(result);
				}).catch(function (err) {
					reject(err);
				});
			}
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.getjobappliedformember = function (memberId) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
SELECT

    ja.jobactivityid,
    jpd.jobpostingid,
    ja.jobpostingdetailid,
    ja.memberid,
    DATE_FORMAT(ja.effectivedate,'%d %b %Y') AS effectivedate,
    m.firstname,
    m.lastname,
    m.texcono,
    DATE_FORMAT(m.dob,'%d %b %Y') AS dob,
    m.serviceno,
    ja.clientid,
    cl.organization AS client,
    cl.addressline1 As addrees1,
    cl.addressline2 As addrees2,
    cl.addressline3 As addrees3,
    ja.projectid,
    pr.projectno,
    pr.name AS projectname,
    pr.districtid,
    district.description As district,
    pr.regionid,
    region.description AS region,
    ja.currentvacancies,
    jobstatus.description AS jobstatus,
    ja.jobstatuscode,
    ja.texcono AS newtexcono,
    jpd.jobmasterid,
    jm.code,
    jm.name,
    jm.monthlywages,
    jm.workinghours,
    jm.servicecharge,
    jm.servicetax

FROM jobactivity ja

INNER JOIN jobpostingdetail jpd ON
    jpd.jobpostingdetailid =  ja.jobpostingdetailid
    AND jpd.active =1

INNER JOIN client cl ON
    cl.clientid =  ja.clientid
    AND cl.active =1

INNER JOIN project pr ON
    pr.projectid = ja.projectid
    AND cl.active =1

INNER JOIN member m ON
    m.memberid = ja.memberid
    AND m.active =1

INNER JOIN jobmaster jm ON
    jm.jobmasterid =  jpd.jobmasterid
    AND jpd.active =1

INNER JOIN lookupvalue district ON
    district.lkvalid = pr.districtid
    AND district.active = 1

INNER JOIN lookupvalue region ON
    region.lkvalid = pr.regionid
    AND region.active = 1

INNER JOIN lookupvalue jobstatus ON
    jobstatus.code = ja.jobstatuscode
    AND jobstatus.lkdmncode = 'JOBST'
    AND jobstatus.active = 1

WHERE ja.active = 1 AND  ja.memberid = ? ORDER BY ja.jobactivityid DESC;

                                 */
			});

			con.query(query, [memberId]).then(function (rows, fields) {
				var rowsReturned = rows.length;
				var result = [];
				var jobs = []
				if (rowsReturned > 0) {
					for (var i = 0; i < rowsReturned; i++) {
						var jobposting = new jobModel.jobapplied(rows[i].jobactivityid, rows[i].jobpostingid, rows[i].jobpostingdetailid, rows[i].memberid, rows[i].firstname, rows[i].lastname, rows[i].texcono, rows[i].dob, rows[i].serviceno, rows[i].clientid, rows[i].client, rows[i].addrees1, rows[i].addrees2, rows[i].addrees3, rows[i].projectid, rows[i].projectno, rows[i].projectname, rows[i].districtid, rows[i].regionid, rows[i].projectno, rows[i].districtid, rows[i].district, rows[i].regionid, rows[i].region, rows[i].currentvacancies, rows[i].jobstatuscode, rows[i].jobstatus, rows[i].newtexcono, rows[i].jobmasterid, rows[i].code, rows[i].name, rows[i].monthlywages, rows[i].workinghours, rows[i].servicecharge, rows[i].servicetax, rows[i].effectivedate);
						result.push(jobposting);
					}
				}
				resolve(result);
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.getjobappliedforclient = function (clientid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
SELECT

    ja.jobactivityid,
    jpd.jobpostingid,
    ja.jobpostingdetailid,
    ja.memberid,
    DATE_FORMAT(ja.effectivedate,'%d %b %Y') AS effectivedate,
    m.firstname,
    m.lastname,
    m.texcono,
    DATE_FORMAT(m.dob,'%d %b %Y') AS dob,
    m.serviceno,
    ja.clientid,
    cl.organization AS client,
    cl.addressline1 As addrees1,
    cl.addressline2 As addrees2,
    cl.addressline3 As addrees3,
    ja.projectid,
    pr.projectno,
    pr.name AS projectname,
    pr.districtid,
    district.description As district,
    pr.regionid,
    region.description AS region,
    ja.currentvacancies,
    jobstatus.description AS jobstatus,
    ja.jobstatuscode,
    ja.texcono AS newtexcono,
    jpd.jobmasterid,
    jm.code,
    jm.name,
    jm.monthlywages,
    jm.workinghours,
    jm.servicecharge,
    jm.servicetax

FROM jobactivity ja

INNER JOIN jobpostingdetail jpd ON
    jpd.jobpostingdetailid =  ja.jobpostingdetailid
    AND jpd.active =1

INNER JOIN client cl ON
    cl.clientid =  ja.clientid
    AND cl.active =1

INNER JOIN project pr ON
    pr.projectid = ja.projectid
    AND cl.active =1

INNER JOIN member m ON
    m.memberid = ja.memberid
    AND m.active =1

INNER JOIN jobmaster jm ON
    jm.jobmasterid =  jpd.jobmasterid
    AND jpd.active =1

INNER JOIN lookupvalue district ON
    district.lkvalid = pr.districtid
    AND district.active = 1

INNER JOIN lookupvalue region ON
    region.lkvalid = pr.regionid
    AND region.active = 1

INNER JOIN lookupvalue jobstatus ON
    jobstatus.code = ja.jobstatuscode
    AND jobstatus.lkdmncode = 'JOBST'
    AND jobstatus.active = 1

WHERE ja.active = 1 AND  ja.clientid = ?;

                                 */
			});

			con.query(query, [clientid]).then(function (rows, fields) {
				var rowsReturned = rows.length;
				var result = [];
				var jobs = []
				if (rowsReturned > 0) {
					for (var i = 0; i < rowsReturned; i++) {
						var jobposting = new jobModel.jobapplied(rows[i].jobactivityid, rows[i].jobpostingid, rows[i].jobpostingdetailid, rows[i].memberid, rows[i].firstname, rows[i].lastname, rows[i].texcono, rows[i].dob, rows[i].serviceno,
							rows[i].clientid, rows[i].client, rows[i].addrees1, rows[i].addrees2, rows[i].addrees3, rows[i].projectid, rows[i].projectno, rows[i].projectname, rows[i].districtid, rows[i].regionid, rows[i].projectno, rows[i].districtid, rows[i].district, rows[i].regionid, rows[i].region, rows[i].currentvacancies, rows[i].jobstatuscode, rows[i].jobstatus, rows[i].newtexcono, rows[i].jobmasterid, rows[i].code, rows[i].name, rows[i].monthlywages, rows[i].workinghours, rows[i].servicecharge, rows[i].servicetax, rows[i].effectivedate);
						result.push(jobposting);
					}
				}
				resolve(result);
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.closejobpostingdetail = function (closedate) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var queries = '';
			queries += con.format('UPDATE jobpostingdate SET closedate= NOW(), activedate = NOW(), registrationno = 1 WHERE id=1;')
			queries += con.format('UPDATE jobpostingdetail SET close= 0, closedate = ? WHERE close= 1;', [closedate]);
			queries += con.format('UPDATE vacancypublish SET vacancycustomerview= 0 WHERE id= 1;');
			queries += con.format('TRUNCATE TABLE regno;');
			// console.log('queries',queries);
			con.query(queries).then(function (rows, fields) {
				resolve("success")
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.getpostedlist = function (closedate) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
SELECT

    ja.jobactivityid,
    jpd.jobpostingid,
    ja.jobpostingdetailid,
    ja.memberid,
    m.firstname,
    m.lastname,
    ja.registrationno,
    m.texcono,
    m.serviceno,
    m.rankid,
    rnk.description AS 'rank',
    m.mobile,
    ja.clientid,
    ja.projectid,
    pr.projectno,
    pr.name AS projectname,
    pr.districtid,
    district.description As district,
    pr.regionid,
    region.description AS region,
    ja.texcono AS newtexcono,
    jpd.jobmasterid,
    DATE_FORMAT( jpd.posteddate,'%d-%m-%Y') AS posteddate,
    jm.code AS category


FROM jobactivity ja

INNER JOIN jobpostingdetail jpd ON
    jpd.jobpostingdetailid =  ja.jobpostingdetailid
    AND jpd.active =1
    
INNER JOIN client cl ON
    cl.clientid =  ja.clientid
    AND cl.active =1

INNER JOIN project pr ON
    pr.projectid = ja.projectid
    AND cl.active =1

INNER JOIN member m ON
    m.memberid = ja.memberid
    AND m.active =1

INNER JOIN jobmaster jm ON
    jm.jobmasterid =  jpd.jobmasterid
    AND jpd.active =1

LEFT JOIN lookupvalue district ON
    district.lkvalid = pr.districtid
    AND district.active = 1

LEFT JOIN lookupvalue region ON
    region.lkvalid = pr.regionid
    AND region.active = 1
                 
INNER JOIN lookupvalue rnk ON
    rnk.lkvalid = m.rankid
    AND rnk.active = 1

WHERE ja.active = 1 AND  ja.jobstatuscode = 2 AND DATE_FORMAT(jpd.closedate,'%Y-%m-%d') = ?
                                 ORDER BY ja.registrationno;

                                 */
			});

			con.query(query, [closedate]).then(function (rows, fields) {
				var rowsReturned = rows.length;
				var result = [];
				if (rowsReturned > 0) {
					for (var i = 0; i < rowsReturned; i++) {
						var jobposting = new jobModel.postedlist(rows[i].jobactivityid, rows[i].jobpostingid, rows[i].jobpostingdetailid, rows[i].memberid, rows[i].firstname, rows[i].lastname, rows[i].registrationno, rows[i].texcono, rows[i].serviceno,
							rows[i].rank, rows[i].mobile, rows[i].clientid, rows[i].projectid, rows[i].projectno, rows[i].projectname, rows[i].districtid, rows[i].district, rows[i].regionid, rows[i].region, rows[i].newtexcono, rows[i].jobmasterid, rows[i].posteddate, rows[i].category);
						result.push(jobposting);
					}
				}
				resolve(result);
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.updatejobactivitystatus = function (jobactivityid, texcono, ondate) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			if (texcono != undefined) {
				con.query("UPDATE jobactivity SET jobstatuscode = ?, currentvacancies = ?, texcono = ?, effectivedate = ? WHERE jobactivityid = ?", [2, "", texcono, ondate, jobactivityid]).then(function (rows, fields) {
					var query1 = {
						jobactivityid: jobactivityid,
						ondate: ondate,
						jobstatuscode: 2,
						comments: "confirmed"
					};
					con.query("INSERT INTO jobactivityhistory SET ?", query1).then(function (rows, fields) {
						con.query("UPDATE member AS m, jobactivity AS ja SET m.texcono = ? WHERE ja.memberid = m.memberid AND ja.jobactivityid = ?", [texcono, jobactivityid]).then(function (rows, fields) {
							con.query("UPDATE member AS m, jobactivity AS ja SET m.doj = ? WHERE ja.memberid = m.memberid AND (m.doj is null)  AND ja.jobactivityid = ?", [ondate, jobactivityid]).then(function (rows, fields) {
								resolve("success");
							});
						});
					});
				});
			} else {
				con.query("UPDATE jobactivity SET jobstatuscode = ?, currentvacancies = ?, effectivedate = ? WHERE jobactivityid = ?", [2, "", ondate, jobactivityid]).then(function (rows, fields) {
					var query1 = {
						jobactivityid: jobactivityid,
						ondate: ondate,
						jobstatuscode: 2,
						comments: "confirmed"
					};
					con.query("INSERT INTO jobactivityhistory SET ?", query1).then(function (rows, fields) {
						resolve("success");
					});
				});
			}
		}).catch(function (err) {
			reject(err);
		});
	}).catch(function (err) {
		reject(err);
	});
}

module.exports.getjobapplyprint = function (jobactivityid, memberid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
					SELECT
					
						ja.memberid,
						m.texcono,
						ja.texcono AS newtexcono,
						ja.registrationno,
						m.serviceno,
						m.firstname,
						m.lastname,
						m.fathername,
						DATE_FORMAT(m.dob,'%d %b %Y') AS dob,
						DATE_FORMAT(m.doj,'%d %b %Y') AS joiningdate,
						DATE_FORMAT(m.lastaccess,'%d %b %Y') AS lastaccess,
						DATE_FORMAT(ja.effectivedate,'%d %b %Y') AS effectivedate,	
						m.email,
						m.mobile,
						m.communicationaddress,
						m.address,
						m.village,
						m.talukid,
						lv9.description AS 'taluk',
						m.countryid,
						m.stateid,
						m.districtid as memberdistrictid,
						d.description As memberdistrict,
						state.description AS 'state',
						country.description AS 'country',
						m.pincode,
						m.aadhaarno,
						m.panno,
						m.esmidno,
						m.civilqual,
						m.armyqual,
						lv6.description AS 'corps',
						m.tradeid,
						lv7.description AS 'trade',
						m.rankid,
						rnk.description AS 'rank',
						m.nominee,
						m.nomineerelationid,
						nrelation.description AS 'nomineerelation',
						ja.jobactivityid,
						jpd.jobpostingid,
						ja.jobpostingdetailid,
						ja.clientid,
						cl.organization AS client,
						ja.projectid,
						pr.projectno,
						pr.name AS projectname,
						pr.designation AS designation,
						pr.addressline1 AS proadd1,
						pr.addressline2 AS proadd2,
						pr.addressline3 AS proadd3,
						pr.districtid AS prodistrictid,
						district.description As prodistrict,
						pr.regionid AS proregionid,
						region.description AS proregion,
						pr.pincode AS propincode,        
						ja.currentvacancies,
						jobstatus.description AS jobstatus,
						ja.jobstatuscode,
						jpd.jobmasterid,
						jm.code AS category,
						jm.name AS jobname,
						IFNULL(ja.inplace, '') AS inplace,
						IFNULL(ja.othercat, '') AS othercat,
						isrejected

					FROM jobactivity ja

					INNER JOIN jobpostingdetail jpd ON
						jpd.jobpostingdetailid =  ja.jobpostingdetailid
						AND jpd.active = 1 AND DATE(jpd.posteddate) >= (select DATE(importdate) from jobpostingdate group by importdate)

					INNER JOIN client cl ON
						cl.clientid =  ja.clientid
						AND cl.active =1

					INNER JOIN project pr ON
						pr.projectid = ja.projectid
						AND cl.active =1

					INNER JOIN member m ON
						m.memberid = ja.memberid
						AND m.active =1

					INNER JOIN jobmaster jm ON
						jm.jobmasterid =  jpd.jobmasterid
						AND jpd.active =1

					LEFT JOIN lookupvalue district  ON
						district.lkvalid = pr.districtid
						AND district.active = 1
									
					LEFT JOIN lookupvalue d ON
						d.lkvalid = m.districtid
						AND m.active = 1                 

					LEFT JOIN lookupvalue region ON
						region.lkvalid = pr.regionid
						AND region.active = 1

					LEFT JOIN lookupvalue lv6 ON
						lv6.lkvalid = m.corpsid
						AND lv6.active = 1

					LEFT JOIN lookupvalue lv7 ON
						lv7.lkvalid = m.tradeid
						AND lv7.active = 1

					LEFT JOIN lookupvalue state ON
						state.lkvalid = m.stateid
						AND state.active = 1

					LEFT JOIN lookupvalue country ON
						country.lkvalid = m.countryid
						AND country.active = 1

					INNER JOIN lookupvalue jobstatus ON
						jobstatus.code = ja.jobstatuscode
						AND jobstatus.lkdmncode = 'JOBST'
						AND jobstatus.active = 1

					LEFT JOIN lookupvalue nrelation ON
						nrelation.lkvalid = m.nomineerelationid
						AND nrelation.active = 1

					INNER JOIN lookupvalue rnk ON
						rnk.lkvalid = m.rankid
						AND rnk.active = 1

					LEFT JOIN lookupvalue lv9 ON
						lv9.lkvalid = m.talukid
						AND lv9.active = 1

					WHERE ja.active = 1 AND  
							CASE
								WHEN ((? != 'undefined')) THEN ja.memberid =?
								ELSE (ja.jobactivityid=?)
					END;       
				*/
			});

			con.query(query, [memberid, memberid, jobactivityid]).then(function (rows, fields) {
				console.log('rows', rows);
				var rowsReturned = rows.length;
				var jobposting = {};
				var history = [];
				var experience = "";
				var applied = [];
				var sno = "";
				if (rowsReturned > 0) {

					for (var i = 0; i < rowsReturned; i++) {
						sno = i + 1;
						var job = new jobModel.applied(sno, rows[i].clientid, rows[i].client, rows[i].projectid, rows[i].projectno, rows[i].projectname, rows[i].designation, rows[i].proadd1, rows[i].proadd2, rows[i].proadd3, rows[i].propincode, rows[i].proregionid, rows[i].proregion, rows[i].prodistrictid, rows[i].prodistrict, rows[i].propincode, rows[i].category, rows[i].jobmasterid, rows[i].jobname, rows[i].jobstatus, rows[i].currentvacancies);
						applied.push(job);
					}

					jobposting = new jobModel.jobprint(rows[0].memberid, rows[0].texcono, rows[0].newtexcono, rows[0].registrationno, rows[0].serviceno, rows[0].firstname, rows[0].lastname, rows[0].fathername, rows[0].dob, rows[0].joiningdate, rows[0].lastaccess, rows[0].effectivedate, rows[0].email, rows[0].mobile, rows[0].communicationaddress, rows[0].address, rows[0].village, rows[0].talukid, rows[0].stateid, rows[0].memberdistrictid, rows[0].countryid, rows[0].taluk, rows[0].memberdistrict, rows[0].state, rows[0].country, rows[0].pincode, rows[0].aadhaarno, rows[0].civilqual, rows[0].armyqual, rows[0].tradeid, rows[0].trade, rows[0].rankid, rows[0].rank, rows[0].corps, rows[0].esmidno, rows[0].nominee, rows[0].nomineerelationid, rows[0].nomineerelation, rows[0].experience, '', '', applied, rows[0].inplace, rows[0].othercat, rows[0].panno, rows[0].isrejected);
					resolve(jobposting);
				}
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.getjobpostingprint = function (jobactivityid, memberid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
					SELECT
						ja.memberid,
						m.texcono,
						ja.texcono AS newtexcono,
						ja.registrationno,
						m.serviceno,
						m.firstname,
						m.lastname,
						m.fathername,
						DATE_FORMAT(m.dob,'%d %b %Y') AS dob,
						DATE_FORMAT(m.doj,'%d %b %Y') AS joiningdate,
						DATE_FORMAT(m.lastaccess,'%d %b %Y') AS lastaccess,
						DATE_FORMAT(ja.effectivedate,'%d-%m-%Y') AS effectivedate,	
						m.email,
						m.mobile,
						m.communicationaddress,
						m.address,
						m.village,
						m.talukid,
						lv9.description AS 'taluk',
						m.countryid,
						m.stateid,
						m.districtid as memberdistrictid,
						d.description As memberdistrict,
						state.description AS 'state',
						country.description AS 'country',
						m.pincode,
						m.aadhaarno,
						m.esmidno,
						m.civilqual,
						m.armyqual,
						lv6.description AS 'corps',
						m.tradeid,
						lv7.description AS 'trade',
						m.rankid,
						rnk.description AS 'rank',
						m.nominee,
						m.nomineerelationid,
						nrelation.description AS 'nomineerelation',
						ja.jobactivityid,
						jpd.jobpostingid,
						ja.jobpostingdetailid,
						ja.clientid,
						cl.organization AS client,
						ja.projectid,
						pr.projectno,
						pr.name AS projectname,
						pr.designation AS designation,
						pr.addressline1 AS proadd1,
						pr.addressline2 AS proadd2,
						pr.addressline3 AS proadd3,
						pr.districtid AS prodistrictid,
						district.description As prodistrict,
						pr.regionid AS proregionid,
						region.description AS proregion,
						pr.pincode AS propincode,        
						ja.currentvacancies,
						jobstatus.description AS jobstatus,
						ja.jobstatuscode,
						jpd.jobmasterid,
						jm.code AS category,
						jm.name AS jobname,
						IFNULL(ja.inplace, '') AS inplace,
						IFNULL(ja.othercat, '') AS othercat
					FROM jobactivity ja

					INNER JOIN jobpostingdetail jpd ON
						jpd.jobpostingdetailid =  ja.jobpostingdetailid
						AND jpd.active =1

					INNER JOIN client cl ON
						cl.clientid =  ja.clientid
						AND cl.active =1

					INNER JOIN project pr ON
						pr.projectid = ja.projectid
						AND cl.active =1

					INNER JOIN member m ON
						m.memberid = ja.memberid
						AND m.active =1

					INNER JOIN jobmaster jm ON
						jm.jobmasterid =  jpd.jobmasterid
						AND jpd.active =1

					LEFT JOIN lookupvalue district  ON
						district.lkvalid = pr.districtid
						AND district.active = 1
									
					LEFT JOIN lookupvalue d ON
						d.lkvalid = m.districtid
						AND m.active = 1                 

					LEFT JOIN lookupvalue region ON
						region.lkvalid = pr.regionid
						AND region.active = 1

					LEFT JOIN lookupvalue lv6 ON
						lv6.lkvalid = m.corpsid
						AND lv6.active = 1

					LEFT JOIN lookupvalue lv7 ON
						lv7.lkvalid = m.tradeid
						AND lv7.active = 1

					LEFT JOIN lookupvalue state ON
						state.lkvalid = m.stateid
						AND state.active = 1

					LEFT JOIN lookupvalue country ON
						country.lkvalid = m.countryid
						AND country.active = 1

					INNER JOIN lookupvalue jobstatus ON
						jobstatus.code = ja.jobstatuscode
						AND jobstatus.lkdmncode = 'JOBST'
						AND jobstatus.active = 1

					LEFT JOIN lookupvalue nrelation ON
						nrelation.lkvalid = m.nomineerelationid
						AND nrelation.active = 1

					INNER JOIN lookupvalue rnk ON
						rnk.lkvalid = m.rankid
						AND rnk.active = 1

					LEFT JOIN lookupvalue lv9 ON
						lv9.lkvalid = m.talukid
						AND lv9.active = 1

					WHERE ja.active = 1 AND  
					CASE
						WHEN ((? != 'undefined')) THEN ja.memberid =?
						ELSE (ja.jobactivityid=?)
					END; 
                */
			});

			con.query(query, [memberid, memberid, jobactivityid]).then(function (rows, fields) {
				var rowsReturned = rows.length;
				var jobposting = {};
				var history = [];
				var experience = "";
				var applied = [];
				var sno = "";
				if (rowsReturned > 0) {

					for (var i = 0; i < rowsReturned; i++) {
						sno = i + 1;
						var job = new jobModel.applied(sno, rows[i].clientid, rows[i].client, rows[i].projectid, rows[i].projectno, rows[i].projectname, rows[i].designation, rows[i].proadd1, rows[i].proadd2, rows[i].proadd3, rows[i].propincode, rows[i].proregionid, rows[i].proregion, rows[i].prodistrictid, rows[i].prodistrict, rows[i].propincode, rows[i].category, rows[i].jobmasterid, rows[i].jobname, rows[i].jobstatus, rows[i].currentvacancies);
						applied.push(job);
					}

					jobposting = new jobModel.jobprint(rows[0].memberid, rows[0].texcono, rows[0].newtexcono, rows[0].registrationno, rows[0].serviceno, rows[0].firstname, rows[0].lastname, rows[0].fathername, rows[0].dob, rows[0].joiningdate, rows[0].lastaccess, rows[0].effectivedate, rows[0].email, rows[0].mobile, rows[0].communicationaddress, rows[0].address, rows[0].village, rows[0].talukid, rows[0].stateid, rows[0].memberdistrictid, rows[0].countryid, rows[0].taluk, rows[0].memberdistrict, rows[0].state, rows[0].country, rows[0].pincode, rows[0].aadhaarno, rows[0].civilqual, rows[0].armyqual, rows[0].tradeid, rows[0].trade, rows[0].rankid, rows[0].rank, rows[0].corps, rows[0].esmidno, rows[0].nominee, rows[0].nomineerelationid, rows[0].nomineerelation, rows[0].experience, '', '', applied, rows[0].inplace, rows[0].othercat);
					resolve(jobposting);
				}
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.getjobpostingprintpost = function (memberhistoryid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
					SELECT
						ja.memberid,
						m.texcono,
						ja.texcono AS newtexcono,
						ja.registrationno,
						m.serviceno,
						m.firstname,
						m.lastname,
						m.fathername,
						DATE_FORMAT(m.dob,'%d %b %Y') AS dob,
						DATE_FORMAT(m.doj,'%d %b %Y') AS joiningdate,
						DATE_FORMAT(m.lastaccess,'%d %b %Y') AS lastaccess,
						DATE_FORMAT(ja.effectivedate,'%d-%m-%Y') AS effectivedate,	
						m.email,
						m.mobile,
						m.communicationaddress,
						m.address,
						m.village,
						m.talukid,
						lv9.description AS 'taluk',
						m.countryid,
						m.stateid,
						m.districtid as memberdistrictid,
						d.description As memberdistrict,
						state.description AS 'state',
						country.description AS 'country',
						m.pincode,
						m.aadhaarno,
						m.esmidno,
						m.civilqual,
						m.armyqual,
						lv6.description AS 'corps',
						m.tradeid,
						lv7.description AS 'trade',
						m.rankid,
						rnk.description AS 'rank',
						m.nominee,
						m.nomineerelationid,
						nrelation.description AS 'nomineerelation',
						ja.jobactivityid,
						jpd.jobpostingid,
						ja.jobpostingdetailid,
						ja.clientid,
						cl.organization AS client,
						ja.projectid,
						pr.projectno,
						pr.name AS projectname,
						pr.designation AS designation,
						pr.addressline1 AS proadd1,
						pr.addressline2 AS proadd2,
						pr.addressline3 AS proadd3,
						pr.districtid AS prodistrictid,
						district.description As prodistrict,
						pr.regionid AS proregionid,
						region.description AS proregion,
						pr.pincode AS propincode,        
						ja.currentvacancies,
						jobstatus.description AS jobstatus,
						ja.jobstatuscode,
						jpd.jobmasterid,
						jm.code AS category,
						jm.name AS jobname,
						IFNULL(ja.inplace, '') AS inplace,
						IFNULL(ja.othercat, '') AS othercat
					FROM jobactivity ja

					INNER JOIN jobpostingdetail jpd ON
						jpd.jobpostingdetailid =  ja.jobpostingdetailid
						AND jpd.active =1

					INNER JOIN client cl ON
						cl.clientid =  ja.clientid
						AND cl.active =1

					INNER JOIN project pr ON
						pr.projectid = ja.projectid
						AND cl.active =1

					INNER JOIN member m ON
						m.memberid = ja.memberid
						AND m.active =1

					INNER JOIN jobmaster jm ON
						jm.jobmasterid =  jpd.jobmasterid
						AND jpd.active =1

					LEFT JOIN lookupvalue district  ON
						district.lkvalid = pr.districtid
						AND district.active = 1
									
					LEFT JOIN lookupvalue d ON
						d.lkvalid = m.districtid
						AND m.active = 1                 

					LEFT JOIN lookupvalue region ON
						region.lkvalid = pr.regionid
						AND region.active = 1

					LEFT JOIN lookupvalue lv6 ON
						lv6.lkvalid = m.corpsid
						AND lv6.active = 1

					LEFT JOIN lookupvalue lv7 ON
						lv7.lkvalid = m.tradeid
						AND lv7.active = 1

					LEFT JOIN lookupvalue state ON
						state.lkvalid = m.stateid
						AND state.active = 1

					LEFT JOIN lookupvalue country ON
						country.lkvalid = m.countryid
						AND country.active = 1

					INNER JOIN lookupvalue jobstatus ON
						jobstatus.code = ja.jobstatuscode
						AND jobstatus.lkdmncode = 'JOBST'
						AND jobstatus.active = 1

					LEFT JOIN lookupvalue nrelation ON
						nrelation.lkvalid = m.nomineerelationid
						AND nrelation.active = 1

					INNER JOIN lookupvalue rnk ON
						rnk.lkvalid = m.rankid
						AND rnk.active = 1

					LEFT JOIN lookupvalue lv9 ON
						lv9.lkvalid = m.talukid
						AND lv9.active = 1

					WHERE ja.active = 1 AND  
					CASE
						WHEN ((? != 'undefined')) THEN ja.memberid =?
						ELSE (ja.jobactivityid=?)
					END; 
                */
			});

			con.query(query, [memberid, memberid, jobactivityid]).then(function (rows, fields) {
				var rowsReturned = rows.length;
				var jobposting = {};
				var history = [];
				var experience = "";
				var applied = [];
				var sno = "";
				if (rowsReturned > 0) {

					for (var i = 0; i < rowsReturned; i++) {
						sno = i + 1;
						var job = new jobModel.applied(sno, rows[i].clientid, rows[i].client, rows[i].projectid, rows[i].projectno, rows[i].projectname, rows[i].designation, rows[i].proadd1, rows[i].proadd2, rows[i].proadd3, rows[i].propincode, rows[i].proregionid, rows[i].proregion, rows[i].prodistrictid, rows[i].prodistrict, rows[i].propincode, rows[i].category, rows[i].jobmasterid, rows[i].jobname, rows[i].jobstatus, rows[i].currentvacancies);
						applied.push(job);
					}

					jobposting = new jobModel.jobprint(rows[0].memberid, rows[0].texcono, rows[0].newtexcono, rows[0].registrationno, rows[0].serviceno, rows[0].firstname, rows[0].lastname, rows[0].fathername, rows[0].dob, rows[0].joiningdate, rows[0].lastaccess, rows[0].effectivedate, rows[0].email, rows[0].mobile, rows[0].communicationaddress, rows[0].address, rows[0].village, rows[0].talukid, rows[0].stateid, rows[0].memberdistrictid, rows[0].countryid, rows[0].taluk, rows[0].memberdistrict, rows[0].state, rows[0].country, rows[0].pincode, rows[0].aadhaarno, rows[0].civilqual, rows[0].armyqual, rows[0].tradeid, rows[0].trade, rows[0].rankid, rows[0].rank, rows[0].corps, rows[0].esmidno, rows[0].nominee, rows[0].nomineerelationid, rows[0].nomineerelation, rows[0].experience, '', '', applied, rows[0].inplace, rows[0].othercat);
					resolve(jobposting);
				}
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}


module.exports.updateimportdate = function (jobmasterid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var d = new Date();
			var idate = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " 00:00:00";
			con.query('UPDATE jobpostingdate SET importdate = ?, activedate = ? WHERE id=1;UPDATE jobmaster SET vacancystatus = 1,carryforwardstatus = 0 WHERE jobmasterid IN (?);', [idate, null,jobmasterid]).then(function (rows, fields) {
				resolve('success')
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.getjobpostingdate = function () {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			con.query('SELECT closedate FROM jobpostingdate ORDER by closedate DESC').then(function (rows, fields) {
				var rowsReturned = rows.length;
				if (rowsReturned > 0) {
					resolve({
						"closedate": rows[0].closedate
					})
				}
				resolve(result);
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.TotalInvoiceAmountss = function () {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*

				    SELECT SUM(totalamount) AS totalamount FROM invoice WHERE active= 1;
				    SELECT SUM(totalamount) AS pendingamount FROM invoice WHERE active= 1 AND invoicestatus IN (1,2);
				*/
			});

			con.query(query).then(function (rows, fields) {
				console.log('rows', rows);
				resolve({
					"totalamount": rows[0][0].totalamount,
					"pendingamount": rows[1][0].pendingamount
				})
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.getClientCount = function () {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
				    SELECT COUNT(*) as numberofclients FROM client cl INNER JOIN lookupvalue lv ON lv.lkvalid = cl.approvalid AND lv.code != 'REJECT' AND lv.active = 1 where cl.active = 1;

				    SELECT COUNT(*) as numberofprojects
				    FROM project p
				    INNER JOIN client c ON
				        c.clientid=p.clientid AND c.active=1
				    WHERE p.active= 1;

				    SELECT COUNT(*) as activeprojects FROM project p INNER JOIN client c ON
				        c.clientid=p.clientid AND c.active=1
				    WHERE p.active= 1 and p.statusid=321;
				
				*/
			});

			con.query(query).then(function (rows, fields) {
				console.log('rows', rows);
				resolve({
					"numberofclients": rows[0][0].numberofclients,
					"numberofprojects": rows[1][0].numberofprojects,
					"totalactiveprojects": rows[2][0].activeprojects
				})
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.getrecruitment = function () {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
SELECT

    jpd.jobpostingid,
    jpd.jobmasterid,
    DATE_FORMAT( jpd.posteddate,'%Y-%m-%d') AS posteddate,
    sum(jpd.numberofvacancies) AS numberofvacancies,
    sum(jpd.filledvacancies) AS filledvacancies,
    sum(jpd.waitingvacancies) AS waitingvacancies,
    jpd.close,
    DATE_FORMAT(jpd.closedate,'%Y-%m-%d') AS closedate

FROM jobpostingdetail jpd

where jpd.active = 1 GROUP by jpd.closedate ORDER BY jpd.closedate DESC LIMIT 4;
                 */
			});

			con.query(query).then(function (rows, fields) {
				var rowsReturned = rows.length;
				var result = [];
				if (rowsReturned > 0) {
					for (var i = 0; i < rowsReturned; i++) {
						var jobdetails = new jobModel.vacancydetails(rows[i].jobpostingid, rows[i].jobmasterid,
							rows[i].posteddate, rows[i].numberofvacancies, rows[i].filledvacancies, rows[i].waitingvacancies, rows[i].close, rows[i].closedate);
						result.push(jobdetails);
					}
				}
				resolve(result);
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.getclientrecruitment = function () {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
SELECT

    jpd.jobpostingid,
    jpd.jobmasterid,
    DATE_FORMAT( jpd.posteddate,'%Y-%m-%d') AS posteddate,
    sum(jpd.numberofvacancies) AS numberofvacancies,
    sum(jpd.filledvacancies) AS filledvacancies,
    sum(jpd.waitingvacancies) AS waitingvacancies,
    jpd.close,
    DATE_FORMAT(jpd.closedate,'%Y-%m-%d') AS closedate,
    jp.clientid,
    cl.organization

FROM jobpostingdetail jpd

INNER JOIN jobposting jp ON
    jp.jobpostingid =  jpd.jobpostingid
    AND jp.active =1

INNER JOIN client cl ON
    cl.clientid =  jp.clientid
    AND cl.active =1

where jpd.active = 1 GROUP BY jp.clientid ORDER BY jp.clientid DESC LIMIT 6;
                 */
			});

			con.query(query).then(function (rows, fields) {
				var rowsReturned = rows.length;
				var result = [];
				if (rowsReturned > 0) {
					for (var i = 0; i < rowsReturned; i++) {
						var jobdetails = new jobModel.clientvacancydetails(rows[i].jobpostingid, rows[i].jobmasterid,
							rows[i].posteddate, rows[i].numberofvacancies, rows[i].filledvacancies, rows[i].waitingvacancies, rows[i].close, rows[i].closedate, rows[i].clientid, rows[i].organization);
						result.push(jobdetails);
					}
				}
				resolve(result);
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.getclientprojectid = function (projectno, job) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
					SELECT
						pr.projectid,
						pr.clientid,
						jp.jobpostingid
					FROM `project` pr
					LEFT JOIN jobposting jp ON
						jp.projectid =  pr.projectid
						AND jp.active =1
					WHERE projectno = ?
                */
			});
			con.query(query, [projectno]).then(function (rows, fields) {
				var rowsReturned = rows.length;
				if (rowsReturned > 0) {
					resolve({
						"clientid": rows[0].clientid,
						"projectid": rows[0].projectid,
						"jobpostingid": rows[0].jobpostingid,
						"job": job
					})
				} else {
					resolve({
						"job": job
					})
				}
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.getjobpostingbyjobpostingid = function (jobpostingid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
                  SELECT
                     jpd.jobpostingdetailid,
                     jpd.jobpostingid,
                     jpd.jobmasterid,
                     jm.code AS jobmastercode,
                     jm.name AS jobmastername,
                     jpd.numberofvacancies,
                     jpd.startdate,
                     jpd.active
                 FROM `jobpostingdetail` jpd

                 INNER JOIN jobmaster jm ON
                     jm.jobmasterid = jpd.jobmasterid
                 AND jm.active = 1

                 WHERE jpd.jobpostingid=? AND jpd.active=1 AND jpd.close= 1
                    
                                     */
			});

			con.query(query, [jobpostingid]).then(function (rows, fields) {
				var rowsReturned = rows.length;
				var result = [];
				if (rowsReturned > 0) {
					if (rowsReturned > 0) {
						for (var index = 0; index < rowsReturned; index++) {
							result.push(new jobModel.jobvacant(rows[index].jobpostingdetailid, rows[index].jobmasterid, rows[index].jobmastercode, rows[index].jobmastername, rows[index].numberofvacancies, rows[index].startdate))
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
	});
}

module.exports.maximumapply = function (memberid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
               SELECT
                    count(*) AS `count`
                 FROM `jobactivity` ja

                 INNER JOIN jobpostingdetail jpd ON
                     ja.jobpostingdetailid = jpd.jobpostingdetailid
                 AND jpd.close=1

                 WHERE ja.memberid = ? AND  (ja.jobstatuscode = 0 OR ja.jobstatuscode = 1) AND ja.active=1;
                                     */
			});
			con.query(query, [memberid]).then(function (rows, fields) {
				resolve({
					"count": rows[0].count
				})
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.getduties = function (monthandyear) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
					SELECT
					    at.clientid,
					    at.projectid,
					    pr.name AS projectname,
					    pr.projectno,
					    at.jobpostingdetailid,
					    at.memberid,
					    DATE_FORMAT(at.datedon,'%d-%m-%Y') as datedon,
					    m.firstname,
					    at.monthandyear,
					    at.status,
					    sum(at.eddays) AS eddays,
					    sum(at.presentdays) AS presentdays,
					    sum(at.othours) AS othours,
					    COUNT(at.memberid) AS empcount,
					    at.jobmasterid,
					    jm.code,
					    jm.name,
					    i.invoiceno

					FROM `attendance` at

					 INNER JOIN project pr ON
					       pr.projectid = at.projectid
					       AND pr.active =1

					 INNER JOIN member m ON
					      m.memberid = at.memberid
					      AND m.active =1


					 INNER JOIN jobmaster jm ON
					      jm.jobmasterid = at.jobmasterid
					      AND jm.active = 1

					 LEFT JOIN invoice i ON
					      i.clientid = at.clientid
					      AND i.projectid = at.projectid
					      AND i.monthandyear = at.monthandyear AND i.active = 1

					WHERE at.monthandyear = ? AND (at.status = 1 OR at.status = 3 OR at.status = 4 OR at.status = 5 OR at.status = 6) AND at.active =1

					group by jm.code, at.projectid, at.clientid

					order by at.clientid, at.projectid, jm.jobmasterid
                */
			});
			con.query(query, [monthandyear]).then(function (rows, fields) {
				var rowsReturned = rows.length;
				var result = [];
				var totalduties = [];
				var noofduties = 0;
				if (rowsReturned > 0) {
					if (rowsReturned > 0) {
						for (var i = 0; i < rowsReturned; i++) {
							noofduties = parseInt(rows[i].presentdays) + parseInt(rows[i].eddays) + parseFloat(rows[i].othours / 8);
							var job = new jobModel.totalduties(rows[i].jobmasterid, rows[i].code, rows[i].name, noofduties, 0, 0, rows[i].othours, rows[i].presentdays, rows[i].eddays, rows[i].empcount);
							totalduties.push(job)
							if ((i + 1 == rowsReturned) || (rows[i].projectid != rows[i + 1].projectid || rows[i].monthandyear != rows[i + 1].monthandyear)) {
								result.push(new jobModel.duties(rows[i].clientid, rows[i].projectid, rows[i].projectno, rows[i].projectname, rows[i].monthandyear, totalduties, rows[i].invoiceno, '', '', '', '', '', '', '', '', '', '', '', '', rows[i].status, rows[i].datedon))
								totalduties = [];
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
	});
}

module.exports.approveattendance = function (attendance) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			if (attendance.length > 0) {
				var queries = '';
				attendance.forEach(function (item) {
					queries += con.format("UPDATE attendance SET status = ? WHERE (projectid = ? AND monthandyear = ?);", [1, item.projectid, item.monthandyear])
				});
				con.query(queries).then(function (rows, fields) {
					resolve("success");
				}).catch(function (err) {
					reject(err);
				});
			}
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.getjobappliedcount = function (closedate, memberid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			con.query('SELECT registrationno as numbersapplied FROM jobactivity ja INNER JOIN jobpostingdetail jpd ON ja.jobpostingdetailid = jpd.jobpostingdetailid AND jpd.close = 1 AND jpd.active where ja.active= 1 AND ja.memberid = ? and ja.createdttm > ? ORDER BY ja.createdttm DESC', [memberid, closedate]).then(function (rows, fields) {
				if (rows.length > 0) {
					resolve({
						"numbersapplied": rows[0].numbersapplied,
						"appliedcount": rows.length
					})
				} else {
					con.query('INSERT INTO regno (dummy) VALUES(?);', [memberid]).then(function (rows, fields) {
						resolve({
							"numbersapplied": rows.insertId,
							"appliedcount": 0
						})
					}).catch(function (err) {
						reject(err);
					});
				}
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.generateinvoice = function (projectid, monthandyear) {

	console.log('sdfsf')
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
					SELECT 
						att.clientid,att.projectid,pr.name AS projectname,pr.projectno,pr.ismainproject,att.jobpostingdetailid,
						att.memberid,mem.firstname,att.monthandyear, 
						(SUM(att.presentdays) * COUNT(DISTINCT att.attendanceid)/COUNT(*)) +
						(SUM(att.eddays) * COUNT(DISTINCT att.attendanceid)/COUNT(*)) AS presentduties,
						(SUM(att.eddays) * COUNT(DISTINCT att.attendanceid)/COUNT(*)) AS eddays,
						COUNT(DISTINCT att.attendanceid) AS noofperson,
						(SUM(att.othours) / 8 * COUNT(DISTINCT att.attendanceid)/COUNT(*)) AS otduties,
						jm.jobmasterid,jm.code,jm.name,ag.servicecharge,ag.tax,	
						IFNULL(wg.particularamount, 0) AS salary,
						lv.code,ag.wagetypeid,ag.edseperate,ag.taxtype,ag.allowancetype1,
							ag.allowancevalue1,
							ag.allowancetype2,
							ag.allowancevalue2,
							ag.allowancetype3,
							ag.allowancevalue3
					FROM attendance att 
					INNER JOIN member mem ON mem.memberid = att.memberid
					INNER JOIN project pr ON pr.projectid = att.projectid
					INNER JOIN jobmaster jm ON jm.jobmasterid = att.jobmasterid AND jm.active = 1
					INNER JOIN agreement ag ON ag.clientid = pr.clientid AND ag.active = 1
					INNER JOIN agreementinfo ai ON ai.agreementid = ag.agreementid and pr.projectid=ai.projectid
					INNER JOIN wages wg ON wg.wagetypeid = ag.wagetypeid AND jm.jobmasterid = wg.jobmasterid AND wg.wageyearid = ag.wageyearid AND wg.wageareaid = ag.wageareaid AND wg.wagecategoryid = ag.wagecategoryid AND wg.active = 1  AND wg.particularamount > 0
					INNER JOIN lookupvalue lv ON lv.lkvalid = wg.particularid AND lv.active = 1 AND lv.code = 'RATEHD'
					WHERE att.monthandyear = ? AND att.projectid = ? AND att.active =1 
					GROUP BY jm.code,att.projectid, att.clientid,att.monthandyear ORDER BY att.clientid, att.projectid, jm.jobmasterid
				*/
			});
			con.query(query, [monthandyear, projectid]).then(function (rows, fields) {
				// console.log('rows',rows);
				var rowsReturned = rows.length;
				var result = [];
				var totalduties = [];
				var amount = {};
				var salaryamount = {};
				var servicetax = {};
				var servicecharges = {};
				var allwance = {}
				var total = {};
				var duties = {};
				var gross = 0;
				if (rowsReturned > 0) {
					for (var i = 0; i < rowsReturned; i++) {
						var a = rows[i].monthandyear.split(' ');
						var monthname = a[0];
						var year = a[1];
						var month = new Date(Date.parse("1 " + monthname)).getMonth() + 1;
						var days = new Date(year, month, 0).getDate();
						duties = parseFloat(rows[i].presentduties) + parseFloat(rows[i].otduties);
						salaryamount = ((parseFloat(rows[i].salary) / days) * duties).toFixed(2);
                        salaryedamount = ((parseFloat(rows[i].salary) / days) * rows[i].eddays).toFixed(2);
						if(rows[i].wagetypeid == 349)
						{
							salaryamount=	Math.round(salaryamount);
							salaryedamount=	Math.round(salaryedamount);
						}

						var job = new jobModel.invoice(rows[i].jobmasterid, rows[i].jobmastercode, rows[i].name, rows[i].salary, duties, salaryamount, rows[i].noofperson, days,rows[i].clientid, rows[i].projectid,rows[i].monthandyear,rows[i].eddays,salaryedamount);
						totalduties.push(job);
						// gross  salary added for Each job
						gross = (parseFloat(job.salaryamount) + parseFloat(gross)).toFixed(2);
						
						
						if ((i + 1 == rowsReturned) || (rows[i].projectid != rows[i + 1].projectid)) {
							// total salary, after adding service charges and tax
							servicecharges = ((gross / 100) * parseFloat(rows[i].servicecharge)).toFixed(2);

							
								allwance = (parseFloat(rows[i].allowancevalue1) + parseFloat(rows[i].allowancevalue2) + parseFloat(rows[i].allowancevalue3)).toFixed(2);
							
								console.log('all',allwance);

							
							
							sstax =(((parseFloat(gross) + parseFloat(servicecharges)+parseFloat(allwance)) / 100) * parseFloat(rows[i].tax)/2).toFixed(2);

							console.log('sstax',sstax);
							// sstax1=sstax.toString().slice(0, (sstax.toString().indexOf(".")) + (2 + 1));
							servicetax=parseFloat(sstax)+parseFloat(sstax);
							
							//return;
							
							total = Math.round(parseFloat(gross) + parseFloat(servicetax) + parseFloat(servicecharges)+parseFloat(allwance));
							result.push(new jobModel.duties(rows[i].clientid, rows[i].projectid, rows[i].projectno, rows[i].projectname, rows[i].ismainproject, rows[i].monthandyear, totalduties, "", gross, rows[i].servicecharge, rows[i].tax, servicecharges, servicetax, total,rows[i].edseperate,rows[i].taxtype,rows[i].allowancetype1,rows[i].allowancevalue1,rows[i].allowancetype2,rows[i].allowancevalue2,rows[i].allowancetype3,rows[i].allowancevalue3))
							totalduties = [];
						}
					}
					resolve(result);
				} else {
					reject("Attendance");
				}
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.invoice = function (invoice) {
	console.log('sdgsdg',invoice);
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = {
				projectid: invoice.projectid,
				clientid: invoice.clientid,
				servicecharge: invoice.servicecharge,
				tax: invoice.tax,
				servicecharges: invoice.servicecharges,
				servicetax: invoice.servicetax,
				invoiceno: invoice.invoiceno,
				subtotal: invoice.subtotal,
				monthandyear: invoice.monthandyear,
				totalamount: invoice.total,
				invoicestatus: 3,
				edseperate:invoice.edseperate,
				taxtype:invoice.taxtype,
				allowancetype1 : invoice.allowancetype1,
				allowancevalue1 : invoice.allowancevalue1,
                	allowancetype2 : invoice.allowancetype2,
                	allowancevalue2 : invoice.allowancevalue2,
					allowancetype3 : invoice.allowancetype3,
                	allowancevalue3 : invoice.allowancevalue3
			};
			con.query('INSERT INTO invoice SET ?', query).then(function (rows, fields) {
				resolve({
					"invoiceid": rows.insertId
				})
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.invoicedetails = function (invoice, invoiceid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			if (invoice.length > 0) {
				var queries = '';
				invoice.forEach(function (item) {
					queries += con.format("INSERT INTO invoicedetail(invoiceid, jobmasterid, salary, noofduties, noofperson, days, salaryamount, projectid,clientid ,eddays,salaryedamount) VALUES (?,?,?,?,?,?,?,?,?,?,?);", [invoiceid, item.jobmasterid, item.salary, item.noofduties, item.noofperson, item.days, item.salaryamount,item.projectid,item.clientid,item.eddays,item.salaryedamount]);
				});
				con.query(queries).then(function (rows, fields) {
					resolve({
						"invoicedetailid": invoiceid
					});
				}).catch(function (err) {
					reject(err);
				});
			}
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.getnumberofinvoices = function () {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			con.query('SELECT COUNT(*) as numberofinvoices FROM invoice').then(function (rows, fields) {
				resolve({
					"numberofinvoices": rows[0].numberofinvoices
				})
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.getinvoiceexist = function (projectid, monthandyear) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			con.query('SELECT invoiceid FROM invoice where (projectid = ? AND  monthandyear= ? AND active= 1 AND invoicestatus != 7)', [projectid, monthandyear]).then(function (rows, fields) {
				console.log('rows',rows);
				if (rows.length > 0) {
					reject("invoice");
				} {
					resolve("Success")
				}
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.getinvoiceexistss = function (projectid, monthandyear) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			con.query('SELECT invoiceid FROM invoice where (projectid = ? AND  monthandyear= ? AND active= 1 AND invoicestatus != 7)', [projectid, monthandyear]).then(function (rows, fields) {
				console.log('rows',rows);
				if (rows.length > 0) {
					resolve("1")
				} {
					resolve("0")
				}
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.getjobMasterDetails = function (invoiceno) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			con.query('SELECT * FROM jobmaster WHERE active= 1 order by sortorder asc').then(function (rows, fields) {
				console.log('rows', rows.length);
				if (rows.length > 0) {
					resolve(rows)
				} else {
					reject("No Data Found");
				}
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	}).catch(function (err) {
		reject(err);
	});
}

module.exports.getinvoice = function (invoiceno, results) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
                  	SELECT
						i.invoiceid,
						i.clientid,
						i.projectid,
						i.monthandyear,
						i.invoiceno,
						i.subtotal,
						i.servicecharge,
						i.tax,
						i.servicecharges,
						i.servicetax,
						i.totalamount,
						i.invoiceno,
						DATE_FORMAT(i.createdttm,'%d-%m-%Y')AS createddate,
						id.invoicedetailid,
						id.jobmasterid,
						id.salary,
						id.noofduties,
						id.salaryamount,
						id.noofperson,
						id.eddays,
						id.salaryedamount,
						id.days,
						jm.code,
						jm.name,
						pr.name AS projectname,
						pr.projectno,
						pr.claimaddressline1 AS addressline1,
						pr.claimaddressline2 AS addressline2,
						pr.claimaddressline3 AS addressline3,
						pr.claimpincode AS pincode,
						pr.designation,
						pr.ismainproject,
						pr.claimprojectnumber,
						pr.claimprojectname,
						i.printcount,
						i.invoicetype,
						c.gstno,
						i.edseperate,
						i.taxtype,
						i.allowancetype1,
							i.allowancevalue1,
							i.allowancetype2,
							i.allowancevalue2,
							i.allowancetype3,
							i.allowancevalue3
					FROM `invoice` i
					INNER JOIN invoicedetail id ON
						id.invoiceid = i.invoiceid
						AND id.active = 1
					INNER JOIN project pr ON
						pr.projectid = id.projectid
						AND pr.active =1
					INNER JOIN jobmaster jm ON
						jm.jobmasterid = id.jobmasterid
						AND id.active = 1
						inner join client c on c.clientid=id.clientid
					WHERE i.invoiceno = ?
					order by jm.sortorder,pr.projectno;

					select DISTINCT(mem.texcono),mem.firstname,p.projectno from attendance at inner join invoicedetail inv on inv.projectid=at.projectid 
					INNER JOIN invoice inc ON inc.invoiceid=inv.invoiceid AND at.monthandyear=inc.monthandyear
					INNER JOIN member mem ON mem.memberid=at.memberid
					INNER JOIN project p ON p.projectid=at.projectid
					where inc.invoiceno=? AND at.jobmasterid=3
					
				*/
			});

			con.query(query, [invoiceno,invoiceno]).then(function (rowss, fields) {
				var rows = rowss[0];
				var rows1 = rowss[1];
	
				var rowsReturned = rows.length;
				var rowsReturned1 = rows1.length;
				var result = [];
				var totalduties = [];
				var dvrjobs =[];
				var width = 4;
				var z = '0';
				if (rowsReturned > 0) {
					for (var i = 0; i < rowsReturned; i++) {
						var n = rows[i].noofduties + '';
						var m = rows[i].noofperson + '';
						//var noofduties = n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
						//var noofperson = m.length >= width ? m : new Array(width - m.length + 1).join(z) + m;
						var noofperson =rows[i].noofperson;
						var noofduties =rows[i].noofduties;
						dvrjobs=[];
						if (rowsReturned1 > 0) {
							
							for (var d = 0; d < rowsReturned1; d++) {
							
								if(rows[i].projectno==rows1[d].projectno)
								{
								console.log(rows[i].projectno,rowsReturned1);
						var dvrjob = new jobModel.dvrDetails(rows1[d].projectno,rows1[d].texcono,rows1[d].firstname);
						dvrjobs.push(dvrjob);
								}
							
								
						}
						dvrjob=[];
					}
						
						var job = new jobModel.invoicess(rows[i].jobmasterid, rows[i].code, rows[i].name, rows[i].salary, noofduties, rows[i].salaryamount, noofperson, rows[i].days, rows[i].projectno, rows[i].projectname,rows[i].ismainproject,rows[i].claimprojectnumber,rows[i].claimprojectname,rows[i].eddays,rows[i].salaryedamount,dvrjobs);
						totalduties.push(job);
						if ((i + 1 == rowsReturned) || (rows[i].projectid != rows[i + 1].projectid)) {
							result.push(new jobModel.dutiesprint(rows[i].clientid, rows[i].projectid, rows[i].projectno, rows[i].projectname, rows[i].monthandyear, totalduties, rows[i].invoiceno, rows[i].subtotal, rows[i].servicecharge, rows[i].tax, rows[i].servicecharges, rows[i].servicetax, rows[i].totalamount, rows[i].createddate, rows[i].addressline1, rows[i].addressline2, rows[i].addressline3, rows[i].pincode, rows[i].designation, rows[i].printcount, rows[i].invoiceid, rows[i].invoicetype,rows[i].gstno,rows[i].edseperate,rows[i].taxtype,rows[i].allowancetype1,rows[i].allowancevalue1,rows[i].allowancetype2,rows[i].allowancevalue2,rows[i].allowancetype3,rows[i].allowancevalue3))
							totalduties = [];
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
	});
}

module.exports.rejectemployer = function (jobactivityid, ondate) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			con.query("UPDATE jobactivity SET jobstatuscode = ?, currentvacancies = ? WHERE jobactivityid = ?", [4, "", jobactivityid]).then(function (rows, fields) {
				var query1 = {
					jobactivityid: jobactivityid,
					ondate: ondate,
					jobstatuscode: 4,
					comments: "rejected"
				};
				con.query("INSERT INTO jobactivityhistory SET ?", query1).then(function (rows, fields) {
					resolve("success");
				});
			});
		}).catch(function (err) {
			reject(err);
		});
	}).catch(function (err) {
		reject(err);
	});
}

module.exports.updatePostingOrder = function (projectid, projectno, texcono, category, memberhistoryid, startdate, memberid) {
	var startdates = null;
	if(startdate) {
		var dts = new Date(startdate);
		startdates = moment(dts).format('YYYY-MM-DD');
	} else {
		startdates = null; 
	}
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			con.query("UPDATE memberhistory SET projectid = ?, projectno = ?, texcono = ?, category = ?, startdate = ? WHERE memberhistoryid = ?;", [projectid, projectno, texcono, category, startdates, memberhistoryid]).then(function (rows, fields) {
				resolve("success");
			});
		}).catch(function (err) {
			console.log('err',err);
			reject(err);
		});
	}).catch(function (err) {
		reject(err);
	});
}  

module.exports.updateMemberhistory = function (projectid, projectno, texcono, category, memberhistoryid, startdate, endate) {
	var startdates = null;
	if(startdate) {
		var dts = new Date(startdate);
		startdates = moment(dts).format('YYYY-MM-DD');
	} else {
		startdates = null; 
	}

	if(endate) {
		var dts1 = new Date(endate);
		endates = moment(dts1).format('YYYY-MM-DD');
	} else {
		endates = null; 
	}
	console.log()
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			con.query("UPDATE memberhistory SET projectid = ?, projectno = ?, texcono = ?, category = ?, startdate = ?,enddate = ? WHERE memberhistoryid = ?;", [projectid, projectno, texcono, category, startdates,endate, memberhistoryid]).then(function (rows, fields) {
				resolve("success");
			});
		}).catch(function (err) {
			console.log('err',err);
			reject(err);
		});
	}).catch(function (err) {
		reject(err);
	});
}  


module.exports.addPostingOrder = function (projectid, projectno, texcono, category, startdate, enddate, memberid) {
	var startdates = null;
	var enddates = null;
	if(startdate) {
		var dts = new Date(startdate);
		startdates = moment(dts).format('YYYY-MM-DD');
	} else {
		startdates = null; 
	}
	if(enddate) {
		var dtss = new Date(enddate);
		enddates = moment(dtss).format('YYYY-MM-DD');
	} else {
		enddates = null; 
	}

	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {  
			var queires = '';
			queires += con.format("INSERT INTO `memberhistory`( `memberid`, `texcono`, `projectid`,`projectno`, `startdate`,  `category`,`enddate`) VALUES (?,?,?,?,?,?,?);", [memberid,texcono,projectid, projectno,  startdates, category, enddates]);
			console.log('queires',queires);
			con.query(queires).then(function (rows, fields) {
				resolve("success");
			});
		}).catch(function (err) {
			console.log('err',err);
			reject(err);
		});
	}).catch(function (err) {
		reject(err);
	});
}  

module.exports.addBulkPostingOrder = function (selectedDetails) {
	
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {  
			var queires = '';
			for(var j = 0; j < selectedDetails.length; j++) { 
				var dts = new Date(selectedDetails[j].startdate); 
			//	dts.setDate(dts.getDate() + 1);
				var startdates = moment(dts).format('YYYY-MM-DD');  
				var enddates = null;
				if(selectedDetails[j].enddate) {
					var dtss = new Date(selectedDetails[j].enddate);
					//dtss.setDate(dtss.getDate() + 1);
					enddates = moment(dtss).format('YYYY-MM-DD'); 
				} else {
					enddates = null; 
				}
				queires += con.format("INSERT INTO `memberhistory`( `memberid`, `texcono`, `projectid`,`projectno`, `startdate`,  `category`,`enddate`) VALUES (?,?,?,?,?,?,?);", [selectedDetails[j].memberid,selectedDetails[j].texcono,selectedDetails[j].projectid, selectedDetails[j].projectno,  startdates, selectedDetails[j].category, enddates]);
			}
			// console.log('queires',queires);
			con.query(queires).then(function (rows, fields) {
				resolve("success");
			});
		}).catch(function (err) {
			console.log('err',err);
			reject(err);
		});
	}).catch(function (err) {
		reject(err);
	});
}  


module.exports.transferPostingOrder = function (querydata,endates,memberhistoryid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			// console.log('querydata,endates,memberhistoryid',querydata,endates,memberhistoryid)
			con.query("INSERT INTO memberhistory SET ?;", [querydata]).then(function (rows, fields) {
				resolve("success");
			});
		}).catch(function (err) {
			reject(err);
		});
	}).catch(function (err) {
		reject(err);
	});
}


module.exports.getclosedate = function () {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			con.query('SELECT DISTINCT( DATE_FORMAT(closedate, "%Y-%m-%d")) AS closedate FROM jobpostingdetail WHERE closedate  IS NOT NULL ORDER BY closedate DESC').then(function (rows, fields) {
				var rowsReturned = rows.length;
				var result = [];
				if (rowsReturned > 0) {
					for (var i = 0; i < rowsReturned; i++) {
						var job = new jobModel.closedate(rows[i].closedate);
						result.push(job);
					}
				}
				resolve(result)
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.getjobpostingdetails = function (fromdate,todate) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
					SELECT mh.texcono,mem.firstname,mem.lastname,mem.serviceno,pr.projectno,pr.name AS projectname, 
					mem.memberid,mh.memberhistoryid,pr.projectid,jm.code AS category,pr.districtid,
					district.description As district,pr.regionid,region.description AS region,
					DATEDIFF(mh.enddate,mh.startdate) AS difference,rnk.description AS 'rank',jm.jobmasterid,DATE_FORMAT(mh.startdate,'%d %b %Y') AS startdate,DATE_FORMAT(mh.enddate,'%d %b %Y') AS enddate,DATE_FORMAT(mem.lastaccess,'%d %b %Y') AS lastaccess
					FROM memberhistory mh 
					INNER JOIN project pr ON pr.projectid = mh.projectid AND pr.active = 1
					INNER JOIN member mem ON mem.memberid = mh.memberid AND mh.active = 1
					INNER JOIN jobmaster jm ON jm.code =  mh.category AND jm.active = 1
					LEFT JOIN lookupvalue district ON district.lkvalid = pr.districtid AND district.active = 1
					LEFT JOIN lookupvalue region ON region.lkvalid = pr.regionid AND region.active = 1
					LEFT JOIN lookupvalue rnk ON rnk.lkvalid = mem.rankid AND rnk.active = 1
					WHERE mh.active = 1 AND DATE_FORMAT(mh.startdate,'%Y-%m-%d') BETWEEN (?) AND (?) ORDER BY mh.startdate DESC;
                */
			});
			con.query(query, [fromdate,todate]).then(function (rows, fields) {
				// console.log('rows',rows);
				var rowsReturned = rows.length;
				var result = [];
				var jobs = [];
				if (rowsReturned > 0) {
					for (var i = 0; i < rowsReturned; i++) {
						var jobposting = new jobModel.jobpostingorderedit(rows[i].texcono,rows[i].firstname,rows[i].lastname,rows[i].serviceno,rows[i].projectno,rows[i].projectname,rows[i].memberid,rows[i].memberhistoryid,rows[i].projectid,rows[i].category,rows[i].districtid,rows[i].district,rows[i].regionid,rows[i].region,rows[i].enddate,rows[i].startdate,rows[i].difference,rows[i].rank,rows[i].jobmasterid,rows[i].lastaccess);
						result.push(jobposting);
					}
				}
				resolve(result);
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}


module.exports.getMemberHistory = function (texconumber) {
	console.log(texconumber);
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
					SELECT mh.texcono,mem.firstname,mem.lastname,mem.serviceno,pr.projectno,pr.name AS projectname, 
					mem.memberid,mh.memberhistoryid,pr.projectid,jm.code AS category,pr.districtid,
					district.description As district,pr.regionid,region.description AS region,
					DATEDIFF(mh.enddate,mh.startdate) AS difference,rnk.description AS 'rank',jm.jobmasterid,DATE_FORMAT(mh.startdate,'%d %b %Y') AS startdate,DATE_FORMAT(mh.enddate,'%d %b %Y') AS enddate,DATE_FORMAT(mem.lastaccess,'%d %b %Y') AS lastaccess
					FROM memberhistory mh 
					INNER JOIN project pr ON pr.projectid = mh.projectid AND pr.active = 1
					INNER JOIN member mem ON mem.memberid = mh.memberid AND mh.active = 1
					INNER JOIN jobmaster jm ON jm.code =  mh.category AND jm.active = 1
					LEFT JOIN lookupvalue district ON district.lkvalid = pr.districtid AND district.active = 1
					LEFT JOIN lookupvalue region ON region.lkvalid = pr.regionid AND region.active = 1
					LEFT JOIN lookupvalue rnk ON rnk.lkvalid = mem.rankid AND rnk.active = 1
					WHERE mh.texcono = ?  ORDER BY mh.memberhistoryid DESC;
                */
			});
			con.query(query, [texconumber]).then(function (rows, fields) {
				// console.log('rows',rows);
				var rowsReturned = rows.length;
				var result = [];
				var jobs = [];
				if (rowsReturned > 0) {
					for (var i = 0; i < rowsReturned; i++) {
						var jobposting = new jobModel.jobpostingorderedit(rows[i].texcono,rows[i].firstname,rows[i].lastname,rows[i].serviceno,rows[i].projectno,rows[i].projectname,rows[i].memberid,rows[i].memberhistoryid,rows[i].projectid,rows[i].category,rows[i].districtid,rows[i].district,rows[i].regionid,rows[i].region,rows[i].enddate,rows[i].startdate,rows[i].difference,rows[i].rank,rows[i].jobmasterid,rows[i].lastaccess);
						result.push(jobposting);
					}
				}
				resolve(result);
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.invoicereport = function (cientid, projectid, monthandyear) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
         			SELECT
						i.invoiceid,
						c.organization AS client,
						i.clientid,
						i.projectid,
						i.monthandyear,
						i.invoiceno,
						i.subtotal,
						i.servicecharge,
						i.tax,
						i.servicecharges,
						i.servicetax,
						i.totalamount,
						i.invoiceno,
						DATE_FORMAT(i.createdttm,'%b %d %Y')AS createddate,
						id.invoicedetailid,
						id.jobmasterid,
						id.salary,
						id.noofduties,
						id.noofperson,
						id.salaryamount,
						jm.code,
						jm.name,
						pr.name AS projectname,
						pr.projectno
         			FROM `invoice` i
        			INNER JOIN invoicedetail id ON id.invoiceid = i.invoiceid AND id.active = 1
        			INNER JOIN client c ON c.clientid = i.clientid AND c.active = 1
                  	INNER JOIN project pr ON pr.projectid = i.projectid AND pr.active =1
					INNER JOIN jobmaster jm ON jm.jobmasterid = id.jobmasterid AND id.active = 1
                    WHERE i.active = 1
					AND (CASE WHEN ((? != 'undefined') AND (? != 'NULL') )
						THEN i.clientid IN (?) 
						ELSE 1=1 END) 
						
					AND (CASE WHEN (? != 'undefined' AND (? != 'NULL'))
						THEN i.projectid IN (?) 
						ELSE 1=1 END) 
						
					AND (CASE WHEN (? != 'undefined' AND (? != 'NULL'))
						THEN i.monthandyear IN (?) 
						ELSE 1=1 END)
				*/
			});
			con.query(query, [cientid, cientid, cientid, projectid, projectid, projectid, monthandyear, monthandyear, monthandyear]).then(function (rows, fields) {
				var rowsReturned = rows.length;
				var result = [];
				var noperson = 0;
				var noofduties = 0;
				if (rowsReturned > 0) {
					for (var i = 0; i < rowsReturned; i++) {
						noperson += parseInt(rows[i].noofperson);
						noofduties += parseFloat(rows[i].noofduties);
						if ((i + 1 == rowsReturned) || (rows[i].projectid != rows[i + 1].projectid)) {
							result.push(new jobModel.invoicereport(rows[i].clientid, rows[i].client, rows[i].projectid, rows[i].projectname, rows[i].projectno, rows[i].monthandyear, rows[i].invoiceno, rows[i].subtotal, rows[i].servicecharge, rows[i].tax, rows[i].servicecharges, rows[i].servicetax, rows[i].totalamount, rows[i].createddate, rows[i].jobmasterid, rows[i].code, rows[i].name, rows[i].salary, noofduties, rows[i].salaryamount, noperson))	
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
	});
}

module.exports.getApprovedInvoicesCount = function () {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			con.query('SELECT COUNT(*) AS totalinv FROM invoice WHERE active= 1 AND invoicestatus IN (1,2);').then(function (rows, fields) {
				resolve(rows);
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.getTotalInvoicesCount = function () {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			con.query('SELECT COUNT(*) AS totalinv FROM invoice WHERE active= 1;').then(function (rows, fields) {
				resolve(rows);
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.getPendingInvoiceAmount = function () {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			con.query('SELECT SUM(totalamount-paidamount) AS totalamount FROM invoice WHERE active= 1 AND invoicestatus IN (1,2);').then(function (rows, fields) {
				resolve(rows);
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.getTotalInvoiceAmount = function () {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			con.query('SELECT SUM(totalamount) AS totalamount FROM invoice WHERE active= 1;').then(function (rows, fields) {
				resolve(rows);
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.getprojectInvoiceList = function (clientid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
				    SELECT 
				        inv.invoiceid,
				        inv.invoiceno,
				        inv.clientid,
				        inv.projectid,
				        inv.monthandyear,
				        inv.servicecharges,
				        inv.servicetax,
				        inv.subtotal,
				        inv.totalamount,
				        inv.paidamount,
				        inv.invoicestatus,
				        inv.paymentutrno,
				        DATE_FORMAT(inv.createdttm,'%d-%M-%Y') AS createdate,
				        p.projectno,
				        p.name,
				        inv.active
				    FROM invoice inv
				    INNER JOIN project p ON
				        p.projectid=inv.projectid AND p.clientid = inv.clientid AND p.active=1
				    WHERE inv.active= 1 OR inv.active = 0;
				*/
			});
			con.query(query).then(function (rows, fields) {
				resolve(rows);
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.getprojectInvoiceListXML = function (monthandyear) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
				    SELECT 
				        inv.invoiceid,
				        inv.invoiceno,
				        inv.clientid,
				        inv.projectid,
				        inv.monthandyear,
				        inv.servicecharges,
				        inv.servicetax,
				        inv.subtotal,
				        inv.totalamount,
				        inv.invoicestatus,
				        inv.paymentutrno,
				        DATE_FORMAT(inv.createdttm,'%d-%M-%Y') AS createdate,
				        p.projectno,
				        p.name,
				        inv.active
				    FROM invoice inv
				    INNER JOIN project p ON
				        p.projectid=inv.projectid AND p.clientid = inv.clientid AND p.active=1
				    WHERE inv.active= 1 AND inv.monthandyear=? and inv.invoicestatus !=7;
				*/
			});
			con.query(query, [monthandyear]).then(function (rows, fields) {
				resolve(rows);
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.getmemberalreadyconfirmed = function (memberid, ondate) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var currentdate = moment().format('DD-MM-YYYY');
			con.query('SELECT DATE_FORMAT(effectivedate,"%d-%m-%Y")AS effectivedate FROM `jobactivity` WHERE memberid=? and jobstatuscode=2 ORDER BY createdttm desc limit 1', [memberid]).then(function (rows, fields) {
				if (rows.length > 0) {
					if (currentdate == rows[0].effectivedate) {
						var result = 1;
					} else {
						var result = 0;
					}
				} else {
					var result = 0;
				}
				resolve(result)
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.getinactivedate = async function () {
	// return new app.promise(function (resolve, reject) {
	// 	mySqlConnection.connection().then(function (con) { 
		try {
			var query = 
			`SELECT DISTINCT importdate as opendate 
			FROM jobpostingdate 
			ORDER BY importdate DESC 
			LIMIT 1;`

			const rows = await pool.query(query);   
			var rowsReturned = rows.length; 
			if (rowsReturned > 0) {
				var result = [{ "opendate": rows[0].opendate}];
				return result;
			} 
		} catch(err) {
			throw new Error(err)
		}
	// 	}).catch(function (err) {
	// 		reject(err);
	// 	});
	// });
}

module.exports.updateinactivedate = function (inactivedate) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			con.query('UPDATE jobpostingdate SET inactivedate= ? WHERE id=1;', [inactivedate]).then(function (rows, fields) {
				resolve('success')
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.getjobappliedreport = function (closedate) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
		            SELECT
		                ja.jobactivityid,
		                jpd.jobpostingid,
		                ja.jobpostingdetailid,
		                ja.registrationno,
		                ja.memberid,
		                ja.ipaddress,
		                DATE_FORMAT(ja.effectivedate,'%d-%m-%Y %T') AS effectivedate,
		                m.firstname,
		                m.lastname,
		                trade.description AS trade,
		                m.texcono,
		                m.serviceno, 
						m.mobile,
		                DATE_FORMAT(m.dob,'%d %b %Y ') AS dob,
		                DATE_FORMAT(m.lastaccess,'%d %b %Y') AS lastaccess,
		                DATE_FORMAT(m.doj,'%d %b %Y') AS doj,
		                ja.clientid,
		                cl.organization AS client,
		                cl.addressline1 As addrees1,
		                cl.addressline2 As addrees2,
		                cl.addressline3 As addrees3,
		                ja.projectid,
		                pr.projectno,
		                pr.name AS projectname,
		                pr.districtid,
		                district.description As district,
		                pr.regionid,
		                region.description AS region,
		                ja.currentvacancies,
		                jobstatus.description AS jobstatus,
		                ja.jobstatuscode,
		                ja.texcono AS newtexcono,
		                jpd.jobmasterid,
		                rnk.description AS 'rank',
		                jm.code,
		                jm.name,
		                jm.monthlywages,
		                jm.workinghours,
		                jm.servicecharge,
		              	jm.servicetax,
						ja.isrejected,
						cl.clientid
		            FROM jobactivity ja
		            INNER JOIN jobpostingdetail jpd ON
		                jpd.jobpostingdetailid =  ja.jobpostingdetailid
		                AND jpd.active =1
		            INNER JOIN client cl ON
		                cl.clientid =  ja.clientid
		                AND cl.active =1
		            INNER JOIN project pr ON
		                pr.projectid = ja.projectid
						AND cl.active =1 
		            INNER JOIN member m ON
		                m.memberid = ja.memberid
		                AND m.active =1
		            INNER JOIN jobmaster jm ON
		                jm.jobmasterid =  jpd.jobmasterid
		                AND jpd.active =1
		            INNER JOIN lookupvalue district ON
		                district.lkvalid = pr.districtid
		                AND district.active = 1
		            INNER JOIN lookupvalue region ON
		                region.lkvalid = pr.regionid
		                AND region.active = 1
		            LEFT JOIN lookupvalue trade ON
		                trade.lkvalid = m.tradeid
		                AND trade.active = 1
		            LEFT JOIN lookupvalue rnk ON
		                rnk.lkvalid = m.rankid
		                AND rnk.active = 1
		            INNER JOIN lookupvalue jobstatus ON
		                jobstatus.code = ja.jobstatuscode
		                AND jobstatus.lkdmncode = 'JOBST' AND jobstatus.code != 4
						AND jobstatus.active = 1
		            WHERE ja.active = 1
             	*/
			});
			if (closedate == "") {
				query += " AND jpd.close = 1 ORDER BY ja.registrationno;";
			} else {
				query += " AND DATE_FORMAT(jpd.closedate,'%Y-%m-%d') = '"+closedate+"' ORDER BY ja.registrationno;";
			}   
			//query += con.format('SELECT ag.clientid,wgtype.description FROM agreement ag INNER JOIN lookupvalue wgtype ON wgtype.lkvalid = ag.wagetypeid AND wgtype.active = 1 GROUP BY ag.clientid;');
			con.query(query).then(function (rows, fields) {
				//console.log('rows',rows);
				var rowsReturned = rows.length;
				var result = [];
				var history = [];
				var experience = "";
				var jobs = [];
				if (rowsReturned > 0) {
					for (var i = 0; i < rowsReturned; i++) {
						var lastaccess = "";
						var doj = "";
						lastaccess = rows[i].lastaccess;
						doj = rows[i].doj;
						if (rows[i].doj == null || rows[i].doj == "0000-00-00 00:00:00") {
							rows[i].doj = "";
							doj = new Date();
						}
						if (rows[i].lastaccess == null || rows[i].lastaccess == "0000-00-00 00:00:00") {
							rows[i].lastaccess = "";
							lastaccess = new Date();
						}
						var d1 = new Date(lastaccess);
						var d2 = new Date(doj);
						var diff = new Date(d1.getFullYear() - d2.getFullYear(), d1.getMonth() - d2.getMonth(), d1.getDate() - d2.getDate());
						experience = diff.getYear() + " Year(s) - " + diff.getMonth() + " Month(s)";
						if (parseInt(diff.getYear()) < 0) {
							experience = "0 Years";
						}
						if (rows[i].trade == 'CLK' && rows[i].code == 'JA') {
							rows[i].code = rows[i].code += ' (CLK)';
						}
						if(rows[i].isrejected == 1) {
							rows[i].isrejected = 'Client Rejected Person';
						} else {
							rows[i].isrejected = 'No';
						}
						// console.log('wagetype',wgtype);
						var jobposting = new jobModel.jobappliedreport(rows[i].firstname, rows[i].texcono, rows[i].serviceno, rows[i].projectno, rows[i].projectname, rows[i].jobstatus + " - " + rows[i].currentvacancies, rows[i].code, rows[i].lastaccess, rows[i].doj, history, experience, rows[i].registrationno, rows[i].memberid, "", rows[i].effectivedate, rows[i].ipaddress, rows[i].isrejected, rows[i].mobile, rows[i].region, rows[i].district,rows[i].dob,rows[i].rank); 
						//console.log('jobposting',JSON.stringify(jobposting));
						result.push(jobposting);
						//} 
					}
				}
				resolve(result);
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}


module.exports.getconfirmedcount = function (jobactivityid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			con.query("Select jobpostingdetailid, projectid from jobactivity where jobactivityid =? ", [jobactivityid]).then(function (rows, fields) {
				resolve({
					"jobpostingdetailid": rows[0].jobpostingdetailid,
					"projectid": rows[0].projectid
				})
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.getavailablevacancies = function (jobpostingdetailid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
					Select Count(*) AS confirmed from jobactivity where jobpostingdetailid =? AND jobstatuscode = 2;
					SELECT IFNULL(numberofvacancies,0) AS numberofvacancies FROM `jobpostingdetail` where jobpostingdetailid =?;
              	*/
			});
			con.query(query, [jobpostingdetailid, jobpostingdetailid]).then(function (rows, fields) {
				resolve({
					"confirmed": rows[0][0].confirmed,
					"vacancy": rows[1][0].numberofvacancies
				})
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.getconfirmhistory = function (memberid, result) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
					SELECT  
						m.memberid, 
						m.texcono, 
						m.projectno, 
						m.category,
						DATE_FORMAT(m.startdate,'%d %b %Y') AS startdate, 
						DATE_FORMAT(m.enddate,'%d %b %Y') AS enddate, 
						CONCAT_WS( '', CONCAT_WS('-', m.projectno,  IFNULL(p.name, '') , m.category)) AS jobposting, 
						IFNULL(p.name, '') AS name
					
					FROM memberhistory m

					LEFT JOIN project p ON
						p.projectno = m.projectno AND p.active = 1
						
					WHERE m.active = 1 AND  m.memberid IN (?)
					
					GROUP BY  
					m.memberid, 
					m.startdate,
					m.enddate
														
					ORDER BY m.memberid, m.startdate ;
              	*/
			});
			con.query(query, [memberid]).then(function (rows, fields) {
				var rowsReturned = rows.length;
				var jobposting = "";
				var experience = "";
				var totalyears = 0;
				var totalmonths = 0;
				var totaldays = 0;
				if (rowsReturned > 0) {

					for (var i = 0; i < rowsReturned; i++) {

						if (rows[i].startdate != null || rows[i].startdate != "0000-00-00 00:00:00" || rows[i].startdate != "") {

							if (rows[i].enddate == null || rows[i].enddate == "0000-00-00 00:00:00" || rows[i].enddate == "") {

							} else {

								var s1 = new Date(rows[i].enddate);
								var s2 = new Date(rows[i].startdate);
								var diff = new Date(s1.getFullYear() - s2.getFullYear(), s1.getMonth() - s2.getMonth(), s1.getDate() - s2.getDate());

								if (parseInt(diff.getYear()) >= 0) {
									var exp = '';
									exp = diff.getYear() + " Year(s) - " + diff.getMonth() + " Month(s)";
									experience += " DOJ : " + (s2.getDate() + "-" + (s2.getMonth() + 1) + "-" + s2.getFullYear()) + " Last Access : " + (s1.getDate() + "-" + (s1.getMonth() + 1) + "-" + s1.getFullYear()) + " Experience : " + exp + "\r\n";
								}

							}
						}

						if (rows[i].enddate == null || rows[i].enddate == "0000-00-00 00:00:00" || rows[i].enddate == "") {
							rows[i].enddate = new Date();
						}
						if (rows[i].startdate == null || rows[i].startdate == "0000-00-00 00:00:00" || rows[i].startdate == "") {
							rows[i].startdate = new Date();
						}

						var d1 = new Date(rows[i].enddate);
						var d2 = new Date(rows[i].startdate);
						var diff = new Date(d1.getFullYear() - d2.getFullYear(), d1.getMonth() - d2.getMonth(), d1.getDate() - d2.getDate());
						//jobposting += rows[i].projectno + " - " + rows[i].name + " - "+ rows[i].category + " - " + " Startdate:" + (d2.getDate() + "-" + (d2.getMonth() + 1) + "-" + d2.getFullYear());

						jobposting += rows[i].jobposting + " Startdate:" + (d2.getDate() + "-" + (d2.getMonth() + 1) + "-" + d2.getFullYear()) + "\r\n";
					}
				}
				resolve({
					"history": jobposting,
					"experience": experience,
					"result": result
				});
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.getconfirmhistoryofmembers = function (memberids, result) {
	console.log("Members id",memberids);
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
				    SELECT  
				        m.memberid, 
				        m.memberid, 
				        m.texcono, 
				        mem.lastaccess,
				        mem.doj,
				        m.projectno, 
				        m.category, 
				        m.startdate,
				        m.enddate, 
				        p.name, 
				        CONCAT_WS( '', CONCAT_WS('-', m.projectno,  p.name , m.category)) AS jobposting  
				    FROM memberhistory m
				    LEFT JOIN member mem ON
				        mem.memberid = m.memberid
				    LEFT JOIN project p ON
				        p.projectno = m.projectno AND p.active = 1
				        
				    WHERE m.active = 1 AND  m.memberid IN (?)
				                                  
				    ORDER BY m.memberid, m.startdate ;
				*/
			});
			con.query(query, [memberids]).then(function (rows, fields) {
				var rowsReturned = rows.length;
				var rowsReturned1 = rows[1].length;
				var jobposting = "";
				var experience = "";
				var experiencefinal = "";
				var totalyears = 0;
				var totalmonths = 0;
				var totaldays = 0;
				var history = [];
				var last6month = "";
				var sixmonth = "";
				var final = [];
				if (rowsReturned > 0) {
					for (var i = 0; i < rowsReturned; i++) {
						var d1 = new Date(rows[i].enddate);
						var d2 = new Date(rows[i].startdate);
						var diff = new Date(d1.getFullYear() - d2.getFullYear(), d1.getMonth() - d2.getMonth(), d1.getDate() - d2.getDate());
						if (rows[i].enddate != null && rows[i].enddate != "0000-00-00 00:00:00") {
							experiencefinal += (d2.getDate() + "-" + (d2.getMonth() + 1) + "-" + d2.getFullYear()) + " to " + (d1.getDate() + "-" + (d1.getMonth() + 1) + "-" + d1.getFullYear()) + "(" + diff.getYear() + " Y - " + diff.getMonth() + " M " + ")" + "\r \n";
						} else if (rows[i].startdate == "0000-00-00 00:00:00" && rows[i].enddate == "0000-00-00 00:00:00") {

							if ((rows[i].lastaccess != "0000-00-00 00:00:00") && (rows[i].doj != "0000-00-00 00:00:00")) {
								var d1 = new Date(rows[i].lastaccess);
								var d2 = new Date(rows[i].doj);
								var diff = new Date(d1.getFullYear() - d2.getFullYear(), d1.getMonth() - d2.getMonth(), d1.getDate() - d2.getDate());
								experiencefinal += (d2.getDate() + "-" + (d2.getMonth() + 1) + "-" + d2.getFullYear()) + " to " + (d1.getDate() + "-" + (d1.getMonth() + 1) + "-" + d1.getFullYear()) + "(" + diff.getYear() + " Y - " + diff.getMonth() + " M " + ")" + "\r \n";;
							}
						}

						if (rows[i].enddate == null || rows[i].enddate == "0000-00-00 00:00:00") {
							rows[i].enddate = new Date();
						}

						var d1 = new Date(rows[i].enddate);
						var d2 = new Date(rows[i].startdate);
						var diff = new Date(d1.getFullYear() - d2.getFullYear(), d1.getMonth() - d2.getMonth(), d1.getDate() - d2.getDate());

						var d = new Date();
						confirmdate = rows[i].startdate;
						//console.log(rows[i].memberid,confirmdate);
						var months = (d.getFullYear() * 12 + d.getMonth()) - (confirmdate.getFullYear() * 12 + confirmdate.getMonth());
						sixmonth = diff.getYear() + " Y - " + diff.getMonth() + " M";
						if (months == 0) {
							sixmonth = "0 Y";
						}
						if (months <= 12) {
							last6month = rows[i].projectno + " - " + rows[i].name + " - " + rows[i].category + " (" + sixmonth + " " + (d2.getDate() + "-" + (d2.getMonth() + 1) + "-" + d2.getFullYear()) + ")";
						}

						jobposting += rows[i].jobposting + "-" + (d2.getDate() + "-" + (d2.getMonth() + 1) + "-" + d2.getFullYear()) + "\r \n";

						if ((i + 1 == rowsReturned) || (rows[i].memberid != rows[i + 1].memberid)) {
							history.push(new jobModel.experience(rows[i].memberid, jobposting, experiencefinal, last6month));
							totalyears = 0;
							totalmonths = 0;
							totaldays = 0;
							jobposting = "";
							experience = "";
							experiencefinal = "";
							last6month = "";
						}
					}

					resolve({
						"result": result,
						"history": history,
						"lastsixmonth": last6month,
						"final": final
					});
				}
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

//module.exports.getfinalexperinence = function (servicenos, result) {
//    return new app.promise(function (resolve, reject) {
//        mySqlConnection.connection().then(function (con) {
//            var query = multiline.stripIndent(function () {
//                /*
//                 SELECT `serviceno`,`doj`,`lastaccess` FROM `experience` WHERE serviceno IN (?) ORDER BY serviceno;
//              */
//            });
//            con.query(query , [servicenos]).then(function (rows, fields) {
//                var rowsReturned = rows.length;
//                var experiencefinal = "";
//                var result = [];

//                if (rowsReturned > 0) {

//                    for (var i = 0; i < rowsReturned; i++) {

//                        var d11 = new Date(rows[i].lastaccess);
//                        var d22 = new Date(rows[i].doj);
//                        var diff1 = new Date(d1.getFullYear() - d2.getFullYear(), d1.getMonth() - d2.getMonth(), d1.getDate() - d2.getDate());

//                        if (rows[i].lastaccess != null && rows[i].lastaccess != "0000-00-00 00:00:00") {
//                            experiencefinal += " Startdate:" + (d22.getDate() + "-" + (d22.getMonth() + 1) + "-" + d22.getFullYear()) + " Enddate:" + (d11.getDate() + "-" + (d11.getMonth() + 1) + " - " + d11.getFullYear()) + "(" + diff1.getYear() + " Year(s) - " + diff1.getMonth() + " Month(s)" + ")" + "\r \n";
//                        }

//                        if ((i + 1 == rowsReturned1) || (rows[1][i].serviceno != rows[1][i + 1].serviceno)) {
//                            var exp = {
//                                'serviceno': rows[1][i].serviceno,
//                                'experiencefinal': experiencefinal
//                            }
//                            result.push(exp);
//                            experiencefinal = '';
//                        }
//                    }
//                    resolve({
//                        "result": result,
//                        "experiencefinal": experiencefinal
//                    });
//                }
//            }).catch(function (err) {
//                reject(err);
//            });
//        }).catch(function (err) {
//            reject(err);
//        });
//    });
//}

module.exports.checkprojectwagetype = function (clientid, memberid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
SELECT  
     a.clientid, 
     a.wagetypeid,  
     lv1.description AS 'wagetype' 

FROM agreement a

INNER JOIN lookupvalue lv1  ON
    lv1.lkvalid = a.wagetypeid AND lv1.lkdmncode ='WGTYPE'
AND lv1.active = 1

WHERE clientid = ?;
                 
SELECT  doj AS doj FROM member WHERE memberid = ?;
                                
SELECT
 `memberid`,
 `texcono`, 
  mh.projectno, 
 `category`,
 `startdate`,
  enddate,
  a.wagetypeid,
 lv1.description AS 'wagetype' 
FROM `memberhistory` mh 
 
 INNER JOIN project p ON
 p.projectno = mh.projectno
 
 INNER JOIN agreementinfo ai ON
 ai.projectid = p.projectid
 
 INNER JOIN agreement a ON
 a.agreementid = ai.agreementid
 
 INNER JOIN lookupvalue lv1  ON
    lv1.lkvalid = a.wagetypeid AND lv1.lkdmncode ='WGTYPE'
 AND lv1.active = 1
                 
 WHERE mh.active = 1 AND memberid = ? ORDER BY startdate DESC limit 1;
                                 */
			});
			con.query(query, [clientid, memberid, memberid]).then(function (rows, fields) {
				var rowsReturned = rows.length;
				var count = 0;
				var wagetype = "";
				var fresher = "NO";
				if (rowsReturned > 0) {
					if (rows[0].length > 0) {
						wagetype = rows[0][0].wagetype;
					}
					if (rows[1].length > 0) {

						var doj = rows[1][0].doj;

						if (rows[1][0].doj == null || rows[1][0].doj == "0000-00-00 00:00:00" || rows[1][0].doj == "") {
							doj = new Date();
						}

						var d = new Date();
						var diff = new Date(d.getFullYear() - doj.getFullYear(), d.getMonth() - doj.getMonth());
						var years = diff.getYear();
						if (years < 1) {
							fresher = "YES";
						}
					}
					if (rows[2].length > 0 && fresher == "NO") {

						var startdate = rows[2][0].startdate;
						var enddate = rows[2][0].enddate;
						if (rows[2][0].enddate == null || rows[2][0].enddate == "0000-00-00 00:00:00" || rows[2][0].enddate == "") {
							enddate = new Date();
						}
						var d = new Date(startdate);
						//var months = (d.getFullYear() * 12 + d.getMonth()) - (enddate.getFullYear() * 12 + enddate.getMonth());
						var diff = new Date(enddate.getFullYear() - d.getFullYear(), enddate.getMonth() - d.getMonth());
						var years = diff.getYear();

						if (wagetype == "DGR VALUE") {
							if (years < 1) {
								fresher = "YES";
							}
						}
					}
				}
				resolve({
					"wagetype": wagetype,
					"fresher": fresher
				})
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.createconfirmhistory = function (memberid, ondate, texcono, projectno, jobcode, projectid, isrejected,jobactivityid) {


	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
					INSERT INTO `memberhistory`( `memberid`, `texcono`, `projectno`, `startdate`,  `category`,`projectid`,`isrejected`) VALUES (?,?,?,?,?,?,?);
					UPDATE `member` SET `lastattendance`='0000:00:00', `atmonthandyear`='' WHERE  `memberid`=?;UPDATE `member_applydoc` SET  jobstatus='0' WHERE  `jobactivityid`=?;
					                */
			});
			if (isrejected == 1) {
				query += 'UPDATE closed_project_members SET isselected = 1 WHERE memberid = ?';
			}
			con.query(query, [memberid, texcono, projectno, ondate, jobcode, projectid, isrejected, memberid,jobactivityid,memberid]).then(function (rows, fields) {
				resolve({
					"memberhistoryid": rows.insertId
				})
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.getprojectno = function (projectid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			con.query("SELECT projectno from project WHERE projectid = ?", [projectid]).then(function (rows, fields) {
				resolve({
					"projectno": rows[0].projectno
				})
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.getemployeesinjob = function () {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
          SELECT 
            ja.jobactivityid,
            ja.memberid,
            m.firstname,
            m.texcono,
            DATE_FORMAT(m.dob,'%d %b %Y') AS dob,
            m.serviceno,
            DATE_FORMAT(m.lastaccess,'%d %b %Y') AS lastaccess,
            DATE_FORMAT(m.doj,'%d %b %Y') AS doj,
            ja.clientid,
            cl.organization AS client,
            pr.projectno,
            pr.name AS projectname,
            jobstatus.description AS jobstatus,
            ja.jobstatuscode,
            jm.code

         FROM `jobactivity` ja 

            INNER JOIN jobpostingdetail jpd ON
                jpd.jobpostingdetailid =  ja.jobpostingdetailid
                AND jpd.active =1

            INNER JOIN client cl ON
                cl.clientid =  ja.clientid
                AND cl.active =1
                
            INNER JOIN project pr ON
                pr.projectid = ja.projectid
                AND cl.active =1

            INNER JOIN member m ON
                m.memberid = ja.memberid
                AND m.active =1
                
            INNER JOIN lookupvalue jobstatus ON
                jobstatus.code = ja.jobstatuscode
                AND jobstatus.lkdmncode = 'JOBST' AND jobstatus.code = 2
                AND jobstatus.active = 1
                
            INNER JOIN jobmaster jm ON
                jm.jobmasterid = jpd.jobmasterid
                AND jm.active =1
                                 */
			});

			con.query(query).then(function (rows, fields) {
				var rowsReturned = rows.length;
				var result = [];
				if (rowsReturned > 0) {
					for (var i = 0; i < rowsReturned; i++) {
						var jobposting = new jobModel.jobconfirmedreport(rows[i].firstname, rows[i].texcono, rows[i].serviceno, rows[i].client, rows[i].projectname, rows[i].address1, rows[i].address2, rows[i].address3, rows[i].projectno, rows[i].jobstatus, rows[i].code, rows[i].name, rows[i].lastaccess, rows[i].doj, rows[i].memberid, rows[i].jobactivityid);
						result.push(jobposting);
					}
				}
				resolve(result);
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.employeeresign = function (jobactivityid, reason, resigndate, memberid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			con.query("UPDATE jobactivity SET jobstatuscode = ? WHERE jobactivityid = ?", [5, jobactivityid]).then(function (rows, fields) {
				var query1 = {
					jobactivityid: jobactivityid,
					ondate: resigndate,
					jobstatuscode: 5,
					reason: reason,
					comments: "Resigned"
				};
				con.query("INSERT INTO jobactivityhistory SET ?", query1).then(function (rows, fields) {
					var query2 = {
						enddate: resigndate,
						memberid: memberid
					};
					con.query("UPDATE memberhistory SET enddate =? WHERE memberid =? ORDER BY memberhistoryid DESC LIMIT 1", [resigndate, memberid]).then(function (rows, fields) {
						resolve("success");
					});
				});

			});
		}).catch(function (err) {
			reject(err);
		});
	}).catch(function (err) {
		reject(err);
	});
}

module.exports.getpostedlistreport = function (closedate) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
SELECT

    ja.jobactivityid,
    jpd.jobpostingid,
    ja.jobpostingdetailid,
    ja.memberid,
    m.firstname,
    m.lastname,
    m.fathername,
    m.esmidno,
    m.civilqual,
    m.armyqual,
    DATE_FORMAT(m.dob,'%d-%b-%Y') AS dob,
    IFNULL(m.nominee, "") AS nominee,
    m.nomineerelationid,
    m.corpsid,
    m.characterid,
    IFNULL(lv12.description, "") AS 'character',
    m.religionid,
    IFNULL(lv13.description,"") AS 'religion',
    m.casteid,
    IFNULL(lv14.description,"") AS 'caste',
    m.pincode,
    IFNULL(lv6.description,"") AS 'corps',
    m.tradeid,
    IFNULL(lv7.description,"") AS 'trade',
    m.village,
    IFNULL(lv4.description,"") AS 'nomineerelation',
    ja.registrationno,
    m.texcono,
    m.serviceno,
    IFNULL(m.aadhaarno,"") AS 'aadhaarno',
    m.address,
    m.stateid,
    IFNULL(lv2.description,"") AS 'state',
    m.countryid,
    IFNULL(lv3.description,"") AS 'country',
    m.rankid,
    IFNULL(rnk.description,"") AS 'rank',
    m.mobile,
    ja.clientid,
    ja.projectid,
    pr.projectno,
    pr.name AS projectname,
    pr.districtid,
    m.talukid,
    IFNULL(lv9.description,"") AS 'taluk',
    m.districtid,
    IFNULL(lv10.description,"") AS 'district',
    m.regionid,
    IFNULL(lv11.description,"") AS 'region',
    m.characterid,
    IFNULL(district.description,"") As projectdistrict,
    pr.regionid,
    IFNULL(region.description,"") AS am,
    ja.texcono AS newtexcono,
    jpd.jobmasterid,
    DATE_FORMAT( ja.effectivedate,'%d-%b-%Y') AS posteddate,
    jm.code AS category


FROM jobactivity ja

INNER JOIN jobpostingdetail jpd ON
    jpd.jobpostingdetailid =  ja.jobpostingdetailid
    AND jpd.active =1 AND jpd.close = 0
    
INNER JOIN client cl ON
    cl.clientid =  ja.clientid
    AND cl.active =1

INNER JOIN project pr ON
    pr.projectid = ja.projectid
    AND cl.active =1

INNER JOIN member m ON
    m.memberid = ja.memberid
    AND m.active =1

INNER JOIN jobmaster jm ON
    jm.jobmasterid =  jpd.jobmasterid
    AND jpd.active =1
    
 LEFT JOIN lookupvalue lv2 ON
    lv2.lkvalid = m.stateid
    AND lv2.active = 1

LEFT JOIN lookupvalue lv3 ON
    lv3.lkvalid = m.countryid
    AND lv3.active = 1

LEFT JOIN lookupvalue lv4 ON
     lv4.lkvalid = m.nomineerelationid
AND lv4.active = 1

 LEFT JOIN lookupvalue lv6 ON
     lv6.lkvalid = m.corpsid
AND lv6.active = 1
                 
LEFT JOIN lookupvalue lv7 ON
     lv7.lkvalid = m.tradeid
AND lv7.active = 1
                                 
LEFT JOIN lookupvalue lv9 ON
      lv9.lkvalid = m.talukid
 AND lv9.active = 1 
              
LEFT JOIN lookupvalue lv12 ON
      lv12.lkvalid = m.characterid
AND lv12.active = 1   
                                 
LEFT JOIN lookupvalue lv13 ON
                lv13.lkvalid = m.religionid
AND lv13.active = 1 
                                 
LEFT JOIN lookupvalue lv14 ON
                lv14.lkvalid = m.casteid
AND lv14.active = 1 

LEFT JOIN lookupvalue district ON
    district.lkvalid = pr.districtid
    AND district.active = 1

LEFT JOIN lookupvalue region ON
    region.lkvalid = pr.regionid
    AND region.active = 1
                 
INNER JOIN lookupvalue rnk ON
    rnk.lkvalid = m.rankid
    AND rnk.active = 1
                 
 LEFT JOIN lookupvalue lv10 ON
      lv10.lkvalid = m.districtid
 AND lv10.active = 1
               
LEFT JOIN lookupvalue lv11 ON
      lv11.lkvalid = m.regionid
 AND lv11.active = 1                 

WHERE ja.jobstatuscode = 2   AND DATE_FORMAT( jpd.closedate,'%Y-%m-%d') = ?;
                                 */
			});

			con.query(query, [closedate]).then(function (rows, fields) {
				var rowsReturned = rows.length;
				var result = [];
				var address = '';
				if (rowsReturned > 0) {
					for (var i = 0; i < rowsReturned; i++) {
						var sno = i + 1;
						if (rows[i].address != '') {
							address += rows[i].address + ", ";
						}
						if (rows[i].village != '') {
							address += rows[i].village + ", ";
						}
						if (rows[i].taluk != '') {
							address += rows[i].taluk + ", ";
						}
						if (rows[i].district != '') {
							address += rows[i].district + " ";
						}
						if (rows[i].pincode != '') {
							address += " - " + rows[i].pincode;
						}
						var jobposting = new jobModel.postedlistreport(sno, rows[i].registrationno, rows[i].texcono, rows[i].serviceno, rows[i].rank, rows[i].firstname + " " + rows[i].lastname, rows[i].fathername, rows[i].dob, rows[i].nominee + " (" + rows[i].nomineerelation + ")", rows[i].mobile, address, rows[i].region, rows[i].state, rows[i].country, rows[i].esmidno, rows[i].civilqual, rows[i].armyqual, rows[i].dependentname, rows[i].corps, rows[i].trade, rows[i].character, rows[i].religion, rows[i].caste, rows[i].projectno, rows[i].projectname, rows[i].am, rows[i].projectdistrict, rows[i].posteddate, rows[i].category, rows[i].aadhaarno);
						result.push(jobposting);
						address = '';
					}
				}
				resolve(result);
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.getregionammobile = function (regionid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
             SELECT
              	e.mobile

              FROM employee e

              INNER JOIN lookupvalue region ON
                  region.lkvalid = e.regionid
                  AND region.active = 1

              INNER JOIN lookupvalue desig ON
                  desig.lkvalid = e.desigid
                  AND desig.code ='AM'
                  AND desig.active = 1

              INNER JOIN role roles ON
                  roles.roleid = e.roleid
                    AND roles.active = 1

              WHERE e.active = 1 AND e.regionid = ?;

            */
			});

			con.query(query, [regionid]).then(function (rows, fields) {
				var result = [];
				var rowsReturned = rows.length;
				if (rowsReturned > 0) {
					resolve({
						"ammobile": rows[0].mobile
					});
				} else {
					resolve({
						"ammobile": ""
					});
				}
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}
//UPDATE jobpostingdetail SET inplace = ? WHERE jobpostingdetailid = ? jobinplace,jobpostingdetailid
module.exports.updateinplacecategory = function (jobactivityid, inplace, category, changedby, confirmdate, jobpostingdetailid, jobinplace, isrejected) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			con.query("UPDATE jobactivity SET inplace = ?, othercat = ?, effectivedate = ?, changedby = ? WHERE jobactivityid = ?; UPDATE jobpostingdetail SET inplace = ? WHERE jobpostingdetailid = ? ;", [inplace, category, confirmdate, changedby, jobactivityid, jobinplace, jobpostingdetailid]).then(function (rows, fields) {
				resolve({
					"jobactivityid": jobactivityid
				});
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.canceljobactivity = function (jobactivityid, inplace, jobpostingdetailid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			console.log("jobactivityid, inplace, jobpostingdetailid",jobactivityid, inplace, jobpostingdetailid);
			con.query("UPDATE jobactivity SET jobstatuscode = 1 WHERE jobactivityid = ?;UPDATE jobpostingdetail SET inplace = ? WHERE jobpostingdetailid = ?;", [jobactivityid, inplace, jobpostingdetailid]).then(function (rows, fields) {
				resolve("success");
			}).catch(function (err) {
				console.log("canceljobactivity",err);
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	}).catch(function (err) {
		reject(err);
	});
}

module.exports.checknewtexcono = function (memberid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) { 
			console.log("memberid",memberid)
			con.query("SELECT IFNULL(COUNT(*), 0) AS memberhistorycount FROM memberhistory WHERE active = 1 AND memberid = ? ORDER BY memberhistoryid DESC", [memberid]).then(function (rows, fields) {
				console.log("memberhistorycount",rows[0].memberhistorycount)
				resolve ({"memcount": rows[0].memberhistorycount});
			}).catch(function (err) {
				console.log("err",err)
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	}).catch(function (err) {
		reject(err);
	});
} 

module.exports.canceljobactivitystatus = function (memberid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) { 
			con.query("DELETE FROM memberhistory WHERE memberid = ?;UPDATE member SET doj = null WHERE memberid = ?;", [memberid,memberid]).then(function (rows, fields) {
				resolve({
					"memberid": memberid
				});
			});
		}).catch(function (err) {
			reject(err);
		});
	}).catch(function (err) {
		reject(err);
	});
}   

module.exports.canceljobactivitybydate = function (memberid,effectivedate,texcono) {
	return new app.promise(function (resolve, reject) {
		var startdate = moment(effectivedate).format("YYYY-MM-DD");
		console.log("startdate",startdate); 

		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
					DELETE FROM memberhistory WHERE memberid = ? AND DATE(startdate) = ? AND texcono = ?;
				*/
			});
			con.query(query, [memberid,startdate,texcono]).then(function (rows, fields) {
				resolve({"memberid": memberid});
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	}).catch(function (err) {
		reject(err);
	});
} 

// module.exports.checknewtexcono = function (memberid) {
// 	return new app.promise(function (resolve, reject) {
// 		mySqlConnection.connection().then(function (con) {
// 			con.query("SELECT * FROM memberhistory WHERE active = 1 AND memberid = ? ORDER BY memberhistoryid DESC LIMIT 2", [memberid]).then(function (rows, fields) {
// 				var rowsReturned = rows.length;
// 				var texcono = '';
// 				var data = rows;
// 				if (rowsReturned >= 2) {
// 					if (data[0].texcono != data[1].texcono) {
// 						var query = multiline.stripIndent(function () {
// 							/*
//                              DELETE FROM memberhistory WHERE memberid = ? ORDER BY memberhistoryid DESC LIMIT 1;
//                             */
// 						});
// 						con.query(query, [memberid]).then(function (rows, fields) {
// 							resolve({
// 								"texcono": data[0].texcono
// 							});
// 						});
// 					} else {
// 						resolve({
// 							"texcono": ""
// 						});
// 					}
// 				} else if (rowsReturned >= 1) {
// 					var query = multiline.stripIndent(function () {
// 						/*
//                             DELETE FROM memberhistory WHERE memberid = ? ORDER BY memberhistoryid DESC LIMIT 1;
// 								UPDATE member SET doj = null WHERE memberid = ?;
//                         */
// 					});
// 					con.query(query, [memberid,memberid]).then(function (rows, fields) {
// 						resolve({
// 							"texcono": data[0].texcono
// 						});
// 					});
// 				} else {
// 					resolve({
// 						"texcono": ""
// 					});
// 				}
// 			});
// 		}).catch(function (err) {
// 			reject(err);
// 		});
// 	}).catch(function (err) {
// 		reject(err);
// 	});
// }

module.exports.gettexconos = function () {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			con.query("SELECT IFNULL(texcono, '') AS texcono, IFNULL(texconologid, 0) AS texconologid FROM texconologs WHERE active = 1 ORDER BY texcono LIMIT 1;").then(function (rows, fields) {
				var rowsReturned = rows.length;
				if (rowsReturned > 0) {
					resolve({
						"texcono": rows[0].texcono,
						"texconologid": rows[0].texconologid,
					})
				} else {
					resolve({
						"texcono": '',
						"texconologid": 0,
					})
				}
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.updatetexconolog = function (texconologid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			con.query("UPDATE texconologs SET active = 0, modifdttm = CURRENT_TIMESTAMP WHERE texconologid = ? ;", [texconologid]).then(function (rows, fields) {
				resolve({
					"texconologid": texconologid
				})
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.deletememberhistory = function (memberid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
            		DELETE FROM memberhistory WHERE memberhistoryid = (SELECT memberhistoryid FROM memberhistory WHERE active = 1 AND memberid = ? ORDER BY memberhistoryid DESC LIMIT 1);
           		*/
			});
			con.query(query, [memberid]).then(function (rows, fields) {
				resolve({
					"memberid": memberid
				});
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.getopeningdate = function () {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			con.query("SELECT DATE_FORMAT(opendate, '%Y-%m-%d %H:%i:%s') AS opendate  FROM jobpostingdate ORDER by opendate DESC").then(function (rows, fields) {
				var rowsReturned = rows.length;
				if (rowsReturned > 0) {
					resolve({
						"opendate": rows[0].opendate
					})
				}
				resolve(result);
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.updateopeningdate = function (opendate) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			con.query('UPDATE jobpostingdate SET opendate = ? WHERE id=1;', [opendate]).then(function (rows, fields) {
				resolve("success");
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.exportvacancyjob = function () {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
SELECT
   a.projectid,
   a.projectno,
   a.projectname,
   a.organization AS client,
   a.district,
   a.region,
   a.agjobcode AS jobcode,
   a.agjobname,
   a.agreementvacancies,
   b.filledvacancies,
   c.postedvacancies,
   (Ifnull(c.postedvacancies, 0) - Ifnull(b.filledvacancies, 0) ) AS numberofvacancies,
   c.comments,
   c.startdate
FROM
   (SELECT
         ai.projectid,
         ae.clientid,
         ae.optionaltype,
         cl.organization,
         p.projectno,
         p.regionid,
         region.description AS 'region',
         p.districtid,
         district.description AS 'district',
         p.name AS projectname,
         jm.jobmasterid,
         jm.code AS agjobcode,
         jm.name AS agjobname,
         Sum(aed.numberofvacancies) agreementvacancies 
      FROM
         `agreement` ae 
                 
         INNER JOIN
            agreementinfo ai 
            ON ai.agreementid = ae.agreementid 
            AND ai.active = 1 
         INNER JOIN
            agreementdetail aed 
            ON aed.agreementinfoid = ai.agreementinfoid 
            AND aed.active = 1 
         INNER JOIN
            client cl 
            ON cl.clientid = ae.clientid 
            AND cl.active = 1 
         INNER JOIN
            project p 
            ON p.projectid = ai.projectid 
            AND p.active = 1 
         LEFT JOIN lookupvalue region ON
             region.lkvalid = p.regionid
            AND region.active = 1

         LEFT JOIN lookupvalue district ON
            district.lkvalid = p.districtid
            AND district.active = 1
         INNER JOIN
            jobmaster jm 
            ON jm.jobmasterid = aed.jobmasterid 
            AND jm.active = 1 
      WHERE
         ae.active = 1 
      GROUP BY
         projectid,
         jobmasterid,
         agjobcode 
      ORDER BY
         projectid,
         jm.jobmasterid
   )
   AS a 
                
   LEFT JOIN
      (
         SELECT
            ja.jobactivityid,
            ja.clientid,
            ja.projectid,
            ja.jobstatuscode,
            ja.texcono,
            jm.code AS jobcode,
            jm.name,
            p.projectno,
            jpd.jobmasterid,
            IFNULL(jpd.comments, "") AS comments,
            IFNULL(jpd.inplace, "") AS inplace,                 
            Count(ja.jobstatuscode) AS filledvacancies 
         FROM
            `jobactivity` ja 
            INNER JOIN
               jobpostingdetail jpd 
               ON jpd.jobpostingdetailid = ja.jobpostingdetailid 
               AND jpd.active = 1 
            INNER JOIN
               jobposting jp 
               ON jp.jobpostingid = jpd.jobpostingid 
               AND jp.active = 1 
            INNER JOIN
               jobmaster jm 
               ON jm.jobmasterid = jpd.jobmasterid 
               AND jm.active = 1 
            INNER JOIN
               project p 
               ON p.projectid = jp.projectid 
               AND p.active = 1 
         WHERE
            ja.jobstatuscode = 2  AND  date_format(jpd.closedate, '%d-%m-%Y') =(SELECT date_format(MAX(closedate), '%d-%m-%Y')  from jobpostingdetail)
         GROUP BY
            p.projectid,
            jpd.jobmasterid 
         ORDER BY
            p.projectid,
            jm.jobmasterid )
      AS b 
      ON a.projectid = b.projectid 
      AND a.agjobcode = b.jobcode
                 
        LEFT JOIN
                 (SELECT 
                        jp.projectid,
                        jpd.jobpostingdetailid, 
                        jpd.jobmasterid,
                        jm.code AS jobmastercode,
                        IFNULL(jpd.comments, "") AS comments,
                        jpd.numberofvacancies AS postedvacancies,
                        DATE_FORMAT(jpd.startdate, '%Y-%m-%d') AS startdate
                FROM `jobposting` jp
                 
                INNER JOIN jobpostingdetail jpd ON
                        jpd.jobpostingid = jp.jobpostingid
                AND jpd.active = 1 
                                  
                INNER JOIN jobmaster jm ON
                       jm.jobmasterid = jpd.jobmasterid
                AND jm.active = 1
                                      
                WHERE jp.active=1
                     AND   date_format(jpd.closedate, '%d-%m-%Y') =(SELECT date_format(MAX(closedate), '%d-%m-%Y')  from jobpostingdetail)        
        GROUP BY jpd.jobpostingdetailid
        ORDER BY jp.projectid, jm.jobmasterid) AS c
                  ON a.projectid = c.projectid 
      AND a.agjobcode = c.jobmastercode
            */
			});
			con.query(query).then(function (rows, fields) {
				var rowsReturned = rows.length;
				var result = [];
				var jobs = [];
				var sg = 0;
				var hsg = 0;
				var dvr = 0;
				var aso = 0;
				var po = 0;
				var ja = 0;
				var other = 0;
				var oa = 0;
				var gun = 0;
				var sgcomments = "";
				var hsgcomments = "";
				var dvrcomments = "";
				var asocomments = "";
				var pocomments = "";
				var jacomments = "";
				var oacomments = "";
				var guncomments = "";
				var othercomments = "";
				if (rowsReturned > 0) {
					for (var i = 0; i < rowsReturned; i++) {

						if (rows[i].comments == null) {
							rows[i].comments = "";
						}
						if (rows[i].startdate == null) {
							rows[i].startdate = "";
						}
						if (rows[i].jobcode == "SG") {
							sg = rows[i].numberofvacancies;
							sgcomments = rows[i].comments;
						} else if (rows[i].jobcode == "HSG") {
							hsg = rows[i].numberofvacancies;
							hsgcomments = rows[i].comments;
						} else if (rows[i].jobcode == "DVR") {
							dvr = rows[i].numberofvacancies;
							dvrcomments = rows[i].comments;
						} else if (rows[i].jobcode == "ASO") {
							aso = rows[i].numberofvacancies;
							asocomments = rows[i].comments;
						} else if (rows[i].jobcode == "PO") {
							po = rows[i].numberofvacancies;
							pocomments = rows[i].comments;
						} else if (rows[i].jobcode == "JA") {
							ja = rows[i].numberofvacancies;
							jacomments = rows[i].comments;
						} else if (rows[i].jobcode == "OTHER") {
							other = rows[i].numberofvacancies;
							othercomments = rows[i].comments;
						} else if (rows[i].jobcode == "OA") {
							oa = rows[i].numberofvacancies;
							oacomments = rows[i].comments;
						} else if (rows[i].jobcode == "GUN") {
							gun = rows[i].numberofvacancies;
							guncomments = rows[i].comments;
						}
						if ((i + 1 == rowsReturned) || (rows[i].projectno != rows[i + 1].projectno)) {
							var exportvacancy = new jobModel.exportvacancy(rows[i].client, rows[i].projectno, rows[i].projectname, rows[i].region, rows[i].district, sg, hsg, dvr, aso, po, ja, other, oa, gun, sgcomments, hsgcomments, dvrcomments, asocomments, pocomments, jacomments, oacomments, guncomments, othercomments, rows[i].startdate);
							result.push(exportvacancy);
							sg = 0;
							hsg = 0;
							dvr = 0;
							aso = 0;
							po = 0;
							ja = 0;
							other = 0;
							oa = 0;
							gun = 0;
							sgcomments = "";
							hsgcomments = "";
							dvrcomments = "";
							asocomments = "";
							pocomments = "";
							jacomments = "";
							oacomments = "";
							guncomments = "";
							othercomments = "";
						}
					}
				}
				resolve(result)
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.validatejobpostingdetail = function (jobpostingdetailid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
                
                SELECT * from jobpostingdetail WHERE jobpostingdetailid = ? AND active=1 AND close = 1;
                
               */
			});
			con.query(query, [jobpostingdetailid]).then(function (rows, fields) {
				if (rows.length > 0) {
					resolve({
						"response": true
					});
				} else {
					resolve({
						"response": false
					});
				}
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.insertcarryforward = function (vacancies) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var queries = '';
			if (vacancies.length > 0) {
				var queries = ''; 
				var cnt = 0;
				var jobmasterid = [];
				var jobmasterids = [];
				vacancies.forEach(function (item) { 
					cnt = Number(item.noofvacancies) - Number(item.confirmedcount);
					if (cnt > 0 ) 
						if (jobmasterid.includes(item.jobmasterid) === false) jobmasterid.push(item.jobmasterid);
					if (Number(item.noofvacancies) > 0 ) 
						if (jobmasterids.includes(item.jobmasterid) === false) jobmasterids.push(item.jobmasterid);
						
					if (Number(item.carryforwardid) == 0 || item.carryforwardid == null) {
						queries += con.format("INSERT INTO carryforward(clientid, projectid, jobmasterid, numberofvacancies, comments,inplaceof) VALUES (?,?,?,?,?,?);", [item.clientid, item.projectid, item.jobmasterid, cnt, item.jpdcomments, item.jpdinplace])
					} else {
						var jbdcomments = (item.jpdcomments) ? item.jpdcomments : '';
						var cccomments = (jbdcomments) ? ',' + item.ccomments : item.ccomments;

						var jpdinplace = (item.jpdinplace) ? item.jpdinplace : '';
						var ccinplace = (jpdinplace) ? ',' + item.cinplace : item.cinplace;
						var vacancy = cnt + Number(item.cnumberofvacancies);
						queries += con.format("UPDATE carryforward SET clientid = ?, projectid = ?, jobmasterid = ?, numberofvacancies = ?, comments = ?, inplaceof = ? WHERE carryforwardid = ?;", [item.clientid, item.projectid, item.jobmasterid, vacancy, jbdcomments + '' + cccomments, jpdinplace + '' + ccinplace, item.carryforwardid])
					}
				}); 
				queries += con.format("UPDATE jobmaster SET carryforwardstatus = 1 WHERE jobmasterid IN (?);", [jobmasterid]);
				queries += con.format("UPDATE jobmaster SET vacancystatus = 0 WHERE jobmasterid IN (?);", [jobmasterids]);
				con.query(queries).then(function (rows, fields) {
					resolve("success");
				}).catch(function (err) {
					reject(err);
				});
			}
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.memberjobactivity = async function (jobactivity, code, inplace, othercat, ipaddress) { 
	// return new app.promise(function (resolve, reject) {
	// 	mySqlConnection.connection().then(function (con) {
	// 		con.query('START TRANSACTION',function (rows1, fields) {
	// 			con.query("CALL memberjobactivity (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);", [jobactivity.memberid, code, jobactivity.jobpostingdetailid, jobactivity.clientid, jobactivity.projectid, jobactivity.texcono, inplace, othercat, jobactivity.changedby, ipaddress]).then(function (rows, fields) {
	// 				con.query('COMMIT',function (rows2, fields) {
	// 					con.end();  
						// var fs = require("fs");
						// var filepath = nconf.get('VACANCYERRORURL');
						// var datas = " Date - "+ new Date() + "  - After Applying Job DAL Call - After Procedure Success - JobDAL - IP - "+ipaddress+"  - memberid - "+jobactivity.memberid;
						// var stream = fs.createWriteStream(filepath, {'flags': 'a'});
						// 	stream.once('open', function(fd) {
						// 	stream.write(datas);
						// }); 
						// resolve({
						// 	"status": rows[0][0].status,
						// 	"jobactivityid": rows[1][0].jobactivityid,
						// 	"appliedcount": rows[1][0].appliedcount,
						// 	"rejected": rows[2][0].rejected
						// });
	// 				}).catch(function (err) {
	// 					reject(err);
	// 				});
	// 			}).catch(function (err) {
	// 				reject(err);
	// 			});
	// 		}).catch(function (err) {
	// 			reject(err);
	// 		});
	// 	}).catch(function (err) {
	// 		reject(err);
	// 	});
	// });
	try {
        const rows = await pool.query("CALL memberjobactivity (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);", [jobactivity.memberid, code, jobactivity.jobpostingdetailid, jobactivity.clientid, jobactivity.projectid, jobactivity.texcono, inplace, othercat, jobactivity.changedby, ipaddress]);  
			var fs = require("fs");
			var filepath = nconf.get('VACANCYERRORURL');
			var datas = " Date - "+ new Date() + "  - After Applying Job DAL Call - After Procedure Success - JobDAL - IP - "+ipaddress+"  - memberid - "+jobactivity.memberid;
			var stream = fs.createWriteStream(filepath, {'flags': 'a'});
				stream.once('open', function(fd) {
				stream.write(datas);
			}); 
			var dt = [{"status": rows[0][0].status,"jobactivityid": rows[1][0].jobactivityid,"appliedcount": rows[1][0].appliedcount,"rejected": rows[2][0].rejected}];
			return dt[0];
    } catch(err) {
        throw new Error(err)
    }
}

// job apply functions start

module.exports.checkjobactivestatus = function (jobpostingdetailid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) { 
			con.query('SELECT COUNT(*) as valid ,numberofvacancies,filledvacancies, waitingvacancies FROM jobpostingdetail WHERE jobpostingdetailid= ? AND  active=1 AND close = 1 LIMIT 1',[jobpostingdetailid]).then(function (rows, fields) { 
				console.log("rows[0]",rows[0]);
                if(parseInt(rows[0].valid) == 1) {
                    rows[0].filledvacancies = (rows[0].filledvacancies ? rows[0].filledvacancies : 0);
                    rows[0].numberofvacancies = (rows[0].numberofvacancies ? rows[0].numberofvacancies : 0);
                    rows[0].waitingvacancies = (rows[0].waitingvacancies ? rows[0].waitingvacancies : 0); 
					resolve({
                        "status": "success",
						"data":rows[0]
					});
				} else {
                    resolve({
                        "status": "1",
						"data":""
                    });
                }
			});
		}).catch(function (err) {
			logger.debug("checkjobactivestatus - Date "+new Date()+" "+err);
			reject(err);
		});
	});
} 

module.exports.checkselectedjobappliedstatus = function (memberid,jobpostingdetailid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) { 
			con.query('SELECT COUNT(*) AS appliedcounts FROM jobactivity WHERE memberid = ? AND jobpostingdetailid= ? AND  active=1',[memberid,jobpostingdetailid]).then(function (activityrows, fields) {
				console.log("rows, ipaddress-DALfile.js",activityrows[0]);
				resolve({
					"data":activityrows
				});
			});
		}).catch(function (err) {
			logger.debug("checkselectedjobappliedstatus - Date "+new Date()+" "+err);
			reject(err);
		});
	});
}

module.exports.checkweeklyappliedjobstatus = function (memberid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) { 
			con.query('SELECT count(*) as totalappliedcount,IFNULL(registrationno, 0) as registerationno FROM jobactivity ja where ja.active= 1 AND (ja.jobstatuscode = 0 OR ja.jobstatuscode = 1) AND ja.memberid = ? and ja.createdttm > (SELECT closedate FROM jobpostingdate GROUP BY closedate ORDER by closedate DESC) ORDER BY ja.createdttm DESC LIMIT 1',[memberid]).then(function (totalrows, fields) {
				resolve({
					"data":totalrows
				});
			});
		}).catch(function (err) {
			logger.debug("checkweeklyappliedjobstatus - Date "+new Date()+" "+err);
			reject(err);
		});
	});
}

module.exports.jobapplyprocedure = function (iswaiting,waitvacancy,fillvacnacy,noofvacancy,jobstatuscode,inplace, othercat, ipaddress,registernno,totalrows,jobactivity) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) { 
			con.query("CALL memberjobactivitynew (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?);", [iswaiting,waitvacancy,fillvacnacy,noofvacancy,jobstatuscode,inplace, othercat, ipaddress,registernno,totalrows,jobactivity.jobpostingdetailid,jobactivity.memberid,jobactivity.clientid,jobactivity.projectid,jobactivity.texcono,jobactivity.changedby]).then(function (rows, fields) { 
				resolve(rows); 
			}).catch(function (err) {
				logger.debug("jobapplyprocedure - Date "+new Date()+" "+err);
				reject(err);
			});
		}).catch(function (err) {
			logger.debug("MYSQL jobapplyprocedure - Date "+new Date()+" "+err);
			reject(err);
		});
	});
}

module.exports.checkoneyearstatus = function (memberid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) { 
			con.query('SELECT COUNT(*) as isvalid FROM memberhistory WHERE startdate >= DATE_SUB(now(), INTERVAL 12 MONTH) AND memberid = ? LIMIT 1',[memberid]).then(function (validrows, fields) {
				resolve({
					"data":validrows
				});
			});
		}).catch(function (err) {
			logger.debug("checkoneyearstatus - Date "+new Date()+" "+err);
			reject(err);
		});
	});
}

module.exports.checkagreementstatus = function (clientid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) { 
			con.query("SELECT lv1.description as wagetype FROM agreement a INNER JOIN lookupvalue lv1  ON lv1.lkvalid = a.wagetypeid AND lv1.lkdmncode ='WGTYPE' AND lv1.active = 1 WHERE clientid = ? LIMIT 1",[clientid]).then(function (wagerows, fields) {
				resolve({
					"data":wagerows
				});
			});
		}).catch(function (err) {
			logger.debug("checkagreementstatus - Date "+new Date()+" "+err);
			reject(err);
		});
	});
}

module.exports.checkmemberexperiencestatus = function (memberid) { 
	console.log("memberid",memberid);
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) { 
			con.query("SELECT IFNULL(SUM(IFNULL(a.days, 0)), 0) AS isoneyear FROM (SELECT *, DATEDIFF(enddate, startdate) AS days FROM memberhistory WHERE memberid = ?) a",[memberid]).then(function (agrows, fields) { 
				if (agrows[0].isoneyear <= 365) {
					iswaiting=1;
				} else {
					iswaiting=0;
				} 
				resolve({
					"iswaiting":iswaiting
				});
			}).catch(function (err) {
				logger.debug("checkmemberexperiencestatus - Date "+new Date()+" "+err);
				reject(err);
			});
		}).catch(function (err) {
			logger.debug("checkmemberexperiencestatus - Date "+new Date()+" "+err);
			reject(err);
		});
	});
}

module.exports.checkclosedprojectstatus = function (memberid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) { 
			con.query('SELECT IFNULL(COUNT(*), 0) AS ccount FROM closed_project_members WHERE memberid = ? AND active = 1 AND isselected = 0;',[memberid]).then(function (validrows, fields) {
				resolve({
					"clcount":validrows[0].ccount
				});
			});
		}).catch(function (err) {
			logger.debug("checkclosedprojectstatus - Date "+new Date()+" "+err);
			reject(err);
		});
	});
}


// job apply functions end


module.exports.checkjobfunctions = function (iswaiting, waitvacancy, fillvacnacy, noofvacancy, jobstatuscode, jobactivity, inplace, othercat, ipaddress, registernno, totalrows) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			if ((iswaiting == 1) || (fillvacnacy == noofvacancy)) {
				waitvacancy = parseInt(waitvacancy) + 1;
				curentvacnacy = parseInt(waitvacancy);
				jobstatuscode = '1';
			} else {
				fillvacnacy = parseInt(fillvacnacy) + 1;
				curentvacnacy = parseInt(fillvacnacy);
				jobstatuscode = '0';
			}
			var queries = '';
			queries = con.format("UPDATE jobpostingdetail SET filledvacancies = ?, waitingvacancies = ? WHERE jobpostingdetailid = ?;", [fillvacnacy, waitvacancy, jobactivity.jobpostingdetailid]);
			if (registernno == 0) {
				var query = { 
					dummy: jobactivity.memberid
				};
				con.query("INSERT INTO regno SET ?", query).then(function (rowss, fields) {
					registernno = rowss.insertId;
					jobDal.addjobDetails(jobstatuscode, jobactivity, inplace, othercat, ipaddress, registernno, queries, totalrows).then(function (output) {
						resolve(output);
					});
				});
			} else {
				jobDal.addjobDetails(jobstatuscode, jobactivity, inplace, othercat, ipaddress, registernno, queries, totalrows).then(function (output) {
					resolve(output);
				});
			}
		}).catch(function (err) {
			reject(err);
		});
	}); 
}
module.exports.addjobDetails = function (jobstatuscode, jobactivity, inplace, othercat, ipaddress, registernno, queries, totalrows) {
	// console.log('jobactivity',jobactivity);
	var dt = new Date();
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var values = {
				jobpostingdetailid: jobactivity.jobpostingdetailid,
				memberid: jobactivity.memberid,
				clientid: jobactivity.clientid,
				projectid: jobactivity.projectid,
				currentvacancies: curentvacnacy,
				jobstatuscode: jobstatuscode,
				texcono: jobactivity.texcono,
				registrationno: registernno,
				effectivedate: dt,
				inplace: inplace,
				othercat: othercat,
				changedby: jobactivity.changedby,
				ipaddress: ipaddress
			};
			console.log('values', values);
			con.query("INSERT INTO jobactivity SET ?", values).then(function (rowss, fields) {
				var jobactivityid = rowss.insertId;
				queries += con.format("INSERT INTO jobactivityhistory (jobactivityid, ondate, jobstatuscode, changedby) VALUES (?,?,?,?);", [jobactivityid, dt, jobstatuscode, jobactivity.changedby]);
				con.query(queries).then(function (rows, fields) {
					resolve({
						"status": "6",
						"jobactivityid": jobactivityid,
						"appliedcount": totalrows,
					});
				}).catch(function (err) {
					reject(err);
				});
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}


/* module.exports.memberjobactivity = function (jobactivity, code, inplace, othercat, ipaddress) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            
            con.query("CALL memberjobactivity (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);", [jobactivity.memberid, code, jobactivity.jobpostingdetailid, jobactivity.clientid, jobactivity.projectid, jobactivity.texcono, inplace, othercat, jobactivity.changedby, ipaddress]).then(function (rows, fields) {
                resolve({
                    "status": rows[0][0].status,
                    "jobactivityid": rows[1][0].jobactivityid,
                    "appliedcount": rows[1][0].appliedcount,
                    "blockdate": rows[2][0].blockdate,
                    "ispfblock": rows[2][0].ispfblk,
                });
            }).catch(function (err) {
                reject(err);
            });

        }).catch(function (err) {
            reject(err);
        });
    });
}
 */

module.exports.lastweekvacancy = function (closedate) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/* 
					SELECT 
						jp.jobpostingid,
						jpd.jobpostingdetailid,
						jp.clientid,
						jp.projectid,
						jpd.jobmasterid,
						IFNULL(jpd.numberofvacancies, 0) AS noofvacancies,
						IFNULL(jpd.filledvacancies, 0) AS filledvacancies,
						(jpd.numberofvacancies - IFNULL(jpd.filledvacancies, 0)) AS numberofvacancies,
						cf.numberofvacancies AS cnumberofvacancies,
						IFNULL(jpd.comments, "") AS jpdcomments,
						IFNULL(jpd.inplace, "") AS jpdinplace, 
						IFNULL(cf.comments, "") AS ccomments,
						IFNULL(cf.inplaceof, "") AS cinplace, 
						cf.carryforwardid,
						COUNT(ja.jobstatuscode) AS confirmedcount

					FROM jobposting jp 

					INNER JOIN jobpostingdetail jpd ON
						jp.jobpostingid = jpd.jobpostingid
					AND jpd.active = 1

					LEFT JOIN jobactivity ja ON
						jpd.jobpostingdetailid = ja.jobpostingdetailid
					AND ja.active = 1 AND ja.jobstatuscode = '2'

					LEFT JOIN carryforward cf ON
						cf.projectid = jp.projectid AND jpd.jobmasterid = cf.jobmasterid

					WHERE jpd.close  = 1

					GROUP BY  jpd.jobpostingdetailid

					ORDER BY jp.projectid, jpd.jobmasterid 
              	*/
			});
			con.query(query).then(function (rows, fields) {
				if (rows.length > 0) {
					resolve({
						"vacancy": rows
					})
				} else {
					resolve(0)
				}
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}


/*
module.exports.getcarryforwardexport = function (carryforwardid) {
	return new app.promise(function (resolve, reject) {
		var jobmaster = [];
		// get all the jobs
		_this.getjobmasterCFStatus(0).then(function (jm) {
			jobmaster = jm;
			mySqlConnection.connection().then(function (con) {
				var query = multiline.stripIndent(function () {
					/*	
						SELECT
							jp.carryforwardid AS carryforwardid,
							jp.clientid,
							jp.projectid,                      
							IFNULL(jp.numberofvacancies, 0) AS numberofvacancies,
							IFNULL(jp.balancevacancies, 0) AS balancevacancies,
							IFNULL(jp.comments, "") AS comments,
							IFNULL(jp.inplaceof, "") AS inplace,
							c.organization,
							p.projectno,
							p.name AS projectname,
							p.districtid,
							district.description As district,
							p.regionid,
							region.description AS region,
							jm.jobmasterid,
							jm.code AS jobmastercode,
							jm.name AS jobmastername,
							c.image, 
							wgtype.description As wagetype
						FROM
							carryforward jp
						INNER JOIN client c ON
							c.clientid = jp.clientid
						INNER JOIN agreement a ON
							a.clientid = jp.clientid
						AND a.active = 1
						INNER JOIN project p ON
							p.projectid = jp.projectid
						AND p.active = 1
						INNER JOIN jobmaster jm ON
							jm.jobmasterid = jp.jobmasterid
						AND jm.active = 1
						INNER JOIN lookupvalue district ON
							district.lkvalid = p.districtid
						AND district.active = 1
						INNER JOIN lookupvalue region ON
							region.lkvalid = p.regionid
						AND region.active = 1
						INNER JOIN lookupvalue wgtype ON
							wgtype.lkvalid = a.wagetypeid
						AND wgtype.active = 1
						WHERE jp.active = 1 AND numberofvacancies > 0
						AND case ? when 0 then 1 = 1 else  jp.carryforwardid = ? end
						ORDER BY p.projectno, jp.carryforwardid desc,  jm.jobmasterid;
                    
				});
				con.query(query, [carryforwardid, carryforwardid]).then(function (rows, fields) {
					var rowsReturned = rows.length;
					var result = [];
					var jobs = []
					jobmaster.forEach(function (value) {
						var job = new jobModel.carryforwardjob(0, value.jobmasterid, value.code, value.name, 0, "","", value.vacancystatus,value.carryforwardstatus);
						jobs.push(job);
					});
					if (rowsReturned > 0) {
						for (var i = 0; i < rowsReturned; i++) {
							jobs.forEach(function (value) {
								if (rows[i].jobmasterid === value.jobmasterid) {
									value.carryforwardid = rows[i].carryforwardid;
									value.numberofvacancies = rows[i].numberofvacancies;
									value.comments = rows[i].comments;
									value.inplace = rows[i].inplace;
								}
							})
							if ((i + 1 == rowsReturned) || (rows[i].projectid != rows[i + 1].projectid)) {
								var jobposting = new jobModel.getjobpostingexport(rows[i].jobpostingid, rows[i].clientid, rows[i].organization, rows[i].projectid, rows[i].projectno, rows[i].projectname, rows[i].districtid, rows[i].district, rows[i].regionid, rows[i].region, jobs, rows[i].image,rows[i].wagetype);
								result.push(jobposting);
								jobs = [];
								jobmaster.forEach(function (value) {
									var job = new jobModel.carryforwardjob(0, value.jobmasterid, value.code, value.name, 0, "", value.inplace,value.vacancystatus,value.carryforwardstatus);
									jobs.push(job);
								});
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
		});

	});
}
*/    

module.exports.getcarryforwardexport = function (carryforwardid) {
	return new app.promise(function (resolve, reject) {
		var jobmaster = [];
		// get all the jobs
		_this.getjobmaster(0).then(function (jm) {
			jobmaster = jm;
			mySqlConnection.connection().then(function (con) {
				var query = multiline.stripIndent(function () {
					/*	
						SELECT
							jp.carryforwardid AS carryforwardid,
							jp.clientid,
							jp.projectid,                      
							IFNULL(jp.numberofvacancies, 0) AS numberofvacancies,
							IFNULL(jp.balancevacancies, 0) AS balancevacancies,
							IFNULL(jp.comments, "") AS comments,
							IFNULL(jp.inplaceof, "") AS inplace,
							c.organization,
							p.projectno,
							p.name AS projectname,
							p.districtid,
							district.description As district,
							p.regionid,
							region.description AS region,
							jm.jobmasterid,
							jm.code AS jobmastercode,
							jm.name AS jobmastername,
							jm.carryforwardstatus,
							jm.vacancystatus,
							c.image, 
							wgtype.description As wagetype
						FROM
							carryforward jp
						INNER JOIN project p ON
							p.projectid = jp.projectid
						AND p.active = 1

						INNER JOIN client c ON
							c.clientid = jp.clientid
						AND c.active = 1 

						INNER JOIN agreementinfo ai ON
							ai.projectid = p.projectid
						AND ai.active = 1

						INNER JOIN agreement a ON
							a.agreementid = ai.agreementid
						AND a.active = 1

						INNER JOIN jobmaster jm ON
							jm.jobmasterid = jp.jobmasterid
						AND jm.active = 1

						INNER JOIN lookupvalue district ON
							district.lkvalid = p.districtid
						AND district.active = 1
						INNER JOIN lookupvalue region ON
							region.lkvalid = p.regionid
						AND region.active = 1
						INNER JOIN lookupvalue wgtype ON
							wgtype.lkvalid = a.wagetypeid
						AND wgtype.active = 1
						WHERE jp.active = 1 AND numberofvacancies > 0
						AND case ? when 0 then 1 = 1 else  jp.carryforwardid = ? end
						ORDER BY p.projectno, jp.carryforwardid desc,  jm.jobmasterid;
                    */
				});
				con.query(query, [carryforwardid, carryforwardid]).then(function (rows, fields) {
					var rowsReturned = rows.length;
					var result = [];
					var jobs = [];
					var jobsCF = [];
					jobmaster.forEach(function (value) {  
						var job = new jobModel.carryforwardjob(0, value.jobmasterid, value.code, value.name, 0, "","",value.vacancystatus,value.carryforwardstatus); 
						if (value.carryforwardstatus == 1) {
							jobsCF.push(job);
						}
						jobs.push(job); 
					});

					if (rowsReturned > 0) {
						for (var i = 0; i < rowsReturned; i++) {

							jobs.forEach(function (value) {
								if (rows[i].jobmasterid === value.jobmasterid) {
									value.carryforwardid = rows[i].carryforwardid;
									value.numberofvacancies = rows[i].numberofvacancies;
									value.comments = rows[i].comments;
									value.inplace = rows[i].inplace;
								}
							})
							jobsCF.forEach(function (value) {
								if (rows[i].jobmasterid === value.jobmasterid) {
									value.carryforwardid = rows[i].carryforwardid;
									value.numberofvacancies = rows[i].numberofvacancies;
									value.comments = rows[i].comments;
									value.inplace = rows[i].inplace;
								}
							})
							if ((i + 1 == rowsReturned) || (rows[i].projectid != rows[i + 1].projectid)) {
								var jobposting = new jobModel.getjobposting(rows[i].jobpostingid, rows[i].clientid, rows[i].organization, rows[i].projectid, rows[i].projectno, rows[i].projectname, rows[i].districtid, rows[i].district, rows[i].regionid, rows[i].region, jobs, rows[i].image,rows[i].wagetype);
								jobposting.jobsCF = jobsCF;
								result.push(jobposting);
								jobs = [];
								jobsCF = [];
								jobmaster.forEach(function (value) {
									var job = new jobModel.carryforwardjob(0, value.jobmasterid, value.code, value.name, 0, "", value.inplace,value.vacancystatus,value.carryforwardstatus);
									if (value.carryforwardstatus == 1) {
										jobsCF.push(job);
									}
									jobs.push(job); 
								});
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
		});

	});
}

module.exports.getcarryforward = function (carryforwardid) {
	return new app.promise(function (resolve, reject) {
		var jobmaster = [];
		// get all the jobs
		_this.getjobmaster(0).then(function (jm) {
			jobmaster = jm; 
			mySqlConnection.connection().then(function (con) {
				var query = multiline.stripIndent(function () {
					/*
                  		SELECT
							jp.carryforwardid AS carryforwardid,
							jp.clientid,
							jp.projectid,                      
							IFNULL(jp.numberofvacancies, 0) AS numberofvacancies,
							IFNULL(jp.balancevacancies, 0) AS balancevacancies,
							IFNULL(jp.comments, "") AS comments,
							IFNULL(jp.inplaceof, "") AS inplace,
							c.organization,
							p.projectno,
							p.name AS projectname,
							p.districtid,
							district.description As district,
							p.regionid,
							region.description AS region,
							jm.jobmasterid,
							jm.code AS jobmastercode,
							jm.name AS jobmastername,
							jm.carryforwardstatus,
							jm.vacancystatus,
							c.image
							FROM
								carryforward jp
						INNER JOIN client c ON
							c.clientid = jp.clientid
						AND c.active = 1

						INNER JOIN project p ON
							p.projectid = jp.projectid
						AND p.active = 1

						INNER JOIN jobmaster jm ON
							jm.jobmasterid = jp.jobmasterid
						AND jm.active = 1

						INNER JOIN lookupvalue district ON
							district.lkvalid = p.districtid
						AND district.active = 1

						INNER JOIN lookupvalue region ON
							region.lkvalid = p.regionid
						AND region.active = 1

						WHERE jp.active = 1 AND numberofvacancies > 0

						AND case ? when 0 then 1 = 1 else  jp.carryforwardid = ? end
						ORDER BY p.projectno, jp.carryforwardid desc,  jm.jobmasterid;
					*/
				});
				con.query(query, [carryforwardid, carryforwardid]).then(function (rows, fields) {
					var rowsReturned = rows.length;
					var result = [];
					var jobs = []
					var jobsCF = []
					jobmaster.forEach(function (value) {  
						var job = new jobModel.carryforwardjob(0, value.jobmasterid, value.code, value.name, 0, "","",value.vacancystatus,value.carryforwardstatus);  
						// console.log("value.carryforwardstatus",value.carryforwardstatus);
						if (value.carryforwardstatus == 1) {
							jobsCF.push(job);
						}
						jobs.push(job); 
					});
					if (rowsReturned > 0) {
						for (var i = 0; i < rowsReturned; i++) {
							jobs.forEach(function (value) {
								if (rows[i].jobmasterid === value.jobmasterid) {
									value.carryforwardid = rows[i].carryforwardid;
									value.numberofvacancies = rows[i].numberofvacancies;
									value.comments = rows[i].comments;
									value.inplace = rows[i].inplace;
								}
							})
							jobsCF.forEach(function (value) {
								if (rows[i].jobmasterid === value.jobmasterid) {
									value.carryforwardid = rows[i].carryforwardid;
									value.numberofvacancies = rows[i].numberofvacancies;
									value.comments = rows[i].comments;
									value.inplace = rows[i].inplace;
								}
							})
							if ((i + 1 == rowsReturned) || (rows[i].projectid != rows[i + 1].projectid)) {
								var jobposting = new jobModel.getjobposting(rows[i].jobpostingid, rows[i].clientid, rows[i].organization, rows[i].projectid, rows[i].projectno, rows[i].projectname, rows[i].districtid, rows[i].district, rows[i].regionid, rows[i].region, jobs, rows[i].image,'');
								jobposting.jobsCF = jobsCF; 
								// console.log('jobposting.jobsCF',jobposting.jobsCF);
								result.push(jobposting);
								jobs = [];
								jobsCF = [];
								jobmaster.forEach(function (value) {
									var job = new jobModel.carryforwardjob(0, value.jobmasterid, value.code, value.name, 0, "", value.inplace,value.vacancystatus,value.carryforwardstatus);
									if (value.carryforwardstatus == 1) {
										jobsCF.push(job);
									}
									jobs.push(job); 
								});
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
		});

	});
}
	
module.exports.validatejobcarryforward = function (projectid, clientid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
				SELECT
				
				 * 
				FROM
				 
				carryforward
				
				WHERE projectid = ? AND clientid = ? AND active = 1
				   */
			});
			con.query(query, [projectid, clientid]).then(function (rows, fields) {
				if (rows.length > 0) {
					var response = 1;
					resolve({
						"response": response
					});
				} else {
					var response = 2;
					resolve({
						"response": response
					});
				}
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.createcarryforward = function (jobposting) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var queries = '';
			if (jobposting.jobs.length > 0) {
				var queries = '';
				var jobmasterid = [];
				jobposting.jobs.forEach(function (item) {  
					
					if ((item.numberofvacancies ? parseInt(item.numberofvacancies) : 0) > 0) 
						jobmasterid.push(item.jobmasterid);

					if (item.carryforwardid > 0) {
						queries += con.format("UPDATE carryforward SET clientid = ?, projectid = ?, jobmasterid = ?, numberofvacancies = ?, comments = ?, inplaceof = ? WHERE carryforwardid = ?;", [jobposting.clientid, jobposting.projectid, item.jobmasterid, (item.numberofvacancies ? parseInt(item.numberofvacancies) : 0), item.comments, item.inplace, item.carryforwardid])
					} else if ((item.numberofvacancies ? parseInt(item.numberofvacancies) : 0) > 0) { 
						queries += con.format("INSERT INTO carryforward(clientid, projectid, jobmasterid, numberofvacancies, comments, inplaceof) VALUES (?,?,?,?,?,?);", [jobposting.clientid, jobposting.projectid, item.jobmasterid, (item.numberofvacancies ? parseInt(item.numberofvacancies) : 0), item.comments, item.inplace])
					} 
				});
				queries += con.format("UPDATE jobmaster SET carryforwardstatus = 1 WHERE jobmasterid IN (?);", [jobmasterid])
				con.query(queries).then(function (rows, fields) {
					resolve("success");
				}).catch(function (err) {
					reject(err);
				});
			}
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.deletecarryforward = function (projectid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			logger.debug(" Date - "+ new Date() + " - Carryforward DAL file Entry ProjectID - "+projectid);
			var query = multiline.stripIndent(function () {
				/*
            		DELETE FROM carryforward WHERE projectid = ?;
           		*/
			});
			con.query(query, [projectid]).then(function (rows, fields) {
				resolve("success");
			}).catch(function (err) {
				logger.debug(" Date - "+ new Date() + " - Carryforward DAL file MYSQL Error -- "+err);
				reject(err);
			});
		}).catch(function (err) {
			logger.debug(" Date - "+ new Date() + " - Carryforward DAL file Error -- "+err);
			reject(err);
		});
	});
}

module.exports.getforwardvacancy = function () {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
					SELECT
						jp.carryforwardid AS carryforwardid,
						jp.clientid,
						jp.projectid,                      
						IFNULL(jp.numberofvacancies, 0) AS numberofvacancies,
						IFNULL(jp.balancevacancies, 0) AS balancevacancies,
						IFNULL(jp.comments, "") AS comments,
						IFNULL(jp.inplaceof, "") AS inplace,                    
						c.organization AS client,
						p.projectno,
						p.name AS projectname,
						p.districtid,
						district.description As district,
						p.regionid,
						region.description AS region,
						jm.jobmasterid,
						jm.code AS jobcode,
						jm.name AS jobmastername,
						c.image
					FROM carryforward jp

					INNER JOIN client c ON
					c.clientid = jp.clientid
					AND c.active = 1

					INNER JOIN project p ON
					p.projectid = jp.projectid
					AND p.active = 1

					INNER JOIN jobmaster jm ON
					jm.jobmasterid = jp.jobmasterid
					AND jm.active = 1

					INNER JOIN lookupvalue district ON
					district.lkvalid = p.districtid
					AND district.active = 1

					INNER JOIN lookupvalue region ON
					region.lkvalid = p.regionid
					AND region.active = 1

					WHERE jp.active = 1 AND numberofvacancies > 0

					ORDER BY jp.projectid,jp.jobmasterid ASC;
           		*/
			});
			con.query(query).then(function (rows, fields) {
				var rowsReturned = rows.length;
				var result = [];
				var jobs = [];
				var values = [];
				var jobmasters = [];
				if (rowsReturned > 0) {
					for (var i = 0; i < rowsReturned; i++) { 

						if (rows[i].comments == null) {
							rows[i].comments = "";
						}
						if (rows[i].startdate == null) {
							rows[i].startdate = "";
						}
						if (Number(rows[i].numberofvacancies) > 0 )  {
							if (jobmasters.includes(rows[i].jobmasterid) === false) {
								jobmasters.push(rows[i].jobmasterid);
							}
						}
							
						var job = new jobModel.movevacancy(rows[i].jobmasterid,rows[i].jobcode,rows[i].jobmastername,rows[i].numberofvacancies, rows[i].inplace, rows[i].comments);
						jobs.push(job); 

						if ((i + 1 == rowsReturned) || (rows[i].projectno != rows[i + 1].projectno)) {
							var exportvacancy = new jobModel.forwardvacancy(rows[i].client, rows[i].projectno, rows[i].projectname, rows[i].region, rows[i].district, jobs, rows[i].startdate,rows[i].clientid,rows[i].projectid);
							result.push(exportvacancy); 
							jobs = [];
						}
					}
				}
				values.push(result);
				values.push(jobmasters);
				resolve(values)
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.updatecarryforward = function () {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var queries ="INSERT INTO carryforward_history SELECT * FROM carryforward;UPDATE jobmaster SET carryforwardstatus = 0;TRUNCATE TABLE carryforward;UPDATE vacancypublish SET vacancycustomerview= 1 WHERE id= 1;";
			con.query(queries).then(function (rows, fields) {
				resolve("success")
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

/*module.exports.updatecarryforward = function () {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			con.query('TRUNCATE TABLE carryforward;').then(function (rows, fields) {
				resolve("success")
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}*/

// Gets the service for generate salary slip
module.exports.salarygeneration = function (projectid, clientid, monthandyear) {
	// console.log("---===---==", projectid + "  " + monthandyear);
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
					SELECT 
						att.attendanceid,
						att.clientid,
						att.projectid,
						att.memberid,
						att.monthandyear,
						att.presentdays,
						att.edhold,
						att.eddays,
						att.lreserve,
						att.othours,
						att.jobmasterid,
						att.edstatus,
						att.status,
						ag.wagetypeid, 
						ag.wageyearid, 
						ag.wageareaid,
						ag.wagecategoryid,
						wg.particularid,
						wg.particularamount,
						lk2.code AS salcode
					FROM attendance att
					INNER JOIN agreement ag ON ag.clientid = att.clientid AND ag.active = 1
					INNER JOIN project pr ON pr.projectid = att.projectid
					INNER JOIN agreementinfo ai ON ai.agreementid = ag.agreementid and pr.projectid=ai.projectid
					INNER JOIN wages wg ON wg.wagetypeid = ag.wagetypeid AND wg.wageyearid = ag.wageyearid AND wg.wagecategoryid = ag.wagecategoryid AND wg.wageareaid = ag.wageareaid AND att.jobmasterid = wg.jobmasterid  AND wg.active = 1
					INNER JOIN lookupvalue lk2 ON lk2.lkvalid = wg.particularid AND lk2.active = 1
					WHERE att.status IN (1,8) AND att.projectid = ? AND att.monthandyear = ? AND att.active = 1
					ORDER BY att.memberid, wg.jobmasterid, wg.particularid;

					SELECT ao.amount,lv.lkdmncode,ao.memberid,ao.attendanceid,ao.attendance_other_expense_id FROM attendance_other_expense ao 
					INNER JOIN lookupvalue lv ON lv.lkvalid = ao.expense_type AND (lv.lkdmncode = 'WGOTRDD' OR lv.lkdmncode = 'WGOTRAL')
					WHERE ao.projectid = ? AND ao.monthandyear = ?

           		*/
			});
			con.query(query, [projectid, monthandyear,projectid, monthandyear]).then(function (rowss, fields) {
				var rows = rowss[0];
				var expenses = rowss[1];
				var result = [];
				var promises = [];
				var rowsReturned = rows.length;
				var noofdays = getMonthDays(monthandyear);
				if (rowsReturned > 0) {
					var items = [];
					var basic = 0;
					var da = 0;
					var hra = 0;
					var cca = 0;
					var ma = 0;
					var epf = 0;
					var edli = 0;
					var admchr = 0;
					var bonus = 0;
					var gratuity = 0;
					var unifdt = 0;
					var leapay = 0;
					var conveyance = 0;
					var washallow = 0;
					var lic = 0;
					var other1 = 0;
					var other2 = 0;
					var ratehd = 0;
					var components;
					var totalduty = 0;
					var ncbasic = 0;
					var edamount = 0;
					var gross = 0;
					var netpay = 0;
					var otherallowance = 0;
					var otherdeductions = 0;

					for (var i = 0; i < rowsReturned; i++) {
						var items = [];
						totalduty = rows[i].presentdays;
						if(rows[i].edstatus == 1 && rows[i].status == 8) {

							if (rows[i].edhold == 1) {
								rows[i].eddays = 0;
								rows[i].othours = 0;
								edamount = 0;
							}
							ratehd = rows[i].particularamount;
							if (rows[i].salcode == 'RATEHD') {
								if (rows[i].eddays != 0)
									edamount = ratehd * rows[i].eddays / noofdays;

								if (rows[i].othours != 0)
									edamount = ratehd * parseFloat(rows[i].othours / 8) / noofdays;
							}
							gross = basic + edamount + hra + ma + unifdt + leapay + bonus + washallow + other1;
							netpay = gross - (epf + other2);
							gross = Number((gross).toFixed(0));
							netpay = Number((netpay).toFixed(0));
						} else {
							if (rows[i].salcode == 'BASIC') {
								ncbasic = parseFloat(rows[i].particularamount);
								basic = (rows[i].particularamount * totalduty) / noofdays;
							}
							if (rows[i].edhold == 1) {
								rows[i].eddays = 0;
								rows[i].othours = 0;
								edamount = 0;
							}
							if (rows[i].salcode == 'DA') {
								da = (rows[i].particularamount * totalduty) / noofdays;
							}
							if (rows[i].salcode == 'HRA') {
								hra = (rows[i].particularamount * totalduty) / noofdays;
							}
							if (rows[i].salcode == 'CCA') {
								cca = (rows[i].particularamount * totalduty) / noofdays;
							}
							if (rows[i].salcode == 'MALLWN') {
								ma = (rows[i].particularamount * totalduty) / noofdays;
							}
							if (rows[i].salcode == 'EPF') {
								epf = (rows[i].particularamount * totalduty) / noofdays;
							}
							if (rows[i].salcode == 'EDLI') {
								edli = (rows[i].particularamount * totalduty) / noofdays;
							}
							if (rows[i].salcode == 'ADCHRG') {
								admchr = (rows[i].particularamount * totalduty) / noofdays;
							}
							if (rows[i].salcode == 'BONUS') {
								bonus = (rows[i].particularamount * totalduty) / noofdays;
							}
							if (rows[i].salcode == 'GRAT') {
								gratuity = (rows[i].particularamount * totalduty) / noofdays;
							}
							if (rows[i].salcode == 'UNIFRM') {
								unifdt = (rows[i].particularamount * totalduty) / noofdays;
							}
							if (rows[i].salcode == 'RELCHRG') {
								leapay = (rows[i].particularamount * totalduty) / noofdays;
							}
							if (rows[i].salcode == 'CONVEY') {
								conveyance = (rows[i].particularamount * totalduty) / noofdays;
							}
							if (rows[i].salcode == 'WASH') {
								washallow = (rows[i].particularamount * totalduty) / noofdays;
							}
							if (rows[i].salcode == 'LIC') {
								lic = (rows[i].particularamount * totalduty) / noofdays;
							}
							if (rows[i].salcode == 'OTHER1') {
								other1 = (rows[i].particularamount * totalduty) / noofdays;
							}
							if (rows[i].salcode == 'OTHER2') {
								other2 = (rows[i].particularamount * totalduty) / noofdays;
							}
							if (rows[i].salcode == 'MA') {
								ma = (rows[i].particularamount * totalduty) / noofdays;
							}
							ratehd = rows[i].particularamount;
							if (rows[i].salcode == 'RATEHD') {
								if (rows[i].eddays != 0)
									edamount = ratehd * rows[i].eddays / noofdays;

								if (rows[i].othours != 0)
									edamount = ratehd * parseFloat(rows[i].othours / 8) / noofdays;
							}
							if (rows[i].salcode == 'LR') {
								leapay = (rows[i].particularamount * totalduty) / noofdays;
							}
							gross = Math.round(basic) + Math.round(edamount) + Math.round(hra) + Math.round(ma) + Math.round(unifdt) + Math.round(leapay) + Math.round(bonus) + Math.round(washallow) + Math.round(other1);
							netpay = Math.round(gross) - Math.round((epf + other2));
							gross = Number((gross).toFixed(0));
							netpay = Number((netpay).toFixed(0));
						} 
						components = new jobModel.salarycomponents(Math.round(edamount), Math.round(ncbasic), Math.round(basic), Math.round(da), Math.round(hra), Math.round(cca), Math.round(ma), Math.round(epf), Math.round(edli), Math.round(admchr), Math.round(bonus), Math.round(gratuity), Math.round(unifdt), Math.round(leapay), Math.round(conveyance), Math.round(washallow), Math.round(lic), Math.round(other1), Math.round(other2), Math.round(ratehd), Math.round(gross), Math.round(netpay),Math.round(otherallowance),Math.round(otherdeductions));
						if ((i + 1 == rowsReturned) || (rows[i].attendanceid != rows[i + 1].attendanceid)) {
							var res = i;
							for(var j = 0;j < expenses.length; j++) {
								if(expenses[j].attendanceid == rows[res].attendanceid) {
									if (expenses[j].lkdmncode == 'WGOTRAL') {
										otherallowance += parseFloat(expenses[j].amount);
									}
									if (expenses[j].lkdmncode == 'WGOTRDD') {
										otherdeductions += parseFloat(expenses[j].amount);
									}
								}
							}
							components.otherallowance = otherallowance;
							components.otherdeductions = otherdeductions;
							components.gross += otherallowance;
							components.netpay += otherallowance;
							components.gross -= otherdeductions;
							components.netpay -= otherdeductions;
							var selling = new jobModel.salarymember(rows[res].memberid, rows[res].firstname, rows[res].texcono, rows[res].serviceno, rows[res].wagetype, rows[res].wageyear, rows[res].clientname, rows[res].projectno, rows[res].projectname, rows[res].monthandyear, rows[res].jobcode, rows[res].jobname, rows[res].projectid, rows[res].clientid, rows[res].attendanceid, rows[res].jobpostingdetailid, rows[res].jobmasterid, rows[res].wagetypeid, rows[res].wageyearid, rows[res].wageareaid, rows[res].presentdays, rows[res].eddays, rows[res].othours, rows[res].wagecategoryid, components);
							result.push(selling);

							items = [];
							basic = 0;
							da = 0;
							hra = 0;
							cca = 0;
							ma = 0;
							epf = 0;
							edli = 0;
							admchr = 0;
							bonus = 0;
							gratuity = 0;
							unifdt = 0;
							leapay = 0;
							conveyance = 0;
							washallow = 0;
							lic = 0;
							other1 = 0;
							other2 = 0;
							ratehd = 0;
							totalduty = 0;
							ncbasic = 0;
							edamount = 0;
							gross = 0;
							netpay = 0;
							components;
							otherdeductions = 0;
							otherallowance = 0;

						}
					}
					//console.log('result',JSON.stringify(result));
					resolve(result);
				} else {
					reject("wages");
				}
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.otherExpenses = function (memberid, attendanceid, i) {
	console.log('memberid', memberid);
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
                  	SELECT ao.amount,lv.lkdmncode FROM attendance_other_expense ao 
					INNER JOIN lookupvalue lv ON lv.lkvalid = ao.expense_type AND (lv.lkdmncode = 'WGOTRDD' OR lv.lkdmncode = 'WGOTRAL')
					WHERE ao.memberid = ? AND ao.attendanceid = ?
           		*/
			});
			con.query(query, [memberid, attendanceid]).then(function (rows, fields) {
				var otherallowance = 0;
				var otherdeductions = 0;
				for (var j = 0; j < rows.length; j++) {
					if (rows[j].lkdmncode == 'WGOTRAL') {
						otherallowance += parseFloat(rows[j].amount);
					}
					if (rows[j].lkdmncode == 'WGOTRDD') {
						otherdeductions += parseFloat(rows[j].amount);
					}
				}
				rows.otherdeductions = otherdeductions;
				rows.otherallowance = otherallowance;
				var result = [];
				result.push({
					'otherallowance': otherallowance,
					'otherdeductions': otherdeductions,
					'res': i
				});
				resolve(result);
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.generatesalary = function (result, projectid, monthandyear, payslipno) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			if (result.length > 0) {
				var queries = '';
				for (var i = 0; i < result.length; i++) {
					// console.log('result[i].',result[i]);
					var ino = (i + 1) + '';
					var value = ino.length >= 3 ? ino : new Array(3 - ino.length + 1).join('0') + ino;
					individualpayslipno = payslipno + '-' + value;
					queries += con.format("INSERT INTO salaryslip (payslipno,individualpayslipno, clientid, projectid, memberid, jobpostingdetailid, jobmasterid, attendanceid, monthandyear, presentdays, eddays, othours, wagetypeid, wageyearid, wageareaid,wagecategoryid, ncbasic,  edamount, basic, da, hra, cca, ma, epf, edli, admchr, bonus, gratuity, unifdt, leapay, conveyance, washallow, lic, other1, other2, ratehd,grossamount,netpay,status,otherallowance,otherdeductions) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);", [payslipno, individualpayslipno, result[i].clientid, result[i].projectid, result[i].memberid, result[i].jobpostingdetailid, result[i].jobmasterid, result[i].attendanceid, result[i].attendancemonth, result[i].presentdays, result[i].eddays, result[i].othours, result[i].wagetypeid, result[i].wageyearid, result[i].wageareaid, result[i].wagecategoryid, result[i].salarycomponents.ncbasic, result[i].salarycomponents.edamount, result[i].salarycomponents.basic, result[i].salarycomponents.da, result[i].salarycomponents.hra, result[i].salarycomponents.cca, result[i].salarycomponents.ma, result[i].salarycomponents.epf, result[i].salarycomponents.edli, result[i].salarycomponents.admchr, result[i].salarycomponents.bonus, result[i].salarycomponents.gratuity, result[i].salarycomponents.unifdt, result[i].salarycomponents.leapay, result[i].salarycomponents.conveyance, result[i].salarycomponents.washallow, result[i].salarycomponents.lic, result[i].salarycomponents.other1, result[i].salarycomponents.other2, result[i].salarycomponents.ratehd, result[i].salarycomponents.gross, result[i].salarycomponents.netpay, 3, result[i].salarycomponents.otherallowance, result[i].salarycomponents.otherdeductions]);
				}
				//  console.log('queries',queries);
				con.query(queries).then(function (rows, fields) {
					resolve({
						"projectid": projectid,
						"monthandyear": monthandyear
					});
				}).catch(function (err) {
					reject(err);
				});
			}
		}).catch(function (err) {
			reject(err);
		});
	});
}

// Gets the service for packagesearch
module.exports.getpayslip = function (projectid, monthandyear, payslipno) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
					SELECT
						ss.*,
						cl.organization AS clientname,
						pr.projectno AS projectno,
						pr.name AS projectname,
						pr.addressline1, 
						pr.addressline2, 
						pr.addressline3, 
						pr.designation, 
						pr.pincode,
						wt.description AS wagetype,
						wy.description AS wageyear,
						jm.code AS jobcode,
						jm.name AS jobname,
						m.firstname,
						m.serviceno,
						m.texcono,
						m.accountno,
						m.panno,
						m.uanno,
						m.pfno
					FROM 
						salaryslip ss
					INNER JOIN member m ON
						m.memberid = ss.memberid AND m.active = 1
					INNER JOIN `client` cl ON
						cl.clientid = ss.clientid AND cl.active = 1
					INNER JOIN `project` pr ON
						pr.projectid = ss.projectid AND pr.active = 1
					INNER JOIN jobmaster jm ON
						jm.jobmasterid = ss.jobmasterid AND jm.active = 1
					INNER JOIN lookupvalue wt ON
						wt.lkvalid = ss.wagetypeid AND wt.active = 1
					INNER JOIN lookupvalue wy ON
						wy.lkvalid = ss.wageyearid AND wy.active = 1
					WHERE ss.projectid = ? AND ss.monthandyear = ? AND ss.bill_type = 0 AND ss.status != 7 AND ss.payslipno = ? AND ss.active = 1
					ORDER BY FIELD(jm.jobmasterid,3,5,4,2,1,6,8,9,7) ,m.texcono ASC;


					SELECT
						ss.*,
						cl.organization AS clientname,
						pr.projectno AS projectno,
						pr.name AS projectname,
						pr.addressline1, 
						pr.addressline2, 
						pr.addressline3, 
						pr.designation, 
						pr.pincode,
						wt.description AS wagetype,
						wy.description AS wageyear,
						jm.code AS jobcode,
						jm.name AS jobname,
						m.firstname,
						m.serviceno,
						m.texcono,
						m.accountno,
						m.panno,
						m.uanno,
						m.pfno
					FROM 
						salaryslip ss
					INNER JOIN member m ON
						m.memberid = ss.memberid AND m.active = 1
					INNER JOIN `client` cl ON
						cl.clientid = ss.clientid AND cl.active = 1
					INNER JOIN `project` pr ON
						pr.projectid = ss.projectid AND pr.active = 1
					INNER JOIN jobmaster jm ON
						jm.jobmasterid = ss.jobmasterid AND jm.active = 1
					INNER JOIN lookupvalue wt ON
						wt.lkvalid = ss.wagetypeid AND wt.active = 1
					INNER JOIN lookupvalue wy ON
						wy.lkvalid = ss.wageyearid AND wy.active = 1
					WHERE ss.projectid = ? AND ss.monthandyear = ? AND ss.bill_type = 0 AND ss.status != 7 AND ss.presentdays > 0 AND ss.eddays = 0 AND ss.active = 1
					ORDER BY FIELD(jm.jobmasterid,3,5,4,2,1,6,8,9,7) ,m.texcono ASC

           		*/
			});
			con.query(query, [projectid, monthandyear, payslipno,projectid,monthandyear]).then(function (rowss, fields) {
			//	console.log('rows',rows[0]);
				var result = [];
				var rows = rowss[0];
				var rows1 = rowss[1];
				var rowsReturned = rows.length;
				var rowsReturned1 = rows1.length;
				var salrysliporg=[];
				//console.log('sdf', rows[1])
				if (rowsReturned > 0) {
					for (var i = 0; i < rowsReturned; i++) {
						//console.log('rowsa',rows1);
						
						var filinvoice = _.filter(rows1, function(item) {
							//console.log(item.memberid) ;
							if(item.memberid==rows[i].memberid && item.projectid == rows[i].projectid && item.clientid == rows[i].clientid && item.monthandyear == rows[i].monthandyear  ) {
								
								 salrysliporg = new jobModel.getsalarydetail(item.salaryslipid, item.memberid, item.accountno, item.firstname, item.serviceno, item.texcono, item.jobcode, item.jobname, item.projectid, item.clientid, item.clientname, item.projectno, item.projectname, item.designation, item.addressline1, item.addressline2, item.addressline3, item.pincode, item.wagetype, item.wageyear, item.monthandyear, item.presentdays, item.othours, item.basic, item.da, item.hra, item.cca, item.ma, item.epf, item.edli, item.admchr, item.bonus, item.gratuity, item.unifdt, item.leapay, item.conveyance, item.washallow, item.lic, item.other1, item.other2, item.ratehd, item.ncbasic, item.eddays, item.edamount, item.uanno, item.panno, item.payslipno, item.grossamount, item.netpay, item.ss_print_count, item.pf_print_count, item.otherallowance, item.otherdeductions);
							 } 
						});

						
						var salryslip = new jobModel.getsalarydetail1(rows[i].salaryslipid, rows[i].memberid, rows[i].accountno, rows[i].firstname, rows[i].serviceno, rows[i].texcono, rows[i].jobcode, rows[i].jobname, rows[i].projectid, rows[i].clientid, rows[i].clientname, rows[i].projectno, rows[i].projectname, rows[i].designation, rows[i].addressline1, rows[i].addressline2, rows[i].addressline3, rows[i].pincode, rows[i].wagetype, rows[i].wageyear, rows[i].monthandyear, rows[i].presentdays, rows[i].othours, rows[i].basic, rows[i].da, rows[i].hra, rows[i].cca, rows[i].ma, rows[i].epf, rows[i].edli, rows[i].admchr, rows[i].bonus, rows[i].gratuity, rows[i].unifdt, rows[i].leapay, rows[i].conveyance, rows[i].washallow, rows[i].lic, rows[i].other1, rows[i].other2, rows[i].ratehd, rows[i].ncbasic, rows[i].eddays, rows[i].edamount, rows[i].uanno, rows[i].panno, rows[i].payslipno, rows[i].grossamount, rows[i].netpay, rows[i].ss_print_count, rows[i].pf_print_count, rows[i].otherallowance, rows[i].otherdeductions,salrysliporg);
						result.push(salryslip);
					}
				}
				resolve(result);
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.getpayslippreview = function (projectid, monthandyear) {
	console.log("--------", projectid + " " + monthandyear)
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
                  SELECT 
                    att.*,
                    jm.code AS jobcode,
                    jm.name AS jobname,
                    lk.description AS wagetype,
                    lk1.description AS wagearea,
                    lk2.code AS salcode,
                    lk2.description AS salarycomponent,
                    jpd.jobmasterid, 
                    ag.wagetypeid, 
                    ag.wageyearid, 
                    ag.wageareaid,
                    wg.jobmasterid,
                    wg.particularid,
                    wg.particularamount,
                    m.firstname,
					m.serviceno,
					m.texcono,
					m.pfno,
					cl.organization AS clientname,
					pr.projectno AS projectno,
					pr.name AS projectname 

                FROM attendance att

                INNER JOIN jobpostingdetail jpd ON
                   jpd.jobpostingdetailid = att.jobpostingdetailid AND jpd.active =1

                INNER JOIN jobmaster jm ON 
                    jm.jobmasterid = jpd.jobmasterid AND jm.active =1

                INNER JOIN agreement ag ON
                    ag.clientid = att.clientid AND ag.active =1

                INNER JOIN agreementinfo ai ON
                    ai.projectid = att.projectid AND ai.active =1

                INNER JOIN wages wg ON
                    wg.wagetypeid = ag.wagetypeid AND wg.active =1 AND wg.wageyearid = ag.wageyearid AND wg.jobmasterid = jpd.jobmasterid AND wg.wageareaid = ag.wageareaid

                INNER JOIN lookupvalue lk ON
                    lk.lkvalid = wg.wagetypeid AND lk.active =1

                INNER JOIN lookupvalue lk1 ON
                    lk1.lkvalid = wg.wageyearid AND lk1.active =1

                INNER JOIN lookupvalue lk2 ON
                    lk2.lkvalid = wg.particularid AND lk2.active =1
                    
				INNER JOIN member m ON
					m.memberid = att.memberid  AND m.active =1                  
					   
				INNER JOIN `client` cl ON
					att.clientid = cl.clientid AND cl.active =1
					   
				INNER JOIN project pr ON
					att.projectid = pr.projectid AND pr.active =1

                WHERE (att.status = 0 OR att.status = 1) AND att.projectid = ? AND att.monthandyear = ? AND att.active =1

                ORDER BY att.memberid, wg.jobmasterid, wg.particularid;

           */
			});
			console.log('projectid', projectid);
			console.log('monthandyear', monthandyear);
			con.query(query, [projectid, monthandyear]).then(function (rows, fields) {
				var result = [];
				var rowsReturned = rows.length;
				console.log('rowsReturned', rowsReturned);
				var noofdays = getMonthDays(monthandyear);
				if (rowsReturned > 0) {
					var items = [];
					var basic = 0;
					var da = 0;
					var hra = 0;
					var cca = 0;
					var ma = 0;
					var epf = 0;
					var edli = 0;
					var admchr = 0;
					var bonus = 0;
					var gratuity = 0;
					var unifdt = 0;
					var leapay = 0;
					var conveyance = 0;
					var washallow = 0;
					var lic = 0;
					var other1 = 0;
					var other2 = 0;
					var ratehd = 0;
					var components;
					var totalduty = 0;
					var ncbasic = 0;
					var edamount = 0;

					for (var i = 0; i < rowsReturned; i++) {
						var items = [];
						totalduty = rows[i].presentdays;
						if (rows[i].salcode == 'BASIC') {
							ncbasic = parseFloat(rows[i].particularamount);
							basic = (ncbasic * totalduty) / noofdays;
						}
						if (rows[i].edhold == 1) {
							rows[i].eddays = 0;
							rows[i].othours = 0;
							edamount = 0;
						}
						if (rows[i].lreserve == 0) {
							rows[i].leapay = 0;
						}

						console.log("  rows[i]", rows[i]);
						console.log("------------", rows[i].lreserve);

						if (rows[i].salcode == 'DA')
							da = (basic * parseFloat(rows[i].particularamount / 100));
						if (rows[i].salcode == 'HRA')
							hra = (basic * parseFloat(rows[i].particularamount / 100));
						if (rows[i].salcode == 'CCA')
							cca = (basic * parseFloat(rows[i].particularamount / 100));
						if (rows[i].salcode == 'MALLWN')
							ma = (basic * parseFloat(rows[i].particularamount / 100));
						if (rows[i].salcode == 'EPF')
							epf = (basic * parseFloat(rows[i].particularamount / 100));
						if (rows[i].salcode == 'EDLI')
							edli = (basic * parseFloat(rows[i].particularamount / 100));
						if (rows[i].salcode == 'ADCHRG')
							admchr = (basic * parseFloat(rows[i].particularamount / 100));
						if (rows[i].salcode == 'BONUS')
							bonus = (basic * parseFloat(rows[i].particularamount / 100));
						if (rows[i].salcode == 'GRAT')
							gratuity = (basic * parseFloat(rows[i].particularamount / 100));
						if (rows[i].salcode == 'UNIFRM')
							unifdt = (basic * parseFloat(rows[i].particularamount / 100));
						if (rows[i].salcode == 'RELCHRG')
							leapay = (basic * parseFloat(rows[i].particularamount));
						if (rows[i].salcode == 'CONVEY')
							conveyance = (basic * parseFloat(rows[i].particularamount / 100));
						if (rows[i].salcode == 'WASH')
							washallow = (basic * parseFloat(rows[i].particularamount / 100));
						if (rows[i].salcode == 'LIC')
							lic = (basic * parseFloat(rows[i].particularamount / 100));
						//if (rows[i].salcode == 'OTR1')
						//    other1 = (parseFloat(rows[i].particularamount) / basic) * totalduty;
						//if (rows[i].salcode == 'OTR2')
						//    other2 = (parseFloat(rows[i].particularamount) / basic) * totalduty;
						if (rows[i].salcode == 'RATEHD') {
							ratehd = parseFloat(rows[i].particularamount) / noofdays;

							if (rows[i].eddays != 0)
								edamount = ratehd * rows[i].eddays;

							if (rows[i].othours != 0)
								edamount = ratehd * parseFloat(rows[i].othours / 8);
						}
						if ((i + 1 == rowsReturned) || (rows[i].memberid != rows[i + 1].memberid)) {
							var salryslip = new jobModel.getsalarydetail(0, rows[i].memberid, rows[i].accountno, rows[i].firstname, rows[i].serviceno, rows[i].texcono, rows[i].jobcode, rows[i].jobname, rows[i].projectid, rows[i].clientid, rows[i].clientname, rows[i].projectno, rows[i].projectname, rows[i].designation, rows[i].addressline1, rows[i].addressline2, rows[i].addressline3, rows[i].pincode, rows[i].wagetype, rows[i].wageyear, rows[i].monthandyear, rows[i].presentdays, rows[i].othours, basic, da, hra, cca, ma, epf, edli, admchr, bonus, gratuity, unifdt, leapay, conveyance, washallow, lic, other1, other2, ratehd, ncbasic, rows[i].eddays, edamount, rows[i].uanno, rows[i].panno);
							result.push(salryslip);
							items = [];
							basic = 0;
							da = 0;
							hra = 0;
							cca = 0;
							ma = 0;
							epf = 0;
							edli = 0;
							admchr = 0;
							bonus = 0;
							gratuity = 0;
							unifdt = 0;
							leapay = 0;
							conveyance = 0;
							washallow = 0;
							lic = 0;
							other1 = 0;
							other2 = 0;
							ratehd = 0;
							components;
							totalduty = 0;
							ncbasic = 0;
							edamount = 0;
						}
					}
					resolve(result);
				} else {
					reject("Please Check Wage for pay slip generation");
				}
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.updateattendancestatuspay = function (projectid, monthandyear, status,reason) {
	
	console.log(reason);
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			con.query('UPDATE attendance SET status = ? ,reason_others = ? WHERE projectid= ? AND monthandyear = ? AND status IN (1,8);', [status,reason, projectid, monthandyear,]).then(function (rows, fields) {
				resolve("Success")
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
} 

module.exports.updatesalarystatuspay = function (projectid, monthandyear, status) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			con.query('UPDATE salaryslip SET status = ? WHERE projectid= ? AND bill_type = 1 AND status IN (1);', [status, projectid]).then(function (rows, fields) {
				resolve("Success")
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.getdutiesforinvoice = function (monthandyear) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
					SELECT
						    at.clientid,
						    at.projectid,
						    pr.name AS projectname,
						    pr.projectno,
						    at.jobpostingdetailid,
						    at.memberid,
						    m.firstname,
						    at.monthandyear,
						    at.status,
						    sum(at.presentdays) + SUM(at.eddays) AS presentdays,
						    sum(at.othours) AS othours,
						    at.jobmasterid,
						    jm.code,
						    jm.name,
						    i.invoiceno

						FROM `attendance` at

						 INNER JOIN project pr ON
						       pr.projectid = at.projectid
						       AND pr.active =1

						 INNER JOIN member m ON
						      m.memberid = at.memberid
						      AND m.active =1

						 INNER JOIN jobmaster jm ON
						      jm.jobmasterid = at.jobmasterid
						      AND jm.active = 1

						 LEFT JOIN invoice i ON
						      i.clientid = at.clientid
						      AND i.projectid = at.projectid
						      AND i.monthandyear = at.monthandyear AND i.active = 1

						WHERE at.monthandyear = ? AND (at.status = 3 OR at.status = 4 OR at.status = 5 OR at.status = 6)  AND at.active =1

						group by jm.code, at.projectid, at.clientid

						order by at.clientid, at.projectid, jm.jobmasterid
                */
			});
			con.query(query, [monthandyear]).then(function (rows, fields) {
				var rowsReturned = rows.length;
				var result = [];
				var totalduties = [];
				if (rowsReturned > 0) {
					if (rowsReturned > 0) {
						for (var i = 0; i < rowsReturned; i++) {
							var job = new jobModel.totalduties(rows[i].jobmasterid, rows[i].code, rows[i].name, rows[i].presentdays, 0, 0, rows[i].othours);
							totalduties.push(job)
							if ((i + 1 == rowsReturned) || (rows[i].projectid != rows[i + 1].projectid || rows[i].monthandyear != rows[i + 1].monthandyear)) {
								result.push(new jobModel.duties(rows[i].clientid, rows[i].projectid, rows[i].projectno, rows[i].projectname, rows[i].monthandyear, totalduties, rows[i].invoiceno, '', '', '', '', '', '', '', '', '', '', '', '', rows[i].status))
								totalduties = [];
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
	});
}

module.exports.getdutiesforauthorize = function (monthandyear) {
	console.log("DAL-------------------", monthandyear);
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
					SELECT
						at.clientid,
						at.projectid,
						pr.name AS projectname,
						pr.projectno,
						at.jobpostingdetailid,
						at.memberid,
						m.firstname,
						at.monthandyear,
						at.status,
						sum(at.presentdays) + SUM(at.eddays) AS presentdays,
						sum(at.othours) AS othours,
						jpd.jobmasterid,
						jm.code,
						jm.name,
						i.invoiceno
					FROM `attendance` at
					INNER JOIN project pr ON
						pr.projectid = at.projectid
						AND pr.active =1
					INNER JOIN member m ON
						m.memberid = at.memberid
						AND m.active =1
					INNER JOIN jobpostingdetail jpd ON
						jpd.jobpostingdetailid =  at.jobpostingdetailid
						AND jpd.active =1
					INNER JOIN jobmaster jm ON
						jm.jobmasterid = jpd.jobmasterid
						AND jm.active = 1
					LEFT JOIN invoice i ON
						i.clientid = at.clientid
						AND i.projectid = at.projectid
						AND i.monthandyear = at.monthandyear AND i.active = 1
					WHERE at.monthandyear = ? AND (at.status = 4 OR at.status = 5 OR at.status = 6 OR at.status = 7)
					group by jm.code, at.projectid, at.clientid
					order by at.clientid, at.projectid, jm.jobmasterid
                */
			});
			con.query(query, [monthandyear]).then(function (rows, fields) {
				var rowsReturned = rows.length;
				var result = [];
				var totalduties = [];
				if (rowsReturned > 0) {
					if (rowsReturned > 0) {
						for (var i = 0; i < rowsReturned; i++) {
							var job = new jobModel.totalduties(rows[i].jobmasterid, rows[i].code, rows[i].name, rows[i].presentdays, 0, 0, rows[i].othours);
							totalduties.push(job)
							if ((i + 1 == rowsReturned) || (rows[i].projectid != rows[i + 1].projectid || rows[i].monthandyear != rows[i + 1].monthandyear)) {
								result.push(new jobModel.duties(rows[i].clientid, rows[i].projectid, rows[i].projectno, rows[i].projectname, rows[i].monthandyear, totalduties, rows[i].invoiceno, '', '', '', '', '', '', '', '', '', '', '', '', rows[i].status))
								totalduties = [];
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
	});
}

module.exports.updateattendancestatusinvoice = function (projectid, monthandyear, status) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			con.query('UPDATE attendance SET status = ? WHERE projectid IN (?) AND monthandyear = ? and (status = 1 OR status = 2);', [status, projectid, monthandyear,status, projectid, monthandyear]).then(function (rows, fields) {
				resolve("Success")
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.updateinvoiceauthorize = function (projectid, monthandyear, status) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			con.query('UPDATE attendance SET status = ? WHERE projectid= ? AND monthandyear = ? AND status = 4', [status, projectid, monthandyear]).then(function (rows, fields) {
				resolve("Success")
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

function getMonthDays(MonthYear) {
	var months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];
	var Value = MonthYear.split(" ");
	var month = (months.indexOf(Value[0]) + 1);
	return new Date(Value[1], month, 0).getDate();
}


// Gets the service for packagesearch
module.exports.getexpayslip = function (salaryslipid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
                  SELECT

                    ss.*,
                    cl.organization AS clientname,
                    pr.projectno AS projectno,
                    pr.name AS projectname,
                    pr.addressline1, 
                    pr.addressline2, 
                    pr.addressline3, 
                    pr.designation, 
                    pr.pincode,
                    wt.description AS wagetype,
                    wy.description AS wageyear,
                    jm.code AS jobcode,
                    jm.name AS jobname,
                    m.firstname,
                    m.serviceno,
                    m.texcono,
                    m.accountno,
                    m.panno,
                    m.uanno

                FROM

                    salaryslip ss

                INNER JOIN member m ON
                    m.memberid = ss.memberid AND m.active = 1

                INNER JOIN `client` cl ON
                    cl.clientid = ss.clientid AND cl.active = 1

                INNER JOIN `project` pr ON
                    pr.projectid = ss.projectid AND pr.active = 1

                INNER JOIN jobmaster jm ON
                    jm.jobmasterid = ss.jobmasterid AND jm.active = 1
             
                INNER JOIN lookupvalue wt ON
                    wt.lkvalid = ss.wagetypeid AND wt.active = 1

                INNER JOIN lookupvalue wy ON
                    wy.lkvalid = ss.wageyearid AND wy.active = 1

                WHERE ss.salaryslipid = ? AND ss.active = 1

                ORDER BY ss.memberid

           */
			});
			con.query(query, [salaryslipid]).then(function (rows, fields) {
				var result = [];
				var rowsReturned = rows.length;
				if (rowsReturned > 0) {
					for (var i = 0; i < rowsReturned; i++) {
						var salryslip = new jobModel.getsalarydetail(rows[i].salaryslipid, rows[i].memberid, rows[i].accountno, rows[i].firstname, rows[i].serviceno, rows[i].texcono, rows[i].jobcode, rows[i].jobname, rows[i].projectid, rows[i].clientid, rows[i].clientname, rows[i].projectno, rows[i].projectname, rows[i].designation, rows[i].addressline1, rows[i].addressline2, rows[i].addressline3, rows[i].pincode, rows[i].wagetype, rows[i].wageyear, rows[i].monthandyear, rows[i].presentdays, rows[i].othours, rows[i].basic, rows[i].da, rows[i].hra, rows[i].cca, rows[i].ma, rows[i].epf, rows[i].edli, rows[i].admchr, rows[i].bonus, rows[i].gratuity, rows[i].unifdt, rows[i].leapay, rows[i].conveyance, rows[i].washallow, rows[i].lic, rows[i].other1, rows[i].other2, rows[i].ratehd, rows[i].ncbasic, rows[i].eddays, rows[i].edamount, rows[i].uanno, rows[i].panno);
						result.push(salryslip);
					}
				}
				resolve(result);
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.getinvoicepreview = function (projectid, monthandyear) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
SELECT
at.clientid,
at.projectid,
pr.name AS projectname,
pr.projectno,
at.jobpostingdetailid,
at.memberid,
m.firstname,
at.monthandyear,
(SUM(at.presentdays) + SUM(at.eddays)) AS presentduties,
IFNULL(SUM(at.othours) / 8, 0) AS otduties,
at.othours,
jpd.jobmasterid,
jm.code,
jm.name,
ag.servicecharge,
ag.tax,
IFNULL(wg.particularamount, 0) AS salary,
lv.code,
COUNT(*) AS noofperson,
pr.name AS projectname,
pr.projectno,
pr.addressline1,
pr.addressline2,
pr.addressline3,
pr.pincode,
pr.designation,
ag.wagetypeid
ag.edseperate
FROM `attendance` at

 INNER JOIN project pr ON
       pr.projectid = at.projectid
       AND pr.active =1

 INNER JOIN member m ON
      m.memberid = at.memberid
      AND m.active =1

 INNER JOIN jobpostingdetail jpd ON
     jpd.jobpostingdetailid =  at.jobpostingdetailid
     AND jpd.active =1

 INNER JOIN jobmaster jm ON
      jm.jobmasterid = jpd.jobmasterid
      AND jm.active = 1

INNER JOIN agreementinfo ai ON
      ai.projectid = at.projectid
      AND ai.active = 1

INNER JOIN agreement ag ON
      ag.agreementid = ai.agreementid
      AND ag.active = 1

LEFT JOIN wages wg ON
    jm.jobmasterid = wg.jobmasterid AND (wg.wageareaid = ag.wageareaid OR wg.wageyearid = ag.wageyearid) AND wg.active = 1  AND wg.particularamount > 0

LEFT JOIN lookupvalue lv ON
    lv.lkvalid = wg.particularid AND lv.active = 1 AND lv.code = 'RATEHD'

WHERE lv.code != 'NULL' AND (at.status = 3 OR at.status = 4) AND at.monthandyear = ? AND at.projectid = ? AND at.active =1

GROUP BY jm.code, at.projectid, at.clientid

ORDER BY at.clientid, at.projectid, jm.jobmasterid;

                                     */
			});
			con.query(query, [monthandyear, projectid]).then(function (rows, fields) {
				var rowsReturned = rows.length;
				var result = [];
				var totalduties = [];
				var amount = {};
				var salaryamount = {};
				var servicetax = {};
				var servicecharges = {};
				var total = {};
				var duties = {};
				var gross = 0;
				if (rowsReturned > 0) {
					if (rowsReturned > 0) {
						for (var i = 0; i < rowsReturned; i++) {

							var a = rows[i].monthandyear.split(' ');
							var monthname = a[0];
							var year = a[1];
							var month = new Date(Date.parse("1 " + monthname)).getMonth() + 1;
							var days = new Date(year, month, 0).getDate();
							duties = parseFloat(rows[i].presentduties) + parseFloat(rows[i].otduties);
							salaryamount = ((parseFloat(rows[i].salary) / days) * duties).toFixed(2);

							if(rows[i].wagetypeid == 349)
						{
							salaryamount=	Math.round(salaryamount);
						}

							var job = new jobModel.invoice(rows[i].jobmasterid, rows[i].jobmastercode, rows[i].name, rows[i].salary, duties, salaryamount, rows[i].noofperson, days);
							totalduties.push(job);
							// gross  salary added for Each job
							gross = (parseFloat(job.salaryamount) + parseFloat(gross)).toFixed(2);

							if ((i + 1 == rowsReturned) || (rows[i].projectid != rows[i + 1].projectid)) {
								// total salary, after adding service charges and tax
								servicecharges = ((gross / 100) * parseFloat(rows[i].servicecharge)).toFixed(2);
								servicetax = (((parseFloat(gross) + parseFloat(servicecharges)) / 100) * parseFloat(rows[i].tax)).toFixed(2);
								total = Math.round(parseFloat(gross) + parseFloat(servicetax) + parseFloat(servicecharges));

								result.push(new jobModel.duties(rows[i].clientid, rows[i].projectid, rows[i].projectno, rows[i].projectname, rows[i].monthandyear, totalduties, "00000", gross, rows[i].servicecharge, rows[i].tax, servicecharges, servicetax, total, rows[i],edseperate,rows[i].createddate, rows[i].addressline1, rows[i].addressline2, rows[i].addressline3, rows[i].pincode, rows[i].designation))
								totalduties = [];
							}
						}
					}
					resolve(result);
				} else {
					reject("Attendance not exist");
				}
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.getdriverforinvoice = function (projectid, monthandyear) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
					SELECT
						DISTINCT(m.memberid),
						m.firstname,
						m.texcono
					FROM attendance att 
					INNER JOIN jobmaster jm ON
						jm.jobmasterid = att.jobmasterid AND jm.active =1
					INNER JOIN member m ON
						m.memberid = att.memberid
					WHERE jm.code = 'DVR' AND att.projectid = ? AND att.monthandyear = ? AND att.active =1
                */
			});
			con.query(query, [projectid, monthandyear]).then(function (rows, fields) {
				console.log(projectid, monthandyear);
				var rowsReturned = rows.length;
				var result = [];
				if (rowsReturned > 0) {
					for (var i = 0; i < rowsReturned; i++) {
						var member = new jobModel.getdrivers(rows[i].memberid, rows[i].firstname, rows[i].texcono);
						result.push(member);
					}
				}
				resolve(result);
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.getnumberofpayslip = function (values) {
	//console.log('values', values);
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			con.query('SELECT value AS salaryslipno FROM setting WHERE code = ?', [values]).then(function (rows, fields) {
				//console.log('rows', rows);
				resolve({
					"salaryslipno": rows[0].salaryslipno
				})
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}


module.exports.getVacancyViewStatus = function () {
	//console.log('values', values);
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			con.query('SELECT vacancycustomerview AS status FROM vacancypublish WHERE id = ?','1' ).then(function (rows, fields) {
				
				resolve(rows[0].status)
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.rejectinvoice = function (projectid, monthandyear, status) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			con.query('UPDATE attendance SET status = ? WHERE projectid= ? AND monthandyear =?;UPDATE salaryslip SET active = 0 WHERE projectid= ? AND monthandyear =?; UPDATE invoice SET active = 0 WHERE projectid= ? AND monthandyear =?;', [status, projectid, monthandyear, projectid, monthandyear, projectid, monthandyear]).then(function (rows, fields) {
				resolve("Success")
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.getdutiesforbankslip = function (monthandyear) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
SELECT
    at.clientid,
    at.projectid,
    pr.name AS projectname,
    pr.projectno,
    at.jobpostingdetailid,
    at.memberid,
    m.firstname,
    at.monthandyear,
    at.status,
    sum(at.presentdays) + SUM(at.eddays) AS presentdays,
    sum(at.othours) AS othours,
    jpd.jobmasterid,
    jm.code,
    jm.name,
    i.invoiceno

FROM `attendance` at

 INNER JOIN project pr ON
       pr.projectid = at.projectid
       AND pr.active =1

 INNER JOIN member m ON
      m.memberid = at.memberid
      AND m.active =1

 INNER JOIN jobpostingdetail jpd ON
     jpd.jobpostingdetailid =  at.jobpostingdetailid
     AND jpd.active =1

 INNER JOIN jobmaster jm ON
      jm.jobmasterid = jpd.jobmasterid
      AND jm.active = 1

 LEFT JOIN invoice i ON
      i.clientid = at.clientid
      AND i.projectid = at.projectid
      AND i.monthandyear = at.monthandyear AND i.active = 1

WHERE at.monthandyear = ? AND (at.status = 5 OR at.status = 6)

group by jm.code, at.projectid, at.clientid

order by at.clientid, at.projectid, jm.jobmasterid
                                     */
			});
			con.query(query, [monthandyear]).then(function (rows, fields) {
				var rowsReturned = rows.length;
				var result = [];
				var totalduties = [];
				if (rowsReturned > 0) {
					if (rowsReturned > 0) {
						for (var i = 0; i < rowsReturned; i++) {
							var job = new jobModel.totalduties(rows[i].jobmasterid, rows[i].code, rows[i].name, rows[i].presentdays, 0, 0, rows[i].othours);
							totalduties.push(job)
							if ((i + 1 == rowsReturned) || (rows[i].projectid != rows[i + 1].projectid || rows[i].monthandyear != rows[i + 1].monthandyear)) {
								result.push(new jobModel.duties(rows[i].clientid, rows[i].projectid, rows[i].projectno, rows[i].projectname, rows[i].monthandyear, totalduties, rows[i].invoiceno, '', '', '', '', '', '', '', '', '', '', '', '', rows[i].status))
								totalduties = [];
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
	});
}

module.exports.generatebankslip = function (projectid, monthandyear, status) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			con.query('UPDATE attendance SET status = ? WHERE projectid= ? AND monthandyear = ? AND status = 5; UPDATE salaryslip SET status = 2 WHERE projectid= ? AND monthandyear = ? AND status = 1;', [status, projectid, monthandyear, projectid, monthandyear]).then(function (rows, fields) {
				resolve("Success")
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.getexportslip = function (projectdata) {
	 //console.log('projectdata..projectdata', projectdata);
	
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var totalamount = 0;
			var result = [];
			var promises = [];
			for (var i = 0; i < projectdata.length; i++) {
				promises.push(new Promise((resolve, reject) => {
					var query = multiline.stripIndent(function () {
						/*
							SELECT 
								ss.salaryslipid,ss.projectid,ss.monthandyear,ss.payslipno,ss.memberid,ss.jobmasterid,
								ss.attendanceid,ss.presentdays,ss.eddays,ss.`status`,ss.netpay as npay,ssd.netpay as npay1,ss.bill_type,
								m.firstname,IFNULL(m.accountno, '') AS accountno 
							FROM salaryslip  ss
							left JOIN salaryslip_difference ssd ON ss.salaryslipid=ssd.salaryslipid
							INNER JOIN member m ON m.memberid = ss.memberid
							where   ss.`status` IN (4,5,6,7)  AND ss.monthandyear = ? AND ss.projectid IN (?) AND (m.accountno != '' OR m.accountno != 0 OR m.accountno != null ) AND  LENGTH(m.accountno) >= 14 AND ss.payslipno = ? GROUP BY ss.salaryslipid
						*/
					});
				//	console.log(projectdata[i].monthandyear, projectdata[i].projectid, projectdata[i].payslipno,i);
					con.query(query, [projectdata[i].monthandyear, projectdata[i].projectid, projectdata[i].payslipno]).then(function (rows, fields) {
						var rowsReturned = rows.length;
						if (rowsReturned > 0) {
							for (var i = 0; i < rowsReturned; i++) {
								if(rows[i].bill_type == 1   )
								{
									rows[i].npay=rows[i].npay1;
								}

								totalamount += parseFloat(rows[i].npay);
								
								
								//console.log('rows.22.rows',rows[i].accountno);
								var member = new jobModel.exportslips(rows[i].accountno, rows[i].npay.toFixed(2),rows[i].bill_type);
								result.push(member);
								//console.log('result',result);
							}
						}
						resolve(result);
					}).catch(function (err) {
						reject(err);
					});
				}))
			}
			app.promise.all(promises).then(function () {
				var memberpay = new jobModel.memberpay(result, totalamount.toFixed(2));
				resolve(memberpay);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.getExportSlipReport = function (projectdata) {
	//console.log(projectdata);
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var totalamount = 0;
			
			var result = [];
			var result1 = [];
			var promises = [];
			for (var i = 0; i < projectdata.length; i++) {
			//	console.log(projectdata[i].monthandyear);
				var dt = new Date(projectdata[i].monthandyear);
				var monthdate=moment(dt).format('MMYY');
			
				promises.push(new Promise((resolve, reject) => {
					var query = multiline.stripIndent(function () {
						/*
							SELECT pr.projectno,m.texcono,m.firstname,'1' AS noofrepeat,m.accountno,ss.netpay,ssd.netpay as netpay1,ss.bill_type,ss.monthandyear
							FROM salaryslip  ss
							left JOIN salaryslip_difference ssd ON ss.salaryslipid=ssd.salaryslipid
							INNER JOIN attendance att ON att.memberid = ss.memberid AND att.clientid = ss.clientid AND att.projectid = ss.projectid
							INNER JOIN project pr ON pr.projectid = ss.projectid AND pr.clientid = att.clientid
							INNER JOIN member m ON m.memberid = ss.memberid
							WHERE ss.`status` IN (4,5,6,7)   AND ss.monthandyear = ? AND ss.projectid IN (?) AND (m.accountno != '' OR m.accountno != 0 OR m.accountno != null   )  AND  LENGTH(m.accountno) >= 14 AND ss.payslipno = ? GROUP BY ss.salaryslipid;
						*/
					});
				//	console.log('projectdata[i].monthandyear, projectdata[i].projectid',projectdata[i].monthandyear, projectdata[i].projectid,projectdata[i].payslipno);
					con.query(query, [projectdata[i].monthandyear, projectdata[i].projectid,projectdata[i].payslipno]).then(function (rows, fields) {
						//console.log('projectdata[i].monthandyear, projectdata[i].projectid',projectdata[i].monthandyear, projectdata[i].projectid,rows[0].projectno);
						//console.log(rows[0].projectno);
						var rowsReturned = rows.length;
						var totalamountproj = 0;
					//	console.log(rowsReturned);
						if (rowsReturned > 0) {
							var projectno=rows[0].projectno;
						var dt = new Date(rows[0].monthandyear);
						var monthdate=moment(dt).format('MMYY');
							for (var i = 0; i < rowsReturned; i++) {
								if(rows[i].bill_type == 1 )
								{
									netpay=rows[i].netpay1;
									monthdate='ARR'
									
								}
								else{
									netpay=rows[i].netpay;
								}
								 
								totalamount += parseFloat(netpay);
								totalamountproj += parseFloat(netpay);
								var member = new jobModel.exportslipsReports(rows[i].projectno, rows[i].texcono, rows[i].firstname, rows[i].noofrepeat, rows[i].accountno, netpay,rows[i].bill_type);
								result.push(member);
								//console.log('out',member);
							}
							var projsum = new jobModel.projsum(projectno, rowsReturned,monthdate, totalamountproj);
						result1.push(projsum);
						//console.log(projectno,rowsReturned,totalamountproj);
						totalamountproj=0;
						}

						//console.log('sdgdsg',monthdate)
						
						//monthdate='';
						resolve(result);
					}).catch(function (err) {
						reject(err);
					});
				}))

				
			}
			app.promise.all(promises).then(function () {
				//console.log(result1);
				var memberpay = new jobModel.memberpay1(result, totalamount.toFixed(2),result1);
				resolve(memberpay);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.getExportSlipReportWithoutAccountNO = function (projectdata) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var totalamount = 0;
			var result = [];
			var promises = [];
			for (var i = 0; i < projectdata.length; i++) {
				promises.push(new Promise((resolve, reject) => {
					var query = multiline.stripIndent(function () {
						/*
							SELECT pr.projectno,m.texcono,m.firstname,'1' AS noofrepeat,m.accountno,ss.netpay,ssd.netpay as netpay1,ss.bill_type
							FROM salaryslip  ss
							left JOIN salaryslip_difference ssd ON ss.salaryslipid=ssd.salaryslipid
						
							INNER JOIN attendance att ON att.memberid = ss.memberid AND att.clientid = ss.clientid AND att.projectid = ss.projectid
							INNER JOIN project pr ON pr.projectid = ss.projectid AND pr.clientid = att.clientid
							INNER JOIN member m ON m.memberid = ss.memberid
							where   ss.`status`IN (4,5,6,7)   AND ss.monthandyear = ? AND ss.projectid IN (?) AND ss.payslipno = ? GROUP BY ss.salaryslipid;
						*/
					});
					con.query(query, [projectdata[i].monthandyear, projectdata[i].projectid,projectdata[i].payslipno]).then(function (rows, fields) {
						var rowsReturned = rows.length;
						if (rowsReturned > 0) {
							for (var i = 0; i < rowsReturned; i++) {
								if(rows[i].bill_type == 1 )
								{
									netpay=rows[i].netpay1;
									
								}
								else{
									netpay=rows[i].netpay;
								}

								totalamount += parseFloat(netpay);
								var member = new jobModel.exportslipsReports(rows[i].projectno, rows[i].texcono, rows[i].firstname, rows[i].noofrepeat, rows[i].accountno,netpay,rows[i].bill_type);
								result.push(member);
							}
						}
						resolve(result);
					}).catch(function (err) {
						reject(err);
					});
				}))
			}
			app.promise.all(promises).then(function () {
				var memberpay = new jobModel.memberpay(result, totalamount.toFixed(2));
				resolve(memberpay);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.autherizedueamount = function (projectid, monthandyear) {
	console.log(" Entering DAL", projectid + " ---" + monthandyear);
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
				    SELECT
				        at.attendanceid,
				        at.clientid,
				        at.projectid,
				        c.organization,
				        pr.name AS projectname,
				        pr.projectno,
				        at.jobpostingdetailid,
				        at.memberid,
				        m.firstname,
				        at.monthandyear,
				        at.status,
				        sum(at.presentdays) + SUM(at.eddays) AS presentdays,
				        sum(at.othours) AS othours,
				        at.jobmasterid,
				        jm.code,
				        jm.name,
				        i.invoiceid,
				        i.invoiceno,
				        i.totalamount,
				        id.jobmasterid,
				        at.changedby

				    FROM `attendance` at

				     INNER JOIN project pr ON
				           pr.projectid = at.projectid
				           AND pr.active =1

				     INNER JOIN client c ON
				           c.clientid= at.clientid
				           AND c.active=1       

				     INNER JOIN member m ON
				          m.memberid = at.memberid
				          AND m.active =1

				     INNER JOIN jobmaster jm ON
				          jm.jobmasterid = at.jobmasterid
				          AND jm.active = 1

				     LEFT JOIN invoice i ON
				          i.clientid = at.clientid
				          AND i.projectid = at.projectid
				          AND i.monthandyear = at.monthandyear AND i.active = 1
				          
				     LEFT JOIN invoicedetail id ON
				          id.invoiceid = i.invoiceid
				          AND  id.active = 1

				    WHERE  at.projectid IN (?) AND at.monthandyear = ? AND at.status > 1 AND i.invoicestatus !=7

				    group by jm.code, at.projectid, at.clientid

				    order by at.clientid, at.projectid, jm.jobmasterid
				*/
			});
			con.query(query, [projectid, monthandyear]).then(function (rows, fields) {
				var rowsReturned = rows.length;
				var result = [];
				var totalduties = [];
				if (rowsReturned > 0) {
					if (rowsReturned > 0) {
						for (var i = 0; i < rowsReturned; i++) {

							if ((i + 1 == rowsReturned) || (rows[i].projectid != rows[i + 1].projectid || rows[i].monthandyear != rows[i + 1].monthandyear)) {
								result.push(new jobModel.dues(rows[i].attendanceid, rows[i].clientid, rows[i].projectid, rows[i].organization, rows[i].projectname, rows[i].projectno, rows[i].jobpostingdetailid, rows[i].memberid, rows[i].firstname, rows[i].monthandyear, rows[i].status, rows[i].presentdays, rows[i].othours, rows[i].jobmasterid, rows[i].code, rows[i].name, rows[i].invoiceid, rows[i].invoiceno, rows[i].totalamount, rows[i].changedby));
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
	});
}

module.exports.getdueamount = function (clientid, projectid, monthandyear, invoiceno) {
	console.log(" Entering DAL", projectid + " ---" + monthandyear);
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
				    SELECT
				        
				        *

				    FROM `due` d

				    WHERE  d.clientid=? AND d.projectid = ? AND d.monthandyear = ? AND d.invoiceno=? AND d.active=1

				                 */
			});
			con.query(query, [clientid, projectid, monthandyear, invoiceno]).then(function (rows, fields) {
				var rowsReturned = rows.length;
				var result = [];
				var totalduties = [];
				if (rowsReturned > 0) {
					if (rowsReturned > 0) {
						for (var i = 0; i < rowsReturned; i++) {

							if ((i + 1 == rowsReturned) || (rows[i].clientid != rows[i + 1].clientid || rows[i].projectid != rows[i + 1].projectid || rows[i].monthandyear != rows[i + 1].monthandyear || rows[i].invoiceno != rows[i + 1].invoiceno)) {
								result.push(new jobModel.duedetails(rows[i].dueid, rows[i].clientid, rows[i].projectid, rows[i].monthandyear, rows[i].invoiceid, rows[i].invoiceno, rows[i].dueopening, rows[i].duepaid, rows[i].duepending, rows[i].paiddate, rows[i].active, rows[i].changedby));
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
	});
}

module.exports.generatedueamount = function (duedetails) {
	// console.log("duedetails",duedetails);
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = {
				clientid: duedetails[0].clientid,
				projectid: duedetails[0].projectid,
				monthandyear: duedetails[0].monthandyear,
				invoiceid: duedetails[0].invoiceid,
				invoiceno: duedetails[0].invoiceno,
				dueopening: duedetails[0].totalamount,
				duepending: duedetails[0].totalamount,
				paiddate: "0000-00-00 00:00:00",
				changedby: duedetails[0].changedby
			};
			//console.log(" query", query);
			con.query('INSERT INTO due SET ?', query).then(function (rows, fields) {
				resolve({
					"dueid": rows.insertId
				})
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.paydueamount = function (clientid, projectid, monthandyear, invoiceid, invoiceno, dueopening, amount, duepending, changedby) {
	// console.log("duedetails",duedetails);
	var dpending = duepending - amount;
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = {
				clientid: clientid,
				projectid: projectid,
				monthandyear: monthandyear,
				invoiceid: invoiceid,
				invoiceno: invoiceno,
				dueopening: dueopening,
				duepaid: amount,
				duepending: dpending,
				changedby: changedby
			};
			console.log(" query", query);
			con.query('INSERT INTO due SET ?', query).then(function (rows, fields) {
				resolve({
					"dueid": rows.insertId
				})
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}
module.exports.updatedueamount = function (dueid, changedby) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			con.query('UPDATE due SET active = 0 WHERE dueid= ? AND changedby = ? ;', [dueid, changedby]).then(function (rows, fields) {
				resolve("Success")
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}
module.exports.exportxmltally = function (invoiceid, invoiceno, monthandyear, clientid, projectid) {
	// console.log("Export DAL")
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
				  SELECT
				    d.clientid,d.projectid,ag.taxtype,d.monthandyear,d.invoiceid,d.invoiceno,
				    c.clientid,c.organization,c.contactname,c.districtid,l.description as district,c.talukid,l1.description as taluk,c.stateid,l2.description as state,c.countryid,l3.description as country,p.tallyname,
				    p.projectno,p.name,p.designation,p.addressline1,p.addressline2,p.addressline3,p.pincode,p.statusid,l5.description as status,
				    i.servicecharge,i.tax,i.servicecharges,i.servicetax,i.subtotal,i.totalamount,
				    id.jobmasterid,id.salary,id.noofduties,id.days,id.noofperson,id.salaryamount,
				    jm.code,jm.name as name1,i.changedby,du.dueopening,sum(du.duepaid) as paid,du1.duepending,DATE_FORMAT(i.createdttm,'%Y%m%d')AS createddate 
				    from due d

				    INNER JOIN client c ON
				    c.clientid = d.clientid AND c.active=1

				    INNER JOIN agreement ag ON
				    c.clientid = ag.clientid AND ag.active=1

				    INNER JOIN project p ON
				    p.projectid = d.projectid AND p.active=1

				    INNER JOIN invoice i ON
				    i.invoiceid = d.invoiceid AND i.invoiceno=d.invoiceno AND i.active=1 

				    INNER JOIN invoicedetail id ON
				    id.invoiceid=d.invoiceid AND id.active=1 

				    INNER JOIN lookupvalue l ON
				    l.lkvalid = c.districtid 

				    INNER JOIN lookupvalue l1 ON
				    l1.lkvalid = c.talukid 

				    INNER JOIN lookupvalue l2 ON
				    l2.lkvalid = c.stateid 

				    INNER JOIN lookupvalue l3 ON
				    l3.lkvalid = c.countryid

				    INNER JOIN lookupvalue l5  ON
				    l5.lkvalid=p.statusid

				    INNER JOIN jobmaster jm ON
				    jm.jobmasterid = id.jobmasterid

				    INNER JOIN due du ON
				    c.clientid=du.clientid 

				    INNER JOIN due du1 ON
				    c.clientid=du1.clientid AND du1.active=1

				    where d.clientid= ? AND d.projectid= ? AND d.monthandyear = ? AND d.invoiceid= ? AND d.active=1 GROUP BY ag.clientid
				     */

			});
			//console.log(clientid, projectid, monthandyear, invoiceid);
			con.query(query, [clientid, projectid, monthandyear, invoiceid]).then(function (rows, fields) {
				var rowsReturned = rows.length;
				var result = [];
				// console.log('rows',rows);
				var totalduties = [];
				if (rowsReturned > 0) {
					if (rowsReturned > 0) {
						for (var i = 0; i < rowsReturned; i++) {

							if ((i + 1 == rowsReturned) || (rows[i].projectid != rows[i + 1].projectid || rows[i].monthandyear != rows[i + 1].monthandyear)) {
								//result.push(new jobModel.dues(rows[i].attendanceid,rows[i].clientid,rows[i].projectid,rows[i].organization,rows[i].projectname,rows[i].projectno,rows[i].jobpostingdetailid,rows[i].memberid,rows[i].firstname,rows[i].monthandyear,rows[i].status,rows[i].presentdays,rows[i].othours,rows[i].jobmasterid,rows[i].code,rows[i].name,rows[i].invoiceid,rows[i].invoiceno,rows[i].totalamount,rows[i].changedby)); 
								
								var tcharge= rows[i].subtotal+rows[i].servicetax+rows[i].servicecharges;
								var balsercharge=(rows[i].totalamount-tcharge).toFixed(2);
								console.log(rows[i].servicecharges);
								//var servicecharges=rows[i].servicecharges+balsercharge;
								rows[i].servicecharges+=parseFloat(balsercharge);
								result.push(new jobModel.exporttally(rows[i].clientid, rows[i].projectid, rows[i].monthandyear, rows[i].invoiceid, rows[i].invoiceno,
									rows[i].clientid, rows[i].organization, rows[i].contactname, rows[i].districtid, rows[i].district, rows[i].talukid, rows[i].taluk, rows[i].stateid, rows[i].state, rows[i].countryid, rows[i].country,
									rows[i].projectno, rows[i].tallyname, rows[i].designation, rows[i].addressline1, rows[i].addressline2, rows[i].addressline3, rows[i].pincode, rows[i].statusid, rows[i].status,
									rows[i].servicecharge, rows[i].tax, rows[i].servicecharges, rows[i].servicetax, rows[i].subtotal, rows[i].totalamount,
									rows[i].jobmasterid, rows[i].salary, rows[i].noofduties, rows[i].days, rows[i].noofperson, rows[i].salaryamount,
									rows[i].code, rows[i].name1, rows[i].changedby, rows[i].dueopening, rows[i].paid, rows[i].duepending, rows[i].createddate, rows[i].taxtype));
								console.log("Export DB")
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
	});
}
module.exports.getCompanyName = function (texcokeyword) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
				    SELECT * FROM setting WHERE code = ?

				*/
			});
			con.query(query, [texcokeyword]).then(function (result, fields) {
				resolve(result);
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}
module.exports.exportxmltallyAll = function (monthandyear) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
				    SELECT
				    d.clientid,d.projectid,d.monthandyear,id.invoicedetailid as invoiceid,d.invoiceno,
				        c.clientid,c.organization,c.contactname,c.districtid,l.description as district,c.talukid,l1.description as taluk,c.stateid,l2.description as state,c.countryid,l3.description as country,p.tallyname,
				        p.projectno,p.name,p.designation,p.addressline1,p.addressline2,p.addressline3,p.pincode,p.statusid,l5.description as status,
				        i.servicecharge,i.tax,i.servicecharges,i.servicetax,i.subtotal,i.totalamount,
				        id.jobmasterid,id.salary,id.noofduties,id.days,id.noofperson,id.salaryamount,
				        jm.code,jm.name as name1,i.changedby,du.dueopening,du.duepaid as paid, du1.duepending,DATE_FORMAT(i.createdttm,'%Y%m%d')AS createddate   
				        from due d

				        INNER JOIN client c ON
				        c.clientid = d.clientid AND c.active=1

				        INNER JOIN project p ON
				        p.projectid = d.projectid AND p.active=1

				        INNER JOIN invoice i ON
				        i.invoiceid = d.invoiceid AND i.invoiceno=d.invoiceno AND i.active=1 

				        INNER JOIN invoicedetail id ON
				        id.invoiceid=d.invoiceid AND id.active=1 

				        INNER JOIN lookupvalue l ON
				        l.lkvalid = c.districtid 

				        INNER JOIN lookupvalue l1 ON
				        l1.lkvalid = c.talukid 

				        INNER JOIN lookupvalue l2 ON
				        l2.lkvalid = c.stateid 

				        INNER JOIN lookupvalue l3 ON
				        l3.lkvalid = c.countryid

				        INNER JOIN lookupvalue l5  ON
				        l5.lkvalid=p.statusid

				        INNER JOIN jobmaster jm ON
				        jm.jobmasterid = id.jobmasterid

				        INNER JOIN due du ON
				        c.clientid=du.clientid 

				        INNER JOIN due du1 ON
				        c.clientid=du1.clientid AND du1.active=1
				        where d.monthandyear = ? AND d.active=1 and p.tallyname is not null order by d.invoiceid,d.invoiceno 
				*/
			});
			con.query(query, [monthandyear]).then(function (rows, fields) {
				var rowsReturned = rows.length;
				var result = [];
				var totalduties = [];
				if (rowsReturned > 0) {
					if (rowsReturned > 0) {
						for (var i = 0; i < rowsReturned; i++) {

							if ((i + 1 == rowsReturned) || (rows[i].projectid != rows[i + 1].projectid || rows[i].monthandyear != rows[i + 1].monthandyear)) {
								//result.push(new jobModel.dues(rows[i].attendanceid,rows[i].clientid,rows[i].projectid,rows[i].organization,rows[i].projectname,rows[i].projectno,rows[i].jobpostingdetailid,rows[i].memberid,rows[i].firstname,rows[i].monthandyear,rows[i].status,rows[i].presentdays,rows[i].othours,rows[i].jobmasterid,rows[i].code,rows[i].name,rows[i].invoiceid,rows[i].invoiceno,rows[i].totalamount,rows[i].changedby));  

								
								
								var tcharge= rows[i].subtotal+rows[i].servicetax+rows[i].servicecharges;
								var balsercharge=(rows[i].totalamount-tcharge).toFixed(2);
								//console.log(rows[i].servicecharges);
								//var servicecharges=rows[i].servicecharges+balsercharge;
								rows[i].servicecharges+=(parseFloat(balsercharge));
								
								result.push(new jobModel.exporttally(rows[i].clientid, rows[i].projectid, rows[i].monthandyear, rows[i].invoiceid, rows[i].invoiceno,
									rows[i].clientid, rows[i].organization, rows[i].contactname, rows[i].districtid, rows[i].district, rows[i].talukid, rows[i].taluk, rows[i].stateid, rows[i].state, rows[i].countryid, rows[i].country,
									rows[i].projectno, rows[i].tallyname, rows[i].designation, rows[i].addressline1, rows[i].addressline2, rows[i].addressline3, rows[i].pincode, rows[i].statusid, rows[i].status,
									rows[i].servicecharge, rows[i].tax, rows[i].servicecharges.toFixed(2), rows[i].servicetax, rows[i].subtotal, rows[i].totalamount,
									rows[i].jobmasterid, rows[i].salary, rows[i].noofduties, rows[i].days, rows[i].noofperson, rows[i].salaryamount,
									rows[i].code, rows[i].name1, rows[i].changedby, rows[i].dueopening, rows[i].paid, rows[i].duepending, rows[i].createddate));
								console.log("Export DB")
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
	});
}
module.exports.getTexcoNo = function () {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			con.query("CALL texconogeneration ()", []).then(function (rows, fields) {
				console.log('rows........', rows[0][0].texcono);
				resolve(rows[0][0].texcono);
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}
module.exports.importdueamount = function (dueamount) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var queries = '';
			dueamount.forEach(function (item) {
				queries += con.format("INSERT INTO pending_dues (date, ref_no, project_name, opening_amount, pending_amount, due_on, over_due_by_days) VALUES (?,?,?,?,?,?,?);", [item.date, item.refno, item.partyname, item.openingamount, item.pendingamount, item.dueon, item.overduedays])
			});
			con.query(queries).then(function (rows, fields) {
				resolve(rows);
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
} 

module.exports.getAuthorizeList = function (fromdate, todate, regionid) {
	var todates = moment(todate, "YYYY-MM-DD").add(1, 'days');
	var todatess = moment(todates).format('YYYY-MM-DD');
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
					SELECT prr.projectid,prr.clientid,cll.organization AS clientname,prr.projectno,prr.name AS projectname,att.monthandyear,lv.description AS currentstatus,att.jobmasterid,jm.code AS category,att.status,att.edstatus,
					COUNT(att.attendanceid) AS memberscount,SUM(att.presentdays) AS totalduties,SUM(att.eddays) AS eddays,att.attendanceid,IFNULL(ss.bill_type, 0) AS bill_type,ss.payslipno,inv.invoiceno,inv.arrearstatus,ss.cashier_rejected AS sal_cashier_rejected,ss.cao_rejected AS sal_cao_rejected,att.cashier_rejected AS att_cashier_rejected,att.cao_rejected AS att_cao_rejected,inv.cashier_rejected AS inv_cashier_rejected,inv.cao_rejected AS inv_cao_rejected,ss.salaryslipid,ss.fk_salary_slip_id
					FROM attendance att 
					INNER JOIN project prr ON prr.projectid = att.projectid AND att.clientid = prr.clientid
					LEFT JOIN salaryslip ss ON ss.attendanceid = att.attendanceid AND ss.bill_type = 0 AND (att.cashier_rejected = ss.cashier_rejected AND att.cao_rejected = ss.cao_rejected) AND ss.active = 1
					LEFT JOIN invoice inv ON inv.clientid = ss.clientid AND ss.projectid = inv.projectid AND inv.monthandyear = ss.monthandyear AND inv.`type` = 0 AND (att.cashier_rejected = inv.cashier_rejected AND att.cao_rejected = inv.cao_rejected) AND inv.active = 1 
					INNER JOIN client cll ON cll.clientid = att.clientid
					INNER JOIN jobmaster jm ON jm.jobmasterid = att.jobmasterid
					INNER JOIN lookupvalue lv ON lv.code = att.`status` AND lv.lkdmncode = 'STATUS'
					WHERE case ? when 0 then 1 = 1 else prr.regionid = ? END
					AND DATE(att.attendancereviewed) BETWEEN (?) AND (?) 
					GROUP BY att.projectid,att.`status`,ss.payslipno,att.monthandyear,att.jobmasterid order by att.projectid,att.monthandyear,ss.payslipno;

					SELECT  prr.projectid,prr.clientid,cl.organization AS clientname,prr.projectno,prr.name AS projectname,ss.monthandyear,lv.description AS currentstatus,ss.jobmasterid,jm.code AS category,ss.status,COUNT(ss.attendanceid) AS memberscount,SUM(ss.presentdays) AS totalduties,SUM(ss.eddays) AS eddays,ss.status as status,IFNULL(ss.bill_type, 0) AS bill_type,ss.payslipno,inv.invoiceno,inv.arrearstatus,
					ss.cashier_rejected AS sal_cashier_rejected,ss.cao_rejected AS sal_cao_rejected,
					'0' AS att_cashier_rejected,'0' AS att_cao_rejected,'0' AS inv_cashier_rejected,
					'0' AS inv_cao_rejected,ss.salaryslipid,ss.fk_salary_slip_id
					FROM salaryslip ss 
					INNER JOIN client cl ON cl.clientid = ss.clientid
					INNER JOIN project prr ON prr.projectid = ss.projectid AND ss.clientid = prr.clientid
					INNER JOIN invoice inv ON inv.clientid = ss.clientid AND inv.projectid = ss.projectid AND inv.`type` = 1
					INNER JOIN invoicedetail indd ON indd.projectid = ss.projectid AND ss.clientid = indd.clientid 
					AND ss.monthandyear = indd.monthandyear
					INNER JOIN jobmaster jm ON jm.jobmasterid = ss.jobmasterid
					INNER JOIN lookupvalue lv ON lv.code = ss.`status` AND lv.lkdmncode = 'CSTATUS'
					WHERE  ss.bill_type = 1 AND ss.active = 1 AND
					case ? when 0 then 1 = 1 else prr.regionid = ? END 
					AND DATE(ss.createdttm) BETWEEN (?) AND (?) 
					GROUP BY ss.payslipno,ss.projectid,ss.jobmasterid;

					SELECT invd.invoiceid,invd.clientid,invd.projectid,inv.monthandyear,inv.invoiceno FROM invoice inv inner join invoicedetail invd ON inv.invoiceid=invd.invoiceid WHERE  DATE(inv.createdttm) BETWEEN (?) AND (?);
					
					select pr.projectid,lv.description AS agtype from project pr
					INNER JOIN agreement ag ON ag.clientid = pr.clientid AND ag.active = 1
					INNER JOIN agreementinfo ai ON ai.agreementid = ag.agreementid and pr.projectid=ai.projectid
					INNER JOIN lookupvalue lv ON lv.lkvalid = ag.agreementtypeid
				*/
			}); 
			// console.log('regionid, regionid, fromdate, todatess',regionid, regionid, fromdate, todatess,fromdate, todatess);
			con.query(query, [regionid, regionid, fromdate, todatess, regionid, regionid, fromdate, todatess,fromdate, todatess]).then(function (rowss, fields) {
				var result = [];
				var promises = [];
				var duties = [];
				var rows = rowss[0];
				var rows1 = rowss[1];
				var invno = rowss[2];
				var aggtype = rowss[3];
				var rowsReturned = rows.length;
				var rowsReturned1 = rows1.length;
				for (var i = 0; i < rowsReturned; i++) {
					duties.push({
						'category': rows[i].category,
						'memberscount': rows[i].memberscount,
						'totalduties': rows[i].totalduties,
						'eddays': rows[i].eddays
					});
					if ((i + 1 == rowsReturned) || (rows[i].projectid != rows[i + 1].projectid || rows[i].monthandyear != rows[i + 1].monthandyear || rows[i].status != rows[i + 1].status || rows[i].payslipno != rows[i + 1].payslipno)) {
						var res = i;
					//	console.log(invno);
						// if(rows[res].status > 2)
						// {
						//	console.log(rows[res].invoiceno);
						// 	return
						if( rows[res].invoiceno =='' || rows[res].invoiceno ==null )
						{
							var filinvoice = _.filter(invno, function(item) {
								                            if(item.projectid == rows[res].projectid && item.clientid == rows[res].clientid && item.monthandyear == rows[res].monthandyear  ) {
																console.log(item) ;
																rows[res].invoiceno=item.invoiceno;
																rows[res].invoiceid=item.invoiceid;
															} 
														});
							
						}
					// }
					var agtypes = _.filter(aggtype, function(item) {
						if(item.projectid == rows[res].projectid  ) {
							console.log(item) ;
							rows[res].agtype=item.agtype;
							
						} 
					});

						var jobss = new jobModel.getAuthorizeList(rows[res].projectid, rows[res].clientid, rows[res].clientname, rows[res].projectno, rows[res].projectname, rows[res].monthandyear, rows[res].currentstatus, rows[res].jobmasterid, duties, rows[res].status, rows[res].invoiceno,rows[res].bill_type, rows[res].arrearstatus, rows[res].payslipno, rows[res].edstatus,rows[res].sal_cashier_rejected,rows[res].sal_cao_rejected,rows[res].att_cashier_rejected,rows[res].att_cao_rejected,rows[res].inv_cashier_rejected,rows[res].inv_cao_rejected,rows[res].salaryslipid,rows[res].fk_salary_slip_id,rows[res].agtype); 
						duties = [];
						result.push(jobss);
					}
				}
				// console.log('rowsReturned1',rowsReturned1);
				for (var j = 0; j < rowsReturned1; j++) {
					duties.push({
						'category': rows1[j].category,
						'memberscount': rows1[j].memberscount,
						'totalduties': rows1[j].totalduties,
						'eddays': rows1[j].eddays
					});
					if ((j + 1 == rowsReturned1) || (rows1[j].projectid != rows1[j + 1].projectid || rows1[j].monthandyear != rows1[j + 1].monthandyear || rows1[j].status != rows1[j + 1].status || rows1[j].payslipno != rows1[j + 1].payslipno)) {
						var res = j;
						if( rows[res].invoiceno =='' || rows[res].invoiceno ==null )
						{
							var filinvoice = _.filter(invno, function(item) {
								                            if(item.projectid == rows[res].projectid && item.clientid == rows[res].clientid && item.monthandyear == rows[res].monthandyear  ) {
																console.log(item) ;
																rows[res].invoiceno=item.invoiceno;
																rows[res].invoiceid=item.invoiceid
															} 
														});
							
						}

						var agtypes = _.filter(aggtype, function(item) {
							if(item.projectid == rows[res].projectid  ) {
								console.log(item) ;
								rows[res].agtype=item.agtype;
								
							} 
						});

						var jobsss = new jobModel.getAuthorizeList(rows1[res].projectid, rows1[res].clientid, rows1[res].clientname, rows1[res].projectno, rows1[res].projectname, rows1[res].monthandyear, rows1[res].currentstatus, rows1[res].jobmasterid, duties, rows1[res].status, rows1[res].invoiceno,rows1[res].bill_type, rows1[res].arrearstatus, rows1[res].payslipno, rows1[res].status,rows1[res].sal_cashier_rejected,rows1[res].sal_cao_rejected,rows1[res].att_cashier_rejected,rows1[res].att_cao_rejected,rows1[res].inv_cashier_rejected,rows1[res].inv_cao_rejected,rows1[res].salaryslipid,rows1[res].fk_salary_slip_id,rows[res].agtype); 
						duties = [];
						result.push(jobsss);
					}
				}


				resolve(result);
			}).catch(function (err) {
				reject(err);
			});``
		}).catch(function (err) {
			reject(err);
		});
	});
}

// module.exports.getAuthorizeList = function (fromdate, todate, regionid) {
// 	var todates = moment(todate, "YYYY-MM-DD").add(1, 'days');
// 	var todatess = moment(todates).format('YYYY-MM-DD');
// 	return new app.promise(function (resolve, reject) {
// 		mySqlConnection.connection().then(function (con) {
// 			var query = multiline.stripIndent(function () {
// 				/*
// 					SELECT prr.projectid,prr.clientid,cll.organization AS clientname,prr.projectno,prr.name AS projectname,att.monthandyear,lv.description AS currentstatus,att.jobmasterid,jm.code AS category,att.status,att.edstatus,lv2.description AS salarystatus,inv.invoicestatus,COUNT(att.attendanceid) AS memberscount,SUM(att.presentdays) AS totalduties,SUM(att.eddays) AS eddays, att.attendanceid,IFNULL(ss.bill_type, 0) AS bill_type, ss.payslipno,inv.invoiceno,inv.arrearstatus,ss.cashier_rejected AS sal_cashier_rejected,ss.cao_rejected AS sal_cao_rejected,att.cashier_rejected AS att_cashier_rejected,att.cao_rejected AS att_cao_rejected,inv.cashier_rejected AS inv_cashier_rejected,inv.cao_rejected AS inv_cao_rejected,ss.status AS ssstatus
// 					FROM attendance att 
// 					INNER JOIN project prr ON prr.projectid = att.projectid AND att.clientid = prr.clientid
// 					LEFT JOIN salaryslip ss ON ss.attendanceid = att.attendanceid AND ss.bill_type = 0 AND (att.cashier_rejected = ss.cashier_rejected AND att.cao_rejected = ss.cao_rejected) AND ss.active = 1
// 					LEFT JOIN invoice inv ON inv.clientid = ss.clientid AND ss.projectid = inv.projectid AND inv.monthandyear = ss.monthandyear AND inv.`type` = 0 AND (att.cashier_rejected = inv.cashier_rejected AND att.cao_rejected = inv.cao_rejected) AND inv.active = 1 
// 					INNER JOIN client cll ON cll.clientid = att.clientid
// 					INNER JOIN jobmaster jm ON jm.jobmasterid = att.jobmasterid
// 					INNER JOIN lookupvalue lv ON lv.code = att.`status` AND lv.lkdmncode = 'STATUS'
// 					LEFT JOIN lookupvalue lv2 ON lv2.code = ss.`status` AND lv2.lkdmncode = 'CSTATUS'
// 					WHERE case ? when 0 then 1 = 1 else prr.regionid = ? END
// 					AND att.attendancereviewed BETWEEN (?) AND (?) 
// 					GROUP BY att.projectid,ss.payslipno,att.monthandyear,att.jobmasterid,att.`status`,att.edstatus
// 					ORDER BY att.projectid,att.monthandyear,att.jobmasterid,att.`status`;

// 					SELECT prr.projectid,prr.clientid,cl.organization AS clientname,prr.projectno,prr.name AS projectname,ss.monthandyear,
// 					lv.description AS currentstatus,ss.jobmasterid,jm.code AS category,
// 					COUNT(ss.attendanceid) AS memberscount,SUM(ss.presentdays) AS totalduties,SUM(ss.eddays) AS eddays,
// 					ss.status as status,IFNULL(ss.bill_type, 0) AS bill_type,ss.payslipno,inv.invoiceno,inv.arrearstatus
// 					FROM salaryslip ss 
// 					INNER JOIN client cl ON cl.clientid = ss.clientid
// 					INNER JOIN project prr ON prr.projectid = ss.projectid AND prr.clientid = ss.clientid
// 					INNER JOIN jobmaster jm ON jm.jobmasterid = ss.jobmasterid
// 					INNER JOIN invoice inv ON inv.clientid = ss.clientid AND ss.projectid = inv.projectid AND inv.`type` = 1
// 					INNER JOIN lookupvalue lv ON lv.code = ss.status AND lv.lkdmncode = 'CSTATUS'
// 					WHERE case ? when 0 then 1 = 1 else prr.regionid = ? END AND ss.bill_type = 1 
// 					AND DATE(ss.createdttm) BETWEEN (?) AND (?) GROUP BY ss.projectid,ss.jobmasterid;
// 				*/
// 			}); 

// 			con.query(query, [regionid, regionid, fromdate, todatess, regionid, regionid, fromdate, todatess]).then(function (rowss, fields) {

// 				var result = [];
// 				var promises = [];
// 				var duties = [];
// 				var duties1 = [];
// 				var rows = rowss[0];
// 				var rows1 = rowss[1];
// 				var rowsReturned = rows.length;
// 				var rowsReturned1 = rows1.length;
// 				var cnt = 0;
// 				for (var i = 0; i < rowsReturned; i++) {
// 					var edstatuss = [];
// 					var rowvalues = [];
// 					var count = i;
// 					if ((i + 1 == rowsReturned) || (rows[i].projectid == rows[i + 1].projectid || rows[i].monthandyear == rows[i + 1].monthandyear)) {
// 						count++;
// 						rowvalues.push(rows[i]);
// 						edstatuss.push({'status':rows[i].status,'edstatus':rows[i].edstatus,'jobmasterid':rows[i].jobmasterid});
// 					} else {
						
// 					}
// 					if(edstatuss.length) {
// 						var allcounts = 0;
// 						var atedstatus = 0;
// 						var attstaus = 0;
// 						var edatstatus = 0;
// 						var edstatus = 0;
// 						var atstatus = 0;
// 						var nrstatus = 0;
// 						var sstatus = 0;
// 						var estatus  = 0;
// 						var filteredapprsup = _.filter(edstatuss, function(item) {
//                             if((item.status == 1 || item.status == 7) && item.edstatus == 1) {
// 								estatus++;
// 							} 
// 							if((item.status == 2 || item.status == 3 || item.status == 4 || item.status == 6 || item.status == 5) && item.edstatus == 1) {
// 								estatus++;
// 							} 
// 							if((item.status == 1 || item.status == 7) && item.edstatus == 0) {
// 								sstatus++;
// 							} 
// 							if((item.status == 2 || item.status == 3 || item.status == 4 || item.status == 6 || item.status == 5) && item.edstatus == 0) {
// 								sstatus++;
// 							} 
// 						});

// 						if(estatus > 0 && sstatus > 0) {

// 						} else if(estatus > 0 && sstatus == 0) {

// 						}  else if(estatus == 0 && sstatus > 0) {

// 						} else {
							
// 						}

// 					} else {
						
// 					}

// 					if(rows[i].edstatus == 1) {
// 						var count = 0;
// 						var filteredapprsup = _.filter(rows, function(item) {
//                             if(rows[i].projectid == item.projectid && rows[i].clientid == item.clientid && rows[i].monthandyear == item.monthandyear && rows[i].jobmasterid == item.jobmasterid) {
// 								count++;
//                             }
// 						});
// 						if(count <= 1) {
// 							duties.push({
// 								'category': rows[i].category,
// 								'memberscount': rows[i].memberscount,
// 								'totalduties': rows[i].totalduties,
// 								'eddays': 0
// 							});
// 							duties1.push({
// 								'category': rows[i].category,
// 								'memberscount': rows[i].memberscount,
// 								'totalduties': 0,
// 								'eddays': rows[i].eddays
// 							});
// 							cnt++;
// 						} else {
// 							duties.push({
// 								'category': rows[i].category,
// 								'memberscount': rows[i].memberscount,
// 								'totalduties': 0,
// 								'eddays': rows[i].eddays
// 							});
// 						}
						 
// 					} else {
// 						duties.push({
// 							'category': rows[i].category,
// 							'memberscount': rows[i].memberscount,
// 							'totalduties': rows[i].totalduties,
// 							'eddays': rows[i].eddays
// 						});
// 					}

// 					if ((i + 1 == rowsReturned) || (rows[i].projectid != rows[i + 1].projectid || rows[i].monthandyear != rows[i + 1].monthandyear || rows[i].status != rows[i + 1].status || rows[i].payslipno != rows[i + 1].payslipno)) {
// 						var res = i;
// 						var curstatus = '';
// 						if(rows[i].status == 8 && rows[i].edstatus == 1 ) {				
// 							if(cnt > 0) {
// 								var jobss1 = new jobModel.getAuthorizeList(rows[res].projectid, rows[res].clientid, rows[res].clientname, rows[res].projectno, rows[res].projectname, rows[res].monthandyear, rows[res].currentstatus, rows[res].jobmasterid, duties1, rows[res].status, rows[res].invoiceno,rows[res].bill_type, rows[res].arrearstatus, rows[res].payslipno, rows[res].edstatus,rows[res].sal_cashier_rejected,rows[res].sal_cao_rejected,rows[res].att_cashier_rejected,rows[res].att_cao_rejected,rows[res].inv_cashier_rejected,rows[res].inv_cao_rejected,0); 

// 								var jobss = new jobModel.getAuthorizeList(rows[res].projectid, rows[res].clientid, rows[res].clientname, rows[res].projectno, rows[res].projectname, rows[res].monthandyear, rows[res].salarystatus, rows[res].jobmasterid, duties, rows[res].ssstatus, rows[res].invoiceno,rows[res].bill_type, rows[res].arrearstatus, rows[res].payslipno, rows[res].edstatus,rows[res].sal_cashier_rejected,rows[res].sal_cao_rejected,rows[res].att_cashier_rejected,rows[res].att_cao_rejected,rows[res].inv_cashier_rejected,rows[res].inv_cao_rejected,rows[res].ssstatus); 

// 								duties1 = [];
// 								result.push(jobss1);

// 								duties = [];
// 								result.push(jobss);
// 							}  else {

// 								var jobss = new jobModel.getAuthorizeList(rows[res].projectid, rows[res].clientid, rows[res].clientname, rows[res].projectno, rows[res].projectname, rows[res].monthandyear, rows[res].currentstatus, rows[res].jobmasterid, duties, rows[res].status, rows[res].invoiceno,rows[res].bill_type, rows[res].arrearstatus, rows[res].payslipno, rows[res].edstatus,rows[res].sal_cashier_rejected,rows[res].sal_cao_rejected,rows[res].att_cashier_rejected,rows[res].att_cao_rejected,rows[res].inv_cashier_rejected,rows[res].inv_cao_rejected,rows[res].ssstatus); 

// 								duties = [];
// 								result.push(jobss);
// 							}
							
// 						} else {
// 							var jobss = new jobModel.getAuthorizeList(rows[res].projectid, rows[res].clientid, rows[res].clientname, rows[res].projectno, rows[res].projectname, rows[res].monthandyear, rows[res].currentstatus, rows[res].jobmasterid, duties, rows[res].status, rows[res].invoiceno,rows[res].bill_type, rows[res].arrearstatus, rows[res].payslipno, rows[res].edstatus,rows[res].sal_cashier_rejected,rows[res].sal_cao_rejected,rows[res].att_cashier_rejected,rows[res].att_cao_rejected,rows[res].inv_cashier_rejected,rows[res].inv_cao_rejected,rows[res].ssstatus); 
// 							duties = [];
// 							result.push(jobss);
// 						}
// 					}
// 				}
// 				// console.log('rows[i]',result);
// 				for (var j = 0; j < rowsReturned1; j++) {
// 					// console.log('rows1[j]',rows1[j]);
// 					duties.push({
// 						'category': rows1[j].category,
// 						'memberscount': rows1[j].memberscount,
// 						'totalduties': rows1[j].totalduties,
// 						'eddays': rows1[j].eddays
// 					});
// 					if ((j + 1 == rowsReturned1) || (rows1[j].projectid != rows1[j + 1].projectid || rows1[j].monthandyear != rows1[j + 1].monthandyear)) {
// 						var jobss = new jobModel.getAuthorizeList(rows1[j].projectid, rows1[j].clientid, rows1[j].clientname, rows1[j].projectno, rows1[j].projectname, rows1[j].monthandyear, rows1[j].currentstatus, rows1[j].jobmasterid, duties, rows1[j].status, rows1[j].invoiceno, rows1[j].bill_type, rows1[j].arrearstatus, rows1[j].payslipno,rows1[j].status);
// 						duties = [];
// 						result.push(jobss);
// 					}
// 				}
// 				// console.log('result',JSON.stringify(result));
// 				resolve(result);
// 			}).catch(function (err) {
// 				reject(err);
// 			});
// 		}).catch(function (err) {
// 			reject(err);
// 		});
// 	});
// }

module.exports.getSalarySlipListNumbers = function (attendanceid,projectid, clientid,monthandyear) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var queries = '';
			queries += con.format("SELECT * FROM salaryslip ss WHERE ss.attendanceid = ?;", [attendanceid]);
			queries += con.format("SELECT * FROM invoice inv WHERE inv.projectid = ? AND inv.clientid = ? AND inv.monthandyear = ?;", [projectid,clientid,monthandyear]);
			con.query(queries).then(function (results, fields) {
				resolve(results);					
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.CheckAgreementType = function (projectid, clientid) {
	//console.log('projectid,clientid', projectid, clientid);
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
				    SELECT ag.agreementtypeid,lv.description AS agtype FROM agreement ag 
					INNER JOIN agreementinfo ai ON ai.agreementid = ag.agreementid
					INNER JOIN lookupvalue lv ON lv.lkvalid = ag.agreementtypeid
					WHERE ai.projectid = ? AND ag.clientid = ? 
				*/
			});
			con.query(query, [projectid, clientid]).then(function (result, fields) {
				resolve(result);
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.updateclaimStatus = function (projectid, clientid, monthandyear, status, payslipno) {
	console.log('payslipno,type', payslipno);
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			con.query('UPDATE invoice SET invoicestatus = ? WHERE projectid = ? AND clientid = ? AND monthandyear = ? AND type = 1;UPDATE salaryslip SET status = ? WHERE projectid = ? AND clientid = ? AND payslipno = ? AND bill_type = 1;', [status, projectid, clientid, monthandyear, status, projectid, clientid, payslipno]).then(function (rows, fields) {
				resolve("Success")
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}
module.exports.updatepayslipno = function (payslipno, type) {
	console.log('payslipno,type', payslipno, type);
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			con.query('UPDATE setting SET value = ? WHERE code = ?;', [payslipno, type]).then(function (rows, fields) {
				resolve("Success")
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}
module.exports.getAuthorizedPaySlipList = function (fromdate, todate, regionid) {
	//console.log('payslipno,type', payslipno, type);
	//,COUNT(att.attendanceid) AS memberscount,SUM(ss.netpay) AS netsalary
	//AND ss.projectid = inv.projectid invoice inner join remove
	var todates = moment(todate, "YYYY-MM-DD").add(1, 'days');
	var todatess = moment(todates).format('YYYY-MM-DD');
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {

				
				/*
					SELECT pr.projectid,pr.projectno,pr.clientid,pr.name AS projectname,att.monthandyear,ss.payslipno,
					'0' AS memberscount,'0' AS netsalary,lv.description AS currentstatus,att.status,inv.invoiceno,bs.passorderno,ss.arrearstatus,ss.bill_type,inv.invoiceid,ss.cashier_rejected AS sal_cashier_rejected,ss.cao_rejected AS sal_cao_rejected,att.cashier_rejected AS att_cashier_rejected,att.cao_rejected AS att_cao_rejected,inv.cashier_rejected AS inv_cashier_rejected,inv.cao_rejected AS inv_cao_rejected
					FROM attendance att
					INNER JOIN project pr ON pr.projectid = att.projectid
					INNER JOIN lookupvalue lv ON lv.code = att.`status` AND lv.lkdmncode = 'STATUS'
					INNER JOIN salaryslip ss ON ss.attendanceid = att.attendanceid AND ss.clientid = att.clientid AND ss.projectid = att.projectid AND att.monthandyear = ss.monthandyear AND att.memberid = ss.memberid AND ss.bill_type = 0 AND (att.cashier_rejected = ss.cashier_rejected AND att.cao_rejected = ss.cao_rejected) AND ss.active = 1 
					LEFT JOIN invoice inv ON inv.clientid = ss.clientid  AND inv.monthandyear = ss.monthandyear AND inv.`type` = 0 AND inv.active = 1 
					LEFT JOIN bank_slip_details bsd ON bsd.salaryslipno = ss.payslipno
					LEFT JOIN bankslip bs ON bsd.bankslipid = bs.bankslipid
					WHERE case ? when 0 then 1 = 1 else pr.regionid = ? END AND att.`status` > 2 AND att.attendancereviewed BETWEEN (?) AND (?) GROUP BY ss.payslipno,ss.monthandyear,ss.projectid,bsd.salaryslipno;

					SELECT 
						pr.projectid,pr.projectno,pr.clientid,pr.name AS projectname,ss.monthandyear,ss.payslipno,COUNT(ss.salaryslipid) AS memberscount, SUM(ss.netpay) AS netsalary,lv.description AS currentstatus,ss.status,inv.invoiceno,bs.passorderno,ss.arrearstatus,ss.bill_type,inv.invoiceid,ss.cashier_rejected AS sal_cashier_rejected,ss.cao_rejected AS sal_cao_rejected,ss.cashier_rejected AS att_cashier_rejected,ss.cao_rejected AS att_cao_rejected,inv.cashier_rejected AS inv_cashier_rejected,inv.cao_rejected AS inv_cao_rejected
					FROM salaryslip ss
					INNER JOIN client cl ON cl.clientid = ss.clientid
					INNER JOIN project pr ON pr.projectid = ss.projectid AND ss.clientid = pr.clientid
					LEFT JOIN invoice inv ON inv.clientid = ss.clientid AND inv.projectid = ss.projectid AND inv.`type` = 1
					INNER JOIN invoicedetail indd ON indd.projectid = ss.projectid AND ss.clientid = indd.clientid 
					AND ss.monthandyear = indd.monthandyear
					INNER JOIN jobmaster jm ON jm.jobmasterid = ss.jobmasterid
					INNER JOIN lookupvalue lv ON lv.code = ss.`status` AND lv.lkdmncode = 'CSTATUS'
					LEFT JOIN bank_slip_details bsd ON bsd.salaryslipno = ss.payslipno
					LEFT JOIN bankslip bs ON bsd.bankslipid = bs.bankslipid
					WHERE case ? when 0 then 1 = 1 else pr.regionid = ? END AND ss.status > 2 AND ss.bill_type = 1 AND 
					ss.createdttm BETWEEN (?) AND (?) 
					GROUP BY ss.payslipno,ss.projectid,ss.jobmasterid;

					SELECT invd.invoiceid,invd.clientid,invd.projectid,inv.monthandyear,inv.invoiceno FROM invoice inv inner join invoicedetail invd ON inv.invoiceid=invd.invoiceid WHERE  DATE(inv.createdttm) BETWEEN (?) AND (?)
				*/
			});
			con.query(query, [regionid, regionid, fromdate, todatess, regionid, regionid, fromdate, todatess, fromdate, todatess]).then(function (rowss, fields) {
				var result1 = [];
				var promises = [];
				var rows = rowss[0];
				var rows1 = rowss[1];
				var invno = rowss[2];
				var rowsReturned = rows.length;
				var rowsReturned1 = rows1.length;
				for (var i = 0; i < rowsReturned; i++) {
					promises.push(new Promise((resolve, reject) => {
						jobDal.AuthorizedMembersDetailsByID(rows[i].projectid, rows[i].clientid, rows[i].monthandyear, i, rows[i].payslipno).then(function (results) {
							var res = results[0].res;
							if( rows[res].invoiceno =='' || rows[res].invoiceno ==null )
						{
						
							var filinvoice = _.filter(invno, function(item) {
								if(item.projectid == rows[res].projectid && item.clientid == rows[res].clientid && item.monthandyear == rows[res].monthandyear  ) {
									console.log(item) ;
									rows[res].invoiceno=item.invoiceno;
									rows[res].invoiceid=item.invoiceid;
								} 
							});
						}
							var jobs = new jobModel.getAuthorizedCashierList(rows[res].projectid, rows[res].projectno, rows[res].clientid, rows[res].projectname, rows[res].monthandyear, results[0].totalmembers, results[0].netpay, rows[res].payslipno, results[0].results, rows[res].currentstatus, rows[res].status, rows[res].invoiceno, rows[res].passorderno, rows[res].arrearstatus, rows[res].bill_type, rows[res].invoiceid,rows[res].sal_cashier_rejected,rows[res].sal_cao_rejected,rows[res].att_cashier_rejected,rows[res].att_cao_rejected,rows[res].inv_cashier_rejected,rows[res].inv_cao_rejected);
							result1.push(jobs);
							resolve(results);
						});
					}))
				}

				for (var j = 0; j < rowsReturned1; j++) {
					promises.push(new Promise((resolve, reject) => {
						jobDal.AuthorizedMembersArrearDetailsByID(rows1[j].projectid, rows1[j].clientid, j,rows1[j].payslipno).then(function (results) {
							var res = results[0].res;
							
							if( rows1[res].invoiceno =='' || rows1[res].invoiceno ==null )
						{
							console.log('dfgfd',results);
							var filinvoice = _.filter(invno, function(item) {
								if(item.projectid == rows1[res].projectid && item.clientid == rows1[res].clientid && item.monthandyear == rows1[res].monthandyear  ) {
									console.log(item) ;
									rows1[res].invoiceno=item.invoiceno;
									rows1[res].invoiceid=item.invoiceid;
								} 
							});
						}
							var jobs = new jobModel.getAuthorizedCashierList(rows1[res].projectid, rows1[res].projectno, rows1[res].clientid, rows1[res].projectname, rows1[res].monthandyear, results[0].totalmembers, results[0].netpay, rows1[res].payslipno, results[0].results, rows1[res].currentstatus, rows1[res].status, rows1[res].invoiceno, rows1[res].passorderno, rows1[res].arrearstatus, rows1[res].bill_type, rows1[res].invoiceid,rows1[res].sal_cashier_rejected,rows1[res].sal_cao_rejected,rows1[res].att_cashier_rejected,rows1[res].att_cao_rejected,rows1[res].inv_cashier_rejected,rows1[res].inv_cao_rejected);
							result1.push(jobs);
							resolve(results);
						});
					}))
				}

				app.promise.all(promises).then(function () {
					resolve(result1);
				});
			}).catch(function (err) {
				console.log('err',err);
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}
module.exports.AuthorizedMembersDetailsByID = function (projectid, clientid, monthandyear, i, payslipno) {
	//console.log('projectid,clientid', projectid, clientid, monthandyear);
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
					SELECT mem.memberid,mem.texcono,mem.firstname,mem.accountno,mem.branchname,ss.netpay,att.attendanceid,att.monthandyear
					FROM attendance att  
					INNER JOIN salaryslip ss ON ss.attendanceid = att.attendanceid 
					AND att.monthandyear = ss.monthandyear AND ss.memberid = att.memberid
					INNER JOIN member mem ON mem.memberid = att.memberid AND att.memberid = ss.memberid
					WHERE att.projectid = ? AND att.clientid = ? AND att.monthandyear = ? AND ss.payslipno = ? AND att.active = 1 AND ss.active =1 GROUP BY mem.memberid
				*/
			});
			con.query(query, [projectid, clientid, monthandyear, payslipno]).then(function (result, fields) {
				var results = [];
				var ress = [];
				var netpay = 0;
				var totalmembers = result.length; 
				for (var res = 0; res < result.length; res++) {
					netpay += parseFloat(result[res].netpay);
					var jobss = new jobModel.getAuthorizedMembersList(result[res].memberid, result[res].texcono, result[res].firstname, result[res].accountno, result[res].branchname, result[res].netpay, result[res].attendanceid,result[res].monthandyear);
					results.push(jobss);
				}
				ress.push({
					'results': results,
					'res': i,
					'totalmembers': totalmembers,
					'netpay': netpay
				});
				resolve(ress);
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.AuthorizedMembersArrearDetailsByID = function (projectid, clientid, i, payslipno) {
	console.log('projectid,clientid', projectid, clientid, payslipno);
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
					SELECT mem.memberid,mem.texcono,mem.firstname,mem.accountno,mem.branchname,ssd.netpay,att.attendanceid,att.monthandyear
					FROM attendance att  
					INNER JOIN salaryslip ss ON ss.attendanceid = att.attendanceid 
					INNER JOIN salaryslip_difference ssd ON ssd.salaryslipid=ss.salaryslipid 
					AND att.monthandyear = ss.monthandyear AND ss.memberid = att.memberid
					INNER JOIN member mem ON mem.memberid = att.memberid AND att.memberid = ss.memberid
					WHERE att.projectid = ? AND att.clientid = ? AND ss.payslipno = ? AND att.active = 1 AND ss.active =1 GROUP BY mem.memberid,att.monthandyear
				*/
			});
			con.query(query, [projectid, clientid, payslipno]).then(function (result, fields) {
				var results = [];
				var ress = [];
				var netpay = 0;
				var totalmembers = result.length; 
				for (var res = 0; res < result.length; res++) {
					netpay += parseFloat(result[res].netpay);
					var jobss = new jobModel.getAuthorizedMembersList(result[res].memberid, result[res].texcono, result[res].firstname, result[res].accountno, result[res].branchname, result[res].netpay, result[res].attendanceid,result[res].monthandyear);
					results.push(jobss);
				}
				ress.push({
					'results': results,
					'res': i,
					'totalmembers': totalmembers,
					'netpay': netpay
				});
				resolve(ress);
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.getPassOrderNumber = function () {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			con.query('SELECT * FROM setting WHERE code = ?;', ['PASNO']).then(function (rows, fields) {
				resolve({
					'passordernumber': rows[0].value
				});
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.getPassOrderNumberForList = function () {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
					SELECT bs.bankslipid,bs.passorderno,inv.invoicestatus FROM bankslip bs 
					INNER JOIN bank_slip_details bsd ON bsd.bankslipid = bs.bankslipid
					INNER JOIN invoice inv ON inv.invoiceid = bsd.invoiceid
					WHERE bs.active = 1 GROUP BY bs.bankslipid;
				*/
			});
			con.query(query).then(function (rows, fields) {
				resolve(rows);
				
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.getPassOrderNumberForListByDate = function (fromdate,todate) {

	var todates = moment(todate, "YYYY-MM-DD").add(1, 'days');
	var todatess = moment(todates).format('YYYY-MM-DD');
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
					SELECT bs.bankslipid,bs.passorderno,inv.invoicestatus,sp.status FROM bankslip bs 
					INNER JOIN bank_slip_details bsd ON bsd.bankslipid = bs.bankslipid
					INNER JOIN salaryslip sp ON sp.payslipno=bsd.salaryslipno
					INNER JOIN invoice inv ON inv.invoiceid = bsd.invoiceid
					WHERE bs.active = 1 AND DATE(bs.created_time) BETWEEN ? AND ? GROUP BY bs.bankslipid;
				*/
			});
			console.log('fromdate,todatess',fromdate,todatess);
			con.query(query,[fromdate,todatess]).then(function (rows, fields) {
				resolve(rows);
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
} 
module.exports.getPassOrderNoProjectDetailsByID = function (passordernumber) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
					SELECT pr.projectid,pr.projectno,pr.name AS projectname,
					inv.invoiceno,sp.monthandyear,pr.clientid,'0' as gross,
					'0' AS netpay,'0' AS totalmembers,'0' AS deductions,
					lv.description AS currentstatus,inv.invoicestatus AS status,
					inv.type,sp.payslipno AS payslipno,sp.status AS salstatus
					FROM bank_slip_details bsd 
					INNER JOIN salaryslip sp ON sp.payslipno=bsd.salaryslipno
					inner  JOIN invoice inv ON inv.invoiceid=bsd.invoiceid
					inner JOIN invoicedetail invd ON invd.invoiceid=inv.invoiceid
					INNER JOIN project pr ON pr.projectid=sp.projectid
					LEFT JOIN lookupvalue lv ON lv.code = inv.`invoicestatus` AND lv.lkdmncode = 'CSTATUS'
					WHERE bsd.bankslipid = ?
					GROUP BY sp.projectid;
				*/
			});
			con.query(query, [passordernumber]).then(function (rows, fields) {
				console.log('rows', rows);
				var result = [];
				var promises = [];
				for (var i = 0; i < rows.length; i++) {
					result.push(rows);
					promises.push(new Promise((resolve, reject) => {
						var j = i;
						if(rows[j].type == 1) {
							var query = multiline.stripIndent(function () {
								/*
									SELECT COUNT(*) AS totalmembers,SUM(ssd.grossamount) AS gross,SUM(ssd.netpay) AS netpay
									FROM salaryslip  ss
									left JOIN salaryslip_difference ssd ON ss.salaryslipid=ssd.salaryslipid
									where ss.projectid IN (?)  AND ss.clientid IN (?) AND ss.bill_type = ? AND ss.payslipno = ?
								*/
							});
							con.query(query, [rows[i].projectid, rows[i].clientid, rows[i].type, rows[i].payslipno]).then(function (rowss, fields) {
								result[0][j].gross = Math.round(rowss[0].gross);
								result[0][j].netpay = Math.round(rowss[0].netpay);
								result[0][j].totalmembers = rowss[0].totalmembers;
								result[0][j].deductions = rowss[0].gross - rowss[0].netpay;
								result[0][j].deductions = Math.round(result[0][j].deductions);
								resolve(rowss);
							}).catch(function (err) {
								reject(err);
							});
						} else {
							var query = multiline.stripIndent(function () {
								/*
									SELECT COUNT(*) AS totalmembers,SUM(ss.grossamount) AS gross,SUM(ss.netpay) AS netpay
									FROM salaryslip  ss
									where ss.monthandyear = ? AND ss.projectid IN (?)  AND ss.clientid IN (?) AND ss.bill_type = ? AND ss.payslipno = ?
								*/
							});
							con.query(query, [rows[i].monthandyear, rows[i].projectid, rows[i].clientid, rows[i].type, rows[i].payslipno]).then(function (rowss, fields) {
								result[0][j].gross = Math.round(rowss[0].gross);
								result[0][j].netpay = Math.round(rowss[0].netpay);
								result[0][j].totalmembers = rowss[0].totalmembers;
								result[0][j].deductions = rowss[0].gross - rowss[0].netpay;
								result[0][j].deductions = Math.round(result[0][j].deductions);
								resolve(rowss);
							}).catch(function (err) {
								reject(err);
							});
						}
						
					}))
				}
				app.promise.all(promises).then(function () {
					resolve(rows);
				});
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}
module.exports.CashierAuthorizeApproval = function (projectdata, passorderno) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var pono = passorderno.split('-');
			var ino = (parseInt(pono[1]) + 1) + '';
			var value = ino.length >= 3 ? ino : new Array(3 - ino.length + 1).join('0') + ino;
			var newpassorderno = pono[0] + '-' + value;
			con.query('INSERT INTO bankslip (`passorderno`) VALUES (?); UPDATE setting SET value = ? WHERE code = "PASNO";', [passorderno, newpassorderno]).then(function (rowss, fields) {
				var insertIds = rowss[0].insertId;
				var queries = '';
				var promises = [];
				for (var i = 0; i < projectdata.length; i++) {
					// console.log('Number(projectdata[i].bill_type)',Number(projectdata[i].bill_type) );
					// promises.push(new Promise((resolve, reject) => {
						if (Number(projectdata[i].bill_type) == 1) {

							queries += con.format("INSERT INTO bank_slip_details (`bankslipid`,`salaryslipno`,`invoiceid`) VALUES (?,?,?); UPDATE salaryslip SET status = 4 WHERE clientid = ? AND projectid = ? AND payslipno= ? AND bill_type = 1; UPDATE invoice SET invoicestatus = 4 WHERE clientid = ? AND projectid = ? AND invoiceid = ? AND type = 1;", [insertIds, projectdata[i].payslipno, projectdata[i].invoiceid,projectdata[i].clientid, projectdata[i].projectid, projectdata[i].payslipno,projectdata[i].clientid, projectdata[i].projectid, projectdata[i].invoiceid]);

						} else {
							queries += con.format("INSERT INTO bank_slip_details (`bankslipid`,`salaryslipno`,`invoiceid`) VALUES (?,?,?);UPDATE salaryslip SET status = 4 WHERE clientid = ? AND projectid = ? AND monthandyear= ? AND bill_type = 0 AND payslipno = ?;UPDATE invoice SET invoicestatus = 4 WHERE clientid = ? AND projectid = ? AND monthandyear= ? AND type = 0;", [insertIds, projectdata[i].payslipno, projectdata[i].invoiceid,projectdata[i].clientid, projectdata[i].projectid, projectdata[i].monthandyear, projectdata[i].payslipno,projectdata[i].clientid, projectdata[i].projectid, projectdata[i].monthandyear]);
							for (var j = 0; j < projectdata[i].members.length; j++) {
								queries += con.format("UPDATE attendance SET status = 4 WHERE clientid = ? AND projectid = ? AND monthandyear= ? AND memberid = ? AND attendanceid = ?;", [projectdata[i].clientid, projectdata[i].projectid, projectdata[i].monthandyear,projectdata[i].members[j].memberid,projectdata[i].members[j].attendanceid]);
							}
						}


					// }))
				}
				// app.promise.all(promises).then(function () {
					console.log('queries',queries);
					con.query(queries).then(function (rows, fields) {
						resolve("Success");
					}).catch(function (err) {
						reject(err);
					});
				// });
			}).catch(function (err) {
				console.log('err',err);
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}
module.exports.CAOLevelApproval = function (projectdata, status) {
	console.log('projectdata',projectdata);
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var queries = '';
			for (var i = 0; i < projectdata.length; i++) {
				var dt = new Date(projectdata[i].monthandyear);
				var EndDate = moment(dt).endOf('month').format('YYYY-MM-DD');
				if(projectdata.type == 1) { 
					queries += con.format("UPDATE salaryslip SET status = 6 WHERE clientid = ? AND projectid = ? AND payslipno = ? AND status IN (4,5) AND bill_type = 1; UPDATE invoice SET invoicestatus = 6 WHERE clientid = ? AND projectid = ? AND invoiceno = ? AND invoicestatus IN (4,5);",[projectdata[i].clientid,projectdata[i].projectid,projectdata[i].payslipno,projectdata[i].clientid,projectdata[i].projectid,projectdata[i].invoiceno]);
				} else {
					queries += con.format("UPDATE salaryslip SET status = 6 WHERE clientid = ? AND projectid = ? AND monthandyear = ? AND status IN (4,5); UPDATE invoice SET invoicestatus = 6 WHERE clientid = ? AND projectid = ? AND monthandyear = ? AND invoicestatus IN (4,5);UPDATE attendance SET status = 6 WHERE clientid = ? AND projectid = ? AND monthandyear= ? AND status IN (4,5);UPDATE memberhistory mem INNER JOIN salaryslip ss ON ss.memberid = mem.memberid AND ss.projectid = mem.projectid SET mem.enddate = ? WHERE ss.projectid = ? AND ss.clientid = ? AND ss.monthandyear = ?;UPDATE member mm INNER JOIN salaryslip ss ON ss.memberid = mm.memberid SET mm.lastaccess = ? WHERE ss.projectid = ? AND ss.clientid = ? AND ss.monthandyear = ?;",[projectdata[i].clientid,projectdata[i].projectid, projectdata[i].monthandyear,projectdata[i].clientid,projectdata[i].projectid,projectdata[i].monthandyear,projectdata[i].clientid, projectdata[i].projectid, projectdata[i].monthandyear,EndDate,projectdata[i].projectid,projectdata[i].clientid, projectdata[i].monthandyear,EndDate,projectdata[i].projectid,projectdata[i].clientid, projectdata[i].monthandyear]);
				}
				
			}
			con.query(queries).then(function (rows, fields) {
				resolve("Success");
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}


module.exports.RejectionProcess = function (projectdata, status,rejectreason) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var queries = '';
			for (var i = 0; i < projectdata.length; i++) {
				queries += con.format("UPDATE salaryslip SET status = ?, cashier_rejected = ? WHERE clientid = ? AND projectid = ? AND monthandyear= ? AND status IN (3,4,5) AND payslipno = ?;UPDATE invoice SET invoicestatus = ?, cashier_rejected = ? WHERE clientid = ? AND projectid = ? AND monthandyear= ? AND invoicestatus IN (3,4,5);", [status,1,projectdata[i].clientid, projectdata[i].projectid, projectdata[i].monthandyear, projectdata[i].payslipno,status,1,projectdata[i].clientid, projectdata[i].projectid, projectdata[i].monthandyear]);
				for (var j = 0; j < projectdata[i].members.length; j++) {
					queries += con.format("UPDATE attendance SET status = ?, cashier_rejected = ? ,reason_others = ? WHERE clientid = ? AND projectid = ? AND monthandyear= ? AND memberid = ?;", [status,1,rejectreason,projectdata[i].clientid, projectdata[i].projectid, projectdata[i].monthandyear,projectdata[i].members[j].memberid]);
				}
			}
			con.query(queries).then(function (rows, fields) {
				resolve("Success");
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.RejectionProcesssupervisor = function (projectdata, status,rejectreason) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var queries = '';
			for (var i = 0; i < projectdata.length; i++) {
				queries += con.format("UPDATE salaryslip SET status = ?, cashier_rejected = ? WHERE clientid = ? AND projectid = ? AND monthandyear= ? AND status IN (3,4,5) AND payslipno = ?;UPDATE invoice SET invoicestatus = ?, cashier_rejected = ? WHERE clientid = ? AND projectid = ? AND monthandyear= ? AND invoicestatus IN (3,4,5);UPDATE attendance SET status = ? ,reason_others = ? WHERE projectid= ? AND monthandyear = ? AND status IN (3);", [status,2,projectdata[i].clientid, projectdata[i].projectid, projectdata[i].monthandyear, projectdata[i].payslipno,status,2,projectdata[i].clientid, projectdata[i].projectid, projectdata[i].monthandyear,status,rejectreason,projectdata[i].projectid, projectdata[i].monthandyear]);
				// for (var j = 0; j < projectdata[i].members.length; j++) {
				// 	queries += con.format("UPDATE attendance SET status = ?, cashier_rejected = ? ,reason_others = ? WHERE clientid = ? AND projectid = ? AND monthandyear= ? AND memberid = ?;", [status,2,rejectreason,projectdata[i].clientid, projectdata[i].projectid, projectdata[i].monthandyear,projectdata[i].members[j].memberid]);
				// }
			}
			con.query(queries).then(function (rows, fields) {
				resolve("Success");
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}


module.exports.RejectionProcessCAO = function (projectdata, status,rejectreason) {

	console.log('dfgdf',rejectreason);
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var queries = '';
			for (var i = 0; i < projectdata.length; i++) {
				queries += con.format("UPDATE salaryslip SET status = ?, cao_rejected = ? WHERE clientid = ? AND projectid = ? AND monthandyear= ? AND status IN (3,4,5) AND payslipno = ?;UPDATE invoice SET invoicestatus = ?, cao_rejected = ? WHERE clientid = ? AND projectid = ? AND monthandyear= ? AND invoicestatus IN (3,4,5);UPDATE attendance att INNER JOIN salaryslip ss ON ss.attendanceid = att.attendanceid SET att.status = ?, att.reason_others = ? ,att.cao_rejected = ? WHERE att.clientid = ? AND att.projectid = ? AND att.monthandyear= ? AND ss.payslipno = ?;", [status,1,projectdata[i].clientid, projectdata[i].projectid, projectdata[i].monthandyear,projectdata[i].payslipno,status,1,projectdata[i].clientid, projectdata[i].projectid, projectdata[i].monthandyear,status,rejectreason,1,projectdata[i].clientid, projectdata[i].projectid, projectdata[i].monthandyear, projectdata[i].payslipno]);
				if(status == 7) {
					queries += con.format("UPDATE bankslip bs INNER JOIN bank_slip_details bsd ON bsd.bankslipid = bs.bankslipid INNER JOIN invoice inv ON inv.invoiceid = bsd.invoiceid SET bs.active = 0 WHERE clientid = ? AND projectid = ? AND monthandyear = ?;", [projectdata[i].clientid, projectdata[i].projectid, projectdata[i].monthandyear]);
				}
			}
			con.query(queries).then(function (rows, fields) {
				resolve("Success");
			}).catch(function (err) {
				reject(err);
			});

		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.CashierAuthorizeRejection = function (projectdata, status) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			for (var i = 0; i < projectdata.length; i++) {
				var query = multiline.stripIndent(function () {
					/*
						UPDATE salaryslip SET status = ? WHERE clientid = ? AND projectid = ? AND monthandyear= ? AND status = 1;
						UPDATE invoice SET invoicestatus = ? WHERE clientid = ? AND projectid = ? AND monthandyear= ? AND invoicestatus = 1;
						UPDATE attendance SET status = ? WHERE clientid = ? AND projectid = ? AND monthandyear= ? AND status = 3;
					*/
				});
				con.query(query, [projectdata[i].clientid, projectdata[i].projectid, projectdata[i].monthandyear, status, projectdata[i].clientid, projectdata[i].projectid, projectdata[i].monthandyear, status, projectdata[i].clientid, projectdata[i].projectid, projectdata[i].monthandyear, status]).then(function (rows, fields) {
					resolve("Success");
				}).catch(function (err) {
					reject(err);
				});
			}
		}).catch(function (err) {
			reject(err);
		});
	});
}


module.exports.ValidatePassOrderNumber = function (passorderno) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			con.query('SELECT * FROM bankslip WHERE passorderno = ?;', [passorderno]).then(function (rows, fields) {
				var reslength = rows.length;
				if (reslength) {
					resolve(1);
				} else {
					resolve(0);
				}
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}
module.exports.getDownloadPayslipByID = function (passordernumber) {
	return new app.promise(function (resolve, reject) {
		var query = multiline.stripIndent(function () {
			/*
				SELECT ss.projectid,ss.clientid,ss.monthandyear,ss.payslipno FROM bankslip bs 
				INNER JOIN bank_slip_details bsd ON bsd.bankslipid = bs.bankslipid
				INNER JOIN salaryslip ss ON ss.payslipno = bsd.salaryslipno
				WHERE bs.passorderno = ? AND ss.`status` > 1
				GROUP BY bsd.salaryslipno;
			*/
		});
		mySqlConnection.connection().then(function (con) {
			con.query(query, [passordernumber]).then(function (rows, fields) {
				resolve(rows);
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}
module.exports.getSalarySlipNoDetails = function (fromdate, todate, regionid, projectid) {
	var todates = moment(todate, "YYYY-MM-DD").add(1, 'days'); 
	var todatess = moment(todates).format('YYYY-MM-DD');
	return new app.promise(function (resolve, reject) {
		var query = multiline.stripIndent(function () {
			/*
				SELECT pr.projectno,pr.name AS projectname,ss.payslipno,ss.wagetypeid,ss.wageyearid,ss.wagecategoryid,ss.wageareaid,wcs.category_code AS wagecategory,wcs.category_description,lv2.description AS wageyear,ss.jobmasterid,lv.description AS currentstatus,ss.arrearstatus,ss.monthandyear
				FROM salaryslip ss
				INNER JOIN project pr ON pr.projectid = ss.projectid AND ss.clientid = pr.clientid
				INNER JOIN wage_category_master wcs ON wcs.category_id = ss.wagecategoryid
				INNER JOIN lookupvalue lv2 ON lv2.lkvalid = ss.wageyearid
				INNER JOIN lookupvalue lv ON lv.code = ss.`status` AND lv.lkdmncode = 'CSTATUS'
				WHERE  case ? when 0 then 1 = 1 else  pr.regionid = ? end  AND ss.bill_type = 0 AND ss.projectid = ? AND ss.status IN (6) AND
				ss.createdttm BETWEEN (?) AND (?) GROUP BY ss.jobmasterid,ss.payslipno ORDER BY ss.payslipno DESC
			*/
		});
		mySqlConnection.connection().then(function (con) {
			con.query(query, [regionid, regionid, projectid, fromdate, todatess]).then(function (rows, fields) {
				var result = [];
				var jobmasterid = [];
				var rowsReturned = rows.length;
				for (var i = 0; i < rows.length; i++) {
					// console.log('rows[i].jobmasterid', rows[i].jobmasterid);
					jobmasterid.push(rows[i].jobmasterid);
					if ((i + 1 == rowsReturned) || (rows[i].payslipno != rows[i + 1].payslipno)) {
						rows[i].jobmasterid = jobmasterid;
						result.push(rows[i]);
						jobmasterid = [];
					}
				}
				resolve(result);
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}
module.exports.getWageCategoryDetails = function () {
	return new app.promise(function (resolve, reject) {
		var query = multiline.stripIndent(function () {
			/*
				SELECT wcs.category_id,wcs.category_code,wcs.category_description,wcs.wageyearid,
				lv.description AS wageyear, wcs.wagetypeid,lv1.description AS wagetype
				FROM wage_category_master wcs 
				INNER JOIN lookupvalue lv ON lv.lkvalid = wcs.wageyearid
				INNER JOIN lookupvalue lv1 ON lv1.lkvalid = wcs.wagetypeid
				WHERE wcs.active = 1;
			*/
		});
		mySqlConnection.connection().then(function (con) {
			con.query(query).then(function (rows, fields) {
				resolve(rows);
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.getWageCategoryDetailsByID = function (projectid) {
	return new app.promise(function (resolve, reject) {
		var query = multiline.stripIndent(function () {
			/*
				SELECT wcs.category_id,wcs.category_code,wcs.category_description,wcs.wageyearid,
				lv.description AS wageyear, wcs.wagetypeid,lv1.description AS wagetype
				FROM wage_category_master wcs 
				INNER JOIN lookupvalue lv ON lv.lkvalid = wcs.wageyearid
				INNER JOIN lookupvalue lv1 ON lv1.lkvalid = wcs.wagetypeid
				WHERE wcs.active = 1;
			*/
		});
		mySqlConnection.connection().then(function (con) {
			con.query(query).then(function (rows, fields) {
				resolve(rows);
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.getSalarySlipNumbers = function (salaryslipno) {
	return new app.promise(function (resolve, reject) {
		var query = multiline.stripIndent(function () {
			/*
				SELECT ss.clientid,ss.projectid,ss.wagecategoryid,ss.wagetypeid,ss.wageareaid,ss.monthandyear,ss.jobmasterid FROM salaryslip ss
				WHERE ss.payslipno IN (?) GROUP BY ss.payslipno
			*/
		});
		mySqlConnection.connection().then(function (con) {
			con.query(query, [salaryslipno]).then(function (rows, fields) {
				// console.log('rows', rows);
				resolve(rows);
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}
module.exports.salaryarreargeneration = function (salaryslipno, wagecategoryid, wageyearid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var result = [];
			var promises = [];
			for (var j = 0; j < salaryslipno.length; j++) {
				promises.push(new Promise((resolve, reject) => {
					var ress = j;
					var query = multiline.stripIndent(function () {
						/*
							SELECT 
								ss.attendanceid,
								ss.clientid,
								ss.projectid,
								ss.memberid,
								ss.monthandyear,
								ss.presentdays,
								ss.jobpostingdetailid,
								ss.eddays,
								ss.othours,
								ss.jobmasterid,
								ss.salaryslipid,
								ss.wagetypeid,
								ss.wageareaid,
								ss.basic,ss.hra,ss.da,ss.edamount,ss.cca,ss.ma,ss.epf,ss.edli,ss.other2,ss.other1,ss.netpay,ss.gratuity,ss.grossamount,ss.ratehd,ss.lic,ss.admchr,ss.bonus,ss.unifdt,ss.conveyance,ss.washallow,ss.leapay
							FROM salaryslip ss WHERE ss.payslipno = ?
							ORDER BY ss.memberid,ss.jobmasterid
						*/
					});
					con.query(query, [salaryslipno[j].payslipno]).then(function (rows, fields) {
						//console.log('rows',rows);
						jobDal.getWageRateDetailsByID(salaryslipno[ress].wagetypeid, salaryslipno[ress].wageareaid, salaryslipno[ress].jobmasterid, wagecategoryid, wageyearid).then(function (output3) {
							for (var k = 0; k < rows.length; k++) {
								var noofdays = getMonthDays(rows[k].monthandyear);
								var basic = 0;
								var da = 0;
								var hra = 0;
								var cca = 0;
								var ma = 0;
								var epf = 0;
								var edli = 0;
								var admchr = 0;
								var bonus = 0;
								var gratuity = 0;
								var unifdt = 0;
								var leapay = 0;
								var conveyance = 0;
								var washallow = 0;
								var lic = 0;
								var other1 = 0;
								var other2 = 0;
								var ratehd = 0;
								var components;
								var difference;
								var totalduty = 0;
								var ncbasic = 0;
								var edamount = 0;
								var gross = 0;
								var netpay = 0;

								var dfbasic = 0;
								var dfda = 0;
								var dfhra = 0;
								var dfcca = 0;
								var dfma = 0;
								var dfepf = 0;
								var dfedli = 0;
								var dfadmchr = 0;
								var dfbonus = 0;
								var dfgratuity = 0;
								var dfunifdt = 0;
								var dfleapay = 0;
								var dfconveyance = 0;
								var dfwashallow = 0;
								var dflic = 0;
								var dfother1 = 0;
								var dfother2 = 0;
								var dfratehd = 0;
								var dftotalduty = 0;
								var dfncbasic = 0;
								var dfedamount = 0;
								var dfgross = 0;
								var dfnetpay = 0;
								var rowsReturned = output3.length;
								// console.log('rowsReturned',rowsReturned);
								for (var i = 0; i < output3.length; i++) {
									// console.log('jobasterid',rows[k].jobmasterid , output3[i].jobmasterid);
									if (rows[k].jobmasterid == output3[i].jobmasterid) {
										totalduty = rows[k].presentdays;
										if (output3[i].salcode == 'BASIC') {
											ncbasic = parseFloat(output3[i].particularamount);
											basic = (output3[i].particularamount * totalduty) / noofdays;
											dfbasic = basic - rows[k].basic;
										}
										if (output3[i].salcode == 'DA') {
											da = (output3[i].particularamount * totalduty) / noofdays;
											dfda = da - rows[k].da;
										}
										if (output3[i].salcode == 'HRA') {
											hra = (output3[i].particularamount * totalduty) / noofdays;
											dfhra = hra - rows[k].hra;
										}
										if (output3[i].salcode == 'CCA') {
											cca = (output3[i].particularamount * totalduty) / noofdays;
											dfcca = cca - rows[k].cca;
										}
										if (output3[i].salcode == 'MALLWN') {
											ma = (output3[i].particularamount * totalduty) / noofdays;
											dfma = ma - rows[k].ma;
										}
										if (output3[i].salcode == 'EPF') {
											epf = (output3[i].particularamount * totalduty) / noofdays;
											dfepf = epf - rows[k].epf;
										}
										if (output3[i].salcode == 'EDLI') {
											edli = (output3[i].particularamount * totalduty) / noofdays;
											dfedli = edli - rows[k].edli;
										}
										if (output3[i].salcode == 'ADCHRG') {
											admchr = (output3[i].particularamount * totalduty) / noofdays;
											dfadmchr = admchr - rows[k].admchr;
										}
										if (output3[i].salcode == 'BONUS') {
											bonus = (output3[i].particularamount * totalduty) / noofdays;
											dfbonus = bonus - rows[k].bonus;
										}
										if (output3[i].salcode == 'GRAT') {
											gratuity = (output3[i].particularamount * totalduty) / noofdays;
											dfgratuity = gratuity - rows[k].gratuity;
										}
										if (output3[i].salcode == 'UNIFRM') {
											unifdt = (output3[i].particularamount * totalduty) / noofdays;
											dfunifdt = unifdt - rows[k].unifdt;
										}
										if (output3[i].salcode == 'RELCHRG') {
											leapay = (output3[i].particularamount * totalduty) / noofdays;
											dfleapay = leapay - rows[k].leapay;
										}
										if (output3[i].salcode == 'CONVEY') {
											conveyance = (output3[i].particularamount * totalduty) / noofdays;
											dfconveyance = conveyance - rows[k].conveyance;
										}
										if (output3[i].salcode == 'WASH') {
											washallow = (output3[i].particularamount * totalduty) / noofdays;
											dfwashallow = washallow - rows[k].washallow;
										}
										if (output3[i].salcode == 'LIC') {
											lic = (output3[i].particularamount * totalduty) / noofdays;
											dflic = lic - rows[k].lic;
										}
										if (output3[i].salcode == 'OTHER1') {
											other1 = (output3[i].particularamount * totalduty) / noofdays;
											dfother1 = other1 - rows[k].other1;
										}
										if (output3[i].salcode == 'OTHER2') {
											other2 = (output3[i].particularamount * totalduty) / noofdays;
											dfother2 = other2 - rows[k].other2;
										}
										if (output3[i].salcode == 'MA') {
											ma = (output3[i].particularamount * totalduty) / noofdays;
											dfma = ma - rows[k].ma;
										}
										ratehd = output3[i].particularamount;
										if (output3[i].salcode == 'RATEHD') {
											if (output3[i].eddays != 0)
												edamount = ratehd * output3[i].eddays / noofdays;
											dfedamount = edamount - rows[k].edamount;
											if (output3[i].othours != 0)
												edamount = ratehd * parseFloat(output3[i].othours / 8) / noofdays;
											dfedamount = edamount - rows[k].edamount;
										}
										if (output3[i].salcode == 'LR') {
											leapay = (output3[i].particularamount * totalduty) / noofdays;
											dfleapay = edamount - rows[k].leapay;
										}
										gross = basic + edamount + hra + ma + unifdt + leapay + bonus + washallow + other1;
										dfgross = dfbasic + dfedamount + dfhra + dfma + dfunifdt + dfleapay + dfbonus + dfwashallow + dfother1;
										netpay = gross - (epf + other2);
										gross = Number((gross).toFixed(0));
										netpay = Number((netpay).toFixed(0));

										dfnetpay = dfgross - (dfepf + dfother2);
										dfgross = Number((dfgross).toFixed(0));
										dfnetpay = Number((dfnetpay).toFixed(0));

										components = new jobModel.salarycomponents(edamount, ncbasic, basic, da, hra, cca, ma, epf, edli, admchr, bonus, gratuity, unifdt, leapay, conveyance, washallow, lic, other1, other2, ratehd, gross, netpay);
										difference = new jobModel.salarycomponents(dfedamount, ncbasic, dfbasic, dfda, dfhra, dfcca, dfma, dfepf, dfedli, dfadmchr, dfbonus, dfgratuity, dfunifdt, dfleapay, dfconveyance, dfwashallow, dflic, dfother1, dfother2, ratehd, dfgross, dfnetpay);

										console.log('components',components);
										console.log('difference',difference);
									}
								}
								var selling = new jobModel.Arrearsalarymember(rows[k].memberid, rows[k].wagetypeid, wageyearid, rows[k].monthandyear, rows[k].projectid, rows[k].clientid, rows[k].attendanceid, rows[k].jobpostingdetailid, rows[k].jobmasterid, rows[k].wageareaid, rows[k].presentdays, rows[k].eddays, rows[k].othours, wagecategoryid, components, rows[k].salaryslipid, 1, difference);
								result.push(selling);
								items = [];
								basic = 0;
								da = 0;
								hra = 0;
								cca = 0;
								ma = 0;
								epf = 0;
								edli = 0;
								admchr = 0;
								bonus = 0;
								gratuity = 0;
								unifdt = 0;
								leapay = 0;
								conveyance = 0;
								washallow = 0;
								lic = 0;
								other1 = 0;
								other2 = 0;
								ratehd = 0;
								components;
								totalduty = 0;
								ncbasic = 0;
								edamount = 0;
								gross = 0;
								netpay = 0;
								otherdeductions = 0;
								otherallowance = 0;
								dfbasic = 0;
								dfda = 0;
								dfhra = 0;
								dfcca = 0;
								dfma = 0;
								dfepf = 0;
								dfedli = 0;
								dfadmchr = 0;
								dfbonus = 0;
								dfgratuity = 0;
								dfunifdt = 0;
								dfleapay = 0;
								dfconveyance = 0;
								dfwashallow = 0;
								dflic = 0;
								dfother1 = 0;
								dfother2 = 0;
								dfratehd = 0;
								dftotalduty = 0;
								ncbasic = 0;
								dfedamount = 0;
								dfgross = 0;
								dfnetpay = 0;
							}
							resolve(result);
						}).catch(function (err) {
							reject(err);
						});
					}).catch(function (err) {
						reject(err);
					});
				}))
			}
			app.promise.all(promises).then(function () {
				resolve(result);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.getWageCategoryDetailsByID = function (wagecategoryid) {
	return new app.promise(function (resolve, reject) {
		var query = multiline.stripIndent(function () {
			/*
				SELECT wcs.wageyearid,wcs.category_id
				FROM wage_category_master wcs
				WHERE wcs.active = 1 AND wcs.category_id = ?;
			*/
		});
		mySqlConnection.connection().then(function (con) {
			con.query(query, [wagecategoryid]).then(function (rows, fields) {
				resolve(rows);
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}
module.exports.getWageRateDetailsByID = function (wagetypeid, wageareaid, jobmasterid, wagecategoryid, wageyearid) {
	// console.log('wagetypeid, wageareaid, jobmasterid, wagecategoryid, wageyearid', wagetypeid, wageareaid, jobmasterid, wagecategoryid, wageyearid);
	return new app.promise(function (resolve, reject) {
		var query = multiline.stripIndent(function () {
			/*
				SELECT wg.wagetypeid,wg.wagecategoryid,wg.wageyearid,wg.wageareaid,wg.jobmasterid,wg.particularid,wg.particularamount,lv.description AS salcode FROM wages wg
				INNER JOIN lookupvalue lv ON lv.lkvalid = wg.particularid
				WHERE wg.wagetypeid = ? AND wg.wageareaid = ? AND wg.wageyearid = ? AND wg.wagecategoryid = ? AND wg.jobmasterid IN (?);
			*/
		});
		mySqlConnection.connection().then(function (con) {
			con.query(query, [wagetypeid, wageareaid, wageyearid, wagecategoryid, jobmasterid]).then(function (rows, fields) {
				resolve(rows);
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}
module.exports.generateArrearSalary = function (result, payslipno, individualpayslipno) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			//if (result.length > 0) {
				var queries = '';
				queries += con.format("INSERT INTO salaryslip (payslipno,individualpayslipno, clientid, projectid, memberid, jobpostingdetailid, jobmasterid, attendanceid, monthandyear, presentdays, eddays, othours, wagetypeid, wageyearid, wageareaid,wagecategoryid, ncbasic,  edamount, basic, da, hra, cca, ma, epf, edli, admchr, bonus, gratuity, unifdt, leapay, conveyance, washallow, lic, other1, other2, ratehd,grossamount,netpay,fk_salary_slip_id,bill_type,status) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);", [payslipno, individualpayslipno, result.clientid, result.projectid, result.memberid, result.jobpostingdetailid, result.jobmasterid, result.attendanceid, result.attendancemonth, result.presentdays, result.eddays, result.othours, result.wagetypeid, result.wageyearid, result.wageareaid, result.wagecategoryid, result.salarycomponents.ncbasic, result.salarycomponents.edamount, result.salarycomponents.basic, result.salarycomponents.da, result.salarycomponents.hra, result.salarycomponents.cca, result.salarycomponents.ma, result.salarycomponents.epf, result.salarycomponents.edli, result.salarycomponents.admchr, result.salarycomponents.bonus, result.salarycomponents.gratuity, result.salarycomponents.unifdt, result.salarycomponents.leapay, result.salarycomponents.conveyance, result.salarycomponents.washallow, result.salarycomponents.lic, result.salarycomponents.other1, result.salarycomponents.other2, result.salarycomponents.ratehd, result.salarycomponents.gross, result.salarycomponents.netpay, result.salaryslipid, result.type, 1]);

				// for (var i = 0; i < result.length; i++) {
				// 	var ino = (i + 1) + '';
				// 	var value = ino.length >= 3 ? ino : new Array(3 - ino.length + 1).join('0') + ino;
				// 	individualpayslipno = payslipno + '-' + value;
				// }
				console.log('queries',queries);
				con.query(queries).then(function (rows, fields) {
					var lastinsertid = rows.insertId;
					var queries1 = '';
					queries1 += con.format("INSERT INTO salaryslip_difference (payslipno,individualpayslipno, clientid, projectid, memberid, jobpostingdetailid, jobmasterid, attendanceid, monthandyear, presentdays, eddays, othours, wagetypeid, wageyearid, wageareaid,wagecategoryid, ncbasic,  edamount, basic, da, hra, cca, ma, epf, edli, admchr, bonus, gratuity, unifdt, leapay, conveyance, washallow, lic, other1, other2, ratehd,grossamount,netpay,salaryslipid) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);", [payslipno, individualpayslipno, result.clientid, result.projectid, result.memberid, result.jobpostingdetailid, result.jobmasterid, result.attendanceid, result.attendancemonth, result.presentdays, result.eddays, result.othours, result.wagetypeid, result.wageyearid, result.wageareaid, result.wagecategoryid, result.difference.ncbasic, result.difference.edamount, result.difference.basic, result.difference.da, result.difference.hra, result.difference.cca, result.difference.ma, result.difference.epf, result.difference.edli, result.difference.admchr, result.difference.bonus, result.difference.gratuity, result.difference.unifdt, result.difference.leapay, result.difference.conveyance, result.difference.washallow, result.difference.lic, result.difference.other1, result.difference.other2, result.difference.ratehd, result.difference.gross, result.difference.netpay, lastinsertid]);
					con.query(queries1).then(function (rows1, fields) {
						resolve(rows1);
					}).catch(function (err) {
						reject(err);
					});
				}).catch(function (err) {
					reject(err);
				});
			//}
		}).catch(function (err) {
			reject(err);
		});
	});
}
module.exports.getInvoiceNoDetails = function (fromdate, todate, regionid, projectid) {
	var todates = moment(todate, "YYYY-MM-DD").add(1, 'days'); 
	var todatess = moment(todates).format('YYYY-MM-DD');
	return new app.promise(function (resolve, reject) {
		var query = multiline.stripIndent(function () {
			/*
				SELECT inv.invoiceno,inv.invoiceid,inv.servicecharge,inv.tax,ind.jobmasterid,inv.projectid,wcs.category_code AS wagecategory,lv2.description AS wageyear,ss.wageareaid,ss.wagetypeid,pro.projectno,pro.name AS projectname,lv.description AS currentstatus,wcs.category_description,ss.monthandyear
				FROM invoice inv 
				INNER JOIN salaryslip ss ON ss.projectid = inv.projectid AND ss.clientid = inv.clientid  AND ss.monthandyear = inv.monthandyear AND ss.bill_type = 0
				INNER JOIN invoicedetail ind ON ind.invoiceid = inv.invoiceid
				INNER JOIN project pro ON pro.projectid = inv.projectid AND inv.clientid = pro.clientid
				INNER JOIN wage_category_master wcs ON wcs.category_id = ss.wagecategoryid
				INNER JOIN lookupvalue lv ON lv.code = ss.`status` AND lv.lkdmncode = 'CSTATUS'
				INNER JOIN lookupvalue lv2 ON lv2.lkvalid = ss.wageyearid
				WHERE  case ? when 0 then 1 = 1 else  pro.regionid = ? end AND inv.type = 0 AND inv.projectid = ? AND
				inv.createdttm BETWEEN (?) AND (?)  
				GROUP BY inv.invoiceid,ind.jobmasterid
			*/
		});
		mySqlConnection.connection().then(function (con) {
			con.query(query, [regionid, regionid, projectid, fromdate, todatess]).then(function (rows, fields) {
				// console.log('rows', rows);
				var result = [];
				var jobmasterid = [];
				var rowsReturned = rows.length;
				for (var i = 0; i < rows.length; i++) {
					jobmasterid.push(rows[i].jobmasterid);
					if ((i + 1 == rowsReturned) || (rows[i].invoiceno != rows[i + 1].invoiceno)) {
						rows[i].jobmasterid = jobmasterid;
						result.push(rows[i]);
						jobmasterid = [];
					}
				}
				resolve(result);
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.claimarreargeneration = function (invoiceno, wagecategoryid, wageyearid) {
	// console.log('invoiceno', invoiceno);
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
					SELECT inv.invoiceid,inv.invoiceno,inv.monthandyear,inv.servicecharge,inv.tax,inv.projectid,inv.clientid,ind.salary,ind.noofduties,ind.noofperson,ind.days,ind.jobmasterid,ind.salaryamount,ind.eddays,ind.salaryedamount,inv.edseperate,inv.taxtype FROM invoice inv
					INNER JOIN invoicedetail ind ON ind.invoiceid = inv.invoiceid
					WHERE inv.invoiceid = ?;
				*/
			});
			con.query(query, [invoiceno.invoiceid]).then(function (rows, fields) {
				var rowsReturned = rows.length;
				var result = [];
				var dfresult = [];
				var fresult = [];
				var totalduties = [];
				var diffduties = [];
				var amount = {};
				var salaryamount = {};
				var servicetax = {};
				var servicecharges = {};
				var total = {};
				var duties = {};
				var gross = 0;

				var dfamount = {};
				var dfsalaryamount = {};
				var dfservicetax = {};
				var dfservicecharges = {};
				var dftotal = {};
				var dfduties = {};
				var dfgross = 0;

				jobDal.getWageRateClaimDetailsByID(invoiceno.wagetypeid, invoiceno.wageareaid, invoiceno.jobmasterid, wagecategoryid, wageyearid).then(function (output3) {
					if (rowsReturned > 0) {
						for (var i = 0; i < rowsReturned; i++) {
							for (var j = 0; j < output3.length; j++) {
								if (output3[j].jobmasterid == rows[i].jobmasterid) {

									salaryamount = ((parseFloat(output3[j].particularamount) / rows[i].days) * rows[i].noofduties).toFixed(2);

									salaryedamount = ((parseFloat(output3[j].particularamount) / rows[i].days) * rows[i].eddays).toFixed(2);

									var job = new jobModel.Claiminvoice(rows[i].clientid, rows[i].projectid, rows[i].jobmasterid, output3[j].particularamount, rows[i].noofduties, salaryamount, rows[i].noofperson, rows[i].days, rows[i].monthandyear,rows[i].invoiceid,rows[i].eddays,salaryedamount);
									totalduties.push(job);

									// dfamount = output3[j].particularamount - rows[i].salary;
									// dfsalaryamount = job.salaryamount - rows[i].salaryamount;

									// var difference = new jobModel.Claiminvoice(rows[i].clientid, rows[i].projectid, rows[i].jobmasterid, dfamount, rows[i].noofduties, dfsalaryamount, rows[i].noofperson, rows[i].days, rows[i].monthandyear);
									// diffduties.push(difference);
									
									// gross  salary added for Each job
									gross = (parseFloat(salaryamount) + parseFloat(gross)).toFixed(2);
									// dfgross = (parseFloat(difference.salaryamount) + parseFloat(dfgross)).toFixed(2);
									// console.log('dfgross', dfgross);
									if ((i + 1 == rowsReturned) || (rows[i].projectid != rows[i + 1].projectid || rows[i].jobmasterid != rows[i + 1].jobmasterid)) {
										// total salary, after adding service charges and tax

										servicecharges = ((gross / 100) * parseFloat(rows[i].servicecharge)).toFixed(2);
										servicetax = (((parseFloat(gross) + parseFloat(servicecharges)) / 100) * parseFloat(rows[i].tax)).toFixed(2);
										total = Math.round(parseFloat(gross) + parseFloat(servicetax) + parseFloat(servicecharges));

										// dfservicecharges = ((dfgross / 100) * parseFloat(rows[i].servicecharge)).toFixed(2);
										// dfservicetax = (((parseFloat(dfgross) + parseFloat(dfservicecharges)) / 100) * parseFloat(rows[i].tax)).toFixed(2);
										// dftotal = Math.round(parseFloat(dfgross) + parseFloat(dfservicetax) + parseFloat(servicecharges));

										result.push(new jobModel.Claimduties(rows[i].clientid, rows[i].projectid, rows[i].monthandyear, totalduties, gross, rows[i].servicecharge, rows[i].tax, servicecharges, servicetax, total, rows[i].invoiceid));

										// dfresult.push(new jobModel.Claimduties(rows[i].clientid, rows[i].projectid, rows[i].monthandyear, diffduties, dfgross, rows[i].servicecharge, rows[i].tax, dfservicecharges, dfservicetax, dftotal, rows[i].invoiceid));

										totalduties = [];
										// diffduties = [];
									}
								}
							}
						}
						// fresult.push({
						// 	'invoice': result,
						// 	'diff': dfresult
						// });
						resolve(result);
					} else {
						reject("Attendance not exist");
					}
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
}
// module.exports.claimarreargeneration = function (invoiceno, wagecategoryid, wageyearid) {
// 	// console.log('invoiceno', invoiceno);
// 	return new app.promise(function (resolve, reject) {
// 		mySqlConnection.connection().then(function (con) {
// 			var query = multiline.stripIndent(function () {
// 				/*
// 					SELECT inv.invoiceid,inv.invoiceno,inv.monthandyear,inv.servicecharge,inv.tax,inv.projectid,inv.clientid,ind.salary,ind.noofduties,ind.noofperson,ind.days,ind.jobmasterid,ind.salaryamount FROM invoice inv
// 					INNER JOIN invoicedetail ind ON ind.invoiceid = inv.invoiceid
// 					WHERE inv.invoiceid = ?;
// 				*/
// 			});
// 			con.query(query, [invoiceno.invoiceid]).then(function (rows, fields) {
// 				var rowsReturned = rows.length;
// 				var result = [];
// 				var dfresult = [];
// 				var fresult = [];
// 				var totalduties = [];
// 				var diffduties = [];
// 				var amount = {};
// 				var salaryamount = {};
// 				var servicetax = {};
// 				var servicecharges = {};
// 				var total = {};
// 				var duties = {};
// 				var gross = 0;

// 				var dfamount = {};
// 				var dfsalaryamount = {};
// 				var dfservicetax = {};
// 				var dfservicecharges = {};
// 				var dftotal = {};
// 				var dfduties = {};
// 				var dfgross = 0;

// 				jobDal.getWageRateClaimDetailsByID(invoiceno.wagetypeid, invoiceno.wageareaid, invoiceno.jobmasterid, wagecategoryid, wageyearid).then(function (output3) {
// 					if (rowsReturned > 0) {
// 						for (var i = 0; i < rowsReturned; i++) {
// 							for (var j = 0; j < output3.length; j++) {
// 								if (output3[j].jobmasterid == rows[i].jobmasterid) {

// 									salaryamount = ((parseFloat(output3[j].particularamount) / rows[i].days) * rows[i].noofduties).toFixed(2);

// 									var job = new jobModel.Claiminvoice(rows[i].clientid, rows[i].projectid, rows[i].jobmasterid, output3[j].particularamount, rows[i].noofduties, salaryamount, rows[i].noofperson, rows[i].days, rows[i].monthandyear);

// 									dfamount = output3[j].particularamount - rows[i].salary;
// 									dfsalaryamount = job.salaryamount - rows[i].salaryamount;

// 									var difference = new jobModel.Claiminvoice(rows[i].clientid, rows[i].projectid, rows[i].jobmasterid, dfamount, rows[i].noofduties, dfsalaryamount, rows[i].noofperson, rows[i].days, rows[i].monthandyear);

// 									diffduties.push(difference);
// 									totalduties.push(job);

// 									// gross  salary added for Each job
// 									gross = (parseFloat(job.salaryamount) + parseFloat(gross)).toFixed(2);
// 									dfgross = (parseFloat(difference.salaryamount) + parseFloat(dfgross)).toFixed(2);
// 									// console.log('dfgross', dfgross);
// 									if ((i + 1 == rowsReturned) || (rows[i].projectid != rows[i + 1].projectid || rows[i].jobmasterid != rows[i + 1].jobmasterid)) {
// 										// total salary, after adding service charges and tax

// 										servicecharges = ((gross / 100) * parseFloat(rows[i].servicecharge)).toFixed(2);
// 										servicetax = (((parseFloat(gross) + parseFloat(servicecharges)) / 100) * parseFloat(rows[i].tax)).toFixed(2);
// 										total = Math.round(parseFloat(gross) + parseFloat(servicetax) + parseFloat(servicecharges));

// 										dfservicecharges = ((dfgross / 100) * parseFloat(rows[i].servicecharge)).toFixed(2);
// 										dfservicetax = (((parseFloat(dfgross) + parseFloat(dfservicecharges)) / 100) * parseFloat(rows[i].tax)).toFixed(2);
// 										dftotal = Math.round(parseFloat(dfgross) + parseFloat(dfservicetax) + parseFloat(servicecharges));

// 										result.push(new jobModel.Claimduties(rows[i].clientid, rows[i].projectid, rows[i].monthandyear, totalduties, gross, rows[i].servicecharge, rows[i].tax, servicecharges, servicetax, total, rows[i].invoiceid));

// 										dfresult.push(new jobModel.Claimduties(rows[i].clientid, rows[i].projectid, rows[i].monthandyear, diffduties, dfgross, rows[i].servicecharge, rows[i].tax, dfservicecharges, dfservicetax, dftotal, rows[i].invoiceid));

// 										totalduties = [];
// 										diffduties = [];
// 									}
// 								}
// 							}
// 						}
// 						fresult.push({
// 							'invoice': result,
// 							'diff': dfresult
// 						});
// 						resolve(fresult);
// 					} else {
// 						reject("Attendance not exist");
// 					}
// 				}).catch(function (err) {
// 					reject(err);
// 				});
// 			}).catch(function (err) {
// 				reject(err);
// 			});
// 		}).catch(function (err) {
// 			reject(err);
// 		});
// 	});
// }

module.exports.getWageRateClaimDetailsByID = function (wagetypeid, wageareaid, jobmasterid, wagecategoryid, wageyearid) {
	console.log('wagetypeid, wageareaid, jobmasterid, wagecategoryid, wageyearid', wagetypeid, wageareaid, jobmasterid, wagecategoryid, wageyearid);
	return new app.promise(function (resolve, reject) {
		var query = multiline.stripIndent(function () {
			/*
				SELECT wg.wagetypeid,wg.wagecategoryid,wg.wageyearid,wg.wageareaid,wg.jobmasterid,wg.particularid,wg.particularamount,lv.description AS salcode FROM wages wg
				INNER JOIN lookupvalue lv ON lv.lkvalid = wg.particularid AND lv.code = 'RATEHD'
				WHERE wg.wagetypeid = ? AND (wg.wageareaid = ? AND wg.wageyearid = ?) AND wg.wagecategoryid = ? AND wg.jobmasterid IN (?);
			*/
		});
		mySqlConnection.connection().then(function (con) {
			con.query(query, [wagetypeid, wageareaid, wageyearid, wagecategoryid, jobmasterid]).then(function (rows, fields) {
				resolve(rows);
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}
module.exports.generatearrearinvoiceexit = function (invoiceid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			con.query('SELECT fkinvoiceid FROM invoice where fkinvoiceid = ? AND active= 1', [invoiceid]).then(function (rows, fields) {
				if (rows.length > 0) {
					reject("Arrear Claim Already Created");
				} {
					resolve("Success")
				}
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}
module.exports.claiminvoice = function (invoice, invoice1) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			console.log('query1', query1);
			con.query('INSERT INTO invoice SET ?', query).then(function (rows, fields) {
				query1.invoiceid = rows.insertId;
				con.query('INSERT INTO invoice_diff SET ?', query1).then(function (rows1, fields) {
					resolve({
						"invoiceid": rows.insertId,
						"diffinvoiceid": rows1.insertId,
					})
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
}

module.exports.claiminvoicedetails = function (totalduties, diffduties, invoiceid, diffinvoiceid) {
	console.log('invoiceid...',invoiceid);
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {

			// for(var i = 0;i< totalduties.length;i++) {
			// 	console.log('totalduties',totalduties[i]);
			// 	queries += con.format("INSERT INTO invoicedetail (projectid,clientid,invoiceid, jobmasterid, salary, noofduties, noofperson, days, salaryamount,monthandyear) VALUES (?,?,?,?,?,?,?,?,?,?);", [item.projectid, item.clientid, invoiceid, item.jobmasterid, item.salary, item.noofduties, item.noofperson, item.days, item.salaryamount, item.monthandyear]);	
			// }
			if (totalduties.length > 0) {
				var queries = '';
				totalduties.forEach(function (item) {
					queries += con.format("INSERT INTO invoicedetail (projectid,clientid,invoiceid, jobmasterid, salary, noofduties, noofperson, days, salaryamount,monthandyear,fk_invoice_id,type,eddays,salaredamount) VALUES (?,?,?,?,?,?,?,?,?,?,?,?);", [item.projectid, item.clientid, invoiceid, item.jobmasterid, item.salary, item.noofduties, item.noofperson, item.days, item.salaryamount, item.monthandyear, item.invoiceid,1,item.eddays,item.salaryedamount]);	
				});
				console.log('queries',queries);
				// diffduties.forEach(function (item1) {
				// 	queries += con.format("INSERT INTO invoicedetail_diff (projectid,clientid,invoiceid, jobmasterid, salary, noofduties, noofperson, days, salaryamount,monthandyear) VALUES (?,?,?,?,?,?,?,?,?,?);", [item1.projectid, item1.clientid, diffinvoiceid, item1.jobmasterid, item1.salary, item1.noofduties, item1.noofperson, item.days, item1.salaryamount, item1.salaryamount, item1.monthandyear]);
				// });
				con.query(queries).then(function (rows, fields) {
					resolve({
						"invoicedetailid": invoiceid
					});
				}).catch(function (err) {
					reject(err);
				});
			}
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.getpayslipprint = function (monthandyear,regionid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
				   SELECT ss.payslipno,pr.projectno,pr.name AS projectname,ss.salaryslipid,
					DATE_FORMAT(ss.createdttm,'%d-%m-%Y') AS salaryslipdate,jm.code AS categoryname,ss.projectid,ss.clientid,ss.status,ss.monthandyear,COUNT(ss.salaryslipid) AS memberscount,SUM(ss.presentdays) AS totalduties,SUM(ss.eddays) AS eddays,ss_print_count AS ssprintcount,pf_print_count AS pfprintcount,ss.bill_type as billtype
					FROM salaryslip ss
					INNER JOIN jobmaster jm ON jm.jobmasterid = ss.jobmasterid
					INNER JOIN project pr ON pr.projectid = ss.projectid AND ss.clientid = pr.clientid
					WHERE ss.monthandyear = ? AND case ? when 0 then 1 = 1 else pr.regionid = ? END AND ss.status > 1 AND ss.bill_type = 0 GROUP BY ss.payslipno
				*/
			});
			console.log('regionid monthandyear', regionid, monthandyear);
			con.query(query, [monthandyear,regionid,regionid]).then(function (rows, fields) {
				var result = [];
				var duties = [];
				var duties1 = [];
				var rowsReturned = rows.length;
				for (var i = 0; i < rowsReturned; i++) {
					duties.push({
						'category': rows[i].categoryname,
						'memberscount': rows[i].memberscount,
						'totalduties': rows[i].totalduties,
						'eddays': rows[i].eddays
					});

					if ((i + 1 == rowsReturned) || (rows[i].projectid != rows[i + 1].projectid || rows[i].monthandyear != rows[i + 1].monthandyear || rows[i].billtype != rows[i + 1].billtype)) {
						var jobss = new jobModel.getSalarySlipList(rows[i].payslipno, rows[i].projectno, rows[i].projectname, rows[i].salaryslipid, rows[i].salaryslipdate, rows[i].categoryname, rows[i].projectid, rows[i].clientid, duties, rows[i].status, rows[i].monthandyear, rows[i].ssprintcount, rows[i].pfprintcount, rows[i].billtype);
						duties = [];
						result.push(jobss);
					}
					//console.log('result', result);
				}
				con.query('SELECT payslipno FROM salaryslip ss WHERE ss.monthandyear = ? AND ss.bill_type = 1 GROUP BY ss.payslipno;', [monthandyear]).then(function (rowss, fields) {
					var rowsReturned1 = rowss.length;
					var payslipnos = [];
					for (var j = 0; j < rowsReturned1; j++) {
						payslipnos.push(rowss[j].payslipno);
					}
					if(payslipnos.length) {
						var query1 = multiline.stripIndent(function () {
							/*
							SELECT ss.payslipno,pr.projectno,pr.name AS projectname,ss.salaryslipid,
								DATE_FORMAT(ss.createdttm,'%d-%m-%Y') AS salaryslipdate,jm.code AS categoryname,ss.projectid,ss.clientid,ss.status,ss.monthandyear,COUNT(ss.salaryslipid) AS memberscount,SUM(ss.presentdays) AS totalduties,SUM(ss.eddays) AS eddays,ss_print_count AS ssprintcount,pf_print_count AS pfprintcount,ss.bill_type as billtype
								FROM salaryslip ss
								INNER JOIN jobmaster jm ON jm.jobmasterid = ss.jobmasterid
								INNER JOIN project pr ON pr.projectid = ss.projectid AND ss.clientid = pr.clientid
								WHERE ss.payslipno IN (?) AND ss.status > 1  AND ss.bill_type = 1 AND case ? when 0 then 1 = 1 else pr.regionid = ? END GROUP BY ss.payslipno
							*/
						});
						con.query(query1, [payslipnos,regionid,regionid]).then(function (rows1, fields) {
							var rowsReturned2 = rows1.length;
							for (var k = 0; k < rowsReturned2; k++) {
								duties1.push({
									'category': rows1[k].categoryname,
									'memberscount': rows1[k].memberscount,
									'totalduties': rows1[k].totalduties,
									'eddays': rows1[k].eddays
								});
								if ((k + 1 == rowsReturned2) || (rows1[k].projectid != rows1[k + 1].projectid || rows1[k].monthandyear != rows1[k + 1].monthandyear || rows1[k].billtype != rows1[k + 1].billtype)) {
									var jobs = new jobModel.getSalarySlipList(rows1[k].payslipno, rows1[k].projectno, rows1[k].projectname, rows1[k].salaryslipid, rows1[k].salaryslipdate, rows1[k].categoryname, rows1[k].projectid, rows1[k].clientid, duties1, rows1[k].status, rows1[k].monthandyear, rows1[k].ssprintcount, rows1[k].pfprintcount, rows1[k].billtype);
									duties1 = [];
									result.push(jobs);
								}
							}
							resolve(result);
						}).catch(function (err) {
							reject(err);
						});
					} else {
						resolve(result);
					}
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
}

module.exports.getpayslipprintSalary = function (monthandyear,regionid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
				   SELECT ss.payslipno,pr.projectno,pr.name AS projectname,ss.salaryslipid,
					DATE_FORMAT(ss.createdttm,'%d-%m-%Y') AS salaryslipdate,jm.code AS categoryname,ss.projectid,ss.clientid,ss.status,ss.monthandyear,COUNT(ss.salaryslipid) AS memberscount,SUM(ss.presentdays) AS totalduties,SUM(ss.eddays) AS eddays,ss_print_count AS ssprintcount,pf_print_count AS pfprintcount,ss.bill_type as billtype
					FROM salaryslip ss
					INNER JOIN jobmaster jm ON jm.jobmasterid = ss.jobmasterid
					INNER JOIN project pr ON pr.projectid = ss.projectid AND ss.clientid = pr.clientid
					WHERE ss.monthandyear = ? AND case ? when 0 then 1 = 1 else pr.regionid = ? END AND ss.status > 1 AND ss.bill_type = 0 GROUP BY ss.payslipno
				*/
			});
			console.log('regionid monthandyear', regionid, monthandyear);
			con.query(query, [monthandyear,regionid,regionid]).then(function (rows, fields) {
				var result = [];
				var duties = [];
				var duties1 = [];
				var rowsReturned = rows.length;
				for (var i = 0; i < rowsReturned; i++) {
					duties.push({
						'category': rows[i].categoryname,
						'memberscount': rows[i].memberscount,
						'totalduties': rows[i].totalduties,
						'eddays': rows[i].eddays
					});

					if ((i + 1 == rowsReturned) || (rows[i].projectid != rows[i + 1].projectid || rows[i].monthandyear != rows[i + 1].monthandyear || rows[i].billtype != rows[i + 1].billtype)) {
						var jobss = new jobModel.getSalarySlipList(rows[i].payslipno, rows[i].projectno, rows[i].projectname, rows[i].salaryslipid, rows[i].salaryslipdate, rows[i].categoryname, rows[i].projectid, rows[i].clientid, duties, rows[i].status, rows[i].monthandyear, rows[i].ssprintcount, rows[i].pfprintcount, rows[i].billtype);
						duties = [];
						result.push(jobss);
					}
					//console.log('result', result);
				}
				resolve(result);
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.getpayslipprintArrear = function (monthandyear,regionid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			con.query('SELECT payslipno FROM salaryslip ss WHERE ss.monthandyear = ? AND ss.bill_type = 1 GROUP BY ss.payslipno;', [monthandyear]).then(function (rowss, fields) {
				var rowsReturned1 = rowss.length;
				var result = [];
				var duties1 = [];
				var payslipnos = [];
				for (var j = 0; j < rowsReturned1; j++) {
					payslipnos.push(rowss[j].payslipno);
				}
				if(payslipnos.length) {
					var query1 = multiline.stripIndent(function () {
						/*
						SELECT ss.payslipno,pr.projectno,pr.name AS projectname,ss.salaryslipid,
							DATE_FORMAT(ss.createdttm,'%d-%m-%Y') AS salaryslipdate,jm.code AS categoryname,ss.projectid,ss.clientid,ss.status,ss.monthandyear,COUNT(ss.salaryslipid) AS memberscount,SUM(ss.presentdays) AS totalduties,SUM(ss.eddays) AS eddays,ss_print_count AS ssprintcount,pf_print_count AS pfprintcount,ss.bill_type as billtype
							FROM salaryslip ss
							INNER JOIN jobmaster jm ON jm.jobmasterid = ss.jobmasterid
							INNER JOIN project pr ON pr.projectid = ss.projectid AND ss.clientid = pr.clientid
							WHERE ss.payslipno IN (?) AND ss.status > 1  AND ss.bill_type = 1  AND case ? when 0 then 1 = 1 else pr.regionid = ? END GROUP BY ss.payslipno
						*/
					});
					con.query(query1, [payslipnos,regionid,regionid]).then(function (rows1, fields) {
						var rowsReturned2 = rows1.length;
						for (var k = 0; k < rowsReturned2; k++) {
							duties1.push({
								'category': rows1[k].categoryname,
								'memberscount': rows1[k].memberscount,
								'totalduties': rows1[k].totalduties,
								'eddays': rows1[k].eddays
							});
							if ((k + 1 == rowsReturned2) || (rows1[k].projectid != rows1[k + 1].projectid || rows1[k].monthandyear != rows1[k + 1].monthandyear || rows1[k].billtype != rows1[k + 1].billtype)) {
								var jobs = new jobModel.getSalarySlipList(rows1[k].payslipno, rows1[k].projectno, rows1[k].projectname, rows1[k].salaryslipid, rows1[k].salaryslipdate, rows1[k].categoryname, rows1[k].projectid, rows1[k].clientid, duties1, rows1[k].status, rows1[k].monthandyear, rows1[k].ssprintcount, rows1[k].pfprintcount, rows1[k].billtype);
								duties1 = [];
								result.push(jobs);
							}
						}
						resolve(result);
					}).catch(function (err) {
						reject(err);
					});
				} else {
					resolve(result);
				}
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.getArrearPayslipprint = function (projectid,monthandyear,regionid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			con.query('SELECT payslipno FROM salaryslip ss WHERE ss.monthandyear = ? AND ss.projectid = ? AND ss.bill_type = 1 GROUP BY ss.payslipno;', [monthandyear,projectid]).then(function (rowss, fields) {
				var rowsReturned1 = rowss.length;
				var result = [];
				var duties1 = [];
				var payslipnos = [];
				for (var j = 0; j < rowsReturned1; j++) {
					payslipnos.push(rowss[j].payslipno);
				}
				if(payslipnos.length) {
					var query1 = multiline.stripIndent(function () {
						/*
							SELECT ss.payslipno,pr.projectno,pr.name AS projectname,ss.salaryslipid,
							DATE_FORMAT(ss.createdttm,'%d-%m-%Y') AS salaryslipdate,jm.code AS categoryname,ss.projectid,ss.clientid,ss.status,ss.monthandyear,COUNT(ss.salaryslipid) AS memberscount,SUM(ss.presentdays) AS totalduties,SUM(ss.eddays) AS eddays,ss_print_count AS ssprintcount,pf_print_count AS pfprintcount,ss.bill_type as billtype
							FROM salaryslip ss
							INNER JOIN jobmaster jm ON jm.jobmasterid = ss.jobmasterid
							INNER JOIN project pr ON pr.projectid = ss.projectid AND ss.clientid = pr.clientid
							WHERE ss.payslipno IN (?) AND ss.status > 1  AND ss.bill_type = 1  AND case ? when 0 then 1 = 1 else pr.regionid = ? END GROUP BY ss.payslipno
						*/
					});
					con.query(query1, [payslipnos,regionid,regionid]).then(function (rows1, fields) {
						var rowsReturned2 = rows1.length;
						for (var k = 0; k < rowsReturned2; k++) {
							duties1.push({
								'category': rows1[k].categoryname,
								'memberscount': rows1[k].memberscount,
								'totalduties': rows1[k].totalduties,
								'eddays': rows1[k].eddays
							});
							if ((k + 1 == rowsReturned2) || (rows1[k].projectid != rows1[k + 1].projectid || rows1[k].monthandyear != rows1[k + 1].monthandyear || rows1[k].billtype != rows1[k + 1].billtype)) {
								var jobs = new jobModel.getSalarySlipList(rows1[k].payslipno, rows1[k].projectno, rows1[k].projectname, rows1[k].salaryslipid, rows1[k].salaryslipdate, rows1[k].categoryname, rows1[k].projectid, rows1[k].clientid, duties1, rows1[k].status, rows1[k].monthandyear, rows1[k].ssprintcount, rows1[k].pfprintcount, rows1[k].billtype);
								duties1 = [];
								result.push(jobs);
							}
						}
						resolve(result);
					}).catch(function (err) {
						reject(err);
					});
				} else {
					resolve(result);
				}
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}



module.exports.UpdatePrintCount = function (salaryslipno, type) {
	return new app.promise(function (resolve, reject) {
		var query = multiline.stripIndent(function () {
			/*
				SELECT ss_print_count,pf_print_count FROM salaryslip WHERE payslipno = ? GROUP BY payslipno;
			*/
		});
		mySqlConnection.connection().then(function (con) {
			con.query(query, [salaryslipno]).then(function (rows, fields) {
				if (type == 1) {
					var sscounts = rows[0].ss_print_count;
					sscounts = sscounts + 1;
					console.log('counts', sscounts);
					var query1 = multiline.stripIndent(function () {
						/*
							UPDATE salaryslip SET ss_print_count = ? WHERE payslipno = ?;
						*/
					});
					con.query(query1, [sscounts, salaryslipno]).then(function (rows1, fields) {
						resolve(rows1);
					}).catch(function (err) {
						reject(err);
					});
				} else {
					var sscounts = rows[0].pf_print_count;
					sscounts = sscounts + 1;
					console.log('counts', sscounts);
					var query1 = multiline.stripIndent(function () {
						/*
							UPDATE salaryslip SET pf_print_count = ? WHERE payslipno = ?;
						*/
					});
					con.query(query1, [sscounts, salaryslipno]).then(function (rows1, fields) {
						resolve(rows1);
					}).catch(function (err) {
						reject(err);
					});
				}
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.UpdatePrintCounts = function (invoiceid, type) {
	return new app.promise(function (resolve, reject) {
		var query = multiline.stripIndent(function () {
			/*
				SELECT printcount FROM invoice WHERE invoiceid = ?;
			*/
		});
		mySqlConnection.connection().then(function (con) {
			con.query(query, [invoiceid]).then(function (rows, fields) {
				var sscounts = rows[0].printcount;
				sscounts = sscounts + 1;
				console.log('counts', sscounts);
				var query1 = multiline.stripIndent(function () {
					/*
						UPDATE invoice SET printcount = ? WHERE invoiceid = ?;
					*/
				});
				con.query(query1, [sscounts, invoiceid]).then(function (rows1, fields) {
					resolve(rows1);
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
}

module.exports.getinvoiceprint = function (monthandyear,regionid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
				   	SELECT inv.invoiceno,jm.code AS categoryname,pr.projectno,pr.name AS projectname,inv.projectid,inv.clientid,DATE_FORMAT(inv.createdttm,'%d-%m-%Y') AS invoicedate,inv.printcount,inv.totalamount,inv.invoiceid,inv.monthandyear,indd.noofduties,indd.noofperson,inv.invoicestatus,inv.type,inv.invoicetype
					FROM invoice inv
					INNER JOIN invoicedetail indd ON indd.invoiceid = inv.invoiceid
					INNER JOIN jobmaster jm ON jm.jobmasterid = indd.jobmasterid
					INNER JOIN project pr ON pr.projectid = indd.projectid AND inv.clientid = pr.clientid
					WHERE inv.monthandyear = ? AND case ? when 0 then 1 = 1 else pr.regionid = ? END AND inv.invoicestatus > 0 and inv.invoicestatus !=7   AND inv.active = 1
				*/
			});
			con.query(query, [monthandyear,regionid,regionid]).then(function (rows, fields) {
				var result = [];
				var duties = [];
				var rowsReturned = rows.length;
				var projectno = '';
				var projectname = '';
				for (var i = 0; i < rowsReturned; i++) {
					duties.push({
						'category': rows[i].categoryname,
						'memberscount': rows[i].noofperson,
						'totalduties': rows[i].noofduties,
					});
					if(rows[i].invoicetype == 1) {
						if(projectno == '')  {
							projectno += rows[i].projectno;
							projectname += rows[i].projectname;
						} else	{
							projectno += ', '+rows[i].projectno;
							projectname += ', '+rows[i].projectname;
						}
					} else {
						projectno = rows[i].projectno;
						projectname = rows[i].projectname;
					}
					console.log('projectno',projectno);
					if ((i + 1 == rowsReturned) || (rows[i].projectid != rows[i + 1].projectid || rows[i].monthandyear != rows[i + 1].monthandyear || rows[i].type != rows[i + 1].type)) {
						var jobss = new jobModel.getInvoiceList(rows[i].invoiceno, rows[i].categoryname, projectno, projectname, rows[i].projectid, rows[i].clientid, rows[i].invoicedate, rows[i].printcount, rows[i].totalamount, rows[i].invoiceid, rows[i].monthandyear, rows[i].noofduties, rows[i].noofperson, duties, rows[i].invoicestatus, rows[i].type,rows[i].invoicetype);
						duties = [];
						projectno = '';
						projectname = '';
						result.push(jobss);
					}
					//console.log('result', result);
				}
				resolve(result);
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.getinvoiceprintSalary = function (monthandyear,regionid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
				   	SELECT inv.invoiceno,jm.code AS categoryname,pr.projectno,pr.name AS projectname,inv.projectid,inv.clientid,DATE_FORMAT(inv.createdttm,'%d-%m-%Y') AS invoicedate,inv.printcount,inv.totalamount,inv.invoiceid,inv.monthandyear,indd.noofduties,indd.noofperson,inv.invoicestatus,inv.type
					FROM invoice inv
					INNER JOIN invoicedetail indd ON indd.invoiceid = inv.invoiceid
					INNER JOIN jobmaster jm ON jm.jobmasterid = indd.jobmasterid
					INNER JOIN project pr ON pr.projectid = inv.projectid AND inv.clientid = pr.clientid
					WHERE inv.monthandyear = ? AND case ? when 0 then 1 = 1 else pr.regionid = ? END AND inv.invoicestatus > 0 and inv.invoicestatus !=7  AND inv.active = 1 AND inv.type = 0;
				*/
			});
			con.query(query, [monthandyear,regionid,regionid]).then(function (rows, fields) {
				var result = [];
				var duties = [];
				var rowsReturned = rows.length;
				for (var i = 0; i < rowsReturned; i++) {
					duties.push({
						'category': rows[i].categoryname,
						'memberscount': rows[i].noofperson,
						'totalduties': rows[i].noofduties
					});
					if ((i + 1 == rowsReturned) || (rows[i].projectid != rows[i + 1].projectid || rows[i].monthandyear != rows[i + 1].monthandyear || rows[i].type != rows[i + 1].type)) {
						var jobss = new jobModel.getInvoiceList(rows[i].invoiceno, rows[i].categoryname, rows[i].projectno, rows[i].projectname, rows[i].projectid, rows[i].clientid, rows[i].invoicedate, rows[i].printcount, rows[i].totalamount, rows[i].invoiceid, rows[i].monthandyear, rows[i].noofduties, rows[i].noofperson, duties, rows[i].invoicestatus, rows[i].type);
						duties = [];
						result.push(jobss);
					}
					//console.log('result', result);
				}
				resolve(result);
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.getinvoiceprintArrear = function (monthandyear,regionid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
				   	SELECT inv.invoiceno,jm.code AS categoryname,pr.projectno,pr.name AS projectname,inv.projectid,inv.clientid,DATE_FORMAT(inv.createdttm,'%d-%m-%Y') AS invoicedate,inv.printcount,inv.totalamount,inv.invoiceid,inv.monthandyear,indd.noofduties,indd.noofperson,inv.invoicestatus,inv.type
					FROM invoice inv
					INNER JOIN invoicedetail indd ON indd.invoiceid = inv.invoiceid
					INNER JOIN jobmaster jm ON jm.jobmasterid = indd.jobmasterid
					INNER JOIN project pr ON pr.projectid = inv.projectid AND inv.clientid = pr.clientid
					WHERE inv.monthandyear = ? AND case ? when 0 then 1 = 1 else pr.regionid = ? END AND inv.invoicestatus > 0 AND inv.active = 1 AND inv.type = 1;
				*/
			});
			con.query(query, [monthandyear,regionid,regionid]).then(function (rows, fields) {
				var result = [];
				var duties = [];
				var rowsReturned = rows.length;
				for (var i = 0; i < rowsReturned; i++) {
					duties.push({
						'category': rows[i].categoryname,
						'memberscount': rows[i].noofperson,
						'totalduties': rows[i].noofduties
					});
					if ((i + 1 == rowsReturned) || (rows[i].projectid != rows[i + 1].projectid || rows[i].monthandyear != rows[i + 1].monthandyear || rows[i].type != rows[i + 1].type)) {
						var jobss = new jobModel.getInvoiceList(rows[i].invoiceno, rows[i].categoryname, rows[i].projectno, rows[i].projectname, rows[i].projectid, rows[i].clientid, rows[i].invoicedate, rows[i].printcount, rows[i].totalamount, rows[i].invoiceid, rows[i].monthandyear, rows[i].noofduties, rows[i].noofperson, duties, rows[i].invoicestatus, rows[i].type);
						duties = [];
						result.push(jobss);
					}
					//console.log('result', result);
				}
				resolve(result);
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.updateSalarySlipStatus = function (salaryslipno) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query1 = multiline.stripIndent(function () {
				/*
					UPDATE salaryslip SET arrearstatus = 1 WHERE payslipno IN (?);
				*/
			});
			con.query(query1, [salaryslipno]).then(function (rows1, fields) {
				resolve(rows1);
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.updateClaimStatus = function (invoiceid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query1 = multiline.stripIndent(function () {
				/*
					UPDATE invoice SET arrearstatus = 1 WHERE invoiceid = ?;
				*/
			});
			con.query(query1, [invoiceid]).then(function (rows1, fields) {
				resolve(rows1);
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.updateSalaryStatus = function (payslipno, status) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query1 = multiline.stripIndent(function () {
				/*
					UPDATE salaryslip SET status = ? WHERE payslipno = ? AND status IN (1,2);
				*/
			});
			con.query(query1, [status,payslipno]).then(function (rows1, fields) {
				resolve(rows1);
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.createCombinedClaims = function (projectids) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
				   SELECT ss.payslipno,pr.projectno,pr.name AS projectname,ss.salaryslipid,
					DATE_FORMAT(ss.createdttm,'%d-%m-%Y') AS salaryslipdate,jm.code AS categoryname,ss.projectid,ss.clientid,ss.status,ss.monthandyear,COUNT(ss.salaryslipid) AS memberscount,SUM(ss.presentdays) AS totalduties,SUM(ss.eddays) AS eddays,ss_print_count AS ssprintcount,pf_print_count AS pfprintcount
					FROM salaryslip ss
					INNER JOIN jobmaster jm ON jm.jobmasterid = ss.jobmasterid
					INNER JOIN project pr ON pr.projectid = ss.projectid AND ss.clientid = pr.clientid
					WHERE ss.monthandyear = ? AND ss.status > 0 AND ss.active = 1   GROUP BY ss.jobmasterid
				*/
			});
			// sconsole.log('monthandyear', query, monthandyear);
			con.query(query, [monthandyear]).then(function (rows, fields) {
				var result = [];
				var duties = [];
				var rowsReturned = rows.length;
				for (var i = 0; i < rowsReturned; i++) {
					duties.push({
						'category': rows[i].categoryname,
						'memberscount': rows[i].memberscount,
						'totalduties': rows[i].totalduties,
						'eddays': rows[i].eddays
					});

					if ((i + 1 == rowsReturned) || (rows[i].projectid != rows[i + 1].projectid || rows[i].monthandyear != rows[i + 1].monthandyear)) {
						var jobss = new jobModel.getSalarySlipList(rows[i].payslipno, rows[i].projectno, rows[i].projectname, rows[i].salaryslipid, rows[i].salaryslipdate, rows[i].categoryname, rows[i].projectid, rows[i].clientid, duties, rows[i].status, rows[i].monthandyear, rows[i].ssprintcount, rows[i].pfprintcount);
						duties = [];
						result.push(jobss);
					}
					//console.log('result', result);
				}
				resolve(result);
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.getCombinedClaimsProjects = function (fromdate, todate, regionid) {
	var todates = moment(todate, "YYYY-MM-DD").add(1, 'days'); 
	var todatess = moment(todates).format('YYYY-MM-DD');
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
				    SELECT pr.projectno,pr.name AS projectname,jm.code AS categoryname,att.projectid,att.clientid,att.monthandyear,COUNT(att.attendanceid) AS memberscount,SUM(att.presentdays) AS totalduties,SUM(att.eddays) AS eddays,att.status
					FROM attendance att
					INNER JOIN jobmaster jm ON jm.jobmasterid = att.jobmasterid
					INNER JOIN project pr ON pr.projectid = att.projectid AND att.clientid = pr.clientid
					WHERE case ? when 0 then 1 = 1 else  pr.regionid = ? end AND
					att.attendancereviewed BETWEEN (?) AND (?) AND att.status = 2 AND att.active = 1 
					GROUP BY pr.projectid,att.monthandyear,att.jobmasterid
				*/
			});
			con.query(query, [regionid, regionid, fromdate, todatess]).then(function (rows, fields) {
				var result = [];
				var duties = [];
				var rowsReturned = rows.length;
				for (var i = 0; i < rowsReturned; i++) {
					duties.push({
						'category': rows[i].categoryname,
						'memberscount': rows[i].memberscount,
						'totalduties': rows[i].totalduties
					});
					if ((i + 1 == rowsReturned) || (rows[i].projectid != rows[i + 1].projectid || rows[i].monthandyear != rows[i + 1].monthandyear)) {
						var jobss = new jobModel.getCombinedClaimsProjectsList(rows[i].categoryname, rows[i].projectno, rows[i].projectname, rows[i].projectid, rows[i].clientid, rows[i].monthandyear, duties, rows[i].status);
						duties = [];
						result.push(jobss);
					}
					//console.log('result', result);
				}
				resolve(result);
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.generateinvoiceDetails = function (projectid, monthandyear) {
	// console.log('projectid, monthandyear----', projectid, monthandyear);
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
					SELECT 
						att.clientid,att.projectid,pr.name AS projectname,pr.projectno,pr.ismainproject,att.jobpostingdetailid,
						att.memberid,mem.firstname,att.monthandyear, 
						(SUM(att.presentdays) * COUNT(DISTINCT att.attendanceid)/COUNT(*)) +
						(SUM(att.eddays) * COUNT(DISTINCT att.attendanceid)/COUNT(*)) AS presentduties,
						(SUM(att.eddays) * COUNT(DISTINCT att.attendanceid)/COUNT(*)) AS eddays,
						COUNT(DISTINCT att.attendanceid) AS noofperson,
						(SUM(att.othours) / 8 * COUNT(DISTINCT att.attendanceid)/COUNT(*)) AS otduties,
						jm.jobmasterid,jm.code,jm.name,ag.servicecharge,ag.tax,	
						IFNULL(wg.particularamount, 0) AS salary,
						lv.code,
						ag.wagetypeid,ag.edseperate,ag.taxtype,ag.allowancetype1,
							ag.allowancevalue1,
							ag.allowancetype2,
							ag.allowancevalue2,
							ag.allowancetype3,
							ag.allowancevalue3
					FROM attendance att 
					INNER JOIN member mem ON mem.memberid = att.memberid
					INNER JOIN project pr ON pr.projectid = att.projectid
					INNER JOIN jobmaster jm ON jm.jobmasterid = att.jobmasterid AND jm.active = 1
					INNER JOIN agreement ag ON ag.clientid = pr.clientid AND ag.active = 1
					INNER JOIN agreementinfo ai ON ai.agreementid = ag.agreementid and pr.projectid=ai.projectid
					INNER JOIN wages wg ON wg.wagetypeid = ag.wagetypeid AND jm.jobmasterid = wg.jobmasterid AND wg.wageyearid = ag.wageyearid AND wg.wageareaid = ag.wageareaid AND wg.wagecategoryid = ag.wagecategoryid AND wg.active = 1  AND wg.particularamount > 0
					INNER JOIN lookupvalue lv ON lv.lkvalid = wg.particularid AND lv.active = 1 AND lv.code = 'RATEHD'
					WHERE lv.code != 'NULL' AND att.status = 2 AND att.monthandyear = ? AND att.projectid = ? AND att.active =1 
					GROUP BY jm.code,att.projectid, att.clientid,att.monthandyear 
					ORDER BY att.clientid, att.projectid, jm.jobmasterid
				*/
			});
			con.query(query, [monthandyear, projectid]).then(function (rows, fields) {
				var rowsReturned = rows.length;
				var result = [];
				var totalduties = [];
				var amount = {};
				var salaryamount = {};
				var servicetax = {};
				var servicecharges = {};
				var allwance = {}
				var total = {};
				var duties = {};
				var gross = 0;
				if (rowsReturned > 0) {
					for (var i = 0; i < rowsReturned; i++) {
						var a = rows[i].monthandyear.split(' ');
						var monthname = a[0]; 
						var year = a[1];
						var month = new Date(Date.parse("1 " + monthname)).getMonth() + 1;
						var days = new Date(year, month, 0).getDate();
						duties = parseFloat(rows[i].presentduties) + parseFloat(rows[i].otduties);
						salaryamount = ((parseFloat(rows[i].salary) / days) * duties).toFixed(2);
						salaryedamount = ((parseFloat(rows[i].salary) / days) * rows[i].eddays).toFixed(2);

						if(rows[i].wagetypeid == 349)
						{
							salaryamount=	Math.round(salaryamount);
							salaryedamount=	Math.round(salaryedamount);
						}

						var job = new jobModel.invoice(rows[i].jobmasterid, rows[i].jobmastercode, rows[i].name, rows[i].salary, duties, salaryamount, rows[i].noofperson, days,rows[i].clientid, rows[i].projectid,rows[i].monthandyear,rows[i].eddays,salaryedamount);
						totalduties.push(job);
						// gross  salary added for Each job
						gross = (parseFloat(job.salaryamount) + parseFloat(gross)).toFixed(2);

						if ((i + 1 == rowsReturned) || (rows[i].projectid != rows[i + 1].projectid)) {
							// total salary, after adding service charges and tax
							servicecharges = ((gross / 100) * parseFloat(rows[i].servicecharge)).toFixed(2);
							
							// servicetax = (((parseFloat(gross) + parseFloat(servicecharges)) / 100) * parseFloat(rows[i].tax)).toFixed(2);

							

							allwance = (parseFloat(rows[i].allowancevalue1) + parseFloat(rows[i].allowancevalue2) + parseFloat(rows[i].allowancevalue3)).toFixed(2);

							console.log('all',allwance);

							sstax =(((parseFloat(gross) + parseFloat(servicecharges)+parseFloat(allwance)) / 100) * parseFloat(rows[i].tax)/2).toFixed(2);

							console.log('sstax',sstax);

							// sstax1=sstax.toString().slice(0, (sstax.toString().indexOf(".")) + (2 + 1));
							servicetax=parseFloat(sstax)+parseFloat(sstax);
						//	console.log('sertax',servicetax);

							total = (parseFloat(gross) + parseFloat(servicetax) + parseFloat(servicecharges)+parseFloat(allwance));
							result.push(new jobModel.duties(rows[i].clientid, rows[i].projectid, rows[i].projectno,rows[i].projectname,rows[i].ismainproject,  rows[i].monthandyear, totalduties, "", gross, rows[i].servicecharge, rows[i].tax, servicecharges, servicetax, total,rows[i].edseperate,rows[i].taxtype,rows[i].allowancetype1,rows[i].allowancevalue1,rows[i].allowancetype2,rows[i].allowancevalue2,rows[i].allowancetype3,rows[i].allowancevalue3))
							totalduties = [];
						}
					}
					//console.log('res',result);
					resolve(result);
				} else {
					reject("Attendance not exist");
				}
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.invoiceCombinediff = function (invoice) {
	console.log('invoice', invoice);
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			con.query('INSERT INTO invoice_diff SET ?', [invoice]).then(function (rows, fields) {
				console.log('rowsrowsrowsrows', rows);
				resolve({
					"invoiceid": rows.insertId
				})
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}
module.exports.invoiceCombine = function (invoice) {
	//console.log('invoice', invoice);
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			con.query('INSERT INTO invoice SET ?', [invoice]).then(function (rows, fields) {
				console.log('rowsrowsrowsrows', rows.insertId);
				resolve({
					"invoiceid": rows.insertId
				})
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}
module.exports.invoiceCombinedetails = function (invoice, invoiceid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			//./console.log('invoice.length',invoice);
			//return;
			if (invoice.length > 0) {
				var queries = '';
				invoice.forEach(function (items) {
					console.log('invoice.length',items);
					items.forEach(function (subitem){
					var item = subitem;
					
					queries += con.format("INSERT INTO invoicedetail(invoiceid, jobmasterid, salary, noofduties, noofperson, days, salaryamount,projectid,clientid,eddays,salaryedamount) VALUES (?,?,?,?,?,?,?,?,?,?,?);", [invoiceid, item.jobmasterid, item.salary, item.noofduties, item.noofperson, item.days, item.salaryamount, item.projectid, item.clientid,item.eddays,item.salaryedamount]);
				});
			});
				con.query(queries).then(function (rows, fields) {
					resolve({
						"invoicedetailid": invoiceid
					});
				}).catch(function (err) {
					reject(err);
				});
			}
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.getArrearPayslipSalary = function (projectid, monthandyear, salaryslipid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			/* var query1 = multiline.stripIndent(function () {
				/*
					SELECT mem.texcono,mem.serviceno,mem.firstname,mem.uanno,mem.accountno,ss.*,cl.organization AS clientname,pr.projectno AS projectno,pr.name AS projectname,pr.addressline1, pr.addressline2, pr.addressline3,pr.designation,pr.pincode,wt.description AS wagetype,wy.description AS wageyear,jm.code AS jobcode,jm.name AS jobname FROM salaryslip ss INNER JOIN member mem ON ss.memberid = mem.memberid INNER JOIN jobmaster jm ON jm.jobmasterid = ss.jobmasterid INNER JOIN project pr ON pr.projectid = ss.projectid INNER JOIN client cl ON cl.clientid = ss.clientid INNER JOIN lookupvalue wt ON wt.lkvalid = ss.wagetypeid AND wt.active = 1 INNER JOIN lookupvalue wy ON wy.lkvalid = ss.wageyearid AND wy.active = 1 WHERE ss.projectid = ? AND ss.salaryslipid IN (?) AND ss.bill_type = 0 ORDER BY ss.memberid,ss.monthandyear;
           		
			}); */
			var query = "SELECT mem.texcono,mem.serviceno,mem.firstname,mem.uanno,mem.accountno,ss.*,cl.organization AS clientname,pr.projectno AS projectno,pr.name AS projectname,pr.addressline1, pr.addressline2, pr.addressline3,pr.designation,pr.pincode,wt.description AS wagetype,wy.description AS wageyear,jm.code AS jobcode,jm.name AS jobname FROM salaryslip ss INNER JOIN member mem ON ss.memberid = mem.memberid INNER JOIN jobmaster jm ON jm.jobmasterid = ss.jobmasterid INNER JOIN project pr ON pr.projectid = ss.projectid INNER JOIN client cl ON cl.clientid = ss.clientid INNER JOIN lookupvalue wt ON wt.lkvalid = ss.wagetypeid AND wt.active = 1 INNER JOIN lookupvalue wy ON wy.lkvalid = ss.wageyearid AND wy.active = 1 WHERE ss.projectid = "+projectid+" AND ss.salaryslipid IN ("+salaryslipid+") AND ss.bill_type = 0 ORDER BY ss.memberid,ss.monthandyear";
			con.query(query).then(function (rows, fields) {
				var result = [];
				//console.log('rows',rows);
				var rowsReturned = rows.length;
				if (rowsReturned > 0) {
					for (var i = 0; i < rowsReturned; i++) {
						var salryslip = new jobModel.getsalarydetail(rows[i].salaryslipid, rows[i].memberid, rows[i].accountno, rows[i].firstname, rows[i].serviceno, rows[i].texcono, rows[i].jobcode, rows[i].jobname, rows[i].projectid, rows[i].clientid, rows[i].clientname, rows[i].projectno, rows[i].projectname, rows[i].designation, rows[i].addressline1, rows[i].addressline2, rows[i].addressline3, rows[i].pincode, rows[i].wagetype, rows[i].wageyear, rows[i].monthandyear, rows[i].presentdays, rows[i].othours, rows[i].basic, rows[i].da, rows[i].hra, rows[i].cca, rows[i].ma, rows[i].epf, rows[i].edli, rows[i].admchr, rows[i].bonus, rows[i].gratuity, rows[i].unifdt, rows[i].leapay, rows[i].conveyance, rows[i].washallow, rows[i].lic, rows[i].other1, rows[i].other2, rows[i].ratehd, rows[i].ncbasic, rows[i].eddays, rows[i].edamount, rows[i].uanno, rows[i].panno, rows[i].payslipno, rows[i].grossamount, rows[i].netpay, rows[i].ss_print_count, rows[i].pf_print_count,0,0,rows[i].fk_salary_slip_id);
						result.push(salryslip);
					}
				}
				resolve(result);
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.getArrearPayslipArrear = function (projectid, monthandyear, payslipno, salaryslipid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			// var query = multiline.stripIndent(function () {
			// 	/*
			// 		SELECT mem.texcono,mem.serviceno,mem.firstname,mem.uanno,mem.accountno,ss.*,cl.organization AS clientname,pr.projectno AS projectno,pr.name AS projectname,pr.addressline1, pr.addressline2, pr.addressline3,pr.designation,pr.pincode,wt.description AS wagetype,wy.description AS wageyear,jm.code AS jobcode,jm.name AS jobname
			// 		FROM salaryslip ss
			// 		INNER JOIN member mem ON ss.memberid = mem.memberid
			// 		INNER JOIN jobmaster jm ON jm.jobmasterid = ss.jobmasterid
			// 		INNER JOIN project pr ON pr.projectid = ss.projectid
			// 		INNER JOIN client cl ON cl.clientid = ss.clientid
			// 		INNER JOIN lookupvalue wt ON wt.lkvalid = ss.wagetypeid AND wt.active = 1
			// 		INNER JOIN lookupvalue wy ON wy.lkvalid = ss.wageyearid AND wy.active = 1
			// 		WHERE ss.projectid = ? AND ss.salaryslipid In (?) AND ss.bill_type = 1 ORDER BY jm.sortorder;
           	// 	*/
			// });
			var query ="SELECT mem.texcono,mem.serviceno,mem.firstname,mem.uanno,mem.accountno,ss.*,cl.organization AS clientname,pr.projectno AS projectno,pr.name AS projectname,pr.addressline1, pr.addressline2, pr.addressline3,pr.designation,pr.pincode,wt.description AS wagetype,wy.description AS wageyear,jm.code AS jobcode,jm.name AS jobname FROM salaryslip ss INNER JOIN member mem ON ss.memberid = mem.memberid INNER JOIN jobmaster jm ON jm.jobmasterid = ss.jobmasterid INNER JOIN project pr ON pr.projectid = ss.projectid INNER JOIN client cl ON cl.clientid = ss.clientid INNER JOIN lookupvalue wt ON wt.lkvalid = ss.wagetypeid AND wt.active = 1 INNER JOIN lookupvalue wy ON wy.lkvalid = ss.wageyearid AND wy.active = 1 WHERE ss.projectid = "+projectid+" AND ss.salaryslipid IN ("+salaryslipid+") AND ss.bill_type = 1 ORDER BY ss.memberid,ss.monthandyear";
			con.query(query).then(function (rows, fields) {
				var result = [];
				var rowsReturned = rows.length;
				if (rowsReturned > 0) {
					for (var i = 0; i < rowsReturned; i++) {
						var salryslip = new jobModel.getsalarydetail(rows[i].salaryslipid, rows[i].memberid, rows[i].accountno, rows[i].firstname, rows[i].serviceno, rows[i].texcono, rows[i].jobcode, rows[i].jobname, rows[i].projectid, rows[i].clientid, rows[i].clientname, rows[i].projectno, rows[i].projectname, rows[i].designation, rows[i].addressline1, rows[i].addressline2, rows[i].addressline3, rows[i].pincode, rows[i].wagetype, rows[i].wageyear, rows[i].monthandyear, rows[i].presentdays, rows[i].othours, rows[i].basic, rows[i].da, rows[i].hra, rows[i].cca, rows[i].ma, rows[i].epf, rows[i].edli, rows[i].admchr, rows[i].bonus, rows[i].gratuity, rows[i].unifdt, rows[i].leapay, rows[i].conveyance, rows[i].washallow, rows[i].lic, rows[i].other1, rows[i].other2, rows[i].ratehd, rows[i].ncbasic, rows[i].eddays, rows[i].edamount, rows[i].uanno, rows[i].panno, rows[i].payslipno, rows[i].grossamount, rows[i].netpay, rows[i].ss_print_count, rows[i].pf_print_count,0,0,rows[i].fk_salary_slip_id);
						result.push(salryslip);
					}
				}
				resolve(result);
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.getArrearPayslipDifference = function (projectid, monthandyear, payslipno, salaryslipid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			// var query = multiline.stripIndent(function () {
			// 	/*
			// 		SELECT mem.texcono,mem.serviceno,mem.firstname,mem.uanno,mem.accountno,ssd.*,cl.organization AS clientname,pr.projectno AS projectno,pr.name AS projectname,pr.addressline1, pr.addressline2, pr.addressline3,pr.designation,pr.pincode,wt.description AS wagetype,wy.description AS wageyear,jm.code AS jobcode,jm.name AS jobname,ss.salaryslipid AS ssid FROM salaryslip_difference ssd
			// 		INNER JOIN salaryslip ss ON ssd.salaryslipid = ss.salaryslipid
			// 		INNER JOIN member mem ON ss.memberid = mem.memberid
			// 		INNER JOIN jobmaster jm ON jm.jobmasterid = ss.jobmasterid
			// 		INNER JOIN project pr ON pr.projectid = ss.projectid
			// 		INNER JOIN client cl ON cl.clientid = ss.clientid
			// 		INNER JOIN lookupvalue wt ON wt.lkvalid = ss.wagetypeid AND wt.active = 1
			// 		INNER JOIN lookupvalue wy ON wy.lkvalid = ss.wageyearid AND wy.active = 1
			// 		WHERE ss.projectid = ? AND ss.payslipno = ? AND ss.bill_type = 1  ORDER BY ss.memberid,ss.monthandyear;
           	// 	*/
			// });

			var query = "SELECT mem.texcono,mem.serviceno,mem.firstname,mem.uanno,mem.accountno,ssd.*,cl.organization AS clientname,pr.projectno AS projectno,pr.name AS projectname,pr.addressline1, pr.addressline2, pr.addressline3,pr.designation,pr.pincode,wt.description AS wagetype,wy.description AS wageyear,jm.code AS jobcode,jm.name AS jobname,ss.fk_salary_slip_id AS ssid FROM salaryslip_difference ssd INNER JOIN salaryslip ss ON ssd.salaryslipid = ss.salaryslipid INNER JOIN member mem ON ss.memberid = mem.memberid INNER JOIN jobmaster jm ON jm.jobmasterid = ss.jobmasterid INNER JOIN project pr ON pr.projectid = ss.projectid INNER JOIN client cl ON cl.clientid = ss.clientid INNER JOIN lookupvalue wt ON wt.lkvalid = ss.wagetypeid AND wt.active = 1 INNER JOIN lookupvalue wy ON wy.lkvalid = ss.wageyearid AND wy.active = 1 WHERE ss.projectid = "+projectid+" AND ssd.salaryslipid IN ("+salaryslipid+") AND ss.bill_type = 1  ORDER BY ssd.memberid,ssd.monthandyear";
			//  console.log('query',query);
			con.query(query).then(function (rows, fields) {
				var result = [];
				var rowsReturned = rows.length;
				if (rowsReturned > 0) {
					for (var i = 0; i < rowsReturned; i++) {
						var salryslip = new jobModel.getsalarydetail(rows[i].salaryslipid, rows[i].memberid, rows[i].accountno, rows[i].firstname, rows[i].serviceno, rows[i].texcono, rows[i].jobcode, rows[i].jobname, rows[i].projectid, rows[i].clientid, rows[i].clientname, rows[i].projectno, rows[i].projectname, rows[i].designation, rows[i].addressline1, rows[i].addressline2, rows[i].addressline3, rows[i].pincode, rows[i].wagetype, rows[i].wageyear, rows[i].monthandyear, rows[i].presentdays, rows[i].othours, rows[i].basic, rows[i].da, rows[i].hra, rows[i].cca, rows[i].ma, rows[i].epf, rows[i].edli, rows[i].admchr, rows[i].bonus, rows[i].gratuity, rows[i].unifdt, rows[i].leapay, rows[i].conveyance, rows[i].washallow, rows[i].lic, rows[i].other1, rows[i].other2, rows[i].ratehd, rows[i].ncbasic, rows[i].eddays, rows[i].edamount, rows[i].uanno, rows[i].panno, rows[i].payslipno, rows[i].grossamount, rows[i].netpay, rows[i].ss_print_count, rows[i].pf_print_count, 0 , 0, rows[i].ssid);
						result.push(salryslip);
					}
				}
				resolve(result);
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.getArrearPayslipSalaryAdmin = function (projectid,salaryslipid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = "SELECT mem.texcono,mem.serviceno,mem.firstname,mem.uanno,mem.accountno,ss.*,cl.organization AS clientname,pr.projectno AS projectno,pr.name AS projectname,pr.addressline1, pr.addressline2, pr.addressline3,pr.designation,pr.pincode,wt.description AS wagetype,wy.description AS wageyear,jm.code AS jobcode,jm.name AS jobname FROM salaryslip ss INNER JOIN member mem ON ss.memberid = mem.memberid INNER JOIN jobmaster jm ON jm.jobmasterid = ss.jobmasterid INNER JOIN project pr ON pr.projectid = ss.projectid INNER JOIN client cl ON cl.clientid = ss.clientid INNER JOIN lookupvalue wt ON wt.lkvalid = ss.wagetypeid AND wt.active = 1 INNER JOIN lookupvalue wy ON wy.lkvalid = ss.wageyearid AND wy.active = 1 WHERE ss.projectid = "+projectid+" AND ss.salaryslipid IN ("+salaryslipid+") AND ss.bill_type = 0 ORDER BY ss.memberid,ss.monthandyear";
			console.log('query',query);
			con.query(query).then(function (rows, fields) {
				var result = [];
				console.log('rows',JSON.stringify(rows));
				var rowsReturned = rows.length;
				if (rowsReturned > 0) {
					for (var i = 0; i < rowsReturned; i++) {
						var salryslip = new jobModel.getsalarydetail(rows[i].salaryslipid, rows[i].memberid, rows[i].accountno, rows[i].firstname, rows[i].serviceno, rows[i].texcono, rows[i].jobcode, rows[i].jobname, rows[i].projectid, rows[i].clientid, rows[i].clientname, rows[i].projectno, rows[i].projectname, rows[i].designation, rows[i].addressline1, rows[i].addressline2, rows[i].addressline3, rows[i].pincode, rows[i].wagetype, rows[i].wageyear, rows[i].monthandyear, rows[i].presentdays, rows[i].othours, rows[i].basic, rows[i].da, rows[i].hra, rows[i].cca, rows[i].ma, rows[i].epf, rows[i].edli, rows[i].admchr, rows[i].bonus, rows[i].gratuity, rows[i].unifdt, rows[i].leapay, rows[i].conveyance, rows[i].washallow, rows[i].lic, rows[i].other1, rows[i].other2, rows[i].ratehd, rows[i].ncbasic, rows[i].eddays, rows[i].edamount, rows[i].uanno, rows[i].panno, rows[i].payslipno, rows[i].grossamount, rows[i].netpay, rows[i].ss_print_count, rows[i].pf_print_count,0,0,rows[i].fk_salary_slip_id);
						result.push(salryslip);
					}
				}
				resolve(result);
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
} 

module.exports.getArrearPayslipArrearAdmin = function (projectid, payslipno, salaryslipid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query ="SELECT mem.texcono,mem.serviceno,mem.firstname,mem.uanno,mem.accountno,ss.*,cl.organization AS clientname,pr.projectno AS projectno,pr.name AS projectname,pr.addressline1, pr.addressline2, pr.addressline3,pr.designation,pr.pincode,wt.description AS wagetype,wy.description AS wageyear,jm.code AS jobcode,jm.name AS jobname FROM salaryslip ss INNER JOIN member mem ON ss.memberid = mem.memberid INNER JOIN jobmaster jm ON jm.jobmasterid = ss.jobmasterid INNER JOIN project pr ON pr.projectid = ss.projectid INNER JOIN client cl ON cl.clientid = ss.clientid INNER JOIN lookupvalue wt ON wt.lkvalid = ss.wagetypeid AND wt.active = 1 INNER JOIN lookupvalue wy ON wy.lkvalid = ss.wageyearid AND wy.active = 1 WHERE ss.projectid = "+projectid+" AND ss.salaryslipid IN ("+salaryslipid+") AND ss.bill_type = 1 ORDER BY ss.memberid,ss.monthandyear";
			con.query(query).then(function (rows, fields) {
				var result = [];
				var rowsReturned = rows.length;
				if (rowsReturned > 0) {
					for (var i = 0; i < rowsReturned; i++) {
						var salryslip = new jobModel.getsalarydetail(rows[i].salaryslipid, rows[i].memberid, rows[i].accountno, rows[i].firstname, rows[i].serviceno, rows[i].texcono, rows[i].jobcode, rows[i].jobname, rows[i].projectid, rows[i].clientid, rows[i].clientname, rows[i].projectno, rows[i].projectname, rows[i].designation, rows[i].addressline1, rows[i].addressline2, rows[i].addressline3, rows[i].pincode, rows[i].wagetype, rows[i].wageyear, rows[i].monthandyear, rows[i].presentdays, rows[i].othours, rows[i].basic, rows[i].da, rows[i].hra, rows[i].cca, rows[i].ma, rows[i].epf, rows[i].edli, rows[i].admchr, rows[i].bonus, rows[i].gratuity, rows[i].unifdt, rows[i].leapay, rows[i].conveyance, rows[i].washallow, rows[i].lic, rows[i].other1, rows[i].other2, rows[i].ratehd, rows[i].ncbasic, rows[i].eddays, rows[i].edamount, rows[i].uanno, rows[i].panno, rows[i].payslipno, rows[i].grossamount, rows[i].netpay, rows[i].ss_print_count, rows[i].pf_print_count,0,0,rows[i].fk_salary_slip_id);
						result.push(salryslip);
					}
				}
				resolve(result);
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.getArrearPayslipDifferenceAdmin = function (projectid, monthandyear, payslipno, salaryslipid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			
			var query = "SELECT mem.texcono,mem.serviceno,mem.firstname,mem.uanno,mem.accountno,ssd.*,cl.organization AS clientname,pr.projectno AS projectno,pr.name AS projectname,pr.addressline1, pr.addressline2, pr.addressline3,pr.designation,pr.pincode,wt.description AS wagetype,wy.description AS wageyear,jm.code AS jobcode,jm.name AS jobname,ss.fk_salary_slip_id AS ssid FROM salaryslip_difference ssd INNER JOIN salaryslip ss ON ssd.salaryslipid = ss.salaryslipid INNER JOIN member mem ON ss.memberid = mem.memberid INNER JOIN jobmaster jm ON jm.jobmasterid = ss.jobmasterid INNER JOIN project pr ON pr.projectid = ss.projectid INNER JOIN client cl ON cl.clientid = ss.clientid INNER JOIN lookupvalue wt ON wt.lkvalid = ss.wagetypeid AND wt.active = 1 INNER JOIN lookupvalue wy ON wy.lkvalid = ss.wageyearid AND wy.active = 1 WHERE ss.projectid = "+projectid+" AND ssd.salaryslipid IN ("+salaryslipid+") AND ss.bill_type = 1  ORDER BY ssd.memberid,ssd.monthandyear";
			//  console.log('query',query);
			con.query(query).then(function (rows, fields) {
				var result = [];
				var rowsReturned = rows.length;
				if (rowsReturned > 0) {
					for (var i = 0; i < rowsReturned; i++) {
						var salryslip = new jobModel.getsalarydetail(rows[i].salaryslipid, rows[i].memberid, rows[i].accountno, rows[i].firstname, rows[i].serviceno, rows[i].texcono, rows[i].jobcode, rows[i].jobname, rows[i].projectid, rows[i].clientid, rows[i].clientname, rows[i].projectno, rows[i].projectname, rows[i].designation, rows[i].addressline1, rows[i].addressline2, rows[i].addressline3, rows[i].pincode, rows[i].wagetype, rows[i].wageyear, rows[i].monthandyear, rows[i].presentdays, rows[i].othours, rows[i].basic, rows[i].da, rows[i].hra, rows[i].cca, rows[i].ma, rows[i].epf, rows[i].edli, rows[i].admchr, rows[i].bonus, rows[i].gratuity, rows[i].unifdt, rows[i].leapay, rows[i].conveyance, rows[i].washallow, rows[i].lic, rows[i].other1, rows[i].other2, rows[i].ratehd, rows[i].ncbasic, rows[i].eddays, rows[i].edamount, rows[i].uanno, rows[i].panno, rows[i].payslipno, rows[i].grossamount, rows[i].netpay, rows[i].ss_print_count, rows[i].pf_print_count, 0 , 0, rows[i].ssid);
						result.push(salryslip);
					}
				}
				resolve(result);
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.getPayslipDetails = function (projectid, monthandyear, payslipno) { 
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = "SELECT ss.salaryslipid,ss.payslipno,ss.fk_salary_slip_id FROM salaryslip ss WHERE ss.projectid = "+projectid+" AND ss.payslipno IN ("+payslipno+") AND ss.bill_type = 1";
			con.query(query).then(function (rows, fields) {
				var salaryslipid = [];
				var fksalaryslipid = [];
				var rowsReturned = rows.length;
				if (rowsReturned > 0) {
					for (var i = 0; i < rowsReturned; i++) {
						salaryslipid.push(rows[i].salaryslipid);
						fksalaryslipid.push(rows[i].fk_salary_slip_id);
					}
				}
				resolve({
					"salaryslipid" : salaryslipid,
					"fksalaryslipid" : fksalaryslipid,
					"payslipno":payslipno
				});
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.getOldClaimDetails = function (invoiceno) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
					SELECT inv.invoiceid,inv.invoiceno,inv.fkinvoiceid FROM invoice inv WHERE inv.invoiceno = ?
           		*/
			});
			con.query(query, [invoiceno]).then(function (rows, fields) {
				resolve(rows);
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.getOldClaimBillDetails = function (invoiceno) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
					SELECT ind.monthandyear,ind.jobmasterid,jm.code AS jobcode,jm.name AS jobname,ind.noofduties,ind.noofperson,
					ind.salary AS revisedsalary,ind.salaryamount AS revisedrate,inv.invoiceno AS newinvoiceno,
					invv.invoiceno AS oldinvoiceno,indd.salary AS oldsalary,indd.salaryamount AS oldrate,inv.servicecharge,inv.tax,
					cl.clientid,cl.organization,cl.contactname,cl.addressline1,cl.addressline2,cl.addressline3,
					cl.pincode,pr.projectno,pr.name AS projectname,DATE_FORMAT(inv.createdttm,'%d-%m-%Y') AS invoicedate
					FROM invoice inv 
					INNER JOIN invoicedetail ind ON ind.invoiceid = inv.invoiceid
					INNER JOIN invoice invv ON invv.invoiceid = ind.fk_invoice_id
					INNER JOIN invoicedetail indd ON indd.invoiceid = invv.invoiceid AND indd.jobmasterid=ind.jobmasterid
					INNER JOIN project pr ON pr.projectid = inv.projectid
					INNER JOIN client cl ON cl.clientid = inv.clientid
					INNER JOIN jobmaster jm ON jm.jobmasterid = ind.jobmasterid
					WHERE inv.invoiceno = ?
           		*/
			});
			con.query(query, [invoiceno]).then(function (rows, fields) {
				var result = [];
				var rowsReturned = rows.length;
				if (rowsReturned > 0) {
					for (var i = 0; i < rowsReturned; i++) {
						var dt = new Date(rows[i].monthandyear);
						var StartDate = moment(dt).startOf('month').format('YYYY-MM-DD');
						var EndDate = moment(dt).endOf('month').format('YYYY-MM-DD');
						var diffamount = rows[i].revisedrate - rows[i].oldrate;
						var salryslip = new jobModel.getinvoicelistdetail(rows[i].monthandyear,rows[i].jobmasterid,rows[i].jobcode,rows[i].jobname,rows[i].noofduties,rows[i].noofperson,rows[i].revisedsalary,rows[i].revisedrate,rows[i].newinvoiceno,rows[i].oldinvoiceno,rows[i].oldsalary,rows[i].oldrate,rows[i].servicecharge,rows[i].tax,rows[i].clientid,rows[i].organization,rows[i].contactname,rows[i].addressline1,rows[i].addressline2,rows[i].addressline3,rows[i].pincode,rows[i].projectno,rows[i].projectname,StartDate, EndDate,rows[i].invoicedate,diffamount);
						result.push(salryslip);
					}
				}
				resolve(result);
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
} 

module.exports.getProjectDetailsByID = function (fromdate, todate, regionid, type) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
					SELECT att.projectid,prr.projectno,prr.clientid,att.monthandyear,invv.invoiceno 
					FROM attendance att 
					INNER JOIN project prr ON prr.projectid = att.projectid AND prr.clientid = att.clientid
					INNER JOIN invoice invv ON invv.projectid = att.projectid AND invv.clientid = att.clientid
					WHERE case ? when 0 then 1 = 1 else prr.regionid = ? END AND att.`status` > 1 AND invv.type = ?
					AND att.attendancereviewed BETWEEN (?) AND (?)  
					GROUP BY prr.projectid
           		*/
			});
			con.query(query, [regionid, regionid, type, fromdate, todate]).then(function (rows, fields) {
				resolve(rows);
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.getProjectDetailsBySSID = function (fromdate, todate, regionid, type) {

	console.log('test',fromdate)
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
					SELECT ss.projectid,prr.projectno,ss.clientid,ss.monthandyear,ss.payslipno,
					GROUP_CONCAT(DISTINCT NULLIF(ss.fk_salary_slip_id,'')) AS fksalaryslipid,
					GROUP_CONCAT(DISTINCT NULLIF(ss.salaryslipid,'')) AS salaryslipid
					FROM attendance att 
					INNER JOIN project prr ON prr.projectid = att.projectid 
					INNER JOIN salaryslip ss ON ss.projectid = att.projectid AND ss.monthandyear=att.monthandyear
					WHERE DATE(att.attendancereviewed) BETWEEN (?) AND (?) 
					AND case ? when 0 then 1 = 1 else prr.regionid = ? END AND ss.bill_type = ? AND ss.active = 1
					GROUP BY ss.payslipno order by ss.payslipno
           		*/
			});
			con.query(query, [fromdate, todate, regionid, regionid, type]).then(function (rows, fields) {
				console.log(fromdate, todate, regionid, regionid, type);
				resolve(rows);
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.getProjectDetailsByINVID = function (fromdate, todate, regionid, type) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
					SELECT att.projectid,prr.projectno,prr.clientid,inv.monthandyear,inv.invoiceno FROM attendance att 
					INNER JOIN project prr ON prr.projectid = att.projectid 
					INNER JOIN invoice inv ON inv.projectid = att.projectid AND inv.monthandyear=att.monthandyear
					WHERE att.attendancereviewed BETWEEN (?) AND (?)
					AND case ? when 0 then 1 = 1 else prr.regionid = ? END AND inv.`type` = ?
					GROUP BY inv.invoiceno order by inv.invoiceno 
           		*/
			});
			con.query(query, [fromdate, todate, regionid, regionid, type]).then(function (rows, fields) {
				resolve(rows);
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}


module.exports.getSalarySlipDetailsByID = function (date, todate, regionid, type) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
					SELECT m.uanno,m.firstname,m.lastname,ss.grossamount,ss.epf,ss.edli,ss.presentdays
					FROM salaryslip  ss
					INNER JOIN attendance att ON att.memberid = ss.memberid AND att.clientid = ss.clientid AND att.projectid = ss.projectid
					INNER JOIN project pr ON pr.projectid = ss.projectid AND pr.clientid = att.clientid
					INNER JOIN member m ON m.memberid = ss.memberid
					WHERE  case ? when 0 then 1 = 1 else  pr.regionid = ? end AND 
					ss.`status` > 1 AND ss.bill_type = 1 AND ss.createdttm BETWEEN (?) AND (?)
				*/
			});
			con.query(query, [regionid, regionid, date, todate]).then(function (rows, fields) {
				var result = [];
				var rowsReturned = rows.length;
				if (rowsReturned > 0) {
					for (var i = 0; i < rowsReturned; i++) {
						var member = new jobModel.exportEPFDetails(rows[i].uanno, rows[i].firstname, rows[i].lastname, rows[i].grossamount, rows[i].epf, rows[i].edli, rows[i].presentdays);
						result.push(member);
					} 
				}
				resolve(result);
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.getProjectDetails = function () {
	return new app.promise(function (resolve, reject) {
		var query = multiline.stripIndent(function () {
			/*
				SELECT pr.projectno,pr.name,pr.projectid FROM project pr WHERE pr.active = 1;
			*/
		});
		mySqlConnection.connection().then(function (con) {
			con.query(query).then(function (rows, fields) {
				resolve(rows);
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}

module.exports.getjobAppliedStatus = async function (jobactivityid) { 
	try {	
		const con = await mySqlConnection.connection();
		const query = "SELECT prr.projectno,jobstatus.description AS jobstatus,ja.currentvacancies,mem.mobile FROM jobactivity ja INNER JOIN project prr ON prr.projectid = ja.projectid INNER JOIN member mem ON mem.memberid = ja.memberid INNER JOIN lookupvalue jobstatus ON jobstatus.code = ja.jobstatuscode AND jobstatus.lkdmncode = 'JOBST' AND jobstatus.active = 1 WHERE ja.jobactivityid = ?"; 
		// const rows = await pool.query(query);  
		const rows = await con.query(query, [jobactivityid]);
		return rows;
	} catch(err) {
		throw new Error(err)
	}
	// return new app.promise(function (resolve, reject) {
	// 	mySqlConnection.connection().then(function (con) {
	// 		var query = multiline.stripIndent(function () {
	// 			/*
	// 				SELECT prr.projectno,jobstatus.description AS jobstatus,ja.currentvacancies,mem.mobile
	// 				FROM jobactivity ja
	// 				INNER JOIN project prr ON prr.projectid = ja.projectid
	// 				INNER JOIN member mem ON mem.memberid = ja.memberid
	// 				INNER JOIN lookupvalue jobstatus ON jobstatus.code = ja.jobstatuscode AND jobstatus.lkdmncode = 'JOBST' 
	// 				AND jobstatus.active = 1
	// 				WHERE ja.jobactivityid = ?;
	// 			*/
	// 		});
	// 		con.query(query, [jobactivityid]).then(function (rows, fields) {
	// 			resolve(rows);
	// 		}).catch(function (err) {
	// 			reject(err);
	// 		});
	// 	}).catch(function (err) {
	// 		reject(err);
	// 	});
	// });
}

module.exports.getattendancereview = function (clientid, projectid, monthandyear, types) {
	//console.log('types',types);
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
					SELECT
						att.clientid,
						att.projectid,
						att.memberid,
						att.jobpostingdetailid,
						att.jobmasterid,
						att.monthandyear,
						att.attendanceid,
						att.presentdays,
						att.eddays,
						att.othours,
						att.status,
						att.edhold,     
						att.athold,             
						jm.code,
						jm.name,
						m.firstname,
						m.lastname,
						m.texcono,
						m.serviceno,
						m.accountno,
						att.reason
					FROM attendance att
					INNER JOIN jobmaster jm ON
						jm.jobmasterid = att.jobmasterid AND jm.active = 1
					INNER JOIN member m ON
						m.memberid = att.memberid AND m.active = 1	
					WHERE att.active = 1 AND att.projectid = ? AND att.monthandyear = ?
            	*/
			});
			if(types == 8) {
				query += 'AND att.status = 8 AND att.edstatus = 1 ORDER BY att.status, att.attendanceid, att.memberid';
			} 
			if(types == 1) {
				query += 'AND att.status = 1 ORDER BY att.status, att.attendanceid, att.memberid';
			} 
			if(types == 2) {
				query += 'AND att.status IN (2,3,4,6,7,8) ORDER BY att.status, att.attendanceid, att.memberid';
			} 
			if(types == 3) {
				query += 'AND att.status = 0 ORDER BY att.status, att.attendanceid, att.memberid';
			}
			// console.log('projectid, monthandyear, status',projectid, monthandyear, status);
			con.query(query, [projectid, monthandyear]).then(function (rows, fields) {
				var rowsReturned = rows.length;
				var result = [];
				var results = [];
				var wagerate = 0;
				var hold = 0;
				var totalduties = 0;
				var attype = 0;
				var isedhold = 0;
				if (rowsReturned > 0) {
					var attype = 1;
					for (var i = 0; i < rowsReturned; i++) {
						if (rows[i].status == 2 || rows[i].athold == 1) {
							hold = 1;
						}  
						if (rows[i].edhold == 1) {
							isedhold = 1;
						}  
						var attendance = new jobModel.attendancereview(rows[i].attendanceid, rows[i].memberid, rows[i].firstname, rows[i].texcono, rows[i].jobpostingdetailid, rows[i].presentdays, rows[i].eddays, rows[i].othours, rows[i].status, rows[i].edhold, rows[i].clientid, rows[i].projectid, rows[i].monthandyear, rows[i].code, rows[i].category, rows[i].serviceno, hold, rows[i].jobmasterid, rows[i].accountno,rows[i].athold, rows[i].reason,isedhold);
						result.push(attendance)
						hold = 0;
						isedhold = 0;
					}
					resolve(result);
				} else {
					resolve(result);	
				}
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
} 


module.exports.checkMemberDetails = function (texcono, serviceno) {
	return new app.promise(function (resolve, reject) {
		var query = multiline.stripIndent(function () {
			/*
				SELECT mem.memberid,mem.texcono FROM member mem WHERE mem.active = 1 AND mem.serviceno = ?;
			*/
		});
		mySqlConnection.connection().then(function (con) {
			con.query(query,[serviceno]).then(function (rows, fields) {
				resolve(rows);
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
} 

module.exports.checkMemberDetail = function (texcono, serviceno, projectno) {
	return new app.promise(function (resolve, reject) {
		var query = multiline.stripIndent(function () {
			/*
				SELECT mem.memberid,mem.texcono FROM member mem WHERE mem.active = 1 AND mem.serviceno = ?; SELECT pr.projectid,pr.projectno FROM project pr WHERE pr.active = 1 AND pr.projectno = ?;
			*/
		});
		mySqlConnection.connection().then(function (con) {
			con.query(query,[serviceno,projectno]).then(function (rows, fields) {
				resolve(rows);
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}   

module.exports.getProjectArrearDetailsByID = function (projectid,clientid) {
	return new app.promise(function (resolve, reject) {
		var query = multiline.stripIndent(function () {
			/*
				SELECT COUNT(*) AS totalmembers,ss.monthandyear
				FROM salaryslip ss  
				WHERE ss.projectid = ? AND ss.clientid = ? AND ss.bill_type = 1 GROUP BY ss.monthandyear;
			*/
		});
		mySqlConnection.connection().then(function (con) {
			con.query(query,[projectid,clientid]).then(function (rows, fields) {   
				var memberslist = [];
				for(var j = 0; j < rows.length;j++) { 
					memberslist.push({'memberscount':rows[j].totalmembers,'monthandyear':rows[j].monthandyear});
				}
				resolve(memberslist);
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
} 

module.exports.getjobmasterVACStatus = function () {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			logger.debug(" Date - "+ new Date() + "  - jobDAL.js getjobmasterVACStatus before call");
			con.query('SELECT jobmasterid, code, name,vacancystatus, carryforwardstatus, active FROM jobmaster WHERE vacancystatus = 1;').then(function (rows, fields) {
				var rowsReturned = rows.length; 
				var result = [];
				if (rowsReturned > 0) {  
					for (var i = 0; i < rowsReturned; i++) {
						var jobmaster = new jobModel.getjobmaster(rows[i].jobmasterid, rows[i].code, rows[i].name, 0, 0, 0, 0, "", rows[i].active, rows[i].vacancystatus, rows[i].carryforwardstatus);
						result.push(jobmaster);
					}
				}
				resolve(result);
			}).catch(function (err) {
                logger.debug(" Date - "+ new Date() + "  - jobDAL.js getjobmasterVACStatus error status" +err);
				reject(err);
			});
		}).catch(function (err) {
			logger.debug(" Date - "+ new Date() + "  - jobDAL.js getjobmasterVACStatus MYSQL error status" +err);
			reject(err);
		}); 
	});
}

module.exports.getjobmasterCFStatus = function () {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			con.query('SELECT jobmasterid, code, name,vacancystatus, carryforwardstatus, active FROM jobmaster WHERE carryforwardstatus = 1;').then(function (rows, fields) {
				var rowsReturned = rows.length; 
				var result = [];
				if (rowsReturned > 0) {  
					for (var i = 0; i < rowsReturned; i++) {
						var jobmaster = new jobModel.getjobmaster(rows[i].jobmasterid, rows[i].code, rows[i].name, 0, 0, 0, 0, "", rows[i].active, rows[i].vacancystatus, rows[i].carryforwardstatus);
						result.push(jobmaster);
					}
					resolve(result);
				}
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		}); 
	});
}


module.exports.cancelPostingOrder = function (memberhistoryid, memberid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
					DELETE FROM memberhistory WHERE memberhistoryid = ?;
				*/
			});
			con.query(query, [memberhistoryid]).then(function (rows, fields) {
				resolve("success");
			});
		}).catch(function (err) {
			reject(err);
		});
	}).catch(function (err) {
		reject(err);
	});
}