var app = require('./../app');
var lookupvalueModel = require('./../Model/lookupValue');
var mySqlConnection = require('./MySqlHelper');
var multiline = require('multiline');
var errorDAL = require('./../DAL/errorDAL');

//module.exports.lookupvalues = function (lkdmncode) {
//    return new app.promise(function (resolve, reject) {
//        mySqlConnection.connection().then(function (con) {
//            con.query('SELECT lkvalid, lkdmncode, code, description, sortorder, active FROM lookupvalue WHERE lkdmncode= ? AND active = 1 ORDER BY description', [lkdmncode]).then(function (rows, fields) {
//                var rowsReturned = rows.length;
//                var lookupitems = [];
//                if (rowsReturned > 0) {
//                    var lkdmncode = rows[0].lkdmncode;
//                    for (var i = 0; i < rowsReturned; i++) {
//                        var lookupitem = new lookupvalueModel.lookupitem(rows[i].lkvalid, rows[i].code, rows[i].description, rows[i].sortorder, rows[i].active);
//                        lookupitems.push(lookupitem);
//                    }
//                    var lookupvalues = new lookupvalueModel.lookupvalues(lkdmncode, lookupitems);
//                }
//                resolve(lookupvalues);
//            }).catch(function (err) {
//                reject(err);
//            });
//        }).catch(function (err) {
//            reject(err);
//        });
//    });
//}



module.exports.getWageLoginStatus = function () {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            con.query('SELECT login_status FROM wage_login_details WHERE active = 1').then(function (rows, fields) {
                var rowsReturned = rows.length;
                if (rowsReturned > 0) {
                    resolve({
                        "loginstatus": rows[0].login_status
                    })
                } else {
                    resolve({ "loginstatus": 0});
                }
            }).catch(function (err) {
                errorDAL.errorlog('Error',"lookupvalueDAL::getWageLoginStatus",err.stack,JSON.stringify('query error'),"lookupvalueDAL");
			    reject(err);
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"lookupvalueDAL::getWageLoginStatus",err.stack,JSON.stringify('query error'),"lookupvalueDAL");
            reject(err);
        });
    });
}

module.exports.lookupvaluecode = function (lkdmncode, lkvalid) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            con.query('SELECT code, description FROM lookupvalue WHERE lkvalid= ? AND lkdmncode= ? and active = 1 ORDER BY sortorder', [lkvalid, lkdmncode]).then(function (rows, fields) {
                var rowsReturned = rows.length;
                if (rowsReturned > 0) {
                    resolve({
                        "code": rows[0].code,
                        "description": rows[0].description
                    })
                } else {
                    resolve({});
                }
            }).catch(function (err) {
                errorDAL.errorlog('Error',"lookupvalueDAL::lookupvaluecode",err.stack,JSON.stringify('select query error'),"lookupvalueDAL");
                reject(err);
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"lookupvalueDAL::lookupvaluecode",err.stack,JSON.stringify('mysql error'),"lookupvalueDAL");
            reject(err);
        });
    });
}

module.exports.lookupvalueid = function (lkdmncode, code) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            con.query('SELECT lkvalid,description FROM lookupvalue WHERE lkdmncode= ? AND code= ? and active = 1 ORDER BY sortorder', [lkdmncode, code]).then(function (rows, fields) {
                var rowsReturned = rows.length;
                if (rowsReturned > 0) {
                    resolve({
                        "lkvalid": rows[0].lkvalid,
                        "lkvalue": rows[0].description
                    })
                } else {
                    resolve({});
                }
            }).catch(function (err) {
                errorDAL.errorlog('Error',"lookupvalueDAL::lookupvalueid",err.stack,JSON.stringify('select query error'),"lookupvalueDAL");
                reject(err);
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"lookupvalueDAL::lookupvalueid",err.stack,JSON.stringify('mysql error'),"lookupvalueDAL");
            reject(err);
        });
    });
}

