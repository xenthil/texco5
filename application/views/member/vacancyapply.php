<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.8.4/moment.min.js"></script>  
<script type="text/javascript" src="<?php echo base_url("assets/js/app/newvacancymember.js") ?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ng-file-upload.min.js") ?>"></script>

<link rel="stylesheet" type="text/css" href="<?php echo base_url("assets/css/ng-table.min.css") ?>" />
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ng-table.min.js") ?>"></script>
<!-- <script type="text/javascript" src="<?php echo base_url("assets/js/lib/ng-pattern-restrict.js") ?>"></script> -->
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ui-bootstrap-tpls-0.11.0.js") ?>"></script>
<script type="text/javascript">
    var memberid = <?php echo $memberid ?>;
    vacancypage = 1;
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
                <div class="pagebannertext white-text">Apply Vacancy</div>
            </div>
            <div class="col s12 m6 l6 right-align">
                <div class="dumheight hide-on-small-only"> </div>
                <div class=""> <a href="<?php echo base_url() ?>" class="breadcrumb">Home</a> <span
                        class="breadcrumb">Apply
                        Vacancy</span> </div>


            </div>
        </div>
    </div>
    <div class="parallax"><img src="<?php echo base_url("assets/images/breadcrumbbanner.jpg") ?>">
    </div>
