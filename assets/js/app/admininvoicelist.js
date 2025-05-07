var app = angular.module('appInvoiceList', ['ngTable', 'ui.bootstrap','ui.utils']);
app.controller('ctrlInvoiceList', function($scope, $http, NgTableParams) {
    $scope.data = [];
    $scope.saveinvoice = {};
    $scope.Disablebutton = false;
    $http({
        method: 'GET',
        headers: {
            'Authorization' : atoken
        }, 
        url: api_url + "/job/invoiceList",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            var data = response.data;
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

    // Get Invoice List
    $scope.InvoiceList = function() {
        $http({
            method: 'GET',
            headers: {
                'Authorization' : atoken
            }, 
            url: api_url + "/job/invoiceList",
        }).then(function successCallback(response) {
            if (response.status = 200) {
                var data = response.data;
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
            Materialize.toast('Something went wrong try again', 3000, 'red');
        });    
    }

    $scope.ApproveInvoice = function(status,invoiceid) {
        if (confirm("Are you sure to approve invoice?")) {
            $http({
                url: api_url + "/client/ApproveInvoice",
                data: $.param({
                    status: status,
                    invoiceid: invoiceid
                }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization' : atoken
                }, 
                method: 'POST',
            }).success(function(response, result) {
                if (result = 200) {
                    Materialize.toast('Invoice Approved Successfully', 3000, 'green');
                    $scope.InvoiceList();
                }

            }).error(function(error) {
                $('#failure').html(error);
            });
        }
    }  

    $scope.ApprovePayment = function(status,invoiceid) {
        if (confirm("Are you sure you have received payment?")) {
            $http({
                url: api_url + "/client/ApproveInvoice",
                data: $.param({
                    status: status,
                    invoiceid: invoiceid
                }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization' : atoken
                }, 
                method: 'POST',
            }).success(function(response, result) {
                if (result = 200) {
                    Materialize.toast('UTR No Verified Successfully', 3000, 'green');
                    $scope.InvoiceList();
                }

            }).error(function(error) {
                $('#failure').html(error);
            });
        }
    }
    
});