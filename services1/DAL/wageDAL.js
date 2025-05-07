var app = require('./../app');
var multiline = require('multiline');
var wageModel = require('./../Model/wage');
var mySqlConnection = require('./MySqlHelper');
var errorDAL = require('./../DAL/errorDAL');
const { json } = require('body-parser');

module.exports.createwages = function (wage) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            con.query('INSERT INTO wages SET ?', wage).then(function (rows, fields) {
                resolve({
                    "wageid": rows.insertId
                })
            }).catch(function (err) {
                errorDAL.errorlog('Error',"wageDAL::createwages",err.stack,JSON.stringify('insert wage Error'),"wageDAL");
                reject(err);
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"wageDAL::createwages",err.stack,JSON.stringify('MYSQL Error'),"wageDAL");
            reject(err);
        });
    });
}

module.exports.createnewwages = function (wage) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            con.query('INSERT INTO wage_category_master (category_code,category_description,wageyearid,wagetypeid) VALUES (?,?,?,?)', [wage.wagecategory,wage.wagecategorydescription,wage.wageyearid,wage.wagetypeid]).then(function (rows, fields) {
                if(rows) {
                    var categoryid = rows.insertId;
                    var queries = '';
                    //var wagess = JSON.stringify(wage.wageamount);
                    var wageamount = wage.wageamount;
                    // console.log('wageamount',wageamount.length);
                    // console.log('wageamount',wageamount);
                    for(var i = 0; i < wageamount.length; i++) {
                        queries += con.format('INSERT INTO wages (wagetypeid,wagecategoryid,wageyearid,wageareaid,jobmasterid,particularid,particularamount) VALUES (?,?,?,?,?,?,?);',[wageamount[i].wagetypeid,categoryid,wage.wageamount[i].wageyearid,wageamount[i].wageareaid,wageamount[i].jobmasterid,wageamount[i].particularid,wageamount[i].particularamount]);
                    }
                    con.query(queries).then(function (rows, fields) {
                        resolve({
                            "msg": "Wage Added Successfully"
                        })
                    }).catch(function (err) {
                        errorDAL.errorlog('Error',"wageDAL::createnewwages",err.stack,JSON.stringify(queries),"wageDAL");
                        reject(err);
                    });
                }
            }).catch(function (err) {
                errorDAL.errorlog('Error',"wageDAL::createnewwages",err.stack,JSON.stringify(wage),"wageDAL");
                reject(err);
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"wageDAL::createnewwages",err.stack,JSON.stringify('MYSQL error'),"wageDAL");
            reject(err);
        });
    });
}

module.exports.createnewwagecategoryforupload = function (wagecategory,wagecategorydescription,wageyearid,wagetypeid) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            con.query('INSERT INTO wage_category_master (category_code,category_description,wageyearid,wagetypeid) VALUES (?,?,?,?)', [wagecategory,wagecategorydescription,wageyearid,wagetypeid]).then(function (rows, fields) {
                if(rows) {
                    var categoryid = rows.insertId;
                    resolve(categoryid);
                }
            }).catch(function (err) {
                errorDAL.errorlog('Error',"wageDAL::createnewwages",err.stack,JSON.stringify(wage),"wageDAL");
                reject(err);
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"wageDAL::createnewwages",err.stack,JSON.stringify('MYSQL error'),"wageDAL");
            reject(err);
        });
    });
}

module.exports.checkwagecategory = function (wage) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            con.query('SELECT * FROM wage_category_master WHERE category_code = ?;', [wage.wagecategory]).then(function (rows, fields) {
                var result = 0;
                if(rows.length > 0) {
                    result = 1
                }
                resolve({
                    "counts": result
                })
            }).catch(function (err) {
                errorDAL.errorlog('Error',"wageDAL::checkwagecategory",err.stack,JSON.stringify(wage),"wageDAL");
                reject(err);
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"wageDAL::checkwagecategory",err.stack,JSON.stringify('MYSQL Error'),"wageDAL");
            reject(err);
        });
    });
}

