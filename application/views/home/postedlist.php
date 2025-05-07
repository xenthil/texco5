<script type="text/javascript" src="<?php echo base_url("assets/js/app/postedlist.js")?>"></script>
<div ng-app="appPostedlist" ng-controller="ctrlPostedlist">
    <div class="parallax-container" style="background-color: rgba(0, 12, 78, 0.9)">
        <div class="row">
            <div class="container">
                <div class="col s12 m6 l6">
                    <div class="pagebannertext white-text">Posted List</div>
                </div>
                <div class="col s12 m6 l6 right-align">
                    <div class="dumheight hide-on-small-only"> </div>
                    <div class=""> <a href="<?php echo base_url()?>" class="breadcrumb">Home</a> <span class="breadcrumb">Posted List</span> </div>
                </div>
            </div>
        </div>
        <div class="parallax">
          <img src="<?php echo base_url("assets/images/breadcrumbbanner.jpg")?>">
        </div>
    </div>

    <div class="row">
        <div class=" container">
            <div class="row">
                <div class="col s12">
                    <div class="card">
                        <div class="card-content">
                            <div class="row">
                                <div class="col s12">
                                    <h5 class="blue-text" style="margin-left: 340px;">TAMIL NADU EX-SERVICEMEN CORPORATION LIMITED </h5>
                                    <h5 class="blue-text" style="margin-left: 450px;">   POSTED LIST AS ON {{ postedlist[0].posteddate }}</h5>
                                </div>
                            </div>
                            <div class="row">
                                <table id="tblpostedlist">
                                    <thead>
                                        <tr>
                                            <th style="width:5%">REG NO</th>
                      						<th style="width:7%">TEXCO NO</th>
                      						<th style="width:7%">SERVICE NO</th>
                                            <th style="width:7%">RANK</th>
                                            <th style="width:10%">NAME</th>
                                            <th style="width:7%">MOBILE NO</th>
                                            <th style="width:10%">REGION</th>
                                            <th style="width:7%">DISTRICT</th>
                                            <th style="width:7%">PROJ NO</th>
                                            <th style="width:12%">PROJ NAME</th>
                                            <th style="width:5%">CATEGORY</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr ng-repeat="posted in postedlist">
                                            <td style="width:5%" >{{ posted.registrationno }} </td>
                                            <td style="width:7%" >{{ posted.newtexcono }} </td>
                                            <td style="width:7%" >{{ posted.serviceno }} </td>
                      						<td style="width:7%">{{ posted.rank }} </td>
                      						<td style="width:10%">{{ posted.firstname }}  {{ posted.lastname }}</td>
                                            <td style="width:10%">{{ posted.mobile }}</td>
                                            <td style="width:10%">{{ posted.region }}</td>
                                            <td style="width:7%">{{ posted.district }}</td>
                                            <td style="width:7%">{{ posted.projectno }}</td>
                                            <td style="width:12%">{{ posted.projectname }}</td>
                                            <td style="width:5%">{{ posted.category }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
