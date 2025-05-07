<script type="text/javascript" src="<?php echo base_url("assets/js/app/dependency.js") ?>"></script>
<link rel="stylesheet" type="text/css" href="<?php echo base_url("assets/css/ng-table.min.css") ?>" />
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ng-file-upload.min.js") ?>"></script>

<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ng-table.min.js") ?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ui-bootstrap-tpls-0.11.0.js") ?>"></script>
<script type="text/javascript">
var memberid = "<?php echo $this->session->userdata('memberid') ?>"
</script>


<div class="parallax-container" style="background-color: rgba(0, 12, 78, 0.9)">
    <div class="row">
        <div class="container">
            <div class="col s12 m6 l6">
                <div class="pagebannertext white-text">Member Dependents</div>
            </div>
            <div class="col s12 m6 l6 right-align">
                <div class="dumheight hide-on-small-only"> </div>
                <div class=""> <a href="<?php echo base_url('member/dashboard') ?>" class="breadcrumb">Home</a> <span
                        class="breadcrumb">Dependent List</span> </div>
            </div>
        </div>
    </div>
    <div class="parallax"><img src="<?php echo base_url("assets/images/breadcrumbbanner.jpg") ?>">
    </div>
</div>

<div class="row" ng-app="appAdminMember">
    <div class="container" ng-controller="ctrlAdminMember">



        <div id="" class="section">
            <div id="Client-details" class="col s12">
                <table ng-table="tableParams" class="responsive-table highlight striped" show-filter="true"
                    class="bordered">
                    <tbody ng-repeat="applied in $data">
                        <tr>
                        <td width="8%" data-title="'serviceno'" filter="{serviceno: 'text'}"
                                sortable="'serviceno'">
                                {{applied.serviceno}}</td>
                            <td width="8%" data-title="'Name'" filter="{dependentName: 'text'}"
                                sortable="'dependentName'">
                                {{applied.dependentName}}</td>

                            <td width="10%" data-title="'DOB'" filter="{dateOfBirth: 'text'}" sortable="'dateOfBirth'">
                                {{applied.dateOfBirth | date:'dd-MM-yyyy'}}</td>

                            <td width="10%" data-title="'Aadhar Number'" filter="{aadharNumber: 'text'}"
                                sortable="'aadharNumber'">{{applied.aadharNumber}}</td>

                            <td width="10%" data-title="'Educational Qualification'"
                                filter="{educationalQualification: 'text'}" sortable="'educationalQualification'">
                                {{applied.educationalQualification}}</td>

                            <td width="10%" data-title="'Mobile Number'" filter="{mobileNumber: 'text'}"
                                sortable="'mobileNumber'">{{applied.mobileNumber}}</td>

                            <td width="8%" data-title="'Special Skills'" filter="{specialSkills: 'text'}"
                                sortable="'specialSkills'">{{applied.specialSkills}}</td>

                            <td width="10%" data-title="'Technical Qualification'"
                                filter="{technicalQualification: 'text'}" sortable="'technicalQualification'">
                                {{applied.technicalQualification}}</td>

                            <td width="10%" data-title="'Training Required'" filter="{trainingRequired: 'text'}"
                                sortable="'trainingRequired'">{{applied.trainingRequired}}</td>

                            <td width="8%" data-title="'Document'" filter="{documentPath: 'text'}"
                                sortable="'documentPath'">
                                {{applied.documentPath}}</td>

                            <!-- <td width="1%">
                                <a target="blank=" ng-click="editDependent(applied)" class="secondary-content"><i
                                        class="material-icons">edit</i></a>
                            </td> -->

                            <td width="10%" data-title="'Authorize'">
                                <span ng-show="applied.status == 1">
                                    <a class="btn-floating btn-small blue"
                                        ng-click="authorize(applied.projectid,applied.monthandyear,applied.clientid,2,applied.bill_type,applied.status,applied.payslipno)">
                                        <i class="material-icons">done</i>
                                    </a>
                                    <a class="btn-floating btn-small red"
                                        ng-click="authorize(applied.projectid, applied.monthandyear,applied.clientid,0,applied.bill_type,applied.status,applied.payslipno)">
                                        <i class="material-icons">not_interested</i>
                                    </a>
                                </span>
                             
                            </td>

                            <td width="8%" data-title="'Document'" filter="{documentPath: 'text'}"
                                sortable="'documentPath'">
                                {{applied.approvalStatus}}</td>

                        </tr>
                    </tbody>
                </table>
                <!-- <ul class="pagination theme-pagi">
                    <pagination total-items="totalItems" ng-model="currentPage" ng-change="pagelength()" class="pagination-sm" items-per-page="itemsPerPage"></pagination>
            </ul> -->
                <!-- Pagination -->
            </div>
        </div>
        <div id="modal1" class="modal modal-fixed-footer" style=" max-height:90%;">
        <form id="registerform" ng-submit="registerform.$valid && updatedependent(objregister,picFile)"
                    name="registerform" novalidate>
        <div class="modal-content">
            <nav class="blue" style="position: fixed;margin-top: 0px; z-index:999;">
                <div class="left col s1 m1 l1">
                    <div class="white-text"><a href=""><i
                                class="modal-action modal-close mdi white-text mdi-arrow-left"></i></a> </div>
                </div>
                <div class="col s11 m11 l11">
                    <div class="li white-text" id="mcaption">Add Staff</div>
                </div>
            </nav>
            <div class="row" style="margin-top: 75px;">


                
                    <table style="font-weight: bold;">
                        <div class="container">
                            <div class="row">

                        
                                <div class="col s6">
                                    <label for="name" style="font-size:12px;"> Name <span style="color: red;">
                                            *</span></label>

                                    <input id="firstname" type="text" name="firstname" class="validate" maxlength="250"
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
                                    <input id="dob" type="date" name="dob" class="datepicker" class="validate"
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
                                                ng-model="objregister.gender" ng-checked="objregister.gender == '0'" />
                                            <label for="male" style="font-size:12px;">Male</label>
                                        </div>
                                        <div class="input-field col s2 l3">
                                            <input name="gender" type="radio" id="female" value="1"
                                                ng-model="objregister.gender" ng-checked="objregister.gender == '1'" />
                                            <label for="female" style="font-size:12px;">Female</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="col s6">

                                    <span style="color: red;"> *</span>
                                    <label for="mobile" style="font-size:12px;"> Mobile No <span style="color: red;">
                                            *</span></label>

                                    <input id="mobile" type="text" name="mobile" class="validate" minlength="10"
                                        maxlength="10" ng-required="true" ng-model="objregister.mobileNumber"
                                        ng-class="{'submitted': submitted && registerform.mobileNumber.$invalid}">

                                </div>
                            </div>
                            <div class="row">
                                <div class="col s6">

                                    <label for="aadhaarno" style="font-size:12px;"> Aadhar No<span style="color: red;">
                                            *</span></label>

                                    <input id="aadhaarno" type="text" name="aadhaarno" class="validate" minlength="12"
                                        maxlength="12" ng-model="objregister.aadharNumber"
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

                                    <input id="educationalqualification" type="text" name="educationalqualification"
                                        class="validate" maxlength="150" ng-model="objregister.educationalQualification"
                                        ng-class="{'submitted': submitted && registerform.educationalQualification.$invalid}">
                                </div>
                                <div class="col s6">
                                    <label for="technicalqualification" style="font-size:12px;"> Technical
                                        Qualification<span style="color: red;">
                                            *</span></label>

                                    <input id="technicalqualification" type="text" name="technicalqualification"
                                        class="validate" maxlength="150" ng-model="objregister.technicalQualification"
                                        ng-class="{'submitted': submitted && registerform.technicalQualification.$invalid}">
                                </div>
                            </div>

                            <div class="row">
                                <div class="col s6">
                                    <label for="specialskills" style="font-size:12px;"> Special Skills<span
                                            style="color: red;">
                                            *</span></label>

                                    <input id="specialskills" type="text" name="specialskills" class="validate"
                                        maxlength="150" ng-model="objregister.specialSkills"
                                        ng-class="{'submitted': submitted && registerform.specialSkills.$invalid}">
                                </div>
                                <div class="col s6">
                                    <label for="trainingfor" style="font-size:12px;"> Specific Skill Training required
                                        For<span style="color: red;">
                                            *</span></label>

                                    <input id="trainingfor" type="text" name="trainingfor" class="validate"
                                        maxlength="150" ng-model="objregister.trainingRequired"
                                        ng-class="{'submitted': submitted && registerform.trainingRequired.$invalid}">
                                </div>
                            </div>
                            <div class="row">


                                <div class="file-field input-field">
                                    <div class="btn">
                                        <span>File</span>
                                        <input type="file" ngf-select ng-model="picFile" name="file" accept="pdf/*"
                                            ng-change="changeName(picFile.name)" ngf-max-size="1MB">
                                    </div>
                                    <div class="file-path-wrapper">
                                        <input class="file-path validate" type="text" ng-model="objregister.documentPath">
                                    </div>
                                    <span ng-show="!objregister.documentPath.length">Please select  Document!</span>
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


                  
                    <div id="success" class="green-text"></div>
              
            </div>
        </div>
        <div class="modal-footer">
            <button class="waves-effect waves-green btn-flat" type="submit" ng-click="submitted=true;">
                Save
            </button>
            <a href="" class="modal-action modal-close waves-effect btn-flat ">Cancel</a>
        </div>
        </form>
    </div>
      </div>


    
</div>

<style type="text/css">
.ng-table-pager {
    display: none;
}
</style>
<style type="text/css">
.ng-table-pager {
    display: none;
}

.striped {
    display: block;
    height: 500px;
    overflow-y: scroll;
    overflow-x: scroll;
}
</style>