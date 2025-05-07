module.exports.member = function (firstname, lastname, fathername, dob, email, mobile, address, village, talukid, stateid, countryid, pincode, addressstatus, communicationaddress, aadhaarno, genderid, districtid, regionid, doj, accountno, nominee, nomineerelationid, rankid, corpsid, tradeid, esmidno, characterid, religionid, casteid, civilqual, armyqual, dependentstatus, dependentname, nationality, changedby, registrationno, serviceno, lastaccess, texcono, panno, uanno, branchcode, branchname, ifsccode) {
	this.firstname = firstname;
	this.lastname = lastname;
	this.fathername = fathername;
	this.dob = dob;
	this.email = email;
	this.mobile = mobile;
	this.address = address;
	this.village = village;
	this.talukid = talukid;
	this.stateid = stateid;
	this.countryid = countryid;
	this.pincode = pincode;
	this.addressstatus = addressstatus;
	this.communicationaddress = communicationaddress;
	this.aadhaarno = aadhaarno;
	this.genderid = genderid;
	this.districtid = districtid;
	this.regionid = regionid;
	this.doj = doj;
	this.accountno = accountno;
	this.nominee = nominee;
	this.nomineerelationid = nomineerelationid;
	this.rankid = rankid;
	this.corpsid = corpsid;
	this.tradeid = tradeid;
	this.esmidno = esmidno;
	this.characterid = characterid;
	this.religionid = religionid;
	this.casteid = casteid;
	this.civilqual = civilqual;
	this.armyqual = armyqual;
	this.dependentstatus = dependentstatus;
	this.dependentname = dependentname;
	this.nationality = nationality;
	this.changedby = changedby;
	this.registrationno = registrationno;
	this.serviceno = serviceno;
	this.lastaccess = lastaccess;
	this.texcono = texcono;
	this.panno = panno;
	this.uanno = uanno;
	this.branchcode = branchcode;
	this.branchname = branchname;
	this.ifsccode = ifsccode;
};

module.exports.register = function (memberid, attendid, changedby) {
	this.memberid = memberid;
	this.attendid = attendid;
	this.changedby = changedby;
};


module.exports.dependent = function (dependent) {
	this.memberid = dependent.memberid;
	this.dependentName = dependent.dependentName;
	this.dateOfBirth = dependent.dateOfBirth;
	this.gender = dependent.gender;
	this.mobileNumber = dependent.mobileNumber;
	this.aadharNumber = dependent.aadharNumber;
	
	this.educationalQualification = dependent.educationalQualification;
	this.technicalQualification = dependent.technicalQualification;
	this.specialSkills = dependent.specialSkills;
	this.trainingRequired = dependent.trainingRequired;
	this.documentPath=dependent.documentPath
};
//genderid: '0',



module.exports.memberinfoedit = function (memberid, registrationno, serviceno, texcono, age) {
	this.memberid = memberid;
	this.registrationno = registrationno;
	this.serviceno = serviceno;
	this.texcono = texcono;
	this.age = age;
};



