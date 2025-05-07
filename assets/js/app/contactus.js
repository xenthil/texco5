
var app = angular.module('appContactus', ['ngSanitize']);
app.controller('ctrlContactus', function($scope, $http) {
    // Get Managers from employees
        $http({
            method: 'GET', 
            headers : {
                "Authorization" : atoken
            },
            url: api_url + "/managers",
        }).then(function successCallback(response) {
            if (response.status = 200) {
               $scope.managers = response.data;
            }
        }, function errorCallback(response) {
            console.log("Something has gone wrong!");
        });

		$http({
            method: 'GET', 
            headers : {
                "Authorization" : atoken
            },
            url: api_url + "/directors",
        }).then(function successCallback(response) {
            if (response.status = 200) {
               $scope.directors = response.data;
            }
        }, function errorCallback(response) {
            console.log("Something has gone wrong!");
        });

        // Get Managers from others
        $http({
            method: 'GET', 
            headers : {
                "Authorization" : atoken
            },
            url: api_url + "/managers",
        }).then(function successCallback(response) {
            if (response.status = 200) {
               $scope.managers = response.data;
            }
        }, function errorCallback(response) {
            console.log("Something has gone wrong!");
        });

            $http({
            method: 'GET', 
            headers : {
                "Authorization" : atoken
            },
            url: api_url + "/officers/others",
        }).then(function successCallback(response) {
            if (response.status = 200) {
               $scope.others = response.data;
            }
        }, function errorCallback(response) {
            console.log("Something has gone wrong!");
        });


        // Get Managers from officers
        $http({
            method: 'GET', 
            headers : {
                "Authorization" : atoken
            },
            url: api_url + "/officers/directors",
        }).then(function successCallback(response) {
            if (response.status = 200) {
               $scope.officers = response.data;
            }
        }, function errorCallback(response) {
            console.log("Something has gone wrong!");
        });

        $http({
            method: 'GET', 
            headers : {
                "Authorization" : atoken
            },
            url: api_url + "/directors",
        }).then(function successCallback(response) {
            if (response.status = 200) {
               $scope.directors = response.data;
            }
        }, function errorCallback(response) {
            console.log("Something has gone wrong!");
        });

	});
app.filter('nl2br', function() {
    var span = document.createElement('span');
    return function(input) {
        if (!input) return input;
        var lines = input.split('\n');

        for (var i = 0; i < lines.length; i++) {
            span.innerText = lines[i];
            span.textContent = lines[i];
            lines[i] = span.innerHTML;
        }
        return lines.join('<br />');
    }
});