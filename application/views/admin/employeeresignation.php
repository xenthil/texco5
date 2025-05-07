<script type="text/javascript" src="
   <?php echo base_url("assets/js/app/employeeresignation.js")?>"></script>
<link rel="stylesheet" type="text/css" href="
   <?php echo base_url("assets/css/ng-table.min.css")?>" />
<script type="text/javascript" src="
   <?php echo base_url("assets/js/lib/ng-table.min.js")?>"></script>
<script type="text/javascript" src="
   <?php echo base_url("assets/js/lib/ui-bootstrap-tpls-0.11.0.js")?>"></script>
<div class="parallax-container" style="background-color: rgba(0, 12, 78, 0.9)">
   <div class="row">
      <div class="container">
         <div class="col s12 m6 l6">
            <div class="pagebannertext white-text">Job Resignation</div>
         </div>
         <div class="col s12 m6 l6 right-align">
            <div class="dumheight hide-on-small-only"></div>
            <div class="">
               <a href="
                  <?php echo base_url('admin/dashboard')?>" class="breadcrumb">Home
               </a><span class="breadcrumb">Jobs</span>
               <span class="breadcrumb">Job Resignation</span>
            </div>
         </div>
      </div>
   </div>
   <div class="parallax">
      <img src="
         <?php echo base_url("assets/images/breadcrumbbanner.jpg")?>">
   </div>
