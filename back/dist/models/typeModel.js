const mongoose = require('mongoose');
const titleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    }
});
module.exports = mongoose.model('Title', titleSchema);
