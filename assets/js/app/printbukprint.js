var app = angular.module('appPrint', []);
app.controller('ctrlPrint', function($scope, $http) {
    //$scope.jobprint = {};

   
        $http({
            method: 'GET', 
            headers : {
                "Authorization" : atoken
            },
            url: api_url + "/job/BulkPrint?fromdate=" +fromdate+'&todate='+todate+'&regionid='+regionid+'&type='+type ,
        }).then(function successCallback(response) {
            // console.log('response',response);
            if (response.status = 200) {

                //alert(response)
                // $scope.masters = response.data[0].masters;
                // $scope.totalduties = response.data[0].totalduties;
                // var totallength= $scope.totalduties.length;
                // for (var i = totallength+1; i < 9; i++) {
                //     var a={"days":"","jobmastercode":"","jobmasterid":"","name":"","noofduties": "","noofperson":"","salary":" ","salaryamount": ""}
                //     $scope.totalduties.push(a);
                // }   
                console.log('$scope.totalduties',$scope.totalduties);
                $scope.printdata = response.data;
                //$scope.invoiceid=$scope.invoiceprint.invoiceid

               // alert($scope.invoiceid)
               for(i=0;i<$scope.printdata.length;i++)
               {
                $scope.printdata[i][0].total=$scope.gettotal($scope.printdata[i][0].payslip);
             //console.log('$scope.print',$scope.printdata);
               $scope.masters = $scope.printdata[i][0].invoice[0].masters;
               $scope.totalduties = $scope.printdata[i][0].invoice[0].totalduties;
               console.log('$scope.print',$scope.printdata[i][0].invoice[0].masters);
               var totallength= $scope.totalduties.length;
               for (var j = totallength+1; j < 9; j++) {
                   var a={"days":"","jobmastercode":"","jobmasterid":"","name":"","noofduties": "","noofperson":"","salary":" ","salaryamount": ""}
                   $scope.totalduties.push(a);
                 
               
               $scope.invoiceprint = response.data[0];
               $scope.invoiceid=$scope.invoiceprint.invoiceid
             
            }
            }
            console.log('$scope.print',$scope.printdata);
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
           totalarray='';
            for (var i = 0; i < data.length; i++) {
                res.push(Number(data[i].presentdays));
                $scope.presentdays += Number(data[i].presentdays);
                $scope.eddays += Number(data[i].eddays);
                $scope.edamount += Number(data[i].edamount);
                $scope.othours += Number(data[i].othours);
                $scope.hra += Number(data[i].hra);
                $scope.basic += Number(data[i].basic);
                $scope.ma += Number(data[i].ma);
                $scope.unifdt += Number(data[i].unifdt);
                $scope.leapay += Number(data[i].leapay);
                $scope.bonus += Number(data[i].bonus);
                $scope.washallow += Number(data[i].washallow);
                $scope.other1 += Number(data[i].other1);
                $scope.epf += Math.round(data[i].epf);
                $scope.other2 += Number(data[i].other2);
                console.log('$scope.presentdays', $scope.presentdays);
                // $scope.grosstotal += Number(data[i].gross);
                // $scope.nettotal += Number(data[i].netpay);
            }
            console.log('res', res);
            $scope.totalgross = Number($scope.hra) + Number($scope.edamount) + Number($scope.basic) + Number($scope.ma) + Number($scope.unifdt) + Number($scope.leapay) + Number($scope.bonus) + Number($scope.washallow) + Number($scope.other1);
            //$scope.totalgross = Math.round($scope.grosstotal);
            // console.log('$scope.totalgross',$scope.totalgross);
            $scope.totaldeduc = Number($scope.epf) + Number($scope.other2);
            $scope.netpay = Number($scope.totalgross) - Number($scope.totaldeduc);
            $scope.inwords = $scope.numberInWords(Math.round($scope.netpay));

            totalarray=[{'presentdays':$scope.presentdays,'eddays':$scope.eddays,'edamount':$scope.edamount,'othours':$scope.othours,'hra':$scope.hra,'basic':$scope.basic,'ma':$scope.ma,'unifdt':$scope.unifdt,'leapay':$scope.leapay,'bonus':$scope.bonus,'washallow':$scope.washallow,'other1':$scope.other1,'epf':$scope.epf,'other2':$scope.other2,'totalgross':$scope.totalgross,'totaldeduc':$scope.totaldeduc,'netpay':$scope.netpay,'inwords':$scope.inwords}]
            return totalarray;
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


        $scope.printcompleted = function() {

           // alert($scope.type)
            $http({
                method: 'POST',
                url: api_url + '/job/UpdatePrintCount',
                data: $.param({
                    "invoiceid": $scope.invoiceid,
                    "type": $scope.type
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
