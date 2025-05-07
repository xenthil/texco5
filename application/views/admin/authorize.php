<script type="text/javascript" src="
   <?php echo base_url("assets/js/app/authorize.js?v=1.0")?>"></script>
<link rel="stylesheet" type="text/css" href="
   <?php echo base_url("assets/css/ng-table.min.css")?>" />
<script type="text/javascript" src="
   <?php echo base_url("assets/js/lib/ng-table.min.js")?>"></script>
<script type="text/javascript" src="
   <?php echo base_url("assets/js/lib/ui-bootstrap-tpls-0.11.0.js")?>"></script>
<script src="<?php echo base_url("assets/js/lib/angular-bootstrap-datepicker.js")?>" charset="utf-8"></script>
<script src="<?php echo base_url("assets/js/lib/underscore.js")?>" charset="utf-8"></script>
<link href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery-ui.css" rel="Stylesheet"
    type="text/css" />
<link href="<?php echo base_url("assets/css/datepicker.css")?>" rel="Stylesheet" type="text/css" />
<script type="text/javascript">
   var clientid = 0;
   var regionid = <?php echo $_SESSION['regionid']; ?> ;
   var roleid = <?php echo $_SESSION['roleid']; ?> ;
</script>
<style> 
   .tabs {
      background-color: #5bacec !important;
   }
   .tabs .tab a {
      color: #FFFFFF !important;
   }
   .tabs .tab a:hover,
   .tabs .tab a.active {
      background-color: transparent !important;
      color: #FFFFFF !important;
   }
   .tabs .indicator {
      background-color: #0460f3 !important;
      height: 3px !important;
   }
</style>
<div class="parallax-container" style="background-color: rgba(0, 12, 78, 0.9)">
    <div class="row">
        <div class="container">
            <div class="col s12 m6 l6">
                <div class="pagebannertext white-text">Authorize</div>
            </div>
            <div class="col s12 m6 l6 right-align">
                <div class="dumheight hide-on-small-only"></div>
                <div class="">
                    <a href="
                <?php echo base_url('admin/dashboard')?>" class="breadcrumb">Home
                    </a><span class="breadcrumb">Employers</span>
                    <span class="breadcrumb">Authorize</span>
                </div>
            </div>
        </div>
    </div>
    <div class="parallax">
        <img src="<?php echo base_url("assets/images/breadcrumbbanner.jpg")?>">
    </div>
