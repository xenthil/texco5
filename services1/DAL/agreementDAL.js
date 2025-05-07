var app = require('./../app');
var multiline = require('multiline');
var agreementModel = require('./../Model/agreement');
var jobDal = require('./../DAL/jobDAL');
var jobModel = require('./../Model/job');
var mySqlConnection = require('./MySqlHelper');
var moment = require('moment');
var errorDAL = require('./../DAL/errorDAL');


module.exports.getagreement = function (agreementid, regionid) {
	return new app.promise(function (resolve, reject) {
		var jobmaster = [];
		// get all the jobs
		jobDal.getjobmaster(0).then(function (jm) {
			jobmaster = jm;
			mySqlConnection.connection().then(function (con) {
				var query = multiline.stripIndent(function () {
					/*
						SELECT
							ae.agreementid,
							ae.clientid,
							ai.projectid,
							ai.agreementinfoid,
							DATE_FORMAT( ae.fromdate,'%d %b %Y') AS fromdate,
							DATE_FORMAT( ae.todate,'%d %b %Y') AS todate,
							ae.servicecharge,
							ae.tax,
							ae.optionaltype,
							aed.numberofvacancies,
							aed.salary,
							aed.addendum as 'addendum',
							aed.agreementdetailid,
							c.organization,
							c.email,
							p.projectno,
							p.name AS projectname,
							jm.jobmasterid,
							jm.code,
							jm.name AS jobmastername,
							ae.wagetypeid,
							lv.description AS 'wagetype',
							ae.agreementtypeid,
							lv1.description AS 'agreementtype',
							ae.agreementstatusid,
							lv2.description AS 'agreementstatus',
							ae.agtypeid,
							lv3.description AS 'agtype',
							ae.wageareaid,
							lv4.description AS 'wagearea',
							ae.wageyearid,
							ae.taxtype,
							ae.wagecategoryid,
							lv5.description AS 'wageyear',
							ae.amstatus,
							ae.addendumstatus,
							aed.amstatus AS adamstatus,
							ae.edseperate,
							ae.allowancetype1,
							ae.allowancevalue1,
							ae.allowancetype2,
							ae.allowancevalue2,
							ae.allowancetype3,
							ae.allowancevalue3


						FROM
							`agreement` ae
						INNER JOIN agreementinfo ai ON
								ae.agreementid = ai.agreementid
						AND ai.active = 1		
						LEFT JOIN agreementdetail aed ON
								aed.agreementinfoid = ai.agreementinfoid
						AND aed.active = 1			
						INNER JOIN client c ON
								c.clientid = ae.clientid
						AND c.active = 1
						INNER JOIN project p ON
								p.projectid = ai.projectid
						AND p.active = 1
						LEFT JOIN jobmaster jm ON
								jm.jobmasterid = aed.jobmasterid
						AND jm.active = 1
						LEFT JOIN lookupvalue lv ON
								lv.lkvalid = ae.wagetypeid
						AND lv.active = 1
						LEFT JOIN lookupvalue lv1 ON
								lv1.lkvalid = ae.agreementtypeid
						AND lv1.active = 1
						LEFT JOIN lookupvalue lv2 ON
								lv2.lkvalid = ae.agreementstatusid
						AND lv2.active = 1
						LEFT JOIN lookupvalue lv3 ON
								lv3.lkvalid = ae.agtypeid
						AND lv3.active = 1
						LEFT JOIN lookupvalue lv4 ON
								lv4.lkvalid =   ae.wageareaid
						AND lv4.active = 1
						LEFT JOIN lookupvalue lv5 ON
								lv5.lkvalid =   ae.wageyearid
						AND lv5.active = 1
						WHERE ae.active = 1
						AND case ? when 0 then 1 = 1 else  ae.agreementid = ? end
						AND case ? when 0 then 1 = 1 else p.regionid = ? end
						ORDER BY p.projectno ASC;
             		*/
				});
				con.query(query, [agreementid, agreementid, regionid, regionid]).then(function (rows, fields) {
					var rowsReturned = rows.length;
					var result = [];
					var projects = [];
					var addendums = [];
					var addendum = [];
					var jobs = [];
					if (rowsReturned > 0) {
						for (var index = 0; index < rowsReturned; index++) {

							var agreement = new agreementModel.getagreement(rows[index].agreementid, rows[index].clientid, rows[index].organization, rows[index].email, rows[index].fromdate, rows[index].todate, rows[index].servicecharge, rows[index].wagetypeid, rows[index].wagetype, rows[index].wageyearid, rows[index].wageyear, rows[index].wageareaid, rows[index].wagearea, rows[index].agreementstatusid, rows[index].agreementstatus, rows[index].optionaltype, rows[index].agreementtypeid, rows[index].agreementtype, rows[index].agtypeid, rows[index].agtype, rows[index].tax, rows[index].amstatus,projects, rows[index].taxtype, rows[index].wagecategoryid,'',rows[index].addendumstatus,rows[index].adamstatus,rows[index].edseperate,rows[index].allowancetype1,rows[index].allowancevalue1,rows[index].allowancetype2,rows[index].allowancevalue2,rows[index].allowancetype3,rows[index].allowancevalue3);

							// console.log('agreement', agreement);
							var projectdetail = new agreementModel.project(rows[index].projectid, rows[index].projectno, rows[index].projectname, rows[index].agreementinfoid);
							if (rows[index].addendum == 0) { // job
								jobs.push(new agreementModel.jobs(rows[index].agreementid, rows[index].jobmasterid, rows[index].code, rows[index].name, rows[index].numberofvacancies, rows[index].salary, rows[index].agreementdetailid,0));
							} else { //addendum
								addendum.push(new agreementModel.jobs(rows[index].agreementid, rows[index].jobmasterid, rows[index].code, rows[index].name, rows[index].numberofvacancies, rows[index].salary, rows[index].agreementdetailid,rows[index].addendum));
								if ((index + 1 == rowsReturned) || (rows[index].agreementid != rows[index + 1].agreementid) || (rows[index].addendum != rows[index + 1].addendum)) {
									addendums.push(addendum);
									addendum = [];
								}
							} 
							if ((index + 1 == rowsReturned) || (rows[index].agreementinfoid != rows[index + 1].agreementinfoid)) {
								projectdetail.jobs = jobs;
								projectdetail.addendums = addendums;
								projects.push(projectdetail);
								jobs = [];
								addendums = [];
							}
							if ((index + 1 == rowsReturned) || (rows[index].agreementid != rows[index + 1].agreementid || rows[index].projectid != rows[index + 1].projectid)) {
								agreement.projects = projects;
								result.push(agreement);
								projects = [];
							}
						}
					}
					// console.log('result0092303',JSON.stringify(result));
					resolve(result);
				}).catch(function (err) { 
					errorDAL.errorlog('Error',"agreementDAL::getagreement",err.stack,JSON.stringify(query),"agreementDAL");
					reject(err);
				});
			}).catch(function (err) {
				errorDAL.errorlog('Error',"agreementDAL::getagreement",err.stack,JSON.stringify('MySQL Connection Error'),"agreementDAL");
				reject(err);
			});
		});
	});
}
module.exports.agreementprint = function (agreementid, regionid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
					SELECT pr.projectid,cl.clientid,cl.organization,cl.contactname,cl.addressline1,cl.addressline2,cl.addressline3,lv.description AS region,lv2.description AS district, lv3.description AS taluk,ad.jobmasterid,ad.numberofvacancies,ws.particularamount AS amounts,jms.name AS jobname,jms.code as jobmastercode, DATE_FORMAT(ag.fromdate,'%d-%m-%Y') AS fromdate,DATE_FORMAT(ag.todate,'%d-%m-%Y') AS todate,lv1.description AS wageyear,lv5.description AS wagetype,ag.servicecharge,ag.tax
					FROM agreement ag 
					INNER JOIN agreementinfo ai ON ai.agreementid = ag.agreementid
					INNER JOIN agreementdetail ad ON ad.agreementinfoid = ai.agreementinfoid	
					INNER JOIN jobmaster jms ON jms.jobmasterid = ad.jobmasterid
					LEFT JOIN wages ws ON ws.wagetypeid = ag.wagetypeid AND ws.wageyearid = ag.wageyearid AND ws.wagecategoryid = ag.wagecategoryid AND ws.wageareaid = ag.wageareaid AND ws.active = 1
					AND ws.wagecategoryid = ag.wagecategoryid AND jms.jobmasterid = ws.jobmasterid
					INNER JOIN client cl ON cl.clientid = ag.clientid AND cl.active = 1
					INNER JOIN project pr ON pr.projectid = ai.projectid AND pr.active = 1
					LEFT JOIN lookupvalue lv1 ON lv1.lkvalid = ag.wageyearid AND lv1.active = 1
					LEFT JOIN lookupvalue lv5 ON lv5.lkvalid = ag.wagetypeid AND lv5.active = 1
					LEFT JOIN lookupvalue lv4 ON lv4.lkvalid = ws.particularid AND lv4.CODE = 'RATEHD'
					LEFT JOIN lookupvalue lv ON lv.lkvalid = pr.regionid AND lv.active = 1
					LEFT JOIN lookupvalue lv2 ON lv2.lkvalid = cl.districtid AND lv2.active = 1
					LEFT JOIN lookupvalue lv3 ON lv3.lkvalid = cl.talukid AND lv3.active = 1
					WHERE ag.agreementid = ? GROUP BY ad.jobmasterid
				 */
			});
			//console.log('query', query)
			con.query(query, [agreementid]).then(function (rows, fields) {
				console.log('rows', rows);
				var rowsReturned = rows.length;
				var area = [];
				var result = [];
				if (rowsReturned > 0) {
					for (var index = 0; index < rowsReturned; index++) {
						var agreements = new agreementModel.getagreementvacancy(rows[index].jobmasterid, rows[index].numberofvacancies, rows[index].amounts, rows[index].jobname, rows[index].jobmastercode);
						area.push(agreements);
						if (index + 1 == rowsReturned) {

							var dt = new Date(rows[index].wageyear);
							var effectivedate = moment(dt).startOf('month').format('DD-MM-YYYY');

							var agreement = new agreementModel.getagreementprint(rows[index].projectid, rows[index].clientid, rows[index].organization, rows[index].contactname, rows[index].addressline1, rows[index].addressline2, rows[index].addressline3, rows[index].region, rows[index].district, rows[index].taluk, area, rows[index].fromdate, rows[index].todate, rows[index].wageyear, rows[index].wagetype, rows[index].servicecharge, rows[index].tax, effectivedate);
							result.push(agreement);
						}
					}
				}
				//console.log('result', result);
				resolve(result);
			}).catch(function (err) {  
				errorDAL.errorlog('Error',"agreementDAL::agreementprint",err.stack,JSON.stringify(query),"agreementprint");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"agreementDAL::getagreement",err.stack,JSON.stringify(query),"MYSQL Erro");
			reject(err);
		});
	});
}

module.exports.createagreement = function (agreement) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			agreement.fromdate = new Date(agreement.fromdate);
			agreement.todate = new Date(agreement.todate);
			var query = {
				clientid: agreement.clientid,
				fromdate: agreement.fromdate,
				todate: agreement.todate,
				servicecharge: agreement.servicecharge,
				wagetypeid: agreement.wagetypeid,
				wageyearid: agreement.wageyearid,
				wageareaid: agreement.wageareaid,
				agreementtypeid: agreement.agreementtypeid,
				agreementstatusid: agreement.agreementstatusid,
				agtypeid: agreement.agtypeid,
				optionaltype: agreement.optionaltype,
				tax: agreement.tax,
				changedby: agreement.changedby,
				wagecategoryid: agreement.wagecategoryid,
				taxtype: agreement.taxtype
			};
			con.query('INSERT INTO agreement SET ?', query).then(function (rows, fields) {
				resolve({
					"agreementid": rows.insertId
				})
			}).catch(function (err) {
				errorDAL.errorlog('Error',"agreementDAL::createagreement",err.stack,JSON.stringify(query),"agreementDAL");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"agreementDAL::createagreement",err.stack,JSON.stringify('MYSQL Error'),"agreementDAL");
			reject(err);
		});
	});
}

module.exports.validateagreement = function (projectids) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			con.query('SELECT agreementid FROM agreementinfo WHERE projectid IN (?)   and active = ? ;', [projectids, 1]).then(function (rows, fields) {
				var rowsReturned = rows.length;
				if (rowsReturned > 0) {
					reject("Agreements already exists for this project.");
				} else {
					resolve("success");
				}
			}).catch(function (err) {
				errorDAL.errorlog('Error',"agreementDAL::validateagreement",err.stack,JSON.stringify(projectids),"agreementDAL");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"agreementDAL::validateagreement",err.stack,JSON.stringify('MYSQL Error'),"agreementDAL");
			reject(err);
		});
	});
}

module.exports.updateagreement = function (agreement) {

	console.log(agreement);
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			if (agreement.agreementid > 0) {
				var query = {
					fromdate: agreement.fromdate,
					todate: agreement.todate,
					wagetypeid: agreement.wagetypeid,
					wageyearid: agreement.wageyearid,
					wageareaid: agreement.wageareaid,
					agreementstatusid: agreement.agreementstatusid,
					agtypeid: agreement.agtypeid,
					optionaltype: agreement.optionaltype,
					servicecharge: agreement.servicecharge,
					tax: agreement.tax,
					amstatus: 0,
					wagecategoryid: agreement.wagecategoryid,
					agreementtypeid: agreement.agreementtypeid,
					taxtype: agreement.taxtype,
					edseperate:agreement.edseperate,
					allowancetype1 : agreement.allowancetype1,
                	allowancevalue1 : agreement.allowancevalue1,
                	allowancetype2 : agreement.allowancetype2,
                	allowancevalue2 : agreement.allowancevalue2,
					allowancetype3 : agreement.allowancetype3,
                	allowancevalue3 : agreement.allowancevalue3,
				};
				var queries = "";
				queries += con.format("UPDATE agreement SET ? WHERE agreementid= ?;UPDATE agreement_ams SET ? WHERE agreementid= ?",[query, agreement.agreementid,query, agreement.agreementid]);
				con.query(queries).then(function (rows, fields) {
					resolve({
						"agreementid": agreement.agreementid
					});
				}).catch(function (err) {
					errorDAL.errorlog('Error',"agreementDAL::updateagreement",err.stack,JSON.stringify(queries),"agreementDAL");
					reject(err);
				});
			} else {
				reject("Unable to update agreement")
			}
		}).catch(function (err) {
			errorDAL.errorlog('Error',"agreementDAL:updateagreement",err.stack,JSON.stringify('Mysql Error'),"agreementDAL");
			reject(err);
		});
	});
}

