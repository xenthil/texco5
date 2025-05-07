<script type="text/javascript" src="
   <?php echo base_url("assets/js/app/editclientattendance.js")?>"></script>
<link rel="stylesheet" type="text/css" href="
   <?php echo base_url("assets/css/ng-table.min.css")?>" />
<script type="text/javascript" src="
   <?php echo base_url("assets/js/lib/ng-table.min.js")?>"></script>
<script type="text/javascript" src="
   <?php echo base_url("assets/js/lib/ui-bootstrap-tpls-0.11.0.js")?>"></script>
<script src="
   <?php echo base_url("assets/js/lib/angular-bootstrap-datepicker.js")?>" charset="utf-8"></script>
<link href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery-ui.css" rel="Stylesheet" type="text/css" />
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.9.1/underscore-min.js"></script>
<link href="
   <?php echo base_url("assets/css/datepicker.css")?>" rel="Stylesheet" type="text/css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.8.1/xlsx.full.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/2.6.0/jszip.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.11.2/moment.min.js"></script>
<script type="text/javascript">
   var clientid = <?php echo $clientid;?>;
</script>
<div class="parallax-container" style="background-color: rgba(0, 12, 78, 0.9)">
   <div class="row">
      <div class="container">
         <div class="col s12 m6 l6">
            <div class="pagebannertext white-text">Attendance
            </div>
         </div>
         <div class="col s12 m6 l6 right-align">
            <div class="dumheight hide-on-small-only"></div>
            <div class="">
               <a href="
                  <?php echo base_url('client/dashboard')?>" class="breadcrumb">Home
               </a>
               <span class="breadcrumb">Edit Attendance
               </span>
            </div>
         </div>
      </div>
   </div>
   <div class="parallax">
      <img src="
         <?php echo base_url("assets/images/breadcrumbbanner.jpg ")?>">
   </div>
