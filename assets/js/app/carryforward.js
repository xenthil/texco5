var app = angular.module('appJobposting', ['ngTable', 'ui.bootstrap']);
app.controller('ctrlJobposting', function($scope, $http, $filter, NgTableParams, $location) {
    var scope = $scope;
    $scope.jobpostings = [];
    $scope.selected = {};
    $scope.objjobposting = {};
    $scope.filter = "";
    $scope.objjobs = [];
    $scope.objjobposting.clientid = 0;
    $scope.regions = [];
    $scope.selregionid = selregionid;

    $scope.moveDisableButton = false;
    $http({
        method: 'GET',
		headers: {
			'Authorization' : atoken
		}, 
        url: api_url + "/lookupvalues?lkdmcode=REGION",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.regions = response.data.lookupvalues;
        }
    }, function errorCallback(response) {});

    // Get jobpostings
    $http({
        method: 'GET',
		headers: {
			'Authorization' : atoken
		}, 
        url: api_url + "/job/carryforward",
    }).then(function successCallback(response) { 
        debugger
        if (response.status = 200) {
            $scope.jobpostings = response.data;
            // console.log('$scope.jobpostings',$scope.jobpostings);
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });

    // Get Clients
    $scope.clients = [];
    $http({
        method: 'GET',
		headers: {
			'Authorization' : atoken
		}, 
        url: api_url + "/client",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.clients = response.data;
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });

    // // Get Projects
    // $scope.projects = [];
    // $http({
    //     method: 'GET',
	// 	headers: {
	// 		'Authorization' : atoken
	// 	}, 
    //     url: api_url + "/client/project",
    // }).then(function successCallback(response) {
    //     if (response.status = 200) {
    //         $scope.projects = response.data;
    //     }
    // }, function errorCallback(response) {
    //     Materialize.toast('Something has gone wrong!', 3000, 'red');
    // });

    // Get Projects
    $scope.projectnos = [];
    $http({
        method: 'GET',
		headers: {
			'Authorization' : atoken
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
		headers: {
			'Authorization' : atoken
		}, 
        url: api_url + "/job/jobmaster",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.jobmasters = response.data;
        }
    }, function errorCallback(response) {

    });


    $scope.getjobmasters = function() {
        $scope.objjobs = [];
        $scope.jobmasters.forEach(function(value) {
            var item = {
                jobmasterid: value.jobmasterid,
                name: value.name,
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
        $('#mcaption').text("Add Carry forward");
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
        $('#mcaption').text("Add Jobposting");
        $("label").addClass("active");
        $('#modal2').modal('open');
        $('#failure').html("");
    }

    // Save jobposting
    $scope.savejobposting = function(data, jobs) {
        var method;
        console.log(data);
        console.log(jobs);
        var jobpostingid = data.jobpostingid;
        if (jobpostingid > 0) {
            method = 'PUT';
        } else {
            method = 'POST';
        }
        $http({
            url: api_url + "/job/carryforward/add",
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
                window.location.reload(true);
            }
        }).error(function(error) {
            $('#failure').html(error);
        });
    };

    //Edit agreementproject
    $scope.agreementproject = function(projectid) {
        $http({
            method: 'GET',
            headers: {
                'Authorization' : atoken
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

    $scope.saveaddingjobposting = function(data, jobs)  {
        var method;
        method = 'PUT';
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
                    headers: {
                        'Authorization' : atoken
                    }, 
                    url: api_url + "/job/jobposting/" + response.jobpostingid,
                }).then(function successCallback(response) {

                    if (response.status = 200) {
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
    $scope.removejobposting = function(projectid) {
        if (confirm("Are you sure to delete this detail?")) {
            $http({
                url: api_url + "/job/carryforward/delete?projectid="+ projectid,     
                headers: {
                    'Authorization' : atoken
                }, 
                method: 'GET'
            }).success(function(response, result) {
                if (result = 200) {
                    window.location.reload(true);
                }
            }).error(function(error) {
                $scope.error = error;
            });
        };
    }

    // Delete All Job posting
    $scope.deletevacancy = function() {
        if (confirm("Are you sure want to Delete all vacancy?")) {
            $http({
                url: api_url + "/job/carryforward/deleteall",
                headers: {
                    'Authorization' : atoken
                }, 
                method: 'GET',
            }).success(function(response, result) {
                if (result = 200) {
                    window.location.reload(true);
                }
            }).error(function(error) {
                Materialize.toast('Records Not Found!', 3000, 'red');
                $scope.error = error;
            });
        };
    }
    
    //Edit agreementproject
    $scope.fillclientproject = function(projectid) {
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
                
                // angular.forEach($scope.projectnos, function(project) {
                //     if (project.projectid == projectid) {
                //         $scope.objjobposting.clientid = project.clientid;
                //         // Load Selected Projects
                //         $scope.selectedprojects = [];
                //         var obj = {}
                //         for (obj of $scope.projects) {
                //             if (obj.clientid == project.clientid) {
                //                 $scope.selectedprojects.push(obj);
                //             }
                //         }
                //         $scope.objjobposting.projectid = project.projectid;
                //     }
                // });
            }
        }, function errorCallback(response) {
            Materialize.toast('Something has gone wrong!', 3000, 'red');
        });


        $http({
            method: 'GET',
            headers: {
                'Authorization' : atoken
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

    $scope.editjobposting = function(project) { 
        debugger
        $scope.submitted = false;
		$scope.select(project);        
        $('#stdate').addClass("active");
        $('#mcaption').text("Edit Carry Forward");
        $('#modal3').modal('open');
        $('#failure').html("");
    }

    // update jobposting
    $scope.updatejobposting = function(data, jobs) {
        var method;
        console.log(data);
        console.log(jobs);
        var jobpostingid = data.jobpostingid;

        $http({
            url: api_url + "/job/carryforward/add",
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
                    headers: {
                        'Authorization' : atoken
                    }, 
                    url: api_url + "/job/jobposting/" + response.jobpostingid,
                }).then(function successCallback(response) {
                    if (response.status = 200) {
						$("#modal3").modal("close");                        
						window.location.reload(true);
						
						setTimeout(function(){ 
						 
							Materialize.toast('Carry Forward Updated Successfully !', 3000, 'green');
						 
						 }, 1000);
						
						
						
                    }
                }, function errorCallback(response) {});
            }
        }).error(function(error) {
            $('#failure').html(error);
        });
    };

    $scope.exportvacancy = function() {     
        debugger 
        $http({
            method: 'GET',
            headers: {
                'Authorization' : atoken
            }, 
            url: api_url + "/job/carryforwardexport",
        }).then(function successCallback(response) {
            if (response.status = 200) {
                $scope.jobpostingss = response.data;
               // console.log('$scope.jobpostings',$scope.jobpostings); 
                var results = [];
                for(var i = 0;i < $scope.jobpostingss.length; i++) {
                    var result = [{'PROJNO':$scope.jobpostingss[i].projectno,'PROJNAME':$scope.jobpostingss[i].projectname,'DISTRICT':$scope.jobpostingss[i].district,'REGION':$scope.jobpostingss[i].region,'WAGETYPE':$scope.jobpostingss[i].wagetype}];
                    angular.forEach($scope.jobpostingss[i].jobs, function(projects) {
                        result[0][projects.code]=projects.numberofvacancies;
                    });
                    result[0]['COMMENTS']= '';
                    result[0]['INPLACEOF']= '';
                    angular.forEach($scope.jobpostingss[i].jobs, function(projects) {
                        if(projects.comments != undefined) { result[0]['COMMENTS'] += projects.comments; }
                        if(projects.inplace != undefined) { result[0]['INPLACEOF'] += projects.inplace; }
                    });
                    results.push(result[0]);
                    var result = [];
                }
                JSONToCSVConvertor(results, 'Moved_VacancyList', true);
            }
        }, function errorCallback(response) {
            Materialize.toast('Something has gone wrong!', 3000, 'red');
        });
    }
    // Move jobposting
    $scope.movevacancy = function(projectid) {
        if (confirm("Are you sure to move vacancy?")) {
            $scope.moveDisableButton = true;
            $http({
                url: api_url + "/job/carryforward/move",
                headers: {
                    'Authorization' : atoken
                }, 
                method: 'GET',
            }).success(function(response, result) {
                if (result = 200) {
                    window.location.reload(true);
                }
            }).error(function(error) {
                Materialize.toast('Records Not Found!', 3000, 'red');
                $scope.error = error;
            });
        };
    }

    $scope.regionIncludes = [];

    $scope.includeRegion = function(regionid) {
        var i = $.inArray(regionid, $scope.regionIncludes);
        if (i > -1) {
            $scope.regionIncludes.splice(i, 1);
        } else {
            $scope.regionIncludes.push(regionid);
        }
    }
    if( $scope.selregionid != "")
    {
       $scope.includeRegion($scope.selregionid);
    }

    $scope.regionFilterclient = function(client) {
        $scope.dgrcount = 0;
        $scope.tncount = 0;
        var result;
        if ($scope.regionIncludes.length > 0) {
            client.projects.forEach(function(project) {
                if ($.inArray(project.regionid, $scope.regionIncludes) >= 0) {
                    result = client;
                }
            });
            return result;
        }
        return client;
    }

    $scope.regionFilter = function(project) {

        if ($scope.regionIncludes.length > 0) {
            if ($.inArray(project.regionid, $scope.regionIncludes) < 0)
                return;
        }
         // if (project.wagetype == "DGR Value") 
         // {
         // $scope.dgrcount += project.jobs.length;
         // }else 
         // {
         //     $scope.tncount += project.jobs.length;
         // }
        return project;
    }

    function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {

        //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
        var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;

        var CSV = '';
        //Set Report title in first row or line

        //This condition will generate the Label/Header
        if (ShowLabel) {
            var row = "";

            //This loop will extract the label from 1st index of on array
            for (var index in arrData[0]) {

                //Now convert each value to string and comma-seprated
                row += index.toUpperCase() + ',';
            }

            row = row.slice(0, -1);

            //append Label row with line break
            CSV += row + '\r\n';
        }

        //1st loop is to extract each row
        for (var i = 0; i < arrData.length; i++) {
            var row = "";
            // console.log('arrData',arrData[i]);
            //2nd loop will extract each column and convert it in string comma-seprated
            for (var index in arrData[i]) {
                row += '"' + arrData[i][index] + '",';
            }

            row.slice(0, row.length - 1);

            //add a line break after each row
            CSV += row + '\r\n';
        }

        if (CSV == '') {
            Materialize.toast('Invalid Data', 3000, 'red');
            return;
        }

        //Generate a file name
        //this will remove the blank-spaces from the title and replace it with an underscore
        var fileName = ReportTitle.replace(/ /g, "_");

        //Initialize file format you want csv or xls
        var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);

        // Now the little tricky part.
        // you can use either>> window.open(uri);
        // but this will not work in some browsers
        // or you will not get the correct file extension    

        //this trick will generate a temp <a /> tag
        var link = document.createElement("a");
        link.href = uri;

        //set the visibility hidden so it will not effect on your web-layout
        link.style = "visibility:hidden";
        link.download = fileName + ".csv";

        //this part will append the anchor tag and remove it after automatic click
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

});