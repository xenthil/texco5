
var app = angular.module('appAdminRoles', []);
app.controller('ctrlAdminRoles', function($scope, $http) {

      $scope.roles = [];
      $scope.permission = {};
      $scope.filter = "";
      $scope.selected = {};

      $http({
        method: 'GET', 
        headers : {
          "Authorization" : atoken
        },
        url: api_url+"/roles",
      }).then(function successCallback(response) {
        if (response.status = 200) {
          $scope.roles = response.data;
          if ($scope.roles.length > 0){
            $scope.selected = $scope.roles[0];
          }
        }
      },function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
      });

      $scope.select = function(role) {
        $scope.selected = role;
      }

	 $scope.rolepermission = function(permission) {
		 if(permission.selected == 1)
		 {
			 permission.selected = 0;
		 }
		 else
		 {
			 permission.selected = 1;
		 }
        $http({
            url: api_url + "/roles",
            data: $.param({
				          rolepermissionid: permission.rolepermissionid,
                selected: permission.selected
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                "Authorization" : atoken
            },
            method: 'PUT',
        }).success(function(response) {
            if (result = 200) {
                alert(success);
            }
        }).error(function(error) {
            $scope.error = error;
        });
    };
});
