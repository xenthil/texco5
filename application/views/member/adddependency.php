<script type="text/javascript" src="<?php echo base_url("assets/js/app/dependency.js") ?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ng-file-upload.min.js") ?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/angularjs-dropdown-multiselect.min.js") ?>"></script>

<link rel="stylesheet" type="text/css" href="<?php echo base_url("assets/css/ng-table.min.css") ?>" />
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ng-table.min.js") ?>"></script>
<!-- <script type="text/javascript" src="<?php echo base_url("assets/js/lib/ng-pattern-restrict.js") ?>"></script> -->
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ui-bootstrap-tpls-0.11.0.js") ?>"></script>
<script type="text/javascript">
   var memberid = <?php echo $memberid?>
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
            <div class=""> <a href="<?php echo base_url() ?>" class="breadcrumb">Home</a> <span class="breadcrumb">Add
                  Dependency</span> </div>


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
         <div class="row">
            <div id="Client-details" class="col s12">
               <div class="email-content-wrap">
                  <div class="row">
                     <form id="registerform" ng-submit="registerform.$valid && savedependent(objregister)"
                        name="registerform" novalidate>
                        <table style="font-weight: bold;">
                           <div class="container">
                              <div class="row">
                     

                                 <div class="col s6">
                                    <label for="name" style="font-size:12px;"> Name <span style="color: red;">
                                          *</span></label>

                                    <input id="dependentName" type="text" name="dependentName" class="validate" maxlength="250"
                                       ng-model="objregister.dependentName" ng-required="true"
                                       ng-class="{'submitted': submitted && registerform.dependentName.$invalid}"
                                       ng-pattern="/^[a-zA-Z. ]*$/">
                                    <span style="color:red"
                                       ng-show="submitted && registerform.dependentName.$error.pattern">Please
                                       enter valid
                                       name!</span>


                                 </div>

                                 <div class="col s6">

                                    <label for="dob" style="font-size:12px;"> Date of Birth <span style="color: red;">
                                          *</span></label>
                                    <input id="dateOfBirth" type="date" name="dateOfBirth" class="datepicker" class="validate"
                                       ng-required="true" ng-model="objregister.dateOfBirth"
                                       ng-class="{'submitted': submitted && registerform.dateOfBirth.$invalid}">
                                 </div>
                              </div>

                              <div class="row">
                                 <div class="col s6">
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
                                 </div>
                                 <div class="col s6">

                                    <span style="color: red;"> *</span>
                                    <label for="mobile" style="font-size:12px;"> Mobile No <span style="color: red;">
                                          *</span></label>

                                    <input id="mobileNumber" type="text" name="mobileNumber" class="validate" minlength="10"
                                       maxlength="10" ng-required="true" ng-model="objregister.mobileNumber"
                                       ng-class="{'submitted': submitted && registerform.mobileNumber.$invalid}">

                                 </div>
                              </div>
                              <div class="row">
                                 <div class="col s6">

                                    <label for="aadhaarno" style="font-size:12px;"> Aadhar No<span style="color: red;">
                                          *</span></label>

                                    <input id="aadharNumber" type="text" name="aadharNumber" class="validate" minlength="12"
                                       maxlength="12" ng-required="true" ng-model="objregister.aadharNumber"
                                       ng-class="{'submitted': submitted && registerform.aadharNumber.$invalid}"
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
                                    <label for="eduqual" style="font-size:12px;"> Educational Qualification<span
                                          style="color: red;">
                                          *</span></label>

                                    <input id="educationalQualification" type="text" name="educationalQualification"
                                       class="validate" ng-required="true" maxlength="150" ng-model="objregister.educationalQualification"
                                       ng-class="{'submitted': submitted && registerform.educationalQualification.$invalid}">
                                 </div>
                                 <div class="col s6">
                                    <label for="technicalqualification" style="font-size:12px;"> Technical
                                       Qualification<span style="color: red;">
                                          *</span></label>

                                    <input id="technicalQualification" type="text" name="technicalQualification"
                                       class="validate" ng-required="true" maxlength="150" ng-model="objregister.technicalQualification"
                                       ng-class="{'submitted': submitted && registerform.technicalQualification.$invalid}">
                                 </div>
                              </div>

                              <div class="row">
                                 <div class="col s6">
                                    <label for="specialskills" style="font-size:12px;"> Special Skills<span
                                          style="color: red;">
                                          *</span></label>

                                    <input id="specialSkills" ng-required="true" type="text" name="specialSkills" class="validate"
                                       maxlength="150" ng-model="objregister.specialSkills"
                                       ng-class="{'submitted': submitted && registerform.specialSkills.$invalid}">
                                 </div>
                                 <div class="col s6">
                                    <label for="trainingfor" style="font-size:12px;"> Specific Skill Training required
                                       For<span style="color: red;">
                                          *</span></label>

                                    <input id="trainingRequired" type="text" name="trainingRequired" ng-required="true" class="validate"
                                       maxlength="150" ng-model="objregister.trainingRequired"
                                       ng-class="{'submitted': submitted && registerform.trainingRequired.$invalid}">
                                 </div>
                              </div>
                              <div class="row">
                               

                                 <div class="file-field input-field">
                                 <div class="btn">
                                    <span>File</span>
                                    <input type="file" ngf-select ng-model="picFile" name="file" accept="pdf/*" ng-change="flleupload(picFile)" ngf-max-size="1MB">
                                 </div>
                                 <div class="file-path-wrapper">
                                    <input class="file-path validate" type="text" ng-model="objclient.image">
                                 </div>
                                 <span ng-show="!objclient.image.length">Please select Document!</span>
                                 <br>
                                 <!-- <i ng-show="clientform.file.$error.maxSize">File too large
                                 {{errorFile.size / 1000000|number:1}}MB: max 2M</i> -->
                                 <img id="clientimage" ngf-thumbnail="picFile" class="thumb">
                                 <span class="progress" ng-show="picFile.progress >= 0">
                                    <div style="width:{{picFile.progress}}%" ng-bind="picFile.progress + '%'"></div>
                                 </span>
                                 <span class="err" ng-show="errorMsg">{{errorMsg}}</span>
                              </div>
                              </div>

                           </div>


                           <div class="" ng-repeat="permission in skills">
                                            
                                            <input type="checkbox" id="{{permission.lkvalid}}" ng-checked="{{permission.selected}}" ng-true-value="1" ng-false-value="0" ng-model="permission.ischecked" ng-change="selectEntity(permission)" />
                                            <label for="{{permission.lkvalid}}">{{permission.description}}</label>
                                       
                                    </div>

                  {{selectedskill}}


                           <!-- <div class="row">
                <div class="file-field input-field">
                    <div class="btn">
                        <span>File</span>
                        <input type="file" ngf-select ng-model="objregister.documents.picFile1" name="file[]" accept=".pdf" ng-change="changeName(objregister.documents.picFile1.name)" ngf-max-size="1MB" >
                    </div>
                    <div class="file-path-wrapper">
                        <input class="file-path validate" type="text" ng-model="objregister.image">
                    </div>
                    <span ng-show="!objregister.image.length">Please select Logo image!</span>
                    <br>
                  
                    <img id="clientimage" ngf-thumbnail="documents.picFile" class="thumb">
                  
                    <span class="progress" ng-show="documents.picFile.progress >= 0">
                  <div style="width:{{documents.picFile.progress}}%"
                     ng-bind="documents.picFile.progress + '%'"></div>
               </span>
                    <span class="err" ng-show="errorMsg">{{errorMsg}}</span>
                </div>
            </div> -->


                           <!-- <tr class="upload-doc">
                           <td style="padding-left: 80px;">
                    <label>Discharge Book:<span style="color:#FF0000 ; font-size:16px; ; "> * </span></label>


                   <div class="uploader bg-primary">  <input type="file" ngf-select ng-model="documents.picFile" name="file"
                         accept=".pdf*" required ngf-max-size="5MB" ngf-model-invalid="errorFile" ng-change="uploadPic(documents.picFile,'dbook')"><span class="filename" style="user-select: none;">	
                         {{viewproduct.image1}}</span><span class="action" style="user-select: none;">Browse</span></div>
                      <i ng-show="myForm.file.$error.required">*required</i><br>
                     <i ng-show="myForm.file.$error.maxSize" class="error-file">File too large {{errorFile.size / 1000000|number:1}}MB: max 2M</i>
                    
                    <span class="err" ng-show="errorMsg">{{errorMsg}}</span>
                </div>  
