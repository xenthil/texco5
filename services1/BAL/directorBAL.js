var app = require('./../app');
var diectorDal = require('../DAL/directorDAL');

module.exports.createdirector = function (director) {
    return new app.promise(function (resolve, reject) {
        diectorDal.validatedirector(director.email, director.mobile, 0).then(function (result) {
            //if (result.response == 1) {
            //    reject("mobile number or email already exists");
            //} else {
            diectorDal.createdirector(director).then(function (result) {
                resolve(result)
            }).catch(function (err) {
                reject(err);
            });
            //}
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.getdirector = function (directorid) {
    return new app.promise(function (resolve, reject) {
        diectorDal.getdirector(directorid).then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.updatedirector = function (director, directorid) {
    return new app.promise(function (resolve, reject) {
        diectorDal.validatedirector(director.email, director.mobile, directorid).then(function (result) {
            //if (result.response == 1) {
            //    reject("mobile number or email already exists");
            //}
            //else {
            diectorDal.updatedirector(director, directorid).then(function (result) {
                resolve(result);
            }).catch(function (err) {
                reject(err);
            });
            //}
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.updatedirectorstatus = function (directorid) {
    return new app.promise(function (resolve, reject) {
        diectorDal.updatedirectorstatus(directorid).then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
};
