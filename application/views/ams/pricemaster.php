<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ng-table.min.js")?>"></script>
<link rel="stylesheet" type="text/css" href="<?php echo base_url("assets/css/ng-table.min.css")?>" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.8.1/xlsx.full.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/2.6.0/jszip.min.js"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/app/pricemaster.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ui-bootstrap-tpls-0.11.0.js")?>"></script>
<script type="text/javascript">
    var memberid = 0
</script>

<div class="parallax-container" style="background-color: rgba(0, 12, 78, 0.9)">
    <div class="row">
        <div class="container">
            <div class="col s12 m6 l6">
                <div class="pagebannertext white-text">WAGE MASTER</div>
            </div>
            <div class="col s12 m6 l6 right-align">
                <div class="dumheight hide-on-small-only"> </div>
                <div class=""> <a href="<?php echo base_url('admin/dashboard')?>" class="breadcrumb">Home</a> <span class="breadcrumb">Wage master</span> </div>
            </div>
        </div>
    </div>
    <div class="parallax"><img src="<?php echo base_url("assets/images/breadcrumbbanner.jpg")?>">
    </div>
</div>

<div class="row" ng-app="apppricemaster">
    <div class="container" ng-controller="ctrlpricemaster">
     <div class="row">
      <div class="col s12">
         <ul class="tabs">
            <li class="tab col s6"><a id="dgrselect"  style="cursor:pointer"  ng-click="selectyear(selected,'dgr')" href="#dgrvalue">DGR</a></li>
            <li class="tab col s6"><a id="tnselect" style="cursor:pointer" ng-click="selectyear(selected,'tn')" href="#tnvalue">TN</a></li>
         </ul>
       </div>
        <!-- Modal Window for new and Edit -->

     <div id="dgrvalue" class="col s12">
         <div id="modal2" class="modal modal-fixed-footer" style="max-height:90%;">
            <div class="modal-content">

                <nav class="blue" style="position: fixed;margin-top: 0px; z-index:999">
                    <div class="left col s1 m1 l1">
                        <div class="white-text"><a href=""><i class="modal-action modal-close mdi white-text mdi-arrow-left"></i></a> </div>
                    </div>
                    <div class="col s11 m11 l11">
                        <div class="li white-text" id="mcaption">Price Master</div>
                    </div>
                </nav>

                <div class="row" style="padding: 24px;">
                    <form ng-submit=" savepricemaster(objprice)" id="pricemaster" name="pricemaster" novalidate>
                        <div class="row" style="height:40px;">&nbsp;</div>
                        <div class="row">
                            <div class="col s12">
                                <input type="hidden" ng-model="objprice.priceid">


                                    <div class="input-field col s12">
                                    <select name="wagetype" ng-model="objprice.wagetype"  ng-class="{'submitted': submitted && projectform.wagetype.$invalid}" ng-required="true" data-ng-options=" c.wagetype as c.description for c in wagetype">
                                        </select>
                                        <label for="client">Wage Type</label>
                                    </div>
                                    <div class="input-field col s12">
                                        <input id="projectno" name="projectno" ng-class="{'submitted': submitted && projectform.projectno.$invalid}" type="text" class="validate" ng-required="true" maxlength="20" ng-model="objproject.projectno">
                                        <label for="projectno" data-error="Required">Project No</label>
                                    </div>
                                    <div class="input-field col s12">
                                        <input id="projectno" name="projectno" ng-class="{'submitted': submitted && projectform.projectno.$invalid}" type="text" class="validate" ng-required="true" maxlength="20" ng-model="objproject.projectno">
                                        <label for="projectno" data-error="Required">Project No</label>
                                    </div>
                                    <div class="input-field col s12">
                                        <input id="projectno" name="projectno" ng-class="{'submitted': submitted && projectform.projectno.$invalid}" type="text" class="validate" ng-required="true" maxlength="20" ng-model="objproject.projectno">
                                        <label for="projectno" data-error="Required">Project No</label>
                                    </div>
                            </div>
                        </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="waves-effect waves-green btn-flat" type="submit" ng-click="submitted=true;">
                    Save
                </button>
                 <a href="" class="modal-action modal-close waves-effect btn-flat ">Cancel</a>
            </div>
            </form>
        </div>


        <!-- Modal Structure -->
            <div id="" class="section">
                <div class="row">
                    <div class="col s12 ">
                        <div id="Client-list" class="CLheight col s12 m2 10 card-panel z-depth-1">
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

                                <li class="collection-item avatar waves-effect waves-teal col s12" ng-class="{selected: year.lkvalid === selected}" ng-repeat="year in wageyear | filter: filter">
                                    <a href="javascript::void(0)" ng-click="selectyear(year.lkvalid,wagetypes)">
                                        <div style="margin-top: 10px;">
                                            <span class="email-title">{{year.description}}</span>
                                        </div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div id="Client-details" class="col s12 m10 22 card-panel z-depth-1">
                            <div class="email-content-wrap">

                        <ul class="collapsible" data-collapsible="accordion">
                          <li ng-repeat="jobmaster in dgrrate.areas">
                           <div class="collapsible-header"><i class="material-icons"><span >{{jobmaster.wagearea}}</i></span></div>
                             <div class="collapsible-body">

                               <table>
                                <thead>
                                  <tr>
                                    <td>
                                      <span class="part">Particulars</span>
                                    </td>
                                    <td  ng-repeat="wagemaster in jobmaster.wagesjobmaster">
                                        {{wagemaster.jobmastercode}}
                                    </td>
                                  </tr>
                                </thead>
                                <tbody>
                                    <tr ng-repeat="par in jobmaster.wagesjobmaster[0].particulars"  ng-init="particularIndex = $index">
                                      <td><span class="partamt" >{{par.particular}}</span> </td>
                                      <td  ng-repeat="wagemaster in jobmaster.wagesjobmaster" ng-init="particular = wagemaster.particulars[particularIndex]">
                                        <span ng-if="jobarea.check==false">{{wagemaster.particulars[particularIndex].amount}}</span>
                                        <span><input  type="text" ng-if="jobarea.check"  ng-model="wagemaster.particulars[particularIndex].amount"/>
                                        <a ng-init="jobarea.check=false;" ng-click='jobarea.check=!jobarea.check;'>
                                          <?php if($roledata['permissions']['EWAGE']==1) {?> 
                                          <span ng-if="jobarea.check==false"><i class="material-icons">mode_edit</i></span>
                                          <span ng-if="jobarea.check==true" ng-click="editpricemaster(particular.wageid, particular.particularid, wagemaster.jobmasterid, jobmaster.wageareaid, particular.amount)">
                                              <i  class="material-icons">mode_save</i>
                                          </span>
                                          <?php } ?>
                                          </span>
                                        </a>
                                      </td>
                                    </tr>
                                  </tbody>
                               </table>

                           </div>
                          </li>
                         </ul>
					                </div>
                          </div>
                        </div>
                </div>
            </div>
        </div>
        <div id="tnvalue" class="col s12">
         <div id="modal2" class="modal modal-fixed-footer" style="max-height:90%;">
            <div class="modal-content">

                <nav class="blue" style="position: fixed;margin-top: 0px; z-index:999">
                    <div class="left col s1 m1 l1">
                        <div class="white-text"><a href=""><i class="modal-action modal-close mdi white-text mdi-arrow-left"></i></a> </div>
                    </div>
                    <div class="col s11 m11 l11">
                        <div class="li white-text" id="mcaption">Price Master</div>
                    </div>
                </nav>

                <div class="row" style="padding: 24px;">
                    <form ng-submit=" savepricemaster(objprice)" id="pricemaster" name="pricemaster" novalidate>
                        <div class="row" style="height:40px;">&nbsp;</div>
                        <div class="row">
                            <div class="col s12">
                                <input type="hidden" ng-model="objprice.priceid">


                                    <div class="input-field col s12">
                                    <select name="wagetype" ng-model="objprice.wagetype"  ng-class="{'submitted': submitted && projectform.wagetype.$invalid}" ng-required="true" data-ng-options=" c.wagetype as c.description for c in wagetype">
                                        </select>
                                        <label for="client">Wage Type</label>
                                    </div>
                                    <div class="input-field col s12">
                                        <input id="projectno" name="projectno" ng-class="{'submitted': submitted && projectform.projectno.$invalid}" type="text" class="validate" ng-required="true" maxlength="20" ng-model="objproject.projectno">
                                        <label for="projectno" data-error="Required">Project No</label>
                                    </div>
                                    <div class="input-field col s12">
                                        <input id="projectno" name="projectno" ng-class="{'submitted': submitted && projectform.projectno.$invalid}" type="text" class="validate" ng-required="true" maxlength="20" ng-model="objproject.projectno">
                                        <label for="projectno" data-error="Required">Project No</label>
                                    </div>
                                    <div class="input-field col s12">
                                        <input id="projectno" name="projectno" ng-class="{'submitted': submitted && projectform.projectno.$invalid}" type="text" class="validate" ng-required="true" maxlength="20" ng-model="objproject.projectno">
                                        <label for="projectno" data-error="Required">Project No</label>
                                    </div>
                            </div>
                        </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="waves-effect waves-green btn-flat" type="submit" ng-click="submitted=true;">
                    Save
                </button>
                 <a href="" class="modal-action modal-close waves-effect btn-flat ">Cancel</a>
            </div>
            </form>
        </div>


        <!-- Modal Structure -->
            <div id="" class="section">
                <div class="row">
                    <div class="col s12 ">
                        <div id="Client-list" class="CLheight col s12 m2 10 card-panel z-depth-1">
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

                                <li class="collection-item avatar waves-effect waves-teal col s12" ng-class="{selected: year.lkvalid === selected}" ng-repeat="year in wageyear | filter: filter">
                                    <a href="javascript::void(0)" ng-click="selectyear(year.lkvalid,wagetypes)">
                                        <div style="margin-top: 10px;">
                                            <span class="email-title">{{year.description}}</span>
                                        </div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div id="Client-details" class="col s12 m10 22 card-panel z-depth-1">
                            <div class="email-content-wrap">

                        <ul class="collapsible" data-collapsible="accordion">
                        <li ng-repeat="jobmaster in dgrrate.areas">
                          <div class="collapsible-header"><i class="material-icons"><span >TN Wage</span></i></div>
                          <div class="collapsible-body">
                            <table>
                             <thead>
                               <tr>
                                 <td>
                                   <span class="part">Particulars</span>
                                 </td>
                                 <td  ng-repeat="wagemaster in jobmaster.wagesjobmaster">
                                     {{wagemaster.jobmastercode}}
                                 </td>
                               </tr>
                             </thead>
                             <tbody>
                                 <tr ng-repeat="par in jobmaster.wagesjobmaster[0].particulars"  ng-init="particularIndex = $index">
                                   <td><span class="partamt" >{{par.particular}}</span> </td>
                                   <td  ng-repeat="wagemaster in jobmaster.wagesjobmaster" ng-init="particular = wagemaster.particulars[particularIndex]">
                                     <span ng-if="jobarea.check==false">{{wagemaster.particulars[particularIndex].amount}}</span>
                                     <span><input  type="text" ng-if="jobarea.check"  ng-model="wagemaster.particulars[particularIndex].amount"/>
                                     <a ng-init="jobarea.check=false;" ng-click='jobarea.check=!jobarea.check;'>
                                     <?php if($roledata['permissions']['EWAGE']==1) {?>
                                       <span ng-if="jobarea.check==false"><i class="material-icons">mode_edit</i></span>
                                       <span ng-if="jobarea.check==true" ng-click="editpricemaster(particular.wageid, particular.particularid, wagemaster.jobmasterid, jobmaster.wageareaid, particular.amount)">
                                           <i  class="material-icons">mode_save</i>
                                       </span>
                                        <?php } ?>
                                       </span>
                                     </a>
                                   </td>
                                 </tr>
                               </tbody>
                            </table>


                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>


		<div class="col s12 m12 l6">
