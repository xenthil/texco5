<html>
<head>
<?php header('X-Frame-Options: DENY'); ?>
 <title>Texco</title>

 <link rel="shortcut icon" href="<?php echo base_url("assets/images/clientletter.jpg")?>" />

 <link rel="shortcut icon" type="image/x-icon" href="<?php echo base_url("assets/images/clientletter.jpg")?>"  />

 <link rel="stylesheet" type="text/css" href="<?php echo base_url("assets/css/icon.css")?>" />
 <link rel="stylesheet" type="text/css" href="<?php echo base_url("assets/css/materialize.css")?>" />
 <link rel="stylesheet" type="text/css" href="<?php echo base_url("assets/css/materialdesignicons.min.css")?>" />

<link rel="stylesheet" type="text/css" href="<?php echo base_url("assets/css/texco.css")?>" />

<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<script type="text/javascript" src="<?php echo base_url("assets/libs/jquery/3.7.1/jquery.min.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/libs/angular/1.8.2/angular.min.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/libs/materialize/1.0.0/js/materialize.min.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/jssor.slider-23.0.0.min.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/app/home.js")?>"></script>
<script src="https://apis.google.com/js/platform.js" async defer></script>
<script type="text/javascript"> var base_url = "<?php echo base_url()?>" </script>
<script type="text/javascript"> var api_url = "<?php echo config_item('api_url')?>" </script>
<script type="text/javascript"> var regionid = "0" </script>
<script type="text/javascript" src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>
<script type="text/javascript">  
  var atoken = "<?php echo $_SESSION['atoken']; ?>";
</script>

  <script type="text/javascript"> var base64Key = "<?php echo $this->session->usertoken('base64key')?>" ; </script>
  <script type="text/javascript"> var iv = "<?php echo $this->session->usertoken('iv')?>" ; </script>
  
<script type="text/javascript">
  
$('#google_translate_element').on("click", function () {

  // Change font family and color
  $("iframe").contents().find(".goog-te-menu2-item div, .goog-te-menu2-item:link div, .goog-te-menu2-item:visited div, .goog-te-menu2-item:active div, .goog-te-menu2 *")
      .css({
          'color': '#544F4B',
          'font-family': 'Roboto',
          'width':'100%'
      });
  // Change menu's padding
  $("iframe").contents().find('.goog-te-menu2-item-selected').css ('display', 'none');

  // Change menu's padding
  $("iframe").contents().find('.goog-te-menu2').css ('padding', '0px');

  // Change the padding of the languages
  $("iframe").contents().find('.goog-te-menu2-item div').css('padding', '20px');

  // Change the width of the languages
  $("iframe").contents().find('.goog-te-menu2-item').css('width', '100%');
  $("iframe").contents().find('td').css('width', '100%');

  // Change hover effects
  $("iframe").contents().find(".goog-te-menu2-item div").hover(function () {
      $(this).css('background-color', '#4385F5').find('span.text').css('color', 'white');
  }, function () {
      $(this).css('background-color', 'white').find('span.text').css('color', '#544F4B');
  });

  // Change Google's default blue border
  $("iframe").contents().find('.goog-te-menu2').css('border', 'none');

  // Change the iframe's box shadow
  $(".goog-te-menu-frame").css('box-shadow', '0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.3)');



  // Change the iframe's size and position?
  $(".goog-te-menu-frame").css({
      'height': '100%',
      'width': '100%',
      'top': '0px'
  });
  // Change iframes's size
  $("iframe").contents().find('.goog-te-menu2').css({
      'height': '100%',
      'width': '100%'
  });
});

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
        }

        function googleTranslateElementInit() {
          new google.translate.TranslateElement({pageLanguage: 'en', includedLanguages: 'ta,en', layout: google.translate.TranslateElement.InlineLayout.SIMPLE, autoDisplay: false}, 'google_translate_element');
        }
        
    </script>

   
</head>
<body onbeforeunload="handleBrowserCloseButton(event);">
<div id="appMember" ng-controller="ctrlMember" >
<div class="headtop">
  <div class="row" style="margin-bottom: 0px !important;">
    <div style="width:80%;float:left;" ng-show="settings[5].description != '' " >
        <marquee behavior="scroll" scrollamount="5" direction="left">{{settings[5].value}}<a href="https://www.onlinesbi.com/sbicollect/icollecthome.htm?corpID=494454" target="_blank"> Click Here to Pay</a></marquee>
    </div>
    <div style="width:20%;float:right;">
        <div id="google_translate_element"></div>
    </div>
  </div>  
