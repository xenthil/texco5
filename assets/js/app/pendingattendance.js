var app = angular.module('pendingatt', ['ngTable', 'ui.bootstrap']);
app.controller('pendingattctrl', function($scope, $http, $filter, NgTableParams) {
    $scope.count = 0;
    $scope.viewby = 20;
    $scope.totalItems = 0;
    $scope.currentPage = 1;
    $scope.itemsPerPage = $scope.viewby;
    $scope.maxSize = 5; //Number of pager buttons to show
    $scope.pendingmember = function(data) {
		
        $http({
            method: 'GET', 
            headers : {
                "Authorization" : atoken
            },
            url: api_url + "/attendance/duties?monthandyear=august%202017",
        }).then(function successCallback(response) {
            if (response.status = 200) {
				alert(JSON.stringify(response.data))
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
                alert("error");
            }
        }, function errorCallback(response) {
            alert("error");
        });
    };
	
	
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
            alert("Something has gone wrong!");
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
            alert("Something has gone wrong!");
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
            alert("Something has gone wrong!");
        });
	
	
	
    $scope.approvestatus = function(clientid,lkvalid) { 
        $http({
            method: 'GET', 
            headers : {
                "Authorization" : atoken
            },
            url: api_url + "/attendance/duties?monthandyear=august%202017",
        }).success(function(response, result) {
            if (response.status = 200) {
				alert('Approval Success')
                $scope.pendingmember();
            } else {
                alert("error");
            }
        }).error(function(error) {
            $('#failure').html(error);
        });
    };

  $scope.test = function(clientid,lkvalid) { 

  }

});