<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.8.1/xlsx.full.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/2.6.0/jszip.min.js"></script> 
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.8.4/moment.min.js"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/app/client.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ng-file-upload.min.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/underscore.js")?>"></script>
<script src="<?php echo base_url("assets/js/lib/angular-bootstrap-datepicker.js")?>" charset="utf-8"></script>
<link href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery-ui.css" rel="Stylesheet"
    type="text/css" />
<link href="<?php echo base_url("assets/css/datepicker.css")?>" rel="Stylesheet" type="text/css" />
<script type="text/javascript">
   var clientid = 0;
   var roleid = <?php echo $_SESSION['roleid']; ?>;
   var regionid = <?php echo $_SESSION['regionid']; ?>;
</script>
<style>
   .redcolor {
      color:red !important;
   } 
   .nocolor {
      color: black !important;
   }
</style>
<link rel="stylesheet" type="text/css" href="
   <?php echo base_url("assets/css/ng-table.min.css")?>" />
<script type="text/javascript" src="
   <?php echo base_url("assets/js/lib/ng-table.min.js")?>"></script>
<script type="text/javascript" src="
   <?php echo base_url("assets/js/lib/ui-bootstrap-tpls-0.11.0.js")?>"></script>
<div class="parallax-container" style="background-color: rgba(0, 12, 78, 0.9)">
   <div class="row">
      <div class="container">
         <div class="col s12 m6 l6">
            <div class="pagebannertext white-text">Employers (Clients)</div>
         </div>
         <div class="col s12 m6 l6 right-align">
            <div class="dumheight hide-on-small-only"> </div>
            <div class=""> <a href="<?php echo base_url('admin/dashboard')?>" class="breadcrumb">Home</a>  <span class="breadcrumb">Employers</span> <span class="breadcrumb">Employers (Client)</span> </div>
         </div>
      </div>
   </div>
   <div class="parallax"><img src="<?php echo base_url("assets/images/breadcrumbbanner.jpg")?>">
   </div>
