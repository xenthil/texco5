<script type="text/javascript" src="<?php echo base_url("assets/js/app/attendance.js")?>"></script>
<script type="text/javascript">
   var clientid = 0;
</script>
<div class="parallax-container" style="background-color: rgba(0, 12, 78, 0.9)">
   <div class="row">
      <div class="container">
         <div class="col s12 m6 l6">
            <div class="pagebannertext white-text">Attendance</div>
         </div>
         <div class="col s12 m6 l6 right-align">
            <div class="dumheight hide-on-small-only"> </div>
            <div class=""> <a href="<?php echo base_url('admin/dashboard')?>" class="breadcrumb">Home</a> <span class="breadcrumb">Attendance</span> </div>
         </div>
      </div>
   </div>
   <div class="parallax"><img src="<?php echo base_url("assets/images/breadcrumbbanner.jpg")?>">
   </div>
</div>
<div class="row" ng-app="appClientattendance">
<div class="container" ng-controller="ctrlClientattendance">
<!-- Modal Window for new and Edit -->
<div class="fixed-action-btn" style="bottom: 50px; right: 19px;">
   <?php if($roledata['permissions']['AATTEND']==1) {?>
   <a class="btn-floating btn-large red modal-trigger" ng-click='addattendance()'>
   <i class="mdi mdi-account-plus"></i>
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
            <div class="li white-text" id="mcaption">Add Attendance</div>
         </div>
      </nav>
      <div class="row" style="padding: 40px;">
         <form ng-submit="attendanceform.$valid && saveattendance(objattendance, members)" id="attendanceform" name="attendanceform" novalidate>
            <div class="row" style="height:40px;">&nbsp;</div>
            <div class="row">
               <div class="col s12">
                  <div class="row">
                     <div class="input-field col s6">
                        <input id="fromdate" type="date" class="datepicker validate" type="text"
                         ng-required="true"   ng-class="{'submitted': submitted && objattendance.fromdate.$invalid}" data-ng-model="objattendance.fromdate">
                        <label for="fromdate">From date</label>
                     </div>
                     <div class="input-field col s6">
                        <input id="todate" type="date" class="datepicker" type="text" ng-required="true"  ng-class="{'submitted': submitted && objattendance.todate.$invalid}" data-ng-model="objattendance.todate">
                        <label for="todate">To Date</label>
                     </div>
                  </div>
                  <div class="row" id="divProjAdd">
                     <div class="input-field col s6">
                        <select id="client" name="client" class="validate"  ng-required="true"  ng-class="{'submitted': submitted && attendanceform.client.$invalid}" ng-model="objattendance.clientid" data-ng-options=" c.clientid as c.organization for c in clients" ng-change="getdetails(objattendance.clientid);selectProject(objattendance.clientid)">
                        </select><label for="client">Employer</label>
                     </div>
                     <div class="input-field col s6">
                        <select id="project" name="project" class="validate"  ng-required="true"  ng-class="{'submitted': submitted && attendanceform.project.$invalid}"  ng-model="objattendance.projectid" data-ng-options=" p.projectid as p.name for p in selectedprojects"  ng-change="selectMembers(objattendance.projectid)">
                        </select><label for="project">Project</label>
                     </div>
                  </div>
                  <div class="row" id="divProjView">
                     <div class="input-field col s6">
                        <input id="clientdesc" readonly  ng-model="objattendance.organization" >
                        </input><label for="clientdesc">Employer</label>
                        </div>
                     <div class="input-field col s6">
                        <input id="projectname" readonly class="validate"  ng-model="objattendance.projectname" >
                        </input><label for="projectname">Project</label>
                     </div>
                  </div>
                  <div class="row" >
                     <div class="input-field col s12">
                        <table>
                           <tr>
                              <th>Employees</th>
                              <th>Present Days</th>
                           </tr>
                           <tr ng-repeat="l in members" >
                              <td><input ng-model="l.attendanceid" type="hidden">{{l.firstname}} - {{l.texcono}}</td>
                              <td><input ng-model="l.days" id="{{l.days}}" type="number" name="days" min="1" max="31" ng-required="true"> </td>
                           </tr>
                        </table>
                     </div>
                  </div>
               </div>
            </div>
      </div>
   </div>
   <div class="modal-footer">
   <div id="failure" class="red-text waves-effect waves-green"></div>
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
            <li class="collection-item avatar waves-effect waves-teal col s12" ng-class="{selected: attendanceinfo.projectid === selected.projectid && attendanceinfo.fromdate === selected.fromdate}" ng-repeat="attendanceinfo in attendancedetails  |  filter: filter ">
               <a href="javascript::void(0)" ng-click="select(attendanceinfo)">
                  <div style="margin-top: 10px;">
                     <span class="circle light-blue" style="padding: 10px;">{{attendanceinfo.projectname.slice(0,1)}}</span> <span class="email-title">{{attendanceinfo.projectname}} - {{attendanceinfo.projectno}}</span>
                     <p class="truncate grey-text ultra-small">{{attendanceinfo.fromdate}} - {{attendanceinfo.todate}}</p> 
                  </div>
               </a>
            </li>
         </ul>
      </div>
       <div class="input-field col s4">
         <input id="startdate" type="date" class="datepicker" type="text" ng-model="startdate" ng-change="searchbydate(startdate, enddate)">
         <label for="startdate">Start Date </label>
      </div>
      <div class="input-field col s4">
        <input id="enddate" type="date" class="datepicker" type="text" ng-model="enddate" ng-change="searchbydate(startdate, enddate)">
         <label for="enddate">End Date</label>
      </div> 
      <div id="Client-details" class="col s10 m8 l8 card-panel z-depth-1">
         <div class="email-content-wrap">
            <div class="row z-depth-1" style="background-color: #eee;">
               <div class="col s12 m10 l10">
                  <ul class="collection">
                     <li class="collection-item avatar" style="background-color:transparent">
                        <img src="<?php echo base_url("assets/images/photo.png ")?>" alt="" class="circle">
                        <span class="email-title">{{selected.projectname}} - {{selected.projectno}}</span>
                        <p class="truncate grey-text ultra-small">{{selected.fromdate}} - {{selected.todate}}</p> 
                     </li>
                  </ul>
               </div>
               <div class="col s2 m2 l2 right-align  resultframe">
                   <?php if($roledata['permissions']['EATTEND']==1) {?>
                  <a id="editattendance" ng-click='editattendance()'><span><i class="small icon darken-1 mdi mdi-account-edit"></i></span></a>
                  <?php } ?>
                  <?php if($roledata['permissions']['DATTEND']==1) {?>
                  <a ng-click='removeattendance()'><span><i class="small icon mdi mdi-delete"></i></span></a>
                  <?php } ?>
               </div>
            </div>
            <div class="row">
               <div class="col s12">
                  <table>
                     <tr>
                        <th>Members</th>
                        <th>Present days</th>
                     </tr>
                     <tr ng-repeat="l in selected.members" >
                        <td>{{l.firstname}} - {{l.texcono}}</td>
                        <td>{{l.days}}</td>
                     </tr>
                  </table>
               </div>
            </div>
            <div class="row">
               <div class="col s12 m6 l6">
                  <p class="blue-grey-text"><strong>Employer</strong> </p>
                  <p>{{selected.organization}}</p>
               </div>
               <div class="col  s12 m6 l6">
                  <p class="blue-grey-text"><strong>Project</strong> </p>
                  <p>{{selected.projectname}}</p>
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
         </div>
      </div>
   </div>
</div>

