var app = angular.module('appDashboard', ['ngTable', 'ui.bootstrap']);
app.controller('ctrlDashboard', function($scope, $http, $filter, NgTableParams) {
    $scope.count = 0;
    $scope.itemsPerPage = $scope.totalItems;
    $scope.totalmembers = {};
    $scope.totalclients = {};
    $scope.totalprojects = {};
    $scope.agreementexpirefuture = [];

    $http({
        method: 'GET', 
        headers: {
            'Authorization' : atoken
        }, 
        url: api_url + "/client/project/totalprojects",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.totalprojects = response.data.numberofprojects;
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });

    $http({
        method: 'GET', 
        headers: {
            'Authorization' : atoken
        }, 
        url: api_url + "/agreement/expirylist/region?regionid="+regionid,
    }).then(function successCallback(response) {
        if (response.status = 200) {
            var data = response.data;
            $scope.tableParams = new NgTableParams({
                page: 1,
                count: response.data.length
            }, {
                data: data
            });
            $scope.totalItems = response.data.length;
        } else {
            Materialize.toast('error', 3000, 'red');
        }
    }, function errorCallback(response) {
        console.log("Something has gone wrong!");
    });

    $http({
        method: 'GET', 
        headers: {
            'Authorization' : atoken
        }, 
        url: api_url + "/job/AMPostedMembers?regionid=" + regionid,
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.postedmemberss = response.data;
            // console.log('$scope.clients',$scope.postedmemberss);
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });

    $http({
        method: 'GET', 
        headers: {
            'Authorization' : atoken
        }, 
        url: api_url + "/job/AMApprovedPostedMembers?regionid=" + regionid,
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.workingmembers = response.data;
            // console.log('$scope.clients',$scope.workingmembers);
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });

    $http({
        method: 'GET', 
        headers: {
            'Authorization' : atoken
        }, 
        url: api_url + "/agreement/expirylist/future/region?regionid="+regionid,
    }).then(function successCallback(response) {
        if (response.status = 200) {
            var data = response.data;
            $scope.agreementexpirefuture = data;
        } else {
            Materialize.toast('error', 3000, 'red');
        }
    }, function errorCallback(response) {
        console.log("Something has gone wrong!");
    });

    $scope.AcceptJobs = function(posted,status) {
        $('#modalconfirm').modal('open');
        if(status == 1) {
            $('#mcaption1').text('Do you want to confirm this posting order ?');
        } 
        if(status == 2) {
            $('#mcaption1').text('Do you want to Cancel this posting order ?');
        }
        $scope.clientid = posted.clientid;
        $scope.memberhistoryid = posted.memberhistoryid;
        $scope.memberid = posted.memberid;
        $scope.status = status;
    };

    $scope.jobcancelclose = function() {
        $('#modalconfirm').modal('close');
    }

    $scope.jobconfirmPopup = function(clientid,memberhistoryid,memberid,status) {
        $http({
            url: api_url + "/job/ApproveJobs",
            data: $.param({
                clientid: clientid,
                memberhistoryid: memberhistoryid,
                memberid:  memberid,
                status: status
            }), 
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : atoken
            }, 
            method: 'POST'
        }).then(function successCallback(response) {
            // console.log('response',response);
            if (response.status = 200) {
                $('#modalconfirm').modal('close');
                if(status == 1) {
                    Materialize.toast('Job Posting has been confirmed!', 3000, 'green');
                }
                if(status == 2) { 
                    Materialize.toast('Job Posting has been Rejected!', 3000, 'green');
                }

                $http({
                    method: 'GET', 
                    headers: {
                        'Authorization' : atoken
                    }, 
                    url: api_url + "/job/AMPostedMembers?regionid=" + regionid,
                }).then(function successCallback(response) {
                    if (response.status = 200) {
                        $scope.postedmemberss = response.data;
                        // console.log('$scope.clients',$scope.postedmemberss);
                    }
                }, function errorCallback(response) {
                    Materialize.toast('Something has gone wrong!', 3000, 'red');
                });

                $http({
                    method: 'GET', 
                    headers: {
                        'Authorization' : atoken
                    }, 
                    url: api_url + "/job/AMApprovedPostedMembers?regionid=" + regionid,
                }).then(function successCallback(response) {
                    if (response.status = 200) {
                        $scope.workingmembers = response.data;
                        // console.log('$scope.clients',$scope.workingmembers);
                    }
                }, function errorCallback(response) {
                    Materialize.toast('Something has gone wrong!', 3000, 'red');
                });
            }
        }, function errorCallback(response) {
            Materialize.toast('Something has gone wrong!', 3000, 'red');
        });
    };

});