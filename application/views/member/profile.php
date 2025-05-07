<script type="text/javascript" src="<?php echo base_url("assets/js/app/members.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ng-file-upload.min.js")?>"></script>

<script src="https://code.jquery.com/jquery-1.12.4.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
<link rel="stylesheet" type="text/css" href="<?php echo base_url("assets/css/ng-table.min.css")?>" />
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ng-table.min.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ui-bootstrap-tpls-0.11.0.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/jquery.formatter.min.js")?>"></script> 
<script type="text/javascript">
   var memberid = "<?php echo $this->session->userdata('memberid')?>"
</script>  
<style> 
/*[type=text] {
    font-size: x-large!important; 
}
[type=email] {
    font-size: x-large!important; 
}*/
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
                           <img src="<?php echo base_url("assets/images/photo.png")?>" alt="" class="circle">
                        </div>
                        <div class="input-field col s6">
                           <h4 class="email-title">{{objprofile.firstname}} {{objprofile.lastname}} - {{objprofile.serviceno}}
                           </h4>
                           <div class="input-field col s6">
                           </div>
                        </div> 
                     </div>
                     <form ng-submit="profileform.$valid && savemember(objprofile)" id="profileform" name="profileform" novalidate>

                    <div ng-init="objprofile.agree=='1'"></div>
                        <table style="font-weight: bold;color: black !important;font-size: large !important;">
                           <tr>
                              <td style="padding-left: 80px;">
                                 Service No
                              </td>
                              <td> 
                           
                                 <input id="serviceno" name="serviceno" type="text" class="validate" maxlength="150" ng-model="objprofile.serviceno" disabled ng-class="{'submitted': submitted && profileform.serviceno.$invalid}"  >

                                 

                              </td>
                              <td style="padding-left: 80px;">
                                Rank
                              </td>
                              <td>
                                 <select  ng-model="objprofile.rankid" class="validate" name="rankid" data-ng-options=" r.lkvalid as r.description for r in rank" ng-class="{'submitted': submitted && profileform.rankid.$invalid}"  ng-required="true">
                              </select>
                              </td>
                           </tr>
                           <tr>
                              <td style="padding-left: 80px;">
                                 Name
                              </td>
                              <td>
                                 <input id="firstname" name="firstname" type="text" class="validate" maxlength="150" ng-model="objprofile.firstname" ng-class="{'submitted': submitted && profileform.firstname.$invalid}" ng-pattern="/^[a-zA-Z. ]*$/" disabled ng-pattern="/^[a-zA-Z. ]*$/">
                              </td>
                              <td style="padding-left: 80px;">
                                 Texco No
                              </td>
                              <td>
                              <input id="texcono" name="texcono" type="text" class="validate" maxlength="150" ng-model="objprofile.texcono" disabled>
                              </td>
                              
                              
                           </tr>

                           <tr>
                              <td style="padding-left: 80px;">
                                Father Name
                              </td>
                              <td>
                                 <input id="fathername" type="text" class="validate" maxlength="150" ng-model="objprofile.fathername" ng-class="{'submitted': submitted && profileform.fathername.$invalid}" ng-pattern="/^[a-zA-Z. ]*$/" disabled>
                              </td>
                              
                              <td style="padding-left: 80px;">
                                Gender
                              </td>
                              <td>
                                 <div class="input-field col s3 l2" style="padding-top: 15px;">
                                 <input name="gender" type="radio" id="male" value="0" ng-model="objprofile.genderid"  ng-checked="objprofile.genderid == '0'"/>
                                 <label for="male" style="font-size:12px;">Male</label>
                              </div>
                              <div class="input-field col s3 l2" style="padding-top: 15px; padding-left: 32px">
                                 <input name="gender" type="radio" id="femamale" value="1" ng-model="objprofile.genderid"  ng-checked="objprofile.genderid == '1'"/>
                                 <label for="female" style="font-size:12px;">Female</label>
                              </div>
                              
                              </td>
                              
                           </tr>

                           <tr>
                              <td style="padding-left: 80px;">
                                 Date of Birth
                              </td>
                              <td>
                              <input id="dob" class="dob" name="dob" ng-required="true" type="text" data-ng-model="objprofile.dob" ng-class="{'submitted': submitted && profileform.dob.$invalid}" disabled> 
                              </td>
                              <td style="padding-left: 80px;">
                                 Mobile No
                              </td>
                              <td>
                              <input id="mobile" name="mobile" type="text" class="validate" minlength="10" maxlength="10" ng-required="true" ng-model="objprofile.mobile" ng-class="{'submitted': submitted && profileform.mobile.$invalid}" onkeypress="return isNumberKey(event);">
                              </td>
                              
                           </tr>

                           <tr>
                              <td style="padding-left: 80px;">
                                 Address
                              </td>
                              <td  >
                                 

                              <input id="address" type="text" class="validate" maxlength="150" ng-model="objprofile.address"  ng-class="{'submitted': submitted && profileform.address.$invalid}" ng-change="comaddress(objprofile)" >
                              </td>
                              <td style="padding-left: 80px;">
                                Village
                              </td>
                              <td>
                                 <input id="village" type="text" name="village" class="validate" maxlength="150" ng-model="objprofile.village" ng-class="{'submitted': submitted && profileform.village.$invalid}" ng-change="comaddress(objprofile)" ng-pattern="/^[a-zA-Z. ]*$/">
                              </td>
                              
                           </tr>

                           <tr>
                              <td style="padding-left: 80px;">
                                 Region
                              </td>
                              <td>
                              <select name="regionid" ng-model="objprofile.regionid"  ng-class="{'submitted': submitted && profileform.regionid.$invalid}" data-ng-options=" rg.lkvalid as rg.description for rg in region" ng-change="comaddress(objprofile);cascadedistrict(objprofile.regionid)">
                              </select>
                              </td>
                              <td style="padding-left: 80px;">
                                District
                              </td>
                              <td>
                                 <select name="districtid" ng-model="objprofile.districtid" ng-class="{'submitted': submitted && profileform.districtid.$invalid}"  data-ng-options=" d.lkvalid as d.description for d in district" aria-required="true" ng-change="comaddress(objprofile);cascadetaluk(objprofile.districtid);">
                              </select>
                              
                              </td>
                              
                           </tr>

                           <tr>
                              <td style="padding-left: 80px;">
                                 Taluk
                              </td>
                              <td>
                              <select ng-model="objprofile.talukid" name="talukid" data-ng-options=" c.lkvalid as c.description for c in taluk" ng-class="{'submitted': submitted && profileform.talukid.$invalid}" ng-change="comaddress(objprofile)">
                              </select>
                              </td>
                              <td style="padding-left: 80px;">
                                State
                              </td>
                              <td>
                                 <select ng-model="objprofile.stateid" data-ng-options=" s.lkvalid as s.description for s in state"  ng-class="{'submitted': submitted && profileform.stateid.$invalid}" ng-change="comaddress(objprofile)">
                              </select>
                              
                              </td>
                              
                           </tr>

                           <tr>
                              <td style="padding-left: 80px;">
                                 Country
                              </td>
                              <td>
                              <select ng-model="objprofile.countryid" data-ng-options=" ct.lkvalid as ct.description for ct in country" ng-change="comaddress(objprofile)">
                              </select>
                              </td>
                              <td style="padding-left: 80px;">
                                Pincode
                              </td>
                              <td>
                                 <input  name="pincode" type="text" maxlength="6" ng-class="{'submitted': submitted && profileform.pincode.$invalid}" class="validate"  ng-model="objprofile.pincode" onkeypress="return isNumberKey(event);" ng-change="comaddress(objprofile)">
                              
                              </td>
                              
                           </tr>

                           <tr>
                              <td style="padding-left: 80px;">
                              <input id="comaddress" type="checkbox" name="comaddress" class="validate" maxlength="100" ng-model="objprofile.addressstatus" ng-change="comaddress(objprofile)" ng-checked="objprofile.addressstatus=='1'" ng-true-value="1" ng-false-value="0">
                              <label for="comaddress">Same Address</label>
                              </td>
                              <td colspan="3">
                              <input id="communicationaddress" type="text" name="communicationaddress" class="validate" maxlength="150" ng-model="objprofile.communicationaddress">
                              </td>
                           </tr>

                           <tr>
                              <td style="padding-left: 80px;">
                                 Aadhar No
                              </td>
                              <td>
                              <input id="aadhaarno" type="text" name="aadhaarno" class="validate" minlength="12" maxlength="12" ng-model="objprofile.aadhaarno" ng-class="{'submitted': submitted && profileform.aadhaarno.$invalid}" ng-pattern="/^[0-9]*$/" disabled>
                              </td>
                              <td style="padding-left: 80px;">
                                Account No
                              </td>
                              <td>
                                 <input id="accountno" type="text" name="accountno" ng-class="{'submitted': submitted && memberform.accountno.$invalid}" class="validate" maxlength="16" ng-model="objmember.accountno" onkeypress="return isNumberKey(event);" disabled>
                              </td>
                              
                           </tr>
                           <tr>
                              <td style="padding-left: 80px;">
                                 Nominee
                              </td>
                              <td>
                              <input id="nominee" type="text" class="validate" maxlength="150" ng-model="objprofile.nominee" disabled ng-pattern="/^[a-zA-Z. ]*$/">
                              </td>
                              <td style="padding-left: 80px;">
                                Nominee Relation
                              </td>
                              <td>
                                 <select ng-model="objprofile.nomineerelationid" data-ng-options=" rl.lkvalid as rl.description for rl in relations" disabled>
                                 </select>
                              </td>
                              
                           </tr>
                           <tr>
                              <td style="padding-left: 80px;">
                                 Army Qualification
                              </td>
                              <td>
                              <input id="armyqual" type="text" class="validate" maxlength="100" ng-model="objprofile.armyqual">
                              </td>
                              <td style="padding-left: 80px;">
                                Civil Qulaification
                              </td>
                              <td>
                                 <input id="civilqual" type="text" class="validate" maxlength="100" ng-model="objprofile.civilqual" disabled ng-pattern="/^[a-zA-Z. ]*$/">
                              </td>
                              
                           </tr>
                           <tr>
                              <td style="padding-left: 80px;">
                                 Religion
                              </td>
                              <td>
                              <select name="religion" id="religion" ng-model="objprofile.religionid"  data-ng-options=" r.lkvalid as r.description for r in religion"  ng-class="{'submitted': submitted && profileform.religionid.$invalid}" disabled>
                              </select>
                              </td>
                              <td style="padding-left: 80px;">
                                Caste
                              </td>
                              <td>
                                 <select  ng-model="objprofile.casteid" class="validate" name="caste" data-ng-options=" r.lkvalid as r.description for r in caste" ng-class="{'submitted': submitted && profileform.casteid.$invalid}" disabled>
                                 </select>
                              </td>
                              
                           </tr>
                           <tr>
                              <td style="padding-left: 80px;">
                                 Corps
                              </td>
                              <td>
                              <select name="corps" ng-model="objprofile.corpsid" data-ng-options=" rl.lkvalid as rl.description for rl in corp" disabled>
                              </select>
                              </td>
                              <td style="padding-left: 80px;">
                                Trade
                              </td>
                              <td>
                                 <select name="trade" ng-model="objprofile.tradeid" data-ng-options=" rl.lkvalid as rl.description for rl in trades" disabled>
                                 </select>
                              </td>
                              
                           </tr>
                           <tr>
                              <td style="padding-left: 80px;">
                                 Esmid No
                              </td>
                              <td>
                              <input id="esmidno" type="text" class="validate" maxlength="15" ng-model="objprofile.esmidno" value ="TN" disabled >
                              </td>
                              <td style="padding-left: 80px;">
                                Character
                              </td>
                              <td>
                                 <select  ng-model="objprofile.characterid" class="validate" name="character" data-ng-options=" r.lkvalid as r.description for r in character" disabled>
                              </select>
                              </td>
                              
                           </tr>

                           <tr>
                              <td style="padding-left: 80px;">
                                 Date Of Joining
                              </td>
                              <td>
                              <input id="doj" name="doj" type="date" class="datepicker" class="validate" ng-model="objprofile.doj"  ng-class="{'submitted': submitted && profileform.doj.$invalid}" disabled>
                              </td>
                              <td style="padding-left: 80px;">
                                Email
                              </td>
                              <td>
                                 <input id="email" type="email" name="email" class="validate"  ng-pattern="/^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/" maxlength="50" ng-model="objprofile.email" ng-class="{'submitted': submitted && profileform.email.$invalid}" disabled>
                              </select>
                              </td>
                              
                           </tr>

                           <tr>
                              <td style="padding-left: 80px;">
                                 PAN No
                              </td>
                              <td>
                              <input id="panno" type="text" name="panno" class="validate" maxlength="100" ng-model="objprofile.panno" disabled ng-pattern="/^[a-zA-Z. ]*$/">
                              </td>
                              <td style="padding-left: 80px;">
                                UAN No
                              </td>
                              <td>
                                 <input id="uanno" type="text" name="uanno" class="validate" maxlength="100" ng-model="objprofile.uanno" disabled>
                              </td>
                              
                           </tr>

                           <tr>
                              <td style="padding-left: 57px;">
                                 <div class="input-field col s6 l2" style="padding-top: 20px;">
                              <input id="dependentstatus" type="checkbox" name="dependentstatus" class="validate" maxlength="100" ng-model="objprofile.dependentstatus" ng-checked="objprofile.dependentstatus=='1'">
                              <label for="dependentstatus">Dependent</label>
                           </div>
                              </td>
                              <td >
                              <!-- <input id="panno" type="text" name="panno" class="validate" maxlength="100" ng-model="objprofile.panno" disabled> -->
                              </td>
                              <td style="padding-left: 80px;" >
                                Dependent Name
                              </td>
                              <td>
                                 <input id="dependentname" type="text" name="dependentname" class="validate" maxlength="100" ng-model="objprofile.dependentname" ng-disabled="objprofile.dependentstatus != 1">
                              </td>
                              
                           </tr>
                        </table>
                        <!-- <div class="row">
                           
                           <div class="input-field col s6 l2">
                              <input id="texcono" name="texcono" type="text" class="validate" maxlength="150" ng-model="objprofile.texcono" disabled>
                              <label for="texcono">Texco No</label>
                           </div>
                           <div class="input-field col s6 l2">
                              <input id="firstname" name="firstname" type="text" class="validate" maxlength="150" ng-model="objprofile.firstname" ng-required="true" ng-class="{'submitted': submitted && profileform.firstname.$invalid}" ng-pattern="/^[a-zA-Z. ]*$/" disabled>
                              <span ng-show="submitted && profileform.firstname.$error.pattern">Not a valid Name!</span>
                              <label for="firstname" data-error="Required">Name</label>
                           </div>
                              <input id="lastname" name="lastname" type="hidden" class="validate" maxlength="150" ng-model="objprofile.lastname">
                           <div class="input-field col s6 l2">
                              <input id="fathername" type="text" class="validate" maxlength="150" ng-model="objprofile.fathername" ng-class="{'submitted': submitted && profileform.fathername.$invalid}" ng-pattern="/^[a-zA-Z. ]*$/" disabled>
                              <span ng-show="submitted && profileform.fathername.$error.pattern">Not a valid Name!</span>
                              <label for="fathername">Father Name</label>
                           </div>
                           <div class="input-field col s6 l2">
                              <input id="dob" name="dob" ng-required="true" type="date" class="datepicker" type="text" data-ng-model="objprofile.dob" ng-class="{'submitted': submitted && profileform.dob.$invalid}" disabled>
                              <label for="dob" data-error="Required">Date of Birth</label>
                           </div>
                           <div class="input-field col s6 l2">
                              <select  ng-model="objprofile.rankid" class="validate" name="rankid" data-ng-options=" r.lkvalid as r.description for r in rank" ng-class="{'submitted': submitted && profileform.rankid.$invalid}" ng-required="true">
                              </select>
                              <label for="rankid" data-error="Required">Rank</label>
                           </div>
                            
                        </div>
                        <div class="row" style="padding-top: 12px;">
                           <div class="input-field col s6 l2">
                              <input id="mobile" name="mobile" type="text" class="validate" minlength="10" maxlength="10" ng-required="true" ng-model="objprofile.mobile" ng-class="{'submitted': submitted && profileform.mobile.$invalid}" onkeypress="return isNumberKey(event);">
                              <label for="mobile" data-error="Required">Mobile</label>
                           </div>
                           <div class="input-field col s6 l4">
                              <div class="input-field col s3 l2" style="padding-top: 15px;">
                                 <input name="gender" type="radio" id="male" value="0" ng-model="objprofile.genderid"  ng-checked="objprofile.genderid == '0'"/>
                                 <label for="male" style="font-size:12px;">Male</label>
                              </div>
                              <div class="input-field col s3 l2" style="padding-top: 15px; padding-left: 32px">
                                 <input name="gender" type="radio" id="femamale" value="1" ng-model="objprofile.genderid"  ng-checked="objprofile.genderid == '1'"/>
                                 <label for="female" style="font-size:12px;">Female</label>
                              </div>
                              <label for="gender" data-error="Required">Gender</label>
                           </div>
                           <div class="input-field col s6 l2">
                              <input id="address" type="text" class="validate" maxlength="150" ng-model="objprofile.address"  ng-class="{'submitted': submitted && profileform.address.$invalid}" ng-change="comaddress(objprofile)">
                              <label for="address" data-error="Required" >Address</label>
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
                        <div class="row" style="padding-top: 12px;">
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
                        <div class="row" style="padding-top: 12px;">
                           <div class="input-field col s6 l6">
                              <input id="communicationaddress" type="text" name="communicationaddress" class="validate" maxlength="150" ng-model="objprofile.communicationaddress">
                              <label for="communicationaddress">Address for communication</label>
                           </div>
                           <div class="input-field col s6 l2">
                              <input id="aadhaarno" type="text" name="aadhaarno" class="validate" minlength="12" maxlength="12" ng-model="objprofile.aadhaarno" ng-class="{'submitted': submitted && profileform.aadhaarno.$invalid}" ng-pattern="/^[0-9]*$/" disabled>
                              <span ng-show="submitted && profileform.aadhaarno.$error.pattern">Enter valid aadhaar number!</span>
                              <label for="aadhaarno">Aadhaar No</label>
                           </div>
                           <div class="input-field col s6 l2" ng-model="objmember.accountno">
                              <input id="accountno" type="text" name="accountno" ng-class="{'submitted': submitted && memberform.accountno.$invalid}" class="validate" maxlength="16" ng-model="objmember.accountno" onkeypress="return isNumberKey(event);" disabled>
                              <label for="accountno">Account No</label>
                           </div>
                           <div class="input-field col s6 l2">
                              <input id="nominee" type="text" class="validate" maxlength="150" ng-model="objprofile.nominee" disabled>
                              <label for="nominee">Nominee</label>
                           </div>
                        </div>
                        <div class="row" style="padding-top: 12px;">
                           <div class="input-field col s6 l2">
                              <select ng-model="objprofile.nomineerelationid" data-ng-options=" rl.lkvalid as rl.description for rl in relations" disabled>
                              </select>
                              <label>Nominee Relation</label>
                           </div>
                           
                           <div class="input-field col s6 l2">
                              <input id="armyqual" type="text" class="validate" maxlength="100" ng-model="objprofile.armyqual" disabled>
                              <label for="armyqual">Army Qualification</label>
                           </div>
                           <div class="input-field col s6 l2">
                              <select name="corps" ng-model="objprofile.corpsid" data-ng-options=" rl.lkvalid as rl.description for rl in corp" disabled>
                              </select>
                              <label for="corps">Corps</label>
                           </div>
                           <div class="input-field col s6 l2">
                              <select name="trade" ng-model="objprofile.tradeid" data-ng-options=" rl.lkvalid as rl.description for rl in trades" disabled>
                              </select>
                              <label for="trade">Trade</label>
                           </div>
                           <div class="input-field col s6 l2">
                              <input id="esmidno" type="text" class="validate" maxlength="15" ng-model="objprofile.esmidno" value ="TN" disabled>
                              <label for="esmidno">Esmid No</label>
                           </div>
                           <div class="input-field col s6 l2">
                              <select  ng-model="objprofile.characterid" class="validate" name="character" data-ng-options=" r.lkvalid as r.description for r in character" disabled>
                              </select>
                              <label for="character">Character</label>
                           </div>
                        </div>
                        <div class="row" style="padding-top: 12px;">
                           
                           <div class="input-field col s6 l2">
                              <select name="religion" id="religion" ng-model="objprofile.religionid"  data-ng-options=" r.lkvalid as r.description for r in religion"  ng-class="{'submitted': submitted && profileform.religionid.$invalid}" disabled>
                              </select>
                              <label for="religion" data-error="Required">Religion</label>
                           </div>
                           <div class="input-field col s6 l2">
                              <select  ng-model="objprofile.casteid" class="validate" name="caste" data-ng-options=" r.lkvalid as r.description for r in caste" ng-class="{'submitted': submitted && profileform.casteid.$invalid}" disabled>
                              </select>
                              <label for="caste" data-error="Required">Caste</label>
                           </div>
                           <div class="input-field col s6 l2">
                              <input id="civilqual" type="text" class="validate" maxlength="100" ng-model="objprofile.civilqual" disabled>
                              <label for="civilqual">Civil Qulaification</label>
                           </div>
                           <div class="input-field col s6 l2">
                              <input id="doj" name="doj" type="date" class="datepicker" class="validate" ng-model="objprofile.doj"  ng-class="{'submitted': submitted && profileform.doj.$invalid}" disabled>
                              <label for="doj">Date Of Joining</label>
                           </div>
                           <div class="input-field col s6 l2">
                              <input id="email" type="email" name="email" class="validate"  ng-pattern="/^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/" maxlength="50" ng-model="objprofile.email" ng-class="{'submitted': submitted && profileform.email.$invalid}" disabled>
                              <span ng-show="submitted && profileform.email.$error.pattern">Not a valid Email!</span>
                              <label for="email" data-error="Required">Email</label>
                           </div>
                           <div class="input-field col s6 l2" style="padding-top: 20px;">
                              <input id="dependentstatus" type="checkbox" name="dependentstatus" class="validate" maxlength="100" ng-model="objprofile.dependentstatus" ng-checked="objprofile.dependentstatus=='1'" disabled>
                              <label for="dependentstatus">Dependent</label>
                           </div>
                        </div>
                        <div class="row" style="padding-top: 12px;">
                           <div class="input-field col s6 l2">
                              <input id="panno" type="text" name="panno" class="validate" maxlength="100" ng-model="objprofile.panno" disabled>
                              <label for="panno">PAN NO</label>
                           </div>
                           <div class="input-field col s6 l2">
                              <input id="uanno" type="text" name="uanno" class="validate" maxlength="100" ng-model="objprofile.uanno" disabled>
                              <label for="uanno">UAN NO</label>
                           </div>
                           <div class="input-field col s6 l2" ng-show="objprofile.dependentstatus">
                              <input id="dependentname" type="text" name="dependentname" class="validate" maxlength="100" ng-model="objprofile.dependentname" disabled>
                              <label for="dependentname">Dependent Name</label>
                           </div>
                        </div> -->

                        
                
                        <div class="row" style="padding-left: 80px;">
                           <div id="failure" class="red-text"></div>
                           <div class="input-field col s6 l4">
                              <p>
                                 <button class="btn waves-effect waves-light  cyan darken-2" type="submit" >Save</button>
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
          if (charCode != 46 && charCode != 45 && charCode > 31
          && (charCode < 48 || charCode > 57))
           return false;
      
        return true;
      }
</script>