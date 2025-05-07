<script type="text/javascript" src="<?php echo base_url("assets/js/app/addaccountnumber.js")?>"></script>
<link rel="stylesheet" type="text/css" href="<?php echo base_url("assets/css/ng-table.min.css")?>" />
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ng-table.min.js")?>"></script> 
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ui-bootstrap-tpls-0.11.0.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/jquery.formatter.min.js")?>"></script>
<script src="<?php echo base_url("assets/js/lib/angular-bootstrap-datepicker.js")?>" charset="utf-8"></script>
<link href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery-ui.css" rel="Stylesheet" type="text/css" />
<link href="<?php echo base_url("assets/css/datepicker.css")?>" rel="Stylesheet" type="text/css" />
<script type="text/javascript">
   var memberid = 0;
</script>
<style>
input {
    width: 100%;
    text-transform : uppercase;
}
input {
  color: black !important;
  font-size: large !important; 
}
</style> 
<div class="parallax-container" style="background-color: rgba(0, 12, 78, 0.9)">
   <div class="row">
      <div class="container">
         <div class="col s12 m6 l6">
            <div class="pagebannertext white-text">Add AccountNumber</div>
         </div>
         <div class="col s12 m6 l6 right-align">
            <div class="dumheight hide-on-small-only"> </div>
            <div class=""> <a href="<?php echo base_url('admin/dashboard') ?>" class="breadcrumb">Home</a> <span class="breadcrumb">AccountNumber</span> </div>
         </div>
      </div>
   </div>
   <div class="parallax"><img src="<?php echo base_url("assets/images/breadcrumbbanner.jpg") ?>">
   </div>
</div>
<div class="row" ng-app="appAccountNumber">
   <div class="container" ng-controller="ctrlAccountNumber">
      <!-- Modal Structure -->
      <div id="" class="section">
         <div class="row">
            <div class="col s12 ">
               <div class="row">
                  <div class="input-field col s6">
                     <input name="search_val" id="search_val" type="text" ng-model="objmember.search_val" placeholder="Search Texcono Or Service No or Mobile No" />
                     <label for="">Search </label>
                  </div>
                  <div class="input-field col s6">
                     <button ng-click="searchmember(objmember.search_val)" style="background: green;top: 10px !important;color: #fff !important;" class="modal-action waves-effect waves-green btn-flat" type="submit" id="btntexser">Search</button>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <div id="" class="section" ng-if="objprofile.firstname">
         <div class="row">
            <div id="Client-details" class="col s12">
               <div class="email-content-wrap">
                  <div class="row">
                     <div class="col s12">
                        <div class="input-field col s12">
                           <div class="input-field col s6">
                              <img src="<?php echo base_url("assets/images/photo.png")?>" alt="" class="circle">
                           </div>
                        </div>
                        <div class="input-field col s6">
                           <h4 class="email-title">{{objprofile.firstname}} {{objprofile.lastname}} - {{objprofile.serviceno}}
                           </h4>
                           <div class="input-field col s6">
                         </div>
                        </div>
                     </div>
                     <form ng-submit="profileform.$valid && savemember(objprofile)" id="profileform" name="profileform" novalidate>
                     <div class="row">
                           <div class="input-field col s6 l2">
                              <input id="accountno" type="text" name="accountno" ng-class="{'submitted': submitted && memberform.accountno.$invalid}" class="validate"  minlength="16" maxlength="16" ng-model="objprofile.accountno" onkeypress="return isNumberKey(event);">
                              <label for="accountno" class="active">Account No</label>
                           </div>
                    </div>
                        <div class="row">
                           
                        </div>
                        <div class="row">
                           <div id="failure" class="red-text"></div>
                           <div class="input-field col s6 l4">
                              <p>
                                 <button class="btn waves-effect waves-light  cyan darken-2" type="submit" ng-click="submitted=true;">Save</button>
                              </p>
                           </div>
                        </div>
                     </form>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
<script>
    $("#search_val").keyup(function(event) {
        if (event.keyCode === 13) {
            $("#btntexser").click();
        }
    });
</script>

<script  type="text/javascript">


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

   var orginal_text = $('#esmidno').val();
      var regular_expression = '/^' + orginal_text +'/' ;
      $('#esmidno').keyup(function(){
          var current_text = $('#esmidno').val();
          if(current_text.match('^' + orginal_text +'') == null){
              $('#esmidno').val(orginal_text +current_text )
          }
      });
      function isNumberKey(evt)
      {
        var charCode = (evt.which) ? evt.which : event.keyCode;
       console.log(charCode);
          if (charCode != 46 && charCode != 45 && charCode > 31
          && (charCode < 48 || charCode > 57))
           return false;
      
        return true;
      }
</script>
<style type="text/css">
   .ui-datepicker-calendar {
   display: none;
   }
   td {
   max-width: 25px;
   }
   .datepicker-dropdown {
   top: 0;
   left: 0;
   position: absolute;
   background-color: #fff;
   width: 20%;
   }
   .ng-table-pager {
   display: none;
   }
   .striped {
   display: block;
   height: 500px;
   overflow-y: scroll;
   overflow-x: scroll;
   }
    table, td  {
   border: 1px solid #d0cdcd;
   border-collapse: collapse;
   }
</style>