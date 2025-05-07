<script type="text/javascript" src="<?php echo base_url("assets/js/app/attendancereport.js")?>"></script>
<link rel="stylesheet" type="text/css" href="<?php echo base_url("assets/css/ng-table.min.css")?>" />
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ng-table.min.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ui-bootstrap-tpls-0.11.0.js")?>"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.8.1/xlsx.full.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/2.6.0/jszip.min.js"></script>
<script src="<?php echo base_url("assets/js/lib/angular-bootstrap-datepicker.js")?>" charset="utf-8"></script>
<link href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery-ui.css" rel="Stylesheet" type="text/css" />
<link href="<?php echo base_url("assets/css/datepicker.css")?>" rel="Stylesheet" type="text/css" />
<div class="parallax-container" style="background-color: rgba(0, 12, 78, 0.9)">
   <div class="row">
      <div class="container">
         <div class="col s12 m6 l6">
            <div class="pagebannertext white-text" >Attendance Report</div>
         </div>
         <div class="col s12 m6 l6 right-align">
            <div class="dumheight hide-on-small-only"> </div>
            <div class=""> <a href="<?php echo base_url('admin/dashboard')?>" class="breadcrumb">Home</a> <span class="breadcrumb">Attendance Report</span> </div>
         </div>
      </div>
   </div>
   <div class="parallax"><img src="<?php echo base_url("assets/images/breadcrumbbanner.jpg")?>"></div>
</div>
<div  class="row" ng-app="appAttendancereport" style="padding-top:30px;">
   <div  class="container" ng-controller="ctrlAttendancereport">
      <div class ="col s12 m12 l12">
         <div class="row">
            <div class="input-field col s4">
               <select id="client" name="client" class="validate"  ng-required="true"  ng-class="{'submitted': submitted && attendanceform.project.$invalid}"  ng-model="objattendance.clientid" data-ng-options="p.clientid as p.organization for p in clients" ng-change="getprojects(objattendance.clientid)">
                  <option value=""></option>
               </select>
               <label for="project">Client
               </label>
            </div>
            <div class="input-field col s4">
               <select id="project" name="project" class="validate"  ng-required="true"  ng-class="{'submitted': submitted && attendanceform.project.$invalid}"  ng-model="objattendance.projectid" data-ng-options=" p.projectid as p.name for p in selectedprojects" ng-change="getprojects(objattendance.clientid)">
                  <option value=""></option>
               </select>
               <label for="project">Project
               </label>
            </div>
            <div class="input-field col s4">
               <label for="fromdate">Select Month :
               </label>
               <input name="month_year" id="month_year" class="month_year" type="text" ng-model="objattendance.monthandyear"/>
            </div>
         </div>
         <div class="row">
            <div class="col s12 m6 l6">
               <div class="card blue-grey lighten-1">
                  <div class="card-action">
                     <div class="card-content white-text">
                        <p class="text-black">You can View all Attendance.</p>
                     </div>
                     <button ng-click="submitattendance(objattendance)" class="btn cyan waves-effect waves-light" type="submit">View Attendance
                     <i class="mdi-content-send right"></i>
                     </button>
                  </div>
               </div>
            </div>
            <?php if($roledata['permissions']['EATREPORT']==1) {?>
            <div class="col s12 m6 l6">
               <div class="card blue-grey lighten-1">
                  <div class="card-action">
                     <div class="card-content white-text">
                        <p class="text-black">You can Export all Attendance, from an excel file.</p>
                     </div>
                     <button ng-click="exportattendance(objattendance)" class="btn cyan waves-effect waves-light" type="submit">Export Attendance
                     <i class="mdi-content-send right"></i>
                     </button>
                  </div>
               </div>
            </div>
            <?php } ?>
         </div>
      </div>
      <div>
      <!-- <div class="row">
            <div class="input-field col s1 m1 l1">
               <label style="padding-left:25">Show</label>
            </div>
            <div class="input-field col s1 m1 l1">
               <select  ng-model="viewby" ng-change="setItemsPerPage(viewby)">
                  <option >10</option>
                  <option>25</option>
                  <option>50</option>
                  <option>100</option>
                  <option>All</option>
               </select>
            </div>
            <div class="input-field col s1 m1 l1">
               <label >Entries</label>
            </div>
         </div> -->
         <table ng-table="tableParams" class="responsive-table highlight striped" show-filter="true" class="bordered">
            <tbody ng-repeat="item in $data">
               <tr>
                 <td width="4%" data-title="'SNO'">{{$index + 1}}</td>
                  <td width="7%" data-title="'EMPLOYEE'" filter="{firstname: 'text'}" sortable="'firstname'">{{item.firstname}}</td>
                  <td width="5%" data-title="'TEXCO NO'" filter="{texcono: 'text'}" sortable="'texcono'">{{item.texcono}}</td>
                  <td width="7%" data-title="'PRESENT DAYS'" filter="{presentdays: 'text'}" sortable="'presentdays'">{{item.presentdays}}</td>
                  <td width="5%" data-title="'OT DAYS'" filter="{otdays: 'text'}" sortable="'otdays'">{{item.otdays}}</td>
                  <td width="5%" data-title="'PROJ NO'" filter="{projectno: 'text'}" sortable="'projectno'">{{item.projectno}}</td>
                  <td width="4%" data-title="'PROJ NAME'" filter="{projectname: 'text'}" sortable="'projectname'">{{item.projectname}} </td>
                  <td width="5%" data-title="'JOB CODE'" filter="{code: 'text'}" sortable="'code'">{{item.code}}</td>
                  <td width="4%" data-title="'CATEGORY'" filter="{category: 'text'}" sortable="'category'">{{item.category}} </td>
                  <td width="4%" data-title="'EMPLOYER'" filter="{organization: 'text'}" sortable="'organization'">{{item.organization}} </td>
                  <td width="4%" data-title="'MONTH AND YEAR'" filter="{monthandyear: 'text'}" sortable="'monthandyear'">{{item.monthandyear}} </td>
               </tr>
            </tbody>
         </table>
         <!-- <ul class="pagination theme-pagi">
            <pagination total-items="totalItems" ng-model="currentPage" max-size="maxSize" class="pagination-sm" boundary-links="true" rotate="false" num-pages="numPages" items-per-page="itemsPerPage"></pagination>
         </ul> -->
         <!-- Pagination --> 
      </div>
   </div>
</div>
<style type="text/css">
   .ng-table-pager {
   display: none;
   }
   .striped {
   display: block;
   height: 600px;
   overflow-y: scroll;
   overflow-x: scroll;
   }
</style>
<script type="text/javascript">
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
   .ng-table-pager {
   display: none;
   }
   .striped {
   display: block;
   height: 500px;
   overflow-y: scroll;
   overflow-x: scroll;
   }
    table, td  {
   border: 1px solid #d0cdcd;
   border-collapse: collapse;
   }
</style>