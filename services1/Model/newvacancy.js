



module.exports.newvacancy = function (vacancy) {
	
	this.memberid = vacancy.memberid;
	this.documentpath = vacancy.documentpath;
	//this.trainingfor = skill.trainingfor;
	
};


module.exports.newvacancyform = function (vacancy) {
	
	this.memberid = vacancy.memberid;
	this.preference = vacancy.preference;
	this.jobdistid = vacancy.jobdistrictid;
	this.anywhere = vacancy.anywhere;
	this.applyfor = vacancy.applyfor;
};

module.exports.newvacancymember = function (vacancy) {
	

	this.dateofdischarge = vacancy.dateofdischarge;
	//this.dateofdischarge = vacancy.dateofdischarge;
	this.aadhaarno = vacancy.aadhaarno;
	this.communicationaddress = vacancy.communicationaddress;
	this.mobile = vacancy.mobile;
	this.civilqual = vacancy.civilqual;
	this.additionalqualification = vacancy.additionalqualification;
	// this.aadhaarno = vacancy.aadhaarno;
	// this.aadhaarno = vacancy.aadhaarno;
	//this.trainingfor = skill.trainingfor;
	
};

module.exports.viewvacancypdf = function (vacancy) {
	
	this.vacancyid = vacancy.vacancyid;
	this.description = vacancy.description;
	this.vacancypdfpath = vacancy.vacancypdfpath;


	//this.trainingfor = skill.trainingfor;
	
};


module.exports.uploadnewvacancy = function (vacancy) {
	

	this.description = vacancy.description;
	this.vacancypdfpath = vacancy.vacancypdfpath;


	//this.trainingfor = skill.trainingfor;
	
};

module.exports.addjobactivity = function (job) {
	

	this.jobpostingdetailid = job.jobpostingdetailid;
	this.memberid = job.memberid;
	this.clientid = job.clientid;
	this.projectid = job.projectid;
	this.inplace = job.inplace;
	this.effectivedate = job.effectivedate;
	//this.memberid = job.memberid;
	//this.trainingfor = skill.trainingfor;

};





module.exports.getnewvacancypdf = function (vacancy) {

	this.description = vacancy.description;
	this.vacancypdfpath = vacancy.vacancypdfpath;
	this.vacancyid = vacancy.vacancyid;
	//this.trainingfor = skill.trainingfor;
	
};




module.exports.getseneriorityno = function (vacancy) {

	this.firstname = vacancy.firstname;
	this.serviceno = vacancy.serviceno;
	this.mobile = vacancy.mobile;
	this.applicationnumber=vacancy.applicationnumber
	this.region = vacancy.region;
	this.district = vacancy.district;
	this.uploadedtime=vacancy.uploadedtime
	
};



module.exports.getappliedvacancypdf = function (vacancy) {
	
	this.documentid = vacancy.documentid;
	this.applicationnumber = vacancy.applicationnumber;
	this.jobactivityid = vacancy.jobactivityid;
	
	this.memberid = vacancy.memberid;
	this.documentpath = vacancy.documentpath;
	this.uploadedtime = vacancy.uploadedtime;
	this.firstname = vacancy.firstname;
	this.serviceno = vacancy.serviceno;
	this.dob = vacancy.dob;
	this.mobile = vacancy.mobile;
	this.communicationaddress = vacancy.communicationaddress;
	this.aadhaarno = vacancy.aadhaarno;
	this.dateofdischarge = vacancy.dateofdischarge;
	this.civilqual = vacancy.civilqual;
	this.additionalqualification = vacancy.additionalqualification;
	this.preference = vacancy.preference;
	this.anywhere = vacancy.anywhere;
	this.region = vacancy.region;
	this.district = vacancy.description;
	this.jobstatus = vacancy.jobstatus;
	this.totunwill = vacancy.totunwill;
	
	
};



module.exports.getappliedvacancypdfdownload = function (vacancy) {
	
	this.sno = vacancy.sno;
	this.applicationno = vacancy.applicationno;
	this.memberid = vacancy.memberid;
	this.esmidno = vacancy.esmidno;
	this.uploadedtime = vacancy.uploadedtime;
	this.firstname = vacancy.firstname;
	this.serviceno = vacancy.serviceno;
	this.dob = vacancy.dob;
	this.mobile = vacancy.mobile;
	this.address = vacancy.address;
	this.village = vacancy.address2;
	this.taluk = vacancy.taluk;
	this.pincode = vacancy.pincode;
	this.applyfor = vacancy.applyfor;
	this.aadhaarno = vacancy.aadhaarno;
	this.dateofdischarge = vacancy.dateofdischarge;
	this.civilqual = vacancy.civilqual;
	this.additionalqualification = vacancy.additionalqualification;
	this.preference = vacancy.preference;
	this.anywhere = vacancy.anywhere;
	this.region = vacancy.region;
	this.district = vacancy.description;
	
	
};

module.exports.getvacancyproject = function (project) {
	this.projectid = projectid;
	this.clientid = clientid;
	this.projectno = projectno;
	this.name = name;
	this.districtid = districtid;
	this.district = district;
	this.regionid = regionid;
	this.region = region;
	this.statusid = statusid;
	this.projectstatus = projectstatus;
	this.designation = designation;
	this.addressline1 = addressline1;
	this.addressline2 = addressline2;
	this.addressline3 = addressline3;
	this.pincode = pincode;
	this.active = active;
	this.client = client;
	this.image = image;
	this.amstatus = amstatus;
	this.talukid = talukid;
	this.categoryid = categoryid;
	this.subcategoryid = subcategoryid;
	this.tallyname = tallyname;
	this.claimaddressline1  = claimaddressline1;
	this.claimaddressline2  = claimaddressline2;
	this.claimaddressline3 = claimaddressline3; 
	this.claimpincode = claimpincode;
	this.addressstatus = addressstatus;
	this.ismainproject=ismainproject;
	this.claimprojectnumber=claimprojectnumber;
	this.claimprojectname=claimprojectname;
};  

//genderid: '0',


module.exports.vacancynewjob = function (jobpostingdetailid, jobmasterid, code, name, numberofvacancies,available) {
	this.jobpostingdetailid = jobpostingdetailid;
	this.jobmasterid = jobmasterid;
	this.code = code;
	this.name = name;
	this.numberofvacancies = numberofvacancies;
	this.available = available;
 
}; 



module.exports.projectsnew = function (jobpostingid, projectid, projectno, projectname, clientid,jobs) {
	this.jobpostingid = jobpostingid;
	this.projectid = projectid;
	
	this.projectno = projectno;
	this.projectname = projectname;
	this.clientid = clientid;
	
	this.jobs = jobs;

	
}