<script type="text/javascript" src="
   <?php echo base_url("assets/js/app/clientattendance.js?v=1")?>"></script>
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
               <span class="breadcrumb">Attendance
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
   <div id="modal1" class="modal modal-fixed-footer" style="width: 65% !important;">
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
                  <td style="padding-left:25px" width="10%"  data-title="'ED 1'" >{{l.od1Items | number:1}}</td>
                  <td style="padding-left:25px" width="10%"  data-title="'ED 2'" >{{l.od2Items | number:1}}</td>
                  <td style="padding-left:25px" width="15%"  data-title="'Total Duties'">{{ l.pdays + l.od1Items + l.od2Items | number:1 }}</td>
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
         <button class="modal-action waves-effect waves-green btn-flat" type="submit" ng-click="saveattendance(objattendance,selectedMembers,savetype, monthandyears, clientids, projectids,memberdetailss)" ng-disabled="SaveDisable">
         Save
         </button> 
         <a href="" class="modal-action modal-close waves-effect btn-flat ">Cancel</a>
      </div>
      </form>
   </div>
   <div id="modal2" class="modal modal-fixed-footer">
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
            <h6>  Attendance For the period - <strong> {{objattendance.monthandyear}}</strong></h6>
            <h6> Attendance Date - <strong> <?php echo date("d-m-Y") . "<br>";?> </strong></h6>
            <table ng-table="tableParams2" class="responsive-table highlight striped" show-filter="true" class="bordered" >
               <tr ng-repeat="l in $data">
                  <td data-title="'S.No'">{{$index + 1}}</td>
                  <td style="padding-left:25px" width="30%"  data-title="'Name'" filter="{firstname: 'text'}">{{l.firstname}}</td>
                  <td style="padding-left:25px" width="12%"  data-title="'Texco No'" filter="{texcono: 'text'}">{{l.texcono}}</td>
                  <td style="padding-left:25px" width="10%"  data-title="'Category'" filter="{jobcode: 'text'}">{{l.jobcode}}</td>
                  <td style="padding-left:25px" width="10%"  data-title="'Present Days'">{{l.pdays}}</td>
                  <td style="padding-left:25px" width="10%"  data-title="'ED'" >{{l.od1Items | number:1}}</td>
                  <td style="padding-left:25px" width="15%"  data-title="'Total Duties'">{{ l.pdays + l.od1Items  | number:1}}</td>
               </tr>
               <tr>
                  <td style="text-align: center;padding-left: 228px;" colspan="4">
                     Total
                  </td>
                  <td style="padding-left:25px">
                     <b><span id="addaysedit"></span></b>
                  </td>
                  <td style="padding-left:25px">
                     <b><span id="ed1daysedit"></span></b>
                  </td>
                  <td style="padding-left:25px">
                     <b><span id="ttdaysedit"></span></b>
                  </td>
               </tr>
            </table>
            <h5>Total No of Employees - <span id="empcountedit"></span></h5>
            <h5>Total No of Present Days - <span id="addayedit"></span> Days</h5>
            <h5>Total No of Extra Duties  - <span id="ed1dayedit"></span> Days</h5>
            <h5>Total No of Attendance Duty - <span id="tttdaysedit"></span> Days</h5>
         </div>
      </div>
      <div class="modal-footer">
         <button class="modal-action w
         aves-effect waves-green btn-flat" type="submit" ng-click="attendanceapproved(objattendance,selectedMembers,savetype, monthandyears, clientids, projectids,memberdetailss,1)" ng-disabled="SaveDisabled">
         Save
         </button> 
         <a href="" class="modal-action modal-close waves-effect btn-flat" ng-click="attendanceapproved(objattendance,selectedMembers,savetype, monthandyears, clientids, projectids,memberdetailss,2)" ng-disabled="SaveDisabled">Edit</a>
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
                        <div class="input-field col s12 l4">
                           <input id="clientdesc" readonly ng-model="objattendance.projectname">
                           <label for="project" class="active">Project</label>
                        </div>
                        <div class="input-field col s6 l2">
                           <label for="fromdate">Select Month :
                           </label>
                           <input name="month_year" id="month_year" class="month_year" type="text" ng-model="objattendance.monthandyear" ng-change="editattendance(objattendance.monthandyear,objattendance.clientid,objattendance.projectid)" autocomplete="off"/>
                        </div>
                        <div class="col s6 l4">
                           <label for="" style="font-size: 15px !important;font-weight: 700;color: #e41010;">Total Members : <span>{{TotalCount}}</span></label> <br>
                           <label for="" style="font-size: 15px !important;font-weight: 700;color: #e41010;">Total No of Present Duties : <span>{{TotalADDays}}</span></label> <br>
                           <label for="" style="font-size: 15px !important;font-weight: 700;color: #e41010;">Total No of ED Duties : <span>{{TotalEDDays | number:1}}</span></label> <br>
                        </div>
                       
                        <div class="row ">
                           <div class="col s12">
                              <div class="edcont">
                        <p>ED1 - 8hrs</P>
                        <p>ED2 - 4 hrs</p>
                        </div>
                           </div>
                           </div>
                        <div class="col s12"> 
                           <div id="scrollable-area">
                              <table ng-table="tableParams" class="table fixedheadertable" show-filter="true" fixed-table-headers="scrollable-area">
                                 <thead>
                                    <th width="2%">#</th>
                                    <th width="4%">
                                       <input type="checkbox" name="SelectItems" id="SelectItems" class="filled-in SelectItems"  ng-checked="model.SelectItems==1" ng-true-value="1" ng-false-value="0" ng-model="model.SelectItems"  ng-change="changeFunctions(members)"/>
                                       <label for="SelectItems"></label>
                                    </th>
                                    <th width="8%"> Name </th>
                                    <th width="5%"> Texco No </th>
                                    <th width="5%"> Category  </th>
                                    <th width="5%"> Duty </th>
                                    <th width="5%">  </th>
                                    <th ng-repeat="a in range(noOfDays) track by $index">{{$index + 1}}</th>
                                 </thead>
                                 <tbody>
                                    <tr ng-repeat="l in $data">
                                       <td width="2%"> {{Indexcount+($index+1)}}</td>
                                       <td width="4%"> &nbsp;&nbsp;&nbsp;
                                          
                                          <input type="checkbox" name="selectattendance" id="{{l.memberhistoryid}}select{{$index}}" class="filled-in selectattendance"  ng-checked="model.SelectItems == 1 || l.selectattendance == 1" ng-true-value="1" ng-false-value="0" ng-model="l.selectattendance" ng-change="AllchangeFunction(members,l.memberid,l.selectattendance,l.memberhistoryid)" ng-disabled ="(noOfDays <= l.prrdays || noOfDays <= l.dubdays) && l.selectattendance == 0"/>
                                          <label for="{{l.memberhistoryid}}select{{$index}}"></label>
                                       </td>
                                       <td width="8%" filter="{firstname: 'text'}" class="capitalize">{{l.firstname}}</td>
                                       <td width="5%" filter="{texcono : 'text'}">{{l.texcono}}</td>
                                       <td width="5%" filter="{jobcode: 'text'}">{{l.jobcode }}</td>
                                       <td width="5%" style="padding-left: 5px;padding-top: 0px;">
                                          <input style="margin: -8px 0px -16px 10px;
                                             border-bottom:none" type="text" value="AD" readonly/>
                                          <input style="margin: -3px 0px -16px 10px;
                                             border-bottom:none" type="text" value="ED 1" readonly/>
                                          <input style="margin: -3px 0px -16px 10px;
                                             border-bottom:none" type="text" value="ED 2" readonly ng-if="l.jobcode != 'DVR'"/>
                                          <label for="{{l.memberhistoryid}}"></label>
                                       </td>
                                       <td width="5%" style="padding-left: 5px;padding-top:10px;">
                                       
                                          <input type="checkbox" name="adselect" id="{{l.memberhistoryid}}adselect{{$index}}" class="filled-in adselect" ng-checked="l.adselect==1 && l.selectattendance == 1" ng-true-value="1" ng-false-value="0" ng-model="l.adselect" ng-change="adSelectChange(members,l.adselect,l.memberid,l.selectattendance,l.memberhistoryid)" ng-disabled="l.selectattendance == 0" ng-if="l.jobcode != 'DVR'"/>
                                          <label for="{{l.memberhistoryid}}adselect{{$index}}" ng-if="l.jobcode != 'DVR'"></label>
                                          
                                          <input type="checkbox" name="ed1select" id="{{l.memberhistoryid}}ed1select{{$index}}" class="filled-in ed1select"  ng-checked="l.ed1select==1 && l.selectattendance == 1" ng-true-value="1" ng-false-value="0" ng-model="l.ed1select" ng-disabled="l.adselect == 0  && l.selectattendance == 0" ng-change="ed1SelectChange(members,l.ed1select,l.memberid,l.selectattendance,l.memberhistoryid)" ng-if="l.jobcode != 'DVR'"/>
                                          <label for="{{l.memberhistoryid}}ed1select{{$index}}" ng-if="l.jobcode != 'DVR'"></label>

                                          <input type="checkbox" name="ed2select" id="{{l.memberhistoryid}}ed2select{{$index}}" class="filled-in ed2select"  ng-checked="l.ed2select==1" ng-true-value="1" ng-false-value="0" ng-model="l.ed2select" ng-disabled="l.adselect == 0  && l.selectattendance == 0"  ng-change="ed2SelectChange(members,l.ed2select,l.memberid,l.selectattendance,l.memberhistoryid)" ng-if="l.jobcode != 'DVR'"/>
                                          <label for="{{l.memberhistoryid}}ed2select{{$index}}" ng-if="l.jobcode != 'DVR'"></label>

                                          <input type="checkbox" name="adselect" id="{{l.memberhistoryid}}adselect{{$index}}" class="filled-in adselect"  ng-checked="l.adselect==1 && l.selectattendance == 1" ng-true-value="1" ng-false-value="0" ng-model="l.adselect" ng-change="adSelectChange(members,l.adselect,l.memberid,l.selectattendance)" ng-disabled="l.selectattendance == 0" ng-if="l.jobcode == 'DVR'"/>
                                          <label for="{{l.memberhistoryid}}adselect{{$index}}" style="margin-top: -40px !important;" ng-if="l.jobcode == 'DVR'"></label>
                                       </td> 
                                       <td class="hovering" width="2%" style="padding-top:10px;" ng-if="l.jobcode != 'DVR'" ng-repeat="aas in TotalNoDays track by $index">
                                       <span class="tooltiptext">{{$index + 1}}</span>
                                          <input type="checkbox" name="present" id="{{l.memberhistoryid}}{{l.texcono}}ad{{aas}}" class="filled-in" ng-model="l.adval[l.memberhistoryid][aas]"  ng-true-value="1" ng-false-value="0" ng-change="ADchangeFunction(members,l.memberid,l.selectattendance,aas,l.adval[l.memberhistoryid][aas],1,l.texcono,l.jobcode,l.memberhistoryid)" ng-disabled="(l.selectattendance == 0 || (noOfDays <= l.prrdays || noOfDays <= l.dubdays) && l.adval[l.memberhistoryid][aas] == 0)" ng-checked="l.selectattendance == 1 && l.adselect == 1"/>
                                          <label for="{{l.memberhistoryid}}{{l.texcono}}ad{{aas}}"></label>
                                          
                                          <input type="checkbox" name="ed1" id="{{l.memberhistoryid}}{{l.texcono}}ed1{{aas}}" ng-disabled="(l.adselect == 1 || l.adselect == 0) && l.adval[l.memberhistoryid][aas] == 0" class="filled-in" ng-true-value="1" ng-false-value="0" ng-model="l.ed1val[l.memberhistoryid][aas]" ng-change="ADchangeFunction(members,l.memberid,l.selectattendance,aas,l.ed1val[l.memberhistoryid][aas],2,l.texcono,l.jobcode,l.memberhistoryid)" ng-checked="l.selectattendance == 1 && (l.ed1select  == 1 || l.ed1select  == 0) && l.ed1val[l.memberhistoryid][aas] == 1"/>
                                          <label for="{{l.memberhistoryid}}{{l.texcono}}ed1{{aas}}"></label>

                                          <input type="checkbox" name="ed2" id="{{l.memberhistoryid}}{{l.texcono}}ed2{{aas}}" ng-disabled="(l.adselect == 1 || l.adselect == 0) && l.adval[l.memberhistoryid][aas] == 0"   class="filled-in" ng-true-value=".5" ng-false-value="0" ng-change="ADchangeFunction(members,l.memberid,l.selectattendance,aas,l.ed2val[l.memberhistoryid][aas],3,l.texcono,l.jobcode,l.memberhistoryid)" ng-model="l.ed2val[l.memberhistoryid][aas]" ng-checked="l.selectattendance == 1 && l.ed2val[l.memberhistoryid][aas] == .5"/>
                                          <label for="{{l.memberhistoryid}}{{l.texcono}}ed2{{aas}}"></label>
                                       </td>
                                       <td width="4%" style="padding-left: 1px;padding-top: 10px;" ng-if="l.jobcode != 'DVR'">
                                          <input style="margin: -20px 0px -16px 0;border-bottom:none;pointer-events:none;" type="text" ng-model="l.pdays"/>
                                          <input style="margin: 0px 0px -16px 0;border-bottom:none;pointer-events:none;" type="text" ng-model="l.od1Items" />
                                          <input style="margin: 0px 0px -16px 0;border-bottom:none;pointer-events:none;" type="text" ng-model="l.od2Items" />
                                          <label for="{{l.memberid}}"></label>
                                       </td>
                                       <td width="2%" style="padding-top:10px;" ng-if="l.jobcode == 'DVR'" ng-repeat="aas in TotalNoDays track by $index">
                                          <input type="checkbox" name="present" id="{{l.memberhistoryid}}{{l.texcono}}ad{{aas}}" class="filled-in" ng-model="l.adval[l.memberhistoryid][aas]"  ng-true-value="1" ng-false-value="0" ng-change="ADchangeFunction(members,l.memberid,l.selectattendance,aas,l.adval[l.memberhistoryid][aas],1,l.texcono,l.jobcode,l.memberhistoryid)" ng-disabled="l.selectattendance == 0" ng-checked="l.selectattendance == 1 && l.adselect == 1"/>
                                          <label for="{{l.memberhistoryid}}{{l.texcono}}ad{{aas}}"></label>

                                          <input type="text" name="ot" id="{{l.memberhistoryid}}{{l.texcono}}ot{{aas}}" class="filled-in" ng-model="l.otval[l.memberhistoryid][aas]" ng-disabled="l.selectattendance == 0 || l.adval[l.memberhistoryid][aas] == 0"  ng-blur="OTchangeFunction(members,l.memberid,l.selectattendance,aas,l.otval[l.memberhistoryid][aas],2,l.texcono,l.memberhistoryid)" ng-min="1" ng-max="8" ng-value="0"/>
                                          <label for="{{l.memberhistoryid}}{{l.texcono}}ot{{aas}}"></label>
                                       </td>
                                       <td width="4%" style="padding-left: 4px;padding-top: 10px;" ng-if="l.jobcode == 'DVR'">
                                          <input style="margin: -42px 0px -16px 10px;border-bottom:none;pointer-events:none;" type="text" ng-model="l.pdays"/>
                                          <input style="margin: -4px 0px -16px 10px;border-bottom:none;pointer-events:none;" type="text" ng-model="l.othours" />
                                       </td>
                                    </tr>
                                 </tbody> 

                                 
                              </table>
                           </div>
                           <!-- <div id="scrollable-area">
                              <table ng-table="tableParams" class="table fixedheadertable" show-filter="true" fixed-table-headers="scrollable-area" ng-if="TotalCount == 0">
                                 <tbody>
                                    <tr class="ishold">
                                       <td colspan="5" class="emptymsg">No Record Found/Attendance already Submitted</td>
                                    </tr>
                                 </tbody>
                              </table>
                           </div> -->
                        </div>
                     </div>
                     <div class="row"  ng-if="TotalCount > 0">
                        <div id="failure" class="red-text"></div>
                        <div class="input-field col s6 l8">
                           <p>
                              <button class="btn waves-effect waves-light cyan darken-2" type="submit" ng-click="confirmsave(objattendance,selectedMembers,1,objattendance.monthandyear,objattendance.clientid,objattendance.projectid,memberdetails)">Save & Continue
                              </button>
                              <!-- <button class="btn waves-effect waves-light cyan darken-2" type="submit" ng-click="skipattendance(objattendance,1,objattendance.monthandyear,objattendance.clientid,objattendance.projectid,memberdetails)" ng-disabled="isSubmitDisabled" style="background-color: #a4ad1c !important;">Skip & Continue
                              </button> -->
                              <!-- <button class="btn waves-effect waves-light  green darken-2" type="submit" ng-click="confirmsave(objattendance,selectedMembers,2)" ng-disabled="isSubmitDisabled">Submit
                              </button> -->
                              <button class="btn waves-effect waves-light red darken-2" ng-disabled="isSubmitDisabled" type="button"  ng-click="cancelattendence()">
                              Cancel
                              </button>
                           </p>
                        </div>
                  </form>
                  </div>
                  <div id="success" class="green-text"></div>
                  </form> 
                  <!-- ng-if="memberdetails.length>0" -->
                  <div class="col s12 m12 l6">
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

<script type="text/javascript">
   $(function() {

      $("#SelectItems").click(function(){
         $('.selectattendance').not(this).prop('checked', this.checked);
      });


//
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
   
  $( document ).ready(function() { 
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
   });  
   
   

</script>

<style>
   #header-fixed { 
    position: fixed; 
    top: 0px; display:none;
    background-color:white;
}
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
   .tableFloatingHeaderOriginal { 
      width: 85.6% !important;
   height: 51px !important;
   }

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
.edcont {
   text-align: center;
    width: 118px;
    border: 1px solid #ea5656;
    padding: 5px 14px 14px 15px;
    margin: 0 auto;
}
.edcont p {

    color: #ea5656;
    font-size: 15px !important;
    font-weight: 700;
}
   /* .fixedheadertable thead
   {
      display: block;
   }

   .fixedheadertable tbody
   {
      height: 300px;
 overflow-y: scroll;
 display: block;
   } */
</style>