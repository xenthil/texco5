<script type="text/javascript" src="<?php echo base_url("assets/js/app/members.js")?>"></script>
<script src="https://code.jquery.com/jquery-1.12.4.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
<link rel="stylesheet" type="text/css" href="<?php echo base_url("assets/css/ng-table.min.css")?>" />
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ng-table.min.js")?>"></script> 
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ui-bootstrap-tpls-0.11.0.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/jquery.formatter.min.js")?>"></script>
<script src="<?php echo base_url("assets/js/lib/angular-bootstrap-datepicker.js")?>" charset="utf-8"></script>
<link href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery-ui.css" rel="Stylesheet" type="text/css" />
<link href="<?php echo base_url("assets/css/datepicker.css")?>" rel="Stylesheet" type="text/css" />
<script type="text/javascript">
   var memberid = 0;
</script>
<style>
input {
    width: 100%;
    text-transform : uppercase;
}
input {
  color: black !important;
  font-size: large !important; 
}
</style> 
<div class="parallax-container" style="background-color: rgba(0, 12, 78, 0.9)">
   <div class="row">
      <div class="container">
         <div class="col s12 m6 l6">
            <div class="pagebannertext white-text">Employees (Ex-servicemens)</div>
         </div>
         <div class="col s12 m6 l6 right-align">
            <div class="dumheight hide-on-small-only"> </div>
            <div class=""> <a href="<?php echo base_url('admin/dashboard') ?>" class="breadcrumb">Home</a> <span class="breadcrumb">Employees</span> </div>
         </div>
      </div>
   </div>
   <div class="parallax"><img src="<?php echo base_url("assets/images/breadcrumbbanner.jpg") ?>">
   </div>
