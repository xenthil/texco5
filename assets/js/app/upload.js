var app = angular.module('appUpload', []);
app.controller('ctrlUpload', function($scope, $http) {

    $scope.closevacancy = function() 
    {
        if (confirm("Are you sure to close job vacancy list?")) {
            $http({
                method: 'GET', 
                headers : {
                    "Authorization" : atoken
                },
                url: api_url+"/job/jobposting/close",
            }).then(function successCallback(response) {
            if (response.status = 200) {
                     alert('Vacancy Closed Succesfully');
                } 
                else {
                    alert("error");
                }
            },function errorCallback(response) {
               alert("error");
            });
        }
    }

    $scope.exportvacancy = function() 
    {
        $http({
            method: 'GET', 
            headers : {
                "Authorization" : atoken
            },
            url: api_url+"/job/export/jobposting",
        }).then(function successCallback(response) {
        if (response.status = 200) {
                 JSONToCSVConvertor(response.data, 'Vavcncy List', true)
            } 
            else {
                alert("error");
            }
        },function errorCallback(response) {
           alert("error");
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
            alert("Invalid data");
            return;
        }   
        
        //Generate a file name
        //this will remove the blank-spaces from the title and replace it with an underscore
        var fileName = ReportTitle.replace(/ /g,"_");   
        
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
        $scope.$apply(function () { //I have used $scope.$apply because I will call this function from File input type control which is not supported 2 way binding
            $scope.Message = "";
            $scope.SelectedFileForUpload = files[0];
        })
    }
 
     $scope.vavcncy = [];
    //Parse Excel Data 
    $scope.ParseExcelDataAndSave = function () {
        var file = $scope.SelectedFileForUpload;
        if (file) {
            var reader = new FileReader();
            reader.onload = function (e) {
                var data = e.target.result;
                //XLSX from js-xlsx library , which I will add in page view page
                var workbook = XLSX.read(data, { type: 'binary' });
                var sheetName = workbook.SheetNames[0];
                var excelData = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                if (excelData.length > 0) {
                    $scope.vavcncy.push(excelData)
                    $http({
                        url: api_url + "/job/import/jobposting/",
                        data: $.param({
                            vacancy: $scope.vavcncy
                        }),
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Authorization' : atoken
                        }, 
                        method: 'POST',
                    }).success(function(response, result) {
                        if (result = 200) {
                           $scope.Message = "Vacancy Posting is uploaded successfully";
                           $('#file').val('');
                        }
                    }).error(function(error) {
                        $scope.error = error;
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

