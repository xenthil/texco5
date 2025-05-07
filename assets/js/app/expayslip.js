var app = angular.module('appadminattendance', ['ngTable', 'ui.bootstrap']);
app.controller('ctrladminattendance', function($scope, $http, $filter, NgTableParams) {

    $scope.attendancedetails = [];
    $scope.selected = {};
    $scope.objattendance = {};
    $scope.attendance = [];
	$scope.totaldays = 0;
	$scope.totalhours = 0;

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

    $scope.projectnos = [];
    if(roleid != 5) {
        regionid = 0;
    }
    $http({
        method: 'GET', 
        headers : {
            "Authorization" : atoken
        },
        url: api_url + "/prjectnumbers?regionid="+regionid,
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.projectnos = response.data;
            console.log('$scope.projectnos',$scope.projectnos);
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });

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

    // Get Attendance
    $http({
        method: 'GET', 
        headers : {
            "Authorization" : atoken
        },
        url: api_url + "/lookupvalues?lkdmcode=ATTEND",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.attendance = response.data.lookupvalues;
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });

    // Get Projects
    // $scope.projectnos = [];
    // $http({
    //     method: 'GET',
    //     url: api_url + "/prjectnos",
    // }).then(function successCallback(response) {
    //     if (response.status = 200) {
    //         $scope.projectnos = response.data;
    //     }
    // }, function errorCallback(response) {
    //     Materialize.toast('Something has gone wrong!', 3000, 'red');
    // });

    $scope.fillclientproject = function(projectid) {
        $scope.objattendance.monthandyear = "";
        $http({
            method: 'GET', 
            headers : {
                "Authorization" : atoken
            },
            url: api_url + "/jobposting/prjectnossearch/" + projectid,
        }).then(function successCallback(response) {
            if (response.status = 200) {
                $scope.objattendance.projectname = response.data[0].name;
                $scope.objattendance.projectno = response.data[0].projectno;
				$scope.objattendance.clientid = response.data[0].clientid;
				$scope.objattendance.projectid = response.data[0].projectid;
            }
        }, function errorCallback(response) {
            Materialize.toast('Something has gone wrong!', 3000, 'red');
        });
    };

    //Edit agreementproject
    // $scope.fillclientproject = function(projectid) {
    //     $scope.objattendance.monthandyear = "";

    //     $http({
    //         method: 'GET',
    //         url: api_url + "/prjectnos",
    //     }).then(function successCallback(response) {
    //         if (response.status = 200) {
    //             $scope.projectnos = response.data;
    //             angular.forEach($scope.projectnos, function(project) {
    //                 if (project.projectid == projectid) {
    //                     $scope.objattendance.clientid = project.clientid;
    //                     // Load Selected Projects

    //                     $scope.selectedprojects = [];
    //                     var obj = {}
    //                     for (obj of $scope.projects) {
    //                         if (obj.clientid == project.clientid) {
    //                             $scope.selectedprojects.push(obj);
    //                         }
    //                     }
    //                     $scope.objattendance.projectid = project.projectid;

    //                 }
    //             });
    //         }

    //     }, function errorCallback(response) {
    //         Materialize.toast('Something has gone wrong!', 3000, 'red');
    //     });
    // };

    //Load Selected Projects
    $scope.selectProject = function(clientid) {
        $scope.selectedprojects = [];
        var obj = {}
        for (obj of $scope.projects) {
            if (obj.clientid == clientid) {
                $scope.selectedprojects.push(obj);
            }
        }
    }

    $scope.getmembers = function(clientid, projectid) {
        $scope.memberdetails = [];
        $http({
            method: 'GET', 
            headers : {
                "Authorization" : atoken
            },
            url: api_url + "/client/attendance/" + clientid,
        }).then(function successCallback(response) {

            if (response.status = 200) {
                var data = response.data;
                $scope.tableParams = new NgTableParams({
                    page: 1,
                    count: response.data.length
                }, {
                    data: data
                });
                $scope.memberdetails = response.data;

                $scope.members = [];
                var obj = {}
                for (obj of $scope.memberdetails) {
                    if (obj.projectid == projectid) {
                        $scope.members.push(obj);
                    }
                }

            } else {
                Materialize.toast('error', 3000, 'red');
            }
        }, function errorCallback(response) {
            Materialize.toast('error', 3000, 'red');
        });
    }

    $scope.saveattendance = function(objattendance, members) {
        $http({
            method: 'POST',
            url: api_url + "/client/attendance",
            data: $.param({
                "clientid": objattendance.clientid,
                "projectid": objattendance.projectid,
                "members": members,
                "monthandyear": objattendance.monthandyear,
                "changedby": objattendance.changedby
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : atoken
            }, 
        }).success(function(response, result) {
            if (response.status = 200) {
                Materialize.toast('Attendance Saved succsessfully', 4000, 'green') // 4000 is the duration of the toast
                setTimeout(function(){ window.location.href = base_url + "admin/adminattendance"; }, 3000);

            }
            else
            {
               $('#failure').html(response); 
            }
        }).error(function(error) {
            $('#failure').html(error);
        });
    };

    $scope.editattendance = function(monthandyear, clientid, projectid) {
        $('#failure').html("");
        $scope.members = [];
        $http({
            method: 'GET', 
            headers : {
                "Authorization" : atoken
            },
            url: api_url + "/job/get/payslip?projectid=" + projectid + "&monthandyear=" + monthandyear,
        }).then(function successCallback(response) {

            if (response.status = 200) {
                if (response.data.length != 0) {
                    $scope.members = response.data;
                    $scope.count = response.data.length;
                    var data = response.data;
                    $scope.tableParams = new NgTableParams({
                        count: response.data.length
                    }, {
                        data: data
                    });
                } else {
                    $scope.getmembers(clientid, projectid);
                }
            } else {
                Materialize.toast('error', 3000, 'red');
            }
        }, function errorCallback(response) {
            Materialize.toast('error', 3000, 'red');
        });
    };

    $scope.monthclear = function() {
        $scope.objattendance.monthandyear = "";
    }
});