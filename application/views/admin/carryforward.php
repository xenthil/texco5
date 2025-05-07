<script type="text/javascript" src="<?php echo base_url("assets/js/app/carryforward.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ui-bootstrap-tpls-0.11.0.js")?>"></script>
<link rel="stylesheet" type="text/css" href="<?php echo base_url("assets/css/ng-table.min.css")?>" />
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ng-table.min.js")?>"></script>
<script type="text/javascript">
   var clientid = 0;
</script>
<script type="text/javascript">
   var selregionid =  0;
</script>
<div class="parallax-container" style="background-color: rgba(0, 12, 78, 0.9)">
   <div class="row">
      <div class="container">
         <div class="col s12 m6 l6">
            <div class="pagebannertext white-text">Carry Forward</div>
         </div>
         <div class="col s12 m6 l6 right-align">
            <div class="dumheight hide-on-small-only"> </div>
            <div class=""> 
               <a href="<?php echo base_url('admin/dashboard')?>" class="breadcrumb">Home</a> 
               <span class="breadcrumb">Jobs</span> 
               <span class="breadcrumb">Carry Forward</span> </div>
            </div>
      </div>
   </div>
   <div class="parallax"><img src="<?php echo base_url("assets/images/breadcrumbbanner.jpg")?>">
   </div>
</div>
<div class="row" ng-app="appJobposting">
<div class="container" ng-controller="ctrlJobposting">
<!-- Modal Window for new and Edit -->
<div class="fixed-action-btn" style="bottom: 50px; right: 19px;">
   <?php if($roledata['permissions']['AJOBPOST']==1) {?>
   <a class="btn-floating btn-large red modal-trigger" ng-click='addjobposting()'>
   <i class="mdi mdi-account-plus"></i>
   </a>
   <?php } ?>
</div>
<div id="modal2" class="modal modal-fixed-footer" style="max-height:90%;">
   <div class="modal-content">
      <nav class="blue" style="position: fixed;margin-top: 0px; z-index:999">
         <div class="left col s1 m1 l1">
            <div class="white-text"><a href=""><i class="modal-action modal-close mdi white-text mdi-arrow-left"></i></a> </div>
         </div>
         <div class="col s11 m11 l11">
            <div class="li white-text">Add Carry Forward</div>
         </div>
      </nav>
      <div class="row" style="padding: 40px;">
         <form ng-submit="saveaddingjobposting(objjobposting, jobmasteragreement)" id="addjobpostingform" name="addjobpostingform" novalidate>
            <div class="row" >
               <div class="input-field col s12">
                  <table>
                     <tr>
                        <th>Please Enter the Number of Vacancy to be added</th>
                     </tr>
                     <tr>
                        <th>Postings</th>
                        <th>Vacancy</th>
                        <th>Comments</th>
                        <th>Inplace of</th>
                     </tr>
                     <tr ng-repeat="l in jobmasteragreement" >
                        <td><input ng-model="l.jobpostingdetailid" type="hidden"> {{l.name}}</td>
                        <td><input ng-model="l.numberofvacancies" id="{{l.jobmasterid}}" max="{{l.maxvalue}}" min="0" value="{{l.numberofvacancies | number}}" class="validate" type="number" pattern="[0-9]*"   ng-required="true" min="0"> </td>
                        <td><input ng-model="l.comments" id="{{l.jobmasterid}}" value="{{l.comments}}" class="validate" type="text"> </td>
                        <td><input ng-model="l.inplace" id="{{l.jobmasterid}}" value="{{l.inplace}}" class="validate" type="text"> </td>
                     </tr>
                  </table>
               </div>
            </div>
      </div>
   </div>
   <div class="modal-footer">
   <div id="failure1" class="red-text waves-effect waves-green"></div>
   <button class="waves-effect waves-green btn-flat" type="submit" ng-click="submitted=true;">
   Save
   </button>
   <a href="" class="modal-action modal-close waves-effect btn-flat ">Cancel</a>
   </div>
   </form>
