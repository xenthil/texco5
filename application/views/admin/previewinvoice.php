<script type="text/javascript"> var base_url = "<?php echo base_url()?>" </script>
<script type="text/javascript"> var api_url = "<?php echo config_item('api_url')?>" </script>
<script type="text/javascript" src="<?php echo base_url("assets/libs/jquery/3.7.1/jquery.min.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/libs/angular/1.8.2/angular.min.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/app/printinvoice.js")?>"></script>
<script type="text/javascript">var invoiceno = "<?php echo $_GET['invoiceno'];?>"</script>
<style>@page { size: auto;  margin: 1mm; }</style>
<div ng-app="appPrint" ng-controller="ctrlPrint">
   <div id="background">
      <p id="bg-text">Preview</p>
   </div>
   <table width="100%" align="center" cellpadding="0" cellspacing="0" border="1" style="border-collapse: collapse;page-break-after:always;margin-top:5% !important;">
      <tbody>
         <tr>
            <td width="100%" align="center">
              <!--  <table width="99%" align="center" cellpadding="0" cellspacing="0" border="0">
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
                        <td align="left"><b>Bill No:</b>{{invoiceprint.invoiceno}}
                        </td>
                        <td align="right"><b>Dated On:</b> {{invoiceprint.createddate}}
                        </td>
                     </tr>
                     <tr>
                        <td>
                           <strong>Month and Year:</strong>{{invoiceprint.monthandyear}}
                        </td>
                     </tr>
                  </tbody>
               </table>
               <br>
               <table width="99%" align="center" border="0" cellpadding="0" cellspacing="0">
                  <tbody>
                     <tr>
                        <td>
                           <br />
                           <strong>To:</strong>
                        </td>
                     </tr>
                     <tr ng-hide="invoiceprint.designation == '' || invoiceprint.designation == null">
                        <td style="font-size: 14px;" width="50%">
                           &nbsp; &nbsp; &nbsp;{{invoiceprint.designation}},<br>
                           &nbsp; &nbsp; &nbsp;<span  ng-hide="invoiceprint.addressline1 == '' || invoiceprint.addressline1 == null" >{{invoiceprint.addressline1}}</span>
                           <span ng-hide="invoiceprint.addressline2 == '' || invoiceprint.addressline2 == null">,<br>&nbsp; &nbsp; &nbsp;{{invoiceprint.addressline2}} </span>
                           <span ng-hide="invoiceprint.addressline3 == '' || invoiceprint.addressline3 == null">,<br>&nbsp; &nbsp; &nbsp;{{invoiceprint.addressline3}} </span><span ng-hide="invoiceprint.pincode == '' || invoiceprint.pincode == null"> - {{invoiceprint.pincode}} </span>
                        </td>
                        <td style="font-size: 13px;" width="50%">
                           TEXCO is exempted from the deduction of Income Tax(TDS) Vide CBDT Circular No. 07/2015 Dt. 23.04.2015 of ministry of finance, Department od Revenue
                        </td>
                     </tr>
                  </tbody>
               </table>
               <table width="99%" align="center" border="0" cellpadding="0" cellspacing="0">
                  <tbody style="text-align: justify;">
                     <tr>
                        <td>
                           <br />
                           <strong>Customer GST IN :.</strong>
                        </td>
                     </tr>
                     <tr style="text-align: center;">
                        <td>
                           <br />
                           <strong>INVOICE</strong>
                        </td>
                     </tr>
                     <tr>
                        <td style="text-align: center;">
                           <br />
                           &nbsp; &nbsp; &nbsp; &nbsp; TEXCO Claim for the month of {{invoiceprint.monthandyear}} - {{invoiceprint.projectname}}  
                        </td>
                     </tr>
                     <tr>
                        <td>
                           <br />
                           &nbsp; &nbsp; &nbsp; &nbsp; 1. As per the attendance received for the above period towards deployed at {{invoiceprint.projectname}} invoice as follows
                        </td>
                     </tr>
                  </tbody>
               </table>
               <br />
               <table width="99%" align="center" cellpadding="0" cellspacing="2" border="0">
                  <tbody>
                     <tr>
                        <td valign="top" width="100%">
                           <table style="border-collapse: collapse;" border="1" width="99%" cellspacing="0" cellpadding="0" align="center">
                              <tbody>
                                 <tr height="30px">
                                    <td align="left" ><strong>&nbsp;S.No</strong></td>
                                    <td align="left" ><strong>&nbsp;Description</strong></td>
                                    <td align="left" ><strong>&nbsp;No of Person</strong></td>
                                    <td align="left" ><strong>&nbsp;Rate</strong></td>
                                    <td align="left" ><strong>&nbsp;Number Of Duties</strong></td>
                                    <td align="left" ><strong>&nbsp;Rate P.M/Per</strong></td>
                                    <td align="left" ><strong>&nbsp;Total (Rs.)</strong></td>
                                 </tr>
                                 <tr ng-repeat="l in invoiceprint.totalduties" >
                                    <td >&nbsp;{{$index+1}}</td>
                                    <td >&nbsp;{{l.name}} - {{l.jobmastercode}}&nbsp;
                                       <br>
                                       <span ng-show="l.jobmastercode=='DVR'" ng-repeat="d in invoiceprint.drivers">
                                          <br>
                                          &nbsp;{{d.firstname}} - {{d.texcono}}
                                       </span>
                                    </td>
                                    <td >&nbsp;{{l.noofperson}}</td>
                                    <td >&nbsp;{{l.salary}}</td>
                                    <td >&nbsp;{{l.noofduties}}</td>
                                    <td >&nbsp;({{l.salary}} * {{l.noofduties}})/ {{l.days}}  </span></td>
                                    <td  style="text-align: right;">&nbsp;{{l.salaryamount | number:2}}</td>
                                 </tr>
                                 <tr>
                                    <td style="text-align: center;" colspan="8">
                                    </td>
                                 </tr>
                                 <tr>
                                    <td style="text-align: center;" colspan="6"><strong>Sub Total</strong></td>
                                    <td style="text-align: right;">{{invoiceprint.subtotal | number:2}}</td>
                                 </tr>
                                 <tr>
                                    <td style="text-align: center;" colspan="6" ><strong>Service Charge {{invoiceprint.servicecharge | number:2}} %</strong></td>
                                    <td style="text-align: right;">{{invoiceprint.servicecharges  | number:2 }}</td>
                                 </tr>
                                 <tr>
                                    <td style="text-align: center;" colspan="6" ><strong>Total</strong></td>
                                    <td style="text-align: right;">{{(invoiceprint.subtotal + invoiceprint.servicecharges)| number:2}}</td>
                                 </tr>
                                 <tr>
                                    <td style="text-align: center;" colspan="6"><strong><strong>CGST {{invoiceprint.tax/2 | number:2}} %</strong></td>
                                    <td style="text-align: right;">{{invoiceprint.servicetax/2 | number:2}}</td>
                                 </tr>
                                 <tr>
                                    <td style="text-align: center;" colspan="6"><strong><strong>SGST {{invoiceprint.tax/2 | number:2}} %</strong></td>
                                    <td style="text-align: right;">{{invoiceprint.servicetax/2 | number:2}}</td>
                                 </tr>
                                 <tr>
                                    <td style="text-align: center;" colspan="6"><strong><strong>IGST 0 %</strong></td>
                                    <td style="text-align: right;">{{0 | number:2}}</td>
                                 </tr>
                                 <tr>
                                    <td style="text-align: center;" colspan="6"><strong>Grand Total</strong></td>
                                    <td style="text-align: right;"><strong>Rs. {{invoiceprint.subtotal + invoiceprint.servicecharges +  invoiceprint.servicetax | number:2}}</strong>
                                       <br>
                                       (or)
                                       <br>
                                       <strong>Rs. {{invoiceprint.total | number:2}}
                                    </td>
                                 </tr>
                              </tbody>
                           </table>
                        </td>
                     </tr>
                  </tbody>
               </table>
               <table width="99%" align="center" border="0" cellpadding="0" cellspacing="0">
                  <tbody style="text-align: justify;">
                     <tr>
                        <td>
                           <br />
                           &nbsp; &nbsp; &nbsp; &nbsp; 2. GST has been claimed as per the Central & State GST Act GST Regn No.33AAACT2912M1ZG PAN No. AAACT2912M CIN No. U70101TN1986SGC012609
                        </td>
                     </tr>
                     <tr>
                        <td>
                           <br />
                           &nbsp; &nbsp; &nbsp; &nbsp; 3. The bill may be passed and cheque forwarded at the earliest
                        </td>
                     </tr>
                  </tbody>
               </table>
               <br />
               <br />
               <table width="99%" align="center" cellpadding="0" cellspacing="0">
                  <tr>
                     <td width="50%" align="left">
                        <span>*** Computer-generated document, Signature is Not required.</span>
                     </td>
                  </tr>
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
                  <tr>
                     <td width="30%" align="left">
                        <b>E. & O. E.</b>
                     </td>
                     <td width="70%" align="right">
                        <b>Chief Accounts officer, TEXCO</b>
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
   <table width="100%" align="center" cellpadding="0" cellspacing="0" border="1" style="border-collapse: collapse;page-break-after:always;margin-top:5% !important;">
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
               <table width="99%" align="center" border="0" cellpadding="0" cellspacing="0">
                  <tbody>
                     <tr>
                        <td align="left"><b>Bill No:</b>{{invoiceprint.invoiceno}}
                        </td>
                        <td align="right"><b>Dated On:</b> {{invoiceprint.createddate}}
                        </td>
                     </tr>
                     <tr>
                        <td>
                           <strong>Month and Year:</strong>{{invoiceprint.monthandyear}}
                        </td>
                     </tr>
                  </tbody>
               </table>
               <br>
               <table width="99%" align="center" border="0" cellpadding="0" cellspacing="0">
                  <tbody>
                     <tr>
                        <td>
                           <br />
                           <strong>To:</strong>
                        </td>
                     </tr>
                     <tr ng-hide="invoiceprint.designation == '' || invoiceprint.designation == null">
                        <td style="font-size: 14px;" width="50%">
                           &nbsp; &nbsp; &nbsp;{{invoiceprint.designation}},<br>
                           &nbsp; &nbsp; &nbsp;<span  ng-hide="invoiceprint.addressline1 == '' || invoiceprint.addressline1 == null" >{{invoiceprint.addressline1}}</span>
                           <span ng-hide="invoiceprint.addressline2 == '' || invoiceprint.addressline2 == null">,<br>&nbsp; &nbsp; &nbsp;{{invoiceprint.addressline2}} </span>
                           <span ng-hide="invoiceprint.addressline3 == '' || invoiceprint.addressline3 == null">,<br>&nbsp; &nbsp; &nbsp;{{invoiceprint.addressline3}} </span><span ng-hide="invoiceprint.pincode == '' || invoiceprint.pincode == null"> - {{invoiceprint.pincode}} </span>
                        </td>
                        <td style="font-size: 13px;" width="50%">
                           TEXCO is exempted from the deduction of Income Tax(TDS) Vide CBDT Circular No. 07/2015 Dt. 23.04.2015 of ministry of finance, Department od Revenue
                        </td>
                     </tr>
                  </tbody>
               </table>
               <table width="99%" align="center" border="0" cellpadding="0" cellspacing="0">
                  <tbody style="text-align: justify;">
                     <tr>
                        <td>
                           <br />
                           <strong>Customer GST IN :.</strong>
                        </td>
                     </tr>
                     <tr style="text-align: center;">
                        <td>
                           <br />
                           <strong>INVOICE</strong>
                        </td>
                     </tr>
                     <tr>
                        <td style="text-align: center;">
                           <br />
                           &nbsp; &nbsp; &nbsp; &nbsp; TEXCO Claim for the month of {{invoiceprint.monthandyear}} - {{invoiceprint.projectname}}  
                        </td>
                     </tr>
                     <tr>
                        <td>
                           <br />
                           &nbsp; &nbsp; &nbsp; &nbsp; 1. As per the attendance received for the above period towards deployed at {{invoiceprint.projectname}} invoice as follows
                        </td>
                     </tr>
                  </tbody>
               </table>
               <br />
               <table width="99%" align="center" cellpadding="0" cellspacing="2" border="0">
                  <tbody>
                     <tr>
                        <td valign="top" width="100%">
                           <table style="border-collapse: collapse;" border="1" width="99%" cellspacing="0" cellpadding="0" align="center">
                              <tbody>
                                 <tr height="30px">
                                    <td align="left" ><strong>&nbsp;S.No</strong></td>
                                    <td align="left" ><strong>&nbsp;Description</strong></td>
                                    <td align="left" ><strong>&nbsp;No of Person</strong></td>
                                    <td align="left" ><strong>&nbsp;Rate</strong></td>
                                    <td align="left" ><strong>&nbsp;Number Of Duties</strong></td>
                                    <td align="left" ><strong>&nbsp;Rate P.M/Per</strong></td>
                                    <td align="left" ><strong>&nbsp;Total (Rs.)</strong></td>
                                 </tr>
                                 <tr ng-repeat="l in invoiceprint.totalduties" >
                                    <td >&nbsp;{{$index+1}}</td>
                                    <td >&nbsp;{{l.name}} - {{l.jobmastercode}}&nbsp;
                                       <br>
                                       <span ng-show="l.jobmastercode=='DVR'" ng-repeat="d in invoiceprint.drivers">
                                          <br>
                                          &nbsp;{{d.firstname}} - {{d.texcono}}
                                       </span>
                                    </td>
                                    <td >&nbsp;{{l.noofperson}}</td>
                                    <td >&nbsp;{{l.salary}}</td>
                                    <td >&nbsp;{{l.noofduties}}</td>
                                    <td >&nbsp;({{l.salary}} * {{l.noofduties}})/ {{l.days}}  </span></td>
                                    <td  style="text-align: right;">&nbsp;{{l.salaryamount | number:2}}</td>
                                 </tr>
                                 <tr>
                                    <td style="text-align: center;" colspan="8">
                                    </td>
                                 </tr>
                                 <tr>
                                    <td style="text-align: center;" colspan="6"><strong>Sub Total</strong></td>
                                    <td style="text-align: right;">{{invoiceprint.subtotal | number:2}}</td>
                                 </tr>
                                 <tr>
                                    <td style="text-align: center;" colspan="6" ><strong>Service Charge {{invoiceprint.servicecharge | number:2}} %</strong></td>
                                    <td style="text-align: right;">{{invoiceprint.servicecharges  | number:2 }}</td>
                                 </tr>
                                 <tr>
                                    <td style="text-align: center;" colspan="6" ><strong>Total</strong></td>
                                    <td style="text-align: right;">{{(invoiceprint.subtotal + invoiceprint.servicecharges)| number:2}}</td>
                                 </tr>
                                 <tr>
                                    <td style="text-align: center;" colspan="6"><strong><strong>CGST {{invoiceprint.tax/2 | number:2}} %</strong></td>
                                    <td style="text-align: right;">{{invoiceprint.servicetax/2 | number:2}}</td>
                                 </tr>
                                 <tr>
                                    <td style="text-align: center;" colspan="6"><strong><strong>SGST {{invoiceprint.tax/2 | number:2}} %</strong></td>
                                    <td style="text-align: right;">{{invoiceprint.servicetax/2 | number:2}}</td>
                                 </tr>
                                 <tr>
                                    <td style="text-align: center;" colspan="6"><strong><strong>IGST 0 %</strong></td>
                                    <td style="text-align: right;">{{0 | number:2}}</td>
                                 </tr>
                                 <tr>
                                    <td style="text-align: center;" colspan="6"><strong>Grand Total</strong></td>
                                    <td style="text-align: right;"><strong>Rs. {{invoiceprint.subtotal + invoiceprint.servicecharges +  invoiceprint.servicetax | number:2}}</strong>
                                       <br>
                                       (or)
                                       <br>
                                       <strong>Rs. {{invoiceprint.total | number:2}}
                                    </td>
                                 </tr>
                              </tbody>
                           </table>
                        </td>
                     </tr>
                  </tbody>
               </table>
               <table width="99%" align="center" border="0" cellpadding="0" cellspacing="0">
                  <tbody style="text-align: justify;">
                     <tr>
                        <td>
                           <br />
                           &nbsp; &nbsp; &nbsp; &nbsp; 2. GST has been claimed as per the Central & State GST Act GST Regn No.33AAACT2912M1ZG PAN No. AAACT2912M CIN No. U70101TN1986SGC012609
                        </td>
                     </tr>
                     <tr>
                        <td>
                           <br />
                           &nbsp; &nbsp; &nbsp; &nbsp; 3. The bill may be passed and cheque forwarded at the earliest
                        </td>
                     </tr>
                  </tbody>
               </table>
               <br />
               <br />
               <br />
               <br />
               <table width="99%" align="center" cellpadding="0" cellspacing="0">
                  <tr>
                     <td width="60%" align="left">
                        <span>*** Computer-generated document, Signature is Not required.</span>
                     </td>
                  </tr>
                  <tr>
                     <td width="50%">
                        <table>
                           <br />
                           <br>
                           <tr>
                           </tr>
                        </table>
                     </td>
                  </tr>
                  <tr>
                     <td width="30%" align="left">
                        <b>E. & O. E.</b>
                     </td>
                     <td width="70%" align="right">
                        <b>Chief Accounts officer, TEXCO</b>
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
   <table width="100%" align="center" cellpadding="0" cellspacing="0" border="1" style="border-collapse: collapse;page-break-after:always;margin-top:5% !important;">
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
               <table width="99%" align="center" border="0" cellpadding="0" cellspacing="0">
                  <tbody>
                     <tr>
                        <td align="left"><b>Bill No:</b>{{invoiceprint.invoiceno}}
                        </td>
                        <td align="right"><b>Dated On:</b> {{invoiceprint.createddate}}
                        </td>
                     </tr>
                  </tbody>
               </table>
               <br>
               <table width="99%" align="center" border="0" cellpadding="0" cellspacing="0">
                  <tbody style="text-align: justify;">
                     <tr style="text-align: center;">
                        <td>
                           <br />
                           <strong>ADVANCE RECEIPT</strong>
                        </td>
                     </tr>
                     <tr>
                        <td style="text-align: center;">
                           <br />
                           &nbsp; &nbsp; &nbsp; &nbsp; Received a sum of Rs. {{invoiceprint.total | number:2}} only from the {{invoiceprint.projectname}} towards the above Job Category service chanrges for the period {{invoiceprint.monthandyear}} against the bill no  {{invoiceprint.invoiceno}} for personnel deployed at the {{invoiceprint.projectname}} 
                        </td>
                     </tr>
                  </tbody>
               </table>
               <br />
               <table width="99%" align="center" cellpadding="0" cellspacing="0">
                   <tr>
                     <td width="50%">
                        <table>
                           <br />
                           <br>
                           <tr>
                           </tr>
                        </table>
                     </td>
                  </tr>
                  <tr>
                     <td width="30%" align="left">
                        <b>E. & O. E.</b>
                     </td>
                     <td width="70%" align="right">
                        <b>Chief Accounts officer, TEXCO</b>
                     </td>
                     <!-- <td width="100%">
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