<script type="text/javascript" src="<?php echo base_url("assets/js/app/confirm.js")?>"></script>
<link rel="stylesheet" type="text/css" href="<?php echo base_url("assets/css/ng-table.min.css")?>" />
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ng-table.min.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ui-bootstrap-tpls-0.11.0.js")?>"></script>
<link rel='stylesheet prefetch' href='https://cdn.rawgit.com/chingyawhao/materialize-clockpicker/master/dist/css/materialize.clockpicker.css'>
<script src='https://cdn.rawgit.com/chingyawhao/materialize-clockpicker/master/dist/js/materialize.clockpicker.js'></script>


<div class="parallax-container" style="background-color: rgba(0, 12, 78, 0.9)">
   <div class="row">
      <div class="container">
         <div class="col s12 m6 l6">
            <div class="pagebannertext white-text">Job Confirmation</div>
         </div>
         <div class="col s12 m6 l6 right-align">
            <div class="dumheight hide-on-small-only"></div>
            <div class="">
               <a href="
                  <?php echo base_url('admin/dashboard')?>" class="breadcrumb">Home
               </a><span class="breadcrumb">Jobs</span>
               <span class="breadcrumb">Job Confirmation</span>
            </div>
         </div>
      </div>
   </div>
   <div class="parallax">
      <img src="
         <?php echo base_url("assets/images/breadcrumbbanner.jpg")?>">
   </div>
