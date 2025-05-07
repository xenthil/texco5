<script type="text/javascript"> var base_url = "<?php echo base_url()?>" </script>
<script type="text/javascript"> var api_url = "<?php echo config_item('api_url')?>" </script>
<script type="text/javascript" src="<?php echo base_url("assets/libs/jquery/3.7.1/jquery.min.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/libs/angular/1.8.2/angular.min.js")?>"></script>
<script type="text/javascript" src="<?php echo base_url("assets/js/app/printinvoice.js")?>"></script>
<script type="text/javascript">var invoiceno = "<?php echo $_GET['invoiceno'];?>"</script>
<style>@page { size: auto;  margin: 1mm; }</style>
<div ng-app="appPrint" ng-controller="ctrlPrint">
    <table width="100%" align="center" cellpadding="0" cellspacing="0" border="1" style="border-collapse: collapse">
        <tbody>
            <tr>
                <td width="100%" align="center">
                    <table width="99%" align="center" cellpadding="0" cellspacing="0" border="0">
                        <tbody>
                            <tr>
                                <td width="20%" align="center">
                                    <img style="height: 50%;" src="<?php echo base_url("assets/images/clientletter.jpg")?>">
                                </td>
                                <td width="100%" align="center">
                                    <p><b>TAMILNADU EX-SERVICEMEN’S CORPORATION LIMITED (TEXCO)</b></p>
                                    <p><b>(A Government of Tamil Nadu Undertaking)</b></p>
                                    <p><b>Major Parameswaran Memorial Building,</b></p>
                                    <p><b>No.2, West Mada Street, Srinagar Colony, Saidapet, Chennai-600 015.</b></p>
                                    <p><b>Phone: 044-22352947, 22301792, 22301793, 22350900 Fax: 044-22301791</b></p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <hr />
                    <table width="99%" align="center" border="0" cellpadding="0" cellspacing="0">
                        <tbody>
                            <tr>
                                <td align="left"><b>Invoice Number:</b>{{invoiceprint.invoiceno}}
                                </td>
                                <td align="right"><b>Dated:</b> {{invoiceprint.createddate}}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <strong>Month and Year:</strong>{{invoiceprint.monthandyear}}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    
                    <table width="99%" align="center" cellpadding="0" cellspacing="2" border="0">
                        <tbody>
                            <tr>
                                <td valign="top" width="100%">
                                    <table style="border-collapse: collapse;" border="1" width="99%" cellspacing="0" cellpadding="0" align="center">
                                        <tbody>
                                            <tr height="30px">
                                                <td align="left" width="2%"><strong>&nbsp;S.No</strong></td>
                                                <td align="left" width="5%"><strong>&nbsp;Rank</strong></td>
                                                <td align="left" width="5%"><strong>&nbsp;Rate P.M/Per</strong></td>
                                                <td align="left" width="5%"><strong>&nbsp;Number Of Duties</strong></td>
                                                  <td align="left" width="15%"><strong>&nbsp;Total</strong></td>
                                               
                                            </tr>
                                            <tr ng-repeat="l in invoiceprint.totalduties" >
                                                <td width="5%">&nbsp;{{$index+1}}</td>
                                                <td width="5%">&nbsp;{{l.name}}&nbsp;</td>
                                                <td width="5%">&nbsp;{{l.salary}}</td>
                                                <td width="15%">&nbsp;{{l.noofduties}}</td>
                                               <td width="15%">&nbsp;{{l.salaryamount}}</td>
                                            </tr>
                                           
                                            <tr>
                                            <td></td>
                                             <td></td>
                                             <td></td>	
                                            <td>Sub Total</td>
                                            <td>{{invoiceprint.subtotal}}</td>
                                            </tr>

                                            
                                            <tr>
                                            <td></td>
                                             <td></td>
                                             <td></td>	
                                            <td>Service Charge {{invoiceprint.servicecharge}} %</td>
                                            <td>{{invoiceprint.servicecharges}}</td>
                                            </tr>
                                            <tr>
                                            <td></td>
                                             <td></td>
                                             <td></td>	
                                            <td>Total</td>
                                            <td>{{(invoiceprint.subtotal+invoiceprint.servicecharges)| number:2}}</td>
                                            </tr>
                                            <tr>
                                            <td></td>
                                             <td></td>
                                             <td></td>	
                                            <td>Service Tax {{invoiceprint.tax}} %</td>
                                            <td>{{invoiceprint.servicetax}}</td>
                                            </tr>
                                            <tr>
                                            <td></td>
                                             <td></td>
                                             <td></td>	
                                            <td><strong>Grand Total</strong></td>
                                            <td><strong>{{invoiceprint.total}}</strong></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    
                    <br />

                    
                    <br />
                    

                </td>
            </tr>
        </tbody>
    </table>
</div>
<!--<script>
    $('document').ready(function(){
      setTimeout(function(){ window.print(); }, 500);
    })
</script>-->