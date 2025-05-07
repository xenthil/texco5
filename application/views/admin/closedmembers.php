<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ng-table.min.js") ?>"></script>
<link rel="stylesheet" type="text/css" href="<?php echo base_url("assets/css/ng-table.min.css") ?>" />
<script type="text/javascript" src="<?php echo base_url("assets/js/app/closedmembers.js") ?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ui-bootstrap-tpls-0.11.0.js") ?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/jquery.formatter.min.js") ?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ui-bootstrap-tpls-0.11.0.js") ?>"></script>
<script src="<?php echo base_url("assets/js/lib/underscore.js")?>" charset="utf-8"></script>
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
                <div class="pagebannertext white-text">Closed Project Members (Ex-servicemens)</div>
            </div>
            <div class="col s12 m6 l6 right-align">
                <div class="dumheight hide-on-small-only"> </div>
                <div class=""> <a href="<?php echo base_url('admin/dashboard') ?>" class="breadcrumb">Home</a> 
                <span class="breadcrumb">Master</span>
                <span class="breadcrumb">Closed Project Employees</span> </div>
            </div>
        </div>
    </div>
    <div class="parallax"><img src="<?php echo base_url("assets/images/breadcrumbbanner.jpg") ?>">
    </div>
</div>
<div class="row" ng-app="appAdminMembers">
    <div class="container" ng-controller="ctrlAdminMembers">
        <div id="" class="section">
            <div class="row">
                <div class="col s12 ">
                    <div id="Client-list" class="CLheight col s12 m12 12 card-panel z-depth-1">
                        <div class="row">
                            <div class="input-field col s6">
                                <input name="search_val" id="search_val" class="month_year" type="text" ng-model="objmember.search_val" placeholder="Search Texcono Or Service No or Mobile No" />
                                <label for="">Search </label>
                            </div>
                            <div class="input-field col s6">
                                <button ng-click="searchmember(objmember.search_val)" id="btntexser" style="background: green;top: 10px !important;color: #fff !important;" class="modal-action waves-effect waves-green btn-flat" type="submit">Search</button>

                                <button id="btntexser" ng-click="clearmember()" style="background: orange;top: 10px !important;color: #fff !important;" class="modal-action waves-effect waves-green btn-flat" type="reset">Clear</button>
                            </div>
                        </div>
                        <br>
                        <div id="Client-details" class="col s12 m12 l12 card-panel z-depth-1" ng-if="!selected.firstname">     
                            <div class="col s12">
                                <ul class="tabs">
                                    <li class="tab col s6"><a ng-click="resetproj()" class="active" id="pending" href="#notApplied">Not Applied</a></li>
                                    <li class="tab col s6"><a  ng-click="resetproj()" id="Approved" href="#gotSelected">Got Selected</Select></a></li>
                                </ul>
                            </div>
                            <div id="notApplied" class="col s12">
                                <table ng-table="tableParams" class="responsive-table highlight striped" fixed-table-headers="scrollable-area" show-filter="true" class="bordered">
                                    <tbody ng-repeat="closedlist in ClosedListMembers">
                                        <tr ng-if="closedlist.isselected == 0 && (closedlist.isapplied == 0 || closedlist.isapplied == 1)">
                                            <td width="10%" data-title="'SNO'">{{$index + 1}}</td> 
                                            <td width="25%" data-title="'First Name'" sortable="'firstname'">{{closedlist.firstname}}</td>
                                            <td width="18%" data-title="'Texco No'" sortable="'texcono'">{{closedlist.texcono}}</td>
                                            <td width="17%" data-title="'Service No'" sortable="'serviceno'">{{closedlist.serviceno}}</td>
                                            <td width="15%" data-title="'Status'" sortable="'isapplied'">
                                                <span ng-if="closedlist.isapplied == 1"> Applied </span>
                                                <span ng-if="closedlist.isselected == 1 && closedlist.isapplied == 1"> Selected </span>
                                                <span ng-if="closedlist.isapplied == 0 && closedlist.isselected == 0"> Not Applied </span>
                                            </td>
                                            <td width="15%" data-title="'Action'">
                                                <button id="btntexser" ng-click="deletemember(closedlist)" style="background: orange;color: #fff !important;" class="modal-action waves-effect waves-green btn-flat" type="button">Delete</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div id="gotSelected" class="col s12">
                                <table ng-table="tableParams" class="responsive-table highlight striped" fixed-table-headers="scrollable-area" show-filter="true" class="bordered">
                                    <tbody ng-repeat="closedlist in GotSelectedMembers">
                                    <tr ng-if="closedlist.isselected == 1 && closedlist.isapplied == 1">
                                            <td width="10%" data-title="'SNO'">{{$index + 1}}</td> 
                                            <td width="25%" data-title="'First Name'" sortable="'firstname'">{{closedlist.firstname}}</td>
                                            <td width="18%" data-title="'Texco No'" sortable="'texcono'">{{closedlist.texcono}}</td>
                                            <td width="17%" data-title="'Service No'" sortable="'serviceno'">{{closedlist.serviceno}}</td>
                                            <td width="15%" data-title="'Status'" >
                                                <span ng-if="closedlist.isselected == 1 && closedlist.isapplied == 1"> Selected </span>
                                            </td>
                                            <td width="15%" data-title="'Action'">
                                                <button id="btntexser" ng-click="deletemember(closedlist)" style="background: orange;color: #fff !important;" class="modal-action waves-effect waves-green btn-flat" type="button">Delete</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div id="Client-details" class="col s12 m12 l12 card-panel z-depth-1" ng-if="selected.firstname">
                            <div class="email-content-wrap">
                                <div class="row z-depth-1" style="background-color: #eee;">
                                    <div class="col s12 m10 l10">
                                        <ul class="collection">
                                            <li class="collection-item avatar" style="background-color:transparent">
                                                <img src="<?php echo base_url("assets/images/photo.png") ?>" alt="" class="circle">
                                                <span class="email-title">{{selected.firstname}} {{selected.lastname}}</span>
                                                <p class="truncate grey-text ultra-small">{{selected.texcono}}</p>
                                                <p class="grey-text ultra-small">{{selected.serviceno}}</p>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="col s2 m2 l2 right-align resultframe">
                                        <button ng-click="savememberToClosed(selected)" style="background: green;top: 10px !important;color: #fff !important;" class="modal-action waves-effect waves-green btn-flat" type="submit">Add</button>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col s12 m3 l3">
                                        <p class="blue-grey-text"><strong>First Name</strong> </p>
                                        <p>{{selected.firstname}} </p>
                                    </div>
                                    <div class="col s12 m3 l3">
                                        <p class="blue-grey-text"><strong>Mobile</strong> </p>
                                        <p>{{selected.mobile}}</p>
                                    </div>
                                    <div class="col s12 m3 l3">
                                        <p class="blue-grey-text"><strong>Service No(Army No)</strong> </p>
                                        <p>{{selected.serviceno}}</p>
                                    </div>
                                    <div class="col  s12 m3 l3">
                                        <p class="blue-grey-text"><strong>Texco No</strong> </p>
                                        <p>{{selected.texcono}}</p>
                                    </div>
                                </div>
                                <div class="row">
                                   
                                </div>
                            </div>
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