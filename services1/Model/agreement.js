module.exports.agreement = function (clientid, fromdate, todate, servicecharge, wagetypeid, wageyearid, wageareaid, agreementstatusid, agreementtypeid, agtypeid, optionaltype, tax, projects, changedby, taxtype, wagecategoryid) {
	this.clientid = clientid;
	this.fromdate = fromdate;
	this.todate = todate;
	this.servicecharge = servicecharge;
	this.wagetypeid = wagetypeid;
	this.wageyearid = wageyearid;
	this.wageareaid = wageareaid;
	this.agreementstatusid = agreementstatusid;
	this.agreementtypeid = agreementtypeid;
	this.agtypeid = agtypeid;
	this.optionaltype = optionaltype;
	this.tax = tax;
	this.projects = projects;
	this.changedby = changedby;
	this.taxtype = taxtype;
	this.wagecategoryid = wagecategoryid;
};

module.exports.agreementamslist = function (clientid, fromdate, todate, servicecharge, wagetypeid, wageyearid, wagecategoryid, wageareaid, agreementstatusid, agreementtypeid, agtypeid, taxtype, tax, addendum,agcount,updatedfields) {
	this.clientid = clientid;
	this.fromdate = fromdate;
	this.todate = todate;
	this.servicecharge = servicecharge;
	this.wagetypeid = wagetypeid;
	this.wageyearid = wageyearid;
	this.wagecategoryid = wagecategoryid;
	this.wageareaid = wageareaid;
	this.agreementstatusid = agreementstatusid;
	this.agreementtypeid = agreementtypeid;
	this.agtypeid = agtypeid;
	this.taxtype = taxtype;
	this.tax = tax;
	this.addendum = addendum;
	this.agcount = agcount;
	this.updatedfields = updatedfields;
};



module.exports.updateAMSagreement = function (agreementid, fromdate, todate, wagetypeid, wageyearid, wageareaid, particularid, agreementstatusid, agtypeid, optionaltype, servicecharge, tax, taxtype, amstatus, wagecategoryid, agreementtypeid) {
	this.agreementid = agreementid;
	this.fromdate = fromdate;
	this.todate = todate;
	this.wagetypeid = wagetypeid;
	this.wageyearid = wageyearid;
	this.wageareaid = wageareaid;
	this.particularid = particularid;
	this.agreementstatusid = agreementstatusid;
	this.agtypeid = agtypeid;
	this.optionaltype = optionaltype;
	this.servicecharge = servicecharge;
	this.tax = tax;
	this.taxtype = taxtype;
	this.amstatus = amstatus;
	this.wagecategoryid = wagecategoryid;
	this.agreementtypeid = agreementtypeid;
};

module.exports.updateagreement = function (agreementid, fromdate, todate, wagetypeid, wageyearid, wageareaid, particularid, agreementstatusid, agtypeid, optionaltype, servicecharge, tax, taxtype, wagecategoryid, agreementtypeid, amstatus,edseperate,allowancetype1,allowancevalue1,allowancetype2,allowancevalue2,allowancetype3,allowancevalue3) {
	this.agreementid = agreementid;
	this.fromdate = fromdate;
	this.todate = todate;
	this.wagetypeid = wagetypeid;
	this.wageyearid = wageyearid;
	this.wageareaid = wageareaid;
	this.particularid = particularid;
	this.agreementstatusid = agreementstatusid;
	this.agtypeid = agtypeid;
	this.optionaltype = optionaltype;
	this.servicecharge = servicecharge;
	this.tax = tax;
	this.taxtype = taxtype;
	this.wagecategoryid = wagecategoryid;
	this.agreementtypeid = agreementtypeid;
	this.amstatus = amstatus;
	this.edseperate=edseperate;
	this.allowancetype1=allowancetype1;
	this.allowancevalue1=allowancevalue1;
	this.allowancetype2=allowancetype2;
	this.allowancevalue2=allowancevalue2;
	this.allowancetype3=allowancetype3;
	this.allowancevalue3=allowancevalue3;
};

module.exports.amendagreement = function (agreementid, agreementinfoid, jobs, type) {
	this.agreementid = agreementid;
	this.agreementinfoid = agreementinfoid;
	this.jobs = jobs;
	this.type = type;
};

