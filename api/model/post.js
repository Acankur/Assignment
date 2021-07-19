const mongoose = require('mongoose');

//defination of db
const postSchema = mongoose.Schema({
    title: { type: String, required: true},
    imageurl: {type: String, required : true},
    content : { type: String, required: true},
    child_images :  [{
    title: { type: String},
    imageurl: {type: String},
    content : { type: String},
    }]
});

//model
module.exports = mongoose.model('Post', postSchema);