// Path: server/middleware/authValidation.js
import { check, validationResult } from 'express-validator';
import User from '../models/user.js';

export const customErrorMessages = (statusCode, message) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
};

// Signup validation middleware
export const signupValidation = [
    check('username', 'Username is required').not().isEmpty(),
    check('email', 'Email is required').isEmail().withMessage('Invalid email format'),
    check('password', 'Password is required').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: 'Validation errors',
                errors: errors.array().map(error => ({
                    field: error.param,
                    message: error.msg
                }))
            });
        }

        // Check if email already exists
        try {
            const existingUser = await User.findOne({ email: req.body.email });
            if (existingUser) {
                return next(customErrorMessages(400, 'Email already in use'));
            }
        } catch (error) {
            return next(customErrorMessages(500, 'Something went wrong'));
        }

        next();
    }
];

// Login validation middleware
export const loginValidation = [
    check('email', 'Email is required').isEmail().withMessage('Invalid email format'),
    check('password', 'Password is required').not().isEmpty(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: 'Validation errors',
                errors: errors.array().map(error => ({
                    field: error.param,
                    message: error.msg
                }))
            });
        }
        next();
    }
];
