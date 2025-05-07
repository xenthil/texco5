<script type="text/javascript" src="<?php echo base_url("assets/js/app/admininvoicelist.js")?>"></script>
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
<div  class="row" ng-app="appInvoiceList" style="padding-top:30px;">
   <div  class="container" ng-controller="ctrlInvoiceList">
      <div>
      <table ng-table="tableParams" class="responsive-table highlight striped" fixed-table-headers="scrollable-area" show-filter="true" class="bordered">
            <tr ng-repeat="invoice in $data">
               <td width="5%" data-title="'S.No'" sortable="'invoiceno'">{{$index + 1}}</td>
               <td width="10%" data-title="'Invoice No'" filter="{invoiceno: 'number'}" sortable="'invoiceno'"><a href="http://192.168.1.29/texco/admin/printinvoice?invoiceno={{invoice.invoiceno}}" target="_blank">{{invoice.invoiceno}}</a></td>
               <td width="25%" data-title="'Project No/Name'" filter="{projectno: 'number'}" sortable="'projectno'">{{invoice.projectno}} - {{invoice.name}}</td>
               <td width="10%" data-title="'Invoice Date'">{{invoice.createdate}}</td>
               <td width="10%" data-title="'Total Amount'">{{invoice.totalamount | number:2}}</td>
               <td width="10%" data-title="'Amount Received'">{{invoice.paidamount | number:2}}</td>
               <td width="10%" data-title="'Payment UTR No'"> 
                  <span ng-show="invoice.paymentutrno !=''  && invoice.invoicestatus == 2">{{invoice.paymentutrno}} (Not verified)</span>
                  <span ng-show="invoice.paymentutrno !=''  && invoice.invoicestatus == 4">{{invoice.paymentutrno}}</span>
                  <span ng-show="invoice.paymentutrno =='' && invoice.invoicestatus !=3 "  class="label label-warning">Amount Pending</span>
               </td>
               <td width="15%" data-title="'Status'" style="border-right:10px;">
                     &nbsp; &nbsp;&nbsp; &nbsp; 
                     <a class="btn-floating btn-small blue" ng-show="invoice.invoicestatus==1" title="Yet To Approve"><i class="material-icons">sync_problem</i></a>
                     <a class="btn-floating btn-small teal accent-4" ng-show="invoice.invoicestatus==2" title="Approved By Client"><i class="material-icons">done</i></a>
                     <a class="btn-floating btn-small green" ng-show="invoice.invoicestatus==4" title="Approved & Payment Verified"><i class="material-icons">verified_user</i></a>
                     <a class="btn-floating btn-small red" ng-show="invoice.invoicestatus==3" title="Rejected By Client"><i class="material-icons">highlight_off</i></a>

                     <a class="btn-floating btn-small blue" ng-click="ApprovePayment(4,invoice.invoiceid)" ng-show="((invoice.invoicestatus==2 && invoice.paymentutrno !='') && (invoice.totalamount == invoice.paidamount))" title="Payment Received - Verify"><i class="material-icons">call_received</i></a>

                     <a class="btn-floating btn-small red" ng-show="((invoice.invoicestatus == 2) && (invoice.paymentutrno =='' || invoice.paymentutrno !='')&& (invoice.totalamount != invoice.paidamount))" title="Amount Pending"><i class="material-icons">money_off</i></a>
                    
               </td>
            </tr>
         </table>
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
