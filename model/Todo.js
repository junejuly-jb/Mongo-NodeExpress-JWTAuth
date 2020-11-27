const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema(
    {

        todo: {
            type: String,
            required: true,
            max: 255
        },
        user_id: {
            type: mongoose.Schema.ObjectId,
        }   

    }
);

module.exports = mongoose.model('Todo', todoSchema);