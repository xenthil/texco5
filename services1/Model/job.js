module.exports.jobmaster = function (code, name, workinghours, monthlywages, servicecharge, servicetax, comments, changedby) {
	this.code = code;
	this.name = name;
	this.workinghours = workinghours;
	this.monthlywages = monthlywages;
	this.servicecharge = servicecharge;
	this.servicetax = servicetax;
	this.comments = comments;
	this.changedby = changedby;
};

module.exports.jobposting = function (clientid, projectid, jobs, changedby, startdate) {
	this.projectid = projectid;
	this.clientid = clientid;
	this.jobs = jobs;
	this.changedby = changedby;
	this.startdate = startdate;
};

module.exports.getjobmaster = function (jobmasterid, code, name, workinghours, monthlywages, servicecharge, servicetax, comments, active, vacancystatus, carryforwardstatus) {
	this.jobmasterid = jobmasterid;
	this.code = code;
	this.name = name;
	this.workinghours = workinghours;
	this.monthlywages = monthlywages;
	this.servicecharge = servicecharge;
	this.servicetax = servicetax;
	this.comments = comments;
	this.active = active;
	this.vacancystatus = vacancystatus;
	this.carryforwardstatus = carryforwardstatus;
};

module.exports.getjobposting = function (jobpostingid, clientid, organization, projectid, projectno, projectname, districtid, district, regionid, region, jobs, image,wagetype) {
	this.jobpostingid = jobpostingid;
	this.clientid = clientid;
	this.organization = organization;
	this.projectid = projectid;
	this.projectno = projectno;
	this.projectname = projectname;
	this.wagetype = wagetype;
	this.districtid = districtid;
	this.district = district;
	this.regionid = regionid;
	this.region = region;
	this.jobs = jobs;
	this.image = image;
	//this.startdate = startdate;
};       

module.exports.getjobpostingexport = function (jobpostingid, clientid, organization, projectid, projectno, projectname, districtid, district, regionid, region, jobs, image, wagetype) {
	this.jobpostingid = jobpostingid;
	this.clientid = clientid;
	this.organization = organization;
	this.projectid = projectid;
	this.projectno = projectno;
	this.projectname = projectname;
	this.wagetype = wagetype;
	this.districtid = districtid;
	this.district = district;
	this.regionid = regionid;
	this.region = region;
	this.jobs = jobs;
	this.image = image;
	//this.startdate = startdate;
};  

module.exports.jobs = function (jobpostingdetailid, jobmasterid, code, name, numberofvacancies, filledvacancies, waitingvacancies, comments, posteddate, inplace) {
	this.jobpostingdetailid = jobpostingdetailid;
	this.jobmasterid = jobmasterid;
	this.code = code;
	this.name = name;
	this.numberofvacancies = numberofvacancies;
	this.filledvacancies = filledvacancies;
	this.waitingvacancies = waitingvacancies;
	this.comments = comments;
	this.posteddate = posteddate;
	this.inplace = inplace;
};

module.exports.jobactivity = function (jobpostingdetailid, memberid, clientid, projectid, currentvacancies, jobstatuscode, texcono, registrationno, effectivedate, changedby) {
	this.jobpostingdetailid = jobpostingdetailid;
	this.memberid = memberid;
	this.clientid = clientid;
	this.projectid = projectid;
	this.currentvacancies = currentvacancies;
	this.jobstatuscode = jobstatuscode;
	this.texcono = texcono;
	this.registrationno = registrationno;
	this.effectivedate = effectivedate;
	this.changedby = changedby;
};

module.exports.jobactivityinfo = function (jobactivityid, jobpostingid, memberid, ondate) {
	this.jobactivityid = jobactivityid;
	this.jobpostingid = jobpostingid;
	this.memberid = memberid;
	this.ondate = ondate;
};

module.exports.joblist = function (code, projectno, name, area, district, numberofvacancies, posteddate) {
	this.code = code;
	this.projectno = projectno;
	this.name = name;
	this.area = area;
	this.district = district;
	this.numberofvacancies = numberofvacancies;
	this.posteddate = posteddate;
};

module.exports.alljoblist = function (clientid, image, organization, addressline1, addressline2, addressline3, projects) {
	this.clientid = clientid;
	this.image = image;
	this.organization = organization;
	this.addressline1 = addressline1;
	this.addressline2 = addressline2;
	this.addressline3 = addressline3;
	this.projects = projects
};

module.exports.projects = function (jobpostingid, projectid, wagetype, projectno, projectname, districtid, district, regionid, region, jobs, total, designation, projadd1, projadd2, projadd3, pincode) {
	this.jobpostingid = jobpostingid;
	this.projectid = projectid;
	this.wagetype = wagetype;
	this.projectno = projectno;
	this.projectname = projectname;
	this.districtid = districtid;
	this.district = district;
	this.regionid = regionid;
	this.region = region;
	this.jobs = jobs;
	this.total = total;
	this.designation = designation;
	this.projadd1 = projadd1;
	this.projadd2 = projadd2;
	this.projadd3 = projadd3;
	this.pincode = pincode;
}

module.exports.jobpostingdetail = function (jobpostingid, jobpostingdetailid, numberofvacancies, filledvacancies, waitingvacancies, comments, posteddate, clientid, organization, addressline1, addressline2, addressline3, projectid, projectno, projectname, jobmasterid, code, name, regionid, region, districtid, district, inplace) {
	this.jobpostingid = jobpostingid;
	this.jobpostingdetailid = jobpostingdetailid;
	this.numberofvacancies = numberofvacancies;
	this.filledvacancies = filledvacancies;
	this.waitingvacancies = waitingvacancies;
	this.comments = comments;
	this.posteddate = posteddate;
	this.clientid = clientid;
	this.organization = organization;
	this.addressline1 = addressline1;
	this.addressline2 = addressline2;
	this.addressline3 = addressline3;
	this.projectid = projectid;
	this.projectno = projectno;
	this.projectname = projectname;
	this.regionid = regionid;
	this.region = region;
	this.districtid = districtid;
	this.district = district;
	this.jobmasterid = jobmasterid;
	this.code = code;
	this.name = name;
	this.inplace = inplace;
};

