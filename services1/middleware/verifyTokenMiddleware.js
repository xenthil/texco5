// This module provides functions to automatically detect and verify any tokens in request parameters or body.

const { verifyIdToken } = require('../Utils/tokenizer');

/**
 * Middleware to automatically detect and verify any tokens in request parameters or body.
 * If invalid, it will respond with 400 Bad Request.
 */
function verifyTokensMiddleware(req, res, next) {
    try {
        const checkAndDecode = (obj) => {
            if (!obj) return;

            Object.keys(obj).forEach(key => {
                if (key.toLowerCase().endsWith('idtoken')) {
                    // Found a token - replace with original ID
                    const originalKey = key.replace(/Token$/i, '');
                    obj[originalKey] = verifyIdToken(obj[key]);
                    delete obj[key]; // Remove the token field for cleanliness
                }
            });
        };

        checkAndDecode(req.query);
        checkAndDecode(req.body);
        checkAndDecode(req.params);

        next();
    } catch (err) {
        console.error('ID Token verification failed:', err.message);
        return res.status(400).json({ message: 'Invalid or tampered ID token' });
    }
}

module.exports = verifyTokensMiddleware;
