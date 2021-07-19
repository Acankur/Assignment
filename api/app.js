const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const Post = require('./model/post');
const { ObjectId } = require('mongoose');
const app = express();

mongoose.connect("mongodb+srv://ankur:hG24I52noiQI4giS@cluster0.9jrls.mongodb.net/node-angular?retryWrites=true&w=majority").then(() => {
    console.log('connected to database');
}).catch(() => {
    console.log('not Connected');
});
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader("Access-Control-Allow-Methods" , 'GET','PUT','POST','PATCH','DELETE','OPTIONS');
    next();
});     

app.post('/api/:id', (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        imageurl: req.body.imageurl,
        content: req.body.content,
        child_images : []
    });
    try {
    Post.find({}).then(data=>{
        console.log(data);
        if((!data.child_images || data.child_images.length === 2) && req.params.id == "NaN"){
            post.save().then(result => {
                res.status(201).json({
                    message: 'Image added succesfully', 
                    data: result
                });
            });
        } else {
            Post.findOneAndUpdate({ _id: req.params.id },{$push: {"child_images" : {title: req.body.title,
                imageurl: req.body.imageurl,
                content: req.body.content,}}}).then(result => {
                res.status(201).json({
                    message: 'Image added succesfully',
                    data: result
                });
            });
        }

    }).catch(e=>{
        console.log(e);
    });
} catch(e){
    console.log(e);
}
    // post.save().then(result => {
    //     res.status(201).json({
    //         message: 'Image added succesfully',
    //         data: result
    //     });
    //     next();
    // });
});

app.get('/api/image', (req, res, next) => {
    Post.find().then(documents => {
        console.log(documents);
        res.status(200).json({
            message: 'Image has been succesfully fetched',
            data: documents
        });
    });
});

app.get('/api/image/:id', (req, res, next) => {
    Post.find({ _id: req.params.id }).then(documents => {
        console.log(documents);
        res.status(200).json({
            message: 'Image has been succesfully fetched',
            data: documents
        });
    });
});

app.get('/api/count',(req,res,next) => {
    Post.find().then(documents => {
        res.status(200).json({
            message: 'Image count has been succesfully fetched',
            data: documents
        });
    })
});

app.put('/api/update/:id',(req,res,next) => {
    const post = new Post({
        title: req.body.title,
        imageurl: req.body.imageurl,
        content: req.body.content
    });
    Post.updateOne({ _id: req.params.id }, {$push: {"child_images" : post}}).then(documents => {
        res.status(200).json({
            message: 'Image has been updated succesfully',
            data: documents
        });
    })
})

app.delete("/api/posts/:id", (req, res, next) => {
    Post.deleteOne({ _id: req.params.id }).then(result => {
        res.status(200).json({
            message: 'Image deleted',
            data: result
        });
    });
});

module.exports = app;