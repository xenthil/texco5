var app = angular.module('appAgreement', ['isteven-multi-select']).constant('_', window._);
app.constant("moment", moment);
app.controller('ctrlAgreement', function($scope, $http) {

    var scope = $scope;
    $scope.searchresult1 = [];
    $scope.searchresult2 = [];
    $scope.searchresult3 = [];
    $scope.agreements = [];
    $scope.selected = {};
    $scope.selectedd = {};
    $scope.objagreement = {};
    $scope.objagreements = {};
    $scope.filter = "";
    $scope.objjobs = [];
    $scope.agreementtype = [];
    $scope.objagreement.clientid = 0;
    $scope.selectedObjects = [];
    $scope.objagreement.agreementtypeid = 'SINGLE';
    $scope.wagecategories = [];
    $scope.wagecategory = [];

    $scope.employeecheck = -1;
    $scope.agreementtypecheck = -1;
    $scope.servicechargecheck = -1;
    $scope.taxcheck = -1;
    $scope.fromdatecheck = -1;
    $scope.todatecheck = -1;
    $scope.wagetypecheck = -1;
    $scope.agreementstatuscheck = -1;
    $scope.rateyearcheck = -1;
    $scope.wagecategorycheck = -1;
    $scope.agtypecheck = -1;
    $scope.wageareacheck = -1;
    $scope.updatejobs = "";

    $scope.currentdate = moment().format('YYYY-MM-DD');
	$scope.lastdate = moment().subtract(7, 'days').format('YYYY-MM-DD');

	$scope.objattendance = {'fromdate':$scope.lastdate,'todate':$scope.currentdate};

    $scope.regionid = regionid;
    $scope.roleid = roleid;
    $scope.searchvalues = [
        {
            text: 'Project No',
            field: 'projectno'
        },
        {
            text: 'All',
            field: ""
        }
    ];

    // Get Wage Rate
    $http({
        method: 'GET',
        headers: {
            'Authorization' : atoken
        }, 
        url: api_url + "/lookupvalues?lkdmcode=WGYEAR",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.wagerate = response.data.lookupvalues;
            if ($scope.wagerate.length > 0) {
                $scope.wrselected = $scope.wagerate[0];
            }
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });

     // Get Wage Category
     $http({
        method: 'GET',
        headers: {
            'Authorization' : atoken
        }, 
        url: api_url + "/lookupvalues/Category",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.wagecategory = response.data;
            $scope.wagecategories = response.data;
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });

    // Get Wage Area
    $http({
        method: 'GET',
        headers: {
            'Authorization' : atoken
        }, 
        url: api_url + "/lookupvalues?lkdmcode=WGAREA",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.wagearea = response.data.lookupvalues;
            if ($scope.wagearea.length > 0) {
                $scope.waselected = $scope.wagearea[0];
            }
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });

    // Get Agreement Type
    $http({
        method: 'GET',
        headers: {
            'Authorization' : atoken
        }, 
        url: api_url + "/lookupvalues?lkdmcode=AGREE",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.agreementtype = response.data.lookupvalues;
            if ($scope.agreementtype.length > 0) {
                $scope.atselected = $scope.agreementtype[0];
            }
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });

    $http({
        method: 'GET',
        headers: {
            'Authorization' : atoken
        }, 
        url: api_url + "/lookupvalues?lkdmcode=TAX",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.taxtype = response.data.lookupvalues;
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });

    $scope.settings = [];
    //Get settings
    $http({
        method: 'GET',
        headers: {
            'Authorization' : atoken
        }, 
        url: api_url + "/setting",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.settings = response.data;
            $scope.tax = $scope.settings[2].value;
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });

    //Type of Agreement
    $http({
        method: 'GET',
        headers: {
            'Authorization' : atoken
        }, 
        url: api_url + "/lookupvalues?lkdmcode=AGTYPE",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.typeofagreement = response.data.lookupvalues;
            if ($scope.typeofagreement.length > 0) {
                $scope.atselected = $scope.typeofagreement[0];
            }
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });

    //get other Agreement
    $http({
        method: 'GET',
        headers: {
            'Authorization' : atoken
        }, 
        url: api_url + "/lookupvalues/lookupvalueid?lkdmcode=AGTYPE&code=OTH",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.typeofagreementoth = response.data;
            if ($scope.typeofagreementoth.length > 0) {
                $scope.atselected = $scope.typeofagreementoth[0];
            }
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });

    // Get Agreement Status
    $http({
        method: 'GET',
        headers: {
            'Authorization' : atoken
        }, 
        url: api_url + "/lookupvalues?lkdmcode=AGSTS",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.agreementstatus = response.data.lookupvalues;
            if ($scope.agreementstatus.length > 0) {
                $scope.atselected = $scope.agreementstatus[0];
            }
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });


    // Get dgr wages
    $http({
        method: 'GET',
        headers: {
            'Authorization' : atoken
        }, 
        url: api_url + "/wages/dgr",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.dgrwage = response.data;

        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });

    // Get tn wages
    $http({
        method: 'GET',
        headers: {
            'Authorization' : atoken
        }, 
        url: api_url + "/wages/tn",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.tnwage = response.data;
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });

    //get dgr code
    $http({
        method: 'GET',
        headers: {
            'Authorization' : atoken
        }, 
        url: api_url + "/lookupvalues/lookupvalueid?lkdmcode=WGTYPE&code=DGR",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.dgrcode = response.data.lkvalid;
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });

    //get tn code
    $http({
        method: 'GET',
        headers: {
            'Authorization' : atoken
        }, 
        url: api_url + "/lookupvalues/lookupvalueid?lkdmcode=WGTYPE&code=TN",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.tncode = response.data.lkvalid;
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });

    //get agreement code
    $http({
        method: 'GET',
        headers: {
            'Authorization' : atoken
        }, 
        url: api_url + "/lookupvalues/lookupvalueid?lkdmcode=AGREE&code=1",
    }).then(function successCallback(response) {
        //debugger
        if (response.status = 200) {
            $scope.single = response.data.lkvalid;
            $scope.singletype = response.data.lkvalue;
            $scope.agreementtypeval = response.data.lkvalue;
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });

    //get agreement code
    $http({
        method: 'GET',
        headers: {
            'Authorization' : atoken
        }, 
        url: api_url + "/lookupvalues/lookupvalueid?lkdmcode=AGREE&code=2",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            //debugger
            $scope.combined = response.data.lkvalid;
            $scope.combinedtype = response.data.lkvalue;
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });

    //get part basic
    $http({
        method: 'GET',
        headers: {
            'Authorization' : atoken
        }, 
        url: api_url + "/lookupvalues/lookupvalueid?lkdmcode=WGPART&code=BASIC",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.partbasic = response.data.lkvalid;
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });

    //get tn code
    $http({
        method: 'GET',
        headers: {
            'Authorization' : atoken
        }, 
        url: api_url + "/lookupvalues/lookupvalueid?lkdmcode=AGREE&code=2",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.combined = response.data.lkvalid;
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });

    $scope.clientslists = [];
	$http({
		method: 'GET',
        headers: {
            'Authorization' : atoken
        }, 
		url: api_url + "/clientDropDown",
	}).then(function successCallback(response) {
        //debugger
		if (response.status = 200) {
			$scope.clientslists = response.data;
			console.log('$scope.clientslists', $scope.clientslists);
		}
	}, function errorCallback(response) {
		Materialize.toast('Something has gone wrong!', 3000, 'red');
	});

    
    // Get wagetype
    $http({
        method: 'GET',
        headers: {
            'Authorization' : atoken
        }, 
        url: api_url + "/lookupvalues?lkdmcode=WGTYPE",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.wagetype = response.data.lookupvalues;
            if ($scope.wagetype.length > 0) {
                $scope.atselected = $scope.wagetype[0];
            }
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });

    // Get agreements
    if($scope.regionid == 0) {
        $http({
            method: 'GET',
            headers: {
                'Authorization' : atoken
            }, 
            url: api_url + "/agreement?regionid="+regionid,
        }).then(function successCallback(response) {
             console.log('agreement',response);
            if (response.status = 200) {
                $scope.agreements = response.data;
                if ($scope.agreements.length > 0) {
    
                    var filteredrenewal = _.filter($scope.agreements, function(item) {
                        return item.agreementstatus == 'RENEWAL'
                    });
                    $scope.renewalcount = filteredrenewal.length;
                    var filteredsigned = _.filter($scope.agreements, function(item) {
                        return item.agreementstatus == 'DRAFT AGREEMENT FORWARDED'
                    }); 
                    $scope.signedcount = filteredsigned.length; 

                    var filteredpending = _.filter($scope.agreements, function(item) {
                        return item.amstatus == 1
                    });
                    $scope.pendingcount = filteredpending.length;

                    $scope.getexcecuted();
                }
            }
        }, function errorCallback(response) {
            Materialize.toast('Something has gone wrong!', 3000, 'red');
        });
    } 
    else if($scope.regionid > 0  &&  $scope.roleid == 2) {
        // alert('roleid',roleid);
        $http({
            method: 'GET',
            headers: {
                'Authorization' : atoken
            }, 
            url: api_url + "/job/amsagreement?regionid="+$scope.regionid+"&agreementid=0",
        }).then(function successCallback(response) {
            if (response.status = 200) {
                $scope.agreements = response.data;
                if ($scope.agreements.length > 0) {

                    var filteredrenewal = _.filter($scope.agreements, function(item) {
                        return item.agreementstatus == 'RENEWAL'
                    });
                    $scope.renewalcount = filteredrenewal.length;

                    var filteredsigned = _.filter($scope.agreements, function(item) {
                        return item.agreementstatus == 'DRAFT AGREEMENT FORWARDED'
                    });
                    $scope.signedcount = filteredsigned.length; 

                    var filteredpending = _.filter($scope.agreements, function(item) {
                        return item.amstatus == 1
                    });
                    $scope.pendingcount = filteredpending.length;
                    $scope.getexcecuted();
                    $scope.getrejected();
                }
            }
        }, function errorCallback(response) {
            Materialize.toast('Something has gone wrong!', 3000, 'red');
        });
    } else {
        $http({
            method: 'GET',
            headers: {
                'Authorization' : atoken
            }, 
            url: api_url + "/agreement?regionid="+regionid,
        }).then(function successCallback(response) {
            // console.log('response',response);
            // alert('roleid..final',roleid);
            if (response.status = 200) {
                $scope.agreements = response.data;
                if ($scope.agreements.length > 0) {
                    var filteredrenewal = _.filter($scope.agreements, function(item) {
                        return item.agreementstatus == 'RENEWAL'
                    });
                    $scope.renewalcount = filteredrenewal.length;
                    var filteredsigned = _.filter($scope.agreements, function(item) {
                        return item.agreementstatus == 'DRAFT AGREEMENT FORWARDED'
                    });
                    $scope.signedcount = filteredsigned.length; 

                    var filteredpending = _.filter($scope.agreements, function(item) {
                        return item.amstatus == 1
                    });
                    $scope.pendingcount = filteredpending.length;
                    
                    $scope.getexcecuted();
                }
            }
        }, function errorCallback(response) {
            Materialize.toast('Something has gone wrong!', 3000, 'red');
        });
    }

    $scope.getchangecategory = function(wageyearid,wagetype) { 
        //debugger
        $scope.wagecategories = [];
        var filteredpending = _.filter( $scope.wagecategory, function(item) {
            return item.wageyearid == wageyearid && item.wagetypeid == wagetype;
        });  
        $scope.wagecategories = filteredpending;
    }

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
            //debugger
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
        url: api_url + "/client/project?regionid=0",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.allprojects = response.data;
            var filteredrunning = _.filter($scope.allprojects, function(item) {
                return item.projectstatus == 'RUNNING'
            });
            //debugger
            $scope.projects = filteredrunning;
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });

    // Get JobMasters
    $scope.jobmasters = [];
    $http({
        method: 'GET',
        headers: {
            'Authorization' : atoken
        }, 
        url: api_url + "/job/jobmaster",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.jobmasters = response.data;
        }
    }, function errorCallback(response) {

    });

    // Get Projects
    $scope.projectnos = [];
    $http({
        method: 'GET',
        headers: {
            'Authorization' : atoken
        }, 
        url: api_url + "/prjectnos",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.projectnos = response.data;
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });

    $scope.agreementtypeval = '';
    $scope.getagtype = function(agreementtypeid) {
        //debugger
        $scope.selectedObjects = [];  
        if(agreementtypeid == $scope.single) 
            $scope.agreementtypeval = $scope.singletype;
            $scope.objagreement.clientid = 0;
            $scope.objagreement.projectid = 0;
            $scope.objagreement.organization = '';
        if(agreementtypeid == $scope.combined)  {
            $scope.agreementtypeval = $scope.combinedtype;
            $scope.objagreement.clientid = 0;
            $scope.objagreement.projectid = 0;
            $scope.objagreement.organization = '';
        }
    }

    $scope.getagtypes = function() {
        $scope.selectedObjects = [];
        angular.forEach($scope.selectedprojects, function(value, key) {
            if (value.projectid == $scope.objagreement.projectid) {
                var proj = value;
                proj.jobs = angular.copy($scope.objjobs);
                $scope.selectedObjects.push(proj);
            }
        });
    }

    $scope.getchangemethod = function() {
        if ($scope.functions == 'add') {
            $scope.getjobmasters();
            $scope.getrates();
            $scope.getmulti();
        }
    }

    $scope.getrates = function() {
        $scope.wagetypes = $scope.objagreement.wagetype
        $scope.wageyearid = $scope.objagreement.wageyearid
        $scope.wageareasid = $scope.objagreement.wageareaid

        if ($scope.wagetypes == undefined || $scope.wageyearid == undefined) {
            return;
        }

        //alert($scope.wageareasid)
        if ($scope.wagetypes == $scope.tncode) {
            $scope.finalwage = $scope.tnwage;
            $scope.wageareasid = 0;
        } else if ($scope.wagetypes == $scope.dgrcode) {
            $scope.finalwage = $scope.dgrwage;
        }
        angular.forEach($scope.finalwage, function(dgrwages) {
            if (dgrwages.wageyearid == $scope.wageyearid) {
                $scope.vall1 = dgrwages;
                angular.forEach($scope.vall1.wageareajobmaster, function(val2) {
                    angular.forEach(val2.area, function(val3) {
                        if (val3.wageareaid == $scope.wageareasid) {
                            angular.forEach(val3.particulars, function(val4) {

                                if (val4.particular == 'BASIC')
                                    angular.forEach($scope.objjobs, function(jobs) {
                                        if (val2.jobmastercode == jobs.code) {
                                            jobs.salary = val4.wagesjobmaster
                                        }
                                    });
                            });
                        }
                    });
                });
            }
        });
    }

    $scope.getrenewal = function() {
        //debugger
        var filteredrenewal = _.filter($scope.agreements, function(item) {
            return item.agreementstatus == 'RENEWAL'
        });
        $scope.agreementsrenewal = filteredrenewal;
        $scope.searchresult3 = $scope.agreementsrenewal;
        $scope.renewalcount = $scope.agreementsrenewal.length;
        if ($scope.agreementsrenewal.length > 0) {
            //debugger
            $scope.select($scope.agreementsrenewal[0]);
        }
        console.log('$scope.agreementsrenewal',$scope.agreementsrenewal);
    } 

    $scope.getrejected = function() {
        //debugger
        var filteredrenewal = _.filter($scope.agreements, function(item) {
            return item.amstatus == 2
        });
        $scope.agreementsrejected = filteredrenewal;
        $scope.searchresult4 = $scope.agreementsrejected;
        $scope.rejectedcount = $scope.agreementsrejected.length;
        if ($scope.agreementsrejected.length > 0) {
            //debugger
            $scope.select($scope.agreementsrejected[0]);
        }
        //console.log('$scope.agreementsrenewal',$scope.agreementsrenewal);
    } 

    $scope.getpending = function() {
        //debugger
        var filteredpending = _.filter($scope.agreements, function(item) {
            return item.amstatus == 1
        });
        $scope.agreementpending = filteredpending;
        $scope.searchresult4 = $scope.agreementpending;
        $scope.pendingcount = $scope.agreementpending.length;
        if ($scope.agreementpending.length > 0) {
            //debugger
            $scope.select($scope.agreementpending[0]);
        }
      //  console.log('$scope.agreementsrenewal',$scope.agreementsrenewal);
    } 

    $scope.getsigned = function() {
        var filteredsigned = _.filter($scope.agreements, function(item) {
            return item.agreementstatus == 'DRAFT AGREEMENT FORWARDED'
        });

        $scope.agreementssigned = filteredsigned;
        $scope.searchresult2 = $scope.agreementssigned;
        $scope.signedcount = $scope.agreementssigned.length;
        if ($scope.agreementssigned.length > 0) {
            $scope.select($scope.agreementssigned[0]);
        }
    }   

    $scope.getexcecuted = function() {
        var filteredexcecuted = _.filter($scope.agreements, function(item) {
            return item.agreementstatus == 'EXCECUTED'
        });
        $scope.agreementsexcecuted = filteredexcecuted;
        $scope.searchresult1 = $scope.agreementsexcecuted;
        $scope.excecutedcount = $scope.agreementsexcecuted.length;
        if ($scope.agreementsexcecuted.length > 0) {
            $scope.select($scope.agreementsexcecuted[0]);
        }
    }

    $scope.searchExeAgreement = function (filter)  {
		//debugger
		if(filter) {
			var filteredsearch = _.filter($scope.searchresult1, function (item) {
				return item.projects[0].projectno.toLowerCase() == filter.toLowerCase();
			});
			$scope.agreementsexcecuted = filteredsearch;
		} else {
			$scope.agreementsexcecuted = $scope.searchresult1;
		}
    } 
    
    $scope.searchPendingAgreement = function (filter)  {
		//debugger
		if(filter) {
			var filteredsearch = _.filter($scope.searchresult4, function (item) {
				return item.projects[0].projectno.toLowerCase() == filter.toLowerCase();
			});
			$scope.agreementpending = filteredsearch;
		} else {
			$scope.agreementpending = $scope.searchresult1;
		}
    } 

    $scope.searchSignedAgreement = function (filter)  {
		//debugger
		if(filter) {
			var filteredsearch = _.filter($scope.searchresult2, function (item) {
				return item.projects[0].projectno.toLowerCase() == filter.toLowerCase();
			});
			$scope.agreementssigned = filteredsearch;
		} else {
			$scope.agreementssigned = $scope.searchresult2;
		}
    }

    $scope.searchRenewalAgreement = function (filter)  {
		//debugger
		if(filter) {
			var filteredsearch = _.filter($scope.searchresult3, function (item) {
				return item.projects[0].projectno.toLowerCase() == filter.toLowerCase();
			});
			$scope.agreementsrenewal = filteredsearch;
		} else {
			$scope.agreementsrenewal = $scope.searchresult3;
		}
    } 

    $scope.searchRejectAgreement = function (filter)  {
		//debugger
		if(filter) {
			var filteredsearch = _.filter($scope.searchresult4, function (item) {
				return item.projects[0].projectno.toLowerCase() == filter.toLowerCase();
			});
			$scope.agreementsrejected = filteredsearch;
		} else {
			$scope.agreementsrejected = $scope.searchresult4;
		}
    } 
    
    // Load Selected Projects
    $scope.selectProject = function(clientid) {
        //debugger
        $scope.selectedprojects = [];
        var obj = {}
        for (obj of $scope.projects) {
            if (obj.clientid == clientid) {
                $scope.selectedprojects.push(obj);
            }
        }
        $scope.projectnames = $scope.selectedprojects;
        console.log($scope.projectnames);
        $('.empclients').addClass('active');
    }

    $scope.getjobmasters = function(wageid, yearid, areaid) {
        $scope.objjobs = [];
        $scope.jobmasters.forEach(function(value) {
            var item = {
                jobmasterid: value.jobmasterid,
                name: value.name,
                code: value.code,
                numberofvacancies: 0,
                salary: 0,
                comments: ''
            }
            $scope.objjobs.push(item);
        }) 
        $scope.wagetypes = wageid
        $scope.wageyearid = yearid
        $scope.wageareasid = areaid
        if ($scope.wagetypes == $scope.tncode) {
            $scope.finalwage = $scope.tnwage;
            $scope.wageareasid = 0;
        } else if ($scope.wagetypes == $scope.dgrcode) {
            $scope.finalwage = $scope.dgrwage;
        }
        angular.forEach($scope.finalwage, function(dgrwages) {
            if (dgrwages.wageyearid == $scope.wageyearid) {
                $scope.vall1 = dgrwages;
                angular.forEach($scope.vall1.wageareajobmaster, function(val2) {
                    angular.forEach(val2.area, function(val3) {
                        if (val3.wageareaid == $scope.wageareasid) {
                            angular.forEach(val3.particulars, function(val4) {
                                if (val4.particular == 'Basic') {
                                    angular.forEach($scope.objjobs, function(jobs) {
                                        if (val2.jobmastercode == jobs.code) {
                                            jobs.salary = val4.wagesjobmaster
                                        }
                                    });
                                }
                            });
                        }
                    });
                });
            }
        });
    };

    $scope.select = function(agreement) {
        //debugger
        $scope.selected = agreement;
        console.log(' $scope.selected', agreement);
        $scope.objjobs = agreement.jobs;
        $scope.objagreement.agreementid = agreement.agreementid;
        $scope.objagreement.month = agreement.month;
        $scope.objagreement.fromdate = agreement.fromdate;
        $scope.objagreement.todate = agreement.todate;
        $scope.objagreement.servicecharge = agreement.servicecharge;
        $scope.objagreement.tax = agreement.tax;
        $scope.objagreement.agreementtypeid = agreement.agreementtypeid;
        $scope.objagreement.changedby = agreement.changedby;
        $scope.objagreement.projectid = agreement.projectid;
        $scope.objagreement.clientid = agreement.clientid;
        $scope.objagreement.organization = agreement.organization;
        $scope.objagreement.wagetype = agreement.wagetypeid;
        $scope.objagreement.wagerate = agreement.wagerate;
        $scope.objagreement.wageyearid = agreement.wageyearid;
        $scope.objagreement.wageareaid = agreement.wageareaid;
        $scope.objagreement.agreementstatus = agreement.agreementstatusid;
        $scope.objagreement.typeagreement = agreement.agtypeid;
        $scope.objagreement.typeofagreementoth = agreement.optionaltype;
        $scope.objagreement.projectname = agreement.projectname;
        $scope.objagreement.amstatus = agreement.amstatus;
        $scope.objagreement.taxtype = agreement.taxtype;
        $scope.objagreement.addendumstatus = agreement.addendumstatus;
        $scope.objagreement.adamstatus = agreement.adamstatus;
        $scope.objagreement.edseperate = agreement.edseperate;
        $scope.objagreement.taxtype = agreement.taxtype;
        $scope.objagreement.allowancetype1 = agreement.allowancetype1;
        $scope.objagreement.allowancevalue1 = agreement.allowancevalue1;
        $scope.objagreement.allowancetype2 = agreement.allowancetype2;
        $scope.objagreement.allowancevalue2 = agreement.allowancevalue2;
        $scope.objagreement.allowancetype3 = agreement.allowancetype3;
        $scope.objagreement.allowancevalue3 = agreement.allowancevalue3;
    }

    $scope.selectss = function(agreement) {
        //debugger
        //$scope.selected = agreement;
        console.log(' $scope.selected', agreement);
        $scope.objjobs = agreement.jobs;
        $scope.objagreement.agreementid = agreement.agreementid;
        $scope.objagreement.month = agreement.month;
        $scope.objagreement.fromdate = agreement.fromdate;
        $scope.objagreement.todate = agreement.todate;
        $scope.objagreement.servicecharge = agreement.servicecharge;
        $scope.objagreement.tax = agreement.tax;
        $scope.objagreement.agreementtypeid = agreement.agreementtypeid;
        $scope.objagreement.changedby = agreement.changedby;
        $scope.objagreement.projectid = agreement.projectid;
        $scope.objagreement.clientid = agreement.clientid;
        $scope.objagreement.organization = agreement.organization;
        $scope.objagreement.wagetype = agreement.wagetypeid;
        $scope.objagreement.wagerate = agreement.wagerate;
        $scope.objagreement.wageyearid = agreement.wageyearid;
        $scope.objagreement.wageareaid = agreement.wageareaid;
        $scope.objagreement.agreementstatus = agreement.agreementstatusid;
        $scope.objagreement.typeagreement = agreement.agtypeid;
        $scope.objagreement.typeofagreementoth = agreement.optionaltype;
        $scope.objagreement.projectname = agreement.projectname;
        $scope.objagreement.amstatus = agreement.amstatus;
        $scope.objagreement.taxtype = agreement.taxtype;
        $scope.objagreement.addendumstatus = agreement.addendumstatus;
        $scope.objagreement.adamstatus = agreement.adamstatus;
    }
  
    $scope.addaddendum = function(wageid, yearid, areaid, agreementid, agreementinfoid) {
        $scope.submitted = false;
        $scope.objagreement = {};
        $scope.objagreement.agreementid = agreementid;
        $scope.objagreement.agreementinfoid = agreementinfoid;
        scope.getjobmasters(wageid, yearid, areaid);
        $('#mcaption').text("Add Addendum");
        $('#modal2').modal('open');
        $('#failure').html("");
    }

    $scope.editvacancy = function(wagetypeid,wageyearid,wageareaid, agreementid,agreementinfoid,jobs) {
        //debugger
        $scope.updatejobs = jobs;
        $('#mcaptions').text("Edit Jobs");
        $('#jobsedit').modal('open');
    }

    $scope.editaddendum = function(wagetypeid,wageyearid,wageareaid, agreementid, agreementinfoid,addendums) {
        $scope.updatejobss = addendums;
        $('#mcaptions').text("Edit Addendum");
        $('#addendumedit').modal('open');
    }

    $scope.addagreement = function() {
        //debugger
        $scope.submitted = false;
        $scope.objagreement = {};
        scope.getjobmasters();
        $scope.selectedObjects = [];
        $('#m1caption').text("Add Agreement");
        $('#divProjAdd').show();
        $('#divProjView').hide();
        $('#failure1').html("");
        $('#failure2').html("");
        $scope.functions = 'add';  
        $('#modal1').modal('open');  
    }

    $scope.editagreement = function() {
        $scope.submitted = false;
        $scope.getwagecategorytypess($scope.selected.wageyearid,$scope.selected.wagecategoryid,$scope.selected.wagetypeid);
        $scope.select($scope.selected);
        console.log($scope.selected);
      //  scope.CombinedProjectList($scope.selected.agreementid,$scope.selected.clientid);
        $scope.agname=$('.title-agree').html();
        $('#m3caption').text("Edit " +  $scope.agname);
        $("label").addClass("active");
        $('#modal3').modal('open');
        $('#failure').html("");
        $('#failure1').html("");
        $('#failure2').html("");
        $scope.functions = 'edit';
    }


    
    $scope.editagreementtype = function() {
        $scope.submitted = false;
        $scope.getwagecategorytypess($scope.selected.wageyearid,$scope.selected.wagecategoryid,$scope.selected.wagetypeid);
        $scope.select($scope.selected);
        console.log($scope.selected.agreementid);
        $scope.agtype=$scope.selected.agreementtypeid;
        scope.CombinedProjectList($scope.selected.agreementid,$scope.selected.clientid);
        $scope.agname=$('.title-agree').html();
        $('#m3caption').text("Edit " +  $scope.agname);
        $("label").addClass("active");
        $('#agreementmodal').modal('open');
        $('#failure').html("");
        $('#failure1').html("");
        $('#failure2').html("");
        $scope.functions = 'edit';
    }


    $scope.saveAgreementtype = function(objagreement,selectedprojectslist) {
        // if (objapply.memberid > 0) {
            //job activity
            $http({
                url: api_url + "/project/updateCombinedAgreement",
                data: $.param({
                    agreementid: objagreement.agreementid,
                    projectlist: selectedprojectslist,
                    
                }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization' : atoken
                }, 
                method: 'POST',
            }).success(function(response, result) {
                if (result = 200) {
                    // $scope.jobconfirm(response.jobactivityid, objapply.memberid, '', postingdetail.code);
                    
                    }

                
            }).error(function(error) {
                $('#failure2').html(error);
            });
       // }
    }

    // $scope.saveAgreementtype = function(objagreement,selectedprojectslist) {

    //    alert( $scope.agtype);
    //     console.log('a',objagreement);
    //     console.log('b',selectedprojectslist);
        
    // }
    $scope.getagreement = function(agreementid) {
        $http({
            method: 'GET',
            headers: {
                'Authorization' : atoken
            }, 
            url: api_url + "/agreement/" + agreementid,
        }).then(function successCallback(response) {
            if (response.status = 200) {
                $scope.dgrrate = response.data;
                if (response.status = 200) {
                    for (var loop = 0; loop < $scope.agreements.length; loop++) {
                        if ($scope.agreements[loop].agreementid == agreementid) {
                            $scope.agreements[loop] = response.data[0];
                            $scope.select($scope.agreements[loop]);
                            break;
                        }
                    }
                } else {
                    $scope.agreements.unshift(response.data[0]);
                    $scope.select($scope.agreements[0]);
                }
                $scope.getrates();
            }
        }, function errorCallback(response) {
            Materialize.toast('Something has gone wrong!', 3000, 'red');
        });



    }

    $scope.getmulti = function() {

        for (var i = 0; i < $scope.selectedObjects.length; i++) {

            $scope.selectedObjects[i].jobs = angular.copy($scope.objjobs);
        }
    };

    $scope.getmultivals = function(data,selectedprojectslist) {
        console.log('data',data);
        if (data.ticked == true) {
            $http({
                method: 'GET',
                headers: {
                    'Authorization' : atoken
                }, 
                url: api_url + "/project/validate?projectid="+data.projectid,
            }).then(function successCallback(response,result) {
                if (response.data.includes("Exist")) {
                    $('#failure4').html("Agreement already Exist!");
                }
            }, function errorCallback(response) {
            });
            // data.jobs = angular.copy($scope.objjobs);
            $scope.selectedObjects.push(data);
        }
        if (data.ticked == false) {
            $('#failure4').html("");
            $scope.selectedObjects.splice(data, 1);
        }
        
        ////debugger
        // $scope.selectedObjects = [];
        // console.log('$scope.objjobs',$scope.objjobs);
        // for (var i = 0; i < selectedprojectslist.length; i++) {
        //     var  datas= [];
        //     datas.push(selectedprojectslist[i]);
        //     datas.jobs = angular.copy($scope.objjobs);
        //     $scope.selectedObjects.push(datas);
        // }
        // console.log('$scope.selectedObjects',$scope.selectedObjects);


        // alert(JSON.stringify(data.ticked))
        /* for(var i=0;i<$scope.selectedprojectslist.length;i++){
             console.log(JSON.stringify($scope.selectedprojectslist[i].objSelected));
        if(      $scope.selectedprojectslist[i].projectid  ==data.projectid )
            {

                $scope.selectedprojectslist[i].objSelected=$scope.objjobs;
             }

         }*/
        // $scope.selectedprojectslist.objjobs=$scope.objjobs

    };

    // Save agreement
    $scope.saveagreement = function(data, jobs) {
        var method;
        var amstatus = 0;
        var agreementid = data.agreementid;
        var serviceurl;
        if (agreementid > 0) {
            method = 'PUT';
            if(roleid == 2) {
              amstatus = 1;
            }
        } else {
            method = 'POST';
            if(roleid == 2) {
                amstatus = 1;
            }
        }
        $http({
            url: api_url + "/agreement",
            data: $.param({
                agreementid: data.agreementid,
                clientid: data.clientid,
                fromdate: data.fromdate,
                todate: data.todate,
                tax: data.tax,
                taxtype:data.taxtype,
                optionaltype: data.typeofagreementoth,
                todate: data.todate,
                servicecharge: data.servicecharge,
                wagetypeid: data.wagetype,
                wageyearid: data.wageyearid,
                wageareaid: data.wageareaid,
                agreementstatusid: data.agreementstatus,
                agreementtypeid: data.agreementtypeid,
                agtypeid: data.typeagreement,
                projects: jobs,
                particularid: $scope.partbasic,
                roleid:roleid,
                regionid:regionid,
                amstatus: amstatus,
                wagecategoryid : data.wagecategoryid,
                edseperate : data.edseperate,
                taxtype : data.taxtype,
                allowancetype1 : data.allowancetype1,
                allowancevalue1 : data.allowancevalue1,
                allowancetype2 : data.allowancetype2,
                allowancevalue2 : data.allowancevalue2,
                allowancetype3 : data.allowancetype3,
                allowancevalue3 : data.allowancevalue3,

            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : atoken
            }, 
            method: method,
        }).success(function(response, result) {
            if (result = 200) {
                var agreementid = response.agreementid;
                if(roleid == 2) {
                    serviceurl = api_url + "/job/amsagreement?agreementid=" + agreementid + "&regionid=" + regionid
                } else {
                    serviceurl = api_url + "/job/getagreement?agreementid=" + agreementid + "&regionid=" + regionid
                }
                $http({
                    method: 'GET',
                    headers: {
                        'Authorization' : atoken
                    }, 
                    url: serviceurl
                }).then(function successCallback(response) {
                    if (response.status = 200) {
                        // console.log('response.data',response);
                        //debugger
                        if(method == 'PUT') {
                            Materialize.toast('Agreement Updated Successfully !', 3000, 'green');
                        } else {
                            Materialize.toast('Agreement saved Successfully !', 3000, 'green');
                        }
                        $('#modal4').modal('close');
                        $('#modal5').modal('close');
                        $('#modal3').modal('close');
                        $('#modal2').modal('close');
                        $('#modal1').modal('close');
                        if (response.data.length > 0) {
                            for (var loop = 0; loop < $scope.agreements.length; loop++) {
                                if ($scope.agreements[loop].agreementid == response.data[0].agreementid) {
                                    $scope.agreements[loop] = response.data[0];
                                    $scope.select($scope.agreements[loop]);
                                    break;
                                }
                            }
                        } else {
                            Materialize.toast('Agreement saved Successfully !', 3000, 'green');
                            setTimeout(function () {
                                window.location.reload(true);
                            }, 500);
                        }
                    } else {
                        Materialize.toast('Agreement saved Successfully !', 3000, 'green');
                        setTimeout(function () {
                            window.location.reload(true);
                        }, 500);
                    }
                }, function errorCallback(response) {});
            }
        }).error(function(error) {
            $('#failure1').html(error);
            $('#failure2').html(error);
            $('#failure4').html(error);
        });
    };
 
    $scope.saveapproveagreement  = function(data, jobs) {
        var method;
        var amstatus = 0;
        var agreementid = data.agreementid;
        var serviceurl;
        if (agreementid > 0) {
            method = 'PUT';
            if(roleid == 2) {
              amstatus = 1;
            }
        } else {
            method = 'POST';
            if(roleid == 2) {
                amstatus = 1;
            }
        }
        $http({
            url: api_url + "/agreement",
            data: $.param({
                agreementid: data.agreementid,
                clientid: data.clientid,
                fromdate: data.fromdate,
                todate: data.todate,
                tax: data.tax,
                taxtype:data.taxtype,
                optionaltype: data.typeofagreementoth,
                todate: data.todate,
                servicecharge: data.servicecharge,
                wagetypeid: data.wagetype,
                wageyearid: data.wageyearid,
                wageareaid: data.wageareaid,
                agreementstatusid: data.agreementstatus,
                agreementtypeid: data.agreementtypeid,
                agtypeid: data.typeagreement,
                projects: jobs,
                particularid: $scope.partbasic,
                roleid:roleid,
                regionid:regionid,
                amstatus: amstatus,
                wagecategoryid : data.wagecategoryid
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : atoken
            }, 
            method: method,
        }).success(function(response, result) {
            if (result = 200) {
                Materialize.toast('Agreement Approved Successfully !', 3000, 'green');
                setTimeout(function () {
                    window.location.reload(true);
                }, 1500);
            }
        }).error(function(error) {
            $('#failure1').html(error);
            $('#failure2').html(error);
            $('#failure4').html(error);
        });
    }; 

    // Save saveaddendum
    $scope.saveaddendum = function(objagreement, jobs , type) {
        if(roleid == 2) {
            var posturl = api_url + "/agreementams/addendum";
        } else {
            var posturl = api_url + "/agreement/addendum";
        }
        $http({
            url: posturl,
            data: $.param({
                agreementinfoid: objagreement.agreementinfoid,
                agreementid: objagreement.agreementid,
                jobs: jobs,
                type: type
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : atoken
            }, 
            method: 'POST',
        }).success(function(response, result) {
            if (result = 200) {
                var serviceurl = '';
                var agreementid = response.agreementid;
                if(roleid == 2) {
                    serviceurl = api_url + "/job/amsagreement?agreementid=" + agreementid + "&regionid=" + regionid
                } else {
                    serviceurl = api_url + "/job/getagreement?agreementid=" + agreementid + "&regionid=" + regionid
                }
                $http({
                    method: 'GET',
                    headers: {
                        'Authorization' : atoken
                    }, 
                    url: serviceurl
                }).then(function successCallback(response) {
                    if (response.status = 200) {
                        Materialize.toast('Addendum saved Successfully !', 3000, 'green');
                        $('#modal2').modal('close');
                        $('#jobsedit').modal('close');
                        if (objagreement.agreementid > 0) {
                            for (var loop = 0; loop < $scope.agreements.length; loop++) {
                                if ($scope.agreements[loop].agreementid == response.data[0].agreementid) {
                                    $scope.agreements[loop] = response.data[0];
                                    $scope.select($scope.agreements[loop]);
                                    break;
                                }
                            }
                            $('#modal2').modal('close');
                            $('#jobsedit').modal('close');
                        }
                    }
                }, function errorCallback(response) {});
            }
        }).error(function(error) {
            $('#failure').html(error);
        });
    };

    // Update Addendum
    $scope.updateaddendum = function(objagreement, updatejobss)  {
        //debugger
        var posturl = '';
        if(roleid == 2) {
            posturl = api_url + "/agreement/amsupdateaddendum";
        } else {
            posturl = api_url + "/agreement/updateaddendum";
        }
        $http({ 
            url: posturl,
            data: $.param({
                agreementinfoid: objagreement.agreementinfoid,
                agreementid: objagreement.agreementid,
                jobs: updatejobss,
                type: 1
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : atoken
            }, 
            method: 'POST',
        }).success(function(response, result) {
            if (result = 200) {
                //debugger
                var serviceurl = '';
                var agreementid = objagreement.agreementid;
                if(roleid == 2) {
                    serviceurl = api_url + "/job/amsagreement?agreementid=" + agreementid + "&regionid=" + regionid
                } else {
                    serviceurl = api_url + "/job/getagreement?agreementid=" + agreementid + "&regionid=" + regionid
                }
                $http({
                    method: 'GET',
                    headers: {
                        'Authorization' : atoken
                    }, 
                    url: serviceurl
                }).then(function successCallback(response) {
                    if (response.status = 200) {
                        //debugger
                        Materialize.toast('Addendum updated Successfully !', 3000, 'green');
                        $('#addendumedit').modal('close');
                        if (objagreement.agreementid > 0) {
                            for (var loop = 0; loop < $scope.agreements.length; loop++) {
                                if ($scope.agreements[loop].agreementid == response.data[0].agreementid) {
                                    $scope.agreements[loop] = response.data[0];
                                    $scope.select($scope.agreements[loop]);
                                    break;
                                }
                            }
                            $('#addendumedit').modal('close');
                        }
                    }
                }, function errorCallback(response) {});
            }
        }).error(function(error) {
            $('#failure').html(error);
        });
    }

    //  Approve Jobs   
    $scope.Approveaddendum = function(objagreement, jobs, type)  {
        var posturl = api_url + "/agreement/approveaddendum";
        $http({
            url: posturl,
            data: $.param({
                agreementinfoid: objagreement.agreementinfoid,
                agreementid: objagreement.agreementid,
                jobs: jobs,
                type: type
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : atoken
            }, 
            method: 'POST',
        }).success(function(response, result) {
            if (result = 200) {
                var serviceurl = serviceurl = api_url + "/job/getagreement?agreementid=" + agreementid + "&regionid=" + regionid
                var agreementid = response.agreementid;
                $http({
                    method: 'GET',
                    headers: {
                        'Authorization' : atoken
                    }, 
                    url: serviceurl
                }).then(function successCallback(response) {
                    if (response.status = 200) {
                        Materialize.toast('AM Updated vacancy saved Successfully !', 3000, 'green');
                        $('#approvejob').modal('close');
                        if (objagreement.agreementid > 0) {
                            for (var loop = 0; loop < $scope.agreements.length; loop++) {
                                if ($scope.agreements[loop].agreementid == response.data[0].agreementid) {
                                    $scope.agreements[loop] = response.data[0];
                                    $scope.select($scope.agreements[loop]);
                                    break;
                                }
                            }
                            $('#approvejob').modal('close');
                        }
                    }
                }, function errorCallback(response) {});
            }
        }).error(function(error) {
            $('#failure').html(error);
        });
    }

    // Approveaddendums 
    $scope.Approveaddendums = function(objagreement, jobs, type)  {
        //debugger
        var posturl = api_url + "/agreement/approveaddendums";
        $http({
            url: posturl,
            data: $.param({
                agreementinfoid: objagreement.agreementinfoid,
                agreementid: objagreement.agreementid,
                jobs: jobs,
                type: type
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : atoken
            }, 
            method: 'POST',
        }).success(function(response, result) {
            if (result = 200) {
                var agreementid = objagreement.agreementid;
                var serviceurl = serviceurl = api_url + "/job/getagreement?agreementid=" + agreementid + "&regionid=" + regionid
                $http({
                    method: 'GET',
                    headers: {
                        'Authorization' : atoken
                    }, 
                    url: serviceurl
                }).then(function successCallback(response) {
                    if (response.status = 200) {
                        Materialize.toast('AM Updated vacancy saved Successfully !', 3000, 'green');
                        $('#approveaddendum').modal('close');
                        if (objagreement.agreementid > 0) {
                            for (var loop = 0; loop < $scope.agreements.length; loop++) {
                                if ($scope.agreements[loop].agreementid == response.data[0].agreementid) {
                                    $scope.agreements[loop] = response.data[0];
                                    $scope.select($scope.agreements[loop]);
                                    break;
                                }
                            }
                            $('#approveaddendum').modal('close');
                        }
                    }
                }, function errorCallback(response) {});
            }
        }).error(function(error) {
            $('#failure').html(error);
        });
    }
    

    // Reject Addendum
    $scope.RejectAgreementJob = function(objagreement, updatejobss,type) {
        var posturl = api_url + "/agreement/rejectaddendum";
        $http({
            url: posturl,
            data: $.param({
                agreementinfoid: objagreement.agreementinfoid,
                agreementid: objagreement.agreementid,
                jobs: updatejobss,
                type: type
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : atoken
            }, 
            method: 'POST',
        }).success(function(response, result) {
            if (result = 200) {
                var agreementid = response.agreementid;
                var serviceurl = serviceurl = api_url + "/job/getagreement?agreementid=" + agreementid + "&regionid=" + regionid
                $http({
                    method: 'GET',
                    headers: {
                        'Authorization' : atoken
                    }, 
                    url: serviceurl
                }).then(function successCallback(response) {
                    if (response.status = 200) {
                        Materialize.toast('AM Updated Vacancy Rejected Successfully !', 3000, 'green');
                        $('#approvejob').modal('close');
                        if (objagreement.agreementid > 0) {  
                            var myArr = $scope.agreements.filter(function(item) {
                                return item.agreementid != agreementid;
                            });
                            myArr.push(response.data[0]);
                            $scope.agreements = [];
                            $scope.agreements = myArr;
                            $scope.getsigned();
                            $scope.getpending();
                            $scope.getexcecuted();
                            $scope.getrenewal();
                            $('#approvejob').modal('close');
                        }
                    }
                }, function errorCallback(response) {});
            }
        }).error(function(error) {
            $('#failure').html(error);
        });
    }

    // Delete agreement
    $scope.removeagreement = function() {
        if (confirm("Are you sure to delete this detail?")) {
            $http({
                url: api_url + "/agreement/" + $scope.objagreement.agreementid,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization' : atoken
                }, 
                method: 'DELETE',
            }).success(function(response, result) { 
                console.log("result",result);
                if (result = 200) { 
                    var myArr = $scope.agreements.filter(function(item) {
                        return item.agreementid != $scope.objagreement.agreementid;
                    });
                    $scope.agreements = [];
                    $scope.agreements = myArr;
                    $scope.getsigned();
                    $scope.getpending();
                    $scope.getexcecuted();
                    $scope.getrenewal();
                }
            }).error(function(error) {
                $scope.error = error;
            });
        };
    }

    $scope.ApproveAgreement = function (selected) {
        //debugger
        $scope.submitted = false;
        var agreementid = selected.agreementid;
        $http({
            method: 'GET', 
            headers: {
                'Authorization' : atoken
            }, 
            url: api_url + "/job/amsagreement?agreementid=" + agreementid + "&regionid=" + regionid
        }).then(function successCallback(response) {
            //debugger
            if (response.status = 200) {
                $scope.getwagecategorytypess(response.data[0].wageyearid,response.data[0].wagecategoryid,response.data[0].wagetypeid);
                $scope.updatedfields =  response.data[0].updatedfields;
				if ($scope.updatedfields) {
					dataObj = JSON.parse($scope.updatedfields);
					$scope.employeecheck = dataObj.lastIndexOf("clientid");
					$scope.agreementtypecheck = dataObj.lastIndexOf("agreementtypeid");
					$scope.servicechargecheck = dataObj.lastIndexOf("servicecharge");
					$scope.taxcheck = dataObj.lastIndexOf("tax");
					$scope.fromdatecheck = dataObj.lastIndexOf("fromdate");
					$scope.todatecheck = dataObj.lastIndexOf("todate");
					$scope.wagetypecheck = dataObj.lastIndexOf("wagetypeid");
					$scope.agreementstatuscheck = dataObj.lastIndexOf("agreementstatusid");
					$scope.rateyearcheck = dataObj.lastIndexOf("wageyearid");
					$scope.wagecategorycheck = dataObj.lastIndexOf("wagecategoryid");
					$scope.agtypecheck = dataObj.lastIndexOf("agtypeid");
                    $scope.wageareacheck  = dataObj.lastIndexOf("wageareaid");
				}
                $scope.selectss(response.data[0]);
                $('#m3caption').text("Approve Agreement");
                $("label").addClass("active");
                $('#modal5').modal('open');
            }
        }, function errorCallback(response) {
            Materialize.toast('Something has gone wrong!', 3000, 'red');
        });
    };

    $scope.ApproveAgreementJobs = function (wagetypeid,wageyearid,wageareaid,agreementid,agreementinfoid) {
        //debugger
        $scope.submitted = false;
        $http({
            method: 'GET', 
            headers: {
                'Authorization' : atoken
            }, 
            url: api_url + "/job/amsjobsagreement?agreementid=" + agreementid + "&regionid=" + regionid + "&agreementinfoid=" +agreementinfoid
        }).then(function successCallback(response) {
            //debugger
            if (response.status = 200) {
                $scope.updatejobss = response.data;
                $('#m3caption').text("Approve Agreement");
                $("label").addClass("active");
                $('#approvejob').modal('open');
            }
        }, function errorCallback(response) {
            Materialize.toast('Something has gone wrong!', 3000, 'red');
        });
    };

    $scope.ApproveAgreementAddendum  = function (wagetypeid,wageyearid,wageareaid,agreementid,agreementinfoid) {
        //debugger
        $scope.submitted = false;
        $http({
            method: 'GET', 
            headers: {
                'Authorization' : atoken
            }, 
            url: api_url + "/job/amsaddendumsagreement?agreementid=" + agreementid + "&regionid=" + regionid + "&agreementinfoid=" +agreementinfoid
        }).then(function successCallback(response) {
            //debugger
            if (response.status = 200) {
                $scope.updatejobss = response.data;
                $('#m3captionss').text("Approve Addendum");
                $("label").addClass("active");
                $('#approveaddendum').modal('open');
            }
        }, function errorCallback(response) {
            Materialize.toast('Something has gone wrong!', 3000, 'red');
        });
    };

    $scope.RejectAgreement = function (agreementid) {
        if (confirm("Are you sure Revert the AM Changes?")) {
            $http({
                method: 'GET', 
                headers: {
                    'Authorization' : atoken
                }, 
                url: api_url + "/AgreementAMRejectOptions?agreementid=" + agreementid,
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

    $scope.getwagetype = function(wagetype,wageyearid) {
        //debugger
        if ($scope.objagreement.wagetype == $scope.tncode) {
            $scope.objagreement.wageareaid = 0;
        }
        $scope.wagecategories = [];
        var filteredpending = _.filter( $scope.wagecategory, function(item) {
            return item.wageyearid == wageyearid && item.wagetypeid == wagetype;
        });  
        // console.log('filteredpending',filteredpending);
        $scope.wagecategories = filteredpending;
    }

    $scope.getagreementtype = function(typeagreement) {
        if (typeagreement != $scope.typeofagreementoth) {
            $scope.objagreement.typeofagreementoth = "";
        }
    }

    $scope.getwagecategorytype = function(wageyearid,wagetype) {
        // console.log('wageyearid',wageyearid);
        //debugger
        var filteredpending = _.filter( $scope.wagecategory, function(item) {
            return item.wageyearid == wageyearid && item.wagetypeid == wagetype;
        });
        console.log('filteredpending',filteredpending);
        $scope.wagecategories = filteredpending;
    }

    $scope.getwagecategorytypes = function(wageyearid,wagetype) {
        // console.log('wageyearid',wageyearid);
        //debugger
        var filteredpending = _.filter( $scope.wagecategory, function(item) {
            return item.wageyearid == wageyearid && item.wagetypeid == wagetype;;
        });
        console.log('filteredpending',filteredpending);
        $scope.wagecategories = filteredpending;
    }

    $scope.getwagecategorytypess = function(wageyearid,categoryid,wagetypeid) {
        // console.log('wageyearid',wageyearid);
        //debugger
        var filteredpending = _.filter( $scope.wagecategory, function(item) {
            return item.wageyearid == wageyearid && item.wagetypeid == wagetypeid;
        });
        // console.log('filteredpending',filteredpending);
        $scope.wagecategories = filteredpending;
        $scope.objagreement.wagecategoryid = categoryid;
    }
   
    $scope.fillclientproject = function(projectid) {
        $http({
            method: 'GET', 
            headers: {
                'Authorization' : atoken
            }, 
            url: api_url + "/jobposting/prjectnossearch/" + projectid,
        }).then(function successCallback(response) {
            console.log('response',response);
            if (response.status = 200) {
                //debugger
                $scope.objagreement.projectid = response.data[0].projectid;
                $scope.objagreement.organization = response.data[0].organization;
                $scope.objagreement.clientid = response.data[0].clientid; 
                $scope.selectedprojects = [];
                for (obj of $scope.projects) {
                    if (obj.clientid == $scope.objagreement.clientid) {
                        $scope.selectedprojects.push(obj);
                    }
                }
                $(".projectsnos").addClass("active");
                $scope.selectedObjects = [];
                angular.forEach($scope.selectedprojects, function(value, key) {
                    //debugger
                    if (value.projectid == $scope.objagreement.projectid) {
                        var proj = value;
                        proj.jobs = angular.copy($scope.objjobs);
                        $scope.selectedObjects.push(proj);
                    }
                });
            }
        }, function errorCallback(response) {
            Materialize.toast('Something has gone wrong!', 3000, 'red');
        });

        $scope.getagtypes();
        $http({
            method: 'GET', 
            headers: {
                'Authorization' : atoken
            }, 
            url: api_url + "/project/validate?projectid="+projectid,
        }).then(function successCallback(response,result) {
            if (response.data.includes("Exist")) {
                //Materialize.toast('Agreement already Exist!', 3000, 'red');
                $('#failure1').html("Agreement already Exist!");
            }
        }, function errorCallback(response) {
            // Materialize.toast('Something has gone wrong!', 3000, 'red');
        });
    };

    // Remove Project
    $scope.removeproject = function(agreementinfoid, agreementid) {
        if (confirm("Are you sure to delete this detail?")) {
            $http({
                url: api_url + "/agreement/agreementinfo/"+ agreementinfoid, 
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization' : atoken
                }, 
                method: 'DELETE',
            }).success(function(response, result) {
                if (result = 200) {
                    $http({
                        method: 'GET', 
                        headers: {
                            'Authorization' : atoken
                        }, 
                        url: api_url + "/agreement/",
                    }).then(function successCallback(response) { 
                        if (response.status = 200) {
                            var myArr = $scope.agreements.filter(function(item) {
                                return item.agreementid != agreementid;
                            });
                            $scope.agreements = [];
                            $scope.agreements = myArr;
                            $scope.getsigned();
                            $scope.getpending();
                            $scope.getexcecuted();
                            $scope.getrenewal();
                        }
                    }, function errorCallback(response) {

                    });
                }
            }).error(function(error) {
                $scope.error = error;
            });
        };
    }

    $scope.downloadagreement = function (objattendance) {

        if (objattendance.fromdate == undefined) {
            objattendance.fromdate = 0;
        }  
        if (objattendance.todate == undefined) {
            objattendance.todate = 0;
        } 
        //debugger
        var urls =  '';
        if (regionid == 0) {  
            urls =  api_url + "/agreementams/export?regionid=NULL&fromdate="+objattendance.fromdate+"&todate="+objattendance.todate;
        } else if (regionid > 0 && roleid == 2) {
            urls =  api_url + "/agreementams/export?regionid="+regionid+"&fromdate="+objattendance.fromdate+"&todate="+objattendance.todate;
        } else {  
            urls =  api_url + "/agreementams/export?regionid="+regionid+"&fromdate="+objattendance.fromdate+"&todate="+objattendance.todate;
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
                JSONToCSVConvertor($scope.downloadclients, 'Agreement_Report', true)
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


    $scope.CombinedProjectList = function(agreementid,clientid) {
       // alert(agreementid);
        $http({
            method: 'GET',
            headers: {
                'Authorization' : atoken
            }, 
            url: api_url + "/project/getcombinedagreementproj?agreementid="+agreementid,
        }).then(function successCallback(response) {
            if (response.status = 200) {
                var data = response.data;
                $scope.selectedprojects = [];
               // var obj = {}

             
                    for (obj of $scope.projects) {
                    if (obj.clientid == clientid) {
                        obj.ticked=false;
                        $scope.selectedprojects.push(obj);
                    }
                    }
                
                    //for (obj of $scope.selectedprojects) {
                    for (let [index, obj] of $scope.selectedprojects.entries()) {

                        for (obj1 of data) {
                            if(obj1.projectid==obj.projectid)
                            {
                                obj.ticked=true; 
                                if(obj1.agreementdetailid !=null)
                                {
                                    $scope.mainproj=obj1;
                                  //  console.log(index);
                                    $scope.selectedprojects.splice(index, 1);   
                                }
                               // obj.ticked=true; 
                            }
                        }
                       
                    }
                console.log( $scope.mainproj);
                $scope.cprojectnames = $scope.selectedprojects;
                console.log($scope.selectedprojects);
               


               // $scope.cprojectnames = response.data;
               // $scope.cprojectnames
               //console.log($scope.cprojectnames);
               // $scope.totalItems = response.data.length;
            } else {
                Materialize.toast('error', 3000, 'red');
            }
        }, function errorCallback(response) {
            Materialize.toast('Something went wrong try again', 3000, 'red');
        });    
    }
    
});
