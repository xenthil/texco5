<script type="text/javascript" src="
   <?php echo base_url("assets/js/app/bankslip.js")?>"></script>
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
            <div class="pagebannertext white-text">Bank Slip</div>
         </div>
         <div class="col s12 m6 l6 right-align">
            <div class="dumheight hide-on-small-only"></div>
            <div class="">
               <a href="
                  <?php echo base_url('admin/dashboard')?>" class="breadcrumb">Home
               </a><span class="breadcrumb">Employers</span>
               <span class="breadcrumb">Bank Slip</span>
            </div>
         </div>
      </div>
   </div>
   <div class="parallax">
      <img src="<?php echo base_url("assets/images/breadcrumbbanner.jpg")?>">
   </div>
</div>
<div class="row" ng-app="pendingatt">
   <div class="container" ng-controller="pendingattctrl">
      <div class="input-field col m3 s6">
         <input name="month_year" id="month_year" class="month_year" type="text" ng-model="objattendance.monthandyear" ng-change="getbankslip(objattendance.monthandyear)"/>
         <label for="startdate">Start Date </label>
      </div>
      <div class="input-field col m6 s6">
      </div>
      <div class="input-field col m3 s6" style="padding-left: 180px;">
         <button class="btn waves-effect waves-light  cyan darken-2" type="submit" ng-click="saveattendance(objattendance, members)">Export
         </button>
      </div>
      <div id="" class="section">
         <div id="Client-details" class="col s12">
            <table ng-table="tableParams" class="responsive-table highlight striped" show-filter="true" class="bordered" >
               <tr ng-repeat="applied in $data">
                  <td width="5%" data-title="'S.No'">{{$index + 1}}</td>
                  <td width="8%" data-title="'Project No'" filter="{projectno: 'text'}">{{applied.projectno}}</td>
                  <td width="20%" data-title="'Project Name'" filter="{projectname: 'text'}" sortable="'projectname'">{{applied.projectname}}</td>
                  <td width="12%" data-title="'Month and Year'" filter="{monthandyear: 'text'}" sortable="'monthandyear'">{{applied.monthandyear}}</td>
                  <td width="15%" data-title="'Duties'" filter="{totalduties: 'text'}" sortable="'totalduties'"><span ng-repeat="duties in applied.totalduties">{{duties.name}}-{{duties.noofduties}}<br /></span></td>
                  <td width="10%" filter="{invoiceno: 'text'}" sortable="'invoiceno'" data-title="'Invoice'">
                     <a href="<?php echo base_url('admin/printinvoice?invoiceno={{applied.invoiceno}}')?>" target="_blank">{{applied.invoiceno}}</a>
                  </td>
                  <td width="10%" data-title="'Pay Slip'">
                     <a target="blank" href="
                        <?php echo base_url('admin/printpayslip?projectid={{applied.projectid}}&monthandyear={{applied.monthandyear}}')?>" class="btn-floating btn-small">
                     <i class="material-icons">print</i>
                     </a>
                     <a target="blank" href="
                        <?php echo base_url('admin/printfund?projectid={{applied.projectid}}&monthandyear={{applied.monthandyear}}')?>" class="btn-floating btn-small blue">
                     <i class="material-icons">visibility</i>
                     </a>
                  </td>
                  <td width="10%" data-title="'Status'">
                     Authorized
                  </td>
                  <td width="10%" data-title="'Bank Slip'">
                     <span ng-show="applied.status==5" >
                     <a class="btn-floating btn-small blue"  ng-click="generatebank(applied.projectid,applied.monthandyear)">
                     <i class="material-icons">done</i></a>
                     </span>
                     <span ng-show="applied.status==6" >
                     Slip Generated
                     </span>
                  </td>
                  <td style="padding-left: 25px;" width="10%" data-title="'Select'" >
                     <span ng-show="applied.status==6" >
                     <input type="checkbox" class="filled-in" id="chk_{{applied.projectid}}" name="chk_{{applied.projectid}}" ng-checked="applied.select" ng-model="applied.select" ng-change="selectreserve()"/>
                     <label for="chk_{{applied.projectid}}" data-error="Required"></label>
                     </span>
                  </td>
               </tr>
            </table>
         </div>
      </div>
   </div>
</div>
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