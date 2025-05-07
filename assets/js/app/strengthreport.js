var app = angular.module('appStrengthreport', ['ngSanitize', 'ngCsv', 'ngTable', 'ui.bootstrap']).constant('_', window._);
app.constant("moment", moment);
app.controller('ctrlStrengthreport', function ($scope, $http, $filter, NgTableParams) {

    $scope.status = [];
    $scope.objproject = {}; 
    $scope.currentdate = moment().format('YYYY-MM-DD');
	$scope.lastdate = moment().subtract(30, 'days').format('YYYY-MM-DD');
	$scope.objproject = {'fromdate':$scope.lastdate,'todate':$scope.currentdate};
    // alert('test');
    $scope.categories = []; 
    $scope.categories.push({'category':'SG'},{'category':'HSG'},{'category':'ASO'},{'category':'PO'},{'category':'DVR'},{'category':'JA'},{'category':'OA'},{'category':'GMAN'},{'category':'OTHER'},{'category':'TOT'});


    
	// Get region
	$scope.region = [];
	$http({
		method: 'GET', 
		headers : {
			"Authorization" : atoken
		},
		url: api_url + "/member/RegionDetails",
	}).then(function successCallback(response) {
		if (response.status = 200) {
			$scope.region = response.data.resultdata[0];
		}
	}, function errorCallback(response) {
		Materialize.toast('Something has gone wrong!', 3000, 'red');
    }); 

    $scope.getDistrictDetails = function (regionid) {
		debugger
		//$scope.Taluks = [];
		$scope.districtDetails = [];
		angular.forEach($scope.region, function (region) {
			if (region.region_id == regionid) {
				$scope.districtDetails = region.district;
				return;
			}
		});
	}


    
    $scope.clientslists = [];
	$http({
		method: 'GET', 
		headers : {
			"Authorization" : atoken
		},
		url: api_url + "/clientDropDown",
	}).then(function successCallback(response) {
		if (response.status = 200) {
			$scope.clientslists = response.data;
			// console.log('$scope.clientslists', $scope.clientslists);
		}
	}, function errorCallback(response) {
		Materialize.toast('Something has gone wrong!', 3000, 'red');
	});

    $scope.exportStrengthreport = function (objproject) {   
        $http({
            method: 'POST', 
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : atoken
            }, 
            url: api_url + '/getstrengthreport',
            data: $.param({
                monthandyear: objproject.monthandyear,
                regionid: objproject.regionid,
                districtid: objproject.districtid
			})
        }).then(function successCallback(response) { 
            var data = response.data;
            if (response.status = 200) {
                $scope.exportdata = [];
                var obj = {};
                for (var i = 0; i < data.length; i++) {
                    obj['sno'] = (i+1);
                    obj['projectno'] = data[i].projectno;
                    obj['projectname'] = data[i].projectname; 
                    var filteredclosed = _.filter($scope.categories, function (item) {
                        if(item.category == 'SG')
                            obj['AG-SG'] = (data[i].agstrength[item.category])?data[i].agstrength[item.category]:0; 
                        if(item.category == 'HSG')
                            obj['AG-HSG'] =  (data[i].agstrength[item.category])?data[i].agstrength[item.category]:0;
                        if(item.category == 'ASO')
                            obj['AG-ASO'] = (data[i].agstrength[item.category])?data[i].agstrength[item.category]:0; 
                        if(item.category == 'PO')
                            obj['AG-PO'] = (data[i].agstrength[item.category])?data[i].agstrength[item.category]:0; 
                        if(item.category == 'DVR')
                            obj['AG-DVR'] = (data[i].agstrength[item.category])?data[i].agstrength[item.category]:0;
                        if(item.category == 'OA')
                            obj['AG-OA'] = (data[i].agstrength[item.category])?data[i].agstrength[item.category]:0;
                        if(item.category == 'JA')
                            obj['AG-JA'] = (data[i].agstrength[item.category])?data[i].agstrength[item.category]:0;
                        if(item.category == 'GMAN')
                            obj['AG-GMAN'] = (data[i].agstrength[item.category])?data[i].agstrength[item.category]:0; 
                        if(item.category == 'OTHER')
                            obj['AG-OTHER'] = (data[i].agstrength[item.category])?data[i].agstrength[item.category]:0;
                    });
                    var filteredclosed = _.filter($scope.categories, function (item) {
                        if(item.category == 'SG')
                            obj['AT-SG'] = (data[i].atstrength[item.category])?data[i].atstrength[item.category]:0; 
                        if(item.category == 'HSG')
                            obj['AT-HSG'] = (data[i].atstrength[item.category])?data[i].atstrength[item.category]:0; 
                        if(item.category == 'ASO')
                            obj['AT-ASO'] = (data[i].atstrength[item.category])?data[i].atstrength[item.category]:0;
                        if(item.category == 'PO')
                            obj['AT-PO'] = (data[i].atstrength[item.category])?data[i].atstrength[item.category]:0;  
                        if(item.category == 'DVR')
                            obj['AT-DVR'] = (data[i].atstrength[item.category])?data[i].atstrength[item.category]:0;    
                        if(item.category == 'OA')
                            obj['AT-OA'] = (data[i].atstrength[item.category])?data[i].atstrength[item.category]:0; 
                        if(item.category == 'JA')
                            obj['AT-JA'] = (data[i].atstrength[item.category])?data[i].atstrength[item.category]:0; 
                        if(item.category == 'GMAN')
                            obj['AT-GMAN'] = (data[i].atstrength[item.category])?data[i].atstrength[item.category]:0;
                        if(item.category == 'OTHER')
                            obj['AT-OTHER'] = (data[i].atstrength[item.category])?data[i].atstrength[item.category]:0;    
                    });
                    var filteredclosed = _.filter($scope.categories, function (item) {
                        if(item.category == 'SG')
                            obj['BAL-SG'] = (data[i].balstrength[item.category])?data[i].balstrength[item.category]:0; 
                        if(item.category == 'HSG')
                            obj['BAL-HSG'] = (data[i].balstrength[item.category])?data[i].balstrength[item.category]:0;    
                        if(item.category == 'ASO')
                            obj['BAL-ASO'] = (data[i].balstrength[item.category])?data[i].balstrength[item.category]:0;  
                        if(item.category == 'PO')
                            obj['BAL-PO'] = (data[i].balstrength[item.category])?data[i].balstrength[item.category]:0;
                        if(item.category == 'DVR')
                            obj['BAL-DVR'] = (data[i].balstrength[item.category])?data[i].balstrength[item.category]:0;
                        if(item.category == 'OA')
                            obj['BAL-OA'] = (data[i].balstrength[item.category])?data[i].balstrength[item.category]:0;
                        if(item.category == 'JA')
                            obj['BAL-JA'] = (data[i].balstrength[item.category])?data[i].balstrength[item.category]:0;  
                        if(item.category == 'GMAN')
                            obj['BAL-GMAN'] = (data[i].balstrength[item.category])?data[i].balstrength[item.category]:0;    
                        if(item.category == 'OTHER')
                            obj['BAL-OTHER'] = (data[i].balstrength[item.category])?data[i].balstrength[item.category]:0;  
                    });
                    $scope.exportdata.push(obj);
                    obj = {};                    
                }
                JSONToCSVConvertor($scope.exportdata, 'Strength_Report', true)
            } else {
                Materialize.toast('error', 3000, 'red');
            }
        }, function errorCallback(response) {
            Materialize.toast('error', 3000, 'red');
        });
    }  
    
    $scope.submitStrengthreport = function (objproject) {
        $http({
            method: 'POST', 
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : atoken
            }, 
            url: api_url + '/getstrengthreport',
            data: $.param({
                monthandyear: objproject.monthandyear,
                regionid: objproject.regionid,
                districtid: objproject.districtid,
                districtid:objproject.clientid
			})
        }).then(function successCallback(response) {
            if (response.status = 200) {
                var data = response.data;  
                //$scope.categories = response.data[1]; 
                debugger
                $scope.tableParams = new NgTableParams({
                    page: 1,
                    count: response.data.length
                }, {
                    data: data
                });
            } else {
                Materialize.toast('error', 3000, 'red');
            }
        }, function errorCallback(response) {
            Materialize.toast('error', 3000, 'red');
        });
    }

    $scope.fillclientproject1 = function(data) {

        $scope.objproject.clientid = data.clientid;
        $scope.objproject.org = data.organization;
    }
    // No need for json convertor after include ngCsv module

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