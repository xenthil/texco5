<script type="text/javascript" src="<?php echo base_url("assets/js/app/memberblock.js")?>"></script>
<!-- <script type="text/javascript" src="<?php echo base_url("assets/js/lib/ui-bootstrap-tpls-0.11.0.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/jquery.formatter.min.js")?>"></script> 
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ui-bootstrap-tpls-0.11.0.js")?>"></script> -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/ng-csv/0.3.3/ng-csv.min.js"></script>
<script type="text/javascript">
   var memberid = 0;
</script> 
<style>
.waves-green.btn-flat {
    background-color: #26a69a;
    color: #fff;
    margin-right: 22px;
}
</style>
<div class="parallax-container" style="background-color: rgba(0, 12, 78, 0.9)">
   <div class="row">
      <div class="container">
         <div class="col s12 m6 l6">
            <div class="pagebannertext white-text">Block (Ex-servicemens)</div>
         </div>
         <div class="col s12 m6 l6 right-align">
            <div class="dumheight hide-on-small-only"> </div>
            <div class=""> <a href="<?php echo base_url('admin/dashboard')?>" class="breadcrumb">Home</a> <span class="breadcrumb">Employees</span> </div>
         </div>
      </div>
   </div>
   <div class="parallax"><img src="<?php echo base_url("assets/images/breadcrumbbanner.jpg")?>">
   </div>
