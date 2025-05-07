<script type="text/javascript"> var base_url = "<?php echo base_url()?>" </script>
<script type="text/javascript"> var api_url = "<?php echo config_item('api_url')?>" </script>
<script type="text/javascript" src="<?php echo base_url("assets/libs/jquery/3.7.1/jquery.min.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/libs/angular/1.8.2/angular.min.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/app/printexpayslip.js")?>"></script>
<script type="text/javascript">var salaryslipid = "<?php echo $_GET['salaryslipid'];?>"</script>
<style>@page { size: auto;  margin: 1mm; }</style>
<div ng-app="appPrint" ng-controller="ctrlPrint">
   <table width="100%" align="center" cellpadding="0" cellspacing="0" border="1" style="border-collapse: collapse">
      <tbody>
         <tr>
            <td width="100%" align="center">
              <!-- <table width="99%" align="center" cellpadding="0" cellspacing="0" border="0">
                  <tbody>
                     <tr>
                        <td width="20%" align="center">
                           <img style="height: 50%;" src="<?php echo base_url("assets/images/clientletter.jpg")?>">
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
                        Payslip for the period of {{invoiceprint.monthandyear}}
                        <br>
                     </tr>
                     <br>
                     <tr>
                        <td align="left"><b>{{invoiceprint.wagetype}} {{invoiceprint.wageyear}} </b>
                        </td>
                     </tr>
                     <tr>
                        <td>
                           <strong>Project No : </strong>{{invoiceprint.projectno}}
                           <br>
                           <strong>Date of Recp : </strong><?php echo  date("d-m-Y");?>
                        </td>
                     </tr>
                  </tbody>
               </table>
               <br>
               <table style="border-collapse: collapse;" border="1" width="99%" cellspacing="0" cellpadding="0" align="center">
                  <tbody style="font-size: 14px;" ng-repeat="x in payslip">
                     <tr height="30px">
                        <td width='50%' colspan='6'><strong>&nbsp;Texco No :</strong> {{x.texcono}}</td><td width='50%' colspan='6'><strong>&nbsp;Bank A/C:</strong> {{x.accountno}}</td>
                     </tr>
                      <tr height="30px">
                        <td width='50%' colspan='6'><strong>&nbsp;PF No :</strong> {{x.pfno}}</td><td width='50%' colspan='6'><strong>&nbsp;Actual Basic Salary :</strong> {{x.ncbasic | number:2}}</td>
                     </tr>
                     <tr height="30px">
                        <td width='50%' colspan='6'><strong>&nbsp;Employee Name :</strong> {{x.firstname}}</td><td width='50%' colspan='6'><strong>&nbsp;Days:</strong> {{x.presentdays}}</td>
                     </tr>
                     <tr height="30px">
                        <td width='50%' colspan='6'></td><td width='50%' colspan='6'><strong>&nbsp;ED Days :</strong> {{x.eddays | number:2}}</td>
                     </tr>
                  </tbody>
               </table>
               <br><br>

               <table style="border-collapse: collapse;" border="1" width="99%" cellspacing="0" cellpadding="0" align="center">
                   <td width='25%' colspan='4'><strong>&nbsp;Earnings</strong> </td><td width='25%' colspan='4'><strong>&nbsp;Amount</strong> </td><td width='25%' colspan='4'><strong>&nbsp;Deduction</strong> </td><td width='25%' colspan='4'><strong>&nbsp;Amount</strong></td>
                  <tbody style="font-size: 14px;" ng-repeat="x in payslip">
                     <tr  height="20px">
                         <td width='25%' colspan='4'>Basic </td><td width='25%' colspan='4'> {{x.basic | number:2}}</td><td width='25%' colspan='4'>EPF </td><td width='25%' colspan='4'> {{x.epf + x.other2 | number:2}}</td>
                     </tr>
                     <tr height="20px">
                         <td width='25%' colspan='4'>ED Amount</td><td width='25%' colspan='4'> {{x.edamount | number:2}}</td><td width='25%' colspan='4'></td><td width='25%' colspan='4'> </td>
                     </tr>
                     <tr height="20px">
                         <td width='25%' colspan='4'>HRA </td><td width='25%' colspan='4'> {{x.hra | number:2}}</td><td width='25%' colspan='4'></td><td width='25%' colspan='4'> </td>
                     </tr>
                     <tr height="20px">
                         <td width='25%' colspan='4'>Medical </td><td width='25%' colspan='4'> {{x.ma | number:2}}</td><td width='25%' colspan='4'></td><td width='25%' colspan='4'> </td>
                     </tr>
                     <tr height="20px">
                         <td width='25%' colspan='4'>Uniform </td><td width='25%' colspan='4'> {{x.unifdt | number:2}}</td><td width='25%' colspan='4'></td><td width='25%' colspan='4'> </td>
                     </tr>
                     <tr height="20px">
                         <td width='25%' colspan='4'>Leave Reserve </td><td width='25%' colspan='4'> {{x.leapay | number:2}}</td><td width='25%' colspan='4'></td><td width='25%' colspan='4'> </td>
                     </tr>
                      <tr height="20px">
                         <td width='25%' colspan='4'>Bonus/Income </td><td width='25%' colspan='4'> {{x.bonus | number:2}}</td><td width='25%' colspan='4'></td><td width='25%' colspan='4'> </td>
                     </tr>
                     <tr height="20px">
                         <td width='25%' colspan='4'>Wash Allowance </td><td width='25%' colspan='4'> {{x.washallow | number:2}}</td><td width='25%' colspan='4'></td><td width='25%' colspan='4'> </td>
                     </tr>
                     <tr height="20px">
                         <td width='25%' colspan='4'>Other Allowance </td><td width='25%' colspan='4'> {{x.other1 | number:2}}</td><td width='25%' colspan='4'></td><td width='25%' colspan='4'> </td>
                     </tr>
                     <tr height="20px">
                         <td width='25%' colspan='4'><strong>Gross :</strong></td><td width='25%' colspan='4'> {{x.basic +  x.ma + x.unifdt + x.leapay + x.bonus + x.washallow +  x.other1 | number:2}}</td><td width='25%' colspan='4'><strong>Total :</strong></td><td width='25%' colspan='4'>{{x.epf + x.other2 | number:2}} </td>
                     </tr>
                     <!-- <tr>
                        <td width='25%' colspan='4'></td><td width='25%' colspan='4'></td><td width='25%' colspan='4'></td> <td width='25%' colspan='4' align='left'><strong>Net Pay :  </strong>  {{x.basic +  x.ma + x.unifdt + x.leapay + x.bonus + x.washallow +  x.other1 - x.epf - x.other2| number:2}}</td>
                     </tr> -->
                  </tbody> 
               </table>
               <br>
               <br>
               <div class="col-md-12" ng-repeat="x in payslip">
               <div align="left" style="margin-right:220px;">
                  <strong>Net Pay : {{ntpay| number:2}} ({{inwords}})
               </strong>
               </div>
               </div>
               <br>
               <br>
               <br>
               <span style="padding-right: 100px;">*** Computer-generated document, Signature is Not required.</span>
               <br>
               <br>
               <br>
               <br>
               <br>

              <!--  <table style="border-collapse: collapse;" border="1" width="99%" cellspacing="0" cellpadding="0" align="center">
                  <tbody style="font-size: 14px;">
                     <tr height="30px">
                        <td align="left" ><strong>&nbsp;S.No</strong></td>
                        <td align="left" ><strong>&nbsp;TEXCO/ PF No</strong></td>
                        <td align="left" ><strong>&nbsp;Employee's Name</strong></td>
                        <td align="left" ><strong>&nbsp;Days</strong></td>
                        <td align="left" ><strong>&nbsp;BASIC</strong></td>
                        <td align="left" ><strong>&nbsp;ED Days</strong></td>
                        <td align="left" ><strong>&nbsp;ED Amt</strong></td>
                        <td align="left" ><strong>&nbsp;HRA</strong></td>
                        <td align="left" ><strong>&nbsp;Medical</strong></td>
                        <td align="left" ><strong>&nbsp;Uniform</strong></td>
                        <td align="left" ><strong>&nbsp;Leave Reser</strong></td>
                        <td align="left" ><strong>&nbsp;Bon/Inct</strong></td>
                        <td align="left" ><strong>&nbsp;Wash Allw</strong></td>
                        <td align="left" ><strong>&nbsp;Others</strong></td>
                        <td align="left" ><strong>&nbsp;Gross</strong></td>
                        <td align="left" ><strong>&nbsp;EPF 12 %</strong></td>
                        <td align="left" ><strong>&nbsp;Unif</strong></td>
                        <td align="left" ><strong>&nbsp;Others</strong></td>
                        <td align="left" ><strong>&nbsp;Total</strong></td>
                        <td align="left" ><strong>&nbsp;Net Pay</strong></td>
                        <td align="left" ><strong>&nbsp;Bank A/C No</strong></td>
                     </tr>
                     <tr ng-repeat="x in payslip" style="font-size: 14px;">
                        <td>&nbsp;{{$index +1}}</td>
                        <td>
                           &nbsp;{{x.texcono}}&nbsp; 
                           <hr>
                           {{x.pfno}}&nbsp;
                        </td>
                        <td>&nbsp;{{x.firstname}}  {{x.jobcode}}<br>&nbsp;Basic = ({{x.ncbasic | number:2}})</td>
                        <td>&nbsp;{{x.presentdays}}</td>
                        <td>&nbsp;{{x.basic | number:2}}</td>
                        <td>&nbsp;{{x.eddays | number:2}}</td>
                        <td>&nbsp;{{x.edamount | number:2}}</td>
                        <td>&nbsp;{{x.hra | number:2}}</td>
                        <td>&nbsp;{{x.ma | number:2}} </td>
                        <td>&nbsp;{{x.unifdt | number:2}} </td>
                        <td>&nbsp;{{x.leapay | number:2}} </td>
                        <td>&nbsp;{{x.bonus | number:2}} </td>
                        <td>&nbsp;{{x.washallow | number:2}} </td>
                        <td>&nbsp;{{x.other1 | number:2}} </td>
                        <td>&nbsp;{{x.basic +  x.ma + x.unifdt + x.leapay + x.bonus + x.washallow +  x.other1 | number:2}} </td>
                        <td>&nbsp;{{x.epf | number:2}} </td>
                        <td>&nbsp; </td>
                        <td>&nbsp;{{x.other2 | number:2}} </td>
                        <td>&nbsp;{{x.epf + x.other2 | number:2}} </td>
                        <td>&nbsp;{{x.basic +  x.ma + x.unifdt + x.leapay + x.bonus + x.washallow +  x.other1 - x.epf - x.other2| number:2}}</td>
                        <td>&nbsp;{{x.accountno}} </td>
                     </tr>
                  </tbody>
               </table>
               <br>
               <br>
               <br>
               <span style="padding-right: 800px;">*** Computer-generated document, Signature is Not required.</span>
               <br>
               <br>
               <br>
               <br>
               <br>
            </td>
         </tr>
      </tbody>
   </table> -->
</div>
<!--<script>
   $('document').ready(function(){
     setTimeout(function(){ window.print(); }, 500);
   })
   </script>-->