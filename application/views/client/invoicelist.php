<script type="text/javascript" src="<?php echo base_url("assets/js/app/invoicelist.js")?>"></script>
<link rel="stylesheet" type="text/css" href="<?php echo base_url("assets/css/ng-table.min.css")?>" />
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ng-table.min.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ui-bootstrap-tpls-0.11.0.js")?>"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.8.1/xlsx.full.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/2.6.0/jszip.min.js"></script>
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.12/css/dataTables.bootstrap.min.css"/>
<script src="https://cdnjs.cloudflare.com/ajax/libs/datatables/1.10.12/js/jquery.dataTables.min.js"></script>
<script src="https://cdn.datatables.net/1.10.12/js/dataTables.bootstrap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/angular-ui-utils/0.1.1/angular-ui-utils.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/2.0.0/ui-bootstrap-tpls.min.js"></script>
<script type="text/javascript">
   var clientid = <?php echo $clientid;?>;
   var types = "<?php echo $_GET['type']; ?>" 
</script>
<div class="parallax-container" style="background-color: rgba(0, 12, 78, 0.9)">
   <div class="row">
      <div class="container">
         <div class="col s12 m6 l6">
            <div class="pagebannertext white-text" >Invoice List</div>
         </div>
         <div class="col s12 m6 l6 right-align">
            <div class="dumheight hide-on-small-only"> </div>
            <div class=""> <a href="<?php echo base_url('admin/dashboard')?>" class="breadcrumb">Home</a> <span class="breadcrumb">Invoice List</span> </div>
         </div>
      </div>
   </div>
   <div class="parallax"><img src="<?php echo base_url("assets/images/breadcrumbbanner.jpg")?>"></div>
</div> 
<div  class="row" ng-app="appInvoiceList" style="padding-top:30px;max-height:60%;overflow:auto;">
   <br>
   <div  class="container" data-ng-controller="ctrlInvoiceList">
      <div>
      <table ng-table="tableParams" class="responsive-table highlight" fixed-table-headers="scrollable-area" show-filter="true" class="bordered" ng-show="totalItems == 0">
         <thead>
            <tr>
               <th>S.No</th>
               <th>Invoice No</th>
               <th>Project No/Name</th>
               <th>Invoice Date</th>
               <th>Total Amount</th>
               <th>Paid Amount</th>
               <th>Payment UTR No</th>
            </tr>
         </thead>
         <tbody>
            <tr>
               <td colspan="7" style="text-align:center" class="ishold">No Invoice Found</td>
            </tr>
         </tbody>
      </table>
      <table ng-table="tableParams" class="responsive-table highlight" fixed-table-headers="scrollable-area" show-filter="true" class="bordered" ng-show="totalItems">
            <tr ng-repeat="invoice in $data">
               <td width="5%" data-title="'S.No'" sortable="'invoiceno'">{{$index + 1}}</td>
               <td width="10%" data-title="'Invoice No'" filter="{invoiceno: 'number'}" sortable="'invoiceno'" style="text-align:center"><a href="http://192.168.1.29/texco/client/printinvoice?invoiceno={{invoice.invoiceno}}" target="_blank">{{invoice.invoiceno}}</a></td>
               <td width="25%" data-title="'Project No/Name'" filter="{projectno: 'number'}" sortable="'projectno'">{{invoice.projectno}} - {{invoice.name}}</td>
               <td width="10%" data-title="'Invoice Date'"style="text-align:center">{{invoice.createdate}}</td>
               <td width="10%" data-title="'Total Amount'"style="text-align:right">{{invoice.totalamount | number:2}}</td>
               <td width="10%" data-title="'Payment UTR No'"style="text-align:center">
                  <span ng-show="invoice.paymentutrno !=''">{{invoice.paymentutrno}}</span>
                  <span ng-show="invoice.paymentutrno =='' && invoice.invoicestatus !=3 "  class="label label-warning">Amount Pending</span>
               </td>
               <td width="10%" data-title="'Paid Amount'"style="text-align:right">{{invoice.paidamount | number:2}}</td>
               <td width="15%" data-title="'Status'">
                  &nbsp; &nbsp;&nbsp; &nbsp; 
                  <a class="btn-floating btn-small blue" ng-click="ApproveInvoice(2,invoice.invoiceid)" ng-show="invoice.invoicestatus==1" title="Approve Invoice"><i class="material-icons">swap_horizontal_circle</i></a>
                  <a class="btn-floating btn-small red" ng-click="ApproveInvoice(3,invoice.invoiceid)" ng-show="invoice.invoicestatus==1" title="Reject Invoice"><i class="material-icons">sync_problem</i></a>
                  <a class="btn-floating btn-small green" ng-show="invoice.invoicestatus==2" title="Approved"><i class="material-icons">done</i></a>
                  <a class="btn-floating btn-small green" ng-show="invoice.invoicestatus==4 && invoice.paymentutrno !=''" title="Amount Received & Closed"><i class="material-icons">verified_user</i></a>
                  <a class="btn-floating btn-small pink accent-2" ng-show="((invoice.invoicestatus==2 && invoice.paymentutrno !='') && (invoice.totalamount == invoice.paidamount))" title="Edit UTR No" ng-click="addUTRNo(invoice)"><i class="material-icons">border_color</i></a>
                  <a class="btn-floating btn-small blue" ng-show="((invoice.invoicestatus==2) && (invoice.paymentutrno =='' || invoice.paymentutrno !='') && (invoice.totalamount > invoice.paidamount))" title="Add UTR No" ng-click="addUTRNo(invoice)"><i class="material-icons">open_in_new</i></a>
                  <a class="btn-floating btn-small red" ng-show="invoice.invoicestatus==3" title="Cancelled"><i class="material-icons">highlight_off</i></a>

               </td>
            </tr>
         </table>
         <br> <br> 
      </div>
     
