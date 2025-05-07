var app = require('./../app');
var mySqlConnection = require('./MySqlHelper');
var multiline = require('multiline');
var report = require('./../Model/report');
var moment = require('moment');
var _ = require('underscore');
var errorDAL = require('./../DAL/errorDAL');

module.exports.getregionreport = function () {
    return new app.promise(function (resolve, reject) {
        var query = multiline.stripIndent(function () {
            /*
                SELECT 

                jp.code,lvk.description,
                SUM(case when jp.code=mh.category then 1 else 0 end) as Count 

                FROM memberhistory  mh

                inner join jobmaster jp on jp.code=mh.category  
                inner join member mr  on mr.texcono=mh.texcono and mh.enddate BETWEEN  CURDATE() - INTERVAL 30 DAY AND CURDATE() 
                INNER JOIN project pr ON pr.projectid=mh.projectid
                INNER JOIN agreement ae ON ae.clientid=pr.clientid
                inner join lookupvalue lvk on lvk.lkvalid=pr.regionid
                WHERE mr.lastaccess BETWEEN  CURDATE() - INTERVAL 30 DAY AND CURDATE() group by pr.regionid,mh.category
            */
        });
        //console.log("query", query);
        mySqlConnection.connection().then(function (con) {
            con.query(query).then(function (rows, fields) {
                resolve({
                    "message": "Success",
                    "data": rows,
                    "status": 200
                })
            }).catch(function (err) {
                errorDAL.errorlog('Error',"clientDAL::getregionreport",err.stack,JSON.stringify(query),"getregionreport");
                reject("Error while get DSRTN Report");
            });
        }).catch(function (err) {
            errorDAL.errorlog('Error',"clientDAL::getregionreport",err.stack,'MYSQL Error',"getregionreport");
            reject(err);
        });
    });
}

module.exports.getWageType = function () {
    return new app.promise(function (resolve, reject) {
        var query = multiline.stripIndent(function () {
            /*
                SELECT code as wagetype,lkvalid FROM lookupvalue where lkdmncode='WGTYPE'
            */
        });
        mySqlConnection.connection().then(function (con) {
            con.query(query).then(function (rows, fields) {
                var rowsReturned = rows.length;
                var result2 = [];
                if (rowsReturned > 0) {
                    for (var i = 0; i < rowsReturned; i++) {
                        var val_wagetype = new report.wagetypeModel(rows[i].wagetype,rows[i].lkvalid);
                        result2.push(val_wagetype);
                    }
                    resolve(result2);
                }
            }).catch(function (err) {
                console.log("err", err);
                reject("Error while get DSRTN base Lable");
            });
        }).catch(function (err) {
            reject(err);
        });
    });
}

module.exports.getCategory = function () {
    return new app.promise(function (resolve, reject) {
        var query = multiline.stripIndent(function () {
            /*
                SELECT code as category,jobmasterid FROM jobmaster WHERE active =1;
                
            */
        });
        //console.log("query", query);
        mySqlConnection.connection().then(function (con) {
            con.query(query).then(function (rows, fields) {
                var rowsReturned = rows.length;
                var result2 = [];
                if (rowsReturned > 0) {
                    for (var i = 0; i < rowsReturned; i++) {
                        var val_category = new report.categoryModel(rows[i].category,rows[i].jobmasterid);
                        result2.push(val_category);
                    }
                    resolve(result2);
                }
                //resolve(rows)
            }).catch(function (err) {
                console.log("err", err);
                reject("Error while get DSRTN Report Lable");
            });
        }).catch(function (err) {
            reject(err);
        });
    });
}


module.exports.getdsrtnreport = function (wagetypelable, categorylable,startdate,enddate,wagetypeid) {
    return new app.promise(function (resolve, reject) { 
        var todates = moment().format('YYYY-MM-DD');
        var query = multiline.stripIndent(function () {
            /*
                SELECT COUNT(mh.memberhistoryid) AS memcount,mh.projectno,mh.category,ag.wagetypeid,lv.code AS wagetype
                FROM memberhistory mh
                INNER JOIN project pr ON pr.projectid = mh.projectid
                INNER JOIN agreementinfo ai ON ai.projectid = pr.projectid
                INNER JOIN agreement ag ON ag.agreementid = ai.agreementid
                INNER JOIN lookupvalue lv ON lv.lkvalid = ag.wagetypeid
                WHERE DATE_FORMAT(mh.enddate,'%Y-%m-%d') BETWEEN (?) AND (?) 
                AND DATE_FORMAT(mh.startdate,'%Y-%m-%d') BETWEEN ('1985-01-01') AND (?)
                AND CASE ? WHEN 0 THEN 1 = 1 ELSE ag.wagetypeid = ? END
                GROUP BY mh.projectno,mh.category
                ORDER BY ag.wagetypeid,mh.category ASC;
            */
        });
        mySqlConnection.connection().then(function (con) { 
            con.query(query,[startdate,todates,startdate,wagetypeid,wagetypeid]).then(function (rows, fields) { 
                var rowsReturned = rows.length; 
                var obj = {};
                var categories = [];
                var avail = 0;
                var total = 0;
                var objs = {};
                obj['ASO'] = 0;
                obj['OTHER'] = 0;
                obj['DVR'] = 0;
                obj['GMAN'] = 0;
                obj['HSG'] = 0;
                obj['JA'] = 0;
                obj['OA'] = 0;
                obj['PO'] = 0;
                obj['SG'] = 0;
                obj['total'] = 0;

                objs['ASO'] = 0;
                objs['OTHER'] = 0;
                objs['DVR'] = 0;
                objs['GMAN'] = 0;
                objs['HSG'] = 0;
                objs['JA'] = 0;
                objs['OA'] = 0;
                objs['PO'] = 0;
                objs['SG'] = 0;
                objs['total'] = 0;
                objs['Total'] = 'Total'; 
                for (var i = 0; i < rowsReturned; i++) { 
                    if(rows[i].category == 'SG' || rows[i].category == 'HSG' || rows[i].category == 'ASO' || rows[i].category == 'PO' || rows[i].category == 'DVR' || rows[i].category == 'JA' || rows[i].category == 'GMAN' || rows[i].category == 'OA') {
                        obj[rows[i].category] += (Number(rows[i].memcount)) ? Number(rows[i].memcount) : 0;
                    } else {
                        obj['OTHER'] += (Number(rows[i].memcount)) ? Number(rows[i].memcount) : 0;
                    }
                    obj['total'] += (Number(rows[i].memcount)) ? Number(rows[i].memcount) : 0;
                    if ((i + 1 == rowsReturned) || (rows[i].wagetype != rows[i + 1].wagetype)) {
                        obj['category'] = rows[i].wagetype;
                        categories.push({'category':obj['category'],'SG':obj['SG'],'HSG':obj['HSG'],'ASO':obj['ASO'],'DVR':obj['DVR'],'PO':obj['PO'],'JA':obj['JA'],'GMAN':obj['GMAN'],'OA':obj['OA'],'OTHER':obj['OTHER'],'TOTAL':obj['total']}); 
                        objs['ASO'] += obj['ASO'];
                        objs['OTHER'] += obj['OTHER'];
                        objs['DVR'] += obj['DVR'];
                        objs['GMAN'] += obj['GMAN'];
                        objs['HSG'] += obj['HSG'];
                        objs['JA'] += obj['JA'];
                        objs['OA'] += obj['OA'];
                        objs['PO'] += obj['PO'];
                        objs['SG'] += obj['SG'];
                        objs['total'] += obj['total'];
                        obj = {};
                        obj['ASO'] = 0;
                        obj['OTHER'] = 0;
                        obj['DVR'] = 0;
                        obj['GMAN'] = 0;
                        obj['HSG'] = 0;
                        obj['JA'] = 0;
                        obj['OA'] = 0;
                        obj['PO'] = 0;
                        obj['SG'] = 0;
                        obj['total'] = 0;
                        total = 0;
                    }
                }
                objs['category'] = 'Total';
                obj['ASO'] = 0;
                obj['OTHER'] = 0;
                obj['DVR'] = 0;
                obj['GMAN'] = 0;
                obj['HSG'] = 0;
                obj['JA'] = 0;
                obj['OA'] = 0;
                obj['PO'] = 0;
                obj['SG'] = 0;
                obj['total'] = 0; 

                // for(var j = 0; j < categories.length;j++) {
                //     obj['ASO'] += (categories[j].ASO) ? categories[j].ASO : 0;
                //     obj['OTHER'] += (categories[j].OTHER) ? categories[j].OTHER : 0;
                //     obj['DVR'] += (categories[j].DVR) ? categories[j].DVR : 0;
                //     obj['GMAN'] += (categories[j].GMAN) ? categories[j].GMAN : 0;
                //     obj['HSG'] += (categories[j].HSG) ? categories[j].HSG : 0;
                //     obj['JA'] += (categories[j].JA) ? categories[j].JA : 0;
                //     obj['OA'] += (categories[j].OA) ? categories[j].OA : 0;
                //     obj['PO'] += (categories[j].PO) ? categories[j].PO : 0;
                //     obj['SG'] += (categories[j].SG) ? categories[j].SG : 0;
                //     obj['total'] += (categories[j].total) ? categories[j].total : 0;
                // }
                // categories.push(obj);
                categories.push({'category':'TOTAL','SG':objs['SG'],'HSG':objs['HSG'],'ASO':objs['ASO'],'DVR':objs['DVR'],'PO':objs['PO'],'JA':objs['JA'],'GMAN':objs['GMAN'],'OA':objs['OA'],'OTHER':objs['OTHER'],'TOTAL':objs['total']}); 
                objs['ASO'] = 0;
                objs['OTHER'] = 0;
                objs['DVR'] = 0;
                objs['GMAN'] = 0;
                objs['HSG'] = 0;
                objs['JA'] = 0;
                objs['OA'] = 0;
                objs['PO'] = 0;
                objs['SG'] = 0;
                objs['total'] = 0;
                obj = {};
                objs = {};
                resolve(categories);
            }).catch(function (err) {
                console.log("err", err);
                reject("Error while get DSRTN Report");
            });
        }).catch(function (err) {
            reject(err);
        });
    });
}



module.exports.getdistrictreport = function (regionlable, categorylable) {
    return new app.promise(function (resolve, reject) {
        var query = multiline.stripIndent(function () {
            /*
               SELECT 
                lvk.description,jp.CODE as category,lvk.code as regcode,
                SUM(case when jp.code=mh.category then 1 else 0 end) as Count
                FROM memberhistory  mh
                inner join jobmaster jp on jp.code=mh.category
                inner join member mr  on mr.texcono=mh.texcono and mh.enddate BETWEEN  CURDATE() - INTERVAL 90 DAY AND CURDATE() 
                INNER JOIN project pr ON pr.projectid=mh.projectid
                INNER JOIN agreement ae ON ae.clientid=pr.clientid
                inner join lookupvalue lvk on lvk.lkvalid=pr.regionid
                WHERE mr.lastaccess BETWEEN CURDATE() - INTERVAL 90 DAY AND CURDATE() group by pr.regionid,mh.category
            */
        });
        mySqlConnection.connection().then(function (con) {
            con.query(query).then(function (rows, fields) {

                var rowsReturned = rows.length;
                var results = [];
                //var resultdgr=['DGR'];
                //var totaldgr=0;
                //var resulttn=['TN'];
                var total = 0;
                //var y=0;
                //var z=0;
                cattypes = [];
                finalaray = [];

                var obj = {};
                var objs = {};
                var cattypes = []
                var total = 0;
                var totalcount = 0;
                objs['category'] = 'Total';
                for (var x = 0; x < regionlable.length; x++) {
                    obj['category'] = regionlable[x].description;
                    console.log(regionlable)
                    for (var y = 0; y < categorylable.length; y++) {
                        var avail = 0;
                        for (var i = 0; i < rows.length; i++) {
                            if (regionlable[x].region == rows[i].regcode) {
                                if (categorylable[y].category == rows[i].category) {
                                    avail += 1;
                                    var key = rows[i].category;
                                    obj[rows[i].category] = rows[i].Count;
                                    if (x == 0) {
                                        objs[rows[i].category] = (rows[i].Count);
                                    }
                                    else {
                                        objs[rows[i].category] += (rows[i].Count);
                                    }
                                    total += rows[i].Count;
                                    totalcount += rows[i].Count;
                                }
                            }
                        }
                        if (avail == 0) {
                            obj[categorylable[y].category] = 0;
                            if (x == 0) {
                                objs[categorylable[y].category] = 0;
                            }

                            objs[categorylable[y].category] += 0;

                        }

                    }
                    obj['total'] = total;
                    objs['total'] = totalcount;
                    total = 0;
                    // var cattype = new report.finalmodal(obj);
                    cattypes.push(obj);
                    cattype = [];
                    obj = {};

                }
                cattypes.push(objs)
                // console.log(cattypes)
                resolve(cattypes);
            }).catch(function (err) {
                console.log("err", err);
                reject("Error while get District Report");
            });
        }).catch(function (err) {
            reject(err);
        });
    });
}