module.exports.createagreementdetail = function (agreementid, agreement, changedby) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			// console.log('projects', agreement.projects);
			var projects = agreement.projects;
			if (projects.length > 0) {
				projects.forEach(function (item) {
					var queries = '';
					// console.log('item.projectid', item[1]);
					con.query("INSERT INTO agreementinfo(agreementid, projectid) VALUES (?,?);", [agreementid, item.projectid]).then(function (rows, fields) {
						item.jobs.forEach(function (subitem) {
							if (subitem.numberofvacancies > 0) {
								queries += con.format("INSERT INTO agreementdetail(agreementinfoid, jobmasterid, numberofvacancies, salary) VALUES (?,?,?,?);", [rows.insertId, subitem.jobmasterid, subitem.numberofvacancies, subitem.salary])
							} else {
								queries += con.format("INSERT INTO agreementdetail(agreementinfoid, jobmasterid, numberofvacancies, salary) VALUES (?,?,?,?);", [rows.insertId, subitem.jobmasterid, 0, 0])
							}
						});
						con.query(queries).then(function (rows, fields) {
							resolve({
								"agreementid": agreementid
							});
						}).catch(function (err) {
							errorDAL.errorlog('Error',"agreementDAL::createagreementdetail",err.stack,JSON.stringify(queries),"agreementDAL");
							reject(err);
						});
					});
				});
			}
		}).catch(function (err) {
			errorDAL.errorlog('Error',"agreementDAL::createagreementdetail",err.stack,JSON.stringify('mysqlerror'),"agreementDAL");
			reject(err);
		});
	});
}

//module.exports.createagreementdetail = function (agreementid, projects, changedby) {
//    return new app.promise(function (resolve, reject) {
//        mySqlConnection.connection().then(function (con) {
//            if (projects.length > 0) {
//                for (var i = 0; i < projects.length; i++) {
//                    var query = {
//                        agreementid: agreementid,
//                        projectid: projects[i].projectid
//                    };
//                    con.query("INSERT INTO agreementinfo SET ?", query).then(function (rows, fields) {
//                        agreementinfoid = rows.insertId;
//                        var jobs = projects[0].jobs;
//                        for (var j = 0; j < jobs.length; j++) {
//                            if (jobs[j].numberofvacancies > 0) {
//                                var query1 = {
//                                    agreementinfoid: agreementinfoid,
//                                    jobmasterid: jobs[j].jobmasterid,
//                                    numberofvacancies: jobs[j].numberofvacancies,
//                                    salary: jobs[j].salary
//                                };
//                            }
//                            con.query("INSERT INTO agreementdetail  SET ?", query1).then(function (rows, fields) {
//                                if (i == projects.length && j == jobs.length) {
//                                    resolve({ "agreementid": agreementid });
//                                }
//                            })
//                        }
//                    });
//                }
//            }
//        }).catch(function (err) {
//            reject(err);
//        });
//    });
//}

module.exports.updateagreementdetail = function (agreementid, wages, agreementinfo) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var queries = '';
			agreementinfo.forEach(function (item) {
				wages.forEach(function (subitem) {
					queries += con.format('UPDATE agreementdetail SET salary = ? WHERE agreementinfoid= ? AND  jobmasterid= ? ;', [subitem.particularamount, item.agreementinfoid, subitem.jobmasterid]);
				});
				con.query(queries).then(function (rows, fields) {
					resolve({
						"agreementid": agreementid
					});
				}).catch(function (err) {
					errorDAL.errorlog('Error',"agreementDAL::updateagreementdetail",err.stack,JSON.stringify(queries),"agreementDAL");
					reject(err);
				});
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"agreementDAL::updateagreementdetail",err.stack,JSON.stringify('Mysql Error'),"agreementDAL");
			reject(err);
		});
	});
}

module.exports.updategreementstatus = function (agreementid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			con.query("UPDATE agreement SET active=? WHERE agreementid= ?", [0, agreementid]).then(function (rows, fields) {
				con.query("UPDATE agreementinfo SET active=? WHERE agreementid= ?", [0, agreementid]).then(function (rows, fields) {
					resolve({
						"agreementid": agreementid
					});
				}).catch(function (err) {
					errorDAL.errorlog('Error',"agreementDAL::updategreementstatus",err.stack,JSON.stringify(agreementid),"agreementDAL");
					reject(err);
				});
			}).catch(function (err) {
				errorDAL.errorlog('Error',"agreementDAL::updategreementstatus",err.stack,JSON.stringify(agreementid),"agreementDAL");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"agreementDAL::updategreementstatus",err.stack,JSON.stringify('Mysql Error'),"agreementDAL");
			reject(err);
		});
	});
}

module.exports.getagreementexpirylist = function () {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
                  SELECT
                            ae.agreementid,
                            ae.clientid,
                            ai.projectid,
                            ai.agreementinfoid,
                            DATE_FORMAT(ae.fromdate,'%b %d %Y')AS fromdate,
                            DATE_FORMAT(ae.todate,'%b %d %Y')AS todate,
                            ae.servicecharge,
                            c.organization AS client,
                            p.projectno,
                            p.name AS projectname,
                            p.regionid, 
                            lv6.description AS region,
                            ae.optionaltype,
                            ae.wagetypeid,
                            lv.description AS 'wagetype',
                            ae.agreementtypeid,
                 			lv1.description AS 'agreementtype',
                 	        ae.agreementstatusid,
                            lv2.description AS 'agreementstatus',
                            ae.agtypeid,
                            lv3.description AS 'agtype',
                            ae.wageareaid,
                            lv4.description AS 'wagearea',
                            ae.wageyearid,
                            lv5.description AS 'wageyear'
                            

                    FROM  agreement ae

                    INNER JOIN agreementinfo ai ON
                          ae.agreementid = ai.agreementid
                    AND ai.active = 1
                     
                    INNER JOIN client c ON
                          c.clientid = ae.clientid
                    AND c.active = 1

                    INNER JOIN project p ON
       	                  p.projectid = ai.projectid
                    AND p.active = 1
                    
                    INNER JOIN lookupvalue lv ON
                        lv.lkvalid = ae.wagetypeid
                    AND lv.active = 1

                    INNER JOIN lookupvalue lv1 ON
                        lv1.lkvalid = ae.agreementtypeid
                    AND lv1.active = 1

                    INNER JOIN lookupvalue lv2 ON
                        lv2.lkvalid = ae.agreementstatusid
                    AND lv2.active = 1

                    INNER JOIN lookupvalue lv3 ON
                        lv3.lkvalid = ae.agtypeid
                    AND lv3.active = 1

                    INNER JOIN lookupvalue lv4 ON
                        lv4.lkvalid =   ae.wageareaid
                    AND lv4.active = 1

                    INNER JOIN lookupvalue lv5 ON
                        lv5.lkvalid =   ae.wageyearid
                    AND lv5.active = 1
                     
                    INNER JOIN lookupvalue lv6 ON
                        lv6.lkvalid =   p.regionid
                    AND lv6.active = 1
                     
                    WHERE ae.todate < CURDATE() and ae.active = 1
                    ORDER BY p.regionid
                         */
			});

			con.query(query).then(function (rows, fields) {
				var rowsReturned = rows.length;
				var result = [];
				if (rowsReturned > 0) {
					for (var i = 0; i < rowsReturned; i++) {
						var agreement = new agreementModel.agreementexpirylist(rows[i].agreementid, rows[i].clientid, rows[i].client, rows[i].projectid, rows[i].projectno, rows[i].projectname, rows[i].fromdate, rows[i].todate, rows[i].servicecharge, rows[i].wagetypeid, rows[i].wagetype, rows[i].wageyearid, rows[i].wageyear,
							rows[i].wageareaid, rows[i].wagearea, rows[i].agreementstatusid, rows[i].agreementstatus, rows[i].optionaltype, rows[i].agreementtypeid, rows[i].agreementtype, rows[i].agtypeid, rows[i].agtype, rows[i].region);
						result.push(agreement);
					}
				}
				resolve(result);
			}).catch(function (err) {
				errorDAL.errorlog('Error',"agreementDAL::getagreementexpirylist",err.stack,JSON.stringify(query),"agreementDAL");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"agreementDAL::getagreementexpirylist",err.stack,JSON.stringify('MYSQL Error'),"agreementDAL");
			reject(err);
		});
	});
}


module.exports.getagreementbyprojectid = function (projectid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
                    SELECT
                           ai.projectid,
                           ai.agreementinfoid,
                           jm.jobmasterid,
                           jm.code AS jobmastercode,
                           jm.name AS jobmastername,
                           sum(aed.numberofvacancies) numberofvacancies


                   FROM
                        `agreement` ae
                     
                   INNER JOIN agreementinfo ai ON
                          ai.agreementid = ae.agreementid
                   AND ai.active = 1
                     
                   INNER JOIN agreementdetail aed ON
                          aed.agreementinfoid = ai.agreementinfoid
                   AND aed.active = 1

                   INNER JOIN jobmaster jm ON
                         jm.jobmasterid = aed.jobmasterid
                  AND jm.active = 1

                   WHERE ae.active = 1

                   AND ai.projectid = ?

                   Group By  projectid,
                             jobmasterid,
                             code,
                             name;
                                     */
			});
			con.query(query, [projectid]).then(function (rows, fields) {
				var rowsReturned = rows.length;
				var result = [];
				if (rowsReturned > 0) {
					if (rowsReturned > 0) {
						for (var index = 0; index < rowsReturned; index++) {
							result.push(new agreementModel.jobvacant(rows[index].projectid, rows[index].jobmasterid, rows[index].jobmastercode, rows[index].jobmastername, rows[index].numberofvacancies))
						}
					}
				}
				resolve(result);
			}).catch(function (err) {
				errorDAL.errorlog('Error',"agreementDAL::getagreementbyprojectid",err.stack,JSON.stringify(query),"agreementDAL");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"agreementDAL::getagreementbyprojectid",err.stack,JSON.stringify('MYSQL Error'),"agreementDAL");
			reject(err);
		});
	});
}

/*module.exports.getagreementbyprojectid = function (projectid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				
				SELECT
				    ai.projectid,
				    ae.clientid,
				    ai.agreementinfoid,
				    jm.jobmasterid,
				    jm.code AS jobmastercode,
				    jm.name AS jobmastername,
				    sum(aed.numberofvacancies) numberofvacancies,
				    lv.code,ae.agreementtypeid
				FROM
				    `agreement` ae
				 
				INNER JOIN agreementinfo ai ON
				      ai.agreementid = ae.agreementid
				AND ai.active = 1
				 
				INNER JOIN agreementdetail aed ON
				        aed.agreementinfoid = ai.agreementinfoid
				AND aed.active = 1

				INNER JOIN lookupvalue lv ON lv.lkvalid = ae.agreementtypeid AND lv.lkdmncode = 'AGREE'

				INNER JOIN jobmaster jm ON
				     jm.jobmasterid = aed.jobmasterid
				AND jm.active = 1

				WHERE ae.active = 1

				AND ai.projectid = ?

				Group By  projectid,
				         jobmasterid,
				         code,
				         name;
				                 
			});

			con.query(query, [projectid]).then(function (rows, fields) {
				var rowsReturned = rows.length;
				var result = [];
				if (rowsReturned > 0) {
					if (rowsReturned > 0) {
						for (var index = 0; index < rowsReturned; index++) {
							result.push(new agreementModel.jobvacant(rows[index].projectid, rows[index].jobmasterid, rows[index].jobmastercode, rows[index].jobmastername, rows[index].numberofvacancies, rows[index].code, rows[index].agreementtypeid, rows[index].clientid))
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
}*/

module.exports.getpostedjobsbyprojectid = function (projectid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
				SELECT
				       ja.projectid,
				       jm.jobmasterid,
				       jm.code AS jobmastercode,
				       jm.name AS name,
				       COUNT(1) numberofvacancies,
				       jpd.startdate
				       FROM
				            `jobactivity` ja

				       INNER JOIN  jobpostingdetail jpd ON
				             ja.jobpostingdetailid = jpd.jobpostingdetailid
				       AND jpd.active =1

				       INNER JOIN jobmaster jm ON
				       jm.jobmasterid = jpd.jobmasterid
				       AND jm.active = 1
				       WHERE ja.active = 1 AND ja.jobstatuscode = 2
				       AND ja.projectid IN (?)

				       Group By  projectid,
				             jobmasterid,
				             code,
				             name;
				*/
			});
			con.query(query, [projectid]).then(function (rows, fields) {
				var rowsReturned = rows.length;
				var result = [];
				if (rowsReturned > 0) {
					if (rowsReturned > 0) {
						for (var index = 0; index < rowsReturned; index++) {
							result.push(new agreementModel.jobvacant(rows[index].projectid, rows[index].jobmasterid, rows[index].jobmastercode, rows[index].name, rows[index].numberofvacancies, rows[index].startdate))
						}
					}
				}
				resolve(result);
			}).catch(function (err) {
				errorDAL.errorlog('Error',"agreementDAL::getpostedjobsbyprojectid",err.stack,JSON.stringify(query),"agreementDAL");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"agreementDAL::getpostedjobsbyprojectid",err.stack,JSON.stringify('mysql error'),"agreementDAL");
			reject(err);
		});


	});
}

