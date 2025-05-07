var app = angular.module('appAdminMembers', ['ngTable', 'ui.bootstrap']);
app.controller('ctrlAdminMembers', function ($scope, $http, $filter, NgTableParams) {

    $scope.members = [];
    $scope.ClosedListMembers = [];
	$scope.selected = {};
	$scope.objmember = {};
	$scope.isshow = false;
    $scope.isDisabled = true;
    $scope.memberid = 0;
    $scope.texcono = 0;
    $scope.serviceno = 0;
    $scope.firstname = '';

    //list Members
    $http({
        method: 'GET', 
		headers : {
			"Authorization" : atoken
		}, 
        url: api_url + "/closedmemberslist",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            debugger;
            // console.log('response',response.data);
            var notapplied = _.filter(response.data, function(item) {
                return (item.isapplied == 0 || item.isapplied == 1) && item.isselected == 0;
            });
            var gotselected = _.filter(response.data, function(item) {
                return item.isapplied == 1 && item.isselected == 1;
            });
            $scope.ClosedListMembers = notapplied;
            $scope.GotSelectedMembers = gotselected;
            // console.log('$scope.ClosedListMembers',$scope.ClosedListMembers);
            // console.log('$scope.GotSelectedMembers',$scope.GotSelectedMembers);
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });

    $scope.ClosedMembersList = function() {
        $http({
            method: 'GET', 
            headers : {
                "Authorization" : atoken
            },
            url: api_url + "/closedmemberslist",
        }).then(function successCallback(response) {
            if (response.status = 200) {
                debugger;
                $scope.ClosedListMembers = response.data;
            }
        }, function errorCallback(response) {
            Materialize.toast('Something has gone wrong!', 3000, 'red');
        });
    }

	// Get members
	$scope.searchmember = function (serviceno) {
		$http({
			method: 'GET', 
            headers : {
                "Authorization" : atoken
            },
			url: api_url + "/closedmembersearch?membersearchval=" + serviceno,
		}).then(function successCallback(response) {
			if (response.status = 200) {
                debugger;
                $scope.members = response.data[0];
                $scope.select($scope.members);
			}
		}, function errorCallback(response) {
			Materialize.toast('Something has gone wrong!', 3000, 'red');
		});
    };

    $scope.clearmember = function() {
        $scope.objmember.search_val = '';
    }

    
    $scope.savememberToClosed = function (member) {
		if (confirm("Are you sure to add this member detail?")) {
			$http({
				method: "POST",
				url: api_url + "/member/memberclosed",
				data: $.param({
                   "memberid":member.memberid,
                   "firstname":member.firstname,
                   "lastname":member.lastname,
                   "mobile":member.mobile,
                   "texcono":member.texcono,
                   "serviceno":member.serviceno
				}),
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded', 
                    "Authorization" : atoken
				}
			}).success(function (response) {
				if (response.message == "Success") {
                    Materialize.toast(response.msg , 3000, 'green');
                    $scope.members = [];
                    $scope.selected = [];
                    $scope.objmember = [];
                    setTimeout(function() {
                        window.location.reload(true);
                    }, 1000);
                }
                if (response.message == "Failure") {
                    Materialize.toast(response.msg , 3000, 'red');
				}
			}).error(function (error) {
				$('#failure').html(error);
			});
		};
	}

    $scope.deletemember = function(closedlist) {
        if (confirm("Are you sure to delete this member detail?")) {
			$http({
				method: "POST",
				url: api_url + "/member/membercloseddelete",
				data: $.param({
                   "closedid":closedlist.closedid
				}),
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded', 
                    "Authorization" : atoken
				}
			}).success(function (response) {
				if (response.message == "Success") {
                    Materialize.toast("Deleted Successfully" , 3000, 'green');
                    $scope.ClosedMembersList();
                }
                if (response.message == "Failure") {
                    Materialize.toast(response.msg , 3000, 'red');
				}
			}).error(function (error) {
				$('#failure').html(error);
			});
		}; 
    }

    $scope.select = function(member) {
        debugger
        $scope.selected = member;
        $scope.objmember.memberid = member.memberid;
        $scope.objmember.firstname = member.firstname;
        $scope.objmember.lastname = member.lastname;
        $scope.objmember.mobile = member.mobile;
        $scope.objmember.texcono = member.texcono;
        $scope.objmember.serviceno = member.serviceno;
    };

    // $scope.savememberToClosed = function(members) {
    //     $('#modalconfirm1').modal('open');
    //     $scope.memberid = members.memberid;
    //     $scope.texcono = members.texcono;
    //     $scope.serviceno = members.serviceno;
    //     $scope.firstname  = members.firstname;
    // };

    // $scope.jobcancelcloses = function() {
    //     $('#modalconfirm1').modal('close');
    // };

    

});
