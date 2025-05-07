<script src="<?php echo base_url("assets/js/lib/angular-bootstrap-datepicker.js") ?>" charset="utf-8"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.8.4/moment.min.js"></script>

<link href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery-ui.css" rel="Stylesheet" type="text/css" />
<link href="<?php echo base_url("assets/css/datepicker.css") ?>" rel="Stylesheet" type="text/css" />
<script src="<?php echo base_url("assets/js/lib/angular-bootstrap-datepicker.js")?>" charset="utf-8"></script>
<link href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery-ui.css" rel="Stylesheet"
    type="text/css" />
<script src="<?php echo base_url("assets/js/lib/underscore.js")?>" charset="utf-8"></script> 
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.8.1/xlsx.full.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/2.6.0/jszip.min.js"></script>
<link href="<?php echo base_url("assets/css/datepicker.css")?>" rel="Stylesheet" type="text/css" />
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/jquery.formatter.min.js") ?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/underscore.js") ?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/app/memberhistoryform.js")?>"></script>

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
            <div class=""> <a href="<?php echo base_url('admin/dashboard')?>" class="breadcrumb">Home</a> 
            <span class="breadcrumb">Members</span> <span class="breadcrumb">Memberhistory Form</span> </div>
         </div>
      </div>
   </div>
   <div class="parallax"><img src="<?php echo base_url("assets/images/breadcrumbbanner.jpg")?>">
   </div>
