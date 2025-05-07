    var app = angular.module('appClient', ['ngFileUpload', 'ngTable', 'ui.bootstrap']).constant('_', window._);
    app.constant("moment", moment);
    app.controller('ctrlClient', function($scope, $http, Upload, $timeout, $filter, NgTableParams) {
        var scope = $scope;
        $scope.clients = [];
        $scope.searchresult = [];
        $scope.selected = {};
        $scope.objclient = {};
        $scope.filter = "";
        $scope.count = 0;
        $scope.roleid = roleid;
        $scope.viewby = 10;
        $scope.totalItems = 0;
        $scope.currentPage = 1;
        $scope.itemsPerPage = $scope.viewby;
        $scope.maxSize = 5; //Number of pager buttons to show
        $scope.buttondisable = false;
        $scope.downloadclients =  [];
        $scope.searchvalues = [{
                text: 'Organization',
                field: 'organization'
            },
            { 
                text: 'Contact Name',
                field: 'contactname'
            },
            {
                text: 'Mobile',
                field: 'mobile'
            },
            {
                text: 'Phone',
                field: 'phone'
            },
            {
                text: 'GST No',
                field: 'gstno'
            },
            {
                text: 'PAN No',
                field: 'panno'
            },
            {
                text: 'TAN No',
                field: 'tanno'
            }
        ];   
        
        $scope.currentdate = moment().format('YYYY-MM-DD');
        $scope.lastdate = moment().subtract(7, 'days').format('YYYY-MM-DD');

        $scope.orgcheck = -1;
        $scope.contactnocheck = -1;
        $scope.mobilenocheck = -1;
        $scope.emailcheck = -1;
        $scope.phonecheck = -1;
        $scope.regioncheck = -1;
        $scope.districtcheck = -1;
        $scope.talukcheck = -1;
        $scope.addressline1check = -1;
        $scope.addressline2check = -1;
        $scope.addressline3check = -1;
        $scope.pincodecheck = -1;
        $scope.statecheck = -1;
        $scope.countrycheck = -1;
        $scope.gstnocheck = -1;
        $scope.pannocheck  = -1;
        $scope.gsttannocheck = -1;
        $scope.tannocheck = -1;
        $scope.empdeptcheck = -1;
        $scope.depttypecheck = -1;
        $scope.deptcheck = -1;
        $scope.approvalcheck = -1;
        $scope.imagecheck = -1;
        
        $scope.objattendance = {'fromdate':$scope.lastdate,'todate':$scope.currentdate};

        $scope.pendingmember = function(data) {
            $http({
                method: 'GET', 
                headers : {
                    "Authorization" : atoken
                },
                url: api_url + "/client/approvals?lkvalid=" + $scope.pendingcode,
            }).then(function successCallback(response) {
                if (response.status = 200) {
                    var data = response.data;
                    $scope.pendingclients = response.data.length;
                    $scope.tableParams = new NgTableParams({
                        page: 1,
                        count: response.data.length
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

        $http({
            method: 'GET', 
            headers : {
                "Authorization" : atoken
            },
            url: api_url + "/lookupvalues/lookupvalueid?lkdmcode=APROVE&code=PEND",
        }).then(function successCallback(response) {
            if (response.status = 200) {
                $scope.pendingcode = response.data.lkvalid;
                $scope.pendingmember();
            }
        }, function errorCallback(response) {
            Materialize.toast('Something has gone wrong!', 3000, 'red');
        });

        $http({
            method: 'GET', 
            headers : {
                "Authorization" : atoken
            },
            url: api_url + "/lookupvalues/lookupvalueid?lkdmcode=APROVE&code=CONFIRM",
        }).then(function successCallback(response) {
            if (response.status = 200) {
                $scope.confirmcode = response.data.lkvalid;
            }
        }, function errorCallback(response) {
            Materialize.toast('Something has gone wrong!', 3000, 'red');
        });


        $http({
            method: 'GET', 
            headers : {
                "Authorization" : atoken
            },
            url: api_url + "/lookupvalues/lookupvalueid?lkdmcode=APROVE&code=REJECT",
        }).then(function successCallback(response) {
            if (response.status = 200) {
                $scope.rejectcode = response.data.lkvalid;
            }
        }, function errorCallback(response) {
            Materialize.toast('Something has gone wrong!', 3000, 'red');
        });

        $http({
            method: 'GET', 
            headers : {
                "Authorization" : atoken
            },
            url: api_url + "/member/RegionDetails",
        }).then(function successCallback(response) {
            if (response.status = 200) {
                $scope.regionDetails = response.data.resultdata[0];
                console.log('$scope.regionDetails', $scope.regionDetails);
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
                console.log('$scope.TalukDetails', $scope.TalukDetails);
            }
        }, function errorCallback(response) {
            Materialize.toast('Something has gone wrong!', 3000, 'red');
        });

        $scope.approvestatus = function(clientid, lkvalid, status) {
            $http({
                method: 'GET', 
                headers : {
                    "Authorization" : atoken
                },
                url: api_url + "/client/approval?clientid=" + clientid + "&approvalid=" + lkvalid,
            }).success(function(response, result) {
                if (response.status = 200) {
                    if (status == 0) {
                        Materialize.toast('Approval Rejected', 3000, 'red');
                    } else {
                        Materialize.toast('Approval Success', 3000, 'green');
                    }
                    $scope.pendingmember();
                } else {
                    Materialize.toast('error', 3000, 'red');
                }
            }).error(function(error) {
                $('#failure').html(error);
            });
        }; 

        $scope.rejectedclientscounts = 0;
        $scope.ampendingclientscounts = 0;
        $scope.totalclientscounts = 0;
        $scope.ampendingclients = []; 
        $scope.rejectedclients = [];
        $scope.totalactiveclients = []; 

        if (regionid == 0) {
            $http({
                method: 'GET', 
                headers : {
                    "Authorization" : atoken
                },
                url: api_url + "/client?regionid=" + $scope.ciphertext,
            }).then(function successCallback(response) {
                if (response.status = 200) {
                    $scope.clients = response.data;
                    $scope.totalclients = response.data.length;
                    $scope.searchresult = $scope.clients;
                    $scope.totalactiveclients = $scope.clients;
                    var filteredclosed = _.filter($scope.clients, function (item) {
						return item.amstatus == 1
                    }); 
                    $scope.ampendingclients  = filteredclosed;
                    $scope.ampendingclientscounts = filteredclosed.length;
                    if ($scope.clients.length > 0) {
                        $scope.select($scope.clients[0]);
                    }
                }
            }, function errorCallback(response) {
                Materialize.toast('Something has gone wrong!', 3000, 'red');
            });
        } 
        else if (regionid > 0 && roleid == 2) {
            debugger
            $http({
                method: 'GET', 
                headers : {
                    "Authorization" : atoken
                },
                url: api_url + "/amsclient?regionid=" + regionid,
            }).then(function successCallback(response) {
                if (response.status = 200) {
                    $scope.clients = response.data;
                    $scope.select($scope.clients[0]);
                    console.log('$scope.clients 0',$scope.clients );
                    // if ($scope.clients.length > 0) {
                    //     var filteredregion = _.filter($scope.clients, function(item) {
                    //         return item.regionid == regionid
                    //     });

                    //     
                    // }
                    //$scope.clients = filteredregion;
                    $scope.totalclients = $scope.clients.length;
                    $scope.searchresult = $scope.clients; 
                    var filteredclosed = _.filter($scope.clients, function (item) {
						return item.amstatus == 1
                    }); 
                    $scope.ampendingclients  = filteredclosed;
                    $scope.ampendingclientscounts = filteredclosed.length; 

                    var filteredclosedd = _.filter($scope.clients, function (item) {
						return item.amstatus == 2
                    }); 

                    $scope.rejectedclients  = filteredclosedd;
                    $scope.rejectedclientscounts = filteredclosedd.length; 
            
                }
            }, function errorCallback(response) {
                Materialize.toast('Something has gone wrong!', 3000, 'red');
            });
        }
        else  {
            $http({
                method: 'GET', 
                headers : {
                    "Authorization" : atoken
                },
                url: api_url + "/client?regionid=" + regionid,
            }).then(function successCallback(response) {
                if (response.status = 200) {

                    $scope.clients = response.data;
                    $scope.totalactiveclients = response.data;

                   // console.log('sdgdsg',)
                    $scope.totalclients = response.data.length;
                    $scope.searchresult = $scope.clients;
                    // console.log('$scope.clients',$scope.clients);
                    if ($scope.clients.length > 0) {
                        $scope.select($scope.clients[0]);
                    } 
                    var filteredclosed = _.filter($scope.clients, function (item) {
						return item.amstatus == 1
                    }); 
                    $scope.ampendingclients  = filteredclosed;
                    $scope.ampendingclientscounts = filteredclosed.length;
                }
            }, function errorCallback(response) {
                Materialize.toast('Something has gone wrong!', 3000, 'red');
            });
        }
        
        $scope.getrunningclients = function () { 
            $scope.searchresult = $scope.clients;
            $scope.totalactiveclients = $scope.clients;
            $scope.totalclients =  $scope.totalactiveclients.length;
            if ($scope.totalactiveclients.length > 0) {
                $scope.select($scope.totalactiveclients[0]);
            } else { 
                $scope.selected.clientid = '';
                $scope.selected.organization = '';
                $scope.selected.contactname = '';
                $scope.selected.mobile = '';
                $scope.selected.email = '';
                $scope.selected.addressline1 = '';
                $scope.selected.addressline2 = '';
                $scope.selected.addressline3 = '';
                $scope.selected.pincode = '';
                $scope.selected.image = '';
                $scope.selected.regionid = '';
                $scope.selected.stateid = '';
                $scope.selected.countryid = '';
                $scope.selected.departmenttypeid = '';
                $scope.selected.department = '';
                $scope.selected.password = '';
                $scope.selected.phone = '';
                $scope.selected.gstno = '';
                $scope.selected.panno = '';
                $scope.selected.tanno = '';
                $scope.selected.gsttanno = '';
                $scope.selected.deptid = '';
                $scope.selected.image = '';
                $scope.selected.apprstatusid = '';
            }
        }
    
        $scope.getupdatedamclients = function() {
           debugger
            var filteredclosed = _.filter($scope.clients, function (item) {
                return item.amstatus == 1
            }); 
            $scope.ampendingclients  = filteredclosed;
            $scope.ampendingclientscounts = filteredclosed.length;
            if ($scope.ampendingclients.length > 0) {
                $scope.select($scope.ampendingclients[0]);
            } else { 
                $scope.selected.clientid = '';
                $scope.selected.organization = '';
                $scope.selected.contactname = '';
                $scope.selected.mobile = '';
                $scope.selected.email = '';
                $scope.selected.addressline1 = '';
                $scope.selected.addressline2 = '';
                $scope.selected.addressline3 = '';
                $scope.selected.pincode = '';
                $scope.selected.image = '';
                $scope.selected.regionid = '';
                $scope.selected.stateid = '';
                $scope.selected.countryid = '';
                $scope.selected.departmenttypeid = '';
                $scope.selected.department = '';
                $scope.selected.password = '';
                $scope.selected.phone = '';
                $scope.selected.gstno = '';
                $scope.selected.panno = '';
                $scope.selected.tanno = '';
                $scope.selected.gsttanno = '';
                $scope.selected.deptid = '';
                $scope.selected.image = '';
                $scope.selected.apprstatusid = '';
            }
        }  

        $scope.select = function(client) {
            $scope.selected = client;
            $scope.getDistrictDetailsEdit(client.regionid, client.districtid, client.talukid);
            $scope.objclient.clientid = client.clientid;
            $scope.objclient.organization = client.organization;
            $scope.objclient.contactname = client.contactname;
            $scope.objclient.mobile = client.mobile;
            $scope.objclient.email = client.email;
            $scope.objclient.addressline1 = client.addressline1;
            $scope.objclient.addressline2 = client.addressline2;
            $scope.objclient.addressline3 = client.addressline3;
            $scope.objclient.pincode = client.pincode;
            $scope.objclient.image = client.image;
            $scope.objclient.regionid = client.regionid;
            // $scope.objclient.districtid = client.districtid;
            // $scope.objclient.talukid = client.talukid;
            $scope.objclient.stateid = client.stateid;
            $scope.objclient.countryid = client.countryid;
            $scope.objclient.departmenttypeid = client.departmenttypeid;
            $scope.objclient.department = client.department;
            $scope.objclient.password = client.password;
            $scope.objclient.phone = client.phone;
            $scope.objclient.gstno = client.gstno;
            $scope.objclient.panno = client.panno;
            $scope.objclient.tanno = client.tanno;
            $scope.objclient.gsttanno = client.gsttanno;
            $scope.objclient.deptid = client.deptid;
            $scope.objclient.image = client.image;
            $scope.objclient.apprstatusid = client.approvalid;
        };

        $scope.getDistrictDetails = function (regionid) {
            debugger
            $scope.Taluks = [];
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
            $scope.objclient.districtid = districtid;
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
            $scope.objclient.talukid = talukid;
        }

        //Get Department Type
        $scope.departmenttype = [];
        $http({
            method: 'GET', 
            headers : {
                "Authorization" : atoken
            },
            url: api_url + "/lookupvalues?lkdmcode=DEPTTYPE",
        }).then(function successCallback(response) {
            if (response.status = 200) {
                $scope.departmenttype = response.data.lookupvalues;
                if ($scope.departmenttype.length > 0) {
                    $scope.objclient.departmenttypeid = $scope.departmenttype[0];
                }
            }
        }, function errorCallback(response) {
            Materialize.toast('Something has gone wrong!', 3000, 'red');
        });

        // Get Cities
        $scope.taluk = [];
        $http({
            method: 'GET', 
            headers : {
                "Authorization" : atoken
            },
            url: api_url + "/lookupvalues?lkdmcode=TALUK",
        }).then(function successCallback(response) {
            if (response.status = 200) {
                $scope.taluk = response.data.lookupvalues;
                if ($scope.taluk.length > 0) {
                    $scope.objclient.talukid = $scope.taluk[0];
                }
            }
        }, function errorCallback(response) {
            Materialize.toast('Something has gone wrong!', 3000, 'red');
        });

        // Get States
        $scope.state = [];
        $http({
            method: 'GET', 
            headers : {
                "Authorization" : atoken
            },
            url: api_url + "/lookupvalues?lkdmcode=STATE",
        }).then(function successCallback(response) {
            if (response.status = 200) {
                $scope.state = response.data.lookupvalues;
                if ($scope.state.length > 0) {
                    $scope.objclient.stateid = $scope.state[0].lkvalid;
                }
            }
        }, function errorCallback(response) {
            Materialize.toast('Something has gone wrong!', 3000, 'red');
        });

        // Get Country
        $scope.country = [];
        $http({
            method: 'GET', 
            headers : {
                "Authorization" : atoken
            },
            url: api_url + "/lookupvalues?lkdmcode=CNTRY",
        }).then(function successCallback(response) {
            if (response.status = 200) {
                $scope.country = response.data.lookupvalues;
                if ($scope.country.length > 0) {
                    $scope.objclient.countryid = $scope.country[0].lkvalid;
                }
            }
        }, function errorCallback(response) {
            Materialize.toast('Something has gone wrong!', 3000, 'red');
        });

        // Get district
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
                if ($scope.district.length > 0) {
                    $scope.objclient.districtid = $scope.district[0];
                }
            }
        }, function errorCallback(response) {
            Materialize.toast('Something has gone wrong!', 3000, 'red');
        });

        //approval id
        $http({
            method: 'GET', 
            headers : {
                "Authorization" : atoken
            },
            url: api_url + "/lookupvalues/lookupvalueid?lkdmcode=APROVE&code=CONFIRM",
        }).then(function successCallback(response) {

            if (response.status = 200) {
                $scope.approvalid = response.data.lkvalid;
            }
        }, function errorCallback(response) {

        });

        //allapproval id
        $scope.apprstatus = [];
        $http({
            method: 'GET', 
            headers : {
                "Authorization" : atoken
            },
            url: api_url + "/lookupvalues?lkdmcode=APROVE",
        }).then(function successCallback(response) {
            if (response.status = 200) {
                $scope.apprstatus = response.data.lookupvalues;
                if ($scope.apprstatus.length > 0) {
                    $scope.dselected = $scope.apprstatus[0];
                }
            }
        }, function errorCallback(response) {
            Materialize.toast('Something has gone wrong!', 3000, 'red');
        });

        // Get departments
        $scope.dept = [];
        $http({
            method: 'GET', 
            headers : {
                "Authorization" : atoken
            },
            url: api_url + "/lookupvalues?lkdmcode=DEPT",
        }).then(function successCallback(response) {
            if (response.status = 200) {
                $scope.dept = response.data.lookupvalues;
                if ($scope.dept.length > 0) {
                    $scope.dselected = $scope.dept[0];
                }
            }
        }, function errorCallback(response) {
            Materialize.toast('Something has gone wrong!', 3000, 'red');
        });

        $scope.addclient = function() {
            var tempobj = $scope.objclient;
            $scope.objclient = {};
            $scope.picFile = "";
            $('#clientimage').removeProp('src');
            $('#failure').html("");
            $scope.submitted = false;
            $('#mcaption').text("Add Employer");
            $("label").removeClass("active");
            $('#modal1').modal('open');
            $scope.functions = 'add';
            $scope.objclient.countryid = tempobj.countryid;
            $scope.objclient.stateid = tempobj.stateid;
        }

        $scope.editclient = function() {
            $scope.select($scope.selected);
            $scope.picFile = "";
            $('#clientimage').removeProp('src');
            $('#failure').html("");
            $scope.submitted = false;
            $scope.clname=$('.title-client').html();
            $('#mcaption').text("Edit  "+$scope.clname);
            
            $("label").addClass("active");
            $('#modal1').modal('open');
            $scope.functions = 'edit';
        }

        $scope.searchClient = function (filter)  {
            debugger
            if(filter) {
                var clientsearch = _.filter($scope.searchresult, function (item) {
                    return item.projectno.toLowerCase() == filter.toLowerCase();
                   // return item.organization.toLowerCase().contains(filter.toLowerCase());
                });
                $scope.clients = clientsearch;
            } else {
                $scope.clients = $scope.searchresult;
            }
        }

        $scope.changeName = function(filename) {
            $scope.objclient.image = filename.replace(" ", "_");
        }
        // SAVE CLIENT
        $scope.saveclient = function(data, file) {
            debugger
            // console.log('data',data);
            $scope.buttondisable = true;
            if (file != undefined && file != "") {
                file.upload = Upload.upload({
                    url: base_url + "admin/client_image_upload/",
                    data: {
                        file: file
                    },
                });
                file.upload.then(function(response) {
                    $timeout(function() {
                        $scope.objclient.image = file.$ngfName;

                    });
                }, function(response) {
                    $scope.imagename = response.data;
                    if (response.status > 0)
                        $scope.errorMsg = response.status + ': ' + response.data;
                }, function(evt) {
                    // Math.min is to fix IE which reports 200% sometimes
                    file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));

                });
            } else if (data.image != "" && data.image != undefined) {
                data.image = data.image
            } else {
                data.image = 'defaultlogo.jpg'
            }
            
            if($scope.functions == 'approve') {
                var aprid = data.apprstatusid;
            }
            if ($scope.functions == 'add') {
                var aprid = $scope.approvalid;
            } else if ($scope.functions == 'edit') {
                var aprid = data.apprstatusid;
            }

           // console.log('aprid',aprid);
            var method;
            if (data.clientid > 0) {
                method = 'PUT';
            } else {
                method = 'POST';
            }
            if (method == 'POST' && data.password != data.con_password) {
                $('#failure').html('Password and Confirm Password are not same');
            } else {
                $http({
                    url: api_url + "/client",
                    data: $.param({
                        clientid: data.clientid,
                        organization: data.organization,
                        contactname: data.contactname,
                        image: data.image,
                        email: data.email,
                        mobile: data.mobile,
                        addressline1: data.addressline1,
                        addressline2: data.addressline2,
                        addressline3: data.addressline3,
                        pincode: data.pincode,
                        regionid: data.regionid,
                        districtid: data.districtid,
                        talukid: data.talukid,
                        stateid: data.stateid,
                        countryid: data.countryid,
                        departmenttypeid: data.departmenttypeid,
                        department: data.department,
                        password: data.password,
                        phone: data.phone,
                        gstno: data.gstno,
                        tanno: data.tanno,
                        gsttanno: data.gsttanno,
                        panno: data.panno,
                        approvalid: aprid,
                        deptid: data.deptid,
                        active: data.active,
                        changedby: data.changedby,
                        roleid: roleid,
                        amstatus: data.amstatus
                    }),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded', 
                        "Authorization" : atoken
                    },
                    method: method,
                }).success(function(response, result) {
                    if (result == 200) {
                        $('#clientimage').removeProp('src');
                        $scope.picFile = "";
                        if(roleid == 2) { 
                            setTimeout(function () {
                                window.location.reload(true);
                            }, 500);
                            var serviceurl = api_url + "/amsclient/" + response.clientid;
                        } else {
                            var serviceurl = api_url + "/client/" + response.clientid;
                        }
                        console.log('serviceurl',serviceurl);
                        $http({
                            method: 'GET', 
                            headers : {
                                "Authorization" : atoken
                            },
                            url: serviceurl,
                        }).then(function successCallback(response) {
                            if (response.status = 200) {
                                Materialize.toast('Client saved Successfully !', 3000, 'green');
                                if (response.data.length > 0) {
                                    for (var loop = 0; loop < $scope.clients.length; loop++) {
                                        if ($scope.clients[loop].clientid == response.data[0].clientid) {
                                            $scope.clients[loop] = response.data[0];
                                            debugger
                                            $scope.select($scope.clients[loop]);
                                            break;
                                        }
                                    }
                                } else {
                                    setTimeout(function () {
                                        window.location.reload(true);
                                    }, 500);
                                }
                                $scope.buttondisable = false;
                            }
                        }, function errorCallback(response) {
                            Materialize.toast('Something has gone wrong!', 3000, 'red');
                            $scope.buttondisable = false;
                        });
                    }
                    $(".modal").modal("close");
                }).error(function(error) {
                    $('#failure').html(error);
                    $scope.buttondisable = false;
                });
            }
        };

        $scope.saveapproveclient = function(data, file) {
            debugger
            // console.log('data',data);
            $scope.buttondisable = true;
            if (file != undefined && file != "") {
                file.upload = Upload.upload({
                    url: base_url + "admin/client_image_upload/",
                    data: {
                        file: file
                    },
                });
                file.upload.then(function(response) {
                    $timeout(function() {
                        $scope.objclient.image = file.$ngfName;

                    });
                }, function(response) {
                    $scope.imagename = response.data;
                    if (response.status > 0)
                        $scope.errorMsg = response.status + ': ' + response.data;
                }, function(evt) {
                    // Math.min is to fix IE which reports 200% sometimes
                    file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));

                });
            } else if (data.image != "" && data.image != undefined) {
                data.image = data.image
            } else {
                data.image = 'defaultlogo.jpg'
            }
            
            if($scope.functions == 'approve') {
                var aprid = data.apprstatusid;
            }
            if ($scope.functions == 'add') {
                var aprid = $scope.approvalid;
            } else if ($scope.functions == 'edit') {
                var aprid = data.apprstatusid;
            }

           // console.log('aprid',aprid);
            var method;
            if (data.clientid > 0) {
                method = 'PUT';
            } else {
                method = 'POST';
            }
            if (method == 'POST' && data.password != data.con_password) {
                $('#failure').html('Password and Confirm Password are not same');
            } else {
                $http({
                    url: api_url + "/client",
                    data: $.param({
                        clientid: data.clientid,
                        organization: data.organization,
                        contactname: data.contactname,
                        image: data.image,
                        email: data.email,
                        mobile: data.mobile,
                        addressline1: data.addressline1,
                        addressline2: data.addressline2,
                        addressline3: data.addressline3,
                        pincode: data.pincode,
                        regionid: data.regionid,
                        districtid: data.districtid,
                        talukid: data.talukid,
                        stateid: data.stateid,
                        countryid: data.countryid,
                        departmenttypeid: data.departmenttypeid,
                        department: data.department,
                        password: data.password,
                        phone: data.phone,
                        gstno: data.gstno,
                        tanno: data.tanno,
                        gsttanno: data.gsttanno,
                        panno: data.panno,
                        approvalid: aprid,
                        deptid: data.deptid,
                        active: data.active,
                        changedby: data.changedby,
                        roleid: roleid,
                        amstatus: data.amstatus
                    }),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded', 
                        "Authorization" : atoken
                    },
                    method: method,
                }).success(function(response, result) {
                    if (result == 200) {
                        Materialize.toast('Client Approved Successfully !', 3000, 'green');
                        setTimeout(function () {
                            window.location.reload(true);
                        }, 1500);
                    }
                    $(".modal").modal("close");
                }).error(function(error) {
                    $('#failure').html(error);
                    $scope.buttondisable = false;
                });
            }
        }; 

        $scope.ApproveClient = function (selected) {
            debugger
           // $('#modal1').modal('open');
            $scope.submitted = false;
            var clientid = selected.clientid;
            $http({
                method: 'GET', 
                headers : {
                    "Authorization" : atoken
                },
                url: api_url + "/job/amsclient?clientid=" + clientid,
            }).then(function successCallback(response) {
                debugger
                if (response.status = 200) {
                    //$scope.clients = response.data;
                    // console.log('response.data[0]',response.data);
                    $scope.updatedfields =  response.data.updatedfields;
                    if (response.data.updatedfields) {
                        dataObj = JSON.parse($scope.updatedfields);
                        $scope.orgcheck = dataObj.lastIndexOf("organization");
                        $scope.contactnocheck = dataObj.lastIndexOf("contactname");
                        $scope.mobilenocheck = dataObj.lastIndexOf("mobile");
                        $scope.emailcheck = dataObj.lastIndexOf("email");
                        $scope.phonecheck = dataObj.lastIndexOf("phone");
                        $scope.regioncheck = dataObj.lastIndexOf("regionid");
                        $scope.districtcheck = dataObj.lastIndexOf("districtid");
                        $scope.talukcheck = dataObj.lastIndexOf("talukid");
                        $scope.addressline1check = dataObj.lastIndexOf("addressline1");
                        $scope.addressline2check = dataObj.lastIndexOf("addressline2");
                        $scope.addressline3check = dataObj.lastIndexOf("addressline3");
                        $scope.pincodecheck = dataObj.lastIndexOf("pincode");
                        $scope.statecheck = dataObj.lastIndexOf("stateid");
                        $scope.countrycheck  = dataObj.lastIndexOf("countryid");
                        $scope.gstnocheck  = dataObj.lastIndexOf("gstno");
                        $scope.pannocheck  = dataObj.lastIndexOf("panno");
                        $scope.gsttannocheck  = dataObj.lastIndexOf("gsttanno");
                        $scope.tannocheck  = dataObj.lastIndexOf("tanno");
                        $scope.empdeptcheck = dataObj.lastIndexOf("deptid");
                        $scope.depttypecheck = dataObj.lastIndexOf("departmenttypeid");
                        $scope.deptcheck = dataObj.lastIndexOf("department");
                        $scope.approvalcheck = dataObj.lastIndexOf("approvalid");
                        $scope.imagecheck  = dataObj.lastIndexOf("image");
                    }
                    $scope.select(response.data);
                    $scope.functions = 'approve';
                    $('#mcaptions').text("Approve Client");
                    $("label").addClass("active");
                    $('#modal2').modal('open');
                }
            }, function errorCallback(response) {
                Materialize.toast('Something has gone wrong!', 3000, 'red');
            });
        };

        $scope.RejectClient = function (clientid) {
            if (confirm("Are you sure Revert the AM Changes?")) {
                $http({
                    method: 'GET', 
                    headers : {
                        "Authorization" : atoken
                    },
                    url: api_url + "/ClientAMRejectOptions?clientid=" + clientid,
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
    
        // Delete Client
        $scope.removeclient = function() {
            if (confirm("Are you sure to delete this detail?")) {
                $http({
                    url: api_url + "/client",
                    data: $.param({
                        clientid: $scope.objclient.clientid
                    }),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        "Authorization" : atoken
                    },
                    method: 'DELETE',
                }).success(function(response, result) {
                    if (result = 200) {
                        for (var loop = 0; loop < $scope.clients.length; loop++) {
                            if ($scope.clients[loop].clientid == $scope.objclient.clientid) {
                                $scope.clients.splice(loop, 1);
                                $scope.select($scope.clients[loop]);
                                break;
                            }
                        }
                    }
                }).error(function(error) {
                    $scope.error = error;
                });
            };
        }

        // changepassword Client
        $scope.changepassword = function(data) {
            if (data.newpassword == data.repassword) {
                if (confirm("Are you sure to Change Password?")) {
                    $http({
                        url: api_url + "/client/changepassword",
                        data: $.param({
                            clientid: clientid,
                            password: data.password,
                            newpassword: data.newpassword
                        }),
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded', 
                            "Authorization" : atoken
                        },
                        method: 'POST',
                    }).success(function(response, result) {
                        if (result = 200) {
                            window.location.href = base_url + "client/dashboard";
                        }
                    }).error(function(error) {
                        $('#failure').html(error);
                    });
                }
            } else {
                $('#failure').html('New Password and Re Password are not same');
            }
        };

        $scope.resultclients = [];
        $scope.Search = function(field, searchvalue) {
            $scope.clients = $scope.searchresult;
            $scope.resultclients = [];
            angular.forEach($scope.clients, function(client) {
                if (client[field].includes(searchvalue)) {
                    $scope.resultclients.push(client);
                    $scope.clients = [];
                    $scope.clients = $scope.resultclients;
                }
                return;
            });
            if ((!field && !searchvalue) || ($scope.resultclients.length == 0)) {
                $scope.clients = [];
            }
            return;
        };

        $scope.downloadclient = function (objattendance) {
            if (objattendance.fromdate == undefined) {
                objattendance.fromdate = 0;
            }  
            if (objattendance.todate == undefined) {
                objattendance.todate = 0;
            } 
            debugger
            var urls =  '';
            if (regionid == 0) {  
                urls =  api_url + "/client/export?regionid=NULL&fromdate="+objattendance.fromdate+"&todate="+objattendance.todate;
            } else if (regionid > 0 && roleid == 2) {
                urls =  api_url + "/client/export?regionid="+regionid+"&fromdate="+objattendance.fromdate+"&todate="+objattendance.todate;
            } else {  
                urls =  api_url + "/client/export?regionid="+regionid+"&fromdate="+objattendance.fromdate+"&todate="+objattendance.todate;
            }
            $http({
                method: 'GET', 
                headers : {
                    "Authorization" : atoken
                },
                url: urls,
            }).then(function successCallback(response) {
                if (response.status = 200) {
                    $scope.downloadclients = response.data; 
                    JSONToCSVConvertor($scope.downloadclients, 'Client_Report', true)
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

    });