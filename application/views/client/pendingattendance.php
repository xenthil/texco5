<script type="text/javascript" src="
   <?php echo base_url("assets/js/app/pendingattendance.js")?>"></script>
<link rel="stylesheet" type="text/css" href="
   <?php echo base_url("assets/css/ng-table.min.css")?>" />
<script type="text/javascript" src="
   <?php echo base_url("assets/js/lib/ng-table.min.js")?>"></script>
<script type="text/javascript" src="
   <?php echo base_url("assets/js/lib/ui-bootstrap-tpls-0.11.0.js")?>"></script>
   <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.6/jquery.min.js" type="text/javascript"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js" type="text/javascript"></script>
<link href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery-ui.css" rel="Stylesheet" type="text/css" />
<div class="parallax-container" style="background-color: rgba(0, 12, 78, 0.9)">
   <div class="row">
      <div class="container">
         <div class="col s12 m6 l6">
            <div class="pagebannertext white-text">Pending Client List</div>
         </div>
         <div class="col s12 m6 l6 right-align">
            <div class="dumheight hide-on-small-only"></div>
            <div class="">
               <a href="
                  <?php echo base_url('admin/dashboard')?>" class="breadcrumb">Home
               </a>
               <span class="breadcrumb">Job Confirmation</span>
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
      
       <div class="input-field col s6 l3">
                           <label for="fromdate">Select Month :
                           </label>
                           <input name="monthandyear" id="monthandyear" class="monthYearPicker" type="text"  ng-model="monthandyear"/>
                        </div>
                        
      
      
      <div id="" class="section">
         <div id="Client-details" class="col s12">
            <table ng-table="tableParams" class="responsive-table highlight striped" show-filter="true" class="bordered" >
               <tr ng-repeat="applied in $data.slice(((currentPage-1)*itemsPerPage), ((currentPage)*itemsPerPage))">
                  <!-- <td id="mytd">
                     <input type="hidden" id="myhiddenfield" ng-model="applied.jobactivityid">
                  </td> -->
                  <td width="10%" data-title="'CLIENT ID'" filter="{projectno: 'text'}">{{applied.clientid}}</td>
                  <td width="15%" data-title="'PROJECT NAME'" filter="{projectname: 'text'}" sortable="'projectname'">{{applied.projectname}}</td>
                  <td width="20%" data-title="'MONTH AND YEAR'" filter="{region: 'text'}" sortable="'region'">{{applied.monthandyear}}</td>
                  <td width="15%" data-title="'NUMBER OF DUTIES'" filter="{district: 'text'}" sortable="'district'"><span ng-repeat="duties in applied.totalduties">{{duties.name}}-{{duties.noofduties}}<br /></span></td>
                
                  <td width="15%" data-title="'CITY'" filter="{jobname: 'text'}" sortable="'jobname'">{{applied.city}}</td>
                  <td width="15%" data-title="'APPROVE STATUS'" filter="{status: 'text'}" sortable="'status'">{{applied.approval}} </td>
                
                  <td width="50%">
                     <a class="btn-floating btn-small blue"  ng-click="approvestatus(applied.clientid,confirmcode)">
                     <i class="material-icons">done</i>
                     </a>
                     </td>
                     <td width="50%" >
                     <a class="btn-floating btn-small red"  ng-click="approvestatus(applied.clientid,rejectcode)">
                     <i class="material-icons">not_interested</i>
                     </a>
                  </td>
                  
               
               </tr>
            </table>
            <ul class="pagination theme-pagi">
               <pagination total-items="totalItems" ng-model="currentPage" ng-change="pagelength()" class="pagination-sm" items-per-page="itemsPerPage"></pagination>
            </ul>
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
</style>

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
        // var projectid = angular.element(document.getElementById('project')).scope().objattendance.projectid;
         var controllerElement = document.querySelector('[ng-controller="pendingattctrl"]');
         var controllerScope = angular.element(controllerElement).scope();
         controllerScope.$apply( function(){
        controllerScope.monthandyear = monthandyear.value;
          angular.element(controllerElement).scope().test(monthandyear);
      });
       });
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
</style>