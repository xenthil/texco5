var app = require('./../app');
var galleryDal = require('../DAL/galleryDAL');

module.exports.creategallery = function (gallery, images) {
    return new app.promise(function (resolve, reject) {
        galleryDal.creategallery(gallery, images).then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
};

//module.exports.updategallery = function (gallery, images) {
//    return new app.promise(function (resolve, reject) {
//        galleryDal.updategallery(gallery, images).then(function (result) {
//            resolve(result)
//        }).catch(function (err) {
//            reject(err);
//        });
//    });
//};

module.exports.getgallerybygroup = function (group) {
    return new app.promise(function (resolve, reject) {
        galleryDal.getgallerybygroup(group).then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.getgallery = function (galleryid) {
    return new app.promise(function (resolve, reject) {
        galleryDal.getgallery(galleryid).then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.updategallerystatus = function (galleryid) {
    return new app.promise(function (resolve, reject) {
        galleryDal.updategallerystatus(galleryid).then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.removegallery = function (group) {
    return new app.promise(function (resolve, reject) {
        galleryDal.removegallery(group).then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
};