</div>
<nav class="nav-extended">
    <div class="nav-content indigo">
      <div class="container-fluid" style="width: 100% !important;">
        <div class="header indigo  hide-on-med-and-down">
          <div class="left" style="width:35% !important;float:left;">
            <ul class="left">
              <li><a class="waves-effect waves-light indigo white-text"><i class="mdi mdi-phone left"></i><span class="headerphone">044 2230 1793</span></a></li>
              <li>
                <div class="row">
                     <form ng-submit="searchmember(texserno)" id="memberform" name="memberform" novalidate>
                      <div class="input-field col"><div ng-click="searchmember(texserno)"> <i class="material-icons prefix">search</i></div>
                        <input id="icon_prefix" placeholder="Enter Service No(Army No)/Texco No" type="text" style="width: 145%;" class="validate valid" ng-model="texserno" style="font-size: 12px !important;">
                        <button id="btntexser" class=" login-btn-header" type="submit">Sign in</button>

                      </div>
                    </form>
                </div>
              </li>
            </ul>
          </div>
          <div class="center" style="width:50% !important;margin-left:35%;">
            <ul class="center">
              <li><p ng-show="settings[1].description != '' " ><a class="marhdtp"  style="padding-left:12%;font-size: larger;color: chartreuse;" href="<?php echo base_url("assets/settings/{{settings[1].description}}")?>" target="_blank"><marquee behavior="scroll" scrollamount="5" direction="left"> {{settings[1].value}} Click here </marquee></a></p></li>
            </ul>
          </div>
          <div class="right" style="width:15% !important;float:right;">
            <ul class="right">
              <li><a class="waves-effect waves-light blue btn-large white-text" href="<?php echo base_url('login')?>">Admin Login</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="headtops" style="background-color: #2A94F3;height: 27px;" ng-show="settings[3].description != '' " ><a class="marhdtp" style="color:gold" href="http://texco.in/assets/document/TEXCOAM.pdf" target="_blank"><marquee style="margin-top: -16px;" behavior="scroll" scrollamount="5" direction="left">{{settings[3].value}} </marquee></a></div> 
    <div class="headtops" style="background-color: #2A94F3;height: 27px;" ng-show="settings[4].description != '' "><a style="color:red" href='http://texco.in/assets/document/GPAI.pdf' target="_blank"><marquee style="margin-top: -16px;" behavior="scroll" scrollamount="5" direction="left">{{settings[4].value}}</marquee></a></div>
  
  <div class="container">
    <div class="nav-wrapper"> <a href="#" data-activates="mobile-demo" class="button-collapse"><i class="grey-text  material-icons">menu</i></a>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <div style="height: 25px;"> </div>  
        <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url()?>">Home</a></li>
        <li class="black-text"><a class="waves-effect headermenuselect " href="<?php echo base_url('aboutus');?>">About us</a></li>
        <!--  <li class="black-text"><a class='dropdown-button waves-effect headermenuselect'  data-activates='vacancys' href="<?php echo base_url('vacancy')?>">Vacancy</a></li> 
                <ul id='vacancys' class='dropdown-content'>
                  <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('dgrvacancy')?>">DGR Vacancy</a></li>
                  <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('tnvacancy')?>">TN Vacancy</a></li>
                </ul> -->

                <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('newvacancy')?>">Vacancy</a></li>
          <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('vacancyapply')?>">Apply </a></li>
         <li class="black-text"><a class='dropdown-button waves-effect headermenuselect'  data-activates='register' >Register</a></li>
                <ul id='register' class='dropdown-content'>
                  <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('register')?>">New Employee (Ex-servicemen)</a></li>
                  <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('vacancy')?>">Old Employee (Ex-servicemen)</a></li>
                  <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('employerregister')?>">Employer (Client)</a></li>
                </ul>

        <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('services')?>">Our Services</a></li>
        <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('images')?>">Gallery</a></li>
        <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('contactus')?>">Contact</a></li> 
       <!-- <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('helpvideos')?>">Help</a></li> -->
      </ul>
      <ul class="side-nav" id="mobile-demo">
        <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url()?>">Home</a></li>
        <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('aboutus');?>">About us</a></li>
       <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('newvacancy')?>">Vacancy</a></li>
          <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('vacancyapply')?>">Apply </a></li>
        <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('register')?>">Register</a></li>
        <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('services')?>">Our Services</a></li>
        <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('images')?>">Gallery</a></li>
        <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('contactus')?>">Contact</a></li>
      </ul>
      <a href="<?php echo base_url()?>" >
    <i class="responsive-img texlogo"></i>
