<script type="text/javascript" src="
   <?php echo base_url("assets/js/app/pending.js")?>"></script>
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
            <div class="pagebannertext white-text">Pending Client List</div>
         </div>
         <div class="col s12 m6 l6 right-align">
            <div class="dumheight hide-on-small-only"></div>
            <div class="">
               <a href="
                  <?php echo base_url('admin/dashboard')?>" class="breadcrumb">Home
               </a>
               <span class="breadcrumb">Pending Client List</span>
            </div>
         </div>
      </div>
   </div>
   <div class="parallax">
      <img src="
         <?php echo base_url("assets/images/breadcrumbbanner.jpg")?>">
   </div>
</div>
<div class="row" ng-app="pendingmem">
   <div class="container" ng-controller="pendingmemctrl">
      
      
      <div id="" class="section">
         <div id="Client-details" class="col s12">
            <table ng-table="tableParams" class="responsive-table highlight striped" show-filter="true" class="bordered" >
               <tr ng-repeat="applied in $data.slice(((currentPage-1)*itemsPerPage), ((currentPage)*itemsPerPage))">
                  <!-- <td id="mytd">
                     <input type="hidden" id="myhiddenfield" ng-model="applied.jobactivityid">
                  </td> -->
                  <td width="10%" data-title="'CLIENT ID'" filter="{projectno: 'text'}">{{applied.clientid}}</td>
                  <td width="15%" data-title="'CLIENT NAME'" filter="{projectname: 'text'}" sortable="'projectname'">{{applied.organization}}</td>
                  <td width="20%" data-title="'EMAIL'" filter="{region: 'text'}" sortable="'region'">{{applied.email}}</td>
                  <td width="15%" data-title="'CONTACT NUMBER'" filter="{district: 'text'}" sortable="'district'">{{applied.mobile}}</td>
                  <td width="20%" data-title="'Address'" filter="{effectivedate: 'text'}" sortable="'effectivedate'">{{applied.addressline1}},{{applied.addressline2}},{{applied.addressline3}}</td>
                  <td width="15%" data-title="'CITY'" filter="{jobname: 'text'}" sortable="'jobname'">{{applied.city}}</td>
                  <td width="15%" data-title="'APPROVE STATUS'" filter="{status: 'text'}" sortable="'status'">{{applied.approval}} </td>
                  <?php if($roledata['permissions']['MJOBCONFIR']==1) {?>
                  <td width="50%">
                     <a class="btn-floating btn-small blue"  ng-click="approvestatus(applied.clientid,confirmcode,1)">
                     <i class="material-icons">done</i>
                     </a>
                     </td>
                     <td width="50%" >
                     <a class="btn-floating btn-small red"  ng-click="approvestatus(applied.clientid,rejectcode,0)">
                     <i class="material-icons">not_interested</i>
                     </a>
                  </td>
                  
                  <?php } ?>
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