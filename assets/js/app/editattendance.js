var app = angular.module('appadminattendance', ['ngTable', 'ui.bootstrap']);
app.controller('ctrladminattendance', function ($scope, $http, $filter, NgTableParams) {

    $scope.attendancedetails = [];
    $scope.selected = {};
    $scope.objattendance = {};
    $scope.attendance = [];
    $scope.objattendance.monthandyear = monthandyear;
    $scope.objattendance.projectid = projectid;
    $scope.objattendance.etype = etype;
 
    $scope.saveattendance = function (objattendance, members) {
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
        }).success(function (response, result) {
            if (response.status = 200) {
                Materialize.toast('Attendance Saved succsessfully', 4000, 'green') // 4000 is the duration of the toast
                $scope.SaveDisabled = true;
                win = window.open(base_url + "client/printreview?projectid=" + objattendance.projectid + "&monthandyear=" + objattendance.monthandyear, '_blank');
                setTimeout(() => {
                    $scope.SaveDisabled = false;
                    window.location.href = base_url + "client/dashboard"; 
                }, 3500);
            }
            else {
                $('#failure').html(response);
            }
        }).error(function (error) {
            $('#failure').html(error);
        });
    };

    function daysInThisMonth(month) {
        var val=month.getMonth();
        var yea=month.getYear();
        var now = new Date(month);
        return new Date(now.getFullYear(), now.getMonth()+1, 0).getDate();
    }
    
    $scope.editattendance = function (monthandyear, clientid, projectid,etype) {
        debugger
        var sp=$scope.objattendance.monthandyear.split(" ");
        var date="05/"+sp[0]+"/"+sp[1];
        var nda=new Date(date);
        var perd=new Date(nda);
        $scope.noOfDays=daysInThisMonth(perd);

        $('#failure').html("");
        $scope.members = [];
        $http({
            method: 'GET',
            headers: {
                'Authorization' : atoken
            }, 
            url: api_url + "/client/edit/attendancedetails?projectid=" + projectid + "&monthandyear=" + monthandyear+ "&edittype=" + etype,
        }).then(function successCallback(response) {

            if (response.status = 200) {
                if (response.data.length != 0) {
                    var data = response.data[0].members;
                    $scope.tableParams = new NgTableParams({
                        page: 1,
                        count: data.length
                    }, {
                        data: data
                    });
                    $scope.memberdetails = response.data[0].members;
                    $scope.members = response.data[0].members;
                } else {
                    Materialize.toast('No records to edit attendance', 3000, 'red');
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
        var PresentItems = 0;
        var od1Items = 0;
        var od2Items = 0;
        angular.forEach(members, function(member) {
            debugger
            PresentItems += (Number(member.one == 1)) ? 1 : 0;
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

                od1Items += (Number(member.od1one) / 8);
                od1Items += (Number(member.od1two) / 8);
                od1Items += (Number(member.od1three) / 8);
                od1Items += (Number(member.od1four) / 8);
                od1Items += (Number(member.od1five) / 8);
                od1Items += (Number(member.od1six) / 8);
                od1Items += (Number(member.od1seven) / 8);
                od1Items += (Number(member.od1eight) / 8);
                od1Items += (Number(member.od1nine) / 8);
                od1Items += (Number(member.od1ten) / 8);
                od1Items += (Number(member.od1eleven) / 8);
                od1Items += (Number(member.od1twelve) / 8);
                od1Items += (Number(member.od1thirteen) / 8);
                od1Items += (Number(member.od1fourteen) / 8);
                od1Items += (Number(member.od1fifteen) / 8);
                od1Items += (Number(member.od1sixteen) / 8);
                od1Items += (Number(member.od1seventeen) / 8);
                od1Items += (Number(member.od1eighteen) / 8);
                od1Items += (Number(member.od1nineteen) / 8);
                od1Items += (Number(member.od1twenty) / 8);
                od1Items += (Number(member.od1twentyone) / 8);
                od1Items += (Number(member.od1twentytwo) / 8);
                od1Items += (Number(member.od1twentythree) / 8);
                od1Items += (Number(member.od1twentyfour) / 8);
                od1Items += (Number(member.od1twentyfive) / 8);
                od1Items += (Number(member.od1twentysix) / 8);
                od1Items += (Number(member.od1twentyseven) / 8);
                od1Items += (Number(member.od1twentyeight) / 8);
                od1Items += (Number(member.od1twentynine) / 8);
                od1Items += (Number(member.od1thirty) / 8);
                od1Items += (Number(member.od1thirtyone) / 8);
                od1Items = Number(od1Items);
            }

            od2Items += (member.od2one == .5) ? .5 : 0;
            od2Items += (member.od2two == .5) ? .5 : 0;
            od2Items += (member.od2three == .5) ? .5 : 0;
            od2Items += (member.od2four == .5) ? .5 : 0;
            od2Items += (member.od2five == .5) ? .5 : 0;
            od2Items += (member.od2six == .5) ? .5 : 0;
            od2Items += (member.od2seven == .5) ? .5 : 0;
            od2Items += (member.od2eight == .5) ? .5 : 0;
            od2Items += (member.od2nine == .5) ? .5 : 0;
            od2Items += (member.od2ten == .5) ? .5 : 0;
            od2Items += (member.od2eleven == .5) ? .5 : 0;
            od2Items += (member.od2twelve == .5) ? .5 : 0;
            od2Items += (member.od2thirteen == .5) ? .5 : 0;
            od2Items += (member.od2fourteen == .5) ? .5 : 0;
            od2Items += (member.od2fifteen == .5) ? .5 : 0;
            od2Items += (member.od2sixteen == .5) ? .5 : 0;
            od2Items += (member.od2seventeen == .5) ? .5 : 0;
            od2Items += (member.od2eighteen == .5) ? .5 : 0;
            od2Items += (member.od2nineteen == .5) ? .5 : 0;
            od2Items += (member.od2twenty == .5) ? .5 : 0;
            od2Items += (member.od2twentyone == .5) ? .5 : 0;
            od2Items += (member.od2twentytwo == .5) ? .5 : 0;
            od2Items += (member.od2twentythree == .5) ? .5 : 0;
            od2Items += (member.od2twentyfour == .5) ? .5 : 0;
            od2Items += (member.od2twentyfive == .5) ? .5 : 0;
            od2Items += (member.od2twentysix == .5) ? .5 : 0;
            od2Items += (member.od2twentyseven == .5) ? .5 : 0;
            od2Items += (member.od2twentyeight == .5) ? .5 : 0;
            od2Items += (member.od2twentynine == .5) ? .5 : 0;
            od2Items += (member.od2thirty == .5) ? .5 : 0;
            od2Items += (member.od2thirtyone == .5) ? .5 : 0;
            debugger
			if (member.jobcode != 'DVR') {
                 if (Number(member.one) == 1)
                        member.valone = 1
                    if (member.od1one == 1)
                        member.valone += 1
                    if (member.od2one == .5)
                        member.valone +=.5
                    if (Number(member.one) == 0)
                        member.valone = 0

                   if (Number(member.two) == 1)
                        member.valtwo = 1
                    if (member.od1two == 1)
                        member.valtwo += 1
                    if (member.od2two == .5 )
                        member.valtwo +=.5
                    if (Number(member.two) == 0)
                        member.valtwo = 0

                    if (Number(member.three) == 1)
                        member.valthree = 1
                    if (member.od1three == 1)
                        member.valthree += 1
                    if (member.od2three == .5)
                        member.valthree +=.5
                    if (Number(member.three) == 0)
                        member.valthree = 0

                    if (Number(member.four) == 1)
                        member.valfour = 1
                    if (member.od1four == 1)
                        member.valfour += 1
                    if (member.od2four == .5)
                        member.valfour +=.5
                    if (Number(member.four) == 0)
                        member.valfour = 0

                    if (Number(member.five) == 1)
                        member.valfive = 1
                    if (member.od1five == 1)
                        member.valfive += 1
                    if (member.od2five == .5)
                        member.valfive +=.5
                    if (Number(member.five) == 0)
                        member.valfive = 0

                    if (Number(member.six) == 1)
                        member.valsix = 1
                    if (member.od1six == 1)
                        member.valsix += 1
                    if (member.od2six == .5)
                        member.valsix +=.5
                    if (Number(member.six) == 0)
                        member.valsix = 0

                    if (Number(member.seven) == 1)
                        member.valseven = 1
                    if (member.od1seven == 1)
                        member.valseven += 1
                    if (member.od2seven == .5)
                        member.valseven +=.5
                    if (Number(member.seven) == 0)
                        member.valseven = 0

                    if (Number(member.eight) == 1)
                        member.valeight = 1
                    if (member.od1eight == 1)
                        member.valeight += 1
                    if (member.od2eight == .5)
                        member.valeight +=.5
                    if (Number(member.eight) == 0)
                        member.valeight = 0

                    if (Number(member.nine) == 1)
                        member.valnine = 1
                    if (member.od1nine == 1)
                        member.valnine += 1
                    if (member.od2nine == .5)
                        member.valnine +=.5
                    if (Number(member.nine) == 0)
                        member.valnine = 0

                    if (Number(member.ten) == 1)
                        member.valten = 1
                    if (member.od1ten == 1)
                        member.valten += 1
                    if (member.od2ten == .5)
                        member.valten +=.5
                    if (Number(member.ten) == 0)
                        member.valten = 0

                    if (Number(member.eleven)== 1)
                        member.valeleven = 1
                    if (member.od1eleven == 1)
                        member.valeleven += 1
                    if (member.od2eleven == .5)
                        member.valeleven +=.5
                    if (Number(member.eleven) == 0)
                        member.valeleven = 0

                    if (Number(member.twelve) == 1)
                        member.valtwelve = 1
                    if (member.od1twelve == 1)
                        member.valtwelve += 1
                    if (member.od2twelve == .5)
                        member.valtwelve +=.5
                    if (Number(member.twelve) == 0)
                        member.valtwelve = 0

                    if (Number(member.thirteen) == 1)
                        member.valthirteen = 1
                    if (member.od1thirteen == 1)
                        member.valthirteen += 1
                    if (member.od2thirteen == .5)
                        member.valthirteen +=.5
                    if (Number(member.thirteen) == 0)
                        member.valthirteen = 0

                    if (Number(member.fourteen) == 1)
                        member.valfourteen = 1
                    if (member.od1fourteen == 1)
                        member.valfourteen += 1
                    if (member.od2fourteen == .5)
                        member.valfourteen +=.5
                    if (Number(member.fourteen) == 0)
                        member.valfourteen = 0

                    if (Number(member.fifteen) == 1)
                        member.valfifteen = 1
                    if (member.od1fifteen == 1)
                        member.valfifteen += 1
                    if (member.od2fifteen == .5)
                        member.valfifteen +=.5
                    if (Number(member.fifteen) == 0)
                        member.valfifteen = 0

                    if (Number(member.sixteen) == 1)
                        member.valsixteen = 1
                    if (member.od1sixteen == 1)
                        member.valsixteen += 1
                    if (member.od2sixteen == .5)
                        member.valsixteen +=.5
                    if (Number(member.sixteen) == 0)
                        member.valsixteen = 0

                    if (Number(member.seventeen) == 1)
                        member.valseventeen = 1
                    if (member.od1seventeen == 1)
                        member.valseventeen += 1
                    if (member.od2seventeen == .5)
                        member.valseventeen +=.5
                    if (Number(member.seventeen) == 0)
                        member.valseventeen = 0

                    if (Number(member.eighteen) == 1)
                        member.valeighteen = 1
                    if (member.od1eighteen == 1)
                        member.valeighteen += 1
                    if (member.od2eighteen == .5)
                        member.valeighteen +=.5
                    if (Number(member.eighteen) == 0)
                        member.valeighteen = 0

                    if (Number(member.nineteen) == 1)
                        member.valnineteen = 1
                    if (member.od1nineteen == 1)
                        member.valnineteen += 1
                    if (member.od2nineteen == .5)
                        member.valnineteen +=.5
                    if (Number(member.nineteen) == 0)
                        member.valnineteen = 0

                    if (Number(member.twenty) == 1)
                        member.valtwenty = 1
                    if (member.od1twenty == 1)
                        member.valtwenty += 1
                    if (member.od2twenty == .5)
                        member.valtwenty +=.5
                    if (Number(member.twenty) == 0)
                        member.valtwenty = 0

                    if (Number(member.twentyone) == 1)
                        member.valtwentyone = 1
                    if (member.od1twentyone == 1)
                        member.valtwentyone += 1
                    if (member.od2twentyone == .5)
                        member.valtwentyone +=.5
                    if (Number(member.twentyone) == 0)
                        member.valtwentyone = 0

                    if (Number(member.twentytwo) == 1)
                        member.valtwentytwo = 1
                    if (member.od1twentytwo == 1)
                        member.valtwentytwo += 1
                    if (member.od2twentytwo == .5)
                        member.valtwentytwo +=.5
                    if (Number(member.twentytwo) == 0)
                        member.valtwentytwo = 0

                    if (Number(member.twentythree) == 1)
                        member.valtwentythree = 1
                    if (member.od1twentythree == 1)
                        member.valtwentythree += 1
                    if (member.od2twentythree == .5)
                        member.valtwentythree +=.5
                    if (Number(member.twentythree) == 0)
                        member.valtwentythree = 0

                    if (Number(member.twentyfour) == 1)
                        member.valtwentyfour = 1
                    if (member.od1twentyfour == 1)
                        member.valtwentyfour += 1
                    if (member.od2twentyfour == .5)
                        member.valtwentyfour +=.5
                    if (Number(member.twentyfour) == 0)
                        member.valtwentyfour = 0

                    if (Number(member.twentyfive) == 1)
                        member.valtwentyfive = 1
                    if (member.od1twentyfive == 1)
                        member.valtwentyfive += 1
                    if (member.od2twentyfive == .5)
                        member.valtwentyfive +=.5
                    if (Number(member.twentyfive) == 0)
                        member.valtwentyfive = 0

                    if (Number(member.twentysix) == 1)
                        member.valtwentysix = 1
                    if (member.od1twentysix == 1)
                        member.valtwentysix += 1
                    if (member.od2twentysix == .5)
                        member.valtwentysix +=.5
                    if (Number(member.twentysix) == 0)
                        member.valtwentysix = 0

                    if (Number(member.twentyseven) == 1)
                        member.valtwentyseven = 1
                    if (member.od1twentyseven == 1)
                        member.valtwentyseven += 1
                    if (member.od2twentyseven == .5)
                        member.valtwentyseven +=.5  
                    if (Number(member.twentyseven) == 0)
                        member.valtwentyseven = 0

                    if($scope.noOfDays>=28){
                        if (Number(member.twentyeight) == 1)
                            member.valtwentyeight = 1
                        if (member.od1twentyeight == 1)
                            member.valtwentyeight += 1
                        if (member.od2twentyeight == .5)
                            member.valtwentyeight +=.5
                        if (Number(member.twentyeight) == 0)
                            member.valtwentyeight = 0
                    }
                    if($scope.noOfDays>=29){
                        if (Number(member.twentynine) == 1)
                            member.valtwentynine = 1
                        if (member.od1twentynine == 1)
                            member.valtwentynine += 1
                        if (member.od2twentynine == .5)
                            member.valtwentynine +=.5
                        if (Number(member.twentynine) == 0)
                            member.valtwentynine = 0
                    }
                    if($scope.noOfDays>=30){
                        if (Number(member.thirty) == 1)
                            member.valthirty = 1
                        if (member.od1thirty == 1)
                            member.valthirty += 1
                        if (member.od2thirty == .5)
                            member.valthirty +=.5
                        if (Number(member.thirty) == 0)
                            member.valthirty = 0
                    }
                    if($scope.noOfDays>=31){
                        if (Number(member.thirtyone) == 1)
                            member.valthirtyone = 1
                        if (member.od1thirtyone == 1)
                            member.valthirtyone += 1
                        if (member.od2thirtyone == .5)
                            member.valthirtyone +=.5
                        if (Number(member.thirtyone) == 0)
                            member.valthirtyone = 0
                    }
                member.pdays = Number(PresentItems);
                member.presentdays = Number(PresentItems) + Number(od1Items) + Number(od2Items);
                member.othours = 0;

                $scope.totaldays += Number(member.presentdays) / 2;
            }
			else
			{
                if (member.one == 1)            
                    member.valone = Number(member.one) + (Number(member.od1one) / 8);

                if (member.two == 1)
                    member.valtwo = Number(member.two) + (Number(member.od1two) / 8);

                if (member.three == 1)             
                    member.valthree = Number(member.three) + (Number(member.od1three) / 8);

                if (member.four == 1)              
                    member.valfour = Number(member.four) + (Number(member.od1four) / 8);

                if (member.five == 1)             
                    member.valfive = Number(member.five) + (Number(member.od1five) / 8);

                if (member.six == 1)               
                    member.valsix = Number(member.six) + (Number(member.od1six) / 8);

                if (member.seven == 1)               
                    member.valseven = Number(member.seven) + (Number(member.od1seven) / 8);
                
                if (member.eight == 1)               
                    member.valeight = Number(member.eight) + (Number(member.od1eight) / 8);

                if (member.nine == 1)                
                    member.valnine = Number(member.nine) + (Number(member.od1nine) / 8);

                if (member.ten == 1)                
                    member.valten = Number(member.ten) + (Number(member.od1ten) / 8);

                if (member.eleven == 1)               
                    member.valeleven = Number(member.eleven) + (Number(member.od1eleven) / 8);

                if (member.twelve == 1)              
                    member.valtwelve = Number(member.twelve) + (Number(member.od1twelve) / 8);

                if (member.thirteen == 1)               
                    member.valthirteen = Number(member.thirteen) + (Number(member.od1thirteen) / 8);

                if (member.fourteen == 1)               
                    member.valfourteen = Number(member.fourteen) + (Number(member.od1fourteen) / 8);

                if (member.fifteen == 1)               
                    member.valfifteen = Number(member.fifteen) + (Number(member.od1fifteen) / 8);

                if (member.sixteen == 1)               
                    member.valsixteen = Number(member.sixteen) + (Number(member.od1sixteen) / 8);

                if (member.seventeen == 1)             
                    member.valseventeen = Number(member.seventeen) + (Number(member.od1seventeen) / 8);

                if (member.eighteen == 1)            
                    member.valeighteen = Number(member.eighteen) + (Number(member.od1eighteen) / 8);

                if (member.nineteen == 1)             
                    member.valnineteen = Number(member.nineteen) + (Number(member.od1nineteen) / 8);

                if (member.twenty == 1)              
                    member.valtwenty = Number(member.twenty) + (Number(member.od1twenty) / 8);

                if (member.twentyone == 1)
                    member.valtwentyone = Number(member.twentyone) + (Number(member.od1twentyone) / 8);

                if (member.twentytwo == 1)           
                    member.valtwentytwo = Number(member.twentytwo) + (Number(member.od1twentytwo) / 8);

                if (member.twentythree == 1)             
                    member.valtwentythree = Number(member.twentythree) + (Number(member.od1twentythree) / 8);

                if (member.twentyfour == 1)                
                    member.valtwentyfour = Number(member.twentyfour) + (Number(member.od1twentyfour) / 8);

                if (member.twentyfive == 1)              
                    member.valtwentyfive = Number(member.twentyfive) + (Number(member.od1twentyfive) / 8);
            
                if (member.twentysix == 1)               
                    member.valtwentysix = Number(member.twentysix) + (Number(member.od1twentysix) / 8);

                if (member.twentyseven == 1)               
                    member.valtwentyseven = Number(member.twentyseven) + (Number(member.od1twentyseven) / 8);

                if (member.twentyeight == 1)               
                    member.valtwentyeight = Number(member.twentyeight) + (Number(member.od1twentyeight) / 8);

                if (member.twentynine == 1)              
                    member.valtwentynine = Number(member.twentynine) + (Number(member.od1twentynine) / 8);

                if (member.thirty == 1)               
                    member.valthirty = Number(member.thirty) + (Number(member.od1thirty) / 8);

                if (member.thirtyone == 1)
                    member.valthirtyone = Number(member.thirtyone) + (Number(member.od1thirtyone) / 8);
                             
				member.pdays = Number(PresentItems);
				member.presentdays = Number(PresentItems) ;
				member.othours = parseFloat(od1Items);
			}

            member.od1Items = od1Items.toFixed(1);
            member.od2Items = od2Items.toFixed(1);
            PresentItems = 0;
            od1Items = 0;
            od2Items = 0;
        })
    }, true);

    $scope.cancelattendence = function () {
        window.location.reload(true);
    };

    $scope.editattendance($scope.objattendance.monthandyear, 0, $scope.objattendance.projectid,$scope.objattendance.etype);

   

});