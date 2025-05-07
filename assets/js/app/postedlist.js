    
var app = angular.module('appPostedlist', []);
app.controller('ctrlPostedlist', function($scope, $http) {
    // Get Posedlist 
        $http({
            method: 'GET', 
            headers : {
                "Authorization" : atoken
            },
            url: api_url + "/job/postedlist",
        }).then(function successCallback(response) {
            if (response.status = 200) {
               $scope.postedlist = response.data;
            }
        }, function errorCallback(response) {
            console.log("Something has gone wrong!");
        });

         $http({
            method: 'GET', 
            headers : {
                "Authorization" : atoken
            },
            url: api_url + "/job/jobpostingdate/close",
        }).then(function successCallback(response) {
            if (response.status = 200) {
               $scope.posteddate = response.data;
            }
        }, function errorCallback(response) {
            console.log("Something has gone wrong!");
        });
	});
