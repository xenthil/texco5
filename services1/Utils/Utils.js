var random = require("random-js")();

module.exports.GenerateEmail = function() {
    var rand = random.integer(1, 100000);
    return "Email_" + rand + "@TestCase.com";
};
module.exports.GeneratePassword = function() {
    var rand = random.integer(1, 100000);
    return "Password_" + rand;
};
module.exports.GenerateMobileNo = function() {
    var rand = random.integer(1, 100000);
    return rand;
};

module.exports.GenerateAddress = function() {
    var rand = random.integer(1, 1000000);
    return "Adddress_" + rand;
};

module.exports.GenerateVerifCode = function() {
    var rand = random.integer(1, 1000000);
    return rand;
};
