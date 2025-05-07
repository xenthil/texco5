<script type="text/javascript" src="<?php echo base_url("assets/js/app/jobposting.js")?>"></script>
<script type="text/javascript">
    var clientid = <?php echo $clientid;?>;
</script>

<div class="parallax-container" style="background-color: rgba(0, 12, 78, 0.9)">
    <div class="row">
        <div class="container">
            <div class="col s12 m6 l6">
                <div class="pagebannertext white-text">Job Posting</div>
             </div>
            <div class="col s12 m6 l6 right-align">
                <div class="dumheight hide-on-small-only"> </div>
                <div class=""> <a href="<?php echo base_url('admin/dashboard')?>" class="breadcrumb">Home</a> <span class="breadcrumb">Job Posting</span> </div>
            </div>
        </div>
    </div>
    <div class="parallax"><img src="<?php echo base_url("assets/images/breadcrumbbanner.jpg ")?>">
    </div>
</div>

<div class="row" ng-app="appJobposting">
    <div class="container" ng-controller="ctrlJobposting">
        <!-- Modal Window for new and Edit -->
        <div class="fixed-action-btn" style="bottom: 50px; right: 19px;">
            <a class="btn-floating btn-large red modal-trigger" ng-click='addjobposting()'>
                <i class="mdi mdi-account-plus"></i>
            </a>
        </div>

     <div id="modal2" class="modal modal-fixed-footer" style="max-height:90%;">
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
                                        </tr>
                                        <tr ng-repeat="l in jobmasteragreement" >
                                            <td><input ng-model="l.jobpostingdetailid" type="hidden"> {{l.name}}</td>
                                            <td><input ng-model="l.numberofvacancies" id="{{l.jobmasterid}}" max="{{l.maxvalue}}" min="0" value="{{l.numberofvacancies | number}}" class="validate" type="number" pattern="[0-9]*"   ng-required="true" min="0"> </td>
                                            <td><input ng-model="l.comments" id="{{l.jobmasterid}}" value="{{l.comments}}" class="validate" type="text"> </td>
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
                             <div class="input-field col s6">
                                <select id="projectno" name="projectno" class="validate" ng-class="{'submitted': submitted && jobpostingform.client.$invalid}" ng-model="objjobposting.projectid"
                                data-ng-options=" p.projectid as p.projectno for p in projectnos"
                                ng-change="fillclientproject(objjobposting.projectid)" >
                                </select><label for="client">Project No</label>
                            </div>
                            <div class="input-field col s6">
                               <select id="client" name="client" class="validate"  ng-required="true"  ng-class="{'submitted': submitted && jobpostingform.client.$invalid}" ng-model="objjobposting.clientid" data-ng-options=" c.clientid as c.organization for c in clients" ng-change="selectProject(objjobposting.clientid)">
                               </select><label for="client">Client</label>
                           </div>
                        </div>
                        <div class="row" id="divProjAdd">
                            <div class="input-field col s6">
                                <select id="project" name="project" class="validate"  ng-required="true"  ng-class="{'submitted': submitted && jobpostingform.project.$invalid}"  ng-model="objjobposting.projectid" ng-change="agreementproject(objjobposting.projectid)" data-ng-options=" p.projectid as p.name + ' (' + p.projectno + ')'  for p in selectedprojects">
                                </select><label for="project">Project</label>
                            </div>
                            <div class="input-field col s6">
                              <input id="startdate" type="date" class="stdatepicker" type="text" data-ng-model="objjobposting.startdate" >
                                <label for="startdate" id="stdate">Start Date </label>
                            </div>
                        </div>

                        <div class="row" id="divProjView">
                             <div class="input-field col s6">
                                <input id="clientdesc" readonly  ng-model="objjobposting.organization" >
                                </input><label for="clientdesc">Client</label>
                            </div>
                            <div class="input-field col s6">
                                <input id="projectname" readonly class="validate"  ng-model="objjobposting.projectname" >
                                </input><label for="projectname">Project</label>
                            </div>
                        </div>
                        <div class="row" >
                            <div class="input-field col s12">
                                    <table>
                                        <tr>
                                            <th>Postings</th>
                                            <th>Vacancy</th>
                                            <th>Comments</th>
                                        </tr>
                                        <tr ng-repeat="l in jobmasteragreement" >
                                            <td><input ng-model="l.jobpostingdetailid" type="hidden"> {{l.name}}</td>
                                            <td><input ng-model="l.numberofvacancies" id="{{l.jobmasterid}}" max="{{l.maxvalue}}" min="0" value="{{l.numberofvacancies | number}}" class="validate" type="number" pattern="[0-9]*"   ng-required="true" min="0"> </td>
                                            <td><input ng-model="l.comments" id="{{l.jobmasterid}}" value="{{l.comments}}" class="validate" type="text"> </td>
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
          <div class="li white-text" id="mcaption">Edit Job Posting</div>
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
                            <div class="input-field col s6">
                              <input id="startdate" type="date" class="stdatepicker" type="text" ng-class="{'submitted': submitted && agreementform.startdate.$invalid}" data-ng-model="objjobposting.startdate" ng-required="true">
                                <label for="startdate">Start Date </label>
                            </div>
                        </div>
                        <div class="row" >
                            <div class="input-field col s12">
                                    <table>
                                        <tr>
                                            <th>Postings</th>
                                            <th>Vacancy</th>
                                            <th>Comments</th>
                                        </tr>
                                        <tr ng-repeat="l in jobmasteragreement" >
                                            <td><input ng-model="l.jobpostingdetailid" type="hidden"> {{l.name}}</td>
                                            <td><input ng-model="l.numberofvacancies" id="{{l.jobmasterid}}" max="{{l.maxvalue}}" min="0" value="{{l.numberofvacancies | number}}" class="validate" type="number" pattern="[0-9]*"   ng-required="true" min="0"> </td>
                                            <td><input ng-model="l.comments" id="{{l.jobmasterid}}" value="{{l.comments}}" class="validate" type="text"> </td>
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
              <div class= "scroll">
              <li class="collection-item avatar waves-effect waves-teal col s12" ng-class="{selected: jobposting.jobpostingid === selected.jobpostingid}" ng-repeat="jobposting in jobpostings | filter: filter">
                 <a href="javascript::void(0)" ng-click="select(jobposting)">
                  <div style="margin-top: 10px;"><span class="circle light-blue" style="padding: 10px;">{{jobposting.organization.slice(0,1)}}</span> <span class="email-title">{{jobposting.projectname}} - {{jobposting.projectno}}</span>
                  <p class="truncate grey-text ultra-small">{{jobposting.organization}}</p>
                  </div>
                  </a>
              </li>
              <div>
          </ul>
      </div>

      <div id="Client-details" class="col s10 m8 l8 card-panel z-depth-1">
          <div class="email-content-wrap">
              <div class="row z-depth-1" style="background-color: #eee;">
                  <div class="col s12 m10 l10">
                      <ul class="collection">
                          <li class="collection-item avatar" style="background-color:transparent">
                              <img src="<?php echo base_url("assets/images/clients/{{selected.image}}")?>" alt="" class="circle">
                              <span class="email-title">{{selected.projectname}} - {{selected.projectno}}</span>
                              <p class="truncate grey-text ultra-small">{{selected.organization}}</p>
                          </li>
                      </ul>
                  </div>
                  <div class="col s2 m2 l2 right-align  resultframe">
                  <!-- {{objjobposting}} -->
                      <a id="editjobposting" ng-click='editjobposting(objjobposting.jobpostingid)'><span><i class="small icon darken-1 mdi mdi-account-edit"></i></span></a>
                      <a id="addingjobposting" ng-click='addingjobposting(objjobposting.projectid)'><span><i class="small icon darken-1 mdi mdi-account-plus"></i></span></a>
                   <!-- <?php if($roledata['permissions']['DJOBPOST']==1) {?> -->
                      <a ng-click='removejobposting()'><span><i class="small icon mdi mdi-delete"></i></span></a>
                     <!--  <?php } ?> -->

                  </div>
              </div>

              <div class="row">
                  <div class="col s12">
                      <table>
                          <tr>
                              <th>Postings</th>
                              <th>No Of Vacancy</th>
                              <th>Applied Vacancy</th>
                              <th>Waiting Vacancy</th>
                              <th>Comments</th>
                          </tr>
                          <tr ng-repeat="l in selected.jobs" >
                              <td>{{l.name}} - {{l.code}}</td>
                              <td>{{l.numberofvacancies}}</td>
                              <td>{{l.filledvacancies}}</td>
                              <td>{{l.waitingvacancies}}</td>
                              <td>{{l.comments}}</td>
                          </tr>
                      </table>
                  </div>
              </div>

              <div class="row">
                <div class="col s12 m6 l6">
                  <p class="blue-grey-text"><strong>Client</strong> </p>
                   <p>{{selected.organization}}</p>
                </div>

                  <div class="col  s12 m6 l6">
                 <p class="blue-grey-text"><strong>Project</strong> </p>
                   <p>{{selected.projectname}}</p>
                </div>
              </div>

              <div class="row">
                <div class="col s12 m6 l6">
                  <p class="blue-grey-text"><strong>Project No</strong> </p>
                   <p>{{selected.projectno}}</p>
                </div>

                  <div class="col  s12 m6 l6">
                 <p class="blue-grey-text"><strong>District - Region</strong> </p>
                   <p>{{selected.district}} - {{selected.region}}</p>
                </div>
              </div>
            </div>
          </div>
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