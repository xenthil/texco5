var app = angular.module('appadminattendance', ['ngTable', 'ui.bootstrap']);
app.controller('ctrladminattendance', function ($scope, $http, $filter, NgTableParams) {

    $scope.attendancedetails = [];
    $scope.selected = {};
    $scope.objattendance = {};
    $scope.attendance = [];
    $scope.noOfDays=0;
    var tdy=new Date();
    var date=tdy.getDate();
    
    if(date>=27){
        var edDate="today";
        console.log("today "+date);
    } else{
        var stDate=new Date();
        stDate.setMonth(stDate.getMonth());
        var edDate=stDate;
        console.log("edDate "+ edDate);
    }
    
    $( document ).ready(function() { 
    $('.month_year').datepicker({
        format: 'MM yyyy',
        viewMode: "months", 
        minViewMode: "months",
            autoClose:true,
            //endDate: edDate
    });
    $('.datepicker input').datepicker();
   
    $(".month_year").datepicker().on("changeDate", function(e) {
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
        console.log('response',response);
        if (response.status = 200) {
            $scope.projectnos = response.data;
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });

    //Edit agreementproject
    // $scope.fillclientproject = function(projectid) {
    //     $scope.objattendance.monthandyear = "";

    //     $http({
    //         method: 'GET',
    //         url: api_url + "/prjectnos/byclientid?clientid=" + clientid,
    //     }).then(function successCallback(response) {
    //         console.log('response',response);
    //         if (response.status = 200) {
    //             $scope.projectnos = response.data;
    //             angular.forEach($scope.projectnos, function(project) {
    //                 if (project.projectid == projectid) {
    //                     $scope.objattendance.clientid = project.clientid;
    //                     // Load Selected Projects

    //                     $scope.selectedprojects = [];
    //                     var obj = {}
    //                     for (obj of $scope.projects) {
    //                         if (obj.clientid == project.clientid) {
    //                             $scope.selectedprojects.push(obj);
    //                             console.log(JSON.stringify($scope.selectedprojects))
    //                         }
    //                     }
    //                     $scope.objattendance.projectid = project.projectid;

    //                 }
    //             });
    //         }

    //     }, function errorCallback(response) {
    //         Materialize.toast('Something has gone wrong!', 3000, 'red');
    //     });
    // };

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
			}
		}, function errorCallback(response) {
			Materialize.toast('Something has gone wrong!', 3000, 'red');
		});
    };
    
    $scope.confirmsave = function (objattendance, members, savetype) {
		debugger
		$scope.isSubmitDisabled = true;
		var empcount = 0;
		var addays = 0;
		var ed1days = 0;
		var ed2days = 0;
		$scope.savetype = savetype;
		$scope.monthandyears = objattendance.monthandyear;
		$scope.clientids = objattendance.clientid;
		$scope.projectids = objattendance.projectid;
		$scope.summaryatt = members;
		// $scope.memberdetailss = memberdetails;
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
					// if(members[i].jobcode == 'DVR') {
					// 	members[i].od1Itemss = members[i].od1Items / 8;
					// 	members[i].od2Itemss = members[i].od2Items / 8;
					// } else {
						members[i].od1Itemss = members[i].od1Items;
						members[i].od2Itemss = members[i].od2Items;
					//}
					ed1days += members[i].od1Itemss;
					ed2days += members[i].od2Itemss;
					empcount = members.length;
				}
				$("#addays").text(addays);
				$("#ed1days").text(ed1days);
				$("#ed2days").text(ed2days);
				$("#adday").text(addays);
				$("#ed1day").text(ed1days);
				$("#ed2day").text(ed2days);
				$("#ttdays").text(Number(ed1days) + Number(ed2days) + Number(addays));
				$("#tttdays").text(Number(ed1days) + Number(ed2days) + Number(addays));
				$("#empcount").text(empcount);
				$('#modal1').modal('open');
				$scope.isSubmitDisabled = false;
			}
		} else {
			if($scope.summaryatt.length) {

				$scope.tableParams1 = new NgTableParams({
					page: 1,
					count: $scope.summaryatt.length
				}, {
					data: $scope.summaryatt
				});

				for (var i = 0; i < members.length; i++) {
					addays += Number(members[i].pdays);
						members[i].od1Itemss = Number(members[i].od1Items);
						members[i].od2Itemss = Number(members[i].od2Items);
					ed1days += Number(members[i].od1Itemss);
					ed2days += Number(members[i].od2Itemss);
					empcount = members.length;
				}
				$("#addays").text(addays);
				$("#ed1days").text(ed1days);
				$("#ed2days").text(ed2days);
				$("#adday").text(addays);
				$("#ed1day").text(ed1days);
				$("#ed2day").text(ed2days);
				$("#ttdays").text(Number(ed1days) + Number(ed2days) + Number(addays));
				$("#tttdays").text(Number(ed1days) + Number(ed2days) + Number(addays));
				$("#empcount").text(empcount);
				$('#modal1').modal('open');
				$scope.isSubmitDisabled = false;
			} else {
				$scope.isSubmitDisabled = false;
				Materialize.toast('Atleast Select one person to submit the attendance', 3000, 'red');
			}
		}
    }
    
    $scope.saveattendance = function (objattendance, members,savetype) {
		$scope.isSubmitDisabled = true;
		debugger
		$http({
			method: 'POST',
			url: api_url + "/client/attendance",
			data: $.param({
				"clientid": objattendance.clientid,
				"projectid": objattendance.projectid,
				"members": members,
				"monthandyear": objattendance.monthandyear,
				"changedby": objattendance.changedby,
				"attendancetype": savetype
			}),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : atoken
            }, 
		}).success(function (response, result) {
			if (response.status = 200) {
				setTimeout(function () {
					$('#modal1').modal('close');
				}, 1500);
                Materialize.toast('Attendance Updated succsessfully', 4000, 'green'); // 4000 is the duration of the toast
                win = window.open(base_url + "client/printreview?projectid=" + objattendance.projectid + "&monthandyear=" + objattendance.monthandyear, '_blank');
                setTimeout(() => {
                    window.location.reload(true);
                }, 1500);
			} else {
				$scope.isSubmitDisabled = false;
				$('#failure').html(response);
			}
		}).error(function (error) {
			$scope.isSubmitDisabled = false;
			$('#failure').html(error);
		});
	};

    function daysInThisMonth(month) {
        var val=month.getMonth();
        var yea=month.getYear();
    var now = new Date(month);
     return new Date(now.getFullYear(), now.getMonth()+1, 0).getDate();
    }

    $scope.editattendance = function (monthandyear, clientid, projectid) {
        var sp=monthandyear.split(" ");
        var date="05/"+sp[0]+"/"+sp[1];
        var nda=new Date(date);
        var perd=new Date(nda);
         $scope.noOfDays=daysInThisMonth(perd);
        debugger
        $('#failure').html("");
        $scope.members = [];
        $http({
            method: 'GET', 
            headers : {
                "Authorization" : atoken
            },
            url: api_url + "/client/edit/editattendancedetails?projectid=" + projectid + "&monthandyear=" + monthandyear+"&clientid=" +clientid,
        }).then(function successCallback(response) {  
            debugger
            if (response.status = 200) {
                if (response.data.length != 0) {
                    var data = response.data[0].members;
                    if(response.data[0]) {
                        $scope.data = response.data[0].members;
                        $scope.count = response.data[0].members.length;
                    } else {
                        $scope.data = [];
                        $scope.count = 0;
                    }
                    if($scope.count) {
                        $scope.TotalCount = $scope.count;
                        $scope.tableParams = new NgTableParams({
                            page: 1,
                            count: response.data[0].members.length
                        }, {
                            data: $scope.data
                        });
                        $scope.memberdetails = response.data[0].members;
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
                    $scope.memberdetails = response.data[0].members;
                    $scope.members = response.data[0].members;
                    // console.log(JSON.stringify(data));
                } else {
                    $scope.memberdetails = [];
                    Materialize.toast('No records to edit attendance', 3000, 'red');
                }
            } else {
                Materialize.toast('error', 3000, 'red');
            }
        }, function errorCallback(response) {
            Materialize.toast('error', 3000, 'red');
        });
    };

    $scope.ADchangeFunction = function (members, memberid, selectattendance, jobcode,selectedatt) {
		debugger
		var PresentItems = 0;
		var member = members.filter(x => x.memberid === memberid);
		member = member[0];
		var od1Items = 0;
		if (jobcode == 'DVR')  {
			PresentItems += (Number(member.one) == 1) ? 1 : 0;
			PresentItems += (Number(member.two) == 1) ? 1 : 0;
			PresentItems += (Number(member.three) == 1) ? 1 : 0;
			PresentItems += (Number(member.four) == 1) ? 1 : 0;
			PresentItems += (Number(member.five) == 1) ? 1 : 0;
			PresentItems += (Number(member.six) == 1) ? 1 : 0;
			PresentItems += (Number(member.seven) == 1) ? 1 : 0;
			PresentItems += (Number(member.eight) == 1) ? 1 : 0;
			PresentItems += (Number(member.nine) == 1) ? 1 : 0;
			PresentItems += (Number(member.ten) == 1) ? 1 : 0;
			PresentItems += (Number(member.eleven) == 1) ? 1 : 0;
			PresentItems += (Number(member.twelve) == 1) ? 1 : 0;
			PresentItems += (Number(member.thirteen) == 1) ? 1 : 0;
			PresentItems += (Number(member.fourteen) == 1) ? 1 : 0;
			PresentItems += (Number(member.fifteen) == 1) ? 1 : 0;
			PresentItems += (Number(member.sixteen) == 1) ? 1 : 0;
			PresentItems += (Number(member.seventeen) == 1) ? 1 : 0;
			PresentItems += (Number(member.eighteen) == 1) ? 1 : 0;
			PresentItems += (Number(member.nineteen) == 1) ? 1 : 0;
			PresentItems += (Number(member.twenty) == 1) ? 1 : 0;
			PresentItems += (Number(member.twentyone) == 1) ? 1 : 0;
			PresentItems += (Number(member.twentytwo) == 1) ? 1 : 0;
			PresentItems += (Number(member.twentythree) == 1) ? 1 : 0;
			PresentItems += (Number(member.twentyfour) == 1) ? 1 : 0;
			PresentItems += (Number(member.twentyfive) == 1) ? 1 : 0;
			PresentItems += (Number(member.twentysix) == 1) ? 1 : 0;
			PresentItems += (Number(member.twentyseven) == 1) ? 1 : 0;

			PresentItems += (Number(member.twentyeight) == 1) ? 1 : 0;
			PresentItems += (Number(member.twentynine) == 1) ? 1 : 0;
			PresentItems += (Number(member.thirty) == 1) ? 1 : 0;
			PresentItems += (Number(member.thirtyone) == 1) ? 1 : 0;

			od1Items += (Number(member.od1one));
			od1Items += (Number(member.od1two));
			od1Items += (Number(member.od1three));
			od1Items += (Number(member.od1four));
			od1Items += (Number(member.od1five));
			od1Items += (Number(member.od1six));
			od1Items += (Number(member.od1seven));
			od1Items += (Number(member.od1eight));
			od1Items += (Number(member.od1nine));
			od1Items += (Number(member.od1ten));
			od1Items += (Number(member.od1eleven));
			od1Items += (Number(member.od1twelve));
			od1Items += (Number(member.od1thirteen));
			od1Items += (Number(member.od1fourteen));
			od1Items += (Number(member.od1fifteen));
			od1Items += (Number(member.od1sixteen));
			od1Items += (Number(member.od1seventeen));
			od1Items += (Number(member.od1eighteen));
			od1Items += (Number(member.od1nineteen));
			od1Items += (Number(member.od1twenty));
			od1Items += (Number(member.od1twentyone));
			od1Items += (Number(member.od1twentytwo));
			od1Items += (Number(member.od1twentythree));
			od1Items += (Number(member.od1twentyfour));
			od1Items += (Number(member.od1twentyfive));
			od1Items += (Number(member.od1twentysix));
			od1Items += (Number(member.od1twentyseven));
			od1Items += (Number(member.od1twentyeight));
			od1Items += (Number(member.od1twentynine));
			od1Items += (Number(member.od1thirty));
			od1Items += (Number(member.od1thirtyone));
			od1Items = Number(od1Items).toFixed(2);
			if (member.one == 1)
				member.valone = Number(member.one) + (Number(member.od1one)/8);
			if (member.two == 1)
				member.valtwo = Number(member.two) + (Number(member.od1two)/8);
			if (member.three == 1)
				member.valthree = Number(member.three) + (Number(member.od1three)/8);
			if (member.four == 1)
				member.valfour = Number(member.four) + (Number(member.od1four)/8);
			if (member.five == 1)
				member.valfive = Number(member.five) + (Number(member.od1five)/8);
			if (member.six == 1)
				member.valsix = Number(member.six) + (Number(member.od1six)/8);
			if (member.seven == 1)
				member.valseven = Number(member.seven) + (Number(member.od1seven)/8);
			if (member.eight == 1)
				member.valeight = Number(member.eight) + (Number(member.od1eight)/8);
			if (member.nine == 1)
				member.valnine = Number(member.nine) + (Number(member.od1nine)/8);
			if (member.ten == 1)
				member.valten = Number(member.ten) + (Number(member.od1ten)/8);
			if (member.eleven == 1)
				member.valeleven = Number(member.eleven) + (Number(member.od1eleven)/8);
			if (member.twelve == 1)
				member.valtwelve = Number(member.twelve) + (Number(member.od1twelve)/8);
			if (member.thirteen == 1)
				member.valthirteen = Number(member.thirteen) + (Number(member.od1thirteen)/8);
			if (member.fourteen == 1)
				member.valfourteen = Number(member.fourteen) + (Number(member.od1fourteen)/8);
			if (member.fifteen == 1)
				member.valfifteen = Number(member.fifteen) + (Number(member.od1fifteen)/8);
			if (member.sixteen == 1)
				member.valsixteen = Number(member.sixteen) + (Number(member.od1sixteen)/8);
			if (member.seventeen == 1)
				member.valseventeen = Number(member.seventeen) + (Number(member.od1seventeen)/8);
			if (member.eighteen == 1)
				member.valeighteen = Number(member.eighteen) + (Number(member.od1eighteen)/8);
			if (member.nineteen == 1)
				member.valnineteen = Number(member.nineteen) + (Number(member.od1nineteen)/8);
			if (member.twenty == 1)
				member.valtwenty = Number(member.twenty) + (Number(member.od1twenty)/8);
			if (member.twentyone == 1)
				member.valtwentyone = Number(member.twentyone) + (Number(member.od1twentyone)/8);
			if (member.twentytwo == 1)
				member.valtwentytwo = Number(member.twentytwo) + (Number(member.od1twentytwo)/8);
			if (member.twentythree == 1)
				member.valtwentythree = Number(member.twentythree) + (Number(member.od1twentythree)/8);
			if (member.twentyfour == 1)
				member.valtwentyfour = Number(member.twentyfour) + (Number(member.od1twentyfour)/8);
			if (member.twentyfive == 1)
				member.valtwentyfive = Number(member.twentyfive) + (Number(member.od1twentyfive)/8);
			if (member.twentysix == 1)
				member.valtwentysix = Number(member.twentysix) + (Number(member.od1twentysix)/8);
			if (member.twentyseven == 1)
				member.valtwentyseven = Number(member.twentyseven) + (Number(member.od1twentyseven)/8);
			if (member.twentyeight == 1)
				member.valtwentyeight = Number(member.twentyeight) + (Number(member.od1twentyeight)/8);
			if (member.twentynine == 1)
				member.valtwentynine = Number(member.twentynine) + (Number(member.od1twentynine)/8);
			if (member.thirty == 1)
				member.valthirty = Number(member.thirty) + (Number(member.od1thirty)/8);
			if (Number(member.thirtyone) == 1)
				member.valthirtyone = Number(member.thirtyone) + (Number(member.od1thirtyone)/8);
			member.pdays = Number(PresentItems);
			member.othours = parseFloat(od1Items);
			member.od1Items = parseFloat(od1Items);
		}
		
		else {
			if (Number(selectattendance) == 1 && Number(member.memberid) == Number(memberid)) {
				if(Number(selectedatt)) {
					PresentItems += (Number(member.one) == 1) ? 1 : 0;
					PresentItems += (Number(member.two) == 1) ? 1 : 0;
					PresentItems += (Number(member.three) == 1) ? 1 : 0;
					PresentItems += (Number(member.four) == 1) ? 1 : 0;
					PresentItems += (Number(member.five) == 1) ? 1 : 0;
					PresentItems += (Number(member.six) == 1) ? 1 : 0;
					PresentItems += (Number(member.seven) == 1) ? 1 : 0;
					PresentItems += (Number(member.eight) == 1) ? 1 : 0;
					PresentItems += (Number(member.nine) == 1) ? 1 : 0;
					PresentItems += (Number(member.ten) == 1) ? 1 : 0;
					PresentItems += (Number(member.eleven) == 1) ? 1 : 0;
					PresentItems += (Number(member.twelve) == 1) ? 1 : 0;
					PresentItems += (Number(member.thirteen) == 1) ? 1 : 0;
					PresentItems += (Number(member.fourteen) == 1) ? 1 : 0;
					PresentItems += (Number(member.fifteen) == 1) ? 1 : 0;
					PresentItems += (Number(member.sixteen) == 1) ? 1 : 0;
					PresentItems += (Number(member.seventeen) == 1) ? 1 : 0;
					PresentItems += (Number(member.eighteen) == 1) ? 1 : 0;
					PresentItems += (Number(member.nineteen) == 1) ? 1 : 0;
					PresentItems += (Number(member.twenty) == 1) ? 1 : 0;
					PresentItems += (Number(member.twentyone) == 1) ? 1 : 0;
					PresentItems += (Number(member.twentytwo) == 1) ? 1 : 0;
					PresentItems += (Number(member.twentythree) == 1) ? 1 : 0;
					PresentItems += (Number(member.twentyfour) == 1) ? 1 : 0;
					PresentItems += (Number(member.twentyfive) == 1) ? 1 : 0;
					PresentItems += (Number(member.twentysix) == 1) ? 1 : 0;
					PresentItems += (Number(member.twentyseven) == 1) ? 1 : 0;
					if ($scope.noOfDays >= 28) {
						PresentItems += (Number(member.twentyeight) == 1) ? 1 : 0;
						if ($scope.noOfDays >= 29) {
							PresentItems += (Number(member.twentynine) == 1) ? 1 : 0;
							if ($scope.noOfDays >= 30) {
								PresentItems += (Number(member.thirty) == 1) ? 1 : 0;
								if ($scope.noOfDays >= 31) {
									PresentItems += (Number(member.thirtyone) == 1) ? 1 : 0;
								}
							}
						}
					}
					member.pdays = Number(PresentItems);
					if (Number(member.one) == 1)
						member.valone = 1	
					if (Number(member.two) == 1)
						member.valtwo = 1
					if (Number(member.three) == 1)
						member.valthree = 1
					if (Number(member.four) == 1)
						member.valfour = 1
					if (Number(member.five) == 1)
						member.valfive = 1
					if (Number(member.six) == 1)
						member.valsix = 1
					if (Number(member.seven) == 1)
						member.valseven = 1
					if (Number(member.eight) == 1)
						member.valeight = 1
					if (Number(member.nine) == 1)
						member.valnine = 1
					if (Number(member.ten) == 1)
						member.valten = 1
					if (Number(member.eleven) == 1)
						member.valeleven = 1
					if (Number(member.twelve) == 1)
						member.valtwelve = 1
					if (Number(member.thirteen) == 1)
						member.valthirteen = 1
					if (Number(member.fourteen) == 1)
						member.valfourteen = 1
					if (Number(member.fifteen) == 1)
						member.valfifteen = 1
					if (Number(member.sixteen) == 1)
						member.valsixteen = 1
					if (Number(member.seventeen) == 1)
						member.valseventeen = 1
					if (Number(member.eighteen) == 1)
						member.valeighteen = 1
					if (Number(member.nineteen) == 1)
						member.valnineteen = 1
					if (Number(member.twenty) == 1)
						member.valtwenty = 1
					if (Number(member.twentyone) == 1)
						member.valtwentyone = 1
					if (Number(member.twentytwo) == 1)
						member.valtwentytwo = 1
					if (Number(member.twentythree) == 1)
						member.valtwentythree = 1
					if (Number(member.twentyfour) == 1)
						member.valtwentyfour = 1
					if (Number(member.twentyfive) == 1)
						member.valtwentyfive = 1
					if (Number(member.twentysix) == 1)
						member.valtwentysix = 1
					if (Number(member.twentyseven) == 1)
						member.valtwentyseven = 1
					if ($scope.noOfDays >= 28) {
						if (Number(member.twentyeight) == 1)
							member.valtwentyeight = 1
					}
					if ($scope.noOfDays >= 29) {
						if (Number(member.twentynine) == 1)
							member.valtwentynine = 1
					}
					if ($scope.noOfDays >= 30) {
						if (Number(member.thirty) == 1)
							member.valthirty = 1
					}
					if ($scope.noOfDays >= 31) {
						if (Number(member.thirtyone) == 1)
							member.valthirtyone = 1
					}
					member.presentdays = Number(PresentItems);
					member.othours = 0;
					$scope.totaldays += Number(member.presentdays);
				} else {
					PresentItems += (Number(member.one) == 1) ? 1 : 0;
					PresentItems += (Number(member.two) == 1) ? 1 : 0;
					PresentItems += (Number(member.three) == 1) ? 1 : 0;
					PresentItems += (Number(member.four) == 1) ? 1 : 0;
					PresentItems += (Number(member.five) == 1) ? 1 : 0;
					PresentItems += (Number(member.six) == 1) ? 1 : 0;
					PresentItems += (Number(member.seven) == 1) ? 1 : 0;
					PresentItems += (Number(member.eight) == 1) ? 1 : 0;
					PresentItems += (Number(member.nine) == 1) ? 1 : 0;
					PresentItems += (Number(member.ten) == 1) ? 1 : 0;
					PresentItems += (Number(member.eleven) == 1) ? 1 : 0;
					PresentItems += (Number(member.twelve) == 1) ? 1 : 0;
					PresentItems += (Number(member.thirteen) == 1) ? 1 : 0;
					PresentItems += (Number(member.fourteen) == 1) ? 1 : 0;
					PresentItems += (Number(member.fifteen) == 1) ? 1 : 0;
					PresentItems += (Number(member.sixteen) == 1) ? 1 : 0;
					PresentItems += (Number(member.seventeen) == 1) ? 1 : 0;
					PresentItems += (Number(member.eighteen) == 1) ? 1 : 0;
					PresentItems += (Number(member.nineteen) == 1) ? 1 : 0;
					PresentItems += (Number(member.twenty) == 1) ? 1 : 0;
					PresentItems += (Number(member.twentyone) == 1) ? 1 : 0;
					PresentItems += (Number(member.twentytwo) == 1) ? 1 : 0;
					PresentItems += (Number(member.twentythree) == 1) ? 1 : 0;
					PresentItems += (Number(member.twentyfour) == 1) ? 1 : 0;
					PresentItems += (Number(member.twentyfive) == 1) ? 1 : 0;
					PresentItems += (Number(member.twentysix) == 1) ? 1 : 0;
					PresentItems += (Number(member.twentyseven) == 1) ? 1 : 0;
					if ($scope.noOfDays >= 28) {
						PresentItems += (Number(member.twentyeight) == 1) ? 1 : 0;
						if ($scope.noOfDays >= 29) {
							PresentItems += (Number(member.twentynine) == 1) ? 1 : 0;
							if ($scope.noOfDays >= 30) {
								PresentItems += (Number(member.thirty) == 1) ? 1 : 0;
								if ($scope.noOfDays >= 31) {
									PresentItems += (Number(member.thirtyone) == 1) ? 1 : 0;
								}
							}
						}
					}
					member.pdays = Number(PresentItems);
					if (Number(member.one) == 0) {
						member.valone = 0;
						member.od1one = 0;
						member.od2one = 0;
					}
					if (Number(member.two) == 0) {
						member.od1two = 0;
						member.od2two = 0;
						member.valtwo = 0;
					}
					if (Number(member.three) == 0) {
						member.valthree = 0;
						member.od1three = 0;
						member.od2three = 0;
					}
					if (Number(member.four) == 0) {
						member.valfour = 0;
						member.od1four = 0;
						member.od2four = 0;
					}	
					if (Number(member.five) == 0) {
						member.valfive = 0;
						member.od1five = 0;
						member.od2five = 0
					}	
					if (Number(member.six) == 0) {
						member.valsix = 0;
						member.od1six = 0;
						member.od2six = 0;
					}
					if (Number(member.seven) == 0) {
						member.valseven = 0;
						member.od1seven = 0;
						member.od2seven = 0;
					}
					if (Number(member.eight) == 0) {
						member.valeight = 0;
						member.od1eight = 0;
						member.od2eight = 0;
					}
					if (Number(member.nine) == 0) {
						member.valnine = 0;
						member.od1nine = 0;
						member.od2nine = 0;
					}
					if (Number(member.ten) == 0) {
						member.valten = 0;
						member.od1ten = 0;
						member.od2ten = 0;
					}	
					if (Number(member.eleven) == 0) {
						member.valeleven = 0;
						member.od1eleven = 0;
						member.od2eleven = 0;
					}
					if (Number(member.twelve) == 0) {
						member.valtwelve = 0;
						member.od1twelve = 0;
						member.od2twelve = 0;
					}
					if (Number(member.thirteen) == 0) {
						member.valthirteen = 0;
						member.od1thirteen = 0;
						member.od2thirteen = 0;
					}
					if (Number(member.fourteen) == 0) {
						member.valfourteen = 0;
						member.od1fourteen = 0;
						member.od2fourteen = 0;
					}
					if (Number(member.fifteen) == 0) {
						member.valfifteen = 0;
						member.od1fifteen = 0;
						member.od2fifteen = 0;
					}
					if (Number(member.sixteen) == 0) {
						member.valsixteen = 0;
						member.od1sixteen = 0;
						member.od2sixteen = 0;
					}	
					if (Number(member.seventeen) == 0) {
						member.od1seventeen = 0;
						member.od2seventeen = 0;
						member.valseventeen = 0
					}
					if (Number(member.eighteen) == 0) {
						member.valeighteen = 0;
						member.od1eighteen = 0;
						member.od2eighteen = 0;
					}
					if (Number(member.nineteen) == 0) {
						member.valnineteen = 0;
						member.od1nineteen = 0;
						member.od2nineteen = 0;
					}
					if (Number(member.twenty) == 0) {
						member.valtwenty = 0;
						member.od1twenty = 0;
						member.od2twenty = 0;
					}
					if (Number(member.twentyone) == 0) {
						member.valtwentyone = 0;
						member.od1twentyone = 0;
						member.od2twentyone = 0;
					}
					if (Number(member.twentytwo) == 0) {
						member.valtwentytwo = 0;
						member.od1twentytwo = 0;
						member.od2twentytwo = 0;
					}
					if (Number(member.twentythree) == 0) {
						member.valtwentythree = 0;
						member.od1twentythree = 0;
						member.od2twentythree = 0;
					}
					if (Number(member.twentyfour) == 0) {
						member.valtwentyfour = 0;
						member.od1twentyfour = 0;
						member.od2twentyfour = 0;
					}
					if (Number(member.twentyfive) == 0) {
						member.valtwentyfive = 0;
						member.od1twentyfive = 0;
						member.od2twentyfive = 0;
					}
					if (Number(member.twentysix) == 0) {
						member.valtwentysix = 0;
						member.od1twentysix = 0;
						member.od2twentysix = 0;
					}
					if (Number(member.twentyseven) == 0) {
						member.valtwentyseven = 0;
						member.od1twentyseven = 0;
						member.od2twentyseven = 0;
					}
					if ($scope.noOfDays >= 28) {
						if (Number(member.twentyeight) == 0) {
							member.valtwentyeight = 0;
							member.od1twentyeight = 0;
							member.od2twentyeight = 0;
						}	
					}
					if ($scope.noOfDays >= 29) {
						if (Number(member.twentynine) == 0) {
							member.od1twentynine = 0;
							member.valtwentynine = 0;
							member.od2twentynine = 0;
						}
					}
					if ($scope.noOfDays >= 30) {
						if (Number(member.thirty) == 0) {
							member.valthirty = 0;
							member.od1thirty = 0;
							member.od2thirty = 0;
						}	
					}
					if ($scope.noOfDays >= 31) {
						if (Number(member.thirtyone) == 0) {
							member.valthirtyone = 0;
							member.od1thirtyone = 0;
							member.od2thirtyone = 0;
						}
					}
					member.presentdays = Number(PresentItems);
					member.othours = 0;
					$scope.totaldays += Number(member.presentdays);
					od1Items = 0;
					od1Items += (member.od1one == 1) ? 1 : 0;
					od1Items += (member.od1two == 1) ? 1 : 0;
					od1Items += (member.od1three == 1) ? 1 : 0;
					od1Items += (member.od1four == 1) ? 1 : 0;
					od1Items += (member.od1five == 1) ? 1 : 0;
					od1Items += (member.od1six == 1) ? 1 : 0;
					od1Items += (member.od1seven == 1) ? 1 : 0;
					od1Items += (member.od1eight == 1) ? 1 : 0;
					od1Items += (member.od1nine == 1) ? 1 : 0;
					od1Items += (member.od1ten == 1) ? 1 : 0;
					od1Items += (member.od1eleven == 1) ? 1 : 0;
					od1Items += (member.od1twelve == 1) ? 1 : 0;
					od1Items += (member.od1thirteen == 1) ? 1 : 0;
					od1Items += (member.od1fourteen == 1) ? 1 : 0;
					od1Items += (member.od1fifteen == 1) ? 1 : 0;
					od1Items += (member.od1sixteen == 1) ? 1 : 0;
					od1Items += (member.od1seventeen == 1) ? 1 : 0;
					od1Items += (member.od1eighteen == 1) ? 1 : 0;
					od1Items += (member.od1nineteen == 1) ? 1 : 0;
					od1Items += (member.od1twenty == 1) ? 1 : 0;
					od1Items += (member.od1twentyone == 1) ? 1 : 0;
					od1Items += (member.od1twentytwo == 1) ? 1 : 0;
					od1Items += (member.od1twentythree == 1) ? 1 : 0;
					od1Items += (member.od1twentyfour == 1) ? 1 : 0;
					od1Items += (member.od1twentyfive == 1) ? 1 : 0;
					od1Items += (member.od1twentysix == 1) ? 1 : 0;
					od1Items += (member.od1twentyseven == 1) ? 1 : 0;
					if ($scope.noOfDays >= 28) {
						od1Items += (member.od1twentyeight == 1) ? 1 : 0;
					}
					if ($scope.noOfDays >= 29) {
						od1Items += (member.od1twentynine == 1) ? 1 : 0;
					}
					if ($scope.noOfDays >= 30) {
						od1Items += (member.od1thirty == 1) ? 1 : 0;
					}
					if ($scope.noOfDays >= 31) {
						od1Items += (member.od1thirtyone == 1) ? 1 : 0;
					}
					member.othours = parseFloat(od1Items);
					member.od1Items = od1Items;
					od2Items = 0;
					od2Items += (member.od2one == 1) ? 1 : 0;
					od2Items += (member.od2two == 1) ? 1 : 0;
					od2Items += (member.od2three == 1) ? 1 : 0;
					od2Items += (member.od2four == 1) ? 1 : 0;
					od2Items += (member.od2five == 1) ? 1 : 0;
					od2Items += (member.od2six == 1) ? 1 : 0;
					od2Items += (member.od2seven == 1) ? 1 : 0;
					od2Items += (member.od2eight == 1) ? 1 : 0;
					od2Items += (member.od2nine == 1) ? 1 : 0;
					od2Items += (member.od2ten == 1) ? 1 : 0;
					od2Items += (member.od2eleven == 1) ? 1 : 0;
					od2Items += (member.od2twelve == 1) ? 1 : 0;
					od2Items += (member.od2thirteen == 1) ? 1 : 0;
					od2Items += (member.od2fourteen == 1) ? 1 : 0;
					od2Items += (member.od2fifteen == 1) ? 1 : 0;
					od2Items += (member.od2sixteen == 1) ? 1 : 0;
					od2Items += (member.od2seventeen == 1) ? 1 : 0;
					od2Items += (member.od2eighteen == 1) ? 1 : 0;
					od2Items += (member.od2nineteen == 1) ? 1 : 0;
					od2Items += (member.od2twenty == 1) ? 1 : 0;
					od2Items += (member.od2twentyone == 1) ? 1 : 0;
					od2Items += (member.od2twentytwo == 1) ? 1 : 0;
					od2Items += (member.od2twentythree == 1) ? 1 : 0;
					od2Items += (member.od2twentyfour == 1) ? 1 : 0;
					od2Items += (member.od2twentyfive == 1) ? 1 : 0;
					od2Items += (member.od2twentysix == 1) ? 1 : 0;
					od2Items += (member.od2twentyseven == 1) ? 1 : 0;
					od2Items += (member.od2twentyeight == 1) ? 1 : 0;
					od2Items += (member.od2twentynine == 1) ? 1 : 0;
					od2Items += (member.od2thirty == 1) ? 1 : 0;
					od2Items += (member.od2thirtyone == 1) ? 1 : 0;
					if ($scope.noOfDays >= 28) {
						od2Items += (member.od2twentyeight == 1) ? 1 : 0;
					}
					if ($scope.noOfDays >= 29) {
						od2Items += (member.od2twentynine == 1) ? 1 : 0;
					}
					if ($scope.noOfDays >= 30) {
						od2Items += (member.od2thirty == 1) ? 1 : 0;
					}
					if ($scope.noOfDays >= 31) {
						od2Items += (member.od2thirtyone == 1) ? 1 : 0;
					}
					member.od2Items = od2Items;
				}
			} 	
		}
	}

    $scope.model = {};
    $scope.model.SelectItems = false;
    $scope.fieldDisabled = true;
    $scope.changeFunction = function(members) {	
        watchFunction(members);
    }
    $scope.changeFunctions = function(members) {	
        if ($('#SelectItems').is(':checked')) {
            watchFunctions(members);
        }else{
            watchFunction(members);
        }
    }
    

    var watchFunction = function(members) {	
        $scope.loading=true;
        $scope.count = [];
        $scope.values = {};
        var totaldays = 0;
        var totalhours = 0;
        var PresentItems = 0;
        var od1Items = 0;
        var od2Items = 0;
        $scope.selectedMembers =[];
        angular.forEach(members, function(member) {
            if((Number(member.selectattendance))==1) {
                if((Number(member.one)) == 0 ) {  member.od1one = 0; }
                if((Number(member.two)) == 0 ) {  member.od1two = 0; }
                if((Number(member.three)) == 0 ) {  member.od1three = 0; }
                if((Number(member.four)) == 0 ) {  member.od1four = 0; }
                if((Number(member.five)) == 0 ) {  member.od1five = 0; }
                if((Number(member.six)) == 0 ) {  member.od1six = 0; }
                if((Number(member.seven)) == 0 ) {  member.od1seven = 0; }
                if((Number(member.eight)) == 0 ) {  member.od1eight = 0; }
                if((Number(member.nine)) == 0 ) {  member.od1nine = 0; }
                if((Number(member.ten)) == 0 ) {  member.od1ten = 0; }
                if((Number(member.eleven)) == 0 ) {  member.od1eleven = 0; }
                if((Number(member.twelve)) == 0 ) {  member.od1twelve = 0; }
                if((Number(member.thirteen)) == 0 ) {  member.od1thirteen = 0; }
                if((Number(member.fourteen)) == 0 ) {  member.od1fourteen = 0; }
                if((Number(member.fifteen)) == 0 ) {  member.od1fifteen = 0; }
                if((Number(member.sixteen)) == 0 ) {  member.od1sixteen = 0; }
                if((Number(member.seventeen)) == 0 ) {  member.od1seventeen = 0; }
                if((Number(member.eighteen)) == 0 ) {  member.od1eighteen = 0; }
                if((Number(member.nineteen)) == 0 ) {  member.od1nineteen = 0; }
                if((Number(member.twenty)) == 0 ) {  member.od1twenty = 0; }
                if((Number(member.twentyone)) == 0 ) {  member.od1twentyone = 0; }
                if((Number(member.twentytwo)) == 0 ) {  member.od1twentytwo = 0; }
                if((Number(member.twentythree)) == 0 ) {  member.od1twentythree = 0; }
                if((Number(member.twentyfour)) == 0 ) {  member.od1twentyfour = 0; }
                if((Number(member.twentyfive)) == 0 ) {  member.od1twentyfive = 0; }
                if((Number(member.twentysix)) == 0 ) {  member.od1twentysix = 0; }
                if((Number(member.twentyseven)) == 0 ) {  member.od1twentyseven = 0; }
                if((Number(member.twentyeight)) == 0 ) {  member.od1twentyeight = 0; }
                if((Number(member.twentynine)) == 0 ) {  member.od1twentynine = 0; }
                if((Number(member.thirty)) == 0 ) {  member.od1thirty = 0; }
                if((Number(member.thirtyone)) == 0 ) {  member.od1thirtyone = 0; }
                PresentItems += (Number(member.one) == 1) ? 1 : 0;
                PresentItems += (Number(member.two) == 1) ? 1 : 0;
                PresentItems += (Number(member.three) == 1) ? 1 : 0;
                PresentItems += (Number(member.four) == 1) ? 1 : 0;
                PresentItems += (Number(member.five) == 1) ? 1 : 0;
                PresentItems += (Number(member.six) == 1) ? 1 : 0;
                PresentItems += (Number(member.seven) == 1) ? 1 : 0;
                PresentItems += (Number(member.eight) == 1) ? 1 : 0;
                PresentItems += (Number(member.nine) == 1) ? 1 : 0;
                PresentItems += (Number(member.ten) == 1) ? 1 : 0;
                PresentItems += (Number(member.eleven) == 1) ? 1 : 0;
                PresentItems += (Number(member.twelve) == 1) ? 1 : 0;
                PresentItems += (Number(member.thirteen) == 1) ? 1 : 0;
                PresentItems += (Number(member.fourteen) == 1) ? 1 : 0;
                PresentItems += (Number(member.fifteen) == 1) ? 1 : 0;
                PresentItems += (Number(member.sixteen) == 1) ? 1 : 0;
                PresentItems += (Number(member.seventeen) == 1) ? 1 : 0;
                PresentItems += (Number(member.eighteen) == 1) ? 1 : 0;
                PresentItems += (Number(member.nineteen) == 1) ? 1 : 0;
                PresentItems += (Number(member.twenty) == 1) ? 1 : 0;
                PresentItems += (Number(member.twentyone) == 1) ? 1 : 0;
                PresentItems += (Number(member.twentytwo) == 1) ? 1 : 0;
                PresentItems += (Number(member.twentythree) == 1) ? 1 : 0;
                PresentItems += (Number(member.twentyfour) == 1) ? 1 : 0;
                PresentItems += (Number(member.twentyfive) == 1) ? 1 : 0;
                PresentItems += (Number(member.twentysix) == 1) ? 1 : 0;
                PresentItems += (Number(member.twentyseven) == 1) ? 1 : 0;
                if($scope.noOfDays>=28){
                    PresentItems += (Number(member.twentyeight) == 1) ? 1 : 0;
                    if($scope.noOfDays>=29){
                        PresentItems += (Number(member.twentynine) == 1) ? 1 : 0;
                        if($scope.noOfDays>=30){
                            PresentItems += (Number(member.thirty) == 1) ? 1 : 0;
                            if($scope.noOfDays>=31){
                                PresentItems += (Number(member.thirtyone) == 1) ? 1 : 0;
                            }
                        }
                    }
                }
                if (member.jobcode != 'DVR') {
                    od1Items += (member.od1one == 1) ? 1 : 0;
                    // if(member.od1one == 0){
                    //     member.od2one = 0;
                    // }
                    od1Items += (member.od1two == 1) ? 1 : 0;
                    // if(member.od1two == 0){
                    //     member.od2two = 0;
                    // }
                    od1Items += (member.od1three == 1) ? 1 : 0;
                    // if(member.od1three == 0){
                    //     member.od2three = 0;
                    // }
                    od1Items += (member.od1four == 1) ? 1 : 0;
                    // if(member.od1four == 0){
                    //     member.od2four = 0;
                    // }
                    od1Items += (member.od1five == 1) ? 1 : 0;
                    // if(member.od1five == 0){
                    //     member.od2five = 0;
                    // }
                    od1Items += (member.od1six == 1) ? 1 : 0;
                    // if(member.od1six == 0){
                    //     member.od2six = 0;
                    // }
                    od1Items += (member.od1seven == 1) ? 1 : 0;
                    // if(member.od1seven == 0){
                    //     member.od2seven = 0;
                    // }
                    od1Items += (member.od1eight == 1) ? 1 : 0;
                    // if(member.od1eight == 0){
                    //     member.od2eight = 0;
                    // }
                    od1Items += (member.od1nine == 1) ? 1 : 0;
                    // if(member.od1nine == 0){
                    //     member.od2nine = 0;
                    // }
                    od1Items += (member.od1ten == 1) ? 1 : 0;
                    // if(member.od1ten == 0){
                    //     member.od2ten = 0;
                    // }
                    od1Items += (member.od1eleven == 1) ? 1 : 0;
                    // if(member.od1eleven == 0){
                    //     member.od2eleven = 0;
                    // }
                    od1Items += (member.od1twelve == 1) ? 1 : 0;
                    // if(member.od1twelve == 0){
                    //     member.od2twelve = 0;
                    // }
                    od1Items += (member.od1thirteen == 1) ? 1 : 0;
                    // if(member.od1thirteen==0){
                    //     member.od2thirteen=0;
                    // }
                    od1Items += (member.od1fourteen == 1) ? 1 : 0;
                    // if(member.od1fourteen==0){
                    //     member.od2fourteen=0;
                    // }
                    od1Items += (member.od1fifteen == 1) ? 1 : 0;
                    // if(member.od1fifteen==0){
                    //     member.od2fifteen=0;
                    // }
                    od1Items += (member.od1sixteen == 1) ? 1 : 0;
                    // if(member.od1sixteen==0){
                    //     member.od2sixteen=0;
                    // }
                    od1Items += (member.od1seventeen == 1) ? 1 : 0;
                    // if(member.od1seventeen==0){
                    //     member.od2seventeen=0;
                    // }
                    od1Items += (member.od1eighteen == 1) ? 1 : 0;
                    // if(member.od1eighteen==0){
                    //     member.od2eighteen=0;
                    // }
                    od1Items += (member.od1nineteen == 1) ? 1 : 0;
                    // if(member.od1nineteen==0){
                    //     member.od2nineteen=0;
                    // }
                    od1Items += (member.od1twenty == 1) ? 1 : 0;
                    // if(member.od1twenty==0){
                    //     member.od2twenty=0;
                    // }
                    od1Items += (member.od1twentyone == 1) ? 1 : 0;
                    // if(member.od1twentyone==0){
                    //     member.od2twentyone=0;
                    // }
                    od1Items += (member.od1twentytwo == 1) ? 1 : 0;
                    // if(member.od1twentytwo==0){
                    //     member.od2twentytwo=0;
                    // }
                    od1Items += (member.od1twentythree == 1) ? 1 : 0;
                    // if(member.od1twentythree==0){
                    //     member.od2twentythree=0;
                    // }
                    od1Items += (member.od1twentyfour == 1) ? 1 : 0;
                    // if(member.od1twentyfour==0){
                    //     member.od2twentyfour=0;
                    // }
                    od1Items += (member.od1twentyfive == 1) ? 1 : 0;
                    // if(member.od1twentyfive==0){
                    //     member.od2twentyfive=0;
                    // }
                    od1Items += (member.od1twentysix == 1) ? 1 : 0;
                    // if(member.od1twentysix==0){
                    //     member.od2twentysix=0;
                    // }
                    od1Items += (member.od1twentyseven == 1) ? 1 : 0;
                    // if(member.od1twentyseven==0){
                    //     member.od2twentyseven=0;
                    // }
                    if($scope.noOfDays>=28){
                    od1Items += (member.od1twentyeight == 1) ? 1 : 0;
                    }
                    // if(member.od1twentyeight==0){
                    //     member.od2twentyeight=0;
                    // }
                    if($scope.noOfDays>=29){
                    od1Items += (member.od1twentynine == 1) ? 1 : 0;
                    }
                    // if(member.od1twentynine==0){
                    //     member.od2twentynine=0;
                    // }
                    if($scope.noOfDays>=30){
                        od1Items += (member.od1thirty == 1) ? 1 : 0;
                    }
                    // if(member.od1thirty==0){
                    //     member.od2thirty=0;
                    // }
                    if($scope.noOfDays>=31){
                        od1Items += (member.od1thirtyone == 1) ? 1 : 0;
                    }
                    // if(member.od1thirtyone==0){
                    //     member.od2thirtyone=0;
                    // }
                } else {
                    if(member.one=="0"){
                        od1Items += 0;	
                    }
                    else if(member.one=="1"){
                        od1Items += (Number(member.od1one) / 8);
                    }	
                    od1Items += (Number(member.od1two) / 8);
                    od1Items += (Number(member.od1three) / 8);
                    od1Items += (Number(member.od1four) / 8);
                    od1Items += (Number(member.od1five) / 8);
                    od1Items += (Number(member.od1six) / 8);
                    od1Items += (Number(member.od1seven) / 8);
                    od1Items += (Number(member.od1eight) / 8);
                    od1Items += (Number(member.od1nine) / 8);
                    od1Items += (Number(member.od1ten) / 8);
                    od1Items += (Number(member.od1eleven) / 8);
                    od1Items += (Number(member.od1twelve) / 8);
                    od1Items += (Number(member.od1thirteen) / 8);
                    od1Items += (Number(member.od1fourteen) / 8);
                    od1Items += (Number(member.od1fifteen) / 8);
                    od1Items += (Number(member.od1sixteen) / 8);
                    od1Items += (Number(member.od1seventeen) / 8);
                    od1Items += (Number(member.od1eighteen) / 8);
                    od1Items += (Number(member.od1nineteen) / 8);
                    od1Items += (Number(member.od1twenty) / 8);
                    od1Items += (Number(member.od1twentyone) / 8);
                    od1Items += (Number(member.od1twentytwo) / 8);
                    od1Items += (Number(member.od1twentythree) / 8);
                    od1Items += (Number(member.od1twentyfour) / 8);
                    od1Items += (Number(member.od1twentyfive) / 8);
                    od1Items += (Number(member.od1twentysix) / 8);
                    od1Items += (Number(member.od1twentyseven) / 8);
                    od1Items += (Number(member.od1twentyeight) / 8);
                    od1Items += (Number(member.od1twentynine) / 8);
                    od1Items += (Number(member.od1thirty) / 8);
                    od1Items += (Number(member.od1thirtyone) / 8);            
                    od1Items = Number(od1Items).toFixed(2);
                }
                od2Items += (member.od2one == .5) ? .5 : 0;
                od2Items += (member.od2two == .5) ? .5 : 0;
                od2Items += (member.od2three == .5) ? .5 : 0;
                od2Items += (member.od2four == .5) ? .5 : 0;
                od2Items += (member.od2five == .5) ? .5 : 0;
                od2Items += (member.od2six == .5) ? .5 : 0;
                od2Items += (member.od2seven == .5) ? .5 : 0;
                od2Items += (member.od2eight == .5) ? .5 : 0;
                od2Items += (member.od2nine == .5) ? .5 : 0;
                od2Items += (member.od2ten == .5) ? .5 : 0;
                od2Items += (member.od2eleven == .5) ? .5 : 0;
                od2Items += (member.od2twelve == .5) ? .5 : 0;
                od2Items += (member.od2thirteen == .5) ? .5 : 0;
                od2Items += (member.od2fourteen == .5) ? .5 : 0;
                od2Items += (member.od2fifteen == .5) ? .5 : 0;
                od2Items += (member.od2sixteen == .5) ? .5 : 0;
                od2Items += (member.od2seventeen == .5) ? .5 : 0;
                od2Items += (member.od2eighteen == .5) ? .5 : 0;
                od2Items += (member.od2nineteen == .5) ? .5 : 0;
                od2Items += (member.od2twenty == .5) ? .5 : 0;
                od2Items += (member.od2twentyone == .5) ? .5 : 0;
                od2Items += (member.od2twentytwo == .5) ? .5 : 0;
                od2Items += (member.od2twentythree == .5) ? .5 : 0;
                od2Items += (member.od2twentyfour == .5) ? .5 : 0;
                od2Items += (member.od2twentyfive == .5) ? .5 : 0;
                od2Items += (member.od2twentysix == .5) ? .5 : 0;
                od2Items += (member.od2twentyseven == .5) ? .5 : 0;
                od2Items += (member.od2twentyeight == .5) ? .5 : 0;
                od2Items += (member.od2twentynine == .5) ? .5 : 0;
                od2Items += (member.od2thirty == .5) ? .5 : 0;
                od2Items += (member.od2thirtyone == .5) ? .5 : 0;
      // console.log(member.valone+member.texcono);
                if (member.jobcode != 'DVR') {
                    if (Number(member.one) == 1)
                        member.valone = 1
                    if (member.od1one == 1)
                        member.valone += 1
                    if (member.od2one == .5)
                        member.valone +=.5
                    if (Number(member.one) == 0)
                        member.valone = 0

                   if (Number(member.two) == 1)
                        member.valtwo = 1
                    if (member.od1two == 1)
                        member.valtwo += 1
                    if (member.od2two == .5 )
                        member.valtwo +=.5
                    if (Number(member.two) == 0)
                        member.valtwo = 0

                    if (Number(member.three) == 1)
                        member.valthree = 1
                    if (member.od1three == 1)
                        member.valthree += 1
                    if (member.od2three == .5)
                        member.valthree +=.5
                    if (Number(member.three) == 0)
                        member.valthree = 0

                    if (Number(member.four) == 1)
                        member.valfour = 1
                    if (member.od1four == 1)
                        member.valfour += 1
                    if (member.od2four == .5)
                        member.valfour +=.5
                    if (Number(member.four) == 0)
                        member.valfour = 0

                    if (Number(member.five) == 1)
                        member.valfive = 1
                    if (member.od1five == 1)
                        member.valfive += 1
                    if (member.od2five == .5)
                        member.valfive +=.5
                    if (Number(member.five) == 0)
                        member.valfive = 0

                    if (Number(member.six) == 1)
                        member.valsix = 1
                    if (member.od1six == 1)
                        member.valsix += 1
                    if (member.od2six == .5)
                        member.valsix +=.5
                    if (Number(member.six) == 0)
                        member.valsix = 0

                    if (Number(member.seven) == 1)
                        member.valseven = 1
                    if (member.od1seven == 1)
                        member.valseven += 1
                    if (member.od2seven == .5)
                        member.valseven +=.5
                    if (Number(member.seven) == 0)
                        member.valseven = 0

                    if (Number(member.eight) == 1)
                        member.valeight = 1
                    if (member.od1eight == 1)
                        member.valeight += 1
                    if (member.od2eight == .5)
                        member.valeight +=.5
                    if (Number(member.eight) == 0)
                        member.valeight = 0

                    if (Number(member.nine) == 1)
                        member.valnine = 1
                    if (member.od1nine == 1)
                        member.valnine += 1
                    if (member.od2nine == .5)
                        member.valnine +=.5
                    if (Number(member.nine) == 0)
                        member.valnine = 0

                    if (Number(member.ten) == 1)
                        member.valten = 1
                    if (member.od1ten == 1)
                        member.valten += 1
                    if (member.od2ten == .5)
                        member.valten +=.5
                    if (Number(member.ten) == 0)
                        member.valten = 0

                    if (Number(member.eleven)== 1)
                        member.valeleven = 1
                    if (member.od1eleven == 1)
                        member.valeleven += 1
                    if (member.od2eleven == .5)
                        member.valeleven +=.5
                    if (Number(member.eleven) == 0)
                        member.valeleven = 0

                    if (Number(member.twelve) == 1)
                        member.valtwelve = 1
                    if (member.od1twelve == 1)
                        member.valtwelve += 1
                    if (member.od2twelve == .5)
                        member.valtwelve +=.5
                    if (Number(member.twelve) == 0)
                        member.valtwelve = 0

                    if (Number(member.thirteen) == 1)
                        member.valthirteen = 1
                    if (member.od1thirteen == 1)
                        member.valthirteen += 1
                    if (member.od2thirteen == .5)
                        member.valthirteen +=.5
                    if (Number(member.thirteen) == 0)
                        member.valthirteen = 0

                    if (Number(member.fourteen) == 1)
                        member.valfourteen = 1
                    if (member.od1fourteen == 1)
                        member.valfourteen += 1
                    if (member.od2fourteen == .5)
                        member.valfourteen +=.5
                    if (Number(member.fourteen) == 0)
                        member.valfourteen = 0

                    if (Number(member.fifteen) == 1)
                        member.valfifteen = 1
                    if (member.od1fifteen == 1)
                        member.valfifteen += 1
                    if (member.od2fifteen == .5)
                        member.valfifteen +=.5
                    if (Number(member.fifteen) == 0)
                        member.valfifteen = 0

                    if (Number(member.sixteen) == 1)
                        member.valsixteen = 1
                    if (member.od1sixteen == 1)
                        member.valsixteen += 1
                    if (member.od2sixteen == .5)
                        member.valsixteen +=.5
                    if (Number(member.sixteen) == 0)
                        member.valsixteen = 0

                    if (Number(member.seventeen) == 1)
                        member.valseventeen = 1
                    if (member.od1seventeen == 1)
                        member.valseventeen += 1
                    if (member.od2seventeen == .5)
                        member.valseventeen +=.5
                    if (Number(member.seventeen) == 0)
                        member.valseventeen = 0

                    if (Number(member.eighteen) == 1)
                        member.valeighteen = 1
                    if (member.od1eighteen == 1)
                        member.valeighteen += 1
                    if (member.od2eighteen == .5)
                        member.valeighteen +=.5
                    if (Number(member.eighteen) == 0)
                        member.valeighteen = 0

                    if (Number(member.nineteen) == 1)
                        member.valnineteen = 1
                    if (member.od1nineteen == 1)
                        member.valnineteen += 1
                    if (member.od2nineteen == .5)
                        member.valnineteen +=.5
                    if (Number(member.nineteen) == 0)
                        member.valnineteen = 0

                    if (Number(member.twenty) == 1)
                        member.valtwenty = 1
                    if (member.od1twenty == 1)
                        member.valtwenty += 1
                    if (member.od2twenty == .5)
                        member.valtwenty +=.5
                    if (Number(member.twenty) == 0)
                        member.valtwenty = 0

                    if (Number(member.twentyone) == 1)
                        member.valtwentyone = 1
                    if (member.od1twentyone == 1)
                        member.valtwentyone += 1
                    if (member.od2twentyone == .5)
                        member.valtwentyone +=.5
                    if (Number(member.twentyone) == 0)
                        member.valtwentyone = 0

                    if (Number(member.twentytwo) == 1)
                        member.valtwentytwo = 1
                    if (member.od1twentytwo == 1)
                        member.valtwentytwo += 1
                    if (member.od2twentytwo == .5)
                        member.valtwentytwo +=.5
                    if (Number(member.twentytwo) == 0)
                        member.valtwentytwo = 0

                    if (Number(member.twentythree) == 1)
                        member.valtwentythree = 1
                    if (member.od1twentythree == 1)
                        member.valtwentythree += 1
                    if (member.od2twentythree == .5)
                        member.valtwentythree +=.5
                    if (Number(member.twentythree) == 0)
                        member.valtwentythree = 0

                    if (Number(member.twentyfour) == 1)
                        member.valtwentyfour = 1
                    if (member.od1twentyfour == 1)
                        member.valtwentyfour += 1
                    if (member.od2twentyfour == .5)
                        member.valtwentyfour +=.5
                    if (Number(member.twentyfour) == 0)
                        member.valtwentyfour = 0

                    if (Number(member.twentyfive) == 1)
                        member.valtwentyfive = 1
                    if (member.od1twentyfive == 1)
                        member.valtwentyfive += 1
                    if (member.od2twentyfive == .5)
                        member.valtwentyfive +=.5
                    if (Number(member.twentyfive) == 0)
                        member.valtwentyfive = 0

                    if (Number(member.twentysix) == 1)
                        member.valtwentysix = 1
                    if (member.od1twentysix == 1)
                        member.valtwentysix += 1
                    if (member.od2twentysix == .5)
                        member.valtwentysix +=.5
                    if (Number(member.twentysix) == 0)
                        member.valtwentysix = 0

                    if (Number(member.twentyseven) == 1)
                        member.valtwentyseven = 1
                    if (member.od1twentyseven == 1)
                        member.valtwentyseven += 1
                    if (member.od2twentyseven == .5)
                        member.valtwentyseven +=.5  
                    if (Number(member.twentyseven) == 0)
                        member.valtwentyseven = 0

                    if($scope.noOfDays>=28){
                        if (Number(member.twentyeight) == 1)
                            member.valtwentyeight = 1
                        if (member.od1twentyeight == 1)
                            member.valtwentyeight += 1
                        if (member.od2twentyeight == .5)
                            member.valtwentyeight +=.5
                        if (Number(member.twentyeight) == 0)
                            member.valtwentyeight = 0
                    }
                    if($scope.noOfDays>=29){
                        if (Number(member.twentynine) == 1)
                            member.valtwentynine = 1
                        if (member.od1twentynine == 1)
                            member.valtwentynine += 1
                        if (member.od2twentynine == .5)
                            member.valtwentynine +=.5
                        if (Number(member.twentynine) == 0)
                            member.valtwentynine = 0
                    }
                    if($scope.noOfDays>=30){
                        if (Number(member.thirty) == 1)
                            member.valthirty = 1
                        if (member.od1thirty == 1)
                            member.valthirty += 1
                        if (member.od2thirty == .5)
                            member.valthirty +=.5
                        if (Number(member.thirty) == 0)
                            member.valthirty = 0
                    }
                    if($scope.noOfDays>=31){
                        if (Number(member.thirtyone) == 1)
                            member.valthirtyone = 1
                        if (member.od1thirtyone == 1)
                            member.valthirtyone += 1
                        if (member.od2thirtyone == .5)
                            member.valthirtyone +=.5
                        if (Number(member.thirtyone) == 0)
                            member.valthirtyone = 0
                    }
                    member.pdays = Number(PresentItems);
                    member.presentdays = Number(PresentItems) + Number(od1Items) + Number(od2Items);
                    member.othours = 0;
                    member.presentdays.toFixed(2);
                    $scope.totaldays += Number(member.presentdays) / 2;
                } else {
                    if (member.one == 1)					
                        member.valone = Number(member.one) + (Number(member.od1one) / 8);
                        
                    if (member.two == 1)
                        member.valtwo = Number(member.two) + (Number(member.od1two) / 8);

                    if (member.three == 1)
                        member.valthree = Number(member.three) + (Number(member.od1three) / 8);

                    if (member.four == 1)
                        member.valfour = Number(member.four) + (Number(member.od1four) / 8);

                    if (member.five == 1)
                        member.valfive = Number(member.five) + (Number(member.od1five) / 8);

                    if (member.six == 1)
                        member.valsix = Number(member.six) + (Number(member.od1six) / 8);

                    if (member.seven == 1)
                        member.valseven = Number(member.seven) + (Number(member.od1seven) / 8);

                    if (member.eight == 1)
                        member.valeight = Number(member.eight) + (Number(member.od1eight) / 8);

                    if (member.nine == 1)
                        member.valnine = Number(member.nine) + (Number(member.od1nine) / 8);

                    if (member.ten == 1)
                        member.valten = Number(member.ten) + (Number(member.od1ten) / 8);

                    if (member.eleven == 1)
                        member.valeleven = Number(member.eleven) + (Number(member.od1eleven) / 8);

                    if (member.twelve == 1)
                        member.valtwelve = Number(member.twelve) + (Number(member.od1twelve) / 8);

                    if (member.thirteen == 1)
                        member.valthirteen = Number(member.thirteen) + (Number(member.od1thirteen) / 8);

                    if (member.fourteen == 1)
                        member.valfourteen = Number(member.fourteen) + (Number(member.od1fourteen) / 8);

                    if (member.fifteen == 1)
                        member.valfifteen = Number(member.fifteen) + (Number(member.od1fifteen) / 8);

                    if (member.sixteen == 1)
                        member.valsixteen = Number(member.sixteen) + (Number(member.od1sixteen) / 8);

                    if (member.seventeen == 1)
                        member.valseventeen = Number(member.seventeen) + (Number(member.od1seventeen) / 8);

                    if (member.eighteen == 1)
                        member.valeighteen = Number(member.eighteen) + (Number(member.od1eighteen) / 8);

                    if (member.nineteen == 1)
                        member.valnineteen = Number(member.nineteen) + (Number(member.od1nineteen) / 8);

                    if (member.twenty == 1)
                        member.valtwenty = Number(member.twenty) + (Number(member.od1twenty) / 8);

                    if (member.twentyone == 1)
                        member.valtwentyone = Number(member.twentyone) + (Number(member.od1twentyone) / 8);

                    if (member.twentytwo == 1)
                        member.valtwentytwo = Number(member.twentytwo) + (Number(member.od1twentytwo) / 8);

                    if (member.twentythree == 1)
                        member.valtwentythree = Number(member.twentythree) + (Number(member.od1twentythree) / 8);

                    if (member.twentyfour == 1)
                        member.valtwentyfour = Number(member.twentyfour) + (Number(member.od1twentyfour) / 8);

                    if (member.twentyfive == 1)
                        member.valtwentyfive = Number(member.twentyfive) + (Number(member.od1twentyfive) / 8);

                    if (member.twentysix == 1)
                        member.valtwentysix = Number(member.twentysix) + (Number(member.od1twentysix) / 8);

                    if (member.twentyseven == 1)
                        member.valtwentyseven = Number(member.twentyseven) + (Number(member.od1twentyseven) / 8);

                    if (member.twentyeight == 1)
                        member.valtwentyeight = Number(member.twentyeight) + (Number(member.od1twentyeight) / 8);

                    if (member.twentynine == 1)
                        member.valtwentynine = Number(member.twentynine) + (Number(member.od1twentynine) / 8);

                    if (member.thirty == 1)
                        member.valthirty = Number(member.thirty) + (Number(member.od1thirty) / 8);

                    if (Number(member.thirtyone) == 1)
                        member.valthirtyone = Number(member.thirtyone) + (Number(member.od1thirtyone) / 8);
                    member.pdays = Number(PresentItems);
                    member.presentdays = Number(PresentItems);
                    member.othours = parseFloat(od1Items);
                    $scope.totaldays = member.presentdays
                }
                member.od1Items = od1Items;
                member.od2Items = od2Items;
                PresentItems = 0;
                od1Items = 0;
                od2Items = 0;   
                $scope.selectedMembers.push(member);
            }
        })
        $scope.loading=false;
    };

    var watchFunctions = function(members) {	
        $scope.loading=true;
        $scope.count = [];
        $scope.values = {};
        var totaldays = 0;
        var totalhours = 0;
        var PresentItems = 0;
        var od1Items = 0;
        var od2Items = 0;
        $scope.selectedMembers =[];
        angular.forEach(members, function(member) {
            //console.log('member.selectattendance-memberid',member.selectattendance,'--',member.memberid);
            //if((Number(member.selectattendance))==1) {
                console.log('count.selectattendance-memberid',member.selectattendance,'--',member.memberid);
                if((Number(member.one)) == 0 ) {  member.od1one = 0; }
                if((Number(member.two)) == 0 ) {  member.od1two = 0; }
                if((Number(member.three)) == 0 ) {  member.od1three = 0; }
                if((Number(member.four)) == 0 ) {  member.od1four = 0; }
                if((Number(member.five)) == 0 ) {  member.od1five = 0; }
                if((Number(member.six)) == 0 ) {  member.od1six = 0; }
                if((Number(member.seven)) == 0 ) {  member.od1seven = 0; }
                if((Number(member.eight)) == 0 ) {  member.od1eight = 0; }
                if((Number(member.nine)) == 0 ) {  member.od1nine = 0; }
                if((Number(member.ten)) == 0 ) {  member.od1ten = 0; }
                if((Number(member.eleven)) == 0 ) {  member.od1eleven = 0; }
                if((Number(member.twelve)) == 0 ) {  member.od1twelve = 0; }
                if((Number(member.thirteen)) == 0 ) {  member.od1thirteen = 0; }
                if((Number(member.fourteen)) == 0 ) {  member.od1fourteen = 0; }
                if((Number(member.fifteen)) == 0 ) {  member.od1fifteen = 0; }
                if((Number(member.sixteen)) == 0 ) {  member.od1sixteen = 0; }
                if((Number(member.seventeen)) == 0 ) {  member.od1seventeen = 0; }
                if((Number(member.eighteen)) == 0 ) {  member.od1eighteen = 0; }
                if((Number(member.nineteen)) == 0 ) {  member.od1nineteen = 0; }
                if((Number(member.twenty)) == 0 ) {  member.od1twenty = 0; }
                if((Number(member.twentyone)) == 0 ) {  member.od1twentyone = 0; }
                if((Number(member.twentytwo)) == 0 ) {  member.od1twentytwo = 0; }
                if((Number(member.twentythree)) == 0 ) {  member.od1twentythree = 0; }
                if((Number(member.twentyfour)) == 0 ) {  member.od1twentyfour = 0; }
                if((Number(member.twentyfive)) == 0 ) {  member.od1twentyfive = 0; }
                if((Number(member.twentysix)) == 0 ) {  member.od1twentysix = 0; }
                if((Number(member.twentyseven)) == 0 ) {  member.od1twentyseven = 0; }
                if((Number(member.twentyeight)) == 0 ) {  member.od1twentyeight = 0; }
                if((Number(member.twentynine)) == 0 ) {  member.od1twentynine = 0; }
                if((Number(member.thirty)) == 0 ) {  member.od1thirty = 0; }
                if((Number(member.thirtyone)) == 0 ) {  member.od1thirtyone = 0; }
                PresentItems += (Number(member.one) == 1) ? 1 : 0;
                PresentItems += (Number(member.two) == 1) ? 1 : 0;
                PresentItems += (Number(member.three) == 1) ? 1 : 0;
                PresentItems += (Number(member.four) == 1) ? 1 : 0;
                PresentItems += (Number(member.five) == 1) ? 1 : 0;
                PresentItems += (Number(member.six) == 1) ? 1 : 0;
                PresentItems += (Number(member.seven) == 1) ? 1 : 0;
                PresentItems += (Number(member.eight) == 1) ? 1 : 0;
                PresentItems += (Number(member.nine) == 1) ? 1 : 0;
                PresentItems += (Number(member.ten) == 1) ? 1 : 0;
                PresentItems += (Number(member.eleven) == 1) ? 1 : 0;
                PresentItems += (Number(member.twelve) == 1) ? 1 : 0;
                PresentItems += (Number(member.thirteen) == 1) ? 1 : 0;
                PresentItems += (Number(member.fourteen) == 1) ? 1 : 0;
                PresentItems += (Number(member.fifteen) == 1) ? 1 : 0;
                PresentItems += (Number(member.sixteen) == 1) ? 1 : 0;
                PresentItems += (Number(member.seventeen) == 1) ? 1 : 0;
                PresentItems += (Number(member.eighteen) == 1) ? 1 : 0;
                PresentItems += (Number(member.nineteen) == 1) ? 1 : 0;
                PresentItems += (Number(member.twenty) == 1) ? 1 : 0;
                PresentItems += (Number(member.twentyone) == 1) ? 1 : 0;
                PresentItems += (Number(member.twentytwo) == 1) ? 1 : 0;
                PresentItems += (Number(member.twentythree) == 1) ? 1 : 0;
                PresentItems += (Number(member.twentyfour) == 1) ? 1 : 0;
                PresentItems += (Number(member.twentyfive) == 1) ? 1 : 0;
                PresentItems += (Number(member.twentysix) == 1) ? 1 : 0;
                PresentItems += (Number(member.twentyseven) == 1) ? 1 : 0;
                if($scope.noOfDays>=28){
                    PresentItems += (Number(member.twentyeight) == 1) ? 1 : 0;
                    if($scope.noOfDays>=29){
                        PresentItems += (Number(member.twentynine) == 1) ? 1 : 0;
                        if($scope.noOfDays>=30){
                            PresentItems += (Number(member.thirty) == 1) ? 1 : 0;
                            if($scope.noOfDays>=31){
                                PresentItems += (Number(member.thirtyone) == 1) ? 1 : 0;
                            }
                        }
                    }
                }
                if (member.jobcode != 'DVR') {
                    od1Items += (member.od1one == 1) ? 1 : 0;
                    if(member.od1one==0){
                        member.od2one=0;
                    }
                    od1Items += (member.od1two == 1) ? 1 : 0;
                    if(member.od1two==0){
                        member.od2two=0;
                    }
                    od1Items += (member.od1three == 1) ? 1 : 0;
                    if(member.od1three==0){
                        member.od2three=0;
                    }
                    od1Items += (member.od1four == 1) ? 1 : 0;
                    if(member.od1four==0){
                        member.od2four=0;
                    }
                    od1Items += (member.od1five == 1) ? 1 : 0;
                    if(member.od1five==0){
                        member.od2five=0;
                    }
                    od1Items += (member.od1six == 1) ? 1 : 0;
                    if(member.od1six==0){
                        member.od2six=0;
                    }
                    od1Items += (member.od1seven == 1) ? 1 : 0;
                    if(member.od1seven==0){
                        member.od2seven=0;
                    }
                    od1Items += (member.od1eight == 1) ? 1 : 0;
                    if(member.od1eight==0){
                        member.od2eight=0;
                    }
                    od1Items += (member.od1nine == 1) ? 1 : 0;
                    if(member.od1nine==0){
                        member.od2nine=0;
                    }
                    od1Items += (member.od1ten == 1) ? 1 : 0;
                    if(member.od1ten==0){
                        member.od2ten=0;
                    }
                    od1Items += (member.od1eleven == 1) ? 1 : 0;
                    if(member.od1eleven==0){
                        member.od2eleven=0;
                    }
                    od1Items += (member.od1twelve == 1) ? 1 : 0;
                    if(member.od1twelve==0){
                        member.od2twelve=0;
                    }
                    od1Items += (member.od1thirteen == 1) ? 1 : 0;
                    if(member.od1thirteen==0){
                        member.od2thirteen=0;
                    }
                    od1Items += (member.od1fourteen == 1) ? 1 : 0;
                    if(member.od1fourteen==0){
                        member.od2fourteen=0;
                    }
                    od1Items += (member.od1fifteen == 1) ? 1 : 0;
                    if(member.od1fifteen==0){
                        member.od2fifteen=0;
                    }
                    od1Items += (member.od1sixteen == 1) ? 1 : 0;
                    if(member.od1sixteen==0){
                        member.od2sixteen=0;
                    }
                    od1Items += (member.od1seventeen == 1) ? 1 : 0;
                    if(member.od1seventeen==0){
                        member.od2seventeen=0;
                    }
                    od1Items += (member.od1eighteen == 1) ? 1 : 0;
                    if(member.od1eighteen==0){
                        member.od2eighteen=0;
                    }
                    od1Items += (member.od1nineteen == 1) ? 1 : 0;
                    if(member.od1nineteen==0){
                        member.od2nineteen=0;
                    }
                    od1Items += (member.od1twenty == 1) ? 1 : 0;
                    if(member.od1twenty==0){
                        member.od2twenty=0;
                    }
                    od1Items += (member.od1twentyone == 1) ? 1 : 0;
                    if(member.od1twentyone==0){
                        member.od2twentyone=0;
                    }
                    od1Items += (member.od1twentytwo == 1) ? 1 : 0;
                    if(member.od1twentytwo==0){
                        member.od2twentytwo=0;
                    }
                    od1Items += (member.od1twentythree == 1) ? 1 : 0;
                    if(member.od1twentythree==0){
                        member.od2twentythree=0;
                    }
                    od1Items += (member.od1twentyfour == 1) ? 1 : 0;
                    if(member.od1twentyfour==0){
                        member.od2twentyfour=0;
                    }
                    od1Items += (member.od1twentyfive == 1) ? 1 : 0;
                    if(member.od1twentyfive==0){
                        member.od2twentyfive=0;
                    }
                    od1Items += (member.od1twentysix == 1) ? 1 : 0;
                    if(member.od1twentysix==0){
                        member.od2twentysix=0;
                    }
                    od1Items += (member.od1twentyseven == 1) ? 1 : 0;
                    if(member.od1twentyseven==0){
                        member.od2twentyseven=0;
                    }
                    if($scope.noOfDays>=28){
                    od1Items += (member.od1twentyeight == 1) ? 1 : 0;
                    }
                    if(member.od1twentyeight==0){
                        member.od2twentyeight=0;
                    }
                    if($scope.noOfDays>=29){
                    od1Items += (member.od1twentynine == 1) ? 1 : 0;
                    }
                    if(member.od1twentynine==0){
                        member.od2twentynine=0;
                    }
                    if($scope.noOfDays>=30){
                        od1Items += (member.od1thirty == 1) ? 1 : 0;
                    }
                    if(member.od1thirty==0){
                        member.od2thirty=0;
                    }
                    if($scope.noOfDays>=31){
                        od1Items += (member.od1thirtyone == 1) ? 1 : 0;
                    }
                    if(member.od1thirtyone==0){
                        member.od2thirtyone=0;
                    }
                } else {
                    if(member.one=="0"){
                        od1Items += 0;	
                    }
                    else if(member.one=="1"){
                        od1Items += (Number(member.od1one));
                    }	
                    od1Items += (Number(member.od1two));
                    od1Items += (Number(member.od1three));
                    od1Items += (Number(member.od1four));
                    od1Items += (Number(member.od1five));
                    od1Items += (Number(member.od1six));
                    od1Items += (Number(member.od1seven));
                    od1Items += (Number(member.od1eight));
                    od1Items += (Number(member.od1nine));
                    od1Items += (Number(member.od1ten));
                    od1Items += (Number(member.od1eleven));
                    od1Items += (Number(member.od1twelve));
                    od1Items += (Number(member.od1thirteen));
                    od1Items += (Number(member.od1fourteen));
                    od1Items += (Number(member.od1fifteen));
                    od1Items += (Number(member.od1sixteen));
                    od1Items += (Number(member.od1seventeen));
                    od1Items += (Number(member.od1eighteen));
                    od1Items += (Number(member.od1nineteen));
                    od1Items += (Number(member.od1twenty));
                    od1Items += (Number(member.od1twentyone));
                    od1Items += (Number(member.od1twentytwo));
                    od1Items += (Number(member.od1twentythree));
                    od1Items += (Number(member.od1twentyfour));
                    od1Items += (Number(member.od1twentyfive));
                    od1Items += (Number(member.od1twentysix));
                    od1Items += (Number(member.od1twentyseven));
                    od1Items += (Number(member.od1twentyeight));
                    od1Items += (Number(member.od1twentynine));
                    od1Items += (Number(member.od1thirty));
                    od1Items += (Number(member.od1thirtyone));            
                    od1Items = Number(od1Items).toFixed(2);
                }
                od2Items += (member.od2one == 1) ? 1 : 0;
                od2Items += (member.od2two == 1) ? 1 : 0;
                od2Items += (member.od2three == 1) ? 1 : 0;
                od2Items += (member.od2four == 1) ? 1 : 0;
                od2Items += (member.od2five == 1) ? 1 : 0;
                od2Items += (member.od2six == 1) ? 1 : 0;
                od2Items += (member.od2seven == 1) ? 1 : 0;
                od2Items += (member.od2eight == 1) ? 1 : 0;
                od2Items += (member.od2nine == 1) ? 1 : 0;
                od2Items += (member.od2ten == 1) ? 1 : 0;
                od2Items += (member.od2eleven == 1) ? 1 : 0;
                od2Items += (member.od2twelve == 1) ? 1 : 0;
                od2Items += (member.od2thirteen == 1) ? 1 : 0;
                od2Items += (member.od2fourteen == 1) ? 1 : 0;
                od2Items += (member.od2fifteen == 1) ? 1 : 0;
                od2Items += (member.od2sixteen == 1) ? 1 : 0;
                od2Items += (member.od2seventeen == 1) ? 1 : 0;
                od2Items += (member.od2eighteen == 1) ? 1 : 0;
                od2Items += (member.od2nineteen == 1) ? 1 : 0;
                od2Items += (member.od2twenty == 1) ? 1 : 0;
                od2Items += (member.od2twentyone == 1) ? 1 : 0;
                od2Items += (member.od2twentytwo == 1) ? 1 : 0;
                od2Items += (member.od2twentythree == 1) ? 1 : 0;
                od2Items += (member.od2twentyfour == 1) ? 1 : 0;
                od2Items += (member.od2twentyfive == 1) ? 1 : 0;
                od2Items += (member.od2twentysix == 1) ? 1 : 0;
                od2Items += (member.od2twentyseven == 1) ? 1 : 0;
                od2Items += (member.od2twentyeight == 1) ? 1 : 0;
                od2Items += (member.od2twentynine == 1) ? 1 : 0;
                od2Items += (member.od2thirty == 1) ? 1 : 0;
                od2Items += (member.od2thirtyone == 1) ? 1 : 0;

                if (member.jobcode != 'DVR') {
                    if (Number(member.one) == 1)
                        member.valone = 1
                    if (member.od1one == 1)
                        member.valone = 2
                    if (member.od2one == 1)
                        member.valone = 3
                    if (Number(member.one) == 0)
                        member.valone = 0

                    if (Number(member.two) == 1)
                        member.valtwo = 1
                    if (member.od1two == 1)
                        member.valtwo = 2
                    if (member.od2two == 1)
                        member.valtwo = 3
                    if (Number(member.two) == 0)
                        member.valtwo = 0

                    if (Number(member.three) == 1)
                        member.valthree = 1
                    if (member.od1three == 1)
                        member.valthree = 2
                    if (member.od2three == 1)
                        member.valthree = 3
                    if (Number(member.three) == 0)
                        member.valthree = 0

                    if (Number(member.four) == 1)
                        member.valfour = 1
                    if (member.od1four == 1)
                        member.valfour = 2
                    if (member.od2four == 1)
                        member.valfour = 3
                    if (Number(member.four) == 0)
                        member.valfour = 0

                    if (Number(member.five) == 1)
                        member.valfive = 1
                    if (member.od1five == 1)
                        member.valfive = 2
                    if (member.od2five == 1)
                        member.valfive = 3
                    if (Number(member.five) == 0)
                        member.valfive = 0

                    if (Number(member.six) == 1)
                        member.valsix = 1
                    if (member.od1six == 1)
                        member.valsix = 2
                    if (member.od2six == 1)
                        member.valsix = 3
                    if (Number(member.six) == 0)
                        member.valsix = 0

                    if (Number(member.seven) == 1)
                        member.valseven = 1
                    if (member.od1seven == 1)
                        member.valseven = 2
                    if (member.od2seven == 1)
                        member.valseven = 3
                    if (Number(member.seven) == 0)
                        member.valseven = 0

                    if (Number(member.eight) == 1)
                        member.valeight = 1
                    if (member.od1eight == 1)
                        member.valeight = 2
                    if (member.od2eight == 1)
                        member.valeight = 3
                    if (Number(member.eight) == 0)
                        member.valeight = 0

                    if (Number(member.nine) == 1)
                        member.valnine = 1
                    if (member.od1nine == 1)
                        member.valnine = 2
                    if (member.od2nine == 1)
                        member.valnine = 3
                    if (Number(member.nine) == 0)
                        member.valnine = 0

                    if (Number(member.ten) == 1)
                        member.valten = 1
                    if (member.od1ten == 1)
                        member.valten = 2
                    if (member.od2ten == 1)
                        member.valten = 3
                    if (Number(member.ten) == 0)
                        member.valten = 0

                    if (Number(member.eleven)== 1)
                        member.valeleven = 1
                    if (member.od1eleven == 1)
                        member.valeleven = 2
                    if (member.od2eleven == 1)
                        member.valeleven = 3
                    if (Number(member.eleven) == 0)
                        member.valeleven = 0

                    if (Number(member.twelve) == 1)
                        member.valtwelve = 1
                    if (member.od1twelve == 1)
                        member.valtwelve = 2
                    if (member.od2twelve == 1)
                        member.valtwelve = 3
                    if (Number(member.twelve) == 0)
                        member.valtwelve = 0

                    if (Number(member.thirteen) == 1)
                        member.valthirteen = 1
                    if (member.od1thirteen == 1)
                        member.valthirteen = 2
                    if (member.od2thirteen == 1)
                        member.valthirteen = 3
                    if (Number(member.thirteen) == 0)
                        member.valthirteen = 0

                    if (Number(member.fourteen) == 1)
                        member.valfourteen = 1
                    if (member.od1fourteen == 1)
                        member.valfourteen = 2
                    if (member.od2fourteen == 1)
                        member.valfourteen = 3
                    if (Number(member.fourteen) == 0)
                        member.valfourteen = 0

                    if (Number(member.fifteen) == 1)
                        member.valfifteen = 1
                    if (member.od1fifteen == 1)
                        member.valfifteen = 2
                    if (member.od2fifteen == 1)
                        member.valfifteen = 3
                    if (Number(member.fifteen) == 0)
                        member.valfifteen = 0

                    if (Number(member.sixteen) == 1)
                        member.valsixteen = 1
                    if (member.od1sixteen == 1)
                        member.valsixteen = 2
                    if (member.od2sixteen == 1)
                        member.valsixteen = 3
                    if (Number(member.sixteen) == 0)
                        member.valsixteen = 0

                    if (Number(member.seventeen) == 1)
                        member.valseventeen = 1
                    if (member.od1seventeen == 1)
                        member.valseventeen = 2
                    if (member.od2seventeen == 1)
                        member.valseventeen = 3
                    if (Number(member.seventeen) == 0)
                        member.valseventeen = 0

                    if (Number(member.eighteen) == 1)
                        member.valeighteen = 1
                    if (member.od1eighteen == 1)
                        member.valeighteen = 2
                    if (member.od2eighteen == 1)
                        member.valeighteen = 3
                    if (Number(member.eighteen) == 0)
                        member.valeighteen = 0

                    if (Number(member.nineteen) == 1)
                        member.valnineteen = 1
                    if (member.od1nineteen == 1)
                        member.valnineteen = 2
                    if (member.od2nineteen == 1)
                        member.valnineteen = 3
                    if (Number(member.nineteen) == 0)
                        member.valnineteen = 0

                    if (Number(member.twenty) == 1)
                        member.valtwenty = 1
                    if (member.od1twenty == 1)
                        member.valtwenty = 2
                    if (member.od2twenty == 1)
                        member.valtwenty = 3
                    if (Number(member.twenty) == 0)
                        member.valtwenty = 0

                    if (Number(member.twentyone) == 1)
                        member.valtwentyone = 1
                    if (member.od1twentyone == 1)
                        member.valtwentyone = 2
                    if (member.od2twentyone == 1)
                        member.valtwentyone = 3
                    if (Number(member.twentyone) == 0)
                        member.valtwentyone = 0

                    if (Number(member.twentytwo) == 1)
                        member.valtwentytwo = 1
                    if (member.od1twentytwo == 1)
                        member.valtwentytwo = 2
                    if (member.od2twentytwo == 1)
                        member.valtwentytwo = 3
                    if (Number(member.twentytwo) == 0)
                        member.valtwentytwo = 0

                    if (Number(member.twentythree) == 1)
                        member.valtwentythree = 1
                    if (member.od1twentythree == 1)
                        member.valtwentythree = 2
                    if (member.od2twentythree == 1)
                        member.valtwentythree = 3
                    if (Number(member.twentythree) == 0)
                        member.valtwentythree = 0

                    if (Number(member.twentyfour) == 1)
                        member.valtwentyfour = 1
                    if (member.od1twentyfour == 1)
                        member.valtwentyfour = 2
                    if (member.od2twentyfour == 1)
                        member.valtwentyfour = 3
                    if (Number(member.twentyfour) == 0)
                        member.valtwentyfour = 0

                    if (Number(member.twentyfive) == 1)
                        member.valtwentyfive = 1
                    if (member.od1twentyfive == 1)
                        member.valtwentyfive = 2
                    if (member.od2twentyfive == 1)
                        member.valtwentyfive = 3
                    if (Number(member.twentyfive) == 0)
                        member.valtwentyfive = 0

                    if (Number(member.twentysix) == 1)
                        member.valtwentysix = 1
                    if (member.od1twentysix == 1)
                        member.valtwentysix = 2
                    if (member.od2twentysix == 1)
                        member.valtwentysix = 3
                    if (Number(member.twentysix) == 0)
                        member.valtwentysix = 0

                    if (Number(member.twentyseven) == 1)
                        member.valtwentyseven = 1
                    if (member.od1twentyseven == 1)
                        member.valtwentyseven = 2
                    if (member.od2twentyseven == 1)
                        member.valtwentyseven = 3  
                    if (Number(member.twentyseven) == 0)
                        member.valtwentyseven = 0

                    if($scope.noOfDays>=28){
                        if (Number(member.twentyeight) == 1)
                            member.valtwentyeight = 1
                        if (member.od1twentyeight == 1)
                            member.valtwentyeight = 2
                        if (member.od2twentyeight == 1)
                            member.valtwentyeight = 3
                        if (Number(member.twentyeight) == 0)
                            member.valtwentyeight = 0
                    }
                    if($scope.noOfDays>=29){
                        if (Number(member.twentynine) == 1)
                            member.valtwentynine = 1
                        if (member.od1twentynine == 1)
                            member.valtwentynine = 2
                        if (member.od2twentynine == 1)
                            member.valtwentynine = 3
                        if (Number(member.twentynine) == 0)
                            member.valtwentynine = 0
                    }
                    if($scope.noOfDays>=30){
                        if (Number(member.thirty) == 1)
                            member.valthirty = 1
                        if (member.od1thirty == 1)
                            member.valthirty = 2
                        if (member.od2thirty == 1)
                            member.valthirty = 3
                        if (Number(member.thirty) == 0)
                            member.valthirty = 0
                    }
                    if($scope.noOfDays>=31){
                        if (Number(member.thirtyone) == 1)
                            member.valthirtyone = 1
                        if (member.od1thirtyone == 1)
                            member.valthirtyone = 2
                        if (member.od2thirtyone == 1)
                            member.valthirtyone = 3
                        if (Number(member.thirtyone) == 0)
                            member.valthirtyone = 0
                    }
                    member.pdays = Number(PresentItems);
                    member.presentdays = Number(PresentItems) + Number(od1Items) + Number(od2Items);
                    member.othours = 0;
                    member.presentdays.toFixed(2);
                    $scope.totaldays += Number(member.presentdays) / 2;
                } else {
                    if (member.one == 1)					
                        member.valone = (Number(member.one) + Number(member.od1one));
                        
                    if (member.two == 1)
                        member.valtwo = Number(member.two) + Number(member.od1two);

                    if (member.three == 1)
                        member.valthree = Number(member.three) + Number(member.od1three);

                    if (member.four == 1)   
                        member.valfour = Number(member.four) + Number(member.od1four);

                    if (member.five == 1)
                        member.valfive = Number(member.five) + Number(member.od1five);

                    if (member.six == 1)
                        member.valsix = Number(member.six) + Number(member.od1six);

                    if (member.seven == 1)
                        member.valseven = Number(member.seven) + Number(member.od1seven);

                    if (member.eight == 1)
                        member.valeight = Number(member.eight) + Number(member.od1eight);

                    if (member.nine == 1)
                        member.valnine = Number(member.nine) + Number(member.od1nine);

                    if (member.ten == 1)
                        member.valten = Number(member.ten) + Number(member.od1ten);

                    if (member.eleven == 1)
                        member.valeleven = Number(member.eleven) + Number(member.od1eleven);

                    if (member.twelve == 1)
                        member.valtwelve = Number(member.twelve) + Number(member.od1twelve);

                    if (member.thirteen == 1)
                        member.valthirteen = Number(member.thirteen) + Number(member.od1thirteen);

                    if (member.fourteen == 1)
                        member.valfourteen = Number(member.fourteen) + Number(member.od1fourteen);

                    if (member.fifteen == 1)
                        member.valfifteen = Number(member.fifteen) + Number(member.od1fifteen);

                    if (member.sixteen == 1)
                        member.valsixteen = Number(member.sixteen) + Number(member.od1sixteen);

                    if (member.seventeen == 1)
                        member.valseventeen = Number(member.seventeen) + Number(member.od1seventeen);

                    if (member.eighteen == 1)
                        member.valeighteen = Number(member.eighteen) + Number(member.od1eighteen);

                    if (member.nineteen == 1)
                        member.valnineteen = Number(member.nineteen) + Number(member.od1nineteen);

                    if (member.twenty == 1)
                        member.valtwenty = Number(member.twenty) + Number(member.od1twenty);

                    if (member.twentyone == 1)
                        member.valtwentyone = Number(member.twentyone) + Number(member.od1twentyone);

                    if (member.twentytwo == 1)
                        member.valtwentytwo = Number(member.twentytwo) + Number(member.od1twentytwo);

                    if (member.twentythree == 1)
                        member.valtwentythree = Number(member.twentythree) + Number(member.od1twentythree);

                    if (member.twentyfour == 1)
                        member.valtwentyfour = Number(member.twentyfour) + Number(member.od1twentyfour);

                    if (member.twentyfive == 1)
                        member.valtwentyfive = Number(member.twentyfive) + Number(member.od1twentyfive);

                    if (member.twentysix == 1)
                        member.valtwentysix = Number(member.twentysix) + Number(member.od1twentysix);

                    if (member.twentyseven == 1)
                        member.valtwentyseven = Number(member.twentyseven) + Number(member.od1twentyseven);

                    if (member.twentyeight == 1)
                        member.valtwentyeight = Number(member.twentyeight) + Number(member.od1twentyeight);

                    if (member.twentynine == 1)
                        member.valtwentynine = Number(member.twentynine) + Number(member.od1twentynine);

                    if (member.thirty == 1)
                        member.valthirty = Number(member.thirty) + Number(member.od1thirty);

                    if (Number(member.thirtyone) == 1)
                        member.valthirtyone = Number(member.thirtyone) + Number(member.od1thirtyone);
                    member.pdays = Number(PresentItems);
                    member.presentdays = Number(PresentItems);
                    member.othours = parseFloat(od1Items);
                    $scope.totaldays = member.presentdays
                }
                member.od1Items = od1Items;
                member.od2Items = od2Items;
                PresentItems = 0;
                od1Items = 0;
                od2Items = 0;   
                console.log('members',member);
                $scope.selectedMembers.push(member);
                console.log('members', $scope.selectedMembers);
            
        })
        $scope.loading=false;
    };

    watchFunction();
    $scope.adSelectChange = function(members,adselected,selmemberid) {
        $scope.loading=true;
        $scope.count = [];
        $scope.values = {};
        var totaldays = 0;
        var totalhours = 0;
        var PresentItems = 0;
        var od1Items = 0;
        var od2Items = 0;
        angular.forEach(members, function(member) {
            if((Number(member.selectattendance)) == 1 ) {
                if((Number(member.adselect)) == 1 ) {
                    $scope.fieldDisabled = false; 
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
                    member.twentynine = 1;
                    member.thirty = 1;
                    member.thirtyone = 1;
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

                    PresentItems = 27;
                    if($scope.noOfDays>=28){
                        PresentItems = 28;
                        member.valtwentyeight = 1;
                        if($scope.noOfDays>=29){
                            PresentItems = 29;
                            member.valtwentynine = 1;
                            if($scope.noOfDays>=30){
                                PresentItems = 30;
                                member.valthirty = 1;
                                if($scope.noOfDays>=31){
                                    PresentItems = 31;
                                    member.valthirtyone = 1;
                                }
                            }
                        }
                    }
                    if (member.jobcode != 'DVR') {
                       // if((Number(member.ed1select)) == 1 ) { 
                            od1Items += (member.od1one == 1) ? 1 : 0;
                            // if(member.od1one==0){
                            //     member.od2one=0;
                            // }
                            od1Items += (member.od1two == 1) ? 1 : 0;
                            // if(member.od1two==0){
                            //     member.od2two=0;
                            // }
                            od1Items += (member.od1three == 1) ? 1 : 0;
                            // if(member.od1three==0){
                            //     member.od2three=0;
                            // }
                            od1Items += (member.od1four == 1) ? 1 : 0;
                            // if(member.od1four==0){
                            //     member.od2four=0;
                            // }
                            od1Items += (member.od1five == 1) ? 1 : 0;
                            // if(member.od1five==0){
                            //     member.od2five=0;
                            // }
                            od1Items += (member.od1six == 1) ? 1 : 0;
                            // if(member.od1six==0){
                            //     member.od2six=0;
                            // }
                            od1Items += (member.od1seven == 1) ? 1 : 0;
                            // if(member.od1seven==0){
                            //     member.od2seven=0;
                            // }
                            od1Items += (member.od1eight == 1) ? 1 : 0;
                            // if(member.od1eight==0){
                            //     member.od2eight=0;
                            // }
                            od1Items += (member.od1nine == 1) ? 1 : 0;
                            // if(member.od1nine==0){
                            //     member.od2nine=0;
                            // }
                            od1Items += (member.od1ten == 1) ? 1 : 0;
                            // if(member.od1ten==0){
                            //     member.od2ten=0;
                            // }
                            od1Items += (member.od1eleven == 1) ? 1 : 0;
                            // if(member.od1eleven==0){
                            //     member.od2eleven=0;
                            // }
                            od1Items += (member.od1twelve == 1) ? 1 : 0;
                            // if(member.od1twelve==0){
                            //     member.od2twelve=0;
                            // }
                            od1Items += (member.od1thirteen == 1) ? 1 : 0;
                            // if(member.od1thirteen==0){
                            //     member.od2thirteen=0;
                            // }
                            od1Items += (member.od1fourteen == 1) ? 1 : 0;
                            // if(member.od1fourteen==0){
                            //     member.od2fourteen=0;
                            // }
                            od1Items += (member.od1fifteen == 1) ? 1 : 0;
                            // if(member.od1fifteen==0){
                            //     member.od2fifteen=0;
                            // }
                            od1Items += (member.od1sixteen == 1) ? 1 : 0;
                            // if(member.od1sixteen==0){
                            //     member.od2sixteen=0;
                            // }
                            od1Items += (member.od1seventeen == 1) ? 1 : 0;
                            // if(member.od1seventeen==0){
                            //     member.od2seventeen=0;
                            // }
                            od1Items += (member.od1eighteen == 1) ? 1 : 0;
                            // if(member.od1eighteen==0){
                            //     member.od2eighteen=0;
                            // }
                            od1Items += (member.od1nineteen == 1) ? 1 : 0;
                            // if(member.od1nineteen==0){
                            //     member.od2nineteen=0;
                            // }
                            od1Items += (member.od1twenty == 1) ? 1 : 0;
                            // if(member.od1twenty==0){
                            //     member.od2twenty=0;
                            // }
                            od1Items += (member.od1twentyone == 1) ? 1 : 0;
                            // if(member.od1twentyone==0){
                            //     member.od2twentyone=0;
                            // }
                            od1Items += (member.od1twentytwo == 1) ? 1 : 0;
                            // if(member.od1twentytwo==0){
                            //     member.od2twentytwo=0;
                            // }
                            od1Items += (member.od1twentythree == 1) ? 1 : 0;
                            // if(member.od1twentythree==0){
                            //     member.od2twentythree=0;
                            // }
                            od1Items += (member.od1twentyfour == 1) ? 1 : 0;
                            // if(member.od1twentyfour==0){
                            //     member.od2twentyfour=0;
                            // }
                            od1Items += (member.od1twentyfive == 1) ? 1 : 0;
                            // if(member.od1twentyfive==0){
                            //     member.od2twentyfive=0;
                            // }
                            od1Items += (member.od1twentysix == 1) ? 1 : 0;
                            // if(member.od1twentysix==0){
                            //     member.od2twentysix=0;
                            // }
                            od1Items += (member.od1twentyseven == 1) ? 1 : 0;
                            // if(member.od1twentyseven==0){
                            //     member.od2twentyseven=0;
                            // }
                            if($scope.noOfDays>=28){
                            od1Items += (member.od1twentyeight == 1) ? 1 : 0;
                            }
                            // if(member.od1twentyeight==0){
                            //     member.od2twentyeight=0;
                            // }
                            if($scope.noOfDays>=29){
                            od1Items += (member.od1twentynine == 1) ? 1 : 0;
                            }
                            // if(member.od1twentynine==0){
                            //     member.od2twentynine=0;
                            // }
                            if($scope.noOfDays>=30){
                                od1Items += (member.od1thirty == 1) ? 1 : 0;
                            }
                            // if(member.od1thirty==0){
                            //     member.od2thirty=0;
                            // }
                            if($scope.noOfDays>=31){
                                od1Items += (member.od1thirtyone == 1) ? 1 : 0;
                            }
                            // if(member.od1thirtyone==0){
                            //     member.od2thirtyone=0;
                            // }
                       // }else{
                           // od2Items = 0;
                        //}
                    } else {
                        if((Number(member.ed1select)) == 1 ) { 
                            if(member.one=="0"){
                                od1Items += 0;	
                            }
                            else if(member.one=="1"){
                                od1Items += (Number(member.od1one));
                            }	
                            od1Items += (Number(member.od1two));
                            od1Items += (Number(member.od1three));
                            od1Items += (Number(member.od1four));
                            od1Items += (Number(member.od1five));
                            od1Items += (Number(member.od1six));
                            od1Items += (Number(member.od1seven));
                            od1Items += (Number(member.od1eight));
                            od1Items += (Number(member.od1nine));
                            od1Items += (Number(member.od1ten));
                            od1Items += (Number(member.od1eleven));
                            od1Items += (Number(member.od1twelve));
                            od1Items += (Number(member.od1thirteen));
                            od1Items += (Number(member.od1fourteen));
                            od1Items += (Number(member.od1fifteen));
                            od1Items += (Number(member.od1sixteen));
                            od1Items += (Number(member.od1seventeen));
                            od1Items += (Number(member.od1eighteen));
                            od1Items += (Number(member.od1nineteen));
                            od1Items += (Number(member.od1twenty));
                            od1Items += (Number(member.od1twentyone));
                            od1Items += (Number(member.od1twentytwo));
                            od1Items += (Number(member.od1twentythree));
                            od1Items += (Number(member.od1twentyfour));
                            od1Items += (Number(member.od1twentyfive));
                            od1Items += (Number(member.od1twentysix));
                            od1Items += (Number(member.od1twentyseven));
                            od1Items += (Number(member.od1twentyeight));
                            od1Items += (Number(member.od1twentynine));
                            od1Items += (Number(member.od1thirty));
                            od1Items += (Number(member.od1thirtyone));            
                            od1Items = Number(od1Items).toFixed(2);
                        }
                        else {
                            //od2Items = 0;

                            od2Items += (member.od2one == .5) ? .5 : 0;
                        od2Items += (member.od2two == .5) ? .5 : 0;
                        od2Items += (member.od2three == .5) ? .5 : 0;
                        od2Items += (member.od2four == .5) ? .5 : 0;
                        od2Items += (member.od2five == .5) ? .5 : 0;
                        od2Items += (member.od2six == .5) ? .5 : 0;
                        od2Items += (member.od2seven == .5) ? .5 : 0;
                        od2Items += (member.od2eight == .5) ? .5 : 0;
                        od2Items += (member.od2nine == .5) ? .5 : 0;
                        od2Items += (member.od2ten == .5) ? .5 : 0;
                        od2Items += (member.od2eleven == .5) ? .5 : 0;
                        od2Items += (member.od2twelve == .5) ? .5 : 0;
                        od2Items += (member.od2thirteen == .5) ? .5 : 0;
                        od2Items += (member.od2fourteen == .5) ? .5 : 0;
                        od2Items += (member.od2fifteen == .5) ? .5 : 0;
                        od2Items += (member.od2sixteen == .5) ? .5 : 0;
                        od2Items += (member.od2seventeen == .5) ? .5 : 0;
                        od2Items += (member.od2eighteen == .5) ? .5 : 0;
                        od2Items += (member.od2nineteen == .5) ? .5 : 0;
                        od2Items += (member.od2twenty == .5) ? .5 : 0;
                        od2Items += (member.od2twentyone == .5) ? .5 : 0;
                        od2Items += (member.od2twentytwo == .5) ? .5 : 0;
                        od2Items += (member.od2twentythree == .5) ? .5 : 0;
                        od2Items += (member.od2twentyfour == .5) ? .5 : 0;
                        od2Items += (member.od2twentyfive == .5) ? .5 : 0;
                        od2Items += (member.od2twentysix == .5) ? .5 : 0;
                        od2Items += (member.od2twentyseven == .5) ? .5 : 0;
                        od2Items += (member.od2twentyeight == .5) ? .5 : 0;
                        od2Items += (member.od2twentynine == .5) ? .5 : 0;
                        od2Items += (member.od2thirty == .5) ? .5 : 0;
                        od2Items += (member.od2thirtyone == .5) ? .5 : 0;
                        }
                    }
                    if((Number(member.ed2select)) == 1 ) { 
                        od2Items += (member.od2one == .5) ? .5 : 0;
                        od2Items += (member.od2two == .5) ? .5 : 0;
                        od2Items += (member.od2three == .5) ? .5 : 0;
                        od2Items += (member.od2four == .5) ? .5 : 0;
                        od2Items += (member.od2five == .5) ? .5 : 0;
                        od2Items += (member.od2six == .5) ? .5 : 0;
                        od2Items += (member.od2seven == .5) ? .5 : 0;
                        od2Items += (member.od2eight == .5) ? .5 : 0;
                        od2Items += (member.od2nine == .5) ? .5 : 0;
                        od2Items += (member.od2ten == .5) ? .5 : 0;
                        od2Items += (member.od2eleven == .5) ? .5 : 0;
                        od2Items += (member.od2twelve == .5) ? .5 : 0;
                        od2Items += (member.od2thirteen == .5) ? .5 : 0;
                        od2Items += (member.od2fourteen == .5) ? .5 : 0;
                        od2Items += (member.od2fifteen == .5) ? .5 : 0;
                        od2Items += (member.od2sixteen == .5) ? .5 : 0;
                        od2Items += (member.od2seventeen == .5) ? .5 : 0;
                        od2Items += (member.od2eighteen == .5) ? .5 : 0;
                        od2Items += (member.od2nineteen == .5) ? .5 : 0;
                        od2Items += (member.od2twenty == .5) ? .5 : 0;
                        od2Items += (member.od2twentyone == .5) ? .5 : 0;
                        od2Items += (member.od2twentytwo == .5) ? .5 : 0;
                        od2Items += (member.od2twentythree == .5) ? .5 : 0;
                        od2Items += (member.od2twentyfour == .5) ? .5 : 0;
                        od2Items += (member.od2twentyfive == .5) ? .5 : 0;
                        od2Items += (member.od2twentysix == .5) ? .5 : 0;
                        od2Items += (member.od2twentyseven == .5) ? .5 : 0;
                        od2Items += (member.od2twentyeight == .5) ? .5 : 0;
                        od2Items += (member.od2twentynine == .5) ? .5 : 0;
                        od2Items += (member.od2thirty == .5) ? .5 : 0;
                        od2Items += (member.od2thirtyone == .5) ? .5 : 0;
                    }else{
                        od2Items += (member.od2one == .5) ? .5 : 0;
                        od2Items += (member.od2two == .5) ? .5 : 0;
                        od2Items += (member.od2three == .5) ? .5 : 0;
                        od2Items += (member.od2four == .5) ? .5 : 0;
                        od2Items += (member.od2five == .5) ? .5 : 0;
                        od2Items += (member.od2six == .5) ? .5 : 0;
                        od2Items += (member.od2seven == .5) ? .5 : 0;
                        od2Items += (member.od2eight == .5) ? .5 : 0;
                        od2Items += (member.od2nine == .5) ? .5 : 0;
                        od2Items += (member.od2ten == .5) ? .5 : 0;
                        od2Items += (member.od2eleven == .5) ? .5 : 0;
                        od2Items += (member.od2twelve == .5) ? .5 : 0;
                        od2Items += (member.od2thirteen == .5) ? .5 : 0;
                        od2Items += (member.od2fourteen == .5) ? .5 : 0;
                        od2Items += (member.od2fifteen == .5) ? .5 : 0;
                        od2Items += (member.od2sixteen == .5) ? .5 : 0;
                        od2Items += (member.od2seventeen == .5) ? .5 : 0;
                        od2Items += (member.od2eighteen == .5) ? .5 : 0;
                        od2Items += (member.od2nineteen == .5) ? .5 : 0;
                        od2Items += (member.od2twenty == .5) ? .5 : 0;
                        od2Items += (member.od2twentyone == .5) ? .5 : 0;
                        od2Items += (member.od2twentytwo == .5) ? .5 : 0;
                        od2Items += (member.od2twentythree == .5) ? .5 : 0;
                        od2Items += (member.od2twentyfour == .5) ? .5 : 0;
                        od2Items += (member.od2twentyfive == .5) ? .5 : 0;
                        od2Items += (member.od2twentysix == .5) ? .5 : 0;
                        od2Items += (member.od2twentyseven == .5) ? .5 : 0;
                        od2Items += (member.od2twentyeight == .5) ? .5 : 0;
                        od2Items += (member.od2twentynine == .5) ? .5 : 0;
                        od2Items += (member.od2thirty == .5) ? .5 : 0;
                        od2Items += (member.od2thirtyone == .5) ? .5 : 0;
                    }
                    if (member.jobcode != 'DVR') {
                        if (Number(member.one) == 1)
                        member.valone = 1
                    if (member.od1one == 1)
                        member.valone += 1
                    if (member.od2one == .5)
                        member.valone +=.5
                    if (Number(member.one) == 0)
                        member.valone = 0

                   if (Number(member.two) == 1)
                        member.valtwo = 1
                    if (member.od1two == 1)
                        member.valtwo += 1
                    if (member.od2two == .5 )
                        member.valtwo +=.5
                    if (Number(member.two) == 0)
                        member.valtwo = 0

                    if (Number(member.three) == 1)
                        member.valthree = 1
                    if (member.od1three == 1)
                        member.valthree += 1
                    if (member.od2three == .5)
                        member.valthree +=.5
                    if (Number(member.three) == 0)
                        member.valthree = 0

                    if (Number(member.four) == 1)
                        member.valfour = 1
                    if (member.od1four == 1)
                        member.valfour += 1
                    if (member.od2four == .5)
                        member.valfour +=.5
                    if (Number(member.four) == 0)
                        member.valfour = 0

                    if (Number(member.five) == 1)
                        member.valfive = 1
                    if (member.od1five == 1)
                        member.valfive += 1
                    if (member.od2five == .5)
                        member.valfive +=.5
                    if (Number(member.five) == 0)
                        member.valfive = 0

                    if (Number(member.six) == 1)
                        member.valsix = 1
                    if (member.od1six == 1)
                        member.valsix += 1
                    if (member.od2six == .5)
                        member.valsix +=.5
                    if (Number(member.six) == 0)
                        member.valsix = 0

                    if (Number(member.seven) == 1)
                        member.valseven = 1
                    if (member.od1seven == 1)
                        member.valseven += 1
                    if (member.od2seven == .5)
                        member.valseven +=.5
                    if (Number(member.seven) == 0)
                        member.valseven = 0

                    if (Number(member.eight) == 1)
                        member.valeight = 1
                    if (member.od1eight == 1)
                        member.valeight += 1
                    if (member.od2eight == .5)
                        member.valeight +=.5
                    if (Number(member.eight) == 0)
                        member.valeight = 0

                    if (Number(member.nine) == 1)
                        member.valnine = 1
                    if (member.od1nine == 1)
                        member.valnine += 1
                    if (member.od2nine == .5)
                        member.valnine +=.5
                    if (Number(member.nine) == 0)
                        member.valnine = 0

                    if (Number(member.ten) == 1)
                        member.valten = 1
                    if (member.od1ten == 1)
                        member.valten += 1
                    if (member.od2ten == .5)
                        member.valten +=.5
                    if (Number(member.ten) == 0)
                        member.valten = 0

                    if (Number(member.eleven)== 1)
                        member.valeleven = 1
                    if (member.od1eleven == 1)
                        member.valeleven += 1
                    if (member.od2eleven == .5)
                        member.valeleven +=.5
                    if (Number(member.eleven) == 0)
                        member.valeleven = 0

                    if (Number(member.twelve) == 1)
                        member.valtwelve = 1
                    if (member.od1twelve == 1)
                        member.valtwelve += 1
                    if (member.od2twelve == .5)
                        member.valtwelve +=.5
                    if (Number(member.twelve) == 0)
                        member.valtwelve = 0

                    if (Number(member.thirteen) == 1)
                        member.valthirteen = 1
                    if (member.od1thirteen == 1)
                        member.valthirteen += 1
                    if (member.od2thirteen == .5)
                        member.valthirteen +=.5
                    if (Number(member.thirteen) == 0)
                        member.valthirteen = 0

                    if (Number(member.fourteen) == 1)
                        member.valfourteen = 1
                    if (member.od1fourteen == 1)
                        member.valfourteen += 1
                    if (member.od2fourteen == .5)
                        member.valfourteen +=.5
                    if (Number(member.fourteen) == 0)
                        member.valfourteen = 0

                    if (Number(member.fifteen) == 1)
                        member.valfifteen = 1
                    if (member.od1fifteen == 1)
                        member.valfifteen += 1
                    if (member.od2fifteen == .5)
                        member.valfifteen +=.5
                    if (Number(member.fifteen) == 0)
                        member.valfifteen = 0

                    if (Number(member.sixteen) == 1)
                        member.valsixteen = 1
                    if (member.od1sixteen == 1)
                        member.valsixteen += 1
                    if (member.od2sixteen == .5)
                        member.valsixteen +=.5
                    if (Number(member.sixteen) == 0)
                        member.valsixteen = 0

                    if (Number(member.seventeen) == 1)
                        member.valseventeen = 1
                    if (member.od1seventeen == 1)
                        member.valseventeen += 1
                    if (member.od2seventeen == .5)
                        member.valseventeen +=.5
                    if (Number(member.seventeen) == 0)
                        member.valseventeen = 0

                    if (Number(member.eighteen) == 1)
                        member.valeighteen = 1
                    if (member.od1eighteen == 1)
                        member.valeighteen += 1
                    if (member.od2eighteen == .5)
                        member.valeighteen +=.5
                    if (Number(member.eighteen) == 0)
                        member.valeighteen = 0

                    if (Number(member.nineteen) == 1)
                        member.valnineteen = 1
                    if (member.od1nineteen == 1)
                        member.valnineteen += 1
                    if (member.od2nineteen == .5)
                        member.valnineteen +=.5
                    if (Number(member.nineteen) == 0)
                        member.valnineteen = 0

                    if (Number(member.twenty) == 1)
                        member.valtwenty = 1
                    if (member.od1twenty == 1)
                        member.valtwenty += 1
                    if (member.od2twenty == .5)
                        member.valtwenty +=.5
                    if (Number(member.twenty) == 0)
                        member.valtwenty = 0

                    if (Number(member.twentyone) == 1)
                        member.valtwentyone = 1
                    if (member.od1twentyone == 1)
                        member.valtwentyone += 1
                    if (member.od2twentyone == .5)
                        member.valtwentyone +=.5
                    if (Number(member.twentyone) == 0)
                        member.valtwentyone = 0

                    if (Number(member.twentytwo) == 1)
                        member.valtwentytwo = 1
                    if (member.od1twentytwo == 1)
                        member.valtwentytwo += 1
                    if (member.od2twentytwo == .5)
                        member.valtwentytwo +=.5
                    if (Number(member.twentytwo) == 0)
                        member.valtwentytwo = 0

                    if (Number(member.twentythree) == 1)
                        member.valtwentythree = 1
                    if (member.od1twentythree == 1)
                        member.valtwentythree += 1
                    if (member.od2twentythree == .5)
                        member.valtwentythree +=.5
                    if (Number(member.twentythree) == 0)
                        member.valtwentythree = 0

                    if (Number(member.twentyfour) == 1)
                        member.valtwentyfour = 1
                    if (member.od1twentyfour == 1)
                        member.valtwentyfour += 1
                    if (member.od2twentyfour == .5)
                        member.valtwentyfour +=.5
                    if (Number(member.twentyfour) == 0)
                        member.valtwentyfour = 0

                    if (Number(member.twentyfive) == 1)
                        member.valtwentyfive = 1
                    if (member.od1twentyfive == 1)
                        member.valtwentyfive += 1
                    if (member.od2twentyfive == .5)
                        member.valtwentyfive +=.5
                    if (Number(member.twentyfive) == 0)
                        member.valtwentyfive = 0

                    if (Number(member.twentysix) == 1)
                        member.valtwentysix = 1
                    if (member.od1twentysix == 1)
                        member.valtwentysix += 1
                    if (member.od2twentysix == .5)
                        member.valtwentysix +=.5
                    if (Number(member.twentysix) == 0)
                        member.valtwentysix = 0

                    if (Number(member.twentyseven) == 1)
                        member.valtwentyseven = 1
                    if (member.od1twentyseven == 1)
                        member.valtwentyseven += 1
                    if (member.od2twentyseven == .5)
                        member.valtwentyseven +=.5  
                    if (Number(member.twentyseven) == 0)
                        member.valtwentyseven = 0

                    if($scope.noOfDays>=28){
                        if (Number(member.twentyeight) == 1)
                            member.valtwentyeight = 1
                        if (member.od1twentyeight == 1)
                            member.valtwentyeight += 1
                        if (member.od2twentyeight == .5)
                            member.valtwentyeight +=.5
                        if (Number(member.twentyeight) == 0)
                            member.valtwentyeight = 0
                    }
                    if($scope.noOfDays>=29){
                        if (Number(member.twentynine) == 1)
                            member.valtwentynine = 1
                        if (member.od1twentynine == 1)
                            member.valtwentynine += 1
                        if (member.od2twentynine == .5)
                            member.valtwentynine +=.5
                        if (Number(member.twentynine) == 0)
                            member.valtwentynine = 0
                    }
                    if($scope.noOfDays>=30){
                        if (Number(member.thirty) == 1)
                            member.valthirty = 1
                        if (member.od1thirty == 1)
                            member.valthirty += 1
                        if (member.od2thirty == .5)
                            member.valthirty +=.5
                        if (Number(member.thirty) == 0)
                            member.valthirty = 0
                    }
                    if($scope.noOfDays>=31){
                        if (Number(member.thirtyone) == 1)
                            member.valthirtyone = 1
                        if (member.od1thirtyone == 1)
                            member.valthirtyone += 1
                        if (member.od2thirtyone == .5)
                            member.valthirtyone +=.5
                        if (Number(member.thirtyone) == 0)
                            member.valthirtyone = 0
                    }

                        member.pdays = Number(PresentItems);
                        member.presentdays = Number(PresentItems) + Number(od1Items) + Number(od2Items);
                        member.othours = 0;
                        member.presentdays.toFixed(2);
                        $scope.totaldays += Number(member.presentdays) / 2;
                    } else {
                        if (member.one == 1)					
                            member.valone = (Number(member.one) + Number(member.od1one));
                            
                        if (member.two == 1)
                            member.valtwo = Number(member.two) + Number(member.od1two);

                        if (member.three == 1)
                            member.valthree = Number(member.three) + Number(member.od1three);

                        if (member.four == 1)
                            member.valfour = Number(member.four) + Number(member.od1four);

                        if (member.five == 1)
                            member.valfive = Number(member.five) + Number(member.od1five);

                        if (member.six == 1)
                            member.valsix = Number(member.six) + Number(member.od1six);

                        if (member.seven == 1)
                            member.valseven = Number(member.seven) + Number(member.od1seven);

                        if (member.eight == 1)
                            member.valeight = Number(member.eight) + Number(member.od1eight);

                        if (member.nine == 1)
                            member.valnine = Number(member.nine) + Number(member.od1nine);

                        if (member.ten == 1)
                            member.valten = Number(member.ten) + Number(member.od1ten);

                        if (member.eleven == 1)
                            member.valeleven = Number(member.eleven) + Number(member.od1eleven);

                        if (member.twelve == 1)
                            member.valtwelve = Number(member.twelve) + Number(member.od1twelve);

                        if (member.thirteen == 1)
                            member.valthirteen = Number(member.thirteen) + Number(member.od1thirteen);

                        if (member.fourteen == 1)
                            member.valfourteen = Number(member.fourteen) + Number(member.od1fourteen);

                        if (member.fifteen == 1)
                            member.valfifteen = Number(member.fifteen) + Number(member.od1fifteen);

                        if (member.sixteen == 1)
                            member.valsixteen = Number(member.sixteen) + Number(member.od1sixteen);

                        if (member.seventeen == 1)
                            member.valseventeen = Number(member.seventeen) + Number(member.od1seventeen);

                        if (member.eighteen == 1)
                            member.valeighteen = Number(member.eighteen) + Number(member.od1eighteen);

                        if (member.nineteen == 1)
                            member.valnineteen = Number(member.nineteen) + Number(member.od1nineteen);

                        if (member.twenty == 1)
                            member.valtwenty = Number(member.twenty) + Number(member.od1twenty);

                        if (member.twentyone == 1)
                            member.valtwentyone = Number(member.twentyone) + Number(member.od1twentyone);

                        if (member.twentytwo == 1)
                            member.valtwentytwo = Number(member.twentytwo) + Number(member.od1twentytwo);

                        if (member.twentythree == 1)
                            member.valtwentythree = Number(member.twentythree) + Number(member.od1twentythree);

                        if (member.twentyfour == 1)
                            member.valtwentyfour = Number(member.twentyfour) + Number(member.od1twentyfour);

                        if (member.twentyfive == 1)
                            member.valtwentyfive = Number(member.twentyfive) + Number(member.od1twentyfive);

                        if (member.twentysix == 1)
                            member.valtwentysix = Number(member.twentysix) + Number(member.od1twentysix);

                        if (member.twentyseven == 1)
                            member.valtwentyseven = Number(member.twentyseven) + Number(member.od1twentyseven);

                        if (member.twentyeight == 1)
                            member.valtwentyeight = Number(member.twentyeight) + Number(member.od1twentyeight);

                        if (member.twentynine == 1)
                            member.valtwentynine = Number(member.twentynine) + Number(member.od1twentynine);

                        if (member.thirty == 1)
                            member.valthirty = Number(member.thirty) + Number(member.od1thirty);

                        if (Number(member.thirtyone) == 1)
                            member.valthirtyone = Number(member.thirtyone) + Number(member.od1thirtyone);
                        member.pdays = Number(PresentItems);
                        member.presentdays = Number(PresentItems);
                        member.othours = parseFloat(od1Items);
                        $scope.totaldays = member.presentdays
                    }
                    member.od1Items = od1Items;
                    member.od2Items = od2Items;
                    PresentItems = 0;
                    od1Items = 0;
                    od2Items = 0;
                }else{
                    if(Number(selmemberid) == Number(member.memberid)) {
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
                        member.od1one = 0;
                        member.od1two = 0;
                        member.od1three = 0;
                        member.od1four  = 0;
                        member.od1five  = 0;
                        member.od1six  = 0;
                        member.od1seven  = 0;
                        member.od1eight  = 0;
                        member.od1nine  = 0;
                        member.od1ten   = 0;
                        member.od1eleven  = 0;
                        member.od1twelve = 0;
                        member.od1thirteen = 0;
                        member.od1fourteen  = 0;
                        member.od1fifteen  = 0;
                        member.od1sixteen  = 0;
                        member.od1seventeen  = 0;
                        member.od1eighteen  = 0;
                        member.od1nineteen  = 0;
                        member.od1twenty  = 0;
                        member.od1twentyone  = 0;
                        member.od1twentytwo = 0;
                        member.od1twentythree  = 0;
                        member.od1twentyfour  = 0;
                        member.od1twentyfive  = 0;
                        member.od1twentysix = 0;
                        member.od1twentyseven = 0;
                        member.od1twentyeight = 0;
                        member.od1twentynine = 0;
                        member.od1thirty = 0;
                        member.od1thirtyone = 0;
                        member.od2one = 0;
                        member.od2two = 0;
                        member.od2three = 0;
                        member.od2four  = 0;
                        member.od2five  = 0;
                        member.od2six  = 0;
                        member.od2seven  = 0;
                        member.od2eight  = 0;
                        member.od2nine  = 0;
                        member.od2ten   = 0;
                        member.od2eleven  = 0;
                        member.od2twelve = 0;
                        member.od2thirteen = 0;
                        member.od2fourteen  = 0;
                        member.od2fifteen  = 0;
                        member.od2sixteen  = 0;
                        member.od2seventeen  = 0;
                        member.od2eighteen  = 0;
                        member.od2nineteen  = 0;
                        member.od2twenty  = 0;
                        member.od2twentyone  = 0;
                        member.od2twentytwo = 0;
                        member.od2twentythree  = 0;
                        member.od2twentyfour  = 0;
                        member.od2twentyfive  = 0;
                        member.od2twentysix = 0;
                        member.od2twentyseven = 0;
                        member.od2twentyeight = 0;
                        member.od2twentynine = 0;
                        member.od2thirty = 0;
                        member.od2thirtyone = 0;
                        member.pdays = 0;
                        member.presentdays = 0;
                        member.othours = 0; 
                        member.pdays = 0;
                        member.presentdays = 0;
                        member.othours = 0;
                        $scope.totaldays = member.presentdays
                       // PresentItems = 0;
                      //  od1Items = 0;
                      //  od2Items = 0;
                        $scope.fieldDisabled = true; 
                    }
                }
            }
        })
        $scope.loading=false;
    }
    $scope.ed1SelectChange = function(members,edselect,selmemberid) {
        $scope.loading=true;
        $scope.count = [];
        $scope.values = {};
        var totaldays = 0;
        var totalhours = 0;
        var PresentItems = 0;
        var od1Items = 0;
        var od2Items = 0;
        angular.forEach(members, function(member) {
            if((Number(member.ed1select)) == 1 ) {
                member.od1one = (Number(member.one) == 1) ? 1 : 0;
                member.od1two = (Number(member.two) == 1) ? 1 : 0;
                member.od1three = (Number(member.three) == 1) ? 1 : 0;
                member.od1four  = (Number(member.four) == 1) ? 1 : 0;
                member.od1five  = (Number(member.five) == 1) ? 1 : 0;
                member.od1six  = (Number(member.six) == 1) ? 1 : 0;
                member.od1seven  = (Number(member.seven) == 1) ? 1 : 0;
                member.od1eight  = (Number(member.eight) == 1) ? 1 : 0;
                member.od1nine  = (Number(member.nine) == 1) ? 1 : 0;
                member.od1ten   = (Number(member.ten) == 1) ? 1 : 0;
                member.od1eleven  = (Number(member.eleven) == 1) ? 1 : 0;
                member.od1twelve = (Number(member.twelve) == 1) ? 1 : 0;
                member.od1thirteen = (Number(member.thirteen) == 1) ? 1 : 0;
                member.od1fourteen  = (Number(member.fourteen) == 1) ? 1 : 0;
                member.od1fifteen  = (Number(member.fifteen) == 1) ? 1 : 0;
                member.od1sixteen  = (Number(member.sixteen) == 1) ? 1 : 0;
                member.od1seventeen  = (Number(member.seventeen) == 1) ? 1 : 0;
                member.od1eighteen  = (Number(member.eighteen) == 1) ? 1 : 0;
                member.od1nineteen  = (Number(member.nineteen) == 1) ? 1 : 0;
                member.od1twenty  = (Number(member.twenty) == 1) ? 1 : 0;
                member.od1twentyone  = (Number(member.twentyone) == 1) ? 1 : 0;
                member.od1twentytwo = (Number(member.twentytwo) == 1) ? 1 : 0;
                member.od1twentythree  = (Number(member.twentythree) == 1) ? 1 : 0;
                member.od1twentyfour  = (Number(member.twentyfour) == 1) ? 1 : 0;
                member.od1twentyfive  = (Number(member.twentyfive) == 1) ? 1 : 0;
                member.od1twentysix  = (Number(member.twentysix) == 1) ? 1 : 0;
                member.od1twentyseven = (Number(member.twentyseven) == 1) ? 1 : 0;
                if($scope.noOfDays>=28){
                    member.od1twentyeight  = (Number(member.twentyeight) == 1) ? 1 : 0;
                    if($scope.noOfDays>=29){
                        member.od1twentynine  = (Number(member.twentynine) == 1) ? 1 : 0;
                        if($scope.noOfDays>=30){
                            member.od1thirty  = (Number(member.thirty) == 1) ? 1 : 0;
                            if($scope.noOfDays>=31){
                                member.od1thirtyone  = (Number(member.thirtyone) == 1) ? 1 : 0;
                            }
                        }
                    }
                }
                PresentItems += (Number(member.one) == 1) ? 1 : 0;
                PresentItems += (Number(member.two) == 1) ? 1 : 0;
                PresentItems += (Number(member.three) == 1) ? 1 : 0;
                PresentItems += (Number(member.four) == 1) ? 1 : 0;
                PresentItems += (Number(member.five) == 1) ? 1 : 0;
                PresentItems += (Number(member.six) == 1) ? 1 : 0;
                PresentItems += (Number(member.seven) == 1) ? 1 : 0;
                PresentItems += (Number(member.eight) == 1) ? 1 : 0;
                PresentItems += (Number(member.nine) == 1) ? 1 : 0;
                PresentItems += (Number(member.ten) == 1) ? 1 : 0;
                PresentItems += (Number(member.eleven) == 1) ? 1 : 0;
                PresentItems += (Number(member.twelve) == 1) ? 1 : 0;
                PresentItems += (Number(member.thirteen) == 1) ? 1 : 0;
                PresentItems += (Number(member.fourteen) == 1) ? 1 : 0;
                PresentItems += (Number(member.fifteen) == 1) ? 1 : 0;
                PresentItems += (Number(member.sixteen) == 1) ? 1 : 0;
                PresentItems += (Number(member.seventeen) == 1) ? 1 : 0;
                PresentItems += (Number(member.eighteen) == 1) ? 1 : 0;
                PresentItems += (Number(member.nineteen) == 1) ? 1 : 0;
                PresentItems += (Number(member.twenty) == 1) ? 1 : 0;
                PresentItems += (Number(member.twentyone) == 1) ? 1 : 0;
                PresentItems += (Number(member.twentytwo) == 1) ? 1 : 0;
                PresentItems += (Number(member.twentythree) == 1) ? 1 : 0;
                PresentItems += (Number(member.twentyfour) == 1) ? 1 : 0;
                PresentItems += (Number(member.twentyfive) == 1) ? 1 : 0;
                PresentItems += (Number(member.twentysix) == 1) ? 1 : 0;
                PresentItems += (Number(member.twentyseven) == 1) ? 1 : 0;
                if($scope.noOfDays>=28){
                    PresentItems += (Number(member.twentyeight) == 1) ? 1 : 0;
                    if($scope.noOfDays>=29){
                    PresentItems += (Number(member.twentynine) == 1) ? 1 : 0;
                        if($scope.noOfDays>=30){
                    PresentItems += (Number(member.thirty) == 1) ? 1 : 0;
                            if($scope.noOfDays>=31){
                    PresentItems += (Number(member.thirtyone) == 1) ? 1 : 0;
                            }
                        }
                    }
                }
                if (member.jobcode != 'DVR') {
                    od1Items += (member.od1one == 1) ? 1 : 0;
                    // if(member.od1one==0){
                    //     member.od2one=0;
                    // }
                    od1Items += (member.od1two == 1) ? 1 : 0;
                    // if(member.od1two==0){
                    //     member.od2two=0;
                    // }
                    od1Items += (member.od1three == 1) ? 1 : 0;
                    // if(member.od1three==0){
                    //     member.od2three=0;
                    // }
                    od1Items += (member.od1four == 1) ? 1 : 0;
                    // if(member.od1four==0){
                    //     member.od2four=0;
                    // }
                    od1Items += (member.od1five == 1) ? 1 : 0;
                    // if(member.od1five==0){
                    //     member.od2five=0;
                    // }
                    od1Items += (member.od1six == 1) ? 1 : 0;
                    // if(member.od1six==0){
                    //     member.od2six=0;
                    // }
                    od1Items += (member.od1seven == 1) ? 1 : 0;
                    // if(member.od1seven==0){
                    //     member.od2seven=0;
                    // }
                    od1Items += (member.od1eight == 1) ? 1 : 0;
                    // if(member.od1eight==0){
                    //     member.od2eight=0;
                    // }
                    od1Items += (member.od1nine == 1) ? 1 : 0;
                    // if(member.od1nine==0){
                    //     member.od2nine=0;
                    // }
                    od1Items += (member.od1ten == 1) ? 1 : 0;
                    // if(member.od1ten==0){
                    //     member.od2ten=0;
                    // }
                    od1Items += (member.od1eleven == 1) ? 1 : 0;
                    // if(member.od1eleven==0){
                    //     member.od2eleven=0;
                    // }
                    od1Items += (member.od1twelve == 1) ? 1 : 0;
                    // if(member.od1twelve==0){
                    //     member.od2twelve=0;
                    // }
                    od1Items += (member.od1thirteen == 1) ? 1 : 0;
                    // if(member.od1thirteen==0){
                    //     member.od2thirteen=0;
                    // }
                    od1Items += (member.od1fourteen == 1) ? 1 : 0;
                    // if(member.od1fourteen==0){
                    //     member.od2fourteen=0;
                    // }
                    od1Items += (member.od1fifteen == 1) ? 1 : 0;
                    // if(member.od1fifteen==0){
                    //     member.od2fifteen=0;
                    // }
                    od1Items += (member.od1sixteen == 1) ? 1 : 0;
                    // if(member.od1sixteen==0){
                    //     member.od2sixteen=0;
                    // }
                    od1Items += (member.od1seventeen == 1) ? 1 : 0;
                    // if(member.od1seventeen==0){
                    //     member.od2seventeen=0;
                    // }
                    od1Items += (member.od1eighteen == 1) ? 1 : 0;
                    // if(member.od1eighteen==0){
                    //     member.od2eighteen=0;
                    // }
                    od1Items += (member.od1nineteen == 1) ? 1 : 0;
                    // if(member.od1nineteen==0){
                    //     member.od2nineteen=0;
                    // }
                    od1Items += (member.od1twenty == 1) ? 1 : 0;
                    // if(member.od1twenty==0){
                    //     member.od2twenty=0;
                    // }
                    od1Items += (member.od1twentyone == 1) ? 1 : 0;
                    // if(member.od1twentyone==0){
                    //     member.od2twentyone=0;
                    // }
                    od1Items += (member.od1twentytwo == 1) ? 1 : 0;
                    // if(member.od1twentytwo==0){
                    //     member.od2twentytwo=0;
                    // }
                    od1Items += (member.od1twentythree == 1) ? 1 : 0;
                    // if(member.od1twentythree==0){
                    //     member.od2twentythree=0;
                    // }
                    od1Items += (member.od1twentyfour == 1) ? 1 : 0;
                    // if(member.od1twentyfour==0){
                    //     member.od2twentyfour=0;
                    // }
                    od1Items += (member.od1twentyfive == 1) ? 1 : 0;
                    // if(member.od1twentyfive==0){
                    //     member.od2twentyfive=0;
                    // }
                    od1Items += (member.od1twentysix == 1) ? 1 : 0;
                    // if(member.od1twentysix==0){
                    //     member.od2twentysix=0;
                    // }
                    od1Items += (member.od1twentyseven == 1) ? 1 : 0;
                    // if(member.od1twentyseven==0){
                    //     member.od2twentyseven=0;
                    // }
                    if($scope.noOfDays>=28){
                    od1Items += (member.od1twentyeight == 1) ? 1 : 0;
                    }
                    // if(member.od1twentyeight==0){
                    //     member.od2twentyeight=0;
                    // }
                    if($scope.noOfDays>=29){
                    od1Items += (member.od1twentynine == 1) ? 1 : 0;
                    }
                    // if(member.od1twentynine==0){
                    //     member.od2twentynine=0;
                    // }
                        if($scope.noOfDays>=30){
                    od1Items += (member.od1thirty == 1) ? 1 : 0;
                    }
                    // if(member.od1thirty==0){
                    //     member.od2thirty=0;
                    // }
                        if($scope.noOfDays>=31){
                    od1Items += (member.od1thirtyone == 1) ? 1 : 0;
                    }
                    // if(member.od1thirtyone==0){
                    //     member.od2thirtyone=0;
                    // }
                } else {
                    if((Number(member.ed1select)) == 1 ) { 
                        if(member.one=="0"){
                            od1Items += 0;	
                        }
                        else if(member.one=="1"){
                            od1Items += (Number(member.od1one));
                        }	
                        od1Items += (Number(member.od1two));
                        od1Items += (Number(member.od1three));
                        od1Items += (Number(member.od1four));
                        od1Items += (Number(member.od1five));
                        od1Items += (Number(member.od1six));
                        od1Items += (Number(member.od1seven));
                        od1Items += (Number(member.od1eight));
                        od1Items += (Number(member.od1nine));
                        od1Items += (Number(member.od1ten));
                        od1Items += (Number(member.od1eleven));
                        od1Items += (Number(member.od1twelve));
                        od1Items += (Number(member.od1thirteen));
                        od1Items += (Number(member.od1fourteen));
                        od1Items += (Number(member.od1fifteen));
                        od1Items += (Number(member.od1sixteen));
                        od1Items += (Number(member.od1seventeen));
                        od1Items += (Number(member.od1eighteen));
                        od1Items += (Number(member.od1nineteen));
                        od1Items += (Number(member.od1twenty));
                        od1Items += (Number(member.od1twentyone));
                        od1Items += (Number(member.od1twentytwo));
                        od1Items += (Number(member.od1twentythree));
                        od1Items += (Number(member.od1twentyfour));
                        od1Items += (Number(member.od1twentyfive));
                        od1Items += (Number(member.od1twentysix));
                        od1Items += (Number(member.od1twentyseven));
                        od1Items += (Number(member.od1twentyeight));
                        od1Items += (Number(member.od1twentynine));
                        od1Items += (Number(member.od1thirty));
                        od1Items += (Number(member.od1thirtyone));            
                        od1Items = Number(od1Items).toFixed(2);
                    }
                    else {
                        od2Items = 0;
                    }
                }
                if((Number(member.ed2select)) == 1 ) { 
                    od2Items += (member.od2one == .5) ? .5: 0;
                    od2Items += (member.od2two == .5) ? .5: 0;
                    od2Items += (member.od2three == .5) ? .5: 0;
                    od2Items += (member.od2four == .5) ? .5: 0;
                    od2Items += (member.od2five == .5) ? .5: 0;
                    od2Items += (member.od2six == .5) ? .5: 0;
                    od2Items += (member.od2seven == .5) ? .5: 0;
                    od2Items += (member.od2eight == .5) ? .5: 0;
                    od2Items += (member.od2nine == .5) ? .5: 0;
                    od2Items += (member.od2ten == .5) ? .5: 0;
                    od2Items += (member.od2eleven == .5) ? .5: 0;
                    od2Items += (member.od2twelve == .5) ? .5: 0;
                    od2Items += (member.od2thirteen == .5) ? .5: 0;
                    od2Items += (member.od2fourteen == .5) ? .5: 0;
                    od2Items += (member.od2fifteen == .5) ? .5: 0;
                    od2Items += (member.od2sixteen == .5) ? .5: 0;
                    od2Items += (member.od2seventeen == .5) ? .5: 0;
                    od2Items += (member.od2eighteen == .5) ? .5: 0;
                    od2Items += (member.od2nineteen == .5) ? .5: 0;
                    od2Items += (member.od2twenty == .5) ? .5: 0;
                    od2Items += (member.od2twentyone == .5) ? .5: 0;
                    od2Items += (member.od2twentytwo == .5) ? .5: 0;
                    od2Items += (member.od2twentythree == .5) ? .5: 0;
                    od2Items += (member.od2twentyfour == .5) ? .5: 0;
                    od2Items += (member.od2twentyfive == .5) ? .5: 0;
                    od2Items += (member.od2twentysix == .5) ? .5: 0;
                    od2Items += (member.od2twentyseven == .5) ? .5: 0;
                    od2Items += (member.od2twentyeight == .5) ? .5: 0;
                    od2Items += (member.od2twentynine == .5) ? .5: 0;
                    od2Items += (member.od2thirty == .5) ? .5: 0;
                    od2Items += (member.od2thirtyone == .5) ? .5: 0;
                }else{
                    od2Items = 0;
                }
                if (member.jobcode != 'DVR') {                      
                    if (Number(member.one) == 1)
                        member.valone = 1
                    if (member.od1one == 1)
                        member.valone += 1
                    if (member.od2one == .5)
                        member.valone +=.5
                    if (Number(member.one) == 0)
                        member.valone = 0

                   if (Number(member.two) == 1)
                        member.valtwo = 1
                    if (member.od1two == 1)
                        member.valtwo += 1
                    if (member.od2two == .5 )
                        member.valtwo +=.5
                    if (Number(member.two) == 0)
                        member.valtwo = 0

                    if (Number(member.three) == 1)
                        member.valthree = 1
                    if (member.od1three == 1)
                        member.valthree += 1
                    if (member.od2three == .5)
                        member.valthree +=.5
                    if (Number(member.three) == 0)
                        member.valthree = 0

                    if (Number(member.four) == 1)
                        member.valfour = 1
                    if (member.od1four == 1)
                        member.valfour += 1
                    if (member.od2four == .5)
                        member.valfour +=.5
                    if (Number(member.four) == 0)
                        member.valfour = 0

                    if (Number(member.five) == 1)
                        member.valfive = 1
                    if (member.od1five == 1)
                        member.valfive += 1
                    if (member.od2five == .5)
                        member.valfive +=.5
                    if (Number(member.five) == 0)
                        member.valfive = 0

                    if (Number(member.six) == 1)
                        member.valsix = 1
                    if (member.od1six == 1)
                        member.valsix += 1
                    if (member.od2six == .5)
                        member.valsix +=.5
                    if (Number(member.six) == 0)
                        member.valsix = 0

                    if (Number(member.seven) == 1)
                        member.valseven = 1
                    if (member.od1seven == 1)
                        member.valseven += 1
                    if (member.od2seven == .5)
                        member.valseven +=.5
                    if (Number(member.seven) == 0)
                        member.valseven = 0

                    if (Number(member.eight) == 1)
                        member.valeight = 1
                    if (member.od1eight == 1)
                        member.valeight += 1
                    if (member.od2eight == .5)
                        member.valeight +=.5
                    if (Number(member.eight) == 0)
                        member.valeight = 0

                    if (Number(member.nine) == 1)
                        member.valnine = 1
                    if (member.od1nine == 1)
                        member.valnine += 1
                    if (member.od2nine == .5)
                        member.valnine +=.5
                    if (Number(member.nine) == 0)
                        member.valnine = 0

                    if (Number(member.ten) == 1)
                        member.valten = 1
                    if (member.od1ten == 1)
                        member.valten += 1
                    if (member.od2ten == .5)
                        member.valten +=.5
                    if (Number(member.ten) == 0)
                        member.valten = 0

                    if (Number(member.eleven)== 1)
                        member.valeleven = 1
                    if (member.od1eleven == 1)
                        member.valeleven += 1
                    if (member.od2eleven == .5)
                        member.valeleven +=.5
                    if (Number(member.eleven) == 0)
                        member.valeleven = 0

                    if (Number(member.twelve) == 1)
                        member.valtwelve = 1
                    if (member.od1twelve == 1)
                        member.valtwelve += 1
                    if (member.od2twelve == .5)
                        member.valtwelve +=.5
                    if (Number(member.twelve) == 0)
                        member.valtwelve = 0

                    if (Number(member.thirteen) == 1)
                        member.valthirteen = 1
                    if (member.od1thirteen == 1)
                        member.valthirteen += 1
                    if (member.od2thirteen == .5)
                        member.valthirteen +=.5
                    if (Number(member.thirteen) == 0)
                        member.valthirteen = 0

                    if (Number(member.fourteen) == 1)
                        member.valfourteen = 1
                    if (member.od1fourteen == 1)
                        member.valfourteen += 1
                    if (member.od2fourteen == .5)
                        member.valfourteen +=.5
                    if (Number(member.fourteen) == 0)
                        member.valfourteen = 0

                    if (Number(member.fifteen) == 1)
                        member.valfifteen = 1
                    if (member.od1fifteen == 1)
                        member.valfifteen += 1
                    if (member.od2fifteen == .5)
                        member.valfifteen +=.5
                    if (Number(member.fifteen) == 0)
                        member.valfifteen = 0

                    if (Number(member.sixteen) == 1)
                        member.valsixteen = 1
                    if (member.od1sixteen == 1)
                        member.valsixteen += 1
                    if (member.od2sixteen == .5)
                        member.valsixteen +=.5
                    if (Number(member.sixteen) == 0)
                        member.valsixteen = 0

                    if (Number(member.seventeen) == 1)
                        member.valseventeen = 1
                    if (member.od1seventeen == 1)
                        member.valseventeen += 1
                    if (member.od2seventeen == .5)
                        member.valseventeen +=.5
                    if (Number(member.seventeen) == 0)
                        member.valseventeen = 0

                    if (Number(member.eighteen) == 1)
                        member.valeighteen = 1
                    if (member.od1eighteen == 1)
                        member.valeighteen += 1
                    if (member.od2eighteen == .5)
                        member.valeighteen +=.5
                    if (Number(member.eighteen) == 0)
                        member.valeighteen = 0

                    if (Number(member.nineteen) == 1)
                        member.valnineteen = 1
                    if (member.od1nineteen == 1)
                        member.valnineteen += 1
                    if (member.od2nineteen == .5)
                        member.valnineteen +=.5
                    if (Number(member.nineteen) == 0)
                        member.valnineteen = 0

                    if (Number(member.twenty) == 1)
                        member.valtwenty = 1
                    if (member.od1twenty == 1)
                        member.valtwenty += 1
                    if (member.od2twenty == .5)
                        member.valtwenty +=.5
                    if (Number(member.twenty) == 0)
                        member.valtwenty = 0

                    if (Number(member.twentyone) == 1)
                        member.valtwentyone = 1
                    if (member.od1twentyone == 1)
                        member.valtwentyone += 1
                    if (member.od2twentyone == .5)
                        member.valtwentyone +=.5
                    if (Number(member.twentyone) == 0)
                        member.valtwentyone = 0

                    if (Number(member.twentytwo) == 1)
                        member.valtwentytwo = 1
                    if (member.od1twentytwo == 1)
                        member.valtwentytwo += 1
                    if (member.od2twentytwo == .5)
                        member.valtwentytwo +=.5
                    if (Number(member.twentytwo) == 0)
                        member.valtwentytwo = 0

                    if (Number(member.twentythree) == 1)
                        member.valtwentythree = 1
                    if (member.od1twentythree == 1)
                        member.valtwentythree += 1
                    if (member.od2twentythree == .5)
                        member.valtwentythree +=.5
                    if (Number(member.twentythree) == 0)
                        member.valtwentythree = 0

                    if (Number(member.twentyfour) == 1)
                        member.valtwentyfour = 1
                    if (member.od1twentyfour == 1)
                        member.valtwentyfour += 1
                    if (member.od2twentyfour == .5)
                        member.valtwentyfour +=.5
                    if (Number(member.twentyfour) == 0)
                        member.valtwentyfour = 0

                    if (Number(member.twentyfive) == 1)
                        member.valtwentyfive = 1
                    if (member.od1twentyfive == 1)
                        member.valtwentyfive += 1
                    if (member.od2twentyfive == .5)
                        member.valtwentyfive +=.5
                    if (Number(member.twentyfive) == 0)
                        member.valtwentyfive = 0

                    if (Number(member.twentysix) == 1)
                        member.valtwentysix = 1
                    if (member.od1twentysix == 1)
                        member.valtwentysix += 1
                    if (member.od2twentysix == .5)
                        member.valtwentysix +=.5
                    if (Number(member.twentysix) == 0)
                        member.valtwentysix = 0

                    if (Number(member.twentyseven) == 1)
                        member.valtwentyseven = 1
                    if (member.od1twentyseven == 1)
                        member.valtwentyseven += 1
                    if (member.od2twentyseven == .5)
                        member.valtwentyseven +=.5  
                    if (Number(member.twentyseven) == 0)
                        member.valtwentyseven = 0

                    if($scope.noOfDays>=28){
                        if (Number(member.twentyeight) == 1)
                            member.valtwentyeight = 1
                        if (member.od1twentyeight == 1)
                            member.valtwentyeight += 1
                        if (member.od2twentyeight == .5)
                            member.valtwentyeight +=.5
                        if (Number(member.twentyeight) == 0)
                            member.valtwentyeight = 0
                    }
                    if($scope.noOfDays>=29){
                        if (Number(member.twentynine) == 1)
                            member.valtwentynine = 1
                        if (member.od1twentynine == 1)
                            member.valtwentynine += 1
                        if (member.od2twentynine == .5)
                            member.valtwentynine +=.5
                        if (Number(member.twentynine) == 0)
                            member.valtwentynine = 0
                    }
                    if($scope.noOfDays>=30){
                        if (Number(member.thirty) == 1)
                            member.valthirty = 1
                        if (member.od1thirty == 1)
                            member.valthirty += 1
                        if (member.od2thirty == .5)
                            member.valthirty +=.5
                        if (Number(member.thirty) == 0)
                            member.valthirty = 0
                    }
                    if($scope.noOfDays>=31){
                        if (Number(member.thirtyone) == 1)
                            member.valthirtyone = 1
                        if (member.od1thirtyone == 1)
                            member.valthirtyone += 1
                        if (member.od2thirtyone == .5)
                            member.valthirtyone +=.5
                        if (Number(member.thirtyone) == 0)
                            member.valthirtyone = 0
                    }
                    member.pdays = Number(PresentItems);
                    member.presentdays = Number(PresentItems) + Number(od1Items) + Number(od2Items);
                    member.othours = 0;
                    member.presentdays.toFixed(2);
                    $scope.totaldays += Number(member.presentdays) / 2;

                } else {
                    if (member.one == 1)					
                        member.valone = (Number(member.one) + Number(member.od1one));
                        
                    if (member.two == 1)
                        member.valtwo = Number(member.two) + Number(member.od1two);

                    if (member.three == 1)
                        member.valthree = Number(member.three) + Number(member.od1three);

                    if (member.four == 1)
                        member.valfour = Number(member.four) + Number(member.od1four);

                    if (member.five == 1)
                        member.valfive = Number(member.five) + Number(member.od1five);

                    if (member.six == 1)
                        member.valsix = Number(member.six) + Number(member.od1six);

                    if (member.seven == 1)
                        member.valseven = Number(member.seven) + Number(member.od1seven);

                    if (member.eight == 1)
                        member.valeight = Number(member.eight) + Number(member.od1eight);

                    if (member.nine == 1)
                        member.valnine = Number(member.nine) + Number(member.od1nine);

                    if (member.ten == 1)
                        member.valten = Number(member.ten) + Number(member.od1ten);

                    if (member.eleven == 1)
                        member.valeleven = Number(member.eleven) + Number(member.od1eleven);

                    if (member.twelve == 1)
                        member.valtwelve = Number(member.twelve) + Number(member.od1twelve);

                    if (member.thirteen == 1)
                        member.valthirteen = Number(member.thirteen) + Number(member.od1thirteen);

                    if (member.fourteen == 1)
                        member.valfourteen = Number(member.fourteen) + Number(member.od1fourteen);

                    if (member.fifteen == 1)
                        member.valfifteen = Number(member.fifteen) + Number(member.od1fifteen);

                    if (member.sixteen == 1)
                        member.valsixteen = Number(member.sixteen) + Number(member.od1sixteen);

                    if (member.seventeen == 1)
                        member.valseventeen = Number(member.seventeen) + Number(member.od1seventeen);

                    if (member.eighteen == 1)
                        member.valeighteen = Number(member.eighteen) + Number(member.od1eighteen);

                    if (member.nineteen == 1)
                        member.valnineteen = Number(member.nineteen) + Number(member.od1nineteen);

                    if (member.twenty == 1)
                        member.valtwenty = Number(member.twenty) + Number(member.od1twenty);

                    if (member.twentyone == 1)
                        member.valtwentyone = Number(member.twentyone) + Number(member.od1twentyone);

                    if (member.twentytwo == 1)
                        member.valtwentytwo = Number(member.twentytwo) + Number(member.od1twentytwo);

                    if (member.twentythree == 1)
                        member.valtwentythree = Number(member.twentythree) + Number(member.od1twentythree);

                    if (member.twentyfour == 1)
                        member.valtwentyfour = Number(member.twentyfour) + Number(member.od1twentyfour);

                    if (member.twentyfive == 1)
                        member.valtwentyfive = Number(member.twentyfive) + Number(member.od1twentyfive);

                    if (member.twentysix == 1)
                        member.valtwentysix = Number(member.twentysix) + Number(member.od1twentysix);

                    if (member.twentyseven == 1)
                        member.valtwentyseven = Number(member.twentyseven) + Number(member.od1twentyseven);

                    if (member.twentyeight == 1)
                        member.valtwentyeight = Number(member.twentyeight) + Number(member.od1twentyeight);

                    if (member.twentynine == 1)
                        member.valtwentynine = Number(member.twentynine) + Number(member.od1twentynine);

                    if (member.thirty == 1)
                        member.valthirty = Number(member.thirty) + Number(member.od1thirty);

                    if (Number(member.thirtyone) == 1)
                        member.valthirtyone = Number(member.thirtyone) + Number(member.od1thirtyone);


                    member.pdays = Number(PresentItems);
                    member.presentdays = Number(PresentItems);
                    member.othours = parseFloat(od1Items);
                    $scope.totaldays = member.presentdays

                }
                member.od1Items = od1Items;
                member.od2Items = od2Items;
                PresentItems = 0;
                od1Items = 0;
                od2Items = 0;
            }else{
                if(Number(selmemberid) == Number(member.memberid)) {
                    member.od1one = 0;
                    member.od1two = 0;
                    member.od1three = 0;
                    member.od1four  = 0;
                    member.od1five  = 0;
                    member.od1six  = 0;
                    member.od1seven  = 0;
                    member.od1eight  = 0;
                    member.od1nine  = 0;
                    member.od1ten   = 0;
                    member.od1eleven  = 0;
                    member.od1twelve = 0;
                    member.od1thirteen = 0;
                    member.od1fourteen  = 0;
                    member.od1fifteen  = 0;
                    member.od1sixteen  = 0;
                    member.od1seventeen  = 0;
                    member.od1eighteen  = 0;
                    member.od1nineteen  = 0;
                    member.od1twenty  = 0;
                    member.od1twentyone  = 0;
                    member.od1twentytwo = 0;
                    member.od1twentythree  = 0;
                    member.od1twentyfour  = 0;
                    member.od1twentyfive  = 0;
                    member.od1twentysix = 0;
                    member.od1twentyseven = 0;
                    member.od1twentyeight = 0;
                    member.od1twentynine = 0;
                    member.od1thirty = 0;
                    member.od1thirtyone = 0;
                    // member.od2one = 0;
                    // member.od2two = 0;
                    // member.od2three = 0;
                    // member.od2four  = 0;
                    // member.od2five  = 0;
                    // member.od2six  = 0;
                    // member.od2seven  = 0;
                    // member.od2eight  = 0;
                    // member.od2nine  = 0;
                    // member.od2ten   = 0;
                    // member.od2eleven  = 0;
                    // member.od2twelve = 0;
                    // member.od2thirteen = 0;
                    // member.od2fourteen  = 0;
                    // member.od2fifteen  = 0;
                    // member.od2sixteen  = 0;
                    // member.od2seventeen  = 0;
                    // member.od2eighteen  = 0;
                    // member.od2nineteen  = 0;
                    // member.od2twenty  = 0;
                    // member.od2twentyone  = 0;
                    // member.od2twentytwo = 0;
                    // member.od2twentythree  = 0;
                    // member.od2twentyfour  = 0;
                    // member.od2twentyfive  = 0;
                    // member.od2twentysix = 0;
                    // member.od2twentyseven = 0;
                    // member.od2twentyeight = 0;
                    // member.od2twentynine = 0;
                    // member.od2thirty = 0;
                    // member.od2thirtyone = 0;
                    //member.pdays = 0;
                   // member.presentdays = 0;
                    member.othours = 0; 
                    member.othours = 0;
                    member.od1Items = 0;
                   // member.od2Items = 0;
                }                
            }
        })
        $scope.loading=false;
    }
    $scope.ed2SelectChange = function(members,ed2select,selmemberid) {
        $scope.loading=true;
        $scope.count = [];
        $scope.values = {};
        var totaldays = 0;
        var totalhours = 0;
        var PresentItems = 0;
        var od1Items = 0;
        var od2Items = 0;
        angular.forEach(members, function(member) {
            if((Number(member.ed2select)) == 1 ) {
                console.log(member.eleven);
                member.od2one = (Number(member.one) == 1) ? .5 : 0;
                member.od2two = (Number(member.two) == 1) ? .5 : 0;
                member.od2three = (Number(member.three) == 1) ? .5 : 0;
                member.od2four  = (Number(member.four) == 1) ? .5 : 0;
                member.od2five  = (Number(member.five) == 1) ? .5 : 0;
                member.od2six  = (Number(member.six) == 1) ? .5 : 0;
                member.od2seven  = (Number(member.seven) == 1) ? .5 : 0;
                member.od2eight  = (Number(member.eight) == 1) ? .5 : 0;
                member.od2nine  = (Number(member.nine) == 1) ? .5 : 0;
                member.od2ten   = (Number(member.ten) == 1) ? .5 : 0;
                member.od2eleven  = (Number(member.eleven) == 1) ? .5 : 0;
                 member.od2twelve = (Number(member.twelve) == 1) ? .5 : 0;
                 member.od2thirteen = (Number(member.thirteen) == 1) ? .5 : 0;
                 member.od2fourteen  = (Number(member.fourteen) == 1) ? .5 : 0;
                 member.od2fifteen  = (Number(member.fifteen) == 1) ? .5 : 0;
                 member.od2sixteen  = (Number(member.sixteen) == 1) ? .5 : 0;
                member.od2seventeen  = (Number(member.seventeen) == 1) ? .5 : 0;
                member.od2eighteen  = (Number(member.eighteen) == 1) ? .5 : 0;
                member.od2nineteen  = (Number(member.nineteen) == 1) ? .5 : 0;
                 member.od2twenty  = (Number(member.twenty) == 1) ? .5 : 0;
                member.od2twentyone  = (Number(member.twentyone) == 1) ? .5 : 0;
                member.od2twentytwo = (Number(member.twentytwo) == 1) ? .5 : 0;
                member.od2twentythree  = (Number(member.twentythree) == 1) ? .5 : 0;
                member.od2twentyfour  = (Number(member.twentyfour) == 1) ? .5 : 0;
                member.od2twentyfive  = (Number(member.twentyfive) == 1) ? .5 : 0;
                member.od2twentysix  = (Number(member.twentysix) == 1) ? .5 : 0;
                member.od2twentyseven = (Number(member.twentyseven) == 1) ? .5 : 0;
                if($scope.noOfDays>=28){
                    member.od2twentyeight  = (Number(member.twentyeight) == 1) ? .5 : 0;
                    if($scope.noOfDays>=29){
                        member.od2twentynine  = (Number(member.twentynine) == 1) ? .5 : 0;
                        if($scope.noOfDays>=30){
                            member.od2thirty  = (Number(member.thirty) == 1) ? .5 : 0;
                            if($scope.noOfDays>=31){
                                member.od2thirtyone  = (Number(member.thirtyone) == 1) ? .5 : 0;
                            }
                        }
                    }
                }
                PresentItems += (Number(member.one) == 1) ? 1 : 0;
                PresentItems += (Number(member.two) == 1) ? 1 : 0;
                PresentItems += (Number(member.three) == 1) ? 1 : 0;
                PresentItems += (Number(member.four) == 1) ? 1 : 0;
                PresentItems += (Number(member.five) == 1) ? 1 : 0;
                PresentItems += (Number(member.six) == 1) ? 1 : 0;
                PresentItems += (Number(member.seven) == 1) ? 1 : 0;
                PresentItems += (Number(member.eight) == 1) ? 1 : 0;
                PresentItems += (Number(member.nine) == 1) ? 1 : 0;
                PresentItems += (Number(member.ten) == 1) ? 1 : 0;
                PresentItems += (Number(member.eleven) == 1) ? 1 : 0;
                PresentItems += (Number(member.twelve) == 1) ? 1 : 0;
                PresentItems += (Number(member.thirteen) == 1) ? 1 : 0;
                PresentItems += (Number(member.fourteen) == 1) ? 1 : 0;
                PresentItems += (Number(member.fifteen) == 1) ? 1 : 0;
                PresentItems += (Number(member.sixteen) == 1) ? 1 : 0;
                PresentItems += (Number(member.seventeen) == 1) ? 1 : 0;
                PresentItems += (Number(member.eighteen) == 1) ? 1 : 0;
                PresentItems += (Number(member.nineteen) == 1) ? 1 : 0;
                PresentItems += (Number(member.twenty) == 1) ? 1 : 0;
                PresentItems += (Number(member.twentyone) == 1) ? 1 : 0;
                PresentItems += (Number(member.twentytwo) == 1) ? 1 : 0;
                PresentItems += (Number(member.twentythree) == 1) ? 1 : 0;
                PresentItems += (Number(member.twentyfour) == 1) ? 1 : 0;
                PresentItems += (Number(member.twentyfive) == 1) ? 1 : 0;
                PresentItems += (Number(member.twentysix) == 1) ? 1 : 0;
                PresentItems += (Number(member.twentyseven) == 1) ? 1 : 0;
                if($scope.noOfDays>=28){
                    PresentItems += (Number(member.twentyeight) == 1) ? 1 : 0;
                    if($scope.noOfDays>=29){
                    PresentItems += (Number(member.twentynine) == 1) ? 1 : 0;
                        if($scope.noOfDays>=30){
                    PresentItems += (Number(member.thirty) == 1) ? 1 : 0;
                            if($scope.noOfDays>=31){
                    PresentItems += (Number(member.thirtyone) == 1) ? 1 : 0;
                            }
                        }
                    }
                }
                if (member.jobcode != 'DVR') {
                    od1Items += (member.od1one == 1) ? 1 : 0;
                    // if(member.od1one==0){
                    //     member.od2one=0;
                    // }
                    od1Items += (member.od1two == 1) ? 1 : 0;
                    // if(member.od1two==0){
                    //     member.od2two=0;
                    // }
                    od1Items += (member.od1three == 1) ? 1 : 0;
                    // if(member.od1three==0){
                    //     member.od2three=0;
                    // }
                    od1Items += (member.od1four == 1) ? 1 : 0;
                    // if(member.od1four==0){
                    //     member.od2four=0;
                    // }
                    od1Items += (member.od1five == 1) ? 1 : 0;
                    // if(member.od1five==0){
                    //     member.od2five=0;
                    // }
                    od1Items += (member.od1six == 1) ? 1 : 0;
                    // if(member.od1six==0){
                    //     member.od2six=0;
                    // }
                    od1Items += (member.od1seven == 1) ? 1 : 0;
                    // if(member.od1seven==0){
                    //     member.od2seven=0;
                    // }
                    od1Items += (member.od1eight == 1) ? 1 : 0;
                    // if(member.od1eight==0){
                    //     member.od2eight=0;
                    // }
                    od1Items += (member.od1nine == 1) ? 1 : 0;
                    // if(member.od1nine==0){
                    //     member.od2nine=0;
                    // }
                    od1Items += (member.od1ten == 1) ? 1 : 0;
                    // if(member.od1ten==0){
                    //     member.od2ten=0;
                    // }
                    od1Items += (member.od1eleven == 1) ? 1 : 0;
                    // if(member.od1eleven==0){
                       // member.od2eleven=0;
                    //}
                    od1Items += (member.od1twelve == 1) ? 1 : 0;
                    // if(member.od1twelve==0){
                    //     member.od2twelve=0;
                    // }
                    od1Items += (member.od1thirteen == 1) ? 1 : 0;
                    // if(member.od1thirteen==0){
                    //     member.od2thirteen=0;
                    // }
                    od1Items += (member.od1fourteen == 1) ? 1 : 0;
                    // if(member.od1fourteen==0){
                    //     member.od2fourteen=0;
                    // }
                    od1Items += (member.od1fifteen == 1) ? 1 : 0;
                    // if(member.od1fifteen==0){
                    //     member.od2fifteen=0;
                    // }
                    od1Items += (member.od1sixteen == 1) ? 1 : 0;
                    // if(member.od1sixteen==0){
                    //     member.od2sixteen=0;
                    // }
                    od1Items += (member.od1seventeen == 1) ? 1 : 0;
                    // if(member.od1seventeen==0){
                    //     member.od2seventeen=0;
                    // }
                    od1Items += (member.od1eighteen == 1) ? 1 : 0;
                    // if(member.od1eighteen==0){
                    //     member.od2eighteen=0;
                    // }
                    od1Items += (member.od1nineteen == 1) ? 1 : 0;
                    // if(member.od1nineteen==0){
                    //     member.od2nineteen=0;
                    // }
                    od1Items += (member.od1twenty == 1) ? 1 : 0;
                    // if(member.od1twenty==0){
                    //     member.od2twenty=0;
                    // }
                    od1Items += (member.od1twentyone == 1) ? 1 : 0;
                    // if(member.od1twentyone==0){
                    //     member.od2twentyone=0;
                    // }
                    od1Items += (member.od1twentytwo == 1) ? 1 : 0;
                    // if(member.od1twentytwo==0){
                    //     member.od2twentytwo=0;
                    // }
                    od1Items += (member.od1twentythree == 1) ? 1 : 0;
                    // if(member.od1twentythree==0){
                    //     member.od2twentythree=0;
                    // }
                    od1Items += (member.od1twentyfour == 1) ? 1 : 0;
                    // if(member.od1twentyfour==0){
                    //     member.od2twentyfour=0;
                    // }
                    od1Items += (member.od1twentyfive == 1) ? 1 : 0;
                    // if(member.od1twentyfive==0){
                    //     member.od2twentyfive=0;
                    // }
                    od1Items += (member.od1twentysix == 1) ? 1 : 0;
                    // if(member.od1twentysix==0){
                    //     member.od2twentysix=0;
                    // }
                    od1Items += (member.od1twentyseven == 1) ? 1 : 0;
                    // if(member.od1twentyseven==0){
                    //     member.od2twentyseven=0;
                    // }
                    if($scope.noOfDays>=28){
                    od1Items += (member.od1twentyeight == 1) ? 1 : 0;
                    }
                    // if(member.od1twentyeight==0){
                    //     member.od2twentyeight=0;
                    // }
                    if($scope.noOfDays>=29){
                    od1Items += (member.od1twentynine == 1) ? 1 : 0;
                    }
                    // if(member.od1twentynine==0){
                    //     member.od2twentynine=0;
                    // }
                        if($scope.noOfDays>=30){
                    od1Items += (member.od1thirty == 1) ? 1 : 0;
                    }
                    // if(member.od1thirty==0){
                    //     member.od2thirty=0;
                    // }
                        if($scope.noOfDays>=31){
                    od1Items += (member.od1thirtyone == 1) ? 1 : 0;
                    }
                    // if(member.od1thirtyone==0){
                    //     member.od2thirtyone=0;
                    // }
                } else {
                    if((Number(member.ed1select)) == 1 ) { 
                        if(member.one=="0"){
                            od1Items += 0;	
                        }
                        else if(member.one=="1"){
                            od1Items += (Number(member.od1one));
                        }	
                        od1Items += (Number(member.od1two));
                        od1Items += (Number(member.od1three));
                        od1Items += (Number(member.od1four));
                        od1Items += (Number(member.od1five));
                        od1Items += (Number(member.od1six));
                        od1Items += (Number(member.od1seven));
                        od1Items += (Number(member.od1eight));
                        od1Items += (Number(member.od1nine));
                        od1Items += (Number(member.od1ten));
                        od1Items += (Number(member.od1eleven));
                        od1Items += (Number(member.od1twelve));
                        od1Items += (Number(member.od1thirteen));
                        od1Items += (Number(member.od1fourteen));
                        od1Items += (Number(member.od1fifteen));
                        od1Items += (Number(member.od1sixteen));
                        od1Items += (Number(member.od1seventeen));
                        od1Items += (Number(member.od1eighteen));
                        od1Items += (Number(member.od1nineteen));
                        od1Items += (Number(member.od1twenty));
                        od1Items += (Number(member.od1twentyone));
                        od1Items += (Number(member.od1twentytwo));
                        od1Items += (Number(member.od1twentythree));
                        od1Items += (Number(member.od1twentyfour));
                        od1Items += (Number(member.od1twentyfive));
                        od1Items += (Number(member.od1twentysix));
                        od1Items += (Number(member.od1twentyseven));
                        od1Items += (Number(member.od1twentyeight));
                        od1Items += (Number(member.od1twentynine));
                        od1Items += (Number(member.od1thirty));
                        od1Items += (Number(member.od1thirtyone));            
                        od1Items = Number(od1Items).toFixed(2);
                    }
                    else {
                        od2Items = 0;
                    }
                }
                if((Number(member.ed2select)) == 1 ) { 
                    od2Items += (member.od2one == .5) ? .5 : 0;
                    od2Items += (member.od2two == .5) ? .5 : 0;
                    od2Items += (member.od2three == .5) ? .5 : 0;
                    od2Items += (member.od2four == .5) ? .5 : 0;
                    od2Items += (member.od2five == .5) ? .5 : 0;
                    od2Items += (member.od2six == .5) ? .5 : 0;
                    od2Items += (member.od2seven == .5) ? .5 : 0;
                    od2Items += (member.od2eight == .5) ? .5 : 0;
                    od2Items += (member.od2nine == .5) ? .5 : 0;
                    od2Items += (member.od2ten == .5) ? .5 : 0;
                    od2Items += (member.od2eleven == .5) ? .5 : 0;
                    od2Items += (member.od2twelve == .5) ? .5 : 0;
                    od2Items += (member.od2thirteen == .5) ? .5 : 0;
                    od2Items += (member.od2fourteen == .5) ? .5 : 0;
                    od2Items += (member.od2fifteen == .5) ? .5 : 0;
                    od2Items += (member.od2sixteen == .5) ? .5 : 0;
                    od2Items += (member.od2seventeen == .5) ? .5 : 0;
                    od2Items += (member.od2eighteen == .5) ? .5 : 0;
                    od2Items += (member.od2nineteen == .5) ? .5 : 0;
                    od2Items += (member.od2twenty == .5) ? .5 : 0;
                    od2Items += (member.od2twentyone == .5) ? .5 : 0;
                    od2Items += (member.od2twentytwo == .5) ? .5 : 0;
                    od2Items += (member.od2twentythree == .5) ? .5 : 0;
                    od2Items += (member.od2twentyfour == .5) ? .5 : 0;
                    od2Items += (member.od2twentyfive == .5) ? .5 : 0;
                    od2Items += (member.od2twentysix == .5) ? .5 : 0;
                    od2Items += (member.od2twentyseven == .5) ? .5 : 0;
                    od2Items += (member.od2twentyeight == .5) ? .5 : 0;
                    od2Items += (member.od2twentynine == .5) ? .5 : 0;
                    od2Items += (member.od2thirty == .5) ? .5 : 0;
                    od2Items += (member.od2thirtyone == .5) ? .5 : 0;
                }else{
                    od2Items = 0;
                }
                if (member.jobcode != 'DVR') {                      
                    if (Number(member.one) == 1)
                        member.valone = 1
                    if (member.od1one == 1)
                        member.valone += 1
                    if (member.od2one == .5)
                        member.valone +=.5
                    if (Number(member.one) == 0)
                        member.valone = 0

                   if (Number(member.two) == 1)
                        member.valtwo = 1
                    if (member.od1two == 1)
                        member.valtwo += 1
                    if (member.od2two == .5 )
                        member.valtwo +=.5
                    if (Number(member.two) == 0)
                        member.valtwo = 0

                    if (Number(member.three) == 1)
                        member.valthree = 1
                    if (member.od1three == 1)
                        member.valthree += 1
                    if (member.od2three == .5)
                        member.valthree +=.5
                    if (Number(member.three) == 0)
                        member.valthree = 0

                    if (Number(member.four) == 1)
                        member.valfour = 1
                    if (member.od1four == 1)
                        member.valfour += 1
                    if (member.od2four == .5)
                        member.valfour +=.5
                    if (Number(member.four) == 0)
                        member.valfour = 0

                    if (Number(member.five) == 1)
                        member.valfive = 1
                    if (member.od1five == 1)
                        member.valfive += 1
                    if (member.od2five == .5)
                        member.valfive +=.5
                    if (Number(member.five) == 0)
                        member.valfive = 0

                    if (Number(member.six) == 1)
                        member.valsix = 1
                    if (member.od1six == 1)
                        member.valsix += 1
                    if (member.od2six == .5)
                        member.valsix +=.5
                    if (Number(member.six) == 0)
                        member.valsix = 0

                    if (Number(member.seven) == 1)
                        member.valseven = 1
                    if (member.od1seven == 1)
                        member.valseven += 1
                    if (member.od2seven == .5)
                        member.valseven +=.5
                    if (Number(member.seven) == 0)
                        member.valseven = 0

                    if (Number(member.eight) == 1)
                        member.valeight = 1
                    if (member.od1eight == 1)
                        member.valeight += 1
                    if (member.od2eight == .5)
                        member.valeight +=.5
                    if (Number(member.eight) == 0)
                        member.valeight = 0

                    if (Number(member.nine) == 1)
                        member.valnine = 1
                    if (member.od1nine == 1)
                        member.valnine += 1
                    if (member.od2nine == .5)
                        member.valnine +=.5
                    if (Number(member.nine) == 0)
                        member.valnine = 0

                    if (Number(member.ten) == 1)
                        member.valten = 1
                    if (member.od1ten == 1)
                        member.valten += 1
                    if (member.od2ten == .5)
                        member.valten +=.5
                    if (Number(member.ten) == 0)
                        member.valten = 0

                    if (Number(member.eleven)== 1)
                        member.valeleven = 1
                    if (member.od1eleven == 1)
                        member.valeleven += 1
                    if (member.od2eleven == .5)
                        member.valeleven +=.5
                    if (Number(member.eleven) == 0)
                        member.valeleven = 0

                    if (Number(member.twelve) == 1)
                        member.valtwelve = 1
                    if (member.od1twelve == 1)
                        member.valtwelve += 1
                    if (member.od2twelve == .5)
                        member.valtwelve +=.5
                    if (Number(member.twelve) == 0)
                        member.valtwelve = 0

                    if (Number(member.thirteen) == 1)
                        member.valthirteen = 1
                    if (member.od1thirteen == 1)
                        member.valthirteen += 1
                    if (member.od2thirteen == .5)
                        member.valthirteen +=.5
                    if (Number(member.thirteen) == 0)
                        member.valthirteen = 0

                    if (Number(member.fourteen) == 1)
                        member.valfourteen = 1
                    if (member.od1fourteen == 1)
                        member.valfourteen += 1
                    if (member.od2fourteen == .5)
                        member.valfourteen +=.5
                    if (Number(member.fourteen) == 0)
                        member.valfourteen = 0

                    if (Number(member.fifteen) == 1)
                        member.valfifteen = 1
                    if (member.od1fifteen == 1)
                        member.valfifteen += 1
                    if (member.od2fifteen == .5)
                        member.valfifteen +=.5
                    if (Number(member.fifteen) == 0)
                        member.valfifteen = 0

                    if (Number(member.sixteen) == 1)
                        member.valsixteen = 1
                    if (member.od1sixteen == 1)
                        member.valsixteen += 1
                    if (member.od2sixteen == .5)
                        member.valsixteen +=.5
                    if (Number(member.sixteen) == 0)
                        member.valsixteen = 0

                    if (Number(member.seventeen) == 1)
                        member.valseventeen = 1
                    if (member.od1seventeen == 1)
                        member.valseventeen += 1
                    if (member.od2seventeen == .5)
                        member.valseventeen +=.5
                    if (Number(member.seventeen) == 0)
                        member.valseventeen = 0

                    if (Number(member.eighteen) == 1)
                        member.valeighteen = 1
                    if (member.od1eighteen == 1)
                        member.valeighteen += 1
                    if (member.od2eighteen == .5)
                        member.valeighteen +=.5
                    if (Number(member.eighteen) == 0)
                        member.valeighteen = 0

                    if (Number(member.nineteen) == 1)
                        member.valnineteen = 1
                    if (member.od1nineteen == 1)
                        member.valnineteen += 1
                    if (member.od2nineteen == .5)
                        member.valnineteen +=.5
                    if (Number(member.nineteen) == 0)
                        member.valnineteen = 0

                    if (Number(member.twenty) == 1)
                        member.valtwenty = 1
                    if (member.od1twenty == 1)
                        member.valtwenty += 1
                    if (member.od2twenty == .5)
                        member.valtwenty +=.5
                    if (Number(member.twenty) == 0)
                        member.valtwenty = 0

                    if (Number(member.twentyone) == 1)
                        member.valtwentyone = 1
                    if (member.od1twentyone == 1)
                        member.valtwentyone += 1
                    if (member.od2twentyone == .5)
                        member.valtwentyone +=.5
                    if (Number(member.twentyone) == 0)
                        member.valtwentyone = 0

                    if (Number(member.twentytwo) == 1)
                        member.valtwentytwo = 1
                    if (member.od1twentytwo == 1)
                        member.valtwentytwo += 1
                    if (member.od2twentytwo == .5)
                        member.valtwentytwo +=.5
                    if (Number(member.twentytwo) == 0)
                        member.valtwentytwo = 0

                    if (Number(member.twentythree) == 1)
                        member.valtwentythree = 1
                    if (member.od1twentythree == 1)
                        member.valtwentythree += 1
                    if (member.od2twentythree == .5)
                        member.valtwentythree +=.5
                    if (Number(member.twentythree) == 0)
                        member.valtwentythree = 0

                    if (Number(member.twentyfour) == 1)
                        member.valtwentyfour = 1
                    if (member.od1twentyfour == 1)
                        member.valtwentyfour += 1
                    if (member.od2twentyfour == .5)
                        member.valtwentyfour +=.5
                    if (Number(member.twentyfour) == 0)
                        member.valtwentyfour = 0

                    if (Number(member.twentyfive) == 1)
                        member.valtwentyfive = 1
                    if (member.od1twentyfive == 1)
                        member.valtwentyfive += 1
                    if (member.od2twentyfive == .5)
                        member.valtwentyfive +=.5
                    if (Number(member.twentyfive) == 0)
                        member.valtwentyfive = 0

                    if (Number(member.twentysix) == 1)
                        member.valtwentysix = 1
                    if (member.od1twentysix == 1)
                        member.valtwentysix += 1
                    if (member.od2twentysix == .5)
                        member.valtwentysix +=.5
                    if (Number(member.twentysix) == 0)
                        member.valtwentysix = 0

                    if (Number(member.twentyseven) == 1)
                        member.valtwentyseven = 1
                    if (member.od1twentyseven == 1)
                        member.valtwentyseven += 1
                    if (member.od2twentyseven == .5)
                        member.valtwentyseven +=.5  
                    if (Number(member.twentyseven) == 0)
                        member.valtwentyseven = 0

                    if($scope.noOfDays>=28){
                        if (Number(member.twentyeight) == 1)
                            member.valtwentyeight = 1
                        if (member.od1twentyeight == 1)
                            member.valtwentyeight += 1
                        if (member.od2twentyeight == .5)
                            member.valtwentyeight +=.5
                        if (Number(member.twentyeight) == 0)
                            member.valtwentyeight = 0
                    }
                    if($scope.noOfDays>=29){
                        if (Number(member.twentynine) == 1)
                            member.valtwentynine = 1
                        if (member.od1twentynine == 1)
                            member.valtwentynine += 1
                        if (member.od2twentynine == .5)
                            member.valtwentynine +=.5
                        if (Number(member.twentynine) == 0)
                            member.valtwentynine = 0
                    }
                    if($scope.noOfDays>=30){
                        if (Number(member.thirty) == 1)
                            member.valthirty = 1
                        if (member.od1thirty == 1)
                            member.valthirty += 1
                        if (member.od2thirty == .5)
                            member.valthirty +=.5
                        if (Number(member.thirty) == 0)
                            member.valthirty = 0
                    }
                    if($scope.noOfDays>=31){
                        if (Number(member.thirtyone) == 1)
                            member.valthirtyone = 1
                        if (member.od1thirtyone == 1)
                            member.valthirtyone += 1
                        if (member.od2thirtyone == .5)
                            member.valthirtyone +=.5
                        if (Number(member.thirtyone) == 0)
                            member.valthirtyone = 0
                    }
                    member.pdays = Number(PresentItems);
                    member.presentdays = Number(PresentItems) + Number(od1Items) + Number(od2Items);
                    member.othours = 0;
                    member.presentdays.toFixed(2);
                    $scope.totaldays += Number(member.presentdays) / 2;

                } else {
                    if (member.one == 1)					
                        member.valone = (Number(member.one) + Number(member.od1one));
                        
                    if (member.two == 1)
                        member.valtwo = Number(member.two) + Number(member.od1two);

                    if (member.three == 1)
                        member.valthree = Number(member.three) + Number(member.od1three);

                    if (member.four == 1)
                        member.valfour = Number(member.four) + Number(member.od1four);

                    if (member.five == 1)
                        member.valfive = Number(member.five) + Number(member.od1five);

                    if (member.six == 1)
                        member.valsix = Number(member.six) + Number(member.od1six);

                    if (member.seven == 1)
                        member.valseven = Number(member.seven) + Number(member.od1seven);

                    if (member.eight == 1)
                        member.valeight = Number(member.eight) + Number(member.od1eight);

                    if (member.nine == 1)
                        member.valnine = Number(member.nine) + Number(member.od1nine);

                    if (member.ten == 1)
                        member.valten = Number(member.ten) + Number(member.od1ten);

                    if (member.eleven == 1)
                        member.valeleven = Number(member.eleven) + Number(member.od1eleven);

                    if (member.twelve == 1)
                        member.valtwelve = Number(member.twelve) + Number(member.od1twelve);

                    if (member.thirteen == 1)
                        member.valthirteen = Number(member.thirteen) + Number(member.od1thirteen);

                    if (member.fourteen == 1)
                        member.valfourteen = Number(member.fourteen) + Number(member.od1fourteen);

                    if (member.fifteen == 1)
                        member.valfifteen = Number(member.fifteen) + Number(member.od1fifteen);

                    if (member.sixteen == 1)
                        member.valsixteen = Number(member.sixteen) + Number(member.od1sixteen);

                    if (member.seventeen == 1)
                        member.valseventeen = Number(member.seventeen) + Number(member.od1seventeen);

                    if (member.eighteen == 1)
                        member.valeighteen = Number(member.eighteen) + Number(member.od1eighteen);

                    if (member.nineteen == 1)
                        member.valnineteen = Number(member.nineteen) + Number(member.od1nineteen);

                    if (member.twenty == 1)
                        member.valtwenty = Number(member.twenty) + Number(member.od1twenty);

                    if (member.twentyone == 1)
                        member.valtwentyone = Number(member.twentyone) + Number(member.od1twentyone);

                    if (member.twentytwo == 1)
                        member.valtwentytwo = Number(member.twentytwo) + Number(member.od1twentytwo);

                    if (member.twentythree == 1)
                        member.valtwentythree = Number(member.twentythree) + Number(member.od1twentythree);

                    if (member.twentyfour == 1)
                        member.valtwentyfour = Number(member.twentyfour) + Number(member.od1twentyfour);

                    if (member.twentyfive == 1)
                        member.valtwentyfive = Number(member.twentyfive) + Number(member.od1twentyfive);

                    if (member.twentysix == 1)
                        member.valtwentysix = Number(member.twentysix) + Number(member.od1twentysix);

                    if (member.twentyseven == 1)
                        member.valtwentyseven = Number(member.twentyseven) + Number(member.od1twentyseven);

                    if (member.twentyeight == 1)
                        member.valtwentyeight = Number(member.twentyeight) + Number(member.od1twentyeight);

                    if (member.twentynine == 1)
                        member.valtwentynine = Number(member.twentynine) + Number(member.od1twentynine);

                    if (member.thirty == 1)
                        member.valthirty = Number(member.thirty) + Number(member.od1thirty);

                    if (Number(member.thirtyone) == 1)
                        member.valthirtyone = Number(member.thirtyone) + Number(member.od1thirtyone);


                    member.pdays = Number(PresentItems);
                    member.presentdays = Number(PresentItems);
                    member.othours = parseFloat(od1Items);
                    $scope.totaldays = member.presentdays

                }
                member.od1Items = od1Items;
                member.od2Items = od2Items;
                PresentItems = 0;
                od1Items = 0;
                od2Items = 0;
            }else{
                if(Number(selmemberid) == Number(member.memberid)) {
                    member.od2one = 0;
                    member.od2two = 0;
                    member.od2three = 0;
                    member.od2four  = 0;
                    member.od2five  = 0;
                    member.od2six  = 0;
                    member.od2seven  = 0;
                    member.od2eight  = 0;
                    member.od2nine  = 0;
                    member.od2ten   = 0;
                    member.od2eleven  = 0;
                    member.od2twelve = 0;
                    member.od2thirteen = 0;
                    member.od2fourteen  = 0;
                    member.od2fifteen  = 0;
                    member.od2sixteen  = 0;
                    member.od2seventeen  = 0;
                    member.od2eighteen  = 0;
                    member.od2nineteen  = 0;
                    member.od2twenty  = 0;
                    member.od2twentyone  = 0;
                    member.od2twentytwo = 0;
                    member.od2twentythree  = 0;
                    member.od2twentyfour  = 0;
                    member.od2twentyfive  = 0;
                    member.od2twentysix = 0;
                    member.od2twentyseven = 0;
                    member.od2twentyeight = 0;
                    member.od2twentynine = 0;
                    member.od2thirty = 0;
                    member.od2thirtyone = 0;
                   // member.pdays = 0;
                  //  member.presentdays = 0;
                    member.othours = 0; 
                    member.othours = 0;
                    member.od2Items = 0;
                }   
            }
        })
        $scope.loading=false;
    }
    $scope.$watch('members',watchFunction);

    $scope.cancelattendence = function () {
        window.location.reload(true);
    };

});