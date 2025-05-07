var app = angular.module('appProject', []).constant('_', window._);  
app.constant("moment", moment);
app.controller('ctrlProject', function($scope,$http) {
			
	var scope = $scope;
	$scope.searchresult1 = [];
	$scope.searchresult2 = [];
	$scope.selected = {};
	$scope.objproject = {};
	$scope.filter = "";
	$scope.objproject.clientid = 0;
	$scope.updatedfields = [];
	$scope.downloadprojectss = [];
	$scope.copyprojects = 0; 
	$scope.approveprojectss  = 1;

	$scope.projectcheck = -1;
	$scope.clientcheck = -1;
	$scope.projectnocheck = -1;
	$scope.namecheck = -1;
	$scope.districtcheck = -1;
	$scope.regioncheck = -1;
	$scope.statuscheck = -1;
	$scope.designationcheck = -1;
	$scope.addressline1check = -1;
	$scope.addressline2check = -1;
	$scope.addressline3check = -1;
	$scope.pincodecheck = -1;
	$scope.talukcheck = -1;
	$scope.categorycheck = -1;
	$scope.subcategorycheck = -1;

	$scope.projects = [];  
	$scope.projectdata = [];

	$scope.loading = false;
    $scope.SelectedFileForUpload = null;
    $scope.error = '';

	$scope.currentdate = moment().format('YYYY-MM-DD');
	$scope.lastdate = moment().subtract(7, 'days').format('YYYY-MM-DD');

	$scope.objattendance = {'fromdate':$scope.lastdate,'todate':$scope.currentdate};


	$scope.searchvalues = [{
			text: 'Project No',
			field: 'projectno'
		},
		{
			text: 'Project',
			field: 'name'
		},
		{
			text: 'Designation',
			field: 'designation'
		},
		{
			text: 'Client',
			field: 'client'
		}
	];

	$scope.projectlists = [];

	$http({
		method: 'GET', 
		headers : {
			"Authorization" : atoken
		},
		url: api_url + "/member/RegionDetails",
	}).then(function successCallback(response) {
		if (response.status = 200) {
			$scope.regionDetails = response.data.resultdata[0];
		}
	}, function errorCallback(response) {
		Materialize.toast('Something has gone wrong!', 3000, 'red');
	});

	$http({
		method: 'GET', 
		headers : {
			"Authorization" : atoken
		},
		url: api_url + "/member/TalukDetails",
	}).then(function successCallback(response) {
		if (response.status = 200) {
			$scope.TalukDetails = response.data;
		}
	}, function errorCallback(response) {
		Materialize.toast('Something has gone wrong!', 3000, 'red');
	});

	if (regionid == 0) {

		$http({
			method: 'GET', 
			headers : {
				"Authorization" : atoken
			},
			url: api_url + "/client/project?regionid=" + regionid,
		}).then(function successCallback(response) {
			if (response.status = 200) {
				$scope.projects = response.data;
				if (clientid > 0) {
					$scope.value = [];
					angular.forEach($scope.projects, function (project) {
						if (project.clientid == clientid) {
							$scope.value.push(project);
						}
					});
					$scope.projects = [];
					$scope.projects = $scope.value;
				}
				if ($scope.projects.length > 0) {
					var filteredrunning = _.filter($scope.projects, function (item) {
						return item.projectstatus == 'RUNNING'
					});
					$scope.projectsrunning = filteredrunning;
					$scope.projectsrunnings = filteredrunning; 
					$scope.select($scope.projectsrunning[0]);
					$scope.runningcount = $scope.projectsrunning.length;
					$scope.searchresult1 = $scope.projectsrunning;

					var filteredclosed = _.filter($scope.projects, function (item) {
						return item.projectstatus == 'CLOSED'
					});
					$scope.closedcount = filteredclosed.length; 

					var filteredpending = _.filter($scope.projects, function (item) {
						return item.amstatus == 1
					});
					$scope.pendingcount =filteredpending.length;

				}
			}
		}, function errorCallback(response) {
			Materialize.toast('Something has gone wrong!', 3000, 'red');
		});
	} else if (regionid > 0 && roleid == 2) {
		$http({
			method: 'GET', 
			headers : {
				"Authorization" : atoken
			},
			url: api_url + "/client/amsproject?regionid=" + regionid + "&projectid=0",
		}).then(function successCallback(response) {
			if (response.status = 200) {
				$scope.projects = response.data;
				// console.log('$scope.projects', $scope.projects);
				if (clientid > 0) {
					$scope.value = [];
					angular.forEach($scope.projects, function (project) {
						if (project.clientid == clientid) {
							$scope.value.push(project);
						}
					});
					$scope.projects = [];
					$scope.projects = $scope.value;
				}
				if ($scope.projects.length > 0) {

					// var filteredrunning = _.filter($scope.projects, function (item) {
					// 	return item.regionid == regionid
					// });

					// $scope.projectsrunning = filteredrunning;
					// $scope.select($scope.projectsrunning[0]);
					// $scope.runningcount = $scope.projectsrunning.length;
					// $scope.searchresult1 = $scope.projectsrunning;

					// console.log('$scope.projectsrunning', $scope.projectsrunning);

					var filteredrunning = _.filter($scope.projects, function (item) {
						return item.projectstatus == 'RUNNING'
					});

					$scope.projectsrunning = filteredrunning;
					$scope.projectsrunnings = filteredrunning;
					$scope.select($scope.projectsrunning[0]);
					$scope.runningcount = $scope.projectsrunning.length;
					$scope.searchresult1 = $scope.projectsrunning;

					var filteredclosed = _.filter($scope.projects, function (item) {
						return item.projectstatus == 'CLOSED'
					});
					$scope.closedcount = filteredclosed.length;  

					var filteredpending = _.filter($scope.projects, function (item) {
						return item.amstatus == 1
					});
					$scope.pendingcount =filteredpending.length;  

					var filteredrejected = _.filter($scope.projects, function (item) {
						return item.amstatus == 2
					});
					$scope.rejectedcount = filteredrejected.length; 
					

				}
			}
		}, function errorCallback(response) {
			Materialize.toast('Something has gone wrong!', 3000, 'red');
		});

	} else {
		$http({
			method: 'GET', 
			headers : {
				"Authorization" : atoken
			},
			url: api_url + "/client/project?regionid=" + regionid,
		}).then(function successCallback(response) {
			if (response.status = 200) {
				$scope.projects = response.data;
				// console.log('$scope.projects',$scope.projects);
				if (clientid > 0) {
					$scope.value = [];
					angular.forEach($scope.projects, function (project) {
						if (project.clientid == clientid) {
							$scope.value.push(project);
						}
					});
					$scope.projects = [];
					$scope.projects = $scope.value;
				}
				if ($scope.projects.length > 0) {
					var filteredrunning = _.filter($scope.projects, function (item) {
						return item.projectstatus == 'RUNNING'
					});
					
					$scope.projectsrunning = filteredrunning;
					$scope.projectsrunnings = filteredrunning;
					$scope.select($scope.projectsrunning[0]);
					$scope.runningcount = $scope.projectsrunning.length;
					$scope.searchresult1 = $scope.projectsrunning;

					var filteredclosed = _.filter($scope.projects, function (item) {
						return item.projectstatus == 'CLOSED'
					});
					$scope.closedcount = filteredclosed.length;
					 
					var filteredpending = _.filter($scope.projects, function (item) {
						return item.amstatus == 1
					});
					$scope.pendingcount =filteredpending.length;

				}
			}
		}, function errorCallback(response) {
			Materialize.toast('Something has gone wrong!', 3000, 'red');
		});
	}

	$scope.claimmaddress = function (objproject)  { 
		debugger
		if (parseInt(objproject.addressstatus) == 1) {
			$('.caddress label').addClass('active');
			objproject.claimaddressline1 = objproject.addressline1;
			objproject.claimaddressline2 = objproject.addressline2;
			objproject.claimaddressline3 = objproject.addressline3;
			objproject.claimpincode = objproject.pincode;
		} else { 
			$('.caddress label').removeClass('active');
			objproject.claimaddressline1 = '';
			objproject.claimaddressline2 = '';
			objproject.claimaddressline3 = '';
			objproject.claimpincode = '';
		}
	}

	$scope.searchProject = function (filter)  {
		if(filter) {
			var filteredsearch = _.filter($scope.projectsrunnings, function (item) {
				return item.projectno.toLowerCase() == filter.toLowerCase();
			});
			$scope.projectsrunning = filteredsearch;
		} else {
			$scope.projectsrunning = $scope.projectsrunnings;
		}
	}

	$scope.selProjectDetails = function(mainprojectid) {
		debugger
		//$scope.objproject.addressstatus = 1;
		$(".input-field label").addClass("active");
		if(mainprojectid) {
			var filteredsearch = _.filter($scope.projectlists, function (item) {
				return item.projectid == mainprojectid;
			});
			$scope.select(filteredsearch[0]);
			
		}
	}

	$scope.searchProjects = function (filter)  {
		debugger
		if(filter) {
			var filteredsearch = _.filter($scope.projectsclosedd, function (item) {
				return item.projectno.toLowerCase() == filter.toLowerCase();
			});
			$scope.projectsclosed = filteredsearch;
		} else {
			$scope.projectsclosed = $scope.projectsclosedd;
		}
	}

	$scope.getDistrictDetails = function (regionid) {
		debugger
		//$scope.Taluks = [];
		$scope.districtDetails = [];
		angular.forEach($scope.regionDetails, function (region) {
			if (region.region_id == regionid) {
				$scope.districtDetails = region.district;
				return;
			}
		});
	}
	$scope.getTalukDetails = function (districtid) {
		debugger
		$scope.Taluks = [];
		angular.forEach($scope.TalukDetails, function (taluk) {
			if (taluk.district_id == districtid) {
				$scope.Taluks.push(taluk);
				return;
			}
		});
	}

	$scope.getDistrictDetailsEdit = function (regionid, districtid, talukid) {
		debugger
		$scope.Taluks = [];
		$scope.districtDetails = [];
		angular.forEach($scope.regionDetails, function (region) {
			if (region.region_id == regionid) {
				$scope.districtDetails = region.district;
				return;
			}
		});
		$scope.objproject.districtid = districtid;
		$scope.getTalukDetailsEdit(districtid, talukid);
	}
	$scope.getTalukDetailsEdit = function (districtid, talukid) {
		debugger
		$scope.Taluks = [];
		angular.forEach($scope.TalukDetails, function (taluk) {
			if (taluk.district_id == districtid) {
				$scope.Taluks.push(taluk);
				return;
			}
		});
		$scope.objproject.talukid = talukid;
	}

	//}

	$scope.getclosed = function () {
		var filteredclosed = _.filter($scope.projects, function (item) {
			return item.projectstatus == 'CLOSED'
		});
		$scope.projectsclosed = filteredclosed;
		$scope.projectsclosedd = filteredclosed;
		$scope.closedcount = $scope.projectsclosed.length;
		$scope.select($scope.projectsclosed[0]);
	}

	$scope.getpending = function() {
		var filteredclosed = _.filter($scope.projects, function (item) {
			return item.amstatus == 1
		});
		$scope.projectspending = filteredclosed;
		$scope.projectspendingg = filteredclosed;
		$scope.pendingcount = $scope.projectspending.length;
		$scope.select($scope.projectspending[0]);
	} 

	$scope.getrejected = function() {
		var filteredrejected = _.filter($scope.projects, function (item) {
			return item.amstatus == 2
		});
		$scope.projectsrejected = filteredrejected;
		$scope.projectsrejectedd = filteredrejected;
		$scope.rejectedcount = $scope.projectsrejected.length;
		$scope.select($scope.projectsrejected[0]);
	} 


	$scope.getrunning = function () {
		var filteredrunning = _.filter($scope.projects, function (item) {
			return item.projectstatus == 'RUNNING'
		});
		$scope.projectsrunning = filteredrunning;
		$scope.projectsrunnings = filteredrunning;
		$scope.runningcount = $scope.projectsrunning.length;
		$scope.select($scope.projectsrunning[0]);
	}

	$scope.select = function (project) {
		debugger
		//console.log('project', project);
		$scope.selected = project;
		$scope.getDistrictDetailsEdit(project.regionid, project.districtid, project.talukid);
		$scope.objproject.projectid = project.projectid;
		$scope.objproject.client = project.client;
		$scope.objproject.clientid = project.clientid;
		$scope.objproject.projectno = project.projectno;
		$scope.objproject.name = project.name;
		// $scope.objproject.districtid = project.districtid;
		$scope.objproject.regionid = project.regionid;
		//$scope.objproject.talukid = project.talukid;
		$scope.objproject.statusid = project.statusid;
		$scope.objproject.image = project.image;
		$scope.objproject.projectstatus = project.projectstatus;
		$scope.objproject.designation = project.designation;
		$scope.objproject.addressline1 = project.addressline1;
		$scope.objproject.addressline2 = project.addressline2;
		$scope.objproject.addressline3 = project.addressline3;
		$scope.objproject.pincode = project.pincode;
		$scope.objproject.categoryid = project.categoryid;
		$scope.objproject.tallyname = project.tallyname;  
		$scope.objproject.claimaddressline1  = project.claimaddressline1;
		$scope.objproject.claimaddressline2  = project.claimaddressline2;
		$scope.objproject.claimaddressline3 = project.claimaddressline3; 
		$scope.objproject.claimpincode = project.claimpincode;
		$scope.objproject.addressstatus = project.addresstatus;
		$scope.objproject.ismainproject = project.ismainproject;
		$scope.objproject.claimprojectnumber = project.claimprojectnumber;
		$scope.objproject.claimprojectname = project.claimprojectname;

		//$scope.objproject.subcategoryid = project.subcategoryid;
		$scope.selCategories(project.categoryid, project.subcategoryid);
		
	};

	$scope.selCategories = function (categoryid,subcategoryid) {
		debugger
		//$scope.cateid = data.categoryid;
		$scope.subcategory = [];
		$http({
			method: 'POST',
			url: api_url + "/client/getsubcategory",
			data: $.param({
				categoryid: categoryid
			}),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : atoken
            }, 
		}).then(function successCallback(response) {
			if (response.status = 200) {
				$scope.subcategory = response.data;
				$scope.objproject.subcategoryid = subcategoryid;
			}
		}, function errorCallback(response) {
			Materialize.toast('Something has gone wrong!', 3000, 'red');
		});
	}

	$scope.addproject = function () {
		$scope.copyprojects = 0;
		$scope.submitted = false;
		$scope.objproject = [];
		if (clientid > 0) {
			$scope.objproject.clientid = clientid;
		}
		$('#mcaption').text("Add Project");
		$("label").removeClass("active");
		$('#modal1').modal('open');
	};

	$scope.selectClientAddress = function(clientid) {
		debugger
		$http({
			method: 'GET', 
			headers : {
				"Authorization" : atoken
			},
			url: api_url + "/client/getclientDetails?clientid=" + clientid,
		}).then(function successCallback(response) {
			debugger
			if (response.status = 200) { 
				$(".input-field label").addClass("active");
				$scope.objproject.claimaddressline1 = response.data[0].addressline1;
				$scope.objproject.claimaddressline2 = response.data[0].addressline2;
				$scope.objproject.claimaddressline3 = response.data[0].addressline3;
				$scope.objproject.claimpincode = response.data[0].pincode; 
				$scope.objproject.addressline1 = response.data[0].addressline1;
				$scope.objproject.addressline2 = response.data[0].addressline2;
				$scope.objproject.addressline3 = response.data[0].addressline3;
				$scope.objproject.pincode = response.data[0].pincode;
				$scope.objproject.pincode = response.data[0].pincode;
				$scope.objproject.addressstatus = 1;
			}
		}, function errorCallback(response) {
			Materialize.toast('Something has gone wrong!', 3000, 'red');
		});
	}

	$scope.copyproject = function() {
		$scope.submitted = false;
		$scope.objproject = [];
		if (clientid > 0) {
			$scope.objproject.clientid = clientid;
		}
		$scope.copyprojects = 1;
		$('#mcaption').text("Copy Project");
		$("label").removeClass("active");
		$('#modal1').modal('open');
	} 

	$scope.uploadproject  = function() { 
		$scope.Message = "";
		$scope.error = '';
		$scope.SelectedFileForUpload = '';
		$('#mcaptionss').text("Upload Project");
		$("label").removeClass("active");
		$('#modal3').modal('open');
	} 

	$scope.editproject = function () {
		$scope.submitted = false;
		$scope.select($scope.selected);
		$scope.prname=$('.title-proj').html();
        $('#m1caption').text("Edit " +  $scope.prname);
		$('#mcaption').text("Edit " +  $scope.prname);
		$("label").addClass("active");
		$('#modal1').modal('open');
	};

	$scope.RejectProject = function (projectid) {
		if (confirm("Are you sure Revert the AM Changes?")) {
			$http({
				method: 'GET', 
				headers : {
					"Authorization" : atoken
				},
				url: api_url + "/ProjectAMRejectOptions?projectid=" + projectid,
			}).then(function successCallback(response) {
				if (response.status = 200) {
					Materialize.toast('AM Changes Reverted By Admin', 3000, 'green');
					setTimeout(function () {
						window.location.reload(true);
					}, 1000);
				}
			}, function errorCallback(response) {
				Materialize.toast('Something has gone wrong!', 3000, 'red');
			});
		}
	}

	$scope.Approveproject = function () {
		$scope.submitted = false;
		var projectid = $scope.selected.projectid;
		$http({
			method: 'GET', 
			headers : {
				"Authorization" : atoken
			},
			url: api_url + "/client/amsproject?regionid=" + regionid + "&projectid=" + projectid,
		}).then(function successCallback(response) {
			if (response.status = 200) {
				$scope.projects = response.data;
				$scope.updatedfields = $scope.projects[0].updatedfields;
				if ($scope.projects[0].updatedfields) {
					dataObj = JSON.parse($scope.updatedfields);
					$scope.projectcheck = dataObj.lastIndexOf("projectid");
					$scope.clientcheck = dataObj.lastIndexOf("clientid");
					$scope.projectnocheck = dataObj.lastIndexOf("projectno");
					$scope.namecheck = dataObj.lastIndexOf("name");
					$scope.districtcheck = dataObj.lastIndexOf("districtid");
					$scope.regioncheck = dataObj.lastIndexOf("regionid");
					$scope.statuscheck = dataObj.lastIndexOf("status");
					$scope.designationcheck = dataObj.lastIndexOf("designation");
					$scope.addressline1check = dataObj.lastIndexOf("addressline1");
					$scope.addressline2check = dataObj.lastIndexOf("addressline2");
					$scope.addressline3check = dataObj.lastIndexOf("addressline3");
					$scope.pincodecheck = dataObj.lastIndexOf("pincode");
					$scope.talukcheck = dataObj.lastIndexOf("talukid");
					$scope.subcategorycheck = dataObj.lastIndexOf("categoryid");
					$scope.categorycheck = dataObj.lastIndexOf("subcategoryid");
				}
				$scope.select($scope.projects[0]);
				$('#mcaption').text("Approve Project");
				$("label").addClass("active");
				$('#modal2').modal('open');
			}
		}, function errorCallback(response) {
			Materialize.toast('Something has gone wrong!', 3000, 'red');
		});
	};

	// Get status
	$scope.statusid = [];
	$http({
		method: 'GET', 
		headers : {
			"Authorization" : atoken
		},
		url: api_url + "/lookupvalues?lkdmcode=PRJST",
	}).then(function successCallback(response) {
		if (response.status = 200) {
			$scope.statusid = response.data.lookupvalues;
		}
	}, function errorCallback(response) {
		Materialize.toast('Something has gone wrong!', 3000, 'red');
	});

	// Get region
	$scope.region = [];
	$http({
		method: 'GET', 
		headers : {
			"Authorization" : atoken
		},
		url: api_url + "/lookupvalues?lkdmcode=REGION",
	}).then(function successCallback(response) {
		if (response.status = 200) {
			$scope.region = response.data.lookupvalues;
		}
	}, function errorCallback(response) {
		Materialize.toast('Something has gone wrong!', 3000, 'red');
	});

	// Get DISTRICT
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
		}
	}, function errorCallback(response) {
		Materialize.toast('Something has gone wrong!', 3000, 'red');
	});

	// Get Clients
	$scope.clients = [];
	$http({
		method: 'GET', 
		headers : {
			"Authorization" : atoken
		},
		url: api_url + "/client",
	}).then(function successCallback(response) {
		if (response.status = 200) {
			$scope.clients = response.data;
		}
	}, function errorCallback(response) {
		Materialize.toast('Something has gone wrong!', 3000, 'red');
	});

	$scope.clientslists = [];
	$http({
		method: 'GET', 
		headers : {
			"Authorization" : atoken
		},
		url: api_url + "/clientDropDown",
	}).then(function successCallback(response) {
		if (response.status = 200) {
			$scope.clientslists = response.data;
			// console.log('$scope.clientslists', $scope.clientslists);
		}
	}, function errorCallback(response) {
		Materialize.toast('Something has gone wrong!', 3000, 'red');
	});

	$http({
		method: 'GET', 
		headers : {
			"Authorization" : atoken
		},
		url: api_url + "/projectDropDown",
	}).then(function successCallback(response) {
		if (response.status = 200) {
			$scope.projectlists = response.data;
			// console.log('$scope.clientslists', $scope.clientslists);
		}
	}, function errorCallback(response) {
		Materialize.toast('Something has gone wrong!', 3000, 'red');
	});


	// get category
	$scope.category = [];
	$http({
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Authorization' : atoken
		}, 
		url: api_url + "/client/getcategory",
	}).then(function successCallback(response) {
		if (response.status = 200) {
			$scope.category = response.data;
		}
	}, function errorCallback(response) {
		Materialize.toast('Something has gone wrong!', 3000, 'red');
	});

	// Selected category
	$scope.selCategory = function (data) {
		debugger
		$scope.cateid = data.categoryid;

		$scope.subcategory = [];
		$http({
			method: 'POST',
			url: api_url + "/client/getsubcategory",
			data: $.param({
				categoryid: data.categoryid
			}),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : atoken
            }, 
		}).then(function successCallback(response) {
			if (response.status = 200) {
				$scope.subcategory = response.data;
			}
		}, function errorCallback(response) {
			Materialize.toast('Something has gone wrong!', 3000, 'red');
		});
	}

	// SAVE PROJECT
	$scope.saveproject = function (data, file) {
		var method;
		if (data.projectid > 0 && $scope.copyprojects == 0) {
			method = 'PUT';
		} else {
			method = 'POST';
		}
		// console.log('data', data);
		debugger
		$http({
			url: api_url + "/client/project",
			data: $.param({
				projectid: data.projectid,
				clientid: data.clientid,
				projectno: data.projectno,
				name: data.name,
				districtid: data.districtid,
				talukid: data.talukid,
				regionid: data.regionid,
				changedby: data.changedby,
				statusid: data.statusid,
				designation: data.designation,
				addressline1: data.addressline1,
				addressline2: data.addressline2,
				addressline3: data.addressline3,
				pincode: data.pincode,
				roleid: roleid,
				amstatus: data.amstatus,
				categoryid: data.categoryid,
				subcategoryid: data.subcategoryid,
				addresstatus : data.addressstatus,
				claimaddressline1 : data.claimaddressline1,
				claimaddressline2 : data.claimaddressline2,
				claimaddressline3 : data.claimaddressline3,
				claimpincode : data.claimpincode,
				tallyname : data.tallyname,
				ismainproject : data.ismainproject,
			claimprojectnumber : data.claimprojectnumber,
		claimprojectname : data.claimprojectname,
				copyprojects : $scope.copyprojects
			}),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : atoken
            }, 
			method: method,
		}).success(function (response, result) {
			if (result == 200) {
				if($scope.copyprojects == 1) {
					setTimeout(function () {
						window.location.reload(true);
					}, 500); 
				} else {
					if(roleid == 2) {
						var serviceurl = api_url + "/client/amsproject?regionid="+regionid+"&projectid="+ response.projectid;
					} else {
						var serviceurl = api_url + "/client/project/" + response.projectid;
					}
					$http({
						method: 'GET', 
						headers : {
							"Authorization" : atoken
						},
						url: serviceurl
					}).then(function successCallback(response) {
						if (response.status = 200) {
							Materialize.toast('Project saved Successfully !', 5000, 'green');
							if (response.data.length > 0) {
								for (var loop = 0; loop < $scope.projects.length; loop++) {
									if ($scope.projects[loop].projectid == response.data[0].projectid) {
										$scope.projects[loop] = response.data[0];
										// console.log('response.projectid', response.data[0].projectstatus);
										debugger
										if (response.data[0].projectstatus == "RUNNING") {
											$scope.select($scope.projects[loop]);
											// angular.element('#Running').trigger('click');
											// $scope.getrunning();
										} else if (response.data[0].projectstatus == "CLOSED") {
											// angular.element('#Closed').trigger('click');
											// $scope.getclosed();
											$scope.select($scope.projects[loop]);
										} else {
											$scope.select($scope.projects[loop]);
										}
										break;
									}
								}
							} else {
								setTimeout(function () {
									window.location.reload(true);
								}, 500);
							}
						} else {
							Materialize.toast('Project saved Successfully !', 3000, 'green');
							setTimeout(function () {
								window.location.reload(true);
							}, 500);
						}
					},function errorCallback(response) {
						Materialize.toast('Something has gone wrong!', 3000, 'red');
					});
				}
			}
			$(".modal").modal("close");
		}).error(function (error) {
			$scope.error = error;
			Materialize.toast(error, 3000, 'red');
		});
	};

	$scope.saveApproveproject = function (data, file) {
		var method;
		if (data.projectid > 0) {
			method = 'PUT';
		} else {
			method = 'POST';
		}
		$http({
			url: api_url + "/client/projectApproveSave",
			data: $.param({
				projectid: data.projectid,
				clientid: data.clientid,
				projectno: data.projectno,
				name: data.name,
				districtid: data.districtid,
				regionid: data.regionid,
				changedby: data.changedby,
				statusid: data.statusid,
				designation: data.designation,
				addressline1: data.addressline1,
				addressline2: data.addressline2,
				addressline3: data.addressline3,
				pincode: data.pincode,
				roleid: roleid,
				amstatus: 0,
				talukid: data.talukid,
				categoryid: data.categoryid,
				subcategoryid: data.subcategoryid
			}),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : atoken
            }, 
			method: method,
		}).success(function (response, result) {
			if (result == 200) {
				Materialize.toast('Project Approved Successfully !', 3000, 'green');
				setTimeout(function () {
					window.location.reload(true);
				}, 1500);
			}
			$(".modal").modal("close");
		}).error(function (error) {
			$scope.error = error;
		});
	};
	// Delete Project
	$scope.removeproject = function () {
		if (confirm("Are you sure to delete this detail?")) {
			$http({
				url: api_url + "/client/project",
				data: $.param({
					projectid: $scope.objproject.projectid
				}),
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'Authorization' : atoken
				},
				method: 'DELETE',
			}).success(function (response, result) {
				if (result = 200) {
					for (var loop = 0; loop < $scope.projects.length; loop++) {
						if ($scope.projects[loop].projectid == $scope.objproject.projectid) {
							$scope.projects.splice(loop, 1);
							$scope.select($scope.projects[loop]);
							break;
						}
					}
				}
			}).error(function (error) {
				$scope.error = error;
			});
		};
	}

	$scope.emptysearch = function (value) {
		$scope.value = "";
	};
	$scope.Searchrunning = function (field, searchvalue) {

		$scope.projectsrunning = $scope.searchresult1;
		$scope.resultprojects1 = [];
		angular.forEach($scope.projectsrunning, function (project) {
			if (project[field].includes(searchvalue)) {
				$scope.resultprojects1.push(project);
				$scope.projectsrunning = [];
				$scope.projectsrunning = $scope.resultprojects1;
			}
			return;
		});
		if ((!field && !searchvalue) || ($scope.resultprojects1.length == 0)) {
			$scope.projectsrunning = [];
		}
		return;
	};  
	
	$scope.Searchclosed = function (field, searchvalue) {

		$scope.projectsclosed = $scope.searchresult2;
		$scope.resultprojects2 = [];
		angular.forEach($scope.projectsclosed, function (project) {
			if (project[field].includes(searchvalue)) {
				$scope.resultprojects2.push(project);
				$scope.projectsclosed = [];
				$scope.projectsclosed = $scope.resultprojects2;
			}
			return;
		});
		if ((!field && !searchvalue) || ($scope.resultprojects2.length == 0)) {
			$scope.projectsclosed = [];
		}
		return;
	};   
	
	$scope.searchRejected = function (field, searchvalue) {

		$scope.projectsrejected = $scope.searchresult2;
		$scope.resultprojects2 = [];
		angular.forEach($scope.projectsrejected, function (project) {
			if (project[field].includes(searchvalue)) {
				$scope.resultprojects2.push(project);
				$scope.projectsrejected = [];
				$scope.projectsrejected = $scope.resultprojects2;
			}
			return;
		});
		if ((!field && !searchvalue) || ($scope.resultprojects2.length == 0)) {
			$scope.projectsrejected = [];
		}
		return;
	}; 
	
	$scope.downloadbulkproject = function () {  
		debugger
		var urls =  api_url + "/client/bulkdownload";
		$http({
			method: 'GET', 
			headers : {
				"Authorization" : atoken
			},
			url: urls,
		}).then(function successCallback(response) {
			if (response.status = 200) {  
				$scope.downloadbulkprojects = [];
				$scope.downloadbulkprojects = response.data; 
				JSONToCSVConvertor($scope.downloadbulkprojects, 'ProjectBulk_Report', true)
			}
		}, function errorCallback(response) {
			Materialize.toast('Something has gone wrong!', 3000, 'red');
		});
	}

	$scope.downloadproject = function (objattendance) {
		if (objattendance.fromdate == undefined) {
			objattendance.fromdate = 0;
		}  
		if (objattendance.todate == undefined) {
			objattendance.todate = 0;
		} 
		debugger
		var urls =  '';
		if (regionid == 0) {  
			urls =  api_url + "/client/project_ams/export?regionid=NULL&fromdate="+objattendance.fromdate+"&todate="+objattendance.todate;
		} else if (regionid > 0 && roleid == 2) {
			urls =  api_url + "/client/project_ams/export?regionid="+regionid+"&fromdate="+objattendance.fromdate+"&todate="+objattendance.todate;
		} else {  
			urls =  api_url + "/client/project_ams/export?regionid="+regionid+"&fromdate="+objattendance.fromdate+"&todate="+objattendance.todate;
		}
		$http({
			method: 'GET', 
			headers : {
				"Authorization" : atoken
			},
			url: urls,
		}).then(function successCallback(response) {
			if (response.status = 200) {
				$scope.downloadprojectss = response.data; 
				JSONToCSVConvertor($scope.downloadprojectss, 'Project_Report', true)
			}
		}, function errorCallback(response) {
			Materialize.toast('Something has gone wrong!', 3000, 'red');
		});
	}

	// No need for json convertor after include ngCsv module
	function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
		
		//If JSONData is not an object then JSON.parse will parse the JSON string in an Object
		var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;

		var CSV = '';
		//Set Report title in first row or line

		//This condition will generate the Label/Header
		if (ShowLabel) {
			var row = "";

			//This loop will extract the label from 1st index of on array
			for (var index in arrData[0]) {

				//Now convert each value to string and comma-seprated
				row += index.toUpperCase() + ',';
			}

			row = row.slice(0, -1);

			//append Label row with line break
			CSV += row + '\r\n';
		}

		//1st loop is to extract each row
		for (var i = 0; i < arrData.length; i++) {
			var row = "";

			//2nd loop will extract each column and convert it in string comma-seprated
			for (var index in arrData[i]) {
				
				if(index == 'updatedfields') {
					if(arrData[i][index]) {
						row += '"' + arrData[i][index] + '",';
					} else {
						row += ',';
					}
				} else {
					row += '"' + arrData[i][index] + '",';
				}
				
			}

			row.slice(0, row.length - 1);

			//add a line break after each row
			CSV += row + '\r\n';
		}

		if (CSV == '') {
			Materialize.toast('Invalid Data', 3000, 'red');
			return;
		}

		//Generate a file name
		//this will remove the blank-spaces from the title and replace it with an underscore
		var fileName = ReportTitle.replace(/ /g, "_");

		//Initialize file format you want csv or xls
		var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);

		// Now the little tricky part.
		// you can use either>> window.open(uri);
		// but this will not work in some browsers
		// or you will not get the correct file extension    

		//this trick will generate a temp <a /> tag
		var link = document.createElement("a");
		link.href = uri;

		//set the visibility hidden so it will not effect on your web-layout
		link.style = "visibility:hidden";
		link.download = fileName + ".csv";

		//this part will append the anchor tag and remove it after automatic click
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}  


	$scope.UploadFile = function (files) {
		debugger
		$("input").removeClass("disabled");
		$scope.$apply(function () { 
			$scope.Message = "";
			$scope.SelectedFileForUpload = files[0];
		})
	}

	$scope.ParseExcelDataAndSave = function () {
        debugger
		var file = $scope.SelectedFileForUpload;
		if (file) {
			$scope.SelectedFileForUpload = true;
			$scope.loading = true;
			var reader = new FileReader();
			reader.onload = function (e) {
				var data = e.target.result;
				//XLSX from js-xlsx library , which I will add in page view page
				var workbook = XLSX.read(data, {
					type: 'binary'
				});
                var sheetName = workbook.SheetNames[0]; 
                var excelData = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);                 
				if (excelData.length > 0) {
                    $scope.projectdata.push(excelData);
                    console.log('workbook.Sheets[sheetName]',$scope.projectdata);
					$http({
						url: api_url + "/project/upload/",
						data: $.param({
							projectdata: $scope.projectdata
						}),
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded',
							'Authorization' : atoken
						}, 
						method: 'POST',
					}).success(function (response, result) { 
                        debugger
						if (result = 200) { 
                            if(response[1] == 'success') {
                                $scope.loading = false; 
                                $('#modal3').modal('close');
                                Materialize.toast('Project Details Uploaded Successfully', 3000, 'green');
                                $("input").addClass("disabled");
                                angular.element("input[type='text']").val(null);
                            } else {    
                                $scope.error = response[1]; 
                                JSONToCSVConvertorError(response[0], 'Given Data Issues', true)
                            } 
						}
					}).error(function (error) { 
                        debugger  
						$scope.error = error;
					});
				} else {
					$scope.Message = "No data found";
				}
			}
			reader.onerror = function (ex) {
				console.log(ex);
			}
			reader.readAsBinaryString(file);
		}
    } 
    
    function JSONToCSVConvertorError(JSONData, ReportTitle, ShowLabel) {
        debugger
		//If JSONData is not an object then JSON.parse will parse the JSON string in an Object 

		var arrData = JSONData;
		var CSV = '';
		//Set Report title in first row or line

		//1st loop is to extract each row
		for (var i = 0; i < arrData.length; i++) {
			var row = arrData[i];
			CSV += row + '\r\n';
		}

		if (CSV == '') {
			Materialize.toast('Invalid data', 3000, 'red');
			return;
		}

		//Generate a file name
		//this will remove the blank-spaces from the title and replace it with an underscore
		var fileName = ReportTitle.replace(/ /g, "_");
		//Initialize file format you want csv or xls
		var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
		// Now the little tricky part.
		// you can use either>> window.open(uri);
		// but this will not work in some browsers
		// or you will not get the correct file extension    
		//this trick will generate a temp <a /> tag
		var link = document.createElement("a");
		link.href = uri;

		//set the visibility hidden so it will not effect on your web-layout
		link.style = "visibility:hidden";
		link.download = fileName + ".csv";

		//this part will append the anchor tag and remove it after automatic click
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}

});
