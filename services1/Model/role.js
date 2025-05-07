module.exports.roles = function (roleid, name, description, permissions) {
    this.roleid = roleid;
    this.name = name;
    this.description = description;
    this.permissions = permissions;
};

module.exports.permissions = function (rolepermissionid, code, name, selected) {
    this.rolepermissionid = rolepermissionid;
    this.code = code;
    this.name = name;
    this.selected = selected;
};
