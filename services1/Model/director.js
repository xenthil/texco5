module.exports.director = function (directorid, name, designation, dtitleid, email, mobile, phone, address, active, changedby, dtitle) {
    this.directorid = directorid;
    this.name = name;
    this.designation = designation;
    this.dtitleid = dtitleid;
    this.email = email;
    this.mobile = mobile;
    this.phone = phone;
    this.address = address;
    this.active = active;
    this.changedby = changedby;
    this.dtitle = dtitle;
};

module.exports.directorinfo = function (name, designation, dtitleid, email, mobile, phone, address, active, changedby) {
    this.name = name;
    this.designation = designation;
    this.dtitleid = dtitleid;
    this.email = email;
    this.mobile = mobile;
    this.phone = phone;
    this.address = address;
    this.active = active;
    this.changedby = changedby;
};
