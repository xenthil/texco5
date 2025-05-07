var app = angular.module('appsessionmaster', ['ngTable', 'ui.bootstrap']);
app.controller('ctrlsessionmaster', function ($scope, $http, $filter, NgTableParams) {

//alert('sdfsd');
	$scope.loggoffmember = function(texserno) {

		//  alert(texserno);
        $http({
            url: api_url + "/logoutmember?texserno=" + texserno,
            data: $.param({
                texserno: texserno
            }), 
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                
            }, 
            method: 'GET',
        }).success(function(response, result) {
            if (response.includes("success")) {
                Materialize.toast('success', 3000, 'green');
                // setTimeout(function(){ 
                //     window.location = base_url + "member/logout"; 
                // }, 1500);
                
            } else {
                Materialize.toast(response, 3000, 'red');
            }
        }).error(function(error) {
            Materialize.toast(error, 3000, 'red');
        });
    }

});