module.exports.addlookupdomain = function (code, description, changedby) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            con.query('INSERT INTO `lookupdomain`(`code`, `description`, `changedby`) VALUES (?, ?, ?)', [code, description, changedby]).then(function (rows, fields) {
                resolve({
                    "lkdmnid": rows[0].insertId
                })
            }).catch(function (err) {
                errorDAL.errorlog('Error',"lookupvalueDAL::addlookupdomain",err.stack,JSON.stringify('insert query error'),"lookupvalueDAL");
                reject(err);
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"lookupvalueDAL::addlookupdomain",err.stack,JSON.stringify('mysql error'),"lookupvalueDAL");
            reject(err);
        });
    });
}

module.exports.addlookupvalues = function (lkdmncode, code, description, sortorder, changedby) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            con.query('INSERT INTO `lookupvalue`(`lkdmncode`, `code`, `description`, `sortorder`, `changedby`) VALUES (?,?,?,?,?)', [lkdmncode, code, description, sortorder, changedby]).then(function (rows, fields) {
                resolve({
                    "lkvalid": rows.insertId
                })
            }).catch(function (err) {
                errorDAL.errorlog('Error',"lookupvalueDAL::addlookupvalues",err.stack,JSON.stringify('inser error'),"lookupvalueDAL");
                reject(err);
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"lookupvalueDAL::addlookupvalues",err.stack,JSON.stringify('mysql error'),"lookupvalueDAL");
            reject(err);
        });
    });
}

module.exports.editlookupvalues = function (lkvalid, lkdmncode, code, description, changedby) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            con.query('UPDATE lookupvalue SET lkdmncode = ?, code = ?, description = ?, changedby = ? WHERE lkvalid= ?', [lkdmncode, code, description, changedby, lkvalid]).then(function (rows, fields) {
                resolve("success");
            }).catch(function (err) {
                errorDAL.errorlog('Error',"lookupvalueDAL::editlookupvalues",err.stack,JSON.stringify('update error'),"lookupvalueDAL");
                reject(err);
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"lookupvalueDAL::editlookupvalues",err.stack,JSON.stringify('mysql error'),"lookupvalueDAL");
            reject(err);
        });
    });
}

module.exports.updatelookupvaluestatus = function (lkvalid) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            con.query('UPDATE lookupvalue SET active = ? WHERE lkvalid= ?', [0, lkvalid]).then(function (rows, fields) {
                resolve("success");
            }).catch(function (err) {
                errorDAL.errorlog('Error',"lookupvalueDAL::updatelookupvaluestatus",err.stack,JSON.stringify('update error'),"lookupvalueDAL");
                reject(err);
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"lookupvalueDAL::updatelookupvaluesttus",err.stack,JSON.stringify('mysql error'),"lookupvalueDAL");
            reject(err);
        });
    });
}

module.exports.alllookupvalues = function () {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            var query = multiline.stripIndent(function () {
                /*
                    SELECT
                        ld.lkdmnid, 
                        ld.code AS domaincode, 
                        ld.description,
                        lv.code,
                        lv.lkdmncode,
                        lv.lkvalid,
                        lv.description,
                        lv.sortorder,
                        lv.active
                    FROM `lookupdomain` ld
                    
                    INNER JOIN `lookupvalue` lv ON
                        lv.lkdmncode = ld.code
                        AND lv.active = 1
                    
                    WHERE lv.active = 1
                    
                    ORDER BY  lv.lkdmncode, lv.sortorder
                */
            });
            con.query(query).then(function (rows, fields) {
                var rowsReturned = rows.length;
                var lookupitems = [];
                var lookups = [];
                if (rowsReturned > 0) {
                    for (var i = 0; i < rowsReturned; i++) {
                        var lookupitem = new lookupvalueModel.lookupitem(rows[i].lkvalid, rows[i].code, rows[i].description, rows[i].sortorder, rows[i].active);
                        lookupitems.push(lookupitem);
                        if ((i + 1 == rowsReturned) || (rows[i].lkdmncode != rows[i + 1].domaincode)) {
                            var lookupvalues = new lookupvalueModel.lookupvalues(rows[i].lkdmncode, lookupitems);
                            lookups.push(lookupvalues);
                            lookupitems = [];
                        }
                    }
                    resolve(lookups);
                } else {
                    resolve({});
                }
            }).catch(function (err) {
                errorDAL.errorlog('Error',"lookupvalueDAL::alllookupvalues",err.stack,JSON.stringify('select query error'),"lookupvalueDAL");
                reject(err);
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"lookupvalueDAL::alllookupvalues",err.stack,JSON.stringify('mysql error'),"lookupvalueDAL");
            reject(err);
        });
    });
}


