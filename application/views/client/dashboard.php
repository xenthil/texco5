<script type="text/javascript" src="<?php echo base_url("assets/js/app/clientdashboard.js")?>"></script>
<link rel="stylesheet" type="text/css" href="<?php echo base_url("assets/css/ng-table.min.css")?>" />
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ng-table.min.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ui-bootstrap-tpls-0.11.0.js")?>"></script>
<link rel="stylesheet" type="text/css" href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.min.css">
<script src="
   <?php echo base_url("assets/js/lib/angular-bootstrap-datepicker.js")?>" charset="utf-8"></script>
<link href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery-ui.css" rel="Stylesheet" type="text/css" />
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.9.1/underscore-min.js"></script>
<link href="
   <?php echo base_url("assets/css/datepicker.css")?>" rel="Stylesheet" type="text/css" />
<script src="//d3js.org/d3.v3.min.js"></script>
<script type="text/javascript"> 
   var clientid = "<?php echo $this->session->userdata('clientid');?>"
</script>
<div class="parallax-container" style="background-color: rgba(0, 12, 78, 0.9)">
   <div class="row">
      <div class="container">
         <div class="col s12 m6 l6">
            <div class="pagebannertext white-text">Dashboard</div>
         </div>
         <div class="col s12 m6 l6 right-align">
            <div class="dumheight hide-on-small-only"> </div>
            <div class=""> <a href="<?php echo base_url('client/dashboard')?>" class="breadcrumb">Home</a> <span class="breadcrumb">Dashboard</span> </div>
         </div>
      </div>
   </div>
   <div class="parallax"><img src="<?php echo base_url(" assets/images/breadcrumbbanner.jpg ")?>">
   </div>
