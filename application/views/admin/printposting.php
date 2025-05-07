<script type="text/javascript"> var base_url = "<?php echo base_url()?>" </script>
<script type="text/javascript"> var api_url = "<?php echo config_item('api_url')?>" </script>
<script type="text/javascript" src="<?php echo base_url("assets/libs/jquery/3.7.1/jquery.min.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/libs/angular/1.8.2/angular.min.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/app/printpdf.js")?>"></script>
<script type="text/javascript">var jobactivityid = "<?php echo $_GET['jobactivityid'];?>"</script>
<script type="text/javascript">var memberid = 0</script>
<script type="text/javascript">var memberhistoryid = "<?php echo $_GET['memberhistoryid'];?>"</script>
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/angular-sanitize.js")?>"></script> 
<style>@page { size: auto;  margin-right: 1mm; margin-top: 2mm; margin-bottom: 1mm; margin-left:3mm; }  
@media print {
    .logo-container,
    .img-wrapper,
    img {
        max-height: none !important;
        height: 120% !important;
    }
}

</style>

<script type="text/javascript"> var atoken = "<?php echo $this->session->usertoken('atoken')?>" ; </script>
<div ng-app="appPrint" ng-controller="ctrlPrint" ng-cloak>
    <table ng-repeat="jobs in jobprint.applied" width="90%" align="center" cellpadding="0" cellspacing="0" style="border-collapse: collapse">
        <tbody>
            <tr>
                <td width="100%" align="center">
                    <table width="99%" align="center" cellpadding="0" cellspacing="0" border="0" style="padding-top: 20px;font-size: 15px;">
                        <tbody>
                            <tr>
                                <td width="20%" align="center">
                                    <img style="height: 35%;" src="<?php echo base_url("assets/images/clientletter.jpg")?>">
                                </td>
                                <td width="100%" align="center">
                                    <p><b>TAMILNADU EX-SERVICEMEN’S CORPORATION LIMITED (TEXCO)</b><br>
                                    <b>(A Government of Tamil Nadu Undertaking)</b><br>
                                    <b>Major Parameswaran Memorial Building,</b><br>
                                    <b>No.2, West Mada Street, Srinagar Colony, Saidapet, Chennai-600 015.</b><br>
                                    <b>Phone: 044-22352947, 22301792, 22301793, 22350900 Fax: 044-22301791</b></p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <hr />
                    <table width="99%" align="center" border="0" cellpadding="0" cellspacing="0">
                        <tbody>
                            <tr>
                                <td><span><b>Lr No:</b>TEXCO/301/{{jobs.projectno}}/Recruitment/Posting Order </span>
                                <span style="float: right;"><b>Dated:</b> {{jobprint.effectivedate}} </span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                <br />
                                    <strong>To:</strong>
                                </td>
                            </tr>
                            <tr ng-hide="jobs.designation == '' || jobs.designation == null">
                                <td style="font-size: 14px;" width="100%">
                                    &nbsp; &nbsp; &nbsp;{{jobs.designation}},
                                </td>
                            </tr>
                             <tr>
                                <td style="font-size: 13px;" width="100%">
                                    &nbsp; &nbsp; &nbsp;<span  ng-hide="jobs.proadd1 == '' || jobs.proadd1 == null" >{{jobs.proadd1}}</span>
                                    <span ng-hide="jobs.proadd2 == '' || jobs.proadd2 == null">, 
                                    <br>&nbsp; &nbsp; &nbsp;{{jobs.proadd2}} </span>
                                    <span ng-hide="jobs.proadd3 == '' || jobs.proadd3 == null">, 
                                    <br>&nbsp; &nbsp; &nbsp;{{jobs.proadd3}} </span> <span ng-hide="jobs.propincode == '' || jobs.propincode == null"> - {{jobs.propincode}} </span>
                                </td>
                            </tr> 
                        </tbody>
                    </table>
                    <table width="99%" align="center" border="0" cellpadding="0" cellspacing="0">
                        <tbody style="text-align: justify;">
                            <tr>
                                <td>
                                 <br />
                                    <strong>Sir,</strong>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                &nbsp; &nbsp; &nbsp; &nbsp; <strong>Sub:</strong>   Texco-Deployment of Ex-Servicemen as per the contractual obligations - Orders filling up the contractual employement vacancies - As Security Guard/Head Security Guard/Assistant Security Officer/Driver/ Junior Assistant
                                <br />
                                <span style="padding-left: 13px;">&nbsp; &nbsp; &nbsp; &nbsp; <strong>Ref:</strong>   The Contract agreement signed by the Ex-Servicemen dated {{jobprint.effectivedate}}</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table width="99%" align="center" cellpadding="0" cellspacing="2" border="0">
                        <tbody style="text-align: justify;">
                            <tr align="left">
                                <td style="text-align: justify;">
                                    <br />
                                    1.  As per the contract entered between the Tamil Nadu Ex-Servicemen Corporation (TEXCO) and the Client department/Corporation/Unit and as per the contractual agreement entered between the Ex-Serviceman (men) and TEXCO the under mentioned Ex-Serviceman (men) is/are hereby directed to report to you for performing the contractual duties stated in the agreement at the project places requested:- 

                                </td>
                            </tr>
                            <tr>
                                <td valign="top" width="100%" style="padding-top: 25px;">
                                    <table style="border-collapse: collapse;" border="1" width="99%" cellspacing="0" cellpadding="0" align="center">
                                        <tbody style="font-size: 14px;">
                                            <tr height="30px">
                                                <td align="left" width="5%"><strong>&nbsp;Reg No</strong></td>
                                                <td align="left" width="12%"><strong>&nbsp;Service No</strong></td>
                                                <td align="left" width="12%"><strong>&nbsp;Texco No</strong></td>
                                                <td align="left" width="5%"><strong>&nbsp;Rank</strong></td>
                                                <td align="left" width="15%"><strong>&nbsp;Name</strong></td>
                                                <td align="left" width="6%"><strong>&nbsp;Category</strong></td>
                                                <td align="left" width="45%"><strong>&nbsp;Project No/Name</strong></td>
                                            </tr>
                                            <tr style="font-size: 14px;">
                                                <td width="5%">&nbsp;{{jobprint.registrationno}}</td>
                                                <td width="5%">&nbsp;{{jobprint.serviceno}}&nbsp;</td>
                                                <td width="5%">&nbsp;{{jobprint.texcono}}</td>
                                                <td width="5%">&nbsp;{{jobprint.rank}}</td>
                                                <td width="15%">&nbsp;{{jobprint.firstname}} {{jobprint.lastname}}</td>
                                                <td  width="10%">&nbsp; 
                                                    <span  ng-show="jobs.category == 'OTHER'" >{{jobprint.othercat}} </span> 
                                                    <span  ng-show="jobs.category != 'OTHER'" >{{jobs.category}} </span> 
                                                </td>
                                                <td width="35%">&nbsp;{{jobs.projectno}}/{{jobs.projectname}}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr ng-hide="jobprint.inplace == '' || jobprint.inplace == null">
                            <td style="padding-top: 20px;">
                                <strong>** INPLACE OF {{jobprint.inplace | uppercase}} </strong>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <table width="99%" align="center" cellpadding="0" cellspacing="2" border="0">
                        <tbody style="text-align: justify;">
                            <tr align="left">
                                <td style="text-align: justify;">
                                    <br>
                                    2. You are requested to intimate the date of joining of the above mentioned Individual(s) to this office and also forward a copy of the same to the concerned Regional Assistant Manager (TEXCO) for information and further follow up.
                                </td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                    <br />

                    <table width="99%" align="center" cellpadding="0" cellspacing="0">
                        <tr>
                            <td width="45%" valign="top">
                                <table align="center" cellpadding="0" cellspacing="0">
                                   &nbsp; <b style="text-decoration: underline;">Copy to:</b>
                                    <tr>
                                        <td width="30%">&nbsp;<b>Assistant Manager, TEXCO</b>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td width="30%">&nbsp;<b>Region:</b> {{jobs.proregion}}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td width="30%">&nbsp;<b>Mobile No:</b> {{jobprint.ammobile}}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td width="30%">&nbsp;<b>Individual No:</b> {{jobprint.mobile}}
                                        </td>
                                    </tr>
                                </table>
                            </td>
                            <td width="50%">
                                <table>
                                    <br />
                                    <br />
                                    <br />
                                    <br />
                                    <tr>
                                        <td width="30%" align="right">
                                            <b>General Manager, TEXCO</b>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                    <br />
                    <table width="99%" cellspacing="0" cellpadding="0" align="center">
                        <tbody>
                            <tr>
                                <td><strong style="text-decoration: underline;">Note:</strong></td>
                            </tr>
                            <tr>
                                <td style="text-align: justify;" align="left">
                                    <span>1. The above-mentioned individual(s) is/are hereby advised to join duty within 03 days from the date of issue of this order. Failing which, this order will be treated as cancelled.
                                    </span>
                                    <br/>
                                    <span>
                                2. After joining the duty within the stipulated time, they will hand over the Joining Report & Bank Accts opening details to the respective, Branch Office of TEXCO. The Branch Office should forward Form-1 with the Joining Report of the individual(s) to Head Office TEXCO for further action.
                                </span>
                                    <br/>
                                    <span>
                                3.  The above-mentioned individual(s) is/are advised to open the SB Account in any IOB branch and mention 15 digit account number in
                                your monthly attendance sheet.
                                </span>
                                    <br/>
                                    <span>
                                4.  The above-mentioned individual(s) is/are advised to open the REPCO RD Account in any REPCO Branch in Tamil Nadu and inform RD Account Number to your Assistant Manager concerned.
                                </span>
                                    <br/>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </td>
            </tr>
        </tbody>
    </table>
</div>
<script>
    $('document').ready(function(){
      // setTimeout(function(){ window.print(); }, 500);
    })
</script>