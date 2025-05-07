<script type="text/javascript"> var base_url = "<?php echo base_url()?>" </script>
<script type="text/javascript"> var api_url = "<?php echo config_item('api_url')?>" </script>
<script type="text/javascript" src="<?php echo base_url("assets/libs/jquery/3.7.1/jquery.min.js")?>"></script>
<script src="<?php echo base_url("assets/js/lib/underscore.js")?>" charset="utf-8"></script>
<script type="text/javascript" src="<?php echo base_url("assets/libs/angular/1.8.2/angular.min.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/app/printpayslip.js?v=1.0")?>"></script>
<script type="text/javascript">var projectid = "<?php echo $_GET['projectid'];?>"</script>
<script type="text/javascript">var monthandyear = "<?php echo $_GET['monthandyear'];?>"</script>
<script type="text/javascript">var payslipno = "<?php echo $_GET['payslipno']; ?>"</script> 

<script type="text/javascript">var atoken = "<?php echo $this->session->usertoken('atoken')?>"</script>
<link href="<?php echo base_url("assets/css/texco.css")?>" rel="Stylesheet" type="text/css" />
<style> 
   @page {
      size: 13in 10in;
      margin: 5mm 5mm 5mm 5mm;
   }
   table { page-break-inside:auto }
   tr    { page-break-inside:avoid; page-break-after:auto }
   thead { display:table-header-group }
   tfoot { display:table-footer-group } 
   table {
      -fs-table-paginate: paginate;
   }
   thead.report-header {
      display: table-header-group;
   }
