var app = angular.module('apppricemaster', ['ngTable', 'ui.bootstrap']);
app.controller('ctrlpricemaster', function ($scope, $http, $filter, NgTableParams) {

	$scope.hidedgrwagearea = false;
	$scope.hidetnwagearea = false;
	$scope.showpassword = 0;

	// Get wageyear
	$http({
		method: 'GET', 
		headers : {
			"Authorization" : atoken
		},
		url: api_url + "/lookupvalues?lkdmcode=WGYEAR",
	}).then(function successCallback(response) {
		if (response.status = 200) {
			$scope.wageyear = response.data.lookupvalues;

			// if ($scope.wagetype.length > 0) {
			// 	$scope.wgselected = $scope.wagetype[0];
			// }
		}
	}, function errorCallback(response) {
		Materialize.toast('Something has gone wrong!', 3000, 'red');
	});

	$http({
		method: 'GET', 
		headers : {
			"Authorization" : atoken
		},
		url: api_url + "/lookupvalues/SettingStatus"
	}).then(function successCallback(response) {
		if (response.status = 200) {
			$scope.showpassword = response.data.loginstatus;
			console.log('$scope.showpassword',$scope.showpassword);
		}
	}, function errorCallback(response) {
		Materialize.toast('Something has gone wrong!', 3000, 'red');
	});

	// Get Particular
	$http({
		method: 'GET', 
		headers : {
			"Authorization" : atoken
		},
		url: api_url + "/lookupvalues?lkdmcode=WGPART",
	}).then(function successCallback(response) {
		if (response.status = 200) {
			$scope.wagepart = response.data.lookupvalues;
		}
	}, function errorCallback(response) {
		Materialize.toast('Something has gone wrong!', 3000, 'red');
	});

	// Get wagetype
	$http({
		method: 'GET', 
		headers : {
			"Authorization" : atoken
		},
		url: api_url + "/lookupvalues?lkdmcode=WGTYPE",
	}).then(function successCallback(response) {
		if (response.status = 200) {
			$scope.waget = response.data.lookupvalues;
			//if ($scope.wagetype.length > 0) {
			// console.log('$scope.waget', $scope.waget);
			angular.forEach($scope.waget, function (wage) {
				if (wage.code == 'DGR') {
					$scope.dgrlkval = wage.lkvalid
				} else if (wage.code == 'TN') {
					$scope.tnkval = wage.lkvalid
				}
			});
			//$scope.selectyear($scope.wageyear[0].lkvalid, 'dgr')
		}
	}, function errorCallback(response) {
		Materialize.toast('Something has gone wrong!', 3000, 'red');
	});

	// Get dgrrate
	$scope.selectyear = function (yearid, wagetype) {
		$scope.selected = yearid;
		$scope.wagetypes = wagetype;

		if ($scope.wagetypes == 'dgr') {
			$scope.typewage = $scope.dgrlkval
			urls = api_url + "/wage/dgr";
		} else if ($scope.wagetypes == 'tn') {
			$scope.typewage = $scope.tnkval
			urls = api_url + "/wage/tn";
		}

		$http({
			method: 'GET', 
			headers : {
				"Authorization" : atoken
			},
			url: urls,
		}).then(function successCallback(response) {
			if (response.status = 200) {
				// console.log(' response.data', response.data);
				$scope.dgrrates = response.data;
				angular.forEach($scope.dgrrates, function (rate) {
					if (rate.wageyearid == yearid) {
						$scope.dgrrate = rate
					}
				});
			}
		}, function errorCallback(response) {
			Materialize.toast('Something has gone wrong!', 3000, 'red');
		});
	}

	$scope.getchangeWageYear = function (yearid, wagetype) {
		debugger
		if (wagetype == 'DGR') {
			$scope.typewage = $scope.dgrlkval;
		} else if (wagetype == 'TN') {
			$scope.typewage = $scope.tnkval;
		}
		var urls = api_url + "/wage/getcategory?yearid="+yearid+"&wagetypeid="+wagetype;
		$http({
			method: 'GET', 
			headers : {
				"Authorization" : atoken
			},
			url: urls,
		}).then(function successCallback(response) {
			if (response.status = 200) {
				console.log(' response.data', response.data);
				$scope.wagecategories = response.data;
			}
		}, function errorCallback(response) {
			Materialize.toast('Something has gone wrong!', 3000, 'red');
		});

		$http({
			method: 'GET', 
			headers : {
				"Authorization" : atoken
			},
			url: api_url + "/lookupvalues?lkdmcode=WGAREA",
		}).then(function successCallback(response) {
			if (response.status = 200) {
				$scope.wagearea = response.data.lookupvalues;
			}
		}, function errorCallback(response) {
			Materialize.toast('Something has gone wrong!', 3000, 'red');
		});
	}

	$scope.ChangeWageType = function (wagetype) {
		debugger
		var wtype = $filter('filter')($scope.waget, {
			lkvalid: wagetype
		})[0]; 
		var wageratedefault = {}; 
		$scope.jobmasters.forEach(function (wagemaster) {
			debugger
			wageratedefault[wagemaster.jobmasterid] = 0;
		}); 

		if (wtype.code == 'DGR') {
			// Get wagearea
			$scope.hidetnwagearea = true;
			$http({
				method: 'GET', 
				headers : {
					"Authorization" : atoken
				},
				url: api_url + "/lookupvalues?lkdmcode=WGAREA",
			}).then(function successCallback(response) {
				if (response.status = 200) {
					$scope.wagearea = response.data.lookupvalues;
					debugger 
					$scope.wagearea.forEach(function (entry) {
						var b = {};
						$scope.particular.forEach(function (par) {
							debugger
							var a = {};
							$scope.jobmasters.forEach(function (wagemaster) {
								debugger
								a[wagemaster.jobmasterid] = 0;
							});
							debugger
							b[par.lkvalid] = a;
						});
						debugger
						$scope.objaddwage[entry.lkvalid] = b;
					});	
					//console.log('$scope.objaddwage',$scope.objaddwage);
				}
			}, function errorCallback(response) {
				Materialize.toast('Something has gone wrong!', 3000, 'red');
			});
		} else {
			// $scope.hidedgrwagearea = false;
			$scope.hidetnwagearea = true;
			$scope.wagearea = [{
				'description': 'TN Wage',
				'lkvalid':0
			}];
			debugger
			//$scope.objaddwage= []; 
		
			$scope.wagearea.forEach(function (entry) {
				var b = {};
				$scope.particular.forEach(function (par) {
					debugger
					var a = {};
					$scope.jobmasters.forEach(function (wagemaster) {
						debugger
						a[wagemaster.jobmasterid] = 0;
					});
					debugger
					b[par.lkvalid] = a;
				});
				debugger
				$scope.objaddwage[entry.lkvalid] = b;
			});	
		}	
	}

	$scope.ChangeWageTypes = function (wagetype) {
		debugger
		var wtype = $filter('filter')($scope.waget, {
			lkvalid: wagetype
		})[0];
		$scope.wageareaedit = [];
		if (wtype.code == 'DGR') {
			// Get wagearea
			$http({
				method: 'GET', 
				headers : {
					"Authorization" : atoken
				},
				url: api_url + "/lookupvalues?lkdmcode=WGAREA",
			}).then(function successCallback(response) {
				if (response.status = 200) {
					$scope.wageareaedit = response.data.lookupvalues;
					debugger
					// $scope.wageareaedit.forEach(function (entry) {
					// 	var b = {};
					// 	$scope.particular.forEach(function (par) {
					// 		debugger
					// 		var a = {};
					// 		$scope.jobmasters.forEach(function (wagemaster) {
					// 			debugger
					// 			a[wagemaster.jobmasterid] = 0;
					// 		});
					// 		debugger
					// 		b[par.lkvalid] = a;
					// 	});
					// 	debugger
					// 	$scope.objaddwageedit[entry.lkvalid] = b;
					// });	
				}
			}, function errorCallback(response) {
				Materialize.toast('Something has gone wrong!', 3000, 'red');
			});
		} else {
			// $scope.hidedgrwagearea = false;
			$scope.hidetnwagearea = true;
			$scope.wageareaedit = [{
				'description': 'TN Wage',
				'lkvalid':0
			}];
			debugger
			//$scope.objaddwage= [];
			// $scope.wageareaedit.forEach(function (entry) {
			// 	var b = {};
			// 	$scope.particular.forEach(function (par) {
			// 		debugger
			// 		var a = {};
			// 		$scope.jobmasters.forEach(function (wagemaster) {
			// 			debugger
			// 			a[wagemaster.jobmasterid] = 0;
			// 		});
			// 		debugger
			// 		b[par.lkvalid] = a;
			// 	});
			// 	debugger
			// 	$scope.objaddwage[entry.lkvalid] = b;
			// });	
		}	
	}

	$scope.SetDefaultWageRate = function(jobmasterid,jobmaster,particular,objaddwage,selectedid) { 
		debugger
		$scope.particular.forEach(function (par) {
			debugger 
			$scope.jobmasters.forEach(function (wagemaster) {
				debugger  
				console.log('objaddwage',objaddwage[0][par.lkvalid][wagemaster.jobmasterid]); 
				if(wagemaster.jobmasterid == Number(selectedid)) {  
					$scope.objaddwage[0][par.lkvalid][jobmasterid] = objaddwage[0][par.lkvalid][wagemaster.jobmasterid];  
					console.log('$scope.objaddwage[0][par.lkvalid][jobmasterid]',$scope.objaddwage[0][par.lkvalid][jobmasterid]);
				}
			});
		}); 
	}

	$scope.getamountDetails = function(categoryid,wageyearid,wagetypeid)  {
		
		var wtype = $filter('filter')($scope.wagecategories, {
			category_id : categoryid
		})[0];
		$scope.objaddwageedit.categorydescriptionedit = wtype.category_description;

		var wagetype = '';
		var wtype = $filter('filter')($scope.waget, {
			lkvalid: wagetypeid
		})[0];
		wagetype = wtype.code;
		
		var urls = '';
		if(wagetype === 'DGR') {
			urls = api_url + "/wage/dgr?categoryid="+categoryid+"&wageyearid="+wageyearid+"&wagetypeid="+wagetypeid;
		} else {
			urls = api_url + "/wage/tn?categoryid="+categoryid+"&wageyearid="+wageyearid+"&wagetypeid="+wagetypeid;
		}

		$http({
			method: 'GET', 
			headers : {
				"Authorization" : atoken
			},
			url: urls,
		}).then(function successCallback(response) {
			if (response.status = 200) {
				debugger
				$scope.wagerates = response.data[0];
				console.log('entry',$scope.wagerates);
				// $scope.wagerates.areas.forEach(function (entry) {
					
				// 	var b = {};
				// 	entry.particulars.forEach(function (par) {
				// 		var a = {};						
				// 		par.jobmasters.forEach(function (wagemaster) {
				// 			a[wagemaster.jobmasterid] = wagemaster.amount;
				// 			if(wagemaster.amount) 					
				// 				a[wagemaster.jobmasterid] = wagemaster.amount;
				// 			else 
				// 				a[wagemaster.jobmasterid] = 0;
				// 		});
				// 		b[par.particularid] = a;
				// 	});
				// 	$scope.objaddwageedit[entry.wageareaid] = b;
				// });	
			}
		}, function errorCallback(response) {
			Materialize.toast('Something has gone wrong!', 3000, 'red');
		});
	}

	$scope.editpricemaster = function (wageid, particularid, jobmasterid, wageareaid, amount, category, wageyear, wagetype, categorydescription) {
		debugger
		$scope.wageid = wageid;
		$scope.particularid = particularid;
		$scope.jobmasterid = jobmasterid;
		$scope.wageareaid = wageareaid;
		$scope.amount = amount;
		$scope.category = category;
		// $scope.wageyear = wageyear;
		$scope.wagetype = wagetype;
		$scope.categorydescription = categorydescription;
		if (wageid > 0) {
			method = 'PUT';
		} else {
			method = 'POST';
		}
		$http({
			url: api_url + "/wages",
			data: $.param({
				wageid: wageid,
				jobmasterid: jobmasterid,
				particularid: particularid,
				particularamount: amount,
				wageareaid: $scope.wageareaid,
				wagecategory: category,
				wageyearid: wageyear,
				wagetypeid: wagetype,
				wagecategorydescription: categorydescription
			}),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : atoken
            }, 
			method: method,
		}).success(function (response, result) {
			Materialize.toast('Wages Updated Successfully !', 3000, 'green');
		});
	};


	// $scope.editpricemaster = function (amount,wageid) {
	// 	debugger
	// 	var method = 'POST';
	// 	$http({
	// 		url: api_url + "/updatewagemaster",
	// 		data: $.param({
	// 			wageid: wageid,
	// 			particularamount: amount
	// 		}),
	// headers: {
	// 	'Content-Type': 'application/x-www-form-urlencoded',
	// 	'Authorization' : atoken
	// }, 
	// 		method: method,
	// 	}).success(function (response, result) {
	// 		Materialize.toast('Wages Updated  Successfully !', 3000, 'green');
	// 	});
	// }

	$scope.AddPopUp = function () {
		
		$('#addmodal').modal('open');
	}

	//get particular
	$http({
		method: 'GET', 
		headers : {
			"Authorization" : atoken
		},
		url: api_url + "/lookupvalues?lkdmcode=WGPART",
	}).then(function successCallback(response) {
		if (response.status = 200) {
			$scope.particular = response.data.lookupvalues;
			if ($scope.particular.length > 0) {
				$scope.wgselected = $scope.particular[0];
			}
		}
	}, function errorCallback(response) {
		Materialize.toast('Something has gone wrong!', 3000, 'red');
	});

	$scope.jobmasters = [];
	$http({
		method: 'GET', 
		headers : {
			"Authorization" : atoken
		},
		url: api_url + "/job/jobmaster",
	}).then(function successCallback(response) {
		if (response.status = 200) {
			// console.log('$scope.jobmasters', response.data);
			$scope.jobmasters = response.data;
		}
	}, function errorCallback(response) {

	});


	$scope.submitpassword = function(wpassword) {
		method = 'POST';
		$http({
			url: api_url + "/checkwagepassword",
			data: $.param({
				wpassword: wpassword,
			}),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : atoken
            }, 
			method: method,
		}).success(function (response, result) {
			//console.log('response',response);
			if(response.response == 1) {
				$scope.showpassword = 1;
				Materialize.toast('Wages Login Successfully !', 3000, 'green');
			} else {
				$scope.showpassword = 0;
				Materialize.toast('Entered Password is wrong !', 3000, 'red');
			}
			
		});
	}

	$scope.addwagemasterDetails = function (objaddwage) {
		debugger
		$scope.wageamount = [];
		$scope.wagess = [];
		$http({
			url: base_url + "Admin/addwages",
			data: $.param({
				objaddwage: $scope.objaddwage,
				wagearea: $scope.wagearea
			}),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : atoken
            }, 
			method: 'POST',
		}).success(function (response) {
			if (response.includes("success")) {
				$scope.wagearea = [];
				$scope.objaddwage = [];
				window.location.href = base_url + "admin/wagemaster";
				// $('#addmodal').modal('close');
				// Materialize.toast('Wages saved Successfully !', 3000, 'green');
			} else {
				Materialize.toast(response , 3000, 'red');
			}
			
		});
	}

	$scope.updatepricemaster = function (objupdateprice) {
		$scope.particularid = objupdateprice.wagetype;
		$scope.particularpercent = objupdateprice.percentage;
		$scope.particularamount = objupdateprice.amount;
		method = 'POST';
		$http({
			url: api_url + "/updatewages",
			data: $.param({
				particularid: $scope.particularid,
				particularamount: $scope.particularamount,
				particularpercent: $scope.particularpercent,
			}),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : atoken
            }, 
			method: method,
		}).success(function (response, result) {
			$('#modal3').modal('close');
			Materialize.toast('Wages updated Successfully !', 3000, 'green');
		});
	};

	$scope.SelectedFileForUpload = null;

	$scope.UploadFile = function (files) {
		$("input").removeClass("disabled");
		$scope.$apply(function () { //I have used $scope.$apply because I will call this function from File input type control which is not supported 2 way binding
			$scope.Message = "";
			$scope.SelectedFileForUpload = files[0];
		})
	}

	$scope.wage = [];
	//Parse Excel Data 
	$scope.ParseExcelDataAndSave = function (objaddwage) {  

		var file = $scope.SelectedFileForUpload;
		if(objaddwage.wagetype == undefined || objaddwage.wageyear == undefined || objaddwage.category == undefined || objaddwage.categorydescription == undefined || !file) {
			Materialize.toast('Please Select All Columns', 3000, 'red');
			return;
		}      
		if (file) {
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
					$scope.wage.push(excelData)
					$http({
						url: api_url + "/wages/import",
						data: $.param({
							'wages': $scope.wage, 
							'wagedetails': objaddwage,
							'wagearea': $scope.wagearea
						}),
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded',
							'Authorization' : atoken
						}, 
						method: 'POST',
					}).success(function (response, result) {
						if(response[1] == 'success') {
							$scope.loading = false; 
							Materialize.toast('Wage Details Uploaded Successfully', 3000, 'green');
							$("input").addClass("disabled");
							angular.element("input[type='text']").val(null);
						} else {    
							console.log('response[0]',response[0]);
							$scope.error = response[1]; 
							JSONToCSVConvertorError(response[0], 'Given Data Issues', true)
						} 
					}).error(function (error) {
						$scope.error = error;
						Materialize.toast($scope.error, 3000, 'red'); 
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
	
	function JSONToCSVConvertorError(JSONData, ReportTitle, ShowLabel) {
        debugger
		//If JSONData is not an object then JSON.parse will parse the JSON string in an Object 

		var arrData = JSONData;
		var CSV = '';
		//Set Report title in first row or line

		//1st loop is to extract each row
		for (var i = 0; i < arrData.length; i++) {
			var row = arrData[i];
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

});
