<html>
   <head>
      <title>Texco - Employee</title>
      <link rel="shortcut icon" href="<?php echo base_url("assets/images/clientletter.jpg")?>" />
      <link rel="stylesheet" type="text/css" href="<?php echo base_url("assets/css/icon.css")?>" />
      <link rel="stylesheet" type="text/css" href="<?php echo base_url("assets/css/materialize.css")?>" />
      <link rel="stylesheet" type="text/css" href="<?php echo base_url("assets/css/materialdesignicons.min.css")?>" />
      <link rel="stylesheet" type="text/css" href="<?php echo base_url("assets/css/texco.css")?>" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <script type="text/javascript" src="<?php echo base_url("assets/libs/jquery/3.7.1/jquery.min.js")?>"></script>
      <script type="text/javascript" src="<?php echo base_url("assets/libs/angular/1.8.2/angular.min.js")?>"></script>
      <script type="text/javascript" src="<?php echo base_url("assets/libs/materialize/1.0.0/js/materialize.min.js")?>"></script>
      <script type="text/javascript"> var base_url = "<?php echo base_url()?>" </script>
      <script type="text/javascript"> var api_url = "<?php echo config_item('api_url')?>" </script>
      <script type="text/javascript"> var regionid = "<?php echo $this->session->userdata('regionid');?>" </script>
      <script type="text/javascript"> var atoken = "<?php echo $this->session->usertoken('atoken')?>" </script>
      <script type="text/javascript"> var base64Key = "<?php echo $this->session->usertoken('base64key')?>" ; </script>
      <script type="text/javascript"> var iv = "<?php echo $this->session->usertoken('iv')?>" ; </script>
   </head>
   <body  style="background-color:#f9f9f9">
      <div class="navbar-fixed">
         <nav class="nav-extended white">
            <div class="nav-content indigo z-depth-2">
               <div class="container">
                  <div class="header indigo  hide-on-med-and-down">
                     <div class="left "> </div>
                     <div class="right">
                        <ul class="left">
                           <li class="logdet" style="margin-top: 5px;">Welcome <?php echo $username;?></li>
                           <li class="collection-item avatar avt"> <img src="<?php echo base_url("assets/images/clientletter.jpg")?>" alt="" class="circle responsive-img"></li>
                           <!-- Dropdown Trigger -->
                           <li><a class='dropdown-button white-text' href='#' data-activates='Profiledd'><i class="mdi mdi mdi-dots-vertical"></i></a></li>
                           <!-- Dropdown Structure -->
                           <ul id='Profiledd' class='dropdown-content'>
                              <li class="black-text"><a href="<?php echo base_url('admin/profile')?>"><i class="mdi mdi-face"></i> Profile</a> </li>
                              <li><a href="<?php echo base_url('admin/changepassword')?>"><i class="mdi mdi-account-settings-variant"></i>Change Password</a> </li>
                              <li class="divider"></li>
                              <li><a href="<?php echo base_url('ams/logout')?>"><i class="mdi mdi-logout-variant"></i> Logout</a> </li>
                           </ul>
                        </ul>
                     </div>
                  </div>
               </div>
            </div>
            <div class="container">
               <div class="nav-wrapper">
                  <a href="#" data-activates="mobile-demo" class="button-collapse"><i class="grey-text  material-icons">
                  menu</i></a>
                  <ul id="nav-mobile" class="right hide-on-med-and-down">
                     <div style="height: 25px;"></div>
                     <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('ams/dashboard')?>">Dashboard</a></li>
                   <li class="black-text"><a class='dropdown-button waves-effect headermenuselect' data-activates='jobposting'>Jobs</a></li>
<ul id='jobposting' class='dropdown-content'>
<li>
                   <?php //if($roledata['permissions']['VJOBCONFIR']==1) {?>
                        <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('ams/newvacancyapplist')?>">Job willing</a></li>
