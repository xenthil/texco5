<script type="text/javascript" src="<?php echo base_url("assets/js/app/newvacancyhome.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ng-file-upload.min.js") ?>"></script>
<link rel="stylesheet" type="text/css" href="<?php echo base_url("assets/css/ng-table.min.css") ?>" />
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ng-table.min.js") ?>"></script>
<!-- <script type="text/javascript" src="<?php echo base_url("assets/js/lib/ng-pattern-restrict.js") ?>"></script> -->
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ui-bootstrap-tpls-0.11.0.js") ?>"></script>
<script>var vacancypage=1;var memberid =0; var baseurl='<?php echo base_url()?>'</script>
<div class="parallax-container" style="background-color: rgba(0, 12, 78, 0.9)">
    <div class="row">
        <div class="container">
            <div class="col s12 m6 l6">
                <div class="pagebannertext white-text">Vacancy</div>
            </div>
            <div class="col s12 m6 l6 right-align">
                <div class="dumheight hide-on-small-only"> </div>
                <div class=""> <a href="<?php echo base_url()?>" class="breadcrumb">Home</a> <a href="<?php echo base_url('/services')?>" class="breadcrumb">Vacancy</a><span class="breadcrumb">Vacancy</span> </div>
            </div>
        </div>
    </div>
    <div class="parallax">
      <img src="<?php echo base_url("assets/images/breadcrumbbanner.jpg")?>">
    </div>
</div>

<div class="row" ng-app="appAdminMember">
    <div class=" container" ng-controller="ctrlAdminMember">
        <div class="row">
            <div class="col s12">
              
                    
                     
                          
                               <i class="material-icons circle {{document.iconcolour}}">{{document.icon}}</i> 
                               
                                <p>  {{vacancy.description}} 
                                </p>

								<p><a href="<?php echo base_url('/assets/vacancy/uploadadmin/{{vacancy.vacancypdfpath}}')?>" target="_blank"> Click to view</a></p>
                                </a>
                                <a ng-href="<?php echo base_url('/assets/vacancy/uploadadmin/{{vacancy.vacancypdfpath}}')?>" download="" class="secondary-content"><i class="material-icons">get_app</i></a>
                        
                  
              
            </div>
        </div>
    </div>
</div>
