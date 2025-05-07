var app = angular.module('appExportInvoice', ['ngTable']);
app.controller('ctrlExportInvoice', function ($scope, $http, $filter, NgTableParams) {

	$scope.data = [];
	$scope.saveinvoice = {};
	$scope.Disablebutton = false;
	$scope.baseurl = base_url;
	$scope.fileHref = '';
	$scope.invoicecount = 0;

	$scope.ViewInvoices = function (monthandyear) {
		$http({
			method: 'GET', 
			headers : {
				"Authorization" : atoken
			},
			url: api_url + "/finance/invoiceListXML?monthandyear=" + monthandyear
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

	$scope.ExportInvoiceXMLFormat = function (invoiceid, invoiceno, monthandyear, clientid, projectid, baseurl) {
		var baseurl = baseurl + 'assets/XMLDownload/';
		console.log('baseurl', baseurl);
		$http({
			url: api_url + "/xmlwriter",
			data: $.param({
				status: status,
				invoiceid: invoiceid,
				invoiceno: invoiceno,
				monthandyear: monthandyear,
				clientid: clientid,
				projectid: projectid,
				baseurl: baseurl
			}),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : atoken
            }, 
			method: 'POST',
		}).success(function (response, result) {
			if (response.status = 200) {
				$scope.fileHref = baseurl + "AccountingVoucher-" + invoiceno + ".xml";
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
		}).error(function (error) {
			$('#failure').html(error);
		});
	}

	$scope.ExportAllInvoiceXMLFormat = function (monthandyear, baseurl) {
		var baseurl = baseurl + 'assets/XMLDownload/';
		$http({
			url: api_url + "/finance/xmlwriterAll",
			data: $.param({
				monthandyear: monthandyear
			}),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : atoken
            }, 
			method: 'POST',
		}).success(function (response, result) {
			if (response.status = 200) {
				$scope.fileHref = baseurl + "AccountingVoucher-all.xml";
				console.log('$scope.fileHref', $scope.fileHref);
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
		}).error(function (error) {
			$('#failure').html(error);
		});
	}
});
