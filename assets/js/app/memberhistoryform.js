var app = angular.module('appMemberHistoryForm', []).constant('_', window._);
app.constant("moment", moment);
app.controller('ctrlMemberHistoryForm', function($scope,$http) {

    $scope.members = [];
    $scope.selected = {};
    $scope.objmember = {};
    $scope.isshow = false;
    $scope.isDisabled = true;
    $scope.repcoblocks = [];
    $scope.jobmasters = [];

    // Get membershistory
    $http({ 
        method: 'GET', 
        headers : {
            "Authorization" : atoken
        },
        url: api_url + "/member/memberhistoryDetails",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.members = response.data;
            if ($scope.members.length > 0) {
                $scope.select($scope.members[0]);
            }
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    }); 

    $scope.projectnos = [];
    $http({
        method: 'GET',
        headers: {
            'Authorization' : atoken
        }, 
        url: api_url + "/prjectnos",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.projectnos = response.data;
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    }); 

    $http({
		method: 'GET', 
		headers : {
			"Authorization" : atoken
		},
		url: api_url + "/job/jobmaster",
	}).then(function successCallback(response) {
		if (response.status = 200) {
			$scope.jobmasters = response.data;
		}
	}, function errorCallback(response) {

    }); 

    $scope.UploadFile = function (files) {
		debugger
		$("input").removeClass("disabled");
		$scope.$apply(function () { //I have used $scope.$apply because I will call this function from File input type control which is not supported 2 way binding
			$scope.Message = "";
			$scope.SelectedFileForUpload = files[0];
		})
	}
   
    

    //Get memberinfo
    $scope.searchmember = function(serviceno) {
        $scope.servicenovalid = {};
        $("#failure").html("");
        $http({
            url: api_url + "/memberinfo?texserno=" + serviceno,
            data: $.param({
                texserno: serviceno
            }), 
            headers : {
                "Authorization" : atoken
            },
            method: 'GET',
        }).success(function(response, result) {
            if (result = 200) {
                $scope.objmember.serviceno = response.serviceno;
                $scope.objmember.currenttexcono = response.texcono;
                $scope.objmember.texcono = response.texcono;
                $scope.objmember.mobile = response.mobile;
                $scope.objmember.firstname = response.firstname;
                $scope.objmember.memberid = response.memberid;
                $scope.objmember.memhistoryid = 0;
                $scope.objmember.category = '';
                $scope.objmember.projectno = '';
                $scope.isDisabled = false;
            }
        }).error(function(error) {
            Materialize.toast(error, 3000, 'red');
        });
    }

    $scope.select = function(member) { 
        debugger
        $scope.selected = member;
        //$scope.selected.startdate = moment(member.startdate).format('DD-MM-YYYY');
        // $scope.selected.enddate = moment(member.enddate).format('DD-MM-YYYY');
        $scope.objmember.memhistoryid = member.memhistoryid;
        $scope.objmember.memberid = member.memberid;
        $scope.objmember.firstname = member.firstname;
        $scope.objmember.mobile = member.mobile;
        $scope.objmember.texcono = member.texcono;
        $scope.objmember.jobmasterid = member.jobmasterid;
        $scope.objmember.category = member.category;
        $scope.objmember.projectno = member.projectno;
        $scope.objmember.projectid = member.projectid;
        $scope.objmember.currenttexcono = member.currenttexcono;
        $scope.objmember.serviceno = member.serviceno;  
        $scope.objmember.servicenos = member.serviceno;
        $scope.objmember.startdate = member.startdate;
        $scope.objmember.enddate =member.enddate;
    } 

    $scope.addmemberhistory = function() {
        $scope.isshow = true;
        $scope.objmember = {};
        $scope.submitted = false;
        $('#mcaption').text("Add MemberHistory");
        $('#modal2').modal('open');
        $("#failure").html("");
    } 

    $scope.memberbulkupload = function () {
        $scope.SelectedFileForUpload = null;
        $scope.error = '';
        $("input").removeClass("disabled"); 
        $('#postingorderbulk').modal('open');
    } 

    $scope.getprojectno = function(projectid) { 
       
        var filteredrenewal = _.filter($scope.projectnos, function(item) {
            if(item.projectid == projectid) { 
                console.log('item.projectno', item.projectno);
                $scope.objmember.projectno = item.projectno;
            } 
        });  
    } 

    $scope.getjobmasterno = function(jobmasterid) {
        var filteredrenewal = _.filter($scope.jobmasters, function(item) {
            if(item.jobmasterid == jobmasterid) {
                $scope.objmember.category = item.code;
            }
        });  
    }

    $scope.savememberhistory = function(data) {
        debugger
        var method;
        if (data.memhistoryid > 0) {
            method = 'PUT';
        } else {
            method = 'POST';
        }
        $scope.searchmemberByID(data);
    };

    $scope.getmembersDetails = function() {
        $http({ 
            method: 'GET', 
            headers : {
                "Authorization" : atoken
            },
            url: api_url + "/member/memberhistoryDetails",
        }).then(function successCallback(response) {
            if (response.status = 200) {
                $scope.members = response.data;
                if ($scope.members.length > 0) {
                    $scope.select($scope.members[0]);
                }
            }
        }, function errorCallback(response) {
            Materialize.toast('Something has gone wrong!', 3000, 'red');
        }); 
    }

    $scope.searchmemberByID = function(data) {
        // console.log('data',data);
        $http({
            url: api_url + "/memberinfo?texserno=" + data.serviceno,
            data: $.param({
                texserno: data.serviceno
            }), 
            headers : {
                "Authorization" : atoken
            },
            method: 'GET',
        }).success(function(response, result) {
            if (result = 200) {
                debugger
                $scope.isDisabled = false;
                var method;
                if (data.memhistoryid > 0) {
                    method = 'PUT';
                } else {
                    method = 'POST';
                }
                $http({
                    url: api_url + "/members/memberhistory",
                    data: $.param({
                        "data": data
                    }),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization' : atoken
                    }, 
                    method: method,
                }).success(function(response, result) {
                    if (result = 200) {
                        $('#modal2').modal('close');
                        Materialize.toast('Memberhistory Saved Successfully!', 3000, 'green');
                        $scope.getmembersDetails();
                    }
                }).error(function(error) {
                    Materialize.toast(error, 5000, 'red');
                });
            }
        }).error(function(error) {
            Materialize.toast(error, 3000, 'red');
            $scope.isDisabled = true;
        });
    }

    $scope.editmemberhistory = function () { 
        $scope.isshow = false;
        $scope.submitted = false;
        $scope.functions = 'add';
        $scope.select($scope.selected);
        $('#mcaption').text("Edit MemberHistory");
        $('#modal2').modal('open');
        $("#failure").html("");
    } 

    $scope.removememberhistory = function() {
        if (confirm("Are you sure to delete this detail?")) {
            $http({
                url: api_url + "/members/history/updatestatus",
                data: $.param({
                    "memhistoryid": $scope.objmember.memhistoryid,
                    "changedby": "",
                }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    "Authorization" : atoken
                    
                },
                method: "DELETE",
            }).success(function(response, result) {
                if (result = 200) {
                    Materialize.toast('Memberhistory Deleted Successfully', 3000, 'green');
                    $scope.getmembersDetails();
                }
            }).error(function(error) {
                $('#failure').html(error);
            });
        };
    } 

    $scope.memberdata = [];
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
						url: api_url + "/members/import/memberhistory",
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
						if (result = 200) { 
                            if(response[1] == 'success') {
                                $scope.loading = false; 
                                $('#postingorderbulk').modal('close');
                                Materialize.toast('Posting Order Uploaded Successfully', 3000, 'green');
                                $("input").addClass("disabled");
                                angular.element("input[type='text']").val(null);
                                $scope.getmembersDetails();
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

});