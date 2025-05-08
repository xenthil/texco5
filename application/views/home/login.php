<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>Login - Texco</title>

<link rel="shortcut icon" href="<?php echo base_url("assets/images/clientletter.jpg")?>" />

<link rel="stylesheet" type="text/css" href="<?php echo base_url("assets/css/icon.css")?>" />
<link rel="stylesheet" type="text/css" href="<?php echo base_url("assets/css/materialize.css")?>" />
<link rel="stylesheet" type="text/css" href="<?php echo base_url("assets/css/materialdesignicons.min.css")?>" />
<link rel="stylesheet" type="text/css" href="<?php echo base_url("assets/css/texco.css")?>" />
<script type="text/javascript" src="<?php echo base_url("assets/libs/jquery/3.7.1/jquery.min.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/libs/angular/1.8.2/angular.min.js")?>"></script>
<script src="<?php echo base_url("assets/js/app/global-interceptor.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/libs/materialize/1.0.0/js/materialize.min.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/app/home.js")?>"></script>
<script type="text/javascript"> var api_url = "<?php echo config_item('api_url')?>" </script>
<script type="text/javascript"> var base_url = "<?php echo base_url()?>" </script>
<script type="text/javascript">  
  var atoken = "<?php echo $_SESSION['atoken']; ?>";
</script>

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


  <div id="login-page" class="row" style="width: 370px;" ng-app="appHome">
    <div class="col s12 z-depth-6 card-panel" ng-controller="ctrlLoginSubmit">
      <form autocomplete="off" class="login-form" ng-submit="loginform.$valid && SendData(obj)" id="loginform" name="loginform" novalidate>
        <div class="row">
          <div class="input-field col s12 center">
          <img src="<?php echo base_url("assets/images/clientletter.jpg")?>" alt="" class="responsive-img valign profile-image-login" style="width:100px;">
          <h5 class="center login-form-text">Login</h5>
        </div>
            <div class="field form-inline radio" style="padding-left: 20px;" id="group1">
             <input name="group1" type="radio" id="test1" ng-model="changedVal" ng-change="RadioChange('Employee')" value="Employee" />
              <label for="test1">Texco Staff</label>
              <input name="group1" ng-model="changedVal" type="radio" id="test2" ng-change="RadioChange('Client')" value="Client"/>
              <label for="test2">Employer</label>
              <input name="group1" ng-model="changedVal" type="radio" id="test3" ng-change="RadioChange('AM')" value="AM"/>
              <label for="test3">AM</label>
        </div>
        <div class="row margin">
        <div class="input-field col s12">
          <input id="username" autocomplete="off" name="username" type="text" class="validate" maxlength="200" ng-model="obj.userid" ng-required="true" ng-class="{'submitted': submitted && loginform.username.$invalid}">
          <label for="username" data-error="Enter email or mobile no" data-success="">Email/Mobile</label>
        </div>
      </div>
      <div class="row margin">
        <div class="input-field col s12">
          <input id="password" autocomplete="new-password" name="password" type="password" class="validate"  maxlength="15" ng-model="obj.password" ng-required="true" ng-class="{'submitted': submitted && loginform.password.$invalid}">
          <label for="password" data-error="Enter Password" data-success="">Password</label>
        </div>
      </div>
      <div id="failure" class="red-text" style="margin-left: 10px !important;"></div>
        <div class="row">
          <div class="input-field col s12">
		          <button class="btn waves-effect waves-light col s12" type="submit" ng-click="submitted=true;">
                    Login
                </button>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s6">
              <p class="margin left-align medium-small"><a href="<?php echo base_url("forgotpassword?changedVal={{changedVal}}");?>">Forgot password?</a></p>
          </div>
	        <div class="input-field col s6">
              <p class="margin right-align medium-small"><a href="<?php echo base_url();?>">Home</a></p>
          </div>
        </div>

      </form>
    </div>
  </div>
</body>
</html>
