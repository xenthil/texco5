var app = angular.module('appJobmaster', []);
app.controller('ctrlJobmaster', function($scope, $http) {
    var scope = $scope;
    $scope.jobmasters = [];
    $scope.selected = {};
    $scope.objjobmaster = {};
    $scope.filter = "";
    $scope.taluks = [];
    $scope.regions = [];
    $scope.objjobmaster.talukid = 0;
    $scope.objjobmaster.districtid = 0;
    $scope.objjobmaster.regionmapid = 0;
    $scope.selectedd = {};

    // Get lookup
    $scope.loadtaluks = function() {
        $http({
            method: 'GET', 
            headers : {
                "Authorization" : atoken
            },
            url: api_url + "/getlookuptaluk?lkdmcode=TALUK",
        }).then(function successCallback(response) {
            if (response.status = 200) {
                $scope.taluks = response.data;
            }
        }, function errorCallback(response) {
            Materialize.toast('Something has gone wrong!', 3000, 'red');
        });
    }

    $scope.loadregions = function() {
        $http({
            method: 'GET', 
            headers : {
                "Authorization" : atoken
            },
            url: api_url + "/getmaplookupvalues?lkdmcode=REGION",
        }).then(function successCallback(response) {
            if (response.status = 200) {
                debugger
                $scope.lkdmcode ='REGION';
                $scope.regions = response.data;
                $scope.lookups = $scope.regions[1];
                $scope.regionid = $scope.regions[1].regionid;
                $scope.objjobmaster.regionid = $scope.regions[1].regionid;
                $scope.lookupdistrict  = $scope.regions[1].lookupitems;
                $scope.selectedlookup = $scope.regions[1].lookupitems;
                $scope.talukid = $scope.selectedlookup[0].talukid;
                $scope.selectValues($scope.selectedlookup[0],$scope.lkdmcode)
            }
        }, function errorCallback(response) {
            Materialize.toast('Something has gone wrong!', 3000, 'red');
        });
    }

    $scope.getlookupvalues = function(lookupval) {
        debugger
        $scope.lkdmcode ='REGION';
        $scope.selectedlookup = lookupval.lookupitems;
        $scope.regionid = lookupval.regionid;
        $scope.talukid = $scope.selectedlookup[0].talukid;
        $scope.objjobmaster.regionid =  $scope.regionid;
        $scope.lookupdistrict  = $scope.selectedlookup;
        $scope.selectValues($scope.selectedlookup[0],$scope.lkdmcode)
    } 
    
    $scope.selectValues = function(selectedlookup,lkdmcode) {
        debugger
        $scope.selectedd.talukname = selectedlookup.talukname;
        $scope.selectedd.talukid = selectedlookup.talukid;
        $scope.selectedd.districtid = selectedlookup.districtid;
        $scope.selectedd.talukcode = selectedlookup.talukcode;
        $scope.selectedd.districtname = selectedlookup.districtname;
        $scope.selectedd.districtcode = selectedlookup.districtcode;
        $scope.selectedd.regionmapid  = selectedlookup.regionmapid;
    }

    // Get lookup
    $scope.loadlookupvalues = function() {
        $http({
            method: 'GET', 
            headers : {
                "Authorization" : atoken
            },
            url: api_url + "/lookupvalues?lkdmcode=DISTRC",
        }).then(function successCallback(response) {
            if (response.status = 200) {
                $scope.lookup = response.data.lookupvalues;
                if ($scope.lookup.length > 0) {
                    //$scope.jobmaster.lookup = $scope.selectedlookup.lkdmncode;
                    //alert(JSON.stringify())
                    // $scope.selectedlookup = $scope.lookup[0];
                    // $scope.objjobmaster.districtid = $scope.lookup[0].lkvalid;
                    // $scope.lookups = $scope.selectedlookup;
                    // $scope.lkdmcode = $scope.selectedlookup.code;
                    // $scope.changeadd = 1;
                    // $scope.lk = $scope.selectedlookup.lookupitems[0];
                    // $scope.lkvalid = $scope.lk.lkvalid;
                    // $scope.select($scope.selectedlookup.lookupitems[0], $scope.lkdmcode)
                }
            }
        }, function errorCallback(response) {
            Materialize.toast('Something has gone wrong!', 3000, 'red');
        });
    }

    // $scope.getlookupvalues = function(lookupval) {

    //     $scope.objjobmaster.districtid = lookupval.lkvalid;
    //     $scope.selectedlookup = lookupval;
    //     $scope.lkdmcode = $scope.selectedlookup.code;
    //     $scope.changeadd = 1;
    //     $scope.lk = $scope.selectedlookup.lookupitems[0];
    //     $scope.lkvalid = $scope.lk.lkvalid;
    //     $scope.select($scope.selectedlookup.lookupitems[0], $scope.lkdmcode)

    // }

    $scope.select = function(jobmaster, lkdmcode) {

        $scope.selected = jobmaster;
        $scope.objjobmaster.lkvalid = jobmaster.lkvalid;
        $scope.objjobmaster.talukid = jobmaster.lkvalid;
        $scope.objjobmaster.linkid = jobmaster.linkid;
        $scope.objjobmaster.jobmasterid = jobmaster.jobmasterid;
        $scope.objjobmaster.code = jobmaster.code;
        $scope.objjobmaster.description = jobmaster.description;
        $scope.objjobmaster.lkdmcode = lkdmcode;
        $scope.objjobmaster.sortorder = jobmaster.sortorder;
        $scope.lkvalid = jobmaster.lkvalid;
    }


    $scope.addjobmaster = function() {
        debugger
        $scope.submitted = false;
        $("label").removeClass("active");
        $scope.functions = '';
        $scope.objjobmaster.lkdmcode = $scope.lkdmcode;
        $scope.objjobmaster.regionid =  $scope.regionid;
        $scope.lookupdistrict  = $scope.selectedlookup;
        $('#mcaption').text("Add Taluk");
        $('#modal1').modal('open');
        $('#failure').text('');
        $("#district").attr("disabled", false);
    }

    $scope.editjobmaster = function() {
        debugger
        $('#failure').text('');
        $scope.objjobmaster.districtid = $scope.selectedd.districtid;
        $scope.objjobmaster.talukid = $scope.selectedd.talukid;
        $scope.objjobmaster.regionid = $scope.regionid;
        $scope.objjobmaster.regionmapid = $scope.selectedd.regionmapid;
        $('#mcaption').text("Edit Taluk");
        $("label").addClass("active");
        $('#modal1').modal('open');
        $scope.functions = 'edit';
        $("#district").attr("disabled", true);
    }

    // Save jobmaster
    $scope.savetaluk = function(data) {
        debugger
        var URL, regionmapid;
        if (data.regionmapid > 0) {
            URL = '/taluklookup/edit';
            regionmapid = data.regionmapid;
        } else {
            URL = '/taluklookup/add';
            regionmapid = 0;
            
        }
        $http({
            url: api_url + URL,
            data: $.param({
                regionid: data.regionid,
                districtid: data.districtid,
                talukid: data.talukid,
                regionmapid: regionmapid
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : atoken
            }, 
            method: 'POST',
        }).success(function(response, result) {
            $scope.reslkval = response.id;
            if (result = 200) {
                if (regionmapid > 0) {
                    $scope.loadtaluks();
                    $scope.loadregions();
                    Materialize.toast('Taluk Updated Successfully !', 3000, 'green');
                } else {
                    $scope.loadtaluks();
                    $scope.loadregions();
                    Materialize.toast('Taluk Saved Successfully !', 3000, 'green');
                }

            }
            $(".modal").modal("close");
        }).error(function(error) {
            $('#failure').html(error);
        });
    };

    // Delete jobmaster
    $scope.removejobmaster = function() {
        if (confirm("Are you sure to delete this detail?")) {
            console.log($scope.selectedd.regionmapid);
            $http({
                url: api_url + "/taluklookup/delete",
                data: $.param({
                    regionmapid: $scope.selectedd.regionmapid
                }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization' : atoken
                }, 
                method: 'POST',
            }).success(function(response, result) {
                if (result = 200) {
                            $scope.loadlookupvalues();
                            $scope.loadtaluks();
                    // $http({
                    //     method: 'GET',
                    //     url: api_url + "/lookupvalues?lkdmcode=DISTRC",
                    // }).then(function successCallback(response) {
                    //     if (response.status = 200) {
                    //         $scope.lookup = response.data;

                    //         angular.forEach($scope.lookup, function(lookupdata) {

                    //             if (lookupdata.code == $scope.objjobmaster.code) {
                    //                 $scope.getlookupvalues(lookupdata);
                    //             }
                    //         });
                    //     }
                    // }, function errorCallback(response) {
                    //     Materialize.toast('Something has gone wrong!', 3000, 'red');
                    // });

                }
            }).error(function(error) {
                $scope.error = error;
            });
        };
    }

    // $scope.loadlookupvalues();
    $scope.loadtaluks();
    $scope.loadregions();
}); 

app.filter('unique', function () {
    return function (items, filterOn) {
        if (filterOn === false) {
            return items;
        }
        if ((filterOn || angular.isUndefined(filterOn)) && angular.isArray(items)) {
            var hashCheck = {}, newItems = [];
            var extractValueToCompare = function (item) {
                if (angular.isObject(item) && angular.isString(filterOn)) {
                    return item[filterOn];
                } else {
                    return item;
                }
            };
            angular.forEach(items, function (item) {
                var valueToCheck, isDuplicate = false;

                for (var i = 0; i < newItems.length; i++) {
                    if (angular.equals(extractValueToCompare(newItems[i]), extractValueToCompare(item))) {
                        isDuplicate = true;
                        break;
                    }
                }
                if (!isDuplicate) {
                    newItems.push(item);
                }
            });
            items = newItems;
        }
        return items;
    };
});