module.exports.getagreementamend = function (agreementid) {
	// console.log('agreementid',agreementid);
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			con.query('SELECT addendum FROM `agreement_ams` WHERE agreementid = ?', [agreementid]).then(function (rows, fields) {
				resolve({
					"addendum": rows[0].addendum
				})
			}).catch(function (err) {
				errorDAL.errorlog('Error',"agreementDAL::getagreementamend",err.stack,JSON.stringify('query error'),"agreementDAL");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"agreementDAL::getagreementamend",err.stack,JSON.stringify('mysql error'),"agreementDAL");
			reject(err);
		});
	});
}


module.exports.updateagreementamsamend = function (agreementid, addendum) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			con.query('UPDATE agreement_ams SET addendum = ? WHERE agreementid= ?;', [addendum, agreementid]).then(function (rows, fields) {
				resolve({
					"agreementid": agreementid
				})
			}).catch(function (err) {
				errorDAL.errorlog('Error',"agreementDAL::updateagreementamsamend",err.stack,JSON.stringify('query error'),"agreementDAL");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"agreementDAL::updateagreementamsamend",err.stack,JSON.stringify('mysql error'),"agreementDAL");
			reject(err);
		});
	});
}

module.exports.updateagreementamend = function (agreementid, addendum) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			con.query('UPDATE agreement SET addendum= ? WHERE agreementid= ?', [addendum, agreementid]).then(function (rows, fields) {
				resolve({
					"agreementid": agreementid
				})
			}).catch(function (err) {
				errorDAL.errorlog('Error',"agreementDAL::updateagreementamend",err.stack,JSON.stringify('query error'),"agreementDAL");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"agreementDAL::updateagreementamend",err.stack,JSON.stringify('mysql error'),"agreementDAL");
			reject(err);
		});
	});
}

module.exports.updateagreementjobs = function (agreement) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			// console.log('agreement',agreement);
			var jobs = agreement.jobs;
			if (jobs.length > 0) {
				var queries = '';
				jobs.forEach(function (item) {
					// console.log('queries',queries);
					if (item.numberofvacancies > 0) {
						queries += con.format("UPDATE agreementdetail SET numberofvacancies = ? WHERE agreementdetailid = ?;", [item.numberofvacancies, item.agreementdetailid]);
						queries += con.format("UPDATE agreementdetail_ams SET numberofvacancies = ? WHERE agreementdetailid = ?;",[item.numberofvacancies, item.agreementdetailid]);

					} else {
						queries += con.format("DELETE FROM agreementdetail WHERE agreementdetailid = ?;",[item.agreementdetailid]);
						queries += con.format("DELETE FROM agreementdetail_ams WHERE agreementdetailid = ?;",[item.agreementdetailid]);
					}
				});
				// console.log('queries',queries);
				con.query(queries).then(function (rows, fields) {
					resolve({
						"agreementid": agreement.agreementid
					});
				}).catch(function (err) {
					errorDAL.errorlog('Error',"agreementDAL::updateagreementjobs",err.stack,JSON.stringify(queries),"agreementDAL");
					reject(err);
				});
			}
		}).catch(function (err) {
			errorDAL.errorlog('Error',"agreementDAL::updateagreementjobs",err.stack,JSON.stringify('mysql error'),"agreementDAL");
			reject(err);
		});
	});
}

module.exports.updateagreementamsjobs = function (agreement) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			// console.log('agreement',agreement);
			var jobs = agreement.jobs;
			if (jobs.length > 0) {
				var queries = '';
				jobs.forEach(function (item) {
					// console.log('queries',queries);
					if (item.numberofvacancies > 0) {
						queries += con.format("UPDATE agreementdetail_ams SET numberofvacancies = ?,amstatus = 1 WHERE agreementdetailid = ?;UPDATE agreementdetail SET amstatus = 1 WHERE agreementdetailid = ?;", [item.numberofvacancies, item.agreementdetailid, item.agreementdetailid]);
					} else {
						queries += con.format("DELETE FROM agreementdetail_ams WHERE agreementdetailid = ?;",[item.agreementdetailid])
					}
				});
				queries += con.format("UPDATE agreement_ams SET addendumstatus = 1 WHERE agreementid = ?;UPDATE agreement SET addendumstatus = 1 WHERE agreementid = ?;", [agreement.agreementid,agreement.agreementid]);
				con.query(queries).then(function (rows, fields) {
					resolve({
						"agreementid": agreement.agreementid
					});
				}).catch(function (err) {
					errorDAL.errorlog('Error',"agreementDAL::updateagreementamsjobs",err.stack,JSON.stringify(queries),"agreementDAL");
					reject(err);
				});
			}
		}).catch(function (err) {
			errorDAL.errorlog('Error',"agreementDAL::updateagreementamsjobs",err.stack,JSON.stringify('mysql error'),"agreementDAL");
			reject(err);
		});
	});
}

module.exports.rejectaddendumjobs = function (addendums,agreementid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var queries = '';
			addendums.forEach(function (item) {
				queries += con.format("UPDATE agreementdetail SET amstatus = 0 WHERE agreementdetailid = ?;",[item.agreementdetailid]);
				queries += con.format("UPDATE agreementdetail_ams SET amstatus = 2,amstatusupdated = 0 WHERE agreementdetailid = ?;",[item.agreementdetailid]);
			});	
			queries += con.format("UPDATE agreement SET addendumstatus = 0 WHERE agreementid = ?;",[agreementid]);
			queries += con.format("UPDATE agreement_ams SET addendumstatus = 0 WHERE agreementid = ?;",[agreementid]);
			con.query(queries).then(function (rows, fields) {
				resolve({
					"agreementid": agreementid
				});
			}).catch(function (err) {
				errorDAL.errorlog('Error',"agreementDAL::rejectaddendumjobs",err.stack,JSON.stringify(queries),"agreementDAL");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"agreementDAL::rejectaddendumjobs",err.stack,JSON.stringify('mysql error'),"agreementDAL");
			reject(err);
		});
	});
}

module.exports.updateaddendumjobs = function (jobs,agreementid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			if (jobs.length > 0) {
				var queries = '';
				jobs.forEach(function (item) {
					console.log('item',item);
					if (item.numberofvacancies > 0) {
						queries += con.format("UPDATE agreementdetail SET numberofvacancies = ?,amstatus = 0 WHERE agreementdetailid = ?;UPDATE agreementdetail_ams SET numberofvacancies = ?,amstatus = 0 WHERE agreementdetailid = ?;", [item.numberofvacancies, item.agreementdetailid,item.numberofvacancies, item.agreementdetailid]);
					} else {
						queries += con.format("DELETE FROM agreementdetail WHERE agreementdetailid = ?;DELETE FROM agreementdetail_ams WHERE agreementdetailid = ?;",[item.agreementdetailid,item.agreementdetailid])
					}
				});
				//console.log('queries',queries);
				con.query(queries).then(function (rows, fields) {
					resolve({
						"agreementid": jobs.agreementid
					});
				}).catch(function (err) {
					errorDAL.errorlog('Error',"agreementDAL::updateaddendumjobs",err.stack,JSON.stringify(queries),"agreementDAL");
					reject(err);
				});
			}
		}).catch(function (err) {
			errorDAL.errorlog('Error',"agreementDAL::updateaddendumjobs",err.stack,JSON.stringify('Mysql Error'),"agreementDAL");
			reject(err);
		});
	});
}

module.exports.addaddendumjobs = function (jobs,agreement,addendum)  {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			// console.log('jobs',jobs);
			if (jobs.length > 0) {
				var queries = '';
				jobs.forEach(function (item) {
					if(item.amstatusupdated == 1) { 
						queries += con.format("UPDATE agreementdetail SET numberofvacancies = ?, amstatus = 0 WHERE jobmasterid = ? AND agreementinfoid = ?;",[item.numberofvacancies, item.jobmasterid, item.agreementinfoid]);
						queries += con.format("UPDATE agreementdetail_ams SET amstatus = 0 , amstatusupdated = 0 WHERE agreementdetailid = ?;",[item.agreementdetailid]);
					} else {
						if (item.numberofvacancies > 0) {
							queries += con.format("INSERT INTO agreementdetail (agreementinfoid, jobmasterid, numberofvacancies, salary, addendum) VALUES (?,?,?,?,?);", [item.agreementinfoid, item.jobmasterid, item.numberofvacancies, item.salary, addendum]);
							queries += con.format("UPDATE agreementdetail_ams SET amstatus = 0 WHERE agreementdetailid = ?;",[item.agreementdetailid]);
						} else {
							queries += con.format("DELETE FROM agreementdetail_ams WHERE agreementdetailid = ?;",[item.agreementdetailid]);
						}
					}
				});
				queries += con.format("UPDATE agreement_ams SET addendumstatus = 0 WHERE agreementid = ?;UPDATE agreement SET addendumstatus = 0 WHERE agreementid = ?;",[agreement.agreementid,agreement.agreementid]);
				// console.log('queries',queries);
				con.query(queries).then(function (rows, fields) {
					resolve({
						"agreementid": agreement.agreementid
					});
				}).catch(function (err) {
					errorDAL.errorlog('Error',"agreementDAL::addendumjobs",err.stack,JSON.stringify(queries),"agreementDAL");
					reject(err);
				});
			}
		}).catch(function (err) {
			errorDAL.errorlog('Error',"agreementDAL::addendumjobs",err.stack,JSON.stringify('MYSQL Error'),"agreementDAL");
			reject(err);
		});
	});
}

module.exports.updateaddendumamsjobs = function (jobs) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			if (jobs.length > 0) {
				var queries = '';
				jobs.forEach(function (item) {
					if (item.numberofvacancies > 0) {
						queries += con.format("UPDATE agreementdetail_ams SET numberofvacancies = ?,amstatusupdated = 1,amstatus = 1 WHERE agreementdetailid = ?;", [item.numberofvacancies, item.agreementdetailid]);
						queries += con.format("UPDATE agreement SET addendumstatus = 1 WHERE agreementid = ?;UPDATE agreement_ams SET addendumstatus = 1 WHERE agreementid = ?;", [item.agreementid,item.agreementid]);
					} else {
						queries += con.format("DELETE FROM agreementdetail_ams WHERE agreementdetailid = ?;",[item.agreementdetailid])
					}
				});
				con.query(queries).then(function (rows, fields) {
					resolve({
						"agreementid": jobs[0].agreementid
					});
				}).catch(function (err) {
					errorDAL.errorlog('Error',"agreementDAL::updateaddendumamsjobs",err.stack,JSON.stringify(queries),"agreementDAL");
					reject(err);
				});
			}
		}).catch(function (err) {
			errorDAL.errorlog('Error',"agreementDAL::updateaddendumamsjobs",err.stack,JSON.stringify('MYSQL Error'),"agreementDAL");
			reject(err);
		});
	});
}

module.exports.amendagreement = function (agreement, addendum) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var jobs = agreement.jobs;
			if (jobs.length > 0) {
				var queries = '';
				jobs.forEach(function (item) {
					if (item.numberofvacancies > 0) {
						queries += con.format("INSERT INTO agreementdetail(agreementinfoid, jobmasterid, numberofvacancies, salary, addendum) VALUES (?,?,?,?,?);", [agreement.agreementinfoid, item.jobmasterid, item.numberofvacancies, item.salary, addendum]);
						queries += con.format("INSERT INTO agreementdetail_ams (agreementinfoid, jobmasterid, numberofvacancies, salary, addendum,amstatus) VALUES (?,?,?,?,?,?);", [agreement.agreementinfoid, item.jobmasterid, item.numberofvacancies, item.salary, addendum, 1]);
					}
				});
				//console.log('queries',queries);
				con.query(queries).then(function (rows, fields) {
					resolve({
						"agreementid": agreement.agreementid
					});
				}).catch(function (err) {
					errorDAL.errorlog('Error',"agreementDAL::amendagreement",err.stack,JSON.stringify(queries),"agreementDAL");
					reject(err);
				});
			}
		}).catch(function (err) {
			errorDAL.errorlog('Error',"agreementDAL::amendagreement",err.stack,JSON.stringify('MYSQl Error'),"agreementDAL");
			reject(err);
		});
	});
}

module.exports.amendagreementams = function (agreement, addendum) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var jobs = agreement.jobs;
			if (jobs.length > 0) {
				var queries = '';
				jobs.forEach(function (item) {
					if (item.numberofvacancies > 0) {
						queries += con.format("INSERT INTO agreementdetail_ams (agreementinfoid, jobmasterid, numberofvacancies, salary, addendum,amstatus) VALUES (?,?,?,?,?,?);", [agreement.agreementinfoid, item.jobmasterid, item.numberofvacancies, item.salary, addendum, 1])
					}
				}); 
				queries += con.format("UPDATE agreement SET addendumstatus = 1 WHERE agreementid = ?;UPDATE agreement_ams SET addendumstatus = 1 WHERE agreementid = ?;", [agreement.agreementid,agreement.agreementid]);
				con.query(queries).then(function (rows, fields) {
					resolve({
						"agreementid": agreement.agreementid
					});
				}).catch(function (err) {
					errorDAL.errorlog('Error',"agreementDAL::amendagreementams",err.stack,JSON.stringify(queries),"agreementDAL");
					reject(err);
				});
			}
		}).catch(function (err) {
			errorDAL.errorlog('Error',"agreementDAL::amendagreementams",err.stack,JSON.stringify('MYSQL Error'),"agreementDAL");
			reject(err);
		});
	});
}


