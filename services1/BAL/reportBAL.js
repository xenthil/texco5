var app = require('./../app');
var reportDAL = require('./../DAL/reportDAL');


module.exports.getdsrtnreport = function (startdate,enddate,wagetypeid) {
    return new app.promise(function (resolve, reject) {
        reportDAL.getdsrtnreport('', '',startdate,enddate,wagetypeid).then(function (result2) {
            if (result2) {
                resolve(result2);
            }
            else {
                reject("Error in getdrstnreport BAL");
            }
        }).catch(function (err) {
            reject(err);
        });
    })
};

module.exports.getnewpersonslist = function (startdate,enddate) {
    return new app.promise(function (resolve, reject) {
        reportDAL.getnewpersonslist(startdate,enddate).then(function (result2) {
            if (result2) {
                resolve(result2);
            }
            else {
                reject("Error in getdrstnreport BAL");
            }
        }).catch(function (err) {
            reject(err);
        });
    })
};

module.exports.getLoginlist = function (startdate,enddate) {
    return new app.promise(function (resolve, reject) {
        reportDAL.getLoginlist(startdate,enddate).then(function (result2) {
            if (result2) {
                resolve(result2);
            }
            else {
                reject("Error in getdrstnreport BAL");
            }
        }).catch(function (err) {
            reject(err);
        });
    })
};

module.exports.getregionreport = function () {
    return new app.promise(function (resolve, reject) {
        reportDAL.getregionreport().then(function (result) {
            if (result) {
                resolve(result);
            }
            else {
                reject("Error in getdrstnreport BAL");
            }
        }).catch(function (err) {
            reject(err);
        });
    })
};

module.exports.getdistrictreport = function () {
    var region;
    var catgry;
    return new app.promise(function (resolve, reject) {
        reportDAL.getRegionData().then(function (result) {
            if (result) {
                region = result;
                reportDAL.getCategory().then(function (result1) {
                    if (result1) {
                        catgry = result1;
                        reportDAL.getdistrictreport(region, catgry).then(function (result2) {
                            if (result2) {
                                resolve(result2);
                            }
                            else {
                                reject("Error in getdistrictreport BAL");
                            }
                        }).catch(function (err) {
                            reject(err);
                        });
                    }
                    else {
                        reject("Error in getbaselable BAL");
                    }
                }).catch(function (err) {
                    reject(err);
                });
                //resolve(result);
            }
            else {
                reject("Error in getdrstnlableBAL");
            }
        }).catch(function (err) {
            reject(err);
        });
    })
};

module.exports.getCategories = function () {
    return new app.promise(function (resolve, reject) {
        reportDAL.getCategory().then(function (result1) {
            if (result1) {
                resolve(result1);
            }
            else {
                reject("Error in getbaselable BAL");
            }
        }).catch(function (err) {
            reject(err);
        });
    })
}; 

module.exports.getsubcategory = function () {
    return new app.promise(function (resolve, reject) {
        reportDAL.getsubcategory().then(function (result1) {
            if (result1) {
                resolve(result1);
            } else {
                reject("Error in getbaselable BAL");
            }
        }).catch(function (err) {
            reject(err);
        });
    })
}; 


module.exports.getstrengthreport = function (monthandyear,regionid,districtid,clientid) {
    return new app.promise(function (resolve, reject) {
        reportDAL.getCategory().then(function (result1) {
            if (result1) {
                var category = result1;
                reportDAL.getstrengthreport(monthandyear,regionid,districtid,clientid).then(function (result2) {
                    if (result2) { 
                        // var results = [];
                        // results.push(result2);
                        // results.push(category);
                        resolve(result2);
                    }
                    else {
                        reject("Error in getstrengthreport BAL");
                    }
                }).catch(function (err) {
                    reject(err);
                });
            }
            else {
                reject("Error in getbaselable BAL");
            }
        }).catch(function (err) {
            reject(err);
        });
    })
};


/////18-10-2019
module.exports.getcategorywisecount = function (startdate,enddate) {
    return new app.promise(function (resolve, reject) {
        reportDAL.getcategorywisecount(startdate,enddate).then(function (result) {
            if (result) {
                resolve(result);
            }
            else {
                reject("Error in get categorywisecount BAL");
            }
        }).catch(function (err) {
            reject(err);
        });
    })
};
 
module.exports.getdeptwisecount = function(monthandyear,categoryid) {
    return new app.promise(function (resolve, reject) {
        reportDAL.getdeptwisecount(monthandyear,categoryid).then(function (result) {
            if (result) {
                resolve(result);
            } else {
                reject("Error in get categorywisecount BAL");
            }
        }).catch(function (err) {
            reject(err);
        });
    })
};