</div>
<!-- Modal Structure -->
<div id="modal1" class="modal modal-fixed-footer" style="max-height:90%;">
   <div class="modal-content">
      <nav class="blue" style="position: fixed;margin-top: 0px; z-index:999">
         <div class="left col s1 m1 l1">
            <div class="white-text"><a href=""><i class="modal-action modal-close mdi white-text mdi-arrow-left"></i></a> </div>
         </div>
         <div class="col s11 m11 l11">
            <div class="li white-text" id="mcaption">Add Job Posting</div>
         </div>
      </nav>
      <div class="row" style="padding: 40px;">
         <form ng-submit="jobpostingform.$valid && savejobposting(objjobposting, jobmasteragreement)" id="jobpostingform" name="jobpostingform" novalidate>
            <div class="row" style="height:40px;">&nbsp;</div>
            <div class="row">
               <div class="col s12">
                  <div class="row" id="divProjAdd">
                     <div class="col s6">
                     <label for="client">Project No</label>
                     </div>
                     <div class="col s6">
                     <label for="clientdesc">Client</label>
                     </div>
                  </div>
                  <div class="row" id="divProjAdd">
                     <div class="input-field col s6">
                     <select id="projectno" name="projectno" class="validate" ng-class="{'submitted': submitted && jobpostingform.client.$invalid}" ng-model="objjobposting.projectid" data-ng-options=" p.projectid as p.projectno for p in projectnos" ng-change="fillclientproject(objjobposting.projectid)">
                     </select>
                     </div>
                     <div class="input-field col s6">
                     <input id="clientdesc" readonly ng-model="objjobposting.organization">
                     </div>
                     <!-- <div class="input-field col s6">
                     <select id="client" name="client" class="validate" ng-required="true" ng-class="{'submitted': submitted && jobpostingform.client.$invalid}" ng-model="objjobposting.clientid" data-ng-options=" c.clientid as c.organization for c in clients" ng-change="selectProject(objjobposting.clientid)">
                     </select><label for="client">Client</label>
                     </div> -->
                     <input id="client" type="hidden" class="validate" ng-model="objjobposting.clientid" name="client">
                  </div>
                  <div class="row" id="divProjAdd">
                     <div class="col s6">
                     <label for="projectname">Project</label>
                     </div>
                  </div>
                  <div class="row" id="divProjAdd">
                     <div class="input-field col s6">
                     <input id="projectname" readonly class="validate" ng-model="objjobposting.projectname">
                     </div>
                     <input id="project" type="hidden" class="validate" ng-model="objjobposting.projectid">
                  </div>
                  <div class="row" >
                     <div class="input-field col s12">
                        <table>
                           <tr>
                              <th>Postings</th>
                              <th>Vacancy</th>
                              <th>Comments</th>
                              <th>Inplace of</th>
                           </tr>
                           <tr ng-repeat="l in jobmasteragreement" >
                              <td><input ng-model="l.jobpostingdetailid" type="hidden"> {{l.name}}</td>
                              <td><input ng-model="l.numberofvacancies" id="{{l.jobmasterid}}" max="{{l.maxvalue}}" min="0" value="{{l.numberofvacancies | number}}" class="validate" type="number" pattern="[0-9]*"   ng-required="true" min="0"> </td>
                              <td><input ng-model="l.comments" id="{{l.jobmasterid}}" value="{{l.comments}}" class="validate" type="text"> </td>
                              <td><input ng-model="l.inplace" id="{{l.jobmasterid}}" value="{{l.inplace}}" class="validate" type="text"> </td>
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
<!-- Modal Structure -->
<div id="modal3" class="modal modal-fixed-footer" style="max-height:90%;">
   <div class="modal-content">
      <nav class="blue" style="position: fixed;margin-top: 0px; z-index:999">
         <div class="left col s1 m1 l1">
            <div class="white-text"><a href=""><i class="modal-action modal-close mdi white-text mdi-arrow-left"></i></a> </div>
         </div>
         <div class="col s11 m11 l11">
            <div class="li white-text" id="mcaption">Edit Carry Forward</div>
         </div>
      </nav>
      <div class="row" style="padding: 40px;">
         <form ng-submit="jobpostingform.$valid && updatejobposting(objjobposting, jobmasteragreement)" id="jobpostingform" name="jobpostingform" novalidate>
            <div class="row">
               <div class="col s12">
                  <div class="row">
                     <div class="input-field col s3">
                        <label>Project No :</label>
                     </div>
                     <div class="input-field col s9">
                        <p><span class="strong">{{ objjobposting.projectno }}</span></p>
                     </div>
                     <div class="input-field col s3">
                        <label>Project Name :</label>
                     </div>
                     <div class="input-field col s9">
                        <p><span class="strong">{{ objjobposting.projectname }}</span></p>
                     </div>
                     <div class="input-field col s3">
                        <label>Client :</label>
                     </div>
                     <div class="input-field col s9">
                        <p><span class="strong">{{ objjobposting.organization }}</span></p>
                     </div>
                  </div>
                  <div class="row" >
                     <div class="input-field col s12">
                        <table>
                           <tr>
                              <th>Postings</th>
                              <th>Vacancy</th>
                              <th>Comments</th>
                              <th>Inplace of</th>
                           </tr>
                           <tr ng-repeat="l in jobmasteragreement" >
                              <td><input ng-model="l.jobpostingdetailid" type="hidden"> {{l.name}}</td>
                              <td><input ng-model="l.numberofvacancies" id="{{l.jobmasterid}}" max="{{l.maxvalue}}" min="0" value="{{l.numberofvacancies | number}}" class="validate" type="number" pattern="[0-9]*"   ng-required="true" min="0"> </td>
                              <td><input ng-model="l.comments" id="{{l.jobmasterid}}" value="{{l.comments}}" class="validate" type="text"> </td>
                              <td><input ng-model="l.inplace" id="{{l.jobmasterid}}" value="{{l.inplace}}" class="validate" type="text"> </td>
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
<div class="col s12 m3 l2">
   <div class="row">
      <div class="card">
         <ul class="collection with-header">
            <li class="collection-header">
               <h5>Filter</h5>
            </li>
            <li>
               <div class="col s12">
                  <p class="input-field">
                     <input id="search"  type="text" class="validate valid" ng-model="search">
                     <label for="search">Search Client</label>
                  </p>
               </div>
            </li>
            <li class="collection-header">
               <strong>Region</strong>
               <div class="input-field">
                  <input id="searchregion"  type="text" class="validate valid" ng-model="searchregion">
                  <label for="searchregion">
                  Search Region</label>
               </div>
            </li>
            <li class="collection-item " ng-repeat="region in regions | filter:searchregion | orderBy:'description'">
               <input type="checkbox" id="{{region.lkvalid}}" ng-click="includeRegion(region.lkvalid)"/>
               <label for="{{region.lkvalid}}">{{region.description}}</label>
            </li>
         </ul>
      </div>
   </div>
