var app = angular.module('appBulkPrint', []).constant('_', window._);
app.controller('ctrlBulkPrint', function ($scope, $http) {
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
            $scope.arlength = [];
            $scope.arlength.push(1);
            $scope.arlength.push(2);
            if($scope.printtype == 1) {
				
                for (i = 0; i < $scope.printdata.length; i++) {

                    if($scope.printdata[i].wagetype =="TN MINIMUM VALUE")
				{
					$scope.printdata[i].wagetype="TN MINIMUM WAGES"
				}
				if($scope.printdata[i].wagetype =="DGR VALUE")
				{
					$scope.printdata[i].wagetype="DGR WAGES"
				}

                $scope.payslip= $scope.printdata[i]
				var sg = _.filter($scope.payslip, function (item) {
                    return item.jobcode == 'SG'
                });
				
                $scope.sg=0;
                $scope.hsg=0;
                $scope.aso=0;
                $scope.dvr=0;
				if(sg.length > 0)
				{
					$scope.printdata[i][0].sg=sg[0]['ncbasic']
				}
				var hsg = _.filter($scope.payslip, function (item) {
                    return item.jobcode == 'HSG'
                });
				if(hsg.length > 0)
				{
					$scope.printdata[i][0].hsg=hsg[0]['ncbasic']
				}
				var aso = _.filter($scope.payslip, function (item) {
                    return item.jobcode == 'ASO'
                });
				if(aso.length > 0)
				{
					$scope.printdata[i][0].aso=aso[0]['ncbasic']
				}
				var dvr = _.filter($scope.payslip, function (item) {
                    return item.jobcode == 'DVR'
                });
				if(dvr.length > 0)
				{
					$scope.printdata[i][0].dvr=dvr[0]['ncbasic']
				}

				var maxdate =_.max($scope.payslip, function (item) {
                    return item.presentdays;
                });

				$scope.printdata[i][0].maxday=maxdate['presentdays'];
				$scope.printdata[i][0].maxday1=maxdate['presentdays'];
				
				
				



               var d = new Date(Date.parse(	$scope.printdata[i][0].monthandyear));
              $scope.printdata[i][0].startper= d.getMonth() +1 + "/" + d.getFullYear();


				if($scope.printdata[i][0].maxday ==0)
					
				{
					var str=new Date(d.getFullYear(), d.getMonth() +1, 0);
					
					$scope.printdata[i][0].maxday= str.getDate() ;
				}

                    $scope.printdata[i][0].total = $scope.gettotal($scope.printdata[i]);
					console.log(  $scope.printdata[i].total );
                }
            }
            if($scope.printtype == 2) {
				
            //    var a =_.sortBy($scope.payslip, function (item) {
            //         return item.invoiceno;
            //     });

                for (i = 0; i < $scope.printdata.length; i++) {
                    $scope.masters = $scope.printdata[i][0].masters;
                    $scope.totalduties = $scope.printdata[i][0].totalduties;
                    var totallength = $scope.totalduties.length;
                    for (var j = totallength + 1; j < 9; j++) {
                        var a = { "days": "", "jobmastercode": "", "jobmasterid": "", "name": "", "noofduties": "", "noofperson": "", "salary": " ", "salaryamount": "" }
                        $scope.totalduties.push(a);
                    }

                    $scope.invoiceprint = $scope.printdata[i][0];
                    $scope.totalsubgrand=  ($scope.invoiceprint.subtotal+$scope.invoiceprint.servicecharges+$scope.invoiceprint.servicetax).toFixed(2); 
    
                    $scope.totalsub =  ($scope.invoiceprint.subtotal+$scope.invoiceprint.servicecharges).toFixed(2);
    
                    $scope.taxgst =  ($scope.invoiceprint.servicetax/2).toFixed(2);
    
                    //alert($scope.totalsub)
                    $scope.invoiceid=$scope.invoiceprint.invoiceid
                    $scope.inwordsinv = $scope.numberInWords(Math.round($scope.invoiceprint.total));
    
                    var maxdate =_.max($scope.invoiceprint.totalduties, function (item) {
                        return item.days;
                    });
                    var clm = _.filter($scope.invoiceprint.totalduties, function (item) {
                        return item.jobmastercode == 'SG' || item.jobmastercode == 'PO' || item.jobmastercode == 'ASO'
                    });
                    var clms = _.filter($scope.invoiceprint.totalduties, function (item) {
                        return item.jobmastercode == 'DVR' || item.jobmastercode == 'TELE' || item.jobmastercode == 'OTHERS'
                    });
                   
    
                    if(clm.length > 0)
                    {
                        $scope.claim='Security Claim -(SAC Code-998525)';
                        $scope.advclaim='Security ';
                    }
                    if(clms.length > 0)
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
    
                }
            }
            // console.log('response.result',response.data[0].result);
            //console.log('response.type',response);
            // for (i = 0; i < $scope.printdata.length; i++) {
            //     $scope.printdata[i][0].total = $scope.gettotal($scope.printdata[i][0].payslip);
            //     //console.log('$scope.print',$scope.printdata);
            //     $scope.masters = $scope.printdata[i][0].invoice[0].masters;
            //     $scope.totalduties = $scope.printdata[i][0].invoice[0].totalduties;
            //     console.log('$scope.print', $scope.printdata[i][0].invoice[0].masters);
            //     var totallength = $scope.totalduties.length;
            //     for (var j = totallength + 1; j < 9; j++) {
            //         var a = { "days": "", "jobmastercode": "", "jobmasterid": "", "name": "", "noofduties": "", "noofperson": "", "salary": " ", "salaryamount": "" }
            //         $scope.totalduties.push(a);
            //         $scope.invoiceprint = response.data[0];
            //         $scope.invoiceid = $scope.invoiceprint.invoiceid
            //     }
            // }
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
			$scope.other1 += Number(data[i].otherallowance);
			$scope.epf += Math.round(data[i].epf);
			$scope.other2 += Number(data[i].other2);
			$scope.other2 += Number(data[i].otherdeductions);
		}
		$scope.totalgross = Number($scope.hra) + Number($scope.edamount) + Number($scope.basic) + Number($scope.ma) + Number($scope.unifdt) + Number($scope.leapay) + Number($scope.bonus) + Number($scope.washallow) + Number($scope.other1);
		$scope.totaldeduc = Number($scope.epf) + Number($scope.other2);
		$scope.netpay = Number($scope.totalgross) - Number($scope.totaldeduc);
        $scope.inwords = $scope.numberInWords(Math.round($scope.netpay));
        
        totalarray=[{'presentdays':$scope.presentdays,'eddays':$scope.eddays,'edamount':$scope.edamount,'othours':$scope.othours,'hra':$scope.hra,'basic':$scope.basic,'ma':$scope.ma,'unifdt':$scope.unifdt,'leapay':$scope.leapay,'bonus':$scope.bonus,'washallow':$scope.washallow,'other1':$scope.other1,'epf':$scope.epf,'other2':$scope.other2,'totalgross':$scope.totalgross,'totaldeduc':$scope.totaldeduc,'netpay':$scope.netpay,'inwords':$scope.inwords}]
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
        alert('completed')
    }

    $scope.printcompleted = function () {
        $http({
            method: 'POST',
            url: api_url + '/job/UpdatePrintCount',
            data: $.param({
                "invoiceid": $scope.invoiceid,
                "type": $scope.type,
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : atoken
            }, 
        }).success(function (response, result) {

        }).error(function (error) {

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