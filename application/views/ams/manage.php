<script type="text/javascript" src="<?php echo base_url("assets/js/app/manage.js")?>"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.8.1/xlsx.full.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/2.6.0/jszip.min.js"></script>

<link rel='stylesheet prefetch' href='https://cdn.rawgit.com/chingyawhao/materialize-clockpicker/master/dist/css/materialize.clockpicker.css'>
<!-- <link rel='stylesheet prefetch' href='https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.6/css/materialize.min.css'> -->
<script src='https://cdn.rawgit.com/chingyawhao/materialize-clockpicker/master/dist/js/materialize.clockpicker.js'></script>

<div class="parallax-container" style="background-color: rgba(0, 12, 78, 0.9)">
   <div class="row">
      <div class="container">
         <div class="col s12 m6 l6">
            <div class="pagebannertext white-text">Manage Jobs</div>
         </div>
         <div class="col s12 m6 l6 right-align">
            <div class="dumheight hide-on-small-only"> </div>
            <div class=""> <a href="<?php echo base_url('admin/dashboard')?>" class="breadcrumb">Home</a> <span class="breadcrumb">Manage Jobs</span> </div>
         </div>
      </div>
   </div>
   <div class="parallax"><img src="<?php echo base_url(" assets/images/breadcrumbbanner.jpg")?>"></div>
</div>
<div class="row" ng-app="appUpload" style="padding-top:100px;">
   <div class="container" ng-controller="ctrlUpload">
      <div class="col s12 m12 l12">
         <div class="row">
            <?php if($roledata['permissions']['CMANAGEJOB']==1) {?>
            <div class="col s12 m6 l3">
               <div class="card blue-grey lighten-1">
                  <div class="card-content white-text" style="height:120px;">
                     <span class="card-title">Close Vacancy</span>
                     <p class="text-black">This will close all the job vacancies for this week. Employees will not be able to apply until the jobs are imported.</p>
                  </div>
                  <div class="card-action">
                     <button ng-click="closevacancy()" class="btn cyan waves-effect waves-light" type="submit">Close Vacancy
                     <i class="mdi-content-send right"></i>
                     </button>
                  </div>
               </div>
            </div>
            <?php } ?>
            <?php if($roledata['permissions']['EMANAGEJOB']==1) {?>
            <div class="col s12 m6 l3">
               <div class="card blue-grey lighten-1">
                  <div class="card-content white-text" style="height:120px;">
                     <span class="card-title">Export Vacancy</span>
                     <p class="text-black">This will generate data on the Job vacancies from the last week.</p>
                     <br/>
                  </div>
                  <div class="card-action">
                     <button ng-click="exportvacancy()" class="btn cyan waves-effect waves-light" type="submit">Export Vacancy
                     <i class="mdi-content-send right"></i>
                     </button>
                  </div>
               </div>
            </div>
            <?php } ?>
            <?php if($roledata['permissions']['IMANAGEJOB']==1) {?>
            <div class="col s12 m12 l6">
               <div class="card blue-grey lighten-1">
                  <div class="card-content white-text" style="height:200px;">
                     <span class="card-title">Import Vacancy</span>
                     <p class="text-black">You can select CLOSEDATE and import all the vacancies for this week from an excel file.</p>
                     <div class="row" style="padding-left: 25px;">
                        <div class="input-field col m6 s6" style="background-color:white;color: #a29898">
                           <input id="closedate" type="date" class="datepicker" type="text" ng-model="closedate" ng-change="updateclosedate(closedate)" placeholder="Close Date">
                        </div>
                     </div>
                     <form action="#">
                        <div class="file-field input-field">
                           <div class="btn">
                              <span>File</span>
                              <input type="file" name="file" id="file" class="form-control" onchange="angular.element(this).scope().UploadFile(this.files)" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel">
                           </div>
                           <div class="file-path-wrapper">
                              <input class="file-path validate" type="text" placeholder="Upload one or more files">
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
         <div class="row">
            <div class="col s12 m6 l3" ng-show="logscount > 0">
               <div class="card blue-grey lighten-1">
                  <div class="card-content white-text" style="height:120px;">
                     <span class="card-title">Export Logs</span>
                     <p class="text-black">{{logscount}} Records not uploaded. Click to view Log Details </p>
                  </div>
                  <div class="card-action">
                     <button ng-click="ExportLogs()" class="btn cyan waves-effect waves-light" type="submit">Export Logs
                     <i class="mdi-content-send right"></i>
                     </button>
                  </div>
               </div>
            </div>
            <div class="col s12 m6 l6">
               <div class="card blue-grey lighten-1">
                  <div class="card-content white-text" style="height:120px;">
                     <span class="card-title">Vacancy Opening Date on {{openingdate}}</span>
                     <p class="text-black">This will open job vacancies for this week at given date and time. Employees will not be able to apply until opening date exceeds.</p>
                  </div>
                  <div class="row" style="padding-left: 25px;">
                    <div class="input-field col m6 s6" style="background-color:white;color: #a29898">
                       <input id="opendate" type="date" class="datepicker" type="text" ng-model="opendate" ng-change="updateopendate(opendate, opentime)" placeholder="Opening Date">
                    </div>
                    <div class="input-field col m6 s6" style="background-color:white;color: #a29898">
                       <input id="opentime" type="date" class="timepicker" type="time" ng-model="opentime" ng-change="updateopendate(opendate, opentime)" placeholder="Opening Time">
                    </div>
                 </div>
               </div>
            </div>
         </div>
         <?php } ?>
         <div class="row right-align">
         </div>
      </div>
   </div>
</div>
<script>
   $('#closedate').pickadate({
     labelMonthNext: 'Go to the next month',
     labelMonthPrev: 'Go to the previous month',
     labelMonthSelect: 'Pick a month from the dropdown',
     labelYearSelect: 'Pick a year from the dropdown',
     selectMonths: true,
     selectYears: true,
     min:new Date(),
     autoClose:true
   });

   $('#opendate').pickadate({
     labelMonthNext: 'Go to the next month',
     labelMonthPrev: 'Go to the previous month',
     labelMonthSelect: 'Pick a month from the dropdown',
     labelYearSelect: 'Pick a year from the dropdown',
     selectMonths: true,
     selectYears: true,
     min:new Date(),
     autoClose:true
   });

   //Time Picker:
$('.timepicker').pickatime({
    default: 'now',
    twelvehour: false, // change to 12 hour AM/PM clock from 24 hour
    donetext: 'OK',
  autoclose: false,
  vibrate: true // vibrate the device when dragging clock hand
});
</script>