module.exports.UpdateWageRate = function (wageid,particularamount) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            con.query('UPDATE wages SET particularamount = ? WHERE wageid= ?', [particularamount, wageid]).then(function (rows, fields) {
                resolve({
                    "wageid": wageid
                })
            }).catch(function (err) {
                errorDAL.errorlog('Error',"wageDAL::updatewages",err.stack,JSON.stringify(wage),"wageDAL");
                reject(err);
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"wageDAL::updatewages",err.stack,JSON.stringify('mysql error'),"wageDAL");
            reject(err);
        });
    });
} 

 
module.exports.deletewagecategory = function (wagecategoryid,errs) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            con.query('DELETE FROM wage_category_master WHERE category_id= ?', [wagecategoryid]).then(function (rows, fields) {
                resolve(errs)
            }).catch(function (err) {
                errorDAL.errorlog('Error',"wageDAL::deletewagecategory",err.stack,JSON.stringify(wagecategoryid),"wageDAL");
                reject(err);
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"wageDAL::deletewagecategory",err.stack,JSON.stringify(wagecategoryid),"wageDAL");
            reject(err);
        });
    });
}


module.exports.updatewages = function (wage, wageid) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            con.query('UPDATE wages SET ? WHERE wageid= ?', [wage, wageid]).then(function (rows, fields) {
                resolve({
                    "wageid": wageid
                })
            }).catch(function (err) {
                errorDAL.errorlog('Error',"wageDAL::updatewages",err.stack,JSON.stringify(wage),"wageDAL");
                reject(err);
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"wageDAL::updatewages",err.stack,JSON.stringify('mysql error'),"wageDAL");
            reject(err);
        });
    });
}

module.exports.UpdateAllWages = function (particularid, particularamount,particularpercent) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            con.query('UPDATE wages SET particularamount = ?,particularpercent = ? WHERE particularid = ?', [particularpercent,particularamount,particularid]).then(function (rows, fields) {
                resolve(rows)
            }).catch(function (err) {
                errorDAL.errorlog('Error',"wageDAL::updateallwages",err.stack,JSON.stringify(particularid),"wageDAL");
                reject(err);
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"wageDAL::updateallwages",err.stack,JSON.stringify('MYSQL Error'),"wageDAL");
            reject(err);
        });
    });
}
module.exports.updatewagestatus = function (wageid) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            con.query('UPDATE wages SET active = ? WHERE wageid= ?', [0, wageid]).then(function (rows, fields) {
                resolve({
                    "wageid": wageid
                })
            }).catch(function (err) {
                errorDAL.errorlog('Error',"wageDAL::updatewagestatus",err.stack,JSON.stringify(wageid),"wageDAL");
                reject(err);
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"wageDAL::updatewagestatus",err.stack,JSON.stringify('MYSQL Error'),"wageDAL");
            reject(err);
        });
    });
}

