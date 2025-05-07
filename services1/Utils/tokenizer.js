// This module provides functions to generate and verify secure tokens for IDs.
// It uses the AES-256-CTR encryption algorithm to create a reversible tokenization process.
// The tokens are generated using a secret key defined in .env file.
// The purpose is to securely represent sensitive information, such as user IDs, in a way that is not easily guessable or reversible without the secret key.
// The generated tokens can be used in URLs or APIs to protect sensitive data.
// The module exports two functions: generateIdToken and verifyIdToken.
// The generateIdToken function takes an ID (string or number) and returns a secure token.
// The verifyIdToken function takes a token and returns the original ID.
// The purpose is to fix the IDOR security vulnerability issues.

const crypto = require('crypto');

const APP_SECRET = 'T3***Cz3R0-==iD0R!@#2025'; // Replace with actual secret key from .env file

/**
 * Generates an irreversible secure token for a given ID.
 * @param {string|number} id - The real ID to tokenize.
 * @returns {string} - The secure token.
 */
function generateIdToken(id) {
    // Don't attempt to tokenize if id is undefined or null
    if (id === undefined || id === null) {
        return null;
    }

    try {
        // Using a fixed IV derived from the secret for simplicity
        // Note: This is less secure than a random IV but easier to implement
        const key = crypto.createHash('sha256').update(String(APP_SECRET)).digest('base64').substr(0, 32);
        const iv = crypto.createHash('md5').update('fixed_iv_for_' + APP_SECRET).digest();
        
        const cipher = crypto.createCipheriv('aes-256-ctr', key, iv);
        let crypted = cipher.update(id.toString(), 'utf8', 'hex');
        crypted += cipher.final('hex');
        
        return crypted;
    } catch (error) {
        console.error(`Failed to tokenize ${id}:`, error);
        throw error;
    }
}

/**
 * Decodes a secure token back to the original ID.
 * @param {string} token - The secure token.
 * @returns {string} - The original ID.
 */
function verifyIdToken(token) {
    if (!token) {
        console.log('Warning: Attempted to verify undefined or null token');
        return null;
    }
    
    try {
        // Using the same fixed IV derivation as in encryption
        const key = crypto.createHash('sha256').update(String(APP_SECRET)).digest('base64').substr(0, 32);
        const iv = crypto.createHash('md5').update('fixed_iv_for_' + APP_SECRET).digest();
        
        const decipher = crypto.createDecipheriv('aes-256-ctr', key, iv);
        let dec = decipher.update(token, 'hex', 'utf8');
        dec += decipher.final('utf8');
        return dec;
    } catch (error) {
        console.error('Failed to verify token:', error);
        throw error;
    }
}

module.exports = {
    generateIdToken,
    verifyIdToken
};
