var directorBal = require('./../BAL/directorBAL');
var directorModel = require('./../Model/director');
var settingBal = require('./../BAL/settingBAL');

module.exports = function (app) {
    /*
         Post Method to create director
         {
          "name":"Jaicind",
          "designation":"Manager",
          "dtitleid":14,
          "email": "jaicind@gmail.com",
          "mobile": "9840166239",
          "phone": "000",
          "address" : "Nikethanam",
          "changedby" : "Jaicind"
        }
    */
    app.express.post('/api/directors', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
                var director = new directorModel.directorinfo( request.body.name, request.body.designation, request.body.dtitleid, request.body.email, request.body.mobile, request.body.phone, request.body.address, 1, request.body.changedby);
                directorBal.createdirector(director).then(function (result) {
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
         get director
    */
    app.express.get('/api/directors/', function (request, response) {
		settingBal.getAuthorizationTokenAdd(request.headers['authorization']).then(function (results) {
			if(results) {
                directorBal.getdirector(0).then(function (result) {
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
         get director
    */
    app.express.get('/api/directors/:id', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
                directorBal.getdirector(request.params.id).then(function (result) {
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
         put Method to update director
    */
    app.express.put('/api/directors', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
                var director = new directorModel.directorinfo(request.body.name, request.body.designation, request.body.dtitleid, request.body.email, request.body.mobile, request.body.phone, request.body.address, 1, request.body.changedby);
                directorBal.updatedirector(director, request.body.directorid).then(function (result) {
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
         Delete Method to delete
    */
    app.express.delete('/api/directors', function (request, response) {
		settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
			if(results) {
                directorBal.updatedirectorstatus(request.body.directorid).then(function (result) {
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
