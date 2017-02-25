var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var port = 3000
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/codingbullblog');

var PostSchema = mongoose.Schema({
  title: {type: String, required: true},
  description: String,
  body: String,
  posted: {type: Date, default: Date.now}
})

var PostModel = mongoose.model("PostModel", PostSchema)

app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

app.post("/api/blogpost", createPost)

function createPost(req, res){
  var post = req.body;
  console.log(post)
  PostModel.create(post);
  res.json(post)
}

app.listen(port, function(){
  console.log('app listening on port ' + port)
})