</div>
<div class="row" ng-app="appConfirm">

   <div class="container" ng-controller="ctrlConfirm">
       <div class="row">
            <div class="input-field col s4">
               <select name="posteddate" ng-model="objjobposting.closedate" ng-change="viewapplied(objjobposting.closedate)"  data-ng-options="  d.closedate as d.closedate for d in date">
              <option value=""></option> 
               </select>
               <label for="statusid">Close Date</label>
            </div>
         </div>
      <!-- <div class="input-field col m3 s6">
         <input id="startdate" type="date" class="datepicker" type="text" ng-model="startdate" ng-change="searchbydate(startdate, enddate)">
         <label for="startdate" class="datepickercls">Start Date </label>
         </div>
         <div class="input-field col m3 s6">
         <input id="enddate" type="date" class="datepicker" type="text" ng-model="enddate" ng-change="searchbydate(startdate, enddate)">
         <label for="enddate" class="datepickercls">End Date</label>
         </div> -->
      <div id="" class="section">
         <div id="Client-details" class="col s12">
            <table ng-table="tableParams" class="responsive-table highlight striped" show-filter="true" class="bordered" >
               <tr ng-repeat="applied in $data">
                  <!-- <td id="mytd">
                     <input type="hidden" id="myhiddenfield" ng-model="applied.jobactivityid">
                     </td> -->
                  <td width="8%" data-title="'REG NO'" filter="{registrationno: 'number'}" sortable="'registrationno'">{{applied.registrationno}}</td>
                  <td width="15%" data-title="'TEXCO NO'" filter="{texcono: 'text'}" sortable="'texcono'"> {{applied.texcono}}</td>
                  <td width="15%" data-title="'EMPLOYEE NAME'" filter="{firstname: 'text'}" sortable="'firstname'">{{applied.firstname}} - {{applied.serviceno}}</td>
                  <td width="8%" data-title="'PROJ NO'" filter="{projectno: 'text'}" sortable="'projectno'">{{applied.projectno}}</td>
                  <td width="15%" data-title="'PROJ NAME'" filter="{projectname: 'text'}" sortable="'projectname'">{{applied.projectname}}</td>
                  <td width="11%" data-title="'REGION'" filter="{region: 'text'}" sortable="'region'">{{applied.region}}</td>
                  <td width="9%" data-title="'DISTRICT'" filter="{district: 'text'}" sortable="'district'">{{applied.district}}</td>
                  <td width="12%" data-title="'APPLIED DATE'" filter="{effectivedate: 'text'}" sortable="'effectivedate'">{{applied.effectivedate}}</td>
                  <td width="12%" data-title="'CATEGORY'" filter="{jobname: 'text'}" sortable="'jobname'">{{applied.jobname}} - {{applied.jobcode}}
                     <span ng-show="applied.trade=='CLK' && applied.jobcode=='JA'" >(CLK)</span>
                  </td>
                  <td width="10%" data-title="'STATUS'" filter="{jobstatus: 'text'}" sortable="'jobstatus'">{{applied.jobstatus}}   {{applied.currentvacancies}}</td>
                  <!--  <td width="10%" data-title="'startdate'" ><input id="startdate" type="date" class="datepicker mem_{{meberid}}" type="text" ng-model="startdate" >
                     <label for="startdate" class="datepickercls">Confirm Date </label></td> -->
                  <?php if($roledata['permissions']['MJOBCONFIR']==1) {?>
                  <!-- <td width="5%"  ng-hide="applied.jobstatuscode == 2">
                     <a class="btn-floating btn-small blue"  ng-click="jobconfirm(applied.jobactivityid, applied.memberid, applied.jobcode, startdate)">
                     <i class="material-icons">done</i>
                     </a>
                     </td> -->
                  <td width="5%"  ng-hide="applied.jobstatuscode == 2">
                     <a class="btn-floating btn-small blue"  ng-click="inplaceothercat(applied)">
                     <i class="material-icons">done</i>
                     </a>
                  </td>
                  <td width="5%"  ng-show="applied.jobstatuscode == 2">
                     <a target="blank" href="
                        <?php echo base_url('admin/printposting?jobactivityid={{applied.jobactivityid}}')?>" class="secondary-content">
                     <i class="material-icons">print</i>
                     </a>
                  </td>
                   <td width="5%"  ng-show="applied.jobstatuscode == 2">
                     <a class="btn-floating waves-effect waves-light orange" ng-click="jobcancelmodel(applied.jobactivityid, applied.memberid,applied.inplace,applied.postinginplace,applied.jobpostingdetailid,applied.effectivedate,applied.texcono)">
                        <i class="material-icons">clear</i>
                     </a>
                  </td>
                  <td width="5%"  ng-show="applied.jobstatuscode == 2">
                   <a target="blank"  ng-click="jobprojectchange(applied.jobactivityid, applied.memberid,applied.inplace,applied.postinginplace,applied.jobpostingdetailid,applied.effectivedate,applied.texcono)" class="btn-floating waves-effect waves-light grey">
                     <i class="material-icons">swap_horiz</i>
                     </a>
                  </td>
                  <td width="50%" ng-hide="applied.jobstatuscode == 2">
                     <a class="btn-floating btn-small red"  ng-click="jobrejectionmodel(applied.jobactivityid)">
                     <i class="material-icons">not_interested</i>
                     </a>
                  </td>
                  <?php } ?>
               </tr>
            </table>
         </div>
      </div>
      <div>
         <div class="col s12 m6 l6">
            <div class="card blue-grey lighten-1">
               <div class="card-action">
                  <div class="card-content white-text">
                     <p class="text-black">You can Export all Job postings, from an excel file.</p>
                  </div>
                  <button ng-click="exportjobconfirm(objjobposting.closedate)" class="btn cyan waves-effect waves-light" type="submit">Export Job Confirm
                  <i class="mdi-content-send right"></i>
                  </button>
               </div>
            </div>
         </div>
      </div>
      <div id="modal1" class="modal">
         <div class="modal-content" style="margin:10px;">
            <div class="row">
               <div class="col s12 m3 l3">
                  <p class="blue-grey-text"><strong>Service No(Army No)</strong> </p>
                  <p class="ng-binding">{{ jobprint.serviceno }}</p>
               </div>
               <div class="col  s12 m3 l3">
                  <p class="blue-grey-text"><strong>Name</strong> </p>
                  <p class="ng-binding">{{ jobprint.firstname }}</p>
               </div>
               <div class="col  s12 m3 l3">
                  <p class="blue-grey-text"><strong>Project No</strong> </p>
                  <p class="ng-binding">{{ jobprint.projectno }}</p>
               </div>
               <div class="col  s12 m3 l3">
                  <p class="blue-grey-text"><strong>Category</strong> </p>
                  <p class="ng-binding">{{ jobprint.jobcode }}</p>
               </div>
            </div>
            <hr>
            <div class="row">
             
               <div class="col s12 m12 l6">
                  <div class="row">
                     <form class="col s12">
                        <div class="row">
                           <div class="input-field col s12">
                              <label  class="datepickercls" for="effectivedate">Effective Date</label>
                              <input id="effectivedate" type="date" class="datepicker" type="text" ng-model="jobprint.effectivedate">
                           </div>
                        </div>
                        <div class="row">
                           <div class="input-field col s12">
                              INPLACE OF
                              <input ng-model='jobprint.inplace' id="inplace" type="text">
                           </div>
                        </div>
                        <div ng-show=" jobprint.jobcode == 'OTHER'" class="row">
                           <div class="input-field col s12">
                              CATEGORY
                              <input ng-model='inplace.othercat' id="othercat" type="text">
                           </div>
                        </div>
                     </form>
                  </div>
               </div>
            </div>
         </div>
         <div class="modal-footer">
            <a ng-click="jobconfirm(jobprint.jobactivityid, jobprint.memberid, jobprint.jobcode, inplace.effectivedate, inplace.inplace, inplace.othercat, inplace.jobinplace, jobprint.jobpostingdetailid, jobprint.isrejected)" class="waves-effect waves-green btn-flat modal-action modal-close">Print</a>
            <a href="#" class="waves-effect waves-red btn-flat modal-action modal-close">Close</a>
         </div>
      </div>
      <div id="modalcancel" class="modal modal-fixed-footer" aria-hidden="true">
         <div class="modal-content" style="overflow-y: hidden;">
            <nav class="blue" style="position: fixed;margin-top: 0px; z-index:999">
               <div class="col s11 m11 l11">
                  <div class="li white-text" id="mcaption">Posting Order Cancel</div>
               </div>
            </nav>
            <div class="row" style="padding: 60px;">
               <h5>Do you want to cancel this posting order ?</h5>
            </div>
         </div>
         <div class="modal-footer">
            <div class="col s12 m12 l12">
               <button id="apply" ng-disabled="isDisabled" class="waves-effect waves-light btn" type="submit" ng-click='jobcancel(jobactivityids,memberid,inplaces,postinginplaces,jobpostingdetailid,effectivedates,texconos)' style="margin-left: 10px;">Yes</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
               <button class="waves-effect btn red" type="button" ng-click='jobcancelclose()' ng-disabled="isDisabled">No
               </button>&nbsp;&nbsp;&nbsp;
            </div>
         </div>
      </div>
      <div id="modalreject" class="modal modal-fixed-footer" aria-hidden="true">
         <div class="modal-content" style="overflow-y: hidden;">
            <nav class="blue" style="position: fixed;margin-top: 0px; z-index:999">
               <div class="col s11 m11 l11">
                  <div class="li white-text" id="mcaption">Reject Posting Order</div>
               </div>
            </nav>
            <div class="row" style="padding: 60px;">
               <h5>Do you want to reject this posting order ?</h5>
            </div>
         </div>
         <div class="modal-footer">
            <div class="col s12 m12 l12">
               <button id="apply" ng-disabled="isDisabled" class="waves-effect waves-light btn" type="submit" ng-click='jobrejection(jobactivityids)' style="margin-left: 10px;">Yes</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
               <button class="waves-effect btn red" type="button" ng-click='jobcancelclose()' ng-disabled="isDisabled">No
               </button>&nbsp;&nbsp;&nbsp;
            </div>
         </div>
      </div>
   </div>
