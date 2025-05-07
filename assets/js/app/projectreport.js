var app = angular.module('appProjectreport', ["ngSanitize", "ngCsv", 'ngTable', 'ui.bootstrap']);
app.controller('ctrlProjectreport', function ($scope, $http, $filter, NgTableParams) {
    $scope.count = 0;
    $scope.viewby = 25;
    $scope.totalItems = 0;
    $scope.currentPage = 1;
    $scope.itemsPerPage = $scope.totalItems;
    $scope.maxSize = 20; //Number of pager buttons to show
    $scope.report = [];
    $scope.regid=regionid;
    // $scope.exportproject(0);

    // $scope.setItemsPerPage = function(num) {
    //     if(num == "All")
    //     {
    //          $scope.itemsPerPage = $scope.totalItems;
    //     }
    //     else
    //     {
    //          $scope.itemsPerPage = num;
    //      }
    //   $scope.currentPage = 1; //reset to first page
    // }
    // Get status
    $scope.status = [];

    $http({
        method: 'GET', 
        headers : {
            "Authorization" : atoken
        },
        url: api_url + "/client/project/export"
    }).then(function successCallback(response) {
        if (response.status = 200) {
            var data = response.data;
            for (var i = 0; i < data.length; i++) {
                delete data[i].projectid;
                delete data[i].clientid;
                delete data[i].districtid;
                delete data[i].regionid;
                delete data[i].statusid;
                delete data[i].active;
            }
            $scope.projectdetail = data;
            // JSONToCSVConvertor(data, 'Project_Report', true)
        } else {
            Materialize.toast('error', 3000, 'red');
        }
    }, function errorCallback(response) {
        Materialize.toast('error', 3000, 'red');
    });
    $http({
        method: 'GET', 
        headers : {
            "Authorization" : atoken
        },
        url: api_url + "/lookupvalues?lkdmcode=PRJST",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.status = response.data.lookupvalues;
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });

    // Get DISTRICT
    $scope.district = [];
    $http({
        method: 'GET', 
        headers : {
            "Authorization" : atoken
        },
        url: api_url + "/lookupvalues?lkdmcode=DISTRC",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.district = response.data.lookupvalues;
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });

    // Get region
    $scope.region = [];
    $http({
        method: 'GET', 
        headers : {
            "Authorization" : atoken
        },
        url: api_url + "/lookupvalues?lkdmcode=REGION",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.region = response.data.lookupvalues;
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });

    // Get Projects


    $scope.region = [];
	$http({
		method: 'GET', 
		headers : {
			"Authorization" : atoken
		},
		url: api_url + "/member/RegionDetails",
	}).then(function successCallback(response) {
		if (response.status = 200) {
			$scope.regions = response.data.resultdata[0];
            $scope.getDistrictDetails($scope.regid);
		}
	}, function errorCallback(response) {
		Materialize.toast('Something has gone wrong!', 3000, 'red');
    }); 

    $scope.getDistrictDetails = function (regionid) {
		debugger
		//$scope.Taluks = [];
		$scope.districtDetails = [];
		angular.forEach($scope.regions, function (region) {
			if (region.region_id == regionid) {
				$scope.districtDetailss = region.district;
				return;
			}
		});
	}


    $scope.projectnos = [];
    $http({
        method: 'GET', 
        headers : {
            "Authorization" : atoken
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
    $scope.fillclientproject = function (projectid) {
        $scope.objattendance.monthandyear = "";

        $http({
            method: 'GET', 
            headers : {
                "Authorization" : atoken
            },
            url: api_url + "/prjectnos",
        }).then(function successCallback(response) {
            if (response.status = 200) {
                $scope.projectnos = response.data;
                angular.forEach($scope.projectnos, function (project) {
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
    $scope.selectProject = function (clientid) {
        $scope.selectedprojects = [];
        var obj = {}
        for (obj of $scope.projects) {
            if (obj.clientid == clientid) {
                $scope.selectedprojects.push(obj);
            }
        }
    }

    $scope.submitproject = function (objproject) {
        if (objproject == undefined) {
            url = api_url + "/client/project/export"
        } else {
            url = api_url + "/client/project/export?districtid=" + objproject.districtid + "&regionid=" + objproject.regionid + "&statusid=" + objproject.statusid
        }
        $http({
            method: 'GET', 
            headers : {
                "Authorization" : atoken
            },
            url: url
        }).then(function successCallback(response) {
            if (response.status = 200) {
                var data = response.data;
                // $scope.report = response.data;
                $scope.tableParams = new NgTableParams({
                    page: 1,
                    count: response.data.length
                }, {
                    data: data
                });
                $scope.report = response.data;
                $scope.totalItems = response.data.length;
            } else {
                Materialize.toast('error', 3000, 'red');
            }
        }, function errorCallback(response) {
            Materialize.toast('error', 3000, 'red');
        });
    }

    $scope.exportproject = function (objproject) {
        debugger
        if (objproject == undefined) {
            url = api_url + "/client/project/export"
        } else {
            url = api_url + "/client/project/export?districtid=" + objproject.districtid + "&regionid=" + objproject.regionid + "&statusid=" + objproject.statusid
        }
        $http({
            method: 'GET', 
            headers : {
                "Authorization" : atoken
            },
            url: url
        }).then(function successCallback(response) {
            if (response.status = 200) {
                var data = response.data;
                for (var i = 0; i < data.length; i++) {
                    delete data[i].projectid;
                    delete data[i].clientid;
                    delete data[i].districtid;
                    delete data[i].regionid;
                    delete data[i].statusid;
                    delete data[i].active;
                    delete data[i].status
                }
                $scope.projectdetail = data;
                debugger
                JSONToCSVConvertor($scope.projectdetail, 'Project_Report', true)
            } else {
                Materialize.toast('error', 3000, 'red');
            }
        }, function errorCallback(response) {
            Materialize.toast('error', 3000, 'red');
        });
    }

    function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {

        //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
        var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;

        var CSV = '';
        //Set Report title in first row or line

        //This condition will generate the Label/Header
        if (ShowLabel) {
            var row = "";

            //This loop will extract the label from 1st index of on array
            for (var index in arrData[0]) {

                //Now convert each value to string and comma-seprated
                row += index.toUpperCase() + ',';
            }

            row = row.slice(0, -1);

            //append Label row with line break
            CSV += row + '\r\n';
        }

        //1st loop is to extract each row
        for (var i = 0; i < arrData.length; i++) {
            var row = "";

            //2nd loop will extract each column and convert it in string comma-seprated
            for (var index in arrData[i]) {
                row += '"' + arrData[i][index] + '",';
            }

            row.slice(0, row.length - 1);

            //add a line break after each row
            CSV += row + '\r\n';
        }

        if (CSV == '') {
            Materialize.toast('Invalid Data', 3000, 'red');
            return;
        }

        //Generate a file name
        //this will remove the blank-spaces from the title and replace it with an underscore
        var fileName = ReportTitle.replace(/ /g, "_");

        //Initialize file format you want csv or xls
        var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);

        // Now the little tricky part.
        // you can use either>> window.open(uri);
        // but this will not work in some browsers
        // or you will not get the correct file extension    

        //this trick will generate a temp <a /> tag
        var link = document.createElement("a");
        link.href = uri;

        //set the visibility hidden so it will not effect on your web-layout
        link.style = "visibility:hidden";
        link.download = fileName + ".csv";

        //this part will append the anchor tag and remove it after automatic click
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
});