module.exports.tnwages = function () {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            var query = multiline.stripIndent(function () {
                    /*
           SELECT

     wg.*,
     wt.description AS wagetype,
     wy.description AS wageyear,
     wa.description AS wagearea,
     wp.description AS particular,
     jm.code AS jobmastercode,
     jm.name AS jobmaster

FROM wages wg


INNER JOIN lookupvalue wt ON
	wg.wagetypeid = wt.lkvalid AND wt.active = 1 AND wt.code = 'TN'

INNER JOIN lookupvalue wy ON
	wg.wageyearid = wy.lkvalid AND wy.active = 1

LEFT JOIN lookupvalue wa ON
	wg.wageareaid = wa.lkvalid AND wa.active = 1

INNER JOIN lookupvalue wp ON
	wg.particularid = wp.lkvalid AND wp.active = 1

INNER JOIN jobmaster jm ON
	wg.jobmasterid = jm.jobmasterid AND jm.active = 1

WHERE wt.code = 'TN' AND wg.active=1

ORDER BY wg.wageyearid, wg.wagetypeid, wg.jobmasterid, wg.particularid

             */
            });
            
            con.query(query).then(function (rows, fields) {
                var rowsReturned = rows.length;
                var result = [];
                var wagejobmasters = [];
                var wageareajobmasters = [];
                var particulars = [];
                
                if (rowsReturned > 0) {
                    
                    for (var index = 0; index < rowsReturned; index++) {
                        
                        var particular = new wageModel.particulars(rows[index].particularid, rows[index].particular, rows[index].particularamount);
                        particulars.push(particular);
                        
                        if ((index + 1 == rowsReturned) || (rows[index].jobmasterid != rows[index + 1].jobmasterid)) {
                            var wageareajobmaster = new wageModel.wageareajobmaster(rows[index].wageareaid, rows[index].wagearea, particulars);
                            wageareajobmasters.push(wageareajobmaster);
                            particulars = [];
                            
                            if ((index + 1 == rowsReturned) || (rows[index].wageyearid != rows[index + 1].wageyearid) || (rows[index].jobmasterid != rows[index + 1].jobmasterid)) {
                                
                                var wagejobmaster = new wageModel.wagejobmaster(rows[index].jobmasterid, rows[index].jobmastercode, rows[index].jobmaster, wageareajobmasters);
                                wagejobmasters.push(wagejobmaster);
                                wageareajobmasters = [];
                                
                                if ((index + 1 == rowsReturned) || (rows[index].wageyearid != rows[index + 1].wageyearid)) {
                                    var wage = new wageModel.wages(rows[index].wageid, rows[index].wagetypeid, rows[index].wagetype, rows[index].wageyearid, rows[index].wageyear, wagejobmasters);
                                    result.push(wage);
                                    wagejobmasters = [];
                                }
                            }
                        }
                    }
                }
                resolve(result);
            }).catch(function (err) {
                errorDAL.errorlog('Error',"wageDAL::tnwages",err.stack,JSON.stringify(query),"wageDAL");
                reject(err);
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"wageDAL::tnwages",err.stack,JSON.stringify('MYSQL Error'),"wageDAL");
            reject(err);
        });
    });
}

module.exports.dgrwages = function () {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            var query = multiline.stripIndent(function () {
                    /*
                    SELECT

                wg.*,
                wt.description AS wagetype,
                wy.description AS wageyear,
                wa.description AS wagearea,
                wp.description AS particular,
                jm.code AS jobmastercode,
                jm.name AS jobmaster

            FROM wages wg


            INNER JOIN lookupvalue wt ON
                wg.wagetypeid = wt.lkvalid AND wt.active = 1 AND wt.code = 'DGR'

            INNER JOIN lookupvalue wy ON
                wg.wageyearid = wy.lkvalid AND wy.active = 1

            LEFT JOIN lookupvalue wa ON
                wg.wageareaid = wa.lkvalid AND wa.active = 1

            INNER JOIN lookupvalue wp ON
                wg.particularid = wp.lkvalid AND wp.active = 1

            INNER JOIN jobmaster jm ON
                wg.jobmasterid = jm.jobmasterid AND jm.active = 1

            WHERE wt.code = 'DGR' AND wg.active=1

            ORDER BY  wg.wageyearid, wg.jobmasterid, wg.wageareaid, wg.particularid;

                        */
            });
            
            con.query(query).then(function (rows, fields) {
                var rowsReturned = rows.length;
                var result = [];
                var wagejobmasters = [];
                var wageareajobmasters = [];
                var particulars = [];
                
                if (rowsReturned > 0) {
                    for (var index = 0; index < rowsReturned; index++) {
                        
                        var particular = new wageModel.particulars(rows[index].particularid, rows[index].particular, rows[index].particularamount);
                        particulars.push(particular);
                        
                        if ((index + 1 == rowsReturned) || (rows[index].wageyearid != rows[index + 1].wageyearid || rows[index].wageareaid != rows[index + 1].wageareaid)) {
                            var wageareajobmaster = new wageModel.wageareajobmaster(rows[index].wageareaid, rows[index].wagearea, particulars);
                            wageareajobmasters.push(wageareajobmaster);
                            particulars = [];
                            
                            if ((index + 1 == rowsReturned) || (rows[index].jobmasterid != rows[index + 1].jobmasterid || rows[index].wageyearid != rows[index + 1].wageyearid)) {
                                var wagejobmaster = new wageModel.wagejobmaster(rows[index].jobmasterid, rows[index].jobmastercode, rows[index].jobmaster, wageareajobmasters);
                                wagejobmasters.push(wagejobmaster);
                                wageareajobmasters = [];
                                
                                if ((index + 1 == rowsReturned) || (rows[index].wageyearid != rows[index + 1].wageyearid)) {
                                    var wage = new wageModel.wages(rows[index].wageid, rows[index].wagetypeid, rows[index].wagetype, rows[index].wageyearid, rows[index].wageyear, wagejobmasters);
                                    result.push(wage);
                                    wagejobmasters = [];
                                }
                            }
                        }
                    }
                }
                resolve(result);
            }).catch(function (err) {
                errorDAL.errorlog('Error',"wageDAL::dgrwages",err.stack,JSON.stringify('MYSQL Error'),"wageDAL");
                reject(err);
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"wageDAL::dgrwages",err.stack,JSON.stringify('MYSQL Error'),"wageDAL");
            reject(err);
        });
    });
}