module.exports.validatelookupvalue = function (lkdmncode, code) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            con.query('SELECT lkvalid FROM lookupvalue WHERE  lkdmncode = ?  AND code = ? ;', [lkdmncode, code]).then(function (rows, fields) {
                if (rows.length > 0) {
                    var response = 1;
                    resolve({
                        "response": response
                    });z
                } else {
                    var response = 2;
                    resolve({
                        "response": response
                    });
                }
            }).catch(function (err) {
                errorDAL.errorlog('Error',"lookupvalueDAL::validatelookupvalue",err.stack,JSON.stringify('select query error'),"lookupvalueDAL");
                reject(err);
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"lookupvalueDAL::validatelookupvalue",err.stack,JSON.stringify('mysql error'),"lookupvalueDAL");
            reject(err);
        });
    });
}

module.exports.lookupvalues = function (lkdmncode) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            var query = multiline.stripIndent(function () {
             /*
                    SELECT 
                        lvl.linkid,
                        lv.lkvalid, 
                        lv.lkdmncode, 
                        lv.code, 
                        lv.description, 
                        lv.sortorder,
                        lv.active,
                        lv2.lkvalid AS linklkvalid, 
                        lv2.lkdmncode AS linklkdmncode, 
                        lv2.code AS linkcode, 
                        lv2.description AS linkdescription, 
                        lv2.sortorder AS linksortorder,
                        lvl.to_lkvalid AS districtid,
                        lvl.from_lkvalid AS regionid,
                        lv2.active AS linkactive
                    FROM `lookupvalue` lv 

                    LEFT JOIN `lookupvaluelink` lvl ON
                        lvl.from_lkvalid = lv.lkvalid
                    AND lvl.active = 1

                    LEFT JOIN `lookupvalue` lv2 ON
                        lvl.to_lkvalid = lv2.lkvalid
                    AND lv2.active = 1
                        
                    WHERE lv.lkdmncode= ? AND lv.active = 1 ORDER BY lv.sortorder ASC
              */
            });
            con.query(query, [lkdmncode]).then(function (rows, fields) {
                var rowsReturned = rows.length;
                var lookupitems = [];
                var lookupdetails = [];
                if (rowsReturned > 0) {
                    var lkdmncode = rows[0].lkdmncode;
                    for (var i = 0; i < rowsReturned; i++) {
                        if (rows[i].linklkvalid > 0) {
                            var lookupitem = new lookupvalueModel.lookupitem(rows[i].linklkvalid, rows[i].linkcode, rows[i].linkdescription, rows[i].linksortorder, rows[i].linkactive, rows[i].linkid);
                            lookupitems.push(lookupitem);
                        }
                        if ((i + 1 == rowsReturned) || (rows[i].lkvalid != rows[i + 1].regionid)) {
                            var lookupdetail = new lookupvalueModel.lookupdetails(rows[i].lkvalid, rows[i].code, rows[i].description, rows[i].sortorder, rows[i].active, lookupitems);
                            lookupdetails.push(lookupdetail);
                            lookupitems = [];
                        }
                    }
                    var lookupvalues = new lookupvalueModel.lookupvalues(lkdmncode, lookupdetails);
                }
                resolve(lookupvalues);
            }).catch(function (err) {
                errorDAL.errorlog('Error',"lookupvalueDAL::lookupvalues",err.stack,JSON.stringify(query),"lookupvalueDAL");
                reject(err);
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"lookupvalueDAL::lookupvalues",err.stack,JSON.stringify('mysql error'),"lookupvalueDAL");
            reject(err);
        });
    });
}

