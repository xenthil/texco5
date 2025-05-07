var app = angular.module('appadminattendance', ['ngTable', 'ui.bootstrap']).constant('_', window._);
app.controller('ctrladminattendance', function($scope, $http, $filter, NgTableParams) {

    $scope.unholdids = [];
    $scope.unedholdidstatus = [];
    $scope.unholdidstatus = [];
    $scope.holdids = [];
    $scope.reason = "";
    $scope.attendanceids = [];
    $scope.attendancedetails = [];
    $scope.selected = {};
    $scope.objattendance = {};
    $scope.attendance = [];
    $scope.count = 0;
    $scope.counts = 0;
    $scope.hold = [];
    $scope.edhold = [];
    $scope.reserve = [];
    $scope.holdids = [];
    $scope.edholdids = [];
    $scope.reserveids = [];
    $scope.isDisabled = true;
    $scope.isedholdDisabled = true;
    $scope.isreservedDisabled = true;
    $scope.holdreason = [];
    $scope.OtherAllowance = [];
    $scope.OtherDeduction = [];
    $scope.loading=false;
	$scope.showMsggenerateattendance = false;
	$scope.monthandyearfldvalid      = false;
	
	$scope.showHoldAttendanceMsg     = false;
	$scope.showEDHoldAttendanceMsg   = false;
	$scope.showLeaveRequestAttendanceMsg   = false;
    $scope.MembersExpenseAmount = [];
    $scope.unhold = [];
    $scope.AttendanceReviewed = true;

    $scope.savestatus = 1;
    $http({
        method: 'GET',
		headers: {
			'Authorization' : atoken
		}, 
        url: api_url + "/lookupvalues?lkdmcode=HOLRSN",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.holdreason = response.data.lookupvalues;
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });


    $http({
        method: 'GET',
		headers: {
			'Authorization' : atoken
		}, 
        url: api_url + "/job/jobmaster",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.jobmaster = response.data;
            //alert(JSON.stringify($scope.jobmaster));
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });


    $http({
        method: 'GET',
		headers: {
			'Authorization' : atoken
		}, 
        url: api_url + "/lookupvalues?lkdmcode=WGOTRAL",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.OtherAllowance = response.data.lookupvalues;
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });

    $http({
        method: 'GET',
		headers: {
			'Authorization' : atoken
		}, 
        url: api_url + "/lookupvalues?lkdmcode=WGOTRDD",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.OtherDeduction = response.data.lookupvalues;
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });

    // Get Clients
    $scope.clients = [];
    $http({
        method: 'GET',
		headers: {
			'Authorization' : atoken
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
		headers: {
			'Authorization' : atoken
		}, 
        url: api_url + "/client/project",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.projects = response.data;
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });

    // Get Attendance
    $http({
        method: 'GET',
		headers: {
			'Authorization' : atoken
		}, 
        url: api_url + "/lookupvalues?lkdmcode=ATTEND",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.attendance = response.data.lookupvalues;
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });

    // Get Projects
    // $scope.projectnos = [];
    // $http({
    //     method: 'GET',
    //     url: api_url + "/prjectnos",
    // }).then(function successCallback(response) {
    //     if (response.status = 200) {
    //         $scope.projectnos = response.data;
    //     }
    // }, function errorCallback(response) {
    //     Materialize.toast('Something has gone wrong!', 3000, 'red');
    // });

    $scope.projectnos = [];
    $http({
        method: 'GET',
		headers: {
			'Authorization' : atoken
		}, 
        url: api_url + "/prjectnumbers?regionid="+regionid,
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.projectnos = response.data;
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });

    //Edit agreementproject

   


    $scope.fillclientproject1 = function(data) {

        projectid=data.projectid;
        $scope.objattendance.monthandyear = "";

        
        $http({
            method: 'GET',
            headers: {
                'Authorization' : atoken
            }, 
            //url: api_url + "/prjectnos",
            url: api_url + "/jobposting/prjectnossearch/" + projectid,
        }).then(function successCallback(response) {
            if (response.status = 200) {
                // $scope.projectnos = response.data;
                $scope.objattendance.projectname = response.data[0].name;
                $scope.objattendance.projectno = response.data[0].projectno;
				$scope.objattendance.clientid = response.data[0].clientid;
				$scope.objattendance.projectid = response.data[0].projectid;
				//console.log('response', $scope.objattendance.projectname);
                // angular.forEach($scope.projectnos, function(project) {
                //     if (project.projectid == projectid) {
                //         $scope.objattendance.clientid = project.clientid;
                //         // Load Selected Projects

                //         $scope.selectedprojects = [];
                //         var obj = {}
                //         for (obj of $scope.projects) {
                //             if (obj.clientid == project.clientid) {
                //                 $scope.selectedprojects.push(obj);
                //             }
                //         }
                //         $scope.objattendance.projectid = project.projectid;

                //     }
                // });
            }

        }, function errorCallback(response) {
            Materialize.toast('Something has gone wrong!', 3000, 'red');
        });
    };

    $scope.fillclientproject = function(projectid) {

        //projectid=projectids.projectid;
        $scope.objattendance.monthandyear = "";

        
        $http({
            method: 'GET',
            headers: {
                'Authorization' : atoken
            }, 
            //url: api_url + "/prjectnos",
            url: api_url + "/jobposting/prjectnossearch/" + projectid,
        }).then(function successCallback(response) {
            if (response.status = 200) {
                // $scope.projectnos = response.data;
                $scope.objattendance.projectname = response.data[0].name;
                $scope.objattendance.projectno = response.data[0].projectno;
				$scope.objattendance.clientid = response.data[0].clientid;
				$scope.objattendance.projectid = response.data[0].projectid;
				//console.log('response', $scope.objattendance.projectname);
                // angular.forEach($scope.projectnos, function(project) {
                //     if (project.projectid == projectid) {
                //         $scope.objattendance.clientid = project.clientid;
                //         // Load Selected Projects

                //         $scope.selectedprojects = [];
                //         var obj = {}
                //         for (obj of $scope.projects) {
                //             if (obj.clientid == project.clientid) {
                //                 $scope.selectedprojects.push(obj);
                //             }
                //         }
                //         $scope.objattendance.projectid = project.projectid;

                //     }
                // });
            }

        }, function errorCallback(response) {
            Materialize.toast('Something has gone wrong!', 3000, 'red');
        });
    };

    //view Agreement Details
    $scope.viewAgreementDetails = function() {
        $('#agreementsummarymodal').modal('open');
        $http({
            method: 'GET',
            headers: {
                'Authorization' : atoken
            }, 
            url: api_url + "/ProjectAgreementDetailsByID?clientid="+$scope.objattendance.clientid+"&projectid="+$scope.objattendance.projectid+"&monthandyear="+$scope.objattendance.monthandyear,
        }).then(function successCallback(response) {
            if (response.status = 200) {
                $scope.agreementdetails = response.data;
                //alert(JSON.stringify($scope.jobmaster));
            }
        }, function errorCallback(response) {
            Materialize.toast('Something has gone wrong!', 3000, 'red');
        });
    }

    //Load Selected Projects
    $scope.selectProject = function(clientid) {
        $scope.selectedprojects = [];
        var obj = {}
        for (obj of $scope.projects) {
            if (obj.clientid == clientid) {
                $scope.selectedprojects.push(obj);
            }
        }
    }

    $scope.reviewattendance = function(monthandyear, clientid, projectid) {
        debugger
        $('#failure').html("");
        $scope.members = [];
        $scope.loading=true;
        $http({
            method: 'GET',
            headers: {
                'Authorization' : atoken
            }, 
            url: api_url + "/client/review/attendance?projectid=" + projectid + "&monthandyear=" + monthandyear,
        }).then(function successCallback(response) {
            if (response.status = 200) {
                    $scope.count = response.data.length;
                    var data = response.data;

                    if(data.length > 0)
                   {
                    if(data[0].status==7 && data[0].reasonothers !=null && data[0].cashierrejected !=1 && data[0].caorejected !=1 )
                    {
                        $scope.rejectedby='Supervoiser';
                        $scope.reason=data[0].reasonothers;
                    }
                    else if(data[0].status==7 && data[0].reasonothers !=null && data[0].cashierrejected ==1 )
                    {
                        $scope.rejectedby='Cashier';
                        $scope.reason=data[0].reasonothers;
                    }

                    else if(data[0].status==7 && data[0].reasonothers !=null && data[0].caorejected ==1 )
                    {
                        $scope.rejectedby='CAO';
                        $scope.reason=data[0].reasonothers;
                    }

                    else{
                        $scope.rejectedby='';
                        $scope.reason='';
                    }
                }
                    var totaldata = _.filter(data, function(item) {
                        return (item.status == 0 || item.status == 7 || item.edhold == 1 || item.athold == 1);
                    });

                    var stotaldata = _.filter(data, function(item) {
                        return (item.status != 0 && item.status != 7);
                    });
                    
                    $scope.ucounts = 0;
                    $scope.scounts = 0;

                    var edholddata = _.filter(data, function(item) {
                        return item.edhold == 1;
                    });

                    var adholddata = _.filter(data, function(item) {
                        return item.athold == 1;
                    });

                    var atdata = _.filter(data, function(item) {
                        return (item.athold == 0 || item.edhold == 0 || item.status == 0);
                    });

                    var unholddata = _.filter(data, function(item) {
                        return (item.athold == 0 && (item.status == 0 || item.status == 7)); 
                    });

                    var unedholddata = _.filter(data, function(item) {
                        return item.edhold == 0;
                    });

                    debugger
                    var edlength = edholddata.length;
                    var adlength = adholddata.length;
                    var atlength = atdata.length;
                    var totaldatalength = totaldata.length;
                    
                    $scope.selectHoldMembers(edholddata,adholddata,unholddata,unedholddata);
                    $scope.counts = response.data[1];
                    $scope.attendancedetails = totaldata;

                    $scope.model.allItemsSelected = false;
                    $scope.model.allEDSelected = false;
                   
                    if(Number(edlength) == Number(totaldatalength)) {
                        $scope.model.allEDSelected = true;
                    }

                    if(Number(adlength) == Number(totaldatalength)) {
                        $scope.model.allItemsSelected = true;
                    }
                
                    $scope.tableParams = new NgTableParams({
                        count: totaldata.length
                    }, {
                        data: totaldata
                    });

                    $scope.totalnofduties = 0;
                    $scope.totalnoofad = 0;
                    $scope.totalnoofed = 0;

                    angular.forEach(totaldata, function(att) {
                        if(att.code == 'DVR') {
                            att.eddays = att.othours / 8;
                        }
                        $scope.totalnoofad += att.presentdays;
                        $scope.totalnoofed += att.eddays;
                        $scope.totalnofduties += (att.presentdays + att.eddays);
                    });

                    $scope.tableParams34 = new NgTableParams({
                        count: stotaldata.length
                    }, {
                        data: stotaldata
                    });
                    
                    $scope.ucounts = totaldata.length;
                    $scope.scounts = stotaldata.length;

                    $scope.loading=false;
            } else {
                Materialize.toast('error', 3000, 'red');
            }

        }, function errorCallback(response) {
            Materialize.toast('error', 3000, 'red');
        });
    };

    $scope.updateattendancestatus = function(objattendance, members,form, attendancedetails) {
        debugger
        if( $scope.unholdids.length > 0 || $scope.unedholdids.length > 0)
        {
            $scope.MembersExpenseAmount = [];
            angular.forEach(attendancedetails, function(object) {
                angular.forEach(object.oeallow, function(value, key) {
                    angular.forEach(value, function(values, keys) {
                        $scope.MembersExpenseAmount.push({'attendanceid':object.attendanceid,'memberid':object.memberid,'expense_type':keys,'amount':values,'projectid':object.projectid,'monthandyear':object.monthandyear});
                    });
                });
                angular.forEach(object.oededuction, function(value1, key1) {
                    angular.forEach(value1, function(values1, keys1) {
                        $scope.MembersExpenseAmount.push({'attendanceid':object.attendanceid,'memberid':object.memberid,'expense_type':keys1,'amount':values1,'projectid':object.projectid,'monthandyear':object.monthandyear});
                    });
                });
            });
            var projectno 	= $("#projectno").val();
            var month_year	= $("#month_year").val();
            if(projectno!="" & projectno=="?"){
                $scope.showMsggenerateattendance = true;
            }
            else{
                $scope.showMsggenerateattendance = false;	
            }	
        
            if(month_year==""){
                $scope.monthandyearfldvalid = true;
            }	
            else{
                $scope.monthandyearfldvalid = false;	
            }	
            $scope.reviewatt = [];
            $scope.totalnofduties = 0;
            $scope.totalnoofad = 0;
            $scope.totalnoofed = 0;
            $scope.totalemp = 0;
            angular.forEach( $scope.jobmaster, function(job) {
                $scope.details=[];
                var totalduties = 0;
                var totalemps = 0;
                var totalad = 0;
                var totaled = 0;
                angular.forEach( $scope.attendancedetails, function(att) {
                    if(job.jobmasterid == att.jobmasterid)
                    {
                        if(att.code == 'DVR') {
                            att.eddays = att.othours / 8;
                        }
                        totatt = att.presentdays + att.eddays;
                        $scope.totalnofduties += totatt;
                        $scope.totalemp += 1;

                        totalduties += totatt
                        totalemps += 1;

                        totalad += att.presentdays;
                        totaled += att.eddays;

                        att.edstatus = 0;
                        att.holdstatus = 0;
                        debugger
                        $scope.totalnoofad += att.presentdays;
                        $scope.totalnoofed += att.eddays; 

                        // if($scope.edholdids)
                        var indexss = $scope.edholdids.findIndex( hholdids => hholdids == att.attendanceid);
                        if(indexss != -1) {
                            att.edstatus = 1;
                        }
                        var indexs = $scope.holdids.findIndex( holdid => holdid == att.attendanceid);
                        if(indexs != -1) {
                            att.holdstatus = 1;
                        }
                        $scope.details.push(att); 
                    }
                });
                if($scope.details.length) {
                    $scope.reviewatt.push({'code':job.code,'details':$scope.details,'count':$scope.details.length,'noofduties':totalduties,'totalemps':totalemps,'totalad':totalad,'totaled':totaled})
                }
            });
        
            if($scope.showMsggenerateattendance==false & $scope[form].$valid==true & $scope.monthandyearfldvalid==false) {
                $('#attenancesummarymodal').modal('open');
                $scope.AttendanceReviewed = false;
                $http({
                    method: 'GET',
                    headers: {
                        'Authorization' : atoken
                    }, 
                    url: api_url + "/ProjectAgreementDetailsByID?clientid="+objattendance.clientid+"&projectid="+objattendance.projectid+"&monthandyear="+$scope.objattendance.monthandyear,
                }).then(function successCallback(response) {
                    if (response.status = 200) {
                        $scope.agreementdetails = response.data;
                    }
                }, function errorCallback(response) {
                    Materialize.toast('Something has gone wrong!', 3000, 'red');
                });
            }
            else{
                return false;
            }
        } else {
            Materialize.toast('No Members Are Selected.', 4000, 'red');
        }	
    };

    $scope.saveAttendance = function(objattendance) {
        debugger
        $scope.AttendanceReviewed = true;
        if($scope.MembersExpenseAmount.length==0)
        {
            $scope.MembersExpenseAmount =0;
        }
        if( $scope.unholdids.length > 0 || $scope.unedholdids.length > 0)
        { 
            // console.log('$scope.unholdidstatus',$scope.unholdidstatus);
            $http({
                method: 'POST',
                url: api_url + "/client/review/attendance/status",
                data: $.param({
                    "clientid": objattendance.clientid,
                    "projectid": objattendance.projectid,
                    "monthandyear": objattendance.monthandyear,
                    "expense" :$scope.MembersExpenseAmount,
                    "status": "1",
                    "changedby": objattendance.changedby,
                    "unedholdids" : $scope.unedholdids,
                    "unholdids": $scope.unholdids,
                    "unholdidstatus": $scope.unholdidstatus,
                    "unedholdidstatus": $scope.unedholdidstatus,
                }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization' : atoken
                },
            }).success(function(response, result) {
                if (response.status = 200) {
                    Materialize.toast('Attendance Reviewed successfully', 4000, 'green'); // 4000 is the duration of the toast
                    setTimeout(function() {
                        $scope.AttendanceReviewed = true;
                        window.location.href = base_url + "admin/attendancereview";
                    }, 2000);
                } else {
                    $('#failure').html(response);
                }
            }).error(function(error) {
                $('#failure').html(error);
            });
        } else {
            Materialize.toast('No Members Are Selected.', 4000, 'red');
        }
    }

    $scope.confirmhold = function(){
        $('#modal1').modal('open');
        $scope.reason = '';
    }

    $scope.holdattendancestatus = function(objattendance, members, hold) {
        //  console.log("hold",$scope.hold);
        if(confirm("Are you sure to hold the attendance for selected Employees?")) {
            debugger
            var rowCount = $('#holdattencetbl >tbody >tr').length;		
            // console.log('rowCount',rowCount);
            if(rowCount=="0") {
                $scope.showHoldAttendanceMsg = true;
                $scope.isDisabled = false;
                return false;
            }	
            else {
                $scope.showHoldAttendanceMsg = false;
                $scope.isDisabled = true;
                var holdids = [];
                $scope.holdids = [];
                $scope.unholdids = [];
                $scope.unholdidstatus = [];
                angular.forEach($scope.attendancedetails, function(value, keys) { 
                    $scope.unholdids.push(value.attendanceid);
                    $scope.unholdidstatus.push({'attendanceid':value.attendanceid,'status':value.status,'edstatus':value.edstatus,'jobmasterid':value.jobmasterid,'presentdays':value.presentdays,'eddays':value.eddays,'othours':value.othours,'memberid':value.memberid});
                }); 
                angular.forEach(hold, function(values, keys) {
                    holdids.push(values.attendanceid);
                    $scope.holdids.push(values.attendanceid); 
                    var indexss = $scope.unholdids.findIndex( holdmember => holdmember == values.attendanceid);
                    $scope.unholdids.splice(indexss, 1);

                    var indexss1 = $scope.unholdidstatus.findIndex( holdmember => holdmember.attendanceid == values.attendanceid);
                    $scope.unholdidstatus.splice(indexss1, 1);
                });
                debugger
                $http({
                    method: 'POST',
                    url: api_url + "/client/hold/attendance",
                    data: $.param({
                        "clientid": objattendance.clientid,
                        "projectid": objattendance.projectid,
                        "monthandyear": objattendance.monthandyear,
                        "status": "1",
                        "changedby": objattendance.changedby,
                        "holdids": holdids,
                        "unholdids": $scope.unholdids,
                        "reason": $scope.hold
                    }),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization' : atoken
                    },
                }).success(function(response, result) {
                    if (response.status = 200) {
                        $('#modal1').modal('close');
                        Materialize.toast('Attendance Hold done', 4000, 'green') // 4000 is the duration of the toast
                        //$scope.reviewattendance(objattendance.monthandyear, objattendance.clientid, objattendance.projectid);
                    } else {
                        $('#failure').html(response);
                    }
                }).error(function(error) {
                    $('#failure').html(error);
                }); 
            }
        }
    };

    $scope.edholdattendancestatus = function(objattendance, members,edhold) {
        if(confirm("Are you sure to hold the attendance for selected Employees?")) {
            var rowCount = $('#edholdattencetbl >tbody >tr').length;
            if(rowCount=="0") {		
                $scope.showEDHoldAttendanceMsg = true;		
                $scope.isedholdDisabled = false;	
                return false;
            }	
            else {
                $scope.showEDHoldAttendanceMsg = false;	
                $scope.isedholdDisabled = true;
                var edholdids = [];
                $scope.edholdids = [];
                $scope.unedholdids = [];
                $scope.unedholdidstatus = [];
                angular.forEach($scope.attendancedetails, function(value, keys) { 
                    $scope.unedholdids.push(value.attendanceid);
                    $scope.unedholdidstatus.push({'attendanceid':value.attendanceid,'status':value.status,'edstatus':value.edstatus,'jobmasterid':value.jobmasterid,'presentdays':value.presentdays,'eddays':value.eddays,'othours':value.othours,'memberid':value.memberid});
                });
                angular.forEach(edhold, function(values, keys) {
                    edholdids.push(values.attendanceid);
                    $scope.edholdids.push(values.attendanceid);
                    var indexss = $scope.unedholdids.findIndex( unholdmember => unholdmember == values.attendanceid);
                    var indexss1 = $scope.unedholdidstatus.findIndex( unholdmember => unholdmember.attendanceid == values.attendanceid);
                    $scope.unedholdids.splice(indexss, 1);
                    $scope.unedholdidstatus.splice(indexss1, 1);
                });
                $http({
                    method: 'POST',
                    url: api_url + "/client/hold/attendance/eddays",
                    data: $.param({
                        "attendanceids": $scope.edholdids,
                        "unedholdids": $scope.unedholdids,
                        "edhold": 1
                    }),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization' : atoken
                    },
                }).success(function(response, result) {
                    if (response.status = 200) {
                        Materialize.toast('Attendance ED Hold done', 4000, 'green') // 4000 is the duration of the toast
                    } else {
                        $('#failure').html(response);
                    }
                }).error(function(error) {
                    $('#failure').html(error);
                });
            }	
        }
    };

    $scope.reserveattendancestatus = function(objattendance, members) {
		var rowCount = $('#leaverequestattencetbl >tbody >tr').length;
		if(rowCount=="0"){	
			$scope.showLeaveRequestAttendanceMsg = true;
            $scope.isreservedDisabled = false;			
			return false;	
		}
		else{
			$scope.showLeaveRequestAttendanceMsg = false;
			$scope.isreservedDisabled = true;
			$http({
                method: 'POST',
                url: api_url + "/client/reserve/attendance",
                data: $.param({
                    "attendanceids": $scope.reserveids,
                    "lreserve": 1
                }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization' : atoken
                }
			}).success(function(response, result) {
            if (response.status = 200) {
                Materialize.toast('Attendance Reserve done', 4000, 'green') // 4000 is the duration of the toast
                // $scope.reviewattendance(objattendance.monthandyear, objattendance.clientid, objattendance.projectid);
            } else {
                $('#failure').html(response);
            }
			}).error(function(error) {
            $('#failure').html(error);
			});	
		}	
    };

    $scope.editattendance = function(objattendance) {
        if ($scope.count > 0) {
            if (objattendance.projectid != 'undefined' && objattendance.monthandyear != 'undefined') {
                window.location.href = base_url + "admin/editattendance?projectid=" + objattendance.projectid + "&monthandyear=" + objattendance.monthandyear;
            };
        } else {
            Materialize.toast('No records to edit attendnace', 3000, 'red');
        }
    };

    $scope.model = {};
    $scope.hcount = 0;

    // This property will be bound to checkbox in table header
    $scope.model.allItemsSelected = false;
    $scope.model.allEDSelected = false;
    $scope.model.allreserveSelected = false;

    $scope.selectEntity = function(memberid,ishold,attendanceid) {
        debugger
        if($scope.hold.length == 0) {
            $scope.hold = [];    
            $scope.isDisabled = true;
        }
        if (ishold == true) {
            let index = $scope.hold.findIndex( holdmember => holdmember.attendanceid === attendanceid );
            if (index === -1) {
                var seldata = $scope.attendancedetails.find(item => item.attendanceid === attendanceid);
                $scope.hold.push(seldata);
                $scope.model.allItemsSelected = false;
                $scope.hcount = $scope.hold.length;
                $scope.isDisabled = false;
            }
        }
        else 
        {
            debugger
            var seldata = $scope.attendancedetails.find(item => item.attendanceid === attendanceid);
            var index = $scope.hold.findIndex(holdmember => holdmember.attendanceid === attendanceid);
            var indexs = $scope.holdids.findIndex(holdmembers => holdmembers === attendanceid);
            $scope.hold.splice(index, 1); 
            $scope.holdids.splice(indexs, 1);  
            var indexss = $scope.unholdids.findIndex(unholdmember => unholdmember === attendanceid);
            if (indexss === -1) {
                $scope.unholdids.push(attendanceid);
            }
            var indexss1 = $scope.unholdidstatus.findIndex(unholdmember => unholdmember.attendanceid === attendanceid);
            if (indexss1 === -1) {
                $scope.unholdidstatus.push({'attendanceid':attendanceid,'status':seldata.status,'edstatus':seldata.edstatus,'jobmasterid':seldata.jobmasterid,'presentdays':seldata.presentdays,'eddays':seldata.eddays,'othours':seldata.othours,'memberid':seldata.memberid});
            }
            var indexss1 = $scope.unhold.findIndex(unholdm => unholdm.attendanceid === attendanceid);
            if (indexss1 === -1) {
                $scope.unhold.push(seldata);
            }
        }
        $scope.count = $scope.hold.length;
        if($scope.count) {
            $scope.isDisabled = false;
        } else {
            $scope.isDisabled = true;  
        }
        var data = $scope.hold;
        $scope.tableParams1 = new NgTableParams({
            count: $scope.count
        }, {
            data: data
        });
        if($scope.hold.length == $scope.attendancedetails.length) {
            $scope.model.allItemsSelected = true;
        } else {
            $scope.model.allItemsSelected = false;
        }
    };

    $scope.selectHoldMembers = function(edholddata,adholddata,unholddata,unedholddata) {
        debugger
        $scope.model.allEDSelected = false; 
        $scope.model.allItemsSelected = false; 
        $scope.holdids = [];
        $scope.unholdids = [];
        $scope.unholdidstatus = [];
        $scope.unhold = [];
        $scope.hcount = 0;
        $scope.count = 0;
        $scope.hold = [];
        if(adholddata.length > 0) {
            for (var i = 0; i < adholddata.length; i++) {
                $scope.holdids.push(adholddata[i].attendanceid);
                $scope.hold.push(adholddata[i]);
                $scope.isDisabled = true;
            }   
            $scope.hcount = adholddata.length;
            $scope.count = $scope.hold.length;
            var data = $scope.hold;
            $scope.tableParams1 = new NgTableParams({
                count: $scope.count
            }, {
                data: data
            });
            if($scope.holdids.length == adholddata.length) {
                $scope.model.allItemsSelected = true;
            } else {
                $scope.model.allItemsSelected = false; 
            }
        } 
        if(unholddata.length > 0) {
            for (var ik = 0; ik < unholddata.length; ik++) {
                $scope.unholdids.push(unholddata[ik].attendanceid);
                $scope.unholdidstatus.push({'attendanceid':unholddata[ik].attendanceid,'status':unholddata[ik].status,'edstatus':unholddata[ik].edstatus,'jobmasterid':unholddata[ik].jobmasterid,'presentdays':unholddata[ik].presentdays,'eddays':unholddata[ik].eddays,'othours':unholddata[ik].othours,'memberid':unholddata[ik].memberid});
                $scope.unhold.push(unholddata[ik]);
            }   
        }

        $scope.edholdids = [];
        $scope.unedholdids = [];
        $scope.unedholdidstatus = [];
        $scope.edhcount = 0;
        $scope.edhold = [];
        if(edholddata.length > 0) {
            for (var j = 0; j < edholddata.length; j++) {
                $scope.edholdids.push(edholddata[j].attendanceid);
                $scope.edhold.push(edholddata[j]);
                $scope.isedholdDisabled = true;
            }
            $scope.edhcount = edholddata.length;
            $scope.edcount = $scope.edhold.length;
            debugger
            $scope.count = $scope.edhold.length;
            var data = $scope.edhold;
            $scope.tableParams2 = new NgTableParams({
                count: $scope.count
            }, {
                data: data
            });
            debugger
            if($scope.edhold.length == $scope.attendancedetails.length) {
                $scope.model.allEDSelected = true;
            } else {
                $scope.model.allEDSelected = false; 
            }
        }
        if(unedholddata.length > 0) {
            for (var jk = 0; jk < unedholddata.length; jk++) {
                $scope.unedholdids.push(unedholddata[jk].attendanceid);
                $scope.unedholdidstatus.push({'attendanceid':unedholddata[jk].attendanceid,'status':unedholddata[jk].status,'edstatus':unedholddata[jk].edstatus,'jobmasterid':unedholddata[jk].jobmasterid,'presentdays':unedholddata[jk].presentdays,'eddays':unedholddata[jk].eddays,'othours':unedholddata[jk].othours,'memberid':unedholddata[jk].memberid});
            }   
        }
    };

    $scope.selectAll = function () {
        $scope.holdids = [];
        $scope.unholdids = [];
        $scope.unholdidstatus = [];
        $scope.hcount = 0;
        $scope.hold = [];
        // Loop through all the entities and set their isChecked property
        for (var i = 0; i < $scope.attendancedetails.length; i++) {
            if ($scope.model.allItemsSelected) {
                $scope.attendancedetails[i].ishold = $scope.model.allItemsSelected;
                $scope.holdids.push($scope.attendancedetails[i].attendanceid);
                $scope.hcount = $scope.holdids.count;
                $scope.hold.push($scope.attendancedetails[i]);
                $scope.isDisabled = false;
            }
            else{
                $scope.attendancedetails[i].ishold = $scope.model.allItemsSelected;
                $scope.holdids = [];
                $scope.hold = [];
                $scope.hcount = 0;
                $scope.unholdids.push($scope.attendancedetails[i].attendanceid);
                $scope.unholdidstatus.push({'attendanceid':$scope.attendancedetails[i].attendanceid,'status':$scope.attendancedetails[i].status,'edstatus':$scope.attendancedetails[i].edstatus,'jobmasterid':$scope.attendancedetails[i].jobmasterid,'presentdays':$scope.attendancedetails[i].presentdays,'eddays':$scope.attendancedetails[i].eddays,'othours':$scope.attendancedetails[i].othours,'memberid':$scope.attendancedetails[i].memberid});
            }
        }

        $scope.count = $scope.hold.length;
        var data = $scope.hold;
        $scope.tableParams1 = new NgTableParams({
            count: $scope.count
        }, {
            data: data
        });
    };

    $scope.selectED = function(memberid,edhold,attendanceid) {
        debugger
        if($scope.edhold.length == 0) {
            $scope.edhold = [];
            $scope.isedholdDisabled = true;
        }

        if (edhold == true) {
            let index = $scope.edhold.findIndex( holdmember => holdmember.attendanceid === attendanceid );
            if (index === -1) {
                var seldata = $scope.attendancedetails.find(item => item.attendanceid === attendanceid);
                $scope.edhold.push(seldata);
                $scope.model.allItemsSelected = false;
                $scope.hcount = $scope.edhold.length;
                $scope.isedholdDisabled = false;
            }
        } 
        else
        {
            debugger
            $scope.isedholdDisabled = false;
            var seldata = $scope.attendancedetails.find(item => item.attendanceid === attendanceid);
            var index = $scope.edhold.findIndex(holdmember => holdmember.attendanceid === attendanceid);
            var indexs = $scope.edholdids.findIndex(holdmembers => holdmembers === attendanceid);
            $scope.edhold.splice(index, 1); 
            $scope.edholdids.splice(indexs, 1);  
            var indexss = $scope.unedholdids.findIndex(unholdmember => unholdmember === attendanceid);
            var indexss1 = $scope.unedholdidstatus.findIndex( unholdmember => unholdmember.attendanceid == seldata.attendanceid);
            if (indexss1 === -1) {
                $scope.unedholdidstatus.push({'attendanceid':attendanceid,'status':seldata.status,'edstatus':seldata.edstatus,'jobmasterid':seldata.jobmasterid,'presentdays':seldata.presentdays,'eddays':seldata.eddays,'othours':seldata.othours,'memberid':seldata.memberid});
            }
            if (indexss === -1) {
                $scope.unedholdids.push(attendanceid);
            }
        }
        $scope.count = $scope.edhold.length;
        var data = $scope.edhold;
        $scope.tableParams2 = new NgTableParams({
            count: $scope.count
        }, {
            data: data
        });

        if($scope.edhold.length == $scope.attendancedetails.length) {
            $scope.model.allEDSelected = true;
        } else {
            $scope.model.allEDSelected = false; 
        }
    };

    $scope.selectAllED = function () {
        $scope.edholdids = [];
        $scope.unedholdids = [];
        $scope.unedholdidstatus = [];
        $scope.edhcount = 0;
        $scope.edhold = [];
        debugger
        // Loop through all the entities and set their isChecked property
        for (var i = 0; i < $scope.attendancedetails.length; i++) {
            if ($scope.model.allEDSelected) {
                $scope.attendancedetails[i].isedhold = $scope.model.allEDSelected;
                if($scope.attendancedetails[i].eddays != 0 || $scope.attendancedetails[i].othours != 0) {
                    $scope.edholdids.push($scope.attendancedetails[i].attendanceid);
                    $scope.edhcount = $scope.edholdids.count;
                    $scope.edhold.push($scope.attendancedetails[i]);
                }
                $scope.isedholdDisabled = false;
            }
            else{
                $scope.attendancedetails[i].isedhold = $scope.model.allEDSelected;
                $scope.edholdids = [];
                $scope.edhcount = 0;
                $scope.edhold = [];
                $scope.unedholdids.push($scope.attendancedetails[i].attendanceid);
                $scope.unedholdidstatus.push({'attendanceid':$scope.attendancedetails[i].attendanceid,'status':$scope.attendancedetails[i].status,'edstatus':$scope.attendancedetails[i].edstatus,'jobmasterid':$scope.attendancedetails[i].jobmasterid,'presentdays':$scope.attendancedetails[i].presentdays,'eddays':$scope.attendancedetails[i].eddays,'othours':$scope.attendancedetails[i].othours,'memberid':$scope.attendancedetails[i].memberid});
                $scope.isedholdDisabled = true;
            }
        }
        $scope.count = $scope.edhold.length;
        var data = $scope.edhold;
        $scope.tableParams2 = new NgTableParams({
            count: $scope.count
        }, {
            data: data
        });
    };

    $scope.selectreserve = function() {
        $scope.reserveids = [];
        $scope.unreserveids = [];
        $scope.rcount = 0;
        $scope.reserve = [];

        for (var i = 0; i < $scope.attendancedetails.length; i++) {
            if ($scope.attendancedetails[i].isreserve) {
                $scope.reserveids.push($scope.attendancedetails[i].attendanceid);
                $scope.model.allreserveSelected = false;
                $scope.rcount = $scope.reserveids.count;
                $scope.reserve.push($scope.attendancedetails[i]);
                $scope.isreservedDisabled = false;
            }
            else
            {
                $scope.unreserveids.push($scope.attendancedetails[i].attendanceid);
            }
        }

        $scope.count = $scope.reserve.length;
        var data = $scope.reserve;
        $scope.tableParams3 = new NgTableParams({
            count: $scope.count
        }, {
            data: data
        });

        if($scope.reserveids.length == $scope.attendancedetails.length)
            $scope.model.allreserveSelected = true;
    };


    $scope.orderByStartsWith = function(viewValue) {
        return function(element){
      
          return element.projectno.toLowerCase().startsWith(viewValue.toLowerCase()) ? 0 : 1;			
        }
      };
    $scope.selectAllreserve = function () {
        $scope.reserveids = [];
        $scope.unreserveids = [];
        $scope.rcount = 0;
        $scope.reserve = [];
        // Loop through all the entities and set their isChecked property
        for (var i = 0; i < $scope.attendancedetails.length; i++) {
            if ($scope.model.allreserveSelected) {
                $scope.attendancedetails[i].isreserve = $scope.model.allreserveSelected;
                $scope.rcount = $scope.reserveids.count;
                $scope.reserve.push($scope.attendancedetails[i]);
                $scope.reserveids.push($scope.attendancedetails[i].attendanceid);
                $scope.unreserveids = [];
                $scope.isreservedDisabled = false;
            }
            else{
                $scope.attendancedetails[i].isreserve = $scope.model.allreserveSelected;
                $scope.reserveids = [];
                $scope.unreserveids = [];
                $scope.reserve = [];
                $scope.rcount = 0;
                $scope.unreserveids.push($scope.attendancedetails[i].attendanceid);
            }
        }

        $scope.count = $scope.reserve.length;
        var data = $scope.reserve;
        $scope.tableParams3 = new NgTableParams({
            count: $scope.count
        }, {
            data: data
        });
    };

    $scope.monthclear = function() {
        $scope.objattendance.monthandyear = "";
    }
});