var app = angular.module("appAdminMember", ["ngFileUpload", "ngTable","ui.bootstrap"]);
app.constant("moment", moment);
app.controller(
	"ctrlAdminMember",
	function ($scope, $http, $filter, NgTableParams, Upload, $timeout) {
		this.myDate = new Date();
		this.isOpen = false;
		$scope.memberids = memberid;

		$scope.succes=0;
		$scope.option=2;

		$scope.types = [
			{ id: "", title: "" },
			{ id: "Member", title: "Member" },
			{ id: "Dependent", title: "Dependent" },
		];
		$scope.members = [];
		$scope.selectedskill=[];
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
		$scope.servicenovalid = "";
		$scope.DisableButton = false;
		$scope.isDisabled = false;
		$scope.regionDetails = [];
		$scope.TalukDetails = [];
		// Get character
		$scope.character = [];
		$scope.valshow = 1;
		$scope.servicenumber = 0;
		$scope.updatemember = 0;
		$scope.ipaddress = "";
    
		//https://ipapi.co/json/
		$.getJSON("https://ipapi.co/json/?key=q6fDJmxmTKR03Q6XVRFES10wQCoJKrsIaHpjipiPdoas64cjoj", function (data) {
			$scope.ipaddress = data.ip + "-" + data.city;
		})

		//$scope.vacancypage=vacancypage;
		// Get alldistrict

		// Get Country

	


		// Get Country
		


		
      // Get alldistrict
	  $scope.eduqual = [];
	  $http({
		  method: 'GET', 
		  headers : {
			  "Authorization" : atoken
		  },
		  url: api_url + "/lookupvalues?lkdmcode=EDUQUAL",
	  }).then(function successCallback(response) {
		  if (response.status = 200) {
			
			  $scope.eduqual = response.data.lookupvalues;
			  console.log($scope.eduqual);
		  }
	  }, function errorCallback(response) {
		  Materialize.toast('Something has gone wrong!', 3000, 'red');
	  });


	  $http({
		method: "GET",
		headers: {
			Authorization: atoken,
		},
		url: api_url + "/vacancy/projectlist",
	}).then(
		function successCallback(response) {
			if ((response.status = 200)) {
				var data = response.data;
				$scope.projects = data;
				console.log("$scope.projects", $scope.projects);
			}
		},
		function errorCallback(response) {
			Materialize.toast("Something has gone wrong!", 3000, "red");
		}
	);

	

	  
	  $scope.alldistrict = [];
	  $http({
		  method: 'GET', 
		  headers : {
			  "Authorization" : atoken
		  },
		  url: api_url + "/lookupvalues?lkdmcode=DISTRC",
	  }).then(function successCallback(response) {
		  if (response.status = 200) {
			  $scope.alldistrict = response.data.lookupvalues;
		  }
	  }, function errorCallback(response) {
		  Materialize.toast('Something has gone wrong!', 3000, 'red');
	  });



	  //$scope.alldistrict = [];
	  $http({
		  method: 'GET', 
		  headers : {
			  "Authorization" : atoken
		  },
		 url: api_url + "/members/" + $scope.memberids,
	  }).then(function successCallback(response) {
		  if (response.status = 200) {
			$scope.objregister = response.data[0];
		  }
	  }, function errorCallback(response) {
		  Materialize.toast('Something has gone wrong!', 3000, 'red');
	  });


	  $http({
		method: 'GET', 
		headers : {
			"Authorization" : atoken
		},
	   url: api_url + "/getseneriorityno?memberid=" + $scope.memberids,
	}).then(function successCallback(response) {
		if (response.status = 200) {
		  $scope.senmem = response.data;
		}
	}, function errorCallback(response) {
		Materialize.toast('Something has gone wrong!', 3000, 'red');
	});


		$http({
			method: 'GET', 
			headers : {
				"Authorization" : atoken
			},
			url: api_url + "/getvacancypdf",
		}).then(function successCallback(response) {
			if (response.status = 200) {
				$scope.vacancy = response.data[0];
			}
		}, function errorCallback(response) {});
		


		$scope.getSelectedCategory = function (job) {
			console.log(job)
			$scope.jobpostingdetailid = job.jobpostingdetailid;
			$scope.jobmasterid = job.jobmasterid;
			$scope.jobcode = job.code;
			$scope.currentvacancy = job.available;
			console.log(job.available)
			// if(job.available <=0)
			// {
			// 	$scope.unavailable=0;
	
			// }
			// else
			// {
			// 	$scope.unavailable=1;
			// }
	
		};
	
		$scope.getSelectedProjects = function (selproj) {
			//console.log(selproj)
	
			$scope.jobmaster = selproj.jobs;
			$scope.selprojid = selproj.projectid;
			$scope.selprojno = selproj.projectno;
			$scope.selclient = selproj.clientid;
			// var filteredpending = _.filter($scope.projects, function (item) {
			// 	return item.projectid == projectid;
			// });
			//	$scope.vcprojectno = filteredpending[0].projectno;
			//	$scope.vcprojectid = filteredpending[0].projectid;
		};
	
		

		$scope.saveapplynew = function() {
			var ocxetd =localStorage.getItem("ocxetd")
		   localStorage.setItem("ocxetd",  moment().format('YYYY/MM/DD HH:mm:ss'));
			
		
				$scope.isDisabled = true;
			
				//job activity
				$http({ 
					url: api_url + "/job/jobactivityapply",
					data: $.param({
						jobpostingdetailid: $scope.jobpostingdetailid,
						memberid: $scope.memberids,
						clientid: $scope.selclient,
						projectid: $scope.selprojid,
						code: $scope.jobcode,
						currentvacancies: $scope.currentvacancy,
						texcono: '',
						ipaddress : $scope.ipaddress,
						ocxetd:ocxetd
					}),
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'Authorization' : atoken
					}, 
					method: 'POST',
				}).success(function(response, result) {
					if (result = 200) {
						$scope.jobactivityid = response[0].jobactivityid;
						Materialize.toast('Job Applied Successfully', 6000, 'green') 
						setTimeout(() => {
							$scope.applyprint();
							$scope.isDisabled = false;
						}, 5000);
					} else {
						Materialize.toast('Job Apply failed', 6000, 'red') 
					} 
				}).error(function(error) {
					if(error.includes('ER_LOCK_WAIT_TIMEOUT'))
					{
						$('#failure2').html('Server is too busy. Please try again.');    
					}
					else if (error.includes('ER_DUP_ENTRY'))
					{
						$('#failure2').html('You Already applied maximum number of job for this week'); 
					}
					else
					{
						$('#failure2').html(error);    
					}
					$scope.isDisabled = false;
				});
			
		}


		$scope.searchmembers = function (texserno) {
			// alert(jobid)
			$http({
				url: base_url + "Member/check_login_vacancy/",
				data: $.param({
					data: texserno,
				}),
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
					Authorization: atoken,
				},
				method: "POST",
			})
				.success(function (response, result) {
					if (response.includes("success")) {
						Materialize.toast("You are login is successfully", 3000, "green");
						setTimeout(function () {
							window.location = base_url + "member/vacancyapply";
						}, 1500);
					} else {
						if (response.includes("User Alredy Logged in")) {
							// alert('User Alredy Logged in');
							var msg = "User Already Logged in";
							Materialize.toast(msg, 3000, "red");
						} else {
							Materialize.toast(response, 3000, "red");
						}
					}
				})
				.error(function (error) {
					Materialize.toast(error, 3000, "red");
				});
		};




		
		$scope.getDependent = function () {
			if (memberid == "") {
				memberid = 0;
			}

			$http({
				method: "GET",
				headers: {
					Authorization: atoken,
				},
				url: api_url + "/dependent/getdependent/member?memberid=" + memberid,
			}).then(
				function successCallback(response) {
					if ((response.status = 200)) {
						console.log(response);
						var data = response.data;
						
						//console.log(JSON.parse(data.trainingRequired))


						angular.forEach(data, function(data) {
						//	if (taluk.lkvalid == data.talukid) {
							
								data.trainingRequired = JSON.parse(data.trainingRequired = JSON.parse(data.trainingRequired));
								//return;
							//}
						});
						console.log('data',data);

						$scope.confirm = data;
						$scope.tableParams = new NgTableParams(
							{
								page: 1,
								count: 100000,
							},
							{
								data: data,
							}
						);
						$scope.totalItems = response.data.length;
					} else {
						Materialize.toast("error", 3000, "red");
					}
				},
				function errorCallback(response) {
					Materialize.toast("error", 3000, "red");
				}
			);
		};

		$scope.getskillmember = function () {
			if (memberid == "") {
				memberid = 0;
			}

			$http({
				method: "GET",
				headers: {
					Authorization: atoken,
				},
				url: api_url + "/getskill/member?memberid=" + memberid,
			}).then(
				function successCallback(response) {
					if ((response.status = 200)) {
						console.log(response);
						// var data = response.data[0];
						if (response.data.length > 0) {
							$scope.skillprof = response.data[0];
							$scope.updatemember = 1;
						}

						// $scope.totalItems = response.data.length;
					} else {
						Materialize.toast("error", 3000, "red");
					}
				},
				function errorCallback(response) {
					Materialize.toast("error", 3000, "red");
				}
			);
		};

		$scope.editDependent = function (applied) {
			console.log(applied);
			$scope.objregister = applied;
			$scope.depid = applied.dependentId;
			console.log($scope.depid);
			var picker = $(".datepicker").pickadate("picker");
			picker.set("select", new Date(applied.dateOfBirth));
			angular.forEach($scope.skills, function(skill) {
				angular.forEach(applied.trainingRequired, function(sel) {
					console.log(skill);
					if(skill.lkvalid==sel.lkvalid)
					{
						skill.selected=1;
						//skill.$$hashKey=sel.$$hashKey;	
						//return;
					}
					
					
				})

			});

			$scope.selectedskill=applied.trainingRequired;

			
			console.log($scope.skills);
			$("#modal1").modal("open");
		};


		
		$scope.flleupload = function (file) {

			if (file != undefined && file != "") {
				file.upload = Upload.upload({
					url: base_url + "member/depdocupload/",
					data: {
						file: file,
					},
				});

				file.upload.then(
					function (response) {
						$scope.imagename = response.data;
						//datas.documentPath = $scope.imagename;
						console.log($scope.imagename );
					
					},
					function (response) {
						if (response.status > 0)
							$scope.errorMsg = response.status + ": " + response.data;
					},
					function (evt) {
						// Math.min is to fix IE which reports 200% sometimes
						file.progress = Math.min(
							100,
							parseInt((100.0 * evt.loaded) / evt.total)
						);
					}
				);
			} else if (file == undefined && file == "" && data.image != " ") {
				data.image = "defaultlogo.jpg";
			}
		}



		$scope.selectEntity = function (selected) {
		    console.log(selected.$$hashKey);
			debugger
			if (selected.ischecked==1) {
				$scope.selectedskill.push({'lkvalid':selected.lkvalid,'code':selected.code});
				//$scope.passshow = 0;
			}
			else {

				$scope.selectedskill = $scope.selectedskill.filter(function(item) { 
					return item.lkvalid !== selected.lkvalid; 
				  });
				//$scope.selectedskill.splice(selected, 1);
				//$scope.selectedskill = _.without($scope.selectedskill, {'lkvalid':selected.lkvalid});
			//	$scope.passshow = 0;
			}
			// alert(JSON.stringify( $scope.selectedproj))
		};


		$scope.savevacancydoc = function (datas) {
			 
			datas.memberid = $scope.memberids;
			//alert('reaady');
			//datas.documentPath = $scope.imagename;

			//datas.trainingRequired=JSON.stringify(JSON.stringify($scope.selectedskill))
				console.log(datas);

			
						$http({
							url: api_url + "/uploadapplydoc",
							data: $.param(datas),
							headers: {
								"Content-Type": "application/x-www-form-urlencoded",
								Authorization: atoken,
							},
							method: "POST",
						}).success(function (response, result) {
							if ((result = 200)) {
								$scope.succes=1;
								//console.log(response.memberid);
								$scope.applyid=response.memberid;

								//window.location = base_url + "member/dependency";
							}
						});
				
					

			// return;
		};



		
		$scope.savevacancyform = function (datas) {
			 
			//datas.memberid = $scope.memberids;
			//alert('reaady');
			//datas.documentPath = $scope.imagename;
			
			if(datas.agree==undefined || datas.agree==0)
      {
          $scope.valshow=0;
        return;
      }
	  
	    $scope.DisableButton = true;

			//datas.trainingRequired=JSON.stringify(JSON.stringify($scope.selectedskill))
				console.log(datas);

				//return;

			
						$http({
							url: api_url + "/newmemberapply",
							data: $.param(datas),
							headers: {
								"Content-Type": "application/x-www-form-urlencoded",
								Authorization: atoken,
							},
							method: "POST",
						}).success(function (response, result) {
							if ((result = 200)) {
								$scope.succes=1;
								//console.log(response.memberid);
								$scope.applyid=response.memberid;

								//window.location = base_url + "member/dependency";
							}
							else
							{
								 $scope.DisableButton = false;
							}
						});
				
					

			// return;
		};


		$scope.uploadvacancydoc = function (datas, file) {
			if (file != undefined && file != "") {
				file.upload = Upload.upload({
					url: base_url + "member/vacancydocupload/",
					data: {
						file: file,
					},
				});

				file.upload.then(
					function (response) {
						//alert(response.data.error)
						if(response.data.error==false)
						{
						$scope.imagename = response.data.message;
						datas.documentpath = $scope.imagename;
						$scope.savevacancydoc(datas);

						}
						
						else{
							var sttr=response.data.message.replace(/(<([^>]+)>)/ig, '');
							 
							$scope.errorMsg =sttr;
							return;
						}
					},
					function (response) {
						if (response.status > 0)
							$scope.errorMsg = response.status + ": " + response.data;
					},
					function (evt) {
						// Math.min is to fix IE which reports 200% sometimes
						file.progress = Math.min(
							100,
							parseInt((100.0 * evt.loaded) / evt.total)
						);
					}
				);
			} else {
				//$scope.updatedependentsave(datas);
			}

			// return;
		};

	
		$scope.seloption = function (opt) {
			$scope.option=opt;
		}
		
		
	

		
		



	
		
//alert(vacancypage)
	
	//	$scope.getfulllistadmin();
		//$scope.getskillmember();
	}
);