module.exports.getstrengthreport = function (monthandyear,regionid,districtid,clientid) {

   
    var todates = moment().format('YYYY-MM-DD');
    if(regionid==undefined)
    {
        regionid=0;
    }
    if(districtid==undefined)
    {
        districtid=0;
    }
    if(clientid==undefined)
    {
        clientid=0;
    }
    else if (clientid!=undefined){
        regionid=0;
        districtid=0;

    }

    console.log('sdfsdf',clientid);
    return new app.promise(function (resolve, reject) {
        var query = multiline.stripIndent(function () {
            /*
                SELECT aed.agreementdetailid,pr.projectno,pr.name AS projectname,jm.code AS category,aed.numberofvacancies AS agreementstrength
                FROM project pr
                INNER JOIN agreement ag ON pr.clientid = ag.clientid
                INNER JOIN agreementinfo ai ON pr.projectid=ai.projectid 
                INNER JOIN client cl ON cl.clientid=pr.clientid 
                INNER JOIN agreementdetail aed ON aed.agreementinfoid=ai.agreementinfoid
                INNER JOIN jobmaster jm ON jm.jobmasterid = aed.jobmasterid
                WHERE pr.active = 1 
                AND (case ? when 0 then 1 = 1 else  pr.regionid = ? END) 
                AND (case ? when 0 then 1 = 1 else  pr.districtid = ? END) 
                AND (case ? when 0 then 1 = 1 else  cl.clientid = ? END)	
                GROUP BY aed.agreementdetailid ORDER BY pr.projectno;

                SELECT pr.projectno,pr.name AS projectname,count(mh.memberid) AS memcount,jm.code as category  FROM attendance mh 
                INNER JOIN project pr ON pr.projectid = mh.projectid
                INNER JOIN client cl ON cl.clientid=pr.clientid 
               INNER JOIN jobmaster jm ON jm.jobmasterid=mh.jobmasterid
                WHERE mh.active = 1 AND mh.monthandyear=?
                AND (case ? when 0 then 1 = 1 else  pr.regionid = ? END) 
                AND (case ? when 0 then 1 = 1 else  pr.districtid = ? END)
                 AND (case ? when 0 then 1 = 1 else  cl.clientid = ? END)

                GROUP BY mh.projectid,mh.jobmasterid
                ORDER BY pr.projectno,mh.jobmasterid;

            */
        });
        mySqlConnection.connection().then(function (con) {
            con.query(query,[regionid,regionid,districtid,districtid,clientid,clientid,monthandyear,regionid,regionid,districtid,districtid,clientid,clientid]).then(function (rowss, fields) {

                var rows = rowss[0]; 
                var atrows = rowss[1];
                var rowsReturned = atrows.length; 
                var obj = {};
                var objs = {};
                var objss = {};
                var baobj = {}; 
                var categories = []; 
                var agtotal = {};
                var attotal = {};
                var baltotal = {}; 

                agtotal['SG'] = 0;
                agtotal['HSG'] = 0;
                agtotal['ASO'] = 0;
                agtotal['DVR'] = 0;
                agtotal['JA'] = 0;
                agtotal['PO'] = 0;
                agtotal['GMAN'] = 0;
                agtotal['OA'] = 0;
                agtotal['OTHER'] = 0;
                agtotal['TOT'] = 0;  

                attotal['SG'] = 0;
                attotal['HSG'] = 0;
                attotal['ASO'] = 0;
                attotal['DVR'] = 0;
                attotal['JA'] = 0;
                attotal['PO'] = 0;
                attotal['GMAN'] = 0;
                attotal['OA'] = 0;
                attotal['OTHER'] = 0;
                attotal['TOT'] = 0; 

                baltotal['SG'] = 0;
                baltotal['HSG'] = 0;
                baltotal['ASO'] = 0;
                baltotal['DVR'] = 0;
                baltotal['JA'] = 0;
                baltotal['PO'] = 0;
                baltotal['GMAN'] = 0;
                baltotal['OA'] = 0;
                baltotal['OTHER'] = 0;
                baltotal['TOT'] = 0; 

                objs['SG'] = 0;
                objs['HSG'] = 0;
                objs['ASO'] = 0;
                objs['DVR'] = 0;
                objs['JA'] = 0;
                objs['PO'] = 0;
                objs['GMAN'] = 0;
                objs['OA'] = 0;
                objs['OTHER'] = 0;
                objs['TOT'] = 0; 

                objss['SG'] = 0;
                objss['HSG'] = 0;
                objss['ASO'] = 0;
                objss['DVR'] = 0;
                objss['JA'] = 0;
                objss['PO'] = 0;
                objss['GMAN'] = 0;
                objss['OA'] = 0;
                objss['OTHER'] = 0;
                objss['TOT'] = 0; 
                

                baobj['ASO'] = 0;
                baobj['OTHER'] = 0;
                baobj['DVR'] = 0;
                baobj['GMAN'] = 0;
                baobj['HSG'] = 0;
                baobj['JA'] = 0;
                baobj['OA'] = 0;
                baobj['PO'] = 0;
                baobj['SG'] = 0;
                baobj['TOT'] = 0; 

                for(var i = 0; i < rowsReturned; i++) { 
                    obj['projectno'] = atrows[i].projectno;
                    obj['projectname'] = atrows[i].projectname;  
                    var filteredapprsup = _.filter(rows, function(item) {  
                        
                        if(atrows[i].projectno == item.projectno && atrows[i].category == item.category) {  
                            
                            var balancestrength = Number(item.agreementstrength) -  Number(atrows[i].memcount);
                            if(atrows[i].category == 'SG' || atrows[i].category == 'HSG' || atrows[i].category == 'ASO' || atrows[i].category == 'PO' || atrows[i].category == 'DVR' || atrows[i].category == 'JA' || atrows[i].category == 'GMAN' || atrows[i].category == 'OA') {
                                objs[atrows[i].category] += (Number(atrows[i].memcount)) ? Number(atrows[i].memcount) : 0;
                                objss[atrows[i].category] += (Number(item.agreementstrength)) ? Number(item.agreementstrength) : 0;
                                baobj[atrows[i].category] += Number(balancestrength);
                            } else {
                                objs['OTHER'] += (Number(atrows[i].memcount)) ? Number(atrows[i].memcount) : 0;
                                objss['OTHER'] += (Number(item.agreementstrength)) ? Number(item.agreementstrength) : 0;
                                baobj['OTHER'] += Number(balancestrength);
                            }
                            objs['TOT'] += Number(atrows[i].memcount);
                            objss['TOT'] += Number(item.agreementstrength);
                            baobj['TOT'] += Number(balancestrength);
                        } 
                    });
                    if ((i + 1 == rowsReturned) || (atrows[i].projectno != atrows[i + 1].projectno)) {
                        
                        agtotal['ASO'] += (objss['ASO'])?objss['ASO']:0;
                        agtotal['OTHER'] += (objss['OTHER'])?objss['OTHER']:0;
                        agtotal['DVR'] += (objss['DVR'])?objss['DVR']:0;
                        agtotal['GMAN'] += (objss['GMAN'])?objss['GMAN']:0;
                        agtotal['HSG'] += (objss['HSG'])?objss['HSG']:0;
                        agtotal['JA'] += (objss['JA'])?objss['JA']:0;
                        agtotal['OA'] += (objss['OA'])?objss['OA']:0;
                        agtotal['PO'] += (objss['PO'])?objss['PO']:0;
                        agtotal['SG'] += (objss['SG'])?objss['SG']:0;
                        agtotal['TOT'] += (objss['TOT'])?objss['TOT']:0; 

                        attotal['ASO'] += (objs['ASO']) ? objs['ASO'] : 0;
                        attotal['OTHER'] += (objs['OTHER']) ? objs['OTHER'] : 0;
                        attotal['DVR'] += (objs['DVR']) ? objs['DVR'] : 0;
                        attotal['GMAN'] += (objs['GMAN']) ? objs['GMAN'] : 0;
                        attotal['HSG'] += (objs['HSG']) ? objs['HSG'] : 0;
                        attotal['JA'] += (objs['JA']) ? objs['JA'] : 0;
                        attotal['OA'] += (objs['OA']) ? objs['OA'] : 0;
                        attotal['PO'] += (objs['PO']) ? objs['PO'] : 0;
                        attotal['SG'] += (objs['SG']) ? objs['SG'] : 0;
                        attotal['TOT'] += (objs['TOT']) ? objs['TOT'] : 0;

                        baltotal['ASO'] += (baobj['ASO'])?baobj['ASO']:0;
                        baltotal['OTHER'] += (baobj['OTHER'])?baobj['OTHER']:0;
                        baltotal['DVR'] += (baobj['DVR'])?baobj['DVR']:0;
                        baltotal['GMAN'] += (baobj['GMAN'])?baobj['GMAN']:0;
                        baltotal['HSG'] += (baobj['HSG'])?baobj['HSG']:0;
                        baltotal['JA'] += (baobj['JA'])?baobj['JA']:0;
                        baltotal['OA'] += (baobj['OA'])?baobj['OA']:0;
                        baltotal['PO'] += (baobj['PO'])?baobj['PO']:0;
                        baltotal['SG'] += (baobj['SG'])?baobj['SG']:0;
                        baltotal['TOT'] += (baobj['TOT'])?baobj['TOT']:0;  

                        var ob = {'SG':objs['SG'],'HSG':objs['HSG'],'ASO':objs['ASO'],'DVR':objs['DVR'],'PO':objs['PO'],'JA':objs['JA'],'OA':objs['OA'],'GMAN':objs['GMAN'],'OTHER':objs['OTHER'],'TOT':objs['TOT']};
                        var ob1 = {'SG':objss['SG'],'HSG':objss['HSG'],'ASO':objss['ASO'],'DVR':objss['DVR'],'PO':objss['PO'],'JA':objss['JA'],'OA':objss['OA'],'GMAN':objss['GMAN'],'OTHER':objss['OTHER'],'TOT':objss['TOT']};
                        var ob2 = {'SG':baobj['SG'],'HSG':baobj['HSG'],'ASO':baobj['ASO'],'DVR':baobj['DVR'],'PO':baobj['PO'],'JA':baobj['JA'],'OA':baobj['OA'],'GMAN':baobj['GMAN'],'OTHER':baobj['OTHER'],'TOT':baobj['TOT']};

                        obj['atstrength'] =  ob;
                        obj['agstrength'] = ob1;
                        obj['balstrength'] = ob2; 
                        categories.push(obj);
                        obj = {};
                        objs = {};
                        objss = {};
                        baobj = {};
                        objs['SG'] = 0;
                objs['HSG'] = 0;
                objs['ASO'] = 0;
                objs['DVR'] = 0;
                objs['JA'] = 0;
                objs['PO'] = 0;
                objs['GMAN'] = 0;
                objs['OA'] = 0;
                objs['OTHER'] = 0;
                objs['TOT'] = 0; 

                objss['SG'] = 0;
                objss['HSG'] = 0;
                objss['ASO'] = 0;
                objss['DVR'] = 0;
                objss['JA'] = 0;
                objss['PO'] = 0;
                objss['GMAN'] = 0;
                objss['OA'] = 0;
                objss['OTHER'] = 0;
                objss['TOT'] = 0; 
                

                baobj['ASO'] = 0;
                baobj['OTHER'] = 0;
                baobj['DVR'] = 0;
                baobj['GMAN'] = 0;
                baobj['HSG'] = 0;
                baobj['JA'] = 0;
                baobj['OA'] = 0;
                baobj['PO'] = 0;
                baobj['SG'] = 0;
                baobj['TOT'] = 0; 

                    }
                } 
                var totobj = {};
                totobj['projectno'] = 'Total';
                totobj['projectname'] = '';
                totobj['atstrength'] =  attotal;
                totobj['agstrength'] = agtotal;
                totobj['balstrength'] = baltotal;
                attotal = {};
                agtotal = {};
                baltotal = {};
                categories.push(totobj);
                resolve(categories);
            }).catch(function (err) {
                console.log("err", err);
                reject("Error while get District Report");
            });
        }).catch(function (err) {
            reject(err);
        });
    });
}


