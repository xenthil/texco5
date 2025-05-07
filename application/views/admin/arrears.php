<script type="text/javascript" src="
   <?php echo base_url("assets/js/app/arrears.js")?>"></script>
<link rel="stylesheet" type="text/css" href="
   <?php echo base_url("assets/css/ng-table.min.css")?>" />
<script type="text/javascript" src="
   <?php echo base_url("assets/js/lib/ng-table.min.js")?>"></script>
<script type="text/javascript" src="
   <?php echo base_url("assets/js/lib/ui-bootstrap-tpls-0.11.0.js")?>"></script> 
<script src="<?php echo base_url("assets/js/lib/angular-bootstrap-datepicker.js")?>" charset="utf-8"></script>
<script src="<?php echo base_url("assets/js/lib/underscore.js")?>" charset="utf-8"></script>
<link href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery-ui.css" rel="Stylesheet" type="text/css" />
<link href="<?php echo base_url("assets/css/datepicker.css")?>" rel="Stylesheet" type="text/css" />
<div class="parallax-container" style="background-color: rgba(0, 12, 78, 0.9)">
   <div class="row">
      <div class="container">
         <div class="col s12 m6 l6">
            <div class="pagebannertext white-text">Arrears</div>
         </div>
         <div class="col s12 m6 l6 right-align">
            <div class="dumheight hide-on-small-only"></div>
            <div class="">
               <a href="
                  <?php echo base_url('admin/dashboard')?>" class="breadcrumb">Home
               </a>
               <span class="breadcrumb">Employers</span>
               <span class="breadcrumb">Arrears</span>
            </div>
         </div>
      </div>
   </div>
   <div class="parallax">
      <img src="
         <?php echo base_url("assets/images/breadcrumbbanner.jpg")?>">
   </div>
</div>
<div class="row" ng-app="pendingarr">
   <div class="container" ng-controller="pendingarrctrl">

 

