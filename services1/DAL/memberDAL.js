var app = require('./../app');
var multiline = require('multiline');
var memberModel = require('./../Model/member');
var mySqlConnection = require('./MySqlHelper');
var nconf = require('./../Utils/EnvironmentUtil');
var fs = require("fs"); 
var filepaths = nconf.get('VACANCYERRORURL');
var stream = fs.createWriteStream(filepaths, {'flags': 'a'}); 
var moment = require('moment');
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const dayjs = require("dayjs");

module.exports.createmember = function (member) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            con.query('INSERT INTO member SET ?', member).then(function (rows, fields) {
                resolve({
                    "memberid": rows.insertId
                })
            }).catch(function (err) {
                reject(err);
            });
        }).catch(function (err) {
            reject(err);
        });
    });
}

module.exports.createDependent = function (member) {
    console.log('asd',member);
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            con.query('INSERT INTO member_dependent SET ?', member).then(function (rows, fields) {
                resolve({
                    "memberid": rows.insertId
                })
            }).catch(function (err) {
                reject(err);
            });
        }).catch(function (err) {
            reject(err);
        });
    });
}

module.exports.updatemember = function (member, memberid) {
    //console.log('UPDATE member SET',member,'WHERE memberid=',memberid);
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            con.query('UPDATE member SET ? WHERE memberid= ?', [member, memberid]).then(function (rows, fields) {
                resolve({
                    "memberid": memberid
                })
            }).catch(function (err) {
                reject(err);
            });
        }).catch(function (err) {
            reject(err);
        });
    });
}

module.exports.updatememberstatus = function (memberid) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            con.query('UPDATE member SET active = 0 WHERE memberid= ?', [memberid]).then(function (rows, fields) {
                resolve({
                    "memberid": memberid
                })
            }).catch(function (err) {
                reject(err);
            });
        }).catch(function (err) {
            reject(err);
        });
    });
}

module.exports.getmemberStatus = function (memberid) 
{
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            var query = multiline.stripIndent(function () {
                /*
                    SELECT
                        m.dependentstatus,
                        m.dependentname,
                        m.memberid,
                        m.rankid,
                        lv5.description AS 'rank',
                        m.casteid,
                        YEAR(CURDATE()) - YEAR(m.dob) - (DATE_FORMAT(CURDATE(), '%m%d') < DATE_FORMAT(m.dob, '%m%d')) AS diff_year
                    FROM member m
                    LEFT JOIN lookupvalue lv5 ON
                        lv5.lkvalid = m.rankid
                    AND lv5.active = 1
                    WHERE memberid = ?
                */
            });
            con.query(query, [memberid]).then(function (rows, fields) {
                resolve(rows);
            }).catch(function (err) {
                reject(err);
            });
        }).catch(function (err) {
            reject(err);
        });
    });
}

module.exports.CheckBlockedMembers = function (memberid) 
{
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            var query = multiline.stripIndent(function () {
                /*
                    SELECT 
                        m.memberblockid,
                        m.memberid,
                        count(*) as memcount,
                        DATEDIFF(m.enddate,NOW()) AS curdates,
                        m.isrepcoblock
                    FROM memberblock m WHERE active = 1 AND m.memberid = ? 
                */
            });
            con.query(query, [memberid]).then(function (rows, fields) {
                resolve(rows);
            }).catch(function (err) {
                reject(err);
            });
        }).catch(function (err) {
            reject(err);
        });
    });
}

module.exports.getmember = function (memberid) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            var query = multiline.stripIndent(function () {
                /*
              SELECT
              	m.memberid,
              	m.firstname,
              	m.lastname,
              	m.fathername,
              	DATE_FORMAT(m.dob,'%d %b %Y') AS dob,
              	m.email,
              	m.mobile,
                m.addressstatus,
                m.communicationaddress,
                m.aadhaarno,
              	m.address,
              	m.stateid,
              	lv2.description AS 'state',
              	m.countryid,
              	lv3.description AS 'country',
                m.nominee,
                m.nomineerelationid,
                lv4.description AS 'nomineerelation',
                m.rankid,
                lv5.description AS 'rank',
                m.corpsid,
                lv6.description AS 'corps',
                m.tradeid,
                lv7.description AS 'trade',
                m.village,
              	m.talukid,
                lv9.description AS 'taluk',
                m.districtid,
                lv10.description AS 'district',
                m.regionid,
                lv11.description AS 'region',
                m.characterid,
                lv12.description AS 'character',
                m.religionid,
                lv13.description AS 'religion',
                m.casteid,
                lv14.description AS 'caste',
                m.pincode,
                m.genderid,
                DATE_FORMAT(m.doj,'%d %b %Y') AS doj,
                m.accountno,
                m.nationality,
                m.esmidno,
                m.civilqual,
                m.armyqual,
                m.registrationno,
                m.serviceno,
                m.texcono,
                m.lastaccess,
                m.dependentstatus,
                m.dependentname,
                m.panno,
                m.uanno,
                FLOOR((DATEDIFF(NOW(),m.dob) / 365.25)) AS age,
                m.active,
                m.branchcode,
                m.branchname,
                m.ifsccode,
                (select count(*) from member_applydoc where  memberid = ? ) as applycount

              FROM member m

              LEFT JOIN lookupvalue lv2 ON
                  lv2.lkvalid = m.stateid
              AND lv2.active = 1

              LEFT JOIN lookupvalue lv3 ON
                  lv3.lkvalid = m.countryid
              AND lv3.active = 1

              LEFT JOIN lookupvalue lv4 ON
                  lv4.lkvalid = m.nomineerelationid
              AND lv4.active = 1
              
              LEFT JOIN lookupvalue lv5 ON
                  lv5.lkvalid = m.rankid
              AND lv5.active = 1

              LEFT JOIN lookupvalue lv6 ON
                  lv6.lkvalid = m.corpsid
              AND lv6.active = 1
                 
              LEFT JOIN lookupvalue lv7 ON
                  lv7.lkvalid = m.tradeid
              AND lv7.active = 1
                                 
              LEFT JOIN lookupvalue lv9 ON
                  lv9.lkvalid = m.talukid
              AND lv9.active = 1    
               
              LEFT JOIN lookupvalue lv10 ON
                lv10.lkvalid = m.districtid
              AND lv10.active = 1
               
              LEFT JOIN lookupvalue lv11 ON
                lv11.lkvalid = m.regionid
              AND lv11.active = 1 
              
              LEFT JOIN lookupvalue lv12 ON
                lv12.lkvalid = m.characterid
              AND lv12.active = 1   
                                 
              LEFT JOIN lookupvalue lv13 ON
                lv13.lkvalid = m.religionid
              AND lv13.active = 1 
                                 
              LEFT JOIN lookupvalue lv14 ON
                lv14.lkvalid = m.casteid
              AND lv11.active = 1 
                                                                                                      
              WHERE m.active = 1
              AND case ? when 0 then 1 = 1 else m.memberid = ? end
              ORDER by m.firstname;

            */
            });

            
            con.query(query, [memberid,memberid, memberid]).then(function (rows, fields) {
                console.log(query);
                var rowsReturned = rows.length;
                var result = [];
                if (rowsReturned > 0) {
                    for (var i = 0; i < rowsReturned; i++) {
                        var member = new memberModel.memberinfo(rows[i].memberid, rows[i].firstname, rows[i].lastname, rows[i].fathername, rows[i].dob, rows[i].email, rows[i].mobile, rows[i].address, rows[i].village, rows[i].talukid, rows[i].stateid, rows[i].countryid, rows[i].pincode, rows[i].addressstatus, rows[i].communicationaddress, rows[i].aadhaarno, rows[i].genderid, rows[i].districtid, rows[i].regionid, rows[i].doj, rows[i].accountno, rows[i].nominee, rows[i].nomineerelationid, rows[i].rankid, rows[i].corpsid, rows[i].tradeid, rows[i].esmidno, rows[i].characterid, rows[i].religionid, rows[i].casteid, rows[i].civilqual, rows[i].armyqual, rows[i].dependentstatus, rows[i].dependentname, rows[i].nationality, rows[i].changedby, rows[i].registrationno, rows[i].lastaccess, rows[i].serviceno, rows[i].texcono, rows[i].taluk, rows[i].state, rows[i].country, rows[i].nomineerelation, rows[i].rank, rows[i].corps, rows[i].trade, rows[i].district, rows[i].region, rows[i].character, rows[i].religion, rows[i].caste, rows[i].active, '', '', '', '', '', rows[i].panno, rows[i].uanno,rows[i].age, rows[i].branchcode,rows[i].branchname,rows[i].ifsccode,rows[i].applycount);
                        result.push(member);
                    }
                }
                //console.log('result',result);
                resolve(result);
            }).catch(function (err) {
                reject(err);
            });
        }).catch(function (err) {
            reject(err);
        });
    });
}

