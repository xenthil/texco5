<script type="text/javascript" src="<?php echo base_url("assets/js/app/members.js")?>"></script>
<script src="https://code.jquery.com/jquery-1.12.4.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
<link rel="stylesheet" type="text/css" href="<?php echo base_url("assets/css/ng-table.min.css")?>" />
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ng-table.min.js")?>"></script>
<!-- <script type="text/javascript" src="<?php echo base_url("assets/js/lib/ng-pattern-restrict.js")?>"></script> -->
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ui-bootstrap-tpls-0.11.0.js")?>"></script>
<script type="text/javascript">
   var memberid = 0
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
    /* text-transform: uppercase; */
}
input {
  color: black !important;
  /* font-size: large !important;  */
}
</style>
<div class="parallax-container" style="background-color: rgba(0, 12, 78, 0.9)">
   <div class="row">
      <div class="container">
         <div class="col s12 m6 l6">
            <div class="pagebannertext white-text">Register</div>
         </div>
         <div class="col s12 m6 l6 right-align">
            <div class="dumheight hide-on-small-only"> </div>
            <div class=""> <a href="<?php echo base_url()?>" class="breadcrumb">Home</a><span class="breadcrumb">Members</span> <span class="breadcrumb">Register</span> </div>
         </div>
      </div>
   </div>
   <div class="parallax"><img src="<?php echo base_url("assets/images/breadcrumbbanner.jpg")?>">
   </div>