</div>
<div class="row" ng-app="appAdminMember">
   <div class="container" ng-controller="ctrlAdminMember">
      <!-- Modal Window for new and Edit -->
      <div class="fixed-action-btn" style="bottom: 50px; right: 19px;">
         <?php if ($roledata['permissions']['AMEMBERS'] == 1) { ?>
         <a class="btn-floating btn-large red modal-trigger" ng-click='addmember()'>
            <i class="mdi mdi-account-plus"></i>
         </a>
         <?php } ?>
      </div>
      <!-- Modal Structure -->
      <?php echo $newmember ?>
      <div id="" class="section">
         <div class="row">
            <div class="col s12 ">
               <div class="row">
                  <div class="input-field col s6">
                     <input name="search_val" id="search_val" type="text" ng-model="objmember.search_val" placeholder="Search Texcono Or Service No or Mobile No" />
                     <label for="">Search </label>
                  </div>
                  <div class="input-field col s6">
                     <button ng-click="searchmember(objmember.search_val)" style="background: green;top: 10px !important;color: #fff !important;" class="modal-action waves-effect waves-green btn-flat" type="submit" id="btntexser">Search</button>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <div id="" class="section" ng-if="objprofile.firstname">
         <div class="row">
            <div id="Client-details" class="col s12">
               <div class="email-content-wrap">
                  <div class="row">
                     <div class="col s12">
                        <div class="input-field col s12">
                           <div class="input-field col s6">
                              <img src="<?php echo base_url("assets/images/photo.png")?>" alt="" class="circle">
                           </div>
                           <div class="input-field col s6">
                              <button ng-click="removemember(objprofile.memberid)" style="background: #f3a10d;color: #fff !important;float:right;" class="modal-action waves-effect waves-green btn-flat" type="button" id="btntexser">Delete</button>
                           </div>
                        </div>
                        <div class="input-field col s6">
                           <h4 class="email-title">{{objprofile.firstname}} {{objprofile.lastname}} - {{objprofile.serviceno}}
                           </h4>
                           <div class="input-field col s6">
                         </div>
                        </div>
                     </div>
                     <form ng-submit="profileform.$valid && savemember(objprofile)" id="profileform" name="profileform" novalidate>
                        <div class="row">
                           <div class="input-field col s6 l2">
                              <input id="serviceno" placeholder="Service No" name="serviceno" type="text" class="validate" maxlength="150" ng-model="objprofile.serviceno" ng-required="true" ng-class="{'submitted': submitted && profileform.serviceno.$invalid}">
                              <label for="serviceno" data-error="Required" class="active">Service No</label>
                           </div>
                           <div class="input-field col s6 l2">
                              <input id="texcono" name="texcono" type="text" class="validate" maxlength="150" ng-model="objprofile.texcono">
                              <label for="texcono" class="active">Texco No</label>
                           </div>
                           <div class="input-field col s6 l2">
                              <input id="firstname" name="firstname" type="text" class="validate" maxlength="150" ng-model="objprofile.firstname" ng-required="true" ng-class="{'submitted': submitted && profileform.firstname.$invalid}" ng-pattern="/^[a-zA-Z. ]*$/">
                              <span ng-show="submitted && profileform.firstname.$error.pattern">Not a valid Name!</span>
                              <label for="firstname" data-error="Required" class="active">Name</label>
                           </div>
                              <input id="lastname" name="lastname" type="hidden" class="validate" maxlength="150" ng-model="objprofile.lastname">
                           <div class="input-field col s6 l2">
                              <input id="fathername" type="text" class="validate" maxlength="150" ng-model="objprofile.fathername" ng-class="{'submitted': submitted && profileform.fathername.$invalid}">
                              <span ng-show="submitted && profileform.fathername.$error.pattern">Not a valid Name!</span>
                              <label for="fathername" class="active">Father Name</label>
                           </div>
                           <div class="input-field col s6 l2">
                              <input name="dob" ng-required="true" type="text" id="dobs" ng-class="{'submitted': submitted && profileform.dob.$invalid}" ng-model="objprofile.dob">
                              <label for="dobs" data-error="Required" class="active">Date of Birth</label>
                           </div>
                            <div class="input-field col s6 l2">
                              <input id="email" type="email" name="email" class="validate"  ng-pattern="/^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/" maxlength="50" ng-model="objprofile.email" ng-class="{'submitted': submitted && profileform.email.$invalid}">
                              <span ng-show="submitted && profileform.email.$error.pattern">Not a valid Email!</span>
                              <label for="email" data-error="Required" class="active">Email</label>
                           </div>
                        </div>
                        <div class="row">
                           <div class="input-field col s6 l2">
                              <input id="mobile" name="mobile" type="text" class="validate" minlength="10" maxlength="10" ng-required="true" ng-model="objprofile.mobile" ng-class="{'submitted': submitted && profileform.mobile.$invalid}" onkeypress="return isNumberKey(event);">
                              <label for="mobile" data-error="Required" class="active">Mobile</label>
                           </div>
                           <div class="input-field col s6 l4">
                              <div class="input-field col s3 l2" style="padding-top: 15px;">
                                 <input name="gender" type="radio" id="male" value="0" ng-model="objprofile.genderid"  ng-checked="objprofile.genderid == '0'"/>
                                 <label for="male" style="font-size:12px;" class="active">Male</label>
                              </div>
                              <div class="input-field col s3 l2" style="padding-top: 15px;">
                                 <input name="gender" type="radio" id="femamale" value="1" ng-model="objprofile.genderid"  ng-checked="objprofile.genderid == '1'"/>
                                 <label for="female" style="font-size:12px;" class="active">Female</label>
                              </div>
                              <label for="gender" data-error="Required" class="active">Gender</label>
                           </div>
                           <div class="input-field col s6 l2">
                              <input id="address" type="text" class="validate" maxlength="150" ng-model="objprofile.address"  ng-class="{'submitted': submitted && profileform.address.$invalid}" ng-change="comaddress(objprofile)">
                              <label for="address" data-error="Required" class="active">Address</label>
                           </div>
                           <div class="input-field col s6 l2">
                              <input id="village" type="text" name="village" class="validate" maxlength="150" ng-model="objprofile.village" ng-class="{'submitted': submitted && profileform.village.$invalid}" ng-change="comaddress(objprofile)">
                              <label for="village" class="active">Village</label>
                           </div>
                           <div class="input-field col s6 l2">
                              <select name="regionid" ng-model="objprofile.regionid"  ng-class="{'submitted': submitted && profileform.regionid.$invalid}" data-ng-options="rg.region_id as rg.region_name for rg in regionDetails" ng-change="getDistrictDetails(objprofile.regionid);">
                              </select>
                              <label for="region" class="active">Region</label>
                           </div>
                        </div>
                        <div class="row">
                           <div class="input-field col s6 l2">
                              <select name="districtid" ng-model="objprofile.districtid" ng-class="{'submitted': submitted && profileform.districtid.$invalid}" aria-required="true" data-ng-options=" d.district_id as d.district_name for d in districtDetails" ng-change="getTalukDetails(objprofile.districtid);">
                              </select>
                              <label class="active">District</label>
                           </div>
                           <div class="input-field col s6 l2">
                              <select ng-model="objprofile.talukid" name="talukid" data-ng-options=" c.taluk_id as c.taluk_name for c in Taluks" ng-class="{'submitted': submitted && registerform.talukid.$invalid}" ng-change="comaddress(objregister)">
                              </select>
                              <label for="talukid" class="active">Taluk</label>
                           </div>
                           <div class="input-field col s6 l2">
                              <select ng-model="objprofile.stateid"  data-ng-options=" s.lkvalid as s.description for s in state" ng-class="{'submitted': submitted && profileform.stateid.$invalid}" ng-change="comaddress(objprofile)">
                              </select>
                              <label class="active">State</label>
                           </div>
                           <div class="input-field col s6 l2">
                              <select ng-model="objprofile.countryid" data-ng-options=" ct.lkvalid as ct.description for ct in country" ng-change="comaddress(objprofile)">
                              </select>
                              <label class="active">Country</label>
                           </div>
                           <div class="input-field col s6 l2">
                              <input  name="pincode" type="text" maxlength="6" ng-class="{'submitted': submitted && profileform.pincode.$invalid}" class="validate"  ng-model="objprofile.pincode" onkeypress="return isNumberKey(event);" ng-change="comaddress(objprofile)">
                              <label for="pincode" class="active">Pincode</label>
                           </div>
                           <div class="input-field  col s6 l2" style="margin-right:0px;">
                              <input type="checkbox" class="filled-in validate" id="filled-in-box1" checked="checked" ng-model="objprofile.addressstatus" name="comaddress" ng-change="comaddress(objprofile)" ng-checked="objprofile.addressstatus=='1'" ng-true-value="1" ng-false-value="0" />
                              <label for="filled-in-box1">Same Address </label>
                           </div>
                        </div>
                        <div class="row">
                           <div class="input-field col s6 l6">
                              <input id="communicationaddress" type="text" name="communicationaddress" class="validate" maxlength="150" ng-model="objprofile.communicationaddress">
                              <label for="communicationaddress" class="active">Address for communication</label>
                           </div>
                           <div class="input-field col s6 l2">
                              <input id="aadhaarno" type="text" name="aadhaarno" class="validate" minlength="12" maxlength="12" ng-model="objprofile.aadhaarno" ng-class="{'submitted': submitted && profileform.aadhaarno.$invalid}" ng-pattern="/^[0-9]*$/">
                              <span ng-show="submitted && profileform.aadhaarno.$error.pattern">Enter valid aadhaar number!</span>
                              <label for="aadhaarno" class="active">Aadhaar No</label>
                           </div>
                           <div class="input-field col s6 l2">
                              <input id="nominee" type="text" class="validate" maxlength="150" ng-model="objprofile.nominee">
                              <label for="nominee" class="active">Nominee</label>
                           </div>
                           <div class="input-field col s6 l2">
                              <select ng-model="objprofile.nomineerelationid" data-ng-options=" rl.lkvalid as rl.description for rl in relations">
                              </select>
                              <label class="active">Nominee Relation</label>
                           </div>
                        </div>
                        <div class="row">
                           <div class="input-field col s6 l2">
                              <input id="accountno" type="text" name="accountno" ng-class="{'submitted': submitted && memberform.accountno.$invalid}" class="validate" maxlength="16" ng-model="objprofile.accountno" onkeypress="return isNumberKey(event);">
                              <label for="accountno" class="active">Account No</label>
                           </div>
                           <div class="input-field col s6 l2">
                              <input id="ifsccode" type="text" name="ifsccode" ng-class="{'submitted': submitted && memberform.ifsccode.$invalid}" class="validate" maxlength="16" ng-model="objprofile.ifsccode" ng-blur="SelectIFSC(objprofile.ifsccode);">
                              <label for="ifsccode" class="active">IFSC Code</label>
                           </div>
                           <div class="input-field col s6 l2">
                              <input id="branchname" type="text" name="branchname" ng-class="{'submitted': submitted && memberform.branchname.$invalid}" class="validate" maxlength="16" ng-model="objprofile.branchname">
                              <label for="branchname" class="active">Branch Name</label>
                           </div>
                           <div class="input-field col s6 l2">
                              <input id="branchcode" type="text" name="branchcode" ng-class="{'submitted': submitted && memberform.branchcode.$invalid}" class="validate" maxlength="16" ng-model="objprofile.branchcode">
                              <label for="branchcode" class="active">Branch Code</label>
                           </div>
                           <div class="input-field col s6 l2">
                              <select  ng-model="objprofile.rankid" class="validate" name="rankid" data-ng-options=" r.lkvalid as r.description for r in rank" ng-class="{'submitted': submitted && profileform.rankid.$invalid}" ng-required="true">
                              </select>
                              <label for="rankid" data-error="Required" class="active">Rank</label>
                           </div>
                           <div class="input-field col s6 l2">
                              <input id="armyqual" type="text" class="validate" maxlength="100" ng-model="objprofile.armyqual">
                              <label for="armyqual" class="active">Army Qualification</label>
                           </div>
                        </div>
                        <div class="row">
                           <div class="input-field col s6 l2">
                              <select name="corps" ng-model="objprofile.corpsid" data-ng-options=" rl.lkvalid as rl.description for rl in corp">
                              </select>
                              <label for="corps" class="active">Corps</label>
                           </div>
                           <div class="input-field col s6 l2">
                              <select name="trade" ng-model="objprofile.tradeid" data-ng-options=" rl.lkvalid as rl.description for rl in trades">
                              </select>
                              <label for="trade" class="active">Trade</label>
                           </div>
                           <div class="input-field col s6 l2">
                              <input id="esmidno" type="text" class="validate" maxlength="15" ng-model="objprofile.esmidno" value ="TN">
                              <label for="esmidno" class="active">Esmid No</label>
                           </div>
                           <div class="input-field col s6 l2">
                              <select  ng-model="objprofile.characterid" class="validate" name="character" data-ng-options=" r.lkvalid as r.description for r in character">
                              </select>
                              <label for="character" class="active">Character</label>
                           </div>
                           <div class="input-field col s6 l2">
                              <select name="religion" id="religion" ng-model="objprofile.religionid"  data-ng-options=" r.lkvalid as r.description for r in religion"  ng-class="{'submitted': submitted && profileform.religionid.$invalid}" >
                              </select>
                              <label for="religion" data-error="Required" class="active">Religion</label>
                           </div>
                           <div class="input-field col s6 l2">
                              <select  ng-model="objprofile.casteid" class="validate" name="caste" data-ng-options=" r.lkvalid as r.description for r in caste" ng-class="{'submitted': submitted && profileform.casteid.$invalid}" >
                              </select>
                              <label for="caste" data-error="Required" class="active">Caste</label>
                           </div>
                        </div>
                        <div class="row"> 
                           <div class="input-field col s6 l2">
                              <input id="civilqual" type="text" class="validate" maxlength="100" ng-model="objprofile.civilqual">
                              <label for="civilqual" class="active">Civil Qulaification</label>
                           </div>
                           <div class="input-field col s6 l2">
                              <!-- <md-datepicker ng-model="objprofile.doj" md-placeholder="Enter date"></md-datepicker> -->
                              <input id="doj" name="doj" type="text" ng-model="objprofile.doj" ng-class="{'submitted': submitted && profileform.dob.$invalid}" autocomplete="off"> 
                              <label for="doj" class="active">Date Of Joining</label>
                           </div>
                           <div class="input-field col s6 l2">
                              <input id="panno" type="text" name="panno" class="validate" maxlength="100" ng-model="objprofile.panno">
                              <label for="panno" class="active">PAN NO</label>
                           </div>
                           <div class="input-field col s6 l2">
                              <input id="uanno" type="text" name="uanno" class="validate" maxlength="100" ng-model="objprofile.uanno">
                              <label for="uanno" class="active">UAN NO</label>
                           </div>
                           <div class="input-field  col s6 l2" style="margin-right:0px;">
                              <input type="checkbox" class="filled-in" id="filled-in-box2" checked="checked" ng-model="objprofile.dependentstatus" name="dependentstatus" ng-checked="objprofile.dependentstatus=='1'"/>
                              <label for="filled-in-box2">Dependent </label>
                           </div>
                           <!-- <div class="input-field col s6 l2" style="padding-top: 20px;">
                           <input type="checkbox" class="filled-in" id="filled-in-box1" checked="checked" ng-model="filterproj1" />
                              <input id="dependentstatus" type="checkbox" name="dependentstatus" class="validate" maxlength="100" ng-model="objprofile.dependentstatus" ng-checked="objprofile.dependentstatus=='1'">
                              <label for="dependentstatus" class="active">Dependent</label>
                           </div> -->
                           <div class="input-field col s6 l2" ng-show="objprofile.dependentstatus">
                              <input id="dependentname" type="text" name="dependentname" class="validate" maxlength="100" ng-model="objprofile.dependentname">
                              <label for="dependentname" class="active">Dependent Name</label>
                           </div>
                        </div>
                        <div class="row">
                           
                        </div>
                        <div class="row">
                           <div id="failure" class="red-text"></div>
                           <div class="input-field col s6 l4">
                              <p>
                                 <button class="btn waves-effect waves-light  cyan darken-2" type="submit" ng-click="submitted=true;">Save</button>
                              </p>
                           </div>
                        </div>
                     </form>
                  </div>
               </div>
            </div>
         </div>
      </div>
      
   </div>