<?php if($roledata['permissions']['IWAGE']==1) {?>
            <div class="card blue-grey lighten-1">
            <div class="card-content white-text"  style="height:120px;">
              <span class="card-title">Import Wages</span>
              <p class="text-black">You can import wage details  <span><a style="color: #fff;font-weight: bold;margin-left: 21px;text-decoration: underline;" href="<?php echo base_url("assets/document/sample/wages.xlsx")?>" download> Download Sample</a></span>.</p>
              <form action="#">
                <div class="file-field input-field">
                  <div class="btn">
                  <span>File</span>
                  <input type="file" name="file" id="file" class="form-control" onchange="angular.element(this).scope().UploadFile(this.files)" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel">
                  </div>
                  <div class="file-path-wrapper">
                  <input class="file-path validate" type="text" placeholder="Upload File">
                  </div>
                </div>
              </form>
            </div>
            <div class="card-action">
                  <input type="button" value="Import" class="btn btn-success" ng-disabled="!SelectedFileForUpload"  ng-click="ParseExcelDataAndSave()" />
                  <span style="color:red">
                      {{Message}}
                  </span>
            </div>
          </div>
           <?php } ?>
        </div>

                </div>

            </div>

        </div>

<style>
.selected
{
	color:red
	}
	.partamt
	{ margin-right: 73px;
	}
	span.part {
    margin-right: 32px;
}
</style>
<script>
$(document).ready(function(){
    $('ul.tabs').tabs();
  });

</script>
