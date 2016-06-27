"use strict";

var express = require("express");
var posts = require("./mock/posts.json");

var postsLists = Object.keys(posts).map(function(value){return posts[value]});

var app = express();

app.use("/static", express.static(__dirname + "/public"));

app.set("view engine", "pug");
app.set("views", __dirname + "/templates");

app.get("/", function(req, res){
		var path = req.path;
    res.render("index", {path: path});
});

app.get("/blog/:title?", function(req, res){
    var title = req.params.title;
    if (title === undefined) {
        res.status(503);
        res.render("blog", {posts:postsLists});   
    } else {
    var post = posts[title] || {};
    res.render("post", {post: post});
    }
});

app.get("/posts", function(req, res) {
		if (req.query.raw) {
			res.json(posts);
		} else {
	  res.json(postsLists);
		}
});

app.listen(3000, function(){
    console.log("The fontend server is running on port 3000!")   
});