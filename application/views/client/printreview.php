<script type="text/javascript"> var base_url = "<?php echo base_url()?>" </script>
<script type="text/javascript"> var api_url = "<?php echo config_item('api_url')?>" </script>
<script type="text/javascript" src="<?php echo base_url("assets/libs/jquery/3.7.1/jquery.min.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/libs/angular/1.8.2/angular.min.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/app/printreview.js")?>"></script>
<script type="text/javascript">var projectid = "<?php echo $_GET['projectid'];?>"</script>
<script type="text/javascript">var monthandyear = "<?php echo $_GET['monthandyear'];?>"</script>
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/angular-sanitize.js")?>"></script> 
<style>@page { size: auto;  margin-right: 1mm; margin-top: 2mm; margin-bottom: 1mm; margin-left:3mm; }</style> 
<script type="text/javascript"> var atoken = "<?php echo $this->session->usertoken('atoken')?>" ; </script>
<div ng-app="appPrint" ng-controller="ctrlPrint">
   <table width="100%" align="center" cellpadding="0" cellspacing="0" border="1" style="border-collapse: collapse">
      <tbody>
         <tr> 
            <td width="100%" align="center">
               <table width="99%" align="center" border="0" cellpadding="0" cellspacing="0">
                        <tbody>
                            <tr>
                                <td>
                                <br />
                                    <strong style="text-align: center;">Attendance Receipt for the month of {{client.monthandyear}}</strong>
                                 <br />
                                 <br />
                                </td>
                            </tr>
                            <tr ng-hide="client.projectno == '' || client.projectno == null">
                                <td width="100%">
                                    &nbsp; &nbsp; <span  ng-hide="client.projectno == '' || client.projectno == null" >{{client.projectno}} - {{client.projectname}}</span>

                                </td>
                            </tr>
                            <tr ng-hide="client.designation == '' || client.designation == null">
                                <td width="100%">
                                    &nbsp; &nbsp; &nbsp;{{client.designation}},
                                </td>
                            </tr>
                             <tr>
                                <td width="100%">
                                    &nbsp; &nbsp; &nbsp;<span  ng-hide="client.addressline1 == '' || client.addressline1 == null" >{{client.addressline1}}</span>
                                    <span ng-hide="client.addressline2 == '' || client.addressline2 == null">, 
                                    <br>&nbsp; &nbsp; &nbsp;{{client.addressline2}} </span>
                                    <span ng-hide="client.addressline3 == '' || client.addressline3 == null">, 
                                    <br>&nbsp; &nbsp; &nbsp;{{client.addressline3}} </span> <span ng-hide="client.pincode == '' || client.propincode == null"> - {{client.pincode}} </span>
                                </td>
                            </tr> 
                        </tbody>
                    </table>
                    <br />
                    <br />
               <table style="border-collapse: collapse;" border="1" width="99%" cellspacing="0" cellpadding="0" align="center">
                  <tbody style="font-size: 14px;">
                     <tr height="30px">
                        <td align="left" ><strong>&nbsp;S.No</strong></td>
                        <td align="left" ><strong>&nbsp;Texco</strong></td>
                        <td align="left" ><strong>&nbsp;Employee's Name</strong></td>
                        <td align="left" ><strong>&nbsp;Job Category</strong></td>
                        <td align="left" ><strong>&nbsp;1</strong></td>
                        <td align="left" ><strong>&nbsp;2</strong></td>
                        <td align="left" ><strong>&nbsp;3</strong></td>
                        <td align="left" ><strong>&nbsp;4</strong></td>
                        <td align="left" ><strong>&nbsp;5</strong></td>
                        <td align="left" ><strong>&nbsp;6</strong></td>
                        <td align="left" ><strong>&nbsp;7</strong></td>
                        <td align="left" ><strong>&nbsp;8</strong></td>
                        <td align="left" ><strong>&nbsp;9</strong></td>
                        <td align="left" ><strong>&nbsp;10</strong></td>
                        <td align="left" ><strong>&nbsp;11</strong></td>
                        <td align="left" ><strong>&nbsp;12</strong></td>
                        <td align="left" ><strong>&nbsp;13</strong></td>
                        <td align="left" ><strong>&nbsp;14</strong></td>
                        <td align="left" ><strong>&nbsp;15</strong></td>
                        <td align="left" ><strong>&nbsp;16</strong></td>
                        <td align="left" ><strong>&nbsp;17</strong></td>
                        <td align="left" ><strong>&nbsp;18</strong></td>
                        <td align="left" ><strong>&nbsp;19</strong></td>
                        <td align="left" ><strong>&nbsp;20</strong></td>
                        <td align="left" ><strong>&nbsp;21</strong></td>
                        <td align="left" ><strong>&nbsp;22</strong></td>
                        <td align="left" ><strong>&nbsp;23</strong></td>
                        <td align="left" ><strong>&nbsp;24</strong></td>
                        <td align="left" ><strong>&nbsp;25</strong></td>
                        <td align="left" ><strong>&nbsp;26</strong></td>
                        <td align="left" ><strong>&nbsp;27</strong></td>
                        <td align="left" ><strong>&nbsp;28</strong></td>
                        <td align="left" ng-show="noOfDays >= 29"><strong>&nbsp;29</strong></td>
                        <td align="left" ng-show="noOfDays >= 30"><strong>&nbsp;30</strong></td>
                        <td align="left" ng-show="noOfDays >= 31"><strong>&nbsp;31</strong></td>
                        <td align="left" ><strong>&nbsp;AD</strong></td>
                        <td align="left" ><strong>&nbsp;ED </strong></td>
                        <td align="left" ><strong>&nbsp;Total Duty </strong></td>
                        <td align="left" ><strong>&nbsp;Signature </strong></td>
                     </tr>
                     <tr ng-repeat="x in members" style="font-size: 14px;">

                        <td>&nbsp;{{$index +1}}</td>
                        <td>&nbsp;{{x.texcono}}</td>
                        <td>&nbsp;{{x.firstname}}</td>
                        <td>&nbsp;{{x.jobcode}}</td>
                        <td>&nbsp;{{x.one }}</td>
                        <td>&nbsp;{{x.two }}</td>
                        <td>&nbsp;{{x.three}}</td>
                        <td>&nbsp;{{x.four }}</td>
                        <td>&nbsp;{{x.five }}</td>
                        <td>&nbsp;{{x.six }}</td>
                        <td>&nbsp;{{x.seven }}</td>
                        <td>&nbsp;{{x.eight }}</td>
                        <td>&nbsp;{{x.nine }}</td>
                        <td>&nbsp;{{x.ten}}</td>
                        <td>&nbsp;{{x.eleven }}</td>
                        <td>&nbsp;{{x.twelve }}</td>
                        <td>&nbsp;{{x.thirteen }}</td>
                        <td>&nbsp;{{x.fourteen }}</td>
                        <td>&nbsp;{{x.fifteen }}</td>
                        <td>&nbsp;{{x.sixteen }}</td>
                        <td>&nbsp;{{x.seventeen}}</td>
                        <td>&nbsp;{{x.eighteen }}</td>
                        <td>&nbsp;{{x.nineteen }}</td>
                        <td>&nbsp;{{x.twenty }}</td>
                        <td>&nbsp;{{x.twentyone }}</td>
                        <td>&nbsp;{{x.twentytwo }}</td>
                        <td>&nbsp;{{x.twentythree }}</td>
                        <td>&nbsp;{{x.twentyfour }}</td>
                        <td>&nbsp;{{x.twentyfive }}</td>
                        <td>&nbsp;{{x.twentysix }}</td>
                        <td>&nbsp;{{x.twentyseven }}</td>
                        <td>&nbsp;{{x.twentyeight }}</td>
                        <td ng-show="noOfDays >= 29">&nbsp;{{x.twentynine }}</td>
                        <td ng-show="noOfDays >= 30">&nbsp;{{x.thirty }}</td>
                        <td ng-show="noOfDays >= 31">&nbsp;{{x.thirtyone }}</td>
                        <td>&nbsp;{{x.presentdays | number:2}}</td>
                        <td>&nbsp;<span ng-show="x.jobcode!='DVR'"> {{x.eddays | number:2}}</span> <span ng-show="x.jobcode=='DVR'"> {{x.othours/8 |  number:2}}</span> </td>
                        <td>&nbsp;<span ng-show="x.jobcode!='DVR'"> {{ (x.presentdays + x.eddays)  |  number:2}}</span> <span ng-show="x.jobcode=='DVR'"> {{(x.presentdays) + (x.othours/8) |  number:2}}</span> </td>
                        <td></td>
                     </tr>
                     <tr>
                     <td ng-show="noOfDays == 28" colspan="32"></td>
                        <td ng-show="noOfDays == 29" colspan="33"></td>
                        <td ng-show="noOfDays == 30" colspan="34"></td>
                        <td ng-show="noOfDays == 31" colspan="35"></td>
                        <td>&nbsp; {{presentdays | number:2}} </td>
                        <td>&nbsp; {{eddays | number:2}} </td>
                        <td>&nbsp; {{ (presentdays + eddays)  | number:2}} </td>
                        <td> </td>
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