module.exports.checkwages = function (wage) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            con.query("SELECT wageid  FROM wages WHERE (wagetypeid = ? AND wageareaid = ? AND wageyearid = ? AND jobmasterid = ? AND particularid = ?) AND active = 1", [wage.wagetypeid, wage.wageareaid, wage.wageyearid, wage.jobmasterid, wage.particularid]).then(function (rows, fields) {
                if (rows.length > 0) {
                    reject("Wages Already Exist.");
                } else {
                    resolve("Success");
                }
            }).catch(function (err) {
                errorDAL.errorlog('Error',"wageDAL::checkwages",err.stack,JSON.stringify('MYSQL Error'),"wageDAL");
                reject(err);
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"wageDAL::checkwages",err.stack,JSON.stringify('MYSQL Error'),"wageDAL");
            reject(err);
        });
    });
}

module.exports.tnwage = function (categoryid,wageyearid,wagetypeid) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            var query = multiline.stripIndent(function () {
                /*
                    SELECT
                        wg.wageid,
                        wg.wageareaid,
                        wg.wageyearid,
                        wg.jobmasterid,
                        wg.particularid,
                        wg.particularamount
                    FROM wages wg
                    INNER JOIN lookupvalue wt ON wg.wagetypeid = wt.lkvalid AND wt.active = 1
                    WHERE wt.code = 'TN' AND wg.active=1 AND wg.wagecategoryid = ? AND wg.wageyearid = ? 
                    AND wg.wagetypeid = ?
                    ORDER BY wg.wageyearid, wg.wagetypeid, wg.jobmasterid, wg.wageareaid
                */
            });
            console.log('query',query);
            console.log('categoryid,wageyearid,wagetypeid',categoryid,wageyearid,wagetypeid);
            con.query(query,[categoryid,wageyearid,wagetypeid]).then(function (rows, fields) {
                var rowsReturned = rows.length;
                var result = [];
                if (rowsReturned > 0) {
                    for (var index = 0; index < rowsReturned; index++) {
                        var wage = new wageModel.wagedetail(rows[index].wageid, rows[index].wageareaid, rows[index].wageyearid, rows[index].jobmasterid, rows[index].particularid, rows[index].particularamount);
                        result.push(wage);
                    }
                }
                resolve(result);
            }).catch(function (err) {
                errorDAL.errorlog('Error',"wageDAL::tnwage",err.stack,JSON.stringify(query),"wageDAL");
                reject(err);
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"wageDAL::tnwage",err.stack,JSON.stringify('MYSQL Error'),"wageDAL");
            reject(err);
        });
    });
};

