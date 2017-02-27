var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var port = 3000
var mongoose = require('mongoose');
var fs = require('fs');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/codingbullblog');

var PostSchema = mongoose.Schema({
  title: {type: String, required: true},
  description: String,
  body: String,
  posted: {type: Date, default: Date.now}
}, {collection: 'posts'})

var PostModel = mongoose.model("PostModel", PostSchema)

app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

app.post("/api/blogpost", createPost)
app.get("/api/blogpost", getAllPosts)
app.delete("/api/blogpost/:id", deletePost)
app.get("/api/blogpost/:id", getPostById)
app.put("/api/blogpost/:id", updatePost)
app.get('/newpost', function(req,res) {
    data= fs.readFile('/mywork/public/newpost.html',   function (err, data) {
    res.setHeader('Content-Type', 'text/html');
    res.send(data);
  });
});
app.get('/viewposts', function(req,res) {
    data= fs.readFile('/mywork/public/viewposts.html',   function (err, data) {
    res.setHeader('Content-Type', 'text/html');
    res.send(data);
  });
});

function getAllPosts(req,res){
  PostModel
    .find()
    .then(
      function(posts){
        res.json(posts);
      },
      function(error){
        res.sendStatus(400);
      }
    )
}

function createPost(req, res){
  var post = req.body;
  console.log(post)
  PostModel
    .create(post)
    .then(
      function(postObj){
        res.json(200);
      },  
      function(error){
        res.sendStatus(400);
      }
    );
  res.json(post)
}

function deletePost(req, res){
  var postId = req.params.id;
  PostModel
    .remove({_id: postId})
    .then(
      function(status){
        res.sendStatus(200)
      },
      function () {
        res.sendStatus(400)
      }
    )
}

function getPostById(req,res){
  console.log('Trying to get the edit function to work' + req )
  var postId = req.params.id
  PostModel
    .findById(postId)
    .then(
      function(post) {
        res.json(post);
      }, 
      function(error){
        res.sendStatus(400)
      }
    )
}

function updatePost(req, res){
  var postId = req.params.id;
  var post = req.body
  PostModel
    .update({_id: postId}, {
      title: post.title,
      description: post.description,
      body: post.body})
    .then(
      function(status) {
        res.sendStatus(200);
      }, 
      function(error){
        res.sendStatus(400)
      }
    )

}
app.listen(port, function(){
  console.log('app listening on port ' + port)
})