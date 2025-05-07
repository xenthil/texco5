var app = angular.module('apppricemaster', ['ngTable', 'ui.bootstrap']);
app.controller('ctrlpricemaster', function($scope, $http, $filter, NgTableParams) {

    $http({
        method: 'GET', 
        headers : {
            "Authorization" : atoken
        },
        url: api_url + "/lookupvalues?lkdmcode=WGYEAR",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.wagerate = response.data.lookupvalues;
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });

    // Get Wage Area
    $http({
        method: 'GET', 
        headers : {
            "Authorization" : atoken
        },
        url: api_url + "/lookupvalues?lkdmcode=WGAREA",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.wagearea = response.data.lookupvalues;
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });

     // Get wagetype
    $http({
        method: 'GET', 
        headers : {
            "Authorization" : atoken
        },
        url: api_url + "/lookupvalues?lkdmcode=WGTYPE",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.wagetype = response.data.lookupvalues;
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });

    //get particular
    $http({
        method: 'GET', 
        headers : {
            "Authorization" : atoken
        },
        url: api_url + "/lookupvalues?lkdmcode=WGPART",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.particular = response.data.lookupvalues;
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });

});