module.exports.getcollectionreport = function(monthandyear,districtid,regionid) {
    return new app.promise(function (resolve, reject) {
        reportDAL.getcollectionreport(monthandyear,districtid,regionid).then(function (result) {
            if (result) {
                resolve(result);
            } else {
                reject("Error in get categorywisecount BAL");
            }
        }).catch(function (err) {
            reject(err);
        });
    })
};


module.exports.getcategoryreportlist = function(regionid,districtid,fromdate,todate) {
    return new app.promise(function (resolve, reject) {
        reportDAL.getcategoryreportlist(regionid,districtid,fromdate,todate).then(function (result) {
            if (result) {
                resolve(result);
            } else {
                reject("Error in get categorywisecount BAL");
            }
        }).catch(function (err) {
            reject(err);
        });
    })
};


module.exports.getdgrcount = function (startdate,enddate) {
    return new app.promise(function (resolve, reject) {
        reportDAL.getdgrcount(startdate,enddate).then(function (result) {
            if (result) {
                resolve(result);
            }
            else {
                reject("Error in get dgr count BAL");
            }
        }).catch(function (err) {
            reject(err);
        });
    })
};

module.exports.gettncount = function (startdate,enddate) {
    return new app.promise(function (resolve, reject) {
        reportDAL.gettncount(startdate,enddate).then(function (result) {
            if (result) {
                resolve(result);
            }
            else {
                reject("Error in get tncount BAL");
            }
        }).catch(function (err) {
            reject(err);
        });
    })
};

module.exports.getmembercount = function (regionid,districtid) {
    return new app.promise(function (resolve, reject) {
        reportDAL.getmembercount(regionid,districtid).then(function (result) {
            if (result) {
                resolve(result);
            }
            else {
                reject("Error in get member BAL");
            }
        }).catch(function (err) {
            reject(err);
        });
    })
};


module.exports.getdistrictwisecount = function () {
    return new app.promise(function (resolve, reject) {
        var category = '';
        reportDAL.getdistrictwisecount().then(function (result) {
            if (result) {
                resolve(result);
            }
            else {
                reject("Error in get district BAL");
            }
        }).catch(function (err) {
            reject(err);
        });
    })
}; 

module.exports.getdistrictcount = function (startdate,enddate) {
    return new app.promise(function (resolve, reject) {
        reportDAL.getdistrictcount(startdate,enddate).then(function (result) {
            if (result) {
                resolve(result);
            }
            else {
                reject("Error in get district BAL");
            }
        }).catch(function (err) {
            reject(err);
        });
    })
}; 

module.exports.getprojectwisecount = function () {
    return new app.promise(function (resolve, reject) {
        reportDAL.getprojectwisecount().then(function (result) {
            if (result) {
                resolve(result);
            }
            else {
                reject("Error in get project wise BAL");
            }
        }).catch(function (err) {
            reject(err);
        });
    })
};
 
module.exports.getprojectwisenewlist = function (fromdate, todate) {
    return new app.promise(function (resolve, reject) {
        reportDAL.getprojectwisenewlist(fromdate, todate).then(function (result) {
            if (result) {
                resolve(result);
            }
            else {
                reject("Error in get project wise incresed decresed count BAL");
            }
        }).catch(function (err) {
            reject(err);
        });
    })
};

module.exports.getprojectwiseincdeccount = function (fromdate, todate) {
    return new app.promise(function (resolve, reject) {
        reportDAL.getprojectwiseincdeccount(fromdate, todate).then(function (result) {
            if (result) {
                resolve(result);
            }
            else {
                reject("Error in get project wise incresed decresed count BAL");
            }
        }).catch(function (err) {
            reject(err);
        });
    })
};

module.exports.getdistrictwiseincdeccount = function (fromdate, todate) {
    return new app.promise(function (resolve, reject) {
        reportDAL.getdistrictwiseincdeccount(fromdate, todate).then(function (result) {
            if (result) {
                resolve(result);
            }
            else {
                reject("Error in get district wise incresed decresed count BAL");
            }
        }).catch(function (err) {
            reject(err);
        });
    })
};

module.exports.getprojectwisesalary = function (frommonth) {
    return new app.promise(function (resolve, reject) {
        reportDAL.getprojectwisesalary(frommonth).then(function (result) {
            if (result) {
                resolve(result);
            }
            else {
                reject("Error in get salary project wise BAL");
            }
        }).catch(function (err) {
            reject(err);
        });
    })
};


module.exports.getmemberwisesalary = function (monthyear) {
    return new app.promise(function (resolve, reject) {
        reportDAL.getmemberwisesalary(monthyear).then(function (result) {
            if (result) {
                resolve(result);
            }
            else {
                reject("Error in get salary member wise BAL");
            }
        }).catch(function (err) {
            reject(err);
        });
    })
};


