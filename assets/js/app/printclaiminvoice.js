var app = angular.module('appclaimPrint', []);
app.controller('ctrlclaimPrint', function($scope, $http) {
    //$scope.jobprint = {};

    if(invoiceno != 0)
    {
        $http({
            method: 'GET', 
            headers : {
                "Authorization" : atoken
            },
            url: api_url + "/job/ArrearClaimprint?invoiceno=" + invoiceno,
        }).then(function successCallback(response) {
            // console.log('response',response);
            if (response.status = 200) {
               // $scope.masters = response.data[0].masters;
               // $scope.totalduties = response.data[0].totalduties;
                // var totallength= $scope.totalduties.length;
                // for (var i = totallength+1; i < 9; i++) {
                //     var a={"days":"","jobmastercode":"","jobmasterid":"","name":"","noofduties": "","noofperson":"","salary":" ","salaryamount": ""}
                //     $scope.totalduties.push(a);
                // }   
               // console.log('$scope.totalduties',$scope.totalduties);
                $scope.invoiceprint = response.data;
                $scope.revisedrate=0;
                $scope.alreadyclaimed=0;
                $scope.difference=0;
                $scope.noofdutiess = 0;
                for(i=0;i<$scope.invoiceprint.length;i++)
                {
                    $scope.revisedrate+=$scope.invoiceprint[i].revisedrate;
                    $scope.noofdutiess+=$scope.invoiceprint[i].noofduties;
                    $scope.alreadyclaimed+=$scope.invoiceprint[i].oldrate;
                   var diff=$scope.invoiceprint[i].revisedrate-$scope.invoiceprint[i].oldrate
                    $scope.difference+=diff;
                    
                }
                $scope.servicecharge=$scope.difference*($scope.invoiceprint[0].servicecharge/100);
                $scope.subtotal=$scope.difference+$scope.servicecharge;
                $scope.tax=$scope.subtotal*($scope.invoiceprint[0].tax/100);
                $scope.total=$scope.tax+$scope.subtotal;
                $scope.finaltotal=Math.round($scope.total);
                $scope.numberinwords=$scope.numberInWords( $scope.finaltotal);
                $scope.startdate=$scope.invoiceprint[0].StartDate;
                $scope.enddate=$scope.invoiceprint[($scope.invoiceprint.length-1)].EndDate;
                $scope.today = new Date(); 

				
            }
        }, function errorCallback(response) {
            alert("Something has gone wrong!");
        });
    }

    $scope.numberInWords = function(num) {
        var a = [ '', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ',
            'Seven ', 'Eight ', 'Nine ', 'Ten ', 'Eleven ', 'Twelve ',
            'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ',
            'Eighteen ', 'Nineteen ' ];
        var b = [ '', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty',
            'Seventy', 'Eighty', 'Ninety' ];

        if ((num = num.toString()).length > 9)
            return 'overflow';
        var n = ('000000000' + num).substr(-9).match(
            /^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
        if (!n)
            return;
        var str = '';
        str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]])
        + 'Crore ' : '';
        str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]])
        + 'Lakh ' : '';
        str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]])
        + 'Thousand ' : '';
        str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]])
        + 'Hundred ' : '';
        str += (n[5] != 0) ? ((str != '') ? 'and ' : '')
        + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'only '
            : '';
        return str;
        };

        $scope.printcompleted = function() {
            alert('completed')
        }

});
