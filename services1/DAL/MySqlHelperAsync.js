const util = require('util')
const mysql = require('mysql2')
var nconf = require('./../Utils/EnvironmentUtil')

var retries = 5;      	// How many times will the query be retried when the ER_LOCK_DEADLOCK error occurs
var minMillis = 1;    	// The minimum amount of milliseconds that the system sleeps before retrying
var maxMillis = 100;  	// The maximum amount of milliseconds that the system sleeps before retrying
var debug = 1;		 	// Show all the debugs on how the proxy is working
var show_all_errors = 1;// Show all errors that are outside of the proxy

const pool = mysql.createPool({
    connectionLimit: 10,
    host: nconf.get('DB_HOST'),
    user: nconf.get('DB_USERID'),
    password: nconf.get('DB_PASSWORD'),
    database: nconf.get('DB_NAME'),
})

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.')
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.')
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.')
        }
    }
    if (connection) connection.release()
    return 
}) 
pool.query = util.promisify(pool.query)
module.exports = pool;