</div>
<div class="row" ng-app="appAdminMember">
   <div class="container" ng-controller="ctrlAdminMember">
      <div id="modal2" class="modal modal-fixed-footer" style="max-height:90%;">
         <div class="modal-content">
            <nav class="blue" style="position: fixed;margin-top: 0px;z-index:999;">
               <div class="left col s1 m1 l1">
                  <div class="white-text"><a href=""><i class="modal-action modal-close mdi white-text mdi-arrow-left"></i></a> </div>
               </div>
               <div class="col s11 m11 l11">
                  <div class="li white-text" id="mcaption">Add Block (Ex-servicemens)</div>
               </div>
            </nav>

            <div class="row" style="padding: 24px;">
               <div ng-show="isshow" class="row" style="padding-top: 32px;">
                     <div class="input-field col s6">
                        <input id="serviceno" name="serviceno" type="text" class="validate" maxlength="15" ng-model="objmember.servicenos">
                        <label for="firstname" data-error="Required">Enter Service No/Texco No</label>
                     </div>
                     <div class="input-field col s6">
                        <button class="waves-effect waves-green btn-flat" type="submit" id="btntexser" ng-click="searchmember(objmember.servicenos);" >Search</button>
                     </div>
                  </div>
               <form ng-submit="savememberblock(objmember)" id="memberform" name="memberform" novalidate="novalidate">            
                  <div class="col s12" style="padding-top: 20px;">
                     <input type="hidden" ng-model="objmember.memberid">
                     <input type="hidden" ng-model="objmember.memberblockid">
                     <input type="hidden" ng-model="objmember.serviceno">
                     <div class="row">
                     <div class="col s12 m3 l3">
                        <p class="blue-grey-text"><strong>Service No(Army No)</strong> </p>
                        <p class="ng-binding">{{objmember.serviceno }}</p>
                     </div>
                     <div class="col  s12 m3 l3">
                        <p class="blue-grey-text"><strong>Name</strong> </p>
                        <p class="ng-binding">{{ objmember.firstname }}</p>
                     </div>
                     <div class="col  s12 m3 l3">
                        <p class="blue-grey-text"><strong>Texco No</strong> </p>
                        <p class="ng-binding">{{ objmember.texcono }}</p>
                     </div>
                     <div class="col  s12 m3 l3">
                        <p class="blue-grey-text"><strong>Mobile</strong> </p>
                        <p class="ng-binding">{{ objmember.mobile }}</p>
                     </div>
                  </div>
                     <div class="row">
                        <div class="input-field col s6">
                           Reason
                           <input id="reason"  name="reason" type="text" ng-class="{'submitted': submitted && memberform.reason.$invalid}" type="text" ng-model="objmember.reason" maxlength="250" class="validate" ng-required="true">
                        </div>
                        <div class="input-field col s6">
                           Block Type
                           <select name="blocktype" ng-model="objmember.blocktype" ng-class="{'submitted': submitted && memberform.blocktype.$invalid}" id="blocktype" ng-required="true" ng-change="blocktypechange(objmember.blocktype);">
                              <option value="1">Member Block</option>
                              <option value="2">Repco Settlement</option>
                              <option value="3">PF Settlement</option>
                              <option value="4">Repco & PF Settlement</option>
                           </select>
                        </div>
                     </div>
                     <div class="row">
                        <div class="input-field col s12">
                           <input id="comment" name="comment" type="text" class="validate" maxlength="15" ng-model="objmember.comment" ng-required="true" ng-class="{'submitted': submitted && memberform.comment.$invalid}">
                           <label for="comment" data-error="Required">Comments</label>
                        </div>
                     </div>
                     <div class="row">
                        <div class="input-field  col s6" style="margin-right:0px;">
                           <input type="checkbox" class="filled-in" id="filled-in-box2" checked="checked" ng-model="objmember.memberblock" name="memberblock" ng-checked="objmember.memberblock=='1'"  ng-true-value="1" ng-false-value="0"/>
                           <label for="filled-in-box2">{{BlockLabelName}}</label>
                        </div>
                        <div class="input-field col s6" ng-show="objmember.memberblock == 0 && objmember.blocktype == 1">
                           <input id="enddate" name="enddate" type="date" class="datepicker" type="text" ng-model="objmember.enddate" ng-required="true" ng-class="{'submitted': submitted && memberform.enddate.$invalid}">
                           <label for="enddate" data-error="Required" class="dp-click">End Date</label>
                        </div>
                     </div>
                     <div id="failure" class="red-text"></div>
                  </div>
            </div>
         </div>
            <div class="modal-footer">
               <button class="modal-action waves-effect waves-green btn-flat" type="submit" ng-click="submitted=true;">
               Save
               </button>
               <a href="" class="modal-action modal-close waves-effect btn-flat ">Cancel</a>
            </div>
         </form>
      </div>
      <div class="fixed-action-btn" style="bottom: 50px; right: 19px;">
         <?php if($roledata['permissions']['AMEMBERS']==1) {?>
         <a class="btn-floating btn-large red modal-trigger" ng-click='addmemberblock()'>
         <i class="mdi mdi-account-plus"></i>
         </a>
         <?php } ?>
      </div>
      <!-- Modal Structure -->
      <?php echo $newmember ?>
      <div id="" class="section">
      <div class="col s12 m12 l12">
            <button type="button" class="btn btn-default btncol" ng-click="exportRepco()" style="background: green;color: #fff !important;float:right;margin:10px;"><span class="glyphicon glyphicon-download-alt">&nbsp;</span>Download</button>
            &nbsp;&nbsp;
        </div>
         <div class="row">
            <div class="col s12 ">
               <div id="Client-list" class="CLheight col s12 m4 l4 card-panel z-depth-1">
                  <ul class="collection">
                     <div class="row">
                        <div class="col s12">
                           <nav class="indigo">
                              <div class="nav-wrapper">
                                 <div class="left col s12">
                                    <div class="input-field col s12"> <i class="material-icons prefix">search</i>
                                       <input id="icon_prefix" placeholder="search" type="text" class="validate" ng-model="filter">
                                    </div>
                                 </div>
                              </div>
                           </nav>
                        </div>
                     </div>
                     <div class= "scroll">
                        <li class="collection-item avatar waves-effect waves-teal col s12" ng-class="{selected: member.memberid === selected.memberid}" ng-repeat="member in members | filter: filter | limitTo:1000:1000">
                           <a href="javascript::void(0)" ng-click="select(member)">
                              <div style="margin-top: 10px;">
                                 <span class="circle light-blue" style="padding: 10px;">{{member.firstname.slice(0,1)}}</span>
                                 <span class="email-title">{{member.firstname}}</span>
                                 <p class="truncate grey-text ultra-small">{{member.texcono}}</p>
                                 <p class="truncate grey-text ultra-small">{{member.serviceno}}</p>
                              </div>
                           </a>
                        </li>
                        <div>
                  </ul>
                  </div>
                  <div id="Client-details" class="col s12 m8 l8 card-panel z-depth-1">
                  <div class="email-content-wrap">
                  <div class="row z-depth-1" style="background-color: #eee;">
                  <div class="col s12 m10 l10">
                  <ul class="collection">
                  <li class="collection-item avatar" style="background-color:transparent">
                  <img src="<?php echo base_url("assets/images/photo.png")?>" alt="" class="circle">
                  <span class="email-title">{{selected.firstname}} {{selected.lastname}}</span>
                  <p class="truncate grey-text ultra-small">{{selected.texcono}}</p>
                  <p class="grey-text ultra-small">{{selected.serviceno}}</p>
                  </li>
                  </ul>
                  </div>
                  <div class="col s2 m2 l2 right-align resultframe">
                  <?php if($roledata['permissions']['EMEMBERS']==1) {?>
                  <a id="editmember" ng-click="editmemberblock()"><span><i class="small icon darken-1 mdi mdi-account-edit"></i></span></a>
                  <?php } ?>
                  <?php if($roledata['permissions']['DMEMBERS']==1) {?>
                  <a ng-click='removememberblock()'><span><i class="small icon mdi mdi-delete"></i></span></a>
                  <?php } ?>
                  </div>
                  </div>
                  <div class="row">
                     <div class="col s12 m6 l6">
                        <p class="blue-grey-text"><strong>First Name</strong> </p>
                        <p>{{selected.firstname}} </p>
                     </div>
                     <div class="col  s12 m6 l6">
                        <p class="blue-grey-text"><strong>Mobile</strong> </p>
                        <p>{{selected.mobile}}</p>
                     </div>
                  </div>
                  <div class="row">
                     <div class="col s12 m6 l6">
                        <p class="blue-grey-text"><strong>Service No(Army No)</strong> </p>
                        <p>{{selected.serviceno}}</p>
                     </div>
                     <div class="col  s12 m6 l6">
                        <p class="blue-grey-text"><strong>Texco No</strong> </p>
                        <p>{{selected.texcono}} </p>
                     </div>
                  </div>
                  <div class="row">
                     <div class="col s12 m6 l6">
                        <p class="blue-grey-text"><strong>Reason</strong> </p>
                        <p>{{selected.reason}}</p>
                     </div>
                     <div class="col  s12 m6 l6">
                        <p class="blue-grey-text"><strong>Comment</strong> </p>
                        <p>{{selected.comment}}</p>
                     </div>
                  </div>
                  <div class="row">
                     <div class="col s12 m6 l6" ng-show="selected.ispfblock == 0">
                        <p class="blue-grey-text"><strong>Block End Date</strong> </p>
                        <p>{{selected.enddate}}</p>
                     </div> 
                     <div class="col s12 m6 l6" ng-show="selected.lifetimeblock == 1">
                        <p class="blue-grey-text"><strong>Block End Date</strong> </p>
                        <p>Permenent Block</p>
                     </div>
                     <div class="col s12 m6 l6" ng-show="selected.ispfblock == 1">
                        <p class="blue-grey-text"><strong>Is PF Block</strong> </p>
                        <p>Yes</p>
                     </div>
                     <div class="col s12 m6 l6" ng-show="selected.isrepcoblock == 1">
                        <p class="blue-grey-text"><strong>Received Repco Settlement</strong> </p>
                        <p>Yes</p>
                     </div>
                  </div>
                  </div>
                  </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