module.exports.jobpostingdetails = function (jobpostingid, jobmasterid, numberofvacancies, filledvacancies, waitingvacancies, comments, posteddate, startdate, enddate) {
	this.jobpostingid = jobpostingid;
	this.jobmasterid = jobmasterid;
	this.numberofvacancies = numberofvacancies;
	this.filledvacancies = filledvacancies;
	this.waitingvacancies = waitingvacancies;
	this.comments = comments;
	this.posteddate = posteddate;
	this.startdate = startdate;
	this.enddate = enddate;
};

module.exports.jobapplied = function (jobactivityid, jobpostingid, jobpostingdetailid, memberid, firstname, lastname, texcono, dob, serviceno, clientid, client, addrees1, addrees2, addrees3, projectid, projectno, projectname, districtid, regionid, projectno, districtid, district, regionid, region, currentvacancies, jobstatuscode, jobstatus, newtexcono, jobmasterid, jobcode, jobname, monthlywages, workinghours, servicecharge, servicetax, effectivedate, trade, registrationno, inplace, comments, postinginplace, isrejected) {

	this.jobactivityid = jobactivityid;
	this.jobpostingid = jobpostingid;
	this.jobpostingdetailid = jobpostingdetailid;
	this.memberid = memberid;
	this.firstname = firstname;
	this.lastname = lastname;
	this.texcono = texcono;
	this.dob = dob;
	this.serviceno = serviceno;
	this.clientid = clientid;
	this.client = client;
	this.addrees1 = addrees1;
	this.addrees2 = addrees2;
	this.addrees3 = addrees3;
	this.projectid = projectid;
	this.projectno = projectno;
	this.projectname = projectname;
	this.districtid = districtid;
	this.district = district;
	this.regionid = regionid;
	this.region = region;
	this.currentvacancies = currentvacancies;
	this.jobstatuscode = jobstatuscode;
	this.jobstatus = jobstatus;
	this.newtexcono = newtexcono;
	this.jobmasterid = jobmasterid;
	this.jobname = jobname;
	this.jobcode = jobcode;
	this.monthlywages = monthlywages;
	this.workinghours = workinghours;
	this.servicecharge = servicecharge;
	this.servicetax = servicetax;
	this.effectivedate = effectivedate;
	this.trade = trade;
	this.registrationno = registrationno;
	this.inplace = inplace;
	this.comments = comments;
	this.postinginplace = postinginplace;
	this.isrejected = isrejected;
};


module.exports.exportvacancy = function (client, projectno, projectname, region, district, sg, hsg, dvr, aso, po, ja, other, oa, gun, sgcomments, hsgcomments, dvrcomments, asocomments, pocomments, jacomments, oacomments, guncomments, othercomments, startdate, sginplace, hsginplace, dvrinplace, asoinplace, poinplace, jainplace, oainplace, guninplace, otherinplace) {
	this.client = client;
	this.projectno = projectno;
	this.projectname = projectname;
	this.region = region;
	this.district = district;
	this.sg = sg;
	this.hsg = hsg;
	this.dvr = dvr;
	this.aso = aso;
	this.po = po;
	this.ja = ja;
	this.oa = oa;
	this.gun = gun;
	this.other = other;
	this.sgcomments = sgcomments;
	this.hsgcomments = hsgcomments;
	this.dvrcomments = dvrcomments;
	this.asocomments = asocomments;
	this.pocomments = pocomments;
	this.jacomments = jacomments;
	this.oacomments = oacomments;
	this.guncomments = guncomments;
	this.othercomments = othercomments;
	this.startdate = startdate;
	this.sginplace = sginplace;
	this.hsginplace = hsginplace;
	this.dvrinplace = dvrinplace;
	this.asoinplace = asoinplace;
	this.poinplace = poinplace;
	this.jainplace = jainplace;
	this.oainplace = oainplace;
	this.guninplace = guninplace;
	this.otherinplace = otherinplace;
};

module.exports.jobprint = function (memberid, texcono, newtexcono, registrationno, serviceno, firstname, lastname, fathername, dob, joiningdate, lastaccess, effectivedate, email, mobile, communicationaddress, address, village, talukid, stateid, districtid, countryid, taluk, district, state, country, pincode, aadhaarno, civilqual, armyqual, tradeid, trade, rankid, rank, corps, esmidno, nominee, nomineerelationid, nomineerelation, experience, history, ammobile, applied, inplace, othercat, panno, isrejected) {
	this.memberid = memberid;
	this.texcono = texcono;
	this.newtexcono = newtexcono;
	this.registrationno = registrationno;
	this.serviceno = serviceno;
	this.firstname = firstname;
	this.lastname = lastname;
	this.fathername = fathername;
	this.dob = dob;
	this.joiningdate = joiningdate;
	this.lastaccess = lastaccess;
	this.effectivedate = effectivedate;
	this.email = email;
	this.mobile = mobile;
	this.communicationaddress = communicationaddress;
	this.address = address;
	this.village = village;
	this.talukid = talukid;
	this.stateid = stateid;
	this.districtid = districtid;
	this.countryid = countryid;
	this.district = district;
	this.taluk = taluk;
	this.state = state;
	this.country = country;
	this.pincode = pincode;
	this.aadhaarno = aadhaarno;
	this.esmidno = esmidno;
	this.civilqual = civilqual;
	this.armyqual = armyqual;
	this.corps = corps;
	this.tradeid = tradeid;
	this.trade = trade;
	this.rankid = rankid;
	this.rank = rank;
	this.nominee = nominee;
	this.nomineerelationid = nomineerelationid;
	this.nomineerelation = nomineerelation;
	this.experience = experience;
	this.history = history;
	this.ammobile = ammobile;
	this.applied = applied;
	this.inplace = inplace;
	this.othercat = othercat;
	this.panno = panno;
	this.isrejected = isrejected;
};

module.exports.postedlist = function (jobactivityid, jobpostingid, jobpostingdetailid, memberid, firstname, lastname, registrationno, texcono, serviceno, rank, mobile, clientid, projectid, projectno, projectname, districtid, district, regionid, region, newtexcono, jobmasterid, posteddate, category) {
	this.jobactivityid = jobactivityid;
	this.jobpostingid = jobpostingid;
	this.jobpostingdetailid = jobpostingdetailid;
	this.memberid = memberid;
	this.firstname = firstname;
	this.lastname = lastname;
	this.registrationno = registrationno;
	this.texcono = texcono;
	this.serviceno = serviceno;
	this.rank = rank;
	this.mobile = mobile;
	this.clientid = clientid;
	this.projectid = projectid;
	this.projectno = projectno;
	this.projectname = projectname;
	this.districtid = districtid;
	this.district = district;
	this.regionid = regionid;
	this.region = region;
	this.newtexcono = newtexcono;
	this.jobmasterid = jobmasterid;
	this.posteddate = posteddate;
	this.category = category;
};

