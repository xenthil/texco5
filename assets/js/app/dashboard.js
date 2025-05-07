var app = angular.module('appDashboard', ['ngTable', 'ui.bootstrap']);
app.controller('ctrlDashboard', function ($scope, $http, $filter, NgTableParams) {
    $scope.count = 0;
    $scope.itemsPerPage = $scope.totalItems;
    // $scope.viewby = 10;
    // $scope.totalItems = 0;
    // $scope.currentPage = 1;
    // $scope.itemsPerPage = $scope.viewby;
    // $scope.maxSize = 10; //Number of pager buttons to show
    $scope.totalmembers = {};
    $scope.totalclients = {};
    $scope.totalprojects = {};
    $scope.totalinvoices = {};
    $scope.expirylistfuture = [];
    $scope.expirylistfuturethirtydays = [];
    $scope.attendancelist = [];

    $scope.pendinginvoice = 1;
    $scope.totalinvoice = 0;
    $scope.totalinvoiceamounts = 0;
    $scope.pendingamounts = 1;
    $scope.currentproject = 0;
    $scope.totalproject = 1;
    $scope.AgreementList = 0;
    $scope.AgreementLists = 0;
    $scope.agtype = 0;

    $scope.ListTotalProjects = function(type) {
        $scope.totalproject = 1;
        $scope.currentproject = 0;
    }
    $scope.ListCurrentProjects = function(){
        $scope.totalproject = 0;
        $scope.currentproject = 1;
    }
    $scope.ListTotalInvoices = function(type) {
        $scope.pendinginvoice = 0;
        $scope.totalinvoice = 1;
    }
    $scope.ListPendingInvoices = function(){
        $scope.pendinginvoice = 1;
        $scope.totalinvoice = 0;
    }
    $scope.ListPendingAmount = function(type) {
        $scope.pendingamounts = 1;
        $scope.totalinvoiceamounts = 0;
    }
    $scope.ListTotalAmount = function(){
        $scope.pendingamounts = 0;
        $scope.totalinvoiceamounts = 1;
    }

    $http({
        method: 'GET', 
        headers : {
            "Authorization" : atoken
        },
        url: api_url + "/members/totalmembers",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.totalmembers = response.data.numberofmembers;
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });

    $http({
        method: 'GET', 
        headers : {
            "Authorization" : atoken
        },
        url: api_url + "/client/totalclients",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.totalclients = response.data.numberofclients;
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });

    $http({
        method: 'GET', 
        headers : {
            "Authorization" : atoken
        },
        url: api_url + "/client/project/totalprojects",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.totalprojects = response.data.numberofprojects;
            $scope.totalactiveprojects = response.data.totalactiveprojects;
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });

    $http({
        method: 'GET', 
        headers : {
            "Authorization" : atoken
        },
        url: api_url + "/job/ApprovedInvoices",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            $scope.pendinginvoices = response.data[0].totalinv;
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });

    $http({
        method: 'GET', 
        headers : {
            "Authorization" : atoken
        },
        url: api_url + "/job/TotalInvoices",
    }).then(function successCallback(response) {
        console.log('response',response);
        if (response.status = 200) {
            $scope.totalinvoices = response.data[0].totalinv;
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });

    $http({
        method: 'GET', 
        headers : {
            "Authorization" : atoken
        },
        url: api_url + "/job/PendingInvoiceAmount",
    }).then(function successCallback(response) {
        console.log('response',response);
        if (response.status = 200) {
            $scope.pendinginvoiceamount = response.data[0].totalamount;
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });

    $http({
        method: 'GET', 
        headers : {
            "Authorization" : atoken
        },
        url: api_url + "/job/TotalInvoiceAmount",
    }).then(function successCallback(response) {
        console.log('response',response);
        if (response.status = 200) {
            $scope.totalinvoiceamount = response.data[0].totalamount;
            $scope.datalist();
        }
    }, function errorCallback(response) {
        Materialize.toast('Something has gone wrong!', 3000, 'red');
    });

    $.getJSON(api_url + "/job/ClientsCount", function (result) {
        var data = [{"totalclients":result.numberofclients},{"totalclients":result.numberofprojects},{"totalclients":result.totalactiveprojects}];
        console.log('datas',data);
        // var data = result;
        // console.log('data',data);
        var xData = ["totalclients"];

        var margin = {
                top: 20,
                right: 50,
                bottom: 30,
                left: 0
            },
            width = 770 - margin.left - margin.right,
            height = 400 - margin.top - margin.bottom;

        var x = d3.scale.ordinal().rangeRoundBands([0, width], .35);

        var y = d3.scale.linear().rangeRound([height, 0]);

        var color = d3.scale.category20();

        var xAxis = d3.svg.axis().scale(x).orient("bottom");

        var svg = d3.select("#chart")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var dataIntermediate = xData.map(function (c) {
            return data.map(function (d) {
                return {
                    x: d.totalclients,
                    y: d[c]
                };
            });
        });

        var dataStackLayout = d3.layout.stack()(dataIntermediate);

        x.domain(dataStackLayout[0].map(function (d) {
            return d.x;
        }));

        y.domain([0,
                d3.max(dataStackLayout[dataStackLayout.length - 1],
                    function (d) {
                        return d.y0 + d.y;
                    })
            ])
            .nice();

        var layer = svg.selectAll(".stack")
            .data(dataStackLayout)
            .enter().append("g")
            .attr("class", "stack")
            .style("fill", function (d, i) {
                return color(i);
            });

        layer.selectAll("rect")
            .data(function (d) {
                return d;
            })
            .enter().append("rect")
            .attr("x", function (d) {
                return x(d.x);
            })
            .attr("y", function (d) {
                return y(d.y + d.y0);
            })
            .attr("height", function (d) {
                return y(d.y0) - y(d.y + d.y0);
            })
            .attr("width", x.rangeBand());

        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        // Prep the tooltip bits, initial display is hidden
        var tooltip = svg.append("g")
            .attr("class", "tooltip")
            .style("display", "none");

        tooltip.append("rect")
            .attr("width", 30)
            .attr("height", 20)
            .attr("fill", "white")
            .style("opacity", 0.5);

        tooltip.append("text")
            .attr("x", 15)
            .attr("dy", "1.2em")
            .style("text-anchor", "middle")
            .attr("font-size", "12px")
            .attr("font-weight", "bold");

    });

    $.getJSON(api_url + "/job/TotalInvoiceAmountss", function (result) {
            var data = [{"totalamounts":result.totalamount},{"totalamounts":result.pendingamount}];
            // console.log('datas',datas);
            // var data = result;
            console.log('data',data);
            var xData = ["totalamounts"];

            var margin = {
                    top: 20,
                    right: 50,
                    bottom: 30,
                    left: 0
                },
                width = 770 - margin.left - margin.right,
                height = 400 - margin.top - margin.bottom;

            var x = d3.scale.ordinal().rangeRoundBands([0, width], .35);

            var y = d3.scale.linear().rangeRound([height, 0]);

            var color = d3.scale.category20();

            var xAxis = d3.svg.axis().scale(x).orient("bottom");

            var svg = d3.select("#chart1")
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            var dataIntermediate = xData.map(function (c) {
                return data.map(function (d) {
                    console.log('totalamounts',d.totalamounts);
                    return {
                        x: d.totalamounts,
                        y: d[c]
                    };
                });
            });

            var dataStackLayout = d3.layout.stack()(dataIntermediate);

            x.domain(dataStackLayout[0].map(function (d) {
                return d.x;
            }));

            y.domain([0,
                    d3.max(dataStackLayout[dataStackLayout.length - 1],
                        function (d) {
                            return d.y0 + d.y;
                        })
                ])
                .nice();

            var layer = svg.selectAll(".stack")
                .data(dataStackLayout)
                .enter().append("g")
                .attr("class", "stack")
                .style("fill", "#8e5916")

            layer.selectAll("rect")
                .data(function (d) {
                    return d;
                })
                .enter().append("rect")
                .attr("x", function (d) {
                    return x(d.x);
                })
                .attr("y", function (d) {
                    return y(d.y + d.y0);
                })
                .attr("height", function (d) {
                    return y(d.y0) - y(d.y + d.y0);
                })
                .attr("width", x.rangeBand());

            svg.append("g")
                .attr("class", "axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);

            // Prep the tooltip bits, initial display is hidden
            var tooltip = svg.append("g")
                .attr("class", "tooltip")
                .style("display", "none");

            tooltip.append("rect")
                .attr("width", 30)
                .attr("height", 20)
                .attr("fill", "white")
                .style("opacity", 0.5);

            tooltip.append("text")
                .attr("x", 15)
                .attr("dy", "1.2em")
                .style("text-anchor", "middle")
                .attr("font-size", "12px")
                .attr("font-weight", "bold");
    });
    
    $scope.datalist = function () {  
    }


    // $.getJSON(api_url + "/job/client/recruitment", function (data) {
    //     var data1 = new Array();
    //     var data2 = new Array();
    //     var categories = new Array();
    //     for (i = 0; i < data.length; i++) {
    //         categories.push(data[i].organization);
    //         data1.push(data[i].numberofvacancies);
    //         data2.push(data[i].filledvacancies);
    //     }
    //     Highcharts.chart('container1', {

    //         title: {
    //             text: 'Employer Recruitment Status - 28 May 17'
    //         },

    //         subtitle: {
    //             text: 'Top 10 Employers'
    //         },
    //         xAxis: {
    //             categories: categories
    //         },
    //         yAxis: {
    //             title: {
    //                 text: 'Number of Jobs'
    //             }
    //         },
    //         legend: {
    //             layout: 'vertical',
    //             align: 'right',
    //             verticalAlign: 'middle'
    //         },
    //         series: [{
    //             name: 'Open',
    //             data: data1
    //         }, {
    //             name: 'Supplied',
    //             data: data2
    //         }]

    //     });
    // });


   /*  $.getJSON(api_url + "/job/recruitment", function (result) {

        var data = result;

        var xData = ["numberofvacancies", "filledvacancies", "waitingvacancies"];

        var margin = {
                top: 20,
                right: 50,
                bottom: 30,
                left: 0
            },
            width = 770 - margin.left - margin.right,
            height = 400 - margin.top - margin.bottom;

        var x = d3.scale.ordinal().rangeRoundBands([0, width], .35);

        var y = d3.scale.linear().rangeRound([height, 0]);

        var color = d3.scale.category20();

        var xAxis = d3.svg.axis().scale(x).orient("bottom");

        var svg = d3.select("#chart")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


        var dataIntermediate = xData.map(function (c) {
            return data.map(function (d) {
                return {
                    x: d.closedate,
                    y: d[c]
                };
            });
        });

        var dataStackLayout = d3.layout.stack()(dataIntermediate);

        x.domain(dataStackLayout[0].map(function (d) {
            return d.x;
        }));

        y.domain([0,
                d3.max(dataStackLayout[dataStackLayout.length - 1],
                    function (d) {
                        return d.y0 + d.y;
                    })
            ])
            .nice();

        var layer = svg.selectAll(".stack")
            .data(dataStackLayout)
            .enter().append("g")
            .attr("class", "stack")
            .style("fill", function (d, i) {
                return color(i);
            });

        layer.selectAll("rect")
            .data(function (d) {
                return d;
            })
            .enter().append("rect")
            .attr("x", function (d) {
                return x(d.x);
            })
            .attr("y", function (d) {
                return y(d.y + d.y0);
            })
            .attr("height", function (d) {
                return y(d.y0) - y(d.y + d.y0);
            })
            .attr("width", x.rangeBand());

        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        // Prep the tooltip bits, initial display is hidden
        var tooltip = svg.append("g")
            .attr("class", "tooltip")
            .style("display", "none");

        tooltip.append("rect")
            .attr("width", 30)
            .attr("height", 20)
            .attr("fill", "white")
            .style("opacity", 0.5);

        tooltip.append("text")
            .attr("x", 15)
            .attr("dy", "1.2em")
            .style("text-anchor", "middle")
            .attr("font-size", "12px")
            .attr("font-weight", "bold");

    });

    $.getJSON(api_url + "/job/client/recruitment", function (data) {
        var data1 = new Array();
        var data2 = new Array();
        var categories = new Array();
        for (i = 0; i < data.length; i++) {
            categories.push(data[i].organization);
            data1.push(data[i].numberofvacancies);
            data2.push(data[i].filledvacancies);
        }
        Highcharts.chart('container1', {

            title: {
                text: 'Employer Recruitment Status - 28 May 17'
            },

            subtitle: {
                text: 'Top 10 Employers'
            },
            xAxis: {
                categories: categories
            },
            yAxis: {
                title: {
                    text: 'Number of Jobs'
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },
            series: [{
                name: 'Open',
                data: data1
            }, {
                name: 'Supplied',
                data: data2
            }]

        });
    });
 */
    $http({
        method: 'GET', 
        headers : {
            "Authorization" : atoken
        },
        url: api_url + "/agreement/expirylist",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            var data = response.data;
            $scope.tableParams = new NgTableParams({
                page: 1,
                count: response.data.length
            }, {
                data: data
            });
            $scope.totalItems = response.data.length;
        } else {
            Materialize.toast('error', 3000, 'red');
        }
    }, function errorCallback(response) {
        console.log("Something has gone wrong!");
    });

    $http({
        method: 'GET', 
        headers : {
            "Authorization" : atoken
        },
        url: api_url + "/agreement/expirylist/thirtydays",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            var data = response.data;
            $scope.expirylistfuturethirtydays = data;
        } else {
            Materialize.toast('error', 3000, 'red');
        }
    }, function errorCallback(response) {
        console.log("Something has gone wrong!");
    });
    $scope.attendancelength = 0;
    $http({
        method: 'GET', 
        headers : {
            "Authorization" : atoken
        },
        url: api_url + "/agreement/attendance/attendancelist",
    }).then(function successCallback(response) {
        if (response.status = 200) {
            var data = response.data;
            $scope.attendancelength = data.attendance.length;
            $scope.attendances = response.data.attendance;
            $scope.projects = response.data.projects;
            if($scope.attendancelength == 0){
                $scope.attendancelist = response.data.projects;
            }
            if($scope.attendancelength > 0) {
                for(var i=0;i<$scope.projects.length;i++){
                    if ($scope.attendances.indexOf($scope.projects[i].projectid) === -1) {
                        $scope.attendancelist.push($scope.projects[i]);
                    }
                }
            }
        } else {
            Materialize.toast('error', 3000, 'red');
        }
    }, function errorCallback(response) {
        console.log("Something has gone wrong!");
    });

    if(regionid == 0) {
        $http({
            method: 'GET', 
            headers : {
                "Authorization" : atoken
            },
            url: api_url + "/agreement/expirylist/future",
        }).then(function successCallback(response) {
            if (response.status = 200) {
                var data = response.data;
                $scope.expirylistfuture = data;
            } else {
                Materialize.toast('error', 3000, 'red');
            }
        }, function errorCallback(response) {
            console.log("Something has gone wrong!");
        });
    } else { 
        $http({
            method: 'GET', 
            headers : {
                "Authorization" : atoken
            },
            url: api_url + "/agreement/expirylist/future/region?regionid="+regionid,
        }).then(function successCallback(response) {
            if (response.status = 200) {
                var data = response.data;
                $scope.expirylistfuture = data;
            } else {
                Materialize.toast('error', 3000, 'red');
            }
        }, function errorCallback(response) {
            console.log("Something has gone wrong!");
        });
    }

    $scope.agreementrenew = function (agreement) {
        $('#mcaption').text("Renewal Agreement");
        $('#modal3').modal('open');
        $scope.AgreementList = agreement;
        $scope.agtype = 1;
    };

    $scope.agreementrenewal = function (agreement) {
        debugger
        $('#mcaption').text("Renewal Agreement");
        $('#modal3').modal('open');
        $scope.AgreementList = agreement;
        $scope.agtype = 2;
    };
    
    $scope.updateAgreement = function (agreementjobposting) {
        debugger
        if($scope.agtype == 1) {
            var lastdatefor = new Date($scope.AgreementList.todate);
            var year = lastdatefor.getFullYear();
            var month = lastdatefor.getMonth();
            var day = lastdatefor.getDate();
            var lastdate = new Date(year, month, day + 1);
            var fromdate =  $filter('date')(new Date(lastdate),'yyyy-MM-dd');
            var year1 = lastdate.getFullYear();
            var month1 = lastdate.getMonth();
            var day1 = lastdate.getDate();
            var todate = new Date(year1, month1, day1 + Number(agreementjobposting.agreementvalue));
            var todate =  $filter('date')(new Date(todate),'yyyy-MM-dd');
        } else {
            var lastdatefor = new Date();
            // var year = lastdatefor.getFullYear();
            // var month = lastdatefor.getMonth();
            // var day = lastdatefor.getDate();
            // var lastdate = new Date(year, month, day + 1);
            var fromdate =  $filter('date')(new Date(lastdatefor),'yyyy-MM-dd');
            var year1 = lastdatefor.getFullYear();
            var month1 = lastdatefor.getMonth();
            var day1 = lastdatefor.getDate();
            var todate = new Date(year1, month1, day1 + Number(agreementjobposting.agreementvalue));
            var todate =  $filter('date')(new Date(todate),'yyyy-MM-dd');
        }
        var agreementid = $scope.AgreementList.agreementid
        $http({
            method: 'POST',
            url: api_url + "/agreement/renew",
            data: $.param({
                "fromdate": fromdate,
                "todate": todate,
                "agreementid": agreementid
            }), 
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded', 
                "Authorization" : atoken
            },
        }).success(function (response, result) {
            if (response.status = 200) {
                $http({
                    method: 'GET', 
                    headers : {
                        "Authorization" : atoken
                    },
                    url: api_url + "/agreement/expirylist/future",
                }).then(function successCallback(response) {
                    if (response.status = 200) {
                        var data = response.data;
                        $scope.expirylistfuture = data;
                    } else {
                        Materialize.toast('error', 3000, 'red');
                    }
                }, function errorCallback(response) {
                    console.log("Something has gone wrong!");
                });            
                Materialize.toast('Agreement Renewal done!', 3000, 'green');
                $('#modal3').modal('close');
                // setTimeout(function() {
                //     window.location.reload(true);
                // }, 3000);
            }
        }).error(function (error) {
            $('#failure').html(error);
        });
    };
});