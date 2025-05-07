<script type="text/javascript" src="<?php echo base_url("assets/js/app/vacancy.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ui-bootstrap-tpls-0.11.0.js")?>"></script>
<script>
   var selregionid = <?php echo $regionid;
      ?>;
</script>
<div ng-app="appVacancy"  ng-controller="ctrlVacancylist">
<link rel="stylesheet" type="text/css" href="<?php echo base_url("assets/css/ng-table.min.css")?>" />
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ng-table.min.js")?>"></script>
<div class="parallax-container" style="background-color: rgba(0, 12, 78, 0.9)">
   <div class="row">
      <div class="container">
         <div class="col s12 m6 l6">
            <div class="pagebannertext white-text">Recent Vacancies </div>
         </div>
         <div class="col s12 m6 l6 right-align">
            <div class="dumheight hide-on-small-only"></div>
            <div class=""><a href="<?php echo base_url('member/dashboard')?>" class="breadcrumb">Home</a> <span class="breadcrumb">Vacancy</span> </div>
         </div>
      </div>
   </div>
   <div class="parallax"> 
      <img src="<?php echo base_url("assets/images/breadcrumbbanner.jpg")?>">
   </div>
</div>
<div class="row">&nbsp;</div>
<div class="row">
   <div class="col s12 center-align blue-text">
      <h5>{{settings[0].value}}</h5>
   </div>
   <div class="col s12 center-align blue-text">
      <h5>Weekly vacancy of TN wage rate Project Status</h5>
      <p class="grey-text"> Last update on 03 Apr 2016</p>
   </div>
