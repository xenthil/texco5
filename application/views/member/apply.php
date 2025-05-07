<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.8.4/moment.min.js"></script>  
<script type="text/javascript" src="<?php echo base_url("assets/js/app/apply.js?v=1.0")?>"></script>
<script type="text/javascript">
    var jobpostingdetailid = "<?php echo $_GET['id'];?>";
    var servicetexcno = 0;
</script>
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/jsPDF/jquery-ui-1.8.17.custom.min.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/jsPDF/jspdf.debug.js")?>"></script>
<div class="row" ng-app="appApply" ng-controller="ctrlApply" >
<input type="hidden" ng-model="serviceno" ng-init="serviceno='<?php echo $serviceno;?>'"/>
<div data-ng-init="getmemberinfo(serviceno)"></div>
    <div class="parallax-container" style="background-color: rgba(0, 12, 78, 0.9)">
        <div class="row">
            <div class="container">
                <div class="col s12 m6 l6">
                    <div class="pagebannertext white-text">Apply Job</div>
                </div>
                <div class="col s12 m6 l6 right-align">
                    <div class="dumheight hide-on-small-only"> </div>
                    <div class=""> 
                        <a href="<?php echo base_url("Member/dashboard")?>" class="breadcrumb">Home</a>
                        <a href="<?php echo base_url("Member/vacancy")?>" class="breadcrumb">Vacancy</a> 
                        <a href="" class="breadcrumb">Apply Job</a> 
                    </div>
                </div>
            </div>
        </div>
        <div class="parallax">
          <img src="<?php echo base_url("assets/images/breadcrumbbanner.jpg")?>">
        </div>
    </div>

    <div class=" container">
        <div class="row">
            <div id="Client-list" class="col s12 m12 l12 card-panel z-depth-1">
                <div class="row" style="background-color: #f1f1f1;">
                    <div class="col s12 m10 l10 left-align blue-text">
                        <h5>{{postingdetail.projectname}}</h5>
                        <p class="black-text"> Job Name (Code) : <strong>{{postingdetail.name}} ({{postingdetail.code}})</strong>
                        </p>
                    </div>

                </div>
                <div class="row">
                    <div class="col s12 m12 l12">
                        <div class="row" style="    line-height: 40px;">
                            <div class="col s12 m4 l4"> Number of vacancies : <strong>{{postingdetail.numberofvacancies}}</strong>
                            </div>
                            <div class="col s12 m4 l4">Project No : <strong>{{postingdetail.projectno}}</strong>
                            </div>
                            <div class="col s12 m4 l4">Client : <strong>{{postingdetail.organization}} </strong>
                            </div>
                        </div>
                        <div class="row" style="    line-height: 40px;">
                            <div class="col s12 m4 l4">Applied Vacancies : <strong>{{postingdetail.filledvacancies}}</strong>
                            </div>
                            <div class="col s12 m4 l4">Region : <strong>{{postingdetail.region}}</strong>
                            </div>
                            <div class="col s12 m4 l4">Builing : <strong>{{postingdetail.addressline1}} </strong>
                            </div>
                        </div>
                        <div class="row" style="    line-height: 40px;">
                            <div class="col s12 m4 l4"> Waiting Vacancies : <strong>{{postingdetail.waitingvacancies}} </strong> </div>
                            <div class="col s12 m4 l4"> District : <strong>{{postingdetail.district}}</strong> </div>
                            <div class="col s12 m4 l4">Street : <strong>{{postingdetail.addressline2}} </strong> </div>
                        </div>
                        <div class="row" style="    line-height: 40px;">
                            <div class="col s12 m4 l4"> Comments : <strong>{{postingdetail.comments}} </strong> </div>
                            <div class="col s12 m4 l4"> Posted Date :<strong> {{postingdetail.posteddate}}</strong> </div>
                            <div class="col s12 m4 l4">Area : <strong>{{postingdetail.addressline3}} </strong> </div>
                        </div>
                    </div>
                </div>
            </div>
           

            <div id="Existingmember" style="display:none;" class="col s12 m12 l12 card-panel z-depth-1">
                <div class="row" style="background-color: #f1f1f1;">
                    <div class="col s12 m10 l10 left-align blue-text">
                        <input type="hidden" ng-model="objapply.memberid">
                        <h5>{{objapply.firstname}} {{objapply.lastname}}</h5>
                        <p class="black-text"> Father's Name : <strong>{{objapply.fathername}}</strong>
                        </p>
                    </div>
                </div>
                <div class="row">
                    <div class="col s12 m12 l12">
                        <div class="row" style="    line-height: 40px;">
                            <div class="col s12 m4 l4"> Texco No : <strong>{{objapply.texcono}}</strong></div>
                            <div class="col s12 m4 l4">Date Of Birth : <strong>{{objmember.dob}}</strong></div>
                            <div class="col s12 m4 l4">Rank : <strong>{{objapply.rank}} </strong></div>
                        </div>
                        <div class="row" style="    line-height: 40px;">
                            <div class="col s12 m4 l4">Service No(Army No) : <strong>{{objapply.serviceno}}</strong></div>
                            <div class="col s12 m4 l4">Mobile : <strong>{{objapply.mobile}}</strong></div>
                            <div class="col s12 m4 l4">Corps : <strong>{{objapply.corps}} </strong></div>
                        </div>
                        <div class="row" style="    line-height: 40px;">
                            <div class="col s12 m4 l4"> Reg No : <strong>{{objapply.registrationno}} </strong> </div>
                            <div class="col s12 m4 l4"> Address : <strong>{{objapply.addressline1}} {{objapply.addressline2}}</strong> </div>
                            <div class="col s12 m4 l4">Trade : <strong>{{objapply.trade}} </strong> </div>
                        </div>
                        <div class="row" style="    line-height: 40px;">
                            <div class="col s12 m4 l4"> Army Qualification : <strong>{{objapply.armyqual}} </strong> </div>
                            <div class="col s12 m4 l4"> Civil Qualification :<strong> {{objapply.civilqual}}</strong> </div>
                            <div class="col s12 m4 l4">Ex ID No: <strong>{{objapply.esmidno}} </strong> </div>
                        </div>
                        <div class="row" style="    line-height: 40px;">
                          <div class="col s12 m12 l12">
                          <button class="waves-green btn-flat" type="button" ng-disabled="isDisabled" ng-click='cancelapply()'>
                              Cancel
                          </button>

                          &nbsp;&nbsp;&nbsp;
                          <button id="apply" ng-disabled="isDisabled" class="waves-effect waves-light btn" type="submit" ng-click='saveapply(objapply, postingdetail)'>
                              Apply
                          </button>
                        </div>
                        </div>
                        <div class="row">
                          <div id="failure2" class="red-text"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="errormember" style="display:none;" >
        You Are not eligible</div>

        </div>
    </div>
</div>
