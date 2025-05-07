<script type="text/javascript" src="<?php echo base_url("assets/js/app/importinvoice.js") ?>"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.8.1/xlsx.full.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/2.6.0/jszip.min.js"></script>

<link rel='stylesheet prefetch' href='https://cdn.rawgit.com/chingyawhao/materialize-clockpicker/master/dist/css/materialize.clockpicker.css'>
<!-- <link rel='stylesheet prefetch' href='https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.6/css/materialize.min.css'> -->
<script src='https://cdn.rawgit.com/chingyawhao/materialize-clockpicker/master/dist/js/materialize.clockpicker.js'></script>

<div class="parallax-container" style="background-color: rgba(0, 12, 78, 0.9)">
   <div class="row">
      <div class="container">
         <div class="col s12 m6 l6">
            <div class="pagebannertext white-text">Import Dues</div>
         </div>
         <div class="col s12 m6 l6 right-align">
            <div class="dumheight hide-on-small-only"> </div>
            <div class=""> <a href="<?php echo base_url('admin/dashboard') ?>" class="breadcrumb">Home</a> <span class="breadcrumb">Import Dues</span> </div>
         </div>
      </div>
   </div>
   <div class="parallax"><img src="<?php echo base_url(" assets/images/breadcrumbbanner.jpg") ?>"></div>
</div>
<div class="row" ng-app="appUpload" style="padding-top:100px;">
   <div class="container" ng-controller="ctrlUpload">
      <div class="col s12 m12 l12">
            <div class="row">
                <div class="col s12 m12 l6">
                    <div class="card blue-grey lighten-1">
                        <div class="card-content white-text" style="height:200px;">
                            <span class="card-title">Import Dues</span>
                            <br>
                            <p class="text-black">You can Import Pending Dues.<span><a style="color: #fff;font-weight: bold;margin-left: 30px;text-decoration: underline;" href="<?php echo base_url("assets/document/sample/dues.xls")?>" download> Download Sample</a></span>.<br>
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
                                </div>
                            </div>
                            </form>
                        </div>
                        <div class="card-action">
                            <input type="button" value="Import" class="btn btn-success" ng-disabled="!SelectedFileForUpload" ng-click="ParseExcelDataAndSave()" />
                            <span style="color:red">
                            {{Message}}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
      </div>
   </div>
</div>