</div>
<div class="row" ng-app="appClient">
<div class="container" ng-controller="ctrlClient"> 
   <br>
   <div class="row">
      <div class="input-field col m4 s6">
         <input name="fromdate" id="date1" class="date1" type="text" ng-model="objattendance.fromdate" autocomplete="off" />
         <label for="startdate">Start Date </label>
      </div>
      <div class="input-field col m4 s6">
         <input name="todate" id="date1" class="date1" type="text" ng-model="objattendance.todate" autocomplete="off" />
         <label for="enddate">End Date </label>
      </div>
      <div class="input-field col m2 s6"> 
            <button type="button" class="btn btn-default btncol" ng-click="downloadclient(objattendance)" style="background: green;color: #fff !important;float:right;margin:10px;"><span class="glyphicon glyphicon-download-alt">&nbsp;</span>Export</button>
      </div>
   </div>
   <br>
   <div class="row">
      <div class="col s12">
         <ul class="tabs">
            <li class="tab col s6"><a class="active" href="#employers"><span class="badge" style="margin-top: 10px;background-color: #ee6e73;width: 40px;">{{totalclients}}</span>Employers</a></li>
            <li class="tab col s6"><a href="#rejectedclientscounts"><span class="new badge" style="margin-top: 10px;background-color: #ee6e73;width: 45px;">{{pendingclients}}</span>Admin Rejected Employers</a></li>
         </ul> 
      </div>
      <div id="employers" class="col s12">
         <!-- Modal Window for new and Edit -->
         <div class="fixed-action-btn" style="bottom: 50px; right: 19px;">
            <?php if($roledata['permissions']['ACLIENT']==1) {?>
            <a class="btn-floating btn-large red modal-trigger" href="#modal1" ng-click='addclient()'>
            <i class="mdi mdi-account-plus"></i>
            </a>
            <?php } ?>
         </div>
         <!-- Modal Structure -->
         
         <div id="" class="section">
            <div class="row">
               <div class="col s12 ">
                  <div id="Client-list" class="CLheight col s12 m4 l4 card-panel z-depth-1">
                     <ul class="collection">
                    <!--  <select id="searchclient" name="searchclient" class="validate" ng-model="field" data-ng-options="i.field as i.text for i in  searchvalues" ng-click="emptysearch(value)">
                     <option value=""></option>
                     </select> -->
                        <div class="row">
                           <div class="col s12">
                              <nav class="indigo">
                                 <div class="nav-wrapper">
                                    <div class="left col s12">
                                       <div class="input-field col s12"> <i class="material-icons prefix">search</i>
                                       <input id="icon_prefix" placeholder="search" type="text" class="validate" ng-model="filter">
                                       </div>
                                    </div>
                                 </div>
                              </nav>
                           </div>
                        </div>
                        <div class= "scroll">
                        <li class="collection-item avatar waves-effect waves-teal col s12" ng-class="{selected: client.clientid === selected.clientid}" ng-repeat="client in clients | filter: filter">
                      
                           <a href="javascript::void(0)" ng-click="select(client)"  ng-class="{redcolor: client.amstatus === 2}">
                              <div style="margin-top: 10px;">
                                 <span class="circle light-blue" style="padding: 10px;">{{client.organization.slice(0,1)}}</span> <span class="email-title">{{client.projectno}} - {{client.projectname}}</span>
                                 <p class="truncate grey-text ultra-small">{{client.organization}} - {{client.contactname}}</p>
                              </div>
                           </a>
                        </li>
                        </div>
                     </ul>
                  </div>
                  <div id="Client-details" class="col s12 m8 l8 card-panel z-depth-1">
                     <div class="email-content-wrap">
                        <div class="row z-depth-1" style="background-color: #eee;">
                           <div class="col s12 m10 l10">
                              <ul class="collection">
                                 <li class="collection-item avatar" style="background-color:transparent">
                                    <img src="<?php echo base_url("assets/images/clients/{{selected.image}}")?>" alt="" class="circle">
                                    <span class="email-title title-client">{{selected.projectno}} - {{selected.projectname}}</span>
                                    <p class="truncate grey-text ultra-small">{{selected.organization}}</p>
                                 </li>
                              </ul>
                           </div>
                           <div class="col s2 m2 l2 right-align resultframe">
                              <?php if($roledata['permissions']['ECLIENT']==1) {?>
                              <a id="editclient" ng-click='editclient()'><span><i class="small icon darken-1 mdi mdi-account-edit"></i></span></a>
                              <?php } ?>
                              <?php if($roledata['permissions']['DCLIENT']==1) {?>
                              <a ng-click='removeclient()'><span><i class="small icon mdi mdi-delete"></i></span></a>
                              <?php } ?>
                           </div>
                        </div>
                        <div class="row">
                           <div class="col s12 m6 l6">
                              <p class="blue-grey-text"><strong>Organization</strong> </p>
                              <p>{{selected.organization}} </p>
                           </div>
                           <div class="col  s12 m6 l6">
                              <p class="blue-grey-text"><strong>Contact Name</strong> </p>
                              <p>{{selected.contactname}}</p>
                           </div>
                        </div>
                        <div class="row">
                           <div class="col s12 m6 l6">
                              <p class="blue-grey-text"><strong>Email</strong> </p>
                              <p>{{selected.email}} </p>
                           </div>
                           <div class="col  s12 m6 l6">
                              <p class="blue-grey-text"><strong>Mobile</strong> </p>
                              <p>{{selected.mobile}}</p>
                           </div>
                        </div>
                        <div class="row">
                           <div class="col s12 m6 l6">
                              <p class="blue-grey-text"><strong>Phone</strong> </p>
                              <p>{{selected.phone}} </p>
                           </div>
                           <div class="col  s12 m6 l6">
                              <p class="blue-grey-text"><strong>PAN No</strong> </p>
                              <p>{{selected.panno}}</p>
                           </div>
                        </div>
                        <div class="row">
                           <div class="col s12 m6 l6">
                              <p class="blue-grey-text"><strong>GST No</strong> </p>
                              <p>{{selected.gstno}} </p>
                           </div>
                           <div class="col  s12 m6 l6">
                              <p class="blue-grey-text"><strong>GST TAN No</strong> </p>
                              <p>{{selected.gsttanno}}</p>
                           </div>
                        </div>
                        <div class="row">
                           <div class="col  s12 m6 l6">
                              <p class="blue-grey-text"><strong>IT TAN No</strong> </p>
                              <p>{{selected.tanno}}</p>
                           </div>
                           <div class="col s12 m6 l6">
                              <p class="blue-grey-text"><strong>Address Line 1</strong> </p>
                              <p>{{selected.addressline1}} </p>
                           </div>
                        </div>
                        <div class="row">
                           <div class="col  s12 m6 l6">
                              <p class="blue-grey-text"><strong>Address Line 2</strong> </p>
                              <p>{{selected.addressline2}}</p>
                           </div>
                           <div class="col s12 m6 l6">
                              <p class="blue-grey-text"><strong>Address Line 3</strong> </p>
                              <p>{{selected.addressline3}} </p>
                           </div>
                        </div>
                        <div class="row">
                           <div class="col s12 m6 l6">
                              <p class="blue-grey-text"><strong>Pincode</strong> </p>
                              <p>{{selected.pincode}} </p>
                           </div>
                           <div class="col s12 m6 l6">
                              <p class="blue-grey-text"><strong>Taluk</strong> </p>
                              <p>{{selected.taluk}} </p>
                           </div>
                        </div>
                        <div class="row">
                           <div class="col  s12 m6 l6">
                              <p class="blue-grey-text"><strong>District</strong> </p>
                              <p>{{selected.district}}</p>
                           </div>
                           <div class="col  s12 m6 l6">
                              <p class="blue-grey-text"><strong>State</strong> </p>
                              <p>{{selected.state}}</p>
                           </div>
                        </div>
                        <div class="row">
                           <div class="col s12 m3 l6">
                              <p class="blue-grey-text"><strong>Country</strong> </p>
                              <p>{{selected.country}} </p>
                           </div>
                           <div class="col s12 m3 l0">
                              <p class="blue-grey-text"><strong>Department Type</strong> </p>
                              <p>{{selected.departmenttype}} </p>
                           </div>
                           <div class="col  s12 m3 l0">
                              <p class="blue-grey-text"><strong>Department</strong> </p>
                              <p>{{selected.department}}</p>
                           </div>
                            <div class="col  s12 m3 l0">
                              <p class="blue-grey-text"><strong>Status</strong> </p>
                              <p>{{selected.active ? "Active" : "Inactive"}}</p>
                           </div>
                        </div>
                        <div class="row">
                           <div class="col s12 m6 l6">
                              <p class="blue-grey-text"><strong>Image</strong> </p>
                              <p>
                                 <img src="<?php echo base_url('/assets/images/clients/{{selected.image}}')?>" alt="" class="circle">
                              </p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <div id="rejectedclientscounts" class="col s12">
         <div class="fixed-action-btn" style="bottom: 50px; right: 19px;">
            <?php if($roledata['permissions']['ACLIENT']==1) {?>
            <a class="btn-floating btn-large red modal-trigger" href="#modal1" ng-click='addclient()'>
            <i class="mdi mdi-account-plus"></i>
            </a>
            <?php } ?>
         </div>
         <!-- Modal Structure -->
         <div id="" class="section">
            <div class="row">
               <div class="col s12 ">
                  <div id="Client-list" class="CLheight col s12 m4 l4 card-panel z-depth-1">
                     <ul class="collection">
                    <!--  <select id="searchclient" name="searchclient" class="validate" ng-model="field" data-ng-options="i.field as i.text for i in  searchvalues" ng-click="emptysearch(value)">
                     <option value=""></option>
                     </select> -->
                        <div class="row">
                           <div class="col s12">
                              <nav class="indigo">
                                 <div class="nav-wrapper">
                                    <div class="left col s12">
                                       <div class="input-field col s12"> <i class="material-icons prefix">search</i>
                                       <input id="icon_prefix" placeholder="search" type="text" class="validate" ng-model="filter">
                                       </div>
                                    </div>
                                 </div>
                              </nav>
                           </div>
                        </div>
                        <div class= "scroll">
                        <li class="collection-item avatar waves-effect waves-teal col s12" ng-class="{selected: client.clientid === selected.clientid}" ng-repeat="client in rejectedclients | filter: filter">
                      
                           <a href="javascript::void(0)" ng-click="select(client)"  ng-class="{redcolor: client.amstatus === 2}">
                              <div style="margin-top: 10px;">
                                 <span class="circle light-blue" style="padding: 10px;">{{client.organization.slice(0,1)}}</span> <span class="email-title">{{client.projectno}} - {{client.projectname}}</span>
                                 <p class="truncate grey-text ultra-small">{{client.organization}} - {{client.contactname}}</p>
                              </div>
                           </a>
                        </li>
                        </div>
                     </ul>
                  </div>
                  <div id="Client-details" class="col s12 m8 l8 card-panel z-depth-1">
                     <div class="email-content-wrap">
                        <div class="row z-depth-1" style="background-color: #eee;">
                           <div class="col s12 m10 l10">
                              <ul class="collection">
                                 <li class="collection-item avatar" style="background-color:transparent">
                                    <img src="<?php echo base_url("assets/images/clients/{{selected.image}}")?>" alt="" class="circle">
                                    <span class="email-title">{{selected.projectno}} - {{selected.projectname}}</span>
                                    <p class="truncate grey-text ultra-small">{{selected.organization}}</p>
                                 </li>
                              </ul>
                           </div>
                           <div class="col s2 m2 l2 right-align resultframe">
                              <?php if($roledata['permissions']['ECLIENT']==1) {?>
                              <a id="editclient" ng-click='editclient()'><span><i class="small icon darken-1 mdi mdi-account-edit"></i></span></a>
                              <?php } ?>
                              <?php if($roledata['permissions']['DCLIENT']==1) {?>
                              <a ng-click='removeclient()'><span><i class="small icon mdi mdi-delete"></i></span></a>
                              <?php } ?>
                           </div>
                        </div>
                        <div class="row">
                           <div class="col s12 m6 l6">
                              <p class="blue-grey-text"><strong>Organization</strong> </p>
                              <p>{{selected.organization}} </p>
                           </div>
                           <div class="col  s12 m6 l6">
                              <p class="blue-grey-text"><strong>Contact Name</strong> </p>
                              <p>{{selected.contactname}}</p>
                           </div>
                        </div>
                        <div class="row">
                           <div class="col s12 m6 l6">
                              <p class="blue-grey-text"><strong>Email</strong> </p>
                              <p>{{selected.email}} </p>
                           </div>
                           <div class="col  s12 m6 l6">
                              <p class="blue-grey-text"><strong>Mobile</strong> </p>
                              <p>{{selected.mobile}}</p>
                           </div>
                        </div>
                        <div class="row">
                           <div class="col s12 m6 l6">
                              <p class="blue-grey-text"><strong>Phone</strong> </p>
                              <p>{{selected.phone}} </p>
                           </div>
                           <div class="col  s12 m6 l6">
                              <p class="blue-grey-text"><strong>PAN No</strong> </p>
                              <p>{{selected.panno}}</p>
                           </div>
                        </div>
                        <div class="row">
                           <div class="col s12 m6 l6">
                              <p class="blue-grey-text"><strong>GST No</strong> </p>
                              <p>{{selected.gstno}} </p>
                           </div>
                           <div class="col  s12 m6 l6">
                              <p class="blue-grey-text"><strong>GST TAN No</strong> </p>
                              <p>{{selected.gsttanno}}</p>
                           </div>
                        </div>
                        <div class="row">
                           <div class="col  s12 m6 l6">
                              <p class="blue-grey-text"><strong>IT TAN No</strong> </p>
                              <p>{{selected.tanno}}</p>
                           </div>
                           <div class="col s12 m6 l6">
                              <p class="blue-grey-text"><strong>Address Line 1</strong> </p>
                              <p>{{selected.addressline1}} </p>
                           </div>
                        </div>
                        <div class="row">
                           <div class="col  s12 m6 l6">
                              <p class="blue-grey-text"><strong>Address Line 2</strong> </p>
                              <p>{{selected.addressline2}}</p>
                           </div>
                           <div class="col s12 m6 l6">
                              <p class="blue-grey-text"><strong>Address Line 3</strong> </p>
                              <p>{{selected.addressline3}} </p>
                           </div>
                        </div>
                        <div class="row">
                           <div class="col s12 m6 l6">
                              <p class="blue-grey-text"><strong>Pincode</strong> </p>
                              <p>{{selected.pincode}} </p>
                           </div>
                           <div class="col s12 m6 l6">
                              <p class="blue-grey-text"><strong>Taluk</strong> </p>
                              <p>{{selected.taluk}} </p>
                           </div>
                        </div>
                        <div class="row">
                           <div class="col  s12 m6 l6">
                              <p class="blue-grey-text"><strong>District</strong> </p>
                              <p>{{selected.district}}</p>
                           </div>
                           <div class="col  s12 m6 l6">
                              <p class="blue-grey-text"><strong>State</strong> </p>
                              <p>{{selected.state}}</p>
                           </div>
                        </div>
                        <div class="row">
                           <div class="col s12 m3 l6">
                              <p class="blue-grey-text"><strong>Country</strong> </p>
                              <p>{{selected.country}} </p>
                           </div>
                           <div class="col s12 m3 l0">
                              <p class="blue-grey-text"><strong>Department Type</strong> </p>
                              <p>{{selected.departmenttype}} </p>
                           </div>
                           <div class="col  s12 m3 l0">
                              <p class="blue-grey-text"><strong>Department</strong> </p>
                              <p>{{selected.department}}</p>
                           </div>
                            <div class="col  s12 m3 l0">
                              <p class="blue-grey-text"><strong>Status</strong> </p>
                              <p>{{selected.active ? "Active" : "Inactive"}}</p>
                           </div>
                        </div>
                        <div class="row">
                           <div class="col s12 m6 l6">
                              <p class="blue-grey-text"><strong>Image</strong> </p>
                              <p>
                                 <img src="<?php echo base_url('/assets/images/clients/{{selected.image}}')?>" alt="" class="circle">
                              </p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div> 

         <div id="modal1" class="modal modal-fixed-footer" style="max-height:90%;">
            <div class="modal-content">
               <nav class="blue" style="position: fixed;margin-top: 0px; z-index:999;">
                  <div class="left col s1 m1 l1">
                     <div class="white-text"><a href=""><i class="modal-action modal-close mdi white-text mdi-arrow-left"></i></a> </div>
                  </div>
                  <div class="col s11 m11 l11">
                     <div class="li white-text" id="mcaption">Add Employer</div>
                  </div>
               </nav>
               <div class="row" style="padding: 24px;">
                  <form ng-submit="clientform.$valid && saveclient(objclient,picFile)" id="clientform" name="clientform" novalidate>
                     <div class="row" style="height:40px;">&nbsp;</div>
                     <div class="row" >
                        <div class="col s12">
                           <input type="hidden" ng-model="objclient.clientid">
                           <div class="row">
                              <div class="input-field col s6">
                                 <input id="organization"  name="organization" type="text" ng-class="{'submitted': submitted && clientform.organization.$invalid}"  class="validate" type="text" ng-model="objclient.organization" maxlength="100" ng-required="true" ng-minlength="3" aria-required="true">
                                 <label for="organization" data-error="Required(min 3 chars)">Organization</label>
                              </div>
                              <div class="input-field col s6">
                                 <input id="contactname" name="contactname" type="text" ng-class="{'submitted': submitted && clientform.contactname.$invalid}"  class="validate" type="text" ng-model="objclient.contactname" maxlength="100" aria-required="true">
                                 <label for="contactname" data-error="Required(min 3 chars)">Contact Name</label>
                              </div>
                           </div>
                           <div class="row">
                              <div class="input-field col s6">
                                 <input id="mobile" name="mobile" type="text" class="validate" type="number" maxlength="15" ng-required="true" ng-class="{'submitted': submitted && clientform.mobile.$invalid}"  onkeypress="return isNumberKey(event);"  ng-model="objclient.mobile" aria-required="true">
                                 <label for="mobile" data-error="Required(min 10 digits)">Mobile</label>
                                 <span style="color:red" ng-show="submitted && clientform.$error.pattern">Please enter Mobile!</span>
                              </div>
                              <div class="input-field col s6">
                                 <input id="email" name="email" ng-required="true" ng-class="{'submitted': submitted && clientform.email.$invalid}" type="email" ng-model="objclient.email" maxlength="50" >
                                 <label data-error="Required" for="email">Email</label>
                              </div>
                           </div>
                           <div class="row">
                              <div class="input-field col s6">
                                 <input id="phone" name="phone" type="text" maxlength="15" ng-model="objclient.phone" onkeypress="return isNumberKey(event);">
                                 <label for="phone">Phone</label>
                              </div>
                              <div class="input-field col s6">
                                 <input id="addressline1"  name="addressline1" type="text" type="text" ng-model="objclient.addressline1" maxlength="100">
                                 <label for="addressline1">Address Line 1</label>
                              </div>
                           </div>
                           <div class="row">
                              <div class="input-field col s6">
                                 <input id="addressline2" name="addressline2" type="text" ng-model="objclient.addressline2" maxlength="100">
                                 <label for="addressline2">Address Line 2</label>
                              </div>
                              <div class="input-field col s6">
                                 <input id="addressline3" name="addressline3" type="text" ng-model="objclient.addressline3" maxlength="100"  ng-minlength="3">
                                 <label for="addressline3">Address Line 3</label>
                              </div>
                           </div>
                           <div class="row">
                              <div class="input-field col s6">
                                 <input id="pincode" name="pincode" type="text" maxlength="6"  ng-model="objclient.pincode" onkeypress="return isNumberKey(event);">
                                 <label for="pincode" data-error="Required">Pincode</label>
                              </div>
                              <div class="input-field col s6">
                                 <select name="regionid" ng-model="objclient.regionid" ng-class="{'submitted': submitted && projectform.regionid.$invalid}" ng-required="true" data-ng-options="rg.region_id as rg.region_name for rg in regionDetails" ng-change="getDistrictDetails(objclient.regionid);">
                                 </select>
                                 <label for="regionid">Region</label>
                              </div>
                           </div>
                           <div class="row">
                              <div class="input-field col s6">
                                 <select name="districtid" ng-model="objclient.districtid" ng-class="{'submitted': submitted && clientform.districtid.$invalid}" data-ng-options="d.district_id as d.district_name for d in districtDetails" ng-change="getTalukDetails(objclient.districtid);" ng-required="true" aria-required="true">
                                 </select>
                                 <label>District</label>
                              </div>
                              <div class="input-field col s6">
                                 <select name="talukid" ng-model="objclient.talukid" ng-class="{'submitted': submitted && clientform.talukid.$invalid}" data-ng-options="c.taluk_id as c.taluk_name for c in Taluks" ng-required="true" aria-required="true">
                                 </select>
                                 <label>Taluk</label>
                              </div>
                           </div>
                           <div class="row">
                              <div class="input-field col s6">
                                 <select name="stateid" ng-model="objclient.stateid" ng-class="{'submitted': submitted && clientform.stateid.$invalid}"  data-ng-options=" s.lkvalid as s.description for s in state" ng-required="true" aria-required="true">
                                 </select>
                                 <label>State</label>
                              </div>
                              <div class="input-field col s6">
                                 <select name="countryid" ng-model="objclient.countryid" ng-class="{'submitted': submitted && clientform.countryid.$invalid}"  data-ng-options=" ct.lkvalid as ct.description for ct in country" ng-required="true" aria-required="true">
                                 </select>
                                 <label>Country</label>
                              </div>
                           </div>
                           <div class="row">
                              <div class="input-field col s6">
                                 <input id="gstno" name="gstno" type="text" type="text" ng-model="objclient.gstno">
                                 <label for="gstno">GST No</label>
                              </div>
                              <div class="input-field col s6">
                                 <input id="panno" name="panno" type="text" type="text" ng-model="objclient.panno" maxlength="10" aria-required="true">
                                 <label for="panno">PAN No</label>   
                              </div>
                           </div>
                           <div class="row">
                              <div class="input-field col s6">
                                 <input id="gsttanno" name="gsttanno" type="text" type="text" ng-model="objclient.gsttanno" maxlength="10">
                                 <label for="tanno">GST TAN No</label>
                              </div>
                              <div class="input-field col s6">
                                 <input id="tanno" name="tanno" type="text" type="text" ng-model="objclient.tanno" maxlength="10">
                                 <label for="tanno">IT TAN No</label>
                              </div>
                           </div>
                           <div class="row"  ng-show="functions=='add'" >
                              <div class="input-field col s6">
                                 <input minlength="6" maxlength="20" id="password" name="password"  ng-class="{'submitted': submitted && clientform.password.$invalid}"  type="password" class="validate" type="text" ng-model="objclient.password">
                                 <label for="password" data-error="Required (min 6 chars)">Password</label>
                              </div>
                              <div class="input-field col s6">
                                 <input minlength="6" maxlength="20" id="con_password" name="con_password"  ng-class="{'submitted': submitted && clientform.con_password.$invalid}"  type="password" class="validate" type="text" ng-model="objclient.con_password">
                                 <label for="con_password" data-error="Required">Confirm Password</label>
                              </div>
                           </div>
                           <div class="row">
                              <div class="input-field col s6">
                                 <select name="deptid" ng-model="objclient.deptid" ng-class="{'submitted': submitted && clientform.deptid.$invalid}" ng-required="true" data-ng-options=" d.lkvalid as d.description for d in dept" aria-required="true">
                                 </select>
                                 <label for="clientdpt" data-error="Required">Employer Department</label>
                              </div>
                              <div class="input-field col s6">
                                 <select name="departmenttypeid" ng-model="objclient.departmenttypeid" ng-class="{'submitted': submitted && clientform.departmenttypeid.$invalid}"  data-ng-options=" dt.lkvalid as dt.description for dt in departmenttype" ng-required="true" aria-required="true">
                                 </select>
                                 <label>Department Type</label>
                              </div>
                           </div>
                           <div class="row">
                              <div class="input-field col s6">
                                 <input id="department" name="department" type="text" ng-class="{'submitted': submitted && clientform.department.$invalid}" class="validate" ng-model="objclient.department" maxlength="100"  ng-minlength="3" aria-required="true">
                                 <label for="department" data-error="Required">Department Name</label>
                              </div>
                              <div class="input-field col s6"  ng-hide="functions=='add'">
                                 <select name="apprstatus" ng-model="objclient.apprstatusid" data-ng-options=" d.lkvalid as d.description for d in apprstatus" aria-required="true">
                                 </select>
                                 <label>Approval Status</label>
                              </div>
                           </div>
                           <div class="row">
                              <div class="file-field input-field">
                                 <div class="btn">
                                    <span>File</span>
                                    <input type="file" ngf-select ng-model="picFile" name="file" accept="image/*" ng-change="changeName(picFile.name)" ngf-max-size="1MB" ngf-resize="{width: 512, height: 380}">
                                 </div>
                                 <div class="file-path-wrapper">
                                    <input class="file-path validate" type="text"
                                       ng-model="objclient.image">
                                 </div>
                                 <span ng-show="!objclient.image.length">Please select Logo image!</span>
                                 <br>
                                 <!-- <i ng-show="clientform.file.$error.maxSize">File too large
                                    {{errorFile.size / 1000000|number:1}}MB: max 2M</i> -->
                                 <img  id="clientimage" ngf-thumbnail="picFile" class="thumb">
                                 <span class="progress" ng-show="picFile.progress >= 0">
                                    <div style="width:{{picFile.progress}}%"
                                       ng-bind="picFile.progress + '%'"></div>
                                 </span>
                                 <span class="err" ng-show="errorMsg">{{errorMsg}}</span>
                              </div>
                           </div>
                        </div>
                     </div>
               </div>
            </div>
            <div class="modal-footer">
            <div id="failure" class="red-text" style="float:left"></div>
            <button class="modal-action waves-effect waves-green btn-flat" type="submit" ng-click="submitted=true;">
            Save
            </button>
            <a href="" class="modal-action modal-close waves-effect btn-flat ">Cancel</a>
            </div>
            </form>
         </div>


   </div>