</div>
<div class="row" ng-app="appAdminMember">
    <div class="container" ng-controller="ctrlAdminMember" ng-cloak>
        <!-- Modal Structure -->
        <div id="modal1" class="modal modal-fixed-footer" style="max-width: 550px; max-height:90%;">
            <div class="modal-content">
                <nav class="blue" style="position: fixed;margin-top: 0px; z-index:999">
                    <div class="left col s1 m1 l1">
                        <div class="white-text"><a href=""><i
                                    class="modal-action modal-close mdi white-text mdi-arrow-left"></i></a> </div>
                    </div>
                    <div class="col s11 m11 l11">
                        <div class="li white-text" id="mcaption">Add Dependent</div>

                    </div>
                </nav>
            </div>
            <div class="modal-footer">
            </div>
        </div>
        <div id="" class="section">


            <div class="sec-selection"  ng-show="option==1">
                <p ng-click="seloption(1)"> Upload method</p>
                <p ng-click="seloption(2)">Form Method</p>

            </div>
      
            <div class="row" ng-show="objregister.applycount==0">
                <div id="Client-details" class="col s12">
                    <div class="email-content-wrap">
                        <div class="row">
                        <div class="container" ng-show="option==1">
                            <form id="uploadform"
                                ng-submit="uploadform.$valid && uploadvacancydoc(objregister,picFile)"
                                name="uploadform" novalidate ng-show="succes==0">


                                <p>Download the vacancy upload document <a
                                        href="<?php echo base_url('/assets/document/vacancydownload.pdf') ?>"
                                        download="">Click Here</a></p>
                                <table style="font-weight: bold;">



                                    <div class="row">
                                        <p>Upload your scanned document</p>

                                        <div class="file-field input-field">
                                            <div class="btn">
                                                <span>File</span>
                                                <input type="file" ngf-select ng-model="picFile" name="file"
                                                    accept=".pdf" ngf-max-size="1MB">
                                            </div>
                                            <div class="file-path-wrapper">
                                                <input class="file-path validate" type="text"
                                                    ng-model="objclient.image">
                                            </div>
                                            <span ng-show="!objclient.image.length">Please select Document!</span>
                                            <br>
                                            <!-- <i ng-show="clientform.file.$error.maxSize">File too large
                                 {{errorFile.size / 1000000|number:1}}MB: max 2M</i> -->
                                            <img id="clientimage" ngf-thumbnail="picFile" class="thumb">
                                            <span class="progress" ng-show="picFile.progress >= 0">
                                                <div style="width:{{picFile.progress}}%"
                                                    ng-bind="picFile.progress + '%'"></div>
                                            </span>
                                            <span class="err" ng-show="errorMsg">{{errorMsg}}</span>
                                        </div>
                                    </div>

                                    </table>
                    







                       


                        <div style="padding-left: 80px;" class="row">
                            <div id="failure" class="red-text"></div>

                            <div class="input-field col s6 l4">
                                <p>
                                    <button class="btn waves-effect waves-light  cyan darken-2" type="submit"
                                        ng-click="submitted=true;" ng-disabled="DisableButton">Save</button>

                                </p>
                            </div>
                        </div>
                        <div id="success" class="green-text"></div>
                        </form>
                    </div>
                    </div>

                 



                    <div class="container" >
                    <form id="registerform" ng-submit=" saveapplynew()"
                        name="registerform" novalidate ng-show="succes==0">
                        <table style="font-weight: bold;">
                            <div class="container">
                                <div class="row">


                                    <div class="col s6">
                                        <label for="name" style="font-size:12px;"> Name <span style="color: red;">
                                                *</span></label>

                                        <input id="firstname" type="text" name="firstname" class="validate"
                                            maxlength="250" ng-model="objregister.firstname" ng-required="true"
                                            ng-class="{'submitted': submitted && registerform.firstname.$invalid}"
                                            ng-pattern="/^[a-zA-Z. ]*$/" disabled>
                                        <span style="color:red"
                                            ng-show="submitted && registerform.firstname.$error.pattern">Please
                                            enter valid
                                            name!</span>


                                    </div>
                                    <div class="col s6">
                                        <label for="name" style="font-size:12px;"> Service Number <span style="color: red;">
                                                *</span></label>

                                        <input id="serviceno" type="text" name="serviceno" class="validate"
                                            maxlength="250" ng-model="objregister.serviceno" ng-required="true"
                                            ng-class="{'submitted': submitted && registerform.serviceno.$invalid}" disabled
                                           >
                                        <span style="color:red"
                                            ng-show="submitted && registerform.serviceno.$error.pattern">Please
                                            enter valid
                                            service number</span>


                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col s6">
                                        <label for="name" style="font-size:12px;"> Ex- Servicemen ID No (Issued by DD/AD
                                            office) <span style="color: red;">
                                                *</span></label>

                                        <input id="esmidno" type="text" placeholder="" name="esmidno" class="validate"
                                            maxlength="15" ng-model="objregister.esmidno"
                                            ng-class="{'submitted': submitted && registerform.esmidno.$invalid}"
                                            value="TN">


                                    </div>
                                    <div class="col s6">

                                        <label for="dob" style="font-size:12px;"> Date of Discharge (mm-dd-yyyy)<span
                                                style="color: red;">
                                                *</span></label>
                                        <input id="dateofdischarge" type="date" name="dateofdischarge"
                                            class="datepicker" class="validate" ng-required="true"
                                            ng-model="objregister.dateofdischarge"
                                            ng-class="{'submitted': submitted && registerform.dateofdischarge.$invalid}">
                                    </div>

                                </div>

                                <div class="row">
                                    <div class="col s6">

                                        <label for="dob" style="font-size:12px;"> Date of Birth (mm-dd-yyyy)<span
                                                style="color: red;">
                                                *</span></label>
                                        <input id="dob" type="date" name="dob" class="datepicker" class="validate"
                                            ng-required="true" ng-model="objregister.dob"
                                            ng-class="{'submitted': submitted && registerform.dob.$invalid}">
                                    </div>
                                    <div class="col s6">

                                        <label for="aadhaarno" style="font-size:12px;"> Aadhar No<span
                                                style="color: red;">
                                                *</span></label>

                                        <input id="aadhaarno" type="text" name="aadhaarno" class="validate"
                                            minlength="12" maxlength="12" ng-required="true"
                                            ng-model="objregister.aadhaarno"
                                            ng-class="{'submitted': submitted && registerform.aadhaarno.$invalid}"
                                            ng-pattern="/^[0-9]*$/">
                                        <span style="color:red"
                                            ng-show="submitted && registerform.aadhaarno.$error.pattern">Enter
                                            valid
                                            aadhaar
                                            number!</span>
                                    </div>
                                
                                </div>


                            
                                <div class="row">
                                    <div class="col s6">

                                        <label for="eduqual" style="font-size:12px;"> Address<span
                                                style="color: red;">
                                                *</span></label>

                                        <input id="communicationaddress" type="text" name="communicationaddress"
                                            class="validate" ng-required="true" maxlength="500"
                                            ng-model="objregister.communicationaddress"
                                            ng-class="{'submitted': submitted && registerform.communicationaddress.$invalid}">
                                    </div>
                                    <div class="col s6">
                                    <label for="applyfoor" style="font-size:12px;"> Apply For<span
                                                style="color: red;">
                                                *</span></label>
                                    <select name="applyfor"  ng-model="objregister.applyfor" ng-required="true" >
                  <option value="Exserviceman" >Exserviceman</option>
                  <option value="Dependent">Dependent</option>
               

               </select>
                                    </div>



                                    <!-- <div class="col s6">
                                        <label for="eduqual" style="font-size:12px;"> Address 2<span
                                                style="color: red;">
                                                *</span></label>

                                        <input id="communicationaddress" type="text" name="communicationaddress"
                                            class="validate" ng-required="true" maxlength="500"
                                            ng-model="objregister.village"
                                            ng-class="{'submitted': submitted && registerform.communicationaddress.$invalid}">
                                    </div> -->
                                    <!-- <div class="col s6">
                                    <label for="gender" style="font-size:12px;"> Gender <span style="color: red;">
                                          *</span></label>
                                    <div class="row">
                                       <div class="input-field col s2 l3">
                                          <input name="gender" type="radio" id="male" value="0"
                                             ng-model="objregister.depgender" ng-checked="objregister.depgender == '0'" />
                                          <label for="male" style="font-size:12px;">Male</label>
                                       </div>
                                       <div class="input-field col s2 l3">
                                          <input name="depgender" type="radio" id="female" value="1"
                                             ng-model="objregister.depgender" ng-checked="objregister.depgender == '1'" />
                                          <label for="female" style="font-size:12px;">Female</label>
                                       </div>
                                    </div>
                                 </div> -->
                                </div>

                                <!-- <select name="regionid" ng-model="objregister.regionid"  ng-class="{'submitted': submitted && registerform.regionid.$invalid}" data-ng-options="rg.region_id as rg.region_name for rg in regionDetails" ng-change="getDistrictDetails(objregister.regionid);">
                              </select> -->

                              <div class="row">
                              <div class="col  s6">
               
                                
               <label for="projectid" >Project No</label>
               <select name="projectid" ng-model="memhistory.projectid"  ng-class="{'submitted': submitted && memhistory.projectid.$invalid}" data-ng-options="prr as prr.projectno for prr in projects" ng-change="getSelectedProjects(memhistory.projectid);">
                 </select>
           
