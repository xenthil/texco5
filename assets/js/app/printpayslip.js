var app = angular.module('appPrint', []).constant('_', window._);
app.controller('ctrlPrint', function ($scope, $http) {
	$scope.payslip = [];
	$scope.sg=0;
	$scope.aso=0;
	$scope.hsg=0;
	$scope.dvr=0;

	if (projectid != 0 && monthandyear != '') {
		$http({
			method: 'GET', 
			headers : {
				"Authorization" : atoken
			},
			url: api_url + "/job/get/payslip?projectid=" + projectid + "&monthandyear=" + monthandyear +"&payslipno=" + payslipno,
		}).then(function successCallback(response) {
			if (response.status = 200) {
				$scope.invoiceprint = response.data[0];
				$scope.payslip = response.data;
				$scope.payslipno = payslipno;
              
				if($scope.invoiceprint.wagetype =="TN MINIMUM VALUE")
				{
					$scope.invoiceprint.wagetype="TN MINIMUM WAGES"
				}
				if($scope.invoiceprint.wagetype =="DGR VALUE")
				{
					$scope.invoiceprint.wagetype="DGR WAGES"
				}
				var sg = _.filter($scope.payslip, function (item) {
                    return item.jobcode == 'SG'
                });
				
				if(sg.length > 0)
				{
					$scope.sg=sg[0]['ncbasic']
				}
				var hsg = _.filter($scope.payslip, function (item) {
                    return item.jobcode == 'HSG'
                });
				if(hsg.length > 0)
				{
					$scope.hsg=hsg[0]['ncbasic']
				}
				var aso = _.filter($scope.payslip, function (item) {
                    return item.jobcode == 'ASO'
                });
				if(aso.length > 0)
				{
					$scope.aso=aso[0]['ncbasic']
				}
				var dvr = _.filter($scope.payslip, function (item) {
                    return item.jobcode == 'DVR'
                });
				if(dvr.length > 0)
				{
					$scope.dvr=dvr[0]['ncbasic']
				}

				var maxdate =_.max($scope.payslip, function (item) {
                    return item.presentdays;
                });

				$scope.maxday=maxdate['presentdays'];
				$scope.maxday1=maxdate['presentdays'];


               var d = new Date(Date.parse(	$scope.invoiceprint.monthandyear));
               $scope.startper= d.getMonth() +1 + "/" + d.getFullYear();


				if($scope.maxday ==0 && $scope.maxday > 15)
				{
					var str=new Date(d.getFullYear(), d.getMonth() +1, 0);
					
					$scope.maxday= str.getDate() ;
				}
				$scope.gettotal($scope.payslip);
			}
		}, function errorCallback(response) {
			alert("Something has gone wrong!");
		});
	}


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
			
			$scope.edamount += Number(data[i].edamount);
			if(data[i].jobcode != 'DVR') {
				$scope.eddays += Number(data[i].eddays);
			}
			if(data[i].jobcode == 'DVR') {
				$scope.othours += Number(data[i].othours);
			}
			
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
			// $scope.grosstotal += Number(data[i].gross);
			// $scope.nettotal += Number(data[i].netpay);
		}
		console.log('res', $scope.eddays);
		console.log('res', $scope.othours);
		$scope.eddays = $scope.eddays + (Number($scope.othours)/8);
		console.log('res', $scope.eddays);
		$scope.totalgross = Number($scope.hra) + Number($scope.edamount) + Number($scope.basic) + Number($scope.ma) + Number($scope.unifdt) + Number($scope.leapay) + Number($scope.bonus) + Number($scope.washallow) + Number($scope.other1);
		//$scope.totalgross = Math.round($scope.grosstotal);
		// console.log('$scope.totalgross',$scope.totalgross);
		$scope.totaldeduc = Number($scope.epf) + Number($scope.other2);
		$scope.netpay = Number($scope.totalgross) - Number($scope.totaldeduc);
		$scope.inwords = $scope.numberInWords(Math.round($scope.netpay));
	}

	$scope.numberInWords = function (num) {
		var a = ['', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ',
			'Seven ', 'Eight ', 'Nine ', 'Ten ', 'Eleven ', 'Twelve ',
			'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ',
			'Eighteen ', 'Nineteen '
		];
		var b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty',
			'Seventy', 'Eighty', 'Ninety'
		];

		if ((num = num.toString()).length > 9)
			return 'overflow';
		var n = ('000000000' + num).substr(-9).match(
			/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
		if (!n)
			return;
		var str = '';
		str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) +
			'Crore ' : '';
		str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) +
			'Lakh ' : '';
		str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) +
			'Thousand ' : '';
		str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) +
			'Hundred ' : '';
		str += (n[5] != 0) ? ((str != '') ? 'and ' : '') +
			(a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'only ' :
			'';
		return str;
	};


	$scope.printcompleted = function() {

		// alert($scope.type)
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
			//alert($(mediaQueryList).html());
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
            //Return result with symbol
            return   output;
        }
    }
});