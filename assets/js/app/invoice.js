var app = angular.module('pendingatt', ['ngTable', 'ui.bootstrap']);
app.controller('pendingattctrl', function ($scope, $http, $filter, NgTableParams) {
    $scope.count = 0;
    $scope.itemsPerPage = $scope.totalItems;
    $scope.selectedproj = [];
    $scope.regionid = regionid;
    // $scope.viewby = 20;
    // $scope.totalItems = 0;
    // $scope.currentPage = 1;
    // $scope.maxSize = 5; //Number of pager buttons to show

    $scope.pendingmember = function (data) {
        $scope.getinvoice = function (data) {
            if (data.regionid == undefined) {
                data.regionid = 0;
            } 
            if(data.monthandyear == undefined)  {
                Materialize.toast('Please Select Month', 3000, 'red');
                return;
            }
            $http({
                method: 'GET', 
                headers : {
                    "Authorization" : atoken
                },
                url: api_url + "/job/Invoiceprint?monthandyear="+data.monthandyear+"&regionid="+data.regionid+"&type="+data.type,
            }).then(function successCallback(response) {
                if (response.status = 200) {
                    var data = response.data;
                    $scope.tableParams = new NgTableParams({
                        page: 1,
                        count: 20
                    }, {
                        data: data
                    });
                    $scope.confirm = response.data;
                    $scope.totalItems = $scope.confirm.length;
                } else {
                    Materialize.toast('error', 3000, 'red');
                }
            }, function errorCallback(response) {
                Materialize.toast('error', 3000, 'red');
            });
        };
    }

    $http({
        method: 'GET', 
        headers : {
            "Authorization" : atoken
        },
        url: api_url + "/lookupvalues?lkdmcode=REGION",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.region = response.data.lookupvalues;
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });

    $http({
        method: 'GET', 
        headers : {
            "Authorization" : atoken
        },
        url: api_url + "/lookupvalues/lookupvalueid?lkdmcode=APROVE&code=PEND",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.pendingcode = response.data.lkvalid;
            $scope.pendingmember();
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });

    $http({
        method: 'GET', 
        headers : {
            "Authorization" : atoken
        },
        url: api_url + "/lookupvalues/lookupvalueid?lkdmcode=APROVE&code=CONFIRM",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.confirmcode = response.data.lkvalid;
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });


    $http({
        method: 'GET', 
        headers : {
            "Authorization" : atoken
        },
        url: api_url + "/lookupvalues/lookupvalueid?lkdmcode=APROVE&code=REJECT",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.rejectcode = response.data.lkvalid;
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });

    $scope.getcombinedagreement = function (objattendance) {
        $scope.selectedproj = [];
        $scope.objattendance = objattendance;
        // var url='';
        if (objattendance.regionid == undefined) {
            objattendance.regionid = 0;
        }
        // alert(JSON.stringify(objattendance))
        
        if(objattendance.fromdate == undefined || objattendance.todate == undefined)  {
            Materialize.toast('Please select fromdate', 3000, 'red');
            return;
        } 
        
        $http({
            method: 'POST',
            url: api_url + '/job/getCombinedClaimsProjects',
            data: $.param({
                "data": objattendance,
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : atoken
            }, 
        }).success(function (response, result) {
            //alert(JSON.stringify(response))
            if (response.status = 200) {
                var data1 = response;
                $scope.tableParams1 = new NgTableParams({
                    page: 1,
                    count: 35
                }, {
                    data: data1
                });
                // $scope.confirm = response.data;
                //$scope.totalItems = $scope.confirm.length;
            } else {
                Materialize.toast('error', 3000, 'red');
            }
        }).error(function (error) {
            Materialize.toast(error, 3000, 'red');
        });
    };

    $scope.selectEntityPassorder = function (selected) {
        if (selected.ischecked) {
            $scope.selectedproj.push(selected)
        }
        else {
            $scope.selectedproj.splice(selected, 1)
        }
    };

    
    $scope.resetproj = function (selected) {
        $scope.selectedproj = [];
    }

    $scope.proceedcombined = function () {
        var finalarray = [{ 'projects': $scope.selectedproj }]
        // alert(JSON.stringify(finalarray));
        $http({
            method: 'POST',
            url: api_url + "/job/createCombinedClaims",
            data: $.param({ 'data': finalarray }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : atoken
            }, 
        }).success(function (response, result) {
            if (response.status = 200) {

                $scope.getcombinedagreement($scope.objattendance);
                Materialize.toast(' success!', 3000, 'green');
            }
        }).error(function (error) {
            Materialize.toast(error, 3000, 'red');
        });
    }

    // $scope.approvestatus = function(clientid,lkvalid) { 
    //     $http({
    //         method: 'GET',
    //         url: api_url + "/attendance/duties?monthandyear=august%202017",
    //     }).success(function(response, result) {
    //         if (response.status = 200) {
    // Materialize.toast('Approval Success', 3000, 'green');
    //             $scope.pendingmember();
    //         } else {
    //             Materialize.toast('error', 3000, 'red');
    //         }
    //     }).error(function(error) {
    //         $('#failure').html(error);
    //     });
    // };

    $scope.generateinvoice = function (projectid, monthandyear) {
        $http({
            method: 'POST',
            url: api_url + "/attendance/invoice",
            data: $.param({
                "projectid": projectid,
                "monthandyear": monthandyear,
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : atoken
            }, 
        }).success(function (response, result) {
            if (response.status = 200) {
                Materialize.toast('Invoice Generated Successfully ', 3000, 'green');
                $scope.getinvoice(monthandyear)
            }
        }).error(function (error) {
            Materialize.toast('Wage Rate is not available. Please check', 3000, 'red');
        });
    };

    $scope.editattendance = function (monthandyear, projectid) {
        $('#failure').html("");
        $scope.members = [];
        $http({
            method: 'GET', 
            headers : {
                "Authorization" : atoken
            },
            url: api_url + "/client/attendancedetails?projectid=" + projectid + "&monthandyear=" + monthandyear,
        }).then(function successCallback(response) {
            if (response.status = 200) {
                if (response.data[0] != undefined) {
                    $scope.members = response.data[0].members;
                } else {
                    $scope.selectMembers(projectid);
                }
            } else {
                Materialize.toast('error', 3000, 'red');
            }
        }, function errorCallback(response) {
            Materialize.toast('error', 3000, 'red');
        });
    };

    $scope.openattendance = function (monthandyear, projectid, clientid) {
        $('#modal2').modal('open');
        $('#divProjAdd').show();
        $('#divProjView').hide();
        $('#addingjob').hide();
        $('#failure').html("");
        $('#failure').html("");
        $scope.members = [];
        $scope.projectid = projectid;
        $scope.clientid = clientid;
        $scope.monthandyear = monthandyear;
        $http({
            method: 'GET', 
            headers : {
                "Authorization" : atoken
            },
            url: api_url + "/client/attendancedetails?projectid=" + projectid + "&monthandyear=" + monthandyear,
        }).then(function successCallback(response) {
            if (response.status = 200) {
                if (response.data[0] != undefined) {
                    $scope.members = response.data[0].members;
                } else {
                    $scope.selectMembers(projectid);
                }
            } else {
                Materialize.toast('error', 3000, 'red');
            }
        }, function errorCallback(response) {
            Materialize.toast('error', 3000, 'red');
        });
    }


    $scope.saveattendance = function (objattendance, members) {
        $http({
            method: 'POST',
            url: api_url + "/client/attendance",
            data: $.param({
                "clientid": $scope.clientid,
                "projectid": $scope.projectid,
                "members": members,
                "monthandyear": $scope.monthandyear,
                "changedby": 'texco'
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : atoken
            }, 
        }).success(function (response, result) {
            if (response.status = 200) {
                Materialize.toast('Attendance Saved succsessfully', 3000, 'green');
                $('#modal2').modal('close');
            }
        }).error(function (error) {
            $('#failure').html(error);
        });
    };
    $scope.$watch('members', function (members) {
        $scope.count = [];
        var PresentItems = 0;
        var otItems = 0;
        angular.forEach(members, function (member) {
            PresentItems += (member.one == 1) ? 1 : 0;
            PresentItems += (member.two == 1) ? 1 : 0;
            PresentItems += (member.three == 1) ? 1 : 0;
            PresentItems += (member.four == 1) ? 1 : 0;
            PresentItems += (member.five == 1) ? 1 : 0;
            PresentItems += (member.six == 1) ? 1 : 0;
            PresentItems += (member.seven == 1) ? 1 : 0;
            PresentItems += (member.eight == 1) ? 1 : 0;
            PresentItems += (member.nine == 1) ? 1 : 0;
            PresentItems += (member.ten == 1) ? 1 : 0;
            PresentItems += (member.eleven == 1) ? 1 : 0;
            PresentItems += (member.twelve == 1) ? 1 : 0;
            PresentItems += (member.thirteen == 1) ? 1 : 0;
            PresentItems += (member.fourteen == 1) ? 1 : 0;
            PresentItems += (member.fifteen == 1) ? 1 : 0;
            PresentItems += (member.sixteen == 1) ? 1 : 0;
            PresentItems += (member.seventeen == 1) ? 1 : 0;
            PresentItems += (member.eighteen == 1) ? 1 : 0;
            PresentItems += (member.nineteen == 1) ? 1 : 0;
            PresentItems += (member.twenty == 1) ? 1 : 0;
            PresentItems += (member.twentyone == 1) ? 1 : 0;
            PresentItems += (member.twenttwo == 1) ? 1 : 0;
            PresentItems += (member.twentythree == 1) ? 1 : 0;
            PresentItems += (member.twentyfour == 1) ? 1 : 0;
            PresentItems += (member.twentyfive == 1) ? 1 : 0;
            PresentItems += (member.twentysix == 1) ? 1 : 0;
            PresentItems += (member.twentyseven == 1) ? 1 : 0;
            PresentItems += (member.twentyeight == 1) ? 1 : 0;
            PresentItems += (member.twentynine == 1) ? 1 : 0;
            PresentItems += (member.thirty == 1) ? 1 : 0;
            PresentItems += (member.thirtyone == 1) ? 1 : 0;
            member.presentdays = PresentItems;
            PresentItems = 0;

            otItems += (member.one == 2) ? 2 : 0;
            otItems += (member.two == 2) ? 2 : 0;
            otItems += (member.three == 2) ? 2 : 0;
            otItems += (member.four == 2) ? 2 : 0;
            otItems += (member.five == 2) ? 2 : 0;
            otItems += (member.six == 2) ? 2 : 0;
            otItems += (member.seven == 2) ? 2 : 0;
            otItems += (member.eight == 2) ? 2 : 0;
            otItems += (member.nine == 2) ? 2 : 0;
            otItems += (member.ten == 2) ? 2 : 0;
            otItems += (member.eleven == 2) ? 2 : 0;
            otItems += (member.twelve == 2) ? 2 : 0;
            otItems += (member.thirteen == 2) ? 2 : 0;
            otItems += (member.fourteen == 2) ? 2 : 0;
            otItems += (member.fifteen == 2) ? 2 : 0;
            otItems += (member.sixteen == 2) ? 2 : 0;
            otItems += (member.seventeen == 2) ? 2 : 0;
            otItems += (member.eighteen == 2) ? 2 : 0;
            otItems += (member.nineteen == 2) ? 2 : 0;
            otItems += (member.twenty == 2) ? 2 : 0;
            otItems += (member.twentyone == 2) ? 2 : 0;
            otItems += (member.twentytwo == 2) ? 2 : 0;
            otItems += (member.twentythree == 2) ? 2 : 0;
            otItems += (member.twentyfour == 2) ? 2 : 0;
            otItems += (member.twentyfive == 2) ? 2 : 0;
            otItems += (member.twentysix == 2) ? 2 : 0;
            otItems += (member.twentyseven == 2) ? 2 : 0;
            otItems += (member.twentyeight == 2) ? 2 : 0;
            otItems += (member.twentynine == 2) ? 2 : 0;
            otItems += (member.thirty == 2) ? 2 : 0;
            otItems += (member.thirtyone == 2) ? 2 : 0;
            member.otdays = otItems;
            otItems = 0;
        })
    }, true);
});

