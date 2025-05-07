<script type="text/javascript" src="<?php echo base_url("assets/js/app/adminattendance.js")?>"></script>
<script src="<?php echo base_url("assets/js/lib/angular-bootstrap-datepicker.js")?>" charset="utf-8"></script>
<link href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery-ui.css" rel="Stylesheet" type="text/css" />
<link href="<?php echo base_url("assets/css/datepicker.css")?>" rel="Stylesheet" type="text/css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.8.1/xlsx.full.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/2.6.0/jszip.min.js"></script>

<div class="parallax-container" style="background-color: rgba(0, 12, 78, 0.9)">
   <div class="row">
      <div class="container">
         <div class="col s12 m6 l6">
            <div class="pagebannertext white-text">Attendance
            </div>
         </div>
         <div class="col s12 m6 l6 right-align">
            <div class="dumheight hide-on-small-only"> 
            </div>
            <div class=""> 
               <a href="<?php echo base_url('client/dashboard')?>" class="breadcrumb">Home
               </a> 
               <span class="breadcrumb">Attendance
               </span> 
            </div>
         </div>
      </div>
   </div>
   <div class="parallax">
      <img src="<?php echo base_url("assets/images/breadcrumbbanner.jpg")?>">
   </div>
</div>
<div id="attendance" class="row" ng-app="appadminattendance">
<div class="container" ng-controller="ctrladminattendance">
   <div id="" class="section">
      <div class="row">
         <div id="Client-details" class="col s12">
            <div class="email-content-wrap">
               <div class="row">
                  <form id="attendanceform" ng-submit="attendanceform.$valid"  name="attendanceform" novalidate>
                     <div class="row">
                      <div class="input-field col s12 l2">
                                <select id="projectno" name="projectno" class="validate" ng-class="{'submitted': submitted && attendanceform.projectno.$invalid}" ng-model="objattendance.projectid"
                                data-ng-options=" p.projectid as p.projectno for p in projectnos"
                                ng-change="fillclientproject(objattendance.projectid)" >
                                </select><label for="projectno">Project No</label>
                            </div>
                           <div class="input-field col s12 l4">
                               <select id="client" name="client" class="validate"  ng-required="true"  ng-class="{'submitted': submitted && jobpostingform.client.$invalid}" ng-model="objattendance.clientid" data-ng-options=" c.clientid as c.organization for c in clients" ng-change="selectProject(objattendance.clientid)">
                               </select><label for="client">Client</label>
                           </div>
                     <!-- <div class="input-field col s12 l4">
                           <select id="client" name="client" class="validate"  ng-required="true"  ng-class="{'submitted': submitted && attendanceform.project.$invalid}"  ng-model="objattendance.clientid" data-ng-options="p.clientid as p.organization for p in clients" ng-change="getprojects(objattendance.clientid)">
                           </select>
                           <label for="project">Client
                           </label>
                        </div> -->
                        
                        <div class="input-field col s12 l4">
                           <select id="project" name="project" class="validate"  ng-required="true"  ng-class="{'submitted': submitted && attendanceform.project.$invalid}"  ng-model="objattendance.projectid" data-ng-options=" p.projectid as p.name for p in selectedprojects" ng-change="monthclear()">
                           </select>
                           <label for="project">Project
                           </label>
                        </div>
                        <div class="input-field col s6 l2">
                           <label for="fromdate">Select Month :
                           </label>
                           <input name="month_year" id="month_year" class="month_year" type="text" ng-model="objattendance.monthandyear" ng-change="editattendance(objattendance.monthandyear,objattendance.clientid,objattendance.projectid)"/>
                        </div>
                        <div class="col s12">
                           <table class="striped">
                              <tr>
                                 <th>Employees
                                 </th>
                                 <th>1
                                 </th>
                                 <th>2
                                 </th>
                                 <th>3
                                 </th>
                                 <th>4
                                 </th>
                                 <th>5
                                 </th>
                                 <th>6
                                 </th>
                                 <th>7
                                 </th>
                                 <th>8
                                 </th>
                                 <th>9
                                 </th>
                                 <th>10
                                 </th>
                                 <th>11
                                 </th>
                                 <th>12
                                 </th>
                                 <th>13
                                 </th>
                                 <th>14
                                 </th>
                                 <th>15
                                 </th>
                                 <th>16
                                 </th>
                                 <th>17
                                 </th>
                                 <th>18
                                 </th>
                                 <th>19
                                 </th>
                                 <th>20
                                 </th>
                                 <th>21
                                 </th>
                                 <th>22
                                 </th>
                                 <th>23
                                 </th>
                                 <th>24
                                 </th>
                                 <th>25
                                 </th>
                                 <th>26
                                 </th>
                                 <th>27
                                 </th>
                                 <th>28
                                 </th>
                                 <th>29
                                 </th>
                                 <th>30
                                 </th>
                                 <th>31
                                 </th>
                                 <th>Days
                                 </th>
                              </tr>
                              <tr ng-repeat="l in members" >
                                 <td style="overflow-wrap:  break-word;">
                                    {{l.firstname}} - {{l.serviceno}}
                                    <!-- <input type="checkbox" id="CheckAll" class="filled-in" /><label  for="CheckAll"></label> -->
                                 </td>
                                 <td> 
                                    <input type="checkbox" name="present" id="{{l.memberid}}1" class="filled-in" ng-checked="l.one == 1" ng-true-value="1" ng-false-value="0" ng-model="l.one" />
                                    <label for="{{l.memberid}}1"></label>
                                    <input type="checkbox" name="od" id="{{l.memberid}}2" class="filled-in" ng-checked="l.one == 2" ng-true-value="2" ng-false-value="0" ng-model="l.one"/>
                                    <label for="{{l.memberid}}2"></label>
                                 </td>
                                 <td> <input type="checkbox" name="present" id="{{l.memberid}}3" class="filled-in" ng-checked="l.two == 1" ng-true-value="1" ng-false-value="0" ng-model="l.two" />
                                    <label for="{{l.memberid}}3"></label>
                                    <input type="checkbox" name="od" id="{{l.memberid}}4" class="filled-in" ng-checked="l.two == 2" ng-true-value="2" ng-false-value="0" ng-model="l.two" />
                                    <label for="{{l.memberid}}4"></label>
                                 </td>
                                 <td> <input type="checkbox" name="present" id="{{l.memberid}}5"  class="filled-in" ng-checked="l.three == 1" ng-true-value="1" ng-false-value="0" ng-model="l.three" />
                                    <label for="{{l.memberid}}5"></label>
                                    <input type="checkbox" name="od" id="{{l.memberid}}6" class="filled-in" ng-checked="l.three == 2" ng-true-value="2" ng-false-value="0" ng-model="l.three" />
                                    <label for="{{l.memberid}}6"></label>
                                 </td>
                                 <td> <input type="checkbox" name="present" id="{{l.memberid}}7"  class="filled-in" ng-checked="l.four == 1" ng-true-value="1" ng-false-value="0" ng-model="l.four" />
                                    <label for="{{l.memberid}}7"></label>
                                    <input type="checkbox" name="od" id="{{l.memberid}}8" class="filled-in" ng-checked="l.four == 2" ng-true-value="2" ng-false-value="0" ng-model="l.four" />
                                    <label for="{{l.memberid}}8"></label>
                                 </td>
                                 <td> <input type="checkbox" name="present" id="{{l.memberid}}9" class="filled-in" ng-checked="l.five == 1" name="present" ng-true-value="1" ng-false-value="0" ng-model="l.five" />
                                    <label for="{{l.memberid}}9"></label>
                                    <input type="checkbox" name="od" id="{{l.memberid}}10" class="filled-in" ng-checked="l.five == 2" ng-true-value="2" ng-false-value="0" ng-model="l.five" />
                                    <label for="{{l.memberid}}10"></label>
                                 </td>
                                 <td> <input type="checkbox" name="present" id="{{l.memberid}}11" class="filled-in" ng-checked="l.six == 1" ng-true-value="1" ng-false-value="0" ng-model="l.six" />
                                    <label for="{{l.memberid}}11"></label>
                                    <input type="checkbox" id="{{l.memberid}}12" class="filled-in" ng-checked="l.six == 2" ng-true-value="2" ng-false-value="0" ng-model="l.six" />
                                    <label for="{{l.memberid}}12"></label>
                                 </td>
                                 <td> <input type="checkbox" name="present" id="{{l.memberid}}13" class="filled-in" ng-checked="l.seven == 1" ng-true-value="1" ng-false-value="0" ng-model="l.seven" />
                                    <label for="{{l.memberid}}13"></label>
                                    <input type="checkbox" id="{{l.memberid}}14" class="filled-in" ng-checked="l.seven == 2" ng-true-value="2" ng-false-value="0" ng-model="l.seven" />
                                    <label for="{{l.memberid}}14"></label>
                                 </td>
                                 <td> <input type="checkbox" name="present" id="{{l.memberid}}15" class="filled-in" ng-checked="l.eight == 1" ng-true-value="1" ng-false-value="0" ng-model="l.eight" />
                                    <label for="{{l.memberid}}15"></label>
                                    <input type="checkbox" id="{{l.memberid}}16" class="filled-in" ng-checked="l.eight == 2" ng-true-value="2" ng-false-value="0" ng-model="l.eight" />
                                    <label for="{{l.memberid}}16"></label>
                                 </td>
                                 <td> <input type="checkbox" name="present" id="{{l.memberid}}17" class="filled-in" ng-checked="l.nine == 1" ng-true-value="1" ng-false-value="0" ng-model="l.nine" />
                                    <label for="{{l.memberid}}17"></label>
                                    <input type="checkbox" id="{{l.memberid}}18" class="filled-in" ng-checked="l.nine == 2" ng-true-value="2" ng-false-value="0" ng-model="l.nine" />
                                    <label for="{{l.memberid}}18"></label>
                                 </td>
                                 <td> <input type="checkbox" name="present" id="{{l.memberid}}19" class="filled-in" ng-checked="l.ten == 1" ng-true-value="1" ng-false-value="0" ng-model="l.ten" />
                                    <label for="{{l.memberid}}19"></label>
                                    <input type="checkbox" id="{{l.memberid}}20" class="filled-in" ng-checked="l.ten == 2" ng-true-value="2" ng-false-value="0" ng-model="l.ten" />
                                    <label for="{{l.memberid}}20"></label>
                                 </td>
                                 <td> <input type="checkbox" name="present" id="{{l.memberid}}21" class="filled-in" ng-checked="l.eleven == 1" ng-true-value="1" ng-false-value="0" ng-model="l.eleven" />
                                    <label for="{{l.memberid}}21"></label>
                                    <input type="checkbox" id="{{l.memberid}}22"class="filled-in" ng-checked="l.eleven == 2" ng-true-value="2" ng-false-value="0" ng-model="l.eleven" />
                                    <label for="{{l.memberid}}22"></label>
                                 </td>
                                 <td> <input type="checkbox" name="present" id="{{l.memberid}}23" class="filled-in" ng-checked="l.twelve == 1" ng-true-value="1" ng-false-value="0" ng-model="l.twelve" />
                                    <label for="{{l.memberid}}23"></label>
                                    <input type="checkbox" id="{{l.memberid}}24" class="filled-in" ng-checked="l.twelve == 2" ng-true-value="2" ng-false-value="0" ng-model="l.twelve" />
                                    <label for="{{l.memberid}}24"></label>
                                 </td>
                                 <td> <input type="checkbox" name="present" id="{{l.memberid}}25" class="filled-in" ng-checked="l.thirteen == 1" ng-true-value="1" ng-false-value="0" ng-model="l.thirteen" />
                                    <label for="{{l.memberid}}25"></label>
                                    <input type="checkbox" id="{{l.memberid}}26" class="filled-in" ng-checked="l.thirteen == 2" ng-true-value="2" ng-false-value="0" ng-model="l.thirteen" />
                                    <label for="{{l.memberid}}26"></label>
                                 </td>
                                 <td> <input type="checkbox" name="present" id="{{l.memberid}}27" class="filled-in" ng-checked="l.fourteen == 1" ng-true-value="1" ng-false-value="0" ng-model="l.fourteen" />
                                    <label for="{{l.memberid}}27"></label>
                                    <input type="checkbox" id="{{l.memberid}}28" class="filled-in" ng-checked="l.fourteen == 2" ng-true-value="2" ng-false-value="0" ng-model="l.fourteen" />
                                    <label for="{{l.memberid}}28"></label>
                                 </td>
                                 <td> <input type="checkbox" name="present" id="{{l.memberid}}29" class="filled-in" ng-checked="l.fifteen == 1" ng-true-value="1" ng-false-value="0" ng-model="l.fifteen" />
                                    <label for="{{l.memberid}}29"></label>
                                    <input type="checkbox" id="{{l.memberid}}30" class="filled-in" ng-checked="l.fifteen == 2" ng-true-value="2" ng-false-value="0" ng-model="l.fifteen" />
                                    <label for="{{l.memberid}}30"></label>
                                 </td>
                                 <td> <input type="checkbox" name="present" id="{{l.memberid}}31" class="filled-in" ng-checked="l.sixteen == 1" ng-true-value="1" ng-false-value="0" ng-model="l.sixteen" />
                                    <label for="{{l.memberid}}31"></label>
                                    <input type="checkbox" id="{{l.memberid}}32" class="filled-in" ng-checked="l.sixteen == 2" ng-true-value="2" ng-false-value="0" ng-model="l.sixteen" />
                                    <label for="{{l.memberid}}32"></label>
                                 </td>
                                 <td> <input type="checkbox" name="present" id="{{l.memberid}}33" class="filled-in" ng-checked="l.seventeen == 1" ng-true-value="1" ng-false-value="0" ng-model="l.seventeen" />
                                    <label for="{{l.memberid}}33"></label>
                                    <input type="checkbox" id="{{l.memberid}}34" class="filled-in" ng-checked="l.seventeen == 2" ng-true-value="2" ng-false-value="0" ng-model="l.seventeen" />
                                    <label for="{{l.memberid}}34"></label>
                                 </td>
                                 <td> <input type="checkbox" name="present" id="{{l.memberid}}35" class="filled-in" ng-checked="l.eighteen == 1" ng-true-value="1" ng-false-value="0" ng-model="l.eighteen" />
                                    <label for="{{l.memberid}}35"></label>
                                    <input type="checkbox" id="{{l.memberid}}36" class="filled-in" ng-checked="l.eighteen == 2" ng-true-value="2" ng-false-value="0" ng-model="l.eighteen" />
                                    <label for="{{l.memberid}}36"></label>
                                 </td>
                                 <td> <input type="checkbox" name="present" id="{{l.memberid}}37" class="filled-in" ng-checked="l.nineteen == 1" ng-true-value="1" ng-false-value="0" ng-model="l.nineteen" />
                                    <label for="{{l.memberid}}37"></label>
                                    <input type="checkbox" id="{{l.memberid}}38" class="filled-in" ng-checked="l.nineteen == 2" ng-true-value="2" ng-false-value="0" ng-model="l.nineteen" />
                                    <label for="{{l.memberid}}38"></label>
                                 </td>
                                 <td> <input type="checkbox" name="present" id="{{l.memberid}}39" class="filled-in" ng-checked="l.twenty == 1" ng-true-value="1" ng-false-value="0" ng-model="l.twenty" />
                                    <label for="{{l.memberid}}39"></label>
                                    <input type="checkbox" id="{{l.memberid}}40" class="filled-in" ng-checked="l.twenty == 2" ng-true-value="2" ng-false-value="0" ng-model="l.twenty" />
                                    <label for="{{l.memberid}}40"></label>
                                 </td>
                                 <td> <input type="checkbox" name="present" id="{{l.memberid}}41" class="filled-in" ng-checked="l.twentyone == 1" ng-true-value="1" ng-false-value="0" ng-model="l.twentyone" />
                                    <label for="{{l.memberid}}41"></label>
                                    <input type="checkbox" id="{{l.memberid}}42" class="filled-in" ng-checked="l.twentyone == 2" ng-true-value="2" ng-false-value="0" ng-model="l.twentyone" />
                                    <label for="{{l.memberid}}42"></label>
                                 </td>
                                 <td> <input type="checkbox" name="present" id="{{l.memberid}}43" class="filled-in" ng-checked="l.twentytwo == 1" ng-true-value="1" ng-false-value="0" ng-model="l.twentytwo" />
                                    <label for="{{l.memberid}}43"></label>
                                    <input type="checkbox" id="{{l.memberid}}44" class="filled-in" ng-checked="l.twentytwo == 2" ng-true-value="2" ng-false-value="0" ng-model="l.twentytwo" />
                                    <label for="{{l.memberid}}44"></label>
                                 </td>
                                 <td> <input type="checkbox" name="present" id="{{l.memberid}}45" class="filled-in" ng-checked="l.twentythree == 1" ng-true-value="1" ng-false-value="0" ng-model="l.twentythree" />
                                    <label for="{{l.memberid}}45"></label>
                                    <input type="checkbox" id="{{l.memberid}}46" class="filled-in" ng-checked="l.twentythree == 2" ng-true-value="2" ng-false-value="0" ng-model="l.twentythree" />
                                    <label for="{{l.memberid}}46"></label>
                                 </td>
                                 <td> <input type="checkbox" name="present" id="{{l.memberid}}47" class="filled-in" ng-checked="l.twentyfour == 1" ng-true-value="1" ng-false-value="0" ng-model="l.twentyfour" />
                                    <label for="{{l.memberid}}47"></label>
                                    <input type="checkbox" id="{{l.memberid}}48" class="filled-in" ng-checked="l.twentyfour == 2" ng-true-value="2" ng-false-value="0" ng-model="l.twentyfour" />
                                    <label for="{{l.memberid}}48"></label>
                                 </td>
                                 <td> <input type="checkbox" name="present" id="{{l.memberid}}49" class="filled-in" ng-checked="l.twentyfive == 1" ng-true-value="1" ng-false-value="0" ng-model="l.twentyfive" />
                                    <label for="{{l.memberid}}49"></label>
                                    <input type="checkbox" id="{{l.memberid}}50" class="filled-in" ng-checked="l.twentyfive == 2" ng-true-value="2" ng-false-value="0" ng-model="l.twentyfive" />
                                    <label for="{{l.memberid}}50"></label>
                                 </td>
                                 <td> <input type="checkbox" name="present" id="{{l.memberid}}51" class="filled-in" ng-checked="l.twentysix == 1" ng-true-value="1" ng-false-value="0" ng-model="l.twentysix" />
                                    <label for="{{l.memberid}}51"></label>
                                    <input type="checkbox" id="{{l.memberid}}52" class="filled-in" ng-checked="l.twentysix == 2" ng-true-value="2" ng-false-value="0" ng-model="l.twentysix" />
                                    <label for="{{l.memberid}}52"></label>
                                 </td>
                                 <td> <input type="checkbox" name="present" id="{{l.memberid}}53" class="filled-in" ng-checked="l.twentyseven == 1" ng-true-value="1" ng-false-value="0" ng-model="l.twentyseven" />
                                    <label for="{{l.memberid}}53"></label>
                                    <input type="checkbox" id="{{l.memberid}}54" class="filled-in" ng-checked="l.twentyseven == 2" ng-true-value="2" ng-false-value="0" ng-model="l.twentyseven" />
                                    <label for="{{l.memberid}}54"></label>
                                 </td>
                                 <td> <input type="checkbox" name="present" id="{{l.memberid}}55" class="filled-in" ng-checked="l.twentyeight == 1" ng-true-value="1" ng-false-value="0" ng-model="l.twentyeight" />
                                    <label for="{{l.memberid}}55"></label>
                                    <input type="checkbox" id="{{l.memberid}}56" class="filled-in" ng-checked="l.twentyeight == 2" ng-true-value="2" ng-false-value="0" ng-model="l.twentyeight" />
                                    <label for="{{l.memberid}}56"></label>
                                 </td>
                                 <td> <input type="checkbox" name="present" id="{{l.memberid}}57" class="filled-in" ng-checked="l.twentynine == 1" ng-true-value="1" ng-false-value="0" ng-model="l.twentynine" />
                                    <label for="{{l.memberid}}57"></label>
                                    <input type="checkbox" id="{{l.memberid}}58" class="filled-in" ng-checked="l.twentynine == 2" ng-true-value="2" ng-false-value="0" ng-model="l.twentynine" />
                                    <label for="{{l.memberid}}58"></label>
                                 </td>
                                 <td> <input type="checkbox" name="present" id="{{l.memberid}}59" class="filled-in" ng-checked="l.thirty == 1" ng-true-value="1" ng-false-value="0" ng-model="l.thirty" />
                                    <label for="{{l.memberid}}59"></label>
                                    <input type="checkbox" id="{{l.memberid}}60" class="filled-in" ng-checked="l.thirty == 2" ng-true-value="2" ng-false-value="0" ng-model="l.thirty" />
                                    <label for="{{l.memberid}}60"></label>
                                 </td>
                                 <td> <input type="checkbox" name="present" id="{{l.memberid}}61" class="filled-in" ng-checked="l.thirtyone == 1" ng-true-value="1" ng-false-value="0" ng-model="l.thirtyone" />
                                    <label for="{{l.memberid}}61"></label>
                                    <input type="checkbox" id="{{l.memberid}}62" class="filled-in" ng-checked="l.thirtyone == 2" ng-true-value="2" ng-false-value="0" ng-model="l.thirtyone" />
                                    <label for="{{l.memberid}}62"></label>
                                 </td>
                                 <td> <input style="margin: -8px 0px -16px 0;
                                    border-bottom:none" type="text" ng-model="l.presentdays" />
                                    <input style="margin: -3px 0px -16px 0;
                                       border-bottom:none" type="text" ng-model="l.otdays" />
                                    <label for="{{l.memberid}}"></label>
                                 </td>
                              </tr>
                           </table>
                        </div>
                     </div>
                     <div class="row">
                        <div id="failure" class="red-text">
                        </div>
                        <div class="input-field col s6 l4">
                           <p>
                              <button class="btn waves-effect waves-light  cyan darken-2" type="submit" ng-click="saveattendance(objattendance, members)">Save
                              </button>
                              <button class="waves-green btn-flat" type="button"  ng-click="cancelattendence()">
                               Cancel
                              </button>
                              
                           </p>
                        </div>
                  </form>
                  </div>
                  <div id="success" class="green-text">
                  </div>
                  </form>
                  
                  <div class="col s12 m12 l6">
            <div class="card blue-grey lighten-1">
            <div class="card-content white-text"  style="height:200px;">
              <span class="card-title">Upload Attendance</span>
              <p class="text-black">You can Upload Attendance. Status,<span><a style="color: #fff;font-weight: bold;margin-left: 30px;text-decoration: underline;" href="<?php echo base_url("assets/document/sample/attendance.xlsx")?>" download> Download Sample</a></span>.
               <p style="padding-left: 25px">0 = ABSENT</p>
               <p style="padding-left: 25px">1 = PRESENT </p>
               <p style="padding-left: 25px">2 = OT(Over Time)</p>
              </p>
              <form action="#">
                <div class="file-field input-field">
                  <div class="btn">
                  <span>File</span>
                  <input type="file" name="file" id="file" class="form-control" onchange="angular.element(this).scope().UploadFile(this.files)" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel">
                  </div>
                  <div class="file-path-wrapper">
                  <input class="file-path validate" type="text" placeholder="Upload file">
                  </div>
                </div>
              </form>
            </div>
            <div class="card-action">
                  <input type="button" value="Import" class="btn btn-success"  ng-disabled="!SelectedFileForUpload"  ng-click="ParseExcelDataAndSave()" />
                  <span style="color:red">
                      {{Message}}
                  </span>
            </div>
          </div>
        </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
<script type="text/javascript">
   $(function() {
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
		
	});
	
$(".month_year").datepicker().on("changeDate", function(e) {
   $('.datepicker-dropdown').hide();
});
});	


</script> 
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
</style>