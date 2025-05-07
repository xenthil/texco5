<script type="text/javascript"> var base_url = "<?php echo base_url()?>" </script>
<script type="text/javascript"> var api_url = "<?php echo config_item('api_url')?>" </script>
<script type="text/javascript" src="<?php echo base_url("assets/libs/jquery/3.7.1/jquery.min.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/libs/angular/1.8.2/angular.min.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/app/printclaimpayslip.js")?>"></script>
<script type="text/javascript">var projectid = "<?php echo $_GET['projectid'];?>"</script>
<script type="text/javascript">var monthandyear = "<?php echo $_GET['monthandyear'];?>"</script>
<script type="text/javascript">var payslipno = "<?php echo $_GET['payslipno'];?>"</script>
<script type="text/javascript">var atoken = "<?php echo $this->session->usertoken('atoken')?>"</script>
<link href="<?php echo base_url("assets/css/texco.css")?>" rel="Stylesheet" type="text/css" />

<style> 
   @page {
      size: 15in 12in;
      margin: 27mm 16mm 27mm 16mm;
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
<div ng-app="appclaimPrint" ng-controller="ctrlclaimPrint">
   <table width="100%" align="center" cellpadding="0" cellspacing="0" border="1" style="page-break-before: always; page-break-after: always;border: 1;">
      <tbody>
         <tr>
            <td width="100%" align="center">
               <!-- <table width="99%" align="center" cellpadding="0" cellspacing="0" border="0">
                  <tbody>
                     <tr>
                        <td width="20%" align="center">
                           <img style="height: 50%;margin-top: 5px;" src="<?php echo base_url("assets/images/clientletter.jpg")?>">
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
               <hr /> -->
               <table width="99%" align="center" border="0" cellpadding="0" cellspacing="0">
                  <tbody>
                     <tr>
                        CONSOLIDATED PAYMENT TO TEXCO PERSONNEL IN THE PROJECT OF {{invoiceprint.projectname}} FOR THE PERIOD OF {{invoiceprint.monthandyear}}
                        <br>
                     </tr>
                     <br>
                     <tr>
                        <td align="left"><b>{{invoiceprint.wagetype}} {{invoiceprint.wageyear}} </b>
                        </td>
                        <td align="right" style="font-size: 13px;" >
                           <b> Project Address : </b>
                           <span ng-hide="invoiceprint.designation == '' || invoiceprint.designation == null">
                           &nbsp; &nbsp; &nbsp;{{invoiceprint.designation}},
                           </span>
                           <br>
                           <span  ng-hide="invoiceprint.addressline1 == '' || invoiceprint.addressline1 == null" >{{invoiceprint.addressline1}}</span>
                           <span ng-hide="invoiceprint.addressline2 == '' || invoiceprint.addressline2 == null">, 
                           <br>&nbsp; &nbsp; &nbsp;{{invoiceprint.addressline2}} </span>
                           <span ng-hide="invoiceprint.addressline3 == '' || invoiceprint.addressline3 == null">, 
                           <br>&nbsp; &nbsp; &nbsp;{{invoiceprint.addressline3}} </span> <span ng-hide="invoiceprint.pincode == '' || invoiceprint.pincode == null"> - {{invoiceprint.pincode}}&nbsp; &nbsp; </span>
                        </td>
                     </tr>
                     <tr>
                        <td>
                          
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
                        <td align="left" ><strong>&nbsp;Days</strong></td>
                        <td align="left" ><strong>&nbsp;Basic + <br>&nbsp;Vda</strong></td>
                        
                        <td align="left" ><strong>&nbsp;ED Days</strong></td>
                        <td align="left" ><strong>&nbsp;ED Amt</strong></td>
                        <td align="left" ><strong>&nbsp;Hra</strong></td>
                        <td align="left" ><strong>&nbsp;Medical</strong></td>
                        <td align="left" ><strong>&nbsp;Uniform</strong></td>
                        <td align="left" ><strong>&nbsp;Leave Reser</strong></td>
                        <td align="left" ><strong>&nbsp;Bon/Inct</strong></td>
                        <td align="left" ><strong>&nbsp;Wash Allw</strong></td>
                        <td align="left" ><strong>&nbsp;Others</strong></td>
                        <td align="left" ><strong>&nbsp;Gross</strong></td>
                        <td align="left" ><strong>&nbsp;Epf 12 %</strong></td>
                        <td align="left" ><strong>&nbsp;Unif</strong></td>
                        <td align="left" ><strong>&nbsp;Others</strong></td>
                        <td align="left" ><strong>&nbsp;Total</strong></td>
                        <td align="left" ><strong>&nbsp;Net Pay</strong></td>
     
                     </tr>
                     </thead>
                     <tbody>
                     <tr ng-repeat-start="x in payslip" style="font-size: 14px;border-bottom: 0px solid #fff;">
                        <td align="center" >&nbsp;{{$index+1}}</td>
                        <td align="center" >
                           &nbsp; {{ x[0].members.texcono }} / {{ x[0].members.uanno }} /
                           &nbsp; {{ x[0].members.serviceno }} 
                        </td>
                        <td><span class="capitalize">&nbsp;{{x[0].members.firstname}}</span>&nbsp;{{x[0].members.jobcode}}<br> {{x[0].members.accountno}}&nbsp;</td>
                        <td align="center" >&nbsp;{{x[0].members.presentdays}}</td>
                        <td align="right" >&nbsp;{{x[0].members.basic | number:2}}&nbsp; &nbsp;</td>
                        <td align="center">&nbsp;<span ng-show="x.jobcode!='DVR'"> {{x[0].members.eddays}}</span> <span ng-show="x[0].members.jobcode=='DVR'"> {{x[0].members.othours/8 |  number:0}}&nbsp; &nbsp;</span> </td>
                        <td align="right" >&nbsp;{{x[0].members.edamount | number:2}}&nbsp; &nbsp;</td>
                        <td align="right" >&nbsp;{{x[0].members.hra | number:2}}&nbsp; &nbsp;</td>
                        <td align="right" >&nbsp;{{x[0].members.ma | number:2}} &nbsp; &nbsp;</td>
                        <td align="right" >&nbsp;{{x[0].members.unifdt | number:2}} &nbsp; &nbsp;</td>
                        <td align="right" >&nbsp;{{x[0].members.leapay | number:2}} &nbsp; &nbsp;</td>
                        <td align="right" >&nbsp;{{x[0].members.bonus | number:2}} &nbsp; &nbsp;</td>
                        <td align="right" >&nbsp;{{x[0].members.washallow | number:2}} &nbsp; &nbsp;</td>
                        <td align="right" >&nbsp;{{x[0].members.other1 | number:2}} &nbsp; &nbsp;</td>
                        <td align="right" >&nbsp;{{x[0].members.basic + x[0].members.edamount + x[0].members.hra + x[0].members.ma + x[0].members.unifdt + x[0].members.leapay + x[0].members.bonus + x[0].members.washallow +  x[0].members.other1 | number:0 }} &nbsp; &nbsp;</td>
                        <td align="right" >&nbsp;{{x[0].members.epf | number:0}} &nbsp; &nbsp;</td>
                        <td>&nbsp; </td>
                        <td align="right" >&nbsp;{{x[0].members.other2 | number:2}} &nbsp; &nbsp;</td>
                        <td align="right" >&nbsp;{{x[0].members.epf + x[0].members.other2 | number:0}} &nbsp; &nbsp;</td>
                        <td align="right" >&nbsp;{{x[0].members.basic + x[0].members.edamount + x[0].members.hra +  x[0].members.ma  + x[0].members.unifdt + x[0].members.leapay + x[0].members.bonus + x[0].members.washallow + x[0].members.other1 - x[0].members.epf - x[0].members.other2 | number:0}}&nbsp; &nbsp;</td>
                        

                     </tr>
                 
                     <tr style="font-size: 14px">
                        <td align="center" >&nbsp;</td>
                        <td align="center" >
                           Eligible Amount
                        </td>
                        <td></td>
                        <td align="center" >&nbsp;{{x[1].elgible.presentdays}}</td>
                        <td align="right" >&nbsp;{{x[1].elgible.basic | number:2}}&nbsp; &nbsp;</td>
                        <td align="center">&nbsp;<span ng-show="x[1].elgible.jobcode!='DVR'"> {{x[1].elgible.eddays}}</span> <span ng-show="x[1].elgible.jobcode=='DVR'"> {{x[1].elgible.othours/8 |  number:0}}&nbsp; &nbsp;</span> </td>
                        <td align="right" >&nbsp;{{x[1].elgible.edamount | number:2}}&nbsp; &nbsp;</td>
                        <td align="right" >&nbsp;{{x[1].elgible.hra | number:2}}&nbsp; &nbsp;</td>
                        <td align="right" >&nbsp;{{x[1].elgible.ma | number:2}} &nbsp; &nbsp;</td>
                        <td align="right" >&nbsp;{{x[1].elgible.unifdt | number:2}} &nbsp; &nbsp;</td>
                        <td align="right" >&nbsp;{{x[1].elgible.leapay | number:2}} &nbsp; &nbsp;</td>
                        <td align="right" >&nbsp;{{x[1].elgible.bonus | number:2}} &nbsp; &nbsp;</td>
                        <td align="right" >&nbsp;{{x[1].elgible.washallow | number:2}} &nbsp; &nbsp;</td>
                        <td align="right" >&nbsp;{{x[1].elgible.other1 | number:2}} &nbsp; &nbsp;</td>
                        <td align="right" >&nbsp;{{x[1].elgiblex.basic + x[1].elgible.edamount + x[1].elgible.hra + x[1].elgible.ma + x[1].elgible.unifdt + x[1].elgible.leapay + x[1].elgible.bonus + x[1].elgible.washallow +  x[1].elgible.other1 | number:0 }} &nbsp; &nbsp;</td>
                        <td align="right" >&nbsp;{{x[1].elgible.epf | number:0}} &nbsp; &nbsp;</td>
                        <td>&nbsp; </td>
                        <td align="right" >&nbsp;{{x[1].elgible.other2 | number:2}} &nbsp; &nbsp;</td>
                        <td align="right" >&nbsp;{{x[1].elgible.epf + x[1].elgible.other2 | number:0}} &nbsp; &nbsp;</td>
                        <td align="right" >&nbsp;{{x[1].elgible.basic + x[1].elgible.edamount + x[1].elgible.hra +  x[1].elgible.ma  + x[1].elgible.unifdt + x[1].elgible.leapay + x[1].elgible.bonus + x[1].elgible.washallow +  x[1].elgible.other1 - x[1].elgible.epf - x[1].elgible.other2 | number:0}}&nbsp; &nbsp;</td>
                         

                     </tr>
                     <tr ng-repeat-end style="font-size: 14px">
                        <td align="center" >&nbsp;</td>
                        <td align="center" >
                        Difference
                        </td>
                        <td></td>
                        <td align="center" >&nbsp;{{x[2].diff.presentdays}}</td>
                        <td align="right" >&nbsp;{{x[2].diff.basic | number:2}}&nbsp; &nbsp;</td>
                        <td align="center">&nbsp;<span ng-show="x[2].diff.jobcode!='DVR'"> {{x[2].diff.eddays}}</span> <span ng-show="x[2].diff.jobcode=='DVR'"> {{x[2].diff.othours/8 |  number:0}}&nbsp; &nbsp;</span> </td>
                        <td align="right" >&nbsp;{{x[2].diff.edamount | number:2}}&nbsp; &nbsp;</td>
                        <td align="right" >&nbsp;{{x[2].diff.hra | number:2}}&nbsp; &nbsp;</td>
                        <td align="right" >&nbsp;{{x[2].diff.ma | number:2}} &nbsp; &nbsp;</td>
                        <td align="right" >&nbsp;{{x[2].diff.unifdt | number:2}} &nbsp; &nbsp;</td>
                        <td align="right" >&nbsp;{{x[2].diff.leapay | number:2}} &nbsp; &nbsp;</td>
                        <td align="right" >&nbsp;{{x[2].diff.bonus | number:2}} &nbsp; &nbsp;</td>
                        <td align="right" >&nbsp;{{x[2].diff.washallow | number:2}} &nbsp; &nbsp;</td>
                        <td align="right" >&nbsp;{{x[2].diff.other1 | number:2}} &nbsp; &nbsp;</td>
                        <td align="right" >&nbsp;{{x[2].diff.basic + x[2].diff.edamount + x[2].diff.hra + x[2].diff.ma + x[2].diff.unifdt + x[2].diff.leapay + x[2].diff.bonus + x[2].diff.washallow +  x[2].diff.other1 | number:0 }} &nbsp; &nbsp;</td>
                        <td align="right" >&nbsp;{{x[2].diff.epf | number:0}} &nbsp; &nbsp;</td>
                        <td>&nbsp; </td>
                        <td align="right" >&nbsp;{{x[2].diff.other2 | number:2}} &nbsp; &nbsp;</td>
                        <td align="right" >&nbsp;{{x[2].diff.epf + x[2].diff.other2 | number:0}} &nbsp; &nbsp;</td>
                        <td align="right" >&nbsp;{{x[2].diff.basic + x[2].diff.edamount + x[2].diff.hra +  x[2].diff.ma  + x[2].diff.unifdt + x[2].diff.leapay + x[2].diff.bonus + x[2].diff.washallow +  x[2].diff.other1 - x[2].diff.epf - x[2].diff.other2 | number:0}}&nbsp; &nbsp;</td>
                     

                     </tr>
                     <tr style="page-break-inside: avoid;">
                        <td style="text-align: center;" colspan="3">Total</td>
                        <td><b>&nbsp;{{presentdays}}</b></td>
                        <td><b>&nbsp;{{basic | number:2}}&nbsp; &nbsp;</b></td>
                        <td><b>&nbsp; {{eddays}} </b></td>
                        <td><b>&nbsp;{{edamount | number:2}}&nbsp; &nbsp;</b></td>
                        <td><b>&nbsp;{{hra | number:2}}&nbsp; &nbsp;</b></td>
                        <td><b>&nbsp;{{ma | number:2}}&nbsp; &nbsp;</b></td>
                        <td><b>&nbsp;{{unifdt | number:2}}&nbsp; &nbsp;</b></td>
                        <td><b>&nbsp;{{leapay | number:2}}&nbsp; &nbsp;</b></td>
                        <td><b>&nbsp;{{bonus | number:2}}&nbsp; &nbsp;</b></td>
                        <td><b>&nbsp;{{washallow | number:2}}&nbsp; &nbsp;</b></td>
                        <td><b>&nbsp;{{other1 | number:2}}&nbsp; &nbsp;</b></td>
                        <td><b>&nbsp;{{totalgross | number:0 }}&nbsp; &nbsp;</b></td>
                        <td><b>&nbsp;{{epf | number:0}}&nbsp; &nbsp;</b></td>
                        <td><b>&nbsp;</b></td>
                        <td><b>&nbsp;{{other2 | number:2}}&nbsp; &nbsp;</b></td>
                        <td><b>&nbsp;{{totaldeduc | number:0}}&nbsp; &nbsp;</b></td>
                        <td><b>&nbsp;{{netpay | number:0}}&nbsp; &nbsp;</b></td>
                        <td></td>
                        
                     </tr>
                  </tbody>
               </table>
               <br>
               <table>
                  <tr>
                     <td>
                        (*) Gross = {{totalgross | number:2}}/-  Total Deductions = {{totaldeduc | number:2}}/-   Net = {{netpay | number:2}}/-
                     </td>
                  </tr>
                  <tr>
                     <td>
                        (*) {{inwords}}
                     </td>
                  </tr>
                  <tr>
                     <td>
                        <!-- (*) Basic Pay   SG - 3682   HSG - 4897    ASO - 6259  -->
                     </td>
                  </tr>
               </table>
               <table>
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
                        (b) above statement has not been prepared and paid previously 
                     </td>
                     </tr>
                     <tr>
                     <td>
                       (c) Bonus paid along with monhtly wages w.e.f Oct-Nov'99 
                     </td>
                     </tr>
                     <tr>
                     <td>
                       (d) Deductions of uniform and Insurance stopped w.e.f August `2001-September 2001.
                     </td>
                     </tr>
                     <tr>
                     <td>
                       (d) As per the discussion of Board of TEXCO during 67th Board Meeting held on 6/3/2002 ,Gravity deducted , to be settled at the time of cessation of Service of Service or at the end of contract period which ever is earlier
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
                        Project Clerk
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
                        Accountant
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
                        Accounts Officer
                     </td>
                  </tr>
               </table>
               <br>
               <span style="padding-right: 800px;">*** Computer-generated document, Signature is Not required.</span>
            </td>
         </tr>
      </tbody>
   </table>
</div>
<!--<script>
   $('document').ready(function(){
     setTimeout(function(){ window.print(); }, 500);
   })
   </script>-->