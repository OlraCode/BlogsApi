const mongoose = require('mongoose');

const RefreshTokenSchema = mongoose.Schema({
        hashToken: {
            type: String,
            required: true,
            unique: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        expiresAt: {
            type: Date,
            required: true,
        },
        revoked: {
            type: Boolean,
            default: false
        },
        replacedBy: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

const RefreshTokenModel = mongoose.model("RefreshToken", RefreshTokenSchema);

module.exports = RefreshTokenModel;