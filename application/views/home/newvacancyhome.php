<link rel="stylesheet" type="text/css" href="<?php echo base_url("assets/css/texco.css")?>" />
<link rel="stylesheet" type="text/css" href="<?php echo base_url("assets/css/ng-table.min.css") ?>" />
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ng-file-upload.min.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/app/newvacancymember.js")?>"></script>


<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ng-table.min.js") ?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ui-bootstrap-tpls-0.11.0.js") ?>"></script>
<script type="text/javascript">
var memberid = "0"
</script>

<div class="parallax-container" style="background-color: rgba(0, 12, 78, 0.9)">
    <div class="row">
        <div class="container">
            <div class="col s12 m6 l6">
                <div class="pagebannertext white-text">Apply Vacany</div>
            </div>
            <div class="col s12 m6 l6 right-align">
                <div class="dumheight hide-on-small-only"> </div>
                <div class=""> <a href="<?php echo base_url()?>" class="breadcrumb">Home</a> <span
                        class="breadcrumb">Apply Vacany</span> </div>
            </div>
        </div>
    </div>
    <div class="parallax">
        <img src="<?php echo base_url("assets/images/breadcrumbbanner.jpg")?>">
    </div>
</div>

<div class="row" ng-app="appAdminMember">
    <div class=" container" ng-controller="ctrlAdminMember">
        <div class="row">
            <div class="col s2">
            </div>
            <div class="col s8">
                <form autocomplete="off" class="login-form" ng-submit="loginform.$valid && SendData(obj)" id="loginform"
                    name="loginform" novalidate>
                    <div class="row">
                        <!-- <div class="input-field col s12 center">
                            <img src="<?php echo base_url("assets/images/clientletter.jpg")?>" alt=""
                                class="responsive-img valign profile-image-login" style="width:100px;">
                            <h5 class="center login-form-text">Apply Vacany</h5>
                        </div> -->

                        <div>Please login to apply</div>
                      
                        <div>
                            <div class="row margin">
                                <div class="input-field col s12">
                                    <input id="texserno" autocomplete="off" name="texserno" type="text" class="validate"
                                        maxlength="200" ng-model="texserno" ng-required="true"
                                        ng-class="{'submitted': submitted && loginform.username.$invalid}">
                                    <label for="texserno" data-error="Enter Texco No or Service No"
                                        data-success="">Enter Texco No or Service No</label>
                                </div>
                            </div>

                            <div id="failure" class="red-text" style="margin-left: 10px !important;"></div>
                            <div class="row">
                                <div class="input-field col s12">
                                    <button class="btn waves-effect waves-light col s12"
                                        ng-click="searchmembers(texserno)" type="submit">
                                        Login
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="col s2">
            </div>
        </div>


    </div>
</div>