module.exports.getmaplookupvalues = function (lkdmncode) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            var query = multiline.stripIndent(function () {
                /*
                    SELECT 
                        lv.lkvalid AS regionid,lv.code AS regioncode,lv.description AS regionname,lv1.lkvalid AS districtid,
                        lv1.code AS districtcode,lv1.description AS districtname,lv2.lkvalid AS talukid,
                        lv2.code AS talukcode,lv2.description AS talukname,rd.id AS regionmapid
                    FROM  lookupvalue lv 
                    LEFT JOIN region_details rd ON rd.rg_id = lv.lkvalid
                    LEFT JOIN lookupvalue lv1 ON lv1.lkvalid = rd.dt_id
                    LEFT JOIN lookupvalue lv2 ON lv2.lkvalid = rd.tk_id
                    WHERE lv.lkdmncode = ? ORDER BY lv.lkvalid ASC;
                */
            });
            con.query(query, [lkdmncode]).then(function (rows, fields) {
                var rowsReturned = rows.length;
                var lookupitems = [];
                var lookupdetails = [];
                if (rowsReturned > 0) {
                    for (var i = 0; i < rowsReturned; i++) {
                        var lookupitem = new lookupvalueModel.talukitem(rows[i].districtid, rows[i].districtcode, rows[i].districtname, rows[i].talukid, rows[i].talukcode, rows[i].talukname, rows[i].regionmapid);
                        lookupitems.push(lookupitem);
                        if ((i + 1 == rowsReturned) || (rows[i].regionid != rows[i + 1].regionid)) {
                            var lookupdetail = new lookupvalueModel.talukitemdetails(rows[i].regionid, rows[i].regioncode, rows[i].regionname, lookupitems);
                            lookupdetails.push(lookupdetail);
                            lookupitems = [];
                        }
                    }
                }
                resolve(lookupdetails);
            }).catch(function (err) {
                errorDAL.errorlog('Error',"lookupvalueDAL::getmaplookupvalues",err.stack,JSON.stringify(query),"lookupvalueDAL");
                reject(err);
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"lookupvalueDAL::getmaplookupvalues",err.stack,JSON.stringify('mysql error'),"lookupvalueDAL");
            reject(err);
        });
    });
}

module.exports.getlookuptaluk  = function (lkdmncode) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            var query = multiline.stripIndent(function () {
                /*
                    SELECT 
                        '0' AS districtid,'0' AS districtcode,'0' AS districtname,
                        lv.lkvalid AS talukid,lv.code AS talukcode,lv.description AS talukname
                    FROM  lookupvalue lv 
                    WHERE lv.lkdmncode = ? ORDER BY lv.lkvalid ASC;
                */
            });
            con.query(query, [lkdmncode]).then(function (rows, fields) {
                var rowsReturned = rows.length;
                var lookupitems = [];
                var lookupdetails = [];
                if (rowsReturned > 0) {
                    for (var i = 0; i < rowsReturned; i++) {
                        var lookupitem = new lookupvalueModel.talukitem(rows[i].districtid, rows[i].districtcode, rows[i].districtname, rows[i].talukid, rows[i].talukcode, rows[i].talukname, 0);
                        lookupitems.push(lookupitem);
                    }
                }
                resolve(lookupitems);
            }).catch(function (err) {
                errorDAL.errorlog('Error',"lookupvalueDAL::getlookuptaluk",err.stack,JSON.stringify(query),"lookupvalueDAL");
                reject(err);
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"lookupvalueDAL::getlookuptalk",err.stack,JSON.stringify('mysql error'),"lookupvalueDAL");
            reject(err);
        });
    });
}

module.exports.addlinklookup = function (fromlkvalid, tolkvalid) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            con.query('INSERT INTO `lookupvaluelink`(`from_lkvalid`, `to_lkvalid`) VALUES (?,?);', [fromlkvalid, tolkvalid]).then(function (rows, fields) {
                resolve({
                    "lkvalid": rows.insertId
                })
            }).catch(function (err) {
                errorDAL.errorlog('Error',"lookupvalueDAL::addlinklookup",err.stack,JSON.stringify('insert query error'),"lookupvalueDAL");
                reject(err);
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"lookupvalueDAL::addlinklookup",err.stack,JSON.stringify('mysql error'),"lookupvalueDAL");
            reject(err);
        });
    });
}

