var app = angular.module('appUpload', []);
app.controller('ctrlUpload', function ($scope, $http) {
	$scope.logsdata = [];
	$scope.opendate = '';
	$scope.opentime = '';
	$scope.loading = false;
	$scope.closeDisableButton = false;

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


	$scope.closevacancy = function () {
		if (confirm("Are you sure to close job vacancy list?")) {
			$scope.closeDisableButton = true;
			$http({
				method: 'GET', 
				headers : {
					"Authorization" : atoken
				},
				url: api_url + "/job/jobposting/close",
			}).then(function successCallback(response) {
				console.log('response...', response);
				if (response.status = 200) {
					Materialize.toast(response.data.replace(/\"/g, ""), 3000, 'green');
					$scope.closeDisableButton = false;
				} else {
					Materialize.toast('error', 3000, 'red');
				}
			}, function errorCallback(response) {
				Materialize.toast('error', 3000, 'red');
			});
		}
	}

	$scope.exportvacancy = function () {
		$http({
			method: 'GET', 
			headers : {
				"Authorization" : atoken
			},
			url: api_url + "/job/export/jobposting",
		}).then(function successCallback(response) { 
			if (response.status = 200) {  
				debugger
				$scope.jobpostingss = response.data;
				var results = [];
                for(var i = 0;i < $scope.jobpostingss.length; i++) { 
					
                    var result = [{'PROJNO':$scope.jobpostingss[i].PROJECTNO,'PROJNAME':$scope.jobpostingss[i].PROJECTNAME,'DISTRICT':$scope.jobpostingss[i].DISTRICT,'REGION':$scope.jobpostingss[i].REGION}];
                    angular.forEach($scope.jobpostingss[i].jobs, function(projects) {
                        result[0][projects.code]=projects.numberofvacancies; 
                    });
                    angular.forEach($scope.jobpostingss[i].jobs, function(projects) {
						result[0][projects.code +'COMMENTS']= '';
						result[0][projects.code +'INPLACEOF']= ''; 
						if(projects.comments != undefined) { result[0][projects.code +'COMMENTS'] = projects.comments; }
                        if(projects.inplace != undefined) { result[0][projects.code +'INPLACEOF'] = projects.inplace; }
                    });
                    results.push(result[0]);
                    var result = [];
                }
				JSONToCSVConvertor(results, 'vacancy List', true)
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
			Materialize.toast('Invalid data', 3000, 'red');
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

	$scope.SelectedFileForUpload = null;

	$scope.UploadFile = function (files) {
		debugger
		$("input").removeClass("disabled");
		$scope.$apply(function () { //I have used $scope.$apply because I will call this function from File input type control which is not supported 2 way binding
			$scope.Message = "";
			$scope.SelectedFileForUpload = files[0];
		})
	}

	$scope.vacancys = [];
	//Parse Excel Data 
	$scope.ParseExcelDataAndSave = function () {
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
					$scope.vacancys.push(excelData)
					$http({
						url: api_url + "/job/import/jobposting/",
						data: $.param({
							vacancy: $scope.vacancys
						}),
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded',
							'Authorization' : atoken
						}, 
						method: 'POST',
					}).success(function (response, result) {
						if (result = 200) {
							if (response.length > 0) {

								if (typeof response === 'object') {
									$scope.logsdata = JSON.stringify(response, undefined, 2);
								}
								$scope.logscount = response.length;
							} else {
								
								Materialize.toast('Vacancy Posting is uploaded successfully', 3000, 'green');
								$scope.SelectedFileForUpload = false;
								$scope.loading = false;
								
							}
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
					"Authorization" : atoken
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
