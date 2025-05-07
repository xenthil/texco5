var app = angular.module('appAdminMember', []);
app.controller('ctrlAdminMember', function($scope, $http) {

    $scope.members = [];
    $scope.selected = {};
    $scope.objmember = {};
    $scope.isshow = false;
    $scope.isDisabled = true;
    $scope.BlockLabelName = 'Life Time Block';
    $scope.repcoblocks = [];
    // Get members
    $http({ 
        method: 'GET', 
        headers : {
            "Authorization" : atoken
        },
        url: api_url + "/memberblock?memberblockid=0",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.members = response.data;
            if ($scope.members.length > 0) {
                $scope.select($scope.members[0]);
            }
        //     console.log('$scope.members',$scope.members);
           // $scope.repcoblocks = response.data;
            for(var i = 0; i <  $scope.members.length; i++) {
                // console.log('$scope.members',$scope.members[i].lifetimeblock , $scope.members[i].memberid);
                if($scope.members[i].lifetimeblock == 1) {
                    var enddate = 'Life Time Block';
                } else {
                    var enddate = $scope.members[i].enddate;
                }
                var pfblock = 'NO';
                if($scope.members[i].ispfblock == 1) {
                    pfblock = 'YES';
                }
                var isrepcoblock = 'NO';
                if($scope.members[i].isrepcoblock == 1) {
                    isrepcoblock =  'YES';
                }
                var memberblock = 'NO';
                if($scope.members[i].ispfblock == 0 && $scope.members[i].isrepcoblock == 0) {
                    memberblock = 'YES';
                }
                var sg = {'SNo':(i+1),'FirstName':$scope.members[i].firstname,'ServiceNo':$scope.members[i].serviceno, 'Texcono':$scope.members[i].texcono, 'MobileNo':$scope.members[i].mobile,'Reason':$scope.members[i].reason, 'Comments':$scope.members[i].comment, 'EndDate':enddate, 'IspfBlock':pfblock, 'IsRepcoBlock':isrepcoblock, 'IsMemberBlock': memberblock};
                $scope.repcoblocks.push(sg);
            }
            // console.log('response.data',response.data);

        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });

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
                $scope.objmember.texcono = response.texcono;
                $scope.objmember.mobile = response.mobile;
                $scope.objmember.firstname = response.firstname;
                $scope.objmember.memberid = response.memberid;
                $scope.objmember.memberblockid = 0;
                $scope.isDisabled = false;
            }
        }).error(function(error) {
            Materialize.toast(error, 3000, 'red');
        });
    }

    $scope.exportRepco = function () {
		if ( $scope.repcoblocks.length > 0) {
			JSONToCSVConvertor($scope.repcoblocks, 'Repco_List', true)
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
                if (data.memberblockid > 0) {
                    method = 'PUT';
                } else {
                    method = 'POST';
                }
                $http({
                    url: api_url + "/members/block",
                    data: $.param({
                        "memberid": data.memberid,
                        "memberblockid": data.memberblockid,
                        "comment": data.comment,
                        "reason": data.reason,
                        "enddate": data.enddate,
                        "ispfblock": data.ispfblock,
                        "isrepcoblock": data.isrepcoblock,
                        "blocktype": data.blocktype,
                        "memberblock": data.memberblock,
                        "changedby": data.changedby
                    }),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization' : atoken
                    }, 
                    method: method,
                }).success(function(response, result) {
                    if (result = 200) {
                        $('#modal2').modal('close');
                        Materialize.toast('Member Block Saved..!', 3000, 'green');
                        setTimeout(function() {
                           window.location.href = base_url + "admin/memberblock";
                        }, 3000);
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

    // Get Selected members
    $scope.select = function(member) {
        $scope.selected = member;
        $scope.objmember.memberblockid = member.memberblockid;
        $scope.objmember.memberid = member.memberid;
        $scope.objmember.firstname = member.firstname;
        $scope.objmember.mobile = member.mobile;
        $scope.objmember.texcono = member.texcono;
        $scope.objmember.serviceno = member.serviceno;
        $scope.objmember.comment = member.comment;
        $scope.objmember.reason = member.reason;
        $scope.objmember.enddate = member.enddate;
        $scope.objmember.ispfblock = member.ispfblock;
        $scope.objmember.isrepcoblock = member.isrepcoblock;
        $scope.objmember.lifetimeblock = member.lifetimeblock;

        if(member.isrepcoblock == 0 && member.ispfblock == 0) {
            $scope.objmember.blocktype = 1;
        } else if(member.isrepcoblock == 1 && member.ispfblock == 0) {
            $scope.objmember.blocktype = 2;   
        } else if(member.isrepcoblock == 0 && member.ispfblock == 1) {
            $scope.objmember.blocktype = 3;   
        } else if(member.isrepcoblock == 1 && member.ispfblock == 1) {
            $scope.objmember.blocktype = 4;   
        } else {
            $scope.objmember.blocktype = 1;
        }
       
    }

    // Add Member New objects
    $scope.addmemberblock = function() {
        $scope.isshow = true;
        $scope.objmember = {};
        $scope.submitted = false;
        $scope.objmember.genderid = 0;
        $('#mcaption').text("Add Block (Ex-servicemens)");
        $('#modal2').modal('open');
        $("#failure").html("");
        //  $scope.functions= 'add';
        //  $scope.captchaValid = {};
    }

    $scope.editmemberblock = function() {
        $scope.isshow = false;
        $scope.submitted = false;
        $scope.functions = 'add';
        $scope.select($scope.selected);
        $('#mcaption').text("Edit Block (Ex-servicemens)");
        $("label").addClass("active");
        $('#modal2').modal('open');
        $("#failure").html("");
        // $scope.functions= 'edit';
    }

    $scope.editprofile = function() {
        $scope.select($scope.selected);
        $("label").addClass("active");
        $('#modal2').modal('open');
    }

    // SAVE MEMBER - In both apply and member
    $scope.savememberblock = function(data) {
        var method;
        if (data.memberblockid > 0) {
            method = 'PUT';
        } else {
            method = 'POST';
        }
        $scope.searchmemberByID(data);
    };

    // Delete member
    $scope.removememberblock = function() {
        if (confirm("Are you sure to delete this detail?")) {
            $http({
                url: api_url + "/members/block/updatestatus",
                data: $.param({
                    "memberblockid": $scope.objmember.memberblockid,
                    "changedby": "",
                }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    "Authorization" : atoken
                },
                method: "DELETE",
            }).success(function(response, result) {
                if (result = 200) {
                    Materialize.toast('Meber Block Updated..!', 3000, 'green');
                    setTimeout(function() {
                        window.location.href = base_url + "admin/memberblock";
                    }, 1500);
                }
            }).error(function(error) {
                $('#failure').html(error);
            });
        };
    }

    // $scope.changetype = function(memberblock)  {
    //     if (memberblock.blocktype == 1) {
    //         $scope.BlockLabelName = 'Life Time Block';
    //         $scope.objmember.memberblock = 0;
    //     }
    // }

    // change member block
    $scope.blocktypechange = function(blocktype) {
        if (blocktype == 1) {
            $scope.BlockLabelName = 'Life Time Block';
            $scope.objmember.memberblock = 0;
            $scope.objmember.ispfblock = 0;
            $scope.objmember.isrepcoblock = 0;
        }
        if (blocktype == 2) {
            $scope.BlockLabelName = 'Repco Block';
            $scope.objmember.memberblock = 1;
            $scope.objmember.ispfblock = 0;
            $scope.objmember.isrepcoblock = 1;
        }
        if (blocktype == 3) {
            $scope.BlockLabelName = 'PF Block';
            $scope.objmember.memberblock = 1;
            $scope.objmember.ispfblock = 1;
            $scope.objmember.isrepcoblock = 0;
        }
        if (blocktype == 4) {
            $scope.BlockLabelName = 'Repco & PF Block';
            $scope.objmember.memberblock = 1;
            $scope.objmember.ispfblock = 1;
            $scope.objmember.isrepcoblock = 1;
        }
    }

});