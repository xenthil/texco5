const { generateIdToken } = require('../Utils/tokenizer');

function tokenizeObject(obj) {
    if (!obj || typeof obj !== 'object') return obj;
    
    if (Array.isArray(obj)) {
        return obj.map(item => tokenizeObject(item));
    }
    
    const result = {};
    Object.keys(obj).forEach(key => {
        const value = obj[key];
        
        if ((key.endsWith('Id') || key === 'id') && value) {
            result[key] = generateIdToken(value);
        } else if (value && typeof value === 'object') {
            result[key] = tokenizeObject(value);
        } else {
            result[key] = value;
        }
    });
    
    return result;
}

function tokenResponseMiddleware(req, res, next) {
    const originalJson = res.json;
    
    res.json = function(data) {
        const tokenizedData = tokenizeObject(data);
        return originalJson.call(this, tokenizedData);
    };
    
    next();
}

module.exports = tokenResponseMiddleware;