</td>
<td>
                  
                    <label>ID Card:</label>
                   <div class="uploader bg-primary">  <input type="file" ngf-select ng-model="documents.picFile1" name="file"
                      accept=".pdf" ngf-max-size="5MB" ngf-model-invalid="errorFile" ng-change="uploadPic(documents.picFile1,'idcard')"><span class="filename" style="user-select: none;">
                       </span><span class="action" style="user-select: none;">Browse</span></div>
                   <i ng-show="myForm.file.$error.required">*required</i><br>
                   <i ng-show="myForm.file.$error.maxSize">File too large {{errorFile.size / 1000000|number:1}}MB: max 2M</i>
               
                   <span class="err" ng-show="errorMsg">{{errorMsg}}</span>
               </div>
</td>
</tr>
                <tr class="upload-doc">
                   <td style="padding-left: 80px;">
                 <label>PPO Book:</label>
                 <div class="uploader bg-primary">  <input type="file" ngf-select ng-model="documents.picFile2" name="file" accept=".pdf" ngf-max-size="5MB"
                  ngf-model-invalid="errorFile" ng-change="uploadPic(documents.picFile2,'ppobook')"><span class="filename" style="user-select: none;">{{viewproduct.image3}}</span><span class="action"
                        style="user-select: none;">Browse</span></div>
                <i ng-show="myForm.file.$error.required">*required</i><br>
                <i ng-show="myForm.file.$error.maxSize">File too large {{errorFile.size / 1000000|number:1}}MB: max 2M</i>
               
            
                <span class="err" ng-show="errorMsg">{{errorMsg}}</span>
</td><td>
               
                 <label>Aadhar:</label>
                 <div class="uploader bg-primary">  <input type="file" ngf-select ng-model="documents.picFile3" name="file" accept=".pdf" ngf-max-size="5MB"
                   ngf-model-invalid="errorFile" ng-change="uploadPic(documents.picFile3,'aadhar')"><span class="filename" style="user-select: none;">{{viewproduct.image3}}</span><span class="action" 
                         style="user-select: none;">Browse</span></div>
                   <i ng-show="myForm.file.$error.required">*required</i><br>
                   <i ng-show="myForm.file.$error.maxSize">File too large {{errorFile.size / 1000000|number:1}}MB: max 2M</i>
                   
                         <span class="err" ng-show="errorMsg">{{errorMsg}}</span>
</td>
</tr> -->

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
            </div>
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
   </style>