module.exports.getRegionData = function () {
    return new app.promise(function (resolve, reject) {
        var query = multiline.stripIndent(function () {
            /*
                SELECT code as region,description  FROM lookupvalue where lkdmncode='REGION'
                
            */
        });
        //console.log("query", query);
        mySqlConnection.connection().then(function (con) {
            con.query(query).then(function (rows, fields) {
                var rowsReturned = rows.length;
                var result2 = [];
                if (rowsReturned > 0) {
                    for (var i = 0; i < rowsReturned; i++) {
                        var val_region = new report.regionModel(rows[i].region, rows[i].description);
                        result2.push(val_region);
                    }
                    resolve(result2);
                }
            }).catch(function (err) {
                console.log("err", err);
                reject("Error while get DSRTN base Lable");
            });
        }).catch(function (err) {
            reject(err);
        });
    });
}



module.exports.getProjectData = function () {
    return new app.promise(function (resolve, reject) {
        var query = multiline.stripIndent(function () {
            /*
                SELECT pr.projectno,pr.name,pr.regionid,lv.description AS regionname FROM project pr 
                INNER JOIN lookupvalue lv ON lv.lkvalid = pr.regionid
                WHERE pr.active = 1
                
            */
        });
        console.log("query", query);
        mySqlConnection.connection().then(function (con) {
            con.query(query).then(function (rows, fields) {
                var rowsReturned = rows.length;
               // console.log('rows',rows);
                var result2 = [];
                if (rowsReturned > 0) {
                    for (var i = 0; i < rowsReturned; i++) { 
                        console.log(rows[i].projectno);
                        var val_project = new report.projectModel(rows[i].projectno, rows[i].name, rows[i].regionid, rows[i].regionname);
                        result2.push(val_project);
                    }
                    resolve(result2);
                }
            }).catch(function (err) {
                console.log("err", err);
                reject("Error while get DSRTN base Lable");
            });
        }).catch(function (err) {
            reject(err);
        });
    });
}



module.exports.getcollectionreport = function (monthandyear,districtid,regionid) {
    console.log(monthandyear,regionid,districtid);
    return new app.promise(function (resolve, reject) {
        var query = multiline.stripIndent(function () {
            /*
                SELECT 
                    inv.clientid, 
                    c.organization as clientname,
                    c.districtid,
                    lv.description as district,
                    lv1.description as region,
                    lv2.description as taluk,
                    c.regionid,
                    c.talukid,
                    inv.monthandyear,
                    SUM(CASE WHEN inv.invoicestatus != 4 THEN inv.totalamount END) AS  pendingamount,
                    SUM(CASE WHEN inv.invoicestatus = 4 THEN inv.totalamount END) AS collectionamount
                    FROM invoice inv 
                    INNER JOIN client c ON c.clientid=inv.clientid
                    LEFT JOIN lookupvalue lv ON
								lv.lkvalid = c.districtid
						AND lv.active = 1
                         LEFT JOIN lookupvalue lv1 ON
								lv1.lkvalid = c.regionid
                        LEFT JOIN lookupvalue lv2 ON
								lv2.lkvalid = c.talukid
                                
						AND lv.active = 1
                    WHERE inv.monthandyear =? 
                    
                     AND (case ? when 0 then 1 = 1 else  c.regionid = ? END) 
                    AND (case ? when 0 then 1 = 1 else  c.districtid = ? END)
              
                    GROUP BY inv.clientid 
                
            */
        });
       // console.log("query", query);
        mySqlConnection.connection().then(function (con) {
            con.query(query,[monthandyear,regionid,regionid,districtid,districtid]).then(function (rows, fields) {
                var rowsReturned = rows.length;
              console.log('rows',rows);
                var result2 = [];
                var totalpendings=0;
                var totalcollected=0;
                if (rowsReturned > 0) {
                    for (var i = 0; i < rowsReturned; i++) { 
                   //     console.log(rows[i].projectno);
                   var val_project = new report.collectionModel(rows[i].clientid, rows[i].clientname, rows[i].region, rows[i].district,rows[i].taluk,rows[i].monthandyear,(rows[i].collectionamount == null ? 0 :rows[i].collectionamount ),rows[i].pendingamount==null ? 0 : rows[i].pendingamount);
                        totalpendings+=rows[i].pendingamount;
                        totalcollected+=rows[i].collectionamount;

                    result2.push(val_project);
                    }
                    var vaalpr1=new report.collectionModel('','Total','','','','',totalcollected,totalpendings)

                    result2.push(vaalpr1);
                   resolve(result2);
                }
                //resolve(result2);
            }).catch(function (err) {
                console.log("err", err);
                reject("Error while get DSRTN base Lable");
            });
        }).catch(function (err) {
            reject(err);
        });
    });
}
////18-10-2019
module.exports.getcategorywisecount = function (startdate,enddate) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) { 
           // var todate = moment(enddate, "YYYY-MM-DD").add(1, 'days');
	        var todates = moment().format('YYYY-MM-DD');
            con.query("CALL getsubcategorywisecount(?,?);",[startdate,todates]).then(function (rows, fields) {
                var rowsReturned = rows[0].length;
                var result = [];
                var totalcontractcount = 0;
                var totalprojectcount = 0;
                var totalmembercount = 0;
                // var categorycount = new report.getcatewisecount('DESCRIPTION', 'NO OF CONTRACTS', 'NUMBER OF PROJECTS/ LOCATIONS', 'NO OF PERSONNEL EMPLOYEED');
                // result.push(categorycount);
                if (rowsReturned > 0) {
                    for (var i = 0; i < rowsReturned; i++) {

                        totalcontractcount = totalcontractcount + rows[0][i].contractcount;
                        totalprojectcount = totalprojectcount + rows[0][i].projectcount;
                        totalmembercount = totalmembercount + rows[0][i].membercount;
                        var categorycount = new report.getcatewisecount(rows[0][i].description, rows[0][i].contractcount, rows[0][i].projectcount, rows[0][i].membercount);
                        result.push(categorycount);
                    }
                }
                var categorycount = new report.getcatewisecount('Total', totalcontractcount, totalprojectcount, totalmembercount);
                result.push(categorycount);
                resolve(result);

            }).catch(function (err) {
                console.log('err',err);
                reject("Error while get categorywise count");
            });
        }).catch(function (err) {
            reject(err);
        });
    });
}


module.exports.getdgrcount = function (startdate,enddate) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {  
            var todates = moment().format('YYYY-MM-DD');
            con.query("CALL getdgrcount(?,?);",[startdate,todates]).then(function (rows, fields) {
                var rowsReturned = rows[0].length;
                console.log(rowsReturned);
                var result = [];
                var totalsgcount = 0;
                var totalhsgcount = 0;
                var totalasocount = 0;
                var totalpocount = 0;
                var totaldvrcount = 0;
                var totaljacount = 0;
                var totalgmancount = 0;
                var totaloacount = 0;
                var totalothercount = 0;
                var totaltotalcount = 0;
                var obj = {};  
                var objs = {};
                obj['subcategoryname'] = '';
                obj['SG'] = 0;
                obj['HSG'] = 0;
                obj['DVR'] = 0;
                obj['ASO'] = 0;
                obj['PO'] = 0;
                obj['GMAN'] = 0;
                obj['JA'] = 0;
                obj['OA'] = 0;
                obj['OTHER'] = 0;
                obj['TOTAL'] = 0; 

                objs['SG'] = 0;
                objs['HSG'] = 0;
                objs['DVR'] = 0;
                objs['ASO'] = 0;
                objs['PO'] = 0;
                objs['GMAN'] = 0;
                objs['JA'] = 0;
                objs['OA'] = 0;
                objs['OTHER'] = 0;
                objs['TOTAL'] = 0;
                if (rowsReturned > 0) {
                    var j = 1;
                    for (var i = 0; i < rowsReturned; i++) { 
                        if (i == 0) { 
                            var dgrdetails = new report.getdgrdetails('', rows[0][i].categoryname, '', '', '', '', '', '', '', '', '', '');
                            result.push(dgrdetails); 
                            obj['subcategoryname'] = rows[0][i].subcategoryname; 
                            if(rows[0][i].category == 'SG' || rows[0][i].category == 'HSG' || rows[0][i].category == 'ASO' || rows[0][i].category == 'PO' || rows[0][i].category == 'DVR' || rows[0][i].category == 'JA' || rows[0][i].category == 'GMAN' || rows[0][i].category == 'OA') {
                                console.log(obj[rows[0][i].category],rows[0][i].memcount);
                                obj[rows[0][i].category] += rows[0][i].memcount;
                            } else {
                                if(obj['OTHER']) 
                                    obj['OTHER'] +=  rows[0][i].memcount;
                                else 
                                    obj['OTHER'] += rows[0][i].memcount;
                            } 
                            obj['TOTAL'] += rows[0][i].memcount;       
                        } else if (i > 0) {  
                            obj['subcategoryname'] = rows[0][i].subcategoryname; 
                            if(rows[0][i].category == 'SG' || rows[0][i].category == 'HSG' || rows[0][i].category == 'ASO' || rows[0][i].category == 'PO' || rows[0][i].category == 'DVR' || rows[0][i].category == 'JA' || rows[0][i].category == 'GMAN' || rows[0][i].category == 'OA') {
                                obj[rows[0][i].category] += rows[0][i].memcount;
                            } else {
                                if(obj['OTHER']) 
                                    obj['OTHER'] +=  rows[0][i].memcount;
                                else 
                                    obj['OTHER']+= rows[0][i].memcount;
                            } 
                            obj['TOTAL'] += rows[0][i].memcount;

                            if ((i + 1 == rowsReturned) || (rows[0][i].subcategoryname != rows[0][i + 1].subcategoryname)) {
                                var dgrdetails = new report.getdgrdetails(j, rows[0][i].subcategoryname, obj['SG'], obj['HSG'], obj['ASO'], obj['PO'], obj['DVR'], obj['JA'], obj['GMAN'], obj['OA'], obj['OTHER'], obj['TOTAL']);
                                result.push(dgrdetails);
                               // console.log(dgrdetails);
                                j++;  
                                totalsgcount = totalsgcount + obj['SG'];
                                totalhsgcount = totalhsgcount + obj['HSG'];
                                totalasocount = totalasocount + obj['ASO'];
                                totalpocount = totalpocount + obj['PO'];
                                totaldvrcount = totaldvrcount + obj['DVR'];
                                totaljacount = totaljacount + obj['JA'];
                                totalgmancount = totalgmancount + obj['GMAN'];
                                totaloacount = totaloacount + obj['OA'];
                                totalothercount = totalothercount + obj['OTHER'];
                                totaltotalcount = totaltotalcount + obj['TOTAL'];
                                objs['SG'] += obj['SG'];
                                objs['HSG'] += obj['HSG'];
                                objs['DVR'] += obj['DVR'];
                                objs['ASO'] += obj['ASO'];
                                objs['PO'] += obj['PO'];
                                objs['GMAN'] += obj['GMAN'];
                                objs['JA'] += obj['JA'];
                                objs['OA'] += obj['OA'];
                                objs['OTHER'] += obj['OTHER'];
                                objs['TOTAL'] += obj['TOTAL'];
                                obj = {}; 
                                obj['subcategoryname'] = '';
                                obj['SG'] = 0;
                                obj['HSG'] = 0;
                                obj['DVR'] = 0;
                                obj['ASO'] = 0;
                                obj['PO'] = 0;
                                obj['GMAN'] = 0;
                                obj['JA'] = 0;
                                obj['OA'] = 0;
                                obj['OTHER'] = 0;
                                obj['TOTAL'] = 0;
                            } 
                            if ( (rows[0][i].categoryname != rows[0][i - 1].categoryname)) { 
                                var dgrdetails = new report.getdgrdetails('','SUB TOTAL', objs['SG'], objs['HSG'], objs['ASO'], objs['PO'], objs['DVR'], objs['JA'], objs['GMAN'], objs['OA'], objs['OTHER'], objs['TOTAL']);
                                result.push(dgrdetails);
                                var dgrdetails = new report.getdgrdetails('', rows[0][i].categoryname, '', '', '', '', '', '', '', '', '', '');
                                result.push(dgrdetails);
                                objs = {};
                                objs['SG'] = 0;
                                objs['HSG'] = 0;
                                objs['DVR'] = 0;
                                objs['ASO'] = 0;
                                objs['PO'] = 0;
                                objs['GMAN'] = 0;
                                objs['JA'] = 0;
                                objs['OA'] = 0;
                                objs['OTHER'] = 0;
                                objs['TOTAL'] = 0;
                            } 

                            if((i + 1) == rowsReturned) { 
                                var dgrdetails = new report.getdgrdetails('','SUB TOTAL', objs['SG'], objs['HSG'], objs['ASO'], objs['PO'], objs['DVR'], objs['JA'], objs['GMAN'], objs['OA'], objs['OTHER'], objs['TOTAL']);
                                result.push(dgrdetails);
                                objs = {};
                                objs['SG'] = 0;
                                objs['HSG'] = 0;
                                objs['DVR'] = 0;
                                objs['ASO'] = 0;
                                objs['PO'] = 0;
                                objs['GMAN'] = 0;
                                objs['JA'] = 0;
                                objs['OA'] = 0;
                                objs['OTHER'] = 0;
                                objs['TOTAL'] = 0;
                            }
                        }
                    }
                }
                var dgrdetails = new report.getdgrdetails('', 'Total', totalsgcount, totalhsgcount, totalasocount, totalpocount, totaldvrcount, totaljacount, totalgmancount, totaloacount, totalothercount, totaltotalcount);
                result.push(dgrdetails);
                resolve(result);
            }).catch(function (err) {
                console.log('error',err);
                reject("Error while get dgrdetails count");
            });
        }).catch(function (err) {
            reject(err);
        });
    });
}


