var app = angular.module('appAdminMember', ['ngTable']);
app.controller('ctrlAdminMember', function($scope, $http, $filter, NgTableParams) {

    
    this.myDate = new Date();
    this.isOpen = false;

    $scope.members = [];
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
    $scope.objregister.genderid =   0;
    $scope.servicenovalid = '';
    $scope.DisableButton = false;
    $scope.isDisabled = false;
    $scope.regionDetails = [];
    $scope.TalukDetails = [];
    // Get character
    $scope.character = [];
    $scope.valshow=1;
    $scope.servicenumber = 0;

    //$scope.skillpage=skillpage;
    
    $http({
        method: 'GET', 
        headers : {
            "Authorization" : atoken
        },
        url: api_url + "/lookupvalues?lkdmcode=CHARCTER",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.character = response.data.lookupvalues;
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
            console.log('$scope.regionDetails',$scope.regionDetails);
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
            console.log('$scope.TalukDetails',$scope.TalukDetails);
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });
   

    

    // Get Caste
    $scope.caste = [];
    $http({
        method: 'GET', 
        headers : {
            "Authorization" : atoken
        },
        url: api_url + "/lookupvalues?lkdmcode=CASTE",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.caste = response.data.lookupvalues;
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });

    // Get Religion
    $scope.religion = [];
    $http({
        method: 'GET', 
        headers : {
            "Authorization" : atoken
        },
        url: api_url + "/lookupvalues?lkdmcode=RELIGION",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.religion = response.data.lookupvalues;
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });

    // Get alldistrict
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

    // Get taluk
    $scope.taluk = [];
    $scope.cascadetaluk = function(districtid) {
        angular.forEach($scope.alldistrict, function(district) {
            if (district.lkvalid == districtid) {
                $scope.taluk = district.lookupitems;
                return;
            }
        });
    }

    // Get region
    $scope.region = [];
    $http({
        method: 'GET', 
        headers : {
            "Authorization" : atoken
        },
        url: api_url + "/lookupvalues?lkdmcode=REGION",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.region = response.data.lookupvalues;
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });
    
    // Get district

    $scope.getDistrictDetails = function(regionid) {
        debugger
        $scope.Taluks = [];
        $scope.districtDetails = [];
        angular.forEach($scope.regionDetails, function(region) {
            if (region.region_id == regionid) {
                $scope.districtDetails = region.district;
                return;
            }
        });
    }

    $scope.getTalukDetails = function(districtid) {
        debugger
        $scope.Taluks = [];
        angular.forEach($scope.TalukDetails, function(taluk) {
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
        //$scope.objproject.districtid = districtid;
        $scope.objprofile.districtid = districtid;
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
        $scope.objprofile.talukid = talukid;
		//$scope.objproject.talukid =talukid;
	}

    $scope.district = [];
    $scope.cascadedistrict = function(regionid) {
        angular.forEach($scope.region, function(region) {
            if (region.lkvalid == regionid) {
                $scope.district = region.lookupitems;
                return;
            }
        });
    }

    // Get States
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
                $scope.sselected = $scope.state[1];
              //  $scope.objregister.stateid =   $scope.sselected.lkvalid;
            }
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });

    // Get Country
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
                $scope.cselected = $scope.country[0];
                $scope.objregister.countryid =   $scope.cselected.lkvalid;
            }
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });

    // Get corps
    $http({
        method: 'GET', 
        headers : {
            "Authorization" : atoken
        },
        url: api_url + "/lookupvalues?lkdmcode=CORPS",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.corp = response.data.lookupvalues;
            if ($scope.corp.length > 0) {
                $scope.corpselected = $scope.corp[0];
            }
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });

    // Get trade
    $http({
        method: 'GET', 
        headers : {
            "Authorization" : atoken
        },
        url: api_url + "/lookupvalues?lkdmcode=TRADE",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.trades = response.data.lookupvalues;
            if ($scope.trades.length > 0) {
                $scope.trselected = $scope.trades[0];
            }
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });

    // Get Nominee Relations
    $http({
        method: 'GET', 
        headers : {
            "Authorization" : atoken
        },
        url: api_url + "/lookupvalues?lkdmcode=NMERL",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.relations = response.data.lookupvalues;
            if ($scope.relations.length > 0) {
                $scope.rselected = $scope.relations[0];
            }
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });

    // Get Ranks
    $http({
        method: 'GET', 
        headers : {
            "Authorization" : atoken
        },
        url: api_url + "/lookupvalues?lkdmcode=RANK",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.rank = response.data.lookupvalues;
            if ($scope.rank.length > 0) {
                $scope.raselected = $scope.rank[0];
            }
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });

   

    // Get members
    // $http({
    //     method: 'GET',
    //     url: api_url + "/members",
    // }).then(function successCallback(response) {
    //     if (response.status = 200) {
    //         $scope.members = response.data;
    //         if ($scope.members.length > 0) {
    //             $scope.select($scope.members[0]);
    //         }
    //     }
    // }, function errorCallback(response) {
    //     Materialize.toast('Something has gone wrong!', 3000, 'red');
    // });

    $scope.servicenumber = localStorage.getItem('MemberSearchValue');
    if(Number($scope.servicenumber) == 0) {
        $scope.servicenumber = 0;
        $scope.objmember.search_val = '';
    } else {
        $scope.objmember.search_val = $scope.servicenumber;
        localStorage.setItem('MemberSearchValue',0);
        $http({
			method: 'GET', 
            headers : {
                "Authorization" : atoken
            },
			url: api_url + "/getmembersearch?membersearchval=" + $scope.servicenumber,
		}).then(function successCallback(response) {
            debugger
			if (response.status = 200) {
                $scope.members = response.data[0];
                if(response.data[0]) {
                    $http({
                        method: 'GET', 
                        headers : {
                            "Authorization" : atoken
                        },
                        url: api_url + "/members/" + $scope.members.memberid,
                    }).then(function successCallback(response) {
                        $(".input-field label").addClass("active");
                        if (response.status = 200) {
                            $scope.objprofile = response.data[0];
                            // $scope.cascadetaluk($scope.objprofile.districtid);
                            // $scope.cascadedistrict($scope.objprofile.regionid);
                            $scope.getDistrictDetailsEdit($scope.objprofile.regionid, $scope.objprofile.districtid, $scope.objprofile.talukid);
                            setTimeout(function() {
                                $('.month_year').datepicker({
                                    format: 'dd MM yyyy',
                                    autoClose:true,
                                });
                                
                                $(".month_year").datepicker().on("changeDate", function(e) {
                                    $('.datepicker-dropdown').hide();
                                });
                            },500);   
                        }
                    }, function errorCallback(response) {
                        Materialize.toast('Something has gone wrong!', 3000, 'red');
                    });
                } else {
                    Materialize.toast('Texco Number Not Found!', 3000, 'red');
                }
			} else {
                Materialize.toast('Texco Number Not Found!', 3000, 'red');
            }
		}, function errorCallback(response) {
			Materialize.toast('Something has gone wrong!', 3000, 'red');
		}); 
    }


    $scope.searchmembersafterreg = function (texserno) {
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


    $scope.searchmember = function (serviceno) {
		$http({
			method: 'GET', 
            headers : {
                "Authorization" : atoken
            },
			url: api_url + "/getmembersearch?membersearchval=" + serviceno,
		}).then(function successCallback(response) {
            debugger
			if (response.status = 200) {
                // console.log('response', response);
                $scope.members = response.data[0];
                if(response.data[0]) {
                    $http({
                        method: 'GET', 
                        headers : {
                            "Authorization" : atoken
                        },
                        url: api_url + "/members/" + $scope.members.memberid,
                    }).then(function successCallback(response) { 
                        debugger
                        $(".input-field label").addClass("active");
                        if (response.status = 200) {
                            $scope.objprofile = response.data[0];
                            debugger
                            $scope.getDistrictDetailsEdit($scope.objprofile.regionid, $scope.objprofile.districtid, $scope.objprofile.talukid);
                            //$scope.cascadetaluk($scope.objprofile.districtid);
                            // $scope.getDistrictDetails($scope.objprofile.regionid);
                            // $scope.getTalukDetails($scope.objprofile.districtid);
                            //$scope.cascadedistrict($scope.objprofile.regionid);
                            setTimeout(function() {
                                $('.month_year').datepicker({
                                    format: 'dd MM yyyy',
                                    autoClose:true,
                                });
                                
                                $(".month_year").datepicker().on("changeDate", function(e) {
                                    $('.datepicker-dropdown').hide();
                                });
                            },500);   
                        }
                    }, function errorCallback(response) {
                        Materialize.toast('Something has gone wrong!', 3000, 'red');
                    });
                } else {
                    Materialize.toast('Texco Number Not Found!', 3000, 'red');
                }
			} else {
                Materialize.toast('Texco Number Not Found!', 3000, 'red');
            }
		}, function errorCallback(response) {
			Materialize.toast('Something has gone wrong!', 3000, 'red');
		});
	};

    //get characterid for CHaracter
    $http({
        method: 'GET', 
        headers : {
            "Authorization" : atoken
        },
        url: api_url + "/lookupvalues/lookupvalueid?lkdmcode=CHARCTER&code=GOOD",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.chselected = response.data.lkvalid;
            $scope.objregister.characterid = $scope.chselected;
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });

      //Get memberinfo
    $scope.getservicenoexist = function(serviceno) {
        $scope.servicenovalid = '';
      $("#failure").html("");
        $http({
            url: api_url + "/memberinfo?texserno=" + serviceno,
            data: $.param({
                texserno: serviceno
            }), 
            headers : {
                "Authorization" : atoken
            },
            method: 'GET',
        }).success(function(response, result) {
            if (result = 200) {
               $scope.servicenovalid = "Exist";
               $scope.DisableButton = false;
            }
        }).error(function(error) {
         
        });
    }


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

    // Get Selected members
    $scope.select = function(member) {
        $scope.selected = member;
        
        $scope.getDistrictDetailsEdit(member.regionid, member.districtid, member.talukid);
        $scope.objmember.memberid = member.memberid;
        $scope.objmember.firstname = member.firstname;
        $scope.objmember.lastname = member.lastname;
        $scope.objmember.fathername = member.fathername;
        $scope.objmember.dob = member.dob;
        $scope.objmember.age = member.age;
        $scope.objmember.email = member.email;
        $scope.objmember.mobile = member.mobile;
        $scope.objmember.doj = member.doj;
        $scope.objmember.genderid = member.genderid;
        $scope.objmember.pincode = member.pincode;
        $scope.objmember.regionid = member.regionid;
        $scope.objmember.accountno = member.accountno;
        $scope.objmember.address = member.address;
        $scope.objmember.village = member.village;
        //$scope.objmember.districtid = member.districtid;
        //$scope.objmember.talukid = member.talukid;
        $scope.objmember.stateid = member.stateid;
        $scope.objmember.countryid = member.countryid;
        $scope.objmember.addressstatus = member.addressstatus;
        $scope.objmember.communicationaddress = member.communicationaddress;
        $scope.objmember.aadhaarno = member.aadhaarno;
        $scope.objmember.nominee = member.nominee;
        $scope.objmember.nomineerelationid = member.nomineerelationid;
        $scope.objmember.rankid = member.rankid;
        $scope.objmember.corpsid = member.corpsid;
        $scope.objmember.tradeid = member.tradeid;
        $scope.objmember.corps = member.corps;
        $scope.objmember.trade = member.trade;
        $scope.objmember.esmidno = member.esmidno;
        $scope.objmember.characterid = member.characterid;
        $scope.objmember.religionid = member.religionid;
        $scope.objmember.casteid = member.casteid;
        $scope.objmember.civilqual = member.civilqual;
        $scope.objmember.armyqual = member.armyqual;
        $scope.objmember.registrationno = member.registrationno;
        $scope.objmember.lastaccess = member.lastaccess;
        $scope.objmember.texcono = member.texcono;
        $scope.objmember.serviceno = member.serviceno;
        $scope.objmember.dependentstatus = member.dependentstatus;
        $scope.objmember.dependentname = member.dependentname;
        $scope.objmember.panno = member.panno;
        $scope.objmember.uanno = member.uanno;
        $scope.objmember.ifsccode = member.ifsccode;
        $scope.objmember.branchname = member.branchname;
        $scope.objmember.branchcode = member.branchcode;
    }

    // Add Member New objects
    $scope.addmember = function() {
        $scope.objmember = {};
        $scope.submitted = false;
        $scope.objmember.countryid =   $scope.cselected.lkvalid;
        $scope.objmember.stateid =   $scope.sselected.lkvalid;
        $scope.objmember.characterid = $scope.chselected;
        $scope.objmember.genderid =   0;
        $('#mcaption').text("Add Employee");
        $('#modal1').modal('open');
        $("#failure").html("");
        //  $scope.functions= 'add';
        //  $scope.captchaValid = {};
    }

    $scope.editmember = function() {
        $scope.submitted = false;
        $scope.functions = 'add';
        $scope.select($scope.selected);
        $scope.cascadetaluk($scope.objmember.districtid);
        $scope.cascadedistrict($scope.objmember.regionid);
        $('#mcaption').text("Edit Employee");
        $("label").addClass("active");
        $('#modal1').modal('open');
        $("#failure").html("");
        // $scope.functions= 'edit';
    }

    $scope.editprofile = function() {
        $scope.select($scope.selected);
        $("label").addClass("active");
        $('#modal1').modal('open');
    }

    $scope.cancelregister = function() {
        window.location.reload(true);
    }

    $scope.SelectIFSC = function(ifsccode) {
        
        $http({
            method: 'GET', 
            headers : {
                "Authorization" : atoken
            },
            url: api_url + "/member/getIFSCCode?ifsccode=" + angular.uppercase(ifsccode),
        }).then(function successCallback(response) {
            if (response.status = 200) {
                var data = response.data;
                $scope.objprofile.branchname = data.BRANCH;
                $scope.objprofile.branchcode = data.IFSC.substr(-6);
            } else {
                Materialize.toast('error', 3000, 'red');
            }
        }, function errorCallback(response) {
            Materialize.toast('error', 3000, 'red');
        });
    }


    // SAVE MEMBER - In both apply and member
     // SAVE MEMBER - In both apply and member
    $scope.savemember = function(data) {
      //  alert('reaady');
      alert(data.agree);
      if(data.agree==undefined || data.agree==0)
      {
          $scope.valshow=0;
        return;
      }
     
        $scope.isDisabled = true;
        $scope.DisableButton = true;
        if (data.dependentstatus == true) {
            data.dependentstatus = 1;

        } else {
            data.dependentstatus = 0;
            data.dependentname = null;
        }
        if (data.addressstatus == true) {
            data.addressstatus = 1;
        } else {
            data.addressstatus = 0;
        }
        var method;
        if (data.memberid > 0) {
            method = 'PUT';
        } else {
            method = 'POST';
        }
        $http({
            url: api_url + "/members",
            data: $.param({
                "memberid": data.memberid,
                "firstname": data.firstname,
                "lastname": data.lastname,
                "fathername": data.fathername,
                "dob": data.dob,
                "email": data.email,
                "mobile": data.mobile,
                "doj": data.doj,
                "genderid": data.genderid,
                "pincode": data.pincode,
                "regionid": data.regionid,
                "districtid": data.districtid,
                "accountno": data.accountno,
                "address": data.address,
                "village": data.village,
                "talukid": data.talukid,
                "stateid": data.stateid,
                "countryid": data.countryid,
                "addressstatus": data.addressstatus,
                "communicationaddress": data.communicationaddress,
                "aadhaarno": data.aadhaarno,
                "nominee": data.nominee,
                "nomineerelationid": data.nomineerelationid,
                "rankid": data.rankid,
                "corpsid": data.corpsid,
                "tradeid": data.tradeid,
                "esmidno": data.esmidno,
                "characterid": data.characterid,
                "religionid": data.religionid,
                "casteid": data.casteid,
                "civilqual": data.civilqual,
                "armyqual": data.armyqual,
                "dependentstatus": data.dependentstatus,
                "dependentname": data.dependentname,
                "registrationno": data.registrationno,
                "lastaccess": data.lastaccess,
                "texcono": data.texcono,
                "serviceno": data.serviceno,
                "changedby": data.changedby,
                "panno" : data.panno,
                "uanno" : data.uanno,
                "ifsccode":data.ifsccode,
                "branchname":data.branchname,
                "branchcode":data.branchcode
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : atoken
            },
            method: method,
        }).success(function(response, result) {
            if (result = 200) {

                // if($scope.skillpage ==1)
                // {
                //     $scope.searchmembersafterreg(data.serviceno);
                // }
                
                $http({
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization' : atoken
                    },
                    url: api_url + "/members/" + response.memberid,
                }).then(function successCallback(response) {
                    $scope.DisableButton = false;
                    $scope.isDisabled = false;
                    if (response.status = 200) {
                        if ($scope.objregister.firstname == undefined && $scope.objprofile.firstname == undefined) {
                            Materialize.toast('Employee saved Successfully !', 3000, 'green');
                        }
                        if (data.memberid > 0) {
                            $scope.select(response.data[0]);
                        } else {
                            $scope.members.unshift(response.data[0]);
                            $scope.select($scope.members[0]);
                        }
                    } else {
                        Materialize.toast(response.msg, 3000, 'red');
                    }
                }, function errorCallback(response) {
                    Materialize.toast('Something has gone wrong!', 3000, 'red');
                });
            } 
            $(".modal").modal("close");
            if ($scope.objregister.firstname != undefined) {
                Materialize.toast('Registeration Successful', 3000, 'green');
                $scope.DisableButton = false;
                $scope.isDisabled = false;
                // if($scope.skillpage ==0)
                // {
                setTimeout(function() {
                    window.location.reload(true);
                    window.location.href = base_url + "vacancy";
                }, 1500);
          //  }

            }
            if ($scope.objprofile.firstname != undefined) {
                $scope.isDisabled = false;
                Materialize.toast('Profile Updated Successfully', 3000, 'green');
                localStorage.setItem('MemberSearchValue',data.serviceno);
                // setTimeout(function() {
                //    window.location.reload(true)
                //     //window.location.href = base_url + "admin/member";
                // },1500);
            }
        }).error(function(error) { 
            $scope.isDisabled = false;
            $scope.DisableButton = false;
            //$('#failure').html(error);
            Materialize.toast(error, 3000, 'red');
        });
    };

    if (memberid > 0) {
        // Get members by id
        $http({
            method: 'GET', 
            headers : {
                "Authorization" : atoken
            },
            url: api_url + "/members/" + memberid,
        }).then(function successCallback(response) {
            if (response.status = 200) {
                $scope.objprofile = response.data[0];
                $scope.cascadetaluk($scope.objprofile.districtid);
                $scope.cascadedistrict($scope.objprofile.regionid);
                $("label").addClass("active");
            }
        }, function errorCallback(response) {
            Materialize.toast('Something has gone wrong!', 3000, 'red');
        });
    }
    // Delete member
    $scope.removemember = function(memberid) {
        if (confirm("Are you sure to delete this detail?")) {
            $http({
                url: api_url + "/members",
                data: $.param({
                    memberid: memberid
                }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    "Authorization" : atoken
                },
                method: 'DELETE',
            }).success(function(response, result) {
                if (result = 200) {
                    window.location.reload(true);
                }
            }).error(function(error) {
                $scope.error = error;
            });
        };
    }
   
    if (memberid > 0) {
        $scope.jobactivity = function() {
            $http({
                method: 'GET', 
                headers : {
                    "Authorization" : atoken
                },
                url: api_url + "/job/jobactivity/member?memberid=" + memberid,
            }).then(function successCallback(response) {
                if (response.status = 200) {
                    var data = response.data;
                    $scope.confirm = response.data;
                    $scope.tableParams = new NgTableParams({
                        page: 1,
                        count: 100000
                    }, {
                        data: data
                    });
                    $scope.totalItems = response.data.length;
                } else {
                    Materialize.toast('error', 3000, 'red');
                }
            }, function errorCallback(response) {
                Materialize.toast('error', 3000, 'red');
            });
        };
        $scope.jobactivity();
    }

    $scope.searchbydate = function(startdate, enddate) {
        if ((startdate != "" && enddate != "") && (startdate != undefined && enddate != undefined)) {
            var confirm = $scope.confirm;
            var filtered = [];
            var startdate = new Date(startdate);
            var enddate = new Date(enddate);
            angular.forEach(confirm, function(confirm) {
                applieddate = new Date(confirm.effectivedate);
                if (applieddate >= startdate && applieddate <= enddate) {
                    filtered.push(confirm);
                }
            });
            $scope.tableParams = new NgTableParams({
                page: 1,
                count: 10
            }, {
                data: filtered
            });
        } else {
            $scope.jobactivity();
        }
    };
});