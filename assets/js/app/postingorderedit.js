var app = angular.module('appPostingEdit', ['ngTable', 'ui.bootstrap']).constant('_', window._);
app.constant("moment", moment);
app.controller('ctrlPostingEdit', function($scope, $http, $filter, NgTableParams) {

    $scope.count = 0;
    $scope.itemsPerPage = $scope.totalItems;
    $scope.jobactivityid = 0;
    $scope.inplace = {};
    $scope.jobactivityids = 0;
    $scope.memberid = 0;
    $scope.inplaces = 0;
    $scope.postinginplaces = 0;
    $scope.jobpostingdetailid = 0;
    $scope.isrejected = 0;
    $scope.selectedtype = 'Last 30 Days';
    $scope.date = [];
    $scope.posdata = [];
    $scope.memhistory = {};
    
    $scope.loading = false;
    $scope.SelectedFileForUpload = null;
    $scope.error = '';

	$scope.UploadFile = function (files) {
		debugger
		$("input").removeClass("disabled");
		$scope.$apply(function () { //I have used $scope.$apply because I will call this function from File input type control which is not supported 2 way binding
			$scope.Message = "";
			$scope.SelectedFileForUpload = files[0];
		})
	}
   
    $http({
        method: 'GET', 
        headers : {
            "Authorization" : atoken
        },
        url: api_url + "/job/jobmaster/",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            var data = response.data;
            $scope.jobmaster = data;
            console.log('$scope.jobmaster',$scope.jobmaster);
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });

    $http({
        method: 'GET', 
        headers : {
            "Authorization" : atoken
        },
        url: api_url + "/client/project?regionid=" + regionid,
    }).then(function successCallback(response) {
        if (response.status = 200) {
            var data = response.data;
            $scope.projects = data;
            // console.log('$scope.projects',$scope.projects);
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });

    $scope.getlastthirtydaysdetails = function() {
        $scope.posdata = [];
        $scope.currentdate = moment().format('YYYY-MM-DD');
        $scope.lastdate = moment().subtract(30, 'days').format('YYYY-MM-DD');
        $http({
            method: 'GET', 
            headers : {
                "Authorization" : atoken
            },
            url: api_url + "/job/getjobpostingdetails?fromdate="+$scope.lastdate+"&todate="+$scope.currentdate,
        }).then(function successCallback(response) {
            if (response.status = 200) {
                $scope.selectedtype = 'Last 30 Days';
                var data = response.data;
                $scope.posdata = data;
                $scope.tableParams = new NgTableParams({
                    page: 1,
                    count: response.data.length
                }, {
                    data: data
                });
            }
        }, function errorCallback(response) {
            Materialize.toast('Something has gone wrong!', 3000, 'red');
        });
    }

    $scope.getlastthirtydaysdetails();

    $scope.getlastninentydaysdetails = function() {
        $scope.posdata = [];
        $scope.currentdate = moment().format('YYYY-MM-DD');
        $scope.lastdate = moment().subtract(90, 'days').format('YYYY-MM-DD');
        $http({
            method: 'GET', 
            headers : {
                "Authorization" : atoken
            },
            url: api_url + "/job/getjobpostingdetails?fromdate="+$scope.lastdate+"&todate="+$scope.currentdate,
        }).then(function successCallback(response) {
            if (response.status = 200) {
                var data = response.data;
                $scope.selectedtype = 'Last 90 Days';
                $scope.posdata = data;
                $scope.tableParams = new NgTableParams({
                    page: 1,
                    count: response.data.length
                }, {
                    data: data
                });
            }
        }, function errorCallback(response) {
            Materialize.toast('Something has gone wrong!', 3000, 'red');
        });
    }

    $scope.getcustomdetails = function(objprofile) {
        $scope.posdata = [];
        $scope.currentdate = moment(objprofile.startdate).format('YYYY-MM-DD');
        $scope.lastdate = moment(objprofile.enddate).format('YYYY-MM-DD');
        $http({
            method: 'GET', 
            headers : {
                "Authorization" : atoken
            },
            url: api_url + "/job/getjobpostingdetails?fromdate="+$scope.currentdate+"&todate="+$scope.lastdate,
        }).then(function successCallback(response) {
            if (response.status = 200) {
                var data = response.data;
                $scope.posdata = data;
                $scope.selectedtype = objprofile.startdate + ' - ' + objprofile.enddate;
                $scope.tableParams = new NgTableParams({
                    page: 1,
                    count: response.data.length
                }, {
                    data: data
                });
            }
        }, function errorCallback(response) {
            Materialize.toast('Something has gone wrong!', 3000, 'red');
        });
    }

    $scope.editpostorder = function(applied)  {
        debugger
        $('.datepicker').pickadate({
            labelMonthNext: 'Go to the next month',
            labelMonthPrev: 'Go to the previous month',
            labelMonthSelect: 'Pick a month from the dropdown',
            labelYearSelect: 'Pick a year from the dropdown',
            selectMonths: true,
            selectYears: true,
            autoClose:true
        });
        $scope.memhistory.oldprojectid = applied.projectid;
        $scope.memhistory.oldstartdate = applied.startdate;
        $scope.memhistory.oldenddate = applied.enddate;
        $scope.memhistory.oldcategory = applied.category;
        $scope.memhistory.category = applied.category;
        $scope.memhistory.projectid = applied.projectid;
        $scope.memhistory.startdate = applied.startdate;
        $scope.memhistory.enddate = applied.enddate;
        $scope.memhistory.lastaccess = applied.lastaccess;
        $scope.memhistory.jobmasterid = applied.jobmasterid;
        $scope.memhistory.texcono = applied.texcono;
        $scope.memhistory.memberhistoryid = applied.memberhistoryid; 
        $scope.memhistory.memberid = applied.memberid;
        $scope.memhistory.serviceno = applied.serviceno;
        $scope.memhistory.firstname = applied.firstname;
        $scope.memhistory.rank = applied.rank;
        $('#editpostorder').modal('open');
    }

    $scope.cancelpostorder  = function(applied)  {   
        if (confirm("Are you sure to cancel this posting order?")) {  
            $http({
                method: 'POST',
                url: api_url + "/job/cancelpostingorder",
                data: $.param({
                    "memberhistoryid": applied.memberhistoryid,
                    "memberid": applied.memberid
                }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization' : atoken
                }, 
            }).then(function successCallback(response) {
                if (response.status = 200) {
                    $('#editpostorder').modal('close');
                    Materialize.toast('Posting Order Deleted Successfully!', 3000, 'green');
                    $scope.getlastthirtydaysdetails();
                }
            }, function errorCallback(response) {
                Materialize.toast('Something has gone wrong!', 3000, 'red');
            });
        }
    } 

    $scope.getSelectedCategory = function(jobmasterid)  {
        debugger
        var filteredpending = _.filter($scope.jobmaster, function (item) {
            return item.jobmasterid == jobmasterid;
        });
        $scope.memhistory.category = filteredpending[0].code;
    }

    $scope.getSelectedProjects = function(projectid) {
        var filteredpending = _.filter($scope.projects, function (item) {
            return item.projectid == projectid;
        });
        $scope.memhistory.projectno = filteredpending[0].projectno;
        $scope.memhistory.projectid = filteredpending[0].projectid; 
    }




    $scope.jobupdate = function(memhistory)  {
        var posturl = '';
        debugger
        memhistory.startdate = moment(memhistory.startdate).format('YYYY-MM-DD');
        memhistory.oldstartdate = moment(memhistory.oldstartdate).format('YYYY-MM-DD');
        memhistory.enddate = moment(memhistory.enddate).format('YYYY-MM-DD');
        

        if((Number(memhistory.oldprojectid) != Number(memhistory.projectid)) || (memhistory.category != memhistory.oldcategory)) { 
            posturl = api_url + "/job/transferposting";
        } 
        else if(Number(memhistory.oldprojectid) != Number(memhistory.projectid) && memhistory.startdate != memhistory.oldstartdate) {
            posturl = api_url + "/job/transferposting";
        } else if(Number(memhistory.oldprojectid) == Number(memhistory.projectid) && (memhistory.startdate == memhistory.oldstartdate || memhistory.startdate != memhistory.oldstartdate)) {
            posturl = api_url + "/job/updatejob";
        } else {
            posturl = api_url + "/job/updatejob";
        } 
        
        $http({
            method: 'POST',
            url: posturl,
            data: $.param({
                "data": memhistory
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : atoken
            }, 
        }).then(function successCallback(response) {
            if (response.status = 200) {
                $('#editpostorder').modal('close');
                Materialize.toast('Posting Order Updated Successfully!', 3000, 'green');
                $scope.getlastthirtydaysdetails();
            }
        }, function errorCallback(response) {
            Materialize.toast('Something has gone wrong!', 3000, 'red');
        });
    }


  
    $scope.addposting = function () {
        $('#addpostingorder').modal('open');
    } 

    $scope.bulkposting = function () {
        $scope.SelectedFileForUpload = null;
        $scope.error = '';
        $("input").removeClass("disabled"); 
        $('#postingorderbulk').modal('open');
    } 

    $scope.getSelectedCategories = function(jobmasterid)  {
        debugger
        var filteredpending = _.filter($scope.jobmaster, function (item) {
            return item.jobmasterid == jobmasterid;
        });
        $scope.objposting.category = filteredpending[0].code;
    }

    $scope.getSelectedProjectss = function(projectid) {
        var filteredpending = _.filter($scope.projects, function (item) {
            return item.projectid == projectid;
        });
        $scope.objposting.projectno = filteredpending[0].projectno;
        $scope.objposting.projectid = filteredpending[0].projectid; 
    }

    $scope.addpostingorder = function (objposting) {

        
     
        var posturl = api_url + "/job/addHistory"; 
        $scope.objposting.startdate = moment(objposting.fromdate).format('YYYY-MM-DD')
        if(objposting.todate !=undefined)
        {
        $scope.objposting.enddate = moment(objposting.todate).format('YYYY-MM-DD');
         }
         else
         {
            $scope.objposting.enddate ='0000-00-00' 
         }
        console.log(objposting);
        //return;
        
        $http({
            method: 'POST',
            url: posturl,
            data: $.param({
                "data": objposting
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : atoken
            }, 
        }).then(function successCallback(response) {
            if (response.status = 200) {
                $('#addpostingorder').modal('close');
                Materialize.toast('Posting Order Added Successfully!', 3000, 'green');
                $scope.getlastthirtydaysdetails();
            }
        }, function errorCallback(response) { 
            console.log('response',JSON.stringify(response));
            Materialize.toast(response.data, 5000, 'red');
        });
    } 
    
    $scope.memberdata = [];
	//Parse Excel Data 
	$scope.ParseExcelDataAndSave = function () {
        debugger
        $scope.memberdata = [];
		var file = $scope.SelectedFileForUpload;
		if (file) {
			$scope.SelectedFileForUpload = true;
			$scope.loading = true;
			var reader = new FileReader();
			reader.onload = function (e) {
                var data = e.target.result;
                //XLSX from js-xlsx library , which I will add in page view page
                var workbook = XLSX.read(data, { type: 'binary' });
                var sheetName = workbook.SheetNames[0];
                var excelData = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);

				if (excelData.length > 0) {
                    $scope.memberdata.push(excelData);
                    console.log('workbook.Sheets[sheetName]',$scope.memberdata);
					$http({
						url: api_url + "/job/import/memberhistory",
						data: $.param({
							memberdata: $scope.memberdata
						}),
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded',
							'Authorization' : atoken
						}, 
						method: 'POST',
					}).success(function (response, result) { 
                        debugger
                        console.log("result",result);
                        console.log("response",response);
						if (result = 200) { 
                            if(response[1] == 'success') {
                                $scope.loading = false; 
                                $('#postingorderbulk').modal('close');
                                Materialize.toast('Posting Order Uploaded Successfully', 3000, 'green');
                                $("input").addClass("disabled");
                                angular.element("input[type='text']").val(null);
                            } else {    
                                $scope.error = response[1]; 
                                JSONToCSVConvertor(response[0], 'Given Data Issues', true)
                            } 
						} else { 
                            console.log("error-res");
                            $scope.error = 'error'; 
                        }
					}).error(function (error) { 
                        debugger   
                        console.log("error",error);
						$scope.error = error;
					});
				} else {
					$scope.Message = "No data found";
                    console.log("message erroe",$scope.Message);
				}
			}
			reader.onerror = function (ex) {
				console.log(ex);
			}
			reader.readAsBinaryString(file);
		}
    } 
    
    function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {

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


    $scope.getMemberHistory = function(objprofile) {

       // alert();
        $scope.posdata = [];
        // $scope.currentdate = moment(objprofile.startdate).format('YYYY-MM-DD');
        // $scope.lastdate = moment(objprofile.enddate).format('YYYY-MM-DD');
        $http({
            method: 'GET', 
            headers : {
                "Authorization" : atoken
            },
            url: api_url + "/job/getMemberHistory?texconumber="+objprofile.texcono,
        }).then(function successCallback(response) {
            if (response.status = 200) {

                var data = response.data;
                $scope.posdata = data;
                $scope.selectedtype = objprofile.texcono;
                $scope.tableParams = new NgTableParams({
                    page: 1,
                    count: response.data.length
                }, {
                    data: data
                });
            }
        }, function errorCallback(response) {
            Materialize.toast('Something has gone wrong!', 3000, 'red');
        });
    }

    $scope.editMemberhistory = function(memhistory)  {
        var posturl = '';
        console.log(memhistory);
        debugger
        memhistory.startdate = moment(memhistory.startdate).format('YYYY-MM-DD');
       // memhistory.oldstartdate = moment(memhistory.oldstartdate).format('YYYY-MM-DD');
        memhistory.enddate = moment(memhistory.enddate).format('YYYY-MM-DD');
        
        $http({
            method: 'POST',
            url: api_url + "/job/updateMemberhistory",
            data: $.param({
                "data": memhistory
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : atoken
            }, 
        }).then(function successCallback(response) {
            if (response.status = 200) {
                $('#editpostorder').modal('close');
                Materialize.toast('Posting Order Updated Successfully!', 3000, 'green');
              //  $scope.getlastthirtydaysdetails();
            }
        }, function errorCallback(response) {
            Materialize.toast('Something has gone wrong!', 3000, 'red');
        });
    }


});