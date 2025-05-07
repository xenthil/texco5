var crypto=require("crypto");
var nconf= require("./EnvironmentUtil");
//var passwordHash=require("password-hash");

const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

var cryptoInfo={
//module.exports.hashSha256=function(secretKey,data)
            hashSha256 : function(data)
            {
              var secretKey=nconf.get("PASSWORD_HASH_KEY");
              return crypto.createHmac("sha256",secretKey).update(data).digest("hex");
            },

            encryptAes : function(data)
            {
              var cipher= crypto.createCipheriv(algorithm, Buffer.from(key), iv);
              var encryted = cipher.update(data);
              encryted = Buffer.concat([encryted, cipher.final()]);
              return encryted.toString('hex');
            },

            dercyptAes: function (data)
            {
              //let iv = Buffer.from(JSON.stringify(data.body.iv), 'hex');
              let encryptedText = Buffer.from(data, 'hex');
              let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
              let decrypted = decipher.update(encryptedText);
              decrypted = Buffer.concat([decrypted, decipher.final()]);
              return decrypted.toString();

            }

            /*module.exports.hashPassword=function(data)
            {
              return passwordHash.generate(data,{algorithm:'sha256',saltLength:10});
            }
            */
}
//Export the class
module.exports=cryptoInfo;
