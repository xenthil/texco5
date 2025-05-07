<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.8.4/moment.min.js"></script>
<script src="<?php echo base_url("assets/js/lib/angular-bootstrap-datepicker.js")?>" charset="utf-8"></script>
<link href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery-ui.css" rel="Stylesheet"
    type="text/css" />
<link href="<?php echo base_url("assets/css/datepicker.css")?>" rel="Stylesheet" type="text/css" /> 
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.8.1/xlsx.full.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/2.6.0/jszip.min.js"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/app/project.js?v=1.0") ?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/underscore.js") ?>"></script>
<script type="text/javascript">
   var clientid = 0;
   var regionid = <?php echo $_SESSION['regionid']; ?>;
   var roleid = <?php echo $_SESSION['roleid']; ?>;
</script>
<style>
   .redcolor {
      color:red !important;
   }
   .nocolor {
      color: black !important;
   }  
   .tabs  {
      overflow: hidden !important;
   }
</style>
<div class="parallax-container" style="background-color: rgba(0, 12, 78, 0.9)">
   <div class="row">
      <div class="container">
         <div class="col s12 m6 l6">
            <div class="pagebannertext white-text">Projects</div>
         </div>
         <div class="col s12 m6 l6 right-align">
            <div class="dumheight hide-on-small-only"> </div>
            <div class=""> <a href="<?php echo base_url('admin/dashboard') ?>" class="breadcrumb">Home</a>
            <span class="breadcrumb">Employers</span> 
            <span class="breadcrumb">Projects</span> </div>
         </div>
      </div>
   </div>
   <div class="parallax"><img src="<?php echo base_url("assets/images/breadcrumbbanner.jpg") ?>">
   </div>
