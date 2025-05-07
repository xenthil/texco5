var app = require('./../app');
var mySqlConnection = require('./MySqlHelper');
var multiline = require('multiline');
var documentModel = require('./../Model/document');
var mkdirp = require('mkdirp');
var errorDAL = require('./../DAL/errorDAL');

module.exports.createdocument = function (document) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            con.query('INSERT INTO document SET ?', document).then(function (rows, fields) {
                resolve({
                    "documentid": rows.insertId
                })
            }).catch(function (err) {
                errorDAL.errorlog('Error',"documentDAL::createdocument",err.stack,JSON.stringify('query error'),"documentDAL");
			    reject(err);
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"documentDAL::createdocument",err.stack,JSON.stringify('mysql error'),"documentDAL");
			reject(err);
        });
    });
} 
module.exports.createfolder = function (foldername) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            con.query('INSERT INTO documentfolder (foldername) VALUES (?) ', foldername).then(function (rows, fields) {
                mkdirp('C:/Inetpub/vhosts/texco.in/httpdocs/assets/document/'+foldername, function(err) { 
                    resolve({
                        "documentid": rows.insertId
                    })
                });
            }).catch(function (err) {
                errorDAL.errorlog('Error',"documentDAL::createfolder",err.stack,JSON.stringify('query error'),"documentDAL");
                reject(err);
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"documentDAL::createfolder",err.stack,JSON.stringify('mysql error'),"documentDAL");
			reject(err);
        });
    });
}
module.exports.checkFolderName = function (foldername) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            con.query('SELECT COUNT(*) as foldervals FROM documentfolder WHERE status=1 AND foldername = ?', foldername).then(function (rows, fields) {
                resolve({
                    "foldervals": rows[0].foldervals
                })
            }).catch(function (err) {
                errorDAL.errorlog('Error',"documentDAL::checkfoldername",err.stack,JSON.stringify('query error'),"documentDAL");
                reject(err);
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"documentDAL::checkfoldername",err.stack,JSON.stringify('mysql error'),"documentDAL");
			reject(err);
        });
    });
}

module.exports.getdocumentfolders = function (foldername) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            con.query('SELECT * FROM documentfolder WHERE status=1 ORDER BY createddate DESC').then(function (rows, fields) {
                resolve({
                    "foldervals": rows
                })
            }).catch(function (err) {
                errorDAL.errorlog('Error',"documentDAL::getdocumentfolders",err.stack,JSON.stringify('query error'),"documentDAL");
                reject(err);
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"documentDAL::getdocumentfodlers",err.stack,JSON.stringify('mysql error'),"documentDAL");
			reject(err);
        });
    });
}

module.exports.updatedocument = function (document, documentid) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            con.query('UPDATE document SET ? WHERE documentid= ?', [document, documentid]).then(function (rows, fields) {
                resolve({
                    "documentid": documentid
                })
            }).catch(function (err) {
                errorDAL.errorlog('Error',"documentDAL::updatedocument",err.stack,JSON.stringify('query error'),"documentDAL");
                reject(err);
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"documentDAL::updatedocument",err.stack,JSON.stringify('mysql error'),"documentDAL");
			reject(err);
        });
    });
}

module.exports.getdocumentbyfolderid = function (folderid) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            var query = multiline.stripIndent(function () {
                /*
                    SELECT 
	                    d.documentid, 
	                    d.documentname,
                        d.description,
                        d.name,
	                    d.icon, 
	                    d.iconcolour, 
	                    d.changedby,
                        d.ispf,
                        d.isgst,
                        d.iswage ,
                        d.folderid,
                        d.foldername                         
                    FROM document d
                    WHERE d.active = 1
                    AND d.folderid = ?
                    ORDER BY  d.createdttm,d.documentid DESC
                */
            });
            con.query(query, [folderid]).then(function (rows, fields) {
                var rowsReturned = rows.length;
                var result = [];
                if (rowsReturned > 0) {
                    for (var i = 0; i < rowsReturned; i++) {
                        var document = new documentModel.getdocument(rows[i].documentid, rows[i].name, rows[i].icon, rows[i].iconcolour, rows[i].documentname, rows[i].description, rows[i].changedby, rows[i].issgt, rows[i].ispf, rows[i].iswage,rows[i].folderid,rows[i].foldername);
                        result.push(document);
                    }
                }
                resolve(result);
            }).catch(function (err) {
                errorDAL.errorlog('Error',"documentDAL::getdocument",err.stack,JSON.stringify(folderid),"documentDAL");
			    reject(err);
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"documentDAL::getdocument",err.stack,JSON.stringify('mysql error'),"documentDAL");
			reject(err);
        });
    });
}


