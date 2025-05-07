<script type="text/javascript" src="
   <?php echo base_url("assets/js/app/authorize.js")?>"></script>
<link rel="stylesheet" type="text/css" href="
   <?php echo base_url("assets/css/ng-table.min.css")?>" />
<script type="text/javascript" src="
   <?php echo base_url("assets/js/lib/ng-table.min.js")?>"></script>
<script type="text/javascript" src="
   <?php echo base_url("assets/js/lib/ui-bootstrap-tpls-0.11.0.js")?>"></script> 
<script src="<?php echo base_url("assets/js/lib/angular-bootstrap-datepicker.js")?>" charset="utf-8"></script>
<link href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery-ui.css" rel="Stylesheet" type="text/css" />
<link href="<?php echo base_url("assets/css/datepicker.css")?>" rel="Stylesheet" type="text/css" />

<div class="parallax-container" style="background-color: rgba(0, 12, 78, 0.9)">
   <div class="row">
      <div class="container">
         <div class="col s12 m6 l6">
            <div class="pagebannertext white-text">Authorize</div>
         </div>
         <div class="col s12 m6 l6 right-align">
            <div class="dumheight hide-on-small-only"></div>
            <div class="">
               <a href="
                  <?php echo base_url('admin/dashboard')?>" class="breadcrumb">Home
               </a>
               <span class="breadcrumb">Pay Slip</span>
            </div>
         </div>
      </div>
   </div>
   <div class="parallax">
      <img src="
         <?php echo base_url("assets/images/breadcrumbbanner.jpg")?>">
   </div>
</div>
<div class="row" ng-app="pendingatt">
   <div class="container" ng-controller="pendingattctrl">
   
    <div id="modal2" class="modal modal-fixed-footer" style="max-height:90%; width:90%">
            <div class="modal-content">
               <nav class="blue" style="position: fixed;margin-top: 0px; z-index:999">
        <div class="left col s1 m1 l1">
          <div class="white-text"><a href=""><i class="modal-action modal-close mdi white-text mdi-arrow-left"></i></a> </div>
        </div>
        <div class="col s11 m11 l11">
          <div class="li white-text" id="mcaption">View Attendance</div>
        </div>
      </nav>
       
       
        </div>
       
      <div class="input-field col m3 s6">
		<input name="month_year" id="month_year" class="month_year" type="text" ng-model="objattendance.monthandyear" ng-change="getpayslip(objattendance.monthandyear)"/>
         <label for="startdate">Start Date </label>
      </div>
      
      <div id="" class="section">
         <div id="Client-details" class="col s12">
            <table ng-table="tableParams" class="responsive-table highlight striped" show-filter="true" class="bordered" >
               <tr ng-repeat="applied in $data">
                  <!-- <td id="mytd">
                     <input type="hidden" id="myhiddenfield" ng-model="applied.jobactivityid">
                  </td> -->
                  <td width="10%" data-title="'PROJECTNO'" filter="{projectno: 'text'}">{{applied.projectno}}</td>
                  <td width="15%" data-title="'PROJECTNAME'" filter="{projectname: 'text'}" sortable="'projectname'">{{applied.projectname}}</td>
                  <td width="20%" data-title="'MONTHANDYEAR'" filter="{monthandyear: 'text'}" sortable="'monthandyear'">{{applied.monthandyear}}</td>
                  <td width="15%" data-title="'NUMBEROFDUTIES'" filter="{totalduties: 'text'}" sortable="'totalduties'"><span ng-repeat="duties in applied.totalduties">{{duties.name}}-{{duties.noofduties}}<br /></span></td>
                  <td width="20%" data-title="'GENERATE/ VIEW PAY SLIP'">
                    <span ng-show="applied.status==1" >
                     <a class="btn-floating btn-small blue"  ng-click="generatepayslip(applied.projectid,applied.monthandyear)">
                     <i class="material-icons">done</i>
                     </a>
                     </span>
                     <span ng-show="applied.status==3" >
                     <a target="blank" href="
                        <?php echo base_url('admin/printpayslip?projectid={{applied.projectid}}&monthandyear={{applied.monthandyear}}')?>" class="btn-floating btn-small">
                     <i class="material-icons">print</i>
                     </a>
                     <a target="blank" href="
                        <?php echo base_url('admin/printfund?projectid={{applied.projectid}}&monthandyear={{applied.monthandyear}}')?>" class="btn-floating btn-small red">
                     <i class="material-icons">attach_money</i>
                     </a>
                     </span>
                     <span ng-show="applied.status==4" >
                     <a target="blank" href="
                        <?php echo base_url('admin/printpayslip?projectid={{applied.projectid}}&monthandyear={{applied.monthandyear}}')?>" class="btn-floating btn-small">
                     <i class="material-icons">print</i>
                     </a>
                     <a target="blank" href="
                        <?php echo base_url('admin/printfund?projectid={{applied.projectid}}&monthandyear={{applied.monthandyear}}')?>" class="btn-floating btn-small red">
                     <i class="material-icons">attach_money</i>
                     </a>
                     </span>
                  </td>
               </tr>
            </table>
           <!--  <ul class="pagination theme-pagi">
               <pagination total-items="totalItems" ng-model="currentPage" ng-change="pagelength()" class="pagination-sm" items-per-page="itemsPerPage"></pagination>
            </ul> -->
            <!-- Pagination -->
         </div>
      </div>
   </div>
</div>
<!-- <script type="text/javascript">
   $("#mytd").html($("#myhiddenfield").val());
</script> -->
<style type="text/css">
   .ng-table-pager {
   display: none;
   }
    .datepicker-dropdown {
    top: 0;
    left: 0;
    position: absolute;
    background-color: #fff;
    width: 20%;
}
td {
    text-align: center;
}
.striped {
   display: block;
   height: 600px;
   overflow-y: scroll;
   overflow-x: scroll;
   }
</style>
<script>

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