</div>
<br>
<div class="row" ng-app="appDashboard" ng-controller="ctrlDashboard" ng-cloak>
   <div class="row" style="padding-top: 10px;padding-bottom: 20px">
      <div class="col s12 m3 l3 clientes">
         <div class="clientes-content">
            <div class="content-title">
               <i class="mdi mdi-account-check"></i> 
               <span href="#" ng-show="currentproject">Number of Live Projects</span>
               <span href="#" ng-show="totalproject">Number of Projects</span>
            </div>
            <div class="number" ng-show="totalproject"><span style="font-family:arial;">{{totalprojcount}}</span>
               <a class="btn-floating btn-small green" ng-click="ListCurrentProjects()"  title="Live Projects Count" style="float:right"><i class="material-icons">sync_problem</i></a>
            </div>
            <div class="number" ng-show="currentproject"><span style="font-family:arial;">{{projectcount}}</span>
               <a class="btn-floating btn-small green" ng-click="ListTotalProjects()" title="Total Projects Count" style="float:right"><i class="material-icons">sync_problem</i></a>
            </div>
         </div>
      </div> 
      <div class="col s12 m3 l3  clientes">
         <div class="clientes-content">
            <div class="content-title">
               <i class="mdi mdi-tag"></i>
               <span href="#" ng-show="pendingamounts" style="margin-left:-5px;">Pending Amount
                  <a href="#" class="btn waves-effect waves-light btn-small" style="height: 32px;margin-top:-6px;width:120px;font-size:12px;">Pay Now</a>
               </span>
               <span href="#" ng-show="totalamounts" style="margin-left:-5px;">Total Amount
                  <a href="#" class="btn waves-effect waves-light btn-small" style="height: 32px;margin-top:-6px;width:120px;font-size:12px;">Pay Now</a>
               </span>
            </div>
            <div class="number" ng-show="pendingamounts"><span style="font-family:arial;" class="blink_me_text">{{pendingamount | number:2}}</span>
               <a class="btn-floating btn-small green" ng-click="ListTotalAmounts()"  title="Pending Amount" style="float:right"><i class="material-icons">sync_problem</i></a>
            </div>
            <div class="number" ng-show="totalamounts"><span style="font-family:arial;">{{totalamount | number:2}}</span>
               <a class="btn-floating btn-small green" ng-click="ListPendingAmounts()" title="Total Amount" style="float:right"><i class="material-icons">sync_problem</i></a>
            </div>
         </div>
      </div>
      <div class="col s12 m3 l3 clientes">
         <div class="clientes-content">
            <div class="content-title">
               <i class="mdi mdi-tag"></i>
               <span href="#" ng-show="current">Num. of Current Employees</span>
               <span href="#" ng-show="total">Num. of Total Employees </span>
            </div>
            <a href="<?php echo base_url('client/printemployees?type=1')?>">
               <div class="number" ng-show="total"><span style="font-family:arial;">{{totalemployeecount}}</span>
                  <a class="btn-floating btn-small green" ng-click="ListCurrentEmployees()"  title="Current Employees Count" style="float:right"><i class="material-icons">sync_problem</i></a>
               </div>
            </a>
            <a href="<?php echo base_url('client/printemployees?type=2')?>">
               <div class="number" ng-show="current"><span style="font-family:arial;">{{employeecount}}</span>
                  <a class="btn-floating btn-small green" ng-click="ListTotalEmployees()" title="Total Employees Count" style="float:right"><i class="material-icons">sync_problem</i></a>
               </div>
            </a>
         </div>
      </div>
      <div class="col s12 m3 l3 clientes">
         <div class="clientes-content">
            <div class="content-title">
               <i class="mdi mdi-comment-account"></i>
               <span href="#" ng-show="pendinginvoice">Pending Invoice 
                     <a href="<?php echo base_url('client/invoicelist?type=2')?>" class="btn waves-effect waves-light btn-small" style="height: 32px;margin-top: -6px;">View</a>
               </span>
               <span href="#" ng-show="currentinvoice">Current Invoice
                     <a href="<?php echo base_url('client/invoicelist?type=1')?>" class="btn waves-effect waves-light btn-small" style="height: 32px;margin-top: -6px;">View</a>
               </span>
            </div>
            <a href="<?php echo base_url('client/invoicelist?type=2')?>">
               <div class="number" ng-show="pendinginvoice"><span class="blink_me_text" style="font-family:arial;">{{totalinvoices}}</span>
                  <a class="btn-floating btn-small green" ng-click="ListCurrentInvoice()"  title="Current Invoice" style="float:right;margin-right: 10px;"><i class="material-icons">sync_problem</i></a>
               </div>
            </a>
            <a href="<?php echo base_url('client/invoicelist?type=1')?>">
               <div class="number" ng-show="currentinvoice"><span style="font-family:arial;">{{currentinvoices}}</span>
                  <a class="btn-floating btn-small green" ng-click="ListPendingInvoices()" title="Pending Invoice " style="float:right;margin-right: 10px;"><i class="material-icons">sync_problem</i></a>
               </div>
            </a>
         </div>
      </div>
   </div>
   
   <div class="col s12 m12 l12" style="width: 100%;">
      <div class="col s12">
         <h5 class="blue-text">Holding Attendance</h5>
      </div>
      <div class="row" style="padding-left: 25px;padding-right: 10px;max-height:60%;overflow:auto;">              
         <table ng-table="tableParams" class="responsive-table highlight" show-filter="true" class="bordered" ng-show="holdattendance.length  > 0">
            <tr ng-repeat="applied in holdattendance">
               <td width="10%" data-title="'S.No'">{{$index+1}}</td>
               <td width="10%" data-title="'Client Name'" filter="{projectno: 'text'}" sortable="'projectno'">{{applied.clientname}}</td>
               <td width="10%" data-title="'Project No'" filter="{projectno: 'text'}" sortable="'projectno'">{{applied.projectno}}</td>
               <td width="15%" data-title="'Project Name'" filter="{projectname: 'text'}" sortable="'projectname'">{{applied.projectname}}</td>
               <td width="10%" data-title="'Month and Year'" filter="{region: 'text'}" sortable="'region'">{{applied.monthandyear}}</td>
               <td width="10%" data-title="'Review'" filter="{district: 'text'}" sortable="'district'"><button class="btn waves-effect waves-light  cyan darken-2" type="button"  ng-click="editattendance(applied)">Edit Attendnace
               </button></td>
            </tr>
         </table>
         <table ng-table="tableParams" class="responsive-table highlight" show-filter="true" class="bordered" ng-show="holdattendance.length  == 0">
            <thead>
               <tr>   
                  <th>S.No</th>
                  <th>Project No</th>
                  <th>Client Name</th>
                  <th>Project Name</th>
                  <th>Month and Year</th>
                  <th>Review</th> 
               </tr>
            </thead>
            <tbody>
               <tr>   
                  <td colspan="6" style="text-align:center;"  class="ishold">No Data Found</th>
               </tr>
            </tbody>
         </table>
      </div>
      <br><br>
   </div>

   <div class="col s12 m12 l12" style="width: 100%;">
      <div class="col s12">
         <h5 class="blue-text">Posted Members</h5>
      </div>
      <div class="row" style="padding-left: 25px;padding-right: 10px;max-height:60%;overflow:auto;">      
         <table ng-table="tableParams1" class="responsive-table highlight" show-filter="true" class="bordered" ng-show="postedmemberss.length  > 0">
            <tr ng-repeat="posted in postedmemberss"> 
               <td width="10%" data-title="'S.No'">{{$index+1}}</td>
               <td width="10%" data-title="'Employee Name'" filter="{projectno: 'text'}" sortable="'firstname'">{{posted.firstname}}</td>
               <td width="10%" data-title="'Texco No'" filter="{texcono: 'text'}" sortable="'texcono'">{{posted.texcono}}</td>
               <td width="10%" data-title="'Service No'" filter="{serviceno: 'text'}" sortable="'serviceno'">{{posted.serviceno}}</td>
               <td width="10%" data-title="'Project No / Name'" filter="{projectno: 'text'}" sortable="'projectno'">{{posted.projectno }} / {{ posted.projectname}}</td>
               <td width="10%" data-title="'Category'" filter="{category: 'text'}" sortable="'category'">{{posted.category}}</td>
               <td width="10%" data-title="'Posting Order Date'" filter="{startdate: 'text'}" sortable="'startdate'">{{posted.startdate | date:"dd-MM-yyyy"}}</td>
               <td width="10%" data-title="'Action'" filter="{district: 'text'}" sortable="'district'">
                  <a target="blank" ng-click="AcceptJobs(posted,1)" class="btn-floating waves-effect waves-light green">
                     <i class="material-icons">check_circle_outline</i>
                  </a>
                  <a target="blank" ng-click="AcceptJobs(posted,2)" class="btn-floating waves-effect waves-light red">
                     <i class="material-icons">close</i>
                  </a>
               </td>
            </tr>
         </table>
         <table ng-table="tableParams1" class="responsive-table highlight" show-filter="true" class="bordered" ng-show="postedmemberss.length  == 0">
            <thead>
               <tr>   
                  <th>S.No</th>
                  <th>Employee Name</th>
                  <th>Texco No</th>
                  <th>Service No</th>
                  <th>Project No / Name</th>
                  <th>Category</th>
                  <th>Posting Order Date</th> 
               </tr>
            </thead>
            <tbody>
               <tr>   
                  <td colspan="7" style="text-align:center;" class="ishold">No Members Found</th>
               </tr>
            </tbody>
         </table>
      </div>
      <br><br>
   </div>

   <div class="col s12 m12 l12" style="width: 100%;">
      <div class="col s12">
         <h5 class="blue-text">Approved Working Members</h5>
      </div>
      <div class="row" style="padding-left: 25px;padding-right: 10px;max-height:60%;overflow:auto;">      
         <table ng-table="tableParams1" class="responsive-table highlight" show-filter="true" class="bordered" ng-show="workingmembers.length  > 0">
            <tr ng-repeat="postedd in workingmembers"> 
               <td width="10%" data-title="'S.No'">{{$index+1}}</td>
               <td width="10%" data-title="'Employee Name'" filter="{projectno: 'text'}" sortable="'firstname'">{{postedd.firstname}}</td>
               <td width="10%" data-title="'Texco No'" filter="{texcono: 'text'}" sortable="'texcono'">{{postedd.texcono}}</td>
               <td width="10%" data-title="'Service No'" filter="{serviceno: 'text'}" sortable="'serviceno'">{{postedd.serviceno}}</td>
               <td width="10%" data-title="'Project No / Name'" filter="{projectno: 'text'}" sortable="'projectno'">{{postedd.projectno }} / {{ postedd.projectname}}</td>
               <td width="10%" data-title="'Category'" filter="{category: 'text'}" sortable="'category'">{{postedd.category}}</td>
               <td width="10%" data-title="'Posting Order Date'" filter="{startdate: 'text'}" sortable="'startdate'">{{postedd.startdate | date:"dd-MM-yyyy"}}</td>
               <td width="10%" data-title="'Last Salary Date'" filter="{enddate: 'text'}" sortable="'enddate'">{{postedd.enddate | date:"dd-MM-yyyy"}}</td>
               <!-- <td width="10%" data-title="'Action'" filter="{district: 'text'}" sortable="'district'">
                  <a target="blank" ng-click="AcceptJobs(posted,1)" class="btn-floating waves-effect waves-light green">
                     <i class="material-icons">check_circle_outline</i>
                  </a>
                  <a target="blank" ng-click="AcceptJobs(posted,2)" class="btn-floating waves-effect waves-light red">
                     <i class="material-icons">close</i>
                  </a>
               </td> -->
            </tr>
         </table>
         <table ng-table="tableParams1" class="responsive-table highlight" show-filter="true" class="bordered" ng-show="workingmembers.length  == 0">
            <thead>
               <tr>   
                  <th>S.No</th>
                  <th>Employee Name</th>
                  <th>Texco No</th>
                  <th>Service No</th>
                  <th>Project No / Name</th>
                  <th>Category</th>
                  <th>Posting Order Date</th> 
               </tr>
            </thead>
            <tbody>
               <tr>   
                  <td colspan="7" style="text-align:center;" class="ishold">No Members Found</th>
               </tr>
            </tbody>
         </table>
      </div>
      <br><br>
   </div>

   <div class="col s12 m12 l6" style="width: 100%;">
      <br>
      <div class="col s12">
         <h5 class="blue-text">Upload Attendance</h5><br>
      </div>
      <form id="attendanceform" ng-submit="attendanceform.$valid"  name="attendanceform" novalidate>
         <div class="row" style="padding-left: 25px;padding-right: 10px;">
            <div class="row">
               <br>
               <div class="input-field col s12 l2">
                  <select id="projectno" name="projectno" class="validate" ng-class="{'submitted': submitted && attendanceform.projectno.$invalid}" ng-model="objattendance.projectid"
                     data-ng-options=" p.projectid as p.projectno for p in projectnos"
                     ng-change="fillclientproject(objattendance.projectid)" ></select>
                  <label for="projectno" style="top: 0rem !important;">Project No</label>
               </div>
               <div class="input-field col s12 l4">
                  <select id="project" name="project" class="validate"  ng-required="true"  ng-class="{'submitted': submitted && attendanceform.project.$invalid}"  ng-model="objattendance.projectid" data-ng-options=" p.projectid as p.name for p in selectedprojects" ng-change="monthclear()"></select>
                  <label for="project">Project
                  </label>
               </div>
               <div class="input-field col s6 l2">
                  <label for="fromdate">Select Month :
                  </label>
                  <input name="month_year" id="month_year" class="month_year" type="text" ng-model="objattendance.monthandyear" ng-change="editattendances(objattendance.monthandyear,objattendance.clientid,objattendance.projectid)"/>
               </div>
            </div>
            <div class="col s12 m12 l9">
               <div class="card blue-grey lighten-1">
                  <div class="card-content white-text">
                     <span class="card-title" tyle="padding-left: 15px">Upload Attendance</span>
                     <p class="text-black" tyle="padding-left: 15px">You can Upload Attendance.Status,
                     <p style="padding-left: 45px">0 = ABSENT &nbsp;&nbsp;&nbsp; 1 = PRESENT &nbsp;&nbsp;&nbsp; 2 = ED 1 (Over Time 8 Hours)  &nbsp;&nbsp;&nbsp; 3 = ED 2 (Over Time additional 8 Hours)</p>
                     <form action="#">
                        <div class="file-field input-field">
                           <div class="btn">
                              <span>File</span>
                              <input type="file" name="file" id="impfile" class="form-control" onchange="angular.element(this).scope().UploadFile(this.files)" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"   ng-disabled="!SelectedProjectForUpload">
                           </div>
                           <div class="file-path-wrapper">
                              <input class="file-path validate" id="valpath" type="text" placeholder="Upload file">
                           </div>
                        </div>
                        <input type="button" value="Import" class="btn btn-success"  ng-disabled="!SelectedFileForUpload"  ng-click="ParseExcelDataAndSave()"  ng-if="memberdetails.length>0"/>
                     </form>
                  </div>
               </div>
            </div>
         </div>
      </form>
      <br><br>
   </div>

  

   <div class="col s12 m12 l6" style="width: 100%;">
      <div class="col s12">
         <h5 class="blue-text">Job History</h5>
      </div>
      <div class="row" style="padding-left: 25px;padding-right: 10px;max-height:60%;overflow:auto;">
         <table ng-table="tableParams" class="responsive-table highlight" show-filter="true" class="bordered" ng-show="$count  != 0">
            <tr ng-repeat="applied in $data">
               <td width="5%" data-title="'S.No'">{{$index+1}}</td>
               <td width="7%" data-title="'Project No'" filter="{projectno: 'text'}" sortable="'projectno'">{{applied.projectno}}</td>
               <td width="15%" data-title="'Project Name'" filter="{projectname: 'text'}" sortable="'projectname'">{{applied.projectname}}</td>
               <td width="10%" data-title="'Region'" filter="{region: 'text'}" sortable="'region'">{{applied.region}}</td>
               <td width="10%" data-title="'District'" filter="{district: 'text'}" sortable="'district'">{{applied.district}}</td>
               <td width="10%" data-title="'Applied Date'" filter="{effectivedate: 'text'}" sortable="'effectivedate'">{{applied.effectivedate}}</td>
               <td width="10%" data-title="'Member'" filter="{firstname: 'text'}" sortable="'firstname'">{{applied.firstname}}  {{applied.lastname}}</td>
               <td width="10%" data-title="'Texco No'" filter="{newtexcono: 'text'}" sortable="'newtexcono'">{{applied.newtexcono}}</td>
               <td width="10%" data-title="'Job Name'" filter="{jobname: 'text'}" sortable="'jobname'">{{applied.jobname}} - {{applied.jobcode}}</td>
               <td width="10%" data-title="'Status'" filter="{status: 'text'}" sortable="'status'">{{applied.jobstatus}}   {{applied.currentvacancies}}</td>
            </tr>
         </table>
         <table ng-table="tableParams" class="responsive-table highlight" show-filter="true" class="bordered" ng-show="$count == 0">
            <thead>
               <tr>   
                  <th>S.No</th>
                  <th>Project No</th>
                  <th>Project Name</th>
                  <th>Region</th>
                  <th>District</th>
                  <th>Applied Date</th> 
               </tr>
            </thead>
            <tbody>
               <tr>   
                  <td colspan="6" style="text-align:center;" class="ishold">No Data Found</th>
               </tr>
            </tbody>
         </table>
      </div>
   </div>

   <div id="modalconfirm" class="modal modal-fixed-footer" aria-hidden="true">
      <div class="modal-content" style="overflow-y: hidden;">
         <nav class="blue" style="position: fixed;margin-top: 0px; z-index:999">
            <div class="left col s1 m1 l1">
                  <div class="white-text"><a href=""><i class="modal-action modal-close mdi white-text mdi-arrow-left"></i></a> </div>
            </div>
            <div class="col s11 m11 l11">
               <div class="li white-text" id="mcaption">Posting Order Confirmation</div>
            </div>
         </nav>
         <div class="row" style="padding: 60px;">
            <h5 id="mcaption1">Do you want to confirm this posting order ?</h5>
         </div>
      </div>
      <div class="modal-footer">
         <div class="col s12 m12 l12">
            <button id="apply" ng-disabled="isDisabled" class="waves-effect waves-light btn" type="submit" ng-click='jobconfirmPopup(clientid,memberhistoryid,memberid,status)' style="margin-left: 10px;">Yes</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button class="waves-effect btn red" type="button" ng-click='jobcancelclose()' ng-disabled="isDisabled">No
            </button>&nbsp;&nbsp;&nbsp;
         </div>
      </div>
   </div>

</div>
<style type="text/css">
   .ng-table-pager {
   display: none;
   }
   .clientes .content-title {
   background:#5f6163;
   }
   .clientes .content-title i {
   display: inline-block;
   padding: 0px 10px 1px 14px;
   color: #fff;
   font-size: 26px;
   }
   .clientes .content-title span {
   color: #fff;
   padding: 10px 0px;
   font-size: 18px;
   font-weight: 100;
   display: inline-block;
   font-family: 'Arial', sans-serif;
   letter-spacing: 0.5px;
   }
   .clientes {
   box-shadow: 5px 5px 5px rgba(0,0,0,0.3);
   }
   .clientes .clientes-content .number {
   color: #6d767b;
   font-family: 'Georgia', sans-serif;
   font-size: 18px;
   text-align: center;
   padding: 5px 0px;
   }
   .clientes .clientes-content .number span {
   color: #5f6163;
   font-size: 36px;
   }
   .striped {
   display: block;
   height: 600px;
   overflow-y: scroll;
   overflow-x: scroll;
   }
   .number {
      height:18%;
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
   div#modalconfirm {
      height: 200px;
   }
</style>