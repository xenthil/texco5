


module.exports.dependent = function (dependent) {
	this.memberid = dependent.memberid;
	this.dependentName = dependent.dependentName;
	this.dateOfBirth = dependent.dateOfBirth;
	this.gender = dependent.depgender;
	this.mobileNumber = dependent.mobileNumber;
	this.aadharNumber = dependent.aadharNumber;
	
	this.educationalQualification = dependent.educationalQualification;
	this.technicalQualification = dependent.technicalQualification;
	this.specialSkills = dependent.specialSkills;
	this.trainingRequired = dependent.trainingRequired;
	this.documentPath=dependent.documentPath
};
module.exports.getdependent = function (dependent) {
	this.serviceno = dependent.serviceno;
	this.dependentId = dependent.dependentId;
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
	this.documentPath=dependent.documentPath;
	this.type=dependent.type;
	this.approvalStatus=dependent.approvalStatus;
};


module.exports.memberdep = function (member) {
	this.firstname = member.firstname;
	this.lastname = member.lastname;
	this.fathername = member.fathername;
	this.dob = member.dob;
	this.email = member.email;
	this.mobile = member.mobile;
	this.address = member.address;
	this.village = member.village;
	this.talukid = member.talukid;
	this.stateid = member.stateid;
	this.countryid = member.countryid;
	this.pincode = member.pincode;
	this.addressstatus = member.addressstatus;
	this.communicationaddress = member.communicationaddress;
	this.genderid = member.genderid;
	this.districtid = member.districtid;
	this.regionid = member.regionid;
	
	
	this.serviceno = member.serviceno;
	
};

module.exports.skillmember = function (skill) {
	
	this.memberid = skill.memberid;
	this.skillid = skill.skillid;
	this.trainingfor = skill.trainingfor;
	
};

module.exports.getmemberskill = function (skill) {
	this.memberskillid = skill.memberskillid;
	this.memberid = skill.memberid;
	this.skillid = skill.skillid;
	this.trainingfor = skill.trainingfor;
	
};
//genderid: '0',



