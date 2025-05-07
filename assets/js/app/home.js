var appHome = angular.module('appHome', [])
appHome.controller('ctrlVacancy', function($scope, $http) {    
    console.log('First Service Call Function- home.js');
    $http({
        method: 'GET', 
        headers : {
            "Authorization" : atoken
        },
        url: api_url + "/job/toplist",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.models = response.data;
        } else {
            Materialize.toast('error', 3000, 'red');
        }
    }, function errorCallback(response) {
        Materialize.toast('error', 3000, 'red');
    });
 });

appHome.controller('ctrlImages', function($scope, $http) { 
    console.log('Second Service Call Function- home.js');
    $http({
        method: 'GET', 
        headers : {
            "Authorization" : atoken
        },
        url: api_url + "/clientimages",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.clientimages = response.data;
        } else {
            Materialize.toast('error', 3000, 'red');
        }
    }, function errorCallback(response) {
        Materialize.toast('error', 3000, 'red');
    });
});


appHome.controller('ctrlLoginSubmit', function($scope, $http) {
    $scope.changedVal = "Employee";
    $scope.RadioChange = function(s) {
        $scope.changedVal = s;
    };
   

    $scope.SendData = function(data) {
        var encodedData = window.btoa(data.password);
        data.password=encodedData;
        if ($scope.changedVal == 'Employee') {
            $http({
                url: base_url + "Admin/check_login/",
                data: $.param({
                    'data': data
                }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization' : atoken
                }, 
                method: 'POST',
            }).success(function(response) {

                if (response.includes("success")) {
                    window.location.href = base_url + "admin/dashboard";
                } else {
                    $('#failure').html(response);
                }

            }).error(function(error) {
                $scope.error = error;
            });

        } else if ($scope.changedVal == 'Client') {
            $http({
                url: base_url + "Client/check_login/",
                data: $.param({
                    'data': data
                }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization' : atoken
                }, 
                method: 'POST',
            }).success(function(response) {

                if (response.includes("success")) {
                    window.location.href = base_url + "client/dashboard";
                } else {
                    $('#failure').html(response);
                }

            }).error(function(error) {
                $scope.error = error;
            });

        }
        else if ($scope.changedVal == 'AM') {
            $http({
                url: base_url + "ams/check_login/",
                data: $.param({
                    'data': data
                }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization' : atoken
                }, 
                method: 'POST',
            }).success(function(response) {

                if (response.includes("invalid")) {
                   $('#failure').html(response); 
                } else {
                    window.location.href = base_url + "ams/dashboard";
                }

            }).error(function(error) {
                $scope.error = error;
            });

        }
         else {
            $('#failure').html("Please select either client or employee or AM");
        }

    };
});

const getPostRequestConfig = (api, data) => {
    return {
        url: `${base_url}${api}`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': atoken
        },
        data: data || null
    };
}

const showSuccessMessage = (message) => {
    Materialize.toast(message, 3000, 'green');
};

const showErrorMessage = (message) => {
    Materialize.toast(message, 3000, 'red');
};

var appMember = angular.module('appMember', []);
appMember.controller('ctrlMember', function($scope, $http,$window) {
    $scope.settings = [];
    $http({
        method: 'GET', 
        headers : {
            "Authorization" : atoken
        },
        url: api_url + "/setting",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.settings = response.data;
        }
    }, function errorCallback(response) {
        Materialize.toast('Something went wrong!', 3000, 'red');
    });

    $scope.authenticateMember = function(serviceNumber) {
        const requestConfig = 
            getPostRequestConfig(
                'member/checkmember_login/', 
                $.param({
                    data: serviceNumber
                }));
        
        const redirectToDashboard = () => {
            setTimeout(() => {
                window.location = `${base_url}member/dashboard`;
            }, 1500);
        };
        
        $http(requestConfig)
            .then(function(response) {
                const responseData = response.data;
                
                // TODO: Revisit this poor condition
                if (responseData.includes('success')) {
                    showSuccessMessage('You\'ve logged in successfully!');
                    redirectToDashboard();
                } else if (responseData.includes('User Alredy Logged in')) {
                    showErrorMessage('This user is already logged in.');
                } else {
                    // TODO: Revisit this as it is potentially dangerous to show the server given error message as it is
                    showErrorMessage(responseData);
                }
            })
            .catch(function(error) {
                showErrorMessage(error.data || 'Authentication failed');
            });
    };
});

appHome.controller('ctrlForgot', function($scope, $http) {
    $scope.forgotpassword = function(userid, login) {
        if (login == 'Employee') {
            $http({
                url: api_url + "/employees/forgotpassword",
                data: $.param({
                    userid: userid,
                    changedby: "User"
                }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization' : atoken
                }, 
                method: 'POST',
            }).success(function(response, result) {
                if (result == 200) {
                    window.location.href = base_url + "Admin/resetpassword/" + response.token + "/Employee";
                }
            }).error(function(error) {
                $('#failure').html(error);
            });
        } else {
            $http({
                url: api_url + "/client/forgotpassword",
                data: $.param({
                    userid: userid,
                    changedby: "User"
                }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization' : atoken
                }, 
                method: 'POST',
            }).success(function(response, result) {
                if (result == 200) {
                    window.location.href = base_url + "Client/resetpassword/" + response.token + "/Client";
                }
            }).error(function(error) {
                $('#failure').html(error);
            });
        }

    }
});


appHome.controller('ctrlResetpwdSubmit', function($scope, $http) {
    $scope.SendData = function(data) {
        if (data.login == 'Employee') {

            if (data.password == data.cnfnewpwd) {
                $http({
                    url: api_url + "/employees/resetpassword",
                    data: $.param({
                        token: data.token,
                        verificationcode: data.code,
                        password: data.password,
                        changedby: "texco"
                    }),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization' : atoken
                    }, 
                    method: 'POST',
                }).success(function(response) {
                    if (response.includes("success")) {
                        window.location.href = base_url + 'admin/login/';

                    } else {
                        $('#failure').html(response);

                    }

                }).error(function(error) {
                    $('#failure').html(error);
                });
            } else {
                $('#failure').html('Password and Re Password are not same');
            }
        } else {
            if (data.password == data.cnfnewpwd) {
                $http({
                    url: api_url + "/client/resetpassword",
                    data: $.param({
                        token: data.token,
                        verificationcode: data.code,
                        password: data.password,
                        changedby: "texco"
                    }),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization' : atoken
                    }, 
                    method: 'POST',
                }).success(function(response) {
                    if (response.includes("success")) {
                        window.location.href = base_url + 'client/login/';

                    } else {
                        $('#failure').html(response); 

                    }

                }).error(function(error) {
                    $('#failure').html(error);
                });
            } else {
                $('#failure').html('Password and Re Password are not same');
            }

        }
    };
});

angular.element(document).ready(function() {
    angular.bootstrap(document.getElementById('appMember'), ['appMember']);
});