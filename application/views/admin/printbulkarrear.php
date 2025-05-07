<script type="text/javascript">
var base_url = "<?php echo base_url()?>"
</script>
<script type="text/javascript">
var api_url = "<?php echo config_item('api_url')?>"
</script> 
<script type="text/javascript">var atoken = "<?php echo $this->session->usertoken('atoken')?>"</script>
<script type="text/javascript" src="<?php echo base_url("assets/libs/jquery/3.7.1/jquery.min.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/libs/angular/1.8.2/angular.min.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/app/printbulkarrear.js")?>"></script>
<script type="text/javascript">
var fromdate = "<?php echo $_GET['fromdate'];?>";
var todate = "<?php echo $_GET['todate'];?>";
var regionid = "<?php echo $_GET['regionid'];?>";
var type = "<?php echo $_GET['type'];?>";
</script>
<link href="<?php echo base_url("assets/css/texco.css")?>" rel="Stylesheet" type="text/css" />
<div ng-app="appclaimPrint" ng-controller="ctrlclaimPrint">
    <div ng-repeat="invoiceprint in payslipprint" ng-if="printtype == 3"> 
        <style> 
            @page {
                size: 15in 12in;
                margin: 27mm 16mm 27mm 16mm;
            }
            table { page-break-inside:auto }
            tr    { page-break-inside:avoid; page-break-after:auto }
            thead { display:table-header-group }
            tfoot { display:table-footer-group } 
            table {
                -fs-table-paginate: paginate;
            }
            thead.report-header {
                display: table-header-group;
            }
        </style>
        <table width="100%" align="center" cellpadding="0" cellspacing="0" border="1"
            style="page-break-before: always; page-break-after: always;border: 1;">
            <tbody>
                <tr>
                    <td width="100%" align="center">
                       <!--  <table width="99%" align="center" cellpadding="0" cellspacing="0" border="0">
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
                                        <b>No.2, West Mada Street, Srinagar Colony, Saidapet, Chennai-600 015.</b><br>
                                        <b>Phone: 044-22352947, 22301792, 22301793, 22350900 Fax: 044-22301791</b><br>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <hr /> -->
                        <table width="99%" align="center" border="0" cellpadding="0" cellspacing="0">
                            <tbody>
                                <tr>
                                    <div ng-show="invoiceprint[0].ssprintcount > 0"> Duplicate Copy</div>
                                    <div ng-show="invoiceprint[0].ssprintcount == 0">Original Copy</div> <br>
                                    CONSOLIDATED PAYMENT TO TEXCO PERSONNEL IN THE PROJECT OF
                                    {{invoiceprint[0][0].members.projectno}} FOR THE PERIOD OF  {{invoiceprint[0][0].members.monthandyear}}
                                    <br>
                                </tr>
                                <br>
                                <tr>
                                    <td align="left"><b>{{invoiceprint[0][2].diff.wagetype}} {{invoiceprint[0][2].diff.wageyear}} </b>
                                    </td>
                                    <td align="right" style="font-size: 13px;">
                                        <b> Project Address : </b>
                                        <span
                                            ng-hide="invoiceprint[0][0].members.designation == '' || invoiceprint[0][0].members.designation == null">
                                            &nbsp; &nbsp; &nbsp;{{invoiceprint[0][0].members.designation}},
                                        </span>
                                        <br>
                                        <span
                                            ng-hide="invoiceprint[0][0].members.addressline1 == '' || invoiceprint[0][0].members.addressline1 == null">{{invoiceprint[0][0].members.addressline1}}</span>
                                        <span
                                            ng-hide="invoiceprint[0][0].members.addressline2 == '' || invoiceprint[0][0].members.addressline2 == null">,
                                            <br>&nbsp; &nbsp; &nbsp;{{invoiceprint[0][0].members.addressline2}} </span>
                                        <span
                                            ng-hide="invoiceprint[0][0].members.addressline3 == '' || invoiceprint[0][0].members.addressline3 == null">,
                                            <br>&nbsp; &nbsp; &nbsp;{{invoiceprint[0][0].members.addressline3}} </span> <span
                                            ng-hide="invoiceprint[0][0].members.pincode == '' || invoiceprint[0][0].members.pincode == null"> -
                                            {{invoiceprint[0][0].members.pincode}}&nbsp; &nbsp; </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <br>
                                        <strong>Payslip No &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; :
                                            &nbsp;</strong>{{invoiceprint[0][2].diff.payslipno}}
                                        <br>
                                        <strong>Project No &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; :
                                            &nbsp;</strong>{{invoiceprint[0][0].members.projectno}}
                                        <br>
                                        <strong>Date of Recp &nbsp; &nbsp; &nbsp;:
                                            &nbsp;</strong><?php echo  date("d-m-Y");?>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <br>
                        <table style="border-collapse: collapse;" border="1" width="99%" cellspacing="0" cellpadding="0"
                            align="center">
                            <thead style="font-size: 14px;" class="report-header">
                                <tr height="30px">
                                    <td align="left"><strong>&nbsp;S.No</strong></td>
                                    <td align="left"><strong>&nbsp;Texco/ UAN No / Service No</strong></td>
                                    <td align="left"><strong>&nbsp;Employee's Name / &nbsp; Bank A/C No</strong></td>
                                    <td align="left"><strong>&nbsp;Days</strong></td>
                                    <td align="left"><strong>&nbsp;Basic + <br>&nbsp;Vda</strong></td>
                                    <td align="left"><strong>&nbsp;ED Days</strong></td>
                                    <td align="left"><strong>&nbsp;ED Amt</strong></td>
                                    <td align="left"><strong>&nbsp;Hra</strong></td>
                                    <td align="left"><strong>&nbsp;Medical</strong></td>
                                    <td align="left"><strong>&nbsp;Uniform</strong></td>
                                    <td align="left"><strong>&nbsp;Leave Reser</strong></td>
                                    <td align="left"><strong>&nbsp;Bon/Inct</strong></td>
                                    <td align="left"><strong>&nbsp;Wash Allw</strong></td>
                                    <td align="left"><strong>&nbsp;Others</strong></td>
                                    <td align="left"><strong>&nbsp;Gross</strong></td>
                                    <td align="left"><strong>&nbsp;Epf 12 %</strong></td>
                                    <td align="left"><strong>&nbsp;Unif</strong></td>
                                    <td align="left"><strong>&nbsp;Others</strong></td>
                                    <td align="left"><strong>&nbsp;Total</strong></td>
                                    <td align="left"><strong>&nbsp;Net Pay</strong></td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr ng-repeat-start="x in invoiceprint"
                                    style="font-size: 14px;border-bottom: 0px solid #fff;">
                                    <td align="center">&nbsp;{{$index+1}}</td>
                                    <td align="center">
                                        &nbsp; {{ x[0].members.texcono }} / {{ x[0].members.uanno }} /
                                        &nbsp; {{ x[0].members.serviceno }}
                                    </td>
                                    <td><span
                                            class="capitalize">&nbsp;{{x[0].members.firstname}}</span>&nbsp;{{x[0].members.jobcode}}<br>
                                        {{x[0].members.accountno}}&nbsp;</td>
                                    <td align="center">&nbsp;{{x[0].members.presentdays}}</td>
                                    <td align="right">&nbsp;{{x[0].members.basic | number:2}}&nbsp; &nbsp;</td>
                                    <td align="center">&nbsp;<span ng-show="x.jobcode!='DVR'">
                                            {{x[0].members.eddays}}</span> <span ng-show="x[0].members.jobcode=='DVR'">
                                            {{x[0].members.othours/8 |  number:0}}&nbsp; &nbsp;</span> </td>
                                    <td align="right">&nbsp;{{x[0].members.edamount | number:2}}&nbsp; &nbsp;</td>
                                    <td align="right">&nbsp;{{x[0].members.hra | number:2}}&nbsp; &nbsp;</td>
                                    <td align="right">&nbsp;{{x[0].members.ma | number:2}} &nbsp; &nbsp;</td>
                                    <td align="right">&nbsp;{{x[0].members.unifdt | number:2}} &nbsp; &nbsp;</td>
                                    <td align="right">&nbsp;{{x[0].members.leapay | number:2}} &nbsp; &nbsp;</td>
                                    <td align="right">&nbsp;{{x[0].members.bonus | number:2}} &nbsp; &nbsp;</td>
                                    <td align="right">&nbsp;{{x[0].members.washallow | number:2}} &nbsp; &nbsp;</td>
                                    <td align="right">&nbsp;{{x[0].members.other1 | number:2}} &nbsp; &nbsp;</td>
                                    <td align="right">
                                        &nbsp;{{x[0].members.basic + x[0].members.edamount + x[0].members.hra + x[0].members.ma + x[0].members.unifdt + x[0].members.leapay + x[0].members.bonus + x[0].members.washallow +  x[0].members.other1 | number:0 }}
                                        &nbsp; &nbsp;</td>
                                    <td align="right">&nbsp;{{x[0].members.epf | number:0}} &nbsp; &nbsp;</td>
                                    <td>&nbsp; </td>
                                    <td align="right">&nbsp;{{x[0].members.other2 | number:2}} &nbsp; &nbsp;</td>
                                    <td align="right">&nbsp;{{x[0].members.epf + x[0].members.other2 | number:0}} &nbsp;
                                        &nbsp;</td>
                                    <td align="right">
                                        &nbsp;{{x[0].members.basic + x[0].members.edamount + x[0].members.hra +  x[0].members.ma  + x[0].members.unifdt + x[0].members.leapay + x[0].members.bonus + x[0].members.washallow + x[0].members.other1 - x[0].members.epf - x[0].members.other2 | number:0}}&nbsp;
                                        &nbsp;</td>


                                </tr>
                                <tr style="font-size: 14px">
                                    <td align="center">&nbsp;</td>
                                    <td align="center">
                                        Eligible Amount
                                    </td>
                                    <td></td>
                                    <td align="center">&nbsp;{{x[1].elgible.presentdays}}</td>
                                    <td align="right">&nbsp;{{x[1].elgible.basic | number:2}}&nbsp; &nbsp;</td>
                                    <td align="center">&nbsp;<span ng-show="x[1].elgible.jobcode!='DVR'">
                                            {{x[1].elgible.eddays}}</span> <span ng-show="x[1].elgible.jobcode=='DVR'">
                                            {{x[1].elgible.othours/8 |  number:0}}&nbsp; &nbsp;</span> </td>
                                    <td align="right">&nbsp;{{x[1].elgible.edamount | number:2}}&nbsp; &nbsp;</td>
                                    <td align="right">&nbsp;{{x[1].elgible.hra | number:2}}&nbsp; &nbsp;</td>
                                    <td align="right">&nbsp;{{x[1].elgible.ma | number:2}} &nbsp; &nbsp;</td>
                                    <td align="right">&nbsp;{{x[1].elgible.unifdt | number:2}} &nbsp; &nbsp;</td>
                                    <td align="right">&nbsp;{{x[1].elgible.leapay | number:2}} &nbsp; &nbsp;</td>
                                    <td align="right">&nbsp;{{x[1].elgible.bonus | number:2}} &nbsp; &nbsp;</td>
                                    <td align="right">&nbsp;{{x[1].elgible.washallow | number:2}} &nbsp; &nbsp;</td>
                                    <td align="right">&nbsp;{{x[1].elgible.other1 | number:2}} &nbsp; &nbsp;</td>
                                    <td align="right">
                                        &nbsp;{{x[1].elgiblex.basic + x[1].elgible.edamount + x[1].elgible.hra + x[1].elgible.ma + x[1].elgible.unifdt + x[1].elgible.leapay + x[1].elgible.bonus + x[1].elgible.washallow +  x[1].elgible.other1 | number:0 }}
                                        &nbsp; &nbsp;</td>
                                    <td align="right">&nbsp;{{x[1].elgible.epf | number:0}} &nbsp; &nbsp;</td>
                                    <td>&nbsp; </td>
                                    <td align="right">&nbsp;{{x[1].elgible.other2 | number:2}} &nbsp; &nbsp;</td>
                                    <td align="right">&nbsp;{{x[1].elgible.epf + x[1].elgible.other2 | number:0}} &nbsp;
                                        &nbsp;</td>
                                    <td align="right">
                                        &nbsp;{{x[1].elgible.basic + x[1].elgible.edamount + x[1].elgible.hra +  x[1].elgible.ma  + x[1].elgible.unifdt + x[1].elgible.leapay + x[1].elgible.bonus + x[1].elgible.washallow +  x[1].elgible.other1 - x[1].elgible.epf - x[1].elgible.other2 | number:0}}&nbsp;
                                        &nbsp;</td>


                                </tr>
                                <tr ng-repeat-end style="font-size: 14px">
                                    <td align="center">&nbsp;</td>
                                    <td align="center">
                                        Difference
                                    </td>
                                    <td></td>
                                    <td align="center">&nbsp;{{x[2].diff.presentdays}}</td>
                                    <td align="right">&nbsp;{{x[2].diff.basic | number:2}}&nbsp; &nbsp;</td>
                                    <td align="center">&nbsp;<span ng-show="x[2].diff.jobcode!='DVR'">
                                            {{x[2].diff.eddays}}</span> <span ng-show="x[2].diff.jobcode=='DVR'">
                                            {{x[2].diff.othours/8 |  number:0}}&nbsp; &nbsp;</span> </td>
                                    <td align="right">&nbsp;{{x[2].diff.edamount | number:2}}&nbsp; &nbsp;</td>
                                    <td align="right">&nbsp;{{x[2].diff.hra | number:2}}&nbsp; &nbsp;</td>
                                    <td align="right">&nbsp;{{x[2].diff.ma | number:2}} &nbsp; &nbsp;</td>
                                    <td align="right">&nbsp;{{x[2].diff.unifdt | number:2}} &nbsp; &nbsp;</td>
                                    <td align="right">&nbsp;{{x[2].diff.leapay | number:2}} &nbsp; &nbsp;</td>
                                    <td align="right">&nbsp;{{x[2].diff.bonus | number:2}} &nbsp; &nbsp;</td>
                                    <td align="right">&nbsp;{{x[2].diff.washallow | number:2}} &nbsp; &nbsp;</td>
                                    <td align="right">&nbsp;{{x[2].diff.other1 | number:2}} &nbsp; &nbsp;</td>
                                    <td align="right">
                                        &nbsp;{{x[2].diff.basic + x[2].diff.edamount + x[2].diff.hra + x[2].diff.ma + x[2].diff.unifdt + x[2].diff.leapay + x[2].diff.bonus + x[2].diff.washallow +  x[2].diff.other1 | number:0 }}
                                        &nbsp; &nbsp;</td>
                                    <td align="right">&nbsp;{{x[2].diff.epf | number:0}} &nbsp; &nbsp;</td>
                                    <td>&nbsp; </td>
                                    <td align="right">&nbsp;{{x[2].diff.other2 | number:2}} &nbsp; &nbsp;</td>
                                    <td align="right">&nbsp;{{x[2].diff.epf + x[2].diff.other2 | number:0}} &nbsp;
                                        &nbsp;</td>
                                    <td align="right">
                                        &nbsp;{{x[2].diff.basic + x[2].diff.edamount + x[2].diff.hra +  x[2].diff.ma  + x[2].diff.unifdt + x[2].diff.leapay + x[2].diff.bonus + x[2].diff.washallow +  x[2].diff.other1 - x[2].diff.epf - x[2].diff.other2 | number:0}}&nbsp;
                                        &nbsp;</td>


                                </tr>
                                <tr style="page-break-inside: avoid;">
                                    <td style="text-align: center;" colspan="3">Total</td>
                                    <td><b>&nbsp;{{invoiceprint[0].total[0].presentdays}}</b></td>
                                    <td><b>&nbsp;{{invoiceprint[0].total[0].basic | number:2}}&nbsp; &nbsp;</b></td>
                                    <td><b>&nbsp; {{invoiceprint[0].total[0].eddays}} </b></td>
                                    <td><b>&nbsp;{{invoiceprint[0].total[0].edamount | number:2}}&nbsp; &nbsp;</b></td>
                                    <td><b>&nbsp;{{invoiceprint[0].total[0].hra | number:2}}&nbsp; &nbsp;</b></td>
                                    <td><b>&nbsp;{{invoiceprint[0].total[0].ma | number:2}}&nbsp; &nbsp;</b></td>
                                    <td><b>&nbsp;{{invoiceprint[0].total[0].unifdt | number:2}}&nbsp; &nbsp;</b></td>
                                    <td><b>&nbsp;{{invoiceprint[0].total[0].leapay | number:2}}&nbsp; &nbsp;</b></td>
                                    <td><b>&nbsp;{{invoiceprint[0].total[0].bonus | number:2}}&nbsp; &nbsp;</b></td>
                                    <td><b>&nbsp;{{invoiceprint[0].total[0].washallow | number:2}}&nbsp; &nbsp;</b></td>
                                    <td><b>&nbsp;{{invoiceprint[0].total[0].other1 | number:2}}&nbsp; &nbsp;</b></td>
                                    <td><b>&nbsp;{{invoiceprint[0].total[0].totalgross | number:0 }}&nbsp; &nbsp;</b></td>
                                    <td><b>&nbsp;{{invoiceprint[0].total[0].epf | number:0}}&nbsp; &nbsp;</b></td>
                                    <td><b>&nbsp;</b></td>
                                    <td><b>&nbsp;{{invoiceprint[0].total[0].other2 | number:2}}&nbsp; &nbsp;</b></td>
                                    <td><b>&nbsp;{{invoiceprint[0].total[0].totaldeduc | number:0}}&nbsp; &nbsp;</b></td>
                                    <td><b>&nbsp;{{invoiceprint[0].total[0].netpay | number:0}}&nbsp; &nbsp;</b></td>
                                    <td></td>

                                </tr>
                            </tbody>
                        </table>
                        <br>
                        <table>
                            <tr>
                                <td>
                                    (*) Gross = {{totalgross | number:2}}/- Total Deductions =
                                    {{totaldeduc | number:2}}/- Net = {{netpay | number:2}}/-
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    (*) {{inwords}}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <!-- (*) Basic Pay   SG - 3682   HSG - 4897    ASO - 6259  -->
                                </td>
                            </tr>
                        </table>
                        <table>
                            <tr>
                                <td>
                                    Certified that the :-
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    (a) Wages have been prepared strictly as per the certified attendance received from
                                    the project and not paid previously
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    (b) above statement has not been prepared and paid previously
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    (c) Bonus paid along with monhtly wages w.e.f Oct-Nov'99
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    (d) Deductions of uniform and Insurance stopped w.e.f August `2001-September 2001.
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    (d) As per the discussion of Board of TEXCO during 67th Board Meeting held on
                                    6/3/2002 ,Gravity deducted , to be settled at the time of cessation of Service of
                                    Service or at the end of contract period which ever is earlier
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
                                    Project Clerk
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
                                    Accountant
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
                                    Accounts Officer
                                </td>
                            </tr>
                        </table>
                        <br>
                        <span style="padding-right: 800px;">*** Computer-generated document, Signature is Not
                            required.</span>
                    </td>
                </tr>
            </tbody>
        </table>
        <br><br>
    </div> 
    <div ng-repeat="invprint in invoiceprint" ng-if="printtype == 4">
        <style> 
            @page {
                size: 15in 12in;
                margin: 27mm 16mm 27mm 16mm;
            }
            table { page-break-inside:auto }
            tr    { page-break-inside:avoid; page-break-after:auto }
            thead { display:table-header-group }
            tfoot { display:table-footer-group } 
            table {
                -fs-table-paginate: paginate;
            }
        </style>
        <table width="97%" align="center" cellpadding="0" cellspacing="0" border="1" style="border-collapse: collapse;page-break-after:always;margin-top:2% !important;" ng-repeat="n in [].constructor(2)  track by $index">
            <tbody>
                <tr>
                    <td width="100%" align="center">
                   <!-- <table width="99%" align="center" cellpadding="0" cellspacing="0" border="0">
                        <tbody>
                            <tr>
                                <td width="20%" align="center">
                                <img style="height: 50%;margin-top: 5px;" src="<?php echo base_url("assets/images/clientletter.jpg")?>">
                                </td>
                                <td width="100%" align="center">
                                <b>TAMILNADU EX-SERVICEMEN’S CORPORATION LIMITED (TEXCO)</b><br>
                                <b>(A Government of Tamil Nadu Undertaking)</b><br>
                                <b>Major Parameswaran Memorial Building,</b><br>
                                <b>No.2, West Mada Street, Srinagar Colony, Saidapet, Chennai-600 015.Fax: 044-22301791</b><br>
                                <b>Accounts: 044-22350900 Recruitment / Agree: 044-22301793 Admin:044-22352947</b><br>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <hr /> -->
                    <table width="95%" align="center" border="0" cellpadding="0" cellspacing="0">
                        <tbody>
                            <tr>
                                <br>
                                <td align="left"><b>Bill No :  </b> {{invprint[0].newinvoiceno}} </td>
                                <td align="right"> Dated : {{ invprint[0].invoicedate}} </td>
                            </tr>
                            <tr>
                                <td>
                                <strong>Month and Year :  </strong>{{invprint[0].monthandyear}}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                <br>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                <strong>Project No :</strong>{{invprint[0].projectno}}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <br>
                    <table width="95%" align="center" border="0" cellpadding="0" cellspacing="0">
                        <tbody>
                            <tr>
                            <tr><td colspan='2' align="center" style="text-decoration: underline"><h2>{{invprint[0].projectname}}</h2></td></tr>
                                <td>
                                <strong>To:</strong>
                                </td>
                            </tr>
                            <tr>
                                <td style="font-size: 15px;" width="50%"  align="left">
                                &nbsp; &nbsp; &nbsp;{{invprint[0].contactname}}<br>
                                &nbsp; &nbsp; &nbsp;<span  ng-hide="invprint[0].addressline1 == '' || invprint[0].addressline1 == null" >{{invprint[0].addressline1}}</span>
                                <span ng-hide="invprint[0].addressline2 == '' || invprint[0].addressline2 == null">,<br>&nbsp; &nbsp; &nbsp;{{invprint[0].addressline2}} </span>
                                <span ng-hide="invprint[0].addressline3 == '' || invprint[0].addressline3 == null">,<br>&nbsp; &nbsp; &nbsp;{{invprint[0].addressline3}} </span><span ng-hide="invprint[0].pincode == '' || invprint[0].pincode == null"> - {{invprint[0].pincode}} </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table width="95%" align="center" border="0" cellpadding="0" cellspacing="0">
                        <tbody style="text-align: justify;">
                            <tr style="text-align: center;">
                                <td  style="text-decoration: underline">
                                <br />
                                <strong><h2 >ARREAR CLAIM BILL </h2></strong>
                                </td>
                            </tr>
                            <tr>
                                <td style="text-align: left;">
                                <br />
                                &nbsp; &nbsp; TEXCO - arrear Claim for the period from {{invprint[0].monthandyear}} - {{invprint[0].projectname}}  
                                <br/>
                                </td>
                            </tr>
                            <tr>
                                <td>                     
                                <h4>{{invprint[0].projectname}}</h4>
                                </td>
                            </tr>
                            <tr>
                                <td style="text-align: center;">
                                <h4>***********</h4>                       
                                </td>
                            </tr>
                            <tr>
                                <td>
                                <br/>
                                    &nbsp; 1. As per the attendance received for the above period towards deployed at {{invprint[0].projectname}} invoice as follows
                                    <br/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    &nbsp;arrear claim as follows
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <br />
                    <table width="95%" align="center" cellpadding="0" cellspacing="2" border="0">
                        <tbody>
                            <tr>
                                <td valign="top" width="100%">
                                <table style="border-collapse: collapse;" border="1" width="99%" cellspacing="0" cellpadding="0" align="center">
                                    <tbody>
                                        <tr height="30px">
                                            <td align="left" ><strong>&nbsp;Period</strong></td>
                                            <td style="text-align:center" ><strong>&nbsp;No of Person</strong></td>
                                            <td style="text-align:center" ><strong>&nbsp;No Of Duties</strong></td>
                                            <td align="left" ><strong>&nbsp;Revised Rate</strong></td>
                                            <td align="left" ><strong>&nbsp;Already Claimed</strong></td>
                                            <td align="left" ><strong>&nbsp;Old Bill No</strong></td>
                                            <td align="left" ><strong>&nbsp;Difference Amount</strong></td>
                                        </tr>
                                        <tr ng-repeat="l in invprint" >
                                            <td>&nbsp;<span >{{l.StartDate | date : "dd-MM-yyyy"}} to {{l.EndDate | date : "dd-MM-yyyy"}}</span></td>
                                            <td>&nbsp;<span>{{l.jobcode}} - {{l.noofperson}}&nbsp;</span>
                                            <td>&nbsp;<span>{{l.noofduties}}&nbsp;</span>
                                            <td>&nbsp;<span>{{l.revisedrate | number:2}}&nbsp;</span>
                                            <td>&nbsp;<span>{{l.oldrate | number:2}}&nbsp;</span>
                                            <td>&nbsp;<span>{{l.oldinvoiceno}}&nbsp;</span>
                                            <td>&nbsp;<span>{{l.diffamount | number:2}}&nbsp;</span>
                                        </tr>
                                        <tr>
                                            <td> &nbsp; <span> Total </span> </td>
                                            <td> &nbsp; <span> {{invprint[0].totalpersons}} &nbsp; </span> </td>
                                            <td> &nbsp; <span> {{invprint[0].noofdutiess}} &nbsp; </td>
                                            <td> &nbsp; <span> {{invprint[0].revisedrates | number:2}} &nbsp; </span> </td>
                                            <td> &nbsp; <span> {{invprint[0].alreadyclaimed | number:2}} &nbsp; </span> </td>
                                            <td> &nbsp; <span> &nbsp; </span> </td>
                                            <td> &nbsp; <span> {{invprint[0].difference | number:2}} &nbsp; </span> </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table style="border-collapse: collapse;" border="1" width="99%" cellspacing="0" cellpadding="0" align="center">
                                    <tbody>
                                        <tr style="page-break-after:always">
                                            <td style="text-align: center;" colspan="6"><strong>Service Charge on {{invprint[0].servicecharge | number:2}} %</strong></td>
                                            <td style="text-align: right;">{{invprint[0].servicecharges | number:2}} &nbsp;</td>
                                        </tr>
                                        <tr>
                                            <td style="text-align: center;" colspan="6" ><strong>Sub Total Rs</strong></td>
                                            <td style="text-align: right;">{{invprint[0].subtotal  | number:2 }} &nbsp;</td>
                                        </tr>
                                        
                                        <tr>
                                            <td style="text-align: center;" colspan="6"><strong><strong>CGST {{invprint[0].tax/2 | number:2}} %</strong></td>
                                            <td style="text-align: right;">{{invprint[0].taxs/2 | number:2}} &nbsp;</td>
                                        </tr>
                                        <tr>
                                            <td style="text-align: center;" colspan="6"><strong><strong>SGST {{invprint[0].tax/2 | number:2}} %</strong></td>
                                            <td style="text-align: right;">{{invprint[0].taxs/2 | number:2}} &nbsp;</td>
                                        </tr>
                                        <tr>
                                            <td style="text-align: center;" colspan="6"><strong><strong>IGST 0 %</strong></td>
                                            <td style="text-align: right;">{{0 | number:2}} &nbsp;</td>
                                        </tr>
                                        <tr>
                                            <td style="text-align: center;" colspan="6"><strong>Grand Total</strong></td>
                                            <td style="text-align: right;"><strong>Rs. {{invprint[0].totals | number:2}} &nbsp;</strong>
                                            <br>
                                            (or)&nbsp;&nbsp;
                                            <br>
                                            <strong>Rs. {{invprint[0].finaltotal | number:2}} &nbsp;
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table width="98%" align="center" border="0" cellpadding="0" cellspacing="0">
                        <tbody style="text-align: justify;">
                            <tr>
                                <td>
                                <br />
                                <p style="text-decoration: underline;margin-left: 36px;"><srtong>Rupees {{numberinwords}}<strong></p>
                                </td>
                            </tr>
                            
                            <tr>
                                <td>
                                <br />
                                &nbsp; &nbsp; &nbsp; &nbsp; 1. &nbsp;GST has been claimed as per the Central & State GST Act
                                </td>
                            </tr>
                            <tr>
                                <td>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;GST Regn No. 33AAACT2912M1ZG&nbsp; &nbsp; PAN No. AAACT2912M &nbsp; &nbsp; CIN No. U70101TN1986SGC012609  &nbsp; &nbsp; </td>
                            </tr>
                            <tr>
                                <td>
                                <br />
                                &nbsp; &nbsp; &nbsp; &nbsp; 2.&nbsp; The bill may be passed and cheque forwarded at the earliest
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <br />
                    <br />
                    <table width="95%" align="center" cellpadding="0" cellspacing="0">
                        <tr>
                            <td width="60%">
                                <table>
                                <br />
                                <br>
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
                        </tr>
                    </table>
                    </td>
                </tr>
            </tbody>
        </table>
        <table width="97%" align="center" cellpadding="0" cellspacing="0" border="1" style="border-collapse: collapse;page-break-after:always;margin-top:2% !important;">
            <tbody>
                <tr>
                    <td width="100%" align="center">
                    <!-- <table width="99%" align="center" cellpadding="0" cellspacing="0" border="0">
                        <tbody>
                            <tr>
                                <td width="20%" align="center">
                                <img style="height: 50%;margin-top: 5px;" src="<?php echo base_url("assets/images/clientletter.jpg")?>">
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
                    <hr /> -->
                    <table width="95%" align="center" border="0" cellpadding="0" cellspacing="0">
                        <tbody>
                            <tr>
                                <td align="left"><b><h1>Project No:</b>{{invprint[0].projectno}}<h1>
                                </td>
                                <td align="right"><b>Dated On:</b> {{today | date : "dd-MM-yyyy"}}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <br>
                    <table width="95%" align="center" border="0" cellpadding="0" cellspacing="0">
                        <tbody style="text-align: justify;">
                            <tr style="text-align: center;">
                                <td>
                                <br />
                                <strong>ADVANCE RECEIPT</strong>
                                </td>
                            </tr>
                            <tr>
                                <td style="text-align: center;">
                                <br />
                                &nbsp; &nbsp; &nbsp; &nbsp; Received a sum of Rs. <span style="font-size:20px;font-weight: bold;">{{invprint[0].finaltotal | number:2}}</span> <br><strong  style="text-decoration: underline">Rupees {{invprint[0].numberinwords}}</strong> from the {{invoiceprint[0].projectname}} towards the above Job Category service changes for the period from {{invprint[0].startdate | date : "dd-MM-yyyy"}} to {{invprint[0].enddate  | date : "dd-MM-yyyy"}} <br>against the bill no  {{invprint[0].invoiceno}} for personnel deployed at the {{invprint[0].projectname}} 
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
                        </tr>
                    </table>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div><script>
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