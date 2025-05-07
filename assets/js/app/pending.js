var app = angular.module('pendingmem', ['ngTable', 'ui.bootstrap']);
app.controller('pendingmemctrl', function($scope, $http, $filter, NgTableParams) {
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
            url: api_url + "/client/approvals?lkvalid="+$scope.pendingcode,
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
	
	
	
    $scope.approvestatus = function(clientid,lkvalid,status) { 
        $http({
            method: 'GET', 
            headers : {
                "Authorization" : atoken
            },
            url: api_url + "/client/approval?clientid="+clientid+"&approvalid="+lkvalid,
        }).success(function(response, result) {
            if (response.status = 200) {
				if(status==0)
				{
				Materialize.toast('Approval Rejected', 3000, 'red');
				}
				else
				{
					Materialize.toast('Approval Success', 3000, 'green');
				}
				$scope.pendingmember();
            } else {
                Materialize.toast('error', 3000, 'red');
            }
        }).error(function(error) {
            $('#failure').html(error);
        });
    };

       

});