module.exports.vacancydetails = function (jobpostingid, jobmasterid, posteddate, numberofvacancies, filledvacancies, waitingvacancies, close, closedate) {
	this.jobpostingid = jobpostingid;
	this.jobmasterid = jobmasterid;
	this.posteddate = posteddate;
	this.numberofvacancies = numberofvacancies;
	this.filledvacancies = filledvacancies;
	this.waitingvacancies = waitingvacancies;
	this.close = close;
	this.closedate = closedate;
};

module.exports.clientvacancydetails = function (jobpostingid, jobmasterid, posteddate, numberofvacancies, filledvacancies, waitingvacancies, close, closedate, clientid, organization) {
	this.jobpostingid = jobpostingid;
	this.jobmasterid = jobmasterid;
	this.posteddate = posteddate;
	this.numberofvacancies = numberofvacancies;
	this.filledvacancies = filledvacancies;
	this.waitingvacancies = waitingvacancies;
	this.close = close;
	this.closedate = closedate;
	this.clientid = clientid;
	this.organization = organization;
};

module.exports.jobvacant = function (jobpostingdetailid, jobmasterid, jobmastercode, name, numberofvacancies, startdate) {
	this.jobpostingdetailid = jobpostingdetailid;
	this.jobmasterid = jobmasterid;
	this.jobmastercode = jobmastercode;
	this.name = name;
	this.numberofvacancies = numberofvacancies;
	this.startdate = startdate;
};

module.exports.duties = function (clientid, projectid, projectno, projectname,ismainproject, monthandyear, totalduties, invoiceno, subtotal, servicecharge, tax, servicecharges, servicetax, total,edseperate,taxtype,allowancetype1,allowancevalue1,allowancetype2,allowancevalue2,allowancetype3,allowancevalue3,createddate, addressline1, addressline2, addressline3, pincode, designation, status, datedon, drivers) {
	this.clientid = clientid;
	this.projectid = projectid;
	this.designation = designation;
	this.projectno = projectno;
	this.projectname = projectname;
	this.ismainproject = ismainproject;
	this.addressline1 = addressline1;
	this.addressline2 = addressline2;
	this.addressline3 = addressline3;
	this.pincode = pincode;
	this.monthandyear = monthandyear;
	this.totalduties = totalduties;
	this.invoiceno = invoiceno;
	this.subtotal = subtotal;
	this.servicecharge = servicecharge;
	this.tax = tax;
	this.servicecharges = servicecharges;
	this.servicetax = servicetax;
	this.total = total;
	this.edseperate=edseperate;
	this.taxtype=taxtype;
	this.allowancetype1=allowancetype1;
	this.allowancevalue1=allowancevalue1;
	this.allowancetype2=allowancetype2;
	this.allowancevalue2=allowancevalue2;
	this.allowancetype3=allowancetype3;
	this.allowancevalue3=allowancevalue3;
	this.createddate = createddate;
	this.status = status;
	
	this.datedon = datedon;
	this.drivers = drivers;
	
};

module.exports.dutiesprint = function (clientid, projectid, projectno, projectname, monthandyear, totalduties, invoiceno, subtotal, servicecharge, tax, servicecharges, servicetax, total, createddate, addressline1, addressline2, addressline3, pincode, designation, printcount, invoiceid, invoicetype,gstno,edseperate,taxtype,allowancetype1,allowancevalue1,allowancetype2,allowancevalue2,allowancetype3,allowancevalue3,) {
	this.clientid = clientid;
	this.projectid = projectid;
	this.designation = designation;
	this.projectno = projectno;
	this.projectname = projectname;
	this.addressline1 = addressline1;
	this.addressline2 = addressline2;
	this.addressline3 = addressline3;
	this.pincode = pincode;
	this.monthandyear = monthandyear;
	this.totalduties = totalduties;
	this.invoiceno = invoiceno;
	this.subtotal = subtotal;
	this.servicecharge = servicecharge;
	this.tax = tax;
	this.servicecharges = servicecharges;
	this.servicetax = servicetax;
	this.total = total;
	this.createddate = createddate;
	this.printcount = printcount;
	this.invoiceid = invoiceid;
	this.invoicetype = invoicetype;
	this.gstno = gstno;
	this.edseperate = edseperate;
	this.taxtype=taxtype;
	this.allowancetype1=allowancetype1;
	this.allowancevalue1=allowancevalue1;
	this.allowancetype2=allowancetype2;
	this.allowancevalue2=allowancevalue2;
	this.allowancetype3=allowancetype3;
	this.allowancevalue3=allowancevalue3;
};



module.exports.totalduties = function (jobmasterid, jobmastercode, name, noofduties, servicecharge, tax, othours, presentdays, eddays, empcount) {
	this.jobmasterid = jobmasterid;
	this.jobmastercode = jobmastercode;
	this.name = name;
	this.noofduties = noofduties;
	this.othours = othours;
	this.servicecharge = servicecharge;
	this.tax = tax;
	this.presentdays = presentdays;
	this.eddays = eddays;
	this.empcount = empcount;
};

module.exports.attendance = function (projectid, monthandyear) {
	this.projectid = projectid;
	this.monthandyear = monthandyear;
};

module.exports.invoice = function (jobmasterid, jobmastercode, name, salary, noofduties, salaryamount, noofperson, days,clientid,projectid,monthandyear,eddays, salaryedamount) {
	this.jobmasterid = jobmasterid;
	this.jobmastercode = jobmastercode;
	this.name = name;
	this.salary = salary;
	this.noofduties = noofduties;
	this.salaryamount = salaryamount;
	this.noofperson = noofperson;
	this.days = days;
	this.clientid = clientid;
	this.projectid = projectid;
	this.monthandyear = monthandyear;
	this.eddays = eddays;
	this.salaryedamount = salaryedamount;
};

