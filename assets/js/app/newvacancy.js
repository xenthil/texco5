var app = angular.module('appnewVacancy', ['ngTable', 'ui.bootstrap']);
app.controller('ctrlnewVacancylist', function($scope, $http, $filter, NgTableParams, $location) {
    $scope.filter = "";
    $scope.tncount = 0;
    $scope.dgrcount = 0;
    $scope.viewby = 10;
    $scope.totalItems = 0;
    $scope.currentPage = 1;
    $scope.itemsPerPage = $scope.viewby;
    $scope.maxSize = 20; 
    $scope.regions = [];
    $scope.settings = [];
    $scope.dgrvacancy = [];
    $scope.tnvacancy = [];
    $scope.selregionid = selregionid;

    // Get JobMasters
    $scope.jobmasters = [];
    $http({
        method: 'GET',
        headers: {
            'Authorization' : atoken
        }, 
        url: api_url + "/job/jobmasterByVacancy",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.jobmasters = response.data; 
            console.log('$scope.jobmasters',$scope.jobmasters);
        }
    }, function errorCallback(response) {
        
    });
   

    $http({
        method: 'GET', 
        headers : {
            "Authorization" : atoken
        },
        url: api_url + "/lookupvalues?lkdmcode=REGION",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.regions = response.data.lookupvalues;
        }
    }, function errorCallback(response) {});

    $http({
        method: 'GET', 
        headers : {
            "Authorization" : atoken
        },
        url: api_url + "/job/list",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            var data = response.data;  
            $scope.tnvacancy = []; 
            $scope.dgrvacancy = [];
            $scope.newdgrvacancy = []; 
            $scope.newtnvacancy = [];
            angular.forEach(data, function(projects) {  
                if (projects.wagetype == "DGR VALUE") {

                    $scope.dgrvacancy.push(projects); 
                    $scope.newdgrvacancy.push(projects);
                    $scope.dgrcount += projects.length;
                } 
            });  
            angular.forEach(data, function(projects) {  
                if (projects.wagetype == "TN MINIMUM VALUE") {
                    $scope.tnvacancy.push(projects);
                    $scope.newtnvacancy.push(projects);
                    $scope.tncount += projects.length;
                }
            }); 
            // console.log('$scope.dgrvacancy-data',$scope.dgrvacancy);
            // $scope.tableParams = new NgTableParams({
            //     page: 1,
            //     count: response.data.length
            // }, {
            //     data: data
            // });
            // $scope.allvacancy = response.data;
            // $scope.dgrvacancy = response.data;
            // $scope.totalItems = $scope.dgrvacancy.length;
            // angular.forEach($scope.dgrvacancy, function(vacancy) {
            //     $scope.newdgrvacancy = [];
            //     var client = $location.absUrl().split('=')[1];
            //     $scope.value = [];
            //     if (vacancy.organization == client) {
            //         $scope.value.push(vacancy);
            //         $scope.dgrvacancy = [];
            //         $scope.dgrvacancy = $scope.value;
            //         angular.forEach(vacancy.projects, function(projects) {
            //             if (projects.wagetype == "DGR VALUE") {
            //                 $scope.newdgrvacancy.push(projects);
            //                 $scope.dgrcount += projects.length;
            //             }
            //         });
            //         vacancy.projects = [];
            //         vacancy.projects = $scope.newdgrvacancy;
            //         return;
            //     }
            //     if (client == undefined) {
            //         angular.forEach(vacancy.projects, function(projects) {
            //             if (projects.wagetype == "DGR VALUE") {
            //                 $scope.newdgrvacancy.push(projects);
            //                 $scope.dgrcount += projects.length;
            //             }
            //         });
            //         vacancy.projects = [];
            //         vacancy.projects = $scope.newdgrvacancy;
            //     }
            // }); 
            // console.log('$scope.dgrvacancy',$scope.dgrvacancy);
        }
    }, function errorCallback(response) {});

    // $http({
    //     method: 'GET', 
    //     headers : {
    //         "Authorization" : atoken
    //     },
    //     url: api_url + "/job/list",
    // }).then(function successCallback(response) {
    //     if (response.status = 200) {
    //         var data = response.data;
    //         $scope.tableParams = new NgTableParams({
    //             page: 1,
    //             count: response.data.length
    //         }, {
    //             data: data
    //         });
    //         $scope.tnvacancy = response.data;
    //         $scope.totalItems = $scope.tnvacancy.length;
    //         angular.forEach($scope.tnvacancy, function(vacancy) {
    //             $scope.newtnvacancy = [];
    //             var client = $location.absUrl().split('=')[1];
    //             $scope.value = [];
    //             if (vacancy.organization == client) {
    //                 $scope.value.push(vacancy);
    //                 $scope.tnvacancy = [];
    //                 $scope.tnvacancy = $scope.value;
    //                 angular.forEach(vacancy.projects, function(projects) {
    //                     if (projects.wagetype == "TN MINIMUM VALUE") {
    //                         $scope.newtnvacancy.push(projects);
    //                         $scope.tncount += projects.length;
    //                     }
    //                 });
    //                 vacancy.projects = [];
    //                 vacancy.projects = $scope.newtnvacancy;
    //                 return;
    //             }
    //             if (client == undefined) {
    //                 angular.forEach(vacancy.projects, function(projects) {
    //                     if (projects.wagetype == "TN MINIMUM VALUE") {
    //                         $scope.newtnvacancy.push(projects);
    //                         $scope.tncount += projects.length;
    //                     }
    //                 });
    //                 vacancy.projects = [];
    //                 vacancy.projects = $scope.newtnvacancy;
    //             }
    //         });
    //     }
    // }, function errorCallback(response) {});


    $scope.addVacancy = function(clientid, jobpostingid, projectid, jobmasterid) {
    }

    //Get settings
    $http({
        method: 'GET', 
        headers : {
            "Authorization" : atoken
        },
        url: api_url + "/setting",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.settings = response.data;

        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });


    //Get settings
    // $http({
    //     method: 'GET', 
    //     headers : {
    //         "Authorization" : atoken
    //     },
    //     url: api_url + "/vacancypublishstatus",
    // }).then(function successCallback(response) {
    //     if (response.status = 200) {
    //         $scope.vacancystatus = response.data;
          
    //     }
    // }, function errorCallback(response) {
    //     Materialize.toast('Something has gone wrong!', 3000, 'red');
    // });



    $scope.regionIncludes = [];

    $scope.includeRegion = function(regionid) {
        debugger
        var i = $.inArray(regionid, $scope.regionIncludes);
        if (i > -1) {
            $scope.regionIncludes.splice(i, 1);
        } else {
            $scope.regionIncludes.push(regionid);
        }
    }
    if( $scope.selregionid != "")
    {
       $scope.includeRegion($scope.selregionid);
    }

    $scope.regionFilterclient = function(client) {
        $scope.dgrcount = 0;
        $scope.tncount = 0;
        var result;
        if ($scope.regionIncludes.length > 0) {
            client.projects.forEach(function(project) {
                if ($.inArray(project.regionid, $scope.regionIncludes) >= 0) {
                    result = client;
                }
            });
            return result;
        }
        return client;
    }

    $scope.regionFilter = function(project) {

        if ($scope.regionIncludes.length > 0) {
            if ($.inArray(project.regionid, $scope.regionIncludes) < 0)
                return;
        }
         if (project.wagetype == "DGR Value") 
         {
         $scope.dgrcount += project.jobs.length;
         }else 
         {
             $scope.tncount += project.jobs.length;
         }
        return project;
    }


});