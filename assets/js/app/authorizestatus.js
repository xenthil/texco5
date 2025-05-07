var app = angular.module('appAttStatus', ['ngTable', 'ui.bootstrap']).constant('_', window._);
app.constant("moment", moment);
app.controller('ctrlAttStatus', function ($scope, $http, $filter, NgTableParams) {

    $scope.attendancestatuss = 1;
    $scope.attendancelength = 0;
    $scope.regionid = 0;
    $scope.currentdate = moment().format('YYYY-MM-DD');
    $scope.lastdate = moment().subtract(7, 'days').format('YYYY-MM-DD');
    $scope.objattendance = {};
    $scope.attendancelist = [];
    $scope.sscreated = {};
    $scope.ssnotcreated = {};
    $scope.objattendances = {};
    $scope.ssrejected = {};

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
 
    $scope.getAttendanceStatusDetails = function (objattendance) {
        debugger
        if (objattendance.regionid == undefined) {
            objattendance.regionid = 0;
        }
        $http({
            method: 'GET',
            headers: {
                'Authorization' : atoken
            }, 
            url: api_url + "/attendance/duties/authorizestatus?fromdate="+objattendance.fromdate+"&todate="+objattendance.todate+"&regionid="+objattendance.regionid,
        }).then(function successCallback(response) {
            if (response.status = 200) {
                debugger
                $scope.attendancestatuss = 1;
                var data = response.data;
                $scope.filteredpendingsup = data;
                $scope.firstTableParamsub = new NgTableParams({
                    page: 1,
                    count: $scope.filteredpendingsup.length
                }, {
                    data: $scope.filteredpendingsup
                });
            } else {
                Materialize.toast('error', 3000, 'red');
            }
        }, function errorCallback(response) {
            Materialize.toast('error', 3000, 'red');
        });
    };

    $scope.getAttendanceExportDetails = function (objattendance) {
        debugger
        if (objattendance.regionid == undefined) {
            objattendance.regionid = 0;
        }
        $http({
            method: 'GET',
            headers: {
                'Authorization' : atoken
            }, 
            url: api_url + "/attendance/duties/authorizestatus?fromdate="+objattendance.fromdate+"&todate="+objattendance.todate+"&regionid="+objattendance.regionid,
        }).then(function successCallback(response) {
            if (response.status = 200) {
                debugger
                var data = response.data;
                var attendance = [];
                for(var i = 0; i < data.length; i++) {
                    var members = '';
                    var memberscount = 0;
                    for(var j = 0; j < data[i].duties.length; j++) {
                        if( j == 0) {
                            members += data[i].duties[j].category + ' - ' + data[i].duties[j].totalduties;
                        } else {
                            members += ' , '+data[i].duties[j].category + ' - ' + data[i].duties[j].totalduties;
                        }
                        memberscount += data[i].duties[j].memberscount;
                    }
                    attendance.push({'SNo':(i+1),'ProjectNo':data[i].projectno,'ProjectName':data[i].projectname,'ClientName':data[i].clientname,'MonthAndYear':data[i].monthandyear,'MemberCount':memberscount,'TotalDuties': members,'PaySlipNo':data[i].payslipno,'InvoiceNo':data[i].invoiceno,'CurrentStatus':data[i].currentstatus});
                }
                JSONToCSVConvertor(attendance, 'Attendance Project Status', true)
            } else {
                Materialize.toast('error', 3000, 'red');
            }
        }, function errorCallback(response) {
            Materialize.toast('error', 3000, 'red');
        });
    };


    $scope.getpendingAttendanceDetails = function (objatt) {
        if (objatt.regionid == undefined) {
            objatt.regionid = 0;
        }
        debugger
        $http({
            method: 'GET',
            headers: {
                'Authorization' : atoken
            }, 
            url: api_url + "/attendance/attendancependinglist?monthandyear="+objatt.monthandyear+"&regionid="+objatt.regionid,
        }).then(function successCallback(response) {
            if (response.status = 200) {
                $scope.attendancestatuss = 0;
                var data = response.data;
                $scope.attendancelength = data.attendance.length;
                $scope.attendances = response.data.attendance;
                $scope.projects = response.data.projects;
                if($scope.attendancelength == 0){
                    $scope.attendancelist = response.data.projects;
                }
                if($scope.attendancelength > 0) {
                    for(var i=0;i<$scope.projects.length;i++){
                        if ($scope.attendances.indexOf($scope.projects[i].projectid) === -1) {
                            $scope.attendancelist.push($scope.projects[i]);
                        }
                    }
                }
                $scope.tableParams = new NgTableParams({
                    page: 1,
                    count: $scope.attendancelist.length
                }, {
                    data: $scope.attendancelist
                });
            } else {
                Materialize.toast('error', 3000, 'red');
            }
        }, function errorCallback(response) {
            Materialize.toast('error', 3000, 'red');
        });
    };  

    $scope.getpendingAttendanceExportedDetails = function (objatt) {
        if (objatt.regionid == undefined) {
            objatt.regionid = 0;
        }
        debugger
        $http({
            method: 'GET',
            headers: {
                'Authorization' : atoken
            }, 
            url: api_url + "/attendance/attendancependinglist?monthandyear="+objatt.monthandyear+"&regionid="+objatt.regionid,
        }).then(function successCallback(response) {
            if (response.status = 200) {
                $scope.attendancestatuss = 0;
                var data = response.data;
                $scope.attendancelength = data.attendance.length;
                $scope.attendances = response.data.attendance;
                $scope.projects = response.data.projects;
                $scope.attendancelists = [];
                if($scope.attendancelength == 0){
                    for(var i=0;i<$scope.projects.length;i++){
                        $scope.attendancelists.push({'Sno':(i+1),'ClientName':$scope.projects[i].organization,'ProjectNo':$scope.projects[i].projectno,'ProjectName':$scope.projects[i].name,'ContactName':$scope.projects[i].contactname,'Email':$scope.projects[i].email});
                    }
                }
                if($scope.attendancelength > 0) {
                    for(var i=0;i<$scope.projects.length;i++){
                        if ($scope.attendances.indexOf($scope.projects[i].projectid) === -1) {
                            $scope.attendancelists.push({'Sno':(i+1),'ClientName':$scope.projects[i].organization,'ProjectName':$scope.projects[i].projectno,'ProjectNo':$scope.projects[i].name,'ContactName':$scope.projects[i].contactname,'Email':$scope.projects[i].email});
                        }
                    }
                }
                // var data = response.data;
                JSONToCSVConvertor($scope.attendancelists, 'Attendance Not Submitted', true)
            } else {
                Materialize.toast('error', 3000, 'red');
            }
        }, function errorCallback(response) {
            Materialize.toast('error', 3000, 'red');
        });
    };  


    $scope.getSalaryCreatedDetails = function (sscreated) {
        debugger
        if (sscreated.regionid == undefined) {
            sscreated.regionid = 0;
        }
        $http({
            method: 'GET',
            headers: {
                'Authorization' : atoken
            }, 
            url: api_url + "/attendance/salarycreatedstatus?fromdate="+sscreated.fromdate+"&todate="+sscreated.todate+"&regionid="+sscreated.regionid,
        }).then(function successCallback(response) {
            if (response.status = 200) {
                debugger
                $scope.attendancestatuss = 1;
                var data = response.data;
                $scope.filteredpendingsup1 = data;
                $scope.firstTableParamsub1 = new NgTableParams({
                    page: 1,
                    count: $scope.filteredpendingsup1.length
                }, {
                    data: $scope.filteredpendingsup1
                });
            } else {
                Materialize.toast('error', 3000, 'red');
            }
        }, function errorCallback(response) {
            Materialize.toast('error', 3000, 'red');
        });
    }

    $scope.getSalaryCreatedExportedDetails = function (sscreated) {
        debugger
        if (sscreated.regionid == undefined) {
            sscreated.regionid = 0;
        }
        $http({
            method: 'GET',
            headers: {
                'Authorization' : atoken
            }, 
            url: api_url + "/attendance/salarycreatedstatus?fromdate="+sscreated.fromdate+"&todate="+sscreated.todate+"&regionid="+sscreated.regionid,
        }).then(function successCallback(response) {
            if (response.status = 200) {
                debugger
                var data = response.data;
                var attendance = [];
                for(var i = 0; i < data.length; i++) {
                    var members = '';
                    var memberscount = 0;
                    for(var j = 0; j < data[i].duties.length; j++) {
                        if( j == 0) {
                            members += data[i].duties[j].category + ' - ' + data[i].duties[j].totalduties;
                        } else {
                            members += ' , '+data[i].duties[j].category + ' - ' + data[i].duties[j].totalduties;
                        }
                        memberscount += data[i].duties[j].memberscount;
                    }
                    attendance.push({'SNo':(i+1),'ProjectNo':data[i].projectno,'ProjectName':data[i].projectname,'ClientName':data[i].clientname,'MonthAndYear':data[i].monthandyear,'MemberCount':memberscount,'TotalDuties': members,'PaySlipNo':data[i].payslipno,'InvoiceNo':data[i].invoiceno,'CurrentStatus':data[i].currentstatus});
                }
                JSONToCSVConvertor(attendance, 'Salary Created', true)
            } else {
                Materialize.toast('error', 3000, 'red');
            }
        }, function errorCallback(response) {
            Materialize.toast('error', 3000, 'red');
        });
    }


    $scope.getSalaryNotCreatedDetails = function (ssnotcreated) {
        debugger
        if (ssnotcreated.regionid == undefined) {
            ssnotcreated.regionid = 0;
        }
        $http({
            method: 'GET',
            headers: {
                'Authorization' : atoken
            }, 
            url: api_url + "/attendance/salarynotcreatedstatus?fromdate="+ssnotcreated.fromdate+"&todate="+ssnotcreated.todate+"&regionid="+ssnotcreated.regionid,
        }).then(function successCallback(response) {
            if (response.status = 200) {
                debugger
                $scope.attendancestatuss = 1;
                var data = response.data;
                $scope.filteredpendingsup2 = data;
                $scope.firstTableParamsub2 = new NgTableParams({
                    page: 1,
                    count: $scope.filteredpendingsup2.length
                }, {
                    data: $scope.filteredpendingsup2
                });
            } else {
                Materialize.toast('error', 3000, 'red');
            }
        }, function errorCallback(response) {
            Materialize.toast('error', 3000, 'red');
        });
    }

    $scope.getSalaryNotCreatedExportedDetails = function (ssnotcreated) {
        debugger
        if (ssnotcreated.regionid == undefined) {
            ssnotcreated.regionid = 0;
        }
        $http({
            method: 'GET',
            headers: {
                'Authorization' : atoken
            }, 
            url: api_url + "/attendance/salarynotcreatedstatus?fromdate="+ssnotcreated.fromdate+"&todate="+ssnotcreated.todate+"&regionid="+ssnotcreated.regionid,
        }).then(function successCallback(response) {
            if (response.status = 200) {
                var data = response.data;
                var attendance = [];
                for(var i = 0; i < data.length; i++) {
                    var members = '';
                    var memberscount = 0;
                    for(var j = 0; j < data[i].duties.length; j++) {
                        if( j == 0) {
                            members += data[i].duties[j].category + ' - ' + data[i].duties[j].totalduties;
                        } else {
                            members += ' , '+data[i].duties[j].category + ' - ' + data[i].duties[j].totalduties;
                        }
                        memberscount += data[i].duties[j].memberscount;
                    } 
                    attendance.push({'SNo':(i+1),'ProjectNo':data[i].projectno,'ProjectName':data[i].projectname,'ClientName':data[i].clientname,'MonthAndYear':data[i].monthandyear,'MemberCount':memberscount,'TotalDuties': members,'PaySlipNo':data[i].payslipno,'InvoiceNo':data[i].invoiceno,'CurrentStatus':data[i].currentstatus});
                }
            JSONToCSVConvertor(attendance, 'Salary Not Created', true)
            } else {
                Materialize.toast('error', 3000, 'red');
            }
        }, function errorCallback(response) {
            Materialize.toast('error', 3000, 'red');
        });
    }

    $scope.getAttendanceSubmittedDetails = function (objattendances) {
        debugger
        if (objattendances.regionid == undefined) {
            objattendances.regionid = 0;
        }
        $http({
            method: 'GET',
            headers: {
                'Authorization' : atoken
            }, 
            url: api_url + "/attendance/attendancesubmittedstatus?fromdate="+objattendances.fromdate+"&todate="+objattendances.todate+"&regionid="+objattendances.regionid,
        }).then(function successCallback(response) {
            if (response.status = 200) {
                debugger
                $scope.attendancestatuss = 1;
                var data = response.data;
                $scope.filteredpendingsup3 = data;
                $scope.firstTableParamsub3 = new NgTableParams({
                    page: 1,
                    count: $scope.filteredpendingsup3.length
                }, {
                    data: $scope.filteredpendingsup3
                });
            } else {
                Materialize.toast('error', 3000, 'red');
            }
        }, function errorCallback(response) {
            Materialize.toast('error', 3000, 'red');
        });
    } 

    $scope.getAttendanceSubmittedExportedDetails = function (objattendances) {
        debugger
        if (objattendances.regionid == undefined) {
            objattendances.regionid = 0;
        }
        $http({
            method: 'GET',
            headers: {
                'Authorization' : atoken
            }, 
            url: api_url + "/attendance/attendancesubmittedstatus?fromdate="+objattendances.fromdate+"&todate="+objattendances.todate+"&regionid="+objattendances.regionid,
        }).then(function successCallback(response) {
            if (response.status = 200) {
                debugger
                var data = response.data;
                var attendance = [];
                for(var i = 0; i < data.length; i++) {
                    var members = '';
                    var memberscount = 0;
                    for(var j = 0; j < data[i].duties.length; j++) {
                        if( j == 0) {
                            members += data[i].duties[j].category + ' - ' + data[i].duties[j].totalduties;
                        } else {
                            members += ' , '+data[i].duties[j].category + ' - ' + data[i].duties[j].totalduties;
                        }
                        memberscount += data[i].duties[j].memberscount;
                    }
                    attendance.push({'SNo':(i+1),'ProjectNo':data[i].projectno,'ProjectName':data[i].projectname,'ClientName':data[i].clientname,'MonthAndYear':data[i].monthandyear,'MemberCount':memberscount,'TotalDuties': members,'CurrentStatus':data[i].currentstatus});
                }
                JSONToCSVConvertor(attendance, 'Attendance Project Status', true)
            } else {
                Materialize.toast('error', 3000, 'red');
            }
        }, function errorCallback(response) {
            Materialize.toast('error', 3000, 'red');
        });
    } 

    // $scope.getSalaryNotCreatedDetails = function (ssnotcreated) {
    //     debugger
    //     if (ssnotcreated.regionid == undefined) {
    //         ssnotcreated.regionid = 0;
    //     }
    //     $http({
    //         method: 'GET',
    //         url: api_url + "/attendance/salarynotcreatedstatus?fromdate="+ssnotcreated.fromdate+"&todate="+ssnotcreated.todate+"&regionid="+ssnotcreated.regionid,
    //     }).then(function successCallback(response) {
    //         if (response.status = 200) {
    //             debugger
    //             $scope.attendancestatuss = 1;
    //             var data = response.data;
    //             $scope.filteredpendingsup2 = data;
    //             $scope.firstTableParamsub2 = new NgTableParams({
    //                 page: 1,
    //                 count: $scope.filteredpendingsup2.length
    //             }, {
    //                 data: $scope.filteredpendingsup2
    //             });
    //         } else {
    //             Materialize.toast('error', 3000, 'red');
    //         }
    //     }, function errorCallback(response) {
    //         Materialize.toast('error', 3000, 'red');
    //     });
    // }

    $scope.getSalaryRejectedDetails = function (ssrejected) {
        debugger
        if (ssrejected.regionid == undefined) {
            ssrejected.regionid = 0;
        }
        $http({
            method: 'GET',
            headers: {
                'Authorization' : atoken
            }, 
            url: api_url + "/attendance/salaryrejectedstatus?fromdate="+ssrejected.fromdate+"&todate="+ssrejected.todate+"&regionid="+ssrejected.regionid,
        }).then(function successCallback(response) {
            if (response.status = 200) {
                debugger
                $scope.attendancestatuss = 1;
                var data = response.data;
                $scope.filteredpendingsup4 = data;
                $scope.firstTableParamsub4 = new NgTableParams({
                    page: 1,
                    count: $scope.filteredpendingsup4.length
                }, {
                    data: $scope.filteredpendingsup4
                });
            } else {
                Materialize.toast('error', 3000, 'red');
            }
        }, function errorCallback(response) {
            Materialize.toast('error', 3000, 'red');
        });
    }

    $scope.getSalaryRejectedExportDetails = function (ssrejected) {
        debugger
        if (ssrejected.regionid == undefined) {
            ssrejected.regionid = 0;
        }
        $http({
            method: 'GET',
            headers: {
                'Authorization' : atoken
            }, 
            url: api_url + "/attendance/salaryrejectedstatus?fromdate="+ssrejected.fromdate+"&todate="+ssrejected.todate+"&regionid="+ssrejected.regionid,
        }).then(function successCallback(response) {
            if (response.status = 200) {
                debugger
                var data = response.data;
                var attendance = [];
                for(var i = 0; i < data.length; i++) {
                    var members = '';
                    var memberscount = 0;
                    for(var j = 0; j < data[i].duties.length; j++) {
                        if( j == 0) {
                            members += data[i].duties[j].category + ' - ' + data[i].duties[j].totalduties;
                        } else {
                            members += ' , '+data[i].duties[j].category + ' - ' + data[i].duties[j].totalduties;
                        }
                        memberscount += data[i].duties[j].memberscount;
                    }
                    attendance.push({'SNo':(i+1),'ProjectNo':data[i].projectno,'ProjectName':data[i].projectname,'ClientName':data[i].clientname,'MonthAndYear':data[i].monthandyear,'MemberCount':memberscount,'TotalDuties': members,'PaySlipNo':data[i].payslipno,'InvoiceNo':data[i].invoiceno,'CurrentStatus':data[i].currentstatus});
                }
                JSONToCSVConvertor(attendance, 'Salary Rejected', true)
            } else {
                Materialize.toast('error', 3000, 'red');
            }
        }, function errorCallback(response) {
            Materialize.toast('error', 3000, 'red');
        });
    }

    $scope.objattendance = {'fromdate':$scope.lastdate,'todate':$scope.currentdate,'regionid':$scope.regionid};
    $scope.sscreated = {'fromdate':$scope.lastdate,'todate':$scope.currentdate,'regionid':$scope.regionid};
    $scope.ssnotcreated = {'fromdate':$scope.lastdate,'todate':$scope.currentdate,'regionid':$scope.regionid};
    $scope.objattendances = {'fromdate':$scope.lastdate,'todate':$scope.currentdate,'regionid':$scope.regionid};
    $scope.ssrejected = {'fromdate':$scope.lastdate,'todate':$scope.currentdate,'regionid':$scope.regionid};
    $scope.getAttendanceStatusDetails($scope.objattendance);
   
    $scope.SalaryCreated = function() {
        $scope.getSalaryCreatedDetails($scope.sscreated);
    } 

    $scope.SalaryNotCreated = function() {
        $scope.getSalaryNotCreatedDetails($scope.ssnotcreated);
    }

    $scope.attendancesubmittedstatus  = function() {
        $scope.getAttendanceSubmittedDetails($scope.objattendances);
    }
    $scope.SalaryRejected = function() {
        $scope.getSalaryRejectedDetails($scope.ssrejected);
    }

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
                row += '"' + arrData[i][index] + '",';
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

});