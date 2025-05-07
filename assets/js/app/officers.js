
var app = angular.module('appAdminOfficer', []);
app.controller('ctrlAdminOfficer', function($scope, $http) {
    var scope = $scope;
    $scope.officers = [];
    $scope.selected = {};
    $scope.objofficer = {};
    $scope.filter = "";

    // Get Directors
    $http({
        method: 'GET', 
        headers : {
          "Authorization" : atoken
        },
        url: api_url + "/officers",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.officers = response.data;
            if ($scope.officers.length > 0) {
                $scope.select($scope.officers[0]);
            }
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });


    $scope.select = function(officer) {
        console.log(officer);
        $scope.selected = officer;
        $scope.objofficer.other = false;
        $scope.objofficer.officerid = officer.officerid;
        $scope.objofficer.name = officer.name;
        $scope.objofficer.designation = officer.designation;
        $scope.objofficer.email = officer.email;
        $scope.objofficer.mobile = officer.mobile;
        $scope.objofficer.phone = officer.phone;
        $scope.objofficer.address = officer.address;
        $scope.objofficer.changedby = officer.changedby;
        if(officer.other == 1)
        {
          $scope.objofficer.other = true;
        }
        
    }

    $scope.addofficer = function() {
        $scope.objofficer = {};
        $scope.submitted = false;
        $('#mcaption').text("Add Officer");
        $('#failure').html("");
        $('#modal1').modal('open');
        objofficer.other = true;
    }

    $scope.editofficer = function() {
      console.log($scope.selected);
      $scope.select($scope.selected);
      $scope.submitted = false;
      $('#failure').html("");
      $('#mcaption').text("Edit Officer");
      $("label").addClass("active");
      $('#modal1').modal('open');
    }

    // Save officer
    $scope.saveofficer = function(data) {
        console.log(data);
        var method;
        if (data.other) {
            data.other = 1;
        }
        else{
          data.other = 0;
        }
        
        if (data.officerid > 0) {
            method = 'PUT' ;
        } else {
            method = 'POST';
        }
        $http({
            url: api_url + "/officers" ,
            data: $.param({officerid: data.officerid, name: data.name, designation: data.designation,
                email: data.email, mobile: data.mobile, phone: data.phone, address: data.address, other: data.other, changedby:data.changedby }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization' : atoken
                }, 
            method: method,
        }).success(function(response, result) {
            if (result = 200) {
              $http({
                  method: 'GET', 
                  headers : {
                    "Authorization" : atoken
                  },
                  url: api_url + "/officers/" + response.officerid,
              }).then(function successCallback(response) {
                  if (response.status = 200) {
                    Materialize.toast('Officer saved Successfully !', 3000, 'green');
                      if (data.officerid > 0) {
                        for (var loop = 0; loop < $scope.officers.length ; loop++){
                          if ($scope.officers[loop].officerid == data.officerid){
                            $scope.officers[loop] = response.data[0];
                            $scope.select($scope.officers[loop]);
                            break;
                          }
                        }
                      }
                      else {
                        $scope.officers.unshift(response.data[0]);
                        $scope.select($scope.officers[0]);
                      }
                  }
              }, function errorCallback(response) {
                  Materialize.toast('Something has gone wrong!', 3000, 'red');
              });
            }
            $(".modal").modal("close");
        }).error(function(error) {
             $('#failure').html(error);
        });
    };

    // Delete Director
    $scope.removeofficer = function() {
        if(confirm("Are you sure to delete this detail?")){
          $http({
              url: api_url + "/officers",
              data: $.param({
                  officerid : $scope.objofficer.officerid,
              }),
              headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
              },
              method: 'DELETE',
          }).success(function(response, result) {
              if (result = 200) {
                for (var loop = 0; loop < $scope.officers.length ; loop++){
                  if ($scope.officers[loop].officerid == $scope.objofficer.officerid){
                    $scope.officers.splice(loop,1);
                    $scope.select($scope.officers[loop]);
                    break;
                  }
                }
              }
          }).error(function(error) {
              $scope.error = error;
          });
      };
    }

    $scope.removeofficer = function() {
        if(confirm("Are you sure to delete this detail?")){
          $http({
              url: api_url + "/officers",
              data: $.param({
                  officerid : $scope.objofficer.officerid,
              }),
              headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                  "Authorization" : atoken
              },
              method: 'DELETE',
          }).success(function(response, result) {
              if (result = 200) {
                for (var loop = 0; loop < $scope.officers.length ; loop++){
                  if ($scope.officers[loop].officerid == $scope.objofficer.officerid){
                    $scope.officers.splice(loop,1);
                    $scope.select($scope.officers[loop]);
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
