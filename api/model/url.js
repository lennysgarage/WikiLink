const mongoose = require('mongoose');


const urlSchema = new mongoose.Schema({
    original_url: String,
    wikified_url: String
});

module.exports = mongoose.model('URL', urlSchema);