<script type="text/javascript" src="<?php echo base_url("assets/js/app/members.js")?>"></script>
<link rel="stylesheet" type="text/css" href="<?php echo base_url("assets/css/ng-table.min.css")?>" />
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ng-table.min.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ui-bootstrap-tpls-0.11.0.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/jquery.formatter.min.js")?>"></script> 
<script type="text/javascript">
   var memberid = "<?php echo $_REQUEST['memberid']; ?>";
</script>       
<div class="parallax-container" style="background-color: rgba(0, 12, 78, 0.9)">
   <div class="row">
      <div class="container">
         <div class="col s12 m6 l6">
            <div class="pagebannertext white-text">Profile</div>
         </div>
         <div class="col s12 m6 l6 right-align">
            <div class="dumheight hide-on-small-only"> </div>
            <div class=""> <a href="<?php echo base_url('member/dashboard')?>" class="breadcrumb">Home</a> <span class="breadcrumb">Profile</span> </div>
         </div>
      </div>
   </div>
   <div class="parallax"><img src="<?php echo base_url("assets/images/breadcrumbbanner.jpg")?>">
   </div>
</div>
<div class="row" ng-app="appAdminMember">
   <div class="container" ng-controller="ctrlAdminMember">
      <!-- Modal Structure -->
      <div id="modal1" class="modal modal-fixed-footer" style="max-width: 550px; max-height:90%;">
         <div class="modal-content">
            <nav class="blue" style="position: fixed;margin-top: 0px; z-index:999">
               <div class="left col s1 m1 l1">
                  <div class="white-text"><a href=""><i class="modal-action modal-close mdi white-text mdi-arrow-left"></i></a> </div>
               </div>
               <div class="col s11 m11 l11">
                  <div class="li white-text" id="mcaption">Edit Profile</div>
               </div>
            </nav>
         </div>
         <div class="modal-footer">
         </div>
      </div>
      <div id="" class="section">
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
                              <a  href="<?php echo base_url('admin/members')?>" style="background: #f3a10d;color: #fff !important;float:right;" class="modal-action waves-effect waves-green btn-flat" type="submit" id="btntexser">Back</a>
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
                              <input id="serviceno" name="serviceno" type="text" class="validate" maxlength="150" ng-model="objprofile.serviceno" ng-required="true" ng-class="{'submitted': submitted && profileform.serviceno.$invalid}">
                              <label for="serviceno" data-error="Required">Service No</label>
                           </div>
                           <div class="input-field col s6 l2">
                              <input id="texcono" name="texcono" type="text" class="validate" maxlength="150" ng-model="objprofile.texcono" disabled>
                              <label for="texcono">Texco No</label>
                           </div>
                           <div class="input-field col s6 l2">
                              <input id="firstname" name="firstname" type="text" class="validate" maxlength="150" ng-model="objprofile.firstname" ng-required="true" ng-class="{'submitted': submitted && profileform.firstname.$invalid}" ng-pattern="/^[a-zA-Z. ]*$/">
                              <span ng-show="submitted && profileform.firstname.$error.pattern">Not a valid Name!</span>
                              <label for="firstname" data-error="Required">Name</label>
                           </div>
                              <input id="lastname" name="lastname" type="hidden" class="validate" maxlength="150" ng-model="objprofile.lastname">
                           <div class="input-field col s6 l2">
                              <input id="fathername" type="text" class="validate" maxlength="150" ng-model="objprofile.fathername" ng-class="{'submitted': submitted && profileform.fathername.$invalid}" ng-pattern="/^[a-zA-Z. ]*$/">
                              <span ng-show="submitted && profileform.fathername.$error.pattern">Not a valid Name!</span>
                              <label for="fathername">Father Name</label>
                           </div>
                           <div class="input-field col s6 l2">
                              <input id="dob" name="dob" ng-required="true" type="date" class="datepicker" type="text" data-ng-model="objprofile.dob" ng-class="{'submitted': submitted && profileform.dob.$invalid}">
                              <label for="dob" data-error="Required">Date of Birth</label>
                           </div>
                            <div class="input-field col s6 l2">
                              <input id="email" type="email" name="email" class="validate"  ng-pattern="/^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/" maxlength="50" ng-model="objprofile.email" ng-class="{'submitted': submitted && profileform.email.$invalid}">
                              <span ng-show="submitted && profileform.email.$error.pattern">Not a valid Email!</span>
                              <label for="email" data-error="Required">Email</label>
                           </div>
                        </div>
                        <div class="row">
                           <div class="input-field col s6 l2">
                              <input id="mobile" name="mobile" type="text" class="validate" minlength="10" maxlength="10" ng-required="true" ng-model="objprofile.mobile" ng-class="{'submitted': submitted && profileform.mobile.$invalid}" onkeypress="return isNumberKey(event);">
                              <label for="mobile" data-error="Required">Mobile</label>
                           </div>
                           <div class="input-field col s6 l4">
                              <div class="input-field col s3 l2" style="padding-top: 15px;">
                                 <input name="gender" type="radio" id="male" value="0" ng-model="objprofile.genderid"  ng-checked="objprofile.genderid == '0'"/>
                                 <label for="male" style="font-size:12px;">Male</label>
                              </div>
                              <div class="input-field col s3 l2" style="padding-top: 15px;">
                                 <input name="gender" type="radio" id="femamale" value="1" ng-model="objprofile.genderid"  ng-checked="objprofile.genderid == '1'"/>
                                 <label for="female" style="font-size:12px;">Female</label>
                              </div>
                              <label for="gender" data-error="Required">Gender</label>
                           </div>
                           <div class="input-field col s6 l2">
                              <input id="address" type="text" class="validate" maxlength="150" ng-model="objprofile.address"  ng-class="{'submitted': submitted && profileform.address.$invalid}" ng-change="comaddress(objprofile)">
                              <label for="address" data-error="Required">Address</label>
                           </div>
                           <div class="input-field col s6 l2">
                              <input id="village" type="text" name="village" class="validate" maxlength="150" ng-model="objprofile.village" ng-class="{'submitted': submitted && profileform.village.$invalid}" ng-change="comaddress(objprofile)">
                              <label for="village">Village</label>
                           </div>
                           <div class="input-field col s6 l2">
                              <select name="regionid" ng-model="objprofile.regionid"  ng-class="{'submitted': submitted && profileform.regionid.$invalid}" data-ng-options=" rg.lkvalid as rg.description for rg in region" ng-change="comaddress(objprofile);cascadedistrict(objprofile.regionid)">
                              </select>
                              <label for="region">Region</label>
                           </div>
                        </div>
                        <div class="row">
                           <div class="input-field col s6 l2">
                              <select name="districtid" ng-model="objprofile.districtid" ng-class="{'submitted': submitted && profileform.districtid.$invalid}"  data-ng-options=" d.lkvalid as d.description for d in district" aria-required="true" ng-change="comaddress(objprofile);cascadetaluk(objprofile.districtid);">
                              </select>
                              <label>District</label>
                           </div>
                           <div class="input-field col s6 l2">
                              <select ng-model="objprofile.talukid" name="talukid" data-ng-options=" c.lkvalid as c.description for c in taluk" ng-class="{'submitted': submitted && profileform.talukid.$invalid}" ng-change="comaddress(objprofile)">
                              </select>
                              <label for="talukid">Taluk</label>
                           </div>
                           <div class="input-field col s6 l2">
                              <select ng-model="objprofile.stateid" data-ng-options=" s.lkvalid as s.description for s in state"  ng-class="{'submitted': submitted && profileform.stateid.$invalid}" ng-change="comaddress(objprofile)">
                              </select>
                              <label>State</label>
                           </div>
                           <div class="input-field col s6 l2">
                              <select ng-model="objprofile.countryid" data-ng-options=" ct.lkvalid as ct.description for ct in country" ng-change="comaddress(objprofile)">
                              </select>
                              <label>Country</label>
                           </div>
                           <div class="input-field col s6 l2">
                              <input  name="pincode" type="text" maxlength="6" ng-class="{'submitted': submitted && profileform.pincode.$invalid}" class="validate"  ng-model="objprofile.pincode" onkeypress="return isNumberKey(event);" ng-change="comaddress(objprofile)">
                              <label for="pincode">Pincode</label>
                           </div>
                           <div class="input-field col s6 l2">
                              <input id="comaddress" type="checkbox" name="comaddress" class="validate" maxlength="100" ng-model="objprofile.addressstatus" ng-change="comaddress(objprofile)" ng-checked="objprofile.addressstatus=='1'" ng-true-value="1" ng-false-value="0">
                              <label for="comaddress">Same Address</label>
                           </div>
                        </div>
                        <div class="row">
                           <div class="input-field col s6 l6">
                              <input id="communicationaddress" type="text" name="communicationaddress" class="validate" maxlength="150" ng-model="objprofile.communicationaddress">
                              <label for="communicationaddress">Address for communication</label>
                           </div>
                           <div class="input-field col s6 l2">
                              <input id="aadhaarno" type="text" name="aadhaarno" class="validate" minlength="12" maxlength="12" ng-model="objprofile.aadhaarno" ng-class="{'submitted': submitted && profileform.aadhaarno.$invalid}" ng-pattern="/^[0-9]*$/">
                              <span ng-show="submitted && profileform.aadhaarno.$error.pattern">Enter valid aadhaar number!</span>
                              <label for="aadhaarno">Aadhaar No</label>
                           </div>
                           <div class="input-field col s6 l2" ng-model="objmember.accountno">
                              <input id="accountno" type="text" name="accountno" ng-class="{'submitted': submitted && memberform.accountno.$invalid}" class="validate" maxlength="16" ng-model="objmember.accountno" onkeypress="return isNumberKey(event);">
                              <label for="accountno">Account No</label>
                           </div>
                           <div class="input-field col s6 l2">
                              <input id="nominee" type="text" class="validate" maxlength="150" ng-model="objprofile.nominee">
                              <label for="nominee">Nominee</label>
                           </div>
                        </div>
                        <div class="row">
                           <div class="input-field col s6 l2">
                              <select ng-model="objprofile.nomineerelationid" data-ng-options=" rl.lkvalid as rl.description for rl in relations">
                              </select>
                              <label>Nominee Relation</label>
                           </div>
                           <div class="input-field col s6 l2">
                              <select  ng-model="objprofile.rankid" class="validate" name="rankid" data-ng-options=" r.lkvalid as r.description for r in rank" ng-class="{'submitted': submitted && profileform.rankid.$invalid}" ng-required="true">
                              </select>
                              <label for="rankid" data-error="Required">Rank</label>
                           </div>
                           <div class="input-field col s6 l2">
                              <input id="armyqual" type="text" class="validate" maxlength="100" ng-model="objprofile.armyqual">
                              <label for="armyqual">Army Qualification</label>
                           </div>
                           <div class="input-field col s6 l2">
                              <select name="corps" ng-model="objprofile.corpsid" data-ng-options=" rl.lkvalid as rl.description for rl in corp">
                              </select>
                              <label for="corps">Corps</label>
                           </div>
                           <div class="input-field col s6 l2">
                              <select name="trade" ng-model="objprofile.tradeid" data-ng-options=" rl.lkvalid as rl.description for rl in trades">
                              </select>
                              <label for="trade">Trade</label>
                           </div>
                           <div class="input-field col s6 l2">
                              <input id="esmidno" type="text" class="validate" maxlength="15" ng-model="objprofile.esmidno" value ="TN">
                              <label for="esmidno">Esmid No</label>
                           </div>
                        </div>
                        <div class="row">
                           <div class="input-field col s6 l2">
                              <select  ng-model="objprofile.characterid" class="validate" name="character" data-ng-options=" r.lkvalid as r.description for r in character">
                              </select>
                              <label for="character">Character</label>
                           </div>
                           <div class="input-field col s6 l2">
                              <select name="religion" id="religion" ng-model="objprofile.religionid"  data-ng-options=" r.lkvalid as r.description for r in religion"  ng-class="{'submitted': submitted && profileform.religionid.$invalid}" >
                              </select>
                              <label for="religion" data-error="Required">Religion</label>
                           </div>
                           <div class="input-field col s6 l2">
                              <select  ng-model="objprofile.casteid" class="validate" name="caste" data-ng-options=" r.lkvalid as r.description for r in caste" ng-class="{'submitted': submitted && profileform.casteid.$invalid}" >
                              </select>
                              <label for="caste" data-error="Required">Caste</label>
                           </div>
                           <div class="input-field col s6 l2">
                              <input id="civilqual" type="text" class="validate" maxlength="100" ng-model="objprofile.civilqual">
                              <label for="civilqual">Civil Qulaification</label>
                           </div>
                           <div class="input-field col s6 l2">
                              <input id="doj" name="doj" type="date" class="datepicker" class="validate" ng-model="objprofile.doj"  ng-class="{'submitted': submitted && profileform.doj.$invalid}" disabled>
                              <label for="doj">Date Of Joining</label>
                           </div>
                           <div class="input-field col s6 l2">
                              <input id="panno" type="text" name="panno" class="validate" maxlength="100" ng-model="objprofile.panno">
                              <label for="panno">PAN NO</label>
                           </div>
                           
                        </div>
                        <div class="row">
                           <div class="input-field col s6 l2">
                              <input id="uanno" type="text" name="uanno" class="validate" maxlength="100" ng-model="objprofile.uanno">
                              <label for="uanno">UAN NO</label>
                           </div>
                           <div class="input-field col s6 l2" style="padding-top: 20px;">
                              <input id="dependentstatus" type="checkbox" name="dependentstatus" class="validate" maxlength="100" ng-model="objprofile.dependentstatus" ng-checked="objprofile.dependentstatus=='1'">
                              <label for="dependentstatus">Dependent</label>
                           </div>
                           <div class="input-field col s6 l2" ng-show="objprofile.dependentstatus">
                              <input id="dependentname" type="text" name="dependentname" class="validate" maxlength="100" ng-model="objprofile.dependentname">
                              <label for="dependentname">Dependent Name</label>
                           </div>
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
<script  type="text/javascript">
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
          if (charCode != 46 && charCode != 45 && charCode > 31
          && (charCode < 48 || charCode > 57))
           return false;
      
        return true;
      }
</script>