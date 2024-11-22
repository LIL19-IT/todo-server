const { check } = require('express-validator');

const validate = [
    check('name', 'Name must be between 2 and 20 characters long').isLength({ min: 2, max: 20 }),
    check('email', 'Invalid email').isEmail(),
    check('password', 'Password must be at least 6 characters long').isLength({ min: 6 })
];

module.exports = {
    validate,
}