module.exports.memberinfo = function (memberid, firstname, lastname, fathername, dob, email, mobile, address, village, talukid, stateid, countryid, pincode, addressstatus, communicationaddress, aadhaarno, genderid, districtid, regionid, doj, accountno, nominee, nomineerelationid, rankid, corpsid, tradeid, esmidno, characterid, religionid, casteid, civilqual, armyqual, dependentstatus, dependentname, nationality, changedby, registrationno, lastaccess, serviceno, texcono, taluk, state, country, nomineerelation, rank, corps, trade, district, region, character, religion, caste, active, jobstatus, projectno, name, code, category, panno, uanno, age, branchcode, branchname, ifsccode,applycount) {
	this.memberid = memberid;
	this.firstname = firstname;
	this.lastname = lastname;
	this.fathername = fathername;
	this.dob = dob;
	this.email = email;
	this.mobile = mobile;
	this.address = address;
	this.village = village;
	this.talukid = talukid;
	this.stateid = stateid;
	this.countryid = countryid;
	this.pincode = pincode;
	this.addressstatus = addressstatus;
	this.communicationaddress = communicationaddress;
	this.aadhaarno = aadhaarno;
	this.genderid = genderid;
	this.districtid = districtid;
	this.regionid = regionid;
	this.doj = doj;
	this.accountno = accountno;
	this.nominee = nominee;
	this.nomineerelationid = nomineerelationid;
	this.nomineerelation = nomineerelation;
	this.rankid = rankid;
	this.corpsid = corpsid;
	this.tradeid = tradeid;
	this.esmidno = esmidno;
	this.characterid = characterid;
	this.religionid = religionid;
	this.casteid = casteid;
	this.civilqual = civilqual;
	this.armyqual = armyqual;
	this.dependentstatus = dependentstatus;
	this.dependentname = dependentname;
	this.nationality = nationality;
	this.changedby = changedby;
	this.registrationno = registrationno;
	this.lastaccess = lastaccess;
	this.serviceno = serviceno;
	this.texcono = texcono;
	this.taluk = taluk;
	this.state = state;
	this.country = country;
	this.nomineerelation = nomineerelation;
	this.rank = rank;
	this.corps = corps;
	this.trade = trade;
	this.district = district;
	this.region = region;
	this.character = character;
	this.religion = religion;
	this.caste = caste;
	this.active = active;
	this.jobstatus = jobstatus;
	this.projectno = projectno;
	this.name = name;
	this.code = code;
	this.category = category;
	this.panno = panno;
	this.uanno = uanno;
	this.age = age;
	this.branchcode = branchcode;
	this.branchname = branchname;
	this.ifsccode = ifsccode;
	this.applycount=applycount;
};

module.exports.memberAbove58info = function (memberid,firstname, lastname, fathername, dob, age, email, mobile, communicationaddress, aadhaarno, address, nominee, accountno, nationality, esmidno, civilqual, armyqual, registrationno, serviceno, texcono, lastaccess, dependentstatus, dependentname, panno, uanno, branchcode, branchname, ifsccode) {

	this.memberid = memberid;
	this.firstname = firstname;
	this.lastname = lastname;
	this.fathername = fathername;
	this.dob = dob;
	this.age = age;
	this.email = email;
	this.mobile = mobile;
	this.address = address;
	this.communicationaddress = communicationaddress;
	this.aadhaarno = aadhaarno;
	this.accountno = accountno;
	this.nominee = nominee;
	this.esmidno = esmidno;
	this.civilqual = civilqual;
	this.armyqual = armyqual;
	this.dependentstatus = dependentstatus;
	this.dependentname = dependentname;
	this.nationality = nationality;
	this.registrationno = registrationno;
	this.lastaccess = lastaccess;
	this.serviceno = serviceno;
	this.texcono = texcono;
	this.panno = panno;
	this.uanno = uanno;
	this.branchcode = branchcode;
	this.branchname = branchname;
	this.ifsccode = ifsccode;
};

module.exports.allmember = function (memberid, firstname, serviceno, texcono, fathername, gender, dob, doj, email, mobile, address, village, taluk, district, state, country, pincode, communicationaddress, nominee, nomineerelation, rank, corps, trade, esmidno, character, religion, caste, civilqual, armyqual, nationality, dependentstatus, dependentname, lastaccess, accountno, panno, uanno, aadhaarno, accountno, pfno) {
	this.memberid = memberid;
	this.firstname = firstname;
	this.serviceno = serviceno;
	this.texcono = texcono;
	this.fathername = fathername;
	this.gender = gender;
	this.dob = dob;
	this.doj = doj;
	this.email = email;
	this.mobile = mobile;
	this.address = address;
	this.village = village;
	this.taluk = taluk;
	this.district = district;
	this.state = state;
	this.country = country;
	this.pincode = pincode;
	this.communicationaddress = communicationaddress;
	this.nominee = nominee;
	this.nomineerelation = nomineerelation;
	this.rank = rank;
	this.corps = corps;
	this.trade = trade;
	this.character = character;
	this.religion = religion;
	this.caste = caste;
	this.nationality = nationality;
	this.civilqual = civilqual;
	this.armyqual = armyqual;
	this.dependentstatus = dependentstatus;
	this.dependentname = dependentname;
	this.accountno = accountno;
	this.panno = panno;
	this.uanno = uanno;
	this.aadhaarno = aadhaarno;
	this.esmidno = esmidno;
	this.pfno = pfno;
	this.lastaccess = lastaccess;
	this.branchcode = branchcode;
	this.branchname = branchname;
	this.ifsccode = ifsccode;
};

