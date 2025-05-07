<script type="text/javascript" src="<?php echo base_url("assets/js/lib/highcharts.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/exporting.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/app/amdashboard.js")?>"></script>
<link rel="stylesheet" type="text/css" href="<?php echo base_url("assets/css/ng-table.min.css")?>" />
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ng-table.min.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ui-bootstrap-tpls-0.11.0.js")?>"></script>
<link rel="stylesheet" type="text/css" href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.min.css">
<script src="//d3js.org/d3.v3.min.js"></script>
<script type="text/javascript">
   var regionid = <?php echo $_SESSION['regionid']; ?>;
</script>
<style>
   .redcolor {
      color:#ff0000 !important;
   }
   .greencolor {
      color: #29910d !important;
   }
   .orangecolor {
      color: #ff8d00 !important;
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
            <div class=""> <a href="<?php echo base_url('ams/dashboard')?>" class="breadcrumb">Home</a> <span class="breadcrumb">Dashboard</span> </div>
         </div>
      </div>
   </div>
   <div class="parallax"><img src="<?php echo base_url(" assets/images/breadcrumbbanner.jpg")?>">
   </div>
</div>

<div class="row" ng-app="appDashboard" ng-controller="ctrlDashboard">
   <div class="row">
      <br><br>
      <div class="col s12 m12 l12" style="width: 100%;">
         <div class="col s12">
            <h5 class="blue-text">Posted Members</h5>
         </div>
         <div class="row" style="padding-left: 25px;padding-right: 10px;max-height:60%;overflow:auto;">      
            <table ng-table="tableParams1" class="responsive-table highlight" show-filter="true" class="bordered" ng-show="postedmemberss.length  > 0">
               <tr ng-repeat="posted in postedmemberss"> 
                  <td width="10%" data-title="'S.No'">{{$index+1}}</td>
                  <td width="10%" data-title="'Employee Name'" filter="{projectno: 'text'}" sortable="'firstname'">{{posted.firstname}}</td>
                  <td width="10%" data-title="'Texco No'" filter="{texcono: 'text'}" sortable="'texcono'">{{posted.texcono}}</td>
                  <td width="10%" data-title="'Service No'" filter="{serviceno: 'text'}" sortable="'serviceno'">{{posted.serviceno}}</td>
                  <td width="10%" data-title="'Project No / Name'" filter="{projectno: 'text'}" sortable="'projectno'">{{posted.projectno }} / {{ posted.projectname}}</td>
                  <td width="10%" data-title="'Category'" filter="{category: 'text'}" sortable="'category'">{{posted.category}}</td>
                  <td width="10%" data-title="'Posting Order Date'" filter="{startdate: 'text'}" sortable="'startdate'">{{posted.startdate | date:"dd-MM-yyyy"}}</td>
                  <td width="10%" data-title="'Action'" filter="{district: 'text'}" sortable="'district'">
                     <a target="blank" ng-click="AcceptJobs(posted,1)" class="btn-floating waves-effect waves-light green">
                        <i class="material-icons">check_circle_outline</i>
                     </a>
                     <a target="blank" ng-click="AcceptJobs(posted,2)" class="btn-floating waves-effect waves-light red">
                        <i class="material-icons">close</i>
                     </a>
                  </td>
               </tr>
            </table>
            <table ng-table="tableParams1" class="responsive-table highlight" show-filter="true" class="bordered" ng-show="postedmemberss.length  == 0">
               <thead>
                  <tr>   
                     <th>S.No</th>
                     <th>Employee Name</th>
                     <th>Texco No</th>
                     <th>Service No</th>
                     <th>Project No / Name</th>
                     <th>Category</th>
                     <th>Posting Order Date</th> 
                  </tr>
               </thead>
               <tbody>
                  <tr>   
                     <td colspan="7" style="text-align:center;" class="ishold">No Members Found</th>
                  </tr>
               </tbody>
            </table>
         </div>
         <br><br>
      </div>
      <br><br>
      <div class="col s12 m12 l12" style="width: 100%;">
         <div class="col s12">
            <h5 class="blue-text">Approved Working Members</h5>
         </div>
         <div class="row" style="padding-left: 25px;padding-right: 10px;max-height:60%;overflow:auto;">      
            <table ng-table="tableParams1" class="responsive-table highlight" show-filter="true" class="bordered" ng-show="workingmembers.length  > 0">
               <tr ng-repeat="postedd in workingmembers"> 
                  <td width="10%" data-title="'S.No'">{{$index+1}}</td>
                  <td width="10%" data-title="'Employee Name'" filter="{firstname: 'text'}" sortable="'firstname'">{{postedd.firstname}}</td>
                  <td width="10%" data-title="'Texco No'" filter="{texcono: 'text'}" sortable="'texcono'">{{postedd.texcono}}</td>
                  <td width="10%" data-title="'Service No'" filter="{serviceno: 'text'}" sortable="'serviceno'">{{postedd.serviceno}}</td>
                  <td width="10%" data-title="'Project No / Name'" filter="{projectno: 'text'}" sortable="'projectno'">{{postedd.projectno }} / {{ postedd.projectname}}</td>
                  <td width="10%" data-title="'Category'" filter="{category: 'text'}" sortable="'category'">{{postedd.category}}</td>
                  <td width="10%" data-title="'Posting Order Date'" filter="{startdate: 'text'}" sortable="'startdate'">{{postedd.startdate | date:"dd-MM-yyyy"}}</td>
                  <td width="10%" data-title="'Last Salary Date'" filter="{enddate: 'text'}" sortable="'enddate'">{{postedd.enddate | date:"dd-MM-yyyy"}}</td>
                  <!-- <td width="10%" data-title="'Action'" filter="{district: 'text'}" sortable="'district'">
                     <a target="blank" ng-click="AcceptJobs(posted,1)" class="btn-floating waves-effect waves-light green">
                        <i class="material-icons">check_circle_outline</i>
                     </a>
                     <a target="blank" ng-click="AcceptJobs(posted,2)" class="btn-floating waves-effect waves-light red">
                        <i class="material-icons">close</i>
                     </a>
                  </td> -->
               </tr>
            </table>
            <table ng-table="tableParams1" class="responsive-table highlight" show-filter="true" class="bordered" ng-show="workingmembers.length  == 0">
               <thead>
                  <tr>   
                     <th>S.No</th>
                     <th>Employee Name</th>
                     <th>Texco No</th>
                     <th>Service No</th>
                     <th>Project No / Name</th>
                     <th>Category</th>
                     <th>Posting Order Date</th> 
                  </tr>
               </thead>
               <tbody>
                  <tr>   
                     <td colspan="7" style="text-align:center;" class="ishold">No Members Found</th>
                  </tr>
               </tbody>
            </table>
         </div>
         <br><br>
      </div>
      <br><br>
      <div class="col s12 m12 l6" style="width: 100%;">
         <div class="col s12">
            <h5 class="blue-text blink_me_text">AGREEMENT EXPIRE IN  90 DAYS LIST</h5>
         </div>
         <div class="row" style="padding-left: 25px;padding-right: 10px;">
            <table>
                  <tr>
                     <th>S.NO</th>
                     <th>EMPLOYER</th>
                     <th>PROJ NO</th>
                     <th>PROJ NAME</th>
                     <th>REGION</th>
                     <th>FROM DATE</th>
                     <th>TO DATE</th>
                     <th>AGREEMENT TYPE</th>
                     <th>STATUS</th>
                  </tr>
                  <tr ng-repeat="x in agreementexpirefuture">
                     <td ng-class="{'redcolor' : x.diffdays > '0' && x.diffdays < '31','bluecolor':x.diffdays > '31' && x.diffdays < '61','greencolor':x.diffdays > '61' && x.diffdays < '91'}">{{$index + 1}}</td>
                     <td ng-class="{'redcolor' : x.diffdays > '0' && x.diffdays < '31','bluecolor':x.diffdays > '31' && x.diffdays < '61','greencolor':x.diffdays > '61' && x.diffdays < '91'}">{{ x.client}}</td>
                     <td ng-class="{'redcolor' : x.diffdays > '0' && x.diffdays < '31','bluecolor':x.diffdays > '31' && x.diffdays < '61','greencolor':x.diffdays > '61' && x.diffdays < '91'}">{{ x.projectno}}</td>
                     <td ng-class="{'redcolor' : x.diffdays > '0' && x.diffdays < '31','bluecolor':x.diffdays > '31' && x.diffdays < '61','greencolor':x.diffdays > '61' && x.diffdays < '91'}">{{ x.projectname}}</td>
                     <td ng-class="{'redcolor' : x.diffdays > '0' && x.diffdays < '31','bluecolor':x.diffdays > '31' && x.diffdays < '61','greencolor':x.diffdays > '61' && x.diffdays < '91'}">{{ x.region}}</td>
                     <td ng-class="{'redcolor' : x.diffdays > '0' && x.diffdays < '31','bluecolor':x.diffdays > '31' && x.diffdays < '61','greencolor':x.diffdays > '61' && x.diffdays < '91'}">{{ x.fromdate}}</td>
                     <td ng-class="{'redcolor' : x.diffdays > '0' && x.diffdays < '31','bluecolor':x.diffdays > '31' && x.diffdays < '61','greencolor':x.diffdays > '61' && x.diffdays < '91'}">{{ x.todate}}</td>
                     <td ng-class="{'redcolor' : x.diffdays > '0' && x.diffdays < '31','bluecolor':x.diffdays > '31' && x.diffdays < '61','greencolor':x.diffdays > '61' && x.diffdays < '91'}">{{ x.agreementtype}}</td>
                     <td ng-class="{'redcolor' : x.diffdays > '0' && x.diffdays < '31','bluecolor':x.diffdays > '31' && x.diffdays < '61','greencolor':x.diffdays > '61' && x.diffdays < '91'}">{{ x.agreementstatus}}</td>
                  </tr>
               </table>
         </div>
      </div>
      <br><br>
      <div class="col s12 m12 l6" style="width: 100%;">
         <div class="col s12">
            <h5 class="blue-text">AGREEMENT EXPIRE LIST</h5>
         </div>
         <div class="row" style="padding-left: 25px;padding-right: 10px;">
            <table ng-table="tableParams" class="responsive-table highlight striped" show-filter="true" class="bordered">
               <tr ng-repeat="agreement in $data">
                  <td width="4%" data-title="'SNO'" class="redcolor">{{$index + 1}}</td>
                  <td width="12%" data-title="'EMPLOYER'" filter="{client: 'text'}" sortable="'client'" class="redcolor">{{agreement.client}}</td>
                  <td width="5%" data-title="'PROJECT NO'" filter="{projectno: 'text'}" sortable="'projectno'" class="redcolor">{{agreement.projectno}}</td>
                  <td width="12%" data-title="'PROJ NAME'" filter="{projectname: 'text'}" sortable="'projectname'" class="redcolor">{{agreement.projectname}}</td>
                  <td width="5%" data-title="'REGION'" filter="{region: 'text'}" sortable="'todate'" class="redcolor">{{agreement.region}}</td>
                  <td width="5%" data-title="'FROM DATE'" filter="{fromdate: 'text'}" sortable="'fromdate'" class="redcolor">{{agreement.fromdate}}</td>
                  <td width="5%" data-title="'TO DATE'" filter="{todate: 'text'}" sortable="'todate'" class="redcolor">{{agreement.todate}}</td>
                  <td width="7%" data-title="'AGREEMENT TYPE'" filter="{agreementtype: 'text'}" sortable="'agreementtype'" class="redcolor">{{agreement.agreementtype}}</td>
                  <td width="5%" data-title="'STATUS'" filter="{agreementtype: 'text'}" sortable="'agreementtype'" class="redcolor">{{agreement.agreementstatus}}</td>
               </tr>
            </table>
         </div>
      </div>

      <div id="modalconfirm" class="modal modal-fixed-footer" aria-hidden="true">
         <div class="modal-content" style="overflow-y: hidden;">
            <nav class="blue" style="position: fixed;margin-top: 0px; z-index:999">
               <div class="left col s1 m1 l1">
                     <div class="white-text"><a href=""><i class="modal-action modal-close mdi white-text mdi-arrow-left"></i></a> </div>
               </div>
               <div class="col s11 m11 l11">
                  <div class="li white-text" id="mcaption">Posting Order Confirmation</div>
               </div>
            </nav>
            <div class="row" style="padding: 60px;">
               <h5 id="mcaption1">Do you want to confirm this posting order ?</h5>
            </div>
         </div>
         <div class="modal-footer">
            <div class="col s12 m12 l12">
               <button id="apply" ng-disabled="isDisabled" class="waves-effect waves-light btn" type="submit" ng-click='jobconfirmPopup(clientid,memberhistoryid,memberid,status)' style="margin-left: 10px;">Yes</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
               <button class="waves-effect btn red" type="button" ng-click='jobcancelclose()' ng-disabled="isDisabled">No
               </button>&nbsp;&nbsp;&nbsp;
            </div>
         </div>
      </div>

   </div>
</div>

<style type="text/css">
   .ng-table-pager {
   display: none;
   }

.clientes .content-title {
    background:#5f6163;
}
.clientes .content-title i {
    display: inline-block;
    padding: 0px 10px 1px 14px;
    color: #fff;
    font-size: 26px;
}
.clientes .content-title span {
    color: #fff;
    padding: 10px 0px;
    font-size: 18px;
    font-weight: 100;
    display: inline-block;
    font-family: 'Arial', sans-serif;
    letter-spacing: 0.5px;
}
.clientes {
    box-shadow: 5px 5px 5px rgba(0,0,0,0.3);
}
.clientes .clientes-content .number {
    color: #6d767b;
    font-family: 'Georgia', sans-serif;
    font-size: 18px;
    text-align: center;
    padding: 5px 0px;
}
.clientes .clientes-content .number span {
    color: #5f6163;
    font-size: 72px;
}
.striped {
   display: block;
   height: 600px;
   overflow-y: scroll;
   overflow-x: scroll;
   }
div#modalconfirm {
      height: 200px;
   }
</style>