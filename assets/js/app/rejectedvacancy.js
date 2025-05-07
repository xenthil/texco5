var app = angular.module('appAdminRejMembers', ['ngTable', 'ui.bootstrap']);
app.controller('ctrlAdminRejMembers', function ($scope, $http, $filter, NgTableParams) {

	$scope.rejectedvacancy = [];

	// Get members
	$http({
        method: 'GET', 
        headers : {
            "Authorization" : atoken
        },
        url: api_url + "/rejectedMemberDetails",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            debugger;
            $scope.rejectedvacancy = response.data;
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });
     
    $scope.MoveToCarryforwardByID = function(rejected)  {
        console.log('rejected',rejected);
        if (confirm("Are you sure to Move this vacancy to carryforward?")) {
            $http({
                method: 'POST',
                url: api_url + "/MoveToCarryforwardByID",
                data: $.param({
                    "projectid": rejected.projectid,
                    "serviceno": rejected.serviceno,
                    "category": rejected.category,
                    "firstname": rejected.firstname,
                    "texcono" : rejected.texcono
                }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization' : atoken
                }, 
            }).then(function successCallback(response) {
                debugger;
                if (response.status = 200) {
                    if (response.status = 200) {
                        window.location.reload(true);
                    }
                }
            }, function errorCallback(response) {
                Materialize.toast('Something has gone wrong!', 3000, 'red');
            });
        }
    }

    $scope.DeleteRejectedVacancy = function(rejected)  {

        if (confirm("Are you sure to Delete this vacancy to carryforward?")) {
            $http({
                method: 'POST',
                url: api_url + "/DeleteCarryforwardByID",
                data: $.param({
                    "projectid": rejected.projectid,
                    "serviceno": rejected.serviceno,
                    "category": rejected.category,
                    "firstname": rejected.firstname,
                    "texcono" : rejected.texcono
                }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization' : atoken
                }, 
            }).then(function successCallback(response) {
                debugger;
                if (response.status = 200) {
                    if (response.status = 200) {
                        window.location.reload(true);
                    }
                }
            }, function errorCallback(response) {
                Materialize.toast('Something has gone wrong!', 3000, 'red');
            });
        }
    }

});
