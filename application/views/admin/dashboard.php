<script type="text/javascript" src="<?php echo base_url("assets/js/lib/highcharts.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/exporting.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/app/dashboard.js")?>"></script>
<link rel="stylesheet" type="text/css" href="<?php echo base_url("assets/css/ng-table.min.css")?>" />
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ng-table.min.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ui-bootstrap-tpls-0.11.0.js")?>"></script>
<link rel="stylesheet" type="text/css" href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.min.css">
<script src="//d3js.org/d3.v3.min.js"></script>
<script type="text/javascript">
   var regionid = <?php echo $_SESSION['regionid']; ?>;;
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
            <div class=""> <a href="<?php echo base_url('admin/dashboard')?>" class="breadcrumb">Home</a> <span class="breadcrumb">Dashboard</span> </div>
         </div>
      </div>
   </div>
   <div class="parallax"><img src="<?php echo base_url("assets/images/breadcrumbbanner.jpg")?>">
   </div>
</div>
<div class="row" ng-app="appDashboard" ng-controller="ctrlDashboard" ng-cloak>
   <div class="row" style="padding-top: 10px;padding-bottom: 20px">
      <div class="col s12 m3 l3 clientes">
         <div class="clientes-content">
            <div class="content-title">
               <i class="mdi mdi-account-check"></i> 
               <span>Number of Clients</span>
            </div>
            <div class="number"><span style="font-family:arial;">{{totalclients}}</span></div>
         </div>
      </div>
      <div class="col s12 m3 l3 clientes">
         <div class="clientes-content">
            <div class="content-title">
               <i class="mdi mdi-tag"></i> 
               <span href="#" ng-show="totalproject">Number Of Projects</span>
               <span href="#" ng-show="currentproject">Number Of Active Projects</span>
            </div>
            <div class="number" ng-show="totalproject"><span style="font-family:arial;">{{totalprojects}}</span>
               <a class="btn-floating btn-small green" ng-click="ListCurrentProjects()"  title="Live Projects Count" style="float:right"><i class="material-icons">sync_problem</i></a>
            </div>
            <div class="number" ng-show="currentproject"><span style="font-family:arial;">{{totalactiveprojects}}</span>
               <a class="btn-floating btn-small green" ng-click="ListTotalProjects()" title="Total Projects Count" style="float:right"><i class="material-icons">sync_problem</i></a>
            </div>
         </div>
      </div>
      <div class="col s12 m3 l3  clientes">
         <div class="clientes-content">
            <div class="content-title">
               <i class="mdi mdi-comment-account"></i>
               <span href="#" ng-show="totalinvoiceamounts">Total Invoice Amounts</span>
               <span href="#" ng-show="pendingamounts" class="">Pending Amounts</span>
            </div>
            <div class="number" ng-show="totalinvoiceamounts">
            <a class="btn-floating btn-small green" ng-click="ListPendingAmount()"  title="Pending Amounts" style="float:right"><i class="material-icons">sync_problem</i></a>
            <span style="font-size:36px;font-family:arial;">{{totalinvoiceamount | number:2}}</span><br>
            </div>
            <div class="number" ng-show="pendingamounts">
            <a class="btn-floating btn-small green" ng-click="ListTotalAmount()"  title="Total Invoice Amounts" style="float:right"><i class="material-icons">sync_problem</i></a>
            <span style="font-size:36px;font-family:arial;" class="blink_me_text">{{pendinginvoiceamount | number:2}}</span><br><br>
            </div>
         </div>
      </div>
      <div class="col s12 m3 l3 clientes">
         <div class="clientes-content">
            <div class="content-title">
               <i class="mdi mdi-comment-account"></i>
               <span href="#" ng-show="pendinginvoice">Pending Invoices
                     <a href="<?php echo base_url('admin/invoicelist?type=2')?>" class="btn waves-effect waves-light btn-small" style="height: 32px;margin-top: -6px;">View</a>
               </span>
               <span href="#" ng-show="totalinvoice">Total Invoices
                     <a href="<?php echo base_url('admin/invoicelist?type=1')?>" class="btn waves-effect waves-light btn-small" style="height: 32px;margin-top: -6px;">View</a>
               </span>
            </div>
            <a href="<?php echo base_url('admin/invoicelist?type=2')?>">
               <div class="number" ng-show="pendinginvoice"  ><span class="blink_me_text" style="font-family:arial;">{{pendinginvoices}}</span>
                  <a class="btn-floating btn-small green" ng-click="ListTotalInvoices()"  title="Current Invoice" style="float:right;margin-right: 10px;"><i class="material-icons">sync_problem</i></a>
               </div>
            </a>
            <a href="<?php echo base_url('admin/invoicelist?type=1')?>">
               <div class="number" ng-show="totalinvoice"><span style="font-family:arial;">{{totalinvoices}}</span>
                  <a class="btn-floating btn-small green" ng-click="ListPendingInvoices()" title="Pending Invoice " style="float:right;margin-right: 10px;"><i class="material-icons">sync_problem</i></a>
               </div>
            </a>
         </div>
      </div>
   </div>
   <div class="row">
      <div class="col s12 m6 l6">
         <div class="card blue-grey lighten-1">
            <div class="card-action" style="text-align:center;">
               <a href="<?php echo base_url('admin/attendancereview')?>" class="btn cyan waves-effect waves-light" type="submit">
               Attendance Review
               <i class="mdi-content-send right"></i>
               </a>
            </div>
         </div>
      </div>
      <?php if($roledata['permissions']['EAGREPORT']==1) {?>
      <div class="col s12 m6 l6">
         <div class="card blue-grey lighten-1">
            <div class="card-action" style="text-align:center;">
               <a  href="<?php echo base_url('admin/invoice')?>" class="btn cyan waves-effect waves-light" type="submit">Invoice Authorize
               <i class="mdi-content-send right"></i>
               </a>
            </div>
         </div>
      </div>
      <?php } ?>
   </div>
   <!-- <div class="col s12 m12 l6">
      <div><span style="float:left;margin-left: 15%;">Total Clients</span><span style="text-align:center;margin-left: 20%;">Total Projects</span><span style="float:right;margin-right: 3%;">Total Active Projects</span></div>
      <div id="chart">
      </div>
   </div> 
   <div class="col s12 m12 l6">
      <div id="container1" style="min-width: 310px; height: 400px; margin: 0 auto"></div>
   </div>  -->
   <div class="col s12 m12 l5">
      <div class="col s12 m12 l12">
         <h5 class="blue-text" style="text-align:center;"> Client & Project Details</h5>
      </div>
      <br>
      <div><span style="float:left;margin-left: 20%;">Total Clients</span><span style="text-align:center;margin-left: 23%;">Total Projects</span><span style="float:right;margin-right: -18%;">Total Active Projects</span></div>
      <div id="chart"></div>
   </div> 
   <div class="col s12 m1 l1">&nbsp;</div>
   <div class="col s12 m12 l5">
      <div class="col s12 m12 l12">
         <h5 class="blue-text" style="text-align:center;"> Invoice Payment Details<br></h5>
      </div>
      <!-- <div id="container1" style="min-width: 310px; height: 400px; margin: 0 auto"></div> -->
      <div><span style="float:left;margin-left: 24%;">Total Invoice Amount</span>
      <span style="float:right;">Pending Amounts</span></div>
      <div id="chart1"></div>
   </div> 

   <!-- <div class="col s12 m12 l6" style="width: 100%;">
      <div class="col s12">
         <h5 class="blue-text blink_me_text">Agreement Expire In 30 Days</h5>
      </div>
      <div class="row" style="padding-left: 25px;padding-right: 10px;max-height:65%;overflow:auto;">    
         <table>
            <tr>
               <th>S.No</th>
               <th>Employer</th>
               <th>Project No</th>
               <th>Project Name</th>
               <th>Region</th>
               <th>From Date</th>
               <th>To Date</th>
               <th>Agreement Type</th>
               <th>Status</th>
            </tr>
            <tr ng-repeat="x in expirylistfuturethirtydays" ng-show="expirylistfuturethirtydays.length > 0">
               <td>{{$index + 1}}</td>
               <td>{{ x.client}}</td>
               <td>{{ x.projectno}}</td>
               <td>{{ x.projectname}}</td>
               <td>{{ x.region}}</td>
               <td>{{ x.fromdate}}</td>
               <td>{{ x.todate}}</td>
               <td>{{ x.agreementtype}}</td>
               <td>{{ x.agreementstatus}}</td>
            </tr>
            <tr ng-repeat="x in expirylistfuturethirtydays" ng-show="expirylistfuturethirtydays.length == 0">
               <td colspan="9" class="ishold" style="text-align:center;">No Data Found</td>
            </tr>
         </table>
      </div>
   </div> -->
   <div class="col s12 m12 l6" style="width: 100%;">
      <br>
      <div class="col s12">
         <h5 class="blue-text blink_me_text">AGREEMENT EXPIRE IN 90 DAYS</h5>
      </div>
      <div class="row" style="padding-left: 25px;padding-right: 10px;max-height:65%;overflow:auto;">    
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
               <th>RENEWAL</th>
            </tr>
            <tr ng-repeat="x in expirylistfuture">
               <td ng-class="{'redcolor' : x.diffdays > '0' && x.diffdays < '31','orangecolor':x.diffdays > '31' && x.diffdays < '61','greencolor':x.diffdays > '61' && x.diffdays < '91'}">{{$index + 1}}</td>
               <td  ng-class="{'redcolor' : x.diffdays > '0' && x.diffdays < '31','orangecolor':x.diffdays > '31' && x.diffdays < '61','greencolor':x.diffdays > '61' && x.diffdays < '91'}">{{ x.client}}</td>
               <td  ng-class="{'redcolor' : x.diffdays > '0' && x.diffdays < '31','orangecolor':x.diffdays > '31' && x.diffdays < '61','greencolor':x.diffdays > '61' && x.diffdays < '91'}">{{ x.projectno}}</td>
               <td  ng-class="{'redcolor' : x.diffdays > '0' && x.diffdays < '31','orangecolor':x.diffdays > '31' && x.diffdays < '61','greencolor':x.diffdays > '61' && x.diffdays < '91'}">{{ x.projectname}}</td>
               <td  ng-class="{'redcolor' : x.diffdays > '0' && x.diffdays < '31','orangecolor':x.diffdays > '31' && x.diffdays < '61','greencolor':x.diffdays > '61' && x.diffdays < '91'}">{{ x.region}}</td>
               <td  ng-class="{'redcolor' : x.diffdays > '0' && x.diffdays < '31','orangecolor':x.diffdays > '31' && x.diffdays < '61','greencolor':x.diffdays > '61' && x.diffdays < '91'}">{{ x.fromdate}}</td>
               <td  ng-class="{'redcolor' : x.diffdays > '0' && x.diffdays < '31','orangecolor':x.diffdays > '31' && x.diffdays < '61','greencolor':x.diffdays > '61' && x.diffdays < '91'}">{{ x.todate}}</td>
               <td  ng-class="{'redcolor' : x.diffdays > '0' && x.diffdays < '31','orangecolor':x.diffdays > '31' && x.diffdays < '61','greencolor':x.diffdays > '61' && x.diffdays < '91'}">{{ x.agreementtype}}</td>
               <td  ng-class="{'redcolor' : x.diffdays > '0' && x.diffdays < '31','orangecolor':x.diffdays > '31' && x.diffdays < '61','greencolor':x.diffdays > '61' && x.diffdays < '91'}">{{ x.agreementstatus}}</td>
               <td  ng-class="{'redcolor' : x.diffdays > '0' && x.diffdays < '31','orangecolor':x.diffdays > '31' && x.diffdays < '61','greencolor':x.diffdays > '61' && x.diffdays < '91'}">
                  <a target="blank"  ng-click="agreementrenew(x)" tooltip="Renew" class="btn-floating waves-effect waves-light red">
                  <i class="material-icons">swap_horiz</i>
                  </a>
               </td>
            </tr>
         </table>
      </div>
   </div>
   <div class="col s12 m12 l6" style="width: 100%;">
      <div class="col s12">
         <br>
         <h5 class="blue-text">Attendance Upload Pending</h5>
      </div>
      <div class="row" style="padding-left: 25px;padding-right: 10px;max-height:65%;overflow:auto;"> 
         <table>
            <tr>
               <th>S.No</th>
               <th>Client Name</th>
               <th>Project Name</th>
               <th>Project Name</th>
               <th>Contact Name</th>
               <th>Email</th>
            </tr>
            <tr ng-repeat="x in attendancelist" ng-show="attendancelist.length > 0">
               <td>{{$index + 1}}</td>
               <td>{{ x.organization}}</td>
               <td>{{ x.projectno}}</td>
               <td>{{x.name}}</td>
               <td>{{ x.contactname}}</td>
               <td>{{ x.email}}</td>
            </tr>
            <tr ng-repeat="x in attendancelist" ng-show="attendancelist.length == 0">
               <td colspan="5" class="ishold" style="text-align:center;">No Data Found</td>
            </tr>
         </table>
      </div>  
   </div>
   <div class="col s12 m12 l6" style="width: 100%;">
      <br> <br>
      <div class="col s12">
         <h5 class="blue-text blink_me_text">Agreement Already Expired</h5>
      </div>
      <div class="row" style="padding-left: 25px;
         padding-right: 10px;">
         <table ng-table="tableParams" class="responsive-table highlight striped" show-filter="true" class="bordered">
            <tr ng-repeat="agreement in $data">
               <td width="4%" data-title="'S.No'" class="redcolor">{{$index + 1}}</td>
               <td width="12%" data-title="'Employer'" filter="{client: 'text'}" sortable="'client'" class="redcolor">{{agreement.client}}</td>
               <td width="5%" data-title="'Project No'" filter="{projectno: 'text'}" sortable="'projectno'" class="redcolor">{{agreement.projectno}}</td>
               <td width="12%" data-title="'Project Name'" filter="{projectname: 'text'}" sortable="'projectname'" class="redcolor">{{agreement.projectname}}</td>
               <td width="5%" data-title="'Region'" filter="{region: 'text'}" sortable="'todate'" class="redcolor">{{agreement.region}}</td>
               <td width="5%" data-title="'From Date'" filter="{fromdate: 'text'}" sortable="'fromdate'" class="redcolor">{{agreement.fromdate}}</td>
               <td width="5%" data-title="'To Date'" filter="{todate: 'text'}" sortable="'todate'" class="redcolor">{{agreement.todate}}</td>
               <td width="7%" data-title="'Agreement Type'" filter="{agreementtype: 'text'}" sortable="'agreementtype'" class="redcolor">{{agreement.agreementtype}}</td>
               <td width="5%" data-title="'Status'" filter="{agreementtype: 'text'}" sortable="'agreementtype'" class="redcolor"><!-- {{agreement.agreementstatus}} --> EXPIRED </td>
               <td width="5%" data-title="'Renewal'" class="redcolor">
                  <a target="blank" ng-click="agreementrenewal(agreement)" class="btn-floating waves-effect waves-light red">
                  <i class="material-icons">swap_horiz</i>
                  </a>
               </td>
            </tr>
         </table>
      </div>
   </div>
   <div id="modal3" class="modal modal-fixed-footer" style="max-height:90%;height: 40% !important;width: 40% !important;">
      <div class="modal-content">
        <nav class="blue" style="position: fixed;margin-top: 0px; z-index:999">
          <div class="left col s1 m1 l1">
            <div class="white-text"><a href=""><i class="modal-action modal-close mdi white-text mdi-arrow-left"></i></a> </div>
          </div>
          <div class="col s11 m11 l11">
            <div class="li white-text" id="mcaption">Renewal Agreement</div>
          </div>
        </nav>
        <div class="row" style="padding: 40px;">
            <form ng-submit="agreementform.$valid && updateAgreement(agreementjobposting)" id="agreementform" name="agreementform" novalidate>
            <div class="row">
               <div class="input-field col s6">
                  <select id="" name="agreementvalue" class="validate"  ng-model="agreementjobposting.agreementvalue" style="margin-top: 50px !important;" ng-required="true">
                     <option value="90">3 Months (90 Days)</option>
                     <option value="180">6 Months (180 Days)</option>
                     <option value="365">1 Year</option>
                     <option value="1095">3 Years</option>
                  </select>
                  <label for="agreementvalue" style="margin-top: 45px !important;;font-size: 14px !important;">Select Renewal</label>
               </div>
            </div>
        </div>
      </div>
      <div class="modal-footer">
        <div id="failure" class="red-text waves-effect waves-green"></div>
        <button class="waves-effect waves-green btn-flat" type="submit" ng-click="submitted=true;">
          Save
        </button>
        <a href="" class="modal-action modal-close waves-effect btn-flat ">Cancel</a>
      </div>
      </form>
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
   font-size: 36px;
   }
   .striped {
   display: block;
   height: 600px;
   overflow-y: scroll;
   overflow-x: scroll;
   }
   .number {
      height:18%;
   }
</style>