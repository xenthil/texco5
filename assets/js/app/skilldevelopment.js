var app = angular.module('appDocument', ['ngFileUpload']);
app.controller('ctrlDocument', function($scope, $http, Upload, $timeout) {
    $scope.document = [];
    $scope.documents = [];
    $scope.selected = {};
    $scope.objdocument = {};
    $scope.filter = "";
    $scope.documents1 = [];
    $scope.documents2 = [];
    $scope.icons = [];
    $scope.folders = [];

    $scope.icons = [{
            id: '1',
            icon: 'description',
            colour: 'blue'
        }, {
            id: '2',
            icon: 'announcement',
            colour: 'pink'
        },
        {
            id: '3',
            icon: 'insert_chart',
            colour: 'green'
        },
        {
            id: '4',
            icon: 'dns',
            colour: 'cyan'
        },
        {
            id: '5',
            icon: 'lock',
            colour: 'red'
        },
        {
            id: '6',
            icon: 'list',
            colour: 'indigo'
        },
        {
            id: '7',
            icon: 'assignment',
            colour: 'purple'
        },
        {
            id: '8',
            icon: 'phone',
            colour: 'orange'
        },
        {
            id: '9',
            icon: 'done',
            colour: 'amber'
        },
        {
            id: '10',
            icon: 'filter_drama',
            colour: 'light-blue'
        },
        {
            id: '11',
            icon: 'stars',
            colour: 'teal'
        }
    ];


    $scope.RadioChange = function(s) {
      //  $scope.changedVal = s;
        //alert(s)
    };//


    $scope.searchmembers = function(texserno) {
        // alert(jobid)
         $http({
             url: base_url + "Member/checkmember_login/",
             data: $.param({
                 data: texserno,
 
             }),
             headers: {
                 'Content-Type': 'application/x-www-form-urlencoded',
                 'Authorization' : atoken
             }, 
             method: 'POST',
         }).success(function(response, result) {
             if (response.includes("success")) {
                 Materialize.toast('You are login is successfully', 3000, 'green');
                 setTimeout(function(){ 
                     
                     window.location = base_url + "member/dependency"; 
                 }, 1500);
                 
             } else {
                 if (response.includes("User Alredy Logged in")) {
                    // alert('User Alredy Logged in');
                     var msg='User Already Logged in'
                 Materialize.toast(msg, 3000, 'red');
                 }
                 else
                 {
                     Materialize.toast(response, 3000, 'red');  
                 }
             }
         }).error(function(error) {
             Materialize.toast(error, 3000, 'red');
         });
     }

});