module.exports.gettncount = function (startdate,enddate) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            //var todate = moment(enddate, "YYYY-MM-DD").add(1, 'days');
            var todates = moment().format('YYYY-MM-DD');
            con.query("CALL gettndetails(?,?);",[startdate,todates]).then(function (rows, fields) {
                var rowsReturned = rows[0].length;
                var result = [];
                var totalsgcount = 0;
                var totalhsgcount = 0;
                var totalasocount = 0;
                var totalpocount = 0;
                var totaldvrcount = 0;
                var totaljacount = 0;
                var totalgmancount = 0;
                var totaloacount = 0;
                var totalothercount = 0;
                var totaltotalcount = 0;
                var obj = {};  
                var objs = {};
                obj['subcategoryname'] = '';
                obj['SG'] = 0;
                obj['HSG'] = 0;
                obj['DVR'] = 0;
                obj['ASO'] = 0;
                obj['PO'] = 0;
                obj['GMAN'] = 0;
                obj['JA'] = 0;
                obj['OA'] = 0;
                obj['OTHER'] = 0;
                obj['TOTAL'] = 0; 

                objs['SG'] = 0;
                objs['HSG'] = 0;
                objs['DVR'] = 0;
                objs['ASO'] = 0;
                objs['PO'] = 0;
                objs['GMAN'] = 0;
                objs['JA'] = 0;
                objs['OA'] = 0;
                objs['OTHER'] = 0;
                objs['TOTAL'] = 0;
                if (rowsReturned > 0) {
                    var j = 1;
                    for (var i = 0; i < rowsReturned; i++) { 
                        if (i == 0) { 
                            var dgrdetails = new report.getdgrdetails('', rows[0][i].categoryname, '', '', '', '', '', '', '', '', '', '');
                            result.push(dgrdetails); 
                            obj['subcategoryname'] = rows[0][i].subcategoryname; 
                            if(rows[0][i].category == 'SG' || rows[0][i].category == 'HSG' || rows[0][i].category == 'ASO' || rows[0][i].category == 'PO' || rows[0][i].category == 'DVR' || rows[0][i].category == 'JA' || rows[0][i].category == 'GMAN' || rows[0][i].category == 'OA') {
                                obj[rows[0][i].category] += rows[0][i].memcount;
                            } else {
                                if(obj['OTHER']) 
                                    obj['OTHER'] +=  rows[0][i].memcount;
                                else 
                                    obj['OTHER'] += rows[0][i].memcount;
                            } 
                            obj['TOTAL'] += rows[0][i].memcount;       
                        } else if (i > 0) {  
                            obj['subcategoryname'] = rows[0][i].subcategoryname; 
                            if(rows[0][i].category == 'SG' || rows[0][i].category == 'HSG' || rows[0][i].category == 'ASO' || rows[0][i].category == 'PO' || rows[0][i].category == 'DVR' || rows[0][i].category == 'JA' || rows[0][i].category == 'GMAN' || rows[0][i].category == 'OA') {
                                obj[rows[0][i].category] += rows[0][i].memcount;
                            } else {
                                if(obj['OTHER']) 
                                    obj['OTHER'] +=  rows[0][i].memcount;
                                else 
                                    obj['OTHER']+= rows[0][i].memcount;
                            } 
                            obj['TOTAL'] += rows[0][i].memcount;
                            if ((i + 1 == rowsReturned) || (rows[0][i].subcategoryname != rows[0][i + 1].subcategoryname)) {
                                var dgrdetails = new report.getdgrdetails(j, rows[0][i].subcategoryname, obj['SG'], obj['HSG'], obj['ASO'], obj['PO'], obj['DVR'], obj['JA'], obj['GMAN'], obj['OA'], obj['OTHER'], obj['TOTAL']);
                                result.push(dgrdetails);
                                j++;  
                                totalsgcount = totalsgcount + obj['SG'];
                                totalhsgcount = totalhsgcount + obj['HSG'];
                                totalasocount = totalasocount + obj['ASO'];
                                totalpocount = totalpocount + obj['PO'];
                                totaldvrcount = totaldvrcount + obj['DVR'];
                                totaljacount = totaljacount + obj['JA'];
                                totalgmancount = totalgmancount + obj['GMAN'];
                                totaloacount = totaloacount + obj['OA'];
                                totalothercount = totalothercount + obj['OTHER'];
                                totaltotalcount = totaltotalcount + obj['TOTAL'];
                                objs['SG'] += obj['SG'];
                                objs['HSG'] += obj['HSG'];
                                objs['DVR'] += obj['DVR'];
                                objs['ASO'] += obj['ASO'];
                                objs['PO'] += obj['PO'];
                                objs['GMAN'] += obj['GMAN'];
                                objs['JA'] += obj['JA'];
                                objs['OA'] += obj['OA'];
                                objs['OTHER'] += obj['OTHER'];
                                objs['TOTAL'] += obj['TOTAL'];
                                obj = {}; 
                                obj['subcategoryname'] = '';
                                obj['SG'] = 0;
                                obj['HSG'] = 0;
                                obj['DVR'] = 0;
                                obj['ASO'] = 0;
                                obj['PO'] = 0;
                                obj['GMAN'] = 0;
                                obj['JA'] = 0;
                                obj['OA'] = 0;
                                obj['OTHER'] = 0;
                                obj['TOTAL'] = 0;
                            } 
                            if ( (rows[0][i].categoryname != rows[0][i - 1].categoryname)) { 
                                var dgrdetails = new report.getdgrdetails('','SUB TOTAL', objs['SG'], objs['HSG'], objs['ASO'], objs['PO'], objs['DVR'], objs['JA'], objs['GMAN'], objs['OA'], objs['OTHER'], objs['TOTAL']);
                                result.push(dgrdetails);
                                var dgrdetails = new report.getdgrdetails('', rows[0][i].categoryname, '', '', '', '', '', '', '', '', '', '');
                                result.push(dgrdetails);
                                objs = {};
                                objs['SG'] = 0;
                                objs['HSG'] = 0;
                                objs['DVR'] = 0;
                                objs['ASO'] = 0;
                                objs['PO'] = 0;
                                objs['GMAN'] = 0;
                                objs['JA'] = 0;
                                objs['OA'] = 0;
                                objs['OTHER'] = 0;
                                objs['TOTAL'] = 0;
                            } 

                            
                            // if((i + 1) == rowsReturned) { 
                            //     var dgrdetails = new report.getdgrdetails('','SUB TOTAL', objs['SG'], objs['HSG'], objs['ASO'], objs['PO'], objs['DVR'], objs['JA'], objs['GMAN'], objs['OA'], objs['OTHER'], objs['TOTAL']);
                            //     result.push(dgrdetails);
                            //     objs = {};
                            //     objs['SG'] = 0;
                            //     objs['HSG'] = 0;
                            //     objs['DVR'] = 0;
                            //     objs['ASO'] = 0;
                            //     objs['PO'] = 0;
                            //     objs['GMAN'] = 0;
                            //     objs['JA'] = 0;
                            //     objs['OA'] = 0;
                            //     objs['OTHER'] = 0;
                            //     objs['TOTAL'] = 0;
                            // }
                        }

                    }
                }
                var dgrdetails = new report.getdgrdetails('', 'Total', totalsgcount, totalhsgcount, totalasocount, totalpocount, totaldvrcount, totaljacount, totalgmancount, totaloacount, totalothercount, totaltotalcount);
                result.push(dgrdetails);
                resolve(result);
            }).catch(function (err) {
                console.log('error',err);
                reject("Error while get tndetails count");
            });

        }).catch(function (err) {
            reject(err);
        });
    });
}

module.exports.getmembercount = function (regionid,districtid) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            con.query("CALL getmemberdetails(?,?);",[regionid,districtid]).then(function (rows, fields) {
                var rowsReturned = rows[0].length;
                // var result = [];
                // var memberdetails = new report.getmemberdet('CLIENTID', 'NAME', '', 'CAT', 'PROJECT NO', 'PROJECT NAME', 'AM', 'STRENGTH');
                // result.push(memberdetails);
                // if (rowsReturned > 0) {
                //     for (var i = 0; i < rowsReturned; i++) {
                //         //var memberdetails = new report.getmemberdet(rows[0][i].clientid, rows[0][i].firstname, rows[0][i].lastname, rows[0][i].category, rows[0][i].projectno, rows[0][i].name, rows[0][i].description, rows[0][i].count);
                //         result.push(memberdetails);
                //     }
                // }
                resolve(rows[0]);
            }).catch(function (err) {
                reject("Error while get member count");
            });
        }).catch(function (err) {
            reject(err);
        });
    });
}

