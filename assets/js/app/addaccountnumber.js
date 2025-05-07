var app = angular.module('appAccountNumber', ['ngTable']);
app.controller('ctrlAccountNumber', function ($scope, $rootScope , $http, $filter, NgTableParams) {

    this.myDate = new Date();
    this.isOpen = false;

    $scope.members = [];
    $scope.expiredmembers = [];
    $scope.selected = {};
    $scope.objmember = {};
    $scope.objregister = {};
    $scope.memberid = 0;
    $scope.objprofile = {};
    $scope.viewby = 10;
    $scope.totalItems = 0;
    $scope.currentPage = 1;
    $scope.itemsPerPage = $scope.viewby;
    $scope.maxSize = 5; //Number of pager buttons to show
    $scope.filter = "";
    $scope.state = [];
    $scope.country = [];
    $scope.relations = [];
    $scope.rank = [];
    $scope.confirm = [];
    $scope.objregister.genderid = 0;
    $scope.servicenovalid = '';
    $scope.DisableButton = false;
    $scope.isDisabled = false;
    $scope.regionDetails = [];
    $scope.TalukDetails = [];
    // Get character
    $scope.character = [];
    $scope.servicenumber = 0;

    // Get members
    debugger
    $scope.servicenumber = localStorage.getItem('MemberSearchValue');
    if (Number($scope.servicenumber) == 0) {
        $scope.servicenumber = 0;
        $scope.objmember.search_val = '';
    } else {
        $scope.objmember.search_val = $scope.servicenumber;
        localStorage.setItem('MemberSearchValue', 0);
        var resdata = encryptMessage($scope.objmember.search_val);
        $http({
            method: 'GET', 
            headers : {
                "Authorization" : atoken
            },
            url: api_url + "/getmemberssearch?membersearchval=" + resdata,
        }).then(function successCallback(responses) {
            if (response.status = 200) {
                var resdata = decryptMessage(response.data);
                $scope.members = resdata[0];
                if (resdata[0]) {
                    var resdata = encryptMessage($scope.members.memberid);
                    $http({
                        method: 'GET', 
                        headers : {
                            "Authorization" : atoken
                        },
                        url: api_url + "/members/" + resdata,
                    }).then(function successCallback(response) { 

                        $(".input-field label").addClass("active");
                        if (response.status = 200) {
                            var resdata = decryptMessage(response.data);
                            $scope.objprofile = resdata[0];
                        }
                    }, function errorCallback(response) {
                        Materialize.toast('Something has gone wrong!', 3000, 'red');
                    });
                } else {
                    Materialize.toast('Texco Number Not Found!', 3000, 'red');
                }
            } else {
                Materialize.toast('Texco Number Not Found!', 3000, 'red');
            }
        }, function errorCallback(response) {
            Materialize.toast('Something has gone wrong!', 3000, 'red');
        });
    }

    $scope.searchmember = function (serviceno) {
        debugger
      //  var resdata = encryptMessage(serviceno);
        $http({
            method: 'GET', 
            headers : {
                "Authorization" : atoken
            },
            url: api_url + "/getmemberssearch?membersearchval=" +serviceno,
        }).then(function successCallback(response) {
            debugger
            var resdata =(response.data);
            if (response.status = 200) {
                $scope.members = resdata[0];
                if (resdata[0]) {
                    var resdata = ($scope.members.memberid);
                    $http({
                        method: 'GET',
                        headers : {
                            "Authorization" : atoken
                        },
                        url: api_url + "/members/" + resdata,
                    }).then(function successCallback(response) {

                        $(".input-field label").addClass("active");
                        if (response.status = 200) {
                            var resdata = (response.data);
                            $scope.objprofile = resdata[0];
                            debugger
                        }
                    }, function errorCallback(response) {
                        Materialize.toast('Something has gone wrong!', 3000, 'red');
                    });
                } else {
                    Materialize.toast('Texco Number Not Found!', 3000, 'red');
                }
            } else {
                Materialize.toast('Texco Number Not Found!', 3000, 'red');
            }
        }, function errorCallback(response) {
            Materialize.toast('Something has gone wrong!', 3000, 'red');
        });
    };

    //Get memberinfo
    $scope.getservicenoexist = function (serviceno) {
        var resdata = encryptMessage(serviceno);
        $scope.servicenovalid = '';
        $("#failure").html("");
        $http({
            url: api_url + "/memberinfo?texserno=" +resdata,
            headers : {
                "Authorization" : atoken
            },
            method: 'GET',
        }).success(function (response, result) {
            if (result = 200) {
                $scope.servicenovalid = "Exist";
                $scope.DisableButton = false;
            }
        }).error(function (error) {

        });
    }

    // Get Selected members
    $scope.select = function (member) {
        $scope.selected = member;
        $scope.objmember.memberid = member.memberid;
        $scope.objmember.accountno = member.accountno;
    }

    // SAVE Account Number - In both apply and member
    $scope.savemember = function (data) {

        var resdata = (data);

        if (resdata !=16)
        {
            alert("Account number should be 16 digits" )
            return;
        }
        debugger
        $scope.isDisabled = true;
        $scope.DisableButton = true;
        var method;
        if (data.memberid > 0) {
            method = 'PUT';
        } else {
            method = 'POST';
        }
        $http({
            url: api_url + "/accountno",
            data: $.param({
                "data":resdata
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                "Authorization" : atoken
            },
            method: method,
        }).success(function (response, result) {
            if (result = 200) {
                Materialize.toast('AccountNo Updated Successfully', 3000, 'green');
            }
            else {
                Materialize.toast(error, 3000, 'red');
            }
        }).error(function (error) {
            Materialize.toast(error, 3000, 'red');
        });
    };

});