<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.8.4/moment.min.js"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/app/dgrcountreport.js")?>"></script>
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
            <div class="pagebannertext white-text" >DGR Count</div>
         </div>
         <div class="col s12 m6 l6 right-align">
            <div class="dumheight hide-on-small-only"> </div>
            <div class=""> <a href="<?php echo base_url('admin/dashboard')?>" class="breadcrumb">Home</a><span class="breadcrumb">Reports</span>  <span class="breadcrumb">DGR Count</span> </div>
         </div>
      </div>
   </div>
   <div class="parallax"><img src="<?php echo base_url("assets/images/breadcrumbbanner.jpg")?>"></div>
</div>
<div  class="row" ng-app="appDgrcountreport" style="padding-top:30px;">
   <div  class="container" ng-controller="ctrlDgrcountreport">
      <div class ="col s12 m12 l12">
         <div class="row">
            <div class="input-field col s5">
               <input name="fromdate" id="date1" class="date1" type="text" ng-model="objproject.fromdate" autocomplete="off" />
               <label for="fromdate">Start Date </label>
            </div>
            <div class="input-field col s5">
               <input name="todate" id="date1" class="date1" type="text" ng-model="objproject.todate" autocomplete="off" />
               <label for="todate">End Date </label>
            </div>
         </div>
         <div class="row">
            <div class="col s12 m6 l6">
               <div class="card blue-grey lighten-1">
                  <div class="card-action">
                  <div class="card-content white-text">
                     <p class="text-black">You can View all Projects.</p>
                  </div>
                     <button ng-click="submitdgrcount(objproject)" class="btn cyan waves-effect waves-light" type="submit">View DGR Count
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
                      <!-- ng-click="exportdgrcount(objproject)" -->
                     <button ng-click="exportdgrcount(objproject)" class="btn cyan waves-effect waves-light" type="submit" >Export DGR Count
                     <i class="mdi-content-send right"></i>
                     </button>
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
                  <td width="20%" data-title="'CATEGORY NAME'" filter="{subcategoryname: 'text'}" sortable="'subcategoryname'">{{applied.subcategoryname}}</td>
                  <td width="7%" data-title="'SG'" filter="{SG: 'number'}" sortable="'SG'">{{applied.SG}}</td>
                  <td width="7%" data-title="'HSG'" filter="{HSG: 'number'}" sortable="'HSG'">{{applied.HSG}} </td>
                  <td width="7%" data-title="'ASO'" filter="{ASO: 'number'}" sortable="'ASO'">{{applied.ASO}}</td>
                  <td width="7%" data-title="'PO'" filter="{PO: 'number'}" sortable="'PO'">{{applied.PO}}</td>
                  <td width="7%" data-title="'DVR'" filter="{DVR: 'number'}" sortable="'DVR'">{{applied.DVR}}</td>
                  <td width="7%" data-title="'JA'" filter="{JA: 'number'}" sortable="'JA'">{{applied.JA}} </td>
                  <td width="7%" data-title="'GMAN'" filter="{GMAN: 'number'}" sortable="'GMAN'">{{applied.GMAN}}</td>
                  <td width="7%" data-title="'OA'" filter="{OA: 'number'}" sortable="'OA'">{{applied.OA}}</td> 
                  <td width="7%" data-title="'OTHER'" filter="{OTHER: 'number'}" sortable="'OTHER'">{{applied.OTHER}}</td>
                  <td width="7%" data-title="'TOTAL'" filter="{TOTAL: 'number'}" sortable="'total'">{{applied.TOTAL}} </td>
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

