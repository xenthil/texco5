<script type="text/javascript" src="<?php echo base_url("assets/js/app/document.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ng-file-upload.min.js")?>"></script>
<div class="parallax-container" style="background-color: rgba(0, 12, 78, 0.9)">
    <div class="row">
        <div class="container">
            <div class="col s12 m6 l6">
                <div class="pagebannertext white-text">Our Services</div>
            </div>
            <div class="col s12 m6 l6 right-align">
                <div class="dumheight hide-on-small-only"> </div>
                <div class=""> <a href="<?php echo base_url()?>" class="breadcrumb">Home</a> <span class="breadcrumb">Our Services</span> </div>
            </div>
        </div>
    </div>
    <div class="parallax">
      <img src="<?php echo base_url("assets/images/breadcrumbbanner.jpg")?>">
    </div>
</div>

<div class="row" ng-app="appDocument">
    <div class=" container" ng-controller="ctrlDocument">
        <!-- <div class="row">
            <div class="col s6">
                <div class="card">
                    <div class="card-content">
                        <ul class="collection">
                            <li class="collection-item avatar" ng-repeat="document in documents1">
                                <a target="_blank" ng-href="<?php //echo base_url('/assets/document/{{document.documentname}}')?>">
                               <i class="material-icons circle {{document.iconcolour}}">{{document.icon}}</i> 
                                <span class="title">{{document.name}}</span>
                                <p>  {{document.description}}
                                </p>
                                </a>
                                <a ng-href="<?php //echo base_url('/assets/document/{{document.documentname}}')?>" download="" class="secondary-content"><i class="material-icons">get_app</i></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col s6">
                <div class="card">
                    <div class="card-content">
                        <ul class="collection">
                            <li class="collection-item avatar" ng-repeat="document in documents2">
                                <a target="_blank" ng-href="<?php //echo base_url('/assets/document/{{document.documentname}}')?>">
                               <i class="material-icons circle {{document.iconcolour}}">{{document.icon}}</i>
                                <span class="title">{{document.name}}</span>
                                <p> {{document.description}}
                                </p>
                                  </a>
                                <a ng-href="<?php //echo base_url('/assets/document/{{document.documentname}}')?>" download="" class="secondary-content"><i class="material-icons">get_app</i></a>
                            </li>
                        </ul>

                    </div>
                </div>
            </div>
        </div> -->
        <div class="row">
            <div class="col s6" ng-repeat="folder in folders">
                <div class="card">
                    <div class="card-content">
                        <ul class="collection">
                            <li class="collection-item avatar">
                                <a target="_blank" href="<?php echo base_url('/documentsview?folder=');?>{{folder.folderid}}">
                                    <i class="material-icons circle blue">folder_open</i>
                                    <span class="title">{{folder.foldername}}</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <!-- <div class="col s6">
                <div class="card">
                    <div class="card-content">
                        <ul class="collection">
                            <li class="collection-item avatar">
                                <a target="_blank" ng-href="<?php //echo base_url('/gstdocuments')?>">
                               <i class="material-icons circle {{document.iconcolour}}">GST</i>
                                <span class="title">GST Detail Document</span>
                                  </a>
                            </li>
                        </ul>

                    </div>
                </div>
            </div> -->
        </div>
        <div class="row">
            <div class="col s6">
                <div class="card">
                    <div class="card-content">
                        <ul class="collection">
                            <li class="collection-item avatar" ng-repeat="document in documents1">
                                <a target="_blank" ng-href="<?php echo base_url('/assets/document/{{document.documentname}}')?>">
                               <i class="material-icons circle {{document.iconcolour}}">{{document.icon}}</i> 
                                <span class="title">{{document.name}}</span>
                                <p>  {{document.description}}
                                </p>
                                </a>
                                <a ng-href="<?php echo base_url('/assets/document/{{document.documentname}}')?>" download="" class="secondary-content"><i class="material-icons">get_app</i></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col s6">
                <div class="card">
                    <div class="card-content">
                        <ul class="collection">
                            <li class="collection-item avatar" ng-repeat="document in documents2">
                                <a target="_blank" ng-href="<?php echo base_url('/assets/document/{{document.documentname}}')?>">
                               <i class="material-icons circle {{document.iconcolour}}">{{document.icon}}</i>
                                <span class="title">{{document.name}}</span>
                                <p> {{document.description}}
                                </p>
                                  </a>
                                <a ng-href="<?php echo base_url('/assets/document/{{document.documentname}}')?>" download="" class="secondary-content"><i class="material-icons">get_app</i></a>
                            </li>
                        </ul>

                    </div>
                </div>
            </div>
        </div>
        <!-- <div class="row">
            <div class="col s6">
                <div class="card">
                    <div class="card-content">
                        <ul class="collection">
                            <li class="collection-item avatar">
                                <a target="_blank" ng-href="<?php //echo base_url('/wagedocuments')?>">
                               <i class="material-icons circle {{document.iconcolour}}">PF</i>
                                <span class="title">Wage Detail Document</span>
                                  </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div> -->
    </div>
</div>
