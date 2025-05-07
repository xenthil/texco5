
var app = angular.module('appUser', []);
app.controller('ctrlUser', function($scope, $http) {
	
    var scope = $scope;
    $scope.login = function($scope, file) {
        $http({
            url: api_url + "/employee/authenticate/",
            data: $.param({
                "userid": $scope.userid,
                "password": $scope.password
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : atoken
            }, 
            method: 'POST',
        }).success(function(response, result) {
            if (result == 200) {
                window.location = base_url + "admin/dashboard";
            } else {
                $('#error').html(response);
            }
        }).error(function(error) {
            $scope.error = error;
        });
    };
});