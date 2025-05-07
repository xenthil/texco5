<script type="text/javascript" src="<?php echo base_url("assets/js/app/claimaddress.js")?>"></script>
<script type="text/javascript">
   var clientid = 0;
   var roleid = 0;
   var regionid = <?php echo $_SESSION['regionid']; ?>;
</script> 
<link rel="stylesheet" type="text/css" href="<?php echo base_url("assets/css/ng-table.min.css")?>" />
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ng-table.min.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ui-bootstrap-tpls-0.11.0.js")?>">
</script>

<div class="parallax-container" style="background-color: rgba(0, 12, 78, 0.9)">
      <div class="row">
         <div class="container">
            <div class="col s12 m6 l6">
               <div class="pagebannertext white-text">Claim Address Mapping</div>
            </div>
            <div class="col s12 m6 l6 right-align">
               <div class="dumheight hide-on-small-only"> </div>
               <div class=""> <a href="<?php echo base_url('admin/dashboard')?>" class="breadcrumb">Home</a> 
                    <span class="breadcrumb">Finance</span><span class="breadcrumb">Claim Address Mapping</span> </div>
            </div>
         </div>
      </div>
      <div class="parallax"><img src="<?php echo base_url("assets/images/breadcrumbbanner.jpg")?>"></div>
   </div>
