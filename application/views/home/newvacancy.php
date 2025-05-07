<script type="text/javascript" src="<?php echo base_url("assets/js/app/newvacancy.js?v=1.0")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ui-bootstrap-tpls-0.11.0.js")?>"></script>
<link rel="stylesheet" type="text/css" href="<?php echo base_url("assets/css/ng-table.min.css")?>" />
   <script type="text/javascript" src="<?php echo base_url("assets/js/lib/ng-table.min.js")?>"></script>
<script type="text/javascript">
   var selregionid =  0;
</script>

<?php  
   $passservice = '';
   if(isset($_GET['serviceno']))
   {
      $serviceno = $_GET['serviceno'];

      if ($serviceno != '' ) {
          $passservice = '&serviceno=' . $serviceno;
      }
   }
?>

<div ng-app="appnewVacancy"  ng-controller="ctrlnewVacancylist">
   
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
   <div class="row">
      <div class="col s12 center-align blue-text">
         <div class="headtop"><marquee behavior="scroll" scrollamount="5" direction="left">Check rules for applying job <a href="<?php echo base_url('/assets/document/rules.pdf')?>" target="_blank">Click Here to View</a></marquee></div>
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
                  <div class="col s12 center-align blue-text">
                     <h5>Weekly vacancy of DGR wage rate Project Status</h5>
                  </div>
               </div> 
               <div id="dgr" class="row">
                 <table class="responsive-table highlight design"> 
                     <thead>
                        <tr> 
                           <th>PROJ NO</th> 
                           <th>PROJECT</th>
                           <th>DISTRICT</th>
                           <th>REGION</th>  
                           <th ng-repeat="job in dgrvacancy[0].jobs"> {{job.code}}</th> 
                           <th>COMMENTS</th> 
                        </tr>
                     </thead>
                     <tbody> 
                        <tr ng-repeat="project in dgrvacancy.slice() | filter : search |  filter:regionFilter">
                           <td  data-title="'PROJ NO'" filter="{projectno: 'text'}" > 
                              {{project.projectno}}
                           </td>
                           <td  data-title="'PROJECT'" filter="{projectname: 'text'}" >
                              <span ng-hide="project.designation == '' || project.designation == null"> {{project.designation}},</span>
                              <span ng-hide="project.projectname == '' || project.projectname == null"> {{project.projectname}}</span>
                              <span ng-hide="project.proadd1 == '' || project.proadd1 == null">, {{project.proadd1}} </span>
                              <span ng-hide="project.proadd2 == '' || project.proadd2 == null">, {{project.proadd2}} </span>
                              <span ng-hide="project.proadd3 == '' || project.proadd3 == null"> , {{project.proadd3}} </span>
                              <span ng-hide="project.pincode == '' || project.pincode == null"> - {{project.pincode}} </span>
                           </td>
                           <td data-title="'DISTRICT'" filter="{district: 'text'}" > 
                              {{project.district}} 
                           </td>
                           <td data-title="'REGION'" filter="{region: 'text'}" > 
                              {{project.region}}
                           </td>  
                           <td ng-repeat="job in project.jobs"> 
                              <span ng-if="job.numberofvacancies">
                              <a  href="<?php echo base_url('apply?id={{job.jobpostingdetailid}}')?>" >{{ job.numberofvacancies }}</a>
                              </span> 
                              <span ng-if="job.numberofvacancies == 0"> {{ job.numberofvacancies }} </span>
                           </td>     
                           <td>
                              <span ng-repeat="job in project.jobs"> 
                                 <p ng-show="job.comments"> {{job.comments}}({{job.code}})</p>
                              </span>
                           </td> 
                        </tr>
                     </tbody>
                  </table>  
               </div>
               <div id="tn" class="row">
                  <div class="row" style="background-color:#f5f5f5;">
                     <div class="col s12 center-align blue-text">
                        <h5>Weekly vacancy of TN wage rate Project Status</h5>
                     </div>
                  </div>
                  <table class="responsive-table highlight design">
                     <thead>
                        <tr> 
                           <th>PROJ NO</th> 
                           <th>PROJECT</th>
                           <th>DISTRICT</th>
                           <th>REGION</th>  
                           <th ng-repeat="job in tnvacancy[0].jobs"> {{job.code}}</th> 
                           <th>COMMENTS</th> 
                        </tr>
                     </thead>
                     <tbody> 
                     <!-- ng-repeat="v in tnvacancy.slice() | filter : search |  filter:regionFilterclient" -->
                        <tr ng-repeat="project in tnvacancy.slice() | filter : search | filter:regionFilter">
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
                           <td ng-repeat="job in project.jobs"> 
                              <span ng-if="job.numberofvacancies">
                              <a  href="<?php echo base_url('apply?id={{job.jobpostingdetailid}}')?>" >{{ job.numberofvacancies }}</a>
                              </span> 
                              <span ng-if="job.numberofvacancies == 0"> <a  href="<?php echo base_url('apply?id={{job.jobpostingdetailid}}')?>" >{{ job.numberofvacancies }}</a></span>
                           </td>    
                           <td>
                              <span ng-repeat="job in project.jobs"> 
                                 <p ng-show="job.comments"> {{job.comments}}({{job.code}})</p>
                              </span>
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

      </style>