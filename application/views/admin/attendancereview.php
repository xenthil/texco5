<script type="text/javascript" src="
   <?php echo base_url("assets/js/app/attendancereview.js?v=1.1")?>"></script>
<link rel="stylesheet" type="text/css" href="
   <?php echo base_url("assets/css/ng-table.min.css")?>" />
<script type="text/javascript" src="
   <?php echo base_url("assets/js/lib/ng-table.min.js")?>"></script>
<script type="text/javascript" src="
   <?php echo base_url("assets/js/lib/ui-bootstrap-tpls-0.11.0.js")?>"></script>
   
<script src="<?php echo base_url("assets/js/lib/underscore.js")?>" charset="utf-8"></script>
<script src="
   <?php echo base_url("assets/js/lib/angular-bootstrap-datepicker.js")?>" charset="utf-8"></script>
<link href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery-ui.css" rel="Stylesheet" type="text/css" />
<link href="
   <?php echo base_url("assets/css/datepicker.css")?>" rel="Stylesheet" type="text/css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.8.1/xlsx.full.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/2.6.0/jszip.min.js"></script>
<script type="text/javascript"> var regionid = "<?php echo $this->session->userdata('regionid')?>" </script>
<div class="parallax-container" style="background-color: rgba(0, 12, 78, 0.9)">
   <div class="row">
      <div class="container">
         <div class="col s12 m6 l6">
            <div class="pagebannertext white-text">Attendance Review
            </div>
         </div>
         <div class="col s12 m6 l6 right-align">
            <div class="dumheight hide-on-small-only"></div>
            <div class="">
               <a href="
                  <?php echo base_url('client/dashboard')?>" class="breadcrumb">Home
               </a><span class="breadcrumb">Employers</span>
               <span class="breadcrumb">Attendance Review
               </span>
            </div>
         </div>
      </div>
   </div>
   <div class="parallax">
      <img src="
         <?php echo base_url("assets/images/breadcrumbbanner.jpg")?>">
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

   
   <div id="attenancesummarymodal" class="modal modal-fixed-footer">
      <div class="modal-content">
         <nav class="blue" style="position: fixed;margin-top: 0px; z-index:999;">
            <div class="left col s1 m1 l1">
               <div class="white-text"><a href=""><i class="modal-action modal-close mdi white-text mdi-arrow-left"></i></a> </div>
            </div>
            <div class="col s11 m11 l11">
               <div class="li white-text" id="mcaption">Attendance Summary</div>
            </div>
         </nav>
         <div class="row" style="padding: 61px 0px 0px 25px;width:100%;">
            <div class="row">
               <div class="col s12 m6 l6">
                  <h6> Project No/Name  -   <strong> {{objattendance.projectno}}/{{objattendance.projectname}} </strong></h6>
               </div>
               <div class="col s12 m3 l3">
                  <h6>  Attendance period - <strong> {{objattendance.monthandyear}}</strong></h6>
               </div>
               <div class="col s12 m3 l3">
                  <h6> Attendance Date - <strong> <?php echo date("d-m-Y") . "<br>";?> </strong></h6>
               </div>
            </div>
            <br>
 <div class="col s8 m8 l8">
      <div ng-repeat="review in reviewatt">
         <div class="cat-heading">
            <div class="col s4 m4 l4"> category:{{review.code}}</div>  <div class="col s4 m4 l4">No of Person:{{review.count}} </div> <div class="col s4 m4 l4">No of Duties:{{review.noofduties}} </div> 
         </div>
            <table ng-table="tableParams1" class="responsive-table highlight striped" show-filter="true" class="bordered" >
               <tr ng-repeat="la in review.details">
                  <td data-title="'S.No'" ng-class="{'redcolor': la.holdstatus == '1','bluecolor': la.edstatus == '1' && la.holdstatus == '1'}">{{$index + 1}}</td>
                  <td style="padding-left:25px" width="30%"  data-title="'Name'" ng-class="{'redcolor': la.holdstatus == '1','bluecolor': la.edstatus == '1' && la.holdstatus == '1'}">{{la.firstname}}</td>
                  <td style="padding-left:25px" width="12%"  data-title="'Texco No'" ng-class="{'redcolor': la.holdstatus == '1','bluecolor': la.edstatus == '1' && la.holdstatus == '1'}">{{la.texcono}}</td>
                  <td style="padding-left:25px" width="10%"  data-title="'A/C No'" ng-class="{'redcolor': la.holdstatus == '1','bluecolor': la.edstatus == '1' && la.holdstatus == '1'}">{{la.accountno}}</td>
                  <td style="padding-left:25px" width="10%"  data-title="'No of Duties'" ng-class="{'redcolor': la.holdstatus == '1','bluecolor': la.edstatus == '1' && la.holdstatus == '1'}">{{la.presentdays}}</td>
                  <td style="padding-left:25px" width="15%"  data-title="'ED Duties'" ng-class="{'redcolor': la.holdstatus == '1','orangecolor': la.edstatus == '1','bluecolor': la.edstatus == '1' && la.holdstatus == '1'}">
                     <span ng-show="l.code != 'DVR'">{{ la.eddays}}</span>   
                     <span ng-show="l.code == 'DVR'">{{la.othours}} - hrs ({{la.othours / 8}} days)</span>
                  </td>
                  <td style="padding-left:25px" width="10%"  data-title="'Total Duties'" ng-class="{'redcolor': la.holdstatus == '1','bluecolor': la.edstatus == '1' && la.holdstatus == '1'}">{{ la.presentdays + la.eddays }}</td>
               </tr>
               <tr>  
                  <td style="text-align: center;padding-left: 228px;" colspan="4">
                     Total
                  </td>
                  <td style="padding-left:25px">
                     <b><span id="addays">{{review.totalad}}</span></b>
                  </td>
                  <td style="padding-left:25px">
                     <b><span id="eddays">{{review.totaled}}</span></b>
                  </td>
                  <td style="padding-left:25px">
                     <b><span id="ttdays">{{review.noofduties}}</span></b>
                  </td>
               </tr>
            </table>
      </div>
       
            <h5>Total No of Employees - <span id="empcount">{{totalemp}}</span></h5>
            <h5>Total No of Present Duties - <span id="adday">{{totalnoofad}}</span> Days</h5>
            <h5>Total No of ED - <span id="ed1day">{{totalnoofed}}</span> Days</h5>
            <h5>Total No of Attendance Duty - <span id="tttdays">{{totalnofduties}}</span> Days</h5>
