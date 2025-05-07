var app = require('./../app');
var settingDal = require('./../DAL/settingDAL');
var employeeDal = require('../DAL/employeeDAL');

module.exports.getAuthorizationToken = function (atoken) {
    return new app.promise(function (resolve, reject) {
        settingDal.getAuthorizationToken(atoken).then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.createsetting = function (setting) {
    return new app.promise(function (resolve, reject) {
        settingDal.createsetting(setting).then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.updatesetting = function (setting, settingid) {
    return new app.promise(function (resolve, reject) {
        settingDal.updatesetting(setting, settingid).then(function (result) {
            resolve(result) 
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.updatesettingstatus = function (settingid) {
    return new app.promise(function (resolve, reject) {
        settingDal.updatesettingstatus(settingid).then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.getsetting = function (settingid) {
    return new app.promise(function (resolve, reject) {
        settingDal.getsetting(settingid).then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
};
module.exports.getsettingvalue = function (code) {
    return new app.promise(function (resolve, reject) {
        settingDal.getsettingvalue(code).then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.getProjectDetails = function (code) {
    return new app.promise(function (resolve, reject) {
        settingDal.getProjectDetails().then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.getAuthorizationTokenAdd = function (atoken) {
    return new app.promise(function (resolve, reject) {
        settingDal.getAuthorizationToken(atoken).then(function (result) { 
            if(result) {
                resolve(result)
            } else {
                employeeDal.addsessionvalue(atoken).then(function (result) {
                    if(result) 
                        resolve(1); 
                    else 
                        resolve(0);
                }).catch(function (err) {
                    reject(err);
                });
            }
        }).catch(function (err) {
            reject(err);
        });
    });
};

