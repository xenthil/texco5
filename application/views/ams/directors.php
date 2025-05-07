<script type="text/javascript" src="<?php echo base_url("assets/js/app/director.js")?>"></script>
<div class="parallax-container" style="background-color: rgba(0, 12, 78, 0.9)">
   <div class="row">
      <div class="container">
         <div class="col s12 m6 l6">
            <div class="pagebannertext white-text">Directors</div>
         </div>
         <div class="col s12 m6 l6 right-align">
            <div class="dumheight hide-on-small-only"> </div>
            <div class=""> <a href="<?php echo base_url('admin/dashboard')?>" class="breadcrumb">Home</a> <span class="breadcrumb">Directors</span> </div>
         </div>
      </div>
   </div>
   <div class="parallax"><img src="<?php echo base_url("assets/images/breadcrumbbanner.jpg")?>">
   </div>
</div>
<div class="row" ng-app="appAdminDirector">
<div class="container" ng-controller="ctrlAdminDirector">
   <!-- Modal Window for new and Edit -->
   <div class="fixed-action-btn" style="bottom: 50px; right: 19px;">
      <?php if($roledata['permissions']['ADIRECTOR']==1) {?>
      <a class="btn-floating btn-large red modal-trigger" ng-click='adddirector()'>
      <i class="mdi mdi-account-plus"></i>
      </a>
      <?php } ?>
   </div>
   <!-- Modal Structure -->
   <div id="modal1" class="modal modal-fixed-footer" style=" max-height:90%;">
      <div class="modal-content">
         <nav class="blue" style="position: fixed;margin-top: 0px; z-index:999">
            <div class="left col s1 m1 l1">
               <div class="white-text"><a href=""><i class="modal-action modal-close mdi white-text mdi-arrow-left"></i></a> </div>
            </div>
            <div class="col s11 m11 l11">
               <div class="li white-text" id="mcaption">Add Director</div>
            </div>
         </nav>
         <div class="row" style="padding: 24px;">
            <form ng-submit="directorform.$valid && savedirector(objdirector)" id="directorform" name="directorform" novalidate>
               <div class="row" style="height:40px;">&nbsp;</div>
               <div class="row">
                  <div class="col s12">
                     <input type="hidden" ng-model="objdirector.directorid">
                     <div class="row">
                        <div class="input-field col s6">
                           <input id="name"  name="name" type="text" class="validate" ng-class="{'submitted': submitted && directorform.name.$invalid}" type="text" ng-required="true" ng-minlength="3" aria-required="true" ng-model="objdirector.name">
                           <label for="name" data-error="Required (min 3 chars)">Name</label>
                        </div>
                        <div class="input-field col s6">
                           <input id="designation" name="designation" type="text" class="validate" ng-class="{'submitted': submitted && directorform.designation.$invalid}" maxlength="150" type="text" ng-required="true" aria-required="true" ng-model="objdirector.designation">
                           </select>
                           <label for="designation" data-error="Required">Designation</label>
                        </div>
                     </div>
                     <div class="row">
                        <div input-field class="input-field col s6">
                           <select id="dtitleid" name="dtitleid" class="validate" ng-required="true" ng-class="{'submitted': submitted && directorform.dtitleid.$invalid}"  ng-model="objdirector.dtitleid" data-ng-options=" rg.lkvalid as rg.description for rg in dtitles" materialize-select>
                           </select>
                           <label>Title</label>
                        </div>
                        <div class="input-field col s6">
                           <input id="email" name="email" type="email" ng-class="{'submitted': submitted && directorform.email.$invalid}" class="validate" maxlength="50" ng-model="objdirector.email">
                           <label for="email" data-error="Required">Email</label>
                        </div>
                     </div>
                     <div class="row">
                        <div class="input-field col s6">
                           <input id="mobile" class="validate" type="text"  minlength="10" maxlength="10"  ng-model="objdirector.mobile" onkeypress="return isNumberKey(event);">
                           <label for="mobile">Mobile</label>
                        </div>
                        <div class="input-field col s6">
                           <input id="phone" class="validate" type="text" maxlength="15" ng-model="objdirector.phone" onkeypress="return isNumberKey(event);">
                           <label for="phone">Phone</label>
                        </div>
                     </div>
                     <div class="row">
                        <div class="input-field col s12">
                           <textarea id="textarea1" class="materialize-textarea" maxlength="250" ng-model="objdirector.address"></textarea>
                           <label for="textarea1">Address</label>
                        </div>
                     </div>
                  </div>
                  <div id="failure" class="red-text"></div>
               </div>
         </div>
      </div>
      <div class="modal-footer">
      <button class="modal-action waves-effect waves-green btn-flat" type="submit" ng-click="submitted=true;">
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
                  <div class= "scroll">
                  <li class="collection-item avatar waves-effect waves-teal col s12" ng-class="{selected: director.directorid === selected.directorid}"  ng-repeat="director in directors | filter: filter">
                     <a href="javascript::void(0)" ng-click="select(director)">
                        <div style="margin-top: 10px;">
                           <span class="circle light-blue" style="padding: 10px;">{{director.name.slice(0,1)}}</span>
                           <span class="email-title">{{director.name}}</span>
                           <p class="truncate grey-text ultra-small">{{director.dtitle}}</p>
                        </div>
                     </a>
                  </li>
                  </div>
               </ul>
            </div>
            <div id="Client-details" class="col s12 m8 l8 card-panel z-depth-1">
               <div class="email-content-wrap">
                  <div class="row z-depth-1" style="background-color: #eee;">
                     <div class="col s12 m10 l10">
                        <ul class="collection">
                           <li class="collection-item avatar" style="background-color:transparent">
                              <img src="<?php echo base_url("assets/images/photo.png")?>" alt="" class="circle">
                              <span class="email-title">{{selected.name}}</span>
                              <p class="truncate grey-text ultra-small">{{selected.designation}}</p>
                              <p class="grey-text ultra-small">{{selected.dtitle}}</p>
                           </li>
                        </ul>
                     </div>
                     <div class="col s2 m2 l2 right-align resultframe">
                         <?php if($roledata['permissions']['EDIRECTOR']==1) {?>
                        <a id="editdirector" ng-click='editdirector()'><span><i class="small icon darken-1 mdi mdi-account-edit"></i></span></a>
                        <?php } ?>
                        <?php if($roledata['permissions']['DDIRECTOR']==1) {?>
                        <a ng-click='removedirector()'><span><i class="small icon mdi mdi-delete"></i></span></a>
                        <?php } ?>
                       
                     </div>
                  </div>
                  <div class="row">
                     <div class="col s12 m6 l6">
                        <p class="blue-grey-text"><strong>Name</strong> </p>
                        <p>{{selected.name}} </p>
                     </div>
                     <div class="col  s12 m6 l6">
                        <p class="blue-grey-text"><strong>Designation</strong> </p>
                        <p>{{selected.designation}}</p>
                     </div>
                  </div>
                  <div class="row">
                     <div class="col s12 m6 l6">
                        <p class="blue-grey-text"><strong>Address</strong> </p>
                        <p style=" max-width:400px;
    word-wrap:break-word;">{{selected.address}} </p>
                     </div>
                     <div class="col  s12 m6 l6">
                        <p class="blue-grey-text"><strong>Email</strong> </p>
                        <p>{{selected.email}}</p>
                     </div>
                  </div>
                  <div class="row">
                     <div class="col s12 m6 l6">
                        <p class="blue-grey-text"><strong>Phone</strong> </p>
                        <p>{{selected.phone}} </p>
                     </div>
                     <div class="col  s12 m6 l6">
                        <p class="blue-grey-text"><strong>Mobile</strong> </p>
                        <p>{{selected.mobile}}</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
<script  type="text/javascript">
   function isNumberKey(evt)
   {
     var charCode = (evt.which) ? evt.which : event.keyCode;
    console.log(charCode);
       if (charCode != 46 && charCode != 45 && charCode > 31
       && (charCode < 48 || charCode > 57))
        return false;
   
     return true;
   }
</script>