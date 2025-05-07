var app = angular.module('appAdminEmployee', []);

app.controller('ctrlAdminEmployee', function($scope, $http) {

    var scope = $scope;
    $scope.employees = [];
    $scope.selected = {};
    $scope.objemployee = {};
    $scope.filter = "";
    $scope.roles = [];
    $scope.designation = [];
    $scope.region = [];
    $scope.objprofile = {};

    // Get roles
    $http({
        method: 'GET', 
        headers : {
            "Authorization" : atoken
        },
        url: api_url + "/roles",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.roles = response.data;
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });

    // Get designation
    $http({
        method: 'GET', 
        headers : {
            "Authorization" : atoken
        },
        url: api_url + "/lookupvalues?lkdmcode=DESIG",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.designation = response.data.lookupvalues;
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });

    // Get region
    $http({
        method: 'GET', 
        headers : {
            "Authorization" : atoken
        },
        url: api_url + "/lookupvalues?lkdmcode=REGION",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.region = response.data.lookupvalues;
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });

    // get employees
    $http({
        method: 'GET', 
        headers : {
            "Authorization" : atoken
        },
        url: api_url + "/employees",
    }).then(function successCallback(response, result) {
        if (result = 200) {
            $scope.employees = response.data;
            if ($scope.employees.length > 0) {
                $scope.select($scope.employees[0]);
            }
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });

    $scope.select = function(employee) {
        $scope.selected = employee;

        $scope.objemployee.employeeid = employee.employeeid;
        $scope.objemployee.employeeno = employee.employeeno;
        $scope.objemployee.firstname = employee.firstname;
        $scope.objemployee.lastname = employee.lastname;
        $scope.objemployee.regionid = employee.regionid;
        $scope.objemployee.desigid = employee.desigid;
        $scope.objemployee.email = employee.email;
        $scope.objemployee.mobile = employee.mobile;
        $scope.objemployee.phone = employee.phone;
        $scope.objemployee.doj = employee.doj;
        $scope.objemployee.address = employee.address;
        $scope.objemployee.roleid = employee.roleid;
        $scope.objemployee.password = employee.password;
        $scope.objemployee.active = employee.active;
    };

    $scope.addemployee = function() {
        $scope.objemployee = {};
        $scope.submitted = false;
        $('#mcaption').text("Add Staff");
        $('#modal1').modal('open');
        $("#failure").html("");
    };

    $scope.editemployee = function() {
        $scope.submitted = false;
        $scope.select($scope.selected);
        $('#mcaption').text("Edit Staff");
        $("label").addClass("active");
        $('#modal1').modal('open');
        $("#failure").html("");
    };

    // SAVE MEMBER
    $scope.saveemployee = function(data) {
        var method;
        if (data.employeeid > 0) {
            method = 'PUT';
        } else {
            method = 'POST';
        }
        $http({
            url: api_url + "/employees",
            data: $.param({
                "employeeid": data.employeeid,
                "employeeno": data.employeeno,
                "firstname": data.firstname,
                "lastname": data.lastname,
                "regionid": data.regionid,
                "desigid": data.desigid,
                "email": data.email,
                "mobile": data.mobile,
                "phone": data.phone,
                "doj": data.doj,
                "address": data.address,
                "roleid": data.roleid,
                "password": data.password,
                "changedby": data.changedby
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : atoken
            }, 
            method: method,
        }).success(function(response, result) {
            if (result = 200) {
                $http({
                    method: 'GET', 
                    headers : {
                        "Authorization" : atoken
                    },
                    url: api_url + "/employees/" + response.employeeid,
                }).then(function successCallback(response) {
                    if (response.status = 200) {
                        Materialize.toast('Staff saved Successfully !', 3000, 'green');
                        if (data.employeeid > 0) {
                            for (var loop = 0; loop < $scope.employees.length; loop++) {
                                if ($scope.employees[loop].employeeid == data.employeeid) {
                                    $scope.employees[loop] = response.data[0];
                                    $scope.select($scope.employees[loop]);
                                    break;
                                }
                            }
                        } else {
                            $scope.employees.unshift(response.data[0]);
                            $scope.select($scope.employees[0]);
                        }
                    }
                }, function errorCallback(response) {
                    Materialize.toast('Something has gone wrong!', 3000, 'red');
                });
            }
            $(".modal").modal("close");
            if ($scope.objprofile.firstname != undefined) {
                Materialize.toast('Profile Updated Successfully', 3000, 'green');
                setTimeout(function() {
                        window.location.reload(true)
                    },
                    1500);
            }
        }).error(function(error) {
            $('#failure').html(error);
        });
    };

    // Delete Employee
    $scope.removeemployee = function() {
        if (confirm("Are you sure to delete this detail?")) {
            $http({
                url: api_url + "/employees",
                data: $.param({
                    employeeid: $scope.objemployee.employeeid,
                }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    "Authorization" : atoken
                },
                method: 'DELETE',
            }).success(function(result) {
                if (result = 200) {
                    for (var loop = 0; loop < $scope.employees.length; loop++) {
                        if ($scope.employees[loop].employeeid == $scope.objemployee.employeeid) {
                            $scope.employees.splice(loop, 1);
                            $scope.select($scope.employees[loop]);
                            break;
                        }
                    }
                }
            }).error(function(error) {
                $scope.error = error;
            });
        };
    }


    if (employeeid > 0) {
        // Get Employees by id
        $http({
            method: 'GET', 
            headers : {
                "Authorization" : atoken
            },
            url: api_url + "/employees/" + employeeid,
        }).then(function successCallback(response) {
            if (response.status = 200) {
                $scope.objprofile = response.data[0];
                $("#profileform label").addClass("active");
            }
        }, function errorCallback(response) {
            Materialize.toast('Something has gone wrong!', 3000, 'red');
        });
    }


    // changepassword Employee
    $scope.changepassword = function(data) {
        if (data.newpassword == data.repassword) {
            if (confirm("Are you sure to Change Password?")) {
                $http({
                    url: api_url + "/employees/changepassword",
                    data: $.param({
                        employeeid: employeeid,
                        password: data.password,
                        newpassword: data.newpassword
                    }),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization' : atoken
                    }, 
                    method: 'POST',
                }).success(function(response, result) {
                    if (result = 200) {
                        window.location.href = base_url + "admin/dashboard";
                    }
                }).error(function(error) {
                    $('#failure').html(error);
                });
            }
        } else {
            $('#failure').html('New Password and Re Password are not same');
        }
    };

});