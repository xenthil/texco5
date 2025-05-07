<script type="text/javascript" src="<?php echo base_url("assets/js/app/agreementprint.js")?>"></script>
<link type="text/css" rel="stylesheet" href="<?php echo base_url("assets/css/isteven-multi-select.css")?>">
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/underscore.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/isteven-multi-select.js")?>"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/ckeditor/4.2/ckeditor.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/ckeditor/4.2/adapters/jquery.js"></script>
<script type="text/javascript">var agreementid = "<?php echo $_GET['agreementid'];?>"</script>
<div class="parallax-container" style="background-color: rgba(0, 12, 78, 0.9)">
   <div class="row">
      <div class="container">
         <div class="col s12 m6 l6">
            <div class="pagebannertext white-text">Agreement</div>
         </div>
         <div class="col s12 m6 l6 right-align">
            <div class="dumheight hide-on-small-only"> </div>
            <div class=""> <a href="<?php echo base_url('admin/dashboard')?>" class="breadcrumb">Home</a> <span class="breadcrumb">Agreement</span> </div>
         </div>
      </div>
   </div>
   <div class="parallax"><img src="<?php echo base_url("assets/images/breadcrumbbanner.jpg")?>">
   </div>
</div>
<div class="row" ng-app="appAgreement">
   <div class="container" ng-controller="ctrlAgreement">
   <div id="modal1" class="modal modal-fixed-footer" style="max-height:40%;top: 25%;">
      <form ng-submit="sendmailform.$valid && sendmail(agreementrenew)" id="sendmailform" name="sendmailform" novalidate>
         <div class="modal-content">
            <nav class="blue" style="position: fixed;margin-top: 0px; z-index:999">
               <div class="left col s1 m1 l1">
               <div class="white-text"><a href=""><i class="modal-action modal-close mdi white-text mdi-arrow-left"></i></a> </div>
               </div>
               <div class="col s11 m11 l11">
               <div class="li white-text" id="mcaption">Client Email</div>
               </div>
            </nav>
            <div class="row" style="padding: 80px;">
               <div class="row">
                  <div class="input-field col s6">
                     <input id="clientemail" ng-model="agreementrenew.clientemail" type="text" ng-required="true"  aria-required="true">
                     <input id="clientid" ng-model="agreementrenew.clientid" type="hidden">
                     <label for="clientdesc" class="active">Client Email</label>
                  </div>
               </div> 
            </div>
         </div>
         <div class="modal-footer">
            <div id="failure" class="red-text waves-effect waves-green"></div>
            <button class="waves-effect waves-green btn-flat" type="submit" ng-click="SendEmail(clientemail)">
               Save
            </button>
            <a href="" class="modal-action modal-close waves-effect btn-flat ">Cancel</a>
         </div>
      </form>
   </div>
   
      <div class="row">
         <div class="input-field col s3">
            <div class="select-wrapper ng-pristine ng-valid">
               <span class="caret">▼</span><input type="text" class="select-dropdown" readonly="true" data-activates="select-options-e9119733-c77d-be3c-b1ca-bd74ba43db05" value="">
               <ul id="select-options-e9119733-c77d-be3c-b1ca-bd74ba43db05" class="dropdown-content select-dropdown ">
                  <li class=""><span></span></li>
               </ul>
               <select name="regionid" ng-model="agtype" ng-change='changeagreement(agtype)'>
                  <option value="" selected="selected">--Select--</option>
                  <option value="0">DVR</option>
                  <option value="1">TNEB</option>
                  <option value="2">SG</option>
               </select>
            </div>
            <label for="region" data-error="Required">AGREEMENT PRINT</label>
         </div>
      </div>

  

      <div id="modal">
         <form>
            <textarea  ng-model="values"  ck-editor>

            
<p>&nbsp;</p>

<p style="text-align:center"><strong>AGREEMENT</strong></p>




            </textarea>

           <button class="btn waves-effect waves-light  cyan darken-2" type="submit" ng-click="saveAgreement(values,agtype)" style="float: right;margin-top: 10px !important;">Save & Send Agreement</button>

         </form>
      </div>
   </div>
</div>
<script type="text/javascript">
   //$('#foo').html('');
   
   //$('#foo').hide();
   // $('textarea#foo').ckeditor({
   //     height: "300px",
   //     toolbarStartupExpanded: true,
   //     width: "100%"
   // });
   
   $('#modal').hide();
   
   window.setTimeout(function() {
       $('#modal').show();
   }, 4000);

   
</script>