</li>                   <?php //} ?>
</ul>

                   <!--  <ul id='jobposting' class='dropdown-content'>
                        <?php if($roledata['permissions']['VJOBPOST']==1) {?>
                        <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('ams/jobposting')?>">Job Posting</a></li>
                        <?php } ?>
                        <?php if($roledata['permissions']['VJOBCONFIR']==1) {?>
                        <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('ams/confirm')?>">Job Confirmation</a></li>
                        <?php } ?>
                        <?php if($roledata['permissions']['VMANAGEJOB']==1) {?>
                        <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('ams/manage')?>">Manage Jobs</a></li>
                        <?php } ?>
                        <?php if($roledata['permissions']['VJOBPOST']==1) {?>
                        <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('ams/employeeresignation')?>">Job Resignation</a></li>
                        <?php } ?>
                         <?php if($roledata['permissions']['VJOBPOST']==1) {?>
                        <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('ams/vacancy')?>">Vacancy</a></li>
                        <?php } ?>
                     </ul> -->
                     <li class="black-text"><a class='dropdown-button waves-effect headermenuselect' data-activates='clients'">Employers </a></li>
                     <ul id='clients' class='dropdown-content'>
                        <?php if($roledata['permissions']['VCLIENT']==1) {?>
                        <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('ams/clients')?>">Employers (Clients) </a></li>
                        <?php } ?>
                        <?php if($roledata['permissions']['VPROJECT']==1) {?>
                        <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('ams/projects')?>">Projects</a></li>
                        <?php } ?>
                        <?php if($roledata['permissions']['VAGREE']==1) {?>
                        <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('ams/agreement')?>">Agreement</a></li>
                        <?php } ?>
                        <?php if($roledata['permissions']['VATTEND']==1) {?>
                        <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('ams/adminattendance')?>">Attendance</a></li>
                        <?php } ?>
                     <!-- <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('ams/invoice')?>">Invoice</a></li> -->
                      
                     </ul>  
                     <?php if($roledata['permissions']['MEMFORM']==1) { ?>
                        <li class="black-text"><a class='dropdown-button waves-effect headermenuselect' data-activates='membersss'"> Members </a></li> 
                     <?php } ?>
                     <ul id='membersss' class='dropdown-content'> 
                        <?php if($roledata['permissions']['MEMFORM']==1) { ?>
                           <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('ams/registerform')?>">Add Member</a></li> 
                           <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('ams/memberhistoryform')?>">MemberHistory</a></li>  
                        <?php } ?>
                     </ul>
                     <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('ams/helpvideos')?>">Help Videos</a></li>  
                     <!-- <li class="black-text"><a class='dropdown-button waves-effect headermenuselect' data-activates='master'>Master Entry</a></li>
                     <ul id='master' class='dropdown-content'>
                        <?php if($roledata['permissions']['VMEMBERS']==1) {?>
                        <li class="black-text"><a class="waves-effect headermenu" href="<?php echo base_url('ams/members')?>">Employees (Ex-servicemens)</a></li>
                        <?php } ?>
                        <?php if($roledata['permissions']['VEMPLOYEE']==1) {?>
                        <li class="black-text"><a class="waves-effect headermenu" href="<?php echo base_url('ams/employees')?>">Staff</a></li>
                        <?php } ?>
                        <?php if($roledata['permissions']['VDIRECTOR']==1) {?>
                        <li class="black-text"><a class="waves-effect headermenu" href="<?php echo base_url('ams/directors')?>">Directors</a></li>
                        <?php } ?>
                        <?php if($roledata['permissions']['VDIRECTOR']==1) {?>
                        <li class="black-text"><a class="waves-effect headermenu" href="<?php echo base_url('ams/officers')?>">Officers</a></li>
                        <?php } ?>
                        <?php if($roledata['permissions']['VJOBMASTER']==1) {?>
                        <li class="black-text"><a class="waves-effect headermenu" href="<?php echo base_url('ams/jobmaster')?>">Lookup Master</a></li>
                        <?php } ?>
                         <li class="black-text"><a class="waves-effect headermenu" href="<?php echo base_url('ams/wagemaster')?>">Wage Master</a></li>
                         <li class="black-text"><a class="waves-effect headermenu" href="<?php echo base_url('ams/taluks')?>">Taluks</a></li>
                         <li class="black-text"><a class="waves-effect headermenu" href="<?php echo base_url('ams/taluks')?>">Taluks</a></li>
                     </ul> -->
                     <!-- <li class="black-text"><a class='dropdown-button waves-effect headermenuselect' data-activates='settings'>Settings</a></li>
                     <ul id='settings' class='dropdown-content'>
                        <?php if($roledata['permissions']['ROLES']==1) {?>
                        <li class="black-text"><a class="waves-effect headermenu" href="<?php echo base_url('ams/roles')?>">Permissions</a></li>
                        <?php } ?>
                        <?php if($roledata['permissions']['VDOCUMENTS']==1) {?>
                        <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('ams/documents')?>">Documents</a></li>
                        <?php } ?>
                        <?php if($roledata['permissions']['VGALLERY']==1) {?>
                        <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('ams/gallery')?>">Gallery</a></li>
                        <?php } ?>
                        <?php if($roledata['permissions']['VSETTINGS']==1) {?>
                        <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('ams/settings')?>">Settings</a></li>
                        <?php } ?>
                        <?php if($roledata['permissions']['VSETTINGS']==1) {?>
                        <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('ams/lastaccess')?>">Employees LastAccess</a></li>
                        <?php } ?>
                     </ul> -->
                    <li class="black-text"><a class='dropdown-button waves-effect headermenuselect' data-activates='reports'>Reports</a></li>
                     <ul id='reports' class='dropdown-content'>
                        <?php if($roledata['permissions']['VPREPORT']==1) {?>
                        <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('ams/projectreport')?>">Projects</a></li>
                        <?php } ?>
                        <?php if($roledata['permissions']['CVREPORT']==1) {?>
                        <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('ams/collectionreport')?>">Collection Report</a></li>
                        <?php } ?>
                        <?php if($roledata['permissions']['VAGREPORT']==1) {?>
                        <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('ams/agreementreport')?>">Agreement</a></li>
                        <?php } ?>
                        <?php if($roledata['permissions']['VEREPORT']==1) {?>
                        <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('ams/employeereport')?>">Employees</a></li>
                        <?php } ?>
                        <?php if($roledata['permissions']['VJREPORT']==1) {?>
                        <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('ams/jobpostingreport')?>">Job Posting</a></li>
                        <?php } ?>
                        
                       <?php if($roledata['permissions']['VATREPORT']==1) {?>
                        <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('ams/attendancereport')?>">Attendance</a></li>
                        <?php } ?>
                         <?php if($roledata['permissions']['VIREPORT']==1) {?>
                        <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('ams/invoicereport')?>">Invoice</a></li>
                        <?php } ?> 
                        <?php if($roledata['permissions']['VEREPORT']==1) {?>
                        <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('ams/allemployees')?>">All employees</a></li>
                        <?php } ?>
                        <?php if($roledata['permissions']['VIREPORT']==1) {?>
                        <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('ams/postedlistreport')?>">Postedlist</a></li>
                        <?php } ?>
                     </ul> -->
                  </ul>
                  <ul class="side-nav" id="mobile-demo">
                     <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('ams/dashboard')?>">Dashboard</a></li>
                     <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('ams/confirm')?>">Job Confirmation</a></li>
                     <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('ams/jobposting')?>">Job Posting</a></li>
                     <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('ams/projects')?>">Projects</a></li>
                     <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('ams/clients')?>">Employers</a></li>
                     <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('ams/members')?>">Employees</a></li>
                     <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('ams/employees')?>">Staff</a></li>
                     <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('ams/directors')?>">Directors</a></li>
                     <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('ams/jobmaster')?>">Job Master</a></li>
                     <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('ams/roles')?>">Permissions</a></li>
                     <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('ams/documents')?>">Documents</a></li>
                     <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('ams/gallery')?>">Gallery</a></li>
                     <li class="black-text"><a class="waves-effect headermenuselect" href="<?php echo base_url('ams/settings')?>">Settings</a></li>
                  </ul>
                  <div class="responsive-img texlogo"></div>
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
      .scroll {
         height: 600px;
         overflow-y: scroll;
      }
      </style>