</div>
<div class="row">
   <div class="container">
      <div class="row">
         <div class="col s12 m4 l3">
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
                              Search Region</la
                                 >
                        </div>
                     </li>
                     <li class="collection-item " ng-repeat="region in regions | filter:searchregion | orderBy:'description'">
                     <input type="checkbox" id={{region.lkvalid}} ng-checked="selregionid==region.lkvalid" ng-click="includeRegion(region.lkvalid)"/>
                     <label for="{{region.lkvalid}}">{{region.description}}</label>
                     </li>
                  </ul>
               </div>
            </div>
         </div>
         <div class="col s12 m8 l9">
            <div class="row" style="background-color:#f5f5f5;">
               <div class="col s6 m8 l9">
                  <h5>Total {{count2}} found</h5>
               </div>
            </div>
            <div class="row" ng-repeat="v in tnvacancy.slice(((currentPage-1)*itemsPerPage), ((currentPage)*itemsPerPage)) | filter : search |  filter:regionFilterclient">
               <div class="col s12 m12 l12">
                  <div class="" style="background-color: whitesmoke;">
                     <!--<ul class="collection bottomborder">
                        <li class="collection-item avatar">
                           <img src="<?php //echo base_url("assets/images/clients/{{v.image}}")?>" alt="" class="circle">
                           <p class="title">{{v.organization}}</p>
                           <p class="childtitle">{{v.addressline1}}</p>
                        </li>
                        </ul>-->
                     <div class="row"  ng-repeat="project in v.projects | filter:regionFilter">
                        <div class="container" style="width:99%">
                           <div class="col s12 m12 l12">
                              <div class="card-panel white">
                                 <div class="row">
                                    <div class="col s12 m4 l4">
                                       <!-- <p class="title">{{project.projectname}} <br><span class="childtitle">{{project.projectno}} </span>
                                          <br><span class="childtitle">{{project.region}}</span>
                                          </p>-->
                                       <table>
                                          <tr>
                                             <td>{{project.projectno}}</td>
                                             <td>{{project.projectname}}</td>
                                             <td>{{project.district}}</td>
                                             <td>{{project.region}}</td>
                                          </tr>
                                       </table>
                                    </div>
                                    <div class="col s12 m8 l8">
                                       <div class="row">
                                          <table class="responsive-table centered">
                                             <thead>
                                                <tr  class="title">
                                                   <th>SG</th>
                                                   <th>OA</th>
                                                   <th>HSG</th>
                                                   <th>GUN</th>
                                                   <th>DVR</th>
                                                   <th>ASO</th>
                                                   <th>PO</th>
                                                   <th>JA</th>
                                                   <th>OTHER</th>
                                                </tr>
                                             </thead>
                                             <tbody>
                                                <tr class="childtitle">
                                                   <td >
                                                      <span ng-repeat="job in filtered = (project.jobs | filter:{'code': 'SG'}:true)">
                                                      <a href="<?php echo base_url('member/apply?id={{job.jobpostingdetailid}}')?>" >{{ job.numberofvacancies }}</a>
                                                      </span>
                                                      <span ng-show="!filtered.length">0</span>
                                                   </td>
                                                   <td >
                                                      <span ng-repeat="job in filtered = (project.jobs | filter:{'code': 'OA'}:true)">
                                                     {{ job.numberofvacancies }}
                                                      </span>
                                                      <span ng-show="!filtered.length">0</span>
                                                   </td>
                                                   <td>
                                                      <span ng-repeat="job in filtered = (project.jobs | filter:{'code': 'HSG'}:true)">
                                                      <a  href="<?php echo base_url('apply?id={{job.jobpostingdetailid}}')?>" >{{ job.numberofvacancies }}</a>
                                                      </span>
                                                      <span ng-show="!filtered.length">0</span>
                                                   </td>
                                                   <td >
                                                      <span ng-repeat="job in filtered = (project.jobs | filter:{'code': 'GUN'}:true)">
                                                     {{ job.numberofvacancies }}
                                                      </span>
                                                      <span ng-show="!filtered.length">0</span>
                                                   </td>
                                                   <td>
                                                      <span ng-repeat="job in filtered = (project.jobs | filter:{'code': 'DVR'}:true)">
                                                      <a  href="<?php echo base_url('member/apply?id={{job.jobpostingdetailid}}')?>" >{{ job.numberofvacancies }}</a>
                                                      </span>
                                                      <span ng-show="!filtered.length">0</span>
                                                   </td>
                                                   <td>
                                                      <span ng-repeat="job in filtered = (project.jobs | filter:{'code': 'ASO'}:true)">
                                                      <a href="<?php echo base_url('member/apply?id={{job.jobpostingdetailid}}')?>" >{{ job.numberofvacancies }}</a>
                                                      </span>
                                                      <span ng-show="!filtered.length">0</span>
                                                   </td>
                                                   <td>
                                                      <span ng-repeat="job in filtered = (project.jobs | filter:{'code': 'PO'}:true)">
                                                      <a href="<?php echo base_url('member/apply?id={{job.jobpostingdetailid}}')?>" >{{ job.numberofvacancies }}</a>
                                                      </span>
                                                      <span ng-show="!filtered.length">0</span>
                                                   </td>
                                                   <td>
                                                      <span ng-repeat="job in filtered = (project.jobs | filter:{'code': 'JA'}:true)">
                                                      <a href="<?php echo base_url('member/apply?id={{job.jobpostingdetailid}}')?>" >{{ job.numberofvacancies }}</a>
                                                      </span>
                                                      <span ng-show="!filtered.length">0</span>
                                                   </td>
                                                   <td>
                                                      <span ng-repeat="job in filtered = (project.jobs | filter:{'code': 'OTHER'}:true)">
                                                      <a href="<?php echo base_url('member/apply?id={{job.jobpostingdetailid}}')?>" >{{ job.numberofvacancies }}</a>
                                                      </span>
                                                      <span ng-show="!filtered.length">0</span>
                                                   </td>
                                                </tr>
                                             </tbody>
                                          </table>
                                       </div>
                                    </div>
                                 </div>
                                 <div class="row">
                                    <div class="col s12 m9 l9">
                                       <span ng-repeat="job in filtered = (project.jobs)">
                                       <span ng-if="job.comments"><strong >{{ job.code }}:</strong>  {{job.comments}} | </span>
                                       </span>
                                    </div>
                                    <div class="col s12 m3 l3 right-align">
                                       <!-- <a class="waves-effect waves-light blue btn">Apply</a> -->
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <ul class="pagination theme-pagi">
               <pagination total-items="totalItems" ng-model="currentPage" ng-change="pagelength()" class="pagination-sm" items-per-page="itemsPerPage"></pagination>
            </ul>
         </div>
      </div>
   </div>
</div>