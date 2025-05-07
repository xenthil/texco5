  <html>
  <head>
    <link rel="stylesheet" type="text/css" href="<?php echo base_url("assets/css/icon.css")?>" />
    <link rel="stylesheet" type="text/css" href="<?php echo base_url("assets/css/materialize.css")?>" />
    <link rel="stylesheet" type="text/css" href="<?php echo base_url("assets/css/materialdesignicons.min.css")?>" />
    <link rel="stylesheet" type="text/css" href="<?php echo base_url("assets/css/texco.css")?>" />

    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <script type="text/javascript" src="<?php echo base_url("assets/libs/jquery/3.7.1/jquery.min.js")?>"></script>
    <script type="text/javascript" src="<?php echo base_url("assets/libs/angular/1.8.2/angular.min.js")?>"></script>
    <script type="text/javascript" src="<?php echo base_url("assets/libs/materialize/1.0.0/js/materialize.min.js")?>"></script>

    <script type='text/javascript' src="<?php echo base_url("assets/js/lib/aes.js") ?>"></script> 
   <script type="text/javascript" src="<?php echo base_url("assets/js/lib/angularjs-crypto.js") ?>"></script>
	<script type="text/javascript" src="<?php echo base_url("assets/js/lib/CryptoJSCipher.js") ?>"></script>

  
	  <script type="text/javascript"> var api_url = "<?php echo config_item('api_url')?>" </script>
	  <script type="text/javascript"> var base_url = "<?php echo base_url()?>" </script>
    <script type="text/javascript"> var regionid = "0" </script>
    <script type="text/javascript"> var atoken = "<?php echo $this->session->usertoken('atoken')?>" </script>
   <script type="text/javascript"> var base64Key = "<?php echo $this->session->usertoken('base64key')?>" ; </script>
   <script type="text/javascript"> var iv = "<?php echo $this->session->usertoken('iv')?>" ; </script>
    <script type="text/javascript" src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>
    <script>
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

      function googleTranslateElementInit() {
         new google.translate.TranslateElement({pageLanguage: 'en', includedLanguages: 'ta,en', layout: google.translate.TranslateElement.InlineLayout.SIMPLE, autoDisplay: false}, 'google_translate_element');
      }

      </script>
  </head>

  <body  style="background-color:#f9f9f9">
    <div class="navbar-fixed">
      <nav class="nav-extended white">
        <div class="nav-content indigo z-depth-2">
          <div class="container-fluid">
            <div class="header indigo  hide-on-med-and-down">
            <div class="left">
              <div id="google_translate_element"></div>
            </div>
            <div class="right" style="margin-right:10% !important">
                <ul class="left">
                 <li class="logdet" style="margin-top: 5px;">Welcome <?php echo $organization;?></li>
                  <li class="collection-item avatar avt"><img src="<?php echo base_url("assets/images/clientletter.jpg")?>" alt="" class="circle responsive-img"></li>
                  <!-- Dropdown Trigger -->
                  <li><a class='dropdown-button white-text' href='#' data-activates='dropdown1'><i class="mdi mdi mdi-dots-vertical"></i></a></li>

                  <!-- Dropdown Structure -->
                  <ul id='dropdown1' class='dropdown-content'>
                   <li><a href="<?php echo base_url('client/changepassword')?>"><i class="mdi mdi-account-settings-variant"></i>Change Password</a> </li>
                    <li class="divider"></li>
                     <li><a href="<?php echo base_url("client/logout")?>"><i class="mdi mdi-logout-variant"></i> Logout</a> </li>
                  </ul>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="container">
          <div class="nav-wrapper"> <a href="#" data-activates="mobile-demo" class="button-collapse"><i class="grey-text  material-icons">menu</i></a>
            <ul id="nav-mobile" class="right hide-on-med-and-down">
              <div style="height: 25px;"></div>
              <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('client/dashboard')?>">Dashboard</a></li>
              <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('client/profile')?>">Profile</a></li>
              <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('client/project')?>">Project</a></li>
              <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('client/jobposting')?>">Job posting</a></li>
              <li class="black-text"><a class='dropdown-button waves-effect headermenuselect' data-activates='settings'>Attendance</a></li>
                <ul id='settings' class='dropdown-content'>
                  <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('client/addaccountnumber')?>">Add Account No</a></li>
                  <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('client/attendance')?>">Add Attendance</a></li>
                  <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('client/editclientattendance')?>">Edit Attendance</a></li>
                </ul>
              </li>
              <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('client/history')?>">Job History</a></li>
              <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('client/helpvideos')?>">Help</a></li>
            </ul>
            <ul class="side-nav" id="mobile-demo">
	            <li class="black-text"><a class="waves-effect headermenu" href="<?php echo base_url('client/dashboard')?>">Dashboard</a></li>
              <li class="black-text"><a class="waves-effect headermenu" href="<?php echo base_url('client/profile')?>">Profile</a></li>
              <li class="black-text"><a class="waves-effect headermenu" href="<?php echo base_url('client/project')?>">Project</a></li>
              <li class="black-text"><a class="waves-effect headermenu" href="<?php echo base_url('client/jobposting')?>">Job posting</a></li>
              <li class="black-text"><a class="waves-effect headermenu" href="<?php echo base_url('client/attendance')?>">Attendance</a></li>
              <li class="black-text"><a class="waves-effect headermenu" href="<?php echo base_url('client/history')?>">Job History</a></li>
            </ul>
          <div class="responsive-img texlogo"></div>
          </div>
        </div>
      </nav>
    </div>

<script type="text/javascript">
    $(document).ready(function() {
        var url = window.location;
        // enable active class for direct parent
        $('#nav-mobile > li > a').filter(function() {
            return this.href == url;
        }).parent().addClass('selected');

        // enable active class for drop down menus
        $('#nav-mobile > li  > ul > li > a').filter(function() {
            return this.href == url;
        }).parent().parent().parent().addClass('selected');

        // enable active class for drop down menus
        $('#nav-mobile > li  > ul > li > a').filter(function() {
            return this.href == url;
        }).parent().addClass('selected');

    });
</script>
<style>
  .scroll {
      height: 600px;
      overflow-y: scroll;
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
        left: 16px!important;
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
         font-size: 0.6rem !important;
         line-height: 0.3rem !important;
         display: inline-block;
         cursor: pointer;
         zoom: 0.9;
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
</style>

