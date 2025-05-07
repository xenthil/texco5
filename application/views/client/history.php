<script type="text/javascript" src="<?php echo base_url("assets/js/app/history.js")?>"></script>
<link rel="stylesheet" type="text/css" href="<?php echo base_url("assets/css/ng-table.min.css")?>" />
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ng-table.min.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ui-bootstrap-tpls-0.11.0.js")?>"></script>
<script type="text/javascript"> var clientid = "<?php echo $this->session->userdata('clientid')?>" </script>

<div class="parallax-container" style="background-color: rgba(0, 12, 78, 0.9)">
   <div class="row">
      <div class="container">
         <div class="col s12 m6 l6">
            <div class="pagebannertext white-text">Job History</div>
         </div>
         <div class="col s12 m6 l6 right-align">
            <div class="dumheight hide-on-small-only"> </div>
            <div class=""> <a href="<?php echo base_url('client/dashboard')?>" class="breadcrumb">Home</a> <span class="breadcrumb">Job History</span> </div>
         </div>
      </div>
   </div>
   <div class="parallax"><img src="<?php echo base_url("assets/images/breadcrumbbanner.jpg")?>">
   </div>
</div>

<div class="row" ng-app="appClienthistory">
   <div class="container" ng-controller="ctrlClienthistory">
       <div class="input-field col m3 s6">
         <input id="startdate" type="date" class="datepicker" type="text" ng-model="startdate" ng-change="searchbydate(startdate, enddate)">
         <label for="startdate">Start Date </label>
      </div>
      <div class="input-field col m3 s6">
         <input id="enddate" type="date" class="datepicker" type="text" ng-model="enddate" ng-change="searchbydate(startdate, enddate)">
         <label for="enddate">End Date</label>
      </div>
      <div id="" class="section">
        <div id="Client-details" class="col s12">
           <table ng-table="tableParams" class="responsive-table highlight striped" show-filter="true" class="bordered">
              <tbody ng-repeat="applied in $data.slice(((currentPage-1)*itemsPerPage), ((currentPage)*itemsPerPage))">
                 <tr>
                    <td width="7%" data-title="'PROJ NO'" filter="{projectno: 'text'}" sortable="'projectno'">{{applied.projectno}}</td>

                    <td width="15%" data-title="'PROJ NAME'" filter="{projectname: 'text'}" sortable="'projectname'">{{applied.projectname}}</td>

                    <td width="10%" data-title="'REGION'" filter="{region: 'text'}" sortable="'region'">{{applied.region}}</td>

                    <td width="10%" data-title="'DISTRICT'" filter="{district: 'text'}" sortable="'district'">{{applied.district}}</td>

                    <td width="10%" data-title="'APPLIED DATE'" filter="{effectivedate: 'text'}" sortable="'effectivedate'">{{applied.effectivedate}}</td>

                    <td width="10%" data-title="'MEMBER'" filter="{firstname: 'text'}" sortable="'firstname'">{{applied.firstname}}  {{applied.lastname}}</td>

                    <td width="10%" data-title="'TEXCO NO'" filter="{newtexcono: 'text'}" sortable="'newtexcono'">{{applied.newtexcono}}</td>

                    <td width="10%" data-title="'JOB NAME'" filter="{jobname: 'text'}" sortable="'jobname'">{{applied.jobname}} - {{applied.jobcode}}</td>

                    <td width="10%" data-title="'STATUS'" filter="{status: 'text'}" sortable="'status'">{{applied.jobstatus}}   {{applied.currentvacancies}}</td>

                 </tr>
              </tbody>
           </table>
            <ul class="pagination theme-pagi">
                    <pagination total-items="totalItems" ng-model="currentPage" ng-change="pagelength()" class="pagination-sm" items-per-page="itemsPerPage"></pagination>
            </ul><!-- Pagination --> 
        </div>
      </div>
   </div>
</div>

<style type="text/css">
.ng-table-pager {
    display: none;
}
</style>