</div>
<style type="text/css">
   .ng-table-pager {
   display: none;
   }
   .striped {
      display: block;
      height: 500px;
      overflow-y: scroll;
      overflow-x: scroll;
   }
   div#modalcancel {
      height: 200px;
   }
   div#modalreject {
      height: 200px;
   }
</style>
<script>
   $('.datepicker').pickadate({
     labelMonthNext: 'Go to the next month',
     labelMonthPrev: 'Go to the previous month',
     labelMonthSelect: 'Pick a month from the dropdown',
     labelYearSelect: 'Pick a year from the dropdown',
     selectMonths: true,
     selectYears: true,
     autoClose:true
   })
   $('#effectivedate').pickadate({
     labelMonthNext: 'Go to the next month',
     labelMonthPrev: 'Go to the previous month',
     labelMonthSelect: 'Pick a month from the dropdown',
     labelYearSelect: 'Pick a year from the dropdown',
     selectMonths: true,
     selectYears: true,
     min:new Date(),
     autoClose:true
   });

   //Time Picker:
$('.timepicker').pickatime({
    default: 'now',
    twelvehour: false, // change to 12 hour AM/PM clock from 24 hour
    donetext: 'OK',
  autoclose: false,
  vibrate: true // vibrate the device when dragging clock hand
});
</script>
