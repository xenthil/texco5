var app = angular.module('pendingarr', ['ngTable', 'ui.bootstrap']).constant('_', window._);;
app.controller('pendingarrctrl', function ($scope, $http, $filter, NgTableParams) {
    $scope.count = 0;
    $scope.itemsPerPage = $scope.totalItems;
    $scope.passshow = 0;
    $scope.selectedproj = [];
    $scope.selectedprojacc = [];
    $scope.baseurl = baseurl;
    $scope.isDisabled = true;
    
    $http({
        method: 'GET',
		headers: {
			'Authorization' : atoken
		}, 
        url: api_url + "/lookupvalues?lkdmcode=REGION",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.region = response.data.lookupvalues;
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });

    $scope.bulkprint = function (data) {
        if (data.regionid == undefined) {
            data.regionid = 0;
        }
        if(data.fromdate && data.todate && data.type) {
            if (data.type == 1 || data.type == 2) {
                window.open(baseurl + 'admin/printbulkprint?fromdate=' + data.fromdate + '&todate=' + data.todate + '&regionid=' + data.regionid + '&type=' + data.type, '_blank');
            }
            else { 
                window.open(baseurl + 'admin/printbulkprintarrear?fromdate=' + data.fromdate + '&todate=' + data.todate + '&regionid=' + data.regionid + '&type=' + data.type, '_blank');
            }
        } 
        else {
            Materialize.toast('Please Select all the values!', 3000, 'red');  
        }
    }
});