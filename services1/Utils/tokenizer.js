const crypto = require('crypto');
const dotenv = require('dotenv');

dotenv.config();

const APP_SECRET = process.env.APP_SECRET || 'T3***Cz3R0-==iD0R!@#2025';
const TOKEN_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

function generateIdToken(id) {
    if (!id) return null;
    
    try {
        const timestamp = Date.now();
        const nonce = crypto.randomBytes(8).toString('hex');
        const data = `${id}:${timestamp}:${nonce}`;
        
        const key = crypto.createHash('sha256').update(String(APP_SECRET)).digest('base64').substr(0, 32);
        const iv = crypto.randomBytes(16);
        
        const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
        let encrypted = cipher.update(data, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        
        const authTag = cipher.getAuthTag().toString('hex');
        return `${iv.toString('hex')}:${encrypted}:${authTag}`;
    } catch (error) {
        console.error('Token generation failed:', error);
        return null;
    }
}

function verifyIdToken(token) {
    if (!token) return null;
    
    try {
        const [ivHex, encrypted, authTag] = token.split(':');
        if (!ivHex || !encrypted || !authTag) {
            throw new Error('Invalid token format');
        }
        
        const key = crypto.createHash('sha256').update(String(APP_SECRET)).digest('base64').substr(0, 32);
        const iv = Buffer.from(ivHex, 'hex');
        
        const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
        decipher.setAuthTag(Buffer.from(authTag, 'hex'));
        
        let decrypted = decipher.update(encrypted, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        
        const [id, timestamp] = decrypted.split(':');
        
        // Verify token expiration
        if (Date.now() - parseInt(timestamp) > TOKEN_EXPIRY) {
            throw new Error('Token expired');
        }
        
        return id;
    } catch (error) {
        console.error('Token verification failed:', error);
        return null;
    }
}

// Helper to detect if a string might be a token
function isToken(str) {
    return typeof str === 'string' && str.split(':').length === 3;
}

module.exports = {
    generateIdToken,
    verifyIdToken,
    isToken
};