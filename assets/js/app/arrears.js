var app = angular.module('pendingarr', ['ngTable', 'ui.bootstrap']).constant('_', window._);;
app.controller('pendingarrctrl', function ($scope, $http, $filter, NgTableParams) {
	$scope.count = 0;
	$scope.itemsPerPage = $scope.totalItems;
	// $scope.viewby = 20;
	$scope.passshow = 0;

	//$scope.passordernumbers=0;

	// $scope.totalItems = 0;
	// $scope.currentPage = 1;
	// $scope.maxSize = 5; //Number of pager buttons to show
	$scope.roleid = roleid;
	$scope.selectedproj = [];
	$scope.selectedprojacc = [];
	$scope.wagetypeid = 0;
	$scope.wagecategory = [];

	//alert($scope.roleid)
	$http({
		method: 'GET',
		headers: {
			'Authorization' : atoken
		}, 
		url: api_url + "/job/getWageCategory",
	}).then(function successCallback(response) {
		if (response.status = 200) {
			$scope.wgcategory = response.data;
			$scope.wagecategory = response.data;
			//alert(JSON.stringify($scope.wgcategory))
		}
	}, function errorCallback(response) {
		Materialize.toast('Something has gone wrong!', 3000, 'red');
	});  




	$http({
		method: 'GET',
		headers: {
			'Authorization' : atoken
		}, 
		url: api_url + "/lookupvalues?lkdmcode=REGION",
	}).then(function successCallback(response) {
		if (response.status = 200) {
			$scope.region = response.data.lookupvalues;
		}
	}, function errorCallback(response) {
		Materialize.toast('Something has gone wrong!', 3000, 'red');
	});

	$http({
		method: 'GET',
		headers: {
			'Authorization' : atoken
		}, 
		url: api_url + "/job/getProjectDetails",
	}).then(function successCallback(response) {
		if (response.status = 200) {
			$scope.projectsDetails = response.data;
		}
	}, function errorCallback(response) {
		Materialize.toast('Something has gone wrong!', 3000, 'red');
	});


	

	$scope.resetdata = function () {

		$scope.showdata = 0;

	}


	$scope.claimget = function (objattendance) {

		$scope.selectedproj = [];

		$scope.subdata = objattendance;
		$scope.objattendance = objattendance;
		// var url='';
		if (objattendance.regionid == undefined) {
			objattendance.regionid = 0;
		}
		// alert(JSON.stringify(objattendance))
		if (objattendance.type == 1) {
			url = '/job/getSalarySlipNo';
		} else {

			url = '/job/getInvoiceNo';
		}

		$http({
			method: 'POST',
			url: api_url + url,
			data: $.param({
				"data": objattendance,
			}),
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Authorization' : atoken
			},
		}).success(function (response, result) {
			//alert(JSON.stringify(response))
			$scope.showdata = 1;
			if (response.status = 200) {
				var data = response;
				//alert(JSON.stringify(filteredappoved))
				$scope.firstTableParamsub = new NgTableParams({
					page: 1,
					count: 20
				}, {
					data: data
				});
				$scope.confirm = response.data;
				//$scope.totalItems = $scope.confirm.length;
			} else {
				Materialize.toast('error', 3000, 'red');
			}
		}).error(function (error) {
			Materialize.toast(error, 3000, 'red');
		});

		// $http({
		// 	method: 'GET',
		// 	url: api_url + "/job/getWageCategoryByProject?projectid = "+objattendance.projectid,
		// }).then(function successCallback(response) {
		// 	if (response.status = 200) {
		// 		$scope.wgcategory = response.data;
		// 		//alert(JSON.stringify($scope.wgcategory))
		// 	}
		// }, function errorCallback(response) {
		// 	Materialize.toast('Something has gone wrong!', 3000, 'red');
		// });

	};


	/*select project with check box*/
	$scope.selectEntity = function (selected) {
		debugger
		if (selected.ischecked) {
			$scope.wagetypeid = selected.wagetypeid;
			$scope.selectedproj.push(selected)
		} else {
			$scope.selectedproj.splice(selected, 1)
		}

		if($scope.selectedproj.length == 1) {
			$scope.wagecategory = [];
			var wagecategories = _.filter($scope.wgcategory, function (item) {
				return item.wagetypeid == $scope.wagetypeid;
			});
			$scope.wagecategory = wagecategories;
		}
	};

	$scope.resetproj = function (selected) {
		$scope.selectedproj = [];
	}

	$scope.proceedarrear = function (category) {
		debugger
		if (category == undefined) {
			Materialize.toast('Please Select Category', 3000, 'red');
			return;
		}
		var finalarray = {
			'payslipnos': $scope.selectedproj,
			'category': category.category_id,
			'wageyearid': category.wageyearid
		}
		if ($scope.subdata.type == 1) {
			url = "/job/createArrearSalarySlip"
		} else {
			url = "/job/createArrearClaimBill"
		}
		$http({
			method: 'POST',
			url: api_url + url,
			data: $.param({
				'data': finalarray
			}),
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Authorization' : atoken
			},
		}).success(function (response, result) {
			if (response.status = 200) {
				$scope.selectedproj = [];
				$scope.claimget($scope.objattendance);
				if ($scope.subdata.type == 1) {
					Materialize.toast('Arrear Salary Created Successfully!', 5000, 'green');
				} else {
					Materialize.toast('Arrear Claim Created Successfully!', 5000, 'green');
				}
			}
		}).error(function (error) {
			Materialize.toast(error, 3000, 'red');
		});
	}

});
