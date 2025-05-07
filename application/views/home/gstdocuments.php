<script type="text/javascript" src="<?php echo base_url("assets/js/app/gstdocument.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ng-file-upload.min.js")?>"></script>
<script type="text/javascript">var foldername = "<?php echo $_GET['folder'];?>"</script>
<div class="parallax-container" style="background-color: rgba(0, 12, 78, 0.9)">
    <div class="row">
        <div class="container">
            <div class="col s12 m6 l6">
                <div class="pagebannertext white-text">Documents</div>
            </div>
            <div class="col s12 m6 l6 right-align">
                <div class="dumheight hide-on-small-only"> </div>
                <div class=""> <a href="<?php echo base_url()?>" class="breadcrumb">Home</a> <a href="<?php echo base_url('/services')?>" class="breadcrumb">Our Services</a><span class="breadcrumb">Documents</span> </div>
            </div>
        </div>
    </div>
    <div class="parallax">
      <img src="<?php echo base_url("assets/images/breadcrumbbanner.jpg")?>">
    </div>
</div>

<div class="row" ng-app="appDocument">
    <div class=" container" ng-controller="ctrlDocument">
        <div class="row">
            <div class="col s12">
                <div class="card">
                    <div class="card-content">
                        <ul class="collection">
                            <li class="collection-item avatar" ng-repeat="document in documents">
                                <a target="_blank" ng-href="<?php echo base_url('/assets/document/{{document.foldername}}/{{document.documentname}}')?>">
                               <i class="material-icons circle {{document.iconcolour}}">{{document.icon}}</i> 
                                <span class="title">{{document.name}}</span>
                                <p>  {{document.description}}
                                </p>
                                </a>
                                <a ng-href="<?php echo base_url('/assets/document/{{document.foldername}}/{{document.documentname}}')?>" download="" class="secondary-content"><i class="material-icons">get_app</i></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