<script>
    $("#serviceno").keyup(function(event) {
        if (event.keyCode === 13) {
            $("#btntexser").click();
        }
    });
</script>
<script type="text/javascript">
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

<script>
   $('.datepicker').pickadate({
      labelMonthNext: 'Go to the next month',
      labelMonthPrev: 'Go to the previous month',
      labelMonthSelect: 'Pick a month from the dropdown',
      labelYearSelect: 'Pick a year from the dropdown',
      selectMonths: true,
      selectYears: true,
      autoClose:true
   });

   // $('.datepicker').pickadate({
   //   labelMonthNext: 'Go to the next month',
   //   labelMonthPrev: 'Go to the previous month',
   //   labelMonthSelect: 'Pick a month from the dropdown',
   //   labelYearSelect: 'Pick a year from the dropdown',
   //   selectMonths: true,
   //   selectYears: true,
   //   autoClose:true,
   //   min : new Date()
   // })
   // $('#effectivedate').pickadate({
   //   labelMonthNext: 'Go to the next month',
   //   labelMonthPrev: 'Go to the previous month',
   //   labelMonthSelect: 'Pick a month from the dropdown',
   //   labelYearSelect: 'Pick a year from the dropdown',
   //   selectMonths: true,
   //   selectYears: true,
   //   min : new Date(),
   //   autoClose:true
   // });

//    //Time Picker:
// $('.timepicker').pickatime({
//     default: 'now',
//     twelvehour: false, // change to 12 hour AM/PM clock from 24 hour
//     donetext: 'OK',
//     autoclose: false,
//     vibrate: true, // vibrate the device when dragging clock hand
//     min: new Date(),
// });
</script>
