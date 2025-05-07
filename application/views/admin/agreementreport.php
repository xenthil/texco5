<script type="text/javascript" src="<?php echo base_url("assets/js/app/agreementreport.js")?>"></script>
<link rel="stylesheet" type="text/css" href="<?php echo base_url("assets/css/ng-table.min.css")?>" />
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ng-table.min.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ui-bootstrap-tpls-0.11.0.js")?>"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.8.1/xlsx.full.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/2.6.0/jszip.min.js"></script>
<div class="parallax-container" style="background-color: rgba(0, 12, 78, 0.9)">
   <div class="row">
      <div class="container">
         <div class="col s12 m6 l6">
            <div class="pagebannertext white-text" >Agreement Report</div>
         </div>
         <div class="col s12 m6 l6 right-align">
            <div class="dumheight hide-on-small-only"> </div>
            <div class=""> <a href="<?php echo base_url('admin/dashboard')?>" class="breadcrumb">Home</a> <span class="breadcrumb">Account Reports</span> <span class="breadcrumb">Agreement Report</span> </div>
         </div>
      </div>
   </div>
   <div class="parallax"><img src="<?php echo base_url("assets/images/breadcrumbbanner.jpg")?>"></div>
</div>
<div  class="row" ng-app="appAgreementreport" style="padding-top:30px;">
   <div  class="container" ng-controller="ctrlAgreementreport">
      <div class ="col s12 m12 l12">
         <div class="row">
            <div class="input-field col s2">
               <select  name="agreementtypeid"  
                  ng-model="objagreement.agreementtypeid" data-ng-options="at.lkvalid as at.description for at in agreementtype">
                  <option value="">ALL</option> 
               </select>
               <label for="agreementtype">Agreement Type(Single/Combined)</label>
            </div>
            <div class="input-field col s2">
               <select  name="typeagreement"  ng-model="objagreement.typeagreement" data-ng-options="at.lkvalid as at.description for at in typeofagreement">
                  <option value="">ALL</option> 
               </select>
               <label for="typeagreement">Type of Agreement</label>
            </div>
            <div class="input-field col s2">
               <select  name="agreementstatus"   ng-model="objagreement.agreementstatus" data-ng-options="at.lkvalid as at.description for at in agreementstatus">
                  <option value="">ALL</option> 
               </select>
               <label for="agreementstatus">Agreement Status</label>
            </div>
            <div class="input-field col s2">
               <select name="wagetype"   ng-model="objagreement.wagetype" data-ng-options="at.lkvalid as at.description for at in wagetype">
                  <option value="">ALL</option> 
               </select>
               <label for="wagetype">Wage Type</label>
            </div>
            <div class="input-field col s2">
               <select  name="wagerate"  ng-model="objagreement.wageyearid" data-ng-options="at.lkvalid as at.description for at in wagerate">
                  <option value="">ALL</option> 
               </select>
               <label for="wagerate" data-error="Required">Wage Rate Year</label>
            </div>
            <div class="input-field col s2">
               <select name="wagearea" ng-model="objagreement.wageareaid" data-ng-options="at.lkvalid as at.description for at in wagearea" >
                  <option value="">ALL</option> 
               </select>
               <label for="wagearea" >Wage Area</label>
            </div>
         </div>
         <div class="row">
            <div class="col s12 m6 l6">
               <div class="card blue-grey lighten-1">
                  <div class="card-action">
                     <div class="card-content white-text">
                        <p class="text-black">You can View all Agreements.</p>
                     </div>
                     <button ng-click="submitagreement(objagreement)" class="btn cyan waves-effect waves-light" type="submit">View Agreements
                     <i class="mdi-content-send right"></i>
                     </button>
                  </div>
               </div>
            </div>
            <?php if($roledata['permissions']['EAGREPORT']==1) {?>
            <div class="col s12 m6 l6">
               <div class="card blue-grey lighten-1">
                  <div class="card-action">
                     <div class="card-content white-text">
                        <p class="text-black">You can Export all Agreements to an excel file.</p>
                     </div>
                     <!-- ng-click="exportagreement(objagreement)" -->
                     <button  class="btn cyan waves-effect waves-light" type="submit" ng-click="exportagreement(objagreement)">Export Agreements
                     <i class="mdi-content-send right"></i>
                     </button>
                  </div>
               </div>
            </div>
            <?php } ?>
         </div>
      </div>
      <div>
         <!-- <div class="row">
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
            <tbody ng-repeat="item in $data" >
               <tr>
                  <td width="4%" data-title="'SNO'">{{$index + 1}}</td> 
                  <td width="6%" data-title="'PROJECTNO'"  filter="{projectno: 'text'}" sortable="'projectno'">{{item.projectno}}</td>
                  <td width="10%" data-title="'PROJECT'" filter="{projectname: 'text'}" sortable="'projectname'">{{item.projectname}}</td>
                  <td width="6%" data-title="'DESIGNATION'" filter="{designation: 'text'}" sortable="'designation'">The {{item.designation}}</td>
                  <td width="6%" data-title="'EMPLOYER'"  filter="{clientname: 'text'}" sortable="'clientname'">{{item.clientname}}</td>
                  <td  width="6%" data-title="'REGION'" filter="{region: 'text'}" sortable="'region'">{{item.region}}</td>
                  <td width="6%" data-title="'DISTRICT'" filter="{district: 'text'}" sortable="'district'">{{item.district}}</td>
                  <td width="6%" data-title="'TALUK'" filter="{taluk: 'text'}" sortable="'taluk'">{{item.taluk}}</td>
                  <td  width="6%" data-title="'FROMDATE'" filter="{fromdate: 'text'}" sortable="'fromdate'">{{item.fromdate}}</td>
                  <td width="6%" data-title="'TODATE'" filter="{todate: 'text'}" sortable="'todate'">{{item.todate}}</td>
                  <td  width="6%" data-title="'AGTYPE'" filter="{agreementtype: 'text'}" sortable="'agreementtype'">{{item.agreementtype}}</td>
                  <td width="6%" data-title="'AGREEMENTTYPE'" filter="{agtype: 'text'}" sortable="'agtype'">{{item.agtype}}</td>
                  <td  width="6%" data-title="'AGREEMENTSTATUS'" filter="{agreementstatus: 'text'}" sortable="'agreementstatus'">{{item.agreementstatus}} </td>
                  <td width="6%" data-title="'WAGETYPE'" filter="{wagetype: 'text'}" sortable="'wagetype'">{{item.wagetype}} </td>
                  <td width="6%" data-title="'WAGEYEAR'" filter="{wageyear: 'text'}" sortable="'wageyear'">{{item.wageyear}} </td>
                  <td  width="6%" data-title="'WAGEAREA'" filter="{wagearea: 'text'}" sortable="'wagearea'">{{item.wagearea}} </td>
                  <td  width="6%" data-title="'SG'" filter="{sg: 'number'}" sortable="'sg'">{{item.sg}}</td>
                   <td width="6%"  data-title="'HSG'" filter="{hsg: 'number'}" sortable="'hsg'">{{item.hsg}}</td>
                   <td  width="6%" data-title="'DVR'" filter="{dvr: 'number'}" sortable="'dvr'">{{item.dvr}}</td>
                   <td  width="6%" data-title="'ASO'" filter="{aso: 'number'}" sortable="'aso'">{{item.aso}}</td>
                  <td  width="6%" data-title="'PO'" filter="{po: 'number'}" sortable="'po'">{{item.po}}</td>
                  <td  width="6%" data-title="'JA'" filter="{ja: 'number'}" sortable="'ja'">{{item.ja}}</td>
                  <td  width="6%" data-title="'OTHER'" filter="{other: 'number'}" sortable="'other'">{{item.other}}</td>
                  <td  width="6%" data-title="'OA'" filter="{oa: 'number'}" sortable="'oa'">{{item.oa}}</td>
                 <td  width="6%" data-title="'GUN'" filter="{gun: 'number'}" sortable="'gun'">{{item.gun}}</td>
               </tr>
            </tbody>
         </table>
         <!-- <ul class="pagination theme-pagi">
            <pagination total-items="totalItems" ng-model="currentPage" max-size="maxSize" class="pagination-sm" boundary-links="true" rotate="false" num-pages="numPages" items-per-page="itemsPerPage"></pagination>
         </ul> -->
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