module.exports.getdocument = function (documentid) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            var query = multiline.stripIndent(function () {
                /*
                    SELECT 
	                    d.documentid, 
	                    d.documentname,
                        d.description,
                        d.name,
	                    d.icon, 
	                    d.iconcolour, 
	                    d.changedby,
                        d.ispf,
                        d.isgst,
                        d.iswage ,
                        d.folderid,
                        d.foldername                         
                    FROM document d
                    WHERE d.active = 1
                    AND case ? when 0 then 1 = 1 else  d.documentid = ? end
                    ORDER BY  d.createdttm,d.documentid DESC
                */
            });
            con.query(query, [documentid, documentid]).then(function (rows, fields) {
                var rowsReturned = rows.length;
                var result = [];
                if (rowsReturned > 0) {
                    for (var i = 0; i < rowsReturned; i++) { 
                        var document = new documentModel.getdocument(rows[i].documentid, rows[i].name, rows[i].icon, rows[i].iconcolour, rows[i].documentname, rows[i].description, rows[i].changedby, rows[i].issgt, rows[i].ispf, rows[i].iswage,(rows[i].folderid ? parseInt(rows[i].folderid) : 0),(rows[i].foldername ? rows[i].foldername : "")); 
                        result.push(document);
                    } 
                }
                resolve(result);
            }).catch(function (err) {
                errorDAL.errorlog('Error',"documentDAL::getdocument",err.stack,JSON.stringify(documentid),"documentDAL");
			    reject(err);
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"documentDAL::getdocument",err.stack,JSON.stringify('mysql error'),"documentDAL");
			reject(err);
        });
    });
}

module.exports.updatedocumentstatus = function (documentid) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            con.query('UPDATE document SET active = ? WHERE documentid= ?', [0, documentid]).then(function (rows, fields) {
                resolve({
                    "documentid": documentid
                })
            }).catch(function (err) {
                errorDAL.errorlog('Error',"documentDAL::updatedocumentstatus",err.stack,JSON.stringify(documentid),"documentDAL");
			    reject(err);
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"documentDAL::updatedocumentstatus",err.stack,JSON.stringify('mysql error'),"documentDAL");
			reject(err);
        });
    });
}

module.exports.getpfdocument = function (documentid) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            var query = multiline.stripIndent(function () {
                /*
                    SELECT 
	                    d.documentid, 
	                    d.documentname,
                        d.description,
                        d.name,
	                    d.icon, 
	                    d.iconcolour, 
	                    d.changedby
                
                    FROM document d

                    WHERE d.active = 1 AND ispf = 1
                  
                    AND case ? when 0 then 1 = 1 else  d.documentid = ? end
            
                    ORDER BY  d.documentid
            */
            });
            con.query(query, [documentid, documentid]).then(function (rows, fields) {
                var rowsReturned = rows.length;
                var result = [];
                if (rowsReturned > 0) {
                    for (var i = 0; i < rowsReturned; i++) {
                        var document = new documentModel.getdocument(rows[i].documentid, rows[i].name, rows[i].icon, rows[i].iconcolour, rows[i].documentname, rows[i].description, rows[i].changedby);
                        result.push(document);
                    }
                }
                resolve(result);
            }).catch(function (err) {
                errorDAL.errorlog('Error',"documentDAL::getpfdocument",err.stack,JSON.stringify('query error'),"documentDAL");
			    reject(err);
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"documentDAL::getpfdocument",err.stack,JSON.stringify('mysql error'),"documentDAL");
			reject(err);
        });
    });
}

module.exports.getdocumentDetails = function (foldername) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            var query = multiline.stripIndent(function () {
                /*
                    SELECT 
	                    d.documentid, 
	                    d.documentname,
                        d.description,
                        d.foldername,
                        d.folderid,
                        d.name,
	                    d.icon, 
	                    d.iconcolour, 
	                    d.changedby
                    FROM document d
                    WHERE d.active = 1 AND d.folderid = ?
                    ORDER BY  d.createdttm,d.documentid DESC
                */
            });
            con.query(query, [foldername]).then(function (rows, fields) {
                var rowsReturned = rows.length;
                var result = [];
                if (rowsReturned > 0) {
                    for (var i = 0; i < rowsReturned; i++) {  
                        var document = new documentModel.getdocument(rows[i].documentid, rows[i].name, rows[i].icon, rows[i].iconcolour, rows[i].documentname, rows[i].description, rows[i].changedby,'','','',rows[i].folderid,rows[i].foldername);
                        result.push(document);
                    }
                }
                resolve(result);
            }).catch(function (err) {
                errorDAL.errorlog('Error',"documentDAL::getdocumentDetails",err.stack,JSON.stringify('query error'),"documentDAL");
			    reject(err);
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"documentDAL::getdocumentDetails",err.stack,JSON.stringify('mysql error'),"documentDAL");
			reject(err);
        });
    });
}

