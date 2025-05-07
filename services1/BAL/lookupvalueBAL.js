var app = require('./../app');
var lookupvalueDal = require('../DAL/lookupvalueDAL');

module.exports.getWageLoginStatus = function () {
    return new app.promise(function (resolve, reject) {
        lookupvalueDal.getWageLoginStatus().then(function (result) {
            resolve(result);
        }).catch(function (err) {
            reject(err);
        });
    });
}; 

module.exports.lookupvalues = function (lkdmncode) {
    return new app.promise(function (resolve, reject) {
        lookupvalueDal.lookupvalues(lkdmncode).then(function (result) {
            resolve(result);
        }).catch(function (err) {
            reject(err);
        });
    });
}; 

module.exports.getmaplookupvalues = function (lkdmncode) {
    return new app.promise(function (resolve, reject) {
        lookupvalueDal.getmaplookupvalues(lkdmncode).then(function (result) {
            resolve(result);
        }).catch(function (err) {
            reject(err);
        });
    });
}; 

module.exports.getlookuptaluk = function (lkdmncode) {
    return new app.promise(function (resolve, reject) {
        lookupvalueDal.getlookuptaluk(lkdmncode).then(function (result) {
            resolve(result);
        }).catch(function (err) {
            reject(err);
        });
    });
}; 

