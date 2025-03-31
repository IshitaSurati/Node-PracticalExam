const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY || 'default_secret_key';

// Middleware to authenticate JWT token
function authenticateToken(req, res, next) {
    const token = req.cookies?.token;
    if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            console.error('JWT Verification Error:', err.message);
            return res.status(403).json({ error: 'Invalid or expired token.' });
        }
        req.user = user;
        next();
    });
}

// Middleware to authorize based on roles
function authorizeRole(roles) {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ error: 'Access denied. Insufficient permissions.' });
        }
        next();
    };
}

module.exports = { authenticateToken, authorizeRole };
