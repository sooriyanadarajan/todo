const mongoose = require('mongoose');

var taskSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    expiry: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        default: 0,
        enum: [0, 1, 2, 3]
        // 0 - created, 1 - pending, 2 - completed , 3 - hold
    },
    deleted: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

var Task = mongoose.model('task', taskSchema);

module.exports = Task;