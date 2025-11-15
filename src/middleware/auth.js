~require('dotenv').config();
const jwt = require('jsonwebtoken');

function verifyJwt(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
            if (err) return reject(err);
            resolve(payload);
        });
    });
}

module.exports = (req, res, next) => {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;

    if (!token)
        return res.status(401).json({ message: 'Unauthorized: missing token' });

    verifyJwt(token)
        .then((payload) => {
            req.user = { id: payload.id };
            next();
        })
        .catch(() =>
            res.status(401).json({ message: 'Unauthorized: invalid token' })
        );
};
