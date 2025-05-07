<script type="text/javascript">
var base_url = "<?php echo base_url()?>"
</script>
<script type="text/javascript">
var api_url = "<?php echo config_item('api_url')?>"
</script>
<script type="text/javascript">
var atoken = "<?php echo $this->session->usertoken('atoken')?>"
</script>
<script type="text/javascript" src="<?php echo base_url("assets/libs/jquery/3.7.1/jquery.min.js")?>"></script>
<script src="<?php echo base_url("assets/js/lib/underscore.js")?>" charset="utf-8"></script>
<script type="text/javascript" src="<?php echo base_url("assets/libs/angular/1.8.2/angular.min.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/app/printbulkprint.js")?>"></script>
<script type="text/javascript">
var fromdate = "<?php echo $_GET['fromdate'];?>";
var todate = "<?php echo $_GET['todate'];?>";
var regionid = "<?php echo $_GET['regionid'];?>";
var type = "<?php echo $_GET['type'];?>"
</script>
<link href="<?php echo base_url("assets/css/texco.css")?>" rel="Stylesheet" type="text/css" />
<div ng-app="appBulkPrint" ng-controller="ctrlBulkPrint">
    <!-- Salary Bill Starting -->
    <div ng-if="printtype == 1">
        <style>
        @page {
            size: 15in 12in;
            margin: 27mm 16mm 27mm 16mm;
        }

        table {
            page-break-inside: auto
        }

        tr {
            page-break-inside: avoid;
            page-break-after: auto
        }

        thead {
            display: table-header-group
        }

        tfoot {
            display: table-footer-group
        }

        table {
            -fs-table-paginate: paginate;
        }

        thead.report-header {
            display: table-header-group;
        }
        </style>
       
        <div ng-repeat="invoiceprint in printdata">
     
            <table width="100%" align="center" cellpadding="0" cellspacing="0" border="1"
                style="page-break-before: always; page-break-after: always;border: 1;">
                <tbody>
                    <tr>
                        <td width="100%" align="center">
                            <table width="99%" align="center" cellpadding="0" cellspacing="0" border="0">
                                <tbody>
                                    <tr>
                                        <td width="20%" align="center">
                                            <img style="width: 20%;margin-top: 5px;"
                                                src="<?php echo base_url("assets/images/clientletter.jpg")?>">
                                        </td>
                                        <td width="100%" align="center">
                                            <b>TAMILNADU EX-SERVICEMEN’S CORPORATION LIMITED (TEXCO)</b><br>
                                            <b>(A Government of Tamil Nadu Undertaking)</b><br>
                                            <b>Major Parameswaran Memorial Building,</b><br>
                                            <b>No.2, West Mada Street, Srinagar Colony, Saidapet, Chennai-600
                                                015.</b><br>
                                            <b>Phone: 044-22352947, 22301792, 22301793, 22350900 Fax:
                                                044-22301791</b><br>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <hr />
                            <table width="99%" align="center" border="0" cellpadding="0" cellspacing="0">
                                <tbody>
                                    <tr>
                                        <div ng-init="type=1"></div>
                                        <!--<div ng-show="invoiceprint[0].ssprintcount>0"> Duplicate Copy</div>
                         <div ng-show="invoiceprint[0].ssprintcount==0">Original Copy</div>-->
                                        CONSOLIDATED PAYMENT TO TEXCO PERSONNEL IN THE PROJECT OF
                                        {{invoiceprint[0].projectname}} FOR THE PERIOD FROM <b>
                                            1/{{invoiceprint[0].startper}} to
                                            {{invoiceprint[0].maxday}}/{{invoiceprint[0].startper}} </b>
                                        <br>
                                    </tr>
                                    <br>
                                    <tr>

                                        <td align="left"><b>{{invoiceprint[0].wagetype}} {{invoiceprint[0].wageyear}}
                                            </b>
                                        </td>
                                        <td align="right" style="font-size: 13px;">
                                            <table>
                                                <tr>
                                                    <td> <b> Project Address : </b></td>
                                                    <td> <span
                                                            ng-hide="invoiceprint[0].designation == '' || invoiceprint[0].designation == null">
                                                            {{invoiceprint[0].designation}},
                                                        </span></td>
                                                </tr>
                                                <tr>
                                                    <td></td>
                                                    <td> <span
                                                            ng-hide="invoiceprint[0].addressline1 == '' || invoiceprint[0].addressline1 == null">{{invoiceprint[0].addressline1}}</span>
                                                        <span
                                                            ng-hide="invoiceprint[0].addressline2 == '' || invoiceprint[0].addressline2 == null">,
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td></td>
                                                    <td> {{invoiceprint[0].addressline2}} </span>
                                                        <span
                                                            ng-hide="invoiceprint[0].addressline3 == '' || invoiceprint[0].addressline3 == null">,
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td></td>
                                                    <td>{{invoiceprint[0].addressline3}} </span> <span
                                                            ng-hide="invoiceprint[0].pincode == '' || invoiceprint[0].pincode == null">
                                                            - {{invoiceprint[0].pincode}} </span> </td>
                                                </tr>
                                            </table>





                                            <br>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>

                                            <strong>Payslip No &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; :
                                                &nbsp;</strong>{{invoiceprint[0].payslipno}}
                                            <br>
                                            <strong>Project No &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; :
                                                &nbsp;</strong>{{invoiceprint[0].projectno}}
                                            <br>
                                            <strong>Date of Recp &nbsp; &nbsp; &nbsp;:
                                                &nbsp;</strong><?php echo  date("d-m-Y");?>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <br>
                            <table style="border-collapse: collapse;" border="1" width="99%" cellspacing="0"
                                cellpadding="0" align="center">
                                <thead style="font-size: 14px;" class="report-header">
                                    <tr height="30px">
                                        <td align="left"><strong>&nbsp;S.No</strong></td>
                                        <td align="left"><strong>&nbsp;Texco/ UAN No / Service No</strong></td>
                                        <td align="left"><strong>&nbsp;Employee's Name / &nbsp; Bank A/C No</strong>
                                        </td>
                                        <td align="left"><strong>&nbsp;Days</strong></td>
                                        <td align="left"><strong>&nbsp;Basic + <br>&nbsp;VDA</strong></td>
                                        <td align="left"><strong>&nbsp;ED Days</strong></td>
                                        <td align="left"><strong>&nbsp;ED Amt</strong></td>
                                        <td align="left"><strong>&nbsp;HRA</strong></td>
                                        <td align="left"><strong>&nbsp;Medical Allow</strong></td>
                                        <td align="left"><strong>&nbsp;Uniform Allow</strong></td>
                                        <td align="left"><strong>&nbsp;Leave Reser</strong></td>
                                        <td align="left"><strong>&nbsp;Bon/Inct</strong></td>
                                        <td align="left"><strong>&nbsp;Wash Allw</strong></td>
                                        <td align="left"><strong>&nbsp;Others</strong></td>
                                        <td align="left"><strong>&nbsp;Gross</strong></td>
                                        <td colspan=3>
                                            <table style="border-collapse: collapse;" border="1">
                                                <tr>Deductions</tr>
                                                <td width="50%" align="left"><strong>&nbsp;Epf 12 %</strong></td>
                                                <td width="30%" align="left"><strong>&nbsp;Others</strong></td>
                                                <td width="20%" align="left"><strong>&nbsp;Total Deduc</strong></td>
                                            </table>
                                        </td>
                                        <td align="left"><strong>&nbsp;Net Pay</strong></td>


                                        <!-- <td align="left" ><strong>&nbsp;Bank A/C No</strong></td> -->
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr ng-repeat="x in invoiceprint" style="font-size: 14px;">
                                        <td align="center">&nbsp;{{$index +1}}</td>
                                        <td align="center">
                                            &nbsp;{{x.texcono}}&nbsp;
                                            <hr>
                                            &nbsp; {{x.pfno}}&nbsp;
                                            <hr>
                                            &nbsp;{{x.serviceno}}&nbsp;

                                        </td>
                                        <td><span
                                                class="capitalize fname">&nbsp;{{x.firstname}}</span>&nbsp;{{x.jobcode}}<br>&nbsp;Basic
                                            = ({{x.ncbasic | number:2}})
                                            <hr>&nbsp;{{x.accountno}}
                                        </td>
                                        <td align="right">&nbsp;{{x.presentdays}}</td>
                                        <td align="right">&nbsp;{{x.basic | number:0}}</td>
                                        <td align="right">&nbsp;<span ng-show="x.jobcode!='DVR'"> {{x.eddays}}</span>
                                            <span ng-show="x.jobcode=='DVR'"> {{x.othours/8 |  number:2}}</span>
                                        </td>
                                        <td align="right">{{x.edamount | number:0}}</td>
                                        <td align="right">&nbsp;{{x.hra | number:0}}</td>
                                        <td align="right">&nbsp;{{x.ma | number:0}}</td>
                                        <td align="right">&nbsp;{{x.unifdt | number:0}} </td>
                                        <td align="right">&nbsp;{{x.leapay | number:0}} </td>
                                        <td align="right">&nbsp;{{x.bonus | number:0}}</td>
                                        <td align="right">&nbsp;{{x.washallow | number:0}}</td>
                                        <td align="right">&nbsp;{{x.other1 + x.otherallowance | number:0}} </td>
                                        <td align="right">&nbsp;{{x.gross | number:0 }} </td>
                                        <td align="right">&nbsp;{{x.epf | number:0}} </td>
                                        <td align="right">&nbsp;{{x.other2 + x.otherdeductions | number:0}} </td>
                                        <td align="right">&nbsp;{{x.epf + x.other2 + x.otherdeductions | number:0}}
                                        </td>
                                        <td align="right">&nbsp;{{x.netpay | number:0}}</td>
                                    </tr>
                                    <tr style="page-break-inside: avoid;">
                                        <td style="text-align: center;" colspan="3">Total</td>
                                        <td align="right"><b>&nbsp;{{invoiceprint[0].total[0].presentdays}}</b></td>
                                        <td align="right"><b>&nbsp;{{invoiceprint[0].total[0].basic | number:0}}</b></td>
                                        <td align="right"><b> {{invoiceprint[0].total[0].eddays}} </b></td>
                                        <td align="right"><b>&nbsp;{{invoiceprint[0].total[0].edamount | number:0}}</b></td>
                                        <td align="right"><b>&nbsp;{{invoiceprint[0].total[0].hra | number:0}}</b></td>
                                        <td align="right"><b>&nbsp;{{invoiceprint[0].total[0].ma | number:0}} </b></td>
                                        <td align="right"><b>&nbsp;{{invoiceprint[0].total[0].unifdt | number:0}} </b></td>
                                        <td align="right"><b>&nbsp;{{invoiceprint[0].total[0].leapay | number:0}}</b></td>
                                        <td align="right"><b>&nbsp;{{invoiceprint[0].total[0].bonus | number:0}}</b></td>
                                        <td align="right"><b>&nbsp;{{invoiceprint[0].total[0].washallow | number:0}}</b></td>
                                        <td align="right"><b>&nbsp;{{invoiceprint[0].total[0].other1 | number:0}}</b></td>
                                        <td align="right"><b>&nbsp;{{invoiceprint[0].total[0].totalgross | number:0 }}</b></td>
                                        <td align="right"><b>&nbsp;{{invoiceprint[0].total[0].epf | number:0}}</b></td>
                                        <td align="right"><b>&nbsp;{{invoiceprint[0].total[0].other2 | number:0}}</b></td>
                                        <td align="right"><b>&nbsp;{{invoiceprint[0].total[0].totaldeduc | number:0}}</b></td>
                                        <td align="right"><b>&nbsp;{{invoiceprint[0].total[0].netpay | number:0}}</b></td>
                                    </tr>
                                </tbody>
                            </table>
                            <br>

                            <table>
                                <tr>
                                    <td>
                                        (*) Gross = {{invoiceprint[0].total[0].totalgross | number:0}}/- Total Deductions =
                                        {{invoiceprint[0].total[0].totaldeduc | number:0}}/- Net = {{invoiceprint[0].total[0].netpay | number:0}}/-
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        (*) {{invoiceprint[0].total[0].inwords}}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        (*) Basic Pay SG - {{invoiceprint[0].sg}} HSG - {{invoiceprint[0].hsg}} ASO - {{invoiceprint[0].aso}} DVR - {{invoiceprint[0].dvr}}
                                    </td>
                                </tr>
                                <tr></tr>
                                <tr></tr>
                                <tr></tr>
                                <tr></tr>
                                <tr></tr>
                                <tr></tr>
                                <tr>

                                    <td>
                                        Certified that the :-
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        (a) Wages have been prepared strictly as per the certified attendance received
                                        from the project and not paid previously
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        (b) Bonus paid along with monhtly wages w.e.f Oct-Nov'99
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        (b) Leave Reserve Wages inclusive of National Holidays wages for revised wages
                                    </td>
                                </tr>
                            </table>
                            <br>

                            <br>
                            <br>
                            <br>
                            <table>
                                <tr>
                                    <td>
                                        Prepared by Project Clerk
                                    </td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>
                                        Verified by supervisor
                                    </td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>
                                        Approved by Accounts Officer
                                    </td>
                                </tr>
                            </table>
                            <br>
                            <span><b>*** Computer-generated document, Signature is Not required.</b></span>
                        </td>
                    </tr>
                </tbody>
            </table>
            <br><br><br>
            <table width="97%" align="center" cellpadding="0" cellspacing="0" border="1"
                style="border-collapse: collapse">
                <tbody>
                    <tr>
                        <td width="100%" align="center">
                            <!--<table width="99%" align="center" cellpadding="0" cellspacing="0" border="0">
                                <tbody>
                                    <tr>
                                        <td width="20%" align="center">
                                            <img style="height: 50%;margin-top: 5px;"
                                                src="<?php echo base_url("assets/images/clientletter.jpg")?>">
                                        </td>
                                        <td width="100%" align="center">
                                            <b>TAMILNADU EX-SERVICEMEN’S CORPORATION LIMITED (TEXCO)</b><br>
                                            <b>(A Government of Tamil Nadu Undertaking)</b><br>
                                            <b>Major Parameswaran Memorial Building,</b><br>
                                            <b>No.2, West Mada Street, Srinagar Colony, Saidapet, Chennai-600
                                                015.</b><br>
                                            <b>Phone: 044-22352947, 22301792, 22301793, 22350900 Fax:
                                                044-22301791</b><br>
                                        </td>
                                    </tr>
                                </tbody>
                            </table> 
                            <hr /> -->
                            <table width="95%" align="center" border="0" cellpadding="0" cellspacing="0">
                                <tbody>
                                    <tr>
                                        <div ng-init="type=2"></div>
                                        <div ng-show="invoiceprint[0].pfprintcount>0"> Duplicate Copy</div>
                                        <div ng-show="invoiceprint[0].pfprintcount==0">Original Copy</div> <br>
                                        RESERVE FUND STATEMENT TO TEXCO WORKERS IN THE PROJECT OF
                                        {{invoiceprint[0].projectname}} FOR THE MONTH OF
                                        {{invoiceprint[0].monthandyear}}
                                        <br>
                                    </tr>
                                    <br>
                                    <td>
                                        <strong>Project No : </strong>{{invoiceprint[0].projectno}}
                                        <br>
                                        <strong>Date of Recp : </strong><?php echo  date("d-m-Y");?>
                                    </td>
                    </tr>
                </tbody>
            </table>
            <br>
            <table style="border-collapse: collapse;" border="1" width="97%" cellspacing="0" cellpadding="0"
                align="center">
                <tbody style="font-size: 14px;">
                    <tr height="30px">
                        <td align="left"><strong>&nbsp;S.No</strong></td>
                        <td align="left"><strong>&nbsp;TEXCO/ UAN No</strong></td>
                        <!--   <td align="left" ><strong>&nbsp;UAN No</strong></td> -->
                        <td align="left"><strong>&nbsp;EMPLOYEE'S NAME</strong></td>
                        <td align="left"><strong>&nbsp;DESIGNATION</strong></td>
                        <td align="left"><strong>&nbsp;DAYS WORKED</strong></td>
                        <td align="left"><strong>&nbsp;BASIC Pay</strong></td>
                        <td align="left"><strong>&nbsp;EMPLOYER PF 12 %</strong></td>
                        <td align="left"><strong>&nbsp;EMPLOYEE PF 12 %</strong></td>
                    </tr>
                    <tr ng-repeat="x in invoiceprint" style="font-size: 14px;">
                        <td style="text-align: center;">&nbsp;{{$index +1}}</td>
                        <td align="center">
                            &nbsp;{{x.texcono}}&nbsp;
                            <hr>
                            {{x.uanno}}&nbsp;
                        </td>
                        <!--  <td>&nbsp;{{x.uanno}}</td> -->
                        <td class="capitalize">&nbsp;{{x.firstname}}</td>
                        <td style="text-align: center;">&nbsp;{{x.jobcode}}</td>
                        <td align="center">&nbsp;{{x.presentdays}}</td>
                        <td align="right">&nbsp;{{x.basic | number:2}}&nbsp;&nbsp;</td>
                        <td align="right">&nbsp;{{x.epf | number:2}} &nbsp;&nbsp;</td>
                        <td align="right">&nbsp;{{x.epf | number:2}} &nbsp;&nbsp;</td>
                    </tr>
                    <tr>
                        <td style="text-align: center;" colspan="4">Total</td>
                        <td align="center"><b>&nbsp;{{invoiceprint[0].total[0].presentdays}}&nbsp;&nbsp;</b></td>
                        <td align="right"><b>&nbsp;{{invoiceprint[0].total[0].basic | number:2}}&nbsp;&nbsp;</b></td>
                        <td align="right"><b>&nbsp;{{invoiceprint[0].total[0].epf | number:2}}&nbsp;&nbsp;</b></td>
                        <td align="right"><b>&nbsp;{{invoiceprint[0].total[0].epf | number:2}}&nbsp;&nbsp;</b></td>
                    </tr>
                </tbody>
            </table>
            <br>
            <table>
                <tr>
                    <td>
                        GRAND TOTAL : Rs. {{invoiceprint[0].total[0].epf | number:2}}
                    </td>
                </tr>
            </table>
            <br>
            <span style="padding-right: 900px;">*** Computer-generated document, Signature is Not required.</span>
            </td>
            </tr>
            </tbody>
            </table>
            <br><br><br>
        </div>
    </div>
    <!-- Salary Bill Ending -->
    <!--  Salary Claim Starting-->
    <div ng-if="printtype == 2">
        <style>
        @page {
            size: 10in 12in;
            margin: 27mm 16mm 27mm 16mm;
        }

        table {
            page-break-inside: auto
        }

        tr {
            page-break-inside: avoid;
            page-break-after: auto
        }

        thead {
            display: table-header-group
        }

        tfoot {
            display: table-footer-group
        }

        table {
            -fs-table-paginate: paginate;
        }
        </style>
        <div ng-repeat="invoiceprint in printdata">

            <table width="97%" align="center" style="" cellpadding="0" cellspacing="0" border="1"
                style="border-collapse: collapse;page-break-after:always;padding-top:15% !important;">
                <tbody>
                    <td width="100%" align="center">
                        <table width="99%" align="center" cellpadding="0" cellspacing="0" border="0">
                            <tbody>
                                <tr>
                                    <td width="20%" align="center">
                                        <img style="width: 30%;margin-top: 5px;"
                                            src="<?php echo base_url("assets/images/clientletter.jpg")?>">
                                    </td>
                                    <td width="100%" align="center">
                                        <b>TAMILNADU EX-SERVICEMEN’S CORPORATION LIMITED (TEXCO)</b><br>
                                        <b>(A Government of Tamil Nadu Undertaking)</b><br>
                                        <b>Major Parameswaran Memorial Building,</b><br>
                                        <b>No.2, West Mada Street, Srinagar Colony, Saidapet, Chennai-600 015.</b><br>
                                        <b>Phone: 044-22352947, 22301792, 22301793, 22350900 Fax: 044-22301791</b><br>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <hr />
                        <table width="95%" align="center" border="0" cellpadding="0" cellspacing="0">
                            <tbody>
                                <!--<tr>
                   <td  colspan='2' align="center">  <div ng-show="invoiceprint[0].printcount>0"> Duplicate Copy</div>
                          <div ng-show="invoiceprint[0].printcount==0">Original Copy</div></td>
                   </tr>-->

                                <tr>
                                    <br>
                                    <td align="left" class="bill-no"><b>Bill No : {{invoiceprint[0].invoiceno}}</b></td>
                                    <td align="left">Date : {{invoiceprint[0].createddate}} </td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong>Month and Year : </strong>{{invoiceprint[0].monthandyear}}
                                    </td>
                                </tr>

                                <tr ng-if="invoiceprint[0].invoicetype == 0">
                                    <td>
                                        <strong>Project No :<span
                                                style="font-size:15px;">{{invoiceprint[0].projectno}}</span><span> /
                                                {{invoiceprint[0].projectname}} </span></strong>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <br>
                        <table width="95%" align="center" border="0" cellpadding="0" cellspacing="0">
                            <tbody>
                                <tr>
                                    <td>
                                        <strong>To:</strong>
                                    </td>
                                </tr>
                                <tr ng-hide="invoiceprint[0].designation == '' || invoiceprint[0].designation == null">
                                    <td style="font-size: 15px;padding-left: 17px;" width="50%" align="left">
                                        {{invoiceprint[0].designation}},<br>
                                        <span
                                            ng-hide="invoiceprint[0].addressline1 == '' || invoiceprint[0].addressline1 == null">{{invoiceprint[0].addressline1}}</span>
                                        <span
                                            ng-hide="invoiceprint[0].addressline2 == '' || invoiceprint[0].addressline2 == null">,<br>{{invoiceprint[0].addressline2}}
                                        </span>
                                        <span
                                            ng-hide="invoiceprint[0].addressline3 == '' || invoiceprint[0].addressline3 == null">,<br>{{invoiceprint[0].addressline3}}
                                        </span><span
                                            ng-hide="invoiceprint[0].pincode == '' || invoiceprint[0].pincode == null">
                                            - {{invoiceprint[0].pincode}} </span>
                                    </td>
                                    <td style="font-size: 15px;" class="bordertd" border="1">
                                        TEXCO is exempted from the deduction of Income Tax(TDS) Vide CBDT Circular No.
                                        07/2015 Dt. 23.04.2015 of ministry of <br> finance, Department of Revenue
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table width="95%" align="center" border="0" cellpadding="0" cellspacing="0">
                            <tbody style="text-align: justify;">
                                <tr>
                                    <td style="padding-left: 17px;">
                                        <br />
                                        <strong>Customer GST IN : {{invoiceprint[0].gstno}} </strong>
                                    </td>
                                </tr>
                                <tr style="text-align: center;">
                                    <td style="font-size:18px;">
                                        <br />
                                        <strong>CLAIM BILL</strong>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="text-align: justify;">
                                        <br />
                                        <div style="display: flex;justify-content: center;">
                                            <div> TEXCO - {{claim}} for the period from<b> 01/{{startper}} to
                                                    {{maxday}}/{{startper}} </b>- <br />{{invoiceprint[0].projectname}}
                                            </div>
                                        </div>
                                        <br />
                                    </td>
                                </tr>
                                <tr>
                                    <td>

                                        <br />
                                        1. As per the attendance received for the above period towards security deployed
                                        at {{invoiceprint[0].projectname}} invoice as follows
                                        <br />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <br />
                        <table width="95%" align="center" cellpadding="0" cellspacing="2" border="0">
                            <tbody>
                                <tr>
                                    <td valign="top" width="100%">
                                        <table style="border-collapse: collapse;" border="1" width="99%" cellspacing="0"
                                            cellpadding="0" align="center">
                                            <tbody>
                                                <tr height="30px">
                                                    <td align="center"><strong>&nbsp;S.No</strong></td>
                                                    <td align="left" ng-if="invoiceprint[0].invoicetype == 1">
                                                        <strong>&nbsp;Project No/Name</strong>
                                                    </td>
                                                    <td align="left"><strong>&nbsp;Description</strong></td>
                                                    <td style="text-align:center"><strong>&nbsp;No of Person</strong>
                                                    </td>

                                                    <td style="text-align:center"><strong>&nbsp;No Of Duties</strong>
                                                    </td>
                                                    <td style="text-align:center"><strong>&nbsp;Rate P.M</strong></td>
                                                    <td align="center"><strong>&nbsp;Total (Rs.)</strong></td>
                                                </tr>
                                                <tr ng-repeat="l in invoiceprint[0].totalduties">
                                                    <td align="center">&nbsp;<span ng-show="l.name">{{$index+1}}</span>
                                                    </td>
                                                    <td align="left" ng-if="invoiceprint[0].invoicetype == 1">
                                                        <span ng-show="l.name"> {{l.projectno}} - {{l.projectname}}
                                                        </span>
                                                    </td>
                                                    <td>&nbsp;<span ng-show="l.name">{{l.name}}&nbsp;</span>

                                                        <span ng-show="l.jobmastercode=='DVR'"
                                                            ng-repeat="d in invoiceprint[0].drivers">
                                                            <br>
                                                            &nbsp;{{d.firstname}} - {{d.texcono}}
                                                        </span>
                                                    </td>
                                                    <td style="text-align:center">
                                                        <div class="right-center"><span
                                                                ng-show="l.name">&nbsp;{{l.noofperson}}</span></div>
                                                    </td>

                                                    <td style="text-align:center">
                                                        <div class="right-center-nod"><span
                                                                ng-show="l.name">{{l.noofduties | number:2}}</div>
                                                        </span>
                                                    </td>
                                                    <td style="text-align:center">
                                                        <div class="right-center-rpm"><span ng-show="l.name">
                                                                <span class="span-sal"> ({{l.salary  | number:2}}</span>
                                                                <span class="span-ast"> *</span> <span
                                                                    class="span-nodd">{{l.noofduties}}) / {{l.days}}
                                                                </span> </span></div>
                                                    </td>
                                                    <td style="text-align: right;padding-right: 5px;">&nbsp;<span
                                                            ng-show="l.name">{{l.salaryamount | IndiaCurrency}}</span>
                                                    </td>
                                                </tr>


                                                <tr>

                                                    <td>
                                                    </td>
                                                    <td ng-if="invoiceprint[0].invoicetype == 1">
                                                    </td>
                                                    <td>
                                                    </td>
                                                    <td style="text-align: center;">
                                                        Total
                                                    </td>
                                                    <td style="text-align: center;">
                                                        <div class="right-center-nod"><span>{{totaljobs | number:2}}
                                                        </div></span>
                                                    </td>
                                                    <td>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <table style="border-collapse: collapse;" border="1" width="99%" cellspacing="0"
                                            cellpadding="0" align="center">
                                            <tbody>
                                                <tr style="page-break-after:always">
                                                    <td class="left-btsec" style="text-align: left;" colspan="7">
                                                        <strong>Sub Total</strong>
                                                    </td>
                                                    <td style="text-align: right;">
                                                        <strong>{{invoiceprint[0].subtotal | IndiaCurrency}}
                                                            &nbsp;</strong>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="left-btsec" style="text-align: left;" colspan="7">
                                                        <strong>Service Charge
                                                            {{invoiceprint[0].servicecharge | IndiaCurrency}} %
                                                        </strong>
                                                    </td>
                                                    <td style="text-align: right;">
                                                        <span>{{invoiceprint[0].servicecharges  | IndiaCurrency }}
                                                            &nbsp;</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="left-btsec" style="text-align: left;" colspan="7">
                                                        <strong>Total</strong>
                                                    </td>
                                                    <td style="text-align: right;">{{totalsub| IndiaCurrency}} &nbsp;
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="left-btsec" style="text-align: left;" colspan="7">
                                                        <strong><strong>CGST {{invoiceprint[0].tax/2}} %</strong><span
                                                                class="t-amt">{{invoiceprint[0].servicetax/2 |IndiaCurrency}}</span>
                                                    </td>

                                                </tr>
                                                <tr>
                                                    <td class="left-btsec" style="text-align: left;" colspan="7">
                                                        <strong><strong>SGST {{invoiceprint[0].tax/2}} %</strong><span
                                                                class="t-amt">
                                                                {{invoiceprint[0].servicetax/2 |IndiaCurrency}}</span>
                                                    </td>

                                                </tr>
                                                <tr>
                                                    <td class="left-btsec" style="text-align: left;" colspan="7">
                                                        <strong><strong>IGST 0 %<span class="t-amt igst">{{0}}</span>
                                                    </td>

                                                    <td style="text-align: right;">
                                                        <strong>{{invoiceprint[0].servicetax | IndiaCurrency}}
                                                        </strong>&nbsp;
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="text-align: center;" colspan="7"></td>

                                                </tr>

                                                <tr>
                                                    <td style="text-align: left;" colspan="7"><span class="grand_total">
                                                            <strong>Grand Total</strong></span><br />

                                                        <b> (Rupees {{inwordsinv}})</b>
                                                    </td>
                                                    <td style="text-align: right;"><strong>Rs.
                                                            {{totalsubgrand | IndiaCurrency}} &nbsp;</strong>
                                                        <br>
                                                        (or)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                                                        <br>
                                                        <strong>Rs.
                                                            {{invoiceprint[0].total | IndiaCurrency}}&nbsp;&nbsp;</strong>
                                                    </td>
                                                </tr>

                                            </tbody>
                                        </table>

                                    </td>
                                <tr>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td></td>
                                </tr>

                                </tr>

                            </tbody>
                        </table>
                        <table style="margin-left:35px" width="98%" align="center" border="0" cellpadding="0"
                            cellspacing="0">
                            <tbody style="text-align: justify;">

                                <tr>
                                    <td>
                                        2. GST has been claimed as per the Central & State GST Act
                                    </td>
                                </tr>
                                <tr>
                                    <td> 3.GST Regn No. 33AAACT2912M1ZG , PAN No. AAACT2912M , CIN No.
                                        U70101TN1986SGC012609 </td>
                                </tr>
                                <tr>
                                    <td>

                                        4.The bill may be passed and cheque forwarded at the earliest
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <br />
                        <br />
                        <table width="95%" align="center" cellpadding="0" cellspacing="0">
                            <!-- <tr>
                       <td width="50%" align="left">
                        <span>&nbsp;&nbsp;&nbsp;*** Computer-generated document, Signature is Not required.</span>
                     </td> 
                  </tr> -->
                            <tr>
                                <td width="60%">
                                    <table>

                                        <tr>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr width="95%">
                                <td width="30%" align="left">
                                    <b>&nbsp;&nbsp;&nbsp;E. & O. E.</b>
                                </td>
                                <td width="70%" align="right">
                                    <b>Chief Accounts officer, TEXCO&nbsp;&nbsp;&nbsp;</b>
                                </td>
                                <!-- 
                     <td width="50%">
                        <table>
                           <br />
                           <br />
                           <br />
                           <br />
                           <tr>
                              <td width="30%" align="left">
                                 <b>E. & O. E.</b>
                              </td>
                              <td width="70%" align="right">
                                 <b>Chief Accounts officer, TEXCO</b>
                              </td>
                           </tr>
                        </table>
                     </td> -->
                            </tr>
                        </table>
                    </td>
                    </tr>
                </tbody>
            </table>

            <table width="97%" align="center" style="" cellpadding="0" cellspacing="0" border="1"
                style="border-collapse: collapse;page-break-after:always;padding-top:15% !important;">
                <tbody>
                    <td width="100%" align="center">
                        <table width="99%" align="center" cellpadding="0" cellspacing="0" border="0">
                            <tbody>
                                <tr>
                                    <td width="20%" align="center">
                                        <img style="width: 30%;margin-top: 5px;"
                                            src="<?php echo base_url("assets/images/clientletter.jpg")?>">
                                    </td>
                                    <td width="100%" align="center">
                                        <b>TAMILNADU EX-SERVICEMEN’S CORPORATION LIMITED (TEXCO)</b><br>
                                        <b>(A Government of Tamil Nadu Undertaking)</b><br>
                                        <b>Major Parameswaran Memorial Building,</b><br>
                                        <b>No.2, West Mada Street, Srinagar Colony, Saidapet, Chennai-600 015.</b><br>
                                        <b>Phone: 044-22352947, 22301792, 22301793, 22350900 Fax: 044-22301791</b><br>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <hr />
                        <table width="95%" align="center" border="0" cellpadding="0" cellspacing="0">
                            <tbody>
                                <!--<tr>
                   <td  colspan='2' align="center">  <div ng-show="invoiceprint[0].printcount>0"> Duplicate Copy</div>
                          <div ng-show="invoiceprint[0].printcount==0">Original Copy</div></td>
                   </tr>-->

                                <tr>
                                    <br>
                                    <td align="left" class="bill-no"><b>Bill No : {{invoiceprint[0].invoiceno}}</b></td>
                                    <td align="left">Date : {{invoiceprint[0].createddate}} </td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong>Month and Year : </strong>{{invoiceprint[0].monthandyear}}
                                    </td>
                                </tr>

                                <tr ng-if="invoiceprint[0].invoicetype == 0">
                                    <td>
                                        <strong>Project No :<span
                                                style="font-size:15px;">{{invoiceprint[0].projectno}}</span><span> /
                                                {{invoiceprint[0].projectname}} </span></strong>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <br>
                        <table width="95%" align="center" border="0" cellpadding="0" cellspacing="0">
                            <tbody>
                                <tr>
                                    <td>
                                        <strong>To:</strong>
                                    </td>
                                </tr>
                                <tr ng-hide="invoiceprint[0].designation == '' || invoiceprint[0].designation == null">
                                    <td style="font-size: 15px;padding-left: 17px;" width="50%" align="left">
                                        {{invoiceprint[0].designation}},<br>
                                        <span
                                            ng-hide="invoiceprint[0].addressline1 == '' || invoiceprint[0].addressline1 == null">{{invoiceprint[0].addressline1}}</span>
                                        <span
                                            ng-hide="invoiceprint[0].addressline2 == '' || invoiceprint[0].addressline2 == null">,<br>{{invoiceprint[0].addressline2}}
                                        </span>
                                        <span
                                            ng-hide="invoiceprint[0].addressline3 == '' || invoiceprint[0].addressline3 == null">,<br>{{invoiceprint[0].addressline3}}
                                        </span><span
                                            ng-hide="invoiceprint[0].pincode == '' || invoiceprint[0].pincode == null">
                                            - {{invoiceprint[0].pincode}} </span>
                                    </td>
                                    <td style="font-size: 15px;" class="bordertd" border="1">
                                        TEXCO is exempted from the deduction of Income Tax(TDS) Vide CBDT Circular No.
                                        07/2015 Dt. 23.04.2015 of ministry of <br> finance, Department of Revenue
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table width="95%" align="center" border="0" cellpadding="0" cellspacing="0">
                            <tbody style="text-align: justify;">
                                <tr>
                                    <td style="padding-left: 17px;">
                                        <br />
                                        <strong>Customer GST IN : {{invoiceprint[0].gstno}} </strong>
                                    </td>
                                </tr>
                                <tr style="text-align: center;">
                                    <td style="font-size:18px;">
                                        <br />
                                        <strong>CLAIM BILL</strong>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="text-align: justify;">
                                        <br />
                                        <div style="display: flex;justify-content: center;">
                                            <div> TEXCO - {{claim}} for the period from<b> 01/{{startper}} to
                                                    {{maxday}}/{{startper}} </b>- <br />{{invoiceprint[0].projectname}}
                                            </div>
                                        </div>
                                        <br />
                                    </td>
                                </tr>
                                <tr>
                                    <td>

                                        <br />
                                        1. As per the attendance received for the above period towards security deployed
                                        at {{invoiceprint[0].projectname}} invoice as follows
                                        <br />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <br />
                        <table width="95%" align="center" cellpadding="0" cellspacing="2" border="0">
                            <tbody>
                                <tr>
                                    <td valign="top" width="100%">
                                        <table style="border-collapse: collapse;" border="1" width="99%" cellspacing="0"
                                            cellpadding="0" align="center">
                                            <tbody>
                                                <tr height="30px">
                                                    <td align="center"><strong>&nbsp;S.No</strong></td>
                                                    <td align="left" ng-if="invoiceprint[0].invoicetype == 1">
                                                        <strong>&nbsp;Project No/Name</strong>
                                                    </td>
                                                    <td align="left"><strong>&nbsp;Description</strong></td>
                                                    <td style="text-align:center"><strong>&nbsp;No of Person</strong>
                                                    </td>

                                                    <td style="text-align:center"><strong>&nbsp;No Of Duties</strong>
                                                    </td>
                                                    <td style="text-align:center"><strong>&nbsp;Rate P.M</strong></td>
                                                    <td align="center"><strong>&nbsp;Total (Rs.)</strong></td>
                                                </tr>
                                                <tr ng-repeat="l in invoiceprint[0].totalduties">
                                                    <td align="center">&nbsp;<span ng-show="l.name">{{$index+1}}</span>
                                                    </td>
                                                    <td align="left" ng-if="invoiceprint[0].invoicetype == 1">
                                                        <span ng-show="l.name"> {{l.projectno}} - {{l.projectname}}
                                                        </span>
                                                    </td>
                                                    <td>&nbsp;<span ng-show="l.name">{{l.name}}&nbsp;</span>

                                                        <span ng-show="l.jobmastercode=='DVR'"
                                                            ng-repeat="d in invoiceprint[0].drivers">
                                                            <br>
                                                            &nbsp;{{d.firstname}} - {{d.texcono}}
                                                        </span>
                                                    </td>
                                                    <td style="text-align:center">
                                                        <div class="right-center"><span
                                                                ng-show="l.name">&nbsp;{{l.noofperson}}</span></div>
                                                    </td>

                                                    <td style="text-align:center">
                                                        <div class="right-center-nod"><span
                                                                ng-show="l.name">{{l.noofduties | number:2}}</div>
                                                        </span>
                                                    </td>
                                                    <td style="text-align:center">
                                                        <div class="right-center-rpm"><span ng-show="l.name">
                                                                <span class="span-sal"> ({{l.salary  | number:2}}</span>
                                                                <span class="span-ast"> *</span> <span
                                                                    class="span-nodd">{{l.noofduties}}) / {{l.days}}
                                                                </span> </span></div>
                                                    </td>
                                                    <td style="text-align: right;padding-right: 5px;">&nbsp;<span
                                                            ng-show="l.name">{{l.salaryamount | IndiaCurrency}}</span>
                                                    </td>
                                                </tr>


                                                <tr>

                                                    <td>
                                                    </td>
                                                    <td ng-if="invoiceprint[0].invoicetype == 1">
                                                    </td>
                                                    <td>
                                                    </td>
                                                    <td style="text-align: center;">
                                                        Total
                                                    </td>
                                                    <td style="text-align: center;">
                                                        <div class="right-center-nod"><span>{{totaljobs | number:2}}
                                                        </div></span>
                                                    </td>
                                                    <td>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <table style="border-collapse: collapse;" border="1" width="99%" cellspacing="0"
                                            cellpadding="0" align="center">
                                            <tbody>
                                                <tr style="page-break-after:always">
                                                    <td class="left-btsec" style="text-align: left;" colspan="7">
                                                        <strong>Sub Total</strong>
                                                    </td>
                                                    <td style="text-align: right;">
                                                        <strong>{{invoiceprint[0].subtotal | IndiaCurrency}}
                                                            &nbsp;</strong>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="left-btsec" style="text-align: left;" colspan="7">
                                                        <strong>Service Charge
                                                            {{invoiceprint[0].servicecharge | IndiaCurrency}} %
                                                        </strong>
                                                    </td>
                                                    <td style="text-align: right;">
                                                        <span>{{invoiceprint[0].servicecharges  | IndiaCurrency }}
                                                            &nbsp;</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="left-btsec" style="text-align: left;" colspan="7">
                                                        <strong>Total</strong>
                                                    </td>
                                                    <td style="text-align: right;">{{totalsub| IndiaCurrency}} &nbsp;
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="left-btsec" style="text-align: left;" colspan="7">
                                                        <strong><strong>CGST {{invoiceprint[0].tax/2}} %</strong><span
                                                                class="t-amt">{{invoiceprint[0].servicetax/2 |IndiaCurrency}}</span>
                                                    </td>

                                                </tr>
                                                <tr>
                                                    <td class="left-btsec" style="text-align: left;" colspan="7">
                                                        <strong><strong>SGST {{invoiceprint[0].tax/2}} %</strong><span
                                                                class="t-amt">
                                                                {{invoiceprint[0].servicetax/2 |IndiaCurrency}}</span>
                                                    </td>

                                                </tr>
                                                <tr>
                                                    <td class="left-btsec" style="text-align: left;" colspan="7">
                                                        <strong><strong>IGST 0 %<span class="t-amt igst">{{0}}</span>
                                                    </td>

                                                    <td style="text-align: right;">
                                                        <strong>{{invoiceprint[0].servicetax | IndiaCurrency}}
                                                        </strong>&nbsp;
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="text-align: center;" colspan="7"></td>

                                                </tr>

                                                <tr>
                                                    <td style="text-align: left;" colspan="7"><span class="grand_total">
                                                            <strong>Grand Total</strong></span><br />

                                                        <b> (Rupees {{inwordsinv}})</b>
                                                    </td>
                                                    <td style="text-align: right;"><strong>Rs.
                                                            {{totalsubgrand | IndiaCurrency}} &nbsp;</strong>
                                                        <br>
                                                        (or)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                                                        <br>
                                                        <strong>Rs.
                                                            {{invoiceprint[0].total | IndiaCurrency}}&nbsp;&nbsp;</strong>
                                                    </td>
                                                </tr>

                                            </tbody>
                                        </table>

                                    </td>
                                <tr>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td></td>
                                </tr>

                                </tr>

                            </tbody>
                        </table>
                        <table style="margin-left:35px" width="98%" align="center" border="0" cellpadding="0"
                            cellspacing="0">
                            <tbody style="text-align: justify;">

                                <tr>
                                    <td>
                                        2. GST has been claimed as per the Central & State GST Act
                                    </td>
                                </tr>
                                <tr>
                                    <td> 3.GST Regn No. 33AAACT2912M1ZG , PAN No. AAACT2912M , CIN No.
                                        U70101TN1986SGC012609 </td>
                                </tr>
                                <tr>
                                    <td>

                                        4.The bill may be passed and cheque forwarded at the earliest
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <br />
                        <br />
                        <table width="95%" align="center" cellpadding="0" cellspacing="0">
                            <!-- <tr>
                       <td width="50%" align="left">
                        <span>&nbsp;&nbsp;&nbsp;*** Computer-generated document, Signature is Not required.</span>
                     </td> 
                  </tr> -->
                            <tr>
                                <td width="60%">
                                    <table>

                                        <tr>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr width="95%">
                                <td width="30%" align="left">
                                    <b>&nbsp;&nbsp;&nbsp;E. & O. E.</b>
                                </td>
                                <td width="70%" align="right">
                                    <b>Chief Accounts officer, TEXCO&nbsp;&nbsp;&nbsp;</b>
                                </td>
                                <!-- 
                     <td width="50%">
                        <table>
                           <br />
                           <br />
                           <br />
                           <br />
                           <tr>
                              <td width="30%" align="left">
                                 <b>E. & O. E.</b>
                              </td>
                              <td width="70%" align="right">
                                 <b>Chief Accounts officer, TEXCO</b>
                              </td>
                           </tr>
                        </table>
                     </td> -->
                            </tr>
                        </table>
                    </td>
                    </tr>
                </tbody>
            </table>
            <table width="97%" align="center" cellpadding="0" cellspacing="0" border="1"
                style="border-collapse: collapse;page-break-after:always;margin-top:2% !important;">
                <tbody>
                    <tr>
                        <td width="100%" align="center">
                            <table width="99%" align="center" cellpadding="0" cellspacing="0" border="0">
                                <tbody>
                                    <tr>
                                        <td width="20%" align="center">
                                            <img style="width: 30%;margin-top: 5px;"
                                                src="<?php echo base_url("assets/images/clientletter.jpg")?>">
                                        </td>
                                        <td width="100%" align="center">
                                            <b>TAMILNADU EX-SERVICEMEN’S CORPORATION LIMITED (TEXCO)</b><br>
                                            <b>(A Government of Tamil Nadu Undertaking)</b><br>
                                            <b>Major Parameswaran Memorial Building,</b><br>
                                            <b>No.2, West Mada Street, Srinagar Colony, Saidapet, Chennai-600
                                                015.</b><br>
                                            <b>Phone: 044-22352947, 22301792, 22301793, 22350900 Fax:
                                                044-22301791</b><br>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <hr />
                            <table width="95%" align="center" border="0" cellpadding="0" cellspacing="0">
                                <tbody>

                                    <tr>
                                        <br>
                                        <td align="left"><b>Bill No : {{invoiceprint[0].invoiceno}}</b></td>
                                        <td align="right">Date : {{invoiceprint[0].createddate}} </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong>Month and Year : </strong>{{invoiceprint[0].monthandyear}}
                                        </td>
                                    </tr>

                                    <tr ng-if="invoiceprint[0].invoicetype == 0">
                                        <td>
                                            <strong>Project No :<span
                                                    style="font-size:15px;">{{invoiceprint[0].projectno}}</span><span> /
                                                    {{invoiceprint[0].projectname}} </span></strong>
                                        </td>
                                    </tr>
                                    <div ng-init="type=3"></div>
                                    <!-- <tr>
                   
                       
                        <td align="left"><b>Bill No:</b>{{invoiceprint[0].invoiceno}}
                        </td>
                        <td align="right"><b>Dated On:</b> {{invoiceprint[0].createddate}}
                        </td>
                     </tr>-->
                                </tbody>
                            </table>
                            <br>
                            <table width="95%" align="center" border="0" cellpadding="0" cellspacing="0">
                                <tbody style="text-align: justify;">
                                    <!--  <tr style="text-align: center;">
                        <td  colspan='2' align="center">  <div ng-show="invoiceprint[0].printcount>0"> Duplicate Copy</div>
                        <div ng-show="invoiceprint[0].printcount==0">Orginal Copy</div>
                        </td>
                     </tr>-->
                                    <tr style="text-align: center;">
                                        <td>
                                            <br />
                                            <strong>ADVANCE RECEIPT</strong>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="text-align: left;">
                                            <br />
                                            Received a sum of Rs. {{invoiceprint[0].total | IndiaCurrency}}/- (Rupees
                                            {{inwordsinv}}) from the {{invoiceprint[0].projectname}} towards
                                            {{advclaim }}service charges for the period from 01/{{startper}} to
                                            {{maxday}}/{{startper}} against the Bill No {{invoiceprint[0].invoiceno}}
                                            for personnel deployed at the {{invoiceprint[0].projectname}}., by TEXCO Ltd





                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <br />
                            <table width="95%" align="center" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td width="50%">
                                        <table>
                                            <br />
                                            <br>
                                            <tr>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td width="30%" align="left">
                                        <b>E. & O. E.</b>
                                    </td>
                                    <td width="70%" align="right">
                                        <b>Chief Accounts officer, TEXCO</b>
                                    </td>
                                    <!-- <td width="100%">
                        <table>
                           <br />
                           <br />
                           <br />
                           <br />
                           <tr>
                              <td width="30%" align="left">
                                 <b>E. & O. E.</b>
                              </td>
                              <td width="70%" align="right">
                                 <b>Chief Accounts officer, TEXCO</b>
                              </td>
                           </tr>
                        </table>
                     </td> -->
                                </tr>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>


        </div>
    </div>
    <!-- Salary Claim Ending -->