module.exports.jobs = function (agreementid, jobmasterid, code, name, numberofvacancies, salary, agreementdetailid,addendum) {
	this.agreementid = agreementid;
	this.jobmasterid = jobmasterid;
	this.code = code;
	this.name = name;
	this.numberofvacancies = numberofvacancies;
	this.salary = salary;
	this.agreementdetailid = agreementdetailid;
	this.addendum = addendum;
};


module.exports.getamsagreement = function (agreementtempid, agreementid, clientid, organization, email, fromdate, todate, servicecharge, wagetypeid, wagetype, wageyearid, wageyear, wageareaid, wagearea, agreementstatusid, agreementstatus, optionaltype, agreementtypeid, agreementtype, agtypeid, agtype, tax, amstatus, projects) {
	this.agreementtempid = agreementtempid
	this.agreementid = agreementid;
	this.clientid = clientid;
	this.organization = organization;
	this.fromdate = fromdate;
	this.todate = todate;
	this.servicecharge = servicecharge;
	this.wagetypeid = wagetypeid;
	this.wagetype = wagetype;
	this.wageyearid = wageyearid;
	this.wageyear = wageyear;
	this.wageareaid = wageareaid;
	this.wagearea = wagearea;
	this.agreementstatusid = agreementstatusid;
	this.agreementstatus = agreementstatus;
	this.optionaltype = optionaltype;
	this.agreementtypeid = agreementtypeid;
	this.agreementtype = agreementtype;
	this.agtypeid = agtypeid;
	this.agtype = agtype;
	this.tax = tax;
	this.projects = projects;
	this.amstatus = amstatus;
};



module.exports.getagreement = function (agreementid, clientid, organization, email, fromdate, todate, servicecharge, wagetypeid, wagetype, wageyearid, wageyear, wageareaid, wagearea, agreementstatusid, agreementstatus, optionaltype, agreementtypeid, agreementtype, agtypeid, agtype, tax, amstatus,projects, taxtype, wagecategoryid, updatedfields,addendumstatus,adamstatus,edseperate,allowancetype1,allowancevalue1,allowancetype2,allowancevalue2,allowancetype3,allowancevalue3) {
	
	this.agreementid = agreementid;
	this.clientid = clientid;
	this.organization = organization;
	this.fromdate = fromdate;
	this.todate = todate;
	this.servicecharge = servicecharge;
	this.wagetypeid = wagetypeid;
	this.wagetype = wagetype;
	this.wageyearid = wageyearid;
	this.wageyear = wageyear;
	this.wageareaid = wageareaid;
	this.wagearea = wagearea;
	this.agreementstatusid = agreementstatusid;
	this.agreementstatus = agreementstatus;
	this.optionaltype = optionaltype;
	this.agreementtypeid = agreementtypeid;
	this.agreementtype = agreementtype;
	this.agtypeid = agtypeid;
	this.agtype = agtype;
	this.tax = tax;
	this.projects = projects;
	this.amstatus = amstatus;
	this.taxtype = taxtype;
	this.wagecategoryid = wagecategoryid;
	this.updatedfields = updatedfields;
	this.addendumstatus = addendumstatus;
	this.adamstatus = adamstatus;
	this.edseperate= edseperate;
	this.allowancetype1=allowancetype1;
	this.allowancevalue1=allowancevalue1;
	this.allowancetype2=allowancetype2;
	this.allowancevalue2=allowancevalue2;
	this.allowancetype3=allowancetype3;
	this.allowancevalue3=allowancevalue3;
};

module.exports.getagreementjobs = function (agreementtempid,agreementid,clientid,projectid,agreementinfoid,numberofvacancies,salary,addendum,jobmasterid,code,jobmastername,wagetypeid,agreementtypeid,agreementstatusid,agtypeid,wageareaid,wageyearid,wagecategoryid,addendumstatus,amstatus,agreementdetailid,amstatusupdated) {

	this.agreementtempid = agreementtempid;
	this.agreementid = agreementid;
	this.clientid = clientid;
	this.projectid = projectid;
	this.agreementinfoid = agreementinfoid;
	this.numberofvacancies = numberofvacancies;
	this.salary = salary;
	this.addendum = addendum;
	this.jobmasterid = jobmasterid;
	this.code = code;
	this.jobmastername = jobmastername;
	this.wagetypeid = wagetypeid;
	this.agreementtypeid = agreementtypeid;
	this.agreementstatusid = agreementstatusid;
	this.agtypeid = agtypeid;
	this.wageareaid = wageareaid;
	this.wageyearid = wageyearid;
	this.wagecategoryid = wagecategoryid;
	this.addendumstatus = addendumstatus;
	this.amstatus = amstatus;
	this.agreementdetailid = agreementdetailid;
	this.amstatusupdated = amstatusupdated;
}