module.exports.invoicess = function (jobmasterid, code, name, salary, noofduties, salaryamount, noofperson, days, projectno,projectname,ismainaddress,claimprojectnumber,claimprojectname,eddays,salaryedamount,dvrjob) {
	this.jobmasterid = jobmasterid;
	this.jobmastercode = code;
	this.name = name;
	this.salary = salary;
	this.noofduties = noofduties;
	this.salaryamount = salaryamount;
	this.noofperson = noofperson;
	this.days = days;
	this.projectno = projectno;
	this.projectname = projectname;
	this.ismainaddress=ismainaddress;
	this.claimprojectnumber=claimprojectnumber;
	this.claimprojectname=claimprojectname;
	this.eddays=eddays;
	this.salaryedamount=salaryedamount;
	this.dvrjob=dvrjob;
}

module.exports.dvrDetails = function (projectno, texcono,firstname) {
	this.projectno = projectno;
	this.texcono = texcono;
	this.firstname=firstname;
};

module.exports.invoiceCombine = function (jobmasterid, jobmastercode, name, salary, noofduties, salaryamount, noofperson, days, clientid, projectid) {
	this.jobmasterid = jobmasterid;
	this.jobmastercode = jobmastercode;
	this.name = name;
	this.salary = salary;
	this.noofduties = noofduties;
	this.salaryamount = salaryamount;
	this.noofperson = noofperson;
	this.days = days;
	this.clientid = clientid;
	this.projectid = projectid;
};
module.exports.log = function (projectno, status) {
	this.projectno = projectno;
	this.status = status;
};

module.exports.closedate = function (closedate) {
	this.closedate = closedate;
};

module.exports.invoicereport = function (clientid, client, projectid, projectname, projectno, monthandyear, invoiceno, subtotal, servicecharge, tax, servicecharges, servicetax, total, createddate, jobmasterid, jobmastercode, name, salary, noofduties, salaryamount, noperson) {
	this.clientid = clientid;
	this.client = client;
	this.projectid = projectid;
	this.projectname = projectname;
	this.projectno = projectno;
	this.monthandyear = monthandyear;
	this.invoiceno = invoiceno;
	this.subtotal = subtotal;
	this.servicecharge = servicecharge;
	this.tax = tax;
	this.servicecharges = servicecharges;
	this.servicetax = servicetax;
	this.total = total;
	this.createddate = createddate;
	this.jobmasterid = jobmasterid;
	this.jobmastercode = jobmastercode;
	this.name = name;
	this.salary = salary;
	this.noofduties = noofduties;
	this.salaryamount = salaryamount;
	this.noperson = noperson;
};

module.exports.jobappliedreport = function (firstname, texcono, serviceno, projectno, projectname, jobstatus, jobcode, lastaccess, doj, history, experience, registrationno, memberid, lastsixmonth, applieddate, ipaddress, isrejected, mobile, region, district,dob,rank) { 
	
    this.registrationno = registrationno;
    this.name = firstname;
    this.texcono = texcono;
    this.serviceno = serviceno;
	this.mobile = mobile;
	this.dob = dob;
	this.rank = rank;
    this.projectno = projectno;
    this.projectname = projectname;
    this.region = region; 
    this.district = district;
	//this.wagetype = wagetype;
    this.category = jobcode;
    this.jobstatus = jobstatus;
    this.DOJ = doj;
    this.lastaccess = lastaccess;
    this.history = history;
    this.experience = experience;
    this.lastoneyear = lastsixmonth;
    this.memberid = memberid;
    this.applieddate = applieddate;
    this.ipaddress = ipaddress;
	this.isrejected = isrejected; 
};

module.exports.jobconfirmedreport = function (firstname, texcono, serviceno, client, projectname, address1, address2, address3, projectno, jobstatus, jobcode, jobname, lastaccess, doj, memberid, jobactivityid) {
	this.name = firstname;
	this.texcono = texcono;
	this.serviceno = serviceno;
	this.lastaccess = lastaccess;
	this.DOJ = doj;
	this.projectno = projectno;
	this.client = client;
	this.projectname = projectname;
	this.address1 = address1;
	this.address2 = address2;
	this.address3 = address3;
	this.category = jobcode;
	this.jobstatus = jobstatus;
	this.memberid = memberid;
	this.jobactivityid = jobactivityid;
};

module.exports.experience = function (memberid, history, experience, last6month) {
	this.memberid = memberid;
	this.history = history;
	this.experience = experience;
	this.last6month = last6month;
};

module.exports.postedlistreport = function (sno, registrationno, texcono, serviceno, rank, name, fathername, dob, nominee, mobile, address, region, state, country, esmidno, civilqual, armyqual, dependentname, corps, trade, character, religion, caste, projectno, projectname, am, projectdistrict, posteddate, category, aadhaarno) {
	this.sno = sno;
	this.registrationno = registrationno;
	this.texcono = texcono;
	this.serviceno = serviceno;
	this.rank = rank;
	this.name = name;
	this.fathername = fathername;
	this.dob = dob;
	this.nominee = nominee;
	this.mobile = mobile;
	this.address = address;
	this.region = region;
	this.state = state;
	this.country = country;
	this.esmidno = esmidno;
	this.civilqual = civilqual;
	this.armyqual = armyqual;
	this.dependentname = dependentname;
	this.corps = corps;
	this.trade = trade;
	this.character = character;
	this.religion = religion;
	this.caste = caste;
	this.projectno = projectno;
	this.projectname = projectname;
	this.am = am;
	this.projectdistrict = projectdistrict;
	this.posteddate = posteddate;
	this.category = category;
	this.aadhaarno = aadhaarno;
};

module.exports.applied = function (sno, clientid, client, projectid, projectno, projectname, designation, proadd1, proadd2, proadd3, propincode, proregionid, proregion, prodistrictid, prodistrict, propincode, category, jobmasterid, jobname, jobstatus, currentvacancies) {
	this.sno = sno;
	this.clientid = clientid;
	this.client = client;
	this.projectid = projectid;
	this.projectno = projectno;
	this.projectname = projectname;
	this.designation = designation;
	this.proadd1 = proadd1;
	this.proadd2 = proadd2;
	this.proadd3 = proadd3;
	this.proregionid = proregionid;
	this.proregion = proregion;
	this.prodistrictid = prodistrictid;
	this.prodistrict = prodistrict;
	this.propincode = propincode;
	this.jobmasterid = jobmasterid;
	this.category = category;
	this.jobname = jobname;
	this.jobstatus = jobstatus;
	this.currentvacancies = currentvacancies;
};

