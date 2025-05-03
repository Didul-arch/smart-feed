// untuk generate dan verify token
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'rahasia-super-aman'

function generateToken(payload) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '1d'} );
}

function verifyToken(token) {
    return jwt.verify(token, JWT_SECRET);
}

module.exports = {
    generateToken, 
    verifyToken
};