module.exports.getmemberbyabove58 = function (memberid) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            var query = multiline.stripIndent(function () {
                /*
                SELECT m.firstname,m.lastname,m.fathername,
                    DATE_FORMAT(m.dob,'%d %b %Y') AS dob,
                    FLOOR((DATEDIFF(NOW(),m.dob) / 365.25)) AS age,
                    m.email,m.mobile,m.communicationaddress,
                    m.aadhaarno,m.address,m.nominee,m.accountno,
                    m.nationality,
                    m.esmidno,
                    m.civilqual,
                    m.armyqual,
                    m.registrationno,
                    m.serviceno,
                    m.texcono,
                    m.lastaccess,
                    m.dependentstatus,
                    m.dependentname,
                    m.panno,
                    m.uanno,
                    m.branchcode,
                    m.branchname,
                    m.ifsccode, 
                    m.memberid
              FROM member m
                                                                              
              WHERE m.active = 1 AND (DATEDIFF(NOW(),m.dob) / 365.25 > 58)
              
              ORDER by m.memberid 
            */
            });
            con.query(query, [memberid, memberid]).then(function (rows, fields) {
                var rowsReturned = rows.length;
                var result = [];
                if (rowsReturned > 0) {
                    for (var i = 0; i < rowsReturned; i++) { 
                        var member = new memberModel.memberAbove58info(rows[i].memberid,rows[i].firstname,rows[i].lastname,rows[i].fathername,rows[i].dob,rows[i].age,rows[i].email,rows[i].mobile,rows[i].communicationaddress,rows[i].aadhaarno,rows[i].address,rows[i].nominee,rows[i].accountno,rows[i].nationality,rows[i].esmidno,rows[i].civilqual,rows[i].armyqual,rows[i].registrationno,rows[i].serviceno,rows[i].texcono,rows[i].lastaccess,rows[i].dependentstatus,rows[i].dependentname,rows[i].panno,rows[i].uanno, rows[i].branchcode,rows[i].branchname,rows[i].ifsccode);
                        result.push(member);
                    }
                }
                console.log('result',result);
                resolve(result);
            }).catch(function (err) {
                reject(err);
            });
        }).catch(function (err) {
            reject(err);
        });
    });
}


module.exports.getmembersaboveworking58 = function (memberid) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            var query = multiline.stripIndent(function () {
                /*
                    SELECT m.firstname,m.lastname,m.fathername,
                        DATE_FORMAT(m.dob,'%d %b %Y') AS dob,
                        FLOOR((DATEDIFF(NOW(),m.dob) / 365.25)) AS age,
                        m.email,m.mobile,m.communicationaddress,
                        m.aadhaarno,m.address,m.nominee,m.accountno,
                        m.nationality,
                        m.esmidno,
                        m.civilqual,
                        m.armyqual,
                        m.registrationno,
                        m.serviceno,
                        m.texcono,
                        DATE_FORMAT(m.lastaccess,'%d %b %Y') AS lastaccess,
                        m.dependentstatus,
                        m.dependentname,
                        m.panno,
                        m.uanno
                    FROM member m                                                          
                    WHERE m.active = 1 AND (DATEDIFF(NOW(),m.dob) / 365.25 > 58) AND m.lastaccess >= now()-interval 90 day
                    ORDER by m.memberid 
                */
            });
            con.query(query, [memberid, memberid]).then(function (rows, fields) {
                var rowsReturned = rows.length;
                var result = [];
                if (rowsReturned > 0) {
                    for (var i = 0; i < rowsReturned; i++) {
                        var member = new memberModel.memberAbove58info(rows[i].firstname,rows[i].lastname,rows[i].fathername,rows[i].dob,rows[i].age,rows[i].email,rows[i].mobile,rows[i].communicationaddress,rows[i].aadhaarno,rows[i].address,rows[i].nominee,rows[i].accountno,rows[i].nationality,rows[i].esmidno,rows[i].civilqual,rows[i].armyqual,rows[i].registrationno,rows[i].serviceno,rows[i].texcono,rows[i].lastaccess,rows[i].dependentstatus,rows[i].dependentname,rows[i].panno,rows[i].uanno);
                        result.push(member);
                    }
                }
                console.log('result',result);
                resolve(result);
            }).catch(function (err) {
                reject(err);
            });
        }).catch(function (err) {
            reject(err);
        });
    });
}

module.exports.getmemberinfo = function (texserno,memberid) {    
    stream.once('open', function(fd) { 
        stream.write(" Date - "+ new Date() + " - Getting Persons Details Service Call - After Query Execute - TexcoNo "+texserno);
    }); 
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            var query = multiline.stripIndent(function () {
                /*
                    SELECT
                        m.memberid,
                        m.firstname,
                        m.lastname,
                        m.fathername,
                        DATE_FORMAT(m.dob,'%d %b %Y') AS dob,
                        m.mobile,
                        m.communicationaddress,
                        m.address,
                        lv5.description AS 'rank',
                        lv6.description AS 'corps',
                        lv7.description AS 'trade',
                        m.characterid,
                        m.pincode,
                        m.esmidno,
                        m.civilqual,
                        m.armyqual,
                        m.registrationno,
                        m.serviceno,
                        m.texcono,
                        m.loginstatus,
                        m.active
                    FROM member m
                    LEFT JOIN lookupvalue lv5 ON
                        lv5.lkvalid = m.rankid
                    AND lv5.active = 1
                    LEFT JOIN lookupvalue lv6 ON
                        lv6.lkvalid = m.corpsid
                    AND lv6.active = 1
                    LEFT JOIN lookupvalue lv7 ON
                        lv7.lkvalid = m.tradeid
                    AND lv7.active = 1                                       
                    WHERE m.active = 1 AND m.memberid = ?;
                */
            });  

            con.query(query, [memberid]).then(function (rows, fields) {
                var rowsReturned = rows.length;
                var member = {}; 
                if (rowsReturned > 0) {
                    if(rows[0].loginstatus === 0) {
                        con.query(
                            "INSERT INTO login_member(`memberid`, `logout_time`) VALUES (?, ?);",
                            [rows[0].memberid, new Date()]
                          ).then(function (rows1, fields) {
                            resolve(rows[0]);
                          }).catch(function (err) {
                            console.log('err', err);
                            reject("");
                          });                          
                    } else {
                        reject("User Alredy Logged in"); 
                    }
                }
                else {
                    reject("Invalid Service No or Texco No");
                }
            }).catch(function (err) {
                reject(err);
            });
        }).catch(function (err) {
            reject(err);
        });
    });
}


module.exports.getmemberinfologin = function (texserno,memberid) {    
    stream.once('open', function(fd) { 
        stream.write(" Date - "+ new Date() + " - Getting Persons Details Service Call - After Query Execute - TexcoNo "+texserno);
    }); 
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            var query = multiline.stripIndent(function () {
                /*
                    SELECT
                        m.memberid,
                        m.firstname,
                        m.lastname,
                        m.fathername,
                        DATE_FORMAT(m.dob,'%d %b %Y') AS dob,
                        m.mobile,
                        m.communicationaddress,
                        m.address,
                        lv5.description AS 'rank',
                        lv6.description AS 'corps',
                        lv7.description AS 'trade',
                        m.characterid,
                        m.pincode,
                        m.esmidno,
                        m.civilqual,
                        m.armyqual,
                        m.registrationno,
                        m.serviceno,
                        m.texcono,
                        m.loginstatus,
                        m.active
                    FROM member m
                    LEFT JOIN lookupvalue lv5 ON
                        lv5.lkvalid = m.rankid
                    AND lv5.active = 1
                    LEFT JOIN lookupvalue lv6 ON
                        lv6.lkvalid = m.corpsid
                    AND lv6.active = 1
                    LEFT JOIN lookupvalue lv7 ON
                        lv7.lkvalid = m.tradeid
                    AND lv7.active = 1   AND m.loginstatus=1                                    
                    WHERE m.active = 1 AND m.memberid = ?;
                */
            });  
            // (m.serviceno = ? OR m.texcono = ? ) AND (length(m.serviceno) > 0 OR length(m.texcono) > 0)
            con.query(query, [memberid]).then(function (rows, fields) {
                var rowsReturned = rows.length;
                var member = {}; 
                if (rowsReturned > 0) {
                    // var member = new memberModel.memberinfo(rows[0].memberid, rows[0].firstname, rows[0].lastname, rows[0].fathername, rows[0].dob, rows[0].email, rows[0].mobile, rows[0].address, rows[0].village, rows[0].talukid, rows[0].stateid, rows[0].countryid, rows[0].pincode, rows[0].addressstatus, rows[0].communicationaddress, rows[0].aadhaarno, rows[0].genderid, rows[0].districtid, rows[0].regionid, rows[0].doj, rows[0].accountno, rows[0].nominee, rows[0].nomineerelationid, rows[0].rankid, rows[0].corpsid, rows[0].tradeid, rows[0].esmidno, rows[0].characterid, rows[0].religionid, rows[0].casteid, rows[0].civilqual, rows[0].armyqual, rows[0].dependentstatus, rows[0].dependentname, rows[0].nationality, rows[0].changedby, rows[0].registrationno, rows[0].lastaccess, rows[0].serviceno, rows[0].texcono, rows[0].taluk, rows[0].state, rows[0].country, rows[0].nomineerelation, rows[0].rank, rows[0].corps, rows[0].trade, rows[0].district, rows[0].region, rows[0].character, rows[0].religion, rows[0].caste, rows[0].active, rows[0].branchcode,rows[0].branchname,rows[0].ifsccode);
                   
                    // if(rows[0].loginstatus==0)
                    // {
                    //     con.query("UPDATE member SET loginstatus = 1 WHERE memberid = ?;", [rows[0].memberid]).then(function (rows1, fields) {
                    //         resolve(rows[0]);
                    //     }).catch(function (err) {  console.log('err',err);
                    //         reject("");
                    //     });
                    // }
                //    else
                //    {
                //     reject("User Alredy Logged in"); 
                //    }
                    resolve(rows[0]);
                }
                else {
                    reject("Invalid Service No or Texco No");
                }
            }).catch(function (err) {
                reject(err);
            });
        }).catch(function (err) {
            reject(err);
        });
    });
}