module.exports.getdistrictcount = function (startdate,enddate) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            var todates = moment().format('YYYY-MM-DD');
            con.query("CALL getdistrictcount(?,?);",[startdate,todates]).then(function (rowss, fields) {
                var rows = rowss[0];
                var rowsReturned = rows.length;
                var obj = {};
                var regval = 1;
                var total = 0;
                categories = [];  

                var objs = {};  
                objs['DISTRICT'] = 'Total';
                objs['SG'] = 0;
                objs['HSG'] = 0;
                objs['DVR'] = 0;
                objs['ASO'] = 0;
                objs['PO'] = 0;
                objs['GMAN'] = 0;
                objs['JA'] = 0;
                objs['OA'] = 0;
                objs['OTHER'] = 0;
                objs['TOTAL'] = 0;

                var objss = {};
                objss['DISTRICT'] = '';
                objss['SG'] = '';
                objss['HSG'] = '';
                objss['ASO'] = '';
                objss['DVR'] = '';
                objss['JA'] = '';
                objss['PO'] = '';
                objss['GMAN'] = '';
                objss['OA'] = '';
                objss['OTHER'] = '';
                objss['TOTAL'] = '';  

                categories.push({'DISTRICT':objss['DISTRICT'],'SG':objss['SG'],'HSG':objss['HSG'],'ASO':objss['ASO'],'DVR':objss['DVR'],'JA':objss['JA'],'PO':objss['PO'],'GMAN':objss['GMAN'],'OA':objss['OA'],'OTHER':objss['OTHER'],'TOTAL':objss['TOTAL']}); 
                obj['DISTRICT'] = '';
                obj['SG'] = '';
                obj['HSG'] = '';
                obj['DVR'] = '';
                obj['ASO'] = '';
                obj['PO'] = '';
                obj['GMAN'] = '';
                obj['JA'] = '';
                obj['OA'] = '';
                obj['OTHER'] = '';
                obj['TOTAL'] = ''; 
                for(var i = 0; i < rowsReturned; i++) {
                    if(regval == 1) {
                        obj['DISTRICT'] = 'AM - '+rows[i].region; 
                        regval = 0;
                        obj['SG'] = '';
                        obj['HSG'] = '';
                        obj['DVR'] = '';
                        obj['ASO'] = '';
                        obj['PO'] = '';
                        obj['GMAN'] = '';
                        obj['JA'] = '';
                        obj['OA'] = '';
                        obj['OTHER'] = '';
                        obj['TOTAL'] = '';
                        categories.push({'DISTRICT':obj['DISTRICT'],'SG':obj['SG'],'HSG':obj['HSG'],'ASO':obj['ASO'],'DVR':obj['DVR'],'JA':obj['JA'],'PO':obj['PO'],'GMAN':obj['GMAN'],'OA':obj['OA'],'OTHER':obj['OTHER']});
                        obj = {}; 
                        obj['DISTRICT'] = '';
                        obj['SG'] = 0;
                        obj['HSG'] = 0;
                        obj['DVR'] = 0;
                        obj['ASO'] = 0;
                        obj['PO'] = 0;
                        obj['GMAN'] = 0;
                        obj['JA'] = 0;
                        obj['OA'] = 0;
                        obj['OTHER'] = 0;
                        obj['TOTAL'] = 0;
                    } 
                    obj['DISTRICT'] = '         D - '+rows[i].district;  
                    if(rows[i].category == 'SG' || rows[i].category == 'HSG' || rows[i].category == 'ASO' || rows[i].category == 'PO' || rows[i].category == 'DVR' || rows[i].category == 'JA' || rows[i].category == 'GMAN' || rows[i].category == 'OA') {
                        obj[rows[i].category] += rows[i].memcount;
                    } else {
                        if(obj['OTHER']) 
                            obj['OTHER'] +=  rows[i].memcount;
                        else 
                            obj['OTHER'] = rows[i].memcount;
                    }
                    obj['TOTAL'] += rows[i].memcount;
                    if ((i + 1 == rowsReturned) || (rows[i].district != rows[i + 1].district)) { 
                        objs['ASO'] += obj['ASO'] ? obj['ASO'] : 0;
                        objs['OTHER'] += obj['OTHER'] ? obj['OTHER'] : 0;
                        objs['DVR'] += obj['DVR'] ? obj['DVR'] : 0;
                        objs['GMAN'] += obj['GMAN'] ? obj['GMAN'] : 0;
                        objs['HSG'] += obj['HSG'] ? obj['HSG'] : 0;
                        objs['JA'] += obj['JA'] ? obj['JA'] : 0;
                        objs['OA'] += obj['OA'] ? obj['OA'] : 0;
                        objs['PO'] += obj['PO'] ? obj['PO'] : 0;
                        objs['SG'] += obj['SG'] ? obj['SG'] : 0;
                        objs['TOTAL'] += obj['TOTAL'] ? obj['TOTAL'] : 0;
                        categories.push({'DISTRICT':obj['DISTRICT'],'SG':obj['SG'],'HSG':obj['HSG'],'ASO':obj['ASO'],'DVR':obj['DVR'],'JA':obj['JA'],'PO':obj['PO'],'GMAN':obj['GMAN'],'OA':obj['OA'],'OTHER':obj['OTHER'],'TOTAL':obj['TOTAL']});
                        obj = {};
                        obj['DISTRICT'] = '';
                        obj['SG'] = 0;
                        obj['HSG'] = 0;
                        obj['DVR'] = 0;
                        obj['ASO'] = 0;
                        obj['PO'] = 0;
                        obj['GMAN'] = 0;
                        obj['JA'] = 0;
                        obj['OA'] = 0;
                        obj['OTHER'] = 0;
                        obj['TOTAL'] = 0;
                        total = 0;
                        if ((i + 1 == rowsReturned) || (rows[i].region != rows[i + 1].region)) {  
                            regval = 1;
                        } 
                    }
                    else {
                        if ((i + 1 == rowsReturned) || (rows[i].region != rows[i + 1].region)) {  
                            regval = 1;
                            objs['ASO'] += obj['ASO'] ? obj['ASO'] : 0;
                            objs['OTHER'] += obj['OTHER'] ? obj['OTHER'] : 0;
                            objs['DVR'] += obj['DVR'] ? obj['DVR'] : 0;
                            objs['GMAN'] += obj['GMAN'] ? obj['GMAN'] : 0;
                            objs['HSG'] += obj['HSG'] ? obj['HSG'] : 0;
                            objs['JA'] += obj['JA'] ? obj['JA'] : 0;
                            objs['OA'] += obj['OA'] ? obj['OA'] : 0;
                            objs['PO'] += obj['PO'] ? obj['PO'] : 0;
                            objs['SG'] += obj['SG'] ? obj['SG'] : 0;
                            objs['TOTAL'] += obj['TOTAL'] ? obj['TOTAL'] : 0;
                            categories.push({'DISTRICT':obj['DISTRICT'],'SG':obj['SG'],'HSG':obj['HSG'],'ASO':obj['ASO'],'DVR':obj['DVR'],'JA':obj['JA'],'PO':obj['PO'],'GMAN':obj['GMAN'],'OA':obj['OA'],'OTHER':obj['OTHER'],'TOTAL':obj['TOTAL']});
                            obj = {};
                            obj['DISTRICT'] = '';
                            obj['SG'] = 0;
                            obj['HSG'] = 0;
                            obj['DVR'] = 0;
                            obj['ASO'] = 0;
                            obj['PO'] = 0;
                            obj['GMAN'] = 0;
                            obj['JA'] = 0;
                            obj['OA'] = 0;
                            obj['OTHER'] = 0;
                            obj['TOTAL'] = 0;
                        } 
                    }                       
                } 
                categories.push({'DISTRICT':'Total','SG':objs['SG'],'HSG':objs['HSG'],'ASO':objs['ASO'],'DVR':objs['DVR'],'JA':objs['JA'],'PO':objs['PO'],'GMAN':objs['GMAN'],'OA':objs['OA'],'OTHER':objs['OTHER'],'TOTAL':objs['TOTAL']});
                objs = {};
                resolve(categories);
            }).catch(function (err) { 
                reject("Error while get districtcount count");
            });
        }).catch(function (err) {
            reject(err);
        });
    });
} 

