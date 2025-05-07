<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ng-table.min.js") ?>"></script>
<link rel="stylesheet" type="text/css" href="<?php echo base_url("assets/css/ng-table.min.css") ?>" />
<script type="text/javascript" src="<?php echo base_url("assets/js/app/expmembers.js") ?>"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.3/angular-sanitize.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/ng-csv/0.3.3/ng-csv.min.js"></script>
<script type="text/javascript">
    var memberid = 0;
</script>

<div class="parallax-container" style="background-color: rgba(0, 12, 78, 0.9)">
    <div class="row">
        <div class="container">
            <div class="col s12 m6 l6">
                <div class="pagebannertext white-text">Employees (Ex-servicemens)</div>
            </div>
            <div class="col s12 m6 l6 right-align">
                <div class="dumheight hide-on-small-only"> </div>
                <div class=""> <a href="<?php echo base_url('admin/dashboard') ?>" >Home</a> 
                <span class="breadcrumb">Master</span> <span class="breadcrumb" style="background-color: transparent;">Employees (Above 58)</span> </div>
            </div>
        </div>
    </div>
    <div class="parallax"><img src="<?php echo base_url("assets/images/breadcrumbbanner.jpg") ?>">
    </div>
</div>

<div class="row" ng-app="appAdminEXPMember">
    <div class="container" ng-controller="ctrlAdminEXPMember">

        <div class="col s12 m12 l12">
            <button type="button" class="btn btn-default btncol" ng-csv="expiredmembers" filename="MemberHistory_Details.csv" csv-header="['FIRST NAME', 'LAST NAME', 'FATHER NAME', 'DOB', 'AGE','EMAIL', 'MOBILE NO','ADDRESS', 'COMUNICATION ADDRESS', 'AADHAAR NO', 'ACCOUNT NO', 'NOMINEE', 'ESMID NO','CIVIL QUALIFICATION', 'ARMY QUALIFICATION', 'DEPENDENT STATUS', 'DEPENDENT NAME', 'NATIONALITY', 'REGISTRATION NO','LAST ACCESS', 'SERVICE NO', 'TEXCO NO', 'PAN NO', 'UAN NO']" charset="utf-8" style="background: green;color: #fff !important;float:right;margin:10px;"><span class="glyphicon glyphicon-download-alt">&nbsp;</span>Download</button>
            &nbsp;&nbsp;
            <button type="button" class="btn btn-default btncol" ng-csv="expiredmembersworking" filename="MemberHistory_Working_Persons.csv" csv-header="['FIRST NAME', 'LAST NAME', 'FATHER NAME', 'DOB', 'AGE','EMAIL', 'MOBILE NO','ADDRESS', 'COMUNICATION ADDRESS', 'AADHAAR NO', 'ACCOUNT NO', 'NOMINEE', 'ESMID NO','CIVIL QUALIFICATION', 'ARMY QUALIFICATION', 'DEPENDENT STATUS', 'DEPENDENT NAME', 'NATIONALITY', 'REGISTRATION NO','LAST ACCESS', 'SERVICE NO', 'TEXCO NO', 'PAN NO', 'UAN NO']" charset="utf-8" style="background: green;color: #fff !important;float:right;margin:10px;"><span class="glyphicon glyphicon-download-alt">&nbsp;</span>Working Members</button>
        </div>
        <!-- Modal Window for new and Edit -->
        <!-- Modal Structure -->
        <?php echo $newmember ?>
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
                            <div class="scroll"> 
                                <li class="collection-item avatar waves-effect waves-teal col s12"ng-repeat="member in expiredmembers | filter: filter | limitTo:1000:1000"  ng-class="{selected: member.memberid === selected.memberid}" > 
                                    <a href="javascript::void(0)" ng-click="select(member)">
                                        <div style="margin-top: 10px;">
                                            <span class="circle light-blue" style="padding: 10px;">{{member.firstname.slice(0,1)}}</span>
                                            <span class="email-title">{{member.firstname}}</span>
                                            <p class="truncate grey-text ultra-small">{{member.texcono}}</p>
                                            <p class="truncate grey-text ultra-small">{{member.serviceno}}</p>
                                        </div>
                                    </a>
                                </li>
                                <div>
                        </ul>
                    </div>
                    <div id="Client-details" class="col s12 m8 l8 card-panel z-depth-1">
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
                            </div>
                            <div class="row">
                                <div class="col s12 m6 l6">
                                    <p class="blue-grey-text"><strong>First Name</strong> </p>
                                    <p>{{selected.firstname}} </p>
                                </div>
                                <div class="col s12 m6 l6">
                                    <p class="blue-grey-text"><strong>Father Name</strong> </p>
                                    <p>{{selected.fathername}} </p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col  s12 m6 l6">
                                    <p class="blue-grey-text"><strong>DOB & AGE</strong> </p>
                                    <p>{{selected.dob}} & {{selected.age}}</p>
                                </div>
                                <div class="col s12 m6 l6">
                                    <p class="blue-grey-text"><strong>Email</strong> </p>
                                    <p>{{selected.email}} </p>
                                </div>
                            </div>
                            <div class="row">

                                <div class="col  s12 m6 l6">
                                    <p class="blue-grey-text"><strong>Mobile</strong> </p>
                                    <p>{{selected.mobile}}</p>
                                </div>
                                <div class="col s12 m6 l6">
                                    <p class="blue-grey-text"><strong>Gender</strong> </p>
                                    <p>{{selected.genderid ? "Female":"Male"}} </p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col s12 m6 l6">
                                    <p class="blue-grey-text"><strong>Address</strong> </p>
                                    <p style=" max-width:400px;word-wrap:break-word;">{{selected.address}} </p>
                                </div>
                                <div class="col s12 m6 l6">
                                    <p class="blue-grey-text"><strong>Address for communication</strong> </p>
                                    <p>{{selected.communicationaddress}}</p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col  s12 m6 l6">
                                    <p class="blue-grey-text"><strong>Aadhaar No</strong> </p>
                                    <p>{{selected.aadhaarno}}</p>
                                </div>
                                <div class="col s12 m6 l6">
                                    <p class="blue-grey-text"><strong>Nominee</strong> </p>
                                    <p>{{selected.nominee}}</p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col  s12 m6 l6">
                                    <p class="blue-grey-text"><strong>Ex ID No</strong> </p>
                                    <p>{{selected.esmidno}}</p>
                                </div>
                                <div class="col s12 m6 l6">
                                    <p class="blue-grey-text"><strong>Army Qualification</strong> </p>
                                    <p>{{selected.armyqual}}</p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col  s12 m6 l6">
                                    <p class="blue-grey-text"><strong>Civil Qualification</strong> </p>
                                    <p>{{selected.civilqual}}</p>
                                </div>
                                <div class="col s12 m6 l6">
                                    <p class="blue-grey-text"><strong>Dependent</strong> </p>
                                    <p ng-show="selected.dependentstatus==1">Yes</p>
                                </div>
                            </div>
                            <div class="row" ng-hide="selected.dependentstatus == 0">
                                <div class="col  s12 m6 l6">
                                    <p class="blue-grey-text"><strong>Dependent Name</strong> </p>
                                    <p>{{selected.dependentname}}</p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col s12 m6 l6">
                                    <p class="blue-grey-text"><strong>Service No(Army No)</strong> </p>
                                    <p>{{selected.serviceno}}</p>
                                </div>
                                <div class="col  s12 m6 l6">
                                    <p class="blue-grey-text"><strong>Account No</strong> </p>
                                    <p>{{selected.accountno}} </p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col s12 m6 l6">
                                    <p class="blue-grey-text"><strong>Registration No</strong> </p>
                                    <p>{{selected.registrationno}}</p>
                                </div>
                                <div class="col  s12 m6 l6">
                                    <p class="blue-grey-text"><strong>Texco No</strong> </p>
                                    <p>{{selected.texcono}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
