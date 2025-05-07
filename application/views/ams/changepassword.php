<script type="text/javascript" src="<?php echo base_url("assets/js/app/employee.js")?>"></script>
<script type="text/javascript"> var employeeid = "<?php echo $this->session->userdata('employeeid')?>" </script>
<div class="parallax-container" style="background-color: rgba(0, 12, 78, 0.9)">
      <div class="row">
         <div class="container">
            <div class="col s12 m6 l6">
               <div class="pagebannertext white-text">Change Password</div>
            </div>
            <div class="col s12 m6 l6 right-align">
               <div class="dumheight hide-on-small-only"> </div>
               <div class=""> <a href="<?php echo base_url('admin/dashboard')?>" class="breadcrumb">Home</a> <span class="breadcrumb">Change Password</span> </div>
            </div>
         </div>
      </div>
      <div class="parallax"><img src="<?php echo base_url("assets/images/breadcrumbbanner.jpg")?>"></div>
   </div>
<div class="row" ng-app="appAdminEmployee" >
<div class="container" ng-controller="ctrlAdminEmployee">
   <!-- Modal Structure -->
   <div id="modal1" class="modal modal-fixed-footer" style="max-width: 550px; max-height:90%;">
      <div class="modal-content">
         <nav class="blue">
            <div class="nav-wrapper">
               <div class="left col s12 m5 l5">
                  <ul>
                     <li  class="white-text"><a href="" ><i class="modal-action modal-close mdi white-text mdi-arrow-left"></i></a>
                     </li>
                     <li class=" li white-text" id="mcaption">Change Password</li>
                  </ul>
               </div>
               <div class="col s12 m7 l7 hide-on-med-and-down">
               </div>
            </div>
         </nav>
      </div>
   </div>
   <div class="col s12 m12">
         <div class="row">
           <div class ="col s1 m3 l3"></div>
            <form ng-submit="chpwdform.$valid && changepassword(objchpwd)" id="chpwdform" name="chpwdform" novalidate class="col s10 m6 l6" >
               <div class="row">
                  <div class="input-field col s12">
                     <input  id="password"  name="password" type="password" ng-minlength="8" maxlength="15"  ng-model="objchpwd.password" ng-required="true" ng-class="{'submitted': submitted && chpwdform.password.$invalid}">
                     <label for="password" data-error="Required">Password</label>
                  </div>
               </div>
               <div class="row">
                  <div class="input-field col s12">
                     <input type="password" id="newpassword" name="newpassword" ng-minlength="8" maxlength="15" ng-model="objchpwd.newpassword" ng-required="true" ng-class="{'submitted': submitted && chpwdform.newpassword.$invalid}">
                     <label for="newpassword" data-error="Required" >New Password</label>
                  </div>
               </div>
               <div class="row">
                  <div class="input-field col s12">
                     <input  id="repassword" name="repassword" type="password" ng-model="objchpwd.repassword" ng-minlength="8" maxlength="15" ng-required="true" ng-class="{'submitted': submitted && chpwdform.repassword.$invalid}">
                     <label for="repassword" data-error="Required">Repeat New Password</label>
                  </div>
               </div>
               <div class="row">
                <div id="failure" class="red-text"></div>
                  <div class="input-field col s12">
                     <button class="btn cyan waves-effect waves-light right" type="submit" ng-click="submitted=true;">Change Password
                     <i class="mdi-content-send right"></i>
                     </button>
                  </div>
               </div>
            <div class ="col  s1 m3 l3"></div>
         </form>
      </div>
   </div>
</div>
</div>
