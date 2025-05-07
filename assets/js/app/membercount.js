var app = angular.module('appMembercount', ['ngSanitize', 'ngCsv', 'ngTable', 'ui.bootstrap']);
app.controller('ctrlMembercount', function ($scope, $http, $filter, NgTableParams) {

    $scope.status = [];

    $scope.objproject = {};   

    $http({
        method: 'GET', 
        headers : {
            "Authorization" : atoken
        },
        url: api_url + "/member/RegionDetails",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.regionDetails = response.data.resultdata[0];
            console.log('$scope.regionDetails',$scope.regionDetails);
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });

    $scope.getDistrictDetails = function(regionid) {
        debugger
        $scope.Taluks = [];
        $scope.districtDetails = [];
        angular.forEach($scope.regionDetails, function(region) {
            if (region.region_id == regionid) {
                $scope.districtDetails = region.district;
                return;
            }
        });
    }

    $scope.exportmembercount = function (objproject) {

        if (objproject == undefined) {
            objproject.regionid = 0;
            objproject.districtid = 0;
        }  else {
            if (objproject.regionid == undefined) {
                objproject.regionid = 0;
            } 
            if (objproject.districtid == undefined) {
                objproject.districtid = 0;
            } 
        }
        $http({
            method: 'GET',
            url: api_url + '/getmembercount?regionid='+objproject.regionid+'&districtid='+objproject.districtid,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : atoken
            }
        }).then(function successCallback(response) {
            if (response.status = 200) {
                var data = response.data;
                for (var i = 0; i < data.length; i++) {
                    data.sno = (i+1);
                }
                setTimeout(() => {
                    JSONToCSVConvertor(data, 'Member_Count_report', true)
                }, 20000);
                
            } else {
                Materialize.toast('error', 3000, 'red');
            }
        }, function errorCallback(response) {
            Materialize.toast('error', 3000, 'red');
        });
    }

    $scope.submitmembercount = function (objproject) {

        if (objproject == undefined) {
            objproject.regionid = 0;
            objproject.districtid = 0;
        }  else {
            if (objproject.regionid == undefined) {
                objproject.regionid = 0;
            } 
            if (objproject.districtid == undefined) {
                objproject.districtid = 0;
            } 
        }

        $http({
            method: 'GET',
            url: api_url + '/getmembercount?regionid='+objproject.regionid+'&districtid='+objproject.districtid,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : atoken
            }
        }).then(function successCallback(response) {
            if (response.status = 200) {
                var data = response.data;
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