var settingBal = require('./../BAL/settingBAL');
var settingModel = require('./../Model/setting');

module.exports = function (app) {
    /*
         Post Method to create setting
    */
    app.express.post('/api/setting', function (request, response) {
        settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
            if(results) {
                var setting = new settingModel.setting(request.body.code, request.body.description, request.body.value, request.body.changedby);
                settingBal.createsetting(setting).then(function (result) {
                    if (result) {
                        response.set('Content-Type', 'application/json');
                        response.status(200);
                        response.json(result);
                    }
                }).catch(function (err) {
                    response.set('Content-Type', 'application/json');
                    response.status(400);
                    response.json("Error   -- " + err);
                });
            } else {
                response.set('Content-Type', 'application/json');
                response.status(400);
                response.json("Error   -- Wrong Token");
            }
        }).catch(function (err) {
            response.set('Content-Type', 'application/json');
            response.status(400);
            response.json("Error   -- " + err);
        });
    });
    
    /*
         put Method to update setting
    */
    app.express.put('/api/setting', function (request, response) {
        settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
            if(results) {
                var setting = new settingModel.setting(request.body.settingid,request.body.code, request.body.description, request.body.value, request.body.changedby);
                settingBal.updatesetting(setting, request.body.settingid).then(function (result) {
                    if (result) {
                        response.set('Content-Type', 'application/json');
                        response.status(200);
                        response.json(result);
                    }
                }).catch(function (err) {
                    response.set('Content-Type', 'application/json');
                    response.status(400);
                    response.json("Error   -- " + err);
                });
            } else {
                response.set('Content-Type', 'application/json');
                response.status(400);
                response.json("Error   -- Wrong Token");
            }
        }).catch(function (err) {
            response.set('Content-Type', 'application/json');
            response.status(400);
            response.json("Error   -- " + err);
        });
    });
    
    /*
         delete Method to delete setting 
    */
    app.express.delete('/api/setting', function (request, response) {
        settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
            if(results) {
                settingBal.updatesettingstatus(request.body.settingid).then(function (result) {
                    if (result) {
                        response.set('Content-Type', 'application/json');
                        response.status(200);
                        response.json(result);
                    }
                }).catch(function (err) {
                    response.set('Content-Type', 'application/json');
                    response.status(400);
                    response.json("Error   -- " + err);
                });
            } else {
                response.set('Content-Type', 'application/json');
                response.status(400);
                response.json("Error   -- Wrong Token");
            }
        }).catch(function (err) {
            response.set('Content-Type', 'application/json');
            response.status(400);
            response.json("Error   -- " + err);
        });
    });
    
    /*
         Get Method setting
    */
    app.express.get('/api/setting/', function (request, response) {
        settingBal.getAuthorizationTokenAdd(request.headers['authorization']).then(function (results) {
            if(results) {
                settingBal.getsetting(0).then(function (result) {
                    if (result) {
                        response.set('Content-Type', 'application/json');
                        response.status(200);
                        response.json(result);
                    }
                }).catch(function (err) {
                    response.set('Content-Type', 'application/json');
                    response.status(400);
                    response.json("Error   -- " + err);
                });
            } else {
                response.set('Content-Type', 'application/json');
                response.status(400);
                response.json("Error   -- Wrong Token");
            }
        }).catch(function (err) {
            response.set('Content-Type', 'application/json');
            response.status(400);
            response.json("Error   -- " + err);
        });
    });
    
    /*
         Get Method setting
    */
    app.express.get('/api/setting/:id', function (request, response) {
        settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
            if(results) {
                settingBal.getsetting(request.params.id).then(function (result) {
                    if (result) {
                        response.set('Content-Type', 'application/json');
                        response.status(200);
                        response.json(result);
                    }
                }).catch(function (err) {
                    response.set('Content-Type', 'application/json');
                    response.status(400);
                    response.json("Error   -- " + err);
                });
            } else {
                response.set('Content-Type', 'application/json');
                response.status(400);
                response.json("Error   -- Wrong Token");
            }
        }).catch(function (err) {
            response.set('Content-Type', 'application/json');
            response.status(400);
            response.json("Error   -- " + err);
        });
    });

    /* Reporting Services */
    app.express.get('/api/projectsreports', function (request, response) {
        settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
            if(results) {
                settingBal.getProjectDetails().then(function (result) {
                    if (result) {
                        response.set('Content-Type', 'application/json');
                        response.status(200);
                        response.json(result);
                    }
                }).catch(function (err) {
                    response.set('Content-Type', 'application/json');
                    response.status(400);
                    response.json("Error   -- " + err);
                });
            } else {
                response.set('Content-Type', 'application/json');
                response.status(400);
                response.json("Error   -- Wrong Token");
            }
        }).catch(function (err) {
            response.set('Content-Type', 'application/json');
            response.status(400);
            response.json("Error   -- " + err);
        });
    });
}
