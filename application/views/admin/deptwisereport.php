<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.8.4/moment.min.js"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/app/deptwisereport.js")?>"></script>
<link rel="stylesheet" type="text/css" href="<?php echo base_url("assets/css/ng-table.min.css")?>" />
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ng-table.min.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ui-bootstrap-tpls-0.11.0.js")?>"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.8.1/xlsx.full.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.3/angular-sanitize.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/ng-csv/0.3.3/ng-csv.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/2.6.0/jszip.min.js"></script>
<script src="<?php echo base_url("assets/js/lib/angular-bootstrap-datepicker.js")?>" charset="utf-8"></script>
<link href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery-ui.css" rel="Stylesheet" type="text/css" />
<link href="<?php echo base_url("assets/css/datepicker.css")?>" rel="Stylesheet" type="text/css" />
<div class="parallax-container" style="background-color: rgba(0, 12, 78, 0.9)">
   <div class="row">
      <div class="container">
         <div class="col s12 m6 l6">
            <div class="pagebannertext white-text" >Departmentwise Count</div>
         </div>
         <div class="col s12 m6 l6 right-align">
            <div class="dumheight hide-on-small-only"> </div>
            <div class=""> <a href="<?php echo base_url('admin/dashboard')?>" class="breadcrumb">Home</a> <span class="breadcrumb">Account Reports</span> <span class="breadcrumb">Departmentwise Count</span> </div>
         </div>
      </div>
   </div>
   <div class="parallax"><img src="<?php echo base_url("assets/images/breadcrumbbanner.jpg")?>"></div>
</div>
<div  class="row" ng-app="appDeptwiseincrease" style="padding-top:30px;">
   <div  class="container" ng-controller="ctrlDeptwiseincrease">
      <div class ="col s12 m12 l12">
         <div class="row">   
            <div class="input-field col s4">
               <select name="categoryid" ng-model="objproject.categoryid"  data-ng-options=" d.subcategoryid as d.subcategoryname for d in subcategory">  
                  <option value="">ALL</option> 
               </select>
               <label for="categoryid">Category</label>
            </div> 
            <div class="input-field col s4">
               <label for="fromdate">Select Month :</label>
               <input name="month_year" id="month_year" class="month_year" type="text" ng-model="objproject.monthandyear" autocomplete="off"/>
            </div>
         </div>
         <div class="row">
            <div class="col s12 m6 l6">
               <div class="card blue-grey lighten-1">
                  <div class="card-action">
                  <div class="card-content white-text">
                     <p class="text-black">You can View Deptwise Projects.</p>
                  </div>
                     <button ng-click="submitdeptwise(objproject)" class="btn cyan waves-effect waves-light" type="submit">View Departmentwise
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
                     <p class="text-black">You can Export Dept Wise Projects to an excel file.</p>
                      </div>
                     <button ng-click="exportdeptwise(objproject)" class="btn cyan waves-effect waves-light" type="submit" >Export Departmentwise                     <i class="mdi-content-send right"></i>
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
                  <td width="7%" data-title="'MONTHANDYEAR'" filter="{MONTHANDYEAR: 'text'}" sortable="'MONTHANDYEAR'">{{applied.MONTHANDYEAR}}</td>
                  <td width="15%" data-title="'NAME'" filter="{NAME: 'text'}" sortable="'NAME'"> {{applied.NAME}} </td>
                  <td width="15%" data-title="'TEXCONO'" filter="{TEXCONO: 'text'}" sortable="'TEXCONO'">
                     {{applied.TEXCONO}} </td> 
                  <td width="15%" data-title="'SERVICENO'" filter="{SERVICENO: 'text'}" sortable="'SERVICENO'">
                     {{applied.SERVICENO}} </td>
                  <td width="15%" data-title="'CATEGORY'" filter="{CATEGORY: 'text'}" sortable="'CATEGORY'">
                     {{applied.CATEGORY}} </td>
                  <td width="15%" data-title="'PROJECTNO'" filter="{PROJECTNO: 'text'}" sortable="'PROJECTNO'">
                     {{applied.PROJECTNO}} </td>
                  <td width="15%" data-title="'PROJECTNAME'" filter="{PROJECTNAME: 'text'}" sortable="'PROJECTNAME'">
                     {{applied.PROJECTNAME}} </td>  
                  <td width="15%" data-title="'REGION'" filter="{REGION: 'text'}" sortable="'REGION'">
                     {{applied.REGION}} </td>
                  <td width="15%" data-title="'STRENGTH'" filter="{STRENGTH: 'text'}" sortable="'STRENGTH'">
                     {{applied.STRENGTH}} </td>
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