module.exports.dgrwage = function (categoryid,wageyearid,wagetypeid) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            var query = multiline.stripIndent(function () {
                /*
                    SELECT
                        wg.wageid,
                        wg.wageareaid,
                        wg.wageyearid,
                        wg.jobmasterid,
                        wg.particularid,
                        wg.particularamount,
                        wg.particularpercent
                    FROM wages wg
                    INNER JOIN lookupvalue wt ON wg.wagetypeid = wt.lkvalid AND wt.active = 1
                    WHERE wt.code = 'DGR' AND wg.wagecategoryid = ? AND wg.wageyearid = ? AND wg.wagetypeid = ? AND wg.active=1
                    ORDER BY wg.wageyearid, wg.wagetypeid, wg.jobmasterid, wg.wageareaid
                */
            });
            
            con.query(query,[categoryid,wageyearid,wagetypeid]).then(function (rows, fields) {
                var rowsReturned = rows.length;
                var result = [];
                if (rowsReturned > 0) {
                    for (var index = 0; index < rowsReturned; index++) {
                        var wage = new wageModel.wagedetail(rows[index].wageid, rows[index].wageareaid, rows[index].wageyearid, rows[index].jobmasterid, rows[index].particularid, rows[index].particularamount, rows[index].particularpercent);
                        result.push(wage);
                    }
                }
                resolve(result);
            }).catch(function (err) {
                errorDAL.errorlog('Error',"wageDAL::dgrwage",err.stack,JSON.stringify(query),"wageDAL");
                reject(err);
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"wageDAL::dgrwage",err.stack,JSON.stringify('MYSQL Error'),"wageDAL");
            reject(err);
        });
    });
}

module.exports.dgrwageReference = function () {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            var query = multiline.stripIndent(function () {
                /*
                SELECT
                   wage_po_ref_no
                FROM wage_reference_details ORDER BY ref_id DESC LIMIT 1;
                */
            });
            con.query(query).then(function (rows, fields) {
                resolve(rows);
            }).catch(function (err) {
                errorDAL.errorlog('Error',"wageDAL::dgrwageReference",err.stack,JSON.stringify(query),"wageDAL");
                reject(err);
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"wageDAL::dgrwageReference",err.stack,JSON.stringify('MYSQL Error'),"wageDAL");
            reject(err);
        });
    });
}

module.exports.getwagesbyid = function (agreement) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            var query = multiline.stripIndent(function () {
                  /*
            SELECT
                wg.jobmasterid,
                wg.particularamount
            FROM wages wg
        
            WHERE  wg.wageyearid = ? AND  wg.wagetypeid = ? AND wg.wageareaid = ? AND wg.particularid = ?
            AND wg.active=1
            ORDER BY wg.jobmasterid;

            */
            });
            
            con.query(query, [agreement.wageyearid, agreement.wagetypeid, agreement.wageareaid, agreement.particularid]).then(function (rows, fields) {
                var rowsReturned = rows.length;
                var wages = [];
                if (rowsReturned > 0) {
                    for (var index = 0; index < rowsReturned; index++) {
                        var wage = new wageModel.wageinfo(rows[index].jobmasterid, rows[index].particularamount);
                        wages.push(wage);
                    }
                }
                resolve(wages);
            }).catch(function (err) {
                errorDAL.errorlog('Error',"wageDAL::getwagesbyid",err.stack,JSON.stringify(agreement),"wageDAL");
                reject(err);
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"wageDAL::getwagesbyid",err.stack,JSON.stringify('MYSQL Error'),"wageDAL");
            reject(err);
        });
    });
}

module.exports.getimportdetails = function () {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            var query = multiline.stripIndent(function () {
                /*
                    SELECT lv.lkvalid,lv.lkdmncode,lv.code,lv.description FROM lookupvalue lv WHERE lv.lkdmncode IN ('WGPART'); 
                    SELECT jm.jobmasterid,jm.code,jm.name FROM jobmaster jm WHERE jm.active = 1; 
                */
            });
            con.query(query).then(function (rows, fields) { 
                resolve({
                    "wgpart" : rows[0],
                    "jobmaster": rows[1]
                });
                // var rowsReturned = rows.length;
                // var wages = [];
                // if (rowsReturned > 0) {
                //     var wage = new wageModel.wageimport(rows[0].wagetypeid, (rows[0].wageareaid != null? rows[0].wageareaid: 0) , rows[0].wageyearid, rows[0].particularid, rows[0].jobmasterid, particularamount);
                //     wages.push(wage);
                // }
                
            }).catch(function (err) {
                errorDAL.errorlog('Error',"wageDAL::getimportdetails",err.stack,JSON.stringify(wagetype, wagearea, wageyear, particular, jobmaster, particularamount),"wageDAL");
                reject(err);
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"wageDAL::getimportdetails",err.stack,JSON.stringify('MYSQL Error'),"wageDAL");
            reject(err);
        });
    });
}

