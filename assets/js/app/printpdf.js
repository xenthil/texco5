var app = angular.module('appPrint', ['ngSanitize']);
app.controller('ctrlPrint', function($scope, $http) {
    $scope.jobprint = {};

    debugger
    if(Number(jobactivityid) != 0 && Number(memberid) != 0)
    { 
         var url = api_url + "/job/apply/print?jobactivityid=" + jobactivityid+ "&memberid="+ memberid
    } 
    else if(jobactivityid != 0) {
        var url = api_url + "/job/posting/print?jobactivityid=" + jobactivityid
    }
    else if(Number(memberid) != 0)
    { 
         var url = api_url + "/job/apply/print?jobactivityid=" + jobactivityid+ "&memberid="+ memberid
    } 
    else if(Number(memberhistoryid) != 0)
    { 
         var url = api_url + "/job/apply/printpost?memberhistoryid=" + memberhistoryid
    }
    else
    {
        var url = api_url + "/job/posting/print?jobactivityid=" + jobactivityid
    }

    $http({
        method: 'GET', 
        headers : {
            "Authorization" : atoken
        },
        url: url,
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.jobprint = response.data;
            setTimeout(function() {
                window.print()
                $scope.$digest();
            },2000);
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });
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
