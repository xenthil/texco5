module.exports.wages = function (wageid, wagetypeid, wagetype, wageyearid, wageyear, wageareajobmaster) {
    this.wageid = wageid;
    this.wagetypeid = wagetypeid;
    this.wagetype = wagetype;
    this.wageyearid = wageyearid;
    this.wageyear = wageyear;
    this.wageareajobmaster = wageareajobmaster;
};

module.exports.addwage = function(wageamount,wagecategory,wageyearid,wagetypeid,wagecategorydescription) {
    this.wageamount = wageamount;
    this.wagecategory = wagecategory;
    this.wageyearid = wageyearid;
    this.wagetypeid = wagetypeid;
    this.wagecategorydescription = wagecategorydescription;
}

module.exports.wagejobmaster = function (jobmasterid, jobmastercode, jobmastername, area) {
    this.jobmasterid = jobmasterid;
    this.jobmastercode = jobmastercode;
    this.jobmastername = jobmastername;
    this.area = area;
};

module.exports.wageareajobmaster = function (wageareaid, wagearea, particulars) {
    this.wageareaid = wageareaid;
    this.wagearea = wagearea;
    this.particulars = particulars;
};


module.exports.wage = function (wagetypeid, wageareaid, wageyearid, jobmasterid, particularid, particularamount, changedby,particularpercent,wagecategory) {
    this.wagetypeid = wagetypeid;
    this.wageareaid = wageareaid;
    this.wageyearid = wageyearid;
    this.jobmasterid = jobmasterid;
    this.particularid = particularid;
    this.particularamount = particularamount;
    this.changedby = changedby;
    this.particularpercent = particularpercent;
    this.wagecategoryid = wagecategory;
};



module.exports.perticularjobmaster = function (particularid, particular, particulars) {
    this.particularid = particularid;
    this.particular = particular;
    this.particulars = particulars;
};



module.exports.allwages = function (wagetypeid, wagetype, wageyearid, wageyear, wageparticularjobmaster) {
    this.wagetypeid = wagetypeid;
    this.wagetype = wagetype;
    this.wageyearid = wageyearid;
    this.wageyear = wageyear;
    this.wageparticularjobmaster = wageparticularjobmaster;
};


module.exports.wageyear = function (wageyearid, wageyear, areas) {
    this.wageyearid = wageyearid;
    this.wageyear = wageyear;
    this.areas = areas;
};

module.exports.particulars = function (particularid, particular, wagesjobmaster) {
    this.particularid = particularid;
    this.particular = particular;
    this.wagesjobmaster = wagesjobmaster;
};

module.exports.wagesjobmaster = function (jobmasterid, jobmastercode, jobmastername, areas) {
    this.jobmasterid = jobmasterid;
    this.jobmastercode = jobmastercode;
    this.jobmastername = jobmastername;
    this.areas = areas;
};

module.exports.wagearea = function (wageareaid, wagearea, wageid, amount) {
    this.wageareaid = wageareaid;
    this.wagearea = wagearea;
    this.wageid = wageid;
    this.amount = amount;
};

module.exports.wagedetail = function (wageid, wageareaid, wageyearid, jobmasterid, particularid, particularamount,particularpercent) {
    this.wageid = wageid;
    this.wageareaid = wageareaid;
    this.wageyearid = wageyearid;
    this.jobmasterid = jobmasterid;
    this.particularid = particularid;
    this.particularamount = particularamount;
    this.particularpercent = particularpercent;
};

module.exports.particular = function (particularid, particular, wageid, amount) {
    this.particularid = particularid;
    this.particular = particular;
    this.wageid = wageid;
    this.amount = amount;
};

module.exports.jobmaster = function (jobmasterid, jobmastercode, jobmastername, particulars) {
    this.jobmasterid = jobmasterid;
    this.jobmastercode = jobmastercode;
    this.jobmastername = jobmastername;
    this.particulars = particulars;
};

module.exports.wageTypes = function (particularamount) {
    this.particularamount = particularamount;
};

module.exports.wageagreement = function ( jobmasterid, particularamount) {
    this.jobmasterid = jobmasterid;
    this.particularamount = particularamount;
};

module.exports.wageinfo = function (jobmasterid, particularamount) {
    this.jobmasterid = jobmasterid;
    this.particularamount = particularamount;
};

module.exports.wageimport = function (wagetypeid, wageareaid, wageyearid, particularid, jobmasterid, particularamount,wagecategoryid) {
    this.wagetypeid = wagetypeid;
    this.wageareaid = wageareaid;
    this.wageyearid = wageyearid;
    this.particularid = particularid;
    this.jobmasterid = jobmasterid;
    this.particularamount = particularamount;
    this.wagecategoryid = wagecategoryid;
};

module.exports.wagesforpay = function (jobmasterid, jobcode, jobname, salarycomponent) {
    this.jobmasterid = jobmasterid;
    this.jobcode = jobcode;
    this.jobname = jobname;
    this.salarycomponent = salarycomponent;
};

module.exports.salarycomponent = function (particularid, name, code, particularpercent, particularamount, jobmasterid, wagetypeid, wageyearid, wageareaid) {
    this.particularid = particularid;
    this.name = name;
    this.code = code;
    this.particularamount = particularamount;
    this.particularpercent = particularpercent;
    this.jobmasterid = jobmasterid;
    this.wagetypeid = wagetypeid;
    this.wageyearid = wageyearid;
    this.wageareaid = wageareaid;
};