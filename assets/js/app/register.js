var app = angular.module('appRegister', []);
app.controller('ctrlRegister', function($scope, $http) {
    $scope.objmember = {};
    $scope.city = [];
    $scope.state = [];
    $scope.country = [];
    $scope.relations = [];

        // Get Cities
    $http({
        method: 'GET', 
        headers : {
            "Authorization" : atoken
        },
        url: api_url + "/lookupvalues?lkdmcode=CITY",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.city = response.data.lookupvalues;
            if ($scope.city.length > 0) {
                $scope.ciselected = $scope.city[0];
            }
        }
    }, function errorCallback(response) {
        alert("Something has gone wrong!");
    });

    // Get States
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
        alert("Something has gone wrong!");
    });

    // Get Country
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
                $scope.cselected = $scope.country[0];
            }
        }
    }, function errorCallback(response) {
        alert("Something has gone wrong!");
    });

    // Get Nominee Relations
    $http({
        method: 'GET', 
        headers : {
            "Authorization" : atoken
        },
        url: api_url + "/lookupvalues?lkdmcode=NMERL",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.relations = response.data.lookupvalues;
            if ($scope.relations.length > 0) {
                $scope.rselected = $scope.relations[0];
            }
        }
    }, function errorCallback(response) {
        alert("Something has gone wrong!");
    });


    $scope.savemember = function(objmember) {
        console.log(data)
        $http({
            url: api_url + "/members",
            data: $.param({
                firstname: objmember.firstname,
                lastname: objmember.lastname,
                fathername: objmember.fathername,
                dob: objmember.dob,
                email: objmember.email,
                mobile: objmember.mobile,
                addressline1: objmember.addressline1,
                addressline2: objmember.addressline2,
                addressline3: objmember.addressline3,
                cityid: objmember.cityid,
                stateid: objmember.stateid,
                countryid: objmember.countryid,
                nominee: objmember.nominee,
                nomineerelationid: objmember.nomineerelationid,
                rank: objmember.rank,
                corps: objmember.corps,
                trade: objmember.trade,
                esmidno: objmember.esmidno,
                character: objmember.character,
                religion: objmember.religion,
                caste: objmember.caste,
                civilqual: objmember.civilqual,
                armyqual: objmember.armyqual,
                registrationno: objmember.registrationno,
                lastaccess: objmember.lastaccess,
                texcono: objmember.texcono,
                serviceno: objmember.serviceno,
                changedby: objmember.changedby
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : atoken
            }, 
            method: 'POST',
        }).success(function(response, result) {
            if (result = 200) {
                 // $scope.objmember = {};
                alert("success");
                window.location.reload(true);
            }

        }).error(function(error) {
            $('#failure').html(error);
        });

    }
    $scope.cancel = function() {
        window.location.reload(true);
    }
});