</div>
<div class="col  s6">

                 <label for="jobmasterid" > Category </label>
                 <select name="jobmasterid" ng-model="memhistory.jobmasterid"  ng-class="{'submitted': submitted && memhistory.jobmasterid.$invalid}" data-ng-options="rg as rg.code for rg in jobmaster" id="jobmasterid" ng-change="getSelectedCategory(memhistory.jobmasterid);">
                 </select>
            
</div>

                              </div>
                                <div class="row">
                                    <div class="col s6">


                                        <label for="mobile" style="font-size:12px;"> Mobile No <span
                                                style="color: red;">
                                                *</span></label>

                                        <input id="mobile" type="text" name="mobile" class="validate" minlength="10"
                                            maxlength="10" ng-required="true" ng-model="objregister.mobile"
                                            ng-class="{'submitted': submitted && registerform.mobile.$invalid}">

                                    </div>

                                    <div class="col s6">
                                        <label for="civilqual" style="font-size:12px;"> Educational qualification<span
                                                style="color: red;">
                                                *</span></label>

                                        <!-- <input id="civilqual" type="text" name="civilqual" class="validate"
                                            ng-required="true" maxlength="150" ng-model="objregister.civilqual"
                                            ng-class="{'submitted': submitted && registerform.civilqual.$invalid}"> -->

                                         


                             

                                        <select name="civilqual"  ng-model="objregister.civilqual" ng-required="true"  ng-class="{'submitted': submitted && registerform.civilqual.$invalid}">
                  <option value="SSLC" >SSLC</option>
                  <option value="HSC">HSC</option>
                  <option value="PG">PG</option>
                  <option value="UG">UG</option>
                  <option value="Below SSLC">Below SSLC</option>
                  

               </select>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col s6">
                                        <label for="eduqual" style="font-size:12px;"> Additional Qualification (If
                                            Any)<span style="color: red;">
                                                *</span></label>

                                        <input id="additionalqualification" type="text" name="additionalqualification"
                                            class="validate" ng-required="true" maxlength="150"
                                            ng-model="objregister.additionalqualification"
                                            ng-class="{'submitted': submitted && registerform.additionalqualification.$invalid}">
                                    </div>

                                    <div class="col s6">
                                        <label for="preference" style="font-size:12px;"> Preference <span
                                                style="color: red;">
                                                *</span></label>
                                        <div class="row">


                                        <select name="preference"  ng-model="objregister.preference" ng-required="true"  ng-class="{'submitted': submitted && registerform.preference.$invalid}">
                  <option value="Driver" >Driver</option>
                  <option value="SG">SG</option>
                  <option value="HSG">HSG</option>
                  <option value="ASO">ASO</option>
                  <option value="JA">JA</option>
                  <option value="GUN MAN">GUN MAN</option>
                  <option value="OTHERS">OTHERS</option>

               </select>
                                            <!-- <div class="input-field col s6">
                                                <input name="preference" type="radio" id="Driver" value="Driver"
                                                    ng-model="objregister.preference"
                                                    ng-checked="objregister.preference == 'Driver'" ng-required="true"  />
                                                <label for="Driver" style="font-size:12px;">Driver</label>
                                            </div> -->
                                            <!-- <div class="input-field col s6">
                                                <input name="preference" type="radio" id="SecurityGuard"
                                                    value="Security Guard" ng-model="objregister.preference"
                                                    ng-checked="objregister.preference == 'Security Guard'" />
                                                <label for="SecurityGuard" style="font-size:12px;">Security
                                                    Guard</label>
                                            </div> -->
                                        </div>
                                    </div>
                                    <!-- <div class="col s6">
                                    <label for="technicalqualification" style="font-size:12px;"> Preference <span style="color: red;">
                                          *</span></label>

                                    <input id="technicalQualification" type="text" name="technicalQualification"
                                       class="validate" ng-required="true" maxlength="150" ng-model="objregister.technicalQualification"
                                       ng-class="{'submitted': submitted && registerform.technicalQualification.$invalid}">
                                 </div> -->
                                </div>

                                <div class="row">
                                    <div class="col s6">
                                        <label for="specialskills" style="font-size:12px;"> Place of job Preferred<span
                                                style="color: red;">
                                                *</span></label>


                                        <select ng-model="objregister.jobdistrictid"
                                            data-ng-options=" s.lkvalid as s.description for s in alldistrict"
                                            ng-class="{'submitted': submitted && registerform.jobdistrictid.$invalid}" ng-required="true" name="jobdistrictid"
                                        >
                                        </select>
                                        
                                        


                                    </div>
                                    <div class="col s6">
                                        <label for="anywhere" style="font-size:12px;"> Place of job Preferred any where
                                            in TamilNadu <span style="color: red;">
                                                *</span></label>
                                        <div class="row">


                                        <select name="anywhere"  ng-model="objregister.anywhere" ng-required="true"   ng-class="{'submitted': submitted && registerform.anywhere.$invalid}" >
                  <option value="Yes" >Yes</option>
                  <option value="No">No</option>
               

               </select>
                                            <!-- <div class="input-field col s6">
                                                <input name="anywhere" type="radio" id="yes" value="yes"
                                                    ng-model="objregister.anywhere"
                                                    ng-checked="objregister.anywhere == 'yes'" ng-required="true" />
                                                <label for="yes" style="font-size:12px;">Yes</label>
                                            </div> -->
                                            <!-- <div class="input-field col s6">
                                                <input name="anywhere" type="radio" id="no" value="Security Guard"
                                                    ng-model="objregister.anywhere"
                                                    ng-checked="objregister.anywhere == 'no'" />
                                                <label for="no" style="font-size:12px;">No</label>
                                            </div> -->
                                        </div>
                                    </div>
                                </div>






                                 <div style="margin-top: 50px;margin-bottom: 20px; ">
                              <input id="agree" type="checkbox" name="agree" class="chval validate" maxlength="100" ng-model="objregister.agree" ng-true-value="1" ng-false-value="0" >
                              <label  style="color: #000;" for="agree">I HEREBY CERTIFY that the informayionprovided in this form is complete,true and correct to the best of my knowledge</label>
                              <span ng-show="valshow == 0"  class="valcheck">Please select terms</span>

                              <div class="row">
               <div id="failure2" class="red-text"></div>
            </div>
                              <div style="font-weight: bold;color: red;">
                             


