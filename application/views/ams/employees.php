<script type="text/javascript" src="<?php echo base_url("assets/js/app/employee.js")?>"></script>
<script type="text/javascript">
   var employeeid = 0
</script>
<div class="parallax-container" style="background-color: rgba(0, 12, 78, 0.9)">
   <div class="row">
      <div class="container">
         <div class="col s12 m6 l6">
            <div class="pagebannertext white-text">Staff</div>
         </div>
         <div class="col s12 m6 l6 right-align">
            <div class="dumheight hide-on-small-only"> </div>
            <div class=""> <a href="<?php echo base_url('admin/dashboard')?>" class="breadcrumb">Home</a> <span class="breadcrumb">Staff</span> </div>
         </div>
      </div>
   </div>
   <div class="parallax"><img src="<?php echo base_url("assets/images/breadcrumbbanner.jpg")?>">
   </div>
</div>
<div class="row" ng-app="appAdminEmployee">
   <div class="container" ng-controller="ctrlAdminEmployee">
      <!-- Modal Window for new and Edit -->
      <div class="fixed-action-btn" style="bottom: 50px; right: 19px;">
         <?php if($roledata['permissions']['AEMPLOYEE']==1) {?>
         <a class="btn-floating btn-large red modal-trigger" href="#modal1" ng-click='addemployee()'>
         <i class="mdi mdi-account-plus"></i>
         </a>
         <?php } ?>   
      </div>
      <!-- Modal Structure -->
      <div id="modal1" class="modal modal-fixed-footer" style=" max-height:90%;">
         <div class="modal-content">
            <nav class="blue" style="position: fixed;margin-top: 0px; z-index:999;">
               <div class="left col s1 m1 l1">
                  <div class="white-text"><a href=""><i class="modal-action modal-close mdi white-text mdi-arrow-left"></i></a> </div>
               </div>
               <div class="col s11 m11 l11">
                  <div class="li white-text" id="mcaption">Add Staff</div>
               </div>
            </nav>
            <div class="row" style="padding: 24px;">
               <form autocomplete="off" ng-submit="employeeform.$valid && saveemployee(objemployee)" id="employeeform" name="employeeform" novalidate>
                  <div class="row" style="padding: 40px;">
                  <div class="row">
                     <div class="col s12">
                        <input type="hidden" ng-model="objemployee.employeeid">
                        <div class="row">
                           <div class="input-field col s6">
                              <input autocomplete="off" id="firstname" name="firstname"  type="text" maxlength="150" minlength="3"  ng-class="{'submitted': submitted && employeeform.firstname.$invalid}" class="validate" type="text" ng-required="true" ng-model="objemployee.firstname">
                              <label for="firstname" data-error="Required (min 3 chars)" style="Width:100%">First Name</label>
                           </div>
                           <div class="input-field col s6">
                              <input autocomplete="off" id="lastname"  name="lastname" type="text" maxlength="150"  ng-class="{'submitted': submitted && employeeform.lastname.$invalid}"  class="validate" type="text" ng-required="true" ng-model="objemployee.lastname">
                              <label for="lastname" data-error="Required">Last Name</label>
                           </div>
                        </div>
                        <div class="row">
                           <div class="input-field col s6">
                              <input autocomplete="off" id="employeeno" name="employeeno" type="text" maxlength="150"  ng-class="{'submitted': submitted && employeeform.employeeno.$invalid}"  class="validate" type="text" ng-required="true" ng-model="objemployee.employeeno">
                              <label for="employeeno" data-error="Required">Staff No</label>
                           </div>
                           <div class="input-field col s6">
                              <select ng-required="true" name="regionid" ng-model="objemployee.regionid"  ng-class="{'submitted': submitted && employeeform.regionid.$invalid}" data-ng-options=" rg.lkvalid as rg.description for rg in region">
                              </select>
                              <label for="region" data-error="Required">Region</label>
                           </div>
                        </div>
                        <div class="row">
                           <div class="input-field col s6">
                              <select ng-required="true" name="desigid" ng-model="objemployee.desigid" ng-class="{'submitted': submitted && employeeform.desigid.$invalid}"  data-ng-options=" de.lkvalid as de.description for de in designation">
                              </select>
                              <label for="desig" data-error="Required">Designation</label>
                           </div>
                           <div class="input-field col s6">
                              <input autocomplete="off" id="doj" type="date" class="datepicker" type="text" data-ng-model="objemployee.doj">
                              <label for="doj">Date of Joining</label>
                           </div>
                        </div>
                        <div class="row">
                           <div class="input-field col s6">
                              <input autocomplete="off" id="email"  name="email" type="email" maxlength="150"  ng-class="{'submitted': submitted && employeeform.email.$invalid}"  class="validate" type="text" ng-model="objemployee.email" ng-required="true">
                              <label for="email" data-error="Required">Email</label>
                           </div>
                           <div class="input-field col s6">
                              <input autocomplete="off" id="mobile"  name="mobile" type="text"  minlength="10" maxlength="10"  ng-class="{'submitted': submitted && employeeform.mobile.$invalid}"  class="validate" ng-model="objemployee.mobile" ng-pattern="/^[0-9]*$/" ng-required="true" onkeypress="return isNumberKey(event);">
                              <label for="mobile" data-error="Required">Mobile</label>
                           </div>
                        </div>
                        <div class="row">
                           <div class="input-field col s6">
                              <input autocomplete="off" id="phone" type="text" maxlength="15" class="validate"  ng-model="objemployee.phone" onkeypress="return isNumberKey(event);">
                              <label for="phone" data-error="Required">Phone</label>
                           </div>
                           <div class="input-field col s6">
                              <input autocomplete="off" id="address" type="text" maxlength="200"  class="validate" ng-model="objemployee.address" >
                              <label for="address" >Address</label>
                           </div>
                        </div>
                        <div class="row">
                           <div class="input-field col s6">
                              <select ng-model="objemployee.roleid" name="roleid" ng-class="{'submitted': submitted && employeeform.roleid.$invalid}"  data-ng-options=" rl.roleid as rl.description for rl in roles" ng-required="true">
                              </select>
                              <label>Role</label>
                           </div>
                           <div class="input-field col s6">
                              <input ng-minlength="6" maxlength="15" id="password" name="password"  ng-class="{'submitted': submitted && employeeform.password.$invalid}"  type="password" class="validate" type="text" ng-model="objemployee.password" ng-required="true" autocomplete="new-password">
                              <label for="password" data-error="Required (min 6 chars)">Password</label>
                           </div>
                        </div>
                        <div id="failure" class="red-text"></div>
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
      <div id="" class="section">
         <div class="row">
            <div class="col s12 ">
               <div id="Client-list" class="CLheight col s12 m4 l4 card-panel z-depth-1">
                  <ul class="collection">
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
                     <li class="collection-item avatar waves-effect waves-teal col s12" ng-class="{selected: employee.employeeid === selected.employeeid}" ng-repeat="employee in employees | filter: filter">
                        <a href="javascript::void(0)" ng-click="select(employee)">
                           <div style="margin-top: 10px;">
                              <span class="circle light-blue" style="padding: 10px;">{{employee.firstname.slice(0,1)}}</span> <span class="email-title">
                              {{employee.firstname}} {{employee.lastname}} - {{employee.employeeno}}</span>
                              <p class="truncate grey-text ultra-small">{{employee.desig}}</p>
                           </div>
                        </a>
                     </li>
                     </div>
                  </ul>
               </div>
               <div id="Client-details" class="col s12 m8 l8 card-panel z-depth-1">
                  <div class="email-content-wrap">
                     <div class="row z-depth-1" style="background-color: #eee;">
                        <div class="col s10 m10 l10">
                           <ul class="collection">
                              <li class="collection-item avatar" style="background-color:transparent">
                                 <img src="<?php echo base_url("assets/images/photo.png")?>" alt="" class="circle">
                                 <span class="email-title">{{selected.firstname}} {{selected.lastname}} - {{selected.employeeno}}</span>
                                 <p class="truncate grey-text ultra-small">{{selected.desig}}</p>
                              </li>
                           </ul>
                        </div>
                        <div class="col s2 m2 l2 right-align resultframe">
                           <?php if($roledata['permissions']['EEMPLOYEE']==1) {?>
                           <a id="editemployee" ng-click="editemployee()"><span><i class="small icon darken-1 mdi mdi-account-edit"></i></span></a>
                           <?php } ?>
                           <?php if($roledata['permissions']['DEMPLOYEE']==1) {?>
                           <a ng-click='removeemployee()'><span><i class="small icon mdi mdi-delete"></i></span></a>
                           <?php } ?>
                           
                        </div>
                     </div>
                     <div class="row">
                        <div class="col  s12 m6 l6">
                           <p class="blue-grey-text"><strong>First Name</strong> </p>
                           <p>{{selected.firstname}}</p>
                        </div>
                        <div class="col s12 m6 l6">
                           <p class="blue-grey-text"><strong>Last Name</strong> </p>
                           <p>{{selected.lastname}}</p>
                        </div>
                     </div>
                     <div class="row">
                        <div class="col s12 m6 l6">
                           <p class="blue-grey-text"><strong>Staff No</strong> </p>
                           <p>{{selected.employeeno}} </p>
                        </div>
                        <div class="col  s12 m6 l6">
                           <p class="blue-grey-text"><strong>Designation</strong> </p>
                           <p>{{selected.desig}} </p>
                        </div>
                     </div>
                     <div class="row">
                        <div class="col s12 m6 l6">
                           <p class="blue-grey-text"><strong>Email</strong> </p>
                           <p>{{selected.email}}</p>
                        </div>
                        <div class="col  s12 m6 l6">
                           <p class="blue-grey-text"><strong>Phone</strong> </p>
                           <p>{{selected.phone}}</p>
                        </div>
                     </div>
                     <div class="row">
                        <div class="col s12 m6 l6">
                           <p class="blue-grey-text"><strong>Mobile</strong> </p>
                           <p>{{selected.mobile}}</p>
                        </div>
                        <div class="col  s12 m6 l6">
                           <p class="blue-grey-text"><strong>Region</strong> </p>
                           <p>{{selected.region}}</p>
                        </div>
                     </div>
                     <div class="row">
                        <div class="col  s12 m6 l6">
                           <p class="blue-grey-text"><strong>Role</strong> </p>
                           <p>{{selected.role}}</p>
                        </div>
                        <div class="col s12 m6 l6">
                           <p class="blue-grey-text"><strong>Date of Joining</strong> </p>
                           <p>{{selected.doj}}</p>
                        </div>
                     </div>
                     <div class="row">
                        <div class="col s12 m12 l12">
                           <p class="blue-grey-text"><strong>Address</strong> </p>
                           <p style=" max-width:400px;
    word-wrap:break-word;">{{selected.address}}</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
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