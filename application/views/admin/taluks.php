<script type="text/javascript" src="<?php echo base_url("assets/js/app/taluks.js") ?>"></script>

<div class="parallax-container" style="background-color: rgba(0, 12, 78, 0.9)">
  <div class="row">
    <div class="container">
      <div class="col s12 m6 l6">
        <div class="pagebannertext white-text">Taluk Master</div>
      </div>
      <div class="col s12 m6 l6 right-align">
        <div class="dumheight hide-on-small-only"> </div>
        <div class=""> <a href="<?php echo base_url('admin/dashboard') ?>" class="breadcrumb">Home</a>
        <span class="breadcrumb">Settings</span> <span class="breadcrumb">Taluk Master</span> </div>
      </div>
    </div>
  </div>
  <div class="parallax"><img src="<?php echo base_url("assets/images/breadcrumbbanner.jpg") ?>"> </div>
</div>
<div class="row" ng-app="appJobmaster">
  <div class="container" ng-controller="ctrlJobmaster">
    <!-- Modal Window for new and Edit -->
    <div class="fixed-action-btn" style="bottom: 50px; right: 19px;">
      <?php if ($roledata['permissions']['ALOOKUP'] == 1) { ?>
        <a class="btn-floating btn-large red modal-trigger" href="#modal1" ng-click='addjobmaster()'>
          <i class="mdi mdi-account-plus"></i>
        </a>
      <?php } ?>
    </div>

    <!-- Modal Structure -->
    <div id="modal1" class="modal modal-fixed-footer" style="max-width: 550px;max-height:90%;">
      <div class="modal-content">
        <nav class="blue" style="position: fixed;margin-top: 0px; z-index:999">
          <div class="left col s1 m1 l1">
            <div class="white-text"><a href=""><i class="modal-action modal-close mdi white-text mdi-arrow-left"></i></a> </div>
          </div>
          <div class="col s11 m11 l11">
            <div class="li white-text" id="mcaption">Map Taluk</div>
          </div>
        </nav>
        <div class="row" style="padding: 24px;">
          <form ng-submit="jobmasterform.$valid && savetaluk(objjobmaster)" id="jobmasterform" name="jobmasterform" novalidate>
            <div class="row" style="height:40px;">&nbsp;</div>
            <div class="row">
              <div class="col s12">
                <div class="row">
                  <input type="hidden" ng-model="objjobmaster.regionmapid">
                  <div class="input-field col s7">
                    <select ng-model="objjobmaster.regionid" class="validate" id="regionid" name="regionid" data-ng-options=" r.regionid as r.regionname for r in regions" ng-class="{'submitted': submitted && objjobmaster.regionid.$invalid}" ng-required="true" disabled>
                    </select>
                  </div>
                  <div class="input-field col s7">
                    <select ng-model="objjobmaster.districtid" class="validate" id="district" name="district" data-ng-options=" r.districtid as r.districtname for r in lookupdistrict  | unique:'districtid'" ng-class="{'submitted': submitted && objjobmaster.districtid.$invalid}" ng-required="true">
                    </select>
                  </div>
                  <div class="input-field col s7">
                    <select ng-model="objjobmaster.talukid" class="validate" id="taluk" name="taluk" data-ng-options=" r.talukid as r.talukname for r in taluks" ng-class="{'submitted': submitted && objjobmaster.talukid.$invalid}" ng-required="true">
                    </select>
                  </div>
                </div>
                <div id="failure" class="red-text"></div>
              </div>
            </div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="waves-effect waves-green btn-flat" type="submit" ng-click="submitted=true;"> Save </button>
        <a href="" class="modal-action modal-close waves-effect btn-flat ">Cancel</a>
      </div>
      </form>
    </div> 
    <div id="" class="section">
      <div class="row">
        <div class="col s12 ">
          <div id="Client-list" class="CLheight col s12 m4 l4 card-panel z-depth-1">
            <ul class="collection">
              <select id="lookup" name="lookup" class="validate" ng-model="lookups" data-ng-options="at.regionname for at in regions" ng-change="getlookupvalues(lookups)">
              </select>
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
              <div style="height:300px !important;overflow-y: scroll;"> 
                <li class="collection-item avatar waves-effect waves-teal col s12" ng-class="{selected: lookups.talukid === talukid}" ng-repeat="lookups in selectedlookup | filter: filter">
                  <a href="javascript::void(0)" ng-click="selectValues(lookups,lookups.lkdmncode)">
                    <div style="margin-top: 10px;"><span class="circle light-blue" style="padding: 10px;">
                        {{lookups.talukname.slice(0,1)}}</span>
                      <span class="email-title">{{lookups.talukname}} </span>
                      <p class="truncate grey-text ultra-small">{{lookups.districtname}}</p>
                    </div>
                  </a>
                </li>
              </div>
            </ul>
          </div>
          <div id="Client-details" class="col s12 m8 l8 card-panel z-depth-1">
            <div class="email-content-wrap">
              <div class="row z-depth-1" style="background-color: #eee;">
                <div class="col s10 m10 l10">
                  <ul class="collection">
                    <li class="collection-item avatar" style="background-color:transparent"> <img src="<?php echo base_url("assets/images/photo.png") ?>" alt="" class="circle"> <span class="email-title">{{selectedd.talukname}}</span>
                      <p class="truncate grey-text ultra-small">{{selectedd.districtname}}</p>
                    </li>
                  </ul>
                </div>
                <div class="col s2 m2 l2 right-align resultframe">
                  <?php if ($roledata['permissions']['ELOOKUP'] == 1) { ?>
                    <a id="editjobmaster" ng-click='editjobmaster()'><span><i class="small blue-grey-text  mdi mdi-account-edit"></i></span></a>
                  <?php } ?>
                  <?php if ($roledata['permissions']['DLOOKUP'] == 1) { ?>
                    <a ng-click='removejobmaster()'><span>
                        <i class="small blue-grey-text  mdi mdi-delete"></i></span></a>
                  <?php } ?>
                </div>
              </div>
              <div class="row">
                <div class="col s12 m6 l6">
                  <p class="blue-grey-text"><strong>District Name</strong> </p>
                  <p>{{selectedd.districtname}} </p>
                </div>

                <div class="col  s12 m6 l6">
                  <p class="blue-grey-text"><strong>District Code</strong> </p>
                  <p>{{selectedd.districtcode}}</p>
                </div>
              </div>
              <div class="row">
                <div class="col s12 m6 l6">
                  <p class="blue-grey-text"><strong>Taluk Name</strong> </p>
                  <p>{{selectedd.talukname}} </p>
                </div>

                <div class="col  s12 m6 l6">
                  <p class="blue-grey-text"><strong>Taluk Code</strong> </p>
                  <p>{{selectedd.talukcode}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>