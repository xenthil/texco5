var app = angular.module('appclaimPrint', []);
app.controller('ctrlclaimPrint', function ($scope, $http) {
    //$scope.jobprint = {};

    $scope.today = new Date();
    $http({
        method: 'GET', 
        headers : {
            "Authorization" : atoken
        },
        url: api_url + "/job/BulkPrint?fromdate=" + fromdate + '&todate=' + todate + '&regionid=' + regionid + '&type=' + type,
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.printdata = response.data[0].result;
            $scope.printtype = response.data[0].type;
            if($scope.printtype == 3) {
                $scope.payslipprint = $scope.printdata;
                for (j = 0; j < $scope.payslipprint.length; j++) {
                    $scope.payslipprint[j][0].total = $scope.gettotal($scope.payslipprint[j]);
                }
            } else {
                $scope.invoiceprint = $scope.printdata;
                // console.log('$scope.printdata',$scope.invoiceprint);
                for (i = 0; i < $scope.invoiceprint.length; i++) {
                    $scope.revisedrates = 0;
                    $scope.alreadyclaimed = 0;
                    $scope.totalpersons = 0;
                    $scope.noofdutiess = 0;
                    $scope.difference = 0; 
                    for (j = 0; j < $scope.invoiceprint[i].length; j++) {
                        $scope.totalpersons += $scope.invoiceprint[i][j].noofperson;
                        $scope.revisedrates += parseFloat($scope.invoiceprint[i][j].revisedrate);
                        $scope.noofdutiess += parseInt($scope.invoiceprint[i][j].noofduties);
                        $scope.alreadyclaimed += parseFloat($scope.invoiceprint[i][j].oldrate);
                        $scope.difference += parseFloat($scope.invoiceprint[i][j].diffamount);
                    }
                    $scope.invoiceprint[i][0].totalpersons = $scope.totalpersons;
                    $scope.invoiceprint[i][0].revisedrates = $scope.revisedrates;
                    $scope.invoiceprint[i][0].noofdutiess = $scope.noofdutiess;
                    $scope.invoiceprint[i][0].difference = $scope.difference;
                    $scope.invoiceprint[i][0].alreadyclaimed = $scope.alreadyclaimed;
                    $scope.invoiceprint[i][0].servicecharges = $scope.difference * ($scope.invoiceprint[i][0].servicecharge / 100); 
                    $scope.invoiceprint[i][0].subtotal =  $scope.difference + $scope.invoiceprint[i][0].servicecharges; 
                    $scope.invoiceprint[i][0].taxs = $scope.invoiceprint[i][0].subtotal * ($scope.invoiceprint[i][0].tax / 100);
                    $scope.invoiceprint[i][0].totals = $scope.invoiceprint[i][0].taxs + $scope.invoiceprint[i][0].subtotal;
                    $scope.invoiceprint[i][0].finaltotal = Math.round($scope.invoiceprint[i][0].totals);
                    $scope.invoiceprint[i][0].numberinwords = $scope.numberInWords($scope.invoiceprint[i][0].finaltotal);
                }
            }
        }
    }, function errorCallback(response) {
        alert("Something has gone wrong!");
    });



    $scope.gettotal = function (data) {
        var res = [];
        $scope.presentdays = 0;
        $scope.hra = 0;
        $scope.eddays = 0;
        $scope.edamount = 0;
        $scope.othours = 0;
        $scope.basic = 0;
        $scope.ma = 0;
        $scope.unifdt = 0;
        $scope.leapay = 0;
        $scope.bonus = 0;
        $scope.washallow = 0;
        $scope.other1 = 0;
        $scope.epf = 0;
        $scope.other2 = 0;
        $scope.totalgross = 0;
        $scope.totaldeduc = 0;
        $scope.netpay = 0;
        $scope.inwords = '';
        $scope.grosstotal = 0;
        $scope.nettotal = 0;
        totalarray = '';
        for (var i = 0; i < data.length; i++) {
            // console.log(data[i]);
            res.push(Number(data[i][2].diff.presentdays));
            $scope.presentdays += Number(data[i][2].diff.presentdays);
            $scope.eddays += Number(data[i][2].diff.eddays);
            $scope.edamount += Number(data[i][2].diff.edamount);
            $scope.othours += Number(data[i][2].diff.othours);
            $scope.hra += Number(data[i][2].diff.hra);
            $scope.basic += Number(data[i][2].diff.basic);
            $scope.ma += Number(data[i][2].diff.ma);
            $scope.unifdt += Number(data[i][2].diff.unifdt);
            $scope.leapay += Number(data[i][2].diff.leapay);
            $scope.bonus += Number(data[i][2].diff.bonus);
            $scope.washallow += Number(data[i][2].diff.washallow);
            $scope.other1 += Number(data[i][2].diff.other1);
            $scope.epf += Math.round(data[i][2].diff.epf);
            $scope.other2 += Number(data[i][2].diff.other2);
            // console.log('$scope.presentdays', $scope.presentdays);
            // $scope.grosstotal += Number(data[i].gross);
            // $scope.nettotal += Number(data[i].netpay);
        }
        // console.log('res', res);
        $scope.totalgross = Number($scope.hra) + Number($scope.edamount) + Number($scope.basic) + Number($scope.ma) + Number($scope.unifdt) + Number($scope.leapay) + Number($scope.bonus) + Number($scope.washallow) + Number($scope.other1);
        //$scope.totalgross = Math.round($scope.grosstotal);
        // console.log('$scope.totalgross',$scope.totalgross);
        $scope.totaldeduc = Number($scope.epf) + Number($scope.other2);
        $scope.netpay = Number($scope.totalgross) - Number($scope.totaldeduc);
        $scope.inwords = $scope.numberInWords(Math.round($scope.netpay));

        totalarray = [{ 'presentdays': $scope.presentdays, 'eddays': $scope.eddays, 'edamount': $scope.edamount, 'othours': $scope.othours, 'hra': $scope.hra, 'basic': $scope.basic, 'ma': $scope.ma, 'unifdt': $scope.unifdt, 'leapay': $scope.leapay, 'bonus': $scope.bonus, 'washallow': $scope.washallow, 'other1': $scope.other1, 'epf': $scope.epf, 'other2': $scope.other2, 'totalgross': $scope.totalgross, 'totaldeduc': $scope.totaldeduc, 'netpay': $scope.netpay, 'inwords': $scope.inwords }]
        return totalarray;
    }



    $scope.numberInWords = function (num) {
        var a = ['', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ',
            'Seven ', 'Eight ', 'Nine ', 'Ten ', 'Eleven ', 'Twelve ',
            'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ',
            'Eighteen ', 'Nineteen '];
        var b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty',
            'Seventy', 'Eighty', 'Ninety'];

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

    $scope.printcompleted = function () {
        //alert('completed')
    }

});
