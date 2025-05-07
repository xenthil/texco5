var app = angular.module('appAdminEXPMember', ["ngSanitize", "ngCsv"]);
app.controller('ctrlAdminEXPMember', function ($scope, $http) {

	$scope.expiredmembers = [];
	$scope.selected = {};
	$scope.objmember = {};
	$scope.objregister = {};
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
	$scope.servicenovalid = '';
	$scope.DisableButton = false;
	$scope.isDisabled = false;
	$scope.expiredmembersworking = [];
	
	$http({
		method: 'GET', 
		headers : {
			"Authorization" : atoken
		},
		url: api_url + "/membersabove58",
	}).then(function successCallback(response) {
		if (response.status = 200) {
			$scope.expiredmembers = response.data;
			// console.log('$scope.expiredmembers',JSON.stringify($scope.expiredmembers));
			if ($scope.expiredmembers.length > 0) {
				$scope.select($scope.expiredmembers[0]);
			}
		}
	}, function errorCallback(response) {
		Materialize.toast('Something has gone wrong!', 3000, 'red');
	});

	$http({
		method: 'GET', 
		headers : {
			"Authorization" : atoken
		},
		url: api_url + "/membersaboveworking58",
	}).then(function successCallback(response) {
		if (response.status = 200) {
			$scope.expiredmembersworking = response.data;
		}
	}, function errorCallback(response) {
		Materialize.toast('Something has gone wrong!', 3000, 'red');
	});

	// Get Selected members

	$scope.select = function (member) {
		$scope.selected = member;
		$scope.objmember.memberid = member.memberid;
		$scope.objmember.firstname = member.firstname;
		$scope.objmember.lastname = member.lastname;
		$scope.objmember.fathername = member.fathername;
		$scope.objmember.dob = member.dob;
		$scope.objmember.age = member.age;
		$scope.objmember.email = member.email;
		$scope.objmember.mobile = member.mobile;
		$scope.objmember.doj = member.doj;
		$scope.objmember.genderid = member.genderid;
		$scope.objmember.pincode = member.pincode;
		$scope.objmember.districtid = member.districtid;
		$scope.objmember.regionid = member.regionid;
		$scope.objmember.accountno = member.accountno;
		$scope.objmember.address = member.address;
		$scope.objmember.village = member.village;
		$scope.objmember.talukid = member.talukid;
		$scope.objmember.stateid = member.stateid;
		$scope.objmember.countryid = member.countryid;
		$scope.objmember.addressstatus = member.addressstatus;
		$scope.objmember.communicationaddress = member.communicationaddress;
		$scope.objmember.aadhaarno = member.aadhaarno;
		$scope.objmember.nominee = member.nominee;
		$scope.objmember.nomineerelationid = member.nomineerelationid;
		$scope.objmember.rankid = member.rankid;
		$scope.objmember.corpsid = member.corpsid;
		$scope.objmember.tradeid = member.tradeid;
		$scope.objmember.corps = member.corps;
		$scope.objmember.trade = member.trade;
		$scope.objmember.esmidno = member.esmidno;
		$scope.objmember.characterid = member.characterid;
		$scope.objmember.religionid = member.religionid;
		$scope.objmember.casteid = member.casteid;
		$scope.objmember.civilqual = member.civilqual;
		$scope.objmember.armyqual = member.armyqual;
		$scope.objmember.registrationno = member.registrationno;
		$scope.objmember.lastaccess = member.lastaccess;
		$scope.objmember.texcono = member.texcono;
		$scope.objmember.serviceno = member.serviceno;
		$scope.objmember.dependentstatus = member.dependentstatus;
		$scope.objmember.dependentname = member.dependentname;
		$scope.objmember.panno = member.panno;
		$scope.objmember.uanno = member.uanno;
	}

	$scope.exportMembers = function (expiredmembers) {
		if (expiredmembers.length > 0) {
			for (var i = 0; i < expiredmembers.length; i++) {
				delete expiredmembers[i].active;
				delete expiredmembers[i].email;
				delete expiredmembers[i].lastaccess;
				delete expiredmembers[i].dependentname;
				delete expiredmembers[i].dependentstatus;
			}
			JSONToCSVConvertor(expiredmembers, 'Members_List', true)
		}
	}

	function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
		debugger;
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
            Materialize.toast('Invalid Data', 3000, 'red');
            return;
        }

        //Generate a file name
        //this will remove the blank-spaces from the title and replace it with an underscore
        var fileName = ReportTitle.replace(/ /g, "_");

        //Initialize file format you want csv or xls
        var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
		debugger;
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
	   setTimeout(function() {
		link.click();
	   },5000);
		
        document.body.removeChild(link);
    }
});
