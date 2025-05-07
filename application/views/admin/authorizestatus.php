<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.8.4/moment.min.js"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/app/authorizestatus.js")?>"></script>
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
   var clientid = 0;
   var regionid = <?php echo $_SESSION['regionid']; ?> ;
   var roleid = <?php echo $_SESSION['roleid']; ?> ;
</script>
<style> 
   .tabs {
      background-color: #5bacec !important;
   }
   .tabs .tab a {
      color: #FFFFFF !important;
   }
   .tabs .tab a:hover,
   .tabs .tab a.active {
      background-color: transparent !important;
      color: #FFFFFF !important;
   }
   .tabs .indicator {
      background-color: #0460f3 !important;
      height: 3px !important;
   }
</style>
<div class="parallax-container" style="background-color: rgba(0, 12, 78, 0.9)">
    <div class="row">
        <div class="container">
            <div class="col s12 m6 l6">
                <div class="pagebannertext white-text">Attendance Status</div>
            </div>
            <div class="col s12 m6 l6 right-align">
                <div class="dumheight hide-on-small-only"></div>
                <div class="">
                    <a href="
                <?php echo base_url('admin/dashboard')?>" class="breadcrumb">Home
                    </a>
                    <span class="breadcrumb">Finance</span>
                    <span class="breadcrumb">Attendance Status</span>
                </div>
            </div>
        </div>
    </div>
    <div class="parallax">
        <img src="
        <?php echo base_url("assets/images/breadcrumbbanner.jpg")?>">
    </div>
