module.exports.getdocument = function (documentid, name, icon, iconcolour, documentname, description, changedby,issgt, ispf, iswage,folderid,foldername) { 
    this.documentid = documentid;
    this.name = name;
    this.icon = icon;
    this.iconcolour = iconcolour;
    this.documentname = documentname;
    this.description = description;
    this.changedby = changedby;
    // this.isgst = isgst;
    // this.ispf = ispf;
    // this.iswage = iswage;
    this.folderid = folderid;
    this.foldername = foldername;
}; 

module.exports.document = function (name, icon, iconcolour, documentname, description, changedby, folderid,foldername) {
    this.name = name;
    this.icon = icon;
    this.iconcolour = iconcolour;
    this.documentname = documentname;
    this.description = description;
    this.changedby = changedby;
    this.folderid = folderid;
    this.foldername = foldername;
    // this.isgst = isgst;
    // this.ispf = ispf;
    // this.iswage = iswage;
};