module.exports.deletelinklookup = function (linkid) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            con.query('DELETE FROM `lookupvaluelink` WHERE `linkid` = ?;', [linkid]).then(function (rows, fields) {
                resolve({
                    "linkid": linkid
                })
            }).catch(function (err) {
                errorDAL.errorlog('Error',"lookupvalueDAL::deletelinklookup",err.stack,JSON.stringify('delete error'),"lookupvalueDAL");
                reject(err);
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"lookupvalueDAL::deletelinklookup",err.stack,JSON.stringify('mysql error'),"lookupvalueDAL");
            reject(err);
        });
    });
}

module.exports.editlinklookup = function (fromlkvalid, tolkvalid, linkid) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            con.query('UPDATE lookupvaluelink SET from_lkvalid = ?, to_lkvalid = ? WHERE linkid = ?;', [fromlkvalid, tolkvalid, linkid]).then(function (rows, fields) {
                resolve({
                    "linkid": linkid
                })
            }).catch(function (err) {
                errorDAL.errorlog('Error',"lookupvalueDAL::editlinkloookup",err.stack,JSON.stringify('update query error'),"lookupvalueDAL");
                reject(err);
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"lookupvalueDAL::editlinklookup",err.stack,JSON.stringify('mysql error'),"lookupvalueDAL");
            reject(err);
        });
    });
}

module.exports.categoryValues = function () {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            var query = multiline.stripIndent(function () {
                /*
                    SELECT * FROM wage_category_master WHERE active = 1;
                */
            });
            con.query(query).then(function (rows, fields) {
                var rowsReturned = rows.length;
                var results = [];
                if (rowsReturned > 0) {
                    for (var i = 0; i < rowsReturned; i++) {
                        var res = new lookupvalueModel.CategoryValues(rows[i].category_id, rows[i].category_code, rows[i].category_description, rows[i].wageyearid, rows[i].wagetypeid);
                        results.push(res);
                    }
                }
                resolve(results);
            }).catch(function (err) {
                errorDAL.errorlog('Error',"lookupvalueDAL::categoryvalues",err.stack,JSON.stringify('select error'),"lookupvalueDAL");
                reject(err);
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"lookupvalueDAL::categoryvalues",err.stack,JSON.stringify('mysql error'),"lookupvalueDAL");
            reject(err);
        });
    });
}

module.exports.allcategoryvalues = function () {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            var query = multiline.stripIndent(function () {
                /*
                    SELECT cs.categoryid,cs.categoryname,cs.active,scs.subcategoryid,scs.subcategoryname,scs.active FROM category cs
                    INNER JOIN subcategory scs ON scs.categoryid = cs.categoryid
                    WHERE cs.active = 1 AND scs.active = 1 ORDER BY cs.categoryid ASC;
                */
            });
            con.query(query).then(function (rows, fields) {
                var rowsReturned = rows.length;
                var lookupitems = [];
                var lookups = [];
                if (rowsReturned > 0) {
                    for (var i = 0; i < rowsReturned; i++) {
                        var lookupitem = new lookupvalueModel.categoryitem(rows[i].subcategoryid, rows[i].subcategoryname, rows[i].active,rows[i].categoryname);
                        lookupitems.push(lookupitem);
                        if ((i + 1 == rowsReturned) || (rows[i].categoryid != rows[i + 1].categoryid)) {
                            var lookupvalues = new lookupvalueModel.subcategoryitem(rows[i].categoryid,rows[i].categoryname, rows[i].active, lookupitems);
                            lookups.push(lookupvalues);
                            lookupitems = [];
                        }
                    }
                    resolve(lookups);
                } else {
                    resolve({});
                }
            }).catch(function (err) {
                errorDAL.errorlog('Error',"lookupvalueDAL::allcategoryvalues",err.stack,JSON.stringify(query),"lookupvalueDAL");
                reject(err);
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"lookupvalueDAL::allcategoryvalues",err.stack,JSON.stringify('mysql error'),"lookupvalueDAL");
            reject(err);
        });
    });
}

