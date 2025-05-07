
<html>
<head>
<link href="css/icon.css" rel="stylesheet">
 <link rel="stylesheet" type="text/css" href="<?php echo base_url("assets/css/icon.css")?>" />
 <link rel="stylesheet" type="text/css" href="<?php echo base_url("assets/css/materialize.css")?>" />
 <link rel="stylesheet" type="text/css" href="<?php echo base_url("assets/css/materialdesignicons.min.css")?>" />
<link rel="stylesheet" type="text/css" href="<?php echo base_url("assets/css/texco.css")?>" />

<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<script type="text/javascript" src="<?php echo base_url("assets/js/jquery-2.1.1.min.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/angular.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/materialize.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/jssor.slider-23.0.0.min.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/home.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/vacancy.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/roles.js")?>"></script>
<script src="https://apis.google.com/js/platform.js" async defer></script>
<script type="text/javascript">
        jssor_1_slider_init = function() {

            var jssor_1_options = {
              $AutoPlay: 1,
              $Idle: 0,
              $AutoPlaySteps: 4,
              $SlideDuration: 2500,
              $SlideEasing: $Jease$.$Linear,
              $PauseOnHover: 4,
              $SlideWidth: 140,
              $Cols: 7
            };

            var jssor_1_slider = new $JssorSlider$("jssor_1", jssor_1_options);

            /*responsive code begin*/
            /*remove responsive code if you don't want the slider scales while window resizing*/
            function ScaleSlider() {
                var refSize = jssor_1_slider.$Elmt.parentNode.clientWidth;
                if (refSize) {
                    refSize = Math.min(refSize, 809);
                    jssor_1_slider.$ScaleWidth(refSize);
                }
                else {
                    window.setTimeout(ScaleSlider, 30);
                }
            }
            ScaleSlider();
            $Jssor$.$AddEvent(window, "load", ScaleSlider);
            $Jssor$.$AddEvent(window, "resize", ScaleSlider);
            $Jssor$.$AddEvent(window, "orientationchange", ScaleSlider);
            /*responsive code end*/
        };
    </script>
</head>

<body>
<nav class="nav-extended">
  <div class="nav-content indigo">
    <div class="container">
      <div class="header indigo  hide-on-med-and-down">
        <div class="left ">
          <ul class="left">
            <li><a class="waves-effect waves-light indigo white-text"><i class="mdi mdi-phone left"></i><span class="headerphone">0123 456 789</span></a></li>
            <li>
              <div class="row">
                <div class="input-field col"> <i class="material-icons prefix">search</i>
                  <input id="icon_prefix" placeholder="search" type="text" class="validate valid">
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="right">
          <ul class="left">
            <li><a class="waves-effect waves-light blue btn-large white-text">Client Login</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="nav-wrapper"> <a href="#" data-activates="mobile-demo" class="button-collapse"><i class="grey-text  material-icons">menu</i></a>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li class="black-text"><a class="waves-effect headermenu" href="<?php echo base_url()?>">Home</a></li>
        <li class="black-text"><a class="waves-effect headermenu " href="<?php echo base_url('aboutus');?>About us</a></li>
        <li class="black-text"><a class="waves-effect headermenu" href="<?php echo base_url('vacancy')?>">Vacancy</a></li>
        <li class="black-text"><a class="waves-effect headermenu" href="#">Our Services</a></li>
        <li class="black-text"><a class="waves-effect headermenu" href="<?php echo base_url('contactus')?>">Contact</a></li>
      </ul>
      <ul class="side-nav" id="mobile-demo">
        <li class="black-text"><a class="waves-effect" href="#">Menu</a></li>
        <li class="black-text"><a class="waves-effect" href="#">Menu</a></li>
        <li class="black-text"><a class="waves-effect" href="#">Menu</a></li>
        <li class="black-text"><a class="waves-effect" href="#">Menu</a></li>
      </ul>
      <div class="responsive-img texlogo"></div>
    </div>
  </div>
</nav>
