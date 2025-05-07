module.exports.gallery = function (group, description, images) {
    this.group = group;
    this.description = description;
    this.images = images;
};

module.exports.group = function (galleryid, image) {
    this.galleryid = galleryid;
    this.image = image;
    
};

module.exports.galleryitem = function (group, description, changedby) {
    this.group = group;
    this.description = description;
    this.changedby = changedby;
};