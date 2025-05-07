<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ng-table.min.js") ?>"></script>
<link rel="stylesheet" type="text/css" href="<?php echo base_url("assets/css/ng-table.min.css") ?>" />
<script type="text/javascript" src="<?php echo base_url("assets/js/app/memberdelete.js") ?>"></script>
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
    h4 {
        margin-left: 20px !important;
        font-weight: 800;
        text-transform: uppercase;
    }
</style>
<div class="parallax-container" style="background-color: rgba(0, 12, 78, 0.9)">
    <div class="row">
        <div class="container">
            <div class="col s12 m6 l6">
                <div class="pagebannertext white-text">Delete Members (Ex-servicemens)</div>
            </div>
            <div class="col s12 m6 l6 right-align">
                <div class="dumheight hide-on-small-only"> </div>
                <div class=""> <a href="<?php echo base_url('admin/dashboard') ?>" class="breadcrumb">Home</a> 
                <span class="breadcrumb">Master</span> <span class="breadcrumb">Delete Employees</span> </div>
            </div>
        </div>
    </div>
    <div class="parallax"><img src="<?php echo base_url("assets/images/breadcrumbbanner.jpg") ?>">
    </div>
</div>
<div class="row" ng-app="appAdminMember">
    <div class="container" ng-controller="ctrlAdminMember">
        <!-- Modal Window for new and Edit -->
        <?php //echo $newmember 
        ?>
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
                                <button ng-click="searchmember(objmember.search_val)" style="background: green;top: 10px !important;color: #fff !important;" class="modal-action waves-effect waves-green btn-flat" type="submit">Search</button>
                            </div>
                        </div>
                        <br><br>
                        <div class="row" ng-if="members.length">
                            <h4 class="email-title">Member Details</h4>
                            <table ng-table="tableParams" class="responsive-table highlight striped" show-filter="true" class="bordered">
                                <tbody ng-repeat="searchmember in members">
                                    <tr>
                                        <td width="3%" data-title="'S.No'" sortable="'sno'">{{$index+1}}</td>

                                        <td width="8%" data-title="'Service No'" sortable="'serviceno'">{{searchmember.serviceno}}</td>

                                        <td width="10%" data-title="'Texco No'" sortable="'texcono'">{{searchmember.texcono}}</td>

                                        <td width="15%" data-title="'First Name'" sortable="'firstname'">{{searchmember.firstname}}</td>

                                        <td width="10%" data-title="'Mobile No'" sortable="'mobile'">{{searchmember.mobile}}</td>

                                        <td width="8%" data-title="'DOB'">{{searchmember.dob | date: 'dd-MM-yyyy'}}</td>

                                        <td width="20%" data-title="'View'" style="text-align: center;">
                                            <button ng-click="combinememberByID(searchmember.memberid,members)" style="background: green;color: #fff !important;" class="modal-action waves-effect waves-green btn-flat" type="submit" ng-hide = "members.length < 2">Combine</button>
                                            &nbsp;&nbsp;
                                            <button ng-click="deletememberByID(searchmember.memberid)" style="background: red;color: #fff !important;" class="modal-action waves-effect waves-green btn-flat" type="submit" ng-hide = "members.length < 2">Delete</button> 
                                            <span ng-hide = "members.length > 1"> -- </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <br><br>
                        <div class="row" ng-if="membershistory.length">
                            <h4>Posting Order Details</h4>
                            <table ng-table="tableParams" class="responsive-table highlight striped" show-filter="true" class="bordered">
                                <tbody ng-repeat="searchmemberhistory in membershistory">
                                    <tr>
                                        <td width="3%" data-title="'S.No'" sortable="'sno'">{{$index+1}}</td>
                                        <td width="8%" data-title="'Service No'" sortable="'serviceno'">{{searchmemberhistory.serviceno}}</td>

                                        <td width="10%" data-title="'Texco No'" sortable="'texcono'">{{searchmemberhistory.texcono}}</td>

                                        <td width="15%" data-title="'Project No'" sortable="'projectno'">{{searchmemberhistory.projectno}}</td>

                                        <td width="15%" data-title="'Project Name'" sortable="'projectname'">{{searchmemberhistory.projectname}}</td>

                                        <td width="10%" data-title="'Category'" sortable="'category'">{{searchmemberhistory.category}}</td>

                                        <td width="8%" data-title="'Start Date'">{{searchmemberhistory.startdate | date: 'dd-MM-yyyy'}}</td>

                                        <td width="8%" data-title="'End Date'">{{searchmemberhistory.enddate | date: 'dd-MM-yyyy'}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <br><br>
                        <div class="row" ng-if="appliedhistory.length">
                            <h4>Applied History</h4>
                            <table ng-table="tableParams" class="responsive-table highlight striped" show-filter="true" class="bordered">
                                <tbody ng-repeat="apphistory in appliedhistory">
                                    <tr>
                                        <td width="3%" data-title="'S.No'" sortable="'sno'">{{$index+1}}</td>
                                        <td width="8%" data-title="'Service No'" sortable="'serviceno'">{{apphistory.serviceno}}</td>

                                        <td width="10%" data-title="'Texco No'" sortable="'texcono'">{{apphistory.texcono}}</td>

                                        <td width="15%" data-title="'Project No'" sortable="'projectno'">{{apphistory.projectno}}</td>

                                        <td width="15%" data-title="'Project Name'" sortable="'projectname'">{{apphistory.projectname}}</td>

                                        <td width="10%" data-title="'Category'" sortable="'createdttm'">{{apphistory.createdttm | date: 'dd-MM-yyyy'}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script type="text/javascript">

        $("#search_val").keyup(function(event) {
            if (event.keyCode === 13) {
                $("#btntexser").click();
            }
        });

        var orginal_text = $('#esmidno').val();
        var regular_expression = '/^' + orginal_text + '/';
        $('#esmidno').keyup(function() {
            var current_text = $('#esmidno').val();
            if (current_text.match('^' + orginal_text + '') == null) {
                $('#esmidno').val(orginal_text + current_text)
            }
        });

        function isNumberKey(evt) {
            var charCode = (evt.which) ? evt.which : event.keyCode;
            console.log(charCode);
            if (charCode != 46 && charCode != 45 && charCode > 31 &&
                (charCode < 48 || charCode > 57))
                return false;

            return true;
        }
    </script>

    <script>
        $('.datepicker').pickadate({
            labelMonthNext: 'Go to the next month',
            labelMonthPrev: 'Go to the previous month',
            labelMonthSelect: 'Pick a month from the dropdown',
            labelYearSelect: 'Pick a year from the dropdown',
            selectMonths: true,
            selectYears: true,
            autoClose: true,
            min: new Date()
        })
        $('#effectivedate').pickadate({
            labelMonthNext: 'Go to the next month',
            labelMonthPrev: 'Go to the previous month',
            labelMonthSelect: 'Pick a month from the dropdown',
            labelYearSelect: 'Pick a year from the dropdown',
            selectMonths: true,
            selectYears: true,
            min: new Date(),
            autoClose: true
        });

        //Time Picker:
        $('.timepicker').pickatime({
            default: 'now',
            twelvehour: false, // change to 12 hour AM/PM clock from 24 hour
            donetext: 'OK',
            autoclose: false,
            vibrate: true, // vibrate the device when dragging clock hand
            min: new Date(),
        });
    </script>