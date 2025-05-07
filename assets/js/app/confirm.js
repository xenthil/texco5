var app = angular.module('appConfirm', ['ngTable', 'ui.bootstrap']);
app.controller('ctrlConfirm', function($scope, $http, $filter, NgTableParams) {
    $scope.count = 0;
    $scope.itemsPerPage = $scope.totalItems;
    $scope.jobactivityid = 0;
    $scope.inplace = {};

    $scope.jobactivityids = 0;
    $scope.memberid = 0;
    $scope.inplaces = 0;
    $scope.postinginplaces = 0;
    $scope.jobpostingdetailid = 0;
    $scope.effectivedates = 0;
    $scope.texconos = 0;
    $scope.closeddate = '';
    $scope.date = [];
    $http({
        method: 'GET', 
        headers : {
            "Authorization" : atoken
        },
        url: api_url + "/job/jobposting/closedate",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.date = response.data;
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });

    $scope.inplaceothercat = function(data) {
        console.log(data);
        $scope.inplace = {};
        $scope.jobprint = data;
        var arr = $scope.jobprint.inplace;
        if (arr != null) {
            if (arr.length > 0) {
                arr = arr.split(',');
                arrs = arr.reverse();
                $scope.inplace.inplace = arrs.shift();
                $scope.inplace.jobinplace = arr.join();
                // console.log($scope.inplace.jobinplace);
            }
        }
        // if($scope.jobprint.comments!=null){
        //     var dat=$scope.jobprint.comments.split(',');
        // }
        $('#modal1').modal('open');
    };

    $scope.jobactivity = function(data) {
       // var data = "";
        $http({
            method: 'GET', 
            headers : {
                "Authorization" : atoken
            },
            url: api_url + "/job/jobactivity/applied?closedate=" + data,
        }).then(function successCallback(response) {
            if (response.status = 200) {
                var data = response.data;
                $scope.tableParams = new NgTableParams({
                    page: 1,
                    count: response.data.length
                }, {
                    data: data
                });
                $scope.confirm = response.data;
                $scope.totalItems = $scope.confirm.length;
            } else {
                Materialize.toast('error', 3000, 'red');
            }
        }, function errorCallback(response) {
            Materialize.toast('error', 3000, 'red');
        });
    };

    $scope.viewapplied = function(closedate) { 
        $scope.closeddate = closedate;
        $http({
            method: 'GET', 
            headers : {
                "Authorization" : atoken
            },
            url: api_url + "/job/jobactivity/applied?closedate=" + closedate,
        }).then(function successCallback(response) {
            if (response.status = 200) {
                var data = response.data;
                $scope.tableParams = new NgTableParams({
                    page: 1,
                    count: response.data.length
                }, {
                    data: data
                });
                $scope.confirm = response.data;
                $scope.totalItems = $scope.confirm.length;
            } else {
                Materialize.toast('error', 3000, 'red');
            }
        }, function errorCallback(response) {
            Materialize.toast('error', 3000, 'red');
        });
    };

    $scope.jobactivity($scope.closeddate);
    $scope.jobconfirm = function(jobactivityid, memberid, jobcode, confirmdate, inplace, othercat, jobinplace, jobpostingdetailid,isrejected) {
    //    alert(jobinplace);
        debugger
        if (inplace != '' || othercat != '') {
            $http({
                method: 'POST',
                url: api_url + "/job/update/inplacecategory",
                data: $.param({
                    "jobactivityid": jobactivityid,
                    "inplace": inplace,
                    "category": othercat,
                    "confirmdate": confirmdate,
                    "jobpostingdetailid": jobpostingdetailid,
                    "jobinplace" : jobinplace,
                    "changedby": ''
                }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization' : atoken
                },
            }).success(function(response, result) {


            }).error(function(error) {
                $('#failure').html(error);
            });
        }

        $http({
            method: 'POST',
            url: api_url + "/job/jobactivity/status",
            data: $.param({
                "jobactivityid": jobactivityid,
                "memberid": memberid,
                "jobcode": jobcode,
                "confirmdate": confirmdate,
                "isrejected": isrejected
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : atoken
            },
        }).success(function(response, result) {

            if (response.includes("success")) {
                Materialize.toast('job Sucessfully Confirmed', 3000, 'green');
                $scope.jobactivity($scope.closeddate);
                var win = window.open(base_url + "admin/printposting?jobactivityid=" + jobactivityid, '_blank');
                if (win) {
                    win.focus();
                } else {
                    Materialize.toast('Please allow popups for this website!', 4000, 'orange') // 4000 is the duration of the toast
                }
            } else if (response.includes("failure")) {
                Materialize.toast('Employee already got posting order.', 3000, 'red');
            } else if (response.includes("vacancy")) {
                Materialize.toast('Vacancy filled for employee applied posting', 3000, 'red');
            } else {
                Materialize.toast('error', 3000, 'red');
            }
        }).error(function(error) {
            $('#failure').html(error);
        });
    };

    $scope.jobrejection = function(jobactivityid) {
        $http({
            method: 'POST',
            url: api_url + "/job/jobactivity/reject",
            data: $.param({
                "jobactivityid": jobactivityid
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : atoken
            },
        }).success(function(response, result) {
            $('#modalreject').modal('close');
            if (response.status = 200) {
                Materialize.toast('Job offer Rejected Successfully!', 3000, 'red');
                $scope.jobactivity($scope.closeddate);
            } else {
                alert("error");
            }
        }).error(function(error) {
            $('#failure').html(error);
        });
    };

    $scope.jobcancelmodel = function(jobactivityid, memberid,inplace,postinginplace,jobpostingdetailid,effectivedates,texconos) {
        $('#modalcancel').modal('open');
        $scope.jobactivityids = jobactivityid;
        $scope.memberid = memberid;
        $scope.inplaces = inplace;
        $scope.postinginplaces = postinginplace;
        $scope.jobpostingdetailid = jobpostingdetailid; 
        $scope.effectivedates = effectivedates; 
        $scope.texconos = texconos; 
    };

    $scope.jobcancelclose = function() {
        $('#modalcancel').modal('close');
        $('#modalreject').modal('close');
        $scope.jobactivityids = 0;
        $scope.memberid = 0;
        $scope.inplaces = 0;
        $scope.postinginplaces = 0;
        $scope.jobpostingdetailid = 0;
        $scope.effectivedates = 0;
        $scope.texconos = 0;
    };

    $scope.jobrejectionmodel = function(jobactivityid) {
        $('#modalreject').modal('open');
        $scope.jobactivityids = jobactivityid;
    };

    $scope.jobcancel = function(jobactivityid, memberid,inplace,postinginplace,jobpostingdetailid,effectivedate,texcono) {
       var inplacevalue = postinginplace + ', '+ inplace;
       var datearray = effectivedate.split("-");
       var newdate = datearray[1] + '/' + datearray[0] + '/' + datearray[2];
       var startdate =  new Date(newdate);
        $http({
            method: 'POST',
           url: api_url + "/job/jobactivity/cancel",
            data: $.param({
                "jobactivityid": jobactivityid,
                "memberid": memberid,
                "inplace":inplacevalue,
                "jobpostingdetailid":jobpostingdetailid,
                "effectivedate" : startdate,
                "texcono" : texcono
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : atoken
            }, 
        }).success(function(response, result) {
            if (response.status = 200) { 
                debugger
                Materialize.toast('Job offer Cancelled Successfully!', 3000, 'green');
                $('#modalcancel').modal('close');
                $scope.jobactivity($scope.closeddate);
            } else {
                alert("error");
            }
        }).error(function(error) {
            $('#failure').html(error);
        });
    };
    
    $scope.jobprojectchange = function(jobactivityid, memberid,inplace,postinginplace,jobpostingdetailid,effectivedate,texcono) {
        var inplacevalue = postinginplace + ', '+ inplace;
        var startdate = new Date(effectivedate);
        $http({
            method: 'POST',
            url: api_url + "/job/jobactivity/cancel",
            data: $.param({
                "jobactivityid": jobactivityid,
                "memberid": memberid,
                "inplace":inplacevalue,
                "jobpostingdetailid":jobpostingdetailid,
                "effectivedate" : startdate,
                "texcono" : texcono
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : atoken
            },
        }).success(function(response, result) { 
            debugger
            if (response.status = 200) { 
                $scope.jobactivity($scope.closeddate);
                window.location.href = base_url + "admin/vacancy";
            } else {
                alert("error");
            }
        }).error(function(error) {
            $('#failure').html(error);
        });
    };


    $scope.searchbydate = function(startdate, enddate) {
        if ((startdate != "" && enddate != "") && (startdate != undefined && enddate != undefined)) {
            var confirm = $scope.confirm;
            var filtered = [];
            var startdate = new Date(startdate);
            var enddate = new Date(enddate);
            angular.forEach(confirm, function(confirm) {
                applieddate = new Date(confirm.effectivedate);
                if (applieddate >= startdate && applieddate <= enddate) {
                    filtered.push(confirm);
                }
            });
            $scope.tableParams = new NgTableParams({
                page: 1,
                count: 10
            }, {
                data: filtered
            });
        } else {
            $scope.jobactivity($scope.closeddate);
        }
    };

    $scope.exportjobconfirm = function(closedate) {
        if(closedate){ closedate = closedate; }
        else{ closedate = ''; }
        $http({
            method: 'GET', 
            headers : {
                "Authorization" : atoken
            },
            url: api_url + "/job/jobactivity/applied/report?closedate=" + closedate,
        }).then(function successCallback(response) {
           
            if (response.status = 200) {
                var data = response.data;
                console.log('response',data);
                for (var i = 0; i < data.length; i++) {
                    delete data[i].memberid;
                }
                JSONToCSVConvertor(response.data, 'Jobpostings', true)
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
            // console.log('arrData',arrData[i]);
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

});