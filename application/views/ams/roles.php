<script type="text/javascript" src="<?php echo base_url("assets/js/app/roles.js")?>"></script>

<div class="parallax-container" style="background-color: rgba(0, 12, 78, 0.9)">
    <div class="row">
        <div class="container">
            <div class="col s12 m6 l6">
                <div class="pagebannertext white-text">Permissions</div>
            </div>
            <div class="col s12 m6 l6 right-align">
                <div class="dumheight hide-on-small-only"> </div>
                <div class=""> <a href="<?php echo base_url('admin/dashboard')?>" class="breadcrumb">Home</a> <span class="breadcrumb">Permissions</span> </div>
            </div>
        </div>
    </div>
    <div class="parallax"><img src="<?php echo base_url("assets/images/breadcrumbbanner.jpg")?>">
    </div>
</div>


<div class="row" ng-app="appAdminRoles">
    <div class="container" ng-controller="ctrlAdminRoles">
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
                            <li class="collection-item avatar waves-effect waves-teal col s12" ng-class="{selected: role.roleid === selected.roleid}" ng-repeat="role in roles | filter: filter">
                                <a href="javascript::void(0)" ng-click="select(role)">
                                    <div style="margin-top: 10px;"><span class="circle light-blue" style="padding: 10px;">{{role.description.slice(0,1)}}</span>
                                        <span class="email-title">{{role.description}}</span>
                                        <p class="truncate grey-text ultra-small">{{role.name}}</p>
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
                                            <span class="email-title">{{selected.description}}</span>
                                            <p class="truncate grey-text ultra-small">Permissions</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div class="row">
                                <div class="container">
                                    <div class="row">
                                        <div class="col s12 m4 l3" ng-repeat="permission in selected.permissions">
                                            <p>
                                                <input type="checkbox" id="{{permission.rolepermissionid}}" ng-checked="{{permission.selected}}" ng-true-value="1" ng-false-value="0" ng-model="selectedid" ng-change="rolepermission(permission)" />
                                                <label for="{{permission.rolepermissionid}}">{{permission.name}}</label>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>