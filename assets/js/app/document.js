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
        url: api_url + "/document",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.documents = response.data;
            // console.log('$scope.documents',$scope.documents);
            if ($scope.documents.length > 0) {
                $scope.select($scope.documents[0]);
            }
            /*console.log('$scope.documents',$scope.documents.length);
            for (i = 0; i <= $scope.documents.length; i++) {
                // if ($scope.documents[i].folderid) { 
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
                // }
            }
            console.log('$scope.documents1',$scope.documents1.length);
            console.log('$scope.documents2.length',$scope.documents2.length);*/
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


    // Get documents
    $http({
        method: 'GET', 
        headers : {
            "Authorization" : atoken
        },
        url: api_url + "/documents",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.documents = response.data;
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
            if ($scope.documents.length > 0) {
                $scope.select($scope.documents[0]);
            }
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });


    $scope.select = function(document) {
        $scope.selected = document;
        $scope.objdocument.foldername = document.folderid+'##'+document.foldername;
        $scope.objdocument.documentid = document.documentid;
        $scope.objdocument.name = document.name;
        $scope.objdocument.documentname = document.documentname;
        $scope.objdocument.description = document.description;
        $scope.objdocument.colour = document.iconcolour;
        //console.log(' $scope.objdocument.foldername', $scope.objdocument.foldername);
    };

    $scope.adddocument = function() {
        $scope.objdocument = {};
        $scope.submitted = false;
        $('#mcaption').text("Add Document");
        $("label").removeClass("active");
        $('#modal1').modal('open');
    }

    $scope.getchangefoldervalues = function(foldername) { 
        debugger
        $http({
            method: 'GET', 
            headers : {
                "Authorization" : atoken
            },
            url: api_url + "/documentfolderid?folderid="+foldername,
        }).then(function successCallback(response) {
            if (response.status = 200) {
                $scope.documents = response.data;
                if ($scope.documents.length > 0) {
                    $scope.select($scope.documents[0]);
                }
            }
        }, function errorCallback(response) {
            Materialize.toast('Something has gone wrong!', 3000, 'red');
        });
    }

    $scope.createfolder = function() {
        $scope.objfolder = {};
        $scope.submitted = false;
        $('#mcaption').text("Create Folder");
        $("label").removeClass("active");
        $('#modal2').modal('open');
    }
    

    $scope.editdocument = function() {
        console.log('$scope.selected',$scope.selected);
        $scope.select($scope.selected);
        $scope.submitted = false;
        $('#mcaption').text("Edit Document");
        $("label").addClass("active");
        $('#modal1').modal('open');
    }

    $scope.changeName = function(filename) {
        $scope.objdocument.documentname = filename.replace(" ", "_");
    }
    //SAVE FODLER
    
    $scope.savefolder = function(data) {
        $http({
            url: api_url + "/createfolder",
            data: $.param({
                foldername: data.foldername,
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : atoken
            }, 

            method: "POST",
        }).success(function(response, result) {
            console.log('result',result);
            if (result == 200) {
                $scope.objdocument = {};
                Materialize.toast('Folder Created!', 3000, 'green');
                $("#modal2").modal("close");
            }else if(result == 202){
                Materialize.toast('Folder Name Already Exists!', 3000, 'red');
            }
        }).error(function(error) {
            $scope.error = error;
        });
    } 

    // SAVE DOCUMENT
  /*  $scope.savedocument = function(data, file) {
        
        var foldername = data.foldername;
        var folderid = foldername.split("##");
        // console.log('data',res);
        // if (data.ispf) {
        //     data.ispf = 1;
        // } else {
        //     data.ispf = 0;
        // }

        // if (data.isgst) {
        //     data.isgst = 1;
        // } else {
        //     data.isgst = 0;
        // }

        // if (data.iswage) {
        //     data.iswage = 1;
        // } else {
        //     data.iswage = 0;
        // }
        console.log('data',folderid[1]);
        if (file != "" && file != undefined) {
            file.upload = Upload.upload({
                url: base_url + "admin/document_upload/" + folderid[1],
                data: {
                    file: file
                },
            });

            file.upload.then(function(response) {
                $timeout(function() {
                    $scope.document = file.name;

                });
            }, function(response) {
                $scope.documentname = response.data;
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            });
        }

        // Get iconname from icons
        for (var loop = 0; loop < $scope.icons.length; loop++) {
            if ($scope.icons[loop].colour == data.colour) {
                $scope.icon = $scope.icons[loop].icon;
                break;
            }
        }


        var method;
        console.log('data.documentid',data.documentid);
        if (data.documentid > 0) {
            method = 'PUT';
        } else {
            method = 'POST';
        }
        $http({
            url: api_url + "/document",
            data: $.param({
                documentid: data.documentid,
                name: data.name,
                documentname: data.documentname,
                description: data.description,
                icon: $scope.icon,
                iconcolour: data.colour,
                folderid : folderid[0],
                foldername : folderid[1],
                // ispf: data.res,
                // iswage: data.iswage,
                // isgst: data.isgst,
                changedby: data.changedby
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: method,
        }).success(function(response, result) {
            if (result == 200) {
                $http({
                    method: 'GET',
                    url: api_url + "/document/" + response.documentid,
                }).then(function successCallback(response) {
                    if (response.status = 200) {
                        if (data.documentid > 0) {
                            for (var loop = 0; loop < $scope.documents.length; loop++) {
                                if ($scope.documents[loop].documentid == data.documentid) {
                                    $scope.documents[loop] = response.data[0];
                                    $scope.select($scope.documents[loop]);
                                    break;
                                }
                            }
                        } else {
                            $scope.documents.unshift(response.data[0]);
                            $scope.select($scope.documents[0]);
                        }
                    }
                }, function errorCallback(response) {
                    Materialize.toast('Something has gone wrong!', 3000, 'red');
                });
            }
            $(".modal").modal("close");
        }).error(function(error) {
            $scope.error = error;
        });
    };*/

    $scope.savedocument = function(data, file) {

        // alert(file)
        if(data.foldername) {
            var foldername = data.foldername;
            var folderid = foldername.split("##");
            var fname = folderid[1];
            var fid = folderid[0];
        }else{
            var fname = '';
            var fid = 0;
        }
        if (file != "" && file != undefined) {
            file.upload = Upload.upload({
                url: base_url + "admin/document_upload/" + fname,
                data: {
                    file: file
                },
            });

            file.upload.then(function(response) {
                $timeout(function() {
                   // alert(response)
                    $scope.documentname = response.data;


                    var method;
        //console.log('data.documentid',data.documentid);
        if (data.documentid > 0) {
            method = 'PUT';
        } else {
            method = 'POST';
        }
        $http({
            url: api_url + "/document",
            data: $.param({
                documentid: data.documentid,
                name: data.name,
                documentname: $scope.documentname,
                description: data.description,
                icon: $scope.icon,
                iconcolour: data.colour,
                folderid : fid,
                foldername : fname,
                // ispf: data.res,
                // iswage: data.iswage,
                // isgst: data.isgst,
                changedby: data.changedby
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : atoken
            }, 
            method: method,
        }).success(function(response, result) {
            if (result == 200) {
                $http({
                    method: 'GET', 
                    headers : {
                        "Authorization" : atoken
                    },
                    url: api_url + "/document/" + response.documentid,
                }).then(function successCallback(response) {
                    if (response.status = 200) {
                        if (data.documentid > 0) {
                            for (var loop = 0; loop < $scope.documents.length; loop++) {
                                if ($scope.documents[loop].documentid == data.documentid) {
                                    $scope.documents[loop] = response.data[0];
                                    $scope.select($scope.documents[loop]);
                                    break;
                                }
                            }
                        } else {
                            $scope.documents.unshift(response.data[0]);
                            $scope.select($scope.documents[0]);
                        }
                    }
                }, function errorCallback(response) {
                    Materialize.toast('Something has gone wrong!', 3000, 'red');
                });
            }
            $(".modal").modal("close");
        }).error(function(error) {
            $scope.error = error;
        });
                });
            }, function(response) {
                $scope.documentname = response.data;
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            });
        }

       // Get iconname from icons
        for (var loop = 0; loop < $scope.icons.length; loop++) {
            if ($scope.icons[loop].colour == data.colour) {
                $scope.icon = $scope.icons[loop].icon;
                break;
            }
        }


        
    };

    // Delete Document
    $scope.removedocument = function() {
        if (confirm("Are you sure to delete this detail?")) {
            $http({
                url: api_url + "/document",
                data: $.param({
                    documentid: $scope.objdocument.documentid
                }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization' : atoken
                }, 
                method: 'DELETE',
            }).success(function(response, result) {
                if (result = 200) {
                    for (var loop = 0; loop < $scope.documents.length; loop++) {
                        if ($scope.documents[loop].documentid == $scope.objdocument.documentid) {
                            $scope.documents.splice(loop, 1);
                            $scope.select($scope.documents[loop]);
                            break;
                        }
                    } 
                    Materialize.toast('Document Deleted Successfully', 3000, 'green');
                }
            }).error(function(error) {
                $scope.error = error;
            });
        };
    }
});