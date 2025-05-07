<link type="text/css" rel="stylesheet" href="<?php echo base_url("assets/css/isteven-multi-select.css") ?>">
<link href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery-ui.css" rel="Stylesheet" type="text/css" />
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ui-bootstrap-tpls-0.11.0.js") ?>"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.8.4/moment.min.js"></script>
<link href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery-ui.css" rel="Stylesheet"
    type="text/css" />
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/jquery.formatter.min.js") ?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/app/agreement.js?v=1.0") ?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/underscore.js") ?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/isteven-multi-select.js") ?>"></script>
<style> 
   .redcolor {
      color: red !important;
   }
   .nocolor {
      color: black !important;
   }
   .select-wrapper + label {
      top: 11px !important;
   }
</style>
<script type="text/javascript">
   var clientid = 0;
   var roleid = 0;
   var regionid = <?php echo $_SESSION['regionid']; ?>;
</script>
<div class="parallax-container" style="background-color: rgba(0, 12, 78, 0.9)">
   <div class="row">
      <div class="container">
         <div class="col s12 m6 l6">
            <div class="pagebannertext white-text">Agreement</div>
         </div>
         <div class="col s12 m6 l6 right-align">
            <div class="dumheight hide-on-small-only"> </div>
            <div class=""> <a href="<?php echo base_url('admin/dashboard') ?>" class="breadcrumb">Home</a> 
            <span class="breadcrumb">Employers</span><span class="breadcrumb">Agreement</span> </div>
         </div>
      </div>
   </div>
   <div class="parallax"><img src="<?php echo base_url("assets/images/breadcrumbbanner.jpg") ?>">
   </div>
