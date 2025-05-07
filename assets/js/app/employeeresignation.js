var app = angular.module('appResign', ['ngTable', 'ui.bootstrap']);
app.controller('ctrlResign', function($scope, $http, $filter, NgTableParams) {
    $scope.count = 0;
    $scope.itemsPerPage = $scope.totalItems;
    // $scope.viewby = 15;
    // $scope.totalItems = 0;
    // $scope.currentPage = 1;
    // $scope.itemsPerPage = $scope.viewby;
    // $scope.maxSize = 20; //Number of pager buttons to show
     $scope.employee = {};

     $scope.checkresignation = function(employee) {
        $scope.submitted = false;
        $scope.select(employee);
        $("label").addClass("active");
        $('#modal1').modal('open');
        $("#failure").html("");
    };

     $scope.select = function(employee) {
        $scope.selected = employee;

        $scope.employee.memberid = employee.memberid;
        $scope.employee.jobactivityid = employee.jobactivityid;
        $scope.employee.serviceno = employee.serviceno;
        $scope.employee.texcono = employee.texcono;
        $scope.employee.name = employee.name;
        $scope.employee.projectno = employee.projectno;
        $scope.employee.category = employee.category;
    };

    $scope.jobactivity = function() {
        $http({
            method: 'GET', 
            headers : {
                "Authorization" : atoken
            },
            url: api_url + "/job/jobactivity/employees",
        }).then(function successCallback(response) {
            if (response.status = 200) {
                var data = response.data;
                $scope.tableParams = new NgTableParams({
                    page: 1,
                    count: response.data.length
                }, {
                    data: data
                });
                $scope.confirm = response.data;
                $scope.totalItems = $scope.confirm.length;
            } else {
                Materialize.toast('error', 3000, 'red');
            }
        }, function errorCallback(response) {
            Materialize.toast('error', 3000, 'red');
        });
    };
    $scope.jobactivity();
    
$scope.employeeresign = function(employee) {
        $http({
            method: 'POST',
            url: api_url + "/job/jobactivity/employee/resign",
            data: $.param({
                "jobactivityid": employee.jobactivityid,
                "reason": employee.reason,
                "resigndate": employee.resigndate,
                "memberid": employee.memberid
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : atoken
            }, 
        }).success(function(response, result) {
            if (response.status = 200) {
                $(".modal").modal("close");
                $scope.jobactivity();
                Materialize.toast('Employee Resigned!', 3000, 'green');
            } else {
                alert("error");
            }
        }).error(function(error) {
            $('#failure').html(error);
        });
    };   
});