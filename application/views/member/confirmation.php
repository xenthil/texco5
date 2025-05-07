<script type="text/javascript"> var base_url = "<?php echo base_url(); ?>"; </script>
<script type="text/javascript"> var atoken = "<?php echo $this->session->usertoken('atoken')?>" ; </script>
<script type="text/javascript"> var api_url = "<?php echo config_item('api_url')?>"</script>
<script type="text/javascript">var jobactivityid = "<?php echo $_GET['jobactivityid'];?>"</script>
<script type="text/javascript">var memberid = "<?php echo $_GET['memberid'];?>"</script>
<script type="text/javascript" src="<?php echo base_url("assets/libs/jquery/3.7.1/jquery.min.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/libs/angular/1.8.2/angular.min.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/app/printpdf.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/angular-sanitize.js")?>"></script>

<style>@page { size: auto;  margin: 1mm; margin-left:3mm;}</style>

<div ng-app="appPrint" ng-controller="ctrlPrint">
    <table style="border-collapse: collapse;" border="1" width="100%" cellspacing="0" cellpadding="0" align="center">
        <tbody>
            <tr>
                <td align="center" width="100%">
                    <table border="0" width="99%" cellspacing="0" cellpadding="0" align="center">
                                        <span style="font-size: medium;">
                                            <br />
                                            TAMILNADU EX-SERVICEMEN CORPORATION LIMITED
                                            <br />
                                            REGISTRATION FOR EXSERVICEMEN
                                            </span>
                    </table>
                    <table style="border-collapse: collapse;" border="1" width="99%" cellspacing="0" cellpadding="1" align="center">
                        <tbody>
                            <tr>
                                <td width="30%">&nbsp;<strong>Registration  No</strong></td>
                                <td colspan="3" width="69%">&nbsp;{{jobprint.registrationno}}</td>
                            </tr>
                            <tr>
                                <td width="30%">&nbsp;<strong>Registration  Date</strong></td>
                                <td colspan="3" width="69%">&nbsp;{{jobprint.effectivedate}}</td>
                            </tr>
                            <tr>
                                <td width="30%">&nbsp;<strong>Service No</strong></td>
                                <td colspan="3" width="69%">&nbsp;{{jobprint.serviceno}}</td>
                            </tr>
                            <tr>
                                <td width="30%"><strong>&nbsp;Rank</strong></td>
                                <td colspan="3" width="69%">&nbsp;{{jobprint.rank}}</td>
                            </tr>
                            <tr>
                                <td width="30%"><strong>&nbsp;Name</strong></td>
                                <td colspan="3" width="69%">&nbsp;{{jobprint.firstname}} {{jobprint.lastname}}</td>
                            </tr>
                            <tr>
                                <td width="30%"><strong>&nbsp;DOB</strong></td>
                                <td colspan="3" width="69%">&nbsp;{{jobprint.dob}}</td>
                            </tr>
                            <tr>
                                <td width="30%"><strong>&nbsp;Father's Name</strong></td>
                                <td colspan="3" width="69%">&nbsp;{{jobprint.fathername}}</td>
                            </tr>
                            <tr>
                                <td width="30%"><strong>&nbsp;Nominee Name & RelationShip</strong></td>
                                <td colspan="3" width="69%">&nbsp;{{jobprint.nominee}} ({{jobprint.nomineerelation}})</td>
                            </tr>
                            <tr>
                                <td width="30%"><strong>&nbsp;Ex ID No</strong></td>
                                <td colspan="3" width="69%">&nbsp;{{jobprint.esmidno}}</td>
                            </tr>
                            <tr>
                                <td width="30%"><strong>&nbsp;Address</strong></td>
                                <td colspan="3" width="69%">&nbsp; 
                                <span ng-hide="jobprint.address ==  null || jobprint.address == ''">{{jobprint.address}},</span>
                                <span ng-hide="jobprint.village ==  null || jobprint.village == ''">{{jobprint.village}},</span>
                                <span ng-hide="jobprint.taluk ==  null || jobprint.taluk == ''">{{jobprint.taluk}},</span> 
                                <span ng-hide="jobprint.district ==  null || jobprint.district == ''">{{jobprint.district}},</span> 
                                <span ng-hide="jobprint.pincode ==  null || jobprint.pincode == ''">{{jobprint.pincode}}</span></td>
                            </tr>
                            <tr>
                                <td width="30%"><strong>&nbsp;Mobile No</strong></td>
                                <td colspan="3" width="69%">&nbsp;{{jobprint.mobile}}</td>
                            </tr>
                            <tr>
                                <td width="30%"><strong>&nbsp;Aadhaar No</strong></td>
                                <td colspan="3" width="69%">&nbsp;{{jobprint.aadhaarno}}</td>
                            </tr>
                            <tr>
                                <td width="30%"><strong>&nbsp;PAN No</strong></td>
                                <td colspan="3" width="69%">&nbsp;{{jobprint.panno}}</td>
                            </tr>
                             <tr>
                                <td width="30%"><strong>&nbsp;Trade / Corps</strong></td>
                                <td colspan="3" width="69%">&nbsp;{{jobprint.trade}} / {{jobprint.corps}}</td>
                            </tr>
                            <!-- <tr>
                                <td width="30%"><strong>&nbsp;Corps</strong></td>
                                <td colspan="3" width="69%">&nbsp;{{jobprint.corps}}</td>
                            </tr> -->
                           <tr>
                                <td width="30%"><strong>&nbsp;Civil Qualification</strong></td>
                                <td colspan="3" width="69%">&nbsp;{{jobprint.civilqual}}</td>
                            </tr>
                            <!-- <tr>
                                <td width="30%"><strong>&nbsp;Army Qualification</strong></td>
                                <td colspan="3" width="69%">&nbsp;{{jobprint.armyqual}}</td>
                            </tr> -->
                            <tr>
                                <td width="30%"><strong>&nbsp;Texco NO</strong></td>
                                <td colspan="3" width="69%">&nbsp;{{jobprint.texcono}}</td>
                            </tr>
                        <!-- <tr>
                                <td width="30%"><strong>&nbsp;DOJ</strong></td>
                                <td colspan="3" width="69%">&nbsp; {{jobprint.joiningdate}}</td>
                            </tr>
                            <tr>
                                <td width="30%"><strong>&nbsp;Last Access</strong></td>
                                <td colspan="3" width="69%">&nbsp; {{jobprint.lastaccess}}</td>
                            </tr>
                            <tr ng-hide="jobprint.lastaccess ==  null || jobprint.lastaccess == ''">
                                <td  width="30%"><strong>&nbsp;Total Experinece</strong></td>
                                <td ng-bind-html="jobprint.experience | nl2br" colspan="3" width="69%">&nbsp;{{jobprint.experience}}</td>
                            </tr>  -->
                            <tr>
                                <td width="30%"><strong>&nbsp;Transfer From</strong></td>
                                <td ng-bind-html="jobprint.history | nl2br" colspan="3" width="69%">&nbsp;{{jobprint.history}}</td>
                            </tr>
                            <tr ng-if="jobprint.isrejected == 1"  width="100%" align="center">
                                <td colspan="2"><strong>MAY BE CLIENT REJECTED / CLOSED PROJECT PERSONNEL</strong></td>
                            </tr>
                        </tbody>
                    </table>
                    <table border="0" width="100%" cellspacing="0" cellpadding="0" align="center">
                        <tbody>
                            <tr>
                                <td width="100%">&nbsp;</td>
                            </tr>
                        </tbody>
                    </table>
                    <table border="0" width="100%" cellspacing="0" cellpadding="0" align="center">
                        <tbody>
                            <tr>
                                <td valign="top" width="100%">
                                    <table style="border-collapse: collapse;" border="1" width="99%" cellspacing="0" cellpadding="0" align="center">
                                        <tbody>
                                            <tr height="30px">
                                                <td align="left" width="5%"><strong>&nbsp;S.No</strong></td>
                                                <td align="left" width="10%"><strong>&nbsp;Region</strong></td>
                                                <td align="left" width="10%"><strong>&nbsp;District</strong></td>
                                                <td align="left" width="8%"><strong>&nbsp;Proj No</strong></td>
                                                <td align="left" width="30%"><strong>&nbsp;Proj Name</strong></td>
                                                <td align="left" width="12%"><strong>&nbsp;Cat</strong></td>
                                                <td align="left" width="12%"><strong>&nbsp;Status </strong></td>
                                            </tr>
                                            <tr ng-repeat="jobs in jobprint.applied" >
                                                <td width="5%">&nbsp;{{jobs.sno}}</td>
                                                <td width="10%">&nbsp;{{jobs.proregion}}</td>
                                                <td width="10%">&nbsp;{{jobs.prodistrict}}&nbsp;</td>
                                                 <td width="8%">&nbsp;{{jobs.projectno}}</td>
                                                <td width="30%">&nbsp;{{jobs.projectname}}</td>
                                                <td width="12%">&nbsp;{{jobs.category}}</td>
                                                <td width="12%">&nbsp;{{jobs.jobstatus}} - {{jobs.currentvacancies}}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr><td>&nbsp;</td></tr>
                            <tr><td>&nbsp;</td></tr>
                            <tr>
                                <td>&nbsp;<strong>The above Informations are correct</strong></td>
                            </tr>
                            <tr>
                                <td>&nbsp;<strong style="float: right;margin-right: 25px !important;">APPLICANT SIGN</strong></td>
                            </tr>
                            <tr><td>&nbsp;</td></tr>
                            <tr>
                                <td>
                                    <table style="border-collapse: collapse;" border="1" width="99%" cellspacing="0" cellpadding="0" align="center">
                                        <tbody>
                                            <tr>
                                                <td colspan="3"><strong>Terms and Conditions</strong></td>
                                            </tr>
                                            <!-- <tr>
                                                <td colspan="3"><strong><u>Note: </u></strong></td>
                                            </tr> -->
                                            <tr width="100%" style="border-bottom: 1px solid transparent;border-right: 1px solid transparent;">
                                                <td align="left" colspan="3">
                                                &nbsp;&nbsp;    1. The following documents are required for verification. Hence, the applicants are requested to bring originals along with Photocopy of the documents:-
                                                <td>
                                            </tr>
                                            <tr>
                                                <td align="left" width="50%">
                                                        <ul>
                                                            <li>(a)  Ex-servicemen ID Card</li>
                                                            <li>(b)  Discharge Book</li>
                                                            <li>(c)  PPO</li>
                                                            <li>(d)  School or college Certificate</li>
                                                        </ul>
                                                    </td>
                                                   <td width="50%">
                                                        <ul>
                                                            <li>(e)  PAN Card</li>
                                                            <li>(f)  Aadhar Card</li>
                                                            <li>(g)  Driving License for Driver Vacancy </li>
                                                            <li>(h)  Two Passport size photo</li>
                                                        </ul>
                                                    </td>
                                            </tr>
                                            <tr style="border-top: 1px solid transparent;">
                                                <td colspan="3" width="100%">
                                                    &nbsp;&nbsp;  2. This receipt shows the seniority of your booking for a particular vacancy.   It shall not confer any right for appointment to that vacancy.   Final orders will be issued at the time of interview, subject to fulfillment of other eligibility criteria
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr><td>&nbsp;</td></tr>
                            <tr>
                                <td>&nbsp;<strong>THE ORIGINAL DOCUMENTS ARE VERIFIED AND FOUND CORRECT</strong></td>
                            </tr>
                            <tr><td>&nbsp;</td></tr>
                            <tr><td>&nbsp;</td></tr>
                            <tr>
                            <td>&nbsp;<strong><span style="width:50%">CLERK 1</span><span style="float: right;margin-right: 25px !important;">CLERK 2</span></strong>&nbsp;</td>
                            </tr>
                            <tr><td>&nbsp;</td></tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>
</div>

<script>
    // $('document').ready(function(){
    //   setTimeout(function(){ window.print(); }, 500);
    // })
</script>
