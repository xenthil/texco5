<script type="text/javascript" src="<?php echo base_url("assets/js/app/newvacancymemberadmin.js") ?>"></script>

<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ng-file-upload.min.js") ?>"></script>

<link rel="stylesheet" type="text/css" href="
   <?php echo base_url("assets/css/ng-table.min.css")?>" />
<script type="text/javascript" src="
   <?php echo base_url("assets/js/lib/ng-table.min.js")?>"></script>
<script type="text/javascript" src="
   <?php echo base_url("assets/js/lib/ui-bootstrap-tpls-0.11.0.js")?>"></script>
<script src="<?php echo base_url("assets/js/lib/angular-bootstrap-datepicker.js")?>" charset="utf-8"></script>
<script src="<?php echo base_url("assets/js/lib/underscore.js")?>" charset="utf-8"></script>
<link href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery-ui.css" rel="Stylesheet"
    type="text/css" />
<link href="<?php echo base_url("assets/css/datepicker.css")?>" rel="Stylesheet" type="text/css" />

<script type="text/javascript">
var memberid = "<?php echo $this->session->userdata('memberid') ?>"
   var roleid = "<?php echo $this->session->userdata('roleid') ?>"
   var regionid = "<?php echo $this->session->userdata('regionid') ?>" 

</script>


<div class="parallax-container" style="background-color: rgba(0, 12, 78, 0.9)">
    <div class="row">
        <div class="container">
            <div class="col s12 m6 l6">
                <div class="pagebannertext white-text">Applied  Members</div>
            </div>
            <div class="col s12 m6 l6 right-align">
                <div class="dumheight hide-on-small-only"> </div>
                <div class=""> <a href="<?php echo base_url('member/dashboard') ?>" class="breadcrumb">Home</a> <span
                        class="breadcrumb">Applied List</span> </div>
            </div>
        </div>
    </div>
    <div class="parallax"><img src="<?php echo base_url("assets/images/breadcrumbbanner.jpg") ?>">
    </div>
</div>

<div class="row" ng-app="appAdminMember">
    <div class="container" ng-controller="ctrlAdminMember">



    <div class="input-field col m4 s4">
                           <input id="fromdate" type="date" class="datepicker" type="text" ng-model="fromdate"  placeholder="From Date">
                           <label for="fromdate" class="dp-click datepickercls"></label>


                          
                        </div>
                        <div class="input-field col m4 s4">
                        <input id="todate" type="date" class="datepicker" type="text" ng-model="todate" placeholder="To Date">
                           <label for="todate" class="dp-click datepickercls"></label>
                        </div>

                        <div class="input-field col m4 s4">
                        <a ng-click="getfulllistadmin(fromdate,todate)" class="btn cyan waves-effect waves-light" type="submit">Submit</a>
</div>
        <div id="" class="section">
            <div id="Client-details" class="col s12">

           
                <table ng-table="tableParams" class="responsive-table highlight striped" show-filter="true"
                    class="bordered">
                    <tbody ng-repeat="applied in $data">
                        <tr>
                        <td width="5%" data-title="'S .No'" sortable="'documentid'">{{applied.documentid}}</td>

                        <td width="8%" data-title="'Application Number'" filter="{applicationnumber: 'text'}"
                                sortable="'applicationnumber'">
                                <span ng-show="applied.applicationnumber != 0"> {{applied.applicationnumber}}</span>
                              
                              <span ng-show="applied.applicationnumber == 0">-</span></td>

                        <td width="8%" data-title="'serviceno'" filter="{serviceno: 'text'}"
                                sortable="'serviceno'">
                                {{applied.serviceno}}</td>
                            <td width="8%" data-title="'Name'" filter="{firstname: 'text'}"
                                sortable="'firstname'">
                                {{applied.firstname}}</td>
                                <td width="8%" data-title="'Moblie No'" filter="{mobile: 'text'}"
                                sortable="'mobile'">
                                {{applied.mobile}}</td>

                                <td width="8%" data-title="'Preference'" filter="{preference: 'text'}"
                                sortable="'preference'">
                                {{applied.preference}}</td>

                                <td width="8%" data-title="'Preferred Location'" filter="{district: 'text'}"
                                sortable="'district'">
                                {{applied.district}}</td>

                                <td width="8%" data-title="'Region'" filter="{region: 'text'}"
                                sortable="'district'">
                                {{applied.region}}</td>
                                
                                

                                <td width="8%" data-title="'Place of job Preferred any where in
