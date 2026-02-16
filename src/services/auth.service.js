const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const RefreshTokenModel = require('../models/refreshToken.model');
const User = require('../models/user.model');


const generateTokens = async (user) => {
    const accessToken = jwt.sign(
        {
            sub: user._id,
            email: user.email,
            roles: user.roles
        },
        process.env.JWT_SECRET,
        {expiresIn: '5m'}
    );

    const refreshToken = crypto.randomBytes(64).toString('hex');
    const hashToken = crypto.createHash('sha256').update(refreshToken).digest('hex');

    await RefreshTokenModel.create({
        hashToken,
        user: user._id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    });

    return {accessToken, refreshToken};
}

const revokeToken = async (token, newRefreshToken = null) => {
    const hashToken = crypto.createHash('sha256').update(token).digest('hex');

    if (newRefreshToken) {
        console.log(newRefreshToken);
        const newHashToken = crypto.createHash('sha256').update(newRefreshToken).digest('hex');
        const newToken = await RefreshTokenModel.findOne({hashToken: newHashToken});
        console.log(newToken._id);
        const revokedToken = await RefreshTokenModel.findOneAndUpdate({hashToken, revoked: false}, {revoked: true, replacedBy: newToken._id});
        console.log(revokedToken);
        return revokedToken;
    }

    const revokedToken = await RefreshTokenModel.findOneAndUpdate({hashToken, revoked: false}, {revoked: true});
    return revokedToken;
};

const refresh = async (token) => {
    const hashToken = crypto.createHash('sha256').update(token).digest('hex');
    const userRefreshToken = await RefreshTokenModel.findOne({hashToken}).populate('user');

    if (!userRefreshToken || userRefreshToken.expiresAt < new Date() || userRefreshToken.revoked) {
        return null;
    }

    const {accessToken, refreshToken} = await generateTokens(userRefreshToken.user);
    revokeToken(token, refreshToken);

    return {accessToken, refreshToken};
};

module.exports = {generateTokens, revokeToken, refresh};
