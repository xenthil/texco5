<script type="text/javascript"> var base_url = "<?php echo base_url()?>" </script>
<script type="text/javascript"> var api_url = "<?php echo config_item('api_url')?>" </script>
<script type="text/javascript" src="<?php echo base_url("assets/libs/jquery/3.7.1/jquery.min.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/libs/angular/1.8.2/angular.min.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/app/printemployees.js")?>"></script>
<script type="text/javascript">var types = "<?php echo $_GET['type'];?>"</script>
<script type="text/javascript">var clientid = "<?php echo $this->session->userdata('clientid');?>"</script>
<link href="<?php echo base_url("assets/css/texco.css")?>" rel="Stylesheet" type="text/css" />
<style>
@page { size: auto;  margin: 1mm; }
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
                        <span ng-show="types == 1">
                            Salaried Employees List for  {{invoiceprint.organization}}
                        </span>
                        <span ng-show="types == 2">
                            Current Salaried Employees List for  {{invoiceprint.organization}}
                        </span>
                        <br>
                     </tr>
                     <br>
                  </tbody>
               </table>
               <br>
               <table style="border-collapse: collapse;" border="1" width="99%" cellspacing="0" cellpadding="0" align="center">
                  <tbody style="font-size: 14px;">
                     <tr height="30px">
                        <td align="left" ><strong>&nbsp;S.No</strong></td>
                        <td align="left" ><strong>&nbsp;Texco No / Service No</strong></td>
                        <td align="left" ><strong>&nbsp;Employee's Name </strong></td>
                        <td align="left" ><strong>&nbsp;DOB</strong></td>
                        <td align="left" ><strong>&nbsp;Email</strong></td>
                        <td align="left" ><strong>&nbsp;Mobile No.</strong></td>
                        <td align="left" ><strong>&nbsp;Aadhar No</strong></td>
                     </tr>
                     <tr ng-repeat="x in payslip" style="font-size: 14px;">
                        <td align="center" >&nbsp;{{$index +1}}</td>
                        <td align="center" >
                           &nbsp;{{x.texcono}}&nbsp; 
                           <hr>
                           &nbsp;{{x.serviceno}}&nbsp;
                        </td>
                        <td class="capitalize">&nbsp;{{x.firstname}}&nbsp;{{x.lastname}}</td>
                        <td align="center" >&nbsp;{{x.dateofbirth}}</td>
                        <td align="right" >&nbsp;{{x.email}}&nbsp; &nbsp;</td>
                        <td align="right" >&nbsp;{{x.mobile}}&nbsp; &nbsp;</td>
                        <td align="right" >&nbsp;{{x.aadhaarno}}&nbsp; &nbsp;</td>
                     </tr>
                  </tbody>
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