<div  ng-if="roleid == '5'">
      <div class="input-field col m2 s6">
         <input name="month_year" id="date1" class="date1" type="text" ng-model="objattendance.fromdate" ng-change="getpayslip(objattendance.monthandyear)" autocomplete="off"/>
         <label for="startdate">Start Date </label>
      </div>
      <div class="input-field col m2 s6">
         <input name="month_year" id="date1" class="date1" type="text" ng-model="objattendance.todate" ng-change="getpayslip(objattendance.monthandyear)" autocomplete="off"/>
         <label for="enddate">End Date </label>
      </div>
      <div class="input-field col m2 s6">
         <select id="region" name="region" class="validate" ng-class="{'submitted': submitted && attendanceform.projectno.$invalid}" ng-model="objattendance.regionid" data-ng-options=" r.lkvalid as r.description for r in region" ng-required="true">
            <option value="">All</option>
         </select>
         <label for="projectno">Region</label>                              
      </div>
      <div class="input-field col m2 s6">
         <select id="region" name="region" class="validate" ng-class="{'submitted': submitted && attendanceform.projectno.$invalid}" ng-model="objattendance.projectid" data-ng-options=" r.projectid as r.projectno for r in projectsDetails" ng-required="true">
         </select>
         <label for="projectno">Project No</label>                              
      </div>
      <div class="input-field col m2 s6" ng-init="objattendance.type='1'">
         <select id="type" name="region" ng-change="resetdata()"  class="validate"  ng-model="objattendance.type" ng-required="true">
            <option value="1" >Salary Slip</option>
            <option value="2" >Invoice</option>
         </select>
         <label for="Type">Type</label>      
      </div>
      <div class="input-field col m2 s6">
         <button class="btn waves-effect waves-light  cyan darken-2" type="submit" ng-click="claimget(objattendance)" ng-disabled="isDisabled">Submit</button>
      </div>
 </div>
   <div id="" class="section" ng-if="objattendance.type == '1' && showdata=='1'">

         <div id="sup-details-pending" class="col s12">
            <table ng-table="firstTableParamsub" class="responsive-table highlight striped" show-filter="true" class="bordered" >
               <tr ng-repeat="applied in $data">
                     <td style="text-align: left" width="7%"  >
                        <input type="checkbox" class="filled-in" id="ishold_{{applied.payslipno}}" name="ishold_{{applied.payslipno}}" ng-checked="applied.ishold" ng-model="applied.ischecked" ng-change="selectEntity(applied)"/>
                        <label for="ishold_{{applied.payslipno}}" data-error="Required"></label>
                     </td>
                     <td width="5%" data-title="'S.No'">{{$index + 1}}</td>
                     <td width="8%" data-title="'Payslip Number'" filter="{payslipno: 'text'}">{{applied.payslipno}}</td>
                     <td width="8%" data-title="'Project No / Name'">{{applied.projectno}} / {{applied.projectname}}</td>
                     <td width="8%" data-title="'Month and Year'">{{applied.monthandyear}}</td>
                     <td width="20%" data-title="'Wage Category'">{{applied.wagecategory}} - {{applied.category_description}}</td>
                     <td width="12%" data-title="'Wage Year'" filter="{monthandyear: 'text'}" sortable="'monthandyear'">{{applied.wageyear}}</td>
                     <td width="12%" data-title="'Status'" filter="{status: 'text'}" sortable="'monthandyear'">{{applied.currentstatus}}
                  <!-- <td width="10%"  data-title="'Attendence Review'">
                        <a ng-click="reviewattendance(applied.monthandyear,applied.clientid,applied.projectid)"  target="_blank"><i class="material-icons">visibility</i></a>
                     </td>-->
                  
                   <!-- <td width="10%"  data-title="'Print'"> -->
                  <div ng-show="applied.status==1">
                     <a href="<?php echo base_url('admin/printclaiminvoice?invoiceno={{applied.invoiceno}}')?>" target="_blank"><i class="material-icons">print</i></a>
                  </div>
                  </td>
                 <!-- <td width="15%" data-title="'Pay Slip'">
                  <div ng-show="applied.status>1">
                     <a target="blank" href="
                        <?php echo base_url('admin/printpayslip?projectid={{applied.projectid}}&monthandyear={{applied.monthandyear}}')?>" class="btn-floating btn-small">
                     <i class="material-icons">print</i>
                     </a>
                     <a target="blank" href="
                        <?php echo base_url('admin/printfund?projectid={{applied.projectid}}&monthandyear={{applied.monthandyear}}')?>" class="btn-floating btn-small blue">
                     <i class="material-icons">visibility</i>
                     </a>
                  </div>
                  <td width="15%" data-title="'Authorize'">
                     <span ng-show="applied.status==1" >
                     <a class="btn-floating btn-small blue"  ng-click="authorize(applied.projectid,applied.monthandyear,applied.clientid,2)">
                     <i class="material-icons">done</i>
                     </a>
                     <a class="btn-floating btn-small red"  ng-click="authorize(applied.projectid, applied.monthandyear,applied.clientid,0)">
                     <i class="material-icons">not_interested</i>
                     </a>
                     </span>
                     <span ng-show="applied.status>1" >
                     {{applied.currentstatus}}
                     </span>
                  </td> -->
               </tr>
            </table>

         <div ng-show="selectedproj.length > 0"> 
            <div class="input-field col m3 s6">
               <label for="cat" style="top: 0 !important;">Select Category</label>  
               <select id="cat" name="region" class="validate" ng-class="{'submitted': submitted && attendanceform.projectno.$invalid}" ng-model="category" data-ng-options="r as r.category_code + ' - ' + r.category_description for r in wagecategory" ng-required="true" style="margin-top: 15px !important;">
               </select>             
            </div>
          <div class="input-field col m3 s6">
          <br>
            <button class="btn waves-effect waves-light  cyan darken-2" type="submit" ng-click="proceedarrear(category)" ng-disabled="isDisabled">Approve</button>
         </div>
         </div> 
         </div>
      
        
   </div>

   <div id="" class="section" ng-if="objattendance.type == '2' && showdata=='1'">

