var app = require('./../app');
var mySqlConnection = require('./MySqlHelper');
var multiline = require('multiline');
var clientModel = require('./../Model/client');
var moment = require('moment');
var _this = this;
var _ = require('underscore');
var errorDAL = require('./../DAL/errorDAL');

module.exports.createclient = function (client) {
	// console.log('client', client);
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			con.query('INSERT INTO client SET ?', client).then(function (rows, fields) {
				var clientid = rows.insertId;
				client.clientid = clientid;
				con.query('INSERT INTO client_ams SET ?;', client).then(function (rows, fields) {
					resolve({
						"clientid": clientid
					})
				}).catch(function (err) {
					errorDAL.errorlog('Error',"clientDAL::createclient",err.stack,JSON.stringify(client),"createclient");
					reject(err);
				});
			}).catch(function (err) {
				errorDAL.errorlog('Error',"clientDAL::createclient",err.stack,JSON.stringify(client),"createclient");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::createclient",err.stack,JSON.stringify(client),"createclient");
			reject(err);
		});
	});
}

module.exports.getprojectInvoiceList = function (clientid, types) {
	var LastMonth = moment().subtract(0, 'months').startOf('month').format('YYYY-MM-DD');
	if (types == 1) {
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
					        inv.paidamount,
					        DATE_FORMAT(inv.createdttm,'%d-%M-%Y') AS createdate,
					        p.projectno,
					        p.name
					    FROM invoice inv
					    INNER JOIN project p ON
					        p.projectid=inv.projectid AND p.clientid = inv.clientid AND p.active=1
					    WHERE inv.clientid = ? and inv.active= 1 AND inv.monthandyear = ?
					*/
				});
				con.query(query, [clientid, types, LastMonth]).then(function (rows, fields) {
					resolve(rows);
				}).catch(function (err) {
					errorDAL.errorlog('Error',"clientDAL::getprojectInvoiceList",err.stack,JSON.stringify(types),"getprojectInvoiceList");
					reject(err);
				});
			}).catch(function (err) {
				errorDAL.errorlog('Error',"clientDAL::getprojectInvoiceList",err.stack,JSON.stringify(types),"getprojectInvoiceList");
				reject(err);
			});
		});
	} else {
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
					        inv.paidamount,
					        DATE_FORMAT(inv.createdttm,'%d-%M-%Y') AS createdate,
					        p.projectno,
					        p.name
					    FROM invoice inv
					    INNER JOIN project p ON
					        p.projectid=inv.projectid AND p.clientid = inv.clientid AND p.active=1
					    WHERE inv.clientid = ? and inv.active= 1 AND inv.invoicestatus IN (1,2)
					*/
				});
				con.query(query, [clientid, types]).then(function (rows, fields) {
					resolve(rows);
				}).catch(function (err) {
					errorDAL.errorlog('Error',"clientDAL::getprojectInvoiceList",err.stack,JSON.stringify(types),"getprojectInvoiceList");
					reject(err);
				});
			}).catch(function (err) {
				errorDAL.errorlog('Error',"clientDAL::getprojectInvoiceList",err.stack,JSON.stringify(types),"getprojectInvoiceList");
				reject(err);
			});
		});
	}
}

module.exports.getInvoicesCount = function (clientid) {
	var LastMonth = moment().subtract(0, 'months').startOf('month').format('YYYY-MM-DD');
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			con.query('SELECT COUNT(*) AS totalinv FROM invoice WHERE active= 1 AND invoicestatus=1 AND clientid=? AND monthandyear = ?', [clientid, LastMonth]).then(function (rows, fields) {
				resolve(rows);
			}).catch(function (err) {
				errorDAL.errorlog('Error',"clientDAL::getInvoicesCount",err.stack,JSON.stringify(clientid),"getInvoicesCount");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::getInvoicesCount",err.stack,JSON.stringify(clientid),"getInvoicesCount");
			reject(err);
		});
	});
}

module.exports.ApproveInvoice = function (status, invoiceid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			if (invoiceid) {
				if (status == 3) {
					var query = {
						invoicestatus: status,
						active: 0,
					};
				}
				if (status == 2) {
					var query = {
						invoicestatus: status,
					};
				}
				if (status == 4) {
					var query = {
						invoicestatus: status,
					};
				}
				// console.log('query', query);
				con.query('UPDATE invoice SET ? WHERE invoiceid= ?', [query, invoiceid]).then(function (rows, fields) {
					resolve("success");
				}).catch(function (err) {
					errorDAL.errorlog('Error',"clientDAL::ApproveInvoice",err.stack,invoiceid,"ApproveInvoice");
					reject(err);
				});
			} else {
				errorDAL.errorlog('Error',"clientDAL::ApproveInvoice",err.stack,invoiceid,"ApproveInvoice");
				reject("Unable Approve Client")
			}
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::ApproveInvoice",err.stack,invoiceid,"ApproveInvoice");
			reject(err);
		});
	});
}

module.exports.AddInvoiceUTRNo = function (utrno, paidamount, invoiceid, alreadypaidamount, oldpaymentutrno) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			if (invoiceid) {
				var utrnumber = oldpaymentutrno + ',' + utrno;
				var totalpaidamount = parseInt(paidamount) + parseInt(alreadypaidamount);
				var query = {
					paymentutrno: utrnumber,
					paidamount: totalpaidamount
				};
				con.query('UPDATE invoice SET ? WHERE invoiceid= ?', [query, invoiceid]).then(function (rows, fields) {
					resolve("success");
				}).catch(function (err) {
					errorDAL.errorlog('Error',"clientDAL::AddInvoiceUTRNo",err.stack,JSON.stringify(utrno, paidamount, invoiceid, alreadypaidamount, oldpaymentutrno),"AddInvoiceUTRNo");
					reject(err);
				});
			} else {
				errorDAL.errorlog('Error',"clientDAL::AddInvoiceUTRNo",err.stack,JSON.stringify(utrno, paidamount, invoiceid, alreadypaidamount, oldpaymentutrno),"AddInvoiceUTRNo");
				reject("Unable Approve Client")
			}
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::AddInvoiceUTRNo",err.stack,JSON.stringify(utrno, paidamount, invoiceid, alreadypaidamount, oldpaymentutrno),"AddInvoiceUTRNo");
			reject(err);
		});
	});
}

module.exports.updateclientstatus = function (clientid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			con.query('UPDATE client SET active = ? WHERE clientid= ?', [0, clientid]).then(function (rows, fields) {
				resolve({
					"clientid": clientid
				})
			}).catch(function (err) {
				errorDAL.errorlog('Error',"clientDAL::updateclientstatus",err.stack,JSON.stringify(clientid),"updateclientstatus");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::updateclientstatus",err.stack,JSON.stringify(clientid),"updateclientstatus");
			reject(err);
		});
	});
}

module.exports.getclient = function (clientid, regionid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
					SELECT
						c.clientid,
						c.organization,
						c.contactname,
						c.image,
						c.email,
						c.mobile,
						c.password,
						c.addressline1,
						c.addressline2,
						c.addressline3,
						c.phone,
						c.gstno,
						c.tanno,
						c.gsttanno,
						c.panno,
						c.department,
						c.departmenttypeid,
						lv6.description AS 'departmenttype',
						c.pincode,
						c.districtid,
						c.regionid,
						lv.description AS 'district',
						c.talukid,
						(SELECT description FROM lookupvalue lv1 WHERE lv1.lkvalid = c.talukid GROUP BY lv1.lkvalid) AS 'taluk',
						c.stateid,
						lv2.description AS 'state',
						c.countryid,
						lv3.description AS 'country',
						c.countryid,
						lv4.description AS 'dept',
						c.deptid,
						lv5.description AS 'approval',
						c.approvalid,
						c.active,
						pr.projectno,
						pr.name AS 'projectname',
						pr.projectid,
						c.amstatus          
						
					FROM client c

					INNER JOIN lookupvalue lv ON
						lv.lkvalid = c.districtid
					AND lv.active = 1

					INNER JOIN lookupvalue lv2 ON
						lv2.lkvalid = c.stateid
					AND lv2.active = 1

					INNER JOIN lookupvalue lv3 ON
						lv3.lkvalid = c.countryid
					AND lv3.active = 1

					INNER JOIN lookupvalue lv4 ON
						lv4.lkvalid = c.deptid
					AND lv4.active = 1

					INNER JOIN lookupvalue lv5 ON
						lv5.lkvalid = c.approvalid
					AND lv5.active = 1 AND lv5.code != 'REJECT' AND lv5.code != 'PEND'

					INNER JOIN lookupvalue lv6 ON
						lv6.lkvalid = c.departmenttypeid
					AND lv6.active = 1
					
					LEFT JOIN project pr ON
						pr.clientid = c.clientid
					AND pr.active = 1

					WHERE c.active =1
					AND case ? when 0 then 1 = 1 else  c.clientid = ? end
					AND case ? when 0 then 1 = 1 else  pr.regionid = ? end
					ORDER BY  pr.projectno ASC;
            	*/
			});
			con.query(query, [clientid, clientid, regionid, regionid]).then(function (rows, fields) {
				var rowsReturned = rows.length;
				var result = [];
				if (rowsReturned > 0) {
					for (var i = 0; i < rowsReturned; i++) {
						var client = new clientModel.getclient(rows[i].clientid, rows[i].organization, rows[i].contactname, rows[i].image, rows[i].email,
							rows[i].mobile, rows[i].phone, rows[i].gstno, rows[i].tanno, rows[i].panno, rows[i].password, rows[i].addressline1, rows[i].addressline2,
							rows[i].addressline3, rows[i].pincode, rows[i].districtid, rows[i].district, rows[i].talukid, rows[i].taluk, rows[i].stateid, rows[i].state,
							rows[i].countryid, rows[i].country, rows[i].departmenttypeid, rows[i].departmenttype, rows[i].department, rows[i].deptid,
							rows[i].dept, rows[i].approvalid, rows[i].approval, rows[i].active, rows[i].projectno, rows[i].projectname, rows[i].regionid, rows[i].amstatus, rows[i].gsttanno,'' ,rows[i].projectid);
						//console.log('client', client);
						result.push(client);
					}
				}
				resolve(result);
			}).catch(function (err) {
				errorDAL.errorlog('Error',"clientDAL::getclient",err.stack,JSON.stringify(clientid),"getclient");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::getclient",err.stack,JSON.stringify(clientid),"getclient");
			reject(err);
		});
	});
}

module.exports.getamsclient = function (clientid, regionid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
					SELECT
						c.clientid,
						c.organization,
						c.contactname,
						c.image,
						c.email,
						c.mobile,
						c.password,
						c.addressline1,
						c.addressline2,
						c.addressline3,
						c.phone,
						c.gstno,
						c.tanno,
						c.gsttanno,
						c.panno,
						c.department,
						c.departmenttypeid,
						lv6.description AS 'departmenttype',
						c.pincode,
						c.districtid,
						c.regionid,
						lv.description AS 'district',
						c.talukid,
						(SELECT description FROM lookupvalue lv1 WHERE lv1.lkvalid = c.talukid GROUP BY lv1.lkvalid) AS 'taluk',
						c.stateid,
						lv2.description AS 'state',
						c.countryid,
						lv3.description AS 'country',
						c.countryid,
						lv4.description AS 'dept',
						c.deptid,
						lv5.description AS 'approval',
						c.approvalid,
						c.active,
						pr.projectno,
						pr.name AS 'projectname',
						pr.projectid,
						c.amstatus,
						c.updatedfields        
						
					FROM client_ams c

					INNER JOIN lookupvalue lv ON
						lv.lkvalid = c.districtid
					AND lv.active = 1

					INNER JOIN lookupvalue lv2 ON
						lv2.lkvalid = c.stateid
					AND lv2.active = 1

					INNER JOIN lookupvalue lv3 ON
						lv3.lkvalid = c.countryid
					AND lv3.active = 1

					INNER JOIN lookupvalue lv4 ON
						lv4.lkvalid = c.deptid
					AND lv4.active = 1

					INNER JOIN lookupvalue lv5 ON
						lv5.lkvalid = c.approvalid
					AND lv5.active = 1 AND lv5.code != 'REJECT' AND lv5.code != 'PEND'

					INNER JOIN lookupvalue lv6 ON
						lv6.lkvalid = c.departmenttypeid
					AND lv6.active = 1
					
					LEFT JOIN project pr ON
						pr.clientid = c.clientid
					AND pr.active = 1

					WHERE c.active =1
					AND case ? when 0 then 1 = 1 else  c.clientid = ? end
					AND case ? when 0 then 1 = 1 else  pr.regionid = ? end
					ORDER BY pr.projectno ASC;
            	*/
			});
			con.query(query, [clientid, clientid, regionid, regionid]).then(function (rows, fields) {
				var rowsReturned = rows.length;
				var result = [];
				if (rowsReturned > 0) {
					for (var i = 0; i < rowsReturned; i++) {
						var client = new clientModel.getclient(rows[i].clientid, rows[i].organization, rows[i].contactname, rows[i].image, rows[i].email,
							rows[i].mobile, rows[i].phone, rows[i].gstno, rows[i].tanno, rows[i].panno, rows[i].password, rows[i].addressline1, rows[i].addressline2,
							rows[i].addressline3, rows[i].pincode, rows[i].districtid, rows[i].district, rows[i].talukid, rows[i].taluk, rows[i].stateid, rows[i].state,
							rows[i].countryid, rows[i].country, rows[i].departmenttypeid, rows[i].departmenttype, rows[i].department, rows[i].deptid,
							rows[i].dept, rows[i].approvalid, rows[i].approval, rows[i].active, rows[i].projectno, rows[i].projectname, rows[i].regionid, rows[i].amstatus, rows[i].gsttanno,rows[i].updatedfields,rows[i].projectid);
						//console.log('client', client);
						result.push(client);
					}
				}
				resolve(result);
			}).catch(function (err) {
				errorDAL.errorlog('Error',"clientDAL::getamsclient",err.stack,JSON.stringify(clientid),"getamsclient");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::getamsclient",err.stack,JSON.stringify(clientid),"getamsclient");
			reject(err);
		});
	});
}


module.exports.createproject = function (project) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			con.query('INSERT INTO project SET ?;', project).then(function (rows, fields) {
				var projectid = rows.insertId;
				project.projectid = projectid;
				con.query('INSERT INTO project_ams SET ?;', project).then(function (rows, fields) {
					resolve({
						"projectid": projectid
					})
				}).catch(function (err) {
					errorDAL.errorlog('Error',"clientDAL::createproject",err.stack,JSON.stringify(project),"createproject");
					reject(err);
				});
			}).catch(function (err) {
				errorDAL.errorlog('Error',"clientDAL::createproject",err.stack,JSON.stringify(project),"createproject");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::createproject",err.stack,JSON.stringify(project),"createproject");
			reject(err);
		});
	});
}

module.exports.CheckProject = function (project, projectid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			con.query('SELECT *,COUNT(projectid) AS procount FROM project_ams WHERE projectid= ? and active = 1', [projectid]).then(function (rows, fields) {
				var projects = new clientModel.projectamslist(rows[0].clientid, rows[0].projectno, rows[0].name, rows[0].districtid, rows[0].regionid, rows[0].statusid, rows[0].designation, rows[0].addressline1, rows[0].addressline2, rows[0].addressline3, rows[0].pincode, rows[0].changedby, rows[0].talukid, rows[0].procount, rows[0].categoryid, rows[0].subcategoryid, rows[0].updatedfields);
				resolve(projects);
			}).catch(function (err) {
				errorDAL.errorlog('Error',"clientDAL::CheckProject",err.stack,JSON.stringify(projectid),"CheckProject");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::CheckProject",err.stack,JSON.stringify(projectid),"CheckProject");
			reject(err);
		});
	});
} 

module.exports.updateproject = function (project, projectid) {

	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) { 
			con.query('UPDATE project SET ? WHERE projectid= ?;UPDATE project_ams SET ? WHERE projectid= ?', [project, projectid, project, projectid]).then(function (rows, fields) {
				resolve({
					"projectid": projectid
				})
			}).catch(function (err) {
				errorDAL.errorlog('Error',"clientDAL::updateproject",err.stack,JSON.stringify(projectid),"updateproject");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::updateproject",err.stack,JSON.stringify(projectid),"updateproject");
			reject(err);
		});
	});
} 

module.exports.addAMSproject = function (project, projectid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			console.log('project', project);
			con.query('INSERT INTO project_ams SET ?', [project]).then(function (rows, fields) {
				resolve({
					"projectid": projectid
				})
			}).catch(function (err) {
				errorDAL.errorlog('Error',"clientDAL::addAMSproject",err.stack,JSON.stringify(project),"addAMSproject");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::addAMSproject",err.stack,JSON.stringify(project),"addAMSproject");
			reject(err);
		});
	});
}
module.exports.updateAMSproject = function (project, projectid) {
	return new app.promise(function (resolve, reject) {
		//console.log('project', project);
		mySqlConnection.connection().then(function (con) {
			con.query('UPDATE project_ams SET ? WHERE projectid= ?', [project, projectid]).then(function (rows, fields) {
				resolve({
					"projectid": projectid
				})
			}).catch(function (err) {
				errorDAL.errorlog('Error',"clientDAL::updateAMSproject",err.stack,JSON.stringify(project),"updateAMSproject");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::updateAMSproject",err.stack,JSON.stringify(project),"updateAMSproject");
			reject(err);
		});
	});
}

module.exports.updateprojectstatus = function (projectid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			con.query('UPDATE project SET active= ? WHERE projectid= ?', [0, projectid]).then(function (rows, fields) {
				resolve({
					"projectid": projectid
				})
			}).catch(function (err) {
				errorDAL.errorlog('Error',"clientDAL::updateprojectstatus",err.stack,JSON.stringify(projectid),"updateprojectstatus");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::updateprojectstatus",err.stack,JSON.stringify(projectid),"updateprojectstatus");
			reject(err);
		});
	});
} 

module.exports.UpdateProjectAMStatus = function (projectid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			con.query('UPDATE project SET amstatus= 1 WHERE projectid= ?', [projectid]).then(function (rows, fields) {
				resolve({
					"projectid": projectid
				})
			}).catch(function (err) {
				errorDAL.errorlog('Error',"clientDAL::UpdateProjectAMStatus",err.stack,JSON.stringify(projectid),"UpdateProjectAMStatus");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::UpdateProjectAMStatus",err.stack,JSON.stringify(projectid),"UpdateProjectAMStatus");
			reject(err);
		});
	});
} 

module.exports.gettotalprojects = function () {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
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
				resolve({
					"numberofprojects": rows[0][0].numberofprojects,
					"totalactiveprojects": rows[1][0].activeprojects
				})
			}).catch(function (err) {
				errorDAL.errorlog('Error',"clientDAL::gettotalprojects",err.stack,'MYSQL Error',"gettotalprojects");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::gettotalprojects",err.stack,'MYSQL Error',"gettotalprojects");
			reject(err);
		});
	});
}

module.exports.getAMSproject = function (regionid, projectid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
                    SELECT
                        p.projectid,
                        p.projecttempid,
                        p.clientid,
                        cl.organization AS client,
                        cl.image AS image,
                        cl.approvalid,
                        p.projectno,
                        p.name,
						p.districtid,
						p.talukid,
                        lv.description AS 'district',
                        p.regionid,
                        lv1.description AS 'region',
                        p.designation,
                        p.addressline1,
                        p.addressline2,
                        p.addressline3,
                        p.pincode,
                        p.statusid,
                        lv2.description AS 'projectstatus',
						p.active,
						p.amstatus,
						p.updatedfields,
						p.categoryid,
						p.subcategoryid

                    FROM project_ams p

                    INNER JOIN lookupvalue lv ON
                        lv.lkvalid = p.districtid
                    AND lv.active = 1

                    INNER JOIN lookupvalue lv1 ON
                        lv1.lkvalid = p.regionid
                    AND lv1.active = 1

                    INNER JOIN lookupvalue lv2 ON
                        lv2.lkvalid = p.statusid
                    AND lv2.active = 1

                    INNER JOIN client cl ON
                        cl.clientid = p.clientid
                    AND cl.active = 1

                    INNER JOIN lookupvalue lv3 ON
                        lv3.lkvalid = cl.approvalid AND lv3.code != 'REJECT'
					AND lv3.active = 1
					
					WHERE p.active = 1 AND case ? when 0 then 1 = 1 else  p.projectid = ? end

					AND case ? when 0 then 1 = 1 else  p.regionid = ? end
					
					ORDER BY p.projectno ASC;
            	*/
			});
			con.query(query, [projectid, projectid, regionid, regionid]).then(function (rows, fields) {
				var rowsReturned = rows.length;
				var result = [];
				if (rowsReturned > 0) {
					for (var i = 0; i < rowsReturned; i++) {
						var project = new clientModel.getAMSprojectDetails(rows[i].projecttempid, rows[i].projectid, rows[i].clientid, rows[i].projectno, rows[i].name, rows[i].districtid, rows[i].district, rows[i].regionid, rows[i].region, rows[i].statusid, rows[i].projectstatus, rows[i].designation, rows[i].addressline1, rows[i].addressline2, rows[i].addressline3, rows[i].pincode, rows[i].active, rows[i].client, rows[i].image, rows[i].amstatus, rows[i].talukid, rows[i].updatedfields, rows[i].categoryid,rows[i].subcategoryid);
						result.push(project);
					}
				}
				resolve(result);
			}).catch(function (err) {
				errorDAL.errorlog('Error',"clientDAL::getAMSproject",err.stack,JSON.stringify(projectid),"getAMSproject");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::getAMSproject",err.stack,JSON.stringify(projectid),"getAMSproject");
			reject(err);
		});
	});
}

module.exports.getproject = function (projectid, regionid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
                    SELECT
                        p.projectid,
                        p.clientid,
                        cl.organization AS client,
                        cl.image AS image,
                        cl.approvalid,
                        p.projectno,
                        p.name,
						p.districtid,
						p.talukid,
                        lv.description AS 'district',
                        p.regionid,
                        lv1.description AS 'region',
                        p.designation,
                        p.addressline1,
                        p.addressline2,
                        p.addressline3,
                        p.pincode,
                        p.statusid,
                        lv2.description AS 'projectstatus',
                        p.active,
						p.amstatus,
						p.categoryid,
						p.subcategoryid,
						p.tallyname,
						p.claimaddressline1,
						p.claimaddressline2,
						p.claimaddressline3,
						p.claimpincode, 
						p.addresstatus,
						p.ismainproject,
						p.claimprojectnumber,
						p.claimprojectname

                    FROM project p

                    INNER JOIN lookupvalue lv ON
                        lv.lkvalid = p.districtid
                    AND lv.active = 1

                    INNER JOIN lookupvalue lv1 ON
                        lv1.lkvalid = p.regionid
                    AND lv1.active = 1

                    INNER JOIN lookupvalue lv2 ON
                        lv2.lkvalid = p.statusid
                    AND lv2.active = 1

                    INNER JOIN client cl ON
                        cl.clientid = p.clientid
                    AND cl.active = 1

                    INNER JOIN lookupvalue lv3 ON
                        lv3.lkvalid = cl.approvalid AND lv3.code != 'REJECT'
                    AND lv3.active = 1

                    WHERE p.active = 1

                    AND case ? when 0 then 1 = 1 else  p.projectid = ? end

					AND case ? when 0 then 1 = 1 else  p.regionid = ? end
					
					ORDER BY p.projectno ASC;
            	*/
			});
			con.query(query, [projectid, projectid, regionid, regionid]).then(function (rows, fields) {
				var rowsReturned = rows.length;
				var result = [];
				if (rowsReturned > 0) {
					for (var i = 0; i < rowsReturned; i++) {
						var project = new clientModel.getproject(rows[i].projectid, rows[i].clientid, rows[i].projectno, rows[i].name, rows[i].districtid, rows[i].district, rows[i].regionid, rows[i].region, rows[i].statusid, rows[i].projectstatus, rows[i].designation, rows[i].addressline1, rows[i].addressline2, rows[i].addressline3, rows[i].pincode, rows[i].active, rows[i].client, rows[i].image, rows[i].amstatus, rows[i].talukid, rows[i].categoryid, rows[i].subcategoryid,rows[i].tallyname,rows[i].claimaddressline1,rows[i].claimaddressline2,rows[i].claimaddressline3,rows[i].claimpincode,rows[i].addresstatus,rows[i].ismainproject,rows[i].claimprojectnumber,rows[i].claimprojectname);
						result.push(project);
					}
				}
				resolve(result);
			}).catch(function (err) { 
				errorDAL.errorlog('Error',"clientDAL::getproject",err.stack,JSON.stringify(projectid),"getproject");
				reject(err);
			});
		}).catch(function (err) { 
			errorDAL.errorlog('Error',"clientDAL::getproject",err.stack,JSON.stringify(projectid),"getproject");
			reject(err);
		});
	});
}

module.exports.getprojectAMS = function (projectid, regionid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
                    SELECT
                        p.projectid,
                        p.clientid,
                        cl.organization AS client,
                        cl.image AS image,
                        cl.approvalid,
                        p.projectno,
                        p.name,
                        p.districtid,
                        lv.description AS 'district',
                        p.regionid,
                        lv1.description AS 'region',
                        p.designation,
                        p.addressline1,
                        p.addressline2,
                        p.addressline3,
                        p.pincode,
                        p.statusid,
                        lv2.description AS 'projectstatus',
                        p.active
                    FROM project_ams p

                    INNER JOIN lookupvalue lv ON
                        lv.lkvalid = p.districtid
                    AND lv.active = 1

                    INNER JOIN lookupvalue lv1 ON
                        lv1.lkvalid = p.regionid
                    AND lv1.active = 1

                   INNER JOIN lookupvalue lv2 ON
                        lv2.lkvalid = p.statusid
                    AND lv2.active = 1

                    INNER JOIN client cl ON
                        cl.clientid = p.clientid
                    AND cl.active = 1

                    INNER JOIN lookupvalue lv3 ON
                        lv3.lkvalid = cl.approvalid AND lv3.code != 'REJECT'
                    AND lv3.active = 1

                    WHERE p.active = 1

                    AND case ? when 0 then 1 = 1 else  p.projectid = ? end

					AND case ? when 0 then 1 = 1 else  p.regionid = ? end

					ORDER BY p.projectno ASC;
            	*/
			});
			con.query(query, [projectid, projectid, regionid, regionid]).then(function (rows, fields) {
				var rowsReturned = rows.length;
				var result = [];
				if (rowsReturned > 0) {
					for (var i = 0; i < rowsReturned; i++) {
						var project = new clientModel.getproject(rows[i].projectid, rows[i].clientid, rows[i].projectno, rows[i].name, rows[i].districtid, rows[i].district, rows[i].regionid, rows[i].region, rows[i].statusid, rows[i].projectstatus, rows[i].designation, rows[i].addressline1, rows[i].addressline2, rows[i].addressline3, rows[i].pincode, rows[i].active, rows[i].client, rows[i].image, rows[i].amstatus);
						result.push(project);
					}
				}
				resolve(result);
			}).catch(function (err) { 
				errorDAL.errorlog('Error',"clientDAL::getprojectAMS",err.stack,JSON.stringify(projectid),"getprojectAMS");
				reject(err);
			});
		}).catch(function (err) { 
			errorDAL.errorlog('Error',"clientDAL::getprojectAMS",err.stack,JSON.stringify(projectid),"getprojectAMS");
			reject(err);
		});
	});
}

module.exports.validateagreement = function (userid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
               SELECT
                c.clientid,
                c.organization,
                lv.description AS 'approval',
                c.approvalid

            FROM client c

            INNER JOIN lookupvalue lv ON
                lv.lkvalid = c.approvalid AND lv.code = "CONFIRM"
            AND lv.active = 1

            WHERE (c.mobile = ? OR c.email = ? OR c.phone = ?) AND c.active = 1

             */
			});
			con.query(query, [userid, userid, userid]).then(function (rows, fields) {
				if (rows.length > 0) {

					console.log(rows[0].approval);
					resolve({
						"approval": rows[0].approval
					})
				} else {
					reject("Client Account not activated");
				}
			}).catch(function (err) { 
				errorDAL.errorlog('Error',"clientDAL::validateagreement",err.stack,JSON.stringify(userid),"validateagreement");
				reject(err);
			});
		}).catch(function (err) { 
			errorDAL.errorlog('Error',"clientDAL::validateagreement",err.stack,JSON.stringify(userid),"validateagreement");
			reject(err);
		});
	});
}

module.exports.authenticate = function (userid, passwordHash) {

	console.log(userid, passwordHash);
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
               		SELECT
						c.clientid,
						c.organization,
						c.contactname,
						c.image,
						c.email,
						c.mobile,
						c.password,
						c.addressline1,
						c.addressline2,
						c.addressline3,
						c.phone,
						c.gstno,
						c.gsttanno,
						c.tanno,
						c.panno,
						c.department,
						c.departmenttypeid,
						lv6.description AS 'departmenttype',
						c.districtid,
						lv.description AS 'district',
						c.talukid,
						lv1.description AS 'taluk',
						c.stateid,
						lv2.description AS 'state',
						c.countryid,
						lv3.description AS 'country',
						c.countryid,
						lv4.description AS 'dept',
						c.deptid,
						lv5.description AS 'approval',
						c.approvalid
					FROM client c
					INNER JOIN lookupvalue lv ON
						lv.lkvalid = c.districtid
					AND lv.active = 1
					INNER JOIN lookupvalue lv1 ON
						lv1.lkvalid = c.talukid
					AND lv1.active = 1
					INNER JOIN lookupvalue lv2 ON
						lv2.lkvalid = c.stateid
					AND lv2.active = 1
					INNER JOIN lookupvalue lv3 ON
						lv3.lkvalid = c.countryid
					AND lv3.active = 1
					INNER JOIN lookupvalue lv4 ON
						lv4.lkvalid = c.deptid
					AND lv4.active = 1
					INNER JOIN lookupvalue lv5 ON
						lv5.lkvalid = c.approvalid
					AND lv5.active = 1
					INNER JOIN lookupvalue lv6 ON
						lv6.lkvalid = c.departmenttypeid
					AND lv6.active = 1
					WHERE (c.mobile = ? OR c.email = ? OR c.phone = ? ) AND c.password  = ? AND c.active = 1
             	*/
			});
			

			con.query(query, [userid, userid, userid, passwordHash]).then(function (rows, fields) {
				if (rows.length > 0) {
					var client = new clientModel.getclient(rows[0].clientid, rows[0].organization, rows[0].contactname, rows[0].image, rows[0].email, rows[0].mobile, rows[0].phone, rows[0].gstno, rows[0].tanno, rows[0].panno, rows[0].password, rows[0].addressline1, rows[0].addressline2, rows[0].addressline3,rows[0].pincode, rows[0].districtid, rows[0].district, rows[0].talukid, rows[0].taluk, rows[0].stateid, rows[0].state, rows[0].countryid, rows[0].country, rows[0].departmenttypeid, rows[0].departmenttype, rows[0].department, rows[0].deptid, rows[0].dept, rows[0].approvalid, rows[0].approval, rows[0].active, '', '', 0, 0,0,'',0);
					resolve(client);
				} else {
					reject("error");
				}
			}).catch(function (err) { 
				errorDAL.errorlog('Error',"clientDAL::authenticate",err.stack,JSON.stringify(userid, passwordHash),"authenticate");
				reject(err);
			});
		}).catch(function (err) { 
			errorDAL.errorlog('Error',"clientDAL::authenticate",err.stack,JSON.stringify(userid, passwordHash),"authenticate");
			reject(err);
		});
	});
}

module.exports.validateclient = function (email, mobile, clientid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			con.query('SELECT clientid FROM client WHERE ( email = ? OR mobile = ? ) AND clientid<>? ', [email, mobile, clientid]).then(function (rows, fields) {
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
				errorDAL.errorlog('Error',"clientDAL::validateclient",err.stack,JSON.stringify(email, mobile, clientid),"validateclient");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::validateclient",err.stack,JSON.stringify(email, mobile, clientid),"validateclient");
			reject(err);
		});
	});
}

module.exports.validateproject = function (projectno, projectid) {
	console.log(projectno, projectid);
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			con.query('SELECT projectid FROM project WHERE  projectno = ?  AND projectid<>? ', [projectno, projectid]).then(function (rows, fields) {
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
				errorDAL.errorlog('Error',"clientDAL::validateproject",err.stack,JSON.stringify(projectno,projectid),"validateproject");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::validateproject",err.stack,JSON.stringify(projectno,projectid),"validateproject");
			reject(err);
		});
	});
}

module.exports.getclientid = function (userid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			con.query("SELECT clientid, organization, email, mobile FROM client WHERE (email = ? OR mobile = ?) AND active = 1 LIMIT 1", [userid, userid]).then(function (rows, fields) {
				if (rows.length > 0) {
					resolve({
						"clientid": rows[0].clientid,
						"organization": rows[0].organization,
						"email": rows[0].email,
						"mobile": rows[0].mobile
					});
				} else {
					reject("Invalid Email or mobile.");
				}
			}).catch(function (err) {
				errorDAL.errorlog('Error',"clientDAL::getclientid",err.stack,JSON.stringify(userid),"getclientid");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::getclientid",err.stack,JSON.stringify(userid),"getclientid");
			reject(err);
		});
	});
}

module.exports.forgotpassword = function (clientid, verificationcode, token, changedby) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			con.query("INSERT INTO resetpassword(clientid, verificationcode, token, changedby) VALUES (?,?,?,?)", [clientid, verificationcode, token, changedby]).then(function (rows, fields) {
				if (rows.insertId > 0) {
					resolve({
						"id": rows.insertId
					});
				} else {
					errorDAL.errorlog('Error',"clientDAL::forgotpassword",err.stack,JSON.stringify(clientid),"forgotpassword");
					reject("error in resetpassword");
				}
			}).catch(function (err) {
				errorDAL.errorlog('Error',"clientDAL::forgotpassword",err.stack,JSON.stringify(clientid),"forgotpassword");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::forgotpassword",err.stack,JSON.stringify(clientid),"getforgotpasswordclientid");
			reject(err);
		});
	});
}

module.exports.changepassword = function (password, changedby, clientid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			if (clientid > 0) {
				var query = {
					password: password,
					changedby: changedby
				};
				con.query('UPDATE client SET ?  WHERE clientid= ?', [query, clientid]).then(function (rows, fields) {
					resolve("success");
				}).catch(function (err) {
					errorDAL.errorlog('Error',"clientDAL::changepassword",err.stack,JSON.stringify(clientid),"changepassword");
					reject(err);
				});
			} else {
				reject("Unable to update password")
			}
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::changepassword",err.stack,JSON.stringify(clientid),"changepassword");
			reject(err);
		});
	});
}

module.exports.getclientidbyresetpwd = function (token, verificationcode) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			con.query('SELECT clientid FROM resetpassword WHERE token = ? AND verificationcode = ?  AND active = 1 LIMIT 1', [token, verificationcode]).then(function (rows, fields) {
				if (rows.length > 0) {
					resolve({
						"clientid": rows[0].clientid
					});
				} else {
					errorDAL.errorlog('Error',"clientDAL::getclientidbyresetpwd",err.stack,JSON.stringify(clientid),"getclientidbyresetpwd");
					reject("verificationcode is expired or invalid")
				}
			}).catch(function (err) {
				errorDAL.errorlog('Error',"clientDAL::getclientidbyresetpwd",err.stack,JSON.stringify(clientid),"getclientidbyresetpwd");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::getclientidbyresetpwd",err.stack,JSON.stringify(clientid),"getclientidbyresetpwd");
			reject(err);
		});
	});
}

module.exports.resetpassword = function (token) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			con.query('UPDATE resetpassword SET active = 0 WHERE token = ?', [token]).then(function (rows, fields) {
				resolve("success");
			}).catch(function (err) {
				errorDAL.errorlog('Error',"clientDAL::resetpassword",err.stack,JSON.stringify(token),"resetpassword");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::resetpassword",err.stack,JSON.stringify(token),"resetpassword");
			reject(err);
		});
	});
}

module.exports.getvalidpassword = function (clientid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			con.query("SELECT password FROM client WHERE clientid=? AND active = 1 LIMIT 1", [clientid]).then(function (rows, fields) {
				if (rows.length > 0) {
					resolve({
						"passwordhash": rows[0].password
					});
				} else {
					errorDAL.errorlog('Error',"clientDAL::getvalidpassword",err.stack,JSON.stringify(clientid),"getvalidpassword");
					reject("Invalid clientid, Please Check clientid");
				}
			}).catch(function (err) {
				errorDAL.errorlog('Error',"clientDAL::getvalidpassword",err.stack,JSON.stringify(clientid),"getvalidpassword");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::getvalidpassword",err.stack,JSON.stringify(clientid),"getvalidpassword");
			reject(err);
		});
	});
}

module.exports.getclientdetails = function (clientid) {
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
    m.texcono,
    m.serviceno,
    ja.clientid,
    ja.projectid,
    pr.projectno,
    pr.name AS projectname,
    ja.texcono AS newtexcono,
    jpd.jobmasterid,
    DATE_FORMAT( jpd.posteddate,'%Y-%m-%d') AS posteddate,
    jm.code AS jobcode,
    jm.name AS jobname


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

WHERE ja.active = 1 AND  ja.jobstatuscode = 2 AND   cl.clientid = ? and m.lastaccess > now()-interval 90 day
                  ORDER BY  m.texcono ASC;

            */
			});
			con.query(query, [clientid]).then(function (rows, fields) {
				var rowsReturned = rows.length;
				var result = [];
				if (rowsReturned > 0) {
					for (var i = 0; i < rowsReturned; i++) {
						var client = new clientModel.getclientdetails(rows[i].clientid, rows[i].jobpostingdetailid, rows[i].projectid, rows[i].projectno, rows[i].projectname, rows[i].memberid, rows[i].firstname, rows[i].lastname, rows[i].jobcode, rows[i].jobname, rows[i].texcono, rows[i].serviceno, rows[i].posteddate);
						result.push(client);
					}
				}
				resolve(result);
			}).catch(function (err) {
				errorDAL.errorlog('Error',"clientDAL::getclientdetails",err.stack,JSON.stringify(clientid),"getclientdetails");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::getclientdetails",err.stack,JSON.stringify(clientid),"getclientdetails");
			reject(err);
		});
	});
}

// module.exports.getclientdetailsList = function (clientid, projectid, monthandyear) {
// 	var dt = new Date(monthandyear);

// 	var LastMonth = moment(dt).subtract(1, 'months').startOf('month').format('YYYY-MM-DD');
// 	var PreviousMonth = moment(dt).subtract(2, 'months').startOf('month').format('YYYY-MM-DD');
// 	var ThirdMonth = moment(dt).subtract(3, 'months').startOf('month').format('YYYY-MM-DD');

// 	var StartDate = moment(dt).startOf('month').format('YYYY-MM-DD');
// 	var EndDate = moment(dt).endOf('month').format('YYYY-MM-DD');
// 	console.log('EndDate', EndDate);
// 	// var jobcodes=['PO','ASO','DVR','SG','JA','HSG','GUN','OTHER'];

// 	return new app.promise(function (resolve, reject) {
// 		mySqlConnection.connection().then(function (con) {
// 			var result = [];
// 			var query = multiline.stripIndent(function () {

//             SELECT
//                 ja.jobactivityid,
//                 jpd.jobpostingid,
//                 ja.jobpostingdetailid,
//                 ja.memberid,
//                 m.firstname,
//                 m.lastname,
//                 m.texcono,
//                 m.serviceno,
//                 ja.clientid,
//                 ja.projectid,
//                 pr.projectno,
//                 pr.name AS projectname,
//                 ja.texcono AS newtexcono,
//                 jpd.jobmasterid,
//                 DATE_FORMAT( jpd.posteddate,'%Y-%m-%d') AS posteddate,
//                 jm.code AS jobcode,
//                 jm.name AS jobname


//             FROM jobactivity ja

//             LEFT JOIN jobpostingdetail jpd ON
//                 jpd.jobpostingdetailid =  ja.jobpostingdetailid
//                 AND jpd.active =1

//             LEFT JOIN client cl ON
//                 cl.clientid =  ja.clientid
//                 AND cl.active =1

//             LEFT JOIN project pr ON
//                 pr.projectid = ja.projectid
//                 AND cl.active =1

//             LEFT JOIN member m ON
//                 m.memberid = ja.memberid
//                 AND m.active =1

//             LEFT JOIN jobmaster jm ON
//                 jm.jobmasterid =  jpd.jobmasterid
//                 AND jpd.active =1

//             LEFT JOIN memberhistory mm ON
//                 mm.memberid = ja.memberid
//                 AND mm.active =1

//             WHERE (ja.active = 1 OR ja.active=0) AND ja.jobstatuscode = 2 AND cl.clientid = ? AND m.lastaccess > now()-interval 90 day AND (DATE(m.lastattendance) = ? OR (DATE(mm.startdate) BETWEEN ? AND ?)) GROUP BY m.memberid  ORDER BY FIELD(jm.jobmasterid,5,4,2,1,3,6,8,9,7) , m.texcono ASC


// 			});
// 			con.query(query, [clientid, LastMonth, StartDate, EndDate]).then(function (rows, fields) {
// 				var rowsReturned = rows.length;
// 				if (rowsReturned > 0) {
// 					for (var i = 0; i < rowsReturned; i++) {
// 						var client = new clientModel.getclientdetails(rows[i].clientid, rows[i].jobpostingdetailid, rows[i].projectid, rows[i].projectno, rows[i].projectname, rows[i].memberid, rows[i].firstname, rows[i].lastname, rows[i].jobcode, rows[i].jobname, rows[i].texcono, rows[i].serviceno, rows[i].posteddate);
// 						result.push(client);
// 						// console.log('result',result);
// 						resolve(result);
// 					}
// 				}
// 			}).catch(function (err) {
// 				reject(err);
// 			});

// 		}).catch(function (err) {
// 			reject(err);
// 		});
// 	});
// }

/*module.exports.getclientdetailsList = function (clientid, projectid, monthandyear) {
	var dt = new Date(monthandyear);

	var LastMonth = moment(dt).subtract(1, 'months').startOf('month').format('YYYY-MM-DD');
	var PreviousMonth = moment(dt).subtract(2, 'months').startOf('month').format('YYYY-MM-DD');
	var ThirdMonth = moment(dt).subtract(3, 'months').startOf('month').format('YYYY-MM-DD');

	var StartDate = moment(dt).startOf('month').format('YYYY-MM-DD');
	var EndDate = moment(dt).endOf('month').format('YYYY-MM-DD');
	console.log('StartDate', StartDate, EndDate,LastMonth);
	// var jobcodes=['PO','ASO','DVR','SG','JA','HSG','GUN','OTHER'];

	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var result = [];
			var query = multiline.stripIndent(function () {
				
					SELECT mh.memberid,mh.texcono,pr.projectno,pr.projectid,mh.category as jobcode,pr.clientid,mem.firstname,mem.serviceno,mem.lastname,jm.name,jm.jobmasterid
					FROM memberhistory mh
					LEFT JOIN member mem ON mem.memberid = mh.memberid
					LEFT JOIN project pr ON (pr.projectid = mh.projectid OR pr.projectno = mh.projectno)
					LEFT JOIN jobmaster jm ON jm.code = mh.category 
					WHERE pr.projectid = ? AND pr.clientid = ? AND (mh.enddate > NOW()-INTERVAL 45 DAY OR (DATE(mh.startdate) BETWEEN (?) AND (?))) 
					AND (DATE(mem.lastattendance) = ? OR (DATE(mh.startdate) BETWEEN (?) AND (?)))
					group by mem.texcono
					ORDER BY FIELD(jm.jobmasterid,5,4,2,1,3,6,8,9,7) ,mem.texcono ASC
            	
			});
			con.query(query, [projectid, clientid, StartDate, EndDate, LastMonth, StartDate, EndDate]).then(function (rows, fields) {
				console.log('rows', rows);
				var rowsReturned = rows.length;
				if (rowsReturned > 0) {
					for (var i = 0; i < rowsReturned; i++) {
						var client = new clientModel.getclientAttendancedetails(rows[i].clientid, rows[i].projectid, rows[i].projectno, rows[i].memberid, rows[i].firstname, rows[i].lastname, rows[i].jobcode, rows[i].jobname, rows[i].texcono, rows[i].serviceno, rows[i].jobmasterid);
						result.push(client);
						resolve(result);
					}
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
}*/

module.exports.getclientdetailsList = function (clientid, projectid, monthandyear) {
	
	var dt = new Date(monthandyear);
	var LastMonth = moment(dt).subtract(1, 'months').startOf('month').format('YYYY-MM-DD');
	var PreviousMonth = moment(dt).subtract(2, 'months').startOf('month').format('YYYY-MM-DD');
	var ThirdMonth = moment(dt).subtract(3, 'months').startOf('month').format('YYYY-MM-DD');
	var StartDate = moment(dt).startOf('month').format('YYYY-MM-DD');
	var EndDate = moment(dt).endOf('month').format('YYYY-MM-DD');

	

	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var result = [];
			var query = multiline.stripIndent(function () {
				/*
						SELECT mem.memberid
						FROM memberhistory mh
						LEFT JOIN member mem ON mem.memberid = mh.memberid
						LEFT JOIN project pr ON (pr.projectid = mh.projectid OR pr.projectno = mh.projectno)
						LEFT JOIN jobmaster jm ON jm.code = mh.category 
						WHERE pr.projectid = ? and pr.clientid = ? 
						AND ((DATE(mem.lastattendance)  = ? OR mh.lastatdate = '0000-00-00' OR mh.lastatdate = ?) OR mem.attendanceduplicated = 1  OR (mem.lastattendance) = '0000-00-00' OR DATE(mem.lastattendance) = null) 
						and ((mh.enddate BETWEEN (?) AND (?) ) OR (DATE(mh.startdate) BETWEEN (?) AND (?)))
						GROUP BY mh.memberhistoryid 
						ORDER BY FIELD(jm.jobmasterid,3,5,4,2,1,6,8,9,7) ,mem.texcono;

            		SELECT mh.memberid,mh.texcono,pr.projectno,pr.projectid,mh.category as jobcode,pr.clientid,mem.firstname,mem.serviceno,mem.lastname,jm.name,jm.jobmasterid, mh.memberhistoryid, IFNULL(SUM(att.presentdays),0) AS prrdays,'0' AS dubdays
					FROM memberhistory mh
					INNER JOIN member mem ON mem.memberid = mh.memberid
					LEFT JOIN attendance att ON att.memberid  = mh.memberid AND att.monthandyear = ?
					LEFT JOIN project pr ON (pr.projectid = mh.projectid OR pr.projectno = mh.projectno)
					LEFT JOIN jobmaster jm ON jm.code = mh.category 
					WHERE pr.projectid = ? and pr.clientid = ? 
					AND ((DATE(mem.lastattendance)  = ? OR mh.lastatdate = '0000-00-00' OR mh.lastatdate = ?) OR mem.attendanceduplicated = 1  OR (mem.lastattendance) = '0000-00-00' OR DATE(mem.lastattendance) = null) 
					AND ((mh.enddate BETWEEN (?) AND (?) ) OR (DATE(mh.startdate) BETWEEN (?) AND (?)))
					GROUP BY mh.memberhistoryid
					ORDER BY FIELD(jm.jobmasterid,3,5,4,2,1,6,8,9,7) ,mem.texcono ASC Limit 50;
					*/
            	
			}); 
			con.query(query, [projectid, clientid, LastMonth,LastMonth,LastMonth,StartDate, StartDate, EndDate, monthandyear,projectid, clientid, LastMonth,LastMonth,LastMonth,StartDate,StartDate, EndDate]).then(function (row, fields) {
				console.log(projectid, clientid, LastMonth,LastMonth,LastMonth,StartDate, StartDate, EndDate, monthandyear,projectid, clientid, LastMonth,LastMonth,StartDate,EndDate,StartDate, EndDate);
				var totalCount = 0; 
				var rows = row[1];
				var totalCount = row[0].length;
				var rowsReturned = rows.length;
				if (rowsReturned > 0) {
					for (var i = 0; i < rowsReturned; i++) { 
						var client = new clientModel.getclientAttendancedetails(rows[i].clientid, rows[i].projectid, rows[i].projectno, rows[i].memberid, rows[i].firstname, rows[i].lastname, rows[i].jobcode, rows[i].jobname, rows[i].texcono, rows[i].serviceno, rows[i].jobmasterid, 0,0, rows[i].memberhistoryid,rows[i].prrdays,rows[i].dubdays);
						result.push(client); 
					}  
					resolve({
						"count": totalCount,
						"result": result
					}); 
				} else {
					resolve(result);
				}
			}).catch(function (err) {
				errorDAL.errorlog('Error',"clientDAL::getclientdetailsList",err.stack,JSON.stringify(clientid),"getclientdetailsList");
				reject(err);
			});

		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::getclientdetailsList",err.stack,JSON.stringify(clientid),"getclientdetailsList");
			reject(err);
		});
	});
}

module.exports.getclientdetailsListSkip = function (clientid, projectid, monthandyear, skippedmembersid) {

//	console.log(skippedmembersid);
	var dt = new Date(monthandyear);
	var LastMonth = moment(dt).subtract(1, 'months').startOf('month').format('YYYY-MM-DD');
	var PreviousMonth = moment(dt).subtract(2, 'months').startOf('month').format('YYYY-MM-DD');
	var ThirdMonth = moment(dt).subtract(3, 'months').startOf('month').format('YYYY-MM-DD');

	// var StartDate = moment(dt).subtract(1, 'months').endOf('month').format('YYYY-MM-DD');
	// var EndDate = moment(dt).add(1, 'months').startOf('month').format('YYYY-MM-DD');

	 var StartDate = moment(dt).startOf('month').format('YYYY-MM-DD');
	 var EndDate = moment(dt).endOf('month').format('YYYY-MM-DD');

	var membersIds = skippedmembersid.split(',');

	console.log(membersIds);
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
					SELECT mh.memberid,mh.texcono,pr.projectno,pr.projectid,mh.category as jobcode,pr.clientid,mem.firstname,mem.serviceno,mem.lastname,jm.name,jm.jobmasterid, mh.memberhistoryid, IFNULL(SUM(att.presentdays),0) AS prrdays,'0' AS dubdays
					FROM memberhistory mh
					INNER JOIN member mem ON mem.memberid = mh.memberid
					LEFT JOIN attendance att ON att.memberid  = mh.memberid AND att.monthandyear = ?
					LEFT JOIN project pr ON (pr.projectid = mh.projectid OR pr.projectno = mh.projectno)
					LEFT JOIN jobmaster jm ON jm.code = mh.category 
					WHERE pr.projectid = ? and pr.clientid = ? AND mh.memberhistoryid NOT IN (?)
					AND ((DATE(mem.lastattendance)  = ? OR mh.lastatdate = '0000-00-00' OR mh.lastatdate = ?) OR mem.attendanceduplicated = 1  OR (mem.lastattendance) = '0000-00-00' OR DATE(mem.lastattendance) = null) 
					AND ((mh.enddate BETWEEN (?) AND (?) ) OR (DATE(mh.startdate) BETWEEN (?) AND (?)))
					GROUP BY mh.memberhistoryid
					ORDER BY FIELD(jm.jobmasterid,3,5,4,2,1,6,8,9,7) ,mem.texcono ASC Limit 50;
				*/
			});
			con.query(query, [monthandyear,projectid, clientid, membersIds, LastMonth,LastMonth,LastMonth,StartDate,StartDate, EndDate]).then(function (rows, fields) {

				console.log(monthandyear,projectid, clientid, membersIds, LastMonth,LastMonth,LastMonth,StartDate,StartDate, EndDate);
				var result = [];


				
				var rowsReturned = rows.length;
				
				if (rowsReturned > 0) {
					for (var i = 0; i < rowsReturned; i++) {
						var client = new clientModel.getclientAttendancedetails(rows[i].clientid, rows[i].projectid, rows[i].projectno, rows[i].memberid, rows[i].firstname, rows[i].lastname, rows[i].jobcode, rows[i].jobname, rows[i].texcono, rows[i].serviceno, rows[i].jobmasterid, 0 , 0,  rows[i].memberhistoryid,rows[i].prrdays,rows[i].dubdays);
						result.push(client);
					}
					resolve(result);
				} else {
					resolve(result);
				}
			}).catch(function (err) {
				errorDAL.errorlog('Error',"clientDAL::getclientdetailsListSkip",err.stack,JSON.stringify(clientid),"getclientdetailsListSkip");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::getclientdetailsListSkip",err.stack,JSON.stringify(clientid),"getclientdetailsListSkip");
			reject(err);
		});
	});
}


/*
module.exports.getclientdetailsList = function (clientid, projectid, monthandyear) {
	
	var dt = new Date(monthandyear);
	var LastMonth = moment(dt).subtract(1, 'months').startOf('month').format('YYYY-MM-DD');
	var PreviousMonth = moment(dt).subtract(2, 'months').startOf('month').format('YYYY-MM-DD');
	var ThirdMonth = moment(dt).subtract(3, 'months').startOf('month').format('YYYY-MM-DD');
	var StartDate = moment(dt).startOf('month').format('YYYY-MM-DD');
	var EndDate = moment(dt).endOf('month').format('YYYY-MM-DD');
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var result = [];
			var query = multiline.stripIndent(function () {
				
					SELECT mem.memberid
					FROM memberhistory mh
					LEFT JOIN member mem ON mem.memberid = mh.memberid
					LEFT JOIN project pr ON (pr.projectid = mh.projectid OR pr.projectno = mh.projectno)
					LEFT JOIN jobmaster jm ON jm.code = mh.category 
					WHERE pr.projectid = ? and pr.clientid = ? 
					AND (DATE(mem.lastattendance)  = ? OR mem.attendanceduplicated = 1  OR (mem.lastattendance) = '0000-00-00' OR DATE(mem.lastattendance) = null) 
					and ((mh.enddate > ?-INTERVAL 30 DAY ) OR (DATE(mh.startdate) BETWEEN (?) AND (?)))
					GROUP BY mh.memberhistoryid 
					ORDER BY FIELD(jm.jobmasterid,3,5,4,2,1,6,8,9,7) ,mem.texcono;

            		SELECT mh.memberid,mh.texcono,pr.projectno,pr.projectid,mh.category as jobcode,pr.clientid,mem.firstname,mem.serviceno,mem.lastname,jm.name,jm.jobmasterid, mh.memberhistoryid, IFNULL(SUM(att.presentdays),0) AS prrdays,'0' AS dubdays
					FROM memberhistory mh
					INNER JOIN member mem ON mem.memberid = mh.memberid
					LEFT JOIN attendance att ON att.memberid  = mh.memberid AND att.monthandyear = ?
					LEFT JOIN project pr ON (pr.projectid = mh.projectid OR pr.projectno = mh.projectno)
					LEFT JOIN jobmaster jm ON jm.code = mh.category 
					WHERE pr.projectid = ? and pr.clientid = ? 
					AND (DATE(mem.lastattendance)  = ? OR mem.attendanceduplicated = 1  OR (mem.lastattendance) = '0000-00-00' OR DATE(mem.lastattendance) = null) 
					AND ((mh.enddate > ?-INTERVAL 30 DAY ) OR (DATE(mh.startdate) BETWEEN (?) AND (?)))
					GROUP BY mh.memberhistoryid
					ORDER BY FIELD(jm.jobmasterid,3,5,4,2,1,6,8,9,7) ,mem.texcono ASC Limit 50;
            	
			}); 
			con.query(query, [projectid, clientid, LastMonth,StartDate, StartDate, EndDate, monthandyear,projectid, clientid, LastMonth,StartDate,StartDate, EndDate]).then(function (row, fields) {
				console.log(projectid, clientid, LastMonth,StartDate,StartDate, StartDate, EndDate, monthandyear,projectid, clientid, LastMonth,StartDate, StartDate,StartDate, EndDate);
				var totalCount = 0; 
				var rows = row[1];
				var totalCount = row[0].length;
				var rowsReturned = rows.length;
				if (rowsReturned > 0) {
					for (var i = 0; i < rowsReturned; i++) { 
						var client = new clientModel.getclientAttendancedetails(rows[i].clientid, rows[i].projectid, rows[i].projectno, rows[i].memberid, rows[i].firstname, rows[i].lastname, rows[i].jobcode, rows[i].jobname, rows[i].texcono, rows[i].serviceno, rows[i].jobmasterid, 0,0, rows[i].memberhistoryid,rows[i].prrdays,rows[i].dubdays);
						result.push(client); 
					}  
					resolve({
						"count": totalCount,
						"result": result
					}); 
				} else {
					resolve(result);
				}
			}).catch(function (err) {
				errorDAL.errorlog('Error',"clientDAL::getclientdetailsList",err.stack,JSON.stringify(clientid),"getclientdetailsList");
				reject(err);
			});

		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::getclientdetailsList",err.stack,JSON.stringify(clientid),"getclientdetailsList");
			reject(err);
		});
	});
}

module.exports.getclientdetailsListSkip = function (clientid, projectid, monthandyear, skippedmembersid) {

	var dt = new Date(monthandyear);
	var LastMonth = moment(dt).subtract(1, 'months').startOf('month').format('YYYY-MM-DD');
	var PreviousMonth = moment(dt).subtract(2, 'months').startOf('month').format('YYYY-MM-DD');
	var ThirdMonth = moment(dt).subtract(3, 'months').startOf('month').format('YYYY-MM-DD');

	var StartDate = moment(dt).subtract(1, 'months').endOf('month').format('YYYY-MM-DD');
	var EndDate = moment(dt).add(1, 'months').startOf('month').format('YYYY-MM-DD');
	var membersIds = skippedmembersid.split(',');
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				
					SELECT mh.memberid,mh.texcono,pr.projectno,pr.projectid,mh.category as jobcode,pr.clientid,mem.firstname,mem.serviceno,mem.lastname,jm.name,jm.jobmasterid, mh.memberhistoryid, IFNULL(SUM(att.presentdays),0) AS prrdays,'0' AS dubdays
					FROM memberhistory mh
					INNER JOIN member mem ON mem.memberid = mh.memberid
					LEFT JOIN attendance att ON att.memberid  = mh.memberid AND att.monthandyear = ?
					LEFT JOIN project pr ON (pr.projectid = mh.projectid OR pr.projectno = mh.projectno)
					LEFT JOIN jobmaster jm ON jm.code = mh.category 
					WHERE pr.projectid = ? and pr.clientid = ? AND mh.memberhistoryid NOT IN (?)
					AND (DATE(mem.lastattendance)  = ? OR mem.attendanceduplicated = 1  OR (mem.lastattendance) = '0000-00-00' OR DATE(mem.lastattendance) = null)
					AND ((mh.enddate > ?-INTERVAL 30 DAY ) OR (DATE(mh.startdate) BETWEEN (?) AND (?)))
					GROUP BY mh.memberhistoryid
					ORDER BY FIELD(jm.jobmasterid,3,5,4,2,1,6,8,9,7) ,mem.texcono ASC Limit 50;
				
			});
			con.query(query, [monthandyear,projectid, clientid, membersIds, LastMonth,StartDate,StartDate, EndDate]).then(function (rows, fields) {
				var result = [];
				var rowsReturned = rows.length;
				if (rowsReturned > 0) {
					for (var i = 0; i < rowsReturned; i++) {
						var client = new clientModel.getclientAttendancedetails(rows[i].clientid, rows[i].projectid, rows[i].projectno, rows[i].memberid, rows[i].firstname, rows[i].lastname, rows[i].jobcode, rows[i].jobname, rows[i].texcono, rows[i].serviceno, rows[i].jobmasterid, 0 , 0,  rows[i].memberhistoryid,rows[i].prrdays,rows[i].dubdays);
						result.push(client);
					}
					resolve(result);
				} else {
					resolve(result);
				}
			}).catch(function (err) {
				errorDAL.errorlog('Error',"clientDAL::getclientdetailsListSkip",err.stack,JSON.stringify(clientid),"getclientdetailsListSkip");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::getclientdetailsListSkip",err.stack,JSON.stringify(clientid),"getclientdetailsListSkip");
			reject(err);
		});
	});
}

*/
module.exports.getclientdetailsListView = function (clientid, projectid, monthandyear, memberid) {

	var dt = new Date();
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var result = [];
			var query = multiline.stripIndent(function () {
				/*
					SELECT att.memberid,mem.texcono,pr.projectno,pr.projectid,jm.code as jobcode,pr.clientid,mem.firstname,mem.serviceno,mem.lastname,jm.name,jm.jobmasterid,att.presentdays AS pdays,att.eddays AS od1Items,att.othours
					FROM attendance att
					LEFT JOIN member mem ON mem.memberid = att.memberid
					LEFT JOIN project pr ON pr.projectid = att.projectid
					LEFT JOIN jobmaster jm ON jm.jobmasterid = att.jobmasterid
					WHERE pr.projectid = ? AND pr.clientid = ? AND DATE(att.createdttm) = ? AND att.monthandyear = ?
					GROUP BY att.attendanceid
					ORDER BY FIELD(jm.jobmasterid,5,4,2,1,3,6,8,9,7) ,mem.texcono
				*/
			});
			var StartDate = moment(dt).format('YYYY-MM-DD');
			con.query(query, [projectid, clientid, StartDate, monthandyear]).then(function (rows, fields) {
				console.log('rows', rows);
				var rowsReturned = rows.length;
				if (rowsReturned > 0) {
					for (var i = 0; i < rowsReturned; i++) {
						if(rows[i].jobmasterid == 3) {
							rows[i].od1Items = rows[i].othours / 8;
						}
						var client = new clientModel.getclientAttendancedetails(rows[i].clientid, rows[i].projectid, rows[i].projectno, rows[i].memberid, rows[i].firstname, rows[i].lastname, rows[i].jobcode, rows[i].jobname, rows[i].texcono, rows[i].serviceno, rows[i].jobmasterid, rows[i].pdays, rows[i].od1Items,0,0);
						result.push(client);
					}
					resolve(result);
				} else {
					resolve(result);
				}
			}).catch(function (err) {
				errorDAL.errorlog('Error',"clientDAL::getclientdetailsListView",err.stack,JSON.stringify(clientid),"getclientdetailsListView");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::getclientdetailsListView",err.stack,JSON.stringify(clientid),"getclientdetailsListView");
			reject(err);
		});
	});
}

module.exports.createattendance = function (attendance) {
	
	var attendacemonth = new Date(attendance.monthandyear);

	var EndDate = moment(attendacemonth).endOf('month').format('YYYY-MM-DD');
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			if (attendance.members.length > 0) {
				var queries = '';
				var status = 0;
				var presentdays = 0;
				var eddays = 0;
				var othours = 0;
				attendance.members.forEach(function (item) {
					if (item.jobcode != 'DVR') {
						presentdays = parseInt(item.pdays);
						eddays = parseInt(item.od1Items) + parseFloat(item.od2Items);
						othours = 0;
					} else {
						presentdays = parseInt(item.pdays);
						eddays = 0;
						othours = parseFloat(item.od1Items) * 8;
					}
					if (item.attendanceid > 0) {
						queries += con.format("UPDATE `attendance` SET `one`=?,`two`=?,`three`=?,`four`=?,`five`=?,`six`=?,`seven`=?,`eight`=?,`nine`=?,`ten`=?,`eleven`=?,`twelve`=?,`thirteen`=?,`fourteen`=?,`fifteen`=?,`sixteen`=?,`seventeen`=?,`eighteen`=?,`nineteen`=?,`twenty`=?,`twentyone`=?,`twentytwo`=?,`twentythree`=?,`twentyfour`=?,`twentyfive`=?,`twentysix`=?,`twentyseven`=?,`twentyeight`=?,`twentynine`=?,`thirty`=?,`thirtyone`=? ,`presentdays`=?, `eddays`=?, `othours`=?, status=?,`attendancesubmitted`=?,`attendancesaved`=?,`athold`=? WHERE `attendanceid` = ?;", [(item.valone != undefined ? item.valone : 0), (item.valtwo != undefined ? item.valtwo : 0), (item.valthree != undefined ? item.valthree : 0), (item.valfour != undefined ? item.valfour : 0), (item.valfive != undefined ? item.valfive : 0), (item.valsix != undefined ? item.valsix : 0), (item.valseven != undefined ? item.valseven : 0), (item.valeight != undefined ? item.valeight : 0), (item.valnine != undefined ? item.valnine : 0), (item.valten != undefined ? item.valten : 0), (item.valeleven != undefined ? item.valeleven : 0), (item.valtwelve != undefined ? item.valtwelve : 0), (item.valthirteen != undefined ? item.valthirteen : 0), (item.valfourteen != undefined ? item.valfourteen : 0), (item.valfifteen != undefined ? item.valfifteen : 0), (item.valsixteen != undefined ? item.valsixteen : 0), (item.valseventeen != undefined ? item.valseventeen : 0), (item.valeighteen != undefined ? item.valeighteen : 0), (item.valnineteen != undefined ? item.valnineteen : 0), (item.valtwenty != undefined ? item.valtwenty : 0), (item.valtwentyone != undefined ? item.valtwentyone : 0), (item.valtwentytwo != undefined ? item.valtwentytwo : 0), (item.valtwentythree != undefined ? item.valtwentythree : 0), (item.valtwentyfour != undefined ? item.valtwentyfour : 0), (item.valtwentyfive != undefined ? item.valtwentyfive : 0), (item.valtwentysix != undefined ? item.valtwentysix : 0), (item.valtwentyseven != undefined ? item.valtwentyseven : 0), (item.valtwentyeight != undefined ? item.valtwentyeight : 0), (item.valtwentynine != undefined ? item.valtwentynine : 0), (item.valthirty != undefined ? item.valthirty : 0), (item.valthirtyone != undefined ? item.valthirtyone : 0), presentdays, eddays, othours, status, 1, 1, 0, item.attendanceid])
						presentdays = 0;
						eddays = 0;
						othours = 0;
					} else {
						queries += con.format("INSERT INTO `attendance`(`clientid`, `projectid`, `memberid`, `jobmasterid`, `monthandyear`, `one`, `two`, `three`, `four`, `five`, `six`, `seven`, `eight`, `nine`, `ten`, `eleven`, `twelve`, `thirteen`, `fourteen`, `fifteen`, `sixteen`, `seventeen`, `eighteen`, `nineteen`, `twenty`, `twentyone`, `twentytwo`, `twentythree`, `twentyfour`, `twentyfive`, `twentysix`, `twentyseven`, `twentyeight`, `twentynine`, `thirty`, `thirtyone`, `presentdays`, `eddays`, `othours`, `status`, `changedby`,`attendancesubmitted`,`attendancesaved`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);", [attendance.clientid, attendance.projectid, item.memberid, item.jobmasterid, attendance.monthandyear, (item.valone != undefined ? item.valone : 0), (item.valtwo != undefined ? item.valtwo : 0), (item.valthree != undefined ? item.valthree : 0), (item.valfour != undefined ? item.valfour : 0), (item.valfive != undefined ? item.valfive : 0), (item.valsix != undefined ? item.valsix : 0), (item.valseven != undefined ? item.valseven : 0), (item.valeight != undefined ? item.valeight : 0), (item.valnine != undefined ? item.valnine : 0), (item.valten != undefined ? item.valten : 0), (item.valeleven != undefined ? item.valeleven : 0), (item.valtwelve != undefined ? item.valtwelve : 0), (item.valthirteen != undefined ? item.valthirteen : 0), (item.valfourteen != undefined ? item.valfourteen : 0), (item.valfifteen != undefined ? item.valfifteen : 0), (item.valsixteen != undefined ? item.valsixteen : 0), (item.valseventeen != undefined ? item.valseventeen : 0), (item.valeighteen != undefined ? item.valeighteen : 0), (item.valnineteen != undefined ? item.valnineteen : 0), (item.valtwenty != undefined ? item.valtwenty : 0), (item.valtwentyone != undefined ? item.valtwentyone : 0), (item.valtwentytwo != undefined ? item.valtwentytwo : 0), (item.valtwentythree != undefined ? item.valtwentythree : 0), (item.valtwentyfour != undefined ? item.valtwentyfour : 0), (item.valtwentyfive != undefined ? item.valtwentyfive : 0), (item.valtwentysix != undefined ? item.valtwentysix : 0), (item.valtwentyseven != undefined ? item.valtwentyseven : 0), (item.valtwentyeight != undefined ? item.valtwentyeight : 0), (item.valtwentynine != undefined ? item.valtwentynine : 0), (item.valthirty != undefined ? item.valthirty : 0), (item.valthirtyone != undefined ? item.valthirtyone : 0), presentdays, eddays, othours, (item.status != undefined ? item.status : 0), attendance.changedby, 1, attendance.attendancetype])
						var attendanceduplicated = 0;
						if (attendance.dubdays > 0) {
							attendanceduplicated = 1;
						}
						queries += con.format("UPDATE `member` SET `lastattendance`= ?,`atmonthandyear`=?,`attendancesaved`=?, `attendanceduplicated` = ? where `memberid`=?;UPDATE `memberhistory` SET `enddate`= ?  ,`lastatdate`= ? where `memberhistoryid`=?;", [attendacemonth, attendance.monthandyear, attendance.attendancetype, attendanceduplicated, item.memberid,EndDate,attendacemonth,item.memberhistoryid])
						presentdays = 0;
						eddays = 0;
						othours = 0;
					} 
				});
				// console.log('queries',queries);
				con.query(queries).then(function (rows, fields) {
					resolve("Success");
				}).catch(function (err) {
					errorDAL.errorlog('Error',"clientDAL::createattendance",err.stack,JSON.stringify(attendance),"createattendance");
					reject(err);
				});
			}
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::createattendance",err.stack,JSON.stringify(attendance),"createattendance");
			reject(err);
		});
	});
}

//module.exports.getattendance = function (projectid, monthandyear) {
//    return new app.promise(function (resolve, reject) {
//        mySqlConnection.connection().then(function (con) {
//            var query = multiline.stripIndent(function () {
//                /*
//            SELECT
//                at.attendanceid,
//                at.clientid,
//                at.projectid,
//                at.memberid,
//                at.jobpostingdetailid,
//                at.monthandyear,
//                at.one,
//                at.two,
//                at.three,
//                at.four,
//                at.five,
//                at.six,
//                at.seven,
//                at.eight,
//                at.nine,
//                at.ten,
//                at.eleven,
//                at.twelve,
//                at.thirteen,
//                at.fourteen,
//                at.fifteen,
//                at.sixteen,
//                at.seventeen,
//                at.eighteen,
//                at.nineteen,
//                at.twenty,
//                at.twentyone,
//                at.twentytwo,
//                at.twentythree,
//                at.twentyfour,
//                at.twentyfive,
//                at.twentysix,
//                at.twentyseven,
//                at.twentyeight,
//                at.twentynine,
//                at.thirty,
//                at.thirtyone,
//                at.presentdays,
//                at.othours,
//                at.status,
//                m.firstname,
//                m.lastname,
//                m.texcono,
//                m.serviceno,
//                pr.name AS projectname,
//                pr.projectno,
//                cl.organization,
//                jm.code AS jobcode,
//                jm.name AS jobname

//                FROM attendance at

//                INNER JOIN client cl ON
//                    cl.clientid = at.clientid
//                AND cl.active =1

//                INNER JOIN project pr ON
//                    pr.projectid = at.projectid
//                    AND pr.active =1

//                INNER JOIN member m ON
//                    m.memberid = at.memberid
//                    AND m.active =1

//                INNER JOIN jobpostingdetail jpd ON
//                    jpd.jobpostingdetailid = at.jobpostingdetailid
//                    AND jpd.active =1

//                INNER JOIN jobmaster jm ON
//                    jm.jobmasterid = jpd.jobmasterid
//                    AND jm.active =1
//            WHERE at.active = 1
//            AND  at.projectid = ?   AND  at.monthandyear = ?;

//            */
//            });
//            con.query(query, [projectid, monthandyear]).then(function (rows, fields) {
//                var rowsReturned = rows.length;
//                var result = [];
//                var members = [];
//                var attendance = {};
//                if (rowsReturned > 0) {
//                    for (var i = 0; i < rowsReturned; i++) {
//                        var obj = new clientModel.members(rows[i].attendanceid, rows[i].memberid, rows[i].firstname, rows[i].texcono, rows[i].serviceno, rows[i].jobpostingdetailid, rows[i].one, rows[i].two, rows[i].three, rows[i].four, rows[i].five, rows[i].six, rows[i].seven, rows[i].eight, rows[i].nine, rows[i].ten, rows[i].eleven, rows[i].twelve, rows[i].thirteen, rows[i].fourteen, rows[i].fifteen, rows[i].sixteen, rows[i].seventeen, rows[i].eighteen, rows[i].nineteen, rows[i].twenty, rows[i].twentyone, rows[i].twentytwo, rows[i].twentythree, rows[i].twentyfour, rows[i].twentyfive, rows[i].twentysix, rows[i].twentyseven, rows[i].twentyeight, rows[i].twentynine, rows[i].thirty, rows[i].thirtyone, (rows[i].presentdays != undefined? rows[i].presentdays: 0), (rows[i].othours != undefined? rows[i].othours: 0), rows[i].status, rows[i].jobcode);
//                        members.push(obj);
//                        if ((i + 1 == rowsReturned) || (rows[i].projectid != rows[i + 1].projectid) || (rows[i].monthandyear != rows[i + 1].monthandyear)) {
//                            var attendance = new clientModel.attendance(rows[i].clientid, rows[i].projectid, rows[i].monthandyear, rows[i].changedby, members);
//                            result.push(attendance)
//                            members = [];
//                        }
//                    }
//                }
//                resolve(result);
//            }).catch(function (err) {
//                reject(err);
//            });
//        }).catch(function (err) {
//            reject(err);
//        });
//    });
//}

module.exports.updateattendance = function (attendance) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			attendance.fromdate = new Date(attendance.fromdate);
			attendance.todate = new Date(attendance.todate);
			if (attendance.members.length > 0) {
				var queries = '';
				attendance.members.forEach(function (item) {
					queries += con.format("UPDATE `attendance` SET `fromdate`=?,`todate`=?,`days`=? where  `attendanceid`=?;", [attendance.fromdate, attendance.todate, item.days, item.attendanceid])
				});
				con.query(queries).then(function (rows, fields) {
					resolve("Success");
				}).catch(function (err) {
					errorDAL.errorlog('Error',"clientDAL::updateattendance",err.stack,JSON.stringify(attendance),"updateattendance");
					reject(err);
				});
			}
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::updateattendance",err.stack,JSON.stringify(attendance),"updateattendance");
			reject(err);
		});
	});
}

module.exports.updateattendancestatus = function (attendanceid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			if (attendanceid > 0) {
				con.query('UPDATE attendance SET active=? WHERE attendanceid= ?', [0, attendanceid]).then(function (rows, fields) {
					resolve({
						"attendanceid": attendanceid
					})
				}).catch(function (err) {
					errorDAL.errorlog('Error',"clientDAL::updateattendancestatus",err.stack,JSON.stringify(attendance),"updateattendancestatus");
					reject(err);
				});
			} else {
				errorDAL.errorlog('Error',"clientDAL::updateattendancestatus",err.stack,JSON.stringify(attendance),"updateattendancestatus");
				reject("Unable to delete attendance")
			}
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::updateattendancestatus",err.stack,JSON.stringify(attendance),"updateattendancestatus");
			reject(err);
		});
	});
}

module.exports.getnumberofclients = function () {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
				SELECT
				COUNT(*) as numberofclients
				FROM client cl

				INNER JOIN lookupvalue lv ON
				lv.lkvalid = cl.approvalid AND lv.code != 'REJECT'
				AND lv.active = 1
				where cl.active = 1
				  */
			});
			con.query(query).then(function (rows, fields) {
				resolve({
					"numberofclients": rows[0].numberofclients
				})
			}).catch(function (err) {
				errorDAL.errorlog('Error',"clientDAL::getnumberofclients",err.stack,'',"getnumberofclients");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::getnumberofclients",err.stack,'',"getnumberofclients");
			reject(err);
		});
	});
}

module.exports.getmemberlastaccess = function (memberid) {
	return new app.promise(function (resolve, reject) {
		var date = "";
		mySqlConnection.connection().then(function (con) {
			con.query('SELECT lastaccess,IFNULL(texcono, "") AS texcono, texconogdate,DATEDIFF(NOW(),lastaccess) AS lastaccdiff,DATEDIFF(NOW(),doj) AS dojdiff FROM `member` WHERE memberid=?', [memberid]).then(function (rows, fields) {
				if (rows.length > 0) {
					date = rows[0].lastaccess;
					texcono = rows[0].texcono;
					texconogdate = rows[0].texconogdate;
					lastaccdiff = rows[0].lastaccdiff;
					dojdiff = rows[0].dojdiff;
				} else {
					date = "";
					texcono = "";
					lastaccdiff = "";
					dojdiff = "";
				}
				resolve({
					"lastaccessdate": date,
					"texcono": texcono,
					"texconogdate": texconogdate,
					"lastaccdiff": lastaccdiff,
					"dojdiff": dojdiff
				})
			}).catch(function (err) {
				errorDAL.errorlog('Error',"clientDAL::getmemberlastaccess",err.stack,JSON.stringify(memberid),"getmemberlastaccess");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::getmemberlastaccess",err.stack,JSON.stringify(memberid),"getmemberlastaccess");
			reject(err);
		});
	});
}

module.exports.getclientapprovals = function (lkvalid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
            SELECT
                c.clientid,
                c.organization,
                c.contactname,
                c.image,
                c.email,
                c.mobile,
                c.password,
                c.addressline1,
                c.addressline2,
                c.addressline3,
                c.phone,
                c.gstno,
                c.tanno,
                c.panno,
                c.pincode,
                c.department,
                c.departmenttypeid,
                lv6.description AS 'departmenttype',
                c.districtid,
                lv.description AS 'district',
                c.talukid,
                lv1.description AS 'taluk',
                c.stateid,
                lv2.description AS 'state',
                c.countryid,
                lv3.description AS 'country',
                c.countryid,
                lv4.description AS 'dept',
                c.deptid,
                lv5.description AS 'approval',
                c.approvalid,
                c.active
            FROM client c

            INNER JOIN lookupvalue lv ON
                lv.lkvalid = c.districtid
            AND lv.active = 1

            INNER JOIN lookupvalue lv1 ON
                lv1.lkvalid = c.talukid
            AND lv1.active = 1

            INNER JOIN lookupvalue lv2 ON
                lv2.lkvalid = c.stateid
            AND lv2.active = 1

            INNER JOIN lookupvalue lv3 ON
                lv3.lkvalid = c.countryid
            AND lv3.active = 1

            INNER JOIN lookupvalue lv4 ON
                lv4.lkvalid = c.deptid
            AND lv4.active = 1

            INNER JOIN lookupvalue lv5 ON
                lv5.lkvalid = c.approvalid AND lv5.lkvalid =?
            AND lv5.active = 1

            INNER JOIN lookupvalue lv6 ON
                lv6.lkvalid = c.departmenttypeid
            AND lv6.active = 1

            ORDER BY  c.clientid
            */
			});
			con.query(query, [lkvalid]).then(function (rows, fields) {
				var rowsReturned = rows.length;
				var result = [];
				if (rowsReturned > 0) {
					for (var i = 0; i < rowsReturned; i++) {
						var client = new clientModel.getclient(rows[i].clientid, rows[i].organization, rows[i].contactname, rows[i].image, rows[i].email, rows[i].mobile, rows[i].phone, rows[i].gstno, rows[i].tanno, rows[i].panno, rows[i].password, rows[i].addressline1, rows[i].addressline2, rows[i].addressline3, rows[i].pincode, rows[i].districtid, rows[i].district, rows[i].talukid, rows[i].taluk, rows[i].stateid, rows[i].state, rows[i].countryid, rows[i].country, rows[i].departmenttypeid, rows[i].departmenttype, rows[i].department, rows[i].deptid, rows[i].dept, rows[i].approvalid, rows[i].approval, rows[i].active, '', '', 0, 0,0,'',0);
						result.push(client);
					}
				}
				resolve(result);
			}).catch(function (err) {
				errorDAL.errorlog('Error',"clientDAL::getclientapprovals",err.stack,JSON.stringify(lkvalid),"getclientapprovals");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::getclientapprovals",err.stack,JSON.stringify(lkvalid),"getclientapprovals");
			reject(err);
		});
	});
}

module.exports.updateclientapproval = function (clientid, approvalid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			con.query('UPDATE client SET active = ?, approvalid= ? WHERE clientid= ?', [1, approvalid, clientid]).then(function (rows, fields) {
				resolve({
					"clientid": clientid
				})
			}).catch(function (err) {
				errorDAL.errorlog('Error',"clientDAL::updateclientapproval",err.stack,JSON.stringify(clientid),"updateclientapproval");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::updateclientapproval",err.stack,JSON.stringify(clientid),"updateclientapproval");
			reject(err);
		});
	});
}

module.exports.getclientattendance = function (clientid, projectid, monthandyear) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
            SELECT
                at.attendanceid,
                at.clientid,
                at.projectid,
                at.memberid,
                at.jobpostingdetailid,
                at.monthandyear,
                at.one,
                at.two,
                at.three,
                at.four,
                at.five,
                at.six,
                at.seven,
                at.eight,
                at.nine,
                at.ten,
                at.eleven,
                at.twelve,
                at.thirteen,
                at.fourteen,
                at.fifteen,
                at.sixteen,
                at.seventeen,
                at.eighteen,
                at.nineteen,
                at.twenty,
                at.twentyone,
                at.twentytwo,
                at.twentythree,
                at.twentyfour,
                at.twentyfive,
                at.twentysix,
                at.twentyseven,
                at.twentyeight,
                at.twentynine,
                at.thirty,
                at.thirtyone,
                at.presentdays,
                at.eddays,
                at.status,
                m.firstname,
                m.lastname,
                m.texcono,
                m.serviceno,
                pr.name AS projectname,
                pr.projectno,
                cl.organization
                FROM attendance at

                INNER JOIN client cl ON
                    cl.clientid = at.clientid
                AND cl.active =1

                INNER JOIN project pr ON
                    pr.projectid = at.projectid
                    AND pr.active =1

                INNER JOIN member m ON
                    m.memberid = at.memberid
                    AND m.active =1

            WHERE at.active = 1
            AND  at.clientid = ?  AND at.projectid = ?   AND  at.monthandyear = ?;

            */
			});
			con.query(query, [clientid, projectid, monthandyear]).then(function (rows, fields) {
				var rowsReturned = rows.length;
				var result = [];
				var members = [];
				var attendance = {};
				if (rowsReturned > 0) {
					for (var i = 0; i < rowsReturned; i++) {
						var obj = new clientModel.members(rows[i].attendanceid, rows[i].memberid, rows[i].firstname, rows[i].texcono, rows[i].serviceno, rows[i].jobpostingdetailid, rows[i].one, rows[i].two, rows[i].three, rows[i].four, rows[i].five, rows[i].six, rows[i].seven, rows[i].eight, rows[i].nine, rows[i].ten, rows[i].eleven, rows[i].twelve, rows[i].thirteen, rows[i].fourteen, rows[i].fifteen, rows[i].sixteen, rows[i].seventeen, rows[i].eighteen, rows[i].nineteen, rows[i].twenty, rows[i].twentyone, rows[i].twentytwo, rows[i].twentythree, rows[i].twentyfour, rows[i].twentyfive, rows[i].twentysix, rows[i].twentyseven, rows[i].twentyeight, rows[i].twentynine, rows[i].thirty, rows[i].thirtyone, (rows[i].presentdays != undefined ? rows[i].presentdays : 0), (rows[i].otdays != undefined ? rows[i].otdays : 0), rows[i].status);
						members.push(obj);
						if ((i + 1 == rowsReturned) || (rows[i].projectid != rows[i + 1].projectid) || (rows[i].monthandyear != rows[i + 1].monthandyear)) {
							var attendance = new clientModel.attendance(rows[i].clientid, rows[i].projectid, rows[i].monthandyear, rows[i].changedby, members);
							result.push(attendance)
							members = [];
						}
					}
				}
				resolve(result);
			}).catch(function (err) {
				errorDAL.errorlog('Error',"clientDAL::getclientattendance",err.stack,JSON.stringify(clientid),"getclientattendance");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::getclientattendance",err.stack,JSON.stringify(clientid),"getclientattendance");
			reject(err);
		});
	});
}

module.exports.getclientattendanceinfodetails = function (clientid, projectid, monthandyear) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
            SELECT
                at.attendanceid,
                at.clientid,
                at.projectid,
                at.memberid,
                at.jobpostingdetailid,
                at.monthandyear,
                at.one,
                at.two,
                at.three,
                at.four,
                at.five,
                at.six,
                at.seven,
                at.eight,
                at.nine,
                at.ten,
                at.eleven,
                at.twelve,
                at.thirteen,
                at.fourteen,
                at.fifteen,
                at.sixteen,
                at.seventeen,
                at.eighteen,
                at.nineteen,
                at.twenty,
                at.twentyone,
                at.twentytwo,
                at.twentythree,
                at.twentyfour,
                at.twentyfive,
                at.twentysix,
                at.twentyseven,
                at.twentyeight,
                at.twentynine,
                at.thirty,
                at.thirtyone,
                at.presentdays,
                at.eddays,
                at.status,
                m.firstname,
                m.lastname,
                m.texcono,
                m.serviceno,
                pr.name AS projectname,
                pr.projectno,
                cl.organization
                FROM attendance at

                INNER JOIN client cl ON
                    cl.clientid = at.clientid
                AND cl.active =1

                INNER JOIN project pr ON
                    pr.projectid = at.projectid
                    AND pr.active =1

                INNER JOIN member m ON
                    m.memberid = at.memberid
                    AND m.active =1

            WHERE at.active = 1
            AND  at.clientid = ?  AND at.projectid = ?   AND  at.monthandyear = ?;

            */
			});
			con.query(query, [clientid, projectid, monthandyear]).then(function (rows, fields) {
				var rowsReturned = rows.length;
				var result = [];
				var members = [];
				var attendance = {};
				if (rowsReturned > 0) {
					for (var i = 0; i < rowsReturned; i++) {
						var obj = new clientModel.members(rows[i].attendanceid, rows[i].memberid, rows[i].firstname, rows[i].texcono, rows[i].serviceno, rows[i].jobpostingdetailid, rows[i].one, rows[i].two, rows[i].three, rows[i].four, rows[i].five, rows[i].six, rows[i].seven, rows[i].eight, rows[i].nine, rows[i].ten, rows[i].eleven, rows[i].twelve, rows[i].thirteen, rows[i].fourteen, rows[i].fifteen, rows[i].sixteen, rows[i].seventeen, rows[i].eighteen, rows[i].nineteen, rows[i].twenty, rows[i].twentyone, rows[i].twentytwo, rows[i].twentythree, rows[i].twentyfour, rows[i].twentyfive, rows[i].twentysix, rows[i].twentyseven, rows[i].twentyeight, rows[i].twentynine, rows[i].thirty, rows[i].thirtyone, (rows[i].presentdays != undefined ? rows[i].presentdays : 0), (rows[i].otdays != undefined ? rows[i].otdays : 0), rows[i].status);
						members.push(obj);
						if ((i + 1 == rowsReturned) || (rows[i].projectid != rows[i + 1].projectid) || (rows[i].monthandyear != rows[i + 1].monthandyear)) {
							var attendance = new clientModel.attendance(rows[i].clientid, rows[i].projectid, rows[i].monthandyear, rows[i].changedby, members);
							result.push(attendance)
							members = [];
						}
					}
				}
				resolve(result);
			}).catch(function (err) {
				errorDAL.errorlog('Error',"clientDAL::getclientattendanceinfodetails",err.stack,JSON.stringify(clientid),"getclientattendanceinfodetails");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::getclientattendanceinfodetails",err.stack,JSON.stringify(clientid),"getclientattendanceinfodetails");
			reject(err);
		});
	});
}

module.exports.getimportdetails = function (projectno, serviceno, attend) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
					SELECT
						ja.jobpostingdetailid,
						ja.memberid,
						ja.clientid,
						p.projectid,
						ja.jobstatuscode
					FROM `project` p

					INNER JOIN jobactivity ja ON
						ja.projectid = p.projectid
						AND p.active = 1

					INNER JOIN member m ON
						m.memberid = ja.memberid
						AND p.active = 1

					WHERE p.projectno = ? AND m.serviceno= ?  AND ja.jobstatuscode = 2;
            	*/
			});
			con.query(query, [projectno, serviceno]).then(function (rows, fields) {
				var rowsReturned = rows.length;
				if (rowsReturned > 0) {
					resolve({
						"clientid": rows[0].clientid,
						"projectid": rows[0].projectid,
						"memberid": rows[0].memberid,
						"jobpostingdetailid": rows[0].jobpostingdetailid,
						"attend": attend
					})
				} else {
					reject("Employee not exist");
				}
			}).catch(function (err) {
				errorDAL.errorlog('Error',"clientDAL::getimportdetails",err.stack,JSON.stringify(projectno, serviceno, attend),"getimportdetails");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::getimportdetails",err.stack,JSON.stringify(projectno, serviceno, attend),"getimportdetails");
			reject(err);
		});
	});

}

module.exports.getattendanceexist = function (clientid, projectid, monthandyear, memberid, result) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			con.query(' SELECT attendanceid FROM `attendance`  WHERE (clientid = ? AND projectid = ? AND monthandyear = ? AND memberid = ?)', [clientid, projectid, monthandyear, memberid]).then(function (rows, fields) {
				var rowsReturned = rows.length;
				if (rowsReturned > 0) {
					result['attendanceid'] = rows[0].attendanceid;
					resolve(result);
				} else {
					result['attendanceid'] = 0;
					resolve(result);
				}
			}).catch(function (err) {
				errorDAL.errorlog('Error',"clientDAL::getattendanceexist",err.stack,JSON.stringify(clientid, projectid, monthandyear, memberid, result),"getattendanceexist");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::getattendanceexist",err.stack,JSON.stringify(clientid, projectid, monthandyear, memberid, result),"getattendanceexist");
			reject(err);
		});
	});
}

module.exports.importattendance = function (result, attendance) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = '';
			if (result.attendanceid == undefined) {
				query = con.format("INSERT INTO `attendance`(`clientid`, `projectid`, `memberid`, `jobpostingdetailid`, `monthandyear`, `one`, `two`, `three`, `four`, `five`, `six`, `seven`, `eight`, `nine`, `ten`, `eleven`, `twelve`, `thirteen`, `fourteen`, `fifteen`, `sixteen`, `seventeen`, `eighteen`, `nineteen`, `twenty`, `twentyone`, `twentytwo`, `twentythree`, `twentyfour`, `twentyfive`, `twentysix`, `twentyseven`, `twentyeight`, `twentynine`, `thirty`, `thirtyone`, `presentdays`, `eddays`, `status`, `changedby`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);", [result.clientid, result.projectid, result.memberid, result.jobpostingdetailid, attendance.MONTHANDYEAR, attendance.ONE, attendance.TWO, attendance.THREE, attendance.FOUR, attendance.FIVE, attendance.SIX, attendance.SEVEN, attendance.EIGHT, attendance.NINE, attendance.TEN, attendance.ELEVEN, attendance.TWELVE, attendance.THIRTEEN, attendance.FOURTEEN, attendance.FIFTEEN, attendance.SIXTEEN, attendance.SEVENTEEN, attendance.EIGHTEEN, attendance.NINETEEN, attendance.TWENTY, attendance.TWENTYONE, attendance.TWENTYTWO, attendance.TWENTYTHREE, attendance.TWENTYFOUR, attendance.TWENTYFIVE, attendance.TWENTYSIX, attendance.TWENTYSEVEN, attendance.TWENTYEIGHT, attendance.TWENTYNINE, attendance.THIRTY, attendance.THIRTYONE, attendance.PRESENTDAYS, attendance.OTDAYS, (attendance.status != undefined ? attendance.status : 0), attendance.changedby])
			} else {
				query = con.format("UPDATE `attendance` SET `one`=?,`two`=?,`three`=?,`four`=?,`five`=?,`six`=?,`seven`=?,`eight`=?,`nine`=?,`ten`=?,`eleven`=?,`twelve`=?,`thirteen`=?,`fourteen`=?,`fifteen`=?,`sixteen`=?,`seventeen`=?,`eighteen`=?,`nineteen`=?,`twenty`=?,`twentyone`=?,`twentytwo`=?,`twentythree`=?,`twentyfour`=?,`twentyfive`=?,`twentysix`=?,`twentyseven`=?,`twentyeight`=?,`twentynine`=?,`thirty`=?,`thirtyone`=? ,`presentdays`=?,`othours`=? WHERE `attendanceid` = ?;", [attendance.ONE, attendance.TWO, attendance.THREE, attendance.FOUR, attendance.FIVE, attendance.SIX, attendance.SEVEN, attendance.EIGHT, attendance.NINE, attendance.TEN, attendance.ELEVEN, attendance.TWELVE, attendance.THIRTEEN, attendance.FOURTEEN, attendance.FIFTEEN, attendance.SIXTEEN, attendance.SEVENTEEN, attendance.EIGHTEEN, attendance.NINETEEN, attendance.TWENTY, attendance.TWENTYONE, attendance.TWENTYTWO, attendance.TWENTYTHREE, attendance.TWENTYFOUR, attendance.TWENTYFIVE, attendance.TWENTYSIX, attendance.TWENTYSEVEN, attendance.TWENTYEIGHT, attendance.TWENTYNINE, attendance.THIRTY, attendance.THIRTYONE, attendance.PRESENTDAYS, attendance.OTDAYS, result.attendanceid])
			}
			con.query(query).then(function (rows, fields) {
				resolve("Success");
			}).catch(function (err) {
				errorDAL.errorlog('Error',"clientDAL::importattendance",err.stack,JSON.stringify(result, attendance),"importattendance");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::importattendance",err.stack,JSON.stringify(result, attendance),"importattendance");
			reject(err);
		});
	});
}

module.exports.getprojectexport = function (regionid, statusid, districtid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
				SELECT
					p.projectid,
					p.clientid,
					p.projectno,
					p.name AS projectname,
					p.districtid,
					lv.description AS 'district',
					p.regionid,
					lv1.description AS 'region',
					p.statusid,
					lv2.description AS 'projectstatus',
					p.designation,
					p.addressline1,
					p.addressline2,
					p.addressline3,
					p.pincode,
					p.active,
					cl.organization AS clientname,
					cl.image AS image,
					cl.approvalid,
					lv3.description AS 'approvalstatus'

				FROM `project` p

				INNER JOIN client cl ON
					cl.clientid = p.clientid
					AND cl.active = 1

				LEFT JOIN lookupvalue lv ON
					lv.lkvalid = p.districtid
					AND lv.active = 1

				LEFT JOIN lookupvalue lv1 ON
					lv1.lkvalid = p.regionid
					AND lv1.active = 1

				LEFT JOIN lookupvalue lv2 ON
					lv2.lkvalid = p.statusid
					AND lv2.active = 1

				INNER JOIN lookupvalue lv3 ON
					lv3.lkvalid = cl.approvalid
					AND lv3.active = 1  AND lv3.code != 'REJECT'

				WHERE p.active = 1

				AND (CASE WHEN ((? != 'undefined') AND (? != 'NULL') )
					THEN p.regionid IN (?)
					ELSE 1=1 END)

				AND (CASE WHEN (? != 'undefined' AND (? != 'NULL'))
					THEN p.statusid IN (?)
					ELSE 1=1 END)

				AND (CASE WHEN (? != 'undefined' AND (? != 'NULL') )
					THEN p.districtid IN (?)
					ELSE 1=1 END)

				*/
			});


			con.query(query, [regionid, regionid, regionid, statusid, statusid, statusid, districtid, districtid, districtid]).then(function (rows, fields) {
				var rowsReturned = rows.length;
				var result = [];
				if (rowsReturned > 0) {
					for (var i = 0; i < rowsReturned; i++) {
						var project = new clientModel.getprojectreport((i+1),rows[i].clientname, rows[i].projectno, rows[i].projectname, rows[i].districtid, rows[i].district, rows[i].regionid, rows[i].region, rows[i].statusid, rows[i].projectstatus, rows[i].designation, rows[i].addressline1, rows[i].addressline2, rows[i].addressline3, rows[i].pincode,'','');
						result.push(project);
					}
				}
				resolve(result);
			}).catch(function (err) {
				errorDAL.errorlog('Error',"clientDAL::getprojectexport",err.stack,JSON.stringify(regionid, statusid, districtid),"getprojectexport");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::getprojectexport",err.stack,JSON.stringify(regionid, statusid, districtid),"getprojectexport");
			reject(err);
		});
	});
} 
  
module.exports.getprojectamsexport = function (regionid,fromdate,todate) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
					SELECT
						p.projectid,
						p.clientid,
						p.projectno,
						p.name AS projectname,
						p.districtid,
						lv.description AS 'district',
						p.regionid,
						lv1.description AS 'region',
						p.statusid,
						lv2.description AS 'projectstatus',
						p.designation,
						p.addressline1,
						p.addressline2,
						p.addressline3,
						p.pincode,
						p.active,
						cl.organization AS clientname,
						cl.image AS image,
						cl.approvalid,
						lv3.description AS 'approvalstatus',
						p.updatedfields,
						p.amstatus

					FROM `project_ams` p

					INNER JOIN client_ams cl ON
						cl.clientid = p.clientid
						AND cl.active = 1

					LEFT JOIN lookupvalue lv ON
						lv.lkvalid = p.districtid
						AND lv.active = 1

					LEFT JOIN lookupvalue lv1 ON
						lv1.lkvalid = p.regionid
						AND lv1.active = 1

					LEFT JOIN lookupvalue lv2 ON
						lv2.lkvalid = p.statusid
						AND lv2.active = 1

					INNER JOIN lookupvalue lv3 ON
						lv3.lkvalid = cl.approvalid
						AND lv3.active = 1  AND lv3.code != 'REJECT'

					WHERE p.active = 1 AND DATE(p.modifdttm) BETWEEN (?) AND (?)

					AND (CASE WHEN ((? != 'undefined') AND (? != 'NULL') )
						THEN p.regionid IN (?)
						ELSE 1=1 END) AND p.amstatus != 0;
				*/
			});
			con.query(query, [fromdate,todate,regionid, regionid, regionid]).then(function (rows, fields) {
				var rowsReturned = rows.length;
				var result = [];
				if (rowsReturned > 0) {
					for (var i = 0; i < rowsReturned; i++) { 
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
						var project = new clientModel.getprojectreport((i+1),rows[i].clientname, rows[i].projectno, rows[i].projectname, rows[i].districtid, rows[i].district, rows[i].regionid, rows[i].region, rows[i].statusid, rows[i].projectstatus, rows[i].designation, rows[i].addressline1, rows[i].addressline2, rows[i].addressline3, rows[i].pincode,rows[i].updatedfields,amstatuss);
						result.push(project);
					}
				}
				resolve(result);
			}).catch(function (err) {
				errorDAL.errorlog('Error',"clientDAL::getprojectexport",err.stack,JSON.stringify(regionid),"getprojectexport");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::getprojectexport",err.stack,JSON.stringify(regionid, statusid, districtid),"getprojectexport");
			reject(err);
		});
	});
} 

module.exports.getclientexport = function (regionid,fromdate,todate) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
					SELECT cl.organization,cl.contactname,pr.projectno,pr.name AS projectname,cl.email,cl.mobile,cl.phone,cl.addressline1,cl.addressline2,cl.addressline3,cl.pincode,lv1.description AS region,
					lv.description AS district,lv2.description AS taluk,lv3.description AS state,lv4.description AS country,
					cl.gstno,cl.gsttanno,cl.panno,cl.tanno,lv5.description AS departmenttype,cl.department,lv6.description AS dept,cl.updatedfields,cl.amstatus
					FROM client_ams cl 
					INNER JOIN project_ams pr ON pr.clientid = cl.clientid AND pr.active = 1
					LEFT JOIN lookupvalue lv ON lv.lkvalid = cl.districtid AND lv.active = 1
					LEFT JOIN lookupvalue lv1 ON lv1.lkvalid = cl.regionid AND lv1.active = 1
					LEFT JOIN lookupvalue lv2 ON lv2.lkvalid = pr.regionid AND lv2.active = 1 
					LEFT JOIN lookupvalue lv3 ON lv3.lkvalid = cl.stateid AND lv3.active = 1
					LEFT JOIN lookupvalue lv4 ON lv4.lkvalid = cl.countryid AND lv4.active = 1
					LEFT JOIN lookupvalue lv5 ON lv5.lkvalid = cl.departmenttypeid AND lv5.active = 1
					LEFT JOIN lookupvalue lv6 ON lv6.lkvalid = cl.deptid AND lv6.active = 1
					WHERE cl.active = 1 AND DATE(cl.modifdttm) BETWEEN (?) AND (?)
					AND (CASE WHEN ((? != 'undefined') AND (? != 'NULL') ) THEN pr.regionid IN (?) ELSE 1=1 END) AND cl.amstatus != 0;
				*/
			});
			con.query(query, [fromdate,todate,regionid, regionid, regionid]).then(function (rows, fields) {
				var rowsReturned = rows.length;
				var result = [];
				if (rowsReturned > 0) {
					for (var i = 0; i < rowsReturned; i++) {
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
						var project = new clientModel.getclientreport((i+1),rows[i].organization,rows[i].contactname,rows[i].projectno,rows[i].projectname,rows[i].email,rows[i].mobile,rows[i].phone,rows[i].addressline1,rows[i].addressline2,rows[i].addressline3,rows[i].pincode,rows[i].region,rows[i].district,rows[i].taluk,rows[i].state,rows[i].country,rows[i].gstno,rows[i].gsttanno,rows[i].panno,rows[i].tanno,rows[i].departmenttype,rows[i].department,rows[i].dept,rows[i].updatedfields,amstatuss);
						result.push(project);
					}
				}
				resolve(result);
			}).catch(function (err) {
				errorDAL.errorlog('Error',"clientDAL::getprojectexport",err.stack,JSON.stringify(regionid, statusid, districtid),"getprojectexport");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::getprojectexport",err.stack,JSON.stringify(regionid, statusid, districtid),"getprojectexport");
			reject(err);
		});
	});
}

module.exports.getclientapproval = function (clientid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
              SELECT
                c.clientid,
                c.organization,
                c.contactname,
                c.image,
                c.email,
                c.mobile,
                c.password,
                c.addressline1,
                c.addressline2,
                c.addressline3,
                c.phone,
                c.gstno,
                c.tanno,
                c.panno,
                c.department,
                c.departmenttypeid,
                lv6.description AS 'departmenttype',
                c.pincode,
                c.districtid,
                lv.description AS 'district',
                c.talukid,
                lv1.description AS 'taluk',
                c.stateid,
                lv2.description AS 'state',
                c.countryid,
                lv3.description AS 'country',
                c.countryid,
                lv4.description AS 'dept',
                c.deptid,
                lv5.description AS 'approval',
                c.approvalid,
                c.active
            FROM client c

            INNER JOIN lookupvalue lv ON
                lv.lkvalid = c.districtid
            AND lv.active = 1

            INNER JOIN lookupvalue lv1 ON
                lv1.lkvalid = c.talukid
            AND lv1.active = 1

            INNER JOIN lookupvalue lv2 ON
                lv2.lkvalid = c.stateid
            AND lv2.active = 1

            INNER JOIN lookupvalue lv3 ON
                lv3.lkvalid = c.countryid
            AND lv3.active = 1

            INNER JOIN lookupvalue lv4 ON
                lv4.lkvalid = c.deptid
            AND lv4.active = 1

            INNER JOIN lookupvalue lv5 ON
                lv5.lkvalid = c.approvalid
            AND lv5.active = 1

            INNER JOIN lookupvalue lv6 ON
                lv6.lkvalid = c.departmenttypeid
            AND lv6.active = 1

            WHERE c.active =1
            AND case ? when 0 then 1 = 1 else  c.clientid = ? end

            ORDER BY  c.organization, c.clientid

            */
			});
			con.query(query, [clientid, clientid]).then(function (rows, fields) {
				var rowsReturned = rows.length;
				var result = [];
				if (rowsReturned > 0) {
					for (var i = 0; i < rowsReturned; i++) {
						var client = new clientModel.getclient(rows[i].clientid, rows[i].organization, rows[i].contactname, rows[i].image, rows[i].email, rows[i].mobile, rows[i].phone, rows[i].gstno, rows[i].tanno, rows[i].panno, rows[i].password, rows[i].addressline1, rows[i].addressline2, rows[i].addressline3, rows[i].pincode, rows[i].districtid, rows[i].district, rows[i].talukid, rows[i].taluk, rows[i].stateid, rows[i].state, rows[i].countryid, rows[i].country, rows[i].departmenttypeid, rows[i].departmenttype, rows[i].department, rows[i].deptid, rows[i].dept, rows[i].approvalid, rows[i].approval, rows[i].active, '', '', 0, 0,0,'',0);
						result.push(client);
					}
				}
				resolve(result);
			}).catch(function (err) {
				errorDAL.errorlog('Error',"clientDAL::getclientapproval",err.stack,JSON.stringify(clientid),"getclientapproval");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::getclientapproval",err.stack,JSON.stringify(clientid),"getclientapproval");
			reject(err);
		});
	});
}

module.exports.getattendanceexport = function (clientid, projectid, monthandyear) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
					SELECT mem.firstname,mem.lastname,mem.texcono,mem.serviceno,att.presentdays,att.eddays,		att.monthandyear,prr.projectno,prr.name,jm.code,cll.organization,att.one,att.two,att.three,att.four,att.five,att.six,att.seven,att.eight,att.nine,att.ten,att.eleven,att.twelve,att.thirteen,att.fourteen,att.fifteen,att.sixteen,att.seventeen,att.eighteen,att.nineteen,att.twenty,att.twentyone,att.twentytwo,att.twentythree,att.twentyfour,att.twentyfive,att.twentysix,
					att.twentyseven,att.twentyeight,att.twentynine,att.thirty,att.thirtyone
					FROM attendance att 
					INNER JOIN member mem ON mem.memberid = att.memberid
					INNER JOIN project prr ON prr.projectid = att.projectid
					INNER JOIN client cll ON cll.clientid = prr.clientid
					INNER JOIN jobmaster jm ON jm.jobmasterid = att.jobmasterid
					WHERE att.active = 1 
					AND CASE ? WHEN 0 THEN 1 = 1 ELSE cll.clientid = ? END
					AND CASE ? WHEN 0 THEN 1 = 1 ELSE att.projectid = ? END
					AND att.monthandyear = ?
            	*/
			});
			con.query(query, [clientid, clientid, projectid, projectid, monthandyear]).then(function (rows, fields) {
				var rowsReturned = rows.length;
				var result = [];
				var members = [];
				var attendance = {};
				if (rowsReturned > 0) {
					for (var i = 0; i < rowsReturned; i++) {
						var obj = new clientModel.attendanceexport(rows[i].firstname,rows[i].lastname,rows[i].texcono,rows[i].serviceno,rows[i].presentdays,rows[i].eddays,rows[i].monthandyear,rows[i].projectno,rows[i].name,rows[i].code,rows[i].organization,rows[i].one,rows[i].two,rows[i].three,rows[i].four,rows[i].five,rows[i].six,rows[i].seven,rows[i].eight,rows[i].nine,rows[i].ten,rows[i].eleven,rows[i].twelve,rows[i].thirteen,rows[i].fourteen,rows[i].fifteen,rows[i].sixteen,rows[i].seventeen,rows[i].eighteen,rows[i].nineteen,rows[i].twenty,rows[i].twentyone,rows[i].twentytwo,rows[i].twentythree,rows[i].twentyfour,rows[i].twentyfive,rows[i].twentysix,rows[i].twentyseven,rows[i].twentyeight,rows[i].twentynine,rows[i].thirty,rows[i].thirtyone);
						members.push(obj);
					}
				}
				resolve(members);
			}).catch(function (err) {
				errorDAL.errorlog('Error',"clientDAL::getattendanceexport",err.stack,JSON.stringify(clientid),"getattendanceexport");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::getattendanceexport",err.stack,JSON.stringify(clientid),"getattendanceexport");
			reject(err);
		});
	});
}

module.exports.getprojectsno = function () {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			con.query('SELECT projectid, projectno, clientid FROM `project` ORDER BY projectno;').then(function (rows, fields) {
				var rowsReturned = rows.length;
				var result = [];
				if (rowsReturned > 0) {
					for (var i = 0; i < rowsReturned; i++) {
						var proj = {
							'projectid': rows[i].projectid,
							'projectno': rows[i].projectno,
							'clientid': rows[i].clientid
						};
						result.push(proj);
					}
				}
				resolve(result);
			}).catch(function (err) {
				errorDAL.errorlog('Error',"clientDAL::getprojectsno",err.stack,'',"getprojectsno");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::getprojectsno",err.stack,'',"getprojectsno");
			reject(err);
		});
	});
}

module.exports.getprojectnumber = function (regionid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			con.query('SELECT projectid, projectno,clientid,name FROM `project` WHERE case ? when 0 then 1 = 1 else regionid = ? END ORDER BY projectno;',[regionid,regionid]).then(function (rows, fields) {
				var rowsReturned = rows.length;
				var result = [];
				if (rowsReturned > 0) {
					for (var i = 0; i < rowsReturned; i++) {
						var proj = {
							'projectid': rows[i].projectid,
							'projectno': rows[i].projectno,
							'projectname': rows[i].name,
							'clientid': rows[i].clientid
						};
						result.push(proj);
					}
				}
				resolve(result);
			}).catch(function (err) {
				errorDAL.errorlog('Error',"clientDAL::getprojectnumber",err.stack,regionid,"getprojectnumber");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::getprojectnumber",err.stack,regionid,"getprojectnumber");
			reject(err);
		});
	});
}

module.exports.getclientDetailsforList = function (regionid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
					  SELECT cl.clientid,cl.organization,cl.contactname 
					  FROM `client` cl
					  INNER JOIN `project` pr ON pr.clientid = cl.clientid
					  WHERE case ? when 0 then 1 = 1 else cl.regionid = ? END GROUP BY cl.clientid;
            	*/
			});
			con.query(query,[regionid,regionid]).then(function (rows, fields) {
				var rowsReturned = rows.length;
				var result = [];
				if (rowsReturned > 0) {
					for (var i = 0; i < rowsReturned; i++) {
						var proj = {
							'clientid': rows[i].clientid,
							'organization': rows[i].organization,
							'contactname': rows[i].contactname
						};
						result.push(proj);
					}
				}
				resolve(result);
			}).catch(function (err) {
				errorDAL.errorlog('Error',"clientDAL::getclientDetailsforList",err.stack,regionid,"getclientDetailsforList");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::getclientDetailsforList",err.stack,regionid,"getclientDetailsforList");
			reject(err);
		});
	});
}

module.exports.getprojectsnobyclient = function (clientid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			con.query('SELECT projectid, projectno, clientid FROM `project` WHERE clientid = ? ORDER BY projectno;', [clientid]).then(function (rows, fields) {
				console.log('rows', rows);
				var rowsReturned = rows.length;
				var result = [];
				if (rowsReturned > 0) {
					for (var i = 0; i < rowsReturned; i++) {
						var proj = {
							'projectid': rows[i].projectid,
							'projectno': rows[i].projectno,
							'clientid': rows[i].clientid
						};
						result.push(proj);
					}
				}
				resolve(result);
			}).catch(function (err) {
				errorDAL.errorlog('Error',"clientDAL::getprojectsnobyclient",err.stack,clientid,"getprojectsnobyclient");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::getprojectsnobyclient",err.stack,clientid,"getprojectsnobyclient");
			reject(err);
		});
	});
}

module.exports.getprojectsnoforjobposting = function () {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
            SELECT p.projectid, p.projectno, p.clientid,p.name,cl.organization FROM `project` p
            
            INNER JOIN agreementinfo ai ON
            ai.projectid = p.projectid
			AND ai.active = 1
			
			INNER JOIN client cl ON
            cl.clientid = p.clientid
            AND cl.active = 1
            
            INNER JOIN agreement ag ON
            ag.agreementid = ai.agreementid
            AND ag.active = 1 
            where p.active =1 
				 GROUP BY projectno
                ORDER BY projectno
             */
			});
			con.query(query).then(function (rows, fields) {
				var rowsReturned = rows.length;
				var result = [];
				if (rowsReturned > 0) {
					for (var i = 0; i < rowsReturned; i++) {
						var proj = {
							'name': rows[i].name,
							'projectid': rows[i].projectid,
							'projectno': rows[i].projectno,
							'clientid': rows[i].clientid,
							'organization': rows[i].organization
						};
						result.push(proj);
					}
				}
				resolve(result);
			}).catch(function (err) {
				errorDAL.errorlog('Error',"clientDAL::getprojectsnoforjobposting",err.stack,'',"getprojectsnoforjobposting");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::getprojectsnoforjobposting",err.stack,'',"getprojectsnoforjobposting");
			reject(err);
		});
	});
}

module.exports.getclientimages = function () {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
              SELECT

                DISTINCT(image) AS image

             FROM

                client;

            */
			});
			con.query(query).then(function (rows, fields) {
				var rowsReturned = rows.length;
				var result = [];
				if (rowsReturned > 0) {
					for (var i = 0; i < rowsReturned; i++) {
						result.push(rows[i].image);
					}
				}
				resolve(result);
			}).catch(function (err) {
				errorDAL.errorlog('Error',"clientDAL::getclientimages",err.stack,'',"getclientimages");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::getclientimages",err.stack,'',"getclientimages");
			reject(err);
		});
	});
}

module.exports.getattendancereview = function (clientid, projectid, monthandyear) {
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
						att.edstatus,
						att.edhold,     
						att.athold,             
						jm.code,
						jm.name,
						m.firstname,
						m.lastname,
						m.texcono,
						m.serviceno,
						m.accountno,
						att.reason,
						att.reason_others,
						att.cashier_rejected,
						att.cao_rejected
					FROM attendance att
					INNER JOIN jobmaster jm ON
						jm.jobmasterid = att.jobmasterid AND jm.active = 1
					INNER JOIN member m ON
						m.memberid = att.memberid AND m.active = 1	
					WHERE att.active = 1 AND att.projectid = ? AND att.monthandyear = ?
					ORDER BY att.status, att.attendanceid, att.memberid
            	*/
			});
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
					
						var attendance = new clientModel.attendancereview(rows[i].attendanceid, rows[i].memberid, rows[i].firstname, rows[i].texcono, rows[i].jobpostingdetailid, rows[i].presentdays, rows[i].eddays, rows[i].othours, rows[i].status, rows[i].edhold, rows[i].clientid, rows[i].projectid, rows[i].monthandyear, rows[i].code, rows[i].category, rows[i].serviceno, hold, rows[i].jobmasterid, rows[i].accountno,rows[i].athold, rows[i].reason,isedhold, rows[i].edstatus,rows[i].reason_others,rows[i].cashier_rejected,rows[i].cao_rejected);
						result.push(attendance)
						hold = 0;
						isedhold = 0;
					}
					resolve(result);
				} else {
					resolve(result);	
				}
			}).catch(function (err) {
				errorDAL.errorlog('Error',"clientDAL::getattendancereview",err.stack,JSON.stringify(clientid, projectid, monthandyear),"getattendancereview");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::getattendancereview",err.stack,JSON.stringify(clientid, projectid, monthandyear),"getattendancereview");
			reject(err);
		});
	});
}

module.exports.getattendancereviewlist = function (clientid, projectid, monthandyear) {
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
						jm.code,
						jm.name,
						m.firstname,
						m.lastname,
						m.texcono,
						m.serviceno,
						m.accountno
					FROM attendance att
					INNER JOIN jobmaster jm ON
						jm.jobmasterid = att.jobmasterid AND jm.active = 1
					INNER JOIN member m ON
						m.memberid = att.memberid AND m.active = 1			
					WHERE (att.status != 0) AND att.projectid = ? AND att.monthandyear = ?
					ORDER BY att.status, att.attendanceid, att.memberid
            	*/
			});
			con.query(query, [projectid, monthandyear]).then(function (rows, fields) {
				var rowsReturned = rows.length;
				var result = [];
				var results = [];
				var wagerate = 0;
				var hold = 0;
				var totalduties = 0;
				var attype = 0;
				if (rowsReturned > 0) {
					var attype = 1;
					for (var i = 0; i < rowsReturned; i++) {
						if (rows[i].status == 2) {
							hold = 1;
						}
						var attendance = new clientModel.attendancereview(rows[i].attendanceid, rows[i].memberid, rows[i].firstname, rows[i].texcono, rows[i].jobpostingdetailid, rows[i].presentdays, rows[i].eddays, rows[i].othours, rows[i].status, rows[i].edhold, rows[i].clientid, rows[i].projectid, rows[i].monthandyear, rows[i].code, rows[i].category, rows[i].serviceno, hold, rows[i].jobmasterid, rows[i].accountno);
						result.push(attendance)
						hold = 0;
					}
					results.push(result);
					results.push(attype);
					resolve(results);
				}
			}).catch(function (err) {
				errorDAL.errorlog('Error',"clientDAL::getattendancereviewlist",err.stack,JSON.stringify(clientid, projectid, monthandyear),"getattendancereviewlist");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::getattendancereviewlist",err.stack,JSON.stringify(clientid, projectid, monthandyear),"getattendancereviewlist");
			reject(err);
		});
	});
}

module.exports.getattendancereviewview = function (clientid, projectid, monthandyear) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
				SELECT
				    att.clientid,
				    att.projectid,
				    att.memberid,
				    att.jobpostingdetailid,
				    att.monthandyear,
				    att.attendanceid,
				    att.presentdays,
				    att.eddays,
				    att.othours,
				    att.status,
				    att.edhold,                  
				    jm.code,
				    jm.name,
				    ag.agreementid,
				    ag.servicecharge,
				    ag.tax,
				    wg.wageid,
				    wg.wagetypeid,
				    IFNULL(wg.particularamount, 0) AS particularamount,
				    m.firstname,
				    m.lastname,
				    m.texcono,
				    m.serviceno,
				    lv.code AS particularcode
				
				FROM

				attendance att
				
				INNER JOIN jobpostingdetail jpd ON
				    jpd.jobpostingdetailid = att.jobpostingdetailid AND jpd.active = 1
				
				INNER JOIN jobmaster jm ON
				    jm.jobmasterid = jpd.jobmasterid AND jm.active = 1
				
				INNER JOIN agreement ag ON
				    ag.clientid = att.clientid AND ag.active = 1
				
				LEFT JOIN wages wg ON
				    jm.jobmasterid = wg.jobmasterid AND (wg.wageareaid = ag.wageareaid OR wg.wageyearid = ag.wageyearid) AND wg.active = 1
				
				LEFT JOIN lookupvalue lv ON
				    lv.lkvalid = wg.particularid AND lv.active = 1
				                
				INNER JOIN member m ON
				    m.memberid = att.memberid AND m.active = 1
				                
				WHERE (att.status != 0) AND att.projectid = ? AND att.monthandyear = ?
				
				ORDER BY att.status, jpd.jobpostingdetailid, att.attendanceid, att.memberid, wg.wageid
				*/
			});
			con.query(query, [projectid, monthandyear]).then(function (rows, fields) {
				console.log('rows...rows', rows);
				var rowsReturned = rows.length;
				var result = [];
				var results = [];
				var wagerate = 0;
				var hold = 0;
				var totalduties = 0;
				var attype = 0;
				if (rowsReturned > 0) {
					var attype = 2;
					for (var i = 0; i < rowsReturned; i++) {
						if (rows[i].particularcode == 'RATEHD') {
							wagerate += rows[i].particularamount;
						}
						if (rows[i].status == 2) {
							hold = 1;
						}
						if ((i + 1 == rowsReturned) || (rows[i].attendanceid != rows[i + 1].attendanceid)) {

							totalduties = rows[i].presentdays
							var attendance = new clientModel.attendancereview(rows[i].attendanceid, rows[i].memberid, rows[i].firstname, rows[i].texcono, rows[i].jobpostingdetailid, rows[i].one, rows[i].two, rows[i].three, rows[i].four, rows[i].five, rows[i].six, rows[i].seven, rows[i].eight, rows[i].nine, rows[i].ten, rows[i].eleven, rows[i].twelve, rows[i].thirteen, rows[i].fourteen, rows[i].fifteen, rows[i].sixteen, rows[i].seventeen, rows[i].eighteen, rows[i].nineteen, rows[i].twenty, rows[i].twentyone, rows[i].twentytwo, rows[i].twentythree, rows[i].twentyfour, rows[i].twentyfive, rows[i].twentysix, rows[i].twentyseven, rows[i].twentyeight, rows[i].twentynine, rows[i].thirty, rows[i].thirtyone, totalduties, rows[i].eddays, rows[i].othours, rows[i].status, rows[i].edhold, rows[i].clientid, rows[i].projectid, rows[i].monthandyear, rows[i].projectno, rows[i].projectname, rows[i].organization, rows[i].code, rows[i].category, wagerate, rows[i].tax, rows[i].servicecharge, rows[i].serviceno, hold);
							result.push(attendance);
							members = [];
							wagerate = 0;
							totalduties = 0;
							hold = 0;
						}
					}
					results.push(result);
					results.push(attype);
				}
			}).catch(function (err) {
				errorDAL.errorlog('Error',"clientDAL::getattendancereviewview",err.stack,JSON.stringify(clientid, projectid, monthandyear),"getattendancereviewview");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::getattendancereviewview",err.stack,JSON.stringify(clientid, projectid, monthandyear),"getattendancereviewview");
			reject(err);
		});
	});
}
//test


// module.exports.updateattendnacestatus = function (clientid, projectid, monthandyear, status, unedholdids,unholdids, unholdidstatus, unedholdidstatus) {
	
// 	return new app.promise(function (resolve, reject) {
// 		mySqlConnection.connection().then(function (con) {
// 			var query = '';
// 			if(unholdidstatus != undefined) {
// 				for (var i = 0; i < unholdidstatus.length; i++) {
// 					if(unholdidstatus[i].status == 0 || unholdidstatus[i].status == 1) {
// 						query += con.format("UPDATE attendance SET status = 1, edstatus = 0 ,attendancereviewed = ?, athold = 0, cashier_rejected = 0, cao_rejected = 0 WHERE projectid = ? AND monthandyear = ? AND status IN (0,1) AND athold IN (0,1) AND attendanceid = ?;", [new Date(), projectid, monthandyear, unholdidstatus[i].attendanceid]);
// 						query += con.format("UPDATE attendance SET edstatus = 1 WHERE projectid = ? AND monthandyear = ? AND status IN (0,1) AND edhold = 1 AND attendanceid = ?;", [projectid, monthandyear, unholdidstatus[i].attendanceid]);
// 					}  
// 					if(unholdidstatus[i].status == 7) {
// 						query += con.format("UPDATE attendance SET status = 1, edstatus = 0 ,attendancereviewed = ?, athold = 0, cashier_rejected = 0, cao_rejected = 0 WHERE projectid = ? AND monthandyear = ? AND status = 7 AND athold = 0 AND attendanceid = ?;", [new Date(), projectid, monthandyear, unholdidstatus[i].attendanceid]);
// 						query += con.format("UPDATE attendance SET edstatus = 1 WHERE projectid = ? AND monthandyear = ? AND status IN (0,1) AND edhold = 1 AND attendanceid = ?;", [projectid, monthandyear, unholdidstatus[i].attendanceid]);
// 						query += con.format("UPDATE salaryslip SET active = 0 WHERE projectid = ? AND monthandyear = ? AND (cashier_rejected = 1 OR cao_rejected = 1);", [projectid, monthandyear]);
// 						query += con.format("UPDATE invoice SET active = 0 WHERE projectid = ? AND monthandyear = ? AND (cashier_rejected = 1 OR cao_rejected = 1);", [projectid, monthandyear]);
// 					}
// 					if(unholdidstatus[i].status == 2 || unholdidstatus[i].status == 3 || unholdidstatus[i].status == 4 || unholdidstatus[i].status == 5 || unholdidstatus[i].status == 6) {
// 						query += con.format("UPDATE attendance SET status = 8, edstatus = 1, attendancereviewed = ?, athold = 0, cashier_rejected = 0, cao_rejected = 0 WHERE projectid = ? AND monthandyear = ? AND status IN (2,3,4,5,6) AND attendanceid = ?;", [new Date(), projectid, monthandyear,  unholdidstatus[i].attendanceid]);
// 					}
// 				}
// 			}
			
// 			if(unedholdidstatus != undefined) {
// 				for (var i = 0; i < unedholdidstatus.length; i++) {
// 					if(unedholdidstatus[i].status == 0 || unedholdidstatus[i].status == 1 || unedholdidstatus[i].status == 7) {
// 						query += con.format("UPDATE attendance SET edhold = 0, edstatus = 0, cashier_rejected = 0, cao_rejected = 0 WHERE projectid= ? AND monthandyear = ? AND attendanceid = ? AND athold = 0;", [projectid, monthandyear, unedholdidstatus[i].attendanceid]);
// 					} 

// 					if((unedholdidstatus[i].status == 2 || unedholdidstatus[i].status == 3 || unedholdidstatus[i].status == 4 || unedholdidstatus[i].status == 5 || unedholdidstatus[i].status == 6) && unedholdidstatus[i].edstatus == 1) {

// 						query += con.format("UPDATE attendance SET status = 8, edhold = 0, edstatus = 1, cashier_rejected = 0, cao_rejected = 0 WHERE projectid= ? AND monthandyear = ? AND attendanceid = ? AND edstatus = 1;", [projectid, monthandyear, unedholdidstatus[i].attendanceid]);

// 					} else if((unedholdidstatus[i].status == 2 || unedholdidstatus[i].status == 3 || unedholdidstatus[i].status == 4 || unedholdidstatus[i].status == 5 || unedholdidstatus[i].status == 6) && unedholdidstatus[i].edstatus == 0) {

// 						query += con.format("UPDATE attendance SET edhold = 0, edstatus = 0, cashier_rejected = 0, cao_rejected = 0 WHERE projectid= ? AND monthandyear = ? AND attendanceid = ?;", [projectid, monthandyear, unedholdidstatus[i].attendanceid]);

// 					}
// 				}
// 			}
// 			con.query(query).then(function (rows, fields) {
// 				resolve("Success")
// 			}).catch(function (err) {
// 				// console.log('err',err);
// 				reject(err);
// 			});
// 		}).catch(function (err) {
// 			reject(err);
// 		});
// 	});
// }

module.exports.updateattendnacestatus = function (clientid, projectid, monthandyear, status, unedholdids,unholdids,unholdidstatus, unedholdidstatus) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = '';
			if(unedholdidstatus != undefined) {
				for (var i = 0; i < unedholdidstatus.length; i++) {
					if(unedholdidstatus[i].status == 0 || unedholdidstatus[i].status == 1 || unedholdidstatus[i].status == 7) {
						query += con.format("UPDATE attendance SET edhold = 0, edstatus = 0, cashier_rejected = 0, cao_rejected = 0 WHERE projectid= ? AND monthandyear = ? AND attendanceid = ? AND athold = 0;", [projectid, monthandyear, unedholdidstatus[i].attendanceid]);
					} 
					if((unedholdidstatus[i].status == 2 || unedholdidstatus[i].status == 3 || unedholdidstatus[i].status == 4 || unedholdidstatus[i].status == 5 || unedholdidstatus[i].status == 6) && unedholdidstatus[i].edstatus == 1) {
						var othours = 0;
						if(unedholdidstatus[i].jobmasterid == 3) {
							othours = parseFloat(unedholdidstatus[i].eddays) * 8;
						}   
						query += con.format("INSERT INTO `attendance`(`clientid`, `projectid`, `memberid`, `jobmasterid`,`monthandyear`, `presentdays`, `eddays`, `status`, `edstatus`,`attendancesubmitted`,`attendancereviewed`,`othours`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?);", [clientid,projectid,unedholdidstatus[i].memberid, unedholdidstatus[i].jobmasterid,monthandyear, 0 , unedholdidstatus[i].eddays,1,0,1,new Date(),othours]);

						query += con.format("UPDATE attendance SET edhold = 0, cashier_rejected = 0, cao_rejected = 0 WHERE projectid= ? AND monthandyear = ? AND attendanceid = ? AND edstatus = 1;", [projectid, monthandyear, unedholdidstatus[i].attendanceid]);

					} else if((unedholdidstatus[i].status == 2 || unedholdidstatus[i].status == 3 || unedholdidstatus[i].status == 4 || unedholdidstatus[i].status == 5 || unedholdidstatus[i].status == 6) && unedholdidstatus[i].edstatus == 0) {
						
						query += con.format("UPDATE attendance SET edhold = 0, edstatus = 0, cashier_rejected = 0, cao_rejected = 0 WHERE projectid= ? AND monthandyear = ? AND attendanceid = ?;", [projectid, monthandyear, unedholdidstatus[i].attendanceid]);
					}
				}
			}
			query += con.format("UPDATE attendance SET status = ?, attendancereviewed = ?, athold = 0,cashier_rejected = 0,cao_rejected = 0 WHERE projectid= ? AND monthandyear = ? AND status IN (0,7) AND athold IN (0,1) AND attendanceid IN (?);", [status, new Date(), projectid, monthandyear, unholdids]);

			query += con.format("UPDATE salaryslip SET active = 0 WHERE projectid = ? AND monthandyear = ? AND (cashier_rejected = 1 OR cao_rejected = 1);", [projectid, monthandyear]);

			query += con.format("UPDATE invoice SET active = 0 WHERE projectid = ? AND monthandyear = ? AND (cashier_rejected = 1 OR cao_rejected = 1);", [projectid, monthandyear]);

			con.query(query).then(function (rows, fields) {
				resolve("Success")
			}).catch(function (err) {
				errorDAL.errorlog('Error',"clientDAL::updateattendnacestatus",err.stack,JSON.stringify(query),"updateattendnacestatus");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::updateattendnacestatus",err.stack,JSON.stringify(clientid, projectid, monthandyear),"updateattendnacestatus");
			reject(err);
		});
	});
}

module.exports.getattendance = function (projectid, monthandyear) {
	var attendacemonth = new Date(monthandyear);
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
					SELECT
						at.attendanceid,
						at.clientid,
						at.projectid,
						at.memberid,
						at.jobpostingdetailid,
						at.monthandyear,
						at.one,
						at.two,
						at.three,
						at.four,
						at.five,
						at.six,
						at.seven,
						at.eight,
						at.nine,
						at.ten,
						at.eleven,
						at.twelve,
						at.thirteen,
						at.fourteen,
						at.fifteen,
						at.sixteen,
						at.seventeen,
						at.eighteen,
						at.nineteen,
						at.twenty,
						at.twentyone,
						at.twentytwo,
						at.twentythree,
						at.twentyfour,
						at.twentyfive,
						at.twentysix,
						at.twentyseven,
						at.twentyeight,
						at.twentynine,
						at.thirty,
						at.thirtyone,
						'0'  AS od1one,
						'0'  AS od1two,
						'0'  AS od1three,
						'0'  AS od1four,
						'0'  AS od1five,
						'0'  AS od1six,
						'0'  AS od1seven,
						'0'  AS od1eight,
						'0'  AS od1nine,
						'0'  AS od1ten,
						'0'  AS od1eleven,
						'0'  AS od1twelve,
						'0'  AS od1thirteen,
						'0'  AS od1fourteen,
						'0'  AS od1fifteen,
						'0'  AS od1sixteen,
						'0'  AS od1seventeen,
						'0'  AS od1eighteen,
						'0'  AS od1nineteen,
						'0'  AS od1twenty,
						'0'  AS od1twentyone,
						'0'  AS od1twentytwo,
						'0'  AS od1twentythree,
						'0'  AS od1twentyfour,
						'0'  AS od1twentyfive,
						'0'  AS od1twentysix,
						'0'  AS od1twentyseven,
						'0'  AS od1twentyeight,
						'0'  AS od1twentynine,
						'0'  AS od1thirty,
						'0'  AS od1thirtyone,
						'0'  AS od2one,
						'0'  AS od2two,
						'0'  AS od2three,
						'0'  AS od2four,
						'0'  AS od2five,
						'0'  AS od2six,
						'0'  AS od2seven,
						'0'  AS od2eight,
						'0'  AS od2nine,
						'0'  AS od2ten,
						'0'  AS od2eleven,
						'0'  AS od2twelve,
						'0'  AS od2thirteen,
						'0'  AS od2fourteen,
						'0'  AS od2fifteen,
						'0'  AS od2sixteen,
						'0'  AS od2seventeen,
						'0'  AS od2eighteen,
						'0'  AS od2nineteen,
						'0'  AS od2twenty,
						'0'  AS od2twentyone,
						'0'  AS od2twentytwo,
						'0'  AS od2twentythree,
						'0'  AS od2twentyfour,
						'0'  AS od2twentyfive,
						'0'  AS od2twentysix,
						'0'  AS od2twentyseven,
						'0'  AS od2twentyeight,
						'0'  AS od2twentynine,
						'0'  AS od2thirty,
						'0'  AS od2thirtyone,
						at.presentdays,
						at.othours,
						at.status,
						m.firstname,
						m.lastname,
						m.texcono,
						m.serviceno,
						pr.name AS projectname,
						pr.projectno,
						cl.organization,
						jm.code AS jobcode,
						jm.name AS jobname
						
						FROM attendance at

						INNER JOIN client cl ON
							cl.clientid = at.clientid
						AND cl.active =1

						INNER JOIN project pr ON
							pr.projectid = at.projectid
							AND pr.active =1

						INNER JOIN member m ON
							m.memberid = at.memberid
							AND m.active =1
						
						INNER JOIN jobpostingdetail jpd ON
							jpd.jobpostingdetailid = at.jobpostingdetailid
							AND jpd.active =1
						
						INNER JOIN jobmaster jm ON
							jm.jobmasterid = jpd.jobmasterid
							AND jm.active =1
					WHERE at.active = 1
					AND  at.projectid = ?   AND  at.monthandyear = ? AND m.lastaccess >= now() - interval 90 day AND at.attendancesubmitted=0;
            	*/
			});
			con.query(query, [projectid, monthandyear]).then(function (rows, fields) {
				var rowsReturned = rows.length;
				var result = [];
				var members = [];
				var attendance = {};
				if (rowsReturned > 0) {
					for (var i = 0; i < rowsReturned; i++) {

						if (rows[i].jobcode != 'DVR') {
							if (rows[i].one == 1) {
								rows[i].one = 1;
								rows[i].od1one = 0;
								rows[i].od2one = 0;
							}
							if (rows[i].two == 1) {
								rows[i].two = 1;
								rows[i].od1two = 0;
								rows[i].od2two = 0;
							}
							if (rows[i].three == 1) {
								rows[i].three = 1;
								rows[i].od1three = 0;
								rows[i].od2three = 0;
							}
							if (rows[i].four == 1) {
								rows[i].four = 1;
								rows[i].od1four = 0;
								rows[i].od2four = 0;
							}
							if (rows[i].five == 1) {
								rows[i].five = 1;
								rows[i].od1five = 0;
								rows[i].od2five = 0;
							}
							if (rows[i].six == 1) {
								rows[i].six = 1;
								rows[i].od1six = 0;
								rows[i].od2six = 0;
							}
							if (rows[i].seven == 1) {
								rows[i].seven = 1;
								rows[i].od1seven = 0;
								rows[i].od2seven = 0;
							}
							if (rows[i].eight == 1) {
								rows[i].eight = 1;
								rows[i].od1eight = 0;
								rows[i].od2eight = 0;
							}
							if (rows[i].nine == 1) {
								rows[i].nine = 1;
								rows[i].od1nine = 0;
								rows[i].od2nine = 0;
							}
							if (rows[i].ten == 1) {
								rows[i].ten = 1;
								rows[i].od1ten = 0;
								rows[i].od2ten = 0;
							}
							if (rows[i].eleven == 1) {
								rows[i].eleven = 1;
								rows[i].od1eleven = 0;
								rows[i].od2eleven = 0;
							}
							if (rows[i].twelve == 1) {
								rows[i].twelve = 1;
								rows[i].od1twelve = 0;
								rows[i].od2twelve = 0;
							}
							if (rows[i].thirteen == 1) {
								rows[i].thirteen = 1;
								rows[i].od1thirteen = 0;
								rows[i].od2thirteen = 0;
							}
							if (rows[i].fourteen == 1) {
								rows[i].fourteen = 1;
								rows[i].od1fourteen = 0;
								rows[i].od2fourteen = 0;
							}
							if (rows[i].fifteen == 1) {
								rows[i].fifteen = 1;
								rows[i].od1fifteen = 0;
								rows[i].od2fifteen = 0;
							}
							if (rows[i].sixteen == 1) {
								rows[i].sixteen = 1;
								rows[i].od1sixteen = 0;
								rows[i].od2sixteen = 0;
							}
							if (rows[i].seventeen == 1) {
								rows[i].seventeen = 1;
								rows[i].od1seventeen = 0;
								rows[i].od2seventeen = 0;
							}
							if (rows[i].eighteen == 1) {
								rows[i].eighteen = 1;
								rows[i].od1eighteen = 0;
								rows[i].od2eighteen = 0;
							}
							if (rows[i].nineteen == 1) {
								rows[i].nineteen = 1;
								rows[i].od1nineteen = 0;
								rows[i].od2nineteen = 0;
							}
							if (rows[i].twenty == 1) {
								rows[i].twenty = 1;
								rows[i].od1twenty = 0;
								rows[i].od2twenty = 0;
							}
							if (rows[i].twentyone == 1) {
								rows[i].twentyone = 1;
								rows[i].od1twentyone = 0;
								rows[i].od2twentyone = 0;
							}
							if (rows[i].twentytwo == 1) {
								rows[i].twentytwo = 1;
								rows[i].od1twentytwo = 0;
								rows[i].od2twentytwo = 0;
							}
							if (rows[i].twentythree == 1) {
								rows[i].twentythree = 1;
								rows[i].od1twentythree = 0;
								rows[i].od2twentythree = 0;
							}
							if (rows[i].twentyfour == 1) {
								rows[i].twentyfour = 1;
								rows[i].od1twentyfour = 0;
								rows[i].od2twentyfour = 0;
							}
							if (rows[i].twentyfive == 1) {
								rows[i].twentyfive = 1;
								rows[i].od1twentyfive = 0;
								rows[i].od2twentyfive = 0;
							}
							if (rows[i].twentysix == 1) {
								rows[i].twentysix = 1;
								rows[i].od1twentysix = 0;
								rows[i].od2twentysix = 0;
							}
							if (rows[i].twentyseven == 1) {
								rows[i].twentyseven = 1;
								rows[i].od1twentyseven = 0;
								rows[i].od2twentyseven = 0;
							}
							if (rows[i].twentyeight == 1) {
								rows[i].twentyeight = 1;
								rows[i].od1twentyeight = 0;
								rows[i].od2twentyeight = 0;
							}
							if (rows[i].twentynine == 1) {
								rows[i].twentynine = 1;
								rows[i].od1twentynine = 0;
								rows[i].od2twentynine = 0;
							}
							if (rows[i].thirty == 1) {
								rows[i].thirty = 1;
								rows[i].od1thirty = 0;
								rows[i].od2thirty = 0;
							}
							if (rows[i].thirtyone == 1) {
								rows[i].thirtyone = 1;
								rows[i].od1thirtyone = 0;
								rows[i].od2thirtyone = 0;
							}


							if (rows[i].one == 2) {
								rows[i].one = 1;
								rows[i].od1one = 1;
								rows[i].od2one = 0;
							}
							if (rows[i].two == 2) {
								rows[i].two = 1;
								rows[i].od1two = 1;
								rows[i].od2two = 0;
							}
							if (rows[i].three == 2) {
								rows[i].three = 1;
								rows[i].od1three = 1;
								rows[i].od2three = 0;
								rows[i].od2three = 0;
							}
							if (rows[i].four == 2) {
								rows[i].four = 1;
								rows[i].od1four = 1;
								rows[i].od2four = 0;
							}
							if (rows[i].five == 2) {
								rows[i].five = 1;
								rows[i].od1five = 1;
								rows[i].od2five = 0;
							}
							if (rows[i].six == 2) {
								rows[i].six = 1;
								rows[i].od1six = 1;
								rows[i].od2six = 0;
							}
							if (rows[i].seven == 2) {
								rows[i].seven = 1;
								rows[i].od1seven = 1;
								rows[i].od2seven = 0;
							}
							if (rows[i].eight == 2) {
								rows[i].eight = 1;
								rows[i].od1eight = 1;
								rows[i].od2eight = 0;
							}
							if (rows[i].nine == 2) {
								rows[i].nine = 1;
								rows[i].od1nine = 1;
								rows[i].od2nine = 0;
							}
							if (rows[i].ten == 2) {
								rows[i].ten = 1;
								rows[i].od1ten = 1;
								rows[i].od2ten = 0;
							}
							if (rows[i].eleven == 2) {
								rows[i].eleven = 1;
								rows[i].od1eleven = 1;
								rows[i].od2eleven = 0;
							}
							if (rows[i].twelve == 2) {
								rows[i].twelve = 1;
								rows[i].od1twelve = 1;
								rows[i].od2twelve = 0;
							}
							if (rows[i].thirteen == 2) {
								rows[i].thirteen = 1;
								rows[i].od1thirteen = 1;
								rows[i].od2thirteen = 0;
							}
							if (rows[i].fourteen == 2) {
								rows[i].fourteen = 1;
								rows[i].od1fourteen = 1;
								rows[i].od2fourteen = 0;
							}
							if (rows[i].fifteen == 2) {
								rows[i].fifteen = 1;
								rows[i].od1fifteen = 1;
								rows[i].od2fifteen = 0;
							}
							if (rows[i].sixteen == 2) {
								rows[i].sixteen = 1;
								rows[i].od1sixteen = 1;
								rows[i].od2sixteen = 0;
							}
							if (rows[i].seventeen == 2) {
								rows[i].seventeen = 1;
								rows[i].od1seventeen = 1;
								rows[i].od2seventeen = 0;
							}
							if (rows[i].eighteen == 2) {
								rows[i].eighteen = 1;
								rows[i].od1eighteen = 1;
								rows[i].od2eighteen = 0;
							}
							if (rows[i].nineteen == 2) {
								rows[i].nineteen = 1;
								rows[i].od1nineteen = 1;
								rows[i].od2nineteen = 0;
							}
							if (rows[i].twenty == 2) {
								rows[i].twenty = 1;
								rows[i].od1twenty = 1;
								rows[i].od2twenty = 0;
							}
							if (rows[i].twentyone == 2) {
								rows[i].twentyone = 1;
								rows[i].od1twentyone = 1;
								rows[i].od2twentyone = 0;
							}
							if (rows[i].twentytwo == 2) {
								rows[i].twentytwo = 1;
								rows[i].od1twentytwo = 1;
								rows[i].od2twentytwo = 0;
							}
							if (rows[i].twentythree == 2) {
								rows[i].twentythree = 1;
								rows[i].od1twentythree = 1;
								rows[i].od2twentythree = 0;
							}
							if (rows[i].twentyfour == 2) {
								rows[i].twentyfour = 1;
								rows[i].od1twentyfour = 1;
								rows[i].od2twentyfour = 0;
							}
							if (rows[i].twentyfive == 2) {
								rows[i].twentyfive = 1;
								rows[i].od1twentyfive = 1;
								rows[i].od2twentyfive = 0;
							}
							if (rows[i].twentysix == 2) {
								rows[i].twentysix = 1;
								rows[i].od1twentysix = 1;
								rows[i].od2twentysix = 0;
							}
							if (rows[i].twentyseven == 2) {
								rows[i].twentyseven = 1;
								rows[i].od1twentyseven = 1;
								rows[i].od2twentyseven = 0;
							}
							if (rows[i].twentyeight == 2) {
								rows[i].twentyeight = 1;
								rows[i].od1twentyeight = 1;
								rows[i].od2twentyeight = 0;
							}
							if (rows[i].twentynine == 2) {
								rows[i].twentynine = 1;
								rows[i].od1twentynine = 1;
								rows[i].od2twentynine = 0;
							}
							if (rows[i].thirty == 2) {
								rows[i].thirty = 1;
								rows[i].od1thirty = 1;
								rows[i].od2thirty = 0;
							}
							if (rows[i].thirtyone == 2) {
								rows[i].thirtyone = 1;
								rows[i].od1thirtyone = 1;
								rows[i].od2thirtyone = 0;
							}


							if (rows[i].one == 3) {
								rows[i].one = 1;
								rows[i].od1one = 1;
								rows[i].od2one = 1;
							}
							if (rows[i].two == 3) {
								rows[i].two = 1;
								rows[i].od1two = 1;
								rows[i].od2two = 1;
							}
							if (rows[i].three == 3) {
								rows[i].three = 1;
								rows[i].od1three = 1;
								rows[i].od2three = 1;
							}
							if (rows[i].four == 3) {
								rows[i].four = 1;
								rows[i].od1four = 1;
								rows[i].od2four = 1;
							}
							if (rows[i].five == 3) {
								rows[i].five = 1;
								rows[i].od1five = 1;
								rows[i].od2five = 1;
							}
							if (rows[i].six == 3) {
								rows[i].six = 1;
								rows[i].od1six = 1;
								rows[i].od2six = 1;
							}
							if (rows[i].seven == 3) {
								rows[i].seven = 1;
								rows[i].od1seven = 1;
								rows[i].od2seven = 1;
							}
							if (rows[i].eight == 3) {
								rows[i].eight = 1;
								rows[i].od1eight = 1;
								rows[i].od2eight = 1;
							}
							if (rows[i].nine == 3) {
								rows[i].nine = 1;
								rows[i].od1nine = 1;
								rows[i].od2nine = 1;
							}
							if (rows[i].ten == 3) {
								rows[i].ten = 1;
								rows[i].od1ten = 1;
								rows[i].od2ten = 1;
							}
							if (rows[i].eleven == 3) {
								rows[i].eleven = 1;
								rows[i].od1eleven = 1;
								rows[i].od2eleven = 1;
							}
							if (rows[i].twelve == 3) {
								rows[i].twelve = 1;
								rows[i].od1twelve = 1;
								rows[i].od2twelve = 1;
							}
							if (rows[i].thirteen == 3) {
								rows[i].thirteen = 1;
								rows[i].od1thirteen = 1;
								rows[i].od2thirteen = 1;
							}
							if (rows[i].fourteen == 3) {
								rows[i].fourteen = 1;
								rows[i].od1fourteen = 1;
								rows[i].od2fourteen = 1;
							}
							if (rows[i].fifteen == 3) {
								rows[i].fifteen = 1;
								rows[i].od1fifteen = 1;
								rows[i].od2fifteen = 1;
							}
							if (rows[i].sixteen == 3) {
								rows[i].sixteen = 1;
								rows[i].od1sixteen = 1;
								rows[i].od2sixteen = 1;
							}
							if (rows[i].seventeen == 3) {
								rows[i].seventeen = 1;
								rows[i].od1seventeen = 1;
								rows[i].od2seventeen = 1;
							}
							if (rows[i].eighteen == 3) {
								rows[i].eighteen = 1;
								rows[i].od1eighteen = 1;
								rows[i].od2eighteen = 1;
							}
							if (rows[i].nineteen == 3) {
								rows[i].nineteen = 1;
								rows[i].od1nineteen = 1;
								rows[i].od2nineteen = 1;
							}
							if (rows[i].twenty == 3) {
								rows[i].twenty = 1;
								rows[i].od1twenty = 1;
								rows[i].od2twenty = 1;
							}
							if (rows[i].twentyone == 3) {
								rows[i].twentyone = 1;
								rows[i].od1twentyone = 1;
								rows[i].od2twentyone = 1;
							}
							if (rows[i].twentytwo == 3) {
								rows[i].twentytwo = 1;
								rows[i].od1twentytwo = 1;
								rows[i].od2twentytwo = 1;
							}
							if (rows[i].twentythree == 3) {
								rows[i].twentythree = 1;
								rows[i].od1twentythree = 1;
								rows[i].od2twentythree = 1;
							}
							if (rows[i].twentyfour == 3) {
								rows[i].twentyfour = 1;
								rows[i].od1twentyfour = 1;
								rows[i].od2twentyfour = 1;
							}
							if (rows[i].twentyfive == 3) {
								rows[i].twentyfive = 1;
								rows[i].od1twentyfive = 1;
								rows[i].od2twentyfive = 1;
							}
							if (rows[i].twentysix == 3) {
								rows[i].twentysix = 1;
								rows[i].od1twentysix = 1;
								rows[i].od2twentysix = 1;
							}
							if (rows[i].twentyseven == 3) {
								rows[i].twentyseven = 1;
								rows[i].od1twentyseven = 1;
								rows[i].od2twentyseven = 1;
							}
							if (rows[i].twentyeight == 3) {
								rows[i].twentyeight = 1;
								rows[i].od1twentyeight = 1;
								rows[i].od2twentyeight = 1;
							}
							if (rows[i].twentynine == 3) {
								rows[i].twentynine = 1;
								rows[i].od1twentynine = 1;
								rows[i].od2twentynine = 1;
							}
							if (rows[i].thirty == 3) {
								rows[i].thirty = 1;
								rows[i].od1thirty = 1;
								rows[i].od2thirty = 1;
							}
							if (rows[i].thirtyone == 3) {
								rows[i].thirtyone = 1;
								rows[i].od1thirtyone = 1;
								rows[i].od2thirtyone = 1;
							}
							var obj = new clientModel.members(rows[i].attendanceid, rows[i].memberid, rows[i].firstname, rows[i].texcono, rows[i].serviceno, rows[i].jobpostingdetailid, rows[i].one, rows[i].two, rows[i].three, rows[i].four, rows[i].five, rows[i].six, rows[i].seven, rows[i].eight, rows[i].nine, rows[i].ten, rows[i].eleven, rows[i].twelve, rows[i].thirteen, rows[i].fourteen, rows[i].fifteen, rows[i].sixteen, rows[i].seventeen, rows[i].eighteen, rows[i].nineteen, rows[i].twenty, rows[i].twentyone, rows[i].twentytwo, rows[i].twentythree, rows[i].twentyfour, rows[i].twentyfive, rows[i].twentysix, rows[i].twentyseven, rows[i].twentyeight, rows[i].twentynine, rows[i].thirty, rows[i].thirtyone, rows[i].od1one, rows[i].od1two, rows[i].od1three, rows[i].od1four, rows[i].od1five, rows[i].od1six, rows[i].od1seven, rows[i].od1eight, rows[i].od1nine, rows[i].od1ten, rows[i].od1eleven, rows[i].od1twelve, rows[i].od1thirteen, rows[i].od1fourteen, rows[i].od1fifteen, rows[i].od1sixteen, rows[i].od1seventeen, rows[i].od1eighteen, rows[i].od1nineteen, rows[i].od1twenty, rows[i].od1twentyone, rows[i].od1twentytwo, rows[i].od1twentythree, rows[i].od1twentyfour, rows[i].od1twentyfive, rows[i].od1twentysix, rows[i].od1twentyseven, rows[i].od1twentyeight, rows[i].od1twentynine, rows[i].od1thirty, rows[i].od1thirtyone, rows[i].od2one, rows[i].od2two, rows[i].od2three, rows[i].od2four, rows[i].od2five, rows[i].od2six, rows[i].od2seven, rows[i].od2eight, rows[i].od2nine, rows[i].od2ten, rows[i].od2eleven, rows[i].od2twelve, rows[i].od2thirteen, rows[i].od2fourteen, rows[i].od2fifteen, rows[i].od2sixteen, rows[i].od2seventeen, rows[i].od2eighteen, rows[i].od2nineteen, rows[i].od2twenty, rows[i].od2twentyone, rows[i].od2twentytwo, rows[i].od2twentythree, rows[i].od2twentyfour, rows[i].od2twentyfive, rows[i].od2twentysix, rows[i].od2twentyseven, rows[i].od2twentyeight, rows[i].od2twentynine, rows[i].od2thirty, rows[i].od2thirtyone, (rows[i].presentdays != undefined ? rows[i].presentdays : 0), (rows[i].othours != undefined ? rows[i].othours : 0), rows[i].status, rows[i].jobcode, rows[i].eddays);
						} else {
							if (rows[i].one > 1) {
								rows[i].od1one = Number(rows[i].one) - 1;
								rows[i].one = 1;
								rows[i].od2one = 0;
							}
							if (rows[i].two > 1) {
								rows[i].od1two = Number(rows[i].two) - 1;
								rows[i].two = 1;
								rows[i].od2two = 0;
							}
							if (rows[i].three > 1) {
								rows[i].od1three = Number(rows[i].three) - 1;
								rows[i].three = 1;
								rows[i].od2three = 0;
							}
							if (rows[i].four > 1) {
								rows[i].od1four = Number(rows[i].four) - 1;
								rows[i].four = 1;
								rows[i].od2four = 0;
							}
							if (rows[i].five > 1) {
								rows[i].od1five = Number(rows[i].five) - 1;
								rows[i].five = 1;
								rows[i].od2five = 0;
							}
							if (rows[i].six > 1) {
								rows[i].od1six = Number(rows[i].six) - 1;
								rows[i].six = 1;
								rows[i].od2six = 0;
							}
							if (rows[i].seven > 1) {
								rows[i].od1seven = Number(rows[i].seven) - 1;
								rows[i].seven = 1;
								rows[i].od2seven = 0;
							}
							if (rows[i].eight > 1) {
								rows[i].od1eight = Number(rows[i].eight) - 1;
								rows[i].eight = 1;
								rows[i].od2eight = 0;
							}
							if (rows[i].nine > 1) {
								rows[i].od1nine = Number(rows[i].nine) - 1;
								rows[i].nine = 1;
								rows[i].od2nine = 0;
							}
							if (rows[i].ten > 1) {
								rows[i].od1ten = Number(rows[i].ten) - 1;
								rows[i].ten = 1;
								rows[i].od2ten = 0;
							}
							if (rows[i].eleven > 1) {
								rows[i].od1eleven = Number(rows[i].eleven) - 1;
								rows[i].eleven = 1;
								rows[i].od2eleven = 0;
							}
							if (rows[i].twelve > 1) {
								rows[i].od1twelve = Number(rows[i].twelve) - 1;
								rows[i].twelve = 1;
								rows[i].od2twelve = 0;
							}
							if (rows[i].thirteen > 1) {
								rows[i].od1thirteen = Number(rows[i].thirteen) - 1;
								rows[i].thirteen = 1;
								rows[i].od2thirteen = 0;
							}
							if (rows[i].fourteen > 1) {
								rows[i].od1fourteen = Number(rows[i].fourteen) - 1;
								rows[i].fourteen = 1;
								rows[i].od2fourteen = 0;
							}
							if (rows[i].fifteen > 1) {
								rows[i].od1fifteen = Number(rows[i].fifteen) - 1;
								rows[i].fifteen = 1;
								rows[i].od2fifteen = 0;
							}
							if (rows[i].sixteen > 1) {
								rows[i].od1sixteen = Number(rows[i].sixteen) - 1;
								rows[i].sixteen = 1;
								rows[i].od2sixteen = 0;
							}
							if (rows[i].seventeen > 1) {
								rows[i].od1seventeen = Number(rows[i].seventeen) - 1;
								rows[i].seventeen = 1;
								rows[i].od2seventeen = 0;
							}
							if (rows[i].eighteen > 1) {
								rows[i].od1eighteen = Number(rows[i].eighteen) - 1;
								rows[i].eighteen = 1;
								rows[i].od2eighteen = 0;
							}
							if (rows[i].nineteen > 1) {
								rows[i].od1nineteen = Number(rows[i].nineteen) - 1;
								rows[i].nineteen = 1;
								rows[i].od2nineteen = 0;
							}
							if (rows[i].twenty > 1) {
								rows[i].od1twenty = Number(rows[i].twenty) - 1;
								rows[i].twenty = 1;
								rows[i].od2twenty = 0;
							}
							if (rows[i].twentyone > 1) {
								rows[i].od1twentyone = Number(rows[i].twentyone) - 1;
								rows[i].twentyone = 1;
								rows[i].od2twentyone = 0;
							}
							if (rows[i].twentythree > 1) {
								rows[i].od1twentythree = Number(rows[i].twentythree) - 1;;
								rows[i].twentythree = 1;
								rows[i].od2twentythree = 0;
							}
							if (rows[i].twentyfour > 1) {
								rows[i].od1twentyfour = Number(rows[i].twentyfour) - 1;;
								rows[i].twentyfour = 1;
								rows[i].od2twentyfour = 0;
							}
							if (rows[i].twentyfive > 1) {
								rows[i].od1twentyfive = Number(rows[i].twentyfive) - 1;;
								rows[i].twentyfive = 1;
								rows[i].od2twentyfive = 0;
							}
							if (rows[i].twentysix > 1) {
								rows[i].od1twentysix = Number(rows[i].twentysix) - 1;;
								rows[i].twentysix = 1;
								rows[i].od2twentysix = 0;
							}
							if (rows[i].twentyseven > 1) {
								rows[i].od1twentyseven = Number(rows[i].twentyseven) - 1;;
								rows[i].twentyseven = 1;
								rows[i].od2twentyseven = 0;
							}
							if (rows[i].twentyeight > 1) {
								rows[i].od1twentyeight = Number(rows[i].twentyeight) - 1;;
								rows[i].twentyeight = 1;
								rows[i].od2twentyeight = 0;
							}
							if (rows[i].twentynine > 1) {
								rows[i].od1twentynine = Number(rows[i].twentynine) - 1;;
								rows[i].twentynine = 1;
								rows[i].od2twentynine = 0;
							}
							if (rows[i].thirty > 1) {
								rows[i].od1thirty = Number(rows[i].thirty) - 1;;
								rows[i].thirty = 1;
								rows[i].od2thirty = 0;
							}
							if (rows[i].thirtyone > 1) {
								rows[i].od1thirtyone = Number(rows[i].thirtyone) - 1;;
								rows[i].thirtyone = 1;
								rows[i].od2thirtyone = 0;
							}
							var obj = new clientModel.members(rows[i].attendanceid, rows[i].memberid, rows[i].firstname, rows[i].texcono, rows[i].serviceno, rows[i].jobpostingdetailid, rows[i].one, rows[i].two, rows[i].three, rows[i].four, rows[i].five, rows[i].six, rows[i].seven, rows[i].eight, rows[i].nine, rows[i].ten, rows[i].eleven, rows[i].twelve, rows[i].thirteen, rows[i].fourteen, rows[i].fifteen, rows[i].sixteen, rows[i].seventeen, rows[i].eighteen, rows[i].nineteen, rows[i].twenty, rows[i].twentyone, rows[i].twentytwo, rows[i].twentythree, rows[i].twentyfour, rows[i].twentyfive, rows[i].twentysix, rows[i].twentyseven, rows[i].twentyeight, rows[i].twentynine, rows[i].thirty, rows[i].thirtyone, rows[i].od1one, rows[i].od1two, rows[i].od1three, rows[i].od1four, rows[i].od1five, rows[i].od1six, rows[i].od1seven, rows[i].od1eight, rows[i].od1nine, rows[i].od1ten, rows[i].od1eleven, rows[i].od1twelve, rows[i].od1thirteen, rows[i].od1fourteen, rows[i].od1fifteen, rows[i].od1sixteen, rows[i].od1seventeen, rows[i].od1eighteen, rows[i].od1nineteen, rows[i].od1twenty, rows[i].od1twentyone, rows[i].od1twentytwo, rows[i].od1twentythree, rows[i].od1twentyfour, rows[i].od1twentyfive, rows[i].od1twentysix, rows[i].od1twentyseven, rows[i].od1twentyeight, rows[i].od1twentynine, rows[i].od1thirty, rows[i].od1thirtyone, rows[i].od2one, rows[i].od2two, rows[i].od2three, rows[i].od2four, rows[i].od2five, rows[i].od2six, rows[i].od2seven, rows[i].od2eight, rows[i].od2nine, rows[i].od2ten, rows[i].od2eleven, rows[i].od2twelve, rows[i].od2thirteen, rows[i].od2fourteen, rows[i].od2fifteen, rows[i].od2sixteen, rows[i].od2seventeen, rows[i].od2eighteen, rows[i].od2nineteen, rows[i].od2twenty, rows[i].od2twentyone, rows[i].od2twentytwo, rows[i].od2twentythree, rows[i].od2twentyfour, rows[i].od2twentyfive, rows[i].od2twentysix, rows[i].od2twentyseven, rows[i].od2twentyeight, rows[i].od2twentynine, rows[i].od2thirty, rows[i].od2thirtyone, (rows[i].presentdays != undefined ? rows[i].presentdays : 0), (rows[i].othours != undefined ? rows[i].othours : 0), rows[i].status, rows[i].jobcode, rows[i].eddays);
						}
						members.push(obj);

						if ((i + 1 == rowsReturned) || (rows[i].projectid != rows[i + 1].projectid) || (rows[i].monthandyear != rows[i + 1].monthandyear)) {
							var attendance = new clientModel.attendance(rows[i].clientid, rows[i].projectid, rows[i].monthandyear, rows[i].changedby, members);
							result.push(attendance)

							members = [];
						}
					}
				}
				resolve(result);
			}).catch(function (err) {
				errorDAL.errorlog('Error',"clientDAL::getattendance",err.stack,JSON.stringify(projectid, monthandyear),"getattendance");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::getattendance",err.stack,JSON.stringify(projectid, monthandyear),"getattendance");
			reject(err);
		});
	});
}

module.exports.getattendanceinfo = function (projectid, monthandyear) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
            SELECT
                at.attendanceid,
                at.clientid,
                at.projectid,
                at.memberid,
                at.jobpostingdetailid,
                at.monthandyear,
                at.one,
                at.two,
                at.three,
                at.four,
                at.five,
                at.six,
                at.seven,
                at.eight,
                at.nine,
                at.ten,
                at.eleven,
                at.twelve,
                at.thirteen,
                at.fourteen,
                at.fifteen,
                at.sixteen,
                at.seventeen,
                at.eighteen,
                at.nineteen,
                at.twenty,
                at.twentyone,
                at.twentytwo,
                at.twentythree,
                at.twentyfour,
                at.twentyfive,
                at.twentysix,
                at.twentyseven,
                at.twentyeight,
                at.twentynine,
                at.thirty,
                at.thirtyone,
                '0'  AS od1one,
                '0'  AS od1two,
                '0'  AS od1three,
                '0'  AS od1four,
                '0'  AS od1five,
                '0'  AS od1six,
                '0'  AS od1seven,
                '0'  AS od1eight,
                '0'  AS od1nine,
                '0'  AS od1ten,
                '0'  AS od1eleven,
                '0'  AS od1twelve,
                '0'  AS od1thirteen,
                '0'  AS od1fourteen,
                '0'  AS od1fifteen,
                '0'  AS od1sixteen,
                '0'  AS od1seventeen,
                '0'  AS od1eighteen,
                '0'  AS od1nineteen,
                '0'  AS od1twenty,
                '0'  AS od1twentyone,
                '0'  AS od1twentytwo,
                '0'  AS od1twentythree,
                '0'  AS od1twentyfour,
                '0'  AS od1twentyfive,
                '0'  AS od1twentysix,
                '0'  AS od1twentyseven,
                '0'  AS od1twentyeight,
                '0'  AS od1twentynine,
                '0'  AS od1thirty,
                '0'  AS od1thirtyone,
                '0'  AS od2one,
                '0'  AS od2two,
                '0'  AS od2three,
                '0'  AS od2four,
                '0'  AS od2five,
                '0'  AS od2six,
                '0'  AS od2seven,
                '0'  AS od2eight,
                '0'  AS od2nine,
                '0'  AS od2ten,
                '0'  AS od2eleven,
                '0'  AS od2twelve,
                '0'  AS od2thirteen,
                '0'  AS od2fourteen,
                '0'  AS od2fifteen,
                '0'  AS od2sixteen,
                '0'  AS od2seventeen,
                '0'  AS od2eighteen,
                '0'  AS od2nineteen,
                '0'  AS od2twenty,
                '0'  AS od2twentyone,
                '0'  AS od2twentytwo,
                '0'  AS od2twentythree,
                '0'  AS od2twentyfour,
                '0'  AS od2twentyfive,
                '0'  AS od2twentysix,
                '0'  AS od2twentyseven,
                '0'  AS od2twentyeight,
                '0'  AS od2twentynine,
                '0'  AS od2thirty,
                '0'  AS od2thirtyone,
                
                at.presentdays,
                at.othours,
                at.status,
                m.firstname,
                m.lastname,
                m.texcono,
                m.serviceno,
                pr.name AS projectname,
                pr.projectno,
                cl.organization,
                jm.code AS jobcode,
                jm.name AS jobname
                
                FROM attendance at

                INNER JOIN client cl ON
                    cl.clientid = at.clientid
                AND cl.active =1

                INNER JOIN project pr ON
                    pr.projectid = at.projectid
                    AND pr.active =1

                INNER JOIN member m ON
                    m.memberid = at.memberid
                    AND m.active =1
                
                INNER JOIN jobpostingdetail jpd ON
                    jpd.jobpostingdetailid = at.jobpostingdetailid
                    AND jpd.active =1
                 
                INNER JOIN jobmaster jm ON
                    jm.jobmasterid = jpd.jobmasterid
                    AND jm.active =1
            WHERE at.active = 1
            AND   at.projectid = ?   AND  at.monthandyear = ? AND m.lastaccess >= now() - interval 90 day ;

            */
			});
			con.query(query, [projectid, monthandyear]).then(function (rows, fields) {
				var rowsReturned = rows.length;
				var result = [];
				var members = [];
				var attendance = {};
				if (rowsReturned > 0) {
					for (var i = 0; i < rowsReturned; i++) {

						if (rows[i].jobcode != 'DVR') {
							if (rows[i].one == 1) {
								rows[i].one = 1;
								rows[i].od1one = 0;
								rows[i].od2one = 0;
							}
							if (rows[i].two == 1) {
								rows[i].two = 1;
								rows[i].od1two = 0;
								rows[i].od2two = 0;
							}
							if (rows[i].three == 1) {
								rows[i].three = 1;
								rows[i].od1three = 0;
								rows[i].od2three = 0;
							}
							if (rows[i].four == 1) {
								rows[i].four = 1;
								rows[i].od1four = 0;
								rows[i].od2four = 0;
							}
							if (rows[i].five == 1) {
								rows[i].five = 1;
								rows[i].od1five = 0;
								rows[i].od2five = 0;
							}
							if (rows[i].six == 1) {
								rows[i].six = 1;
								rows[i].od1six = 0;
								rows[i].od2six = 0;
							}
							if (rows[i].seven == 1) {
								rows[i].seven = 1;
								rows[i].od1seven = 0;
								rows[i].od2seven = 0;
							}
							if (rows[i].eight == 1) {
								rows[i].eight = 1;
								rows[i].od1eight = 0;
								rows[i].od2eight = 0;
							}
							if (rows[i].nine == 1) {
								rows[i].nine = 1;
								rows[i].od1nine = 0;
								rows[i].od2nine = 0;
							}
							if (rows[i].ten == 1) {
								rows[i].ten = 1;
								rows[i].od1ten = 0;
								rows[i].od2ten = 0;
							}
							if (rows[i].eleven == 1) {
								rows[i].eleven = 1;
								rows[i].od1eleven = 0;
								rows[i].od2eleven = 0;
							}
							if (rows[i].twelve == 1) {
								rows[i].twelve = 1;
								rows[i].od1twelve = 0;
								rows[i].od2twelve = 0;
							}
							if (rows[i].thirteen == 1) {
								rows[i].thirteen = 1;
								rows[i].od1thirteen = 0;
								rows[i].od2thirteen = 0;
							}
							if (rows[i].fourteen == 1) {
								rows[i].fourteen = 1;
								rows[i].od1fourteen = 0;
								rows[i].od2fourteen = 0;
							}
							if (rows[i].fifteen == 1) {
								rows[i].fifteen = 1;
								rows[i].od1fifteen = 0;
								rows[i].od2fifteen = 0;
							}
							if (rows[i].sixteen == 1) {
								rows[i].sixteen = 1;
								rows[i].od1sixteen = 0;
								rows[i].od2sixteen = 0;
							}
							if (rows[i].seventeen == 1) {
								rows[i].seventeen = 1;
								rows[i].od1seventeen = 0;
								rows[i].od2seventeen = 0;
							}
							if (rows[i].eighteen == 1) {
								rows[i].eighteen = 1;
								rows[i].od1eighteen = 0;
								rows[i].od2eighteen = 0;
							}
							if (rows[i].nineteen == 1) {
								rows[i].nineteen = 1;
								rows[i].od1nineteen = 0;
								rows[i].od2nineteen = 0;
							}
							if (rows[i].twenty == 1) {
								rows[i].twenty = 1;
								rows[i].od1twenty = 0;
								rows[i].od2twenty = 0;
							}
							if (rows[i].twentyone == 1) {
								rows[i].twentyone = 1;
								rows[i].od1twentyone = 0;
								rows[i].od2twentyone = 0;
							}
							if (rows[i].twentytwo == 1) {
								rows[i].twentytwo = 1;
								rows[i].od1twentytwo = 0;
								rows[i].od2twentytwo = 0;
							}
							if (rows[i].twentythree == 1) {
								rows[i].twentythree = 1;
								rows[i].od1twentythree = 0;
								rows[i].od2twentythree = 0;
							}
							if (rows[i].twentyfour == 1) {
								rows[i].twentyfour = 1;
								rows[i].od1twentyfour = 0;
								rows[i].od2twentyfour = 0;
							}
							if (rows[i].twentyfive == 1) {
								rows[i].twentyfive = 1;
								rows[i].od1twentyfive = 0;
								rows[i].od2twentyfive = 0;
							}
							if (rows[i].twentysix == 1) {
								rows[i].twentysix = 1;
								rows[i].od1twentysix = 0;
								rows[i].od2twentysix = 0;
							}
							if (rows[i].twentyseven == 1) {
								rows[i].twentyseven = 1;
								rows[i].od1twentyseven = 0;
								rows[i].od2twentyseven = 0;
							}
							if (rows[i].twentyeight == 1) {
								rows[i].twentyeight = 1;
								rows[i].od1twentyeight = 0;
								rows[i].od2twentyeight = 0;
							}
							if (rows[i].twentynine == 1) {
								rows[i].twentynine = 1;
								rows[i].od1twentynine = 0;
								rows[i].od2twentynine = 0;
							}
							if (rows[i].thirty == 1) {
								rows[i].thirty = 1;
								rows[i].od1thirty = 0;
								rows[i].od2thirty = 0;
							}
							if (rows[i].thirtyone == 1) {
								rows[i].thirtyone = 1;
								rows[i].od1thirtyone = 0;
								rows[i].od2thirtyone = 0;
							}


							if (rows[i].one == 2) {
								rows[i].one = 1;
								rows[i].od1one = 1;
								rows[i].od2one = 0;
							}
							if (rows[i].two == 2) {
								rows[i].two = 1;
								rows[i].od1two = 1;
								rows[i].od2two = 0;
							}
							if (rows[i].three == 2) {
								rows[i].three = 1;
								rows[i].od1three = 1;
								rows[i].od2three = 0;
								rows[i].od2three = 0;
							}
							if (rows[i].four == 2) {
								rows[i].four = 1;
								rows[i].od1four = 1;
								rows[i].od2four = 0;
							}
							if (rows[i].five == 2) {
								rows[i].five = 1;
								rows[i].od1five = 1;
								rows[i].od2five = 0;
							}
							if (rows[i].six == 2) {
								rows[i].six = 1;
								rows[i].od1six = 1;
								rows[i].od2six = 0;
							}
							if (rows[i].seven == 2) {
								rows[i].seven = 1;
								rows[i].od1seven = 1;
								rows[i].od2seven = 0;
							}
							if (rows[i].eight == 2) {
								rows[i].eight = 1;
								rows[i].od1eight = 1;
								rows[i].od2eight = 0;
							}
							if (rows[i].nine == 2) {
								rows[i].nine = 1;
								rows[i].od1nine = 1;
								rows[i].od2nine = 0;
							}
							if (rows[i].ten == 2) {
								rows[i].ten = 1;
								rows[i].od1ten = 1;
								rows[i].od2ten = 0;
							}
							if (rows[i].eleven == 2) {
								rows[i].eleven = 1;
								rows[i].od1eleven = 1;
								rows[i].od2eleven = 0;
							}
							if (rows[i].twelve == 2) {
								rows[i].twelve = 1;
								rows[i].od1twelve = 1;
								rows[i].od2twelve = 0;
							}
							if (rows[i].thirteen == 2) {
								rows[i].thirteen = 1;
								rows[i].od1thirteen = 1;
								rows[i].od2thirteen = 0;
							}
							if (rows[i].fourteen == 2) {
								rows[i].fourteen = 1;
								rows[i].od1fourteen = 1;
								rows[i].od2fourteen = 0;
							}
							if (rows[i].fifteen == 2) {
								rows[i].fifteen = 1;
								rows[i].od1fifteen = 1;
								rows[i].od2fifteen = 0;
							}
							if (rows[i].sixteen == 2) {
								rows[i].sixteen = 1;
								rows[i].od1sixteen = 1;
								rows[i].od2sixteen = 0;
							}
							if (rows[i].seventeen == 2) {
								rows[i].seventeen = 1;
								rows[i].od1seventeen = 1;
								rows[i].od2seventeen = 0;
							}
							if (rows[i].eighteen == 2) {
								rows[i].eighteen = 1;
								rows[i].od1eighteen = 1;
								rows[i].od2eighteen = 0;
							}
							if (rows[i].nineteen == 2) {
								rows[i].nineteen = 1;
								rows[i].od1nineteen = 1;
								rows[i].od2nineteen = 0;
							}
							if (rows[i].twenty == 2) {
								rows[i].twenty = 1;
								rows[i].od1twenty = 1;
								rows[i].od2twenty = 0;
							}
							if (rows[i].twentyone == 2) {
								rows[i].twentyone = 1;
								rows[i].od1twentyone = 1;
								rows[i].od2twentyone = 0;
							}
							if (rows[i].twentytwo == 2) {
								rows[i].twentytwo = 1;
								rows[i].od1twentytwo = 1;
								rows[i].od2twentytwo = 0;
							}
							if (rows[i].twentythree == 2) {
								rows[i].twentythree = 1;
								rows[i].od1twentythree = 1;
								rows[i].od2twentythree = 0;
							}
							if (rows[i].twentyfour == 2) {
								rows[i].twentyfour = 1;
								rows[i].od1twentyfour = 1;
								rows[i].od2twentyfour = 0;
							}
							if (rows[i].twentyfive == 2) {
								rows[i].twentyfive = 1;
								rows[i].od1twentyfive = 1;
								rows[i].od2twentyfive = 0;
							}
							if (rows[i].twentysix == 2) {
								rows[i].twentysix = 1;
								rows[i].od1twentysix = 1;
								rows[i].od2twentysix = 0;
							}
							if (rows[i].twentyseven == 2) {
								rows[i].twentyseven = 1;
								rows[i].od1twentyseven = 1;
								rows[i].od2twentyseven = 0;
							}
							if (rows[i].twentyeight == 2) {
								rows[i].twentyeight = 1;
								rows[i].od1twentyeight = 1;
								rows[i].od2twentyeight = 0;
							}
							if (rows[i].twentynine == 2) {
								rows[i].twentynine = 1;
								rows[i].od1twentynine = 1;
								rows[i].od2twentynine = 0;
							}
							if (rows[i].thirty == 2) {
								rows[i].thirty = 1;
								rows[i].od1thirty = 1;
								rows[i].od2thirty = 0;
							}
							if (rows[i].thirtyone == 2) {
								rows[i].thirtyone = 1;
								rows[i].od1thirtyone = 1;
								rows[i].od2thirtyone = 0;
							}


							if (rows[i].one == 3) {
								rows[i].one = 1;
								rows[i].od1one = 1;
								rows[i].od2one = 1;
							}
							if (rows[i].two == 3) {
								rows[i].two = 1;
								rows[i].od1two = 1;
								rows[i].od2two = 1;
							}
							if (rows[i].three == 3) {
								rows[i].three = 1;
								rows[i].od1three = 1;
								rows[i].od2three = 1;
							}
							if (rows[i].four == 3) {
								rows[i].four = 1;
								rows[i].od1four = 1;
								rows[i].od2four = 1;
							}
							if (rows[i].five == 3) {
								rows[i].five = 1;
								rows[i].od1five = 1;
								rows[i].od2five = 1;
							}
							if (rows[i].six == 3) {
								rows[i].six = 1;
								rows[i].od1six = 1;
								rows[i].od2six = 1;
							}
							if (rows[i].seven == 3) {
								rows[i].seven = 1;
								rows[i].od1seven = 1;
								rows[i].od2seven = 1;
							}
							if (rows[i].eight == 3) {
								rows[i].eight = 1;
								rows[i].od1eight = 1;
								rows[i].od2eight = 1;
							}
							if (rows[i].nine == 3) {
								rows[i].nine = 1;
								rows[i].od1nine = 1;
								rows[i].od2nine = 1;
							}
							if (rows[i].ten == 3) {
								rows[i].ten = 1;
								rows[i].od1ten = 1;
								rows[i].od2ten = 1;
							}
							if (rows[i].eleven == 3) {
								rows[i].eleven = 1;
								rows[i].od1eleven = 1;
								rows[i].od2eleven = 1;
							}
							if (rows[i].twelve == 3) {
								rows[i].twelve = 1;
								rows[i].od1twelve = 1;
								rows[i].od2twelve = 1;
							}
							if (rows[i].thirteen == 3) {
								rows[i].thirteen = 1;
								rows[i].od1thirteen = 1;
								rows[i].od2thirteen = 1;
							}
							if (rows[i].fourteen == 3) {
								rows[i].fourteen = 1;
								rows[i].od1fourteen = 1;
								rows[i].od2fourteen = 1;
							}
							if (rows[i].fifteen == 3) {
								rows[i].fifteen = 1;
								rows[i].od1fifteen = 1;
								rows[i].od2fifteen = 1;
							}
							if (rows[i].sixteen == 3) {
								rows[i].sixteen = 1;
								rows[i].od1sixteen = 1;
								rows[i].od2sixteen = 1;
							}
							if (rows[i].seventeen == 3) {
								rows[i].seventeen = 1;
								rows[i].od1seventeen = 1;
								rows[i].od2seventeen = 1;
							}
							if (rows[i].eighteen == 3) {
								rows[i].eighteen = 1;
								rows[i].od1eighteen = 1;
								rows[i].od2eighteen = 1;
							}
							if (rows[i].nineteen == 3) {
								rows[i].nineteen = 1;
								rows[i].od1nineteen = 1;
								rows[i].od2nineteen = 1;
							}
							if (rows[i].twenty == 3) {
								rows[i].twenty = 1;
								rows[i].od1twenty = 1;
								rows[i].od2twenty = 1;
							}
							if (rows[i].twentyone == 3) {
								rows[i].twentyone = 1;
								rows[i].od1twentyone = 1;
								rows[i].od2twentyone = 1;
							}
							if (rows[i].twentytwo == 3) {
								rows[i].twentytwo = 1;
								rows[i].od1twentytwo = 1;
								rows[i].od2twentytwo = 1;
							}
							if (rows[i].twentythree == 3) {
								rows[i].twentythree = 1;
								rows[i].od1twentythree = 1;
								rows[i].od2twentythree = 1;
							}
							if (rows[i].twentyfour == 3) {
								rows[i].twentyfour = 1;
								rows[i].od1twentyfour = 1;
								rows[i].od2twentyfour = 1;
							}
							if (rows[i].twentyfive == 3) {
								rows[i].twentyfive = 1;
								rows[i].od1twentyfive = 1;
								rows[i].od2twentyfive = 1;
							}
							if (rows[i].twentysix == 3) {
								rows[i].twentysix = 1;
								rows[i].od1twentysix = 1;
								rows[i].od2twentysix = 1;
							}
							if (rows[i].twentyseven == 3) {
								rows[i].twentyseven = 1;
								rows[i].od1twentyseven = 1;
								rows[i].od2twentyseven = 1;
							}
							if (rows[i].twentyeight == 3) {
								rows[i].twentyeight = 1;
								rows[i].od1twentyeight = 1;
								rows[i].od2twentyeight = 1;
							}
							if (rows[i].twentynine == 3) {
								rows[i].twentynine = 1;
								rows[i].od1twentynine = 1;
								rows[i].od2twentynine = 1;
							}
							if (rows[i].thirty == 3) {
								rows[i].thirty = 1;
								rows[i].od1thirty = 1;
								rows[i].od2thirty = 1;
							}
							if (rows[i].thirtyone == 3) {
								rows[i].thirtyone = 1;
								rows[i].od1thirtyone = 1;
								rows[i].od2thirtyone = 1;
							}
							var obj = new clientModel.members(rows[i].attendanceid, rows[i].memberid, rows[i].firstname, rows[i].texcono, rows[i].serviceno, rows[i].jobpostingdetailid, rows[i].one, rows[i].two, rows[i].three, rows[i].four, rows[i].five, rows[i].six, rows[i].seven, rows[i].eight, rows[i].nine, rows[i].ten, rows[i].eleven, rows[i].twelve, rows[i].thirteen, rows[i].fourteen, rows[i].fifteen, rows[i].sixteen, rows[i].seventeen, rows[i].eighteen, rows[i].nineteen, rows[i].twenty, rows[i].twentyone, rows[i].twentytwo, rows[i].twentythree, rows[i].twentyfour, rows[i].twentyfive, rows[i].twentysix, rows[i].twentyseven, rows[i].twentyeight, rows[i].twentynine, rows[i].thirty, rows[i].thirtyone, rows[i].od1one, rows[i].od1two, rows[i].od1three, rows[i].od1four, rows[i].od1five, rows[i].od1six, rows[i].od1seven, rows[i].od1eight, rows[i].od1nine, rows[i].od1ten, rows[i].od1eleven, rows[i].od1twelve, rows[i].od1thirteen, rows[i].od1fourteen, rows[i].od1fifteen, rows[i].od1sixteen, rows[i].od1seventeen, rows[i].od1eighteen, rows[i].od1nineteen, rows[i].od1twenty, rows[i].od1twentyone, rows[i].od1twentytwo, rows[i].od1twentythree, rows[i].od1twentyfour, rows[i].od1twentyfive, rows[i].od1twentysix, rows[i].od1twentyseven, rows[i].od1twentyeight, rows[i].od1twentynine, rows[i].od1thirty, rows[i].od1thirtyone, rows[i].od2one, rows[i].od2two, rows[i].od2three, rows[i].od2four, rows[i].od2five, rows[i].od2six, rows[i].od2seven, rows[i].od2eight, rows[i].od2nine, rows[i].od2ten, rows[i].od2eleven, rows[i].od2twelve, rows[i].od2thirteen, rows[i].od2fourteen, rows[i].od2fifteen, rows[i].od2sixteen, rows[i].od2seventeen, rows[i].od2eighteen, rows[i].od2nineteen, rows[i].od2twenty, rows[i].od2twentyone, rows[i].od2twentytwo, rows[i].od2twentythree, rows[i].od2twentyfour, rows[i].od2twentyfive, rows[i].od2twentysix, rows[i].od2twentyseven, rows[i].od2twentyeight, rows[i].od2twentynine, rows[i].od2thirty, rows[i].od2thirtyone, (rows[i].presentdays != undefined ? rows[i].presentdays : 0), (rows[i].othours != undefined ? rows[i].othours : 0), rows[i].status, rows[i].jobcode, rows[i].eddays);
						} else {
							if (rows[i].one > 1) {
								rows[i].od1one = Number(rows[i].one) - 1;
								rows[i].one = 1;
								rows[i].od2one = 0;
							}
							if (rows[i].two > 1) {
								rows[i].od1two = Number(rows[i].two) - 1;
								rows[i].two = 1;
								rows[i].od2two = 0;
							}
							if (rows[i].three > 1) {
								rows[i].od1three = Number(rows[i].three) - 1;
								rows[i].three = 1;
								rows[i].od2three = 0;
							}
							if (rows[i].four > 1) {
								rows[i].od1four = Number(rows[i].four) - 1;
								rows[i].four = 1;
								rows[i].od2four = 0;
							}
							if (rows[i].five > 1) {
								rows[i].od1five = Number(rows[i].five) - 1;
								rows[i].five = 1;
								rows[i].od2five = 0;
							}
							if (rows[i].six > 1) {
								rows[i].od1six = Number(rows[i].six) - 1;
								rows[i].six = 1;
								rows[i].od2six = 0;
							}
							if (rows[i].seven > 1) {
								rows[i].od1seven = Number(rows[i].seven) - 1;
								rows[i].seven = 1;
								rows[i].od2seven = 0;
							}
							if (rows[i].eight > 1) {
								rows[i].od1eight = Number(rows[i].eight) - 1;
								rows[i].eight = 1;
								rows[i].od2eight = 0;
							}
							if (rows[i].nine > 1) {
								rows[i].od1nine = Number(rows[i].nine) - 1;
								rows[i].nine = 1;
								rows[i].od2nine = 0;
							}
							if (rows[i].ten > 1) {
								rows[i].od1ten = Number(rows[i].ten) - 1;
								rows[i].ten = 1;
								rows[i].od2ten = 0;
							}
							if (rows[i].eleven > 1) {
								rows[i].od1eleven = Number(rows[i].eleven) - 1;
								rows[i].eleven = 1;
								rows[i].od2eleven = 0;
							}
							if (rows[i].twelve > 1) {
								rows[i].od1twelve = Number(rows[i].twelve) - 1;
								rows[i].twelve = 1;
								rows[i].od2twelve = 0;
							}
							if (rows[i].thirteen > 1) {
								rows[i].od1thirteen = Number(rows[i].thirteen) - 1;
								rows[i].thirteen = 1;
								rows[i].od2thirteen = 0;
							}
							if (rows[i].fourteen > 1) {
								rows[i].od1fourteen = Number(rows[i].fourteen) - 1;
								rows[i].fourteen = 1;
								rows[i].od2fourteen = 0;
							}
							if (rows[i].fifteen > 1) {
								rows[i].od1fifteen = Number(rows[i].fifteen) - 1;
								rows[i].fifteen = 1;
								rows[i].od2fifteen = 0;
							}
							if (rows[i].sixteen > 1) {
								rows[i].od1sixteen = Number(rows[i].sixteen) - 1;
								rows[i].sixteen = 1;
								rows[i].od2sixteen = 0;
							}
							if (rows[i].seventeen > 1) {
								rows[i].od1seventeen = Number(rows[i].seventeen) - 1;
								rows[i].seventeen = 1;
								rows[i].od2seventeen = 0;
							}
							if (rows[i].eighteen > 1) {
								rows[i].od1eighteen = Number(rows[i].eighteen) - 1;
								rows[i].eighteen = 1;
								rows[i].od2eighteen = 0;
							}
							if (rows[i].nineteen > 1) {
								rows[i].od1nineteen = Number(rows[i].nineteen) - 1;
								rows[i].nineteen = 1;
								rows[i].od2nineteen = 0;
							}
							if (rows[i].twenty > 1) {
								rows[i].od1twenty = Number(rows[i].twenty) - 1;
								rows[i].twenty = 1;
								rows[i].od2twenty = 0;
							}
							if (rows[i].twentyone > 1) {
								rows[i].od1twentyone = Number(rows[i].twentyone) - 1;
								rows[i].twentyone = 1;
								rows[i].od2twentyone = 0;
							}
							if (rows[i].twentythree > 1) {
								rows[i].od1twentythree = Number(rows[i].twentythree) - 1;;
								rows[i].twentythree = 1;
								rows[i].od2twentythree = 0;
							}
							if (rows[i].twentyfour > 1) {
								rows[i].od1twentyfour = Number(rows[i].twentyfour) - 1;;
								rows[i].twentyfour = 1;
								rows[i].od2twentyfour = 0;
							}
							if (rows[i].twentyfive > 1) {
								rows[i].od1twentyfive = Number(rows[i].twentyfive) - 1;;
								rows[i].twentyfive = 1;
								rows[i].od2twentyfive = 0;
							}
							if (rows[i].twentysix > 1) {
								rows[i].od1twentysix = Number(rows[i].twentysix) - 1;;
								rows[i].twentysix = 1;
								rows[i].od2twentysix = 0;
							}
							if (rows[i].twentyseven > 1) {
								rows[i].od1twentyseven = Number(rows[i].twentyseven) - 1;;
								rows[i].twentyseven = 1;
								rows[i].od2twentyseven = 0;
							}
							if (rows[i].twentyeight > 1) {
								rows[i].od1twentyeight = Number(rows[i].twentyeight) - 1;;
								rows[i].twentyeight = 1;
								rows[i].od2twentyeight = 0;
							}
							if (rows[i].twentynine > 1) {
								rows[i].od1twentynine = Number(rows[i].twentynine) - 1;;
								rows[i].twentynine = 1;
								rows[i].od2twentynine = 0;
							}
							if (rows[i].thirty > 1) {
								rows[i].od1thirty = Number(rows[i].thirty) - 1;;
								rows[i].thirty = 1;
								rows[i].od2thirty = 0;
							}
							if (rows[i].thirtyone > 1) {
								rows[i].od1thirtyone = Number(rows[i].thirtyone) - 1;;
								rows[i].thirtyone = 1;
								rows[i].od2thirtyone = 0;
							}
							var obj = new clientModel.members(rows[i].attendanceid, rows[i].memberid, rows[i].firstname, rows[i].texcono, rows[i].serviceno, rows[i].jobpostingdetailid, rows[i].one, rows[i].two, rows[i].three, rows[i].four, rows[i].five, rows[i].six, rows[i].seven, rows[i].eight, rows[i].nine, rows[i].ten, rows[i].eleven, rows[i].twelve, rows[i].thirteen, rows[i].fourteen, rows[i].fifteen, rows[i].sixteen, rows[i].seventeen, rows[i].eighteen, rows[i].nineteen, rows[i].twenty, rows[i].twentyone, rows[i].twentytwo, rows[i].twentythree, rows[i].twentyfour, rows[i].twentyfive, rows[i].twentysix, rows[i].twentyseven, rows[i].twentyeight, rows[i].twentynine, rows[i].thirty, rows[i].thirtyone, rows[i].od1one, rows[i].od1two, rows[i].od1three, rows[i].od1four, rows[i].od1five, rows[i].od1six, rows[i].od1seven, rows[i].od1eight, rows[i].od1nine, rows[i].od1ten, rows[i].od1eleven, rows[i].od1twelve, rows[i].od1thirteen, rows[i].od1fourteen, rows[i].od1fifteen, rows[i].od1sixteen, rows[i].od1seventeen, rows[i].od1eighteen, rows[i].od1nineteen, rows[i].od1twenty, rows[i].od1twentyone, rows[i].od1twentytwo, rows[i].od1twentythree, rows[i].od1twentyfour, rows[i].od1twentyfive, rows[i].od1twentysix, rows[i].od1twentyseven, rows[i].od1twentyeight, rows[i].od1twentynine, rows[i].od1thirty, rows[i].od1thirtyone, rows[i].od2one, rows[i].od2two, rows[i].od2three, rows[i].od2four, rows[i].od2five, rows[i].od2six, rows[i].od2seven, rows[i].od2eight, rows[i].od2nine, rows[i].od2ten, rows[i].od2eleven, rows[i].od2twelve, rows[i].od2thirteen, rows[i].od2fourteen, rows[i].od2fifteen, rows[i].od2sixteen, rows[i].od2seventeen, rows[i].od2eighteen, rows[i].od2nineteen, rows[i].od2twenty, rows[i].od2twentyone, rows[i].od2twentytwo, rows[i].od2twentythree, rows[i].od2twentyfour, rows[i].od2twentyfive, rows[i].od2twentysix, rows[i].od2twentyseven, rows[i].od2twentyeight, rows[i].od2twentynine, rows[i].od2thirty, rows[i].od2thirtyone, (rows[i].presentdays != undefined ? rows[i].presentdays : 0), (rows[i].othours != undefined ? rows[i].othours : 0), rows[i].status, rows[i].jobcode, rows[i].eddays);
						}
						members.push(obj);

						if ((i + 1 == rowsReturned) || (rows[i].projectid != rows[i + 1].projectid) || (rows[i].monthandyear != rows[i + 1].monthandyear)) {
							var attendance = new clientModel.attendance(rows[i].clientid, rows[i].projectid, rows[i].monthandyear, rows[i].changedby, members);
							result.push(attendance)

							members = [];
						}
					}
				}
				resolve(result);
			}).catch(function (err) {
				errorDAL.errorlog('Error',"clientDAL::getattendanceinfo",err.stack,JSON.stringify(projectid, monthandyear),"getattendanceinfo");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::getattendanceinfo",err.stack,JSON.stringify(projectid, monthandyear),"getattendanceinfo");
			reject(err);
		});
	});
}

module.exports.getclientdashboard = function (clientid) {
	var LastMonth = moment().subtract(1, 'months').startOf('month').format('YYYY-MM-DD');
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
                SELECT COUNT(*) AS projcount from project where clientid = ? AND statusid=321;
                SELECT SUM(totalamount - paidamount) AS pendingamount from invoice where clientid = ? AND invoicestatus IN (1,2);
                SELECT

                    p.projectno,
                    COUNT(*) AS empcount

                FROM

                    jobactivity ja

                INNER JOIN project p ON
                    ja.projectid = p.projectid

                WHERE ja.jobstatuscode = '2' AND ja.clientid = ?
                GROUP BY p.projectno
                ORDER BY p.projectno;
                SELECT COUNT(*) AS employeecount FROM jobactivity ja LEFT JOIN member mem ON mem.memberid  = ja.memberid WHERE jobstatuscode = '2' AND clientid = ? AND mem.lastattendance = ?;
                SELECT COUNT(*) AS totalemployeecount FROM jobactivity WHERE jobstatuscode = '2' AND clientid = ?;
                SELECT COUNT(*) AS totalprojcount from project where clientid = ?;
                SELECT COUNT(*) AS totalinvoices from invoice where clientid = ? AND invoicestatus IN (1,2);
                SELECT SUM(totalamount) AS totalamount from invoice where clientid = ?;

            */
			});
			con.query(query, [clientid, clientid, clientid, clientid, LastMonth, clientid, clientid, clientid, clientid]).then(function (rows, fields) {
				if (rows.length > 0) {
					var projectcount = 0;
					var pendingamount = 0;
					var employeecount = 0;
					var totalemployeecount = 0;
					var totalprojcount = 0;
					var totalinvoices = 0;
					var totalamount = 0;
					var projectemployees = [];
					if (rows[0].length > 0) {
						projectcount = rows[0][0].projcount
					}

					if (rows[1].length > 0) {
						pendingamount = rows[1][0].pendingamount
					}

					if (rows[2].length > 0) {
						var rowsReturned = rows[2].length;
						if (rowsReturned > 0) {
							for (var i = 0; i < rowsReturned; i++) {
								var client = {
									"employeecount": rows[2][i].empcount,
									"projectno": rows[2][i].projectno
								};
								projectemployees.push(client);
							}
						}
					}
					if (rows[3].length > 0) {
						employeecount = rows[3][0].employeecount
					}
					if (rows[4].length > 0) {
						totalemployeecount = rows[4][0].totalemployeecount
					}
					if (rows[5].length > 0) {
						totalprojcount = rows[5][0].totalprojcount
					}
					if (rows[6].length > 0) {
						totalinvoices = rows[6][0].totalinvoices
					}
					if (rows[7].length > 0) {
						totalamount = rows[7][0].totalamount
					}

				}
				resolve({
					"projectcount": projectcount,
					"pendingamount": pendingamount,
					"employeecount": employeecount,
					"projectemployees": projectemployees,
					"totalemployeecount": totalemployeecount,
					"totalprojcount": totalprojcount,
					"totalinvoices": totalinvoices,
					"totalamount": totalamount
				})
			}).catch(function (err) {
				errorDAL.errorlog('Error',"clientDAL::getclientdashboard",err.stack,clientid,"getclientdashboard");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::getclientdashboard",err.stack,clientid,"getclientdashboard");
			reject(err);
		});
	});
}

module.exports.getEmployeesCountList = function (clientid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
				    SELECT DATE_FORMAT(mem.dob,'%d-%m-%Y') AS dateofbirth,mem.texcono,mem.serviceno,mem.firstname,mem.lastname,mem.aadhaarno,mem.email,mem.mobile,cl.clientid,cl.organization  FROM jobactivity ja LEFT JOIN member mem ON mem.memberid  = ja.memberid  LEFT JOIN client cl ON cl.clientid = ja.clientid  WHERE jobstatuscode = '2' AND cl.clientid = ?;
				*/
			});
			con.query(query, [clientid]).then(function (rows, fields) {
				resolve(rows)
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::getEmployeesCountList",err.stack,clientid,"getEmployeesCountList");
			reject(err);
		});
	});
}

module.exports.getCurrentEmployeesCountList = function (clientid) {
	var LastMonth = moment().subtract(1, 'months').startOf('month').format('YYYY-MM-DD');
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
				    SELECT DATE_FORMAT(mem.dob,'%d-%m-%Y') AS dateofbirth,mem.texcono,mem.serviceno,mem.firstname,mem.lastname,mem.aadhaarno,mem.email,mem.mobile,cl.clientid,cl.organization FROM jobactivity ja LEFT JOIN member mem ON mem.memberid  = ja.memberid LEFT JOIN client cl ON cl.clientid = ja.clientid WHERE jobstatuscode = '2' AND ja.clientid = ? AND mem.lastattendance = ?;
				*/
			});
			con.query(query, [clientid, LastMonth]).then(function (rows, fields) {
				resolve(rows)
			}).catch(function (err) {
				errorDAL.errorlog('Error',"clientDAL::getCurrentEmployeesCountList",err.stack,clientid,"getCurrentEmployeesCountList");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::getCurrentEmployeesCountList",err.stack,clientid,"getCurrentEmployeesCountList");
			reject(err);
		});
	});
}

module.exports.getattendancehold = function (clientid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
				SELECT 
					at.monthandyear,
					at.projectid,
					at.clientid,
					p.projectno,
					p.name,
					cl.organization
				FROM attendance at
				INNER JOIN client cl ON
					cl.clientid = at.clientid 
				INNER JOIN project p ON
					p.projectid = at.projectid
				WHERE (at.edhold = 1 OR at.lreserve = 1 OR at.athold = 1) AND at.clientid = ?

				GROUP BY
				clientid,
				projectid,
				monthandyear

            */
			});
			con.query(query, [clientid]).then(function (rows, fields) {
				var rowsReturned = rows.length;
				var result = [];
				if (rowsReturned > 0) {
					for (var i = 0; i < rowsReturned; i++) {
						var attendance = new clientModel.holdattednace(rows[i].clientid, rows[i].projectid, rows[i].monthandyear, rows[i].projectno, rows[i].name, rows[i].organization);
						result.push(attendance)
					}
				}
				resolve(result);
			}).catch(function (err) {
				errorDAL.errorlog('Error',"clientDAL::getattendancehold",err.stack,clientid,"getattendancehold");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::getattendancehold",err.stack,clientid,"getattendancehold");
			reject(err);
		});
	});
}

module.exports.updateattendnacehold = function (clientid, projectid, monthandyear, status, holdids, unholdids, reason) {
	return new app.promise(function (resolve, reject) {
		// console.log('reason', reason);
		mySqlConnection.connection().then(function (con) {
			var queries = '';
			if (reason != undefined) {
				if (reason.length > 0) {
					reason.forEach(function (item) {
						console.log('item', item);
						queries += con.format("UPDATE attendance SET athold = ?, reason=? WHERE attendanceid = ?;", [status, item.reasondetails, item.attendanceid]);
					});
				}
			}
			// console.log('unholdids', unholdids);
			if (unholdids != undefined) {
				if (unholdids.length > 0) {
				   unholdids.forEach(function (items) {
					console.log('items', items);
				       queries += con.format("UPDATE attendance SET athold = 0, reason = '' WHERE attendanceid = ?;", [items])
				   });
				}
			}
			// console.log('queries', queries);
			if (queries != '') {
				con.query(queries).then(function (rows, fields) {
					resolve({
						"clientid": clientid
					});
				}).catch(function (err) {
					errorDAL.errorlog('Error',"clientDAL::updateattendnacehold",err.stack,JSON.stringify(queries),"updateattendnacehold");
					reject(err);
				});
			} else {
				resolve({
					"clientid": clientid
				});
			}
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::updateattendnacehold",err.stack,JSON.stringify(clientid),"updateattendnacehold");
			reject(err);
		});
	});
}

module.exports.updateattendnaceedhold = function (attendanceids, edhold, unedholdids) {
	// console.log('attendanceids', attendanceids);
	// console.log('edhold', edhold);
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			con.query('UPDATE attendance SET edhold = ?,edstatus = 1 WHERE attendanceid IN (?);', [edhold, attendanceids]).then(function (rows, fields) {
				if(unedholdids != undefined) {	
					if(unedholdids.length > 0) {
						con.query('UPDATE attendance SET edhold = 0 WHERE attendanceid IN (?);UPDATE attendance SET edstatus = 0 WHERE attendanceid IN (?) AND status IN (0,1);', [unedholdids,unedholdids]).then(function (rows, fields) {
							resolve({
								"attendanceid": attendanceids
							})
						}).catch(function (err) {
							reject(err);
						});
					} else {
						resolve({
							"attendanceid": attendanceids
						})
					} 
				}  else {
						resolve({
							"attendanceid": attendanceids
						})
					} 
			}).catch(function (err) {
				errorDAL.errorlog('Error',"clientDAL::updateattendnaceedhold",err.stack,JSON.stringify(attendanceids, edhold, unedholdids),"updateattendnaceedhold");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::updateattendnaceedhold",err.stack,JSON.stringify(attendanceids, edhold, unedholdids),"updateattendnaceedhold");
			reject(err);
		});
	});
}

module.exports.getattendanceedit = function (projectid, monthandyear, edittype) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			if(edittype == 1) {
				var query = multiline.stripIndent(function () {
					/*
						SELECT
							at.attendanceid,at.clientid,at.projectid,at.memberid,at.monthandyear,at.one,at.two,at.three,at.four,at.five,at.six,at.seven,at.eight,at.nine,at.ten,
							at.eleven,at.twelve,at.thirteen,at.fourteen,at.fifteen,at.sixteen,
							at.seventeen,at.eighteen,at.nineteen,at.twenty,at.twentyone,at.twentytwo,
							at.twentythree,at.twentyfour,at.twentyfive,at.twentysix,at.twentyseven,
							at.twentyeight,at.twentynine,at.thirty,at.thirtyone,'0'  AS od1one,
							'0'  AS od1two,'0'  AS od1three,'0'  AS od1four,'0'  AS od1five,
							'0'  AS od1six,'0'  AS od1seven,'0'  AS od1eight,'0'  AS od1nine,
							'0'  AS od1ten,'0'  AS od1eleven,'0'  AS od1twelve,'0'  AS od1thirteen,
							'0'  AS od1fourteen,
							'0'  AS od1fifteen,
							'0'  AS od1sixteen,
							'0'  AS od1seventeen,
							'0'  AS od1eighteen,
							'0'  AS od1nineteen,
							'0'  AS od1twenty,
							'0'  AS od1twentyone,
							'0'  AS od1twentytwo,
							'0'  AS od1twentythree,
							'0'  AS od1twentyfour,
							'0'  AS od1twentyfive,
							'0'  AS od1twentysix,
							'0'  AS od1twentyseven,
							'0'  AS od1twentyeight,
							'0'  AS od1twentynine,
							'0'  AS od1thirty,
							'0'  AS od1thirtyone,
							'0'  AS od2one,
							'0'  AS od2two,
							'0'  AS od2three,
							'0'  AS od2four,
							'0'  AS od2five,
							'0'  AS od2six,
							'0'  AS od2seven,
							'0'  AS od2eight,
							'0'  AS od2nine,
							'0'  AS od2ten,
							'0'  AS od2eleven,
							'0'  AS od2twelve,
							'0'  AS od2thirteen,
							'0'  AS od2fourteen,
							'0'  AS od2fifteen,
							'0'  AS od2sixteen,
							'0'  AS od2seventeen,
							'0'  AS od2eighteen,
							'0'  AS od2nineteen,
							'0'  AS od2twenty,
							'0'  AS od2twentyone,
							'0'  AS od2twentytwo,
							'0'  AS od2twentythree,
							'0'  AS od2twentyfour,
							'0'  AS od2twentyfive,
							'0'  AS od2twentysix,
							'0'  AS od2twentyseven,
							'0'  AS od2twentyeight,
							'0'  AS od2twentynine,
							'0'  AS od2thirty,
							'0'  AS od2thirtyone,
							'0'  AS selectattendance,
							'0'  AS adselect,
							'0'  AS ed1select,
							'0'  AS ed2select,
							'0'  AS SelectItems,
							at.presentdays,
							at.othours,
							at.status,
							at.reason,
							m.firstname,
							m.lastname,
							m.texcono,
							m.serviceno,
							pr.name AS projectname,
							pr.projectno,
							cl.organization,
							jm.code AS jobcode,
							jm.name AS jobname
							
							FROM attendance at

							INNER JOIN client cl ON
								cl.clientid = at.clientid
							AND cl.active =1

							INNER JOIN project pr ON
								pr.projectid = at.projectid
								AND pr.active =1

							INNER JOIN member m ON
								m.memberid = at.memberid
								AND m.active =1

							INNER JOIN jobmaster jm ON
								jm.jobmasterid = at.jobmasterid 
								AND jm.active =1
								
						WHERE at.active = 1 AND at.status IN (0,7) AND at.athold = 1 AND at.projectid = ? AND at.monthandyear = ? AND at.attendancesaved = 1;
					*/
				});
			} else {
				var query = multiline.stripIndent(function () {
					/*
						SELECT
							at.attendanceid,at.clientid,at.projectid,at.memberid,at.monthandyear,at.one,at.two,at.three,at.four,at.five,at.six,at.seven,at.eight,at.nine,at.ten,
							at.eleven,at.twelve,at.thirteen,at.fourteen,at.fifteen,at.sixteen,
							at.seventeen,at.eighteen,at.nineteen,at.twenty,at.twentyone,at.twentytwo,
							at.twentythree,at.twentyfour,at.twentyfive,at.twentysix,at.twentyseven,
							at.twentyeight,at.twentynine,at.thirty,at.thirtyone,'0'  AS od1one,
							'0'  AS od1two,'0'  AS od1three,'0'  AS od1four,'0'  AS od1five,
							'0'  AS od1six,'0'  AS od1seven,'0'  AS od1eight,'0'  AS od1nine,
							'0'  AS od1ten,'0'  AS od1eleven,'0'  AS od1twelve,'0'  AS od1thirteen,
							'0'  AS od1fourteen,
							'0'  AS od1fifteen,
							'0'  AS od1sixteen,
							'0'  AS od1seventeen,
							'0'  AS od1eighteen,
							'0'  AS od1nineteen,
							'0'  AS od1twenty,
							'0'  AS od1twentyone,
							'0'  AS od1twentytwo,
							'0'  AS od1twentythree,
							'0'  AS od1twentyfour,
							'0'  AS od1twentyfive,
							'0'  AS od1twentysix,
							'0'  AS od1twentyseven,
							'0'  AS od1twentyeight,
							'0'  AS od1twentynine,
							'0'  AS od1thirty,
							'0'  AS od1thirtyone,
							'0'  AS od2one,
							'0'  AS od2two,
							'0'  AS od2three,
							'0'  AS od2four,
							'0'  AS od2five,
							'0'  AS od2six,
							'0'  AS od2seven,
							'0'  AS od2eight,
							'0'  AS od2nine,
							'0'  AS od2ten,
							'0'  AS od2eleven,
							'0'  AS od2twelve,
							'0'  AS od2thirteen,
							'0'  AS od2fourteen,
							'0'  AS od2fifteen,
							'0'  AS od2sixteen,
							'0'  AS od2seventeen,
							'0'  AS od2eighteen,
							'0'  AS od2nineteen,
							'0'  AS od2twenty,
							'0'  AS od2twentyone,
							'0'  AS od2twentytwo,
							'0'  AS od2twentythree,
							'0'  AS od2twentyfour,
							'0'  AS od2twentyfive,
							'0'  AS od2twentysix,
							'0'  AS od2twentyseven,
							'0'  AS od2twentyeight,
							'0'  AS od2twentynine,
							'0'  AS od2thirty,
							'0'  AS od2thirtyone,
							'0'  AS selectattendance,
							'0'  AS adselect,
							'0'  AS ed1select,
							'0'  AS ed2select,
							'0'  AS SelectItems,
							at.presentdays,
							at.othours,
							at.status,
							at.reason,
							m.firstname,
							m.lastname,
							m.texcono,
							m.serviceno,
							pr.name AS projectname,
							pr.projectno,
							cl.organization,
							jm.code AS jobcode,
							jm.name AS jobname
							
							FROM attendance at

							INNER JOIN client cl ON
								cl.clientid = at.clientid
							AND cl.active =1

							INNER JOIN project pr ON
								pr.projectid = at.projectid
								AND pr.active =1

							INNER JOIN member m ON
								m.memberid = at.memberid
								AND m.active =1

							INNER JOIN jobmaster jm ON
								jm.jobmasterid = at.jobmasterid 
								AND jm.active =1
								
						WHERE at.active = 1 AND at.status = 0 AND at.projectid = ? AND at.monthandyear = ? AND at.attendancesaved = 1;
					*/
				});
			}
			//AND ( at.edhold = 1 || at.lreserve =1)
			con.query(query, [projectid, monthandyear]).then(function (rows, fields) {
				var rowsReturned = rows.length;
				var result = [];
				var members = [];
				var attendance = {};
				if (rowsReturned > 0) {
					for (var i = 0; i < rowsReturned; i++) {
						if (rows[i].jobcode != 'DVR') {
							
							if (rows[i].one == 1) {
								rows[i].one = 1;
								rows[i].od1one = 0;
								rows[i].od2one = 0;
								rows[i].selectattendance = 1;
								rows[i].adselect = 1;
							}
							if (rows[i].two == 1) {
								rows[i].two = 1;
								rows[i].od1two = 0;
								rows[i].od2two = 0;
								rows[i].selectattendance = 1;
								rows[i].adselect = 1;
							}
							if (rows[i].three == 1) {
								rows[i].three = 1;
								rows[i].od1three = 0;
								rows[i].od2three = 0;
								rows[i].selectattendance = 1;
								rows[i].adselect = 1;
							}
							if (rows[i].four == 1) {
								rows[i].four = 1;
								rows[i].od1four = 0;
								rows[i].od2four = 0;
								rows[i].selectattendance = 1;
								rows[i].adselect = 1;
							}
							if (rows[i].five == 1) {
								rows[i].five = 1;
								rows[i].od1five = 0;
								rows[i].od2five = 0;
								rows[i].selectattendance = 1;
								rows[i].adselect = 1;
							}
							if (rows[i].six == 1) {
								rows[i].six = 1;
								rows[i].od1six = 0;
								rows[i].od2six = 0;
								rows[i].selectattendance = 1;
								rows[i].adselect = 1;
							}
							if (rows[i].seven == 1) {
								rows[i].seven = 1;
								rows[i].od1seven = 0;
								rows[i].od2seven = 0;
								rows[i].selectattendance = 1;
								rows[i].adselect = 1;
							}
							if (rows[i].eight == 1) {
								rows[i].eight = 1;
								rows[i].od1eight = 0;
								rows[i].od2eight = 0;
								rows[i].selectattendance = 1;
								rows[i].adselect = 1;
							}
							if (rows[i].nine == 1) {
								rows[i].nine = 1;
								rows[i].od1nine = 0;
								rows[i].od2nine = 0;
								rows[i].selectattendance = 1;
								rows[i].adselect = 1;
							}
							if (rows[i].ten == 1) {
								rows[i].ten = 1;
								rows[i].od1ten = 0;
								rows[i].od2ten = 0;
								rows[i].selectattendance = 1;
								rows[i].adselect = 1;
							}
							if (rows[i].eleven == 1) {
								rows[i].eleven = 1;
								rows[i].od1eleven = 0;
								rows[i].od2eleven = 0;
								rows[i].selectattendance = 1;
								rows[i].adselect = 1;
							}
							if (rows[i].twelve == 1) {
								rows[i].twelve = 1;
								rows[i].od1twelve = 0;
								rows[i].od2twelve = 0;
								rows[i].selectattendance = 1;
								rows[i].adselect = 1;
							}
							if (rows[i].thirteen == 1) {
								rows[i].thirteen = 1;
								rows[i].od1thirteen = 0;
								rows[i].od2thirteen = 0;
								rows[i].selectattendance = 1;
								rows[i].adselect = 1;
							}
							if (rows[i].fourteen == 1) {
								rows[i].fourteen = 1;
								rows[i].od1fourteen = 0;
								rows[i].od2fourteen = 0;
								rows[i].selectattendance = 1;
								rows[i].adselect = 1;
							}
							if (rows[i].fifteen == 1) {
								rows[i].fifteen = 1;
								rows[i].od1fifteen = 0;
								rows[i].od2fifteen = 0;
								rows[i].selectattendance = 1;
								rows[i].adselect = 1;
							}
							if (rows[i].sixteen == 1) {
								rows[i].sixteen = 1;
								rows[i].od1sixteen = 0;
								rows[i].od2sixteen = 0;
								rows[i].selectattendance = 1;
								rows[i].adselect = 1;
							}
							if (rows[i].seventeen == 1) {
								rows[i].seventeen = 1;
								rows[i].od1seventeen = 0;
								rows[i].od2seventeen = 0;
								rows[i].selectattendance = 1;
								rows[i].adselect = 1;
							}
							if (rows[i].eighteen == 1) {
								rows[i].eighteen = 1;
								rows[i].od1eighteen = 0;
								rows[i].od2eighteen = 0;
								rows[i].selectattendance = 1;
								rows[i].adselect = 1;
							}
							if (rows[i].nineteen == 1) {
								rows[i].nineteen = 1;
								rows[i].od1nineteen = 0;
								rows[i].od2nineteen = 0;
								rows[i].selectattendance = 1;
								rows[i].adselect = 1;
							}
							if (rows[i].twenty == 1) {
								rows[i].twenty = 1;
								rows[i].od1twenty = 0;
								rows[i].od2twenty = 0;
								rows[i].selectattendance = 1;
								rows[i].adselect = 1;
							}
							if (rows[i].twentyone == 1) {
								rows[i].twentyone = 1;
								rows[i].od1twentyone = 0;
								rows[i].od2twentyone = 0;
								rows[i].selectattendance = 1;
								rows[i].adselect = 1;
							}
							if (rows[i].twentytwo == 1) {
								rows[i].twentytwo = 1;
								rows[i].od1twentytwo = 0;
								rows[i].od2twentytwo = 0;
								rows[i].selectattendance = 1;
								rows[i].adselect = 1;
							}
							if (rows[i].twentythree == 1) {
								rows[i].twentythree = 1;
								rows[i].od1twentythree = 0;
								rows[i].od2twentythree = 0;
								rows[i].selectattendance = 1;
								rows[i].adselect = 1;
							}
							if (rows[i].twentyfour == 1) {
								rows[i].twentyfour = 1;
								rows[i].od1twentyfour = 0;
								rows[i].od2twentyfour = 0;
								rows[i].selectattendance = 1;
								rows[i].adselect = 1;
							}
							if (rows[i].twentyfive == 1) {
								rows[i].twentyfive = 1;
								rows[i].od1twentyfive = 0;
								rows[i].od2twentyfive = 0;
								rows[i].selectattendance = 1;
								rows[i].adselect = 1;
							}
							if (rows[i].twentysix == 1) {
								rows[i].twentysix = 1;
								rows[i].od1twentysix = 0;
								rows[i].od2twentysix = 0;
								rows[i].selectattendance = 1;
								rows[i].adselect = 1;
							}
							if (rows[i].twentyseven == 1) {
								rows[i].twentyseven = 1;
								rows[i].od1twentyseven = 0;
								rows[i].od2twentyseven = 0;
								rows[i].selectattendance = 1;
								rows[i].adselect = 1;
							}
							if (rows[i].twentyeight == 1) {
								rows[i].twentyeight = 1;
								rows[i].od1twentyeight = 0;
								rows[i].od2twentyeight = 0;
								rows[i].selectattendance = 1;
								rows[i].adselect = 1;
							}
							if (rows[i].twentynine == 1) {
								rows[i].twentynine = 1;
								rows[i].od1twentynine = 0;
								rows[i].od2twentynine = 0;
								rows[i].selectattendance = 1;
								rows[i].adselect = 1;
							}
							if (rows[i].thirty == 1) {
								rows[i].thirty = 1;
								rows[i].od1thirty = 0;
								rows[i].od2thirty = 0;
								rows[i].selectattendance = 1;
								rows[i].adselect = 1;
							}
							if (rows[i].thirtyone == 1) {
								rows[i].thirtyone = 1;
								rows[i].od1thirtyone = 0;
								rows[i].od2thirtyone = 0;
								rows[i].selectattendance = 1;
								rows[i].adselect = 1;
							}


							if (rows[i].one == 2) {
								rows[i].one = 1;
								rows[i].od1one = 1;
								rows[i].od2one = 0;
								rows[i].ed1select = 1;
							}
							if (rows[i].two == 2) {
								rows[i].two = 1;
								rows[i].od1two = 1;
								rows[i].od2two = 0;
								rows[i].ed1select = 1;
							}
							if (rows[i].three == 2) {
								rows[i].three = 1;
								rows[i].od1three = 1;
								rows[i].od2three = 0;
								rows[i].od2three = 0;
								rows[i].ed1select = 1;
							}
							if (rows[i].four == 2) {
								rows[i].four = 1;
								rows[i].od1four = 1;
								rows[i].od2four = 0;
								rows[i].ed1select = 1;
							}
							if (rows[i].five == 2) {
								rows[i].five = 1;
								rows[i].od1five = 1;
								rows[i].od2five = 0;
								rows[i].ed1select = 1;
							}
							if (rows[i].six == 2) {
								rows[i].six = 1;
								rows[i].od1six = 1;
								rows[i].od2six = 0;
								rows[i].ed1select = 1;
							}
							if (rows[i].seven == 2) {
								rows[i].seven = 1;
								rows[i].od1seven = 1;
								rows[i].od2seven = 0;
								rows[i].ed1select = 1;
							}
							if (rows[i].eight == 2) {
								rows[i].eight = 1;
								rows[i].od1eight = 1;
								rows[i].od2eight = 0;
								rows[i].ed1select = 1;
							}
							if (rows[i].nine == 2) {
								rows[i].nine = 1;
								rows[i].od1nine = 1;
								rows[i].od2nine = 0;
								rows[i].ed1select = 1;
							}
							if (rows[i].ten == 2) {
								rows[i].ten = 1;
								rows[i].od1ten = 1;
								rows[i].od2ten = 0;
								rows[i].ed1select = 1;
							}
							if (rows[i].eleven == 2) {
								rows[i].eleven = 1;
								rows[i].od1eleven = 1;
								rows[i].od2eleven = 0;
								rows[i].ed1select = 1;
							}
							if (rows[i].twelve == 2) {
								rows[i].twelve = 1;
								rows[i].od1twelve = 1;
								rows[i].od2twelve = 0;
								rows[i].ed1select = 1;
							}
							if (rows[i].thirteen == 2) {
								rows[i].thirteen = 1;
								rows[i].od1thirteen = 1;
								rows[i].od2thirteen = 0;
							}
							if (rows[i].fourteen == 2) {
								rows[i].fourteen = 1;
								rows[i].od1fourteen = 1;
								rows[i].od2fourteen = 0;
								rows[i].ed1select = 1;
							}
							if (rows[i].fifteen == 2) {
								rows[i].fifteen = 1;
								rows[i].od1fifteen = 1;
								rows[i].od2fifteen = 0;
								rows[i].ed1select = 1;
							}
							if (rows[i].sixteen == 2) {
								rows[i].sixteen = 1;
								rows[i].od1sixteen = 1;
								rows[i].od2sixteen = 0;
								rows[i].ed1select = 1;
							}
							if (rows[i].seventeen == 2) {
								rows[i].seventeen = 1;
								rows[i].od1seventeen = 1;
								rows[i].od2seventeen = 0;
								rows[i].ed1select = 1;
							}
							if (rows[i].eighteen == 2) {
								rows[i].eighteen = 1;
								rows[i].od1eighteen = 1;
								rows[i].od2eighteen = 0;
								rows[i].ed1select = 1;
							}
							if (rows[i].nineteen == 2) {
								rows[i].nineteen = 1;
								rows[i].od1nineteen = 1;
								rows[i].od2nineteen = 0;
								rows[i].ed1select = 1;
							}
							if (rows[i].twenty == 2) {
								rows[i].twenty = 1;
								rows[i].od1twenty = 1;
								rows[i].od2twenty = 0;
								rows[i].ed1select = 1;
							}
							if (rows[i].twentyone == 2) {
								rows[i].twentyone = 1;
								rows[i].od1twentyone = 1;
								rows[i].od2twentyone = 0;
								rows[i].ed1select = 1;
							}
							if (rows[i].twentytwo == 2) {
								rows[i].twentytwo = 1;
								rows[i].od1twentytwo = 1;
								rows[i].od2twentytwo = 0;
								rows[i].ed1select = 1;
							}
							if (rows[i].twentythree == 2) {
								rows[i].twentythree = 1;
								rows[i].od1twentythree = 1;
								rows[i].od2twentythree = 0;
								rows[i].ed1select = 1;
							}
							if (rows[i].twentyfour == 2) {
								rows[i].twentyfour = 1;
								rows[i].od1twentyfour = 1;
								rows[i].od2twentyfour = 0;
								rows[i].ed1select = 1;
							}
							if (rows[i].twentyfive == 2) {
								rows[i].twentyfive = 1;
								rows[i].od1twentyfive = 1;
								rows[i].od2twentyfive = 0;
								rows[i].ed1select = 1;
							}
							if (rows[i].twentysix == 2) {
								rows[i].twentysix = 1;
								rows[i].od1twentysix = 1;
								rows[i].od2twentysix = 0;
								rows[i].ed1select = 1;
							}
							if (rows[i].twentyseven == 2) {
								rows[i].twentyseven = 1;
								rows[i].od1twentyseven = 1;
								rows[i].od2twentyseven = 0;
								rows[i].ed1select = 1;
							}
							if (rows[i].twentyeight == 2) {
								rows[i].twentyeight = 1;
								rows[i].od1twentyeight = 1;
								rows[i].od2twentyeight = 0;
								rows[i].ed1select = 1;
							}
							if (rows[i].twentynine == 2) {
								rows[i].twentynine = 1;
								rows[i].od1twentynine = 1;
								rows[i].od2twentynine = 0;
								rows[i].ed1select = 1;
							}
							if (rows[i].thirty == 2) {
								rows[i].thirty = 1;
								rows[i].od1thirty = 1;
								rows[i].od2thirty = 0;
								rows[i].ed1select = 1;
							}
							if (rows[i].thirtyone == 2) {
								rows[i].thirtyone = 1;
								rows[i].od1thirtyone = 1;
								rows[i].od2thirtyone = 0;
								rows[i].ed1select = 1;
							}


							if (rows[i].one == 2.5) {
								rows[i].one = 1;
								rows[i].od1one = 1;
								rows[i].od2one = .5;
								rows[i].ed1select = 1;
								rows[i].ed2select = 1;
							}
							if (rows[i].two == 2.5) {
								rows[i].two = 1;
								rows[i].od1two = 1;
								rows[i].od2two = .5;
								rows[i].ed1select = 1;
								rows[i].ed2select = 1;
							}
							if (rows[i].three == 2.5) {
								rows[i].three = 1;
								rows[i].od1three = 1;
								rows[i].od2three = .5;
								rows[i].ed1select = 1;
								rows[i].ed2select = 1;
							}
							if (rows[i].four == 2.5) {
								rows[i].four = 1;
								rows[i].od1four = 1;
								rows[i].od2four = .5;
								rows[i].ed1select = 1;
								rows[i].ed2select = 1;
							}
							if (rows[i].five == 2.5) {
								rows[i].five = 1;
								rows[i].od1five = 1;
								rows[i].od2five = .5;
								rows[i].ed1select = 1;
								rows[i].ed2select = 1;
							}
							if (rows[i].six == 2.5) {
								rows[i].six = 1;
								rows[i].od1six = 1;
								rows[i].od2six = .5;
								rows[i].ed1select = 1;
								rows[i].ed2select = 1;
							}
							if (rows[i].seven == 2.5) {
								rows[i].seven = 1;
								rows[i].od1seven = 1;
								rows[i].od2seven = .5;
								rows[i].ed1select = 1;
								rows[i].ed2select = 1;
							}
							if (rows[i].eight == 2.5) {
								rows[i].eight = 1;
								rows[i].od1eight = 1;
								rows[i].od2eight = .5;
								rows[i].ed1select = 1;
								rows[i].ed2select = 1;
							}
							if (rows[i].nine == 2.5) {
								rows[i].nine = 1;
								rows[i].od1nine = 1;
								rows[i].od2nine = .5;
								rows[i].ed1select = 1;
								rows[i].ed2select = 1;
							}
							if (rows[i].ten == 2.5) {
								rows[i].ten = 1;
								rows[i].od1ten = 1;
								rows[i].od2ten = .5;
								rows[i].ed1select = 1;
								rows[i].ed2select = 1;
							}
							if (rows[i].eleven == 2.5) {
								rows[i].eleven = 1;
								rows[i].od1eleven = 1;
								rows[i].od2eleven = .5;
								rows[i].ed1select = 1;
								rows[i].ed2select = 1;
							}
							if (rows[i].twelve == 2.5) {
								rows[i].twelve = 1;
								rows[i].od1twelve = 1;
								rows[i].od2twelve = .5;
								rows[i].ed1select = 1;
								rows[i].ed2select = 1;
							}
							if (rows[i].thirteen == 2.5) {
								rows[i].thirteen = 1;
								rows[i].od1thirteen = 1;
								rows[i].od2thirteen = .5;
								rows[i].ed1select = 1;
								rows[i].ed2select = 1;
							}
							if (rows[i].fourteen == 2.5) {
								rows[i].fourteen = 1;
								rows[i].od1fourteen = 1;
								rows[i].od2fourteen = .5;
								rows[i].ed1select = 1;
								rows[i].ed2select = 1;
							}
							if (rows[i].fifteen == 2.5) {
								rows[i].fifteen = 1;
								rows[i].od1fifteen = 1;
								rows[i].od2fifteen = .5;
								rows[i].ed1select = 1;
								rows[i].ed2select = 1;
							}
							if (rows[i].sixteen == 2.5) {
								rows[i].sixteen = 1;
								rows[i].od1sixteen = 1;
								rows[i].od2sixteen = .5;
								rows[i].ed1select = 1;
								rows[i].ed2select = 1;
							}
							if (rows[i].seventeen == 2.5) {
								rows[i].seventeen = 1;
								rows[i].od1seventeen = 1;
								rows[i].od2seventeen = .5;
								rows[i].ed1select = 1;
								rows[i].ed2select = 1;
							}
							if (rows[i].eighteen == 2.5) {
								rows[i].eighteen = 1;
								rows[i].od1eighteen = 1;
								rows[i].od2eighteen = .5;
								rows[i].ed1select = 1;
								rows[i].ed2select = 1;
							}
							if (rows[i].nineteen == 2.5) {
								rows[i].nineteen = 1;
								rows[i].od1nineteen = 1;
								rows[i].od2nineteen = .5;
								rows[i].ed1select = 1;
								rows[i].ed2select = 1;
							}
							if (rows[i].twenty == 2.5) {
								rows[i].twenty = 1;
								rows[i].od1twenty = 1;
								rows[i].od2twenty = .5;
								rows[i].ed1select = 1;
								rows[i].ed2select = 1;
							}
							if (rows[i].twentyone == 2.5) {
								rows[i].twentyone = 1;
								rows[i].od1twentyone = 1;
								rows[i].od2twentyone = .5;
								rows[i].ed1select = 1;
								rows[i].ed2select = 1;
							}
							if (rows[i].twentytwo == 2.5) {
								rows[i].twentytwo = 1;
								rows[i].od1twentytwo = 1;
								rows[i].od2twentytwo = .5;
								rows[i].ed1select = 1;
								rows[i].ed2select = 1;
							}
							if (rows[i].twentythree == 2.5) {
								rows[i].twentythree = 1;
								rows[i].od1twentythree = 1;
								rows[i].od2twentythree = .5;
								rows[i].ed1select = 1;
								rows[i].ed2select = 1;
							}
							if (rows[i].twentyfour == 2.5) {
								rows[i].twentyfour = 1;
								rows[i].od1twentyfour = 1;
								rows[i].od2twentyfour = .5;
								rows[i].ed1select = 1;
								rows[i].ed2select = 1;
							}
							if (rows[i].twentyfive == 2.5) {
								rows[i].twentyfive = 1;
								rows[i].od1twentyfive = 1;
								rows[i].od2twentyfive = .5;
								rows[i].ed1select = 1;
								rows[i].ed2select = 1;
							}
							if (rows[i].twentysix == 2.5) {
								rows[i].twentysix = 1;
								rows[i].od1twentysix = 1;
								rows[i].od2twentysix = .5;
								rows[i].ed1select = 1;
								rows[i].ed2select = 1;
							}
							if (rows[i].twentyseven == 2.5) {
								rows[i].twentyseven = 1;
								rows[i].od1twentyseven = 1;
								rows[i].od2twentyseven = .5;
								rows[i].ed1select = 1;
								rows[i].ed2select = 1;
							}
							if (rows[i].twentyeight == 2.5) {
								rows[i].twentyeight = 1;
								rows[i].od1twentyeight = 1;
								rows[i].od2twentyeight = .5;
								rows[i].ed1select = 1;
								rows[i].ed2select = 1;
							}
							if (rows[i].twentynine == 2.5) {
								rows[i].twentynine = 1;
								rows[i].od1twentynine = 1;
								rows[i].od2twentynine = .5;
								rows[i].ed1select = 1;
								rows[i].ed2select = 1;
							}
							if (rows[i].thirty == 2.5) {
								rows[i].thirty = 1;
								rows[i].od1thirty = 1;
								rows[i].od2thirty = .5;
								rows[i].ed1select = 1;
								rows[i].ed2select = 1;
							}
							if (rows[i].thirtyone == 2.5) {
								rows[i].thirtyone = 1;
								rows[i].od1thirtyone = 1;
								rows[i].od2thirtyone = .5;
								rows[i].ed1select = 1;
								rows[i].ed2select = 1;
							}

							if (rows[i].one == 1.5) {
								rows[i].one = 1;
								rows[i].od1one = 0;
								rows[i].od2one = .5;
								rows[i].ed1select = 1;
								rows[i].ed2select = 1;
							}
							if (rows[i].two == 1.5) {
								rows[i].two = 1;
								rows[i].od1two = 0;
								rows[i].od2two = .5;
								rows[i].ed1select = 1;
								rows[i].ed2select = 1;
							}
							if (rows[i].three == 1.5) {
								rows[i].three = 1;
								rows[i].od1three = 0;
								rows[i].od2three = .5;
								rows[i].ed1select = 1;
								rows[i].ed2select = 1;
							}
							if (rows[i].four == 1.5) {
								rows[i].four = 1;
								rows[i].od1four = 0;
								rows[i].od2four = .5;
								rows[i].ed1select = 1;
								rows[i].ed2select = 1;
							}
							if (rows[i].five == 1.5) {
								rows[i].five = 1;
								rows[i].od1five = 0;
								rows[i].od2five = .5;
								rows[i].ed1select = 1;
								rows[i].ed2select = 1;
							}
							if (rows[i].six == 1.5) {
								rows[i].six = 1;
								rows[i].od1six = 0;
								rows[i].od2six = .5;
								rows[i].ed1select = 1;
								rows[i].ed2select = 1;
							}
							if (rows[i].seven == 1.5) {
								rows[i].seven = 1;
								rows[i].od1seven = 0;
								rows[i].od2seven = .5;
								rows[i].ed1select = 1;
								rows[i].ed2select = 1;
							}
							if (rows[i].eight == 1.5) {
								rows[i].eight = 1;
								rows[i].od1eight = 0;
								rows[i].od2eight = .5;
								rows[i].ed1select = 1;
								rows[i].ed2select = 1;
							}
							if (rows[i].nine == 1.5) {
								rows[i].nine = 1;
								rows[i].od1nine = 0;
								rows[i].od2nine = .5;
								rows[i].ed1select = 1;
								rows[i].ed2select = 1;
							}
							if (rows[i].ten == 1.5) {
								rows[i].ten = 1;
								rows[i].od1ten = 0;
								rows[i].od2ten = .5;
								rows[i].ed1select = 1;
								rows[i].ed2select = 1;
							}
							if (rows[i].eleven == 1.5) {
								rows[i].eleven = 1;
								rows[i].od1eleven = 0;
								rows[i].od2eleven = .5;
								rows[i].ed1select = 1;
								rows[i].ed2select = 1;
							}
							if (rows[i].twelve == 1.5) {
								rows[i].twelve = 1;
								rows[i].od1twelve = 0;
								rows[i].od2twelve = .5;
								rows[i].ed1select = 1;
								rows[i].ed2select = 1;
							}
							if (rows[i].thirteen == 1.5) {
								rows[i].thirteen = 1;
								rows[i].od1thirteen = 0;
								rows[i].od2thirteen = .5;
								rows[i].ed1select = 1;
								rows[i].ed2select = 1;
							}
							if (rows[i].fourteen == 1.5) {
								rows[i].fourteen = 1;
								rows[i].od1fourteen = 0;
								rows[i].od2fourteen = .5;
								rows[i].ed1select = 1;
								rows[i].ed2select = 1;
							}
							if (rows[i].fifteen == 1.5) {
								rows[i].fifteen = 1;
								rows[i].od1fifteen = 0;
								rows[i].od2fifteen = .5;
								rows[i].ed1select = 1;
								rows[i].ed2select = 1;
							}
							if (rows[i].sixteen == 1.5) {
								rows[i].sixteen = 1;
								rows[i].od1sixteen = 0;
								rows[i].od2sixteen = .5;
								rows[i].ed1select = 1;
								rows[i].ed2select = 1;
							}
							if (rows[i].seventeen == 1.5) {
								rows[i].seventeen = 1;
								rows[i].od1seventeen = 0;
								rows[i].od2seventeen = .5;
								rows[i].ed1select = 1;
								rows[i].ed2select = 1;
							}
							if (rows[i].eighteen == 1.5) {
								rows[i].eighteen = 1;
								rows[i].od1eighteen = 0;
								rows[i].od2eighteen = .5;
								rows[i].ed1select = 1;
								rows[i].ed2select = 1;
							}
							if (rows[i].nineteen == 1.5) {
								rows[i].nineteen = 1;
								rows[i].od1nineteen = 0;
								rows[i].od2nineteen = .5;
								rows[i].ed1select = 1;
								rows[i].ed2select = 1;
							}
							if (rows[i].twenty == 1.5) {
								rows[i].twenty = 1;
								rows[i].od1twenty = 0;
								rows[i].od2twenty = .5;
								rows[i].ed1select = 1;
								rows[i].ed2select = 1;
							}
							if (rows[i].twentyone == 1.5) {
								rows[i].twentyone = 1;
								rows[i].od1twentyone = 0;
								rows[i].od2twentyone = .5;
								rows[i].ed1select = 1;
								rows[i].ed2select = 1;
							}
							if (rows[i].twentytwo == 1.5) {
								rows[i].twentytwo = 1;
								rows[i].od1twentytwo = 0;
								rows[i].od2twentytwo = .5;
								rows[i].ed1select = 1;
								rows[i].ed2select = 1;
							}
							if (rows[i].twentythree == 1.5) {
								rows[i].twentythree = 1;
								rows[i].od1twentythree = 0;
								rows[i].od2twentythree = .5;
								rows[i].ed1select = 1;
								rows[i].ed2select = 1;
							}
							if (rows[i].twentyfour == 1.5) {
								rows[i].twentyfour = 1;
								rows[i].od1twentyfour = 0;
								rows[i].od2twentyfour = .5;
								rows[i].ed1select = 1;
								rows[i].ed2select = 1;
							}
							if (rows[i].twentyfive == 1.5) {
								rows[i].twentyfive = 1;
								rows[i].od1twentyfive = 0;
								rows[i].od2twentyfive = .5;
								rows[i].ed1select = 1;
								rows[i].ed2select = 1;
							}
							if (rows[i].twentysix == 1.5) {
								rows[i].twentysix = 1;
								rows[i].od1twentysix = 0;
								rows[i].od2twentysix = .5;
								rows[i].ed1select = 1;
								rows[i].ed2select = 1;
							}
							if (rows[i].twentyseven == 1.5) {
								rows[i].twentyseven = 1;
								rows[i].od1twentyseven = 0;
								rows[i].od2twentyseven = .5;
								rows[i].ed1select = 1;
								rows[i].ed2select = 1;
							}
							if (rows[i].twentyeight == 1.5) {
								rows[i].twentyeight = 1;
								rows[i].od1twentyeight = 0;
								rows[i].od2twentyeight = .5;
								rows[i].ed1select = 1;
								rows[i].ed2select = 1;
							}
							if (rows[i].twentynine == 1.5) {
								rows[i].twentynine = 1;
								rows[i].od1twentynine = 0;
								rows[i].od2twentynine = .5;
								rows[i].ed1select = 1;
								rows[i].ed2select = 1;
							}
							if (rows[i].thirty == 1.5) {
								rows[i].thirty = 1;
								rows[i].od1thirty = 0;
								rows[i].od2thirty = .5;
								rows[i].ed1select = 1;
								rows[i].ed2select = 1;
							}
							if (rows[i].thirtyone == 1.5) {
								rows[i].thirtyone = 1;
								rows[i].od1thirtyone = 0;
								rows[i].od2thirtyone = .5;
								rows[i].ed1select = 1;
								rows[i].ed2select = 1;
							}
							var obj = new clientModel.members(rows[i].attendanceid, rows[i].memberid, rows[i].firstname, rows[i].texcono, rows[i].serviceno, rows[i].jobpostingdetailid, rows[i].one, rows[i].two, rows[i].three, rows[i].four, rows[i].five, rows[i].six, rows[i].seven, rows[i].eight, rows[i].nine, rows[i].ten, rows[i].eleven, rows[i].twelve, rows[i].thirteen, rows[i].fourteen, rows[i].fifteen, rows[i].sixteen, rows[i].seventeen, rows[i].eighteen, rows[i].nineteen, rows[i].twenty, rows[i].twentyone, rows[i].twentytwo, rows[i].twentythree, rows[i].twentyfour, rows[i].twentyfive, rows[i].twentysix, rows[i].twentyseven, rows[i].twentyeight, rows[i].twentynine, rows[i].thirty, rows[i].thirtyone, rows[i].od1one, rows[i].od1two, rows[i].od1three, rows[i].od1four, rows[i].od1five, rows[i].od1six, rows[i].od1seven, rows[i].od1eight, rows[i].od1nine, rows[i].od1ten, rows[i].od1eleven, rows[i].od1twelve, rows[i].od1thirteen, rows[i].od1fourteen, rows[i].od1fifteen, rows[i].od1sixteen, rows[i].od1seventeen, rows[i].od1eighteen, rows[i].od1nineteen, rows[i].od1twenty, rows[i].od1twentyone, rows[i].od1twentytwo, rows[i].od1twentythree, rows[i].od1twentyfour, rows[i].od1twentyfive, rows[i].od1twentysix, rows[i].od1twentyseven, rows[i].od1twentyeight, rows[i].od1twentynine, rows[i].od1thirty, rows[i].od1thirtyone, rows[i].od2one, rows[i].od2two, rows[i].od2three, rows[i].od2four, rows[i].od2five, rows[i].od2six, rows[i].od2seven, rows[i].od2eight, rows[i].od2nine, rows[i].od2ten, rows[i].od2eleven, rows[i].od2twelve, rows[i].od2thirteen, rows[i].od2fourteen, rows[i].od2fifteen, rows[i].od2sixteen, rows[i].od2seventeen, rows[i].od2eighteen, rows[i].od2nineteen, rows[i].od2twenty, rows[i].od2twentyone, rows[i].od2twentytwo, rows[i].od2twentythree, rows[i].od2twentyfour, rows[i].od2twentyfive, rows[i].od2twentysix, rows[i].od2twentyseven, rows[i].od2twentyeight, rows[i].od2twentynine, rows[i].od2thirty, rows[i].od2thirtyone, (rows[i].presentdays != undefined ? rows[i].presentdays : 0), (rows[i].othours != undefined ? rows[i].othours : 0), rows[i].status, rows[i].jobcode, rows[i].eddays, rows[i].selectattendance, rows[i].adselect, rows[i].ed1select, rows[i].ed2select,rows[i].reason);
						} else {
							if (rows[i].one > 1) {
								rows[i].od1one =  Math.round((Number(rows[i].one) - 1) * 8);
								rows[i].one = 1; 
								rows[i].od2one = 0;
							}
							if (rows[i].two > 1) {
								rows[i].od1two =  Math.round((Number(rows[i].two) - 1) * 8);
								rows[i].two = 1;
								rows[i].od2two = 0;
							}
							if (rows[i].three > 1) {
								rows[i].od1three = Math.round((Number(rows[i].three) - 1) * 8);
								rows[i].three = 1;
								rows[i].od2three = 0;
							}
							if (rows[i].four > 1) {
								rows[i].od1four =  Math.round((Number(rows[i].four) - 1) * 8);
								rows[i].four = 1;
								rows[i].od2four = 0;
							}
							if (rows[i].five > 1) {
								rows[i].od1five =  Math.round((Number(rows[i].five) - 1) * 8);
								rows[i].five = 1;
								rows[i].od2five = 0;
							}
							if (rows[i].six > 1) {
								rows[i].od1six =  Math.round((Number(rows[i].six) - 1) * 8);
								rows[i].six = 1;
								rows[i].od2six = 0;
							}
							if (rows[i].seven > 1) {
								rows[i].od1seven =  Math.round((Number(rows[i].seven) - 1) * 8);
								rows[i].seven = 1;
								rows[i].od2seven = 0;
							}
							if (rows[i].eight > 1) {
								rows[i].od1eight =  Math.round((Number(rows[i].eight) - 1) * 8);
								rows[i].eight = 1;
								rows[i].od2eight = 0;
							}
							if (rows[i].nine > 1) {
								rows[i].od1nine =  Math.round((Number(rows[i].nine) - 1) * 8);
								rows[i].nine = 1;
								rows[i].od2nine = 0;
							}
							if (rows[i].ten > 1) {
								rows[i].od1ten =  Math.round((Number(rows[i].ten) - 1) * 8);
								rows[i].ten = 1;
								rows[i].od2ten = 0;
							}
							if (rows[i].eleven > 1) {
								rows[i].od1eleven =  Math.round((Number(rows[i].eleven) - 1) * 8);
								rows[i].eleven = 1;
								rows[i].od2eleven = 0;
							}
							if (rows[i].twelve > 1) {
								rows[i].od1twelve =  Math.round((Number(rows[i].twelve) - 1) * 8);
								rows[i].twelve = 1;
								rows[i].od2twelve = 0;
							}
							if (rows[i].thirteen > 1) {
								rows[i].od1thirteen =  Math.round((Number(rows[i].thirteen) - 1) * 8);
								rows[i].thirteen = 1;
								rows[i].od2thirteen = 0;
							}
							if (rows[i].fourteen > 1) {
								rows[i].od1fourteen =  Math.round((Number(rows[i].fourteen) - 1) * 8);
								rows[i].fourteen = 1;
								rows[i].od2fourteen = 0;
							}
							if (rows[i].fifteen > 1) {
								rows[i].od1fifteen =  Math.round((Number(rows[i].fifteen) - 1) * 8);
								rows[i].fifteen = 1;
								rows[i].od2fifteen = 0;
							}
							if (rows[i].sixteen > 1) {
								rows[i].od1sixteen =  Math.round((Number(rows[i].sixteen) - 1) * 8);
								rows[i].sixteen = 1;
								rows[i].od2sixteen = 0;
							}
							if (rows[i].seventeen > 1) {
								rows[i].od1seventeen =  Math.round((Number(rows[i].seventeen) - 1) * 8);
								rows[i].seventeen = 1;
								rows[i].od2seventeen = 0;
							}
							if (rows[i].eighteen > 1) {
								rows[i].od1eighteen =  Math.round((Number(rows[i].eighteen) - 1) * 8);
								rows[i].eighteen = 1;
								rows[i].od2eighteen = 0;
							}
							if (rows[i].nineteen > 1) {
								rows[i].od1nineteen =  Math.round((Number(rows[i].nineteen) - 1) * 8);
								rows[i].nineteen = 1;
								rows[i].od2nineteen = 0;
							}
							if (rows[i].twenty > 1) {
								rows[i].od1twenty =  Math.round((Number(rows[i].twenty) - 1) * 8);
								rows[i].twenty = 1;
								rows[i].od2twenty = 0;
							}
							if (rows[i].twentyone > 1) {
								rows[i].od1twentyone =  Math.round((Number(rows[i].twentyone) - 1) * 8);
								rows[i].twentyone = 1;
								rows[i].od2twentyone = 0;
							}
							if (rows[i].twentythree > 1) {
								rows[i].od1twentythree =  Math.round((Number(rows[i].twentythree) - 1) * 8);
								rows[i].twentythree = 1;
								rows[i].od2twentythree = 0;
							}
							if (rows[i].twentyfour > 1) {
								rows[i].od1twentyfour =  Math.round((Number(rows[i].twentyfour) - 1) * 8);
								rows[i].twentyfour = 1;
								rows[i].od2twentyfour = 0;
							}
							if (rows[i].twentyfive > 1) {
								rows[i].od1twentyfive =  Math.round((Number(rows[i].twentyfive) - 1) * 8);
								rows[i].twentyfive = 1;
								rows[i].od2twentyfive = 0;
							}
							if (rows[i].twentysix > 1) {
								rows[i].od1twentysix =  Math.round((Number(rows[i].twentysix) - 1) * 8);
								rows[i].twentysix = 1;
								rows[i].od2twentysix = 0;
							}
							if (rows[i].twentyseven > 1) {
								rows[i].od1twentyseven =  Math.round((Number(rows[i].twentyseven) - 1) * 8);
								rows[i].twentyseven = 1;
								rows[i].od2twentyseven = 0;
							}
							if (rows[i].twentyeight > 1) {
								rows[i].od1twentyeight =  Math.round((Number(rows[i].twentyeight) - 1) * 8);
								rows[i].twentyeight = 1;
								rows[i].od2twentyeight = 0;
							}
							if (rows[i].twentynine > 1) {
								rows[i].od1twentynine =  Math.round((Number(rows[i].twentynine) - 1) * 8);
								rows[i].twentynine = 1;
								rows[i].od2twentynine = 0;
							}
							if (rows[i].thirty > 1) {
								rows[i].od1thirty =  Math.round((Number(rows[i].thirty) - 1) * 8);
								rows[i].thirty = 1;
								rows[i].od2thirty = 0;
							}
							if (rows[i].thirtyone > 1) {
								rows[i].od1thirtyone =  Math.round((Number(rows[i].thirtyone) - 1) * 8);
								rows[i].thirtyone = 1;
								rows[i].od2thirtyone = 0;
							}
							var obj = new clientModel.members(rows[i].attendanceid, rows[i].memberid, rows[i].firstname, rows[i].texcono, rows[i].serviceno, rows[i].jobpostingdetailid, rows[i].one, rows[i].two, rows[i].three, rows[i].four, rows[i].five, rows[i].six, rows[i].seven, rows[i].eight, rows[i].nine, rows[i].ten, rows[i].eleven, rows[i].twelve, rows[i].thirteen, rows[i].fourteen, rows[i].fifteen, rows[i].sixteen, rows[i].seventeen, rows[i].eighteen, rows[i].nineteen, rows[i].twenty, rows[i].twentyone, rows[i].twentytwo, rows[i].twentythree, rows[i].twentyfour, rows[i].twentyfive, rows[i].twentysix, rows[i].twentyseven, rows[i].twentyeight, rows[i].twentynine, rows[i].thirty, rows[i].thirtyone, rows[i].od1one, rows[i].od1two, rows[i].od1three, rows[i].od1four, rows[i].od1five, rows[i].od1six, rows[i].od1seven, rows[i].od1eight, rows[i].od1nine, rows[i].od1ten, rows[i].od1eleven, rows[i].od1twelve, rows[i].od1thirteen, rows[i].od1fourteen, rows[i].od1fifteen, rows[i].od1sixteen, rows[i].od1seventeen, rows[i].od1eighteen, rows[i].od1nineteen, rows[i].od1twenty, rows[i].od1twentyone, rows[i].od1twentytwo, rows[i].od1twentythree, rows[i].od1twentyfour, rows[i].od1twentyfive, rows[i].od1twentysix, rows[i].od1twentyseven, rows[i].od1twentyeight, rows[i].od1twentynine, rows[i].od1thirty, rows[i].od1thirtyone, rows[i].od2one, rows[i].od2two, rows[i].od2three, rows[i].od2four, rows[i].od2five, rows[i].od2six, rows[i].od2seven, rows[i].od2eight, rows[i].od2nine, rows[i].od2ten, rows[i].od2eleven, rows[i].od2twelve, rows[i].od2thirteen, rows[i].od2fourteen, rows[i].od2fifteen, rows[i].od2sixteen, rows[i].od2seventeen, rows[i].od2eighteen, rows[i].od2nineteen, rows[i].od2twenty, rows[i].od2twentyone, rows[i].od2twentytwo, rows[i].od2twentythree, rows[i].od2twentyfour, rows[i].od2twentyfive, rows[i].od2twentysix, rows[i].od2twentyseven, rows[i].od2twentyeight, rows[i].od2twentynine, rows[i].od2thirty, rows[i].od2thirtyone, (rows[i].presentdays != undefined ? rows[i].presentdays : 0), (rows[i].othours != undefined ? rows[i].othours : 0), rows[i].status, rows[i].jobcode, 0,0,0,0,rows[i].eddays,rows[i].reason);
						}
						members.push(obj);

						if ((i + 1 == rowsReturned) || (rows[i].projectid != rows[i + 1].projectid) || (rows[i].monthandyear != rows[i + 1].monthandyear)) {
							var attendance = new clientModel.attendance(rows[i].clientid, rows[i].projectid, rows[i].monthandyear, rows[i].changedby, members);
							result.push(attendance)

							members = [];
						}
					}
				}
				resolve(result);
			}).catch(function (err) {
				errorDAL.errorlog('Error',"clientDAL::getattendanceedit",err.stack,JSON.stringify(projectid, monthandyear, edittype),"getattendanceedit");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::getattendanceedit",err.stack,JSON.stringify(projectid, monthandyear, edittype),"getattendanceedit");
			reject(err);
		});
	});
}

// module.exports.geteditattendancedetails = function (projectid, monthandyear, clientid) {
// 	//console.log('projectid',projectid);
// 	//console.log('monthandyear',monthandyear);
// 	return new app.promise(function (resolve, reject) {
// 		mySqlConnection.connection().then(function (con) {
// 			var query = multiline.stripIndent(function () {
// 				/*
// 					SELECT
// 						at.attendanceid,
// 						at.clientid,
// 						at.projectid,
// 						at.memberid,
// 						at.monthandyear,
// 						at.one,
// 						at.two,
// 						at.three,
// 						at.four,
// 						at.five,
// 						at.six,
// 						at.seven,
// 						at.eight,
// 						at.nine,
// 						at.ten,
// 						at.eleven,
// 						at.twelve,
// 						at.thirteen,
// 						at.fourteen,
// 						at.fifteen,
// 						at.sixteen,
// 						at.seventeen,
// 						at.eighteen,
// 						at.nineteen,
// 						at.twenty,
// 						at.twentyone,
// 						at.twentytwo,
// 						at.twentythree,
// 						at.twentyfour,
// 						at.twentyfive,
// 						at.twentysix,
// 						at.twentyseven,
// 						at.twentyeight,
// 						at.twentynine,
// 						at.thirty,
// 						at.thirtyone,
// 						at.one AS valone,
// 						at.two  AS valtwo,
// 						at.three  AS valthree,
// 						at.four  AS valfour,
// 						at.five  AS valfive,
// 						at.six  AS valsix,
// 						at.seven  AS valseven,
// 						at.eight  AS valeight,
// 						at.nine  AS valnine,
// 						at.ten  AS valten,
// 						at.eleven  AS valeleven,
// 						at.twelve  AS valtwelve,
// 						at.thirteen  AS valthirteen,
// 						at.fourteen  AS valfourteen,
// 						at.fifteen  AS valfifteen,
// 						at.sixteen  AS valsixteen,
// 						at.seventeen  AS valseventeen,
// 						at.eighteen  AS valeighteen,
// 						at.nineteen  AS valnineteen,
// 						at.twenty  AS valtwenty,
// 						at.twentyone  AS valtwentyone,
// 						at.twentytwo  AS valtwentytwo,
// 						at.twentythree  AS valtwentythree,
// 						at.twentyfour  AS valtwentyfour,
// 						at.twentyfive  AS valtwentyfive,
// 						at.twentysix  AS valtwentysix,
// 						at.twentyseven  AS valtwentyseven,
// 						at.twentyeight  AS valtwentyeight,
// 						at.twentynine  AS valtwentynine,
// 						at.thirty  AS valthirty,
// 						at.thirtyone  AS valthirtyone,
// 						'0'  AS selectattendance,
// 						'0'  AS adselect,
// 						'0'  AS ed1select,
// 						'0'  AS ed2select,
// 						'0'  AS SelectItems,
// 						at.presentdays,
// 						at.othours,
// 						at.status,
// 						m.firstname,
// 						m.lastname,
// 						m.texcono,
// 						m.serviceno,
// 						pr.name AS projectname,
// 						pr.projectno,
// 						cl.organization,
// 						jm.code AS jobcode,
// 						jm.name AS jobname
						
// 						FROM attendance at
// 						INNER JOIN client cl ON
// 							cl.clientid = at.clientid
// 						AND cl.active =1
// 						INNER JOIN project pr ON
// 							pr.projectid = at.projectid
// 							AND pr.active =1
// 						INNER JOIN member m ON
// 							m.memberid = at.memberid
// 							AND m.active =1
// 						INNER JOIN jobmaster jm ON
// 							jm.jobmasterid = at.jobmasterid 
// 							AND jm.active =1	
// 					WHERE at.active = 1 AND (at.status = 0 || at.status = 7) AND at.projectid = ? AND at.monthandyear = ? AND at.attendancesaved = 1 AND at.cashier_rejected = 0 AND at.cao_rejected = 0;
//             	*/
// 			});
// 			con.query(query, [projectid, monthandyear]).then(function (rows, fields) {
// 				console.log('rows',rows);
// 				var rowsReturned = rows.length;
// 				var result = [];
// 				var members = [];
// 				var attendance = {};
// 				if (rowsReturned > 0) {
// 					a = {};
// 					b = {};
// 					c = {};
// 					for (var i = 0; i < rowsReturned; i++) {
// 						if (rows[i].jobcode == 'DVR') {
// 							if (rows[i].one == 1) {
// 								rows[i].one = 1;
// 								rows[i].od1one = 0;
// 								rows[i].od2one = 0;
// 							}
// 							if (rows[i].two == 1) {
// 								rows[i].two = 1;
// 								rows[i].od1two = 0;
// 								rows[i].od2two = 0;
// 							}
// 							if (rows[i].three == 1) {
// 								rows[i].three = 1;
// 								rows[i].od1three = 0;
// 								rows[i].od2three = 0;
// 							}
// 							if (rows[i].four == 1) {
// 								rows[i].four = 1;
// 								rows[i].od1four = 0;
// 								rows[i].od2four = 0;
// 							}
// 							if (rows[i].five == 1) {
// 								rows[i].five = 1;
// 								rows[i].od1five = 0;
// 								rows[i].od2five = 0;
// 							}
// 							if (rows[i].six == 1) {
// 								rows[i].six = 1;
// 								rows[i].od1six = 0;
// 								rows[i].od2six = 0;
// 							}
// 							if (rows[i].seven == 1) {
// 								rows[i].seven = 1;
// 								rows[i].od1seven = 0;
// 								rows[i].od2seven = 0;
// 							}
// 							if (rows[i].eight == 1) {
// 								rows[i].eight = 1;
// 								rows[i].od1eight = 0;
// 								rows[i].od2eight = 0;
// 							}
// 							if (rows[i].nine == 1) {
// 								rows[i].nine = 1;
// 								rows[i].od1nine = 0;
// 								rows[i].od2nine = 0;
// 							}
// 							if (rows[i].ten == 1) {
// 								rows[i].ten = 1;
// 								rows[i].od1ten = 0;
// 								rows[i].od2ten = 0;
// 							}
// 							if (rows[i].eleven == 1) {
// 								rows[i].eleven = 1;
// 								rows[i].od1eleven = 0;
// 								rows[i].od2eleven = 0;
// 							}
// 							if (rows[i].twelve == 1) {
// 								rows[i].twelve = 1;
// 								rows[i].od1twelve = 0;
// 								rows[i].od2twelve = 0;
// 							}
// 							if (rows[i].thirteen == 1) {
// 								rows[i].thirteen = 1;
// 								rows[i].od1thirteen = 0;
// 								rows[i].od2thirteen = 0;
// 							}
// 							if (rows[i].fourteen == 1) {
// 								rows[i].fourteen = 1;
// 								rows[i].od1fourteen = 0;
// 								rows[i].od2fourteen = 0;
// 							}
// 							if (rows[i].fifteen == 1) {
// 								rows[i].fifteen = 1;
// 								rows[i].od1fifteen = 0;
// 								rows[i].od2fifteen = 0;
// 							}
// 							if (rows[i].sixteen == 1) {
// 								rows[i].sixteen = 1;
// 								rows[i].od1sixteen = 0;
// 								rows[i].od2sixteen = 0;
// 							}
// 							if (rows[i].seventeen == 1) {
// 								rows[i].seventeen = 1;
// 								rows[i].od1seventeen = 0;
// 								rows[i].od2seventeen = 0;
// 							}
// 							if (rows[i].eighteen == 1) {
// 								rows[i].eighteen = 1;
// 								rows[i].od1eighteen = 0;
// 								rows[i].od2eighteen = 0;
// 							}
// 							if (rows[i].nineteen == 1) {
// 								rows[i].nineteen = 1;
// 								rows[i].od1nineteen = 0;
// 								rows[i].od2nineteen = 0;
// 							}
// 							if (rows[i].twenty == 1) {
// 								rows[i].twenty = 1;
// 								rows[i].od1twenty = 0;
// 								rows[i].od2twenty = 0;
// 							}
// 							if (rows[i].twentyone == 1) {
// 								rows[i].twentyone = 1;
// 								rows[i].od1twentyone = 0;
// 								rows[i].od2twentyone = 0;
// 							}
// 							if (rows[i].twentytwo == 1) {
// 								rows[i].twentytwo = 1;
// 								rows[i].od1twentytwo = 0;
// 								rows[i].od2twentytwo = 0;
// 							}
// 							if (rows[i].twentythree == 1) {
// 								rows[i].twentythree = 1;
// 								rows[i].od1twentythree = 0;
// 								rows[i].od2twentythree = 0;
// 							}
// 							if (rows[i].twentyfour == 1) {
// 								rows[i].twentyfour = 1;
// 								rows[i].od1twentyfour = 0;
// 								rows[i].od2twentyfour = 0;
// 							}
// 							if (rows[i].twentyfive == 1) {
// 								rows[i].twentyfive = 1;
// 								rows[i].od1twentyfive = 0;
// 								rows[i].od2twentyfive = 0;
// 							}
// 							if (rows[i].twentysix == 1) {
// 								rows[i].twentysix = 1;
// 								rows[i].od1twentysix = 0;
// 								rows[i].od2twentysix = 0;
// 							}
// 							if (rows[i].twentyseven == 1) {
// 								rows[i].twentyseven = 1;
// 								rows[i].od1twentyseven = 0;
// 								rows[i].od2twentyseven = 0;
// 							}
// 							if (rows[i].twentyeight == 1) {
// 								rows[i].twentyeight = 1;
// 								rows[i].od1twentyeight = 0;
// 								rows[i].od2twentyeight = 0;
// 							}
// 							if (rows[i].twentynine == 1) {
// 								rows[i].twentynine = 1;
// 								rows[i].od1twentynine = 0;
// 								rows[i].od2twentynine = 0;
// 							}
// 							if (rows[i].thirty == 1) {
// 								rows[i].thirty = 1;
// 								rows[i].od1thirty = 0;
// 								rows[i].od2thirty = 0;
// 							}
// 							if (rows[i].thirtyone == 1) {
// 								rows[i].thirtyone = 1;
// 								rows[i].od1thirtyone = 0;
// 								rows[i].od2thirtyone = 0;
// 							}


// 							if (rows[i].one == 2) {
// 								rows[i].one = 1;
// 								rows[i].od1one = 1;
// 								rows[i].od2one = 0;
// 							}
// 							if (rows[i].two == 2) {
// 								rows[i].two = 1;
// 								rows[i].od1two = 1;
// 								rows[i].od2two = 0;
// 							}
// 							if (rows[i].three == 2) {
// 								rows[i].three = 1;
// 								rows[i].od1three = 1;
// 								rows[i].od2three = 0;
// 								rows[i].od2three = 0;
// 							}
// 							if (rows[i].four == 2) {
// 								rows[i].four = 1;
// 								rows[i].od1four = 1;
// 								rows[i].od2four = 0;
// 							}
// 							if (rows[i].five == 2) {
// 								rows[i].five = 1;
// 								rows[i].od1five = 1;
// 								rows[i].od2five = 0;
// 							}
// 							if (rows[i].six == 2) {
// 								rows[i].six = 1;
// 								rows[i].od1six = 1;
// 								rows[i].od2six = 0;
// 							}
// 							if (rows[i].seven == 2) {
// 								rows[i].seven = 1;
// 								rows[i].od1seven = 1;
// 								rows[i].od2seven = 0;
// 							}
// 							if (rows[i].eight == 2) {
// 								rows[i].eight = 1;
// 								rows[i].od1eight = 1;
// 								rows[i].od2eight = 0;
// 							}
// 							if (rows[i].nine == 2) {
// 								rows[i].nine = 1;
// 								rows[i].od1nine = 1;
// 								rows[i].od2nine = 0;
// 							}
// 							if (rows[i].ten == 2) {
// 								rows[i].ten = 1;
// 								rows[i].od1ten = 1;
// 								rows[i].od2ten = 0;
// 							}
// 							if (rows[i].eleven == 2) {
// 								rows[i].eleven = 1;
// 								rows[i].od1eleven = 1;
// 								rows[i].od2eleven = 0;
// 							}
// 							if (rows[i].twelve == 2) {
// 								rows[i].twelve = 1;
// 								rows[i].od1twelve = 1;
// 								rows[i].od2twelve = 0;
// 							}
// 							if (rows[i].thirteen == 2) {
// 								rows[i].thirteen = 1;
// 								rows[i].od1thirteen = 1;
// 								rows[i].od2thirteen = 0;
// 							}
// 							if (rows[i].fourteen == 2) {
// 								rows[i].fourteen = 1;
// 								rows[i].od1fourteen = 1;
// 								rows[i].od2fourteen = 0;
// 							}
// 							if (rows[i].fifteen == 2) {
// 								rows[i].fifteen = 1;
// 								rows[i].od1fifteen = 1;
// 								rows[i].od2fifteen = 0;
// 							}
// 							if (rows[i].sixteen == 2) {
// 								rows[i].sixteen = 1;
// 								rows[i].od1sixteen = 1;
// 								rows[i].od2sixteen = 0;
// 							}
// 							if (rows[i].seventeen == 2) {
// 								rows[i].seventeen = 1;
// 								rows[i].od1seventeen = 1;
// 								rows[i].od2seventeen = 0;
// 							}
// 							if (rows[i].eighteen == 2) {
// 								rows[i].eighteen = 1;
// 								rows[i].od1eighteen = 1;
// 								rows[i].od2eighteen = 0;
// 							}
// 							if (rows[i].nineteen == 2) {
// 								rows[i].nineteen = 1;
// 								rows[i].od1nineteen = 1;
// 								rows[i].od2nineteen = 0;
// 							}
// 							if (rows[i].twenty == 2) {
// 								rows[i].twenty = 1;
// 								rows[i].od1twenty = 1;
// 								rows[i].od2twenty = 0;
// 							}
// 							if (rows[i].twentyone == 2) {
// 								rows[i].twentyone = 1;
// 								rows[i].od1twentyone = 1;
// 								rows[i].od2twentyone = 0;
// 							}
// 							if (rows[i].twentytwo == 2) {
// 								rows[i].twentytwo = 1;
// 								rows[i].od1twentytwo = 1;
// 								rows[i].od2twentytwo = 0;
// 							}
// 							if (rows[i].twentythree == 2) {
// 								rows[i].twentythree = 1;
// 								rows[i].od1twentythree = 1;
// 								rows[i].od2twentythree = 0;
// 							}
// 							if (rows[i].twentyfour == 2) {
// 								rows[i].twentyfour = 1;
// 								rows[i].od1twentyfour = 1;
// 								rows[i].od2twentyfour = 0;
// 							}
// 							if (rows[i].twentyfive == 2) {
// 								rows[i].twentyfive = 1;
// 								rows[i].od1twentyfive = 1;
// 								rows[i].od2twentyfive = 0;
// 							}
// 							if (rows[i].twentysix == 2) {
// 								rows[i].twentysix = 1;
// 								rows[i].od1twentysix = 1;
// 								rows[i].od2twentysix = 0;
// 							}
// 							if (rows[i].twentyseven == 2) {
// 								rows[i].twentyseven = 1;
// 								rows[i].od1twentyseven = 1;
// 								rows[i].od2twentyseven = 0;
// 							}
// 							if (rows[i].twentyeight == 2) {
// 								rows[i].twentyeight = 1;
// 								rows[i].od1twentyeight = 1;
// 								rows[i].od2twentyeight = 0;
// 							}
// 							if (rows[i].twentynine == 2) {
// 								rows[i].twentynine = 1;
// 								rows[i].od1twentynine = 1;
// 								rows[i].od2twentynine = 0;
// 							}
// 							if (rows[i].thirty == 2) {
// 								rows[i].thirty = 1;
// 								rows[i].od1thirty = 1;
// 								rows[i].od2thirty = 0;
// 							}
// 							if (rows[i].thirtyone == 2) {
// 								rows[i].thirtyone = 1;
// 								rows[i].od1thirtyone = 1;
// 								rows[i].od2thirtyone = 0;
// 							}


// 							if (rows[i].one == 3) {
// 								rows[i].one = 1;
// 								rows[i].od1one = 1;
// 								rows[i].od2one = 1;
// 							}
// 							if (rows[i].two == 3) {
// 								rows[i].two = 1;
// 								rows[i].od1two = 1;
// 								rows[i].od2two = 1;
// 							}
// 							if (rows[i].three == 3) {
// 								rows[i].three = 1;
// 								rows[i].od1three = 1;
// 								rows[i].od2three = 1;
// 							}
// 							if (rows[i].four == 3) {
// 								rows[i].four = 1;
// 								rows[i].od1four = 1;
// 								rows[i].od2four = 1;
// 							}
// 							if (rows[i].five == 3) {
// 								rows[i].five = 1;
// 								rows[i].od1five = 1;
// 								rows[i].od2five = 1;
// 							}
// 							if (rows[i].six == 3) {
// 								rows[i].six = 1;
// 								rows[i].od1six = 1;
// 								rows[i].od2six = 1;
// 							}
// 							if (rows[i].seven == 3) {
// 								rows[i].seven = 1;
// 								rows[i].od1seven = 1;
// 								rows[i].od2seven = 1;
// 							}
// 							if (rows[i].eight == 3) {
// 								rows[i].eight = 1;
// 								rows[i].od1eight = 1;
// 								rows[i].od2eight = 1;
// 							}
// 							if (rows[i].nine == 3) {
// 								rows[i].nine = 1;
// 								rows[i].od1nine = 1;
// 								rows[i].od2nine = 1;
// 							}
// 							if (rows[i].ten == 3) {
// 								rows[i].ten = 1;
// 								rows[i].od1ten = 1;
// 								rows[i].od2ten = 1;
// 							}
// 							if (rows[i].eleven == 3) {
// 								rows[i].eleven = 1;
// 								rows[i].od1eleven = 1;
// 								rows[i].od2eleven = 1;
// 							}
// 							if (rows[i].twelve == 3) {
// 								rows[i].twelve = 1;
// 								rows[i].od1twelve = 1;
// 								rows[i].od2twelve = 1;
// 							}
// 							if (rows[i].thirteen == 3) {
// 								rows[i].thirteen = 1;
// 								rows[i].od1thirteen = 1;
// 								rows[i].od2thirteen = 1;
// 							}
// 							if (rows[i].fourteen == 3) {
// 								rows[i].fourteen = 1;
// 								rows[i].od1fourteen = 1;
// 								rows[i].od2fourteen = 1;
// 							}
// 							if (rows[i].fifteen == 3) {
// 								rows[i].fifteen = 1;
// 								rows[i].od1fifteen = 1;
// 								rows[i].od2fifteen = 1;
// 							}
// 							if (rows[i].sixteen == 3) {
// 								rows[i].sixteen = 1;
// 								rows[i].od1sixteen = 1;
// 								rows[i].od2sixteen = 1;
// 							}
// 							if (rows[i].seventeen == 3) {
// 								rows[i].seventeen = 1;
// 								rows[i].od1seventeen = 1;
// 								rows[i].od2seventeen = 1;
// 							}
// 							if (rows[i].eighteen == 3) {
// 								rows[i].eighteen = 1;
// 								rows[i].od1eighteen = 1;
// 								rows[i].od2eighteen = 1;
// 							}
// 							if (rows[i].nineteen == 3) {
// 								rows[i].nineteen = 1;
// 								rows[i].od1nineteen = 1;
// 								rows[i].od2nineteen = 1;
// 							}
// 							if (rows[i].twenty == 3) {
// 								rows[i].twenty = 1;
// 								rows[i].od1twenty = 1;
// 								rows[i].od2twenty = 1;
// 							}
// 							if (rows[i].twentyone == 3) {
// 								rows[i].twentyone = 1;
// 								rows[i].od1twentyone = 1;
// 								rows[i].od2twentyone = 1;
// 							}
// 							if (rows[i].twentytwo == 3) {
// 								rows[i].twentytwo = 1;
// 								rows[i].od1twentytwo = 1;
// 								rows[i].od2twentytwo = 1;
// 							}
// 							if (rows[i].twentythree == 3) {
// 								rows[i].twentythree = 1;
// 								rows[i].od1twentythree = 1;
// 								rows[i].od2twentythree = 1;
// 							}
// 							if (rows[i].twentyfour == 3) {
// 								rows[i].twentyfour = 1;
// 								rows[i].od1twentyfour = 1;
// 								rows[i].od2twentyfour = 1;
// 							}
// 							if (rows[i].twentyfive == 3) {
// 								rows[i].twentyfive = 1;
// 								rows[i].od1twentyfive = 1;
// 								rows[i].od2twentyfive = 1;
// 							}
// 							if (rows[i].twentysix == 3) {
// 								rows[i].twentysix = 1;
// 								rows[i].od1twentysix = 1;
// 								rows[i].od2twentysix = 1;
// 							}
// 							if (rows[i].twentyseven == 3) {
// 								rows[i].twentyseven = 1;
// 								rows[i].od1twentyseven = 1;
// 								rows[i].od2twentyseven = 1;
// 							}
// 							if (rows[i].twentyeight == 3) {
// 								rows[i].twentyeight = 1;
// 								rows[i].od1twentyeight = 1;
// 								rows[i].od2twentyeight = 1;
// 							}
// 							if (rows[i].twentynine == 3) {
// 								rows[i].twentynine = 1;
// 								rows[i].od1twentynine = 1;
// 								rows[i].od2twentynine = 1;
// 							}
// 							if (rows[i].thirty == 3) {
// 								rows[i].thirty = 1;
// 								rows[i].od1thirty = 1;
// 								rows[i].od2thirty = 1;
// 							}
// 							if (rows[i].thirtyone == 3) {
// 								rows[i].thirtyone = 1;
// 								rows[i].od1thirtyone = 1;
// 								rows[i].od2thirtyone = 1;
// 							}
// 							rows[i].selectattendance = 1;
// 							rows[i].adselect = 1;
// 							rows[i].ed1select = 0;
// 							rows[i].ed2select = 0;

// 							var obj = new clientModel.members(rows[i].attendanceid, rows[i].memberid, rows[i].firstname, rows[i].texcono, rows[i].serviceno, rows[i].jobpostingdetailid, rows[i].one, rows[i].two, rows[i].three, rows[i].four, rows[i].five, rows[i].six, rows[i].seven, rows[i].eight, rows[i].nine, rows[i].ten, rows[i].eleven, rows[i].twelve, rows[i].thirteen, rows[i].fourteen, rows[i].fifteen, rows[i].sixteen, rows[i].seventeen, rows[i].eighteen, rows[i].nineteen, rows[i].twenty, rows[i].twentyone, rows[i].twentytwo, rows[i].twentythree, rows[i].twentyfour, rows[i].twentyfive, rows[i].twentysix, rows[i].twentyseven, rows[i].twentyeight, rows[i].twentynine, rows[i].thirty, rows[i].thirtyone, rows[i].od1one, rows[i].od1two, rows[i].od1three, rows[i].od1four, rows[i].od1five, rows[i].od1six, rows[i].od1seven, rows[i].od1eight, rows[i].od1nine, rows[i].od1ten, rows[i].od1eleven, rows[i].od1twelve, rows[i].od1thirteen, rows[i].od1fourteen, rows[i].od1fifteen, rows[i].od1sixteen, rows[i].od1seventeen, rows[i].od1eighteen, rows[i].od1nineteen, rows[i].od1twenty, rows[i].od1twentyone, rows[i].od1twentytwo, rows[i].od1twentythree, rows[i].od1twentyfour, rows[i].od1twentyfive, rows[i].od1twentysix, rows[i].od1twentyseven, rows[i].od1twentyeight, rows[i].od1twentynine, rows[i].od1thirty, rows[i].od1thirtyone, rows[i].od2one, rows[i].od2two, rows[i].od2three, rows[i].od2four, rows[i].od2five, rows[i].od2six, rows[i].od2seven, rows[i].od2eight, rows[i].od2nine, rows[i].od2ten, rows[i].od2eleven, rows[i].od2twelve, rows[i].od2thirteen, rows[i].od2fourteen, rows[i].od2fifteen, rows[i].od2sixteen, rows[i].od2seventeen, rows[i].od2eighteen, rows[i].od2nineteen, rows[i].od2twenty, rows[i].od2twentyone, rows[i].od2twentytwo, rows[i].od2twentythree, rows[i].od2twentyfour, rows[i].od2twentyfive, rows[i].od2twentysix, rows[i].od2twentyseven, rows[i].od2twentyeight, rows[i].od2twentynine, rows[i].od2thirty, rows[i].od2thirtyone, (rows[i].presentdays != undefined ? rows[i].presentdays : 0), (rows[i].othours != undefined ? rows[i].othours : 0), rows[i].status, rows[i].jobcode, rows[i].eddays, rows[i].selectattendance, rows[i].adselect, rows[i].ed1select, rows[i].ed2select, rows[i].SelectItems);
// 						} else {
// 							// if(rows[i].one == 1) {
// 							// 	a[1] = 1;
// 							// 	b[1] = 0;
// 							// 	c[1] = 0;
// 							// } else if (rows[i].one == 2) {
// 							// 	a[1] = 1;
// 							// 	b[1] = 1;
// 							// 	c[1] = 0;
// 							// 	rows[i].one = 1;
// 							// } else if (rows[i].one == 3) {
// 							// 	a[1] = 1;
// 							// 	b[1] = 1;
// 							// 	c[1] = 1;
// 							// 	rows[i].one = 1;
// 							// }						
// 							// rows[i].adval[rows[i].texcono] = a;
// 							// rows[i].ed1val[rows[i].texcono] = b;
// 							// rows[i].ed2val[rows[i].texcono] = c;
// 							// if (rows[i].two > 1) {
// 							// 	rows[i].od1two = Number(rows[i].two) - 1;
// 							// 	rows[i].od1two = rows[i].od1two * 8;
// 							// 	rows[i].two = 1;
// 							// 	rows[i].od2two = 0;
// 							// }
// 							// if (rows[i].three > 1) {
// 							// 	rows[i].od1three = Number(rows[i].three) - 1;
// 							// 	rows[i].od1three = rows[i].od1three * 8;
// 							// 	rows[i].three = 1;
// 							// 	rows[i].od2three = 0;
// 							// }
// 							// if (rows[i].four > 1) {
// 							// 	rows[i].od1four = Number(rows[i].four) - 1;
// 							// 	rows[i].four = 1;
// 							// 	rows[i].od2four = 0;
// 							// }
// 							// if (rows[i].five > 1) {
// 							// 	rows[i].od1five = Number(rows[i].five) - 1;
// 							// 	rows[i].five = 1;
// 							// 	rows[i].od2five = 0;
// 							// }
// 							// if (rows[i].six > 1) {
// 							// 	rows[i].od1six = Number(rows[i].six) - 1;
// 							// 	rows[i].six = 1;
// 							// 	rows[i].od2six = 0;
// 							// }
// 							// if (rows[i].seven > 1) {
// 							// 	rows[i].od1seven = Number(rows[i].seven) - 1;
// 							// 	rows[i].od1seven = rows[i].od1seven * 8;
// 							// 	rows[i].seven = 1;
// 							// 	rows[i].od2seven = 0;
// 							// }
// 							// if (rows[i].eight > 1) {
// 							// 	rows[i].od1eight = Number(rows[i].eight) - 1;
// 							// 	rows[i].eight = 1;
// 							// 	rows[i].od2eight = 0;
// 							// }
// 							// if (rows[i].nine > 1) {
// 							// 	rows[i].od1nine = Number(rows[i].nine) - 1;
// 							// 	rows[i].nine = 1;
// 							// 	rows[i].od2nine = 0;
// 							// }
// 							// if (rows[i].ten > 1) {
// 							// 	rows[i].od1ten = Number(rows[i].ten) - 1;
// 							// 	rows[i].ten = 1;
// 							// 	rows[i].od2ten = 0;
// 							// }
// 							// if (rows[i].eleven > 1) {
// 							// 	rows[i].od1eleven = Number(rows[i].eleven) - 1;
// 							// 	rows[i].eleven = 1;
// 							// 	rows[i].od2eleven = 0;
// 							// }
// 							// if (rows[i].twelve > 1) {
// 							// 	rows[i].od1twelve = Number(rows[i].twelve) - 1;
// 							// 	rows[i].twelve = 1;
// 							// 	rows[i].od2twelve = 0;
// 							// }
// 							// if (rows[i].thirteen > 1) {
// 							// 	rows[i].od1thirteen = Number(rows[i].thirteen) - 1;
// 							// 	rows[i].thirteen = 1;
// 							// 	rows[i].od2thirteen = 0;
// 							// }
// 							// if (rows[i].fourteen > 1) {
// 							// 	rows[i].od1fourteen = Number(rows[i].fourteen) - 1;
// 							// 	rows[i].fourteen = 1;
// 							// 	rows[i].od2fourteen = 0;
// 							// }
// 							// if (rows[i].fifteen > 1) {
// 							// 	rows[i].od1fifteen = Number(rows[i].fifteen) - 1;
// 							// 	rows[i].fifteen = 1;
// 							// 	rows[i].od2fifteen = 0;
// 							// }
// 							// if (rows[i].sixteen > 1) {
// 							// 	rows[i].od1sixteen = Number(rows[i].sixteen) - 1;
// 							// 	rows[i].sixteen = 1;
// 							// 	rows[i].od2sixteen = 0;
// 							// }
// 							// if (rows[i].seventeen > 1) {
// 							// 	rows[i].od1seventeen = Number(rows[i].seventeen) - 1;
// 							// 	rows[i].seventeen = 1;
// 							// 	rows[i].od2seventeen = 0;
// 							// }
// 							// if (rows[i].eighteen > 1) {
// 							// 	rows[i].od1eighteen = Number(rows[i].eighteen) - 1;
// 							// 	rows[i].eighteen = 1;
// 							// 	rows[i].od2eighteen = 0;
// 							// }
// 							// if (rows[i].nineteen > 1) {
// 							// 	rows[i].od1nineteen = Number(rows[i].nineteen) - 1;
// 							// 	rows[i].nineteen = 1;
// 							// 	rows[i].od2nineteen = 0;
// 							// }
// 							// if (rows[i].twenty > 1) {
// 							// 	rows[i].od1twenty = Number(rows[i].twenty) - 1;
// 							// 	rows[i].twenty = 1;
// 							// 	rows[i].od2twenty = 0;
// 							// }
// 							// if (rows[i].twentyone > 1) {
// 							// 	rows[i].od1twentyone = Number(rows[i].twentyone) - 1;
// 							// 	rows[i].twentyone = 1;
// 							// 	rows[i].od2twentyone = 0;
// 							// }
// 							// if (rows[i].twentythree > 1) {
// 							// 	rows[i].od1twentythree = Number(rows[i].twentythree) - 1;
// 							// 	rows[i].twentythree = 1;
// 							// 	rows[i].od2twentythree = 0;
// 							// }
// 							// if (rows[i].twentyfour > 1) {
// 							// 	rows[i].od1twentyfour = Number(rows[i].twentyfour) - 1;
// 							// 	rows[i].twentyfour = 1;
// 							// 	rows[i].od2twentyfour = 0;
// 							// }
// 							// if (rows[i].twentyfive > 1) {
// 							// 	rows[i].od1twentyfive = Number(rows[i].twentyfive) - 1;
// 							// 	rows[i].twentyfive = 1;
// 							// 	rows[i].od2twentyfive = 0;
// 							// }
// 							// if (rows[i].twentysix > 1) {
// 							// 	rows[i].od1twentysix = Number(rows[i].twentysix) - 1;
// 							// 	rows[i].twentysix = 1;
// 							// 	rows[i].od2twentysix = 0;
// 							// }
// 							// if (rows[i].twentyseven > 1) {
// 							// 	rows[i].od1twentyseven = Number(rows[i].twentyseven) - 1;
// 							// 	rows[i].twentyseven = 1;
// 							// 	rows[i].od2twentyseven = 0;
// 							// }
// 							// if (rows[i].twentyeight > 1) {
// 							// 	rows[i].od1twentyeight = Number(rows[i].twentyeight) - 1;
// 							// 	rows[i].twentyeight = 1;
// 							// 	rows[i].od2twentyeight = 0;
// 							// }
// 							// if (rows[i].twentynine > 1) {
// 							// 	rows[i].od1twentynine = Number(rows[i].twentynine) - 1;
// 							// 	rows[i].twentynine = 1;
// 							// 	rows[i].od2twentynine = 0;
// 							// }
// 							// if (rows[i].thirty > 1) {
// 							// 	rows[i].od1thirty = Number(rows[i].thirty) - 1;
// 							// 	rows[i].thirty = 1;
// 							// 	rows[i].od2thirty = 0;
// 							// }
// 							// if (rows[i].thirtyone > 1) {
// 							// 	rows[i].od1thirtyone = Number(rows[i].thirtyone) - 1;
// 							// 	rows[i].thirtyone = 1;
// 							// 	rows[i].od2thirtyone = 0;
// 							// }

// 							rows[i].selectattendance = 1;
// 							rows[i].adselect = 1;
// 							rows[i].ed1select = 0;
// 							rows[i].ed2select = 0;
// 							var obj = new clientModel.membersEdit(rows[i].attendanceid, rows[i].memberid, rows[i].firstname, rows[i].texcono, rows[i].serviceno, rows[i].jobpostingdetailid, rows[i].one, rows[i].two, rows[i].three, rows[i].four, rows[i].five, rows[i].six, rows[i].seven, rows[i].eight, rows[i].nine, rows[i].ten, rows[i].eleven, rows[i].twelve, rows[i].thirteen, rows[i].fourteen, rows[i].fifteen, rows[i].sixteen, rows[i].seventeen, rows[i].eighteen, rows[i].nineteen, rows[i].twenty, rows[i].twentyone, rows[i].twentytwo, rows[i].twentythree, rows[i].twentyfour, rows[i].twentyfive, rows[i].twentysix, rows[i].twentyseven, rows[i].twentyeight, rows[i].twentynine, rows[i].thirty, rows[i].thirtyone, rows[i].valone, rows[i].valtwo, rows[i].valthree, rows[i].valfour, rows[i].valfive, rows[i].valsix, rows[i].valseven, rows[i].valeight, rows[i].valnine, rows[i].valten, rows[i].valeleven, rows[i].valtwelve, rows[i].valthirteen, rows[i].valfourteen, rows[i].valfifteen, rows[i].valsixteen, rows[i].valseventeen, rows[i].valeighteen, rows[i].valnineteen, rows[i].valtwenty, rows[i].valtwentyone, rows[i].valtwentytwo, rows[i].valtwentythree, rows[i].valtwentyfour, rows[i].valtwentyfive, rows[i].valtwentysix, rows[i].valtwentyseven, rows[i].valtwentyeight, rows[i].valtwentynine, rows[i].valthirty, rows[i].valthirtyone, (rows[i].presentdays != undefined ? rows[i].presentdays : 0), (rows[i].othours != undefined ? rows[i].othours : 0), rows[i].status, rows[i].jobcode, rows[i].eddays, rows[i].selectattendance, rows[i].adselect, rows[i].ed1select, rows[i].ed2select, rows[i].SelectItems);
// 						}
// 						members.push(obj);
// 						if ((i + 1 == rowsReturned) || (rows[i].projectid != rows[i + 1].projectid) || (rows[i].monthandyear != rows[i + 1].monthandyear)) {
// 							var attendance = new clientModel.attendance(rows[i].clientid, rows[i].projectid, rows[i].monthandyear, rows[i].changedby, members);
// 							result.push(attendance)
// 							members = [];
// 						}
// 					}
// 				}
// 				resolve(result);
// 			}).catch(function (err) {
// 				reject(err);
// 			});
// 		}).catch(function (err) {
// 			reject(err);
// 		});
// 	});
// }


module.exports.geteditattendancedetails = function (projectid, monthandyear, clientid) {
	//console.log('projectid',projectid);
	//console.log('monthandyear',monthandyear);
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
					SELECT
						at.attendanceid,
						at.clientid,
						at.projectid,
						at.memberid,
						at.monthandyear,
						at.one,
						at.two,
						at.three,
						at.four,
						at.five,
						at.six,
						at.seven,
						at.eight,
						at.nine,
						at.ten,
						at.eleven,
						at.twelve,
						at.thirteen,
						at.fourteen,
						at.fifteen,
						at.sixteen,
						at.seventeen,
						at.eighteen,
						at.nineteen,
						at.twenty,
						at.twentyone,
						at.twentytwo,
						at.twentythree,
						at.twentyfour,
						at.twentyfive,
						at.twentysix,
						at.twentyseven,
						at.twentyeight,
						at.twentynine,
						at.thirty,
						at.thirtyone,
						'0'  AS od1one,
						'0'  AS od1two,
						'0'  AS od1three,
						'0'  AS od1four,
						'0'  AS od1five,
						'0'  AS od1six,
						'0'  AS od1seven,
						'0'  AS od1eight,
						'0'  AS od1nine,
						'0'  AS od1ten,
						'0'  AS od1eleven,
						'0'  AS od1twelve,
						'0'  AS od1thirteen,
						'0'  AS od1fourteen,
						'0'  AS od1fifteen,
						'0'  AS od1sixteen,
						'0'  AS od1seventeen,
						'0'  AS od1eighteen,
						'0'  AS od1nineteen,
						'0'  AS od1twenty,
						'0'  AS od1twentyone,
						'0'  AS od1twentytwo,
						'0'  AS od1twentythree,
						'0'  AS od1twentyfour,
						'0'  AS od1twentyfive,
						'0'  AS od1twentysix,
						'0'  AS od1twentyseven,
						'0'  AS od1twentyeight,
						'0'  AS od1twentynine,
						'0'  AS od1thirty,
						'0'  AS od1thirtyone,
						'0'  AS od2one,
						'0'  AS od2two,
						'0'  AS od2three,
						'0'  AS od2four,
						'0'  AS od2five,
						'0'  AS od2six,
						'0'  AS od2seven,
						'0'  AS od2eight,
						'0'  AS od2nine,
						'0'  AS od2ten,
						'0'  AS od2eleven,
						'0'  AS od2twelve,
						'0'  AS od2thirteen,
						'0'  AS od2fourteen,
						'0'  AS od2fifteen,
						'0'  AS od2sixteen,
						'0'  AS od2seventeen,
						'0'  AS od2eighteen,
						'0'  AS od2nineteen,
						'0'  AS od2twenty,
						'0'  AS od2twentyone,
						'0'  AS od2twentytwo,
						'0'  AS od2twentythree,
						'0'  AS od2twentyfour,
						'0'  AS od2twentyfive,
						'0'  AS od2twentysix,
						'0'  AS od2twentyseven,
						'0'  AS od2twentyeight,
						'0'  AS od2twentynine,
						'0'  AS od2thirty,
						'0'  AS od2thirtyone,
						'0'  AS selectattendance,
						'0'  AS adselect,
						'0'  AS ed1select,
						'0'  AS ed2select,
						'0'  AS SelectItems,
						at.presentdays,
						at.othours,
						at.status,
						m.firstname,
						m.lastname,
						m.texcono,
						m.serviceno,
						pr.name AS projectname,
						pr.projectno,
						cl.organization,
						jm.code AS jobcode,
						jm.name AS jobname
						
						FROM attendance at

						INNER JOIN client cl ON
							cl.clientid = at.clientid
						AND cl.active =1

						INNER JOIN project pr ON
							pr.projectid = at.projectid
							AND pr.active =1

						INNER JOIN member m ON
							m.memberid = at.memberid
							AND m.active =1

						INNER JOIN jobmaster jm ON
							jm.jobmasterid = at.jobmasterid 
							AND jm.active =1
							
					WHERE at.active = 1 AND (at.status = 0 || (at.status = 7 AND (at.athold = 1 OR at.edhold = 1))) AND at.projectid = ? AND at.monthandyear = ? AND at.attendancesaved = 1;
            	*/
			});
			con.query(query, [projectid, monthandyear]).then(function (rows, fields) {
				//console.log('rows',rows);
				var rowsReturned = rows.length;
				var result = [];
				var members = [];
				var attendance = {};
				if (rowsReturned > 0) {
					for (var i = 0; i < rowsReturned; i++) {
						if (rows[i].jobcode != 'DVR') {
							if (rows[i].one == 1) {
								rows[i].one = 1;
								rows[i].od1one = 0;
								rows[i].od2one = 0;
							}
							if (rows[i].two == 1) {
								rows[i].two = 1;
								rows[i].od1two = 0;
								rows[i].od2two = 0;
							}
							if (rows[i].three == 1) {
								rows[i].three = 1;
								rows[i].od1three = 0;
								rows[i].od2three = 0;
							}
							if (rows[i].four == 1) {
								rows[i].four = 1;
								rows[i].od1four = 0;
								rows[i].od2four = 0;
							}
							if (rows[i].five == 1) {
								rows[i].five = 1;
								rows[i].od1five = 0;
								rows[i].od2five = 0;
							}
							if (rows[i].six == 1) {
								rows[i].six = 1;
								rows[i].od1six = 0;
								rows[i].od2six = 0;
							}
							if (rows[i].seven == 1) {
								rows[i].seven = 1;
								rows[i].od1seven = 0;
								rows[i].od2seven = 0;
							}
							if (rows[i].eight == 1) {
								rows[i].eight = 1;
								rows[i].od1eight = 0;
								rows[i].od2eight = 0;
							}
							if (rows[i].nine == 1) {
								rows[i].nine = 1;
								rows[i].od1nine = 0;
								rows[i].od2nine = 0;
							}
							if (rows[i].ten == 1) {
								rows[i].ten = 1;
								rows[i].od1ten = 0;
								rows[i].od2ten = 0;
							}
							if (rows[i].eleven == 1) {
								rows[i].eleven = 1;
								rows[i].od1eleven = 0;
								rows[i].od2eleven = 0;
							}
							if (rows[i].twelve == 1) {
								rows[i].twelve = 1;
								rows[i].od1twelve = 0;
								rows[i].od2twelve = 0;
							}
							if (rows[i].thirteen == 1) {
								rows[i].thirteen = 1;
								rows[i].od1thirteen = 0;
								rows[i].od2thirteen = 0;
							}
							if (rows[i].fourteen == 1) {
								rows[i].fourteen = 1;
								rows[i].od1fourteen = 0;
								rows[i].od2fourteen = 0;
							}
							if (rows[i].fifteen == 1) {
								rows[i].fifteen = 1;
								rows[i].od1fifteen = 0;
								rows[i].od2fifteen = 0;
							}
							if (rows[i].sixteen == 1) {
								rows[i].sixteen = 1;
								rows[i].od1sixteen = 0;
								rows[i].od2sixteen = 0;
							}
							if (rows[i].seventeen == 1) {
								rows[i].seventeen = 1;
								rows[i].od1seventeen = 0;
								rows[i].od2seventeen = 0;
							}
							if (rows[i].eighteen == 1) {
								rows[i].eighteen = 1;
								rows[i].od1eighteen = 0;
								rows[i].od2eighteen = 0;
							}
							if (rows[i].nineteen == 1) {
								rows[i].nineteen = 1;
								rows[i].od1nineteen = 0;
								rows[i].od2nineteen = 0;
							}
							if (rows[i].twenty == 1) {
								rows[i].twenty = 1;
								rows[i].od1twenty = 0;
								rows[i].od2twenty = 0;
							}
							if (rows[i].twentyone == 1) {
								rows[i].twentyone = 1;
								rows[i].od1twentyone = 0;
								rows[i].od2twentyone = 0;
							}
							if (rows[i].twentytwo == 1) {
								rows[i].twentytwo = 1;
								rows[i].od1twentytwo = 0;
								rows[i].od2twentytwo = 0;
							}
							if (rows[i].twentythree == 1) {
								rows[i].twentythree = 1;
								rows[i].od1twentythree = 0;
								rows[i].od2twentythree = 0;
							}
							if (rows[i].twentyfour == 1) {
								rows[i].twentyfour = 1;
								rows[i].od1twentyfour = 0;
								rows[i].od2twentyfour = 0;
							}
							if (rows[i].twentyfive == 1) {
								rows[i].twentyfive = 1;
								rows[i].od1twentyfive = 0;
								rows[i].od2twentyfive = 0;
							}
							if (rows[i].twentysix == 1) {
								rows[i].twentysix = 1;
								rows[i].od1twentysix = 0;
								rows[i].od2twentysix = 0;
							}
							if (rows[i].twentyseven == 1) {
								rows[i].twentyseven = 1;
								rows[i].od1twentyseven = 0;
								rows[i].od2twentyseven = 0;
							}
							if (rows[i].twentyeight == 1) {
								rows[i].twentyeight = 1;
								rows[i].od1twentyeight = 0;
								rows[i].od2twentyeight = 0;
							}
							if (rows[i].twentynine == 1) {
								rows[i].twentynine = 1;
								rows[i].od1twentynine = 0;
								rows[i].od2twentynine = 0;
							}
							if (rows[i].thirty == 1) {
								rows[i].thirty = 1;
								rows[i].od1thirty = 0;
								rows[i].od2thirty = 0;
							}
							if (rows[i].thirtyone == 1) {
								rows[i].thirtyone = 1;
								rows[i].od1thirtyone = 0;
								rows[i].od2thirtyone = 0;
							}


							if (rows[i].one == 2) {
								rows[i].one = 1;
								rows[i].od1one = 1;
								rows[i].od2one = 0;
							}
							if (rows[i].two == 2) {
								rows[i].two = 1;
								rows[i].od1two = 1;
								rows[i].od2two = 0;
							}
							if (rows[i].three == 2) {
								rows[i].three = 1;
								rows[i].od1three = 1;
								rows[i].od2three = 0;
								rows[i].od2three = 0;
							}
							if (rows[i].four == 2) {
								rows[i].four = 1;
								rows[i].od1four = 1;
								rows[i].od2four = 0;
							}
							if (rows[i].five == 2) {
								rows[i].five = 1;
								rows[i].od1five = 1;
								rows[i].od2five = 0;
							}
							if (rows[i].six == 2) {
								rows[i].six = 1;
								rows[i].od1six = 1;
								rows[i].od2six = 0;
							}
							if (rows[i].seven == 2) {
								rows[i].seven = 1;
								rows[i].od1seven = 1;
								rows[i].od2seven = 0;
							}
							if (rows[i].eight == 2) {
								rows[i].eight = 1;
								rows[i].od1eight = 1;
								rows[i].od2eight = 0;
							}
							if (rows[i].nine == 2) {
								rows[i].nine = 1;
								rows[i].od1nine = 1;
								rows[i].od2nine = 0;
							}
							if (rows[i].ten == 2) {
								rows[i].ten = 1;
								rows[i].od1ten = 1;
								rows[i].od2ten = 0;
							}
							if (rows[i].eleven == 2) {
								rows[i].eleven = 1;
								rows[i].od1eleven = 1;
								rows[i].od2eleven = 0;
							}
							if (rows[i].twelve == 2) {
								rows[i].twelve = 1;
								rows[i].od1twelve = 1;
								rows[i].od2twelve = 0;
							}
							if (rows[i].thirteen == 2) {
								rows[i].thirteen = 1;
								rows[i].od1thirteen = 1;
								rows[i].od2thirteen = 0;
							}
							if (rows[i].fourteen == 2) {
								rows[i].fourteen = 1;
								rows[i].od1fourteen = 1;
								rows[i].od2fourteen = 0;
							}
							if (rows[i].fifteen == 2) {
								rows[i].fifteen = 1;
								rows[i].od1fifteen = 1;
								rows[i].od2fifteen = 0;
							}
							if (rows[i].sixteen == 2) {
								rows[i].sixteen = 1;
								rows[i].od1sixteen = 1;
								rows[i].od2sixteen = 0;
							}
							if (rows[i].seventeen == 2) {
								rows[i].seventeen = 1;
								rows[i].od1seventeen = 1;
								rows[i].od2seventeen = 0;
							}
							if (rows[i].eighteen == 2) {
								rows[i].eighteen = 1;
								rows[i].od1eighteen = 1;
								rows[i].od2eighteen = 0;
							}
							if (rows[i].nineteen == 2) {
								rows[i].nineteen = 1;
								rows[i].od1nineteen = 1;
								rows[i].od2nineteen = 0;
							}
							if (rows[i].twenty == 2) {
								rows[i].twenty = 1;
								rows[i].od1twenty = 1;
								rows[i].od2twenty = 0;
							}
							if (rows[i].twentyone == 2) {
								rows[i].twentyone = 1;
								rows[i].od1twentyone = 1;
								rows[i].od2twentyone = 0;
							}
							if (rows[i].twentytwo == 2) {
								rows[i].twentytwo = 1;
								rows[i].od1twentytwo = 1;
								rows[i].od2twentytwo = 0;
							}
							if (rows[i].twentythree == 2) {
								rows[i].twentythree = 1;
								rows[i].od1twentythree = 1;
								rows[i].od2twentythree = 0;
							}
							if (rows[i].twentyfour == 2) {
								rows[i].twentyfour = 1;
								rows[i].od1twentyfour = 1;
								rows[i].od2twentyfour = 0;
							}
							if (rows[i].twentyfive == 2) {
								rows[i].twentyfive = 1;
								rows[i].od1twentyfive = 1;
								rows[i].od2twentyfive = 0;
							}
							if (rows[i].twentysix == 2) {
								rows[i].twentysix = 1;
								rows[i].od1twentysix = 1;
								rows[i].od2twentysix = 0;
							}
							if (rows[i].twentyseven == 2) {
								rows[i].twentyseven = 1;
								rows[i].od1twentyseven = 1;
								rows[i].od2twentyseven = 0;
							}
							if (rows[i].twentyeight == 2) {
								rows[i].twentyeight = 1;
								rows[i].od1twentyeight = 1;
								rows[i].od2twentyeight = 0;
							}
							if (rows[i].twentynine == 2) {
								rows[i].twentynine = 1;
								rows[i].od1twentynine = 1;
								rows[i].od2twentynine = 0;
							}
							if (rows[i].thirty == 2) {
								rows[i].thirty = 1;
								rows[i].od1thirty = 1;
								rows[i].od2thirty = 0;
							}
							if (rows[i].thirtyone == 2) {
								rows[i].thirtyone = 1;
								rows[i].od1thirtyone = 1;
								rows[i].od2thirtyone = 0;
							}


							if (rows[i].one == 2.5) {
								rows[i].one = 1;
								rows[i].od1one = 1;
								rows[i].od2one = .5;
							}
							if (rows[i].two == 2.5) {
								rows[i].two = 1;
								rows[i].od1two = 1;
								rows[i].od2two = .5;
							}
							if (rows[i].three == 2.5) {
								rows[i].three = 1;
								rows[i].od1three = 1;
								rows[i].od2three = .5;
							}
							if (rows[i].four == 2.5) {
								rows[i].four = 1;
								rows[i].od1four = 1;
								rows[i].od2four = .5;
							}
							if (rows[i].five == 2.5) {
								rows[i].five = 1;
								rows[i].od1five = 1;
								rows[i].od2five = .5;
							}
							if (rows[i].six == 2.5) {
								rows[i].six = 1;
								rows[i].od1six = 1;
								rows[i].od2six = .5;
							}
							if (rows[i].seven == 2.5) {
								rows[i].seven = 1;
								rows[i].od1seven = 1;
								rows[i].od2seven = .5;
							}
							if (rows[i].eight == 2.5) {
								rows[i].eight = 1;
								rows[i].od1eight = 1;
								rows[i].od2eight = .5;
							}
							if (rows[i].nine == 2.5) {
								rows[i].nine = 1;
								rows[i].od1nine = 1;
								rows[i].od2nine = .5;
							}
							if (rows[i].ten == 2.5) {
								rows[i].ten = 1;
								rows[i].od1ten = 1;
								rows[i].od2ten = .5;
							}
							if (rows[i].eleven == 2.5) {
								rows[i].eleven = 1;
								rows[i].od1eleven = 1;
								rows[i].od2eleven = .5;
							}
							if (rows[i].twelve == 2.5) {
								rows[i].twelve = 1;
								rows[i].od1twelve = 1;
								rows[i].od2twelve = .5;
							}
							if (rows[i].thirteen == 2.5) {
								rows[i].thirteen = 1;
								rows[i].od1thirteen = 1;
								rows[i].od2thirteen = .5;
							}
							if (rows[i].fourteen == 2.5) {
								rows[i].fourteen = 1;
								rows[i].od1fourteen = 1;
								rows[i].od2fourteen = .5;
							}
							if (rows[i].fifteen == 2.5) {
								rows[i].fifteen = 1;
								rows[i].od1fifteen = 1;
								rows[i].od2fifteen = .5;
							}
							if (rows[i].sixteen == 2.5) {
								rows[i].sixteen = 1;
								rows[i].od1sixteen = 1;
								rows[i].od2sixteen = .5;
							}
							if (rows[i].seventeen == 2.5) {
								rows[i].seventeen = 1;
								rows[i].od1seventeen = 1;
								rows[i].od2seventeen = .5;
							}
							if (rows[i].eighteen == 2.5) {
								rows[i].eighteen = 1;
								rows[i].od1eighteen = 1;
								rows[i].od2eighteen = .5;
							}
							if (rows[i].nineteen == 2.5) {
								rows[i].nineteen = 1;
								rows[i].od1nineteen = 1;
								rows[i].od2nineteen = .5;
							}
							if (rows[i].twenty == 2.5) {
								rows[i].twenty = 1;
								rows[i].od1twenty = 1;
								rows[i].od2twenty = .5;
							}
							if (rows[i].twentyone == 2.5) {
								rows[i].twentyone = 1;
								rows[i].od1twentyone = 1;
								rows[i].od2twentyone = .5;
							}
							if (rows[i].twentytwo == 2.5) {
								rows[i].twentytwo = 1;
								rows[i].od1twentytwo = 1;
								rows[i].od2twentytwo = .5;
							}
							if (rows[i].twentythree == 2.5) {
								rows[i].twentythree = 1;
								rows[i].od1twentythree = 1;
								rows[i].od2twentythree = .5;
							}
							if (rows[i].twentyfour == 2.5) {
								rows[i].twentyfour = 1;
								rows[i].od1twentyfour = 1;
								rows[i].od2twentyfour = .5;
							}
							if (rows[i].twentyfive == 2.5) {
								rows[i].twentyfive = 1;
								rows[i].od1twentyfive = 1;
								rows[i].od2twentyfive = .5;
							}
							if (rows[i].twentysix == 2.5) {
								rows[i].twentysix = 1;
								rows[i].od1twentysix = 1;
								rows[i].od2twentysix = .5;
							}
							if (rows[i].twentyseven == 2.5) {
								rows[i].twentyseven = 1;
								rows[i].od1twentyseven = 1;
								rows[i].od2twentyseven = .5;
							}
							if (rows[i].twentyeight == 2.5) {
								rows[i].twentyeight = 1;
								rows[i].od1twentyeight = 1;
								rows[i].od2twentyeight = .5;
							}
							if (rows[i].twentynine == 2.5) {
								rows[i].twentynine = 1;
								rows[i].od1twentynine = 1;
								rows[i].od2twentynine = .5;
							}
							if (rows[i].thirty == 2.5) {
								rows[i].thirty = 1;
								rows[i].od1thirty = 1;
								rows[i].od2thirty = .5;
							}
							if (rows[i].thirtyone == 2.5) {
								rows[i].thirtyone = 1;
								rows[i].od1thirtyone = 1;
								rows[i].od2thirtyone = .5;
							}

							if (rows[i].one ==1.5) {
								rows[i].one = 1;
								rows[i].od1one = 0;
								rows[i].od2one = .5;
							}
							if (rows[i].two ==1.5) {
								rows[i].two = 1;
								rows[i].od1two = 0;
								rows[i].od2two = .5;
							}
							if (rows[i].three ==1.5) {
								rows[i].three = 1;
								rows[i].od1three = 0;
								rows[i].od2three = .5;
							}
							if (rows[i].four ==1.5) {
								rows[i].four = 1;
								rows[i].od1four = 0;
								rows[i].od2four = .5;
							}
							if (rows[i].five ==1.5) {
								rows[i].five = 1;
								rows[i].od1five = 0;
								rows[i].od2five = .5;
							}
							if (rows[i].six ==1.5) {
								rows[i].six = 1;
								rows[i].od1six = 0;
								rows[i].od2six = .5;
							}
							if (rows[i].seven ==1.5) {
								rows[i].seven = 1;
								rows[i].od1seven = 0;
								rows[i].od2seven = .5;
							}
							if (rows[i].eight ==1.5) {
								rows[i].eight = 1;
								rows[i].od1eight = 0;
								rows[i].od2eight = .5;
							}
							if (rows[i].nine ==1.5) {
								rows[i].nine = 1;
								rows[i].od1nine = 0;
								rows[i].od2nine = .5;
							}
							if (rows[i].ten ==1.5) {
								rows[i].ten = 1;
								rows[i].od1ten = 0;
								rows[i].od2ten = .5;
							}
							if (rows[i].eleven ==1.5) {
								rows[i].eleven = 1;
								rows[i].od1eleven = 0;
								rows[i].od2eleven = .5;
							}
							if (rows[i].twelve ==1.5) {
								rows[i].twelve = 1;
								rows[i].od1twelve = 0;
								rows[i].od2twelve = .5;
							}
							if (rows[i].thirteen ==1.5) {
								rows[i].thirteen = 1;
								rows[i].od1thirteen = 0;
								rows[i].od2thirteen = .5;
							}
							if (rows[i].fourteen ==1.5) {
								rows[i].fourteen = 1;
								rows[i].od1fourteen = 0;
								rows[i].od2fourteen = .5;
							}
							if (rows[i].fifteen ==1.5) {
								rows[i].fifteen = 1;
								rows[i].od1fifteen = 0;
								rows[i].od2fifteen = .5;
							}
							if (rows[i].sixteen ==1.5) {
								rows[i].sixteen = 1;
								rows[i].od1sixteen = 0;
								rows[i].od2sixteen = .5;
							}
							if (rows[i].seventeen ==1.5) {
								rows[i].seventeen = 1;
								rows[i].od1seventeen = 0;
								rows[i].od2seventeen = .5;
							}
							if (rows[i].eighteen ==1.5) {
								rows[i].eighteen = 1;
								rows[i].od1eighteen = 0;
								rows[i].od2eighteen = .5;
							}
							if (rows[i].nineteen ==1.5) {
								rows[i].nineteen = 1;
								rows[i].od1nineteen = 0;
								rows[i].od2nineteen = .5;
							}
							if (rows[i].twenty ==1.5) {
								rows[i].twenty = 1;
								rows[i].od1twenty = 0;
								rows[i].od2twenty = .5;
							}
							if (rows[i].twentyone ==1.5) {
								rows[i].twentyone = 1;
								rows[i].od1twentyone = 0;
								rows[i].od2twentyone = .5;
							}
							if (rows[i].twentytwo ==1.5) {
								rows[i].twentytwo = 1;
								rows[i].od1twentytwo = 0;
								rows[i].od2twentytwo = .5;
							}
							if (rows[i].twentythree ==1.5) {
								rows[i].twentythree = 1;
								rows[i].od1twentythree = 0;
								rows[i].od2twentythree = .5;
							}
							if (rows[i].twentyfour ==1.5) {
								rows[i].twentyfour = 1;
								rows[i].od1twentyfour = 0;
								rows[i].od2twentyfour = .5;
							}
							if (rows[i].twentyfive ==1.5) {
								rows[i].twentyfive = 1;
								rows[i].od1twentyfive = 0;
								rows[i].od2twentyfive = .5;
							}
							if (rows[i].twentysix ==1.5) {
								rows[i].twentysix = 1;
								rows[i].od1twentysix = 0;
								rows[i].od2twentysix = .5;
							}
							if (rows[i].twentyseven ==1.5) {
								rows[i].twentyseven = 1;
								rows[i].od1twentyseven = 0;
								rows[i].od2twentyseven = .5;
							}
							if (rows[i].twentyeight ==1.5) {
								rows[i].twentyeight = 1;
								rows[i].od1twentyeight = 0;
								rows[i].od2twentyeight = .5;
							}
							if (rows[i].twentynine ==1.5) {
								rows[i].twentynine = 1;
								rows[i].od1twentynine = 0;
								rows[i].od2twentynine = .5;
							}
							if (rows[i].thirty ==1.5) {
								rows[i].thirty = 1;
								rows[i].od1thirty = 0;
								rows[i].od2thirty = .5;
							}
							if (rows[i].thirtyone ==1.5) {
								rows[i].thirtyone = 1;
								rows[i].od1thirtyone = 0;
								rows[i].od2thirtyone = .5;
							}
							rows[i].selectattendance = 1;
							rows[i].adselect = 1;
							rows[i].ed1select = 0;
							rows[i].ed2select = 0;

							var obj = new clientModel.members(rows[i].attendanceid, rows[i].memberid, rows[i].firstname, rows[i].texcono, rows[i].serviceno, rows[i].jobpostingdetailid, rows[i].one, rows[i].two, rows[i].three, rows[i].four, rows[i].five, rows[i].six, rows[i].seven, rows[i].eight, rows[i].nine, rows[i].ten, rows[i].eleven, rows[i].twelve, rows[i].thirteen, rows[i].fourteen, rows[i].fifteen, rows[i].sixteen, rows[i].seventeen, rows[i].eighteen, rows[i].nineteen, rows[i].twenty, rows[i].twentyone, rows[i].twentytwo, rows[i].twentythree, rows[i].twentyfour, rows[i].twentyfive, rows[i].twentysix, rows[i].twentyseven, rows[i].twentyeight, rows[i].twentynine, rows[i].thirty, rows[i].thirtyone, rows[i].od1one, rows[i].od1two, rows[i].od1three, rows[i].od1four, rows[i].od1five, rows[i].od1six, rows[i].od1seven, rows[i].od1eight, rows[i].od1nine, rows[i].od1ten, rows[i].od1eleven, rows[i].od1twelve, rows[i].od1thirteen, rows[i].od1fourteen, rows[i].od1fifteen, rows[i].od1sixteen, rows[i].od1seventeen, rows[i].od1eighteen, rows[i].od1nineteen, rows[i].od1twenty, rows[i].od1twentyone, rows[i].od1twentytwo, rows[i].od1twentythree, rows[i].od1twentyfour, rows[i].od1twentyfive, rows[i].od1twentysix, rows[i].od1twentyseven, rows[i].od1twentyeight, rows[i].od1twentynine, rows[i].od1thirty, rows[i].od1thirtyone, rows[i].od2one, rows[i].od2two, rows[i].od2three, rows[i].od2four, rows[i].od2five, rows[i].od2six, rows[i].od2seven, rows[i].od2eight, rows[i].od2nine, rows[i].od2ten, rows[i].od2eleven, rows[i].od2twelve, rows[i].od2thirteen, rows[i].od2fourteen, rows[i].od2fifteen, rows[i].od2sixteen, rows[i].od2seventeen, rows[i].od2eighteen, rows[i].od2nineteen, rows[i].od2twenty, rows[i].od2twentyone, rows[i].od2twentytwo, rows[i].od2twentythree, rows[i].od2twentyfour, rows[i].od2twentyfive, rows[i].od2twentysix, rows[i].od2twentyseven, rows[i].od2twentyeight, rows[i].od2twentynine, rows[i].od2thirty, rows[i].od2thirtyone, (rows[i].presentdays != undefined ? rows[i].presentdays : 0), (rows[i].othours != undefined ? rows[i].othours : 0), rows[i].status, rows[i].jobcode, rows[i].eddays, rows[i].selectattendance, rows[i].adselect, rows[i].ed1select, rows[i].ed2select, rows[i].SelectItems);
						} else {
							if (rows[i].one > 1) {
								rows[i].od1one = Number(rows[i].one) - 1;
								rows[i].od1one = Math.round(rows[i].od1one * 8);
								rows[i].one = 1;
								rows[i].od2one = 0;
							}
							if (rows[i].two > 1) {
								rows[i].od1two = Number(rows[i].two) - 1;
								rows[i].od1two = Math.round(rows[i].od1two * 8);
								rows[i].two = 1;
								rows[i].od2two = 0;
							}
							if (rows[i].three > 1) { 
								rows[i].od1three = Math.round((Number(rows[i].three) - 1) * 8); 
								rows[i].three = 1;
								rows[i].od2three = 0;
							}
							if (rows[i].four > 1) {
								rows[i].od1four = Math.round((Number(rows[i].four) - 1) * 8);
								rows[i].four = 1;
								rows[i].od2four = 0;
							}
							if (rows[i].five > 1) {
								rows[i].od1five = Math.round((Number(rows[i].five) - 1) * 8);
								rows[i].five = 1;
								rows[i].od2five = 0;
							}
							if (rows[i].six > 1) {
								rows[i].od1six = Math.round((Number(rows[i].six) - 1) * 8);
								rows[i].six = 1;
								rows[i].od2six = 0;
							}
							if (rows[i].seven > 1) {
								rows[i].od1seven = (Number(rows[i].seven) - 1) * 8;
								rows[i].od1seven = Math.round(rows[i].od1seven * 8);
								rows[i].seven = 1;
								rows[i].od2seven = 0;
							}
							if (rows[i].eight > 1) {
								rows[i].od1eight = Math.round((Number(rows[i].eight) - 1) * 8);
								rows[i].eight = 1;
								rows[i].od2eight = 0;
							}
							if (rows[i].nine > 1) {
								rows[i].od1nine = Math.round((Number(rows[i].nine) - 1) * 8);
								rows[i].nine = 1;
								rows[i].od2nine = 0;
							}
							if (rows[i].ten > 1) {
								rows[i].od1ten = Math.round((Number(rows[i].ten) - 1) * 8);
								rows[i].ten = 1;
								rows[i].od2ten = 0;
							}
							if (rows[i].eleven > 1) {
								rows[i].od1eleven = Math.round((Number(rows[i].eleven) - 1) * 8);
								rows[i].eleven = 1;
								rows[i].od2eleven = 0;
							}
							if (rows[i].twelve > 1) {
								rows[i].od1twelve = Math.round((Number(rows[i].twelve) - 1) * 8);
								rows[i].twelve = 1;
								rows[i].od2twelve = 0;
							}
							if (rows[i].thirteen > 1) {
								rows[i].od1thirteen = Math.round((Number(rows[i].thirteen) - 1) * 8);
								rows[i].thirteen = 1;
								rows[i].od2thirteen = 0;
							}
							if (rows[i].fourteen > 1) {
								rows[i].od1fourteen = Math.round((Number(rows[i].fourteen) - 1) * 8);
								rows[i].fourteen = 1;
								rows[i].od2fourteen = 0;
							}
							if (rows[i].fifteen > 1) {
								rows[i].od1fifteen = Math.round((Number(rows[i].fifteen) - 1) * 8);
								rows[i].fifteen = 1;
								rows[i].od2fifteen = 0;
							}
							if (rows[i].sixteen > 1) {
								rows[i].od1sixteen = Math.round((Number(rows[i].sixteen) - 1) * 8);
								rows[i].sixteen = 1;
								rows[i].od2sixteen = 0;
							}
							if (rows[i].seventeen > 1) {
								rows[i].od1seventeen = Math.round((Number(rows[i].seventeen) - 1) * 8);
								rows[i].seventeen = 1;
								rows[i].od2seventeen = 0;
							}
							if (rows[i].eighteen > 1) {
								rows[i].od1eighteen = Math.round((Number(rows[i].eighteen) - 1) * 8);
								rows[i].eighteen = 1;
								rows[i].od2eighteen = 0;
							}
							if (rows[i].nineteen > 1) {
								rows[i].od1nineteen = Math.round((Number(rows[i].nineteen) - 1) * 8);
								rows[i].nineteen = 1;
								rows[i].od2nineteen = 0;
							}
							if (rows[i].twenty > 1) {
								rows[i].od1twenty = Math.round((Number(rows[i].twenty) - 1) * 8);
								rows[i].twenty = 1;
								rows[i].od2twenty = 0;
							}
							if (rows[i].twentyone > 1) {
								rows[i].od1twentyone = Math.round((Number(rows[i].twentyone) - 1) * 8);
								rows[i].twentyone = 1;
								rows[i].od2twentyone = 0;
							}
							if (rows[i].twentythree > 1) {
								rows[i].od1twentythree = Math.round((Number(rows[i].twentythree) - 1) * 8);
								rows[i].twentythree = 1;
								rows[i].od2twentythree = 0;
							}
							if (rows[i].twentyfour > 1) {
								rows[i].od1twentyfour = Math.round((Number(rows[i].twentyfour) - 1) * 8);
								rows[i].twentyfour = 1;
								rows[i].od2twentyfour = 0;
							}
							if (rows[i].twentyfive > 1) {
								rows[i].od1twentyfive = Math.round((Number(rows[i].twentyfive) - 1) * 8);
								rows[i].twentyfive = 1;
								rows[i].od2twentyfive = 0;
							}
							if (rows[i].twentysix > 1) {
								rows[i].od1twentysix = Math.round((Number(rows[i].twentysix) - 1) * 8);
								rows[i].twentysix = 1;
								rows[i].od2twentysix = 0;
							}
							if (rows[i].twentyseven > 1) {
								rows[i].od1twentyseven = Math.round((Number(rows[i].twentyseven) - 1) * 8);
								rows[i].twentyseven = 1;
								rows[i].od2twentyseven = 0;
							}
							if (rows[i].twentyeight > 1) {
								rows[i].od1twentyeight = Math.round((Number(rows[i].twentyeight) - 1) * 8);
								rows[i].twentyeight = 1;
								rows[i].od2twentyeight = 0;
							}
							if (rows[i].twentynine > 1) {
								rows[i].od1twentynine = Math.round((Number(rows[i].twentynine) - 1) * 8);
								rows[i].twentynine = 1;
								rows[i].od2twentynine = 0;
							}
							if (rows[i].thirty > 1) {
								rows[i].od1thirty = Math.round((Number(rows[i].thirty) - 1) * 8);
								rows[i].thirty = 1;
								rows[i].od2thirty = 0;
							}
							if (rows[i].thirtyone > 1) {
								rows[i].od1thirtyone = Math.round((Number(rows[i].thirtyone) - 1) * 8);
								rows[i].thirtyone = 1;
								rows[i].od2thirtyone = 0;
							}

							rows[i].selectattendance = 1;
							rows[i].adselect = 1;
							rows[i].ed1select = 0;
							rows[i].ed2select = 0;
							var obj = new clientModel.members(rows[i].attendanceid, rows[i].memberid, rows[i].firstname, rows[i].texcono, rows[i].serviceno, rows[i].jobpostingdetailid, rows[i].one, rows[i].two, rows[i].three, rows[i].four, rows[i].five, rows[i].six, rows[i].seven, rows[i].eight, rows[i].nine, rows[i].ten, rows[i].eleven, rows[i].twelve, rows[i].thirteen, rows[i].fourteen, rows[i].fifteen, rows[i].sixteen, rows[i].seventeen, rows[i].eighteen, rows[i].nineteen, rows[i].twenty, rows[i].twentyone, rows[i].twentytwo, rows[i].twentythree, rows[i].twentyfour, rows[i].twentyfive, rows[i].twentysix, rows[i].twentyseven, rows[i].twentyeight, rows[i].twentynine, rows[i].thirty, rows[i].thirtyone, rows[i].od1one, rows[i].od1two, rows[i].od1three, rows[i].od1four, rows[i].od1five, rows[i].od1six, rows[i].od1seven, rows[i].od1eight, rows[i].od1nine, rows[i].od1ten, rows[i].od1eleven, rows[i].od1twelve, rows[i].od1thirteen, rows[i].od1fourteen, rows[i].od1fifteen, rows[i].od1sixteen, rows[i].od1seventeen, rows[i].od1eighteen, rows[i].od1nineteen, rows[i].od1twenty, rows[i].od1twentyone, rows[i].od1twentytwo, rows[i].od1twentythree, rows[i].od1twentyfour, rows[i].od1twentyfive, rows[i].od1twentysix, rows[i].od1twentyseven, rows[i].od1twentyeight, rows[i].od1twentynine, rows[i].od1thirty, rows[i].od1thirtyone, rows[i].od2one, rows[i].od2two, rows[i].od2three, rows[i].od2four, rows[i].od2five, rows[i].od2six, rows[i].od2seven, rows[i].od2eight, rows[i].od2nine, rows[i].od2ten, rows[i].od2eleven, rows[i].od2twelve, rows[i].od2thirteen, rows[i].od2fourteen, rows[i].od2fifteen, rows[i].od2sixteen, rows[i].od2seventeen, rows[i].od2eighteen, rows[i].od2nineteen, rows[i].od2twenty, rows[i].od2twentyone, rows[i].od2twentytwo, rows[i].od2twentythree, rows[i].od2twentyfour, rows[i].od2twentyfive, rows[i].od2twentysix, rows[i].od2twentyseven, rows[i].od2twentyeight, rows[i].od2twentynine, rows[i].od2thirty, rows[i].od2thirtyone, (rows[i].presentdays != undefined ? rows[i].presentdays : 0), (rows[i].othours != undefined ? rows[i].othours : 0), rows[i].status, rows[i].jobcode, rows[i].eddays, rows[i].selectattendance, rows[i].adselect, rows[i].ed1select, rows[i].ed2select, rows[i].SelectItems);
						}
						members.push(obj);

						if ((i + 1 == rowsReturned) || (rows[i].projectid != rows[i + 1].projectid) || (rows[i].monthandyear != rows[i + 1].monthandyear)) {
							var attendance = new clientModel.attendance(rows[i].clientid, rows[i].projectid, rows[i].monthandyear, rows[i].changedby, members);
							result.push(attendance)

							members = [];
						}
					}
				}
				resolve(result);
			}).catch(function (err) {
				errorDAL.errorlog('Error',"clientDAL::geteditattendancedetails",err.stack,JSON.stringify(projectid, monthandyear, clientid),"geteditattendancedetails");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::geteditattendancedetails",err.stack,JSON.stringify(projectid, monthandyear, clientid),"geteditattendancedetails");
			reject(err);
		});
	});
}


module.exports.getattendanceprint = function (projectid, monthandyear) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
            SELECT
                at.attendanceid,
                at.clientid,
                at.projectid,
                at.memberid,
                at.jobpostingdetailid,
                at.jobmasterid,
                at.monthandyear,
                at.one,
                at.two,
                at.three,
                at.four,
                at.five,
                at.six,
                at.seven,
                at.eight,
                at.nine,
                at.ten,
                at.eleven,
                at.twelve,
                at.thirteen,
                at.fourteen,
                at.fifteen,
                at.sixteen,
                at.seventeen,
                at.eighteen,
                at.nineteen,
                at.twenty,
                at.twentyone,
                at.twentytwo,
                at.twentythree,
                at.twentyfour,
                at.twentyfive,
                at.twentysix,
                at.twentyseven,
                at.twentyeight,
                at.twentynine,
                at.thirty,
                at.thirtyone,
				at.presentdays,
				at.attendancesaved as attendancetype,
                at.eddays,
                at.othours,
                at.status,
                at.datedon,
                m.firstname,
                m.lastname,
                m.texcono,
                m.serviceno,
                pr.name AS projectname,
                pr.designation,
                pr.addressline1,
                pr.addressline2,
                pr.addressline3,
                pr.pincode,
                pr.projectno,
                cl.organization AS clientname,
                jm.code AS jobcode,
                jm.name AS jobname
                
                FROM attendance at

                INNER JOIN client cl ON
                    cl.clientid = at.clientid
                AND cl.active =1

                INNER JOIN project pr ON
                    pr.projectid = at.projectid
                    AND pr.active =1

                INNER JOIN member m ON
                    m.memberid = at.memberid
                    AND m.active =1
                 
                INNER JOIN jobmaster jm ON
                    jm.jobmasterid = at.jobmasterid
                    AND jm.active =1

            WHERE at.active = 1
            AND  at.projectid = ?   AND  at.monthandyear = ?;

            */
			});
			con.query(query, [projectid, monthandyear]).then(function (rows, fields) {
				console.log('rows', rows);
				var rowsReturned = rows.length;
				var result = [];
				var members = [];
				var attendance = {};
				if (rowsReturned > 0) {
					for (var i = 0; i < rowsReturned; i++) {
						var obj = new clientModel.printattendance(rows[i].attendanceid, rows[i].memberid, rows[i].firstname, rows[i].texcono, rows[i].serviceno, rows[i].jobpostingdetailid, rows[i].one, rows[i].two, rows[i].three, rows[i].four, rows[i].five, rows[i].six, rows[i].seven, rows[i].eight, rows[i].nine, rows[i].ten, rows[i].eleven, rows[i].twelve, rows[i].thirteen, rows[i].fourteen, rows[i].fifteen, rows[i].sixteen, rows[i].seventeen, rows[i].eighteen, rows[i].nineteen, rows[i].twenty, rows[i].twentyone, rows[i].twentytwo, rows[i].twentythree, rows[i].twentyfour, rows[i].twentyfive, rows[i].twentysix, rows[i].twentyseven, rows[i].twentyeight, rows[i].twentynine, rows[i].thirty, rows[i].thirtyone, rows[i].presentdays, rows[i].eddays, rows[i].othours, rows[i].status, rows[i].jobcode, rows[i].jobmasterid);
						members.push(obj);

						if ((i + 1 == rowsReturned) || (rows[i].projectid != rows[i + 1].projectid) || (rows[i].monthandyear != rows[i + 1].monthandyear)) {
							var attendance = new clientModel.attendance(rows[i].clientid, rows[i].projectid, rows[i].monthandyear, rows[i].changedby, members, rows[i].attendancetype,rows[i].clientname, rows[i].designation, rows[i].projectname, rows[i].projectno, rows[i].addressline1, rows[i].addressline2, rows[i].addressline3, rows[i].pincode, rows[i].datedon);
							result.push(attendance)

							members = [];
						}
					}
				}
				resolve(result);
			}).catch(function (err) {
				errorDAL.errorlog('Error',"clientDAL::getattendanceprint",err.stack,JSON.stringify(projectid, monthandyear),"getattendanceprint");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::getattendanceprint",err.stack,JSON.stringify(projectid, monthandyear),"getattendanceprint");
			reject(err);
		});
	});
}

module.exports.updateattendnaceedreserve = function (attendanceids, lreserve) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			con.query('UPDATE attendance SET lreserve = ? WHERE attendanceid IN (?)', [lreserve, attendanceids]).then(function (rows, fields) {
				resolve({
					"attendanceid": attendanceids
				})
			}).catch(function (err) {
				errorDAL.errorlog('Error',"clientDAL::updateattendnaceedreserve",err.stack,JSON.stringify(attendanceids, lreserve),"updateattendnaceedreserve");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::updateattendnaceedreserve",err.stack,JSON.stringify(attendanceids, lreserve),"updateattendnaceedreserve");
			reject(err);
		});
	});
}

/*
module.exports.importattendancefrombiometric = function (clientid,projectid,memberid,jobpostingdetailid,monthandyear,attendance,result) {
var keydb;
    console.log("valueattendance===", clientid+"   "+ projectid+" "+memberid+"   "+jobpostingdetailid+" "+ monthandyear+" "+JSON.stringify(attendance));
    return new app.promise(function (resolve, reject) {

      mySqlConnection.connection().then(function (con) {
          for(key in attendance){
            if(key==1){console.log("---") }
          }
            query = con.format("INSERT INTO `attendance`(`clientid`, `projectid`, `memberid`, `jobpostingdetailid`, `monthandyear`, `one`, `two`, `three`, `four`, `five`, `six`, `seven`, `eight`, `nine`, `ten`, `eleven`, `twelve`, `thirteen`, `fourteen`, `fifteen`, `sixteen`, `seventeen`, `eighteen`, `nineteen`, `twenty`, `twentyone`, `twentytwo`, `twentythree`, `twentyfour`, `twentyfive`, `twentysix`, `twentyseven`, `twentyeight`, `twentynine`, `thirty`, `thirtyone`, `presentdays`, `eddays`, `status`, `changedby`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);", [clientid, projectid, result.memberid, result.jobpostingdetailid, monthandyear, attendance[1], attendance[2], attendance[3], attendance[4], attendance[5], attendance[6], attendance[7], attendance[8], attendance[9], attendance[10], attendance[11], attendance[12], attendance[13], attendance[14], attendance[15], attendance[16], attendance[17], attendance[18], attendance[19], attendance[20], attendance[21], attendance[22], attendance[23], attendance[24], attendance[25], attendance[26], attendance[27], attendance[28], attendance[29], attendance[30], attendance[31], attendance.presentdays, attendance.eddays, (attendance.status != undefined? attendance.status:0), attendance.changedby])
          console.log(query);
            if (result.attendanceid == undefined) {
                query = con.format("INSERT INTO `attendance`(`clientid`, `projectid`, `memberid`, `jobpostingdetailid`, `monthandyear`, `one`, `two`, `three`, `four`, `five`, `six`, `seven`, `eight`, `nine`, `ten`, `eleven`, `twelve`, `thirteen`, `fourteen`, `fifteen`, `sixteen`, `seventeen`, `eighteen`, `nineteen`, `twenty`, `twentyone`, `twentytwo`, `twentythree`, `twentyfour`, `twentyfive`, `twentysix`, `twentyseven`, `twentyeight`, `twentynine`, `thirty`, `thirtyone`, `presentdays`, `eddays`, `status`, `changedby`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);", [result.clientid, result.projectid, result.memberid, result.jobpostingdetailid, attendance.MONTHANDYEAR, attendance.ONE, attendance.TWO, attendance.THREE, attendance.FOUR, attendance.FIVE, attendance.SIX, attendance.SEVEN, attendance.EIGHT, attendance.NINE, attendance.TEN, attendance.ELEVEN, attendance.TWELVE, attendance.THIRTEEN, attendance.FOURTEEN, attendance.FIFTEEN, attendance.SIXTEEN, attendance.SEVENTEEN, attendance.EIGHTEEN, attendance.NINETEEN, attendance.TWENTY, attendance.TWENTYONE, attendance.TWENTYTWO, attendance.TWENTYTHREE, attendance.TWENTYFOUR, attendance.TWENTYFIVE, attendance.TWENTYSIX, attendance.TWENTYSEVEN, attendance.TWENTYEIGHT, attendance.TWENTYNINE, attendance.THIRTY, attendance.THIRTYONE, attendance.PRESENTDAYS, attendance.OTDAYS, (attendance.status != undefined? attendance.status:0), attendance.changedby])
            }
            else {
                query = con.format("UPDATE `attendance` SET `one`=?,`two`=?,`three`=?,`four`=?,`five`=?,`six`=?,`seven`=?,`eight`=?,`nine`=?,`ten`=?,`eleven`=?,`twelve`=?,`thirteen`=?,`fourteen`=?,`fifteen`=?,`sixteen`=?,`seventeen`=?,`eighteen`=?,`nineteen`=?,`twenty`=?,`twentyone`=?,`twentytwo`=?,`twentythree`=?,`twentyfour`=?,`twentyfive`=?,`twentysix`=?,`twentyseven`=?,`twentyeight`=?,`twentynine`=?,`thirty`=?,`thirtyone`=? ,`presentdays`=?,`othours`=? WHERE `attendanceid` = ?;", [attendance.ONE, attendance.TWO, attendance.THREE, attendance.FOUR, attendance.FIVE, attendance.SIX, attendance.SEVEN, attendance.EIGHT, attendance.NINE, attendance.TEN, attendance.ELEVEN, attendance.TWELVE, attendance.THIRTEEN, attendance.FOURTEEN, attendance.FIFTEEN, attendance.SIXTEEN, attendance.SEVENTEEN, attendance.EIGHTEEN, attendance.NINETEEN, attendance.TWENTY, attendance.TWENTYONE, attendance.TWENTYTWO, attendance.TWENTYTHREE, attendance.TWENTYFOUR, attendance.TWENTYFIVE, attendance.TWENTYSIX, attendance.TWENTYSEVEN, attendance.TWENTYEIGHT, attendance.TWENTYNINE, attendance.THIRTY, attendance.THIRTYONE, attendance.PRESENTDAYS, attendance.OTDAYS, result.attendanceid])
            }
            con.query(query).then(function (rows, fields) {
                resolve("Success");
            }).catch(function (err) {
                reject(err);
            });
        }).catch(function (err) {
            reject(err);
        });
    });
}
*/  
module.exports.importattendancefrombiometric = function (result, attendance, updateval) {
	//console.log("result.attendanceid=========",result.attendanceid);
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = '';
			if (result.attendanceid == undefined || result.attendanceid == 0) {
				query = con.format("INSERT INTO `attendance`(`clientid`, `projectid`, `memberid`, `jobmasterid`, `monthandyear`, `one`, `two`, `three`, `four`, `five`, `six`, `seven`, `eight`, `nine`, `ten`, `eleven`, `twelve`, `thirteen`, `fourteen`, `fifteen`, `sixteen`, `seventeen`, `eighteen`, `nineteen`, `twenty`, `twentyone`, `twentytwo`, `twentythree`, `twentyfour`, `twentyfive`, `twentysix`, `twentyseven`, `twentyeight`, `twentynine`, `thirty`, `thirtyone`, `presentdays`, `eddays`, `status`, `changedby`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);", [result.attend.clientid, result.attend.projectid, result.memberid, result.jobmasterid, result.attend.monthandyear, attendance[1], attendance[2], attendance[3], attendance[4], attendance[5], attendance[6], attendance[7], attendance[8], attendance[9], attendance[10], attendance[11], attendance[12], attendance[13], attendance[14], attendance[15], attendance[16], attendance[17], attendance[18], attendance[19], attendance[20], attendance[21], attendance[22], attendance[23], attendance[24], attendance[25], attendance[26], attendance[27], attendance[28], attendance[29], attendance[30], attendance[31], attendance.presentdays, attendance.eddays, (attendance.status != undefined ? attendance.status : 0), attendance.changedby])
			}
			else if (updateval == 1)  {
				query = con.format("UPDATE `attendance` SET `one`=?,`two`=?,`three`=?,`four`=?,`five`=?,`six`=?,`seven`=?,`eight`=?,`nine`=?,`ten`=?,`eleven`=?,`twelve`=?,`thirteen`=?,`fourteen`=?,`fifteen`=?,`sixteen`=?,`seventeen`=?,`eighteen`=?,`nineteen`=?,`twenty`=?,`twentyone`=?,`twentytwo`=?,`twentythree`=?,`twentyfour`=?,`twentyfive`=?,`twentysix`=?,`twentyseven`=?,`twentyeight`=?,`twentynine`=?,`thirty`=?,`thirtyone`=? ,`presentdays`=?,`othours`=? WHERE `attendanceid` = ?;", [attendance[1], attendance[2], attendance[3], attendance[4], attendance[5], attendance[6], attendance[7], attendance[8], attendance[9], attendance[10], attendance[11], attendance[12], attendance[13], attendance[14], attendance[15], attendance[16], attendance[17], attendance[18], attendance[19], attendance[20], attendance[21], attendance[22], attendance[23], attendance[24], attendance[25], attendance[26], attendance[27], attendance[28], attendance[29], attendance[30], attendance[31], attendance.presentdays, attendance.eddays, result.attendanceid]);
			}
			else {
				resolve({
					"code": "400",
					"message": "Attendance already submitted"

				})
			}
			con.query(query).then(function (rows, fields) {
				resolve({
					"code": "200",
					"message": "Attendance submitted successfully" 
				});
			}).catch(function (err) {
				errorDAL.errorlog('Error',"clientDAL::importattendancefrombiometric",err.stack,JSON.stringify(result, attendance),"importattendancefrombiometric");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::importattendancefrombiometric",err.stack,JSON.stringify(result, attendance),"importattendancefrombiometric");
			reject(err);
		});
	});

}

module.exports.updateclient = function (client) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			if (client.clientid > 0) {
				var query = {
					organization: client.organization,
					contactname: client.contactname,
					image: client.image,
					email: client.email,
					mobile: client.mobile,
					phone: client.phone,
					gstno: client.gstno,
					tanno: client.tanno,
					panno: client.panno,
					addressline1: client.addressline1,
					addressline2: client.addressline2,
					addressline3: client.addressline3,
					districtid: client.districtid,
					regionid: client.regionid,
					talukid: client.talukid,
					stateid: client.stateid,
					countryid: client.countryid,
					gstno: client.gstno,
					panno: client.panno,
					tanno: client.tanno,
					departmenttypeid: client.departmenttypeid,
					department: client.department,
					deptid: client.deptid,
					approvalid: client.approvalid,
					gsttanno: client.gsttanno,
					pincode: client.pincode,
					changedby: client.changedby,
					amstatus: 0
				};
				
				var queries = '';
				queries += con.format("UPDATE client SET ? WHERE clientid = ?;UPDATE client_ams SET ? WHERE clientid= ?;",[query, client.clientid, query, client.clientid]);
				console.log('queries',queries);
				con.query(queries).then(function (rows, fields) { 
					console.log('rows',rows);
					console.log('fields',fields);
					resolve({
						"clientid": client.clientid
					})
				}).catch(function (err) {
					errorDAL.errorlog('Error',"clientDAL::updateclient",err.stack,JSON.stringify(client),"updateclient");
					reject(err);
				});
			} else {
				errorDAL.errorlog('Error',"clientDAL::updateclient",err.stack,JSON.stringify(client),"updateclient");
				reject("Unable to update client")
			}
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::updateclient",err.stack,JSON.stringify(client),"updateclient");
			reject(err);
		});
	});
}

module.exports.getimportmemberdetails = function (projectno, texcono, attend) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*	
					SELECT jm.jobmasterid,mh.texcono,mh.memberid FROM memberhistory mh 
					INNER JOIN jobmaster jm ON jm.code = mh.category 
					WHERE mh.projectno = ? AND mh.texcono = ? AND mh.active =1;
            	*/
			});
			con.query(query, [projectno, texcono]).then(function (rows, fields) {
				var rowsReturned = rows.length;
				if (rowsReturned > 0) {
					resolve({
						"memberid": rows[0].memberid,
						"jobmasterid": rows[0].jobmasterid,
						"attend": attend
					})
				} else {
					//reject("Employee not exist");
				}
			}).catch(function (err) {
				errorDAL.errorlog('Error',"clientDAL::getimportmemberdetails",err.stack,JSON.stringify(projectno, serviceno, attend),"getimportmemberdetails");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::getimportmemberdetails",err.stack,JSON.stringify(projectno, serviceno, attend),"getimportmemberdetails");
			reject(err);
		});
	});
}

module.exports.getprojectsnosearchforjobposting = function (projectid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
            SELECT p.projectid, p.projectno, p.clientid,p.name,cl.organization FROM `project` p
            
            LEFT JOIN agreementinfo ai ON
            ai.projectid = p.projectid
			AND ai.active = 1
			
			INNER JOIN client cl ON
            cl.clientid = p.clientid
            AND cl.active = 1
            
            LEFT JOIN agreement ag ON
            ag.agreementid = ai.agreementid
            AND ag.active = 1 
            where p.active =1 AND p.projectid = ?
             */
			});
			con.query(query, [projectid]).then(function (rows, fields) {
				var rowsReturned = rows.length;
				var result = [];
				if (rowsReturned > 0) {
					for (var i = 0; i < rowsReturned; i++) {
						var proj = {
							'name': rows[i].name,
							'projectid': rows[i].projectid,
							'projectno': rows[i].projectno,
							'clientid': rows[i].clientid,
							'organization': rows[i].organization
						};
						result.push(proj);
					}
				}
				resolve(result);
			}).catch(function (err) {
				errorDAL.errorlog('Error',"clientDAL::getprojectsnosearchforjobposting",err.stack,JSON.stringify(projectid),"getprojectsnosearchforjobposting");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::getprojectsnosearchforjobposting",err.stack,JSON.stringify(projectid),"getprojectsnosearchforjobposting");
			reject(err);
		});
	});
}

module.exports.getPostedMembersList = function (clientid) {
	// console.log('clientid..', clientid);
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
					SELECT mh.memberhistoryid,mem.memberid,mh.texcono,mh.category,mem.firstname,mem.serviceno,mh.startdate,mh.projectno,pr.name,mh.enddate FROM `memberhistory` mh 
					INNER JOIN member mem ON mem.memberid = mh.memberid
					INNER JOIN project pr ON pr.projectno = mh.projectno
					WHERE pr.clientid = ? AND mh.approvalstatus = 0 AND (mh.enddate IS NULL OR CAST(mh.enddate AS CHAR(20)) = '0000-00-00 00:00:00');
             	*/
			});
			// AND mh.startdate > now()-INTERVAL 30 DAY
			con.query(query, [clientid]).then(function (rows, fields) {
				var rowsReturned = rows.length;
				var result = [];
				if (rowsReturned > 0) {
					for (var i = 0; i < rowsReturned; i++) {
						var proj = {
							'memberhistoryid': rows[i].memberhistoryid,
							'memberid': rows[i].memberid,
							'texcono': rows[i].texcono,
							'category': rows[i].category,
							'firstname': rows[i].firstname,
							'serviceno': rows[i].serviceno,
							'startdate': rows[i].startdate,
							'projectno': rows[i].projectno,
							'projectname': rows[i].name,
							'enddate': rows[i].enddate
						};
						result.push(proj);
					}
				}
				resolve(result);
			}).catch(function (err) {
				errorDAL.errorlog('Error',"clientDAL::getPostedMembersList",err.stack,JSON.stringify(clientid),"getPostedMembersList");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::getPostedMembersList",err.stack,JSON.stringify(clientid),"getPostedMembersList");
			reject(err);
		});
	});
}

module.exports.getApprovedPostedMembersList = function (clientid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
					SELECT mh.memberhistoryid,mem.memberid,mh.texcono,mh.category,mem.firstname,mem.serviceno,mh.startdate,mh.projectno,pr.name,mh.enddate FROM `memberhistory` mh 
					INNER JOIN member mem ON mem.memberid = mh.memberid
					INNER JOIN project pr ON pr.projectno = mh.projectno
					WHERE pr.clientid = ? AND mh.approvalstatus = 1 AND mh.working_status = 1 AND (mh.enddate IS NULL OR CAST(mh.enddate AS CHAR(20)) = '0000-00-00 00:00:00')
             	*/ 
				 
			});
			// AND mh.startdate > now()-INTERVAL 30 DAY
			con.query(query, [clientid]).then(function (rows, fields) {
				var rowsReturned = rows.length;
				var result = [];
				if (rowsReturned > 0) {
					for (var i = 0; i < rowsReturned; i++) {
						var proj = {
							'memberhistoryid': rows[i].memberhistoryid,
							'memberid': rows[i].memberid,
							'texcono': rows[i].texcono,
							'category': rows[i].category,
							'firstname': rows[i].firstname,
							'serviceno': rows[i].serviceno,
							'startdate': rows[i].startdate,
							'projectno': rows[i].projectno,
							'projectname': rows[i].name,
							'enddate': rows[i].enddate
						};
						result.push(proj);
					}
				}
				resolve(result);
			}).catch(function (err) {
				errorDAL.errorlog('Error',"clientDAL::getApprovedPostedMembersList",err.stack,JSON.stringify(clientid),"getApprovedPostedMembersList");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::getApprovedPostedMembersList",err.stack,JSON.stringify(clientid),"getApprovedPostedMembersList");
			reject(err);
		});
	});
}

module.exports.getAMPostedMembersList = function (regionid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
					SELECT mh.memberhistoryid,mem.memberid,mh.texcono,mh.category,mem.firstname,mem.serviceno,mh.startdate,mh.projectno,pr.name,mh.enddate,pr.clientid FROM `memberhistory` mh 
					INNER JOIN member mem ON mem.memberid = mh.memberid
					INNER JOIN project pr ON pr.projectno = mh.projectno
					WHERE pr.regionid = ? AND mh.approvalstatus = 0 AND (mh.enddate IS NULL OR CAST(mh.enddate AS CHAR(20)) = '0000-00-00 00:00:00');
             	*/
			});
			con.query(query, [regionid]).then(function (rows, fields) {
				var rowsReturned = rows.length;
				var result = [];
				if (rowsReturned > 0) {
					for (var i = 0; i < rowsReturned; i++) {
						var proj = {
							'memberhistoryid': rows[i].memberhistoryid,
							'memberid': rows[i].memberid,
							'texcono': rows[i].texcono,
							'category': rows[i].category,
							'firstname': rows[i].firstname,
							'serviceno': rows[i].serviceno,
							'startdate': rows[i].startdate,
							'projectno': rows[i].projectno,
							'projectname': rows[i].name,
							'enddate': rows[i].enddate,
							'clientid': rows[i].clientid
						};
						result.push(proj);
					}
				}
				resolve(result);
			}).catch(function (err) {
				errorDAL.errorlog('Error',"clientDAL::getAMPostedMembersList",err.stack,JSON.stringify(regionid),"getAMPostedMembersList");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::getAMPostedMembersList",err.stack,JSON.stringify(regionid),"getAMPostedMembersList");
			reject(err);
		});
	});
}

module.exports.getAMApprovedPostedMembersList = function (regionid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
					SELECT mh.memberhistoryid,mem.memberid,mh.texcono,mh.category,mem.firstname,mem.serviceno,mh.startdate,mh.projectno,pr.name,mh.enddate,pr.clientid FROM `memberhistory` mh 
					INNER JOIN member mem ON mem.memberid = mh.memberid
					INNER JOIN project pr ON pr.projectno = mh.projectno
					WHERE pr.regionid = ? AND mh.approvalstatus = 1 AND mh.working_status = 1 AND (mh.enddate IS NULL OR CAST(mh.enddate AS CHAR(20)) = '0000-00-00 00:00:00');
             	*/
			});
			// AND mh.startdate > now()-INTERVAL 30 DAY
			con.query(query, [regionid]).then(function (rows, fields) {
				var rowsReturned = rows.length;
				var result = [];
				if (rowsReturned > 0) {
					for (var i = 0; i < rowsReturned; i++) {
						var proj = {
							'memberhistoryid': rows[i].memberhistoryid,
							'memberid': rows[i].memberid,
							'texcono': rows[i].texcono,
							'category': rows[i].category,
							'firstname': rows[i].firstname,
							'serviceno': rows[i].serviceno,
							'startdate': rows[i].startdate,
							'projectno': rows[i].projectno,
							'projectname': rows[i].name,
							'enddate': rows[i].enddate,
							'clientid': rows[i].clientid
						};
						result.push(proj);
					}
				}
				resolve(result);
			}).catch(function (err) {
				errorDAL.errorlog('Error',"clientDAL::getAMApprovedPostedMembersList",err.stack,JSON.stringify(regionid),"getAMApprovedPostedMembersList");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::getAMApprovedPostedMembersList",err.stack,JSON.stringify(regionid),"getAMApprovedPostedMembersList");
			reject(err);
		});
	});
}

module.exports.ApprovePostedMembers = function (clientid, memberhistoryid, memberid, status) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var queries = '';
			queries += con.format("UPDATE memberhistory SET approvalstatus = ?, working_status = ?, joining_date = ? WHERE memberhistoryid = ?;",[status, status, new Date(), memberhistoryid]);
			if(status == 2) {
				queries = '';
				queries += con.format("UPDATE memberhistory SET approvalstatus = ?, working_status = ?, closing_date = ? WHERE memberhistoryid = ?;",[status, status, new Date(), memberhistoryid]);
			}
			con.query(queries).then(function (rows, fields) {
				resolve({
					'msg': "Success"
				})
			}).catch(function (err) {
				errorDAL.errorlog('Error',"clientDAL::ApprovePostedMembers",err.stack,JSON.stringify(queries),"ApprovePostedMembers");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::ApprovePostedMembers",err.stack,JSON.stringify(queries),"ApprovePostedMembers");
			reject(err);
		});
	});
}

module.exports.CloseOtherWorkingProjects = function (clientid, memberhistoryid, memberid, status) {
	var Lastday = moment().subtract(1, 'days').format('YYYY-MM-DD');
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			con.query('UPDATE memberhistory SET working_status = ?, closing_date = ? WHERE memberid = ? and memberhistoryid != ?;', [2, Lastday, memberid, memberhistoryid]).then(function (rows, fields) {
				resolve({
					'msg': "Success"
				});
			}).catch(function (err) {
				errorDAL.errorlog('Error',"clientDAL::CloseOtherWorkingProjects",err.stack,JSON.stringify(queries),"CloseOtherWorkingProjects");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::CloseOtherWorkingProjects",err.stack,'MYSQL Error',"CloseOtherWorkingProjects");
			reject(err);
		});
	});
}

module.exports.CheckClient = function (client, clientid) {
	// console.log('rows', projectid);
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			con.query('SELECT *,COUNT(clientid) AS clientcount FROM client_ams WHERE clientid = ? and active = 1', [clientid]).then(function (rows, fields) {
				var clients = new clientModel.clientamslist(rows[0].organization,rows[0].contactname,rows[0].image,rows[0].email,rows[0].mobile,rows[0].phone, rows[0].addressline1,rows[0].addressline2,rows[0].addressline3,rows[0].pincode,rows[0].districtid,rows[0].regionid, rows[0].talukid,rows[0].stateid,rows[0].countryid,rows[0].password,rows[0].gstno,rows[0].gsttanno,rows[0].panno,rows[0].tanno,rows[0].departmenttypeid,rows[0].department,rows[0].deptid,rows[0].approvalid,rows[0].clientcount,rows[0].updatedfields);
				resolve(clients);
			}).catch(function (err) {
				errorDAL.errorlog('Error',"clientDAL::CheckClient",err.stack,JSON.stringify(clientid),"CheckClient");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::CheckClient",err.stack,'MYSQL Error',"CheckClient");
			reject(err);
		});
	});
}

module.exports.addAMSClient = function (client, clientid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			console.log('client', client);
			con.query('INSERT INTO client_ams SET ?', [client]).then(function (rows, fields) {
				resolve({
					"clientid": clientid
				})
			}).catch(function (err) {
				errorDAL.errorlog('Error',"clientDAL::addAMSClient",err.stack,JSON.stringify(clientid),"addAMSClient");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::addAMSClient",err.stack,JSON.stringify(clientid),"addAMSClient");
			reject(err);
		});
	});
} 
module.exports.updateAMSClient = function (client, clientid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			console.log('client',client);
			con.query('UPDATE client_ams SET ? WHERE clientid= ?', [client, clientid]).then(function (rows, fields) {
				resolve({
					"clientid": clientid
				})
			}).catch(function (err) {
				errorDAL.errorlog('Error',"clientDAL::updateAMSClient",err.stack,JSON.stringify(client),"updateAMSClient");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::updateAMSClient",err.stack,JSON.stringify(client),"updateAMSClient");
			reject(err);
		});
	});
} 
module.exports.UpdateClientStatus = function (status, clientid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			console.log('UPDATE client SET amstatus = ? WHERE clientid= ?',status, clientid)
			con.query('UPDATE client SET amstatus = ? WHERE clientid= ?', [status, clientid]).then(function (rows, fields) {
				resolve({
					"clientid": clientid
				})
			}).catch(function (err) {
				errorDAL.errorlog('Error',"clientDAL::UpdateClientStatus",err.stack,JSON.stringify(clientid),"UpdateClientStatus");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::UpdateClientStatus",err.stack,JSON.stringify(clientid),"UpdateClientStatus");
			reject(err);
		});
	});
}
module.exports.UpdateClientAMStatus = function (status, clientid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			console.log('UPDATE client SET amstatus = ? WHERE clientid= ?',status, clientid);
			con.query('UPDATE client SET amstatus= 1 WHERE clientid= ?', [clientid]).then(function (rows, fields) {
				resolve({
					"clientid": clientid
				})
			}).catch(function (err) {
				errorDAL.errorlog('Error',"clientDAL::UpdateClientAMStatus",err.stack,JSON.stringify(clientid),"UpdateClientAMStatus");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::UpdateClientAMStatus",err.stack,JSON.stringify(clientid),"UpdateClientAMStatus");
			reject(err);
		});
	});
}

module.exports.getAMSClient = function (clientid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
                    SELECT
						c.clientid,
						c.organization,
						c.contactname,
						c.image,
						c.email,
						c.mobile,
						c.password,
						c.addressline1,
						c.addressline2,
						c.addressline3,
						c.phone,
						c.gstno,
						c.gsttanno,
						c.tanno,
						c.panno,
						c.department,
						c.departmenttypeid,
						lv6.description AS 'departmenttype',
						c.pincode,
						c.districtid,
						lv.description AS 'district',
						c.talukid,
						(SELECT description FROM lookupvalue lv1 WHERE lv1.lkvalid = c.talukid GROUP BY lv1.lkvalid) AS 'taluk',
						c.stateid,
						lv2.description AS 'state',
						c.countryid,
						lv3.description AS 'country',
						c.countryid,
						lv4.description AS 'dept',
						c.deptid,
						lv5.description AS 'approval',
						c.approvalid,
						c.active,
						pr.projectno,
						pr.name AS 'projectname',
						pr.regionid,
						c.updatedfields   
						
					FROM client_ams c

					INNER JOIN lookupvalue lv ON
						lv.lkvalid = c.districtid
					AND lv.active = 1

					INNER JOIN lookupvalue lv2 ON
						lv2.lkvalid = c.stateid
					AND lv2.active = 1

					INNER JOIN lookupvalue lv3 ON
						lv3.lkvalid = c.countryid
					AND lv3.active = 1

					INNER JOIN lookupvalue lv4 ON
						lv4.lkvalid = c.deptid
					AND lv4.active = 1

					INNER JOIN lookupvalue lv5 ON
						lv5.lkvalid = c.approvalid
					AND lv5.active = 1 AND lv5.code != 'REJECT' AND lv5.code != 'PEND'

					INNER JOIN lookupvalue lv6 ON
						lv6.lkvalid = c.departmenttypeid
					AND lv6.active = 1
					
					LEFT JOIN project pr ON
						pr.clientid = c.clientid
					AND pr.active = 1

					WHERE c.active =1 AND c.clientid = ? 
					GROUP BY c.clientid
					ORDER BY  c.organization, c.clientid
            */
			});
			con.query(query, [clientid]).then(function (rows, fields) {
				var rowsReturned = rows.length;
				var result = new clientModel.getclientAMSDetails(rows[0].clientid, rows[0].organization, rows[0].contactname, rows[0].image, rows[0].email,
					rows[0].mobile, rows[0].phone, rows[0].gstno, rows[0].tanno, rows[0].panno, rows[0].password, rows[0].addressline1, rows[0].addressline2,
					rows[0].addressline3, rows[0].pincode, rows[0].districtid, rows[0].district, rows[0].talukid, rows[0].taluk, rows[0].stateid, rows[0].state,
					rows[0].countryid, rows[0].country, rows[0].departmenttypeid, rows[0].departmenttype, rows[0].department, rows[0].deptid,
					rows[0].dept, rows[0].approvalid, rows[0].approval, rows[0].active, rows[0].projectno, rows[0].projectname, rows[0].regionid,rows[0].gsttanno, rows[0].updatedfields);

				resolve(result);
			}).catch(function (err) {
				errorDAL.errorlog('Error',"clientDAL::getAMSClient",err.stack,JSON.stringify(clientid),"getAMSClient");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::getAMSClient",err.stack,JSON.stringify(clientid),"getAMSClient");
			reject(err);
		});
	});
}

module.exports.getclientDropDownList = function () {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
					SELECT
						c.clientid,
						c.organization,
						c.contactname
					FROM client c
					WHERE c.active =1
					ORDER BY  c.organization ASC;
				*/
			});
			con.query(query).then(function (rows, fields) {
				var rowsReturned = rows.length;
				var result = [];
				if (rowsReturned > 0) {
					for (var i = 0; i < rowsReturned; i++) {
						var client = new clientModel.getclientDropDown(rows[i].clientid, rows[i].organization, rows[i].contactname);
						result.push(client);
					}
				}
				resolve(result);
			}).catch(function (err) {
				errorDAL.errorlog('Error',"clientDAL::getclientDropDownList",err.stack,'',"getclientDropDownList");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::getclientDropDownList",err.stack,'',"getclientDropDownList");
			reject(err);
		});
	});
}

module.exports.getprojectDropDownList = function () {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
					SELECT * FROM project pr
					WHERE pr.active =1
					ORDER BY pr.projectno ASC;
				*/
			});
			con.query(query).then(function (rows, fields) {
				var rowsReturned = rows.length;
				var result = [];
				resolve(rows);
			}).catch(function (err) {
				errorDAL.errorlog('Error',"clientDAL::getprojectDropDownList",err.stack,'',"getprojectDropDownList");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::getprojectDropDownList",err.stack,'',"getprojectDropDownList");
			reject(err);
		});
	});
}

module.exports.getAMSprojectReject = function (projectid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
					UPDATE project SET amstatus = 0 WHERE projectid = ?;
					UPDATE project_ams SET amstatus = 2 WHERE projectid = ?;
            	*/
			});
			con.query(query, [projectid, projectid]).then(function (rows, fields) {
				resolve(rows);
			}).catch(function (err) {
				errorDAL.errorlog('Error',"clientDAL::getAMSprojectReject",err.stack,projectid,"getAMSprojectReject");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::getAMSprojectReject",err.stack,projectid,"getAMSprojectReject");
			reject(err);
		});
	});
}

module.exports.getClientAgreementDetails = function (projectid, clientid,agid,agtype) {
	
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {

			var queries = '';
			queries += con.format("SELECT pr.projectid,ag.agreementid,pr.projectno,pr.name,pr.addressline1 AS projectaddress1,pr.addressline2 AS projectaddress2,pr.addressline3 AS projectaddress3,cl.organization,cl.contactname,cl.email,cl.phone,cl.mobile, cl.addressline1 AS clientaddress1,cl.addressline2 AS clientaddress2,cl.addressline3 AS clientaddress3,cl.gstno,DATE_FORMAT(ag.fromdate,'%d-%M-%Y') AS fromdate,DATE_FORMAT(ag.todate,'%d-%M-%Y') AS todate,ag.tax,ag.servicecharge,ad.jobmasterid,wg.particularamount,jm.code AS category,ad.numberofvacancies,	DATE_FORMAT((DATE_ADD(ag.todate,INTERVAL 1 DAY)),'%d-%M-%Y') AS next_renewal_date,lv.description AS wageyear,lv1.description AS wagetype,lv2.description AS wagearea,wc.category_description AS ratecategory,wc.category_code as categorycode,ag.allowancetype1,ag.allowancevalue1,ag.allowancetype2,ag.allowancevalue2,ag.allowancetype3,ag.allowancevalue3 FROM agreement ag INNER JOIN agreementinfo ai ON ai.agreementid = ag.agreementid INNER JOIN agreementdetail ad ON ad.agreementinfoid = ai.agreementinfoid INNER JOIN jobmaster jm ON jm.jobmasterid = ad.jobmasterid INNER JOIN wages wg ON (wg.wageyearid = ag.wageyearid AND ag.wageareaid = wg.wageareaid) AND wg.wagetypeid = ag.wagetypeid AND ag.wagecategoryid = wg.wagecategoryid  AND wg.jobmasterid = ad.jobmasterid INNER JOIN lookupvalue lv4 ON lv4.lkvalid = wg.particularid AND lv4.lkdmncode = 'WGPART' AND lv4.code = 'RATEHD' INNER JOIN lookupvalue lv ON lv.lkvalid = wg.wageyearid INNER JOIN lookupvalue lv1 ON lv1.lkvalid = wg.wagetypeid	LEFT JOIN lookupvalue lv2 ON lv2.lkvalid = wg.wageareaid	INNER JOIN wage_category_master wc ON wc.category_id = wg.wagecategoryid	INNER JOIN project pr ON pr.projectid = ai.projectid	INNER JOIN client cl ON cl.clientid = ag.clientid");
			if(agtype == 338) {
				queries += con.format("  WHERE ag.agreementid =?  GROUP BY ad.agreementdetailid;",[agid]);
			}
			
			else
			{
				queries += con.format("  WHERE ag.clientid = ? AND pr.projectid = ? GROUP BY ad.agreementdetailid;",[clientid,projectid]);

			}
			
			//console.log(queries);
			// var query = multiline.stripIndent(function () {
			// 	/*
					
            // 	*/
			// });
			con.query(queries).then(function (rows, fields) {
				resolve(rows);
			}).catch(function (err) {
				errorDAL.errorlog('Error',"clientDAL::getClientAgreementDetails",err.stack,projectid,"getAMSprojectReject");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::getClientAgreementDetails",err.stack,projectid,"getClientAgreementDetails");
			reject(err);
		});
	});
}

module.exports.checkCombinedagreement = function ( clientid,projectid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
					SELECT af.agreementid as agid,a.agreementtypeid as agtype FROM agreement a inner JOIN agreementinfo af ON a.agreementid=af.agreementid WHERE a.clientid=? AND af.projectid=?   AND a.active=1;
            	*/
			});
			con.query(query, [clientid,projectid]).then(function (rows, fields) {

				//console.log(prids);
			
					resolve({
						"agid": rows[0].agid,
						"agtype": rows[0].agtype								
				});
				
				//resolve(rows);

			}).catch(function (err) {
				// errorDAL.errorlog('Error',"clientDAL::getClientAgreementDetails",err.stack,rows[0]['agtype'],"getAMSprojectReject");
				reject(err);
			});
		}).catch(function (err) {
			// errorDAL.errorlog('Error',"clientDAL::getClientAgreementDetails",err.stack,rows[0]['agtype'],"getClientAgreementDetails");
			reject(err);
		});
	});
}

module.exports.getattendancecount = function (jobmasterid, clientid, projectid, monthandyear, category, numberofvacancies) {
	//console.log('rows',monthandyear);
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
					SELECT
						COUNT(*) as totalcount
					FROM attendance att
					WHERE att.projectid = ? AND att.clientid = ? AND att.monthandyear = ? AND att.jobmasterid = ?
            	*/
			});
			//console.log('projectid, clientid, monthandyear, jobmasterid',projectid, clientid, monthandyear, jobmasterid)
			con.query(query, [projectid, clientid, monthandyear, jobmasterid]).then(function (rows, fields) {

				resolve({
					"category": category,
					"authvacancy": numberofvacancies,
					"postedvqacacny": rows[0].totalcount
				});
			}).catch(function (err) {
				errorDAL.errorlog('Error',"clientDAL::getattendancecount",err.stack,JSON.stringify(jobmasterid, clientid, projectid, monthandyear, category, numberofvacancies),"getattendancecount");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::getattendancecount",err.stack,JSON.stringify(jobmasterid, clientid, projectid, monthandyear, category, numberofvacancies),"getattendancecount");
			reject(err);
		});
	});
}

module.exports.addExpenseAmounts = function (expense) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = '';
			var rowsreturned = expense.length;
			for (var i = 0; i < rowsreturned; i++) {

				// $scope.MembersExpenseAmount.push({'attendanceid':object.attendanceid,'memberid':object.memberid,'allowance_type':keys,'allowance_amount':values,'projectid':object.projectid,'monthandyear':object.monthandyear});

				query += con.format("call addAdditionalOtherExpense (?,?,?,?,?,?,?);", [expense[i].attendanceid, expense[i].memberid, expense[i].expense_type, expense[i].amount, 'test',expense[i].projectid,expense[i].monthandyear]);
			}
			con.query(query).then(function (rows, fields) {
				resolve(rows);
			}).catch(function (err) {
				errorDAL.errorlog('Error',"clientDAL::getattendancecount",err.stack,JSON.stringify(query),"getattendancecount");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::getattendancecount",err.stack,JSON.stringify(expense),"getattendancecount");
			reject(err);
		});
	});
}

//category

module.exports.addcategory = function (category) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = {
				maincategoryid: Number(category.maincategoryid),
				categoryname: category.categoryname,
				changedby: category.changedby

			};
			// console.log(query)
			con.query('call addcategory (?,?,?)', [Number(category.maincategoryid), category.categoryname, category.changedby]).then(function (result) {
				resolve({
					"message": "Success",
					"msg": "Category Created Successfully",
					"status": 200
				})
			}).catch(function (err) {
				errorDAL.errorlog('Error',"clientDAL::addcategory",err.stack,JSON.stringify(category),"addcategory");
				reject("Error while create category");
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::addcategory",err.stack,JSON.stringify(category),"addcategory");
			reject(err);
		});
	});
}


module.exports.addsubcategory = function (subcategory) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = {
				categoryid: Number(subcategory.categoryid),
				subcategoryname: subcategory.subcategoryname,
				changedby: subcategory.changedby

			};
			con.query('call addsubcategory (?,?,?)', [Number(subcategory.categoryid), subcategory.subcategoryname, subcategory.changedby]).then(function (result) {
				resolve({
					"message": "Success",
					"msg": "Sub Category Created Successfully",
					"status": 200
				})
			}).catch(function (err) {
				errorDAL.errorlog('Error',"clientDAL::addsubcategory",err.stack,JSON.stringify(subcategory),"addsubcategory");
				reject("Error while create subcategory");
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::addsubcategory",err.stack,JSON.stringify(subcategory),"addsubcategory");
			reject(err);
		});
	});
}


module.exports.getcate = function () {

	return new app.promise(function (resolve, reject) {
		var query = multiline.stripIndent(function () {
			/*
			    SELECT categoryid,maincategoryid,categoryname FROM category where active=1;
			    
			*/
		});
		//console.log("query", query);
		mySqlConnection.connection().then(function (con) {
			con.query(query).then(function (rows, fields) {
				resolve(rows)
			}).catch(function (err) {
				errorDAL.errorlog('Error',"clientDAL::getcate",err.stack,'',"getcate");
				reject("Error while get category");
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::getcate",err.stack,'',"getcate");
			reject(err);
		});
	});
}


module.exports.getsubcate = function (categoryid) {
	return new app.promise(function (resolve, reject) {
		var query = multiline.stripIndent(function () {
			/*
			    SELECT subcategoryid,categoryid,subcategoryname FROM subcategory where active=1 and categoryid=?
			    
			*/
		});
		//console.log("query", query);
		mySqlConnection.connection().then(function (con) {
			con.query(query, [Number(categoryid)]).then(function (rows, fields) {
				resolve(rows)
			}).catch(function (err) {
				errorDAL.errorlog('Error',"clientDAL::getsubcate",err.stack,categoryid,"getsubcate");
				reject("Error while get sub category");
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::getsubcate",err.stack,categoryid,"getsubcate");
			reject(err);
		});
	});
}

module.exports.getAMSClientReject = function (clientid) {
	console.log('clientid',clientid);
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
					UPDATE client SET amstatus = 0 WHERE clientid = ?;
					UPDATE client_ams SET amstatus = 2 WHERE clientid = ?;
            	*/
			});
			// console.log('query', query, projectid);
			con.query(query, [clientid, clientid]).then(function (rows, fields) {
				resolve(rows);
			}).catch(function (err) {
				errorDAL.errorlog('Error',"clientDAL::getAMSClientReject",err.stack,clientid,"getAMSClientReject");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::getAMSClientReject",err.stack,clientid,"getAMSClientReject");
			reject(err);
		});
	});
}

module.exports.getAttendanceAuthorizeStatus = function (fromdate, todate, regionid) {
	var todates = moment(todate, "YYYY-MM-DD").add(1, 'days');
	var todatess = moment(todates).format('YYYY-MM-DD');
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
					SELECT prr.projectid,prr.clientid,cll.organization AS clientname,prr.projectno,prr.name AS projectname,att.monthandyear,lv.description AS currentstatus,att.jobmasterid,jm.code AS category,att.status,att.edstatus,COUNT(att.attendanceid) AS memberscount,
					SUM(att.presentdays) AS totalduties,SUM(att.eddays) AS eddays,att.attendanceid,IFNULL(ss.bill_type, 0) AS bill_type,ss.payslipno,inv.invoiceno,inv.arrearstatus,ss.cashier_rejected AS sal_cashier_rejected,ss.cao_rejected AS sal_cao_rejected,
					att.cashier_rejected AS att_cashier_rejected,att.cao_rejected AS att_cao_rejected,inv.cashier_rejected AS inv_cashier_rejected,inv.cao_rejected AS inv_cao_rejected FROM attendance att
					INNER JOIN project prr ON prr.projectid = att.projectid AND att.clientid = prr.clientid
					LEFT JOIN salaryslip ss ON ss.attendanceid = att.attendanceid AND ss.bill_type = 0 AND (att.cashier_rejected = ss.cashier_rejected AND att.cao_rejected = ss.cao_rejected)
					Left join invoicedetail ind on ind.projectid=ss.projectid and ind.clientid=ss.clientid
					LEFT JOIN invoice inv ON inv.invoiceid=ind.invoiceid  AND inv.monthandyear = ss.monthandyear AND inv.`type` = 0 AND (att.cashier_rejected = inv.cashier_rejected AND att.cao_rejected = inv.cao_rejected)
					INNER JOIN client cll ON cll.clientid = att.clientid
					INNER JOIN jobmaster jm ON jm.jobmasterid = att.jobmasterid
					INNER JOIN lookupvalue lv ON lv.code = att.`status` AND lv.lkdmncode = 'STATUS'
					WHERE case ? when 0 then 1 = 1 else prr.regionid = ? END
					AND att.attendancereviewed BETWEEN (?) AND (?) 
					GROUP BY att.projectid,att.`status`,ss.payslipno,att.monthandyear,att.jobmasterid;
            	*/
			}); 
			con.query(query, [regionid, regionid, fromdate, todatess]).then(function (rows, fields) {
				var result = [];
				var duties = [];
				var rowsReturned = rows.length;
				for (var i = 0; i < rowsReturned; i++) {
					duties.push({
						'category': rows[i].category,
						'memberscount': rows[i].memberscount,
						'totalduties': rows[i].totalduties,
						'eddays': rows[i].eddays
					});
					if ((i + 1 == rowsReturned) || (rows[i].projectid != rows[i + 1].projectid || rows[i].monthandyear != rows[i + 1].monthandyear || rows[i].status != rows[i + 1].status || rows[i].payslipno != rows[i + 1].payslipno)) {
						var res = i;
						var jobss = new clientModel.getAuthorizeList(rows[res].projectid, rows[res].clientid, rows[res].clientname, rows[res].projectno, rows[res].projectname, rows[res].monthandyear, rows[res].currentstatus, rows[res].jobmasterid, duties, rows[res].status, rows[res].invoiceno,rows[res].bill_type, rows[res].arrearstatus, rows[res].payslipno, rows[res].edstatus,rows[res].sal_cashier_rejected,rows[res].sal_cao_rejected,rows[res].att_cashier_rejected,rows[res].att_cao_rejected,rows[res].inv_cashier_rejected,rows[res].inv_cao_rejected); 
						duties = [];
						result.push(jobss);
					}
				}
				resolve(result);
			}).catch(function (err) {
				errorDAL.errorlog('Error',"clientDAL::getAttendanceAuthorizeStatus",err.stack,clientid,"getAttendanceAuthorizeStatus");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::getAttendanceAuthorizeStatus",err.stack,clientid,"getAttendanceAuthorizeStatus");
			reject(err);
		});
	});
}

module.exports.getattendancependinglist = function (monthandyear,regionid) {
	// var LastMonth = moment().subtract('months').startOf('month').format('MMM YYYY');
	// console.log('LastMonth', LastMonth);
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/* 
				    SELECT cl.clientid,cl.organization,pr.projectno,pr.name,pr.projectid,cl.contactname,cl.email FROM client cl LEFT JOIN project pr ON pr.clientid = cl.clientid GROUP BY pr.projectno;

				    SELECT att.projectid FROM attendance att 
					INNER JOIN project pr ON pr.projectid = att.projectid
					WHERE att.monthandyear = ? AND case 0 when 0 then 1 = 1 else pr.regionid = ? END
					GROUP BY att.monthandyear;
				*/
			});
			con.query(query, [monthandyear,regionid,regionid]).then(function (rows, fields) {
				var attendance = [];
				for (var j = 0; j < rows[1].length; j++) {
					attendance.push(rows[1][j].projectid);
				}
				resolve({
					"projects": rows[0],
					"attendance": attendance
				});
			}).catch(function (err) {
				errorDAL.errorlog('Error',"clientDAL::getattendancependinglist",err.stack,monthandyear,"getattendancependinglist");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::getattendancependinglist",err.stack,monthandyear,"getattendancependinglist");
			reject(err);
		});
	});
}

module.exports.getsalarycreatedstatus = function (fromdate, todate, regionid) {
	var todates = moment(todate, "YYYY-MM-DD").add(1, 'days');
	var todatess = moment(todates).format('YYYY-MM-DD');
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
					SELECT prr.projectid,prr.clientid,cll.organization AS clientname,prr.projectno,prr.name AS projectname,att.monthandyear,lv.description AS currentstatus,att.jobmasterid,jm.code AS category,att.status,att.edstatus,COUNT(att.attendanceid) AS memberscount,
					SUM(att.presentdays) AS totalduties,SUM(att.eddays) AS eddays,att.attendanceid,IFNULL(ss.bill_type, 0) AS bill_type,ss.payslipno,inv.invoiceno,inv.arrearstatus,ss.cashier_rejected AS sal_cashier_rejected,ss.cao_rejected AS sal_cao_rejected,
					att.cashier_rejected AS att_cashier_rejected,att.cao_rejected AS att_cao_rejected,inv.cashier_rejected AS inv_cashier_rejected,inv.cao_rejected AS inv_cao_rejected FROM attendance att
					INNER JOIN project prr ON prr.projectid = att.projectid AND att.clientid = prr.clientid
					LEFT JOIN salaryslip ss ON ss.attendanceid = att.attendanceid AND ss.bill_type = 0 AND (att.cashier_rejected = ss.cashier_rejected AND att.cao_rejected = ss.cao_rejected)
					LEFT JOIN invoice inv ON (inv.clientid = ss.clientid OR ss.projectid = inv.projectid) AND inv.monthandyear = ss.monthandyear AND inv.`type` = 0 AND (att.cashier_rejected = inv.cashier_rejected AND att.cao_rejected = inv.cao_rejected)
					INNER JOIN client cll ON cll.clientid = att.clientid
					INNER JOIN jobmaster jm ON jm.jobmasterid = att.jobmasterid
					INNER JOIN lookupvalue lv ON lv.code = att.`status` AND lv.lkdmncode = 'STATUS'
					WHERE case ? when 0 then 1 = 1 else prr.regionid = ? END AND att.`status` IN (2,3,4,6)
					AND att.attendancereviewed BETWEEN (?) AND (?) 
					GROUP BY att.projectid,att.`status`,ss.payslipno,att.monthandyear,att.jobmasterid;
            	*/
			});
			con.query(query, [regionid, regionid, fromdate, todatess]).then(function (rows, fields) {
				var result = [];
				var duties = [];
				var rowsReturned = rows.length;
				for (var i = 0; i < rowsReturned; i++) {
					duties.push({
						'category': rows[i].category,
						'memberscount': rows[i].memberscount,
						'totalduties': rows[i].totalduties,
						'eddays': rows[i].eddays
					});
					if ((i + 1 == rowsReturned) || (rows[i].projectid != rows[i + 1].projectid || rows[i].monthandyear != rows[i + 1].monthandyear || rows[i].status != rows[i + 1].status || rows[i].payslipno != rows[i + 1].payslipno)) {
						var res = i;
						var jobss = new clientModel.getAuthorizeList(rows[res].projectid, rows[res].clientid, rows[res].clientname, rows[res].projectno, rows[res].projectname, rows[res].monthandyear, rows[res].currentstatus, rows[res].jobmasterid, duties, rows[res].status, rows[res].invoiceno,rows[res].bill_type, rows[res].arrearstatus, rows[res].payslipno, rows[res].edstatus,rows[res].sal_cashier_rejected,rows[res].sal_cao_rejected,rows[res].att_cashier_rejected,rows[res].att_cao_rejected,rows[res].inv_cashier_rejected,rows[res].inv_cao_rejected); 
						duties = [];
						result.push(jobss);
					}
				}
				resolve(result);
			}).catch(function (err) {
				errorDAL.errorlog('Error',"clientDAL::getsalarycreatedstatus",err.stack,JSON.stringify(query),"getsalarycreatedstatus");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::getsalarycreatedstatus",err.stack,JSON.stringify(fromdate, todate, regionid),"getsalarycreatedstatus");
			reject(err);
		});
	});
}

module.exports.getsalarynotcreatedstatus = function (fromdate, todate, regionid) {
	var todates = moment(todate, "YYYY-MM-DD").add(1, 'days');
	var todatess = moment(todates).format('YYYY-MM-DD');
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
					SELECT prr.projectid,prr.clientid,cll.organization AS clientname,prr.projectno,prr.name AS projectname,att.monthandyear,lv.description AS currentstatus,att.jobmasterid,jm.code AS category,att.status,att.edstatus,COUNT(att.attendanceid) AS memberscount,
					SUM(att.presentdays) AS totalduties,SUM(att.eddays) AS eddays,att.attendanceid,IFNULL(ss.bill_type, 0) AS bill_type,ss.payslipno,inv.invoiceno,inv.arrearstatus,ss.cashier_rejected AS sal_cashier_rejected,ss.cao_rejected AS sal_cao_rejected,
					att.cashier_rejected AS att_cashier_rejected,att.cao_rejected AS att_cao_rejected,inv.cashier_rejected AS inv_cashier_rejected,inv.cao_rejected AS inv_cao_rejected FROM attendance att
					INNER JOIN project prr ON prr.projectid = att.projectid AND att.clientid = prr.clientid
					LEFT JOIN salaryslip ss ON ss.attendanceid = att.attendanceid AND ss.bill_type = 0 AND (att.cashier_rejected = ss.cashier_rejected AND att.cao_rejected = ss.cao_rejected)
					LEFT JOIN invoice inv ON (inv.clientid = ss.clientid OR ss.projectid = inv.projectid) AND inv.monthandyear = ss.monthandyear AND inv.`type` = 0 AND (att.cashier_rejected = inv.cashier_rejected AND att.cao_rejected = inv.cao_rejected)
					INNER JOIN client cll ON cll.clientid = att.clientid
					INNER JOIN jobmaster jm ON jm.jobmasterid = att.jobmasterid
					INNER JOIN lookupvalue lv ON lv.code = att.`status` AND lv.lkdmncode = 'STATUS'
					WHERE case ? when 0 then 1 = 1 else prr.regionid = ? END  AND att.`status` <= 1
					AND att.attendancereviewed BETWEEN (?) AND (?) 
					GROUP BY att.projectid,att.`status`,ss.payslipno,att.monthandyear,att.jobmasterid;
            	*/
			});
			con.query(query, [regionid, regionid, fromdate, todatess]).then(function (rows, fields) {
				var result = [];
				var duties = [];
				var rowsReturned = rows.length;
				for (var i = 0; i < rowsReturned; i++) {
					duties.push({
						'category': rows[i].category,
						'memberscount': rows[i].memberscount,
						'totalduties': rows[i].totalduties,
						'eddays': rows[i].eddays
					});
					if ((i + 1 == rowsReturned) || (rows[i].projectid != rows[i + 1].projectid || rows[i].monthandyear != rows[i + 1].monthandyear || rows[i].status != rows[i + 1].status || rows[i].payslipno != rows[i + 1].payslipno)) {
						var res = i;
						var jobss = new clientModel.getAuthorizeList(rows[res].projectid, rows[res].clientid, rows[res].clientname, rows[res].projectno, rows[res].projectname, rows[res].monthandyear, rows[res].currentstatus, rows[res].jobmasterid, duties, rows[res].status, rows[res].invoiceno,rows[res].bill_type, rows[res].arrearstatus, rows[res].payslipno, rows[res].edstatus,rows[res].sal_cashier_rejected,rows[res].sal_cao_rejected,rows[res].att_cashier_rejected,rows[res].att_cao_rejected,rows[res].inv_cashier_rejected,rows[res].inv_cao_rejected); 
						duties = [];
						result.push(jobss);
					}
				}
				resolve(result);
			}).catch(function (err) {
				errorDAL.errorlog('Error',"clientDAL::getsalarynotcreatedstatus",err.stack,JSON.stringify(fromdate, todate, regionid),"getsalarynotcreatedstatus");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::getsalarynotcreatedstatus",err.stack,JSON.stringify(fromdate, todate, regionid),"getsalarynotcreatedstatus");
			reject(err);
		});
	});
}

module.exports.getattendancesubmittedstatus = function (fromdate, todate, regionid) {
	var todates = moment(todate, "YYYY-MM-DD").add(1, 'days');
	var todatess = moment(todates).format('YYYY-MM-DD');
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
					SELECT prr.projectid,prr.clientid,cll.organization AS clientname,prr.projectno,prr.name AS projectname,att.monthandyear,lv.description AS currentstatus,att.jobmasterid,jm.code AS category,att.status,att.edstatus,COUNT(att.attendanceid) AS memberscount,
					SUM(att.presentdays) AS totalduties,SUM(att.eddays) AS eddays,att.attendanceid,IFNULL(ss.bill_type, 0) AS bill_type,ss.payslipno,inv.invoiceno,inv.arrearstatus,ss.cashier_rejected AS sal_cashier_rejected,ss.cao_rejected AS sal_cao_rejected,
					att.cashier_rejected AS att_cashier_rejected,att.cao_rejected AS att_cao_rejected,inv.cashier_rejected AS inv_cashier_rejected,inv.cao_rejected AS inv_cao_rejected FROM attendance att
					INNER JOIN project prr ON prr.projectid = att.projectid AND att.clientid = prr.clientid
					LEFT JOIN salaryslip ss ON ss.attendanceid = att.attendanceid AND ss.bill_type = 0 AND (att.cashier_rejected = ss.cashier_rejected AND att.cao_rejected = ss.cao_rejected)
					LEFT JOIN invoice inv ON (inv.clientid = ss.clientid OR ss.projectid = inv.projectid) AND inv.monthandyear = ss.monthandyear AND inv.`type` = 0 AND (att.cashier_rejected = inv.cashier_rejected AND att.cao_rejected = inv.cao_rejected)
					INNER JOIN client cll ON cll.clientid = att.clientid
					INNER JOIN jobmaster jm ON jm.jobmasterid = att.jobmasterid
					INNER JOIN lookupvalue lv ON lv.code = att.`status` AND lv.lkdmncode = 'STATUS'
					WHERE case ? when 0 then 1 = 1 else prr.regionid = ? END  AND att.`status` = 0
					AND att.createdttm BETWEEN (?) AND (?) 
					GROUP BY att.projectid,att.`status`,ss.payslipno,att.monthandyear,att.jobmasterid;
            	*/
			});
			con.query(query, [regionid, regionid, fromdate, todatess]).then(function (rows, fields) {
				var result = [];
				var duties = [];
				var rowsReturned = rows.length;
				// console.log('rows',rows);
				// console.log('rowsReturned',rowsReturned);
				for (var i = 0; i < rowsReturned; i++) {
					duties.push({
						'category': rows[i].category,
						'memberscount': rows[i].memberscount,
						'totalduties': rows[i].totalduties,
						'eddays': rows[i].eddays
					});
					if ((i + 1 == rowsReturned) || (rows[i].projectid != rows[i + 1].projectid || rows[i].monthandyear != rows[i + 1].monthandyear || rows[i].status != rows[i + 1].status || rows[i].payslipno != rows[i + 1].payslipno)) {
						var res = i;
						var jobss = new clientModel.getAuthorizeList(rows[res].projectid, rows[res].clientid, rows[res].clientname, rows[res].projectno, rows[res].projectname, rows[res].monthandyear, rows[res].currentstatus, rows[res].jobmasterid, duties, rows[res].status, rows[res].invoiceno,rows[res].bill_type, rows[res].arrearstatus, rows[res].payslipno, rows[res].edstatus,rows[res].sal_cashier_rejected,rows[res].sal_cao_rejected,rows[res].att_cashier_rejected,rows[res].att_cao_rejected,rows[res].inv_cashier_rejected,rows[res].inv_cao_rejected); 
						duties = [];
						result.push(jobss);
					}
				}
				resolve(result);
			}).catch(function (err) {
				errorDAL.errorlog('Error',"clientDAL::getattendancesubmittedstatus",err.stack,JSON.stringify(fromdate, todate, regionid),"getattendancesubmittedstatus");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::getattendancesubmittedstatus",err.stack,JSON.stringify(fromdate, todate, regionid),"getattendancesubmittedstatus");
			reject(err);
		});
	});
}

module.exports.getsalaryrejectedstatus = function (fromdate, todate, regionid) {
	var todates = moment(todate, "YYYY-MM-DD").add(1, 'days');
	var todatess = moment(todates).format('YYYY-MM-DD');
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
					SELECT prr.projectid,prr.clientid,cll.organization AS clientname,prr.projectno,prr.name AS projectname,att.monthandyear,lv.description AS currentstatus,att.jobmasterid,jm.code AS category,att.status,att.edstatus,COUNT(att.attendanceid) AS memberscount,
					SUM(att.presentdays) AS totalduties,SUM(att.eddays) AS eddays,att.attendanceid,IFNULL(ss.bill_type, 0) AS bill_type,ss.payslipno,inv.invoiceno,inv.arrearstatus,ss.cashier_rejected AS sal_cashier_rejected,ss.cao_rejected AS sal_cao_rejected,
					att.cashier_rejected AS att_cashier_rejected,att.cao_rejected AS att_cao_rejected,inv.cashier_rejected AS inv_cashier_rejected,inv.cao_rejected AS inv_cao_rejected FROM attendance att
					INNER JOIN project prr ON prr.projectid = att.projectid AND att.clientid = prr.clientid
					LEFT JOIN salaryslip ss ON ss.attendanceid = att.attendanceid AND ss.bill_type = 0 AND (att.cashier_rejected = ss.cashier_rejected AND att.cao_rejected = ss.cao_rejected)
					LEFT JOIN invoice inv ON inv.clientid = ss.clientid AND ss.projectid = inv.projectid AND inv.monthandyear = ss.monthandyear AND inv.`type` = 0 AND (att.cashier_rejected = inv.cashier_rejected AND att.cao_rejected = inv.cao_rejected)
					INNER JOIN client cll ON cll.clientid = att.clientid
					INNER JOIN jobmaster jm ON jm.jobmasterid = att.jobmasterid
					INNER JOIN lookupvalue lv ON lv.code = att.`status` AND lv.lkdmncode = 'STATUS'
					WHERE case ? when 0 then 1 = 1 else prr.regionid = ? END AND att.`status` IN (5,7)
					AND att.attendancereviewed BETWEEN (?) AND (?) 
					GROUP BY att.projectid,att.`status`,ss.payslipno,att.monthandyear,att.jobmasterid;
            	*/
			});
			con.query(query, [regionid, regionid, fromdate, todatess]).then(function (rows, fields) {
				var result = [];
				var duties = [];
				var rowsReturned = rows.length;
				for (var i = 0; i < rowsReturned; i++) {
					duties.push({
						'category': rows[i].category,
						'memberscount': rows[i].memberscount,
						'totalduties': rows[i].totalduties,
						'eddays': rows[i].eddays
					});
					if ((i + 1 == rowsReturned) || (rows[i].projectid != rows[i + 1].projectid || rows[i].monthandyear != rows[i + 1].monthandyear || rows[i].status != rows[i + 1].status || rows[i].payslipno != rows[i + 1].payslipno)) {
						var res = i;
						var jobss = new clientModel.getAuthorizeList(rows[res].projectid, rows[res].clientid, rows[res].clientname, rows[res].projectno, rows[res].projectname, rows[res].monthandyear, rows[res].currentstatus, rows[res].jobmasterid, duties, rows[res].status, rows[res].invoiceno,rows[res].bill_type, rows[res].arrearstatus, rows[res].payslipno, rows[res].edstatus,rows[res].sal_cashier_rejected,rows[res].sal_cao_rejected,rows[res].att_cashier_rejected,rows[res].att_cao_rejected,rows[res].inv_cashier_rejected,rows[res].inv_cao_rejected); 
						duties = [];
						result.push(jobss);
					}
				}
				resolve(result);
			}).catch(function (err) {
				errorDAL.errorlog('Error',"clientDAL::getsalaryrejectedstatus",err.stack,JSON.stringify(fromdate, todate, regionid),"getsalaryrejectedstatus");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::getsalaryrejectedstatus",err.stack,JSON.stringify(fromdate, todate, regionid),"getsalaryrejectedstatus");
			reject(err);
		});
	});
} 


module.exports.getclientdetailsbyid = function(clientid) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
					SELECT clientid,addressline1,addressline2,addressline3,pincode FROM client cl WHERE 
					cl.clientid = ?
            	*/;
			});
			console.log('query',query);
			console.log('clientid',clientid);
			con.query(query, [clientid]).then(function (rows, fields) {
				resolve(rows);
			}).catch(function (err) {
				errorDAL.errorlog('Error',"clientDAL::getclientdetailsbyid",err.stack,JSON.stringify(clientid),"getclientdetailsbyid");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::getclientdetailsbyid",err.stack,JSON.stringify(clientid),"getclientdetailsbyid");
			reject(err);
		});
	}).catch(function (err) {
		errorDAL.errorlog('Error',"clientDAL::getclientdetailsbyid",err.stack,JSON.stringify(clientid),"getclientdetailsbyid");
		reject(err);
	});
}  

module.exports.createagreementinfo = function(projectid,clientid) { 
	
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
					SELECT agreementid FROM agreement ag WHERE 
					ag.clientid = ?
            	*/;
			});
			console.log('projectid,clientid',query , projectid,clientid);
			con.query(query, [clientid]).then(function (rows, fields) { 
				console.log('rowss',rows[0].agreementid);
				 if(rows[0].agreementid) {  
					
					con.query('INSERT INTO agreementinfo (agreementid,projectid) VALUES (?,?)', [rows[0].agreementid,projectid]).then(function (rowss, fields) {
						if(rowss.insertId > 0) { 
							con.query('INSERT INTO agreementdetail (agreementinfoid,jobmasterid,numberofvacancies,salary) VALUES (?,?,?,?)', [rowss.insertId,1,0,0]).then(function (row, fields) {
								resolve(row);
							}).catch(function (err) {
								errorDAL.errorlog('Error',"clientDAL::createagreementinfo",err.stack,JSON.stringify(clientid),"createagreementinfo");
								reject(err);
							});
						} else {
							resolve(rowss);
						}
					}).catch(function (err) {
						errorDAL.errorlog('Error',"clientDAL::createagreementinfo",err.stack,JSON.stringify(clientid),"createagreementinfo");
						reject(err);
					});
				 } else {
					resolve(rows);
				 }
			}).catch(function (err) {
				errorDAL.errorlog('Error',"clientDAL::createagreementinfo",err.stack,JSON.stringify(clientid),"createagreementinfo");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::createagreementinfo",err.stack,JSON.stringify(clientid),"createagreementinfo");
			reject(err);
		});
	}).catch(function (err) {
		errorDAL.errorlog('Error',"clientDAL::createagreementinfo",err.stack,JSON.stringify(clientid),"createagreementinfo");
		reject(err);
	});
}

module.exports.getValuesforCheckProjectUpload  = function() {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
					SELECT categoryid,categoryname FROM category WHERE active = 1; 
					SELECT subcategoryid,subcategoryname FROM subcategory WHERE active = 1;
					SELECT jm.jobmasterid,jm.code,jm.name FROM jobmaster jm WHERE active = 1; 
					SELECT wc.category_id,wc.category_code FROM wage_category_master wc WHERE active = 1;
					SELECT lv.lkvalid,lv.lkdmncode,lv.code,lv.description FROM lookupvalue lv WHERE lv.lkdmncode 
						IN ('DEPT','DEPTTYPE','PRJST','REGION','DISTRC','WGTYPE','WGYEAR','WGAREA','AGREE','AGTYPE','AGSTS'); 
					SELECT lv.lkvalid,lv.lkdmncode,lv.code,lv.description FROM lookupvalue lv WHERE lv.lkdmncode IN ('TALUK'); 
					SELECT pr.projectid,pr.projectno,pr.name FROM project pr WHERE pr.active != 0;
            	*/;
			});
			con.query(query).then(function (rows, fields) {
				resolve({
					"category":rows[0],
					"subcategory":rows[1],
					"jobmaster":rows[2],
					"wagecategory":rows[3],
					"lookup":rows[4],
					"taluk":rows[5],
					"project":rows[6]
				});
			}).catch(function (err) {
				errorDAL.errorlog('Error',"clientDAL::getclientdetailsbyid",err.stack,JSON.stringify(clientid),"getclientdetailsbyid");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::getclientdetailsbyid",err.stack,JSON.stringify(clientid),"getclientdetailsbyid");
			reject(err);
		});
	}).catch(function (err) {
		errorDAL.errorlog('Error',"clientDAL::getclientdetailsbyid",err.stack,JSON.stringify(clientid),"getclientdetailsbyid");
		reject(err);
	});
}  

module.exports.addBulkProjectDetails  = function(results) { 
	// console.log('results',JSON.stringify(results));
	// console.log('tesultslength',results.length);
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) { 
			var promises = [];
			var queries = '';
			for(var i = 0; i < results.length;i++) {  
                promises.push(new Promise((resolve, reject) => {  
					var res  = i;  
					// console.log('res',res);
					// console.log('results[res].project',results[res].project.projectno); 
					con.query('INSERT INTO client SET ?',results[res].client).then(function (rowss, fields) { 
						// console.log('res',i);
						// console.log('results[res].project',results[res].project.projectno);
						var clientid = rowss.insertId;
						results[res].client.clientid = clientid;
						results[res].project.clientid = clientid; 
						results[res].agreement.clientid = clientid; 
						
						con.query('INSERT INTO client_ams SET ?; INSERT INTO project SET ?; INSERT INTO agreement SET ?;', [results[res].client,results[res].project,results[res].agreement]).then(function (rows, fields) { 
							var agreementid = rows[2].insertId;
							var projectid = rows[1].insertId; 
							results[res].project.projectid = projectid;
							results[res].agreement.agreementid = agreementid;
							var aginfodetails= {
								'agreementid' : agreementid,
								'projectid' : projectid
							} 
							con.query('INSERT INTO project_ams SET ?; INSERT INTO agreement_ams SET ?; INSERT INTO agreementinfo SET ?;', [results[res].project,results[res].agreement,aginfodetails]).then(function (rowsss, fields) { 
								var agreementinfoid = rowsss[2].insertId;
								//var queries = '';
								for(k = 0; k < results[res].vacancy.length;k++) {
									queries += con.format("INSERT INTO `agreementdetail` (`agreementinfoid`, `jobmasterid`, `numberofvacancies`) VALUES (?,?,?);", [agreementinfoid,results[res].vacancy[k].jobmasterid,results[res].vacancy[k].numberofvacancies]);
								} 
								resolve(queries);
							}).catch(function (err) {
								errorDAL.errorlog('Error',"clientDAL::createbulkclient",err.stack,"","createbulkclient");
								reject(err);
							});
						}).catch(function (err) {
							errorDAL.errorlog('Error',"clientDAL::createbulkclient",err.stack,"","createbulkclient");
							reject(err);
						});
					}).catch(function (err) {
						errorDAL.errorlog('Error',"clientDAL::createbulkclient",err.stack,"","createbulkclient");
						reject(err);
					});
				}))
			} 
			app.promise.all(promises).then(function () {
				con.query(queries).then(function (rowss, fields) { 
					resolve('Success');
				}).catch(function (err) {
					errorDAL.errorlog('Error',"clientDAL::createbulkclient",err.stack,"","createbulkclient");
					reject(err);
				});
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::createclient",err.stack,"","createclient");
			reject(err);
		});
	});	
}

module.exports.downloadbulkproject = function()  {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {
			var query = multiline.stripIndent(function () {
				/*
					SELECT pr.projectno,pr.name,pr.tallyname,ca.categoryname as projectcategory,sa.subcategoryname as projectsubcategory,	lv6.description as projectstatus,pr.designation as projectdesigination,pr.addressline1 as projectaddressline1,		pr.addressline2 as projectaddressline2,pr.addressline3 as projectaddressline3,pr.pincode as projectpincode,			lv.description as projectregion,lv1.description as projectdistrict,lv2.description as projecttaluk,pr.				claimaddressline1,pr.claimaddressline2,pr.claimaddressline3,pr.claimpincode,cl.organization as clientname,cl.		contactname as clientcontact,cl.addressline1 as clientaddressline1,cl.addressline2 as clientaddressline2,cl.		addressline3 as clientaddressline3,
						cl.pincode as clientpincode,cl.email as clientemail,cl.mobile as clientmobile,cl.phone as phonewithcode,lv15.description as clientcountry,lv14.description as clientstate,lv3.description as clientregion,lv4.description as clientdistrict,lv5.description as clienttaluk,cl.gstno,cl.tanno,cl.gsttanno,cl.panno,lv17.description as department,lv16.description as departmenttype,cl.department as departmentname,lv18.description as clientstatus,ag.fromdate as agfromdate,ag.todate as agtodate,ag.servicecharge,lv7.description as wagetype,
						lv8.description as wageyear,lv9.description as wagearea,wm.category_description as wagecategoryname,wm.category_code as wagecategorycode,lv11.description as agreementstaus,lv12.description as typeofagreement,lv13.description as agreementtype,ag.tax as totaltax,jm.code,agd.numberofvacancies
					FROM project pr  
					INNER JOIN client cl on pr.clientid = cl.clientid AND cl.active = 1 
					INNER JOIN agreement ag on ag.clientid = cl.clientid AND ag.active = 1 
					LEFT JOIN agreementinfo ai on ai.agreementid = ag.agreementid
					LEFT JOIN agreementdetail agd on agd.agreementinfoid  = ai.agreementinfoid
					LEFT JOIN jobmaster jm on jm.jobmasterid = agd.jobmasterid
					LEFT JOIN lookupvalue lv on lv.lkvalid = pr.regionid
					LEFT JOIN lookupvalue lv1 on lv1.lkvalid = pr.districtid
					LEFT JOIN lookupvalue lv2 on lv2.lkvalid = pr.talukid
					LEFT JOIN lookupvalue lv3 on lv3.lkvalid = cl.regionid
					LEFT JOIN lookupvalue lv4 on lv4.lkvalid = cl.districtid
					LEFT JOIN lookupvalue lv5 on lv5.lkvalid = cl.talukid
					LEFT JOIN lookupvalue lv14 on lv14.lkvalid = cl.stateid
					LEFT JOIN lookupvalue lv15 on lv15.lkvalid = cl.countryid
					LEFT JOIN lookupvalue lv16 on lv16.lkvalid = cl.departmenttypeid
					LEFT JOIN lookupvalue lv17 on lv17.lkvalid = cl.deptid 
					LEFT JOIN lookupvalue lv18 on lv18.lkvalid = cl.approvalid
					LEFT JOIN lookupvalue lv6 on lv6.lkvalid = pr.statusid
					LEFT JOIN lookupvalue lv7 on lv7.lkvalid = ag.wagetypeid
					LEFT JOIN lookupvalue lv8 on lv8.lkvalid = ag.wageyearid
					LEFT JOIN lookupvalue lv9 on lv9.lkvalid = ag.wageareaid
					LEFT JOIN wage_category_master wm on wm.category_id = ag.wagecategoryid
					LEFT JOIN category ca on ca.categoryid = pr.categoryid
					LEFT JOIN subcategory sa on sa.subcategoryid = pr.subcategoryid
					LEFT JOIN lookupvalue lv11 on lv11.lkvalid = ag.agreementstatusid
					LEFT JOIN lookupvalue lv12 on lv12.lkvalid = ag.agreementtypeid
					LEFT JOIN lookupvalue lv13 on lv13.lkvalid = ag.agtypeid
					WHERE pr.active = 1
					GROUP BY agd.agreementdetailid 
					ORDER BY pr.projectid ASC
            	*/
			});
			con.query(query).then(function (rows, fields) {
				var rowsReturned = rows.length;
				var result = [];
				sg = 0;
				hsg = 0;
				dvr = 0;
				aso = 0;
				po = 0;
				ja = 0;
				other = 0;
				oa = 0;
				gun = 0;
				ig = 0;
				io = 0;
				wsg = 0;
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
					} else if (rows[i].code == "GUN") {
						gun = rows[i].numberofvacancies;
					}  else if (rows[i].code == "IG") {
						ig = rows[i].numberofvacancies;
					} else if (rows[i].code == "IO") {
						io = rows[i].numberofvacancies;
					} else if (rows[i].code == "WSG") {
						wsg = rows[i].numberofvacancies;
					} 
					if ((i + 1 == rowsReturned) || (rows[i].projectno != rows[i + 1].projectno)) {
						rows[i]['sg'] = sg;
						rows[i]['hsg'] = hsg;
						rows[i]['dvr'] = dvr;
						rows[i]['aso'] = aso;
						rows[i]['po'] = po;
						rows[i]['ja'] = ja;
						rows[i]['other'] = other;
						rows[i]['oa'] = oa;
						rows[i]['gun'] = gun;
						rows[i]['ig'] = ig;
						rows[i]['io'] = io;
						rows[i]['wsg'] = wsg;
						// console.log('rows',rows[i]);
						delete rows[i]['numberofvacancies'];
						delete rows[i]['code'];
						result.push(rows[i]);
						sg = 0;
						hsg = 0;
						dvr = 0;
						aso = 0;
						po = 0;
						ja = 0;
						other = 0;
						oa = 0;
						gun = 0;
						ig = 0;
						io = 0;
						wsg = 0;
					}
				}
				resolve(result);
			}).catch(function (err) {
				errorDAL.errorlog('Error',"clientDAL::getclientdetailsbyid",err.stack,JSON.stringify(clientid),"getclientdetailsbyid");
				reject(err);
			});
		}).catch(function (err) {
			errorDAL.errorlog('Error',"clientDAL::getclientdetailsbyid",err.stack,JSON.stringify(clientid),"getclientdetailsbyid");
			reject(err);
		});
	}).catch(function (err) {
		errorDAL.errorlog('Error',"clientDAL::getclientdetailsbyid",err.stack,JSON.stringify(clientid),"getclientdetailsbyid");
		reject(err);
	});
}