</div>
         
<div class="col s4 m4 l4" style="background: #00dff524;padding-right:10px !important;">
   
      <table>
        <tr><td>Name Of Project</td><td> {{agreementdetails[0].name}},{{agreementdetails[0].projectaddress1}},{{agreementdetails[0].projectaddress2}},{{agreementdetails[0].projectaddress3}}</td></tr>
        <tr><td>Agrement Period</td><td>{{agreementdetails[0].fromdate}} to {{agreementdetails[0].todate}}</td></tr>
        <tr><td>Authority Letter of Users</td><td></td></tr>
        <tr>
            <td>Wage Type / Area </td>
            <td>{{agreementdetails[0].wagetype}} <span ng-if="agreementdetails[0].wagearea"> / </span> {{agreementdetails[0].wagearea}}</td>
         </tr>
         <tr>
            <td> Wage Year / Category </td>
            <td> {{agreementdetails[0].wageyear}} / {{agreementdetails[0].categorycode}} -{{agreementdetails[0].ratecategory}}</td>
         </tr>
        <tr><td>No of Persons</td><td> <div class="autncount" ng-repeat="l in agreementdetails[0].authcount"><span>{{l.category}} - {{l.vacancy}}</span></div></td></tr>
        <tr><td>Rate per induvidual/8 hrs</td><td> <div class="ratecount" ng-repeat="l in agreementdetails[0].salaryamount"><span>{{l.category}}-Rs.{{l.amount}}</span></div></td></tr>
        <tr><td>Service Charges</td><td>{{agreementdetails[0].servicecharge}}</td></tr>
        <tr><td>Goods Service Tax</td><td>{{agreementdetails[0].tax}}</td></tr>
        <tr><td>Date of next Renewal</td><td>{{agreementdetails[0].next_renewal_date}}</td></tr>
        <tr><td>Claim to be addressed to</td><td>{{agreementdetails[0].contactname}},{{agreementdetails[0].clientaddress1}},{{agreementdetails[0].clientaddress2}},{{agreementdetails[0].clientaddress3}}</td></tr>
        <tr><td>Contact No of the Client</td><td>{{agreementdetails[0].mobile}}/{{agreementdetails[0].phone}}</td></tr>
        <tr><td> Gst No</td><td>{{agreementdetails[0].gstno}}</td></tr>
        
        <tr><td>Client Email</td><td>{{agreementdetails[0].email}}</td></tr>
        <tr><td>Pending details as on date</td><td> </td></tr>
        <tr><td>Man Power Details</td><td><table><tr><td>Items</td><td>Auth</td><td>Posted</td></tr> <tr ng-repeat="m in agreementdetails[0].manpower"><td>{{m.category}}</td><td>{{m.authvacancy}}</td><td>{{m.postedvqacacny}}</td></tr></table></td></tr>
      </table>
    </div>

      </div>
      
      </div>
      
      
      <div class="modal-footer">
         <button class="modal-action waves-effect waves-green btn-flat" type="submit" ng-disabled="AttendanceReviewed" ng-click="saveAttendance(objattendance)">
         Save
         </button> 
         <a href="" class="modal-action modal-close waves-effect btn-flat ">Cancel</a>
      </div>
      </form>
   </div>


   <div id="agreementsummarymodal" class="modal modal-fixed-footer">
      <div class="modal-content">
         <nav class="blue" style="position: fixed;margin-top: 0px; z-index:999;">
            <div class="left col s1 m1 l1">
               <div class="white-text"><a href=""><i class="modal-action modal-close mdi white-text mdi-arrow-left"></i></a> </div>
            </div>
            <div class="col s11 m11 l11">
               <div class="li white-text" id="mcaption">Aggrement Summary</div>
            </div>
         </nav>
         <div class="row" style="padding: 60px;width:100%;">
            <div class="row">
               <div class="col s6 m6 l6">
                  <h6> Project No - <strong> {{ agreementdetails[0].projectno }} </strong> </h6>
               </div>
               <div class="col s6 m6 l6">
                  <h6 style="float: right;"> Date - <strong> <?php echo date("d-m-Y") . "<br>"; ?> </strong></h6>
               </div>
            </div>

          