module.exports.getjobpostingbyprojectid = function (projectid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
                 SELECT 
                     jp.projectid,
                     jpd.jobmasterid,
                     jpd.numberofvacancies, 
                     jpd.startdate,
                     jpd.active,
                     jm.code
                 FROM `jobposting` jp
                 
                 INNER JOIN jobpostingdetail jpd ON
                     jpd.jobpostingid = jp.jobpostingid
                 AND jpd.active = 1 AND jpd.close = 1 
                                  
                 INNER JOIN jobmaster jm ON
                     jm.jobmasterid = jpd.jobmasterid
                 AND jm.active = 1
                                      
                 WHERE jp.projectid IN (?) AND jp.active=1
                                     */
			});
			con.query(query, [projectid]).then(function (rows, fields) {
				var rowsReturned = rows.length;
				var result = [];
				if (rowsReturned > 0) {
					for (var index = 0; index < rowsReturned; index++) {
						result.push(new agreementModel.jobvacant(rows[index].projectid, rows[index].jobmasterid, rows[index].jobmastercode, rows[index].jobmastername, rows[index].numberofvacancies, rows[index].code, rows[index].startdate))
					}
				}
				resolve(result);
			}).catch(function (err) {
				errorDAL.errorlog('Error',"agreementDAL::getjobpostingbyprojectid",err.stack,JSON.stringify(query),"agreementDAL");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"agreementDAL::getjobpostingbyprojectid",err.stack,JSON.stringify('Mysql Error'),"agreementDAL");
			reject(err);
		});
	});
}

module.exports.getMembersWorkingCount = function (projectid) {
	//console.log('getMembersWorkingCount', projectid);
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
				    SELECT COUNT(*) AS numberofvacancies,pr.projectid,jm.jobmasterid,jm.code as jobmastercode,jm.name as jobmastername,mm.startdate FROM memberhistory mm 
				    inner JOIN project pr ON pr.projectno = mm.projectno 
				    inner join jobmaster jm on jm.code = mm.category
				    inner JOIN member mem ON mem.memberid = mm.memberid WHERE mm.projectid  IN (?) AND 
				    mm.enddate  >= NOW() - interval 30 day GROUP BY mm.texcono,jm.jobmasterid
				*/
			});
			con.query(query, [projectid]).then(function (rows, fields) {
				//console.log('rows....rows...rows', rows);
				var rowsReturned = rows.length;
				var result = [];
				if (rowsReturned > 0) {
					for (var index = 0; index < rowsReturned; index++) {
						result.push(new agreementModel.jobAppliedCount(rows[index].projectid, rows[index].jobmasterid, rows[index].jobmastercode, rows[index].jobmastername, rows[index].numberofvacancies, rows[index].startdate))
					}
				}
				resolve(result);
			}).catch(function (err) {
				errorDAL.errorlog('Error',"agreementDAL::getMembersWorkingCount",err.stack,JSON.stringify(query),"agreementDAL");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"agreementDAL::getMembersWorkingCount",err.stack,JSON.stringify('MYSQL Error'),"agreementDAL");
			reject(err);
		});
	});
}

module.exports.getMembersCurrentMonthWorkingCount = function (projectid) {
	var dt = new Date();
	var StartDate = moment(dt).startOf('month').format('YYYY-MM-DD');
	var EndDate = moment(dt).endOf('month').format('YYYY-MM-DD');
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
				    SELECT COUNT(*) AS noofvacancy FROM memberhistory mm WHERE mm.projectid  IN (?) AND (DATE(mm.startdate) BETWEEN ? AND ?) AND mm.working_status = 1;
				*/
			});
			con.query(query, [projectid, StartDate, EndDate]).then(function (rows, fields) {
				var rowsReturned = rows.length;
				var result = [];
				if (rowsReturned > 0) {
					for (var index = 0; index < rowsReturned; index++) {
						result.push(new agreementModel.jobAppliedCount(rows[index].projectid, rows[index].jobmasterid, rows[index].jobmastercode, rows[index].jobmastername, rows[index].numberofvacancies, rows[index].startdate))
					}
				}
				resolve(result);
			}).catch(function (err) {
				errorDAL.errorlog('Error',"agreementDAL::getMembersCurrentMonthWorkingCount",err.stack,JSON.stringify(query),"agreementDAL");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"agreementDAL::getMembersCurrentMonthWorkingCount",err.stack,JSON.stringify('MYSQL Error'),"agreementDAL");
			reject(err);
		});
	});
}

module.exports.getagreementinfo = function (agreementid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			con.query('SELECT  agreementinfoid FROM agreementinfo WHERE agreementid= ?  and active = 1;', [agreementid]).then(function (rows, fields) {
				var rowsReturned = rows.length;
				var agreementinfo = [];
				if (rowsReturned > 0) {
					for (var index = 0; index < rowsReturned; index++) {
						agreementinfo.push(new agreementModel.agreementinfo(rows[index].agreementinfoid));
					}
				}
				resolve(agreementinfo)
			}).catch(function (err) {
				errorDAL.errorlog('Error',"agreementDAL::getagreementinfo",err.stack,JSON.stringify('Query Error'),"agreementDAL");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"agreementDAL::getagreementinfo",err.stack,JSON.stringify('MYSQL Error'),"agreementDAL");
			reject(err);
		});
	});
}

/* module.exports.getjobpostingexport = function (closedate) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            var query = multiline.stripIndent(function () {
                    /*
                  SELECT 
                       a.fromdate,
                       a.todate,
                       a.organization,
                       a.projectid,
                       a.projectno, 
                       a.projectname,
                       a.servicecharge, 
                       a.tax, 
                       a.wagetype,
                       a.agreementtype, 
                       a.agreementstatus,
                       a.optionaltype,
                       a.agtype, 
                       a.wagearea,
                       a.wageyear,
                       a.jobmastercode AS jobcode,
                       a.jobmastername AS category,
                       a.agreementvacancies,
                       b.postedvacancies,
                       c.filledvacancies 
                       
                       FROM (SELECT
                                ai.projectid AS projectid,
                                DATE_FORMAT( ae.fromdate,'%d %b %Y') AS fromdate,
                                DATE_FORMAT( ae.todate,'%d %b %Y') AS todate,
                                ae.servicecharge,
                  				ae.tax,
                                ae.clientid,
                                ae.optionaltype,
                                cl.organization,
                                p.projectno,
                                p.name AS projectname,
                                jm.jobmasterid,
                                jm.code AS jobmastercode,
                                jm.name AS jobmastername,
                                sum(aed.numberofvacancies) agreementvacancies,
                                ae.wagetypeid,
                                lv.description AS 'wagetype',
                                ae.agreementtypeid,
                                lv1.description AS 'agreementtype',
                                ae.agreementstatusid,
                                lv2.description AS 'agreementstatus',
                                ae.agtypeid,
                                lv3.description AS 'agtype',
                                ae.wageareaid,
                                lv4.description AS 'wagearea',
                                ae.wageyearid,
                                lv5.description AS 'wageyear'
				
                                FROM `agreement` ae
                
                                        INNER JOIN agreementinfo ai ON
                                            ai.agreementid = ae.agreementid
                                        AND ai.active = 1
                
                                        INNER JOIN agreementdetail aed ON
                                            aed.agreementinfoid = ai.agreementinfoid
                                        AND aed.active = 1
                               
                                        INNER JOIN client cl ON
                                            cl.clientid = ae.clientid
                                 		AND cl.active = 1

                                  		INNER JOIN project p ON
                                            p.projectid = ai.projectid
                                 		AND p.active = 1
                
                                        INNER JOIN jobmaster jm ON
                                            jm.jobmasterid = aed.jobmasterid
                                        AND jm.active = 1
                                        
                                        INNER JOIN lookupvalue lv ON
                                            lv.lkvalid = ae.wagetypeid
                                        AND lv.active = 1

                                        INNER JOIN lookupvalue lv1 ON
                                            lv1.lkvalid = ae.agreementtypeid
                                        AND lv1.active = 1

                                        INNER JOIN lookupvalue lv2 ON
                                            lv2.lkvalid = ae.agreementstatusid
                                        AND lv2.active = 1
                     
                                        INNER JOIN lookupvalue lv3 ON
                                            lv3.lkvalid = ae.agtypeid
                                        AND lv3.active = 1

                                        LEFT JOIN lookupvalue lv4 ON
                                            lv4.lkvalid =   ae.wageareaid
                                        AND lv4.active = 1

                                       INNER JOIN lookupvalue lv5 ON
                                            lv5.lkvalid =   ae.wageyearid
                                       AND lv5.active = 1
                
                                WHERE ae.active = 1
                
                                Group By projectid,
                                             jobmasterid,
                                             jobmastercode,
                                             jobmastername)AS a
						LEFT JOIN ( SELECT 
                                 jp.projectid,
                                 jpd.jobpostingdetailid, 
                                 jpd.jobmasterid,
                                 jm.code AS jobmastercode,
                                 jm.name AS jobmastername,
                                 jpd.numberofvacancies As postedvacancies, 
                                 jpd.active
                             FROM `jobposting` jp
                 
                             INNER JOIN jobpostingdetail jpd ON
                                 jpd.jobpostingid = jp.jobpostingid
                             AND jpd.active = 1 AND jpd.closedate = ?
                                  
                             INNER JOIN jobmaster jm ON
                                 jm.jobmasterid = jpd.jobmasterid
                             AND jm.active = 1
                                      
                             WHERE jp.active=1) AS b
                                 
                             ON a.projectid = b.projectid AND a.jobmastercode= b.jobmastercode
                                
                       LEFT JOIN ( select
                               ja.projectid,
                               jm.jobmasterid,
                               jm.code AS jobmastercode,
                               jm.name AS name,
                               COUNT(ja.jobstatuscode) AS filledvacancies
                     
                            FROM
                                 `jobactivity` ja

                            INNER JOIN  jobpostingdetail jpd ON
                                  ja.jobpostingdetailid = jpd.jobpostingdetailid
                            AND jpd.active =1 AND jpd.closedate = ?

                            INNER JOIN jobmaster jm ON
                                  jm.jobmasterid = jpd.jobmasterid
                            AND jm.active = 1
                               
                            WHERE ja.active = 1 AND ja.jobstatuscode = 2

                            Group By  projectid,
                                     jobmasterid,
                                     code,
                                     name) AS c
                                 
                            ON a.projectid = c.projectid AND a.jobmastercode= c.jobmastercode
                         
            });
            
            con.query(query, [closedate, closedate]).then(function (rows, fields) {
                var rowsReturned = rows.length;
                var result = [];
                if (rowsReturned > 0) {
                    for (var i = 0; i < rowsReturned; i++) {
                        var agreement = new agreementModel.jobpostingexport(rows[i].organization, rows[i].projectid, rows[i].projectno, rows[i].projectname, rows[i].fromdate, rows[i].todate, rows[i].servicecharge, rows[i].wagetype, rows[i].wageyear, rows[i].wagearea, rows[i].agreementstatus, rows[i].optionaltype, rows[i].agreementtype, rows[i].agtype, rows[i].jobcode, rows[i].category, rows[i].agreementvacancies, rows[i].postedvacancies, rows[i].filledvacancies);
                        result.push(agreement);
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
} */

module.exports.getjobpostingexport = function (closedate) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
                    SELECT
                        project.projectno,
                        project.name AS projectname,
                        client.organization,
                        client.addressline1,
                        client.addressline2,
                        client.addressline3,
                        jobmaster.code AS jobmastercode,
                        jobmaster.name AS jobmastername,
                        DATE_FORMAT(jpd.posteddate,'%d %b %Y') AS posteddate,
                        IFNULL(jpd.numberofvacancies, 0) AS numberofvacancies,
                        IFNULL(jpd.filledvacancies, 0) AS filledvacancies,
                        IFNULL(jpd.waitingvacancies, 0) AS waitingvacancies,
                        jpd.comments,
                        jpd.inplace,
                        district.description As district,
                        region.description AS region
                    FROM
                        jobpostingdetail jpd

                    INNER JOIN jobposting jp ON
                        jpd.jobpostingid = jp.jobpostingid
                    AND jp.active =1

                    INNER JOIN client client ON
                        client.clientid = jp.clientid
                    AND client.active =1

                    INNER JOIN project project ON
                        project.projectid = jp.projectid
                    AND project.active =1

                    INNER JOIN lookupvalue district ON
                        district.lkvalid = project.districtid
                    AND district.active = 1

                    INNER JOIN jobmaster jobmaster ON
                        jobmaster.jobmasterid = jpd.jobmasterid
                    AND jobmaster.active = 1

                    INNER JOIN lookupvalue region ON
                        region.lkvalid = project.regionid
                    AND region.active = 1

                    WHERE (CASE WHEN ((? != 'undefined') AND (? != 'NULL') ) 
                    THEN jpd.closedate = ?
                    ELSE 1=1 END) 
                */
			});

			con.query(query, [closedate, closedate, closedate]).then(function (rows, fields) {
				var rowsReturned = rows.length;
				var result = [];
				if (rowsReturned > 0) {
					for (var i = 0; i < rowsReturned; i++) {
						var agreement = new agreementModel.jobpostingExportdetail(rows[i].projectno, rows[i].projectname, rows[i].organization, rows[i].addressline1, rows[i].addressline2, rows[i].addressline3, rows[i].district, rows[i].region, rows[i].jobmastercode, rows[i].jobmastername, rows[i].posteddate,
							rows[i].numberofvacancies, rows[i].filledvacancies, rows[i].waitingvacancies, rows[i].comments, rows[i].inplace);

						// var agreement = new agreementModel.jobpostingexport(rows[i].organization, rows[i].projectid, rows[i].projectno, rows[i].projectname, rows[i].fromdate, rows[i].todate, rows[i].servicecharge, rows[i].wagetype, rows[i].wageyear, rows[i].wagearea, rows[i].agreementstatus, rows[i].optionaltype, rows[i].agreementtype, rows[i].agtype, rows[i].jobcode, rows[i].category, rows[i].agreementvacancies, rows[i].postedvacancies, rows[i].filledvacancies);
						result.push(agreement);
					}
				}
				resolve(result);
			}).catch(function (err) {
				errorDAL.errorlog('Error',"agreementDAL::getjobpostingexport",err.stack,JSON.stringify(query),"agreementDAL");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"agreementDAL::getjobpostingexport",err.stack,JSON.stringify('MYSQL Error'),"agreementDAL");
			reject(err);
		});
	});
}

