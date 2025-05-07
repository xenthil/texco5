var app = require('./../app');
var documentDal = require('../DAL/documentDAL');

module.exports.createdocument = function (document) {
    return new app.promise(function (resolve, reject) {
        documentDal.createdocument(document).then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.updatedocument = function (document, documentid) {
    return new app.promise(function (resolve, reject) {
        documentDal.updatedocument(document, documentid).then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.getdocument = function (documentid) {
    return new app.promise(function (resolve, reject) {
        documentDal.getdocument(documentid).then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
};   

module.exports.getdocumentbyfolderid = function (folderid) {
    return new app.promise(function (resolve, reject) {
        documentDal.getdocumentbyfolderid(folderid).then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.getdocumentfolders = function () {
    return new app.promise(function (resolve, reject) {
        documentDal.getdocumentfolders().then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.checkFolderName = function (foldername) {
    return new app.promise(function (resolve, reject) {
        documentDal.checkFolderName(foldername).then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
}; 

module.exports.createfolder = function (foldername) {
    return new app.promise(function (resolve, reject) {
        documentDal.createfolder(foldername).then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.updatedocumentstatus = function (documentid) {
    return new app.promise(function (resolve, reject) {
        documentDal.updatedocumentstatus(documentid).then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.getpfdocument = function (documentid) {
    return new app.promise(function (resolve, reject) {
        documentDal.getpfdocument(documentid).then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.getgstdocument = function (documentid) {
    return new app.promise(function (resolve, reject) {
        documentDal.getgstdocument(documentid).then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.getdocumentDetails = function (foldername) {
    return new app.promise(function (resolve, reject) {
        documentDal.getdocumentDetails(foldername).then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
};


module.exports.getdocumentonly = function (documentid) {
    return new app.promise(function (resolve, reject) {
        documentDal.getdocumentonly(documentid).then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
};


module.exports.getwagedocument = function (documentid) {
    return new app.promise(function (resolve, reject) {
        documentDal.getwagedocument(documentid).then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
};