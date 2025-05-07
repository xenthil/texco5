var app = angular.module('appAgreementreport', ['ngTable', 'ui.bootstrap']);
app.controller('ctrlAgreementreport', function ($scope, $http, $filter, NgTableParams) {
    $scope.count = 0;
    $scope.itemsPerPage = $scope.totalItems;
    $scope.report = [];

   
    // Get Wage Year
    // $http({
    //     method: 'GET', 
    //     headers: {
    //         'Authorization' : atoken
    //     }, 
    //     url: api_url + "/agreement/exportdetails"
    // }).then(function successCallback(response) {
    //     if (response.status = 200) {
    //         var data = response.data;
    //         debugger
    //         for (var i = 0; i < data.length; i++) {
    //             delete data[i].agreementid;
    //             delete data[i].clientid;
    //             delete data[i].projectid;
    //             delete data[i].wageareaid;
    //             delete data[i].agreementstatusid;
    //             delete data[i].agreementinfoid;
    //             delete data[i].agreementdetailid;
    //             delete data[i].districtid;
    //             delete data[i].talukid;
    //             delete data[i].countryid;
    //             delete data[i].regionid;
    //             delete data[i].departmenttypeid;
    //             delete data[i].deptid;
    //             delete data[i].wageyearid;
    //             delete data[i].wagetypeid;
    //             delete data[i].agreementtypeid;
    //             delete data[i].agtypeid;
    //             delete data[i].stateid;
    //         }
    //         $scope.agreementdetail = data;
    //     } else {
    //         Materialize.toast('error', 3000, 'red');
    //     }
    // }, function errorCallback(response) {
    //     Materialize.toast('error', 3000, 'red');
    // });

    $http({
        method: 'GET', 
        headers: {
            'Authorization' : atoken
        }, 
        url: api_url + "/lookupvalues?lkdmcode=WGYEAR",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.wagerate = response.data.lookupvalues;
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });

    // Get Wage Area
    $http({
        method: 'GET', 
        headers: {
            'Authorization' : atoken
        }, 
        url: api_url + "/lookupvalues?lkdmcode=WGAREA",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.wagearea = response.data.lookupvalues;
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });

    // Get Agreement Type
    $http({
        method: 'GET', 
        headers: {
            'Authorization' : atoken
        }, 
        url: api_url + "/lookupvalues?lkdmcode=AGREE",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.agreementtype = response.data.lookupvalues;
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });

    //Type of Agreement
    $http({
        method: 'GET', 
        headers: {
            'Authorization' : atoken
        }, 
        url: api_url + "/lookupvalues?lkdmcode=AGTYPE",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.typeofagreement = response.data.lookupvalues;
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });

    // Get Agreement Status
    $http({
        method: 'GET', 
        headers: {
            'Authorization' : atoken
        }, 
        url: api_url + "/lookupvalues?lkdmcode=AGSTS",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.agreementstatus = response.data.lookupvalues;
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });

    // Get wagetype
    $http({
        method: 'GET', 
        headers: {
            'Authorization' : atoken
        }, 
        url: api_url + "/lookupvalues?lkdmcode=WGTYPE",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.wagetype = response.data.lookupvalues;
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });

    $scope.submitagreement = function (objagreement) {
        if (objagreement == undefined) {
            url = api_url + "/agreement/exportdetails"
        } else {
            url = api_url + "/agreement/exportdetails?agreementtypeid=" + objagreement.agreementtypeid + "&agtypeid=" + objagreement.typeagreement + "&agreementstatusid=" + objagreement.agreementstatus + "&wagetypeid=" + objagreement.wagetype + "&wageyearid=" + objagreement.wageyearid + "&wageareaid=" + objagreement.wageareaid
        }
        $http({
            method: 'GET', 
            headers: {
                'Authorization' : atoken
            }, 
            url: url
        }).then(function successCallback(response) {
            if (response.status = 200) {
                var data = response.data;
                // $scope.report = response.data;
                $scope.tableParams = new NgTableParams({
                    page: 1,
                    count: response.data.length
                }, {
                    data: data
                });
                $scope.report = response.data;
                $scope.totalItems = $scope.report.length;
            } else {
                Materialize.toast('error', 3000, 'red');
            }
        }, function errorCallback(response) {
            Materialize.toast('error', 3000, 'red');
        });
    }

    $scope.exportagreement = function (objagreement) {
        if (objagreement == undefined) {
            url = api_url + "/agreement/exportdetails"
        } else {
            url = api_url + "/agreement/exportdetails?agreementtypeid=" + objagreement.agreementtypeid + "&agtypeid=" + objagreement.typeagreement + "&agreementstatusid=" + objagreement.agreementstatus + "&wagetypeid=" + objagreement.wagetype + "&wageyearid=" + objagreement.wageyearid + "&wageareaid=" + objagreement.wageareaid
        }
        $http({
            method: 'GET', 
            headers: {
                'Authorization' : atoken
            }, 
            url: url
        }).then(function successCallback(response) {
            if (response.status = 200) {
                var data = response.data;
                JSONToCSVConvertor(data, 'Agreement_Report', true)
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
            Materialize.toast('Invalid Data', 3000, 'red');
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

    function convertToCSV(objArray) {
        var arrData = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
        var str = '';

        //1st loop is to extract each row
        for (var i = 0; i < arrData.length; i++) {
            var row = "";

            //2nd loop will extract each column and convert it in string comma-seprated
            for (var index in arrData[i]) {
                row += '"' + arrData[i][index] + '",';
            }

            row.slice(0, row.length - 1);

            //add a line break after each row
            str += row + '\r\n';
        }
        return str;
    }

    function exportCSVFile(headers, items, fileTitle) {
        if (headers) {
            items.unshift(headers);
        }

        // Convert Object to JSON
        var jsonObject = items;


        var csv = convertToCSV(jsonObject);
        console.log(csv);

        var exportedFilenmae = fileTitle + '.csv' || 'export.csv';

        var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        if (navigator.msSaveBlob) { // IE 10+
            navigator.msSaveBlob(blob, exportedFilenmae);
        } else {
            var link = document.createElement("a");
            if (link.download !== undefined) { // feature detection
                // Browsers that support HTML5 download attribute
                var url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", exportedFilenmae);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
    }

    function download(expdata) {
        var headers = {
            "agreementid": "AGREEMENT ID",
            "clientid": "CLIENT ID",
            "client": "CLIENT",
            "projectid": "PROJECT ID",
            "projectno": "PROJECT NO",
            "projectname": "PROJECT NAME",
            "fromdate": "FROM DATE",
            "todate": "TO DATE",
            "wagetypeid": "WAGE TYPE ID",
            "wagetype": "WAGE TYPE",
            "wageyearid": "WAGE YEAR ID",
            "wageyear": "WAGE YEAR",
            "wageareaid": "WAGE AREA ID",
            "wagearea": "WAGE AREA",
            "agreementstatusid": "AGREEMENT STATUS ID",
            "agreementstatus": "AGREEMENT STATUS",
            "optionaltype": "OPTIONAL TYPE",
            "agreementtypeid": "AGREEMENT TYPE ID",
            "agreementtype": "AGREEMENT TYPE",
            "agtypeid": "AG TYPE ID",
            "agtype": "AG TYPE",
            "agreementinfoid": "AGREEMENT INFO ID",
            "agreementdetailid": "AGREEMENT DETAIL ID",
            "sg": "SG",
            "sgsalary": "SG SALARY",
            "hsg": "HSG",
            "hsgsalary": "HSG SALARY",
            "dvr": "DVR",
            "dvrsalary": "DVR SALARY",
            "aso": "ASO",
            "asosalary": "ASO SALARY",
            "po": "PO",
            "posalary": "PO SALARY",
            "ja": "JA",
            "jasalary": "JA SALARY",
            "other": "OTHER",
            "othersalary": "OTHER SALARY",
            "oa": "OA",
            "oasalary": "OA SALARY",
            "gun": "GUN",
            "gunsalary": "GUN SALARY",
            "contactname": "CONTACT NAME",
            "email": "EMAIL",
            "mobile": "MOBILE",
            "phone": "PHONE",
            "gstno": "GST NO",
            "tanno": "TAN NO",
            "panno": "PAN NO",
            "addressline1": "ADDRESSLINE 1",
            "addressline2": "ADDRESSLINE 2",
            "addressline3": "ADDRESSLINE 3",
            "districtid": "DISTRICT ID",
            "district": "DISTRICT",
            "talukid": "TALUK ID",
            "taluk": "TALUK",
            "stateid": "STATE ID",
            "state": "STATE",
            "countryid": "COUNTRY ID",
            "country": "COUNTRY",
            "regionid": "REGION ID",
            "region": "REGION",
            "departmenttypeid": "DEPARTMENT TYPE ID",
            "departmenttype": "DEPARTMENT TYPE",
            "department": "DEPARTMENT",
            "deptid": "DEPARTMENT ID",
            "dept": "DEPARTMENT",
            "designation": "DESIGNATION",
            "projectaddress1": "PROJECT ADDRESSLINE 1",
            "projectaddress2": "PROJECT ADDRESSLINE 2",
            "projectaddress3": "PROJECT ADDRESSLINE 3",
            "pincode": ""
        };

        exportCSVFile(headers, expdata, 'Agreement_Report'); // call the exportCSVFile() function to process the JSON and trigger the download
    }
});