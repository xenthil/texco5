<script type="text/javascript"> var base_url = "<?php echo base_url()?>" </script>
<script type="text/javascript"> var api_url = "<?php echo config_item('api_url')?>" </script>
<script type="text/javascript" src="<?php echo base_url("assets/libs/jquery/3.7.1/jquery.min.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/libs/angular/1.8.2/angular.min.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/app/printpayslip.js")?>"></script>
<script type="text/javascript">var projectid = "<?php echo $_GET['projectid'];?>"</script>
<script type="text/javascript">var monthandyear = "<?php echo $_GET['monthandyear'];?>"</script>
<script type="text/javascript">var atoken = "<?php echo $this->session->usertoken('atoken')?>"</script>
<link href="<?php echo base_url("assets/css/texco.css")?>" rel="Stylesheet" type="text/css" />
<style>@page { size: auto;  margin: 1mm; }</style>
<div ng-app="appPrint" ng-controller="ctrlPrint">
   <div id="background">
      <p id="bg-text">Preview</p>
   </div>
   <table width="100%" align="center" cellpadding="0" cellspacing="0" border="1" style="border-collapse: collapse">
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
                           <strong>Payslip No : </strong>{{invoiceprint.payslipno}}
                           <br>
                           <strong>Project No : </strong>{{invoiceprint.projectno}}
                           <br>
                           <strong>Date of Recp : </strong><?php echo  date("d-m-Y");?>
                        </td>
                     </tr>
                  </tbody>
               </table>
               <br>
               <table style="border-collapse: collapse;" border="1" width="99%" cellspacing="0" cellpadding="0" align="center">
                  <tbody style="font-size: 14px;">
                     <tr height="30px">
                        <td align="left" ><strong>&nbsp;S.No</strong></td>
                        <td align="left" ><strong>&nbsp;TEXCO/ UAN No / Service No</strong></td>
                        <td align="left" ><strong>&nbsp;Employee's Name / &nbsp; Bank A/C No</strong></td>
                        <td align="left" ><strong>&nbsp;Days</strong></td>
                        <td align="left" ><strong>&nbsp;BASIC + <br>&nbsp;VDA</strong></td>
                        
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
                       <!-- <td align="left" ><strong>&nbsp;Bank A/C No</strong></td> -->
                     </tr>
                     <tr ng-repeat="x in payslip" style="font-size: 14px;">
                        <td align="center" >&nbsp;{{$index +1}}</td>
                        <td align="center" >
                           &nbsp;{{x.texcono}}&nbsp; 
                           <hr>
                           &nbsp;{{x.uanno}}&nbsp;
                           <hr>
                           &nbsp;{{x.serviceno}}&nbsp;
                        </td>
                        <td class="capitalize">&nbsp;{{x.firstname}}  {{x.jobcode}}<br>&nbsp;Basic = ({{x.ncbasic | number:2}})  <hr>&nbsp;{{x.accountno}}</td>
                        <td align="center" >&nbsp;{{x.presentdays}}</td>
                        <td align="right" >&nbsp;{{x.basic | number:2}}&nbsp; &nbsp;</td>
                        <td align="center">&nbsp;<span ng-show="x.jobcode!='DVR'"> {{x.eddays}}</span> <span ng-show="x.jobcode=='DVR'"> {{x.othours/8 |  number:0}}&nbsp; &nbsp;</span> </td>
                        <td align="right" >&nbsp;{{x.edamount | number:2}}&nbsp; &nbsp;</td>
                        <td align="right" >&nbsp;{{x.hra | number:2}}&nbsp; &nbsp;</td>
                        <td align="right" >&nbsp;{{x.ma | number:2}} &nbsp; &nbsp;</td>
                        <td align="right" >&nbsp;{{x.unifdt | number:2}} &nbsp; &nbsp;</td>
                        <td align="right" >&nbsp;{{x.leapay | number:2}} &nbsp; &nbsp;</td>
                        <td align="right" >&nbsp;{{x.bonus | number:2}} &nbsp; &nbsp;</td>
                        <td align="right" >&nbsp;{{x.washallow | number:2}} &nbsp; &nbsp;</td>
                        <td align="right" >&nbsp;{{x.other1 | number:2}} &nbsp; &nbsp;</td>
                        <td align="right" >&nbsp;{{x.basic + x.edamount + x.hra + x.ma + x.unifdt + x.leapay + x.bonus + x.washallow +  x.other1 | number:0 }} &nbsp; &nbsp;</td>
                        <td align="right" >&nbsp;{{x.epf | number:0}} &nbsp; &nbsp;</td>
                        <td>&nbsp; </td>
                        <td align="right" >&nbsp;{{x.other2 | number:2}} &nbsp; &nbsp;</td>
                        <td align="right" >&nbsp;{{x.epf + x.other2 | number:0}} &nbsp; &nbsp;</td>
                        <td align="right" >&nbsp;{{x.basic + x.edamount + x.hra +  x.ma  + x.unifdt + x.leapay + x.bonus + x.washallow +  x.other1 - x.epf - x.other2 | number:0}}&nbsp; &nbsp;</td>
                        <!-- <td>&nbsp;{{x.accountno}} </td> -->
                     </tr>
                     <tr>
                        <td style="text-align: center;" colspan="3">Total</td>
                        <td><b>&nbsp;{{presentdays}}</b></td>
                        <td><b>&nbsp;{{basic | number:2}}&nbsp; &nbsp;</b></td>
                        <td><b>&nbsp; - </b></td>
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
                        (a) Wages have been prepared strictly as per the certified attendance received from the project and not paidd previously
                     </td>
                  </tr>
                  <tr>
                     <td>
                        (b) Bonus paid along with monhtly wages w.e.f Oct-Nov'99 
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
   <style type="text/css">
#background{
    position:absolute;
    z-index:0;
    display:block;
    min-height:50%; 
    min-width:50%;
    color:yellow;
}

#content{
    position:absolute;
    z-index:1;
}

#bg-text
{
    color:lightgrey;
    font-size:120px;
    transform:rotate(300deg);
    -webkit-transform:rotate(300deg);
}
</style>