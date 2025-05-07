<script type="text/javascript" src="<?php echo base_url("assets/js/app/allemployees.js")?>"></script>
<link rel="stylesheet" type="text/css" href="<?php echo base_url("assets/css/ng-table.min.css")?>" />
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ng-table.min.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ui-bootstrap-tpls-0.11.0.js")?>"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.8.1/xlsx.full.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/2.6.0/jszip.min.js"></script>
<div class="parallax-container" style="background-color: rgba(0, 12, 78, 0.9)">
   <div class="row">
      <div class="container">
         <div class="col s12 m6 l6">
            <div class="pagebannertext white-text" >Employee Report</div>
         </div>
         <div class="col s12 m6 l6 right-align">
            <div class="dumheight hide-on-small-only"> </div>
            <div class=""> <a href="<?php echo base_url('admin/dashboard')?>" class="breadcrumb">Home</a> <span class="breadcrumb">Employee Report</span> </div>
         </div>
      </div>
   </div>
   <div class="parallax"><img src="<?php echo base_url("assets/images/breadcrumbbanner.jpg")?>"></div>
</div>
<div  class="row" ng-app="appEmployees" style="padding-top:30px;">
   <div  class="container" ng-controller="ctrlEmployees">
      <div class ="col s12 m12 l12">
         <!-- <div class="row">
            <div class="input-field col s4">
               <select name="districtid" ng-model="objemployee.districtid"  data-ng-options=" d.lkvalid as d.description for d in district">  <option value=""></option> 
               </select>
               <label for="districtid">District</label>
            </div>
            <div class="input-field col s4">
               <select name="regionid" ng-model="objemployee.regionid"  data-ng-options=" r.lkvalid as r.description for r in region">
                <option value=""></option> 
               </select>
               <label for="regionid">Region</label>
            </div>
            <div class="input-field col s4">
               <select name="statusid" ng-model="objemployee.statusid"  data-ng-options=" d.lkvalid as d.description for d in status">
              <option value=""></option> 
               </select>
               <label for="statusid">Status</label>
            </div>
         </div> -->
         <div class="row">
            <div class="col s12 m6 l6">
               <div class="card blue-grey lighten-1">
                  <div class="card-action">
                  <div class="card-content white-text">
                     <p class="text-black">You can View all Employees.</p>
                  </div>
                     <button ng-click="submitemployee()" ng-init="submitemployee()" class="btn cyan waves-effect waves-light" type="submit">View Employee
                     <i class="mdi-content-send right"></i>
                     </button>
                  </div>
               </div>
            </div>
             <?php if($roledata['permissions']['EEREPORT']==1) {?>
            <div class="col s12 m6 l6">
               <div class="card blue-grey lighten-1">
                  <div class="card-action">
                   <div class="card-content white-text">
                     <p class="text-black">You can Export all employees from an excel file.</p>
                      </div>
                     <button ng-click="exportemployee()" class="btn cyan waves-effect waves-light" type="submit">Export Employee
                     <i class="mdi-content-send right"></i>
                     </button>
                  </div>
               </div>
            </div>
            <?php } ?> 
         </div>
      </div>
      <div>
     <!--  <div class="row">
            <div class="input-field col s1 m1 l1">
               <label style="padding-left:25">Show</label>
            </div>
            <div class="input-field col s1 m1 l1">
               <select  ng-model="viewby" ng-change="setItemsPerPage(viewby)">
                  <option >10</option>
                  <option>25</option>
                  <option>50</option>
                  <option>100</option>
                  <option>All</option>
               </select>
            </div>
            <div class="input-field col s1 m1 l1">
               <label >Entries</label>
            </div>
         </div> -->
         <table ng-table="tableParams" class="responsive-table highlight striped" show-filter="true" class="bordered">
            <tbody ng-repeat="applied in $data">
               <tr>
                  <td width="5%" data-title="'SNO'">{{$index + 1}}</td>
                  <td  data-title="'TEXCONO'" filter="{texcono: 'text'}" sortable="'projno'">{{applied.texcono}} </td>
                  <td  data-title="'SERVICENO'" filter="{serviceno: 'text'}" sortable="'serviceno'">{{applied.serviceno}}</td>
                  <td  data-title="'EMPLOYEE'" filter="{name: 'text'}" sortable="'name'">{{applied.name}} </td>
                  <td  data-title="'FATHERNAME'" filter="{fathername: 'text'}" sortable="'fathername'">
                  <td  data-title="'PROJNO'" filter="{projno: 'text'}" sortable="'projno'">{{applied.projno}} </td>{{applied.fathername}} </td>
                  <td data-title="'AM'" filter="{am: 'text'}" sortable="'am'">{{applied.am}}</td>
                  <td data-title="'MOBILE'" filter="{mobile: 'text'}" sortable="'mobile'">{{applied.mobile}}</td>
                  <td  data-title="'ADDRESS1'" filter="{add1: 'text'}" sortable="'add1'">{{applied.add1}} </td>
                  <td  data-title="'ADDRESS2'" filter="{add2: 'text'}" sortable="'add2'"> {{applied.add2}}  </td>
                  <td  data-title="'TALUK'" filter="{taluk: 'text'}" sortable="'taluk'">{{applied.taluk}} </td>
                  <td  data-title="'DISTRICT'" filter="{district: 'text'}" sortable="'district'"> {{applied.district}}  </td>
                  <td  data-title="'PINCODE'" filter="{pincode: 'text'}" sortable="'pincode'">{{applied.pincode}} </td>
                  <td data-title="'DOB'" filter="{dob: 'text'}" sortable="'dob'">{{applied.dob}}</td>
                  <td  data-title="'DOJ'" filter="{doj: 'text'}" sortable="'doj'">{{applied.doj}}</td>
                  <td  data-title="'RANK'" filter="{rank: 'text'}" sortable="'rank'">{{applied.rank}}</td>
                  <td  data-title="'CORPS'" filter="{corps: 'text'}" sortable="'corps'">{{applied.corps}}</td>
                  <td  data-title="'TRADE'" filter="{trade: 'text'}" sortable="'trade'">{{applied.trade}}</td>
                  <td  data-title="'CATEGORY'" filter="{category: 'text'}" sortable="'category'">{{applied.category}} </td>
                  <td  data-title="'ACCOUNTNO'" filter="{accountno: 'text'}" sortable="'accountno'">{{applied.accountno}} </td>
                  <td  data-title="'RELIGION'" filter="{religion: 'text'}" sortable="'religion'">{{applied.religion}} </td>
                  <td  data-title="'COMMUNITY'" filter="{community: 'text'}" sortable="'community'">{{applied.community}} </td>
                  <td  data-title="'NATIONALITY'" filter="{nationality: 'text'}" sortable="'nationality'">{{applied.nationality}} </td>
                  <td  data-title="'PFNO'" filter="{pfno: 'text'}" sortable="'pfno'">{{applied.pfno}} </td>
                  <td  data-title="'PFNAME'" filter="{pfname: 'text'}" sortable="'pfname'">{{applied.pfname}} </td>
                  <td  data-title="'ENTRYDATE'" filter="{entrydate: 'text'}" sortable="'entrydate'">{{applied.entrydate}} </td>
                  <td  data-title="'ESMIDCARDNO'" filter="{esmidcardno: 'text'}" sortable="'esmidcardno'">{{applied.esmidcardno}}</td>
                  <td  data-title="'LASTACCESS'" filter="{lastaccess: 'text'}" sortable="'lastaccess'">{{applied.lastaccess}} </td>
                   <td  data-title="'CIVILQUAL'" filter="{civilqual: 'text'}" sortable="'civilqual'">{{applied.civilqual}} </td>
                  <td  data-title="'ARMYQUAL'" filter="{armyqual: 'text'}" sortable="'armyqual'">{{applied.armyqual}} </td>
                  <td  data-title="'NOMINEE'" filter="{nominee: 'text'}" sortable="'nominee'">{{applied.nominee}} </td>
               </tr>
            </tbody>
         </table>
        <!-- <ul class="pagination theme-pagi">
            <pagination total-items="totalItems" ng-model="currentPage" max-size="maxSize" class="pagination-sm" boundary-links="true" rotate="false" num-pages="numPages" items-per-page="itemsPerPage"></pagination>
         </ul> -->
         <!-- Pagination --> 
      </div>
   </div>
</div>
<style type="text/css">
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
