var app = angular.module('appClienthistory', ['ngTable', 'ui.bootstrap']);
app.controller('ctrlClienthistory', function($scope, $http, $filter, NgTableParams) {
    $scope.count = 0;
    $scope.viewby = 10;
    $scope.totalItems = 0;
    $scope.currentPage = 1;
    $scope.itemsPerPage = $scope.viewby;
    $scope.maxSize = 5; //Number of pager buttons to show
    $scope.clientid = 0;
    $scope.history = [];
    $scope.jobactivity = function() {				
		
		
        $http({
            method: 'GET', 
            headers : {
                "Authorization" : atoken
            },
            url: api_url + "/job/jobactivity/client?clientid=" + clientid,
        }).then(function successCallback(response) {
            if (response.status = 200) {
                var data = response.data;
                $scope.history = response.data;								
                $scope.tableParams = new NgTableParams({
                    page: 1,
                    count: response.data.length
                }, {
                    data: data
                });
                $scope.totalItems = $scope.data.length;
            } else {
                Materialize.toast('error', 3000, 'red');
            }
        }, function errorCallback(response) {
            Materialize.toast('error', 3000, 'red');
        });
    };
    $scope.jobactivity();

    $scope.searchbydate = function(startdate, enddate) {
        if ((startdate != "" && enddate != "") && (startdate != undefined && enddate != undefined)) {
            var confirm = $scope.history;
            var filtered = [];
            var startdate = new Date(startdate);
            var enddate = new Date(enddate);
            angular.forEach(confirm, function(confirm) {
                applieddate = new Date(confirm.effectivedate);
                if (applieddate >= startdate && applieddate <= enddate) {
                    filtered.push(confirm);
                }
            });
            $scope.tableParams = new NgTableParams({
                page: 1,
                count: 10
            }, {
                data: filtered
            });
        } else {
            $scope.jobactivity();
        }
    };
});