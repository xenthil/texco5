<link rel="stylesheet" type="text/css" href="<?php echo base_url("assets/css/ng-table.min.css")?>" />
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ng-table.min.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ui-bootstrap-tpls-0.11.0.js")?>"></script>
<link rel='stylesheet prefetch'
    href='https://cdn.rawgit.com/chingyawhao/materialize-clockpicker/master/dist/css/materialize.clockpicker.css'>
<script src='https://cdn.rawgit.com/chingyawhao/materialize-clockpicker/master/dist/js/materialize.clockpicker.js'>
</script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.8.4/moment.min.js"></script>
<script src="<?php echo base_url("assets/js/lib/underscore.js")?>" charset="utf-8"></script> 
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.8.1/xlsx.full.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/2.6.0/jszip.min.js"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/app/postingorderedit.js")?>"></script> 

<script type="text/javascript">
   var clientid = 0;
   var regionid = <?php echo $_SESSION['regionid']; ?>;
   var roleid = <?php echo $_SESSION['roleid']; ?>;
</script>
<div class="parallax-container" style="background-color: rgba(0, 12, 78, 0.9)">
    <div class="row">
        <div class="container">
            <div class="col s12 m6 l6">
                <div class="pagebannertext white-text">Posting Order</div>
            </div>
            <div class="col s12 m6 l6 right-align">
                <div class="dumheight hide-on-small-only"></div>
                <div class="">
                    <a href="
                  <?php echo base_url('admin/dashboard')?>" class="breadcrumb">Home
                    </a><span class="breadcrumb">Jobs</span>
                    <span class="breadcrumb">Posting Order</span>
                </div>
            </div>
        </div>
    </div>
    <div class="parallax">
        <img src="
         <?php echo base_url("assets/images/breadcrumbbanner.jpg")?>">
    </div>
