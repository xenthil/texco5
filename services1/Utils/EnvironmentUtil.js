var nconf= require("nconf");

// Load Environment variables from .env file
require('dotenv').load();
// Set up configs
nconf.use('memory');
// First load command line arguments
nconf.argv();
// Load environment variables
nconf.env();

module.exports=nconf;
