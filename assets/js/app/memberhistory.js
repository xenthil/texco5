var app = angular.module('appAdminMember', ['ngTable', 'ui.bootstrap']);
app.controller('ctrlAdminMember', function($scope, $http, $filter, NgTableParams) {

    $scope.jobhistory = [];

    if (memberid > 0) {
        $scope.jobhistory = function() {
            $http({
                method: 'GET', 
                headers : {
                    "Authorization" : atoken
                },
                url: api_url + "/member/history?memberid=" + memberid,
            }).then(function successCallback(response) {
                if (response.status = 200) {
                    $scope.jobhistory = response.data;
                } else {
                    Materialize.toast('error', 3000, 'red');
                }
            }, function errorCallback(response) {
                Materialize.toast('error', 3000, 'red');
            });
        };

        $scope.jobhistory();
    }
    
});