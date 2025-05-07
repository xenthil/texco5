<script type="text/javascript" src="<?php echo base_url("assets/js/app/invoice.js")?>"></script>
<link rel="stylesheet" type="text/css" href="<?php echo base_url("assets/css/ng-table.min.css")?>" />
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ng-table.min.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ui-bootstrap-tpls-0.11.0.js")?>"></script>
<script src="<?php echo base_url("assets/js/lib/angular-bootstrap-datepicker.js")?>" charset="utf-8"></script>
<script type="text/javascript">
var clientid = 0;
var regionid = <?php echo $_SESSION['regionid']; ?> ;
var roleid = <?php echo $_SESSION['roleid']; ?> ;
var base_url=<?php echo base_url();?>
</script>
<link href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery-ui.css" rel="Stylesheet"
    type="text/css" />
<link href="<?php echo base_url("assets/css/datepicker.css")?>" rel="Stylesheet" type="text/css" />
<div class="parallax-container" style="background-color: rgba(0, 12, 78, 0.9)">
    <div class="row">
        <div class="container">
            <div class="col s12 m6 l6">
                <div class="pagebannertext white-text">Invoice</div>
            </div>
            <div class="col s12 m6 l6 right-align">
                <div class="dumheight hide-on-small-only"></div>
                <div class="">
                    <a href="<?php echo base_url('admin/dashboard')?>" class="breadcrumb">Home</a>
                    <span class="breadcrumb">Employers</span>
                    <span class="breadcrumb">Invoice</span>
                </div>
            </div>
        </div>
    </div>
    <div class="parallax">
        <img src="<?php echo base_url("assets/images/breadcrumbbanner.jpg")?>">
    </div>