<div class="col s11 m11 l11">
   
      <table>
        <tr>
          <td>Name Of Project</td>
          <td>
            {{agreementdetails[0].name}},{{agreementdetails[0].projectaddress1}},{{agreementdetails[0].projectaddress2}},{{agreementdetails[0].projectaddress3}}
          </td>
         </tr>
        <tr><td>Agrement Period</td><td>{{agreementdetails[0].fromdate}} to {{agreementdetails[0].todate}}</td></tr>
        <tr><td>Authority Letter of Users</td><td></td></tr>
         <tr>
            <td>Wage Type / Area </td>
            <td>{{agreementdetails[0].wagetype}} <span ng-if="agreementdetails[0].wagearea"> / </span> {{agreementdetails[0].wagearea}}</td>
         </tr>
         <tr>
            <td> Wage Year / Category </td>
            <td> {{agreementdetails[0].wageyear}} / {{agreementdetails[0].categorycode}} - {{agreementdetails[0].ratecategory}}</td>
         </tr>
        <tr> 
            <td> No of Persons </td> <td><div class="autncount" ng-repeat="l in agreementdetails[0].authcount"><span>{{l.category}}-{{l.vacancy}}</span></div></td>
        </tr>
        <tr><td>Rate per induvidual/8 hrs</td><td> <div class="ratecount" ng-repeat="l in agreementdetails[0].salaryamount"><span>{{l.category}}-Rs.{{l.amount}}</span></div></td></tr>
        <tr><td>Service Charges</td><td>{{agreementdetails[0].servicecharge}}</td></tr>
        <tr><td>Goods Service Tax</td><td>{{agreementdetails[0].tax}}</td></tr>
        <tr><td>Date of next Renewal</td><td>{{agreementdetails[0].next_renewal_date}}</td></tr>
        <tr><td>Claim to be addressed to</td><td>{{agreementdetails[0].contactname}},{{agreementdetails[0].clientaddress1}},{{agreementdetails[0].clientaddress2}},{{agreementdetails[0].clientaddress3}}</td></tr>
        <tr><td>Contact No of the Client</td><td>{{agreementdetails[0].mobile}}/{{agreementdetails[0].phone}}</td></tr>
        <tr><td>Gst No</td><td>{{agreementdetails[0].gstno}}</td></tr>
        
        <tr><td>Client Email</td><td>{{agreementdetails[0].email}}</td></tr>
        <tr><td>Pending details as on date</td><td> </td></tr>
        <tr><td>Man Power Details</td><td><table><tr><td>Items</td><td>Auth</td><td>Posted</td></tr> <tr ng-repeat="m in agreementdetails[0].manpower"><td>{{m.category}}</td><td>{{m.authvacancy}}</td><td>{{m.postedvqacacny}}</td></tr></table></td></tr>
      </table>
    </div>

      </div>
      
      </div>
      
      
      <div class="modal-footer">
         
         <a href="" class="modal-action modal-close waves-effect btn-flat ">Close</a>
      </div>
      </form>
   </div>


   <div id="" class="section"  ng-hide="loading">
      <div id="modal1" class="modal modal-fixed-footer" style="height: 50%">
         <div class="modal-content">
            <nav class="blue" style="position: fixed;margin-top: 0px; z-index:999;">
               <div class="left col s1 m1 l1">
                  <div class="white-text"><a href=""><i class="modal-action modal-close mdi white-text mdi-arrow-left"></i></a> </div>
               </div>
               <div class="col s11 m11 l11">
                  <div class="li white-text" id="mcaption">Confirm Hold Attendance</div>
               </div>
            </nav>
            <div class="row" style="padding: 60px;">
               <h5>Are you sure do you want to hold ?</h5>
               <div class="input-field col s12 l12">
                  <input type="text" id="reason" name="reason" class="validate" ng-model="reason" />
                  <label for="reason">Reason
                  </label>
               </div>
            </div>
         </div>
         <div class="modal-footer">
            <button class="modal-action waves-effect waves-green btn-flat" type="submit" ng-click="holdattendancestatus(objattendance, members)" ng-disabled="isDisabled">
            Save
            </button>
            <a href="" class="modal-action modal-close waves-effect btn-flat ">Cancel</a>
         </div>
         </form>
      </div>
      <div class="row">
         <div id="Client-details" class="col s12">
            <div class="email-content-wrap">
               <div class="row">
                  <form id="attendanceform" ng-submit="attendanceform.$valid"  name="attendanceform" novalidate>
                     <div class="row">
                        <div class="input-field col s12 l2">
                           <!--<select id="projectno" name="projectno" class="validate" ng-class="{'submitted': submitted && attendanceform.projectno.$invalid}" ng-model="objattendance.projectid"
                              data-ng-options=" p.projectid as p.projectno for p in projectnos"
                              ng-change="fillclientproject(objattendance.projectid)" ng-required="true"></select>-->

                              <input type="text"  typeahead-on-select="fillclientproject1($item)" ng-model="objattendance.projectno" typeahead="p.projectid as p.projectno for p in projectnos | filter:$viewValue | orderBy:orderByStartsWith($viewValue) | limitTo:8" />  

                           <label for="projectno">Project No</label>
						   <small class="form-text text-muted errortextcaption" ng-show="showMsggenerateattendance || attendanceform.projectno.$error.required">Please Select Project No</small>
                        </div>
                        <div class="input-field col s12 l4">
                           <input id="clientdesc" readonly ng-model="objattendance.projectname">
                           <label for="project" class="active">Project</label>
                           <!-- <select id="project" name="project" class="validate"  ng-required="true"  ng-class="{'submitted': submitted && attendanceform.project.$invalid}"  ng-model="objattendance.projectid" data-ng-options=" p.projectid as p.name for p in selectedprojects" ng-change="monthclear()"></select>
                           <label for="project">Project
                           </label> -->
						    <small class="form-text text-muted errortextcaption" ng-show="showMsggenerateattendance || attendanceform.project.$error.required">Please Select Project</small>
                        </div>
                        <div class="input-field col s6 l2">
                           <label for="fromdate">Select Month :
                           </label>
                           <input ng-required="true" name="month_year" id="month_year" class="month_year validate commontxtboxcls" type="text" ng-model="objattendance.monthandyear" ng-change="reviewattendance(objattendance.monthandyear,objattendance.clientid,objattendance.projectid)" ng-class="{'submitted': submitted && attendanceform.month_year.$invalid}" autocomplete="off"/>
						         <small class="form-text text-muted errortextcaption" ng-show="monthandyearfldvalid">Please Select Month</small>
                        </div>
                        <div class="col s6 l4 reviewbtnalign" ng-show="objattendance.projectid">
                           <button class="btn waves-effect waves-light  cyan darken-2" type="submit" ng-click="viewAgreementDetails(objattendance.projectid)">View Agreement</button>  
                        </div>
                        <div class="col s12"  ng-show="ucounts > 0">
                           <br><br>
                           <div class="col s12" ng-hide="rejectedby =='' && reason ==''">
                              <div class="rejectedinfo">
                              <p>Rejected by : {{rejectedby}}
                           </p>
                           <p>Rejected Reason : {{reason}}
                           </p>
                        </div>
                           </div>

                           
                           <table ng-table="tableParams" class="responsive-table highlight striped" show-filter="true" class="bordered"> 
                              <tr ng-repeat="l in $data"  ng-init="particularIndex = $index">
                                 <td style="padding-left: 25px;" width="4%" data-title="'S.No'">{{$index + 1}}</td>
                                 <td style="text-align: left" width="7%" data-title="'Hold'" header="'ng-table/headers/checkbox.html'" >
                                    <input type="checkbox" class="filled-in" id="ishold_{{l.memberid}}" name="ishold_{{l.memberid}}" ng-checked="l.ishold" ng-model="l.ishold" ng-change="selectEntity(l.memberid,l.ishold,l.attendanceid)"/>
                                    <label for="ishold_{{l.memberid}}" data-error="Required"></label>
                                 </td> 
                                 <td style="padding-left: 25px;" width="12%"  data-title="'Name'" filter="{firstname: 'text'}" sortable="'firstname'" >{{l.firstname}}</td>
                                 <td style="padding-left: 25px;" width="7%"  data-title="'Texco No'" filter="{texcono: 'text'}" sortable="'texcono'">{{l.texcono}}</td>
                                 <td style="padding-left: 25px;" width="7%"  data-title="'Account No'" filter="{accountno: 'text'}" sortable="'accountno'">{{l.accountno}}</td>
                                 <td style="padding-left: 25px;" style="padding-left: 25px;" width="6%"  data-title="'Category'" filter="{code: 'text'}" sortable="'code'" >{{l.code}}</td>
                                 <td style="padding-left: 25px;" width="5%"  data-title="'AD'">{{ l.presentdays }}</td>
                                 <td style="padding-left: 25px;" width="5%"  data-title="'ED'"><span ng-show="l.code != 'DVR'">{{ l.eddays}}</span>   
                                    <span ng-show="l.code == 'DVR'">{{l.othours}} - hrs ({{l.othours / 8}} days)</span>
                                 </td>
                                 <td style="padding-left: 25px;" width="10%" data-title="'ED Hold'" header="'ng-table/headers/edhold.html'" >
                                    <span ng-show="l.code != 'DVR'">
                                       <input ng-disabled="l.eddays == '0'" type="checkbox" class="filled-in" id="edhold_{{l.memberid}}" name="edhold_{{l.memberid}}" ng-checked="l.isedhold == 1" ng-model="l.isedhold" ng-change="selectED(l.memberid,l.isedhold,l.attendanceid)"/>
                                       <label for="edhold_{{l.memberid}}" data-error="Required"></label>
                                    </span>
                                    <span ng-show="l.code == 'DVR'">
                                       <input ng-disabled="l.othours == '0'" type="checkbox" class="filled-in" id="isdvrhold_{{l.memberid}}" name="isdvrhold_{{l.memberid}}" ng-checked="l.isedhold == 1" ng-model="l.isedhold" ng-change="selectED(l.memberid,l.isedhold,l.attendanceid)"/>
                                       <label for="isdvrhold_{{l.memberid}}" data-error="Required"></label>
                                    </span>
                                 </td>
                                 <td style="padding-left: 25px;" width="12%"  data-title="'Other Allowance'" >
                                    <div>
                                       <span ng-repeat="oa in OtherAllowance" ng-init="particularIndex1">
                                          <input type="text" class="filled-in" id="otherallow_{{particularIndex}}_{{oa.lkvalid}}" name="otherallow_{{l.memberid}}_{{oa.lkvalid}}" name="otherallow_{{l.memberid}}_{{oa.lkvalid}}" placeholder="{{oa.description}}" ng-model="l.oeallow[particularIndex][oa.lkvalid]"/>
                                       </span>
                                    </div>
                                 </td>
                                 <td style="padding-left: 25px;" width="12%"  data-title="'Other Deductions'" >
                                    <div ng-repeat="od in OtherDeduction">
                                       <input type="text" class="filled-in" id="otherded_{{particularIndex}}_{{od.lkvalid}}" name="otherded_{{l.memberid}}_{{od.lkvalid}}" placeholder="{{od.description}}" ng-model="l.oededuction[particularIndex][od.lkvalid]"/>
                                    </div>
                                 </td>
                              </tr>
                              <tr>
                                 <td colspan="5"></td>
                                 <td colspan="2"> Total AD :- {{totalnoofad}} </td>
                                 <td colspan="2"> Total ED :- {{totalnoofed}} </td>
                                 <td colspan="2"> Total Duty :- {{totalnofduties}} </td>
                              </tr>
                           </table>
                           <br>
                        </div>
                     </div>
                     <div class="row" ng-show="ucounts > 0">
                        <div id="failure" class="red-text"></div>
                        <div class="input-field col s6 l4">
                           <p> 
                              <button class="btn waves-effect waves-light  cyan darken-2" type="submit" ng-click="updateattendancestatus(objattendance, members,'attendanceform',attendancedetails)">Generate
                              </button>
                           </p>
                     </div>
                  </form>
                  </div>
                  <div id="success" class="green-text"></div>
                  </form>
               </div>
            </div>
         </div>
      </div>
      <div class="row" ng-show="scounts > 0">
         <h4>Reviewed Attendance</h4>
         <div id="Client-details" class="col s12">
            <div class="row">
               <table ng-table="tableParams34" class="responsive-table highlight" show-filter="true" class="bordered"> 
                  <tr ng-repeat="l in $data">
                     <td width="10%" data-title="'S.No'" style="text-align:left;padding-left: 25px;">{{$index + 1}}</td>
                     <td width="15%"  data-title="'Name'" filter="{firstname: 'text'}" sortable="'firstname'"  style="text-align:left;padding-left: 25px;" class="capitalize">{{l.firstname}}</td>
                     <td width="15%"  data-title="'Texco No'" filter="{texcono: 'text'}" sortable="'texcono'"  style="text-align:left;padding-left: 25px;">{{l.texcono}}</td>
                     <td width="15%"  data-title="'Category'" filter="{code: 'text'}" sortable="'code'"  style="text-align:left;padding-left: 25px;">{{l.code}}</td>
                     <!-- <td width="10%"  data-title="'Wage Rate'"  style="text-align:left;padding-left: 25px;">{{l.wagerate}}</td>
                     <td width="10%"  data-title="'Service Charge %'"  style="text-align:left;padding-left: 25px;">{{l.servicecharge}}</td>
                     <td width="10%"  data-title="'Service Tax %'"  style="text-align:left;padding-left: 25px;">{{l.servicetax}}</td> -->
                     <td width="10%"  data-title="'AD'"  style="text-align:left;padding-left: 25px;">{{ l.presentdays }}</td>
                     <td width="10%"  data-title="'ED'"  style="text-align:left;padding-left: 25px;">
                        <span ng-show="l.code != 'DVR' && l.edhold == 0">{{ l.eddays}}</span>
                        <span ng-show="l.edhold == 1">0</span>
                        <span ng-show="l.code == 'DVR' && l.edhold == 0" >{{l.othours}} - hrs ({{l.othours / 8}} days)</span>
                     </td>
                  </tr>
               </table>
            </div>
         </div>
      </div>
      <div class="row" ng-show="hold.length > 0">
         <h4>Hold Attendance</h4>
         <div id="Client-details" class="col s12">
            <div class="email-content-wrap">
               <div class="row">
                  <form id="attendanceform" ng-submit="attendanceform.$valid"  name="attendanceform" novalidate>
                     <div class="row">
                        <div class="col s12">
                           <table ng-table="tableParams1" class="responsive-table highlight striped" show-filter="true" class="bordered" id="holdattencetbl">
                              <tr ng-repeat="h in $data" class="ishold">
                                 <td style="padding-left: 25px;" width="4%" data-title="'S.No'">{{$index + 1}}</td>
                                 <td style="padding-left: 25px;" width="12%"  data-title="'Name'" filter="{firstname: 'text'}" sortable="'firstname'" >{{h.firstname}}</td>
                                 <td style="padding-left: 25px;" width="7%"  data-title="'Texco No'" filter="{texcono: 'text'}" sortable="'texcono'">{{h.texcono}}</td>
                                 <td style="padding-left: 25px;" style="padding-left: 25px;" width="6%"  data-title="'Category'" filter="{code: 'text'}" sortable="'code'" >{{h.code}}</td>
                                 <!-- <td style="padding-left: 25px;" width="7%"  data-title="'Wage Rate'">{{h.wagerate}}</td>
                                 <td style="padding-left: 70px;" width="9%"  data-title="'Service Charge %'" >{{h.servicecharge}}</td>
                                 <td style="padding-left: 65px;" width="9%"  data-title="'Service Tax %'" >{{h.servicetax}}</td> -->
                                 <td style="padding-left: 25px;" width="5%"  data-title="'AD'">{{ h.presentdays }}</td>
                                 <td style="padding-left: 25px;" width="5%"  data-title="'ED'"><span ng-show="h.code != 'DVR'">{{ h.eddays}}</span>
                                    <span ng-show="h.code == 'DVR'">{{h.othours}} - hrs ({{h.othours / 8}} days)</span>
                                 </td>
                                 <td style="padding-left: 25px;" width="15%"  data-title="'Reason'">
                                    <input type="text" class="filled-in" placeholder="Hold Reason" ng-model="h.reasondetails"/>
                                    <!-- <select  ng-model="h.reasonid" class="validate" name="holdreason" data-ng-options=" r.lkvalid as r.description for r in holdreason">
                                    </select> -->
                                    <!-- <label for="holdreason">Hold Reason</label> -->
                                 </td>
                              </tr>
                           </table>
                        </div>
                     </div>
                     <div class="row">
                        <div id="failure" class="red-text"></div>
                        <div class="input-field col s6 l4">
                           <p>
                              <button class="btn waves-effect waves-light red lighten-2" type="submit" ng-click="holdattendancestatus(objattendance, members, hold)" ng-disabled="isDisabled">Hold
                              </button>
							  <small class="form-text text-muted errortextcaption" ng-show="showHoldAttendanceMsg">Please Select any one record for Hold attendance.</small>
                           </p>
                        </div>
                  </form>
                  </div>
                  <div id="success" class="green-text"></div>
                  </form>
               </div>
            </div>
         </div>
      </div>
      <div class="row" ng-show="edhold.length > 0">
         <h4>ED Hold Attendance</h4>
         <div id="Client-details" class="col s12">
            <div class="email-content-wrap">
               <div class="row">
                  <form id="attendanceform" ng-submit="attendanceform.$valid"  name="attendanceform" novalidate>
                     <div class="row">
                        <div class="col s12">
                           <table ng-table="tableParams2" class="responsive-table highlight striped" show-filter="true" class="bordered" id="edholdattencetbl">
                              <tr ng-repeat="l in $data">
                                 <td style="padding-left: 25px;" width="4%" data-title="'S.No'">{{$index + 1}}</td>
                                 <td style="padding-left: 25px;" width="12%"  data-title="'Name'" filter="{firstname: 'text'}" sortable="'firstname'" >{{l.firstname}}</td>
                                 <td style="padding-left: 25px;" width="7%"  data-title="'Texco No'" filter="{texcono: 'text'}" sortable="'texcono'">{{l.texcono}}</td>
                                 <td style="padding-left: 25px;" style="padding-left: 25px;" width="6%"  data-title="'Category'" filter="{code: 'text'}" sortable="'code'" >{{l.code}}</td>
                                 <!-- <td style="padding-left: 25px;" width="7%"  data-title="'Wage Rate'">{{l.wagerate}}</td>
                                 <td style="padding-left: 70px;" width="9%"  data-title="'Service Charge %'" >{{l.servicecharge}}</td>
                                 <td style="padding-left: 65px;" width="9%"  data-title="'Service Tax %'" >{{l.servicetax}}</td> -->
                                 <td style="padding-left: 25px;" width="5%"  data-title="'AD'">{{ l.presentdays }}</td>
                                 <td style="padding-left: 25px;" width="5%"  data-title="'ED'"><span ng-show="l.code != 'DVR'">{{ l.eddays}}</span>
                                    <span ng-show="l.code == 'DVR'">{{l.othours}} - hrs ({{l.othours / 8}} days)</span>
                                 </td>
                              </tr>
                           </table>
                        </div>
                     </div>
                     <div class="row">
                        <div id="failure" class="red-text"></div>
                        <div class="input-field col s6 l4">
                           <p>
                              <button class="btn waves-effect waves-light red lighten-2" type="submit" ng-click="edholdattendancestatus(objattendance, members,edhold)" ng-disabled="isedholdDisabled">ED Hold
                              </button> <small class="form-text text-muted errortextcaption" ng-show="showEDHoldAttendanceMsg">Please Select any one record for ED Hold attendance.</small>
                           </p>
                        </div>
                  </form>
                  </div>
                  <div id="success" class="green-text"></div>
                  </form>
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
          angular.element(controllerElement).scope().reviewattendance(monthandyear.value, projectid);
      });
       });
     });
   });
   
   $( document ).ready(function() { 

      var tdy=new Date();
      var date=tdy.getDate();
      
      if(date>=27){
         var edDate="today";
         console.log("today "+date);
      } else{
         var stDate=new Date();
         var sttDate=new Date();
         stDate.setMonth(stDate.getMonth());
         sttDate.setMonth(stDate.getMonth()-1);
         var edDate=stDate;
         var eddDate=sttDate;
         console.log("edDate "+ edDate);
      }


      $('.month_year').datepicker({
         format: 'MM yyyy',
         viewMode: "months", 
         minViewMode: "months",
         autoClose:true,
         endDate: "today"

      
      });
      
      $(".month_year").datepicker().on("changeDate", function(e) {
      $('.datepicker-dropdown').hide();
      });
   });   
