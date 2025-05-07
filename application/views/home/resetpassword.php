<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>Reset - Texco</title>

<link rel="shortcut icon" href="<?php echo base_url("assets/images/clientletter.jpg")?>" />

<link rel="stylesheet" type="text/css" href="<?php echo base_url("assets/css/materialize.css")?>" />
<link rel="stylesheet" type="text/css" href="<?php echo base_url("assets/css/materialdesignicons.min.css")?>" />
<link rel="stylesheet" type="text/css" href="<?php echo base_url("assets/css/texco.css")?>" />
<script type="text/javascript" src="<?php echo base_url("assets/libs/jquery/3.7.1/jquery.min.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/libs/angular/1.8.2/angular.min.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/libs/materialize/1.0.0/js/materialize.min.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/app/home.js")?>"></script>
<script type="text/javascript"> var api_url = "<?php echo config_item('api_url')?>" </script>
<script type="text/javascript"> var base_url = "<?php echo base_url()?>" </script>
<style type="text/css">
html,
body {
    height: 100%;
}
html {
    display: table;
    margin: auto;
}
body {
    display: table-cell;
    vertical-align: middle;
}
.margin {
  margin: 0 !important;
}
</style>

</head>

<body style="background:#3f51b5">


  <div id="login-page" class="row" style="width: 315px; height: 500px;" ng-app="appHome">
    <div class="col s12 z-depth-6 card-panel" ng-controller="ctrlResetpwdSubmit">
      <form class="login-form" ng-submit="resetpwform.$valid && SendData(obj)" id="resetpwform" name="resetpwform" novalidate>
	     <div ng-init="obj.token='<?php echo $token ?>' ;obj.login='<?php echo $login ?>'"></div>
        <div class="row">
          <div class="input-field col s12 center">
          <img src="<?php echo base_url("assets/images/photo.png")?>" alt="" class="circle responsive-img valign profile-image-login">
          <h5 class="center login-form-text">Reset Password</h5>
        </div>
        </div>
        <div class="row margin">
        <div class="input-field col s12">
          <input id="code" name="code" type="text" ng-model="obj.code" ng-minlength="5" ng-maxlength="15" maxlength="15"  ng-required="true" ng-class="{'submitted': submitted && resetpwform.code.$invalid}">
          <label for="code"  data-error="Required (min 5 digits)" style="width:100%">Code</label>
        </div>
        <div class="input-field col s12">
          <input type="password" name="newpwd" id="newpwd"  ng-model="obj.password"  ng-minlength="8" maxlength="15"  ng-required="true" ng-class="{'submitted': submitted && resetpwform.newpwd.$invalid}">
          <label for="newpwd" data-error="Required">Password</label>
        </div>
        <div class="input-field col s12">
          <input type="password" id="cnfpassword" name="cnfnewpwd"  ng-model="obj.cnfnewpwd" ng-minlength="8" maxlength="15" ng-required="true" ng-class="{'submitted': submitted && resetpwform.cnfnewpwd.$invalid}">
          <label for="cnfnewpwd" data-error="Required">Re-Password</label>
        </div>
      </div>
      <div id="failure" class="red-text"></div>
        <div class="row">
          <div class="input-field col s12">
		   <button class="btn waves-effect waves-light col s12" type="submit" ng-click="submitted=true;">
                    Change Password
            </button>
          </div>
        </div>
      </form>
      <div class="row">
          <div class="input-field col s6>
              <p class="margin right-align medium-small"> <a href="<?php echo base_url();?>">Home</a></p>
          </div>
        </div>
    </div>
  </div>
</body>
</html>
