<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.8.4/moment.min.js"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/app/strengthreport.js")?>"></script>
<link rel="stylesheet" type="text/css" href="<?php echo base_url("assets/css/ng-table.min.css")?>" />
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ng-table.min.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ui-bootstrap-tpls-0.11.0.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/underscore.js")?>"></script> 
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.8.1/xlsx.full.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.3/angular-sanitize.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/ng-csv/0.3.3/ng-csv.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/2.6.0/jszip.min.js"></script>
<script src="<?php echo base_url("assets/js/lib/angular-bootstrap-datepicker.js")?>" charset="utf-8"></script>
<link href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery-ui.css" rel="Stylesheet"
    type="text/css" />
<link href="<?php echo base_url("assets/css/datepicker.css")?>" rel="Stylesheet" type="text/css" />
<div class="parallax-container" style="background-color: rgba(0, 12, 78, 0.9)">
   <div class="row">
      <div class="container">
         <div class="col s12 m6 l6">
            <div class="pagebannertext white-text" >Strength Report</div>
         </div>
         <div class="col s12 m6 l6 right-align">
            <div class="dumheight hide-on-small-only"> </div>
            <div class=""> <a href="<?php echo base_url('admin/dashboard')?>" class="breadcrumb">Home</a><span class="breadcrumb">Reports</span>  <span class="breadcrumb">Strength Report</span> </div>
         </div>
      </div>
   </div>
   <div class="parallax"><img src="<?php echo base_url("assets/images/breadcrumbbanner.jpg")?>"></div>
</div>
<div  class="row" ng-app="appStrengthreport" style="padding-top:30px;">
   <div  class="container" ng-controller="ctrlStrengthreport">
      <div class ="col s12 m12 l12">
         <div class="row">
            <!-- <div class="input-field col s2">
               <input name="fromdate" id="date1" class="date1" type="text" ng-model="objproject.fromdate" autocomplete="off" />
               <label for="fromdate">Start Date </label>
            </div> -->
            <div class="input-field col s3">
               <label for="fromdate">Month :
               </label>
               <input name="month_year" id="month_year" class="month_year" type="text" ng-model="objproject.monthandyear"/>
            </div>

            <div class="input-field col s3">
                              <select name="regionid" ng-model="objproject.regionid" ng-class="{'submitted': submitted && projectform.regionid.$invalid}" ng-required="true" data-ng-options="rg.region_id as rg.region_name for rg in region" ng-change="getDistrictDetails(objproject.regionid);">
                              </select>
                              <label for="regionid" >Region</label>
                           </div>
                           <div class="input-field col s3">
                              <select name="districtid" ng-model="objproject.districtid" ng-class="{'submitted': submitted && projectform.projectno.$invalid}" ng-required="true" data-ng-options="d.district_id as d.district_name for d in districtDetails" ng-change="getTalukDetails(objproject.districtid);">
                              </select>

                           </div>

                           <div class="input-field col s3 dropdowntype">
                              <!-- <select name="clientid" ng-model="objproject.clientid" ng-class="{'submitted': submitted && projectform.clientid.$invalid}" ng-required="true" data-ng-options=" c.clientid as c.organization for c in clientslists" >
                              </select> -->

                              
                              <input type="text"  ng-model="objproject.org" typeahead-on-select="fillclientproject1($item)"  typeahead="c.clientid as c.organization for c in clientslists | filter:$viewValue " /> 

                              <label for="client" >Employer</label>
                           </div>
                           

         </div>
         <div class="row">
            <div class="col s12 m6 l6">
               <div class="card blue-grey lighten-1">
                  <div class="card-action">
                  <div class="card-content white-text">
                     <p class="text-black">You can View all Projects.</p>
                  </div>
                     <button ng-click="submitStrengthreport(objproject)" class="btn cyan waves-effect waves-light" type="submit">View Strength
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
                      <!-- ng-click="exportStrengthreport(objproject)" -->
                     <button ng-click="exportStrengthreport(objproject)" class="btn cyan waves-effect waves-light" type="submit" >Export Strength
                     <i class="mdi-content-send right"></i>
                     </button>

                     <!-- <button class="btn cyan waves-effect waves-light" type="submit" 
                     ng-csv="Strengthreportexport" filename="District_Report.csv" csv-header="['client name', 'project no', 'projectname', 
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
            <thead>
               <tr>
                  <th>S NO</th>
                  <th>PROJECT NO</th>
                  <th>PROJECT NAME</th> 
                  <th colspan="9">AUTH STRENGTH</th>
                  <th colspan="9">ATT STRENGTH</th>
                  <th colspan="9">BAL STRENGTH</th>
               </tr> 
               <tr>
                  <th></th>
                  <th></th>
                  <th></th> 
                  <th ng-repeat="catt in categories">{{catt.category}}</th>
                  <th ng-repeat="catt in categories">{{catt.category}}</th>
                  <th ng-repeat="catt in categories">{{catt.category}}</th>
               </tr>
            </thead>
            <tbody ng-repeat="applied in $data">
               <tr>
                  <td width="7%">{{$index + 1}}</td> 
                  <td width="7%">{{applied.projectno}}</td>
                  <td width="15%">{{applied.projectname}}</td>
                  <td ng-repeat="catt in categories" data-title="catt.category">{{applied.agstrength[catt.category]}}</td>
                  <td ng-repeat="catt in categories" data-title="catt.category">{{applied.atstrength[catt.category]}}</td>
                  <td ng-repeat="catt in categories" data-title="catt.category">{{applied.balstrength[catt.category]}}</td>
               </tr>
            </tbody>
         </table>
       
      </div>
   </div>
</div>

<style type="text/css"> 
   .datepicker-dropdown {
      top: 0;
      left: 0;
      position: absolute;
      background-color: #fff;
      width: 20%; 
   }
</style>
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
   .dropdowntype .dropdown-menu {
    background-color: #fff;
    position: absolute;
    z-index: 999999;
    padding: 10px;
    color: black;
}
.dropdowntype .dropdown-menu  li a {
    padding: 1px;
    color: #000 !important;
}
</style> 
<script>
    $( document ).ready(function() { 
      $('.month_year').datepicker({
         format: 'MM yyyy',
         viewMode: "months", 
         minViewMode: "months",
        autoClose:true,
        endDate: "today"
         
      });
      
   $(".month_year").datepicker().on("changeDate", function(e) {
      $('.datepicker-dropdown').hide();
   });
   });   
</script>