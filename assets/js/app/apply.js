var app = angular.module('appApply', []);
//app.constant("moment", moment);
app.controller('ctrlApply', function($scope,$interval ,$http, $location, $window, $timeout) {
    $scope.jobpostingdetail = {};
    $scope.state = [];
    $scope.country = [];
    $scope.relations = [];
    $scope.jobprint = {};
    $scope.id = 0;
    $scope.jobactivityid = 0;
    $scope.memberid = 0;
    $scope.servicenovalid = {};
    $scope.servicetexno = '';
    $scope.isDisabled = false;
    $scope.disableview = false;
    $scope.rank = [];
    $scope.ipaddress = "";
    
    //https://ipapi.co/json/
    $.getJSON("https://ipapi.co/json/?key=q6fDJmxmTKR03Q6XVRFES10wQCoJKrsIaHpjipiPdoas64cjoj", function (data) {
        $scope.ipaddress = data.ip + "-" + data.city;
    })
    // console.log('$scope.ipaddress',$scope.ipaddress);
    // Get Ranks
    $http({
        method: 'GET', 
        headers: {
            'Authorization' : atoken
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

    // Get States
    $http({
        method: 'GET', 
        headers: {
            'Authorization' : atoken
        }, 
        url: api_url + "/lookupvalues?lkdmcode=STATE",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.state = response.data.lookupvalues;
            if ($scope.state.length > 0) {
                $scope.sselected = $scope.state[1];
            }
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });

    // Get Country
    $http({
        method: 'GET', 
        headers: {
            'Authorization' : atoken
        }, 
        url: api_url + "/lookupvalues?lkdmcode=CNTRY",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.country = response.data.lookupvalues;
            if ($scope.country.length > 0) {
                $scope.cselected = $scope.country[0];
            }
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });

    // Get Religion
    $scope.religion = [];
    $http({
        method: 'GET', 
        headers: {
            'Authorization' : atoken
        }, 
        url: api_url + "/lookupvalues?lkdmcode=RELIGION",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.religion = response.data.lookupvalues;
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });

    // Get Caste
    $scope.caste = [];
    $http({
        method: 'GET', 
        headers: {
            'Authorization' : atoken
        }, 
        url: api_url + "/lookupvalues?lkdmcode=CASTE",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.caste = response.data.lookupvalues;
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });

    // Get character
    $scope.character = [];
    $http({
        method: 'GET', 
        headers: {
            'Authorization' : atoken
        }, 
        url: api_url + "/lookupvalues?lkdmcode=CHARCTER",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.character = response.data.lookupvalues;
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });

    //get characterid for CHaracter
    $http({
        method: 'GET', 
        headers: {
            'Authorization' : atoken
        }, 
        url: api_url + "/lookupvalues/lookupvalueid?lkdmcode=CHARCTER&code=GOOD",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.chselected = response.data.lkvalid;
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });

    // Get Nominee Relations
    $http({
        method: 'GET', 
        headers: {
            'Authorization' : atoken
        }, 
        url: api_url + "/lookupvalues?lkdmcode=NMERL",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.relations = response.data.lookupvalues;
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

    // Get alldistrict
    $scope.alldistrict = [];
    $http({
        method: 'GET', 
        headers: {
            'Authorization' : atoken
        }, 
        url: api_url + "/lookupvalues?lkdmcode=DISTRC",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.alldistrict = response.data.lookupvalues;
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });

    // Get district
    $scope.district = [];
    $scope.cascadedistrict = function(regionid) {
        angular.forEach($scope.region, function(region) {
            if (region.lkvalid == regionid) {
                $scope.district = region.lookupitems;
                return;
            }
        });
    }

    // Get Ranks
    $scope.rank = [];
    $http({
        method: 'GET', 
        headers: {
            'Authorization' : atoken
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


    // Get corps
    $scope.corp = [];
    $http({
        method: 'GET', 
        headers: {
            'Authorization' : atoken
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
    $scope.trades = [];
    $http({
        method: 'GET', 
        headers: {
            'Authorization' : atoken
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

    $http({
        method: 'GET', 
        headers: {
            'Authorization' : atoken
        }, 
        url: api_url + "/job/jobposting/detail?jobpostingdetailid=" + jobpostingdetailid,
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.postingdetail = response.data;
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });

    //addmember
    $scope.addmember = function() {
        $scope.objapply = {};
        $scope.objmember = {};
        $scope.objmember.countryid = $scope.cselected.lkvalid;
        $scope.objmember.stateid = $scope.sselected.lkvalid;
        $scope.objmember.characterid = $scope.chselected;
        $scope.objmember.genderid = 0;
        $('#mcaption').text("Add Employee");
        $('#modal1').modal('open');
        $("#failure").html("");
        $("#failure1").html("");
        $("#failure2").html("");
    }

    $scope.otpGenerate = function(texserno) {

        $scope.texconoser=texserno;
        $scope.disableview = true;
        $scope.timerResend();

        $http({
            url: api_url + "/sendOTP?texserno=" + texserno,
            data: $.param({
                texserno: texserno
            }), 
            headers: {
                'Authorization' : atoken
            }, 
            method: 'GET',
        }).success(function(response, result) {
            if (result = 200) {
$scope.memid=response.memberid;
$('#modalotp').modal('open');

            }
        }).error(function(error) {
            $('#failure').html(error);
            $('#Existingmember').hide();
        });



   
    //$scope.searchmembers(texserno,jobid);
    }

    

        $scope.validateOTP = function(data,jobid) {
            console.log(data);
    
            $http({
                url: api_url + "/verifyotp",
                data: $.param({
                    "memberid":$scope.memid,
                    "otp": data
                }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization' : atoken
                }, 
                method: 'POST',
            }).success(function(response, result) {
                if (result = 200) {

                    $scope.searchmembers($scope.texconoser,jobid)
                    // $scope.objapply.texserno = data.serviceno;
                    // $scope.memberinfo(data.serviceno);
                    // Materialize.toast('Rank Updated Successfully', 3000, 'green');
                    // $('#modalrank').modal('close');
                }
            }).error(function(error) {
                Materialize.toast(error, 3000, 'red');
            });
        }

    $scope.searchmembers = function(texserno,jobid) {
       // alert(jobid)
        $http({
            url: base_url + "Member/checkmember_login/",
            data: $.param({
                data: texserno,

            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : atoken
            }, 
            method: 'POST',
        }).success(function(response, result) {
            console.log(response);
            if (response.includes("success")) {
                Materialize.toast('You are login is successfully', 3000, 'green');
                setTimeout(function(){ 
                    //$('#modalotp').modal('open');

//$scope.otpGenerate(texserno);
                   window.location = base_url + "member/apply?id="+jobid; 
                }, 1500);
                
            } else {
                if (response.includes("User Alredy Logged in")) {
                   // alert('User Alredy Logged in');
                    var msg='User Already Logged in'
                Materialize.toast(msg, 3000, 'red');
                }
                else
                {
                    Materialize.toast(response, 3000, 'red');  
                }
            }
        }).error(function(error) {
            Materialize.toast(error, 3000, 'red');
        });
    }
    //Get memberinfo
    $scope.memberinfo = function(texserno) {
        $scope.disableview = true;
        $("#failure").html("");
        $("#failure1").html("");
        $("#failure2").html("");
        $http({
            url: api_url + "/memberinfo?texserno=" + $scope.objapply.texserno,
            data: $.param({
                texserno: texserno
            }), 
            headers: {
                'Authorization' : atoken
            }, 
            method: 'GET',
        }).success(function(response, result) {
            if (result = 200) {
                $('#Existingmember').show();
                $scope.objapply = response;
                $('label').addClass('active');
                $('#lblregister').removeClass('active');
                $scope.disableview = false;
            }
        }).error(function(error) {
            $('#failure1').html(error);
            $scope.objapply.memberid = 0;
            $('#Existingmember').hide();
            $scope.disableview = false;
        });
    }

    //Get memberinfo
    $scope.getmemberinfo = function(serviceno) {
        $("#failure").html("");
        $("#failure1").html("");
        $("#failure2").html("");
        $http({
            url: api_url + "/memberinfologinlatest?texserno=" + serviceno,
            data: $.param({
                texserno: serviceno
            }), 
            headers: {
                'Authorization' : atoken
            }, 
            method: 'GET',
        }).success(function(response, result) {
            if (result = 200) {
                $('#Existingmember').show();
                $scope.objapply = response;
                $('label').addClass('active');
                $('#lblregister').removeClass('active');
            }
            else
            {
                $('#errormember').show(); 
            }
        }).error(function(error) {
            $('#failure').html(error);
            $('#Existingmember').hide();
            $('#errormember').show(); 
        });
    }

    if (servicetexcno != '') { 
        debugger
        $scope.getmemberinfo(servicetexcno);
    }


    //Get memberinfo
    $scope.getservicenoexist = function(serviceno) {
        $scope.servicenovalid = {};
        $("#failure").html("");
        $http({
            url: api_url + "/memberinfo?texserno=" + serviceno,
            data: $.param({
                texserno: serviceno
            }), 
            headers: {
                'Authorization' : atoken
            }, 
            method: 'GET',
        }).success(function(response, result) {
            if (result = 200) {
                $scope.servicenovalid = "Exist";
            }
        }).error(function(error) {

        });
    }


    // SAVE MEMBER - In both apply and member
    $scope.savemember = function(data) {

console.log(data)
        if (data.dependent == true) {
            var dependentstatus = 1;
        } else {
            var dependentstatus = 0;
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
                "dependentstatus": dependentstatus,
                "dependentname": data.dependentname,
                "registrationno": data.registrationno,
                "lastaccess": data.lastaccess,
                "texcono": data.texcono,
                "serviceno": data.serviceno,
                "changedby": data.changedby
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : atoken
            }, 
            method: method,
        }).success(function(response, result) {
            if (result = 200) {
                $http({
                    method: 'GET', 
                    headers: {
                        'Authorization' : atoken
                    }, 
                    url: api_url + "/members/" + response.memberid,
                }).then(function successCallback(response) {
                    if (response.status = 200) {
                        document.getElementById('Existingmember').style.display = "block";
                        $scope.objapply = response.data[0];
                        $('label').addClass('active');
                        $('#lblregister').removeClass('active');
                    }
                }, function errorCallback(response) {
                    alert("Something has gone wrong!");
                });
            }
            $(".modal").modal("close");

        }).error(function(error) {
            $('#failure').html(error);
        });
    };
    var vacancyurl = $location.absUrl().split('apply')[0];
            
    $scope.saveapply = function(objapply, postingdetail) {
        var ocxetd =localStorage.getItem("ocxetd")
       localStorage.setItem("ocxetd",  moment().format('YYYY/MM/DD HH:mm:ss'));
        
        if (objapply.memberid > 0) {
            $scope.isDisabled = true;
            $scope.memberid = objapply.memberid;
            //job activity
            $http({ 
                url: api_url + "/job/jobactivityapply",
                data: $.param({
                    jobpostingdetailid: postingdetail.jobpostingdetailid,
                    memberid: objapply.memberid,
                    clientid: postingdetail.clientid,
                    projectid: postingdetail.projectid,
                    code: postingdetail.code,
                    currentvacancies: postingdetail.numberofvacancies,
                    texcono: objapply.texcono,
                    ipaddress : $scope.ipaddress,
                    ocxetd:ocxetd
                }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization' : atoken
                }, 
                method: 'POST',
            }).success(function(response, result) {
                if (result = 200) {
                    $scope.jobactivityid = response[0].jobactivityid;
                    Materialize.toast('Job Applied Successfully', 6000, 'green') 
                    setTimeout(() => {
                        $scope.applyprint();
                        $scope.isDisabled = false;
                    }, 5000);
                } else {
                    Materialize.toast('Job Apply failed', 6000, 'red') 
                } 
            }).error(function(error) {
                if(error.includes('ER_LOCK_WAIT_TIMEOUT'))
                {
                    $('#failure2').html('Server is too busy. Please try again.');    
                }
                else if (error.includes('ER_DUP_ENTRY'))
                {
                    $('#failure2').html('You Already applied maximum number of job for this week'); 
                }
                else
                {
                    $('#failure2').html(error);    
                }
                $scope.isDisabled = false;
            });
        }
    }

    $scope.comaddress = function(data) {
        if (data.addressstatus == true) {
            $('#comaddress').addClass("active");
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
            if (data.pincode == undefined) {
                $scope.objmember.communicationaddress = data.address + ',' + data.village + ',' + $scope.ctaluk + ',' + $scope.cdistrict + ',' + $scope.cstate + ',' + $scope.ccountry;
            } else {
                $scope.objmember.communicationaddress = data.address + ',' + data.village + ',' + $scope.ctaluk + ',' + $scope.cdistrict + ',' + $scope.cstate + ',' + $scope.ccountry + ',' + data.pincode;
            }
            return;
        } else {
            $('#commaddress').removeClass("active");
            $scope.objmember.communicationaddress = "";
        }
    }

    $scope.cancelapply = function() {
        window.location.reload(true);
    }

    $scope.applyprint = function() {
        $timeout(function() {
            $window.location.href = base_url + "member/logout";
            var win = window.open(base_url + "member/printjob?jobactivityid=" + $scope.jobactivityid + "&memberid=" + $scope.memberid, '_blank');
            if (win) {
                win.focus();
            } else {
                //Browser has blocked it
                //alert('Please allow popups for this website');
                Materialize.toast('Please allow popups for this website!', 6000, 'orange') // 4000 is the duration of the toast
            }
        }, 1000);
    }

    $scope.UpdateRank = function() {
        $('#modalrank').modal('open');
    }

    $scope.SaveRank = function(data) {
        console.log(data);

        $http({
            url: api_url + "/members/update/rank",
            data: $.param({
                "memberid": data.memberid,
                "rankid": data.rankid
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : atoken
            }, 
            method: 'POST',
        }).success(function(response, result) {
            if (result = 200) {
                $scope.objapply.texserno = data.serviceno;
                $scope.memberinfo(data.serviceno);
                Materialize.toast('Rank Updated Successfully', 3000, 'green');
                $('#modalrank').modal('close');
            }
        }).error(function(error) {
            Materialize.toast('Something has gone wrong!', 3000, 'red');
        });
    }


    
    $scope.timerResend = function() {
        $scope.remainingTime = 60;
        $scope.disableResent=true;
    $scope.timeInterval=$interval(function(){
    $scope.remainingTime      =  $scope.remainingTime  - 1;
    if($scope.remainingTime<=0){
       //$interval.cancel($scope.timeInterval);
      // $scope.remainingTime=60;
      $scope.disableResent=false;
    }
}, 1000);
    }
    $scope.timerResend();
});


