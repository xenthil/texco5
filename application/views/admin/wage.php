<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ng-table.min.js")?>"></script>
<link rel="stylesheet" type="text/css" href="<?php echo base_url("assets/css/ng-table.min.css")?>" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.8.1/xlsx.full.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/2.6.0/jszip.min.js"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/app/wage.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ui-bootstrap-tpls-0.11.0.js")?>"></script>
<script type="text/javascript">
   var memberid = 0
</script>
<div class="parallax-container" style="background-color: rgba(0, 12, 78, 0.9)">
   <div class="row">
      <div class="container">
         <div class="col s12 m6 l6">
            <div class="pagebannertext white-text">WAGE MASTER</div>
         </div>
         <div class="col s12 m6 l6 right-align">
            <div class="dumheight hide-on-small-only"> </div>
            <div class=""> <a href="<?php echo base_url('admin/dashboard')?>" class="breadcrumb">Home</a> <span class="breadcrumb">Wage master</span> </div>
         </div>
      </div>
   </div>
   <div class="parallax"><img src="<?php echo base_url("assets/images/breadcrumbbanner.jpg")?>">
   </div>
</div>
<div class="row" ng-app="apppricemaster">
   <div class="container" ng-controller="ctrlpricemaster">
      <div class="row">
         <div class="col s12 m12 l12">
            <div class="input-field col s4">
               <select name="wagetype"   ng-model="objagreement.wagetype" data-ng-options="at.lkvalid as at.description for at in wagetype">
                  <option value="">SELECT</option>
               </select>
               <label for="wagetype">Wage Type</label>
            </div>
            <div class="input-field col s4">
               <select  name="wagerate"  ng-model="objagreement.wageyearid" data-ng-options="at.lkvalid as at.description for at in wagerate">
                  <option value="">SELECT</option>
               </select>
               <label for="wagerate" data-error="Required">Wage Rate Year</label>
            </div>
            <div class="input-field col s4">
               <select name="wagearea" ng-model="objagreement.wageareaid" data-ng-options="at.lkvalid as at.description for at in wagearea" >
                  <option value="">SELECT</option>
               </select>
               <label for="wagearea" >Wage Area</label>
            </div>
         </div>
      </div>
      <div class="row" >
         <div class="col s4">
            <table>
               <tr>
                  <th>Particulars</th>
                  <th>Percentage</th>
               </tr>
               <tr ng-repeat="l in particular">
                  <td>
                     {{l.description}}
                  </td>
                  <td>
                     <input ng-model="l.lkvalid" id="{{l.lkvalid}}" value="" class="validate" type="text"> 
                  </td>
               </tr>
            </table>
         </div>
      </div>
   </div>
</div>