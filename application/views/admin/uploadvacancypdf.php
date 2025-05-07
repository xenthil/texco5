<script type="text/javascript" src="<?php echo base_url("assets/js/app/vacancypdf.js")?>">
</script>
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ng-file-upload.min.js")?>"></script> 
<style> 
.select-wrapper + label {
    position: absolute;
    top: 17px;
    font-size: 0.8rem;
}
</style>
<div class="parallax-container" style="background-color: rgba(0, 12, 78, 0.9)">
    <div class="row">
        <div class="container">
            <div class="col s12 m6 l6">
                <div class="pagebannertext white-text">Documents</div>
            </div>
            <div class="col s12 m6 l6 right-align">
                <div class="dumheight hide-on-small-only"> </div>
                <div class=""> <a href="<?php echo base_url('admin/dashboard')?>" class="breadcrumb">Home</a> 
                <span class="breadcrumb">Settings</span>
                <span class="breadcrumb">Documents</span> </div>
            </div>
        </div>
    </div>
    <div class="parallax"><img src="<?php echo base_url("assets/images/breadcrumbbanner.jpg")?>">
    </div>
</div>

<div class="row" ng-app="appDocument">
    <div class="container" ng-controller="ctrlDocument">
        <!-- Modal Window for new and Edit -->
        <div class="fixed-action-btn" style="bottom:23%; right: 19px;">
            <?php if($roledata['permissions']['ADOCUMENTS']==1) {?>
            <a class="btn-floating btn-large green modal-trigger tooltipped" href="#modal1" ng-click='adddocument()'data-tooltip="Upload Document" data-position="bottom">
                <i class="mdi mdi-account-plus"></i>
            </a>
            <?php } ?>
        </div>
        <div class="fixed-action-btn" style="bottom: 12%; right: 19px;">
            <?php if($roledata['permissions']['ADOCUMENTS']==1) {?>
                <a class="btn-floating btn-large blue modal-trigger tooltipped" href="#modal2" ng-click='createfolder()' data-tooltip="Create Folder" data-position="bottom">
                    <i class="mdi mdi-account-plus"></i>
                </a>
            <?php } ?>
        </div>
        <!-- Modal Structure -->
        <div id="modal1" class="modal modal-fixed-footer" style="max-width: 550px; max-height:90%;">
            <div class="modal-content">
                <nav class="blue" style="position: fixed;margin-top: 0px; z-index:999;">
                    <div class="left col s1 m1 l1">
                        <div class="white-text"><a href=""><i class="modal-action modal-close mdi white-text mdi-arrow-left"></i></a> </div>
                    </div>
                    <div class="col s11 m11 l11">
                        <div class="li white-text" id="mcaption">Add Document</div>
                    </div>
                </nav>
                <div class="row" style="padding: 40px;">
                    <form ng-submit="documentform.$valid && savedocument(objdocument,picFile)" id="documentform" name="documentform" novalidate>
                        <div class="row" style="padding: 24px;">
                            <div class="col s12">
                                <input type="hidden" ng-model="objdocument.vacancyid">
                                <!-- <div class="row">
                                    <div class="input-field col s12">
                                        <select id="name" name="foldername" ng-class="{'submitted': submitted && documentform.foldername.$invalid}" class="validate" type="text" ng-model="objdocument.foldername" ng-minlength="3" aria-required="true" data-ng-options="p.folderid + '##' + p.foldername  as p.foldername for p in folders">
                                        <option value=""></option>
                                        </select>
                                        <label for="name">Folder Name</label>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="input-field col s6">
                                        <input id="name" name="name" type="text" ng-class="{'submitted': submitted && documentform.name.$invalid}" class="validate" type="text" ng-model="objdocument.name" maxlength="250" ng-required="true" ng-minlength="3" aria-required="true">
                                        <label for="name" data-error="Required(min 3 chars)">Name</label>
                                    </div>

                                    <div class="input-field col s6">
                                        <select id="icon" name="icon" ng-model="objdocument.colour" ng-class="{'submitted': submitted && documentform.icon.$invalid}" data-ng-options="i.colour as i.icon for i in icons" ng-required="true" aria-required="true">
                                     </select>
                                        <label for="icon" data-error="Required">Icon</label>
                                    </div>
                                </div> -->

                                <!-- <div class="row">
                                    <div class="input-field col s4">
                                        <input type="checkbox" class="filled-in" id="ispf" name="ispf" ng-checked="objdocument.ispf" ng-model="objdocument.ispf"/>
                                        <label for="ispf" data-error="Required">Is PF Document</label>
                                    </div>

                                    <div class="input-field col s4">
                                        <input type="checkbox" class="filled-in" id="isgst" name="isgst" ng-checked="objdocument.isgst" ng-model="objdocument.isgst"/>
                                        <label for="isgst" data-error="Required">Is GST Document</label>
                                    </div>

                                    <div class="input-field col s4">
                                        <input type="checkbox" class="filled-in" id="iswage" name="iswage" ng-checked="objdocument.iswage" ng-model="objdocument.iswage"/>
                                        <label for="iswage" data-error="Required">Is Wage Document</label>
                                    </div>
                                </div> -->

                                <div class="row">
                                    <div class="input-field col s12">
                                        <input id="description" name="description" type="text" ng-class="{'submitted': submitted && documentform.description.$invalid}" class="validate"  ng-model="objdocument.description" maxlength="250" ng-required="true" ng-minlength="3" aria-required="true">
                                        <label for="description" data-error="Required(min 3 chars)">Description</label>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="file-field input-field">
                                        <div class="btn">
                                            <span>File</span>
                                            <input id="file" type="file" ngf-select accept=".pdf" ng-change="changeName(picFile.name)" ng-model="picFile" name="file">
                                        </div>

                                        <div class="file-path-wrapper">
                                            <input id="filepath" class="file-path validate" type="text" ng-model="objdocument.documentname" ng-required="!objdocument.documentname">
                                        </div>

                                        <span ng-show="!objdocument.documentname.length">Please Select File!</span>
                                    </div>
                                </div>
                            </div>
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
        
      

        <div id="" class="section">
            <div class="row">
                <div class="col s12 ">
                  
                    <div id="Client-details" class="col s12 m12 l12 card-panel z-depth-1">
                        <div class="email-content-wrap">
                            <div class="row z-depth-1" style="background-color: #eee;">
                                <div class="col s12 m10 l10">
                                    <ul class="collection">
                                        <li class="collection-item avatar" style="background-color:transparent">
                                            <img src="<?php echo base_url("assets/images/photo.png ")?>" alt="" class="circle">
                                            <span class="email-title">{{documents.description}}</span>
                                            <!-- <p class="truncate grey-text ultra-small">{{selected.documentname}}</p> -->
                                        </li>
                                    </ul>
                                </div>
                                <div class="col s2 m2 l2 right-align resultframe">
                                    <?php if($roledata['permissions']['EDOCUMENTS']==1) {?>
                                    <a id="editdocument" ng-click='editdocument()'><span><i class="small icon darken-1 mdi mdi-account-edit"></i></span></a>
                                    <?php } ?>
                                    
                                    
                                </div>
                            </div>

                            <div class="row">
                                <div class="col s12 m6 l6">
                               
                                    <p class="blue-grey-text"><strong>Description</strong> </p>
                                    <p>{{documents.description}} </p>
                                </div>

                                <div class="col  s12 m6 l6">
                                    <p class="blue-grey-text"><strong>Document Name</strong> </p>
                                    <p>{{documents.vacancypdfpath}}</p>
                                </div>
                            </div>

                           
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>