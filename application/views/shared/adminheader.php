<html>

<head>
   <title>Texco - Employee</title>
   <link rel="shortcut icon" href="<?php echo base_url("assets/images/clientletter.jpg") ?>" />
   <link rel="stylesheet" type="text/css" href="<?php echo base_url("assets/css/icon.css") ?>" />
   <link rel="stylesheet" type="text/css" href="<?php echo base_url("assets/css/materialize.css") ?>" />
   <link rel="stylesheet" type="text/css" href="<?php echo base_url("assets/css/materialdesignicons.min.css") ?>" />
   <link rel="stylesheet" type="text/css" href="<?php echo base_url("assets/css/texco.css") ?>" />
   <meta name="viewport" content="width=device-width, initial-scale=1.0" />
   <script type="text/javascript" src="<?php echo base_url("assets/libs/jquery/3.7.1/jquery.min.js") ?>"></script>
   <script type="text/javascript" src="<?php echo base_url("assets/libs/angular/1.8.2/angular.min.js") ?>"></script>
   <script type="text/javascript" src="<?php echo base_url("assets/libs/materialize/1.0.0/js/materialize.min.js") ?>"></script>
    
   <!-- <script type='text/javascript' src="<?php echo base_url("assets/js/lib/aes.js") ?>"></script> 
   <script type="text/javascript" src="<?php echo base_url("assets/js/lib/angularjs-crypto.js") ?>"></script>
   <script type="text/javascript" src="<?php echo base_url("assets/js/lib/CryptoJSCipher.js") ?>"></script> -->
    
   <script type="text/javascript"> var atoken = "<?php echo $this->session->usertoken('atoken')?>" ; </script>
   <script type="text/javascript"> var base64Key = "<?php echo $this->session->usertoken('base64key')?>" ; </script>
   <script type="text/javascript"> var iv = "<?php echo $this->session->usertoken('iv')?>" ; </script>

   <script type="text/javascript">
      var base_url = "<?php echo base_url() ?>"
   </script>
   <script type="text/javascript">
      var api_url = "<?php echo config_item('api_url') ?>"
   </script>
   <script type="text/javascript">
      var regionid = "0";
   </script>
   <script type="text/javascript" src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>
   <script>
      $('#google_translate_element').on("click", function() {
         // Change font family and color
         $("iframe").contents().find(".goog-te-menu2-item div, .goog-te-menu2-item:link div, .goog-te-menu2-item:visited div, .goog-te-menu2-item:active div, .goog-te-menu2 *")
            .css({
               'color': '#544F4B',
               'font-family': 'Roboto',
               'width': '100%'
            });
         // Change menu's padding
         $("iframe").contents().find('.goog-te-menu2-item-selected').css('display', 'none');

         // Change menu's padding
         $("iframe").contents().find('.goog-te-menu2').css('padding', '0px');

         // Change the padding of the languages
         $("iframe").contents().find('.goog-te-menu2-item div').css('padding', '20px');

         // Change the width of the languages
         $("iframe").contents().find('.goog-te-menu2-item').css('width', '100%');
         $("iframe").contents().find('td').css('width', '100%');

         // Change hover effects
         $("iframe").contents().find(".goog-te-menu2-item div").hover(function() {
            $(this).css('background-color', '#4385F5').find('span.text').css('color', 'white');
         }, function() {
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
         new google.translate.TranslateElement({
            pageLanguage: 'en',
            includedLanguages: 'ta,en',
            layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false
         }, 'google_translate_element');
      }
   </script>
</head>

<body style="background-color:#f9f9f9">
   <div class="navbar-fixed">
      <nav class="nav-extended white">
         <div class="nav-content indigo z-depth-2">
            <div class="container-fluid">
               <div class="header indigo  hide-on-med-and-down">
                  <div class="right">
                     <div id="google_translate_element"></div>
                  </div>
                  <div class="right" style="margin-right:10% !important">
                     <ul class="left">
                        <li class="logdet" style="margin-top: 5px;">Welcome <?php echo $username; ?></li>
                        <li class="collection-item avatar avt"> <img src="<?php echo base_url("assets/images/clientletter.jpg") ?>" alt="" class="circle responsive-img"></li>
                        <!-- Dropdown Trigger -->
                        <li><a class='dropdown-button white-text' href='#' data-activates='Profiledd'><i class="mdi mdi mdi-dots-vertical"></i></a></li>
                        <!-- Dropdown Structure -->
                        <ul id='Profiledd' class='dropdown-content'>
                           <li class="black-text"><a href="<?php echo base_url('admin/profile') ?>"><i class="mdi mdi-face"></i> Profile</a> </li>
                           <li><a href="<?php echo base_url('admin/changepassword') ?>"><i class="mdi mdi-account-settings-variant"></i>Change Password</a> </li>
                           <li class="divider"></li>
                           <li><a href="<?php echo base_url('admin/logout') ?>"><i class="mdi mdi-logout-variant"></i> Logout</a> </li>
                        </ul>
                     </ul>
                  </div>
               </div>
            </div> 
         </div>
         <div class="container-wrap">
            <div class="nav-wrapper">
               <a href="#" data-activates="mobile-demo" class="button-collapse"><i class="grey-text  material-icons">
                     menu</i></a>
               <ul id="nav-mobile" class="right hide-on-med-and-down">
                  <div style="height: 25px;"></div>
                  <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('admin/dashboard') ?>">Dashboard</a></li>
                  <?php if ($roledata['permissions']['VJOBS'] == 1) { ?>
                     <li class="black-text"><a class='dropdown-button waves-effect headermenuselect' data-activates='jobposting'>Jobs</a></li>
                     <ul id='jobposting' class='dropdown-content'>
                        <?php if ($roledata['permissions']['VJOBPOST'] == 1) { ?>
                        <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('admin/jobposting') ?>">Job Posting</a></li>
                        <?php } ?>
                        <?php if ($roledata['permissions']['VJOBPOST'] == 1) { ?>
                        <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('admin/carryforward') ?>">Carry Forward</a></li>
                        <?php } ?>
                        <?php if ($roledata['permissions']['VJOBCONFIR'] == 1) { ?>
                        <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('admin/confirm') ?>">Job Confirmation</a></li>
                        <?php } ?>
                        <?php if ($roledata['permissions']['VMANAGEJOB'] == 1) { ?>
                        <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('admin/manage') ?>">Manage Jobs</a></li>
                        <?php } ?>
                        <?php if ($roledata['permissions']['VJOBPOSTED'] == 1) { ?>
                        <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('admin/postingorderedit') ?>">Posting Order</a></li>
                        <?php } ?>
                        <?php if ($roledata['permissions']['VJOBPOST'] == 1) { ?>
                        <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('admin/employeeresignation') ?>">Job Resignation</a></li>
                        <?php } ?>
                        <?php if ($roledata['permissions']['VJOBPOST'] == 1) { ?>
                        <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('admin/vacancy') ?>">Vacancy</a></li>
                        <?php } ?>
                        <?php if ($roledata['permissions']['VJOBPOST'] == 1) { ?>
                        <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('admin/rejectedvacancy') ?>">Rejected Vacancy</a></li>
                        <?php } ?>
                        <?php if ($roledata['permissions']['VMEMBERS'] == 1) { ?>
                        <li class="black-text"><a class="waves-effect headermenu" href="<?php echo base_url('admin/memberblock') ?>">Block (Ex-servicemens)</a></li>
                        <?php } ?>
                     </ul>
                  <?php } ?>
                  <?php if ($roledata['permissions']['VEMPLOYERS'] == 1) { ?>
                     <li class="black-text"><a class='dropdown-button waves-effect headermenuselect' data-activates='clients'>Employers</a></li>
                     <ul id='clients' class='dropdown-content'>
                        <?php if ($roledata['permissions']['VCLIENT'] == 1) { ?>
                           <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('admin/clients') ?>">Employers (Clients) </a></li>
                        <?php } ?>
                        <?php if ($roledata['permissions']['VPROJECT'] == 1) { ?>
                           <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('admin/projects') ?>">Projects</a></li>
                        <?php } ?>
                        <?php if ($roledata['permissions']['VAGREE'] == 1) { ?>
                           <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('admin/agreement') ?>">Agreement</a></li>
                        <?php } ?>
                        <?php if ($roledata['permissions']['VATTEND'] == 1) { ?>
                           <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('admin/attendancereview') ?>">Attendance Review</a></li>
                        <?php } ?>
                        <?php if ($roledata['permissions']['VPAYSLIP'] == 1) { ?>
                           <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('admin/payslip') ?>">Pay Slip</a></li>
                        <?php } ?>
                        <?php if ($roledata['permissions']['VEXPAYSLIP'] == 1) { ?>
                           <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('admin/expayslip') ?>">Ex-Pay Slip</a></li>
                        <?php } ?>
                        <?php if ($roledata['permissions']['VINVOICE'] == 1) { ?>
                           <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('admin/invoice') ?>">Invoice</a></li>
                        <?php } ?>
                        <?php if ($roledata['permissions']['VAUTHORIZE'] == 1) { ?>
                           <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('admin/authorize') ?>">Authorize</a></li>
                        <?php } ?>
                        <?php if ($roledata['permissions']['VBANKSLIP'] == 1) { ?>
                           <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('admin/bankslip') ?>">Bank Slip</a></li>
                        <?php } ?>
                        <?php if ($roledata['permissions']['VARREAR'] == 1) { ?>
                           <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('admin/arrears') ?>">Arrears</a></li>
                        <?php } ?>
                     </ul>
                  <?php } ?>
                  <?php if ($roledata['permissions']['VFINANCE'] == 1) { ?>
                     <li class="black-text"><a class='dropdown-button waves-effect headermenuselect' data-activates='finance'>Finance</a></li>
                     <ul id='finance' class='dropdown-content'>
                     <?php if ($roledata['permissions']['FEXPINV'] == 1) { ?>
                        <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('admin/exportinvoice') ?>">Export Invoice</a></li>
                     <?php } ?>
                     <?php if ($roledata['permissions']['FBKPRINT'] == 1) { ?>
                        <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('admin/bulkprint') ?>">Bulk Print</a></li>
                     <?php } ?> 
                     <!-- <?php if ($roledata['permissions']['FEXPINV'] == 1) { ?>
                        <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('admin/claimaddress') ?>">Claim Address</a></li>
                     <?php } ?> -->
                     <?php if ($roledata['permissions']['VAUTHSTATS'] == 1) { ?>
                        <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('admin/authorizestatus') ?>">Attendance Status</a></li>
                     <?php } ?>
                     </ul>
                  <?php } ?>
                  <?php if ($roledata['permissions']['VMASTER'] == 1) { ?>
                     <li class="black-text"><a class='dropdown-button waves-effect headermenuselect' data-activates='master'>Master Entry</a></li>
                     <ul id='master' class='dropdown-content'>
                        <?php if ($roledata['permissions']['VMEMBERS'] == 1) { ?>
                           <!-- <li class="black-text"><a class="waves-effect headermenu" href="<?php /// echo base_url('admin/members') ?>">Employees (Ex-servicemens)</a></li> -->
                        <?php } ?>
                        <?php if ($roledata['permissions']['VMEMBERSEA'] == 1) { ?>
                           <li class="black-text"><a class="waves-effect headermenu" href="<?php echo base_url('admin/memberssearch') ?>">Employees (Ex-servicemens)</a></li>
                        <?php } ?>
                        <?php if ($roledata['permissions']['VMEMBERS58'] == 1) { ?>
                           <li class="black-text"><a class="waves-effect headermenu" href="<?php echo base_url('admin/expmembers') ?>">Employees (Above 58)</a></li>
                        <?php } ?>
                        <?php if ($roledata['permissions']['VMEMBERSDE'] == 1) { ?>
                           <li class="black-text"><a class="waves-effect headermenu" href="<?php echo base_url('admin/deletemembers') ?>">Delete Members (Ex-servicemens)</a></li>
                        <?php } ?>
                        <?php if ($roledata['permissions']['VMEMBERSCL'] == 1) { ?>
                           <li class="black-text"><a class="waves-effect headermenu" href="<?php echo base_url('admin/closedmembers') ?>">Closed Project Members (Ex-servicemens)</a></li>
                        <?php } ?>
                        <?php if ($roledata['permissions']['VEMPLOYEE'] == 1) { ?>
                           <li class="black-text"><a class="waves-effect headermenu" href="<?php echo base_url('admin/employees') ?>">Staff</a></li>
                        <?php } ?>
                        <?php if ($roledata['permissions']['VDIRECTOR'] == 1) { ?>
                           <li class="black-text"><a class="waves-effect headermenu" href="<?php echo base_url('admin/directors') ?>">Directors</a></li>
                        <?php } ?>
                        <?php if ($roledata['permissions']['VDIRECTOR'] == 1) { ?>
                           <li class="black-text"><a class="waves-effect headermenu" href="<?php echo base_url('admin/officers') ?>">Officers</a></li>
                        <?php } ?>
                        <?php if ($roledata['permissions']['VLOOKUP'] == 1) { ?>
                           <li class="black-text"><a class="waves-effect headermenu" href="<?php echo base_url('admin/jobmaster') ?>">Lookup Master</a></li>
                        <?php } ?>
                        <?php if ($roledata['permissions']['VWAGE'] == 1) { ?>
                           <li class="black-text"><a class="waves-effect headermenu" href="<?php echo base_url('admin/wagemaster') ?>">Wage Master</a></li>
                        <?php } ?>
                       
                     </ul>
                  <?php } ?>
                  <?php if ($roledata['permissions']['VSETTINGS'] == 1) { ?>
                     <li class="black-text"><a class='dropdown-button waves-effect headermenuselect' data-activates='settings'>Settings</a></li>
                     <ul id='settings' class='dropdown-content'>
                        <?php if ($roledata['permissions']['ROLES'] == 1) { ?>
                        <li class="black-text"><a class="waves-effect headermenu" href="<?php echo base_url('admin/roles') ?>">Permissions</a></li>
                        <?php } ?>
                        <?php if ($roledata['permissions']['VDOCUMENTS'] == 1) { ?>
                        <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('admin/documents') ?>">Documents</a></li>
                        <?php } ?>
                        <?php if ($roledata['permissions']['VGALLERY'] == 1) { ?>
                        <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('admin/gallery') ?>">Gallery</a></li>
                        <?php } ?>
                        <?php if ($roledata['permissions']['VSETTINGS'] == 1) { ?>
                        <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('admin/settings') ?>">Settings</a></li>
                        <?php } ?>
                        <?php if ($roledata['permissions']['VSETTINGS'] == 1) { ?>
                        <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('admin/lastaccess') ?>">Employees LastAccess</a></li>
                        <?php } ?>
                        <?php if ($roledata['permissions']['VTALUKS'] == 1) { ?>
                           <li class="black-text"><a class="waves-effect headermenu" href="<?php echo base_url('admin/taluks') ?>">Taluks</a></li>
                        <?php } ?>
                        <?php if ($roledata['permissions']['VCATEGORY'] == 1) { ?>
                           <li class="black-text"><a class="waves-effect headermenu" href="<?php echo base_url('admin/category') ?>">Category</a></li>
                        <?php } ?>
                        <?php if ($roledata['permissions']['VCATEGORY'] == 1) { ?>
                           <li class="black-text"><a class="waves-effect headermenu" href="<?php echo base_url('admin/userlogoff') ?>">User logoff</a></li>
                        <?php } ?>
                     </ul>
                  <?php } ?>
                  <?php if ($roledata['permissions']['VREPORTS'] == 1) { ?>
                     <li class="black-text"><a class='dropdown-button waves-effect headermenuselect' data-activates='reports'>Reports</a></li>
                     <ul id='reports' class='dropdown-content'>      
                        <?php if ($roledata['permissions']['VIREPORT'] == 1) { ?>
                           <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('admin/categorywise') ?>">CategoryWise</a></li>
                        <?php } ?>
                        <?php if ($roledata['permissions']['VIREPORT'] == 1) { ?>
                        <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('admin/dgrcountreport') ?>">DGR Count</a></li>
                        <?php } ?>
                        <?php if ($roledata['permissions']['VIREPORT'] == 1) { ?>
                        <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('admin/tncountreport') ?>">TN Count</a></li>
                        <?php } ?>
                        <?php if ($roledata['permissions']['VIREPORT'] == 1) { ?>
                           <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('admin/totalcount') ?>">Total Count</a></li>
                        <?php } ?>
                        <?php if ($roledata['permissions']['VIREPORT'] == 1) { ?>
                              <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('admin/districtwisecount') ?>">DistrictWise Count</a></li>
                        <?php } ?>
                        <?php if ($roledata['permissions']['VIREPORT'] == 1) { ?>
                              <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('admin/districtcount') ?>">District Count</a></li>
                        <?php } ?>
                        <?php if ($roledata['permissions']['VEREPORT'] == 1) { ?>
                        <!-- <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('admin/employeereport') ?>">All Employees</a></li> -->
                        <?php } ?>
                        <?php if ($roledata['permissions']['VJREPORT'] == 1) { ?>
                           <!-- <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('admin/jobpostingreport') ?>">Job Posting</a></li> -->
                        <?php } ?>
                        <?php if ($roledata['permissions']['VIREPORT'] == 1) { ?>
                           <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('admin/postedlistreport') ?>">Posted List</a></li>
                        <?php } ?>
                        <?php if ($roledata['permissions']['VIREPORT'] == 1) { ?>
                           <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('admin/strengthreport') ?>">Strength</a></li>
                        <?php } ?>
                        <?php if ($roledata['permissions']['VPREPORT'] == 1) { ?>
                           <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('admin/projectreport') ?>">Projects</a></li>
                        <?php } ?>                      
                        <?php if ($roledata['permissions']['VIREPORT'] == 1) { ?>
                        <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('admin/membercount') ?>">Member Count</a></li>
                        <?php } ?> 

                        <?php if ($roledata['permissions']['LGVREPORT'] == 1) { ?>
                        <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('admin/loginmembers') ?>">Login Report</a></li>
                        <?php } ?> 

                     </ul>
                  <?php } ?>
                  <?php if ($roledata['permissions']['VREPORTS'] == 1) { ?>
                     <li class="black-text"><a class='dropdown-button waves-effect headermenuselect' data-activates='accreports'>Accounts Reports</a></li>
                        <ul id='accreports' class='dropdown-content'>  
                           <?php if ($roledata['permissions']['VAGREPORT'] == 1) { ?>
                              <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('admin/agreementreport') ?>">Agreement</a></li>
                           <?php } ?> 
                           <?php if ($roledata['permissions']['VAGREPORT'] == 1) { ?>
                              <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('admin/newprojectslist') ?>">New Projects</a></li>
                           <?php } ?> 
                           <?php if ($roledata['permissions']['VPREPORT'] == 1) { ?>
                              <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('admin/districtwiseincrease') ?>">DistrictWiseIncr</a></li>
                           <?php } ?>
                           <?php if ($roledata['permissions']['VPREPORT'] == 1) { ?>
                              <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('admin/projectwiseincreased') ?>">Project Wise Incr</a></li>
                           <?php } ?>
                           <?php if ($roledata['permissions']['VPREPORT'] == 1) { ?>
                              <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('admin/projectwisecount') ?>">Project Wise Count</a></li>
                           <?php } ?>
                           <?php if ($roledata['permissions']['VIREPORT'] == 1) { ?>
                           <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('admin/deptwisereport') ?>">Dept Wise Report</a></li>
                           <?php } ?> 
                           <!-- <?php if ($roledata['permissions']['VATREPORT'] == 1) { ?>
                              <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('admin/attendancereport') ?>">Attendance</a></li>
                           <?php } ?>
                           <?php if ($roledata['permissions']['VIREPORT'] == 1) { ?>
                              <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('admin/projectwisesalary') ?>">ProjectWise Salary</a></li>
                           <?php } ?> -->
                           <?php if ($roledata['permissions']['VIREPORT'] == 1) { ?>
                              <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('admin/memberwisesalary') ?>">Member Wise Salary</a></li>
                           <?php } ?> 
                           <?php if ($roledata['permissions']['VIREPORT'] == 1) { ?>
                              <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('admin/categorywisesalary') ?>">CategoryWise Salary</a></li>
                           <?php } ?>
                           <?php if ($roledata['permissions']['VIREPORT'] == 1) { ?>
                              <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('admin/newmembers') ?>">New Members</a></li>
                           <?php } ?>

                           <?php if ($roledata['permissions']['CVREPORT'] == 1) { ?>
                              <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('admin/collectionreport') ?>">Collection Report </a></li>
                           <?php } ?>
                           <!-- <?php if ($roledata['permissions']['VIREPORT'] == 1) { ?>
                              <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('admin/invoicereport') ?>">Invoice</a></li>
                           <?php } ?>
                           <?php if ($roledata['permissions']['VIREPORT'] == 1) { ?>
                              <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('admin/districtreport') ?>">District</a></li>
                           <?php } ?> -->

                          
                        </ul>  
                  <?php } ?>
                  <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('admin/helpvideos') ?>">Help</a></li>
               </ul>
               <ul class="side-nav" id="mobile-demo">
                  <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('admin/dashboard') ?>">Dashboard</a></li>
                  <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('admin/confirm') ?>">Job Confirmation</a></li>
                  <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('admin/jobposting') ?>">Job Posting</a></li>
                  <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('admin/projects') ?>">Projects</a></li>
                  <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('admin/clients') ?>">Employers</a></li>
                  <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('admin/members') ?>">Employees</a></li>
                  <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('admin/employees') ?>">Staff</a></li>
                  <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('admin/directors') ?>">Directors</a></li>
                  <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('admin/jobmaster') ?>">Job Master</a></li>
                  <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('admin/roles') ?>">Permissions</a></li>
                  <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('admin/documents') ?>">Documents</a></li>
                  <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('admin/gallery') ?>">Gallery</a></li>
                  <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('admin/settings') ?>">Settings</a></li>
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
      .dropdown-content li.selected {
         background-color: rgba(132, 206, 243, 0.95);
      }

      .scroll {
         height: 600px;
         overflow-y: scroll;
      }

      div#:0.targetLanguage {
         height: 10px !important;
         margin-top: -14px !important;
      }

      .goog-logo-link {
         display: none !important;
      }

      div#:0.targetLanguage:after {
         display: none !important;
      }

      #google_translate_element {
         position: absolute;
         top: 1px;
         left: 16px !important;
         z-index: 99999;
         height: 10px !important;
      }

      .goog-te-gadget {
         font-family: Roboto, 'Open Sans', sans-serif !important;
         text-transform: uppercase;
      }

      .goog-te-gadget-simple {
         background-color: rgba(255, 255, 255, 0.20) !important;
         border: 1px solid rgba(255, 255, 255, 0.50) !important;
         padding: 3px !important;
         border-radius: 4px !important;
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
         display: none;
      }

      .goog-te-menu-value span:nth-child(3) {
         border: none !important;
         font-family: 'Material Icons';

         &:after {
            font-family: 'Material Icons';
            content: "\E5C5";
            font-size: 1rem;
            vertical-align: -6px;
         }
      }

      .goog-te-gadget-icon {
         background-image: url(https://placehold.it/32) !important;
         background-position: 0px 0px;
         height: 32px !important;
         width: 32px !important;
         margin-right: 8px !important;
         //     OR
         display: none;
      }

      // ============ HIDE TOP BAR ============ 
      .skiptranslate {
         display: none !important;
      }

      iframe.goog-te-banner-frame.skiptranslate {
         display: none !important;
      }

      body {
         top: 0px !important;
      }

      /* ================================== *\
          Mediaqueries
      \* ================================== */
      @media (max-width: 667px) {
         #google_translate_element {
            bottom: calc(100% - 50% - 53px);
            left: 16px !important;
            width: 100% !important;

            goog-te-gadget {
               width: 100% !important;
            }

            .skiptranslate {
               width: 100% !important;
            }

            .goog-te-gadget-simple {
               width: calc(100% - 32px) !important;
               text-align: center;
            }
         }
      }
   </style>