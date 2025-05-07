<script type="text/javascript" src="<?php echo base_url("assets/js/app/upload.js")?>"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.8.1/xlsx.full.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/2.6.0/jszip.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.6.1/angular.min.js"></script>

<div class="row" ng-app="appUpload" >
   <div class="container" ng-controller="ctrlUpload">
      <!-- Modal Structure -->
      <div id="modal1" class="modal modal-fixed-footer" style="max-width: 550px; max-height:90%;">
         <div class="modal-content">
            <nav class="blue">
               <div class="nav-wrapper">
                  <div class="left col s12 m5 l5">
                     <ul>
                        <li  class="white-text"><a href="" ><i class="modal-action modal-close mdi white-text mdi-arrow-left"></i></a>
                        </li>
                        <li class=" li white-text" id="mcaption">Upload</li>
                     </ul>
                  </div>
                  <div class="col s12 m7 l7 hide-on-med-and-down">
                  </div>
               </div>
            </nav>
         </div>
      </div>
      <div class="parallax-container" style="background-color: rgba(0, 12, 78, 0.9)">
         <div class="row">
            <div class="container">
               <div class="col s12 m6 l6">
                  <div class="pagebannertext white-text">Upload</div>
               </div>
               <div class="col s12 m6 l6 right-align">
                  <div class="dumheight hide-on-small-only"> </div>
                  <div class=""> <a href="<?php echo base_url('member/dashboard')?>" class="breadcrumb">Home</a> <span class="breadcrumb">Upload</span> </div>
               </div>
            </div>
         </div>
         <div class="parallax"><img src="<?php echo base_url("assets/images/breadcrumbbanner.jpg")?>"></div>
      </div>
      <div class="col s12 m12">
         <div class="row">
            <div class ="col s1 m3 l3"></div>
            <div class="col s10 m6 l6" >
               <div class="row">
                  <div class="file-field input-field col s12">
                     <button ng-click="closevacancy()" class="btn red waves-effect waves-light" type="submit">Close Vacancy
                     <i class="mdi-content-send right"></i>
                     </button>
                  </div>
               </div>
               <div class="row">
                  <div class="file-field input-field col s12">
                     <button ng-click="exportvacancy()" class="btn cyan waves-effect waves-light" type="submit">Export Vacancy
                     <i class="mdi-content-send right"></i>
                     </button>
                  </div>
               </div>
               <div class="row">
                  <div class="col s12">
            <input type="file" name="file" id="file" class="form-control"
                   onchange="angular.element(this).scope().UploadFile(this.files)"/>
            <input type="button" value="Import" class="btn btn-success"  ng-disabled="!SelectedFileForUpload"
            ng-click="ParseExcelDataAndSave()" />
            <br/>
            <span style="color:red">
                {{Message}}
            </span>
        </div>
            </div>
            <div class ="col  s1 m3 l3"></div>
            </div>
         </div>
      </div>
   </div>
</div>