module.exports.getwageexist = function (wagedetails,i) { 
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {  
            var queriess = '';
            queriess += con.format('SELECT category_code,category_id FROM wage_category_master WHERE category_code = ?;',wagedetails['category']);
            con.query(queriess).then(function (rowss, fields) {   
                if(rowss.length == 0) { 
                    var query = con.format('INSERT INTO wage_category_master (category_code,category_description,wageyearid,wagetypeid) VALUES (?,?,?,?);', [wagedetails['category'],wagedetails['category'],wagedetails['rate'].wageyearid,wagedetails['rate'].wagetypeid]);
                    con.query(query).then(function (rows, fields) { 
                        console.log('rows',rows);
                        resolve(rowss)
                    });
                } else {  
                    resolve(rowss.category_id)
                }
            }).catch(function (err) {
                errorDAL.errorlog('Error',"wageDAL::getwageexist",err.stack,JSON.stringify(queriess),"wageDAL");
                reject(err);
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"wageDAL::getwageexist",err.stack,JSON.stringify('MYSQL Error'),"wageDAL");
            reject(err);
        });
    });
}

module.exports.importwage = function (wageamount,errs) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) { 
            var promises = []; 
            var queries = '';
            for(var ij = 0; ij < wageamount.length; ij++) {
                queries += con.format('INSERT INTO wages (wagetypeid,wagecategoryid,wageyearid,wageareaid,jobmasterid,particularid,particularamount) VALUES (?,?,?,?,?,?,?);',[wageamount[ij].wagetypeid,wageamount[ij].wagecategoryid,wageamount[ij].wageyearid,wageamount[ij].wageareaid,wageamount[ij].jobmasterid,wageamount[ij].particularid,wageamount[ij].particularamount]);
            }  
            con.query(queries).then(function (rows, fields) {
                resolve(errs);
            }).catch(function (err) {
                errorDAL.errorlog('Error',"wageDAL::createnewwages",err.stack,JSON.stringify(queries),"wageDAL");
                reject(err);
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"wageDAL::createnewwages",err.stack,JSON.stringify('MYSQL error'),"wageDAL");
            reject(err);
        });
    });
}

module.exports.dgrwagebyyear = function (projectid) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            var query = multiline.stripIndent(function () {
                    /*
SELECT
pr.projectid,
pr.projectno,
wg.*,
pa.code AS salcode,
pa.description AS saldescription,
jm.code AS jobcode,
jm.name AS jobname

FROM project pr

INNER JOIN agreement ag ON
ag.clientid = pr.clientid 

INNER JOIN agreementinfo ai ON 
ai.projectid = pr.projectid

INNER JOIN wages wg ON
wg.wagetypeid = ag.wagetypeid AND wg.wageyearid = ag.wageyearid

INNER JOIN jobmaster jm ON
jm.jobmasterid = wg.jobmasterid 

INNER JOIN lookupvalue pa ON
pa.lkvalid = wg.particularid

WHERE pr.projectid = ?

ORDER BY jm.jobmasterid, pa.lkvalid


             */
            });
            
            con.query(query, [projectid]).then(function (rows, fields) {
                var rowsReturned = rows.length;
                var result = [];
                var salarycomponent = [];
                if (rowsReturned > 0) {
                    for (var i = 0; i < rowsReturned; i++) {
                        var components = new wageModel.salarycomponent(rows[i].particularid, rows[i].saldescription, rows[i].salcode, rows[i].particularpercent, rows[i].particularamount, rows[i].jobmasterid, rows[i].wagetypeid, rows[i].wageyearid, rows[i].wageareaid);
                        salarycomponent.push(components);
                        if ((i + 1 == rowsReturned) || (rows[i].jobmasterid != rows[i + 1].jobmasterid)) {
                            var wage = new wageModel.wagesforpay(rows[i].jobmasterid, rows[i].jobcode, rows[i].jobname, salarycomponent);
                            result.push(wage);
                            salarycomponent = [];
                        }
                    }
                }
                resolve(result);
            }).catch(function (err) {
                errorDAL.errorlog('Error',"wageDAL::dgrwagebyyear",err.stack,JSON.stringify(query),"wageDAL");
                reject(err);
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"wageDAL::dgrwagebyyear",err.stack,JSON.stringify('MYSQL Error'),"wageDAL");
            reject(err);
        });
    });
};

