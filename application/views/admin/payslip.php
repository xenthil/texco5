<script type="text/javascript" src="
   <?php echo base_url("assets/js/app/payslip.js")?>"></script>
<link rel="stylesheet" type="text/css" href="
   <?php echo base_url("assets/css/ng-table.min.css")?>" />
<script type="text/javascript" src="
   <?php echo base_url("assets/js/lib/ng-table.min.js")?>"></script>
<script type="text/javascript" src="
   <?php echo base_url("assets/js/lib/ui-bootstrap-tpls-0.11.0.js")?>"></script>
<script src="<?php echo base_url("assets/js/lib/angular-bootstrap-datepicker.js")?>" charset="utf-8"></script>
<script type="text/javascript">
var clientid = 0;
var regionid = <?php echo $_SESSION['regionid']; ?>;
var roleid = <?php echo $_SESSION['roleid']; ?>;
</script>
<link href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery-ui.css" rel="Stylesheet"
    type="text/css" />
<link href="<?php echo base_url("assets/css/datepicker.css")?>" rel="Stylesheet" type="text/css" />
<div class="parallax-container" style="background-color: rgba(0, 12, 78, 0.9)">
    <div class="row">
        <div class="container">
            <div class="col s12 m6 l6">
                <div class="pagebannertext white-text">Pay Slip</div>
            </div>
            <div class="col s12 m6 l6 right-align">
                <div class="dumheight hide-on-small-only"></div>
                <div class="">
                    <a href="
                  <?php echo base_url('admin/dashboard')?>" class="breadcrumb">Home
                    </a><span class="breadcrumb">Employers</span>
                    <span class="breadcrumb">Pay Slip</span>
                </div>
            </div>
        </div>
    </div>
    <div class="parallax">
        <img src="
         <?php echo base_url("assets/images/breadcrumbbanner.jpg")?>">
    </div>