module.exports.getdistrictwisecount = function () {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            con.query("CALL getdistrictwisecount();").then(function (rowss, fields) {
                var rows = rowss[0];
                var rowsReturned = rows.length;
                var obj = {};
                var regval = 1;
                var total = 0;
                categories = [];  

                var objs = {};  
                objs['DISTRICT'] = 'Total';
                objs['SG'] = 0;
                objs['HSG'] = 0;
                objs['DVR'] = 0;
                objs['ASO'] = 0;
                objs['PO'] = 0;
                objs['GMAN'] = 0;
                objs['JA'] = 0;
                objs['OA'] = 0;
                objs['OTHER'] = 0;
                objs['TOTAL'] = 0;

                var objss = {};
                objss['DISTRICT'] = '';
                objss['SG'] = '';
                objss['HSG'] = '';
                objss['ASO'] = '';
                objss['DVR'] = '';
                objss['JA'] = '';
                objss['PO'] = '';
                objss['GMAN'] = '';
                objss['OA'] = '';
                objss['OTHER'] = '';
                objss['TOTAL'] = ''; 
                categories.push({'DISTRICT':objss['DISTRICT'],'SG':objss['SG'],'HSG':objss['HSG'],'ASO':objss['ASO'],'DVR':objss['DVR'],'JA':objss['JA'],'PO':objss['PO'],'GMAN':objss['GMAN'],'OA':objss['OA'],'OTHER':objss['OTHER'],'TOTAL':objss['TOTAL']}); 

                obj['DISTRICT'] = '';
                obj['SG'] = '';
                obj['HSG'] = '';
                obj['DVR'] = '';
                obj['ASO'] = '';
                obj['PO'] = '';
                obj['GMAN'] = '';
                obj['JA'] = '';
                obj['OA'] = '';
                obj['OTHER'] = '';
                obj['TOTAL'] = ''; 

                for(var i = 0; i < rowsReturned; i++) {
                    if(regval == 1) {
                        obj['DISTRICT'] = 'AM - '+rows[i].region; 
                        regval = 0;
                        obj['SG'] = '';
                        obj['HSG'] = '';
                        obj['DVR'] = '';
                        obj['ASO'] = '';
                        obj['PO'] = '';
                        obj['GMAN'] = '';
                        obj['JA'] = '';
                        obj['OA'] = '';
                        obj['OTHER'] = '';
                        obj['TOTAL'] = '';
                        categories.push({'DISTRICT':obj['DISTRICT'],'SG':obj['SG'],'HSG':obj['HSG'],'ASO':obj['ASO'],'DVR':obj['DVR'],'JA':obj['JA'],'PO':obj['PO'],'GMAN':obj['GMAN'],'OA':obj['OA'],'OTHER':obj['OTHER']});
                        obj = {}; 
                        obj['DISTRICT'] = '';
                        obj['SG'] = 0;
                        obj['HSG'] = 0;
                        obj['DVR'] = 0;
                        obj['ASO'] = 0;
                        obj['PO'] = 0;
                        obj['GMAN'] = 0;
                        obj['JA'] = 0;
                        obj['OA'] = 0;
                        obj['OTHER'] = 0;
                        obj['TOTAL'] = 0;
                    } 
                    obj['DISTRICT'] = '         D - '+rows[i].district;  
                    if(rows[i].category == 'SG' || rows[i].category == 'HSG' || rows[i].category == 'ASO' || rows[i].category == 'PO' || rows[i].category == 'DVR' || rows[i].category == 'JA' || rows[i].category == 'GMAN' || rows[i].category == 'OA') {
                        obj[rows[i].category] += rows[i].numberofvacancies;
                    } else {
                        if(obj['OTHER']) 
                            obj['OTHER'] +=  rows[i].numberofvacancies;
                        else 
                            obj['OTHER'] = rows[i].numberofvacancies;
                    }
                    obj['TOTAL'] += rows[i].numberofvacancies;
                    if ((i + 1 == rowsReturned) || (rows[i].district != rows[i + 1].district)) { 
                        objs['ASO'] += obj['ASO'] ? obj['ASO'] : 0;
                        objs['OTHER'] += obj['OTHER'] ? obj['OTHER'] : 0;
                        objs['DVR'] += obj['DVR'] ? obj['DVR'] : 0;
                        objs['GMAN'] += obj['GMAN'] ? obj['GMAN'] : 0;
                        objs['HSG'] += obj['HSG'] ? obj['HSG'] : 0;
                        objs['JA'] += obj['JA'] ? obj['JA'] : 0;
                        objs['OA'] += obj['OA'] ? obj['OA'] : 0;
                        objs['PO'] += obj['PO'] ? obj['PO'] : 0;
                        objs['SG'] += obj['SG'] ? obj['SG'] : 0;
                        objs['TOTAL'] += obj['TOTAL'] ? obj['TOTAL'] : 0;
                        categories.push({'DISTRICT':obj['DISTRICT'],'SG':obj['SG'],'HSG':obj['HSG'],'ASO':obj['ASO'],'DVR':obj['DVR'],'JA':obj['JA'],'PO':obj['PO'],'GMAN':obj['GMAN'],'OA':obj['OA'],'OTHER':obj['OTHER'],'TOTAL':obj['TOTAL']});
                        obj = {};
                        obj['DISTRICT'] = '';
                        obj['SG'] = 0;
                        obj['HSG'] = 0;
                        obj['DVR'] = 0;
                        obj['ASO'] = 0;
                        obj['PO'] = 0;
                        obj['GMAN'] = 0;
                        obj['JA'] = 0;
                        obj['OA'] = 0;
                        obj['OTHER'] = 0;
                        obj['TOTAL'] = 0;
                        total = 0;
                        if ((i + 1 == rowsReturned) || (rows[i].region != rows[i + 1].region)) {  
                            regval = 1;
                        } 
                    }
                    else {
                        if ((i + 1 == rowsReturned) || (rows[i].region != rows[i + 1].region)) {  
                            regval = 1;
                            objs['ASO'] += obj['ASO'] ? obj['ASO'] : 0;
                            objs['OTHER'] += obj['OTHER'] ? obj['OTHER'] : 0;
                            objs['DVR'] += obj['DVR'] ? obj['DVR'] : 0;
                            objs['GMAN'] += obj['GMAN'] ? obj['GMAN'] : 0;
                            objs['HSG'] += obj['HSG'] ? obj['HSG'] : 0;
                            objs['JA'] += obj['JA'] ? obj['JA'] : 0;
                            objs['OA'] += obj['OA'] ? obj['OA'] : 0;
                            objs['PO'] += obj['PO'] ? obj['PO'] : 0;
                            objs['SG'] += obj['SG'] ? obj['SG'] : 0;
                            objs['TOTAL'] += obj['TOTAL'] ? obj['TOTAL'] : 0;
                            categories.push({'DISTRICT':obj['DISTRICT'],'SG':obj['SG'],'HSG':obj['HSG'],'ASO':obj['ASO'],'DVR':obj['DVR'],'JA':obj['JA'],'PO':obj['PO'],'GMAN':obj['GMAN'],'OA':obj['OA'],'OTHER':obj['OTHER'],'TOTAL':obj['TOTAL']});
                            obj = {};
                            obj['DISTRICT'] = '';
                            obj['SG'] = 0;
                            obj['HSG'] = 0;
                            obj['DVR'] = 0;
                            obj['ASO'] = 0;
                            obj['PO'] = 0;
                            obj['GMAN'] = 0;
                            obj['JA'] = 0;
                            obj['OA'] = 0;
                            obj['OTHER'] = 0;
                            obj['TOTAL'] = 0;
                        } 
                    }                       
                } 
                categories.push({'DISTRICT':'Total','SG':objs['SG'],'HSG':objs['HSG'],'ASO':objs['ASO'],'DVR':objs['DVR'],'JA':objs['JA'],'PO':objs['PO'],'GMAN':objs['GMAN'],'OA':objs['OA'],'OTHER':objs['OTHER'],'TOTAL':objs['TOTAL']});
                objs = {};
                resolve(categories);
            }).catch(function (err) { 
                console.log('err',err);
                reject("Error while get districtcount count");
            });
        }).catch(function (err) {
            reject(err);
        });
    });
}

module.exports.getprojectwisecount = function () {
    return new app.promise(function (resolve, reject) {
        //console.log("query", query);
        mySqlConnection.connection().then(function (con) {
            con.query("CALL getprojectwisecount();").then(function (rows, fields) {
                var rowsReturned = rows[0].length;
                var result = [];
                var totalsgcount = 0;
                var totalhsgcount = 0;
                var totalasocount = 0;
                var totalpocount = 0;
                var totaldvrcount = 0;
                var totaljacount = 0;
                var totalgmancount = 0;
                var totaloacount = 0;
                var totalothercount = 0;
                var totaltotalcount = 0;
                //var projectwisecountdetails = new report.getprojectcountdet('PROJECTNO', 'PROJECT NAME', 'SG', 'HSG', 'ASO', 'PO', 'DVR', 'JA', 'GMAN', 'OA', 'OTHERS', 'TOTAL');
               // result.push(projectwisecountdetails);

                if (rowsReturned > 0) {
                    for (var i = 0; i < rowsReturned; i++) {

                        totalsgcount = totalsgcount + rows[0][i].sgcount;
                        totalhsgcount = totalhsgcount + rows[0][i].hsgcount;
                        totalasocount = totalasocount + rows[0][i].asocount;
                        totalpocount = totalpocount + rows[0][i].pocount;
                        totaldvrcount = totaldvrcount + rows[0][i].dvrcount;
                        totaljacount = totaljacount + rows[0][i].jacount;
                        totalgmancount = totalgmancount + rows[0][i].gmancount;
                        totaloacount = totaloacount + rows[0][i].oacount;
                        totalothercount = totalothercount + rows[0][i].othercount;
                        totaltotalcount = totaltotalcount + rows[0][i].totalcount;

                        var projectwisecountdetails = new report.getprojectcountdet(rows[0][i].projectno, rows[0][i].name, rows[0][i].district, rows[0][i].region ,rows[0][i].sgcount, rows[0][i].hsgcount, rows[0][i].asocount, rows[0][i].pocount, rows[0][i].dvrcount, rows[0][i].jacount, rows[0][i].gmancount, rows[0][i].oacount, rows[0][i].othercount, rows[0][i].totalcount);
                        result.push(projectwisecountdetails);
                    }
                }
                var projectwisecountdetails = new report.getprojectcountdet('Total','', '', '',  totalsgcount, totalhsgcount, totalasocount, totalpocount, totaldvrcount, totaljacount, totalgmancount, totaloacount, totalothercount, totaltotalcount);
                result.push(projectwisecountdetails);

                resolve(result);

            }).catch(function (err) {
                reject("Error while get projectwise count");
            });
        }).catch(function (err) {
            reject(err);
        });
    });
}
 
module.exports.getprojectwisenewlist = function (fromdate, todate) {
    //console.log('fromdate todate', fromdate, todate);
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) { 
            var todates = moment(todate, "YYYY-MM-DD").add(1, 'days');
            var todatess = moment(todates).format('YYYY-MM-DD');
            var fdate = moment(fromdate).format('DD-MM-YYYY');
            var tdate = moment(todate).format('DD-MM-YYYY');
            con.query("CALL getprojectwisenewcount(?,?);", [fromdate, todatess]).then(function (rows, fields) { 
                console.log('rows',rows);
                var result = [];
                var obj = {};
                var objs = {};
                var total = 0;
                obj['PROJECTNO'] = '';
                obj['PROJECTNAME'] = ''; 
                obj['CLIENTNAME'] = '';
                obj['SG'] = 0; obj['HSG'] = 0; obj['ASO'] = 0; obj['PO'] = 0; obj['DVR'] = 0; 
                obj['JA'] = 0; obj['GMAN'] = 0; obj['OA'] = 0; obj['OTHER'] = 0; 
                objs['SG'] = 0; objs['HSG'] = 0; objs['ASO'] = 0; objs['PO'] = 0; objs['DVR'] = 0; 
                objs['JA'] = 0; objs['GMAN'] = 0; objs['OA'] = 0; objs['OTHER'] = 0; objs['TOTAL'] = 0;
                for(var i = 0; i <rows[0].length;i++) {
                    total += rows[0][i].membercount;
                    obj['PROJECTNO'] = rows[0][i].projectno;
                    obj['PROJECTNAME'] = rows[0][i].projectname;
                    obj['CLIENTNAME'] = rows[0][i].clientname;
                    obj[rows[0][i].category] = rows[0][i].membercount;
                    if ((i + 1 == rows[0].length) || (rows[0][i].projectno != rows[0][i + 1].projectno)) {  
                        var districtwiseincdeccountdetails = new report.getprojectwisenewtdet(obj['PROJECTNO'],obj['PROJECTNAME'],obj['CLIENTNAME'],obj['SG'],obj['HSG'],obj['ASO'],obj['PO'],obj['DVR'],obj['JA'],obj['GMAN'],obj['OA'],obj['OTHER'],total); 
                        result.push(districtwiseincdeccountdetails); 
                        objs['SG'] += obj['SG']; 
                        objs['HSG'] += obj['HSG']; 
                        objs['ASO'] += obj['ASO']; 
                        objs['PO'] += obj['PO']; 
                        objs['DVR'] += obj['DVR']; 
                        objs['JA'] += obj['JA']; 
                        objs['GMAN'] += obj['GMAN']; 
                        objs['OA'] += obj['OA']; 
                        objs['OTHER'] += obj['OTHER'];
                        objs['TOTAL'] += total;
                        obj = {};
                        obj['PROJECTNO'] = '';
                        obj['PROJECTNAME'] = ''; 
                        obj['CLIENTNAME'] = '';
                        obj['SG'] = 0; obj['HSG'] = 0; obj['ASO'] = 0; obj['PO'] = 0; obj['DVR'] = 0; 
                        obj['JA'] = 0; obj['GMAN'] = 0; obj['OA'] = 0; obj['OTHER'] = 0;
                        total = 0;
                    }
                }
                var districtwiseincdeccountdetails = new report.getprojectwisenewtdet('','','GRAND TOTAL',objs['SG'],objs['HSG'],objs['ASO'],objs['PO'],objs['DVR'],objs['JA'],objs['GMAN'],objs['OA'],objs['OTHER'],objs['TOTAL']); 
                result.push(districtwiseincdeccountdetails);
                resolve(result);
            }).catch(function (err) { 
                console.log('err',err);
                reject("Error while get projectwise increased decresed count");
            });
        }).catch(function (err) {
            reject(err);
        });
    });
}