</style>
<div ng-app="appPrint" ng-controller="ctrlPrint">
   <table width="100%" align="center" cellpadding="0" cellspacing="0" border="1" style="page-break-before: always; page-break-after: always;border: 1;">
      <tbody>
         <tr>
            <td width="100%" align="center">
               <table width="99%" align="center" cellpadding="0" cellspacing="0" border="0">
                  <tbody>
                     <tr>
                        <td width="20%" align="center">
                           <img style="width: 20%;margin-top: 5px;" src="<?php echo base_url("assets/images/clientletter.jpg")?>">
                        </td>
                        <td width="100%" align="center">
                           <b>TAMILNADU EX-SERVICEMEN’S CORPORATION LIMITED (TEXCO)</b><br>
                           <b>(A Government of Tamil Nadu Undertaking)</b><br>
                           <b>Major Parameswaran Memorial Building,</b><br>
                           <b>No.2, West Mada Street, Srinagar Colony, Saidapet, Chennai-600 015.</b><br>
                           <b>Phone: 044-22352947, 22301792, 22301793, 22350900 Fax: 044-22301791</b><br>
                        </td>
                     </tr>
                  </tbody>
               </table>
               <hr />
               <table width="99%" align="center" border="0" cellpadding="0" cellspacing="0">
                  <tbody>
                     <tr>
                     <div ng-init="type=1"></div>
                         <!--<div ng-show="invoiceprint.ssprintcount>0"> Duplicate Copy</div>
                         <div ng-show="invoiceprint.ssprintcount==0">Original Copy</div>-->
                        CONSOLIDATED PAYMENT TO TEXCO PERSONNEL IN THE PROJECT OF {{invoiceprint.projectname}} FOR THE   PERIOD FROM <b> 1/{{startper}} to  {{maxday}}/{{startper}} </b>
                        <br>
                     </tr>
                     <br>
                     <tr>
                     
                        <td align="left"><b>{{invoiceprint.wagetype}} {{invoiceprint.wageyear}} </b>
                        </td>
                        <td align="right" style="font-size: 13px;" >
                        <table>
                        <tr>
                        <td> <b> Project Address : </b></td><td> <span ng-hide="invoiceprint.designation == '' || invoiceprint.designation == null">
                           {{invoiceprint.designation}},
                           </span></td>
                        </tr>
                        <tr>
                        <td></td><td> <span  ng-hide="invoiceprint.addressline1 == '' || invoiceprint.addressline1 == null" >{{invoiceprint.addressline1}}</span>
                           <span ng-hide="invoiceprint.addressline2 == '' || invoiceprint.addressline2 == null">, </td>
                        </tr>
                        <tr>
                        <td></td><td> {{invoiceprint.addressline2}} </span>
                           <span ng-hide="invoiceprint.addressline3 == '' || invoiceprint.addressline3 == null">,  </td>
                        </tr>
                        <tr>
                        <td></td><td>{{invoiceprint.addressline3}} </span> <span ng-hide="invoiceprint.pincode == '' || invoiceprint.pincode == null"> - {{invoiceprint.pincode}} </span> </td>
                        </tr>
                        </table>
                          
                          
                          
                           
                           
                           <br>
                        </td>
                     </tr>
                     <tr>
                        <td>
                        
                           <strong>Payslip No &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; : &nbsp;</strong>{{invoiceprint.payslipno}}
                           <br>
                           <strong>Project No &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; : &nbsp;</strong>{{invoiceprint.projectno}}
                           <br>
                           <strong>Date of Recp &nbsp; &nbsp; &nbsp;: &nbsp;</strong><?php echo  date("d-m-Y");?>
                        </td>
                     </tr>
                  </tbody>
               </table>
               <br>
               <table style="border-collapse: collapse;" border="1" width="99%" cellspacing="0" cellpadding="0" align="center">
                  <thead style="font-size: 14px;" class="report-header">
                     <tr height="30px">
                        <td align="left" ><strong>&nbsp;S.No</strong></td>
                        <td align="left" ><strong>&nbsp;Texco/ UAN No / Service No</strong></td>
                        <td align="left" ><strong>&nbsp;Employee's Name / &nbsp; Bank A/C No</strong></td>
                        <td ng-show="maxday1=='0'"></td>
                        <td align="left" ><strong>&nbsp;Days</strong></td>
                        <td align="left" ><strong>&nbsp;Basic + <br>&nbsp;VDA</strong></td>
                        <td align="left" ><strong>&nbsp;ED Days</strong></td>
                        <td align="left" ><strong>&nbsp;ED Amt</strong></td>
                        <td align="left" ><strong>&nbsp;HRA</strong></td>
                        <td align="left" ><strong>&nbsp;Medical Allow</strong></td>
                        <td align="left" ><strong>&nbsp;Uniform Allow</strong></td>
                        <td align="left" ><strong>&nbsp;Leave Reser</strong></td>
                        <td align="left" ><strong>&nbsp;Bon/Inct</strong></td>
                        <td align="left" ><strong>&nbsp;Wash Allw</strong></td>
                        <td align="left" ><strong>&nbsp;Others</strong></td>
                        <td align="left" ><strong>&nbsp;Gross</strong></td>
                        <td colspan=3 >
                        <table  style="border-collapse: collapse;" border="1" >
                        <tr>Deductions</tr>
                        <td width="50%" align="left" ><strong>&nbsp;Epf 12 %</strong></td>
                        <td width="30%" align="left" ><strong>&nbsp;Others</strong></td>
                        <td width="20%" align="left" ><strong>&nbsp;Total Deduc</strong></td>
                        </table>
                        </td>
                        <td align="left" ><strong>&nbsp;Net Pay</strong></td>
                       
                        
                       <!-- <td align="left" ><strong>&nbsp;Bank A/C No</strong></td> -->
                     </tr>
                  </thead>
                  <tbody>
                     <tr ng-repeat="x in payslip" style="font-size: 14px;">
                        <td align="center" >&nbsp;{{$index +1}}</td>
                        <td align="center" >
                           &nbsp;{{x.texcono}}&nbsp; 
                           <hr>
                           &nbsp; {{x.pfno}}&nbsp;
                           <hr>
                           &nbsp;{{x.serviceno}}&nbsp;
                          
                        </td>
                        <td><span class="capitalize fname">&nbsp;{{x.firstname}}</span>&nbsp;{{x.jobcode}}<br>&nbsp;Basic = ({{x.ncbasic | number:2}}) <hr>&nbsp;{{x.accountno}}</td>

                        <td align="left" ng-show="x.presentdays==0">
                        <span ng-show="x.presentdays==0"><br></span>
                        <span ng-show="x.presentdays==0">Eligible<br><hr></span>
                        <span>Difference</span></td>


                        <td align="right" >
                        <span ng-show="x.presentdays==0">&nbsp;{{x.salorg.presentdays}}<br></span>
                        <span ng-show="x.presentdays==0">&nbsp;{{x.salorg.presentdays}}<br><hr></span>
                        <span>&nbsp;{{x.presentdays}}</span></td>
                        <td align="right" ><span ng-show="x.presentdays==0">&nbsp;{{x.salorg.basic}}<br></span>
                        <span ng-show="x.presentdays==0">&nbsp;{{x.salorg.basic}}<br><hr></span><span>&nbsp;{{x.basic | number:0}}</span></td>
                        <td align="right">
                        <span ng-show="x.presentdays==0">&nbsp;{{x.salorg.eddays}}<br></span>
                        <span ng-show="x.presentdays==0">&nbsp;{{x.eddays}}<br><hr></span>
                        
                        <span ng-show="x.jobcode!='DVR'"> &nbsp;{{x.eddays}}</span> <span ng-show="x.jobcode=='DVR'"> {{x.othours/8 |  number:2}}</span> </td>
                        <td align="right" >
                        <span ng-show="x.presentdays==0">&nbsp;{{x.salorg.edamount}}<br></span>
                        <span ng-show="x.presentdays==0">&nbsp;{{x.edamount}}<br><hr></span>
                        <span>&nbsp;{{x.edamount | number:0}}</span></td>
                        <td align="right" >
                        <span ng-show="x.presentdays==0">&nbsp;{{x.salorg.hra}}<br></span>
                        <span ng-show="x.presentdays==0">&nbsp;{{x.salorg.hra}}<br><hr></span>
                        <span>&nbsp;{{x.hra | number:0}}</span></td>
                        <td align="right" >
                        <span ng-show="x.presentdays==0">&nbsp;{{x.salorg.ma | number:0}}<br></span>
                        <span ng-show="x.presentdays==0">&nbsp;{{x.salorg.ma | number:0}}<br><hr></span>
                        <span>&nbsp;{{x.ma | number:0}}</span></td>
                        <td align="right" >
                        
                        <span ng-show="x.presentdays==0">&nbsp;{{x.salorg.unifdt | number:0}}<br></span>
                        <span ng-show="x.presentdays==0">&nbsp;{{x.salorg.unifdt | number:0}}<br><hr></span>

                        <span>&nbsp;{{x.unifdt | number:0}} </span></td>
                        <td align="right" >
                        
                        <span ng-show="x.presentdays==0">&nbsp;{{x.salorg.leapay | number:0}}<br></span>
                        <span ng-show="x.presentdays==0">&nbsp;{{x.salorg.leapay | number:0}}<br>
                        <hr>
                        </span>
                        <span>&nbsp;{{x.leapay | number:0}} </span></td>
                        <td align="right" >
                        <span ng-show="x.presentdays==0">&nbsp;{{x.salorg.bonus | number:0}}<br></span>
                        <span ng-show="x.presentdays==0">&nbsp;{{x.salorg.bonus | number:0}}<br>
                        <hr>
                        </span>

                        <span>&nbsp;{{x.bonus | number:0}}</span></td>
                        <td align="right" >
                        <span ng-show="x.presentdays==0">&nbsp;{{x.salorg.washallow | number:0}}<br></span>
                        <span ng-show="x.presentdays==0">&nbsp;{{x.salorg.washallow | number:0}}<br>
                        <hr>
                        </span>
                        <span>&nbsp;{{x.washallow | number:0}}</span></td>
                        <td align="right" >
                        <span ng-show="x.presentdays==0">&nbsp;{{x.salorg.other1 + x.salorg.otherallowance  | number:0}}<br></span>
                        <span ng-show="x.presentdays==0">&nbsp;{{x.salorg.other1 + x.salorg.otherallowance  | number:0}}<br>
                        <hr>
                        </span>
                        
                        <span>&nbsp;{{x.other1 + x.otherallowance | number:0}} </span></td>
                        <td align="right" >
                        <span ng-show="x.presentdays==0">&nbsp;{{x.salorg.gross  | number:0}}<br></span>
                        <span ng-show="x.presentdays==0">&nbsp;{{x.salorg.gross + x.gross  | number:0}}<br>
                        <hr>
                        </span>
                        <span>&nbsp;{{x.gross | number:0 }} </span></td>
                        <td align="right" >
                        
                        <span ng-show="x.presentdays==0">&nbsp;{{x.salorg.epf  | number:0}}<br></span>
                        <span ng-show="x.presentdays==0">&nbsp;{{x.salorg.epf   | number:0}}<br>
                        <hr>
                        </span>

                        <span>&nbsp;{{x.epf | number:0}} </span></td>
                        <td align="right" >
                        <span ng-show="x.presentdays==0">&nbsp;{{x.salorg.otherdeductions +x .salorg.otherdeductions.other2  | number:0}}<br></span>
                        <span ng-show="x.presentdays==0">&nbsp;{{x.salorg.otherdeductions +x .salorg.otherdeductions.other2   | number:0}}<br>
                        <hr>
                        </span>
                        
                        <span>&nbsp;{{x.other2 + x.otherdeductions | number:0}}</span> </td>
                        <td align="right" >
                        
                        <span ng-show="x.presentdays==0">&nbsp;{{x.salorg.epf + x.salorg.other2 + x.salorg.otherdeductions  | number:0}}<br></span>
                        <span ng-show="x.presentdays==0">&nbsp;{{x.salorg.epf + x.salorg.other2 + x.salorg.otherdeductions  | number:0}}<br>
                        <hr>
                        </span>

                        <span>&nbsp;{{x.epf + x.other2 + x.otherdeductions | number:0}} </span></td>
                        <td align="right" >
                        
                        <span ng-show="x.presentdays==0">&nbsp;{{x.salorg.netpay  | number:0}}<br></span>
                        <span ng-show="x.presentdays==0">&nbsp;{{x.salorg.netpay + x.netpay  | number:0}}<br>
                        <hr>
                        </span>

                        <span>&nbsp;{{x.netpay | number:0}}</span></td>
                     </tr>
                     <tr style="page-break-inside: avoid;">
                        <td style="text-align: center;" colspan="3">Total</td>
                        <td ng-show="maxday1=='0'"></td>
                        <td align="right"><b>&nbsp;{{presentdays}}</b></td>
                        <td align="right"><b>&nbsp;{{basic | number:0}}</b></td>
                        <td align="right"><b> {{eddays}} </b></td>
                        <td align="right"><b>&nbsp;{{edamount | number:0}}</b></td>
                        <td align="right"><b>&nbsp;{{hra | number:0}}</b></td>
                        <td align="right"><b>&nbsp;{{ma | number:0}} </b></td>
                        <td align="right"><b>&nbsp;{{unifdt | number:0}} </b></td>
                        <td align="right"><b>&nbsp;{{leapay | number:0}}</b></td>
                        <td align="right"><b>&nbsp;{{bonus | number:0}}</b></td>
                        <td align="right"><b>&nbsp;{{washallow | number:0}}</b></td>
                        <td align="right"><b>&nbsp;{{other1 | number:0}}</b></td>
                        <td align="right"><b>&nbsp;{{totalgross | number:0 }}</b></td>
                        <td align="right"><b>&nbsp;{{epf | number:0}}</b></td>
                        <td align="right"><b>&nbsp;{{other2 | number:0}}</b></td>
                        <td align="right"><b>&nbsp;{{totaldeduc | number:0}}</b></td>
                        <td align="right"><b>&nbsp;{{netpay | number:0}}</b></td>
                     </tr>
                  </tbody>
               </table>
               <br>
              
               <table>
               <tr>
                     <td>
                        (*) Gross = {{totalgross | number:0}}/-  Total Deductions = {{totaldeduc | number:0}}/-   Net = {{netpay | number:0}}/-
                     </td>
                  </tr>
                  <tr>
                     <td>
                        (*) {{inwords}}
                     </td>
                  </tr>
                  <tr>
                     <td>
                       (*) Basic Pay   SG - {{sg}}   HSG - {{hsg}}    ASO - {{aso}}   DVR - {{dvr}}
                     </td>
                  </tr>
                  <tr></tr>
                  <tr></tr>
                  <tr></tr>
                  <tr></tr>
                  <tr></tr>
                  <tr></tr>
                  <tr>
                  
                     <td>
                        Certified that the :-
                     </td>
                  </tr>
                  <tr>
                     <td>
                        (a) Wages have been prepared strictly as per the certified attendance received from the project and not paid previously
                     </td>
                  </tr>
                  <tr>
                     <td>
                        (b) Bonus paid along with monhtly wages w.e.f Oct-Nov'99 
                     </td>
                  </tr>
                  <tr>
                     <td>
                        (b) Leave Reserve Wages inclusive of National Holidays wages for revised  wages 
                     </td>
                  </tr>
               </table>
               <br>
               
               <br>
               <br>
               <br>
               <table>
                  <tr>
                     <td>
                     Prepared by Project Clerk
                     </td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                      <td>
                      Verified by supervisor 
                     </td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                      <td>
                      Approved by Accounts Officer
                     </td>
                  </tr>
               </table>
               <br>
               <span><b>*** Computer-generated document, Signature is Not required.</b></span>
            </td>
         </tr>
      </tbody>
   </table>
</div>
<script>
(function() {
    var beforePrint = function() {
        //alert('Functionality to run before printing.');
    };

    var afterPrint = function() {
        //  alert('Functionality to run after printing');
        var controllerElement = document.querySelector('[ng-controller="ctrlPrint"]');
        angular.element(controllerElement).scope().printcompleted();
    };

    if (window.matchMedia) {
        var mediaQueryList = window.matchMedia('print');
        mediaQueryList.addListener(function(mql) {
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
}());
</script>
<style>
span.capitalize.fname {
    text-transform: capitalize;
}
thead.report-header td {
    text-align: center;
}
</style>