</div>
<div class="row" ng-app="appAgreement">
   <div class="container" ng-controller="ctrlAgreement">
      <!-- Modal Window for new and Edit -->
      <div class="fixed-action-btn" style="bottom: 90px; right: 19px;">
         <?php if ($roledata['permissions']['AAGREE'] == 1) { ?>
            <a class="btn-floating btn-large green modal-trigger tooltipped" ng-click='addagreement()' data-position="bottom" data-delay="50" data-tooltip="Add Agreement">
               <i class="mdi mdi-format-annotation-plus"></i>
            </a>
         <?php } ?>
      </div>
      <!-- <div class="fixed-action-btn" style="bottom: 90px; right: 19px;">
         <?php // if ($roledata['permissions']['AAGREE'] == 1) { 
         ?>
         <a class="btn-floating btn-large blue modal-trigger tooltipped" ng-click='addcombinedagreement()' data-position="bottom" data-delay="50" data-tooltip="Combined Agreement">
            <i class="mdi mdi-account-plus"></i>
         </a>
         <?php // } 
         ?>
      </div> -->

      <!-- Edit Agreement-->
      <div id="modal3" class="modal modal-fixed-footer" style="max-height:90%;z-index: 1000;">
         <form ng-submit="agreementform.$valid && saveagreement(objagreement, selectedObjects)" id="agreementform" name="agreementform" novalidate>
            <div class="modal-content">
               <nav class="blue" style="position: fixed;margin-top: 0px; z-index:999">
                     <div class="left col s1 m1 l1">
                        <div class="white-text"><a href=""><i class="modal-action modal-close mdi white-text mdi-arrow-left"></i></a> </div>
                     </div>
                     <div class="col s11 m11 l11">
                        <div class="li white-text" id="m1caption">Edit Agreement</div>
                     </div>
               </nav>
               <div class="row" style="padding: 40px;">
                     <div class="row" style="height:40px;">&nbsp;</div>
                     <div class="row">
                        <div class="input-field col s6">
                           <select id="client" name="client" class="validate" ng-required="true" ng-class="{'submitted': submitted && agreementform.clientid.$invalid}" ng-model="objagreement.clientid" data-ng-options=" c.clientid as c.organization for c in clientslists" ng-change="selectProject(objagreement.clientid)">
                           </select><label for="client" class="empclients">Employer Name</label>
                        </div>
                        <div class="input-field col s6">
                           <select id="agreementtypeid" name="agreementtypeid" class="validate" ng-required="true" ng-class="{'submitted': submitted && agreementform.agreementtype.$invalid}" ng-model="objagreement.agreementtypeid" data-ng-options="at.lkvalid as at.description for at in agreementtype">
                           </select><label for="agreementtype" class="agtypess">Agreement Type</label>
                        </div> 
                     </div> 
                     <!-- <div class="form-group" ng-hide="objagreement.agreementtype =='SINGLE'"> 
                                 <label>Select Projects:</label>
                                 <div isteven-multi-select input-model="cprojectnames" output-model="selectedprojects" button-label="name" item-label="name" on-item-click='getmultivals(data)' tick-property="ticked" style="width:100%">
                                 </div> -->
                                 <!-- <div isteven-multi-select input-model="cprojectnames" output-model="selectedprojectslist" button-label="projectno" item-label="projectno" on-item-click='getmultivals(data,selectedprojectslist)' tick-property="ticked" style="width:100%"> </div> -->
                    
                              <!-- </div> -->

                     <div class="row">
                        <div class="input-field col s6">
                           <select id="wagerate" name="wagerate" class="validate" ng-required="true" ng-class="{'submitted': submitted && agreementform.wagerate.$invalid}" ng-model="objagreement.wageyearid" data-ng-options="at.lkvalid as at.description for at in wagerate" ng-change='getchangecategory(objagreement.wageyearid,objagreement.wagetype)'>
                           </select><label for="wagerate" data-error="Required">Wage Rate Year</label>
                        </div>
                        <div class="input-field col s6">
                           <select id="wagetype" name="wagetype" class="validate" ng-required="true" ng-class="{'submitted': submitted && agreementform.wagetype.$invalid}" ng-model="objagreement.wagetype" data-ng-options="at.lkvalid as at.description for at in wagetype" ng-change='getchangemethod()'>
                           </select><label for="wagetype">Wage Type</label>
                        </div>
                     </div>
                     <div class="row">
                        <div class="input-field col s6">
                        <input id="startdate" type="date" class="adddatepicker" ng-class="{'submitted': submitted && agreementform.fromdate.$invalid}" data-ng-model="objagreement.fromdate" ng-required="true">
                        <label for="startdate" class="active dp-click">Start Date </label>
                        </div>
                        <div class="input-field col s6">
                        <input id="enddate" type="date" class="adddatepicker" ng-class="{'submitted': submitted && agreementform.todate.$invalid}" data-ng-model="objagreement.todate" ng-required="true">
                        <label for="enddate" class="active dp-click">End Date </label>
                        </div>
                     </div>
                     <div class="row">
                        <div class="input-field col s6"  ng-hide="objagreement.wagetype==tncode">
                           <select id="wagearea" name="wagearea" class="validate" ng-model="objagreement.wageareaid" data-ng-options="at.lkvalid as at.description for at in wagearea"  ng-change='getchangemethod()'>
                           </select>
                           <label for="wagearea">Wage Area</label>
                        </div>
                        <div class="input-field col s6">
                           <select id="wagecategoryid" name="wagecategoryid" class="validate" ng-model="objagreement.wagecategoryid" data-ng-options="at.category_id as at.category_code + ' - ' + at.category_description for at in wagecategories">
                           </select>
                           <label for="wagearea">Wage Category</label>
                        </div>
                     </div>
                     <div class="row">
                        <div class="input-field col s6">
                        <input id="servicecharge" name="servicecharge" type="text" ng-class="{'submitted': submitted && agreementform.servicecharge.$invalid}" class="validate" ng-model="objagreement.servicecharge" maxlength="100" ng-required="true">
                        <label for="servicecharge" data-error="Required">Service Charge (In %)</label>
                        </div>
                        <div class="input-field col s6">
                        <input id="tax" name="tax" type="text" ng-class="{'submitted': submitted && agreementform.tax.$invalid}" class="validate" ng-model="objagreement.tax" maxlength="100" ng-required="true">
                        <label for="tax" data-error="Required">Tax (In %)</label>
                        </div>

                        <div class="input-field col s6">
                        <!-- <input id="tax" name="taxtype" type="text" ng-class="{'submitted': submitted && agreementform.taxtype.$invalid}" class="validate" ng-model="objagreement.tax" maxlength="100" ng-required="true"> -->
                       
                        <select class="validate" ng-model="objagreement.taxtype">
                           <option value="1" ng-selected="objagreement.taxtype == '1'">IGST</option>
                           <option value="0" ng-selected="objagreement.taxtype == '0'" >GST</option>
                        </select>
                        <label for="tax" data-error="Required">Tax Type</label>
                        </div>

                     </div>
                     <div class="row">
                        <div class="input-field col s6">
                           <select id="agreementstatus" name="agreementstatus" class="validate" ng-required="true" ng-class="{'submitted': submitted && agreementform.agreementstatus.$invalid}" ng-model="objagreement.agreementstatus" data-ng-options="at.lkvalid as at.description for at in agreementstatus">
                           </select><label for="agreementstatus">Agreement Status</label>
                        </div>
                        <div class="input-field col s6">
                           <select id="typeagreement" name="typeagreement" class="validate" ng-required="true" ng-class="{'submitted': submitted && agreementform.typeagreement.$invalid}" ng-model="objagreement.typeagreement" data-ng-options="at.lkvalid as at.description for at in typeofagreement">
                           </select><label for="typeagreement">Type of Agreement</label>
                        </div>
                     </div>
                     <div class="row">
                        <div class="input-field col s6" ng-show="objagreement.typeagreement==typeofagreementoth.lkvalid">
                           <input id="others" name="other" class="validate" ng-required="objagreement.typeagreement==typeofagreementoth.lkvalid" ng-model="objagreement.typeofagreementoth" type="text" maxlength="100"/>
                           <label for="others">Others</label>
                        </div>


                       

                        <div class="input-field col s6" style="margin-top:50px">
                     
                        <input type="checkbox" id="seperateed"   ng-checked="objagreement.edseperate=='1'" ng-true-value="1" ng-false-value="0" ng-model="objagreement.edseperate"  />
                                                <label for="seperateed">Ed Seperate in Claim bills</label>
                                             
                        </div>

                       
                     </div>

                     <p>Other Allowance</p>
                     <div class="row">
       
       <div class="input-field col s6">
       <input id="allowancetype1" name="allowancetype1" type="text" ng-class="{'submitted': submitted && agreementform.servicecharge.$invalid}" class="validate" ng-model="objagreement.allowancetype1" maxlength="100">
       <label for="allowancetype1" data-error="Required">Allowance Type</label>
       </div>
       <div class="input-field col s6">
       <input id="allowancevalue1" name="allowancevalue1" type="text" ng-class="{'submitted': submitted && agreementform.tax.$invalid}" class="validate" ng-model="objagreement.allowancevalue1" maxlength="100">
       <label for="allowancevalue1" data-error="Required">Value</label>
       </div>
    </div>

    <div class="row">
       
    <div class="input-field col s6">
       <input id="allowancetype2" name="allowancetype2" type="text" ng-class="{'submitted': submitted && agreementform.servicecharge.$invalid}" class="validate" ng-model="objagreement.allowancetype2" maxlength="100">
       <label for="allowancetype2" data-error="Required">Allowance Type</label>
       </div>
       <div class="input-field col s6">
       <input id="allowancevalue2" name="allowancevalue2" type="text" ng-class="{'submitted': submitted && agreementform.tax.$invalid}" class="validate" ng-model="objagreement.allowancevalue2" maxlength="100">
       <label for="allowancevalue2" data-error="Required">Value</label>
       </div>
    </div>

    <div class="input-field col s6">
       <input id="allowancetype3" name="allowancetype3" type="text" ng-class="{'submitted': submitted && agreementform.servicecharge.$invalid}" class="validate" ng-model="objagreement.allowancetype3" maxlength="100">
       <label for="allowancetype3" data-error="Required">Allowance Type</label>
       </div>
       <div class="input-field col s6">
       <input id="allowancevalue3" name="allowancevalue3" type="text" ng-class="{'submitted': submitted && agreementform.tax.$invalid}" class="validate" ng-model="objagreement.allowancevalue3" maxlength="100">
       <label for="allowancevalue3" data-error="Required">Value</label>
       </div>
   

               </div>
            </div>
            <div class="modal-footer">
               <div id="failure1" class="failure red-text waves-effect waves-green"></div>
               <button class="waves-effect waves-green btn-flat" type="submit" ng-click="submitted=true;">
                     Update
               </button>
               <a href="" class="modal-action modal-close waves-effect btn-flat ">Cancel</a>
            </div>
         </form>
      </div>

      <!-- Approve Agreement -->
      <div id="modal5" class="modal modal-fixed-footer" style="max-height:90%;">
         <div class="modal-content">
            <nav class="blue" style="position: fixed;margin-top: 0px; z-index:999">
               <div class="left col s1 m1 l1">
                  <div class="white-text"><a href=""><i class="modal-action modal-close mdi white-text mdi-arrow-left"></i></a> </div>
               </div>
               <div class="col s11 m11 l11">
                  <div class="li white-text" id="m3caption">Approve Agreement</div>
               </div>
            </nav>
            <div class="row" style="padding: 40px;">
               <form ng-submit="agreementform.$valid && saveapproveagreement(objagreement, selectedObjects)" id="agreementform" name="agreementform" novalidate>
                  <div class="row" style="height:40px;">&nbsp;</div>
                  <div class="row">
                     <div class="col s12">
                        <div class="row">
                           <div class="input-field col s6">
                              <select id="client" name="client" class="validate" ng-required="true" ng-class="{'submitted': submitted && agreementform.clientid.$invalid,'redcolor': employeecheck == 0 || 1 || 2,'nocolor': employeecheck == '-1'}" ng-model="objagreement.clientid" data-ng-options=" c.clientid as c.organization for c in clientslists" ng-change="selectProject(objagreement.clientid)">
                              </select><label for="client">Employer</label>
                           </div>
                           <div class="input-field col s6">
                              <select id="agreementtypeid" name="agreementtypeid" class="validate" ng-required="true" ng-class="{'submitted': submitted && agreementform.agreementtype.$invalid,'redcolor': agreementtypecheck == 0 || 1 || 2,'nocolor': agreementtypecheck == '-1'}" ng-model="objagreement.agreementtypeid" data-ng-options="at.lkvalid as at.description for at in agreementtype" ng-change='getagtype(objagreement)'>
                              </select><label for="agreementtype">Agreement Type</label>
                           </div>
                        </div>
                        <div class="row">
                           <div class="input-field col s6">
                              <input id="servicecharge" name="servicecharge" type="text" ng-class="{'submitted': submitted && agreementform.servicecharge.$invalid,'redcolor': servicechargecheck == 0 || 1 || 2,'nocolor': servicechargecheck == '-1'}" class="validate" ng-model="objagreement.servicecharge" maxlength="100" ng-required="true">
                              <label for="servicecharge" data-error="Required">Service Charge (In %)</label>
                           </div>
                           <div class="input-field col s6">
                              <input id="tax" name="tax" type="text" ng-class="{'submitted': submitted && agreementform.tax.$invalid,'redcolor': taxcheck == 0 || 1 || 2,'nocolor': taxcheck == '-1'}" class="validate" ng-model="objagreement.tax" maxlength="100" ng-required="true">
                              <label for="tax" data-error="Required">Tax (In %)</label>
                           </div>
                        </div>
                        <div class="row">
                           <div class="input-field col s6">
                              <input id="fromdate" type="date" class="adddatepicker" ng-class="{'submitted': submitted && agreementform.fromdate.$invalid,'redcolor': fromdatecheck == 0 || 1 || 2,'nocolor': fromdatecheck == '-1'}" data-ng-model="objagreement.fromdate" ng-required="true" autofocus>
                              <label for="fromdate" data-error="Required" class="dp-click">From date</label>
                           </div>
                           <div class="input-field col s6">
                              <input id="todate" type="date" class="adddatepicker" ng-class="{'submitted': submitted && agreementform.todate.$invalid,'redcolor': todatecheck == 0 || 1 || 2,'nocolor': todatecheck == '-1'}" data-ng-model="objagreement.todate" ng-required="true" autofocus>
                              <label for="todate" data-error="Required" class="dp-click">To Date</label>
                           </div>
                           <!-- <div class="input-field col s6">
                                 <input class="month_year" id="fromdate" name="fromdate" ng-required="true" type="text" ng-class="{'submitted': submitted && agreementform.fromdate.$invalid,'redcolor': fromdatecheck == 0 || 1 || 2,'nocolor': fromdatecheck == '-1'}" data-ng-model="objagreement.fromdate" autocomplete="off"> 
                                 <label for="fromdate" class="active" data-error="Required">From date</label>
                              </div>
                              <div class="input-field col s6">
                                 <input id="todate" type="text" class="month_year" type="text" ng-class="{'submitted': submitted && agreementform.todate.$invalid,'redcolor': todatecheck == 0 || 1 || 2,'nocolor': todatecheck == '-1'}" data-ng-model="objagreement.todate" ng-required="true">
                                 <label for="todate" data-error="Required" class="active">To Date</label>
                              </div> -->
                        </div>
                        <div class="row">
                           <div class="input-field col s6">
                              <select id="wagetype" name="wagetype" class="validate" ng-required="true" ng-class="{'submitted': submitted && agreementform.wagetype.$invalid,'redcolor': wagetypecheck == 0 || 1 || 2,'nocolor': wagetypecheck == '-1'}" ng-model="objagreement.wagetype" data-ng-options="at.lkvalid as at.description for at in wagetype" ng-change='getwagetype(objagreement.wagetype,objagreement.wageyearid)'>
                              </select><label for="wagetype" data-error="Required">Wage Type</label>
                           </div>
                           <div class="input-field col s6">
                              <select id="agreementstatus" name="agreementstatus" class="validate" ng-required="true" ng-class="{'submitted': submitted && agreementform.agreementstatus.$invalid,'redcolor': agreementstatuscheck == 0 || 1 || 2,'nocolor': agreementstatuscheck == '-1'}" ng-model="objagreement.agreementstatus" data-ng-options="at.lkvalid as at.description for at in agreementstatus">
                              </select><label for="agreementstatus" data-error="Required">Agreement Status</label>
                           </div>
                        </div>
                        <div class="row">
                           <div class="input-field col s6">
                              <select id="wagerate" name="wagerate" class="validate" ng-required="true" ng-class="{'submitted': submitted && agreementform.wagerate.$invalid,'redcolor': rateyearcheck == 0 || 1 || 2,'nocolor': rateyearcheck == '-1'}" ng-model="objagreement.wageyearid" data-ng-options="at.lkvalid as at.description for at in wagerate" ng-change='getchangecategory(objagreement.wageyearid,objagreement.wagetype)'>
                              </select><label for="wagerate" data-error="Required">Wage Rate Year</label>
                           </div>
                           <div class="input-field col s6" ng-if="objagreement.wageyearid">
                              <select id="wagecategoryid" name="wagecategoryid" ng-class="{'redcolor': wagecategorycheck == 0 || 1 || 2,'nocolor': wagecategorycheck == '-1'}" class="validate" ng-model="objagreement.wagecategoryid" data-ng-options="at.category_id as at.category_code + ' - ' + at.category_description for at in wagecategories">
                              </select>
                              <label for="wagearea">Wage Category</label>
                           </div>
                        </div>
                        <div class="row">
                           <div class="input-field col s6" ng-hide="objagreement.wagetype==tncode">
                              <select id="wagearea" name="wagearea" class="validate" ng-model="objagreement.wageareaid" data-ng-options="at.lkvalid as at.description for at in wagearea" ng-class="{'redcolor': wageareacheck == 0 || 1 || 2,'nocolor': wageareacheck == '-1'}">
                              </select>
                              <label for="wagearea">Wage Area</label>
                           </div>
                           <div class="input-field col s6">
                              <select id="typeagreement" name="typeagreement" class="validate" ng-required="true" ng-class="{'submitted': submitted && agreementform.typeagreement.$invalid,'redcolor': agtypecheck == 0 || 1 || 2,'nocolor': agtypecheck == '-1'}" ng-model="objagreement.typeagreement" data-ng-options="at.lkvalid as at.description for at in typeofagreement" ng-change='getagreementtype(objagreement.typeagreement)'>
                              </select><label for="typeagreement">Type of Agreement</label>
                           </div>
                        </div>
                        <div class="row">
                           <div class="input-field col s6" ng-show="objagreement.typeagreement==typeofagreementoth.lkvalid">
                              <input id="others" name="other" class="validate" ng-required="objagreement.typeagreement==typeofagreementoth.lkvalid" ng-model="objagreement.typeofagreementoth" type="text" maxlength="100" />
                              <label for="others">Others</label>
                           </div>
                        </div>
                     </div>
                  </div>
            </div>
         </div>
         <div class="modal-footer">
            <div id="failure2" class="failure red-text waves-effect waves-green"></div>
            <button class="waves-effect waves-green btn-flat" type="submit" ng-click="submitted=true;">
               Approve
            </button>
            <a href="" class="modal-action modal-close waves-effect btn-flat" ng-click="RejectAgreement(objagreement.agreementid);">Reject</a>
         </div>
         </form>
      </div> 
      <!--modal2 addendum-->
      <div id="modal2" class="modal modal-fixed-footer" style="max-height:90%;">
         <div class="modal-content">
            <nav class="blue" style="position: fixed;margin-top: 0px; z-index:999">
               <div class="left col s1 m1 l1">
                  <div class="white-text"><a href=""><i class="modal-action modal-close mdi white-text mdi-arrow-left"></i></a> </div>
               </div>
               <div class="col s11 m11 l11">
                  <div class="li white-text" id="mcaption">Add Agreement</div>
               </div>
            </nav>
            <form ng-submit="addaddendumform.$valid && saveaddendum(objagreement, objjobs, 1)" id="addaddendumform" name="addaddendumform" novalidate style="padding: 50px;">
               <div class="input-field col s12">
                  <table>
                     <tr>
                        <th>Postings</th>
                        <th>Strength</th>
                        <!-- <th>Salary</th> -->
                     </tr>
                     <tr ng-repeat="l in objjobs">
                        <td><input ng-model="l.agreementexpirydetailid" type="hidden"> {{l.name}}</td>
                        <td><input ng-model="l.numberofvacancies" id="{{l.jobmasterid}}" value="{{l.numberofvacancies | number}}" class="validate" type="number" pattern="[0-9]*" ng-required="true" min="0"> </td>
                        <!-- <td><input ng-model="l.salary" id="{{l.jobmasterid}}" value="{{l.salary | number}}" class="validate" type="number" pattern="[0-9]*" ng-required="true" min="0" ng-disabled="functions=='edit'"> </td> -->
                     </tr>
                  </table>
               </div>
         </div>
         <div class="modal-footer">
            <div id="failure" class="failure red-text waves-effect waves-green"></div>
            <button class="waves-effect waves-green btn-flat" type="submit" ng-click="submitted=true;">
               Save
            </button>
            <a href="" class="modal-action modal-close waves-effect btn-flat ">Cancel</a>
         </div>
         </form>
      </div>

     <!-- <div id="agreementmodal" class="modal modal-fixed-footer" style="max-height:90%;">
         <div class="modal-content">
            <nav class="blue" style="position: fixed;margin-top: 0px; z-index:999">
               <div class="left col s1 m1 l1">
                  <div class="white-text"><a href=""><i class="modal-action modal-close mdi white-text mdi-arrow-left"></i></a> </div>
               </div>
               <div class="col s11 m11 l11">
                  <div class="li white-text" id="mcaption">Change Agreement Type</div>
               </div>
            </nav>
            <form ng-submit="addaddendumform.$valid && saveAgreementtype(objagreement,selectedprojectslist)" id="agtypeform" name="addaddendumform" novalidate style="padding: 50px;">
               <div class="input-field col s12">
               <div class="input-field col s6">
                           <select id="agreementtypeid" name="agreementtypeid" class="validate" ng-required="true" ng-class="{'submitted': submitted && agreementform.agreementtype.$invalid}" ng-model="objagreement.agreementtypeid" data-ng-options="at.lkvalid as at.description for at in agreementtype">
                           </select><label for="agreementtype" class="agtypess">Agreement Type</label>
                        </div> 
						
                        <div class="input-field col s6">
						
						 <label>Select Projects:</label>
                                 <div isteven-multi-select input-model="cprojectnames" output-model="selectedprojects" button-label="name" item-label="name" on-item-click='getmultivals(data)' tick-property="ticked" style="width:100%">
                                 </div>
                                 <div isteven-multi-select input-model="cprojectnames" output-model="selectedprojectslist" button-label="projectno" item-label="projectno" tick-property="ticked" style="width:100%"> </div>
         </div>
               </div>
         </div>
         <div class="modal-footer">
            <div id="failure" class="failure red-text waves-effect waves-green"></div>
            <button class="waves-effect waves-green btn-flat" type="submit" ng-click="submitted=true;">
               Save
            </button>
            <a href="" class="modal-action modal-close waves-effect btn-flat ">Cancel</a>
         </div>
         </form>
      </div>-->

      <!-- jobs edit -->
      <div id="jobsedit" class="modal modal-fixed-footer" style="max-height:90%;">
         <div class="modal-content">
            <nav class="blue" style="position: fixed;margin-top: 0px; z-index:999">
               <div class="left col s1 m1 l1">
                  <div class="white-text"><a href=""><i class="modal-action modal-close mdi white-text mdi-arrow-left"></i></a> </div>
               </div>
               <div class="col s11 m11 l11">
                  <div class="li white-text" id="mcaptions">Edit Strength</div>
               </div>
            </nav>
            <form ng-submit="jobsaddaddendumform.$valid && saveaddendum(objagreement, updatejobs,2)" id="jobsaddaddendumform" name="jobsaddaddendumform" novalidate style="padding: 50px;">
               <div class="input-field col s12">
                  <table>
                     <tr>
                        <th>Postings</th>
                        <th>Strength</th>
                        <!-- <th>Salary</th> -->
                     </tr>
                     <tr ng-repeat="l in updatejobs">
                        <td><input ng-model="l.agreementexpirydetailid" type="hidden"> {{l.code}}</td>
                        <td><input ng-model="l.numberofvacancies" id="{{l.jobmasterid}}" value="{{l.numberofvacancies | number}}" class="validate" type="number" pattern="[0-9]*" ng-required="true" min="0"> </td>
                        <!-- <td><input ng-model="l.salary" id="{{l.jobmasterid}}" value="{{l.salary | number}}" class="validate" type="number" pattern="[0-9]*" ng-required="true" min="0" ng-disabled="functions=='edit'"> </td> -->
                     </tr>
                  </table>
               </div>
         </div>
         <div class="modal-footer">
            <div id="failure" class="failure red-text waves-effect waves-green"></div>
            <button class="waves-effect waves-green btn-flat" type="submit" ng-click="submitted=true;">
               Save
            </button>
            <a href="" class="modal-action modal-close waves-effect btn-flat ">Cancel</a>
         </div>
         </form>
      </div>
      <!-- Addendum Edit -->
      <div id="addendumedit" class="modal modal-fixed-footer" style="max-height:90%;">
         <div class="modal-content">
            <nav class="blue" style="position: fixed;margin-top: 0px; z-index:999">
               <div class="left col s1 m1 l1">
                  <div class="white-text"><a href=""><i class="modal-action modal-close mdi white-text mdi-arrow-left"></i></a> </div>
               </div>
               <div class="col s11 m11 l11">
                  <div class="li white-text" id="mcaptions">Edit Addendum</div>
               </div>
            </nav>
            <form ng-submit="addaddendumformedit.$valid && updateaddendum(objagreement, updatejobss)" id="addaddendumformedit" name="addaddendumformedit" novalidate style="padding: 50px;">
               <div class="input-field col s12">
                  <table>
                     <tr>
                        <th> Addendum </th>
                        <th> Postings </th>
                        <th> Strength </th>
                        <!-- <th> Salary </th> -->
                     </tr>
                     <tbody ng-repeat="kl in updatejobss">
                        <tr ng-repeat="l in kl">
                           <td><input ng-model="l.addendum" type="hidden"> Addendum - {{l.addendum}}</td>
                           <td><input ng-model="l.agreementexpirydetailid" type="hidden"> {{l.code}}</td>
                           <td><input ng-model="l.numberofvacancies" id="{{l.jobmasterid}}" value="{{l.numberofvacancies | number}}" class="validate" type="number" pattern="[0-9]*" ng-required="true" min="0"> </td>
                           <!-- <td><input ng-model="l.salary" id="{{l.jobmasterid}}" value="{{l.salary | number}}" class="validate" type="number" pattern="[0-9]*" ng-required="true" min="0" ng-disabled="functions=='edit'"> </td> -->
                        </tr>
                     </tbody>
                  </table>
               </div>
         </div>
         <div class="modal-footer">
            <div id="failure" class="failure red-text waves-effect waves-green"></div>
            <button class="waves-effect waves-green btn-flat" type="submit" ng-click="submitted=true;">
               Save
            </button>
            <a href="" class="modal-action modal-close waves-effect btn-flat ">Cancel</a>
         </div>
         </form>
      </div>
      <!-- Add Agreement -->
      <div id="modal1" class="modal modal-fixed-footer" style="max-height:90%;">
         <form ng-submit="agreementform.$valid && saveagreement(objagreement, selectedObjects)" id="agreementform" name="agreementform" novalidate>
            <div class="modal-content">
               <nav class="blue" style="position: fixed;margin-top: 0px; z-index:999">
                  <div class="left col s1 m1 l1">
                     <div class="white-text"><a href=""><i class="modal-action modal-close mdi white-text mdi-arrow-left"></i></a> </div>
                  </div>
                  <div class="col s11 m11 l11">
                     <div class="li white-text" id="m1caption">Add Agreement</div>
                  </div>
               </nav>
               <div class="row" style="padding: 40px;">
                  <div class="row" style="height:40px;">&nbsp;</div>
                  <div class="row">
                     <div class="input-field col s6">
                        <select id="agreementtypeid" name="agreementtypeid" class="validate" ng-required="true" ng-class="{'submitted': submitted && agreementform.agreementtype.$invalid}" ng-model="objagreement.agreementtypeid" data-ng-options="at.lkvalid as at.description for at in agreementtype" ng-disabled="functions=='edit'" ng-change='getagtype(objagreement.agreementtypeid)'>
                        </select><label for="agreementtype" class="agtypess">Agreement Type</label>
                     </div> 
                     <div class="input-field col s6" ng-if='agreementtypeval == "SINGLE"'>
                        <select id="projectno" name="projectno" class="validate" ng-class="{'submitted': submitted && objagreement.projectid.$invalid}" ng-model="objagreement.projectid" data-ng-options=" p.projectid as p.projectno for p in projectnos" ng-change="fillclientproject(objagreement.projectid)">
                        </select><label for="agreementtype" class="projectsnos">Project No</label>
                     </div>
                     <div class="input-field col s6" ng-if='agreementtypeval == "COMBINED"'>
                        <select id="client" name="client" class="validate" ng-required="true" ng-class="{'submitted': submitted && agreementform.clientid.$invalid}" ng-model="objagreement.clientid" data-ng-options=" c.clientid as c.organization for c in clientslists" ng-change="selectProject(objagreement.clientid)">
                        </select><label for="client" class="empclients">Employer Name</label>
                     </div>
                  </div> 
                  <div class="row">
                     <div class="input-field col s6" ng-if='agreementtypeval == "COMBINED"'>
                        <label for="agreementtype">Project No</label> <br><br>
                        <div isteven-multi-select input-model="projectnames" output-model="selectedprojectslist" button-label="projectno" item-label="projectno" on-item-click='getmultivals(data,selectedprojectslist)' tick-property="ticked" style="width:100%"> </div>
                     </div>
                     <div class="input-field col s6" ng-if='agreementtypeval == "SINGLE"'>
                        <input id="clientdesc" readonly ng-model="objagreement.organization"> 
                        <input id="client" type="hidden" class="validate" ng-model="objagreement.clientid" name="client">
                        <label for="agreementtype" class="projectsnos">Employer Name</label>
                     </div>
                     <div class="input-field col s6">
                        <select id="wagetype" name="wagetype" class="validate" ng-required="true" ng-class="{'submitted': submitted && agreementform.wagetype.$invalid}" ng-model="objagreement.wagetype" data-ng-options="at.lkvalid as at.description for at in wagetype" ng-change='getchangemethod()' ng-disabled="functions=='edit'">
                        </select><label for="wagetype">Wage Type</label>
                     </div>
                  </div>
                  <div class="row">
                     <div class="input-field col s6">
                        <input id="startdate" type="date" class="adddatepicker" ng-class="{'submitted': submitted && agreementform.fromdate.$invalid}" data-ng-model="objagreement.fromdate" ng-required="true">
                        <label for="startdate" >Start Date </label>
                     </div>
                     <div class="input-field col s6">
                        <input id="enddate" type="date" class="adddatepicker" ng-class="{'submitted': submitted && agreementform.todate.$invalid}" data-ng-model="objagreement.todate" ng-required="true">
                        <label for="enddate" >End Date </label>
                     </div>
                  </div>
                  <div class="row">
                     <div class="input-field col s6">
                        <select id="wagerate" name="wagerate" class="validate" ng-required="true" ng-class="{'submitted': submitted && agreementform.wagerate.$invalid}" ng-model="objagreement.wageyearid" data-ng-options="at.lkvalid as at.description for at in wagerate" ng-change='getchangecategory(objagreement.wageyearid,objagreement.wagetype)'>
                        </select><label for="wagerate" data-error="Required">Wage Rate Year</label>
                     </div>
                     <div class="input-field col s6"  ng-hide="objagreement.wagetype==tncode">
                        <select id="wagearea" name="wagearea" class="validate" ng-model="objagreement.wageareaid" data-ng-options="at.lkvalid as at.description for at in wagearea" ng-disabled="functions=='edit'" ng-change='getchangemethod()'>
                        </select>
                        <label for="wagearea">Wage Area</label>
                     </div>
                  </div>
                  <div class="row">
                     <div class="input-field col s6">
                        <select id="wagecategoryid" name="wagecategoryid" class="validate" ng-model="objagreement.wagecategoryid" data-ng-options="at.category_id as at.category_code + ' - ' + at.category_description for at in wagecategories">
                        </select>
                        <label for="wagearea">Wage Category</label>
                     </div>
                     <div class="input-field col s6">
                        <select id="agreementstatus" name="agreementstatus" class="validate" ng-required="true" ng-class="{'submitted': submitted && agreementform.agreementstatus.$invalid}" ng-model="objagreement.agreementstatus" data-ng-options="at.lkvalid as at.description for at in agreementstatus" ng-disabled="functions=='edit'">
                        </select><label for="agreementstatus">Agreement Status</label>
                     </div>
                  </div> 
                  <!-- <div class="row"> 
                     <div class="input-field col s6">
                        <select id="taxtype" name="taxtype" class="validate" ng-required="true" ng-class="{'submitted': submitted && agreementform.taxtype.$invalid}" ng-model="objagreement.taxtype" data-ng-options="at.lkvalid as at.description for at in taxtype">
                        </select><label for="taxtype" data-error="Required">Tax Type</label>
                     </div>
                  </div> -->
                  <div class="row">
                     <div class="input-field col s6">
                        <input id="servicecharge" name="servicecharge" type="text" ng-class="{'submitted': submitted && agreementform.servicecharge.$invalid}" class="validate" ng-model="objagreement.servicecharge" maxlength="100" ng-required="true" ng-disabled="functions=='edit'">
                        <label for="servicecharge" data-error="Required">Service Charge (In %)</label>
                     </div>
                     <div class="input-field col s6">
                        <input id="tax" name="tax" type="text" ng-class="{'submitted': submitted && agreementform.tax.$invalid}" class="validate" ng-model="objagreement.tax" maxlength="100" ng-required="true" ng-disabled="functions=='edit'">
                        <label for="tax" data-error="Required">Tax (In %)</label>
                     </div>
                  </div>
                  <div class="row">
                     <div class="input-field col s6">
                        <select id="typeagreement" name="typeagreement" class="validate" ng-required="true" ng-class="{'submitted': submitted && agreementform.typeagreement.$invalid}" ng-model="objagreement.typeagreement" data-ng-options="at.lkvalid as at.description for at in typeofagreement" ng-disabled="functions=='edit'">
                        </select><label for="typeagreement">Type of Agreement</label>
                     </div>
                     <div class="input-field col s6" ng-show="objagreement.typeagreement==typeofagreementoth.lkvalid">
                        <input id="others" name="other" class="validate" ng-required="objagreement.typeagreement==typeofagreementoth.lkvalid" ng-model="objagreement.typeofagreementoth" type="text" maxlength="100" ng-disabled="functions=='edit'" />
                        <label for="others">Others</label>
                     </div>
                  </div>
                  <div class="row" ng-repeat="m in selectedObjects" id="{{ 'object-' + $index }}">
                     <h6>{{m.name}}({{m.projectno}})</h6>
                     <div class="input-field col s12">
                        <table>
                           <tr>
                              <th>Postings</th>
                              <th>Strength</th>
                              <!-- <th>Salary
                              <th> -->
                           </tr>
                           <tr ng-repeat="l in m.jobs">
                              <td><input ng-model="l.agreementexpirydetailid" id="{{ l.agreementexpirydetailid + $index }}" type="hidden"> {{l.code}} </td>
                              <td><input ng-model="l.numberofvacancies" id="{{ l.numberofvacancies + $index }}" value="{{l.numberofvacancies | number}}" class="validate" type="text" pattern="[0-9]*" ng-required="true" min="0" ng-disabled="functions=='edit'"> </td>
                              <!-- <td><input ng-model="l.salary" id="{{ l.salary + $index }}" value="{{l.salary | number}}" class="validate" type="text" pattern="[0-9]*" ng-required="true" min="0" ng-disabled="functions=='edit'"> </td> -->
                           </tr>
                        </table>
                     </div>
                  </div>
               </div>
            </div>
            <div class="modal-footer">
               <div id="failure1" class="failure red-text waves-effect waves-green"></div>
               <button class="waves-effect waves-green btn-flat" type="submit" ng-click="submitted=true;">
                  Save
               </button>
               <a href="" class="modal-action modal-close waves-effect btn-flat ">Cancel</a>
            </div>
         </form>
      </div>
      <!-- add combine Agreement -->
      <div id="modal4" class="modal modal-fixed-footer" style="max-height:90%;">
         <div class="modal-content">
            <nav class="blue" style="position: fixed;margin-top: 0px; z-index:999">
               <div class="left col s1 m1 l1">
                  <div class="white-text"><a href=""><i class="modal-action modal-close mdi white-text mdi-arrow-left"></i></a> </div>
               </div>
               <div class="col s11 m11 l11">
                  <div class="li white-text" id="m1caption">Add Agreement</div>
               </div>
            </nav>
            <div class="row" style="padding: 40px;">
               <form ng-submit="agreementform.$valid && saveagreement(objagreement, selectedObjects)" id="agreementform" name="agreementform" novalidate>
                  <div class="row" style="height:40px;">&nbsp;</div>
                  <div class="row">
                     <div class="col s12">
                        <div class="row">
                           <div class="input-field col s6">
                              <select id="client" name="client" class="validate" ng-required="true" ng-class="{'submitted': submitted && agreementform.clientid.$invalid}" ng-model="objagreement.clientid" data-ng-options=" c.clientid as c.organization for c in clientslists" ng-change="selectProject(objagreement.clientid)">
                              </select><label for="client">Employer</label>
                           </div>
                           <div class="input-field col s6">
                              <select id="agreementtypeid" name="agreementtypeid" class="validate" ng-required="true" ng-class="{'submitted': submitted && agreementform.agreementtype.$invalid}" ng-model="objagreement.agreementtypeid" data-ng-options="at.lkvalid as at.description for at in agreementtype" ng-disabled="functions=='add'" ng-change='getagtype(objagreement)'>
                              </select><label for="agreementtype">Agreement Type</label>
                           </div>
                        </div>
                        <div class="row">
                           <div class="input-field col s6">
                              <div class="form-group" ng-hide="objagreement.agreementtype =='COMBINED'">
                                 <select id="project" name="project" class="validate" ng-model="objagreement.projectid" data-ng-options=" p.projectid as p.name + ' (' + p.projectno + ')' for p in selectedprojects" ng-change='getagtypes()'>
                                 </select><label for="project">Project</label>
                              </div>
                              <div class="form-group" ng-hide="objagreement.agreementtype =='SINGLE'">
                                 <label>Select Projects:</label>
                                 <div isteven-multi-select input-model="projectnames" output-model="selectedprojects" button-label="name" item-label="name" on-item-click='getmultivals(data)' tick-property="ticked" style="width:100%">
                                 </div>
                              </div>
                           </div>
                           <div class="input-field col s6">
                              <select id="wagetype" name="wagetype" class="validate" ng-required="true" ng-class="{'submitted': submitted && agreementform.wagetype.$invalid}" ng-model="objagreement.wagetype" data-ng-options="at.lkvalid as at.description for at in wagetype" ng-change='getchangemethod()' ng-disabled="functions=='edit'">
                              </select><label for="wagetype">Wage Type</label>
                           </div>
                        </div>
                        <div class="row">
                           <div class="input-field col s6">
                              <input id="fromdate" type="date" class="adddatepicker" type="text" ng-class="{'submitted': submitted && agreementform.fromdate.$invalid}" data-ng-model="objagreement.fromdate" ng-required="true" autofocus>
                              <label for="fromdate" data-error="Required" class="dp-click">From date</label>
                           </div>
                           <div class="input-field col s6">
                              <input id="todate" type="date" class="adddatepicker" type="text" ng-class="{'submitted': submitted && agreementform.todate.$invalid}" data-ng-model="objagreement.todate" ng-required="true" autofocus>
                              <label for="todate" data-error="Required" class="dp-click">To Date</label>
                           </div>
                        </div>
                        <div class="row">
                           <div class="input-field col s6">
                              <input id="servicecharge" name="servicecharge" type="text" ng-class="{'submitted': submitted && agreementform.servicecharge.$invalid}" class="validate" ng-model="objagreement.servicecharge" maxlength="100" ng-required="true" ng-disabled="functions=='edit'">
                              <label for="servicecharge" data-error="Required">Service Charge (In %)</label>
                           </div>
                           <div class="input-field col s6">
                              <input id="tax" name="tax" type="text" ng-class="{'submitted': submitted && agreementform.tax.$invalid}" class="validate" ng-model="objagreement.tax" maxlength="100" ng-required="true" ng-disabled="functions=='edit'">
                              <label for="tax" data-error="Required">Tax (In %)</label>
                           </div>
                        </div>
                        <div class="row">
                           <div class="input-field col s6">
                              <select id="wagerate" name="wagerate" class="validate" ng-required="true" ng-class="{'submitted': submitted && agreementform.wagerate.$invalid}" ng-model="objagreement.wageyearid" data-ng-options="at.lkvalid as at.description for at in wagerate" ng-change='getwagecategorytype(objagreement.wageyearid,objagreement.wagetype)'>
                              </select><label for="wagerate" data-error="Required">Wage Rate Year</label>
                           </div>
                           <div class="input-field col s6">
                              <select id="wagecategoryid" name="wagecategoryid" class="validate" ng-model="objagreement.wagecategoryid" data-ng-options="at.category_id as at.category_code + ' - ' + at.category_description for at in wagecategories">
                              </select>
                              <label for="wagearea">Wage Category</label>
                           </div>
                        </div>
                        <div class="row">
                           <div class="input-field col s6" ng-hide="objagreement.wagetype==tncode">
                              <select id="wagearea" name="wagearea" class="validate" ng-model="objagreement.wageareaid" data-ng-options="at.lkvalid as at.description for at in wagearea" ng-disabled="functions=='edit'" ng-change='getchangemethod()'>
                              </select>
                              <label for="wagearea">Wage Area</label>
                           </div>
                           <div class="input-field col s6">
                              <select id="agreementstatus" name="agreementstatus" class="validate" ng-required="true" ng-class="{'submitted': submitted && agreementform.agreementstatus.$invalid}" ng-model="objagreement.agreementstatus" data-ng-options="at.lkvalid as at.description for at in agreementstatus" ng-disabled="functions=='edit'">
                              </select><label for="agreementstatus">Agreement Status</label>
                           </div>
                        </div>
                        <div class="row">
                           <div class="input-field col s6">
                              <select id="typeagreement" name="typeagreement" class="validate" ng-required="true" ng-class="{'submitted': submitted && agreementform.typeagreement.$invalid}" ng-model="objagreement.typeagreement" data-ng-options="at.lkvalid as at.description for at in typeofagreement" ng-disabled="functions=='edit'">
                              </select><label for="typeagreement">Type of Agreement</label>
                           </div>
                           <div class="input-field col s6" ng-show="objagreement.typeagreement==typeofagreementoth.lkvalid">
                              <input id="others" name="other" class="validate" ng-required="objagreement.typeagreement==typeofagreementoth.lkvalid" ng-model="objagreement.typeofagreementoth" type="text" maxlength="100" ng-disabled="functions=='edit'" />
                              <label for="others">Others</label>
                           </div>
                           <!-- <div class="input-field col s6">
                                 <select id="taxtype" name="taxtype" class="validate" ng-class="{'submitted': submitted && agreementform.taxtype.$invalid}" ng-model="objagreement.taxtype" data-ng-options="at.lkvalid as at.description for at in taxtype">
                                 </select><label for="taxtype" data-error="Required">Tax Type</label>
                              </div> -->
                        </div>
                        <div class="row" ng-repeat="m in selectedObjects" id="{{ 'object-' + $index }}">
                           <h6>{{m.name}}({{m.projectno}})</h6>
                           <div class="input-field col s12">
                              <table>
                                 <tr>
                                    <th>Postings</th>
                                    <th>Strength</th>
                                    <!-- <th>Salary
                                    <th> -->
                                 </tr>
                                 <tr ng-repeat="l in m.jobs">
                                    <td><input ng-model="l.agreementexpirydetailid" id="{{ l.agreementexpirydetailid + $index }}" type="hidden"> {{l.code}} </td>
                                    <td><input ng-model="l.numberofvacancies" id="{{ l.numberofvacancies + $index }}" value="{{l.numberofvacancies | number}}" class="validate" type="text" pattern="[0-9]*" ng-required="true" min="0" ng-disabled="functions=='edit'"> </td>
                                    <!-- <td><input ng-model="l.salary" id="{{ l.salary + $index }}" value="{{l.salary | number}}" class="validate" type="text" pattern="[0-9]*" ng-required="true" min="0" ng-disabled="functions=='edit'"> </td> -->
                                 </tr>
                              </table>
                           </div>
                        </div>
                     </div>
                  </div>
            </div>
         </div>
         <div class="modal-footer">
            <div id="failure4" class="failure red-text waves-effect waves-green"></div>
            <button class="waves-effect waves-green btn-flat" type="submit" ng-click="submitted=true;">
               Save
            </button>
            <a href="" class="modal-action modal-close waves-effect btn-flat ">Cancel</a>
         </div>
         </form>
      </div>
      <!-- Approve Jobs -->
      <div id="approvejob" class="modal modal-fixed-footer" style="max-height:90%;">
         <div class="modal-content">
            <nav class="blue" style="position: fixed;margin-top: 0px; z-index:999">
               <div class="left col s1 m1 l1">
                  <div class="white-text"><a href=""><i class="modal-action modal-close mdi white-text mdi-arrow-left"></i></a> </div>
               </div>
               <div class="col s11 m11 l11">
                  <div class="li white-text" id="mcaptions">Approve Strength</div>
               </div>
            </nav>
            <form ng-submit="approveaddaddendumform.$valid && Approveaddendum(objagreement, updatejobss,2)" id="approveaddaddendumform" name="approveaddaddendumform" novalidate style="padding: 50px;">
               <div class="input-field col s12">
                  <table>
                     <tr>
                        <th>Postings</th>
                        <th>Strength</th>
                        <!-- <th>Salary</th> -->
                     </tr>
                     <tr ng-repeat="l in updatejobss">
                        <td><input ng-model="l.agreementexpirydetailid" type="hidden"> {{l.code}}</td>
                        <td><input ng-model="l.numberofvacancies" id="{{l.jobmasterid}}" value="{{l.numberofvacancies | number}}" class="validate" type="number" pattern="[0-9]*" ng-required="true" min="0"> </td>
                        <!-- <td><input ng-model="l.salary" id="{{l.jobmasterid}}" value="{{l.salary | number}}" class="validate" type="number" pattern="[0-9]*" ng-required="true" min="0" ng-disabled="functions=='edit'"> </td> -->
                     </tr>
                  </table>
               </div>
         </div>
         <div class="modal-footer">
            <div id="failure" class="failure red-text waves-effect waves-green"></div>
            <button class="waves-effect waves-green btn-flat" type="submit" ng-click="submitted=true;">
               Approve
            </button>
            <a href="" class="modal-action modal-close waves-effect btn-flat" ng-click="RejectAgreementJob(objagreement, updatejobss,2);">Reject</a>

         </div>
         </form>
      </div>

      <!-- Approve Addendum -->
      <div id="approveaddendum" class="modal modal-fixed-footer" style="max-height:90%;">
         <div class="modal-content">
            <nav class="blue" style="position: fixed;margin-top: 0px; z-index:999">
               <div class="left col s1 m1 l1">
                  <div class="white-text"><a href=""><i class="modal-action modal-close mdi white-text mdi-arrow-left"></i></a> </div>
               </div>
               <div class="col s11 m11 l11">
                  <div class="li white-text" id="m3captionss">Approve Addendum</div>
               </div>
            </nav>
            <form ng-submit="addaddendumforms.$valid && Approveaddendums(objagreement, updatejobss,2)" id="addaddendumforms" name="addaddendumforms" novalidate style="padding: 50px;">
               <div class="input-field col s12">
                  <table>
                     <tr>
                        <th>Postings</th>
                        <th>Strength</th>
                        <!-- <th>Salary</th> -->
                     </tr>
                     <tr ng-repeat="l in updatejobss">
                        <td><input ng-model="l.agreementexpirydetailid" type="hidden"> {{l.code}}</td>
                        <td><input ng-model="l.numberofvacancies" id="{{l.jobmasterid}}" value="{{l.numberofvacancies | number}}" class="validate" type="number" pattern="[0-9]*" ng-required="true" min="0"> </td>
                        <!-- <td><input ng-model="l.salary" id="{{l.jobmasterid}}" value="{{l.salary | number}}" class="validate" type="number" pattern="[0-9]*" ng-required="true" min="0" ng-disabled="functions=='edit'"> </td> -->
                     </tr>
                  </table>
               </div>
         </div>
         <div class="modal-footer">
            <div id="failure" class="failure red-text waves-effect waves-green"></div>
            <button class="waves-effect waves-green btn-flat" type="submit" ng-click="submitted=true;">
               Approve
            </button>
            <a href="" class="modal-action modal-close waves-effect btn-flat" ng-click="RejectAgreementJob(objagreement, updatejobss,2);">Reject</a>

         </div>
         </form>
      </div>

      <div class="row">
         <div class="col s12">
            <ul class="tabs">
               <li class="tab col s3"><a ng-click="getexcecuted()" class="active" id="Excecuted" href="#excecuted">Excecuted<span class="badge" style="margin-top: 10px;background-color: #ee6e73;width: 45px;">{{excecutedcount}}</span></a></li>
               <li class="tab col s3"><a ng-click="getsigned()" id="Signed" href="#signed">Signed<span class="badge" style="margin-top: 10px;background-color: #ee6e73;width: 45px;">{{signedcount}}</span></a></li>
               <li class="tab col s3"><a ng-click="getrenewal()" id="Renewal" href="#renewal"><span class="badge" style="margin-top: 10px;background-color: #ee6e73;width: 45px;">{{renewalcount}}</span>Renewal</a></li> 
               <li class="tab col s3"><a ng-click="getpending()" id="Pending" href="#pending"><span class="badge" style="margin-top: 10px;background-color: #ee6e73;width: 45px;">{{pendingcount}}</span>AM Updated Employers</a></li>
            </ul>
         </div>
         <div id="renewal" class="col s12">
            <div id="" class="section">
               <div class="row">
                  <div class="col s12 ">
                     <div id="Client-list" class="CLheight col s12 m4 l4 card-panel z-depth-1">
                        <ul class="collection">
                           <div class="row">
                              <div class="col s12">
                                 <nav class="indigo">
                                    <div class="nav-wrapper">
                                       <!-- <div class="input-field  col s4" style="padding-top:18px; margin-right:0px;">
                                          <input type="checkbox" class="filled-in" id="filled-in-box1" checked="checked" ng-model="filterproj1" />
                                          <label for="filled-in-box1">Proj. No:</label>
                                       </div> -->
                                       <div class="input-field col s8"> <i class="material-icons prefix">search</i>
                                          <input id="icon_prefix" placeholder="search" type="text" class="validate" ng-model="filter1" ng-change="searchRenewalAgreement(filter1)">
                                       </div>
                                    </div>
                                 </nav>
                              </div>
                           </div>
                           <div class="scroll">
                              <li ng-if="!filterproj1" class="collection-item avatar waves-effect waves-teal col s12" ng-class="{selected: agreement.agreementid === selected.agreementid}" ng-repeat="agreement in agreementsrenewal | orderBy:agreement.projects[0].projectno" ng-click="select(agreement)">
                                 <a href="javascript::void(0)">
                                    <div style="margin-top: 10px;">
                                       <span class="circle light-blue" style="padding: 10px;">{{agreement.organization.slice(0,1)}}</span> <span class="email-title"></span>
                                       <p class="truncate grey-text ultra-small">{{agreement.projects[0].projectno}}-{{agreement.organization}}</p>
                                    </div>
                                 </a>
                              </li>
                              <li ng-if="filterproj1" class="collection-item avatar waves-effect waves-teal col s12" ng-class="{selected: agreement.agreementid === selected.agreementid}" ng-repeat="agreement in agreementsrenewal | orderBy:agreement.projects[0].projectno" ng-click="select(agreement)">
                                 <a href="javascript::void(0)">
                                    <div style="margin-top: 10px;">
                                       <span class="circle light-blue" style="padding: 10px;">{{agreement.organization.slice(0,1)}}</span> <span class="email-title"></span>
                                       <p class="truncate grey-text ultra-small">{{agreement.projects[0].projectno}}-{{agreement.organization}}</p>
                                    </div>
                                 </a>
                              </li>
                           </div>
                        </ul>
                     </div>
                     <div id="Client-details" class="col s10 m8 l8 card-panel z-depth-1">
                        <div class="email-content-wrap">
                           <div class="row z-depth-1" style="background-color: #eee;">
                              <div class="col s12 m10 l10">
                                 <ul class="collection">
                                    <li class="collection-item avatar" style="background-color:transparent">
                                       <img src="<?php echo base_url("assets/images/photo.png ") ?>" alt="" class="circle">
                                       <p class="truncate grey-text ultra-small">{{selected.projects[0].projectno}} - {{selected.organization}}</p>
                                    </li>
                                 </ul>
                              </div>
                              <div class="col s2 m2 l2 right-align  resultframe">
                                 <?php if ($roledata['permissions']['EAGREE'] == 1) { ?>
                                    <a id="editagreement" ng-click='editagreement()'><span><i class="small icon darken-1 mdi mdi-account-edit"></i></span></a>
                                 <?php } ?>
                                 <?php if ($roledata['permissions']['DAGREE'] == 1) { ?>
                                    <a ng-click='removeagreement()'><span><i class="small icon mdi mdi-delete"></i></span></a>
                                 <?php } ?>
                                 <a href="<?php echo base_url("admin/agreementprint?agreementid={{selected.agreementid}}") ?>" target="_blank"><span><i class="small icon darken-1 mdi mdi-file-document"></i></span></a>
                              </div>
                           </div>
                           <div class="row">
                              <div class="col s12 m6 l6">
                                 <p class="blue-grey-text"><strong>From Date</strong> </p>
                                 <p>{{selected.fromdate}}</p>
                              </div>
                              <div class="col  s12 m6 l6">
                                 <p class="blue-grey-text"><strong>To Date</strong> </p>
                                 <p>{{selected.todate}}</p>
                              </div>
                           </div>
                           <div class="row">
                              <div class="col s12 m6 l6">
                                 <p class="blue-grey-text"><strong>Employer</strong> </p>
                                 <p>{{selected.organization}}</p>
                              </div>
                              <div class="col s12 m6 l6">
                                 <p class="blue-grey-text"><strong>Service Charge</strong> </p>
                                 <p>{{selected.servicecharge}}</p>
                              </div>
                           </div>
                           <div class="row">
                              <div class="col s12 m6 l6">
                                 <p class="blue-grey-text"><strong>Tax</strong> </p>
                                 <p>{{selected.tax}}</p>
                              </div>
                              <div class="col  s12 m6 l6">
                                 <p class="blue-grey-text"><strong>Agreement Type</strong> </p>
                                 <p>{{selected.agtype}}</p>

                                 
                                 
                              </div>
                           </div>
                           <div class="row">
                              <div class="col s12 m6 l6">
                                 <p class="blue-grey-text"><strong>Wage Type</strong> </p>
                                 <p>{{selected.wagetype}}</p>
                              </div>
                              <div class="col  s12 m6 l6">
                                 <p class="blue-grey-text"><strong>Wage Rate Year</strong> </p>
                                 <p>{{selected.wageyear}}</p>
                              </div>
                           </div>
                           <div class="row">
                              <div class="col s12 m6 l6">
                                 <p class="blue-grey-text"><strong>Type of Agreement</strong> </p>
                                <!-- <p class="blue-grey-text"><strong>Type of Agreement </strong>  <a id="editagreement" ng-click='editagreementtype()'><span><i class="small icon darken-1 mdi mdi-account-edit"></i></span></a> </p>-->
                                 <p ng-show="selected.agreementtype!='Others'">{{selected.agreementtype}}</p>
                                 <p ng-show="selected.agreementtype=='Others'">{{selected.optionaltype}}</p>

                                
                              </div>
                              <div class="col  s12 m6 l6">
                                 <p class="blue-grey-text"><strong>Agreement Status</strong> </p>
                                 <p>{{selected.agreementstatus}}</p>
                              </div>
                           </div>
                           <div class="row">
                              <div class="col s12 m6 l6">
                                 <p class="blue-grey-text"><strong>Wage Area</strong> </p>
                                 <p>{{selected.wagearea}}</p>
                              </div>
                           </div>
                           <div ng-repeat="p in selected.projects">
                              <div class="row z-depth-1" style="background-color: #eee;">
                                 <div class="col s12 m10 l10">
                                    <ul class="collection">
                                       <li class="collection-item avatar" style="background-color:transparent">
                                          <img src="<?php echo base_url("assets/images/photo.png ") ?>" alt="" class="circle">
                                          <span class="email-title">{{p.projectno}} - {{p.projectname}}</span>
                                          <p class="truncate grey-text ultra-small">{{selected.organization}}</p>
                                       </li>
                                    </ul>
                                 </div>
                                 <div class="col s2 m2 l2 right-align  resultframe">
                                    <?php if ($roledata['permissions']['EAGREE'] == 1) { ?>
                                       <a id="addendum" ng-click='addaddendum(selected.wagetypeid,selected.wageyearid,selected.wageareaid, selected.agreementid, p.agreementinfoid)' title="Addendum"><span><i class="small icon darken-1 mdi mdi-tooltip-outline-plus"></i></span></a>
                                       <a ng-click='editvacancy(selected.wagetypeid,selected.wageyearid,selected.wageareaid, selected.agreementid, p.agreementinfoid,p.jobs)' title="Edit"><span><i class="small icon mdi mdi-tooltip-edit"></i></span></a>
                                    <?php } ?>
                                 </div>
                              </div>
                              <div class="row">
                                 <div class="input-field col s12">
                                    <table>
                                       <thead>
                                          <tr>
                                             <th> Sno </th>
                                             <th>Postings</th>
                                             <th>Strength</th>
                                             <!-- <th>Salary
                                             <th> -->
                                          </tr>
                                       </thead>
                                       <tbody>
                                          <tr ng-repeat="l in p.jobs" ng-if="l.numberofvacancies > 0">
                                             <td> {{$index + 1}} </td>
                                             <td> {{l.code}}</td>
                                             <td>{{l.numberofvacancies}} </td>
                                             <!-- <td>{{l.salary}}</td> -->
                                          </tr>
                                       </tbody>
                                    </table>
                                 </div>
                              </div>
                              <div class="email-content-wrap" ng-if="p.addendums.length > 0">
                                 <div class="row z-depth-1" style="background-color: #eee;">
                                    <div class="col s12 m10 l10">
                                       <ul class="collection">
                                          <li class="collection-item avatar" style="background-color:transparent">
                                             <img src="<?php echo base_url("assets/images/photo.png ") ?>" alt="" class="circle">
                                             <span class="email-title">Addendum </span>
                                             <p class="truncate grey-text ultra-small">{{p.projectno}} - {{p.projectname}}</p>
                                          </li>
                                       </ul>
                                    </div>
                                    <div class="col s2 m2 l2 right-align  resultframe">
                                       <?php if ($roledata['permissions']['EAGREE'] == 1) { ?>
                                          <a ng-click='editaddendum(selected.wagetypeid,selected.wageyearid,selected.wageareaid, selected.agreementid, p.agreementinfoid,p.addendums)' title="Edit Addendum"><span><i class="small icon mdi mdi-tooltip-edit"></i></span></a>
                                       <?php } ?>
                                       <?php if ($roledata['permissions']['DAGREE'] == 1) { ?>
                                       <a ng-click='removeagreement()'><span><i class="small icon mdi mdi-delete"></i></span></a>
                                       <?php } ?>
                                    </div>
                                 </div>
                                 <div class="row">
                                    <div class="input-field col s12">
                                       <table>
                                          <thead>
                                             <tr>
                                                <th> Addendum </th>
                                                <th> Postings </th>
                                                <th> Strength </th>
                                                <!-- <th> Salary </th> -->
                                             </tr>
                                          </thead>
                                          <tbody ng-repeat="j in p.addendums">
                                             <tr ng-repeat="k in j" ng-if="k.numberofvacancies > 0">
                                                <td> Addendum - {{k.addendum}} </td>
                                                <td> {{k.code}} </td>
                                                <td> {{k.numberofvacancies}} </td>
                                                <!-- <td> {{k.salary}} </td> -->
                                             </tr>
                                          </tbody>
                                       </table>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div id="signed" class="col s12">
            <div id="" class="section">
               <div class="row">
                  <div class="col s12 ">
                     <div id="Client-list" class="CLheight col s12 m4 l4 card-panel z-depth-1">
                        <ul class="collection">
                           <div class="row">
                              <div class="col s12">
                                 <nav class="indigo">
                                    <div class="nav-wrapper">
                                       <!-- <div class="input-field  col s4" style="padding-top:18px; margin-right:0px;">
                                          <input type="checkbox" class="filled-in" id="filled-in-box2" checked="checked" ng-model="filterproj2" />
                                          <label for="filled-in-box2">Proj. No:</label>
                                       </div> -->
                                       <div class="input-field col s8"> <i class="material-icons prefix">search</i>
                                          <input id="icon_prefix" placeholder="search" type="text" class="validate" ng-model="filter3" ng-change="searchSignedAgreement(filter3)">
                                       </div>
                                    </div>
                                 </nav>
                              </div>
                           </div>
                           <div class="scroll">
                              <li ng-if="!filterproj2" class="collection-item avatar waves-effect waves-teal col s12" ng-class="{selected: agreement.agreementid === selected.agreementid}" ng-repeat="agreement in agreementssigned | orderBy:agreement.projects[0].projectno" ng-click="select(agreement)">
                                 <a href="javascript::void(0)">
                                    <div style="margin-top: 10px;">
                                       <span class="circle light-blue" style="padding: 10px;">{{agreement.organization.slice(0,1)}}</span>
                                       <p class="truncate grey-text ultra-small">{{agreement.projects[0].projectno}}-{{agreement.organization}}</p>
                                    </div>
                                 </a>
                              </li>
                              <li ng-if="filterproj2" class="collection-item avatar waves-effect waves-teal col s12" ng-class="{selected: agreement.agreementid === selected.agreementid}" ng-repeat="agreement in agreementssigned | filter:{projects: [{projectno:filter2}]}" ng-click="select(agreement)">
                                 <a href="javascript::void(0)">
                                    <div style="margin-top: 10px;">
                                       <span class="circle light-blue" style="padding: 10px;">{{agreement.organization.slice(0,1)}}</span>
                                       <p class="truncate grey-text ultra-small">{{agreement.projects[0].projectno}}-{{agreement.organization}}</p>
                                    </div>
                                 </a>
                              </li>
                           </div>
                        </ul>
                     </div>
                     <div id="Client-details" class="col s10 m8 l8 card-panel z-depth-1">
                        <div class="email-content-wrap">
                           <div class="row z-depth-1" style="background-color: #eee;">
                              <div class="col s12 m10 l10">
                                 <ul class="collection">
                                    <li class="collection-item avatar" style="background-color:transparent">
                                       <img src="<?php echo base_url("assets/images/photo.png ") ?>" alt="" class="circle">
                                       <p class="truncate grey-text ultra-small">{{selected.projects[0].projectno}} - {{selected.organization}}</p>
                                    </li>
                                 </ul>
                              </div>
                              <div class="col s2 m2 l2 right-align  resultframe">
                                 <?php if ($roledata['permissions']['EAGREE'] == 1) { ?>
                                    <a id="A4" ng-click='editagreement()'><span><i class="small icon darken-1 mdi mdi-account-edit"></i></span></a>
                                 <?php } ?>
                                 <?php if ($roledata['permissions']['DAGREE'] == 1) { ?>
                                    <a ng-click='removeagreement()'><span><i class="small icon mdi mdi-delete"></i></span></a>
                                 <?php } ?>
                                 <a href="<?php echo base_url("admin/agreementprint?agreementid={{selected.agreementid}}") ?>" target="_blank"><span><i class="small icon darken-1 mdi mdi-file-document"></i></span></a>
                              </div>
                           </div>
                           <div class="row">
                              <div class="col s12 m6 l6">
                                 <p class="blue-grey-text"><strong>From Date</strong> </p>
                                 <p>{{selected.fromdate}}</p>
                              </div>
                              <div class="col  s12 m6 l6">
                                 <p class="blue-grey-text"><strong>To Date</strong> </p>
                                 <p>{{selected.todate}}</p>
                              </div>
                           </div>
                           <div class="row">
                              <div class="col s12 m6 l6">
                                 <p class="blue-grey-text"><strong>Employer</strong> </p>
                                 <p>{{selected.organization}}</p>
                              </div>
                              <div class="col s12 m6 l6">
                                 <p class="blue-grey-text"><strong>Service Charge</strong> </p>
                                 <p>{{selected.servicecharge}}</p>
                              </div>
                           </div>
                           <div class="row">
                              <div class="col s12 m6 l6">
                                 <p class="blue-grey-text"><strong>Tax</strong> </p>
                                 <p>{{selected.tax}}</p>
                              </div>
                              <div class="col  s12 m6 l6">
                                 <p class="blue-grey-text"><strong>Agreement Type</strong> </p>
                                 <p>{{selected.agtype}}</p>
                              </div>
                           </div>
                           <div class="row">
                              <div class="col s12 m6 l6">
                                 <p class="blue-grey-text"><strong>Wage Type</strong> </p>
                                 <p>{{selected.wagetype}}</p>
                              </div>
                              <div class="col  s12 m6 l6">
                                 <p class="blue-grey-text"><strong>Wage Rate Year</strong> </p>
                                 <p>{{selected.wageyear}}</p>
                              </div>
                           </div>
                           <div class="row">
                              <div class="col s12 m6 l6">
                                 <p class="blue-grey-text"><strong>Type of Agreement</strong> </p>
                                <!-- <p class="blue-grey-text"><strong>Type of Agreement</strong>  <a id="editagreement" ng-click='editagreementtype()'><span><i class="small icon darken-1 mdi mdi-account-edit"></i></span></a></p>-->
                                 <p ng-show="selected.agreementtype!='Others'">{{selected.agreementtype}}</p>
                                 <p ng-show="selected.agreementtype=='Others'">{{selected.optionaltype}}</p>
                              </div>
                              <div class="col  s12 m6 l6">
                                 <p class="blue-grey-text"><strong>Agreement Status</strong> </p>
                                 <p>{{selected.agreementstatus}}</p>
                              </div>
                           </div>
                           <div class="row">
                              <div class="col s12 m6 l6">
                                 <p class="blue-grey-text"><strong>Wage Area</strong> </p>
                                 <p>{{selected.wagearea}}</p>
                              </div>
                           </div>
                           <div ng-repeat="p in selected.projects">
                              <div class="row z-depth-1" style="background-color: #eee;">
                                 <div class="col s12 m10 l10">
                                    <ul class="collection">
                                       <li class="collection-item avatar" style="background-color:transparent">
                                          <img src="<?php echo base_url("assets/images/photo.png ") ?>" alt="" class="circle">
                                          <span class="email-title">{{p.projectno}} - {{p.projectname}}</span>
                                          <p class="truncate grey-text ultra-small">{{selected.organization}}</p>
                                       </li>
                                    </ul>
                                 </div>
                                 <div class="col s2 m2 l2 right-align  resultframe">
                                    <?php if ($roledata['permissions']['EAGREE'] == 1) { ?>
                                       <a id="addendum" ng-click='addaddendum(selected.wagetypeid,selected.wageyearid,selected.wageareaid, selected.agreementid, p.agreementinfoid)' title="Addendum"><span><i class="small icon darken-1 mdi mdi-tooltip-outline-plus"></i></span></a>
                                       <a ng-click='editvacancy(selected.wagetypeid,selected.wageyearid,selected.wageareaid, selected.agreementid, p.agreementinfoid,p.jobs)' title="Edit"><span><i class="small icon mdi mdi-tooltip-edit"></i></span></a>
                                    <?php } ?>
                                 </div>
                              </div>
                              <div class="row">
                                 <div class="input-field col s12">
                                    <table>
                                       <thead>
                                          <tr>
                                             <th> Sno </th>
                                             <th>Postings</th>
                                             <th>Strength</th>
                                             <!-- <th>Salary
                                             <th> -->
                                          </tr>
                                       </thead>
                                       <tbody>
                                          <tr ng-repeat="l in p.jobs" ng-if="l.numberofvacancies > 0">
                                             <td> {{$index + 1}} </td>
                                             <td> {{l.code}}</td>
                                             <td>{{l.numberofvacancies}} </td>
                                             <!-- <td>{{l.salary}}</td> -->
                                          </tr>
                                       </tbody>
                                    </table>
                                 </div>
                              </div>
                              <div class="email-content-wrap" ng-if="p.addendums.length > 0">
                                 <div class="row z-depth-1" style="background-color: #eee;">
                                    <div class="col s12 m10 l10">
                                       <ul class="collection">
                                          <li class="collection-item avatar" style="background-color:transparent">
                                             <img src="<?php echo base_url("assets/images/photo.png ") ?>" alt="" class="circle">
                                             <span class="email-title">Addendum </span>
                                             <p class="truncate grey-text ultra-small">{{p.projectno}} - {{p.projectname}}</p>
                                          </li>
                                       </ul>
                                    </div>
                                    <div class="col s2 m2 l2 right-align  resultframe">
                                       <?php if ($roledata['permissions']['EAGREE'] == 1) { ?>
                                          <a ng-click='editaddendum(selected.wagetypeid,selected.wageyearid,selected.wageareaid, selected.agreementid, p.agreementinfoid,p.addendums)' title="Edit Addendum"><span><i class="small icon mdi mdi-tooltip-edit"></i></span></a>
                                       <?php } ?>
                                    </div>
                                 </div>
                                 <div class="row">
                                    <div class="input-field col s12">
                                       <table>
                                          <thead>
                                             <tr>
                                                <th> Addendum </th>
                                                <th> Postings </th>
                                                <th> Strength </th>
                                                <!-- <th> Salary </th> -->
                                             </tr>
                                          </thead>
                                          <tbody ng-repeat="j in p.addendums">
                                             <tr ng-repeat="k in j" ng-if="k.numberofvacancies > 0">
                                                <td> Addendum - {{k.addendum}} </td>
                                                <td> {{k.code}} </td>
                                                <td> {{k.numberofvacancies}} </td>
                                                <!-- <td> {{k.salary}} </td> -->
                                             </tr>
                                          </tbody>
                                       </table>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div id="excecuted" class="col s12">
            <div id="" class="section">
               <div class="row">
                  <div class="col s12 ">
                     <div id="Client-list" class="CLheight col s12 m4 l4 card-panel z-depth-1">
                        <ul class="collection">
                           <div class="row">
                              <div class="col s12">
                                 <nav class="indigo">
                                    <div class="nav-wrapper">
                                       <!-- <div class="input-field  col s4" style="padding-top:18px; margin-right:0px;">
                                          <input type="checkbox" class="filled-in" id="filled-in-box" checked="checked" ng-model="filterproj2" />
                                          <label for="filled-in-box">Proj. No:</label>
                                       </div> -->
                                       <div class="input-field col s8"> <i class="material-icons prefix">search</i>
                                          <input id="icon_prefix" placeholder="search" type="text" class="validate" ng-model="filter2" ng-change="searchExeAgreement(filter2)">
                                       </div>
                                    </div>
                                 </nav>
                              </div>
                           </div>
                           <div class="scroll">
                              <li ng-if="!filterproj2" class="collection-item avatar waves-effect waves-teal col s12" ng-class="{selected: agreement.agreementid === selected.agreementid}" ng-repeat="agreement in agreementsexcecuted | orderBy:agreement.projects[0].projectno" ng-click="select(agreement)">
                                 <a href="javascript::void(0)">
                                    <div style="margin-top: 10px;">
                                       <span class="circle light-blue" style="padding: 10px;">{{agreement.organization.slice(0,1)}}</span>
                                       <p class="truncate grey-text ultra-small">{{agreement.projects[0].projectno}}-{{agreement.organization}}</p>
                                    </div>
                                 </a>
                              </li>

                              <li ng-if="filterproj2" class="collection-item avatar waves-effect waves-teal col s12" ng-class="{selected: agreement.agreementid === selected.agreementid}" ng-repeat="agreement in agreementsexcecuted | orderBy:agreement.projects[0].projectno" ng-click="select(agreement)">
                                 <a href="javascript::void(0)">
                                    <div style="margin-top: 10px;">
                                       <span class="circle light-blue" style="padding: 10px;">{{agreement.organization.slice(0,1)}}</span>
                                       <p class="truncate grey-text ultra-small">
                                          {{agreement.organization}}</p>
                                    </div>
                                 </a>
                              </li>
                           </div>
                        </ul>
                     </div>
                     <div id="Client-details" class="col s10 m8 l8 card-panel z-depth-1">
                        <div class="email-content-wrap">
                           <div class="row z-depth-1" style="background-color: #eee;">
                              <div class="col s12 m9 l9">
                                 <ul class="collection">
                                    <li class="collection-item avatar" style="background-color:transparent">
                                       <img src="<?php echo base_url("assets/images/photo.png ") ?>" alt="" class="circle">
                                       <p class="truncate grey-text ultra-small title-agree">{{selected.projects[0].projectno}} - {{selected.organization}}</p>
                                    </li>
                                 </ul>
                              </div>
                              <!-- {{selected}} -->
                              <div class="col s3 m3 l3 right-align  resultframe">
                                 <?php if ($roledata['permissions']['AAGREE'] == 1) { ?>
                                    <a ng-click="ApproveAgreement(selected)" class="btn-floating waves-effect waves-light green" ng-show="selected.amstatus == 1">
                                       <i class="material-icons">check_circle_outline</i>
                                    </a>
                                 <?php } ?>
                                 <?php if ($roledata['permissions']['EAGREE'] == 1) { ?>
                                    <a id="A8" ng-click='editagreement()'><span><i class="small icon darken-1 mdi mdi-account-edit"></i></span></a>
                                 <?php } ?>
                                 <?php if ($roledata['permissions']['DAGREE'] == 1) { ?>
                                    <a ng-click='removeagreement()'><span><i class="small icon mdi mdi-delete"></i></span></a>
                                 <?php } ?>
                                 <a href="<?php echo base_url("admin/agreementprint?agreementid={{selected.agreementid}}") ?>" target="_blank"><span><i class="small icon darken-1 mdi mdi-file-document"></i></span></a>
                              </div>
                           </div>
                           <div class="row">
                              <div class="col s12 m6 l6">
                                 <p class="blue-grey-text"><strong>From Date</strong> </p>
                                 <p>{{selected.fromdate}}</p>
                              </div>
                              <div class="col  s12 m6 l6">
                                 <p class="blue-grey-text"><strong>To Date</strong> </p>
                                 <p>{{selected.todate}}</p>
                              </div>
                           </div>
                           <div class="row">
                              <div class="col s12 m6 l6">
                                 <p class="blue-grey-text"><strong>Employer</strong> </p>
                                 <p>{{selected.organization}}</p>
                              </div>
                              <div class="col s12 m6 l6">
                                 <p class="blue-grey-text"><strong>Service Charge</strong> </p>
                                 <p>{{selected.servicecharge}}</p>
                              </div>
                           </div>
                           <div class="row">
                              <div class="col s12 m6 l6">
                                 <p class="blue-grey-text"><strong>Tax</strong> </p>
                                 <p>{{selected.tax}}</p>
                              </div>
                              <div class="col  s12 m6 l6">
                                 <p class="blue-grey-text"><strong>Agreement Type</strong> </p>
                                 <p>{{selected.agtype}}</p>
                              </div>
                           </div>
                           <div class="row">
                              <div class="col s12 m6 l6">
                                 <p class="blue-grey-text"><strong>Wage Type</strong> </p>
                                 <p>{{selected.wagetype}}</p>
                              </div>
                              <div class="col  s12 m6 l6">
                                 <p class="blue-grey-text"><strong>Wage Rate Year</strong> </p>
                                 <p>{{selected.wageyear}}</p>
                              </div>
                           </div>
                           <div class="row">
                              <div class="col s12 m6 l6">
                                 <p class="blue-grey-text"><strong>Type of Agreement</strong> </p>
                                <!-- <p class="blue-grey-text"><strong>Type of Agreement</strong>  <a id="editagreement" ng-click='editagreementtype()'><span><i class="small icon darken-1 mdi mdi-account-edit"></i></span></a></p>-->
                                 <p ng-show="selected.agreementtype!='Others'">{{selected.agreementtype}}</p>
                                 <p ng-show="selected.agreementtype=='Others'">{{selected.optionaltype}}</p>
                              </div>
                              <div class="col  s12 m6 l6">
                                 <p class="blue-grey-text"><strong>Agreement Status</strong> </p>
                                 <p>{{selected.agreementstatus}}</p>
                              </div>
                           </div>
                           <div class="row">
                              <div class="col s12 m6 l6">
                                 <p class="blue-grey-text"><strong>Wage Area</strong> </p>
                                 <p>{{selected.wagearea}}</p>
                              </div>
                           </div>
                           <div ng-repeat="p in selected.projects">
                              <div class="row z-depth-1" style="background-color: #eee;">
                                 <div class="col s12 m10 l10">
                                    <ul class="collection">
                                       <li class="collection-item avatar" style="background-color:transparent">
                                          <img src="<?php echo base_url("assets/images/photo.png ") ?>" alt="" class="circle">
                                          <span class="email-title">{{p.projectno}} - {{p.projectname}}</span>
                                          <p class="truncate grey-text ultra-small">{{selected.organization}}</p>
                                       </li>
                                    </ul>
                                 </div>
                                 <div class="col s2 m2 l2 right-align  resultframe">
                                    <?php if ($roledata['permissions']['AAGREE'] == 1) { ?>
                                       <a ng-click="ApproveAgreementAddendum(selected.wagetypeid,selected.wageyearid,selected.wageareaid, selected.agreementid, p.agreementinfoid)" class="btn-floating waves-effect waves-light green" ng-show="selected.addendumstatus == 1" title="Approve Addendum">
                                          <i class="material-icons">check_circle_outline</i>
                                       </a>
                                    <?php } ?>
                                    <?php if ($roledata['permissions']['AAGREE'] == 1) { ?>
                                       <a ng-click="ApproveAgreementJobs(selected.wagetypeid,selected.wageyearid,selected.wageareaid, selected.agreementid, p.agreementinfoid)" class="btn-floating waves-effect waves-light green" ng-show="selected.adamstatus == 1" title="Approve Jobs">
                                          <i class="material-icons">check_circle_outline</i>
                                       </a>
                                    <?php } ?>
                                    <?php if ($roledata['permissions']['EAGREE'] == 1) { ?>
                                       <a id="addendum" ng-click='addaddendum(selected.wagetypeid,selected.wageyearid,selected.wageareaid, selected.agreementid, p.agreementinfoid)' title="Addendum"><span><i class="small icon darken-1 mdi mdi-tooltip-outline-plus"></i></span></a>
                                       <a ng-click='editvacancy(selected.wagetypeid,selected.wageyearid,selected.wageareaid, selected.agreementid, p.agreementinfoid,p.jobs)' title="Edit"><span><i class="small icon mdi mdi-tooltip-edit"></i></span></a>
                                    <?php } ?>
                                 </div>
                              </div>
                              <div class="row">
                                 <div class="input-field col s12">
                                    <table>
                                       <thead>
                                          <tr>
                                             <th> Sno </th>
                                             <th>Postings</th>
                                             <th>Strength</th>
                                             <!-- <th>Salary
                                             <th> -->
                                          </tr>
                                       </thead>
                                       <tbody>
                                          <tr ng-repeat="l in p.jobs" ng-if="l.numberofvacancies > 0">
                                             <td> {{$index + 1}} </td>
                                             <td> {{l.code}}</td>
                                             <td>{{l.numberofvacancies}} </td>
                                             <!-- <td>{{l.salary}}</td> -->
                                          </tr>
                                       </tbody>
                                    </table>
                                 </div>
                              </div>
                              <div class="email-content-wrap" ng-if="p.addendums.length > 0">
                                 <div class="row z-depth-1" style="background-color: #eee;">
                                    <div class="col s12 m10 l10">
                                       <ul class="collection">
                                          <li class="collection-item avatar" style="background-color:transparent">
                                             <img src="<?php echo base_url("assets/images/photo.png ") ?>" alt="" class="circle">
                                             <span class="email-title">Addendum </span>
                                             <p class="truncate grey-text ultra-small">{{p.projectno}} - {{p.projectname}}</p>
                                          </li>
                                       </ul>
                                    </div>
                                    <div class="col s2 m2 l2 right-align  resultframe">
                                       <?php if ($roledata['permissions']['EAGREE'] == 1) { ?>
                                          <a ng-click='editaddendum(selected.wagetypeid,selected.wageyearid,selected.wageareaid, selected.agreementid, p.agreementinfoid,p.addendums)' title="Edit Addendum"><span><i class="small icon mdi mdi-tooltip-edit"></i></span></a>
                                       <?php } ?>
                                    </div>
                                 </div>
                                 <div class="row">
                                    <div class="input-field col s12">
                                       <table>
                                          <thead>
                                             <tr>
                                                <th> Addendum </th>
                                                <th> Postings </th>
                                                <th> Strength </th>
                                                <!-- <th> Salary </th> -->
                                             </tr>
                                          </thead>
                                          <tbody ng-repeat="j in p.addendums">
                                             <tr ng-repeat="k in j" ng-if="k.numberofvacancies > 0">
                                                <td> Addendum - {{k.addendum}} </td>
                                                <td> {{k.code}} </td>
                                                <td> {{k.numberofvacancies}} </td>
                                                <!-- <td> {{k.salary}} </td> -->
                                             </tr>
                                          </tbody>
                                       </table>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div> 
         <div id="pending" class="col s12">
            <div id="" class="section">
               <div class="row">
                  <div class="col s12 ">
                     <div id="Client-list" class="CLheight col s12 m4 l4 card-panel z-depth-1">
                        <ul class="collection">
                           <div class="row">
                              <div class="col s12">
                                 <nav class="indigo">
                                    <div class="nav-wrapper">
                                       <!-- <div class="input-field  col s4" style="padding-top:18px; margin-right:0px;">
                                          <input type="checkbox" class="filled-in" id="filled-in-box" checked="checked" ng-model="filterproj2" />
                                          <label for="filled-in-box">Proj. No:</label>
                                       </div> -->
                                       <div class="input-field col s8"> <i class="material-icons prefix">search</i>
                                          <input id="icon_prefix" placeholder="search" type="text" class="validate" ng-model="filter2" ng-change="searchPendingAgreement(filter2)">
                                       </div>
                                    </div>
                                 </nav>
                              </div>
                           </div>
                           <div class="scroll">
                              <li ng-if="!filterproj2" class="collection-item avatar waves-effect waves-teal col s12" ng-class="{selected: agreement.agreementid === selected.agreementid}" ng-repeat="agreement in agreementpending | orderBy:agreement.projects[0].projectno" ng-click="select(agreement)">
                                 <a href="javascript::void(0)">
                                    <div style="margin-top: 10px;">
                                       <span class="circle light-blue" style="padding: 10px;">{{agreement.organization.slice(0,1)}}</span>
                                       <p class="truncate grey-text ultra-small">{{agreement.projects[0].projectno}}-{{agreement.organization}}</p>
                                    </div>
                                 </a>
                              </li>

                              <li ng-if="filterproj2" class="collection-item avatar waves-effect waves-teal col s12" ng-class="{selected: agreement.agreementid === selected.agreementid}" ng-repeat="agreement in agreementsexcecuted | orderBy:agreement.projects[0].projectno" ng-click="select(agreement)">
                                 <a href="javascript::void(0)">
                                    <div style="margin-top: 10px;">
                                       <span class="circle light-blue" style="padding: 10px;">{{agreement.organization.slice(0,1)}}</span>
                                       <p class="truncate grey-text ultra-small">
                                          {{agreement.organization}}</p>
                                    </div>
                                 </a>
                              </li>
                           </div>
                        </ul>
                     </div>
                     <div id="Client-details" class="col s10 m8 l8 card-panel z-depth-1">
                        <div class="email-content-wrap">
                           <div class="row z-depth-1" style="background-color: #eee;">
                              <div class="col s12 m9 l9">
                                 <ul class="collection">
                                    <li class="collection-item avatar" style="background-color:transparent">
                                       <img src="<?php echo base_url("assets/images/photo.png ") ?>" alt="" class="circle">
                                       <p class="truncate grey-text ultra-small">{{selected.projects[0].projectno}} - {{selected.organization}}</p>
                                    </li>
                                 </ul>
                              </div>
                              <!-- {{selected}} -->
                              <div class="col s3 m3 l3 right-align  resultframe">
                                 <?php if ($roledata['permissions']['AAGREE'] == 1) { ?>
                                    <a ng-click="ApproveAgreement(selected)" class="btn-floating waves-effect waves-light green" ng-show="selected.amstatus == 1">
                                       <i class="material-icons">check_circle_outline</i>
                                    </a>
                                 <?php } ?>
                                 <?php if ($roledata['permissions']['EAGREE'] == 1) { ?>
                                    <a id="A8" ng-click='editagreement()'><span><i class="small icon darken-1 mdi mdi-account-edit"></i></span></a>
                                 <?php } ?>
                                 <?php if ($roledata['permissions']['DAGREE'] == 1) { ?>
                                    <a ng-click='removeagreement()'><span><i class="small icon mdi mdi-delete"></i></span></a>
                                 <?php } ?>
                                 <a href="<?php echo base_url("admin/agreementprint?agreementid={{selected.agreementid}}") ?>" target="_blank"><span><i class="small icon darken-1 mdi mdi-file-document"></i></span></a>
                              </div>
                           </div>
                           <div class="row">
                              <div class="col s12 m6 l6">
                                 <p class="blue-grey-text"><strong>From Date</strong> </p>
                                 <p>{{selected.fromdate}}</p>
                              </div>
                              <div class="col  s12 m6 l6">
                                 <p class="blue-grey-text"><strong>To Date</strong> </p>
                                 <p>{{selected.todate}}</p>
                              </div>
                           </div>
                           <div class="row">
                              <div class="col s12 m6 l6">
                                 <p class="blue-grey-text"><strong>Employer</strong> </p>
                                 <p>{{selected.organization}}</p>
                              </div>
                              <div class="col s12 m6 l6">
                                 <p class="blue-grey-text"><strong>Service Charge</strong> </p>
                                 <p>{{selected.servicecharge}}</p>
                              </div>
                           </div>
                           <div class="row">
                              <div class="col s12 m6 l6">
                                 <p class="blue-grey-text"><strong>Tax</strong> </p>
                                 <p>{{selected.tax}}</p>
                              </div>
                              <div class="col  s12 m6 l6">
                                 <p class="blue-grey-text"><strong>Agreement Type</strong> </p>
                                 <p>{{selected.agtype}}</p>
                              </div>
                           </div>
                           <div class="row">
                              <div class="col s12 m6 l6">
                                 <p class="blue-grey-text"><strong>Wage Type</strong> </p>
                                 <p>{{selected.wagetype}}</p>
                              </div>
                              <div class="col  s12 m6 l6">
                                 <p class="blue-grey-text"><strong>Wage Rate Year</strong> </p>
                                 <p>{{selected.wageyear}}</p>
                              </div>
                           </div>
                           <div class="row">
                              <div class="col s12 m6 l6">
                                 <p class="blue-grey-text"><strong>Type of Agreement</strong> </p>
                                 <p ng-show="selected.agreementtype!='Others'">{{selected.agreementtype}}</p>
                                 <p ng-show="selected.agreementtype=='Others'">{{selected.optionaltype}}</p>
                              </div>
                              <div class="col  s12 m6 l6">
                                 <p class="blue-grey-text"><strong>Agreement Status</strong> </p>
                                 <p>{{selected.agreementstatus}}</p>
                              </div>
                           </div>
                           <div class="row">
                              <div class="col s12 m6 l6">
                                 <p class="blue-grey-text"><strong>Wage Area</strong> </p>
                                 <p>{{selected.wagearea}}</p>
                              </div>
                           </div>
                           <div ng-repeat="p in selected.projects">
                              <div class="row z-depth-1" style="background-color: #eee;">
                                 <div class="col s12 m10 l10">
                                    <ul class="collection">
                                       <li class="collection-item avatar" style="background-color:transparent">
                                          <img src="<?php echo base_url("assets/images/photo.png ") ?>" alt="" class="circle">
                                          <span class="email-title">{{p.projectno}} - {{p.projectname}}</span>
                                          <p class="truncate grey-text ultra-small">{{selected.organization}}</p>
                                       </li>
                                    </ul>
                                 </div>
                                 <div class="col s2 m2 l2 right-align  resultframe">
                                    <?php if ($roledata['permissions']['AAGREE'] == 1) { ?>
                                       <a ng-click="ApproveAgreementAddendum(selected.wagetypeid,selected.wageyearid,selected.wageareaid, selected.agreementid, p.agreementinfoid)" class="btn-floating waves-effect waves-light green" ng-show="selected.addendumstatus == 1" title="Approve Addendum">
                                          <i class="material-icons">check_circle_outline</i>
                                       </a>
                                    <?php } ?>
                                    <?php if ($roledata['permissions']['AAGREE'] == 1) { ?>
                                       <a ng-click="ApproveAgreementJobs(selected.wagetypeid,selected.wageyearid,selected.wageareaid, selected.agreementid, p.agreementinfoid)" class="btn-floating waves-effect waves-light green" ng-show="selected.adamstatus == 1" title="Approve Jobs">
                                          <i class="material-icons">check_circle_outline</i>
                                       </a>
                                    <?php } ?>
                                    <?php if ($roledata['permissions']['EAGREE'] == 1) { ?>
                                       <a id="addendum" ng-click='addaddendum(selected.wagetypeid,selected.wageyearid,selected.wageareaid, selected.agreementid, p.agreementinfoid)' title="Addendum"><span><i class="small icon darken-1 mdi mdi-tooltip-outline-plus"></i></span></a>
                                       <a ng-click='editvacancy(selected.wagetypeid,selected.wageyearid,selected.wageareaid, selected.agreementid, p.agreementinfoid,p.jobs)' title="Edit"><span><i class="small icon mdi mdi-tooltip-edit"></i></span></a>
                                    <?php } ?>
                                 </div>
                              </div>
                              <div class="row">
                                 <div class="input-field col s12">
                                    <table>
                                       <thead>
                                          <tr>
                                             <th> Sno </th>
                                             <th>Postings</th>
                                             <th>Strength</th>
                                             <!-- <th>Salary
                                             <th> -->
                                          </tr>
                                       </thead>
                                       <tbody>
                                          <tr ng-repeat="l in p.jobs" ng-if="l.numberofvacancies > 0">
                                             <td> {{$index + 1}} </td>
                                             <td> {{l.code}}</td>
                                             <td>{{l.numberofvacancies}} </td>
                                             <!-- <td>{{l.salary}}</td> -->
                                          </tr>
                                       </tbody>
                                    </table>
                                 </div>
                              </div>
                              <div class="email-content-wrap" ng-if="p.addendums.length > 0">
                                 <div class="row z-depth-1" style="background-color: #eee;">
                                    <div class="col s12 m10 l10">
                                       <ul class="collection">
                                          <li class="collection-item avatar" style="background-color:transparent">
                                             <img src="<?php echo base_url("assets/images/photo.png ") ?>" alt="" class="circle">
                                             <span class="email-title">Addendum </span>
                                             <p class="truncate grey-text ultra-small">{{p.projectno}} - {{p.projectname}}</p>
                                          </li>
                                       </ul>
                                    </div>
                                    <div class="col s2 m2 l2 right-align  resultframe">
                                       <?php if ($roledata['permissions']['EAGREE'] == 1) { ?>
                                          <a ng-click='editaddendum(selected.wagetypeid,selected.wageyearid,selected.wageareaid, selected.agreementid, p.agreementinfoid,p.addendums)' title="Edit Addendum"><span><i class="small icon mdi mdi-tooltip-edit"></i></span></a>
                                       <?php } ?>
                                    </div>
                                 </div>
                                 <div class="row">
                                    <div class="input-field col s12">
                                       <table>
                                          <thead>
                                             <tr>
                                                <th> Addendum </th>
                                                <th> Postings </th>
                                                <th> Strength </th>
                                                <!-- <th> Salary </th> -->
                                             </tr>
                                          </thead>
                                          <tbody ng-repeat="j in p.addendums">
                                             <tr ng-repeat="k in j" ng-if="k.numberofvacancies > 0">
                                                <td> Addendum - {{k.addendum}} </td>
                                                <td> {{k.code}} </td>
                                                <td> {{k.numberofvacancies}} </td>
                                                <!-- <td> {{k.salary}} </td> -->
                                             </tr>
                                          </tbody>
                                       </table>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
<style>
   .material-tooltip .backdrop {
      background-color: #F44336;
   } 
</style>
<style>
   .modal {
      z-index: 999 !important;
      top: 15% !important;
   }
   .modal-overlay {
      z-index: 998 !important;
   }
</style>

<script>
   $(document).ready(function() {
      $('ul.tabs').tabs();
   });
</script>
<script>
   $('.tooltipped').tooltip({
      delay: 50
   });   
</script> 
<script>
   $('.adddatepicker').pickadate({
      labelMonthNext: 'Go to the next month',
      labelMonthPrev: 'Go to the previous month',
      labelMonthSelect: 'Pick a month from the dropdown',
      labelYearSelect: 'Pick a year from the dropdown',
      selectMonths: true,
      selectYears: true,
      autoClose:true
   }) 
   

</script>
<!-- <style>
   .indicator{
     display:none;
   }
   </style> -->

   <style type="text/css">
      .ui-datepicker-calendar {
         display: none;
      }
      td {
         max-width: 25px;
      }
      .datepicker-dropdown {
         top: 0;
         left: 0;
         position: absolute;
         background-color: #fff;
         width: 20%;
      }
   </style>