</div>
<div class="row" ng-app="pendingatt">
    <div class="container" ng-controller="pendingattctrl">
    <div class="cover-spin"></div>
        <div id="attenancesummarymodal" class="modal modal-fixed-footer">
            <div class="modal-content">
                <nav class="blue" style="position: fixed;margin-top: 0px; z-index:999;">
                    <div class="left col s1 m1 l1">
                        <div class="white-text"><a href=""><i
                                    class="modal-action modal-close mdi white-text mdi-arrow-left"></i></a> </div>
                    </div>
                    <div class="col s11 m11 l11">
                        <div class="li white-text" id="mcaption">Attendance Summary</div>
                    </div>
                </nav>
                <div class="row" style="padding: 61px 0px 0px 25px;width:100%;">
                    <div class="row">
                        <div class="col s12 m8 l8">
                            <h6> Project No/Name - <strong>
                                    {{agreementdetails[0].projectno}}/{{agreementdetails[0].name}} </strong></h6>
                        </div>
                        <div class="col s12 m4 l4">
                            <h6> Attendance For the period - <strong> {{monthandyear}}</strong></h6>
                        </div>

                    </div>
                    <br>
                    <div class="col s8 m8 l8">
                        <div ng-repeat="review in reviewatt">
                            <div class="cat-heading">
                                <div class="col s4 m4 l4"> Category : {{review.code}}</div>
                                <div class="col s4 m4 l4">No of Person:{{review.count}} </div>
                                <div class="col s4 m4 l4">No of Duties:{{review.noofduties}} </div>
                            </div> 
                            <br>
                            <table ng-table="tableParams1" class="responsive-table highlight" show-filter="true">
                                <tr ng-repeat="la in review.details">
                                    <td data-title="'S.No'" ng-class="{'redcolor': la.holdstatus == '1','bluecolor': la.edstatus == '1' && la.holdstatus == '1'}">
                                        {{$index + 1}}</td>
                                    <td style="padding-left:25px" width="30%" data-title="'Name'" ng-class="{'redcolor': la.holdstatus == '1','bluecolor': la.edstatus == '1' && la.holdstatus == '1'}">
                                        {{la.firstname}}</td>
                                    <td style="padding-left:25px" width="12%" data-title="'Texco No'" ng-class="{'redcolor': la.holdstatus == '1','bluecolor': la.edstatus == '1' && la.holdstatus == '1'}">
                                        {{la.texcono}}</td>
                                    <td style="padding-left:25px" width="10%" data-title="'A/C No'" ng-class="{'redcolor': la.holdstatus == '1','bluecolor': la.edstatus == '1' && la.holdstatus == '1'}">
                                        {{la.accountno}}</td>
                                    <td style="padding-left:25px" width="10%" data-title="'No of Duties'" ng-class="{'redcolor': la.holdstatus == '1','bluecolor': la.edstatus == '1' && la.holdstatus == '1'}">
                                        {{la.presentdays}}</td>
                                    <td style="padding-left:25px" width="15%" data-title="'ED Duties'" ng-class="{'redcolor': la.holdstatus == '1','orangecolor': la.edstatus == '1','bluecolor': la.edstatus == '1' && la.holdstatus == '1'}">
                                        <span ng-show="l.code != 'DVR'">{{ la.eddays}}</span>
                                        <span ng-show="l.code == 'DVR'">{{la.othours}} - hrs ({{la.othours / 8}}
                                            days)</span>
                                    </td>
                                    <td style="padding-left:25px" width="10%" data-title="'Total Duties'" ng-class="{'redcolor': la.holdstatus == '1','bluecolor': la.edstatus == '1' && la.holdstatus == '1'}">
                                        {{ la.presentdays + la.eddays }}</td>
                                </tr>
                                <tr>
                                    <td style="text-align: center;padding-left: 228px;" colspan="4">
                                        Total
                                    </td>
                                    <td style="padding-left:25px">
                                        <b><span id="addays">{{review.totalad}}</span></b>
                                    </td>
                                    <td style="padding-left:25px">
                                        <b><span id="eddays">{{review.totaled}}</span></b>
                                    </td>
                                    <td style="padding-left:25px">
                                        <b><span id="ttdays">{{review.noofduties}}</span></b>
                                    </td>
                                </tr>
                            </table>
                            <br>
                        </div>

                        <h5>Total No of Employees - <span id="empcount">{{totalemp}}</span></h5>
                        <h5>Total No of Duties - <span id="adday">{{totalnoofad}}</span> Days</h5>
                        <h5>Total No of ED - <span id="ed1day">{{totalnoofed}}</span> Days</h5>
                        <h5>Total No of Attendance Duty - <span id="tttdays">{{totalnofduties}}</span> Days</h5>
                    </div>

                    <div class="col s4 m4 l4" style="background: #00dff524;padding-right:10px !important;">
                        <table class="agreementdetails">
                            <tr>
                                <td>Name Of Project</td>
                                <td> {{agreementdetails[0].projectno}} - {{agreementdetails[0].name}},{{agreementdetails[0].projectaddress1}},{{agreementdetails[0].projectaddress2}},{{agreementdetails[0].projectaddress3}}
                                </td>
                            </tr>
                            <tr>
                                <td>Agreement Period</td>
                                <td>{{agreementdetails[0].fromdate}} to {{agreementdetails[0].todate}}</td>
                            </tr>
                            <tr>
                                <td>Wage Type / Area </td>
                                <td>{{agreementdetails[0].wagetype}} <span ng-if="agreementdetails[0].wagearea"> / </span> {{agreementdetails[0].wagearea}}</td>
                            </tr>
                            <tr>
                                <td> Wage Year / Category </td>
                                <td> {{agreementdetails[0].wageyear}} / {{agreementdetails[0].categorycode}} - {{agreementdetails[0].ratecategory}}</td>
                            </tr>
                            <tr>
                                <td>Authority Letter of Users</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>No of Persons</td>
                                <td>
                                    <div class="" ng-repeat="l in agreementdetails[0].authcount">
                                        <span>{{l.category}} - {{l.vacancy}}</span></div>
                                </td>
                            </tr>
                            <tr>
                           
                                <td>Rate per induvidual/8 hrs</td>
                                <td>
                                    <div class="ratecount" ng-repeat="l in agreementdetails[0].salaryamount">
                                        <span>{{l.category}}-Rs.{{l.amount}}</span>
                                    </div>
                                </td>
                            </tr>
                            <tr ng-show="agreementdetails[0].allowancevalue1 > 0">
                                <td>{{agreementdetails[0].allowancetype1}}</td>
                                <td>
                                    <div class="ratecount" >
                                        <span>{{agreementdetails[0].allowancevalue1}}</span>
                                    </div>
                                </td>
                            </tr>
                          
                            <tr ng-show="agreementdetails[0].allowancevalue2 > 0">
                                <td>{{agreementdetails[0].allowancetype2}}</td>
                                <td>
                                    <div class="ratecount" >
                                        <span>{{agreementdetails[0].allowancevalue2}}</span>
                                    </div>
                                </td>
                            </tr>

                            <tr ng-show="agreementdetails[0].allowancevalue3 > 0">
                                <td>{{agreementdetails[0].allowancetype3}}</td>
                                <td>
                                    <div class="ratecount" >
                                        <span>{{agreementdetails[0].allowancevalue3}}</span>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>Service Charges</td>
                                <td>{{agreementdetails[0].servicecharge}}</td>
                            </tr>
                            <tr>
                                <td>Goods Service Tax</td>
                                <td>{{agreementdetails[0].tax}}</td>
                            </tr>
                            <tr>
                                <td>Date of next Renewal</td>
                                <td>{{agreementdetails[0].next_renewal_date}}</td>
                            </tr>
                            <tr>
                                <td>Claim to be addressed to</td>
                                <td>{{agreementdetails[0].contactname}},{{agreementdetails[0].clientaddress1}},{{agreementdetails[0].clientaddress2}},{{agreementdetails[0].clientaddress3}}
                                </td>
                            </tr>
                            <tr>
                                <td>Contact No of the Client</td>
                                <td>{{agreementdetails[0].mobile}}/{{agreementdetails[0].phone}}</td>
                            </tr>
                            <tr>
                                <td>Gst No</td>
                                <td>{{agreementdetails[0].gstno}}</td>
                            </tr>

                            <tr>
                                <td>Client Email</td>
                                <td>{{agreementdetails[0].email}}</td>
                            </tr>
                            <tr>
                                <td>Pending details as on date</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Man Power Details</td>
                                <td>
                                    <table>
                                        <tr>
                                            <td>Items</td>
                                            <td>Auth</td>
                                            <td>Posted</td>
                                        </tr>
                                        <tr ng-repeat="m in agreementdetails[0].manpower">
                                            <td>{{m.category}}</td>
                                            <td>{{m.authvacancy}}</td>
                                            <td>{{m.postedvqacacny}}</td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <a href="" class="modal-action modal-close waves-effect btn-flat">Close</a>
            </div>
            </form>
        </div>

        <div id="modalapprove" class="modal modal-fixed-footer" style="max-height:30%;overflow-y: hidden;">
            <div class="modal-content" style="overflow-y: hidden;">
            <nav class="blue" style="position: fixed;margin-top: 0px; z-index:999">
                    <div class="left col s1 m1 l1">
                        <a href=""><i class="modal-action modal-close mdi white-text mdi-arrow-left"></i></a>
                    </div>
                    <div class="col s11 m11 l11">
                        <div class="li white-text" id="mcaption">Autorize Confirmation</div> 
                    </div>
            </nav>
            <div class="row" style="padding: 60px;">
                    <h5> Claim Already Created. Confirm to Create Salary Slip Only?</h5>
            </div>
            </div> 
            <div class="modal-footer">
            <div class="col s12 m12 l12" style="text-align: right;">
                    <a class="waves-effect waves-green btn-flat" type="button" ng-click="authorizesubmit(projectid,monthandyear,clientid,3,billstatus,3,payslipno)" style="float: initial;" ng-disabled="ApprovePayslip">
                        Yes </a> &nbsp;&nbsp;
                    <a class="btn waves-effect waves-light  orange darken-2 modal-action modal-close" type="button" style="float: initial;" ng-disabled="ApprovePayslip">
                        Cancel </a> &nbsp;&nbsp;
                </div>
            </div>
        </div>

        <div id="modalapply" class="modal modal-fixed-footer" style="max-height:90%;overflow-y: hidden;">
            <div class="modal-content" style="overflow-y: hidden;">
                <nav class="blue" style="position: fixed;margin-top: 0px; z-index:999">
                        <div class="left col s1 m1 l1">
                            <a href=""><i class="modal-action modal-close mdi white-text mdi-arrow-left"></i></a>
                        </div>
                        <div class="col s11 m11 l11">
                            <div class="li white-text" id="mcaption">Autorize Confirmation</div> 
                        </div>
                </nav> 
                <div ng-if="ssstatus == 1"> 
                    <div class="row" style="padding: 60px;" ng-if="authorizedcount == workingcount">
                            <h5> Are You Confirm to create Salary slip and claim together?</h5>
                    </div>
                    <div class="row" style="padding: 60px;" ng-if="authorizedcount != workingcount">
                            <h5> Authorized and Posted strength are not matched. </h5>
                            <h5> Are You Confirm to create Salary slip and claim together?</h5>
                    </div> 
                </div> 
                <div ng-if="ssstatus == 8"> 
                    <div class="row" style="padding: 60px;">
                        <h5> Are You Confirm to create Salary slip for ED hold Members?</h5>
                    </div>
                </div>
            </div> 
            <div class="modal-footer">
                <!--  ng-if="authorizedcount == workingcount" -->
                <div class="col s12 m12 l12" style="text-align: right;" ng-if="ssstatus == 1">
                    <a class="waves-effect waves-green btn-flat" type="button" ng-click="authorizesubmit(projectid,monthandyear,clientid,status,billstatus,1,payslipno)" style="float: initial;" ng-disabled="ApprovePayslip">
                        Yes </a> &nbsp;&nbsp;
                    <a class="btn waves-effect waves-light orange darken-2" type="button" ng-click="authorizesubmit(projectid,monthandyear,clientid,status,billstatus,2,payslipno)" style="float: initial;" ng-disabled="ApprovePayslip">
                        No </a> &nbsp;&nbsp;
                </div>
                <div class="col s12 m12 l12" ng-if="ssstatus == 8" style="text-align: right;">
                    <a class="btn waves-effect waves-light  cyan darken-2" type="button" ng-click="authorizesubmit(projectid,monthandyear,clientid,status,billstatus,3,payslipno)" style="float: initial;" ng-disabled="ApprovePayslip">
                        Yes</a> &nbsp;&nbsp;
                    <a class="btn waves-effect waves-light  orange darken-2 modal-action modal-close" type="button" style="float: initial;" ng-disabled="ApprovePayslip">
                        Cancel </a> &nbsp;&nbsp;
                </div> 
            </div>
        </div>

        <div id="modalreject" class="modal modal-fixed-footer" style="max-height:90%;overflow-y: hidden;height:50%;">
            <div class="modal-content" style="overflow-y: hidden;">
            <nav class="blue" style="position: fixed;margin-top: 0px; z-index:999">
                <div class="left col s1 m1 l1">
                    <a href=""><i class="modal-action modal-close mdi white-text mdi-arrow-left"></i></a>
                </div>
                <div class="col s11 m11 l11">
                    <div class="li white-text" id="mcaption">Are You Confirm to reject the attendance?</div> 
                </div>
            </nav>
            <div class="row" style="padding: 60px;">
            <div class="input-field col s12 l12">
                  <input type="text" id="reason" name="reason" class="validate" ng-model="reason" />
                  <label for="reason">Reason for rejection
                  </label>
               </div>

                <h5> </h5>
            </div>
            </div>

            <div class="modal-footer">
                <div class="col s12 m12 l12" style="text-align: right;">
                    <a class="waves-effect waves-green btn-flat" type="button" ng-click="authorizesubmit(projectid,monthandyear,clientid,status,billstatus,1,payslipno,reason)" style="float: initial;" ng-disabled="ApprovePayslip">
                            Yes </a> &nbsp;&nbsp;
                    <a class="btn waves-effect waves-light  orange darken-2 modal-close" type="button" style="float: initial;">
                            No </a> &nbsp;&nbsp;
                </div>
            </div>
        </div>

        <div id="modalrejectsup" class="modal modal-fixed-footer" style="max-height:90%;overflow-y: hidden;height:50%;">
            <div class="modal-content" style="overflow-y: hidden;">
            <nav class="blue" style="position: fixed;margin-top: 0px; z-index:999">
                <div class="left col s1 m1 l1">
                    <a href=""><i class="modal-action modal-close mdi white-text mdi-arrow-left"></i></a>
                </div>
                <div class="col s11 m11 l11">
                    <div class="li white-text" id="mcaption">Are You Confirm to reject the process?</div> 
                </div>
            </nav>
            <div class="row" style="padding: 60px;">
            <div class="input-field col s12 l12">
                  <input type="text" id="reason" name="reason" class="validate" ng-model="reason" />
                  <label for="reason">Reason for rejection
                  </label>
               </div>

                <h5> </h5>
            </div>
            </div>

            <div class="modal-footer">
                <div class="col s12 m12 l12" style="text-align: right;">
                    <a class="waves-effect waves-green btn-flat" type="button" ng-click="rejectsubmit('7',reason)" style="float: initial;" >
                            Yes </a> &nbsp;&nbsp;
                    <a class="btn waves-effect waves-light  orange darken-2 modal-close" type="button" style="float: initial;">
                            No </a> &nbsp;&nbsp;
                </div>
            </div>
        </div>

        <div id="membersmodal" class="modal modal-fixed-footer">
            <div class="modal-content">
                <nav class="blue" style="position: fixed;margin-top: 0px; z-index:999;">
                    <div class="left col s1 m1 l1">
                        <div class="white-text"><a href=""><i
                                    class="modal-action modal-close mdi white-text mdi-arrow-left"></i></a> </div>
                    </div>
                    <div class="col s11 m11 l11">
                        <div class="li white-text" id="mcaption">Member List</div>
                    </div>
                </nav>
                <div class="row" style="padding: 60px;width:100%;">
                    <div class="row">
                        <table>
                            <tr>
                                <th style="text-align: center;">S.No</th>
                                <th style="text-align: center;">Texco No</th>
                                <th style="text-align: center;">MonthandYear</th>
                                <th style="text-align: center;">First Name</th>
                                <th style="text-align: center;">Account No</th>
                                <th style="text-align: center;">Net Pay</th>
                            </tr>
                            <tr ng-repeat="l in viewmembers">
                                <td>{{$index + 1}}</td>
                                <td>{{l.texcono}}</td>
                                <td>{{l.monthandyear}}</td>
                                <td>{{l.firstname}}</td>
                                <td>{{l.accountno}}</td>
                                <td>{{l.netpay}}</td>
                            </tr>
                        </table>

                    </div>


                </div>

            </div>


            <div class="modal-footer">

                <a href="" class="modal-action modal-close waves-effect btn-flat ">Close</a>
            </div>
            </form>
        </div>

        <div ng-if="roleid == '4' || roleid == '6'">
            <div class="input-field col m3 s6">
                <input name="month_year" id="date1" class="date1" type="text" ng-model="objattendance.fromdate" autocomplete="off" />
                <label for="startdate">Start Date </label>
            </div>

            <div class="input-field col m3 s6">
                <input name="month_year" id="date1" class="date1" type="text" ng-model="objattendance.todate" autocomplete="off" />
                <label for="enddate">End Date </label>
            </div>
            <div class="input-field col m3 s6">
                <select id="region" name="region" class="validate"
                    ng-class="{'submitted': submitted && attendanceform.projectno.$invalid}"
                    ng-model="objattendance.regionid" data-ng-options=" r.lkvalid as r.description for r in region" ng-required="true">
                    <option value="">All</option>
                </select>
                <label for="projectno">Region</label>
            </div>
            <div class="input-field col m3 s6">

                <button class="btn waves-effect waves-light  cyan darken-2" type="submit"
                    ng-click="authorisepayslip(objattendance)" ng-disabled="isDisabled">Submit</button>

            </div>
        </div>

        <div id="" class="section" ng-if="roleid == '4'">
            <div class="col s12">
                <ul class="tabs">
                    <li class="tab col s4"><a ng-click="resetproj()" class="active" id="spending"
                            href="#sup-details-pending">Pending</a></li>
                    <li class="tab col s4"><a ng-click="resetproj()" id="sApproved"
                            href="#sup-details-Approved">Approved</a></li>
                    <li class="tab col s4"><a ng-click="resetproj()" id="sHold" href="#sup-details-Hold"> Rejected </a></li>
                </ul>
            </div>
            <div id="sup-details-pending" class="col s12">
                <div id="scrollable-area">
                    <table ng-table="firstTableParamsub" class="table fixedheadertable" show-filter="true" fixed-table-headers="scrollable-area">
                        <tr ng-repeat="applied in $data" class="{{applied.agtype}}">
                            <div class="test">
                            <td width="5%" data-title="'S.No'">{{$index + 1}}</td>
                            <td width="20%" data-title="'Project No / Name'" filter="{projectno: 'text'}">{{applied.projectno}} / {{applied.projectname}}</td>
                            <td width="15%" data-title="'Month & Year'" filter="{monthandyear: 'text'}"
                                sortable="'monthandyear'">{{applied.monthandyear}}</td>
                            <td width="10%" data-title="'Bill Type'" filter="{billtype: 'text'}" sortable="'billtype'"><span
                                    ng-show="applied.bill_type==1">Arrear</span><span
                                    ng-show="applied.bill_type==0">Salary</span></td>
                            <td width="10%" data-title="'Duties'" filter="{totalduties: 'text'}" sortable="'totalduties'">
                                <span
                                    ng-repeat="duties in applied.duties">{{duties.category}} - {{duties.totalduties+duties.eddays}}<br /></span>
                            </td>  
                            <td width="10%" data-title="'Attendence Review'">
                                <a ng-click="reviewattendance(applied.monthandyear,applied.clientid,applied.projectid,1)"
                                    target="_blank" style="cursor:pointer;"  ng-show="applied.status == 1 || applied.status == 2"><i class="material-icons">visibility</i></a>

                                <a ng-click="reviewattendance(applied.monthandyear,applied.clientid,applied.projectid,8)"
                                    target="_blank" style="cursor:pointer;"  ng-show="applied.status == 8"><i class="material-icons">visibility</i></a>
                            </td>
                            <td width="10%" data-title="'Invoice'">
                                <div ng-show="applied.status > 2">
                                    <a href="<?php echo base_url('admin/printinvoice?invoiceno={{applied.invoiceno}}')?>"
                                        target="_blank"><i class="material-icons">print</i></a>
                                </div>
                                <span ng-show="applied.status == 1 || applied.status == 2" style="color:red;">
                                    Pending
                                </span>
                            </td>
                            <td width="10%" data-title="'Pay Slip'">
                                <div ng-show="applied.status > 1 && applied.status != 8">
                                    <a target="_blank"
                                        href="<?php echo base_url('admin/printpayslip?projectid={{applied.projectid}}&monthandyear={{applied.monthandyear}}&payslipno={{applied.payslipno}}')?>"
                                        class="btn-floating btn-small">
                                        <i class="material-icons">print</i>
                                    </a>
                                    <a target="_blank"
                                        href="<?php echo base_url('admin/printfund?projectid={{applied.projectid}}&monthandyear={{applied.monthandyear}}&payslipno={{applied.payslipno}}')?>"
                                        class="btn-floating btn-small blue" style="cursor:pointer;">
                                        <i class="material-icons">visibility</i>
                                    </a>
                                </div> 
                                <span ng-show="applied.status == 1 || applied.status == 8" style="color:red;">
                                    Pending
                                </span>
                            </td>
                            <td width="10%" data-title="'Authorize'">
                                <span ng-show="applied.status == 1">
                                    <a class="btn-floating btn-small blue"
                                        ng-click="authorize(applied.projectid,applied.monthandyear,applied.clientid,2,applied.bill_type,applied.status,applied.payslipno)">
                                        <i class="material-icons">done</i>
                                    </a>
                                    <a class="btn-floating btn-small red"
                                        ng-click="authorize(applied.projectid, applied.monthandyear,applied.clientid,0,applied.bill_type,applied.status,applied.payslipno)">
                                        <i class="material-icons">not_interested</i>
                                    </a>
                                </span>
                                <span ng-show="applied.status == 8">
                                    <a class="btn-floating btn-small blue"
                                        ng-click="authorize(applied.projectid,applied.monthandyear,applied.clientid,8,applied.bill_type,applied.status,applied.payslipno)">
                                        <i class="material-icons">done</i>
                                    </a>
                                    <a class="btn-floating btn-small red"
                                        ng-click="authorize(applied.projectid, applied.monthandyear,applied.clientid,0,applied.bill_type,applied.status,applied.payslipno)">
                                        <i class="material-icons">not_interested</i>
                                    </a>
                                </span>
                                <span ng-show="applied.status == 2">
                                    <a href="#"
                                        ng-click="generateInvoice(applied.projectid,applied.monthandyear,applied.clientid,2,applied.bill_type)">Generate Claim</a>
                                </span>
                                <span ng-show="applied.status > 2  && applied.status != 8">
                                    {{applied.currentstatus}}
                                </span>
                            </td>
                            </div>
                        </tr>
                    </table>
                </div>
            </div>
            <div id="sup-details-Approved" class="col s12">
                <div id="scrollable-area">
                    <table ng-table="SecondTableParamsub" class="table fixedheadertable" show-filter="true" fixed-table-headers="scrollable-area">
                        <tr ng-repeat="applied in $data">
                            <td width="5%" data-title="'S.No'">{{$index + 1}}</td>
                            <td width="20%" data-title="'Project No / Name'" filter="{projectno: 'text'}">{{applied.projectno}} / {{applied.projectname}}</td>
                            <td width="15%" data-title="'Month & Year'" filter="{monthandyear: 'text'}"
                                sortable="'monthandyear'">{{applied.monthandyear}}</td>
                            <td width="15%" data-title="'Bill Type'" filter="{billtype: 'text'}" sortable="'billtype'"><span
                                    ng-show="applied.bill_type==1">Arrear</span><span
                                    ng-show="applied.bill_type==0">Salary</span></td>
                            <td width="10%" data-title="'Duties'" filter="{totalduties: 'text'}" sortable="'totalduties'">
                                <span
                                    ng-repeat="duties in applied.duties">{{duties.category}}-{{duties.totalduties+duties.eddays}}<br /></span>
                            </td>

                            <td width="10%" data-title="'Attendence Review'">
                                <a ng-click="reviewattendance(applied.monthandyear,applied.clientid,applied.projectid,2)"
                                    target="_blank" style="cursor:pointer;"><i class="material-icons">visibility</i></a>
                            </td>

                            <td width="10%" data-title="'Invoice'">
                                <div ng-show="applied.status > 2">
                                    <span ng-show="applied.bill_type==0">
                                        <a href="<?php echo base_url('admin/printinvoice?invoiceno={{applied.invoiceno}}')?>"
                                            target="_blank"><i class="material-icons">print</i></a>
                                    </span>
                                    <span ng-show="applied.bill_type==1">
                                        <a href="<?php echo base_url('admin/printclaiminvoice?invoiceno={{applied.invoiceno}}')?>"
                                            target="_blank"><i class="material-icons">print</i></a>
                                    </span>
                                </div>
                                <div ng-show="applied.status == 1 || applied.status == 2" style="color:red;">
                                    Pending
                                </div>
                            </td>
                            <td width="10%" data-title="'Pay Slip'">
                                <div ng-show="applied.status > 1">
                                    <span ng-show="applied.bill_type==0">
                                        <a target="_blank"
                                            href="<?php echo base_url('admin/printpayslip?projectid={{applied.projectid}}&monthandyear={{applied.monthandyear}}&payslipno={{applied.payslipno}}')?>" class="btn-floating btn-small">
                                            <i class="material-icons">print</i>
                                        </a> 
                                        <a target="_blank"
                                        href="<?php echo base_url('admin/printfund?projectid={{applied.projectid}}&monthandyear={{applied.monthandyear}}&payslipno={{applied.payslipno}}')?>" class="btn-floating btn-small blue">
                                        <i class="material-icons" style="cursor:pointer;">visibility</i>
                                        </a>
                                    </span>
                                    <span ng-show="applied.bill_type==1">
                                        <a target="_blank"
                                            href="<?php echo base_url('admin/printclaimpayslip?projectid={{applied.projectid}}&monthandyear={{applied.monthandyear}}&payslipno={{applied.payslipno}}')?>" class="btn-floating btn-small">
                                            <i class="material-icons">print</i>
                                        </a> 
                                        <a target="_blank"
                                        href="<?php echo base_url('admin/printarrearfund?projectid={{applied.projectid}}&monthandyear={{applied.monthandyear}}&payslipno={{applied.payslipno}}')?>" class="btn-floating btn-small blue">
                                        <i class="material-icons" style="cursor:pointer;">visibility</i>
                                    </a>
                                    </span>
                                </div>
                                <div ng-show="applied.status == 1" style="color:red;">
                                    Pending
                                </div>
                            </td>
                            <td width="10%" data-title="'Authorize'">
                                <span ng-show="applied.status == 1">
                                    <a class="btn-floating btn-small blue"
                                        ng-click="authorize(applied.projectid,applied.monthandyear,applied.clientid,2,applied.payslipno)">
                                        <i class="material-icons">done</i>
                                    </a>
                                    <a class="btn-floating btn-small red"
                                        ng-click="authorize(applied.projectid, applied.monthandyear,applied.clientid,0,applied.payslipno)">
                                        <i class="material-icons">not_interested</i>
                                    </a>
                                </span>
                                <span ng-show="applied.status == 2">
                                    <a href="#"
                                        ng-click="generateInvoice(applied.projectid,applied.monthandyear,applied.clientid,2,applied.bill_type)">Generate Claim</a>
                                </span>
                                <span ng-show="applied.status > 2">
                                    {{applied.currentstatus}}
                                </span>
                            </td>


                            <td width="10%" data-title="'Reject'">
                                <span ng-show="applied.status == 3">
                                   
                                    <a class="btn-floating btn-small red"
                                        ng-click="rejectSupervisor(applied,$data)">
                                        <i class="material-icons">not_interested</i>
                                    </a>
                                </span>
                               
                            </td>

                        </tr>
                    </table>
                </div>
            </div>
            <div id="sup-details-Hold" class="col s12">
                <div id="scrollable-area">
                    <table ng-table="ThirdTableParamsub" class="table fixedheadertable" show-filter="true" fixed-table-headers="scrollable-area">
                        <tr ng-repeat="applied in $data">
                            <td width="5%" data-title="'S.No'">{{$index + 1}}</td>
                            <td width="30%" data-title="'Project No / Name'" filter="{projectno: 'text'}">
                                {{applied.projectno}} / {{applied.projectname}}
                            </td>
                            <td width="12%" data-title="'Month & Year'" filter="{monthandyear: 'text'}"
                                sortable="'monthandyear'">{{applied.monthandyear}}</td>
                            <td width="13%" data-title="'Duties'" filter="{totalduties: 'text'}" sortable="'totalduties'">
                                <span ng-repeat="duties in applied.duties">{{duties.category}}-{{duties.totalduties+duties.eddays}}<br /></span>
                            </td>
                            <td width="15%" data-title="'Attendence Review'">
                                <a ng-click="reviewattendance(applied.monthandyear,applied.clientid,applied.projectid,2)" target="_blank" style="cursor:pointer;">
                                    <i class="material-icons">visibility</i>
                                </a>
                            </td>
                            <!-- <td width="10%" data-title="'Invoice'">
                                <div ng-show="applied.status > 2 || applied.arrearstatus > 1">
                                    <a href="<?php echo base_url('admin/printinvoice?invoiceno={{applied.invoiceno}}')?>"
                                        target="_blank"><i class="material-icons">print</i></a>
                                </div>
                                <div ng-show="applied.status == 1 || applied.status == 2" style="color:red;">
                                    Pending
                                </div>
                            </td>
                            <td width="10%" data-title="'Pay Slip'">
                                <div ng-show="applied.status > 1">
                                    <a target="_blank"
                                        href="
                            <?php echo base_url('admin/printpayslip?projectid={{applied.projectid}}&monthandyear={{applied.monthandyear}}&payslipno={{applied.payslipno}}')?>"
                                        class="btn-floating btn-small">
                                        <i class="material-icons">print</i>
                                    </a>
                                    <a target="_blank"
                                        href="
                            <?php echo base_url('admin/printfund?projectid={{applied.projectid}}&monthandyear={{applied.monthandyear}}&payslipno={{applied.payslipno}}')?>"
                                        class="btn-floating btn-small blue" style="cursor:pointer;">
                                        <i class="material-icons">visibility</i>
                                    </a>
                                </div>
                                <div ng-show="applied.status == 1" style="color:red;">
                                    Pending
                                </div>
                            </td> -->
                            <td width="10%" data-title="'Authorize'">
                                <span ng-show="applied.status==1">
                                    <a class="btn-floating btn-small blue"
                                        ng-click="authorize(applied.projectid,applied.monthandyear,applied.clientid,2,applied.bill_type,applied.payslipno)">
                                        <i class="material-icons">done</i>
                                    </a>
                                    <a class="btn-floating btn-small red"
                                        ng-click="authorize(applied.projectid, applied.monthandyear,applied.clientid,0,applied.bill_type,applied.payslipno)">
                                        <i class="material-icons">not_interested</i>
                                    </a>
                                </span>
                                <span ng-show="applied.status == 2">
                                    <a href="#"
                                        ng-click="generateInvoice(applied.projectid,applied.monthandyear,applied.clientid,2,applied.bill_type)">Generate Claim</a>
                                </span>
                                <span ng-show="applied.status > 2">
                                    {{applied.currentstatus}}
                                </span>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div> 

        <div id="" class="section" ng-if="roleid == '6'">
            <div class="col s12">
                <ul class="tabs">
                    <li class="tab col s4"><a ng-click="resetprojcashier()" class="active" id="pending"
                            href="#cashier-details-pending">Pending</a></li>
                    <li class="tab col s4"><a ng-click="resetprojcashier()" id="Approved"
                            href="#cashier-details-Approved">Approved</a></li>
                    <li class="tab col s4"><a ng-click="resetprojcashier()" id="Hold" href="#cashier-details-Hold">Hold / Rejected</a>
                    </li>
                </ul>
            </div>
            <div id="cashier-details-pending" class="col s12">
                <div id="scrollable-area">
                    <table ng-table="firstTableParams" class="table fixedheadertable" show-filter="true" fixed-table-headers="scrollable-area">
                        <tr ng-repeat="applied in $data">
                            <td style="text-align: left" width="3%">
                                <input type="checkbox" class="filled-in" id="ishold_{{$index + 1}}"
                                    name="ishold_{{$index + 1}}" ng-checked="applied.ishold"
                                    ng-model="applied.ischecked" ng-change="selectEntity(applied)" />
                                <label for="ishold_{{$index + 1}}" data-error="Required"></label>
                            </td>
                            <td width="3%" data-title="'S.No'">{{$index + 1}}</td>
                            <td width="20%" data-title="'Project No / Name'"  filter="{projectno: 'text'}" >
                            {{applied.projectno}} / {{applied.projectname}}
                            </td>
                            <td width="11%" data-title="'Month & Year'" sortable="'monthandyear'"  filter="{monthandyear: 'text'}">{{applied.monthandyear}}</td>
                            <td width="11%" data-title="'Members'" sortable="'memberscont'">{{applied.memberscount}}</td>
                            <td width="11%" data-title="'Net Salary'" sortable="'netsalary'">
                                {{applied.netsalary}}</td>
                            <td width="9%" data-title="'Payslip'" sortable="'payslipno'">
                                <a href="<?php echo base_url('admin/printpayslip?projectid={{applied.projectid}}&monthandyear={{applied.monthandyear}}&payslipno={{applied.payslipno}}')?>"
                                    target="_blank">{{applied.payslipno}}</a>
                            </td> 
                            <td width="8%" data-title="'View'">
                                <a ng-click="viewmemberslist(applied.members)" target="_blank" style="cursor:pointer;">View</a>
                            </td>
                            <td width="8%" data-title="'Invoice'">
                                <div ng-show="applied.status > 2">
                                    <a href="<?php echo base_url('admin/printinvoice?invoiceno={{applied.invoiceno}}')?>"
                                        target="_blank">{{applied.invoiceno}}</a>
                                </div>
                            </td>
                            <td width="8%" data-title="'PF'">
                                <div ng-show="applied.status > 1">
                                    <a target="_blank"
                                        href="<?php echo base_url('admin/printfund?projectid={{applied.projectid}}&monthandyear={{applied.monthandyear}}&payslipno={{applied.payslipno}}')?>">PF
                                    </a>
                                </div>
                            </td>
                            <td width="8%" data-title="'Status'">
                            <span ng-show="applied.status > 1" class="redcolor"> {{applied.currentstatus}} </span>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="input-field col m3 s6" ng-show="passshow == 1">
                    <input ng-model="passordernumbers" />
                </div>
                <div class="input-field col m3 s6" ng-show="passshow == 1">
                    <button class="btn waves-effect waves-light  cyan darken-2" type="submit"
                        ng-click="proceedpay('4',passordernumbers)" ng-disabled="isDisabled">Proceed</button>
                    <button class="btn waves-effect waves-light  red darken-2" type="submit" ng-click="cancelpay()"
                        ng-disabled="isDisabled">Cancel</button>
                </div>
                <br>

                <div class="input-field col m3 s6" ng-show="rejshow == 1">
                    <input type="text" ng-model="rejectreason"  name="reason"  />
                    <label for="reason">Reason for rejection
                  </label>
                </div>

               
                <div class="input-field col m3 s6" ng-show="rejshow == 1">
                    <button class="btn waves-effect waves-light  cyan darken-2" type="submit"
                        ng-click="proceedpay('7','0',rejectreason)" ng-disabled="isDisabled">Proceed</button>
                    <button class="btn waves-effect waves-light  red darken-2" type="submit" ng-click="cancelpay()"
                        ng-disabled="isDisabled">Cancel</button>
                </div>
            
                <div ng-show="selectedproj.length > 0 && passshow == 0 && rejshow == 0">
                    <button class="btn waves-effect waves-light  cyan darken-2" type="submit" ng-click="accept()"
                        ng-disabled="isDisabled">Approve</button>
                    <button class="btn waves-effect waves-light  grey darken-2" type="submit"
                        ng-click="proceedpay('5','0')" ng-disabled="isDisabled">Hold</button>
                    <button class="btn waves-effect waves-light  red darken-2" type="submit"
                        ng-click="rejectcash()" ng-disabled="isDisabled">Reject</button>
                </div>
            </div>
            <div id="cashier-details-Approved" class="col s12">
                <div id="scrollable-area">
                    <table ng-table="tableParams2" class="table fixedheadertable" show-filter="true" fixed-table-headers="scrollable-area">
                        <tr ng-repeat="applied in $data">
                            <td width="3%" data-title="'S.No'">{{$index + 1}}</td>
                            <td width="20%" data-title="'Project No / Name'" filter="{projectno: 'text'}"> 
                            {{applied.projectno}} / {{applied.projectname}}
                            </td>
                            <td width="10%" data-title="'Month & Year'" sortable="'monthandyear'"  filter="{monthandyear: 'text'}">{{applied.monthandyear}}</td>
                            <td width="10%" data-title="'Members'" sortable="'memberscont'">{{applied.memberscount}}</td>
                            <td width="9%" data-title="'Net Salary'" sortable="'netsalary'">
                                {{applied.netsalary}}</td>
                            <td width="8%" data-title="'Payslip'" sortable="'payslipno'">
                            <span ng-show="applied.bill_type==0">
                                <a href="<?php echo base_url('admin/printpayslip?projectid={{applied.projectid}}&monthandyear={{applied.monthandyear}}&payslipno={{applied.payslipno}}')?>"
                                    target="_blank">{{applied.payslipno}}</a>
                              </span>
                              <span ng-show="applied.bill_type==1">
                                <a href="<?php echo base_url('admin/printclaimpayslip?projectid={{applied.projectid}}&monthandyear={{applied.monthandyear}}&payslipno={{applied.payslipno}}')?>"
                                    target="_blank">{{applied.payslipno}}</a>
                              </span>
                            </td>
                            <td width="8%" data-title="'View'">
                                <a ng-click="viewmemberslist(applied.members)" target="_blank" style="cursor:pointer;">View</a>
                            </td>
                            <td width="8%" data-title="'Bank Slip'">
                                <a ng-click="downloadbankslip(applied.passorderno,baseurl)"
                                    target="_blank" style="cursor:pointer;">{{applied.passorderno}}</a>
                            </td>
                            <td width="8%" data-title="'Invoice'">
                                <div ng-show="applied.status>2">
                                <span ng-show="applied.bill_type==0">
                                        <a href="<?php echo base_url('admin/printinvoice?invoiceno={{applied.invoiceno}}')?>"
                                            target="_blank"><i class="material-icons">print</i></a>
                                    </span>
                                    <span ng-show="applied.bill_type==1">
                                        <a href="<?php echo base_url('admin/printclaiminvoice?invoiceno={{applied.invoiceno}}')?>"
                                            target="_blank"><i class="material-icons">print</i></a>
                                    </span>
                                </div>

                               
                            </td>
                            <td width="8%" data-title="'PF'">
                                <div ng-show="applied.status>1">
                                    <a target="_blank"
                                        href="
                            <?php echo base_url('admin/printfund?projectid={{applied.projectid}}&monthandyear={{applied.monthandyear}}&payslipno={{applied.payslipno}}')?>">
                                        PF
                                    </a>
                                </div>
                            </td>
                            <td width="8%" data-title="'Status'">
                            <span ng-show="applied.status > 1" class="redcolor"> {{applied.currentstatus}} </span>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            <div id="cashier-details-Hold" class="col s12">
                <div id="scrollable-area">
                    <table ng-table="tableParams3" class="table fixedheadertable" show-filter="true" fixed-table-headers="scrollable-area">
                        <tr ng-repeat="applied in $data">
                            <td style="text-align: left" width="2%" data-title="'Hold'"
                                header="'ng-table/headers/checkbox.html'">
                                <div ng-show="applied.status == 5 && applied.inv_cashier_rejected == 1">
                                    <input type="checkbox" class="filled-in" id="isholdd_{{$index + 1}}"
                                    name="isholdd_{{$index + 1}}" ng-checked="applied.ishold"
                                    ng-model="applied.ischecked" ng-change="selectEntity(applied)" />
                                    <label for="isholdd_{{$index + 1}}" data-error="Required"></label>
                                </div>
                            </td>
                            <td width="3%" data-title="'S.No'">{{$index + 1}}</td>
                            <td width="23%" data-title="'Project No / Name'" sortable="'projectno'" filter="{projectno: 'text'}">
                            {{applied.projectno}} / {{applied.projectname}}
                            </td>
                            <td width="10%" data-title="'Month & Year'" sortable="'monthandyear'" filter="{monthandyear: 'text'}">
                            {{applied.monthandyear}}
                            </td>
                            <td width="10%" data-title="'Members'" sortable="'memberscont'">
                            {{applied.memberscount}}
                            </td>
                            <td width="10%" data-title="'Net Salary'" sortable="'netsalary'">
                                {{applied.netsalary}}
                            </td>
                            <td width="10%" data-title="'Payslip'" sortable="'payslipno'">
                                <a href="<?php echo base_url('admin/printpayslip?projectid={{applied.projectid}}&monthandyear={{applied.monthandyear}}&payslipno={{applied.payslipno}}')?>"
                                    target="_blank">{{applied.payslipno}}</a>
                            </td>
                            <td width="8%" data-title="'View'">
                                <a ng-click="viewmemberslist(applied.members)" target="_blank" style="cursor:pointer;">View</a>
                            </td>
                            <td width="8%" data-title="'Invoice'">
                                <div ng-show="applied.status > 2">
                                    <a href="<?php echo base_url('admin/printinvoice?invoiceno={{applied.invoiceno}}')?>"
                                        target="_blank">{{applied.invoiceno}}</a>
                                </div>
                            </td>
                            <td width="8%" data-title="'PF'">
                                <div ng-show="applied.status > 1">
                                    <a target="_blank" href="<?php echo base_url('admin/printfund?projectid={{applied.projectid}}&monthandyear={{applied.monthandyear}}&payslipno={{applied.payslipno}}')?>">PF</a>
                                </div>
                            </td>
                            <td width="8%" data-title="'Status'">
                            <span ng-show="applied.status > 1" class="redcolor"> {{applied.currentstatus}} </span>
                            </td>
                        </tr>
                    </table>
                </div>
                <br>
                <div class="input-field col m3 s6" ng-show="passshow == 1">
                    <input ng-model="passordernumbers" />
                </div>
                <div class="input-field col m3 s6" ng-show="passshow == 1">
                    <button class="btn waves-effect waves-light  cyan darken-2" type="submit"
                        ng-click="proceedpay('4',passordernumbers)" ng-disabled="isDisabled">Proceed</button>
                    <button class="btn waves-effect waves-light  red darken-2" type="submit" ng-click="cancelpay()"
                        ng-disabled="isDisabled">Cancel</button>
                </div>


                <div class="input-field col m3 s6" ng-show="rejshow == 1">
                    <input type="text" ng-model="rejectreason"  name="reason"  />
                    <label for="reason">Reason for rejection
                  </label>
                </div>
                <div class="input-field col m3 s6" ng-show="rejshow == 1">
                    <button class="btn waves-effect waves-light  cyan darken-2" type="submit"
                        ng-click="proceedpay('7','0',rejectreason)" ng-disabled="isDisabled">Proceed</button>
                    <button class="btn waves-effect waves-light  red darken-2" type="submit" ng-click="cancelpay()"
                        ng-disabled="isDisabled">Cancel</button>
                </div>

                <div ng-show="selectedproj.length > 0 && passshow == 0 && rejshow == 0">
                    <button class="btn waves-effect waves-light  cyan darken-2" type="submit" ng-click="accept()"
                        ng-disabled="isDisabled">Approve</button>
                    <button class="btn waves-effect waves-light  red darken-2" type="submit"
                        ng-click="rejectcash()" ng-disabled="isDisabled">Reject</button>
                </div>
            </div>
        </div>

        <div ng-if="roleid == 7">
            <br>
            <div class="input-field col m3 s6">
                <input name="month_year" id="date1" class="date1" type="text" ng-model="objattendance.fromdate"
                    ng-change="getPassOrderNumber(objattendance.fromdate,objattendance.todate)" autocomplete="off" />
                <label for="startdate">Start Date </label>
            </div>
            <div class="input-field col m3 s6">
                <input name="month_year" id="date1" class="date1" type="text" ng-model="objattendance.todate"
                    ng-change="getPassOrderNumber(objattendance.fromdate,objattendance.todate)" autocomplete="off" />
                <label for="enddate">End Date </label>
            </div>
            <!-- <div class="input-field col m3 s6">
                <input name="month_year" id="date1" class="date1" type="text" ng-model="objattendance.fromdate"
                    ng-change="getPassOrderNumber(objattendance.fromdate)" autocomplete="off" />
                <label for="startdate" style="margin-top: 10px !important;" class="startdatecao"><h6><strong> Select Date </strong></h6></label>
            </div> -->
            <div class="input-field col m3 s6" ng-show="viewdata">
                <select id="region" name="region" class="validate" ng-model="passordersno" ng-change="getpassdetails(passordersno)" ng-required="true">
                    <option ng-repeat="pass in passorders" ng-class="{greencolor: pass.invoicestatus == '6'  && pass.status=='6'}" value="{{pass.bankslipid}}">
                        {{pass.passorderno}}
                    </option>  
                </select>
                <label for="region" style="margin-top: -8px !important;"><h6><strong> Pass Order Number </strong></h6></label>
                <br>
            </div>
        </div>
        <div id="" class="section" ng-if="roleid == '7'">
            <div class="col s12">
                <ul class="tabs">
                    <li class="tab col s4"><a ng-click="resetprojcao()" class="active" id="pending"
                            href="#cao-details-pending">Pending</a></li>
                    <li class="tab col s4"><a ng-click="resetprojcao()" id="Approved"
                            href="#cao-details-Approved">Approved</a></li>
                    <li class="tab col s4"><a ng-click="resetprojcao()" id="Hold" href="#cao-details-Hold">Hold / Rejected</a></li>
                </ul>
            </div>
            <div id="cao-details-pending" class="col s12">
                <div id="scrollable-area">
                    <table ng-table="firstTableParams" class="table fixedheadertable" show-filter="true" fixed-table-headers="scrollable-area">
                        <tr ng-repeat="applied in $data">
                            <td style="text-align: left" width="7%">
                                <input type="checkbox" class="filled-in" id="passorder_{{applied.invoiceno}}_{{$index}}"
                                    name="passorder_{{applied.invoiceno}}_{{$index}}" ng-checked="applied.isselected"
                                    ng-model="applied.ischecked" ng-change="selectEntityPassorder(applied)" />
                                <label for="passorder_{{applied.invoiceno}}_{{$index}}" data-error="Required"></label>
                            </td>
                            <td width="5%" data-title="'S.No'">{{$index + 1}}</td>
                            <td width="8%" data-title="'Project No'" filter="{projectno: 'text'}">{{applied.projectno}}</td>
                            <td width="12%" data-title="'No of Personnel'" filter="{noofpersonal: 'text'}"
                                sortable="'noofpersonal'">{{applied.totalmembers}}</td>
                            <td width="11%" data-title="'Month & Year'" filter="{monthandyear: 'text'}"
                                sortable="'monthandyear'">{{applied.monthandyear}}</td>
                            <td width="11%" data-title="'Gross Salary'" filter="{grosssalary: 'text'}"
                                sortable="'monthandyear'">{{applied.gross}}</td>
                            <td width="14%" data-title="'Deductions'" filter="{deductions: 'text'}" sortable="'deductions'">
                                {{applied.deductions}}</td>
                            <td width="14%" data-title="'Net Salary'" filter="{netsalary: 'text'}" sortable="'netsalary'">
                                {{applied.netpay}}</td>
                            <td width="10%" data-title="'Type'" filter="{type: 'text'}" sortable="'type'"> <span
                                    ng-show="applied.type==0">Normal</span><span ng-show="applied.type==1">Arrear</span>
                            </td>
                        </tr>
                    </table>
                </div>


                <div class="input-field col m3 s6" ng-show="rejshow == 1">
                    <input type="text" ng-model="rejectreason"  name="reason"  />
                    <label for="reason">Reason for rejection
                  </label>
                </div>

               
                <div class="input-field col m3 s6" ng-show="rejshow == 1">
                    <button class="btn waves-effect waves-light  cyan darken-2" type="submit"
                        ng-click="caoapprove('7',rejectreason)" ng-disabled="isDisabled">Proceed</button>
                    <button class="btn waves-effect waves-light  red darken-2" type="submit" ng-click="cancelpay()"
                        ng-disabled="isDisabled">Cancel</button>
                </div>
                
                <div ng-show="selectedprojacc.length > 0  && rejshow == 0">
                    <button class="btn waves-effect waves-light  cyan darken-2" type="submit" ng-click="caoapprove('6')"
                        ng-disabled="isDisabled">Approve</button>
                    <button class="btn waves-effect waves-light  grey darken-2" type="submit" ng-click="caoapprove('5')"
                        ng-disabled="isDisabled">Hold</button>
                    <button class="btn waves-effect waves-light  red darken-2" type="submit" ng-click="rejectcash()"
                        ng-disabled="isDisabled">Reject</button>
                </div>
            </div>
            <div id="cao-details-Approved" class="col s12">
                <div id="scrollable-area">
                    <table ng-table="tableParams2" class="table fixedheadertable" show-filter="true" fixed-table-headers="scrollable-area">
                        <tr ng-repeat="applied in $data">

                            <!-- <td style="text-align: left" width="7%"  >
                                        <input type="checkbox" class="filled-in" id="passorder_{{applied.payslipno}}" name="passorder_{{applied.payslipno}}" ng-checked="applied.isselected" ng-model="applied.ischecked" ng-change="selectEntityPassorder(applied)"/>
                                        <label for="passorder_{{applied.payslipno}}" data-error="Required"></label>

                                        
                                    </td> -->
                            <td width="5%" data-title="'S.No'">{{$index + 1}}</td>
                            <td width="8%" data-title="'Project No'" filter="{projectno: 'text'}">{{applied.projectno}}</td>
                            <td width="12%" data-title="'No of Personnel'" filter="{noofpersonal: 'text'}"
                                sortable="'noofpersonal'">{{applied.totalmembers}}</td>
                            <td width="11%" data-title="'Month & Year'" filter="{monthandyear: 'text'}"
                                sortable="'monthandyear'">{{applied.monthandyear}}</td>
                            <td width="11%" data-title="'Gross Salary'" filter="{grosssalary: 'text'}"
                                sortable="'monthandyear'">{{applied.gross}}</td>
                            <td width="11%" data-title="'Deductions'" filter="{deductions: 'text'}" sortable="'deductions'">
                                {{applied.deductions}}</td>
                            <td width="10%" data-title="'Type'" filter="{type: 'text'}" sortable="'type'"> <span
                                    ng-show="applied.type==0">Normal</span><span ng-show="applied.type==1">Arrear</span>
                            </td>
                            <td width="11%" data-title="'Net Salary'" filter="{netsalary: 'text'}" sortable="'netsalary'">
                                {{applied.netpay}}</td>

                        </tr>
                    </table>
                </div>
            </div>
            <div id="cao-details-Hold" class="col s12">
                <div id="scrollable-area">
                    <table ng-table="tableParams3" class="table fixedheadertable" show-filter="true" fixed-table-headers="scrollable-area">
                        <tr ng-repeat="applied in $data">
                            <td style="text-align: left" width="7%">
                                <div ng-if="applied.status == 5">
                                    <input type="checkbox" class="filled-in" id="passorder_{{applied.invoiceno}}_{{$index}}"
                                        name="passorder_{{applied.invoiceno}}_{{$index}}" ng-checked="applied.isselected"
                                        ng-model="applied.ischecked" ng-change="selectEntityPassorder(applied)" />
                                    <label for="passorder_{{applied.invoiceno}}_{{$index}}" data-error="Required"></label>
                                </div>
                            </td> 
                            <td width="5%" data-title="'S.No'">{{$index + 1}}</td>
                            <td width="8%" data-title="'Project No'" filter="{projectno: 'text'}">{{applied.projectno}}</td>
                            <td width="12%" data-title="'No of Personnel'" filter="{noofpersonal: 'text'}"
                                sortable="'noofpersonal'">{{applied.totalmembers}}</td>
                            <td width="11%" data-title="'Month & Year'" filter="{monthandyear: 'text'}"
                                sortable="'monthandyear'">{{applied.monthandyear}}</td>
                            <td width="11%" data-title="'Gross Salary'" filter="{grosssalary: 'text'}"
                                sortable="'monthandyear'">{{applied.gross}}</td>
                            <td width="11%" data-title="'Deductions'" filter="{deductions: 'text'}" sortable="'deductions'">
                                {{applied.deductions}}</td>
                            <td width="10%" data-title="'Type'" filter="{type: 'text'}" sortable="'type'"> <span
                                    ng-show="applied.type==0">Normal</span><span ng-show="applied.type==1">Arrear</span>
                            </td>
                            <td width="13%" data-title="'Net Salary'" filter="{netsalary: 'text'}" sortable="'netsalary'">
                                {{applied.netpay}}</td>
                            <!-- <td width="13%" data-title="'Net Salary'" filter="{netsalary: 'text'}" sortable="'netsalary'">
                                {{applied.netpay}}
                            </td> -->
                            <td width="8%" data-title="'Status'">
                                <span ng-show="applied.status > 1" class="redcolor"> {{applied.currentstatus}} </span>
                            </td>
                        </tr>
                    </table>
                </div>
                <div ng-show="selectedprojacc.length > 0 ">
                    <button class="btn waves-effect waves-light  cyan darken-2" type="submit" ng-click="caoapprove('6')"
                        ng-disabled="isDisabled">Approve</button>

                    <button class="btn waves-effect waves-light  red darken-2" type="submit" ng-click="caoapprove('7')"
                        ng-disabled="isDisabled">Reject</button>
                </div>
            </div>
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
.agreementdetails td {
    text-align: left !important;
}
.striped {
    display: block;
    height: 600px;
    overflow-y: scroll;
    overflow-x: scroll;
}
tr.COMBINED {
    background-color: #5becdf87;
}
</style>
<script>
    $(document).ready(function() {
        $('.date1').datepicker({
            format: 'yyyy-mm-dd',
            autoClose: true,
            endDate: "today"
            
        });
        $(".date1").datepicker().on("changeDate", function(e) {
            $('.datepicker-dropdown').hide();
        });
    });
</script>
<script type="text/ng-template" id="ng-table/headers/checkbox.html">
    <input type="checkbox" ng-model="model.allItemsSelected" ng-change="selectAll()" class="filled-in" id="ishold" name="filter-checkbox" value=""/>
    <label for="ishold" data-error="Required">Hold All</label>
</script>
<style> 
    .tabs { 
        overflow-x: hidden !important;
        overflow-y: hidden !important;
    }
    div#modalapply {
        height: 200px;
    }
    .startdatecao {
        margin-top: 20px !important;
    }
    .startdatecao.active {
        margin-top: 10px !important;
    }
    .greencolor {
        color: #d80707 !important;
        font-weight: bold !important;
    }
    .modal {
        top: 28% !important;
    }
</style>