<div id="sup-details-pending" class="col s12">
   <table ng-table="firstTableParamsub" class="responsive-table highlight striped" show-filter="true" class="bordered" >
      <tr ng-repeat="applied in $data">

      <td style="text-align: left" width="7%"  >
                           <input type="checkbox" class="filled-in" id="ishold_{{applied.invoiceno}}" name="ishold_{{applied.invoiceno}}" ng-checked="applied.ishold" ng-model="applied.ischecked" ng-change="selectEntity(applied)"/>
                           <label for="ishold_{{applied.invoiceno}}" data-error="Required"></label>

                           
                        </td>

         <td width="5%" data-title="'S.No'">{{$index + 1}}</td>
         <td width="8%" data-title="'Invoice No'" filter="{invoiceno: 'text'}"> <a href="<?php echo base_url('admin/printinvoice?invoiceno={{applied.invoiceno}}')?>" target="_blank">{{applied.invoiceno}}</a></td>
         <td width="12%" data-title="'Project No / Name'">{{applied.projectno}} - {{applied.projectname}}</td>
         <td width="8%" data-title="'Month and Year'">{{applied.monthandyear}}</td>
         <td width="8%" data-title="'Wage Category'" filter="{wagecategory: 'text'}">{{applied.wagecategory}} - {{applied.category_description}}</td>
         <td width="8%" data-title="'Wage Year'" filter="{wageyear: 'text'}">{{applied.wageyear}}</td>
         <td width="20%" data-title="'Service Charge / Tax'">{{applied.servicecharge}} / {{applied.tax}}</td>
        
        <!-- <td width="10%"  data-title="'Attendence Review'">
            <a ng-click="reviewattendance(applied.monthandyear,applied.clientid,applied.projectid)"  target="_blank"><i class="material-icons">visibility</i></a>
         </td>
         
          <td width="10%"  data-title="'Invoice'">
         <div ng-show="applied.status>2">
            <a href="<?php echo base_url('admin/printinvoice?invoiceno={{applied.invoiceno}}')?>" target="_blank"><i class="material-icons">print</i></a>   
         </div>
         </td>
         <td width="15%" data-title="'Pay Slip'">
         <div ng-show="applied.status>1">
            <a target="blank" href="
               <?php echo base_url('admin/printpayslip?projectid={{applied.projectid}}&monthandyear={{applied.monthandyear}}')?>" class="btn-floating btn-small">
            <i class="material-icons">print</i>
            </a>
            <a target="blank" href="
               <?php echo base_url('admin/printfund?projectid={{applied.projectid}}&monthandyear={{applied.monthandyear}}')?>" class="btn-floating btn-small blue">
            <i class="material-icons">visibility</i>
            </a>
         </div>
         <td width="15%" data-title="'Authorize'">
            <span ng-show="applied.status==1" >
            <a class="btn-floating btn-small blue"  ng-click="authorize(applied.projectid,applied.monthandyear,applied.clientid,2)">
            <i class="material-icons">done</i>
            </a>
            <a class="btn-floating btn-small red"  ng-click="authorize(applied.projectid, applied.monthandyear,applied.clientid,0)">
            <i class="material-icons">not_interested</i>
            </a>
            </span>
            <span ng-show="applied.status>1" >
            {{applied.currentstatus}}
            </span>
         </td> -->
      </tr>
   </table>

<div ng-show="selectedproj.length > 0"> 
   <div class="input-field col m3 s6">
        <select id="wgcat" name="category"  ng-model="category"
                     data-ng-options="r as r.category_code + ' - ' + r.category_description for r in wagecategory"
                      ng-required="true">
        </select>
                  <label for="wgcat">Select Category</label>                    
   </div>
 <div class="input-field col m3 s6">
   <button class="btn waves-effect waves-light  cyan darken-2" type="submit" ng-click="proceedarrear(category)" ng-disabled="isDisabled">Approve</button>
</div>
</div> 
</div>


</div>


  </div>


</div>
<style type="text/css">
   .ng-table-pager {
   display: none;
   }
   .datepicker-dropdown {
   top: 0;
   left: 0;
   position: absolute;
   background-color: #fff;
   width: 20%;
   }
   td {
   text-align: center;
   }
   .striped {
   display: block;
   height: 600px;
   overflow-y: scroll;
   overflow-x: scroll;
   }
</style>
<script>
   $( document ).ready(function() { 
      $('.date1').datepicker({
         format: 'yyyy-mm-dd',
           autoClose:true,
         
      });
      
   $(".date1").datepicker().on("changeDate", function(e) {
      $('.datepicker-dropdown').hide();
   });
   });   

   var roleid=<?php echo $roleid;?>


</script>

<script type="text/ng-template" id="ng-table/headers/checkbox.html">
   <input type="checkbox" ng-model="model.allItemsSelected" ng-change="selectAll()" class="filled-in" id="ishold" name="filter-checkbox" value=""/>
      <label for="ishold" data-error="Required">Hold All</label>
      
</script>