module.exports.getprojectwiseincdeccount = function (fromdate, todate) {
    //console.log('fromdate todate', fromdate, todate);
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) { 
            var todates = moment(todate, "YYYY-MM-DD").add(1, 'days');
            var todatess = moment(todates).format('YYYY-MM-DD');
            var fdate = moment(fromdate).format('DD-MM-YYYY');
            var tdate = moment(todate).format('DD-MM-YYYY');
            con.query("CALL getprojectwiseincreasedcount(?,?);", [fromdate, todatess]).then(function (rows, fields) { 
                var result = [];
                var objs = {};
                var total = 0;
                // increase logics
                objs['PROJECT'] = 'Total Strength BBF';
                for(var j = 0; j <rows[2].length;j++) {
                    total += rows[2][j].membercount;
                    objs[rows[2][j].category] = rows[2][j].membercount;
                } 
                objs['TOTAL'] = total; 
                var details = new report.getprojectwiseincdeccountdet(objs['PROJECT'],objs['SG'],objs['HSG'],objs['ASO'],objs['PO'],objs['DVR'],objs['JA'],objs['GMAN'],objs['OA'],objs['OTHER'], objs['TOTAL']); 
                result.push(details);
                var obj = {};
                var vals = 'Strength Added:- ( '+fdate+' To '+fdate+' ) (+)';
                var distcountdetail = new report.getprojectwiseincdeccountdet(vals, '', '', '', '', '', '', '', '', '', '');
                result.push(distcountdetail);
                var totals = 0;
                obj['SG'] = 0; obj['HSG'] = 0; obj['ASO'] = 0; obj['PO'] = 0; obj['DVR'] = 0; 
                obj['JA'] = 0; obj['GMAN'] = 0; obj['OA'] = 0; obj['OTHER'] = 0;
                for(var i = 0; i <rows[0].length;i++) {
                    totals += rows[0][i].membercount;
                    obj['PROJECT'] = rows[0][i].project;
                    obj[rows[0][i].category] = rows[0][i].membercount;
                    if ((i + 1 == rows[0].length) || (rows[0][i].project != rows[0][i + 1].project)) {  
                        var districtwiseincdeccountdetails = new report.getprojectwiseincdeccountdet(obj['PROJECT'],obj['SG'],obj['HSG'],obj['ASO'],obj['PO'],obj['DVR'],obj['JA'],obj['GMAN'],obj['OA'],obj['OTHER'],totals); 
                        result.push(districtwiseincdeccountdetails); 
                        objs['SG'] += obj['SG']; 
                        objs['HSG'] += obj['HSG']; 
                        objs['ASO'] += obj['ASO']; 
                        objs['PO'] += obj['PO']; 
                        objs['DVR'] += obj['DVR']; 
                        objs['JA'] += obj['JA']; 
                        objs['GMAN'] += obj['GMAN']; 
                        objs['OA'] += obj['OA']; 
                        objs['OTHER'] += obj['OTHER'];
                        objs['TOTAL'] += totals;
                        obj = {};
                        obj['PROJECT'] = '';
                        obj['SG'] = 0; obj['HSG'] = 0; obj['ASO'] = 0; obj['PO'] = 0; obj['DVR'] = 0; 
                        obj['JA'] = 0; obj['GMAN'] = 0; obj['OA'] = 0; obj['OTHER'] = 0;
                        totals = 0;
                    }
                }
                var districtwiseincdeccountdetails = new report.getprojectwiseincdeccountdet('GRAND TOTAL',objs['SG'],objs['HSG'],objs['ASO'],objs['PO'],objs['DVR'],objs['JA'],objs['GMAN'],objs['OA'],objs['OTHER'],objs['TOTAL']); 
                result.push(districtwiseincdeccountdetails);

                //Decrease Logics
                var vals = 'Strength Withdrawn:- ( '+fdate+' To '+fdate+' ) (-)';
                var decreasedetail = new report.getprojectwiseincdeccountdet(vals, '', '', '', '', '', '', '', '', '', '');
                result.push(decreasedetail); 
                var detotal = 0;
                var deobjs = {};
                var totalobj = {};
                deobjs['SG'] = 0; deobjs['HSG'] = 0; deobjs['ASO'] = 0; deobjs['PO'] = 0; 
                deobjs['DVR'] = 0; deobjs['JA'] = 0; deobjs['GMAN'] = 0; deobjs['OA'] = 0; 
                deobjs['OTHER'] = 0; deobjs['TOTAL'] = 0; 
                totalobj['SG'] = 0; totalobj['HSG'] = 0; totalobj['ASO'] = 0; totalobj['PO'] = 0; 
                totalobj['DVR'] = 0; totalobj['JA'] = 0; totalobj['GMAN'] = 0; totalobj['OA'] = 0; 
                totalobj['OTHER'] = 0; totalobj['TOTAL'] = 0; 
                for(var k = 0; k <rows[1].length;k++) {
                    detotal += rows[1][k].membercount;
                    deobjs['PROJECT'] = rows[1][k].project;
                    deobjs[rows[1][k].category] += rows[1][k].membercount;
                    totalobj[rows[1][k].category] += rows[1][k].membercount;
                    if ((k + 1 == rows[1].length) || (rows[1][k].project != rows[1][k + 1].project)) { 
                        var districtwiseccountdetails = new report.getprojectwiseincdeccountdet(deobjs['PROJECT'],deobjs['SG'],deobjs['HSG'],deobjs['ASO'],deobjs['PO'],deobjs['DVR'],deobjs['JA'],deobjs['GMAN'],deobjs['OA'],deobjs['OTHER'],detotal); 
                        result.push(districtwiseccountdetails); 
                        totalobj['TOTAL'] += detotal;
                        deobjs = {};
                        deobjs['PROJECT'] = '';
                        deobjs['SG'] = 0; deobjs['HSG'] = 0; deobjs['ASO'] = 0; 
                        deobjs['PO'] = 0; deobjs['DVR'] = 0; 
                        deobjs['JA'] = 0; deobjs['GMAN'] = 0; deobjs['OA'] = 0; deobjs['OTHER'] = 0;
                        totals = 0;
                    }
                } 
                objs['SG'] -= totalobj['SG']; 
                objs['HSG'] -= totalobj['HSG']; 
                objs['ASO'] -= totalobj['ASO']; 
                objs['PO'] -= totalobj['PO']; 
                objs['DVR'] -= totalobj['DVR']; 
                objs['JA'] -= totalobj['JA']; 
                objs['GMAN'] -= totalobj['GMAN']; 
                objs['OA'] -= totalobj['OA']; 
                objs['OTHER'] -= totalobj['OTHER'];
                objs['TOTAL'] -= totalobj['TOTAL'];
                var cddetails = new report.getprojectwiseincdeccountdet('TOTAL',totalobj['SG'],totalobj['HSG'],totalobj['ASO'],totalobj['PO'],totalobj['DVR'],totalobj['JA'],totalobj['GMAN'],totalobj['OA'],totalobj['OTHER'],totalobj['TOTAL']); 
                result.push(cddetails);
                var cndetails = new report.getprojectwiseincdeccountdet('NET TOTAL',objs['SG'],objs['HSG'],objs['ASO'],objs['PO'],objs['DVR'],objs['JA'],objs['GMAN'],objs['OA'],objs['OTHER'],objs['TOTAL']); 
                result.push(cndetails);
                resolve(result);
            }).catch(function (err) { 
                console.log('err',err);
                reject("Error while get projectwise increased decresed count");
            });
        }).catch(function (err) {
            reject(err);
        });
    });
}

module.exports.getdistrictwiseincdeccount = function (fromdate, todate) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) { 
            var todates = moment(todate, "YYYY-MM-DD").add(1, 'days');
            var todatess = moment(todates).format('YYYY-MM-DD');
            var fdate = moment(fromdate).format('DD-MM-YYYY');
            var tdate = moment(todate).format('DD-MM-YYYY');
            con.query("CALL getdistrictwiseinceasedcount(?,?);", [fromdate, todatess]).then(function (rows, fields) { 
                var result = [];
                var objs = {};
                var total = 0;
                // increase logics
                objs['DISTRICT'] = 'Total Strength BBF';
                for(var j = 0; j <rows[2].length;j++) {
                    total += rows[2][j].membercount;
                    objs[rows[2][j].category] = rows[2][j].membercount;
                } 
                objs['TOTAL'] = total; 
                var details = new report.getdistricttwiseincdeccountdet(objs['DISTRICT'],objs['SG'],objs['HSG'],objs['ASO'],objs['PO'],objs['DVR'],objs['JA'],objs['GMAN'],objs['OA'],objs['OTHER'], objs['TOTAL']); 
                result.push(details);
                var obj = {};
                var vals = 'Strength Added:- ( '+fdate+' To '+fdate+' ) (+)';
                var distcountdetail = new report.getdistricttwiseincdeccountdet(vals, '', '', '', '', '', '', '', '', '', '');
                result.push(distcountdetail);
                var totals = 0;
                obj['SG'] = 0; obj['HSG'] = 0; obj['ASO'] = 0; obj['PO'] = 0; obj['DVR'] = 0; 
                obj['JA'] = 0; obj['GMAN'] = 0; obj['OA'] = 0; obj['OTHER'] = 0;
                for(var i = 0; i <rows[0].length;i++) {
                    totals += rows[0][i].membercount;
                    obj['DISTRICT'] = rows[0][i].district;
                    obj[rows[0][i].category] = rows[0][i].membercount;
                    if ((i + 1 == rows[0].length) || (rows[0][i].district != rows[0][i + 1].district)) {  
                        var districtwiseincdeccountdetails = new report.getdistricttwiseincdeccountdet(obj['DISTRICT'],obj['SG'],obj['HSG'],obj['ASO'],obj['PO'],obj['DVR'],obj['JA'],obj['GMAN'],obj['OA'],obj['OTHER'],totals); 
                        result.push(districtwiseincdeccountdetails); 
                        objs['SG'] += obj['SG']; 
                        objs['HSG'] += obj['HSG']; 
                        objs['ASO'] += obj['ASO']; 
                        objs['PO'] += obj['PO']; 
                        objs['DVR'] += obj['DVR']; 
                        objs['JA'] += obj['JA']; 
                        objs['GMAN'] += obj['GMAN']; 
                        objs['OA'] += obj['OA']; 
                        objs['OTHER'] += obj['OTHER'];
                        objs['TOTAL'] += totals;
                        obj = {};
                        obj['DISTRICT'] = '';
                        obj['SG'] = 0; obj['HSG'] = 0; obj['ASO'] = 0; obj['PO'] = 0; obj['DVR'] = 0; 
                        obj['JA'] = 0; obj['GMAN'] = 0; obj['OA'] = 0; obj['OTHER'] = 0;
                        totals = 0;
                    }
                }
                var districtwiseincdeccountdetails = new report.getdistricttwiseincdeccountdet('GRAND TOTAL',objs['SG'],objs['HSG'],objs['ASO'],objs['PO'],objs['DVR'],objs['JA'],objs['GMAN'],objs['OA'],objs['OTHER'],objs['TOTAL']); 
                result.push(districtwiseincdeccountdetails);

                //Decrease Logics
                var vals = 'Strength Withdrawn:- ( '+fdate+' To '+fdate+' ) (-)';
                var decreasedetail = new report.getdistricttwiseincdeccountdet(vals, '', '', '', '', '', '', '', '', '', '');
                result.push(decreasedetail); 
                var detotal = 0;
                var deobjs = {};
                var totalobj = {};
                deobjs['SG'] = 0; deobjs['HSG'] = 0; deobjs['ASO'] = 0; deobjs['PO'] = 0; 
                deobjs['DVR'] = 0; deobjs['JA'] = 0; deobjs['GMAN'] = 0; deobjs['OA'] = 0; 
                deobjs['OTHER'] = 0; deobjs['TOTAL'] = 0; 
                totalobj['SG'] = 0; totalobj['HSG'] = 0; totalobj['ASO'] = 0; totalobj['PO'] = 0; 
                totalobj['DVR'] = 0; totalobj['JA'] = 0; totalobj['GMAN'] = 0; totalobj['OA'] = 0; 
                totalobj['OTHER'] = 0; totalobj['TOTAL'] = 0; 
                for(var k = 0; k <rows[1].length;k++) {
                    detotal += rows[1][k].membercount;
                    deobjs['DISTRICT'] = rows[1][k].district;
                    deobjs[rows[1][k].category] += rows[1][k].membercount;
                    totalobj[rows[1][k].category] += rows[1][k].membercount;
                    if ((k + 1 == rows[1].length) || (rows[1][k].district != rows[1][k + 1].district)) { 
                        var districtwiseccountdetails = new report.getdistricttwiseincdeccountdet(deobjs['DISTRICT'],deobjs['SG'],deobjs['HSG'],deobjs['ASO'],deobjs['PO'],deobjs['DVR'],deobjs['JA'],deobjs['GMAN'],deobjs['OA'],deobjs['OTHER'],detotal); 
                        result.push(districtwiseccountdetails); 
                        totalobj['TOTAL'] += detotal;
                        deobjs = {};
                        deobjs['DISTRICT'] = '';
                        deobjs['SG'] = 0; deobjs['HSG'] = 0; deobjs['ASO'] = 0; 
                        deobjs['PO'] = 0; deobjs['DVR'] = 0; 
                        deobjs['JA'] = 0; deobjs['GMAN'] = 0; deobjs['OA'] = 0; deobjs['OTHER'] = 0;
                        totals = 0;
                    }
                } 
                objs['SG'] -= totalobj['SG']; 
                objs['HSG'] -= totalobj['HSG']; 
                objs['ASO'] -= totalobj['ASO']; 
                objs['PO'] -= totalobj['PO']; 
                objs['DVR'] -= totalobj['DVR']; 
                objs['JA'] -= totalobj['JA']; 
                objs['GMAN'] -= totalobj['GMAN']; 
                objs['OA'] -= totalobj['OA']; 
                objs['OTHER'] -= totalobj['OTHER'];
                objs['TOTAL'] -= totalobj['TOTAL'];
                var cddetails = new report.getdistricttwiseincdeccountdet('TOTAL',totalobj['SG'],totalobj['HSG'],totalobj['ASO'],totalobj['PO'],totalobj['DVR'],totalobj['JA'],totalobj['GMAN'],totalobj['OA'],totalobj['OTHER'],totalobj['TOTAL']); 
                result.push(cddetails);
                var cndetails = new report.getdistricttwiseincdeccountdet('NET TOTAL',objs['SG'],objs['HSG'],objs['ASO'],objs['PO'],objs['DVR'],objs['JA'],objs['GMAN'],objs['OA'],objs['OTHER'],objs['TOTAL']); 
                result.push(cndetails);
                resolve(result);
            }).catch(function (err) { 
                console.log('err',err);
                reject("Error while get projectwise increased decresed count");
            });
        }).catch(function (err) {
            reject(err);
        });
    });
}

