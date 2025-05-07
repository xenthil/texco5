<script type="text/javascript" src="<?php echo base_url("assets/js/app/exportinvoice.js")?>"></script>
<link rel="stylesheet" type="text/css" href="<?php echo base_url("assets/css/ng-table.min.css")?>" />
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ng-table.min.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ui-bootstrap-tpls-0.11.0.js")?>"></script>
<script src="
   <?php echo base_url("assets/js/lib/angular-bootstrap-datepicker.js")?>" charset="utf-8"></script>
<link href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery-ui.css" rel="Stylesheet" type="text/css" />
<link href="
   <?php echo base_url("assets/css/datepicker.css")?>" rel="Stylesheet" type="text/css" />
<div class="parallax-container" style="background-color: rgba(0, 12, 78, 0.9)">
   <div class="row">
      <div class="container">
         <div class="col s12 m6 l6">
            <div class="pagebannertext white-text" >Export Invoice</div>
         </div>
         <div class="col s12 m6 l6 right-align">
            <div class="dumheight hide-on-small-only"> </div>
            <div class=""> <a href="<?php echo base_url('admin/dashboard')?>" class="breadcrumb">Home</a> 
            
            <span class="breadcrumb">Finance</span> <span class="breadcrumb">Export Invoice</span> </div>
         </div>
      </div>
   </div>
   <div class="parallax"><img src="<?php echo base_url("assets/images/breadcrumbbanner.jpg")?>"></div>
</div> 
<div  class="row" ng-app="appExportInvoice" style="padding-top:30px;">
    <div  class="container" ng-controller="ctrlExportInvoice">
        <div class ="col s12 m12 l12" style="margin-bottom: 25px;">
            <div class="input-field col s3">
                <input name="month_year" id="month_year" class="month_year" type="text" ng-model="invoice.monthandyear" ng-change="ViewInvoices(invoice.monthandyear)"/>
                <label for="startdate">Select Month </label>
            </div>
            <div class="input-field col s6 center">
                <!-- <h5>Export Invoice</h5> -->
            </div>
            <div class="input-field col s3" style="padding-left: 10%;" ng-show="invoicecount > 1">
                <a ng-click="ExportAllInvoiceXMLFormat(invoice.monthandyear,baseurl)" class="btn cyan waves-effect waves-light" type="submit">Export All </a>
            </div>
        </div> 
        <div style="margin-bottom: 25px;" ng-show="invoicecount">
            <table ng-table="tableParams" class="responsive-table highlight" fixed-table-headers="scrollable-area" show-filter="true" class="bordered">
                <tr ng-repeat="invoice in $data">
                    <td width="5%" data-title="'S.No'" sortable="'invoiceno'">{{$index + 1}}</td>
                    <td width="10%" data-title="'Invoice No'" filter="{invoiceno: 'number'}" sortable="'invoiceno'"> {{invoice.invoiceno}}</td>
                    <td width="25%" data-title="'Project No/Name'" filter="{projectno: 'number'}" sortable="'projectno'">{{invoice.projectno}} - {{invoice.name}}</td>
                    <td width="10%" data-title="'Invoice Date'">{{invoice.createdate}}</td>
                    <td width="15%" data-title="'Export'" style="border-right:10px;">
                        &nbsp; &nbsp;&nbsp; &nbsp;
                        <a class="btn cyan waves-effect waves-light green" ng-show="invoice.active==1" title="Export Invoice" ng-click="ExportInvoiceXMLFormat(invoice.invoiceid,invoice.invoiceno,invoice.monthandyear,invoice.clientid,invoice.projectid,baseurl)">Export XML</a>
                    </td>
                </tr>
            </table>
        </div>
        <div style="margin-bottom: 25px;" ng-show="invoicecount == 0">
            <table ng-table="tableParams" class="responsive-table highlight" fixed-table-headers="scrollable-area" show-filter="true" class="bordered">
                <thead>
                    <tr width="5%" data-title="'S.No'" sortable="'invoiceno'">
                        <th>Invoice No</td>
                        <th>Project No/Name</td>
                        <th>Invoice Date</td>
                        <th>Export</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="ishold"><td colspan="4">No data found. Select month to view invoice</td></tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
<style type="text/css">
   .ng-table-pager {
   display: none;
   }
   .datepicker-dropdown {
   top: 0;
   left: 0;
   position: absolute;
   background-color: #fff;
   width: 20%;
   }
   td {
   text-align: center;
   }
   .striped {
   display: block;
   height: 600px;
   overflow-y: scroll;
   overflow-x: scroll;
   }
</style>
<script>
   $( document ).ready(function() { 
        $('.month_year').datepicker({
            format: 'MM yyyy',
            viewMode: "months", 
            minViewMode: "months",
            autoClose:true,
        });
        $(".month_year").datepicker().on("changeDate", function(e) {
            $('.datepicker-dropdown').hide();
        });
   });   
</script>

