var wageBal = require('./../BAL/wageBAL');
var wageModel = require('./../Model/wage');
var settingBal = require('./../BAL/settingBAL');

module.exports = function (app) {
    
    /*
         Post Method to create wages
    */
    app.express.post('/api/wages', function (request, response) {
        settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
            if(results) {
                var wage = new wageModel.wage(request.body.wagetypeid, request.body.wageareaid, request.body.wageyearid, request.body.jobmasterid, request.body.particularid, request.body.particularamount, request.body.changedby,request.body.particularpercent,request.body.wagecategory);
                wageBal.createwages(wage).then(function (result) {
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

    app.express.post('/api/addwages', function (request, response) {
        settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
            if(results) {
                var wagearea = request.body[1];
                var objaddwage = request.body[0];
                var wagecategory = request.body[0].category;
                var wageyearid = request.body[0].wageyear;
                var wagetypeid = request.body[0].wagetype;
                var wagecategorydescription = request.body[0].categorydescription;
                var wageamount = [];
                for( var i = 0; i < wagearea.length; i++) {
                    debugger
                    for (var key in objaddwage[wagearea[i].lkvalid]) {
                        var particularid = key;
                        for (var keys in objaddwage[wagearea[i].lkvalid][key]) {
                            wageamount.push({'wagetypeid':wagetypeid,'wagecategoryid':0,'wageyearid':wageyearid,'wageareaid':wagearea[i].lkvalid,'jobmasterid':Number(keys),'particularid':Number(particularid),'particularamount':Number(objaddwage[wagearea[i].lkvalid][key][keys])});
                        }
                    }
                } 
                var wage = new wageModel.addwage(wageamount,wagecategory,wageyearid,wagetypeid,wagecategorydescription);
                //console.log('wage',JSON.stringify(wage));         
                wageBal.createnewwages(wage).then(function (result) {
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

    app.express.post('/api/updatewages', function (request, response) {
        settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
            if(results) {
                wageBal.UpdateAllWages(request.body.particularid, request.body.particularamount,request.body.particularpercent).then(function (result) {
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

    app.express.post('/api/updatewagemaster', function (request, response) {
        settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
            if(results) {
                wageBal.UpdateWageRate(request.body.wageid, request.body.particularamount).then(function (result) {
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
         put Method to update wages
    */
    app.express.put('/api/wages', function (request, response) {
        settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
            if(results) {
                var wage = new wageModel.wage(request.body.wagetypeid, request.body.wageareaid, request.body.wageyearid, request.body.jobmasterid, request.body.particularid, request.body.particularamount, request.body.changedby,request.body.particularpercent,request.body.wagecategory);
                wageBal.updatewages(wage,request.body.wageid).then(function (result) {
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
    app.express.delete('/api/wages', function (request, response) {
        settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
            if(results) {
                wageBal.updatewagestatus(request.body.wageid).then(function (result) {
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
       Get Method Wages by Perticulars first
  */
    app.express.post('/api/wages/import', function (request, response) { 
        request.setTimeout(0);
        settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
            if(results) {
                wageBal.importwages(request.body.wages,request.body.wagedetails,request.body.wagearea).then(function (result) {
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
       Get Method Agreement
  */
    app.express.get('/api/wages/dgr', function (request, response) {
        settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
            if(results) {
                wageBal.dgrwages().then(function (result) {
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

    app.express.get('/api/wages/tn', function (request, response) {
        settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
            if(results) {
                wageBal.tnwages().then(function (result) {
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
       Get Method DgrWages by Perticulars first
  */
    app.express.get('/api/wage/tn', function (request, response) {
        settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
            if(results) {
                wageBal.tnwage(request.query.categoryid,request.query.wageyearid,request.query.wagetypeid).then(function (result) {
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
       Get Method Wages by Perticulars first
  */
     app.express.get('/api/wage/dgr', function (request, response) {
        settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
            if(results) {
                wageBal.dgrwage(request.query.categoryid,request.query.wageyearid,request.query.wagetypeid).then(function (result) {
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
       Get Method Wages by Perticulars first
  */
    app.express.get('/api/wage/salarycompoenent', function (request, response) {
        settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
            if(results) {
                wageBal.dgrwagebyyear(request.query.projectid).then(function (result) {
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

    

    app.express.get('/api/wage/getcategory', function (request, response) {
        settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
            if(results) {
                wageBal.getwagecategoryByYear(request.query.yearid,request.query.wagetypeid).then(function (result) {
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

    app.express.get('/api/wage/getwagedetailsbycategoryid', function (request, response) {
        settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
            if(results) {
                wageBal.getwagedetailsbycategoryid(request.query.categoryid,request.query.wageyearid,request.query.wagetypeid).then(function (result) {
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

     
    app.express.get('/api/wage/gettnwagedetailsbycategoryid', function (request, response) {
        settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
            if(results) {
                wageBal.gettnwagedetailsbycategoryid(request.query.categoryid,request.query.wageyearid,request.query.wagetypeid).then(function (result) {
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
