const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model');

const auth = (roles = 'user') => async (req, res, next) => {
    const token = req.headers.authorization.replace('Bearer ', '');
    try {
        jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
        return res.status(401).json({error: "Invalid token"});
    }

    const payload = jwt.decode(token);

    const requiredRoles = Array.isArray(roles) ? roles : [roles];

    if (!requiredRoles.some((role) => payload.roles.includes(role))) {
        return res.status(401).json({error: "Unauthorized"});
    }

    const user = await UserModel.findById(payload.sub);
    req.user = user.toObject();

    next();
};

module.exports = auth;