module.exports.validatecategory = function (categoryname) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            con.query('SELECT categoryid FROM category WHERE categoryname = ?;', [categoryname]).then(function (rows, fields) {
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
                errorDAL.errorlog('Error',"lookupvalueDAL::validatecategory",err.stack,JSON.stringify(categoryname),"lookupvalueDAL");
                reject(err);
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"lookupvalueDAL::validatecategory",err.stack,JSON.stringify('mysql error'),"lookupvalueDAL");
            reject(err);
        });
    });
} 

module.exports.addmaincategory = function (maincategoryid, categoryname, changedby) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            con.query("CALL addcategory (?, ?, ?);", [maincategoryid, categoryname, changedby]).then(function (rows, fields) {
                resolve("success");
            }).catch(function (err) {
                errorDAL.errorlog('Error',"lookupvalueDAL::addmaincategory",err.stack,JSON.stringify(maincategoryid, categoryname, changedby),"lookupvalueDAL");
                reject(err);
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"lookupvalueDAL::addmaincategory",err.stack,JSON.stringify('mysql error'),"lookupvalueDAL");
             reject(err);
        });
    });
}

module.exports.getmaincategory = function () {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            var query = multiline.stripIndent(function () {
                /*
                    SELECT * FROM category WHERE active = 1;
                */
            });
            con.query(query).then(function (rows, fields) {
                var rowsReturned = rows.length;
                var results = [];
                if (rowsReturned > 0) {
                    for (var i = 0; i < rowsReturned; i++) {
                        var res = new lookupvalueModel.MainCategoryValues(rows[i].categoryid, rows[i].maincategoryid, rows[i].categoryname);
                        results.push(res);
                    }
                }
                resolve(results);
            }).catch(function (err) {
                errorDAL.errorlog('Error',"lookupvalueDAL::getmaincategory",err.stack,JSON.stringify('select query error'),"lookupvalueDAL");
                reject(err);
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"lookupvalueDAL::getmaincategory",err.stack,JSON.stringify('mysql error'),"lookupvalueDAL");
            reject(err);
        });
    });
}

module.exports.validatesubcategory = function (categoryid, subcategoryname) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            con.query('SELECT categoryid FROM subcategory WHERE subcategoryname = ? AND categoryid = ?;', [subcategoryname,categoryid]).then(function (rows, fields) {
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
                errorDAL.errorlog('Error',"lookupvalueDAL::validatesubcategory",err.stack,JSON.stringify(categoryid,subcategoryname),"lookupvalueDAL");
                reject(err);
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"lookupvalueDAL::validatesubcategory",err.stack,JSON.stringify('mysql error'),"lookupvalueDAL");
            reject(err);
        });
    });
} 

module.exports.addsubcategory = function (categoryid, subcategoryname, changedby) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            // console.log('categoryid, subcategoryname, changedby',categoryid, subcategoryname, changedby);
            con.query("CALL addsubcategory (?, ?, ?);", [categoryid, subcategoryname, changedby]).then(function (rows, fields) {
                resolve("success");
            }).catch(function (err) {
                errorDAL.errorlog('Error',"lookupvalueDAL::addsubcategory",err.stack,JSON.stringify(categoryid,subcategoryname,changedby),"lookupvalueDAL");
                reject(err);
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"lookupvalueDAL::addsubcategory",err.stack,JSON.stringify('mysql error'),"lookupvalueDAL");
            reject(err);
        });
    });
}

module.exports.editsubcategory = function (subcategoryid, categoryid, subcategoryname) {
    // console.log('subcategoryid, categoryid, subcategoryname',subcategoryid, categoryid, subcategoryname);
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            con.query("UPDATE subcategory SET categoryid = ? , subcategoryname = ? WHERE subcategoryid = ?;", [categoryid, subcategoryname, subcategoryid]).then(function (rows, fields) {
                resolve("success");
            }).catch(function (err) {
                errorDAL.errorlog('Error',"lookupvalueDAL::editsubcategory",err.stack,JSON.stringify('query error'),"lookupvalueDAL");
                reject(err);
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"lookupvalueDAL::editsubcategory",err.stack,JSON.stringify('mysql error'),"lookupvalueDAL");
            reject(err);
        });
    });
}


