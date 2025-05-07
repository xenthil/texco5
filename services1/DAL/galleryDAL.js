var app = require('./../app');
var mySqlConnection = require('./MySqlHelper');
var multiline = require('multiline');
var galleryModel = require('./../Model/gallery');
var errorDAL = require('./../DAL/errorDAL');

module.exports.creategallery = function (gallery, images) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            if (images.length > 0) {
                var queries = '';
                images.forEach(function (item) {
                    queries += con.format("INSERT INTO `gallery`( `group`, `description`,  `image`, `changedby`) VALUES (?,?,?,?);", [gallery.group, gallery.description, item, gallery.changedby])
                });
                con.query(queries).then(function (rows, fields) {
                    resolve("Success");
                }).catch(function (err) {
                    errorDAL.errorlog('Error',"galleryDAL::creategallery",err.stack,JSON.stringify('query error'),"galleryDAL");
			        reject(err);
                });
            }
        }).catch(function (err) {
            errorDAL.errorlog('Error',"galleryDAL::creategallery",err.stack,JSON.stringify('mysql error'),"galleryDAL");
			reject(err);
        });
    });
}

//module.exports.updategallery = function (gallery, images) {
//    return new app.promise(function (resolve, reject) {
//        mySqlConnection.connection().then(function (con) {
//            if (images.length > 0) {
//                var queries = '';
//                images.forEach(function (item) {
//                    queries += con.format("UPDATE  gallery  g SET  g.description=?, g.image=?, g.changedby=?  WHERE g.group=?", [gallery.description, item, gallery.changedby, gallery.group])
//                });
//                con.query(queries).then(function (rows, fields) {
//                    resolve("Success");
//                }).catch(function (err) {
//                    reject(err);
//                });
//            }
//        }).catch(function (err) {
//            reject(err);
//        });
//    });
//}

module.exports.getgallery = function (galleryid) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            var query = multiline.stripIndent(function () {
                /*
                    SELECT 
	                    g.galleryid, 
	                    g.group,
	                    g.image, 
                        g.description, 
	                    g.active, 
	                    g.changedby
                    FROM gallery g
                    WHERE g.active = 1
                    AND case ? when 0 then 1 = 1 else  g.galleryid = ? end
                    ORDER BY  g.group
                */
            });
            con.query(query, [galleryid, galleryid]).then(function (rows, fields) {
                var rowsReturned = rows.length;
                var result = [];
                var images = [];
                var gallery = {};
                if (rowsReturned > 0) {
                    for (var i = 0; i < rowsReturned; i++) {
                        var obj = new galleryModel.group(rows[i].galleryid, rows[i].image);
                        images.push(obj);
                        if ((i + 1 == rowsReturned) || (rows[i].group != rows[i + 1].group)) {
                            var gallery = new galleryModel.gallery(rows[i].group, rows[i].description, images);
                            result.push(gallery)
                            images = [];
                        }
                    }
                }
                resolve(result);
            }).catch(function (err) {
                errorDAL.errorlog('Error',"galleryDAL::getgallery",err.stack,JSON.stringify('query error'),"galleryDAL");
			    reject(err);
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"galleryDAL::getgallery",err.stack,JSON.stringify('mysql error'),"galleryDAL");
			reject(err);
        });
    });
}

module.exports.getgallerybygroup = function (group) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            var query = multiline.stripIndent(function () {
                /*
                    SELECT 
	                    g.galleryid, 
	                    g.group,
	                    g.image, 
                        g.description, 
	                    g.active, 
	                    g.changedby
                
                    FROM gallery g

                    WHERE g.active = 1
                  
                    AND g.group=?
            */
            });
            con.query(query, [group]).then(function (rows, fields) {
                var rowsReturned = rows.length;
                
                var images = [];
                var gallery = {};
                if (rowsReturned > 0) {
                    for (var i = 0; i < rowsReturned; i++) {
                        var obj = new galleryModel.group(rows[i].galleryid, rows[i].image);
                        images.push(obj);
                        if ((i + 1 == rowsReturned) || (rows[i].group != rows[i + 1].group)) {
                            var gallery = new galleryModel.gallery(rows[i].group, rows[i].description, images);
                            images = [];
                        }
                    }
                }
                resolve(gallery);
            }).catch(function (err) {
                errorDAL.errorlog('Error',"galleryDAL::getgallerybygroup",err.stack,JSON.stringify('query error'),"galleryDAL");
			    reject(err);
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"galleryDAL::getgallerybygroup",err.stack,JSON.stringify('mysql error'),"galleryDAL");
			reject(err);
        });
    });
}

module.exports.updategallerystatus = function (galleryid) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            var queries = '';
            queries += con.format('UPDATE gallery SET active = ? WHERE galleryid= ?;', [0, galleryid])
            queries += con.format('SELECT g.group, g.image from gallery g WHERE g.galleryid=?;', [galleryid]);

            con.query(queries).then(function (rows, fields) {
                resolve({
                    "image": rows[1][0].image,
                    "group": rows[1][0].group
                })
            }).catch(function (err) {
                errorDAL.errorlog('Error',"galleryDAL::updategallerystatus",err.stack,JSON.stringify(queries),"galleryDAL");
			    reject(err);
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"galleryDAL::updategallerystatus",err.stack,JSON.stringify('mysql error'),"galleryDAL");
            reject(err);
        });
    });
}

module.exports.removegallery = function (group) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            con.query('UPDATE gallery g SET g.active = ? WHERE g.group = ?', [0, group]).then(function (rows, fields) {
                resolve({
                    "group": group
                })
            }).catch(function (err) {
                errorDAL.errorlog('Error',"galleryDAL::removegallery",err.stack,JSON.stringify('mysql error'),"galleryDAL");
                reject(err);
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"galleryDAL::removegallery",err.stack,JSON.stringify('mysql error'),"galleryDAL");
            reject(err);
        });
    });
}