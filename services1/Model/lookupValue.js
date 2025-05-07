module.exports.lookupitem = function(lkvalid, code, description, sortorder, active, linkid) {
    this.lkvalid = lkvalid;
    this.code = code;
    this.description = description;
    this.sortorder = sortorder;
    this.active = active;
    this.linkid = linkid;
};

module.exports.lookupvalues = function(lkdmncode, lookupvalues) {
    this.lkdmncode = lkdmncode;
    this.lookupvalues = lookupvalues;
}

module.exports.lookupdetails = function (lkvalid, code, description, sortorder, active, lookupitems) {
    this.lkvalid = lkvalid;
    this.code = code;
    this.description = description;
    this.sortorder = sortorder;
    this.active = active;
    this.lookupitems = lookupitems;
}

module.exports.CategoryValues = function (category_id, category_code, category_description, wageyearid, wagetypeid) {
    this.category_id = category_id;
    this.category_code = category_code;
    this.category_description = category_description;
    this.wageyearid = wageyearid;
    this.wagetypeid = wagetypeid;
}


module.exports.categoryitem = function(subcategoryid, subcategoryname, active,categoryname) {
    this.subcategoryid = subcategoryid;
    this.subcategoryname = subcategoryname;
    this.active = active;
    this.categoryname = categoryname;
};

module.exports.subcategoryitem = function(categoryid, categoryname, active, subvalues) {
    this.categoryid = categoryid;
    this.categoryname = categoryname;
    this.active = active;
    this.subvalues = subvalues;
} 

module.exports.MainCategoryValues = function(categoryid, maincategoryid , categoryname) {
    this.categoryid = categoryid;
    this.maincategoryid = maincategoryid;
    this.categoryname = categoryname;
}

module.exports.talukitem = function(districtid, districtcode, districtname, talukid, talukcode, talukname, regionmapid) {
    this.districtid = districtid;
    this.districtcode = districtcode;
    this.districtname = districtname;
    this.talukid = talukid;
    this.talukcode = talukcode;
    this.talukname = talukname;
    this.regionmapid = regionmapid;
}

module.exports.talukitemdetails = function(regionid, regioncode, regionname, lookupitems) {
    this.regionid = regionid;
    this.regioncode = regioncode;
    this.regionname = regionname;
    this.lookupitems = lookupitems;
}