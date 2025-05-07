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
        <div class="col m12 s12">
            <form ng-submit="pricemasters.$valid && addwagemasterDetails(objaddwage)" id="pricemasters" name="pricemasters" novalidate>
                <br> 
                <a href="<?php echo base_url('admin/wagemaster') ?>" style="background: #ea9314;color: #fff !important;float:right;margin:10px;" class="modal-action waves-effect waves-green btn-flat" type="submit">Back</a> &nbsp;&nbsp;
                <div id="Client-details" class="col s12 m12 22 card-panel z-depth-1">
                    <div class="email-content-wrap">
                        <div class="col s12">
                            <br>
                            <div class="input-field col s2">
                                <select name="wagetype" ng-model="objaddwage.wagetype" ng-required="true" data-ng-options=" c.lkvalid as c.description for c in waget" ng-change="ChangeWageType(objaddwage.wagetype)" ng-class="{'submitted': submitted && pricemasters.$invalid}" >
                                    </select>
                                <label for="client" data-error="Required">Wage Type</label>
                            </div>
                            <div class="input-field col s2">
                                <select name="wageyear" ng-model="objaddwage.wageyear" ng-required="true" data-ng-options=" c.lkvalid as c.description for c in wageyear">
                                    </select>
                                <label for="client" data-error="Required">Wage Year</label>
                            </div>
                            <div class="input-field col s2">
                                <input id="category" name="category" type="text" class="validate" ng-required="true" maxlength="30" ng-model="objaddwage.category">
                                <label for="category" data-error="Required">Category Name</label>
                            </div>
                            <div class="input-field col s2">
                                <input id="categorydescription" name="categorydescription" type="text" class="validate" ng-required="true" maxlength="30" ng-model="objaddwage.categorydescription">
                                <label for="categorydescription" data-error="Required">Category Description</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="Client-details" class="col s12 m12 22 card-panel z-depth-1" style="overflow:scroll;">
                    <div class="email-content-wrap">
                        <ul class="collapsible" data-collapsible="accordion">
                            <li ng-repeat="jobmaster in wagearea"  ng-init="particularIndex = $index">
                                <div class="collapsible-header"><i class="material-icons"><span > 
                                    {{jobmaster.description}}</i></span>
                                </div>
                                <div class="collapsible-body">
                                    <table>
                                        <thead>
                                            <tr style="border:1px solid #9e9e9e">
                                                <td style="border:1px solid #9e9e9e;">
                                                    <span class="part"> Default Rate</span>
                                                </td>
                                                <td ng-repeat="wagemaster in jobmasters" style="border:1px solid #9e9e9e">
                                                    <select name="wageratedefault" id="wageratedefault" ng-model="wageratedefault[wagemaster.jobmasterid]" ng-change="SetDefaultWageRate(wagemaster.jobmasterid,jobmasters,particular,objaddwage,wageratedefault[wagemaster.jobmasterid])" ng-hide="wagemaster.code == 'SG'"> 
                                                        <option value="">Select</option>
                                                        <option ng-repeat = "c in jobmasters" value="{{c.jobmasterid}}" ng-hide="c.code == wagemaster.code">{{c.code}}</option>
                                                    </select>
                                                </td>
                                            </tr> 
                                            <tr style="border:1px solid #9e9e9e">
                                                <td style="border:1px solid #9e9e9e;">
                                                <span class="part">Postings</span>
                                                </td>
                                                <td ng-repeat="wagemaster in jobmasters" style="border:1px solid #9e9e9e">
                                                    {{wagemaster.code}}
                                                </td>
                                            </tr> 
                                        </thead>
                                        <tbody> 
                                            <tr ng-repeat="par in particular"  ng-init="particularIndex1 = $index" style="border:1px solid #9e9e9e">
                                                <td style="border:1px solid #9e9e9e"><span class="partamt" >{{par.code}}</span> </td>
                                                <td ng-repeat="wagemaster in jobmasters" ng-init="particularIndex2 = wagemaster" style="border:1px solid #9e9e9e">
                                                    <input type="number" name="particulars"  ng-model="objaddwage[jobmaster.lkvalid][par.lkvalid][wagemaster.jobmasterid]" style="width: 100px !important;"/>
                                                </td>
                                            </tr> 
                                            </tbody>
                                    </table>
                                </div>
                            </li>

                        </ul> 

                        <br><br>
                    </div>
                </div>
                <div class="col s12" ng-if="wagearea.length > 0">
                    <button class="waves-effect waves-green btn-flat" type="submit" ng-click="submitted=true;" style="background: green;color: #fff !important;float:right;margin-right:20px;">
                        Save
                    </button>
                    <a href="" class="modal-action modal-close waves-effect btn-flat " style="background: red;color: #fff !important;float:right;margin-right:10px;">Cancel</a>
                </div>

            </form>
        </div> 
        <br><br>
        <div class="col s12 m12 l9">
            <div class="card blue-grey lighten-1">
                <div class="card-content white-text" style="height:150px;">
                    <span class="card-title">Import Wage</span>
                    <p class="text-black">You can import wage Rate Details <span><a style="color:#fbfbfb;font-weight: bold;margin-left: 30px;text-decoration: underline;" href="<?php echo base_url("assets/document/sample/wages.xlsx")?>" download > Download Sample</a></span></p>
                    <form action="#">
                        <div class="file-field input-field">
                            <div class="btn">
                                <span>File</span>
                                <input type="file" name="file" id="file" class="form-control" onchange="angular.element(this).scope().UploadFile(this.files)" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel">
                            </div>
                            <div class="file-path-wrapper">
                                <input class="file-path validate" type="text" placeholder="Upload one or more files">
                            </div>
                            <div ng-if="loading" style="margin-top: -210px !important;margin-right: 160px !important;">
                                <center>
                                    <!-- <img src="http://i49.tinypic.com/j5z8mb.gif" alt="Yükleniyor..." /> -->
                                </center>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="card-action">
                    <input type="button" value="Import" class="btn btn-success" ng-disabled="!SelectedFileForUpload" ng-click="ParseExcelDataAndSave(objaddwage)" />
                    <span style="color:red">
                    {{Message}}
                    </span>
                </div>
            </div>
        </div>
    </div>
</div>

