var app = angular.module('appJobposting', []);
app.controller('ctrlJobposting', function($scope, $http) {
    var scope = $scope;
    $scope.jobpostings = [];
    $scope.selected = {};
    $scope.objjobposting = {};
    $scope.filter = "";
    $scope.objjobs = [];
    $scope.objjobposting.clientid = 0;

    // Get jobpostings
    $http({
        method: 'GET', 
        headers : {
            "Authorization" : atoken
        },
        url: api_url + "/job/jobposting",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.jobpostings = response.data;
            if (clientid > 0) {
                $scope.value = [];
                angular.forEach($scope.jobpostings, function(jobposting) {
                    if (jobposting.clientid == clientid) {
                        $scope.value.push(jobposting);
                    }
                });
                $scope.jobpostings = [];
                $scope.jobpostings = $scope.value;
            }
            if ($scope.jobpostings.length > 0) {
                $scope.select($scope.jobpostings[0]);
            }
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });

    // Get Clients
    $scope.clients = [];
    $http({
        method: 'GET', 
        headers : {
            "Authorization" : atoken
        },
        url: api_url + "/client",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.clients = response.data;
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });

    // Get Projects
    $scope.projects = [];
    $http({
        method: 'GET', 
        headers : {
            "Authorization" : atoken
        },
        url: api_url + "/client/project",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.projects = response.data;
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });

    // Get Projects
    $scope.projectnos = [];
    $http({
        method: 'GET', 
        headers : {
            "Authorization" : atoken
        },
        url: api_url + "/jobposting/prjectnos",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.projectnos = response.data;
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });

    // Load Selected Projects
    $scope.selectProject = function(clientid) {
        $scope.selectedprojects = [];
        var obj = {}
        for (obj of $scope.projects) {
            if (obj.clientid == clientid) {
                $scope.selectedprojects.push(obj);
                $scope.select($scope.projectnos[0]);
            }
        }
    }

    // Get JobMasters
    $scope.jobmasters = [];
    $http({
        method: 'GET', 
        headers : {
            "Authorization" : atoken
        },
        url: api_url + "/job/jobmaster",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.jobmasters = response.data;
        }
    }, function errorCallback(response) {

    });


    scope.getjobmasters = function() {
        $scope.objjobs = [];
        $scope.jobmasters.forEach(function(value) {
            var item = {
                jobmasterid: value.jobmasterid,
                name:value.name,
                code: value.code,
                numberofvacancies: 0,
                comments: ''
            }
            $scope.objjobs.push(item);
        })
    };

    $scope.select = function(jobposting) {
        $scope.selected = jobposting;
        $scope.jobmasteragreement = jobposting.jobs;
        $scope.projectno = {};
        $scope.objjobposting.projectno = jobposting.projectno;
        $scope.objjobposting.jobpostingid = jobposting.jobpostingid;
        $scope.objjobposting.startdate = jobposting.startdate;
        $scope.objjobposting.code = jobposting.code;
        $scope.objjobposting.name = jobposting.name;
        $scope.objjobposting.monthlywages = jobposting.monthlywages;
        $scope.objjobposting.workinghours = jobposting.workinghours;
        $scope.objjobposting.servicecharge = jobposting.servicecharge;
        $scope.objjobposting.servicetax = jobposting.servicetax;
        $scope.objjobposting.comments = jobposting.comments;
        $scope.objjobposting.changedby = jobposting.changedby;
        $scope.objjobposting.projectid = jobposting.projectid;
        $scope.objjobposting.clientid = jobposting.clientid;
        $scope.objjobposting.organization = jobposting.organization;
        $scope.objjobposting.projectname = jobposting.projectname;
        $scope.objjobposting.image = jobposting.image;
        var objDate = new Date();
        $scope.objjobposting.startdate = objDate.toLocaleString("en", {
            day: "numeric"
        }) + ' ' + objDate.toLocaleString("en", {
            month: "long"
        }) + ', ' + objDate.toLocaleString("en", {
            year: "numeric"
        });
    }

    $scope.addjobposting = function() {
        $scope.submitted = false;
        $scope.objjobposting = {};
        var objDate = new Date();
        $scope.objjobposting.startdate = objDate.toLocaleString("en", {
            day: "numeric"
        }) + ' ' + objDate.toLocaleString("en", {
            month: "long"
        }) + ', ' + objDate.toLocaleString("en", {
            year: "numeric"
        });
        $('#stdate').addClass("active");
        $scope.jobmasteragreement = {};
        if (clientid > 0) {
            $scope.objjobposting.clientid = clientid;
            $scope.selectProject($scope.objjobposting.clientid);
        }
        scope.getjobmasters();
        $('#mcaption').text("Add Job Posting");
        $('#modal1').modal('open');
        $('#divProjAdd').show();
        $('#divProjView').hide();
        $('#addingjob').hide();
        $('#failure').html("");
    }

    $scope.addingjobposting = function() {
        $scope.submitted = false;
        $scope.agreementproject($scope.objjobposting.projectid, $scope.objjobposting.clientid);
        scope.getjobmasters();
        $('#mcaption').text("Add Job Posting");
        $("label").addClass("active");
        $('#modal2').modal('open');
        $('#failure').html("");
    }

    // Save jobposting
    $scope.savejobposting = function(data, jobs) {
        var method;
        // console.log(data);
        // console.log(jobs);
        var jobpostingid = data.jobpostingid;
        if (jobpostingid > 0) {
            method = 'PUT';
        } else {
            method = 'POST';
        }
        $http({
            url: api_url + "/job/jobposting",
            data: $.param({
                jobpostingid: jobpostingid,
                clientid: data.clientid,
                projectid: data.projectid,
                jobs: jobs,
                changedby: data.changedby,
                startdate: data.startdate
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : atoken
            }, 
            method: method,
        }).success(function(response, result) {
            if (result = 200) {
                $http({
                    method: 'GET', 
                    headers : {
                        "Authorization" : atoken
                    },
                    url: api_url + "/job/jobposting/" + response.jobpostingid,
                }).then(function successCallback(response) {
                    if (response.status = 200) {
                        Materialize.toast('Posting saved Successfully !', 3000, 'green');
                        if (jobpostingid > 0) {
                            for (var loop = 0; loop < $scope.jobpostings.length; loop++) {
                                if ($scope.jobpostings[loop].jobpostingid == data.jobpostingid) {
                                    $scope.jobpostings[loop] = response.data[0];
                                    $scope.select($scope.jobpostings[loop]);
                                    break;
                                }
                            }
                        } else {
                            $scope.jobpostings.unshift(response.data[0]);
                            $scope.select($scope.jobpostings[0]);
                        }
                        $(".modal").modal("close");
                    }
                }, function errorCallback(response) {});
            }
        }).error(function(error) {
            $('#failure').html(error);
        });
    };

    //Edit agreementproject
    $scope.agreementproject = function(projectid) {
        $http({
            method: 'GET', 
            headers : {
                "Authorization" : atoken
            },
            url: api_url + "/agreement/project/" + projectid,
        }).then(function successCallback(response) {
            if (response.status = 200) {

                if (response.data.length == 0) {
                    $scope.jobmasteragreement = scope.objjobs;
                } else {
                    $scope.objjobposting.projectid = projectid;
                    $scope.jobmasteragreement = response.data;

                    angular.forEach($scope.jobmasteragreement, function(jobs) {
                        jobs.maxvalue = jobs.numberofvacancies;
                    });
                }
            }
        }, function errorCallback(response) {});
    }

    $scope.saveaddingjobposting = function(data, jobs) {

        var method;
        method = 'PUT';
        //alert(JSON.stringify(jobs.numberofvacancies))
        //alert(JSON.stringify(jobs))   
        $http({
            url: api_url + "/job/jobposting",
            data: $.param({
                jobpostingid: data.jobpostingid,
                jobs: jobs
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : atoken
            },
            method: method,
        }).success(function(response, result) {

            if (result = 200) {
                $http({
                    method: 'GET', 
                    headers : {
                        "Authorization" : atoken
                    },
                    url: api_url + "/job/jobposting/" + response.jobpostingid,
                }).then(function successCallback(response) {

                    if (response.status = 200) {
                        //alert(JSON.stringify(jobpostingid))
                        if (data.jobpostingid > 0) {

                            for (var loop = 0; loop < $scope.jobpostings.length; loop++) {
                                if ($scope.jobpostings[loop].jobpostingid == data.jobpostingid) {
                                    $scope.jobpostings[loop] = response.data[0];
                                    $scope.select($scope.jobpostings[loop]);
                                    break;
                                }
                            }
                        } else {
                            $scope.jobpostings.unshift(response.data[0]);
                            $scope.select($scope.jobpostings[0]);
                        }
                        $('#modal2').modal('close');
                    }
                }, function errorCallback(response) {});
            }
        }).error(function(error) {
            $('#failure').html(error);
        });
    }
    // Delete jobposting
    $scope.removejobposting = function() {
        if (confirm("Are you sure to delete this detail?")) {
            $http({
                url: api_url + "/job/jobposting",
                data: $.param({
                    jobpostingid: $scope.objjobposting.jobpostingid
                }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization' : atoken
                },
                method: 'DELETE',
            }).success(function(response, result) {
                if (result = 200) {
                    for (var loop = 0; loop < $scope.jobpostings.length; loop++) {
                        if ($scope.jobpostings[loop].jobpostingid == $scope.objjobposting.jobpostingid) {
                            $scope.jobpostings.splice(loop, 1);
                            $scope.select($scope.jobpostings[loop]);
                            break;
                        }
                    }
                }
            }).error(function(error) {
                $scope.error = error;
            });
        };
    }


    //Edit agreementproject
    $scope.fillclientproject = function(projectid) {
        //alert(projectid);
        // $http({
        //     method: 'GET', 
        //     headers : {
        //         "Authorization" : atoken
        //     },
        //     url: api_url + "/jobposting/prjectnos",
        // }).then(function successCallback(response) {
        //     if (response.status = 200) {
        //         $scope.projectnos = response.data;
        //         angular.forEach($scope.projectnos, function(project) {
        //             if (project.projectid == projectid) {
        //                 $scope.objjobposting.clientid = project.clientid;
        //                 // Load Selected Projects
        //                 $scope.selectedprojects = [];
        //                 var obj = {}
        //                 for (obj of $scope.projects) {
        //                     if (obj.clientid == project.clientid) {
        //                         $scope.selectedprojects.push(obj);
        //                     }
        //                 }
        //                 $scope.objjobposting.projectid = project.projectid;
        //             }
        //         });
        //     }
        // }, function errorCallback(response) {
        //     Materialize.toast('Something has gone wrong!', 3000, 'red');
        // });

        $http({
            method: 'GET',
            headers: {
                'Authorization' : atoken
            }, 
            url: api_url + "/jobposting/prjectnossearch/" + projectid,
        }).then(function successCallback(response) {
            console.log('response....response',response);
            if (response.status = 200) {
                $scope.objjobposting.projectid = response.data[0].projectid;
                $scope.objjobposting.projectname = response.data[0].name;
                $scope.objjobposting.organization = response.data[0].organization;
                $scope.objjobposting.clientid = response.data[0].clientid;
                $scope.objjobposting.agreementtypeid = response.data[0].agreementtypeid;
                $scope.objjobposting.code = response.data[0].code;
            }
        }, function errorCallback(response) {
            Materialize.toast('Something has gone wrong!', 3000, 'red');
        });

        $http({
            method: 'GET', 
            headers : {
                "Authorization" : atoken
            },
            url: api_url + "/agreement/project/" + projectid,
        }).then(function successCallback(response) {
            if (response.status = 200) {
                console.log(response);

                if (response.data.length == 0) {
                    $scope.jobmasteragreement = scope.objjobs;
                } else {
                    $scope.jobmasteragreement = {};
                    $scope.objjobposting.projectid = projectid;
                    $scope.jobmasteragreement = response.data;

                    angular.forEach($scope.jobmasteragreement, function(jobs) {
                        jobs.maxvalue = jobs.numberofvacancies;
                    });
                }
            }
        }, function errorCallback(response) {});

    };

    $scope.editjobposting = function() {
        $scope.submitted = false;
        $scope.editjobpostings($scope.objjobposting.jobpostingid);
        $('#stdate').addClass("active");
        $('#mcaption').text("Edit Jobposting");
        $('#modal3').modal('open');
        $('#failure').html("");
    }

    //Edit agreementproject
    $scope.editjobpostings = function(jobpostingid) {
        $http({
            method: 'GET', 
            headers : {
                "Authorization" : atoken
            },
            url: api_url + "/job/jobposting/" + jobpostingid,
        }).then(function successCallback(response) {
            console.log(response);
            if (response.status = 200) {
                $scope.select(response.data[0]);
            }
        }, function errorCallback(response) {});
    }

    // update jobposting
    $scope.updatejobposting = function(data, jobs) {
        var method;
        console.log(data);
        console.log(jobs);
        var jobpostingid = data.jobpostingid;

        $http({
            url: api_url + "/job/jobpostingdetail",
            data: $.param({
                jobpostingid: data.jobpostingid,
                clientid: data.clientid,
                projectid: data.projectid,
                jobs: jobs,
                changedby: data.changedby,
                startdate: data.startdate
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : atoken
            }, 
            method: 'POST',
        }).success(function(response, result) {
            if (result = 200) {
                $http({
                    method: 'GET', 
                    headers : {
                        "Authorization" : atoken
                    },
                    url: api_url + "/job/jobposting/" + response.jobpostingid,
                }).then(function successCallback(response) {
                    if (response.status = 200) {
                        Materialize.toast('Posting updated Successfully !', 3000, 'green');
                        if (jobpostingid > 0) {
                            for (var loop = 0; loop < $scope.jobpostings.length; loop++) {
                                if ($scope.jobpostings[loop].jobpostingid == data.jobpostingid) {
                                    $scope.jobpostings[loop] = response.data[0];
                                    $scope.select($scope.jobpostings[loop]);
                                    break;
                                }
                            }
                        } else {
                            $scope.jobpostings.unshift(response.data[0]);
                            $scope.select($scope.jobpostings[0]);
                        }
                        $("#modal3").modal("close");
                    }
                }, function errorCallback(response) {});
            }
        }).error(function(error) {
            $('#failure').html(error);
        });
    };

});