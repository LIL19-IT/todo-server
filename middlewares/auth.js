const User = require('../models/User');
const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {

    try {
        const token = req.headers.authorization?.split(' ')[1];  // Bearer as45gs876768
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 
        const user = await User.findById(decoded.id);

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({
            message: 'Not authorized',
        });
    }

};

module.exports = {
    auth,
}