module.exports.carryforwardjob = function (carryforwardid, jobmasterid, code, name, numberofvacancies, comments, inplace, vacancystatus, carryforwardstatus) {
	this.carryforwardid = carryforwardid;
	this.jobmasterid = jobmasterid;
	this.code = code;
	this.name = name;
	this.numberofvacancies = numberofvacancies;
	this.comments = comments;
	this.inplace = inplace; 
	this.vacancystatus = vacancystatus;
	this.carryforwardstatus = carryforwardstatus;
};  


module.exports.movevacancy = function (jobmasterid, jobcode, jobmastername, numberofvacancies, inplace, comments) {
	this.jobmasterid = jobmasterid;
	this.code = jobcode;
	this.name = jobmastername;
	this.numberofvacancies = numberofvacancies;
	this.comments = comments;
	this.inplace = inplace; 
};  

module.exports.vacancyjob = function (jobpostingdetailid, jobmasterid, code, name, numberofvacancies, filledvacancies,waitingvacancies,comments, posteddate, inplace, vacancystatus, carryforwardstatus) {
	this.jobpostingdetailid = jobpostingdetailid;
	this.jobmasterid = jobmasterid;
	this.code = code;
	this.name = name;
	this.numberofvacancies = numberofvacancies;
	this.filledvacancies = filledvacancies;
	this.waitingvacancies = waitingvacancies;
	this.comments = comments;
	this.posteddate = posteddate;
	this.inplace = inplace;
	this.vacancystatus = vacancystatus;
	this.carryforwardstatus = carryforwardstatus; 
}; 


module.exports.forwardvacancy = function (client, projectno, projectname, region, district, jobs, startdate,clientid,projectid) {
	this.CLIENT = client;
	this.PROJECTNO = projectno;
	this.PROJECTNAME = projectname;
	this.REGION = region;
	this.DISTRICT = district; 
	this.jobs = jobs;
	this.startdate = startdate;
	this.clientid = clientid; 
	this.projectid = projectid
	// this.SG = sg;
	// this.HSG = hsg;
	// this.DVR = dvr;
	// this.ASO = aso;
	// this.PO = po;
	// this.JA = ja;
	// this.OA = oa;
	// this.GUN = gun;
	// this.OTHER = other;
	// this.SGCOMMENTS = sgcomments;
	// this.HSGCOMMENTS = hsgcomments;
	// this.DVRCOMMENTS = dvrcomments;
	// this.ASOCOMMENTS = asocomments;
	// this.POCOMMENTS = pocomments;
	// this.JACOMMENTS = jacomments;
	// this.OACOMMENTS = oacomments;
	// this.GUNCOMMENTS = guncomments;
	// this.OTHERCOMMENTS = othercomments;
	// this.SGINPLACE = sginplace;
	// this.HSGINPLACE = hsginplace;
	// this.DVRINPLACE = dvrinplace;
	// this.ASOINPLACE = asoinplace;
	// this.POINPLACE = poinplace;
	// this.JAINPLACE = jainplace;
	// this.OAINPLACE = oainplace;
	// this.GUNINPLACE = guninplace;
	// this.OTHERINPLACE = otherinplace;

};

module.exports.salarymember = function (memberid, firstname, texcono, serviceno, wagetype, wageyear, clientname, projectno, projectname, attendancemonth, jobocode, jobname, projectid, clientid, attendanceid, jobpostingdetailid, jobmasterid, wagetypeid, wageyearid, wageareaid, presentdays, eddays, othours, wagecategoryid, salarycomponents) {
	this.memberid = memberid;
	this.firstname = firstname;
	this.texcono = texcono;
	this.serviceno = serviceno;
	this.wagetype = wagetype;
	this.wageyear = wageyear;
	this.clientname = clientname;
	this.projectno = projectno;
	this.projectname = projectname;
	this.attendancemonth = attendancemonth;
	this.jobpostingdetailid = jobpostingdetailid;
	this.jobmasterid = jobmasterid;
	this.wagetypeid = wagetypeid;
	this.wageyearid = wageyearid;
	this.wageareaid = wageareaid;
	this.jobcode = jobocode;
	this.jobname = jobname;
	this.projectid = projectid;
	this.clientid = clientid;
	this.attendanceid = attendanceid;
	this.presentdays = presentdays;
	this.eddays = eddays;
	this.othours = othours;
	this.salarycomponents = salarycomponents;
	this.wagecategoryid = wagecategoryid;
};


module.exports.Arrearsalarymember = function (memberid, wagetypeid, wageyearid, monthandyear, projectid, clientid, attendanceid, jobpostingdetailid, jobmasterid, wageareaid, presentdays, eddays, othours, wagecategoryid, salarycomponents, salaryslipid, type, difference) {

	this.memberid = memberid;
	this.attendancemonth = monthandyear;
	this.jobpostingdetailid = jobpostingdetailid;
	this.jobmasterid = jobmasterid;
	this.wagetypeid = wagetypeid;
	this.wageyearid = wageyearid;
	this.wageareaid = wageareaid;
	this.projectid = projectid;
	this.clientid = clientid;
	this.attendanceid = attendanceid;
	this.presentdays = presentdays;
	this.eddays = eddays;
	this.othours = othours;
	this.salarycomponents = salarycomponents;
	this.wagecategoryid = wagecategoryid;
	this.salaryslipid = salaryslipid;
	this.type = type;
	this.difference = difference;
};

module.exports.salarycomponents = function (edamount, ncbasic, basic, da, hra, cca, ma, epf, edli, admchr, bonus, gratuity, unifdt, leapay, conveyance, washallow, lic, other1, other2, ratehd, gross, netpay, otherallowance,otherdeductions) {
	this.edamount = edamount;
	this.ncbasic = ncbasic;
	this.basic = basic;
	this.da = da;
	this.hra = hra;
	this.cca = cca;
	this.ma = ma;
	this.epf = epf;
	this.edli = edli;
	this.admchr = admchr;
	this.bonus = bonus;
	this.gratuity = gratuity;
	this.unifdt = unifdt;
	this.leapay = leapay;
	this.conveyance = conveyance;
	this.washallow = washallow;
	this.lic = lic;
	this.other1 = other1;
	this.other2 = other2;
	this.ratehd = ratehd;
	this.gross = gross;
	this.netpay = netpay;
	this.otherallowance = otherallowance;
	this.otherdeductions = otherdeductions;
};