</div>
<div class="row" ng-app="appPostingEdit">
    <div class="container" ng-controller="ctrlPostingEdit">
       <br><br>  
        <div class="fixed-action-btn" style="bottom: 80px; right: 19px;">
            <?php if ($roledata['permissions']['APROJECT'] == 1) { ?>
                <a class="btn-floating btn-large green modal-trigger tooltipped" title="Add Posting Order" ng-click='addposting()' data-tooltip="Add Posting Order">
                <i class="mdi mdi-medical-bag"></i>
                </a>
            <?php } ?>
        </div> 
        <div class="fixed-action-btn" style="bottom: 160px; right: 19px;">
            <?php if ($roledata['permissions']['APROJECT'] == 1) { ?>
                <a class="btn-floating btn-large blue modal-trigger tooltipped" title="Upload Posting Order" ng-click='bulkposting()' data-tooltip="Upload Posting Order">
                <i class="mdi mdi-briefcase-upload"></i>
                </a>
            <?php } ?>
        </div>
        <div class="row">
            <div class="input-field col s2">
                <input id="startdate" type="date" class="datepicker" ng-model="objprofile.startdate">
                <label for="startdate" class="dp-click">Start Date </label>
            </div>
            <div class="input-field col s2">
                <input id="enddate" type="date" class="datepicker" ng-model="objprofile.enddate">
                <label for="enddate" class="dp-click">End Date</label>
            </div>
            <div class="input-field col s2">
                <button ng-click="getcustomdetails(objprofile)" class="btn cyan waves-effect waves-light" type="submit">Search
                <i class="mdi-content-send right"></i>
                </button>
            </div>
            <div class="input-field col s2"> </div>
            <div class="input-field col s2">
                <button ng-click="getlastthirtydaysdetails()" class="btn cyan waves-effect waves-light" type="submit">Last 30 Days
                <i class="mdi-content-send right"></i>
                </button>
            </div>
            <div class="input-field col s2">
                <button ng-click="getlastninentydaysdetails()" class="btn cyan waves-effect waves-light" type="submit">Last 90 Days
                <i class="mdi-content-send right"></i>
                </button>
            </div>
        </div>
        <div class="row">
            <div class="input-field col m12" style="padding-left: 80px;text-align: center;text-transform: uppercase;">
                <h5>Posting Order for {{selectedtype}}
                </h5><br>
            </div>
        </div>
        <div id="" class="section">
            <div id="Client-details" class="col s12"s>
                <table ng-table="tableParams" class="responsive-table highlight striped" show-filter="true"
                    class="bordered">
                    <tr ng-repeat="applied in $data">
                        <td width="2%" data-title="'S.No'">{{$index + 1}}</td>
                        <td width="10%" data-title="'Texco No'" filter="{texcono: 'text'}" sortable="'texcono'">
                            {{applied.texcono}}
                        </td>
                        <td width="20%" data-title="'Employee Name / Service No'" filter="{firstname: 'text'}"
                            sortable="'firstname'">{{applied.firstname}} - {{applied.serviceno}}
                        </td>
                        <td width="20%" data-title="'Project No/Name'" filter="{projectno: 'text'}" sortable="'projectno'">
                            {{applied.projectno}} - {{applied.projectname}}
                        </td>
                       <td width="10%" data-title="'Category'" filter="{jobname: 'text'}" sortable="'category'">
                            {{applied.category}}
                        </td> 
                        <td width="11%" data-title="'Order Date'" sortable="'startdate'"> {{applied.startdate | date: 'dd/MM/yyyy'}} </td>
                        <td width="11%" data-title="'Last Sal Date'"> {{applied.enddate | date: 'dd/MM/yyyy'}} </td>
                        <td width="11%" data-title="'Action'">
                            <a class="btn-floating btn-large blue modal-trigger" ng-click="editpostorder(applied)" title="Edit Posting Order"> 
                                <i class="mdi mdi-tooltip-edit"> </i>
                            </a>

                            <!-- <a class="btn-floating btn-small orange" ng-click="transferpostorder(applied)"><i class="mdi mdi-backup-restore"></i></a> -->
                              <!-- <a target="blank" href="<?php // echo base_url('admin/printposting?memberhistoryid={{applied.memberhistoryid}}')?>" class="secondary-content"><i 
                              class="material-icons">print</i>
                            </a> -->

                            <a class="btn-floating btn-large green modal-trigger orange" ng-click="cancelpostorder(applied)" title="Cancel Posting Order"> 
                                <i class="material-icons">not_interested</i>
                            </a>
                        </td>
                    </tr>
                </table>
            </div>
        </div>

        <div id="editpostorder"  class="modal modal-fixed-footer" aria-hidden="true" style="width: 65% !important;">
            <div class="modal-content" style="overflow-y: hidden;">
                <nav class="blue" style="position: fixed;margin-top: 0px; z-index:999">
                    <div class="col s11 m11 l11">
                        <div class="li white-text" id="mcaption">Edit / Transfer Posting Order</div>
                    </div>
                </nav>
                <div class="row" style="margin-top: 50px;margin-left: 20px !important;">
                    <div class="col s12 m3 l4">
                        <p class="blue-grey-text"><strong>Service No</strong> </p>
                        <p class="ng-binding">{{memhistory.serviceno }}</p>
                    </div>
                    <div class="col  s12 m3 l4">
                        <p class="blue-grey-text"><strong>Member Name</strong> </p>
                        <p class="ng-binding">{{ memhistory.firstname }} </p>
                    </div>
                    <div class="col  s12 m2 l4">
                        <p class="blue-grey-text"><strong>Rank</strong> </p>
                        <p class="ng-binding">{{ memhistory.rank }}</p>
                    </div>
                </div>
                <hr>
                <div class="row">
                <div class="col s12 m12 l12" style="margin-left: 30px !important;margin-right: 30px !important;">
                    <div class="row">
                        <form class="col s12">
                            <div class="row">
                                <input type="hidden" type="text" ng-model="memhistory.oldprojectid">
                                <input type="hidden" type="text" ng-model="memhistory.oldstartdate">
                                <input type="hidden" type="text" ng-model="memhistory.lastaccess">
                                <div class="input-field col s5 m5 l5">
                                    Texco No
                                    <input id="texcono" type="text" ng-model="memhistory.texcono" placeholder="Texco No" ng-required="true">
                                </div>
                                <div class="input-field col s5 m5 l5">
                                    Project No
                                    <select name="projectid" ng-model="memhistory.projectid"  ng-class="{'submitted': submitted && memhistory.projectid.$invalid}" data-ng-options="prr.projectid as prr.projectno for prr in projects" ng-change="getSelectedProjects(memhistory.projectid);">
                                    </select>
                                </div> 
                            </div>
                            <div class="row">
                                <div class="input-field col s5 m5 l5">
                                    <label for="jobmasterid" style="margin-top: -30px !important;"> Category </label>
                                    <select name="jobmasterid" ng-model="memhistory.jobmasterid"  ng-class="{'submitted': submitted && memhistory.jobmasterid.$invalid}" data-ng-options="rg.jobmasterid as rg.code for rg in jobmaster" id="jobmasterid" ng-change="getSelectedCategory(memhistory.jobmasterid);">
                                    </select>
                                </div>
                                <div class="input-field col s5 m5 l5">
                                    <label for="startdates" class="dp-click"> Start Date </label>
                                    <input id="startdates" type="date" class="datepicker" ng-model="memhistory.startdate" placeholder="Start Date" ng-required="true" ng-class="{'submitted': submitted && memhistory.startdate.$invalid}">
                                </div>
                                <!-- <div class="input-field col s5 m5 l5">
                                    <label for="enddates"> End Date </label>
                                    <input id="enddates" type="date" class="datepicker" ng-model="memhistory.endate" placeholder="End Date" ng-required="true" ng-class="{'submitted': submitted && memhistory.endate.$invalid}" ng-value="memhistory.endate">
                                </div> -->
                            </div>
                        </form>
                    </div>
                </div>
                </div>
            </div>
            <div class="modal-footer">
                <a ng-click="jobupdate(memhistory)" class="waves-effect waves-green btn-flat modal-action modal-close">Update</a> &nbsp;&nbsp;&nbsp;
                <a href="#" class="waves-effect waves-red btn-flat modal-action modal-close">Close</a> &nbsp;&nbsp;&nbsp;
            </div>
        </div> 
        
        <div id="addpostingorder" class="modal modal-fixed-footer" style="max-height:60%;">
            <div class="modal-content">
                <nav class="blue" style="position: fixed;margin-top: 0px; z-index:999">
                    <div class="left col s1 m1 l1">
                        <div class="white-text"><a href=""><i class="modal-action modal-close mdi white-text mdi-arrow-left"></i></a> </div>
                    </div>
                    <div class="col s11 m11 l11">
                        <div class="li white-text" id="mcaption">Add Posting Order</div>
                    </div>
                </nav>
                <div class="row" style="padding: 24px;">
                    <form ng-submit="postingform.$valid && addpostingorder(objposting)" id="postingform" name="postingform" novalidate="novalidate">
                    <div class="row" style="height:40px;">&nbsp;</div>
                    <div class="row">
                        <div class="col s12">
                            <div class="row">
                                <div class="input-field col s6">
                                    <input id="serviceno" name="serviceno" ng-class="{'submitted': submitted && postingform.serviceno.$invalid}" type="text" class="validate" ng-required="true" maxlength="20" ng-model="objposting.serviceno">
                                    <label for="serviceno" data-error="Required" class="active">Service No</label>
                                </div>
                                <div class="input-field col s6">
                                    <input id="texcono" name="texcono" ng-class="{'submitted': submitted && postingform.texcono.$invalid}" type="text" class="validate" ng-required="true" maxlength="20" ng-model="objposting.texcono">
                                    <label for="texcono" data-error="Required" class="active">Texco No</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="input-field col s6"> 
                                    <select name="projectid" ng-model="objposting.projectid" ng-class="{'submitted': submitted && postingform.projectid.$invalid}" ng-required="true" data-ng-options="prr.projectid as prr.projectno for prr in projects" ng-change="getSelectedProjectss(objposting.projectid);">
                                    </select>
                                    <label for="projectid">Project No</label>
                                </div>
                                <div class="input-field col s6">
                                    <select name="jobmasterid" ng-model="objposting.jobmasterid" ng-class="{'submitted': submitted && postingform.jobmasterid.$invalid}" ng-required="true" data-ng-options="rg.jobmasterid as rg.code for rg in jobmaster" id="jobmasterid"  ng-change="getSelectedCategories(objposting.jobmasterid);">
                                    </select>
                                    <label for="jobmasterid">Category</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="input-field col s6"> 
                                    <input id="fromdate" type="date" class="datepicker" ng-model="objposting.fromdate" placeholder="Start Date" ng-required="true" ng-class="{'submitted': submitted && postingform.objposting.fromdate.$invalid}"> 
                                    <label for="fromdate" class="dp-click"> Start Date </label>
                                </div>
                                <div class="input-field col s6">
                                    <input id="todate" type="date" class="datepicker" ng-model="objposting.todate" placeholder="End Date"  ng-class="{'submitted': submitted && postingform.objposting.todate.$invalid}"> 
                                    <label for="todate" class="dp-click"> End Date </label>
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

        <div id="postingorderbulk" class="modal modal-fixed-footer" style="max-height:60%;">
            <div class="modal-content">
                <nav class="blue" style="position: fixed;margin-top: 0px; z-index:999">
                    <div class="left col s1 m1 l1">
                        <div class="white-text"><a href=""><i class="modal-action modal-close mdi white-text mdi-arrow-left"></i></a> </div>
                    </div>
                    <div class="col s11 m11 l11">
                        <div class="li white-text" id="mcaption">Upload Posting Order</div>
                    </div>
                </nav>
                <div class="row" style="padding: 24px;">
                    <form action="#">
                    <div class="row" style="height:40px;">&nbsp;</div>
                    <div class="row">
                        <div class="col s12">
                        <div class="card-content text-black" style="height:200px;"> 
                            <span style="color:red">
                                {{error}}
                            </span>
                            
                            <br>
                            <p class="text-black">You can Upload Memberhistory<span><a style="color:#039be5;font-weight: bold;margin-left: 30px;text-decoration: underline;" href="<?php echo base_url("assets/document/sample/memberhistory.xlsx")?>" download > Download Sample</a></span>.<br>
                            <div class="file-field input-field">
                                <div class="btn">
                                    <span>File</span>
                                    <input type="file" name="file" id="file" class="form-control" onchange="angular.element(this).scope().UploadFile(this.files)" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel">
                                </div>
                                <div class="file-path-wrapper">
                                    <input class="file-path validate" type="text" placeholder="Upload File" style="color:black">
                                </div>
                                <div ng-if="loading" style="margin-top: -210px !important;margin-right: 160px !important;"></div>
                            </div> 
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="waves-effect waves-green btn-flat" type="button" ng-click="ParseExcelDataAndSave();" ng-disabled="!SelectedFileForUpload">
                Import
                </button> 
                <a href="" class="modal-action modal-close waves-effect btn-flat ">Cancel</a>
            </div>
            </form>
        </div> 
    </div>
</div>
<script>


</script>
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
    .tooltip.top {
    display: none !important;
}
</style>