</div>
<div class="row" ng-app="appMemberHistoryForm">
   <div class="container" ng-controller="ctrlMemberHistoryForm">
      <div id="modal2" class="modal modal-fixed-footer" style="max-height:90%;width: 70% !important;">
         <div class="modal-content">
            <nav class="blue" style="position: fixed;margin-top: 0px;z-index:999;">
               <div class="left col s1 m1 l1">
                  <div class="white-text"><a href=""><i class="modal-action modal-close mdi white-text mdi-arrow-left"></i></a> </div>
               </div>
               <div class="col s11 m11 l11">
                  <div class="li white-text" id="mcaption">Add MemberHistory</div>
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
               <form ng-submit="savememberhistory(objmember)" id="memberform" name="memberform" novalidate="novalidate">            
                  <div class="col s12" style="padding-top: 20px;">
                     <input type="hidden" ng-model="objmember.memberid">
                     <input type="hidden" ng-model="objmember.memhistoryid">
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
                        <p class="blue-grey-text"><strong>Current Texco No</strong> </p>
                        <p class="ng-binding">{{ objmember.currenttexcono }}</p>
                     </div>
                     <div class="col  s12 m3 l3">
                        <p class="blue-grey-text"><strong>Mobile</strong> </p>
                        <p class="ng-binding">{{ objmember.mobile }}</p>
                     </div>
                  </div>
                     <div class="row">
                        <div class="input-field col s4">
                           TexcoNo
                           <input id="texcono"  name="texcono" type="text" ng-class="{'submitted': submitted && memberform.texcono.$invalid}" type="text" ng-model="objmember.texcono" maxlength="250" class="validate" ng-required="true">
                        </div>
                        <div class="input-field col s4">
                           Project No
                           <select name="projectid" ng-model="objmember.projectid" ng-class="{'submitted': submitted && memberform.projectid.$invalid}" id="projectid" ng-required="true" ng-change="getprojectno(objmember.projectid);" data-ng-options=" p.projectid as p.projectno for p in projectnos">
                           </select>
                        </div> 
                        <div class="input-field col s4">
                           Job Category
                           <select name="jobmasterid" ng-model="objmember.jobmasterid" ng-class="{'submitted': submitted && memberform.jobmasterid.$invalid}" id="jobmasterid" ng-required="true" ng-change="getjobmasterno(objmember.jobmasterid);" data-ng-options="jm.jobmasterid as jm.code for jm in jobmasters">
                           </select>
                        </div>
                     </div>
                     <div class="row">
                        <div class="input-field col s6">
                           <input id="startdate" name="startdate" type="date" class="datepicker" type="text" ng-model="objmember.startdate" ng-required="true" ng-class="{'submitted': submitted && memberform.startdate.$invalid}">
                           <label for="startdate" data-error="Required" class="dp-click">Start Date</label>
                        </div>
                        <div class="input-field col s6">
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


      
      <div id="postingorderbulk" class="modal modal-fixed-footer" style="max-height:60%;">
         <form action="#">
            <div class="modal-content">
                  <nav class="blue" style="position: fixed;margin-top: 0px; z-index:999">
                     <div class="left col s1 m1 l1">
                        <div class="white-text"><a href=""><i class="modal-action modal-close mdi white-text mdi-arrow-left"></i></a> </div>
                     </div>
                     <div class="col s11 m11 l11">
                        <div class="li white-text" id="mcaption">Upload Memberhistory Details</div>
                     </div>
                  </nav>
                  <div class="row" style="padding: 24px;">
                     <div class="row" style="height:40px;">&nbsp;</div>
                     <div class="row">
                        <div class="col s12">
                           <div class="card-content text-black" style="height:200px;"> 
                              <span style="color:red">
                                 {{error}}
                              </span>
                              <br>
                              <p class="text-black">You can Upload Memberhistory<span><a style="color:#039be5;font-weight: bold;margin-left: 30px;text-decoration: underline;" href="<?php echo base_url("assets/document/sample/memberhistoryform.xlsx")?>" download > Download Sample</a></span>.<br>
                              <div class="file-field input-field">
                                 <div class="btn">
                                    <span>File</span>
                                    <input type="file" name="file" id="file" class="form-control" onchange="angular.element(this).scope().UploadFile(this.files)" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel">
                                 </div>
                                 <div class="file-path-wrapper">
                                    <input class="file-path validate" type="text" placeholder="Upload File" style="color:black">
                                 </div>
                                 <div ng-if="loading" style="margin-top: -210px !important;margin-right: 160px !important;"></div>
                              </div> 
                           </div>
                        </div>
                     </div>
                  </div>
            </div>
            <div class="modal-footer">
                  <button class="waves-effect waves-green btn-flat" type="button" ng-click="ParseExcelDataAndSave();" ng-disabled="!SelectedFileForUpload">
                  Import
                  </button> 
                  <a href="" class="modal-action modal-close waves-effect btn-flat ">Cancel</a>
            </div>
         </form>
      </div> 
      <div class="fixed-action-btn" style="bottom: 40px; right: 19px;">
         <?php if($roledata['permissions']['ADDMEHIS']==1) {?>
         <a class="btn-floating btn-large red modal-trigger tooltipped" ng-click='addmemberhistory()' data-tooltip="Add member History" data-position="left"> <i class="mdi mdi-account-plus"></i></a>
         <?php } ?>
      </div>
      <div class="fixed-action-btn" style="bottom: 120px; right: 19px;">
         <?php if($roledata['permissions']['ADDMEHIS']==1) {?>
         <a class="btn-floating btn-large red modal-trigger tooltipped" ng-click='memberbulkupload()' data-tooltip="Member History Upload" data-position="left"> <i class="mdi mdi-cloud-upload"></i></a>
         <?php } ?>
      </div>
      <!-- Modal Structure -->
      <?php // echo $newmember ?>
      <div id="" class="section">
        <div class="col s12 m12 l12">
            <!-- <button type="button" class="btn btn-default btncol" ng-click="exportRepco()" style="background: green;color: #fff !important;float:right;margin:10px;"><span class="glyphicon glyphicon-download-alt">&nbsp;</span>Download</button> -->
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
                  <?php if($roledata['permissions']['DMEMBERS']==1) {?>
                  <a id="editmember" ng-click="editmemberhistory()"><span><i class="small icon darken-1 mdi mdi-account-edit"></i></span></a>
                  <?php } ?>
                  <?php if($roledata['permissions']['DMEMBERS']==1) {?>
                  <a ng-click='removememberhistory()'><span><i class="small icon mdi mdi-delete"></i></span></a>
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
                        <p class="blue-grey-text"><strong>Project No</strong> </p>
                        <p>{{selected.projectno}}</p>
                     </div>
                     <div class="col  s12 m6 l6">
                        <p class="blue-grey-text"><strong>Category</strong> </p>
                        <p>{{selected.category}}</p>
                     </div>
                  </div>
                  <div class="row">
                     <div class="col s12 m6 l6">
                        <p class="blue-grey-text"><strong>Start Date</strong> </p>
                        <p>{{selected.startdate}}</p>
                     </div>
                     <div class="col  s12 m6 l6">
                        <p class="blue-grey-text"><strong>End Date</strong> </p>
                        <p>{{selected.enddate}}</p>
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
        selectYears: true
    });
    // $(".datepicker").datepicker().on("changeDate", function(e) {
    //     $('.datepicker-dropdown').hide();
    // });
</script>