module.exports.validatetalukvalue = function (regionid, districtid, talukid) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            con.query('SELECT id FROM region_details WHERE rg_id = ? AND dt_id = ? AND tk_id = ?;', [regionid, districtid, talukid]).then(function (rows, fields) {
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
                errorDAL.errorlog('Error',"lookupvalueDAL::validatetalukvalue",err.stack,JSON.stringify(regionid, districtid, talukid),"lookupvalueDAL");
                reject(err);
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"lookupvalueDAL::validatetalukvalue",err.stack,JSON.stringify('mysql error'),"lookupvalueDAL");
            reject(err);
        });
    });
}

module.exports.addtaluklookup = function (regionid, districtid, talukid) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            con.query('INSERT INTO `region_details`(`rg_id`,`dt_id`,`tk_id`) VALUES (?,?,?);', [regionid, districtid, talukid]).then(function (rows, fields) {
                resolve({
                    "id": rows.insertId
                })
            }).catch(function (err) {
                errorDAL.errorlog('Error',"lookupvalueDAL::addtaluklookup",err.stack,JSON.stringify(regionid, districtid, talukid),"lookupvalueDAL");
                reject(err);
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"lookupvalueDAL::addtaluklookup",err.stack,JSON.stringify('mysql error'),"lookupvalueDAL");
            reject(err);
        });
    });
}

module.exports.deletetaluklookup = function (regionmapid) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            con.query('DELETE FROM `region_details` WHERE `id` = ?;', [regionmapid]).then(function (rows, fields) {
                resolve({
                    "id": regionmapid
                })
            }).catch(function (err) {
                errorDAL.errorlog('Error',"lookupvalueDAL::deletetaluklookup",err.stack,JSON.stringify(regionmapid),"lookupvalueDAL");
                reject(err);
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"lookupvalueDAL::deletetaluklookup",err.stack,JSON.stringify('mysql error'),"lookupvalueDAL");
            reject(err);
        });
    });
}

module.exports.edittaluklookup = function (regionmapid, regionid, districtid, talukid) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            con.query('UPDATE region_details SET `rg_id` = ?,`dt_id` = ?,`tk_id` = ? WHERE id = ?;', [regionid, districtid, talukid,regionmapid]).then(function (rows, fields) {
                resolve({
                    "id": regionmapid
                })
            }).catch(function (err) {
                errorDAL.errorlog('Error',"lookupvalueDAL::edittaluklookup",err.stack,JSON.stringify('update error'),"lookupvalueDAL");
                reject(err);
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"lookupvalueDAL::edittaluklookup",err.stack,JSON.stringify('mysql error'),"lookupvalueDAL");
            reject(err);
        });
    });
}


module.exports.checkwagepassword = function (wpassword) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            con.query('SELECT value FROM setting WHERE code = "WPWD" AND value = ?;UPDATE wage_login_details SET login_status = 1;',[wpassword]).then(function (rows, fields) {
                console.log('rows',rows[0]);
                if (rows[0].length > 0) {
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
                errorDAL.errorlog('Error',"lookupvalueDAL::checkwagepassword",err.stack,JSON.stringify(wpassword),"lookupvalueDAL");
                reject(err);
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"lookupvalueDAL::checkwagepassword",err.stack,JSON.stringify('mysql error'),"lookupvalueDAL");
            reject(err);
        });
    });
}

module.exports.deletecategoryvalues = function (subcategoryid) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) { 
            // console.log('subcategoryid',subcategoryid);
            con.query('DELETE FROM `subcategory` WHERE `subcategoryid` = ?;', [subcategoryid]).then(function (rows, fields) {
                resolve({
                    "subcategoryid": subcategoryid
                })
            }).catch(function (err) {
                errorDAL.errorlog('Error',"lookupvalueDAL::deletecategoryvalues",err.stack,JSON.stringify(subcategoryid),"lookupvalueDAL");
                reject(err);
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"lookupvalueDAL::deletecategoryvalues",err.stack,JSON.stringify('mysql error'),"lookupvalueDAL");
            reject(err);
        });
    });
}