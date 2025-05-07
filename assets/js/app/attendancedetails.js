var app = angular.module('appAttendance', []);
app.controller('ctrlAttendance', function($scope, $http) {
    $scope.clientid = 0;
    $scope.attendancedetails = [];
    $scope.selected = {};
    $scope.obj = {};
    $scope.filter = "";

$scope.getattendance = function() {
      $http({
        method: 'GET',
		headers: {
			'Authorization' : atoken
		}, 
         url: api_url + "/client/attendancedetails/"+clientid,
    }).then(function successCallback(response) {
    if (response.status = 200) {
                $scope.attendancedetails = response.data;
               if ($scope.attendancedetails.length > 0) {
                $scope.select($scope.attendancedetails[0]);
            }
        }
        else {
            alert("error");
        }
    },function errorCallback(response) {
       alert("error");
    });
    };
$scope.getattendance();

$scope.editattendance = function() {
        $scope.submitted = false;
        $scope.select($scope.selected);
        $('#mcaption').text("Edit Attendance");
        $("label").addClass("active");
        $('#modal1').modal('open');
        $("#failure").html("");
    };

 $scope.select = function(attendance) {
        $scope.selected = attendance;

        $scope.obj.attendanceid = attendance.attendanceid;
        $scope.obj.clientid = attendance.clientid;
        $scope.obj.memberid = attendance.memberid;
        $scope.obj.projectid = attendance.projectid;
        $scope.obj.jobpostingdetailid = attendance.jobpostingdetailid;
        $scope.obj.fromdate = attendance.fromdate;
        $scope.obj.todate = attendance.todate;
        $scope.obj.days = attendance.days;
        $scope.obj.firstname = attendance.firstname;
        $scope.obj.lastname = attendance.lastname;
        $scope.obj.texcono = attendance.texcono;
        $scope.obj.projectname = attendance.projectname;
    };

     $scope.attendance = function(data) {
      if (data.fromdate == undefined) {
        $('#failure').html('Fromdate cannot be empty');
      }
      else if (data.todate == undefined)
      {
        $('#failure').html('Todate cannot be empty');
      }
      else if (data.todate == undefined)
      {
        $('#failure').html('Days cannot be empty');
      }
      else
      {
        var method;
        if (data.attendanceid > 0) {
            method = 'PUT';
        } else {
            method = 'POST';
        }
        $http({
           
            url: api_url + "/client/attendance",
            data: $.param({
                "attendanceid": data.attendanceid,
                "projectid": data.projectid,
                "memberid": data.memberid,
                "jobpostingdetailid": data.jobpostingdetailid,
                "fromdate": data.fromdate,
                "todate": data.todate,
                "days": data.days,
                "changedby": data.changedby
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : atoken
            },
             method: method,
        }).success(function(response, result) {
            if (response.status = 200) {
              $(".modal").modal("close");
              $scope.getattendance();
            } else {
                alert("error");
            }
        }).error(function(error) {
            $('#failure').html(error);
        });
        }
    };

    $scope.removeattendance = function() {
        if (confirm("Are you sure to delete this detail?")) {
            $http({
                url: api_url + "/client/attendance",
                data: $.param({
                    attendanceid: $scope.obj.attendanceid,
                }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization' : atoken
                },
                method: 'DELETE',
            }).success(function(result) {
                if (result = 200) {
                    for (var loop = 0; loop < $scope.attendancedetails.length; loop++) {
                        if ($scope.attendancedetails[loop].attendanceid == $scope.obj.attendanceid) {
                            $scope.attendancedetails.splice(loop, 1);
                            $scope.select($scope.attendancedetails[loop]);
                            break;
                        }
                    }
                }
            }).error(function(error) {
                $scope.error = error;
            });
        };
    }
});