module.exports.getprojectwisesalary = function (frommonth) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            con.query("CALL getsalarybasedproject(?);", [frommonth]).then(function (rows, fields) {
                var rowsReturned = rows.length;
                resolve(rows);
            }).catch(function (err) {
                console.log("Err", err);
                reject("Error while get salary projectwise");
            });
        }).catch(function (err) {
            reject(err);
        });
    });
}

module.exports.getmemberwisesalary = function (monthyear) {
    return new app.promise(function (resolve, reject) {
        //console.log("query", query);
        console.log('rows',monthyear);
        mySqlConnection.connection().then(function (con) {
            con.query("CALL getsalarybasedmember(?);", [monthyear]).then(function (rows, fields) {
               
                var rowsReturned = rows[0].length;
                var result = [];
                // var salarymemberwise = new report.getsalarymemberdet('Texco.No', 'First Name', 'Last Name', 'Presentdays', 'Basic', 'Ed days', 'Ed amount', 'Medical Allow', 'Unif.Dt', 'Lea Pay', 'Bonus', 'Washallow', 'Gratuity', 'Grossamount', 'Netpay');
                // result.push(salarymemberwise);

                // if (rowsReturned > 0) {
                //     for (var i = 0; i < rowsReturned; i++) {

                //         var salarymemberwise = new report.getsalarymemberdet(rows[0][i].texcono, rows[0][i].firstname, rows[0][i].lastname, rows[0][i].presentdays, rows[0][i].basic, rows[0][i].eddays, rows[0][i].edamount, rows[0][i].ma, rows[0][i].unifdt, rows[0][i].leapay, rows[0][i].bonus, rows[0][i].washallow, rows[0][i].gratuity, rows[0][i].grossamount, rows[0][i].netpay);
                //         result.push(salarymemberwise);
                //     }
                // }
                resolve(rows[0]);

            }).catch(function (err) {
                reject("Error while get salary member twise DAL");
            });
        }).catch(function (err) {
            reject(err);
        });
    });
}

module.exports.getsubcategory = function () {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            con.query("SELECT ss.subcategoryid,ss.subcategoryname FROM subcategory ss WHERE ss.active = 1;").then(function (rows, fields) {
                resolve(rows);
            }).catch(function (err) {
                reject("Error while get subcategory wise DAL");
            });
        }).catch(function (err) {
            reject(err);
        });
    });
}

module.exports.getdeptwisecount = function (monthandyear,categoryid) { 
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {  
            var dt = new Date(monthandyear);
            var StartDate = moment(dt).startOf('month').format('YYYY-MM-DD');
            var EndDate = moment(dt).endOf('month').format('YYYY-MM-DD');
            con.query("CALL getdeptwisecount(?,?,?);", [StartDate, EndDate, categoryid]).then(function (rows, fields) { 
                var result = [];
                for(var j = 0; j <rows[0].length;j++) {
                    var cndetails = new report.getdeptwisecountlist(monthandyear,rows[0][j].firstname,rows[0][j].texcono,rows[0][j].serviceno,rows[0][j].category,rows[0][j].projectno,rows[0][j].projectname,rows[0][j].region,1);
                    result.push(cndetails);
                }
                resolve(result);
            }).catch(function (err) { 
                console.log('err',err);
                reject("Error while get projectwise increased decresed count");
            });
        }).catch(function (err) {
            reject(err);
        });
    });
} 

module.exports.getcategoryreportlist = function (regionid,districtid,fromdate,todate)  { 
    // console.log('regionid,districtid,fromdate,todate',regionid,districtid,fromdate,todate);
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {  
            con.query("CALL getcategorywisemember(?,?,?,?);", [regionid,districtid,fromdate,todate]).then(function (rows, fields) {  
                var result = []; 
                var obj = {};
                var objs = {};
                obj['DISTRICT'] = '';
                obj['REGION'] = '';
                obj['SG'] = 0;
                obj['ASO'] = 0;
                obj['OTHER'] = 0;
                obj['DVR'] = 0;
                obj['GMAN'] = 0;
                obj['HSG'] = 0;
                obj['JA'] = 0;
                obj['OA'] = 0;
                obj['PO'] = 0;
                obj['TOTAL'] = 0;
                var total = 0; 
                objs['DISTRICT'] = 'Total';
                objs['REGION'] = '';
                objs['SG'] = 0;
                objs['ASO'] = 0;
                objs['OTHER'] = 0;
                objs['DVR'] = 0;
                objs['GMAN'] = 0;
                objs['HSG'] = 0;
                objs['JA'] = 0;
                objs['OA'] = 0;
                objs['PO'] = 0;
                objs['TOTAL'] = 0;
                for(var i = 0; i <rows[0].length;i++) {
                    obj['DISTRICT'] = rows[0][i].district;
                    obj['REGION'] = rows[0][i].region;
                    obj[rows[0][i].category] = rows[0][i].memcount; 
                    total += rows[0][i].memcount;
                    if ((i + 1 == rows[0].length) || (rows[0][i].district != rows[0][i + 1].district)) {
                        obj['TOTAL'] = total;
                        var cndetails = new report.getmemberwisesalarycountlist(obj['DISTRICT'],obj['REGION'],obj['SG'],obj['HSG'],obj['ASO'],obj['PO'],obj['DVR'],obj['JA'],obj['GMAN'],obj['OA'],obj['OTHER'],obj['TOTAL']);
                        objs['SG'] += obj['SG'];
                        objs['ASO'] += obj['ASO'];
                        objs['OTHER'] += obj['OTHER'];
                        objs['DVR'] += obj['DVR'];
                        objs['GMAN'] += obj['GMAN'];
                        objs['HSG'] += obj['HSG'];
                        objs['JA'] += obj['JA'];
                        objs['OA'] += obj['OA'];
                        objs['PO'] += obj['PO'];
                        objs['TOTAL'] += obj['TOTAL'];
                        result.push(cndetails);
                        total = 0;
                        obj ={};
                        obj['DISTRICT'] = '';
                        obj['REGION'] = '';
                        obj['SG'] = 0;
                        obj['ASO'] = 0;
                        obj['OTHER'] = 0;
                        obj['DVR'] = 0;
                        obj['GMAN'] = 0;
                        obj['HSG'] = 0;
                        obj['JA'] = 0;
                        obj['OA'] = 0;
                        obj['PO'] = 0;
                        obj['TOTAL'] = 0;
                    }
                }
                var cndetails = new report.getmemberwisesalarycountlist(objs['DISTRICT'],objs['REGION'],objs['SG'],objs['HSG'],objs['ASO'],objs['PO'],objs['DVR'],objs['JA'],objs['GMAN'],objs['OA'],objs['OTHER'],objs['TOTAL']);
                result.push(cndetails);
                resolve(result);
            }).catch(function (err) { 
                console.log('err',err);
                reject("Error while get memberwise count");
            });
        }).catch(function (err) {
            reject(err);
        });
    });
} 

module.exports.getnewpersonslist = function (fromdate,todate)  { 
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {  
            var query = multiline.stripIndent(function () {
                /*
                    SELECT mh.memberid,mh.texcono,mh.category FROM memberhistory mh 
                    WHERE DATE(mh.startdate) BETWEEN (?) AND (?)
                    GROUP BY mh.memberid
                    ORDER BY mh.category,mh.memberid;
                    SELECT mh.memberid,mh.texcono,mh.category FROM memberhistory mh 
                    WHERE DATE(mh.startdate) < (?);
                */
            });
            con.query(query,[fromdate,todate,fromdate]).then(function (rows, fields) {  
                var result = []; 
                var obj = {};
                var objs = {};
                var count = 0; 
                objs['TOTAL'] = 0;
                obj['MEMBERCOUNT'] = 0; 
                obj['CATEGORY'] = '';
                var totalmem = rows[1];
                for(var i = 0; i < rows[0].length;i++) {
                    obj['CATEGORY'] = rows[0][i].category;
                    var filteredapprsup = _.filter(totalmem, function(item) {
                        if(item.memberid == rows[0][i].memberid) 
                            count++;
                    }); 
                    console.log('count',count);
                    if(count == 0)  
                    {
                        obj['MEMBERCOUNT'] += 1;
                        objs['TOTAL'] += 1;   
                    } 
                    count = 0;
                    if ((i + 1 == rows[0].length) || (rows[0][i].category != rows[0][i + 1].category)) {
                        result.push({'CATEGORY':obj['CATEGORY'],'MEMBERCOUNT':obj['MEMBERCOUNT']});
                        obj = {};
                        obj['MEMBERCOUNT'] = 0; 
                        obj['CATEGORY'] = '';
                    }
                }
                result.push({'CATEGORY':'TOTAL','MEMBERCOUNT':objs['TOTAL']});
                resolve(result);
            }).catch(function (err) { 
                console.log('err',err);
                reject("Error while get memberwise count");
            });
        }).catch(function (err) {
            reject(err);
        });
    });
} 

module.exports.getLoginlist = function (fromdate,enddate) {
    console.log(fromdate);
    return new app.promise(function (resolve, reject) {
        var query = multiline.stripIndent(function () {
            /*
                SELECT 
	                m.firstname, m.lastname, m.email, m.mobile, m.texcono, l.memberid, 
                    l.login_time, l.logout_time,m.serviceno, l.changedby
                    FROM member m
                    inner join login_member l on l.memberid=m.memberid 
                    where date(l.login_time) = ? 
                    order by login_time;
                
            */
        });
       // console.log("query", query);
        mySqlConnection.connection().then(function (con) {
            con.query(query,[fromdate]).then(function (rows, fields) {
                var rowsReturned = rows.length;
              console.log('rows',rows);
                var result2 = [];
                
                if (rowsReturned > 0) {
                    for (var i = 0; i < rowsReturned; i++) { 
                  if(rows[i].logout_time=='0000-00-00 00:00:00')
                  {
                    rows[i].logout_time='--'; 
                  }
                   var val_project = new report.loginModel(rows[i].firstname, rows[i].lastname, rows[i].email, rows[i].mobile,rows[i].texcono,rows[i].serviceno,rows[i].login_time ,rows[i].logout_time,rows[i].changedby);

                    result2.push(val_project);
                    }
                
                   resolve(result2);
                }
                //resolve(result2);
            }).catch(function (err) {
                console.log("err", err);
                reject("Error while get DSRTN base Lable");
            });
        }).catch(function (err) {
            reject(err);
        });
    });
}