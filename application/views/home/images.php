<link rel="stylesheet" type="text/css" href="<?php echo base_url("assets/css/magnific-popup.css")?>" />
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ng-file-upload.min.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/app/gallery.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/imagesloaded.pkgd.min.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/masonry.pkgd.min.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/jquery.magnific-popup.min.js")?>"></script>
<script type="text/javascript">
    var group = '';
</script>
<div class="parallax-container" style="background-color: rgba(0, 12, 78, 0.9)">
   <div class="row">
      <div class="container">
         <div class="col s12 m6 l6">
            <div class="pagebannertext white-text">Gallery</div>
         </div>
         <div class="col s12 m6 l6 right-align">
            <div class="dumheight hide-on-small-only"> </div>
            <div class=""> <a href="<?php echo base_url()?>" class="breadcrumb">Home</a> <span class="breadcrumb">Gallery</span> </div>
         </div>
      </div>
   </div>
   <div class="parallax">
     <img src="<?php echo base_url("assets/images/breadcrumbbanner.jpg")?>">
   </div>
</div>
<div class="container">
<div class="row" ng-app="appGallery"  ng-controller="ctrlGallery">
<div class="col s12 m6 l6" ng-repeat="galleryitem in gallery">
 <div class="card">
    <div class="responsive-img waves-effect waves-block waves-light">
     <a href="<?php echo base_url('gallery?group={{galleryitem.group}}')?>"> <img class="activator" src="<?php echo base_url('/assets/images/gallery/{{galleryitem.group}}/{{galleryitem.images[1].image}}')?>"></a>
    </div>
    <div class="card-content">
      <p><a href="<?php echo base_url('gallery?group={{galleryitem.group}}')?>">{{galleryitem.description}}</a></p>
    </div>
  </div>
  </div>
  </div>
  </div>