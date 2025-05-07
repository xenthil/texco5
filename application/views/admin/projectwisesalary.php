<script type="text/javascript" src="<?php echo base_url("assets/js/app/projectwisesalary.js")?>"></script>
<link rel="stylesheet" type="text/css" href="<?php echo base_url("assets/css/ng-table.min.css")?>" />
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ng-table.min.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ui-bootstrap-tpls-0.11.0.js")?>"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.8.1/xlsx.full.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.3/angular-sanitize.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/ng-csv/0.3.3/ng-csv.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/2.6.0/jszip.min.js"></script>
<script src="<?php echo base_url("assets/js/lib/angular-bootstrap-datepicker.js")?>" charset="utf-8"></script>
<link href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery-ui.css" rel="Stylesheet" type="text/css" />
<link href="<?php echo base_url("assets/css/datepicker.css")?>" rel="Stylesheet" type="text/css" />
<div class="parallax-container" style="background-color: rgba(0, 12, 78, 0.9)">
   <div class="row">
      <div class="container">
         <div class="col s12 m6 l6">
            <div class="pagebannertext white-text" >Project Wise Salary</div>
         </div>
         <div class="col s12 m6 l6 right-align">
            <div class="dumheight hide-on-small-only"> </div>
            <div class=""> <a href="<?php echo base_url('admin/dashboard')?>" class="breadcrumb">Home</a> <span class="breadcrumb">Project Wise Salary</span> </div>
         </div>
      </div>
   </div>
   <div class="parallax"><img src="<?php echo base_url("assets/images/breadcrumbbanner.jpg")?>"></div>
</div>
<div  class="row" ng-app="appProjectwisesalary" style="padding-top:30px;">
   <div  class="container" ng-controller="ctrlProjectwisesalary">
      <div class ="col s12 m12 l12">
         <div class="row">
         <div class="input-field col s4">
               <label for="fromdate">Month :
               </label>
               <input name="month_year" id="month_year" class="month_year" type="text" ng-model="objsalarymonth1.frommonthandyear" autocomplete = "off"/>
            </div>
            <!-- <div class="input-field col s4">
               <label for="fromdate">Close Month :
               </label>
               <input name="month_year" id="month_year" class="month_year" type="text" ng-model="objsalarymonth1.tomonthandyear" autocomplete = "off"/>
            </div> -->
         </div>
         <div class="row">
            <div class="col s12 m6 l6">
               <div class="card blue-grey lighten-1">
                  <div class="card-action">
                  <div class="card-content white-text">
                     <p class="text-black">You can View all Projects.</p>
                  </div>
                     <button ng-click="submitprojectwise(objsalarymonth1)" class="btn cyan waves-effect waves-light" type="submit">View Project Wise Salary
                     <i class="mdi-content-send right"></i>
                     </button>
                  </div>
               </div>
            </div>
            <?php if($roledata['permissions']['EPREPORT']==1) {?>
            <div class="col s12 m6 l6">
               <div class="card blue-grey lighten-1">
                  <div class="card-action">
                   <div class="card-content white-text">
                     <p class="text-black">You can Export all projects from an excel file.</p>
                      </div>
                      <!-- ng-click="exportprojectwise(objproject)" -->
                     <button ng-click="exportprojectwise(objsalarymonth1)" class="btn cyan waves-effect waves-light" type="submit" >Export Project Wise Salary
                     <i class="mdi-content-send right"></i>
                     </button>

                     <!-- <button class="btn cyan waves-effect waves-light" type="submit" 
                     ng-csv="salarymonth" filename="Salary_MonthWise.csv" csv-header="['SNO','PROJECT NAME','PROJECT NO','NO OF PERSONNEL','SALARY SLIP NO','CLAIM NO',
                     'SALARY DATE','CLAIM DATE','CLAIM AMOUNT','SALARY AMOUNT','DESCRIPION COLUMN']">Export Project_Wise_Salary
                     <i class="mdi-content-send right"></i>
                     </button> -->
                  </div>
               </div>
            </div>
            <?php } ?>
         </div>
      </div>
      <div>
    
         <table ng-table="tableParams" class="responsive-table highlight striped" fixed-table-headers="scrollable-area" show-filter="true" class="bordered">
            <tbody ng-repeat="salary in $data">
               <tr>
                  <td width="8%" data-title="'S NO'">{{$index + 1}}</td> 
                  <td width="20%" data-title="'PROJ NO / NAME'" filter="{projectno: 'text'}" sortable="'projectno'">{{salary.projectno}} / {{salary.name}} </td>
                  <td width="11%" data-title="'PAYSLIP NO'" filter="{payslipno: 'text'}" sortable="'payslipno'">{{salary.payslipno}}</td>
                  <td width="10%" data-title="'MONTH AND YEAR'">{{salary.monthandyear}}</td>
                  <td width="10%" data-title="'SALARY DATE'">{{salary.salarydate}}</td>
                  <td width="11%" data-title="'NO OF PERSONNEL'">{{salary.noofpersonnal}}</td>
                  <td width="10%" data-title="'PRESENT DAYS'">{{salary.totaldays}} </td>
                  <td width="10%" data-title="'ED DAYS'">{{salary.eddays}} </td>
                  <td width="10%" data-title="'TOTAL DAYS'">{{salary.totaldays + salary.eddays}} </td>
                  <td width="10%" data-title="'ED AMOUNT'">{{salary.edamount | number:2}} </td>
                  <td width="10%" data-title="'GROSS AMOUNT'">{{salary.grossamount | number:2}} </td>
                  <td width="10%" data-title="'NET AMOUNT'">{{salary.netpay | number:2}} </td>
               </tr>
            </tbody>
         </table>
       
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
   table, td  {
   border: 1px solid #d0cdcd;
   border-collapse: collapse;
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