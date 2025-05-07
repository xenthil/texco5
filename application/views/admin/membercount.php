<script type="text/javascript" src="<?php echo base_url("assets/js/app/membercount.js")?>"></script>
<link rel="stylesheet" type="text/css" href="<?php echo base_url("assets/css/ng-table.min.css")?>" />
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ng-table.min.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ui-bootstrap-tpls-0.11.0.js")?>"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.8.1/xlsx.full.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.3/angular-sanitize.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/ng-csv/0.3.3/ng-csv.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/2.6.0/jszip.min.js"></script>
<div class="parallax-container" style="background-color: rgba(0, 12, 78, 0.9)">
   <div class="row">
      <div class="container">
         <div class="col s12 m6 l6">
            <div class="pagebannertext white-text" >Member Count</div>
         </div>
         <div class="col s12 m6 l6 right-align">
            <div class="dumheight hide-on-small-only"> </div>
            <div class=""> <a href="<?php echo base_url('admin/dashboard')?>" class="breadcrumb">Home</a> <span class="breadcrumb">Reports</span>  <span class="breadcrumb">Member Count</span> </div>
         </div>
      </div>
   </div>
   <div class="parallax"><img src="<?php echo base_url("assets/images/breadcrumbbanner.jpg")?>"></div>
</div>
<div  class="row" ng-app="appMembercount" style="padding-top:30px;">
   <div  class="container" ng-controller="ctrlMembercount">
      <div class ="col s12 m12 l12">
         <div class="row">
            <div class="input-field col s4">
               <select name="regionid" ng-model="objproject.regionid"  data-ng-options=" r.region_id as r.region_name for r in regionDetails" ng-change="getDistrictDetails(objproject.regionid)">
                <option value="">ALL</option> 
               </select>
               <label for="regionid">Region</label>
            </div>
            <div class="input-field col s4">
               <select name="districtid" ng-model="objproject.districtid"  data-ng-options=" d.district_id as d.district_name for d in districtDetails">  
                  <option value="">ALL</option> 
               </select>
               <label for="districtid">District</label>
            </div>
         </div>
         <div class="row">
            <div class="col s12 m6 l6">
               <div class="card blue-grey lighten-1">
                  <div class="card-action">
                  <div class="card-content white-text">
                     <p class="text-black">You can View all Projects.</p>
                  </div>
                     <button ng-click="submitmembercount(objproject)" class="btn cyan waves-effect waves-light" type="submit">View Member Count
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
                      <!-- ng-click="exportmembercount(objproject)" -->
                     <button ng-click="exportmembercount(objproject)" class="btn cyan waves-effect waves-light" type="submit" >Export Member Count
                     <i class="mdi-content-send right"></i>
                     </button>

                     <!-- <button class="btn cyan waves-effect waves-light" type="submit" 
                     ng-csv="districtexport" filename="District_Report.csv" csv-header="['client name', 'project no', 'projectname', 
                     'district', 'region','projectstatus', 'designation','addressline1', 'addressline2','addressline3', 'pincode', 'image']">Export Project
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
                  <td width="7%" data-title="'S NO'">{{$index + 1}}</td> 
                  <td width="7%" data-title="'EMP NAME'" filter="{empname: 'text'}" sortable="'empname'">{{applied.empname}}</td>
                  <td width="7%" data-title="'TEXCO NO'" filter="{texcono: 'text'}" sortable="'texcono'">{{applied.texcono}}</td>
                  <td width="7%" data-title="'SERVICE NO'" filter="{serviceno: 'text'}" sortable="'serviceno'">{{applied.serviceno}}</td>
                  <td width="15%" data-title="'PROJ NO'" filter="{projectno: 'text'}" sortable="'projectno'">{{applied.projectno}}</td>
                  <td width="15%" data-title="'PROJ NAME'" filter="{projectname: 'text'}" sortable="'projectname'">{{applied.projectname}}</td>
                  <td width="15%" data-title="'CATEGORY'" filter="{category: 'text'}" sortable="'category'">{{applied.category}}</td>
                  <td width="10%" data-title="'EMPLOYER NAME'" filter="{cleintname: 'text'}" sortable="'cleintname'">{{applied.clientname}}</td>
                  <td width="5%" data-title="'REGION'" filter="{region: 'text'}" sortable="'region'">{{applied.region}}</td>
                  <td width="5%" data-title="'DISTRICT'" filter="{district: 'text'}" sortable="'district'">{{applied.district}}</td> 
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
