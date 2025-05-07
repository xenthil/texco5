<script type="text/javascript"> var base_url = "<?php echo base_url()?>" </script>
<script type="text/javascript"> var api_url = "<?php echo config_item('api_url')?>" </script>
<script type="text/javascript" src="<?php echo base_url("assets/libs/jquery/3.7.1/jquery.min.js")?>">
</script>
<script src="<?php echo base_url("assets/js/lib/underscore.js")?>" charset="utf-8"></script>
<script type="text/javascript" src="<?php echo base_url("assets/libs/angular/1.8.2/angular.min.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/app/printinvoice.js?v=1.0")?>"></script>
<script type="text/javascript">var invoiceno = "<?php echo $_GET['invoiceno'];?>"</script>
<script type="text/javascript">var atoken = "<?php echo $this->session->usertoken('atoken')?>"</script>


<link href="<?php echo base_url("assets/css/texco.css")?>" rel="Stylesheet" type="text/css" />
<style> 
@page {
      size: auto;
      margin: 25mm 5mm 5mm 5mm;
   }

@page:second {
  margin-top: 400mm; // top margin for first page of paper
}
   

   table { page-break-inside:auto }
   tr    { page-break-inside:avoid; page-break-after:auto }
   thead { display:table-header-group }
   tfoot { display:table-footer-group } 
   table {
      -fs-table-paginate: paginate;
      font-size:13px;
   }
   
   @media print {
    .page-break {
        clear: both;
        page-break-before: always;
    }
}
</style>
<div ng-app="appPrint" ng-controller="ctrlPrint" class="pgprint">
<?php //$edtype=$_GET['edtype']; ?>
<div ng-if="invoiceprint.edseperate==0 || invoiceprint.edseperate==null">
<table width="97%" align="center" style="" cellpadding="0" cellspacing="0" border="1" style="border-collapse: collapse;page-break-after:always;padding-top:15% !important;">
      <tbody>
            <td width="100%" align="center">
                <table width="99%" align="center" cellpadding="0" cellspacing="0" border="0">
                  <tbody>
                     <tr>
                        <td width="20%" align="center">
                           <img style="width: 30%;margin-top: 5px;" src="<?php echo base_url("assets/images/clientletter.jpg")?>">
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
                  <!--<tr>
                   <td  colspan='2' align="center">  <div ng-show="invoiceprint.printcount>0"> Duplicate Copy</div>
                          <div ng-show="invoiceprint.printcount==0">Original Copy</div></td>
                   </tr>-->
        
                     <tr>
                        <br>
                        <td align="left" class="bill-no"><b>Bill No :  {{invoiceprint.invoiceno}}</b></td>
                        <td align="left">Date : {{invoiceprint.createddate}} </td>
                     </tr>
                     <tr>
                        <td>
                           <strong>Month and Year :  </strong>{{invoiceprint.monthandyear}}
                        </td>
                     </tr>
                    
                     <tr ng-if="invoiceprint.invoicetype == 0">
                        <td >
                           <strong>Project No :<span style="font-size:15px;">{{invoiceprint.projectno}}</span><span> / {{invoiceprint.projectname}} </span></strong>
                        </td>
                                                                                                                                                                                                                           </tr>
                                                                                                                                                                                                                           <tr ng-if="invoiceprint.invoicetype == 1">
                        <td>
                        <strong>Project No :<span style="font-size:15px;">{{combineprojno}}</span><span> / {{combineprojname}} </span></strong>
                        </td>
                        

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
                        <td style="font-size: 15px;padding-left: 17px;" width="50%"  align="left">
                           {{invoiceprint.designation}},<br>
                          <span  ng-hide="invoiceprint.addressline1 == '' || invoiceprint.addressline1 == null" >{{invoiceprint.addressline1}}</span>
                           <span ng-hide="invoiceprint.addressline2 == '' || invoiceprint.addressline2 == null">,<br>{{invoiceprint.addressline2}} </span>
                           <span ng-hide="invoiceprint.addressline3 == '' || invoiceprint.addressline3 == null">,<br>{{invoiceprint.addressline3}} </span><span ng-hide="invoiceprint.pincode == '' || invoiceprint.pincode == null"> - {{invoiceprint.pincode}} </span>
                        </td>
                        <td style="font-size: 15px;" class="bordertd"  border="1" >
                           TEXCO is exempted from the deduction of Income Tax(TDS)   Vide CBDT Circular No. 07/2015  Dt. 23.04.2015 of ministry of <br> finance, Department of Revenue
                        </td>
                     </tr>
                  </tbody>
               </table>
               <table width="95%" align="center" border="0" cellpadding="0" cellspacing="0">
                  <tbody style="text-align: justify;">
                     <tr>
                        <td style="padding-left: 17px;">
                           <br />
                           <strong>Customer GST IN : {{invoiceprint.gstno}} </strong>
                        </td>
                     </tr>
                     <tr style="text-align: center;">
                        <td  style="font-size:18px;">
                           <br />
                           <strong>CLAIM BILL</strong>
                        </td>
                     </tr>
                     <tr>
                        <td style="text-align: justify;">
                           <br />
                           <div style="display: flex;justify-content: center;">
                           <div> TEXCO - {{claim}} for the period from<b> 01/{{startper}} to  {{maxday}}/{{startper}} </b>- <br/><span ng-if="invoiceprint.invoicetype == 0">{{invoiceprint.projectname}}</span><span ng-if="invoiceprint.invoicetype == 1">{{combineprojname}}</span> </div>
                           </div>
                           <br/>
                        </td>
                     </tr>
                     <tr>
                     <td>
                     
                           <br/>
                             1. As per the attendance received for the above period towards security deployed at <span ng-if="invoiceprint.invoicetype == 0">{{invoiceprint.projectname}}</span><span ng-if="invoiceprint.invoicetype == 1">{{combineprojname}}</span> invoice as follows
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
                                    <td align="center" ><strong>&nbsp;S.No</strong></td>
                                    <td align="left" ng-if="invoiceprint.invoicetype == 1"><strong>&nbsp;Project No/Name</strong></td>
                                    <td align="left" ><strong>&nbsp;Description</strong></td>
                                    <td style="text-align:center" ><strong>&nbsp;No of Person</strong></td>
                                   
                                    <td style="text-align:center" ><strong>&nbsp;No Of Duties</strong></td>
                                    <td style="text-align:center" ><strong>&nbsp;Rate P.M</strong></td>
                                    <td align="center" ><strong>&nbsp;Total (Rs.)</strong></td>
                                 </tr>  
                                 <tr ng-repeat="l in invoiceprint.totalduties" >
                                    <td align="center" >&nbsp;<span ng-show="l.name">{{$index+1}}</span></td>
                                    <td align="left" ng-if="invoiceprint.invoicetype == 1">
                                       <span ng-show="l.name"> {{l.projectno}} -  {{l.projectname}} </span>
                                    </td>
                                   <!-- <td ng-if="invoiceprint.invoicetype != 1" >&nbsp;<span ng-show="l.name">{{l.name}}&nbsp;</span>
                                      
                                       <span ng-show="l.jobmastercode=='DVR'" ng-repeat="d in invoiceprint.drivers">
                                          <br>
                                          &nbsp;{{d.firstname}} - {{d.texcono}}
                                       </span>
                                    </td>-->

                                    <td>&nbsp;<span ng-show="l.name">{{l.name}}&nbsp;</span>
                                     
                                       <span ng-show="l.jobmastercode=='DVR'" ng-repeat="a in l.dvrjob">
                                          <br>
                                          
                                          &nbsp;{{a.firstname}} - {{a.texcono}}
                                       </span>
                                    </td>
                                    <td style="text-align:center"><div class="right-center"><span ng-show="l.name">&nbsp;{{l.noofperson}}</span></div></td>
                                  
                                    <td style="text-align:center"><div class="right-center-nod"><span ng-show="l.name">{{l.noofduties | number:2}}</div></span></td>
                                    <td  style="text-align:center"><div class="right-center-rpm"><span ng-show="l.name">
                                   <span class="span-sal"> ({{l.salary  | number:2}}</span> <span class="span-ast"> *</span> <span class="span-nodd">{{l.noofduties}}) / {{l.days}} </span> </span></div> </td>
                                    <td  style="text-align: right;padding-right: 5px;">&nbsp;<span ng-show="l.name">{{l.salaryamount | IndiaCurrency}}</span></td>
                                 </tr>
                                

                                 <tr>
                               
                                 <td>
                                 </td>
                                 <td ng-if="invoiceprint.invoicetype == 1">
                                 </td>
                                  <td>
                                 </td>
                                    <td style="text-align: center;">
                                    Total
                                    </td>
                                    <td style="text-align: center;">
                                    <div class="right-center-nod"><span>{{totaljobs | number:2}}</div></span>
                                    </td>
                                    <td>
                                 </td>
                                 </tr>
                              </tbody>
                           </table>
                           <table style="border-collapse: collapse;" border="1" width="99%" cellspacing="0" cellpadding="0" align="center">
                              <tbody>
                                 <tr style="page-break-after:always">
                                    <td class="left-btsec" style="text-align: left;" colspan="7"><strong>Sub Total</strong></td>
                                    <td style="text-align: right;"><strong>{{invoiceprint.subtotal | IndiaCurrency}} &nbsp;</strong></td>
                                 </tr>
                                 <tr>
                                    <td class="left-btsec" style="text-align: left;" colspan="7" ><strong>Service Charge {{invoiceprint.servicecharge | IndiaCurrency}} % </strong></td>
                                    <td style="text-align: right;"><span>{{invoiceprint.servicecharges  | IndiaCurrency }} &nbsp;</span></td>
                                 </tr>

                                 <tr  ng-show ="invoiceprint.allowancevalue1 == 0 && invoiceprint.allowancetype1 != ''  " >
                                    <td class="left-btsec" style="text-align: left;" colspan="7" ><strong>{{invoiceprint.allowancetype1}}</strong></td>
                                   
                                 </tr>

                                 <tr  ng-show ="invoiceprint.allowancevalue1 > 0" >
                                    <td class="left-btsec" style="text-align: left;" colspan="7" ><strong>{{invoiceprint.allowancetype1}}</strong></td>
                                    <td style="text-align: right;"><span>{{invoiceprint.allowancevalue1  | IndiaCurrency }} &nbsp;</span></td>
                                 </tr>

                                 <tr ng-show ="invoiceprint.allowancevalue2 > 0" >
                                    <td class="left-btsec" style="text-align: left;" colspan="7" ><strong>{{invoiceprint.allowancetype2}}</strong></td>
                                    <td style="text-align: right;"><span>{{invoiceprint.allowancevalue2  | IndiaCurrency }} &nbsp;</span></td>
                                 </tr>

                                 <tr ng-show ="invoiceprint.allowancevalue3 > 0" >
                                    <td class="left-btsec" style="text-align: left;" colspan="7" ><strong>{{invoiceprint.allowancetype3}}</strong></td>
                                    <td style="text-align: right;"><span>{{invoiceprint.allowancevalue3  | IndiaCurrency }} &nbsp;</span></td>
                                 </tr>


                                 <tr>
                                    <td class="left-btsec" style="text-align: left;" colspan="7" ><strong>Total</strong></td>
                                    <td style="text-align: right;">{{totalsub| IndiaCurrency}} &nbsp;</td>
                                 </tr>
                                 <tr ng-show="invoiceprint.taxtype==0 || invoiceprint.taxtype==null  ">
                                    <td class="left-btsec" style="text-align: left;" colspan="7"><strong><strong>CGST {{invoiceprint.tax/2}} %</strong><span class="t-amt">{{invoiceprint.servicetax/2 |IndiaCurrency}}</span></td>
                                   
                                 </tr>
                                 <tr ng-show="invoiceprint.taxtype==0 || invoiceprint.taxtype==null ">
                                 <td class="left-btsec" style="text-align: left;" colspan="7"><strong><strong>SGST {{invoiceprint.tax/2}} %</strong><span class="t-amt"> {{invoiceprint.servicetax/2 |IndiaCurrency}}</span></td>
                                    
                                 </tr>
                                  <tr ng-show="invoiceprint.taxtype==0 || invoiceprint.taxtype==null ">
                                    <td class="left-btsec" style="text-align: left;" colspan="7"><strong><strong>IGST 0 %<span class="t-amt igst">{{0}}</span> </td>
                                  
                                    <td style="text-align: right;"><strong>{{invoiceprint.servicetax | IndiaCurrency}} </strong>&nbsp;</td>
                                 </tr>

                                 <tr ng-show="invoiceprint.taxtype==1">
                                    <td class="left-btsec" style="text-align: left;" colspan="7"><strong><strong>IGST  {{invoiceprint.tax}} %<span class="t-amt igst">{{invoiceprint.servicetax}}</span> </td>
                                  
                                    <td style="text-align: right;"><strong>{{invoiceprint.servicetax | IndiaCurrency}} </strong>&nbsp;</td>
                                 </tr>

                                 <tr>
                                    <td style="text-align: center;" colspan="7"></td>
                                   
                                 </tr>
                                
                                 <tr >
                                    <td style="text-align: left;" colspan="7"><span class="grand_total"> <strong>Grand Total</strong></span><br/> 
                                    
                                  <b> (Rupees {{inwordsinv}})</b>
                                    </td>
                                    <td style="text-align: right;"><strong>Rs. {{totalsubgrand | IndiaCurrency}} &nbsp;</strong>
                                       <br>
                                       (or)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                     
                                       <br>
                                       <strong>Rs. {{invoiceprint.total | IndiaCurrency}}&nbsp;&nbsp;</strong>
                                    </td>
                                 </tr>
                                
                              </tbody>
                           </table>

                        </td>
                        <tr><td></td></tr>
                        <tr><td></td></tr>
                        <tr><td></td></tr>
                       
                     </tr>
                    
                  </tbody>
               </table>
               <table style="margin-left:35px" width="98%" align="center" border="0" cellpadding="0" cellspacing="0">
                  <tbody style="text-align: justify;">
                    
                     <tr>
                        <td>
                           2. GST has been claimed as per the Central & State GST Act
                        </td>
                     </tr>
                     <tr>
                        <td> 3.GST Regn No. 33AAACT2912M1ZG ,  PAN No. AAACT2912M  ,  CIN No. U70101TN1986SGC012609 </td>
                     </tr>
                     <tr>
                        <td>
                      
                            4.The bill may be passed and cheque forwarded at the earliest
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
   
   <table width="97%" align="center" style="" cellpadding="0" cellspacing="0" border="1" class="page-break" style="border-collapse: collapse;page-break-after:always;padding-top:15% !important;">
      <tbody>
            <td width="100%" align="center">
                <table width="99%" align="center" cellpadding="0" cellspacing="0" border="0">
                  <tbody>
                     <tr>
                        <td width="20%" align="center">
                           <img style="width: 30%;margin-top: 5px;" src="<?php echo base_url("assets/images/clientletter.jpg")?>">
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
                  <!--<tr>
                   <td  colspan='2' align="center">  <div ng-show="invoiceprint.printcount>0"> Duplicate Copy</div>
                          <div ng-show="invoiceprint.printcount==0">Original Copy</div></td>
                   </tr>-->
        
                     <tr>
                        <br>
                        <td align="left" class="bill-no"><b>Bill No :  {{invoiceprint.invoiceno}}</b></td>
                        <td align="left">Date : {{invoiceprint.createddate}} </td>
                     </tr>
                     <tr>
                        <td>
                           <strong>Month and Year :  </strong>{{invoiceprint.monthandyear}}
                        </td>
                     </tr>
                    
                     <tr ng-if="invoiceprint.invoicetype == 0">
                        <td >
                           <strong>Project No :<span style="font-size:15px;">{{invoiceprint.projectno}}</span><span> / {{invoiceprint.projectname}} </span></strong>
                        </td>
                                                                                                                                                                                                                           </tr>
																																																						      <tr ng-if="invoiceprint.invoicetype == 1">
                        <td>
                        <strong>Project No :<span style="font-size:15px;">{{combineprojno}}</span><span> / {{combineprojname}} </span></strong>
                        </td>
                        

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
                     <td style="font-size: 15px;padding-left: 17px;" width="50%"  align="left">
                           {{invoiceprint.designation}},<br>
                          <span  ng-hide="invoiceprint.addressline1 == '' || invoiceprint.addressline1 == null" >{{invoiceprint.addressline1}}</span>
                           <span ng-hide="invoiceprint.addressline2 == '' || invoiceprint.addressline2 == null">,<br>{{invoiceprint.addressline2}} </span>
                           <span ng-hide="invoiceprint.addressline3 == '' || invoiceprint.addressline3 == null">,<br>{{invoiceprint.addressline3}} </span><span ng-hide="invoiceprint.pincode == '' || invoiceprint.pincode == null"> - {{invoiceprint.pincode}} </span>
                        </td>
                        <td style="font-size: 15px;" class="bordertd"  border="1" >
                           TEXCO is exempted from the deduction of Income Tax(TDS)   Vide CBDT Circular No. 07/2015  Dt. 23.04.2015 of ministry of <br> finance, Department of Revenue
                        </td>
                     </tr>
                  </tbody>
               </table>
               <table width="95%" align="center" border="0" cellpadding="0" cellspacing="0">
                  <tbody style="text-align: justify;">
                     <tr>
                     <td style="padding-left: 17px;">
                           <br />
                           <strong>Customer GST IN : {{invoiceprint.gstno}} </strong>
                        </td>
                     </tr>
                     <tr style="text-align: center;">
                        <td  style="font-size:18px;">
                           <br />
                           <strong>CLAIM BILL</strong>
                        </td>
                     </tr>
                     <tr>
                        <td style="text-align: justify;">
                           <br />
                           <div style="display: flex;justify-content: center;">
                           <div> TEXCO - {{claim}} for the period from<b> 01/{{startper}} to  {{maxday}}/{{startper}} </b>- <br/><span ng-if="invoiceprint.invoicetype == 0">{{invoiceprint.projectname}}</span><span ng-if="invoiceprint.invoicetype == 1">{{combineprojname}}</span> </div>
                           </div>
                           </div>
                           <br/>
                        </td>
                     </tr>
                     <tr>
                     <td>
                     
                           <br/>
                             1. As per the attendance received for the above period towards security deployed at <span ng-if="invoiceprint.invoicetype == 0">{{invoiceprint.projectname}}</span><span ng-if="invoiceprint.invoicetype == 1">{{combineprojname}}</span> invoice as follows
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
                                    <td align="center" ><strong>&nbsp;S.No</strong></td>
                                    <td align="left" ng-if="invoiceprint.invoicetype == 1"><strong>&nbsp;Project No/Name</strong></td>
                                    <td align="left" ><strong>&nbsp;Description</strong></td>
                                    <td style="text-align:center" ><strong>&nbsp;No of Person</strong></td>
                                   
                                    <td style="text-align:center" ><strong>&nbsp;No Of Duties</strong></td>
                                    <td style="text-align:center" ><strong>&nbsp;Rate P.M</strong></td>
                                    <td align="center" ><strong>&nbsp;Total (Rs.)</strong></td>
                                 </tr>  
                                 <tr ng-repeat="l in invoiceprint.totalduties" >
                                    <td align="center" >&nbsp;<span ng-show="l.name">{{$index+1}}</span></td>
                                    <td align="left" ng-if="invoiceprint.invoicetype == 1">
                                       <span ng-show="l.name"> {{l.projectno}} -  {{l.projectname}} </span>
                                    </td>
                                    <td >&nbsp;<span ng-show="l.name">{{l.name}}&nbsp;</span>
                                      
                                       <span ng-show="l.jobmastercode=='DVR'" ng-repeat="d in invoiceprint.drivers">
                                          <br>
                                          &nbsp;{{d.firstname}} - {{d.texcono}}
                                       </span>
                                    </td>
                                    <td style="text-align:center"><div class="right-center"><span ng-show="l.name">&nbsp;{{l.noofperson}}</span></div></td>
                                  
                                    <td style="text-align:center"><div class="right-center-nod"><span ng-show="l.name">{{l.noofduties | number:2}}</div></span></td>
                                    <td  style="text-align:center"><div class="right-center-rpm"><span ng-show="l.name">
                                   <span class="span-sal"> ({{l.salary  | number:2}}</span> <span class="span-ast"> *</span> <span class="span-nodd">{{l.noofduties}}) / {{l.days}} </span> </span></div> </td>
                                    <td  style="text-align: right;padding-right: 5px;">&nbsp;<span ng-show="l.name">{{l.salaryamount | IndiaCurrency}}</span></td>
                                 </tr>
                                

                                 <tr>
                               
                                 <td>
                                 </td>
                                 <td ng-if="invoiceprint.invoicetype == 1">
                                 </td>
                                  <td>
                                 </td>
                                    <td style="text-align: center;">
                                    Total
                                    </td>
                                    <td style="text-align: center;">
                                    <div class="right-center-nod"><span>{{totaljobs | number:2}}</div></span>
                                    </td>
                                    <td>
                                 </td>
                                 </tr>
                              </tbody>
                           </table>
                           <table style="border-collapse: collapse;" border="1" width="99%" cellspacing="0" cellpadding="0" align="center">
                              <tbody>
                                 <tr style="page-break-after:always">
                                    <td class="left-btsec" style="text-align: left;" colspan="7"><strong>Sub Total</strong></td>
                                    <td style="text-align: right;"><strong>{{invoiceprint.subtotal | IndiaCurrency}} &nbsp;</strong></td>
                                 </tr>
                                 <tr>
                                    <td class="left-btsec" style="text-align: left;" colspan="7" ><strong>Service Charge {{invoiceprint.servicecharge | IndiaCurrency}} % </strong></td>
                                    <td style="text-align: right;"><span>{{invoiceprint.servicecharges  | IndiaCurrency }} &nbsp;</span></td>
                                 </tr>

                                 <tr  ng-show ="invoiceprint.allowancevalue1 == 0 && invoiceprint.allowancetype1 != ''  " >
                                    <td class="left-btsec" style="text-align: left;" colspan="7" ><strong>{{invoiceprint.allowancetype1}}</strong></td>
                                   
                                 </tr>

                                 <tr  ng-show ="invoiceprint.allowancevalue1 > 0" >
                                    <td class="left-btsec" style="text-align: left;" colspan="7" ><strong>{{invoiceprint.allowancetype1}}</strong></td>
                                    <td style="text-align: right;"><span>{{invoiceprint.allowancevalue1  | IndiaCurrency }} &nbsp;</span></td>
                                 </tr>

                                 <tr ng-show ="invoiceprint.allowancevalue2 > 0" >
                                    <td class="left-btsec" style="text-align: left;" colspan="7" ><strong>{{invoiceprint.allowancetype2}}</strong></td>
                                    <td style="text-align: right;"><span>{{invoiceprint.allowancevalue2  | IndiaCurrency }} &nbsp;</span></td>
                                 </tr>

                                 <tr ng-show ="invoiceprint.allowancevalue3 > 0" >
                                    <td class="left-btsec" style="text-align: left;" colspan="7" ><strong>{{invoiceprint.allowancetype3}}</strong></td>
                                    <td style="text-align: right;"><span>{{invoiceprint.allowancevalue3  | IndiaCurrency }} &nbsp;</span></td>
                                 </tr>

                                 <tr>
                                    <td class="left-btsec" style="text-align: left;" colspan="7" ><strong>Total</strong></td>
                                    <td style="text-align: right;">{{totalsub| IndiaCurrency}} &nbsp;</td>
									
                                 </tr>
								 
								  <tr ng-show="invoiceprint.taxtype==0|| invoiceprint.taxtype==null ">
                                    <td class="left-btsec" style="text-align: left;" colspan="7"><strong><strong>CGST {{invoiceprint.tax/2}} %</strong><span class="t-amt">{{invoiceprint.servicetax/2 |IndiaCurrency}}</span></td>
                                   
                                 </tr>
                                 <tr ng-show="invoiceprint.taxtype==0 || invoiceprint.taxtype==null">
                                 <td class="left-btsec" style="text-align: left;" colspan="7"><strong><strong>SGST {{invoiceprint.tax/2}} %</strong><span class="t-amt"> {{invoiceprint.servicetax/2 |IndiaCurrency}}</span></td>
                                    
                                 </tr>
                                  <tr ng-show="invoiceprint.taxtype==0 || invoiceprint.taxtype==null ">
                                    <td class="left-btsec" style="text-align: left;" colspan="7"><strong><strong>IGST 0 %<span class="t-amt igst">{{0}}</span> </td>
                                  
                                    <td style="text-align: right;"><strong>{{invoiceprint.servicetax | IndiaCurrency}} </strong>&nbsp;</td>
                                 </tr>

                                 <tr ng-show="invoiceprint.taxtype==1">
                                    <td class="left-btsec" style="text-align: left;" colspan="7"><strong><strong>IGST  {{invoiceprint.tax}} %<span class="t-amt igst">{{invoiceprint.servicetax}}</span> </td>
                                  
                                    <td style="text-align: right;"><strong>{{invoiceprint.servicetax | IndiaCurrency}} </strong>&nbsp;</td>
                                 </tr>
                                 <tr>
                                    <td style="text-align: center;" colspan="7"></td>
                                   
                                 </tr>
                                
                                 <tr >
                                    <td style="text-align: left;" colspan="7"><span class="grand_total"> <strong>Grand Total</strong></span><br/> 
                                    
                                  <b> (Rupees {{inwordsinv}})</b>
                                    </td>
                                    <td style="text-align: right;"><strong>Rs. {{totalsubgrand | IndiaCurrency}} &nbsp;</strong>
                                       <br>
                                       (or)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                     
                                       <br>
                                       <strong>Rs. {{invoiceprint.total | IndiaCurrency}}&nbsp;&nbsp;</strong>
                                    </td>
                                 </tr>
                                
                              </tbody>
                           </table>

                        </td>
                        <tr><td></td></tr>
                        <tr><td></td></tr>
                        <tr><td></td></tr>
                       
                     </tr>
                    
                  </tbody>
               </table>
               <table style="margin-left:35px" width="98%" align="center" border="0" cellpadding="0" cellspacing="0">
                  <tbody style="text-align: justify;">
                    
                     <tr>
                        <td>
                           2. GST has been claimed as per the Central & State GST Act
                        </td>
                     </tr>
                     <tr>
                        <td> 3.GST Regn No. 33AAACT2912M1ZG ,  PAN No. AAACT2912M  ,  CIN No. U70101TN1986SGC012609 </td>
                     </tr>
                     <tr>
                        <td>
                      
                            4.The bill may be passed and cheque forwarded at the earliest
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
  
   <table width="97%" align="center" cellpadding="0" cellspacing="0" class="page-break" border="1" style="border-collapse: collapse;page-break-after:always;margin-top:2% !important;">
      <tbody>
         <tr>
            <td width="100%" align="center">
               <table width="99%" align="center" cellpadding="0" cellspacing="0" border="0">
                  <tbody>
                     <tr>
                        <td width="20%" align="center">
                           <img style="width: 30%;margin-top: 5px;" src="<?php echo base_url("assets/images/clientletter.jpg")?>">
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
                        <td align="left"><b>Bill No :  {{invoiceprint.invoiceno}}</b></td>
                        <td align="right">Date : {{invoiceprint.createddate}} </td>
                     </tr>
                     <tr>
                        <td>
                           <strong>Month and Year :  </strong>{{invoiceprint.monthandyear}}
                        </td>
                     </tr>
                    
                     <tr ng-if="invoiceprint.invoicetype == 0">
                     <td >
                           <strong>Project No :<span style="font-size:15px;">{{invoiceprint.projectno}}</span><span> / {{invoiceprint.projectname}}</strong>
                        </td>
                                                                                                                                                                                                                           </tr>
																																																						   
																																																						    <tr ng-if="invoiceprint.invoicetype == 1">
                        <td>
                        <strong>Project No :<span style="font-size:15px;">{{combineprojno}}</span><span> / {{combineprojname}} </span></strong>
                        </td>
                        

                        </td>
                                                                                                                                                                                                                           </tr>
                                                                                                                                                                                                                           <div ng-init="type=3"></div>
                    <!-- <tr>
                   
                       
                        <td align="left"><b>Bill No:</b>{{invoiceprint.invoiceno}}
                        </td>
                        <td align="right"><b>Dated On:</b> {{invoiceprint.createddate}}
                        </td>
                     </tr>-->
                  </tbody>
               </table>
               <br>
               <table width="95%" align="center" border="0" cellpadding="0" cellspacing="0">
                  <tbody style="text-align: justify;">
                   <!--  <tr style="text-align: center;">
                        <td  colspan='2' align="center">  <div ng-show="invoiceprint.printcount>0"> Duplicate Copy</div>
                        <div ng-show="invoiceprint.printcount==0">Orginal Copy</div>
                        </td>
                     </tr>-->
                     <tr style="text-align: center;">
                        <td>
                           <br />
                           <strong>ADVANCE RECEIPT</strong>
                        </td>
                     </tr>
                     <tr>
                        <td style="text-align: left;">
                           <br />
                           Received a sum of Rs. {{invoiceprint.total | IndiaCurrency}}/- (Rupees {{inwordsinv}}) from the <span ng-if="invoiceprint.invoicetype == 0">{{invoiceprint.projectname}}</span><span ng-if="invoiceprint.invoicetype == 1">{{combineprojname}}</span> towards {{advclaim }}service charges for the period from 01/{{startper}} to  {{maxday}}/{{startper}}  against the Bill No  {{invoiceprint.invoiceno}} for personnel deployed at the <span ng-if="invoiceprint.invoicetype == 0">{{invoiceprint.projectname}}</span><span ng-if="invoiceprint.invoicetype == 1">{{combineprojname}}</span>., by TEXCO Ltd


                         
                           
                           
                        </td>
                     </tr>
                  </tbody>
               </table>
               <br />
               <table width="95%" align="center" cellpadding="0" cellspacing="0">
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
<div ng-if="invoiceprint.edseperate==1">
 
   <table width="97%" align="center" style="" cellpadding="0" cellspacing="0" class="page-break" border="1" style="border-collapse: collapse;page-break-after:always;padding-top:15% !important;">
      <tbody>
            <td width="100%" align="center">
                <table width="99%" align="center" cellpadding="0" cellspacing="0" border="0">
                  <tbody>
                     <tr>
                        <td width="20%" align="center">
                           <img style="width: 30%;margin-top: 5px;" src="<?php echo base_url("assets/images/clientletter.jpg")?>">
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
                  <!--<tr>
                   <td  colspan='2' align="center">  <div ng-show="invoiceprint.printcount>0"> Duplicate Copy</div>
                          <div ng-show="invoiceprint.printcount==0">Original Copy</div></td>
                   </tr>-->
        
                     <tr>
                        <br>
                        <td align="left" class="bill-no"><b>Bill No :  {{invoiceprint.invoiceno}}</b></td>
                        <td align="left">Date : {{invoiceprint.createddate}} </td>
                     </tr>
                     <tr>
                        <td>
                           <strong>Month and Year :  </strong>{{invoiceprint.monthandyear}}
                        </td>
                     </tr>
                    
                     <tr ng-if="invoiceprint.invoicetype == 0">
                        <td >
                           <strong>Project No :<span style="font-size:15px;">{{invoiceprint.projectno}}</span><span> / <span ng-if="invoiceprint.invoicetype == 0">{{invoiceprint.projectname}}</span><span ng-if="invoiceprint.invoicetype == 1">{{combineprojname}}</span> </span></strong>
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
                     <td style="font-size: 15px;padding-left: 17px;" width="50%"  align="left">
                           {{invoiceprint.designation}},<br>
                          <span  ng-hide="invoiceprint.addressline1 == '' || invoiceprint.addressline1 == null" >{{invoiceprint.addressline1}}</span>
                           <span ng-hide="invoiceprint.addressline2 == '' || invoiceprint.addressline2 == null">,<br>{{invoiceprint.addressline2}} </span>
                           <span ng-hide="invoiceprint.addressline3 == '' || invoiceprint.addressline3 == null">,<br>{{invoiceprint.addressline3}} </span><span ng-hide="invoiceprint.pincode == '' || invoiceprint.pincode == null"> - {{invoiceprint.pincode}} </span>
                        </td>
                        <td style="font-size: 15px;" class="bordertd"  border="1" >
                           TEXCO is exempted from the deduction of Income Tax(TDS)   Vide CBDT Circular No. 07/2015  Dt. 23.04.2015 of ministry of <br> finance, Department of Revenue
                        </td>
                     </tr>
                  </tbody>
               </table>
               <table width="95%" align="center" border="0" cellpadding="0" cellspacing="0">
                  <tbody style="text-align: justify;">
                     <tr>
                     <td style="padding-left: 17px;">
                           <br />
                           <strong>Customer GST IN : {{invoiceprint.gstno}} </strong>
                        </td>
                     </tr>
                     <tr style="text-align: center;">
                        <td  style="font-size:18px;">
                           <br />
                           <strong>CLAIM BILL</strong>
                        </td>
                     </tr>
                     <tr>
                        <td style="text-align: justify;">
                           <br />
                           <div style="display: flex;justify-content: center;">
                           <div> TEXCO - {{claim}} for the period from<b> 01/{{startper}} to  {{maxday}}/{{startper}} </b>- <br/><span ng-if="invoiceprint.invoicetype == 0">{{invoiceprint.projectname}}</span><span ng-if="invoiceprint.invoicetype == 1">{{combineprojname}}</span> </div>
                           </div>
                           <br/>
                        </td>
                     </tr>
                     <tr>
                     <td>
                     
                           <br/>
                             1. As per the attendance received for the above period towards security deployed at <span ng-if="invoiceprint.invoicetype == 0">{{invoiceprint.projectname}}</span><span ng-if="invoiceprint.invoicetype == 1">{{combineprojname}}</span> invoice as follows
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
                                    <td align="center" ><strong>&nbsp;S.No</strong></td>
                                    <td align="left" ng-if="invoiceprint.invoicetype == 1"><strong>&nbsp;Project No/Name</strong></td>
                                    <td align="left" ><strong>&nbsp;Description</strong></td>
                                    <td style="text-align:center" ><strong>&nbsp;No of Duties</strong></td>
                                   
                                    <td style="text-align:center" ><strong>&nbsp;Actual Duties</strong></td>
                                    <td style="text-align:center" ><strong>&nbsp;Bill for the month of {{invoiceprint.monthandyear}} to be raised as per Work Order</strong></td>

                                    <td style="text-align:center" ><strong>&nbsp;Bill for the month extra duties performed for {{invoiceprint.monthandyear}} to be raised as per Work Order</strong></td>

                                    <td style="text-align:center" ><strong>&nbsp;Providing security services for the month of {{invoiceprint.monthandyear}}<br>Amount Rs.</strong></td>
                                    <td style="text-align:center" ><strong>&nbsp;Extra security services for the month of {{invoiceprint.monthandyear}}<br>Amount Rs.</strong></td>


                                 </tr>  
                                 <tr ng-repeat="l in invoiceprint.totalduties" >
                                    <td align="center" >&nbsp;<span ng-show="l.name">{{$index+1}}</span></td>
                                    <td align="left" ng-if="invoiceprint.invoicetype == 1">
                                       <span ng-show="l.name"> {{l.projectno}} -  {{l.projectname}} </span>
                                    </td>
                                    <td >&nbsp;<span ng-show="l.name">{{l.name}}&nbsp;</span>
                                      
                                       <span ng-show="l.jobmastercode=='DVR'" ng-repeat="d in invoiceprint.drivers">
                                          <br>
                                          &nbsp;{{d.firstname}} - {{d.texcono}}
                                       </span>
                                    </td>
                                    <td style="text-align:center"><div class="right-center-nod"><span ng-show="l.name">&nbsp;{{l.noofduties-l.eddays}}</span></div></td>

                                    <td style="text-align:center"><div class="right-center-nod"><span ng-show="l.name">&nbsp;{{l.noofduties-l.eddays}}</span></div></td>

                                   <td style="text-align:center"><div class="right-center-nod"><span ng-show="l.name">&nbsp;{{l.noofduties-l.eddays}}</span></div></td>
                                   <td style="text-align:center"><div class="right-center-nod"><span ng-show="l.name">&nbsp;{{l.eddays}}</span></div></td>
                                   
                                   <td style="text-align:right ;padding-right:6px" ><span ng-show="l.name">&nbsp;{{l.salaryamount - l.salaryedamount  | number:2}}</span></td>
                                   <td style="text-align:right;padding-right:6px"><span ng-show="l.name">&nbsp;{{l.salaryedamount  | number:2}}</span></td>
                                    
                                   
                                 </tr>
                                

                                 <tr>
                               
                                 <td>
                                 </td>
                                 <td>
                                 </td>
                                 <td ng-if="invoiceprint.invoicetype == 1">
                                 </td>
                                  <td>
                                 </td>
                                    <td style="text-align: center;">
                                    Total
                                    </td>
                                    <td style="text-align: center;">
                                    <div class="right-center-nod"><span>{{totalorgjobs | number:2}}</div></span>
                                    </td>

                                    <td style="text-align: center;">
                                    <div class="right-center-nod"><span>{{totaledjobs | number:2}}</div></span>
                                    </td>

                                    <td style="text-align: right;padding-right:6px">
                                    <span>{{salaryedamountwed | number:2}}</span>
                                    </td>

                                    <td style="text-align: right;padding-right:6px">
                                    <span>{{salaryedamount | number:2}}</span>
                                    </td>

                                    <td>
                                 </td>
                                 </tr>
                              </tbody>
                           </table>
                           <table style="border-collapse: collapse;" border="1" width="99%" cellspacing="0" cellpadding="0" align="center">
                              <tbody>
                                 <tr style="page-break-after:always">
                                    <td class="left-btsec" style="text-align: left;" colspan="7"><strong>Sub Total</strong></td>
                                    <td style="text-align: right;"><strong>{{invoiceprint.subtotal | IndiaCurrency}} &nbsp;</strong></td>
                                 </tr>
                                 <tr>
                                    <td class="left-btsec" style="text-align: left;" colspan="7" ><strong>Service Charge {{invoiceprint.servicecharge | IndiaCurrency}} % </strong></td>
                                    <td style="text-align: right;"><span>{{invoiceprint.servicecharges  | IndiaCurrency }} &nbsp;</span></td>
                                 </tr>

                                 <tr  ng-show ="invoiceprint.allowancevalue1 == 0 && invoiceprint.allowancetype1 != ''  " >
                                    <td class="left-btsec" style="text-align: left;" colspan="7" ><strong>{{invoiceprint.allowancetype1}}</strong></td>
                                   
                                 </tr>

                                 <tr  ng-show ="invoiceprint.allowancevalue1 > 0" >
                                    <td class="left-btsec" style="text-align: left;" colspan="7" ><strong>{{invoiceprint.allowancetype1}}</strong></td>
                                    <td style="text-align: right;"><span>{{invoiceprint.allowancevalue1  | IndiaCurrency }} &nbsp;</span></td>
                                 </tr>

                                 <tr ng-show ="invoiceprint.allowancevalue2 > 0" >
                                    <td class="left-btsec" style="text-align: left;" colspan="7" ><strong>{{invoiceprint.allowancetype2}}</strong></td>
                                    <td style="text-align: right;"><span>{{invoiceprint.allowancevalue2  | IndiaCurrency }} &nbsp;</span></td>
                                 </tr>

                                 <tr ng-show ="invoiceprint.allowancevalue3 > 0" >
                                    <td class="left-btsec" style="text-align: left;" colspan="7" ><strong>{{invoiceprint.allowancetype3}}</strong></td>
                                    <td style="text-align: right;"><span>{{invoiceprint.allowancevalue3  | IndiaCurrency }} &nbsp;</span></td>
                                 </tr>

                                 <tr>
                                    <td class="left-btsec" style="text-align: left;" colspan="7" ><strong>Total</strong></td>
                                    <td style="text-align: right;">{{totalsub| IndiaCurrency}} &nbsp;</td>
                                 </tr>
                                 <tr>
                                    <td class="left-btsec" style="text-align: left;" colspan="7"><strong><strong>CGST {{invoiceprint.tax/2}} %</strong><span class="t-amt">{{invoiceprint.servicetax/2 |IndiaCurrency}}</span></td>
                                   
                                 </tr>
                                 <tr>
                                 <td class="left-btsec" style="text-align: left;" colspan="7"><strong><strong>SGST {{invoiceprint.tax/2}} %</strong><span class="t-amt"> {{invoiceprint.servicetax/2 |IndiaCurrency}}</span></td>
                                    
                                 </tr>
                                  <tr>
                                    <td class="left-btsec" style="text-align: left;" colspan="7"><strong><strong>IGST 0 %<span class="t-amt igst">{{0}}</span> </td>
                                  
                                    <td style="text-align: right;"><strong>{{invoiceprint.servicetax | IndiaCurrency}} </strong>&nbsp;</td>
                                 </tr>
                                 <tr>
                                    <td style="text-align: center;" colspan="7"></td>
                                   
                                 </tr>
                                
                                 <tr >
                                    <td style="text-align: left;" colspan="7"><span class="grand_total"> <strong>Grand Total</strong></span><br/> 
                                    
                                  <b> (Rupees {{inwordsinv}})</b>
                                    </td>
                                    <td style="text-align: right;"><strong>Rs. {{totalsubgrand | IndiaCurrency}} &nbsp;</strong>
                                       <br>
                                       (or)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                     
                                       <br>
                                       <strong>Rs. {{invoiceprint.total | IndiaCurrency}}&nbsp;&nbsp;</strong>
                                    </td>
                                 </tr>
                                
                              </tbody>
                           </table>

                        </td>
                        <tr><td></td></tr>
                        <tr><td></td></tr>
                        <tr><td></td></tr>
                       
                     </tr>
                    
                  </tbody>
               </table>
               <table style="margin-left:35px" width="98%" align="center" border="0" cellpadding="0" cellspacing="0">
                  <tbody style="text-align: justify;">
                    
                     <tr>
                        <td>
                           2. GST has been claimed as per the Central & State GST Act
                        </td>
                     </tr>
                     <tr>
                        <td> 3.GST Regn No. 33AAACT2912M1ZG ,  PAN No. AAACT2912M  ,  CIN No. U70101TN1986SGC012609 </td>
                     </tr>
                     <tr>
                        <td>
                      
                            4.The bill may be passed and cheque forwarded at the earliest
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

   <table width="97%" align="center" style="" cellpadding="0" cellspacing="0" border="1" style="border-collapse: collapse;page-break-after:always;padding-top:15% !important;">
      <tbody>
            <td width="100%" align="center">
                <table width="99%" align="center" cellpadding="0" cellspacing="0" border="0">
                  <tbody>
                     <tr>
                        <td width="20%" align="center">
                           <img style="width: 30%;margin-top: 5px;" src="<?php echo base_url("assets/images/clientletter.jpg")?>">
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
                  <!--<tr>
                   <td  colspan='2' align="center">  <div ng-show="invoiceprint.printcount>0"> Duplicate Copy</div>
                          <div ng-show="invoiceprint.printcount==0">Original Copy</div></td>
                   </tr>-->
        
                     <tr>
                        <br>
                        <td align="left" class="bill-no"><b>Bill No :  {{invoiceprint.invoiceno}}</b></td>
                        <td align="left">Date : {{invoiceprint.createddate}} </td>
                     </tr>
                     <tr>
                        <td>
                           <strong>Month and Year :  </strong>{{invoiceprint.monthandyear}}
                        </td>
                     </tr>
                    
                     <tr ng-if="invoiceprint.invoicetype == 0">
                        <td >
                           <strong>Project No :<span style="font-size:15px;">{{invoiceprint.projectno}}</span><span> / <span ng-if="invoiceprint.invoicetype == 0">{{invoiceprint.projectname}}</span><span ng-if="invoiceprint.invoicetype == 1">{{combineprojname}}</span></span></strong>
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
                     <td style="font-size: 15px;padding-left: 17px;" width="50%"  align="left">
                           {{invoiceprint.designation}},<br>
                          <span  ng-hide="invoiceprint.addressline1 == '' || invoiceprint.addressline1 == null" >{{invoiceprint.addressline1}}</span>
                           <span ng-hide="invoiceprint.addressline2 == '' || invoiceprint.addressline2 == null">,<br>{{invoiceprint.addressline2}} </span>
                           <span ng-hide="invoiceprint.addressline3 == '' || invoiceprint.addressline3 == null">,<br>{{invoiceprint.addressline3}} </span><span ng-hide="invoiceprint.pincode == '' || invoiceprint.pincode == null"> - {{invoiceprint.pincode}} </span>
                        </td>
                        <td style="font-size: 15px;" class="bordertd"  border="1" >
                           TEXCO is exempted from the deduction of Income Tax(TDS)   Vide CBDT Circular No. 07/2015  Dt. 23.04.2015 of ministry of <br> finance, Department of Revenue
                        </td>
                     </tr>
                  </tbody>
               </table>
               <table width="95%" align="center" border="0" cellpadding="0" cellspacing="0">
                  <tbody style="text-align: justify;">
                     <tr>
                     <td style="padding-left: 17px;">
                           <br />
                           <strong>Customer GST IN : {{invoiceprint.gstno}} </strong>
                        </td>
                     </tr>
                     <tr style="text-align: center;">
                        <td  style="font-size:18px;">
                           <br />
                           <strong>CLAIM BILL</strong>
                        </td>
                     </tr>
                     <tr>
                        <td style="text-align: justify;">
                           <br />
                           <div style="display: flex;justify-content: center;">
                           <div> TEXCO - {{claim}} for the period from<b> 01/{{startper}} to  {{maxday}}/{{startper}} </b>- <br/><span ng-if="invoiceprint.invoicetype == 0">{{invoiceprint.projectname}}</span><span ng-if="invoiceprint.invoicetype == 1">{{combineprojname}}</span> </div>
                           </div>
                           <br/>
                        </td>
                     </tr>
                     <tr>
                     <td>
                     
                           <br/>
                             1. As per the attendance received for the above period towards security deployed at <span ng-if="invoiceprint.invoicetype == 0">{{invoiceprint.projectname}}</span><span ng-if="invoiceprint.invoicetype == 1">{{combineprojname}}</span> invoice as follows
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
                                    <td align="center" ><strong>&nbsp;S.No</strong></td>
                                    <td align="left" ng-if="invoiceprint.invoicetype == 1"><strong>&nbsp;Project No/Name</strong></td>
                                    <td align="left" ><strong>&nbsp;Description</strong></td>
                                    <td style="text-align:center" ><strong>&nbsp;No of Duties</strong></td>
                                   
                                    <td style="text-align:center" ><strong>&nbsp;Actual Duties</strong></td>
                                    <td style="text-align:center" ><strong>&nbsp;Bill for the month of {{invoiceprint.monthandyear}} to be raised as per Work Order</strong></td>

                                    <td style="text-align:center" ><strong>&nbsp;Bill for the month extra duties performed for {{invoiceprint.monthandyear}} to be raised as per Work Order</strong></td>

                                    <td style="text-align:center" ><strong>&nbsp;Providing security services for the month of {{invoiceprint.monthandyear}}<br>Amount Rs.</strong></td>
                                    <td style="text-align:center" ><strong>&nbsp;Extra security services for the month of {{invoiceprint.monthandyear}}<br>Amount Rs.</strong></td>


                                 </tr>  
                                 <tr ng-repeat="l in invoiceprint.totalduties" >
                                    <td align="center" >&nbsp;<span ng-show="l.name">{{$index+1}}</span></td>
                                    <td align="left" ng-if="invoiceprint.invoicetype == 1">
                                       <span ng-show="l.name"> {{l.projectno}} -  {{l.projectname}} </span>
                                    </td>
                                    <td >&nbsp;<span ng-show="l.name">{{l.name}}&nbsp;</span>
                                      
                                       <span ng-show="l.jobmastercode=='DVR'" ng-repeat="d in invoiceprint.drivers">
                                          <br>
                                          &nbsp;{{d.firstname}} - {{d.texcono}}
                                       </span>
                                    </td>
                                    <td style="text-align:center"><div class="right-center"><span ng-show="l.name">&nbsp;{{l.noofduties-l.eddays}}</span></div></td>

                                    <td style="text-align:center"><div class="right-center"><span ng-show="l.name">&nbsp;{{l.noofduties-l.eddays}}</span></div></td>

                                   <td style="text-align:center"><div class="right-center"><span ng-show="l.name">&nbsp;{{l.noofduties-l.eddays}}</span></div></td>
                                   <td style="text-align:center"><div class="right-center"><span ng-show="l.name">&nbsp;{{l.eddays}}</span></div></td>
                                   <td style="text-align:right"><span ng-show="l.name">&nbsp;{{l.salaryamount - l.salaryedamount  | number:2}}</span></td>
                                   <td style="text-align:right"><span ng-show="l.name">&nbsp;{{l.salaryedamount  | number:2}}</span></td>
                                    
                                   
                                 </tr>
                                

                                 <tr>
                               
                                 <td>
                                 </td>
                                 <td>
                                 </td>
                                 <td ng-if="invoiceprint.invoicetype == 1">
                                 </td>
                                  <td>
                                 </td>
                                    <td style="text-align: center;">
                                    Total
                                    </td>
                                    <td style="text-align: center;">
                                    <div class="right-center-nod"><span>{{totalorgjobs | number:2}}</div></span>
                                    </td>

                                    <td style="text-align: right;">
                                    <span>{{totaledjobs | number:2}}</span>
                                    </td>

                                    <td style="text-align: right;">
                                    <span>{{salaryedamountwed | number:2}}</span>
                                    </td>

                                    <td style="text-align: right;">
                                    <span>{{salaryedamount | number:2}}</span>
                                    </td>

                                    <td>
                                 </td>
                                 </tr>
                              </tbody>
                           </table>
                           <table style="border-collapse: collapse;" border="1" width="99%" cellspacing="0" cellpadding="0" align="center">
                              <tbody>
                                 <tr style="page-break-after:always">
                                    <td class="left-btsec" style="text-align: left;" colspan="7"><strong>Sub Total</strong></td>
                                    <td style="text-align: right;"><strong>{{invoiceprint.subtotal | IndiaCurrency}} &nbsp;</strong></td>
                                 </tr>
                                 <tr>
                                    <td class="left-btsec" style="text-align: left;" colspan="7" ><strong>Service Charge {{invoiceprint.servicecharge | IndiaCurrency}} % </strong></td>
                                    <td style="text-align: right;"><span>{{invoiceprint.servicecharges  | IndiaCurrency }} &nbsp;</span></td>
                                 </tr>
                                 <tr>
                                    <td class="left-btsec" style="text-align: left;" colspan="7" ><strong>Total</strong></td>
                                    <td style="text-align: right;">{{totalsub| IndiaCurrency}} &nbsp;</td>
                                 </tr>
                                 <tr>
                                    <td class="left-btsec" style="text-align: left;" colspan="7"><strong><strong>CGST {{invoiceprint.tax/2}} %</strong><span class="t-amt">{{invoiceprint.servicetax/2 |IndiaCurrency}}</span></td>
                                   
                                 </tr>
                                 <tr>
                                 <td class="left-btsec" style="text-align: left;" colspan="7"><strong><strong>SGST {{invoiceprint.tax/2}} %</strong><span class="t-amt"> {{invoiceprint.servicetax/2 |IndiaCurrency}}</span></td>
                                    
                                 </tr>
                                  <tr>
                                    <td class="left-btsec" style="text-align: left;" colspan="7"><strong><strong>IGST 0 %<span class="t-amt igst">{{0}}</span> </td>
                                  
                                    <td style="text-align: right;"><strong>{{invoiceprint.servicetax | IndiaCurrency}} </strong>&nbsp;</td>
                                 </tr>
                                 <tr>
                                    <td style="text-align: center;" colspan="7"></td>
                                   
                                 </tr>
                                
                                 <tr >
                                    <td style="text-align: left;" colspan="7"><span class="grand_total"> <strong>Grand Total</strong></span><br/> 
                                    
                                  <b> (Rupees {{inwordsinv}})</b>
                                    </td>
                                    <td style="text-align: right;"><strong>Rs. {{totalsubgrand | IndiaCurrency}} &nbsp;</strong>
                                       <br>
                                       (or)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                     
                                       <br>
                                       <strong>Rs. {{invoiceprint.total | IndiaCurrency}}&nbsp;&nbsp;</strong>
                                    </td>
                                 </tr>
                                
                              </tbody>
                           </table>

                        </td>
                        <tr><td></td></tr>
                        <tr><td></td></tr>
                        <tr><td></td></tr>
                       
                     </tr>
                    
                  </tbody>
               </table>
               <table style="margin-left:35px" width="98%" align="center" border="0" cellpadding="0" cellspacing="0">
                  <tbody style="text-align: justify;">
                    
                     <tr>
                        <td>
                           2. GST has been claimed as per the Central & State GST Act
                        </td>
                     </tr>
                     <tr>
                        <td> 3.GST Regn No. 33AAACT2912M1ZG ,  PAN No. AAACT2912M  ,  CIN No. U70101TN1986SGC012609 </td>
                     </tr>
                     <tr>
                        <td>
                      
                            4.The bill may be passed and cheque forwarded at the earliest
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

   <table width="97%" align="center" cellpadding="0" cellspacing="0" border="1"  class="page-break" style="border-collapse: collapse;page-break-after:always;margin-top:2% !important;clear:both">
      <tbody>
         <tr>
            <td width="100%" align="center">
               <table width="99%" align="center" cellpadding="0" cellspacing="0" border="0">
                  <tbody>
                     <tr>
                        <td width="20%" align="center">
                           <img style="width: 30%;margin-top: 5px;" src="<?php echo base_url("assets/images/clientletter.jpg")?>">
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
                        <td align="left"><b>Bill No :  {{invoiceprint[0].invoiceno}}</b></td>
                        <td align="right">Date : {{invoiceprint[0].createddate}} </td>
                     </tr>
                     <tr>
                        <td>
                           <strong>Month and Year :  </strong>{{invoiceprint[0].monthandyear}}
                        </td>
                     </tr>
                    
                     <tr ng-if="invoiceprint[0].invoicetype == 0">
                     <td >
                           <strong>Project No :<span style="font-size:15px;">{{invoiceprint[0].projectno}}</span><span> / {{invoiceprint[0].projectname}} </span></strong>
                        </td>
                                                                                                                                                                                                                           </tr>
                                                                                                                                                                                                                           <div ng-init="type=3"></div>
                    <!-- <tr>
                   
                       
                        <td align="left"><b>Bill No:</b>{{invoiceprint[0].invoiceno}}
                        </td>
                        <td align="right"><b>Dated On:</b> {{invoiceprint[0].createddate}}
                        </td>
                     </tr>-->
                  </tbody>
               </table>
               <br>
               <table width="95%" align="center" border="0" cellpadding="0" cellspacing="0">
                  <tbody style="text-align: justify;">
                   <!--  <tr style="text-align: center;">
                        <td  colspan='2' align="center">  <div ng-show="invoiceprint[0].printcount>0"> Duplicate Copy</div>
                        <div ng-show="invoiceprint[0].printcount==0">Orginal Copy</div>
                        </td>
                     </tr>-->
                     <tr style="text-align: center;">
                        <td>
                           <br />
                           <strong>ADVANCE RECEIPT</strong>
                        </td>
                     </tr>
                     <tr>
                        <td style="text-align: left;">
                           <br />
                           Received a sum of Rs. {{invoiceprint[0].total | IndiaCurrency}}/- (Rupees {{inwordsinv}}) from the {{invoiceprint[0].projectname}} towards {{advclaim }}service charges for the period from 01/{{startper}} to  {{maxday}}/{{startper}}  against the Bill No  {{invoiceprint[0].invoiceno}} for personnel deployed at the {{invoiceprint[0].projectname}}., by TEXCO Ltd


                         
                           
                           
                        </td>
                     </tr>
                  </tbody>
               </table>
               <br />
               <table width="95%" align="center" cellpadding="0" cellspacing="0">
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
</div>
<style>
td.bordertd {
    border: 1px solid;
    width: 30%;
}
span.grand_total {
    margin-left: 46%;
}
// .pgprint
// {
//    margin-left:50px;
//    margin-top:50px;
// }
td.left-btsec {
    padding-left: 49%;
}
span.t-amt {
    margin-left: 31px;
}
span.t-amt.igst {
    margin-left: 62px;
}
td.bill-no {
    width: 62%;
}

.right-center {
    display: flex;
    justify-content: center;
}
.right-center>span {
    text-align: right;
    min-width: 25px;
}
.right-center-nod {
    display: flex;
    justify-content: center;
}
.right-center-nod>span {
    text-align: right;
    min-width: 55px;
}

.right-center-rpm {
    display: flex;
    justify-content: center;
}
.right-center-rpm>span {
    text-align: right;
    min-width: 135px;
}
.right-center-rpm>span span:last-child{
   min-width: 55px;
   display: inline-block;
}

</style>
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

<!--<script>
   $('document').ready(function(){
     setTimeout(function(){ window.print(); }, 1500);
   })
   </script>-->

  