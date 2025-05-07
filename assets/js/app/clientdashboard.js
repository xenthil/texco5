var app = angular.module('appDashboard', ['ngTable', 'ui.bootstrap']);
app.controller('ctrlDashboard', function($scope, $http, $filter, NgTableParams) {
    $scope.holdattendance = [];
    $scope.projectemployees = [];
    $scope.totalinvoices = [];
    $scope.projectcount = 0;
    $scope.pendingamount = 0;
    $scope.employeecount = 0;
    $scope.clientid =clientid;
    $scope.postedmemberss = [];
    // console.log(' $scope.clientid', $scope.clientid);
    $scope.SelectedProjectForUpload = 0;
    $scope.SelectedFileForUpload = "";
    $scope.totalamount = 0;

    $scope.clientid = 0;
    $scope.memberhistoryid = 0;
    $scope.memberid = 0;
    $scope.status = 0;

    var tdy=new Date();
    var date=tdy.getDate();
    
    if(date>=27){
        var edDate="today";
        // console.log("today "+date);
    } else{
        var stDate=new Date();
        var sttDate=new Date();
        stDate.setMonth(stDate.getMonth());
        sttDate.setMonth(stDate.getMonth()-1);
        var edDate=stDate;
        var eddDate=sttDate;
        // console.log("edDate "+ edDate);
    }
    
    $(document).ready(function() { 
        $('.month_year').datepicker({
            format: 'MM yyyy',
            minViewMode: "months",
            autoClose:true,
            endDate: edDate,
            startDate: eddDate
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
            // console.log('$scope.clients',$scope.clients);
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });

    $http({
        method: 'GET', 
		headers : {
			"Authorization" : atoken
		},
        url: api_url + "/job/PostedMembers?clientid=" + clientid,
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.postedmemberss = response.data;
            // console.log('$scope.clients',$scope.postedmemberss);
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });

    $http({
        method: 'GET', 
		headers : {
			"Authorization" : atoken
		},
        url: api_url + "/job/ApprovedPostedMembers?clientid=" + clientid,
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.workingmembers = response.data;
            // console.log('$scope.clients',$scope.workingmembers);
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
            // console.log('$scope.projects',$scope.projects);
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
        // console.log('response',response);
        if (response.status = 200) {
            $scope.projectnos = response.data;
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });

    //Edit agreementproject
    $scope.fillclientproject = function(projectid) {
        $scope.objattendance.monthandyear = "";
        $http({
            method: 'GET', 
            headers : {
                "Authorization" : atoken
            },
            url: api_url + "/prjectnos/byclientid?clientid=" + clientid,
        }).then(function successCallback(response) {
            // console.log('response',response);
            if (response.status = 200) {
                $scope.projectnos = response.data;
                angular.forEach($scope.projectnos, function(project) {
                    if (project.projectid == projectid) {
                        $scope.objattendance.clientid = project.clientid;
                        // Load Selected Projects
                        $scope.selectedprojects = [];
                        var obj = {}
                        for (obj of $scope.projects) {
                            if (obj.clientid == project.clientid) {
                                $scope.selectedprojects.push(obj);
                                // console.log(JSON.stringify($scope.selectedprojects))
                            }
                        }
                        $scope.objattendance.projectid = project.projectid;
                    }
                });
            }
        }, function errorCallback(response) {
            Materialize.toast('Something has gone wrong!', 3000, 'red');
        });
    };

    $scope.AcceptJobs = function(posted,status) {
        $('#modalconfirm').modal('open');
        if(status == 1) {
            $('#mcaption1').text('Do you want to confirm this posting order ?');
        } 
        if(status == 2) {
            $('#mcaption1').text('Do you want to Cancel this posting order ?');
        }
        $scope.clientid = clientid;
        $scope.memberhistoryid = posted.memberhistoryid;
        $scope.memberid = posted.memberid;
        $scope.status = status;
    };

    $scope.jobcancelclose = function() {
        $('#modalconfirm').modal('close');
    }

    $scope.jobconfirmPopup = function(clientid,memberhistoryid,memberid,status) {
        $http({
            url: api_url + "/job/ApproveJobs",
            data: $.param({
                clientid: clientid,
                memberhistoryid: memberhistoryid,
                memberid:  memberid,
                status: status
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded', 
                "Authorization" : atoken
            },
            method: 'POST'
        }).then(function successCallback(response) {
            // console.log('response',response);
            if (response.status = 200) {
                $('#modalconfirm').modal('close');
                if(status == 1) {
                    Materialize.toast('Job Posting has been confirmed!', 3000, 'green');
                }
                if(status == 2) { 
                    Materialize.toast('Job Posting has been Rejected!', 3000, 'green');
                }
                $http({
                    method: 'GET', 
                    headers : {
                        "Authorization" : atoken
                    },
                    url: api_url + "/job/PostedMembers?clientid=" + clientid,
                }).then(function successCallback(response) {
                    if (response.status = 200) {
                        $scope.postedmemberss = response.data;
                        console.log('$scope.clients',$scope.postedmemberss);
                    }
                }, function errorCallback(response) {
                    Materialize.toast('Something has gone wrong!', 3000, 'red');
                });
            }
        }, function errorCallback(response) {
            Materialize.toast('Something has gone wrong!', 3000, 'red');
        });
    };

    $http({
        method: 'GET', 
		headers : {
			"Authorization" : atoken
		},
        url: api_url + "/clients/dashboard?clientid="+ clientid
    }).then(function successCallback(response) {
        // console.log('response',response);
        if (response.status = 200) {
            $scope.pendingamount = response.data.pendingamount;
            $scope.projectcount = response.data.projectcount;
            $scope.employeecount = response.data.employeecount;
            $scope.projectemployees = response.data.projectemployees;
            $scope.totalemployeecount = response.data.totalemployeecount;
            $scope.totalprojcount = response.data.totalprojcount;
            $scope.totalinvoices = response.data.totalinvoices;
            $scope.totalamount = response.data.totalamount;
            
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });

    $scope.current = 0;
    $scope.total = 1;
    $scope.currentproject = 0;
    $scope.totalproject = 1;
    $scope.pendinginvoice = 1;
    $scope.currentinvoice = 0;
    $scope.pendingamounts = 1;
    $scope.totalamounts = 0;
    $scope.ListTotalEmployees = function(type) {
        $scope.total = 1;
        $scope.current = 0;
    }
    
    $scope.ListCurrentEmployees = function(){
        $scope.total = 0;
        $scope.current = 1;
    }

    $scope.ListTotalProjects = function(type) {
        $scope.totalproject = 1;
        $scope.currentproject = 0;
    }

    $scope.ListCurrentProjects = function(){
        $scope.totalproject = 0;
        $scope.currentproject = 1;
    }

    $scope.ListCurrentInvoice = function(type) {
        $scope.pendinginvoice = 0;
        $scope.currentinvoice = 1;
    }

    $scope.ListPendingInvoices = function(){
        $scope.pendinginvoice = 1;
        $scope.currentinvoice = 0;
    }

    $scope.ListTotalAmounts = function(){
        $scope.pendingamounts = 0;
        $scope.totalamounts = 1;
    }

    $scope.ListPendingAmounts = function(){
        $scope.pendingamounts = 1;
        $scope.totalamounts = 0;
    }

    $http({
        method: 'GET', 
		headers : {
			"Authorization" : atoken
		},
        url: api_url + "/clients/TotalInvoiceCount?clientid="+ clientid
    }).then(function successCallback(response) {
        // console.log('response',response);
        if (response.status = 200) {
            $scope.currentinvoices = response.data[0].totalinv;
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });

    $http({
        method: 'GET', 
		headers : {
			"Authorization" : atoken
		},
        url: api_url + "/job/jobactivity/client?clientid=" + clientid,
    }).then(function successCallback(response) {
        if (response.status = 200) {
            var data = response.data;
            $scope.history = response.data;
            $scope.tableParams = new NgTableParams({
                page: 1,
                count: response.data.length
            }, {
                data: data
            });
        } else {
            Materialize.toast('error', 3000, 'red');
        }
    }, function errorCallback(response) {
        Materialize.toast('error', 3000, 'red');
    });

    $http({
        method: 'GET', 
		headers : {
			"Authorization" : atoken
		},
        url: api_url + "/client/hold/attendance?clientid=" + clientid,
    }).then(function successCallback(response) {
        if (response.status = 200) {
            var data = response.data;
            $scope.holdattendance = data;
        } else {
            Materialize.toast('error', 3000, 'red');
        }
    }, function errorCallback(response) {
        Materialize.toast('error', 3000, 'red');
    });

    $scope.editattendance = function(objattendance) {
        if (objattendance.projectid != 'undefined' && objattendance.monthandyear != 'undefined') {
            window.location.href = base_url + "client/editattendance?projectid=" + objattendance.projectid + "&monthandyear=" + objattendance.monthandyear+ "&etype=1";
        };
    };

    $scope.editattendances = function(monthandyear, clientid, projectid) {
        var month=new Date(monthandyear);
        var sp=monthandyear.split(" ");
        var date="05/"+sp[0]+"/"+sp[1];
        var nda=new Date(date);
        var perd=new Date(nda);
        $scope.noOfDays=daysInThisMonth(perd);
		console.log('test');
        $('#failure').html("");
        $scope.members = [];
        $http({
            method: 'GET', 
            headers : {
                "Authorization" : atoken
            },
            url: api_url + "/client/attendancedetails?projectid=" + projectid + "&monthandyear=" + monthandyear,
        }).then(function successCallback(response) {
			console.log('response..details',response);
            if (response.status = 200) {				
                if (response.data.length != 0) {
                    $scope.members 	= response.data[0].members;
					$scope.getmembers(monthandyear, clientid, projectid);					
                } else {
                    $scope.getmembers(monthandyear, clientid, projectid);
                }
            } else {
                Materialize.toast('error', 3000, 'red');
            }
        }, function errorCallback(response) {
            Materialize.toast('error', 3000, 'red');
        });
    };

    $scope.getmembers = function(monthandyear, clientid, projectid) {
        $scope.memberdetails = [];
        $http({
            method: 'GET', 
            headers : {
                "Authorization" : atoken
            },
            url: api_url + "/client/attendancelist?clientid="+clientid+"&projectid=" + projectid + "&monthandyear=" + monthandyear,
        }).then(function successCallback(response) {	
            // console.log('response',response);		
            if (response.status = 200) {
                var data = response.data;      
                $scope.memberdetails = response.data;
                $scope.SelectedProjectForUpload = 1;
                $scope.loadValue();
            } else {
                Materialize.toast('error', 3000, 'red');
            }
        }, function errorCallback(response) {
            Materialize.toast('error', 3000, 'red');
        });
    }

    $scope.loadValue =function(){
        console.log('$scope.members.....',$scope.members);
        angular.forEach($scope.members, function(member) {
            member.select=1;
            member.unselect=0;
            member.selectattendance=0;
            member.SelectItems=0;
            member.adselect=0;
            member.ed1select=0;
            member.ed2select=0;
            member.one=0;
            member.od1one=0;
            member.two=0;
            member.od1two=0
            member.three=0;
            member.od1three=0;
            member.four=0;
            member.od1four=0;
            member.five=0;
            member.od1five=0
            member.six=0;
            member.od1six=0;
            member.seven=0;
            member.od1seven=0;
            member.eight=0;
            member.od1eight=0;
            member.nine=0;
            member.od1nine=0;
            member.ten=0;
            member.od1ten=0;
            member.eleven=0;
            member.od1eleven=0;
            member.twelve=0;
            member.od1twelve=0
            member.thirteen=0;
            member.od1thirteen=0;
            member.fourteen=0;
            member.od1fourteen=0
            member.fifteen=0;
            member.od1fifteen=0
            member.sixteen=0;
            member.od1sixteen=0;
            member.seventeen=0;
            member.od1seventeen=0
            member.eighteen=0;
            member.od1eighteen=0
            member.nineteen=0;
            member.od1nineteen=0
            member.twenty=0;
            member.od1twenty=0;
            member.twentyone=0;
            member.od1twentyone=0
            member.twentytwo=0;
            member.od1twentytwo=0
            member.twentythree=0;
            member.od1twentythree=0;
            member.twentyfour=0;
            member.od1twentyfour=0
            member.twentyfive=0;
            member.od1twentyfive=0
            member.twentysix=0;
            member.od1twentysix=0
            member.twentyseven=0;
            member.od1twentyseven=0;
            member.od1twentyeight=0;
            member.od1twentynine=0;
            member.od1thirty=0;
            member.od1thirtyone=0;
            if($scope.noOfDays>=28){
                member.twentyeight=0;
                member.od1twentyeight=0;
            }
            if($scope.noOfDays>=29){
                member.twentynine=0;
                member.od1twentynine=0;
            }
            if($scope.noOfDays>=30){
                member.thirty=0;
                member.od1thirty=0;
            }
            if($scope.noOfDays>=31){
                member.thirtyone=0;
                member.od1thirtyone=0;
            }
        })
    }

    $scope.UploadFile = function(files) {
        $("input").removeClass("disabled");
        $scope.$apply(function() { //I have used $scope.$apply because I will call this function from File input type control which is not supported 2 way binding
            $scope.Message = "";
            $scope.SelectedFileForUpload = files[0];
        })
    }

    function daysInThisMonth(month) {
        var val=month.getMonth();
        var yea=month.getYear();
        var now = new Date(month);
        return new Date(now.getFullYear(), now.getMonth()+1, 0).getDate();
    }

});