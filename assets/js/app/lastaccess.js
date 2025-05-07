var app = angular.module('appUpload', []);
app.controller('ctrlUpload', function($scope, $http, $filter) {
		
    $scope.attendancedetails = [];
    $scope.objemployee = {};
    $scope.filter = "";
    $scope.attendance = [];

    $scope.UploadFile = function (files) {
        $("input").removeClass("disabled"); 
        $scope.$apply(function () { //I have used $scope.$apply because I will call this function from File input type control which is not supported 2 way binding
            $scope.Message = "";
            $scope.SelectedFileForUpload = files[0];
        })
    }
	
	 $scope.ParseExcelDataAndSave = function () {
		 $scope.memberdetail=[];
        var file = $scope.SelectedFileForUpload; 
        debugger
        if (file) {
            var reader = new FileReader();
            debugger
            reader.onload = function (e) {
                var data = e.target.result;
                //XLSX from js-xlsx library , which I will add in page view page
                var workbook = XLSX.read(data, { type: 'binary' });
                var sheetName = workbook.SheetNames[0];
                var excelData = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                console.log('excelData',excelData);
                if (excelData.length > 0) {
                    $scope.memberdetail.push(excelData)
					
                    $http({
                        url: api_url + "/members/lastaccess/import",
                        data: $.param({
                            memberdetail: $scope.memberdetail
                        }),
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Authorization' : atoken
                        }, 
                        method: 'POST',
                    }).success(function(response, result) {
                        if (result = 200) {
                           $scope.Message = "LastAccessDate is uploaded successfully";
                             //$("input").addClass("disabled"); 
                             angular.element("input[type='text']").val(null);
                        }
                    }).error(function(error) {
                       Materialize.toast(error, 3000, 'red');
                    });
                }
                else {
                    $scope.Message = "No data found";
                }
            }
            reader.onerror = function (ex) {
                console.log(ex);
            }
            reader.readAsBinaryString(file);
        }
    }
});