module.exports.getwagecategoryByYear = function (yearid,wagetypeid) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            console.log('yearid,wagetypeid',yearid,wagetypeid);
            var query = multiline.stripIndent(function () {
                /*
                    SELECT * FROM wage_category_master WHERE wageyearid = ? AND wagetypeid = ? ORDER BY created_at DESC;
                */
            });
            con.query(query, [yearid,wagetypeid]).then(function (rows, fields) {
                console.log('rows',rows);
                var rowsReturned = rows.length;
                resolve(rows);
            }).catch(function (err) {
                errorDAL.errorlog('Error',"wageDAL::dgrwagebyyear",err.stack,JSON.stringify(query),"wageDAL");
                reject(err);
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"wageDAL::dgrwagebyyear",err.stack,JSON.stringify('MYSQL Error'),"wageDAL");
            reject(err);
        });
    });
};


module.exports.getwagedetailsbycategoryid = function (categoryid,wageyearid,wagetypeid) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            var query = multiline.stripIndent(function () {
                /*
                    SELECT  
                        wg.*,wt.description AS wagetype,
                        wy.description AS wageyear,
                        wa.description AS wagearea,
                        wp.description AS particular,
                        jm.code AS jobmastercode,
                        jm.name AS jobmaster
                    FROM wages wg
                    INNER JOIN lookupvalue wt ON
                        wg.wagetypeid = wt.lkvalid AND wt.active = 1 AND wt.code = 'DGR'
                    INNER JOIN lookupvalue wy ON
                        wg.wageyearid = wy.lkvalid AND wy.active = 1
                    LEFT JOIN lookupvalue wa ON
                        wg.wageareaid = wa.lkvalid AND wa.active = 1
                    INNER JOIN lookupvalue wp ON
                        wg.particularid = wp.lkvalid AND wp.active = 1
                    INNER JOIN jobmaster jm ON
                        wg.jobmasterid = jm.jobmasterid AND jm.active = 1
                    WHERE wg.wagecategoryid = ? AND wg.wageyearid = ? AND wg.wagetypeid = ? AND wg.active=1
                    ORDER BY  wg.wageyearid, wg.jobmasterid, wg.wageareaid, wg.particularid;
                */
            });
            con.query(query,[categoryid,wageyearid,wagetypeid]).then(function (rows, fields) {
                var rowsReturned = rows.length;
                var result = [];
                var wagejobmasters = [];
                var wageareajobmasters = [];
                var particulars = [];
                
                if (rowsReturned > 0) {
                    for (var index = 0; index < rowsReturned; index++) {
                        
                        var particular = new wageModel.particulars(rows[index].particularid, rows[index].particular, rows[index].particularamount);
                        particulars.push(particular);
                        
                        if ((index + 1 == rowsReturned) || (rows[index].wageyearid != rows[index + 1].wageyearid || rows[index].wageareaid != rows[index + 1].wageareaid)) {
                            var wageareajobmaster = new wageModel.wageareajobmaster(rows[index].wageareaid, rows[index].wagearea, particulars);
                            wageareajobmasters.push(wageareajobmaster);
                            particulars = [];
                            
                            if ((index + 1 == rowsReturned) || (rows[index].jobmasterid != rows[index + 1].jobmasterid || rows[index].wageyearid != rows[index + 1].wageyearid)) {
                                var wagejobmaster = new wageModel.wagejobmaster(rows[index].jobmasterid, rows[index].jobmastercode, rows[index].jobmaster, wageareajobmasters);
                                wagejobmasters.push(wagejobmaster);
                                wageareajobmasters = [];
                                
                                if ((index + 1 == rowsReturned) || (rows[index].wageyearid != rows[index + 1].wageyearid)) {
                                    var wage = new wageModel.wages(rows[index].wageid, rows[index].wagetypeid, rows[index].wagetype, rows[index].wageyearid, rows[index].wageyear, wagejobmasters);
                                    result.push(wage);
                                    wagejobmasters = [];
                                }
                            }
                        }
                    }
                }
                resolve(result);
            }).catch(function (err) {
                errorDAL.errorlog('Error',"wageDAL::dgrwages",err.stack,JSON.stringify('MYSQL Error'),"wageDAL");
                reject(err);
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"wageDAL::dgrwages",err.stack,JSON.stringify('MYSQL Error'),"wageDAL");
            reject(err);
        });
    });
}

