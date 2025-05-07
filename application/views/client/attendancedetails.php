<script type="text/javascript" src="<?php echo base_url("assets/js/app/attendancedetails.js")?>"></script>
<script type="text/javascript">
    var clientid = <?php echo $clientid;?>;
</script>

<div class="parallax-container" style="background-color: rgba(0, 12, 78, 0.9)">
    <div class="row">
        <div class="container">
            <div class="col s12 m6 l6">
                <div class="pagebannertext white-text">Attendance</div>
            </div>
            <div class="col s12 m6 l6 right-align">
                <div class="dumheight hide-on-small-only"> </div>
                <div class=""> <a href="<?php echo base_url('client/dashboard')?>" class="breadcrumb">Home</a> <span class="breadcrumb">Attendance</span> </div>
            </div>
        </div>
    </div>
    <div class="parallax"><img src="<?php echo base_url("assets/images/breadcrumbbanner.jpg")?>">
    </div>
</div>

<div class="row" ng-app="appAttendance">
    <div class="container" ng-controller="ctrlAttendance">
       
        <!-- Modal Structure -->
        <div id="modal1" class="modal modal-fixed-footer" style="max-width: 550px; max-height:90%;">
            <div class="modal-content">

                <nav class="blue" style="position: fixed;margin-top: 0px; z-index:999">
                    <div class="left col s1 m1 l1">
                        <div class="white-text"><a href=""><i class="modal-action modal-close mdi white-text mdi-arrow-left"></i></a> </div>
                    </div>
                    <div class="col s11 m11 l11">
                        <div class="li white-text" id="mcaption">Edit Attendance</div>
                    </div>
                </nav>

                <div class="row" style="padding: 24px;">
                    <form ng-submit="attendanceform.$valid && attendance(obj)" id="attendanceform" name="attendanceform" novalidate="novalidate">
                        <div class="row" style="height:40px;">&nbsp;</div>
                        <div class="row">
                            <div class="col s12">
                                <input type="hidden" ng-model="obj.attendanceid">

                                <div class="row">
                                    <div class="input-field col s6">
                                        <input id="firstname" name="firstname" type="text" ng-model="obj.firstname" readonly>
                                        <label for="firstname" >First Name</label>
                                    </div>
                                    <div class="input-field col s6">
                                        <input id="lastname" name="lastname" type="text" ng-model="obj.texcono" readonly>
                                        <label for="lastname">Texco No</label>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="input-field col s6">
                                        <input id="doj" type="date" class="datepicker" type="text"  ng-model="obj.fromdate">
                                        <label for="fromdate">Fromdate</label>
                                    </div>
                                    <div class="input-field col s6">
                                       <input id="doj" type="date" class="datepicker" type="text"    ng-model="obj.todate">
                                        <label for="todate">Todate</label>
                                    </div>
                                </div>
                                <div class="row">
                                <div class="input-field col s6">
                                        <input id="projectname" name="projectname"  type="text" class="validate" ng-required="true" ng-model="obj.projectname">
                                        <label for="project">Project Name</label>
                                    </div>
                                    
                                    <div class="input-field col s6">
                                        <input type="number" name="days" min="1" max="31" ng-required="true" ng-model="obj.days">
                                        <label for="days">Days</label>
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
            </div>
            </form>
        </div>

        <div id="" class="section">
            <div class="row">
                <div class="col s12 ">
                    <div id="Client-list" class="CLheight col s12 m4 l4 card-panel z-depth-1">
                        <ul class="collection">
                            <div class="row">
                                <div class="col s12">
                                    <nav class="indigo">
                                        <div class="nav-wrapper">
                                            <div class="left col s12">
                                                <div class="input-field col s12"> <i class="material-icons prefix">search</i>
                                                    <input id="icon_prefix" placeholder="search" type="text" class="validate" ng-model="filter">
                                                </div>
                                            </div>
                                        </div>
                                    </nav>
                                </div>
                            </div>

                            <li class="collection-item avatar" ng-class="{selected: attendance.attendanceid === selected.attendanceid}" ng-repeat="attendance in attendancedetails | filter: filter">
                                <a href="javascript::void(0)" ng-click="select(attendance)">
                                    <div style="margin-top: 10px;"><span class="circle light-blue" style="padding: 10px;">{{attendance.firstname.slice(0,1)}}</span>
                                        <span class="email-title">{{attendance.firstname}} -{{attendance.lastname}}</span>
                                        <p class="truncate grey-text ultra-small">{{attendance.projectname}} </p>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div id="Client-details" class="col s10 m8 l8 card-panel z-depth-1">
                        <div class="email-content-wrap">

                            <div class="row z-depth-1" style="background-color: #eee;">
                                <div class="col s12 m10 l10">
                                    <ul class="collection">
                                        <li class="collection-item avatar" style="background-color:transparent">
                                            <img src="<?php echo base_url("assets/images/photo.png")?>" alt="" class="circle">
                                            <span class="email-title">{{selected.firstname}} -{{selected.lastname}} </span>
                                            <p class="truncate grey-text ultra-small">{{selected.projectname}} </p>
                                            <p class="grey-text ultra-small"></p>
                                        </li>
                                    </ul>
                                </div>
                                <div class="col s2 m2 l2 right-align resultframe">
                               
                                    <a ng-click='removeattendance()'><span><i class="small icon mdi mdi-delete"></i></span></a>
                               
                                    <a id="editattendance" ng-click="editattendance()"><span><i class="small icon darken-1 mdi mdi-account-edit"></i></span></a>
                               
                                </div>
                            </div>

                            <div class="row">
                                <div class="col s12 m6 l6">
                                    <p class="blue-grey-text"><strong>Project Name</strong> </p>
                                    <p>{{selected.projectname}} </p>
                                </div>

                                <div class="col  s12 m6 l6">
                                    <p class="blue-grey-text"><strong>Memebr</strong> </p>
                                    <p>{{selected.firstname}}-{{selected.lastname}}</p>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col s12 m6 l6">
                                    <p class="blue-grey-text"><strong>Fromdate</strong> </p>
                                    <p>{{selected.fromdate}} </p>
                                </div>

                                <div class="col  s12 m6 l6">
                                    <p class="blue-grey-text"><strong>Todate</strong> </p>
                                    <p>{{selected.todate}}</p>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col s12 m6 l6">
                                    <p class="blue-grey-text"><strong>Days</strong> </p>
                                    <p>{{selected.days}} </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