module.exports.getmemberinfologinlatest = function (texserno,memberid) {    
    stream.once('open', function(fd) { 
        stream.write(" Date - "+ new Date() + " - Getting Persons Details Service Call - After Query Execute - TexcoNo "+texserno);
    }); 
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            var query = multiline.stripIndent(function () {
                /*
                    SELECT
                        m.memberid,
                        m.firstname,
                        m.lastname,
                        m.fathername,
                        DATE_FORMAT(m.dob,'%d %b %Y') AS dob,
                        m.mobile,
                        m.communicationaddress,
                        m.address,
                        lv5.description AS 'rank',
                        lv6.description AS 'corps',
                        lv7.description AS 'trade',
                        m.characterid,
                        m.pincode,
                        m.esmidno,
                        m.civilqual,
                        m.armyqual,
                        m.registrationno,
                        m.serviceno,
                        m.texcono,
                        m.loginstatus,
                        m.active
                    FROM member m
                    LEFT JOIN lookupvalue lv5 ON
                        lv5.lkvalid = m.rankid
                    AND lv5.active = 1
                    LEFT JOIN lookupvalue lv6 ON
                        lv6.lkvalid = m.corpsid
                    AND lv6.active = 1
                    LEFT JOIN lookupvalue lv7 ON
                        lv7.lkvalid = m.tradeid
                    AND lv7.active = 1   AND m.loginstatus=1                                    
                    WHERE m.active = 1 AND m.memberid = ? and  (m.lastaccess >= now() - interval 31 DAY OR m.lastaccess IS NULL ) ;
                */
            });  
            // (m.serviceno = ? OR m.texcono = ? ) AND (length(m.serviceno) > 0 OR length(m.texcono) > 0)
            con.query(query, [memberid]).then(function (rows, fields) {
                var rowsReturned = rows.length;
                var member = {}; 
                if (rowsReturned > 0) {
                    // var member = new memberModel.memberinfo(rows[0].memberid, rows[0].firstname, rows[0].lastname, rows[0].fathername, rows[0].dob, rows[0].email, rows[0].mobile, rows[0].address, rows[0].village, rows[0].talukid, rows[0].stateid, rows[0].countryid, rows[0].pincode, rows[0].addressstatus, rows[0].communicationaddress, rows[0].aadhaarno, rows[0].genderid, rows[0].districtid, rows[0].regionid, rows[0].doj, rows[0].accountno, rows[0].nominee, rows[0].nomineerelationid, rows[0].rankid, rows[0].corpsid, rows[0].tradeid, rows[0].esmidno, rows[0].characterid, rows[0].religionid, rows[0].casteid, rows[0].civilqual, rows[0].armyqual, rows[0].dependentstatus, rows[0].dependentname, rows[0].nationality, rows[0].changedby, rows[0].registrationno, rows[0].lastaccess, rows[0].serviceno, rows[0].texcono, rows[0].taluk, rows[0].state, rows[0].country, rows[0].nomineerelation, rows[0].rank, rows[0].corps, rows[0].trade, rows[0].district, rows[0].region, rows[0].character, rows[0].religion, rows[0].caste, rows[0].active, rows[0].branchcode,rows[0].branchname,rows[0].ifsccode);
                   
                    // if(rows[0].loginstatus==0)
                    // {
                    //     con.query("UPDATE member SET loginstatus = 1 WHERE memberid = ?;", [rows[0].memberid]).then(function (rows1, fields) {
                    //         resolve(rows[0]);
                    //     }).catch(function (err) {  console.log('err',err);
                    //         reject("");
                    //     });
                    // }
                //    else
                //    {
                //     reject("User Alredy Logged in"); 
                //    }
                    resolve(rows[0]);
                }
                else {
                    reject("Invalid Service No or Texco No");
                }
            }).catch(function (err) {
                reject(err);
            });
        }).catch(function (err) {
            reject(err);
        });
    });
}



// module.exports.insertOTP = function (texserno,memberid,otp,mobile) {
//     return new app.promise(function (resolve, reject) {
//         mySqlConnection.connection().then(function (con) {
//             var datas = {
//                 "texcono": texserno,
//                 "memberid" : memberid,
//                 "otp" : otp,
//                 "mobile" : mobile,
//                 "status":0
//             };
//             //console.log(datas);
//             con.query('INSERT INTO member_loginotp SET ?', datas).then(function (rows, fields) {
//                 resolve({
//                     "memberid": datas.memberid
//                 })
//             }).catch(function (err) {
//                 reject(err);
//             });
//         }).catch(function (err) {
//             reject(err);
//         });
//     });
// }


module.exports.insertOTP = async function (texserno, memberid, otp, mobile) {
    try {
        const con = await mySqlConnection.connection();

        // Hash OTP before storing
        const hashedOtp = await bcrypt.hash(otp.toString(), 10);

        // Delete previous OTPs for the user
        await con.query(`DELETE FROM member_loginotp WHERE memberid = ?`, [memberid]);

        // Prepare data object
        const datas = {
            texcono: texserno,
            memberid: memberid,
            otp: hashedOtp, // Store hashed OTP
            mobile: mobile,
            status: 0,
            created_at: new Date() // Ensure timestamp is set
        };

        // Insert new OTP record (Ensure correct format for values)

        const result = await con.query('INSERT INTO member_loginotp SET ?', [datas]);

        // Ensure insert was successful
        if (!result || result.affectedRows === 0) {
            throw new Error("❌ Failed to insert OTP. No rows affected.");
        }
        return { success: true, memberid: memberid, message: "OTP generated successfully" };

    } catch (err) {
        console.error("❌ Error inserting OTP:", err);
        return { success: false, error: err.message };
    }
};



module.exports.sendOTP = function (texserno,memberid) {    
    stream.once('open', function(fd) { 
        stream.write(" Date - "+ new Date() + " - Getting Persons Details Service Call - After Query Execute - TexcoNo "+texserno);
    }); 
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            var query = multiline.stripIndent(function () {
                /*
                    SELECT
                        m.memberid,
                        m.firstname,
                        m.lastname,
                        m.fathername,
                        DATE_FORMAT(m.dob,'%d %b %Y') AS dob,
                        m.mobile,
                        m.communicationaddress,
                        m.address,
                        lv5.description AS 'rank',
                        lv6.description AS 'corps',
                        lv7.description AS 'trade',
                        m.characterid,
                        m.pincode,
                        m.esmidno,
                        m.civilqual,
                        m.armyqual,
                        m.registrationno,
                        m.serviceno,
                        m.texcono,
                        m.loginstatus,
                        m.active
                    FROM member m
                    LEFT JOIN lookupvalue lv5 ON
                        lv5.lkvalid = m.rankid
                    AND lv5.active = 1
                    LEFT JOIN lookupvalue lv6 ON
                        lv6.lkvalid = m.corpsid
                    AND lv6.active = 1
                    LEFT JOIN lookupvalue lv7 ON
                        lv7.lkvalid = m.tradeid
                    AND lv7.active = 1   AND m.loginstatus=1                                    
                    WHERE m.active = 1 AND m.memberid = ?;
                */
            });  
            // (m.serviceno = ? OR m.texcono = ? ) AND (length(m.serviceno) > 0 OR length(m.texcono) > 0)
            con.query(query, [memberid]).then(function (rows, fields) {
                var rowsReturned = rows.length;
                var member = {}; 
                if (rowsReturned > 0) {
                  
                    resolve(rows[0]);
                }
                else {
                    reject("Invalid Service No or Texco No");
                }
            }).catch(function (err) {
                reject(err);
            });
        }).catch(function (err) {
            reject(err);
        });
    });
}


