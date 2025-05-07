module.exports.setting = function (settingid,code, description, value, changedby) {
	this.settingid = settingid;
    this.code = code;
    this.description = description;
    this.value = value;
    this.changedby = changedby;
};

module.exports.getsetting = function (settingid, code, description, value, active) {
    this.settingid = settingid;
    this.code = code;
    this.description = description;
    this.value = value;
    this.active = active;
};