</div>
<script>
    $("#search_val").keyup(function(event) {
        if (event.keyCode === 13) {
            $("#btntexser").click();
        }
    });
</script>

<script  type="text/javascript">

  


   // $( function() {
   //    $( "#datepicker" ).datepicker();
   // });
$('#serviceno').keyup(function()
   {
      var yourInput = $(this).val();
      $("#serviceno").val(yourInput.trim());
      re = /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi;
      var isSplChar = re.test(yourInput);
      if(isSplChar)
      {
         var no_spl_char = yourInput.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
         $(this).val(no_spl_char);
      }
 });

 $('#serviceno').keypress(function (e) {
    var regex = new RegExp("^[a-zA-Z0-9]+$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
        return true;
    }

    e.preventDefault();
    return false;
});

   var orginal_text = $('#esmidno').val();
      var regular_expression = '/^' + orginal_text +'/' ;
      $('#esmidno').keyup(function(){
          var current_text = $('#esmidno').val();
          if(current_text.match('^' + orginal_text +'') == null){
              $('#esmidno').val(orginal_text +current_text )
          }
      });
      function isNumberKey(evt)
      {
         var charCode = (evt.which) ? evt.which : event.keyCode;
         console.log(charCode);
         if (charCode != 46 && charCode != 45 && charCode > 31 && (charCode < 48 || charCode > 57))
           return false;
      
        return true;
      }
</script>
<style type="text/css">
   .ui-datepicker-calendar {
   display: none;
   }
   td {
   max-width: 25px;
   }
   .datepicker-dropdown {
   top: 0;
   left: 0;
   position: absolute;
   background-color: #fff;
   width: 20%;
   }
   .ng-table-pager {
      display: none;
   }
   .striped {
      display: block;
      height: 500px;
      overflow-y: scroll;
      overflow-x: scroll;
   }
   table, td  {
      border: 1px solid #d0cdcd;
      border-collapse: collapse;
   }
</style>