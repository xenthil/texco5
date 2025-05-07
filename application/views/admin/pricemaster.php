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
                <div class=""> <a href="<?php echo base_url('admin/dashboard')?>" class="breadcrumb">Home</a> 
                <span class="breadcrumb">Master</span><span class="breadcrumb">Wage master</span> </div>
            </div>
        </div>
    </div>
    <div class="parallax"><img src="<?php echo base_url("assets/images/breadcrumbbanner.jpg")?>">
    </div>
</div>

<div class="row" ng-app="apppricemaster">
    <div class="container" ng-controller="ctrlpricemaster">
        <div class="row" ng-show="showpassword == 1">
            <!-- Modal Window for new and Edit -->
            <div id="dgrvalue" class="col s12">
                <a href="<?php echo base_url('admin/wageadd') ?>" style="background: green;color: #fff !important;float:right;margin:10px;" class="modal-action waves-effect waves-green btn-flat" type="submit">Add</a> &nbsp;&nbsp;
                <!-- Modal Structure -->
                <div id="" class="section">
                    <div class="row">
                        <div class="col s12 m12">
                            <form ng-submit="pricemastersedit.$valid && updatewagemasterDetails(objaddwageedit)" id="pricemastersedit" name="pricemastersedit" novalidate>
                                <div id="Client-details" class="col s12 m12 22 card-panel z-depth-1">
                                    <div class="email-content-wrap">
                                        <div class="col s12">
                                            <br>
                                            <div class="input-field col s3 m3">
                                                <select name="wagetypeedit" id="wagetypeedit" ng-model="objaddwageedit.wagetypeedit" ng-required="true" data-ng-options=" c.lkvalid as c.description for c in waget" ng-change="ChangeWageTypes(objaddwageedit.wagetypeedit)" ng-class="{'submitted': submitted && pricemasters.$invalid}" >
                                                    </select>
                                                <label for="wagetypeedit" data-error="Required">Wage Type</label>
                                            </div>
                                            <div class="input-field col s3 m3">
                                                <select name="wageyearedit" ng-model="objaddwageedit.wageyearedit" ng-required="true" data-ng-options=" c.lkvalid as c.description for c in wageyear" ng-change="getchangeWageYear(objaddwageedit.wageyearedit,objaddwageedit.wagetypeedit)">
                                                    </select>
                                                <label for="wageyearedit" data-error="Required">Wage Year</label>
                                            </div>
                                            <div class="input-field col s3 m3">
                                                <select name="categoryedit" ng-model="objaddwageedit.categoryedit" ng-required="true" data-ng-options="c.category_id as c.category_code + ' - ' + c.category_description for c in wagecategories" ng-change="getamountDetails(objaddwageedit.categoryedit,objaddwageedit.wageyearedit,objaddwageedit.wagetypeedit)">
                                                </select>
                                                <label for="categoryedit" data-error="Required">Category Name</label>
                                            </div>
                                            <div class="input-field col s3 m3">
                                                <input id="categorydescriptionedit" name="categorydescriptionedit" type="text" class="validate" ng-required="true" maxlength="30" ng-model="objaddwageedit.categorydescriptionedit">
                                                <label for="categorydescriptionedit" data-error="Required" class="active" style="margin-top: -20px !important;">Category Description</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <br><br>
                                <div id="Client-details" class="col s12 m12 22 card-panel z-depth-1">
                                    <div class="email-content-wrap">
                                        <ul class="collapsible" data-collapsible="accordion">
                                            <li ng-repeat="jobmaster in wagerates.areas"   ng-init="particularIndex = $index">
                                                <div class="collapsible-header">
                                                    <span ng-if="jobmaster.wagearea"> {{jobmaster.wagearea}} </span>
                                                    <span ng-if="jobmaster.wagearea == ''">TN W</span>
                                                </div>
                                                <div class="collapsible-body" style="overflow: scroll !important;">
                                                    <table>
                                                        <thead>
                                                            <tr  style="border:1px solid #9e9e9e">
                                                                <td  style="border:1px solid #9e9e9e">
                                                                    <span class="part">Postings</span>
                                                                </td>
                                                                <td ng-repeat="wagemaster in jobmasters" style="border:1px solid #9e9e9e">
                                                                    <span class="partamt" >{{wagemaster.code}}</span>
                                                                </td>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr ng-repeat="wagemaster in jobmaster.wagesjobmaster" ng-init="particularIndex1 = $index"  style="border:1px solid #9e9e9e"> 
                                                                
                                                                <td style="border:1px solid #9e9e9e">
                                                                    {{wagemaster.particular}}
                                                                </td>  

                                                                <td ng-repeat="par in wagemaster.particulars" ng-init="particularIndex2 = wagemaster" style="border:1px solid #9e9e9e">
                                                                    <span ng-click="par.check = true" ng-if="par.check == false && par.amount > 0"> 
                                                                        {{par.amount}} 
                                                                    </span> 
                                                                    <span ng-click="par.check = true" ng-if="!par.amount || par.amount == 0"> 
                                                                        0
                                                                    </span>
                                                                    <!-- <span ng-click="par.check = true" ng-if="!par.check"> 
                                                                        {{par.amount}} 
                                                                    </span> -->
                                                                    <span ng-if="par.check == true">
                                                                        <input type="number" name="particulars"  ng-model="par.amount" style="width: 100px !important;" ng-if="par.check == true"/>

                                                                        <input type="hidden" name="particularid"  ng-model="par.wageid" style="width: 100px !important;" ng-if="par.check == true"/> 
                                                                        
                                                                        <br><br> 
                                                                        <a href="#" ng-click="editpricemaster(par.wageid, wagemaster.particularid, par.jobmasterid, jobmaster.wageareaid, par.amount,objaddwageedit.categoryedit,objaddwageedit.wageyearedit,objaddwageedit.wagetypeedit,objaddwageedit.categorydescriptionedit);par.check = false;" style="margin-left: -90px !important;"> <i class="material-icons">mode_save</i> </a>

                                                                    </span>
                                                                </td>
                                                            </tr> 
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </li>
                                        </ul>
                                        <br>
                                        <!-- <div class="col m12" style="float: right;"  ng-if="wagerates.areas.length">
                                            <button class="waves-effect waves-green btn-flat" type="submit" ng-click="submitted=true;" style="background: green;color: #fff !important;float:right;margin:10px;" > Update </button>
                                        </div> -->
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <div ng-show="showpassword == 0">
            <br>
            <div class="row">
                <div class="input-field col s6">
                    <input name="wpassword" id="wpassword" class="wpassword" type="password" ng-model="wageset.wpassword" placeholder="Enter Password" autocomplete="off" autofocus="off"/>
                    <label for="">Wage Password </label>
                </div>
                <div class="input-field col s6">
                    <button ng-click="submitpassword(wageset.wpassword)" id="btntexser" style="background: green;top: 10px !important;color: #fff !important;" class="modal-action waves-effect waves-green btn-flat" type="submit">Submit</button>

                </div>
            </div>
            <br>
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
    .filled-in {
        opacity: 1;
        position: relative;
        left: 0;
    }
</style>

<script>
    $(document).ready(function(){
        $('ul.tabs').tabs();

        $('#wpassword').keypress(function (e) {
            var regex = new RegExp("^[a-zA-Z0-9]+$");
            var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
            if (regex.test(str)) {
                return true;
            }
            e.preventDefault();
            return false;
        });

    });
</script>
