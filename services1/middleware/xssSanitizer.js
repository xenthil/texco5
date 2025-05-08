const validator = require('validator'); // npm install validator

function sanitize(obj) {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = validator.stripLow(validator.escape(obj[key]));
    } else if (typeof obj[key] === 'object' && obj[key] !== null) {
      sanitize(obj[key]); // recurse for nested objects
    }
  }
  return obj;
}

module.exports = function(req, res, next) {
  sanitize(req.body);
  sanitize(req.query);
  sanitize(req.params);
  next();
};
