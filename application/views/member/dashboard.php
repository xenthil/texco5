<script type="text/javascript" src="<?php echo base_url("assets/js/app/newvacancymember.js") ?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ng-file-upload.min.js") ?>"></script>

<link rel="stylesheet" type="text/css" href="<?php echo base_url("assets/css/ng-table.min.css") ?>" />
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ng-table.min.js") ?>"></script>
<!-- <script type="text/javascript" src="<?php echo base_url("assets/js/lib/ng-pattern-restrict.js") ?>"></script> -->
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ui-bootstrap-tpls-0.11.0.js") ?>"></script>
<script type="text/javascript">
    var memberid = <?php echo $memberid ?>;
    vacancypage = 1;
</script>
<style>
    /*[type=text] {
   font-size: x-large!important; 
   }
   [type=email] {
   font-size: x-large!important; 
   }*/
    input {
        width: 100%;
        /* text-transform: uppercase; */
    }

    input {
        color: black !important;
        /* font-size: large !important;  */
    }
</style>
<div class="parallax-container" style="background-color: rgba(0, 12, 78, 0.9)">
    <div class="row">
        <div class="container">
            <div class="col s12 m6 l6">
                <div class="pagebannertext white-text">Dashboard</div>
            </div>
            <div class="col s12 m6 l6 right-align">
                <div class="dumheight hide-on-small-only"> </div>
                <div class=""> <a href="<?php echo base_url() ?>" class="breadcrumb">Home</a> <span
                        class="breadcrumb">
                        Dashboard</span> </div>


            </div>
        </div>
    </div>
    <div class="parallax"><img src="<?php echo base_url("assets/images/breadcrumbbanner.jpg") ?>">
    </div>
</div>
<div class="row" ng-app="appAdminMember">
    <div class="container" ng-controller="ctrlAdminMember" ng-cloak>
        <!-- Modal Structure -->
       
        <div id="" class="section">


          
      
          
        <div class="row">
        <table>
            
            <th>
            <p>Service Number </p>
            </th>
            <th>
            <p> Name </p>
            </th>
            <th>
              Region
            </th>
            <th>
              Current Status
            </th>
            <th>
              Uploaded Date
            </th>
          <tr ng-repeat="sen in senmem">
            <td>
              {{sen.serviceno}}
            </td>
            <td>
              {{sen.firstname}}
            </td>
            <td>
            {{sen.region}}
            </td>
            <td>
            {{sen.applicationnumber}}
            </td>
            <td>
            {{sen.uploadedtime | date:'dd-MM-yyyy HH:mm:ss'}}
            </td>
          </tr>
        </table>
         
        </div>
    </div>
</div>



<style>
  th,td{
    text-align: center;
  }
  </style>