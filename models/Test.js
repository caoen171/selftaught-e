const mongoose = require('mongoose');
const { Schema } = mongoose;


const testSchema = new Schema({
    title: String,
    content: String,
    keys: [String],
    
});

mongoose.model('tests',testSchema );