</div >
</div > 

                        </table>
                        <!-- <p style="padding-left: 50px;padding-top: 20px;font-weight: bold;">I Declare that the above
                            particulars furnished are correct, if found otherwise, I know that I will be subjected to
                            legal action for disclosure of wrong information</p> -->

                        <div style="padding-left: 80px;" class="row">
                            <div id="failure" class="red-text"></div>

                            <div class="input-field col s6 l4">
                                <p>
                                    <button class="btn waves-effect waves-light  cyan darken-2" type="submit"
                                        ng-click="submitted=true;" ng-disabled="DisableButton">Submit</button>

                                </p>
                            </div>
                        </div>
                        <div id="success" class="green-text"></div>
                    </form>
                    </div>
                </div>
                <div class="row" ng-show="succes==1">
                        <div class="container sec-center">
                            <p class="sucsec"><i class="material-icons">done</i></p>
                            <p>Successfully upload the application Number, {{applyid}}</p>
                        </div>
                    </div>
            </div>
        </div>
        <div class="row" ng-show="objregister.applycount >= 1">
            <p>You are not allowed to apply since you have already applied</p>
        </div>
    </div>
</div>


<script type="text/javascript">
    function blockSpecialChar(e) {
        var k = e.keyCode;
        return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || (k >= 48 && k <= 57));
    }



    $('#serviceno').keyup(function () {
        var yourInput = $(this).val();
        $("#serviceno").val(yourInput.trim());
        re = /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi;
        var isSplChar = re.test(yourInput);
        if (isSplChar) {
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
    var regular_expression = '/^' + orginal_text + '/';
    $('#esmidno').keyup(function () {
        var current_text = $('#esmidno').val();
        if (current_text.match('^' + orginal_text + '') == null) {
            $('#esmidno').val(orginal_text + current_text)
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
    $('.datepicker').pickadate({
        labelMonthNext: 'Go to the next month',
        labelMonthPrev: 'Go to the previous month',
        labelMonthSelect: 'Pick a month from the dropdown',
        labelYearSelect: 'Pick a year from the dropdown',
        selectMonths: true,
        selectYears: 38,
        max: true,
        format: 'mm-dd-yyyy',
        onSet: function (arg) {
            if ('select' in arg) { //prevent closing on selecting month/year
                this.close();
            }
        }
    })
</script>
<style>
    .valcheck {
        color: red;
        display: block;
    }

    ul.notes li {
        list-style-type: disc !important;
    }

    .container.sec-center {
        text-align: center;
    }

    p.sucsec i {
        font-size: 32px;
        background-color: #00a174;
        border-radius: 53px;
        padding: 10px;
        font-weight: bold;
        color: #fff;
    }

    .sec-selection {
    display: flex;
}
.sec-selection p {
    background-color: #091b5c;
    color: #fff;
    padding: 20px;
    margin-right: 24px;
    border-radius: 11px;
    font-weight: bold;
    cursor: pointer;
}
select.ng-invalid-required {
    border-bottom: 2px solid red !important;
}

/* .ng-invalid-required [type="radio"]:not(:checked) + label:before, [type="radio"]:not(:checked) + label:after

{
    border: ;

} */
</style>