module.exports.getagreementexport = function (agreementtypeid, agtypeid, agreementstatusid, wagetypeid, wageyearid, wageareaid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
					SELECT pr.projectno,pr.name AS projectname,pr.designation,cl.organization AS clientname,lv9.description AS region,lv10.description AS district,
					lv11.description AS taluk,DATE_FORMAT(ag.fromdate,'%d %b %Y') AS fromdate,DATE_FORMAT(ag.todate,'%d %b %Y') AS todate,
					lv1.description AS agreementtype,lv2.description AS agreementstatus,lv3.description AS agtype,lv.description AS wagetype,
					lv5.description AS wageyear,lv4.description AS wagearea,jm.code,ae.numberofvacancies
					FROM agreement ag 
					INNER JOIN agreementinfo ai ON ai.agreementid = ag.agreementid
					INNER JOIN agreementdetail ae ON ae.agreementinfoid = ai.agreementinfoid
					INNER JOIN project pr ON pr.projectid = ai.projectid AND pr.active = 1
					INNER JOIN client cl ON cl.clientid = ag.clientid AND cl.active = 1
					INNER JOIN jobmaster jm ON jm.jobmasterid = ae.jobmasterid AND jm.active = 1
					LEFT JOIN lookupvalue lv ON lv.lkvalid = ag.wagetypeid AND lv.active = 1
					LEFT JOIN lookupvalue lv1 ON lv1.lkvalid = ag.agreementtypeid AND lv1.active = 1
					LEFT JOIN lookupvalue lv2 ON lv2.lkvalid = ag.agreementstatusid AND lv2.active = 1
					LEFT JOIN lookupvalue lv3 ON lv3.lkvalid = ag.agtypeid AND lv3.active = 1
					LEFT JOIN lookupvalue lv4 ON lv4.lkvalid = ag.wageareaid AND lv4.active = 1
					LEFT JOIN lookupvalue lv5 ON lv5.lkvalid = ag.wageyearid  AND lv5.active = 1
					LEFT JOIN lookupvalue lv9 ON lv9.lkvalid = pr.regionid AND lv9.active = 1
					LEFT JOIN lookupvalue lv10 ON lv10.lkvalid = cl.districtid AND lv10.active = 1
					LEFT JOIN lookupvalue lv11 ON lv11.lkvalid = cl.talukid AND lv11.active = 1
					WHERE ag.active = 1 
					AND (CASE WHEN (? != 'undefined' AND (? != 'NULL')) THEN ag.agreementtypeid IN (?) ELSE 1=1 END)
					AND (CASE WHEN (? != 'undefined' AND (? != 'NULL')) THEN ag.agtypeid IN (?) ELSE 1=1 END) 
					AND (CASE WHEN ((? != 'undefined') AND (? != 'NULL') ) THEN ag.agreementstatusid IN (?) ELSE 1=1 END) 
					AND (CASE WHEN (? != 'undefined' AND (? != 'NULL') ) THEN ag.wagetypeid IN (?) ELSE 1=1 END)
					AND (CASE WHEN (? != 'undefined' AND (? != 'NULL') ) THEN ag.wageyearid IN (?) ELSE 1=1 END)
					AND (CASE WHEN (? != 'undefined' AND (? != 'NULL') ) THEN ag.wageareaid IN (?)  ELSE 1=1 END)
					ORDER BY pr.projectno;
				*/
			});
			con.query(query, [agreementtypeid, agreementtypeid, agreementtypeid, agtypeid, agtypeid, agtypeid, agreementstatusid, agreementstatusid, agreementstatusid, wagetypeid, wagetypeid, wagetypeid, wageyearid, wageyearid, wageyearid, wageareaid, wageareaid, wageareaid]).then(function (rows, fields) {
				var rowsReturned = rows.length;
				var result = [];
				sg = 0;
				sgsalary = 0;
				hsg = 0;
				dvr = 0;
				aso = 0;
				po = 0;
				ja = 0;
				other = 0;
				oa = 0;
				gun = 0;
				if (rowsReturned > 0) {
					for (var i = 0; i < rowsReturned; i++) {
						if (rows[i].code == "SG") {
							sg = rows[i].numberofvacancies;
						} else if (rows[i].code == "HSG") {
							hsg = rows[i].numberofvacancies;
						} else if (rows[i].code == "DVR") {
							dvr = rows[i].numberofvacancies;
						} else if (rows[i].code == "ASO") {
							aso = rows[i].numberofvacancies;
						} else if (rows[i].code == "PO") {
							po = rows[i].numberofvacancies;
						} else if (rows[i].code == "JA") {
							ja = rows[i].numberofvacancies;
						} else if (rows[i].code == "OTHER") {
							other = rows[i].numberofvacancies;
						} else if (rows[i].code == "OA") {
							oa = rows[i].numberofvacancies;
						} else if (rows[i].code == "GMAN") {
							gun = rows[i].numberofvacancies;
						}
						if ((i + 1 == rowsReturned) || (rows[i].projectno != rows[i + 1].projectno)) { 
							var agreement = new agreementModel.agreementexport(rows[i].projectno,rows[i].projectname,rows[i].designation,rows[i].clientname,rows[i].region,rows[i].district,rows[i].taluk,rows[i].fromdate,rows[i].todate,rows[i].agreementtype,rows[i].agreementstatus,rows[i].agtype,rows[i].wagetype,rows[i].wageyear,rows[i].wagearea,rows[i].code,sg,hsg, dvr,aso, po,ja,other,oa,gun);
							result.push(agreement);
							sg = 0;
							hsg = 0;
							dvr = 0;
							aso = 0;
							po = 0;
							ja = 0;
							other = 0;
							oa = 0;
							gun = 0;
						}
					}
				}
				resolve(result);
			}).catch(function (err) {
				errorDAL.errorlog('Error',"agreementDAL::getagreementexport",err.stack,JSON.stringify(query),"agreementDAL");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"agreementDAL::getagreementexport",err.stack,JSON.stringify('MYSQL Error'),"agreementDAL");
			reject(err);
		});
	});
} 

module.exports.getagreementamsexport = function (regionid,fromdate,todate) {
	var todates = moment(todate, "YYYY-MM-DD").add(1, 'days');
	var todatess = moment(todates).format('YYYY-MM-DD');
	console.log('todatess',fromdate,todatess)
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
					SELECT
						DATE_FORMAT( ae.fromdate,'%d %b %Y') AS fromdate,
						DATE_FORMAT( ae.todate,'%d %b %Y') AS todate,
						ae.servicecharge,
						ae.tax,
						ae.optionaltype,
						aed.numberofvacancies,
						aed.salary,
						aed.addendum as 'addendum',
						aed.agreementdetailid,
						c.organization as client,
						c.contactname,
						c.email,
						c.mobile,
						c.addressline1,
						c.addressline2,
						c.addressline3,
						c.phone,
						c.gstno,
						c.tanno,
						c.panno,
						c.department,
						lv6.description AS 'departmenttype',
						jm.code,
						jm.name AS jobmastername,
						lv.description AS 'wagetype',
						lv1.description AS 'agreementtype',
						lv2.description AS 'agreementstatus',
						lv3.description AS 'agtype',
						lv4.description AS 'wagearea',
						lv5.description AS 'wageyear',
						lv6.description AS 'dept',
						lv7.description AS 'departmenttype',
						p.projectno,
						p.name AS projectname,
						lv9.description AS 'region',
						p.designation,
						p.addressline1 AS projectaddress1,
						p.addressline2 AS projectaddress2,
						p.addressline3 AS projectaddress3,
						p.pincode,
						lv10.description AS 'district',
						lv11.description AS 'taluk',
						lv12.description AS 'state',
						lv13.description AS 'country',
						ae.amstatus
					FROM
						`agreement_ams` ae
					INNER JOIN agreementinfo ai ON
							ae.agreementid = ai.agreementid
					AND ai.active = 1

					INNER JOIN agreementdetail aed ON
							aed.agreementinfoid = ai.agreementinfoid
					AND aed.active = 1
								
					INNER JOIN client_ams c ON
							c.clientid = ae.clientid
					AND c.active = 1

					INNER JOIN project_ams p ON
							p.projectid = ai.projectid
					AND p.active = 1

					INNER JOIN jobmaster jm ON
							jm.jobmasterid = aed.jobmasterid
					AND jm.active = 1

					LEFT JOIN lookupvalue lv ON
							lv.lkvalid = ae.wagetypeid
					AND lv.active = 1

					LEFT JOIN lookupvalue lv1 ON
							lv1.lkvalid = ae.agreementtypeid
					AND lv1.active = 1

					LEFT JOIN lookupvalue lv2 ON
							lv2.lkvalid = ae.agreementstatusid
					AND lv2.active = 1

					LEFT JOIN lookupvalue lv3 ON
							lv3.lkvalid = ae.agtypeid
					AND lv3.active = 1

					LEFT JOIN lookupvalue lv4 ON
							lv4.lkvalid =   ae.wageareaid
					AND lv4.active = 1

					LEFT JOIN lookupvalue lv5 ON
							lv5.lkvalid =   ae.wageyearid
					AND lv5.active = 1
								
					LEFT JOIN lookupvalue lv6 ON
							lv6.lkvalid = c.deptid
					AND lv6.active = 1
								
					LEFT JOIN lookupvalue lv7 ON
							lv7.lkvalid = c.departmenttypeid
					AND lv7.active = 1
					
					LEFT JOIN lookupvalue lv9 ON
							lv9.lkvalid = p.regionid
					AND lv9.active = 1
								
					LEFT JOIN lookupvalue lv10 ON
							lv10.lkvalid = c.districtid
					AND lv10.active = 1

					LEFT JOIN lookupvalue lv11 ON
							lv11.lkvalid = c.talukid
					AND lv11.active = 1

					LEFT JOIN lookupvalue lv12 ON
							lv12.lkvalid = c.stateid
					AND lv12.active = 1

					LEFT JOIN lookupvalue lv13 ON
							lv13.lkvalid = c.countryid
					AND lv13.active = 1
								
					WHERE ae.active = 1  AND DATE(ae.modifdttm) BETWEEN (?) AND (?)             
					
					AND case ? when 0 then 1 = 1 else  p.regionid = ? end AND ae.amstatus != 0
					ORDER BY p.projectid;
                */
			});
			con.query(query, [fromdate,todatess, regionid, regionid]).then(function (rows, fields) {
				var rowsReturned = rows.length;
				var result = [];
				sg = 0;
				sgsalary = 0;
				hsg = 0;
				hsgsalary = 0;
				dvr = 0;
				dvrsalary = 0;
				aso = 0;
				asosalary = 0;
				po = 0;
				posalary = 0;
				ja = 0;
				jasalary = 0;
				other = 0;
				othersalary = 0;
				oa = 0;
				oasalary = 0;
				gun = 0;
				gunsalary = 0;
				if (rowsReturned > 0) {
					for (var i = 0; i < rowsReturned; i++) {
						if (rows[i].code == "SG") {
							sg = rows[i].numberofvacancies;
							sgsalary = rows[i].salary;
						} else if (rows[i].code == "HSG") {
							hsg = rows[i].numberofvacancies;
							hsgsalary = rows[i].salary;
						} else if (rows[i].code == "DVR") {
							dvr = rows[i].numberofvacancies;
							dvrsalary = rows[i].salary;
						} else if (rows[i].code == "ASO") {
							aso = rows[i].numberofvacancies;
							asosalary = rows[i].salary;
						} else if (rows[i].code == "PO") {
							po = rows[i].numberofvacancies;
							posalary = rows[i].salary;
						} else if (rows[i].code == "JA") {
							ja = rows[i].numberofvacancies;
							jasalary = rows[i].salary;
						} else if (rows[i].code == "OTHER") {
							other = rows[i].numberofvacancies;
							othersalary = rows[i].salary;
						} else if (rows[i].code == "OA") {
							oa = rows[i].numberofvacancies;
							oasalary = rows[i].salary;
						} else if (rows[i].code == "GUN") {
							gun = rows[i].numberofvacancies;
							gunsalary = rows[i].salary;
						}
						if ((i + 1 == rowsReturned) || (rows[i].projectno != rows[i + 1].projectno)) { 
							var amstatuss = '';
							if(rows[i].amstatus == 1) {
								amstatuss = 'Waiting for Approval';
							} 
							if(rows[i].amstatus == 0) {
								amstatuss = '';
							}
							if(rows[i].amstatus == 2) {
								amstatuss = 'Rejected By Admin';
							}
							var amstatuss = '';
							var agreement = new agreementModel.agreementamsexport(rows[i].client, rows[i].projectno, rows[i].projectname, rows[i].fromdate, rows[i].todate, rows[i].servicecharge, rows[i].wagetype, rows[i].wageyear, rows[i].wagearea, rows[i].agreementstatus, rows[i].optionaltype, rows[i].agreementtype, rows[i].agtype,sg, sgsalary, hsg, hsgsalary, dvr, dvrsalary, aso, asosalary, po, posalary, ja, jasalary, other, othersalary, oa, oasalary, gun, gunsalary, rows[i].contactname, rows[i].email, rows[i].mobile, rows[i].phone, rows[i].gstno, rows[i].tanno, rows[i].panno, rows[i].addressline1, rows[i].addressline2, rows[i].addressline3, rows[i].district, rows[i].taluk, rows[i].state, rows[i].country, rows[i].region, rows[i].departmenttype, rows[i].department,  rows[i].dept, rows[i].designation, rows[i].projectaddress1, rows[i].projectaddress2, rows[i].projectaddress3, rows[i].pincode,amstatuss);
							result.push(agreement);
							sg = 0;
							sgsalary = 0;
							hsg = 0;
							hsgsalary = 0;
							dvr = 0;
							dvrsalary = 0;
							aso = 0;
							asosalary = 0;
							po = 0;
							posalary = 0;
							ja = 0;
							jasalary = 0;
							other = 0;
							othersalary = 0;
							oa = 0;
							oasalary = 0;
							gun = 0;
							gunsalary = 0;
						}
					}
				}
				resolve(result);
			}).catch(function (err) {
				errorDAL.errorlog('Error',"agreementDAL::getagreementexport",err.stack,JSON.stringify(query),"agreementDAL");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"agreementDAL::getagreementexport",err.stack,JSON.stringify('MYSQL Error'),"agreementDAL");
			reject(err);
		});
	});
} 



