const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

mongoose.connect('mongodb://localhost:27017/blogDB', { useNewUrlParser: true, useUnifiedTopology: true });

const postSchema = new mongoose.Schema({
    title: String,
    content: String
});

const Post = mongoose.model('Post', postSchema);

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    Post.find({}, (err, posts) => {
        res.render('index', { posts });
    });
});

app.get('/compose', (req, res) => {
    res.render('compose');
});

app.post('/compose', (req, res) => {
    const { title, content } = req.body;

    const newPost = new Post({
        title,
        content
    });

    newPost.save((err) => {
        if (err) {
            console.error(err);
            res.redirect('/');
        } else {
            res.redirect('/');
        }
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});