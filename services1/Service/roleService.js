var roleBal = require('./../BAL/roleBAL');
var settingBal = require('./../BAL/settingBAL');

module.exports = function (app) {
    /*
        Get Method roles
    */
    app.express.get('/api/roles', function (request, response) {
        settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
            if(results) {
                roleBal.getroles().then(function (result) {
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
        Get Method roles
    */
    app.express.get('/api/roles/permission', function (request, response) {
        settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
            if(results) {
                roleBal.getrolesbyroleid(request.query.roleid).then(function (result) {
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
         Post Method to update roles
    */
    app.express.put('/api/roles', function (request, response) {
        settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
            if(results) {
                roleBal.updateroles(request.body.rolepermissionid, request.body.selected).then(function (result) {
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

    ///*
    //    Get Method roles
    //*/
    //app.express.get('/api/roles/permission', function (request, response) {
    //    roleBal.getrolepermission(request.query.roleid, request.query.code).then(function (result) {
    //        if (result) {
    //            response.set('Content-Type', 'application/json');
    //            response.status(200);
    //            response.json(result);
    //        }
    //    }).catch(function (err) {
    //        response.set('Content-Type', 'application/json');
    //        response.status(400);
    //        response.json("Error   -- " + err);
    //    });
    //});
}
