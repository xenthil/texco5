var app = angular.module('appDocument', ['ngFileUpload']);
app.controller('ctrlDocument', function($scope, $http, Upload, $timeout) {
    $scope.documents = [];
    $scope.selected = {};
    $scope.objdocument = {};
    $scope.filter = "";
    $scope.documents1 = [];
    $scope.documents2 = [];
    $scope.icons = [];

    // Get documents
    $http({
        method: 'GET', 
        headers : {
            "Authorization" : atoken
        },
        url: api_url + "/documents/wage",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.documents = response.data;
            if ($scope.documents.length > 0) {
                $scope.select($scope.documents[0]);
            }
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });


    $scope.select = function(document) {
        $scope.selected = document;

        $scope.objdocument.documentid = document.documentid;
        $scope.objdocument.name = document.name;
        $scope.objdocument.documentname = document.documentname;
        $scope.objdocument.description = document.description;
        $scope.objdocument.colour = document.iconcolour;
    };
});