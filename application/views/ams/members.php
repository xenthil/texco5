

<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ng-table.min.js")?>"></script>
<link rel="stylesheet" type="text/css" href="<?php echo base_url("assets/css/ng-table.min.css")?>" />
<script type="text/javascript" src="<?php echo base_url("assets/js/app/members.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ui-bootstrap-tpls-0.11.0.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/jquery.formatter.min.js")?>"></script> 
<script type="text/javascript">
   var memberid = 0;
</script> 

<div class="parallax-container" style="background-color: rgba(0, 12, 78, 0.9)">
   <div class="row">
      <div class="container">
         <div class="col s12 m6 l6">
            <div class="pagebannertext white-text">Employees (Ex-servicemens)</div>
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
      <!-- Modal Window for new and Edit -->
      <div class="fixed-action-btn" style="bottom: 50px; right: 19px;">
         <?php if($roledata['permissions']['AMEMBERS']==1) {?>
         <a class="btn-floating btn-large red modal-trigger" ng-click='addmember()'>
         <i class="mdi mdi-account-plus"></i>
         </a>
         <?php } ?>
      </div>
      <!-- Modal Structure -->
      <?php echo $newmember ?>
      <div id="" class="section">
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
                           <a id="editmember" ng-click="editmember()"><span><i class="small icon darken-1 mdi mdi-account-edit"></i></span></a>
                           <?php } ?>
                           <?php if($roledata['permissions']['DMEMBERS']==1) {?>
                           <a ng-click='removemember()'><span><i class="small icon mdi mdi-delete"></i></span></a>
                           <?php } ?>
                        </div>
                     </div>
                     <div class="row">
                        <div class="col s12 m6 l6">
                           <p class="blue-grey-text"><strong>First Name</strong> </p>
                           <p>{{selected.firstname}} </p>
                        </div>
                        <div class="col s12 m6 l6">
                           <p class="blue-grey-text"><strong>Father Name</strong> </p>
                           <p>{{selected.fathername}} </p>
                        </div>
                     </div>
                     <div class="row">
                        <div class="col  s12 m6 l6">
                           <p class="blue-grey-text"><strong>DOB</strong> </p>
                           <p>{{selected.dob}}</p>
                        </div>
                        <div class="col s12 m6 l6">
                           <p class="blue-grey-text"><strong>Email</strong> </p>
                           <p>{{selected.email}} </p>
                        </div>
                     </div>
                     <div class="row">
                        
                        <div class="col  s12 m6 l6">
                           <p class="blue-grey-text"><strong>Mobile</strong> </p>
                           <p>{{selected.mobile}}</p>
                        </div>
                         <div class="col s12 m6 l6">
                           <p class="blue-grey-text"><strong>Gender</strong> </p>
                           <p>{{selected.genderid ? "Female":"Male"}} </p>
                        </div>
                     </div>
                     <div class="row">
                        <div class="col  s12 m6 l6">
                           <p class="blue-grey-text"><strong>Date Of Joinning</strong> </p>
                           <p>{{selected.doj}} </p>
                        </div>
                        <div class="col s12 m6 l6">
                           <p class="blue-grey-text"><strong>Address</strong> </p>
                           <p style=" max-width:400px;
    word-wrap:break-word;">{{selected.address}} </p>
                        </div>
                     </div>
                     <div class="row">
                        <div class="col s12 m6 l6">
                           <p class="blue-grey-text"><strong>Village</strong> </p>
                           <p>{{selected.village}} </p>
                        </div>
                        <div class="col  s12 m6 l6">
                           <p class="blue-grey-text"><strong>Taluk</strong> </p>
                           <p>{{selected.taluk}} </p>
                        </div>
                     </div>
                     <div class="row">
                        <div class="col s12 m6 l6">
                           <p class="blue-grey-text"><strong>District</strong> </p>
                           <p>{{selected.district}} </p>
                        </div>
                        <div class="col s12 m6 l6">
                           <p class="blue-grey-text"><strong>State</strong> </p>
                           <p>{{selected.state}} </p>
                        </div>
                     </div>
                     <div class="row">
                        <div class="col  s12 m6 l6">
                           <p class="blue-grey-text"><strong>Country</strong> </p>
                           <p>{{selected.country}}</p>
                        </div>
                         <div class="col s12 m6 l6">
                           <p class="blue-grey-text"><strong>Pincode</strong> </p>
                           <p>{{selected.pincode}} </p>
                        </div>
                     </div>
                     <div class="row">
                        <div class="col  s12 m6 l6">
                           <p class="blue-grey-text"><strong>Region</strong> </p>
                           <p>{{selected.region}} </p>
                        </div>
                         <div class="col s12 m6 l6">
                           <p class="blue-grey-text"><strong>Address for communication</strong> </p>
                           <p>{{selected.communicationaddress}}</p>
                        </div>
                     </div>
                     <div class="row">
                        <div class="col  s12 m6 l6">
                           <p class="blue-grey-text"><strong>Aadhaar No</strong> </p>
                           <p>{{selected.aadhaarno}}</p>
                        </div>
                        <div class="col s12 m6 l6">
                           <p class="blue-grey-text"><strong>Nominee (Relation)</strong> </p>
                           <p>{{selected.nominee}} {{selected.nomineerelation}}</p>
                        </div>
                     </div>
                     <div class="row">
                        <div class="col  s12 m6 l6">
                           <p class="blue-grey-text"><strong>Rank</strong> </p>
                           <p>{{selected.rank}}</p>
                        </div>
                        <div class="col s12 m6 l6">
                           <p class="blue-grey-text"><strong>Army Qualification</strong> </p>
                           <p>{{selected.armyqual}}</p>
                        </div>
                     </div>
                     <div class="row">
                        <div class="col  s12 m6 l6">
                           <p class="blue-grey-text"><strong>Corps</strong> </p>
                           <p>{{selected.corps}}</p>
                        </div>
                        <div class="col s12 m6 l6">
                           <p class="blue-grey-text"><strong>Trade</strong> </p>
                           <p>{{selected.trade}}</p>
                        </div>
                     </div>
                     <div class="row">
                        <div class="col  s12 m6 l6">
                           <p class="blue-grey-text"><strong>Ex ID No</strong> </p>
                           <p>{{selected.esmidno}}</p>
                        </div>
                        <div class="col s12 m6 l6">
                           <p class="blue-grey-text"><strong>Character</strong> </p>
                           <p>{{selected.character}}</p>
                        </div>
                     </div>
                     <div class="row">
                        <div class="col  s12 m6 l6">
                           <p class="blue-grey-text"><strong>Religion</strong> </p>
                           <p>{{selected.religion}}</p>
                        </div>
                         <div class="col s12 m6 l6">
                           <p class="blue-grey-text"><strong>Caste</strong> </p>
                           <p>{{selected.caste}}</p>
                        </div>
                     </div>
                     <div class="row">
                        <div class="col  s12 m6 l6">
                           <p class="blue-grey-text"><strong>Civil Qualification</strong> </p>
                           <p>{{selected.civilqual}}</p>
                        </div>
                        <div class="col s12 m6 l6" >
                           <p class="blue-grey-text"><strong>Dependent</strong> </p>
                           <p ng-show="selected.dependentstatus==1">Yes</p>
                        </div>
                     </div>
                     <div class="row" ng-hide="selected.dependentstatus == 0">
                        <div class="col  s12 m6 l6">
                           <p class="blue-grey-text"><strong>Dependent Name</strong> </p>
                           <p>{{selected.dependentname}}</p>
                        </div>
                     </div>
                     <div class="row">
                        <div class="col s12 m6 l6">
                           <p class="blue-grey-text"><strong>Service No(Army No)</strong> </p>
                           <p>{{selected.serviceno}}</p>
                        </div>
                        <div class="col  s12 m6 l6">
                           <p class="blue-grey-text"><strong>Account No</strong> </p>
                           <p>{{selected.accountno}} </p>
                        </div>
                     </div>
                     <div class="row">
                        <div class="col s12 m6 l6">
                           <p class="blue-grey-text"><strong>Registration No</strong> </p>
                           <p>{{selected.registrationno}}</p>
                        </div>
                        <div class="col  s12 m6 l6">
                           <p class="blue-grey-text"><strong>Texco No</strong> </p>
                           <p>{{selected.texcono}}</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
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