</script>
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
</style>
<style type="text/css">
   .ishold {
   background-color:#ee6e7347 !important;
   }
   .reserve { 
   background-color: bisque !important; 
   };
   .edholds {
   background-color: lightskyblue !important;
   }

   .rejectedinfo {
    margin: 0 auto;
    text-align: center;
    width: 289px;
    border: 2px solid #ea5656;
    padding: 5px 14px 14px 15px;
    margin: 0 auto;
    margin-bottom: 25px;
    
}
.rejectedinfo p {
    color: #ea5656;
    font-weight:bold;
}
.dropdown-menu a {
    color: black;
}
;

</style>
<script type="text/ng-template" id="ng-table/headers/checkbox.html">
   <input type="checkbox" ng-model="model.allItemsSelected" ng-change="selectAll()" class="filled-in" id="ishold" name="filter-checkbox" value=""/>
      <label for="ishold" data-error="Required">Hold All</label>
</script>
<script type="text/ng-template" id="ng-table/headers/edhold.html">
   <input type="checkbox" ng-model="model.allEDSelected" ng-change="selectAllED()" class="filled-in" id="isedhold" name="filter-checkbox" value=""/>
    <label for="isedhold" data-error="Required">ED Hold</label>
</script>
<script type="text/ng-template" id="ng-table/headers/lvreserve.html">
   <input type="checkbox" ng-model="model.allreserveSelected" ng-change="selectAllreserve()" class="filled-in" id="isreserve" name="filter-checkbox" value=""/>
    <label for="isreserve" data-error="Required">Leave Reserve</label>
</script>