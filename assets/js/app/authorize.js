var app = angular.module('pendingatt', ['ngTable', 'ui.bootstrap']).constant('_', window._);
app.controller('pendingattctrl', function ($scope, $http, $filter, NgTableParams) {
    $scope.count = 0;
    $scope.itemsPerPage = $scope.totalItems;
    // $scope.viewby = 20;
    $scope.passshow = 0;
    $scope.rejshow = 0;
    //$scope.passordernumbers=0;
    // $scope.totalItems = 0;
    // $scope.currentPage = 1;
    // $scope.maxSize = 5; //Number of pager buttons to show
    $scope.roleid = roleid;
    $scope.selectedproj = [];
    $scope.selectedprojacc = [];
    $scope.baseurl = base_url;
    $scope.loaderbg = true;
    $scope.passordernumberslist = [];
    $scope.ApprovePayslip = true;
    $scope.viewdata = 0;
    $scope.ssstatus = 0;
    

    $http({
        method: 'GET',
        headers: {
            'Authorization' : atoken
        }, 
        url: api_url + "/job/PassOrderNumberList",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.passorders = response.data;
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
        url: api_url + "/job/jobmaster",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.jobmaster = response.data;
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });

    $scope.getpayslip = function (monthandyear) {
        $http({
            method: 'GET',
            headers: {
                'Authorization' : atoken
            }, 
            url: api_url + "/attendance/duties/authorize?monthandyear=" + monthandyear,
        }).then(function successCallback(response) {
            if (response.status = 200) {
                var data = response.data;
                $scope.tableParams = new NgTableParams({
                    page: 1,
                    count: data.length
                }, {
                    data: data
                });
                $scope.confirm = response.data;
                $scope.totalItems = $scope.confirm.length;
            } else {
                Materialize.toast('error', 3000, 'red');
            }
        }, function errorCallback(response) {
            Materialize.toast('error', 3000, 'red');
        });
    };

    $scope.getPassOrderNumber = function (fromdate,todate)  {
        
        if(fromdate != undefined && todate != undefined) {
            $scope.viewdata = 1;
            debugger
            $http({
                method: 'GET',
                headers: {
                    'Authorization' : atoken
                }, 
                url: api_url + "/job/PassOrderNumberListByDate?fromdate="+fromdate+"&todate="+todate,
            }).then(function successCallback(response) {
                if (response.status = 200) {
                    $scope.passorders = [];
                    $scope.passorders = response.data;
                }
            }, function errorCallback(response) {
                Materialize.toast('Something has gone wrong!', 3000, 'red');
            });
        } else {
            $scope.viewdata = 0;
            if(fromdate == undefined) {
                Materialize.toast('Please Select From Date!', 3000, 'red');
            }
        }
    }


    $scope.authorisepayslips = function (monthandyear) {
        $http({
            method: 'GET',
            headers: {
                'Authorization' : atoken
            }, 
            url: api_url + "/attendance/duties/authorize?monthandyear=" + monthandyear,
        }).then(function successCallback(response) {
            if (response.status = 200) {
                var data = response.data;
                $scope.tableParams = new NgTableParams({
                    page: 1,
                    count: data.length
                }, {
                    data: data
                });
                $scope.confirm = response.data;
                $scope.totalItems = $scope.confirm.length;
            } else {
                Materialize.toast('error', 3000, 'red');
            }
        }, function errorCallback(response) {
            Materialize.toast('error', 3000, 'red');
        });
    };


    $scope.downloadbankslip = function (passordernumber, base_url) {
        var baseurl = base_url + 'assets/BankSlip/';
        $scope.loaderbg = true;
        $http({
            method: 'GET',
            headers: {
                'Authorization' : atoken
            }, 
            url: api_url + "/job/DownloadPayslipByID?passordernumber=" + passordernumber,
        }).then(function successCallback(response) {
            if (response.status = 200) {
                var data = response.data;
                console.log('data', data);
                setTimeout(function () {
                    $scope.fileHref = baseurl + data.filename;
                    console.log('$scope.fileHref', $scope.fileHref);
                    var file_path = $scope.fileHref;
                    var a = document.createElement('A');
                    a.href = file_path;
                    a.download = file_path.substr(file_path.lastIndexOf('/') + 1);
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    a.remove();

                    $scope.fileHref1 = baseurl + data.filepath;
                    var file_path = $scope.fileHref1;
                    var a = document.createElement('A');
                    a.href = file_path;
                    a.download = file_path.substr(file_path.lastIndexOf('/') + 1);
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    a.remove();

                    $scope.fileHref2 = baseurl + data.filename2;
                    var file_path = $scope.fileHref2;
                    var a = document.createElement('A');
                    a.href = file_path;
                    a.download = file_path.substr(file_path.lastIndexOf('/') + 1);
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    a.remove();

                    $scope.fileHref3 = baseurl + data.filename3;
                    var file_path = $scope.fileHref3;
                    var a = document.createElement('A');
                    a.href = file_path;
                    a.download = file_path.substr(file_path.lastIndexOf('/') + 1);
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    a.remove();
                    $scope.loaderbg = false;
                }, 3000);
            } else {
                Materialize.toast('error', 3000, 'red');
            }
        }, function errorCallback(response) {
            Materialize.toast('error', 3000, 'red');
        });
    };

    $scope.authorisepayslip = function (objattendance) { 
        debugger
        $scope.selectedproj = [];
        $scope.objattendance = objattendance;
        // var url='';
        if (objattendance.regionid == undefined) {
            objattendance.regionid = 0;
        }
        // alert(JSON.stringify(objattendance))
        // $('#modalapprove').modal('open');
        if ($scope.roleid == 4) {
            var url = '/job/AttendanceReviewList';
        }
        else if ($scope.roleid == 6) {
            var url = '/job/AuthorizePayslipList';
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
            if (response.status = 200) {
                debugger
                var data = response;
                if ($scope.roleid == 4) {

                    var filteredpendingsup = _.filter(data, function (item) {
                        return item.status == 1 || item.status == 2 || item.status == 8;
                    });
    
                    var filteredapprsup = _.filter(data, function (item) {
                        return item.status == 3 || item.status == 4 || item.status == 6;
                    });
    
                    var filteredholdsup = _.filter(data, function (item) {
                        return item.status == 5 || item.status == 7;
                    });
                    $scope.filteredpendingsup = filteredpendingsup;
                    $scope.firstTableParamsub = new NgTableParams({
                        page: 1,
                        count: filteredpendingsup.length
                    }, {
                        data: filteredpendingsup
                    });
                    $scope.SecondTableParamsub = new NgTableParams({
                        page: 1,
                        count: filteredapprsup.length
                    }, {
                        data: filteredapprsup
                    });
                    $scope.ThirdTableParamsub = new NgTableParams({
                        page: 1,
                        count: filteredholdsup.length
                    }, {
                        data: filteredholdsup
                    });
                }
                if ($scope.roleid == 6) {

                    var filteredpending = _.filter(data, function (item) {
                        return item.status == 3;
                    });
                    var filteredappoved = _.filter(data, function (item) {
                        return item.status == 4 || item.status == 6;
                    });
                    var filteredHold = _.filter(data, function (item) {
                        return item.status == 5 || item.status == 7;
                    });

                    $scope.firstTableParams = new NgTableParams({
                        page: 1,
                        count: filteredpending.length
                    }, {
                        data: filteredpending
                    });
                    $scope.tableParams2 = new NgTableParams({
                        page: 1,
                        count: filteredappoved.length
                    }, {
                        data: filteredappoved
                    });
                    $scope.tableParams3 = new NgTableParams({
                        page: 1,
                        count: filteredHold.length
                    }, {
                        data: filteredHold
                    });
                    $scope.confirm = response.data;
                }
            } else {
                Materialize.toast('error', 3000, 'red');
            }


        }).error(function (error) {
            Materialize.toast(error, 3000, 'red');
        });
    };

    $scope.viewmemberslist = function (memberdata) {
        $scope.viewmembers = memberdata;
        $('#membersmodal').modal('open');
    }

    $scope.reviewattendance = function (monthandyear, clientid, projectid, type) {
        debugger
        $('#failure').html("");
        $scope.members = [];
        $scope.loading = true;
        var status = 1;
        $scope.monthandyear = monthandyear;
        $http({
            method: 'GET',
            headers: {
                'Authorization' : atoken
            }, 
            url: api_url + "/job/authorizeattendance?projectid=" + projectid + "&monthandyear=" + monthandyear + "&types=" +type,
        }).then(function successCallback(response) {
            if (response.status = 200) {
                debugger
                $scope.count = response.data[0].length;
                var data = response.data;
                $scope.counts = response.data[1];
                $scope.attendancedetails = data;

                $scope.reviewatt = [];
                $scope.totalnofduties = 0;
                $scope.totalnoofad = 0;
                $scope.totalnoofed = 0;
                $scope.totalemp = 0;
                angular.forEach($scope.jobmaster, function (job) {
                    $scope.details = [];
                    var totalduties = 0;
                    var totalemps = 0;
                    var totalad = 0;
                    var totaled = 0;
                    angular.forEach($scope.attendancedetails, function (att) {
                        debugger
                        if (job.jobmasterid == att.jobmasterid) {

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
                            if(att.edhold == 1) {
                                att.edstatus = 1;
                            }
                            if(att.athold == 1) {
                                att.holdstatus = 1;
                            }
                            $scope.totalnoofad += att.presentdays;
                            $scope.totalnoofed += att.eddays;

                            $scope.details.push(att);
                        }
                    });
                    if ($scope.details.length) {
                        $scope.reviewatt.push({ 'code': job.code, 'details': $scope.details, 'count': $scope.details.length, 'noofduties': totalduties, 'totalemps': totalemps, 'totalad': totalad, 'totaled': totaled })
                    }
                });
                $('#attenancesummarymodal').modal('open');
                $scope.loading = false;
            } else {
                Materialize.toast('error', 3000, 'red');
            }

        }, function errorCallback(response) {
            Materialize.toast('error', 3000, 'red');
        });

        $http({
            method: 'GET',
            headers: {
                'Authorization' : atoken
            }, 
            url: api_url + "/ProjectAgreementDetailsByID?clientid=" + clientid + "&projectid=" + projectid + "&monthandyear=" + monthandyear,
        }).then(function successCallback(response) {
            if (response.status = 200) {
                $scope.agreementdetails = response.data;
                //alert(JSON.stringify($scope.jobmaster));
            }
        }, function errorCallback(response) {
            Materialize.toast('Something has gone wrong!', 3000, 'red');
        });
    };

    /*select project with check box*/
    $scope.selectEntity = function (selected) {
        // alert('selected',JSON.stringify(selected));
        debugger
        if (selected.ischecked) {
            $scope.selectedproj.push(selected);
            $scope.passshow = 0;
        }
        else {
            $scope.selectedproj.splice(selected, 1);
            $scope.passshow = 0;
        }
        // alert(JSON.stringify( $scope.selectedproj))
    };

    $scope.getpassdetails = function (passordersno) {
        $scope.pssno = passordersno;
        $http({
            method: 'GET',
            headers: {
                'Authorization' : atoken
            }, 
            url: api_url + "/job/PassOrderNoProjectDetailsByID?passordernumber=" + passordersno,
        }).then(function successCallback(response) {
            if (response.status = 200) {
                $scope.passordernumberslist = response.data;

                var data = response.data;

                var filteredpending = _.filter(data, function (item) {
                    return item.status == 4 || item.salstatus ==4 ; 
                });

                var filteredappoved = _.filter(data, function (item) {
                    return item.status == 6 && item.salstatus ==6;
                });

                var filteredHold = _.filter(data, function (item) {
                    return (item.status == 5 || item.status == 7) &&  (item.salstatus == 5 || item.salstatus == 7);
                });

                //alert(JSON.stringify(filteredappoved))

                $scope.firstTableParams = new NgTableParams({
                    page: 1,
                    count: filteredpending.length
                }, {
                    data: filteredpending
                });

                $scope.tableParams2 = new NgTableParams({
                    page: 1,
                    count: filteredappoved.length
                }, {
                    data: filteredappoved
                });

                $scope.tableParams3 = new NgTableParams({
                    page: 1,
                    count: filteredHold.length
                }, {
                    data: filteredHold
                });



                // $scope.passshow=1;

                // alert(JSON.stringify(data));
            }
        }, function errorCallback(response) {
            Materialize.toast('Something has gone wrong!', 3000, 'red');
        }); 
    }

    $scope.resetprojcashier = function() {
        $scope.selectedproj = [];
        $scope.authorisepayslip($scope.objattendance);
    }
    $scope.resetprojcao = function () {
        $scope.selectedproj = [];
        $scope.getpassdetails($scope.pssno);
    }
    $scope.resetproj = function () {
        $scope.selectedproj = [];
    }

    $scope.accept = function () {
        $http({
            method: 'GET',
            headers: {
                'Authorization' : atoken
            }, 
            url: api_url + "/job/PassOrderNumber",
        }).then(function successCallback(response) {
            if (response.status = 200) {
                $scope.passordernumbers = response.data.passordernumber;
                $scope.passshow = 1;
                //alert(JSON.stringify($scope.jobmaster));
            }
        }, function errorCallback(response) {
            Materialize.toast('Something has gone wrong!', 3000, 'red');
        });


    }


    $scope.rejectcash = function () {
       
        $scope.rejshow=1;   
    }

    $scope.proceedpay = function (status, passordernumbers,rejectreason) {
        if(rejectreason == undefined)
        {
            rejectreason='';
        }
        var finalarray = [{ 'projects': $scope.selectedproj, 'passordernumber': passordernumbers, 'status': status,'rejectreason':rejectreason }];
         console.log(JSON.stringify(finalarray));
        $http({
            method: 'POST',
            url: api_url + "/job/CashierAuthorize",
            data: $.param({ 'data': finalarray }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : atoken
            },
        }).success(function (response, result) {
            if (response.status = 200) {             
                $scope.authorisepayslip($scope.objattendance);
                $scope.selectedproj = [];
                $scope.passshow = 0;
                $scope.rejshow=0;
                if(status == 5) {
                    Materialize.toast('Selected Project Salary has been holded!', 3000, 'green');
                } else if(status == 7) {
                    Materialize.toast('Selected Project Salary has been Rejected!', 3000, 'green');
                } else if(status == 4) {
                    Materialize.toast('Selected Project Salary has been Approved!', 3000, 'green');
                } else {
                    Materialize.toast('Success!', 3000, 'green');
                }
            }
        }).error(function (error) {
            Materialize.toast(error, 3000, 'red');
        });
    }


    $scope.supervisorReject = function (status, passordernumbers,rejectreason) {
        if(rejectreason == undefined)
        {
            rejectreason='';
        }
        var finalarray = [{ 'projects': $scope.selectedproj, 'passordernumber': passordernumbers, 'status': status,'rejectreason':rejectreason }];
        // alert(JSON.stringify(finalarray));
        $http({
            method: 'POST',
            url: api_url + "/job/CashierAuthorize",
            data: $.param({ 'data': finalarray }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : atoken
            },
        }).success(function (response, result) {
            if (response.status = 200) {             
                $scope.authorisepayslip($scope.objattendance);
                $scope.selectedproj = [];
                $scope.passshow = 0;
                $scope.rejshow=0;
                if(status == 5) {
                    Materialize.toast('Selected Project Salary has been holded!', 3000, 'green');
                } else if(status == 7) {
                    Materialize.toast('Selected Project Salary has been Rejected!', 3000, 'green');
                } else if(status == 4) {
                    Materialize.toast('Selected Project Salary has been Approved!', 3000, 'green');
                } else {
                    Materialize.toast('Success!', 3000, 'green');
                }
            }
        }).error(function (error) {
            Materialize.toast(error, 3000, 'red');
        });
    }

    /*select passorder with check box*/
    $scope.selectEntityPassorder = function (selected) {
        debugger
        if (selected.ischecked) {
            $scope.selectedprojacc.push(selected)
        }
        else {
            $scope.selectedprojacc.splice(selected, 1)
        }
        // alert(JSON.stringify($scope.selectedprojacc)) 
    };

    $scope.caoapprove = function (status,rejectreason) {

        if(rejectreason == undefined)
        {
            rejectreason='';
        }
        var finalarray = [{ 'projects': $scope.selectedprojacc, 'status': status ,'rejectreason':rejectreason}]
        alert(JSON.stringify(finalarray)); 
        $http({
            method: 'POST',
            url: api_url + "/job/CAOApproval",
            data: $.param({ 'data': finalarray }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : atoken
            },
        }).success(function (response, result) {
            if (response.status = 200) {
                $scope.rejshow=0;
                $scope.selectedprojacc = [];
                $scope.getpassdetails($scope.pssno);
                if(status == 5) {
                    Materialize.toast('Selected Project Salary has been holded!', 3000, 'green');
                } else if(status == 7) {
                    Materialize.toast('Selected Project Salary has been Rejected!', 3000, 'green');
                } else if(status == 6) {
                    Materialize.toast('Selected Project Salary has been Approved!', 3000, 'green');
                } else {
                    Materialize.toast('Success!', 3000, 'green');
                }
            }
        }).error(function (error) {
            Materialize.toast(error, 3000, 'red');
        });
    }

    $scope.cancelpay = function () {
        $scope.passshow = 0;
        $scope.rejshow = 0;
    }

    $scope.authorizedcount  = 0;
    $scope.workingcount  = 0;

    $scope.authorize = function (projectid, monthandyear, clientid, status, billstatus,ssstatus,payslipno) { 
        debugger
        $scope.projectid = projectid;
        $scope.monthandyear = monthandyear;
        $scope.clientid = clientid;
        $scope.status = status;
        $scope.ssstatus = ssstatus;
        $scope.billstatus = billstatus;
        $scope.payslipno = payslipno;
        $scope.ApprovePayslip = false;
        if(status == 2 || status == 8) { 
            $http({
                method: 'GET',
                headers: {
                    'Authorization' : atoken
                }, 
                url: api_url + "/ProjectAgreementDetailsByID?clientid=" + clientid + "&projectid=" + projectid + "&monthandyear=" + monthandyear,
            }).then(function successCallback(response) {
                if (response.status = 200) {
                    var agdetails = response.data[0];
                    // console.log('agdetails',agdetails);
                    if(agdetails) {
                        for(var i = 0; i < agdetails.manpower.length;i++) {
                            $scope.authorizedcount += agdetails.manpower[i].authvacancy;
                            $scope.workingcount += agdetails.manpower[i].postedvqacacny;
                        } 
                    }
                    $('#modalapply').modal('open');
                } else {
                    $('#modalapply').modal('open');
                }
            }, function errorCallback(response) {
                Materialize.toast('Something has gone wrong!', 3000, 'red');
            });
        } else {
            $('#modalreject').modal('open');
            // $scope.authorizesubmit(projectid, monthandyear, clientid, status, billstatus ,1);
        }
    }

    $scope.rejectSupervisor = function (applied,data)
    {
        // console.log('applied',applied);
        // console.log('data',data);
        $scope.rejectprojects = [];
        $scope.rejectprojects = _.filter(data, function (item) {
            return item.invoiceno == applied.invoiceno
        });

        console.log($scope.rejectprojects);

        $('#modalrejectsup').modal('open');
    }

    $scope.rejectsubmit = function (status,reason)
    {
        if(reason == undefined)
        {
            reason='';
        }
        var finalarray = [{ 'projects': $scope.rejectprojects, 'status': '7','rejectreason':reason }];
         //alert(JSON.stringify(finalarray));
        $http({
            method: 'POST',
            url: api_url + "/job/SupervoiserReject",
            data: $.param({ 'data': finalarray }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : atoken
            },
        }).success(function (response, result) {
            if (response.status = 200) {             
                $scope.authorisepayslip($scope.objattendance);
                $scope.rejectprojects = [];
             
              Materialize.toast('Selected Project Salary has been Rejected!', 3000, 'green');
              $('#modalrejectsup').modal('close');
            }
        }).error(function (error) {
            Materialize.toast(error, 3000, 'red');
        });
    }


    $scope.authorizesubmit = function (projectid, monthandyear, clientid, status, billstatus , type,payslipno,reason) {   

       
        
       // return;
        debugger
        $scope.ApprovePayslip = true;
        var posturl = api_url + "/job/AttendanceAuthorize";
        $http({
            method: 'POST',
            url: posturl,
            data: $.param({
                "projectid": projectid,
                "monthandyear": monthandyear,
                "clientid": clientid,
                "status": status,
                "billstatus": billstatus,
                "approvaltype": type,
                "payslipno" : payslipno,
                "reason" : reason
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : atoken
            },
        }).success(function (response, result) {
            $('#modalreject').modal('close');
            $('#modalapply').modal('close');
            $('#modalapprove').modal('close');
            $scope.ApprovePayslip = false;
            $scope.rejshow=0; 
            if (response.status = 200) {
                if (status == 0) {
                    Materialize.toast('Attendance Rejected ', 3000, 'green');
                }
                else if (type == 1) {
                    Materialize.toast('Authorization done Successfully ', 3000, 'green');
                }
                else if (type == 2) {
                    Materialize.toast('Salary Slip generated ', 3000, 'green');
                } else {
                    Materialize.toast('Authorization done Successfully ', 3000, 'green');
                }
                $scope.authorisepayslip($scope.objattendance);
            }
        }).error(function (error) {
            $scope.ApprovePayslip = false;
            $('#modalreject').modal('close');
            $('#modalapply').modal('close');
            debugger
            var err = error.split('Error   -- ').join("");
            var errs = err.replace("\"","");
            errs = errs.replace("\"","");
            if(errs == 'wages') {
                Materialize.toast('Please Check Wage for pay slip generation', 3000, 'red');
            } 
            if(errs == 'invoice') {
                setTimeout(function () {
                    $('#modalapprove').modal('open');
                },500);
            } 
            if(errs == 'Attendance') {
                Materialize.toast('Attendance not exists', 3000, 'red');
            } 
        });
    };

    $scope.generateInvoice = function (projectid, monthandyear, clientid, status, billstatus) {
        $http({
            method: 'POST',
            url: api_url + "/attendance/invoice",
            data: $.param({
                "projectid": projectid,
                "monthandyear": monthandyear,
                "clientid": clientid,
                "status": status,
                "billstatus": billstatus
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : atoken
            },
        }).success(function (response, result) {
            if (response.status = 200) {
                Materialize.toast('Invoice Generated Successfully ', 3000, 'green');
                $scope.authorisepayslip($scope.objattendance);
            }
        }).error(function (error) {
            Materialize.toast('Wage Rate is not available. Please check', 3000, 'red');
        });
    }

    $scope.viewepayslip = function (projectid, monthandyear) {
        $http({
            method: 'GET',
            headers: {
                'Authorization' : atoken
            }, 
            url: api_url + "/job/get/payslip",
            data: $.param({
                "projectid": projectid,
                "monthandyear": monthandyear,
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        }).success(function (response, result) {
            if (response.status = 200) {

            }
            else {
                Materialize.toast('Pay Slip Not Generated', 3000, 'Red');
            }
        }).error(function (error) {
            $('#failure').html(error);
        });
    };

    $scope.reject = function (projectid, monthandyear) {
        $http({
            method: 'POST',
            url: api_url + "/job/invoice/reject",
            data: $.param({
                "projectid": projectid,
                "monthandyear": monthandyear,
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : atoken 
            },
        }).success(function (response, result) {
            if (response.status = 200) {
                Materialize.toast('Rejection done Successfully ', 3000, 'red');
                $scope.getpayslip(monthandyear)
            }
        }).error(function (error) {
            Materialize.toast(error, 3000, 'red');
        });
    };
});