<div class="row" ng-app="appClaimAddress" >
    <div class="container" ng-controller="ctrlClaimAddress">
        <div id="" class="section">
            <div class="fixed-action-btn" style="bottom: 50px; right: 19px;">
                <?php if($roledata['permissions']['ACLIENT']==1) {?>
                <a class="btn-floating btn-large red modal-trigger" href="#modal1" ng-click='addclaim()'>
                <i class="mdi mdi-account-plus"></i>
                </a>
                <?php } ?>
            </div> 
            
            <div id="modal1" class="modal modal-fixed-footer" style="max-height:90%;">
                <div class="modal-content">
                    <nav class="blue" style="position: fixed;margin-top: 0px; z-index:999;">
                        <div class="left col s1 m1 l1">
                            <div class="white-text"><a href=""><i class="modal-action modal-close mdi white-text mdi-arrow-left"></i></a> </div>
                        </div>
                        <div class="col s11 m11 l11">
                            <div class="li white-text" id="mcaption">Add Claim Address</div>
                        </div> 
                    </nav>
                    <div class="row" style="padding: 24px;">
                        <form ng-submit="clientform.$valid && saveclient(objclient,picFile)" id="clientform" name="clientform" novalidate>
                            <div class="row" style="height:40px;">&nbsp;</div>
                            <div class="row" >
                                <div class="col s12">
                                    <input type="hidden" ng-model="objclient.clientid">
                                    <div class="row"> 
                                        <div class="input-field col s8">
                                            <select name="regionid" ng-model="objclient.regionid" ng-class="{'submitted': submitted && projectform.regionid.$invalid}" ng-required="true" data-ng-options="rg.region_id as rg.region_name for rg in regionDetails" ng-change="getDistrictDetails(objclient.regionid);">
                                            </select>
                                            <label for="regionid">Claim Type</label>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="input-field col s6">
                                            <select name="regionid" ng-model="objclient.regionid" ng-class="{'submitted': submitted && projectform.regionid.$invalid}" ng-required="true" data-ng-options="rg.region_id as rg.region_name for rg in regionDetails" ng-change="getDistrictDetails(objclient.regionid);">
                                            </select>
                                            <label for="regionid">Client Name</label>
                                        </div>
                                        <div class="input-field col s6">
                                            <select name="regionid" ng-model="objclient.regionid" ng-class="{'submitted': submitted && projectform.regionid.$invalid}" ng-required="true" data-ng-options="rg.region_id as rg.region_name for rg in regionDetails" ng-change="getDistrictDetails(objclient.regionid);">
                                            </select>
                                            <label for="regionid">Project Name</label>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="input-field col s6">
                                            <input id="addressline1"  name="addressline1" type="text" type="text" ng-model="objclient.addressline1" maxlength="100">
                                            <label for="addressline1">Address Line 1</label>
                                        </div>
                                        <div class="input-field col s6">
                                            <input id="addressline2" name="addressline2" type="text" ng-model="objclient.addressline2" maxlength="100">
                                            <label for="addressline2">Address Line 2</label>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="input-field col s6">
                                            <input id="addressline3" name="addressline3" type="text" ng-model="objclient.addressline3" maxlength="100"  ng-minlength="3">
                                            <label for="addressline3">Address Line 3</label>
                                        </div>
                                        <div class="input-field col s6">
                                            <input id="pincode" name="pincode" type="text" maxlength="6"  ng-model="objclient.pincode" onkeypress="return isNumberKey(event);">
                                            <label for="pincode" data-error="Required">Pincode</label>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="input-field col s6">
                                            <select name="regionid" ng-model="objclient.regionid" ng-class="{'submitted': submitted && projectform.regionid.$invalid}" ng-required="true" data-ng-options="rg.region_id as rg.region_name for rg in regionDetails" ng-change="getDistrictDetails(objclient.regionid);">
                                            </select>
                                            <label for="regionid">Region</label>
                                        </div>
                                        <div class="input-field col s6">
                                            <select name="districtid" ng-model="objclient.districtid" ng-class="{'submitted': submitted && clientform.districtid.$invalid}" data-ng-options="d.district_id as d.district_name for d in districtDetails" ng-change="getTalukDetails(objclient.districtid);" ng-required="true" aria-required="true">
                                            </select>
                                            <label>District</label>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="input-field col s6">
                                            <select name="talukid" ng-model="objclient.talukid" ng-class="{'submitted': submitted && clientform.talukid.$invalid}" data-ng-options="c.taluk_id as c.taluk_name for c in Taluks" ng-required="true" aria-required="true">
                                            </select>
                                            <label>Taluk</label>
                                        </div>
                                        <div class="input-field col s6">
                                            <select name="stateid" ng-model="objclient.stateid" ng-class="{'submitted': submitted && clientform.stateid.$invalid}"  data-ng-options=" s.lkvalid as s.description for s in state" ng-required="true" aria-required="true">
                                            </select>
                                            <label>State</label>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="input-field col s6">
                                            <select name="countryid" ng-model="objclient.countryid" ng-class="{'submitted': submitted && clientform.countryid.$invalid}"  data-ng-options=" ct.lkvalid as ct.description for ct in country" ng-required="true" aria-required="true">
                                            </select>
                                            <label>Country</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <div id="failure" class="red-text" style="float:left"></div>
                    <button class="modal-action waves-effect waves-green btn-flat" type="submit" ng-click="submitted=true;" ng-disabled="buttondisable">
                    Save
                    </button>
                    <a href="" class="modal-action modal-close waves-effect btn-flat ">Cancel</a>
                    </div>
                    </form>
                </div>
            </div>
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
                            <div class="scroll" style="height: 400px !important;">
                                <li class="collection-item avatar waves-effect waves-teal col s12" ng-class="{selected: member.memberid === selected.memberid}" ng-repeat="member in expiredmembers | filter: filter | limitTo:1000:1000">
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
                                    <p class="blue-grey-text"><strong>Client Name</strong> </p>
                                    <p>{{selected.clientname}} </p>
                                </div>
                                <div class="col s12 m6 l6">
                                    <p class="blue-grey-text"><strong>Project Name</strong> </p>
                                    <p>{{selected.projectname}} </p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col  s12 m6 l6">
                                    <p class="blue-grey-text"><strong>Addressline 1</strong> </p>
                                    <p>{{selected.addressline1}}</p>
                                </div>
                                <div class="col s12 m6 l6">
                                    <p class="blue-grey-text"><strong>Addressline 2</strong> </p>
                                    <p>{{selected.addressline2}} </p>
                                </div>
                            </div>
                            <div class="row">

                                <div class="col  s12 m6 l6">
                                    <p class="blue-grey-text"><strong>Addressline 3</strong> </p>
                                    <p>{{selected.addressline3}}</p>
                                </div>
                                <div class="col s12 m6 l6">
                                    <p class="blue-grey-text"><strong>Region</strong> </p>
                                    <p>{{selected.regionid}} </p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col s12 m6 l6">
                                    <p class="blue-grey-text"><strong>District</strong> </p>
                                    <p style=" max-width:400px;word-wrap:break-word;">{{selected.district}} </p>
                                </div>
                                <div class="col s12 m6 l6">
                                    <p class="blue-grey-text"><strong>Taluk</strong> </p>
                                    <p>{{selected.taluk}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
