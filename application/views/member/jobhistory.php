<script type="text/javascript" src="<?php echo base_url("assets/js/app/memberhistory.js")?>"></script>
<link rel="stylesheet" type="text/css" href="<?php echo base_url("assets/css/ng-table.min.css")?>" />
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ng-file-upload.min.js")?>"></script>

<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ng-table.min.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ui-bootstrap-tpls-0.11.0.js")?>"></script>
<script type="text/javascript"> var memberid = "<?php echo $this->session->userdata('memberid')?>" </script>
<div class="parallax-container" style="background-color: rgba(0, 12, 78, 0.9)">
   <div class="row">
      <div class="container">
         <div class="col s12 m6 l6">
            <div class="pagebannertext white-text">History</div>
         </div>
         <div class="col s12 m6 l6 right-align">
            <div class="dumheight hide-on-small-only"> </div>
            <div class=""> <a href="<?php echo base_url('member/dashboard')?>" class="breadcrumb">Home</a> <span class="breadcrumb">History</span> </div>
         </div>
      </div>
   </div>
   <div class="parallax"><img src="<?php echo base_url("assets/images/breadcrumbbanner.jpg")?>">
   </div>
</div>
<div class="row" ng-app="appAdminMember">
   <div class="container" ng-controller="ctrlAdminMember" ng-cloak>
      <div id="" class="section">
         <div id="Client-details" class="col s12">
            <table>
               <tr>
                  <th>S No</th>
                  <th>Texco No</th>
                  <th>Project No</th>
                  <th>Project Name</th>
                  <th>Category</th>
                  <th>Start Date</th>
                  <th>End Date</th>
               </tr>
               <tr ng-repeat="x in jobhistory">
                  <td>{{ $index + 1}}</td>
                  <td>{{ x.texcono}}</td>
                  <td>{{ x.projectno}}</td>
                  <td>{{ x.projectname}}</td>
                  <td>{{ x.category}}</td>
                  <td>{{ x.startdate}}</td>
                  <td>{{ x.enddate}}</td>
               </tr>
            </table>
         </div>
      </div>
   </div>
</div>
<style>
   .ng-table-pager {
   display: none;
   }
   .design {
   display: block;
   height: 500px;
   overflow-y: scroll;
   overflow-x: scroll;
   }
   table, th  {
   border: 2px solid #d0cdcd;
   border-collapse: collapse;
   }
   table, td  {
   border: 2px solid #d0cdcd;
   border-collapse: collapse;
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
</style>