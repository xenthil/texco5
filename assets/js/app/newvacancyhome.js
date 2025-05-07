var app = angular.module("appAdminMember", ["ngFileUpload", "ngTable","ui.bootstrap"]);
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
		$scope.selectedskill=[];
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
		$scope.baseurl=baseurl;

		//$scope.vacancypage=vacancypage;
		// Get alldistrict

		// Get Country

	


		// Get Country
		

		$http({
			method: 'GET', 
			headers : {
				"Authorization" : atoken
			},
			url: api_url + "/getvacancypdf",
		}).then(function successCallback(response) {
			if (response.status = 200) {
				$scope.vacancy = response.data[0];
				window.location=$scope.baseurl+'assets/vacancy/uploadadmin/'+response.data[0].vacancypdfpath
			}
		}, function errorCallback(response) {});
		


		



		
	

		
		



	
		
//alert(vacancypage)
	
	//	$scope.getfulllistadmin();
		//$scope.getskillmember();
	}
);
