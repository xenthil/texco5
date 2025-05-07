<script type="text/javascript" src="<?php echo base_url("assets/js/app/setting.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ng-file-upload.min.js")?>"></script>
<div class="parallax-container" style="background-color: rgba(0, 12, 78, 0.9)">
    <div class="row">
        <div class="container">
            <div class="col s12 m6 l6">
                <div class="pagebannertext white-text">Settings</div>
            </div>
            <div class="col s12 m6 l6 right-align">
                <div class="dumheight hide-on-small-only"> </div>
                <div class=""> <a href="<?php echo base_url('admin/dashboard')?>" class="breadcrumb">Home</a> <span class="breadcrumb">Settings</span> </div>
            </div>
        </div>
    </div>
    <div class="parallax"><img src="<?php echo base_url("assets/images/breadcrumbbanner.jpg")?>">
    </div>
</div>

<div class="row" ng-app="appSetting">
    <div class="container" ng-controller="ctrlSetting">
        
        <!-- Modal Structure -->
        <div id="modal1" class="modal modal-fixed-footer" style="max-width: 550px; max-height:90%;">
            <div class="modal-content">

                <nav class="blue" style="position: fixed;margin-top: 0px; z-index:999;">
                    <div class="left col s1 m1 l1">
                        <div class="white-text">
                        <a href=""><i class="modal-action modal-close mdi white-text mdi-arrow-left"></i></a>
                         </div>
                    </div>
                    <div class="col s11 m11 l11">
                        <div class="li white-text" id="mcaption">Edit Settings</div>
                    </div>
                </nav>
                <div class="row" style="padding: 24px;">
                    <form ng-submit="savesetting(objsettings, picFile)" id="settingform" name="settingform" novalidate>
                        <div class="row" style="padding: 40px;">
                            <div class="col s12">

                                <input type="hidden" ng-model="objsettings.settingid">

                                <div class="row">
                                    <div class="input-field col s6">
                                        <input id="code" type="text" type="text" ng-minlength="2" ng-model="objsettings.code" readonly>
                                        <label for="code">Code</label>
                                    </div>
                                    <div  class="input-field col s6">
                                        <input id="description" name="description" type="text"  ng-model="objsettings.description" ng-required="true"  ng-class="{'submitted': submitted && settingform.description.$invalid }" class="validate" >
                                        <label for="description" data-error="Required">Description</label>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="input-field col s12">
                                        <input id="value" type="text" class="validate" type="text" ng-model="objsettings.value">
                                        <label for="value">Value</label>
                                    </div>
                                </div>

                                <div ng-show="objsettings.code == 'BAN' " class="row">


                                    <div class="file-field input-field">
                                        <div class="btn">
                                            <span>File</span>
                                            <input id="file" type="file" ngf-select accept=".doc, .docx,.pdf" ng-change="changeName(picFile.name)" ng-model="picFile" name="file">
                                        </div>

                                        <div class="file-path-wrapper">
                                            <input id="filepath" class="file-path validate" type="text" ng-model="objdocument.documentname" ng-required="!objdocument.documentname">
                                        </div>

                                        <span ng-show="!objdocument.documentname.length">Please Select File!</span>
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
                            <li class="collection-item avatar waves-effect waves-teal col s12" ng-class="{selected: setting.settingid === selected.settingid}" ng-repeat="setting in settings | filter: filter">
                                <a href="javascript::void(0)" ng-click="select(setting)">
                                    <div style="margin-top: 10px;"><span class="circle light-blue" style="padding: 10px;">{{setting.description.slice(0,1)}}
                              </span> <span class="email-title">{{setting.description}}</span>
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
                                        </li>
                                    </ul>
                                </div>
                                <div class="col s2 m2 l2 right-align resultframe">
                                <?php if($roledata['permissions']['ESETTINGS']==1) {?>   
                                    <a id="editsetting" ng-click="editsetting()"><span><i class="small icon darken-1 mdi mdi-account-edit"></i></span></a>
                                <?php } ?>
                                </div>
                            </div>
                            
                            <div class="row">
                                <div class="col  s12 m6 l6">
                                    <p class="blue-grey-text"><strong>Description</strong> </p>
                                    <p>{{selected.description}}</p>
                                </div>
                                <div class="col s12 m6 l6">
                                    <p class="blue-grey-text"><strong>Code</strong> </p>
                                    <p>{{selected.code}}</p>
                                </div>
                            </div>
                            <div class="row">
                             <div class="col  s12 m12 l12">
                                    <p class="blue-grey-text"><strong>Value</strong> </p>
                                    <p>{{selected.value}}</p>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>