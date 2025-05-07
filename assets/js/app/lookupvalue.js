
var app = angular.module('appLookUpvalue', []);
app.controller('ctrlLookUpvalue', function($scope, $http) {
    var scope = $scope;
    $scope.lookupvalues = [];

    // Get lookupvalues
    scope.getlookupvalue = function(lkdmcode) {
        $http({
            method: 'GET', 
            headers : {
                "Authorization" : atoken
            },
            url: api_url + "/lookupvalues?lkdmcode=" + lkdmcode,
        }).then(function successCallback(response) {
            if (response.status = 200) {
                $scope.lookupvalues = response.data.lookupvalues;
            }
        }, function errorCallback(response) {
            Materialize.toast('Something has gone wrong!', 3000, 'red');
        });
    };
});