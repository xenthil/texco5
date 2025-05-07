var app = angular.module('appGallery', ['ngFileUpload']);
app.controller('ctrlGallery', function($scope, $http, Upload, $timeout) {
    $scope.gallery = [];
    $scope.gallerygroup = {};
    $scope.images = [];
    $scope.files = [];
    $scope.selected = {};
    $scope.objgallery = {};
    $scope.filter = "";

    $scope.getgallery = function() {
        // Get gallery
        $http({
            method: 'GET', 
            headers : {
                "Authorization" : atoken
            },
            url: api_url + "/gallery",
        }).then(function successCallback(response) {
            if (response.status = 200) {
                $scope.gallery = response.data;
                if ($scope.gallery.length > 0) {
                    $scope.select($scope.gallery[0]);
                }
            }
        }, function errorCallback(response) {
            Materialize.toast('Something has gone wrong!', 3000, 'red');
        });
    };

    if(group != '') {
        // Get gallery
        $http({
            method: 'GET', 
            headers : {
                "Authorization" : atoken
            },
            url: api_url + "/gallery/group?group="+group,
        }).then(function successCallback(response) {
            if (response.status = 200) {
                $scope.gallerygroup = response.data;
            }
        }, function errorCallback(response) {
            Materialize.toast('Something has gone wrong!', 3000, 'red');
        });
    };

    $scope.select = function(galleryitem) {
        $scope.selected = galleryitem;

        $scope.objgallery.galleryid = galleryitem.galleryid;
        $scope.objgallery.group = galleryitem.group;
        $scope.objgallery.description = galleryitem.description;
        $scope.images = galleryitem.images;
    };

    $scope.addgallery = function() {
        $scope.objgallery = {};
		$scope.files = [];
		$('#galleryform').trigger("reset");
        $scope.submitted = false;
        $('#mcaption').text("Add Gallery");
        $("label").removeClass("active");
        $('#modal1').modal('open');
        $('#failure').html("");
    }

    $scope.editgallery = function() {
        $scope.select($scope.selected);
        $scope.submitted = false;
        $('#mcaption').text("Edit Gallery");
        $("label").addClass("active");
        $('#modal1').modal('open');
        $('#failure').html("");
    }

    $scope.checkgroup = function(data, file) {
        var text = document.getElementById("mcaption").textContent;
        if (text != "Edit gallery") {
            $scope.getgallery();
            for (i = 0; i < $scope.gallery.length; i++) {
                if ($scope.gallery[i].group == data.group) {
                    $('#failure').html("Group already exist");
                    return;
                }
            }
            $scope.savegallery(data, file);
        } else {
            $scope.savegallery(data, file);
        }
    };

    // SAVE gallery
    $scope.savegallery = function(data, file) {


        for (i = 0; i < file.length; i++) {
            $scope.files.push(file[i].$ngfName);

            file.upload = Upload.upload({
                url: base_url + "admin/gallery_image_upload/" + data.group,
                data: {
                    file: file[i]
                },
            });

            file.upload.then(function(response) {
                $timeout(function() {
                    $scope.images = file[i].$ngfName;
                });
            }, function(response) {
                $scope.images = response.data;
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            }, function(evt) {
                // Math.min is to fix IE which reports 200% sometimes
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));

            });
        }


        var method;
        var text1 = document.getElementById("mcaption").textContent;
        $http({
            url: api_url + "/gallery",
            data: $.param({
                group: data.group,
                images: $scope.files,
                description: data.description,
                active: data.active,
                changedby: data.changedby
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : atoken
            }, 
            method: 'POST',
        }).success(function(response, result) {
            if (result == 200) {
                $scope.getgallery();
            }
            $(".modal").modal("close");
        }).error(function(error) {
            $scope.error = error;
        });

    };

    // Delete gallery
    $scope.removegalleryimage = function(galleryid) {
        if (confirm("Are you sure to delete this detail?")) {
            $http({
                url: api_url + "/gallery/image/",
                data: $.param({
                    galleryid: galleryid
                }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    "Authorization" : atoken
                },
                method: 'DELETE',
            }).success(function(response, result) {
                if (result = 200) {
                     $http({
                            url:base_url + "admin/gallery_group_image_remove/" + response.group+"/" + response.image,
                            data:  $.param({
                                group: response.group,
                                image: response.image
                            }),
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded',
                                "Authorization" : atoken
                            },
                            method: 'DELETE',
                        }).success(function(response, result) {
                            if (result = 200) {
                                window.location.reload(true);
                            }
                        }).error(function(error) {
                            $scope.error = error;
                        });
                    $scope.getgallery();
                }
            }).error(function(error) {
                $scope.error = error;
            });
        };
    }

    // Delete gallery
    $scope.removegallery = function(group) {
        if (confirm("Are you sure to delete this detail?")) {
            $http({
                url: api_url + "/gallery/",
                data: $.param({
                    group: $scope.objgallery.group
                }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                    
                },
                method: 'DELETE',
            }).success(function(response, result) {
                if (result = 200) {
                        $http({
                            url:base_url + "admin/gallery_group_remove/" + response.group,
                            data: {
                                group: response.group
                            }, 
                            headers : {
                                "Authorization" : atoken
                            },
                            method: 'GET',
                        }).success(function(response, result) {
                            if (result = 200) {
                               window.location.reload(true);
                            }
                        }).error(function(error) {
                            $scope.error = error;
                        });
                                $scope.getgallery();
                }
            }).error(function(error) {
                $scope.error = error;
            });
        };
    }
    $scope.getgallery();
});