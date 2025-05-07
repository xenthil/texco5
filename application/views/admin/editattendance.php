<script type="text/javascript" src="
	<?php echo base_url("assets/js/app/editattendance.js")?>">
</script>
<script type="text/javascript">
    var projectid = "<?php echo $_GET['projectid'];?>"
</script>
<script type="text/javascript">
    var monthandyear = "<?php echo $_GET['monthandyear'];?>"
</script>
<link rel="stylesheet" type="text/css" href="
	<?php echo base_url("assets/css/ng-table.min.css")?>" />
	<script type="text/javascript" src="
		<?php echo base_url("assets/js/lib/ng-table.min.js")?>">
	</script>
	<script type="text/javascript" src="
		<?php echo base_url("assets/js/lib/ui-bootstrap-tpls-0.11.0.js")?>">
	</script>
	<script src="
		<?php echo base_url("assets/js/lib/angular-bootstrap-datepicker.js")?>" charset="utf-8">
	</script>
	<link href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery-ui.css" rel="Stylesheet" type="text/css" />
	<link href="
		<?php echo base_url("assets/css/datepicker.css")?>" rel="Stylesheet" type="text/css" />
		<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.8.1/xlsx.full.min.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/2.6.0/jszip.min.js"></script>
		<div class="parallax-container" style="background-color: rgba(0, 12, 78, 0.9)">
			<div class="row">
				<div class="container">
					<div class="col s12 m6 l6">
						<div class="pagebannertext white-text">Edit Attendance
            </div>
					</div>
					<div class="col s12 m6 l6 right-align">
						<div class="dumheight hide-on-small-only"></div>
						<div class="">
							<a href="
								<?php echo base_url('client/dashboard')?>" class="breadcrumb">Home
               
							</a>
							<span class="breadcrumb">Edit Attendance
               </span>
						</div>
					</div>
				</div>
			</div>
			<div class="parallax">
				<img src="
					<?php echo base_url("assets/images/breadcrumbbanner.jpg")?>">
				</div>
			</div>
			<div id="attendance" class="row" ng-app="appadminattendance">
				<div class="container" ng-controller="ctrladminattendance" ng-cloak>
					<div id="" class="section">
						<div class="row">
							<div id="Client-details" class="col s12">
								<div class="email-content-wrap">
									<div class="row">
										<form id="attendanceform" ng-submit="attendanceform.$valid"  name="attendanceform" novalidate>
											<div class="row">
												<div class="col s12">
												{{member}}
													<table ng-table="tableParams"  class="responsive-table highlight striped" show-filter="true" class="bordered" >
														<tr ng-repeat="l in $data" ng-show="l.jobcode != 'DVR'">
															
															<td width="17%"  data-title="'Name'" filter="{firstname: 'text'}">{{l.firstname}}</td>
															<td width="7%"  data-title="'Texco No'" filter="{texcono : 'text'}">{{l.texcono}}</td>
															<td width="5%"  data-title="'Category'" filter="{jobcode: 'text'}">{{l.jobcode }}</td>
															<td data-title="'Duty'" width="10%" style="padding-left: 40px;padding-top: 0px;">
																<input style="margin: -8px 0px -16px 0;
                                       border-bottom:none" type="text" value="AD" />
																<input style="margin: -3px 0px -16px 0;
                                       border-bottom:none" type="text" value="ED 1" />
																<input style="margin: -3px 0px -16px 0;
                                       border-bottom:none" type="text" value="ED 2" />
																<label for="{{l.memberid}}"></label>
															</td>
															<td  data-title="'1'">
																<input ng-click="load()" type="checkbox" name="present" id="{{l.memberid}}1" class="filled-in" ng-checked="l.one == 1" ng-true-value="1" ng-false-value="0" ng-model="l.one" />
																<label for="{{l.memberid}}1"></label>
																<input type="checkbox" name="od" id="{{l.memberid}}2" ng-disabled="l.one == 0" class="filled-in" ng-checked="l.od1one == 1" ng-true-value="1" ng-false-value="0" ng-model="l.od1one"/>
																<label for="{{l.memberid}}2"></label>
																<input type="checkbox" name="od" id="{{l.memberid}}3" ng-disabled="l.od1one == 0" class="filled-in" ng-checked="l.od2one == 1" ng-true-value="1" ng-false-value="0" ng-model="l.od2one"/>
																<label for="{{l.memberid}}3"></label>
															</td>
															<td  data-title="'2'">
																<input type="checkbox" name="present" id="{{l.memberid}}4" class="filled-in" ng-checked="l.two == 1" ng-true-value="1" ng-false-value="0" ng-model="l.two" />
																<label for="{{l.memberid}}4"></label>
																<input type="checkbox" name="od" id="{{l.memberid}}5" ng-disabled="l.two == 0" class="filled-in" ng-checked="l.od1two == 1" ng-true-value="1" ng-false-value="0" ng-model="l.od1two" />
																<label for="{{l.memberid}}5"></label>
																<input type="checkbox" name="od" id="{{l.memberid}}6" ng-disabled="l.od1two == 0" class="filled-in" ng-checked="l.od2two == 1" ng-true-value="1" ng-false-value="0" ng-model="l.od2two" />
																<label for="{{l.memberid}}6"></label>
															</td>
															<td  data-title="'3'">
																<input type="checkbox" name="present" id="{{l.memberid}}7"  class="filled-in" ng-checked="l.three == 1" ng-true-value="1" ng-false-value="0" ng-model="l.three" />
																<label for="{{l.memberid}}7"></label>
																<input type="checkbox" name="od" id="{{l.memberid}}8" ng-disabled="l.three == 0" class="filled-in" ng-checked="l.od1three == 1" ng-true-value="1" ng-false-value="0" ng-model="l.od1three" />
																<label for="{{l.memberid}}8"></label>
																<input type="checkbox" name="od" id="{{l.memberid}}9" ng-disabled="l.od1three == 0" class="filled-in" ng-checked="l.od2three == 1" ng-true-value="1" ng-false-value="0" ng-model="l.od2three" />
																<label for="{{l.memberid}}9"></label>
															</td>
															<td  data-title="'4'">
																<input type="checkbox" name="present" id="{{l.memberid}}10"  class="filled-in" ng-checked="l.four == 1" ng-true-value="1" ng-false-value="0" ng-model="l.four" />
																<label for="{{l.memberid}}10"></label>
																<input type="checkbox" name="od" id="{{l.memberid}}11" ng-disabled="l.four == 0" class="filled-in" ng-checked="l.od1four == 1" ng-true-value="1" ng-false-value="0" ng-model="l.od1four" />
																<label for="{{l.memberid}}11"></label>
																<input type="checkbox" name="od" id="{{l.memberid}}12" ng-disabled="l.od1four == 0" class="filled-in" ng-checked="l.od2four == 1" ng-true-value="1" ng-false-value="0" ng-model="l.od2four" />
																<label for="{{l.memberid}}12"></label>
															</td>
															<td  data-title="'5'">
																<input type="checkbox" name="present" id="{{l.memberid}}13" class="filled-in" ng-checked="l.five == 1" name="present" ng-true-value="1" ng-false-value="0" ng-model="l.five" />
																<label for="{{l.memberid}}13"></label>
																<input type="checkbox" name="od" id="{{l.memberid}}14" ng-disabled="l.five == 0" class="filled-in" ng-checked="l.od1five == 1" ng-true-value="1" ng-false-value="0" ng-model="l.od1five" />
																<label for="{{l.memberid}}14"></label>
																<input type="checkbox" name="od" id="{{l.memberid}}15" ng-disabled="l.od1five == 0" class="filled-in" ng-checked="l.od2five == 1" ng-true-value="1" ng-false-value="0" ng-model="l.od2five" />
																<label for="{{l.memberid}}15"></label>
															</td>
															<td  data-title="'6'">
																<input type="checkbox" name="present" id="{{l.memberid}}16" class="filled-in" ng-checked="l.six == 1" ng-true-value="1" ng-false-value="0" ng-model="l.six" />
																<label for="{{l.memberid}}16"></label>
																<input type="checkbox" id="{{l.memberid}}17" ng-disabled="l.six == 0" class="filled-in" ng-checked="l.od1six == 1" ng-true-value="1" ng-false-value="0" ng-model="l.od1six" />
																<label for="{{l.memberid}}17"></label>
																<input type="checkbox" id="{{l.memberid}}18" ng-disabled="l.od1six == 0" class="filled-in" ng-checked="l.od2six == 1" ng-true-value="1" ng-false-value="0" ng-model="l.od2six" />
																<label for="{{l.memberid}}18"></label>
															</td>
															<td  data-title="'7'">
																<input type="checkbox" name="present" id="{{l.memberid}}19" class="filled-in" ng-checked="l.seven == 1" ng-true-value="1" ng-false-value="0" ng-model="l.seven" />
																<label for="{{l.memberid}}19"></label>
																<input type="checkbox" id="{{l.memberid}}20" ng-disabled="l.seven == 0" class="filled-in" ng-checked="l.od1seven == 1" ng-true-value="1" ng-false-value="0" ng-model="l.od1seven" />
																<label for="{{l.memberid}}20"></label>
																<input type="checkbox" id="{{l.memberid}}21" ng-disabled="l.od1seven == 0" class="filled-in" ng-checked="l.od2seven == 1" ng-true-value="1" ng-false-value="0" ng-model="l.od2seven" />
																<label for="{{l.memberid}}21"></label>
															</td>
															<td  data-title="'8'">
																<input type="checkbox" name="present" id="{{l.memberid}}22" class="filled-in" ng-checked="l.eight == 1" ng-true-value="1" ng-false-value="0" ng-model="l.eight" />
																<label for="{{l.memberid}}22"></label>
																<input type="checkbox" id="{{l.memberid}}23" ng-disabled="l.eight == 0" class="filled-in" ng-checked="l.od1eight == 1" ng-true-value="1" ng-false-value="0" ng-model="l.od1eight" />
																<label for="{{l.memberid}}23"></label>
																<input type="checkbox" id="{{l.memberid}}24" ng-disabled="l.od1eight == 0" class="filled-in" ng-checked="l.od2eight == 1" ng-true-value="1" ng-false-value="0" ng-model="l.od2eight" />
																<label for="{{l.memberid}}24"></label>
															</td>
															<td  data-title="'9'">
																<input type="checkbox" name="present" id="{{l.memberid}}25" class="filled-in" ng-checked="l.nine == 1" ng-true-value="1" ng-false-value="0" ng-model="l.nine" />
																<label for="{{l.memberid}}25"></label>
																<input type="checkbox" id="{{l.memberid}}26" ng-disabled="l.nine == 0" class="filled-in" ng-checked="l.od1nine == 1" ng-true-value="1" ng-false-value="0" ng-model="l.od1nine" />
																<label for="{{l.memberid}}26"></label>
																<input type="checkbox" id="{{l.memberid}}27" ng-disabled="l.od1nine == 0" class="filled-in" ng-checked="l.od2nine == 1" ng-true-value="1" ng-false-value="0" ng-model="l.od2nine" />
																<label for="{{l.memberid}}27"></label>
															</td>
															<td  data-title="'10'">
																<input type="checkbox" name="present" id="{{l.memberid}}28" class="filled-in" ng-checked="l.ten == 1" ng-true-value="1" ng-false-value="0" ng-model="l.ten" />
																<label for="{{l.memberid}}28"></label>
																<input type="checkbox" id="{{l.memberid}}29" ng-disabled="l.ten == 0" class="filled-in" ng-checked="l.od1ten == 1" ng-true-value="1" ng-false-value="0" ng-model="l.od1ten" />
																<label for="{{l.memberid}}29"></label>
																<input type="checkbox" id="{{l.memberid}}30" ng-disabled="l.od1ten == 0" class="filled-in" ng-checked="l.od2ten == 1" ng-true-value="1" ng-false-value="0" ng-model="l.od2ten" />
																<label for="{{l.memberid}}30"></label>
															</td>
															<td  data-title="'11'">
																<input type="checkbox" name="present" id="{{l.memberid}}31" class="filled-in" ng-checked="l.eleven == 1" ng-true-value="1" ng-false-value="0" ng-model="l.eleven" />
																<label for="{{l.memberid}}31"></label>
																<input type="checkbox" id="{{l.memberid}}32" ng-disabled="l.eleven == 0" class="filled-in" ng-checked="l.od1eleven == 1" ng-true-value="1" ng-false-value="0" ng-model="l.od1eleven" />
																<label for="{{l.memberid}}32"></label>
																<input type="checkbox" id="{{l.memberid}}33" ng-disabled="l.od1eleven == 0" class="filled-in" ng-checked="l.od2eleven == 1" ng-true-value="1" ng-false-value="0" ng-model="l.od2eleven" />
																<label for="{{l.memberid}}33"></label>
															</td>
															<td  data-title="'12'">
																<input type="checkbox" name="present" id="{{l.memberid}}34" class="filled-in" ng-checked="l.twelve == 1" ng-true-value="1" ng-false-value="0" ng-model="l.twelve" />
																<label for="{{l.memberid}}34"></label>
																<input type="checkbox" id="{{l.memberid}}35"  ng-disabled="l.twelve == 0" class="filled-in" ng-checked="l.od1twelve == 1" ng-true-value="1" ng-false-value="0" ng-model="l.od1twelve" />
																<label for="{{l.memberid}}35"></label>
																<input type="checkbox" id="{{l.memberid}}36" ng-disabled="l.od1twelve == 0" class="filled-in" ng-checked="l.od2twelve == 1" ng-true-value="1" ng-false-value="0" ng-model="l.od2twelve" />
																<label for="{{l.memberid}}36"></label>
															</td>
															<td  data-title="'13'">
																<input type="checkbox" name="present" id="{{l.memberid}}37" class="filled-in" ng-checked="l.thirteen == 1" ng-true-value="1" ng-false-value="0" ng-model="l.thirteen" />
																<label for="{{l.memberid}}37"></label>
																<input type="checkbox" id="{{l.memberid}}38"  ng-disabled="l.thirteen == 0" class="filled-in" ng-checked="l.od1thirteen == 1" ng-true-value="1" ng-false-value="0" ng-model="l.od1thirteen" />
																<label for="{{l.memberid}}38"></label>
																<input type="checkbox" id="{{l.memberid}}39" ng-disabled="l.od1thirteen == 0" class="filled-in" ng-checked="l.od2thirteen == 1" ng-true-value="1" ng-false-value="0" ng-model="l.od2thirteen" />
																<label for="{{l.memberid}}39"></label>
															</td>
															<td  data-title="'14'">
																<input type="checkbox" name="present" id="{{l.memberid}}40" class="filled-in" ng-checked="l.fourteen == 1" ng-true-value="1" ng-false-value="0" ng-model="l.fourteen" />
																<label for="{{l.memberid}}40"></label>
																<input type="checkbox" id="{{l.memberid}}41" ng-disabled="l.fourteen == 0" class="filled-in" ng-checked="l.od1fourteen == 1" ng-true-value="1" ng-false-value="0" ng-model="l.od1fourteen" />
																<label for="{{l.memberid}}41"></label>
																<input type="checkbox" id="{{l.memberid}}42" ng-disabled="l.od1fourteen == 0" class="filled-in" ng-checked="l.od2fourteen == 1" ng-true-value="1" ng-false-value="0" ng-model="l.od2fourteen" />
																<label for="{{l.memberid}}42"></label>
															</td>
															<td  data-title="'15'">
																<input type="checkbox" name="present" id="{{l.memberid}}43" class="filled-in" ng-checked="l.fifteen == 1" ng-true-value="1" ng-false-value="0" ng-model="l.fifteen" />
																<label for="{{l.memberid}}43"></label>
																<input type="checkbox" id="{{l.memberid}}44" ng-disabled="l.fifteen == 0" class="filled-in" ng-checked="l.od1fifteen == 1" ng-true-value="1" ng-false-value="0" ng-model="l.od1fifteen" />
																<label for="{{l.memberid}}44"></label>
																<input type="checkbox" id="{{l.memberid}}45" ng-disabled="l.od1fifteen == 0" class="filled-in" ng-checked="l.od2fifteen == 1" ng-true-value="1" ng-false-value="0" ng-model="l.od2fifteen" />
																<label for="{{l.memberid}}45"></label>
															</td>
															<td  data-title="'16'">
																<input type="checkbox" name="present" id="{{l.memberid}}46" class="filled-in" ng-checked="l.sixteen == 1" ng-true-value="1" ng-false-value="0" ng-model="l.sixteen" />
																<label for="{{l.memberid}}46"></label>
																<input type="checkbox" id="{{l.memberid}}47" ng-disabled="l.sixteen == 0" class="filled-in" ng-checked="l.od1sixteen == 1" ng-true-value="1" ng-false-value="0" ng-model="l.od1sixteen" />
																<label for="{{l.memberid}}47"></label>
																<input type="checkbox" id="{{l.memberid}}48" ng-disabled="l.od1sixteen == 0" class="filled-in" ng-checked="l.od2sixteen == 1" ng-true-value="1" ng-false-value="0" ng-model="l.od2sixteen" />
																<label for="{{l.memberid}}48"></label>
															</td>
															<td  data-title="'17'">
																<input type="checkbox" name="present" id="{{l.memberid}}49" class="filled-in" ng-checked="l.seventeen == 1" ng-true-value="1" ng-false-value="0" ng-model="l.seventeen" />
																<label for="{{l.memberid}}49"></label>
																<input type="checkbox" id="{{l.memberid}}50"  ng-disabled="l.seventeen == 0" class="filled-in" ng-checked="l.od1seventeen == 1" ng-true-value="1" ng-false-value="0" ng-model="l.od1seventeen" />
																<label for="{{l.memberid}}50"></label>
																<input type="checkbox" id="{{l.memberid}}51" ng-disabled="l.od1seventeen == 0" class="filled-in" ng-checked="l.od2seventeen == 1" ng-true-value="1" ng-false-value="0" ng-model="l.od2seventeen" />
																<label for="{{l.memberid}}51"></label>
															</td>
															<td  data-title="'18'">
																<input type="checkbox" name="present" id="{{l.memberid}}52" class="filled-in"  ng-checked="l.eighteen == 1" ng-true-value="1" ng-false-value="0" ng-model="l.eighteen" />
																<label for="{{l.memberid}}52"></label>
																<input type="checkbox" id="{{l.memberid}}53" ng-disabled="l.eighteen == 0" class="filled-in" ng-checked="l.od1eighteen == 1" ng-true-value="1" ng-false-value="0" ng-model="l.od1eighteen" />
																<label for="{{l.memberid}}53"></label>
																<input type="checkbox" id="{{l.memberid}}54" ng-disabled="l.od1eighteen == 0" class="filled-in" ng-checked="l.od2eighteen == 1" ng-true-value="1" ng-false-value="0" ng-model="l.od2eighteen" />
																<label for="{{l.memberid}}54"></label>
															</td>
															<td  data-title="'19'">
																<input type="checkbox" name="present" id="{{l.memberid}}55" class="filled-in"  ng-checked="l.nineteen == 1" ng-true-value="1" ng-false-value="0" ng-model="l.nineteen" />
																<label for="{{l.memberid}}55"></label>
																<input type="checkbox" id="{{l.memberid}}56" ng-disabled="l.nineteen == 0" class="filled-in" ng-checked="l.od1nineteen == 1" ng-true-value="1" ng-false-value="0" ng-model="l.od1nineteen" />
																<label for="{{l.memberid}}56"></label>
																<input type="checkbox" id="{{l.memberid}}57" ng-disabled="l.od1nineteen == 0" class="filled-in" ng-checked="l.od2nineteen == 1" ng-true-value="1" ng-false-value="0" ng-model="l.od2nineteen" />
																<label for="{{l.memberid}}57"></label>
															</td>
															<td  data-title="'20'">
																<input type="checkbox" name="present" id="{{l.memberid}}58" class="filled-in" ng-checked="l.twenty == 1" ng-true-value="1" ng-false-value="0" ng-model="l.twenty" />
																<label for="{{l.memberid}}58"></label>
																<input type="checkbox" id="{{l.memberid}}59" ng-disabled="l.twenty == 0" class="filled-in" ng-checked="l.od1twenty == 1" ng-true-value="1" ng-false-value="0" ng-model="l.od1twenty" />
																<label for="{{l.memberid}}59"></label>
																<input type="checkbox" id="{{l.memberid}}60" ng-disabled="l.od1twenty == 0" class="filled-in" ng-checked="l.od2twenty == 1" ng-true-value="1" ng-false-value="0" ng-model="l.od2twenty" />
																<label for="{{l.memberid}}60"></label>
															</td>
															<td  data-title="'21'">
																<input type="checkbox" name="present" id="{{l.memberid}}61" class="filled-in" ng-checked="l.twentyone == 1" ng-true-value="1" ng-false-value="0" ng-model="l.twentyone" />
																<label for="{{l.memberid}}61"></label>
																<input type="checkbox" id="{{l.memberid}}62"  ng-disabled="l.twentyone == 0" class="filled-in" ng-checked="l.od1twentyone == 1" ng-true-value="1" ng-false-value="0" ng-model="l.od1twentyone" />
																<label for="{{l.memberid}}62"></label>
																<input type="checkbox" id="{{l.memberid}}63" ng-disabled="l.od1twentyone == 0" class="filled-in" ng-checked="l.od2twentyone == 1" ng-true-value="1" ng-false-value="0" ng-model="l.od2twentyone" />
																<label for="{{l.memberid}}63"></label>
															</td>
															<td  data-title="'22'">
																<input type="checkbox" name="present" id="{{l.memberid}}64" class="filled-in" ng-checked="l.twentytwo == 1" ng-true-value="1" ng-false-value="0" ng-model="l.twentytwo" />
																<label for="{{l.memberid}}64"></label>
																<input type="checkbox" id="{{l.memberid}}65"  ng-disabled="l.twentytwo == 0" class="filled-in" ng-checked="l.od1twentytwo == 1" ng-true-value="1" ng-false-value="0" ng-model="l.od1twentytwo" />
																<label for="{{l.memberid}}65"></label>
																<input type="checkbox" id="{{l.memberid}}66" ng-disabled="l.od1twentytwo == 0" class="filled-in" ng-checked="l.od2twentytwo == 1" ng-true-value="1" ng-false-value="0" ng-model="l.od2twentytwo" />
																<label for="{{l.memberid}}66"></label>
															</td>
															<td  data-title="'23'">
																<input type="checkbox" name="present" id="{{l.memberid}}67" class="filled-in" ng-checked="l.twentythree == 1" ng-true-value="1" ng-false-value="0" ng-model="l.twentythree" />
																<label for="{{l.memberid}}67"></label>
																<input type="checkbox" id="{{l.memberid}}68" ng-disabled="l.twentythree == 0" class="filled-in" ng-checked="l.od1twentythree == 1" ng-true-value="1" ng-false-value="0" ng-model="l.od1twentythree" />
																<label for="{{l.memberid}}68"></label>
																<input type="checkbox" id="{{l.memberid}}69" ng-disabled="l.od1twentythree == 0" class="filled-in" ng-checked="l.od2twentythree == 1" ng-true-value="1" ng-false-value="0" ng-model="l.od2twentythree" />
																<label for="{{l.memberid}}69"></label>
															</td>
															<td  data-title="'24'">
																<input type="checkbox" name="present" id="{{l.memberid}}70" class="filled-in" ng-checked="l.twentyfour == 1" ng-true-value="1" ng-false-value="0" ng-model="l.twentyfour" />
																<label for="{{l.memberid}}70"></label>
																<input type="checkbox" id="{{l.memberid}}71" ng-disabled="l.twentyfour == 0" class="filled-in" ng-checked="l.od1twentyfour == 1" ng-true-value="1" ng-false-value="0" ng-model="l.od1twentyfour" />
																<label for="{{l.memberid}}71"></label>
																<input type="checkbox" id="{{l.memberid}}72" ng-disabled="l.od1twentyfour == 0" class="filled-in" ng-checked="l.od2twentyfour == 1" ng-true-value="1" ng-false-value="0" ng-model="l.od2twentyfour" />
																<label for="{{l.memberid}}72"></label>
															</td>
															<td  data-title="'25'">
																<input type="checkbox" name="present" id="{{l.memberid}}73" class="filled-in" ng-checked="l.twentyfive == 1" ng-true-value="1" ng-false-value="0" ng-model="l.twentyfive" />
																<label for="{{l.memberid}}73"></label>
																<input type="checkbox" id="{{l.memberid}}74"  ng-disabled="l.twentyfive == 0" class="filled-in" ng-checked="l.od1twentyfive == 1" ng-true-value="1" ng-false-value="0" ng-model="l.od1twentyfive" />
																<label for="{{l.memberid}}74"></label>
																<input type="checkbox" id="{{l.memberid}}75" ng-disabled="l.od1twentyfive == 0" class="filled-in" ng-checked="l.od2twentyfive == 1" ng-true-value="1" ng-false-value="0" ng-model="l.od2twentyfive" />
																<label for="{{l.memberid}}75"></label>
															</td>
															<td  data-title="'26'">
																<input type="checkbox" name="present" id="{{l.memberid}}76" class="filled-in" ng-checked="l.twentysix == 1" ng-true-value="1" ng-false-value="0" ng-model="l.twentysix" />
																<label for="{{l.memberid}}76"></label>
																<input type="checkbox" id="{{l.memberid}}77" ng-disabled="l.twentysix == 0" class="filled-in" ng-checked="l.od1twentysix == 1" ng-true-value="1" ng-false-value="0" ng-model="l.od1twentysix" />
																<label for="{{l.memberid}}77"></label>
																<input type="checkbox" id="{{l.memberid}}78" ng-disabled="l.od1twentysix == 0" class="filled-in" ng-checked="l.od2twentysix == 1" ng-true-value="1" ng-false-value="0" ng-model="l.od2twentysix" />
																<label for="{{l.memberid}}78"></label>
															</td>
															<td  data-title="'27'">
																<input type="checkbox" name="present" id="{{l.memberid}}79" class="filled-in" ng-checked="l.twentyseven == 1" ng-true-value="1" ng-false-value="0" ng-model="l.twentyseven" />
																<label for="{{l.memberid}}79"></label>
																<input type="checkbox" id="{{l.memberid}}80"  ng-disabled="l.twentyseven == 0" class="filled-in" ng-checked="l.od1twentyseven == 1" ng-true-value="1" ng-false-value="0" ng-model="l.od1twentyseven" />
																<label for="{{l.memberid}}80"></label>
																<input type="checkbox" id="{{l.memberid}}81" ng-disabled="l.od1twentyseven == 0" class="filled-in" ng-checked="l.od2twentyseven == 1" ng-true-value="1" ng-false-value="0" ng-model="l.od2twentyseven" />
																<label for="{{l.memberid}}81"></label>
															</td>
															<td  data-title="'28'">
																<input type="checkbox" name="present" id="{{l.memberid}}82" class="filled-in" ng-checked="l.twentyeight == 1" ng-true-value="1" ng-false-value="0" ng-model="l.twentyeight" />
																<label for="{{l.memberid}}82"></label>
																<input type="checkbox" id="{{l.memberid}}83"  ng-disabled="l.twentyeight == 0" class="filled-in" ng-checked="l.od1twentyeight == 1" ng-true-value="1" ng-false-value="0" ng-model="l.od1twentyeight" />
																<label for="{{l.memberid}}83"></label>
																<input type="checkbox" id="{{l.memberid}}84" ng-disabled="l.od1twentyeight == 0" class="filled-in" ng-checked="l.od2twentyeight == 1" ng-true-value="1" ng-false-value="0" ng-model="l.od2twentyeight" />
																<label for="{{l.memberid}}84"></label>
															</td>
															<td  data-title="'29'">
																<input type="checkbox" name="present" id="{{l.memberid}}85" class="filled-in" ng-checked="l.twentynine == 1" ng-true-value="1" ng-false-value="0" ng-model="l.twentynine" />
																<label for="{{l.memberid}}85"></label>
																<input type="checkbox" id="{{l.memberid}}86"  ng-disabled="l.twentynine == 0" class="filled-in" ng-checked="l.od1twentynine == 1" ng-true-value="1" ng-false-value="0" ng-model="l.od1twentynine" />
																<label for="{{l.memberid}}86"></label>
																<input type="checkbox" id="{{l.memberid}}87" ng-disabled="l.od1twentynine == 0" class="filled-in" ng-checked="l.od2twentynine == 1" ng-true-value="1" ng-false-value="0"  ng-model="l.od2twentynine" />
																<label for="{{l.memberid}}87"></label>
															</td>
															<td  data-title="'30'">
																<input type="checkbox" name="present" id="{{l.memberid}}88" class="filled-in"  ng-checked="l.thirty == 1" ng-true-value="1" ng-false-value="0" ng-model="l.thirty" />
																<label for="{{l.memberid}}88"></label>
																<input type="checkbox" id="{{l.memberid}}89" ng-disabled="l.thirty == 0" class="filled-in" ng-checked="l.od1thirty == 1" ng-true-value="1" ng-false-value="0" ng-model="l.od1thirty" />
																<label for="{{l.memberid}}89"></label>
																<input type="checkbox" id="{{l.memberid}}90" ng-disabled="l.od1thirty == 0" class="filled-in" ng-checked="l.od2thirty == 1" ng-true-value="1" ng-false-value="0" ng-model="l.od2thirty" />
																<label for="{{l.memberid}}90"></label>
															</td>
															<td  data-title="'31'">
																<input type="checkbox" name="present" id="{{l.memberid}}91" class="filled-in" ng-checked="l.thirtyone == 1" ng-true-value="1" ng-false-value="0" ng-model="l.thirtyone" />
																<label for="{{l.memberid}}91"></label>
																<input type="checkbox" id="{{l.memberid}}92" ng-disabled="l.thirtyone == 0" class="filled-in" ng-checked="l.od1thirtyone == 1" ng-true-value="1" ng-false-value="0" ng-model="l.od1thirtyone" />
																<label for="{{l.memberid}}92"></label>
																<input type="checkbox" id="{{l.memberid}}93" ng-disabled="l.od1thirtyone == 0" class="filled-in" ng-checked="l.od2thirtyone == 1" ng-true-value="1" ng-false-value="0"  ng-model="l.od2thirtyone" />
																<label for="{{l.memberid}}93"></label>
															</td>
															<td width="5%" data-title="'Days'" style="padding-left: 20px;padding-top: 0px;">
																<input style="margin: -8px 0px -16px 0;
                                    border-bottom:none" type="text" ng-model="l.pdays" />
																<input style="margin: -3px 0px -16px 0;
                                       border-bottom:none" type="text" ng-model="l.od1Items" />
																<input style="margin: -3px 0px -16px 0;
                                       border-bottom:none" type="text" ng-model="l.od2Items" />
																<label for="{{l.memberid}}"></label>
															</td>
														</tr>
														<tr ng-repeat="l in $data" ng-show="l.jobcode == 'DVR'" >
															<td width="17%"  data-title="'Name'" filter="{firstname: 'text'}">{{l.firstname}}</td>
															<td width="7%"  data-title="'Texco No'" filter="{texcono : 'text'}">{{l.texcono}}</td>
															<td width="5%"  data-title="'Category'" filter="{jobcode: 'text'}">{{l.jobcode }}</td>
															<td data-title="'Duty'" width="10%" style="padding-left: 40px;padding-top: 0px;">
																<input style="margin: -8px 0px -16px 0;border-bottom:none" type="text" value="AD" />
																<input style="margin: -3px 0px -16px 0;border-bottom:none" type="text" value="ED " />
															</td>
															<td  data-title="'1'">
																<input type="checkbox" name="present" id="{{l.memberid}}1" class="filled-in" ng-checked="l.one == 1" ng-true-value="1" ng-false-value="0" ng-model="l.one" />
																<label for="{{l.memberid}}1"></label>
																<input type="text" name="od" id="{{l.memberid}}2" ng-disabled="l.one == 0" class="filled-in" ng-model="l.od1one"/>
																<label for="{{l.memberid}}2"></label>
															</td>
															<td  data-title="'2'">
																<input type="checkbox" name="present" id="{{l.memberid}}4" class="filled-in" ng-checked="l.two == 1" ng-true-value="1" ng-false-value="0" ng-model="l.two" />
																<label for="{{l.memberid}}4"></label>
																<input type="text" name="od" id="{{l.memberid}}5" ng-disabled="l.two == 0" class="filled-in" ng-model="l.od1two" />
																<label for="{{l.memberid}}5"></label>
															</td>
															<td  data-title="'3'">
																<input type="checkbox" name="present" id="{{l.memberid}}7"  class="filled-in"  ng-checked="l.three == 1" ng-true-value="1" ng-false-value="0" ng-model="l.three" />
																<label for="{{l.memberid}}7"></label>
																<input type="text" name="od" id="{{l.memberid}}8"  ng-disabled="l.three == 0" class="filled-in" ng-model="l.od1three" />
																<label for="{{l.memberid}}8"></label>
															</td>
															<td  data-title="'4'">
																<input type="checkbox" name="present" id="{{l.memberid}}10"  class="filled-in" ng-checked="l.five == 1" name="present" ng-true-value="1" ng-false-value="0" ng-model="l.four" />
																<label for="{{l.memberid}}10"></label>
																<input type="text" name="od" id="{{l.memberid}}11" ng-disabled="l.four == 0" class="filled-in" ng-model="l.od1four" />
																<label for="{{l.memberid}}11"></label>
															</td>
															<td  data-title="'5'">
																<input type="checkbox" name="present" id="{{l.memberid}}13" class="filled-in"  ng-checked="l.five == 1" name="present" ng-true-value="1" ng-false-value="0" ng-model="l.five" />
																<label for="{{l.memberid}}13"></label>
																<input type="text" name="od" id="{{l.memberid}}14" ng-disabled="l.five == 0" class="filled-in" ng-model="l.od1five" />
																<label for="{{l.memberid}}14"></label>
															</td>
															<td  data-title="'6'">
																<input type="checkbox" name="present" id="{{l.memberid}}16" class="filled-in" ng-checked="l.six == 1" ng-true-value="1" ng-false-value="0" ng-model="l.six" />
																<label for="{{l.memberid}}16"></label>
																<input type="text" id="{{l.memberid}}17" ng-disabled="l.six == 0" class="filled-in" ng-model="l.od1six" />
																<label for="{{l.memberid}}17"></label>
															</td>
															<td  data-title="'7'">
																<input type="checkbox" name="present" id="{{l.memberid}}19" class="filled-in" ng-checked="l.seven == 1" ng-true-value="1" ng-false-value="0" ng-model="l.seven" />
																<label for="{{l.memberid}}19"></label>
																<input type="text" id="{{l.memberid}}20" ng-disabled="l.seven == 0" class="filled-in" ng-model="l.od1seven" />
																<label for="{{l.memberid}}20"></label>
															</td>
															<td  data-title="'8'">
																<input type="checkbox" name="present" id="{{l.memberid}}22" class="filled-in"  ng-checked="l.eight == 1" ng-true-value="1" ng-false-value="0" ng-model="l.eight" />
																<label for="{{l.memberid}}22"></label>
																<input type="text" id="{{l.memberid}}23" ng-disabled="l.eight == 0" class="filled-in" ng-checked="l.eight == 2" ng-true-value="1" ng-false-value="0" ng-model="l.od1eight" />
																<label for="{{l.memberid}}23"></label>
															</td>
															<td  data-title="'9'">
																<input type="checkbox" name="present" id="{{l.memberid}}25" class="filled-in" ng-checked="l.nine == 1" ng-true-value="1" ng-false-value="0" ng-model="l.nine" />
																<label for="{{l.memberid}}25"></label>
																<input type="text" id="{{l.memberid}}26" ng-disabled="l.nine == 0" class="filled-in" ng-checked="l.nine == 2" ng-true-value="1" ng-false-value="0" ng-model="l.od1nine" />
																<label for="{{l.memberid}}26"></label>
															</td>
															<td  data-title="'10'">
																<input type="checkbox" name="present" id="{{l.memberid}}28" class="filled-in" ng-checked="l.ten == 1" ng-true-value="1" ng-false-value="0" ng-model="l.ten" />
																<label for="{{l.memberid}}28"></label>
																<input type="text" id="{{l.memberid}}29" ng-disabled="l.ten == 0" class="filled-in" ng-checked="l.ten == 2" ng-true-value="1" ng-false-value="0" ng-model="l.od1ten" />
																<label for="{{l.memberid}}29"></label>
															</td>
															<td  data-title="'11'">
																<input type="checkbox" name="present" id="{{l.memberid}}31" class="filled-in" ng-checked="l.eleven == 1" ng-true-value="1" ng-false-value="0" ng-model="l.eleven" />
																<label for="{{l.memberid}}31"></label>
																<input type="text" id="{{l.memberid}}32" ng-disabled="l.eleven == 0" class="filled-in" ng-checked="l.eleven == 2" ng-true-value="1" ng-false-value="0" ng-model="l.od1eleven" />
																<label for="{{l.memberid}}32"></label>
															</td>
															<td  data-title="'12'">
																<input type="checkbox" name="present" id="{{l.memberid}}34" class="filled-in" ng-checked="l.twelve == 1" ng-true-value="1" ng-false-value="0" ng-model="l.twelve" />
																<label for="{{l.memberid}}34"></label>
																<input type="text" id="{{l.memberid}}35" ng-disabled="l.twelve == 0" class="filled-in" ng-checked="l.twelve == 2" ng-true-value="1" ng-false-value="0" ng-model="l.od1twelve" />
																<label for="{{l.memberid}}35"></label>
															</td>
															<td  data-title="'13'">
																<input type="checkbox" name="present" id="{{l.memberid}}37" class="filled-in" ng-checked="l.thirteen == 1" ng-true-value="1" ng-false-value="0" ng-model="l.thirteen" />
																<label for="{{l.memberid}}37"></label>
																<input type="text" id="{{l.memberid}}38" ng-disabled="l.thirteen == 0" class="filled-in" ng-checked="l.thirteen == 2" ng-true-value="1" ng-false-value="0" ng-model="l.od1thirteen" />
																<label for="{{l.memberid}}38"></label>
															</td>
															<td  data-title="'14'">
																<input type="checkbox" name="present" id="{{l.memberid}}40" class="filled-in" ng-checked="l.fourteen == 1" ng-true-value="1" ng-false-value="0" ng-model="l.fourteen" />
																<label for="{{l.memberid}}40"></label>
																<input type="text" id="{{l.memberid}}41" ng-disabled="l.fourteen == 0" class="filled-in" ng-checked="l.fourteen == 2" ng-true-value="1" ng-false-value="0" ng-model="l.od1fourteen" />
																<label for="{{l.memberid}}41"></label>
															</td>
															<td  data-title="'15'">
																<input type="checkbox" name="present" id="{{l.memberid}}43" class="filled-in" ng-checked="l.fifteen == 1" ng-true-value="1" ng-false-value="0" ng-model="l.fifteen" />
																<label for="{{l.memberid}}43"></label>
																<input type="text" id="{{l.memberid}}44" ng-disabled="l.fifteen == 0" class="filled-in" ng-checked="l.fifteen == 2" ng-true-value="1" ng-false-value="0" ng-model="l.od1fifteen" />
																<label for="{{l.memberid}}44"></label>
															</td>
															<td  data-title="'16'">
																<input type="checkbox" name="present" id="{{l.memberid}}46" class="filled-in" ng-checked="l.sixteen == 1" ng-true-value="1" ng-false-value="0" ng-model="l.sixteen" />
																<label for="{{l.memberid}}46"></label>
																<input type="text" id="{{l.memberid}}47" ng-disabled="l.sixteen == 0" class="filled-in" ng-checked="l.sixteen == 2" ng-true-value="1" ng-false-value="0" ng-model="l.od1sixteen" />
																<label for="{{l.memberid}}47"></label>
															</td>
															<td  data-title="'17'">
																<input type="checkbox" name="present" id="{{l.memberid}}49" class="filled-in" ng-checked="l.seventeen == 1" ng-true-value="1" ng-false-value="0" ng-model="l.seventeen" />
																<label for="{{l.memberid}}49"></label>
																<input type="text" id="{{l.memberid}}50" ng-disabled="l.seventeen == 0" class="filled-in" ng-checked="l.seventeen == 2" ng-true-value="1" ng-false-value="0" ng-model="l.od1seventeen" />
																<label for="{{l.memberid}}50"></label>
															</td>
															<td  data-title="'18'">
																<input type="checkbox" name="present" id="{{l.memberid}}52" class="filled-in" ng-checked="l.eighteen == 1" ng-true-value="1" ng-false-value="0" ng-model="l.eighteen" />
																<label for="{{l.memberid}}52"></label>
																<input type="text" id="{{l.memberid}}53" ng-disabled="l.eighteen == 0" class="filled-in" ng-checked="l.eighteen == 2" ng-true-value="1" ng-false-value="0" ng-model="l.od1eighteen" />
																<label for="{{l.memberid}}53"></label>
															</td>
															<td  data-title="'19'">
																<input type="checkbox" name="present" id="{{l.memberid}}55" class="filled-in"  ng-checked="l.nineteen == 1" ng-true-value="1" ng-false-value="0" ng-model="l.nineteen" />
																<label for="{{l.memberid}}55"></label>
																<input type="text" id="{{l.memberid}}56" ng-disabled="l.nineteen == 0" class="filled-in" ng-checked="l.nineteen == 2" ng-true-value="1" ng-false-value="0" ng-model="l.od1nineteen" />
																<label for="{{l.memberid}}56"></label>
															</td>
															<td  data-title="'20'">
																<input type="checkbox" name="present" id="{{l.memberid}}58" class="filled-in" ng-checked="l.twenty == 1" ng-true-value="1" ng-false-value="0" ng-model="l.twenty" />
																<label for="{{l.memberid}}58"></label>
																<input type="text" id="{{l.memberid}}59" ng-disabled="l.twenty == 0" class="filled-in" ng-checked="l.twenty == 2" ng-true-value="1" ng-false-value="0" ng-model="l.od1twenty" />
																<label for="{{l.memberid}}59"></label>
															</td>
															<td  data-title="'21'">
																<input type="checkbox" name="present" id="{{l.memberid}}61" class="filled-in" ng-checked="l.twentyone == 1" ng-true-value="1" ng-false-value="0" ng-model="l.twentyone" />
																<label for="{{l.memberid}}61"></label>
																<input type="text" id="{{l.memberid}}62" ng-disabled="l.twentyone == 0" class="filled-in" ng-checked="l.twentyone == 2" ng-true-value="1" ng-false-value="0" ng-model="l.od1twentyone" />
																<label for="{{l.memberid}}62"></label>
															</td>
															<td  data-title="'22'">
																<input type="checkbox" name="present" id="{{l.memberid}}64" class="filled-in"  ng-checked="l.twentytwo == 1" ng-true-value="1" ng-false-value="0" ng-model="l.twentytwo" />
																<label for="{{l.memberid}}64"></label>
																<input type="text" id="{{l.memberid}}65" ng-disabled="l.twentytwo == 0" class="filled-in" ng-checked="l.twentytwo == 2" ng-true-value="1" ng-false-value="0" ng-model="l.od1twentytwo" />
																<label for="{{l.memberid}}65"></label>
															</td>
															<td  data-title="'23'">
																<input type="checkbox" name="present" id="{{l.memberid}}67" class="filled-in" ng-checked="l.twentythree == 1" ng-true-value="1" ng-false-value="0" ng-model="l.twentythree" />
																<label for="{{l.memberid}}67"></label>
																<input type="text" id="{{l.memberid}}68" ng-disabled="l.twentythree == 0" class="filled-in" ng-checked="l.twentythree == 2" ng-true-value="1" ng-false-value="0" ng-model="l.od1twentythree" />
																<label for="{{l.memberid}}68"></label>
															</td>
															<td  data-title="'24'">
																<input type="checkbox" name="present" id="{{l.memberid}}70" class="filled-in" ng-checked="l.twentyfour == 1" ng-true-value="1" ng-false-value="0" ng-model="l.twentyfour" />
																<label for="{{l.memberid}}70"></label>
																<input type="text" id="{{l.memberid}}71" ng-disabled="l.twentyfour == 0" class="filled-in" ng-checked="l.twentyfour == 2" ng-true-value="1" ng-false-value="0" ng-model="l.od1twentyfour" />
																<label for="{{l.memberid}}71"></label>
															</td>
															<td  data-title="'25'">
																<input type="checkbox" name="present" id="{{l.memberid}}73" class="filled-in" ng-checked="l.twentyfive == 1" ng-true-value="1" ng-false-value="0" ng-model="l.twentyfive" />
																<label for="{{l.memberid}}73"></label>
																<input type="text" id="{{l.memberid}}74" ng-disabled="l.twentyfive == 0" class="filled-in" ng-checked="l.twentyfive == 2" ng-true-value="1" ng-false-value="0" ng-model="l.od1twentyfive" />
																<label for="{{l.memberid}}74"></label>
															</td>
															<td  data-title="'26'">
																<input type="checkbox" name="present" id="{{l.memberid}}76" class="filled-in" ng-checked="l.twentysix == 1" ng-true-value="1" ng-false-value="0" ng-model="l.twentysix" />
																<label for="{{l.memberid}}76"></label>
																<input type="text" id="{{l.memberid}}77" ng-disabled="l.twentysix == 0" class="filled-in" ng-checked="l.twentysix == 2" ng-true-value="1" ng-false-value="0" ng-model="l.od1twentysix" />
																<label for="{{l.memberid}}77"></label>
															</td>
															<td  data-title="'27'">
																<input type="checkbox" name="present" id="{{l.memberid}}79" class="filled-in" ng-checked="l.twentyseven == 1" ng-true-value="1" ng-false-value="0" ng-model="l.twentyseven" />
																<label for="{{l.memberid}}79"></label>
																<input type="text" id="{{l.memberid}}80" ng-disabled="l.twentyseven == 0" class="filled-in" ng-checked="l.twentyseven == 2" ng-true-value="1" ng-false-value="0" ng-model="l.od1twentyseven" />
																<label for="{{l.memberid}}80"></label>
															</td>
															<td  data-title="'28'">
																<input type="checkbox" name="present" id="{{l.memberid}}82" class="filled-in" ng-checked="l.twentyeight == 1" ng-true-value="1" ng-false-value="0" ng-model="l.twentyeight" />
																<label for="{{l.memberid}}82"></label>
																<input type="text" id="{{l.memberid}}83" ng-disabled="l.twentyeight == 0" class="filled-in" ng-checked="l.twentyeight == 2" ng-true-value="1" ng-false-value="0" ng-model="l.od1twentyeight" />
																<label for="{{l.memberid}}83"></label>
															</td>
															<td  data-title="'29'">
																<input type="checkbox" name="present" id="{{l.memberid}}85" class="filled-in" ng-checked="l.twentynine == 1" ng-true-value="1" ng-false-value="0" ng-model="l.twentynine" />
																<label for="{{l.memberid}}85"></label>
																<input type="text" id="{{l.memberid}}86" ng-disabled="l.twentynine == 0" class="filled-in" ng-checked="l.twentynine == 2" ng-true-value="1" ng-false-value="0" ng-model="l.od1twentynine" />
																<label for="{{l.memberid}}86"></label>
															</td>
															<td  data-title="'30'">
																<input type="checkbox" name="present" id="{{l.memberid}}88" class="filled-in" ng-checked="l.thirty == 1" ng-true-value="1" ng-false-value="0" ng-model="l.thirty" />
																<label for="{{l.memberid}}88"></label>
																<input type="text" id="{{l.memberid}}89" ng-disabled="l.thirty == 0" class="filled-in" ng-checked="l.thirty == 2" ng-true-value="1" ng-false-value="0" ng-model="l.od1thirty" />
																<label for="{{l.memberid}}89"></label>
															</td>
															<td  data-title="'31'">
																<input type="checkbox" name="present" id="{{l.memberid}}91" class="filled-in" ng-checked="l.thirtyone == 1" ng-true-value="1" ng-false-value="0" ng-model="l.thirtyone" />
																<label for="{{l.memberid}}91"></label>
																<input type="text" id="{{l.memberid}}92" ng-disabled="l.thirtyone == 0" class="filled-in" ng-checked="l.thirtyone == 2" ng-true-value="1" ng-false-value="0" ng-model="l.od1thirtyone" />
																<label for="{{l.memberid}}92"></label>
															</td>
															<td width="5%" data-title="'Days'" style="padding-left: 20px;padding-top: 0px;">
																<input style="margin: -8px 0px -16px 0;
                                    border-bottom:none" type="text" ng-model="l.pdays" />
																<input style="margin: -3px 0px -16px 0;
                                       border-bottom:none" type="text" ng-model="l.od1Items" />
																<label for="{{l.memberid}}"></label>
															</td>
														</tr>
													</table>
												</div>
											</div>
											<div class="row">
												<div id="failure" class="red-text"></div>
												<div class="input-field col s6 l4">
													<p>
														<button class="btn waves-effect waves-light  cyan darken-2" type="submit" ng-click="saveattendance(objattendance, members)">Save
                              </button>
														<button class="waves-green btn-flat" type="button"  ng-click="backattendence()">
                              Back
                              </button>
													</p>
												</div>
											</form>
										</div>
										<div id="success" class="green-text"></div>
									</form>
									
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<script type="text/javascript">
   $(function() {
     $('.monthYearPicker').datepicker({
       changeMonth: true,
       changeYear: true,
       showButtonPanel: true,
       dateFormat: 'MM yy'
     }).focus(function() {
       var thisCalendar = $(this);
       $('.ui-datepicker-calendar').detach();
       $('.ui-datepicker-close').click(function() {
         var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
         var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
         thisCalendar.datepicker('setDate', new Date(year, month, 1));
         var projectid = angular.element(document.getElementById('project')).scope().objattendance.projectid;
         var controllerElement = document.querySelector('[ng-controller="ctrlClientattendance"]');
         var controllerScope = angular.element(controllerElement).scope();
         controllerScope.$apply( function(){
         controllerScope.objattendance.monthandyear = monthandyear.value;
          angular.element(controllerElement).scope().editattendance(monthandyear.value, projectid);
      });
       });
     });
   });
   
   $( document ).ready(function() { 
   $('.month_year').datepicker({
      format: 'MM yyyy',
      viewMode: "months", 
      minViewMode: "months",
        autoClose:true,
   
   });
   
   $(".month_year").datepicker().on("changeDate", function(e) {
   $('.datepicker-dropdown').hide();
   });
   });   
   
   
</script>
					<style type="text/css">
.ng-table-pager {
   display: none;
}
.striped {
   display: block;
   height: auto;
   
   }
</style>
					<style type="text/css">
   .ui-datepicker-calendar {
   display: none;
   }
   td {
   max-width: 25px;
   }
   .datepicker-dropdown {
   top: 0;
   left: 0;
   position: absolute;
   background-color: #fff;
   width: 20%;
   }
   /*.striped {
   height: 300px;
   overflow-y: scroll;
   }*/
</style>