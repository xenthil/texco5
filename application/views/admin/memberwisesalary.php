<script type="text/javascript" src="<?php echo base_url("assets/js/app/memberwisesalary.js")?>"></script>
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
            <div class="pagebannertext white-text" >Member Wise Salary</div>
         </div>
         <div class="col s12 m6 l6 right-align">
            <div class="dumheight hide-on-small-only"> </div>
            <div class=""> <a href="<?php echo base_url('admin/dashboard')?>" class="breadcrumb">Home</a><span class="breadcrumb">Account Reports</span> <span class="breadcrumb">Member Wise Salary</span> </div>
         </div>
      </div>
   </div>
   <div class="parallax"><img src="<?php echo base_url("assets/images/breadcrumbbanner.jpg")?>"></div>
</div>
<div  class="row" ng-app="appMemberwisesalary" style="padding-top:30px;">
   <div  class="container" ng-controller="ctrlMemberwisesalary">
      <div class ="col s12 m12 l12">
         <div class="row">
            <div class="input-field col s4">
               <label for="fromdate">Month :
               </label>
               <input name="month_year" id="month_year" class="month_year" type="text" ng-model="objsalaryindividual.monthandyear"/>
            </div>
         </div>
         <div class="row">
            <div class="col s12 m6 l6">
               <div class="card blue-grey lighten-1">
                  <div class="card-action">
                  <div class="card-content white-text">
                     <p class="text-black">You can View all Members.</p>
                  </div>
                     <button ng-click="submitmemberwise(objsalaryindividual)" class="btn cyan waves-effect waves-light" type="submit">View Salary Individual Wise
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
                     <p class="text-black">You can Export all members to an excel file.</p>
                      </div>
                      <!-- ng-click="exportmemberwise(objproject)" -->
                     <button ng-click="exportmemberwise(objsalaryindividual)" class="btn cyan waves-effect waves-light" type="submit" >Export Salary Individual Wise
                     <i class="mdi-content-send right"></i>
                     </button>

                     <!-- <button class="btn cyan waves-effect waves-light" type="submit" 
                     ng-csv="salaryindividual" filename="Salary_IndividualWise.csv" csv-header="['SNO','PROJECT NAME','PROJECT NO','CLIENT ID','MEMBER ID','ATTENDANCE ID','NO OF PERSONNEL','SALARY SLIP NO','CLAIM NO',
                     'SALARY DATE','CLAIM DATE','CLAIM AMOUNT','SALARY AMOUNT','DESCRIPION COLUMN']">Export Salary_IndividualWise
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
            <tbody ng-repeat="applied in $data">
               <tr> 
                  <td width="7%" data-title="'S No'" >{{$index + 1}}</td>
                  <td width="7%" data-title="'Member Name'" sortable="'firstname'">{{applied.empname}} </td>
                  <td width="7%" data-title="'Service No'" filter="{serviceno: 'text'}" sortable="'serviceno'">
                     {{applied.serviceno}} </td>
                  <td width="7%" data-title="'Texco No'" filter="{texcono: 'text'}" sortable="'texcono'">
                     {{applied.texcono}} </td>
                  <td width="7%" data-title="'Project No'" filter="{projectno: 'text'}" sortable="'projectno'">
                     {{applied.projectno}}
                  </td> 
                  <td width="7%" data-title="'Project Name'" filter="{projectname: 'text'}" sortable="'projectname'">
                     {{applied.projectname}}
                  </td>
                  <td width="15%" data-title="'Payslip No'" filter="{payslipno: 'text'}" sortable="'payslipno'">{{applied.payslipno}} </td>
                  <td width="15%" data-title="'Individual Payslip No'" filter="{individualpayslipno: 'text'}" sortable="'individualpayslipno'">{{applied.individualpayslipno}} </td>
                  <td width="5%" data-title="'Month and Year'" filter="{monthandyear: 'text'}" sortable="'monthandyear'">{{applied.monthandyear}}</td>
                  <td width="7%" data-title="'Present Days'" filter="{presentdays: 'number'}" sortable="'presentdays'">{{applied.presentdays}} </td>
                  <td width="7%" data-title="'ED Days'" filter="{eddays: 'number'}" sortable="'eddays'">{{applied.eddays}}</td>
                  <td width="7%" data-title="'OT Hours'" filter="{othours: 'number'}" sortable="'othours'">{{applied.othours}}</td> 
                  <td width="7%" data-title="'Basic'" filter="{basic: 'number'}">{{applied.basic}}</td>
                  <td width="5%" data-title="'ED Amount'" filter="{edamount: 'number'}">{{applied.edamount}}</td>
                  <td width="7%" data-title="'Gross Pay'" filter="{grossamount: 'number'}">{{applied.grossamount}}</td>
                  <td width="5%" data-title="'Net Pay'" filter="{netpay: 'number'}">{{applied.netpay}}</td>
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