</div>
<div class="row" ng-app="appProject">
   <div class="container" ng-controller="ctrlProject">
      <!-- Modal Window for new and Edit -->
      <div class="fixed-action-btn" style="bottom: 50px; right:5px;">
         <?php if ($roledata['permissions']['APROJECT'] == 1) { ?>
            <a class="btn-floating btn-large red modal-trigger" title="Add Project" ng-click='addproject()'>
               <i class="mdi mdi-account-plus"></i> 
            </a>
         <?php } ?>
      </div>
      <div class="fixed-action-btn" style="bottom: 125px; right: 5px;">
         <?php if ($roledata['permissions']['APROJECT'] == 1) { ?>
            <a class="btn-floating btn-large red modal-trigger"  title="Copy Project" ng-click='copyproject()' style="background: #008000 !important;">
               <i class="mdi mdi-projector"></i>
            </a>
         <?php } ?>
      </div> 
      <div class="fixed-action-btn" style="bottom: 240px; right: 5px;">
         <?php if ($roledata['permissions']['APROJECT'] == 1) { ?>
            <a class="btn-floating btn-large red modal-trigger"  title="Bulk Upload" ng-click="uploadproject()" style="background: #008000 !important;">
               <i class="mdi mdi-file-import"></i>
            </a>
         <?php } ?>
      </div>
      <!-- Modal Structure -->
      <div id="modal1" class="modal modal-fixed-footer" style="max-height:90%;">
         <div class="modal-content">
            <nav class="blue" style="position: fixed;margin-top: 0px; z-index:999">
               <div class="left col s1 m1 l1">
                  <div class="white-text"><a href=""><i class="modal-action modal-close mdi white-text mdi-arrow-left"></i></a> </div>
               </div>
               <div class="col s11 m11 l11">
                  <div class="li white-text" id="mcaption">Add Project</div>
               </div>
            </nav>
            <div class="row" style="padding: 24px;">
               <form ng-submit="projectform.$valid && saveproject(objproject)" id="projectform" name="projectform" novalidate="novalidate">
                  <div class="row" style="height:40px;">&nbsp;</div>
                  <div class="row">
                     <div class="col s12">
                        <input type="hidden" ng-model="objproject.projectid">
                        <div class="row" ng-show="copyprojects == 1">
                           <div class="input-field col s9">
                              <select name="mainprojectid" ng-model="objproject.mainprojectid" ng-class="{'submitted': submitted && projectform.mainprojectid.$invalid}" ng-required="true" data-ng-options=" pr.projectid as pr.projectno + ' - ' + pr.name for pr in projectlists"  ng-change="selProjectDetails(objproject.mainprojectid)">
                              </select>
                              <label for="client" class="active">Main Project</label>
                           </div>
                        </div>
                        <div class="row">
                           <div class="input-field col s6">
                              <select name="clientid" ng-model="objproject.clientid" ng-class="{'submitted': submitted && projectform.clientid.$invalid}" ng-required="true" data-ng-options=" c.clientid as c.organization for c in clientslists" ng-change="selectClientAddress(objproject.clientid)">
                              </select>
                              <label for="client" class="active">Employer</label>
                           </div>
                           <div class="input-field col s6">
                              <input id="projectno" name="projectno" ng-class="{'submitted': submitted && projectform.projectno.$invalid}" type="text" class="validate" ng-required="true" maxlength="20" ng-model="objproject.projectno">
                              <label for="projectno" data-error="Required" class="active">Project No</label>
                           </div>
                        </div>
                        <div class="row">
                           <div class="input-field col s6">
                              <input id="name" name="name" type="text" class="validate" ng-class="{'submitted': submitted && projectform.name.$invalid}" maxlength="1000" ng-model="objproject.name">
                              <label for="name" data-error="Required" class="active">Project Name</label>
                           </div>
                           <div class="input-field col s6">
                              <input id="designation" name="designation" type="text" class="validate" ng-class="{'submitted': submitted && projectform.designation.$invalid}" maxlength="1000" ng-model="objproject.designation">
                              <label for="designation" data-error="Required" class="active">Designation</label>
                           </div>
                        </div>
                        <div class="row">
                           <div class="input-field col s11">
                              <input id="tallyname" name="tallyname" type="text" class="validate" ng-class="{'submitted': submitted && projectform.tallyname.$invalid}" maxlength="1000" ng-model="objproject.tallyname">
                              <label for="tallyname" data-error="Required" class="active">Project Name (Tally Purpose)</label>
                           </div>
                        </div>
                        <div class="row">
                           <div class="input-field col s6">
                              <select name="categoryid" ng-change="selCategory(objproject)" ng-model="objproject.categoryid" ng-class="{'submitted': submitted && projectform.categoryid.$invalid}" ng-required="true" data-ng-options=" ct.categoryid as ct.categoryname for ct in category">
                              </select>
                              <label for="categoryid" class="active">Category</label>
                           </div>
                           <div class="input-field col s6">
                              <select name="subcategoryid"  ng-model="objproject.subcategoryid" ng-class="{'submitted': submitted && projectform.subcategoryid.$invalid}" ng-required="true" data-ng-options=" sc.subcategoryid as sc.subcategoryname for sc in subcategory">
                              </select>
                              <label for="subcategoryid" class="active">Sub Category</label>
                           </div>
                        </div>
                        <div class="row">
                           <div class="input-field col s6">
                              <select name="regionid" ng-model="objproject.regionid" ng-class="{'submitted': submitted && projectform.regionid.$invalid}" ng-required="true" data-ng-options="rg.region_id as rg.region_name for rg in regionDetails" ng-change="getDistrictDetails(objproject.regionid);">
                              </select>
                              <label for="regionid" class="active">Region</label>
                           </div>
                           <div class="input-field col s6">
                              <select name="districtid" ng-model="objproject.districtid" ng-class="{'submitted': submitted && projectform.projectno.$invalid}" ng-required="true" data-ng-options="d.district_id as d.district_name for d in districtDetails" ng-change="getTalukDetails(objproject.districtid);">
                              </select>
                              <label for="districtid">District</label>
                           </div>
                        </div>
                        <div class="row">
                           <div class="input-field col s6">
                              <select name="talukid" ng-model="objproject.talukid" ng-class="{'submitted': submitted && projectform.projectno.$invalid}" ng-required="true" data-ng-options="c.taluk_id as c.taluk_name for c in Taluks">
                              </select>
                              <label for="districtid">Taluk</label>
                           </div>
                           <div class="input-field col s6">
                              <select name="statusid" ng-model="objproject.statusid" ng-class="{'submitted': submitted && projectform.statusid.$invalid}" ng-required="true" data-ng-options=" d.lkvalid as d.description for d in statusid">
                              </select>
                              <label for="statusid">Status</label>
                           </div>
                        </div>
                        <div class="row">
                           <div class="input-field col s6">
                              <input id="addressline1" name="addressline1" type="text" ng-class="{'submitted': submitted && projectform.addressline1.$invalid}" class="validate" type="text" ng-model="objproject.addressline1" maxlength="1000" ng-minlength="2" aria-required="true">
                              <label for="addressline1" data-error="Required" class="active">Address Line 1</label>
                           </div>
                           <div class="input-field col s6">
                              <input id="addressline2" name="addressline2" type="text" class="validate" ng-model="objproject.addressline2" maxlength="1000" ng-minlength="3">
                              <label for="addressline2" class="active">Address Line 2</label>
                           </div>
                        </div>
                        <div class="row">
                           <div class="input-field col s6">
                              <input id="addressline3" name="addressline3" type="text" class="validate" ng-model="objproject.addressline3" maxlength="1000" >
                              <label for="addressline3">Address Line 3</label>
                           </div>
                           <div class="input-field col s6">
                              <input id="pincode" name="pincode" type="text" autocomplete="off" maxlength="6" class="validate" ng-model="objproject.pincode" onkeypress="return isNumberKey(event);">
                              <label for="pincode">Pincode</label>
                           </div>
                        </div> 
                        <div class="row"> 
                           <div class="col s11 m6 l6">
                              <div class="li blue-text" style="font-size: 20px !important;">Claim Address</div>
                           </div> 
                           <div class="input-field  col s11 m6 l6" style="margin-top: 30px;">
                              <input type="checkbox" class="filled-in validate" id="filled-in-box1" checked="checked" ng-model="objproject.addressstatus" name="addressstatus" ng-change="claimmaddress(objproject)" ng-checked="objproject.addressstatus=='1'" ng-true-value="1" ng-false-value="0" />
                              <label for="filled-in-box1">Same Address </label>
                           </div>
                        </div>
                        <div class="row">
                           <div class="input-field col s6 caddress">
                              <input id="claimaddressline1" name="claimaddressline1" type="text" ng-class="{'submitted': submitted && projectform.claimaddressline1.$invalid}" class="validate" type="text" ng-model="objproject.claimaddressline1" maxlength="1000" ng-minlength="2" aria-required="true">
                              <label for="claimaddressline1" data-error="Required" class="active">Claim Address Line 1</label>
                           </div>
                           <div class="input-field col s6 caddress">
                              <input id="claimaddressline2" name="claimaddressline2" type="text" class="validate" ng-model="objproject.claimaddressline2" maxlength="1000" ng-minlength="3">
                              <label for="claimaddressline2" class="active">Claim Address Line 2</label>
                           </div>
                        </div>
                        <div class="row">
                           <div class="input-field col s6 caddress">
                              <input id="claimaddressline3" name="claimaddressline3" type="text" class="validate" ng-model="objproject.claimaddressline3" maxlength="1000" ng-minlength="3">
                              <label for="claimaddressline3" class="active">Claim Address Line 3</label>
                           </div>
                           <div class="input-field col s6 caddress">
                              <input id="claimpincode" name="claimpincode" type="text" autocomplete="off" maxlength="6" class="validate" ng-model="objproject.claimpincode" onkeypress="return isNumberKey(event);">
                              <label for="claimpincode" class="active">Claim Pincode</label>
                           </div>

                           <div class="input-field  col s11 m6 l6" style="margin-top: 30px;">
                              <input type="checkbox" class="filled-in validate" id="filled-in-box2" checked="checked" ng-model="objproject.ismainproject" name="ismainproject" ng-checked="objproject.ismainproject=='1'" ng-true-value="1" ng-false-value="0" />
                              <label for="filled-in-box2">Is Main Project For Combined Projects </label>
                           </div>

                           <div class="input-field col s6 caddress" ng-show="objproject.ismainproject=='1'">
                              <input id="claimprojectnumber" name="claimprojectnumber" type="text" class="validate" ng-model="objproject.claimprojectnumber" maxlength="1000" ng-minlength="3">
                              <label for="claimprojectnumber" class="active">Claim Project No</label>
                           </div>

                           <div class="input-field col s6 caddress" ng-show="objproject.ismainproject=='1'">
                              <input id="claimprojectname" name="claimprojectname" type="text" class="validate" ng-model="objproject.claimprojectname" maxlength="1000" ng-minlength="3">
                              <label for="claimprojectname" class="active">Claim Project Name</label>
                           </div>

                        </div> 
                     </div>
                  </div>
            </div>
         </div>
         <div class="modal-footer">
            <button class="waves-effect waves-green btn-flat" type="submit" ng-click="submitted=true;">
               Save
            </button>
            <a href="" class="modal-action modal-close waves-effect btn-flat ">Cancel</a>
         </div>
         </form>
      </div> 

      <div id="modal2" class="modal modal-fixed-footer" style="max-height:90%;">
         <div class="modal-content">
            <nav class="blue" style="position: fixed;margin-top: 0px; z-index:999">
               <div class="left col s1 m1 l1">
                  <div class="white-text"><a href=""><i class="modal-action modal-close mdi white-text mdi-arrow-left"></i></a> </div>
               </div>
               <div class="col s11 m11 l11">
                  <div class="li white-text" id="mcaption"></div>
               </div>
            </nav>
            <div class="row" style="padding: 24px;">
               <form ng-submit="projectform.$valid && saveApproveproject(objproject)" id="projectform" name="projectform" novalidate="novalidate">
                  <div class="row" style="height:40px;">&nbsp;</div>
                  <div class="row">
                     <div class="col s12">
                        <input type="hidden" ng-model="objproject.projectid">
                        <div class="row">
                           <div class="input-field col s6">
                              <select name="clientid" ng-model="objproject.clientid" ng-class="{'submitted': submitted && projectform.clientid.$invalid,'redcolor' : clientcheck == 0 || 1 || 2,'nocolor':clientcheck == '-1'}" ng-required="true" data-ng-options=" c.clientid as c.organization for c in clientslists">
                              </select>  
                              <label for="client">Employer</label>
                           </div>
                           <div class="input-field col s6">
                              <input id="projectno" name="projectno" ng-class="{'submitted': submitted && projectform.projectno.$invalid,'redcolor': projectnocheck == 0 || 1 || 2,'nocolor': projectnocheck == '-1'}" type="text" class="validate" ng-required="true" maxlength="20" ng-model="objproject.projectno">
                              <label for="projectno" data-error="Required">Project No</label>
                           </div>
                        </div>
                        <div class="row">
                           <div class="input-field col s6">
                              <input id="name" name="name" type="text" class="validate" ng-class="{'submitted': submitted && projectform.name.$invalid,'redcolor': namecheck == 0 || 1 || 2,'nocolor': namecheck == '-1'}" maxlength="1000" ng-model="objproject.name">
                              <label for="name" data-error="Required">Project Name</label>
                           </div>
                           <div class="input-field col s6">
                              <input id="designation" name="designation" type="text" class="validate" ng-class="{'submitted': submitted && projectform.designation.$invalid,'redcolor': designationcheck == 0 || 1 || 2, 'nocolor':designationcheck == '-1'}" maxlength="1000" ng-model="objproject.designation">
                              <label for="designation" data-error="Required">Designation</label>
                           </div>
                        </div> 
                        <!-- <div class="row">
                           <div class="input-field col s11">
                              <input id="tallyname" name="tallyname" type="text" class="validate" ng-class="{'submitted': submitted && projectform.tallyname.$invalid}" maxlength="1000" ng-model="objproject.tallyname">
                              <label for="tallyname" data-error="Required">Project Name (Tally Purpose)</label>
                           </div>
                        </div> -->
                        <div class="row">
                           <div class="input-field col s6">
                              <select name="categoryid" ng-change="selCategory(objproject)" ng-model="objproject.categoryid" ng-class="{'submitted': submitted && projectform.categoryid.$invalid,'redcolor': categorycheck == 0 || 1 || 2,'nocolor': categorycheck == '-1'}" ng-required="true" data-ng-options=" ct.categoryid as ct.categoryname for ct in category">
                              </select>
                              <label for="categoryid">Category</label>
                           </div>
                           <div class="input-field col s6">
                              <select name="subcategoryid" ng-model="objproject.subcategoryid" ng-class="{'submitted': submitted && projectform.subcategoryid.$invalid,'redcolor': subcategorycheck == 0 || 1 || 2,'nocolor': subcategorycheck == '-1'}" ng-required="true" data-ng-options=" sc.subcategoryid as sc.subcategoryname for sc in subcategory">

                              <!-- <select name="subcategoryid"  ng-model="objproject.subcategoryid" ng-class="{'submitted': submitted && projectform.subcategoryid.$invalid}" ng-required="true" data-ng-options=" sc.subcategoryid as sc.subcategoryname for sc in subcategory"> -->
                              </select>
                              <label for="subcategoryid">Sub Category</label>
                           </div>
                        </div>
                        <div class="row">
                           <div class="input-field col s6">
                              <select name="regionid" ng-model="objproject.regionid" ng-class="{'submitted': submitted && projectform.regionid.$invalid,'redcolor': regioncheck == 0 || 1 || 2, 'nocolor':regioncheck == '-1'}" ng-required="true" data-ng-options="rg.region_id as rg.region_name for rg in regionDetails" ng-change="getDistrictDetails(objproject.regionid);">
                              </select>
                              <label for="regionid">Region</label>
                           </div>
                           <div class="input-field col s6">
                              <select name="districtid" ng-model="objproject.districtid" ng-class="{'submitted': submitted && projectform.projectno.$invalid,'redcolor': districtcheck == 0 || 1 || 2, 'nocolor':districtcheck == '-1'}" ng-required="true" data-ng-options="d.district_id as d.district_name for d in districtDetails" ng-change="getTalukDetails(objproject.districtid);">
                              </select>
                              <label for="districtid">District</label>
                           </div>
                        </div>
                        <div class="row">
                           <div class="input-field col s6">
                              <select name="talukid" ng-model="objproject.talukid" ng-class="{'submitted': submitted && projectform.projectno.$invalid,'redcolor': talukcheck == 0 || 1 || 2, 'nocolor':talukcheck == '-1'}" ng-required="true" data-ng-options="c.taluk_id as c.taluk_name for c in Taluks">
                              </select>
                              <label for="districtid">Taluk</label>
                           </div>
                           <div class="input-field col s6">
                              <select name="statusid" ng-model="objproject.statusid" ng-class="{'submitted': submitted && projectform.statusid.$invalid,'redcolor': statuscheck == 0 || 1 || 2, 'nocolor':statuscheck == '-1'}" ng-required="true" data-ng-options=" d.lkvalid as d.description for d in statusid">
                              </select>
                              <label for="statusid">Status</label>
                           </div>
                        </div>
                        <div class="row">
                           <div class="input-field col s6">
                              <input id="addressline1" name="addressline1" type="text" ng-class="{'submitted': submitted && projectform.addressline1.$invalid,'redcolor': addressline1check == 0 || 1 || 2, 'nocolor':addressline1check == '-1'}" class="validate" type="text" ng-model="objproject.addressline1" maxlength="1000" ng-minlength="2" aria-required="true">
                              <label for="addressline1" data-error="Required">Address Line 1</label>
                           </div>
                           <div class="input-field col s6">
                              <input id="addressline2" name="addressline2" type="text" class="validate" ng-model="objproject.addressline2" maxlength="1000"  ng-class="{'redcolor': addressline2check == 0 || 1 || 2, 'nocolor':addressline2check == '-1'}">
                              <label for="addressline2">Address Line 2</label>
                           </div>
                        </div>
                        <div class="row">
                           <div class="input-field col s6">
                              <input id="addressline3" name="addressline3" type="text" class="validate" ng-model="objproject.addressline3" maxlength="1000" ng-minlength="3"  ng-class="{'redcolor': addressline3check == 0 || 1 || 2, 'nocolor':addressline3check == '-1'}">
                              <label for="addressline3">Address Line 3</label>
                           </div>
                           <div class="input-field col s6">
                              <input id="pincode" name="pincode" type="text" autocomplete="off" maxlength="6" class="validate" ng-model="objproject.pincode" onkeypress="return isNumberKey(event);"  ng-class="{'redcolor': pincodecheck == 0 || 1 || 2, 'nocolor':pincodecheck == '-1'}">
                              <label for="pincode">Pincode</label>
                           </div>
                        </div> 
                        <!-- <div class="row"> 
                           <div class="col s11 m6 l6">
                              <div class="li blue-text" style="font-size: 20px !important;">Claim Address</div>
                           </div> 
                           <div class="input-field  col s11 m6 l6" style="margin-top: 30px;">
                              <input type="checkbox" class="filled-in validate" id="filled-in-box1" checked="checked" ng-model="objproject.addressstatus" name="addressstatus" ng-change="claimmaddress(objproject)" ng-checked="objproject.addressstatus==1" ng-true-value="1" ng-false-value="0" />
                              <label for="filled-in-box1">Same Address </label>
                           </div>
                        </div>
                        <div class="row">
                           <div class="input-field col s6 caddress">
                              <input id="claimaddressline1" name="claimaddressline1" type="text" ng-class="{'submitted': submitted && projectform.claimaddressline1.$invalid}" class="validate" type="text" ng-model="objproject.claimaddressline1" maxlength="1000" ng-minlength="2" aria-required="true">
                              <label for="claimaddressline1" data-error="Required">Claim Address Line 1</label>
                           </div>
                           <div class="input-field col s6 caddress">
                              <input id="claimaddressline2" name="claimaddressline2" type="text" class="validate" ng-model="objproject.claimaddressline2" maxlength="1000" ng-minlength="3">
                              <label for="claimaddressline2">Claim Address Line 2</label>
                           </div>
                        </div>
                        <div class="row">
                           <div class="input-field col s6 caddress">
                              <input id="claimaddressline3" name="claimaddressline3" type="text" class="validate" ng-model="objproject.claimaddressline3" maxlength="1000" ng-minlength="3">
                              <label for="claimaddressline3">Claim Address Line 3</label>
                           </div>
                           <div class="input-field col s6 caddress">
                              <input id="claimpincode" name="claimpincode" type="text" autocomplete="off" maxlength="6" class="validate" ng-model="objproject.claimpincode" onkeypress="return isNumberKey(event);">
                              <label for="claimpincode">Claim Pincode</label>
                           </div>
                        </div>  -->
                     </div>
                  </div>
            </div>
         </div>
         <div class="modal-footer">
               <button class="waves-effect waves-green btn-flat" type="submit" ng-click="submitted=true;">
                  Approve
               </button>
               <a href="" class="modal-action modal-close waves-effect btn-flat" ng-click="RejectProject(objproject.projectid);">Reject</a>
         </div>
         </form>
      </div>  

      <div id="modal3" class="modal modal-fixed-footer" style="max-height:90%;">
         <div class="modal-content">
            <nav class="blue" style="position: fixed;margin-top: 0px; z-index:999">
               <div class="left col s1 m1 l1">
                  <div class="white-text"><a href=""><i class="modal-action modal-close mdi white-text mdi-arrow-left"></i></a> </div>
               </div>
               <div class="col s11 m11 l11">
                  <div class="li white-text" id="mcaptionss"></div>
               </div>
            </nav>
            <div class="row" style="padding: 24px;">
               <form action="#">
               <div class="row" style="height:40px;">&nbsp;</div>
               <div class="row">
                  <div class="col s12">
                     <div class="card-content text-black" style="height:200px;"> 
                           <span style="color:red">
                              {{error}}
                           </span>
                           <br>
                           <p class="text-black">You can Upload Project,Client and Agreement Details<span><a style="color:#039be5;font-weight: bold;margin-left: 30px;text-decoration: underline;" href="<?php echo base_url("assets/document/sample/projectupload.xlsx")?>" download > Download Sample</a></span>.<br>
                           <div class="file-field input-field">
                              <div class="btn">
                                 <span>File</span>
                                 <input type="file" name="file" id="file" class="form-control" onchange="angular.element(this).scope().UploadFile(this.files)" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel">
                              </div>
                              <div class="file-path-wrapper">
                                 <input class="file-path validate" type="text" placeholder="Upload File" style="color:black">
                              </div>
                              <div ng-if="loading" style="margin-top: -210px !important;margin-right: 160px !important;"></div>
                           </div> 
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div class="modal-footer">
            <button class="waves-effect waves-green btn-flat" type="button" ng-click="ParseExcelDataAndSave();" ng-disabled="!SelectedFileForUpload">Import</button> 
            <a href="" class="modal-action modal-close waves-effect btn-flat ">Cancel</a>
         </div>
         </form>
      </div>

      <div class="row">
         <div class="col s11">
            <ul class="tabs">
               <li class="tab col s4"><a class="active" id="Running" ng-click="getrunning()" href="#running"><span class="badge" style="margin-top: 10px;background-color: #ee6e73;width: 45px;">{{runningcount}}</span>Running Project</a></li>
               <li class="tab col s4"><a id="Closed" ng-click="getclosed()" href="#closed"><span class="badge" style="margin-top: 10px;background-color: #ee6e73;width: 45px;">{{closedcount}}</span>Closed Project</a></li>  
               <li class="tab col s4"><a id="Pending" ng-click="getpending()" href="#pending"><span class="badge" style="margin-top: 10px;background-color: #ee6e73;width: 45px;">{{pendingcount}}</span>AM Updated Employers</a></li>
            </ul>
         </div> 
         <div class="col s1">
            <button class="waves-effect blue btn-flat" type="button"  style="color: #fff !important;margin-top: 13px !important;" ng-click="downloadbulkproject()">
               Download
            </button>
         </div> 
         <div id="running" class="col s12">
            <div id="" class="section">
               <div class="row">
                  <div class="col s12 ">
                     <div id="Client-list" class="CLheight col s12 m4 l4 card-panel z-depth-1">
                        <ul class="collection">
                           <!-- <select id="searchproject" name="searchproject" class="validate" ng-model="field" ng-click="emptysearch(value)">
                              <option value="projectno" ng-selected="true">Project No</option>
                           </select> -->
                           <div class="row">
                              <div class="col s12">
                                 <nav class="indigo">
                                    <div class="nav-wrapper">
                                       <div class="left col s12">
                                          <div class="input-field col s12"> <i class="material-icons prefix">search</i>
                                             <input id="icon_prefix" placeholder="search" type="text" class="validate" ng-model="filter" >
                                          </div>
                                       </div>
                                    </div>
                                 </nav>
                              </div>
                           </div>
                           <div class="scroll">
                              <li class="collection-item avatar" ng-class="{selected: project.projectid === selected.projectid}" ng-repeat="project in projectsrunning | orderBy:project.projectno | filter: filter">
                                 <a href="javascript::void(0)" ng-click="select(project)">
                                    <div style="margin-top: 10px;">
                                       <span class="circle light-blue" style="padding: 10px;">{{project.name.slice(0,1)}}</span>
                                       <span class="email-title">{{project.name}} - {{project.projectno}}</span>
                                       <p class="truncate grey-text ultra-small">{{project.client}} - {{project.region}}, {{project.district}}</p>
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
                                       <img src="<?php echo base_url("assets/images/clients/{{selected.image}}") ?>" alt="" class="circle">
                                       <span class="email-title title-proj">{{selected.name}} - {{selected.projectno}}</span>
                                       <p class="truncate grey-text ultra-small">{{selected.client}} - {{selected.region}}, {{selected.district}} </p>
                                       <p class="grey-text ultra-small"></p>
                                    </li>
                                 </ul>
                              </div>
                              <div class="col s2 m2 l2 right-align resultframe">
                                 <?php if ($roledata['permissions']['EPROJECT'] == 1) { ?>
                                    <a ng-click="Approveproject()" class="btn-floating waves-effect waves-light green" ng-show="selected.amstatus == 1">
                                       <i class="material-icons">check_circle_outline</i>
                                    </a>
                                 <?php } ?>
                                 <?php if ($roledata['permissions']['EPROJECT'] == 1) { ?>
                                    <a id="editproject" ng-click="editproject()"><span><i class="small icon darken-1 mdi mdi-account-edit" ></i></span></a>
                                 <?php } ?>
                                 <?php if ($roledata['permissions']['DPROJECT'] == 1) { ?>
                                    <a ng-click='removeproject()'><span><i class="small icon mdi mdi-delete"></i></span></a>
                                 <?php } ?>
                              </div>
                           </div>
                           <div class="row">
                              <div class="col s12 m6 l6">
                                 <p class="blue-grey-text"><strong>Project No</strong> </p>
                                 <p>{{selected.projectno}} </p>
                              </div>
                              <div class="col  s12 m6 l6">
                                 <p class="blue-grey-text"><strong>Project Name</strong> </p>
                                 <p>{{selected.name}}</p>
                              </div>
                           </div>
                           <div class="row">
                              <div class="col s12 m6 l6">
                                 <p class="blue-grey-text"><strong>Employer</strong> </p>
                                 <p>{{selected.client}} </p>
                              </div>
                              <div class="col  s12 m6 l6">
                                 <p class="blue-grey-text"><strong>District</strong> </p>
                                 <p>{{selected.district}}</p>
                              </div>
                           </div>
                           <div class="row">
                              <div class="col s12 m6 l6">
                                 <p class="blue-grey-text"><strong>Region</strong> </p>
                                 <p>{{selected.region}} </p>
                              </div>
                              <div class="col  s12 m6 l6">
                                 <p class="blue-grey-text"><strong>Status</strong> </p>
                                 <p>{{selected.projectstatus}} </p>
                              </div>
                           </div>
                           <div class="row">
                              <div class="col s12 m6 l6">
                                 <p class="blue-grey-text"><strong>Designation</strong> </p>
                                 <p>{{ selected.designation}}</p>
                              </div>
                              <div class="col  s12 m6 l6">
                                 <p class="blue-grey-text"><strong>Address line1</strong> </p>
                                 <p>{{selected.addressline1}} </p>
                              </div>
                           </div>
                           <div class="row">
                              <div class="col s12 m6 l6">
                                 <p class="blue-grey-text"><strong>Address line2</strong> </p>
                                 <p>{{ selected.addressline2}}</p>
                              </div>
                              <div class="col  s12 m6 l6">
                                 <p class="blue-grey-text"><strong>Address line3</strong> </p>
                                 <p>{{selected.addressline3}} </p>
                              </div>
                           </div>
                           <div class="row">
                              <div class="col  s12 m6 l6">
                                 <p class="blue-grey-text"><strong>Pincode</strong> </p>
                                 <p>{{selected.pincode}} </p>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div id="closed" class="col s12">
            <div id="" class="section">
               <div class="row">
                  <div class="col s12 ">
                     <div id="Client-list" class="CLheight col s12 m4 l4 card-panel z-depth-1">
                        <ul class="collection">
                          <!--  <select id="searchproject" name="searchproject" class="validate" ng-model="field" data-ng-options="i.field as i.field for i in  searchvalues" ng-click="emptysearch(value)">
                              <option value=""></option>
                           </select> -->
                           <div class="row">
                              <div class="col s12">
                                 <nav class="indigo">
                                    <div class="nav-wrapper">
                                       <div class="left col s12">
                                          <div class="input-field col s12"> <i class="material-icons prefix">search</i>
                                             <input id="icon_prefix" placeholder="search" type="text" class="validate" ng-model="filter" autocomplete="off">
                                          </div>
                                       </div>
                                    </div>
                                 </nav>
                              </div>
                           </div>
                           <div class="scroll">
                              <li class="collection-item avatar" ng-class="{selected: project.projectid === selected.projectid}" ng-repeat="project in projectsclosed | filter : filter : false">
                                 <a href="javascript::void(0)" ng-click="select(project)">
                                    <div style="margin-top: 10px;">
                                       <span class="circle light-blue" style="padding: 10px;">{{project.name.slice(0,1)}}</span>
                                       <span class="email-title">{{project.name}} - {{project.projectno}}</span>
                                       <p class="truncate grey-text ultra-small">{{project.client}} - {{project.region}}, {{project.district}}</p>
                                    </div>
                                 </a>
                              </li>
                           </div> 
                           <!-- <li class="collection-item avatar" ng-class="{selected: project.projectid === selected.projectid}" ng-repeat="project in projectsclosed |  filter : filter : true">
                              <a href="javascript::void(0)" ng-click="select(project)">
                                 <div style="margin-top: 10px;">
                                    <span class="circle light-blue" style="padding: 10px;">{{project.name.slice(0,1)}}</span>
                                    <span class="email-title">{{project.name}} - {{project.projectno}}</span>
                                    <p class="truncate grey-text ultra-small">{{project.client}} - {{project.region}}, {{project.district}}</p>
                                 </div>
                              </a>
                           </li> -->
                        </ul>
                     </div>
                     <div id="Client-details" class="col s10 m8 l8 card-panel z-depth-1">
                        <div class="email-content-wrap">
                           <div class="row z-depth-1" style="background-color: #eee;">
                              <div class="col s12 m10 l10">
                                 <ul class="collection">
                                    <li class="collection-item avatar" style="background-color:transparent">
                                       <img src="<?php echo base_url("assets/images/clients/{{selected.image}}") ?>" alt="" class="circle">
                                       <span class="email-title">{{selected.name}} - {{selected.projectno}}</span>
                                       <p class="truncate grey-text ultra-small">{{selected.client}} - {{selected.region}}, {{selected.district}} </p>
                                       <p class="grey-text ultra-small"></p>
                                    </li>
                                 </ul>
                              </div>
                              <div class="col s2 m2 l2 right-align resultframe">
                                 <?php if ($roledata['permissions']['EPROJECT'] == 1) { ?>
                                    <a id="editproject" ng-click="editproject()"><span><i class="small icon darken-1 mdi mdi-account-edit" ></i></span></a>
                                 <?php } ?>
                                 <?php if ($roledata['permissions']['DPROJECT'] == 1) { ?>
                                    <a ng-click='removeproject()'><span><i class="small icon mdi mdi-delete"></i></span></a>
                                 <?php } ?>
                              </div>
                           </div>
                           <div class="row">
                              <div class="col s12 m6 l6">
                                 <p class="blue-grey-text"><strong>Project No</strong> </p>
                                 <p>{{selected.projectno}} </p>
                              </div>
                              <div class="col  s12 m6 l6">
                                 <p class="blue-grey-text"><strong>Project Name</strong> </p>
                                 <p>{{selected.name}}</p>
                              </div>
                           </div>
                           <div class="row">
                              <div class="col s12 m6 l6">
                                 <p class="blue-grey-text"><strong>Employer</strong> </p>
                                 <p>{{selected.client}} </p>
                              </div>
                              <div class="col  s12 m6 l6">
                                 <p class="blue-grey-text"><strong>District</strong> </p>
                                 <p>{{selected.district}}</p>
                              </div>
                           </div>
                           <div class="row">
                              <div class="col s12 m6 l6">
                                 <p class="blue-grey-text"><strong>Region</strong> </p>
                                 <p>{{selected.region}} </p>
                              </div>
                              <div class="col  s12 m6 l6">
                                 <p class="blue-grey-text"><strong>Status</strong> </p>
                                 <p>{{selected.projectstatus}} </p>
                              </div>
                           </div>
                           <div class="row">
                              <div class="col s12 m6 l6">
                                 <p class="blue-grey-text"><strong>Designation</strong> </p>
                                 <p>{{ selected.designation}}</p>
                              </div>
                              <div class="col  s12 m6 l6">
                                 <p class="blue-grey-text"><strong>Address line1</strong> </p>
                                 <p>{{selected.addressline1}} </p>
                              </div>
                           </div>
                           <div class="row">
                              <div class="col s12 m6 l6">
                                 <p class="blue-grey-text"><strong>Address line2</strong> </p>
                                 <p>{{ selected.addressline2}}</p>
                              </div>
                              <div class="col  s12 m6 l6">
                                 <p class="blue-grey-text"><strong>Address line3</strong> </p>
                                 <p>{{selected.addressline3}} </p>
                              </div>
                           </div>
                           <div class="row">
                              <div class="col  s12 m6 l6">
                                 <p class="blue-grey-text"><strong>Pincode</strong> </p>
                                 <p>{{selected.pincode}} </p>
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
                           <!-- <select id="searchproject" name="searchproject" class="validate" ng-model="field" data-ng-options="i.field as i.field for i in  searchvalues" ng-click="emptysearch(value)">
                              <option value=""></option>
                           </select> -->
                           <div class="row">
                              <div class="col s12">
                                 <nav class="indigo">
                                    <div class="nav-wrapper">
                                       <div class="left col s12">
                                          <div class="input-field col s12"> <i class="material-icons prefix">search</i>
                                             <input id="icon_prefix" placeholder="search" type="text" class="validate" ng-model="filter" autocomplete="off" >
                                          </div>
                                       </div>
                                    </div>
                                 </nav>
                              </div> 
                           </div>
                           <div class="scroll">
                              <li class="collection-item avatar" ng-class="{selected: projectss.projectid === selected.projectid}" ng-repeat="projectss in projectspending | filter : filter">
                                 <a href="javascript::void(0)" ng-click="select(projectss)"> 
                                    <div style="margin-top: 10px;"> 
                                       <span class="circle light-blue" style="padding: 10px;">{{projectss.name.slice(0,1)}}</span>
                                       <span class="email-title">{{projectss.name}} - {{projectss.projectno}}</span>
                                       <p class="truncate grey-text ultra-small">{{projectss.client}} - {{projectss.region}}, {{projectss.district}}</p>
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
                                       <img src="<?php echo base_url("assets/images/clients/{{selected.image}}") ?>" alt="" class="circle">
                                       <span class="email-title">{{selected.name}} - {{selected.projectno}}</span>
                                       <p class="truncate grey-text ultra-small">{{selected.client}} - {{selected.region}}, {{selected.district}} </p>
                                       <p class="grey-text ultra-small"></p>
                                    </li>
                                 </ul>
                              </div>
                              <div class="col s2 m2 l2 right-align resultframe"> 
                                 <?php if ($roledata['permissions']['EPROJECT'] == 1) { ?>
                                    <a ng-click="Approveproject()" class="btn-floating waves-effect waves-light green" ng-show="selected.amstatus == 1">
                                       <i class="material-icons">check_circle_outline</i>
                                    </a>
                                 <?php } ?>
                                 <?php if ($roledata['permissions']['EPROJECT'] == 1) { ?>
                                    <a id="editproject" ng-click="editproject()"><span><i class="small icon darken-1 mdi mdi-account-edit"></i></span></a>
                                 <?php } ?>
                                 <?php if ($roledata['permissions']['DPROJECT'] == 1) { ?>
                                    <a ng-click='removeproject()'><span><i class="small icon mdi mdi-delete"></i></span></a>
                                 <?php } ?>
                              </div>
                           </div>
                           <div class="row">
                              <div class="col s12 m6 l6">
                                 <p class="blue-grey-text"><strong>Project No</strong> </p>
                                 <p>{{selected.projectno}} </p>
                              </div>
                              <div class="col  s12 m6 l6">
                                 <p class="blue-grey-text"><strong>Project Name</strong> </p>
                                 <p>{{selected.name}}</p>
                              </div>
                           </div>
                           <div class="row">
                              <div class="col s12 m6 l6">
                                 <p class="blue-grey-text"><strong>Employer</strong> </p>
                                 <p>{{selected.client}} </p>
                              </div>
                              <div class="col  s12 m6 l6">
                                 <p class="blue-grey-text"><strong>District</strong> </p>
                                 <p>{{selected.district}}</p>
                              </div>
                           </div>
                           <div class="row">
                              <div class="col s12 m6 l6">
                                 <p class="blue-grey-text"><strong>Region</strong> </p>
                                 <p>{{selected.region}} </p>
                              </div>
                              <div class="col  s12 m6 l6">
                                 <p class="blue-grey-text"><strong>Status</strong> </p>
                                 <p>{{selected.projectstatus}} </p>
                              </div>
                           </div>
                           <div class="row">
                              <div class="col s12 m6 l6">
                                 <p class="blue-grey-text"><strong>Designation</strong> </p>
                                 <p>{{ selected.designation}}</p>
                              </div>
                              <div class="col  s12 m6 l6">
                                 <p class="blue-grey-text"><strong>Address line1</strong> </p>
                                 <p>{{selected.addressline1}} </p>
                              </div>
                           </div>
                           <div class="row">
                              <div class="col s12 m6 l6">
                                 <p class="blue-grey-text"><strong>Address line2</strong> </p>
                                 <p>{{ selected.addressline2}}</p>
                              </div>
                              <div class="col  s12 m6 l6">
                                 <p class="blue-grey-text"><strong>Address line3</strong> </p>
                                 <p>{{selected.addressline3}} </p>
                              </div>
                           </div>
                           <div class="row">
                              <div class="col s12 m6 l6">
                                 <p class="blue-grey-text"><strong>Pincode</strong> </p>
                                 <p>{{ selected.pincode}}</p>
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
<script>
   $(document).ready(function() {
      $('ul.tabs').tabs();
   });
</script>
<script type="text/javascript">
   function isNumberKey(evt) {
      if (isNaN(String.fromCharCode(event.keyCode))) return false;
      return true;
   }
</script>