</div>
<style type="text/css">
   .ng-table-pager {
   display: none;
   }
</style> 
<style type="text/css"> 
   .datepicker-dropdown {
      top: 0;
      left: 0;
      position: absolute;
      background-color: #fff;
      width: 20%; 
   }
</style>
<script>
   $(document).ready(function(){
       $('ul.tabs').tabs();
     });
        
</script>
<script  type="text/javascript">
   function isNumberKey(evt)
   {
     var charCode = (evt.which) ? evt.which : event.keyCode;
    console.log(charCode);
       if (charCode != 46 && charCode != 45 && charCode > 31
       && (charCode < 48 || charCode > 57))
        return false;
   
     return true;
   }
</script> 
<script>
   $('.tooltipped').tooltip({
      delay: 50
   });
   $('.datepicker').pickadate({
      labelMonthNext: 'Go to the next month',
      labelMonthPrev: 'Go to the previous month',
      labelMonthSelect: 'Pick a month from the dropdown',
      labelYearSelect: 'Pick a year from the dropdown',
      selectMonths: true,
      selectYears: true
   })

   $('.datepicker').on('change', function() {
      if ($(this).attr('id') === 'fromdate') {
         $('#todate').pickadate('picker').set('min', $(this).val());
      }
      if ($(this).attr('id') === 'todate') {
         $('#fromdate').pickadate('picker').set('max', $(this).val());
      }
   });  

</script> 

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