
var app = angular.module('appAdminDirector', []);
app.controller('ctrlAdminDirector', function($scope, $http) {
    var scope = $scope;
    $scope.directors = [];
    $scope.selected = {};
    $scope.objdirector = {};
    $scope.dtitles = [];
    $scope.filter = "";

    // Get director titles
    $http({
        method: 'GET', 
        headers : {
            "Authorization" : atoken
        },
        url: api_url + "/lookupvalues?lkdmcode=DTITLE",
    }).then(function successCallback(response) {
          if (response.status = 200) {
            $scope.dtitles = response.data.lookupvalues;
          }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });

    // Get Directors
    $http({
        method: 'GET', 
        headers : {
            "Authorization" : atoken
        },
        url: api_url + "/directors",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.directors = response.data;
            if ($scope.directors.length > 0) {
                $scope.select($scope.directors[0]);
            }
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });


    $scope.select = function(director) {
        $scope.selected = director;

        $scope.objdirector.directorid = director.directorid;
        $scope.objdirector.name = director.name;
        $scope.objdirector.designation = director.designation;
        $scope.objdirector.dtitleid = director.dtitleid;
        $scope.objdirector.email = director.email;
        $scope.objdirector.mobile = director.mobile;
        $scope.objdirector.phone = director.phone;
        $scope.objdirector.address = director.address;
        $scope.objdirector.changedby = director.changedby;
    }

    $scope.adddirector = function() {
        $scope.objdirector = {};
        $scope.submitted = false;
        $('#mcaption').text("Add Director");
        $('#failure').html("");
        $('#modal1').modal('open');
    }

    $scope.editdirector = function() {
      $scope.select($scope.selected);
      $scope.submitted = false;
      $('#failure').html("");
      $('#mcaption').text("Edit Director");
      $("label").addClass("active");
      $('#modal1').modal('open');
    }

    // Save director
    $scope.savedirector = function(data) {

        var method;
        if (data.directorid > 0) {
            method = 'PUT' ;
        } else {
            method = 'POST';
        }
        $http({
            url: api_url + "/directors" ,
            data: $.param({directorid: data.directorid, name: data.name, designation: data.designation, dtitleid: data.dtitleid,
                email: data.email, mobile: data.mobile, phone: data.phone, address: data.address, changedby:data.changedby }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded', 
                "Authorization" : atoken
            },
            method: method,
        }).success(function(response, result) {
            if (result = 200) {
              $http({
                  method: 'GET', 
                  headers : {
                      "Authorization" : atoken
                  },
                  url: api_url + "/directors/" + response.directorid,
              }).then(function successCallback(response) {
                  if (response.status = 200) {
                    Materialize.toast('Director saved Successfully !', 3000, 'green');
                      if (data.directorid > 0) {
                        for (var loop = 0; loop < $scope.directors.length ; loop++){
                          if ($scope.directors[loop].directorid == data.directorid){
                            $scope.directors[loop] = response.data[0];
                            $scope.select($scope.directors[loop]);
                            break;
                          }
                        }
                      }
                      else {
                        $scope.directors.unshift(response.data[0]);
                        $scope.select($scope.directors[0]);
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
    $scope.removedirector = function() {
        if(confirm("Are you sure to delete this detail?")){
          $http({
              url: api_url + "/directors",
              data: $.param({
                  directorid: $scope.objdirector.directorid,
              }),
              headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                  "Authorization" : atoken
              },
              method: 'DELETE',
          }).success(function(response, result) {
              if (result = 200) {
                for (var loop = 0; loop < $scope.directors.length ; loop++){
                  if ($scope.directors[loop].directorid == $scope.objdirector.directorid){
                    $scope.directors.splice(loop,1);
                    $scope.select($scope.directors[loop]);
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
