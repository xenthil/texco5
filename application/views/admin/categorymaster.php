<script type="text/javascript" src="<?php echo base_url("assets/js/app/jobmaster.js")?>"></script>
<script src="<?php echo base_url("assets/js/lib/underscore.js")?>" charset="utf-8"></script>

<div class="parallax-container" style="background-color: rgba(0, 12, 78, 0.9)">
    <div class="row">
        <div class="container">
            <div class="col s12 m6 l6">
                <div class="pagebannertext white-text">Category Master</div>
            </div>
            <div class="col s12 m6 l6 right-align">
                <div class="dumheight hide-on-small-only"> </div>
                <div class=""> <a href="<?php echo base_url('admin/dashboard')?>" class="breadcrumb">Home</a> 
                <span class="breadcrumb">Settings</span> <span
                        class="breadcrumb">Category</span> </div>
            </div>
        </div>
    </div>
    <div class="parallax"><img src="<?php echo base_url("assets/images/breadcrumbbanner.jpg")?>"> </div>
</div>

<div class="row" ng-app="appJobmaster">
    <div class="container" ng-controller="ctrlJobmaster">
        <!-- Modal Window for new and Edit -->

        <div class="fixed-action-btn" style="bottom: 125px; right: 19px;">
            <?php if($roledata['permissions']['ADDCATEGRY']==1) {?>
            <a class="btn-floating btn-large red modal-trigger" title="Add Category" href="#modal1"
                ng-click='addcategory()'>
                <i class="mdi mdi-account-plus"></i>
            </a>
            <?php } ?>
        </div>

        <div class="fixed-action-btn" style="bottom: 50px; right: 19px;">
            <?php if($roledata['permissions']['ADDCATEGRY']==1) {?>
            <a class="btn-floating btn-large red modal-trigger" title="Add Sub Category" href="#modal2"
                ng-click='addsubcategory()'>
                <i class="mdi mdi-account-plus"></i>
            </a>
            <?php } ?>
        </div>

        <!-- Modal Structure -->
        <div id="modal1" class="modal modal-fixed-footer" style="max-width: 550px;max-height:60%;">
            <div class="modal-content">
                <nav class="blue" style="position: fixed;margin-top: 0px; z-index:999">
                    <div class="left col s1 m1 l1">
                        <div class="white-text"><a href=""><i
                                    class="modal-action modal-close mdi white-text mdi-arrow-left"></i></a> </div>
                    </div>
                    <div class="col s11 m11 l11">
                        <div class="li white-text" id="mcaption">Add Category Master</div>
                    </div>
                </nav>
                <div class="row" style="padding: 24px;">
                    <form ng-submit="caegorymasterform.$valid && savecategorymaster(categorymaster)"
                        id="caegorymasterform" name="caegorymasterform" novalidate>
                        <div class="row" style="height:40px;">&nbsp;</div>
                        <div class="row">
                            <div class="col s12">
                                <input type="hidden" ng-model="categorymaster.categoryid">
                                <div class="row">
                                    <div class="input-field col s6">
                                        <select id="wagetype" name="wagetype" class="validate" ng-required="true"
                                            ng-class="{'submitted': submitted && caegorymasterform.wagetype.$invalid}"
                                            ng-model="categorymaster.wagetype"
                                            data-ng-options="at.lkvalid as at.description for at in wagetype">
                                        </select><label for="wagetype">Wage Type</label>
                                    </div>
                                    <div class="input-field col s6">
                                        <input id="name" name="name" type="text"
                                            ng-class="{'submitted': submitted && caegorymasterform.name.$invalid}"
                                            class="validate" maxlength="100" ng-model="categorymaster.categoryname"
                                            ng-required="true">
                                        <label for="name" data-error="Required">Category Name</label>
                                    </div>
                                </div>
                                <div id="failure" class="red-text"></div>
                            </div>
                        </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="waves-effect waves-green btn-flat" type="submit" ng-click="submitted=true;"> Save
                </button>
                <a href="" class="modal-action modal-close waves-effect btn-flat ">Cancel</a>
            </div>
            </form>
        </div>

        <div id="modal2" class="modal modal-fixed-footer" style="max-width: 550px;max-height:60%;">
            <div class="modal-content">
                <nav class="blue" style="position: fixed;margin-top: 0px; z-index:999">
                    <div class="left col s1 m1 l1">
                        <div class="white-text"><a href=""><i
                                    class="modal-action modal-close mdi white-text mdi-arrow-left"></i></a> </div>
                    </div>
                    <div class="col s11 m11 l11">
                        <div class="li white-text" id="mcaption2">Add Sub Category</div>
                    </div>
                </nav>
                <div class="row" style="padding: 24px;">
                    <form ng-submit="subcategorymasterform.$valid && savesubcategorymaster(subcategorymaster)"
                        id="subcategorymasterform" name="subcategorymasterform" novalidate>
                        <div class="row" style="height:40px;">&nbsp;</div>
                        <div class="row">
                            <div class="col s12">
                                <input type="hidden" ng-model="subcategorymaster.subcategoryid">
                                <div class="row">
                                    <div class="input-field col s6">
                                        <select id="categoryid" name="categoryid" class="validate" ng-required="true"
                                            ng-class="{'submitted': submitted && subcategorymasterform.wagetype.$invalid}"
                                            ng-model="subcategorymaster.categoryid"
                                            data-ng-options="at.categoryid as at.categoryname for at in maincategoryvalues">  categoryid
                                        </select><label for="categoryid">Category Name</label>
                                    </div>
                                    <div class="input-field col s6">
                                    <label for="subcategoryname" data-error="Required" class="active">Sub Category Name</label>
                                        <input id="subcategoryname" name="subcategoryname" type="text"
                                            ng-class="{'submitted': submitted && subcategorymasterform.name.$invalid}"
                                            class="validate" maxlength="100"
                                            ng-model="subcategorymaster.subcategoryname" ng-required="true">
                                        
                                    </div>
                                </div>
                                <div id="failure" class="red-text"></div>
                            </div>
                        </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="waves-effect waves-green btn-flat" type="submit" ng-click="submitted=true;"> Save
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
                            <select id="category" name="category" class="validate" ng-model="category"
                                data-ng-options="at.categoryname for at in maincategoryvalues"
                                ng-change="getcategoryvaluesbyType(category)">
                            </select>
                            <div class="row">
                                <div class="col s12">
                                    <nav class="indigo">
                                        <div class="nav-wrapper">
                                            <div class="left col s12">
                                                <div class="input-field col s12"> <i
                                                        class="material-icons prefix">search</i>
                                                    <input id="icon_prefix" placeholder="search" type="text"
                                                        class="validate" ng-model="filter">
                                                </div>
                                            </div>
                                        </div>
                                    </nav>
                                </div>
                            </div>
                            <li class="collection-item avatar waves-effect waves-teal col s12"
                                ng-class="{selected: lookups.subcategoryid === subcategoryid}"
                                ng-repeat="lookups in selectedsubcategoryy | filter: filter"> <a
                                    href="javascript::void(0)" ng-click="selectCategory(lookups)">
                                    <div style="margin-top: 10px;"><span class="circle light-blue"
                                            style="padding: 10px;">{{lookups.subcategoryname.slice(0,1)}}</span>
                                        <span class="email-title">{{lookups.subcategoryname}} </span>
                                        <p class="truncate grey-text ultra-small">{{lookups.categoryname}}</p>
                                    </div>
                                </a> </li>
                        </ul>
                    </div>
                    <div id="Client-details" class="col s12 m8 l8 card-panel z-depth-1">
                        <div class="email-content-wrap">
                            <div class="row z-depth-1" style="background-color: #eee;">
                                <div class="col s10 m10 l10">
                                    <ul class="collection">
                                        <li class="collection-item avatar" style="background-color:transparent"> <img
                                                src="<?php echo base_url("assets/images/photo.png")?>" alt=""
                                                class="circle">
                                            <span class="email-title">{{objcatmaster.subcategoryname}}</span>
                                            <p class="truncate grey-text ultra-small">{{objcatmaster.categoryname}}</p>
                                        </li>
                                    </ul>
                                </div>
                                <div class="col s2 m2 l2 right-align resultframe">
                                    <?php if($roledata['permissions']['ELOOKUP']==1) {?>
                                    <a id="editjobmaster" ng-click='editsubcategory(objcatmaster)'><span><i
                                                class="small blue-grey-text  mdi mdi-account-edit"></i></span></a>
                                    <?php } ?>
                                    <?php if($roledata['permissions']['DLOOKUP']==1) {?>
                                    <a ng-click='removesubcategory(objcatmaster)'><span>
                                            <i class="small blue-grey-text  mdi mdi-delete"></i></span></a>
                                    <?php } ?>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col s12 m6 l6">
                                    <p class="blue-grey-text"><strong>Category Name</strong> </p>
                                    <p>{{objcatmaster.categoryname}} </p>
                                </div>
                                <div class="col  s12 m6 l6">
                                    <p class="blue-grey-text"><strong>Sub Category Name</strong> </p>
                                    <p>{{objcatmaster.subcategoryname}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div> 
<style>
    .select-wrapper + label {
        top: 0px !important;
    }
</style>