var app = angular.module('appPrint', []).constant('_', window._);
app.controller('ctrlPrint', function($scope, $http) {
    //$scope.jobprint = {};

    if(invoiceno != 0)
    {

        $http({
            method: 'GET', 
            headers : {
                "Authorization" : atoken
            },
            url: api_url + "/attendance/invoice?invoiceno=" + invoiceno,
        }).then(function successCallback(response) {
            // console.log('response',response);
            if (response.status = 200) {
                $scope.masters = response.data[0].masters;
                $scope.totalduties = response.data[0].totalduties; 
                var totallength= $scope.totalduties.length;
                for (var i = totallength+1; i < 9; i++) {
                    var a={"days":"","jobmastercode":"","jobmasterid":"","name":"","noofduties": "","noofperson":"","salary":" ","salaryamount": ""}
                    $scope.totalduties.push(a);
                }   
              //  console.log('$scope.totalduties',$scope.totalduties);

                 $scope.totaljbs =_.filter($scope.totalduties, function (item) {
                    return item.jobmastercode != '' ;
                });

               

                $scope.totaljobs=0;
                $scope.totalorgjobs=0;
                $scope.totaledjobs=0;
                $scope.salaryedamountwed=0;
                $scope.salaryedamount=0
                for (var i = 0; i < $scope.totaljbs.length; i++) {
                    $scope.totaljobs+=$scope.totaljbs[i].noofduties;
                    $scope.totalorgjobs+=($scope.totaljbs[i].noofduties-$scope.totaljbs[i].eddays);
                    $scope.totaledjobs+=$scope.totaljbs[i].eddays;
                    $scope.salaryedamountwed+=($scope.totaljbs[i].salaryamount-$scope.totaljbs[i].salaryedamount);
                    $scope.salaryedamount+=$scope.totaljbs[i].salaryedamount;
                }
                 

               // alert($scope.totaljbs)
                
                $scope.invoiceprint = response.data[0];


                if($scope.invoiceprint.invoicetype==1)
                {
                    var combainproj =_.filter($scope.totalduties, function (item) {
                        return item.ismainaddress == 1 ;
                    });

                    if(combainproj.length > 0)
                    {

                        if(combainproj[0].claimprojectnumber == null)
                        {
                            $scope.combineprojno=combainproj[0].projectno;
                        }
                        else{
                            $scope.combineprojno=combainproj[0].claimprojectnumber;
                        }

                        if(combainproj[0].claimprojectname == null)
                        {
                            $scope.combineprojname=combainproj[0].projectname;
                        }
                        else{
                            $scope.combineprojname=combainproj[0].claimprojectname;
                        }

                    // $scope.combineprojname=combainproj[0].projectname;
                     
                    }
                    else
                    {
                        $scope.combineprojname=$scope.invoiceprint.projectname;
                        $scope.combineprojno=$scope.invoiceprint.projectno; 
                    }
                    
                }
               

                $scope.totalsubgrand=  ($scope.invoiceprint.subtotal+$scope.invoiceprint.servicecharges+$scope.invoiceprint.servicetax+$scope.invoiceprint.allowancevalue1+$scope.invoiceprint.allowancevalue2+$scope.invoiceprint.allowancevalue3).toFixed(2); 

                $scope.totalsub =  ($scope.invoiceprint.subtotal+$scope.invoiceprint.servicecharges+$scope.invoiceprint.allowancevalue1+$scope.invoiceprint.allowancevalue2+$scope.invoiceprint.allowancevalue3).toFixed(2);

                $scope.taxgst =  ($scope.invoiceprint.servicetax/2).toFixed(2);

                //alert($scope.totalsub)
                $scope.invoiceid=$scope.invoiceprint.invoiceid
                $scope.inwordsinv = $scope.numberInWords(Math.round($scope.invoiceprint.total));

                var maxdate =_.max($scope.invoiceprint.totalduties, function (item) {
                    return item.days;
                });
                var clm = _.filter($scope.invoiceprint.totalduties, function (item) {
                    return item.jobmastercode == 'SG' || item.jobmastercode == 'HSG' || item.jobmastercode == 'ASO'  || item.jobmastercode == 'PO'
                });
                var clms = _.filter($scope.invoiceprint.totalduties, function (item) {
                    return item.jobmastercode == 'DVR' || item.jobmastercode == 'TELE' || item.jobmastercode == 'JA'
                });
               

                if(clm.length > 0)
                {
                    $scope.claim='Security Claim -(SAC Code-998525)';
                    $scope.advclaim='Security ';
                }
                if(clms.length >= 0)
                {
                    $scope.claim='Manpower Claim -(SAC Code-998519)';
                    $scope.advclaim='Manpower ';
                }


               $scope.maxday=maxdate['days'];

               var d = new Date(Date.parse($scope.invoiceprint.monthandyear));
               var date=d.getMonth() +1;
               if(date < 10)
               {
                   date='0'+date;
               }
              
               $scope.startper= date+ "/" + d.getFullYear();

                //alert(a)
				
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
app.filter('IndiaCurrency', function () {        
    return function (input) {
        if (! isNaN(input)) {
            //var currencySymbol = '₹';
            var currencySymbol = 'Rs.';
            //separe fraction part        
            var result = input.toString().split('.');
            //separate last three digit
            var lastThree = result[0].substring(result[0].length - 3);
            var restNum = result[0].substring(0, result[0].length - 3);
            if (restNum != '')
                lastThree = ',' + lastThree;
                //replace commas at places
            var output = restNum.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
            //handle 0 after franction
            if(result[1]==undefined) {
               result[1] = "00";
            } else if(result[1].length <2) {
               result[1] += "0";
            }
            if (result.length > 1) {
                
                    output += "." + result[1] + "";
                
                
            } 
            // else{
            //     output +=result[1] + "  ";
            // }           
            //Return result with symbol
            return   output;
        }
    }
});