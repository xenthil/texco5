<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.8.4/moment.min.js"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/app/categorywise.js")?>"></script>
<link rel="stylesheet" type="text/css" href="<?php echo base_url("assets/css/ng-table.min.css")?>" />
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ng-table.min.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ui-bootstrap-tpls-0.11.0.js")?>"></script>
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
            <div class="pagebannertext white-text" >Category Wise</div>
         </div>
         <div class="col s12 m6 l6 right-align">
            <div class="dumheight hide-on-small-only"> </div>
            <div class=""> <a href="<?php echo base_url('admin/dashboard')?>" class="breadcrumb">Home</a> 
            <span class="breadcrumb">Reports</span> <span class="breadcrumb">Category Wise</span> </div>
         </div>
      </div>
   </div>
   <div class="parallax"><img src="<?php echo base_url("assets/images/breadcrumbbanner.jpg")?>"></div>
</div>
<div  class="row" ng-app="appCategorywise" style="padding-top:30px;">
   <div  class="container" ng-controller="ctrlCategorywise">
      <div class ="col s12 m12 l12">
         <div class="row">
            <div class="input-field col s5">
               <input name="fromdate" id="date1" class="date1" type="text" ng-model="objproject.fromdate" autocomplete="off" />
               <label for="startdate">Start Date </label>
            </div>
            <div class="input-field col s5">
               <input name="todate" id="date1" class="date1" type="text" ng-model="objproject.todate" autocomplete="off" />
               <label for="enddate">End Date </label>
            </div>
         </div>
         <div class="row">
            <div class="col s12 m6 l6">
               <div class="card blue-grey lighten-1">
                  <div class="card-action">
                  <div class="card-content white-text">
                     <p class="text-black">You can view category wise count</p>
                  </div>
                     <button ng-click="submitcategorywise(objproject)" class="btn cyan waves-effect waves-light" type="submit">View Category wise
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
                     <p class="text-black">You can export category wise count to an excel file.</p>
                      </div>
                      <!-- ng-click="exportDistrict(objproject)" -->
                     <button ng-click="exportcategorywise(objproject)" class="btn cyan waves-effect waves-light" type="submit" >Export category wise
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
                  <td width="20%" data-title="'DESCRIPTION'" filter="{projectno: 'text'}" sortable="'projectno'">{{applied.description}}</td>
                  <td width="15%" data-title="'NO OF CONTRACTS'" filter="{projectname: 'text'}" sortable="'projectname'">{{applied.noofcontracts}}</td>
                  <td width="15%" data-title="'NO OF PROJECT/LOCATION'" filter="{cleintname: 'text'}" sortable="'cleintname'">{{applied.noofproject}}</td>
                  <td width="15%" data-title="'NO OF PERSONNEL EMP'" filter="{Address: 'text'}" sortable="'firstname'">{{applied.noofpersonnelemp}}</td>
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
</style> 
<script>
    $(document).ready(function() {
        $('.date1').datepicker({
            format: 'yyyy-mm-dd',
            autoClose: true,
        });
        $(".date1").datepicker().on("changeDate", function(e) {
            $('.datepicker-dropdown').hide();
        });
    });
</script>