// module.exports.verifyOTP = function (memberid, otp) {
//     // console.log('result...',memberid, blocktype);
//     return new app.promise(function (resolve, reject) {
//         // console.log('result.....',memberid, blocktype);
//         mySqlConnection.connection().then(function (con) {
//             // console.log('result...',memberid, blocktype);
//             con.query('SELECT * FROM member_loginotp WHERE memberid = ? AND otp = ? and status = 0', [memberid,otp]).then(function (rows, fields) {

//                 var rowsReturned = rows.length;
//                 console.log(rows);
//             if (rowsReturned > 0) {


//                 var startDate = moment(rows[0].created_at, "YYYY/MM/DD HH:mm:ss");
//                 var currenDate = moment().format('YYYY/MM/DD HH:mm:ss');
//                 var endDate = moment(currenDate, "YYYY/MM/DD HH:mm:ss");
//                  result = endDate.diff(startDate, 'minutes');

//                  console.log(result );

//                  if (result <=5)
//                     {
//                         resolve('success')
//                     }
//                     else
                  
//                     reject('Expired OTP')
    
//                 }
//                 else {
//                     reject("Invalid OTP");
//                 }

//                 // console.log('rows',rows);
//                             }).catch(function (err) {
//                 reject(err);
//             });
//         }).catch(function (err) {
//             reject(err);
//         });
//     });
// }


module.exports.verifyOTP = async function (memberid, otp) {
    try {
        const con = await mySqlConnection.connection();
        const [rows] = await con.query(
            `SELECT otp, created_at FROM member_loginotp 
             WHERE memberid = ? AND status = 0 
             AND created_at >= NOW() - INTERVAL 5 MINUTE`, 
            [memberid]
        );

        // Fix: Convert RowDataPacket to array if needed
        const otpRecords = Array.isArray(rows) ? rows : [rows];

        if (otpRecords.length === 0) {
            throw new Error("Invalid or Expired OTP");
        }

        const otpRecord = otpRecords[0]; // Properly access the first row

        // Compare OTP securely
        const isMatch = await bcrypt.compare(otp, otpRecord.otp);

        if (!isMatch) {
            // throw new Error("Invalid OTP");
            return { success: false, error: "Invalid OTP" };
        }

        // OTP Verified, Mark It As Used
        const updateResult = await con.query(
            `UPDATE member_loginotp SET status = 1 WHERE memberid = ?`, 
            [memberid]
        );

        return { success: true, message: "OTP verified successfully" };
    } catch (err) {
        return { success: false, error: err.message };
    }
};


module.exports.validatemember = function (mobile, serviceno, memberid) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
             con.query('SELECT memberid FROM member WHERE ( mobile = ? OR serviceno = ? ) AND active = 1 AND memberid <> ? ', [mobile, serviceno, memberid]).then(function (rows, fields) {
                if (rows.length > 0) {
                    var response = 1;
                    resolve({
                        "response": response
                    });
                } else {
                    var response = 2;
                    resolve({
                        "response": response
                    });
                }
            }).catch(function (err) {
                reject(err);
            });
        }).catch(function (err) {
            reject(err);
        });
    });
} 

module.exports.validatememberinfo = function (texserno) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
             con.query(
                `SELECT 
                    COUNT(memberid) AS memberlength,
                    memberid
                FROM member
                WHERE 
                    (texcono = ? OR serviceno = ?)
                    AND active = 1
                    AND (length(serviceno) > 0 OR length(texcono) > 0)`,
                [texserno, texserno]).then(function (rows, fields) {
                resolve(rows);
            }).catch(function (err) {
                reject(err);
            });
        }).catch(function (err) {
            reject(err);
        });
    });
}

module.exports.getMobileInfo = function (texserno) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
             con.query('SELECT memberid, mobile FROM member WHERE ( texcono = ? OR serviceno = ? ) AND active = 1 AND (length(serviceno) > 0 OR length(texcono) > 0)', [texserno, texserno]).then(function (rows, fields) {
                resolve(rows);
            }).catch(function (err) {
                reject(err);
            });
        }).catch(function (err) {
            reject(err);
        });
    });
}
module.exports.getnumberofmembers = function () {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            con.query('SELECT COUNT(*) as numberofmembers FROM member where active= 1 AND lastaccess >= now()-interval 3 month;').then(function (rows, fields) {
                resolve({
                    "numberofmembers": rows[0].numberofmembers
                })
            }).catch(function (err) {
                reject(err);
            });
        }).catch(function (err) {
            reject(err);
        });
    });
}


module.exports.getmembersexport = function (regionid, districtid, statusid) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            var query = multiline.stripIndent(function () {
            /*
                SELECT m.firstname,m.lastname,m.fathername,
                    DATE_FORMAT(m.dob,'%d %b %Y') AS dob,
                    FLOOR((DATEDIFF(NOW(),m.dob) / 365.25)) AS age,
                    m.email,m.mobile,m.communicationaddress,
                    m.aadhaarno,m.address,m.nominee,m.accountno,
                    m.nationality,
                    m.esmidno,
                    m.civilqual,
                    m.armyqual,
                    m.registrationno,
                    m.serviceno,
                    m.texcono,
                    m.lastaccess,
                    m.dependentstatus,
                    m.dependentname,
                    m.panno,
                    m.uanno
              FROM member m

              LEFT JOIN lookupvalue lv12 ON
                lv12.lkvalid = m.characterid
              AND lv12.active = 1   
                                                                              
              WHERE m.active = 1 

              AND (CASE WHEN ((? != 'undefined') AND (? != 'NULL') )
             THEN m.regionid IN (?) 
               ELSE 1=1 END) 
                 
              AND (CASE WHEN (? != 'undefined' AND (? != 'NULL'))
             THEN lv12.lkvalid IN (?) 
               ELSE 1=1 END) 
                
              AND (CASE WHEN (? != 'undefined' AND (? != 'NULL') )
             THEN m.districtid IN (?) 
              ELSE 1=1 END)
              
              ORDER by m.memberid 
            */
            });
            con.query(query, [regionid, regionid, regionid, statusid, statusid, statusid, districtid, districtid, districtid]).then(function (rows, fields) {
                var rowsReturned = rows.length;
                var result = [];
                if (rowsReturned > 0) {
                    for (var i = 0; i < rowsReturned; i++) {
                        var member = new memberModel.memberAbove58info(rows[i].firstname, rows[i].lastname, rows[i].fathername, rows[i].dob, rows[i].age, rows[i].email, rows[i].mobile, rows[i].communicationaddress, rows[i].aadhaarno, rows[i].address, rows[i].nominee, rows[i].accountno, rows[i].nationality, rows[i].esmidno, rows[i].civilqual, rows[i].armyqual, rows[i].registrationno, rows[i].serviceno, rows[i].texcono, rows[i].lastaccess, rows[i].dependentstatus, rows[i].dependentname, rows[i].panno, rows[i].uanno);
                    }
                }
                resolve(result);
            }).catch(function (err) {
                reject(err);
            });
        }).catch(function (err) {
            reject(err);
        });
    });
}

module.exports.getallmember = function () {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            var query = multiline.stripIndent(function () {
                /*
             SELECT
              m.*,
              lv4.description AS nomineerelation,
              lv5.description AS rank,
              lv6.description AS corps,
              lv7.description AS trade,
              lv12.description AS `character`,
              lv13.description AS religion,
              lv14.description AS caste
              
              FROM member m

              LEFT JOIN lookupvalue lv4 ON
                  lv4.lkvalid = m.nomineerelationid
              AND lv4.active = 1
              
              LEFT JOIN lookupvalue lv5 ON
                  lv5.lkvalid = m.rankid
              AND lv5.active = 1

              LEFT JOIN lookupvalue lv6 ON
                  lv6.lkvalid = m.corpsid
              AND lv6.active = 1
                 
              LEFT JOIN lookupvalue lv7 ON
                  lv7.lkvalid = m.tradeid
              AND lv7.active = 1

              LEFT JOIN lookupvalue lv12 ON
                lv12.lkvalid = m.characterid
              AND lv12.active = 1   
                                 
              LEFT JOIN lookupvalue lv13 ON
                lv13.lkvalid = m.religionid
              AND lv13.active = 1 
                                 
              LEFT JOIN lookupvalue lv14 ON
                lv14.lkvalid = m.casteid
              AND lv14.active = 1 
                                                                                                      
              WHERE m.active = 1

            */
            });
            con.query(query).then(function (rows, fields) {
                var rowsReturned = rows.length;
                var result = [];
                if (rowsReturned > 0) {
                    for (var i = 0; i < rowsReturned; i++) {
                        var member = new memberModel.memberinfo(rows[i].memberid, rows[i].firstname, rows[i].serviceno, rows[i].texcono, rows[i].fathername, rows[i].gender, rows[i].dob, rows[i].doj, rows[i].email, rows[i].mobile, rows[i].address, rows[i].village, rows[i].taluk, rows[i].district, rows[i].state, rows[i].country, rows[i].pincode, rows[i].communicationaddress, rows[i].nominee, rows[i].nomineerelation, rows[i].rank, rows[i].corps, rows[i].trade, rows[i].esmidno, rows[i].character, rows[i].religion, rows[i].caste, rows[i].civilqual, rows[i].armyqual, rows[i].nationality, rows[i].dependentstatus, rows[i].dependentname, rows[i].lastaccess, rows[i].accountno, rows[i].panno, rows[i].uanno, rows[i].aadhaarno, rows[i].accountno, rows[i].pfno, rows[0].branchcode,rows[0].branchname,rows[0].ifsccode);
                        result.push(member);
                    }
                }
                resolve(result);
            }).catch(function (err) {
                reject(err);
            });
        }).catch(function (err) {
            reject(err);
        });
    });
}

