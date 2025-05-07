const { generateIdToken } = require('../Utils/tokenizer');

function tokenizeResponseMiddleware(req, res, next) {
    // Store the original res.json function
    const originalJson = res.json;
    
    // Override the json method
    res.json = function(data) {
        // Process the data to tokenize IDs
        const processedData = tokenizeIds(data);
        
        // Call the original json method with processed data
        return originalJson.call(this, processedData);
    };
    
    next();
}

function tokenizeIds(data) {
    // Handle null/undefined
    if (data == null) return data;
    
    try {
        // Handle arrays
        if (Array.isArray(data)) {
            return data.map(item => tokenizeIds(item));
        }
        
        // Handle objects (excluding null)
        if (data !== null && typeof data === 'object') {
            const result = {};
            
            for (const [key, value] of Object.entries(data)) {
                // If the key is 'id' or ends with 'Id', tokenize it
                if ((key === 'id' || 
                    key.endsWith('Id') || 
                    key.endsWith('id')) && 
                    value != null) {
                    try {
                        // Ensure value is valid for tokenization
                        if (typeof value === 'string' || typeof value === 'number') {
                            // SUPER CRITICAL CHANGE: Replace the ID with a dynamic token 
                            result[key] = generateIdToken(value);
                        } else {
                            console.warn(`Invalid value type for tokenization: ${key}`);
                            result[key] = value;
                        }
                    } catch (tokenError) {
                        console.error(`Failed to tokenize ${key}:`, tokenError);
                        result[key] = value;
                    }
                } else {
                    // Recursively process nested objects and arrays
                    result[key] = tokenizeIds(value);
                }
            }
            
            return result;
        }
        
        // Return primitive values as is
        return data;
    } catch (error) {
        console.error('Error in tokenizeIds:', error);
        return data; // Return original data if processing fails
    }
}

module.exports = tokenizeResponseMiddleware;