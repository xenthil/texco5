var app = angular.module("appAdminMember", ["ngFileUpload", "ngTable"]);
app.controller(
	"ctrlAdminMember",
	function ($scope, $http, $filter, NgTableParams, Upload, $timeout) {
		this.myDate = new Date();
		this.isOpen = false;
		$scope.memberids = memberid;

		$scope.types = [
			{ id: "", title: "" },
			{ id: "Member", title: "Member" },
			{ id: "Dependent", title: "Dependent" },
		];
		$scope.members = [];
		$scope.selectedskill = [];
		$scope.expiredmembers = [];
		$scope.selected = {};
		$scope.objmember = {};
		$scope.objregister = {};
		$scope.memberid = 0;
		$scope.objprofile = {};
		$scope.viewby = 10;
		$scope.totalItems = 0;
		$scope.currentPage = 1;
		$scope.itemsPerPage = $scope.viewby;
		$scope.maxSize = 5; //Number of pager buttons to show
		$scope.filter = "";
		$scope.state = [];
		$scope.country = [];
		$scope.relations = [];
		$scope.rank = [];
		$scope.confirm = [];
		$scope.objregister.genderid = 0;
		$scope.servicenovalid = "";
		$scope.DisableButton = false;
		$scope.isDisabled = false;
		$scope.regionDetails = [];
		$scope.TalukDetails = [];
		// Get character
		$scope.character = [];
		$scope.valshow = 1;
		$scope.servicenumber = 0;
		$scope.updatemember = 0;

		//$scope.vacancypage=vacancypage;
		// Get alldistrict

		// Get Country

		// Get Country

		$http({
			method: "GET",
			headers: {
				Authorization: atoken,
			},
			url: api_url + "/job/jobmaster/",
		}).then(
			function successCallback(response) {
				if ((response.status = 200)) {
					var data = response.data;
					//$scope.jobmaster = data;
					console.log("$scope.jobmaster", $scope.jobmaster);
				}
			},
			function errorCallback(response) {
				Materialize.toast("Something has gone wrong!", 3000, "red");
			}
		);

		$http({
			method: "GET",
			headers: {
				Authorization: atoken,
			},
			url: api_url + "/vacancy/projectlist",
		}).then(
			function successCallback(response) {
				if ((response.status = 200)) {
					var data = response.data;
					$scope.projects = data;
					console.log("$scope.projects", $scope.projects);
				}
			},
			function errorCallback(response) {
				Materialize.toast("Something has gone wrong!", 3000, "red");
			}
		);

		$scope.getSelectedCategory = function (job) {
			//console.log(jobmasterid)
			$scope.jobpostingdetailid = job.jobpostingdetailid;
			$scope.jobmasterid = job.jobmasterid;
			console.log(job.available)
			if(job.available <=0)
			{
				$scope.unavailable=0;

			}
			else
			{
				$scope.unavailable=1;
			}

		};

		$scope.getSelectedProjects = function (selproj) {
			//console.log(selproj)

			$scope.jobmaster = selproj.jobs;
			$scope.selprojid = selproj.projectid;
			$scope.selprojno = selproj.projectno;
			$scope.selclient = selproj.clientid;
			// var filteredpending = _.filter($scope.projects, function (item) {
			// 	return item.projectid == projectid;
			// });
			//	$scope.vcprojectno = filteredpending[0].projectno;
			//	$scope.vcprojectid = filteredpending[0].projectid;
		};

		$scope.jobconfirm = function (docid, memberid, effectivedate, inplace) {
			//console.log(data);
			$http({
				method: "POST",
				url: api_url + "/job/addjobactivity",
				data: $.param({
					jobpostingdetailid: $scope.jobpostingdetailid,
					memberid: memberid,
					clientid: $scope.selclient,
					projectno: $scope.selprojno,
					projectid: $scope.selprojid,
					jobmasterid: $scope.jobmasterid,
					docid: docid,
					effectivedate: effectivedate,
					category: $scope.vcjobcat,
					inplace: inplace,
				}),
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
					Authorization: atoken,
				},
			})
				.success(function (response, result) {
					
					if (response.includes("success")) {
						window.location.href = base_url + "admin/vacancy";
						var win = window.open(
							base_url + "admin/printposting?jobactivityid=" + jobactivityid,
							"_blank"
						);
						if (win) {
							win.focus();
						} else {
							Materialize.toast(
								"Please allow popups for this website!",
								4000,
								"orange"
							); // 4000 is the duration of the toast
						}
					} else if (response.includes("failure")) {
						Materialize.toast("Employee already confirmed", 3000, "red");
					} else if (response.includes("vacancy")) {
						Materialize.toast("Vacancys filled", 3000, "red");
					} else {
						Materialize.toast("error", 3000, "red");
					}
				})
				.error(function (error) {
					$("#failure").html(error);
				});
		};

		$scope.getfulllistadmin = function (fromdate,todate) {
			// if (memberid == "") {
			// 	memberid = 0;
			// }
			//$scope.appdate = appdate;
			$http({
				method: "GET",
				headers: {
					Authorization: atoken,
				},
				url:
					api_url +
					"/appliedvacancypdf?fromdate=" +
					fromdate +"&todate="+todate+
					"&regionid=" +
					regionid,
			}).then(
				function successCallback(response) {
					if ((response.status = 200)) {
						console.log(response);
						var data = response.data;

						console.log("data", data);

						$scope.confirm = data;
						$scope.tableParams = new NgTableParams(
							{
								page: 1,
								count: 100000,
							},
							{
								data: data,
							}
						);
						$scope.totalItems = response.data.length;
					} else {
						Materialize.toast("error", 3000, "red");
					}
				},
				function errorCallback(response) {
					Materialize.toast("error", 3000, "red");
				}
			);
		};
		$scope.searchmembers = function (texserno) {
			// alert(jobid)
			$http({
				url: base_url + "Member/checkmember_login/",
				data: $.param({
					data: texserno,
				}),
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
					Authorization: atoken,
				},
				method: "POST",
			})
				.success(function (response, result) {
					if (response.includes("success")) {
						Materialize.toast("You are login is successfully", 3000, "green");
						setTimeout(function () {
							window.location = base_url + "member/skilldevelopment";
						}, 1500);
					} else {
						if (response.includes("User Alredy Logged in")) {
							// alert('User Alredy Logged in');
							var msg = "User Already Logged in";
							Materialize.toast(msg, 3000, "red");
						} else {
							Materialize.toast(response, 3000, "red");
						}
					}
				})
				.error(function (error) {
					Materialize.toast(error, 3000, "red");
				});
		};

		$scope.flleupload = function (file) {
			if (file != undefined && file != "") {
				file.upload = Upload.upload({
					url: base_url + "member/depdocupload/",
					data: {
						file: file,
					},
				});

				file.upload.then(
					function (response) {
						$scope.imagename = response.data;
						//datas.documentPath = $scope.imagename;
						console.log($scope.imagename);
					},
					function (response) {
						if (response.status > 0)
							$scope.errorMsg = response.status + ": " + response.data;
					},
					function (evt) {
						// Math.min is to fix IE which reports 200% sometimes
						file.progress = Math.min(
							100,
							parseInt((100.0 * evt.loaded) / evt.total)
						);
					}
				);
			} else if (file == undefined && file == "" && data.image != " ") {
				data.image = "defaultlogo.jpg";
			}
		};

		$scope.savevacancydoc = function (datas) {
			datas.memberid = $scope.memberids;
			//alert('reaady');
			//datas.documentPath = $scope.imagename;

			//datas.trainingRequired=JSON.stringify(JSON.stringify($scope.selectedskill))
			console.log(datas);

			$http({
				url: api_url + "/uploadapplydoc",
				data: $.param(datas),
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
					Authorization: atoken,
				},
				method: "POST",
			}).success(function (response, result) {
				if ((result = 200)) {
					//window.location = base_url + "member/dependency";
				}
			});

			// return;
		};

		$scope.confirmvacancy = function (data) {
			console.log(data);
			$scope.inplace = {};
			$scope.jobprint = data;
			//var arr = $scope.jobprint.inplace;

			// if($scope.jobprint.comments!=null){
			//     var dat=$scope.jobprint.comments.split(',');
			// }
			$("#modal1").modal("open");
		};

		$scope.uploadvacancydoc = function (datas, file) {
			if (file != undefined && file != "") {
				file.upload = Upload.upload({
					url: base_url + "member/vacancydocupload/",
					data: {
						file: file,
					},
				});

				file.upload.then(
					function (response) {
						alert(response.data.error);
						if (response.data.error == false) {
							$scope.imagename = response.data.message;
							datas.documentpath = $scope.imagename;
							$scope.savevacancydoc(datas);
						} else {
							var sttr = response.data.message.replace(/(<([^>]+)>)/gi, "");

							$scope.errorMsg = sttr;
							return;
						}
					},
					function (response) {
						if (response.status > 0)
							$scope.errorMsg = response.status + ": " + response.data;
					},
					function (evt) {
						// Math.min is to fix IE which reports 200% sometimes
						file.progress = Math.min(
							100,
							parseInt((100.0 * evt.loaded) / evt.total)
						);
					}
				);
			} else {
				//$scope.updatedependentsave(datas);
			}

			// return;
		};

		$scope.amsconfirmwilling = function (data) {
			// alert(jobid)
			if (confirm("Are you sure member is willing?")) {
				$scope.jobprint = data;
				$("#modal1").modal("open");
			}
		};

		$scope.amsconfirmjob = function (docid, memberid) {
			
				$http({
					url: api_url + "/job/vacancy/amsconfirmwilling/",
					data: $.param({
						jobpostingdetailid: $scope.jobpostingdetailid,
						memberid: memberid,
						clientid: $scope.selclient,
						projectno: $scope.selprojno,
						projectid: $scope.selprojid,
						jobmasterid: $scope.jobmasterid,
						docid: docid,
						category: $scope.vcjobcat,
						
					}),
					headers: {
						"Content-Type": "application/x-www-form-urlencoded",
						Authorization: atoken,
					},
					method: "POST",
				})
					.success(function (response, result) {
						if (response.includes("success")) {
							Materialize.toast(
								"Member confirmed succsessfully",
								4000,
								"green"
							); // 4000 is the duration of the toast

							$scope.getfulllistadmin($scope.closedate);
						}
					})
					.error(function (error) {
						Materialize.toast(error, 3000, "red");
					});
			
		};

		$scope.amsunmwilling = function (applied) {
			alert(applied.memberid)
			
			if (confirm("Are you sure you want to unwilling?")) {
				// alert(jobid)
				$http({
					url: api_url + "/job/vacancy/amsunmwilling/",
					data: $.param({
						data: applied.documentid,
					}),
					headers: {
						"Content-Type": "application/x-www-form-urlencoded",
						Authorization: atoken,
					},
					method: "POST",
				})
					.success(function (response, result) {
						if (response.includes("success")) {
							$scope.getfulllistadmin($scope.closedate);
						}
					})
					.error(function (error) {
						Materialize.toast(error, 3000, "red");
					});
			}
		};

		$scope.amsreject = function (applied) {
			if (confirm("Are you sure you want to reject?")) {
				// alert(jobid)
				$http({
					url: api_url + "/job/vacancy/amsreject/",
					data: $.param({
						data: applied.documentid,
					}),
					headers: {
						"Content-Type": "application/x-www-form-urlencoded",
						Authorization: atoken,
					},
					method: "POST",
				})
					.success(function (response, result) {
						if (response.includes("success")) {
							$scope.getfulllistadmin($scope.closedate);
						}
					})
					.error(function (error) {
						Materialize.toast(error, 3000, "red");
					});
			}
		};


		//alert(vacancypage)

		$scope.closedate = new Date();
		$scope.getfulllistadmin($scope.closedate);
		//$scope.getskillmember();

		$scope.exportnewjobapply = function (fromdate,todate) {
			if (!fromdate || !todate) {
				alert('from date to date cannot be empty');
				return;
			} 
			$http({
				method: "GET",
				headers: {
					Authorization: atoken,
				},
				//url: api_url + "/job/jobactivity/applied/report?closedate=" + closedate,
				url:
					api_url +
					"/appliedvacancypdfdownload?fromdate=" +
					fromdate +"&todate="+todate+
					"&regionid=" +
					regionid,
			}).then(
				function successCallback(response) {
					if ((response.status = 200)) {
						var data = response.data;
						console.log("response", data);
						for (var i = 0; i < data.length; i++) {
							delete data[i].memberid;
						}
						JSONToCSVConvertor(response.data, "Jobpostings", true);
					} else {
						Materialize.toast("error", 3000, "red");
					}
				},
				function errorCallback(response) {
					Materialize.toast("error", 3000, "red");
				}
			);
		};

		function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
			//If JSONData is not an object then JSON.parse will parse the JSON string in an Object
			var arrData =
				typeof JSONData != "object" ? JSON.parse(JSONData) : JSONData;

			var CSV = "";
			//Set Report title in first row or line

			//This condition will generate the Label/Header
			if (ShowLabel) {
				var row = "";

				//This loop will extract the label from 1st index of on array
				for (var index in arrData[0]) {
					//Now convert each value to string and comma-seprated
					row += index.toUpperCase() + ",";
				}

				row = row.slice(0, -1);

				//append Label row with line break
				CSV += row + "\r\n";
			}

			//1st loop is to extract each row
			for (var i = 0; i < arrData.length; i++) {
				var row = "";
				// console.log('arrData',arrData[i]);
				//2nd loop will extract each column and convert it in string comma-seprated
				for (var index in arrData[i]) {
					row += '"' + arrData[i][index] + '",';
				}

				row.slice(0, row.length - 1);

				//add a line break after each row
				CSV += row + "\r\n";
			}

			if (CSV == "") {
				Materialize.toast("Invalid Data", 3000, "red");
				return;
			}

			//Generate a file name
			//this will remove the blank-spaces from the title and replace it with an underscore
			var fileName = ReportTitle.replace(/ /g, "_");

			//Initialize file format you want csv or xls
			var uri = "data:text/csv;charset=utf-8," + escape(CSV);

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
	}
);
