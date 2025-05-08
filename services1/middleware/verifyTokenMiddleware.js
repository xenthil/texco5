const { verifyIdToken, isToken } = require('../Utils/tokenizer');

function processObject(obj) {
    if (!obj || typeof obj !== 'object') return;
    
    Object.keys(obj).forEach(key => {
        const value = obj[key];
        
        // Handle ID parameters
        if ((key.endsWith('Id') || key === 'id') && value && isToken(value)) {
            const decodedId = verifyIdToken(value);
            if (decodedId) {
                obj[key] = decodedId;
            }
        }
        
        // Recursively process nested objects
        if (value && typeof value === 'object') {
            processObject(value);
        }
    });
}

function tokenParamMiddleware(req, res, next) {
    try {
        // Process query parameters
        processObject(req.query);
        
        // Process body parameters
        processObject(req.body);
        
        // Process URL parameters
        processObject(req.params);
        
        next();
    } catch (error) {
        console.error('Token parameter processing failed:', error);
        next();
    }
}

module.exports = tokenParamMiddleware;