module.exports.checkagreement = function (projectid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			con.query('SELECT agreementid FROM agreementinfo WHERE projectid = ? and active = 1 ;', [projectid]).then(function (rows, fields) {
				if (rows.length > 0) {
					resolve("Agreement Exist");
				} else {
					resolve("success");
				}
			}).catch(function (err) {
				errorDAL.errorlog('Error',"agreementDAL::checkagreement",err.stack,JSON.stringify(query),"agreementDAL");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"agreementDAL::checkagreement",err.stack,JSON.stringify('MYSQL Error'),"agreementDAL");
			reject(err);
		});
	});
}

module.exports.updateprojectstatus = function (agreementinfoid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			con.query("UPDATE agreementinfo SET active=? WHERE agreementinfoid= ?", [0, agreementinfoid]).then(function (rows, fields) {
				resolve({
					"agreementinfoid": agreementinfoid
				});
			}).catch(function (err) {
				errorDAL.errorlog('Error',"agreementDAL::updateprojectstatus",err.stack,JSON.stringify(agreementinfoid),"agreementDAL");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"agreementDAL::updateprojectstatus",err.stack,JSON.stringify('MYSQL Error'),"agreementDAL");
			reject(err);
		});
	});
}

module.exports.getattendancependinglist = function () {
	var LastMonth = moment().subtract('months').startOf('month').format('MMM YYYY');
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/* 
				    SELECT cl.clientid,cl.organization,pr.projectno,pr.name,pr.projectid,cl.contactname,cl.email FROM client cl LEFT JOIN project pr ON pr.clientid = cl.clientid GROUP BY pr.projectno;

				    SELECT at.projectid FROM attendance at WHERE at.monthandyear =? GROUP BY at.monthandyear;
				*/
			});
			con.query(query, [LastMonth]).then(function (rows, fields) {
				var attendance = [];
				for (var j = 0; j < rows[1].length; j++) {
					attendance.push(rows[1][j].projectid);
				}
				resolve({
					"projects": rows[0],
					"attendance": attendance
				});
			}).catch(function (err) {
				errorDAL.errorlog('Error',"agreementDAL::getattendancependinglist",err.stack,JSON.stringify(query),"agreementDAL");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"agreementDAL::getattendancependinglist",err.stack,JSON.stringify('mysql error'),"agreementDAL");
			reject(err);
		});
	});
}

module.exports.getagreementfutureexpirylist = function () {
	return new app.promise(function (resolve, reject) {

		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
                  	SELECT
						ae.agreementid,
						ae.clientid,
						ai.projectid,
						ai.agreementinfoid,
						DATE_FORMAT(ae.fromdate,'%b %d %Y')AS fromdate,
						DATE_FORMAT(ae.todate,'%b %d %Y')AS todate,
						DATEDIFF(ae.todate,NOW()) AS diffdays,
						ae.servicecharge,
						c.organization AS client,
						p.projectno,
						p.name AS projectname,
						p.regionid, 
						lv6.description AS region,
						ae.optionaltype,
						ae.wagetypeid,
						lv.description AS 'wagetype',
						ae.agreementtypeid,
						lv1.description AS 'agreementtype',
						ae.agreementstatusid,
						lv2.description AS 'agreementstatus',
						ae.agtypeid,
						lv3.description AS 'agtype',
						ae.wageareaid,
						lv4.description AS 'wagearea',
						ae.wageyearid,
						lv5.description AS 'wageyear'
                        
                    FROM  agreement ae

                    INNER JOIN agreementinfo ai ON
                          ae.agreementid = ai.agreementid
                    AND ai.active = 1
                     
                    INNER JOIN client c ON
                          c.clientid = ae.clientid
                    AND c.active = 1

                    INNER JOIN project p ON
       	                  p.projectid = ai.projectid
                    AND p.active = 1
                    
                    INNER JOIN lookupvalue lv ON
                        lv.lkvalid = ae.wagetypeid
                    AND lv.active = 1

                    INNER JOIN lookupvalue lv1 ON
                        lv1.lkvalid = ae.agreementtypeid
                    AND lv1.active = 1

                    INNER JOIN lookupvalue lv2 ON
                        lv2.lkvalid = ae.agreementstatusid
                    AND lv2.active = 1

                    INNER JOIN lookupvalue lv3 ON
                        lv3.lkvalid = ae.agtypeid
                    AND lv3.active = 1

                    INNER JOIN lookupvalue lv4 ON
                        lv4.lkvalid =   ae.wageareaid
                    AND lv4.active = 1

                    INNER JOIN lookupvalue lv5 ON
                        lv5.lkvalid =   ae.wageyearid
                    AND lv5.active = 1
                     
                    INNER JOIN lookupvalue lv6 ON
                        lv6.lkvalid =   p.regionid
                    AND lv6.active = 1
                     
                    WHERE ae.todate >= CURDATE() AND ae.todate < CURDATE() + INTERVAL 90 DAY and ae.active = 1
                    ORDER BY DATE(ae.todate) ASC,p.projectno;
                         */
			});

			con.query(query).then(function (rows, fields) {
				var rowsReturned = rows.length;
				var result = [];
				if (rowsReturned > 0) {
					for (var i = 0; i < rowsReturned; i++) {
						var agreement = new agreementModel.agreementexpirylist(rows[i].agreementid, rows[i].clientid, rows[i].client, rows[i].projectid, rows[i].projectno, rows[i].projectname, rows[i].fromdate, rows[i].todate, rows[i].servicecharge, rows[i].wagetypeid, rows[i].wagetype, rows[i].wageyearid, rows[i].wageyear,
							rows[i].wageareaid, rows[i].wagearea, rows[i].agreementstatusid, rows[i].agreementstatus, rows[i].optionaltype, rows[i].agreementtypeid, rows[i].agreementtype, rows[i].agtypeid, rows[i].agtype, rows[i].region, rows[i].diffdays);
						result.push(agreement);
					}
				}
				resolve(result);
			}).catch(function (err) {
				errorDAL.errorlog('Error',"agreementDAL::getagreementfutureexpirylist",err.stack,JSON.stringify(query),"agreementDAL");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"agreementDAL::getagreementfutureexpirylist",err.stack,JSON.stringify('mysql error'),"agreementDAL");
			reject(err);
		});
	});
}


module.exports.getagreementfutureexpirythirtylist = function () {
	return new app.promise(function (resolve, reject) {

		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
                  SELECT
                            ae.agreementid,
                            ae.clientid,
                            ai.projectid,
                            ai.agreementinfoid,
                            DATE_FORMAT(ae.fromdate,'%b %d %Y')AS fromdate,
                            DATE_FORMAT(ae.todate,'%b %d %Y')AS todate,
                            ae.servicecharge,
                            c.organization AS client,
                            p.projectno,
                            p.name AS projectname,
                            p.regionid, 
                            lv6.description AS region,
                            ae.optionaltype,
                            ae.wagetypeid,
                            lv.description AS 'wagetype',
                            ae.agreementtypeid,
                 			lv1.description AS 'agreementtype',
                 	        ae.agreementstatusid,
                            lv2.description AS 'agreementstatus',
                            ae.agtypeid,
                            lv3.description AS 'agtype',
                            ae.wageareaid,
                            lv4.description AS 'wagearea',
                            ae.wageyearid,
                            lv5.description AS 'wageyear'
                            

                    FROM  agreement ae

                    INNER JOIN agreementinfo ai ON
                          ae.agreementid = ai.agreementid
                    AND ai.active = 1
                     
                    INNER JOIN client c ON
                          c.clientid = ae.clientid
                    AND c.active = 1

                    INNER JOIN project p ON
       	                  p.projectid = ai.projectid
                    AND p.active = 1
                    
                    INNER JOIN lookupvalue lv ON
                        lv.lkvalid = ae.wagetypeid
                    AND lv.active = 1

                    INNER JOIN lookupvalue lv1 ON
                        lv1.lkvalid = ae.agreementtypeid
                    AND lv1.active = 1

                    INNER JOIN lookupvalue lv2 ON
                        lv2.lkvalid = ae.agreementstatusid
                    AND lv2.active = 1

                    INNER JOIN lookupvalue lv3 ON
                        lv3.lkvalid = ae.agtypeid
                    AND lv3.active = 1

                    INNER JOIN lookupvalue lv4 ON
                        lv4.lkvalid =   ae.wageareaid
                    AND lv4.active = 1

                    INNER JOIN lookupvalue lv5 ON
                        lv5.lkvalid =   ae.wageyearid
                    AND lv5.active = 1
                     
                    INNER JOIN lookupvalue lv6 ON
                        lv6.lkvalid =   p.regionid
                    AND lv6.active = 1
                     
                    WHERE ae.todate >= CURDATE() AND ae.todate < CURDATE() + INTERVAL 30 DAY and ae.active = 1
                    ORDER BY DATE(ae.todate) ASC,p.projectno;
                         */
			});

			con.query(query).then(function (rows, fields) {
				var rowsReturned = rows.length;
				var result = [];
				if (rowsReturned > 0) {
					for (var i = 0; i < rowsReturned; i++) {
						var agreement = new agreementModel.agreementexpirylist(rows[i].agreementid, rows[i].clientid, rows[i].client, rows[i].projectid, rows[i].projectno, rows[i].projectname, rows[i].fromdate, rows[i].todate, rows[i].servicecharge, rows[i].wagetypeid, rows[i].wagetype, rows[i].wageyearid, rows[i].wageyear,
							rows[i].wageareaid, rows[i].wagearea, rows[i].agreementstatusid, rows[i].agreementstatus, rows[i].optionaltype, rows[i].agreementtypeid, rows[i].agreementtype, rows[i].agtypeid, rows[i].agtype, rows[i].region);
						result.push(agreement);
					}
				}
				resolve(result);
			}).catch(function (err) {
				errorDAL.errorlog('Error',"agreementDAL::getagreementfutureexpirythirtylist",err.stack,JSON.stringify(query),"agreementDAL");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"agreementDAL::getagreementfutureexpirythirtylist",err.stack,JSON.stringify('mysql error'),"agreementDAL");
			reject(err);
		});
	});
}


module.exports.getagreementfutureexpirylistbyregion = function (regionid) {
	return new app.promise(function (resolve, reject) {

		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
                  SELECT
                            ae.agreementid,
                            ae.clientid,
                            ai.projectid,
                            ai.agreementinfoid,
                            DATE_FORMAT(ae.fromdate,'%b %d %Y')AS fromdate,
							DATE_FORMAT(ae.todate,'%b %d %Y')AS todate,
							DATEDIFF(ae.todate,NOW()) AS diffdays,
                            ae.servicecharge,
                            c.organization AS client,
                            p.projectno,
                            p.name AS projectname,
                            p.regionid, 
                            lv6.description AS region,
                            ae.optionaltype,
                            ae.wagetypeid,
                            lv.description AS 'wagetype',
                            ae.agreementtypeid,
                 			lv1.description AS 'agreementtype',
                 	        ae.agreementstatusid,
                            lv2.description AS 'agreementstatus',
                            ae.agtypeid,
                            lv3.description AS 'agtype',
                            ae.wageareaid,
                            lv4.description AS 'wagearea',
                            ae.wageyearid,
                            lv5.description AS 'wageyear'
                            

                    FROM  agreement ae

                    INNER JOIN agreementinfo ai ON
                          ae.agreementid = ai.agreementid
                    AND ai.active = 1
                     
                    INNER JOIN client c ON
                          c.clientid = ae.clientid
                    AND c.active = 1

                    INNER JOIN project p ON
       	                  p.projectid = ai.projectid
                    AND p.active = 1
                    
                    INNER JOIN lookupvalue lv ON
                        lv.lkvalid = ae.wagetypeid
                    AND lv.active = 1

                    INNER JOIN lookupvalue lv1 ON
                        lv1.lkvalid = ae.agreementtypeid
                    AND lv1.active = 1

                    INNER JOIN lookupvalue lv2 ON
                        lv2.lkvalid = ae.agreementstatusid
                    AND lv2.active = 1

                    INNER JOIN lookupvalue lv3 ON
                        lv3.lkvalid = ae.agtypeid
                    AND lv3.active = 1

                    INNER JOIN lookupvalue lv4 ON
                        lv4.lkvalid =   ae.wageareaid
                    AND lv4.active = 1

                    INNER JOIN lookupvalue lv5 ON
                        lv5.lkvalid =   ae.wageyearid
                    AND lv5.active = 1
                     
                    INNER JOIN lookupvalue lv6 ON
                        lv6.lkvalid =   p.regionid
                    AND lv6.active = 1
                     
                    WHERE ae.todate >= CURDATE() AND ae.todate < CURDATE() + INTERVAL 90 DAY and ae.active = 1 AND p.regionid =?
                    ORDER BY DATE(ae.todate) ASC,p.projectno;
                         */
			});

			con.query(query, [regionid]).then(function (rows, fields) {
				var rowsReturned = rows.length;
				var result = [];
				if (rowsReturned > 0) {
					for (var i = 0; i < rowsReturned; i++) {
						var agreement = new agreementModel.agreementexpirylist(rows[i].agreementid, rows[i].clientid, rows[i].client, rows[i].projectid, rows[i].projectno, rows[i].projectname, rows[i].fromdate, rows[i].todate, rows[i].servicecharge, rows[i].wagetypeid, rows[i].wagetype, rows[i].wageyearid, rows[i].wageyear,
							rows[i].wageareaid, rows[i].wagearea, rows[i].agreementstatusid, rows[i].agreementstatus, rows[i].optionaltype, rows[i].agreementtypeid, rows[i].agreementtype, rows[i].agtypeid, rows[i].agtype, rows[i].region,rows[i].diffdays);
						result.push(agreement);
					}
				}
				resolve(result);
			}).catch(function (err) {
				errorDAL.errorlog('Error',"agreementDAL::getagreementfutureexpirylistbyregion",err.stack,JSON.stringify(query),"agreementDAL");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"agreementDAL::getagreementfutureexpirylistbyregion",err.stack,JSON.stringify('error'),"agreementDAL");
			reject(err);
		});
	});
}


