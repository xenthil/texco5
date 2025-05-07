<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ng-table.min.js") ?>"></script>
<link rel="stylesheet" type="text/css" href="<?php echo base_url("assets/css/ng-table.min.css") ?>" />
<script type="text/javascript" src="<?php echo base_url("assets/js/app/rejectedvacancy.js") ?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ui-bootstrap-tpls-0.11.0.js") ?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/jquery.formatter.min.js") ?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ui-bootstrap-tpls-0.11.0.js") ?>"></script>
<link rel='stylesheet prefetch' href='https://cdn.rawgit.com/chingyawhao/materialize-clockpicker/master/dist/css/materialize.clockpicker.css'>
<script src='https://cdn.rawgit.com/chingyawhao/materialize-clockpicker/master/dist/js/materialize.clockpicker.js'></script>
<script type="text/javascript">
    var memberid = 0;
</script>
<style>
    td.ng-binding {
        text-align: center !important;
    }
</style>
<div class="parallax-container" style="background-color: rgba(0, 12, 78, 0.9)">
    <div class="row">
        <div class="container">
            <div class="col s12 m6 l6">
                <div class="pagebannertext white-text">Rejected Vacancy</div>
            </div>
            <div class="col s12 m6 l6 right-align">
                <div class="dumheight hide-on-small-only"> </div>
                <div class=""> <a href="<?php echo base_url('admin/dashboard') ?>" class="breadcrumb">Home</a> 
                <span class="breadcrumb">Jobs</span>
                <span class="breadcrumb">Employees</span> </div>
            </div>
        </div>
    </div>
    <div class="parallax"><img src="<?php echo base_url("assets/images/breadcrumbbanner.jpg") ?>">
    </div>
</div>
<div class="row" ng-app="appAdminRejMembers">
    <div class="container" ng-controller="ctrlAdminRejMembers">
        <div id="" class="section">
            <div class="row">
                <div class="col s12 ">
                    <div id="Client-list" class="CLheight col s12 m12 12 card-panel z-depth-1">
                        <div class="row">
                            <table ng-table="tableParams" class="responsive-table highlight striped" fixed-table-headers="scrollable-area" show-filter="true" class="bordered">
                                <tbody ng-repeat="rejected in rejectedvacancy">
                                    <tr>
                                        <td width="7%" data-title="'SNo'">{{$index + 1}}</td> 
                                        <td width="7%" data-title="'Project No'" sortable="'projectno'">{{rejected.projectno}}</td>
                                        <td width="15%" data-title="'Project Name'" filter="{projectname: 'text'}" sortable="'name'">{{rejected.name}}</td>
                                        <td width="10%" data-title="'First Name'" filter="{firstname: 'text'}" sortable="'firstname'">{{rejected.firstname}}</td>
                                        <td width="10%" data-title="'Service No'" filter="{serviceno: 'text'}" sortable="'serviceno'">{{rejected.serviceno}}</td>
                                        <td width="10%" data-title="'Texco No'" filter="{texcono: 'text'}" sortable="'texcono'">{{rejected.texcono}}</td>
                                        <td width="15%" data-title="'Closed Date'">{{rejected.closeddate}}</td>
                                        <td width="25%" data-title="'Action'">
                                            <button ng-click="MoveToCarryforwardByID(rejected)" style="background: green;color: #fff !important;" class="modal-action waves-effect waves-green btn-flat" type="submit">Move To Draft</button> &nbsp;&nbsp;&nbsp;
                                            <button ng-click="DeleteRejectedVacancy(rejected)" style="background: red;color: #fff !important;" class="modal-action waves-effect waves-green btn-flat" type="submit">Delete</button>
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
</div>
<script>
    $("#search_val").keyup(function(event) {
        if (event.keyCode === 13) {
            $("#btntexser").click();
        }
    });
</script>