module.exports.project = function (projectid, projectno, projectname, agreementinfoid, jobs, addendum) {
	this.projectid = projectid;
	this.projectno = projectno;
	this.projectname = projectname;
	this.agreementinfoid = agreementinfoid;
	this.jobs = jobs;
	this.addendum = addendum;
};

module.exports.agreementexpirylist = function (agreementid, clientid, client, projectid, projectno, projectname, fromdate, todate, servicecharge, wagetypeid, wagetype, wageyearid, wageyear, wageareaid, wagearea, agreementstatusid, agreementstatus, optionaltype, agreementtypeid, agreementtype, agtypeid, agtype, region, diffdays) {
	this.agreementid = agreementid;
	this.clientid = clientid;
	this.client = client;
	this.projectid = projectid;
	this.projectno = projectno;
	this.projectname = projectname;
	this.fromdate = fromdate;
	this.todate = todate;
	this.wagetypeid = wagetypeid;
	this.wagetype = wagetype;
	this.wageyearid = wageyearid;
	this.wageyear = wageyear;
	this.wageareaid = wageareaid;
	this.wagearea = wagearea;
	this.agreementstatusid = agreementstatusid;
	this.agreementstatus = agreementstatus;
	this.optionaltype = optionaltype;
	this.agreementtypeid = agreementtypeid;
	this.agreementtype = agreementtype;
	this.agtypeid = agtypeid;
	this.agtype = agtype;
	this.region = region;
	this.diffdays = diffdays;
};

module.exports.jobvacant = function (projectid, jobmasterid, jobmastercode, name, numberofvacancies, code, agreementtypeid) {
	this.projectid = projectid;
	this.jobmasterid = jobmasterid;
	this.jobmastercode = jobmastercode;
	this.name = name;
	this.numberofvacancies = numberofvacancies;
	this.code = code;
	this.agreementtypeid = agreementtypeid;
};
module.exports.jobAppliedCount = function (projectid, jobmasterid, jobmastercode, name, numberofvacancies) {
	this.projectid = projectid;
	this.jobmasterid = jobmasterid;
	this.jobmastercode = jobmastercode;
	this.name = name;
	this.numberofvacancies = numberofvacancies;
};


module.exports.agreementinfo = function (agreementinfoid) {
	this.agreementinfoid = agreementinfoid;
};

module.exports.jobpostingexport = function (organization, projectid, projectno, projectname, fromdate, todate, servicecharge, wagetype, wageyear, wagearea, agreementstatus, optionaltype, agreementtype, agtype, jobcode, category, agreementvacancies, postedvacancies, filledvacancies) {
	this.organization = organization;
	this.projectid = projectid;
	this.projectno = projectno;
	this.projectname = projectname;
	this.fromdate = fromdate;
	this.todate = todate;
	this.servicecharge = servicecharge;
	this.wagetype = wagetype;
	this.wageyear = wageyear;
	this.wagearea = wagearea;
	this.agreementstatus = agreementstatus;
	this.optionaltype = optionaltype;
	this.agreementtype = agreementtype;
	this.agtype = agtype;
	this.jobcode = jobcode;
	this.category = category;
	this.agreementvacancies = agreementvacancies;
	this.postedvacancies = postedvacancies;
	this.filledvacancies = filledvacancies;
};

module.exports.agreementexport = function (projectno, projectname,designation,clientname,region,district,taluk, fromdate, todate,agreementtype,agreementstatus,agtype,wagetype,wageyear,wagearea,category,sg,hsg, dvr,aso, po,ja,other,oa,gun) { 
	this.projectno = projectno;
	this.projectname = projectname;
	this.designation = designation;
	this.clientname  = clientname; 
	this.region = region;
	this.district = district;
	this.taluk = taluk;
	this.fromdate = fromdate;
	this.todate = todate; 
	this.agreementtype = agreementtype;
	this.agreementstatus = agreementstatus;
	this.agtype = agtype;
	this.wagetype = wagetype;
	this.wageyear = wageyear;
	this.wagearea = wagearea;
	this.category = category;
	this.sg = sg;
	this.hsg = hsg;
	this.dvr = dvr;
	this.aso = aso;
	this.po = po;
	this.ja = ja;
	this.other = other;
	this.oa = oa;
	this.gun = gun;
}; 

