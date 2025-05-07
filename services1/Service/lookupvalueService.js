var lookupvalueBal = require('./../BAL/lookupvalueBAL');
var settingBal = require('./../BAL/settingBAL');

module.exports = function (app) {
    app.express.get('/api/lookupvalues/SettingStatus', function (request, response) {
        settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
            if(results) {
                lookupvalueBal.getWageLoginStatus().then(function (result) {
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
         GET methord to get lookupvalues by Lkdmncode
    */
    app.express.get('/api/lookupvalues', function (request, response) {
        settingBal.getAuthorizationTokenAdd(request.headers['authorization']).then(function (results) {
            if(results) {
                lookupvalueBal.lookupvalues(request.query.lkdmcode).then(function (result) {
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

    app.express.get('/api/getmaplookupvalues', function (request, response) {
        settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
            if(results) {
                lookupvalueBal.getmaplookupvalues(request.query.lkdmcode).then(function (result) {
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

    app.express.get('/api/getlookuptaluk', function (request, response) {
        settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
            if(results) {
                lookupvalueBal.getlookuptaluk(request.query.lkdmcode).then(function (result) {
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
         GET methord to get lookupvalues by Lkdmncode
    */
    app.express.get('/api/lookupvalues/lookupvaluecode', function (request, response) {
        settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
            if(results) {
                lookupvalueBal.lookupvaluecode(request.query.lkdmncode, request.query.lkvalid).then(function (result) {
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
         GET methord to get lookupvalues by Lkdmncode
    */
    app.express.get('/api/lookupvalues/lookupvalueid', function (request, response) {
        settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
            if(results) {
                lookupvalueBal.lookupvalueid(request.query.lkdmcode, request.query.code).then(function (result) {
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
         POst Method to add lookupvalues
    */
    app.express.post('/api/lookupvalues', function (request, response) {
        settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
            if(results) {
                lookupvalueBal.addlookupvalues(request.body.lkdmncode, request.body.code, request.body.description, request.body.sortorder, request.body.changedby).then(function (result) {
                    if (result) {
                        response.set('Content-Type', 'application/json');
                        response.status(200);
                        response.json(result);
                        response.send();
                    }
                }).catch(function (err) {
                    response.set('Content-Type', 'application/json');
                    response.status(400);
                    response.json("Error   -- " + err);
                    response.send();
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
         Post Method to edit lookupvalues
    */
    app.express.put('/api/lookupvalues', function (request, response) {
        settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
            if(results) {
                lookupvalueBal.editlookupvalues(request.body.lkvalid, request.body.lkdmncode, request.body.code, request.body.description, request.body.changedby).then(function (result) {
                    if (result) {
                        response.set('Content-Type', 'application/json');
                        response.status(200);
                        response.json(result);
                        response.send();
                    }
                }).catch(function (err) {
                    response.set('Content-Type', 'application/json');
                    response.status(400);
                    response.json("Error   -- " + err);
                    response.send();
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
          Delete Method to delete lookupvalue
    */

    app.express.delete('/api/lookupvalues', function (request, response) {
        settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
            if(results) {
                lookupvalueBal.updatelookupvaluestatus(request.body.lkvalid).then(function (result) {
                    if (result) {
                        response.set('Content-Type', 'application/json');
                        response.status(200);
                        response.json(result);
                        response.send();
                    }
                }).catch(function (err) {
                    response.set('Content-Type', 'application/json');
                    response.status(400);
                    response.json("Error   -- " + err);
                    response.send();
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
         GET methord to get lookupvalues by Lkdmncode
    */
    app.express.get('/api/alllookupvalues', function (request, response) {
        settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
            if(results) {
                lookupvalueBal.alllookupvalues().then(function (result) {
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

    app.express.get('/api/allcategoryvalues', function (request, response) {
        settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
            if(results) {
                lookupvalueBal.allcategoryvalues().then(function (result) {
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
         GET methord to get lookupvalues by Lkdmncode
    */
    app.express.post('/api/linklookup/add', function (request, response) {
        settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
            if(results) {
                lookupvalueBal.addlinklookup(request.body.fromlkvalid, request.body.tolkvalid).then(function (result) {
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
         GET methord to get lookupvalues by Lkdmncode
    */
    app.express.post('/api/linklookup/delete', function (request, response) {
        settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
            if(results) {
                lookupvalueBal.deletelinklookup(request.body.linkid).then(function (result) {
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
         GET methord to get lookupvalues by Lkdmncode
    */
    app.express.post('/api/linklookup/edit', function (request, response) {
        settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
            if(results) {
                lookupvalueBal.editlinklookup(request.body.fromlkvalid, request.body.tolkvalid, request.body.linkid).then(function (result) {
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
    //     GET methord to get lookupvalues by code
    //*/
    //app.express.get('/api/lookupvalues/cascade', function (request, response) {
    //    lookupvalueBal.lookupforddl(request.query.lkvalid).then(function (result) {
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


    app.express.get('/api/lookupvalues/Category', function (request, response) {
        settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
            if(results) {
                lookupvalueBal.categoryValues().then(function (result) {
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
         Post Method to add category
    */
    app.express.post('/api/savemaincategory', function (request, response) {
        settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
            if(results) {
                lookupvalueBal.addmaincategory(request.body.wagetype, request.body.categoryname).then(function (result) {
                    if (result) {
                        response.set('Content-Type', 'application/json');
                        response.status(200);
                        response.json(result);
                        response.send();
                    }
                }).catch(function (err) {
                    response.set('Content-Type', 'application/json');
                    response.status(400);
                    response.json("Error   -- " + err);
                    response.send();
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
        Post Method to edit category
    */
    app.express.put('/api/savemaincategory', function (request, response) {
        settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
            if(results) {
                lookupvalueBal.editmaincategory(request.body.categoryid, request.body.wagetype, request.body.categoryname).then(function (result) {
                    if (result) {
                        response.set('Content-Type', 'application/json');
                        response.status(200);
                        response.json(result);
                        response.send();
                    }
                }).catch(function (err) {
                    response.set('Content-Type', 'application/json');
                    response.status(400);
                    response.json("Error   -- " + err);
                    response.send();
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

    // get Main category
    app.express.get('/api/getmaincategory', function (request, response) {
        settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
            if(results) {
                lookupvalueBal.getmaincategory().then(function (result) {
                    if (result) {
                        response.set('Content-Type', 'application/json');
                        response.status(200);
                        response.json(result);
                        response.send();
                    }
                }).catch(function (err) {
                    response.set('Content-Type', 'application/json');
                    response.status(400);
                    response.json("Error   -- " + err);
                    response.send();
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
         Post Method to add sub category
    */
    app.express.post('/api/savesubcategory', function (request, response) {
        settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
            if(results) { 
                lookupvalueBal.addsubcategory((request.body.categoryid ? parseInt(request.body.categoryid) : 0), request.body.subcategoryname).then(function (result) {
                    if (result) {
                        response.set('Content-Type', 'application/json');
                        response.status(200);
                        response.json(result);
                        response.send();
                    }
                }).catch(function (err) {
                    response.set('Content-Type', 'application/json');
                    response.status(400);
                    response.json("Error   -- " + err);
                    response.send();
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
        Post Method to edit sub category
    */
    app.express.put('/api/savesubcategory', function (request, response) {
        settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
            if(results) {   
                lookupvalueBal.editsubcategory((request.body.subcategoryid ? parseInt(request.body.subcategoryid) : 0), (request.body.categoryid ? parseInt(request.body.categoryid) : 0) , request.body.subcategoryname).then(function (result) {
                    if (result) {
                        response.set('Content-Type', 'application/json');
                        response.status(200);
                        response.json(result);
                        response.send();
                    }
                }).catch(function (err) {
                    response.set('Content-Type', 'application/json');
                    response.status(400);
                    response.json("Error   -- " + err);
                    response.send();
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
         GET methord to get lookupvalues by Lkdmncode
    */
    app.express.post('/api/taluklookup/add', function (request, response) {
        settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
            if(results) {
                lookupvalueBal.addtaluklookup(request.body.regionid, request.body.districtid, request.body.talukid).then(function (result) {
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

    app.express.post('/api/taluklookup/edit', function (request, response) {
        settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
            if(results) {
                lookupvalueBal.edittaluklookup(request.body.regionmapid,request.body.regionid, request.body.districtid, request.body.talukid).then(function (result) {
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
        GET methord to get lookupvalues by Lkdmncode
    */
    app.express.post('/api/taluklookup/delete', function (request, response) {
        settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
            if(results) {
                lookupvalueBal.deletetaluklookup(request.body.regionmapid).then(function (result) {
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

    app.express.post('/api/checkwagepassword', function (request, response) {
        settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
            if(results) {
                lookupvalueBal.checkwagepassword(request.body.wpassword).then(function (result) {
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
        GET methord to get lookupvalues by Lkdmncode
    */
    app.express.post('/api/taluklookup/delete', function (request, response) {
        settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
            if(results) {
                lookupvalueBal.deletetaluklookup(request.body.regionmapid).then(function (result) {
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


    
    app.express.delete('/api/delete/removesubcategory', function (request, response) {
        settingBal.getAuthorizationToken(request.headers['authorization']).then(function (results) {
            if(results) {
                lookupvalueBal.deletecategoryvalues(request.body.subcategoryid).then(function (result) {
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