module.exports.lookupvaluecode = function (lkdmncode, lkvalid) {
    return new app.promise(function (resolve, reject) {
        lookupvalueDal.lookupvaluecode(lkdmncode, lkvalid).then(function (result) {
            resolve(result);
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.lookupvalueid = function (lkdmncode, code) {
    return new app.promise(function (resolve, reject) {
        lookupvalueDal.lookupvalueid(lkdmncode, code).then(function (result) {
            console.log('result',result);
            resolve(result);
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.addlookupdomain = function (code, description, changedby) {
    return new app.promise(function (resolve, reject) {
        lookupvalueDal.addlookupdomain(code, description, changedby).then(function (result) {
            resolve(result);
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.addlookupvalues = function (lkdmncode, code, description, sortorder, changedby) {
    return new app.promise(function (resolve, reject) {
        lookupvalueDal.validatelookupvalue(lkdmncode, code).then(function (result) {
            if (result.response == 1) {
                reject("Lookupvalue already exists");
            }
            else {
                if (sortorder == undefined) { 
                    sortorder = 5;
                }
                lookupvalueDal.addlookupvalues(lkdmncode, code, description, sortorder, changedby).then(function (result) {
                    resolve(result);
                }).catch(function (err) {
                    reject(err);
                });
            }
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.editlookupvalues = function (lkvalid, lkdmncode, code, description, changedby) {
    return new app.promise(function (resolve, reject) {
        lookupvalueDal.editlookupvalues(lkvalid, lkdmncode, code, description, changedby).then(function (result) {
            resolve(result);
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.updatelookupvaluestatus = function (lkvalid) {
    return new app.promise(function (resolve, reject) {
        lookupvalueDal.updatelookupvaluestatus(lkvalid).then(function (result) {
            resolve(result);
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.alllookupvalues = function () {
    return new app.promise(function (resolve, reject) {
        lookupvalueDal.alllookupvalues().then(function (result) {
            resolve(result);
        }).catch(function (err) {
            reject(err);
        });
    });
}; 

module.exports.allcategoryvalues = function () {
    return new app.promise(function (resolve, reject) {
        lookupvalueDal.allcategoryvalues().then(function (result) {
            resolve(result);
        }).catch(function (err) {
            reject(err);
        });
    });
};

//module.exports.lookupforddl = function (lkvalid) {
//    return new app.promise(function (resolve, reject) {
//        lookupvalueDal.lookupforddl(lkvalid).then(function (result) {
//            resolve(result);
//        }).catch(function (err) {
//            reject(err);
//        });
//    });
//};


module.exports.addlinklookup = function (fromlkvalid, tolkvalid) {
    return new app.promise(function (resolve, reject) {
        lookupvalueDal.addlinklookup(fromlkvalid, tolkvalid).then(function (result) {
            resolve(result);
        }).catch(function (err) {
            reject(err);
        });
    });
};


module.exports.deletelinklookup = function (linkid) {
    return new app.promise(function (resolve, reject) {
        lookupvalueDal.deletelinklookup(linkid).then(function (result) {
            resolve(result);
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.editlinklookup = function (fromlkvalid, tolkvalid, linkid) {
    return new app.promise(function (resolve, reject) {
        lookupvalueDal.editlinklookup(fromlkvalid, tolkvalid, linkid).then(function (result) {
            resolve(result);
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.categoryValues = function () {
    return new app.promise(function (resolve, reject) {
        lookupvalueDal.categoryValues().then(function (result) {
            resolve(result);
        }).catch(function (err) {
            reject(err);
        });
    });
}; 

module.exports.addmaincategory = function (maincategoryid, categoryname) {
    // console.log('maincategoryid, categoryname',maincategoryid, categoryname);
    return new app.promise(function (resolve, reject) {
        lookupvalueDal.validatecategory(categoryname).then(function (result) {
            if (result.response == 1) {
                reject("Category Already Exists");
            }
            else {
                lookupvalueDal.addmaincategory(maincategoryid, categoryname, 1).then(function (result) {
                    resolve(result);
                }).catch(function (err) {
                    reject(err);
                });
            }
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.editmaincategory = function (categoryid, wagetype, categoryname) {
    return new app.promise(function (resolve, reject) {
        lookupvalueDal.editmaincategory(categoryid, wagetype, categoryname).then(function (result) {
            resolve(result);
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.getmaincategory = function () {
    return new app.promise(function (resolve, reject) {
        lookupvalueDal.getmaincategory().then(function (result) {
            resolve(result);
        }).catch(function (err) {
            reject(err);
        });
    });
};


module.exports.addsubcategory = function (categoryid, subcategoryname) {
    // console.log('maincategoryid, categoryname',categoryid.categoryid, subcategoryname);
    return new app.promise(function (resolve, reject) {
        lookupvalueDal.validatesubcategory(categoryid, subcategoryname).then(function (result) {
            // console.log('maincategoryid, categoryna0000me',categoryid.categoryid, subcategoryname);
            if (result.response == 1) {
                reject("Sub Category Already Exists");
            }
            else {
                lookupvalueDal.addsubcategory(categoryid, subcategoryname, 1).then(function (result) {
                    resolve(result);
                }).catch(function (err) {
                    reject(err);
                });
            }
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.editsubcategory = function (subcategoryid, categoryid, subcategoryname) {
    // console.log('request.body.subcategoryid',subcategoryid, categoryid, subcategoryname);
    return new app.promise(function (resolve, reject) {
        lookupvalueDal.editsubcategory(subcategoryid, categoryid, subcategoryname).then(function (result) {
            resolve(result);
        }).catch(function (err) {
            reject(err);
        });
    });
};




module.exports.addtaluklookup = function (regionid, districtid, talukid) {
    return new app.promise(function (resolve, reject) {
        lookupvalueDal.validatetalukvalue(regionid, districtid, talukid).then(function (result) {
            if (result.response == 1) {
                reject("Lookupvalue already exists");
            }
            else {
                lookupvalueDal.addtaluklookup(regionid, districtid, talukid).then(function (result) {
                    resolve(result);
                }).catch(function (err) {
                    reject(err);
                });
            }
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.edittaluklookup = function (regionmapid, regionid, districtid, talukid) {
    return new app.promise(function (resolve, reject) {
        lookupvalueDal.edittaluklookup(regionmapid, regionid, districtid, talukid).then(function (result) {
            resolve(result);
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.deletetaluklookup = function (regionmapid) {
    return new app.promise(function (resolve, reject) {
        lookupvalueDal.deletetaluklookup(regionmapid).then(function (result) {
            resolve(result);
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.checkwagepassword = function (wpassword) {
    return new app.promise(function (resolve, reject) {
        lookupvalueDal.checkwagepassword(wpassword).then(function (result) {
            resolve(result);
        }).catch(function (err) {
            reject(err);
        });
    });
}; 

module.exports.deletecategoryvalues = function (subcategoryid) {
    return new app.promise(function (resolve, reject) {
        lookupvalueDal.deletecategoryvalues(subcategoryid).then(function (result) {
            resolve(result);
        }).catch(function (err) {
            reject(err);
        });
    });
};