module.exports.getsalarydetail = function (salaryslipid, memberid, accountno, firstname, serviceno, texcono, jobcode, jobname, projectid, clientid, clientname, projectno, projectname, designation, addressline1, addressline2, addressline3, pincode, wagetype, wageyear, monthandyear, presentdays, othours, basic, da, hra, cca, ma, epf, edli, admchr, bonus, gratuity, unifdt, leapay, conveyance, washallow, lic, other1, other2, ratehd, ncbasic, eddays, edamount, uanno, panno, payslipno, gross, netpay, ss_print_count, pf_print_count,otherallowance, otherdeductions, ssid) {
	this.salaryslipid = salaryslipid;
	this.memberid = memberid;
	this.firstname = firstname;
	this.accountno = accountno;
	this.serviceno = serviceno;
	this.uanno = uanno;
	this.panno = panno;
	this.texcono = texcono;
	this.jobcode = jobcode;
	this.jobname = jobname;
	this.projectid = projectid;
	this.clientid = clientid;
	this.clientname = clientname;
	this.projectno = projectno;
	this.projectname = projectname;
	this.designation = designation;
	this.addressline1 = addressline1;
	this.addressline2 = addressline2;
	this.addressline3 = addressline3;
	this.pincode = pincode;
	this.wagetype = wagetype;
	this.wageyear = wageyear;
	this.monthandyear = monthandyear;
	this.presentdays = presentdays;
	this.othours = othours;
	this.basic = basic;
	this.da = da;
	this.hra = hra;
	this.cca = cca;
	this.ma = ma;
	this.epf = epf;
	this.edli = edli;
	this.admchr = admchr;
	this.bonus = bonus;
	this.gratuity = gratuity;
	this.unifdt = unifdt;
	this.leapay = leapay;
	this.conveyance = conveyance;
	this.washallow = washallow;
	this.lic = lic;
	this.other1 = other1;
	this.other2 = other2;
	this.ratehd = ratehd;
	this.ncbasic = ncbasic;
	this.eddays = eddays;
	this.edamount = edamount;
	this.payslipno = payslipno;
	this.gross = gross;
	this.netpay = netpay;
	this.ssprintcount = ss_print_count;
	this.pfprintcount = pf_print_count;
	this.otherallowance = otherallowance;
	this.otherdeductions = otherdeductions;
	this.ssid = ssid;
};

module.exports.getsalarydetail1 = function (salaryslipid, memberid, accountno, firstname, serviceno, texcono, jobcode, jobname, projectid, clientid, clientname, projectno, projectname, designation, addressline1, addressline2, addressline3, pincode, wagetype, wageyear, monthandyear, presentdays, othours, basic, da, hra, cca, ma, epf, edli, admchr, bonus, gratuity, unifdt, leapay, conveyance, washallow, lic, other1, other2, ratehd, ncbasic, eddays, edamount, uanno, panno, payslipno, gross, netpay, ss_print_count, pf_print_count,otherallowance, otherdeductions,salorg) {
	this.salaryslipid = salaryslipid;
	this.memberid = memberid;
	this.firstname = firstname;
	this.accountno = accountno;
	this.serviceno = serviceno;
	this.uanno = uanno;
	this.panno = panno;
	this.texcono = texcono;
	this.jobcode = jobcode;
	this.jobname = jobname;
	this.projectid = projectid;
	this.clientid = clientid;
	this.clientname = clientname;
	this.projectno = projectno;
	this.projectname = projectname;
	this.designation = designation;
	this.addressline1 = addressline1;
	this.addressline2 = addressline2;
	this.addressline3 = addressline3;
	this.pincode = pincode;
	this.wagetype = wagetype;
	this.wageyear = wageyear;
	this.monthandyear = monthandyear;
	this.presentdays = presentdays;
	this.othours = othours;
	this.basic = basic;
	this.da = da;
	this.hra = hra;
	this.cca = cca;
	this.ma = ma;
	this.epf = epf;
	this.edli = edli;
	this.admchr = admchr;
	this.bonus = bonus;
	this.gratuity = gratuity;
	this.unifdt = unifdt;
	this.leapay = leapay;
	this.conveyance = conveyance;
	this.washallow = washallow;
	this.lic = lic;
	this.other1 = other1;
	this.other2 = other2;
	this.ratehd = ratehd;
	this.ncbasic = ncbasic;
	this.eddays = eddays;
	this.edamount = edamount;
	this.payslipno = payslipno;
	this.gross = gross;
	this.netpay = netpay;
	this.ssprintcount = ss_print_count;
	this.pfprintcount = pf_print_count;
	this.otherallowance = otherallowance;
	this.otherdeductions = otherdeductions;
	this.salorg = salorg;
};
module.exports.getdrivers = function (memberid, firstname, texcono) {
	this.memberid = memberid;
	this.firstname = firstname;
	this.texcono = texcono;
};

module.exports.exportslips = function (accountno, netpay,type) {
	this.accountno = accountno;
	this.netpay = netpay;
	this.type = type;
};


module.exports.projsum = function (projectno, totalstrengh,monthandyear,totalamountproj) {
	this.projectno = projectno;
	this.totalstrengh = totalstrengh;
	this.monthandyear = monthandyear;
	this.totalamountproj = totalamountproj;
};

module.exports.memberpay = function (exportslip, total) {
	this.exportslip = exportslip;
	this.total = total;
};
module.exports.memberpay1 = function (exportslip, total,projs) {
	this.exportslip = exportslip;
	this.total = total;
	this.projs = projs;
};

module.exports.jobpostingorderedit = function (texcono,firstname,lastname,serviceno,projectno,projectname,memberid,memberhistoryid,projectid,category,districtid,district,regionid,region,enddate,startdate,difference,rank,jobmasterid,lastaccess) {
	this.texcono = texcono;
	this.firstname = firstname;
	this.lastname = lastname;
	this.serviceno = serviceno;
	this.projectno = projectno;
	this.projectname = projectname;
	this.memberid = memberid;
	this.memberhistoryid = memberhistoryid;
	this.projectid = projectid;
	this.category = category;
	this.districtid = districtid;
	this.district = district;
	this.regionid = regionid;
	this.region = region;
	this.enddate = enddate;
	this.startdate = startdate;
	this.difference = difference;
	this.rank = rank;
	this.jobmasterid = jobmasterid;
	this.lastaccess = lastaccess;
};


