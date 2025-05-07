
module.exports.categoryModel = function (category,jobmasterid) {
    this.category = category;
    this.jobmasterid = jobmasterid;

};

module.exports.wagetypeModel = function (wagetype,wagetypeid) {
    this.wagetype = wagetype;
    this.wagetypeid = wagetypeid;
};

module.exports.totalModel = function (heading, totalsg, totalhsg, totalaso, totalpo, totaldvr, totalja, totalgman, totaloa, totalother, totaltot) {
    this.heading = heading;
    this.totalsg = totalsg;
    this.totalhsg = totalhsg;
    this.totalaso = totalaso;
    this.totalpo = totalpo;
    this.totaldvr = totaldvr;
    this.totalja = totalja;
    this.totalgman = totalgman;
    this.totaloa = totaloa;
    this.totalother = totalother;
    this.totaltot = totaltot;
};


module.exports.cattype = function (categorytype, counts) {
    this.categorytype = categorytype;
    this.counts = counts;

};

module.exports.countarray = function (wagetype, cattype) {
    this.wagetype = wagetype;
    this.cattype = cattype;

};

module.exports.regionModel = function (region, description) {
    this.region = region;
    this.description = description;
};


module.exports.collectionModel = function (clientid, clientname, regionid,districtid,talukid,monthandyear,collectionamount,pendingamount) {
    this.clientid = clientid;
    this.clientname = clientname; 
    this.regionid = regionid;
    this.districtid = districtid;
    this.talukid = talukid;
    this.monthandyear = monthandyear;
    this.collectionamount = collectionamount;
    this.pendingamount = pendingamount;
};


module.exports.loginModel = function (firstname, lastname, email,mobile,texcono,servicenumber,logintime,logouttime,changedby) {
    this.firstname = firstname;
    this.lastname = lastname; 
    this.email = email;
    this.mobile = mobile;
    this.texcono = texcono;
    this.servicenumber = servicenumber;
    this.logintime = logintime;
    this.logouttime = logouttime;
    this.changedby = changedby;
};
module.exports.projectModel = function (pnumber, name, regionid,regionname) {
    this.pnumber = pnumber;
    this.name = name; 
    this.regionid = regionid;
    this.regionname = regionname;
};
 
module.exports.categoriesDetails = function(projectno, name, regionname, districtname,categories) {
    this.projectname = name;
    this.projectno = projectno; 
    this.regionname = regionname;
    this.districtname = districtname; 
    this.categories = categories;
} 

module.exports.categoriescountDetails = function(code,attendancestrength, agreementstrength, balancestrength) {
    this.attendancestrength = attendancestrength;
    this.agreementstrength = agreementstrength; 
    this.balancestrength = balancestrength;
    this.category = code;
} 


module.exports.getcatewisecount = function (description, contractcount, projectcount, membercount) {
    this.description = description;
    this.noofcontracts = contractcount;
    this.noofproject = projectcount;
    this.noofpersonnelemp = membercount;
}


module.exports.getdgrdetails = function (sno, subcategoryname, sgcount, hsgcount, asocount, pocount, dvrcount, jacount, gmancount, oacount, othercount, totalcount) {
    this.sno = sno;
    this.subcategoryname = subcategoryname;
    this.SG = sgcount;
    this.HSG = hsgcount;
    this.ASO = asocount;
    this.PO = pocount;
    this.DVR = dvrcount;
    this.JA = jacount;
    this.GMAN = gmancount;
    this.OA = oacount; 
    this.OTHER = othercount;
    this.TOTAL = totalcount;
}

module.exports.gettndetails = function (sno, subcategoryname, sgcount, hsgcount, asocount, pocount, dvrcount, jacount, gmancount, oacount, othercount, totalcount) {
    this.sno = sno;
    this.subcategoryname = subcategoryname;
    this.SG = sgcount;
    this.HSG = hsgcount;
    this.ASO = asocount;
    this.PO = pocount;
    this.DVR = dvrcount;
    this.JA = jacount;
    this.GMAN = gmancount;
    this.OA = oacount;
    this.TOTAL = totalcount;
}



module.exports.getmemberdet = function (clientid, firstname, lastname, category, projectno, name, description, count) {
    this.clientid = clientid;
    this.firstname = firstname;
    this.lastname = lastname;
    this.category = category;
    this.name = name;
    this.description = description;
    this.count = count;
}

module.exports.getdistrictcountdet = function (distcode, sgcount, hsgcount, asocount, pocount, dvrcount, jacount, gmancount, oacount, othercount, totalcount) {

    this.distcode = distcode;
    this.sgcount = sgcount;
    this.hsgcount = hsgcount;
    this.asocount = asocount;
    this.pocount = pocount;
    this.dvrcount = dvrcount;
    this.jacount = jacount;
    this.gmancount = gmancount;
    this.oacount = oacount;
    this.totalcount = totalcount;
}