<div id="modal3" class="modal" style="max-height:90%;overflow: hidden;">
      <div class="modal-content">
         <nav class="blue" style="position: fixed;margin-top: 0px; z-index:999">
            <div class="left col s2 m2 l2">
               <div class="white-text"><a href=""><i class="modal-action modal-close mdi white-text mdi-arrow-left"></i></a> </div>
            </div>
            <div class="col s10 m10 l10">
               <div class="li white-text" id="mcaption">Invoice UTR Details</div>
            </div>
         </nav>
         <div class="row" style="padding: 40px;">
            <form ng-submit="invoicedetails.$valid && saveUTRDetails(saveinvoice)" id="invoicedetails" name="invoicedetails" novalidate>
               <div class="row">
                  <div class="col s12">
                     <div class="row">
                        <div class="input-field col s3">
                           <label>Invoice No :</label>
                        </div>
                        <div class="input-field col s3">
                           <p><span class="strong" id="invoiceno">{{ saveinvoice.invoiceno }}</span></p>
                        </div>
                        <div class="input-field col s3">
                           <label>Invoice Date :</label>
                        </div>
                        <div class="input-field col s3">
                           <p><span class="strong" id="createdate">{{ saveinvoice.createdate }}</span></p>
                        </div>
                        <div class="input-field col s3">
                           <label>Invoice Amount :</label>
                        </div>
                        <div class="input-field col s9">
                           <p><span class="strong" id="totalamount">{{ saveinvoice.totalamount | number:2}}</span></p>
                        </div>
                        <div class="input-field col s3" ng-show="saveinvoice.paidamounts > 0">
                           <label>Paid Amount UTR No:</label>
                        </div>
                        <div class="input-field col s3" ng-show="saveinvoice.paidamounts > 0">
                           <p><span class="strong" id="invoiceno">{{ saveinvoice.paymentutrnos }}</span></p>
                        </div>
                        <div class="input-field col s3" ng-show="saveinvoice.paidamounts > 0">
                           <label>Already Paid Amount</label>
                        </div>
                        <div class="input-field col s3" ng-show="saveinvoice.paidamounts > 0">
                           <p><span class="strong" id="invoiceno">{{ saveinvoice.paidamounts }}</span></p>
                        </div>

                        <div class="input-field col s3">
                           <label>UTR No </label>
                        </div>
                        <div class="input-field col s3">
                           <input id="paymentutrno" type="text" class="paymentutrno" type="text" data-ng-model="saveinvoice.paymentutrno" ng-required="true" ng-class="{'submitted': submitted}"> <input id="utrid" type="hidden" class="utrid" type="text" data-ng-model="saveinvoice.invoiceid" ng-required="true">
                        </div>
                        <div class="input-field col s3">
                           <label>Paid Amount </label>
                        </div>
                        <div class="input-field col s3">
                           <input id="paidamount" type="number" class="paidamount" type="text" data-ng-model="saveinvoice.paidamount" ng-required="true"  ng-class="{'submitted': submitted}">
                        </div>
                     </div>
                  </div>
               </div>
         </div>
         <div class="modal-footer">
               <div id="failure" class="red-text waves-effect waves-green"></div>
               <button class="waves-effect waves-green btn-flat" type="submit" ng-click="submitted=true;" ng-disabled="Disablebutton">
                  Save
               </button>
               <a href="" class="modal-action modal-close waves-effect waves-green btn-flat red">Cancel</a>
         </div>
      </form>
   </div>
</div>
</div>
</div>
<script>
   // $('#invoicelist').DataTable();
</script>
<style type="text/css">
   .ng-table-pager {
   display: none;
   }
   .striped {
   display: block;
   height: 600px;
   overflow-y: scroll;
   overflow-x: scroll;
   }
   table, td  {
   border: 1px solid #d0cdcd;
   border-collapse: collapse;
   }
</style>