module.exports.agreementamsexport = function (client, projectno, projectname, fromdate, todate, servicecharge, wagetype, wageyear, wagearea, agreementstatus, optionaltype, agreementtype, agtype,sg, sgsalary, hsg, hsgsalary, dvr, dvrsalary, aso, asosalary, po, posalary, ja, jasalary, other, othersalary, oa, oasalary, gun, gunsalary, contactname, email, mobile, phone, gstno, tanno, panno, addressline1, addressline2, addressline3, district, taluk, state, country, region, departmenttype, department,  dept, designation, projectaddress1, projectaddress2, projectaddress3, pincode,amstatuss) {

	this.client = client;
	this.projectno = projectno;
	this.projectname = projectname;
	this.fromdate = fromdate;
	this.todate = todate;
	this.wagetype = wagetype;
	this.wageyear = wageyear;
	this.wagearea = wagearea;
	this.servicecharge = servicecharge;
	this.agreementstatus = agreementstatus;
	this.optionaltype = optionaltype;
	this.agreementtype = agreementtype;
	this.agtype = agtype;
	this.sg = sg;
	this.sgsalary = sgsalary;
	this.hsg = hsg;
	this.hsgsalary = hsgsalary;
	this.dvr = dvr;
	this.dvrsalary = dvrsalary;
	this.aso = aso;
	this.asosalary = asosalary;
	this.po = po;
	this.posalary = posalary;
	this.ja = ja;
	this.jasalary = jasalary;
	this.other = other;
	this.othersalary = othersalary;
	this.oa = oa;
	this.oasalary = oasalary;
	this.gun = gun;
	this.gunsalary = gunsalary;
	this.contactname = contactname;
	this.email = email;
	this.mobile = mobile;
	this.phone = phone;
	this.gstno = gstno;
	this.tanno = tanno;
	this.panno = panno;
	this.addressline1 = addressline1;
	this.addressline2 = addressline2;
	this.addressline3 = addressline3;
	this.district = district;
	this.taluk = taluk;
	this.state = state;
	this.country = country;
	this.region = region;
	this.departmenttype = departmenttype;
	this.department = department;
	this.dept = dept;
	this.designation = designation;
	this.projectaddress1 = projectaddress1;
	this.projectaddress2 = projectaddress2;
	this.projectaddress3 = projectaddress3;
	this.pincode = pincode;
	this.status = amstatuss;
}

module.exports.jobpostingExportdetail = function (projectno, projectname, organization, addressline1, addressline2, addressline3, district, region, jobmastercode, jobmastername, posteddate, numberofvacancies, filledvacancies, waitingvacancies, comments, inplace) {
	this.projectno = projectno;
	this.projectname = projectname;
	this.organization = organization;
	this.addressline1 = addressline1;
	this.addressline2 = addressline2;
	this.addressline3 = addressline3;
	this.district = district;
	this.region = region;
	this.jobmastercode = jobmastercode;
	this.jobmastername = jobmastername;
	this.posteddate = posteddate;
	this.numberofvacancies = numberofvacancies;
	this.filledvacancies = filledvacancies;
	this.waitingvacancies = waitingvacancies;
	this.comments = comments;
	this.inplace = inplace;
};

module.exports.getagreementvacancy = function (jobmasterid, numberofvacancies, amounts, jobname, jobmastercode) {
	this.jobmasterid = jobmasterid;
	this.amounts = amounts;
	this.jobmastercode = jobmastercode;
	this.jobname = jobname;
	this.numberofvacancies = numberofvacancies;
};

module.exports.getagreementprint = function (projectid, clientid, organization, contactname, addressline1, addressline2, addressline3, region, district, taluk, area, fromdate, todate, wageyear, wagetype, servicecharge, tax, effectivedate) {
	this.projectid = projectid;
	this.clientid = clientid;
	this.organization = organization;
	this.contactname = contactname;
	this.addressline1 = addressline1;
	this.addressline2 = addressline2;
	this.addressline3 = addressline3;
	this.region = region;
	this.district = district;
	this.taluk = taluk;
	this.area = area;
	this.fromdate = fromdate;
	this.todate = todate;
	this.wageyear = wageyear;
	this.wagetype = wagetype;
	this.servicecharge = servicecharge;
	this.tax = tax;
	this.effectivedate = effectivedate;
};
