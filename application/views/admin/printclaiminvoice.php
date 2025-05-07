<script type="text/javascript"> var base_url = "<?php echo base_url()?>" </script>
<script type="text/javascript"> var api_url = "<?php echo config_item('api_url')?>" </script>
<script type="text/javascript" src="<?php echo base_url("assets/libs/jquery/3.7.1/jquery.min.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/libs/angular/1.8.2/angular.min.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/app/printclaiminvoice.js")?>"></script>
<script type="text/javascript">var invoiceno = "<?php echo $_GET['invoiceno'];?>"</script>
<script type="text/javascript">var atoken = "<?php echo $this->session->usertoken('atoken')?>"</script>
<link href="<?php echo base_url("assets/css/texco.css")?>" rel="stylesheet" type="text/css" />
<style> 
   @page {
      size: 10in 12in;
      margin: 27mm 16mm 27mm 16mm;
   }
   table { page-break-inside:auto }
   tr    { page-break-inside:avoid; page-break-after:auto }
   thead { display:table-header-group }
   tfoot { display:table-footer-group } 
   table {
      -fs-table-paginate: paginate;
   }
</style>
<div ng-app="appclaimPrint" ng-controller="ctrlclaimPrint">
   <table width="97%" align="center" cellpadding="0" cellspacing="0" border="1" style="border-collapse: collapse;page-break-after:always;margin-top:2% !important;" ng-repeat="n in [].constructor(2)  track by $index">
      <tbody>
         <tr>
            <td width="100%" align="center">
                <table width="99%" align="center" cellpadding="0" cellspacing="0" border="0">
                  <tbody>
                     <tr>
                        <td height="30%" align="center">
                           <img style="width: 30%;margin-top: 5px;" src="<?php echo base_url("assets/images/clientletter.jpg")?>">
                        </td>
                        <td width="100%" align="center">
                           <b>TAMILNADU EX-SERVICEMEN’S CORPORATION LIMITED (TEXCO)</b><br>
                           <b>(A Government of Tamil Nadu Undertaking)</b><br>
                           <b>Major Parameswaran Memorial Building,</b><br>
                           <b>No.2, West Mada Street, Srinagar Colony, Saidapet, Chennai-600 015.Fax: 044-22301791</b><br>
                           <b>Accounts: 044-22350900 Recruitment / Agree: 044-22301793 Admin:044-22352947</b><br>
                        </td>
                     </tr>
                  </tbody>
               </table>
               <hr /> 
               <table width="95%" align="center" border="0" cellpadding="0" cellspacing="0">
                  <tbody>
                     <tr>
                        <br>
                        <td align="left"><b>Bill No :  </b> {{invoiceprint[0].newinvoiceno}} </td>
                        <td align="right"> Dated : {{ invoiceprint[0].invoicedate}} </td>
                     </tr>
                     <tr>
                        <td>
                           <strong>Month and Year :  </strong>{{invoiceprint[0].monthandyear}}
                        </td>
                     </tr>
                     <tr>
                        <td>
                           <br>
                        </td>
                     </tr>
                     <tr>
                        <td>
                           <strong>Project No :</strong>{{invoiceprint[0].projectno}}
                        </td>
                     </tr>
                  </tbody>
               </table>
               <br>
               <table width="95%" align="center" border="0" cellpadding="0" cellspacing="0">
                  <tbody>

                     <tr>
                     <tr><td colspan='2' align="center" style="text-decoration: underline"><h2>{{invoiceprint[0].projectname}}</h2></td></tr>
                        <td>
                           <strong>To:</strong>
                        </td>
                     </tr>
                     <tr>
                        <td style="font-size: 15px;" width="50%"  align="left">
                           &nbsp; &nbsp; &nbsp;{{invoiceprint[0].contactname}}<br>
                           &nbsp; &nbsp; &nbsp;<span  ng-hide="invoiceprint[0].addressline1 == '' || invoiceprint[0].addressline1 == null" >{{invoiceprint[0].addressline1}}</span>
                           <span ng-hide="invoiceprint[0].addressline2 == '' || invoiceprint[0].addressline2 == null">,<br>&nbsp; &nbsp; &nbsp;{{invoiceprint[0].addressline2}} </span>
                           <span ng-hide="invoiceprint[0].addressline3 == '' || invoiceprint[0].addressline3 == null">,<br>&nbsp; &nbsp; &nbsp;{{invoiceprint[0].addressline3}} </span><span ng-hide="invoiceprint[0].pincode == '' || invoiceprint.pincode == null"> - {{invoiceprint[0].pincode}} </span>
                        </td>
                       
                     </tr>
                  </tbody>
               </table>
               <table width="95%" align="center" border="0" cellpadding="0" cellspacing="0">
                  <tbody style="text-align: justify;">
                     
                     <tr style="text-align: center;">
                        <td  style="text-decoration: underline">
                           <br />
                           <strong><h2 >ARREAR CLAIM BILL </h2></strong>
                        </td>
                     </tr>
                     <tr>
                        <td style="text-align: left;">
                           <br />
                           &nbsp; &nbsp; TEXCO - arrear Claim for the period from {{invoiceprint[0].monthandyear}} - {{invoiceprint[0].projectname}}  
                           <br/>
                        </td>
                     </tr>
                     <tr>
                        <td>
                          
                           <h4>{{invoiceprint[0].projectname}}</h4>
                           
                        </td>
                     </tr>
                     <tr>
                        <td style="text-align: center;>
                          
                           <h4>***********</h4>
                           
                        </td>
                     </tr>
                     <tr>
                        <td>
                           <br/>
                            &nbsp; 1. As per the attendance received for the above period towards deployed at {{invoiceprint[0].projectname}} invoice as follows
                            <br/>
                        </td>
                     </tr>
                     <tr>
                        <td>
                         
                            &nbsp;arrear claim as follows
                         
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
                                    <td align="left" ><strong>&nbsp;Period</strong></td>
                                    <td style="text-align:center" ><strong>&nbsp;No of Person</strong></td>
                                    <td style="text-align:center" ><strong>&nbsp;No Of Duties</strong></td>
                                    <td align="left" ><strong>&nbsp;Revised Rate</strong></td>
                                    <td align="left" ><strong>&nbsp;Already Claimed</strong></td>
                                    <td align="left" ><strong>&nbsp;Old Bill No</strong></td>
                                    <td align="left" ><strong>&nbsp;Difference Amount</strong></td>
                                 
                                 </tr>
                                 <tr ng-repeat="l in invoiceprint" >
                                    <td>&nbsp;<span >{{l.StartDate | date : "dd-MM-yyyy"}} to {{l.EndDate | date : "dd-MM-yyyy"}}</span></td>
                                    <td>&nbsp;<span>{{l.jobcode}} - {{l.noofperson}}&nbsp;</span>
                                    <td>&nbsp;<span>{{l.noofduties}}&nbsp;</span>
                                    <td>&nbsp;<span>{{l.revisedrate | number:2}}&nbsp;</span>
                                    <td>&nbsp;<span>{{l.oldrate | number:2}}&nbsp;</span>
                                    <td>&nbsp;<span>{{l.oldinvoiceno}}&nbsp;</span>
                                    <td>&nbsp;<span>{{l.diffamount | number:2}}&nbsp;</span>
                                 </tr>
                                 <tr>
                                 <td>&nbsp;<span >Total</span></td>
                                    <td>&nbsp;<span>&nbsp;</span>
                                    <td>&nbsp;<span>{{noofdutiess}}&nbsp;
                                    
                                    <td>&nbsp;<span>{{revisedrate | number:2}}&nbsp;</span>
                                    <td>&nbsp;<span>{{alreadyclaimed | number:2}}&nbsp;</span>
                                    <td>&nbsp;<span>&nbsp;</span>
                                    <td>&nbsp;<span>{{difference | number:2}}&nbsp;</span>
                                 </tr>
                              </tbody>
                           </table>
                           <table style="border-collapse: collapse;" border="1" width="99%" cellspacing="0" cellpadding="0" align="center">
                              <tbody>
                                 <tr style="page-break-after:always">
                                    <td style="text-align: center;" colspan="6"><strong>Service Charge on {{invoiceprint[0].servicecharge | number:2}} %</strong></td>
                                    <td style="text-align: right;">{{servicecharge | number:2}} &nbsp;</td>
                                 </tr>
                                 <tr>
                                    <td style="text-align: center;" colspan="6" ><strong>Sub Total Rs</strong></td>
                                    <td style="text-align: right;">{{subtotal  | number:2 }} &nbsp;</td>
                                 </tr>
                                 
                                 <tr>
                                    <td style="text-align: center;" colspan="6"><strong><strong>CGST {{invoiceprint[0].tax/2 | number:2}} %</strong></td>
                                    <td style="text-align: right;">{{tax/2 | number:2}} &nbsp;</td>
                                 </tr>
                                 <tr>
                                    <td style="text-align: center;" colspan="6"><strong><strong>SGST {{invoiceprint[0].tax/2 | number:2}} %</strong></td>
                                    <td style="text-align: right;">{{tax/2 | number:2}} &nbsp;</td>
                                 </tr>
                                 <tr>
                                    <td style="text-align: center;" colspan="6"><strong><strong>IGST 0 %</strong></td>
                                    <td style="text-align: right;">{{0 | number:2}} &nbsp;</td>
                                 </tr>
                                 <tr>
                                    <td style="text-align: center;" colspan="6"><strong>Grand Total</strong></td>
                                    <td style="text-align: right;"><strong>Rs. {{total | number:2}} &nbsp;</strong>
                                       <br>
                                       (or)&nbsp;&nbsp;
                                       <br>
                                       <strong>Rs. {{finaltotal | number:2}} &nbsp;
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
                        <td>
                           <br />
                           <p style="text-decoration: underline;margin-left: 36px;"><srtong>Rupees {{numberinwords}}<strong></p>
                        </td>
                     </tr>
                     
                     <tr>
                        <td>
                           <br />
                           &nbsp; &nbsp; &nbsp; &nbsp; 1. &nbsp;GST has been claimed as per the Central & State GST Act
                        </td>
                     </tr>
                     <tr>
                        <td>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;GST Regn No. 33AAACT2912M1ZG&nbsp; &nbsp; PAN No. AAACT2912M &nbsp; &nbsp; CIN No. U70101TN1986SGC012609  &nbsp; &nbsp; </td>
                     </tr>
                     <tr>
                        <td>
                           <br />
                           &nbsp; &nbsp; &nbsp; &nbsp; 2.&nbsp; The bill may be passed and cheque forwarded at the earliest
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
   

   <table width="97%" align="center" cellpadding="0" cellspacing="0" border="1" style="border-collapse: collapse;page-break-after:always;margin-top:2% !important;">
      <tbody>
         <tr>
            <td width="100%" align="center">
               <table width="99%" align="center" cellpadding="0" cellspacing="0" border="0">
                  <tbody>
                     <tr>
                        <td height="30%" align="center">
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
                        <td align="left"><b><h1>Project No:</b>{{invoiceprint[0].projectno}}<h1>
                        </td>
                        <td align="right"><b>Dated On:</b> {{today | date : "dd-MM-yyyy"}}
                        </td>
                     </tr>
                  </tbody>
               </table>
               <br>
               <table width="95%" align="center" border="0" cellpadding="0" cellspacing="0">
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
                           &nbsp; &nbsp; &nbsp; &nbsp; Received a sum of Rs. <span style="font-size:20px;font-weight: bold;">{{finaltotal | number:2}}</span> <br><strong  style="text-decoration: underline">Rupees {{numberinwords}}</strong> from the {{invoiceprint[0].projectname}} towards the above Job Category service changes for the period from {{startdate | date : "dd-MM-yyyy"}} to {{enddate  | date : "dd-MM-yyyy"}} <br>against the bill no  {{invoiceprint[0].invoiceno}} for personnel deployed at the {{invoiceprint[0].projectname}} 
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
<!--<script>
   $('document').ready(function(){
     setTimeout(function(){ window.print(); }, 1500);
   })
   </script>-->

   <script>
   (function () {

var beforePrint = function () {
    //alert('Functionality to run before printing.');

    
};

var afterPrint = function () {
  //  alert('Functionality to run after printing');

    var controllerElement = document.querySelector('[ng-controller="ctrlPrint"]');
    angular.element(controllerElement).scope().printcompleted();
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

}());
   </script>