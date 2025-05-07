<script type="text/javascript" src="<?php echo base_url("assets/js/app/newvacancy.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ui-bootstrap-tpls-0.11.0.js")?>"></script>
<link rel="stylesheet" type="text/css" href="<?php echo base_url("assets/css/ng-table.min.css")?>" />
   <script type="text/javascript" src="<?php echo base_url("assets/js/lib/ng-table.min.js")?>"></script>
<script type="text/javascript">
   var selregionid =  0;
</script>
<div ng-app="appnewVacancy"  ng-controller="ctrlnewVacancylist">
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
               <div class=""><a href="<?php echo base_url()?>" class="breadcrumb">Home</a> <span class="breadcrumb">Vacancy</span> </div>
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
   </div>
   <div class="row">
      <div >
         <div class="row">
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
            
               <div class="row" style="background-color:#f5f5f5;">
               <!-- <div class="col s6 m8 l9">
                     <h5>Total {{dgrcount}} found</h5>
                  </div>  -->
                     <div class="col s12 center-align blue-text">
            <h5>Weekly vacancy of DGR wage rate Project Status</h5>
            <!-- <p class="grey-text"> Last update on {{posteddate}}</p> -->
         </div>
               </div> 
                  <div id="dgr" class="row">
                 <table ng-table="tableParams" class="responsive-table highlight design">
            <tbody ng-repeat="v in dgrvacancy.slice() | filter : search |  filter:regionFilterclient">
               <tr ng-repeat="project in v.projects | filter:regionFilter">
                 <td  data-title="'PROJ NO'" filter="{projectno: 'text'}" >{{project.projectno}}</td>
                            <td  data-title="'PROJECT'" filter="{projectname: 'text'}" > 
                           <span ng-hide="project.designation == '' || project.designation == null"> {{project.designation}},</span>
                           <span ng-hide="project.projectname == '' || project.projectname == null"> {{project.projectname}}</span>
                           <span ng-hide="project.proadd1 == '' || project.proadd1 == null">, {{project.proadd1}} </span>
                           <span ng-hide="project.proadd2 == '' || project.proadd2 == null">, {{project.proadd2}} </span>
                           <span ng-hide="project.proadd3 == '' || project.proadd3 == null"> , {{project.proadd3}} </span>
                           <span ng-hide="project.pincode == '' || project.pincode == null"> - {{project.pincode}} </span></td>
                           <td data-title="'DISTRICT'" filter="{district: 'text'}" >{{project.district}}</td>
                           <td data-title="'REGION'" filter="{region: 'text'}" >{{project.region}}</td>
                           <td  data-title="'SG'" filter="{SG: 'text'}" >
                              <span ng-repeat="job in filtered = (project.jobs | filter:{'code': 'SG'}:true)">
                             {{ job.numberofvacancies }}
                              </span>
                              <span ng-show="!filtered.length">0</span>
                           </td>
                           <td data-title="'HSG'" filter="{HSG: 'text'}" >
                              <span ng-repeat="job in filtered = (project.jobs | filter:{'code': 'HSG'}:true)">
                             {{ job.numberofvacancies }}
                              </span>
                              <span ng-show="!filtered.length">0</span>
                           </td>
                           <td data-title="'DVR'" filter="{DVR: 'text'}" >
                              <span ng-repeat="job in filtered = (project.jobs | filter:{'code': 'DVR'}:true)">
                              {{ job.numberofvacancies }}
                              </span>
                              <span ng-show="!filtered.length">0</span>
                           </td>
                           <td data-title="'ASO'" filter="{ASO: 'text'}" >
                              <span ng-repeat="job in filtered = (project.jobs | filter:{'code': 'ASO'}:true)">
                             {{ job.numberofvacancies }}
                              </span>
                              <span ng-show="!filtered.length">0</span>
                           </td>
                           <td data-title="'PO'" filter="{PO: 'text'}" >
                              <span ng-repeat="job in filtered = (project.jobs | filter:{'code': 'PO'}:true)">
                              {{ job.numberofvacancies }}
                              </span>
                              <span ng-show="!filtered.length">0</span>
                           </td>
                           <td data-title="'JA'" filter="{JA: 'text'}" >
                              <span ng-repeat="job in filtered = (project.jobs | filter:{'code': 'JA'}:true)">
                             {{ job.numberofvacancies }}
                              </span>
                              <span ng-show="!filtered.length">0</span>
                           </td>
                           <td data-title="'OA'" filter="{OA: 'text'}" >
                              <span ng-repeat="job in filtered = (project.jobs | filter:{'code': 'OA'}:true)">
                              {{ job.numberofvacancies }}
                              </span>
                              <span ng-show="!filtered.length">0</span>
                           </td>
                           <td data-title="'GUN'" filter="{GUN: 'text'}" >
                              <span ng-repeat="job in filtered = (project.jobs | filter:{'code': 'GUN'}:true)">
                              {{ job.numberofvacancies }}
                              </span>
                              <span ng-show="!filtered.length">0</span>
                           </td>
                           <td data-title="'OTHER'" filter="{OTHER: 'text'}" >
                              <span ng-repeat="job in filtered = (project.jobs | filter:{'code': 'OTHER'}:true)">
                              {{ job.numberofvacancies }}
                              </span>
                              <span ng-show="!filtered.length">0</span>
                           </td>
                        <td  data-title="'COMMENTS'" filter="{comments: 'text'}">
                           <span ng-repeat="job in filtered = (project.jobs | filter:{'code': 'SG'}:true)">
                            <p ng-show="job.comments != null"> {{job.comments}}(SG)</p></span>
                            <span ng-repeat="job in filtered = (project.jobs | filter:{'code': 'HSG'}:true)">
                            <p ng-show="job.comments != null"> {{job.comments}}(HSG)</p></span>
                            <span ng-repeat="job in filtered = (project.jobs | filter:{'code': 'DVR'}:true)">
                            <p ng-show="job.comments != null"> {{job.comments}}(DVR)</p></span>
                            <span ng-repeat="job in filtered = (project.jobs | filter:{'code': 'ASO'}:true)">
                            <p ng-show="job.comments != null"> {{job.comments}}(ASO)</p></span>
                             <span ng-repeat="job in filtered = (project.jobs | filter:{'code': 'PO'}:true)">
                            <p ng-show="job.comments != null"> {{job.comments}}(PO)</p></span>
                             <span ng-repeat="job in filtered = (project.jobs | filter:{'code': 'OA'}:true)">
                             <p ng-show="job.comments != null"> {{job.comments}}(OA)</p></span>
                             <span ng-repeat="job in filtered = (project.jobs | filter:{'code': 'GUN'}:true)">
                             <p ng-show="job.comments != null"> {{job.comments}}(GUN)</p></span>
                              <span ng-repeat="job in filtered = (project.jobs | filter:{'code': 'OTHER'}:true)">
                              <p ng-show="job.comments != null"> {{job.comments}}(OTHER)</p></span>
                              </td>
               </tr>
            </tbody>
         
         </table>
                  
               </div>

               <div id="tn" class="row">
               <div class="row" style="background-color:#f5f5f5;">
                  <!--  <div class="col s6 m8 l9">
                     <h5>Total {{tncount}} found</h5>
                  </div>  -->
                  <div class="col s12 center-align blue-text">
         <h5>Weekly vacancy of TN wage rate Project Status</h5>
        <!--  <p class="grey-text"> Last update on 03 Apr 2016</p> -->
      </div>
               </div>
                 <table ng-table="tableParams" class="responsive-table highlight design">
            <tbody ng-repeat="v in tnvacancy.slice() | filter : search |  filter:regionFilterclient">
               <tr ng-repeat="project in v.projects | filter:regionFilter">
                 <td  data-title="'PROJ NO'" filter="{projectno: 'text'}" >{{project.projectno}}</td>
                           <td  data-title="'PROJECT'" filter="{projectname: 'text'}" > 
                           <span ng-hide="project.designation == '' || project.designation == null"> {{project.designation}},</span>
                           <span ng-hide="project.projectname == '' || project.projectname == null"> {{project.projectname}}</span>
                           <span ng-hide="project.proadd1 == '' || project.proadd1 == null">, {{project.proadd1}} </span>
                           <span ng-hide="project.proadd2 == '' || project.proadd2 == null">, {{project.proadd2}} </span>
                           <span ng-hide="project.proadd3 == '' || project.proadd3 == null"> , {{project.proadd3}} </span>
                           <span ng-hide="project.pincode == '' || project.pincode == null"> - {{project.pincode}} </span></td>
                           <td data-title="'DISTRICT'" filter="{district: 'text'}">{{project.district}}</td>
                           <td data-title="'REGION'" filter="{region: 'text'}" >{{project.region}}</td>
                           <td  data-title="'SG'" filter="{SG: 'text'}" >
                              <span ng-repeat="job in filtered = (project.jobs | filter:{'code': 'SG'}:true)">
                              {{ job.numberofvacancies }}
                              </span>
                              <span ng-show="!filtered.length">0</span>
                           </td>
                           <td data-title="'HSG'" filter="{HSG: 'text'}" >
                              <span ng-repeat="job in filtered = (project.jobs | filter:{'code': 'HSG'}:true)">
                              {{ job.numberofvacancies }}
                              </span>
                              <span ng-show="!filtered.length">0</span>
                           </td>
                           <td data-title="'DVR'" filter="{DVR: 'text'}" >
                              <span ng-repeat="job in filtered = (project.jobs | filter:{'code': 'DVR'}:true)">
                              <a  href="{{ job.numberofvacancies }}</a>
                              </span>
                              <span ng-show="!filtered.length">0</span>
                           </td>
                           <td data-title="'ASO'" filter="{ASO: 'text'}" >
                              <span ng-repeat="job in filtered = (project.jobs | filter:{'code': 'ASO'}:true)">
                              {{ job.numberofvacancies }}
                              </span>
                              <span ng-show="!filtered.length">0</span>
                           </td>
                           <td data-title="'PO'" filter="{PO: 'text'}" >
                              <span ng-repeat="job in filtered = (project.jobs | filter:{'code': 'PO'}:true)">
                              {{ job.numberofvacancies }}
                              </span>
                              <span ng-show="!filtered.length">0</span>
                           </td>
                           <td data-title="'JA'" filter="{JA: 'text'}" >
                              <span ng-repeat="job in filtered = (project.jobs | filter:{'code': 'JA'}:true)">
                              {{ job.numberofvacancies }}
                              </span>
                              <span ng-show="!filtered.length">0</span>
                           </td>
                           <td data-title="'OA'" filter="{OA: 'text'}" >
                              <span ng-repeat="job in filtered = (project.jobs | filter:{'code': 'OA'}:true)">
                              {{ job.numberofvacancies }}
                              </span>
                              <span ng-show="!filtered.length">0</span>
                           </td>
                           <td data-title="'GUN'" filter="{GUN: 'text'}">
                              <span ng-repeat="job in filtered = (project.jobs | filter:{'code': 'GUN'}:true)">
                              {{ job.numberofvacancies }}
                              </span>
                              <span ng-show="!filtered.length">0</span>
                           </td>
                           <td data-title="'OTHER'" filter="{OTHER: 'text'}" >
                              <span ng-repeat="job in filtered = (project.jobs | filter:{'code': 'OTHER'}:true)">
                              {{ job.numberofvacancies }}
                              </span>
                              <span ng-show="!filtered.length">0</span>
                           </td>
                        <td  data-title="'COMMENTS'" filter="{comments: 'text'}">
                           <span ng-repeat="job in filtered = (project.jobs | filter:{'code': 'SG'}:true)">
                            <p ng-show="job.comments != null"> {{job.comments}}(SG)</p></span>
                            <span ng-repeat="job in filtered = (project.jobs | filter:{'code': 'HSG'}:true)">
                            <p ng-show="job.comments != null"> {{job.comments}}(HSG)</p></span>
                            <span ng-repeat="job in filtered = (project.jobs | filter:{'code': 'DVR'}:true)">
                            <p ng-show="job.comments != null"> {{job.comments}}(DVR)</p></span>
                            <span ng-repeat="job in filtered = (project.jobs | filter:{'code': 'ASO'}:true)">
                            <p ng-show="job.comments != null"> {{job.comments}}(ASO)</p></span>
                             <span ng-repeat="job in filtered = (project.jobs | filter:{'code': 'PO'}:true)">
                            <p ng-show="job.comments != null"> {{job.comments}}(PO)</p></span>
                             <span ng-repeat="job in filtered = (project.jobs | filter:{'code': 'OA'}:true)">
                             <p ng-show="job.comments != null"> {{job.comments}}(OA)</p></span>
                             <span ng-repeat="job in filtered = (project.jobs | filter:{'code': 'GUN'}:true)">
                             <p ng-show="job.comments != null"> {{job.comments}}(GUN)</p></span>
                              <span ng-repeat="job in filtered = (project.jobs | filter:{'code': 'OTHER'}:true)">
                              <p ng-show="job.comments != null"> {{job.comments}}(OTHER)</p></span>
                              </td>
               </tr>
            </tbody>
         </table>
                 
               </div>
            </div>
         </div>
      </div>
   </div>
</div>

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
   table, td  {
   border: 2px solid #d0cdcd;
   border-collapse: collapse;
   }
   
</style>