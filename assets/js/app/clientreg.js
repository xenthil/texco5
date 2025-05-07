    var app = angular.module('appClientreg', ['ngFileUpload']);
    app.controller('ctrlClientreg', function($scope, $http, Upload, $timeout) {
        var scope = $scope;
        $scope.clients = [];
        $scope.selected = {};
        $scope.objclient = {};
        $scope.filter = "";

        //Get Department Type
        $scope.departmenttype = [];
        $http({
            method: 'GET', 
            headers : {
                "Authorization" : atoken
            },
            url: api_url + "/lookupvalues?lkdmcode=DEPTTYPE",
        }).then(function successCallback(response) {
            if (response.status = 200) {
                $scope.departmenttype = response.data.lookupvalues;
                if ($scope.departmenttype.length > 0) {
                    $scope.objclient.dtselected = $scope.departmenttype[0];
                }
            }
        }, function errorCallback(response) {
            Materialize.toast('Something has gone wrong!', 3000, 'red');
        });

        // Get Cities
        $scope.taluk = [];
        $http({
            method: 'GET', 
            headers : {
                "Authorization" : atoken
            },
            url: api_url + "/lookupvalues?lkdmcode=TALUK",
        }).then(function successCallback(response) {
            if (response.status = 200) {
                $scope.taluk = response.data.lookupvalues;
                if ($scope.taluk.length > 0) {
                    $scope.objclient.tselected = $scope.taluk[0];
                }
            }
        }, function errorCallback(response) {
            Materialize.toast('Something has gone wrong!', 3000, 'red');
        });

        //approval id
        $http({
            method: 'GET', 
            headers : {
                "Authorization" : atoken
            },
            url: api_url + "/lookupvalues/lookupvalueid?lkdmcode=APROVE&code=PEND",
        }).then(function successCallback(response) {

            if (response.status = 200) {
                $scope.approvalid = response.data.lkvalid;
            }
        }, function errorCallback(response) {

        });

        // Get States
        $scope.state = [];
        $http({
            method: 'GET', 
            headers : {
                "Authorization" : atoken
            },
            url: api_url + "/lookupvalues?lkdmcode=STATE",
        }).then(function successCallback(response) {
            if (response.status = 200) {
                $scope.state = response.data.lookupvalues;
                if ($scope.state.length > 0) {
                    $scope.objclient.stateid = $scope.state[0].lkvalid;
                }
            }
        }, function errorCallback(response) {
            Materialize.toast('Something has gone wrong!', 3000, 'red');
        });

        // Get Country
        $scope.country = [];
        $http({
            method: 'GET', 
            headers : {
                "Authorization" : atoken
            },
            url: api_url + "/lookupvalues?lkdmcode=CNTRY",
        }).then(function successCallback(response) {
            if (response.status = 200) {
                $scope.country = response.data.lookupvalues;
                if ($scope.country.length > 0) {
                    $scope.objclient.countryid = $scope.country[0].lkvalid;
                }
            }
        }, function errorCallback(response) {
            Materialize.toast('Something has gone wrong!', 3000, 'red');
        });

        // Get district
        $scope.district = [];
        $http({
            method: 'GET', 
            headers : {
                "Authorization" : atoken
            },
            url: api_url + "/lookupvalues?lkdmcode=DISTRC",
        }).then(function successCallback(response) {
            if (response.status = 200) {
                $scope.district = response.data.lookupvalues;
                if ($scope.district.length > 0) {
                    $scope.objclient.districtid = $scope.district[0];
                }
            }
        }, function errorCallback(response) {
            Materialize.toast('Something has gone wrong!', 3000, 'red');
        });

        // Get departments
        $scope.dept = [];
        $http({
            method: 'GET', 
            headers : {
                "Authorization" : atoken
            },
            url: api_url + "/lookupvalues?lkdmcode=DEPT",
        }).then(function successCallback(response) {
            if (response.status = 200) {
                $scope.dept = response.data.lookupvalues;
                if ($scope.dept.length > 0) {
                    $scope.dselected = $scope.dept[0];
                }
            }
        }, function errorCallback(response) {
            Materialize.toast('Something has gone wrong!', 3000, 'red');
        });

        $scope.changeName = function(filename) {
            $scope.objclient.image = filename.replace(" ", "_");
        }
        // SAVE CLIENT
        $scope.saveclient = function(data, file) {
            if (file != undefined && file != "") {
                file.upload = Upload.upload({
                    url: base_url + "admin/client_image_upload/",
                    data: {
                        file: file
                    },
                });

                file.upload.then(function(response) {
                    $timeout(function() {
                        $scope.objclient.image = file.$ngfName;

                    });
                }, function(response) {
                    $scope.imagename = response.data;
                    if (response.status > 0)
                        $scope.errorMsg = response.status + ': ' + response.data;
                }, function(evt) {
                    // Math.min is to fix IE which reports 200% sometimes
                    file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));

                });
            } else if (file == undefined && file == "" && data.image != ' ') {
                data.image = 'defaultlogo.jpg'
            }
            $http({
                url: api_url + "/client",
                data: $.param({
                    clientid: data.clientid,
                    organization: data.organization,
                    contactname: data.contactname,
                    image: data.image,
                    email: data.email,
                    mobile: data.mobile,
                    addressline1: data.addressline1,
                    addressline2: data.addressline2,
                    addressline3: data.addressline3,
                    districtid: data.districtid,
                    talukid: data.talukid,
                    phone: data.phone,
                    stateid: data.stateid,
                    countryid: data.countryid,
                    password: data.password,
                    active: data.active,
                    changedby: data.changedby,
                    gstno: data.gstno,
                    tanno: data.tanno,
                    panno: data.panno,
                    approvalid: $scope.approvalid,
                    deptid: data.deptid,
                    department: data.department,
                    departmenttypeid: data.departmenttypeid,
                    pincode: data.pincode
                }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded', 
                    "Authorization" : atoken
                },
                method: 'POST',
            }).success(function(response, result) {
                if (result == 200) {
                    $("#clientreg").hide();
                    $("#confirmation").show();
                }

            }).error(function(error) {
                $('#failure').html(error);
            });
        };

        // changepassword Client
        $scope.changepassword = function(data) {
            if (data.newpassword == data.repassword) {
                if (confirm("Are you sure to Change Password?")) {
                    $http({
                        url: api_url + "/client/changepassword",
                        data: $.param({
                            clientid: clientid,
                            password: data.password,
                            newpassword: data.newpassword
                        }),
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded', 
                            "Authorization" : atoken
                        },
                        method: 'POST',
                    }).success(function(response, result) {
                        if (result = 200) {
                            window.location.href = base_url + "client/dashboard";
                        }
                    }).error(function(error) {
                        $('#failure').html(error);
                    });
                }
            } else {
                $('#failure').html('New Password and Re Password are not same');
            }
        };


        var compareTo = function() {
            return {
                require: "ngModel",
                scope: {
                    otherModelValue: "=compareTo"
                },
                link: function(scope, element, attributes, ngModel) {

                    ngModel.$validators.compareTo = function(modelValue) {
                        return modelValue == scope.otherModelValue;
                    };

                    scope.$watch("otherModelValue", function() {
                        ngModel.$validate();
                    });
                }
            };
        };
    });