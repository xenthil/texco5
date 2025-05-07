var app = angular.module('appAdminMember', ['ngTable', 'ui.bootstrap']);
app.controller('ctrlAdminMember', function ($scope, $http, $filter, NgTableParams) {

	$scope.members = [];
	$scope.membershistory = [];
	$scope.appliedhistory = [];
	$scope.selected = {};
	$scope.objmember = {};
	$scope.isshow = false;
	$scope.isDisabled = true;

	// Get members
	$scope.searchmember = function (serviceno) {
		$http({
			method: 'GET', 
			headers : {
				"Authorization" : atoken
			},
			url: api_url + "/membersearch?membersearchval=" + serviceno,
		}).then(function successCallback(response) {
			if (response.status = 200) {
				console.log('response', response);
				$scope.members = response.data[0];
				$scope.membershistory = response.data[1];
				$scope.appliedhistory = response.data[2];
				// console.log('$scope.membershistory', $scope.membershistory);
			}
		}, function errorCallback(response) {
			Materialize.toast('TexcoNo or ServiceNo not found!', 3000, 'red');
		});
	};
	// Delete member
	$scope.combinememberByID = function (memberid, members) {
		if (confirm("Are you sure to combine other history with this profile?")) {
			$http({
				method: "POST",
				url: api_url + "/member/memberchange",
				data: $.param({
					"changememberid": members,
					"memberid": memberid,
				}),
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'Authorization' : atoken
				}
			}).success(function (response, result) {
				if (result = 200) {
					Materialize.toast('Member Details are combined', 3000, 'green');
					setTimeout(function () {
						window.location.reload(true);
					}, 1000);
				}
			}).error(function (error) {
				$('#failure').html(error);
			});
		};
	}

	$scope.deletememberByID = function (memberid) {
		debugger
		if (confirm("Are you sure to delete this profile detail?")) {
			$http({
				url: api_url + "/members",
				data: $.param({
					memberid: memberid
				}),
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'Authorization' : atoken
				},
				method: 'DELETE',
			}).success(function (response, result) {
				if (result = 200) {
					Materialize.toast('Member Details Deleted', 3000, 'green');
					setTimeout(function () {
						window.location.reload(true);
					}, 1000);
				}
			}).error(function (error) {
				$('#failure').html(error);
			});
		};
	}

});
