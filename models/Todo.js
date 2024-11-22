const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    completed: {
        type: Boolean,
        required: true,
        default: false,
    },

    userID: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User',
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Todo', schema);