module.exports.getgstdocument = function (documentid) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            var query = multiline.stripIndent(function () {
                /*
                    SELECT 
	                    d.documentid, 
	                    d.documentname,
                        d.description,
                        d.name,
	                    d.icon, 
	                    d.iconcolour, 
	                    d.changedby
                
                    FROM document d

                    WHERE d.active = 1 AND isgst = 1
                  
                    AND case ? when 0 then 1 = 1 else  d.documentid = ? end
            
                    ORDER BY  d.documentid
            */
            });
            con.query(query, [documentid, documentid]).then(function (rows, fields) {
                var rowsReturned = rows.length;
                var result = [];
                if (rowsReturned > 0) {
                    for (var i = 0; i < rowsReturned; i++) {
                        var document = new documentModel.getdocument(rows[i].documentid, rows[i].name, rows[i].icon, rows[i].iconcolour, rows[i].documentname, rows[i].description, rows[i].changedby);
                        result.push(document);
                    }
                }
                resolve(result);
            }).catch(function (err) {
                errorDAL.errorlog('Error',"documentDAL::getgstdocument",err.stack,JSON.stringify('query error'),"documentDAL");
			    reject(err);
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"documentDAL::getgstdocument",err.stack,JSON.stringify('mysql error'),"documentDAL");
			reject(err);
        });
    });
}


module.exports.getwagedocument = function (documentid) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            var query = multiline.stripIndent(function () {
                /*
                    SELECT 
	                    d.documentid, 
	                    d.documentname,
                        d.description,
                        d.name,
	                    d.icon, 
	                    d.iconcolour, 
	                    d.changedby
                
                    FROM document d

                    WHERE d.active = 1 AND iswage = 1
                  
                    AND case ? when 0 then 1 = 1 else  d.documentid = ? end
            
                    ORDER BY  d.documentid
            */
            });
            con.query(query, [documentid, documentid]).then(function (rows, fields) {
                var rowsReturned = rows.length;
                var result = [];
                if (rowsReturned > 0) {
                    for (var i = 0; i < rowsReturned; i++) {
                        var document = new documentModel.getdocument(rows[i].documentid, rows[i].name, rows[i].icon, rows[i].iconcolour, rows[i].documentname, rows[i].description, rows[i].changedby);
                        result.push(document);
                    }
                }
                resolve(result);
            }).catch(function (err) {
                errorDAL.errorlog('Error',"documentDAL::getwagedocument",err.stack,JSON.stringify('query error'),"documentDAL");
			    reject(err);
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"documentDAL::getwagedocument",err.stack,JSON.stringify('mysql error'),"documentDAL");
			reject(err);
        });
    });
}


module.exports.getdocumentonly = function () {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            var query = multiline.stripIndent(function () {
                /*
                    SELECT 
	                    d.documentid, 
	                    d.documentname,
                        d.description,
                        d.name,
	                    d.icon, 
	                    d.iconcolour, 
	                    d.changedby,
                        d.ispf,
                        d.isgst,
                        d.iswage                                
                    FROM document d

                    WHERE d.active = 1
                  
                    AND d.folderid = 0
            
                    ORDER BY  d.createdttm,d.documentid DESC
            */
            });
            con.query(query).then(function (rows, fields) {
                var rowsReturned = rows.length;
                var result = [];
                if (rowsReturned > 0) {
                    for (var i = 0; i < rowsReturned; i++) {
                        var document = new documentModel.getdocument(rows[i].documentid, rows[i].name, rows[i].icon, rows[i].iconcolour, rows[i].documentname, rows[i].description, rows[i].changedby, rows[i].issgt, rows[i].ispf);
                        result.push(document);
                    }
                }
                resolve(result);
            }).catch(function (err) {
                errorDAL.errorlog('Error',"documentDAL::getdocumentonly",err.stack,JSON.stringify('query error'),"documentDAL");
                reject(err);
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"documentDAL::getdocumentonly",err.stack,JSON.stringify('mysql error'),"documentDAL");
			reject(err);
        });
    });
createdttm}