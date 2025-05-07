var app = angular.module('appadminattendance', ['ngTable', 'ui.bootstrap']);
app.controller('ctrladminattendance', function ($scope, $http, $filter, NgTableParams) {

	$scope.selectedprojects = [];
	$scope.attendancedetails = [];
	$scope.selected = {};
	$scope.objattendance = {};
	$scope.attendance = [];
	$scope.totaldays = 0;
	$scope.totalhours = 0;
	$scope.summaryatt = [];
	$scope.noOfDays = 0;
	$scope.loading = false;
	$scope.selectedMembers = [];
	$scope.savetype = 0;
	var win;
	$scope.TotalCount = 0;
	$scope.membersid = [];
	$scope.skipmembersid = [];
	$scope.skippedmembersid = [];
	$scope.TotalADDays = 0;
	$scope.TotalEDDays = 0;
	$scope.Indexcount = 0;
	$scope.memberdetailsview = [];
	var tdy = new Date();
	var date = tdy.getDate();
	$scope.TotalSelectedMembercount = 0;
	$scope.SaveDisable = true;
	$scope.isSubmitDisabled = false;
	$scope.adval = {};
	$scope.ed1val = {};
	$scope.ed2val = {};
	$scope.TotalNoDays = [];
	
	$scope.range = function(n) {
        return new Array(n);
	};

	if (date >= 27) {
		var edDate = "today";
		console.log("today " + date);
	} else {
		var stDate = new Date();
		var sttDate = new Date();
		stDate.setMonth(stDate.getMonth());
		sttDate.setMonth(stDate.getMonth() - 2);
		var edDate = stDate;
		var eddDate = sttDate;
	}

	$(document).ready(function () {
		$('.month_year').datepicker({
			format: 'MM yyyy',
			minViewMode: "months",
			autoClose: true,
			//endDate: edDate,
			//startDate: eddDate
		});
		$('.datepicker input').datepicker();

		$(".month_year").datepicker().on("changeDate", function (e) {
			$('.datepicker-dropdown').hide();
		});
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

	// Get Projects
	$scope.projects = [];
	$http({
		method: 'GET', 
		headers : {
			"Authorization" : atoken
		},
		url: api_url + "/client/project",
	}).then(function successCallback(response) {
		if (response.status = 200) {
			$scope.projects = response.data;
			console.log('$scope.projects', $scope.projects);
		}
	}, function errorCallback(response) {
		Materialize.toast('Something has gone wrong!', 3000, 'red');
	});

	// Get Attendance
	$http({
		method: 'GET', 
		headers : {
			"Authorization" : atoken
		},
		url: api_url + "/lookupvalues?lkdmcode=ATTEND",
	}).then(function successCallback(response) {
		if (response.status = 200) {
			$scope.attendance = response.data.lookupvalues;
			console.log('$scope.projects', $scope.projects);
		}
	}, function errorCallback(response) {
		Materialize.toast('Something has gone wrong!', 3000, 'red');
	});

	// Get Projects
	$scope.projectnos = [];
	$http({
		method: 'GET', 
		headers : {
			"Authorization" : atoken
		},
		url: api_url + "/prjectnos/byclientid?clientid=" + clientid,
	}).then(function successCallback(response) {
		console.log('response', response);
		if (response.status = 200) {
			$scope.projectnos = response.data;
		}
	}, function errorCallback(response) {
		Materialize.toast('Something has gone wrong!', 3000, 'red');
	});


	$scope.fillclientproject = function (projectid) {
		$scope.objattendance.monthandyear = "";

		$http({
			method: 'GET', 
			headers : {
				"Authorization" : atoken
			},
			url: api_url + "/jobposting/prjectnossearch/" + projectid,
		}).then(function successCallback(response) {

			if (response.status = 200) {
				$scope.projectnoss = response.data;

				$scope.objattendance.projectname = $scope.projectnoss[0].name;
				$scope.objattendance.projectno = $scope.projectnoss[0].projectno;
				$scope.objattendance.clientid = $scope.projectnoss[0].clientid;
				$scope.objattendance.projectid = $scope.projectnoss[0].projectid;
				console.log('response', $scope.objattendance.projectname);
			}

		}, function errorCallback(response) {
			Materialize.toast('Something has gone wrong!', 3000, 'red');
		});
	};

	//Load Selected Projects
	$scope.selectProject = function (clientid) {
		$scope.selectedprojects = [];
		var obj = {}
		for (obj of $scope.projects) {
			if (obj.clientid == clientid) {
				$scope.selectedprojects.push(obj);
				console.log(JSON.stringify($scope.selectedprojects))
			}
		}
	}

	$scope.getmembers = function (monthandyear, clientid, projectid) {
		$scope.memberdetails = [];
		$http({
			method: 'GET', 
			headers : {
				"Authorization" : atoken
			},
			url: api_url + "/client/attendancelist?clientid=" + clientid + "&projectid=" + projectid + "&monthandyear=" + monthandyear,
		}).then(function successCallback(response) {
			if (response.status = 200) {
				debugger
				if(response.data) {
					$scope.data = response.data.result;
					$scope.count = response.data.count;
				} else {
					$scope.data = [];
					$scope.count = 0;
				}
				if($scope.count) {
					$scope.TotalCount = $scope.count;
					$scope.tableParams = new NgTableParams({
						page: 1,
						count: response.data.result.length
					}, {
						data: $scope.data
					});
					$scope.memberdetails = response.data.result;  
					//console.log('$scope.memberdetails ',$scope.memberdetails );
				}
				else { 
					$scope.TotalCount = 0;
					$scope.tableParams = new NgTableParams({
						page: 1,
						count: 0
					}, {
						data: []
					});
					$scope.memberdetails = [];	
				}

				$scope.members = [];
				var obj = {}
				for (obj of $scope.memberdetails) {
					if (obj.projectid == projectid) {
						$scope.members.push(obj);
					}
				}
				$scope.loading = false;
				$scope.loadValue();
			} else {
				$scope.loading = false;
				Materialize.toast('error', 3000, 'red');
			}
		}, function errorCallback(response) {
			$scope.loading = false;
			Materialize.toast('error', 3000, 'red');
		});
	}

	$scope.confirmsave = function (objattendance, members, savetype, monthandyear, clientid, projectid, memberdetails) {
		debugger
		$scope.summaryatt = [];
		$scope.SaveDisable = false;
		var empcount = 0;
		var addays = 0;
		var ed1days = 0;
		var ed2days = 0;
		$scope.savetype = savetype;
		$scope.monthandyears = monthandyear;
		$scope.clientids = clientid;
		$scope.projectids = projectid;
		$scope.summaryatt = members;
		//console.log('memberdetails',memberdetails);
		$scope.memberdetailss = memberdetails;
		if (savetype == 2) {
			if (confirm("Are you sure to Submit the attendance? Once Submit the attendance you cannot change it again")) {
				$scope.tableParams1 = new NgTableParams({
					page: 1,
					count: $scope.summaryatt.length
				}, {
					data: $scope.summaryatt
				});
				for (var i = 0; i < members.length; i++) {
					addays += members[i].pdays;
					ed1days += members[i].od1Items;
					ed2days += members[i].od2Items;
					empcount = members.length;
				}
				$("#addays").text(addays);
				$("#ed1days").text(ed1days.toFixed(2));
				$("#ed2days").text(ed2days.toFixed(2));
				$("#adday").text(addays);
				$("#ed1day").text(ed1days.toFixed(2));
				$("#ed2day").text(ed2days.toFixed(2));
				$("#ttdays").text((Number(ed1days) + Number(ed2days) + Number(addays)).toFixed(2));
				$("#tttdays").text((Number(ed1days) + Number(ed2days) + Number(addays)).toFixed(2));
				$("#empcount").text(empcount);
				$('#modal1').modal('open');
			}
		} else {
			if($scope.summaryatt.length) {
				$scope.tableParams1 = new NgTableParams({
					page: 1,
					count: $scope.summaryatt.length
				}, {
					data: $scope.summaryatt
				});
				debugger
				for (var i = 0; i < members.length; i++) {
					addays += members[i].pdays;
					ed1days += members[i].od1Items;
					ed2days += members[i].od2Items;
					empcount = members.length;
				} 
				$("#addays").text(addays);
				$("#ed1days").text(ed1days.toFixed(2));
				$("#ed2days").text(ed2days.toFixed(2));
				$("#adday").text(addays);
				$("#ed1day").text(ed1days.toFixed(2));
				$("#ed2day").text(ed2days.toFixed(2));
				$("#ttdays").text((Number(ed1days) + Number(ed2days) + Number(addays)).toFixed(2));
				$("#tttdays").text((Number(ed1days) + Number(ed2days) + Number(addays)).toFixed(2));
				$("#empcount").text(empcount);
				$('#modal1').modal('open');
			} else {
				$scope.isSubmitDisabled = false;
				$scope.skipattendance(objattendance, savetype, monthandyear, clientid, projectid, memberdetails);
				// Materialize.toast('Atleast Select one person to submit the attendance', 3000, 'red');
			}
		}
	}

	$scope.skipattendance = function (objattendance, savetype, monthandyear, clientid, projectid, memberdetails) {
		$scope.loading = true;
		$scope.isSubmitDisabled = true;
		for (obj of memberdetails) {
			$scope.skippedmembersid.push(Number(obj.memberhistoryid));
			$scope.skipmembersid.push(obj.memberhistoryid);
		}
		$scope.memberdetails = [];
		$http({
			method: 'GET',
			url: api_url + "/client/attendancelistskip?clientid=" + clientid + "&projectid=" + projectid + "&monthandyear=" + monthandyear + "&skipmembersid=" + $scope.skipmembersid,	
			headers : {
				"Authorization" : atoken
			}
		}).success(function (response, result) {
			if (response.status = 200) {
				$scope.isSubmitDisabled = false;
				if ($scope.TotalCount == $scope.skippedmembersid.length) {
					$scope.Indexcount = 0;
					if($scope.skipmembersid.length == $scope.skippedmembersid.length) {
						$scope.loading = false;
						Materialize.toast('Attendance not submitted for this project', 3000, 'green');
						setTimeout(function () {
							window.location.reload(true);
						}, 2000);
					}
					else {
						$http({
							method: 'GET', 
							headers : {
								"Authorization" : atoken
							},
							url: api_url + "/client/attendancelistview?clientid=" + objattendance.clientid + "&projectid=" + objattendance.projectid + "&monthandyear=" + objattendance.monthandyear + "&memberid=" + $scope.skippedmembersid,
						}).then(function successCallback(response) {
							console.log('response', response);
							if (response.status = 200) {
								var data = response.data;
								$scope.tableParams2 = new NgTableParams({
									page: 1,
									count: response.data.length
								}, {
									data: data
								});
								debugger
								var addays = 0;
								var ed1days = 0;
								var empcount = 0;
								$scope.memberdetailsview = response.data;
								for (var i = 0; i < $scope.memberdetailsview.length; i++) {
									addays += $scope.memberdetailsview[i].pdays;
									ed1days += $scope.memberdetailsview[i].od1Items;
									empcount = $scope.memberdetailsview.length;
								}
								$("#addaysedit").text(addays);
								$("#ed1daysedit").text(ed1days);
								$("#addayedit").text(addays);
								$("#ed1dayedit").text(ed1days);
								$("#ttdaysedit").text(Number(ed1days) + Number(addays));
								$("#tttdaysedit").text(Number(ed1days) + Number(addays));
								$("#empcountedit").text(empcount);
							} else {
								$scope.loading = false;
								Materialize.toast('error', 3000, 'red');
							}
						}, function errorCallback(response) {
							$scope.loading = false;
							Materialize.toast('error', 3000, 'red');
						});
						setTimeout(function () {
							$scope.SaveDisabled = false;
							$('#modal2').modal('open');
						}, 3000);
					}
				} else {
					var data = response;
					$scope.memberdetails = [];
					$scope.tableParams = new NgTableParams({
						page: 1,
						count: response.length
					}, {
						data: data
					});
					$scope.Indexcount = $scope.skippedmembersid.length;
					$scope.memberdetails = response;
					$scope.members = [];
					var obj = {}
					for (obj of $scope.memberdetails) {
						if (obj.projectid == objattendance.projectid) {
							$scope.members.push(obj);
						}
					}
					$scope.loading = false;
					$scope.loadValue();
				}
			} else {
				$scope.isSubmitDisabled = false;
				$scope.loading = false;
				Materialize.toast('error', 3000, 'red');
			}
		}).error(function (error) {
			$scope.isSubmitDisabled = false;
			$('#failure').html(error);
		});
	}

	$scope.saveattendance = function (objattendance, members, savetype, monthandyears, clientids, projectids, memberdetailss) {
		$scope.SaveDisable = true;
		debugger
		$scope.duplicatememberid = [];
		$scope.duplicatetexcono = [];
		$scope.duplicatehistoryid = [];
		for (obj1 of memberdetailss) {
			$scope.skippedmembersid.push(Number(obj1.memberhistoryid));
			$scope.duplicatehistoryid.push(Number(obj1.memberhistoryid));
			$scope.duplicatetexcono.push(obj1.texcono);
			$scope.duplicatememberid.push(Number(obj1.memberid));
			var member = members.filter(x => x.memberhistoryid == Number(obj1.memberhistoryid));
			if(member.length == 0) {
				$scope.skipmembersid.push(obj1.memberhistoryid);
			}
		} 
		$http({
			method: 'POST',
			url: api_url + "/client/attendance",
			data: $.param({
				"clientid": objattendance.clientid,
				"projectid": objattendance.projectid,
				"members": members,
				"monthandyear": objattendance.monthandyear,
				"changedby": objattendance.changedby,
				"attendancetype": $scope.savetype,
				"membersid":$scope.duplicatememberid,
				"historyid":$scope.duplicatehistoryid,
				"texcono" : $scope.duplicatetexcono,
				"noofdays" : $scope.noOfDays
			}),
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded', 
				"Authorization" : atoken
			},
		}).success(function (response, result) {
			$scope.SaveDisable = true;
			$scope.model.SelectItems = 0;
			$('#SelectItems').prop('checked', false);
			$('.selectattendance').prop('checked', false);
			if (response.status = 200) {
				$scope.memberdetails = [];
				$scope.selectedMembers = [];
				Materialize.toast('Attendance Saved succsessfully', 4000, 'green') // 4000 is the duration of the toast
				setTimeout(function () {
					$scope.SaveDisable = true;
					$('#modal1').modal('close');
				}, 1500); 

				if ($scope.TotalCount == $scope.skippedmembersid.length) {
					$scope.Indexcount = 0;
					$http({
						method: 'GET', 
						headers : {
							"Authorization" : atoken
						},
						url: api_url + "/client/attendancelistview?clientid=" + objattendance.clientid + "&projectid=" + objattendance.projectid + "&monthandyear=" + objattendance.monthandyear + "&memberid=" + $scope.skippedmembersid,
					}).then(function successCallback(response) {
						$scope.isSubmitDisabled = false;
						// console.log('response', response);
						if (response.status = 200) {
							var data = response.data;
							$scope.tableParams2 = new NgTableParams({
								page: 1,
								count: response.data.length
							}, {
								data: data
							});
							debugger
							var addays = 0;
							var ed1days = 0;
							var empcount = 0;
							$scope.memberdetailsview = response.data;
							for (var i = 0; i < $scope.memberdetailsview.length; i++) {
								addays += $scope.memberdetailsview[i].pdays;
								ed1days += $scope.memberdetailsview[i].od1Items;
								empcount = $scope.memberdetailsview.length;
							}
							$("#addaysedit").text(addays);
							$("#ed1daysedit").text(ed1days);
							$("#addayedit").text(addays);
							$("#ed1dayedit").text(ed1days);
							$("#ttdaysedit").text(Number(ed1days) + Number(addays));
							$("#tttdaysedit").text(Number(ed1days) + Number(addays));
							$("#empcountedit").text(empcount);
						} else {
							$scope.isSubmitDisabled = false;
							$scope.loading = false;
							Materialize.toast('error', 3000, 'red');
						}
					}, function errorCallback(response) {
						$scope.loading = false;
						Materialize.toast('error', 3000, 'red');
					});
					setTimeout(function () {
						$scope.SaveDisabled = false;
						$('#modal2').modal('open');
					}, 3000);
				} else {
					$scope.SaveDisable = true;
					$('#modal1').modal('close');
					$http({
						method: 'GET', 
						headers : {
							"Authorization" : atoken
						},
						url: api_url + "/client/attendancelistskip?clientid=" + objattendance.clientid + "&projectid=" + objattendance.projectid + "&monthandyear=" + objattendance.monthandyear + "&skipmembersid=" + $scope.skipmembersid,
					}).then(function successCallback(response) {
						debugger 
						$scope.isSubmitDisabled = false;
						if (response.status = 200) {
							var data = response.data;
							$scope.tableParams = new NgTableParams({
								page: 1,
								count: response.data.length
							}, {
								data: data
							});
							$scope.Indexcount = $scope.skippedmembersid.length;
							$scope.memberdetails = response.data;
							$scope.members = [];
							var obj = {}
							for (obj of $scope.memberdetails) {
								if (obj.projectid == objattendance.projectid) {
									$scope.members.push(obj);
								}
							}
							$scope.loading = false;
							$scope.loadValue();
						} else {
							$scope.loading = false;
							Materialize.toast('error', 3000, 'red');
						}
					}, function errorCallback(response) {
						$scope.isSubmitDisabled = false;
						$scope.loading = false;
						Materialize.toast('error', 3000, 'red');
					});
				}
			} else {
				$scope.isSubmitDisabled = false;
				$('#failure').html(response);
			}
		}).error(function (error) {
			
			// array1 = $scope.duplicatehistoryid.filter(function(val) {
			// 	return $scope.skippedmembersid.indexOf(val) == -1;
			// });
			// $scope.skippedmembersid = [];
			// $scope.skippedmembersid = array1;
			$scope.isSubmitDisabled = false;
			$('#failure').html(error);
			setTimeout(() => {
				$scope.isSubmitDisabled = true;
				$('#failure').html('');
			}, 10000);	
			$scope.SaveDisable = true;
			$('#modal1').modal('close');
			Materialize.toast(error, 3000, 'red');
		});
	};

	$scope.attendanceapproved = function (objattendance, selectedMembers, savetype, monthandyears, clientids, projectids, memberdetailss, types) {
		if (types == 1) {
			$scope.SaveDisabled = true;
			win = window.open(base_url + "client/printreview?projectid=" + objattendance.projectid + "&monthandyear=" + objattendance.monthandyear, '_blank');
			setTimeout(() => {
				$scope.SaveDisabled = false;
				window.location.reload(true);
			}, 1500);
		} else {
			$scope.SaveDisabled = false;
			if (objattendance.projectid != 'undefined' && objattendance.monthandyear != 'undefined') {
				window.location.href = base_url + "client/editattendance?projectid=" + objattendance.projectid + "&monthandyear=" + objattendance.monthandyear+ "&etype=2";
			}; 
		}
	}

	$scope.editattendance = function (monthandyear, clientid, projectid) {
		debugger
		$scope.loading = true;
		var month = new Date(monthandyear);
		var sp = monthandyear.split(" ");
		var date = "05/" + sp[0] + "/" + sp[1];
		var nda = new Date(date);
		var perd = new Date(nda);
		$scope.noOfDays = daysInThisMonth(perd);
		$scope.Indexcount = 0;
		$scope.TotalNoDays = [];
		for(var i = 1;i <= $scope.noOfDays;i++){
			$scope.TotalNoDays.push(i);
		}
		$('#failure').html("");
		$scope.members = [];
		$scope.getmembers(monthandyear, clientid, projectid); 
	};

	$scope.editattendancess = function (monthandyear, clientid, projectid) {

		var sp = monthandyear.split(" ");
		var date = "05/" + sp[0] + "/" + sp[1];
		var nda = new Date(date);
		var perd = new Date(nda);
		$scope.noOfDays = daysInThisMonth(perd);

		$('#failure').html("");
		$scope.members = [];
		$http({
			method: 'GET', 
			headers : {
				"Authorization" : atoken
			},
			url: api_url + "/client/edit/editattendancedetails?projectid=" + projectid + "&monthandyear=" + monthandyear + "&clientid=" + clientid,
		}).then(function successCallback(response) {
			if (response.status = 200) {
				if (response.data.length != 0) {
					var data = response.data[0].members;
					$scope.tableParams = new NgTableParams({
						page: 1,
						count: data.length
					}, {
						data: data
					});

					$scope.memberdetails = response.data[0].members;
					$scope.members = response.data[0].members;

				} else {
					Materialize.toast('No records to edit attendance', 3000, 'red');
				}
			} else {
				Materialize.toast('error', 3000, 'red');
			}
		}, function errorCallback(response) {
			Materialize.toast('error', 3000, 'red');
		});
	};

	function daysInThisMonth(month) {
		var val = month.getMonth();
		var yea = month.getYear();
		var now = new Date(month);
		return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
	}

	$scope.model = {};
	$scope.model.SelectItems = false;
	$scope.fieldDisabled = true;

	/* Checkbox change functions start */

	$scope.changeFunctions = function (members) {
		$scope.TotalADDays = 0;
		if ($('#SelectItems').is(':checked')) {
			$scope.selectedMembers = [];
			var memberslist  = [];
			angular.forEach(members, function (member) {
				debugger
				a = {};
				b = {};
				var att = 0;
				var presentdays = 0;
				for(var k = 1; k <= $scope.noOfDays;k++) {
					a[k] = "1";
					b[k] = "0";
				} 
				var duplicatemember = members.filter(x => x.memberid === member.memberid);
				if (duplicatemember.length == 1 && member.prrdays == 0) {
					att = 1;
					member.adval[member.memberhistoryid] = a;
					presentdays = 27;
				} else { 
					memberslist.push(member.memerid);
					att = 0;
					member.adval[member.memberhistoryid] = b;
					presentdays = 0;
				}
				member.ed1val[member.memberhistoryid] = b;
				member.ed2val[member.memberhistoryid] = b;

				member.selectattendance = 1;
				member.adselect = att;
				member.ed1select = 0;
				member.ed2select = 0;

				member.one = att;
				member.two = att;
				member.three = att;
				member.four = att;
				member.five = att;
				member.six = att;
				member.seven = att;
				member.eight = att;
				member.nine = att;
				member.ten = att;
				member.eleven = att;
				member.twelve = att;
				member.thirteen = att;
				member.fourteen = att;
				member.fifteen = att;
				member.sixteen = att;
				member.seventeen = att;
				member.eighteen = att;
				member.nineteen = att;
				member.twenty = att;
				member.twentyone = att;
				member.twentytwo = att;
				member.twentythree = att;
				member.twentyfour = att;
				member.twentyfive = att;
				member.twentysix = att;
				member.twentyseven = att;

				member.valone = att;
				member.valtwo = att;
				member.valthree = att;
				member.valfour = att;
				member.valfive = att;
				member.valsix = att;
				member.valseven = att;
				member.valeight = att;
				member.valnine = att;
				member.valten = att;
				member.valeleven = att;
				member.valtwelve = att;
				member.valthirteen = att;
				member.valfourteen = att;
				member.valfifteen = att;
				member.valsixteen = att;
				member.valseventeen = att;
				member.valeighteen = att;
				member.valnineteen = att;
				member.valtwenty = att;
				member.valtwentyone = att;
				member.valtwentytwo = att;
				member.valtwentythree = att;
				member.valtwentyfour = att;
				member.valtwentyfive = att;
				member.valtwentysix = att;
				member.valtwentyseven = att;

				if ($scope.noOfDays >= 28) {
					member.twentyeight = att;
					member.valtwentyeight = att;
					if (duplicatemember.length == 1)
						presentdays = 28;
					if ($scope.noOfDays >= 29) {
						member.twentynine = att;
						member.valtwentynine = att;
						if (duplicatemember.length == 1)
							presentdays = 29;
						if ($scope.noOfDays >= 30) {
							if (duplicatemember.length == 1)
								presentdays = 30;
							member.thirty = att;
							member.valthirty = att;
							if ($scope.noOfDays >= 31) {
								if (duplicatemember.length == 1)
									presentdays = 31;
								member.thirtyone = att;
								member.valthirtyone = att;
							}
						}
					}
				}
				member.pdays = Number(presentdays);
				member.presentdays = Number(presentdays);
				member.od1Items = 0;
				member.od2Items = 0;
				member.othours = 0;
				$scope.selectedMembers.push(member);
			})
			if (memberslist.length > 1) {
				Materialize.toast('If attendance not selected, The person worked on more than one projects are category',10000,'orange')
			}
		} else {
			$scope.selectedMembers = [];
			angular.forEach(members, function (member) {

				a = {};
				b = {};
				for(var k = 1; k <= $scope.noOfDays;k++) {
					a[k] = "0";
					b[k] = "0";
				}
				member.adval[member.memberhistoryid] = a;
				member.ed1val[member.memberhistoryid] = b;
				member.ed2val[member.memberhistoryid] = b;

				member.selectattendance = 0;
				member.adselect = 0;
				member.ed1select = 0;
				member.ed2select = 0;
				member.one = 0;
				member.two = 0;
				member.three = 0;
				member.four = 0;
				member.five = 0;
				member.six = 0;
				member.seven = 0;
				member.eight = 0;
				member.nine = 0;
				member.ten = 0;
				member.eleven = 0;
				member.twelve = 0;
				member.thirteen = 0;
				member.fourteen = 0;
				member.fifteen = 0;
				member.sixteen = 0;
				member.seventeen = 0;
				member.eighteen = 0;
				member.nineteen = 0;
				member.twenty = 0;
				member.twentyone = 0;
				member.twentytwo = 0;
				member.twentythree = 0;
				member.twentyfour = 0;
				member.twentyfive = 0;
				member.twentysix = 0;
				member.twentyseven = 0;

				member.valone = 0;
				member.valtwo = 0;
				member.valthree = 0;
				member.valfour = 0;
				member.valfive = 0;
				member.valsix = 0;
				member.valseven = 0;
				member.valeight = 0;
				member.valnine = 0;
				member.valten = 0;
				member.valeleven = 0;
				member.valtwelve = 0;
				member.valthirteen = 0;
				member.valfourteen = 0;
				member.valfifteen = 0;
				member.valsixteen = 0;
				member.valseventeen = 0;
				member.valeighteen = 0;
				member.valnineteen = 0;
				member.valtwenty = 0;
				member.valtwentyone = 0;
				member.valtwentytwo = 0;
				member.valtwentythree = 0;
				member.valtwentyfour = 0;
				member.valtwentyfive = 0;
				member.valtwentysix = 0;
				member.valtwentyseven = 0;
				var presentdays = 0;
				if ($scope.noOfDays >= 28) {
					member.twentyeight = 0;
					member.valtwentyeight = 0;
					presentdays = 0;
					if ($scope.noOfDays >= 29) {
						member.twentynine = 0;
						member.valtwentynine = 0;
						presentdays = 0;
						if ($scope.noOfDays >= 30) {
							presentdays = 0;
							member.thirty = 0;
							member.valthirty = 0;
							if ($scope.noOfDays >= 31) {
								presentdays = 0;
								member.thirtyone = 0;
								member.valthirtyone = 0;
							}
						}
					}
				}
				member.pdays = 0;
				member.presentdays = 0;
				member.od1Items = 0;
				member.od2Items = 0;
				member.othours = 0;
				// $scope.selectedMembers.push(member);
			})
		}
		$scope.TotalADDays = 0;
		$scope.TotalEDDays = 0;
		angular.forEach(members, function (memb) {
			$scope.TotalADDays += Number(memb.pdays);
			$scope.TotalEDDays += Number(memb.od1Items);
			$scope.TotalEDDays += Number(memb.od2Items);
		});
	}

	$scope.AllchangeFunction = function (members, memberid, selectattendance,memberhistoryid) {
		debugger
		var member = members.filter(x => x.memberhistoryid === memberhistoryid); 
		var duplicatemember = members.filter(x => x.memberid === memberid);
		member = member[0];
		var duphisid = 0;
		if (duplicatemember.length > 1) {
			var memberlist = duplicatemember.filter(x => x.memberhistoryid != memberhistoryid);
			duphisid =  memberlist[0].memberhistoryid;
		}

		if (Number(member.memberhistoryid) == Number(memberhistoryid)) {

			if ((member.prrdays > 0 || member.dubdays > 0) && Number(selectattendance) == 1) {
				Materialize.toast('Attendance already entered for this person.Please select attendance manually', 6000, 'orange');
			} 

			if(Number(selectattendance) == 1 && member.prrdays == 0 && member.dubdays == 0) { 
				a = {};
				b = {};
				for(var k = 1; k <= $scope.noOfDays;k++) {
					a[k] = "1";
					b[k] = "0";
				}
				member.adval[member.memberhistoryid] = a;
				member.ed1val[member.memberhistoryid] = b;
				member.ed2val[member.memberhistoryid] = b;
				member.otval[member.memberhistoryid] = b;
				member.adselect = 1;
				member.ed1select = 0;
				member.ed2select = 0;
				
				member.one = 1;
				member.two = 1;
				member.three = 1;
				member.four = 1;
				member.five = 1;
				member.six = 1;
				member.seven = 1;
				member.eight = 1;
				member.nine = 1;
				member.ten = 1;
				member.eleven = 1;
				member.twelve = 1;
				member.thirteen = 1;
				member.fourteen = 1;
				member.fifteen = 1;
				member.sixteen = 1;
				member.seventeen = 1;
				member.eighteen = 1;
				member.nineteen = 1;
				member.twenty = 1;
				member.twentyone = 1;
				member.twentytwo = 1;
				member.twentythree = 1;
				member.twentyfour = 1;
				member.twentyfive = 1;
				member.twentysix = 1;
				member.twentyseven = 1;
				member.twentyeight = 1;

				member.valone = 1;
				member.valtwo = 1;
				member.valthree = 1;
				member.valfour = 1;
				member.valfive = 1;
				member.valsix = 1;
				member.valseven = 1;
				member.valeight = 1;
				member.valnine = 1;
				member.valten = 1;
				member.valeleven = 1;
				member.valtwelve = 1;
				member.valthirteen = 1;
				member.valfourteen = 1;
				member.valfifteen = 1;
				member.valsixteen = 1;
				member.valseventeen = 1;
				member.valeighteen = 1;
				member.valnineteen = 1;
				member.valtwenty = 1;
				member.valtwentyone = 1;
				member.valtwentytwo = 1;
				member.valtwentythree = 1;
				member.valtwentyfour = 1;
				member.valtwentyfive = 1;
				member.valtwentysix = 1;
				member.valtwentyseven = 1;
				member.valtwentyeight = 1;
				var presentdays = 28;
				if ($scope.noOfDays >= 31) {
					member.twentynine = 1;
					member.valtwentynine = 1;
					member.thirty = 1;
					member.valthirty = 1;
					member.thirtyone = 1;
					member.valthirtyone = 1;
					presentdays = 31;
				} else if ($scope.noOfDays >= 30) {
					member.twentynine = 1;
					member.valtwentynine = 1;
					member.thirty = 1;
					member.valthirty = 1;
					presentdays = 30;
				} else if ($scope.noOfDays >= 29) {
					member.twentynine = 1;
					member.valtwentynine = 1;
					presentdays = 29;
				} 
				if (duphisid > 0) {
					objIndex = members.findIndex((obj => obj.memberhistoryid == duphisid));
					members[objIndex].dubdays =  Number($scope.noOfDays);
				} 
				if(member.prrdays > 0 && member.dubdays > 0) {
					member.prrdays = Number(member.prrdays) + Number($scope.noOfDays);
				} else {
					member.prrdays = Number(member.prrdays);
				}
				
				member.pdays = Number(presentdays);
				member.presentdays = Number(presentdays);
				member.od1Items = 0;
				member.od2Items = 0;
				member.othours = 0;
				$scope.TotalADDays = 0;
				$scope.TotalEDDays = 0;
				angular.forEach(members, function (memb) {
					$scope.TotalADDays += Number(memb.pdays);
					$scope.TotalEDDays += Number(memb.od1Items);
					$scope.TotalEDDays += Number(memb.od2Items);
				});

			} else if (Number(selectattendance) == 1 && (member.prrdays > 0 || member.dubdays > 0)) {
				member.adselect = 0;
				member.ed1select = 0;
				member.ed2select = 0;
				a = {};
				b = {};
				for(var k = 1; k <= $scope.noOfDays;k++) {
					a[k] = "0";
					b[k] = "0";
				}
				member.adval[member.memberhistoryid] = a;
				member.ed1val[member.memberhistoryid] = b;
				member.ed2val[member.memberhistoryid] = b;
				member.otval[member.memberhistoryid] = b;
				member.one = 0;
				member.two = 0;
				member.three = 0;
				member.four = 0;
				member.five = 0;
				member.six = 0;
				member.seven = 0;
				member.eight = 0;
				member.nine = 0;
				member.ten = 0;
				member.eleven = 0;
				member.twelve = 0;
				member.thirteen = 0;
				member.fourteen = 0;
				member.fifteen = 0;
				member.sixteen = 0;
				member.seventeen = 0;
				member.eighteen = 0;
				member.nineteen = 0;
				member.twenty = 0;
				member.twentyone = 0;
				member.twentytwo = 0;
				member.twentythree = 0;
				member.twentyfour = 0;
				member.twentyfive = 0;
				member.twentysix = 0;
				member.twentyseven = 0;
				member.twentyeight = 0;
				member.twentynine = 0;
				member.thirty = 0;
				member.thirtyone = 0;
				member.valone = 0;
				member.valtwo = 0;
				member.valthree = 0;
				member.valfour = 0;
				member.valfive = 0;
				member.valsix = 0;
				member.valseven = 0;
				member.valeight = 0;
				member.valnine = 0;
				member.valten = 0;
				member.valeleven = 0;
				member.valtwelve = 0;
				member.valthirteen = 0;
				member.valfourteen = 0;
				member.valfifteen = 0;
				member.valsixteen = 0;
				member.valseventeen = 0;
				member.valeighteen = 0;
				member.valnineteen = 0;
				member.valtwenty = 0;
				member.valtwentyone = 0;
				member.valtwentytwo = 0;
				member.valtwentythree = 0;
				member.valtwentyfour = 0;
				member.valtwentyfive = 0;
				member.valtwentysix = 0;
				member.valtwentyseven = 0;
				member.valtwentyeight = 0;
				member.valtwentynine = 0;
				member.valthirty = 0;
				member.valthirtyone = 0;
				member.pdays = 0;
				member.presentdays = 0;  

				if (duphisid > 0) {
					objIndex = members.findIndex((obj => obj.memberhistoryid == duphisid));
					members[objIndex].dubdays =  0;
				} 
				if(member.prrdays == 0) {
					member.prrdays = 0;
				} else {
					member.prrdays = Number(member.prrdays);
				}
				
				member.od1Items = 0;
				member.od2Items = 0;
				member.othours = 0;
				$scope.TotalADDays = 0;
				$scope.TotalEDDays = 0;
				angular.forEach(members, function (memb) {
					$scope.TotalADDays += Number(memb.pdays);
					$scope.TotalEDDays += Number(memb.od1Items);
					$scope.TotalEDDays += Number(memb.od2Items);
				});
				//var index = $scope.selectedMembers.indexOf(member);
				//$scope.selectedMembers.splice(index, 1);
			} else {
				member.adselect = 0;
				member.ed1select = 0;
				member.ed2select = 0;
				a = {};
				b = {};
				for(var k = 1; k <= $scope.noOfDays;k++) {
					a[k] = "0";
					b[k] = "0";
				}
				member.adval[member.memberhistoryid] = a;
				member.ed1val[member.memberhistoryid] = b;
				member.ed2val[member.memberhistoryid] = b;
				member.otval[member.memberhistoryid] = b;
				member.one = 0;
				member.two = 0;
				member.three = 0;
				member.four = 0;
				member.five = 0;
				member.six = 0;
				member.seven = 0;
				member.eight = 0;
				member.nine = 0;
				member.ten = 0;
				member.eleven = 0;
				member.twelve = 0;
				member.thirteen = 0;
				member.fourteen = 0;
				member.fifteen = 0;
				member.sixteen = 0;
				member.seventeen = 0;
				member.eighteen = 0;
				member.nineteen = 0;
				member.twenty = 0;
				member.twentyone = 0;
				member.twentytwo = 0;
				member.twentythree = 0;
				member.twentyfour = 0;
				member.twentyfive = 0;
				member.twentysix = 0;
				member.twentyseven = 0;
				member.twentyeight = 0;
				member.twentynine = 0;
				member.thirty = 0;
				member.thirtyone = 0;
				member.valone = 0;
				member.valtwo = 0;
				member.valthree = 0;
				member.valfour = 0;
				member.valfive = 0;
				member.valsix = 0;
				member.valseven = 0;
				member.valeight = 0;
				member.valnine = 0;
				member.valten = 0;
				member.valeleven = 0;
				member.valtwelve = 0;
				member.valthirteen = 0;
				member.valfourteen = 0;
				member.valfifteen = 0;
				member.valsixteen = 0;
				member.valseventeen = 0;
				member.valeighteen = 0;
				member.valnineteen = 0;
				member.valtwenty = 0;
				member.valtwentyone = 0;
				member.valtwentytwo = 0;
				member.valtwentythree = 0;
				member.valtwentyfour = 0;
				member.valtwentyfive = 0;
				member.valtwentysix = 0;
				member.valtwentyseven = 0;
				member.valtwentyeight = 0;
				member.valtwentynine = 0;
				member.valthirty = 0;
				member.valthirtyone = 0;
				member.pdays = 0;
				member.presentdays = 0;  

				if (duphisid > 0) {
					objIndex = members.findIndex((obj => obj.memberhistoryid == duphisid));
					members[objIndex].dubdays =  0;
				} 
				if(member.prrdays > 0) {
					member.prrdays = Number(member.prrdays) - Number($scope.noOfDays);
				} else {
					member.prrdays = 0;
				}
				
				member.od1Items = 0;
				member.od2Items = 0;
				member.othours = 0;
				$scope.TotalADDays = 0;
				$scope.TotalEDDays = 0;
				angular.forEach(members, function (memb) {
					$scope.TotalADDays += Number(memb.pdays);
					$scope.TotalEDDays += Number(memb.od1Items);
					$scope.TotalEDDays += Number(memb.od2Items);
				});
				var index = $scope.selectedMembers.indexOf(member);
				$scope.selectedMembers.splice(index, 1);
			} 

			if(Number(selectattendance) == 1) {
				$scope.selectedMembers.push(member);
			}
		}
		if ($scope.TotalCount == $scope.selectedMembers.length) {
			$('#SelectItems').prop('checked', true);
		}  else {
			$('#SelectItems').prop('checked', false);
		}
	}

	$scope.adSelectChange = function (members, adselected, memberid, selectattendance,memberhistoryid) {
		debugger
		var member = members.filter(x => x.memberhistoryid === memberhistoryid);
		var duplicatemember = members.filter(x => x.memberid === memberid);
		member = member[0];
		var duphisid = 0;
		if (duplicatemember.length > 1) {
			var memberlist = duplicatemember.filter(x => x.memberhistoryid != memberhistoryid);
			duphisid =  memberlist[0].memberhistoryid;
		}
		var od1Items = 0;
		var od2Items = 0;
		if (Number(selectattendance) == 1 && Number(member.memberhistoryid) == Number(memberhistoryid)) {
			if (Number(adselected) == 1  && member.prrdays == 0 && member.dubdays == 0) {

				if (member.prrdays > 0 || member.dubdays > 0) {
					Materialize.toast('Attendance already entered for this person.Please select attendance manually', 6000, 'orange');
				} 

				member.adselect = 1;
				member.ed1select = 0;
				member.ed2select = 0;
				a = {};
				b = {};
				for(var k = 1; k <= $scope.noOfDays;k++) {
					b[k] = "0";
					a[k] = "1";
				}
				member.adval[member.memberhistoryid] = a;
				member.ed1val[member.memberhistoryid] = b;
				member.ed2val[member.memberhistoryid] = b;
				member.one = 1;
				member.two = 1;
				member.three = 1;
				member.four = 1;
				member.five = 1;
				member.six = 1;
				member.seven = 1;
				member.eight = 1;
				member.nine = 1;
				member.ten = 1;
				member.eleven = 1;
				member.twelve = 1;
				member.thirteen = 1;
				member.fourteen = 1;
				member.fifteen = 1;
				member.sixteen = 1;
				member.seventeen = 1;
				member.eighteen = 1;
				member.nineteen = 1;
				member.twenty = 1;
				member.twentyone = 1;
				member.twentytwo = 1;
				member.twentythree = 1;
				member.twentyfour = 1;
				member.twentyfive = 1;
				member.twentysix = 1;
				member.twentyseven = 1;
				member.twentyeight = 1;

				member.valone = 1;
				member.valtwo = 1;
				member.valthree = 1;
				member.valfour = 1;
				member.valfive = 1;
				member.valsix = 1;
				member.valseven = 1;
				member.valeight = 1;
				member.valnine = 1;
				member.valten = 1;
				member.valeleven = 1;
				member.valtwelve = 1;
				member.valthirteen = 1;
				member.valfourteen = 1;
				member.valfifteen = 1;
				member.valsixteen = 1;
				member.valseventeen = 1;
				member.valeighteen = 1;
				member.valnineteen = 1;
				member.valtwenty = 1;
				member.valtwentyone = 1;
				member.valtwentytwo = 1;
				member.valtwentythree = 1;
				member.valtwentyfour = 1;
				member.valtwentyfive = 1;
				member.valtwentysix = 1;
				member.valtwentyseven = 1;
				member.valtwentyeight = 1;

				var presentdays = 28;
				if ($scope.noOfDays >= 29) {
					presentdays = 29;
					member.valtwentynine = 1;
					member.twentynine = 1;
					if ($scope.noOfDays >= 30) {
						presentdays = 30;
						member.thirty = 1;
						member.valthirty = 1;
						if ($scope.noOfDays >= 31) {
							member.thirtyone = 1;
							member.valthirtyone = 1;
							presentdays = 31;
						}
					}
				} 

				if (duphisid > 0) {
					objIndex = members.findIndex((obj => obj.memberhistoryid == duphisid));
					members[objIndex].dubdays =  Number($scope.noOfDays);
				} 
				if(member.prrdays > 0) {
					member.prrdays = Number(member.prrdays) + Number($scope.noOfDays);
				} else {
					member.prrdays = Number(member.prrdays);
				}

				od1Items = 0;
				od2Items = 0;
				member.pdays = Number(presentdays);
				member.presentdays = Number(presentdays);
				member.od1Items = od1Items;
				member.od2Items = od2Items;
				$scope.TotalADDays = 0;
				$scope.TotalEDDays = 0;
				angular.forEach(members, function (memb) {
					$scope.TotalADDays += Number(memb.pdays);
					$scope.TotalEDDays += Number(memb.od1Items);
					$scope.TotalEDDays += Number(memb.od2Items);
				});
			} else {

				a = {};
				b = {};
				for(var k = 1; k <= $scope.noOfDays;k++) {
					a[k] = "0";
					b[k] = "0";
				}
				member.adval[member.memberhistoryid] = a;
				member.ed1val[member.memberhistoryid] = b;
				member.ed2val[member.memberhistoryid] = b;
				member.otval[member.memberhistoryid] = a;

				member.adselect = 0;
				member.ed1select = 0;
				member.ed2select = 0;

				member.one = 0;
				member.two = 0;
				member.three = 0;
				member.four = 0;
				member.five = 0;
				member.six = 0;
				member.seven = 0;
				member.eight = 0;
				member.nine = 0;
				member.ten = 0;
				member.eleven = 0;
				member.twelve = 0;
				member.thirteen = 0;
				member.fourteen = 0;
				member.fifteen = 0;
				member.sixteen = 0;
				member.seventeen = 0;
				member.eighteen = 0;
				member.nineteen = 0;
				member.twenty = 0;
				member.twentyone = 0;
				member.twentytwo = 0;
				member.twentythree = 0;
				member.twentyfour = 0;
				member.twentyfive = 0;
				member.twentysix = 0;
				member.twentyseven = 0;
				member.twentyeight = 0;
				member.valone = 0;
				member.valtwo = 0;
				member.valthree = 0;
				member.valfour = 0;
				member.valfive = 0;
				member.valsix = 0;
				member.valseven = 0;
				member.valeight = 0;
				member.valnine = 0;
				member.valten = 0;
				member.valeleven = 0;
				member.valtwelve = 0;
				member.valthirteen = 0;
				member.valfourteen = 0;
				member.valfifteen = 0;
				member.valsixteen = 0;
				member.valseventeen = 0;
				member.valeighteen = 0;
				member.valnineteen = 0;
				member.valtwenty = 0;
				member.valtwentyone = 0;
				member.valtwentytwo = 0;
				member.valtwentythree = 0;
				member.valtwentyfour = 0;
				member.valtwentyfive = 0;
				member.valtwentysix = 0;
				member.valtwentyseven = 0;
				member.valtwentyeight = 0;
				var presentdays = 28;
				if ($scope.noOfDays >= 29) {
					presentdays = 29;
					member.valtwentynine = 0;
					member.twentynine = 0;
					if ($scope.noOfDays >= 30) {
						presentdays = 30;
						member.thirty = 0;
						member.valthirty = 0;
						if ($scope.noOfDays >= 31) {
							member.thirtyone = 0;
							member.valthirtyone = 0;
							presentdays = 31;
						}
					}
				} 
				od1Items = 0;
				od2Items = 0;
				member.od1Items = od1Items;
				member.od2Items = od2Items;
				member.presentdays = 0;
				member.pdays = 0;
				$scope.TotalADDays = 0;
				$scope.TotalEDDays = 0; 

				if (duphisid > 0) {
					objIndex = members.findIndex((obj => obj.memberhistoryid == duphisid));
					members[objIndex].dubdays =  0;
				} 
				if(member.prrdays > 0) {
					member.prrdays = Number(member.prrdays) - Number($scope.noOfDays);
				} else {
					member.prrdays = 0;
				}

				angular.forEach(members, function (memb) {
					$scope.TotalADDays += Number(memb.pdays);
					$scope.TotalEDDays += Number(memb.od1Items);
					$scope.TotalEDDays += Number(memb.od2Items);
				});
			}
		}
	}

	$scope.ed1SelectChange = function (members, edselect, memberid, selectattendance, memberhistoryid) {
		debugger
		var od1Items = 0;
		var od2Items = 0;
		var member = members.filter(x => x.memberhistoryid === memberhistoryid);
		member = member[0];
		if (Number(selectattendance) == 1 && Number(member.memberhistoryid) == Number(memberhistoryid)) {
			if (Number(edselect) == 1) {
				member.ed1select = 1;
				//member.ed2select = 0;
				
				a = {};
				b = {};

				for(var k = 1; k <= $scope.noOfDays;k++) {
					
					if(Number(member.adval[member.memberhistoryid][k]) == 1) {
						a[k] = "1";
						od1Items += 1;
						if(member.ed2select ==1)
							{
							b[k] = "0.5";
							od2Items += .5;
							}
							else{
								b[k] = "0";
							}

					} else {
						a[k] = "0";	
						b[k] = "0";
					}

					
				}

				member.ed1val[member.memberhistoryid] = a;
				///member.ed2val[member.memberhistoryid] = b;

				if(member.valone == 1)
					member.valone = 2;
					else if(member.valone == 1.5)
					member.valone = 2.5;
				else if(member.valone == 0)
					member.valone = 0;

				if(member.valtwo == 1)
					member.valtwo = 2;
					else if(member.valtwo == 1.5)
					member.valtwo = 2.5;
				else if(member.valtwo == 0)
					member.valtwo = 0;

				if(member.valthree == 1)
					member.valthree = 2;
					else if(member.valthree == 1.5)
					member.valthree = 2.5;
				else if(member.valthree == 0)
					member.valthree = 0;

				if(member.valfour == 1)
					member.valfour = 2;
					else if(member.valfour == 1.5)
					member.valfour = 2.5;
				else if(member.valfour == 0)
					member.valfour = 0;

				if(member.valfive == 1)
					member.valfive = 2;
					else if(member.valfive == 1.5)
					member.valfive = 2.5;
				else if(member.valfive == 0)
					member.valfive = 0;
					
				if(member.valsix == 1)
					member.valsix = 2;
					else if(member.valsix == 1.5)
					member.valsix = 2.5;
				else if(member.valsix == 0)
					member.valsix = 0;	
				
				if(member.valseven == 1)
					member.valseven = 2;
					else if(member.valseven == 1.5)
					member.valseven = 2.5;
				else if(member.valseven == 0)
					member.valseven = 0;
				
				if(member.valeight == 1)
					member.valeight = 2;
					else if(member.valeight == 1.5)
					member.valeight = 2.5;
				else if(member.valeight == 0)
					member.valeight = 0;
				
				if(member.valnine == 1)
					member.valnine = 2;
					else if(member.valnine == 1.5)
					member.valnine = 2.5;
				else if(member.valnine == 0)
					member.valnine = 0;
			
				if(member.valten == 1)
					member.valten = 2;
					else if(member.valten == 1.5)
					member.valten = 2.5;
				else if(member.valten == 0)
					member.valten = 0;

				if(member.valeleven == 1)
					member.valeleven = 2;
					else if(member.valeleven == 1.5)
					member.valeleven = 2.5;
				else if(member.valeleven == 0)
					member.valeleven = 0;
					
				if(member.valtwelve == 1)
					member.valtwelve = 2;
					else if(member.valtwelve == 1.5)
					member.valtwelve = 2.5;
				else if(member.valtwelve == 0)
					member.valtwelve = 0;

				if(member.valthirteen == 1)
					member.valthirteen = 2;
					else if(member.valthirteen == 1.5)
					member.valthirteen = 2.5;
				else if(member.valthirteen == 0)
					member.valthirteen = 0;	
					
				if(member.valfourteen == 1)
					member.valfourteen = 2;
					else if(member.valfourteen == 1.5)
					member.valfourteen = 2.5;
				else if(member.valfourteen == 0)
					member.valfourteen = 0;	

				if(member.valfifteen == 1)
					member.valfifteen = 2;
					else if(member.valfifteen == 1.5)
					member.valfifteen = 2.5;
				else if(member.valfifteen == 0)
					member.valfifteen = 0;
					
				if(member.valsixteen == 1)
					member.valsixteen = 2;
					else if(member.valsixteen == 1.5)
					member.valsixteen = 2.5;
				else if(member.valsixteen == 0)
					member.valsixteen = 0;

				if(member.valseventeen == 1)
					member.valseventeen = 2;
					else if(member.valseventeen == 1.5)
					member.valseventeen = 2.5;
				else if(member.valseventeen == 0)
					member.valseventeen = 0;

				if(member.valeighteen == 1)
					member.valeighteen = 2;
					else if(member.valeighteen == 1.5)
					member.valeighteen = 2.5;
				else if(member.valeighteen == 0)
					member.valeighteen = 0;

				if(member.valnineteen == 1)
					member.valnineteen = 2;
					else if(member.valnineteen == 1.5)
					member.valnineteen = 2.5;
				else if(member.valnineteen == 0)
					member.valnineteen = 0;
				
				if(member.valtwenty == 1)
					member.valtwenty = 2;
					else if(member.valtwenty == 1.5)
					member.valtwenty = 2.5;
				else if(member.valtwenty == 0)
					member.valtwenty = 0;

				if(member.valtwentyone == 1)
					member.valtwentyone = 2;
					else if(member.valtwentyone == 1.5)
					member.valtwentyone = 2.5;
				else if(member.valtwentyone == 0)
					member.valtwentyone = 0;
				
				if(member.valtwentytwo == 1)
					member.valtwentytwo = 2;
					else if(member.valtwentytwo == 1.5)
					member.valtwentytwo = 2.5;
				else if(member.valtwentytwo == 0)
					member.valtwentytwo = 0;

				if(member.valtwentythree == 1)
					member.valtwentythree = 2;
					else if(member.valtwentythree == 1.5)
					member.valtwentythree = 2.5;
				else if(member.valtwentythree == 0)
					member.valtwentythree = 0;

				if(member.valtwentyfour == 1)
					member.valtwentyfour = 2;
					else if(member.valtwentyfour == 1.5)
					member.valtwentyfour = 2.5;
				else if(member.valtwentyfour == 0)
					member.valtwentyfour = 0;

				if(member.valtwentyfive == 1)
					member.valtwentyfive = 2;
					else if(member.valtwentyfive == 1.5)
					member.valtwentyfive = 2.5;
				else if(member.valtwentyfive == 0)
					member.valtwentyfive = 0;

				if(member.valtwentysix == 1)
					member.valtwentysix = 2;
					else if(member.valtwentysix == 1.5)
					member.valtwentysix = 2.5;
				else if(member.valtwentysix == 0)
					member.valtwentysix = 0;

				if(member.valtwentyseven == 1)
					member.valtwentyseven = 2;
					else if(member.valtwentyseven == 1.5)
					member.valtwentyseven = 2.5;
				else if(member.valtwentyseven == 0)
					member.valtwentyseven = 0;

				if(member.valtwentyeight == 1)
					member.valtwentyeight = 2;
					else if(member.valtwentyeight == 1.5)
					member.valtwentyeight = 2.5;
				else if(member.valtwentyeight == 0)
					member.valtwentyeight = 0;

				if ($scope.noOfDays >= 29) {
					if(member.valtwentynine == 1)
						member.valtwentynine = 2;
						else if(member.valtwentynine == 1.5)
					member.valtwentynine = 2.5;
					else if(member.valtwentynine == 0)
						member.valtwentynine = 0;

					if ($scope.noOfDays >= 30) {
						if(member.valthirty == 1)
							member.valthirty = 2;
							else if(member.valthirty == 1.5)
							member.valthirty = 2.5;
						else if(member.valthirty == 0)
							member.valthirty = 0;
						if ($scope.noOfDays >= 30) {
							if(member.valthirtyone == 1)
								member.valthirtyone = 2;
								else if(member.valtwo == 1.5)
								member.valtwo = 2.5;
							else if(member.valthirtyone == 0)
								member.valthirtyone = 0;
						}
					}
				}

				member.od1Items = od1Items;
				member.od2Items = od2Items;

				$scope.TotalADDays = 0;
				$scope.TotalEDDays = 0;
				angular.forEach(members, function (memb) {
					$scope.TotalADDays += Number(memb.pdays);
					$scope.TotalEDDays += Number(memb.od1Items);
					$scope.TotalEDDays += Number(memb.od2Items);
				});

			} else {
				member.ed1select = 0;
				//member.ed2select = 0;		
				
				a = {};
				b = {};
				for(var k = 1; k <= $scope.noOfDays;k++) {
					
							a[k] = "0";	
							if(member.ed2select ==1)
									{
									b[k] = "0.5";
									od2Items += .5;
									}
									else{
										b[k] = "0";
									}
				
				}
				member.ed1val[member.memberhistoryid] = a;
				
				//member.ed2val[member.memberhistoryid] = b;
//console.log(member)

				if(member.valone == 2)
					member.valone = 1;
					else if(member.valone == 2.5)
					member.valone = 1.5; 

				if(member.valtwo == 2)
					member.valtwo = 1;
					else if(member.valtwo == 2.5)
					member.valtwo = 1.5; 

				if(member.valthree == 2)
					member.valthree = 1;
					else if(member.valthree == 2.5)
					member.valthree = 1.5; 

				if(member.valfour == 2)
					member.valfour = 1;
					else if(member.valfour == 2.5)
					member.valfour = 1.5; 


				if(member.valfive == 2)
					member.valfive = 1;
					else if(member.valfive == 2.5)
					member.valfive = 1.5;

				if(member.valsix == 2)
					member.valsix = 1;
					else if(member.valsix == 2.5)
					member.valsix = 1.5;

				if(member.valseven == 2)
					member.valseven = 1;
					else if(member.valseven == 2.5)
					member.valseven = 1.5;

				if(member.valeight == 2)
					member.valeight = 1;
					else if(member.valeight == 2.5)
					member.valeight = 1.5;
				
				if(member.valnine == 2)
					member.valnine = 1;
					else if(member.valnine == 2.5)
					member.valnine = 1.5;

				if(member.valten == 2)
					member.valten = 1;
					else if(member.valten == 2.5)
					member.valten = 1.5;

				if(member.valeleven == 2)
					member.valeleven = 1;
					else if(member.valeleven == 2.5)
					member.valeleven = 1.5;

				if(member.valtwelve == 2)
					member.valtwelve = 1;
					else if(member.valtwelve == 2.5)
					member.valtwelve = 1.5;

				if(member.valthirteen == 2)
					member.valthirteen = 1;
					else if(member.valthirteen == 2.5)
					member.valthirteen = 1.5;

				if(member.valfourteen == 2)
					member.valfourteen = 1;
					else if(member.valfourteen == 2.5)
					member.valfourteen = 1.5;
					
				if(member.valfifteen == 2)
					member.valfifteen = 1;
					else if(member.valfifteen == 2.5)
					member.valfifteen = 1.5;

				if(member.valsixteen == 2)
					member.valsixteen = 1;
					else if(member.valsixteen == 2.5)
					member.valsixteen = 1.5;
				
					if(member.valseventeen == 2)
					member.valseventeen = 1;
					else if(member.valseventeen == 2.5)
					member.valseventeen = 1.5;

				if(member.valeighteen == 2)
					member.valeighteen = 1;
					else if(member.valeighteen == 2.5)
					member.valeighteen = 1.5;

				if(member.valnineteen == 2)
					member.valnineteen = 1;
					else if(member.valnineteen == 2.5)
					member.valnineteen = 1.5;

				if(member.valtwenty == 2)
					member.valtwenty = 1;
					else if(member.valtwenty == 2.5)
					member.valtwenty = 1.5;
				
				
				if(member.valtwentyone == 2)
					member.valtwentyone = 1;
					else if(member.valtwentyone == 2.5)
					member.valtwentyone = 1.5;

				if(member.valtwentytwo == 2)
					member.valtwentytwo = 1;
					else if(member.valtwentytwo == 2.5)
					member.valtwentytwo = 1.5;

				
				
				if(member.valtwentythree == 2)
					member.valtwentythree = 1;
					else if(member.valtwentythree == 2.5)
					member.valtwentythree = 1.5;

				if(member.valtwentyfour == 2)
					member.valtwentyfour = 1;
					else if(member.valtwentyfour == 2.5)
					member.valtwentyfour = 1.5;

				if(member.valtwentyfive == 2)
					member.valtwentyfive = 1;
					else if(member.valtwentyfive == 2.5)
					member.valtwentyfive = 1.5;

				if(member.valtwentysix == 2)
					member.valtwentysix = 1;
					else if(member.valtwentysix == 2.5)
					member.valtwentysix = 1.5;

				if(member.valtwentyseven == 2)
					member.valtwentyseven = 1;
					else if(member.valtwentyseven == 2.5)
					member.valtwentyseven = 1.5;

				if(member.valtwentyeight == 2)
					member.valtwentyeight = 1;
					else if(member.valtwentyeight == 2.5)
					member.valtwentyeight = 1.5;
		
				

				if ($scope.noOfDays >= 29) {
					if(member.valtwentynine == 2)
					member.valtwentynine = 1;
					else if(member.valtwentynine == 2.5)
					member.valtwentynine = 1.5;

					

					if ($scope.noOfDays >= 30) {
						

					if(member.valthirty == 2)
					member.valthirty = 1;
					else if(member.valthirty == 2.5)
					member.valthirty = 1.5;


						if ($scope.noOfDays >= 30) {
							if(member.valthirtyone == 2)
					member.valthirtyone = 1;
					else if(member.valthirtyone == 2.5)
					member.valthirtyone = 1.5;
						}
						
					}
				}

				od1Items = 0;
				//od2Items = 0;
				member.od1Items = od1Items;
				member.od2Items = od2Items;

				$scope.TotalADDays = 0;
				$scope.TotalEDDays = 0;
				angular.forEach(members, function (memb) {
					$scope.TotalADDays += Number(memb.pdays);
					$scope.TotalEDDays += Number(memb.od1Items);
					$scope.TotalEDDays += Number(memb.od2Items);
				});
			}
		}
	}

	$scope.ed2SelectChange = function (members, ed2select, memberid, selectattendance, memberhistoryid) {
		var od2Items = 0;
		var member = members.filter(x => x.memberhistoryid === memberhistoryid);
		member = member[0];
		if (Number(selectattendance) == 1 && Number(member.memberhistoryid) == Number(memberhistoryid)) {
			if (Number(ed2select) == 1) {
				a = {};
				b = {};
				for(var k = 1; k <= $scope.noOfDays;k++) {
					if(Number(member.adval[member.memberhistoryid][k]) == 1 ) {
						a[k] = ".5";
						od2Items += .5;
					} else  {
						a[k] = "0";	
					}
				}
				member.ed2val[member.memberhistoryid] = a;
				
				member.ed2select = 1;
				if(member.valone == 1)
					member.valone = 1.5;
				else if(member.valone == 2)
					member.valone = 2.5;
				else if(member.valone == 0)
					member.valone = 0;

				if(member.valtwo == 1)
					member.valtwo = 1.5;
				else if(member.valtwo == 2)
					member.valtwo = 2.5;
				else if(member.valtwo == 0)
					member.valtwo = 0;

				if(member.valthree == 1)
					member.valthree = 1.5;
				else if(member.valthree == 2)
					member.valthree = 2.5;
				else if(member.valthree == 0)
					member.valthree = 0;

				if(member.valfour == 1)
					member.valfour = 1.5;
				else if(member.valfour == 2)
					member.valfour = 2.5;
				else if(member.valfour == 0)
					member.valfour = 0;

				if(member.valfive == 1)
					member.valfive = 1.5;
				else if(member.valfive == 2)
					member.valfive = 2.5;
				else if(member.valfive == 0)
					member.valfive = 0;
					
				if(member.valsix == 1)
					member.valsix = 1.5;
				else if(member.valsix == 2)
					member.valsix = 2.5;
				else if(member.valsix == 0)
					member.valsix = 0;	
				
				if(member.valseven == 1)
					member.valseven = 1.5;
				else if(member.valseven == 2)
					member.valseven = 2.5;
				else if(member.valseven == 0)
					member.valseven = 0;
				
				if(member.valeight == 1)
					member.valeight = 1.5;
				else if(member.valeight == 2)
					member.valeight = 2.5;
				else if(member.valeight == 0)
					member.valeight = 0;
				
				if(member.valnine == 1)
					member.valnine = 1.5;
				else if(member.valnine == 2)
					member.valnine = 2.5;
				else if(member.valnine == 0)
					member.valnine = 0;
			
				if(member.valten == 1)
					member.valten = 1.5;
				else if(member.valten == 2)
					member.valten = 2.5;
				else if(member.valten == 0)
					member.valten = 0;

				if(member.valeleven == 1)
					member.valeleven = 1.5;
				else if(member.valeleven == 2)
					member.valeleven = 2.5;
				else if(member.valeleven == 0)
					member.valeleven = 0;
					
				if(member.valtwelve == 1)
					member.valtwelve = 1.5;
				else if(member.valtwelve == 2)
					member.valtwelve = 2.5;
				else if(member.valtwelve == 0)
					member.valtwelve = 0;
	
				if(member.valthirteen == 1)
					member.valthirteen = 1.5;
				else if(member.valthirteen == 2)
					member.valthirteen = 2.5;
				else if(member.valthirteen == 0)
					member.valthirteen = 0;	
			
				if(member.valfourteen == 1)
					member.valfourteen = 1.5;
				else if(member.valfourteen == 2)
					member.valfourteen = 2.5;
				else if(member.valfourteen == 0)
					member.valfourteen = 0;	

				if(member.valfifteen == 1)
					member.valfifteen = 1.5;
				else if(member.valfifteen == 2)
					member.valfifteen = 2.5;
				else if(member.valfifteen == 0)
					member.valfifteen = 0;
					
				if(member.valsixteen == 1)
					member.valsixteen = 1.5;
				else if(member.valsixteen == 2)
					member.valsixteen = 2.5;
				else if(member.valsixteen == 0)
					member.valsixteen = 0;

				if(member.valseventeen == 1)
					member.valseventeen = 1.5;
				else if(member.valseventeen == 2)
					member.valseventeen = 2.5;
				else if(member.valseventeen == 0)
					member.valseventeen = 0;

				if(member.valeighteen == 1)
					member.valeighteen = 1.5;
				else if(member.valeighteen == 2)
					member.valeighteen = 2.5;
				else if(member.valeighteen == 0)
					member.valeighteen = 0;

				if(member.valnineteen == 1)
					member.valnineteen = 1.5;
				else if(member.valnineteen == 2)
					member.valnineteen = 2.5;
				else if(member.valnineteen == 0)
					member.valnineteen = 0;
				
				if(member.valtwenty == 1)
					member.valtwenty = 1.5;
				else if(member.valtwenty == 2)
					member.valtwenty = 2.5;
				else if(member.valtwenty == 0)
					member.valtwenty = 0;

				if(member.valtwentyone == 1)
					member.valtwentyone = 1.5;
				else if(member.valtwentyone == 2)
					member.valtwentyone = 2.5;
				else if(member.valtwentyone == 0)
					member.valtwentyone = 0;
				
				if(member.valtwentytwo == 1)
					member.valtwentytwo = 1.5;
				else if(member.valtwentytwo == 2)
					member.valtwentytwo = 2.5;
				else if(member.valtwentytwo == 0)
					member.valtwentytwo = 0;

				if(member.valtwentythree == 1)
					member.valtwentythree = 1.5;
				else if(member.valtwentythree == 2)
					member.valtwentythree = 2.5;
				else if(member.valtwentythree == 0)
					member.valtwentythree = 0;

				if(member.valtwentyfour == 1)
					member.valtwentyfour = 1.5;
				else if(member.valtwentyfour == 2)
					member.valtwentyfour = 2.5;
				else if(member.valtwentyfour == 0)
					member.valtwentyfour = 0;

				if(member.valtwentyfive == 1)
					member.valtwentyfive = 1.5;
				else if(member.valtwentyfive == 2)
					member.valtwentyfive = 2.5;
				else if(member.valtwentyfive == 0)
					member.valtwentyfive = 0;

				if(member.valtwentysix == 1)
					member.valtwentysix = 1.5;
				else if(member.valtwentysix == 2)
					member.valtwentysix = 2.5;
				else if(member.valtwentysix == 0)
					member.valtwentysix = 0;

				if(member.valtwentyseven == 1)
					member.valtwentyseven = 1.5;
				else if(member.valtwentyseven == 2)
					member.valtwentyseven = 2.5;
				else if(member.valtwentyseven == 0)
					member.valtwentyseven = 0;

				if(member.valtwentyeight == 1)
					member.valtwentyeight = 1.5;
				else if(member.valtwentyeight == 2)
					member.valtwentyeight = 2.5;
				else if(member.valtwentyeight == 0)
					member.valtwentyeight = 0;

				if ($scope.noOfDays >= 29) {
					if(member.valtwentynine == 1)
						member.valtwentynine = 1.5;
					else if(member.valtwentynine == 2)
						member.valtwentynine = 2.5;
					else if(member.valtwentynine == 0)
						member.valtwentynine = 0;

					if ($scope.noOfDays >= 30) {
						if(member.valthirty == 1)
							member.valthirty = 1.5;
						else if(member.valthirty == 2)
							member.valthirty = 2.5;
						else if(member.valthirty == 0)
							member.valthirty = 0;
						if ($scope.noOfDays >= 30) {
							if(member.valthirtyone == 1)
								member.valthirtyone = 1.5;
							else if(member.valthirtyone == 2)
								member.valthirtyone = 2.5;
							else if(member.valthirtyone == 0)
								member.valthirtyone = 0;
						}
					}
				}

				member.od2Items = od2Items;

				$scope.TotalADDays = 0;
				$scope.TotalEDDays = 0;
				angular.forEach(members, function (memb) {
					$scope.TotalADDays += Number(memb.pdays);
					$scope.TotalEDDays += Number(memb.od1Items);
					$scope.TotalEDDays += Number(memb.od2Items);
				});

			} else {
				od2Items = 0;
				member.od2Items = od2Items;
				a = {};
				for(var k = 1; k <= $scope.noOfDays;k++) {
					a[k] = "0";	
				}
				member.ed2val[member.memberhistoryid] = a;
				if(member.valone == 2.5)
					member.valone = 2;
					else if(member.valone == 1.5)
					member.valone = 1;

				if(member.valtwo == 2.5)
					member.valtwo = 2;
					else if(member.valtwo == 1.5)
					member.valtwo = 1;

				if(member.valthree == 2.5)
					member.valthree = 2;
					else if(member.valthree == 1.5)
					member.valthree = 1;

				if(member.valfour == 2.5)
					member.valfour = 2;
					else if(member.valfour == 1.5)
					member.valfour = 1;

				if(member.valfive == 2.5)
					member.valfive = 2;
				else if(member.valfive == 1.5)
					member.valfive = 1;

					if(member.valsix == 2.5)
					member.valsix = 2;
				else if(member.valsix == 1.5)
					member.valsix = 1;

				if(member.valsix == 2.5)
					member.valsix = 2;
				else if(member.valsix == 1.5)
					member.valsix = 1;

					if(member.valseven == 2.5)
					member.valseven = 2;
				else if(member.valseven == 1.5)
					member.valseven = 1;

				if(member.valeight == 2.5)
					member.valeight = 2;
				else if(member.valeight == 1.5)
					member.valeight = 1;

				if(member.valnine == 2.5)
					member.valnine = 2;
				else if(member.valnine == 1.5)
					member.valnine = 1;
				
				if(member.valten == 2.5)
					member.valten = 2;
				else if(member.valten == 1.5)
					member.valten = 1;

					if(member.valeleven == 2.5)
					member.valeleven = 2;
				else if(member.valeleven == 1.5)
					member.valeleven = 1;

				if(member.valtwelve == 2.5)
					member.valtwelve = 2;
				else if(member.valtwelve == 1.5)
					member.valtwelve = 1;


				if(member.valthirteen == 2.5)
					member.valthirteen = 2;
				else if(member.valthirteen == 1.5)
					member.valthirteen = 1;

				if(member.valfourteen == 2.5)
					member.valfourteen = 2;
				else if(member.valfourteen == 1.5)
					member.valfourteen = 1;
				
				if(member.valfifteen == 2.5)
					member.valfifteen = 2;
				else if(member.valfifteen == 1.5)
					member.valfifteen = 1;

				if(member.valsixteen == 2.5)
					member.valsixteen = 2;
				else if(member.valsixteen == 1.5)
					member.valsixteen = 1;
				
			if(member.valseventeen == 2.5)
					member.valseventeen = 2;
				else if(member.valseventeen == 1.5)
					member.valseventeen = 1;
				
              if(member.valeighteen == 2.5)
					member.valeighteen = 2;
				else if(member.valeighteen == 1.5)
					member.valeighteen = 1;


 				if(member.valnineteen == 2.5)
					member.valnineteen = 2;
				else if(member.valnineteen == 1.5)
					member.valnineteen = 1;

				if(member.valtwenty == 2.5)
					member.valtwenty = 2;
				else if(member.valtwenty == 1.5)
					member.valtwenty = 1;
				
				
				if(member.valtwentyone == 2.5)
					member.valtwentyone = 2;
				else if(member.valtwentyone == 1.5)
					member.valtwentyone = 1;

				if(member.valtwentytwo == 2.5)
					member.valtwentytwo = 2;
				else if(member.valtwentytwo == 1.5)
					member.valtwentytwo = 1;
				
					if(member.valtwentythree == 2.5)
					member.valtwentythree = 2;
				else if(member.valtwentythree == 1.5)
					member.valtwentythree = 1;


				if(member.valtwentyfour == 2.5)
					member.valtwentyfour = 2;
				else if(member.valtwentyfour == 1.5)
					member.valtwentyfour = 1;

				if(member.valtwentyfive == 2.5)
					member.valtwentyfive = 2;
				else if(member.valtwentyfive == 1.5)
					member.valtwentyfive = 1;

			if(member.valtwentysix == 2.5)
					member.valtwentysix = 2;
				else if(member.valtwentysix == 1.5)
					member.valtwentysix = 1;
				
				if(member.valtwentyseven == 2.5)
					member.valtwentyseven = 2;
				else if(member.valtwentyseven == 1.5)
					member.valtwentyseven = 1;

				if(member.valtwentyeight == 2.5)
					member.valtwentyeight = 2;
				else if(member.valtwentyeight == 1.5)
					member.valtwentyeight = 1;

				if ($scope.noOfDays >= 29) {

					if(member.valtwentynine == 2.5)
					member.valtwentynine = 2;
				else if(member.valtwentynine == 1.5)
					member.valtwentynine = 1;


					if ($scope.noOfDays >= 30) {

					if(member.valthirty == 2.5)
					member.valthirty = 2;
				else if(member.valthirty == 1.5)
					member.valthirty = 1;

						if ($scope.noOfDays >= 30) {

							if(member.valthirtyone == 2.5)
					member.valthirtyone = 2;
				else if(member.valthirtyone == 1.5)
					member.valthirtyone = 1;

						
						}
					}
				}
				
				$scope.TotalADDays = 0;
				$scope.TotalEDDays = 0;
				angular.forEach(members, function (memb) {
					$scope.TotalADDays += Number(memb.pdays);
					$scope.TotalEDDays += Number(memb.od1Items);
					$scope.TotalEDDays += Number(memb.od2Items);
				});

				
			}
		}
	}

	$scope.ADchangeFunction = function (members, memberid, selectattendance,seldate,selectatt,attype,texcono,jobcode,memberhistoryid) {
		debugger

		
		var member = members.filter(x => x.memberhistoryid === memberhistoryid);  
		var duplicatemember = members.filter(x => x.memberid === memberid);
		member = member[0];
		var duphisid = 0;
		if (duplicatemember.length > 1) {
			var memberlist = duplicatemember.filter(x => x.memberhistoryid != memberhistoryid);
			duphisid =  memberlist[0].memberhistoryid;
		}
		var attvalue = 0;

		//console.log(member.ed2val[memberhistoryid]);
		if(Number(attype == 1) && Number(selectatt == 1)) {
			attvalue = 1;
			b = {};
			a = {};
			c = {}; 

			if (duphisid > 0) {
				objIndex = members.findIndex((obj => obj.memberhistoryid == duphisid));
				if (members[objIndex].dubdays == 0) {
					members[objIndex].dubdays = 1;	
					member.dubdays = Number(member.dubdays) + 1;   
				} else {
					members[objIndex].dubdays = Number(members[objIndex].dubdays) + 1;	
					member.dubdays = Number(member.dubdays) + 1;   
				}
			} 

			if(member.prrdays == 0) { 
				member.prrdays = 1;
			} else if(member.prrdays > 0) {
				member.prrdays = Number(member.prrdays) + 1;
			} else {
				member.prrdays = Number(member.prrdays) + 1;
			}

			for(var k = 1; k <= $scope.noOfDays; k++) {
				if(k == seldate) {
					b[k] = "1";
					a[k] = "0";
					c[k] = "0";
				} else {
					b[k] = member.adval[memberhistoryid][k];
					a[k] = member.ed1val[memberhistoryid][k];
					c[k] = member.ed2val[memberhistoryid][k];
				}
			} 
			member.adval[memberhistoryid] = b;
			if(jobcode != "DVR") {
				member.ed1val[memberhistoryid] = a;
				member.ed2val[memberhistoryid] = c;
			}
		} else if (Number(attype) == 2 && Number(selectatt) == 1) {
			attvalue = 2;
			b = {};
			console.log(member.ed2val[memberhistoryid]);
			for(var k = 1; k <= $scope.noOfDays; k++) {
				//b[k] =0;
				if(k == seldate) {
					b[k] = member.ed2val[memberhistoryid][k];	
				} else {
					b[k] = member.ed2val[memberhistoryid][k];
				}
			}
			member.ed2val[memberhistoryid] = b;

			//console.log(member.ed2val[memberhistoryid]);
		} else if (Number(attype) == 3 && Number(selectatt) == .5) {
			attvalue = 2.5;
		} else if(Number(attype) == 1 && Number(selectatt) == 0) {
			attvalue = 0;
			if(Number(member.ed1val[memberhistoryid][seldate]) == 1)
				member.od1Items -= 1;
			if(Number(member.ed2val[memberhistoryid][seldate]) == .5)
				member.od2Items -= .5;
			if(jobcode == 'DVR') {
				if(Number(member.otval[memberhistoryid][seldate]) > 0) {
					member.othours -= member.otval[memberhistoryid][seldate];
					member.od1Items = (member.othours/8);
				}
			}
			b = {};
			a = {};
			c = {};
			for(var k = 1; k <= $scope.noOfDays; k++) {
				if(k == seldate) {
					b[k] = "0";
					a[k] = "0";
					c[k] = "0";
				} else {
					a[k] = member.ed1val[memberhistoryid][k];
					b[k] = member.ed2val[memberhistoryid][k];
					c[k] = member.otval[memberhistoryid][k];
				}
			}
			member.ed1val[memberhistoryid] = a;
			member.ed2val[memberhistoryid] = b;
			if(jobcode == 'DVR') {
				member.otval[memberhistoryid] = c;
			}  

			if (duphisid > 0) {
				objIndex = members.findIndex((obj => obj.memberhistoryid == duphisid));
				if (members[objIndex].dubdays == 0) {
					members[objIndex].dubdays = 0;	
					member.dubdays = Number(member.dubdays) - 1;   
				} else {
					members[objIndex].dubdays = Number(members[objIndex].dubdays) - 1;	
					member.dubdays = Number(member.dubdays) - 1;   
				}
			} 

			if(member.prrdays == 0) { 
				member.prrdays = 0;
			} else if(member.prrdays > 0) {
				member.prrdays = Number(member.prrdays) - 1;
			} else {
				member.prrdays = Number(member.prrdays) - 1;
			}
 
		} else if (Number(attype) == 2 && Number(selectatt) == 0) {
			attvalue = 1;
			b = {};
			if(Number(member.ed2val[memberhistoryid][seldate]) == 1)
				//member.od2Items -= 1;
			for(var k = 1; k <= $scope.noOfDays; k++) {
				if(k == seldate) {
					b[k] = member.ed2val[memberhistoryid][k];
				} else {
					b[k] = member.ed2val[memberhistoryid][k];
				}
			}
			member.ed2val[memberhistoryid] = b;
		} else if (Number(attype) == 3 && Number(selectatt) == 0) {
			attvalue = 2.5;
		}

		// console.log('member.adval[texcono]',member.adval[texcono][seldate]);

		if (Number(member.memberhistoryid) == Number(memberhistoryid) && Number(selectattendance) == 1) {
			switch (seldate) {
				case 1:
					if(Number(attype == 1))
						member.one = Number(selectatt);
					member.valone = Number(attvalue);
					break;

                case 2:
					if(Number(attype == 1))
						member.two = Number(selectatt);
                    member.valtwo = Number(attvalue);
                    break;

                case 3:
					if(Number(attype == 1))
                   		member.three = Number(selectatt);
                    member.valthree = Number(attvalue);
                    break;
                      
				case 4: 
					if(Number(attype == 1))                
                    	member.four = Number(selectatt);
                    member.valfour = Number(attvalue);
                    break;
                                    
				case 5:    
					if(Number(attype == 1))
                   		member.five = Number(selectatt);
                    member.valfive = Number(attvalue);
                    break;
                                                        
				case 6: 
					if(Number(attype == 1)) 
                   		member.six = Number(selectatt);
                    member.valsix = Number(attvalue);
                    break;
                                                        
				case 7: 
					if(Number(attype == 1)) 
                    	member.seven = Number(selectatt);
                    member.valseven = Number(attvalue);
                    break;
                                                        
				case 8:  
					if(Number(attype == 1)) 
                    	member.eight = Number(selectatt);
                    member.valeight = Number(attvalue);
                    break;
                                                        
				case 9:  
					if(Number(attype == 1)) 
                    	member.nine = Number(selectatt);
                    member.valnine = Number(attvalue);
                    break;
                                                        
                case 10:  
					if(Number(attype == 1)) 
						member.ten = Number(selectatt);
                    member.valten = Number(attvalue);
                    break;
                                                        
				case 11:  
					if(Number(attype == 1)) 
                    member.eleven = Number(selectatt);
                    member.valeleven = Number(attvalue);
                    break;

				case 12:  
					if(Number(attype == 1))     
                   		member.twelve = Number(selectatt);
                    member.valtwelve = Number(attvalue);
                    break;

                case 13:   
					if(Number(attype == 1))     
						member.thirteen = Number(selectatt);
                    member.valthirteen = Number(attvalue);
                    break;
                    
                case 14:   
					if(Number(attype == 1))   
                    	member.fourteen = Number(selectatt);
                    member.valfourteen = Number(attvalue);
                    break;
                                        
                case 15:    
					if(Number(attype == 1)) 
                    	member.fifteen = Number(selectatt);
                    member.valfifteen = Number(attvalue);
                    break;
                                     
                case 16:    
					if(Number(attype == 1))    
                   		member.sixteen = Number(selectatt);
                    member.valsixteen = Number(attvalue);
                    break;
                                    
                case 17:     
					if(Number(attype == 1))    
                    	member.seventeen = Number(selectatt);
                    member.valseventeen = Number(attvalue);
                    break;
                                                        
                case 18:    
					if(Number(attype == 1))  
                   		member.eighteen = Number(selectatt);
                    member.valeighteen = Number(attvalue);
                    break;
                                                                           
                case 19:   
					if(Number(attype == 1))   
                   		member.nineteen = Number(selectatt);
                    member.valnineteen = Number(attvalue);
                    break;
                                                                        
                case 20:    
					if(Number(attype == 1))     
                    	member.twenty = Number(selectatt);
                    member.valtwenty = Number(attvalue);
                    break;
                                                                                            
                case 21:    
					if(Number(attype == 1))   
                    	member.twentyone = Number(selectatt);
                    member.valtwentyone = Number(attvalue);
                    break;
                                                                                            
                case 22:   
					if(Number(attype == 1))    
                    	member.twentytwo = Number(selectatt);
                    member.valtwentytwo = Number(attvalue);
                    break;
                                                                                          
                case 23:   
					if(Number(attype == 1))      
                    	member.twentythree = Number(selectatt);
                    member.valtwentythree = Number(attvalue);
                    break;
                                                                                            
                case 24:    
					if(Number(attype == 1))   
                    	member.twentyfour = Number(selectatt);
                    member.valtwentyfour = Number(attvalue);
                    break;
                                                                                          
                case 25:   
					if(Number(attype == 1))      
                    	member.twentyfive = Number(selectatt);
                    member.valtwentyfive = Number(attvalue);
                    break;
                                                                                          
                case 26:   
					if(Number(attype == 1))      
                    	member.twentysix = Number(selectatt);
                    member.valtwentysix = Number(attvalue);
                    break;
                                                                        
                case 27:    
					if(Number(attype == 1))   
                    	member.twentyseven = Number(selectatt);
                    member.valtwentyseven = Number(attvalue);
                    break;

                case 28:   
					if(Number(attype == 1))    
                   		member.twentyeight = Number(selectatt);
                    member.valtwentyeight = Number(attvalue);
                    break;

                case 29:
					if(Number(attype == 1))    
                    	member.twentynine = Number(selectatt);
                    member.valtwentynine = Number(attvalue);
                    break;

				case 30: 
					if(Number(attype == 1))  
                    	member.thirty = Number(selectatt);
                    member.valthirty = Number(attvalue);
                    break;

                case 31:   
					if(Number(attype == 1))  
                    	member.thirtyone = Number(selectatt);
                    member.valthirtyone = Number(attvalue);
                    break;
				default:
			}
			if(Number(attype == 1))  {
				if(Number(selectatt) == 1) {
					member.pdays += 1;
					member.presentdays += 1;
				} else if (Number(selectatt) == 0 && member.pdays > 0) {
					member.pdays -= 1;
					member.presentdays -= 1;
				}
			} else if(Number(attype == 2))  {
				if(Number(selectatt) == 1) {
					member.od1Items += 1;
				} else if (Number(selectatt) == 0 && member.od1Items > 0) {
					member.od1Items -= 1;
				}
			} else if(Number(attype == 3))  {
				if(Number(selectatt) == .5) {
					member.od2Items += .5;
				} else if (Number(selectatt) == 0 && member.od2Items > 0) {
					member.od2Items -= .5;
				}
			}

			$scope.TotalADDays = 0;
			$scope.TotalEDDays = 0;
			angular.forEach(members, function (memb) {
				$scope.TotalADDays += Number(memb.pdays);
				$scope.TotalEDDays += Number(memb.od1Items);
				$scope.TotalEDDays += Number(memb.od2Items);
			});
		}
	}

	$scope.OTchangeFunction = function (members, memberid, selectattendance,seldate,selectatt,attype,texcono,memberhistoryid) {
		debugger
		if(Number(selectattendance) > 0) {
			var member = members.filter(x => x.memberhistoryid === memberhistoryid);
			member = member[0];
			var attvalue = 0;
			if (Number(member.memberhistoryid) == Number(memberhistoryid) && Number(selectattendance) == 1) {
				b = {};
				for(var k = 1; k <= $scope.noOfDays; k++) {
					if(k == seldate) {
						b[k] = selectatt;
					} else {
						b[k] = member.otval[memberhistoryid][k];
					}
				}
				debugger
				member.otval[memberhistoryid] = b;
				switch (seldate) {
					case 1:
						member.valone = member.valone + (member.otval[memberhistoryid][seldate] / 8);
						break;
				
					case 2:
						member.valtwo = member.valtwo + (member.otval[memberhistoryid][seldate] / 8);
						break;
				
					case 3:
						member.valthree = member.valthree + (member.otval[memberhistoryid][seldate] / 8);
						break;
						  
					case 4: 
						member.valfour = member.valfour + (member.otval[memberhistoryid][seldate] / 8);
						break;
										
					case 5:    
						member.valfive = member.valfive + (member.otval[memberhistoryid][seldate] / 8);
						break;
															
					case 6: 
						member.valsix = member.valsix + (member.otval[memberhistoryid][seldate] / 8);
						break;
															
					case 7: 
						member.valseven = member.valseven + (member.otval[memberhistoryid][seldate] / 8);
						break;
															
					case 8:  
						member.valeight = member.valeight + (member.otval[memberhistoryid][seldate] / 8);
						break;
															
					case 9:  
						member.valnine = member.valnine + (member.otval[memberhistoryid][seldate] / 8);
						break;
															
					case 10: 
						member.valten = member.valten + (member.otval[memberhistoryid][seldate] / 8);
						break;
															
					case 11:  
						member.valeleven = member.valeleven + (member.otval[memberhistoryid][seldate] / 8);
						break;
				
					case 12:  
						member.valtwelve = member.valtwelve + (member.otval[memberhistoryid][seldate] / 8);
						break;
				
					case 13:
						member.valthirteen = member.valthirteen + (member.otval[memberhistoryid][seldate] / 8);
						
					case 14: 
						member.valfourteen = member.valfourteen + (member.otval[memberhistoryid][seldate] / 8);
						break;
											
					case 15:   
						member.valfifteen = member.valfifteen + (member.otval[memberhistoryid][seldate] / 8);
						break;
										 
					case 16:    
						member.valsixteen = member.valsixteen + (member.otval[memberhistoryid][seldate] / 8);
						break;
										
					case 17:     
						member.valseventeen = member.valseventeen + (member.otval[memberhistoryid][seldate] / 8);
						break;
															
					case 18:  
						member.valeighteen = member.valeighteen + (member.otval[memberhistoryid][seldate] / 8);
						break;
																			   
					case 19: 
						member.valnineteen = member.valnineteen + (member.otval[memberhistoryid][seldate] / 8);
						break;
																			
					case 20:  
						member.valtwenty = member.valtwenty + (member.otval[memberhistoryid][seldate] / 8);
						break;
																								
					case 21:  
						member.valtwentyone = member.valtwentyone + (member.otval[memberhistoryid][seldate] / 8);
						break;
																								
					case 22:   
						member.valtwentytwo = member.valtwentytwo + (member.otval[memberhistoryid][seldate] / 8);
						break;
																							  
					case 23: 
						member.valtwentythree = member.valtwentythree + (member.otval[memberhistoryid][seldate] / 8);
						break;
																								
					case 24:   
						member.valtwentyfour = member.valtwentyfour + (member.otval[memberhistoryid][seldate] / 8);
						break;
																							  
					case 25:  
						member.valtwentyfive = member.valtwentyfive + (member.otval[memberhistoryid][seldate] / 8);
						break;
																							  
					case 26: 
						member.valtwentysix = member.valtwentysix + (member.otval[memberhistoryid][seldate] / 8);
						break;
																			
					case 27:   
						member.valtwentyseven = member.valtwentyseven + (member.otval[memberhistoryid][seldate] / 8);
						break;
				
					case 28: 
						member.valtwentyeight = member.valtwentyeight + (member.otval[memberhistoryid][seldate] / 8);
						break;
				
					case 29:
						member.valtwentynine = member.valtwentynine + (member.otval[memberhistoryid][seldate] / 8);
						break;
				
					case 30: 
						member.valthirty = member.valthirty + (member.otval[memberhistoryid][seldate] / 8);
						break;
				
					case 31:
						member.valthirtyone = member.valthirtyone + (member.otval[memberhistoryid][seldate] / 8);
						break;
					default:
				}
				member.othours = 0;
				member.od1Items = 0;
				for(var k = 1; k <= $scope.noOfDays; k++) {
					member.othours += Number(member.otval[memberhistoryid][k]);
					member.od1Items += Number(member.otval[memberhistoryid][k]) / 8;
				}
			}

			$scope.TotalADDays = 0;
			$scope.TotalEDDays = 0;
			angular.forEach(members, function (memb) {
				$scope.TotalADDays += Number(memb.pdays);
				$scope.TotalEDDays += Number(memb.od1Items);
				$scope.TotalEDDays += Number(memb.od2Items);
			});
		}
	}
	
	/*  Checkbox change functions end */

	$scope.cancelattendence = function () {
		window.location.reload(true);
	};

	$scope.UploadFile = function (files) {
		$("input").removeClass("disabled");
		$scope.$apply(function () { //I have used $scope.$apply because I will call this function from File input type control which is not supported 2 way binding
			$scope.Message = "";
			$scope.SelectedFileForUpload = files[0];
		})
	}

	$scope.canceloption = function () {
		$scope.$dismiss('cancel');
	}

	$scope.ParseExcelDataAndSave = function () {
		$scope.attendances = {};
		var file = $scope.SelectedFileForUpload;
		if (file) {
			var reader = new FileReader();
			reader.onload = function (e) {
				var data = e.target.result;
				//XLSX from js-xlsx library , which I will add in page view page
				var workbook = XLSX.read(data, {
					type: 'binary'
				});
				var sheetName = workbook.SheetNames[0];
				var excelData = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
				for (var i = 0; i <= excelData.length; i++) { 
					debugger
					var obj = excelData[i]; 
					if (i == 2) {
						var nxt = 0;
					}
					if (i == 0) {
						var val = obj.undefined.split("Branch:");
						var ob = _.findWhere($scope.projectnos, {
							projectid: $scope.objattendance.projectid
						});
						obj.branch = val[1];
						obj.monthandyear = $scope.objattendance.monthandyear;
						obj.projectid = $scope.objattendance.projectid;
						obj.clientid = $scope.objattendance.clientid;
						obj.projectno = ob.projectno;
						delete obj.undefined;
					}
					if (i == 1) {
						var val = obj.undefined.split("Department:");
						obj.department = val[1];
						delete obj.undefined;
					}
					if (i == 2) {
						var val = obj.undefined.split(" ");
						obj.empId = val[3];
						obj.empName = val[5];
						delete obj.undefined;
						nxt = i + 7 + 1;
					} else if (i > 2 && i == nxt && obj != null) {
						var val = obj.undefined.split(" ");
						obj.empId = val[3];
						obj.empName = val[5];
						delete obj.undefined;
						nxt = i + 7 + 1;
					}
				}
				console.log(JSON.stringify(excelData));
				if (excelData.length > 0) {
					// $scope.attendances.employee=excelData;
					$http({
						url: api_url + "/client/attendance/importfrombiometric",
						data: $.param({
							"employee": excelData,
							"update": 0,
						}),
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded', 
							"Authorization" : atoken
						},
						method: "POST",
					}).success(function (response, result) {
						if (response.code == 200) {
							$scope.tableParams = new NgTableParams({

								page: 1,
								count: 0
							}, {
								data: []
							});
							$scope.tableParams.reload();
							$scope.SelectedFileForUpload = "";
							$('#impfile').val('');
							$('#valpath').val('');
							Materialize.toast(response.message, 4000, 'green') // 4000 is the duration of the toast
						} else {
							// Materialize.toast(response.message, 3000, 'red');
							if (confirm("Data Already exists.Are you sure want to Replace Data?")) {
								$scope.ParseExcelDataAndSaveUpdate(excelData);
							} else {
								Materialize.toast(response.message, 3000, 'red');
							}
						}
					})
				} else {
					$scope.Message = "No data found";
				}
			}
			reader.onerror = function (ex) {}
			reader.readAsBinaryString(file);
		}
	}

	$scope.ParseExcelDataAndSaveUpdate = function (excelData) {
		// console.log('excelData', excelData);
		if (excelData.length > 0) {
			$http({
				url: api_url + "/client/attendance/importfrombiometric",
				data: $.param({
					"employee": excelData,
					"update": 1,
				}),
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					"Authorization" : atoken
				},
				method: "POST",
			}).success(function (response, result) {
				if (response.code == 200) {
					$scope.tableParams = new NgTableParams({
						page: 1,
						count: 0
					}, {
						data: []
					});
					$scope.tableParams.reload();
					$scope.SelectedFileForUpload = "";
					$('#impfile').val('');
					$('#valpath').val('');
					Materialize.toast(response.message, 4000, 'green') // 4000 is the duration of the toast
				} else {
					Materialize.toast(response.message, 3000, 'red');
				}
			})
		} else {
			$scope.Message = "No data found";
		}
	}

	$scope.optionToggled = function () {
		$scope.isAllSelected = $scope.options.every(function (itm) {
			return itm.selected;
		})
	}

	$scope.monthclear = function () {
		$scope.objattendance.monthandyear = "";
	}

	var dt = new Date();
	var dates = dt.getDate();

	$scope.loadValue = function () {
		angular.forEach($scope.members, function (member) {
			member.select = 1;
			member.unselect = 0;
			member.selectattendance = 0;
			member.SelectItems = 0;
			member.adselect = 0;
			member.ed1select = 0;
			member.ed2select = 0;
			member.one = 0;
			member.two = 0;
			member.three = 0;
			member.four = 0;
			member.five = 0;
			member.six = 0;
			member.seven = 0;
			member.eight = 0;
			member.nine = 0;
			member.ten = 0;
			member.eleven = 0;
			member.twelve = 0;
			member.thirteen = 0;
			member.fourteen = 0;
			member.fifteen = 0;
			member.sixteen = 0;
			member.seventeen = 0;
			member.eighteen = 0;
			member.nineteen = 0;
			member.twenty = 0;
			member.twentyone = 0;
			member.twentytwo = 0;
			member.twentythree = 0;
			member.twentyfour = 0;
			member.twentyfive = 0;
			member.twentysix = 0;
			member.twentyseven = 0;
			member.twentyeight = 0;
			member.twentynine = 0;
			member.thirty = 0;
			member.thirtyone = 0;
			member.pdays = 0;
			member.presentdays = 0;
			member.od1Items = 0;
			member.od2Items = 0;
			member.adval = {};
			member.ed1val = {};
			member.ed2val = {};
			member.otval = {};
			debugger
			a = {};
			for(var k = 1; k <= $scope.noOfDays;k++) {
				a[k] = "0";		
			}
			member.adval[member.memberhistoryid] =	a;
			member.ed1val[member.memberhistoryid] =	a;
			member.ed2val[member.memberhistoryid] =	a;
			member.otval[member.memberhistoryid] = a;
		})
	}
});