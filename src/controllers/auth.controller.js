const bcrypt = require('bcrypt');
const UserModel = require('../models/user.model');
const {generateTokens, revokeToken, refresh: refreshService} = require('../services/auth.service');

const login = async (req, res) => {
    const {email, password} = req.body;
    const user = await UserModel.findOne({email});

    if (!user) {
        return res.status(401).json({error: "invalid credentials."});
    }
    
    const passwordIsCorrect = await bcrypt.compare(password, user.password);
    if (!passwordIsCorrect) {
        return res.status(401).json({error: "invalid credentials."});
    }

    const tokens = await generateTokens(user);
    res.status(200).json(tokens);
};

const register = async (req, res) => {
    const {email, name, password} = req.body;
    const hashPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({email, name, password: hashPassword});
    
    const {_id, password: userPassword, roles, __v, ...rest} = user.toObject();

    const userDTO = {
        id: _id,
        ...rest
    }

    res.status(200).json(userDTO);
};

const logout = async (req, res) => {
    const token = req.cookie?.refresh_token || req.body?.refreshToken;
    if (!token) {
        return res.status(401).json({error: "Invalid token"});
    }

    const revokedToken = await revokeToken(token);

    if (!revokedToken) {
        return res.status(401).json({error: "Invalid token"});
    }

    res.status(200).json({message: "Logout successfully"});
};

const refresh = async (req, res) => {
    const refreshToken = req.cookie?.refresh_token || req.body?.refreshToken;

    const tokens = await refreshService(refreshToken);

    if (!tokens) {
        return res.status(401).json({error: "Invalid token."});
    }

    res.status(200).json(tokens);
};

const me = (req, res) => {
    const {password, _id, __v, roles, ...userDTO} = req.user;
    res.status(200).json(userDTO);
};

module.exports = {login, register, logout, refresh, me};