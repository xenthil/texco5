var app = angular.module('appEmployees', ['ngTable', 'ui.bootstrap']);
app.controller('ctrlEmployees', function($scope, $http, $filter, NgTableParams) {
    $scope.count = 0;
    $scope.itemsPerPage = $scope.totalItems;
    // $scope.viewby = 25;
    // $scope.totalItems = 0;
    // $scope.currentPage = 1;
    // $scope.itemsPerPage = $scope.viewby;
    // $scope.maxSize = 20; //Number of pager buttons to show
    $scope.report = [];

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
    // // Get status
    // $scope.status = [];
    // $http({
    //     method: 'GET',
    //     url: api_url + "/lookupvalues?lkdmcode=JOBST",
    // }).then(function successCallback(response) {
    //     if (response.status = 200) {
    //         $scope.status = response.data.lookupvalues;
    //     }
    // }, function errorCallback(response) {
    //     Materialize.toast('Something has gone wrong!', 3000, 'red');
    // });

    // // Get DISTRICT
    // $scope.district = [];
    // $http({
    //     method: 'GET',
    //     url: api_url + "/lookupvalues?lkdmcode=DISTRC",
    // }).then(function successCallback(response) {
    //     if (response.status = 200) {
    //         $scope.district = response.data.lookupvalues;
    //     }
    // }, function errorCallback(response) {
    //     Materialize.toast('Something has gone wrong!', 3000, 'red');
    // });

    // // Get region
    // $scope.region = [];
    // $http({
    //     method: 'GET',
    //     url: api_url + "/lookupvalues?lkdmcode=REGION",
    // }).then(function successCallback(response) {
    //     if (response.status = 200) {
    //         $scope.region = response.data.lookupvalues;
    //     }
    // }, function errorCallback(response) {
    //     Materialize.toast('Something has gone wrong!', 3000, 'red');
    // });

    $scope.submitemployee = function() {
         // if (objemployee == undefined) {
         //    url = api_url + "/members/all"
         // } else {
         //      url = api_url + "/members/all"
         // }
        $http({
            method: 'GET', 
            headers: {
                'Authorization' : atoken
            }, 
            url: api_url + "/members/all"
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
                $scope.totalItems = $scope.report.length;
            } else {
                Materialize.toast('error', 3000, 'red');
            }
        }, function errorCallback(response) {
            Materialize.toast('error', 3000, 'red');
        });
    }

    $scope.exportemployee = function() {
        $http({
            method: 'GET', 
            headers: {
                'Authorization' : atoken
            }, 
            url: api_url + "/members/all"
        }).then(function successCallback(response) {
            if (response.status = 200) {
                var data = response.data;
                JSONToCSVConvertor(response.data, 'Allemployees List', true)
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