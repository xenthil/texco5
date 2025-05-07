module.exports.officer = function (officerid, name, designation, email, mobile, phone, address, other, active, changedby) {
    this.officerid = officerid;
    this.name = name;
    this.designation = designation;
    this.email = email;
    this.mobile = mobile;
    this.phone = phone;
    this.address = address;
    this.other = other;
    this.active = active;
    this.changedby = changedby;
};

module.exports.officerinfo = function (name, designation, email, mobile, phone, address, other, active, changedby) {
    this.name = name;
    this.designation = designation;
    this.email = email;
    this.mobile = mobile;
    this.phone = phone;
    this.address = address;
    this.other = other;
    this.active = active;
    this.changedby = changedby;
};
