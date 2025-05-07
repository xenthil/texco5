var app = angular.module('pendingatt', ['ngTable', 'ui.bootstrap']);
app.controller('pendingattctrl', function($scope, $http, $filter, NgTableParams) {
    $scope.count = 0;
    $scope.itemsPerPage = $scope.totalItems;
    $scope.wagedetails = [];
    // $scope.viewby = 20;
    // $scope.totalItems = 0;
    // $scope.currentPage = 1;
    // $scope.maxSize = 5; //Number of pager buttons to show
    $scope.regionid = regionid;   

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


    
    $scope.getpayslip = function(objattendance) { 
        if (objattendance.regionid == undefined) {
            objattendance.regionid = 0;
        }
        $http({
            method: 'GET', 
            headers : {
                "Authorization" : atoken
            },
            url: api_url + "/job/Payslipprint?monthandyear="+objattendance.monthandyear+"&regionid="+objattendance.regionid+"&type="+objattendance.type,
        }).then(function successCallback(response) {
            if (response.status = 200) {
                var data = response.data;
                $scope.tableParams = new NgTableParams({
                    page: 1,
                    count: data.length 
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

	$scope.generatepayslip = function(projectid, monthandyear) { 
        $http({
            method: 'POST',
            url: api_url + "/job/salary/generate",
            data: $.param({
                "projectid": projectid,
                "monthandyear": monthandyear,
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : atoken
            }
        }).success(function(response, result) {
            if (response.status = 200) {
                Materialize.toast('Pay Slip Generated Successfully ', 3000, 'green');
			    $scope.getpayslip(monthandyear)
            }
            else
            {
                Materialize.toast('Please Check wage for the project', 3000, 'red');
            }
        }).error(function(error) {
            Materialize.toast(error, 3000, 'red');
        });
    }; 

    $scope.previewpayslip = function(projectid, monthandyear) { 
        $http({
            method: 'GET', 
            headers : {
                "Authorization" : atoken
            },
            url: api_url + "/job/get/payslip/preview",
            data: $.param({
                "projectid": projectid,
                "monthandyear": monthandyear,
            })
        }).success(function(response, result) {
            if (response.status = 200) {
                
            }
            else
            {
               Materialize.toast('Pay Slip Not Generated', 3000, 'Red'); 
            }
        }).error(function(error) {
            $('#failure').html(error);
        });
    }; 

    $scope.viewepayslip = function(projectid, monthandyear) { 
        $http({
            method: 'GET',
            url: api_url + "/job/get/payslip",
            data: $.param({
                "projectid": projectid,
                "monthandyear": monthandyear,
            }), 
            headers : {
                "Authorization" : atoken
            }
        }).success(function(response, result) {
            if (response.status = 200) {
                
            }
            else
            {
               Materialize.toast('Pay Slip Not Generated', 3000, 'Red'); 
            }
        }).error(function(error) {
            $('#failure').html(error);
        });
    }; 

    $scope.viewwagedetails = function(projectid) { 
        $http({
            method: 'GET',
            url: api_url + "/wage/salarycompoenent?projectid=" + projectid, 
            headers : {
                "Authorization" : atoken
            },
        }).success(function(response, result) {
            if (response.status = 200) {
                $scope.wagedetails = response;
                $('#modal2').modal('open');
            }
            else
            {
               Materialize.toast('Pay Slip Not Generated', 3000, 'Red'); 
            }
        }).error(function(error) {
            $('#failure').html(error);
        });
    }; 
});