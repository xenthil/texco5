<div ng-app="appHome">
    <div class="row pagedivider">
        <div class="container">
            <div class="row">
                <div class="col s12 m8 l9" style="height: 400px; overflow: hidden">
                    <div class="slider">
                        <ul class="slides">

                        <li>
                                <img src="<?php echo base_url("assets/images/banner/6.jpg")?>">
                                <!-- random image -->
                                <div class="caption center-align">
                                    <h3 class="blue-text">Service!</h3>
                                    <h5 class="light grey-text text-lighten-3">Tamilnadu Ex-Servicemen's Corporation Limited!</h5>
                                </div>
                            </li>
                            <li>
                                <img src="<?php echo base_url("assets/images/banner/5.jpg")?>">
                                <!-- random image -->
                                <div class="caption center-align">
                                    <h3 class="blue-text">Service!</h3>
                                    <h5 class="light grey-text text-lighten-3">Tamilnadu Ex-Servicemen's Corporation Limited!</h5>
                                </div>
                            </li>
                            <li>
                                <img src="<?php echo base_url("assets/images/banner/7.jpg")?>">
                                <!-- random image -->
                                <div class="caption center-align">
                                    <h3 class="blue-text">Feel Secured...We Will Ensure. </h3>
                                    <h5 class="light grey-text text-lighten-3">Tamilnadu Ex-Servicemen's Corporation Limited!</h5>
                                </div>
                            </li>
                            <li>
                                <img src="<?php echo base_url("assets/images/banner/8.jpg")?>">
                                <!-- random image -->
                                <div class="caption left-align">
                                    <h3 class="blue-text">Discipline</h3>
                                    <h5 class="light grey-text text-lighten-3">Tamilnadu Ex-Servicemen's Corporation Limited!</h5>
                                </div>
                            </li>
                            <li>
                                <img src="<?php echo base_url("assets/images/banner/9.jpg")?>">
                                <!-- random image -->
                                <div class="caption right-align">
                                    <h3 class="blue-text">Dedication</h3>
                                    <h5 class="light grey-text text-lighten-3">Tamilnadu Ex-Servicemen's Corporation Limited!</h5>
                                </div>
                            </li>
                            <!-- <li>
                                <img src="<?php// echo base_url("assets/images/banner/4.jpg")?>">
                               
                                <div class="caption center-align">
                                    <h3 class="blue-text">Service!</h3>
                                    <h5 class="light grey-text text-lighten-3">Tamilnadu Ex-Servicemen's Corporation Limited!</h5>
                                </div>
                            </li> -->
                           
                        </ul>
                    </div>
                </div>
                <div class="col s12 m4 l3" ng-controller="ctrlVacancy">
                    <div class="row" style="height: 2px;">
                        &nbsp;
                    </div>
                    <div class="row">
                        <div class="titleline" style="height: 30px; ">
                            <div style="position: absolute;">
                                <span class="texTitle">Recent Vacancies</span>
                            </div>
                        </div>
                    </div>
                    <div class="row" ng-repeat="model in models">
                     <div ng-repeat="vacancy in model.projects">
                          <p class="headermenu ">{{model.organization}}</p>
                          <ul class="collection" >
  						                    <li style="height:75px;" class="collection-item avatar" ng-repeat="job in vacancy.jobs">
                                  <a href="<?php echo base_url("vacancy?client={{model.organization}}")?>"> <img src="<?php echo base_url("assets/images/clients/{{model.image}}")?>" alt="" class="circle"> <span class="Vactitle">{{vacancy.name}}</span>
                                  <p class="secondtext">{{vacancy.projectno}}</p>
                                  <span class="badge">{{job.numberofvacancies}}</span>

                                  <span class="subtext">{{job.posteddate}}{{model.name}}</span>
                                  </a>
                              </li> 
                          </ul>
                        </div> 
                    </div>
                    <div class="row">
                        <div class="col s12 center-align orange-text">
                           <!-- <a href="<?php echo base_url("vacancy")?>">View All</a> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="container">
            <div class="row">
                <div class="col s12">
                    <div class="row">&nbsp; </div>
                    <div class="row">
                        <div class="titleline">
                            <div style="position: absolute;">
                                <span class="SubTitle"> welcome</span>
                                <br>
                                <span class="texTitle">Tamilnadu Ex-servicemen's Corporation limited</span>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <p>The Tamil Nadu Ex-Servicemen Corporation (TEXCO) is a state owned Corporation established on 28 January 1986 with the aim of providing necessary assistance for rehabilitation of Ex-servicemen belonging to Tamil Nadu. </p>
                        <p>
                            <strong>TEXCO Provides Contractual Employment to Ex-servicemen and their dependants :</strong>
                        </p>
                        <p> TEXCO enters into contracts with State Government Departments, State Corporations, Central Government Departments and Corporations, for providing manpower such as Security guards, Head Security Guards, Assistant Supervisory Officers, Project Officers, Drivers, Gunmen and Junior Assistants". </p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div ng-controller="ctrlImages" class="row">
        <div class="container">
            <div class="row">&nbsp;</div>
            <div class="row">
                <div class="titleline">
                    <div style="position: absolute;">
                        <span class="SubTitle">Our </span>
                        <br>
                        <span class="texTitle">Clients</span>
                    </div>
                </div>
            </div>
            <div id="jssor_1" style="position: relative; margin: 0 auto; top: 0px; left: 0px; width: 1000px; height: 200px; overflow: hidden; visibility: hidden;">
                <!-- Loading Screen -->
                <div   data-u="loading" style="position: absolute; top: 0px; left: 0px; background-color: rgba(0,0,0,0.7);">
                    <div style="filter: alpha(opacity=70); opacity: 0.7; position: absolute; display: block; top: 0px; left: 0px; width: 100%; height: 100%;"></div>
                    <div style="position: absolute; display: block; background: url('img/loading.gif') no-repeat center center; top: 0px; left: 0px; width: 100%; height: 100%;"></div>
                </div>
                <div data-u="slides" style="cursor: default; position: relative; top: 0px; left: 0px; width: 980px; height: 100px; overflow: hidden;">
                    <div ng-repeat="images in clientimages" > <img data-u="image" ng-src="<?php echo base_url('/assets/images/clients/{{images}}')?>" /></div>
                </div>
            </div>
            <script type="text/javascript">
            $(document).ready(function(){
                setTimeout(function(){
                  jssor_1_slider_init()}  ,
                  500);
              });
            </script>
        </div>
    </div> 
    <style>
        .slider .slides li .caption {
            top: -1% !important;
        } 
        .grey-text.text-lighten-3 {
            color: #f8f8f8 !important;
            font-size: 27px !important;
            font-weight: 600;
        }
    </style>
    <!-- <div class="row">
        <div class="footerimg">
            <div style="background-color:rgba(0, 17, 56, 0.84)">
                <div class="container">
                    <div class="row"> &nbsp;</div>
                    <div class="row">
                        <p class="white-text center-align">Posted List &nbsp; 
                             <a class="btn waves-effect blue waves-light" href="<?php echo base_url("postedlist")?>">View </a>
                        </p>
                    </div>
                    <div class="row"> &nbsp;</div>
                </div>
            </div>
        </div>
    </div> -->
</div>