</div>
<div class="col s12 m9 l10">
   <div class="input-field col s6 l4 right">
      <p>
         <button class="btn waves-effect waves-light  cyan darken-2" type="submit" ng-click="exportvacancy()" ng-disabled="jobpostings.length==0 || moveDisableButton">Export Vacancy
         </button>
      </p>
   </div>
</div>
<div class="col s12 m9 l10">
   <br><br>
   <table class="responsive-table highlight design"> 
      <thead>
         <tr> 
            <th>PROJ NO</th> 
            <th>PROJECT</th>
            <th>DISTRICT</th>
            <th>REGION</th>  
            <th ng-repeat="job in jobpostings[0].jobsCF"> 
               {{job.code}}
            </th> 
            <th>COMMENTS</th> 
            <th>INPLACE OF</th>
            <th>EDIT</th>
            <th>DELETE</th>
         </tr>
      </thead>
      <tbody ng-repeat="project in jobpostings | filter:regionFilter | filter : search ">
         <tr>
            <td filter="{projectno: 'text'}">{{project.projectno}}</td>
            <td filter="{projectname: 'text'}" > {{project.projectname}}</td>
            <td filter="{district: 'text'}" >{{project.district}}</td>
            <td filter="{region: 'text'}" >{{project.region}}</td>   
            <td ng-repeat="job in project.jobsCF">
               {{job.numberofvacancies}}
            </td>  
            <td>
               <span ng-repeat="job in project.jobs"> 
                  <p ng-show="job.comments"> {{job.comments}}({{job.code}})</p>
               </span>
            </td> 
            <td>
               <span ng-repeat="job in project.jobs"> 
                  <p ng-show="job.inplace"> {{job.inplace}}({{job.code}})</p>
               </span>
            </td>
            <td>
               <a id="editjobposting" ng-click="editjobposting(project)"><span><i class="small icon darken-1 mdi mdi-account-edit"></i></span></a>
            </td>
            <td>
               <a ng-click="removejobposting(project.projectid)"><span><i class="small icon mdi mdi-delete"></i></span></a>
            </td>
         </tr>
      </tbody>
   </table>
</div>
<div class="row">
   <div id="failure" class="red-text"></div>
   <div class="input-field col s6 l4 right">
      <p>
         <button class="btn waves-effect waves-light  cyan darken-2" type="submit" ng-click="movevacancy()" ng-disabled="jobpostings.length==0 || moveDisableButton">Move Vacancy
         </button>
      </p>
   </div>
   <div class="input-field col s6 l4 right" layout-align="end center">
      <p>
         <button class="btn waves-effect waves-light red darken-2" type="submit" ng-click="deletevacancy()" ng-disabled="jobpostings.length==0">Delete Vacancy
         </button>
      </p>
   </div>
</div>
<script>
   $('.stdatepicker').pickadate({
     labelMonthNext: 'Go to the next month',
     labelMonthPrev: 'Go to the previous month',
     labelMonthSelect: 'Pick a month from the dropdown',
     labelYearSelect: 'Pick a year from the dropdown',
     selectMonths: true,
     selectYears: true,
     min: new Date(),
     autoClose:true
   })
</script>
<style>
   .ng-table-pager {
      display: none;
   }
   .design {
      display: block;
      height: 500px;
      overflow-y: scroll;
      overflow-x: scroll;
   }
   table, td {
      border: 2px solid #d0cdcd;
      border-collapse: collapse;
      width: 100%;
   }
   .headtop {
      background-color: #2695F3;
      color: #fff;
      font-weight: 500;
      text-align: center;
      font-size: 21px;
   }
   .headtop a {
      color: gold;
      font-weight: bold;
      text-align: center;
      font-size: 18px;
   } 
   table {
      empty-cells: hide !important;
   }
</style>