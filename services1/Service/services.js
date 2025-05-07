var files = require('require-dir')();

module.exports = function (app) {
    Object.keys(files).forEach(function (file) {
        require('./' + file)(app);
    });
}