</div>

<style>
td.bordertd {
    border: 1px solid;
    width: 30%;
}

span.grand_total {
    margin-left: 46%;
}

// .pgprint
// {
//    margin-left:50px;
//    margin-top:50px;
// }
td.left-btsec {
    padding-left: 49%;
}

span.t-amt {
    margin-left: 31px;
}

span.t-amt.igst {
    margin-left: 62px;
}

td.bill-no {
    width: 62%;
}

.right-center {
    display: flex;
    justify-content: center;
}

.right-center>span {
    text-align: right;
    min-width: 25px;
}

.right-center-nod {
    display: flex;
    justify-content: center;
}

.right-center-nod>span {
    text-align: right;
    min-width: 55px;
}

.right-center-rpm {
    display: flex;
    justify-content: center;
}

.right-center-rpm>span {
    text-align: right;
    min-width: 135px;
}

.right-center-rpm>span span:last-child {
    min-width: 55px;
    display: inline-block;
}
</style>

<script>
(function() {
    var beforePrint = function() {
        //alert('Functionality to run before printing.');
    };

    var afterPrint = function() {
        //  alert('Functionality to run after printing');
        var controllerElement = document.querySelector('[ng-controller="ctrlPrint"]');
        angular.element(controllerElement).scope().printcompleted();
    };

    if (window.matchMedia) {
        var mediaQueryList = window.matchMedia('print');
        mediaQueryList.addListener(function(mql) {
            // alert($(mediaQueryList).html());
            if (mql.matches) {
                beforePrint();
            } else {
                afterPrint();
            }
        });
    }
    window.onbeforeprint = beforePrint;
    window.onafterprint = afterPrint;
}());
</script>