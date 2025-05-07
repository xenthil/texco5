var app = angular.module('appPrint', ['ngSanitize']);
app.controller('ctrlPrint', function($scope, $http) {
    $scope.members = [];
    $scope.client = {};

    var month = new Date(monthandyear);
    var sp = monthandyear.split(" ");
    var date = "05/" + sp[0] + "/" + sp[1];
    var nda = new Date(date);
    var perd = new Date(nda);
    $scope.noOfDays = daysInThisMonth(perd);
    
    $http({
        method: 'GET', 
        headers : {
            "Authorization" : atoken
        },
        url: api_url + "/client/print/attendancedetails?projectid=" + projectid + "&monthandyear=" + monthandyear,
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.client = response.data[0];
            $scope.members = response.data[0].members;
            // $scope.gettotal($scope.members)
            $scope.presentdays = 0;
            $scope.eddays = 0;
            debugger
            for (var i = 0; i < $scope.members.length; i++) {
                $scope.presentdays += Number($scope.members[i].presentdays);
                $scope.eddays += Number($scope.members[i].eddays) + Number($scope.members[i].othours/8);
            } 
            $scope.presentdays.toFixed(1);
            $scope.eddays.toFixed(1);
            // setTimeout(function() {
            //     window.print()
            //     $scope.$digest();
            // }, 5000);
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });

    function daysInThisMonth(month) {
		var val = month.getMonth();
		var yea = month.getYear();
		var now = new Date(month);
		return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
	}

    $scope.gettotal = function(data) {
        $scope.presentdays = 0;
        $scope.eddays = 0;
        debugger
        for (var i = 0; i < data.length; i++) {
            $scope.presentdays += Number(data[i].presentdays);
            $scope.eddays += Number(data[i].eddays) + Number(data[i].othours/8);
        }
    }

});

app.filter('nl2br', function() {
    var span = document.createElement('span');
    return function(input) {
        if (!input) return input;
        var lines = input.split('\n');

        for (var i = 0; i < lines.length; i++) {
            span.innerText = lines[i];
            span.textContent = lines[i];
            lines[i] = span.innerHTML;
        }
        return lines.join('<br />');
    }
});