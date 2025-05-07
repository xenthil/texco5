<script type="text/javascript"> var base_url = "<?php echo base_url()?>" </script>
<script type="text/javascript"> var api_url = "<?php echo config_item('api_url')?>" </script>
<script type="text/javascript" src="<?php echo base_url("assets/libs/jquery/3.7.1/jquery.min.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/libs/angular/1.8.2/angular.min.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/app/printinvoice.js")?>"></script>
<script type="text/javascript">var invoiceno = "<?php echo $_GET['invoiceno'];?>"</script>
<link href="<?php echo base_url("assets/css/texco.css")?>" rel="Stylesheet" type="text/css" />
<style>
   @page { size: auto;  margin: 0; }
   @media print {
   .header, .hide { visibility: hidden }
   }
</style>
<div ng-app="appPrint" ng-controller="ctrlPrint">
   <table width="97%" align="center" cellpadding="0" cellspacing="0" border="1" style="border-collapse: collapse;page-break-after:always;margin-top:2% !important;">
      <tbody>
         <tr>
            <td width="100%" align="center">
               <table width="99%" align="center" cellpadding="0" cellspacing="0" border="0">
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
               <hr />
               <table width="95%" align="center" border="0" cellpadding="0" cellspacing="0">
                  <tbody>
                     <tr>
                        <br>
                        <td align="left"><b>Bill No :  </b>{{invoiceprint.invoiceno}}</td>
                        <td align="right"> {{invoiceprint.createddate}} </td>
                     </tr>
                     <tr>
                        <td>
                           <strong>Month and Year :  </strong>{{invoiceprint.monthandyear}}
                        </td>
                     </tr>
                     <tr>
                        <td>
                           <br>
                        </td>
                     </tr>
                     <tr>
                        <td>
                           <strong>Project No :</strong>{{invoiceprint.projectno}}
                        </td>
                     </tr>
                  </tbody>
               </table>
               <br>
               <table width="95%" align="center" border="0" cellpadding="0" cellspacing="0">
                  <tbody>
                     <tr>
                        <td>
                           <strong>To:</strong>
                        </td>
                     </tr>
                     <tr ng-hide="invoiceprint.designation == '' || invoiceprint.designation == null">
                        <td style="font-size: 15px;" width="50%"  align="left">
                           &nbsp; &nbsp; &nbsp;{{invoiceprint.designation}},<br>
                           &nbsp; &nbsp; &nbsp;<span  ng-hide="invoiceprint.addressline1 == '' || invoiceprint.addressline1 == null" >{{invoiceprint.addressline1}}</span>
                           <span ng-hide="invoiceprint.addressline2 == '' || invoiceprint.addressline2 == null">,<br>&nbsp; &nbsp; &nbsp;{{invoiceprint.addressline2}} </span>
                           <span ng-hide="invoiceprint.addressline3 == '' || invoiceprint.addressline3 == null">,<br>&nbsp; &nbsp; &nbsp;{{invoiceprint.addressline3}} </span><span ng-hide="invoiceprint.pincode == '' || invoiceprint.pincode == null"> - {{invoiceprint.pincode}} </span>
                        </td>
                        <td style="font-size: 15px;" width="50%"  align="right">
                           TEXCO is exempted from the &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>deduction of Income Tax(TDS) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br> Vide CBDT Circular No. 07/2015 &nbsp;&nbsp;<br> Dt. 23.04.2015 of ministry of &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br> finance, Department od Revenue &nbsp;&nbsp;&nbsp;&nbsp;
                        </td>
                     </tr>
                  </tbody>
               </table>
               <table width="95%" align="center" border="0" cellpadding="0" cellspacing="0">
                  <tbody style="text-align: justify;">
                     <tr>
                        <td>
                           <br />
                           <strong>Customer GST IN : </strong>
                        </td>
                     </tr>
                     <tr style="text-align: center;">
                        <td>
                           <br />
                           <strong>TAX INVOICE</strong>
                        </td>
                     </tr>
                     <tr>
                        <td style="text-align: center;">
                           <br />
                           &nbsp; &nbsp; &nbsp; &nbsp; TEXCO - Claim for the month of {{invoiceprint.monthandyear}} - {{invoiceprint.projectname}}  
                           <br/>
                        </td>
                     </tr>
                     <tr>
                        <td>
                           <br/>
                            &nbsp; 1. As per the attendance received for the above period towards deployed at {{invoiceprint.projectname}} invoice as follows
                            <br/>
                        </td>
                     </tr>
                  </tbody>
               </table>
               <br />
               <table width="95%" align="center" cellpadding="0" cellspacing="2" border="0">
                  <tbody>
                     <tr>
                        <td valign="top" width="100%">
                           <table style="border-collapse: collapse;" border="1" width="99%" cellspacing="0" cellpadding="0" align="center">
                              <tbody>
                                 <tr height="30px">
                                    <td align="left" ><strong>&nbsp;S.No</strong></td>
                                    <td align="left" ><strong>&nbsp;Description</strong></td>
                                    <td style="text-align:center" ><strong>&nbsp;No of Person</strong></td>
                                    <td align="left" ><strong>&nbsp;Rate</strong></td>
                                    <td style="text-align:center" ><strong>&nbsp;No Of Duties</strong></td>
                                    <td style="text-align:center" ><strong>&nbsp;Rate P.M/Per</strong></td>
                                    <td align="left" ><strong>&nbsp;Total (Rs.)</strong></td>
                                 </tr>
                                 <tr ng-repeat="l in invoiceprint.totalduties" >
                                    <td>&nbsp;<span ng-show="l.name">{{$index+1}}</span></td>
                                    <td>&nbsp;<span ng-show="l.name">{{l.name}} - {{l.jobmastercode}}&nbsp;</span>
                                       <br>
                                       <span ng-show="l.jobmastercode=='DVR'" ng-repeat="d in invoiceprint.drivers">
                                          <br>
                                          &nbsp;{{d.firstname}} - {{d.texcono}}
                                       </span>
                                    </td>
                                    <td style="text-align:center"><span ng-show="l.name">&nbsp;{{l.noofperson}}</span></td>
                                    <td >&nbsp;<span ng-show="l.name">{{l.salary | number:2}}</span></td>
                                    <td style="text-align:center">&nbsp;<span ng-show="l.name">{{l.noofduties}}</span></td>
                                    <td style="text-align:center">&nbsp;<span ng-show="l.name">({{l.salary  | number:2}} * {{l.noofduties}}) / {{l.days}}  </span> </td>
                                    <td  style="text-align: right;">&nbsp;<span ng-show="l.name">{{l.salaryamount | number:2}} &nbsp;</span></td>
                                 </tr>
                                 <tr>
                                    <td style="text-align: center;" colspan="8">
                                    </td>
                                 </tr>
                              </tbody>
                           </table>
                           <table style="border-collapse: collapse;" border="1" width="99%" cellspacing="0" cellpadding="0" align="center">
                              <tbody>
                                 <tr style="page-break-after:always">
                                    <td style="text-align: center;" colspan="6"><strong>Sub Total</strong></td>
                                    <td style="text-align: right;">{{invoiceprint.subtotal | number:2}} &nbsp;</td>
                                 </tr>
                                 <tr>
                                    <td style="text-align: center;" colspan="6" ><strong>Service Charge {{invoiceprint.servicecharge | number:2}} % </strong></td>
                                    <td style="text-align: right;">{{invoiceprint.servicecharges  | number:2 }} &nbsp;</td>
                                 </tr>
                                 <tr>
                                    <td style="text-align: center;" colspan="6" ><strong>Total</strong></td>
                                    <td style="text-align: right;">{{(invoiceprint.subtotal + invoiceprint.servicecharges)| number:2}} &nbsp;</td>
                                 </tr>
                                 <tr>
                                    <td style="text-align: center;" colspan="6"><strong><strong>CGST {{invoiceprint.tax/2 | number:2}} %</strong></td>
                                    <td style="text-align: right;">{{invoiceprint.servicetax/2 | number:2}} &nbsp;</td>
                                 </tr>
                                 <tr>
                                    <td style="text-align: center;" colspan="6"><strong><strong>SGST {{invoiceprint.tax/2 | number:2}} %</strong></td>
                                    <td style="text-align: right;">{{invoiceprint.servicetax/2 | number:2}} &nbsp;</td>
                                 </tr>
                                 <tr>
                                    <td style="text-align: center;" colspan="6"><strong><strong>IGST 0 %</strong></td>
                                    <td style="text-align: right;">{{0 | number:2}} &nbsp;</td>
                                 </tr>
                                 <tr>
                                    <td style="text-align: center;" colspan="6"><strong>Grand Total</strong></td>
                                    <td style="text-align: right;"><strong>Rs. {{invoiceprint.subtotal + invoiceprint.servicecharges +  invoiceprint.servicetax | number:2}} &nbsp;</strong>
                                       <br>
                                       (or)&nbsp;&nbsp;
                                       <br>
                                       <strong>Rs. {{invoiceprint.total | number:2}} &nbsp;
                                    </td>
                                 </tr>
                              </tbody>
                           </table>
                        </td>
                     </tr>
                  </tbody>
               </table>
               <table width="98%" align="center" border="0" cellpadding="0" cellspacing="0">
                  <tbody style="text-align: justify;">
                     <tr>
                        <td>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;GST Regn No. 33AAACT2912M1ZG&nbsp; &nbsp; PAN No. AAACT2912M &nbsp; &nbsp; CIN No. U70101TN1986SGC012609  &nbsp; &nbsp; </td>
                     </tr>
                     <tr>
                        <td>
                           <br />
                           &nbsp; &nbsp; &nbsp; &nbsp; 2. &nbsp;GST has been claimed as per the Central & State GST Act
                        </td>
                     </tr>
                     <tr>
                        <td>
                           <br />
                           &nbsp; &nbsp; &nbsp; &nbsp; 3.&nbsp; The bill may be passed and cheque forwarded at the earliest
                        </td>
                     </tr>
                  </tbody>
               </table>
               <br />
               <br />
               <table width="95%" align="center" cellpadding="0" cellspacing="0">
                  <!-- <tr>
                       <td width="50%" align="left">
                        <span>&nbsp;&nbsp;&nbsp;*** Computer-generated document, Signature is Not required.</span>
                     </td> 
                  </tr> -->
                  <tr>
                     <td width="60%">
                        <table>
                           <br />
                           <br>
                           <tr>
                           </tr>
                        </table>
                     </td>
                  </tr>
                  <tr width="95%">
                     <td width="30%" align="left">
                        <b>&nbsp;&nbsp;&nbsp;E. & O. E.</b>
                     </td>
                     <td width="70%" align="right">
                        <b>Chief Accounts officer, TEXCO&nbsp;&nbsp;&nbsp;</b>
                     </td>
                     <!-- 
                     <td width="50%">
                        <table>
                           <br />
                           <br />
                           <br />
                           <br />
                           <tr>
                              <td width="30%" align="left">
                                 <b>E. & O. E.</b>
                              </td>
                              <td width="70%" align="right">
                                 <b>Chief Accounts officer, TEXCO</b>
                              </td>
                           </tr>
                        </table>
                     </td> -->
                  </tr>
               </table>
            </td>
         </tr>
      </tbody>
   </table>
</div>
<!--<script>
   $('document').ready(function(){
     setTimeout(function(){ window.print(); }, 1500);
   })
   </script>-->