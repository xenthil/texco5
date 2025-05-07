<script type="text/javascript" src="<?php echo base_url("assets/js/app/postedlistreport.js")?>"></script>
<link rel="stylesheet" type="text/css" href="<?php echo base_url("assets/css/ng-table.min.css")?>" />
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ng-table.min.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ui-bootstrap-tpls-0.11.0.js")?>"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.8.1/xlsx.full.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/2.6.0/jszip.min.js"></script>
<div class="parallax-container" style="background-color: rgba(0, 12, 78, 0.9)">
   <div class="row">
      <div class="container">
         <div class="col s12 m6 l6">
            <div class="pagebannertext white-text" >Postedlist Report</div>
         </div>
         <div class="col s12 m6 l6 right-align">
            <div class="dumheight hide-on-small-only"> </div>
            <div class=""> <a href="<?php echo base_url('admin/dashboard')?>" class="breadcrumb">Home</a> <span class="breadcrumb">Postedlist Report</span> </div>
         </div>
      </div>
   </div>
   <div class="parallax"><img src="<?php echo base_url("assets/images/breadcrumbbanner.jpg")?>"></div>
</div>
<div  class="row" ng-app="appPostedlistreport" style="padding-top:30px;">
   <div  class="container" ng-controller="ctrlPostedlistreport">
      <div class ="col s12 m12 l12">
       <div class="row">
            <div class="input-field col s4">
               <select name="posteddate" ng-model="objjobposting.closedate"  data-ng-options="  d.closedate as d.closedate for d in date">
              <option value=""></option> 
               </select>
               <label for="statusid">Close Date</label>
            </div>
         </div>
         <div class="row">
            <div class="col s12 m6 l6">
               <div class="card blue-grey lighten-1">
                  <div class="card-action">
                  <div class="card-content white-text">
                     <p class="text-black">You can View Current Postedlist.</p>
                  </div>
                     <button ng-click="submitpostedlist(objjobposting)" class="btn cyan waves-effect waves-light" type="submit">View Postedlist
                     <i class="mdi-content-send right"></i>
                     </button>
                  </div>
               </div>
            </div>
            <?php if($roledata['permissions']['EPREPORT']==1) {?>
            <div class="col s12 m6 l6">
               <div class="card blue-grey lighten-1">
                  <div class="card-action">
                   <div class="card-content white-text">
                     <p class="text-black">You can Export postedlist from an excel file.</p>
                      </div>
                     <button ng-click="exportpostedlist(objjobposting)" class="btn cyan waves-effect waves-light" type="submit">Export Postedlist
                     <i class="mdi-content-send right"></i>
                     </button>
                  </div>
               </div>
            </div>
            <?php } ?>
         </div>
      </div>
      <div>
         <table ng-table="tableParams" class="responsive-table highlight striped" fixed-table-headers="scrollable-area" show-filter="true" class="bordered">
            <tbody ng-repeat="applied in $data">
               <tr>
                 <td width="5%" data-title="'SNO'" filter="{sno: 'number'}" sortable="'sno'">{{applied.sno}}</td> 
                 <td width="7%" data-title="'REGNO'" filter="{registrationno: 'number'}" sortable="'registrationno'">{{applied.registrationno}}</td>
                 <td width="7%" data-title="'TEXCONO'" filter="{texcono: 'number'}" sortable="'texcono'">{{applied.texcono}}</td>
                 <td width="7%" data-title="'SERVICENO'" filter="{serviceno: 'text'}" sortable="'serviceno'">{{applied.serviceno}}</td>
                 <td width="7%" data-title="'RANK'" filter="{rank: 'text'}" sortable="'rank'">{{applied.rank}}</td>
                 <td width="12%" data-title="'NAME'" filter="{name: 'text'}" sortable="'name'">{{applied.name}}</td>
                 <td width="8%" data-title="'FATHERNAME'" filter="{fathername: 'text'}" sortable="'fathername'">{{applied.fathername}}</td>
                  <td width="12%" data-title="'DOB'" filter="{dob: 'text'}" sortable="'dob'">{{applied.dob}}</td>
                  <td width="15%" data-title="'NOK'" filter="{nominee: 'text'}" sortable="'nominee'">{{applied.nominee}}</td>
                  <td width="7%" data-title="'TRADE'" filter="{trade: 'text'}" sortable="'trade'">{{applied.clientname}}</td>
                  <td width="7%" data-title="'CORPS'" filter="{corps: 'text'}" sortable="'corps'">{{applied.corps}}  </td>
                  <td width="15%" data-title="'ADDRESS'" filter="{address: 'text'}" sortable="'address'">{{applied.address}} </td>
                  <td width="9%" data-title="'MOBILENO'" filter="{mobile: 'text'}" sortable="'mobile'">{{applied.mobile}} </td>
                  <td width="9%" data-title="'ESMIDNO'" filter="{esmidno: 'text'}" sortable="'esmidno'">{{applied.esmidno}} </td>
                  <td width="9%" data-title="'CHARACTER'" filter="{character: 'text'}" sortable="'character'">{{applied.character}}  </td>
                  <td width="9%" data-title="'RELIGION'" filter="{religion: 'text'}" sortable="'religion'">{{applied.religion}}  </td>
                  <td width="6%" data-title="'CASTE'" filter="{caste: 'text'}" sortable="'caste'">{{applied.caste}}  </td>
                  <td width="4%" data-title="'CIVILQUALI'" filter="{civilqual: 'text'}" sortable="'civilqual'">{{applied.civilqual}}</td>
                  <td width="4%" data-title="'ARMYQUALI'" filter="{armyqual: 'text'}" sortable="'armyqual'">{{applied.armyqual}}</td>
                  <td width="7%" data-title="'AM'" filter="{am: 'text'}" sortable="'am'">{{applied.am}}</td>
                  <td width="5%" data-title="'DISTRICT'" filter="{projectdistrict: 'text'}" sortable="'projectdistrict'">{{applied.projectdistrict}}</td>
                  <td width="5%" data-title="'PROJECTNO'" filter="{projectno: 'text'}" sortable="'projectno'">{{applied.projectno}}</td>
                  <td width="5%" data-title="'PROJECTNAME'" filter="{projectname: 'text'}" sortable="'projectname'">{{applied.projectname}}</td>
                  <td width="5%" data-title="'CAT'" filter="{category: 'text'}" sortable="'category'">{{applied.category}}</td>
                  <td width="10%" data-title="'POSTEDDATE'" filter="{posteddate: 'text'}" sortable="'posteddate'">{{applied.posteddate}} </td>
                  <td width="10%" data-title="'AADHAARNUMBER'" filter="{aadhaarno: 'text'}" sortable="'aadhaarno'">{{applied.aadhaarno}} </td>
               </tr>
            </tbody>
         </table>
      </div>
   </div>
</div>
<style type="text/css">
   .ng-table-pager {
   display: none;
   }
   .striped {
   display: block;
   height: 600px;
   overflow-y: scroll;
   overflow-x: scroll;
   }
   table, td  {
   border: 1px solid #d0cdcd;
   border-collapse: collapse;
   }
</style>