</div>
<div class="row" ng-app="pendingatt">
    <div class="container" ng-controller="pendingattctrl">
        <div id="modal2" class="modal modal-fixed-footer" style="max-height:90%; width:90%">
            <div class="modal-content">
                <nav class="blue" style="position: fixed;margin-top: 0px; z-index:999">
                    <div class="left col s1 m1 l1">
                        <div class="white-text"><a href=""><i
                                    class="modal-action modal-close mdi white-text mdi-arrow-left"></i></a> </div>
                    </div>
                    <div class="col s11 m11 l11">
                        <div class="li white-text" id="mcaption">View Wage Details</div>
                    </div>
                </nav>
                <div class="row" style="padding-top: 60px">
                    <div class="col s12">
                        <table>
                            <thead>
                                <tr>
                                    <td>
                                        <span class="part">Particulars</span>
                                    </td>
                                    <td ng-repeat="wagemaster in wagedetails">
                                        {{wagemaster.jobcode}}
                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr ng-repeat="par in wagedetails[0].salarycomponent"
                                    ng-init="particularIndex = $index">
                                    <td><span class="partamt">{{par.name}}</span> </td>
                                    <td ng-repeat="wagemaster in wagedetails"
                                        ng-init="particular = wagemaster.salarycomponent[particularIndex]">
                                        {{wagemaster.salarycomponent[particularIndex].particularamount | number:2}}
                                        <span ng-if="par.code !='BASIC' && par.code !='RATEHD'"> %</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <div id="failure" class="red-text waves-effect waves-green"></div>
                <a href="" class="modal-action modal-close waves-effect btn-flat ">Cancel</a>
            </div>
            </form>
        </div>
        <div>
            <br>
            <div class="input-field col m2 s12">
                <input name="month_year" id="month_year" class="month_year" type="text"
                    ng-model="objattendance.monthandyear" autocomplete="off" />
                <label for="startdate">Month </label>
            </div>
            <div class="input-field col m2 s12">
                <select id="region" name="region" class="validate"
                    ng-class="{'submitted': submitted && attendanceform.projectno.$invalid}"
                    ng-model="objattendance.regionid" data-ng-options=" r.lkvalid as r.description for r in region"
                    ng-required="true">
                    <option value="">All</option>
                </select>
                <label for="projectno">Region</label>
            </div>
            <div class="input-field col m2 s12" ng-init="objattendance.type = '0'">
                <select id="type" name="region" class="validate" ng-model="objattendance.type"
                    ng-required="true">
                    <option value="0"> All </option>
                    <option value="1"> Salary </option>
                    <option value="2"> Arrear </option>
                </select>
                <label for="Type">Type</label>
            </div>
            <div class="input-field col m1 s12">
                <button class="btn waves-effect waves-light  cyan darken-2" type="submit"
                    ng-click="getpayslip(objattendance)">Search</button>
            </div>
            <div class="input-field col m4" style="padding-left: 80px;">
                <h5 ng-if="objattendance.monthandyear">Payslip for {{objattendance.monthandyear}}
                </h5><br>
            </div>
        </div>
        <div id="" class="section">
            <div id="Client-details" class="col s12">
                <table ng-table="tableParams" class="responsive-table highlight striped" show-filter="true"
                    class="bordered">
                    <tr ng-repeat="applied in $data">
                        <td data-title="'S.NO'">{{$index + 1}}</td>
                        <td data-title="'Payslip No'" filter="{payslipno: 'text'}" sortable="'payslipno'">
                            {{applied.payslipno}}
                        </td>
                        <td data-title="'Project Name / No'" filter="{projectno: 'text'}" sortable="'projectname'">
                            {{applied.projectno}} / {{applied.projectname}}</td>
                        <td width="15%" data-title="'Duties'" filter="{totalduties: 'text'}" sortable="'totalduties'">
                            <span ng-repeat="duties in applied.duties">{{duties.category}} ({{duties.memberscount}}) -
                                {{duties.totalduties+duties.eddays}}<br /></span></td>
                        <td data-title="'Review Date'">{{applied.salaryslipdate}}</td>
                        <td width="15%" data-title="'Type'" filter="{type: 'text'}" sortable="'type'"><span
                                ng-show="applied.billtype==1"> Arrear </span><span
                                ng-show="applied.billtype==0"> Salary </span></td>

                        <td align="center" data-title="'Action'">

                            <span>
                                <span ng-show="applied.billtype==0">
                                    <a target="_blank"
                                        href="
                        <?php echo base_url('admin/printpayslip?projectid={{applied.projectid}}&monthandyear={{applied.monthandyear}}&payslipno={{applied.payslipno}}')?>"
                                        class="btn-floating btn-small">
                                        <i class="material-icons">print</i>
                                    </a>
                                </span>

                                <span ng-show="applied.billtype==1">
                                    <a target="_blank"
                                        href="
                        <?php echo base_url('admin/printclaimpayslip?projectid={{applied.projectid}}&monthandyear={{applied.monthandyear}}&payslipno={{applied.payslipno}}')?>"
                                        class="btn-floating btn-small">
                                        <i class="material-icons">print</i>
                                    </a>
                                </span>
                                <span ng-show="applied.billtype==0">
                                    <a target="_blank"
                                        href="
                        <?php echo base_url('admin/printfund?projectid={{applied.projectid}}&monthandyear={{applied.monthandyear}}&payslipno={{applied.payslipno}}')?>"
                                        class="btn-floating btn-small blue">
                                        <i class="material-icons">visibility</i>
                                    </a>
                                </span>
                            </span>
                            <span ng-show="applied.billtype==1">
                                <a target="_blank"
                                    href="
                        <?php echo base_url('admin/printclaimfund?projectid={{applied.projectid}}&monthandyear={{applied.monthandyear}}&payslipno={{applied.payslipno}}')?>"
                                    class="btn-floating btn-small blue">
                                    <i class="material-icons">visibility</i>
                                </a>
                            </span>
                            </span>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</div>
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
<style>
#duties table,
#duties td,
#duties th {
    border-collapse: collapse;
    border: 1px solid black;
}
</style>