</div>
<div class="row" ng-app="appAttStatus">
    <div class="container" ng-controller="ctrlAttStatus">
        <div class="cover-spin"></div>
        <div id="" class="section row">
            <div class="col s12">
                <ul class="tabs">
                    <li class="tab col s2">
                        <a class="active" id="pending" href="#attendance-details-status"> Project Status</a>
                    </li>
                    <li class="tab col s2">
                        <a ng-click="attendancesubmittedstatus()" class="active" id="submitted" href="#attendance-submitted-status"> Attd. Submitted</a>
                    </li>
                    <li class="tab col s2">
                        <a id="notsubmitted" href="#attendance-details-pending">
                            Attd. Not Submitted
                        </a>
                    </li>
                    <li class="tab col s2">
                        <a ng-click="SalaryCreated()" id="created" href="#salary-created-details">
                            Salary Created
                        </a>
                    </li>
                    <li class="tab col s2">
                        <a ng-click="SalaryNotCreated()" id="notcreated" href="#salary-notcreated-details">
                            Salary Not Created
                        </a>
                    </li>
                    <li class="tab col s2">
                        <a ng-click="SalaryRejected()" id="rejected" href="#salary-rejected-details">
                            Rejected
                        </a>
                    </li>
                </ul>
            </div>
            <div id="attendance-details-status" class="col s12">
                <br>
                <div class="row">
                    <div class="input-field col m3 s6">
                        <input name="fromdate" id="date1" class="date1" type="text" ng-model="objattendance.fromdate" autocomplete="off" />
                        <label for="startdate">Start Date </label>
                    </div>
                    <div class="input-field col m3 s6">
                        <input name="todate" id="date1" class="date1" type="text" ng-model="objattendance.todate" autocomplete="off" />
                        <label for="enddate">End Date </label>
                    </div>
                    <div class="input-field col m3 s6">
                        <select id="region" name="region" class="validate"
                            ng-class="{'submitted': submitted && attendanceform.regionid.$invalid}"
                            ng-model="objattendance.regionid" data-ng-options=" r.lkvalid as r.description for r in region" ng-required="true">
                            <option value="">All</option>
                        </select>
                        <label for="projectno">Region</label>
                    </div>
                    <div class="input-field col m3 s6">
                        <button class="btn waves-effect waves-light  cyan darken-2" type="submit"
                            ng-click="getAttendanceStatusDetails(objattendance)" ng-disabled="isDisabled">Submit</button>

                            &nbsp;&nbsp;
                        <button class="btn waves-effect waves-light  cyan darken-2" type="submit"
                            ng-click="getAttendanceExportDetails(objattendance)" ng-disabled="isDisabled">Export</button>
                    </div>
                </div>
                <br><br>
                <table ng-table="firstTableParamsub" class="responsive-table highlight striped" show-filter="true"
                    class="bordered">
                    <tr ng-repeat="applied in $data">
                        <td width="5%" data-title="'S.No'">{{$index + 1}}</td>
                        <td width="20%" data-title="'Project No / Name'" filter="{projectno: 'text'}">{{applied.projectno}} / {{applied.projectname}}</td>
                        <td width="15%" data-title="'Month & Year'" filter="{monthandyear: 'text'}"
                            sortable="'monthandyear'">{{applied.monthandyear}}</td>
                        <td width="10%" data-title="'Bill Type'" filter="{billtype: 'text'}" sortable="'billtype'"><span
                                ng-show="applied.bill_type==1">Arrear</span><span
                                ng-show="applied.bill_type==0">Salary</span></td>
                        <td width="10%" data-title="'Duties'" filter="{totalduties: 'text'}" sortable="'totalduties'">
                            <span
                                ng-repeat="duties in applied.duties">{{duties.category}} - {{duties.totalduties+duties.eddays}}<br /></span>
                        </td> 
                        <td width="10%" data-title="'Invoice'">
                            <div ng-show="applied.status > 2 && applied.status !=7 ">
                                <a href="<?php echo base_url('admin/printinvoice?invoiceno={{applied.invoiceno}}')?>"
                                    target="_blank"><i class="material-icons">print</i></a>
                            </div>
                            <span ng-show="applied.status == 1 || applied.status == 2" style="color:red;">
                                Pending
                            </span>

                            <span ng-show="applied.status == 7" style="color:red;">
                                Rejected
                            </span>

                        </td>
                        <td width="10%" data-title="'Pay Slip'">
                            <div ng-show="applied.status > 1 && applied.status !=7">
                                <a target="blank"
                                    href="
                        <?php echo base_url('admin/printpayslip?projectid={{applied.projectid}}&monthandyear={{applied.monthandyear}}&payslipno={{applied.payslipno}}')?>"
                                    class="btn-floating btn-small">
                                    <i class="material-icons">print</i>
                                </a>
                                <a target="blank"
                                    href="
                        <?php echo base_url('admin/printfund?projectid={{applied.projectid}}&monthandyear={{applied.monthandyear}}&payslipno={{applied.payslipno}}')?>"
                                    class="btn-floating btn-small blue" style="cursor:pointer;">
                                    <i class="material-icons">visibility</i>
                                </a>
                            </div> 
                            <span ng-show="applied.status == 1" style="color:red;">
                                Pending
                            </span>
                            <span ng-show="applied.status == 7" style="color:red;">
                                Rejected
                            </span>
                        </td>
                        <td width="10%" data-title="'Status'">
                            <span style="color:red;">
                                {{applied.currentstatus}}
                            </span>
                        </td>
                    </tr>
                </table>
            </div>
            <div id="attendance-submitted-status" class="col s12">
                <br>
                <div class="row">
                    <div class="input-field col m3 s6">
                        <input name="fromdate" id="date1" class="date1" type="text" ng-model="objattendances.fromdate" autocomplete="off" />
                        <label for="startdate">Start Date </label>
                    </div>
                    <div class="input-field col m3 s6">
                        <input name="todate" id="date1" class="date1" type="text" ng-model="objattendances.todate" autocomplete="off" />
                        <label for="enddate">End Date </label>
                    </div>
                    <div class="input-field col m3 s6">
                        <select id="region" name="region" class="validate"
                            ng-class="{'submitted': submitted && attendanceform.regionid.$invalid}"
                            ng-model="objattendances.regionid" data-ng-options=" r.lkvalid as r.description for r in region" ng-required="true">
                            <option value="">All</option>
                        </select>
                        <label for="projectno">Region</label>
                    </div>
                    <div class="input-field col m3 s6">
                        <button class="btn waves-effect waves-light  cyan darken-2" type="submit"
                            ng-click="getAttendanceSubmittedDetails(objattendances)" ng-disabled="isDisabled">Submit</button>

                            &nbsp;&nbsp;
                        <button class="btn waves-effect waves-light  cyan darken-2" type="submit"
                            ng-click="getAttendanceSubmittedExportedDetails(objattendances)" ng-disabled="isDisabled">Export</button>
                    </div>
                    
                </div>
                <br><br>
                <table ng-table="firstTableParamsub3" class="responsive-table highlight striped" show-filter="true"
                    class="bordered">
                    <tr ng-repeat="applied in $data">
                        <td width="5%" data-title="'S.No'">{{$index + 1}}</td>
                        <td width="20%" data-title="'Project No / Name'" filter="{projectno: 'text'}">{{applied.projectno}} / {{applied.projectname}}</td>
                        <td width="15%" data-title="'Month & Year'" filter="{monthandyear: 'text'}"
                            sortable="'monthandyear'">{{applied.monthandyear}}</td>
                        <td width="10%" data-title="'Bill Type'" filter="{billtype: 'text'}" sortable="'billtype'"><span
                                ng-show="applied.bill_type==1">Arrear</span><span
                                ng-show="applied.bill_type==0">Salary</span></td>
                        <td width="10%" data-title="'Duties'" filter="{totalduties: 'text'}" sortable="'totalduties'">
                            <span
                                ng-repeat="duties in applied.duties">{{duties.category}} - {{duties.totalduties+duties.eddays}}<br /></span>
                        </td> 
                        <td width="10%" data-title="'Invoice'">
                            <div ng-show="applied.status > 2">
                                <a href="<?php echo base_url('admin/printinvoice?invoiceno={{applied.invoiceno}}')?>"
                                    target="_blank"><i class="material-icons">print</i></a>
                            </div>
                            <span ng-show="applied.status == 1 || applied.status == 2" style="color:red;">
                                Pending
                            </span>
                        </td>
                        <td width="10%" data-title="'Pay Slip'">
                            <div ng-show="applied.status > 1">
                                <a target="blank"
                                    href="
                        <?php echo base_url('admin/printpayslip?projectid={{applied.projectid}}&monthandyear={{applied.monthandyear}}&payslipno={{applied.payslipno}}')?>"
                                    class="btn-floating btn-small">
                                    <i class="material-icons">print</i>
                                </a>
                                <a target="blank"
                                    href="
                        <?php echo base_url('admin/printfund?projectid={{applied.projectid}}&monthandyear={{applied.monthandyear}}&payslipno={{applied.payslipno}}')?>"
                                    class="btn-floating btn-small blue" style="cursor:pointer;">
                                    <i class="material-icons">visibility</i>
                                </a>
                            </div> 
                            <span ng-show="applied.status == 1" style="color:red;">
                                Pending
                            </span>
                        </td>
                        <td width="10%" data-title="'Status'">
                            <span style="color:red;">
                                {{applied.currentstatus}}
                            </span>
                        </td>
                    </tr>
                </table>
            </div>
            <div id="attendance-details-pending" class="col s12">
                <br>
                <div class="row">
                    <div class="input-field col m4 s12">
                        <input name="month_year" id="month_year" class="month_year" type="text"
                            ng-model="objatt.monthandyear" autocomplete="off" />
                        <label for="startdate">Month </label>
                    </div>
                    <div class="input-field col m4 s12">
                        <select id="region" name="region" class="validate"
                            ng-class="{'submitted': submitted && attendanceform.regionid.$invalid}"
                            ng-model="objatt.regionid" data-ng-options=" r.lkvalid as r.description for r in region"
                            ng-required="true">
                            <option value="">All</option>
                        </select>
                        <label for="projectno">Region</label>
                    </div>
                    <div class="input-field col m4 s12">
                        <button class="btn waves-effect waves-light  cyan darken-2" type="submit"
                            ng-click="getpendingAttendanceDetails(objatt)">Search</button> 

                            &nbsp;&nbsp;
                        <button class="btn waves-effect waves-light  cyan darken-2" type="submit"
                            ng-click="getpendingAttendanceExportedDetails(objatt)" ng-disabled="isDisabled">Export</button>
                    </div>
                </div>
                <table ng-table="tableParams" class="responsive-table highlight striped" show-filter="true"
                    class="bordered">
                    <tr ng-repeat="attdetails in $data">
                        <td width="3%" data-title="'S.No'">{{$index + 1}}</td>
                        <td width="23%" data-title="'Client Name'" sortable="'organization'">
                        {{attdetails.organization}} 
                        </td>
                        <td width="10%" data-title="'Project No'" sortable="'projectno'">
                        {{attdetails.projectno}}
                        </td>
                        <td width="10%" data-title="'Project Name'" sortable="'name'">
                        {{attdetails.name}}
                        </td>
                        <td width="10%" data-title="'Contact Name'" sortable="'contactname'">
                            {{attdetails.contactname}}
                        </td>
                        <td width="10%" data-title="'Email'" sortable="'email'">
                            {{attdetails.email}}
                        </td>
                    </tr>
                </table>
            </div>
            <div id="salary-created-details" class="col s12">
                <br>
                <div class="row">
                    <div class="input-field col m3 s6">
                        <input name="fromdate" id="date1" class="date1" type="text" ng-model="sscreated.fromdate" autocomplete="off" />
                        <label for="startdate">Start Date </label>
                    </div>
                    <div class="input-field col m3 s6">
                        <input name="todate" id="date1" class="date1" type="text" ng-model="sscreated.todate" autocomplete="off" />
                        <label for="enddate">End Date </label>
                    </div>
                    <div class="input-field col m3 s6">
                        <select id="region" name="region" class="validate"
                            ng-class="{'submitted': submitted && attendanceform.regionid.$invalid}"
                            ng-model="sscreated.regionid" data-ng-options=" r.lkvalid as r.description for r in region" ng-required="true">
                            <option value="">All</option>
                        </select>
                        <label for="projectno">Region</label>
                    </div>
                    <div class="input-field col m3 s6">
                        <button class="btn waves-effect waves-light  cyan darken-2" type="submit"
                            ng-click="getSalaryCreatedDetails(sscreated)" ng-disabled="isDisabled">Submit</button>
                            &nbsp;&nbsp;
                        <button class="btn waves-effect waves-light  cyan darken-2" type="submit"
                            ng-click="getSalaryCreatedExportedDetails(sscreated)" ng-disabled="isDisabled">Export</button>
                    </div>
                </div>
                <br><br>
                <table ng-table="firstTableParamsub1" class="responsive-table highlight striped" show-filter="true"
                    class="bordered">
                    <tr ng-repeat="applied in $data">
                        <td width="5%" data-title="'S.No'">{{$index + 1}}</td>
                        <td width="20%" data-title="'Project No / Name'" filter="{projectno: 'text'}">{{applied.projectno}} / {{applied.projectname}}</td>
                        <td width="15%" data-title="'Month & Year'" filter="{monthandyear: 'text'}"
                            sortable="'monthandyear'">{{applied.monthandyear}}</td>
                        <td width="10%" data-title="'Bill Type'" filter="{billtype: 'text'}" sortable="'billtype'"><span
                                ng-show="applied.bill_type==1">Arrear</span><span
                                ng-show="applied.bill_type==0">Salary</span></td>
                        <td width="10%" data-title="'Duties'" filter="{totalduties: 'text'}" sortable="'totalduties'">
                            <span
                                ng-repeat="duties in applied.duties">{{duties.category}} - {{duties.totalduties+duties.eddays}}<br /></span>
                        </td> 
                        <td width="10%" data-title="'Invoice'">
                            <div ng-show="applied.status > 2">
                                <a href="<?php echo base_url('admin/printinvoice?invoiceno={{applied.invoiceno}}')?>"
                                    target="_blank"><i class="material-icons">print</i></a>
                            </div>
                            <span ng-show="applied.status == 1 || applied.status == 2" style="color:red;">
                                Pending
                            </span>
                        </td>
                        <td width="10%" data-title="'Pay Slip'">
                            <div ng-show="applied.status > 1">
                                <a target="blank"
                                    href="
                        <?php echo base_url('admin/printpayslip?projectid={{applied.projectid}}&monthandyear={{applied.monthandyear}}&payslipno={{applied.payslipno}}')?>"
                                    class="btn-floating btn-small">
                                    <i class="material-icons">print</i>
                                </a>
                                <a target="blank"
                                    href="
                        <?php echo base_url('admin/printfund?projectid={{applied.projectid}}&monthandyear={{applied.monthandyear}}&payslipno={{applied.payslipno}}')?>"
                                    class="btn-floating btn-small blue" style="cursor:pointer;">
                                    <i class="material-icons">visibility</i>
                                </a>
                            </div> 
                            <span ng-show="applied.status == 1" style="color:red;">
                                Pending
                            </span>
                        </td>
                        <td width="10%" data-title="'Status'">
                            <span style="color:red;">
                                {{applied.currentstatus}}
                            </span>
                        </td>
                    </tr>
                </table>
            </div>
            <div id="salary-notcreated-details" class="col s12">
                <br>
                <div class="row">
                    <div class="input-field col m3 s6">
                        <input name="fromdate" id="date1" class="date1" type="text" ng-model="ssnotcreated.fromdate" autocomplete="off" />
                        <label for="startdate">Start Date </label>
                    </div>
                    <div class="input-field col m3 s6">
                        <input name="todate" id="date1" class="date1" type="text" ng-model="ssnotcreated.todate" autocomplete="off" />
                        <label for="enddate">End Date </label>
                    </div>
                    <div class="input-field col m3 s6">
                        <select id="region" name="region" class="validate"
                            ng-class="{'submitted': submitted && attendanceform.regionid.$invalid}"
                            ng-model="ssnotcreated.regionid" data-ng-options=" r.lkvalid as r.description for r in region" ng-required="true">
                            <option value="">All</option>
                        </select>
                        <label for="projectno">Region</label>
                    </div>
                    <div class="input-field col m3 s6">
                        <button class="btn waves-effect waves-light  cyan darken-2" type="submit"
                            ng-click="getSalaryNotCreatedDetails(ssnotcreated)" ng-disabled="isDisabled">Submit</button>
                            &nbsp;&nbsp;
                        <button class="btn waves-effect waves-light  cyan darken-2" type="submit"
                            ng-click="getSalaryNotCreatedExportedDetails(ssnotcreated)" ng-disabled="isDisabled">Export</button>
                    </div>
                </div>
                <br><br>
                <table ng-table="firstTableParamsub2" class="responsive-table highlight striped" show-filter="true"
                    class="bordered">
                    <tr ng-repeat="applied in $data">
                        <td width="5%" data-title="'S.No'">{{$index + 1}}</td>
                        <td width="20%" data-title="'Project No / Name'" filter="{projectno: 'text'}">{{applied.projectno}} / {{applied.projectname}}</td>
                        <td width="15%" data-title="'Month & Year'" filter="{monthandyear: 'text'}"
                            sortable="'monthandyear'">{{applied.monthandyear}}</td>
                        <td width="10%" data-title="'Bill Type'" filter="{billtype: 'text'}" sortable="'billtype'"><span
                                ng-show="applied.bill_type==1">Arrear</span><span
                                ng-show="applied.bill_type==0">Salary</span></td>
                        <td width="10%" data-title="'Duties'" filter="{totalduties: 'text'}" sortable="'totalduties'">
                            <span
                                ng-repeat="duties in applied.duties">{{duties.category}} - {{duties.totalduties+duties.eddays}}<br /></span>
                        </td> 
                        <td width="10%" data-title="'Invoice'">
                            <span ng-show="applied.status == 1 || applied.status == 2" style="color:red;">
                                Pending
                            </span>
                        </td>
                        <td width="10%" data-title="'Pay Slip'">
                            <span ng-show="applied.status == 1" style="color:red;">
                                Pending
                            </span>
                        </td>
                        <td width="10%" data-title="'Status'">
                            <span style="color:red;">
                                {{applied.currentstatus}}
                            </span>
                        </td>
                    </tr>
                </table>
            </div>
            <div id="salary-rejected-details" class="col s12">
                <br>
                <div class="row">
                    <div class="input-field col m3 s6">
                        <input name="fromdate" id="date1" class="date1" type="text" ng-model="ssrejected.fromdate" autocomplete="off" />
                        <label for="startdate">Start Date </label>
                    </div>
                    <div class="input-field col m3 s6">
                        <input name="todate" id="date1" class="date1" type="text" ng-model="ssrejected.todate" autocomplete="off" />
                        <label for="enddate">End Date </label>
                    </div>
                    <div class="input-field col m3 s6">
                        <select id="region" name="region" class="validate"
                            ng-class="{'submitted': submitted && attendanceform.regionid.$invalid}"
                            ng-model="ssrejected.regionid" data-ng-options=" r.lkvalid as r.description for r in region" ng-required="true">
                            <option value="">All</option>
                        </select>
                        <label for="projectno">Region</label>
                    </div>
                    <div class="input-field col m3 s6">
                        <button class="btn waves-effect waves-light  cyan darken-2" type="submit"
                            ng-click="getSalaryRejectedDetails(ssrejected)" ng-disabled="isDisabled">Submit</button>
                            &nbsp;&nbsp;
                        <button class="btn waves-effect waves-light  cyan darken-2" type="submit"
                            ng-click="getSalaryRejectedExportDetails(ssrejected)" ng-disabled="isDisabled">Export</button>
                    </div>
                </div>
                <br><br>
                <table ng-table="firstTableParamsub4" class="responsive-table highlight striped" show-filter="true"
                    class="bordered">
                    <tr ng-repeat="applied in $data">
                        <td width="5%" data-title="'S.No'">{{$index + 1}}</td>
                        <td width="20%" data-title="'Project No / Name'" filter="{projectno: 'text'}">{{applied.projectno}} / {{applied.projectname}}</td>
                        <td width="15%" data-title="'Month & Year'" filter="{monthandyear: 'text'}"
                            sortable="'monthandyear'">{{applied.monthandyear}}</td>
                        <td width="10%" data-title="'Bill Type'" filter="{billtype: 'text'}" sortable="'billtype'"><span
                                ng-show="applied.bill_type==1">Arrear</span><span
                                ng-show="applied.bill_type==0">Salary</span></td>
                        <td width="10%" data-title="'Duties'" filter="{totalduties: 'text'}" sortable="'totalduties'">
                            <span
                                ng-repeat="duties in applied.duties">{{duties.category}} - {{duties.totalduties+duties.eddays}}<br /></span>
                        </td> 
                        <td width="10%" data-title="'Status'">
                            <span style="color:red;">
                                {{applied.currentstatus}}
                            </span>
                        </td>
                        <td width="10%" data-title="'Changed By'">
                            <span style="color:red;" ng-if="applied.att_cashier_rejected == 1 && applied.att_cao_rejected == 0">Rejected By Cashier</span>
                            <span style="color:red;" ng-if="applied.att_cashier_rejected == 0 && applied.att_cao_rejected == 1">Rejected By CAO</span>
                            <span style="color:red;" ng-if="applied.att_cashier_rejected == 0 && applied.att_cao_rejected == 0">Rejected By Supervisor</span>
                        </td>
                    </tr>
                </table>
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
        $(".date1").datepicker().on("changeDate", function(e) {
            $('.datepicker-dropdown').hide();
        });

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
<style type="text/css">
.ng-table-pager {
    display: none;
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
.agreementdetails td {
    text-align: left !important;
}
.striped {
    display: block;
    height: 600px;
    overflow-y: scroll;
    overflow-x: scroll;
}
</style>