module.exports.dues = function (attendanceid, clientid, projectid, organization, projectname, projectno, jobpostingdetailid, memberid, firstname,
	monthandyear, status, presentdays, othours, jobmasterid, code, name, invoiceid, invoiceno, totalamount, changedby) {
	this.attendanceid = attendanceid;
	this.clientid = clientid;
	this.projectid = projectid;
	this.organization = organization;
	this.projectname = projectname;
	this.projectno = projectno;
	this.jobpostingdetailid = jobpostingdetailid;
	this.memberid = memberid;
	this.firstname = firstname;
	this.monthandyear = monthandyear;
	this.status = status;
	this.presentdays = presentdays;
	this.othours = othours;
	this.jobmasterid = jobmasterid;
	this.code = code;
	this.name = name;
	this.invoiceid = invoiceid;
	this.invoiceno = invoiceno;
	this.totalamount = totalamount;
	this.changedby = changedby;
};

module.exports.duedetails = function (dueid, clientid, projectid, monthandyear, invoiceid, invoiceno, dueopening, duepaid, duepending, paiddate, active, changedby) {
	this.dueid = dueid;
	this.clientid = clientid;
	this.projectid = projectid;
	this.monthandyear = monthandyear;
	this.invoiceid = invoiceid;
	this.invoiceno = invoiceno;
	this.dueopening = dueopening;
	this.duepaid = duepaid;
	this.duepending = duepending;
	this.paiddate = paiddate;
	this.active = active;
	this.changedby = changedby;
};


module.exports.exporttally = function (clientid, projectid, monthandyear, invoiceid, invoiceno,
	clientid, organization, contactname, districtid, district, talukid, taluk, stateid, state, countryid, country,
	projectno, name, designation, addressline1, addressline2, addressline3, pincode, statusid, status,
	servicecharge, tax, servicecharges, servicetax, subtotal, totalamount,
	jobmasterid, salary, noofduties, days, noofperson, salaryamount,
	code, name1, changedby, dueopening, paid, duepending, createddate, taxtype) {
	this.clientid = clientid;
	this.projectid = projectid;
	this.monthandyear = monthandyear;
	this.invoiceid = invoiceid;
	this.invoiceno = invoiceno;
	this.clientid = clientid;
	this.organization = organization;
	this.contactname = contactname;
	this.districtid = districtid;
	this.district = district;
	this.talukid = talukid;
	this.taluk = taluk;
	this.stateid = stateid;
	this.state = state;
	this.countryid = countryid;
	this.country = country;
	this.projectno = projectno;
	this.name = name;
	this.designation = designation;
	this.addressline1 = addressline1;
	this.addressline2 = addressline2;
	this.addressline3 = addressline3;
	this.pincode = pincode;
	this.statusid = statusid;
	this.status = status;
	this.servicecharge = servicecharge;
	this.tax = tax;
	this.servicecharges = servicecharges;
	this.servicetax = servicetax;
	this.subtotal = subtotal;
	this.totalamount = totalamount;
	this.jobmasterid = jobmasterid;
	this.salary = salary;
	this.noofduties = noofduties;
	this.days = days;
	this.noofperson = noofperson;
	this.salaryamount = salaryamount;
	this.code = code;
	this.name1 = name1;
	this.changedby = changedby;
	this.dueopening = dueopening;
	this.paid = paid;
	this.duepending = duepending;
	this.createddate = createddate;
	this.taxtype = taxtype;
};

module.exports.OverDue = function (date, refno, partyname, openingamount, pendingamount, dueon, overduedays) {
	this.date = date;
	this.refno = refno;
	this.partyname = partyname;
	this.openingamount = openingamount;
	this.pendingamount = pendingamount;
	this.dueon = dueon;
	this.overduedays = overduedays;
};

module.exports.getAuthorizeList = function (projectid, clientid, clientname, projectno, projectname, monthandyear, currentstatus, jobmasterid, duties, status, invoiceno, bill_type, arrearstatus,payslipno, edstatus,sal_cashier_rejected,sal_cao_rejected,att_cashier_rejected,att_cao_rejected,inv_cashier_rejected,inv_cao_rejected,salaryslipid,fksalaryslipid,agtype) {
	this.projectid = projectid;
	this.clientid = clientid;
	this.clientname = clientname;
	this.projectno = projectno;
	this.projectname = projectname;
	this.monthandyear = monthandyear;
	this.currentstatus = currentstatus;
	this.jobmasterid = jobmasterid;
	this.duties = duties;
	this.status = status;
	this.invoiceno = invoiceno;
	this.bill_type = bill_type;
	this.arrearstatus = arrearstatus;
	this.payslipno = payslipno;
	this.edstatus = edstatus;
	this.sal_cashier_rejected = sal_cashier_rejected;
	this.sal_cao_rejected = sal_cao_rejected;
	this.att_cashier_rejected = att_cashier_rejected;
	this.att_cao_rejected = att_cao_rejected;
	this.inv_cashier_rejected = inv_cashier_rejected;
	this.inv_cao_rejected = inv_cao_rejected;
	this.salaryslipid = salaryslipid;
	this.fksalaryslipid = fksalaryslipid;
	this.agtype = agtype;
};

module.exports.getAuthorizedCashierList = function (projectid, projectno, clientid, projectname, monthandyear, memberscount, netsalary, payslipno, members, currentstatus, status, invoiceno, passorderno, arrearstatus, bill_type, invoiceid,sal_cashier_rejected,sal_cao_rejected,att_cashier_rejected,att_cao_rejected,inv_cashier_rejected,inv_cao_rejected) {
	
	this.projectid = projectid;
	this.projectno = projectno;
	this.clientid = clientid;
	this.projectname = projectname;
	this.monthandyear = monthandyear;
	this.memberscount = memberscount;
	this.netsalary = netsalary;
	this.payslipno = payslipno;
	this.members = members;
	this.currentstatus = currentstatus;
	this.status = status;
	this.invoiceno = invoiceno;
	this.passorderno = passorderno;
	this.arrearstatus = arrearstatus;
	this.bill_type = bill_type;
	this.invoiceid = invoiceid;
	this.sal_cashier_rejected = sal_cashier_rejected;
	this.sal_cao_rejected = sal_cao_rejected;
	this.att_cashier_rejected = att_cashier_rejected;
	this.att_cao_rejected = att_cao_rejected;
	this.inv_cashier_rejected = inv_cashier_rejected;
	this.inv_cao_rejected = inv_cao_rejected;
};

