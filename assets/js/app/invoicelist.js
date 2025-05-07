var app = angular.module('appInvoiceList', ['ngTable', 'ui.bootstrap','ui.utils']);
app.controller('ctrlInvoiceList', function($scope, $http, $filter, NgTableParams) {
    $scope.clientid = clientid;
    $scope.data = [];
    $scope.saveinvoice = {};
    $scope.Disablebutton = false;
    $scope.types = types;
    $http({
        method: 'GET', 
        headers : {
            "Authorization" : atoken
        },
        url: api_url + "/client/invoiceList?clientid="+$scope.clientid+"&types="+types,
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
            headers : {
                "Authorization" : atoken
            },
            url: api_url + "/client/invoiceList?clientid="+$scope.clientid,
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
            Materialize.toast('Something went wrong!Please Try again', 3000, 'red');
        });
    }
    $scope.ApproveInvoice = function(status,invoiceid) {
        if (confirm("Are you sure to change invoice status?")) {
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
                    if(status==3) {
                        Materialize.toast('Invoice Rejected Successfully', 3000, 'green');
                    }else{
                        Materialize.toast('Invoice Approved Successfully', 3000, 'green');
                    }
                    $scope.InvoiceList();
                }

            }).error(function(error) {
                $('#failure').html(error);
            });
        }
    }  

    $scope.addUTRNo = function(invoice) {
        $scope.submitted = false;
        $scope.saveinvoice = invoice;
        $scope.saveinvoice.paymentutrnos = $scope.saveinvoice.paymentutrno;
        $scope.saveinvoice.paidamounts = $scope.saveinvoice.paidamount;
        $('#invoiceno').text($scope.saveinvoice.invoiceno);
        $('#createdate').text($scope.saveinvoice.createdate);
        $('#invoiceid').val($scope.saveinvoice.invoiceid);
        $('#totalamount').text($scope.saveinvoice.totalamount);
        if($scope.saveinvoice.paidamounts == 0 || $scope.saveinvoice.paymentutrnos == ''){
            $('#paymentutrno').val($scope.saveinvoice.paymentutrno);
            $('#paidamount').val($scope.saveinvoice.paidamount);
        }else{
            $scope.saveinvoice.paymentutrno ='';
            $scope.saveinvoice.paidamount = '';
        }
        // console.log('$scope.saveinvoice',$scope.saveinvoice);
        $('#modal3').modal('open');
    };

    $scope.saveUTRDetails = function(saveinvoice) {
        $scope.Disablebutton = true;
        $http({
            url: api_url + "/client/AddInvoiceUTRNo",
            data: $.param({
                utrno: saveinvoice.paymentutrno,
                paidamount:saveinvoice.paidamount,
                invoiceid: saveinvoice.invoiceid,
                paidamounts:saveinvoice.paidamounts,
                paymentutrnos:saveinvoice.paymentutrnos
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : atoken
            }, 
            method: 'POST',
        }).success(function(response, result) {
            if (result = 200) {
                Materialize.toast('Invoice Payment UTR No added Successfully', 3000, 'green');
                $scope.InvoiceList();
            }
            $scope.Disablebutton = false;
            $('#modal3').modal('close');
        }).error(function(error) {
            $('#failure').html(error);
        });
    }

});