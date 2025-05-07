<script type="text/javascript" src="<?php echo base_url("assets/js/app/gallery.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ng-file-upload.min.js")?>"></script>
<div class="parallax-container" style="background-color: rgba(0, 12, 78, 0.9)">
   <div class="row">
      <div class="container">
         <div class="col s12 m6 l6">
            <div class="pagebannertext white-text">Gallery</div>
         </div>
         <div class="col s12 m6 l6 right-align">
            <div class="dumheight hide-on-small-only"> </div>
            <div class=""> <a href="<?php echo base_url('admin/dashboard')?>" class="breadcrumb">Home</a> <span class="breadcrumb">Gallery</span> </div>
         </div>
      </div>
   </div>
   <div class="parallax"><img src="<?php echo base_url(" assets/images/breadcrumbbanner.jpg")?>">
   </div>
</div>
<div class="row" ng-app="appGallery">
   <div class="container" ng-controller="ctrlGallery">
      <!-- Modal Window for new and Edit -->
      <div class="fixed-action-btn" style="bottom: 50px; right: 19px;">
         <?php if($roledata['permissions']['AGALLERY']==1) {?>
         <a class="btn-floating btn-large red modal-trigger" href="#modal1" ng-click='addgallery()'>
         <i class="mdi mdi-account-plus"></i>
         </a>
         <?php } ?>
      </div>
      <!-- Modal Structure -->
      <div id="modal1" class="modal modal-fixed-footer" style="max-width: 550px; max-height:90%;">
         <div class="modal-content">
            <nav class="blue" style="position: fixed;margin-top: 0px; z-index:999;">
               <div class="left col s1 m1 l1">
                  <div class="white-text"><a href=""><i class="modal-action modal-close mdi white-text mdi-arrow-left"></i></a> </div>
               </div>
               <div class="col s11 m11 l11">
                  <div class="li white-text" id="mcaption">Add Gallery</div>
               </div>
            </nav>
            <div class="row" style="padding: 24px;">
               <form ng-submit="galleryform.$valid && checkgroup(objgallery,picFile)" id="galleryform" name="galleryform" novalidate>
                  <div class="row" style="padding: 40px;">
                     <div class="col s12">
                        <div class="row">
                           <div class="input-field col s12">
                            <input id="group"  name="group" type="text" ng-class="{'submitted': submitted && galleryform.group.$invalid}"  class="validate" type="text" ng-model="objgallery.group" maxlength="250" ng-required="true" ng-minlength="3" aria-required="true">
                              <label for="group" data-error="Required(min 3 chars)">Group</label>
                           </div>
                        </div>
                        <div class="row">
                           <div class="input-field col s12">
                              <input id="description" name="description" type="text" ng-class="{'submitted': submitted && galleryform.description.$invalid}"  class="validate" type="text" ng-model="objgallery.description" maxlength="250" ng-required="true" ng-minlength="3" aria-required="true">
                              <label for="description" data-error="Required(min 3 chars)">Description</label>
                           </div>
                        </div>
                        <div class="row">
                           <div class="file-field input-field">
                              <div class="btn">
                                 <span>File</span>
                                 <input type="file" ngf-select ng-model="picFile" name="file" accept="image/*" ngf-max-size="1MB" ngf-resize="{width: 512, height: 380}" required ngf-model-invalid="errorFile" ng-required="true" aria-required="true" multiple>
                              </div>
                              <div class="file-path-wrapper">
                                 <input class="file-path validate" type="text">
                              </div>
                              <i ng-show="myForm.file.$error.required">*required</i>
                              <br>
                              <i ng-show="myForm.file.$error.maxSize">File too large
                              {{errorFile.size / 1000000|number:1}}MB: max 2M</i>
                              <img ngf-thumbnail="picFile" class="thumb">
                              <span class="progress" ng-show="picFile.progress >= 0">
                                 <div style="width:{{picFile.progress}}%"
                                    ng-bind="picFile.progress + '%'"></div>
                              </span>
                              <span ng-show="picFile.result">Upload Successful</span>
                              <span class="err" ng-show="errorMsg">{{errorMsg}}</span>
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
                     <li class="collection-item avatar waves-effect waves-teal col s12" ng-class="{selected: galleryitem.group === selected.group}" ng-repeat="galleryitem in gallery | filter: filter">
                        <a href="javascript::void(0)" ng-click="select(galleryitem)">
                           <div style="margin-top: 10px;">
                              <span class="circle light-blue" style="padding: 10px;">{{galleryitem.group.slice(0,1)}}</span> <span class="email-title">{{galleryitem.group}}</span>
                              <p class="truncate grey-text ultra-small">{{galleryitem.description}}</p>
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
                                 <span class="email-title">{{selected.group}}</span>
                                 <p class="truncate grey-text ultra-small">{{selected.description}}</p>
                              </li>
                           </ul>
                        </div>
                        <div class="col s2 m2 l2 right-align resultframe">
                           <?php if($roledata['permissions']['EGALLERY']==1) {?>
                           <a id="editGallery" ng-click='editgallery()'><span><i class="small icon darken-1 mdi mdi-account-edit"></i></span></a>
                           <?php } ?>
                           <?php if($roledata['permissions']['DGALLERY']==1) {?>
                           <a ng-click='removegallery()'><span><i class="small icon mdi mdi-delete"></i></span></a>
                           <?php } ?>
                           
                        </div>
                     </div>
                     <div>
                        <div class="row" >
                              <p class="blue-grey-text"><strong>Image</strong> </p>
                              <div class="col s12" >
                                 <div class="section">
                                    <input type="hidden" ng-model="image.galleryid">
                                    <div class="col s12 m6 l4" ng-repeat="image in images">
                                    <div class="material-placeholder">
                                    <div class="show-image">
                                    <img class="materialboxed" width="250" src="<?php echo base_url('/assets/images/gallery/{{selected.group}}/{{image.image}}')?>"><a class="delete" ng-click="removegalleryimage(image.galleryid)"><span><i class="small icon mdi mdi-delete"></i></span></a>
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
      </div>
   </div>
</div>
<style  type="text/css">
div.show-image {
   padding:1px;
   border:1px solid #021a40;
}

div.show-image {
    position: relative;
    float:left;
    margin:5px;
}
div.show-image:hover img{
    opacity:0.5;
}
div.show-image:hover a {
    display: block;
}
div.show-image a {
    position:absolute;
    display:none;
}
div.show-image a.delete {
    top:0;
    left:85%;
}
</style>