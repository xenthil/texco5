module.exports.employee = function (employeeid, employeeno, firstname, lastname, regionid, region, desigid, desig, email, mobile, phone, doj, address, roleid, role, password, active, changedby) {
    this.employeeid = employeeid;
    this.employeeno = employeeno;
    this.firstname = firstname;
    this.lastname = lastname;
    this.regionid = regionid;
    this.region = region;
    this.desigid = desigid;
    this.desig = desig;
    this.email = email;
    this.mobile = mobile;
    this.phone = phone;
    this.doj = doj;
    this.address = address;
    this.roleid = roleid;
    this.role = role;
    this.password = password;
    this.active = active;
    this.changedby = changedby;
};

module.exports.empdetails = function (employeeno, firstname, lastname, username, fathername, dob, email, mobile, password, addressline1, addressline2, addressline3, talukid, stateid, countryid, doj, roleid, role, state, country, changedby) {
    this.employeeno = employeeno;
    this.firstname = firstname;
    this.lastname = lastname;
    this.username = username;
    this.fathername = fathername;
    this.dob = dob;
    this.email = email;
    this.mobile = mobile;
    this.password = password;
    this.addressline1 = addressline1;
    this.addressline2 = addressline2;
    this.addressline3 = addressline3;
    this.talukid = talukid;
    this.stateid = stateid;
    this.countryid = countryid;
    this.doj = doj;
    this.roleid = roleid;
    this.role = role;
    this.state = state;
    this.country = country;
    this.changedby = changedby;
};

module.exports.register = function (employeeid, attendid, changedby) {
    this.employeeid = employeeid;
    this.attendid = attendid;
    this.changedby = changedby;
};


module.exports.getemployee = function (employeeid, employeeno, firstname, lastname, username, fathername, dob, email, mobile, addressline1, addressline2, addressline3, stateid, state, countryid, country, doj, roleid, active) {
    this.employeeid = employeeid;
    this.employeeno = employeeno;
    this.firstname = firstname;
    this.lastname = lastname;
    this.username = username;
    this.fathername = fathername;
    this.dob = dob;
    this.email = email;
    this.mobile = mobile;
    this.addressline1 = addressline1;
    this.addressline2 = addressline2;
    this.addressline3 = addressline3;
    this.stateid = stateid;
    this.state = state;
    this.countryid = countryid;
    this.country = country;
    this.doj = doj;
    this.roleid = roleid;
    this.active = active;
};

module.exports.managers = function (employeeid, employeeno, firstname, lastname, regionid, region, desigid, desig, email, mobile, phone, address, roleid, role) {
    this.employeeid = employeeid;
    this.employeeno = employeeno;
    this.firstname = firstname;
    this.lastname = lastname;
    this.regionid = regionid;
    this.region = region;
    this.desigid = desigid;
    this.desig = desig;
    this.email = email;
    this.mobile = mobile;
    this.phone = phone;
    this.address = address;
    this.roleid = roleid;
    this.role = role;
};


