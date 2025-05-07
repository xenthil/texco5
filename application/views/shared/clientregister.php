<style>
[type=text] {
    /* font-size: x-large !important;  */
}
</style>
<form ng-submit="clientforms.$valid && saveclient(objclient,picFile)" id="clientforms" name="clientforms" novalidate>
    <div class="row" style="height:40px;">&nbsp;</div>
    <div class="row">
        <div class="col s12">
            <input type="hidden" ng-model="objclient.clientid">
            <div class="row">
                <div class="input-field col s6">
                    <input id="organization" name="organization" type="text" ng-class="{'submitted': submitted && clientforms.organization.$invalid}" class="validate" type="text" ng-model="objclient.organization" maxlength="250" ng-required="true" ng-minlength="3" aria-required="true">
                    <label for="organization" data-error="Required(min 3 chars)">Organization</label>
                </div>
                <div class="input-field col s6">
                    <input id="contactname" name="contactname" type="text" ng-class="{'submitted': submitted && clientforms.contactname.$invalid}"  class="validate" type="text" ng-model="objclient.contactname" maxlength="100" ng-required="true" ng-minlength="3" aria-required="true" ng-pattern="/^[a-zA-Z. ]*$/">
                              <span style="color:red" ng-show="submitted && clientforms.contactname.$error.pattern">Please enter valid name!</span>
                    <label for="contactname" data-error="Required(min 3 chars)">Contact Name</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s6">
                    <input id="mobile" name="mobile" type="text" ng-class="{'submitted': submitted && clientforms.mobile.$invalid}" class="validate" type="text" ng-model="objclient.mobile" maxlength="10" ng-required="true" ng-minlength="10" aria-required="true" onkeypress="return isNumberKey(event)">
                    <label for="mobile" data-error="Required(min 10 digits)">Mobile</label>
                </div>
                <div class="input-field col s6">
                    <input id="phone" name="phone" type="text" maxlength="15" class="validate" ng-model="objclient.phone" onkeypress="return isNumberKey(event);">
                    <label for="phone">Phone</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s6">
                    <input id="email" name="email" type="email" ng-class="{'submitted': submitted && clientforms.email.$invalid}" class="validate" ng-model="objclient.email" maxlength="100" ng-required="true">
                    <label for="email" data-error="Required">Email</label>
                </div>
                <div class="input-field col s6">
                    <input id="gstno" name="gstno" type="text" ng-class="{'submitted': submitted && clientforms.gstno.$invalid}" class="validate" ng-model="objclient.gstno" ng-pattern="/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/" maxlength="15" ng-required="true" aria-required="true">
                    <span style="color:red" ng-show="submitted && clientforms.gstno.$error.pattern">Not a valid GST IN!</span>
                    <label for="gstno" data-error="Required">GST IN</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s6">
                    <select name="deptid" ng-model="objclient.deptid" ng-class="{'submitted': submitted && clientforms.deptid.$invalid}" ng-required="true" data-ng-options=" d.lkvalid as d.description for d in dept" aria-required="true">
               </select>
                    <label for="clientdpt" data-error="Required">Department</label>
                </div>
                <div class="input-field col s6">
                    <input id="panno" name="panno" type="text" ng-class="{'submitted': submitted && clientforms.panno.$invalid}" class="validate" type="text" ng-model="objclient.panno" ng-pattern="/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/" maxlength="10" ng-required="true" aria-required="true">
                    <span style="color:red" ng-show="submitted && clientforms.panno.$error.pattern">Not a valid PAN number!</span>
                    <label for="panno" data-error="Required">PAN No</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s6">
                    <input id="tanno" name="tanno" type="text" ng-class="{'submitted': submitted && clientforms.tanno.$invalid}" class="validate" type="text" ng-model="objclient.tanno" ng-pattern="/^[A-Z]{4}[0-9]{5}[A-Z]{1}$/" maxlength="10" ng-required="true" aria-required="true">
                    <span ng-show="submitted && clientforms.tanno.$error.pattern">Not a valid TAN number!</span>
                    <label for="tanno" data-error="Required">TAN No</label>
                </div>
                <div class="input-field col s6">
                    <input id="addressline1" name="addressline1" type="text" ng-class="{'submitted': submitted && clientforms.addressline1.$invalid}" class="validate" type="text" ng-model="objclient.addressline1" maxlength="100" ng-required="true" ng-minlength="2" aria-required="true">
                    <label for="addressline1" data-error="Required">Address Line 1</label>
                </div>
            </div>
            <div class="row">
            </div>
            <div class="row">
                <div class="input-field col s6">
                    <input id="addressline2" name="addressline2" type="text" class="validate" ng-model="objclient.addressline2" maxlength="100" ng-minlength="3" aria-required="true">
                    <label for="addressline2">Address Line 2</label>
                </div>
                <div class="input-field col s6">
                    <input id="addressline3" name="addressline3" type="text" class="validate" ng-model="objclient.addressline3" maxlength="100" ng-minlength="3" aria-required="true">
                    <label for="addressline3">Address Line 3</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s6">
                    <input id="pincode" name="pincode" type="text" maxlength="6" ng-class="{'submitted': submitted && clientform.pincode.$invalid}" class="validate" ng-model="objclient.pincode" onkeypress="return isNumberKey(event);">
                    <label for="pincode" data-error="Required">Pincode</label>
                </div>
                <div class="input-field col s6">
                    <select name="talukid" ng-model="objclient.talukid" ng-class="{'submitted': submitted && clientforms.talukid.$invalid}" data-ng-options=" c.lkvalid as c.description for c in taluk" ng-required="true" aria-required="true">
               </select>
                    <label>Taluk</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s6">
                    <select name="districtid" ng-model="objclient.districtid" ng-class="{'submitted': submitted && clientforms.districtid.$invalid}" data-ng-options=" d.lkvalid as d.description for d in district" ng-required="true" aria-required="true">
               </select>
                    <label>District</label>
                </div>
                <div class="input-field col s6">
                    <select name="stateid" ng-model="objclient.stateid" ng-class="{'submitted': submitted && clientforms.stateid.$invalid}" data-ng-options=" s.lkvalid as s.description for s in state" ng-required="true" aria-required="true">
               </select>
                    <label>State</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s6">
                    <select name="countryid" ng-model="objclient.countryid" ng-class="{'submitted': submitted && clientforms.countryid.$invalid}" data-ng-options=" ct.lkvalid as ct.description for ct in country" ng-required="true" aria-required="true">
               </select>
                    <label>Country</label>
                </div>
                <div class="input-field col s6">
                    <select name="deptid" ng-model="objclient.deptid" ng-class="{'submitted': submitted && clientforms.deptid.$invalid}" ng-required="true" data-ng-options=" d.lkvalid as d.description for d in dept" aria-required="true">
               </select>
                    <label for="clientdpt" data-error="Required">Employer Department</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s6">
                    <select name="departmenttypeid" ng-model="objclient.departmenttypeid" ng-class="{'submitted': submitted && clientforms.departmenttypeid.$invalid}" data-ng-options=" dt.lkvalid as dt.description for dt in departmenttype" ng-required="true" aria-required="true">
               </select>
                    <label>Department Type</label>
                </div>
                <div class="input-field col s6">
                    <input id="department" name="department" type="text" ng-class="{'submitted': submitted && clientforms.department.$invalid}" ng-required="true" class="validate" ng-model="objclient.department" maxlength="100" ng-minlength="3" aria-required="true">
                    <label for="department" data-error="Required">Department Name</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s6">
                    <input minlength="6" maxlength="20" id="password" name="password" ng-class="{'submitted': submitted && clientforms.password.$invalid}" type="password" class="validate" type="text" ng-model="objclient.password" ng-required="true">
                    <label for="password" data-error="Required (min 6 chars)">Password</label>
                </div>
                <div class="input-field col s6">
                    <input id="con_password" name="con_password" ng-class="{'submitted': submitted && clientforms.con_password.$invalid}" type="password" class="validate" type="text" ng-model="objclient.con_password" ng-required="true">
                    <label for="con_password" data-error="Required">Confirm Password</label>
                </div>
            </div>
            <div class="row">
                <div class="file-field input-field">
                    <div class="btn">
                        <span>File</span>
                        <input type="file" ngf-select ng-model="picFile" name="file" accept="image/*" ng-change="changeName(picFile.name)" ngf-max-size="1MB" ngf-resize="{width: 512, height: 380}">
                    </div>
                    <div class="file-path-wrapper">
                        <input class="file-path validate" type="text" ng-model="objclient.image">
                    </div>
                    <span ng-show="!objclient.image.length">Please select Logo image!</span>
                    <br>
                    <!-- <i ng-show="clientforms.file.$error.maxSize">File too large
                  {{errorFile.size / 1000000|number:1}}MB: max 2M</i> -->
                    <img id="clientimage" ngf-thumbnail="picFile" class="thumb">
                    <span class="progress" ng-show="picFile.progress >= 0">
                  <div style="width:{{picFile.progress}}%"
                     ng-bind="picFile.progress + '%'"></div>
               </span>
                    <span class="err" ng-show="errorMsg">{{errorMsg}}</span>
                </div>
            </div>
        </div>
    </div>
    <div id="failure" class="red-text"></div>
    <div class="modal-footer">
        <button class="modal-action waves-effect waves-green btn-flat" type="submit" ng-click="submitted=true">
      Save
      </button>
        <a href="" class="modal-action modal-close waves-effect btn-flat ">Cancel</a>
    </div>
</form>
<script type="text/javascript">
    function isNumberKey(evt) {
        var charCode = (evt.which) ? evt.which : event.keyCode;
        console.log(charCode);
        if (charCode != 46 && charCode != 45 && charCode > 31 &&
            (charCode < 48 || charCode > 57))
            return false;


        return true;
    }
</script>