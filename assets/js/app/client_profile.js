// JavaScript Document
var app = angular.module('appClientprofile', ['ngFileUpload']);
app.controller('ctrlClientprofile', function($scope, $http, Upload, $timeout) {
    var scope = $scope;
    $scope.clients = [];
    $scope.selected = {};
    $scope.objclient = {};
    $scope.filter = "";
    $scope.clientid = clientid;

    // Get clients
    $http({
        method: 'GET', 
        headers : {
            "Authorization" : atoken
        },
        url: api_url + "/client/" + $scope.clientid,
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.objclient = response.data[0];
            $("#clientform label").addClass("active");
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });


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
                $scope.tselected = $scope.taluk[0];
            }
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
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
                $scope.sselected = $scope.state[0];
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
                $scope.ctselected = $scope.country[0];
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
                $scope.dselected = $scope.district[0];
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

    //allapproval id
    $scope.apprstatus = [];
    $http({
        method: 'GET', 
        headers : {
            "Authorization" : atoken
        },
        url: api_url + "/lookupvalues?lkdmcode=APROVE",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.apprstatus = response.data.lookupvalues;
            if ($scope.apprstatus.length > 0) {
                $scope.dselected = $scope.apprstatus[0];
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
                pincode: data.pincode,
                districtid: data.districtid,
                talukid: data.talukid,
                stateid: data.stateid,
                countryid: data.countryid,
                password: data.password,
                phone: data.phone,
                gstno: data.gstno,
                tanno: data.tanno,
                panno: data.panno,
                approvalid: data.approvalid,
                deptid: data.deptid,
                department: data.department,
                departmenttypeid: data.departmenttypeid,
                active: data.active,
                changedby: data.changedby
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded', 
                "Authorization" : atoken
            },
            method: 'PUT',
        }).success(function(response, result) {
            if (result == 200) {
                $('#clientimage').removeProp('src');
                $scope.picFile = "";
                $http({
                    method: 'GET', 
                    headers : {
                        "Authorization" : atoken
                    },
                    url: api_url + "/client/" + response.clientid,
                }).then(function successCallback(response) {
                    if (response.status = 200) {
                        Materialize.toast('Profile Updated Successfully', 3000, 'green');
                        setTimeout(function() {
                                window.location.reload(true)
                            },
                            1500);
                    }
                }, function errorCallback(response) {
                    Materialize.toast('Something has gone wrong!', 3000, 'red');
                });
            }
            $(".modal").modal("close");
        }).error(function(error) {
            $('#failure').html(error);
        });
    };
});