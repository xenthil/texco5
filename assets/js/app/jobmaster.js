var app = angular.module('appJobmaster', []);
app.controller('ctrlJobmaster', function ($scope, $http) {
	var scope = $scope;
	$scope.jobmasters = [];
	$scope.selected = {};
	$scope.objjobmaster = {};
	$scope.objcatmaster = {};
	$scope.subcategorymaster = {};
	$scope.filter = "";
	$scope.agreementtype = [];
	$scope.categorymaster = {};

	$http({
        method: 'GET', 
		headers : {
			"Authorization" : atoken
		},
        url: api_url + "/lookupvalues?lkdmcode=WGTYPE",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.wagetype = response.data.lookupvalues;
            if ($scope.wagetype.length > 0) {
                $scope.atselected = $scope.wagetype[0];
            }
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });
		
	// Get lookup
	$scope.loadlookupvalues = function () {
		$http({
			method: 'GET', 
			headers : {
				"Authorization" : atoken
			},
			url: api_url + "/alllookupvalues",
		}).then(function successCallback(response) {
			if (response.status = 200) {
				debugger
				$scope.lookup = response.data;
				if ($scope.lookup.length > 0) {
					//$scope.jobmaster.lookup = $scope.selectedlookup.lkdmncode;
					$scope.selectedlookup = $scope.lookup[0];
					$scope.lookups = $scope.selectedlookup;
					$scope.lkdmcode = $scope.selectedlookup.lkdmncode;
					$scope.changeadd = 1;
					$scope.lk = $scope.selectedlookup.lookupvalues[0];
					$scope.lkvalid = $scope.lk.lkvalid;
					$scope.select($scope.selectedlookup.lookupvalues[0], $scope.lkdmcode)
				}
			}
		}, function errorCallback(response) {
			Materialize.toast('Something has gone wrong!', 3000, 'red');
		});
	}

	$scope.categoryvalues = [];
	$scope.maincategoryvalues = [];
	$scope.getcategoryvaluesbyType  = function (category)  {
		debugger
		$scope.selectedcategory =category.categoryname;
		var filteredpendingsup = _.filter($scope.categoryvalues, function (item) {
			return item.categoryname == category.categoryname
		});
		$scope.selectedsubcategory = filteredpendingsup[0].subvalues;
		$scope.selectedsubcategories($scope.selectedsubcategory,$scope.selectedcategory,category.categoryid);
	}	

	$scope.getMaincategoryvalues = function ()  {
		$scope.maincategoryvalues = [];
		$http({
			method: 'GET', 
			headers : {
				"Authorization" : atoken
			},
			url: api_url + "/getmaincategory",
		}).then(function successCallback(response) {
			if (response.status = 200) {
				debugger
				$scope.maincategoryvalues = response.data;
				$scope.getcategoryvalues($scope.maincategoryvalues);
			}
		}, function errorCallback(response) {
			Materialize.toast('Something has gone wrong!', 3000, 'red');
		});
	}

	$scope.getcategoryvalues = function (category)  {
		debugger
		$scope.categoryvalues = [];
		$http({
			method: 'GET', 
			headers : {
				"Authorization" : atoken
			},
			url: api_url + "/allcategoryvalues",
		}).then(function successCallback(response) {
			
			if (response.status = 200) {
				debugger
				$scope.categoryvalues = response.data;
				var selcatt = category[0].categoryname;
				var filteredpendingsup = _.filter($scope.categoryvalues, function (item) {
					return item.categoryname == selcatt
				});
				$scope.selectedcategory = selcatt;
				$scope.selectedsubcategory = filteredpendingsup[0].subvalues;
				$scope.selectedsubcategories($scope.selectedsubcategory,$scope.selectedcategory,category[0].categoryid);
			}
		}, function errorCallback(response) {
			Materialize.toast('Something has gone wrong!', 3000, 'red');
		});
	}

	$scope.getlookupvalues = function (lookupval) {
		$scope.selectedlookup = lookupval;
		$scope.lkdmcode = $scope.selectedlookup.lkdmncode;
		$scope.changeadd = 1;
		$scope.lk = $scope.selectedlookup.lookupvalues[0];
		$scope.lkvalid = $scope.lk.lkvalid;
		$scope.select($scope.selectedlookup.lookupvalues[0], $scope.lkdmcode)

	}

	$scope.select = function (jobmaster, lkdmcode) {
		$scope.selected = jobmaster;
		$scope.objjobmaster.lkvalid = jobmaster.lkvalid;
		$scope.objjobmaster.jobmasterid = jobmaster.jobmasterid;
		$scope.objjobmaster.code = jobmaster.code;
		$scope.objjobmaster.description = jobmaster.description;
		$scope.objjobmaster.lkdmcode = lkdmcode;
		$scope.objjobmaster.sortorder = jobmaster.sortorder;
		$scope.lkvalid = jobmaster.lkvalid;
	}

	$scope.selectedsubcategories = function (subcategoryvalue, selectedcategory,categoryid) {
		debugger
		if(subcategoryvalue.length) {
			$scope.selectedsubcategoryy = subcategoryvalue;
			$scope.objcatmaster.subcategoryname = subcategoryvalue[0].subcategoryname;
			$scope.objcatmaster.categoryname = selectedcategory;
			$scope.objcatmaster.categoryid = categoryid;
			$scope.objcatmaster.subcategoryid = subcategoryvalue[0].subcategoryid;
			$scope.subcategoryid = subcategoryvalue[0].subcategoryid;
		} else {
			$scope.selectedsubcategoryy = [];
			$scope.objcatmaster.subcategoryname = '';
			$scope.objcatmaster.categoryname = '';
			$scope.subcategoryid = 0;
			$scope.objcatmaster.categoryid = 0;
			$scope.objcatmaster.subcategoryid = 0;
		}

	}

	$scope.selectCategory = function (lookups) {
		$scope.objcatmaster.subcategoryname = lookups.subcategoryname;
		$scope.objcatmaster.categoryname = lookups.categoryname;
		$scope.objcatmaster.subcategoryid = lookups.subcategoryid;
		$scope.subcategoryid = lookups.subcategoryid;	
	}

	$scope.addcategory = function () {
		$scope.categorymaster = {};
		$('#mcaption').text("Add Category");
		$('#modal1').modal('open');
		$('#failure').text('');
	} 

	$scope.addsubcategory = function () {
		$scope.subcategorymaster = {};
		$('#mcaption2').text("Add Sub Category");
		$('#modal2').modal('open');
		$('#failure').text('');
	}

	$scope.editsubcategory = function(objcatmaster) {
		debugger
		$('#mcaption2').text("Edit Sub Category");
		$('#modal2').modal('open');
		$('#failure').text('');
		$("label").addClass("active");
		$scope.subcategorymaster.categoryid = objcatmaster.categoryid;
		$scope.subcategorymaster.subcategoryname = objcatmaster.subcategoryname;
		$scope.subcategorymaster.subcategoryid = objcatmaster.subcategoryid;
	}

	$scope.savecategorymaster = function (data) { 
		debugger
		var method;
		if (data.categoryid > 0) {
			method = 'PUT';
		} else {
			method = 'POST';
		}
		$http({
			url: api_url + "/savemaincategory",
			data: $.param({
				categoryid: data.categoryid,
				wagetype: data.wagetype,
				categoryname: data.categoryname
			}),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : atoken
            }, 
			method: method,
		}).success(function (response, result) {
			$scope.reslkval = response.lkvalid;
			if (result = 200) {
				$('#modal1').modal('close');
				$scope.getMaincategoryvalues();
			}
		}).error(function (error) {
			$('#failure').html(error);
		});
	}

	$scope.savesubcategorymaster = function (data) {
		debugger
		var method;
		var msgg;
		if (data.subcategoryid > 0) {
			method = 'PUT';
			msgg = 'SubCategory Updated Successfully'
		} else {
			method = 'POST';
			msgg = 'SubCategory Added Successfully'
		}
		$http({
			url: api_url + "/savesubcategory",
			data: $.param({
				subcategoryid: data.subcategoryid,
				categoryid: data.categoryid,
				subcategoryname: data.subcategoryname
			}),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : atoken
            }, 
			method: method,
		}).success(function (response, result) {
			$scope.reslkval = response.lkvalid;
			if (result = 200) {
				$('#modal2').modal('close');
				Materialize.toast(msgg, 3000, 'green');
				$scope.getcategoryvalues(data.categoryid);
			}
		}).error(function (error) {
			$('#failure').html(error);
		});
	}
	
	$scope.addjobmaster = function () {
		$scope.objjobmaster = {};
		$scope.submitted = false;
		$("label").removeClass("active");
		$scope.functions = '';
		$scope.objjobmaster.lkdmcode = $scope.lkdmcode;
		$('#mcaption').text("Add Lookup");
		$('#modal1').modal('open');
		$('#failure').text('');
	}

	$scope.editjobmaster = function () {
		$('#failure').text('');
		$scope.select($scope.selected, $scope.objjobmaster.lkdmcode);
		$('#mcaption').text("Edit Lookup");
		$("label").addClass("active");
		$('#modal1').modal('open');
		$scope.functions = 'edit';
	}

	// Save jobmaster
	$scope.savejobmaster = function (data) {
		var method;
		if (data.lkvalid > 0) {
			method = 'PUT';
			sortorder = data.sortorder;
		} else {
			sortorder = 1;
			method = 'POST';
		}
		$http({
			url: api_url + "/lookupvalues",
			data: $.param({
				lkdmncode: data.lkdmcode,
				code: data.code,
				description: data.description,
				sortorder: sortorder,
				lkvalid: data.lkvalid,
			}),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : atoken
            }, 
			method: method,
		}).success(function (response, result) {
			$scope.reslkval = response.lkvalid;
			if (result = 200) {
				if (response.lkvalid > 0) {
					$http({
						method: 'GET', 
						headers : {
							"Authorization" : atoken
						},
						url: api_url + "/alllookupvalues",
					}).then(function successCallback(response) {
						if (response.status = 200) {
							Materialize.toast('Lookup value saved Successfully !', 3000, 'green');
							$scope.lookup = response.data;

							angular.forEach($scope.lookup, function (lookupdata) {

								if (lookupdata.lkdmncode == $scope.objjobmaster.lkdmcode) {
									angular.forEach(lookupdata.lookupvalues, function (lookupdataval) {
										if ($scope.reslkval == lookupdataval.lkvalid) {

											$scope.selectedlookup = lookupdata;
											$scope.lookups = $scope.selectedlookup;
											$scope.lkdmcode = $scope.selectedlookup.lkdmncode;
											$scope.changeadd = 1;
											$scope.lk = $scope.selectedlookup.lookupvalues[0];
											$scope.lkvalid = $scope.lk.lkvalid;
											$scope.select($scope.selectedlookup.lookupvalues[0], lookupdata.lkdmncode)

										}
									});
								}
							});
						}
					});


				} else {
					$http({
						method: 'GET', 
						headers : {
							"Authorization" : atoken
						},
						url: api_url + "/alllookupvalues",
					}).then(function successCallback(response) {
						if (response.status = 200) {
							$scope.lookup = response.data;

							angular.forEach($scope.lookup, function (lookupdata) {

								if (lookupdata.lkdmncode == $scope.objjobmaster.lkdmcode) {
									angular.forEach(lookupdata.lookupvalues, function (lookupdataval) {
										if (data.lkvalid == lookupdataval.lkvalid) {


											$scope.selectedlookup = lookupdata;
											$scope.lookups = $scope.selectedlookup;
											$scope.lkdmcode = $scope.selectedlookup.lkdmncode;
											$scope.changeadd = 1;
											$scope.lk = $scope.selectedlookup.lookupvalues[0];
											$scope.lkvalid = $scope.lk.lkvalid;
											$scope.select($scope.selectedlookup.lookupvalues[0], lookupdata.lkdmncode)

										}
									});

								}

							});
						}
					}, function errorCallback(response) {
						Materialize.toast('Something has gone wrong!', 3000, 'red');
					});
				}

			}
			$(".modal").modal("close");
		}).error(function (error) {
			$('#failure').html(error);
		});
	};

	// Delete jobmaster
	$scope.removejobmaster = function () {
		if (confirm("Are you sure to delete this detail?")) {
			$http({
				url: api_url + "/lookupvalues",
				data: $.param({
					lkvalid: $scope.objjobmaster.lkvalid
				}),
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'Authorization' : atoken
				},
				method: 'DELETE',
			}).success(function (response, result) {
				if (result = 200) {

					$http({
						method: 'GET', 
						headers : {
							"Authorization" : atoken
						},
						url: api_url + "/alllookupvalues",
					}).then(function successCallback(response) {
						if (response.status = 200) {
							$scope.lookup = response.data;

							angular.forEach($scope.lookup, function (lookupdata) {

								if (lookupdata.lkdmncode == $scope.objjobmaster.lkdmcode) {
									$scope.getlookupvalues(lookupdata);
								}
							});
						}
					}, function errorCallback(response) {
						Materialize.toast('Something has gone wrong!', 3000, 'red');
					});

				}
			}).error(function (error) {
				$scope.error = error;
			});
		};
	} 

	// Delete jobmaster
	$scope.removesubcategory = function (objcatmaster) { 
		debugger
		if (confirm("Are you sure to delete this detail?")) {
			$http({
				url: api_url + "/delete/removesubcategory",
				data: $.param({
					subcategoryid: objcatmaster.subcategoryid
				}),
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'Authorization' : atoken
				},
				method: 'DELETE',
			}).success(function (response, result) {
				if (result = 200) {
					$scope.getMaincategoryvalues();
				}
			}).error(function (error) {
				$scope.error = error;
			});
		};
	}

	$scope.loadlookupvalues();
	$scope.getMaincategoryvalues();
});
