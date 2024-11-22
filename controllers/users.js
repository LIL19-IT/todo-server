const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: 'Please fill in the required fields',
        })
    }

    try {

        const user = await User.findOne({ email });
        const isPasswordCorrect = user && (await user.matchPassword(password));
        const secret = process.env.JWT_SECRET;

        if (isPasswordCorrect) {
            res.status(200).json({
                id: user._id,
                name: user.name,
                email: user.email,
                token: jwt.sign({ id: user._id }, secret),
            });
        } else {
            res.status(401).json({
                message: 'Invalid credentials',
            })
        }

    } catch(error) {
        res.status(500).json({
            message: 'Error logging in',
        })
    }
}

const register = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
            message: 'Invalid data during registration',
        })
    }

    const { name, email, password } = req.body;

    try {

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: 'This email is already taken, please try another',
            }) 
        }

        const user = new User({ name, email, password });
        await user.save();

        res.status(201).json({
            message: 'User registered successfully',
        })
        
    } catch (error) {
        res.status(500).json({
            message: 'Error registering user',
        })
    }
}

module.exports = {
    login,
    register,
}