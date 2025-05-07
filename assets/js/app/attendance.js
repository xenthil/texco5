var app = angular.module('appClientattendance', []);
app.controller('ctrlClientattendance', function($scope, $http, $filter) {
    $scope.attendancedetails = [];
    $scope.selected = {};   
    $scope.objattendance = {};
    $scope.filter = "";
    $scope.attendance = [];

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
            $scope.clients = response.data;
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
    $scope.projects = [];
    $http({
        method: 'GET',
		headers: {
			'Authorization' : atoken
		}, 
        url: api_url + "/client/project/",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.projects = response.data;
             if (clientid > 0) {
          $scope.objattendance.clientid = clientid;
          $scope.selectProject($scope.objattendance
          .clientid);
        }
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });

    $scope.memberdetails = [];
      $http({
        method: 'GET',
		headers: {
			'Authorization' : atoken
		}, 
         url: api_url + "/client/attendance/"+clientid,
    }).then(function successCallback(response) {
    if (response.status = 200) {
                $scope.memberdetails = response.data;
        }
        else {
            Materialize.toast('error', 3000, 'red');
        }
    },function errorCallback(response) {
       Materialize.toast('error', 3000, 'red');
    });

    //Load Selected Projects
    $scope.selectProject = function(clientid){
    $scope.selectedprojects = [];
    var obj ={}
        for(  obj of $scope.projects){
            if(obj.clientid == clientid )
            {
                $scope.selectedprojects.push(obj);
            }
        }
    }
      $scope.selectMembers = function(projectid){
      $scope.members = [];
      var obj ={}
        for(  obj of $scope.memberdetails){
            if(obj.projectid == projectid )
            {
                $scope.members.push(obj);
            }
        }
    }
   
});

