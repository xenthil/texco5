<script type="text/javascript" src="<?php echo base_url("assets/js/app/employeereport.js")?>"></script>
<link rel="stylesheet" type="text/css" href="<?php echo base_url("assets/css/ng-table.min.css")?>" />
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ng-table.min.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ui-bootstrap-tpls-0.11.0.js")?>"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.8.1/xlsx.full.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/2.6.0/jszip.min.js"></script>
<div class="parallax-container" style="background-color: rgba(0, 12, 78, 0.9)">
   <div class="row">
      <div class="container">
         <div class="col s12 m6 l6">
            <div class="pagebannertext white-text" >Employee Report</div>
         </div>
         <div class="col s12 m6 l6 right-align">
            <div class="dumheight hide-on-small-only"> </div>
            <div class=""> <a href="<?php echo base_url('admin/dashboard')?>" class="breadcrumb">Home</a> <span class="breadcrumb">Employee Report</span> </div>
         </div>
      </div>
   </div>
   <div class="parallax"><img src="<?php echo base_url("assets/images/breadcrumbbanner.jpg")?>"></div>
</div>
<div  class="row" ng-app="appEmployeereport" style="padding-top:30px;">
   <div  class="container" ng-controller="ctrlEmployeereport">
      <div class ="col s12 m12 l12">
         <div class="row">
            <div class="input-field col s4">
               <select name="districtid" ng-model="objemployee.districtid"  data-ng-options=" d.lkvalid as d.description for d in district">  <option value=""></option> 
               </select>
               <label for="districtid">District</label>
            </div>
            <div class="input-field col s4">
               <select name="regionid" ng-model="objemployee.regionid"  data-ng-options=" r.lkvalid as r.description for r in region">
                <option value=""></option> 
               </select>
               <label for="regionid">Region</label>
            </div>
            <div class="input-field col s4">
               <select name="statusid" ng-model="objemployee.statusid"  data-ng-options=" d.lkvalid as d.description for d in status">
              <option value=""></option> 
               </select>
               <label for="statusid">Status</label>
            </div>
         </div>
         <div class="row">
            <div class="col s12 m6 l6">
               <div class="card blue-grey lighten-1">
                  <div class="card-action">
                  <div class="card-content white-text">
                     <p class="text-black">You can View all Employees.</p>
                  </div>
                     <button ng-click="submitemployee(objemployee)" class="btn cyan waves-effect waves-light" type="submit">View Employee
                     <i class="mdi-content-send right"></i>
                     </button>
                  </div>
               </div>
            </div>
            <?php if($roledata['permissions']['EEREPORT']==1) {?>
            <div class="col s12 m6 l6">
               <div class="card blue-grey lighten-1">
                  <div class="card-action">
                   <div class="card-content white-text">
                     <p class="text-black">You can Export all employees from an excel file.</p>
                      </div>
                     <button ng-click="exportemployee(objemployee)" class="btn cyan waves-effect waves-light" type="submit">Export Employee
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
            <tbody ng-repeat="applied in $data">
               <tr>
                  <td width="4%" data-title="'SNO'">{{$index + 1}}</td>
                   <td width="7%" data-title="'TEXCO NO'" filter="{texcono: 'text'}" sortable="'texcono'">{{applied.texcono}}</td>
                   <td width="7%" data-title="'SERVICE NO'" filter="{serviceno: 'text'}" sortable="'serviceno'">{{applied.serviceno}}</td>
                  <td width="7%" data-title="'EMPLOYEENAME'" filter="{firstname: 'text'}" sortable="'firstnamefirstname'">{{applied.firstname}} {{applied.lastname}}</td>
                  <td width="6%" data-title="'EMAIL'" filter="{email: 'text'}" sortable="'email'">{{applied.email}}</td>
                  <td width="7%" data-title="'MOBILE'" filter="{mobile: 'text'}" sortable="'mobile'">{{applied.mobile}}</td>
                  <td width="20%" data-title="'ADDRESS'" filter="{Address: 'text'}" sortable="'firstname'">{{applied.address}}  {{applied.village}} {{applied.taluk}}  {{applied.district}} {{applied.state}} {{applied.country}} {{applied.pincode}}</td>
                  <td width="7%" data-title="'DOB'" filter="{dob: 'text'}" sortable="'dob'">{{applied.dob}}</td>
                  <td width="7%" data-title="'RANK'" filter="{rank: 'text'}" sortable="'rank'">{{applied.rank}}</td>
                  <td width="7%" data-title="'CORPS'" filter="{corps: 'text'}" sortable="'corps'">{{applied.corps}}</td>
                  <td width="5%" data-title="'TRADE'" filter="{trade: 'text'}" sortable="'trade'">{{applied.trade}}</td>
                  <td width="6%" data-title="'JOBSTATUS'" filter="{jobstatus: 'text'}" sortable="'jobstatus'">{{applied.jobstatus}} </td>
               </tr>
            </tbody>
         </table>
       <!--  <ul class="pagination theme-pagi">
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
   table, td  {
   border: 1px solid #d0cdcd;
   border-collapse: collapse;
   }
</style>
