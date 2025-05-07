<script type="text/javascript"> var base_url = "<?php echo base_url()?>" </script>
<script type="text/javascript"> var api_url = "<?php echo config_item('api_url')?>" </script>
<script type="text/javascript" src="<?php echo base_url("assets/libs/jquery/3.7.1/jquery.min.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/libs/angular/1.8.2/angular.min.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/app/printpayslip.js")?>"></script>
<script type="text/javascript">var projectid = "<?php echo $_GET['projectid'];?>"</script>
<script type="text/javascript">var monthandyear = "<?php echo $_GET['monthandyear'];?>"</script>
<script type="text/javascript">var payslipno = "<?php echo $_GET['payslipno']; ?>"</script>

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
<div ng-app="appPrint" ng-controller="ctrlPrint">
   <table width="97%" align="center" cellpadding="0" cellspacing="0" border="1" style="border-collapse: collapse">
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
               <table width="95%" align="center" border="0" cellpadding="0" cellspacing="0">
                  <tbody>
                     <tr>
                     <div ng-init="type=2"></div>
                     <div ng-show="invoiceprint.pfprintcount>0"> Duplicate Copy</div>
                         <div ng-show="invoiceprint.pfprintcount==0">Original Copy</div>
                        RESERVE FUND STATEMENT TO TEXCO WORKERS IN THE PROJECT OF {{invoiceprint.projectname}} FOR THE MONTH OF {{invoiceprint.monthandyear}}
                        <br>
                     </tr>
                     <br>
                        <td>
                           <strong>Project No : </strong>{{invoiceprint.projectno}}
                           <br>
                           <strong>Date of Recp : </strong><?php echo  date("d-m-Y");?>
                        </td>
                     </tr>
                  </tbody>
               </table>
               <br>
               <table style="border-collapse: collapse;" border="1" width="97%" cellspacing="0" cellpadding="0" align="center">
                  <thead style="font-size: 14px;" class="report-header">
                     <tr height="30px">
                        <td align="left" ><strong>&nbsp;S.No</strong></td>
                        <td align="left" ><strong>&nbsp;TEXCO/ UAN No</strong></td>
                        <td align="left" ><strong>&nbsp;EMPLOYEE'S Name</strong></td>
                        <td align="left" ><strong>&nbsp;DESIGNATION</strong></td>
                        <td align="left" ><strong>&nbsp;DAYS WORKED</strong></td>
                        <td align="left" ><strong>&nbsp;BASIC Pay</strong></td>
                        <td align="left" ><strong>&nbsp;EMPLOYER PF 12 %</strong></td>
                        <td align="left" ><strong>&nbsp;EMPLOYEE PF 12 %</strong></td>
                     </tr>
                  </thead>
                  <tbody>
                     <tr ng-repeat="x in payslip" style="font-size: 14px;">
                        <td style="text-align: center;">&nbsp;{{$index +1}}</td>
                        <td align="center">
                           &nbsp;{{x.texcono}}&nbsp; 
                           <hr>
                           {{x.uanno}}&nbsp;
                        </td>
                       <!--  <td>&nbsp;{{x.uanno}}</td> -->
                        <td class="capitalize">&nbsp;{{x.firstname}}</td>
                        <td style="text-align: center;">&nbsp;{{x.jobcode}}</td>
                        <td align="center">&nbsp;{{x.presentdays}}</td>
                        <td align="right">&nbsp;{{x.basic | number:2}}&nbsp;&nbsp;</td>
                        <td align="right">&nbsp;{{x.epf | number:2}} &nbsp;&nbsp;</td>
                        <td align="right">&nbsp;{{x.epf | number:2}} &nbsp;&nbsp;</td>
                     </tr>
                     <tr>
                        <td style="text-align: center;" colspan="4">Total</td>
                        <td align="center"><b>&nbsp;{{presentdays}}&nbsp;&nbsp;</b></td>
                        <td align="right"><b>&nbsp;{{basic | number:2}}&nbsp;&nbsp;</b></td>
                        <td align="right"><b>&nbsp;{{epf | number:2}}&nbsp;&nbsp;</b></td>
                        <td align="right"><b>&nbsp;{{epf | number:2}}&nbsp;&nbsp;</b></td>
                     </tr>
                  </tbody>
               </table>
               <br>
               <table>
                  <tr>
                     <td>
                        GRAND TOTAL : Rs. {{epf | number:2}}
                     </td>
                  </tr>
               </table>
               <br>
               <span style="padding-right: 900px;">*** Computer-generated document, Signature is Not required.</span>
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