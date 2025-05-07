// Load modules
var express = require('express');
const fs = require('fs');
const path = require('path');
var app = express();
const cors = require('cors');
var bodyParser = require('body-parser');
var helmet = require('helmet');
var bluebird = require('bluebird');
var nconf = require('./Utils/EnvironmentUtil');
const tokenizeResponseMiddleware = require('./middleware/tokenizeResponseMiddleware');
const verifyTokensMiddleware = require('./middleware/verifyTokenMiddleware');

// Use Helmet for security headers
app.use(helmet());
app.use(helmet.xssFilter());
app.use(helmet.contentSecurityPolicy({
	directives: {
		defaultSrc: ["'self'"],
		scriptSrc: ["'self'", "'unsafe-inline'"],
		objectSrc: ["'none'"],
		upgradeInsecureRequests: [],
	}
}));

// Load valid hosts
let validHosts = [];
const validHostsPath = path.join(__dirname, '../shared-config/valid-hosts.json');

if (fs.existsSync(validHostsPath)) {
	try {
		validHosts = JSON.parse(fs.readFileSync(validHostsPath, 'utf8'));
		if (!Array.isArray(validHosts)) {
			console.error('Invalid format for valid-hosts.json. Expected an array.');
			validHosts = [];
		}
	} catch (err) {
		console.error('Error reading valid-hosts.json:', err);
	}
}

// CORS Configuration
const corsOptions = {
	origin: function (origin, callback) {
		// Allow no-origin requests (Postman, curl, mobile apps)
		if (!origin) return callback(null, true);

		try {
			const parsedOrigin = new URL(origin);
			const hostWithPort = parsedOrigin.host; // host:port
			const hostname = parsedOrigin.hostname; // only hostname

			if (validHosts.includes(hostWithPort) || validHosts.includes(hostname)) {
				return callback(null, true);
			} else {
				return callback(new Error('Not allowed by CORS'));
			}
		} catch (e) {
			return callback(new Error('Invalid Origin'));
		}
	},
	methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
	credentials: true,
	allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
	optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};

// Apply CORS globally
app.use(cors(corsOptions));

// Parse body
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

// IDOR Protection
app.use(tokenizeResponseMiddleware);
app.use(verifyTokensMiddleware);

// Security Headers
app.use((req, res, next) => {
	res.setHeader("X-Frame-Options", "DENY");
	res.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self' 'unsafe-inline'");
	next();
});

// Basic Route
app.get('/', function (req, res) {
	res.json({ test: 'Welcome to Texco!' });
});

// Load services
require('./Service/services')({ express: app, promise: bluebird });

// Start server
var server = app.listen(nconf.get('APP_PORT'), function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log("server listening at http://%s:%s", host, port);
});

module.exports.express = app;
module.exports.promise = bluebird;
