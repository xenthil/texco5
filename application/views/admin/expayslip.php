<script type="text/javascript" src="
   <?php echo base_url("assets/js/app/expayslip.js")?>"></script>
<link rel="stylesheet" type="text/css" href="
   <?php echo base_url("assets/css/ng-table.min.css")?>" />
<script type="text/javascript" src="
   <?php echo base_url("assets/js/lib/ng-table.min.js")?>"></script>
<script type="text/javascript" src="
   <?php echo base_url("assets/js/lib/ui-bootstrap-tpls-0.11.0.js")?>"></script>
<script type="text/javascript">
   var clientid = 0;
   var regionid = <?php echo $_SESSION['regionid']; ?>;
   var roleid = <?php echo $_SESSION['roleid']; ?>;
</script>
<script src="
   <?php echo base_url("assets/js/lib/angular-bootstrap-datepicker.js")?>" charset="utf-8"></script>
<link href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery-ui.css" rel="Stylesheet" type="text/css" />
<link href="
   <?php echo base_url("assets/css/datepicker.css")?>" rel="Stylesheet" type="text/css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.8.1/xlsx.full.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/2.6.0/jszip.min.js"></script>
<script type="text/javascript" src="https://cdn.datatables.net/1.10.1/js/jquery.dataTables.min.js"></script>
<script type="text/javascript" src="https://cdn.datatables.net/responsive/1.0.0/js/dataTables.responsive.js"></script>
<link href="https://cdn.datatables.net/1.10.1/css/jquery.dataTables.css" rel="Stylesheet" type="text/css" />
<link href="https://cdn.datatables.net/responsive/1.0.0/css/dataTables.responsive.css" rel="Stylesheet" type="text/css" />
<div class="parallax-container" style="background-color: rgba(0, 12, 78, 0.9)">
   <div class="row">
      <div class="container">
         <div class="col s12 m6 l6">
            <div class="pagebannertext white-text">Ex-Servicemen Payslip
            </div>
         </div>
         <div class="col s12 m6 l6 right-align">
            <div class="dumheight hide-on-small-only"></div>
            <div class="">
               <a href="
                  <?php echo base_url('client/dashboard')?>" class="breadcrumb">Home
               </a><span class="breadcrumb">Employers</span>
               <span class="breadcrumb">Ex-Servicemen Payslip
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
      <div class="row"> <br>
         <div class="input-field col s12 l2">
            <select id="projectno" name="projectno" class="validate" ng-class="{'submitted': submitted && attendanceform.projectno.$invalid}" ng-model="objattendance.projectid"
               data-ng-options=" p.projectid as p.projectno for p in projectnos"
               ng-change="fillclientproject(objattendance.projectid)" ></select>
            <label for="projectno">Project No</label>
         </div>
         <div class="input-field col s12 l4">
            <input id="clientdesc" readonly ng-model="objattendance.projectname">
            <label for="project" class="active">Project</label>
            <small class="form-text text-muted errortextcaption" ng-show="showMsggenerateattendance || attendanceform.project.$error.required">Please Select Project</small>
         </div>
         <div class="input-field col s6 l2">
            <label for="fromdate">Select Month :
            </label>
            <input name="month_year" id="month_year" class="month_year" type="text" ng-model="objattendance.monthandyear" ng-change="editattendance(objattendance.monthandyear,objattendance.clientid,objattendance.projectid)"/>
         </div>
         <div class="col s12">
         	 <table ng-table="tableParams" class="responsive-table highlight striped" show-filter="true" class="bordered" >
	              <tr ng-repeat="l in $data">
	              	<td style="padding-left: 25px;" width="5%" data-title="'S.No'">{{$index + 1}}</td>
	              	<td style="padding-left: 25px;" width="15%"  data-title="'Name'" filter="{firstname: 'text'}" sortable="'firstname'" >{{l.firstname}}</td>
	                 <td style="padding-left: 25px;" width="8%"  data-title="'Texco No'" filter="{texcono: 'text'}" sortable="'texcono'">{{l.texcono}}</td>
	                 <td style="padding-left: 25px;" style="padding-left: 25px;" width="7%"  data-title="'Service No'" filter="{serviceno: 'text'}" sortable="'serviceno'" >{{l.serviceno}}</td>
                    <td style="padding-left: 25px;" style="padding-left: 25px;" width="7%"  data-title="'Category'" filter="{jobcode: 'text'}" sortable="'jobcode'" >{{l.jobcode}}</td>    
                    <td style="padding-left: 25px;" width="5%" data-title="'Print'">
                                    <a target="blank" href="
                        <?php echo base_url('admin/printexpayslip?salaryslipid={{l.salaryslipid}}')?>" class="btn-floating btn-small">
                     <i class="material-icons">print</i>
                     </a>
                     </td>     
	              </tr>
         	</table>
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