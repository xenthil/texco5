<script type="text/javascript" src="<?php echo base_url("assets/js/app/adminapply.js ")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/app/confirm.js")?>"></script>
<script type="text/javascript">
    var jobpostingdetailid = "<?php echo $_GET['id'];?>"
</script> 
<script type="text/javascript">
   var servicetexcno = '';
</script>
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/jsPDF/jquery-ui-1.8.17.custom.min.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/jsPDF/jspdf.debug.js")?>"></script>
<!-- 
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ng-table.min.js")?>"></script>
<link rel="stylesheet" type="text/css" href="<?php echo base_url("assets/css/ng-table.min.css")?>" />
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ui-bootstrap-tpls-0.11.0.js")?>"></script> -->


<div class="row" ng-app="appadminApply" ng-controller="ctrladminApply">
    <div class="parallax-container" style="background-color: rgba(0, 12, 78, 0.9)">
        <div class="row">
            <div class="container">
                <div class="col s12 m6 l6">
                    <div class="pagebannertext white-text">Apply Job</div>
                </div>
                <div class="col s12 m6 l6 right-align">
                    <div class="dumheight hide-on-small-only"> </div>
                    <div class=""> 
                        <a href="<?php echo base_url()?>" class="breadcrumb">Home</a>
                        <a href="<?php echo base_url("Texco/vacancy")?>" class="breadcrumb">Vacancy</a> 
                        <span class="breadcrumb">Apply Job</span>
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
            <div class="col s12 m12 l12">

                <div class="row">
                    <div class="input-field col s12 m3 l3">
                        <input id="texserno" type="text" class="validate" ng-model="objapply.texserno">
                        <label for="texserno">Enter Texco No or Service No(Army No)</label>
                    </div>
                    <div class="input-field col  s12 m2 l2 center-align">
                        <button id="btntexser" class="waves-effect waves-light btn blue" type="submit" ng-click='getmemberinfo(objapply.texserno)'  ng-disabled="disableview">View</button>
                    </div>
                   <!--  <div class="input-field col s12 m4 l4  left-align">
                        <a class="waves-effect waves-light btn blue" ng-disabled="objapply.memberid > 0" ng-click='addmember()'>Register for new Employee</a>
                    </div> -->
                </div>
                <div class="row">
                  <div id="failure1" class="red-text"></div>
                </div>
            </div>

            <div id="Existingmember" style="display:none;" class="col s12 m12 l12 card-panel z-depth-1">
                <div class="row" style="background-color: #f1f1f1;">
                    <div class="col s12 m10 l10 left-align blue-text">
                        <input type="hidden" ng-model="objapply.memberid">
                        <h4><span class="black-text" style="font-weight: 300;padding-right: 5px;">Name :</span>{{objapply.firstname}} {{objapply.lastname}}</h4></p>
                        <p class="black-text"> Father's Name : <strong>{{objapply.fathername}}</strong>
                        </p>
                    </div>
                </div>
                <div class="row">
                    <div class="col s12 m12 l12">
                        <div class="row" style="    line-height: 40px;">
                            <div class="col s12 m4 l4"> Texco No : <strong>{{objapply.texcono}}</strong></div>
                            <div class="col s12 m4 l4">Date Of Birth : <strong>{{objapply.dob}}</strong></div>
                            <div class="col s12 m4 l4">Rank : <strong>{{objapply.rank}} </strong></div>
                        </div>
                        <div class="row" style="    line-height: 40px;">
                            <div class="col s12 m4 l4">Service No(Army No) : <strong>{{objapply.serviceno}}</strong></div>
                            <div class="col s12 m4 l4">Mobile : <strong>{{objapply.mobile}}</strong></div>
                            <div class="col s12 m4 l4">Corps : <strong>{{objapply.corps}} </strong></div>
                        </div>
                        <div class="row" style="    line-height: 40px;">
                            <div class="col s12 m4 l4"> Reg No : <strong>{{objapply.registrationno}} </strong> </div>
                            <div class="col s12 m4 l4"> Address : <strong> {{objapply.communicationaddress}}</strong> </div>
                            <div class="col s12 m4 l4">Trade : <strong>{{objapply.trade}} </strong> </div>
                        </div>
                        <div class="row" style="    line-height: 40px;">
                            <div class="col s12 m4 l4"> Army Qualification : <strong>{{objapply.armyqual}} </strong> </div>
                            <div class="col s12 m4 l4"> Civil Qualification :<strong> {{objapply.civilqual}}</strong> </div>
                            <div class="col s12 m4 l4">Esmid No : <strong>{{objapply.esmidno}} </strong> </div>
                        </div>
                        <div class="row" style="    line-height: 40px;">
                          <div class="col s12 m12 l12">
                          <button class="waves-effect btn red" type="button" ng-click='cancelapply()'>
                              Cancel
                          </button>
                          &nbsp;&nbsp;&nbsp;
                          
                          <button id="apply" class="waves-effect waves-light btn" type="submit" ng-click='inplaceothercat(objapply, postingdetail)'>
                              Confirm
                          </button>
                        </div>
                        </div>
                        <div class="row">
                          <div id="failure2" class="red-text"></div>
                        </div>
                    </div>
                </div>
            </div>

           <!--  <?php echo $newmember ?> -->

        </div>
    </div>
    <div id="modal1" class="modal">
         <div class="modal-content">
            <div class="row">
               <div class="col s12 m3 l3">
                  <p class="blue-grey-text"><strong>Service No(Army No)</strong> </p>
                  <p class="ng-binding">{{ jobprint.serviceno }}</p>
               </div>
               <div class="col  s12 m3 l3">
                  <p class="blue-grey-text"><strong>Name</strong> </p>
                  <p class="ng-binding">{{ jobprint.firstname }}</p>
               </div>
               <div class="col  s12 m3 l3">
                  <p class="blue-grey-text"><strong>Project No</strong> </p>
                  <p class="ng-binding">{{ jobprint.projectno }}</p>
               </div>
               <div class="col  s12 m3 l3">
                  <p class="blue-grey-text"><strong>Category</strong> </p>
                  <p class="ng-binding">{{ jobprint.jobcode }}</p>
               </div>
            </div>
            <hr>
            <div class="row">
               <div class="col s12 m12 l6">
                  <div class="row">
                     <form class="col s12">
                        <div class="row">
                           <div class="input-field col s12">
                              IN PLACE
                              <input ng-model='inplace.inplace' id="inplace" type="text">
                           </div>
                        </div>
                        <div ng-show=" jobprint.jobcode == 'OTHER'" class="row">
                           <div class="input-field col s12">
                              CATEGORY
                              <input ng-model='inplace.othercat' id="othercat" type="text">
                           </div>
                        </div>
                     </form>
                  </div>
               </div>
            </div>
         </div>
         <div class="modal-footer">
            <a ng-click="saveapply(objapply, postingdetail, inplace)" class="waves-effect waves-green btn-flat modal-action modal-close">Print</a>
            <a href="#" class="waves-effect waves-red btn-flat modal-action modal-close">Close</a>
         </div>
      </div>
</div>

<script>
var orginal_text = $('#esmidno').val();
   var regular_expression = '/^' + orginal_text +'/' ;
   $('#esmidno').keyup(function(){
       var current_text = $('#esmidno').val();
       if(current_text.match('^' + orginal_text +'') == null){
           $('#esmidno').val(orginal_text +current_text )
       }
   });

   $("#texserno").keyup(function(event) {
    if (event.keyCode === 13) {
        $("#btntexser").click();
    }
});
</script>
