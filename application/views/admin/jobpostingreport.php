<script type="text/javascript" src="<?php echo base_url("assets/js/app/jobpostingreport.js")?>"></script>
<link rel="stylesheet" type="text/css" href="<?php echo base_url("assets/css/ng-table.min.css")?>" />
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ng-table.min.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ui-bootstrap-tpls-0.11.0.js")?>"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.8.1/xlsx.full.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/2.6.0/jszip.min.js"></script>
<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.3/angular-sanitize.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/ng-csv/0.3.3/ng-csv.min.js"></script> -->
<div class="parallax-container" style="background-color: rgba(0, 12, 78, 0.9)">
   <div class="row">
      <div class="container">
         <div class="col s12 m6 l6">
            <div class="pagebannertext white-text" >Jobposting Report</div>
         </div>
         <div class="col s12 m6 l6 right-align">
            <div class="dumheight hide-on-small-only"> </div>
            <div class=""> <a href="<?php echo base_url('admin/dashboard')?>" class="breadcrumb">Home</a> <span class="breadcrumb">Jobposting Report</span> </div>
         </div>
      </div>
   </div>
   <div class="parallax"><img src="<?php echo base_url("assets/images/breadcrumbbanner.jpg")?>"></div>
</div>
<div  class="row" ng-app="appJobpostingreport" style="padding-top:30px;">
   <div  class="container" ng-controller="ctrlJobpostingreport">
      <div class ="col s12 m12 l12">
         <div class="row">
            <div class="input-field col s4">
               <select name="closedate" ng-model="objjobposting.closedate"  data-ng-options="d.closedate as d.closedate for d in date">
                  <option value="">All</option>
               </select>
               <label for="statusid">Close Date</label>
            </div>
         </div>
         <div class="row">
            <div class="col s12 m6 l6">
               <div class="card blue-grey lighten-1">
                  <div class="card-action">
                  <div class="card-content white-text">
                     <p class="text-black">You can View all Jobpostings, Agreement vacancies and Filledvacancies for a week.</p>
                  </div>
                     <button ng-click="submitjobposting(objjobposting.closedate)" class="btn cyan waves-effect waves-light" type="submit">View Jobpostings
                     <i class="mdi-content-send right"></i>
                     </button>
                  </div>
               </div>
            </div>
            <?php if($roledata['permissions']['EJREPORT']==1) {?>
            <div class="col s12 m6 l6">
               <div class="card blue-grey lighten-1">
                  <div class="card-action">
                   <div class="card-content white-text">
                     <p class="text-black">You can Export all Jobpostings, Agreement vacancies and Filledvacancies for a week to an excel file.</p>
                      </div>
                      <!-- ng-click="exportjobposting(objjobposting)" -->
                      <button  class="btn cyan waves-effect waves-light" type="submit"
                     ng-csv="JobPostingdetail" ng-click="exportjobposting(objjobposting.closedate)">Export Jobpostings
                     <i class="mdi-content-send right"></i>
                     </button>
                     <!-- <button  class="btn cyan waves-effect waves-light" type="submit"
                     ng-csv="JobPostingdetail" filename="JobPosting_Report.csv" csv-header="['client name', 'project no', 'projectname', 
                     'district', 'region','projectstatus', 'designation','addressline1', 'addressline2','addressline3', 'pincode', 'image']">Export Jobpostings
                     <i class="mdi-content-send right"></i>
                     </button> -->
                  </div>
               </div>
            </div>
            <?php } ?>
         </div>
      </div>
      <div>
         <table ng-table="tableParams" class="responsive-table highlight striped" show-filter="true" class="bordered">
            <tbody ng-repeat="item in $data">
               <tr>
                  <td width="7%" data-title="'SNO'">{{$index + 1}}</td>
                  <td width="7%" data-title="'EMPLOYER'" filter="{organization: 'text'}" sortable="'organization'">{{item.organization}}</td>
                  <td width="5%" data-title="'PROJ NO'" filter="{projectno: 'text'}" sortable="'projectno'">{{item.projectno}}</td>
                  <td width="7%" data-title="'PROJECT'" filter="{projectname: 'text'}" sortable="'projectname'">{{item.projectname}}</td>
                  <td width="7%" data-title="'REGION'" filter="{region: 'text'}" sortable="'region'">{{item.region}}</td>
                  <td width="7%" data-title="'DISTRICT'" filter="{district: 'text'}" sortable="'district'">{{item.district}}</td>
                  <td width="7%" data-title="'POSTED DATE'">{{item.posteddate}}</td>
                  <td width="4%" data-title="'CODE'" filter="{jobmastercode: 'text'}" sortable="'jobmastercode'">{{item.jobmastercode}}</td>
                  <td width="5%" data-title="'DESCRIPTION'" filter="{jobmastername: 'text'}" sortable="'jobmastername'">{{item.jobmastername}}</td>
                  <td width="6%" data-title="'POSTED VACANCIES'" filter="{postedvacancies: 'text'}" sortable="'postedvacancies'">{{item.numberofvacancies}}</td>
                  <td width="6%" data-title="'CONFIRMED VACANCIES'" filter="{filledvacancies: 'text'}" sortable="'filledvacancies'">{{item.filledvacancies}} </td> 
                  <td width="5%" data-title="'WAITING VACANCIES'" filter="{waitingvacancies: 'text'}" sortable="'waitingvacancies'">{{item.waitingvacancies}}</td>
               </tr>
            </tbody>
         </table>
        <!-- 
         -->
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
   table, td  {
   border: 1px solid #d0cdcd;
   border-collapse: collapse;
   }
</style>