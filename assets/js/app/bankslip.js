var app = angular.module('pendingatt', ['ngTable', 'ui.bootstrap']);
app.controller('pendingattctrl', function($scope, $http, $filter, NgTableParams) {
    $scope.count = 0;
    $scope.itemsPerPage = $scope.totalItems;
    // $scope.viewby = 20;
    // $scope.totalItems = 0;
    // $scope.currentPage = 1;
    // $scope.maxSize = 5; //Number of pager buttons to show
		
    $scope.getbankslip = function(monthandyear) { 

        $http({
            method: 'GET',
            headers: {
                'Authorization' : atoken
            }, 
            url: api_url + "/attendance/duties/bankslip?monthandyear="+monthandyear,
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

	$scope.generatebank = function(projectid, monthandyear) { 
        $http({
            method: 'POST',
            url: api_url + "/attendance/generate/bankslip",
            data: $.param({
                "projectid": projectid,
                "monthandyear": monthandyear,
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : atoken
            },
        }).success(function(response, result) {
            if (response.status = 200) {
                Materialize.toast('Bank slip genrated Successfully ', 3000, 'green');
			    $scope.getpayslip(monthandyear)
            }
        }).error(function(error) {
            Materialize.toast(error, 3000, 'red');
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
            headers: {
                'Authorization' : atoken
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

    $scope.reject = function(projectid, monthandyear) { 
        $http({
            method: 'POST',
            url: api_url + "/job/invoice/reject",
            data: $.param({
                "projectid": projectid,
                "monthandyear": monthandyear,
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : atoken
            },
        }).success(function(response, result) {
            if (response.status = 200) {
                Materialize.toast('Rejection done Successfully ', 3000, 'red');
                $scope.getpayslip(monthandyear)
            }
        }).error(function(error) {
            Materialize.toast(error, 3000, 'red');
        });
    }; 
});