module.exports.importlastaccess = function (lastaccess, texconos) {  console.log('lastaccess, texconos)',lastaccess, texconos);
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            con.query("UPDATE member SET lastaccess = ? WHERE texcono IN (?);", [lastaccess, texconos]).then(function (rows, fields) {
                resolve("success");
            }).catch(function (err) {  console.log('err',err);
                reject(err);
            });
        }).catch(function (err) {
            reject(err);
        });
    }).catch(function (err) {
        reject(err);
    });
}


module.exports.logs = function (method, data) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            con.query('INSERT INTO logs( `method`, `data`) VALUES (?, ?);', [method, JSON.stringify(data)]).then(function (rows, fields) {
                resolve({
                    "logid": rows.insertId
                })
            }).catch(function (err) {
                resolve();
            });
        }).catch(function (err) {
            reject(err);
        });
    });
}

module.exports.updaterank = function (memberid, rankid) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            con.query('UPDATE member SET rankid = ? WHERE memberid= ?', [rankid, memberid]).then(function (rows, fields) {
                resolve({
                    "memberid": memberid
                })
            }).catch(function (err) {
                reject(err);
            });
        }).catch(function (err) {
            reject(err);
        });
    });
}

module.exports.creatememberblock = function (memberblock) {
    console.log('(memberblock.isrepcoblock',memberblock.isrepcoblock);
    if(memberblock.isrepcoblock == undefined) {
        memberblock.isrepcoblock = 0;
    } 
    if(memberblock.ispfblock == undefined) {
        memberblock.ispfblock = 0;
    } 
    if(memberblock.memberblocks == undefined) {
        memberblock.memberblocks = 0;
    }
    var datas = {
        memberid : memberblock.memberid,
        reason : memberblock.reason,
        comment : memberblock.comment,
        enddate : memberblock.enddate,
        ispfblock : memberblock.ispfblock,
        isrepcoblock : memberblock.isrepcoblock,
        lifetimeblock : memberblock.memberblocks,
        changedby : memberblock.changedby
    };
    console.log('datas',datas);
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            con.query('INSERT INTO memberblock SET ?', datas).then(function (rows, fields) {
                resolve({
                    "memberblockid": rows.insertId
                })
            }).catch(function (err) {
                reject(err);
            });
        }).catch(function (err) {
            reject(err);
        });
    });
}

module.exports.updatememberblock = function (memberblock, memberblockid) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            if(memberblock.isrepcoblock == undefined) {
                memberblock.isrepcoblock = 0;
            } 
            if(memberblock.ispfblock == undefined) {
                memberblock.ispfblock = 0;
            } 
            if(memberblock.memberblocks == undefined) {
                memberblock.memberblocks = 0;
            }
            var datas = {
                memberid : memberblock.memberid,
                reason : memberblock.reason,
                comment : memberblock.comment,
                enddate : memberblock.enddate,
                ispfblock : memberblock.ispfblock,
                isrepcoblock : memberblock.isrepcoblock,
                lifetimeblock : memberblock.memberblocks,
                changedby : memberblock.changedby
            };
            con.query('UPDATE memberblock SET ? WHERE memberblockid= ?', [datas, memberblockid]).then(function (rows, fields) {
                resolve({
                    "memberblockid": memberblockid
                })
            }).catch(function (err) {
                reject(err);
            });
        }).catch(function (err) {
            reject(err);
        });
    });
}

module.exports.updatememberblockstatus = function (memberblockid) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            con.query('UPDATE memberblock SET active = 0 WHERE memberblockid= ?', [memberblockid]).then(function (rows, fields) {
                resolve({
                    "memberblockid": memberblockid
                })
            }).catch(function (err) {
                reject(err);
            });
        }).catch(function (err) {
            reject(err);
        });
    });
} 


module.exports.getmemberblocks = function (memberblockid) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            var query = multiline.stripIndent(function () {
                /*
                    SELECT
                        mb.memberid,
                        mb.reason,
                        mb.comment,
                        DATE_FORMAT(mb.enddate, "%d %M, %Y") AS enddate,
                        mb.ispfblock,
                        mb.memberblockid,
                        m.firstname,
                        m.mobile,
                        m.texcono,
                        m.serviceno,
                        mb.isrepcoblock,
                        mb.lifetimeblock

                    FROM
                        memberblock mb

                    INNER JOIN member m ON
                        mb.memberid = m.memberid 
                    AND m.active = 1

                    WHERE mb.active = 1
                        AND case ? when 0 then 1 = 1 else mb.memberblockid = ? end
                    ORDER by mb.memberblockid DESC;

            */
            });
            con.query(query, [memberblockid, memberblockid]).then(function (rows, fields) {
                // console.log('rows',rows);
                var rowsReturned = rows.length;
                var result = [];
                if (rowsReturned > 0) {
                    for (var i = 0; i < rowsReturned; i++) {
                        var member = new memberModel.getmemberblock(rows[i].memberid, rows[i].reason, rows[i].comment, rows[i].enddate, rows[i].ispfblock, rows[i].memberblockid, rows[i].firstname, rows[i].mobile, rows[i].texcono, rows[i].serviceno, rows[i].isrepcoblock, rows[i].lifetimeblock);
                        // console.log('member',member);
                        result.push(member);
                    }
                    // console.log('result',result);
                }
                resolve(result);
            }).catch(function (err) {
                reject(err);
            });
        }).catch(function (err) {
            reject(err);
        });
    });
}


module.exports.getmemberhistory = function (memberid) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            var query = multiline.stripIndent(function () {
                /*
SELECT  
    m.memberid,
    m.memberhistoryid,
    m.texcono, 
    m.projectno, 
    m.category,
    DATE_FORMAT(m.startdate,'%d %b %Y') AS startdate, 
    DATE_FORMAT(m.enddate,'%d %b %Y') AS enddate, 
    CONCAT_WS( '', CONCAT_WS('-', m.projectno,  IFNULL(p.name, '') , m.category)) AS jobposting, 
    IFNULL(p.name, '') AS name
   
FROM memberhistory m

LEFT JOIN project p ON
    p.projectno = m.projectno AND p.active = 1
    
WHERE m.active = 1 AND  m.memberid = ?
                                    
ORDER BY m.startdate ;
              */
            });
            con.query(query, [memberid]).then(function (rows, fields) {
              console.log('rows..rows',memberid);
                var rowsReturned = rows.length;
                var result = [];
                if (rowsReturned > 0) {
                    for (var i = 0; i < rowsReturned; i++) {
                        var member = new memberModel.memberhistory(rows[i].memberid, rows[i].memberhistoryid, rows[i].startdate, rows[i].enddate, rows[i].texcono, rows[i].projectno, rows[i].name, rows[i].category, rows[i].jobpsoting);
                        result.push(member);
                    }
                }
                resolve(result);
            }).catch(function (err) {
                reject(err);
            });
        }).catch(function (err) {
            reject(err);
        });
    });
}

module.exports.getmemberSearchHistory = function (serviceno) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            var query = multiline.stripIndent(function () {
                /*
                    SELECT texcono,serviceno,mobile,firstname,dob,memberid,active FROM member WHERE active = 1 AND (texcono = ? OR serviceno = ? OR mobile = ?) ;
                */
            });

            con.query(query, [serviceno, serviceno, serviceno]).then(function (rows, fields) {
              console.log('rows',rows);
                var rowsReturned = rows.length;
                var result = [];
                if (rowsReturned > 0) {
                    for (var i = 0; i < rowsReturned; i++) {
                        var member = new memberModel.getmemberSearchlist(rows[i].memberid, rows[i].texcono, rows[i].serviceno, rows[i].mobile, rows[i].firstname, rows[i].dob);
                        result.push(member);
                    }
                }
                resolve(result);
            }).catch(function (err) {
                reject(err);
            });
        }).catch(function (err) {
            reject(err);
        });
    });
}