</div>
<div id="attendance" class="row" ng-app="appadminattendance">
<div class="container" ng-controller="ctrladminattendance">
   <div ng-if="loading">
      <center>
         <h3>Loading</h3>
         <img src="<?php echo base_url("assets/images/loader.gif"); ?>" alt="Attendance Loading" />
      </center>
   </div>
   <div id="modal1" class="modal modal-fixed-footer">
      <div class="modal-content">
         <nav class="blue" style="position: fixed;margin-top: 0px; z-index:999;">
            <div class="left col s1 m1 l1">
               <div class="white-text"><a href=""><i class="modal-action modal-close mdi white-text mdi-arrow-left"></i></a> </div>
            </div>
            <div class="col s11 m11 l11">
               <div class="li white-text" id="mcaption">Attendance Summary</div>
            </div>
         </nav>
         <div class="row" style="padding: 60px;">
            <h6> Project No/Name - <strong> {{objattendance.projectno}}/{{objattendance.projectname}} </strong></h6>
            <h6> Attendance For the period - <strong> {{objattendance.monthandyear}}</strong></h6>
            <h6> Attendance Date - <strong> <?php echo date("d-m-Y") . "<br>";?> </strong></h6>
            <table ng-table="tableParams1" class="responsive-table highlight striped" show-filter="true" class="bordered" >
               <tr ng-repeat="l in $data">
                  <td data-title="'S.No'">{{$index + 1}}</td>
                  <td style="padding-left:25px" width="30%"  data-title="'Name'" filter="{firstname: 'text'}">{{l.firstname}}</td>
                  <td style="padding-left:25px" width="12%"  data-title="'Texco No'" filter="{texcono: 'text'}">{{l.texcono}}</td>
                  <td style="padding-left:25px" width="10%"  data-title="'Category'" filter="{jobcode: 'text'}">{{l.jobcode}}</td>
                  <td style="padding-left:25px" width="10%"  data-title="'AD'">{{l.pdays}}</td>
                  <td style="padding-left:25px" width="10%"  data-title="'ED 1'" >{{l.od1Itemss | number : 2}}</td>
                  <td style="padding-left:25px" width="10%"  data-title="'ED 2'" >{{l.od2Itemss | number : 2}}</td>
                  <td style="padding-left:25px" width="15%"  data-title="'Total Duties'">{{ l.pdays + l.od1Itemss + l.od2Itemss | number : 2}}</td>
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
            </table>
            <h5>Total No of Employees - <span id="empcount"></span></h5>
            <h5>Total No of Present Days - <span id="adday"></span> Days</h5>
            <h5>Total No of ED 1 - <span id="ed1day"></span> Days</h5>
            <h5>Total No of ED 2 - <span id="ed2day"></span> Days</h5>
            <h5>Total No of Attendance Duty - <span id="tttdays"></span> Days</h5>
         </div>
      </div> 
      <div class="modal-footer">
         <button class="modal-action waves-effect waves-green btn-flat" type="submit" ng-click="saveattendance(objattendance,selectedMembers,savetype)" ng-disabled="isSubmitDisabled">
         Save
         </button> 
         <a href="" class="modal-action modal-close waves-effect btn-flat ">Cancel</a>
      </div>
      </form>
   </div>
   <div id="" class="section" ng-hide="loading">
      <div class="row">
         <div id="Client-details" class="col s12">
            <div class="email-content-wrap">
               <div class="row">
                  <form id="attendanceform" ng-submit="attendanceform.$valid"  name="attendanceform" novalidate>
                     <div class="row">
                        <div class="input-field col s12 l2">
                           <select id="projectno" name="projectno" class="validate" ng-class="{'submitted': submitted && attendanceform.projectno.$invalid}" ng-model="objattendance.projectid"
                              data-ng-options=" p.projectid as p.projectno for p in projectnos"
                              ng-change="fillclientproject(objattendance.projectid)" ></select>
                           <label for="projectno" style="top: 0rem !important;">Project No</label>
                        </div>
                        <!-- <div class="input-field col s12 l4"><select id="client" name="client" class="validate"  ng-required="true"  ng-class="{'submitted': submitted && jobpostingform.client.$invalid}" ng-model="objattendance.clientid" data-ng-options=" c.clientid as c.organization for c in clients" ng-change="selectProject(objattendance.clientid)"></select><label for="client">Client</label></div> -->
                        <!-- <div class="input-field col s12 l4"><select id="client" name="client" class="validate"  ng-required="true"  ng-class="{'submitted': submitted && attendanceform.project.$invalid}"  ng-model="objattendance.clientid" data-ng-options="p.clientid as p.organization for p in clients" ng-change="getprojects(objattendance.clientid)"></select><label for="project">Client
                           </label></div> -->
                        <div class="input-field col s12 l4">
                           <input id="clientdesc" readonly ng-model="objattendance.projectname">
                           <label for="project" class="active">Project</label>
                        </div>
                        <!-- <div class="input-field col s12 l4">
                           <select id="project" name="project" class="validate"  ng-required="true"  ng-class="{'submitted': submitted && attendanceform.project.$invalid}"  ng-model="objattendance.projectid" data-ng-options=" p.projectid as p.name for p in selectedprojects" ng-change="monthclear()"></select>
                           <label for="project">Project
                           </label>
                        </div> -->
                        <div class="input-field col s6 l2">
                           <label for="fromdate">Select Month :
                           </label>
                           <input name="month_year" id="month_year" class="month_year" type="text" ng-model="objattendance.monthandyear" ng-change="editattendance(objattendance.monthandyear,objattendance.clientid,objattendance.projectid)" autocomplete="off"/>
                        </div>
                         <div class="input-field col s6 l2">
                          <!--  <label for="fromdate">Select checkbox :
                           </label> -->
                           <input name="month_year" id="month_year" class="month_year" type="checkbox" ng-model="objattendance.checkyear" ng-change="editattendance(objattendance.monthandyear,objattendance.clientid,objattendance.projectid)"/>
                        </div>
                        <div class="col s12">
                           <table ng-table="tableParams" class="responsive-table highlight striped" show-filter="true" class="bordered" >
                              <tr ng-repeat="l in $data" ng-if="l.jobcode != 'DVR'">
                                 <td width="10%"  data-title="'Select'"  header="'ng-table/headers/checkbox.html'" > &nbsp;&nbsp;&nbsp;
                                    <input type="checkbox" name="selectattendance" id="{{l.memberid}}select{{$index}}" class="filled-in selectattendance"  ng-checked="model.SelectItems==1 || l.selectattendance==1" ng-true-value="1" ng-false-value="0" ng-model="l.selectattendance" ng-change="changeFunction(members)"/>
                                    <label for="{{l.memberid}}select{{$index}}"></label>
                                 </td>
                                 <td width="17%"  data-title="'Name'" filter="{firstname: 'text'}">{{l.firstname}}</td>
                                 <td width="7%"  data-title="'Texco No'" filter="{texcono : 'text'}">{{l.texcono}}</td>
                                 <td width="5%"  data-title="'Category'" filter="{jobcode: 'text'}">{{l.jobcode }}{{l.select}}</td>
                               <!-- <td width="5%"  data-title="'Unselect'" >  <input type="checkbox" name="unselect" id="{{l.memberid}}111" class="filled-in"  ng-checked="l.unselect == 1" ng-true-value="1" ng-false-value="0" ng-model="l.unselect" /></td> -->
                                 <td data-title="'Duty'" width="15%" style="padding-left: 40px;padding-top: 0px;">
                                    <input style="margin: -8px 0px -16px 0;
                                       border-bottom:none" type="text" value="AD" readonly="" />
                                    <input style="margin: -3px 0px -16px 0;
                                       border-bottom:none" type="text" value="ED 1" readonly="" />
                                    <input style="margin: -3px 0px -16px 0;
                                       border-bottom:none" type="text" value="ED 2" readonly="" />
                                    <label for="{{l.memberid}}"></label>
                                 </td>
                                 <td data-title="" width="15%" style="padding-left: 40px;padding-top: 13px;">
                                    <input type="checkbox" name="adselect" id="{{l.memberid}}adselect{{$index}}" class="filled-in adselect"  ng-checked="l.adselect==1" ng-true-value="1" ng-false-value="0" ng-model="l.adselect" ng-change="adSelectChange(members,l.adselect,l.memberid)"/>
                                    <label for="{{l.memberid}}adselect{{$index}}"></label>

                                    <input type="checkbox" name="ed1select" id="{{l.memberid}}ed1select{{$index}}" class="filled-in ed1select"  ng-checked="l.ed1select==1" ng-true-value="1" ng-false-value="0" ng-model="l.ed1select" ng-disabled="l.adselect == 0" ng-change="ed1SelectChange(members,l.ed1select,l.memberid)"/>
                                    <label for="{{l.memberid}}ed1select{{$index}}"></label>

                                    <input type="checkbox" name="ed2select" id="{{l.memberid}}ed2select{{$index}}" class="filled-in ed2select"  ng-checked="l.ed2select==1" ng-true-value="1" ng-false-value="0" ng-model="l.ed2select" ng-disabled="l.adselect == 0" ng-change="ed2SelectChange(members,l.ed2select,l.memberid)"/>
                                    <label for="{{l.memberid}}ed2select{{$index}}"></label>
                                 </td> 
                                 <td   class="hovering" data-title="'1'">
                                 <span class="tooltiptext"> 1</span>
                                    <input type="checkbox" name="present" id="{{l.memberid}}1" class="filled-in"  ng-checked="l.adselect == 1 && l.one==1" ng-true-value="1" ng-false-value="0" ng-model="l.one" ng-change="changeFunction(members)"/>
                                    <label for="{{l.memberid}}1" ng-disabled="l.selectattendance == 0"></label>
                                    <input type="checkbox" name="od" id="{{l.memberid}}2" ng-disabled="l.one == 0" class="filled-in" ng-true-value="1" ng-false-value="0" ng-model="l.od1one" ng-checked="l.ed1select==1 || l.od1one==1" ng-change="changeFunction(members)"/>
                                    <label for="{{l.memberid}}2"></label>
                                    <input type="checkbox" name="od" id="{{l.memberid}}3" ng-disabled="l.one == 0" class="filled-in" ng-true-value=".5" ng-false-value="0" ng-model="l.od2one" ng-checked="l.od2one ==.5  || l.ed2select==1" ng-change="changeFunction(members)"/>
                                    <label for="{{l.memberid}}3"></label>
                                 </td>
                                 <td  class="hovering"  data-title="'2'">
                                 <span class="tooltiptext"> 2</span>
                                    <input type="checkbox" name="present" id="{{l.memberid}}4" class="filled-in"  ng-checked="l.adselect == 1 && l.two == 1" ng-true-value="1" ng-false-value="0" ng-model="l.two" ng-change="changeFunction(members)"/>
                                    <label for="{{l.memberid}}4"></label>
                                    <input type="checkbox" name="od" id="{{l.memberid}}5"  ng-disabled="l.two == 0" class="filled-in" ng-checked="l.od1two == 1 || l.ed1select==1" ng-true-value="1" ng-false-value="0" ng-model="l.od1two" ng-change="changeFunction(members)"/>
                                    <label for="{{l.memberid}}5"></label>
                                    <input type="checkbox" name="od" id="{{l.memberid}}6" ng-disabled="l.two == 0" class="filled-in" ng-checked="l.od2two == .5  || l.ed2select==1" ng-true-value=".5" ng-false-value="0" ng-model="l.od2two" ng-change="changeFunction(members)"/>
                                    <label for="{{l.memberid}}6"></label>
                                 </td>
                                 <td  class="hovering" data-title="'3'">
                                 <span class="tooltiptext"> 3</span>
                                    <input type="checkbox" name="present" id="{{l.memberid}}7"  class="filled-in"   ng-checked="l.adselect == 1 && l.three == 1" ng-true-value="1" ng-false-value="0" ng-model="l.three" ng-change="changeFunction(members)"/>
                                    <label for="{{l.memberid}}7"></label>
                                    <input type="checkbox" name="od" id="{{l.memberid}}8"  ng-disabled="l.three == 0" class="filled-in" ng-true-value="1" ng-false-value="0" ng-model="l.od1three" ng-change="changeFunction(members)"  ng-checked="l.ed1select==1 || l.od1three == 1"/>
                                    <label for="{{l.memberid}}8"></label>
                                    <input type="checkbox" name="od" id="{{l.memberid}}9" ng-disabled="l.three == 0" class="filled-in" ng-true-value=".5" ng-false-value="0" ng-model="l.od2three" ng-change="changeFunction(members)" ng-checked="l.od2three == .5  || l.ed2select==1" />
                                    <label for="{{l.memberid}}9"></label>
                                 </td>
                                 <td  class="hovering" data-title="'4'">
                                 <span class="tooltiptext"> 4</span>
                                    <input type="checkbox" name="present" id="{{l.memberid}}10"  class="filled-in"  ng-checked="l.adselect == 1 && l.four == 1" ng-true-value="1" ng-false-value="0" ng-model="l.four" ng-change="changeFunction(members)"/>
                                    <label for="{{l.memberid}}10"></label>
                                    <input type="checkbox" name="od" id="{{l.memberid}}11"  ng-disabled="l.four == 0" class="filled-in" ng-checked="l.ed1select==1 || l.od1four == 1" ng-true-value="1" ng-false-value="0" ng-model="l.od1four" ng-change="changeFunction(members)"/>
                                    <label for="{{l.memberid}}11"></label>
                                    <input type="checkbox" name="od" id="{{l.memberid}}12" ng-disabled="l.four == 0" class="filled-in" ng-checked="l.od2four == .5 || l.ed2select==1" ng-true-value=".5" ng-false-value="0"  ng-model="l.od2four" ng-change="changeFunction(members)"/>
                                    <label for="{{l.memberid}}12"></label>
                                 </td>
                                 <td  class="hovering" data-title="'5'">
                                 <span class="tooltiptext"> 5</span>
                                    <input type="checkbox" name="present" id="{{l.memberid}}13" class="filled-in" ng-checked="l.five == 1 && l.adselect == 1" name="present" ng-true-value="1" ng-false-value="0" ng-model="l.five"  ng-change="changeFunction(members)"/>
                                    <label for="{{l.memberid}}13"></label>
                                    <input type="checkbox" name="od" id="{{l.memberid}}14"  ng-disabled="l.five == 0" class="filled-in" ng-checked="l.od1five == 1 || l.ed1select == 1" ng-true-value="1" ng-false-value="0" ng-model="l.od1five"  ng-change="changeFunction(members)"/>
                                    <label for="{{l.memberid}}14"></label>
                                    <input type="checkbox" name="od" id="{{l.memberid}}15" ng-disabled="l.five == 0" class="filled-in" ng-checked="l.od2five == .5 || l.ed2select==1" ng-true-value=".5" ng-false-value="0" ng-model="l.od2five" ng-change="changeFunction(members)"/>
                                    <label for="{{l.memberid}}15"></label>
                                 </td>
                                 <td  class="hovering" data-title="'6'">
                                 <span class="tooltiptext"> 6</span>
                                    <input type="checkbox" name="present" id="{{l.memberid}}16" class="filled-in" ng-checked="l.six == 1 && l.adselect == 1" ng-true-value="1" ng-false-value="0" ng-model="l.six"  ng-change="changeFunction(members)"/>
                                    <label for="{{l.memberid}}16"></label>
                                    <input type="checkbox" id="{{l.memberid}}17" ng-disabled="l.six == 0" class="filled-in" ng-checked="l.od1six == 1 || l.ed1select==1" ng-true-value="1" ng-false-value="0" ng-model="l.od1six"  ng-change="changeFunction(members)"/>
                                    <label for="{{l.memberid}}17"></label>
                                    <input type="checkbox" id="{{l.memberid}}18" ng-disabled="l.six == 0" class="filled-in" ng-checked="l.od2six == .5  || l.ed2select==1" ng-true-value=".5" ng-false-value="0" ng-model="l.od2six"  ng-change="changeFunction(members)"/>
                                    <label for="{{l.memberid}}18"></label>
                                 </td>
                                 <td  class="hovering" data-title="'7'">
                                 <span class="tooltiptext"> 7</span>
                                    <input type="checkbox" name="present" id="{{l.memberid}}19" class="filled-in" ng-checked="l.seven == 1 && l.adselect == 1" ng-true-value="1" ng-false-value="0" ng-model="l.seven"  ng-change="changeFunction(members)"/>
                                    <label for="{{l.memberid}}19"></label>
                                    <input type="checkbox" id="{{l.memberid}}20" ng-disabled="l.seven == 0" class="filled-in" ng-true-value="1" ng-false-value="0" ng-model="l.od1seven"  ng-change="changeFunction(members)"  ng-checked="l.od1seven == 1 || l.ed1select == 1"/>
                                    <label for="{{l.memberid}}20"></label>
                                    <input type="checkbox" id="{{l.memberid}}21" ng-disabled="l.seven == 0" class="filled-in" ng-checked="l.od2seven == .5  || l.ed2select==1" ng-true-value=".5" ng-false-value="0" ng-model="l.od2seven"  ng-change="changeFunction(members)"/>
                                    <label for="{{l.memberid}}21"></label>
                                 </td>
                                 <td  class="hovering" data-title="'8'">
                                 <span class="tooltiptext"> 8</span>
                                    <input type="checkbox" name="present" id="{{l.memberid}}22" class="filled-in"  ng-checked="l.eight == 1 && l.adselect == 1" ng-true-value="1" ng-false-value="0" ng-model="l.eight"  ng-change="changeFunction(members)"/>
                                    <label for="{{l.memberid}}22"></label>
                                    <input type="checkbox" id="{{l.memberid}}23" ng-disabled="l.eight == 0" class="filled-in" ng-checked="l.od1eight == 1 || l.ed1select==1" ng-true-value="1" ng-false-value="0" ng-model="l.od1eight"  ng-change="changeFunction(members)"/>
                                    <label for="{{l.memberid}}23"></label>
                                    <input type="checkbox" id="{{l.memberid}}24" ng-disabled="l.eight == 0 " class="filled-in" ng-checked="l.od2eight == .5  || l.ed2select==1" ng-true-value=".5" ng-false-value="0" ng-model="l.od2eight"  ng-change="changeFunction(members)"/>
                                    <label for="{{l.memberid}}24"></label>
                                 </td>
                                 <td  class="hovering" data-title="'9'">
                                 <span class="tooltiptext"> 9</span>
                                    <input type="checkbox" name="present" id="{{l.memberid}}25" class="filled-in" ng-checked="l.nine == 1 && l.adselect == 1" ng-true-value="1" ng-false-value="0" ng-model="l.nine"  ng-change="changeFunction(members)"/>
                                    <label for="{{l.memberid}}25"></label>
                                    <input type="checkbox" id="{{l.memberid}}26" ng-disabled="l.nine == 0" class="filled-in" ng-checked="l.od1nine == 1 || l.ed1select==1" ng-true-value="1" ng-false-value="0" ng-model="l.od1nine"  ng-change="changeFunction(members)"/>
                                    <label for="{{l.memberid}}26"></label>
                                    <input type="checkbox" id="{{l.memberid}}27" ng-disabled="l.nine == 0" class="filled-in" ng-checked="l.od2nine == .5 || l.ed2select==1" ng-true-value=".5" ng-false-value="0" ng-model="l.od2nine"  ng-change="changeFunction(members)"/>
                                    <label for="{{l.memberid}}27"></label>
                                 </td>
                                 <td  class="hovering" data-title="'10'">
                                 <span class="tooltiptext"> 10</span>
                                    <input type="checkbox" name="present" id="{{l.memberid}}28" class="filled-in" ng-checked="l.ten == 1 && l.adselect == 1" ng-true-value="1" ng-false-value="0" ng-model="l.ten"  ng-change="changeFunction(members)"/>
                                    <label for="{{l.memberid}}28"></label>
                                    <input type="checkbox" id="{{l.memberid}}29" ng-disabled="l.ten == 0" class="filled-in" ng-checked="l.od1ten == 1 || l.ed1select==1" ng-true-value="1" ng-false-value="0" ng-model="l.od1ten"  ng-change="changeFunction(members)"/>
                                    <label for="{{l.memberid}}29"></label>
                                    <input type="checkbox" id="{{l.memberid}}30" ng-disabled="l.ten == 0 " class="filled-in" ng-checked="l.od2ten == .5 || l.ed2select==1" ng-true-value=".5" ng-false-value="0" ng-model="l.od2ten"  ng-change="changeFunction(members)"/>
                                    <label for="{{l.memberid}}30"></label>
                                 </td>
                                 <td  class="hovering" data-title="'11'">
                                 <span class="tooltiptext"> 11</span>
                                    <input type="checkbox" name="present" id="{{l.memberid}}31" class="filled-in" ng-checked="l.eleven == 1 && l.adselect == 1" ng-true-value="1" ng-false-value="0" ng-model="l.eleven"  ng-change="changeFunction(members)"/>
                                    <label for="{{l.memberid}}31"></label>
                                    <input type="checkbox" id="{{l.memberid}}32" ng-disabled="l.eleven == 0" class="filled-in" ng-checked="l.od1eleven == 1 || l.ed1select == 1" ng-true-value="1" ng-false-value="0" ng-model="l.od1eleven"  ng-change="changeFunction(members)"/>
                                    <label for="{{l.memberid}}32"></label>
                                    <input type="checkbox" id="{{l.memberid}}33" ng-disabled="l.eleven == 0" class="filled-in" ng-checked="l.od2eleven == .5 || l.ed2select==1" ng-true-value=".5" ng-false-value="0" ng-model="l.od2eleven"  ng-change="changeFunction(members)"/>
                                    <label for="{{l.memberid}}33"></label>
                                 </td>
                                 <td   class="hovering" data-title="'12'">
                                 <span class="tooltiptext"> 12</span>
                                    <input type="checkbox" name="present" id="{{l.memberid}}34" class="filled-in" ng-checked="l.twelve == 1 && l.adselect == 1" ng-true-value="1" ng-false-value="0" ng-model="l.twelve"  ng-change="changeFunction(members)"/>
                                    <label for="{{l.memberid}}34"></label>
                                    <input type="checkbox" id="{{l.memberid}}35" ng-disabled="l.twelve == 0" class="filled-in" ng-checked="l.od1twelve == 1 || l.ed1select==1" ng-true-value="1" ng-false-value="0" ng-model="l.od1twelve" ng-change="changeFunction(members)"/>
                                    <label for="{{l.memberid}}35"></label>
                                    <input type="checkbox" id="{{l.memberid}}36" ng-disabled="l.twelve == 0" class="filled-in" ng-checked="l.od2twelve == .5 || l.ed2select==1" ng-true-value=".5" ng-false-value="0" ng-model="l.od2twelve" ng-change="changeFunction(members)"/>
                                    <label for="{{l.memberid}}36"></label>
                                 </td>
                                 <td  class="hovering" data-title="'13'">
                                 <span class="tooltiptext"> 13</span>
                                    <input type="checkbox" name="present" id="{{l.memberid}}37" class="filled-in" ng-checked="l.thirteen == 1 && l.adselect == 1" ng-true-value="1" ng-false-value="0" ng-model="l.thirteen"  ng-change="changeFunction(members)"/>
                                    <label for="{{l.memberid}}37"></label>
                                    <input type="checkbox" id="{{l.memberid}}38" ng-disabled="l.thirteen == 0" class="filled-in" ng-checked="l.od1thirteen == 1 || l.ed1select==1" ng-true-value="1" ng-false-value="0" ng-model="l.od1thirteen"  ng-change="changeFunction(members)"/>
                                    <label for="{{l.memberid}}38"></label>
                                    <input type="checkbox" id="{{l.memberid}}39" ng-disabled="l.thirteen == 0" class="filled-in" ng-checked="l.od2thirteen == .5 || l.ed2select==1" ng-true-value=".5" ng-false-value="0" ng-model="l.od2thirteen"  ng-change="changeFunction(members)"/>
                                    <label for="{{l.memberid}}39"></label>
                                 </td>
                                 <td  class="hovering" data-title="'14'">
                                 <span class="tooltiptext"> 14</span>
                                    <input type="checkbox" name="present" id="{{l.memberid}}40" class="filled-in" ng-checked="l.fourteen == 1 && l.adselect == 1" ng-true-value="1" ng-false-value="0" ng-model="l.fourteen"  ng-change="changeFunction(members)"/>
                                    <label for="{{l.memberid}}40"></label>
                                    <input type="checkbox" id="{{l.memberid}}41" ng-disabled="l.fourteen == 0" class="filled-in" ng-checked="l.od1fourteen == 1 || l.ed1select==1" ng-true-value="1" ng-false-value="0" ng-model="l.od1fourteen"  ng-change="changeFunction(members)"/>
                                    <label for="{{l.memberid}}41"></label>
                                    <input type="checkbox" id="{{l.memberid}}42" ng-disabled="l.fourteen == 0" class="filled-in" ng-checked="l.od2fourteen == .5 || l.ed2select==1" ng-true-value=".5" ng-false-value="0" ng-model="l.od2fourteen"  ng-change="changeFunction(members)"/>
                                    <label for="{{l.memberid}}42"></label>
                                 </td>
                                 <td  class="hovering" data-title="'15'">
                                 <span class="tooltiptext"> 15</span>
                                    <input type="checkbox" name="present" id="{{l.memberid}}43" class="filled-in" ng-checked="l.fifteen == 1 && l.adselect == 1" ng-true-value="1" ng-false-value="0" ng-model="l.fifteen"  ng-change="changeFunction(members)"/>
                                    <label for="{{l.memberid}}43"></label>
                                    <input type="checkbox" id="{{l.memberid}}44" ng-disabled="l.fifteen == 0" class="filled-in" ng-checked="l.od1fifteen == 1 || l.ed1select==1" ng-true-value="1" ng-false-value="0" ng-model="l.od1fifteen"  ng-change="changeFunction(members)"/>
                                    <label for="{{l.memberid}}44"></label>
                                    <input type="checkbox" id="{{l.memberid}}45" ng-disabled="l.fifteen == 0" class="filled-in" ng-checked="l.od2fifteen == .5 || l.ed2select==1" ng-true-value=".5" ng-false-value="0" ng-model="l.od2fifteen"  ng-change="changeFunction(members)"/>
                                    <label for="{{l.memberid}}45"></label>
                                 </td>
                                 <td  class="hovering"  data-title="'16'">
                                 <span class="tooltiptext"> 16</span>
                                    <input type="checkbox" name="present" id="{{l.memberid}}46" class="filled-in" ng-checked="l.sixteen == 1 && l.adselect == 1" ng-true-value="1" ng-false-value="0" ng-model="l.sixteen"  ng-change="changeFunction(members)"/>
                                    <label for="{{l.memberid}}46"></label>
                                    <input type="checkbox" id="{{l.memberid}}47" ng-disabled="l.sixteen == 0" class="filled-in" ng-checked="l.od1sixteen == 1 || l.ed1select==1" ng-true-value="1" ng-false-value="0" ng-model="l.od1sixteen"  ng-change="changeFunction(members)"/>
                                    <label for="{{l.memberid}}47"></label>
                                    <input type="checkbox" id="{{l.memberid}}48" ng-disabled="l.sixteen == 0" class="filled-in" ng-checked="l.od2sixteen == .5 || l.ed2select==1" ng-true-value=".5" ng-false-value="0" ng-model="l.od2sixteen"  ng-change="changeFunction(members)"/>
                                    <label for="{{l.memberid}}48"></label>
                                 </td>
                                 <td  class="hovering" data-title="'17'">
                                 <span class="tooltiptext"> 17</span>
                                    <input type="checkbox" name="present" id="{{l.memberid}}49" class="filled-in" ng-checked="l.seventeen == 1 && l.adselect == 1" ng-true-value="1" ng-false-value="0" ng-model="l.seventeen"  ng-change="changeFunction(members)"/>
                                    <label for="{{l.memberid}}49"></label>
                                    <input type="checkbox" id="{{l.memberid}}50" ng-disabled="l.seventeen == 0" class="filled-in" ng-checked="l.od1seventeen == 1 || l.ed1select==1" ng-true-value="1" ng-false-value="0" ng-model="l.od1seventeen"  ng-change="changeFunction(members)"/>
                                    <label for="{{l.memberid}}50"></label>
                                    <input type="checkbox" id="{{l.memberid}}51" ng-disabled="l.seventeen == 0" class="filled-in" ng-checked="l.od2seventeen == .5 || l.ed2select==1" ng-true-value=".5" ng-false-value="0" ng-model="l.od2seventeen"  ng-change="changeFunction(members)"/>
                                    <label for="{{l.memberid}}51"></label>
                                 </td>
                                 <td  class="hovering"  data-title="'18'">
                                 <span class="tooltiptext"> 18</span>
                                    <input type="checkbox" name="present" id="{{l.memberid}}52" class="filled-in"  ng-checked="l.eighteen == 1 && l.adselect == 1" ng-true-value="1" ng-false-value="0" ng-model="l.eighteen"  ng-change="changeFunction(members)"/>
                                    <label for="{{l.memberid}}52"></label>
                                    <input type="checkbox" id="{{l.memberid}}53" ng-disabled="l.eighteen == 0" class="filled-in" ng-checked="l.od1eighteen == 1 || l.ed1select==1" ng-true-value="1" ng-false-value="0" ng-model="l.od1eighteen"  ng-change="changeFunction(members)"/>
                                    <label for="{{l.memberid}}53"></label>
                                    <input type="checkbox" id="{{l.memberid}}54" ng-disabled="l.eighteen == 0" class="filled-in" ng-checked="l.od2eighteen == .5 || l.ed2select==1" ng-true-value=".5" ng-false-value="0" ng-model="l.od2eighteen"  ng-change="changeFunction(members)"/>
                                    <label for="{{l.memberid}}54"></label>
                                 </td>
                                 <td  class="hovering" data-title="'19'">
                                 <span class="tooltiptext"> 19</span>
                                    <input type="checkbox" name="present" id="{{l.memberid}}55" class="filled-in"  ng-checked="l.nineteen == 1 && l.adselect == 1" ng-true-value="1" ng-false-value="0" ng-model="l.nineteen"  ng-change="changeFunction(members)"/>
                                    <label for="{{l.memberid}}55"></label>
                                    <input type="checkbox" id="{{l.memberid}}56" ng-disabled="l.nineteen == 0" class="filled-in" ng-checked="l.od1nineteen == 1 || l.ed1select==1" ng-true-value="1" ng-false-value="0" ng-model="l.od1nineteen"  ng-change="changeFunction(members)"/>
                                    <label for="{{l.memberid}}56"></label>
                                    <input type="checkbox" id="{{l.memberid}}57" ng-disabled="l.nineteen == 0" class="filled-in" ng-checked="l.od2nineteen == .5 || l.ed2select==1" ng-true-value=".5" ng-false-value="0"  ng-model="l.od2nineteen"  ng-change="changeFunction(members)"/>
                                    <label for="{{l.memberid}}57"></label>
                                 </td>
                                 <td  class="hovering" data-title="'20'">
                                 <span class="tooltiptext"> 20</span>
                                    <input type="checkbox" name="present" id="{{l.memberid}}58" class="filled-in"  ng-checked="l.twenty == 1 && l.adselect == 1" ng-true-value="1" ng-false-value="0" ng-model="l.twenty"  ng-change="changeFunction(members)"/>
                                    <label for="{{l.memberid}}58"></label>
                                    <input type="checkbox" id="{{l.memberid}}59" ng-disabled="l.twenty == 0" class="filled-in" ng-checked="l.od1twenty == 1 || l.ed1select==1" ng-true-value="1" ng-false-value="0" ng-model="l.od1twenty"  ng-change="changeFunction(members)"/>
                                    <label for="{{l.memberid}}59"></label>
                                    <input type="checkbox" id="{{l.memberid}}60" ng-disabled="l.twenty == 0" class="filled-in" ng-checked="l.od2twenty == .5 || l.ed2select==1" ng-true-value=".5" ng-false-value="0"  ng-model="l.od2twenty"  ng-change="changeFunction(members)"/>
                                    <label for="{{l.memberid}}60"></label>
                                 </td>
                                 <td  class="hovering"  data-title="'21'">
                                 <span class="tooltiptext"> 21</span>
                                    <input type="checkbox" name="present" id="{{l.memberid}}61" class="filled-in" ng-checked="l.adselect == 1 && l.twentyone==1" ng-true-value="1" ng-false-value="0" ng-model="l.twentyone"  ng-change="changeFunction(members)"/>
                                    <label for="{{l.memberid}}61"></label>
                                    <input type="checkbox" id="{{l.memberid}}62" ng-disabled="l.twentyone == 0" class="filled-in" ng-checked="l.ed1select==1 || l.od1twentyone==1" ng-true-value="1" ng-false-value="0" ng-model="l.od1twentyone"  ng-change="changeFunction(members)"/>
                                    <label for="{{l.memberid}}62"></label>
                                    <input type="checkbox" id="{{l.memberid}}63" ng-disabled="l.twentyone == 0" class="filled-in" ng-checked="l.od2twentyone == .5 || l.ed2select==1" ng-true-value=".5" ng-false-value="0" ng-model="l.od2twentyone"  ng-change="changeFunction(members)"/>
                                    <label for="{{l.memberid}}63"></label>
                                 </td>
                                 <td  class="hovering" data-title="'22'">
                                 <span class="tooltiptext"> 22</span>
                                    <input type="checkbox" name="present" id="{{l.memberid}}64" class="filled-in" ng-checked="l.adselect == 1 && l.twentytwo==1" ng-true-value="1" ng-false-value="0" ng-model="l.twentytwo"  ng-change="changeFunction(members)"/>
                                    <label for="{{l.memberid}}64"></label>
                                    <input type="checkbox" id="{{l.memberid}}65" ng-disabled="l.twentytwo == 0" class="filled-in" ng-checked="l.ed1select==1 || l.od1twentytwo==1" ng-true-value="1" ng-false-value="0" ng-model="l.od1twentytwo"  ng-change="changeFunction(members)"/>
                                    <label for="{{l.memberid}}65"></label>
                                    <input type="checkbox" id="{{l.memberid}}66" ng-disabled="l.twentytwo == 0" class="filled-in" ng-checked="l.od2twentytwo == .5 || l.ed2select==1" ng-true-value=".5" ng-false-value="0"  ng-model="l.od2twentytwo"  ng-change="changeFunction(members)"/>
                                    <label for="{{l.memberid}}66"></label>
                                 </td>
                                 <td  class="hovering" data-title="'23'">
                                 <span class="tooltiptext"> 23</span>
                                    <input type="checkbox" name="present" id="{{l.memberid}}67" class="filled-in" ng-checked="l.adselect == 1 && l.twentythree==1" ng-true-value="1" ng-false-value="0" ng-model="l.twentythree"  ng-change="changeFunction(members)"/>
                                    <label for="{{l.memberid}}67"></label>
                                    <input type="checkbox" id="{{l.memberid}}68" ng-disabled="l.twentythree == 0" class="filled-in" ng-checked="l.od1twentythree == 1 || l.ed1select==1" ng-true-value="1" ng-false-value="0" ng-model="l.od1twentythree"  ng-change="changeFunction(members)"/>
                                    <label for="{{l.memberid}}68"></label>
                                    <input type="checkbox" id="{{l.memberid}}69" ng-disabled="l.twentythree == 0" class="filled-in" ng-checked="l.od2twentythree == .5 || l.ed2select==1" ng-true-value=".5" ng-false-value="0"  ng-model="l.od2twentythree"  ng-change="changeFunction(members)"/>
                                    <label for="{{l.memberid}}69"></label>
                                 </td>
                                 <td  class="hovering" data-title="'24'">
                                 <span class="tooltiptext"> 24</span>
                                    <input type="checkbox" name="present" id="{{l.memberid}}70" class="filled-in" ng-checked="l.adselect == 1 && l.twentyfour==1" ng-true-value="1" ng-false-value="0" ng-model="l.twentyfour"  ng-change="changeFunction(members)"/>
                                    <label for="{{l.memberid}}70"></label>
                                    <input type="checkbox" id="{{l.memberid}}71" ng-disabled="l.twentyfour == 0" class="filled-in" ng-checked="l.ed1select==1 || l.od1twentyfour==1" ng-true-value="1" ng-false-value="0" ng-model="l.od1twentyfour"  ng-change="changeFunction(members)"/>
                                    <label for="{{l.memberid}}71"></label>
                                    <input type="checkbox" id="{{l.memberid}}72" ng-disabled="l.twentyfour == 0" class="filled-in" ng-checked="l.od2twentyfour == .5 || l.ed2select==1" ng-true-value=".5" ng-false-value="0"  ng-model="l.od2twentyfour"  ng-change="changeFunction(members)"/>
                                    <label for="{{l.memberid}}72"></label>
                                 </td>
                                 <td  class="hovering" data-title="'25'">
                                 <span class="tooltiptext"> 25</span>
                                    <input type="checkbox" name="present" id="{{l.memberid}}73" class="filled-in" ng-checked="l.adselect == 1 && l.twentyfive==1" ng-true-value="1" ng-false-value="0" ng-model="l.twentyfive"  ng-change="changeFunction(members)"/>
                                    <label for="{{l.memberid}}73"></label>
                                    <input type="checkbox" id="{{l.memberid}}74" ng-disabled="l.twentyfive == 0" class="filled-in" ng-checked="l.ed1select==1 || l.od1twentyfive==1" ng-true-value="1" ng-false-value="0" ng-model="l.od1twentyfive"  ng-change="changeFunction(members)"/>
                                    <label for="{{l.memberid}}74"></label>
                                    <input type="checkbox" id="{{l.memberid}}75" ng-disabled="l.twentyfive == 0" class="filled-in" ng-checked="l.od2twentyfive == .5 || l.ed2select==1" ng-true-value=".5" ng-false-value="0" ng-model="l.od2twentyfive"  ng-change="changeFunction(members)"/>
                                    <label for="{{l.memberid}}75"></label>
                                 </td>
                                 <td  class="hovering"  data-title="'26'">
                                 <span class="tooltiptext"> 26</span>
                                    <input type="checkbox" name="present" id="{{l.memberid}}76" class="filled-in" ng-checked="l.adselect == 1 && l.twentysix==1" ng-true-value="1" ng-false-value="0" ng-model="l.twentysix"  ng-change="changeFunction(members)"/>
                                    <label for="{{l.memberid}}76"></label>
                                    <input type="checkbox" id="{{l.memberid}}77" ng-disabled="l.twentysix == 0" class="filled-in" ng-checked="l.od1twentysix==1 || l.ed1select==1" ng-true-value=".5" ng-false-value="0" ng-model="l.od1twentysix"  ng-change="changeFunction(members)"/>
                                    <label for="{{l.memberid}}77"></label>
                                    <input type="checkbox" id="{{l.memberid}}78" ng-disabled="l.twentysix == 0 " class="filled-in" ng-checked="l.od2twentysix == .5 || l.ed2select==1" ng-true-value=".5" ng-false-value="0"  ng-model="l.od2twentysix"  ng-change="changeFunction(members)"/>
                                    <label for="{{l.memberid}}78"></label>
                                 </td>
                                 <td  class="hovering" data-title="'27'">
                                 <span class="tooltiptext"> 27</span>
                                    <input type="checkbox" name="present" id="{{l.memberid}}79" class="filled-in" ng-checked="l.adselect == 1 && l.twentyseven == 1" ng-true-value="1" ng-false-value="0" ng-model="l.twentyseven" ng-change="changeFunction(members)"/>
                                    <label for="{{l.memberid}}79"></label>
                                    <input type="checkbox" id="{{l.memberid}}80" ng-disabled="l.twentyseven == 0" class="filled-in" ng-checked="l.od1twentyseven == 1 || l.ed1select==1 " ng-true-value="1" ng-false-value="0" ng-model="l.od1twentyseven" ng-change="changeFunction(members)"/>
                                    <label for="{{l.memberid}}80"></label>
                                    <input type="checkbox" id="{{l.memberid}}81" ng-disabled="l.twentyseven == 0" class="filled-in" ng-checked="l.od2twentyseven == .5 || l.ed2select==1" ng-true-value=".5" ng-false-value="0" ng-model="l.od2twentyseven" ng-change="changeFunction(members)"/>
                                    <label for="{{l.memberid}}81"></label>
                                 </td>
                                 <td  class="hovering" data-title="'28'" ng-if="noOfDays>=28">
                                 <span class="tooltiptext"> 28</span>
                                    <input type="checkbox" name="present" id="{{l.memberid}}82" class="filled-in" ng-checked="l.adselect == 1 && l.twentyeight == 1" ng-true-value="1" ng-false-value="0" ng-model="l.twentyeight" ng-change="changeFunction(members)"/>
                                    <label for="{{l.memberid}}82"></label>
                                    <input type="checkbox" id="{{l.memberid}}83" ng-disabled="l.twentyeight == 0" class="filled-in" ng-checked="l.od1twentyeight==1 || l.ed1select == 1" ng-true-value="1" ng-false-value="0" ng-model="l.od1twentyeight" ng-change="changeFunction(members)"/>
                                    <label for="{{l.memberid}}83"></label>
                                    <input type="checkbox" id="{{l.memberid}}84" ng-disabled="l.twentyeight == 0" class="filled-in" ng-checked="l.od2twentyeight == .5 || l.ed2select==1" ng-true-value=".5" ng-false-value="0" ng-model="l.od2twentyeight" ng-change="changeFunction(members)"/>
                                    <label for="{{l.memberid}}84"></label>
                                 </td>
                                 <td  class="hovering" data-title="'29'" ng-if="noOfDays>=29">
                                 <span class="tooltiptext"> 29</span>
                                    <input type="checkbox" name="present" id="{{l.memberid}}85" class="filled-in" ng-checked="l.adselect == 1 && l.twentynine == 1" ng-true-value="1" ng-false-value="0" ng-model="l.twentynine" ng-change="changeFunction(members)"/>
                                    <label for="{{l.memberid}}85"></label>
                                    <input type="checkbox" id="{{l.memberid}}86" ng-disabled="l.twentynine == 0" class="filled-in" ng-checked="l.ed1select==1 || l.od1twentynine == 1" ng-true-value="1" ng-false-value="0" ng-model="l.od1twentynine" ng-change="changeFunction(members)"/>
                                    <label for="{{l.memberid}}86"></label>
                                    <input type="checkbox" id="{{l.memberid}}87" ng-disabled="l.twentynine == 0" class="filled-in" ng-checked="l.od2twentynine == .5 || l.ed2select==1" ng-true-value=".5" ng-false-value="0"  ng-model="l.od2twentynine" ng-change="changeFunction(members)"/>
                                    <label for="{{l.memberid}}87"></label>
                                 </td>
                                 <td  class="hovering"  data-title="'30'" ng-if="noOfDays>=30">
                                 <span class="tooltiptext"> 30</span>
                                    <input type="checkbox" name="present" id="{{l.memberid}}88" class="filled-in" ng-checked="l.adselect == 1 && l.thirty == 1" ng-true-value="1" ng-false-value="0" ng-model="l.thirty" ng-change="changeFunction(members)"/>
                                    <label for="{{l.memberid}}88"></label>
                                    <input type="checkbox" id="{{l.memberid}}89" ng-disabled="l.thirty == 0" class="filled-in" ng-checked="l.ed1select==1 || l.od1thirty==1" ng-true-value="1" ng-false-value="0" ng-model="l.od1thirty" ng-change="changeFunction(members)"/>
                                    <label for="{{l.memberid}}89"></label>
                                    <input type="checkbox" id="{{l.memberid}}90" ng-disabled="l.thirty == 0" class="filled-in" ng-checked="l.od2thirty == .5 || l.ed2select==1" ng-true-value=".5" ng-false-value="0"  ng-model="l.od2thirty" ng-change="changeFunction(members)"/>
                                    <label for="{{l.memberid}}90"></label>
                                 </td>
                                 <td  class="hovering" data-title="'31'" ng-if="noOfDays>=31">
                                 <span class="tooltiptext"> 31</span>
                                    <input type="checkbox" name="present" id="{{l.memberid}}91" class="filled-in" ng-checked="l.adselect == 1 && l.thirtyone == 1" ng-true-value="1" ng-false-value="0" ng-model="l.thirtyone" ng-change="changeFunction(members)"/>
                                    <label for="{{l.memberid}}91"></label>
                                    <input type="checkbox" id="{{l.memberid}}92" ng-disabled="l.thirtyone == 0" class="filled-in" ng-checked="l.od1thirtyone == 1 || l.ed1select==1" ng-true-value="1" ng-false-value="0" ng-model="l.od1thirtyone" ng-change="changeFunction(members)"/>
                                    <label for="{{l.memberid}}92"></label>
                                    <input type="checkbox" id="{{l.memberid}}93" ng-disabled="l.thirtyone == 0" class="filled-in" ng-checked="l.od2thirtyone == .5 || l.ed2select==1" ng-true-value=".5" ng-false-value="0" ng-model="l.od2thirtyone" ng-change="changeFunction(members)"/>
                                    <label for="{{l.memberid}}93"></label>
                                 </td>
                                 <td width="5%" data-title="'Days'" style="padding-left: 20px;padding-top: 0px;">
                                
                                    <input style="margin: -8px 0px -16px 0;
                                       border-bottom:none" type="text" ng-model="l.pdays" />
                                    <input style="margin: -3px 0px -16px 0;
                                       border-bottom:none" type="text" ng-model="l.od1Items" />
                                    <input style="margin: -3px 0px -16px 0;
                                       border-bottom:none" type="text" ng-model="l.od2Items" />
                                    <label for="{{l.memberid}}"></label>
                                 </td>
                              </tr>
                              <tr ng-repeat="l in $data" ng-if="l.jobcode == 'DVR'">
                                 <td width="10%"  data-title="'Select'"  header="'ng-table/headers/checkbox.html'" > &nbsp;&nbsp;&nbsp;
                                    <input type="checkbox" name="selectattendance" id="{{l.memberid}}select{{$index}}" class="filled-in selectattendance"  ng-checked="model.SelectItems==1 || l.selectattendance==1" ng-true-value="1" ng-false-value="0" ng-model="l.selectattendance" ng-change="AllchangeFunction(members,l.memberid,l.selectattendance)"/>
                                    <label for="{{l.memberid}}select{{$index}}"></label>
                                 </td>                          
                                 <td width="17%"  data-title="'Name'" filter="{firstname: 'text'}">{{l.firstname}}</td>
                                 <td width="7%"  data-title="'Texco No'" filter="{texcono : 'text'}">{{l.texcono}}</td>
                                 <td width="5%"  data-title="'Category'" filter="{jobcode: 'text'}">{{l.jobcode }}</td>
                                 <td data-title="'Duty'" width="10%" style="padding-left: 40px;padding-top: 0px;">
                                    <input style="margin: -40px 0px -10px 0;border-bottom:none;" value="AD" />
                                    <input style="margin: -3px 0px -16px 0;border-bottom:none" type="text" value="ED " />
                                 </td>
                                 <td data-title="" width="15%" style="padding-left: 40px;">
                                    <input type="checkbox" name="adselect" id="{{l.memberid}}adselect{{$index}}" class="filled-in adselect"  ng-checked="l.adselect==1 && l.selectattendance == 1" ng-true-value="1" ng-false-value="0" ng-model="l.adselect" ng-change="adSelectChange(members,l.adselect,l.memberid,l.selectattendance)" ng-disabled="l.selectattendance == 0"/>
                                    <label for="{{l.memberid}}adselect{{$index}}"></label>
                                    <input type="text" name="od" id="{{l.memberid}}32322" ng-init="l.od1one32322 = 0" ng-disabled="l.adselect == 0  || l.selectattendance == 0" class="filled-in" ng-model="l.od1one32322" readonly/>
                                    <label for="{{l.memberid}}32322"></label>
                                 </td> 
                                 <td  data-title="'1'">
                                    <input type="checkbox" name="present" id="{{l.memberid}}1" class="filled-in" ng-true-value="1" ng-false-value="0" ng-model="l.one" ng-change="changeFunction(members)" ng-disabled="l.selectattendance == 0"  ng-checked="l.one==1 && l.selectattendance == 1"/>
                                    <label for="{{l.memberid}}1"></label>
                                    <input type="text" name="od" id="{{l.memberid}}2" ng-disabled="l.selectattendance == 0 || l.one == 0" class="filled-in" ng-model="l.od1one" ng-blur="changeFunction(members)"/>
                                    <label for="{{l.memberid}}2"></label>
                                 </td>
                                 <td data-title="'2'">
                                    <input type="checkbox" name="present" id="{{l.memberid}}4" class="filled-in"  ng-true-value="1" ng-false-value="0" ng-model="l.two" ng-change="changeFunction(members)" ng-disabled="l.selectattendance == 0"  ng-checked="l.two==1 && l.selectattendance == 1" />
                                    <label for="{{l.memberid}}4"></label>
                                    <input type="text" name="od" id="{{l.memberid}}5" ng-disabled="l.selectattendance == 0 || l.two == 0" class="filled-in" ng-model="l.od1two" ng-blur="changeFunction(members)"/>
                                    <label for="{{l.memberid}}5"></label>
                                 </td>
                                 <td  data-title="'3'">
                                    <input type="checkbox" name="present" id="{{l.memberid}}7"  class="filled-in" ng-true-value="1" ng-false-value="0" ng-model="l.three" ng-change="changeFunction(members)" ng-disabled="l.selectattendance == 0"  ng-checked="l.three==1 && l.selectattendance == 1" />
                                    <label for="{{l.memberid}}7"></label>
                                    <input type="text" name="od" id="{{l.memberid}}8"  ng-disabled="l.three == 0" class="filled-in" ng-model="l.od1three" ng-disabled="l.selectattendance == 0 || l.three == 0"  ng-blur="changeFunction(members)"/>
                                    <label for="{{l.memberid}}8"></label>
                                 </td>
                                 <td  data-title="'4'">
                                    <input type="checkbox" name="present" id="{{l.memberid}}10"  class="filled-in"  ng-true-value="1" ng-false-value="0" ng-model="l.four" ng-change="changeFunction(members)" ng-disabled="l.selectattendance == 0"  ng-checked="l.four==1 && l.selectattendance == 1" />
                                    <label for="{{l.memberid}}10"></label>
                                    <input type="text" name="od" id="{{l.memberid}}11"  ng-disabled="l.four == 0" class="filled-in" ng-model="l.od1four" ng-disabled="l.selectattendance == 0 || l.four == 0" ng-blur="changeFunction(members)"/>
                                    <label for="{{l.memberid}}11"></label>
                                 </td>
                                 <td  data-title="'5'">
                                    <input type="checkbox" name="present" id="{{l.memberid}}13" class="filled-in" ng-true-value="1" ng-false-value="0" ng-model="l.five"  ng-change="changeFunction(members)" ng-disabled="l.selectattendance == 0"  ng-checked="l.five==1 && l.selectattendance == 1" />
                                    <label for="{{l.memberid}}13"></label>
                                    <input type="text" name="od" id="{{l.memberid}}14" ng-disabled="l.five == 0" class="filled-in" ng-model="l.od1five" ng-disabled="l.selectattendance == 0 || l.five == 0" ng-blur="changeFunction(members)"/>
                                    <label for="{{l.memberid}}14"></label>
                                 </td>
                                 <td  data-title="'6'">
                                    <input type="checkbox" name="present" id="{{l.memberid}}16" class="filled-in" ng-true-value="1" ng-false-value="0" ng-model="l.six"  ng-change="changeFunction(members)" ng-disabled="l.selectattendance == 0" ng-checked="l.six==1 && l.selectattendance == 1" />
                                    <label for="{{l.memberid}}16"></label>
                                    <input type="text" id="{{l.memberid}}17" ng-disabled="l.six == 0" class="filled-in" ng-model="l.od1six" ng-disabled="l.selectattendance == 0 || l.six == 0" ng-blur="changeFunction(members)"/>
                                    <label for="{{l.memberid}}17"></label>
                                 </td>
                                 <td  data-title="'7'">
                                    <input type="checkbox" name="present" id="{{l.memberid}}19" class="filled-in" ng-true-value="1" ng-false-value="0" ng-model="l.seven"  ng-change="changeFunction(members)" ng-disabled="l.selectattendance == 0"  ng-checked="l.seven==1 && l.selectattendance == 1" />
                                    <label for="{{l.memberid}}19"></label>
                                    <input type="text" id="{{l.memberid}}20"  ng-disabled="l.seven == 0" class="filled-in" ng-model="l.od1seven" ng-disabled="l.selectattendance == 0 || l.seven == 0" ng-blur="changeFunction(members)"/>
                                    <label for="{{l.memberid}}20"></label>
                                 </td>
                                 <td  data-title="'8'">
                                    <input type="checkbox" name="present" id="{{l.memberid}}22" class="filled-in" ng-true-value="1" ng-false-value="0" ng-model="l.eight"  ng-change="changeFunction(members)" ng-disabled="l.selectattendance == 0"  ng-checked="l.eight==1 && l.selectattendance == 1" />
                                    <label for="{{l.memberid}}22"></label>
                                    <input type="text" id="{{l.memberid}}23"  ng-disabled="l.eight == 0" class="filled-in" ng-checked="l.eight == 1" ng-true-value="1" ng-false-value="0" ng-model="l.od1eight" ng-disabled="l.selectattendance == 0 || l.eight == 0" ng-blur="changeFunction(members)"/>
                                    <label for="{{l.memberid}}23"></label>
                                 </td>
                                 <td  data-title="'9'">
                                    <input type="checkbox" name="present" id="{{l.memberid}}25" class="filled-in" ng-true-value="1" ng-false-value="0" ng-model="l.nine"  ng-change="changeFunction(members)" ng-disabled="l.selectattendance == 0"  ng-checked="l.nine==1 && l.selectattendance == 1" />
                                    <label for="{{l.memberid}}25"></label>
                                    <input type="text" id="{{l.memberid}}26" ng-disabled="l.nine == 0" class="filled-in" ng-checked="l.nine == 1" ng-true-value="1" ng-false-value="0" ng-model="l.od1nine" ng-disabled="l.selectattendance == 0 || l.nine == 0" ng-blur="changeFunction(members)"/>
                                    <label for="{{l.memberid}}26"></label>
                                 </td>
                                 <td  data-title="'10'">
                                    <input type="checkbox" name="present" id="{{l.memberid}}28" class="filled-in" ng-true-value="1" ng-false-value="0" ng-model="l.ten"  ng-change="changeFunction(members)" ng-disabled="l.selectattendance == 0"  ng-checked="l.ten==1 && l.selectattendance == 1" />
                                    <label for="{{l.memberid}}28"></label>
                                    <input type="text" id="{{l.memberid}}29"  ng-disabled="l.ten == 0" class="filled-in" ng-checked="l.ten == 1" ng-true-value="1" ng-false-value="0" ng-model="l.od1ten" ng-disabled="l.selectattendance == 0 || l.ten == 0" ng-blur="changeFunction(members)"/>
                                    <label for="{{l.memberid}}29"></label>
                                 </td>
                                 <td  data-title="'11'">
                                    <input type="checkbox" name="present" id="{{l.memberid}}31" class="filled-in" ng-true-value="1" ng-false-value="0" ng-model="l.eleven"  ng-change="changeFunction(members)" ng-disabled="l.selectattendance == 0"  ng-checked="l.eleven==1 && l.selectattendance == 1" />
                                    <label for="{{l.memberid}}31"></label>
                                    <input type="text" id="{{l.memberid}}32" ng-disabled="l.eleven == 0" class="filled-in" ng-checked="l.eleven == 1" ng-true-value="1" ng-false-value="0" ng-model="l.od1eleven" ng-disabled="l.selectattendance == 0 || l.eleven == 0" ng-blur="changeFunction(members)"/>
                                    <label for="{{l.memberid}}32"></label>
                                 </td>
                                 <td  data-title="'12'">
                                    <input type="checkbox" name="present" id="{{l.memberid}}34" class="filled-in" ng-true-value="1" ng-false-value="0" ng-model="l.twelve"  ng-change="changeFunction(members)" ng-disabled="l.selectattendance == 0"  ng-checked="l.twelve==1 && l.selectattendance == 1" />
                                    <label for="{{l.memberid}}34"></label>
                                    <input type="text" id="{{l.memberid}}35" ng-disabled="l.twelve == 0" class="filled-in" ng-checked="l.twelve == 1" ng-true-value="1" ng-false-value="0" ng-model="l.od1twelve" ng-disabled="l.selectattendance == 0 || l.twelve == 0" ng-blur="changeFunction(members)"/>
                                    <label for="{{l.memberid}}35"></label>
                                 </td>
                                 <td  data-title="'13'">
                                    <input type="checkbox" name="present" id="{{l.memberid}}37" class="filled-in" ng-true-value="1" ng-false-value="0" ng-model="l.thirteen" ng-change="changeFunction(members)" ng-disabled="l.selectattendance == 0"  ng-checked="l.thirteen==1 && l.selectattendance == 1" />
                                    <label for="{{l.memberid}}37"></label>
                                    <input type="text" id="{{l.memberid}}38" ng-disabled="l.thirteen == 0" class="filled-in" ng-checked="l.thirteen == 1" ng-true-value="1" ng-false-value="0" ng-model="l.od1thirteen" ng-disabled="l.selectattendance == 0 || l.thirteen == 0" ng-blur="changeFunction(members)"/>
                                    <label for="{{l.memberid}}38"></label>
                                 </td>
                                 <td  data-title="'14'">
                                    <input type="checkbox" name="present" id="{{l.memberid}}40" class="filled-in" ng-true-value="1" ng-false-value="0" ng-model="l.fourteen"  ng-change="changeFunction(members)" ng-disabled="l.selectattendance == 0"  ng-checked="l.fourteen==1 && l.selectattendance == 1" />
                                    <label for="{{l.memberid}}40"></label>
                                    <input type="text" id="{{l.memberid}}41" ng-disabled="l.fourteen == 0" class="filled-in" ng-checked="l.fourteen == 1" ng-true-value="1" ng-false-value="0" ng-model="l.od1fourteen" ng-disabled="l.selectattendance == 0 || l.fourteen == 0" ng-blur="changeFunction(members)"/>
                                    <label for="{{l.memberid}}41"></label>
                                 </td>
                                 <td  data-title="'15'">
                                    <input type="checkbox" name="present" id="{{l.memberid}}43" class="filled-in" ng-true-value="1" ng-false-value="0" ng-model="l.fifteen"  ng-change="changeFunction(members)" ng-disabled="l.selectattendance == 0"  ng-checked="l.fifteen==1 && l.selectattendance == 1" />
                                    <label for="{{l.memberid}}43"></label>
                                    <input type="text" id="{{l.memberid}}44" ng-disabled="l.fifteen == 0" class="filled-in" ng-checked="l.fifteen == 1" ng-true-value="1" ng-false-value="0" ng-model="l.od1fifteen" ng-disabled="l.selectattendance == 0 || l.fifteen == 0" ng-blur="changeFunction(members)"/>
                                    <label for="{{l.memberid}}44"></label>
                                 </td>
                                 <td  data-title="'16'">
                                    <input type="checkbox" name="present" id="{{l.memberid}}46" class="filled-in" ng-true-value="1" ng-false-value="0" ng-model="l.sixteen"  ng-change="changeFunction(members)" ng-disabled="l.selectattendance == 0"  ng-checked="l.sixteen==1 && l.selectattendance == 1" />
                                    <label for="{{l.memberid}}46"></label>
                                    <input type="text" id="{{l.memberid}}47" ng-disabled="l.sixteen == 0" class="filled-in" ng-checked="l.sixteen == 1" ng-true-value="1" ng-false-value="0" ng-model="l.od1sixteen" ng-disabled="l.selectattendance == 0 || l.sixteen == 0" ng-blur="changeFunction(members)"/>
                                    <label for="{{l.memberid}}47"></label>
                                 </td>
                                 <td  data-title="'17'">
                                    <input type="checkbox" name="present" id="{{l.memberid}}49" class="filled-in" ng-true-value="1" ng-false-value="0" ng-model="l.seventeen" ng-change="changeFunction(members)" ng-disabled="l.selectattendance == 0"  ng-checked="l.seventeen==1 && l.selectattendance == 1" />
                                    <label for="{{l.memberid}}49"></label>
                                    <input type="text" id="{{l.memberid}}50"  ng-disabled="l.seventeen == 0" class="filled-in" ng-checked="l.seventeen == 1" ng-true-value="1" ng-false-value="0" ng-model="l.od1seventeen" ng-disabled="l.selectattendance == 0 || l.seventeen == 0" ng-blur="changeFunction(members)"/>
                                    <label for="{{l.memberid}}50"></label>
                                 </td>
                                 <td  data-title="'18'">
                                    <input type="checkbox" name="present" id="{{l.memberid}}52" class="filled-in" ng-true-value="1" ng-false-value="0" ng-model="l.eighteen"  ng-change="changeFunction(members)" ng-disabled="l.selectattendance == 0"  ng-checked="l.eighteen==1 && l.selectattendance == 1" />
                                    <label for="{{l.memberid}}52"></label>
                                    <input type="text" id="{{l.memberid}}53" ng-disabled="l.eighteen == 0" class="filled-in" ng-checked="l.eighteen == 1" ng-true-value="1" ng-false-value="0" ng-model="l.od1eighteen" ng-disabled="l.selectattendance == 0 || l.eighteen == 0" ng-blur="changeFunction(members)"/>
                                    <label for="{{l.memberid}}53"></label>
                                 </td>
                                 <td  data-title="'19'">
                                    <input type="checkbox" name="present" id="{{l.memberid}}55" class="filled-in" ng-true-value="1" ng-false-value="0" ng-model="l.nineteen"  ng-change="changeFunction(members)" ng-disabled="l.selectattendance == 0"  ng-checked="l.nineteen==1 && l.selectattendance == 1"/>
                                    <label for="{{l.memberid}}55"></label>
                                    <input type="text" id="{{l.memberid}}56" ng-disabled="l.nineteen == 0" class="filled-in" ng-checked="l.nineteen == 1" ng-true-value="1" ng-false-value="0" ng-model="l.od1nineteen" ng-disabled="l.selectattendance == 0 || l.nineteen == 0" ng-blur="changeFunction(members)"/>
                                    <label for="{{l.memberid}}56"></label>
                                 </td>
                                 <td  data-title="'20'">
                                    <input type="checkbox" name="present" id="{{l.memberid}}58" class="filled-in" ng-true-value="1" ng-false-value="0" ng-model="l.twenty"  ng-change="changeFunction(members)" ng-disabled="l.selectattendance == 0"  ng-checked="l.twenty==1 && l.selectattendance == 1" />
                                    <label for="{{l.memberid}}58"></label>
                                    <input type="text" id="{{l.memberid}}59"  ng-disabled="l.twenty == 0" class="filled-in" ng-checked="l.twenty == 1" ng-true-value="1" ng-false-value="0" ng-model="l.od1twenty" ng-disabled="l.selectattendance == 0 || l.twenty == 0" ng-blur="changeFunction(members)"/>
                                    <label for="{{l.memberid}}59"></label>
                                 </td>
                                 <td  data-title="'21'">
                                    <input type="checkbox" name="present" id="{{l.memberid}}61" class="filled-in" ng-true-value="1" ng-false-value="0" ng-model="l.twentyone" ng-change="changeFunction(members)" ng-disabled="l.selectattendance == 0"  ng-checked="l.twentyone==1 && l.selectattendance == 1" />
                                    <label for="{{l.memberid}}61"></label>
                                    <input type="text" id="{{l.memberid}}62"  ng-disabled="l.twentyone == 0" class="filled-in" ng-checked="l.twentyone == 1" ng-true-value="1" ng-false-value="0" ng-model="l.od1twentyone" ng-disabled="l.selectattendance == 0 || l.twentyone == 0" ng-blur="changeFunction(members)"/>
                                    <label for="{{l.memberid}}62"></label>
                                 </td>
                                 <td  data-title="'22'">
                                    <input type="checkbox" name="present" id="{{l.memberid}}64" class="filled-in" ng-true-value="1" ng-false-value="0" ng-model="l.twentytwo" ng-change="changeFunction(members)" ng-disabled="l.selectattendance == 0"  ng-checked="l.twentytwo==1 && l.selectattendance == 1" />
                                    <label for="{{l.memberid}}64"></label>
                                    <input type="text" id="{{l.memberid}}65" ng-disabled="l.twentytwo == 0" class="filled-in" ng-checked="l.twentytwo == 1" ng-true-value="1" ng-false-value="0" ng-model="l.od1twentytwo" ng-disabled="l.selectattendance == 0 || l.twentytwo == 0" ng-blur="changeFunction(members)"/>
                                    <label for="{{l.memberid}}65"></label>
                                 </td>
                                 <td  data-title="'23'">
                                    <input type="checkbox" name="present" id="{{l.memberid}}67" class="filled-in" ng-true-value="1" ng-false-value="0" ng-model="l.twentythree" ng-change="changeFunction(members)" ng-disabled="l.selectattendance == 0"  ng-checked="l.twentythree==1 && l.selectattendance == 1" />
                                    <label for="{{l.memberid}}67"></label>
                                    <input type="text" id="{{l.memberid}}68" ng-disabled="l.twentythree == 0" class="filled-in" ng-checked="l.twentythree == 1" ng-true-value="1" ng-false-value="0" ng-model="l.od1twentythree" ng-disabled="l.selectattendance == 0 || l.twentythree == 0" ng-blur="changeFunction(members)"/>
                                    <label for="{{l.memberid}}68"></label>
                                 </td>
                                 <td  data-title="'24'">
                                    <input type="checkbox" name="present" id="{{l.memberid}}70" class="filled-in" ng-true-value="1" ng-false-value="0" ng-model="l.twentyfour" ng-change="changeFunction(members)" ng-disabled="l.selectattendance == 0"  ng-checked="l.twentyfour==1 && l.selectattendance == 1" />
                                    <label for="{{l.memberid}}70"></label>
                                    <input type="text" id="{{l.memberid}}71"  ng-disabled="l.twentyfour == 0" class="filled-in" ng-checked="l.twentyfour == 1" ng-true-value="1" ng-false-value="0" ng-model="l.od1twentyfour" ng-disabled="l.selectattendance == 0 || l.twentyfour == 0" ng-blur="changeFunction(members)"/>
                                    <label for="{{l.memberid}}71"></label>
                                 </td>
                                 <td  data-title="'25'">
                                    <input type="checkbox" name="present" id="{{l.memberid}}73" class="filled-in" ng-true-value="1" ng-false-value="0" ng-model="l.twentyfive" ng-change="changeFunction(members)" ng-disabled="l.selectattendance == 0"  ng-checked="l.twentyfive==1 && l.selectattendance == 1" />
                                    <label for="{{l.memberid}}73"></label>
                                    <input type="text" id="{{l.memberid}}74" ng-disabled="l.twentyfive == 0" class="filled-in" ng-checked="l.twentyfive == 1" ng-true-value="1" ng-false-value="0" ng-model="l.od1twentyfive" ng-disabled="l.selectattendance == 0 || l.twentyfive == 0" ng-blur="changeFunction(members)"/>
                                    <label for="{{l.memberid}}74"></label>
                                 </td>
                                 <td  data-title="'26'">
                                    <input type="checkbox" name="present" id="{{l.memberid}}76" class="filled-in" ng-true-value="1" ng-false-value="0" ng-model="l.twentysix" ng-change="changeFunction(members)" ng-disabled="l.selectattendance == 0"  ng-checked="l.twentysix==1 && l.selectattendance == 1" />
                                    <label for="{{l.memberid}}76"></label>
                                    <input type="text" id="{{l.memberid}}77" ng-disabled="l.twentysix == 0" class="filled-in" ng-checked="l.twentysix == 1" ng-true-value="1" ng-false-value="0" ng-model="l.od1twentysix" ng-disabled="l.selectattendance == 0 || l.twentysix == 0" ng-blur="changeFunction(members)"/>
                                    <label for="{{l.memberid}}77"></label>
                                 </td>
                                 <td  data-title="'27'">
                                    <input type="checkbox" name="present" id="{{l.memberid}}79" class="filled-in" ng-true-value="1" ng-false-value="0" ng-model="l.twentyseven" ng-change="changeFunction(members)" ng-disabled="l.selectattendance == 0"  ng-checked="l.twentyseven==1 && l.selectattendance == 1" />
                                    <label for="{{l.memberid}}79"></label>
                                    <input type="text" id="{{l.memberid}}80"  ng-disabled="l.twentyseven == 0" class="filled-in" ng-checked="l.twentyseven == 1" ng-true-value="1" ng-false-value="0" ng-model="l.od1twentyseven" ng-disabled="l.selectattendance == 0 || l.twentyseven == 0" ng-blur="changeFunction(members)"/>
                                    <label for="{{l.memberid}}80"></label>
                                 </td>
                                 <span ng-if="false">
                                 <td  data-title="'28'" ng-if="noOfDays>=28">
                                    <input type="checkbox" name="present" id="{{l.memberid}}82" class="filled-in" ng-true-value="1" ng-false-value="0" ng-change="changeFunction(members)" ng-disabled="l.selectattendance == 0" ng-checked="l.twentyeight==1 && l.selectattendance == 1"  ng-model="l.twentyeight"/>
                                    <label for="{{l.memberid}}82"></label>
                                    <input type="text" id="{{l.memberid}}83" ng-disabled="l.twentyeight == 0" class="filled-in" ng-checked="l.twentyeight == 1" ng-true-value="1" ng-false-value="0" ng-model="l.od1twentyeight" ng-disabled="l.selectattendance == 0 || l.twentyeight == 0" ng-blur="changeFunction(members)"/>
                                    <label for="{{l.memberid}}83"></label>
                                 </td>
                                 </span>
                                 <td  data-title="'29'" ng-if="noOfDays>=29">
                                    <input type="checkbox" name="present" id="{{l.memberid}}85" class="filled-in" ng-true-value="1" ng-false-value="0" ng-model="l.twentynine" ng-change="changeFunction(members)" ng-disabled="l.selectattendance == 0"  ng-checked="l.twentynine==1 && l.selectattendance == 1" />
                                    <label for="{{l.memberid}}85"></label>
                                    <input type="text" id="{{l.memberid}}86" ng-disabled="l.twentynine == 0" class="filled-in" ng-checked="l.twentynine == 1" ng-true-value="1" ng-false-value="0" ng-model="l.od1twentynine" ng-disabled="l.selectattendance == 0 || l.twentynine == 0" ng-blur="changeFunction(members)"/>
                                    <label for="{{l.memberid}}86"></label>
                                 </td>
                                 <td  data-title="'30'" ng-if="noOfDays>=30">
                                    <input type="checkbox" name="present" id="{{l.memberid}}88" class="filled-in" ng-true-value="1" ng-false-value="0" ng-model="l.thirty" ng-change="changeFunction(members)" ng-disabled="l.selectattendance == 0"  ng-checked="l.thirty==1 && l.selectattendance == 1" />
                                    <label for="{{l.memberid}}88"></label>
                                    <input type="text" id="{{l.memberid}}89" ng-disabled="l.thirty == 0" class="filled-in" ng-checked="l.thirty == 1" ng-true-value="1" ng-false-value="0" ng-model="l.od1thirty" ng-disabled="l.selectattendance == 0 || l.thirty == 0" ng-blur="changeFunction(members)"/>
                                    <label for="{{l.memberid}}89"></label>
                                 </td>
                                 <td  data-title="'31'" ng-if="noOfDays>=31">
                                    <input type="checkbox" name="present" id="{{l.memberid}}91" class="filled-in" ng-true-value="1" ng-false-value="0" ng-model="l.thirtyone" ng-change="changeFunction(members)" ng-disabled="l.selectattendance == 0"  ng-checked="l.thirtyone==1 && l.selectattendance == 1" />
                                    <label for="{{l.memberid}}91"></label>
                                    <input type="text" id="{{l.memberid}}92" ng-disabled="l.thirtyone == 0" class="filled-in" ng-checked="l.thirtyone == 1" ng-true-value="1" ng-false-value="0" ng-model="l.od1thirtyone" ng-disabled="l.selectattendance == 0 || l.thirtyone == 0" ng-blur="changeFunction(members)"/>
                                    <label for="{{l.memberid}}92"></label>
                                 </td>
                                 <td width="10%" data-title="'Days'" style="padding-left: 20px;padding-top: 0px;">
                                    <input style="margin: -40px 0px -16px 0;
                                       border-bottom:none" type="text" ng-model="l.pdays" />
                                    <input style="margin: -3px 0px -16px 0;
                                       border-bottom:none" type="text" ng-model="l.od1Items" />
                                    <label for="{{l.memberid}}"></label>
                                 </td>
                              </tr>
                           </table>
                        </div>
                     </div>
                     <div class="row">
                        <div id="failure" class="red-text"></div>
                        <div class="input-field col s12 l8">
                           <p>
                              <button class="btn waves-effect waves-light   cyan darken-2" type="submit" ng-click="confirmsave(objattendance,selectedMembers,1)" ng-disabled="isSubmitDisabled">Update
                              </button>
                              <button class="btn waves-effect waves-light red darken-2" type="button"  ng-click="cancelattendence()">
                              Cancel
                              </button>
                           </p>
                        </div>
                  </form>
                  </div>
                  <!-- <div id="success" class="green-text"></div> -->
                  </form>
                  <div class="col s12 m12 l6" ng-if="memberdetails.length>0">
                     <div class="card blue-grey lighten-1">
                        <div class="card-content white-text"  style="height:200px;">
                           <span class="card-title">Upload Attendance</span>
                           <p class="text-black">You can Upload Attendance. Status,
                              <span>
                              <!-- <a style="color: #fff;font-weight: bold;margin-left: 30px;text-decoration: underline;" href="
                                  <?php echo base_url("assets/document/sample/attendance.xlsx")?>" download> Download Sample
                              </a> -->
                              </span>.
                           <p style="padding-left: 25px">0 = ABSENT</p>
                           <p style="padding-left: 25px">1 = PRESENT </p>
                           <p style="padding-left: 25px">2 = ED 1 (Over Time 8 Hours)</p>
						         <p style="padding-left: 25px">3 = ED 2 (Over Time additional 8 Hours)</p>
                           </p>
                           <form action="#">
                              <div class="file-field input-field">
                                 <div class="btn">
                                    <span>File</span>
                                    <input type="file" name="file" id="impfile" class="form-control" onchange="angular.element(this).scope().UploadFile(this.files)" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel">
                                 </div>
                                 <div class="file-path-wrapper">
                                    <input class="file-path validate" id="valpath" type="text" placeholder="Upload file">
                                 </div>
                              </div>
                           </form>
                        </div>
                        <div class="card-action">
                           <input type="button" value="Import" class="btn btn-success"  ng-disabled="!SelectedFileForUpload"  ng-click="ParseExcelDataAndSave()" />
                           <!-- <span style="color:red">
                           {{Message}}
                           </span> -->
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>