module.exports.getagreementexpirylistbyregion = function (regionid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
                  SELECT
                            ae.agreementid,
                            ae.clientid,
                            ai.projectid,
                            ai.agreementinfoid,
                            DATE_FORMAT(ae.fromdate,'%b %d %Y')AS fromdate,
                            DATE_FORMAT(ae.todate,'%b %d %Y')AS todate,
                            ae.servicecharge,
                            c.organization AS client,
                            p.projectno,
                            p.name AS projectname,
                            p.regionid, 
                            lv6.description AS region,
                            ae.optionaltype,
                            ae.wagetypeid,
                            lv.description AS 'wagetype',
                            ae.agreementtypeid,
                 			lv1.description AS 'agreementtype',
                 	        ae.agreementstatusid,
                            lv2.description AS 'agreementstatus',
                            ae.agtypeid,
                            lv3.description AS 'agtype',
                            ae.wageareaid,
                            lv4.description AS 'wagearea',
                            ae.wageyearid,
                            lv5.description AS 'wageyear'
                            

                    FROM  agreement ae

                    INNER JOIN agreementinfo ai ON
                          ae.agreementid = ai.agreementid
                    AND ai.active = 1
                     
                    INNER JOIN client c ON
                          c.clientid = ae.clientid
                    AND c.active = 1

                    INNER JOIN project p ON
       	                  p.projectid = ai.projectid
                    AND p.active = 1
                    
                    INNER JOIN lookupvalue lv ON
                        lv.lkvalid = ae.wagetypeid
                    AND lv.active = 1

                    INNER JOIN lookupvalue lv1 ON
                        lv1.lkvalid = ae.agreementtypeid
                    AND lv1.active = 1

                    INNER JOIN lookupvalue lv2 ON
                        lv2.lkvalid = ae.agreementstatusid
                    AND lv2.active = 1

                    INNER JOIN lookupvalue lv3 ON
                        lv3.lkvalid = ae.agtypeid
                    AND lv3.active = 1

                    INNER JOIN lookupvalue lv4 ON
                        lv4.lkvalid =   ae.wageareaid
                    AND lv4.active = 1

                    INNER JOIN lookupvalue lv5 ON
                        lv5.lkvalid =   ae.wageyearid
                    AND lv5.active = 1
                     
                    INNER JOIN lookupvalue lv6 ON
                        lv6.lkvalid =   p.regionid
                    AND lv6.active = 1
                     
                    WHERE ae.todate < CURDATE() and ae.active = 1 AND p.regionid = ?
                    ORDER BY p.regionid
                         */
			});
			con.query(query, [regionid]).then(function (rows, fields) {
				var rowsReturned = rows.length;
				var result = [];
				if (rowsReturned > 0) {
					for (var i = 0; i < rowsReturned; i++) {
						var agreement = new agreementModel.agreementexpirylist(rows[i].agreementid, rows[i].clientid, rows[i].client, rows[i].projectid, rows[i].projectno, rows[i].projectname, rows[i].fromdate, rows[i].todate, rows[i].servicecharge, rows[i].wagetypeid, rows[i].wagetype, rows[i].wageyearid, rows[i].wageyear,
							rows[i].wageareaid, rows[i].wagearea, rows[i].agreementstatusid, rows[i].agreementstatus, rows[i].optionaltype, rows[i].agreementtypeid, rows[i].agreementtype, rows[i].agtypeid, rows[i].agtype, rows[i].region);
						result.push(agreement);
					}
				}
				resolve(result);
			}).catch(function (err) {
				errorDAL.errorlog('Error',"agreementDAL::getagreementexpirylistbyregion",err.stack,JSON.stringify(query),"agreementDAL");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"agreementDAL::getagreementexpirylistbyregion",err.stack,JSON.stringify('error'),"agreementDAL");
			reject(err);
		});
	});
}

module.exports.agreementrenew = function (fromdate, todate, agreementid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			con.query("UPDATE agreement SET fromdate=?, todate=? WHERE agreementid= ?", [fromdate, todate, agreementid]).then(function (rows, fields) {
				resolve({
					"agreementid": agreementid
				});
			}).catch(function (err) {
				errorDAL.errorlog('Error',"agreementDAL::agreementrenew",err.stack,JSON.stringify(agreementid),"agreementDAL");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"agreementDAL::agreementrenew",err.stack,JSON.stringify('error'),"agreementDAL");
			reject(err);
		});
	});
}


module.exports.getClientDetailsbyProjectid = function (projectid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
				SELECT
				    cl.clientid,
				    pr.projectid,
				    ai.agreementinfoid,
				    jm.jobmasterid,
				    jm.code AS jobmastercode,
				    jm.name AS jobmastername,
				    sum(aed.numberofvacancies) numberofvacancies,
				    lv.code,ae.agreementtypeid

				FROM `project` pr
				                    
				INNER JOIN client cl ON
				    cl.clientid = pr.clientid
				AND cl.active = 1
				                    
				INNER JOIN agreement ae ON
				        cl.clientid = ae.clientid
				AND ae.active = 1

				LEFT JOIN lookupvalue lv ON lv.lkvalid = ae.agreementtypeid AND lv.lkdmncode = 'AGREE'

				INNER JOIN agreementinfo ai ON
				        ae.agreementid = ai.agreementid
				AND ae.active = 1
				                    
				INNER JOIN agreementdetail aed ON
				        aed.agreementinfoid = ai.agreementinfoid
				AND aed.active = 1

				INNER JOIN jobmaster jm ON
				    jm.jobmasterid = aed.jobmasterid
				AND jm.active = 1

				WHERE ae.active = 1

				AND pr.projectid = ?

				GROUP BY  pr.projectid,
				        jm.jobmasterid,
				        jm.code,
				        pr.NAME;
				                 */
			});

			con.query(query, [projectid]).then(function (rows, fields) {
				// console.log('rows', rows);
				var rowsReturned = rows.length;
				var result = [];
				if (rowsReturned > 0) {
					if (rowsReturned > 0) {
						for (var index = 0; index < rowsReturned; index++) {
							result.push(new agreementModel.jobvacant(rows[index].projectid, rows[index].jobmasterid, rows[index].jobmastercode, rows[index].jobmastername, rows[index].numberofvacancies, rows[index].code, rows[index].agreementtypeid, rows[index].clientid))
						}
					}
				}
				resolve(result);
			}).catch(function (err) {
				errorDAL.errorlog('Error',"agreementDAL::getClientDetailsbyProjectid",err.stack,JSON.stringify(query),"agreementDAL");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"agreementDAL::getClientDetailsbyProjectid",err.stack,JSON.stringify('error'),"agreementDAL");
			reject(err);
		});
	});
}

module.exports.getClientidandProjectID = function (projectid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			con.query("SELECT clientid FROM project WHERE projectid = ?", [projectid]).then(function (rows, fields) {
				resolve({
					"clientid": rows[0].clientid
				});
			}).catch(function (err) {
				errorDAL.errorlog('Error',"agreementDAL::getClientidandProjectID",err.stack,JSON.stringify('error'),"agreementDAL");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"agreementDAL::getClientidandProjectID",err.stack,JSON.stringify('error'),"agreementDAL");
			reject(err);
		});
	});
}

module.exports.getProjectIDByClientID = function (clientid) {
	//console.log('clientid',clientid);
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			con.query("SELECT projectid FROM project WHERE clientid = ?", [clientid]).then(function (rows, fields) {
				var rowsReturned = rows.length;
				var result = [];
				if (rowsReturned > 0) {
					for (var index = 0; index < rowsReturned; index++) {
						result.push(rows[index].projectid)
					}
				}
				resolve(result);
			}).catch(function (err) {
				errorDAL.errorlog('Error',"agreementDAL::getProjectIDByClientID",err.stack,JSON.stringify('error'),"agreementDAL");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"agreementDAL::getProjectIDByClientID",err.stack,JSON.stringify('error'),"agreementDAL");
			reject(err);
		});
	});
}

module.exports.getPostedJobsbyCombinedProjectid = function (projectid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
				    SELECT jp.projectid,jm.jobmasterid,jm.code AS jobmastercode,
				        jm.name AS NAME,jd.numberofvacancies,jd.startdate 
				    FROM jobposting jp 

				    INNER JOIN jobpostingdetail jd ON jd.jobpostingid = jp.jobpostingid

				    INNER JOIN jobmaster jm ON jm.jobmasterid = jd.jobmasterid AND jm.active = 1

				    WHERE jd.`close` = 1 AND jp.projectid IN (?) 

				    GROUP BY  jp.projectid,jm.jobmasterid,jm.CODE,jm.name;
				*/
			});
			con.query(query, [projectid]).then(function (rows, fields) {
				var rowsReturned = rows.length;
				// console.log('rows..DAL', rows);
				var result = [];
				if (rowsReturned > 0) {
					if (rowsReturned > 0) {
						for (var index = 0; index < rowsReturned; index++) {
							result.push(new agreementModel.jobvacant(rows[index].projectid, rows[index].jobmasterid, rows[index].jobmastercode, rows[index].name, rows[index].numberofvacancies, rows[index].startdate))
						}
					}
				}
				resolve(result);
			}).catch(function (err) {
				errorDAL.errorlog('Error',"agreementDAL::getPostedJobsbyCombinedProjectid",err.stack,JSON.stringify(query),"agreementDAL");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"agreementDAL::getPostedJobsbyCombinedProjectid",err.stack,JSON.stringify('error'),"agreementDAL");
			reject(err);
		});
	});
}


module.exports.getProjectIDByClientID = function (clientid) {
	//console.log('clientid',clientid);
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			con.query("SELECT projectid FROM project WHERE clientid = ?", [clientid]).then(function (rows, fields) {
				var rowsReturned = rows.length;
				var result = [];
				if (rowsReturned > 0) {
					for (var index = 0; index < rowsReturned; index++) {
						result.push(rows[index].projectid)
					}
				}
				resolve(result);
			}).catch(function (err) { 
				errorDAL.errorlog('Error',"agreementDAL::getProjectIDByClientID",err.stack,JSON.stringify('query'),"agreementDAL");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"agreementDAL::getProjectIDByClientID",err.stack,JSON.stringify('query'),"agreementDAL");
			reject(err);
		});
	});
}


module.exports.checkAgreementDetails = function (agreementid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			con.query('SELECT *,count(agreementid) as agcount FROM agreement_ams WHERE agreementid = ? and active = 1;', [agreementid]).then(function (rows, fields) {
				// console.log('rows.agcount', rows);
				var agreement = new agreementModel.agreementamslist(rows[0].clientid, rows[0].fromdate, rows[0].todate, rows[0].servicecharge, rows[0].wagetypeid, rows[0].wageyearid, rows[0].wagecategoryid, rows[0].wageareaid, rows[0].agreementstatusid, rows[0].agreementtypeid, rows[0].agtypeid, rows[0].taxtype, rows[0].tax, rows[0].addendum,rows[0].agcount, rows[0].updatedfields);
				resolve(agreement);
			}).catch(function (err) {
				errorDAL.errorlog('Error',"agreementDAL::checkAgreementDetails",err.stack,JSON.stringify('query'),"agreementDAL");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"agreementDAL::checkAgreementDetails",err.stack,JSON.stringify('query'),"agreementDAL");
			reject(err);
		});
	});
}

module.exports.addAMSAgreement = function (agreement, agreementid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			// console.log('agreementid', agreementid);
			con.query('INSERT INTO agreement_ams SET ?', [agreement]).then(function (rows, fields) {
				resolve({
					"agreementid": agreementid
				})
			}).catch(function (err) {
				errorDAL.errorlog('Error',"agreementDAL::addAMSAgreement",err.stack,JSON.stringify('query'),"agreementDAL");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"agreementDAL::addAMSAgreement",err.stack,JSON.stringify('query'),"agreementDAL");
			reject(err);
		});
	});
}

module.exports.updateAMSAgreement = function (agreement, agreementid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			con.query('UPDATE agreement_ams SET ? WHERE agreementid= ?', [agreement, agreementid]).then(function (rows, fields) {
				resolve({
					"agreementid": agreementid
				})
			}).catch(function (err) {
				errorDAL.errorlog('Error',"agreementDAL::updateAMSAgreement",err.stack,JSON.stringify('query'),"agreementDAL");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"agreementDAL::updateAMSAgreement",err.stack,JSON.stringify('query'),"agreementDAL");
			reject(err);
		});
	});
} 

module.exports.UpdateAgreementStatus = function (status, agreementid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			con.query('UPDATE agreement SET amstatus = ? WHERE agreementid= ?', [status, agreementid]).then(function (rows, fields) {
				resolve({
					"agreementid": agreementid
				})
			}).catch(function (err) {
				errorDAL.errorlog('Error',"agreementDAL::UpdateAgreementStatus",err.stack,JSON.stringify('query'),"agreementDAL");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"agreementDAL::UpdateAgreementStatus",err.stack,JSON.stringify('query'),"agreementDAL");
			reject(err);
		});
	});
}
module.exports.UpdateAgreementAMStatus = function (status, agreementid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			con.query('UPDATE agreement SET amstatus= 1 WHERE agreementid= ?', [agreementid]).then(function (rows, fields) {
				resolve({
					"agreementid": agreementid
				})
			}).catch(function (err) {
				errorDAL.errorlog('Error',"agreementDAL::UpdateAgreementAMStatus",err.stack,JSON.stringify(agreementid),"agreementDAL");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"agreementDAL::UpdateAgreementAMStatus",err.stack,JSON.stringify('query'),"agreementDAL");
			reject(err);
		});
	});
}