</div>
<div class="row" ng-app="appResign">
   <div class="container" ng-controller="ctrlResign">
      <!-- <div class="input-field col m3 s6">
         <input id="startdate" type="date" class="datepicker" type="text" ng-model="startdate" ng-change="searchbydate(startdate, enddate)">
         <label for="startdate">Start Date </label>
      </div>
      <div class="input-field col m3 s6">
         <input id="enddate" type="date" class="datepicker" type="text" ng-model="enddate" ng-change="searchbydate(startdate, enddate)">
         <label for="enddate">End Date</label>
      </div> -->
      <div id="" class="section">
         <div id="Client-details" class="col s12">
            <table ng-table="tableParams" class="responsive-table highlight striped bordered" show-filter="true" class="bordered" >
               <tr ng-repeat="employee in $data">
                <td width="4%" data-title="'SNO'">{{$index + 1}}</td>
                  <td width="8%" data-title="'SERVICE NO'" filter="{serviceno
                     : 'text'}">{{employee.serviceno}}</td>
                  <td width="8%" data-title="'TEXCO NO'" filter="{texcono: 'text'}">{{employee.texcono}}</td>
                   <td width="15%" data-title="'EMPLOYEE NAME'">{{employee.name}}</td>
                  <td width="8%" data-title="'PROJ NO'">{{employee.projectno}}</td>
                  <td width="15%" data-title="'PROJ NAME'">{{employee.projectname}}</td>
                  <!-- <td width="12%" data-title="'ADDRESS'" filter="{address1: 'text'}" sortable="'address1'">{{employee.address1}}, {{employee.address2}}, {{employee.address3}}</td> -->
                  <td width="12%" data-title="'JOB NAME'">{{employee.category}} 
                  </td>
                  <td width="10%" data-title="'DOJ'">{{employee.DOJ}} </td>
                  <!--  <td width="10%" data-title="'startdate'" ><input id="startdate" type="date" class="datepicker mem_{{meberid}}" type="text" ng-model="startdate" >
                     <label for="startdate">Confirm Date </label></td> -->
                  <!-- <?php if($roledata['permissions']['MJOBCONFIR']==1) {?> -->
                  <td width="50%" data-title="'REJECT'">
                     <a class="btn-floating btn-small red modal-trigger" href="#modal1"  ng-click="checkresignation(employee)" style="margin-left: 40% !important;">
                     <i class="material-icons">not_interested</i>
                     </a>
                  </td>
                  <!-- <?php } ?> -->
               </tr>
            </table>
          <!--   <pagination total-items="totalItems" ng-model="currentPage" max-size="maxSize" class="pagination-sm" boundary-links="true" rotate="false" num-pages="numPages" items-per-page="itemsPerPage"></pagination> -->
            <!-- Pagination -->
         </div>
      </div>
      <div id="modal1" class="modal modal-fixed-footer" style=" max-height:90%;">
         <div class="modal-content">
            <nav class="blue" style="position: fixed;margin-top: 0px; z-index:999;">
               <div class="left col s1 m1 l1">
                  <div class="white-text"><a href=""><i class="modal-action modal-close mdi white-text mdi-arrow-left"></i></a> </div>
               </div>
               <div class="col s11 m11 l11">
                  <div class="li white-text" id="mcaption">Employee Resignation</div>
               </div>
            </nav>
            <div class="row" style="padding: 24px;">
               <form ng-submit="employeeform.$valid && employeeresign(employee)" id="employeeform" name="employeeform" novalidate>
                  <div class="row" style="padding: 40px;">
                     <div class="row">
                        <div class="col s12">
                           <input type="hidden" ng-model="employee.employeeid">
                           <div class="row">
                              <div class="input-field col s6">
                                 <input id="firstname" name="firstname"  type="text" maxlength="150" minlength="3"  ng-class="{'submitted': submitted && employeeform.firstname.$invalid}" class="validate" type="text" ng-required="true" ng-model="employee.name" readonly>
                                 <label for="firstname" data-error="Required (min 3 chars)" style="Width:100%"> Name</label>
                              </div>
                              <div class="input-field col s6">
                                 <input id="serviceno" name="serviceno" type="text" maxlength="150"  ng-class="{'submitted': submitted && employeeform.serviceno.$invalid}"  class="validate" type="text" ng-required="true" ng-model="employee.serviceno" readonly>
                                 <label for="serviceno" data-error="Required">Service No(Army No)</label>
                              </div>
                           </div>
                           <div class="row">
                              <div class="input-field col s6">
                                 <input id="texcono"  name="texcono" type="text" maxlength="150"  ng-class="{'submitted': submitted && employeeform.texcono.$invalid}"  class="validate" type="text" ng-required="true" ng-model="employee.texcono" readonly>
                                 <label for="texcono" data-error="Required">Texco No</label>
                              </div>
                              <div class="input-field col s6">
                                 <input id="category"  name="category" type="text" maxlength="150"  ng-class="{'submitted': submitted && employeeform.category.$invalid}"  class="validate" type="text" ng-required="true" ng-model="employee.category" readonly>
                                 <label for="category" data-error="Required">Job</label>
                              </div>
                           </div>
                           <div class="row">
                           <div class="input-field col s6">
                                 <input id="projectno" type="text"  maxlength="150"  ng-class="{'submitted': submitted && employeeform.projectno.$invalid}"  class="validate" ng-required="true"  data-ng-model="employee.projectno" readonly>
                                 <label for="dor">Project No</label>
                              </div>
                             <div class="input-field col s6">
                                 <input id="resigndate" type="date" class="datepicker" type="text" data-ng-model="employee.resigndate">
                                 <label for="resigndate">Date of Resignation</label>
                              </div>
                           </div>
                           <div class="row">
                             <div class="input-field col s12">
                               <input id="reason"  name="reason" type="text" maxlength="150"  ng-class="{'submitted': submitted && employeeform.reason.$invalid}"  class="validate" type="text" ng-required="true" ng-model="employee.reason">
                                 <label for="reason" data-error="Required">Reason</label>
                              </div>
                            </div> 
                           <div id="failure" class="red-text"></div>
                        </div>
                     </div>
                  </div>
            </div>
         </div>
         <div class="modal-footer">
         <button class="waves-effect waves-green btn-flat" type="submit" ng-click="submitted=true;">
         Save
         </button>
         <a href="" class="modal-action modal-close waves-effect btn-flat ">Cancel</a>
         </div>
         </form>
      </div>
      <div>
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
   .striped {
   display: block;
   height: 500px;
   overflow-y: scroll;
   overflow-x: scroll;
   }
</style>
<script>
   $('.datepicker').pickadate({
     labelMonthNext: 'Go to the next month',
     labelMonthPrev: 'Go to the previous month',
     labelMonthSelect: 'Pick a month from the dropdown',
     labelYearSelect: 'Pick a year from the dropdown',
     selectMonths: true,
     selectYears: true,
     autoClose:true
   })
</script>