</div>
<div class="row" ng-app="appAdminMember">
<div class="container" ng-controller="ctrlAdminMember" ng-cloak>
   <!-- Modal Structure -->
   <div id="modal1" class="modal modal-fixed-footer" style="max-width: 550px; max-height:90%;">
      <div class="modal-content">
         <nav class="blue" style="position: fixed;margin-top: 0px; z-index:999">
            <div class="left col s1 m1 l1">
               <div class="white-text"><a href=""><i class="modal-action modal-close mdi white-text mdi-arrow-left"></i></a> </div>
            </div>
            <div class="col s11 m11 l11">
               <div class="li white-text" id="mcaption">Add Employee</div>
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
                  <form id="registerform" ng-submit="registerform.$valid && savemember(objregister)"  name="registerform" novalidate>
                     <table style="font-weight: bold;">
                        <span style="color:red"> &nbsp;&nbsp; &nbsp;&nbsp; * &nbsp;&nbsp; The correct service number should be entered,Registration will be cancelled if mismatch.</span>
                        <tr>
                           <td style="padding-left: 80px;">
                              Service No <span style="color: red;"> *</span>
                           </td>
                           <td style="padding-left: 0px;padding-right: 100px;">
                              <input id="serviceno"  name="serviceno" type="text" class="validate" maxlength="150" ng-model="objregister.serviceno" ng-required="true" ng-class="{'submitted': submitted && registerform.serviceno.$invalid}" ng-pattern="/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/" ng-change="getservicenoexist(objregister.serviceno)" onkeypress="return blockSpecialChar(event)">
                              <span ng-show="servicenovalid == 'Exist'" style="color:red">ServiceNo already Exist! <a href="<?php echo base_url("Texco/vacancy")?>">Click Here to apply</a> </span>
                           </td>
                           <td style="padding-left: 80px;">
                              Name <span style="color: red;"> *</span>
                           </td>
                           <td style="padding-left: 0px;padding-right: 100px;">
                              <input id="firstname" type="text"  name="firstname" class="validate" maxlength="250" ng-model="objregister.firstname" ng-required="true" ng-class="{'submitted': submitted && registerform.firstname.$invalid}" ng-pattern="/^[a-zA-Z.]*$/">
                              <span style="color:red" ng-show="submitted && registerform.firstname.$error.pattern">Please enter valid name!</span>
                              <input id="lastname" type="hidden"  name="lastname"  class="validate" maxlength="150" ng-model="objregister.lastname" >
                           </td>
                        </tr>
                        <tr>
                           <td style="padding-left: 80px;">
                              Texco No
                           </td>
                           <td style="padding-left: 0px;padding-right: 100px;">
                              <input id="texcono" name="texcono" type="text" class="validate" maxlength="150" ng-model="objprofile.texcono" disabled  ng-pattern="/^[a-zA-Z. ]*$/">
                           </td>
                           <td style="padding-left: 80px;">
                              Father Name
                           </td>
                           <td style="padding-left: 0px;padding-right: 100px;">
                              <input id="fathername" type="text" name="fathername" class="validate" maxlength="150" ng-model="objregister.fathername" ng-class="{'submitted': submitted && registerform.fathername.$invalid}" ng-pattern="/^[a-zA-Z. ]*$/">
                              <span style="color:red" ng-show="submitted && registerform.fathername.$error.pattern">Please enter valid name!</span>
                           </td>
                        </tr>
                        <tr>
                           <td style="padding-left: 80px;">
                              Date of Birth
                           </td>
                           <td style="padding-left: 0px;padding-right: 100px;">
                              <input id="dob" type="text" class="dob" name="dob" ng-model="objregister.dob" ng-class="{'submitted': submitted && registerform.dob.$invalid}" autocomplete="off">
                           </td>
                           <td style="padding-left: 80px;">
                              Gender
                           </td>
                           <td >
                              <div class="input-field col s2 l3" style="padding-top: 12px;">
                                 <input name="gender" type="radio" id="male" value="0" ng-model="objregister.genderid" ng-checked="objregister.genderid == '0'"/>
                                 <label for="male" style="font-size:12px;">Male</label>
                              </div>
                              <div class="input-field col s2 l3" style="padding-top: 12px;">
                                 <input name="gender" type="radio" id="female" value="1" ng-model="objregister.genderid" ng-checked="objregister.genderid == '1'"/>
                                 <label for="female" style="font-size:12px;">Female</label>
                              </div>
                           </td>
                        </tr>
                        <tr>
                           <td style="padding-left: 80px;">
                              Mobile No <span style="color: red;"> *</span>
                           </td>
                           <td style="padding-left: 0px;padding-right: 100px;">
                              <input id="mobile" type="text" name="mobile" class="validate" minlength="10" maxlength="10" ng-required="true" ng-model="objregister.mobile" ng-class="{'submitted': submitted && registerform.mobile.$invalid}" onkeypress="return isNumberKey(event);">
                           </td>
                           <td style="padding-left: 80px;">
                              Rank <span style="color: red;"> *</span>
                           </td>
                           <td style="padding-left: 0px;padding-right: 100px;">
                              <select  ng-model="objregister.rankid" class="validate" name="rankid" data-ng-options=" r.lkvalid as r.description for r in rank" ng-class="{'submitted': submitted && registerform.rankid.$invalid}" ng-required="true">
                              </select>
                           </td>
                        </tr>
                        <tr>
                           <td style="padding-left: 80px;">
                              Address
                           </td>
                           <td style="padding-left: 0px;padding-right: 100px;">
                              <input id="address" type="text" name="address" class="validate" maxlength="150" ng-model="objregister.address" ng-class="{'submitted': submitted && registerform.address.$invalid}" ng-change="comaddress(objregister)">
                           </td>
                           <td style="padding-left: 80px;">
                              Village
                           </td>
                           <td style="padding-left: 0px;padding-right: 100px;">
                              <input id="village" type="text" name="village" class="validate" maxlength="150" ng-model="objregister.village" ng-class="{'submitted': submitted && registerform.village.$invalid}" ng-change="comaddress(objregister)">
                           </td>
                        </tr>
                        <tr>
                           <td style="padding-left: 80px;">
                              Region
                           </td>
                           <td style="padding-left: 0px;padding-right: 100px;">
                              <select name="regionid" ng-model="objregister.regionid"  ng-class="{'submitted': submitted && registerform.regionid.$invalid}" data-ng-options="rg.region_id as rg.region_name for rg in regionDetails" ng-change="getDistrictDetails(objregister.regionid);">
                              </select>
                           </td>
                           <td style="padding-left: 80px;">
                              District
                           </td>
                           <td style="padding-left: 0px;padding-right: 100px;">
                              <select name="districtid" ng-model="objregister.districtid" ng-class="{'submitted': submitted && registerform.districtid.$invalid}"  data-ng-options=" d.district_id as d.district_name for d in districtDetails" ng-change="getTalukDetails(objregister.districtid);">
                              </select>
                              <label>District</label>
                           </td>
                        </tr>
                        <tr>
                           <td style="padding-left: 80px;">
                              Taluk
                           </td>
                           <td style="padding-left: 0px;padding-right: 100px;">
                              <select ng-model="objregister.talukid" name="talukid" data-ng-options=" c.taluk_id as c.taluk_name for c in Taluks" ng-class="{'submitted': submitted && registerform.talukid.$invalid}" ng-change="comaddress(objregister)">
                              </select>
                              <label for="talukid">Taluk</label>
                           </td>
                           <td style="padding-left: 80px;">
                              State
                           </td>
                           <td style="padding-left: 0px;padding-right: 100px;">
                              <select ng-model="objregister.stateid" name="stateid"  data-ng-options=" s.lkvalid as s.description for s in state" ng-class="{'submitted': submitted && registerform.stateid.$invalid}" ng-change="comaddress(objregister)">
                              </select>
                              <label for="stateid">State</label>
                           </td>
                        </tr>
                        <tr>
                           <td style="padding-left: 80px;">
                              Country
                           </td>
                           <td style="padding-left: 0px;padding-right: 100px;">
                              <select ng-model="objregister.countryid" data-ng-options=" ct.lkvalid as ct.description for ct in country" ng-change="comaddress(objregister)">
                              </select>
                           </td>
                           <td style="padding-left: 80px;">
                              Pincode
                           </td>
                           <td style="padding-left: 0px;padding-right: 100px;">
                              <input  name="pincode" type="text" maxlength="6" ng-class="{'submitted': submitted && registerform.pincode.$invalid}" class="validate"  ng-model="objregister.pincode" onkeypress="return isNumberKey(event);" ng-change="comaddress(objregister)">
                           </td>
                        </tr>
                        <tr>
                           <td style="padding-left: 80px; ">
                              <input id="comaddress" type="checkbox" name="comaddress" class="validate" maxlength="100" ng-model="objregister.addressstatus" ng-change="comaddress(objregister)" ng-checked="objregister.addressstatus=='1'" ng-true-value="1" ng-false-value="0">
                              <label for="comaddress">Same Address</label>
                           </td>
                           <td style="padding-left: 0px;padding-right: 100px;" colspan="4">
                           <input id="communicationaddress" type="text" name="communicationaddress" class="validate" maxlength="150" ng-model="objregister.communicationaddress">
                           </td>
                        </tr>
                        <tr>
                           <td style="padding-left: 80px;">
                              Aadhar No
                           </td>
                           <td style="padding-left: 0px;padding-right: 100px;">
                              <input id="aadhaarno" type="text" name="aadhaarno" class="validate" minlength="12" maxlength="12" ng-model="objregister.aadhaarno" ng-class="{'submitted': submitted && registerform.aadhaarno.$invalid}" ng-pattern="/^[0-9]*$/">
                              <span style="color:red" ng-show="submitted && registerform.aadhaarno.$error.pattern">Enter valid aadhaar number!</span>
                           </td>
                           <td style="padding-left: 80px;">
                              Account No
                           </td>
                           <td style="padding-left: 0px;padding-right: 100px;">
                              <input id="accountno" type="text" name="accountno" ng-class="{'submitted': submitted && registerform.accountno.$invalid}" class="validate" maxlength="16" ng-model="objregister.accountno" onkeypress="return isNumberKey(event);" placeholder="IOB only" ng-disabled="true">
                           </td>
                        </tr>
                        <tr>
                           <td style="padding-left: 80px;">
                              Nominee
                           </td>
                           <td style="padding-left: 0px;padding-right: 100px;">
                              <input id="nominee" type="text" name="nominee" class="validate" maxlength="150" ng-model="objregister.nominee">
                           </td>
                           <td style="padding-left: 80px;">
                              Nominee Relation
                           </td>
                           <td style="padding-left: 0px;padding-right: 100px;">
                              <select ng-model="objregister.nomineerelationid" name="nomineerelationid" data-ng-options=" rl.lkvalid as rl.description for rl in relations">
                              </select>
                           </td>
                        </tr>
                        <tr>
                           <td style="padding-left: 80px;">
                              Army Qualification
                           </td>
                           <td style="padding-left: 0px;padding-right: 100px;">
                              <input id="armyqual" type="text" name="armyqual" class="validate" maxlength="100" ng-model="objregister.armyqual">
                           </td>
                           <td style="padding-left: 80px;">
                              Civil Qulaification
                           </td>
                           <td style="padding-left: 0px;padding-right: 100px;">
                              <input id="civilqual" type="text" name="civilqual" class="validate" maxlength="100" ng-model="objregister.civilqual">
                           </td>
                        </tr>
                        <tr>
                           <td style="padding-left: 80px;">
                              Religion
                           </td>
                           <td style="padding-left: 0px;padding-right: 100px;">
                              <select name="religion" id="religion" ng-model="objregister.religionid" data-ng-options=" r.lkvalid as r.description for r in religion" ng-class="{'submitted': submitted && registerform.religion.$invalid}">
                              </select>
                           </td>
                           <td style="padding-left: 80px;">
                              Caste
                           </td>
                           <td style="padding-left: 0px;padding-right: 100px;">
                              <select name="casteid" id="casteid" ng-model="objregister.casteid" data-ng-options=" r.lkvalid as r.description for r in caste" ng-class="{'submitted': submitted && registerform.casteid.$invalid}">
                              </select>
                           </td>
                        </tr>
                        <tr>
                           <td style="padding-left: 80px;">
                              Corps
                           </td>
                           <td style="padding-left: 0px;padding-right: 100px;">
                              <select name="corps" ng-model="objregister.corpsid" name="corps" data-ng-options=" rl.lkvalid as rl.description for rl in corp">
                              </select>
                           </td>
                           <td style="padding-left: 80px;">
                              Trade
                           </td>
                           <td style="padding-left: 0px;padding-right: 100px;">
                              <select name="trade" ng-model="objregister.tradeid" name="trade" data-ng-options=" rl.lkvalid as rl.description for rl in trades">
                              </select>
                           </td>
                        </tr>
                        <tr>
                           <td style="padding-left: 80px;">
                              Ex ID No (Issued by AD/DD)
                           </td>
                           <td style="padding-left: 0px;padding-right: 100px;">
                              <input id="esmidno" type="text" placeholder="" name="esmidno" class="validate" maxlength="15" ng-model="objregister.esmidno" ng-class="{'submitted': submitted && registerform.esmidno.$invalid}" value ="TN">
                           </td>
                           <td style="padding-left: 80px;">
                              Character
                           </td>
                           <td style="padding-left: 0px;padding-right: 100px;">
                              <select name="character" id="character" ng-model="objregister.characterid"  data-ng-options=" r.lkvalid as r.description for r in character">
                              </select>
                              </select>
                           </td>
                        </tr>
                        <tr>
                           <td style="padding-left: 80px;">
                              Date Of Joining
                           </td>
                           <td style="padding-left: 0px;padding-right: 100px;">
                              <input id="doj" name="doj" type="date" class="dob" ng-model="objprofile.doj"  ng-class="{'submitted': submitted && profileform.doj.$invalid}" disabled>
                           </td>
                           <td style="padding-left: 80px;">
                              Email
                           </td>
                           <td style="padding-left: 0px;padding-right: 100px;">
                              <input id="email" type="email" name="email" class="validate"  ng-pattern="/^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/" maxlength="50" ng-model="objregister.email" ng-class="{'submitted': submitted && registerform.email.$invalid}">
                              <span style="color:red" ng-show="submitted && registerform.email.$error.pattern">Not a valid Email!</span>
                              </select>
                           </td>
                        </tr>
                        <tr>
                           <td style="padding-left: 80px;">
                              PAN No
                           </td>
                           <td style="padding-left: 0px;padding-right: 100px;">
                              <input id="panno" type="text" name="panno" class="validate" minlength="10" maxlength="10" ng-model="objregister.panno" ng-class="{'submitted': submitted && registerform.panno.$invalid}" ng-pattern="/[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}/">
                              <span style="color:red" ng-show="submitted && registerform.panno.$error.pattern">Enter valid Pan number!</span>
                           </td>
                           <td style="padding-left: 80px;">
                              UAN No
                           </td>
                           <td style="padding-left: 0px;padding-right: 100px;">
                              <input id="uanno" type="text" name="uanno" class="validate" minlength="15" maxlength="15" ng-model="objregister.uanno" ng-class="{'submitted': submitted && registerform.uanno.$invalid}" ng-pattern="/^[0-9]*$/" ng-disabled="true">
                              <span style="color:red" ng-show="submitted && registerform.uanno.$error.pattern">Enter valid UAN number!</span>
                           </td>
                        </tr>
                        <tr>
                           <td style="padding-left: 80px;">
                                 <input id="dependentstatus" type="checkbox" name="dependentstatus" class="validate" maxlength="100" ng-model="objregister.dependentstatus" ng-true-value="1" ng-false-value="0" ng-disabled="true">
                                 <label for="dependentstatus">Dependent</label>
                           </td>
                           <td style="padding-left: 0px;padding-right: 100px;" ng-show="objregister.dependentstatus">
                              Dependent Name
                           </td>
                           <td>
                                 <input ng-show="objregister.dependentstatus" id="dependentname" type="text" name="dependentname" class="validate" maxlength="100" ng-model="objregister.dependentname">
                           </td>
                        </tr>
                     </table>

                     <div style="padding-left: 80px;" class="row">
                        <div id="failure" class="red-text"></div>
                        <div class="input-field col s6 l4">
                           <p>
                              <button class="btn waves-effect waves-light  cyan darken-2" type="submit" ng-click="submitted=true;" ng-disabled="DisableButton">Save</button>
                              <button class="waves-green btn-flat" type="button"  ng-click="cancelregister()">
                              Cancel
                              </button>
                           </p>
                        </div>
                     </div>
                     <div id="success" class="green-text"></div>
                  </form>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
<script type="text/javascript">

   function blockSpecialChar(e) {
      var k = e.keyCode;
      return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8   || (k >= 48 && k <= 57));
   }
   $('#serviceno').keyup(function() {
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

      // $('.datepicker').pickadate({
      //    labelMonthNext: 'Go to the next month',
      //    labelMonthPrev: 'Go to the previous month',
      //    labelMonthSelect: 'Pick a month from the dropdown',
      //    labelYearSelect: 'Pick a year from the dropdown',
      //    selectMonths: true,
      //    selectYears: 58,
      //    max: true,
      //    onSet: function( arg ){
      //       if ( 'select' in arg ){ //prevent closing on selecting month/year
      //             this.close();
      //       }
      //    }
      // })
</script>
