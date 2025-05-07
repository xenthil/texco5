  <link rel="stylesheet" type="text/css" href="<?php echo base_url("assets/css/magnific-popup.css")?>" />
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ng-file-upload.min.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/app/gallery.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/imagesloaded.pkgd.min.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/masonry.pkgd.min.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/jquery.magnific-popup.min.js")?>"></script>
<script type="text/javascript">
    var group = "<?php echo $_GET['group'];?>"
    <?php $group = "<script>document.write(group)</script>"?>   
</script>
 <?php $group =  $_GET['group'];?>
 <div class="parallax-container" style="background-color: rgba(0, 12, 78, 0.9)">
   <div class="row">
      <div class="container">
         <div class="col s12 m6 l6">
            <div class="pagebannertext white-text">Images</div>
         </div>
         <div class="col s12 m6 l6 right-align">
            <div class="dumheight hide-on-small-only"> </div>
            <div class=""> <a href="<?php echo base_url()?>" class="breadcrumb">Home</a>
             <a href="<?php echo base_url("images")?>" class="breadcrumb">Gallery</a> 
             <span class="breadcrumb">Images</span> </div>
         </div>
      </div>
   </div>
   <div class="parallax">
     <img src="<?php echo base_url("assets/images/breadcrumbbanner.jpg")?>">
   </div>
</div>
<div ng-app="appGallery"  ng-controller="ctrlGallery" style="padding-top: 10px">
   <div class="container" style="text-align: -webkit-center;">
      <div class="masonry-gallery-wrapper">
         <div class="popup-gallery">
               <div class="gallary-sizer"></div>
               <div class="gallary-item"  ng-repeat="image in gallerygroup.images"><a href="<?php echo base_url('/assets/images/gallery/'.$group.'/{{image.image}}')?>" title="{{gallerygroup.group}}" id="{{gallerygroup.description}}"><img src="<?php echo base_url('/assets/images/gallery/'. $group .'/{{image.image}}')?>"></a></div>
         </div>
      </div>
   </div>
 </div>
<script type="text/javascript">
   /*
    * Masonry container for Gallery page
    */
  $('document').ready(function(){
    setTimeout(function() {
   var $containerGallery = $(".masonry-gallery-wrapper");
   $containerGallery.imagesLoaded(function() {
     $containerGallery.masonry({
         itemSelector: '.gallary-item img',
         columnWidth: '.gallary-sizer',
         isFitWidth: true
     });
   });
    

   //popup-gallery
   $('.popup-gallery').magnificPopup({
     delegate: 'a',
     type: 'image',
     closeOnContentClick: true,    
     fixedContentPos: true,
     tLoading: 'Loading image #%curr%...',
     mainClass: 'mfp-img-mobile mfp-no-margins mfp-with-zoom',
     gallery: {
       enabled: true,
       navigateByImgClick: true,
       preload: [0,1] // Will preload 0 - before current, and 1 after the current image
     },
     image: {
       verticalFit: true,
       tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
       titleSrc: function(item) {
         return item.el.attr('title') + '<small>' + item.el.attr('id')+'</small>';
       },
     zoom: {
       enabled: true,
       duration: 300 // don't foget to change the duration also in CSS
     }
     }
   });
   }, 100);

 }); 
  
</script>
<style  type="text/css">
  .gallary-sizer {
    width: 30%;
    height:auto;
  }
  /* .gallary-item img {
    width: 100%;
  } */
  .masonry-gallery-wrapper {
      height: auto !important;
  }
</style>
