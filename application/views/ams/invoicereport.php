<script type="text/javascript" src="<?php echo base_url("assets/js/app/invoicereport.js")?>"></script>
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
            <div class="pagebannertext white-text" >Invoice Report</div>
         </div>
         <div class="col s12 m6 l6 right-align">
            <div class="dumheight hide-on-small-only"> </div>
            <div class=""> <a href="<?php echo base_url('admin/dashboard')?>" class="breadcrumb">Home</a> <span class="breadcrumb">Invoice Report</span> </div>
         </div>
      </div>
   </div>
   <div class="parallax"><img src="<?php echo base_url("assets/images/breadcrumbbanner.jpg")?>"></div>
</div>
<div  class="row" ng-app="appInvoicereport" style="padding-top:30px;">
   <div  class="container" ng-controller="ctrlInvoicereport">
      <div class ="col s12 m12 l12">
         <div class="row">
            <div class="input-field col s4">
               <select id="client" name="client" class="validate"  ng-required="true"  ng-class="{'submitted': submitted && Invoiceform.project.$invalid}"  ng-model="objinvoice.clientid" data-ng-options="p.clientid as p.organization for p in clients" ng-change="getprojects(objinvoice.clientid)">
                  <option value=""></option>
               </select>
               <label for="project">Client
               </label>
            </div>
            <div class="input-field col s4">
               <select id="project" name="project" class="validate"  ng-required="true"  ng-class="{'submitted': submitted && Invoiceform.project.$invalid}"  ng-model="objinvoice.projectid" data-ng-options=" p.projectid as p.name for p in selectedprojects" ng-change="getprojects(objinvoice.clientid)">
                  <option value=""></option>
               </select>
               <label for="project">Project
               </label>
            </div>
            <div class="input-field col s4">
               <label for="fromdate">Select Month :
               </label>
               <input name="month_year" id="month_year" class="month_year" type="text" ng-model="objinvoice.monthandyear"/>
            </div>
         </div>
         <div class="row">
            <div class="col s12 m6 l6">
               <div class="card blue-grey lighten-1">
                  <div class="card-action">
                     <div class="card-content white-text">
                        <p class="text-black">You can View all Invoice.</p>
                     </div>
                     <button ng-click="submitinvoice(objinvoice)" class="btn cyan waves-effect waves-light" type="submit">View Invoice
                     <i class="mdi-content-send right"></i>
                     </button>
                  </div>
               </div>
            </div>
            <?php if($roledata['permissions']['EIREPORT']==1) {?>
            <div class="col s12 m6 l6">
               <div class="card blue-grey lighten-1">
                  <div class="card-action">
                     <div class="card-content white-text">
                        <p class="text-black">You can Export all Invoice, from an excel file.</p>
                     </div>
                     <button ng-click="exportinvoice(objinvoice)" class="btn cyan waves-effect waves-light" type="submit">Export Invoice
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
                  <td width="5%" data-title="'S NO'">{{$index + 1}}</td>
                  <td width="6%" data-title="'EMPLOYER'" filter="{client: 'text'}" sortable="'client'">{{item.client}}</td>
                  <td width="5%" data-title="'PROJ NO'" filter="{projectno: 'text'}" sortable="'projectno'">{{item.projectno}}</td>
                  <td width="6%" data-title="'PROJ NAME'" filter="{projectname: 'text'}" sortable="'projectname'">{{item.projectname}}</td>
                  <td width="4%" data-title="'MONTH'" filter="{monthandyear: 'text'}" sortable="'monthandyear'">{{item.monthandyear}} </td>
                  <td width="3%" data-title="'JOB'" filter="{jobmastercode: 'text'}" sortable="'jobmastercode'">{{item.jobmastercode}}</td>
                  <td width="4%" data-title="'CATEGORY'" filter="{name: 'text'}" sortable="'name'">{{item.name}} </td>
                  <td width="4%" data-title="'TOT DUTIES'" filter="{noofduties: 'text'}" sortable="'noofduties'">{{item.noofduties}} </td>
                  <td width="4%" data-title="'CHARGES'" filter="{servicecharges: 'text'}" sortable="'servicecharges'">{{item.servicecharges}}</td>
                  <td width="4%" data-title="'TAX'" filter="{servicetax: 'text'}" sortable="'servicetax'">{{item.servicetax}}</td>
                  <td width="4%" data-title="'SALARY'" filter="{salaryamount: 'text'}" sortable="'salaryamount'">{{item.salaryamount}} </td>
                  <td width="4%" data-title="'TOTAL'" filter="{total: 'text'}" sortable="'total'">{{item.total}} </td>
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
