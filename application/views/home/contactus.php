<script type="text/javascript" src="<?php echo base_url("assets/js/app/contactus.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/angular-sanitize.js")?>"></script>
<div ng-app="appContactus" ng-controller="ctrlContactus">
    <div class="parallax-container" style="background-color: rgba(0, 12, 78, 0.9)">
        <div class="row">
            <div class="container">
                <div class="col s12 m6 l6">
                    <div class="pagebannertext white-text">Contact Us</div>
                </div>
                <div class="col s12 m6 l6 right-align">
                    <div class="dumheight hide-on-small-only"> </div>
                    <div class=""> <a href="<?php echo base_url()?>" class="breadcrumb">Home</a> <span class="breadcrumb">Contact Us</span> </div>
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
                                    <h5 class="blue-text">QUICK TOUCH WITH US</h5>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col s12 m4 l2">
                                    <p class="black-text">GM's Office</p>
                                    <p><i class="icon mdi mdi-phone"></i><span> <span class="icon">044-22352838</span>
                                    </p>

                                </div>
                                <div class="col s12 m4 l2">
                                    <p class="black-text">Administration </p>
                                    <p><i class="icon mdi mdi-phone"></i><span> <span class="icon">044-22352947</span>
                                    </p>
                                </div>
                                <div class="col s12 m4 l2">
                                    <p class="black-text">Accounts</p>
                                    <p><i class="icon mdi mdi-phone"></i><span> <span class="icon">044-22301792</span>
                                    </p>
                                </div>
                                <div class="col s12 m4 l2">
                                    <p class="black-text">Agreement</p>
                                    <p><i class="icon mdi mdi-phone"></i><span> <span class="icon">044-22350900</span>
                                    </p>
                                </div>
                                <div class="col s12 m4 l2">
                                    <p class="black-text">Recruitment</p>
                                    <p><i class="icon mdi mdi-phone"></i><span> <span class="icon">044-22301793</span>
                                    </p>
                                </div>
                                <div class="col s12 m4 l2">
                                    <p class="black-text">Fax</p>
                                    <p><i class="icon mdi mdi-phone"></i><span> <span class="icon">044-22301791</span>
                                    </p>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="row">
                <div class="col s12">
                    <div class="card">
                        <div class="card-content">
                            <div class="row">
                                <div class="col s12">
                                    <h5 class="blue-text">TEXCO OFFICERS</h5>
                                </div>
                            </div>
                            <div class="row">
                                <table id="tbldirector">
                                    <thead>
                                        <tr>
                                            <th>S.No</th>
                                            <th>Name and Details</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr ng-repeat="officer in officers">
                                            <td style="padding-top: 0px;">{{ $index+1 }}</td>
                                            <td><strong>{{ officer.name }}</strong>
                                            <br>
                                            <span ng-bind-html="officer.address | nl2br">{{ officer.address }} </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col s12">
                    <div class="card">
                        <div class="card-content">
                            <div class="row">
                                <div class="col s12">
                                    <h5 class="blue-text">BOARD OF DIRECTORS</h5>
                                </div>
                            </div>
                            <div class="row">
                                <table id="tbldirector">
                                    <thead>
                                        <tr>
                                            <th>S.No</th>
                                            <th>Name and Details</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr ng-repeat="director in directors">
                                            <td style="padding-top: 0px;">{{ $index+1 }}</td>
                                            <td><strong>{{ director.name }}</strong>
                                            <br>
                                            <span ng-bind-html="director.designation | nl2br">{{ director.designation }} </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col s12">
                    <div class="card">
                        <div class="card-content">
                            <div class="row">
                                <div class="col s12">
                                    <h5 class="blue-text">TEXCO OFFICERS & CONTACT NUMBER</h5>
                                </div>
                            </div>
                            <div class="row">
                                <table id="tbldirector">
                                    <thead>
                                        <tr>
                                            <th>S.No</th>
                                            <th>Name</th>
                                            <th>Designation</th>
                                            <th>Contact No</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr ng-repeat="other in others">
                                            <td style="padding-top: 0px;">{{ $index+1 }}</td>
                                            <td><strong>{{ other.name }}</strong></td>
                                            <td><strong>{{ other.designation }}</strong></td>
                                            <td><strong>{{ other.phone }}</strong></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="row">
                <div class="col s12">
                    <div class="card">
                        <div class="card-content">
                            <div class="row">
                                <div class="col s12">
                                    <h5 class="blue-text">ASSISTANT MANAGERS - TEXCO</h5>
                                </div>
                            </div>
                            <div class="row">
                                <table id="tblmanager">
                                    <thead>
                                        <tr>
                                            <th style="width:5%">S.No</th>
                                            <th style="width:12%">Name</th>
                                            <th style="width:12%">Designation</th>
                                            <th style="width:10%">Region</th>
                                            <th style="width:12%">Telephone Number</th>
                                            <th style="width:10%">Mobile</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr ng-repeat="manager in managers">
                                            <td style="width:5%">{{ $index+1 }}</td>
                                            <td style="width:12%" >{{ manager.firstname }}  {{ manager.lastname }} </td>
                                                                <td style="width:12%">{{ manager.desig }} </td>
                                                                <td style="width:10%">{{ manager.region }} </td>
                                            <td style="width:12%">{{ manager.phone }}</td>
                                            <td style="width:10%">{{ manager.mobile }}</td>
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
