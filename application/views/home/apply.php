<script type="text/javascript">
   var jobpostingdetailid = "<?php echo $_GET['id'];?>"
</script>

<script type="text/javascript">
   var servicetexcno = '';
</script>
  
  
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.8.4/moment.min.js"></script>  
<script type="text/javascript" src="<?php echo base_url("assets/js/app/apply.js ")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/jsPDF/jquery-ui-1.8.17.custom.min.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/jsPDF/jspdf.debug.js")?>"></script>
<!-- 
   <script type="text/javascript" src="<?php echo base_url("assets/js/lib/ng-table.min.js")?>"></script>
   <link rel="stylesheet" type="text/css" href="<?php echo base_url("assets/css/ng-table.min.css")?>" />
   <script type="text/javascript" src="<?php echo base_url("assets/js/lib/ui-bootstrap-tpls-0.11.0.js")?>"></script> -->

<div class="row" ng-app="appApply" ng-controller="ctrlApply">
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
                  <a href="<?php echo base_url("vacancy")?>" class="breadcrumb">Vacancy</a> 
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
                  <label for="texserno">Enter Texco No or Service No</label>
               </div>
               <div class="input-field col  s12 m2 l2 center-align">
                  <button id="btntexser" class="waves-effect waves-light btn red login-btn" type="submit" ng-click="otpGenerate(objapply.texserno)" ng-disabled="disableview">Login</button>

                 

                  <!-- <button id="btntexser" class="waves-effect waves-light btn blue" type="submit" ng-click="getmemberinfo(objapply.texserno)" ng-disabled="disableview">View</button> -->

               </div>
               <div class="input-field col s12 m4 l4  left-align">
                  <a class="waves-effect waves-light btn green" ng-disabled="objapply.memberid > 0" ng-click='addmember()'>Register for new Employee</a>
               </div>
            </div>
            <div class="row">
               <div id="failure1" class="red-text"></div>
            </div>
         </div>
         <div id="Existingmember" style="display:none;" class="col s12 m12 l12 card-panel z-depth-1">
            <div class="row" style="background-color: #f1f1f1;">
               <div class="col s12 m10 l10 blue-text">
                  <input type="hidden" ng-model="objapply.memberid">
                  <h4><span class="black-text" style="font-weight: 300;padding-right: 5px;">Name :</span>{{objapply.firstname}} {{objapply.lastname}}</h4>
                  </p>
                  <p class="black-text"> Father's Name : <strong>{{objapply.fathername}}</strong>
                  </p>
               </div>
            </div>
            <div class="row">
               <div class="col s12 m12 l12">
                  <!-- {{objapply}} -->
                  <div class="row" style="line-height: 40px;">
                     <div class="col s12 m4 l4"> Texco No : <strong>{{objapply.texcono}}</strong></div>
                     <div class="col s12 m4 l4">Date Of Birth : <strong>{{objapply.dob}}</strong></div>
                     <div class="col s12 m4 l4">Rank : 
                        <strong ng-show="objapply.rank != '' ">{{objapply.rank}} </strong>
                        <strong ng-show="objapply.rank == '' "> Hi </strong>
                     </div>
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
                     <div class="col s12 m12 l3">
                        <button class="waves-effect btn red" type="button" ng-click='cancelapply()' ng-disabled="isDisabled">
                        Cancel
                        </button>
                        &nbsp;&nbsp;&nbsp;
                        <button id="apply" ng-disabled="isDisabled" class="waves-effect waves-light btn" type="submit" ng-click='saveapply(objapply, postingdetail)'>
                        Apply
                        </button>
                     </div>
                     <!-- {{objapply}} -->
                     <div class="col s12 m12 l3" ng-show=" objapply.rank == null ">
                       <button id="updaterank" class="waves-effect waves-light btn blue" type="submit" ng-click="UpdateRank()">Update Rank</button>
                     </div>
                  </div>
                  <div class="row">
                     <div id="failure2" class="red-text"></div>
                  </div>
               </div>
            </div>
         </div>

         <div id="modalrank" class="modal modal-fixed-footer" style="max-height:90%;">
            <div class="modal-content">
               <nav class="blue" style="position: fixed;margin-top: 0px; z-index:999">
                  <div class="col s11 m11 l11">
                     <div class="li white-text" id="mcaption">Update Rank </div>
                  </div>
               </nav>
               <div class="row" style="padding: 60px;">
                <h5>{{objapply.serviceno}} - {{objapply.texcono}} - {{objapply.firstname}}</h5>
                <div class="row">
                  <table>
                     <tr>
                        <td>
                           Rank :
                        </td>
                        <td>
                           <select  ng-model="objapply.rankid" class="validate" name="rankid" data-ng-options=" r.lkvalid as r.description for r in rank" ng-required="true">
                        </td>
                     </tr>
                  </table>
                </div>
                </select>
               </div>
            </div>
            <div class="modal-footer">
               <div class="red-text waves-effect waves-green"></div>
               <button class="waves-effect waves-green btn-flat" type="submit" ng-click="SaveRank(objapply)">Save
               </button>
                <button class="waves-effect waves-blue btn-flat" type="submit" ng-click="CancelRank()">Cancel
               </button>
            </div>

         </div>

         <div id="modalapply" class="modal modal-fixed-footer" style="max-height:90%;">
            <div class="modal-content" style="overflow-y: hidden;">
               <nav class="blue" style="position: fixed;margin-top: 0px; z-index:999">
                  <div class="col s11 m11 l11">
                     <div class="li white-text" id="mcaption">Job Apply</div>
                  </div>
               </nav>
               <div class="row" style="padding: 60px;">
                <h5>Do you want to Print or Apply for other Job ?</h5>
               </div>
            </div>
            <div class="modal-footer">
               <div class="red-text waves-effect waves-green"></div>
                <a href="<?php echo base_url('/vacancy?serviceno={{objapply.serviceno}}')?>" class="waves-effect waves-green btn-flat">Apply </a> 
                <button class="waves-effect waves-blue btn-flat" type="submit" ng-click="applyprint()">Print
               </button>
            </div>
         </div>



         <div id="modalotp" class="modal modal-fixed-footer" style="max-height:90%;">
            <div class="modal-content" style="overflow-y: hidden;">
               <nav class="blue" style="position: fixed;margin-top: 0px; z-index:999">
                  <div class="col s11 m11 l11">
                     <div class="li white-text" id="mcaption">OTP Verify</div>
                  </div>
               </nav>
               <div class="row" style="padding: 60px;">
                <h5>Enter OTP</h5>
                <div class="input-field col s12 m3 l3">
                  <input id="otp" type="text" class="validate" ng-model="objapply.otp" onkeypress="return isNumberKey(event);" maxlength="4">
                  <label for="texserno">Enter OTP</label>
               </div>

           
               </div>
               
            </div>
            <div class="modal-footer">
               <div class="red-text waves-effect waves-green" ng-show="remainingTime>0">

               Resend OTP in {{remainingTime}}
               </div>
            
                <button class="btn waves-effect waves-light  cyan darken-2" type="submit" ng-click="validateOTP(objapply.otp,'<?php echo $_GET['id'];?>')">Submit
               </button>

               <button class="waves-effect waves-blue btn-flat" type="submit" ng-click="otpGenerate(objapply.texserno,'<?php echo $_GET['id'];?>')" style="margin-right: 20px;" ng-disabled="disableResent">Resend OTP
               </button>

            </div>
         </div>
         <?php echo $newmember ?>
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

      function isNumberKey(evt) {
         var charCode = (evt.which) ? evt.which : event.keyCode;
         console.log(charCode);
         if (charCode != 46 && charCode != 45 && charCode > 31 &&
            (charCode < 48 || charCode > 57))
            return false;

         return true;
      }
   
      // $("#texserno").keyup(function(event) {
      //  if (event.keyCode === 13) {
      //      $("#btntexser").click();
      //  }
//});
</script>
<style>
    div#modalapply {
        height: 200px;
    }
    .login-btn {
    font-size: 26px;
    font-weight: bold;
    /* padding: 21px; */
}
</style>