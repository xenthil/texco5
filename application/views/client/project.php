<script type="text/javascript" src="<?php echo base_url("assets/js/app/project.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/underscore.js")?>"></script>
<script type="text/javascript">
   var clientid = <?php echo $clientid;?>;
</script>
<div class="parallax-container" style="background-color: rgba(0, 12, 78, 0.9)">
   <div class="row">
      <div class="container">
         <div class="col s12 m6 l6">
            <div class="pagebannertext white-text">Projects</div>
         </div>
         <div class="col s12 m6 l6 right-align">
            <div class="dumheight hide-on-small-only"> </div>
            <div class=""> <a href="<?php echo base_url('client/dashboard')?>" class="breadcrumb">Home</a> <span class="breadcrumb">Projects</span> </div>
         </div>
      </div>
   </div>
   <div class="parallax"><img src="<?php echo base_url("assets/images/breadcrumbbanner.jpg")?>">
   </div>
</div>
<div class="row" ng-app="appProject">
   <div class="container" ng-controller="ctrlProject">
      <!-- Modal Window for new and Edit -->
      <div class="fixed-action-btn" style="bottom: 50px; right: 19px;">
         <a class="btn-floating btn-large red modal-trigger" ng-click='addproject()'>
         <i class="mdi mdi-account-plus"></i>
         </a>
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
                        <div class="row">
                           <div class="input-field col s6">
                              <select name="clientid" ng-model="objproject.clientid"  ng-class="{'submitted': submitted && projectform.clientid.$invalid}" ng-required="true" data-ng-options=" c.clientid as c.organization for c in clients">
                              </select>
                              <label for="client">Employer</label>
                           </div>
                           <div class="input-field col s6">
                              <input id="projectno" name="projectno" ng-class="{'submitted': submitted && projectform.projectno.$invalid}" type="text" class="validate" ng-required="true" maxlength="20" ng-model="objproject.projectno" >
                              <label for="projectno" data-error="Required">Project No</label>
                           </div>
                        </div>
                        <div class="row">
                           <div class="input-field col s6">
                              <input id="name" name="name" type="text" class="validate" ng-class="{'submitted': submitted && projectform.name.$invalid}" maxlength="50" ng-model="objproject.name">
                              <label for="name"  data-error="Required">Project Name</label>
                           </div>
                           <div class="input-field col s6">
                              <select name="districtid" ng-model="objproject.districtid" ng-class="{'submitted': submitted && projectform.projectno.$invalid}" ng-required="true" data-ng-options=" d.lkvalid as d.description for d in district">
                              </select>
                              <label for="districtid">District</label>
                           </div>
                        </div>
                        <div class="row">
                           <div class="input-field col s6">
                              <input id="designation" name="designation" type="text" class="validate" ng-class="{'submitted': submitted && projectform.designation.$invalid}" maxlength="50" ng-model="objproject.designation">
                              <label for="designation"  data-error="Required">Designation</label>
                           </div>
                           <div class="input-field col s6">
                              <select name="statusid" ng-model="objproject.statusid" ng-class="{'submitted': submitted && projectform.statusid.$invalid}" ng-required="true" data-ng-options=" d.lkvalid as d.description for d in statusid">
                              </select>
                              <label for="statusid">Status</label>
                           </div>
                        </div>
                        <div class="row">
                           <div class="input-field col s6">
                              <select name="regionid" ng-model="objproject.regionid" ng-class="{'submitted': submitted && projectform.regionid.$invalid}" ng-required="true" data-ng-options=" r.lkvalid as r.description for r in region">
                              </select>
                              <label for="regionid">Region</label>
                           </div>
                           <div class="input-field col s6">
                              <input id="addressline1"  name="addressline1" type="text" ng-class="{'submitted': submitted && projectform.addressline1.$invalid}" class="validate" type="text" ng-model="objproject.addressline1" maxlength="50" ng-minlength="2" aria-required="true">
                              <label for="addressline1" data-error="Required">Address Line 1</label>
                           </div>
                        </div>
                        <div class="row">
                           <div class="input-field col s6">
                              <input id="addressline2" name="addressline2" type="text"  class="validate" ng-model="objproject.addressline2" maxlength="50"  ng-minlength="3">
                              <label for="addressline2" >Address Line 2</label> 
                           </div>
                           <div class="input-field col s6">
                              <input id="addressline3" name="addressline3" type="text"  class="validate" ng-model="objproject.addressline3" maxlength="50" ng-minlength="3">
                              <label for="addressline3">Address Line 3</label>
                           </div>
                        </div>
                        <div class="row">
                           <div class="input-field col s6">
                              <input id="pincode" name="pincode" type="text" autocomplete="off"   maxlength="6" class="validate" ng-model="objproject.pincode"  onkeypress="return isNumberKey(event);">
                              <label for="pincode">Pincode</label>
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
      <div class="row">
         <div class="col s12">
            <ul class="tabs">
               <li class="tab col s6"><a class="active" id="Running" ng-click="getrunning()" href="#running"><span class="badge" style="margin-top: 10px;background-color: #ee6e73;width: 45px;">{{runningcount}}</span>Running Project</a></li>
               <li class="tab col s6"><a  id="Closed" ng-click="getclosed()" href="#closed"><span class="badge" style="margin-top: 10px;background-color: #ee6e73;width: 45px;">{{closedcount}}</span>Closed Project</a></li>
            </ul>
         </div>
         <div id="running" class="col s12">
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
                           <li class="collection-item avatar" ng-class="{selected: project.projectid === selected.projectid}" ng-repeat="project in projectsrunning | filter: filter">
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
                                       <img src="<?php echo base_url("assets/images/clients/{{selected.image}}")?>" alt="" class="circle">
                                       <span class="email-title">{{selected.name}} - {{selected.projectno}}</span>
                                       <p class="truncate grey-text ultra-small">{{selected.client}} - {{selected.region}}, {{selected.district}} </p>
                                       <p class="grey-text ultra-small"></p>
                                    </li>
                                 </ul>
                              </div>
                              <div class="col s2 m2 l2 right-align resultframe">
                                 <a id="editproject" ng-click="editproject()"><span><i class="small icon darken-1 mdi mdi-account-edit"></i></span></a>
                                 <a ng-click='removeproject()'><span><i class="small icon mdi mdi-delete"></i></span></a>
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
                           <li class="collection-item avatar" ng-class="{selected: project.projectid === selected.projectid}" ng-repeat="project in projectsclosed | filter: filter">
                              <a href="javascript::void(0)" ng-click="select(project)">
                                 <div style="margin-top: 10px;">
                                    <span class="circle light-blue" style="padding: 10px;">{{project.name.slice(0,1)}}</span>
                                    <span class="email-title">{{project.name}} - {{project.projectno}}</span>
                                    <p class="truncate grey-text ultra-small">{{project.client}} - {{project.region}}, {{project.district}}</p>
                                 </div>
                              </a>
                           </li>
                        </ul>
                     </div>
                     <div id="Client-details" class="col s10 m8 l8 card-panel z-depth-1">
                        <div class="email-content-wrap">
                           <div class="row z-depth-1" style="background-color: #eee;">
                              <div class="col s12 m10 l10">
                                 <ul class="collection">
                                    <li class="collection-item avatar" style="background-color:transparent">
                                       <img src="<?php echo base_url("assets/images/clients/{{selected.image}}")?>" alt="" class="circle">
                                       <span class="email-title">{{selected.name}} - {{selected.projectno}}</span>
                                       <p class="truncate grey-text ultra-small">{{selected.client}} - {{selected.region}}, {{selected.district}} </p>
                                       <p class="grey-text ultra-small"></p>
                                    </li>
                                 </ul>
                              </div>
                              <div class="col s2 m2 l2 right-align resultframe">
                                 <a id="editproject" ng-click="editproject()"><span><i class="small icon darken-1 mdi mdi-account-edit"></i></span></a>
                                 <a ng-click='removeproject()'><span><i class="small icon mdi mdi-delete"></i></span></a>
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
   $(document).ready(function(){
       $('ul.tabs').tabs();
     });
        
</script> 
<script  type="text/javascript">
   function isNumberKey(evt)
   {
    if ( isNaN( String.fromCharCode(event.keyCode) )) return false;
     return true;
   }
</script>