</div>
<div class="row" ng-app="pendingatt">
    <div class="container" ng-controller="pendingattctrl">
        <div class="col s12">
            <ul class="tabs">
                <li class="tab col s6"><a ng-click="resetprojcao()" class="active" id="pending"
                        href="#sup-details-pending">Print Invoice</a></li>
                <li class="tab col s6"><a ng-click="resetprojcao()" id="Approved" href="#sup-details-Approved">Combined
                        claim generate</a></li>
            </ul>
        </div>
        <div id="sup-details-pending">
            <div class="col m12 s12">
               <div class="input-field col m3 s12" style="margin-top: 40px !important;">
                  <input name="month_year" id="month_year" class="month_year" type="text"
                     ng-model="objattendance.monthandyear" autocomplete="nope" />
                  <label for="startdate">Month </label>
               </div>
               <div class="input-field col m3 s12" style="margin-top: 40px !important;">
                  <select id="region" name="region" class="validate"
                     ng-class="{'submitted': submitted && attendanceform.projectno.$invalid}"
                     ng-model="objattendance.regionid" data-ng-options=" r.lkvalid as r.description for r in region"
                     ng-required="true">
                     <option value="">All</option>
                  </select>
                  <label for="projectno">Region</label>
               </div>
               <div class="input-field col m3 s12" ng-init="objattendance.type = '0'" style="margin-top: 40px !important;">
                  <select id="type" name="region" class="validate" ng-model="objattendance.type"
                     ng-required="true">
                     <option value="0"> All </option>
                     <option value="1"> Salary </option>
                     <option value="2"> Arrear </option>
                  </select>
                  <label for="Type">Type</label>  
               </div> 
               <div class="input-field col m1 s12" style="margin-top: 40px !important;">
                  <button class="btn waves-effect waves-light  cyan darken-2" type="submit"
                     ng-click="getinvoice(objattendance)">Search</button>
               </div>
            </div>
            <div id="" class="section">
                <div id="Client-details" class="col s12">
                    <table ng-table="tableParams" class="responsive-table highlight striped" show-filter="true"
                        class="bordered">
                        <tr ng-repeat="applied in $data">
                            <td width="5%" data-title="'S.NO'" filter="{projectno: 'text'}">{{$index + 1}}</td>
                            <td width="10%" data-title="'Project No'" filter="{projectno: 'text'}">{{applied.projectno}}
                            </td>
                            <td width="15%" data-title="'Project Name'" filter="{projectname: 'text'}"
                                sortable="'projectname'">{{applied.projectname}}</td>
                            <td width="20%" data-title="'Month And Year'" filter="{monthandyear: 'text'}"
                                sortable="'monthandyear'">{{applied.monthandyear}}</td>
                            <td width="15%" data-title="'Duties'" filter="{totalduties: 'text'}"
                                sortable="'totalduties'"><span
                                    ng-repeat="duties in applied.duties">{{duties.category}}-{{duties.totalduties}}<br /></span>
                            </td>
                            <td width="15%" data-title="'Type'" filter="{type: 'text'}" sortable="'type'">
                                 <span ng-show="applied.type==1">Arrear</span>
                                 <span ng-show="applied.type==0">Invoice</span>
                            </td>
                            <td width="20%" data-title="'Generate / View'">
                                <span ng-show="applied.invoiceno == '' || applied.invoiceno =='NULL' || applied.invoiceno == null">
                                    {{applied.currentstatus}}
                                </span>
                                    <!-- <span
                                        ng-show="applied.invoiceno=='' || applied.invoiceno =='NULL' || applied.invoiceno ==null">
                                        <a target="blank" href="
                                        <?php // echo base_url('admin/previewinvoice?projectid={{applied.projectid}}&monthandyear={{applied.monthandyear}}') ?>" class="btn-floating btn-small"> </a>  
                                        <a class="btn-floating btn-small blue"
                                            ng-click="generateinvoice(applied.projectid,applied.monthandyear)">
                                            <i class="material-icons">done</i>
                                        </a> -
                                    </span> -->
                                <span ng-hide="applied.invoiceno =='' || applied.invoiceno =='NULL' || applied.invoiceno ==null">
                                    <span ng-show="applied.type == 0">
                                        <a class="btn-floating btn-small green"
                                            href="<?php echo base_url('admin/printinvoice?invoiceno={{applied.invoiceno}}')?>"
                                            target="_blank"><i class="material-icons">print</i></a>
                                    </span>
                                    <span ng-show="applied.type == 1">
                                        <a class="btn-floating btn-small green"
                                            href="<?php echo base_url('admin/printclaiminvoice?invoiceno={{applied.invoiceno}}')?>"
                                            target="_blank"><i class="material-icons">print</i></a>
                                    <span>
                                </span>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>



        <div id="sup-details-Approved">


            <div class="input-field col m3 s6">
                <input name="month_year" id="date1" class="date1" type="text" ng-model="objattendance.fromdate"
                    ng-change="getpayslip(objattendance.monthandyear)" autocomplete="off" />
                <label for="startdate">Start Date </label>
            </div>

            <div class="input-field col m3 s6">
                <input name="month_year" id="date1" class="date1" type="text" ng-model="objattendance.todate"
                    ng-change="getpayslip(objattendance.monthandyear)" autocomplete="off" />
                <label for="enddate">End Date </label>
            </div>
            <div class="input-field col m3 s6">
                <select id="region" name="region" class="validate"
                    ng-class="{'submitted': submitted && attendanceform.projectno.$invalid}"
                    ng-model="objattendance.regionid" data-ng-options=" r.lkvalid as r.description for r in region"
                    ng-change="fillclientproject(objattendance.projectid)" ng-required="true">
                    <option value="">All</option>
                </select>
                <label for="projectno">Region</label>
            </div>

            <div class="input-field col m3 s6">

                <button class="btn waves-effect waves-light  cyan darken-2" type="submit"
                    ng-click="getcombinedagreement(objattendance)" ng-disabled="isDisabled">Submit</button>

            </div>


            <div id="" class="section">
                <div id="Client-details" class="col s12">
                    <table ng-table="tableParams1" class="responsive-table highlight striped" show-filter="true"
                        class="bordered">
                        <tr ng-repeat="applied in $data">
                            <td style="text-align: left" width="7%">
                                <input type="checkbox" class="filled-in" id="passorder_{{$index + 1}}"
                                    name="passorder_{{$index + 1}}" ng-checked="applied.isselected"
                                    ng-model="applied.ischecked" ng-change="selectEntityPassorder(applied)" />
                                <label for="passorder_{{$index + 1}}" data-error="Required"></label>
                            </td>
                            <td width="5%" data-title="'S.NO'" filter="{projectno: 'text'}">{{$index + 1}}</td>
                            <td width="10%" data-title="'Project No'" filter="{projectno: 'text'}">{{applied.projectno}}
                            </td>
                            <td width="15%" data-title="'Project Name'" filter="{projectname: 'text'}"
                                sortable="'projectname'">{{applied.projectname}}</td>
                            <td width="20%" data-title="'Month And Year'" filter="{monthandyear: 'text'}"
                                sortable="'monthandyear'">{{applied.monthandyear}}</td>
                            <td width="15%" data-title="'Duties'" filter="{totalduties: 'text'}"
                                sortable="'totalduties'"><span
                                    ng-repeat="duties in applied.duties">{{duties.category}}-{{duties.totalduties}}<br /></span>
                            </td>

                        </tr>
                    </table>

                    <div ng-show="selectedproj.length > 0 ">
                        <button class="btn waves-effect waves-light  cyan darken-2" type="submit"
                            ng-click="proceedcombined(selectedproj)" ng-disabled="isDisabled">Approve</button>

                    </div>

                </div>
            </div>
        </div>
    </div>
</div>
<style type="text/css">
.ng-table-pager {
    display: none;
}

.tabs {
    overflow-x: hidden !important;
    overflow-y: hidden !important;
}

.datepicker-dropdown {
    top: 0;
    left: 0;
    position: absolute;
    background-color: #fff;
    width: 20%;
}

td {
    text-align: center;
}

.striped {
    display: block;
    height: 600px;
    overflow-y: scroll;
    overflow-x: scroll;
}
</style>
<script>
$(document).ready(function() {
    $('.month_year').datepicker({
        format: 'MM yyyy',
        viewMode: "months",
        minViewMode: "months",
        autoClose: true,

    });

    $(".month_year").datepicker().on("changeDate", function(e) {
        $('.datepicker-dropdown').hide();
    });
});
</script>

<script>
$(document).ready(function() {
    $('.date1').datepicker({
        format: 'yyyy-mm-dd',
        autoClose: true,
        endDate: "today"

    });

    $(".date1").datepicker().on("changeDate", function(e) {
        $('.datepicker-dropdown').hide();
    });
});
</script>