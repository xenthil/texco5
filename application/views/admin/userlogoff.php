<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ng-table.min.js")?>"></script>
<link rel="stylesheet" type="text/css" href="<?php echo base_url("assets/css/ng-table.min.css")?>" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.8.1/xlsx.full.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/2.6.0/jszip.min.js"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/app/userlogoff.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/lib/ui-bootstrap-tpls-0.11.0.js")?>"></script>
<script type="text/javascript">
    var memberid = 0
</script>

<div class="parallax-container" style="background-color: rgba(0, 12, 78, 0.9)">
    <div class="row">
        <div class="container">
            <div class="col s12 m6 l6">
                <div class="pagebannertext white-text">WAGE MASTER</div>
            </div>
            <div class="col s12 m6 l6 right-align">
                <div class="dumheight hide-on-small-only"> </div>
                <div class=""> <a href="<?php echo base_url('admin/dashboard')?>" class="breadcrumb">Home</a> 
                <span class="breadcrumb">Master</span><span class="breadcrumb">Wage master</span> </div>
            </div>
        </div>
    </div>
    <div class="parallax"><img src="<?php echo base_url("assets/images/breadcrumbbanner.jpg")?>">
    </div>
</div>

<div class="row" ng-app="appsessionmaster">
    <div class="container" ng-controller="ctrlsessionmaster">
       

        
            <br>
            <div class="row">
                <div class="input-field col s6">
                    <input name="wpassword" id="wpassword" class="wpassword" type="text" ng-model="texconumber" placeholder="Enter Service No(Army No)/Texco No" autocomplete="off" autofocus="off"/>
                    <label for="">Enter Texco Number/Service No</label>
                </div>
                <div class="input-field col s6">
                    <button ng-click="loggoffmember(texconumber)" id="btntexser" style="background: green;top: 10px !important;color: #fff !important;" class="modal-action waves-effect waves-green btn-flat" type="submit">Go</button>

                </div>
           
            <br>
        </div>
    </div>
</div>

<style>
    .selected
    {
    	color:red
    	}
    	.partamt
    	{ margin-right: 73px;
    	}
    	span.part {
        margin-right: 32px;
    }
    .filled-in {
        opacity: 1;
        position: relative;
        left: 0;
    }
</style>

<script>
    $(document).ready(function(){
        $('ul.tabs').tabs();

        $('#wpassword').keypress(function (e) {
            var regex = new RegExp("^[a-zA-Z0-9]+$");
            var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
            if (regex.test(str)) {
                return true;
            }
            e.preventDefault();
            return false;
        });

    });
</script>
