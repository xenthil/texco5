var app = require('./../app');
var roleDal = require('./../DAL/roleDAL');

module.exports.getroles = function () {
    return new app.promise(function (resolve, reject) {
        roleDal.getroles().then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.getrolesbyroleid = function (roleid) {
    return new app.promise(function (resolve, reject) {
        roleDal.getrolesbyroleid(roleid).then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.updateroles = function (rolepermissionid, selected) {
    return new app.promise(function (resolve, reject) {
        roleDal.updateroles(rolepermissionid, selected).then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.getrolepermission = function (roleid, code) {
    return new app.promise(function (resolve, reject) {
        roleDal.getrolepermission(roleid, code).then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
};