<div id="modalapplyupdate" class="modal modal-fixed-footer" style="max-height:90%;">
   <div class="modal-content">
      <nav class="blue" style="position: fixed;margin-top: 0px; z-index:999">
         <div class="col s11 m11 l11">
            <div class="li white-text" id="mcaption">Attendance Upload</div>
         </div>
      </nav>
      <div class="row" style="padding: 60px;">
         <h5>Data Already exists.Are you sure want to Replace Data?</h5>
      </div>
   </div>
   <div class="modal-footer">
      <div class="red-text waves-effect waves-green"></div>
      <input type="button" value="Import" class="btn btn-success"  ng-disabled="!SelectedFileForUpload"  ng-click="ParseExcelDataAndSave()" />
      <button class="waves-effect waves-blue btn-flat" type="submit" ng-click="canceloption()">No
      </button>
   </div>
</div>

<script type="text/ng-template" id="ng-table/headers/checkbox.html">
      <input type="checkbox" name="SelectItems" id="SelectItems" class="filled-in SelectItems"  ng-checked="model.SelectItems==1" ng-true-value="1" ng-false-value="0" ng-model="model.SelectItems"  ng-change="changeFunctions(members)"/>
      <label for="SelectItems"></label>
</script>
<script type="text/javascript">
   $(function() {
      $("#SelectItems").click(function(){
         $('.selectattendance').not(this).prop('checked', this.checked);
      });


     $('.monthYearPicker').datepicker({
       changeMonth: true,
       changeYear: true,
       showButtonPanel: true,
       dateFormat: 'MM yy'
     }).focus(function() {
       var thisCalendar = $(this);
       $('.ui-datepicker-calendar').detach();
       $('.ui-datepicker-close').click(function() {
         var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
         var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
         thisCalendar.datepicker('setDate', new Date(year, month, 1));
         var projectid = angular.element(document.getElementById('project')).scope().objattendance.projectid;
         var controllerElement = document.querySelector('[ng-controller="ctrlClientattendance"]');
         var controllerScope = angular.element(controllerElement).scope();
         controllerScope.$apply( function(){
         controllerScope.objattendance.monthandyear = monthandyear.value;
          angular.element(controllerElement).scope().editattendance(monthandyear.value, projectid);
      });
       });
     });
   });
   
  /* $( document ).ready(function() { 
   $('.month_year').datepicker({
      format: 'MM yyyy',
      viewMode: "months", 
      minViewMode: "months",
        autoClose:true,
		endDate: "today"
   
   });
   $('.datepicker input').datepicker();
   
   $(".month_year").datepicker().on("changeDate", function(e) {
   $('.datepicker-dropdown').hide();
   });
   });  */ 
   
   
</script>
<style>
    div#modalapply {
        height: 200px;
    }
</style>
<style type="text/css">
   .ng-table-pager {
   display: none;
   }
   .striped {
   display: block;
   height: auto;
   }
</style>
<style type="text/css">
   .ui-datepicker-calendar {
   display: none;
   }
   td {
   max-width: 25px;
   }
   .datepicker-dropdown {
   top: 0;
   left: 0;
   position: absolute;
   background-color: #fff;
   width: 20%;
   }
   /*.striped {
   height: 300px;
   overflow-y: scroll;
   }*/

   .tooltiptext {
      display:none;
   }
   td.hovering:hover .tooltiptext {
    display: unset;
    position: absolute !important;
    z-index: 99;
    background: white;
    padding: 2px 6px;
    margin: auto;
    width: auto;
    display: block !important;
    border-radius: 4px;
    top: -15px !important;
    /* left: 0; */
    /* right: 0; */
    box-shadow: 2px 2px 4px rgb(0 0 0 / 35%);
    position: static;
    top: 0;
}
td.hovering {
    position: relative;
}
</style>