module.exports.getmemberHistoryDetails = function (memberid) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            var query = multiline.stripIndent(function () {
                /*
                    SELECT mh.memberhistoryid,mh.memberid,mh.texcono,mh.projectno,mh.category,mh.startdate,mh.enddate,mb.serviceno,pr.name FROM memberhistory mh 
                    LEFT JOIN member mb ON mb.memberid = mh.memberid
                    LEFT JOIN project pr ON pr.projectno = mh.projectno
                    WHERE mb.memberid IN (?);
                */
            });
            console.log('query',query);
            console.log('memberid',memberid);
            con.query(query, [memberid]).then(function (rows, fields) {
                console.log('rows',rows);
                var rowsReturned = rows.length;
                var result = [];
                if (rowsReturned > 0) {
                    for (var i = 0; i < rowsReturned; i++) {
                        var member = new memberModel.getmemberHistorySearchlist(rows[i].memberhistoryid,rows[i].memberid,rows[i].texcono,rows[i].projectno,rows[i].category,rows[i].startdate,rows[i].enddate,rows[i].serviceno,rows[i].name);
                        result.push(member);
                    }
                }
                console.log('result',result);
                resolve(result);
            }).catch(function (err) {
                console.log('err',err);
                reject(err);
            });
        }).catch(function (err) {
            reject(err);
        });
    });
}

module.exports.getmemberHistoryDetailsadmin = function (memberid) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            var query = multiline.stripIndent(function () {
                /*
                    SELECT mh.memberhistoryid,mh.memberid,mh.texcono,mh.projectno,mh.category,mh.startdate,mh.enddate,mb.serviceno,pr.name FROM memberhistory mh 
                    LEFT JOIN member mb ON mb.memberid = mh.memberid
                    LEFT JOIN project pr ON pr.projectno = mh.projectno
                    WHERE mb.texcono IN (?) group by mh.memberid;
                */
            });
            console.log('query',query);
            console.log('memberid',memberid);
            con.query(query, [memberid]).then(function (rows, fields) {
                console.log('rows',rows);
                var rowsReturned = rows.length;
                var result = [];
                if (rowsReturned > 0) {
                    for (var i = 0; i < rowsReturned; i++) {
                        var member = new memberModel.getmemberHistorySearchlist(rows[i].memberhistoryid,rows[i].memberid,rows[i].texcono,rows[i].projectno,rows[i].category,rows[i].startdate,rows[i].enddate,rows[i].serviceno,rows[i].name);
                        result.push(member);
                    }
                }
                console.log('result',result);
                resolve(result);
            }).catch(function (err) {
                console.log('err',err);
                reject(err);
            });
        }).catch(function (err) {
            reject(err);
        });
    });
}

module.exports.getmemberJobActivityDetails = function (memberid) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            var query = multiline.stripIndent(function () {
                /*
                    SELECT pr.projectid,pr.projectno,pr.NAME,mb.memberid,ja.texcono,ja.createdttm,mb.serviceno FROM jobactivity ja 
                    LEFT JOIN member mb ON mb.memberid = ja.memberid
                    LEFT JOIN project pr ON pr.projectid = ja.projectid
                    WHERE ja.memberid IN (?)
                */
            });
            con.query(query, [memberid]).then(function (rows, fields) {
                var rowsReturned = rows.length;
                var result = [];
                if (rowsReturned > 0) {
                    for (var i = 0; i < rowsReturned; i++) {
                        var member = new memberModel.getmemberAppliedHistorylist(rows[i].projectid,rows[i].projectno,rows[i].name,rows[i].memberid,rows[i].texcono,rows[i].createdttm,rows[i].serviceno);
                        result.push(member);
                    }
                }
                resolve(result);
            }).catch(function (err) {
                reject(err);
            });
        }).catch(function (err) {
            reject(err);
        });
    });
}


module.exports.updatememberchange = function (changememberid,memberid) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            con.query('UPDATE memberhistory SET memberid = ? WHERE memberid IN (?);UPDATE jobactivity SET memberid = ? WHERE memberid IN (?);DELETE FROM member WHERE memberid IN (?);', [memberid,changememberid,memberid,changememberid,changememberid]).then(function (rows, fields) {
                resolve(rows);
            }).catch(function (err) {
                reject(err);
            });
        }).catch(function (err) {
            reject(err);
        });
    });
}

// search query - 21-08-2019
module.exports.getmemberSearchDetails = function (serviceno) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            var query = multiline.stripIndent(function () {
                /*
                     SELECT
                        m.memberid,
                        m.registrationno,
                        m.serviceno,
                        m.texcono,
                        FLOOR((DATEDIFF(NOW(),m.dob) / 365.25)) AS age,
                        m.active
                    FROM member m  WHERE m.active = 1
                    AND texcono = ? OR serviceno = ? OR mobile = ?
                */
            });
            con.query(query, [serviceno, serviceno, serviceno]).then(function (rows, fields) {
                var rowsReturned = rows.length;
                var result = [];
                if (rowsReturned > 0) {
                    for (var i = 0; i < rowsReturned; i++) {
                        var member = new memberModel.memberinfoedit(rows[i].memberid, rows[i].registrationno, rows[i].serviceno, rows[i].texcono,rows[i].age);
                        result.push(member);
                    }
                }
                resolve(result);
            }).catch(function (err) {
                reject(err);
            });
        }).catch(function (err) {
            reject(err);
        });
    });
}


module.exports.getmembersSearchDetails = function (serviceno) {
 
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            var query = multiline.stripIndent(function () {
                /*
                     SELECT
                        m.memberid,
                        m.registrationno,
                        m.serviceno,
                        m.texcono,
                        FLOOR((DATEDIFF(NOW(),m.dob) / 365.25)) AS age,
                        m.active
                    FROM member m  WHERE m.active = 1
                    AND texcono = ? OR serviceno = ? OR mobile = ?
                */
            });
            con.query(query, [serviceno, serviceno, serviceno]).then(function (rows, fields) {
                var rowsReturned = rows.length;
                var result = [];
                if (rowsReturned > 0) {
                    for (var i = 0; i < rowsReturned; i++) {
                        var member = new memberModel.memberinfoedit(rows[i].memberid, rows[i].registrationno, rows[i].serviceno, rows[i].texcono,rows[i].age);
                        result.push(member);
                    }
                }
                resolve(result);
            }).catch(function (err) {
                reject(err);
            });
        }).catch(function (err) {
            reject(err);
        });
    });
}
module.exports.getClosedmemberSearchHistory = function (serviceno) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            var query = multiline.stripIndent(function () {
                /*
                    SELECT
                        m.memberid,
                        m.firstname,
                        m.lastname,
                        m.serviceno,
                        m.texcono,
                        m.active,
                        m.mobile
                    FROM member m
                    WHERE m.active = 1
                    AND texcono = ? OR serviceno = ? OR mobile = ?
                */
            });
            con.query(query, [serviceno, serviceno, serviceno]).then(function (rows, fields) {
                var rowsReturned = rows.length;
                var result = [];
                if (rowsReturned > 0) {
                    for (var i = 0; i < rowsReturned; i++) {
                        var member = new memberModel.memberinfoClosed(rows[i].memberid, rows[i].firstname, rows[i].lastname,rows[i].mobile,rows[i].serviceno, rows[i].texcono,rows[i].active);
                        result.push(member);
                    }
                }
                resolve(result);
            }).catch(function (err) {
                reject(err);
            });
        }).catch(function (err) {
            reject(err);
        });
    });
}

module.exports.ValidateMembersProject = function (memberid) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            con.query('SELECT COUNT(memberid) AS scount FROM closed_project_members WHERE memberid = ?', memberid).then(function (rows, fields) {
                console.log('rows',rows);
                resolve({
                    "count": rows[0].scount
                })
            }).catch(function (err) {
                reject(err);
            });
        }).catch(function (err) {
            reject(err);
        });
    });
}
module.exports.ClosedMembersProject = function (texcono,memberid,serviceno,firstname) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            var query = {
                "texcono": texcono,
                "memberid" : memberid,
                "serviceno" : serviceno,
                "firstname" : firstname
            };
            con.query('INSERT INTO closed_project_members SET ?', query).then(function (rows, fields) {
                resolve({
                    "memberid": rows.insertId
                })
            }).catch(function (err) {
                reject(err);
            });
        }).catch(function (err) {
            reject(err);
        });
    });
}

module.exports.getrejectedMemberDetails = function (memberid) 
{
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            var query = multiline.stripIndent(function () {
                /*
                    SELECT pr.projectno,pr.name,mm.texcono,mem.serviceno,mem.firstname,DATE_FORMAT(mm.closing_date,'%d-%m-%Y') AS closeddate,pr.projectid,mm.category
                    FROM memberhistory mm 
                    LEFT JOIN project pr ON pr.projectno = mm.projectno
                    LEFT JOIN member mem ON mem.memberid = mm.memberid
                    WHERE (mm.approvalstatus = 2 AND mm.working_status = 2 AND mm.isvacancyadded = 0);
                */
            });
            con.query(query).then(function (rows, fields) {
                resolve(rows);
            }).catch(function (err) {
                reject(err);
            });
        }).catch(function (err) {
            reject(err);
        });
    });
}