module.exports.getprojectcountdet = function (projectno, name,district,region,sgcount, hsgcount, asocount, pocount, dvrcount, jacount, gmancount, oacount, othercount, totalcount) {
    this.PROJECTNO = projectno;
    this.PROJECTNAME = name;
    this.DISTRICT = district;
    this.REGION = region;
    this.SG = sgcount;
    this.HSG = hsgcount;
    this.ASO = asocount;
    this.PO = pocount;
    this.DVR = dvrcount;
    this.JA = jacount;
    this.GMAN = gmancount;
    this.OA = oacount; 
    this.OTHER = othercount;
    this.TOTAL = totalcount;
}

module.exports.getprojectwisenewtdet = function (PROJECTNO,PROJECTNAME,CLIENTNAME, sgcount, hsgcount, asocount, pocount, dvrcount, jacount, gmancount, oacount, othercount, totalcount) {

    this.PROJECTNO = PROJECTNO;
    this.PROJECTNAME = PROJECTNAME; 
    this.CLIENTNAME = CLIENTNAME;
    this.SG = sgcount;
    this.HSG = hsgcount;
    this.ASO = asocount;
    this.PO = pocount;
    this.DVR = dvrcount;
    this.JA = jacount;
    this.GMAN = gmancount;
    this.OA = oacount;
    this.OTHER  = othercount;
    this.TOTAL = totalcount;
} 
 
module.exports.getdeptwisecountlist = function (monthandyear,firstname,texcono,serviceno,category,projectno,projectname,region,strength) {
    this.MONTHANDYEAR = monthandyear; 
    this.NAME = firstname;
    this.TEXCONO = texcono;
    this.SERVICENO = serviceno;
    this.CATEGORY = category;
    this.PROJECTNO = projectno;
    this.PROJECTNAME = projectname;
    this.REGION = region;
    this.STRENGTH = strength; 
}


module.exports.getprojectwiseincdeccountdet = function (NAME, sgcount, hsgcount, asocount, pocount, dvrcount, jacount, gmancount, oacount, othercount, totalcount) {

    this.PROJECT = NAME; 
    this.SG = sgcount;
    this.HSG = hsgcount;
    this.ASO = asocount;
    this.PO = pocount;
    this.DVR = dvrcount;
    this.JA = jacount;
    this.GMAN = gmancount;
    this.OA = oacount;
    this.OTHER  = othercount;
    this.TOTAL = totalcount;
}

module.exports.getdistricttwiseincdeccountdet = function (distcode, sgcount, hsgcount, asocount, pocount, dvrcount, jacount, gmancount, oacount, othercount, totalcount) { 
    this.DISTRICT = distcode; 
    this.SG = sgcount;
    this.HSG = hsgcount;
    this.ASO = asocount;
    this.PO = pocount;
    this.DVR = dvrcount;
    this.JA = jacount;
    this.GMAN = gmancount;
    this.OA = oacount;
    this.OTHER  = othercount;
    this.TOTAL = totalcount;
}

module.exports.getsalaryprojectdet = function (projectno, name, monthandyear, payslipno, salarydate, sstotalmembers, sspresentdays, sseddays, ssnetpay, ssgrosspay, invoiceno, invoicedate, totalamount, atcount, atpresentdays, ateddays) 
{
    this.projectno = projectno;
    this.name = name;
    this.monthandyear = monthandyear;
    this.payslipno = payslipno;
    this.salarydate = salarydate;
    this.salarypersons = sstotalmembers;
    this.salarypresentdays = sspresentdays;
    this.salaryeddays = sseddays;
    this.salarynetpay = ssnetpay;
    this.salarygrosspay = ssgrosspay;
    this.invoiceno = invoiceno;
    this.invoicedate = invoicedate;
    this.invoicetotalamount = totalamount;
    this.invoicepersons = atcount;
    this.invoicepresentdays = atpresentdays;
    this.invoiceeddays = ateddays;
}

module.exports.getsalarymemberdet = function (texcono, firstname, lastname, presentdays, basic, eddays, edamount, ma, unifdt, leapay, bonus, washallow, gratuity, grossamount, netpay) {
    this.firstname = firstname; 
    this.serviceno = serviceno
    this.texcono = texcono;
    this.presentdays = presentdays;
    this.basic = basic;
    this.eddays = eddays;
    this.edamount = edamount;
    this.ma = ma;
    this.unifdt = unifdt;
    this.leapay = leapay;
    this.bonus = bonus;
    this.washallow = washallow;
    this.gratuity = gratuity;
    this.grossamount = grossamount;
    this.netpay = netpay;
}

module.exports.getmemberwisesalarycountlist = function (district,region,sgcount, hsgcount, asocount, pocount, dvrcount, jacount, gmancount, oacount, othercount, totalcount) {
    this.REGION = region;
    this.DISTRICT = district;
    this.SG = sgcount;
    this.HSG = hsgcount;
    this.ASO = asocount;
    this.PO = pocount;
    this.DVR = dvrcount;
    this.JA = jacount;
    this.GMAN = gmancount;
    this.OA = oacount; 
    this.OTHER = othercount;
    this.TOTAL = totalcount;
}