TamilNadu'" filter="{anywhere: 'text'}"
                                sortable="'anywhere'">
                                {{applied.anywhere}}</td>

                                <td width="10%" data-title="'Uploaded Document'" filter="{documentpath: 'text'}"
                                sortable="'documentpath'">

                                <a target="_blank" download="" href="<?php echo base_url('assets/vacancy/members/{{applied.documentpath}}')?>">
                                    <!-- <i class="material-icons circle blue">folder_open</i> -->
                                    <span class="title">{{applied.documentpath}}</span>
                                </a>
                            
                            </td>


                            <td width="10%" data-title="'Applied Date & Time'" filter="{uploadedtime: 'text'}" sortable="'uploadedtime'">
                                {{applied.uploadedtime | date:'dd-MM-yyyy HH:mm:ss'}}</td>

                                <td width="10%"  ng-show="applied.jobstatus == 1">
                     <a class="btn-floating btn-small blue"  ng-click="amsconfirmwilling(applied)">
                     <i class="material-icons">done</i>
                     </a>
                     <a class="btn-floating btn-small blue"  ng-show="applied.totunwill < 2"  ng-click="amsunmwilling(applied)">
                     <i class="material-icons">not_interested</i>
                     </a>

                     <a class="btn-floating btn-small red"  ng-click="amsreject(applied)">
                     <i class="material-icons">delete</i>
                     </a>
                  </td>

                                <td width="5%"  ng-show="applied.jobstatus == 2">
                     <a class="btn-floating btn-small blue"  ng-click="confirmvacancy(applied)">
                     <i class="material-icons">done</i>
                     </a>


                  </td>

                  <td width="5%"  ng-show="applied.jobstatus == 1">
                    Waiting for AM 
                     </a>

                     
                  </td>

                <td width="5%"  ng-show="applied.jobstatus == 0">
                     <a target="blank" href="
                        <?php echo base_url('admin/printposting?jobactivityid={{applied.jobactivityid}}')?>" class="secondary-content">
                     <i class="material-icons">print</i>
                     </a>
                  </td> 
                   

                   

                          

                           

                           

                            <!-- <td width="1%">
                                <a target="blank=" ng-click="editDependent(applied)" class="secondary-content"><i
                                        class="material-icons">edit</i></a>
                            </td> -->

                          

                          
                           
                        </tr>
                    </tbody>
                </table>
                <!-- <ul class="pagination theme-pagi">
                    <pagination total-items="totalItems" ng-model="currentPage" ng-change="pagelength()" class="pagination-sm" items-per-page="itemsPerPage"></pagination>
            </ul> -->
                <!-- Pagination -->
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
               
                                
                                  <label for="projectid" >Project No</label>
                                    <select name="projectid" ng-model="memhistory.projectid"  ng-class="{'submitted': submitted && memhistory.projectid.$invalid}" data-ng-options="prr as prr.projectno for prr in projects" ng-change="getSelectedProjects(memhistory.projectid);">
                                    </select>
                              
               </div>
               <div class="col  s12 m3 l3">
             
                                    <label for="jobmasterid" > Category </label>
                                    <select name="jobmasterid" ng-model="memhistory.jobmasterid"  ng-class="{'submitted': submitted && memhistory.jobmasterid.$invalid}" data-ng-options="rg as rg.code for rg in jobmaster" id="jobmasterid" ng-change="getSelectedCategory(memhistory.jobmasterid);">
                                    </select>
                               
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
                        <!-- <div ng-show=" jobprint.jobcode == 'OTHER'" class="row">
                           <div class="input-field col s12">
                              CATEGORY
                              <input ng-model='inplace.othercat' id="othercat" type="text">
                           </div>
                        </div> -->
                     </form>
                  </div>
               </div>
            </div>
         </div>
         <div class="modal-footer">
            <a ng-click="jobconfirm(jobprint.documentid,jobprint.memberid, jobprint.effectivedate, jobprint.inplace)" class="waves-effect waves-green btn-flat modal-action modal-close">Print</a>
            <a href="#" class="waves-effect waves-red btn-flat modal-action modal-close">Close</a>
         </div>
      </div>


      <div class="col s12 m6 l6">
            <div class="card blue-grey lighten-1">
               <div class="card-action">
                  <div class="card-content white-text">
                     <p class="text-black">You can Export all Job postings, from an excel file.</p>
                  </div>
                  <button ng-click="exportnewjobapply(fromdate,todate)" class="btn cyan waves-effect waves-light" type="submit">Export Job Confirm
                  <i class="mdi-content-send right"></i>
                  </button>
               </div>
            </div>
         </div>

      </div>


      
    
</div>

<script>
$(document).ready(function() {
    $('.date1').datepicker({
        format: 'yyyy-mm-dd',
        autoClose: true,

    });

    // $(".date1").datepicker().on("changeDate", function(e) {
    //     $('.datepicker-dropdown').hide();
    // });
});
</script>

<style type="text/css">
.ng-table-pager {
    display: none;
}
</style>
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

.btn-floating i {
    
    font-size: 1rem;
    line-height: 25px;
}

.btn-floating {
   
    width: 25px;
    height: 25px;
    line-height: 25px;
  
}

table.striped > tbody > tr > td {
    text-align: center;
}
</style>