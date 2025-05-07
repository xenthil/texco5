var app = require('./../app');
var wageModel = require('./../Model/wage');
var wageDal = require('../DAL/wageDAL');
var jobDal = require('./../DAL/jobDAL');
var lookupvalueDal = require('../DAL/lookupvalueDAL');
var _ = require('underscore'); 

module.exports.createwages = function (wage) {
    return new app.promise(function (resolve, reject) {
        // wageDal.checkwages(wage).then(function (result) {
            
        // }).catch(function (err) {
        //     reject(err);
        // });
        wageDal.createwages(wage).then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
};  

module.exports.createnewwages = function (wage) {
    return new app.promise(function (resolve, reject) {
        wageDal.checkwagecategory(wage).then(function (results) {
            if(results.counts == 0) {
                wageDal.createnewwages(wage).then(function (result) {
                    resolve(result)
                }).catch(function (err) {
                    reject(err);
                });
            } else {
                reject('Wage Category Name already exists');
            }
        }).catch(function (err) {
            reject(err);
        });
    });
}; 

module.exports.UpdateWageRate = function (wageid,particularamount) {
    return new app.promise(function (resolve, reject) {
        wageDal.UpdateWageRate(wageid,particularamount).then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
};


module.exports.updatewages = function (wage, wageid) {
    return new app.promise(function (resolve, reject) {
        wageDal.updatewages(wage, wageid).then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.UpdateAllWages = function (particularid, particularamount,particularpercent) {
    return new app.promise(function (resolve, reject) {
        wageDal.UpdateAllWages(particularid, particularamount,particularpercent).then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
};


module.exports.updatewagestatus = function (wageid) {
    return new app.promise(function (resolve, reject) {
        wageDal.updatewagestatus(wageid).then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.dgrwages = function () {
    return new app.promise(function (resolve, reject) {
        wageDal.dgrwages().then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.tnwage = function (categoryid,wageyearid,wagetypeid) {
    return new app.promise(function (resolve, reject) {
        var result = [];
        var particulars = [];
        var jobs = [];
        var areas = [];
        //wages
        wageDal.tnwage(categoryid,wageyearid,wagetypeid).then(function (wage) {
            // fetch all areas
            jobDal.getjobmaster(0).then(function (job) {
                // fetch job particulars
                lookupvalueDal.lookupvalues("WGPART").then(function (part) {
                    //fetch all wage year 
                    var yearvalue = new wageModel.wageyear(wageyearid,wageyearid);
                    var areavalue = new wageModel.wagearea(0,0,'wageref');  

                    for(var partindex = 0; partindex < part.lookupvalues.length; partindex++) { 
                        var partvalue = new wageModel.particular(part.lookupvalues[partindex].lkvalid, part.lookupvalues[partindex].description , 0, 0);
                        for(var jobindex = 0; jobindex < job.length; jobindex++) {  
                            var jobvalue = new wageModel.jobmaster(job[jobindex].jobmasterid, job[jobindex].code, job[jobindex].name);
                            for(var wageindex = 0; wageindex < wage.length; wageindex++) { 
                                if (yearvalue.wageyearid == wage[wageindex].wageyearid && partvalue.particularid == wage[wageindex].particularid && jobvalue.jobmasterid == wage[wageindex].jobmasterid) {
                                    jobvalue.wageid = wage[wageindex].wageid;
                                    jobvalue.amount = wage[wageindex].particularamount;
                                    jobvalue.check = false;
                                    wage.splice(wageindex, 0);
                                }      
                            }   
                            particulars.push(jobvalue);
                        } 
                        partvalue.particulars = particulars;
                        particulars = [];
                        jobs.push(partvalue);
                       
                    } 
                    
                    areavalue.wagesjobmaster = jobs;
                    jobs = [];
                    areas.push(areavalue)
                    
                    yearvalue.areas = areas;
                    areas = [];
                    result.push(yearvalue); 
                    resolve(result);
                }).catch(function (err) {
                    reject(err);
                });
            }).catch(function (err) {
                reject(err);
            });
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.tnwages = function () {
    return new app.promise(function (resolve, reject) {
        wageDal.tnwages().then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.dgrwage = function (categoryid,wageyearid,wagetypeid) {
    return new app.promise(function (resolve, reject) {
        var result = [];
        var particulars = [];
        var jobs = [];
        var areas = [];
        
        wageDal.dgrwage(categoryid,wageyearid,wagetypeid).then(function (wage) {
            // fetch all areas
            lookupvalueDal.lookupvalues("WGAREA").then(function (area) {
                // fetch all jobs
                jobDal.getjobmaster(0).then(function (job) {
                    // fetch job particulars
                    lookupvalueDal.lookupvalues("WGPART").then(function (part) {
                        var yearvalue = new wageModel.wageyear(wageyearid,wageyearid); 
                        for (var areaindex = 0; areaindex < area.lookupvalues.length; areaindex++) {
                            var areavalue = new wageModel.wagearea(area.lookupvalues[areaindex].lkvalid, area.lookupvalues[areaindex].description,'wageref');
                            for (var partindex = 0; partindex < part.lookupvalues.length; partindex++) {
                                var partvalue = new wageModel.particular(part.lookupvalues[partindex].lkvalid, part.lookupvalues[partindex].description , 0, 0);
                                for (var jobindex = 0; jobindex < job.length; jobindex++) {
                                    var jobvalue = new wageModel.jobmaster(job[jobindex].jobmasterid, job[jobindex].code, job[jobindex].name);
                                    for (var wageindex = 0; wageindex < wage.length; wageindex++) {
                                        if (yearvalue.wageyearid == wage[wageindex].wageyearid && partvalue.particularid == wage[wageindex].particularid && jobvalue.jobmasterid == wage[wageindex].jobmasterid && areavalue.wageareaid == wage[wageindex].wageareaid) {
                                            jobvalue.wageid = wage[wageindex].wageid;
                                            jobvalue.amount = wage[wageindex].particularamount;
                                            jobvalue.percent = wage[wageindex].particularpercent;
                                            jobvalue.check = false;
                                            // remove the wage from array as we already got a match
                                            wage.splice(wageindex, 0);
                                        } // end of if
                                    } // end of wage
                                    particulars.push(jobvalue);
                                }
                                partvalue.particulars = particulars;
                                particulars = [];
                                jobs.push(partvalue);
                            }
                            areavalue.wagesjobmaster = jobs;
                            jobs = [];
                            areas.push(areavalue);
                        }
                        yearvalue.areas = areas;
                        areas = [];
                        result.push(yearvalue);
                        resolve(result);
                    }).catch(function (err) {
                        reject(err);
                    });
                }).catch(function (err) {
                    reject(err);
                });
            }).catch(function (err) {
                reject(err);
            });
        }).catch(function (err) {
            reject(err);
        });

    });
};

module.exports.importwages = function (wages,wagedetails,wagearea) { 
    return new app.promise(function (resolve, reject) {
        var wage = wages[0];  
        if (wage.length > 0) { 
            var wageyearid = wagedetails.wageyear;
            var wagetypeid = wagedetails.wagetype;
            var wagecategoryid = 0;
            var wagecategory = wagedetails.category;
            var wagecategorydescription = wagedetails.categorydescription;
            wagedetails.wagecategory = wagedetails.category;
            wageDal.checkwagecategory(wagedetails).then(function (results) {
                if(results.counts == 0) { 
                    wageDal.createnewwagecategoryforupload(wagecategory,wagecategorydescription,wageyearid,wagetypeid).then(function (result11) {  
                        wagecategoryid = result11;
                        wageDal.getimportdetails().then(function (result) {  
                            var jobmaster = result.jobmaster;
                            var wagepart = result.wgpart; 
                            var rejectedDetails = []; 
                            var selectedDetails = []; 
                            var rejjs = '';
                            var promises = [];  
                            var results = [];  
                            for (var i = 0; i < wage.length; i++) {  
                                promises.push(new Promise((resolve, reject) => {  
                                    var res  = i;  
                                    var jobmasterid = 0;
                                    var wageareaid = 0; 
                                    var filteredjobmaster = _.filter(jobmaster, function(item) { 
                                        if(wage[res].JOBMASTER == item.code) {
                                            jobmasterid = item.jobmasterid;
                                        }  
                                    });   
                                    var filteredwgarea = _.filter(wagearea, function(item) { 
                                        if(wage[res].WAGEAREA == item.description) {
                                            wageareaid = item.lkvalid;
                                        }  
                                    }); 
                                    if(jobmasterid) {  
                                       //  console.log('wagecategoryid',wagecategoryid)
                                        var filteredwgtypee = _.filter(wagepart, function(item) { 
                                            if(item.code == 'BASIC' && (wage[res].BASIC && wage[res].BASIC > 0)) { 
                                                var wagearray17 = new wageModel.wageimport(wagetypeid, (wageareaid != null? wageareaid: 0) ,wageyearid, item.lkvalid, jobmasterid,  (wage[res].BASIC != null ? wage[res].BASIC: 0),wagecategoryid); 
                                                results.push(wagearray17);
                                            }  
                                            if(item.code == 'HRA') { 
                                                var wagearray16 = new wageModel.wageimport(wagetypeid, (wageareaid != null? wageareaid: 0) ,wageyearid, item.lkvalid, jobmasterid,  (wage[res].HRA != null ? wage[res].HRA: 0),wagecategoryid); 
                                                results.push(wagearray16);
                                            } 
                                            if(item.code == 'CCA') { 
                                                var wagearray15 = new wageModel.wageimport(wagetypeid, (wageareaid != null? wageareaid: 0) ,wageyearid, item.lkvalid, jobmasterid,  (wage[res].CCA != null ? wage[res].CCA: 0),wagecategoryid); 
                                                results.push(wagearray15);
                                            }
                                            if(item.code == 'DA') { 
                                                var wagearray14 = new wageModel.wageimport(wagetypeid, (wageareaid != null? wageareaid: 0) ,wageyearid, item.lkvalid, jobmasterid,  (wage[res].DA != null ? wage[res].DA: 0),wagecategoryid); 
                                                results.push(wagearray14);
                                            }
                                            if(item.code == 'MA') { 
                                                var wagearray13 = new wageModel.wageimport(wagetypeid, (wageareaid != null? wageareaid: 0) ,wageyearid, item.lkvalid, jobmasterid,  (wage[res].MA != null ? wage[res].MA: 0),wagecategoryid); 
                                                results.push(wagearray13);
                                            }
                                            if(item.code == 'EPF') { 
                                                var wagearray = new wageModel.wageimport(wagetypeid, (wageareaid != null? wageareaid: 0) ,wageyearid, item.lkvalid, jobmasterid,  (wage[res].EPF != null ? wage[res].EPF: 0),wagecategoryid); 
                                                results.push(wagearray);
                                            }  
                                            if(item.code == 'EDLI') { 
                                                var wagearray0 = new wageModel.wageimport(wagetypeid, (wageareaid != null? wageareaid: 0) ,wageyearid, item.lkvalid, jobmasterid, (wage[res].EDLI != null ? wage[res].EDLI: 0),wagecategoryid); 
                                                results.push(wagearray0);
                                            }
                                            if(item.code == 'ADCHRG') { 
                                                var wagearray1 = new wageModel.wageimport(wagetypeid, (wageareaid != null? wageareaid: 0) ,wageyearid, item.lkvalid, jobmasterid, (wage[res].ADCHRG != null ? wage[res].ADCHRG: 0),wagecategoryid); 
                                                results.push(wagearray1);
                                            }
                                            if(item.code == 'BONUS') { 
                                                var wagearray2 = new wageModel.wageimport(wagetypeid, (wageareaid != null? wageareaid: 0) ,wageyearid, item.lkvalid, jobmasterid,  (wage[res].BONUS != null ? wage[res].BONUS: 0),wagecategoryid); 
                                                results.push(wagearray2);
                                            }
                                            if(item.code == 'GRATUITY') { 
                                                var wagearray3 = new wageModel.wageimport(wagetypeid, (wageareaid != null? wageareaid: 0) ,wageyearid, item.lkvalid, jobmasterid, (wage[res].GRATUITY != null ? wage[res].GRATUITY: 0),wagecategoryid); 
                                                results.push(wagearray3);
                                            }
                                            if(item.code == 'UNIFRM') { 
                                                var wagearray4 = new wageModel.wageimport(wagetypeid, (wageareaid != null? wageareaid: 0) ,wageyearid, item.lkvalid, jobmasterid, (wage[res].UNIFRM != null ? wage[res].UNIFRM: 0),wagecategoryid); 
                                                results.push(wagearray4);
                                            } 
                                            if(item.code == 'LR') { 
                                                var wagearray5 = new wageModel.wageimport(wagetypeid, (wageareaid != null? wageareaid: 0) ,wageyearid, item.lkvalid, jobmasterid, (wage[res].LEAPAY != null ? wage[res].LEAPAY: 0) ,wagecategoryid); 
                                                results.push(wagearray5);
                                            }
                                            if(item.code == 'CONVEYANCE') { 
                                                var wagearray6 = new wageModel.wageimport(wagetypeid, (wageareaid != null? wageareaid: 0) ,wageyearid, item.lkvalid, jobmasterid,  (wage[res].CONVEYANCE != null ? wage[res].CONVEYANCE: 0),wagecategoryid); 
                                                results.push(wagearray6);
                                            }
                                            if(item.code == 'WASHALLOW') { 
                                                var wagearray7 = new wageModel.wageimport(wagetypeid, (wageareaid != null? wageareaid: 0) ,wageyearid, item.lkvalid, jobmasterid,  (wage[res].WASHALLOW != null ? wage[res].WASHALLOW: 0),wagecategoryid);  
                                                results.push(wagearray7);
                                            }
                                            if(item.code == 'LIC') { 
                                                var wagearray8 = new wageModel.wageimport(wagetypeid, (wageareaid != null? wageareaid: 0) ,wageyearid, item.lkvalid, jobmasterid, (wage[res].LIC != null ? wage[res].LIC: 0),wagecategoryid); 
                                                results.push(wagearray8);
                                            }
                                            if(item.code == 'OTHER1') { 
                                                var wagearray9 = new wageModel.wageimport(wagetypeid, (wageareaid != null? wageareaid: 0) ,wageyearid, item.lkvalid, jobmasterid, (wage[res].OTHER1 != null ? wage[res].OTHER1: 0),wagecategoryid); 
                                                results.push(wagearray9);
                                            }
                                            if(item.code == 'OTHER2' ) { 
                                                var wagearray10 = new wageModel.wageimport(wagetypeid, (wageareaid != null? wageareaid: 0) ,wageyearid, item.lkvalid, jobmasterid, (wage[res].OTHER2 != null ? wage[res].OTHER2 : 0),wagecategoryid);  
                                                results.push(wagearray10);
                                            }
                                            if(item.code == 'OTHER3') { 
                                                var wagearray11 = new wageModel.wageimport(wagetypeid, (wageareaid != null? wageareaid : 0) ,wageyearid, item.lkvalid, jobmasterid, (wage[res].OTHER3 != null ? wage[res].OTHER3 : 0),wagecategoryid); 
                                                results.push(wagearray11);
                                            } 
                                            if(item.code == 'RATEHD') { 
                                                var wagearray12 = new wageModel.wageimport(wagetypeid, (wageareaid != null? wageareaid : 0) ,wageyearid, item.lkvalid, jobmasterid, (wage[res].CLAIMAMOUNT != null ? wage[res].CLAIMAMOUNT : 0),wagecategoryid); 
                                                results.push(wagearray12);
                                            }
                                        });  
                                    }   
                                    else if(jobmasterid == 0) {
                                        var rejj = 'Row ' + wage[res].SNO + ' - Wage rate JobMaster '+wage[res].JOBMASTER+' not available in master '; 
                                        if(rejectedDetails.length == 0) { 
                                            rejjs += 'Row ' + wage[res].SNO + ' - Wage rate JobMaster '+wage[res].JOBMASTER+' not available in master '; 
                                        } else {
                                            rejjs += ' , Row ' + wage[res].SNO + ' - Wage rate JobMaster '+wage[res].JOBMASTER+' not available in master '; 
                                        }
                                        rejectedDetails.push(rejj);
                                    }
                                    else if (wagetypeid == '348' && wageareaid == 0) {
                                        var rejj = 'Row ' + wage[res].SNO + ' - Wage rate Area '+wage[res].WAGEAREA+' already exists'; 
                                        if(rejectedDetails.length == 0) { 
                                            rejjs += 'Row ' + wage[res].SNO + ' - Wage rate Area '+wage[res].WAGEAREA+' already exists'; 
                                        } else {
                                            rejjs += ' , Row ' + wage[res].SNO + ' - Wage rate Area '+wage[res].WAGEAREA+' already exists'; 
                                        }
                                        rejectedDetails.push(rejj);
                                    }
                                    else { 
                                        var rejj = 'Row ' + wage[res].SNO + ' - Some Columns Missing. Please fill all columns'; 
                                        if(rejectedDetails.length == 0) { 
                                            rejjs += 'Row  ' + wage[res].SNO + ' - Some Columns Missing. Please fill all columns'; 
                                        } else {
                                            rejjs += ', Row ' + wage[res].SNO + ' - Some Columns Missing. Please fill all columns'; 
                                        } 
                                        rejectedDetails.push(rejj); 
                                    }   
                                    var jobmasterid = 0;
                                    var wageareaid = 0;
                                    resolve('results');
                                }))
                            }   
                            app.promise.all(promises).then(function () {   
                                if(rejectedDetails.length == 0) {  
                                    var errs = []; 
                                    errs.push(rejectedDetails);
                                    rejjs = 'success';
                                    errs.push(rejjs);
                                    wageDal.importwage(results,errs).then(function (result1) { 
                                        resolve(result1);
                                    }).catch(function (err) {
                                        reject(err);
                                    }); 
                                }  else {  
                                    var errs = [];
                                    errs.push(rejectedDetails);
                                    errs.push(rejjs); 
                                    wageDal.deletewagecategory(wagecategoryid,errs).then(function (result1) {  
                                        resolve(result1);
                                    }).catch(function (err) {
                                        reject(err);
                                    }); 
                                } 
                            });
                        }).catch(function (err) {
                            reject(err);
                        });  
                    }).catch(function (err) {
                        reject(err);
                    });  
                } else {
                    reject('Wage Category Name already exists');
                }
            }).catch(function (err) {
                reject(err);
            }); 
        } 
    });
};

module.exports.dgrwagebyyear = function (projectid) {
    return new app.promise(function (resolve, reject) {
        wageDal.dgrwagebyyear(projectid).then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    }); 
};  

module.exports.getwagecategoryByYear = function (yearid,wagetypeid) {
    return new app.promise(function (resolve, reject) {
        wageDal.getwagecategoryByYear(yearid,wagetypeid).then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    }); 
};

module.exports.getwagedetailsbycategoryid = function (categoryid,wageyearid,wagetypeid) {
    return new app.promise(function (resolve, reject) {
        wageDal.getwagedetailsbycategoryid(categoryid,wageyearid,wagetypeid).then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    }); 
};

module.exports.gettnwagedetailsbycategoryid = function (categoryid,wageyearid,wagetypeid) {
    return new app.promise(function (resolve, reject) {
        wageDal.gettnwagedetailsbycategoryid(categoryid,wageyearid,wagetypeid).then(function (result) {
            resolve(result)
        }).catch(function (err) {
            reject(err);
        });
    }); 
};
