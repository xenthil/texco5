var app = require('./../app');
var officerDal = require('../DAL/officerDAL');

module.exports.createofficer = function (officer) {
    return new app.promise(function (resolve, reject) {
        officerDal.createofficer(officer).then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.getofficer = function (officerid) {
    return new app.promise(function (resolve, reject) {
        officerDal.getofficer(officerid).then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.updateofficer = function (officer, officerid) {
    return new app.promise(function (resolve, reject) {
        officerDal.updateofficer(officer, officerid).then(function (result) {
            resolve(result);
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.updateofficerstatus = function (officerid) {
    return new app.promise(function (resolve, reject) {
        officerDal.updateofficerstatus(officerid).then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.getofficerdirectors = function () {
    return new app.promise(function (resolve, reject) {
        officerDal.getofficerdirectors().then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.getofficerothers = function () {
    return new app.promise(function (resolve, reject) {
        officerDal.getofficerothers().then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
};