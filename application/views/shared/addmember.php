
<style>
input {
    width: 100%;
    text-transform: uppercase;
}
</style>
<!-- Modal Structure -->
<div id="modal1" class="modal modal-fixed-footer" style="max-height:90%;">
   <div class="modal-content">
      <nav class="blue" style="position: fixed;margin-top: 0px;z-index:999;">
         <div class="left col s1 m1 l1">
            <div class="white-text"><a href=""><i class="modal-action modal-close mdi white-text mdi-arrow-left"></i></a> </div>
         </div>
         <div class="col s11 m11 l11">
            <div class="li white-text" id="mcaption">Add Employee</div>
         </div>
      </nav>
      <div class="row" style="padding: 24px;">
         <form ng-submit="memberform.$valid && savemember(objmember)" id="memberform" name="memberform" novalidate>
            <div class="row" style="height:40px;">&nbsp;</div>
            <div class="col s12">
               <input type="hidden" ng-model="objmember.memberid">
               <div class="row">
                  <span style="color:red"> &nbsp;&nbsp; &nbsp;&nbsp; * &nbsp;&nbsp; The correct service number should be entered,Registration will be cancelled if mismatch.</span>
                  <br>
                  <div class="input-field col s6">
                     <input id="serviceno" name="serviceno" type="text" class="validate" maxlength="15" ng-model="objmember.serviceno" ng-required="true" ng-class="{'submitted': submitted && memberform.serviceno.$invalid}" ng-change="getservicenoexist(objmember.serviceno)">
                     <span ng-show="servicenovalid == 'Exist'" style="color: red">ServiceNo already Exist! <a href="<?php echo base_url("Texco/vacancy")?>">Click Here to apply</a> </span>
                     <label for="serviceno"  data-error="Required">Service No(Army No)</label>
                  </div>
                  <div class="input-field col s6">
                     <input id="firstname" name="firstname" type="text" class="validate" maxlength="250" ng-model="objmember.firstname" ng-required="true"  ng-class="{'submitted': submitted && memberform.firstname.$invalid}" ng-pattern="/^[a-zA-Z. ]*$/">
                     <span ng-show="submitted && memberform.firstname.$error.pattern">Not a valid Name!</span>
                     <label for="firstname" data-error="Required">Name</label>
                  </div>
                  <input id="lastname" type="hidden"  name="lastname"  class="validate" maxlength="150" ng-model="objregister.lastname" >
               </div>
               <div class="row">
                  <div class="input-field col s6">
                     <input id="fathername" name="fathername" type="text" class="validate" maxlength="150" ng-model="objmember.fathername" ng-class="{'submitted': submitted && memberform.fathername.$invalid}">
                     <span ng-show="submitted && memberform.fathername.$error.pattern" ng-pattern="/^[a-zA-Z. ]*$/">Not a valid Name!</span>
                     <label for="fathername" data-error="Required">Father's Name</label>
                  </div>
                  <div class="input-field col s6">
                     <input id="dob" name="dob" type="date" class="datepicker" class="validate" ng-model="objmember.dob" ng-class="{'submitted': submitted && memberform.dob.$invalid}">
                     <label for="dob" data-error="Required" style="position: absolute !important;top: 0 !important;bottom: 0px !important;left: 0 !important;right: 0 !important;z-index: 10 !important;transform: unset !important;">Date Of Birth</label>
                  </div>
               </div>
               <div class="row">
                  <div class="input-field col s6">
                     <input id="email"  id="email" type="email" maxlength="150" class="validate" ng-model="objmember.email">
                     <label for="email">Email</label>
                  </div>
                  <div class="input-field col s6">
                     <input id="mobile"  name="mobile" type="tel" ng-minlength="10" maxlength="10" class="validate" ng-model="objmember.mobile" ng-required="true"  ng-class="{'submitted': submitted && memberform.mobile.$invalid }" onkeypress="return isNumberKey(event);">
                     <label for="mobile" data-error="Required">Mobile</label>
                  </div>
               </div>
               <div class="row">
                  <div class="input-field col s6">
                     <label for="gender" data-error="Required">Gender</label>
                     <div style="padding-top: 25px">
                        <div class="input-field col s3">
                           <input name="gender" type="radio" id="male" value="0" ng-model="objmember.genderid" ng-checked="objmember.genderid == '0'"/>
                           <label for="male" style="font-size:12px;">Male</label>
                        </div>
                        <div class="input-field col s3">
                           <input name="gender" type="radio" id="female" value="1" ng-model="objmember.genderid" ng-checked="objmember.genderid == '1'"/>
                           <label for="female" style="font-size:12px;">Female</label>
                        </div>
                     </div>
                  </div>
                   <div class="input-field col s6 ">
                     <input id="aadhaarno" type="text" name="aadhaarno" class="validate" minlength="12" maxlength="12" ng-model="objmember.aadhaarno" ng-class="{'submitted': submitted && memberform.aadhaarno.$invalid}" ng-pattern="/^[0-9]*$/">
                     <span ng-show="submitted && memberform.aadhaarno.$error.pattern">Enter valid aadhaar number!</span>
                     <label for="aadhaarno" data-error="Enter valid Aadhaar No">Aadhaar No</label>
                  </div>
                  <!-- <div class="input-field col s6">
                     <input id="doj" name="doj" type="date" class="datepicker" class="validate" ng-model="objmember.doj" >
                     <label for="doj">Date Of Joining</label>
                  </div> -->
               </div>
               <div class="row">
                  <div class="input-field col s6">
                     <input id="address1" type="text" name="address1" class="validate" maxlength="150" ng-model="objmember.address" ng-class="{'submitted': submitted && memberform.address1.$invalid}" ng-change="comaddress(objmember)">
                     <label for="address1" data-error="Required">Address</label>
                  </div>
                  <div class="input-field col s6">
                     <input id="village" type="text" name="village" class="validate" maxlength="150" ng-model="objmember.village" ng-class="{'submitted': submitted && memberform.village.$invalid}" ng-change="comaddress(objmember)">
                     <label for="village" data-error="Required">Village</label>
                  </div>
               </div>
               <div class="row">
                   <div class="input-field col s6">
                     <input id="pincode" name="pincode" type="text" maxlength="6" ng-class="{'submitted': submitted && memberform.pincode.$invalid}" class="validate"  ng-model="objmember.pincode" onkeypress="return isNumberKey(event);">
                     <label for="pincode" data-error="Required">Pincode</label>
                  </div>
                  <div class="input-field col s6">
                     <select name="regionid" ng-model="objmember.regionid" ng-change="cascadedistrict(objmember.regionid);comaddress(objmember)" ng-class="{'submitted': submitted && memberform.regionid.$invalid}" data-ng-options=" rg.lkvalid as rg.description for rg in region" >
                     </select>
                     <label for="region" data-error="Required">Region</label>
                  </div>
               </div>
               <div class="row">
               <div class="input-field col s6">
                     <select name="districtid" ng-model="objmember.districtid" ng-class="{'submitted': submitted && memberform.districtid.$invalid}"  data-ng-options=" d.lkvalid as d.description for d in district" ng-change="comaddress(objmember);cascadetaluk(objmember.districtid);">
                     </select>
                     <label>District</label>
                  </div>
                  <div class="input-field col s6">
                     <select ng-model="objmember.talukid" name="talukid" data-ng-options=" c.lkvalid as c.description for c in taluk" ng-class="{'submitted': submitted && memberform.talukid.$invalid}" ng-change="comaddress(objmember)">
                     </select>
                     <label for="talukid" data-error="Required">Taluk</label> 
                  </div>
               </div>
               <div class="row">
                  <div class="input-field col s6">
                     <select name="stateid" ng-model="objmember.stateid" data-ng-options=" s.lkvalid as s.description for s in state" ng-class="{'submitted': submitted && memberform.stateid.$invalid}" ng-change="comaddress(objmember)">
                     </select>
                     <label for="stateid" data-error="Required">State</label>
                  </div>
                  <div class="input-field col s6">
                     <input id="comaddress" type="checkbox" name="comaddress" class="validate" maxlength="100" ng-model="objmember.addressstatus" ng-change="comaddress(objmember)" ng-checked="objmember.addressstatus=='1'" ng-true-value="1" ng-false-value="0">
                     <label for="comaddress">Same Address</label>
                  </div>
                  <!-- <div class="input-field col s6">
                     <select name="countryid" ng-model="objmember.countryid" data-ng-options=" ct.lkvalid as ct.description for ct in country" ng-class="{'submitted': submitted && memberform.countryid.$invalid}" ng-change="comaddress(objmember)">
                     </select>
                     <label for="countryid" data-error="Required">Country</label>
                  </div> -->
               </div>
               <div class="row">
                  <div class="input-field col s12">
                     <input id="communicationaddress" type="text" name="communicationaddress" class="validate" maxlength="150" ng-model="objmember.communicationaddress">
                     <label for="communicationaddress" id="commaddress">Address for communication</label>
                  </div>
               </div>
               <div class="row">
                  <div class="input-field col s6">
                     <input id="nominee" type="text" maxlength="150" class="validate" ng-model="objmember.nominee" >
                     <label for="nominee">Nominee</label>
                  </div>
               </div>
               <div class="row">
                  <div class="input-field col s6">
                     <select ng-model="objmember.nomineerelationid" data-ng-options=" rl.lkvalid as rl.description for rl in relations">
                     </select>
                     <label>Nominee Relation</label>
                  </div>
                  <div class="input-field col s6 " ng-model="objmember.accountno">
                     <input id="accountno" type="text" name="accountno" ng-class="{'submitted': submitted && memberform.accountno.$invalid}" class="validate" maxlength="16" ng-model="objmember.accountno" onkeypress="return isNumberKey(event);" placeholder="IOB Only">
                     <label for="accountno">Account No</label>
                  </div>
               </div>
               <div class="row">
                  <div class="input-field col s6">
                     <select  ng-model="objmember.religionid" class="validate" name="religionid" id="religion" data-ng-options=" r.lkvalid as r.description for r in religion" ng-class="{'submitted': submitted && memberform.religionid.$invalid}" >
                     </select>
                     <label for="religion">Religion</label>
                  </div>
                  <div class="input-field col s6">
                     <select  ng-model="objmember.casteid" class="validate" name="casteid" data-ng-options=" r.lkvalid as r.description for r in caste" ng-class="{'submitted': submitted && memberform.casteid.$invalid}" >
                     </select>
                     <label for="caste">Caste</label>
                  </div>
               </div>
               <div class="row">
                  <div class="input-field col s6">
                     <input id="armyqual" type="text" name="armyqual" class="validate" maxlength="100" ng-model="objmember.armyqual">
                     <label for="armyqual">Army Qualification</label>
                  </div>
                  <div class="input-field col s6">
                     <input id="civilqual" name="civilqual" type="text" class="validate" maxlength="50" ng-model="objmember.civilqual">
                     <label for="civilqual"> Civil Qualification</label>
                  </div>
               </div>
               <div class="row">
                  <div class="input-field col s6">
                     <select  ng-model="objmember.rankid" class="validate" name="rankid" data-ng-options=" r.lkvalid as r.description for r in rank" ng-class="{'submitted': submitted && memberform.rankid.$invalid}" ng-required="true">
                     </select>
                     <label for="rankid" data-error="Required">Rank</label>
                  </div>
                  <div class="input-field col s6">
                     <select  ng-model="objmember.corpsid" class="validate" name="corpsid" data-ng-options=" co.lkvalid as co.description for co in corp">
                     </select>
                     <label for="corps">Corps</label>
                  </div>
               </div>
               <div class="row">
                  <div class="input-field col s6">
                     <select  ng-model="objmember.tradeid" class="validate" name="tradeid" data-ng-options=" tr.lkvalid as tr.description for tr in trades">
                     </select>
                     <label for="trade">Trade</label>
                  </div>
                  <div class="input-field col s6">
                     <input id="esmidno" type="text" name="esmidno" class="validate" maxlength="15" ng-model="objmember.esmidno" ng-class="{'submitted': submitted && memberform.esmidno.$invalid}" value ="TN">
                     <label for="esmidno">Ex ID No (Issued by AD/DD)</label>
                  </div>
               </div>
               <div class="row">
                  <div class="input-field col s6">
                     <select  ng-model="objmember.characterid" class="validate" name="character" data-ng-options=" r.lkvalid as r.description for r in character">
                     </select>
                     <label for="character">Character</label>
                  </div>
                  <div class="input-field col s6">
                     <input id="dependentstatus" type="checkbox" name="dependentstatus" class="validate" maxlength="100" ng-model="objmember.dependentstatus" ng-checked="objmember.dependentstatus == 1"  ng-true-value="1" ng-false-value="0">
                     <label for="dependentstatus">Dependent</label>
                  </div>
               </div>
               <div class="row">
                  <div class="input-field col s6" ng-show="objmember.dependentstatus">
                     <input id="dependentname" type="text" name="dependentname" class="validate" maxlength="100" ng-model="objmember.dependentname">
                     <label for="dependentname">Dependent Name</label>
                  </div>
               </div>
               <div id="failure" class="red-text"></div>
            </div>
      </div>
   </div>
   <div class="modal-footer">
   <button class="modal-action waves-effect waves-green btn-flat" type="submit" ng-click="submitted=true;">
   Save
   </button>
   <a href="" class="modal-action modal-close waves-effect btn-flat ">Cancel</a>
   </div>
   </form>
</div>
<script>

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

   $('#datepicker').pickadate({
      labelMonthNext: 'Go to the next month',
      labelMonthPrev: 'Go to the previous month',
      labelMonthSelect: 'Pick a month from the dropdown',
      labelYearSelect: 'Pick a year from the dropdown',
      selectMonths: true,
      selectYears: 58,
      max: true,
      onSet: function( arg ){
         if ( 'select' in arg ){ //prevent closing on selecting month/year
               this.close();
         }
      }
   })  
   
</script>