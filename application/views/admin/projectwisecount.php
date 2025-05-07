<script type="text/javascript" src="<?php echo base_url("assets/js/app/projectwisecount.js")?>"></script>
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
            <div class="pagebannertext white-text" >Project Wise Count</div>
         </div>
         <div class="col s12 m6 l6 right-align">
            <div class="dumheight hide-on-small-only"> </div>
            <div class=""> <a href="<?php echo base_url('admin/dashboard')?>" class="breadcrumb">Home</a> <span class="breadcrumb">Account Reports</span><span class="breadcrumb">Project Wise Count</span> </div>
         </div>
      </div>
   </div>
   <div class="parallax"><img src="<?php echo base_url("assets/images/breadcrumbbanner.jpg")?>"></div>
</div>
<div  class="row" ng-app="appProjectwisecount" style="padding-top:30px;">
   <div  class="container" ng-controller="ctrlProjectwisecount">
      <div class ="col s12 m12 l12">
         <!-- <div class="row">
            <div class="input-field col s4">
               <select name="districtid" ng-model="objproject.districtid"  data-ng-options=" d.lkvalid as d.description for d in district">  
                  <option value="">ALL</option> 
               </select>
               <label for="districtid">District</label>
            </div>
            <div class="input-field col s4">
               <select name="regionid" ng-model="objproject.regionid"  data-ng-options=" r.lkvalid as r.description for r in region">
                <option value="">ALL</option> 
               </select>
               <label for="regionid">Region</label>
            </div>
            <div class="input-field col s4">
               <select name="statusid" ng-model="objproject.statusid"  data-ng-options=" d.lkvalid as d.description for d in status">
               <option value="">ALL</option> 
               </select>
               <label for="statusid">Status</label>
            </div>
         </div> -->
         <div class="row">
            <div class="col s12 m6 l6">
               <div class="card blue-grey lighten-1">
                  <div class="card-action">
                  <div class="card-content white-text">
                     <p class="text-black">You can View all Projects.</p>
                  </div>
                     <button ng-click="submitprojectwise(objproject)" class="btn cyan waves-effect waves-light" type="submit">View ProjectWiseCount
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
                     <p class="text-black">You can Export all projects to an excel file.</p>
                      </div>
                      <!-- ng-click="exportdistrictcount(objproject)" -->
                     <button ng-click="exportprojrctwise(objproject)" class="btn cyan waves-effect waves-light" type="submit" >Export ProjectWiseCount
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
                  <td width="7%" data-title="'PROJ NO'" filter="{PROJECTNO: 'text'}" sortable="'PROJECTNO'">{{applied.PROJECTNO}}</td>
                  <td width="15%" data-title="'PROJ NAME'" filter="{PROJECTNAME: 'text'}" sortable="'PROJECTNAME'">{{applied.PROJECTNAME}}</td>
                  <td width="7%" data-title="'REGION'" filter="{REGION: 'text'}" sortable="'REGION'">{{applied.REGION}}</td>
                  <td width="15%" data-title="'DISTRICT'" filter="{DISTRICT: 'text'}" sortable="'DISTRICT'">{{applied.DISTRICT}}</td>
                  <td width="7%" data-title="'SG'" filter="{SG: 'text'}" sortable="'SG'">{{applied.SG}}</td>
                  <td width="7%" data-title="'HSG'" filter="{HSG: 'text'}" sortable="'HSG'">{{applied.HSG}} </td>
                  <td width="7%" data-title="'ASO'" filter="{ASO: 'text'}" sortable="'ASO'">{{applied.ASO}}</td>
                  <td width="7%" data-title="'PO'" filter="{PO: 'text'}" sortable="'PO'">{{applied.PO}}</td>
                  <td width="7%" data-title="'DVR'" filter="{DVR: 'text'}" sortable="'DVR'">{{applied.DVR}}</td>
                  <td width="7%" data-title="'JA'" filter="{JA: 'text'}" sortable="'JA'">{{applied.JA}} </td>
                  <td width="7%" data-title="'GMAN'" filter="{GMAN: 'text'}" sortable="'GMAN'">{{applied.GMAN}}</td>
                  <td width="7%" data-title="'OA'" filter="{OA: 'text'}" sortable="'OA'">{{applied.OA}}</td>
                  <td width="7%" data-title="'OTHER'" filter="{OTHER: 'text'}" sortable="'OTHER'">{{applied.OTHER}}</td>
                  <td width="7%" data-title="'TOTAL'" filter="{TOTAL: 'text'}" sortable="'TOTAL'">{{applied.TOTAL}} </td>
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
