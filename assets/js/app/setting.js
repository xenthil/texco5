var app = angular.module('appSetting', ['ngFileUpload']);
app.controller('ctrlSetting', function($scope, $http, Upload, $timeout) {
    var scope = $scope;
    $scope.settings = [];
    $scope.selected = {};
    $scope.objsettings = {};
    $scope.filter = "";

    // Get settings

    $http({
        method: 'GET', 
        headers : {
            "Authorization" : atoken
        },
        url: api_url + "/setting",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.settings = response.data;
            if ($scope.settings.length > 0) {
                $scope.select($scope.settings[0]);
            }
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });


    $scope.select = function(setting) {
        $scope.selected = setting;
        $scope.objsettings.settingid = setting.settingid;
        $scope.objsettings.code = setting.code;
        $scope.objsettings.description = setting.description;
        $scope.objsettings.value = setting.value;
        $scope.objsettings.changedby = setting.changedby;
    }

    $scope.editsetting = function() {
        $scope.select($scope.selected);
        $("label").addClass("active");
        $('#modal1').modal('open');
    }

    // Save setting
    $scope.savesetting = function(data, file) {

        var description = data.description;
        if (file != "" && file != undefined) {
            description = file.name;
            description = description.replace(' ', '_')

            file.upload = Upload.upload({
                url: base_url + "admin/settings_upload/",
                data: {
                    file: file
                },
            });

            file.upload.then(function(response) {
                $timeout(function() {
                    alert(JSON.stringify(response));
                    $scope.document = response.data;
                    data.description = response.data
                    $scope.savesettingdata(data, file);
                });
            }, function(response) {
                $scope.documentname = response.data;
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            });
        }
        var method;
        if (data.settingid > 0) {
            method = 'PUT';
        } else {
            method = 'POST';
        }
        $http({
            url: api_url + "/setting",
            data: $.param({
                settingid: data.settingid,
                code: data.code,
                description: description,
                value: data.value,
                changedby: data.changedby
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
                    url: api_url + "/setting/" + response.settingid,
                }).then(function successCallback(response) {
                    if (response.status = 200) {
                        if (data.settingid > 0) {
                            for (var loop = 0; loop < $scope.settings.length; loop++) {
                                if ($scope.settings[loop].settingid == data.settingid) {
                                    $scope.settings[loop] = response.data[0];
                                    $scope.select($scope.settings[loop]);
                                    break;
                                }
                            }
                        } else {
                            $scope.settings.unshift(response.data[0]);
                            $scope.select($scope.settings[0]);
                        }
                        Materialize.toast('Data Updated Successfully!', 3000, 'green');
                    }
                }, function errorCallback(response) {
                    Materialize.toast('Something has gone wrong!', 3000, 'red');
                });
            }
            $(".modal").modal("close");
        }).error(function(error) {
            $scope.error = error;
        });
    };
    
    $scope.savesettingdata = function(data, file) {
        var method;
        if (data.settingid > 0) {
            method = 'PUT';
        } else {
            method = 'POST';
        }
        $http({
            url: api_url + "/setting",
            data: $.param({
                settingid: data.settingid,
                code: data.code,
                description: data.description,
                value: data.value,
                changedby: data.changedby
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
                    url: api_url + "/setting/" + response.settingid,
                }).then(function successCallback(response) {
                    if (response.status = 200) {
                        if (data.settingid > 0) {
                            for (var loop = 0; loop < $scope.settings.length; loop++) {
                                if ($scope.settings[loop].settingid == data.settingid) {
                                    $scope.settings[loop] = response.data[0];
                                    $scope.select($scope.settings[loop]);
                                    break;
                                }
                            }
                        } else {
                            $scope.settings.unshift(response.data[0]);
                            $scope.select($scope.settings[0]);
                        }
                    }
                }, function errorCallback(response) {
                    Materialize.toast('Something has gone wrong!', 3000, 'red');
                });
            }
            $(".modal").modal("close");
        }).error(function(error) {
            $scope.error = error;
        });
    };

    // Delete setting
    $scope.removesetting = function() {
        if (confirm("Are you sure to delete this detail?")) {
            $http({
                url: api_url + "/setting",
                data: $.param({
                    settingid: $scope.objsettings.settingid,
                    active: 0
                }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                method: 'DELETE',
            }).success(function(response, result) {
                if (result = 200) {
                    for (var loop = 0; loop < $scope.settings.length; loop++) {
                        if ($scope.settings[loop].settingid == $scope.objsettings.settingid) {
                            $scope.settings.splice(loop, 1);
                            $scope.select($scope.settings[loop]);
                            break;
                        }
                    }
                }
            }).error(function(error) {
                $scope.error = error;
            });
        };

    }
});