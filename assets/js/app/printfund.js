var app = angular.module('appPrint', []);
app.controller('ctrlPrint', function($scope, $http) {
    $scope.payslip = [];

    if(projectid != 0 && monthandyear !='')
    {
        $http({
            method: 'GET', 
            headers : {
                "Authorization" : atoken
            },
            url: api_url + "/job/get/payslip?projectid=" + projectid + "&monthandyear=" + monthandyear,
        }).then(function successCallback(response) {
            if (response.status = 200) {
                $scope.invoiceprint = response.data[0];
                $scope.payslip = response.data;
                $scope.payslipno=$scope.invoiceprint.payslipno
                $scope.gettotal($scope.payslip )
            }
        }, function errorCallback(response) {
            alert("Something has gone wrong!");
        });
    }



    $scope.gettotal = function(data){
        $scope.presentdays = 0;
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
        for(var i = 0; i < data.length; i++){
            $scope.presentdays += Number(data[i].presentdays);
            $scope.othours += Number(data[i].othours);
            $scope.basic += Number(data[i].basic);
            $scope.ma += Number(data[i].ma);
            $scope.unifdt += Number(data[i].unifdt);
            $scope.leapay += Number(data[i].leapay);
            $scope.bonus += Number(data[i].bonus);
            $scope.washallow += Number(data[i].washallow);
            $scope.other1 += Number(data[i].other1);
            $scope.epf += Number(data[i].epf);
            $scope.other2 += Number(data[i].other2);
        }
        $scope.totalgross = Number($scope.presentdays) + Number($scope.othours) + Number($scope.basic) + Number($scope.ma) + Number($scope.unifdt) + Number($scope.leapay) + Number($scope.bonus) + Number($scope.washallow) + Number($scope.other1); 
        $scope.totaldeduc = Number($scope.epf) + Number($scope.other2) ; 
        $scope.netpay = Number($scope.totalgross) - Number($scope.totaldeduc) ; 
        $scope.inwords = $scope.numberInWords(Math.round($scope.netpay));
;    }

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

            alert($scope.type)
            $http({
                method: 'POST',
                
                url: api_url + '/job/UpdatePrintCount',
                data: $.param({
                    "payslipno": $scope.payslipno,
                    "type": $scope.type,
                   
                }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization' : atoken
                }, 
            }).success(function(response, result) {
                
    
               
               
            }).error(function(error) {
               
            });
        }
    
        
        var beforePrint = function () {
            //alert('Functionality to run before printing.');
        
            
        };
        
        var afterPrint = function () {
         //alert('Functionality to run after printing');
        
            
            $scope.printcompleted();
        };
        
        if (window.matchMedia) {
            var mediaQueryList = window.matchMedia('print');
        
            mediaQueryList.addListener(function (mql) {
                alert($(mediaQueryList).html());
                if (mql.matches) {
                    beforePrint();
                } else {
                    afterPrint();
                }
            });
        }
        
        window.onbeforeprint = beforePrint;
        window.onafterprint = afterPrint;

});