module.exports.getamsagreement = function (agreementid, regionid) {
	return new app.promise(function (resolve, reject) {
		var jobmaster = [];
		// get all the jobs
		jobDal.getjobmaster(0).then(function (jm) {
			jobmaster = jm;

			mySqlConnection.connection().then(function (con) {
				var query = multiline.stripIndent(function () {
					/*
						SELECT
							ae.agreementtempid,
							ae.agreementid,
							ae.clientid,
							ai.projectid,
							ai.agreementinfoid,
							DATE_FORMAT( ae.fromdate,'%d %b %Y') AS fromdate,
							DATE_FORMAT( ae.todate,'%d %b %Y') AS todate,
							ae.servicecharge,
							ae.tax,
							ae.optionaltype,
							aed.numberofvacancies,
							aed.salary,
							aed.addendum as 'addendum',
							aed.agreementdetailid,
							c.organization,
							c.email,
							p.projectno,
							p.name AS projectname,
							jm.jobmasterid,
							jm.code,
							jm.name AS jobmastername,
							ae.wagetypeid,
							lv.description AS 'wagetype',
							ae.agreementtypeid,
							lv1.description AS 'agreementtype',
							ae.agreementstatusid,
							lv2.description AS 'agreementstatus',
							ae.agtypeid,
							lv3.description AS 'agtype',
							ae.wageareaid,
							lv4.description AS 'wagearea',
							ae.wageyearid,
							ae.wagecategoryid,
							ae.amstatus,
							ae.taxtype,
							lv5.description AS 'wageyear',
							ae.updatedfields,
							ae.addendumstatus,
							aed.amstatus AS adamstatus
						FROM
							`agreement_ams` ae

						INNER JOIN agreementinfo ai ON
								ae.agreementid = ai.agreementid
						AND ai.active = 1

						LEFT JOIN agreementdetail_ams aed ON
								aed.agreementinfoid = ai.agreementinfoid
						AND aed.active = 1
									
						INNER JOIN client c ON
								c.clientid = ae.clientid
						AND c.active = 1

						INNER JOIN project p ON
								p.projectid = ai.projectid
						AND p.active = 1

						LEFT JOIN jobmaster jm ON
								jm.jobmasterid = aed.jobmasterid
						AND jm.active = 1

						LEFT JOIN lookupvalue lv ON
								lv.lkvalid = ae.wagetypeid
						AND lv.active = 1

						LEFT JOIN lookupvalue lv1 ON
								lv1.lkvalid = ae.agreementtypeid
						AND lv1.active = 1

						LEFT JOIN lookupvalue lv2 ON
								lv2.lkvalid = ae.agreementstatusid
						AND lv2.active = 1

						LEFT JOIN lookupvalue lv3 ON
								lv3.lkvalid = ae.agtypeid
						AND lv3.active = 1

						LEFT JOIN lookupvalue lv4 ON
								lv4.lkvalid =   ae.wageareaid
						AND lv4.active = 1

						LEFT JOIN lookupvalue lv5 ON
								lv5.lkvalid =   ae.wageyearid
						AND lv5.active = 1
						
						WHERE ae.active = 1
						
						AND case ? when 0 then 1 = 1 else  ae.agreementid = ? end  
						AND case ? when 0 then 1 = 1 else  p.regionid = ? end
						ORDER BY p.projectno ASC;
             		*/
				});
				// console.log('agreementid',regionid,agreementid);
				con.query(query, [agreementid, agreementid, regionid, regionid]).then(function (rows, fields) {
					// console.log('rows343',rows);
					var rowsReturned = rows.length;
					var result = [];
					var projects = [];
					var addendums = [];
					var addendum = [];
					var jobs = [];
					if (rowsReturned > 0) {
						for (var index = 0; index < rowsReturned; index++) {
							var agreement = new agreementModel.getagreement(rows[index].agreementid, rows[index].clientid, rows[index].organization, rows[index].email, rows[index].fromdate, rows[index].todate, rows[index].servicecharge, rows[index].wagetypeid, rows[index].wagetype, rows[index].wageyearid, rows[index].wageyear, rows[index].wageareaid, rows[index].wagearea, rows[index].agreementstatusid, rows[index].agreementstatus, rows[index].optionaltype, rows[index].agreementtypeid, rows[index].agreementtype, rows[index].agtypeid, rows[index].agtype, rows[index].tax, rows[index].amstatus,projects, rows[index].taxtype, rows[index].wagecategoryid, rows[index].updatedfields,rows[index].addendumstatus,rows[index].adamstatus);
							// console.log('agreement', agreement);
							var projectdetail = new agreementModel.project(rows[index].projectid, rows[index].projectno, rows[index].projectname, rows[index].agreementinfoid);
							if (rows[index].addendum == 0) { // job
								jobs.push(new agreementModel.jobs(rows[index].agreementid, rows[index].jobmasterid, rows[index].code, rows[index].name, rows[index].numberofvacancies, rows[index].salary, rows[index].agreementdetailid,0));
							} else { //addendum
								addendum.push(new agreementModel.jobs(rows[index].agreementid, rows[index].jobmasterid, rows[index].code, rows[index].name, rows[index].numberofvacancies, rows[index].salary, rows[index].agreementdetailid,rows[index].addendum));
								if ((index + 1 == rowsReturned) || (rows[index].agreementid != rows[index + 1].agreementid) || (rows[index].addendum != rows[index + 1].addendum)) {
									addendums.push(addendum);
									addendum = [];
								}
							}
							if ((index + 1 == rowsReturned) || (rows[index].agreementinfoid != rows[index + 1].agreementinfoid)) {
								projectdetail.jobs = jobs;
								projectdetail.addendums = addendums;
								projects.push(projectdetail);
								jobs = [];
								addendums = [];
							}
							if ((index + 1 == rowsReturned) || (rows[index].agreementid != rows[index + 1].agreementid)) {
								agreement.projects = projects;
								result.push(agreement);
								projects = [];
							}
						}
					}
					// console.log('result0092303',JSON.stringify(result));
					resolve(result);
				}).catch(function (err) {
					errorDAL.errorlog('Error',"agreementDAL::getamsagreement",err.stack,JSON.stringify(query),"agreementDAL");
					reject(err);
				});
			}).catch(function (err) {
				errorDAL.errorlog('Error',"agreementDAL::getamsagreement",err.stack,JSON.stringify('mysql error'),"agreementDAL");
				reject(err);
			});
		});
	});
}

module.exports.getamsagreementjobs = function (agreementid, regionid, agreementinfoid) {
	// console.log('agreementid, regionid, agreementinfoid',agreementid, regionid, agreementinfoid);
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
					SELECT
						ae.agreementtempid,ae.agreementid,ae.clientid,ai.projectid,ai.agreementinfoid,aed.numberofvacancies,aed.salary,aed.addendum as 'addendum',jm.jobmasterid,
						jm.code,jm.name AS jobmastername,ae.wagetypeid,ae.agreementtypeid,
						ae.agreementstatusid,ae.agtypeid,ae.wageareaid,ae.wageyearid,
						ae.wagecategoryid,ae.addendumstatus,aed.amstatus AS adamstatus,aed.agreementdetailid
					FROM `agreement_ams` ae
					INNER JOIN agreementinfo ai ON ae.agreementid = ai.agreementid AND ai.active = 1
					LEFT JOIN agreementdetail_ams aed ON aed.agreementinfoid = ai.agreementinfoid AND aed.active = 1	
					INNER JOIN client c ON c.clientid = ae.clientid AND c.active = 1
					INNER JOIN project p ON p.projectid = ai.projectid AND p.active = 1
					LEFT JOIN jobmaster jm ON jm.jobmasterid = aed.jobmasterid AND jm.active = 1
					WHERE ae.active = 1 AND ae.agreementid = ? 
					AND case ? when 0 then 1 = 1 else  p.regionid = ? end
					AND ai.agreementinfoid = ? AND aed.addendum = 0
					ORDER BY p.projectno ASC;
				 */
			});
			con.query(query, [agreementid, regionid, regionid, agreementinfoid]).then(function (rows, fields) {
				// console.log('rows',rows);
				var rowsReturned = rows.length;
				var result = [];
				// console.log('rowsReturned',rowsReturned);
				if (rowsReturned > 0) {
					for (var index = 0; index < rowsReturned; index++) {
						var agreement = new agreementModel.getagreementjobs(rows[index].agreementtempid,rows[index].agreementid,rows[index].clientid,rows[index].projectid,rows[index].agreementinfoid,rows[index].numberofvacancies,rows[index].salary,rows[index].addendum,rows[index].jobmasterid,rows[index].code,rows[index].jobmastername,rows[index].wagetypeid,rows[index].agreementtypeid,rows[index].agreementstatusid,rows[index].agtypeid,rows[index].wageareaid,rows[index].wageyearid,rows[index].wagecategoryid,rows[index].addendumstatus,rows[index].amstatus,rows[index].agreementdetailid);
						result.push(agreement);
					}
				}
				resolve(result);
			}).catch(function (err) {
				errorDAL.errorlog('Error',"agreementDAL::getamsagreementjobs",err.stack,JSON.stringify(query),"agreementDAL");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"agreementDAL::getamsagreementjobs",err.stack,JSON.stringify('mysql error'),"agreementDAL");
			reject(err);
		});
	});
}

module.exports.getamsagreementaddendum = function (agreementid, regionid, agreementinfoid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
					SELECT
						ae.agreementtempid,ae.agreementid,ae.clientid,ai.projectid,ai.agreementinfoid,aed.numberofvacancies,aed.salary,aed.addendum as 'addendum',jm.jobmasterid,
						jm.code,jm.name AS jobmastername,ae.wagetypeid,ae.agreementtypeid,
						ae.agreementstatusid,ae.agtypeid,ae.wageareaid,ae.wageyearid,
						ae.wagecategoryid,ae.addendumstatus,aed.amstatus AS adamstatus,aed.agreementdetailid,aed.amstatusupdated
					FROM `agreement_ams` ae
					INNER JOIN agreementinfo ai ON ae.agreementid = ai.agreementid AND ai.active = 1
					LEFT JOIN agreementdetail_ams aed ON aed.agreementinfoid = ai.agreementinfoid AND aed.active = 1	
					INNER JOIN client c ON c.clientid = ae.clientid AND c.active = 1
					INNER JOIN project p ON p.projectid = ai.projectid AND p.active = 1
					LEFT JOIN jobmaster jm ON jm.jobmasterid = aed.jobmasterid AND jm.active = 1
					WHERE ae.active = 1 AND ae.agreementid = ? 
					AND case ? when 0 then 1 = 1 else  p.regionid = ? end
					AND ai.agreementinfoid = ? AND aed.addendum != 0
					ORDER BY p.projectno ASC;
				 */
			});
			con.query(query, [agreementid, regionid, regionid, agreementinfoid]).then(function (rows, fields) {
				// console.log('rows',rows);
				var rowsReturned = rows.length;
				var result = [];
				// console.log('rowsReturned',rowsReturned);
				if (rowsReturned > 0) {
					for (var index = 0; index < rowsReturned; index++) {
						var agreement = new agreementModel.getagreementjobs(rows[index].agreementtempid,rows[index].agreementid,rows[index].clientid,rows[index].projectid,rows[index].agreementinfoid,rows[index].numberofvacancies,rows[index].salary,rows[index].addendum,rows[index].jobmasterid,rows[index].code,rows[index].jobmastername,rows[index].wagetypeid,rows[index].agreementtypeid,rows[index].agreementstatusid,rows[index].agtypeid,rows[index].wageareaid,rows[index].wageyearid,rows[index].wagecategoryid,rows[index].addendumstatus,rows[index].amstatus,rows[index].agreementdetailid,rows[index].amstatusupdated);
						result.push(agreement);
					}
				}
				resolve(result);
			}).catch(function (err) {
				errorDAL.errorlog('Error',"agreementDAL::getamsagreementaddendum",err.stack,JSON.stringify(agreementid, regionid, agreementinfoid),"agreementDAL");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"agreementDAL::getamsagreementaddendum",err.stack,JSON.stringify('mysql error'),"agreementDAL");
			reject(err);
		});
	});
}

module.exports.saveagreementprint = function (agreement, agreementid, agtype) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			con.query('INSERT INTO agreement_draft (agreementid,agvalue,agtype) VALUES (?,?,?)',[agreementid, agreement,agtype]).then(function (rows, fields) {
				con.query('SELECT clientid FROM agreement WHERE agreementid = ?',[agreementid]).then(function (rows1, fields) {
					resolve({
						"clientid": rows1[0].clientid
					})
				}).catch(function (err) {
					errorDAL.errorlog('Error',"agreementDAL::saveagreementprint",err.stack,JSON.stringify('agreement table error'),"agreementDAL");
					reject(err);
				});
			}).catch(function (err) {
				errorDAL.errorlog('Error',"agreementDAL::saveagreementprint",err.stack,JSON.stringify('agreement_draft table error'),"agreementDAL");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"agreementDAL::saveagreementprint",err.stack,JSON.stringify('mysql error'),"agreementDAL");
			reject(err);
		});
	});
}

module.exports.getClientDetailsByClientID = function (clientid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			con.query('SELECT clientid,email FROM client WHERE clientid = ?',[clientid]).then(function (rows1, fields) {
				resolve(rows1);
			}).catch(function (err) {
				errorDAL.errorlog('Error',"agreementDAL::getClientDetailsByClientID",err.stack,JSON.stringify('mysql error'),"agreementDAL");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"agreementDAL::getClientDetailsByClientID",err.stack,JSON.stringify('mysql error'),"agreementDAL");
			reject(err);
		});
	});
}

module.exports.getAMSAgreementReject = function (agreementid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
					UPDATE agreement SET amstatus = 0 WHERE agreementid = ?;
					UPDATE agreement_ams SET amstatus = 2 WHERE agreementid = ?;
            	*/
			});
			con.query(query, [agreementid, agreementid]).then(function (rows, fields) {
				resolve(rows);
			}).catch(function (err) {
				errorDAL.errorlog('Error',"agreementDAL::getAMSAgreementReject",err.stack,JSON.stringify(query),"agreementDAL");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"agreementDAL::getAMSAgreementReject",err.stack,JSON.stringify('mysql error'),"agreementDAL");
			reject(err);
		});
	});
}

