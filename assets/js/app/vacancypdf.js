var app = angular.module('appDocument', ['ngFileUpload']);
app.controller('ctrlDocument', function($scope, $http, Upload, $timeout) {
    $scope.document = [];
    $scope.documents = [];
    $scope.selected = {};
    $scope.objdocument = {};
    $scope.filter = "";
    $scope.documents1 = [];
    $scope.documents2 = [];
    $scope.icons = [];
    $scope.folders = [];

    $scope.icons = [{
            id: '1',
            icon: 'description',
            colour: 'blue'
        }, {
            id: '2',
            icon: 'announcement',
            colour: 'pink'
        },
        {
            id: '3',
            icon: 'insert_chart',
            colour: 'green'
        },
        {
            id: '4',
            icon: 'dns',
            colour: 'cyan'
        },
        {
            id: '5',
            icon: 'lock',
            colour: 'red'
        },
        {
            id: '6',
            icon: 'list',
            colour: 'indigo'
        },
        {
            id: '7',
            icon: 'assignment',
            colour: 'purple'
        },
        {
            id: '8',
            icon: 'phone',
            colour: 'orange'
        },
        {
            id: '9',
            icon: 'done',
            colour: 'amber'
        },
        {
            id: '10',
            icon: 'filter_drama',
            colour: 'light-blue'
        },
        {
            id: '11',
            icon: 'stars',
            colour: 'teal'
        }
    ];

    // Get documents
    $http({
        method: 'GET', 
        headers : {
            "Authorization" : atoken
        },
        url: api_url + "/viewvacancypdf",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.documents = response.data[0];
            // console.log('$scope.documents',$scope.documents);
            //if ($scope.documents.length > 0) {
             //   $scope.vacpdf=;
            //}
            
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });

    /*$http({
        method: 'GET', 
        headers : {
            "Authorization" : atoken
        },
        url: api_url + "/document",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.documents = response.data;
            console.log('$scope.documents',$scope.documents.length);
            for (i = 0; i <= $scope.documents.length; i++) {
                if (i % 2 == 0) { 
                    $scope.documents1.push($scope.documents[i]);
                    $scope.documents1 = $scope.documents1.filter(function(element) {
                        return element !== undefined;
                    });
                } else {
                    $scope.documents2.push($scope.documents[i]);
                    $scope.documents2 = $scope.documents2.filter(function(element) {
                        return element !== undefined;
                    });
                }
            }
            console.log('$scope.documents1',$scope.documents1.length);
            console.log('$scope.documents2.length',$scope.documents2.length);
            if ($scope.documents.length > 0) {
                $scope.select($scope.documents[0]);
            }
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });*/

    $http({
        method: 'GET', 
        headers : {
            "Authorization" : atoken
        },
        url: api_url + "/documentfolders",
    }).then(function successCallback(response) {
        console.log('$scope.folders', response);
        if (response.status = 200) {
            $scope.folders = response.data.foldervals;
            
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });


    


    $scope.select = function(document) {
        $scope.selected = document;
        // $scope.objdocument.foldername = document.folderid+'##'+document.foldername;
         $scope.objdocument.vacancyid = document.vacancyid;
        // $scope.objdocument.name = document.name;
        $scope.objdocument.documentname = document.vacancypdfpath;
        $scope.objdocument.description = document.description;
        // $scope.objdocument.colour = document.iconcolour;
        //console.log(' $scope.objdocument.foldername', $scope.objdocument.foldername);
    };

    $scope.adddocument = function() {
        $scope.objdocument = {};
        $scope.submitted = false;
        $('#mcaption').text("Add Document");
        $("label").removeClass("active");
        $('#modal1').modal('open');
    }

  
    

    $scope.editdocument = function() {
        console.log('$scope.selected',$scope.selected);
        $scope.select($scope.documents);
        
        $scope.submitted = false;
        $('#mcaption').text("Edit Document");
        $("label").addClass("active");
        $('#modal1').modal('open');
    }

    $scope.changeName = function(filename) {
        $scope.objdocument.documentname = filename.replace(" ", "_");
    }
    //SAVE FODLER


  
    $scope.savedocument = function(datas, file) {

    
        if (file != "" && file != undefined) {
            file.upload = Upload.upload({
                url: base_url + "admin/newvacancyupload/",
                data: {
                    file: file
                },
            });

            file.upload.then(function(response) {
                $timeout(function() {
                   // alert(response)
                    $scope.documentname = response.data;
                    if(response.data.error==false)
                    {
                    $scope.imagename = response.data.message;
                    datas.vacancypdfpath = $scope.imagename;
                    $scope.savevacancydoc(datas);

                    }
                    
                    else{
                        var sttr=response.data.message.replace(/(<([^>]+)>)/ig, '');
                         
                        $scope.errorMsg =sttr;
                        return;
                    }

                });
            }, function(response) {
                $scope.documentname = response.data;
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            });
        }

       // Get iconname from icons
      


        
    };

    $scope.savevacancydoc = function (datas) {
			 
     //   datas.memberid = $scope.memberids;
        //alert('reaady');
        //datas.documentPath = $scope.imagename;

        //datas.trainingRequired=JSON.stringify(JSON.stringify($scope.selectedskill))
            console.log(datas);

        
                    $http({
                        url: api_url + "/uploadnewvacancy",
                        data: $.param(datas),
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded",
                            Authorization: atoken,
                        },
                        method: "POST",
                    }).success(function (response, result) {
                        if ((result = 200)) {

                            $('#modal1').modal('close');
                            //window.location = base_url + "member/dependency";
                        }
                    });
            
                

        // return;
    };
 
});