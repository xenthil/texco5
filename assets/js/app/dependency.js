var app = angular.module("appAdminMember", ["ngFileUpload", "ngTable"]);
app.controller(
	"ctrlAdminMember",
	function ($scope, $http, $filter, NgTableParams, Upload, $timeout) {
		this.myDate = new Date();
		this.isOpen = false;
		$scope.memberids = memberid;

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
		// Get alldistrict

		// Get Country

		$http({
			method: "GET",
			headers: {
				Authorization: atoken,
			},
			url: api_url + "/lookupvalues?lkdmcode=RANK",
		}).then(
			function successCallback(response) {
				if ((response.status = 200)) {
					$scope.rank = response.data.lookupvalues;
					if ($scope.rank.length > 0) {
						$scope.raselected = $scope.rank[0];
					}
				}
			},
			function errorCallback(response) {
				Materialize.toast("Something has gone wrong!", 3000, "red");
			}
		);

		$http({
			method: "GET",
			headers: {
				Authorization: atoken,
			},
			url: api_url + "/member/RegionDetails",
		}).then(
			function successCallback(response) {
				if ((response.status = 200)) {
					$scope.regionDetails = response.data.resultdata[0];
					console.log("$scope.regionDetails", $scope.regionDetails);
				}
			},
			function errorCallback(response) {
				Materialize.toast("Something has gone wrong!", 3000, "red");
			}
		);

		$http({
			method: "GET",
			headers: {
				Authorization: atoken,
			},
			url: api_url + "/member/TalukDetails",
		}).then(
			function successCallback(response) {
				if ((response.status = 200)) {
					$scope.TalukDetails = response.data;
					console.log("$scope.TalukDetails", $scope.TalukDetails);
				}
			},
			function errorCallback(response) {
				Materialize.toast("Something has gone wrong!", 3000, "red");
			}
		);

		// Get Religion
		$scope.religion = [];
		$http({
			method: "GET",
			headers: {
				Authorization: atoken,
			},
			url: api_url + "/lookupvalues?lkdmcode=RELIGION",
		}).then(
			function successCallback(response) {
				if ((response.status = 200)) {
					$scope.religion = response.data.lookupvalues;
				}
			},
			function errorCallback(response) {
				Materialize.toast("Something has gone wrong!", 3000, "red");
			}
		);

		// Get States
		$http({
			method: "GET",
			headers: {
				Authorization: atoken,
			},
			url: api_url + "/lookupvalues?lkdmcode=STATE",
		}).then(
			function successCallback(response) {
				if ((response.status = 200)) {
					$scope.state = response.data.lookupvalues;
					if ($scope.state.length > 0) {
						$scope.sselected = $scope.state[1];
						//  $scope.objregister.stateid =   $scope.sselected.lkvalid;
					}
				}
			},
			function errorCallback(response) {
				Materialize.toast("Something has gone wrong!", 3000, "red");
			}
		);

		// Get Country
		$http({
			method: "GET",
			headers: {
				Authorization: atoken,
			},
			url: api_url + "/lookupvalues?lkdmcode=CNTRY",
		}).then(
			function successCallback(response) {
				if ((response.status = 200)) {
					$scope.country = response.data.lookupvalues;
					if ($scope.country.length > 0) {
						$scope.cselected = $scope.country[0];
						$scope.objregister.countryid = $scope.cselected.lkvalid;
					}
				}
			},
			function errorCallback(response) {
				Materialize.toast("Something has gone wrong!", 3000, "red");
			}
		);

		// Get alldistrict
		$scope.alldistrict = [];
		$http({
			method: "GET",
			headers: {
				Authorization: atoken,
			},
			url: api_url + "/lookupvalues?lkdmcode=DISTRC",
		}).then(
			function successCallback(response) {
				if ((response.status = 200)) {
					$scope.alldistrict = response.data.lookupvalues;
				}
			},
			function errorCallback(response) {
				Materialize.toast("Something has gone wrong!", 3000, "red");
			}
		);

		$scope.RadioChange = function (s) {
			alert(s);
			if (s == 1) {
				window.location = base_url + "register?skill=0";
			}
			if (s == 2) {
				window.location = base_url + "newmemberdep";
			}
			
		}; //

		$http({
			method: "GET",
			headers: {
				Authorization: atoken,
			},
			url: api_url + "/lookupvalues?lkdmcode=SKILL",
		}).then(
			function successCallback(response) {
				if ((response.status = 200)) {
					$scope.skills = response.data.lookupvalues;
					// if ($scope.skills.length > 0) {
					// 	$scope.cselected = $scope.country[0];
					// 	$scope.objregister.skills = $scope.cselected.lkvalid;
					// }
				}
			},
			function errorCallback(response) {
				Materialize.toast("Something has gone wrong!", 3000, "red");
			}
		);

		$scope.getDistrictDetails = function (regionid) {
			debugger;
			$scope.Taluks = [];
			$scope.districtDetails = [];
			angular.forEach($scope.regionDetails, function (region) {
				if (region.region_id == regionid) {
					$scope.districtDetails = region.district;
					return;
				}
			});
		}; // Get corps

		$scope.getTalukDetails = function (districtid) {
			debugger;
			$scope.Taluks = [];
			angular.forEach($scope.TalukDetails, function (taluk) {
				if (taluk.district_id == districtid) {
					$scope.Taluks.push(taluk);
					return;
				}
			});
		};

		$scope.searchmembers = function (texserno) {
			// alert(jobid)
			$http({
				url: base_url + "Member/checkmember_login/",
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
							window.location = base_url + "member/skilldevelopment";
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


		$scope.savedependent = function (datas) {
			//  alert('reaady');
			datas.memberid = $scope.memberids;
			datas.documentPath = $scope.imagename;

			datas.trainingRequired=JSON.stringify(JSON.stringify($scope.selectedskill))
			//	console.log(file);

			
						$http({
							url: api_url + "/adddependent",
							data: $.param(datas),
							headers: {
								"Content-Type": "application/x-www-form-urlencoded",
								Authorization: atoken,
							},
							method: "POST",
						}).success(function (response, result) {
							if ((result = 200)) {
								window.location = base_url + "member/dependency";
							}
						});
				
					

			// return;
		};

		$scope.saveskill = function (datas) {
			datas.memberid = $scope.memberids;

			$http({
				url: api_url + "/addSkillsMembers",
				data: $.param(datas),
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
					Authorization: atoken,
				},
				method: "POST",
			}).success(function (response, result) {
				if ((result = 200)) {
					Materialize.toast("Skill Saved Sucessfully", 3000, "green");
					$("#modal1").modal("close");
				}
			});
		};

		$scope.approvedependent = function (depid, status, type) {
			datas = {};
			datas.depid = depid;
			datas.status = status;
			datas.type = type;

			//alert(datas);
			$http({
				url: api_url + "/updatedepstatus",
				data: $.param(datas),
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
					Authorization: atoken,
				},
				method: "POST",
			}).success(function (response, result) {
				if ((result = 200)) {
					$scope.getDependent();
					Materialize.toast("Skill Saved Sucessfully", 3000, "green");
					$("#modal1").modal("close");
				}
			});
		};

		$scope.updateskill = function (datas) {
			//datas.memberid=$scope.memberids;

			console.log(datas);

			$http({
				url: api_url + "/updateSkillsMembers",
				data: $.param(datas),
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
					Authorization: atoken,
				},
				method: "POST",
			}).success(function (response, result) {
				if ((result = 200)) {
					Materialize.toast("Skill Updated Sucessfully", 3000, "green");
					$("#modal1").modal("close");
				}
			});
		};

		$scope.updatedependent = function (datas, file) {
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
						datas.documentPath = $scope.imagename;
						$scope.updatedependentsave(datas);
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
				$scope.updatedependentsave(datas);
			}

			// return;
		};

		$scope.getservicenoexist = function (serviceno) {
			$scope.servicenovalid = "";
			$("#failure").html("");
			$http({
				url: api_url + "/memberinfo?texserno=" + serviceno,
				data: $.param({
					texserno: serviceno,
				}),
				headers: {
					Authorization: atoken,
				},
				method: "GET",
			})
				.success(function (response, result) {
					if ((result = 200)) {
						$scope.servicenovalid = "Exist";
						$scope.DisableButton = false;
					}
				})
				.error(function (error) {});
		};



		$scope.comaddress = function(data) {
			debugger
			if (data.addressstatus == true) {
				$('#commaddress').addClass("active");
				angular.forEach($scope.taluk, function(taluk) {
					if (taluk.lkvalid == data.talukid) {
						$scope.ctaluk = taluk.description;
						return;
					}
				});
				angular.forEach($scope.alldistrict, function(district) {
					if (district.lkvalid == data.districtid) {
						$scope.cdistrict = district.description;
						return;
					}
				});
				angular.forEach($scope.state, function(state) {
					if (state.lkvalid == data.stateid) {
						$scope.cstate = state.description;
						return;
					}
				});
				angular.forEach($scope.country, function(country) {
					if (country.lkvalid == data.countryid) {
						$scope.ccountry = country.description;
						return;
					}
				});
					$scope.objregister.communicationaddress = ((data.address!= "" && data.address!= undefined)?data.address+"," :"")+((data.village!= ""&& data.address!= undefined)?data.village+",":"")+(($scope.ctaluk!= undefined && $scope.ctaluk!= "")?$scope.ctaluk+"," :"")+(($scope.cdistrict!= undefined && $scope.cdistrict!="")?$scope.cdistrict+",":"")+(($scope.cstate!= undefined && $scope.cstate!="")?$scope.cstate+"," :"")+(($scope.ccountry!= undefined && $scope.ccountry!= "")?$scope.ccountry:"");
					$scope.objmember.communicationaddress = ((data.address!= "" && data.address!= undefined)?data.address+"," :"")+((data.village!= ""&& data.address!= undefined)?data.village+",":"")+(($scope.ctaluk!= undefined && $scope.ctaluk!= "")?$scope.ctaluk+"," :"")+(($scope.cdistrict!= undefined && $scope.cdistrict!="")?$scope.cdistrict+",":"")+(($scope.cstate!= undefined && $scope.cstate!="")?$scope.cstate+"," :"")+(($scope.ccountry!= undefined && $scope.ccountry!= "")?$scope.ccountry:"");
					$scope.objprofile.communicationaddress = ((data.address!= "" && data.address!= undefined)?data.address+"," :"")+((data.village!= ""&& data.address!= undefined)?data.village+",":"")+(($scope.ctaluk!= undefined && $scope.ctaluk!= "")?$scope.ctaluk+"," :"")+(($scope.cdistrict!= undefined && $scope.cdistrict!="")?$scope.cdistrict+",":"")+(($scope.cstate!= undefined && $scope.cstate!="")?$scope.cstate+"," :"")+(($scope.ccountry!= undefined && $scope.ccountry!= "")?$scope.ccountry:"");
					return;
			} else {
				$('#commaddress').removeClass("active");
				$scope.objmember.communicationaddress = "";
				$scope.objregister.communicationaddress = "";
				$scope.objprofile.communicationaddress = "";
			}
		}

		$scope.savememberdep = function (data) {
			//  alert('reaady');
			//alert(data.agree);
			if (data.agree == undefined || data.agree == 0) {
				$scope.valshow = 0;
				return;
			}

			$scope.isDisabled = true;
			$scope.DisableButton = true;
			$http({
				url: api_url + "/dependent/adddepmembers",
				data: $.param(data),
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
					Authorization: atoken,
				},
				method: "POST",
			})
				.success(function (response, result) {
					if ((result = 200)) {
 					data.memberid =response.memberid;
					 data.documentPath = $scope.imagename;
					 data.trainingRequired=JSON.stringify(JSON.stringify($scope.selectedskill))
						$http({
							url: api_url + "/adddependent",
							data: $.param(data),
							headers: {
								"Content-Type": "application/x-www-form-urlencoded",
								Authorization: atoken,
							},
							method: "POST",
						}).success(function (response, result) {
							if ((result = 200)) {

								Materialize.toast("Employee saved Successfully !", 3000, "green");

						$scope.searchmembers(data.serviceno);
							}
						});
						
					}
				})
				.error(function (error) {
					$scope.isDisabled = false;
					$scope.DisableButton = false;
					//$('#failure').html(error);
					Materialize.toast(error, 3000, "red");
				});
		};

		$scope.updatedependentsave = function (datas) {
			datas.dependentId = $scope.depid;
			$http({
				url: api_url + "/editdependent",
				data: $.param(datas),
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
					Authorization: atoken,
				},
				method: "POST",
			}).success(function (response, result) {
				if ((result = 200)) {
					Materialize.toast("Dependent Saved Sucessfully", 3000, "green");
					$("#modal1").modal("close");
				}
			});
		};
		$scope.getDependent();
		$scope.getskillmember();
	}
);
