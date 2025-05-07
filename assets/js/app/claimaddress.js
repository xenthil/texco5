var app = angular.module('appClaimAddress', []);
app.controller('ctrlClaimAddress', function($scope, $http) {

 
    $scope.addclient = function()  {
        $('#modal1').modal('open');
    }
});