module.exports.getAuthorizedMembersList = function (memberid, texcono, firstname, accountno, branchname, netpay,attendanceid,monthandyear) {
	this.memberid = memberid;
	this.texcono = texcono;
	this.firstname = firstname;
	this.accountno = accountno;
	this.branchname = branchname;
	this.netpay = netpay;
	this.attendanceid = attendanceid;
	this.monthandyear = monthandyear;
};


module.exports.getCombinedClaimsProjectsList = function (categoryname, projectno, projectname, projectid, clientid, monthandyear, duties, status) {
	this.categoryname = categoryname;
	this.projectno = projectno;
	this.projectname = projectname;
	this.projectid = projectid;
	this.clientid = clientid;
	this.monthandyear = monthandyear;
	this.duties = duties;
	this.status = status;
};

module.exports.exportslipsReports = function (projectno, texcono, firstname, noofrepeat, accountno, netpay) {
	this.projectno = projectno;
	this.texcono = texcono;
	this.firstname = firstname;
	this.accountno = accountno;
	this.noofrepeat = noofrepeat;
	this.netpay = netpay;
};

module.exports.Claiminvoice = function (clientid, projectid, jobmasterid, particularamount, noofduties, salaryamount, noofperson, days, monthandyear,invoiceid,eddays,salaryedamount) {
	this.jobmasterid = jobmasterid;
	this.salary = particularamount;
	this.noofduties = noofduties;
	this.salaryamount = salaryamount;
	this.noofperson = noofperson;
	this.days = days;
	this.clientid = clientid;
	this.projectid = projectid;
	this.monthandyear = monthandyear;
	this.invoiceid = invoiceid;
	this.eddays=eddays;
	this.salaryedamount=salaryedamount;
};

module.exports.Claimduties = function (clientid, projectid, monthandyear, totalduties, gross, servicecharge, tax, servicecharges, servicetax, total, invoiceid) {
	this.clientid = clientid;
	this.projectid = projectid;
	this.monthandyear = monthandyear;
	this.totalduties = totalduties;
	this.subtotal = gross;
	this.servicecharge = servicecharge;
	this.tax = tax;
	this.servicecharges = servicecharges;
	this.servicetax = servicetax;
	this.total = total;
	this.invoiceid = invoiceid;
};

module.exports.getSalarySlipList = function (payslipno, projectno, projectname, salaryslipid, salaryslipdate, categoryname, projectid, clientid, duties, status, monthandyear, ssprintcount, pfprintcount, billtype) {
	this.payslipno = payslipno;
	this.projectno = projectno;
	this.projectname = projectname;
	this.salaryslipid = salaryslipid;
	this.salaryslipdate = salaryslipdate;
	this.categoryname = categoryname;
	this.projectid = projectid;
	this.clientid = clientid;
	this.duties = duties;
	this.status = status;
	this.monthandyear = monthandyear;
	this.ssprintcount = ssprintcount;
	this.pfprintcount = pfprintcount;
	this.billtype = billtype;
};

module.exports.getInvoiceList = function (invoiceno, categoryname, projectno, projectname, projectid, clientid, invoicedate, printcount, totalamount, invoiceid, monthandyear, noofduties, noofperson, duties, invoicestatus, type, invoicetype) {
	this.invoiceno = invoiceno;
	this.projectno = projectno;
	this.projectname = projectname;
	this.invoiceid = invoiceid;
	this.invoicedate = invoicedate;
	this.categoryname = categoryname;
	this.projectid = projectid;
	this.clientid = clientid;
	this.duties = duties;
	this.status = invoicestatus;
	this.monthandyear = monthandyear;
	this.printcount = printcount;
	this.totalamount = totalamount;
	this.noofduties = noofduties;
	this.noofperson = noofperson;
	this.type = type;
	this.invoicetype = invoicetype;
};


module.exports.getinvoicelistdetail = function (monthandyear,jobmasterid,jobcode,jobname,noofduties,noofperson,revisedsalary,revisedrate,newinvoiceno,oldinvoiceno,oldsalary,oldrate,servicecharge,tax,clientid,organization,contactname,addressline1,addressline2,addressline3,pincode,projectno,projectname,StartDate, EndDate, invoicedate,diffamount,designation) {
	this.monthandyear = monthandyear;
	this.newinvoiceno = newinvoiceno;
	this.projectno = projectno;
	this.projectname = projectname;
	this.jobmasterid = jobmasterid;
	this.jobcode = jobcode;
	this.jobname = jobname;
	this.oldsalary = oldsalary;
	this.oldrate = oldrate;
	this.revisedrate = revisedrate;
	this.revisedsalary = revisedsalary;
	this.oldinvoiceno = oldinvoiceno;
	this.servicecharge = servicecharge;
	this.tax = tax;
	this.noofduties = noofduties;
	this.noofperson = noofperson;
	this.clientid = clientid;
	this.clientname = organization;
	this.contactname = contactname;
	this.addressline1 = addressline1;
	this.addressline2 = addressline2;
	this.addressline3 = addressline3;
	this.pincode = pincode;
	this.StartDate = StartDate;
	this.EndDate = EndDate;
	this.invoicedate = invoicedate;
	this.diffamount = diffamount;
	this.designation = designation;
};

module.exports.exportEPFDetails = function (uanno, firstname, lastname, grossamount, epf, edli, presentdays) {
	this.uanno = uanno;
	this.firstname = firstname;
	this.lastname = lastname;
	this.grossamount = grossamount;
	this.epf = epf;
	this.edli = edli;
	this.presentdays = presentdays;
};

module.exports.attendancereview = function (attendanceid, memberid, firstname, texcono, jobpostingdetailid, presentdays, eddays, othours, status, edhold, clientid, projectid, monthandyear, code, category, serviceno, ishold, jobmasterid, accountno, athold, reason,isedhold) {

	this.attendanceid = attendanceid;
	this.memberid = memberid;
	this.firstname = firstname;
	this.texcono = texcono;
	this.serviceno = serviceno;
	this.jobpostingdetailid = jobpostingdetailid;
	this.presentdays = presentdays;
	this.eddays = eddays;
	this.othours = othours;
	this.status = status;
	this.edhold = edhold;
	this.clientid = clientid;
	this.projectid = projectid;
	this.monthandyear = monthandyear;
	this.code = code;
	this.category = category;
	this.ishold = ishold;
	this.jobmasterid = jobmasterid;
	this.accountno = accountno;
	this.athold = athold;
	this.reasondetails = reason;
	this.isedhold = isedhold;
};

