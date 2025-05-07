<script type="text/javascript" src="<?php echo base_url("assets/js/app/employee.js")?>"></script>
<script type="text/javascript">
   var employeeid = "<?php echo $this->session->userdata('employeeid')?>"
</script>
<div class="parallax-container" style="background-color: rgba(0, 12, 78, 0.9)">
   <div class="row">
      <div class="container">
         <div class="col s12 m6 l6">
            <div class="pagebannertext white-text">Profile</div>
         </div>
         <div class="col s12 m6 l6 right-align">
            <div class="dumheight hide-on-small-only"> </div>
            <div class=""> <a href="<?php echo base_url('admin/dashboard')?>" class="breadcrumb">Home</a> <span class="breadcrumb">Profile</span> </div>
         </div>
      </div>
   </div>
   <div class="parallax"><img src="<?php echo base_url("assets/images/breadcrumbbanner.jpg")?>">
   </div>
</div>
<!-- Modal Structure -->
<div id="modal1" class="modal modal-fixed-footer" style="max-width: 550px; max-height:90%;">
   <div class="modal-content">
      <nav class="blue" style="position: fixed;margin-top: 0px; z-index:999">
         <div class="left col s1 m1 l1">
            <div class="white-text"><a href=""><i class="modal-action modal-close mdi white-text mdi-arrow-left"></i></a> </div>
         </div>
         <div class="col s11 m11 l11">
            <div class="li white-text" id="mcaption">Edit Profile</div>
         </div>
      </nav>
   </div>
   <div class="modal-footer">
   </div>
</div>
<div class="row" ng-app="appAdminEmployee">
   <div class="container" ng-controller="ctrlAdminEmployee">
      <div id="" class="section">
         <div class="row">
            <div id="Client-details" class="col s12">
               <div class="email-content-wrap">
                  <div class="row">
                     <div class="col s12">
                        <div class="input-field col s12">
                           <img src="<?php echo base_url("assets/images/photo.png")?>" alt="" class="circle">
                        </div>
                        <div class="input-field col s6">
                           <h4 class="email-title">{{objprofile.firstname}} {{objprofile.lastname}} - {{objprofile.employeeno}}
                           </h4>
                           <div class="input-field col s6">
                           </div>
                        </div>
                     </div>
                     <form ng-submit="profileform.$valid && saveemployee(objprofile)" id="profileform" name="profileform" novalidate>
                        <div class="row">
                           <div class="input-field col s6 l4">
                              <input id="employeeno" name="employeeno" type="text" class="validate" ng-model="objprofile.employeeno" ng-required="true" ng-class="{'submitted': submitted && profileform.employeeno.$invalid}">
                              <label for="employeeno" data-error="Required">Employee No</label>
                           </div>
                           <div class="input-field col s6 l4">
                              <input id="firstname" name="firstname" type="text" class="validate" maxlength="150" minlength="3" ng-model="objprofile.firstname" ng-required="true" ng-class="{'submitted': submitted && profileform.firstname.$invalid}">
                              <label for="firstname" data-error="Required (min 3 chars)">First Name</label>
                           </div>
                           <div class="input-field col s6 l4">
                              <input id="lastname" name="lastname" type="text" class="validate" maxlength="150" ng-model="objprofile.lastname" ng-required="true" ng-class="{'submitted': submitted && profileform.lastname.$invalid}">
                              <label for="lastname" data-error="Required">Last Name</label>
                           </div>
                           <div class="input-field col s6 l4">
                              <select name="regionid" ng-model="objprofile.regionid" data-ng-options=" r.lkvalid as r.description for r in region" ng-required="true" ng-class="{'submitted': submitted && profileform.regionid.$invalid}">
                              </select>
                              <label>Region</label>
                           </div>
                           <div class="input-field col s6 l4">
                              <input id="email" name="email" type="email" class="validate" maxlength="150" ng-model="objprofile.email" ng-required="true" ng-class="{'submitted': submitted && profileform.email.$invalid}">
                              <label for="email" data-error="Required valid email">Email</label>
                           </div>
                           <div class="input-field col s6 l4">
                              <input id="mobile" name="mobile" type="text" class="validate" ng-minlengh="10" maxlength="10" ng-model="objprofile.mobile" ng-required="true" ng-class="{'submitted': submitted && profileform.mobile.$invalid}">
                              <label for="mobile" data-error="Required">Mobile</label>
                           </div>
                        </div>
                        <div class="row">
                           <div class="input-field col s6 l4">
                              <input id="phone" type="text" class="validate" maxlength="20" ng-model="objprofile.phone">
                              <label for="phone">Phone</label>
                           </div>
                           <div class="input-field col s6 l4">
                              <input id="doj" ng-required="true" type="date" class="datepicker" type="text" data-ng-model="objprofile.doj">
                              <label for="doj">Date of Joining</label>
                           </div>
                           <div class="input-field col s6 l4">
                              <select ng-required="true" ng-model="objprofile.roleid" data-ng-options=" rl.roleid as rl.description for rl in roles">
                              </select>
                              <label>Role</label>
                           </div>
                        </div>
                        <div class="row">
                           <div id="failure" class="red-text"></div>
                           <div class="input-field col s6 l4">
                              <p>
                                 <button class="btn waves-effect waves-light  cyan darken-2" type="submit" ng-click="submitted=true;">Save</button>
                              </p>
                           </div>
                        </div>
                     </form>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>