module.exports.gettnwagedetailsbycategoryid = function (categoryid,wageyearid,wagetypeid) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            var query = multiline.stripIndent(function () {
                /*
                    SELECT  
                        wg.*,wt.description AS wagetype,
                        wy.description AS wageyear,
                        wa.description AS wagearea,
                        wp.description AS particular,
                        jm.code AS jobmastercode,
                        jm.name AS jobmaster
                    FROM wages wg
                    INNER JOIN lookupvalue wt ON
                        wg.wagetypeid = wt.lkvalid AND wt.active = 1 AND wt.code = 'DGR'
                    INNER JOIN lookupvalue wy ON
                        wg.wageyearid = wy.lkvalid AND wy.active = 1
                    LEFT JOIN lookupvalue wa ON
                        wg.wageareaid = wa.lkvalid AND wa.active = 1
                    INNER JOIN lookupvalue wp ON
                        wg.particularid = wp.lkvalid AND wp.active = 1
                    INNER JOIN jobmaster jm ON
                        wg.jobmasterid = jm.jobmasterid AND jm.active = 1
                    WHERE wg.wagecategoryid = ? AND wg.wageyearid = ? AND wg.wagetypeid = ? AND wg.active=1
                    ORDER BY  wg.wageyearid, wg.jobmasterid, wg.wageareaid, wg.particularid;
                */
            });
            con.query(query,[categoryid,wageyearid,wagetypeid]).then(function (rows, fields) {
                var rowsReturned = rows.length;
                var result = [];
                var wagejobmasters = [];
                var wageareajobmasters = [];
                var particulars = [];
                
                if (rowsReturned > 0) {
                    for (var index = 0; index < rowsReturned; index++) {
                        
                        var particular = new wageModel.particulars(rows[index].particularid, rows[index].particular, rows[index].particularamount);
                        particulars.push(particular);
                        
                        if ((index + 1 == rowsReturned) || (rows[index].wageyearid != rows[index + 1].wageyearid || rows[index].wageareaid != rows[index + 1].wageareaid)) {
                            var wageareajobmaster = new wageModel.wageareajobmaster(rows[index].wageareaid, rows[index].wagearea, particulars);
                            wageareajobmasters.push(wageareajobmaster);
                            particulars = [];
                            
                            if ((index + 1 == rowsReturned) || (rows[index].jobmasterid != rows[index + 1].jobmasterid || rows[index].wageyearid != rows[index + 1].wageyearid)) {
                                var wagejobmaster = new wageModel.wagejobmaster(rows[index].jobmasterid, rows[index].jobmastercode, rows[index].jobmaster, wageareajobmasters);
                                wagejobmasters.push(wagejobmaster);
                                wageareajobmasters = [];
                                
                                if ((index + 1 == rowsReturned) || (rows[index].wageyearid != rows[index + 1].wageyearid)) {
                                    var wage = new wageModel.wages(rows[index].wageid, rows[index].wagetypeid, rows[index].wagetype, rows[index].wageyearid, rows[index].wageyear, wagejobmasters);
                                    result.push(wage);
                                    wagejobmasters = [];
                                }
                            }
                        }
                    }
                }
                resolve(result);
            }).catch(function (err) {
                errorDAL.errorlog('Error',"wageDAL::dgrwages",err.stack,JSON.stringify('MYSQL Error'),"wageDAL");
                reject(err);
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"wageDAL::dgrwages",err.stack,JSON.stringify('MYSQL Error'),"wageDAL");
            reject(err);
        });
    });
}

