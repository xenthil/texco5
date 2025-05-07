var app = angular.module('appadminApply', []);
app.controller('ctrladminApply', function($scope, $http, $location, $window) {
    $scope.jobpostingdetail = {};
    $scope.state = [];
    $scope.country = [];
    $scope.relations = [];
    $scope.jobprint = {};
    $scope.id = 0;
    $scope.servicenovalid = {};
    $scope.disableview = false;

    $scope.inplaceothercat = function(data, postingdetail) {
        $scope.inplace = {};
        $scope.jobprint = data;
        $scope.jobprint.jobcode = postingdetail.code;
        $scope.jobprint.projectno = postingdetail.projectno;
        var arr = postingdetail.inplace;
        if (arr != null) {
            if (arr.length > 0) {
                arr = arr.split(',');
                $scope.inplace.inplace = arr.shift();
                $scope.inplace.jobinplace = arr.join();
                console.log($scope.inplace.jobinplace);
            }
        }
        $('#modal1').modal('open');
    };

    $http({
        method: 'GET',
        headers : {
            "Authorization" : atoken
        },
        url: api_url + "/job/jobposting/detail?jobpostingdetailid=" + jobpostingdetailid,
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.postingdetail = response.data;
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });

    //Get memberinfo
    $scope.memberinfo = function(texserno) {
      $("#failure").html("");
      $("#failure1").html("");
      $("#failure2").html("");
      $scope.disableview = true;
        $http({
            url: api_url + "/memberinfo?texserno=" + $scope.objapply.texserno,
            data: $.param({
                texserno: texserno
            }),
            headers : {
                "Authorization" : atoken
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
            url: api_url + "/memberinfologin?texserno=" + serviceno,
            data: $.param({
                texserno: serviceno
            }),
            headers : {
                "Authorization" : atoken
            },
            method: 'GET',
        }).success(function(response, result) {
            if (result = 200) {
                $('#Existingmember').show();
                $scope.objapply = response;
                $('label').addClass('active');
                $('#lblregister').removeClass('active');
            }
        }).error(function(error) {
          $('#failure').html(error);
          $('#Existingmember').hide();
        });
    }
    var vacancyurl = $location.absUrl().split('apply')[0];
    $scope.saveapply = function(objapply, postingdetail, inplace) {
        if (objapply.memberid > 0) {
            //job activity
            $http({
                url: api_url + "/job/jobactivity",
                data: $.param({
                    jobpostingdetailid: postingdetail.jobpostingdetailid,
                    memberid: objapply.memberid,
                    clientid: postingdetail.clientid,
                    projectid: postingdetail.projectid,
                    code: postingdetail.code,
                    currentvacancies: postingdetail.numberofvacancies,
                    texcono: objapply.texcono, 
                    inplace : inplace.inplace,
                    othercat : inplace.othercat
                }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization' : atoken
                }, 
                method: 'POST',
            }).success(function(response, result) {
                if (result = 200) {
                    $scope.jobconfirm(response.jobactivityid, objapply.memberid, '', postingdetail.code);
                    
                    }

                
            }).error(function(error) {
                $('#failure2').html(error);
            });
        }
    }

    $scope.jobconfirm = function(jobactivityid, memberid, confirmdate, jobcode) {
        
        $http({
            method: 'POST',
            url: api_url + "/job/jobactivity/status",
            data: $.param({
                "jobactivityid": jobactivityid,
                "memberid": memberid,
                "confirmdate": confirmdate,
                "jobcode": jobcode
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : atoken
            }, 
        }).success(function(response, result) {
            if (response.includes("success")) {
                window.location.href = base_url + "admin/vacancy";
                var win = window.open(base_url + "admin/printposting?jobactivityid=" + jobactivityid, '_blank');
                if (win) {
                    win.focus();
                } else {
                     Materialize.toast('Please allow popups for this website!', 4000, 'orange') // 4000 is the duration of the toast
                }
            }
            else if(response.includes("failure"))
            {
                Materialize.toast('Employee already confirmed', 3000, 'red');
            }
            else if(response.includes("vacancy"))
            {
                Materialize.toast('Vacancys filled', 3000, 'red');
            }
             else {
                Materialize.toast('error', 3000, 'red');
            }
        }).error(function(error) {
            $('#failure').html(error);
        });
    };

    $scope.cancelapply = function() {
      window.location.reload(true);
    }});