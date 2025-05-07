<script type="text/javascript" src="<?php echo base_url("assets/js/app/clientreg.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ng-file-upload.min.js")?>"></script>
<div class="row" ng-app="appClientreg">
 <div class="container" ng-controller="ctrlClientreg">
 <div id="clientreg">
 <?php echo $register;?>
 </div>
             </div>
             </div>
             <div id="confirmation" style="display:none;    border: 5px solid #ccc;padding: 50px;width: 74%;margin-left: 13%;text-align: center;font-size: 35px;font-weight: bold;color: green;">
               <p>Thanks for registering as Employer,You will get a mail once approved by admin</p>
             </div>