module.exports.getclosedmemberslistDetails = function (memberid) 
{
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            var query = multiline.stripIndent(function () {
                /*
                    SELECT cpm.* FROM closed_project_members cpm
                    INNER JOIN memberhistory mh ON mh.memberid = cpm.memberid
                    WHERE cpm.active = 1 AND mh.startdate >= NOW() - INTERVAL 365 DAY 
                    ORDER BY cpm.closedid DESC;
                */
            });
            con.query(query).then(function (rows, fields) {
                resolve(rows);
            }).catch(function (err) {
                reject(err);
            });
        }).catch(function (err) {
            reject(err);
        });
    });
}

module.exports.getclosedmembersWorkingProjectDetails = function (memdata) 
{
    // console.log('memdata...',memdata.closedid);
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            if(memdata.active == 0) {
                var query = multiline.stripIndent(function () {
                    /*
                        SELECT ja.projectid,pr.projectno,pr.name,DATE_FORMAT(ja.createdttm,'%d-%M-%Y') AS applieddate FROM jobactivity ja 
                        INNER JOIN project pr ON pr.projectid = ja.projectid
                        WHERE ja.memberid = ? AND ja.isrejected = 1;

                        SELECT pr.projectno,pr.name,mem.texcono,DATE_FORMAT(mem.startdate,'%d-%M-%Y') AS startdate FROM memberhistory mem 
                        INNER JOIN project pr ON pr.projectno = mem.projectno
                        WHERE mem.memberid = ? AND mem.isrejected = 1;
                    */
                });
                con.query(query,[Number(memdata.memberid),Number(memdata.memberid)]).then(function (rows, fields) {
                    if(rows[0]) {
                        var applieddate = rows[0].applieddate
                        var projectname = rows[0].name;
                        var projectno = rows[0].projectno;
                        var status = 'Applied';
                        if(rows[1]) {
                            var startdate = rows[1].startdate
                            var status = 'Got Opportunity';
                        } else {
                            var startdate = "";
                        }
                    }
                    else {
                        var applieddate = "";
                        var projectname = "";
                        var projectno = "";
                        var startdate = "";
                        var status = 'Not Applied';
                    }
                    var member = new memberModel.getmemberDataList(memdata.closedid, memdata.memberid, memdata.texcono,memdata.serviceno,memdata.firstname,applieddate,projectname,projectno,startdate,status);
                    resolve(member);
                }).catch(function (err) {
                    reject(err);
                });
            } else if(memdata.active == 1) {
                var member = new memberModel.getmemberDataList(memdata.closedid, memdata.memberid, memdata.texcono,memdata.serviceno,memdata.firstname,'','','','','Not Applied');
                resolve(member);
            }  
        }).catch(function (err) {
            reject(err);
        });
    });
}

module.exports.getmemberClosedDelete = function (closedid) {
    console.log('closedid',closedid);
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            con.query('DELETE FROM closed_project_members WHERE closedid = ?',[Number(closedid)]).then(function (rows, fields) {
                resolve(rows)
            }).catch(function (err) {
                reject(err);
            });
        }).catch(function (err) {
            reject(err);
        });
    });
}

module.exports.addMoveToCarryforward = function (projectid) {
    console.log('projectid',projectid);
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            con.query('DELETE FROM closed_project_members WHERE closedid = ?',[Number(closedid)]).then(function (rows, fields) {
                resolve(rows)
            }).catch(function (err) {
                reject(err);
            });
        }).catch(function (err) {
            reject(err);
        });
    });
}

module.exports.UpdateCarryforward = function (projectid,numberofvacancies,inplaceof) {
    console.log('inplaceof',inplaceof,numberofvacancies);
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            con.query('UPDATE carryforward SET numberofvacancies = ? , inplaceof = ? WHERE projectid= ?',[numberofvacancies,inplaceof,Number(projectid)]).then(function (rows, fields) {
                resolve(rows)
            }).catch(function (err) {
                reject(err);
            });
        }).catch(function (err) {
            reject(err);
        });
    });
}

module.exports.CheckProjectToCarryforward = function (projectid) {
    console.log('projectid',projectid);
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            con.query('SELECT * FROM carryforward WHERE projectid = ?',[Number(projectid)]).then(function (rows, fields) {
                resolve(rows)
            }).catch(function (err) {
                reject(err);
            });
        }).catch(function (err) {
            reject(err);
        });
    });
}

module.exports.getVacancyDetailsByID = function (projectid,category,serviceno) {
    console.log('projectid..vacacny',projectid);
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            var query = multiline.stripIndent(function () {
                /*
                    SELECT pr.clientid FROM project pr WHERE pr.projectid = ?;
                    SELECT lv.jobmasterid FROM jobmaster lv WHERE lv.code = ?;
                */
            });
            console.log('query',query);
            con.query(query,[Number(projectid),category]).then(function (rows, fields) {
                resolve(rows)
            }).catch(function (err) {
                reject(err);
            });
        }).catch(function (err) {
            reject(err);
        });
    });
}

module.exports.addToCarryforward = function (projectid,clientid,jobmasterid,inplaceof) {
    console.log('projectid',projectid);
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            var query = {
                clientid : clientid,
                projectid : projectid,
                jobmasterid : jobmasterid,
                inplaceof : inplaceof,
                numberofvacancies  :1,
                balancevacancies  :0,
                comments : 0,
                active : 1
            };
            console.log('query',query);
            con.query('INSERT INTO carryforward SET ?',[query]).then(function (rows, fields) {
                resolve(rows)
            }).catch(function (err) {
                reject(err);
            });
        }).catch(function (err) {
            reject(err);
        });
    });
}

module.exports.UpdateMemberHistory = function (projectid,texcono) {
    console.log('serviceno',texcono);
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            con.query('UPDATE memberhistory SET isvacancyadded = 1 WHERE projectid = ? AND texcono = ?',[Number(projectid),texcono]).then(function (rows, fields) {
                resolve(rows)
            }).catch(function (err) {
                reject(err);
            });
        }).catch(function (err) {
            reject(err);
        });
    });
}

module.exports.getregion = function () {
    return new app.promise(function (resolve, reject) {
        var query = multiline.stripIndent(function () {
            /*
                SELECT rd.rg_id AS region_id,lk1.description AS region_name 
                FROM  region_details rd
                INNER JOIN lookupvalue lk1 on lk1.lkvalid=rd.rg_id AND lk1.lkdmncode='REGION' GROUP BY rd.rg_id
            */
        });
        mySqlConnection.connection().then(function (con) {
            con.query(query).then(function (rows, fields) {
              
             var rowsReturned = rows.length;
             var result = [];
                if (rowsReturned > 0) {
                    for (var i = 0; i < rowsReturned; i++) {
                        var result_region  = new memberModel.region(rows[i].region_id,rows[i].region_name);
                        result.push(result_region);
                   }
                 }
                 resolve(result);
            }).catch(function (err) {
                console.log("err", err)
                reject("Error while get Region");
            });
        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.getdistrict = function (result,finalresult,x) {
    //console.log('finalresult....', x);
    return new app.promise(function (resolve, reject) {
        var query = multiline.stripIndent(function () {
            /*

                SELECT rd.dt_id AS district_id,lk1.description AS district_name 

                FROM  region_details rd

                INNER JOIN lookupvalue lk1 on lk1.lkvalid=rd.dt_id AND lk1.lkdmncode='DISTRC'

                WHERE rd.rg_id =? GROUP BY rd.dt_id

            */
        });
        mySqlConnection.connection().then(function (con) {
            con.query(query,[result.region_id]).then(function (rows, fields) {

                var rowsReturned = rows.length;
                var result1 = [];
                if (rowsReturned > 0) {
                    for (var i = 0; i < rowsReturned; i++) {
                        var result_district = new memberModel.district(rows[i].district_id,rows[i].district_name);
                        result1.push(result_district);
                    }
                    finalresult[x].district = result1;
                    resolve(finalresult);
                }
                
            }).catch(function (err) {
                console.log("err", err)
                reject("Error while get distirct");
            });

        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports.gettaluk = function () {
    // console.log('finalresult',finalresult[x]);
    return new app.promise(function (resolve, reject) {
        var query = multiline.stripIndent(function () {
            /*
                SELECT rd.tk_id AS taluk_id,lk1.description AS taluk_name,rd.dt_id AS district_id
                FROM  region_details rd
                INNER JOIN lookupvalue lk1 on lk1.lkvalid=rd.tk_id AND lk1.lkdmncode='TALUK'
                GROUP BY rd.tk_id;
            */
        });
        mySqlConnection.connection().then(function (con) {
            con.query(query).then(function (rows, fields) {
                var rowsReturned = rows.length;
                var result2 = [];
                if (rowsReturned > 0) {
                    for (var i = 0; i < rowsReturned; i++) {
                        var result_taluk  = new memberModel.taluk(rows[i].taluk_id,rows[i].taluk_name,rows[i].district_id);
                        result2.push(result_taluk);
                    }
                    resolve(result2);
                }              
            }).catch(function (err) {
                console.log("err", err);
                reject("Error while get taluk");
            });
        }).catch(function (err) {
            reject(err);
        });
    });
};
module.exports.updateaccountno = function (memberid, accountno) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            con.query('UPDATE member SET accountno=? WHERE memberid= ?', [accountno, memberid]).then(function (rows, fields) {
                resolve({
                    "memberid": memberid
                })
            }).catch(function (err) {
                reject(err);
            });
        }).catch(function (err) {
            reject(err);
        });
    });
}

module.exports.updatememberrepcostatus = function (memberid,repcostatus,pfstatus,reason) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            con.query('UPDATE member SET repcostatus = ?,reasonforblock = ?,pfstatus = ? WHERE memberid= ?', [repcostatus, reason,pfstatus, memberid]).then(function (rows, fields) {
                resolve({
                    "memberid": memberid
                })
            }).catch(function (err) {
                reject(err);
            });
        }).catch(function (err) {
            reject(err);
        });
    });
}

