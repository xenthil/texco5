var app = angular.module('appCategorywise', ['ngSanitize', 'ngCsv', 'ngTable', 'ui.bootstrap']); 
app.constant("moment", moment);
app.controller('ctrlCategorywise', function ($scope, $http, $filter, NgTableParams) {

    $scope.status = [];
    
    $scope.objproject = {}; 
    $scope.currentdate = moment().format('YYYY-MM-DD');
	$scope.lastdate = moment().subtract(30, 'days').format('YYYY-MM-DD');
	$scope.objproject = {'fromdate':$scope.lastdate,'todate':$scope.currentdate};

    $scope.submitcategorywise = function (objproject) { 
        $http({
            method: 'POST',
            url: api_url + '/getcategorywisecount',
            data: $.param({
                startdate: objproject.fromdate,
                enddate: objproject.todate
			}),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : atoken
            }
        }).then(function successCallback(response) {
            if (response.status = 200) {
                var data = response.data; 
                // for(var i = 1; i < response.data.length; i++) {
                //     data.push(response.data[i]);
                // } 
                $scope.tableParams = new NgTableParams({
                    page: 1,
                    count: data.length
                }, {
                    data: data
                });
                $scope.report = data;
                $scope.totalItems = $scope.report.length;
            } else {
                Materialize.toast('error', 3000, 'red');
            }
        }, function errorCallback(response) {
            Materialize.toast('error', 3000, 'red');
        });
    }

    $scope.exportcategorywise = function (objproject) {
        $http({
            method: 'POST',
            url: api_url + '/getcategorywisecount',
            data: $.param({
                startdate: objproject.fromdate,
                enddate: objproject.todate
			}),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : atoken
            }
        }).then(function successCallback(response) {
            if (response.status = 200) {
                var data = response.data;
                // for (var i = 0; i < data.length; i++) {
                // }
                //  $scope.exportcategorywise = data;
                JSONToCSVConvertor(data, 'CategoryWise_report', true)
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