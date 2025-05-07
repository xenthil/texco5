var mysql = require('promise-mysql');
var nconf = require('./../Utils/EnvironmentUtil')
var proxyMysqlDeadlockRetries = require('node-mysql-deadlock-retries');


var retries = 5;      	// How many times will the query be retried when the ER_LOCK_DEADLOCK error occurs
var minMillis = 1;    	// The minimum amount of milliseconds that the system sleeps before retrying
var maxMillis = 100;  	// The maximum amount of milliseconds that the system sleeps before retrying
var debug = 1;		 	// Show all the debugs on how the proxy is working
var show_all_errors = 1;// Show all errors that are outside of the proxy

var pool = mysql.createPool({
    host: nconf.get('DB_HOST'),
    user: nconf.get('DB_USERID'),
    password: nconf.get('DB_PASSWORD'),
    database: nconf.get('DB_NAME'),
    multipleStatements: true,
    connectionLimit: 100,
    connectTimeout  : 60 * 60 * 1000,
    acquireTimeout  : 60 * 60 * 1000,
    timeout         : 60 * 60 * 1000
});



// var connection = mysql.createConnection({
//   host    : nconf.get('DB_HOST'),
//   user    : nconf.get('DB_USERID'),
//   password: nconf.get('DB_PASSWORD'),
//   database: nconf.get('DB_NAME'),
//   multipleStatements: true,
//   connectionLimit: 10
// });


//proxyMysqlDeadlockRetries(connection, retries, minMillis, maxMillis, debug, show_all_errors);

module.exports.connection = function connect() {
    var conn = null;
    return pool.getConnection().then(function(connection) {
        conn = connection;
        return connection
    }).catch(function(error) {
        throw new Error(error);
    }).finally(function() {
        if (conn) {
            conn.connection.release();
        }
    });
}