module.exports.memberblock = function (memberid, reason, comment, enddate, ispfblock,blocktype,memberblock,changedby,isrepcoblock) {
	this.memberid = memberid;
	this.reason = reason;
	this.comment = comment;
	this.enddate = enddate;
	this.ispfblock = ispfblock;
	this.changedby = changedby;
	this.blocktype = blocktype;
	this.memberblocks = memberblock;
	this.isrepcoblock = isrepcoblock;
};

module.exports.getmemberblock = function (memberid, reason, comment, enddate, ispfblock, memberblockid, firstname, mobile, texcono, serviceno,isrepcoblock,lifetimeblock) {
	this.memberid = memberid;
	this.reason = reason;
	this.comment = comment;
	this.enddate = enddate;
	this.ispfblock = ispfblock;
	this.memberblockid = memberblockid;
	this.firstname = firstname;
	this.mobile = mobile;
	this.texcono = texcono;
	this.serviceno = serviceno;
	this.isrepcoblock = isrepcoblock;
	this.lifetimeblock = lifetimeblock;
};

module.exports.memberhistory = function (memberid, memberhistoryid, startdate, enddate, texcono, projectno, projectname, category, jobpsoting) {
	this.memberid = memberid;
	this.memberhistoryid = memberhistoryid;
	this.startdate = startdate;
	this.enddate = enddate;
	this.projectno = projectno;
	this.projectname = projectname;
	this.category = category;
	this.texcono = texcono;
	this.jobpsoting = jobpsoting;
};

module.exports.getmemberSearchlist = function (memberid, texcono, serviceno, mobile, firstname, dob) {
	this.memberid = memberid;
	this.texcono = texcono;
	this.serviceno = serviceno;
	this.mobile = mobile;
	this.firstname = firstname;
	this.dob = dob;
};

module.exports.getmemberHistorySearchlist = function (memberhistoryid, memberid, texcono, projectno, category, startdate, enddate, serviceno, name) {
	this.memberhistoryid = memberhistoryid;
	this.memberid = memberid;
	this.texcono = texcono;
	this.projectno = projectno;
	this.category = category;
	this.startdate = startdate;
	this.enddate = enddate;
	this.serviceno = serviceno;
	this.projectname = name;
};

module.exports.getmemberAppliedHistorylist = function (projectid, projectno, name, memberid, texcono, createdttm, serviceno) {
	this.projectid = projectid;
	this.memberid = memberid;
	this.texcono = texcono;
	this.projectno = projectno;
	this.createdttm = createdttm;
	this.serviceno = serviceno;
	this.projectname = name;
};

module.exports.memberinfoClosed = function (memberid, firstname, lastname, mobile, serviceno, texcono, active) {
	this.memberid = memberid;
	this.firstname = firstname;
	this.lastname = lastname;
	this.mobile = mobile;
	this.serviceno = serviceno;
	this.texcono = texcono;
	this.active = active;
};

module.exports.getmemberDataList = function (closedid, memberid, texcono, serviceno, firstname, applieddate, projectname, projectno, startdate, status) {
	this.closedid = closedid;
	this.memberid = memberid;
	this.texcono = texcono;
	this.serviceno = serviceno;
	this.firstname = firstname;
	this.applieddate = applieddate;
	this.projectname = projectname;
	this.projectno = projectno;
	this.startdate = startdate;
	this.status = status;
};


module.exports.region = function (region_id, region_name) {
	this.region_id = region_id;
	this.region_name = region_name;
};

module.exports.district = function (district_id, district_name) {
	this.district_id = district_id;
	this.district_name = district_name;
};

module.exports.taluk = function (taluk_id, taluk_name, district_id) {
	this.taluk_id = taluk_id;
	this.taluk_name = taluk_name;
	this.district_id = district_id;
};
