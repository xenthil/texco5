var app = angular.module('appadminattendance', ['ngTable', 'ui.bootstrap']);
app.controller('ctrladminattendance', function($scope, $http, $filter, NgTableParams) {

    $scope.attendancedetails = [];
    $scope.selected = {};
    $scope.objattendance = {};
    $scope.attendance = [];
	$scope.totaldays = 0;
	$scope.totalhours = 0;

    // Get Clients
    $scope.clients = [];
    $http({
        method: 'GET',
        url: api_url + "/client",
        headers: {
            'Authorization' : atoken
        }, 
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
        url: api_url + "/client/project",
        headers: {
            'Authorization' : atoken
        }, 
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

    //Edit agreementproject
    $scope.fillclientproject = function(projectid) {
        $scope.objattendance.monthandyear = "";

        $http({
            method: 'GET',
            headers: {
                'Authorization' : atoken
            }, 
            url: api_url + "/prjectnos",
        }).then(function successCallback(response) {
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

    $scope.getmembers = function(clientid, projectid) {
        $scope.memberdetails = [];
        $http({
            method: 'GET',
            headers: {
                'Authorization' : atoken
            }, 
            url: api_url + "/client/attendance/" + clientid,
        }).then(function successCallback(response) {

            if (response.status = 200) {
                var data = response.data;
                $scope.tableParams = new NgTableParams({
                    page: 1,
                    count: response.data.length
                }, {
                    data: data
                });
                $scope.memberdetails = response.data;

                $scope.members = [];
                var obj = {}
                for (obj of $scope.memberdetails) {
                    if (obj.projectid == projectid) {
                        $scope.members.push(obj);
                    }
                }

            } else {
                Materialize.toast('error', 3000, 'red');
            }
        }, function errorCallback(response) {
            Materialize.toast('error', 3000, 'red');
        });
    }

    $scope.saveattendance = function(objattendance, members) {
        $http({
            method: 'POST',
            url: api_url + "/client/attendance",
            data: $.param({
                "clientid": objattendance.clientid,
                "projectid": objattendance.projectid,
                "members": members,
                "monthandyear": objattendance.monthandyear,
                "changedby": objattendance.changedby
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : atoken
            }, 
        }).success(function(response, result) {
            if (response.status = 200) {
                Materialize.toast('Attendance Saved succsessfully', 4000, 'green') // 4000 is the duration of the toast
                setTimeout(function(){ window.location.href = base_url + "admin/adminattendance"; }, 3000);

            }
            else
            {
               $('#failure').html(response); 
            }
        }).error(function(error) {
            $('#failure').html(error);
        });
    };

    $scope.editattendance = function(monthandyear, clientid, projectid) {
        $('#failure').html("");
        $scope.members = [];
        $http({
            method: 'GET',
            headers: {
                'Authorization' : atoken
            }, 
            url: api_url + "/client/attendancedetails?projectid=" + projectid + "&monthandyear=" + monthandyear,
        }).then(function successCallback(response) {

            if (response.status = 200) {
                if (response.data.length != 0) {
                    $scope.members = response.data[0].members;
                    console.log(JSON.stringify($scope.members));
                } else {
                    $scope.getmembers(clientid, projectid);
                }
            } else {
                Materialize.toast('error', 3000, 'red');
            }
        }, function errorCallback(response) {
            Materialize.toast('error', 3000, 'red');
        });
    };

    $scope.$watch('members', function(members) {
        $scope.count = [];
        $scope.values = {};
        var totaldays = 0;
		var totalhours = 0;
		var PresentItems = 0;
        var od1Items = 0;
        var od2Items = 0;
        angular.forEach(members, function(member) {

            PresentItems += (member.one == 1) ? 1 : 0;
            PresentItems += (member.two == 1) ? 1 : 0;
            PresentItems += (member.three == 1) ? 1 : 0;
            PresentItems += (member.four == 1) ? 1 : 0;
            PresentItems += (member.five == 1) ? 1 : 0;
            PresentItems += (member.six == 1) ? 1 : 0;
            PresentItems += (member.seven == 1) ? 1 : 0;
            PresentItems += (member.eight == 1) ? 1 : 0;
            PresentItems += (member.nine == 1) ? 1 : 0;
            PresentItems += (member.ten == 1) ? 1 : 0;
            PresentItems += (member.eleven == 1) ? 1 : 0;
            PresentItems += (member.twelve == 1) ? 1 : 0;
            PresentItems += (member.thirteen == 1) ? 1 : 0;
            PresentItems += (member.fourteen == 1) ? 1 : 0;
            PresentItems += (member.fifteen == 1) ? 1 : 0;
            PresentItems += (member.sixteen == 1) ? 1 : 0;
            PresentItems += (member.seventeen == 1) ? 1 : 0;
            PresentItems += (member.eighteen == 1) ? 1 : 0;
            PresentItems += (member.nineteen == 1) ? 1 : 0;
            PresentItems += (member.twenty == 1) ? 1 : 0;
            PresentItems += (member.twentyone == 1) ? 1 : 0;
            PresentItems += (member.twentytwo == 1) ? 1 : 0;
            PresentItems += (member.twentythree == 1) ? 1 : 0;
            PresentItems += (member.twentyfour == 1) ? 1 : 0;
            PresentItems += (member.twentyfive == 1) ? 1 : 0;
            PresentItems += (member.twentysix == 1) ? 1 : 0;
            PresentItems += (member.twentyseven == 1) ? 1 : 0;
            PresentItems += (member.twentyeight == 1) ? 1 : 0;
            PresentItems += (member.twentynine == 1) ? 1 : 0;
            PresentItems += (member.thirty == 1) ? 1 : 0;
            PresentItems += (member.thirtyone == 1) ? 1 : 0;

            if (member.jobcode != 'DVR') {

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
                od1Items += (member.od1twentyeight == 1) ? 1 : 0;
                od1Items += (member.od1twentynine == 1) ? 1 : 0;
                od1Items += (member.od1thirty == 1) ? 1 : 0;
                od1Items += (member.od1thirtyone == 1) ? 1 : 0;
				
            } else {
				
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
                od1Items = Number(od1Items);
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
				
            if (member.one == 1)
                member.valone = 1
            if (member.od1one == 1)
                member.valone = 2
            if (member.od2one == 1)
                member.valone = 3

            if (member.two == 1)
                member.valtwo = 1
            if (member.od1two == 1)
                member.valtwo = 2
            if (member.od2two == 1)
                member.valtwo = 3

            if (member.three == 1)
                member.valthree = 1
            if (member.od1three == 1)
                member.valthree = 2
            if (member.od2three == 1)
                member.valthree = 3

            if (member.four == 1)
                member.valfour = 1
            if (member.od1four == 1)
                member.valfour = 2
            if (member.od2four == 1)
                member.valfour = 3

            if (member.five == 1)
                member.valfive = 1
            if (member.od1five == 1)
                member.valfive = 2
            if (member.od2five == 1)
                member.valfive = 3

            if (member.six == 1)
                member.valsix = 1
            if (member.od1six == 1)
                member.valsix = 2
            if (member.od2six == 1)
                member.valsix = 3

            if (member.seven == 1)
                member.valseven = 1
            if (member.od1seven == 1)
                member.valseven = 2
            if (member.od2seven == 1)
                member.valseven = 3

            if (member.eight == 1)
                member.valeight = 1
            if (member.od1eight == 1)
                member.valeight = 2
            if (member.od2eight == 1)
                member.valeight = 3

            if (member.nine == 1)
                member.valnine = 1
            if (member.od1nine == 1)
                member.valnine = 2
            if (member.od2nine == 1)
                member.valnine = 3

            if (member.ten == 1)
                member.valten = 1
            if (member.od1ten == 1)
                member.valten = 2
            if (member.od2ten == 1)
                member.valten = 3

            if (member.eleven == 1)
                member.valeleven = 1
            if (member.od1eleven == 1)
                member.valeleven = 2
            if (member.od2eleven == 1)
                member.valeleven = 3

            if (member.twelve == 1)
                member.valtwelve = 1
            if (member.od1twelve == 1)
                member.valtwelve = 2
            if (member.od2twelve == 1)
                member.valtwelve = 3

            if (member.thirteen == 1)
                member.valthirteen = 1
            if (member.od1thirteen == 1)
                member.valthirteen = 2
            if (member.od2thirteen == 1)
                member.valthirteen = 3

            if (member.fourteen == 1)
                member.valfourteen = 1
            if (member.od1fourteen == 1)
                member.valfourteen = 2
            if (member.od2fourteen == 1)
                member.valfourteen = 3

            if (member.fifteen == 1)
                member.valfifteen = 1
            if (member.od1fifteen == 1)
                member.valfifteen = 2
            if (member.od2fifteen == 1)
                member.valfifteen = 3

            if (member.sixteen == 1)
                member.valsixteen = 1
            if (member.od1sixteen == 1)
                member.valsixteen = 2
            if (member.od2sixteen == 1)
                member.valsixteen = 3

            if (member.seventeen == 1)
                member.valseventeen = 1
            if (member.od1seventeen == 1)
                member.valseventeen = 2
            if (member.od2seventeen == 1)
                member.valseventeen = 3

            if (member.eighteen == 1)
                member.valeighteen = 1
            if (member.od1eighteen == 1)
                member.valeighteen = 2
            if (member.od2eighteen == 1)
                member.valeighteen = 3

            if (member.nineteen == 1)
                member.valnineteen = 1
            if (member.od1nineteen == 1)
                member.valnineteen = 2
            if (member.od2nineteen == 1)
                member.valnineteen = 3

            if (member.twenty == 1)
                member.valtwenty = 1
            if (member.od1twenty == 1)
                member.valtwenty = 2
            if (member.od2twenty == 1)
                member.valtwenty = 3

            if (member.twentyone == 1)
                member.valtwentyone = 1
            if (member.od1twentyone == 1)
                member.valtwentyone = 2
            if (member.od2twentyone == 1)
                member.valtwentyone = 3

            if (member.twentytwo == 1)
                member.valtwentytwo = 1
            if (member.od1twentytwo == 1)
                member.valtwentytwo = 2
            if (member.od2twentytwo == 1)
                member.valtwentytwo = 3

            if (member.twentythree == 1)
                member.valtwentythree = 1
            if (member.od1twentythree == 1)
                member.valtwentythree = 2
            if (member.od2twentythree == 1)
                member.valtwentythree = 3

            if (member.twentyfour == 1)
                member.valtwentyfour = 1
            if (member.od1twentyfour == 1)
                member.valtwentyfour = 2
            if (member.od2twentyfour == 1)
                member.valtwentyfour = 3

            if (member.twentyfive == 1)
                member.valtwentyfive = 1
            if (member.od1twentyfive == 1)
                member.valtwentyfive = 2
            if (member.od2twentyfive == 1)
                member.valtwentyfive = 3

            if (member.twentysix == 1)
                member.valtwentysix = 1
            if (member.od1twentysix == 1)
                member.valtwentysix = 2
            if (member.od2twentysix == 1)
                member.valtwentysix = 3

            if (member.twentyseven == 1)
                member.valtwentyseven = 1
            if (member.od1twentyseven == 1)
                member.valtwentyseven = 2
            if (member.od2twentyseven == 1)
                member.valtwentyseven = 3

            if (member.twentyeight == 1)
                member.valtwentyeight = 1
            if (member.od1twentyeight == 1)
                member.valtwentyeight = 2
            if (member.od2twentyeight == 1)
                member.valtwentyeight = 3

            if (member.twentynine == 1)
                member.valtwentynine = 1
            if (member.od1twentynine == 1)
                member.valtwentynine = 2
            if (member.od2twentynine == 1)
                member.valtwentynine = 3

            if (member.thirty == 1)
                member.valthirty = 1
            if (member.od1thirty == 1)
                member.valthirty = 2
            if (member.od2thirty == 1)
                member.valthirty = 3

            if (member.thirtyone == 1)
                member.valthirtyone = 1
            if (member.od1thirtyone == 1)
                member.valthirtyone = 2
            if (member.od2thirtyone == 1)
                member.valthirtyone = 3
			
			member.pdays = Number(PresentItems);
			member.presentdays = Number(PresentItems) + Number(od1Items) + Number(od2Items);
			member.othours = 0;
			
			$scope.totaldays += Number(member.presentdays)/2;
			
			}
			else
			{
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

            if (member.thirtyone == 1)
                member.valthirtyone = Number(member.thirtyone) + Number(member.od1thirtyone);
			
			
				member.pdays = Number(PresentItems);
				member.presentdays = Number(PresentItems) ;
				member.othours = parseFloat(od1Items);
				
				$scope.totaldays += Number(member.presentdays)/2;
				
			}
			
			
						
            member.od1Items = od1Items;
            member.od2Items = od2Items;
            PresentItems = 0;
            od1Items = 0;
            od2Items = 0;
			
			console.log($scope.totaldays);
			console.log($scope.totalhours);
			
        })
        
    }, true);

    $scope.cancelattendence = function() {
        window.location.reload(true);
    };

    $scope.UploadFile = function(files) {
        $("input").removeClass("disabled");
        $scope.$apply(function() { //I have used $scope.$apply because I will call this function from File input type control which is not supported 2 way binding
            $scope.Message = "";
            $scope.SelectedFileForUpload = files[0];
        })
    }

    $scope.ParseExcelDataAndSave = function() {
        $scope.attendances = [];
        var file = $scope.SelectedFileForUpload;
        if (file) {
            var reader = new FileReader();
            reader.onload = function(e) {
                var data = e.target.result;
                //XLSX from js-xlsx library , which I will add in page view page
                var workbook = XLSX.read(data, {
                    type: 'binary'
                });
                var sheetName = workbook.SheetNames[0];
                var excelData = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                if (excelData.length > 0) {
                    $scope.attendances.push(excelData)

                    $http({
                        url: api_url + "/client/attendance/import/",
                        data: $.param({
                            attendance: $scope.attendances
                        }),
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Authorization' : atoken
                        }, 
                        method: 'POST',
                    }).success(function(response, result) {
                        if (result = 200) {
                            $scope.Message = "Attendance is uploaded successfully";
                            //$("input").addClass("disabled"); 
                            angular.element("input[type='text']").val(null);
                        }
                    }).error(function(error) {
                        Materialize.toast(error, 3000, 'red');
                    });
                } else {
                    $scope.Message = "No data found";
                }
            }
            reader.onerror = function(ex) {
                console.log(ex);
            }
            reader.readAsBinaryString(file);
        }
    }

    $scope.monthclear = function() {
        $scope.objattendance.monthandyear = "";
    }
});