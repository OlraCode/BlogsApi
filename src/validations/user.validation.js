const z = require('zod');
const UserModel = require('../models/user.model');

const createUserSchema = z.object({
    email: 
        z.email("Invalid Email")
        .refine(async (email) => {
            const user = await UserModel.findOne({ email });
            return !user;
        }, {error: "This email already exists."}),

    name:
        z.string("Name muste be a string")
        .min(4, "Name must have at least 4 characters")
        .max(50, "Name can have up to 50 characters"),
    
    password: 
        z.string("Password must be a string")
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, "Password must have 1 uppercase, 1 lowercase, 1 number, and at least 8 characters."),
});

module.exports = createUserSchema;