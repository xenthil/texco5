<script type="text/javascript"> var base_url = "<?php echo base_url()?>" </script>
<script type="text/javascript"> var api_url = "<?php echo config_item('api_url')?>" </script>
<script type="text/javascript" src="<?php echo base_url("assets/libs/jquery/3.7.1/jquery.min.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/libs/angular/1.8.2/angular.min.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/app/clientattendnace.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/angular-sanitize.js")?>"></script> 
<style>@page { size: auto;  margin-right: 1mm; margin-top: 2mm; margin-bottom: 1mm; margin-left:3mm; }</style>
<div ng-app="appPrint" ng-controller="ctrlPrint" ng-cloak>
   <table ng-repeat="jobs in jobprint.applied" width="90%" align="center" cellpadding="0" cellspacing="0" style="border-collapse: collapse">
      <tbody>
         <tr>
            <td width="100%" align="center">
               <table width="99%" align="center" border="0" cellpadding="0" cellspacing="0">
                  <tbody style="text-align: justify;">
                     <tr>
                        <td>
                           <h6> Project No/Name - <strong> {{selectedprojects[0].projectno}}/{{selectedprojects[0].name}} </strong></h6>
                           <h6>  Attendance For the period - <strong> {{objattendance.monthandyear}}</strong></h6>
                           <h6> Attendance Date - <strong> <?php echo date("d-m-Y") . "<br>";?> </strong></h6>
                        </td>
                     </tr>
                  </tbody>
               </table>
               <table width="99%" align="center" cellpadding="0" cellspacing="2" border="0">
                  <tbody style="text-align: justify;">
                     <tr>
                        <td valign="top" width="100%" style="padding-top: 25px;">
                           <table style="border-collapse: collapse;" border="1" width="99%" cellspacing="0" cellpadding="0" align="center">
                              <tbody style="font-size: 14px;">
                                 <tr height="30px">
                                    <td align="left" width="5%"><strong>&nbsp;S.No</strong></td>
                                    <td align="left" width="12%"><strong>&nbsp;Name</strong></td>
                                    <td align="left" width="12%"><strong>&nbsp;Texco No</strong></td>
                                    <td align="left" width="6%"><strong>&nbsp;Category</strong></td>
                                    <td align="left" width="45%"><strong>&nbsp;AD</strong></td>
                                    <td align="left" width="45%"><strong>&nbsp;ED1</strong></td>
                                    <td align="left" width="45%"><strong>&nbsp;ED2</strong></td>
                                    <td align="left" width="45%"><strong>&nbsp;ED2</strong></td>
                                 </tr>
                                 <tr ng-repeat="l in summaryatt" style="font-size: 14px;">
                                    <td width="5%">&nbsp;{{$index +1}}</td>
                                    <td width="5%">&nbsp;{{l.firstname}}</td>
                                    <td width="5%">&nbsp;{{l.texcono}}</td>
                                    <td width="15%">&nbsp;{{l.jobcode}}</td>
                                    <td width="15%">&nbsp;{{l.pdays}}</td>
                                    <td width="15%">&nbsp;{{l.od1Items}}</td>
                                    <td width="15%">&nbsp;{{l.od2Items}}</td>
                                    <td width="15%">&nbsp;{{ l.pdays + l.od1Items + l.od2Items }}</td>
                                 </tr>
                                 <tr>
                                    <td style="text-align: center;padding-left: 228px;" colspan="4">
                                       Total
                                    </td>
                                    <td style="padding-left:25px">
                                       <b><span id="addays"></span></b>
                                    </td>
                                    <td style="padding-left:25px">
                                       <b><span id="ed1days"></span></b>
                                    </td>
                                    <td style="padding-left:25px">
                                       <b><span id="ed2days"></span></b>
                                    </td>
                                    <td style="padding-left:25px">
                                       <b><span id="ttdays"></span></b>
                                    </td>
                                 </tr>
                              </tbody>
                           </table>
                           <h5>Total No of Employees - <span id="empcount"></span></h5>
                           <h5>Total No of Attendance Duty - <span id="tttdays"></span> Days</h5>
                        </td>
                     </tr>
                  </tbody>
               </table>
            </td>
         </tr>
      </tbody>
   </table>
</div>
<script>
   $('document').ready(function(){
     setTimeout(function(){ window.print(); }, 500);
   })
</script>