module.exports.validatememberblock = function (memberid, blocktype) {
    // console.log('result...',memberid, blocktype);
    return new app.promise(function (resolve, reject) {
        // console.log('result.....',memberid, blocktype);
        mySqlConnection.connection().then(function (con) {
            // console.log('result...',memberid, blocktype);
            con.query('SELECT COUNT(memberid) AS scount FROM memberblock WHERE memberid = ? AND isrepcoblock = ? AND ispfblock = ? AND active = 1;', [memberid,blocktype,blocktype]).then(function (rows, fields) {
                // console.log('rows',rows);
                resolve({
                    "count": rows[0].scount
                })
            }).catch(function (err) {
                reject(err);
            });
        }).catch(function (err) {
            reject(err);
        });
    });
}

module.exports.validatememberblockothers = function (memberid, blocktype) {
    // console.log('result...',memberid, blocktype);
    return new app.promise(function (resolve, reject) {
        // console.log('result.....',memberid, blocktype);
        mySqlConnection.connection().then(function (con) {
            // console.log('result...',memberid, blocktype);
            con.query('SELECT COUNT(memberid) AS scount FROM memberblock WHERE memberid = ? AND (isrepcoblock = ? OR ispfblock = ?) AND active = 1;', [memberid,blocktype,blocktype]).then(function (rows, fields) {
                // console.log('rows',rows);
                resolve({
                    "count": rows[0].scount
                })
            }).catch(function (err) {
                reject(err);
            });
        }).catch(function (err) {
            reject(err);
        });
    });
}

module.exports.getmemberSearchOldDetails = function (serviceno) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            var query = multiline.stripIndent(function () {
                /*
                    SELECT memberid,texcono FROM memberhistory WHERE texcono = ? GROUP BY texcono;
                */
            });
            con.query(query, [serviceno]).then(function (rows, fields) {
                resolve(rows);
            }).catch(function (err) {
                reject(err);
            });
        }).catch(function (err) {
            reject(err);
        });
    });
}

module.exports.getoldMemberSearchDetails = function (memberid) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            var query = multiline.stripIndent(function () {
                /*
                     SELECT
                        m.memberid,
                        m.registrationno,
                        m.serviceno,
                        m.texcono,
                        FLOOR((DATEDIFF(NOW(),m.dob) / 365.25)) AS age,
                        m.active
                    FROM member m  WHERE m.active = 1
                    AND memberid = ?
                */
            });
            con.query(query, [memberid]).then(function (rows, fields) {
                var rowsReturned = rows.length;
                var result = [];
                if (rowsReturned > 0) {
                    for (var i = 0; i < rowsReturned; i++) {
                        var member = new memberModel.memberinfoedit(rows[i].memberid, rows[i].registrationno, rows[i].serviceno, rows[i].texcono,rows[i].age);
                        result.push(member);
                    }
                }
                resolve(result);
            }).catch(function (err) {
                reject(err);
            });
        }).catch(function (err) {
            reject(err);
        });
    });
}

module.exports.getmemberhistoryDetails = function () {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            var query = multiline.stripIndent(function () {
                /*
                    SELECT mhm.memhistoryid,mhm.memberid,mhm.texcono,mhm.projectid,mhm.jobmasterid,mhm.category,mhm.projectno,mem.firstname,mem.serviceno,mem.texcono AS currenttexcono,mem.mobile,DATE_FORMAT( mhm.startdate,'%d %b %Y') AS startdate,DATE_FORMAT( mhm.enddate,'%d %b %Y') AS enddate
                    FROM memberhistoryam mhm INNER JOIN member mem ON mem.memberid = mhm.memberid WHERE mhm.active = 1;
                */
            });
            con.query(query).then(function (rows, fields) {
                resolve(rows);
            }).catch(function (err) {
                reject(err);
            });
        }).catch(function (err) {
            reject(err);
        });
    });
} 

module.exports.creatememberhistory = function (member) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            con.query('INSERT INTO memberhistoryam SET ?', member).then(function (rows, fields) {
                resolve({
                    "memhistoryid": rows.insertId
                })
            }).catch(function (err) {
                reject(err);
            });
        }).catch(function (err) {
            reject(err);
        });
    });
}

module.exports.updatememberhistorydetails = function (member, memhistoryid) {
    //console.log('UPDATE member SET',member,'WHERE memberid=',memberid);
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            con.query('UPDATE memberhistoryam SET ? WHERE memhistoryid= ?', [member, memhistoryid]).then(function (rows, fields) {
                resolve({
                    "memhistoryid": memhistoryid
                })
            }).catch(function (err) {
                reject(err);
            });
        }).catch(function (err) {
            reject(err);
        });
    });
} 

module.exports.updatememberhistorystatus = function (memhistoryid) {
    return new app.promise(function (resolve, reject) {
        mySqlConnection.connection().then(function (con) {
            con.query('UPDATE memberhistoryam SET active = 0 WHERE memhistoryid= ?', [memhistoryid]).then(function (rows, fields) {
                resolve({
                    "memhistoryid": memhistoryid
                })
            }).catch(function (err) {
                reject(err);
            });
        }).catch(function (err) {
            reject(err);
        });
    });
} 

module.exports.checkMembersDetails = function (texcono, serviceno, projectno,category) {
	return new app.promise(function (resolve, reject) {
		var query = multiline.stripIndent(function () {
			/*
				SELECT mem.memberid,mem.texcono FROM member mem WHERE mem.active = 1 AND mem.serviceno = ?; SELECT pr.projectid,pr.projectno FROM project pr WHERE pr.active = 1 AND pr.projectno = ?; SELECT jm.jobmasterid,jm.code FROM jobmaster jm WHERE jm.active = 1 AND jm.code = ?;
			*/
		});
		mySqlConnection.connection().then(function (con) {
			con.query(query,[serviceno,projectno,category]).then(function (rows, fields) {
				resolve(rows);
			}).catch(function (err) {
				reject(err);
			});
		}).catch(function (err) {
			reject(err);
		});
	});
}   


module.exports.addMemberHistoryPostingOrder = function (selectedDetails) {
	return new app.promise(function (resolve, reject) {
		mySqlConnection.connection().then(function (con) {  
			var queires = '';
			for(var j = 0; j < selectedDetails.length; j++) { 
				var dts = new Date(selectedDetails[j].startdate); 
				dts.setDate(dts.getDate() + 1);
				var startdates = moment(dts).format('YYYY-MM-DD');  
				var enddates = null;
				if(selectedDetails[j].enddate) {
					var dtss = new Date(selectedDetails[j].enddate);
					dtss.setDate(dtss.getDate() + 1);
					enddates = moment(dtss).format('YYYY-MM-DD'); 
				} else {
					enddates = null; 
				}
				queires += con.format("INSERT INTO `memberhistoryam`( `memberid`, `texcono`, `serviceno`, `projectid`, `projectno`, `startdate`, `jobmasterid`,`category`,`enddate`) VALUES (?,?,?,?,?,?,?,?,?);", [selectedDetails[j].memberid,selectedDetails[j].texcono,selectedDetails[j].serviceno,selectedDetails[j].projectid, selectedDetails[j].projectno,  startdates, selectedDetails[j].category, selectedDetails[j].jobmasterid, enddates]);
			}
			// console.log('queires',queires);
			con.query(queires).then(function (rows, fields) {
				resolve("success");
			});
		}).catch(function (err) {
			console.log('err',err);
			reject(err);
		});
	}).catch(function (err) {
		reject(err);
	});
}  

