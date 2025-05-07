var app = angular.module('appUpload', []);
app.controller('ctrlUpload', function ($scope, $http) {
	$scope.logsdata = [];
	$scope.opendate = '';
	$scope.opentime = '';
	$scope.loading = false;
	$scope.closeDisableButton = false;

	$scope.SelectedFileForUpload = null;

	$scope.UploadFile = function (files) {
		debugger
		$("input").removeClass("disabled");
		$scope.$apply(function () { //I have used $scope.$apply because I will call this function from File input type control which is not supported 2 way binding
			$scope.Message = "";
			$scope.SelectedFileForUpload = files[0];
		})
	}

	$scope.dues = [];
	//Parse Excel Data 
	$scope.ParseExcelDataAndSave = function () {
        debugger
		var file = $scope.SelectedFileForUpload;
		if (file) {
			$scope.SelectedFileForUpload = true;
			$scope.loading = true;
			var reader = new FileReader();
			reader.onload = function (e) {
				var data = e.target.result;
				//XLSX from js-xlsx library , which I will add in page view page
				var workbook = XLSX.read(data, {
					type: 'binary'
				});
				var sheetName = workbook.SheetNames[0];
				var excelData = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
				if (excelData.length > 0) {
					$scope.dues.push(excelData)
					$http({
						url: api_url + "/job/dues/importdues/",
						data: $.param({
							dues: $scope.dues
						}),
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded',
							'Authorization' : atoken
						}, 
						method: 'POST',
					}).success(function (response, result) {
						if (result = 200) {
							$scope.loading = false;
							Materialize.toast('Invoice Due Uploaded Successfully', 3000, 'green');
							$("input").addClass("disabled");
							angular.element("input[type='text']").val(null);
						}

					}).error(function (error) {
						$scope.error = error;
					});
				} else {
					$scope.Message = "No data found";
				}
			}
			reader.onerror = function (ex) {
				console.log(ex);
			}
			reader.readAsBinaryString(file);
		}
	}

	$scope.ExportLogs = function () {
		JSONToCSVConvertor($scope.logsdata, 'Log List', true)
	}

	$scope.updateclosedate = function (closedate) {
		var closedate = new Date(closedate);
		$http({
			method: 'GET', 
			headers : {
				"Authorization" : atoken
			},
			url: api_url + "/job/jobposting/updateinactivedate?inactivedate=" + closedate,
		}).then(function successCallback(response) {
			if (response.status = 200) {
				Materialize.toast('Close Date Updated', 3000, 'green');
			} else {
				Materialize.toast('error', 3000, 'red');
			}
		}, function errorCallback(response) {
			Materialize.toast('error', 3000, 'red');
		});
	}

	$scope.updateopendate = function (openingdate, openingtime) {
		if (openingtime != '' && openingdate != '') {
			var opdate = formatDate(openingdate);
			var openingdate = opdate + " " + openingtime + ":00";
			$http({
				url: api_url + "/job/openingdate",
				data: $.param({
					openingdate: openingdate
				}),
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'Authorization' : atoken
				}, 
				method: 'POST',
			}).success(function (response, result) {
				if (response.status = 200) {
					Materialize.toast('Opening Date Updated', 3000, 'green');
					$http({
						method: 'GET', 
						headers : {
							"Authorization" : atoken
						},
						url: api_url + "/job/openingdate",
					}).then(function successCallback(response) {
						if (response.status = 200) {
							$scope.openingdate = response.data.opendate;
						}
					}, function errorCallback(response) {
						Materialize.toast('Something has gone wrong!', 3000, 'red');
					});
				} else {
					Materialize.toast('error', 3000, 'red');
				}
			}).error(function (error) {
				$('#failure').html(error);
			});
		}
	}

	function formatDate(date) {
		var d = new Date(date),
			month = '' + (d.getMonth() + 1),
			day = '' + d.getDate(),
			year = d.getFullYear();

		if (month.length < 2) month = '0' + month;
		if (day.length < 2) day = '0' + day;

		return [year, month, day].join('-');
	}

});