</a>
      <!-- <div class="responsive-img texlogo"></div> -->
    </div>
  </div>
</nav>
</div>

 <script type="text/javascript">
      $(document).ready(function () {
          var url = window.location;
          // enable active class for direct parent
          $('#nav-mobile > li > a').filter(function () {
              return this.href == url;
          }).parent().addClass('selected');
      
          // enable active class for drop down menus
          $('#nav-mobile > li  > ul > li > a').filter(function () {
              return this.href == url;
          }).parent().parent().parent().addClass('selected');
      
          // enable active class for drop down menus
          $('#nav-mobile > li  > ul > li > a').filter(function () {
              return this.href == url;
          }).parent().addClass('selected');
    
      });
  </script>

  <style>
      .dropdown-content li.selected {
         background-color: rgba(132, 206, 243, 0.95);
      }

      .headtop {
        background-color: #2695F3;
        color: #fff;
        font-weight: 500;
        text-align: center;
        font-size: 21px;
      }

     .headtop a {
        color: gold;
        font-weight: bold;
        text-align: center;
        font-size: 18px;
      }

      a.marhdtp:hover {
        background-color: transparent !important;
      }

      div#:0.targetLanguage {
        height: 10px !important;
        margin-top: -14px !important;
      }
      .goog-logo-link {
        display:none !important;
      } 
      div#:0.targetLanguage:after {
        display:none !important;
      }

      #google_translate_element {
        position: absolute;
        top: 1px;
        right: 16px!important;
        z-index: 99999;
        height: 10px !important;
      }
      .goog-te-gadget {
        font-family: Roboto, 'Open Sans', sans-serif!important;
        text-transform: uppercase;
      }
      .goog-te-gadget-simple  {
        background-color: rgba(255,255,255,0.20)!important;
        border: 1px solid rgba(255,255,255,0.50) !important;
        padding: 3px !important;
        border-radius: 4px!important;
        font-size: 0.5rem !important;
        line-height: 0.3rem !important;
        display: inline-block;
        cursor: pointer;
        zoom: 0.7;
      }
      .goog-te-menu2 {
        max-width: 100%;
      }
      .goog-te-menu-value {
        color: #fff !important;
          &:before {
          font-family: 'Material Icons';
          content: "\E927";
          margin-right: 16px;
          font-size: 2rem;
          vertical-align: -10px;
          // width:32px!important;
        } 
      }
      .goog-te-menu-value span:nth-child(5) {
        display:none;
      }
      .goog-te-menu-value span:nth-child(3) {
        border:none!important;
        font-family: 'Material Icons';
        &:after {
          font-family: 'Material Icons';
          content: "\E5C5";
          font-size: 1rem;
          vertical-align: -6px;
        }  
      }

      .goog-te-gadget-icon {
          background-image: url(https://placehold.it/32)!important;
          background-position: 0px 0px;
          height: 32px!important;
          width: 32px!important;
          margin-right: 8px!important;
          //     OR
          display: none;
      }
      // ============ HIDE TOP BAR ============ 
      .skiptranslate {
        display:none !important;
      }
      iframe.goog-te-banner-frame.skiptranslate {display: none!important;} 
      body {top: 0px!important;}

      /* ================================== *\
          Mediaqueries
      \* ================================== */
      @media (max-width: 667px) {
        #google_translate_element {
          bottom: calc(100% - 50% - 53px);
          left: 16px!important;
          width: 100%!important;
          goog-te-gadget {
            width:100%!important;
          }
          .skiptranslate {
            width:100%!important;			
          }
          .goog-te-gadget-simple {
            width: calc(100% - 32px)!important;
            text-align: center;
          }	
        }
      }
      .login-btn-header
      {
        float: left;
    z-index: 9999999999999999999;
    position: absolute;
    top: 7px;
    border-radius: 5px;
    right: -160px;
    background-color: #2196F3;
    border: none;
    padding: 6px;
      }
  </style>