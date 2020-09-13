var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");

var campgrounds = [
		{name: "Salmon Creek", image: "https://koa.com/blog/images/solo-camping-tips.jpg?preset=blogPhoto"},	
		{name: "Granite hill", image: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/camping-quotes-1556677391.jpg?crop=0.588xw:1.00xh;0.157xw,0&resize=640:*"},
		{name: "Mountain Goat's Rest", image: "https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
	{name: "Salmon Creek", image: "https://koa.com/blog/images/solo-camping-tips.jpg?preset=blogPhoto"},	
		{name: "Granite hill", image: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/camping-quotes-1556677391.jpg?crop=0.588xw:1.00xh;0.157xw,0&resize=640:*"},
		{name: "Mountain Goat's Rest", image: "https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"}
	]

app.get("/",function(req,res){
	res.render("landing");
});

app.get("/campgrounds",function(req,res){
	res.render("campgrounds",{campgrounds:campgrounds});
});


app.get("/campgrounds/new",function(req,res){
	res.render("new");
});

app.post("/campgrounds",function(req,res){
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = {name: name, image: image};
	campgrounds.push(newCampground);
	res.redirect("/campgrounds");
});

app.listen(process.env.PORT,process.env.IP,function(){
	console.log("YelpCamp Server has started!!!");
});