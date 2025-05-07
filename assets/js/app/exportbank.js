var app = angular.module('appExportBankSlip', ['ngTable']);
app.controller('ctrlExportBankSlip', function($scope, $http, $filter, NgTableParams) {

    $scope.data = [];
    $scope.saveinvoice = {};
    $scope.Disablebutton = false;
    $scope.baseurl = base_url;
    $scope.fileHref ='';
    $scope.invoicecount = 0;

    $scope.ViewInvoices = function(monthandyear) {
        $http({
            method: 'GET', 
            headers : {
                "Authorization" : atoken
            },
            url: api_url + "/finance/invoiceListXML?monthandyear="+monthandyear
        }).then(function successCallback(response) {
            if (response.status = 200) {
                var data = response.data;
                $scope.invoicecount = response.data.length;
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
            Materialize.toast('Something', 3000, 'red');
        });
    }

    $scope.ExportAllBankXMLFormat= function(monthandyear,baseurl) {
        var baseurl = baseurl+'assets/BankSlip/';
        // console.log('baseurl',baseurl);
        $http({
            url: api_url + "/finance/export/bankslipAll",
            data: $.param({
                monthandyear : monthandyear
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : atoken
            }, 
            method: 'POST',
        }).success(function(response, result) {
            if (response.status = 200) {
                var tests=response.replace(/\"/g, "");
                $scope.fileHref = baseurl+tests;
                console.log('$scope.fileHref',baseurl+tests);
                var file_path = $scope.fileHref;
                var a = document.createElement('A');
                a.href = file_path;
                a.download = file_path.substr(file_path.lastIndexOf('/') + 1);
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            } else {
                Materialize.toast('error', 3000, 'red');
            }
        }).error(function(error) {
            $('#failure').html(error);
        });
    }  

    $scope.ExportBankStatement = function(invoiceid,invoiceno,monthandyear,clientid,projectid,baseurl) {
        var baseurl = baseurl+'assets/BankSlip/';
        $http({
            method: 'POST',
            url: api_url + "/finance/export/bankslip",
            data: $.param({
                "projectid": projectid,
                "monthandyear": monthandyear,
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : atoken
            }, 
        }).success(function(response, result) {
            var filename = response.replace(/['"]+/g, '');
            if (response.status = 200) {
                $scope.fileHref = baseurl+filename;   
                var file_path = $scope.fileHref;
                var a = document.createElement('A');
                a.href = file_path;
                a.download = file_path.substr(file_path.lastIndexOf('/') + 1);
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            }
        }).error(function(error) {
            Materialize.toast(error, 3000, 'red');
        });
    }  
});